/* Page wiring.  Reads DATA, computes with Model, and draws everything.  No framework. */
(() => {
  const D = DATA, M = Model;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- Number formatting ---------- */
  function sig(n, d = 2) {
    if (!isFinite(n)) return "–";
    if (n === 0) return "0";
    const p = Math.pow(10, d - Math.ceil(Math.log10(Math.abs(n))));
    const v = Math.round(n * p) / p;
    return v.toLocaleString("en-US", { maximumFractionDigits: Math.max(0, d - Math.ceil(Math.log10(Math.abs(v)))) });
  }
  const unitFmt = {
    co2(kg, d = 2) {
      if (kg < 1) return sig(kg * 1000, d) + " g";
      if (kg < 1000) return sig(kg, d) + " kg";
      if (kg < 1e9) return sig(kg / 1000, d) + " t";
      return sig(kg / 1e9, d) + " Mt";
    },
    kwh(k, d = 2) {
      if (k < 1) return sig(k * 1000, d) + " Wh";
      if (k < 1000) return sig(k, d) + " kWh";
      if (k < 1e6) return sig(k / 1000, d) + " MWh";
      return sig(k / 1e6, d) + " GWh";
    },
    water(l, d = 2) {
      if (l < 1) return sig(l * 1000, d) + " mL";
      if (l < 1e6) return sig(l, d) + " L";
      return sig(l / 1e6, d) + " million L";
    },
    usd(x, d = 2) {
      if (x < 1) return "$" + x.toFixed(2);
      if (x < 1e6) return "$" + sig(x, x < 100 ? d : Math.max(d, 2));
      return "$" + sig(x / 1e6, d) + "M";
    },
  };
  const rangeTxt = (f, r) => f(r.lo) + "–" + f(r.hi);
  const times = (x) => sig(x, 2) + "×";
  const fmtRatio = (r) => (r < 10 ? (Math.round(r * 10) / 10).toString() : sig(r, 2)) + ":1";   // a shooting ratio, e.g. 80:1
  const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);
  const fmtRuntime = (sec) => {
    if (sec < 90) return sig(sec, 3) + " s";
    const m = Math.floor(sec / 60), s = Math.round(sec % 60);
    return s ? `${m} min ${s} s` : `${m} min`;
  };

  /* ---------- State ----------
     One choice drives both sides: each project type picks its conventional benchmark and the
     working style (shooting ratio and human work) that AI productions of that kind actually use. */
  const FORMATS = [
    { key: "social", label: "Social video", noun: "a social video", minutes: 1, style: "solo", bench: "micro" },
    { key: "microdrama", label: "Micro-drama episode", noun: "a micro-drama episode", minutes: 2, style: "microdrama", bench: "micro" },
    { key: "music", label: "Music video", noun: "a music video", minutes: 3.5, style: "pro", bench: "musicVideo" },
    { key: "ad", label: "Commercial", noun: "a commercial", minutes: 0.5, style: "pro", bench: "commercial" },
    { key: "adHigh", label: "Big-budget commercial", noun: "a big-budget commercial", minutes: 0.5, style: "flagship", bench: "commercialHigh" },
    { key: "short", label: "Short film", noun: "a short film", minutes: 10, style: "solo", bench: "shortFilm" },
    { key: "tv", label: "TV episode", noun: "a TV episode", minutes: 50, style: "feature", bench: "tvEpisode" },
    { key: "feature", label: "Indie feature", noun: "an indie feature", minutes: 100, style: "feature", bench: "indieFeature" },
    { key: "tentpole", label: "Studio feature", noun: "a studio feature", minutes: 130, style: "feature", bench: "tentpole" },
  ];
  const S = { format: "ad", minutes: 0.5, model: "seedance25", res: "720p", ratio: D.styles.pro.genPerFinished.c };
  const project = () => FORMATS.find((f) => f.key === S.format);
  const regionFor = () => D.models[S.model].region;
  const BENCH_NOUN = {
    micro: "a small local shoot", musicVideo: "a typical music video shoot", commercial: "a typical commercial shoot",
    commercialHigh: "a high-budget commercial shoot", shortFilm: "a typical short film shoot", tvEpisode: "a typical TV drama episode",
    indieFeature: "a typical indie feature shoot", tentpole: "a typical studio feature shoot",
  };

  /* ---------- Tooltip ---------- */
  const tip = $("tip");
  function showTip(e, html) {
    tip.innerHTML = html;
    tip.hidden = false;
    const r = tip.getBoundingClientRect();
    let x = e.clientX + 14, y = e.clientY + 14;
    if (x + r.width > innerWidth - 8) x = e.clientX - r.width - 14;
    if (y + r.height > innerHeight - 8) y = e.clientY - r.height - 14;
    tip.style.left = Math.max(8, x) + "px";
    tip.style.top = Math.max(8, y) + "px";
  }
  function showTipAt(el, html) {
    const b = el.getBoundingClientRect();
    showTip({ clientX: b.left + b.width / 2, clientY: b.bottom }, html);
  }
  document.addEventListener("pointerover", (e) => {
    const t = e.target.closest("[data-tip]");
    if (t) showTip(e, t.getAttribute("data-tip"));
  });
  document.addEventListener("pointermove", (e) => {
    const t = e.target.closest("[data-tip]");
    if (t) showTip(e, t.getAttribute("data-tip"));
    else tip.hidden = true;
  });
  document.addEventListener("focusin", (e) => {
    const t = e.target.closest("[data-tip]");
    if (t) showTipAt(t, t.getAttribute("data-tip"));
  });
  document.addEventListener("focusout", () => (tip.hidden = true));
  addEventListener("scroll", () => (tip.hidden = true), { passive: true });

  /* ---------- Log-scale range chart ----------
     rows: [{label, r:{lo,c,hi}, cls:"ai"|"conv"|"alt", tip}] drawn on one shared log axis. */
  function rangeChart(el, rows, fmt, opts = {}) {
    const W = Math.max(240, el.clientWidth || 320);
    // On narrow screens long row labels sit above their bars instead of beside them.
    const stacked = !!opts.stack && W < 560;
    const labelW = stacked ? 0 : opts.labelW != null ? opts.labelW : 64;
    const rowH = (opts.rowH || 24) + (stacked ? 12 : 0), top = 6, axisH = 20;
    const vals = rows.filter((r) => r.r).flatMap((r) => [r.r.lo, r.r.hi]).filter((v) => v > 0);
    let lo = Math.floor(Math.log10(Math.min(...vals)));
    let hi = Math.ceil(Math.log10(Math.max(...vals)));
    if (hi - lo < 2) { lo -= 1; hi += hi - lo < 2 ? 1 : 0; }
    const x0 = stacked ? 4 : labelW + 8, x1 = W - (opts.bars ? 64 : 12);
    const x = (v) => x0 + ((Math.log10(v) - lo) / (hi - lo)) * (x1 - x0);
    const H = top + rows.length * rowH + axisH;
    let s = `<svg class="logchart" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(opts.aria || "Range chart")}">`;
    const maxLabels = Math.max(2, Math.floor((x1 - x0) / 62) + 1);
    const step = Math.max(1, Math.ceil((hi - lo) / (maxLabels - 1)));
    for (let p = lo; p <= hi; p += 1) {
      const gx = x(Math.pow(10, p));
      s += `<line class="grid" x1="${gx}" x2="${gx}" y1="${top - 4}" y2="${top + rows.length * rowH}"/>`;
      if ((p - lo) % step) continue;
      const anchor = p === lo ? "start" : p === hi ? "end" : "middle";
      s += `<text x="${gx}" y="${H - 4}" text-anchor="${anchor}">${esc(fmt(Math.pow(10, p), 1))}</text>`;
    }
    rows.forEach((row, i) => {
      const cy = top + i * rowH + rowH / 2 + (stacked ? 7 : 0);
      if (stacked) s += `<text class="rowlab" x="0" y="${cy - 11}">${esc(row.label)}</text>`;
      else if (labelW) s += `<text class="rowlab" x="0" y="${cy + 4}">${esc(row.label)}</text>`;
      if (!row.r) {
        s += `<text x="${x0}" y="${cy + 4}">${esc(row.empty || "Not possible")}</text>`;
        return;
      }
      const a = x(Math.max(row.r.lo, Math.pow(10, lo))), b = x(Math.min(row.r.hi, Math.pow(10, hi)));
      const t = row.tip || `${row.label}: ${fmt(row.r.c)} (${rangeTxt(fmt, row.r)})`;
      s += `<g class="mk mk-${row.cls}" tabindex="0" data-tip="${esc(t)}">`;
      s += `<rect class="hit" x="${x0 - 4}" y="${cy - rowH / 2}" width="${x1 - x0 + 8}" height="${rowH}"/>`;
      if (opts.bars) {
        const xc = x(row.r.c);
        s += `<rect class="bar" x="${x0}" y="${cy - 5}" width="${Math.max(6, xc - x0)}" height="10" rx="4"/>`;
        if (row.r.hi > row.r.lo * 1.01) s += `<line class="whisker" x1="${a}" x2="${b}" y1="${cy}" y2="${cy}"/><line class="whisker" x1="${a}" x2="${a}" y1="${cy - 5}" y2="${cy + 5}"/><line class="whisker" x1="${b}" x2="${b}" y1="${cy - 5}" y2="${cy + 5}"/>`;
        s += `<text class="val" x="${Math.max(xc, b) + 6}" y="${cy + 4}">${esc(fmt(row.r.c))}</text>`;
      } else {
        s += `<rect class="band" x="${a}" y="${cy - 4}" width="${Math.max(8, b - a)}" height="8" rx="4"/>`;
        s += `<circle class="dot" cx="${x(row.r.c)}" cy="${cy}" r="6"/>`;
      }
      s += `</g>`;
    });
    s += "</svg>";
    el.innerHTML = s;
  }

  /* ---------- Controls ---------- */
  function pills(el, items, current, onPick) {
    el.innerHTML = items.map((it) => `<button type="button" class="pill" data-k="${it.key}" aria-pressed="${it.key === current}">${esc(it.label)}</button>`).join("");
    el.onclick = (e) => {
      const b = e.target.closest("button[data-k]");
      if (b) onPick(b.dataset.k);
    };
  }
  function setPressed(el, key) {
    el.querySelectorAll("button[data-k]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.k === key));
  }
  function options(sel, items, current) {
    sel.innerHTML = items.map(([v, t]) => `<option value="${v}"${v === current ? " selected" : ""}>${esc(t)}</option>`).join("");
  }

  const takes = $("takes");
  const ratioToSlider = (r) => Math.round(250 * Math.log10(Math.max(1, r)));
  const sliderToRatio = (v) => {
    const r = Math.pow(10, v / 250);
    return r < 10 ? Math.round(r * 10) / 10 : Number(sig(r, 2).replace(/,/g, ""));
  };

  function initControls() {
    pills($("formatPills"), FORMATS, S.format, (k) => {
      const f = FORMATS.find((x) => x.key === k);
      Object.assign(S, { format: k, minutes: f.minutes, ratio: D.styles[f.style].genPerFinished.c });
      $("runtimeMin").value = f.minutes;
      setPressed($("formatPills"), k);
      syncTakes();
      update();
    });
    $("runtimeMin").addEventListener("input", (e) => {
      const v = parseFloat(e.target.value);
      if (v > 0) { S.minutes = v; update(); }
    });

    options($("model"), Object.entries(D.models).map(([k, m]) => [k, m.label]), S.model);
    $("model").addEventListener("change", (e) => {
      S.model = e.target.value;
      S.res = D.models[S.model].defaultRes;
      fillRes();
      update();
    });
    fillRes();
    $("res").addEventListener("change", (e) => { S.res = e.target.value; update(); });

    takes.addEventListener("input", () => { S.ratio = sliderToRatio(+takes.value); $("takesOut").textContent = fmtRatio(S.ratio); update(); });
    syncTakes();

    $("tableToggle").addEventListener("click", (e) => {
      const t = $("resultTable");
      t.hidden = !t.hidden;
      e.target.setAttribute("aria-expanded", !t.hidden);
      e.target.textContent = t.hidden ? "Show the numbers as a table" : "Hide the table";
    });
  }
  function fillRes() {
    const m = D.models[S.model];
    options($("res"), Object.keys(m.resolutions).map((r) => [r, r]), S.res);
  }
  function syncTakes() {
    takes.value = ratioToSlider(S.ratio);
    $("takesOut").textContent = fmtRatio(S.ratio);
    const st = D.styles[project().style];
    $("takesTypical").textContent = `AI projects like this usually run ${fmtRatio(st.genPerFinished.lo)} to ${fmtRatio(st.genPerFinished.hi)}.  ${st.example}.`;
  }

  /* ---------- Conventional energy and water for benchmarks ----------
     Benchmarks report carbon only.  Energy is estimated as the fuel and power share of the
     footprint (about 70%) at about 0.3 kg CO2e per kWh of diesel, petrol, or jet fuel.
     Water uses the one published production figure: 94 L per person per shoot day. */
  function benchExtras(b, conv) {
    const kWh = M.combine([conv.co2Kg, { lo: 0.5, c: 0.7, hi: 0.85 }, { lo: 1 / 0.35, c: 1 / 0.3, hi: 1 / 0.25 }]);
    const pd = b.crew * b.days * conv.runtimeScale;
    const water = { lo: pd * D.factors.waterLPerPersonDay * 0.5, c: pd * D.factors.waterLPerPersonDay, hi: pd * D.factors.waterLPerPersonDay * 2 };
    return { kWh, water };
  }

  /* ---------- Main update ---------- */
  function update() {
    const f = project();
    const finishedSec = S.minutes * 60;
    const m = D.models[S.model];
    $("runtimeSec").textContent = fmtRuntime(finishedSec);
    $("adjustNow").textContent = `${fmtRuntime(finishedSec)} · ${fmtRatio(S.ratio)} · ${m.label}, ${S.res}`;

    const ai = M.aiProduction({ modelKey: S.model, res: S.res, regionKey: regionFor(), finishedSec, genPerFinished: S.ratio, styleKey: f.style });
    const aiCost = M.add(ai.genCost, ai.laborCost);
    const c = M.benchmarkProduction({ prodKey: f.bench, finishedSec, fullScope: true });
    const ex = benchExtras(c.bench, c);
    const conv = c.co2Kg, convKWh = ex.kWh, convWater = ex.water, convCost = c.cost;

    $("compareLine").textContent = `${cap(f.noun)}, ${fmtRuntime(finishedSec)} long, made two ways.`;
    const ratio = conv.c / ai.co2Kg.c;
    const verdict = $("verdict");
    if (ratio >= 1.25) verdict.textContent = `Generating it emits about ${times(ratio)} less CO2e.`;
    else if (ratio > 0.8) verdict.textContent = "On carbon, it's roughly a tie.";
    else verdict.textContent = `Generating it emits about ${times(1 / ratio)} more CO2e.`;
    const overlap = ai.co2Kg.hi >= conv.lo && conv.hi >= ai.co2Kg.lo;
    const costRatio = convCost.c / aiCost.c;
    const costLine = costRatio >= 1.25 ? `It also costs about ${times(costRatio)} less, mostly because of people, not generation.` : costRatio > 0.8 ? "Costs come out about even." : `It costs about ${times(1 / costRatio)} more.`;
    $("verdictSub").textContent = `That's ${sig(ai.genSec, 3)} seconds of AI video (${fmtRatio(S.ratio)}) against ${BENCH_NOUN[f.bench]}.  ${overlap ? "The likely ranges overlap, so the direction is less certain than the headline.  " : ""}${costLine}`;

    const metrics = [
      { name: "CO2e", fmt: unitFmt.co2, a: ai.co2Kg, c: conv },
      { name: "Energy", fmt: unitFmt.kwh, a: ai.kWh, c: convKWh, note: "Shoot energy is estimated from its footprint: fuel and power, about 70% of it." },
      { name: "Water", fmt: unitFmt.water, a: ai.waterL, c: convWater, note: "AI water includes cooling and the water behind the electricity.  Shoot water counts on-set use only." },
      { name: "Cost", fmt: unitFmt.usd, a: aiCost, c: convCost, note: `AI cost is ${unitFmt.usd(ai.genCost.c)} of generation at list price plus ${sig(ai.laborDays, 2)} days of human work.` },
    ];
    const box = $("metrics");
    box.innerHTML = metrics.map((mt, i) => {
      const r = mt.c.c / mt.a.c;
      const rt = r >= 1 ? `AI is ${times(r)} lower` : `AI is ${times(1 / r)} higher`;
      return `<div class="metric">
        <div class="metric-top"><span class="metric-name">${mt.name}</span><span class="metric-ratio">${rt}</span></div>
        <div class="metric-vals">
          <div class="mval"><span class="who"><i style="background:var(--viz-ai)"></i>Made with AI</span><b>${mt.fmt(mt.a.c)}</b><span class="rng">${rangeTxt(mt.fmt, mt.a)}</span></div>
          <div class="mval"><span class="who"><i style="background:var(--viz-conv)"></i>Shot for real</span><b>${mt.fmt(mt.c.c)}</b><span class="rng">${rangeTxt(mt.fmt, mt.c)}</span></div>
        </div>
        <div class="chart" id="mchart${i}"></div>
        ${mt.note ? `<p class="hint">${esc(mt.note)}</p>` : ""}
      </div>`;
    }).join("");
    metrics.forEach((mt, i) => rangeChart($("mchart" + i), [
      { label: "AI", r: mt.a, cls: "ai", tip: `Made with AI: ${mt.fmt(mt.a.c)}<br>Likely ${rangeTxt(mt.fmt, mt.a)}` },
      { label: "Shoot", r: mt.c, cls: "conv", tip: `Shot for real: ${mt.fmt(mt.c.c)}<br>Likely ${rangeTxt(mt.fmt, mt.c)}` },
    ], mt.fmt, { labelW: 44, aria: `${mt.name}: made with AI ${mt.fmt(mt.a.c)}, shot for real ${mt.fmt(mt.c.c)}` }));

    // Notes
    const notes = [];
    const breakEven = conv.c / (ai.perSecond.co2Kg.c * finishedSec);
    if (breakEven > S.ratio) notes.push(`Generating would match the shoot at a shooting ratio of about ${fmtRatio(breakEven)}.  You're at ${fmtRatio(S.ratio)}.`);
    else notes.push(`Generating already passes the shoot at a shooting ratio of ${fmtRatio(breakEven)}, and you're at ${fmtRatio(S.ratio)}.`);
    const st = D.styles[f.style];
    notes.push(`At the usual ${fmtRatio(st.genPerFinished.lo)} to ${fmtRatio(st.genPerFinished.hi)} for projects like this, the AI footprint lands between ${unitFmt.co2(ai.co2AtTakes.lo)} and ${unitFmt.co2(ai.co2AtTakes.hi)}.`);
    if (c.runtimeScale > 3 || c.runtimeScale < 0.34) notes.push(`The shoot figure is scaled from a typical project about ${sig(c.bench.minutes)} minutes long, so treat it as rough.`);
    if (S.model === "seedance25" && S.res === "1080p") notes.push("Drafting at 480p and rendering only the keepers at 1080p cuts the AI footprint by 65–80%.");
    $("notes").innerHTML = notes.map((n) => `<li>${esc(n)}</li>`).join("");

    // Table: three columns, with each range under its value so it fits the panel
    const cell = (fm, r) => `<b>${fm(r.c)}</b><span class="rng">${rangeTxt(fm, r)}</span>`;
    let t = `<table class="data-tbl res-tbl"><thead><tr><th>Measure</th><th>Made with AI</th><th>Shot for real</th></tr></thead><tbody>`;
    metrics.forEach((mt) => { t += `<tr><td>${mt.name}</td><td class="num">${cell(mt.fmt, mt.a)}</td><td class="num">${cell(mt.fmt, mt.c)}</td></tr>`; });
    t += `<tr><td>AI video generated</td><td class="num"><b>${sig(ai.genSec, 3)} s</b><span class="rng">${fmtRatio(S.ratio)}</span></td><td class="num">–</td></tr>`;
    t += `<tr><td>AI generation cost</td><td class="num">${cell(unitFmt.usd, ai.genCost)}</td><td class="num">–</td></tr>`;
    t += `<tr><td>Human work on the AI version</td><td class="num">${cell(unitFmt.usd, ai.laborCost)}</td><td class="num">–</td></tr>`;
    t += "</tbody></table>";
    $("resultTable").innerHTML = t;
    $("shootSource").textContent = `Shoot figure: ${c.bench.source}.`;

    renderScenes();
    renderAccess();
  }

  /* ---------- Scenes ---------- */
  const sceneVehicles = { explosion: { add: 37100, text: "Count the bus as a new vehicle (+37 t)" }, chase: { add: 21600, text: "Count 3 wrecked picture cars as new (+22 t, the <i>Furious 7</i> average of 7.2 t each)" } };
  const sceneState = {};
  function sceneAI(sc) {
    const p = M.perGeneratedSecond(S.model, S.res, regionFor());
    return M.scale(M.combine([p.co2Kg, sc.takes]), sc.seconds);
  }
  function buildScenes() {
    $("sceneList").innerHTML = D.scenes.map((sc) => `
      <details class="scene" id="scene-${sc.key}">
        <summary>
          <div><h3>${esc(sc.title)}</h3><span class="hint">${sc.seconds} s of screen time · AI shooting ratio ${fmtRatio(sc.takes.c)}</span></div>
          <span class="badge" data-badge></span>
          <span class="chev" aria-hidden="true">+</span>
        </summary>
        <div class="scene-body">
          <div class="measure">${sc.body.map((p) => `<p>${p}</p>`).join("")}<p class="hint" style="margin-top:14px">${esc(sc.cost)}</p></div>
          <div class="scene-chart">
            <div class="chart" data-chart></div>
            ${sceneVehicles[sc.key] ? `<label class="check"><input type="checkbox" data-veh> <span>${sceneVehicles[sc.key].text}</span></label>` : ""}
            <p class="hint" data-line></p>
          </div>
        </div>
      </details>`).join("");
    D.scenes.forEach((sc) => {
      const el = $("scene-" + sc.key);
      const cb = el.querySelector("[data-veh]");
      if (cb) cb.addEventListener("change", () => { sceneState[sc.key] = cb.checked; renderScene(sc); });
      el.addEventListener("toggle", () => el.open && renderScene(sc));
    });
    $("scene-explosion").open = true;
  }
  function renderScene(sc) {
    const el = $("scene-" + sc.key);
    const ai = sceneAI(sc);
    let prac = sc.practical;
    if (prac && sceneState[sc.key]) prac = M.add(prac, M.fixed(sceneVehicles[sc.key].add));
    const alts = [prac, sc.vfx].filter(Boolean);
    const best = alts.reduce((a, b) => (b.c < a.c ? b : a));
    const r = best.c / ai.c;
    const badge = el.querySelector("[data-badge]");
    badge.className = "badge " + (r >= 1.25 ? "win" : r <= 0.8 ? "lose" : "");
    badge.textContent = r >= 1.25 ? `AI ${times(r)} lower` : r <= 0.8 ? `AI ${times(1 / r)} higher` : "About even";
    if (!el.open) return;
    const m = D.models[S.model];
    rangeChart(el.querySelector("[data-chart]"), [
      { label: sc.practicalLabel || "Practical", r: prac, cls: "conv", empty: "Can't be shot for real", tip: prac ? `${esc(sc.practicalLabel)}: ${unitFmt.co2(prac.c)}<br>Likely ${rangeTxt(unitFmt.co2, prac)}` : "" },
      { label: sc.vfxLabel, r: sc.vfx, cls: "alt", tip: `${esc(sc.vfxLabel)}: ${unitFmt.co2(sc.vfx.c)}<br>Likely ${rangeTxt(unitFmt.co2, sc.vfx)}` },
      { label: `${m.label}, ${S.res}`, r: ai, cls: "ai", tip: `${m.label} at ${S.res}: ${unitFmt.co2(ai.c)}<br>${sc.seconds} s at ${fmtRatio(sc.takes.c)}<br>Likely ${rangeTxt(unitFmt.co2, ai)}` },
    ], unitFmt.co2, { labelW: Math.min(210, Math.max(120, (el.querySelector("[data-chart]").clientWidth || 400) * 0.42)), rowH: 30, stack: true, aria: `${sc.title}: practical ${prac ? unitFmt.co2(prac.c) : "not possible"}, alternative ${unitFmt.co2(sc.vfx.c)}, AI ${unitFmt.co2(ai.c)}` });
    el.querySelector("[data-line]").textContent = `AI at ${fmtRatio(sc.takes.lo)} to ${fmtRatio(sc.takes.hi)}: ${rangeTxt(unitFmt.co2, ai)}.  Bars show likely ranges on a log scale.`;
  }
  function renderScenes() { D.scenes.forEach(renderScene); }

  /* ---------- Access ---------- */
  function renderAccess() {
    const A = D.access;
    const peopleExp = +$("aPeople").value, secsExp = +$("aSecs").value;
    const people = Math.round(Math.pow(10, peopleExp));
    const secs = Math.pow(10, secsExp);
    const secsR = secs < 10 ? Math.round(secs * 10) / 10 : Math.round(secs);
    $("aPeopleOut").textContent = people.toLocaleString("en-US");
    $("aSecsOut").textContent = secsR >= 60 ? `${sig(secsR / 60, 2)} min` : `${secsR} s`;
    const perSec = M.perGeneratedSecond(A.model, A.res).co2Kg;
    const perPersonYr = M.scale(perSec, secsR * 365);
    const total = M.scale(perPersonYr, people);
    const tentpole = A.rungs.find((r) => r.key === "tentpole").kg;
    const uk = A.rungs.find((r) => r.key === "ukScreen").kg;
    const feat = A.rungs.find((r) => r.key === "indie").kg;
    let line = `${people.toLocaleString("en-US")} ${people === 1 ? "person" : "people"} generating ${secsR >= 60 ? sig(secsR / 60, 2) + (secsR / 60 === 1 ? " minute" : " minutes") : secsR + (secsR === 1 ? " second" : " seconds")} a day ${people === 1 ? "emits" : "emit"} about ${unitFmt.co2(total.c)} CO2e a year`;
    if (total.c >= uk) line += total.c / uk < 1.1 ? ", as much as all UK film and TV production." : `, ${sig(total.c / uk, 2)} times as much as all UK film and TV production.`;
    else if (total.c >= tentpole) line += `, as much as ${sig(total.c / tentpole, 2)} studio tentpoles.`;
    else if (total.c >= feat) line += `, as much as ${sig(total.c / feat, 2)} indie features.`;
    else line += ".";
    $("accessLine").textContent = line;

    const rows = A.rungs.map((r) => ({ label: r.label, r: M.fixed(r.kg), cls: r.cls || "conv", tip: `${esc(r.label)}: ${unitFmt.co2(r.kg)} a year${r.src ? "<br>" + esc(r.src) : ""}` }));
    rows.push({ label: A.world.label, r: A.world.kg, cls: "ai", tip: `${esc(A.world.label)}: about ${unitFmt.co2(A.world.kg.c)} a year<br>Likely ${rangeTxt(unitFmt.co2, A.world.kg)}<br>300–550 million generated seconds a day` });
    rows.push({ label: "Your scenario", r: total, cls: "ai", tip: `Your scenario: ${unitFmt.co2(total.c)} a year<br>Likely ${rangeTxt(unitFmt.co2, total)}` });
    rows.sort((a, b) => a.r.c - b.r.c);
    const svgHost = $("ladder");
    rangeChart(svgHost, rows, unitFmt.co2, { labelW: Math.min(230, Math.max(130, (svgHost.clientWidth || 400) * 0.45)), rowH: 28, bars: true, stack: true, aria: "Annual CO2e of your scenario against production benchmarks" });
    svgHost.querySelectorAll(".rowlab").forEach((t) => { if (t.textContent === "Your scenario") t.classList.add("you"); });
  }
  function initAccess() {
    const A = D.access;
    $("accessProse").innerHTML = A.prose.map((p) => `<p>${p}</p>`).join("");
    $("accessFacts").innerHTML = A.facts.map((f) => `<div><b>${f.fig}</b><p>${f.text}</p></div>`).join("");
    $("aPeople").addEventListener("input", renderAccess);
    $("aSecs").addEventListener("input", renderAccess);
  }

  /* ---------- Static tables ---------- */
  function initStatic() {
    const p = M.perGeneratedSecond("seedance25", "720p");
    $("heroWh").innerHTML = `${sig(p.facWh.c, 2)}<small>Wh</small>`;
    $("heroCo2").textContent = unitFmt.co2(p.co2Kg.c);
    $("heroWater").textContent = unitFmt.water(p.waterL.c);
    $("heroCost").textContent = "$" + p.price.c.toFixed(2);

    $("styleTable").querySelector("tbody").innerHTML = Object.values(D.styles).map((s) =>
      `<tr><td>${esc(s.label)}</td><td>${esc(s.takes)}</td><td class="num">${fmtRatio(s.genPerFinished.lo)} to ${fmtRatio(s.genPerFinished.hi)} (typical ${fmtRatio(s.genPerFinished.c)})</td><td>${esc(s.example)}</td></tr>`).join("");

    $("factorTable").querySelector("tbody").innerHTML = D.factorTable.map((r) =>
      `<tr><td>${esc(r[0])}</td><td class="num">${esc(r[1])}</td><td class="num">${esc(r[2])}</td><td>${esc(r[3])}</td></tr>`).join("");

    $("sources").innerHTML = D.sources.map((s) => `<li>${s.u ? `<a href="${esc(s.u)}" target="_blank" rel="noopener">${esc(s.t)}</a>` : esc(s.t)}</li>`).join("");
  }

  /* ---------- Boot ---------- */
  initStatic();
  initControls();
  buildScenes();
  initAccess();
  update();
  let rz;
  addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(update, 120); });
})();
