# Stream G: Scenario-level footprints for practical, VFX/CGI and AI approaches

**Research date:** 2026-09-25. **Stream:** G (high-impact shots). **Status:** research only; nothing built.
**Working files:** `research/G/` holds downloaded source PDFs and XLSX files, the text extractions, `calc.py` (every calculation in this document) and `calc_output.txt`.

**Labels used throughout**
- **[S]** = sourced value (the source is cited next to it).
- **[A]** = my assumption about an activity quantity (litres, km, days, core-hours) that I could not source. Each one is a slider input for the tool, not a finding.
- **[D]** = derived by arithmetic from [S] and/or [A] inputs. The arithmetic is shown or is in `G/calc.py`.
- Confidence is H/M/L. Primary (P) means the organisation that produced the number. Secondary (Sec) means a report of someone else's number.
- **Marginal (incremental)** means only the extra resources the shot needs when the unit is shooting anyway. **Fully loaded** means the shot's share of a whole production day, taken from industry averages. The tool should show both, because AI can only remove the fully-loaded footprint when it removes a whole shooting day, unit or trip.
- The default grid intensity for compute is the US average of **0.350 kgCO2/kWh** (EPA eGRID2023 via the EPA 2025 Hub [S]). The UK equivalent is **0.144 kgCO2e/kWh** (DESNZ 2026, generation plus T&D [S]).

---

## 1. Summary of key findings

1. **Burning the fuel in a practical explosion is a small part of its footprint. Logistics and the destroyed vehicle dominate.** The largest film explosion on record (*Spectre*, 8,418 L kerosene + 33 kg explosives, Guinness [S, P]) comes to **≈25.9 tCO2e** from the fuel (DESNZ kerosene incl. WTT [D]). That is **<1% of an average tentpole's 2,996 tCO2e** footprint (SEA 2025 [S]). A typical vehicle-explosion day comes to about **0.8–6.7 tCO2e marginal (central ≈2.1 t)** [D, mostly A quantities]. Crew and SFX vehicles, the generator and trucks make up most of that; the fireball's CO2 is only about 0.06–1.5 t of it (central ≈0.3 t).
2. **The vehicle's embodied carbon is the swing factor.** A 12 m diesel urban bus embodies **≈37 tCO2e** (11.6 t × 3.2 tCO2e/t, ICCT 2023 [S/D]). A lower-medium petrol car embodies **7.2 tCO2e** (ICCT 2021 [S]). Under the usual cut-off (recycled-content) LCA convention, a vehicle already at end of life carries ~0. A running vehicle bought to destroy carries a share of it, and a car built for the shoot carries all of it. The car counts are large: *Furious 7* destroyed 230+ of the 340 cars it used, *Fury Road* built 150 vehicles of which 88 survived, and *Fast X* built ~200. On the new-equivalent basis, *Furious 7*'s wrecks alone come to **≈1,656 tCO2e** [D], more than half an average tentpole. I have not found a source that says which convention the industry calculators (PEAR, albert) use.
3. **Black carbon (soot) could be larger than the CO2 from big fuel fireballs.** I could not verify this. Assuming soot yields of 1–4% of fuel mass and a black-carbon GWP100 of 120–1,800 (Bond et al. 2013 bounds; I did not re-verify the yield values), *Spectre*'s fireball adds **8–490 tCO2e-equivalent** on top of the ~26 t of CO2. This is flagged as a sensitivity and not a finding.
4. **VFX is usually lower-carbon than practical per shot, but not always, and not at blockbuster scale.** A mid-tier CG explosion comes to roughly **7–130 kgCO2e** (compute plus artist workstations, US grid [D/A]). A hero-tier feature shot comes to roughly **0.1–5.7 tCO2e** [D/A]. At the extreme end, *Avatar: The Way of Water* ran **3.3 billion thread-hours on AWS** (AWS [S, P]). At 2–5.75 Wh per thread-hour that is **6.6–19 GWh**, or **≈0.7–6.6 kt CO2e** depending on the grid [D]. That is comparable to or larger than an average tentpole's entire reported production footprint. Its longest single shot (13.6 M thread-hours, secondary source) alone comes to **≈3–27 tCO2e** [D]. Industry production footprints (SEA/PEAR) largely leave out post/VFX. Ecoprod puts post-production at **12%** of a film's footprint [S].
5. **The biggest, clearest carbon wins for replacing footage with AI (or stock/VFX) are:**
   - **Location trips abroad.** Five crew flying London↔Cape Town economy, with 6 hotel nights, comes to **≈15.9 tCO2e**. The same trip in business class is **≈42 t**. With 250 kg of gear as air freight it is 20–46 t [D, DESNZ 2026 factors S].
   - **Helicopter aerials.** An H125 burns **190 L/h** (operator spec [S, P]), which is **≈583 kgCO2e per flight hour** (no RF). A 3–10 h aerial day is **1.75–5.8 t**. A drone day is **≈1 kg** of electricity plus the crew van [D].
   - **Large crowds.** About **10 kgCO2e per extra per day** (range 4–25) [D]. 3,000 extras × 3 days ≈ **91 t** (37–224).
   - **Large physical set builds.** An illustrative 66 t materials build comes to **≈45 t embodied + ≈12 t construction-crew commuting**. Landfilling 50 t of timber adds **+46 t** (DESNZ wood landfill 925 kgCO2e/t [S]). Recycling it adds only ≈0.2 t.
6. **Dialogue scenes are where AI saves least and can lose on carbon.** A standing-set stage day draws **≈70–140 kgCO2e** of lighting power from the US grid (29–58 kg in the UK) [D]. At an assumed ~0.60 kWh per 8 s 720p generation (Sora-2-Pro-class energy, from Stream A), the break-even is **≈500 generations**. A 3-minute scene with heavy rerolling for performance and lip-sync (for example 23 kept clips × 30 rerolls ≈ 690 generations) would then **exceed** the practical marginal footprint. At Seedance-1-class energy (~0.115 kWh per clip) the break-even is ≈2,600 generations. The answer depends on the reroll ratio. Anchors from Streams C/E/F: ~3 generations per kept shot (invideo rule of thumb), 10 (Curious Refuge average), 20× (*House of David*) and ~300:1 (*Air Head*).
7. **Break-even framing for the AI row.** For every scenario except dialogue and a mid-tier VFX explosion, the practical marginal footprint equals **thousands to hundreds of thousands** of AI generations at the per-clip energies Stream A reports (see §2.0 and the tables). AI wins on carbon by orders of magnitude unless the reroll ratio or the per-clip energy is extreme. Against a mid-tier VFX explosion (≈25 kg) the break-even is only ≈120–620 generations, so the AI-vs-VFX margin is small.
8. **Cost.** Practical and VFX costs are dominated by labour, not by fuel or compute. Render compute for a mid-tier explosion is only **≈$150–$260** (Fox Renderfarm and GarageFarm rates [S]). The VFX shot itself is priced at **$3k–$50k+** for destruction (vendor guide [S, Sec, L/M]). A helicopter aerial day costs **$8k–$30k all-in**, against **$800–$1,800** for a drone package (Saturation.io [S, Sec, M]). A stock clip costs **≈$67–$75** through Adobe Stock credit packs [S, P]. Nolan's claim that the real *Tenet* 747 was cheaper than miniatures plus CG is on record (Total Film via GamesRadar/TheWrap [S, Sec, M]). For scale, the FilmLA sample $295.5 M tentpole budget had **$19.0 M set construction, $6.9 M SFX, $3.0 M extras, $10.4 M second unit and $60 M VFX** [S, P].

---

## 2. Per-scenario analysis and tables

### 2.0 Common method

**Practical (marginal)** = Σ fuel (L × DESNZ 2026 kgCO2e/L incl. WTT) + Σ vehicle-km × DESNZ per-km factor + generator litres (Generator Source load table) × diesel factor + meals × ADEME meal factor + materials (t × ICE/DESNZ factor) + optional embodied share of destroyed assets.
**Practical (fully loaded)** = shooting days × per-day production average. SEA 2025 gives **42.4 tCO2e per shooting day for tentpoles** [S]. Derived per-day values [D]: large ≈22.5, medium ≈10.4 and small ≈11.7 tCO2e per day. These come from dividing each category's total by the implied shoot days in SEA's appendix (utilities total ÷ utilities per day). They are rough because the per-day utility values are rounded. The same method gives tentpole ≈45.3 against the stated 42.4.

**VFX/CGI** = compute_core_h × Wh/core-h / 1000 × CI_farm + artist_days × 8 h × kW_workstation × CI_office (+ embodied hardware, which I did not quantify).
- Wh per core-hour, all-in at the wall including PUE. Central **8 Wh** is 5.2 W per physical core [A, bracketed by the next two points] × PUE 1.54 (Uptime 2025 global average [S, Sec]). The range is **4–36 Wh**:
  - SPECpower: a single-socket EPYC 9654P draws 346 W for 96 cores, or **3.6 W/core** at 100% load [S, P].
  - Cloud Carbon Footprint (AWS average): 3.5 W per vCPU max + 0.392 W/GB RAM, PUE 1.135. With 4 GB per vCPU that is **≈5.75 Wh per vCPU-hour** [S/D].
  - Disney *Big Hero 6* farm (2014): 1.5 MW for ~1 M render-hours/day, or **≈36 Wh per core-hour** [D from S]. This is the historical upper bound.
