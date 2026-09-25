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
      scopeNote = "Raised by 1.3 times (1.15–1.5) to add what the US studio reports leave out: food, materials, post-production, and the extra warming from flights at high altitude.";
    } else if (!fullScope && b.scope === "full") {
      t = combine([t, { lo: 1 / D.pearToFull.hi, c: 1 / D.pearToFull.c, hi: 1 / D.pearToFull.lo }]);
      scopeNote = "Lowered by 1.3× to match the narrower US studio benchmark scope.";
    }
    return { co2Kg: scale(t, 1000), cost: scale(b.cost, runtimeScale), runtimeScale, scopeNote, bench: b };
  }

  /* The access problem: annual footprint for a pattern of casual use. */
  function usageYear(secondsPerDay, modelKey = "seedance25", res = "720p") {
    const p = perGeneratedSecond(modelKey, res);
    return scale(p.co2Kg, secondsPerDay * 365);
  }

  return { combine, fixed, scale, add, perGeneratedSecond, aiProduction, benchmarkProduction, usageYear };
})();
if (typeof module !== "undefined") module.exports = Model;
