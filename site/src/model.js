/* Calculation engine.  Pure functions, no DOM.  Every result carries a central value and a
   likely range.  Ranges combine each factor's own uncertainty in log space (a root-sum-square
   of the log ratios), so the band reflects the combined uncertainty instead of stacking every
   worst case at once. */
const Model = (() => {
  const D = typeof DATA !== "undefined" ? DATA : require("./data.js");

  // Combine independent multiplicative factors given as {lo, c, hi}.
  function combine(factors) {
    let c = 1, down = 0, up = 0;
    for (const f of factors) {
      c *= f.c;
      down += Math.log(f.c / f.lo) ** 2;
      up += Math.log(f.hi / f.c) ** 2;
    }
    return { lo: c * Math.exp(-Math.sqrt(down)), c, hi: c * Math.exp(Math.sqrt(up)) };
  }
  const fixed = (v) => ({ lo: v, c: v, hi: v });
  const scale = (r, k) => ({ lo: r.lo * k, c: r.c * k, hi: r.hi * k });
  const add = (a, b) => ({ lo: a.lo + b.lo, c: a.c + b.c, hi: a.hi + b.hi });

  /* One generated second of AI video, at facility level. */
  function perGeneratedSecond(modelKey, res, regionKey) {
    const m = D.models[modelKey];
    const r = m.resolutions[res] || m.resolutions[m.defaultRes];
    const reg = D.regions[regionKey || m.region];
    const gpuWh = combine([m.gpuWh, r.resFactor]);                        // GPU-only Wh per second
    const facWh = combine([m.gpuWh, r.resFactor, D.hostMultiplier, reg.pue]);
    const itWh = combine([m.gpuWh, r.resFactor, D.hostMultiplier]);
    const opKg = combine([m.gpuWh, r.resFactor, D.hostMultiplier, reg.pue, reg.grid]);
    const embKg = combine([m.gpuWh, r.resFactor, D.embodiedKgPerGpuHour]);
    const train = { lo: 1 + D.training.lo, c: 1 + D.training.c, hi: 1 + D.training.hi };
    // kg CO2e per second: (operational + embodied) × training uplift
    const co2 = combine([
      { lo: (opKg.lo + embKg.lo / D.gpuKw) / 1000, c: (opKg.c + embKg.c / D.gpuKw) / 1000, hi: (opKg.hi + embKg.hi / D.gpuKw) / 1000 },
      train,
    ]);
    // water: IT energy × (on-site WUE) + facility energy × (off-site water per kWh)
    const wOn = combine([itWh, reg.wueOn]);
    const wOff = combine([facWh, reg.wueOff]);
    const water = { lo: (wOn.lo + wOff.lo) / 1000, c: (wOn.c + wOff.c) / 1000, hi: (wOn.hi + wOff.hi) / 1000 };
    return { gpuWh, facWh, kWh: scale(facWh, 1 / 1000), co2Kg: co2, waterL: water, price: r.price, region: reg };
  }

  /* A whole AI production. */
  function aiProduction({ modelKey, res, regionKey, finishedSec, genPerFinished, styleKey }) {
    const s = D.styles[styleKey];
    const ratio = genPerFinished != null ? genPerFinished : s.genPerFinished.c;
    const genSec = finishedSec * ratio;
    const p = perGeneratedSecond(modelKey, res, regionKey);
    const minutes = finishedSec / 60;
    const laborDays = minutes * s.laborDaysPerMin;
    return {
      genSec, ratio,
      kWh: scale(p.kWh, genSec),
      co2Kg: scale(p.co2Kg, genSec),
      waterL: scale(p.waterL, genSec),
      genCost: scale(p.price, genSec),
      laborCost: scale(D.laborDayRate, laborDays),
      laborDays,
      takesRange: s.genPerFinished,
      co2AtTakes: { lo: p.co2Kg.c * finishedSec * s.genPerFinished.lo, hi: p.co2Kg.c * finishedSec * s.genPerFinished.hi },
      perSecond: p,
    };
  }

  /* A conventional production from a benchmark, scaled by runtime and scope. */
  function benchmarkProduction({ prodKey, finishedSec, fullScope }) {
    const b = D.productions[prodKey];
    const runtimeScale = finishedSec / 60 / b.minutes;
    let t = scale(b.t, runtimeScale);
    let scopeNote = "";
    if (fullScope && b.scope === "pear") {
      t = combine([t, D.pearToFull]);
      scopeNote = "Raised by 1.3× (1.15–1.5×) to add the food, materials, post, and flight warming the US studio benchmark leaves out.";
    } else if (!fullScope && b.scope === "full") {
      t = combine([t, { lo: 1 / D.pearToFull.hi, c: 1 / D.pearToFull.c, hi: 1 / D.pearToFull.lo }]);
      scopeNote = "Lowered by 1.3× to match the narrower US studio benchmark scope.";
    }
    return { co2Kg: scale(t, 1000), cost: scale(b.cost, runtimeScale), runtimeScale, scopeNote, bench: b };
  }

  /* A conventional production built from activity data. */
  function customProduction(x, fullScope) {
    const F = D.factors;
    const lines = [];
    const personDays = x.crew * x.days;
    const commute = personDays * x.commuteKm / 1.3 * F.carKm;
    lines.push(["Crew travel to set", commute]);
    const flightF = x.flightClass === "business" ? F.flightLongBusiness : x.flightKm < 3700 ? F.flightShortEconomy : F.flightLongEconomy;
    const flights = x.flyers * x.flightKm * 2 * (fullScope ? flightF : flightF / 1.7);
    lines.push(["Flights", flights]);
    const hotels = x.hotelNights * (F.hotelNight[x.hotelCountry] || F.hotelNight.us);
    lines.push(["Hotels", hotels]);
    const genL = x.genDays * F.genLPerDay[x.genSize];
    const generators = genL * F.dieselKgPerL;
    lines.push(["Generators", generators]);
    const trucks = x.days * x.trucks * 80 * F.truckKm;
    lines.push(["Trucks and vans", trucks]);
    const meals = fullScope ? personDays * 1.5 * F.mealKg[x.menu] : 0;
    lines.push(["Catering", meals]);
    const materials = fullScope ? x.timberT * F.timberKgPerT + x.steelT * F.steelKgPerT + x.timberT * x.landfill * F.landfillWoodKgPerT : 0;
    lines.push(["Set materials and waste", materials]);
    const vfxKwh = x.vfxShots * F.vfxShotKwh[x.vfxTier];
    const vfx = fullScope ? vfxKwh * F.vfxGrid : 0;
    lines.push(["VFX rendering", vfx]);
    const total = lines.reduce((a, l) => a + l[1], 0);
    const kWh = genL * F.dieselKwhPerL + vfxKwh;
    const water = personDays * F.waterLPerPersonDay;
    const vfxCost = { simple: 4000, typical: 20000, hero: 50000 }[x.vfxTier] * x.vfxShots;
    const cost = personDays * 700 * 1.3 + x.flyers * (x.flightClass === "business" ? 5000 : 1200) + x.hotelNights * 180 + vfxCost;
    return {
      co2Kg: { lo: total * 0.75, c: total, hi: total * 1.4 },
      kWh: { lo: kWh * 0.8, c: kWh, hi: kWh * 1.25 },
      waterL: { lo: water * 0.5, c: water, hi: water * 2 },
      cost: { lo: cost * 0.7, c: cost, hi: cost * 1.5 },
      lines,
    };
  }

  /* The access problem: annual footprint for a pattern of casual use. */
  function usageYear(secondsPerDay, modelKey = "seedance25", res = "720p") {
    const p = perGeneratedSecond(modelKey, res);
    return scale(p.co2Kg, secondsPerDay * 365);
  }

  return { combine, fixed, scale, add, perGeneratedSecond, aiProduction, benchmarkProduction, customProduction, usageYear };
})();
if (typeof module !== "undefined") module.exports = Model;