- Workstation: **0.4 kW** under load [A]. The upper bound is an RTX 5090 (575 W TGP; 1,000 W PSU recommended) [S, P].
- **Shot tiers.** These are anchored on real data, but the tier boundaries are my assumptions:
  - Mid-tier (TV/streaming FX shot): **1,000–20,000 core-h**, 5–15 artist-days. The low anchor is a single-artist Houdini explosion whose final simulation took ~6 h (The Rookies [S, Sec]).
  - Hero-tier (feature): **50,000–1,000,000 core-h**, 20–60 artist-days. Anchors: Aquaman ≈12,000 render-hours per shot, with render-hours likely meaning worker/node-hours (AWS/Scanline [S, P]); Avatar: Fire and Ash ≈398,000 render-hours per shot (FanBolt citing Wētā [S, Sec]); Transformers 3's heaviest destruction shot at 288 h per frame (Wikipedia [S, Sec]).
  - Artist-days per shot: *Godzilla Minus One* had 610 shots done by 35 artists in ~8 months, or **≈10 artist-days per shot** (35 × 8 × ~21.7 working days ÷ 610) [D from S]. *Monsters* (2010) had 250 shots in 5 months by one artist, or ≈0.4 days per simple shot, although the creature shots took months [D from S].

**AI (placeholder, to be filled from Streams A/B/C):**
```
AI_kWh   = Σ_shots [ ceil(shot_s / clip_s) × R × E_clip_kWh(model, res, clip_s) ] × k_overhead × PUE_dc
         + upscale/post compute + workstation_h × kW_ws
AI_kgCO2e = AI_kWh(dc part) × CI_dc  +  local part × CI_local  (+ amortised training/embodied, per Streams A/B)
AI_cost  = Σ clips × R × price_per_clip  + labour_h × rate + subscriptions
AI_water = AI_kWh × (WUE_dc + EWIF_grid)          [L/kWh factors from Stream A/B]
R = generations per kept clip. Anchors from sibling streams: ~3 (invideo rule of thumb), 10 (Curious Refuge avg),
    "20×" (House of David), ~300:1 (Air Head, fxguide).
k_overhead ≈ 1.1–1.25 (Delavande et al. 2025: GPU = 80–90% of measured energy, via Stream A notes)
```
**Break-even** (the AI energy at which AI equals the alternative) = alternative_kgCO2e ÷ CI_dc. It is reported below at CI_dc = 0.35 kg/kWh, together with the equivalent number of 8 s 720p generations at two per-clip energies taken from Stream A's notes on Jegham et al. 2026 (arXiv 2607.04553, GPU-only, estimated): **Seedance-1-class 80 Wh** and **Sora-2-Pro-class 418.5 Wh**. Each is multiplied by 1.2 for overhead and by 1.2 for PUE [A], giving **0.115 kWh** and **0.603 kWh** per generation. These AI numbers are Stream A's and are used here only for break-even context.

---

### 2.1 Vehicle explosion (bus or car blown up)

**How it's done practically.** The SFX department rigs the vehicle, usually one bought for destruction, with fuel "mortars" or fuel bags (gasoline and/or propane or kerosene) lifted by small black-powder charges. Detonating cord (PETN, typically 5.3–10.6 g/m; lighter cord is used for film SFX [S, Wikipedia]) sequences the effect. The shoot needs a licensed pyrotechnician, a fire safety officer and/or engine company on standby, permits, rehearsals, 1–5 prep days, one shoot day and cleanup (wreck haul, scorched surfaces, fuel residue, fire water run-off).
- *Oppenheimer*'s Trinity blast used "mostly" **gasoline and propane**, with **aluminium powder and magnesium** for the flash, shot as "big-atures" (Scott R. Fisher [S, Sec, M]).
- LA costs [S, Sec via Stream E notes on FilmLA FY2026/27]:
  - LAFD Fire Safety Officer **$127/h** (4-h minimum + 1 h travel); LAFD spot check **$287** per permit.
  - LA County SFX permit **$350 per location**; County FSO **$230.19/h**.
  - FilmLA rider for SFX explosion/smoke **$78 per location**.

**How it's done in VFX.** A Houdini pyro solve (combustion, smoke) plus RBD fracture of the vehicle, a debris particle sim, lighting and render (Karma/Arnold/Mantra), and a comp over a plate. The plate is shot anyway during the main unit day, so its marginal cost is small. Sims are hard to split across farm nodes. One vendor says a DOPnet Pyro solve "either fits on one worker … or it does not run on the farm at all", and gives mid-complexity pyro caches of 20–60 GB per 240 frames (SuperRenders 2026 [S, Sec, L/M]).

**Famous examples (real figures)**

| Production | Figure | Source (P/Sec) | Conf. |
|---|---|---|---|
| *Speed* (1994) | 11 GM New Look buses + 3 Grumman 870 buses; **2 destroyed in explosions**; the bus crashes into a 707 cargo plane | Wikipedia (Sec) | M |
| *Spectre* (2015) | **8,418 L kerosene + 33 kg explosives**, 68.47 t TNT-equivalent, >7.5 s, Erfoud, Morocco. Guinness record. (Wikipedia instead says 8,140 L and 24 × 1 kg; I use Guinness.) | Guinness (P) | H |
| *Tenet* (2020) | A real Boeing 747 was bought and crashed into a hangar. Nolan: "it would actually be more efficient to buy a real plane … rather than build miniatures or go the CG route". 4 CH-47 Chinooks were loaned for 4 days. | Total Film via GamesRadar/TheWrap (Sec); Wikipedia (Sec) | M |
| *Oppenheimer* (2023) | Gasoline, propane, aluminium powder and magnesium; 160 VFX artists worked on the film; Nolan declined to give costs | Wikipedia, The Quint (Sec) | M |
| *Fury Road* (2015) | 150 vehicles built, 88 survived; "90% of effects practical" | Wikipedia (Sec) | M |
| *Furious 7* (2015) | **340 cars used, 230+ destroyed**; Monarch Pass sequence destroyed 40+ | Wikipedia (Sec) | M |
| *Fast & Furious 6* | A tank crushed **≈250 cars** | Wikipedia (Sec) | M |
| *Fast X* (2023) | ~7 duplicates of each significant car; **≈200 cars** built | Wikipedia citing vehicle coordinator (Sec) | M |
| *Transformers: Dark of the Moon* | CG building destruction took **288 h per frame**; Driller up to 122 h per frame (ILM) | Wikipedia (Sec) | M |
| FilmLA $295.5 M tentpole | SFX department **$6.9 M**; picture vehicles & animals $2.6 M; VFX $60 M | FilmLA 2016 study (P) | H |

**Inventory table: one bus explosion, a ~5 s hero moment**

| Approach | kgCO2e central (range) | Water | Cost | Key drivers | Data quality | Sources |
|---|---|---|---|---|---|---|
| **Practical, marginal** (excluding the vehicle's embodied carbon) | **2,124 (794–6,682)** [D] | ~10 m³ fire water [A] | Not established. Components: FSO $127/h, permits $78–$350 per location, bus purchase (not sourced), SFX crew (not sourced) | SFX/stunt vans 2,000 km = 637 kg; 100 kW generator at ½ load for 10 h = 155 L = 496 kg; 40 crew commuting = 383 kg; gasoline 80 L = 237 kg; propane 50 L = 86 kg; wreck haul 105 kg; meals 97 kg; engine standby 77 kg; explosives ≤3 kg | Factors S (DESNZ/ADEME/Generator Source); **quantities A** | DESNZ 2026; Generator Source; ADEME; FilmLA via Stream E |
| + bus embodied carbon | +0 (cut-off, end-of-life bus) / **+37,100** (new-equivalent) | — | — | 11.6 t bus × 3.2 tCO2e/t | S factors (ICCT), convention choice | ICCT 2023 |
| + car embodied carbon (if a car) | +0 / **+7,200** (lower-medium) / +10,100 (US SUV, 1.935 t × 5.2) | — | — | ICCT production + recycling factor | S | ICCT 2021 |
| + black carbon (sensitivity only) | For 80 L gasoline (≈60 kg fuel): ≈0.07–4.3 t CO2e-eq [D, unverified yields] | — | — | soot yield 1–4% [A, unverified] × GWP100 120–1,800 | **L** | Bond et al. 2013 (GWP bounds) |
| **Practical, fully loaded** (the explosion takes a whole tentpole unit day) | **42,400** per day [S] | — | FilmLA CA-qualified spend: features $760k per shoot day (2021: 279 days, $212.1 M) and $929k (2022: 672 days, $624.4 M); EEAAO $315k/day [S, P, verified in PDF] | Whole-production average day | S (SEA) | SEA 2025; FilmLA |
| **VFX, mid tier** (TV/streaming) | **25 (7–129)** [D] | Placeholder: kWh × (WUE + EWIF) | Shot **$1k–$15k** (fire) or **$3k–$50k+** (destruction) [S, Sec]; compute **$153–$264** for 5,000 core-h | 5,000 core-h (1k–20k) at 8 Wh (4–16) + 10 artist-days (5–15) at 0.4 kW | Tiers A; energy factors S | Pixune 2026; Fox; GarageFarm; SPECpower; Uptime |
| **VFX, hero tier** (feature) | **594 (92–5,666)** [D] | Placeholder | Destruction $3k–$50k+ per shot (vendor range; feature hero shots are likely above it, but I have no source); compute ≈$6.1k–$10.6k for 200k core-h | 200k core-h (50k–1M) at 8 Wh (4–16) + 30 artist-days | Tiers A anchored to Aquaman/Avatar | AWS; FanBolt; Wikipedia |
| **AI** (placeholder) | = formula in §2.0. Suggested R: 3 / 10 / 30 [A]. Clip count: 1 × 5 s shot | Formula | Formula | Per-clip energy × R | — | Streams A/B/C |
| *Break-even vs practical marginal* | 6,069 kWh ≈ **52,700** Seedance-1-class or **10,100** Sora-2-Pro-class generations | | | | | |
| *Break-even vs VFX mid tier* | 71 kWh ≈ **620 / 119** generations | | | | | |

**Who wins and why**
- **Carbon:** AI < VFX mid-tier < practical. The practical footprint comes from people, vehicles and generators, plus the vehicle if you count its embodied carbon. It does not come mainly from the fireball's CO2. AI's advantage over VFX is modest in absolute terms (tens of kg), while its advantage over practical is 2–40 t per shot depending on the vehicle accounting. The user's bus-explosion hypothesis holds on this evidence.
- **Cost:** For the same fidelity, VFX is usually cheaper than practical once you include the vehicle, SFX crew, permits, safety and the extra unit time. Nolan's 747 is the documented counter-example, where practical beat miniatures plus CG for a very large hero asset because a retired airframe was cheap. AI is cheapest per clip. The open question for AI is fidelity and control, not money.

---

### 2.2 Car chase or crash

**Practical.** A car chase needs picture cars in multiples (≈7 duplicates per hero car on *Fast X* [S]); precision drivers; camera cars (a crane arm such as the Russian Arm on a performance SUV, plus follow and tracking vehicles); road closures with police; tow and transport trucks; and rehearsal plus shoot days, often 10+ days for a franchise sequence. The *Furious 7* airdrop took "months of prep" and six single-car dry runs, and dropped cars from C-130s at 12,000 ft [S, Wikipedia]. LA costs [S, Sec via Stream E]: lane/street closure **$312 per location**; LAPD off-duty **$67.19–$77.90/h** (8-h minimum); FilmLA lane-closure rider $78.

**VFX.** Full-CG cars and environments, or hybrid plates with CG crashes. A CG crash needs RBD and soft-body deformation, glass, debris and dust.

**Inventory table: one chase day, or a 40-shot, ~2-minute sequence for VFX**

| Approach | kgCO2e central (range) | Cost | Key drivers | Quality | Sources |
|---|---|---|---|---|---|
| **Practical, marginal**, per chase day | **2,390** [D] (≈1–6 t depending on fleet size [A]) | Closures $312 per location plus police; picture cars and multiples (not sourced); FilmLA tentpole picture vehicles & animals **$2.6 M**, transport **$10.6 M** | 80 crew commuting 766 kg; 100 kW generator 496 kg; transport HGVs 400 km = 419 kg; picture cars 640 km at 1.5× aggressive-driving factor [A] = 300 kg; meals 194 kg; camera cars 122 kg; police cars 94 kg | Factors S, quantities A | DESNZ 2026; FilmLA |
| + destroyed cars | 5 cars: 0 (cut-off) / 7,200 (at 20% remaining life [A]) / 36,000 (new-equivalent) | — | 7.2 t per car (ICCT) | S factor, A convention | ICCT 2021 |
| Franchise scale | *Furious 7*: 230+ destroyed → **1,656 t** new-equivalent, **331 t** at 20% [D] | — | — | M | Wikipedia; ICCT |
| Practical, fully loaded | 42.4 t per tentpole day × chase days [S] | — | — | S | SEA 2025 |
| **VFX** (40 CG shots) | **2,900 (20k core-h per shot) – 23,100 (200k core-h per shot)** [D] | 40 × $3k–$50k+ = **$120k–$2M+** [D from vendor range] | Compute at 8 Wh per core-h + 15 artist-days per shot | A tiers | as §2.0 |
| **AI** | Placeholder. Suggested R: 5 / 15 / 50 [A] (continuity, physics, matching coverage) | Formula | — | — | Streams A–C |
| Break-even vs one practical day | 6,828 kWh ≈ 59k / 11k generations | | | | |

**Who wins.** *Carbon:* for a full chase sequence, VFX at 3–23 t is below practical at 10–20 days × ~2.4 t marginal, plus any embodied carbon in wrecks. AI is lowest by far. Hero-tier full-CG chases are **not** negligible, though: 23 t is about half a tentpole shooting day. *Cost:* practical chases are extremely expensive in labour and closures. VFX sequences run to seven figures. AI's weakness here is shot-to-shot continuity, so expect a high R.

---

### 2.3 Crowd scene (hundreds to thousands)

**Practical.** Background actors need casting, travel (often coached from pickup points), holding areas (marquees, toilets, generators), wardrobe, hair and makeup (period costume is labour-intensive), catering, and extra ADs and marshals. Real examples:
- *Gandhi*: **300,000+ extras** in the funeral scene, a Guinness figure [S, Sec].
- FilmLA's tax-credit tables list extras counts, e.g. *Ouija: Origin of Evil* **2,642** extras hired [S, P].
- The FilmLA sample tentpole budgeted **$3.0 M** for extra talent [S, P].
- *Downton Abbey – The Grand Finale* ran a marquee for a **300-strong crowd** on hydrogen power and avoided ~1,800 L of diesel (albert 2025 [S, P]).
I could not source background-actor day rates: the SAG-AFTRA rate sheets were blocked (403).

**Digital crowds.** MASSIVE, built for *LOTR*, drives agents from motion-capture clip libraries; *ROTK* recorded 450 motions for its digital horses [S, Wikipedia]. Golaem now redirects to Autodesk (autodesk.com/solutions/golaem), and I could not retrieve its pricing (403). The usual hybrid is to shoot 50–300 real extras and tile or augment them digitally.

**Per-extra-day footprint [D]:** travel 1.8 kg by coach or 6.4 kg by car for a 40 km round trip at 1.3 occupancy; 2 meals 4.9 kg (the ADEME mixed-meal mean of 2.43 kg; vegetarian 0.85, beef 4.97); share of a holding-area generator 1.1 kg (60 kW at ¾ load for 12 h, shared by 500). **Central ≈10 kg per extra-day (4–25).** Costume embodied carbon and laundering are excluded (gap).

| Approach | kgCO2e central (range) | Cost | Key drivers | Quality | Sources |
|---|---|---|---|---|---|
| **Practical, 500 extras × 1 day** | **5,000 (2,000–12,500)** [D] | Extras day rates (not sourced) + crowd crew + holding | Travel mode; meals (beef vs vegetarian is a 6× difference); holding power | Factors S, quantities A | DESNZ; ADEME; Generator Source |
| Practical, 1,000 × 3 days | **30,200 (12,300–74,700)** [D] | | | | |
| Practical, 3,000 × 3 days | **90,600 (36,800–224,200)** [D] | | | | |
| **VFX digital crowd, per shot** | **36 (5k core-h) – 302 (100k core-h)** + 20 artist-days [D] | **$1k–$25k+ per shot** [S, Sec vendor]; one mocap session to build the agent library (not quantified) | Agent library build, sim, render | A tiers | Pixune; §2.0 |
| **AI** | Placeholder. Suggested R: 3 / 10 / 30 [A] | Formula | — | — | — |
| Break-even vs 500 × 1 day | 14,286 kWh ≈ 124k / 24k generations | | | | |

**Who wins.** *Carbon:* digital or AI crowds beat real crowds by 1–3 orders of magnitude once crowds reach the hundreds. The hybrid approach (a small real crowd plus a digital extension) captures most of the saving. *Cost:* digital crowds are cheaper per shot at scale. The practical crowd is also needed for foreground performance and interaction, where AI and VFX are weakest.

---

### 2.4 Aerial shots

**Helicopter.** An Airbus H125 (AS350-B3e) burns **190 L/h**, carries 540 L of fuel, has ~2.5 h endurance and cruises at 135 mph (Custom Helicopters fleet spec [S, P, H]). The AS350-B2 is also listed at 190 L/h. The alternative figure is **44 US gal/h ≈ 166.6 L/h** (AviaCost calculator [S, Sec, M]). Emissions are **583 kgCO2e per flight hour** (DESNZ aviation turbine fuel 2.54269 + WTT 0.52817 kg/L) [D]. DESNZ recommends a 1.7× RF multiplier on the CO2 of jet fuel burned at altitude. Applying it gives 922 kg/h, but low-level helicopter work arguably does not form contrails, so I show it only as a sensitivity. Typical flight hours per aerial day are **not sourced**. I assume 3–10 h including ferry [A], bounded by the 2.5 h endurance, which means 1–3 refuel cycles per day, and by ferry distance at 135 mph.

**Drone.** A DJI Inspire 3 flies on **2 × TB51 batteries of 98.8 Wh each (197.6 Wh per flight)** for ~28 min maximum; its charging hub delivers 476 W (DJI [S, P, H]).

**Examples.**
- *Top Gun: Maverick* paid the Navy **$11,374 per flight hour** for F/A-18s (Bloomberg via Skies Mag and others [S, Sec, M]), shot **800+ hours of aerial footage** with rigs that included an AS350, and had ~2,400 VFX shots (Wikipedia [S, Sec]). F/A-18 cruise fuel burn of 3,000–6,000 lb/h is from a low-quality secondary source (L), so I do not compute it.
- *Mission: Impossible – Fallout*'s helicopter chase produced **70 hours of footage for 7.5 minutes** on screen [S, Wikipedia].

| Approach | kgCO2e central (range) | Cost | Key drivers | Quality | Sources |
|---|---|---|---|---|---|
| **Helicopter aerial day** | **2,917 (1,750–5,830)** for 5 h (3–10 h) [D]; with RF 4,610 (5 h) | Package **$8k–$25k+** per aerial day; "all-in $10k–$30k" in major markets; senior aerial DP $2.5k–$4.5k+ per day | Flight hours incl. ferry; RF convention | Fuel S (P); hours A | Custom Helicopters; DESNZ; Saturation.io |
| **Drone day** | **≈1 kg** electricity (12 flights × 197.6 Wh ÷ 0.88 charging efficiency [A] = 2.7 kWh) + ≈32 kg van (100 km) [D] | Cinema drone package **$800–$1,800 per day**; operator $500–$1,200 (film/TV) | Crew travel dominates | S (P) specs | DJI; Saturation.io |
| **Stock clip** | ≈0 marginal (the original shoot is a sunk cost) | **≈$67–$75** per video via Adobe Stock credit packs (80 credits $669.99 = 10 videos; 40 credits $359.99 = 5; 16 credits $149.99 = 2); subscriptions cheaper per asset | Licence | P | Adobe Stock plans page |
| **VFX** (CG aerial or environment) | See §2.6 full-CG environment (≈80–300 kg per shot at 20k–100k core-h + artists) | Pixune set extension tiers $500–$5,000 (intermediate) | | A | |
| **AI** | Placeholder. Suggested R: 2 / 3 / 10 [A]; aerial establishing shots are the most forgiving | Formula | | | |
| Break-even vs helicopter day | 8,334 kWh ≈ 72k / 14k generations | | | | |

**Who wins.** *Carbon:* drone ≈ stock ≈ AI ≪ helicopter. Replacing a helicopter with a drone removes ~99%. AI's extra benefit over a drone is small in kg, but AI also removes crew travel to the location (see §2.5). *Cost:* stock < AI ≈ drone ≪ helicopter. A helicopter is still needed for altitude, speed, restricted airspace and heavy camera payloads.

---

### 2.5 Location shoot abroad or exotic establishing shot (likely AI's biggest win)

**Base case: 5 crew, long-haul, 6 hotel nights (5 shoot days + arrival).** Great-circle distances are computed from airport coordinates [D]: LHR–CPT 9,681 km; LAX–NRT 8,753 km; LAX–KEF 6,926 km; LAX–AKL 10,487 km. **DESNZ 2026 factors already include an 8% uplift for indirect routing, so use the plain great-circle distance** (methodology §8.37–8.38 [S, P]). RF is included in the "With RF" factors (Lee et al. 2021 basis, central multiplier 1.7).

| Line item (LHR↔CPT) | Arithmetic | kgCO2e |
|---|---|---|
| Flights, economy, with RF, incl. WTT | 5 × 2 × 9,681 km × (0.11704 + 0.02461) | **13,713** |
| (Same, business class) | × (0.3394 + 0.07137) | (39,767) |
| (Same, economy without RF) | × (0.06926 + 0.02461) | (9,088) |
| Hotels (South Africa) | 5 rooms × 6 nights × 51.4 kg | 1,542 |
| Local transport | 1,800 km, large diesel 4×4 [A] × (0.20905 + 0.0507) | 468 |
| Meals | 5 × 6 days × 3 × 2.43 | 218 |
| **Total, economy + RF** | | **≈15,941** |
| Optional: 250 kg of camera/grip gear as air freight [A] | 0.25 t × 19,362 km × 0.89939 (long-haul freight with RF) | +4,353 → 20,295 |
| Business-class total | | 41,995 (46,348 with freight) |
| LAX↔NRT economy (international factor 0.10916 + 0.01656; Japan hotel 39.0) | | 12,860 (16,796 with freight) |
| LAX↔KEF economy (Iceland hotel factor not in DESNZ; US 16.1 used as proxy) | | 9,876 |
| Local-crew variant (fly 2, hire 3 locally), LHR↔CPT | | ≈7,700 |

| Approach | kgCO2e central (range) | Cost | Drivers | Quality | Sources |
|---|---|---|---|---|---|
| **Second unit abroad** (5 crew, long-haul, 5 days) | **15,900 (9,900–46,300)** [D] | Not sourced (fares, per diems, fixers, permits). FilmLA tentpole: location expenses **$13.8 M**, second unit **$10.4 M** | Flights (86% of economy total), class of travel, RF convention, freight | Factors S (P, H); quantities A | DESNZ 2026; FilmLA 2016 |
| Local-crew second unit | ≈7,700 [D] | Lower travel cost | Fewer flights | | |
| **Stock establishing shot** | ≈0 marginal | ≈$67–$75 per clip (Adobe credit packs) | | P | Adobe |
| **VFX/CG environment or matte painting** | ≈80–300 kg per shot [D, §2.6 tiers] | Pixune environment extension (intermediate) $500–$5,000 | | A | |
| **AI** | Placeholder. Suggested R: 2 / 5 / 15 [A] | Formula | | | |
| Break-even vs economy trip | 45,546 kWh ≈ **395k / 76k** generations | | | | |

**Context.** For *The Creator* (2023), Gareth Edwards sent a *small crew to 80 real locations worldwide* and added VFX after picture lock. He estimated the film cost $80 M against the $300 M such a film would typically cost [S, Wikipedia]. In that case location travel was the cost-saving strategy against building sets and CG environments. albert reports that long- and medium-haul flights are **21% of the UK industry footprint**. It recommends asking whether a location is essential and "could virtual production methods help" [S, P].

**Who wins.** *Carbon:* stock and AI win by 3–5 orders of magnitude. This is the strongest scenario for the user's hypothesis, provided the AI shot actually replaces the trip and does not supplement it. *Cost:* stock is cheapest, then AI, then VFX environment work. Travel costs were not sourced but are clearly in the tens of thousands of dollars for 5 people over 5 days.

---

### 2.6 Period or fantasy set build

**Practical.** Construction uses timber framing, plywood skins, steel (scaffold, usually rented and reused), plaster and fibrous plaster, polystyrene carving, and paint, followed by strike and waste. For typical tonnage I found no primary source. The Screen New Deal only says a tentpole's plywood "amounts to the volume of 2.5 cargo planes" and its waste to "313.5 blue whales" [S, P, but not quantitative]. albert 2025 reports **800,000 t of materials to landfill** across UK productions in 2024, and **24,037 tCO2e from materials & waste** (≈14% of the UK total of 174,437 t). Halving virgin materials would cut **4,988 tCO2e** [S, P]. The FilmLA sample tentpole had set construction **$19.0 M**, set design $3.7 M, set dressing $8.5 M and stage/facilities $3.8 M [S, P].

**Illustrative large set (quantities [A]; factors ICE via GreenCalculus summary [S, Sec, M] with DESNZ as a cross-check [S, P]):**

| Material | t [A] | Factor (kgCO2e/kg) | tCO2e |
|---|---|---|---|
| Sawn softwood (kiln-dried) | 30 | 0.31 (ICE; excludes biogenic storage) | 9.3 |
| Plywood | 20 | 0.68 (ICE) | 13.6 |
| Steel, new, not reused | 5 | 1.55 (ICE world average) | 7.8 |
| Plaster/plasterboard | 10 | 0.39 (ICE) | 3.9 |
| Paint | 2 | 3.17 (**proxy**: DESNZ "average plastics"; I found no paint factor) | 6.3 |
| Polystyrene carving | 1 | 4.374 (DESNZ PS) | 4.4 |
| **Materials subtotal** | 68 | | **45.3** |
| Construction crew commuting (40 × 30 days × 60 km, cars at 1.3 occupancy) [A] | | | 11.5 |
| End of life, 50 t timber and plywood: **landfill** 925.4 kg/t vs **closed-loop/recycled** 4.65 kg/t (DESNZ) | | | **46.3 vs 0.23** |
| DESNZ cross-check on materials: wood 0.2695 t/t (13.5 t for 50 t), metals 3.822 t/t (19.1 t for 5 t) | | | |

| Approach | kgCO2e central (range) | Cost | Drivers | Quality | Sources |
|---|---|---|---|---|---|
| **Physical build** (illustrative) | **≈57,000 (recycled) – 103,000 (landfilled)** [D] | Tentpole set construction $19 M (whole film, not one set) | Tonnage [A]; landfill vs reuse; steel reuse | Factors S; tonnage **A (key gap)** | ICE via GreenCalculus; DESNZ; albert |
| **Virtual production / LED volume** | Power: 1,000 ROE BP2V2 panels × 95 W average (190 W max) + 20 kW processing [A] = 115 kW × 12 h = **1,380 kWh per day → 483 kg/day (US), 199 kg/day (UK)** [D]. 10 days ≈ 2–5 t, plus environment build (2–4 artists × 60 days ≈ 0.4–0.8 MWh ≈ 0.13–0.27 t) plus foreground set pieces | Unreal environment build **10–12 weeks, $15k–$200k** (*House of David* talk via Stream C [S, Sec]) | Panel count, hours, grid; embodied LED hardware (**not quantified**) | Panel power S (P); rest A | ROE Visual; Stream C |
| **Full CG environment** (30 shots) | **2,400 (20k core-h per shot) – 9,100 (100k core-h per shot)** [D] | 30 × Pixune intermediate/advanced tiers | Compute + 20 artist-days per shot | A | §2.0 |
| **AI** | Placeholder. Suggested R: 3 / 10 / 30 [A]; set consistency across shots is the challenge | Formula | | | |
| Break-even vs physical build (recycled) | ≈162,000 kWh ≈ 1.4 M / 270k generations | | | | |

**Who wins.** *Carbon:* AI < full CG ≈ LED volume ≪ physical build. The biggest practical lever is **end of life**: sending timber to landfill (methane) doubles the build's footprint compared with reuse or recycling. *Cost:* physical builds are large budget lines, and LED volumes carry high day rates (not sourced). AI's constraint is keeping the environment consistent across many shots and angles.

---

### 2.7 Weather and elements (rain, snow, wind, water tanks)

- **Rain.** Towers, bars and sprinklers are fed by water trucks or hydrants. **I found no sourced flow rate.** At 200–1,000 L/min [A] for 4 h, a rig uses **48–240 m³ of water**. Water supply and treatment adds 0.362 kg/m³ (DESNZ [S]), or 17–87 kg. Water-truck haulage (15 m³ loads, 30 km trips [A]) adds 101–503 kg. Night rain adds lighting (§2.8).
- **Snow.** Snow Business's SnowForce machine runs **~90–120 min on a 20 L tank of biodegradable foam fluid**. Its "SnowBase" is cellulose in paper bags, and 70% of its products and packaging are "sustainable" (Snow Business [S, P, M]). I found no source for cover rates (kg/m²). As a proxy, cellulose snow is paper at **1.34 tCO2e/t** (DESNZ "paper" primary production [S], proxy).
- **Wind.** Wind machines run on generator power (fan kW not sourced; gap).
- **Water tanks.** *Titanic*'s tank held **17 M US gal (64 M L)** (Wikipedia [S, Sec]). Baja Studios' four tanks hold >20 M gal combined and are fed by a seawater plant delivering **9,000 gal/min (34 m³/min)** [S, Sec]. Supply and treatment for one fill is ≈23 t (DESNZ water factor, which is conservative for seawater). Pumping, heating and filtration energy are not quantified.

| Approach | kgCO2e (range) | Water | Cost | Quality |
|---|---|---|---|---|
| **Practical rain, 4 h** | 118–590 [D] (water + trucks) + lighting and generator if at night | **48–240 m³ [A]** | SFX department (FilmLA tentpole SFX $6.9 M total) | **L (flow A)** |
| **Practical snow dressing** | Proxy 1.34 kg per kg of cellulose snow + foam fluid (not quantified) + clean-up | Low | Not sourced | L |
| **VFX rain/snow** | Usually library elements or particle sims (100–2,000 core-h [A]) → <1–6 kg [D] | ≈0 on set | Pixune smoke $500–$10k, water $2k–$20k+ per shot | L/M |
| **AI** (or AI video-to-video on real plates) | Placeholder. Suggested R: 2 / 5 / 15 [A] | Formula | Formula | — |

**Who wins.** *Carbon:* VFX ≈ AI < practical, but practical rain or snow is small in absolute terms (≤0.6 t) unless it forces a night shoot or large tanks. The practical option's larger footprint is **water volume**, which the tool tracks as its own metric. *Cost:* stock rain/snow elements composited in are cheap. Practical rain on actors still gives the best interaction (wet clothes, hair), which pushes toward hybrid approaches.

---

### 2.8 Night exteriors

**Practical.** Large night exteriors use condors with big HMIs (ARRIMAX 18/12: **18,000 W** [S, P]), balloon lights (Airstar-type helium balloons with HMI or LED [S, Wikipedia]; wattage not sourced, 4 kW assumed [A]) and LED panels (ARRI SkyPanel S360-C: **1,500 W max** [S, P]), usually powered from tow-plant generators.
- Example connected load: 2 × 18 kW + 10 × 1.5 kW + 2 × 4 kW + 10 kW miscellaneous = **69 kW** [A].
- 200 kW generator for 12 h (Generator Source table [S]): ¼ load, 4.7 gal/h → 213 L → **682 kg**; ½ load, 7.7 gal/h → 350 L → **1,117 kg** [D]. A grid tie-in delivering the same ~492 kWh would emit **172 kg (US)** or **71 kg (UK)** [D].
- albert 2024 figures: **3 M L** of generator fuel burned on UK productions = **7,206 tCO2e**. A hybrid unit-base generator cut fuel spend by **39%** (BBC). Netflix's *Hostage* cut diesel generator fuel by **60%** [S, P].

| Approach | kgCO2e per night (range) | Cost | Drivers | Quality |
|---|---|---|---|---|
| **Practical, diesel generators** | **680–1,120** (+ condor lift engines, not quantified) | FilmLA tentpole lighting $7.1 M (whole film) | Load factor; generator oversizing | Fuel table S; load A |
| Practical, grid/battery hybrid | 70–170 (grid) | — | Grid carbon intensity | D |
| **VFX day-for-night / relight** | Grading ≈ negligible; CG relight per §2.0 tiers | Low–moderate | | A |
| **AI** (video-to-video relight or generation) | Placeholder. Suggested R: 2 / 5 / 15 [A] | Formula | | |
| Break-even vs diesel night | 3,191 kWh ≈ 28k / 5.3k generations | | | |

**Who wins.** Replacing diesel with a grid tie-in or hybrid power already removes 60–90% of the lighting footprint. Day-for-night grading or AI removes the rest, plus the night premium in crew costs (not sourced).

---

### 2.9 Animals, dangerous or impossible shots (space, disasters, historical events)

When practical filming isn't feasible, the comparison is really **VFX against AI**.

| Example | Figure | Source | Conf. |
|---|---|---|---|
| *Avatar: The Way of Water* | **3.3 B thread-hours on AWS** over 8 months; 3,000+ VFX shots (AWS blog, 28 Feb 2023). Longest shot **13.6 M thread-hours**.  Correction (2026-09-25): the "40%" in the DCD snippet is the share of the film at 48 fps, not the share rendered in the cloud; no source gives the cloud share | AWS (P); DCD (Sec, unverified) | H / L |
| *Avatar: Fire and Ash* | **1,248,087,308 render hours** ("142,000 years"); 3,132 VFX shots; 140 PB of disk; 1,200-person crew | FanBolt citing Wētā (Sec) | M |
| *Aquaman* (Scanline) | **5,381,615 render hours**; 450 shots; 2,000 on-prem nodes + 400 VMs + 600 workstations | AWS (P) | H |
| *Interstellar* | Some frames took up to **100 h** to render; 800 TB | Wikipedia (Sec) | M |
| *Gravity* | 80% CGI; Framestore worked >3 years; 1.8 M-LED light box | Wikipedia (Sec) | M |
| *The Lion King* (2019) | **1,490 VFX shots**, all-CG animals | Wikipedia (Sec) | M |
| *Godzilla Minus One* | **610 VFX shots by 35 artists** in ~8 months on a total budget of ~$10–15 M | Wikipedia (Sec) | M |
| *El Eternauta* (Netflix) | Gen-AI building collapse finished "**10 times faster**" than with traditional VFX tools (Sarandos, Jul 2025) | Stream C notes → Vice (Sec) | M |

**Energy estimates [D].** Avatar TWoW at 2.0–5.75 Wh per thread-hour gives **6.6–19.0 GWh**. At 0.35 kg/kWh that is **2.3–6.6 kt**; at 0.10 kg/kWh it is **0.66–1.9 kt**. The longest shot alone is **3–27 t**. Avatar F&A (if "render hours" means core/thread-hours) gives **2.5–7.2 GWh → 0.25–2.5 kt**.
- Wh per thread-hour: 2.0 [A, from SPECpower ~1.8 W/thread + overhead]; 5.75 [CCF AWS].
- Grids: the Australian or NZ grid actually used is not verified. Cloud market-based accounting could be near zero if the provider's renewable-energy claims are used.
- These are **order-of-magnitude estimates**. The unit ("render hour" vs thread-hour) and the hardware efficiency are both uncertain.

| Approach | kgCO2e per shot | Cost | Notes |
|---|---|---|---|
| **Practical** | Usually not feasible. Animals: trainers, transport, welfare monitoring (not quantified) | — | Gap |
| **VFX, creature/fur or disaster hero shot** | ≈90–5,700 (hero tier); extremes 3,000–27,000 (Avatar's longest shot) | Advanced tier $2k–$50k+ per shot (vendor); feature creature work is higher (not sourced) | Stereo, HFR and 4K/8K deliverables multiply compute |
| **AI** | Placeholder. Suggested R: 5 / 15 / 50 [A] for animals; lower for wide disaster establishing shots | Formula | *El Eternauta* is the scenario-level precedent |

**Who wins.** AI beats hero-tier VFX on carbon by roughly 10²–10⁴ per shot at the per-clip energies in Stream A. It wins on cost and speed for wide or establishing destruction shots (*El Eternauta*). For hero creature performance, AI's controllability is still the issue.

---

### 2.10 Simple dialogue scene (two people talking in a room)

This is the baseline, where AI likely loses or saves little.

**Practical.** A small unit (≈15–30 people [A]) on a standing set or a practical location. There is no source for how long a ~3-page, ~3-minute scene takes; I assume **0.5–1.5 days [A]**. Fully loaded, a small or medium feature averages **≈10–12 tCO2e per shooting day** and a tentpole **42.4 t** [S/D]. Marginal, on a standing stage set, the extra is mostly lighting: 20–40 kW × 10 h from the grid = **70–140 kg (US)** or **29–58 kg (UK)** [D]. A standalone location day with 25 crew, a 60 kW generator at ½ load, catering and 2 trucks comes to **≈860 kg** [D].

| Approach | kgCO2e central (range) | Cost | Drivers | Quality |
|---|---|---|---|---|
| **Practical, standing set (marginal)** | **105 (29–140)** [D] | FilmLA qualified spend: *EEAAO* $12.3 M / 39 days = $315k per day; *Kimi* $15.1 M / 27 days ≈ $561k per day; *Purple Hearts* $10.1 M / 30 days ≈ $337k per day [S, P] | Lighting kWh, grid | D |
| **Practical, standalone location day** | **860** [D] | As above | Generator, commuting, trucks | D |
| **Practical, fully loaded** (small/medium film day) | **10,400–11,700 per day** [D from SEA] | | | M |
| **VFX** | Not applicable (digital humans for dialogue are the most expensive VFX, not a saving) | — | — | — |
| **AI** | Placeholder. Suggested R: **10 / 30 / 300** [A] for performance plus lip-sync. Clip count ≈ 3 min ÷ ~8 s ≈ 23 kept clips | Formula + heavy human review time | | |
| Break-even vs standing set (105 kg) | 300 kWh ≈ **2,600 (Seedance-1-class) / 500 (Sora-2-Pro-class)** generations | | | |
| Break-even vs location day (860 kg) | 2,457 kWh ≈ 21k / 4.1k generations | | | |

**Who wins.**
- *Carbon:* it depends on the reroll ratio and the model. For example, 23 kept clips × R = 30 = 690 generations. That is **above** the break-even with a Sora-2-Pro-class model (≈500) and **below** it with a Seedance-1-class model (≈2,600) against a standing-set day. At R = 300 (*Air Head*-like), AI is worse than a marginal stage day under both models. It is still far below a fully loaded production day (10–40 t), but that saving only exists if AI eliminates whole shooting days.
- *Cost:* practical dialogue on an existing set is cheap at the margin. AI still needs heavy human labour for performance, continuity and lip-sync.
- This is the scenario where the user's expectation, that AI loses or saves little, is best supported.

---

## 3. Emission factors used

All values were retrieved on 2026-09-25 unless stated otherwise.

| # | Factor | Value | Unit | Measures | Source (P/Sec) | URL | Pub. date | Conf. |
|---|---|---|---|---|---|---|---|---|
| F1 | Diesel (avg biofuel blend), Scope 1 | 2.58354 | kgCO2e/L | combustion | DESNZ 2026 flat file v1.2 (P) | gov.uk 2026 flat xlsx | Jun 2026 (rev.) | H |
| F2 | Diesel WTT | 0.61101 | kgCO2e/L | upstream | DESNZ 2026 (P) | same | 2026 | H |
| F3 | Petrol (100% mineral) + WTT | 2.35372 + 0.60664 | kgCO2e/L | combustion + upstream | DESNZ 2026 (P) | same | 2026 | H |
| F4 | Burning oil (kerosene) + WTT | 2.54016 + 0.53078 | kgCO2e/L | | DESNZ 2026 (P) | same | 2026 | H |
| F5 | Aviation turbine fuel + WTT | 2.54269 + 0.52817 | kgCO2e/L | helicopter fuel | DESNZ 2026 (P) | same | 2026 | H |
| F6 | Propane + WTT | 1.54358 + 0.1817 | kgCO2e/L | pyro/fire effects | DESNZ 2026 (P) | same | 2026 | H |
| F7 | EPA mobile CO2: gasoline 8.78; diesel 10.21; LPG 5.68; jet 9.75; propane 5.72; kerosene 10.15 | as listed | kg CO2/US gal | tank-to-wheel CO2 | EPA GHG Emission Factors Hub 2025 (P) | epa.gov hub 2025 PDF | Jan 2025 | H |
| F8 | US grid average (eGRID2023) | 771.5 lb/MWh = 0.350 | kgCO2/kWh | location-based electricity | EPA Hub 2025 (P) | same | Jan 2025 | H |
| F9 | UK electricity, generation + T&D | 0.13096 + 0.01299 | kgCO2e/kWh | | DESNZ 2026 (P) | same | 2026 | H |
| F10 | Flights, long-haul to/from UK, economy with RF / without RF / business with RF; WTT | 0.11704 / 0.06926 / 0.3394; WTT 0.02461 (econ), 0.07137 (bus) | kgCO2e/pkm | air travel (8% routing uplift included) | DESNZ 2026 (P) | same | 2026 | H |
| F11 | Flights, international non-UK, economy with RF / business with RF; WTT | 0.10916 / 0.31656; WTT 0.01656 / 0.04802 | kgCO2e/pkm | | DESNZ 2026 (P) | same | 2026 | H |
| F12 | RF multiplier (on CO2 only) | 1.7 | × | non-CO2 aviation effects | DESNZ 2026 methodology §8.42 (P) | methodology PDF | 2026 | M (science uncertain) |
| F13 | Air freight, long-haul, with RF | 0.89939 | kgCO2e/t·km | gear freight | DESNZ 2026 (P) | flat xlsx | 2026 | H |
| F14 | Hotel night: US 16.1; UK 10.4; South Africa 51.4; Japan 39.0; Spain 7.0; Mexico 19.3; Iceland/NZ n/a | as listed | kgCO2e/room-night | | DESNZ 2026 (P) | flat xlsx | 2026 | H |
| F15 | Cars per km: average petrol 0.16152 (+ WTT 0.04599); large petrol 0.26606; large diesel 0.20905 (+ 0.0507) | as listed | kgCO2e/km | | DESNZ 2026 (P) | flat xlsx | 2026 | H |
| F16 | Van (diesel, ≤3.5 t) 0.25716 + 0.06128; HGV rigid avg laden 0.84606 + 0.20099; coach 0.03948 + 0.00656 per pkm | as listed | kgCO2e/km or /pkm | | DESNZ 2026 (P) | flat xlsx | 2026 | H |
| F17 | Water supply 0.1913; treatment 0.17088 | as listed | kgCO2e/m³ | | DESNZ 2026 (P) | flat xlsx | 2026 | H |
| F18 | Materials, primary production: wood 269.5; metals 3,821.9; average plastics 3,170.5; PS 4,374.4; plasterboard 120.05; paper 1,343.6 | as listed | kgCO2e/t | | DESNZ 2026 (P) | flat xlsx | 2026 | H |
| F19 | Waste: wood to landfill 925.37; wood closed-loop/combustion 4.65; metals landfill 1.26; scrap metal open-/closed-loop 4.65 | as listed | kgCO2e/t | end of life | DESNZ 2026 (P) | flat xlsx | 2026 | H |
| F20 | ICE: softwood 0.31; plywood 0.68; steel world avg 1.55 (virgin 2.46, EAF 0.45); aluminium world avg 6.67; plasterboard 0.39; glass 0.85 | as listed | kgCO2e/kg (A1–A3) | embodied carbon | ICE v4.1 (Circular Ecology, Oct 2025) via GreenCalculus summary (Sec) | greencalculus.com ICE page | May–Jun 2026 | M |
| F21 | Urban bus mass 11,600 kg; HDV glider + powertrain manufacturing 3.2 tCO2e/t (2021) | 37.1 t per bus [D] | tCO2e | vehicle embodied carbon | ICCT 2023 HDV LCA (P) | theicct.org PDF | Feb 2023 | M/H |
| F22 | Lower-medium gasoline ICEV production + recycling 7.2 t; 5.2 tCO2e/t; US SUV mass 1,935 kg | as listed | tCO2e | car embodied carbon | ICCT 2021 global LCA (P) | theicct.org PDF | Jul 2021 | M/H |
| F23 | Volvo XC40 ICE: materials 14 t + manufacturing 2.1 t = 16.1 t | 16.1 | tCO2e | cross-check (heavier SUV) | Volvo 2020 LCA via carsales (Sec) | carsales.com.au | 2020/2021 | L/M |
| F24 | Meals: beef 4.97; veal 4.12; white fish 2.43; pork 1.65; chicken 1.46; vegetarian 0.85; vegan 0.54 | as listed | kgCO2e/meal | catering | ADEME Impact CO2 API (P) | impactco2.fr/api/v1/thematiques/ecv/2 | live 2026 | H |
| F25 | Diesel generator fuel use (e.g. 60 kW: 1.8/2.9/3.8/4.8; 100 kW: 2.6/4.1/5.8/7.4; 200 kW: 4.7/7.7/11.0/14.4 gal/h at ¼/½/¾/full load) | as listed | US gal/h | generator fuel | Generator Source table (Sec, industry) | generatorsource.com | n.d. | M |
| F26 | H125 (AS350-B3e) 190 L/h; 540 L tank; ~2.5 h endurance; 135 mph cruise. AS350-B2 190 L/h | as listed | L/h | helicopter fuel | Custom Helicopters (operator, P) | customheli.com/fleet | live 2026 | H |
| F27 | H125 44 gal/h (166.6 L/h); variable cost $859/h; total $1,749–$2,305/h | as listed | | cross-check | AviaCost (Sec) | aviacost.com | live | M |
| F28 | DJI Inspire 3: 2 × TB51 at 98.8 Wh; ~28 min; charging hub 476 W | as listed | Wh | drone energy | DJI (P) | dji.com/inspire-3/specs | live | H |
| F29 | Server power: EPYC 9654P, 96 cores, 346 W at 100% load, 72 W idle (192 GB) | 3.6 | W/core | render node | SPECpower_ssj2008 (P, mirror) | spec.cs.miami.edu … 01191 | 2022 | H |
| F30 | CCF coefficients: AWS 0.74–3.5 W/vCPU; memory 0.392 W/GB; PUE AWS 1.135, GCP 1.1, Azure 1.185 | as listed | | cloud compute | Cloud Carbon Footprint (Sec, open methodology) | cloudcarbonfootprint.org | live | M |
| F31 | Global average PUE | 1.54 | | on-prem farm overhead | Uptime Institute 2025 survey (via search summaries; report not fetched) | uptimeinstitute.com | 2025 | M |
| F32 | Disney farm: 55,000 cores, 1.5 MW, ~1 M render-hours/day | ≈36 Wh/core-h [D] | | historical upper bound | Electronic Design / Engadget (Sec) | see §5 | 2014 | M |
| F33 | RTX 5090 575 W TGP; 1,000 W PSU recommended | as listed | W | GPU workstation | NVIDIA (P) | nvidia.com | live | H |
| F34 | ROE BP2V2: 500×500 mm, 190 W max / 95 W average per panel | as listed | W/panel | LED volume | ROE Visual (P) | roevisual.com | live | H |
| F35 | ARRIMAX 18/12: 18,000 W; SkyPanel S360-C: 1,500 W max | as listed | W | lighting | ARRI (P) | arri.com | live | H |
| F36 | Black carbon GWP100 900 (120–1,800) | as listed | | soot warming | Bond et al. 2013 (P). Abstract confirmed via Crossref; the GWP value is from the paper body, **not re-read here**. Wikipedia gives 1,055–2,240 (BC alone) and 840–1,280 (fossil soot) | doi.org/10.1002/jgrd.50171 | 2013 | M/L |
| F37 | Stoichiometric CO2 upper bounds: black powder (15% charcoal treated as pure C) 0.55 kg/kg; PETN (C5H8N4O12) 0.696 kg/kg | as listed | kgCO2/kg | explosives | Composition/formula from Wikipedia (Sec) [D] | Wikipedia Gunpowder, PETN | — | M |
| F38 | Fuel densities implied by DESNZ (per tonne ÷ per litre): kerosene 0.803; petrol 0.746; diesel 0.831; jet 0.800; propane 0.515 | as listed | kg/L | | DESNZ 2026 [D] | flat xlsx | 2026 | H |

**Industry benchmarks used**

| # | Benchmark | Value | Source | URL | Date | P/Sec | Conf. |
|---|---|---|---|---|---|---|---|
| B1 | Tentpole ($70 M+) footprint | 2,996 t; **42.4 t per shooting day**; large 1,262; medium 623; small 435 t (2020–22 data) | SEA "Carbon Emissions of Film & Television Production 2020–2022" (Stream D local copy `research/D_pdfs/sea2025.pdf`) | greenproductionguide.com (landing page) | 2025 | P | H |
| B2 | Tentpole footprint (2016–19 data) | 3,370 t; 33 t per shooting day; fuel 48%, air travel 24%, utilities 22%, housing 6% | SPA 2021 report | greenproductionguide.com/wp-content/uploads/2021/04/SPA-Carbon-Emissions-Report.pdf | Apr 2021 | P | H |
| B3 | Tentpole (UK, 19 productions) | 2,840 tCO2e; transport 51%, electricity/gas 34%, diesel generators 15% | BFI/albert/Arup "A Screen New Deal" | baftaalbert.org/…/Screen-New-Deal.pdf | 2020 | P | H |
| B4 | UK industry 2024 | 174,437 tCO2e; 2,540 footprints; **15.33 tCO2e per hour of content**; generators 3 M L = 7,206 t; 800,000 t of materials to landfill; materials & waste 24,037 t | BAFTA albert "Accelerate 2025" (Stream D local copy) | wearealbert.org | 2025 | P | H |
| B5 | Post-production share | 12% of a film's footprint | Ecoprod Green Post-Production Guide | ecoprod.com/…/Green-Post-Production-Guide.pdf | Apr 2025 | P | M |
| B6 | FilmLA $295.5 M tentpole budget lines | set construction $19.0 M; SFX $6.9 M; extras $3.0 M; picture vehicles & animals $2.6 M; second unit $10.4 M; location $13.8 M; transport $10.6 M; lighting $7.1 M; VFX $60 M | FilmLA 2016 Feature Film Study | filmla.com/wp-content/uploads/2016_film_study_WEB.pdf | 2017 | P | H |
| B7 | CA shoot-day spend | *EEAAO* 39 days / $12.289 M; *Kimi* 27 / $15.145 M; *Purple Hearts* 30 / $10.114 M; *Top Gun: Maverick* 73 CA days / $98.988 M | FilmLA Scripted Content Study 2021–22 | filmla.com/…/FilmLA_Scripted_Content_Study_2021_2022_final_WEB.pdf | 2023 | P | H |

**Pricing used**

| # | Item | Value | Source | URL | Conf. |
|---|---|---|---|---|---|
| C1 | Fox Renderfarm CPU | $1.224 per node-h (Ordinary) down to $0.734 (Diamond); 64 GB RAM default. The $0.0306 per core-h figure assumes 40 cores per node, a **historical** Fox figure I could not re-verify | Fox pricing page (P) | foxrenderfarm.com/pricing.html | M |
| C2 | GarageFarm CPU | $0.024 / $0.036 / $0.072 per GHz-h (low/med/high priority); e.g. a 22-core 2.2 GHz Xeon node $0.66–$3.99/h; 64-core EPYC $4.32–$17.27/h. Vendor article cites "$0.004/GHz-h" elsewhere (SuperRenders), a different vendor | GarageFarm (P) | garagefarm.net/pricing | H |
| C3 | AWS Deadline Cloud | Example rates: c5.4xlarge $0.1878/h; c5a.4xlarge $0.1639/h; r6i.4xlarge $0.21864/h; Arnold usage-based licence $0.66/h; customer-managed fleet $0.015 per worker-hour | AWS (P) | aws.amazon.com/deadline-cloud/pricing/ | M (example figures) |
| C4 | VFX shot price ranges | basic $100–$1k; intermediate $500–$5k; advanced $2k–$50k+; fire $1k–$15k; smoke $500–$10k; water $2k–$20k+; destruction $3k–$50k+; crowd $1k–$25k+ | Pixune (vendor blog, updated Aug 2026) (Sec) | pixune.com/blog/3d-vfx-cost/ | L/M |
| C5 | Aerial | Helicopter package $8k–$25k+ per aerial day; all-in $10k–$30k; drone package $800–$1,800 per day | Saturation.io guide (Sec) | saturation.io/film-crew-positions/aerial-camera-operator | M |
| C6 | Stock video | 16 credits $149.99 (2 videos); 40 credits $359.99 (5); 80 credits $669.99 (10) → ≈$67–$75 per video | Adobe Stock plans (P) | stock.adobe.com/plans | H |
| C7 | LA permits and safety | LAFD FSO $127/h (4-h minimum + 1 h travel); lane closure $312; LAPD off-duty $67.19–$77.90/h (8-h min); County SFX permit $350; County FSO $230.19/h; FilmLA SFX/lane/drone/helicopter riders $78 | Stream E notes, citing info.filmla.com FY2026/27; **not re-verified by G** | info.filmla.com | M |
| C8 | Top Gun: Maverick F/A-18 time | $11,374 per flight hour | Bloomberg (26 May 2022) via Skies Mag, Saturation (Sec) | bloomberg.com/news/articles/2022-05-26/… | M |

---

## 4. Gaps and uncertainties

1. **Unsourced activity quantities.** Pyro fuel litres for a typical car or bus gag; rain-tower flow (L/min); snow cover rates; wind-machine kW; condor and balloon wattage; helicopter flight hours per aerial day (including ferry); crowd travel distances; set tonnage. All are marked [A] and should be sliders in the tool. The **set-build tonnage** is the most consequential of these.
2. **Black carbon from fuel fireballs.** I could not source the soot yield for rapid-release gasoline, propane or kerosene fireballs. The 1–4% range is an unverified recollection of pool-fire lab data (Tewarson/SFPE Handbook) and must be verified. BC GWP100 spans 120–1,800 (Bond 2013), so this term could be anywhere from minor to larger than the CO2.
3. **Embodied-carbon convention for destroyed vehicles, aircraft and props.** The options are cut-off (end-of-life asset ≈ 0), remaining-life allocation, or new-equivalent. I found no industry standard (PEAR/albert). The choice changes the vehicle-explosion and car-chase results by 10–1,000×. The 747 in *Tenet* and the train in *MI: Dead Reckoning* were retired or end-of-life assets and would be near zero under cut-off.
4. **VFX compute units.** "Render hours" in press releases may mean node-hours, core-hours or thread-hours. Aquaman's 5.38 M "render hours" look like worker-hours: 614 "years" over ~3,000 workers. Avatar F&A's 1.25 B look like core/thread-hours: "142,000 years on a single processor". I found no primary per-shot core-hours for a vehicle-explosion shot. The mid/hero tiers are my bracketing assumptions.
5. **Render-farm location, grid and PUE.** The results swing about 7× between the NZ/Canadian hydro grids (~0.05–0.1) and coal-heavy grids (~0.7). Cloud market-based claims (renewable procurement) could take the figure to ~0. The Australian/NZ grid factors I cite are not verified.
6. **Embodied hardware.** Not quantified for render servers, workstations, LED volume panels or AI accelerators. For LED volumes this is probably material, because the panels are heavy electronics. Stream A/B may cover accelerators.
7. **Scope boundaries of the industry benchmarks.** SEA/PEAR mostly cover the production phase (Scopes 1, 2 and partial 3) and leave out most VFX and post-production. Adding a VFX estimate to a SEA "per day" figure therefore does not double-count much, but the tool should make the boundary explicit.
8. **Costs.** Missing: background-actor day rates (SAG-AFTRA pages returned 403), SFX crew rates, bus and car purchase prices, helicopter hourly rental (only a package range was found), flights and hotels, LED volume day rates, VFX artist day rates (BLS pages returned 403), and Golaem/MASSIVE licence pricing (Golaem now redirects to Autodesk).
9. **Famous examples with no emissions data.** No production (*Oppenheimer*, *Tenet*, *Fury Road*, *Top Gun: Maverick*, *Mission: Impossible*) has published scenario-level fuel or emissions numbers. Nolan declined to give *Oppenheimer* costs. *Gladiator II*/*Napoleon* extras counts and their digital-crowd splits were not found in fetched sources.
10. **F/A-18 fuel burn.** Only low-quality secondary figures (3,000–6,000 lb/h cruise), so I did not compute *Top Gun* jet emissions.
11. **Water.** Direct water is estimated only for practical rain and tank fills. Data-centre and render-farm water (WUE, and the water intensity of electricity generation) is left as a placeholder for Streams A/B. DESNZ water factors cover UK mains supply and treatment only.
12. **Search budget.** The session's WebSearch quota (200) was exhausted part-way through. Later items were retrieved by fetching known URLs (primary pages, Wikipedia raw text, PDFs) and from sibling-stream notes, not by fresh searches. Items taken from sibling notes are labelled as such.

---

## 5. Source list (all accessed 2026-09-25 unless stated otherwise)

**Industry footprints and budgets**
- Sustainable Production Alliance (2021). *Close Up: Carbon Emissions of Film and Television Production.* https://greenproductionguide.com/wp-content/uploads/2021/04/SPA-Carbon-Emissions-Report.pdf
- Sustainable Entertainment Alliance (2025). *Carbon Emissions of Film & Television Production 2020–2022.* Local copy `research/D_pdfs/sea2025.pdf` (Stream D); landing page https://greenproductionguide.com/industry-resources/research
- BFI / BAFTA albert / Arup (2020). *A Screen New Deal.* https://baftaalbert.org/wp-content/uploads/2026/04/Screen-New-Deal.pdf
- BAFTA albert (2025). *Accelerate 2025.* Local copy `research/D_pdfs/albert_accelerate2025.pdf` (Stream D); https://wearealbert.org
- Ecoprod (2025). *Green Post-Production Guide.* https://ecoprod.com/wp-content/uploads/2025/04/Green-Post-Production-Guide.pdf
- FilmLA (2017). *2016 Feature Film Study.* https://filmla.com/wp-content/uploads/2016_film_study_WEB.pdf
- FilmLA (2023). *Scripted Content Study 2021–2022.* https://filmla.com/wp-content/uploads/FilmLA_Scripted_Content_Study_2021_2022_final_WEB.pdf
- VFX Voice, "VFX and Sustainability". https://vfxvoice.com/vfx-and-sustainability-reducing-carbon-footprint-its-importance-and-more/

**Emission factors**
- UK DESNZ (2026). GHG conversion factors 2026, flat file v1.2. https://assets.publishing.service.gov.uk/media/6a6c9748862aaf18d9c62ac9/ghg-conversion-factors-2026-flat-format-revised.xlsx. Methodology: https://assets.publishing.service.gov.uk/media/6a2940543b15d05a7ce3202e/2026-GHG-conversion-factors-methodology-report.pdf. Page: https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2026
- US EPA (Jan 2025). GHG Emission Factors Hub 2025 (incl. eGRID2023). https://www.epa.gov/system/files/documents/2025-01/ghg-emission-factors-hub-2025.pdf
- Circular Ecology, ICE v4.1 release note (29 Oct 2025). https://circularecology.com/news/ice-database-v4-1-released. Values via GreenCalculus summary: https://greencalculus.com/standards/ice-database-embodied-carbon/
- ICCT (Feb 2023). *Life-cycle GHG emissions of European heavy-duty vehicles and fuels.* https://theicct.org/wp-content/uploads/2023/02/Lifecycle-assessment-EU-HDVs_final2.pdf
- ICCT (Jul 2021). *Global comparison of the life-cycle GHG emissions of combustion engine and electric passenger cars.* https://theicct.org/wp-content/uploads/2021/07/Global-Vehicle-LCA-White-Paper-A4-revised-v2.pdf
- carsales.com.au (Volvo XC40 LCA figures). https://www.carsales.com.au/editorial/details/are-evs-really-better-for-the-environment-134963/
- ADEME Impact CO2 (meals). https://impactco2.fr/outils/alimentation ; https://impactco2.fr/api/v1/thematiques/ecv/2
- Bond, T. C. et al. (2013). "Bounding the role of black carbon in the climate system." *JGR Atmospheres.* https://doi.org/10.1002/jgrd.50171 (abstract via https://api.crossref.org/works/10.1002/jgrd.50171)
- Wikipedia: Black carbon, Gunpowder, Pentaerythritol tetranitrate, Detonating cord (raw wikitext via en.wikipedia.org `action=raw`)
- Generator Source, diesel fuel consumption chart. https://www.generatorsource.com/Diesel_Fuel_Consumption.aspx

**Equipment specs**
- Custom Helicopters fleet. https://www.customheli.com/fleet/
- AviaCost, Airbus H125. https://aviacost.com/aircraft-operating-cost-calculator/airbus-h125
- DJI Inspire 3 specs. https://www.dji.com/inspire-3/specs
- Airpelago, helicopter vs drone CO2 (Bell 206: 92 L/h, 234.7 kgCO2/h). https://www.airpelago.com/news/co2-saved-switching-from-helicopters-to-drones-for-power-line-inspections
- NVIDIA RTX 5090. https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5090/
- ROE Visual Black Pearl 2 V2. https://www.roevisual.com/en/products/black-pearl-2v2
- ARRI ARRIMAX 18/12. https://www.arri.com/en/lighting/daylight/m-series/arrimax-18-12
- ARRI SkyPanel S360-C. https://www.arri.com/en/lighting/led-panel-lights/skypanel-classic/s360-c
- Snow Business. https://www.snowbusiness.com/snow-machines/ ; https://www.snowbusiness.com/environmental-ethos/ ; https://www.snowbusiness.com/clear-up/

**Compute, render and pricing**
- SPECpower_ssj2008, HPE DL345 Gen11 / EPYC 9654P. https://spec.cs.miami.edu/power_ssj2008/results/res2022q4/power_ssj2008-20221025-01191.html
- Cloud Carbon Footprint methodology. https://www.cloudcarbonfootprint.org/docs/methodology/
- Uptime Institute Global Data Center Survey 2025 (PUE 1.54; from search summaries, report not fetched). https://intelligence.uptimeinstitute.com/resource/uptime-institute-global-data-center-survey-2025
- Electronic Design (5 Sep 2014), Disney supercomputer / *Big Hero 6*. https://www.electronicdesign.com/blogs/article/21801218/disney-supercomputer-renders-big-hero-6
- Engadget (18 Oct 2014). https://www.engadget.com/2014-10-18-disney-big-hero-6.html
- AWS M&E blog, Scanline *Aquaman*. https://aws.amazon.com/blogs/media/scanline-vfx-managed-5m-render-hours-through-aws-thinkbox-deadline-for-aquaman
- AWS M&E blog (28 Feb 2023), *Avatar: The Way of Water*. https://aws.amazon.com/blogs/media/avatar-the-way-of-water-and-the-future-of-filmmaking
- DCD, *Avatar* on AWS (403 when fetched; snippet only). https://www.datacenterdynamics.com/en/news/avatar-the-way-of-water-was-rendered-in-amazon-web-services/
- FanBolt (20 Feb 2026), *Avatar: Fire and Ash* rendering. https://www.fanbolt.com/169870/142000-years-of-rendering-inside-the-vfx-that-power-avatar-fire-and-ash/
- The Rookies, explosion simulation (Sangbin Park). https://www.therookies.co/blog/explosion-simulation-integrated-with-live-action-footage/
- SuperRenders (May/Sep 2026), Houdini simulation deep dive. https://superrendersfarm.com/article/houdini-cloud-rendering-vfx-simulation-deep-dive-2026
- Fox Renderfarm pricing. https://www.foxrenderfarm.com/pricing.html
- GarageFarm pricing. https://garagefarm.net/pricing
- AWS Deadline Cloud pricing. https://aws.amazon.com/deadline-cloud/pricing/
- Pixune VFX cost guide (updated 16 Aug 2026). https://pixune.com/blog/3d-vfx-cost/
- Adobe Stock plans. https://stock.adobe.com/plans
- Saturation.io, aerial camera operator guide. https://saturation.io/film-crew-positions/aerial-camera-operator ; Top Gun: Maverick budget page: https://saturation.io/budgets/top-gun-maverick-2022

**Production examples**
- Guinness World Records (10 Nov 2015), *Spectre* explosion. https://www.guinnessworldrecords.com/news/2015/11/daniel-craig-accepts-certificate-for-largest-film-stunt-explosion-in-latest-bond-405307
- GamesRadar (26 May 2020), Nolan on the *Tenet* 747. https://www.gamesradar.com/tenet-christopher-nolan-747-plane-crash-interview/
- TheWrap. https://www.thewrap.com/christopher-nolan-tenet-747-plane-stunt-interview/
- No Film School. https://nofilmschool.com/tenet-christopher-nolan-bought-747-plane-because-it-was-cheaper-than-cgi
- NBC Insider / Syfy / ScreenRant on *Oppenheimer* effects (Fisher quotes). https://www.nbc.com/nbc-insider/how-did-oppenheimer-recreate-an-atomic-blast-without-cgi
- The Quint (*Oppenheimer* environmental cost). https://www.thequint.com/explainers/no-cgi-in-christopher-nolan-oppenheimer-but-at-what-cost-to-the-environment
- Bloomberg (26 May 2022), *Top Gun: Maverick* F-18 costs. https://www.bloomberg.com/news/articles/2022-05-26/tom-cruise-s-fighter-jet-rides-paid-us-navy-up-to-11-374-hourly (via https://skiesmag.com/web-news/top-gun-maverick-f-18-joyrides-cost-15822-per-hour/)
- Wikipedia (raw wikitext, accessed 2026-09-25): *Speed* (1994); *Tenet*; *Oppenheimer*; *Mad Max: Fury Road*; *Furious 7*; *Fast & Furious 6*; *Fast X*; *The Fate of the Furious*; *Top Gun: Maverick*; *Mission: Impossible – Fallout*; *Mission: Impossible – Dead Reckoning Part One*; *Spectre*; *Transformers: Dark of the Moon*; *Interstellar*; *Gravity*; *The Lion King* (2019); *Godzilla Minus One*; *The Creator*; *Monsters* (2010); *Gandhi*; *The Lord of the Rings: The Return of the King*; MASSIVE (software); *Titanic* (1997); Baja Studios; *The Abyss*; *Dunkirk*; Fake snow; Balloon light; StageCraft; *The Mandalorian*; Extra (acting). URL pattern: `https://en.wikipedia.org/wiki/<Title>`

**Sibling-stream notes (context, not re-verified by G)**
- Stream A `research/notes_A1.md`: Jegham, Gamazaychikov & Luccioni (2026), arXiv 2607.04553 (per-clip video-generation energy, including Seedance-1 80 Wh and Sora 2 Pro 418.5 Wh for 8 s 720p, GPU-only estimates); Delavande, Pierrard & Luccioni (2025), arXiv 2509.19222.
- Stream C `research/C_notes.md`: *El Eternauta* (Vice, Jul 2025); *House of David* (VP Land, Oct 2025: "generating 20 times", Unreal environment builds of 10–12 weeks at $15k–$200k); invideo rule of thumb of ~3 generations per usable shot; fxguide *Air Head* ~300:1.
- Stream E `research/E_notes.md`: FilmLA/LAFD/LA County fee schedule FY2026/27 (info.filmla.com); Curious Refuge average of 10 generations per shot.
