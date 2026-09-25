# Stream D: Carbon Footprint (plus Energy and Water) of Conventional Film, TV, Commercial and Music-Video Production

Research date: 2026-09-25. Working files, including the downloaded PDFs, extracted text, rendered chart pages and the DESNZ 2025 and PEAR workbooks, are in `research/D_pdfs/`.

**Conventions.** "t" means metric tonnes CO2e. "P" marks a primary source (the dataset owner's own report or file) and "S" marks a secondary source (press or a third party quoting it). Confidence is H (high), M (medium) or L (low). **DERIVED** marks a value I computed from published numbers; the formula is always shown. **ASSUMPTION** marks a parameter that I chose and that no source provides; replace it when better data exists. **CHART-READ** marks a value read off a bar chart because the report did not print it (±5%).

**Scope warning (read first).** The four big benchmark systems do not measure the same things, and this matters more than most of the numbers below.

| Benchmark system | What it counts | What it leaves out |
|---|---|---|
| **SPA/SEA PEAR** (US studios) | Fuel (vehicles and generators), utilities (electricity and heating), commercial and charter air travel, and housing. For hotels, it counts electricity only. Flights use DEFRA factors **without radiative forcing (RF)**. | Food, materials, waste, post-production and VFX, freight and couriers, and ground transport outside the production fleet |
| **BAFTA albert** (UK) | Travel and transport (including couriers), accommodation, energy (mains and non-mains), materials, food, waste, and post-production | |
| **Ecoprod Carbon'Clap** (France, ADEME factors) | Everything albert counts, plus **purchased goods (sets, costumes and makeup), embodied equipment ("immobilisation de matériel"), post-production services, services and insurance, and digital storage**. This is the widest scope. | |
| **AdGreen** (advertising, UK-centric, factors via Climatiq/BEIS) | People transport, equipment transport and couriers, accommodation, shooting and non-shooting spaces, catering, art department and SFX, wardrobe, data storage, work spaces, and (since December 2025) AI usage | |

The totals are therefore not directly comparable across systems. A PEAR-scope total will under-count a full footprint, probably by tens of percent. That estimate is my inference: food alone is 7% of albert's total (albert's own text says 4%), and purchased goods are 25% of Carbon'Clap's total.

---

## 1. Summary of key findings

1. **Tentpole features (US studio benchmark, PEAR scope).**
   - 2016–19: **3,370 t** per film, or **33 t per shooting day** (SPA 2021).
   - 2020–22: **2,996 t**, or **42.4 t per shooting day** (SEA 2025).
   - 2023–24, with new inflation-adjusted bands: **Tentpole+ (>$130M BTL) 2,962 t**, **Tentpole ($100–130M) 1,732 t**, combined **2,444 t** (SEA, May 2026).
   - BFI/Arup's *A Screen New Deal* gives **2,840 t** for an average tentpole (19 UK/US productions). The split is transport ~51% (70% of it road, 30% air), mains electricity and gas ~34%, and diesel generators ~15%.
   - The PEAR breakdown for tentpoles is fuel ~45–51%, utilities 13–31%, air 20–32% and housing 4–11%.
2. **Smaller features.**
   - SEA "Small" films (<$40M BTL in 2023–24): **375 t**. Medium ($40–75M): **631 t**. Large ($75–100M): **1,355 t**.
   - The French average feature film in Carbon'Clap (average budget €7M, wider scope) is **271 t**, with a range of **40–2,200 t**.
   - The UK average for features in albert is **66.4 t per hour of content** (2024).
3. **Scripted TV.**
   - One-hour scripted drama per episode: **77 t** (2016–19), **105.4 t** (2020–22) and **128.6 t** (2023–24, n=97). The 2023–24 report's own chart shows 121 t (see the conflicts in Section 4).
   - Half-hour single-camera and multi-camera episodes: **~45 t**. Unscripted: **~13 t** per episode.
   - The UK all-genre average is **15.3 t per hour of content** (2024) and 16.6 t (2023). UK drama is about **50 t per hour** (CHART-READ).
   - An HBO Max HETV case study with full activity data (*Raised by Wolves* S2, PEAR scope) totals **3,186 t** for 8 episodes over 107 shoot days. That is **29.8 t per shoot day**, **~398 t per episode** and **~83 kg per shooting crew/cast person-day** (DERIVED).
4. **Commercials (AdGreen, the best small-scale dataset).**
   - The average finished footprint is **8.9 t** (2025) and **10.8 t for projects with a shoot**. Projects without a shoot average **0.2 t**. The **median is only about 0.75 t** (2022–24).
   - **Per shoot day** the mean was **2.2 t** (2022) and **3.0 t** (2023). The 2022 median was **0.14 t per shoot day**.
   - By budget per shoot day (2025): **£1–5k → 0.8 t per project; £5–10k → 1.2 t; £10–50k → 4.5 t; £50–250k → 14.3 t; £250–500k → 24.6 t.**
   - **Flights are 65.4%** of all emissions on ad projects with a shoot. Business class alone is 41.2%. Only 35% of projects fly at all.
5. **Music video and corporate video.**
   - No dataset specific to music videos was found. The closest is Carbon'Clap's category "Vidéos (clip, institutionnel, etc.)", which averages **2 t per project** (average budget €35k), or **8.9 t per hour produced**.
   - AdGreen's lowest budget brackets (0.8–1.2 t) and its 2022 "<1 t" group are good proxies. That group averaged 289 kg (median 187 kg) over a mean of 1.8 shoot days, or **242 kg per shoot day**.
6. **What drives emissions depends on scale.**
   - **Large scripted work:** fuel (generators and vehicles) is the biggest driver.
   - **Commercials and unscripted:** flights, especially business class, drive the total.
   - **Micro and short projects:** local transport, materials, post-production and catering matter most. In AdGreen projects of 1 t or less, travel and transport were 41.8%, materials 19.1% and post-production 16.3%.
7. **Energy anchors (kWh).**
   - UK productions used **231 million kWh of grid electricity** in 2024 across 2,540 footprints (albert).
   - They burned **3 million litres of generator fuel**, which produced **7,206 t** (about 2.40 kg per litre, including 30% HVO).
   - Diesel holds about 9.93 kWh per litre (thermal). A diesel generator delivers about **0.28–0.45 L per kWh of electricity** at 25–100% load. That is **~0.75–1.2 kgCO2e per kWh delivered** (tank-to-wheel, TTW), plus 0.17–0.28 kg well-to-tank (WTT). UK grid electricity in 2025 is 0.177 kg per kWh.
   - Generators on real sets run badly under-loaded. Film London measured 190 generators: **83% never exceeded 50% of capacity** and 98% were over-specified. That pushes delivered emissions per kWh towards the top of the range above.
8. **Virtual production (LED volumes).**
   - There is almost no independent, audited LED-volume energy data.
   - AdGreen's 2025 dataset implies about **79 kgCO2e per virtual-studio day**, against about 140 kg per UK studio day and about 347 kg per generator-powered day (DERIVED, UK grid).
   - The savings that have been claimed (75% per shoot day; about 95% for a Bupa spot) come almost entirely from **avoided travel**. They are agency or advertiser claims and have not been independently verified.
9. **Post-production and VFX.**
   - Post is a small share of on-set benchmarks: **5% for albert feature films in 2024** and **9.2% in Carbon'Clap across all genres** (15.8% for features and 26.2% for documentaries).
   - For the smallest ad projects it reaches **16.3%**.
   - Weta FX used **about 3.3 billion thread-hours** to render *Avatar: The Way of Water* (secondary source). No VFX studio publishes energy or emissions per shot or per minute.
10. **Water.**
    - Water is almost never reported, and *A Screen New Deal* says so explicitly.
    - The one hard data point is *Raised by Wolves* S2: **3,608 m³ over 107 shoot days**, which is **~34 m³ per shoot day** or **~94 L per crew/cast person-day** (DERIVED).
    - The DESNZ 2025 carbon factors for water are **0.191 kgCO2e per m³ for supply** and **0.171 kgCO2e per m³ for treatment**.

---

## 2. Data tables with sources

### 2.1 Normalized headline table, by production scale

Runtime ASSUMPTIONS used for the "per finished minute" column:
- feature: 100–130 min
- one-hour drama episode: 50 min
- half-hour episode: 22–25 min
- unscripted "hour": 44 min

"Crew-person-day" figures are scarce; each proxy is labelled.

| Scale | Total footprint (t) | t per shooting day | t per finished minute | kg per crew-person-day | Main sources | Conf. |
|---|---|---|---|---|---|---|
| **Micro and short (1–5 days, crew 5–15)** | AdGreen 2022, projects ≤1 t: **mean 0.289 t, median 0.187 t** (n=289; 70% had 0–1 shoot days; mean budget £34,951). Carbon'Clap short fiction (*court métrage*, France 2024): **8 t** mean (budget about €100k). AdGreen projects without a shoot: **0.2 t**. Case studies: 0.23 t (60 s film), 1.76 t (charity film), 1.15 t per shoot (stills plus motion). | AdGreen ≤1 t group: **0.242 t per day** mean, 0.140 median (range 3.1–989 kg per day) | Carbon'Clap short fiction 27.8 t/h → **0.46 t/min** (DERIVED) | **~16–48 kg** (DERIVED: 242 kg per day ÷ ASSUMED crew of 5–15) | AdGreen AR2022, AdGreen 2025 Update, Ecoprod 2025 | M (totals), L (per person) |
| **Music video / corporate video** | Carbon'Clap "Vidéos (clip, institutionnel, etc.)": **2 t** mean (budget €35k). AdGreen 2025 by budget per shoot day: **£1–5k → 0.8 t**; **£5–10k → 1.2 t**. Worked example A (Section 3): **0.6–1.15 t** for 2 days and 20 people. | Proxy: AdGreen 2022 one-day projects **1.1 t per day** (all budgets). Model: **0.3–0.6 t per day** | Carbon'Clap 8.9 t/h → **0.15 t/min** (the category is dominated by longer corporate films; its implied average runtime is ~13 min) | Model: **~15–30 kg** | Ecoprod 2025; AdGreen AR2025 | M for Carbon'Clap; L for music-video specificity |
| **Commercial** | AdGreen mean per project: **4.7 (2022), 6.2 (2023), 9.2 (2024), 8.9 (2025)**. With a shoot: **10.8 t** (2025). Median ≈ **0.75 t**. >£50k per shoot day: 12.8 (2022), 13.9 (2023), 19.9 (2024). £500k+ per day: **75.1 t** (2024). Largest single project: 530 t (2024). Carbon'Clap ads: **9 t** mean (max 280 t; budget €150k) | **2.2 t** (2022 mean; median 0.14), **3.0 t** (2023 mean). >£50k per day: **5.1 t** (2022 mean; median 1.9). AdGreen's own rule of thumb: "**2 tCO2e, plus travel**" per shoot day | Carbon'Clap: ~9 t for ~1 min produced → **~9 t/min** (DERIVED; versions and cut-downs not credited) | **~76 kg per meal served** (DERIVED from AdGreen 2025: 20,425 t ÷ 268,785 meals; flight-heavy) | AdGreen AR2022/AR2023/2025 Update/AR2025; Ecoprod | H for AdGreen totals, M for per-day |
| **Indie / small feature** | SEA "Small" (<$40M BTL): **375 t** (2023–24, n=22), 435 t (2020–22), 391 t (2016–19). Carbon'Clap feature film: **271 t** mean (€7M budget; range 40–2,200). albert UK features: **66.42 t per hour** (2024) | Not published. If ASSUMED 30–40 shoot days: ~9–13 t per day for SEA Small | SEA Small ÷ 100 min ≈ **3.75 t/min**. Carbon'Clap 160 t/h → **2.7 t/min**. albert → **1.1 t/min** | n/a | SEA 2026; Ecoprod 2025; albert 2025 | H (totals) |
| **Mid-budget feature** | SEA Medium ($40–75M): **631 t** (n=13). Large ($75–100M): **1,355 t** (n=8). 2020–22 Medium ($20–40M): 623 t; Large ($40–70M): 1,262 t. 2016–19: 769 / 1,081 t | Not published | ~5–11 t/min (DERIVED, 110–120 min) | n/a | SEA 2026; SEA 2025; SPA 2021 | H |
| **Tentpole** | SEA 2023–24: **Tentpole+ 2,962 t**, **Tentpole 1,732 t** (combined 2,444). 2020–22: **2,996 t**. 2016–19: **3,370 t**. *Screen New Deal*: **2,840 t**. By region (combined tentpole, 2023–24): USA 1,814; Canada 2,392; UK 2,710; Other 3,175 | **42.4 t per day** (2020–22). **33 t per day** (2016–19). Implied ~71 and ~102 shoot days respectively (DERIVED) | **~23–28 t/min** (DERIVED, 120–130 min) | ~80 kg if ASSUMED 500 people on ~71 days; see the HETV anchor below | SEA 2026/2025; SPA 2021; BFI/Arup 2020 | H (totals), M (per day) |
| **TV episode, scripted 1 hr** | SEA per episode: **128.6 t** (2023–24; chart shows 121), **105.4 t** (2020–22), **77 t** (2016–19). By city (2023–24): LA 64.6, Vancouver 86.2, NY 118.6, London 129.2, Toronto 172. Carbon'Clap fiction series: **38 t per episode** (€1M per episode). *Raised by Wolves* S2: **~398 t per episode** | *Raised by Wolves* S2: **29.8 t per day**. Wales HETV example: **~23 t per day** (DERIVED; ASSUMED 65 days) | SEA ÷ 50 min ≈ **2.1–2.6 t/min**. albert UK drama ~50 t/h → **0.84 t/min**. Carbon'Clap series 34.6 t/h → 0.58 t/min | *Raised by Wolves* S2: **~83 kg per person-day** (3,186 t ÷ 359 shooting crew/cast ÷ 107 days; upper bound, because construction crew and prep are included). Wales HETV: **~24 kg per meal served** | SEA; Ecoprod; *Raised by Wolves* S2 report; SND Wales 2023 | H/M |
| **TV episode, half-hour and unscripted** | SEA 2023–24: ½-hr single-camera **45.7 t**; ½-hr multi-camera **44.5 t**; unscripted **13.2 t** (air travel 66%). UK all-genre average: **15.3 t/h**. Carbon'Clap documentary **11 t**, entertainment **16 t/ep**, magazine/news **4 t**. Dutch NPO non-fiction seasons: **251–374 t per season**, or **1.6–7.8 t per 30 min** (life cycle, including broadcast) | n/a | ½-hr: **~1.8–2.1 t/min**. Unscripted: **~0.3 t/min**. UK all-genre: **0.26 t/min**. Dutch non-fiction: **0.05–0.26 t/min** | n/a | SEA 2026; albert 2025; Ecoprod; de Almeida Martins & Fouladvand 2026 | H/M |

### 2.2 US studio benchmarks: SPA (2021), SEA (2025) and SEA (2026), PEAR scope, per production

**Dataset sizes.**
- 2016–19: 161 features and 266 series (SPA member productions).
- 2020–22: 385 global productions.
- 2023–24: 62 films and 169 TV series.

**Budget bands (below-the-line shooting budget only).**
- 2016–19 and 2020–22: Tentpole ≥$70M; Large $40–70M; Medium $20–40M; Small ≤$20M. Small, micro and digital were combined in 2016–19.
- 2023–24: Tentpole+ ≥$130M; Tentpole $100–130M; Large $75–100M; Medium $40–75M; Small <$40M.

| Category | Period | Total (t) | Fuel | Utilities | Air travel | Housing | Per shoot day | n | Source (P) |
|---|---|---|---|---|---|---|---|---|---|
| Tentpole | 2016–19 | 3,370 | 1,605 (48%) | 757 (22%) | 798 (24%) | 210 (6%) | 33 t | – | SPA 2021 p.2–3 |
| Tentpole | 2020–22 | 2,996 | 1,523 (51%) | 582 (19%) | 609 (20%) | 282 (9%) | **42.4 t** | – | SEA 2025 p.3, 5, App. C |
| Tentpole+ (>$130M) | 2023–24 | 2,962 | 1,329 (45%) | 929 (31%) | 589 (20%) | 116 (4%) | – | 11 | SEA 2026 p.6, App. C |
| Tentpole ($100–130M) | 2023–24 | 1,732 | 772 (45%) | 221 (13%) | 552 (32%) | 187 (11%) | – | 8 | SEA 2026 |
| Large | 2016–19 | 1,081 | 586 (54%) | 217 (20%) | 211 (20%) | 67 (6%) | – | – | SPA 2021 / SEA 2025 App. C |
| Large | 2020–22 | 1,262 | 836 (66%) | 171 (14%) | 163 (13%) | 93 (7%) | – | – | SEA 2025 |
| Large ($75–100M) | 2023–24 | 1,355 | 763 (56%) | 362 (27%) | 154 (11%) | 76 (6%) | – | 8 | SEA 2026 |
| Medium | 2016–19 | 769 | 365 (47%) | 130 (17%) | 121 (16%) | 153 (20%) | – | – | SPA 2021 |
| Medium | 2020–22 | 623 | 287 (46%) | 89 (14%) | 159 (26%) | 88 (14%) | – | – | SEA 2025 |
| Medium ($40–75M) | 2023–24 | 631 (App.: 630) | 336 (53%) | 95 (15%) | 129 (20%) | 71 (11%) | – | 13 | SEA 2026 |
| Small | 2016–19 | 391 | 217 (55%) | 66 (17%) | 56 (14%) | 52 (13%) | – | – | SPA 2021 / SEA 2025 App. C |
| Small | 2020–22 | 435 | 247 (57%) | 60 (14%) | 103 (24%) | 25 (6%) | – | – | SEA 2025 |
| Small (<$40M) | 2023–24 | 375 | 167 (45%) | 71 (19%) | 101 (27%) | 36 (10%) | – | 22 | SEA 2026 |

TV figures are per episode.

| TV category | 2016–19 | 2020–22 | 2023–24 (n) | 2023–24 split: fuel / utilities / air / housing | Source |
|---|---|---|---|---|---|
| 1-hr scripted drama | 77 (fuel 44.8, utilities 19.3, air 5.4, housing 6.8) | 105.4 (62.9 / 22.9 / 13.9 / 5.75) | **128.6** (97). Chart total: 121 | 68.2–72.6 / 24.8 / 19.3–20.6 / 8.3–8.9 (the report's tables disagree) | SPA 2021; SEA 2025; SEA 2026 |
| ½-hr single-camera | 26 (14.7 / 9.4 / 1.3 / 0.3) | 48.4 (27.9 / 13.2 / 4.7 / 2.53) | **45.7** (20). Chart: 42 | 22.3–26.4 / 11.4 / 7.1 / 0.8 | same |
| ½-hr multi-camera | 18 (6.3 / 8.7 / 2.6 / 0.4) | 23.9 (15.7 / 5.3 / 2.8 / 0.1) | **44.5** (10). Chart: 41 | 16.1–19.7 / 15.6 / 7.4 / 1.9 | same |
| Unscripted | 13 (1.0 / 3.7 / 8.0 / 0.4) | 3.2 (small sample) | **13.2** (42) | 2.6 / 0.7 / 8.7 / 1.2 (air 66%) | same |

Scope and notes. PEAR covers Scope 1 (production fuel), Scope 2 (utilities) and partial Scope 3 (air and housing). Flights use DEFRA "average, without RF" factors. Hotels count electricity only (PEAR methodology v4.2.4). The 2023–24 unscripted category was broadened to include documentary and natural history. Confidence: H for the published totals; M for the per-day values, which appear only for tentpoles.

### 2.3 Regional variation (PEAR scope)

**SEA 2020–22, tentpole film total per film.**
| Region (n) | Total (t) | Fuel | Utilities |
|---|---|---|---|
| Atlanta (6) | 4,788 | 3,115 (65%) | 766 |
| Los Angeles (6) | 1,058 | 612 (58%) | 197 |
| New York (1) | 1,046 | 319 (31%) | 445 (43%) |
| US other (5) | 1,665 | – | – |

**SEA 2020–22, one-hour drama per episode:** Atlanta 124, LA 72, NY 85, US other 101, Toronto 158, Vancouver 102, other Canada 107.

**SPA July 2022 (2016–19 data), one-hour drama per episode:** LA 41, NY 68, Atlanta 136, other US 92, Toronto 84, Vancouver 71, other Canada 35.

**SPA July 2022 (2016–19 data), medium films:** LA 392, NY 447, Atlanta 973, other US 739.

**SPA July 2022 (2016–19 data), large films:** Montréal 1,419, Toronto 905, Vancouver 1,473.

**SEA 2023–24, combined tentpole per film:** USA 1,814 (n=27 US films overall), Canada 2,392, UK 2,710, Other 3,175, all 2,444.

**SEA 2023–24, one-hour drama per episode:** USA 118.5, Canada 141, UK 111.7, Other 131.7, All 127.5; London 129.2, LA 64.6, NY 118.6, Toronto 172, Vancouver 86.2. The city chart's colour legend appears inconsistent with its text, so only the totals are given here.

Grid carbon intensity and generator use explain most of the spread. Atlanta tentpoles emit about 4.5 times as much as LA tentpoles.

### 2.4 UK: BAFTA albert (albert calculator; wider scope including food, materials, waste and post)

| Metric | Value | Year | Source | Conf. |
|---|---|---|---|---|
| Industry average | **15.3 t per hour of content** (text: 15.33) | 2024 | ACCELERATE 2025 report (P) | H |
| Industry average | 16.6 t/h | 2023 | same; TVBEurope (S) | H |
| Industry average | 12.8 t/h (also given as 12.68) | 2022 | SND Wales Transformation Plan 2023, citing the albert 2022 review (P) | H |
| Industry average | 5.7 t/h | 2021 | TVBEurope (S) | M |
| Industry average | 2020 was lower (an "anomaly" during lockdown). The CMPA study quotes 4.4 t/h, but attributes it to 2019 | 2020 | TVBEurope (S); CMPA 2024 (S) | L |
| Industry average | 9.2 t/h | 2019 | Televisual (S) | M |
| Industry average | 10.2 t/h | 2017 | Televisual (S) | M |
| Industry average | 5.8 t/h (266 productions, 1,297 hours) | 2011–12 | albert Year One report (P) | H |
| Total reported | **174,437 t** from **2,540 footprints** (2023: 210,598 t from 3,003) | 2024 | ACCELERATE 2025 | H |
| Split: travel and transport | **114,062 t (65%)**. Air 52,631 (30%); road 35,047; midscale and upscale hotels 9,588; couriers and excess baggage 6,264; other 5,016; rail 3,060; apartments 2,457 | 2024 | ACCELERATE 2025 p.3 | H |
| Split: energy | **36,337 t (21%)**. Mains 22,147; non-mains 11,296; other utilities 2,894 | 2024 | same | H |
| Split: materials and waste | **24,037 t**. Food 12,299; timber 5,133; textiles 3,034; other 3,571 | 2024 | same | H |
| Activity volumes | 282 million km by air (12 million km short-haul); 60 million rail-km; 81 million road-km (2% electric); 231 million kWh of grid electricity (68% renewable); **3 million litres of generator fuel → 7,206 t** (30%, or 915k L, was HVO); 2.75 million meals (68% meat or fish; 8% beef, which is 28% of food emissions); 800,000 t of materials to end of life | 2024 | same | H |
| Feature films | **66.42 t per hour** ("nearly twice TV drama"). 115 films were footprinted, 66% of them scripted | 2024 | same p.82 | H |
| Feature-film breakdown | Travel and transport **34%**; filming space **21%**; materials **21%**; accommodation **11%**; non-filming spaces **6%**; post-production **5%**; disposal **2%** | 2024 | same p.82 pie | H |
| Genre intensity, 2024 (t per hour; CHART-READ ±5%) | Drama ~50.6; continuing drama ~30.6; comedy ~24.6; children's ~14.3; factual ~14.3; entertainment ~13.2; other ~13.9; current affairs ~9.4; factual entertainment ~7.7; sport ~4.1; learning ~1.6; news ~1.3 | 2024 (2023 drama ~48.8) | same p.80 | M |
| Production-type intensity (CHART-READ) | Feature ~58; TV programme or series ~20; **short ~16**; **online content ~15.5**; other ~14.5; event for broadcast ~9.5 (t per hour) | 2024 | same p.81 | M |
| All drama, 2022 | 46.57 t/h | 2022 | SND Wales 2023 | H |
| Animation | ~5.5 t/h (BAFTA 2016); 84% from office or working from home | 2016 | CMPA 2024 (S, via Kajawood) | L |

### 2.5 BFI/Arup *A Screen New Deal* (2020) and the Wales Transformation Plan (2023)

| Metric | Value | Scope | Source |
|---|---|---|---|
| Average tentpole footprint | **2,840 t** | 19 tentpoles (≥$70M) filmed in the UK and US over the previous 5 years, using PEAR data | *A Screen New Deal* p.4, 12 (P, H) |
| Split | Transport ~51% (70% car-journey fuel, 30% air). Of the air share, 90% was commercial and 10% charter. Mains electricity and gas ~34% (30 points production, 4 points hotels and apartments; within energy, 70% electricity and 30% gas). Diesel generators ~15% | same | same |
| Derived tonnages | Generators ≈ 426 t; road ≈ 1,014 t; air ≈ 435 t | DERIVED | – |
| Illustrations | Energy = "Times Square for 5 days"; fuel = "11,478 car tanks"; air miles = "11 one-way trips to the Moon"; waste = "313.5 blue whales"; "an average day filming > one person's annual footprint"; "an average hour filming ≈ one London–NY return flight" | same | same (illustrative, L) |
| Wales HETV example (2021–22) | **1,487 t total; 743 t per hour of screen time** (~16 times the 47 t/h drama average). Travel and transport 782 t (53%); materials including catering 330 t (22%); energy 172 t (12%); accommodation ~172 t (11%); waste 10 t. **Filmed just over 13 weeks; 61,388 meals = 166.61 t** (2.71 kg per meal) | albert footprint | SND Wales 2023 p.11, 66 (P, H) |
| Wales HETV per shoot day | **~22.9 t per day** (DERIVED; ASSUMED 13 weeks × 5 = 65 days) | – | L–M |
| Anonymous production | 132 shoot days of catering = **91,318 kg** (15% beef, 5% pork, 10% lamb, 20% fish, 20% chicken, 15% vegetarian, 15% vegan). A 75% vegetarian / 25% vegan menu saves 34,946 kg | albert | SND Wales p.67 (P, M) |
| Large-film skip waste | **413 t of skip waste against 36 t recycled** (average for one large-scale film) | anonymous productions | SND Wales p.60 (P, M) |
| Wood in Welsh productions | >1,000 t of wood used in 2022, of which <25% was recycled | albert | same |

### 2.6 France: Ecoprod Carbon'Clap (ADEME factors; widest scope; 10,000+ footprints by the end of 2024)

Source: "Impact environnemental de la production audiovisuelle, cinéma et publicitaire – Statistiques Carbon'Clap et Label Ecoprod" (January 2025; primary; H).

| Genre | Mean t per production (or per episode) | Mean budget | t per hour produced |
|---|---|---|---|
| Feature fiction film | **271** (range **40–2,200**) | €7.0M | **160** |
| TV film (*fiction TV unitaire*) | 106 | €2.5M | 71.3 |
| Fiction series (per episode) | 38 (range <1–190 per episode) | €1.0M per episode | 34.6 |
| Entertainment (*divertissement*) | 16 | €140k | 4.6 |
| Documentary | 11 (range <1–620) | €200k | 10.3 |
| **Advertising** | **9** (max 280; ~1 min produced per project) | €150k | not computed ("difficult per hour") |
| **Short fiction film** | **8** | €100k | 27.8 |
| Live event capture | 7 | €105k | 3.3 |
| Magazine and news | 4 | €80k | 1.1 |
| **Videos (music video, corporate, etc.)** | **2** | **€35k** | **8.9** |
| All genres | – | – | **16** |

- **Emission split, all genres:** transport 27.5%; purchased goods (sets, costumes, makeup, SFX) 24.6%; food 10.8%; embodied equipment 9.4%; post-production services 9.2%; services and insurance 5.1%; generators 4.1%; accommodation 3.6%; electricity 2.2%; heating 1.4%; digital data 0.9%; waste 0.7%; air conditioning 0.3%; buildings 0.2%.
- **Split by genre (major posts):**
  - Advertising: transport 36.7%, purchased goods 36.6%, equipment 6.2%.
  - Videos (music video, corporate): transport 20.5%, purchased goods 35.9%, equipment 15.7%.
  - Feature film: transport 22.5%, purchased goods 25.9%, post-production 15.8%.
  - Short fiction: transport 27.5%, purchased goods 16.2%, food 14.9%.
  - Documentary: transport 35%, post-production 26.2%, food 12.7%.
  - Entertainment: generators 33%.
- **Transport:** air is 40% of km (167 million km in total) and 42.6% of transport CO2e. Rail is 27.5% of km and 0.5% of CO2e.
- **Food:** 24% of meals were vegetarian but made up 5% of food CO2e. Red-meat meals were 55% of food CO2e.
- **Energy:** diesel generators are 64% of energy CO2e and electricity 24%. **Grid connection in France cuts the footprint 18-fold, batteries 6-fold and biofuel generators 3-fold** (ADEME orders of magnitude).
- **Sector total:** French audiovisual emits about 1.7 MtCO2e per year, and about a quarter of that comes from production (secondary; M).

### 2.7 Advertising: AdGreen (UK-led, 21–27 countries)

| Metric | 2022 | 2023 | 2024 | 2025 | Source |
|---|---|---|---|---|---|
| Finished footprints (n) | 515 | 1,424 | 2,247 | 2,295 | AR2025 p.5 |
| Total recorded (t) | 2,446 | 8,829 | 20,672 | 20,504 | AR2025 p.15 |
| Mean per project (t) | **4.7** | **6.2** | **9.2** | **8.9** | AR2022/2023; 2025 Update; AR2025 |
| Median per project | **0.708 t** | ~0.75 t | ~0.75 t ("constant … across all three years") | – | AR2022 p.14; 2025 Update p.8 |
| With a shoot / without | – | – | – | **10.8 t (n=1,893) / 0.2 t (n=402)** | AR2025 p.15 |
| Projects with >£50k per shoot day | 12.8 t (median 2.6; 2.9 days) | 13.9 t (2.32 days; mean budget £1.40M) | 19.9 t | – | AR2022 p.19; AR2023 p.26–27; 2025 Update |
| Mean per shoot day | **2.2 t** (median **0.14 t**; range 3.1 kg–43.2 t; 1,099 days; mean 2.5 days; mean budget £71,868 per day) | **3.0 t** (2.5 days; £150,951 per day) | – | – | AR2022 p.14; AR2023 p.24 |
| Budget brackets per shoot day | – | – | No shoot 0.2 t; **<£50k: 4.2 t** (~50% of projects); £50–100k: 6.7 t; £100–500k: 20.3 t; £500k+: **75.1 t** | **£1–5k: 0.8 t; £5–10k: 1.2 t; £10–50k: 4.5 t; £50–250k: 14.3 t; £250–500k: 24.6 t** (n=1,317 with budgets) | 2025 Update p.10; AR2025 p.16 |
| Largest project | 129.6 t | 397.4 t | 530.2 t (the 10 largest averaged 324.7 t) | – | 2025 Update p.9 |

**AdGreen 2022 by number of shoot days (n=418).**
| Shoot days | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Projects | 188 | 117 | 60 | 34 | 19 |
| Mean t per project | 1.1 | 4.2 | 10.7 | 10.5 | 26.4 |
| t per shoot day | 1.1 | 2.1 | 3.6 | 2.6 | 5.3 |
| Mean total budget | £66k | £144k | £257k | £293k | £700k |

Source: AR2022 p.21 (P, H).

**Size classes (2022).**
- Projects ≤1 t (n=289): mean 289 kg, median 187 kg, mean 1.8 shoot days, **242 kg per shoot day mean (140 kg median)**, mean budget £34,951 (£24,051 per shoot day).
- Projects >100 t (n=4): mean 114.9 t over 4 days, **30.7 t per shoot day**, £390,922 per day. Three of the four had business-class flights, and one location generator produced >40 t.

**Breakdown by activity.**
| Group | Breakdown |
|---|---|
| 2022, all projects | Travel and transport 62.4%; spaces 24.6% (filming 13.7%, post 2.7%, accommodation 5.1%, non-filming 3.2%); materials 12.4%; disposal 0.6% |
| 2022, projects ≤1 t | Travel and transport 41.8%; materials 19.1%; post-production 16.3%; filming spaces 10.4%; non-filming spaces 7.6%; accommodation 4.1%; disposal 0.7% |
| 2022, projects ≥100 t | Travel and transport 74% (air ≈ 49% of the total); filming spaces 16.5%; materials 3.9%; accommodation 3.6%; post 1.3% |
| 2024 | People transport 71.8%; shooting spaces 7.4%; art department and SFX 5.5%; catering 4.6% |
| **2025, projects with a shoot (20,425 t)** | **People transport 71.9%** (flights 65.4% = 13,347 t; business 41.2%; economy 20.8%; first 1.7%; unknown 1.7%; car and taxi 6.0%; rail 0.5%); catering 7.9%; equipment transport and couriers 5.9%; accommodation 4.1%; **data storage 3.7%**; shooting spaces 3.7%; art department and SFX 1.6%; work spaces 0.9%; wardrobe 0.3%; non-shooting spaces 0.05%; **AI usage 0.0005%** (only tracked from December 2025) |

Source for the breakdowns: AR2022 p.18; 2025 Update p.11; AR2025 p.17. Only 35% of the 2025 projects with a shoot included flights.

**2025 activity volumes (AR2025 p.18–24):**
- 34.8 million km flown
- 3.0 million car or taxi miles (~23,000 cars; petrol 68% of car CO2e)
- 268,785 meals (58,578 beef; 129,959 other meat or fish; 80,248 vegetarian or vegan)
- shooting-space days: studio 1,562.5; location on mains 1,493.5; **generator 1,159**; **virtual studio (LED volume) 251**
- 101,609 L of diesel in generators
- 3,547 new hard drives (50% of projects bought at least one; 3.7 each on average)

**Derived intensities from AdGreen 2025 (DERIVED; UK-weighted; M–L):**
- **Generator-powered day ≈ 347 kgCO2e.** Generator fuel is 52.7% of the 764 t shooting-space total, spread over 1,159 days. Diesel averages **≈ 88 L per generator-day**.
- **UK studio day ≈ 140 kg.**
- **Location day on mains ≈ 83 kg.**
- **Virtual-studio day ≈ 79 kg.**
- **Catering ≈ 5.97 kg per meal** including "extras" (drinks, packaging, waste). Beef ≈ 9.9 kg; other meat or fish ≈ 3.4 kg; vegetarian or vegan ≈ 0.64 kg per meal.
- **Hard drive ≈ 200 kgCO2e each.** This is implied by the factor AdGreen sources from Filmlocker. It looks high and should be verified before use.
- **Flights ≈ 0.38 kg per passenger-km on average.** The implied figure is ~0.22 for economy and ~0.62 for business. That is about twice DESNZ's with-RF factors, and I could not resolve why. Possible reasons are return legs counted differently or different factor vintages.
- **Car and taxi ≈ 0.254 kg per vehicle-km.**

**Case studies (AdGreen 2025 Update; P; M):**
- Lowkey Films' 60 s spot for Champion: **0.23 t** (local shoot, public transport, vegan catering).
- The Sweetshop's EY Foundation film: **1.76 t** (post-production was 25%, or 0.44 t; meat-free catering was 27%).
- Locate Productions' finisterre stills and motion campaign: **1.15 t per shoot**.
- Quiet Storm's Channel 4 "Black in Business": 5 ads made by a 40-person team (no total published).

**Virtual production claims (P, but these are claims and not verified):**
- Reckitt and MCA: VP "up to 75% [CO2] savings per shoot day" versus traditional production (AR2023 p.52).
- AMV BBDO's Bupa film: "roughly 95% lower" footprint by avoiding travel to four locations (AR2023 p.58, quoting the press).

### 2.8 Individual production case studies with published numbers

| Production | Key numbers | Scope | Source (type) | Conf. |
|---|---|---|---|---|
| ***Raised by Wolves* S2** (HBO Max / Scott Free, Cape Town, 2021) | **3,186 t**. 8 episodes; **107 shoot days**; 21 shoot weeks; 56 production weeks; 14 locations; **359 shooting crew and cast; 490 construction crew**. Fuel **1,945 t** (514,754 L diesel + 240,028 L petrol). Electricity 914 t (1,072,008 kWh; ≈0.85 kg/kWh, the South African grid). Flights 149 t (1,116,989 km; 0.133 kg/pkm). Accommodation 178 t (1,774 bed-nights). **Water 3,608 kL**. 857,096 plastic bottles avoided; 681 t of timber repurposed; 64% of waste diverted | PEAR (Scope 1, 2 and flights plus accommodation); third-party transport-company fuel excluded | GREENSET sustainability report, hosted by SEA (P) | H |
| *Raised by Wolves* S2, DERIVED | **29.8 t per shoot day**; **398 t per episode**; ~7.2 t per finished min (ASSUMED 55 min episodes); **83 kg per shooting crew/cast person-day** (35 kg if the 490 construction crew are counted as present every day); **4,811 L diesel and 2,243 L petrol per shoot day**; 10,019 kWh per shoot day; **33.7 m³ water per shoot day (≈94 L per person-day)** | – | DERIVED | M |
| Wales HETV drama (anonymous, 2021–22) | 1,487 t; 743 t/h; 61,388 meals = 166.6 t | albert | SND Wales 2023 (P) | H |
| *High Potential* (TV, LA, 2023–24) | A Moxion MP75-600 battery (550 kWh; 75 kW) replaced a **500-amp diesel generator for 7 days → avoided 4.3 t** (≈614 kg per day, or ≈231 L of diesel per day, DERIVED) | SEA case study | SEA 2026 (P) | M |
| *Day of the Jackal* S1 (NBCU, 2024) | Grid tie-ins at >40 locations; **>200,000 kWh** of grid electricity used in place of generators; grid power at >90% of locations | – | SEA 2026 (P) | M |
| *Outlander* (Sony, 11 years) | Overall footprint **cut 65%** over 11 years (PEAR) | – | SEA 2026 (P) | M |
| *Wicked* (Universal, 2023) | Renewable electricity and HVO avoided **~45% of Scope 1 and 2**; 75% LED set lighting; >500,000 plastic bottles avoided; 40% vegan menu. **No total published** | – | NBCUniversal (P) | M |
| *Abigail* (Universal, Dublin, 2023) | **57 shoot days**; 70% less generator run time; 100% of generators on HVO. No total | – | GreenerLight case study (P) | M |
| *Bridgerton* S4 (Netflix, UK) | 25,800 L of fossil fuel avoided with electric and hybrid vehicles; **49,430 L saved** by cutting generator use. No total | – | albert case study (P) | M |
| *The Diplomat* (Netflix) | Hydrogen power units at rural locations for 4–5 weeks saved **9,400–13,300 L of fuel per season** (≈270–475 L per day, DERIVED) | – | albert ACCELERATE 2025 (P) | M |
| *Downton Abbey: The Grand Finale* | A week-long hydrogen trial avoided ~1,800 L of diesel (unit base plus a marquee for 300 extras) | – | albert 2025 (P) | M |
| *Damsel* (Netflix, 2022) | Hydrogen power units saved >4,200 gal (≈15,900 L) and 44 t (≈2.77 kg/L, DERIVED) | – | Netflix ESG 2022 (P) | M |
| *The Union* (Netflix, London) | Batteries meant generators ran only 5% of filming hours; saved >1,800 gal | – | Netflix ESG 2022 (P) | M |
| *Legion* S2 (FX) | 252 t of CO2 avoided; 55% waste diversion; S2 emitted 45% less than S1 | – | FX/SEA case study (P) | L–M |
| *The X-Files* S11 (Fox, Vancouver) | 68% waste diversion; "avoided 19 tonnes" (of landfill waste) | – | SEA-hosted case study (P) | L |
| *The Day After Tomorrow* (Fox, 2004) | "10,000 metric tons of carbon" during production | – | TIME 2024 (S) | L |
| *The Amazing Spider-Man 2* | 52% waste diverted; 193,000 plastic bottles saved; production reported as "carbon neutral" (offsets). **The "~8,000+ t" figure could not be verified**: Sony's case-study page returned 403 and no source was found | – | Sony Greener World / Hollywood Reporter (S) | L |
| *Barbie*, *Oppenheimer* | **No published production footprint found.** TIME only says tentpoles "can emit up to 3,370 t" (the SPA average) | – | TIME (S) | – |

### 2.9 Studio and streamer disclosures

| Company | Disclosure | Source |
|---|---|---|
| **Netflix 2024** | Total emissions **1,037,226 t** market-based (Scope 1: 50,488; Scope 3: 986,738) and 1,129,124 t location-based. **Production = 41% of all scopes** (target-based), corporate 55% and streaming 4%. **Production = 69% of Scope 1 and 2.** DERIVED: production ≈ 0.38–0.43 Mt. Every directly managed scripted production used clean mobile power; about half cut generator fuel by >20% and 15% cut it by >50%. *Ransom Canyon* cut generator diesel by >50% (solar and batteries) | Netflix 2024 ESG Report (P, H) |
| Netflix 2022 | "Production-related emissions account for **60%** of our overall footprint" (≈0.69 Mt of 1,146,221 t, DERIVED). Clean mobile power avoided 1,179 t; EVs avoided 158 t; 185,000 gal of renewable diesel used | Netflix 2022 ESG (P, H) |
| NBCUniversal / Comcast | GreenerLight programme (2023–). Case studies (*Wicked*, *Abigail*) give percentages only; **no per-production totals are public** | NBCU (P) |
| Disney, WBD, Sony, Paramount, Amazon MGM | Their production data is pooled into the SEA benchmarks above (all are members). **No per-production totals found**, beyond the case studies listed | SEA (P) |
| SEA/SPA methodology papers | Scope 3 minimum boundary (Jan 2024): Categories 1, 3, 4, 5, 6 and 7 are relevant at production level; downstream distribution is excluded. The SEA and albert Scope 1 and 2 guidance was published in August 2025 | SPA/SEA whitepapers (P) |

### 2.10 Bottom-up emission factors

**UK Government GHG Conversion Factors 2025 (DESNZ, June 2025).** Source: flat file; primary; H. Use country-specific grid factors outside the UK.

| Activity | Factor (kgCO2e per unit) | Notes |
|---|---|---|
| **Diesel, 100% mineral** | **2.66155 per L** (0.26808 per kWh net CV) | Generators and vehicles |
| Diesel, average biofuel blend (UK forecourt) | 2.57082 per L | |
| Gas oil ("red diesel") | 2.75541 per L | |
| Petrol, 100% mineral / average blend | 2.33984 / 2.06916 per L | |
| **HVO (Biodiesel HVO)** | **0.03558 per L** (Scope 1). Outside-of-scopes biogenic CO2 ≈ 2.43 per L (PEAR, DEFRA 2023) | Lifecycle savings are usually quoted as ~70–90% (see Section 4) |
| Biodiesel ME | 0.16751 per L | |
| **WTT, diesel** | **+0.62409 per L** (mineral) / 0.61101 (blend) | Scope 3 upstream |
| WTT, petrol | +0.60664 per L (mineral) | |
| LPG | 1.55713 per L | |
| Natural gas | 0.18296 per kWh (gross CV) | Stage heating |
| Aviation turbine fuel | 2.54269 per L; WTT +0.52817 per L | Charters and helicopters (fuel-based) |
| Energy content (DERIVED) | **Diesel ≈ 9.93 kWh per L; petrol ≈ 9.20 kWh per L** (net CV) | For the kWh column in our tool |
| **UK grid electricity** | **0.177 per kWh** (generation) + 0.01853 (T&D) + 0.0459 and 0.00397 (WTT) | Location-based |
| **Flights, economy, with RF** (passenger-km) | Domestic UK 0.22928 (average); short-haul 0.12576; **long-haul 0.11704**; international non-UK 0.10916 | WTT adds ~0.02–0.03 per pkm |
| Flights, economy, without RF | Short-haul 0.07435; long-haul 0.06926; international 0.06449 | **PEAR/SEA use the without-RF factors** |
| **Flights, business, with RF** | Short-haul 0.18863; **long-haul 0.3394**; international non-UK 0.31656 | ~2.9 times economy (AdGreen's figure) |
| Flights, premium economy / first (long-haul, with RF) | 0.18726 / 0.46814 | |
| Car, average (unknown fuel) | **0.16725 per km** (petrol 0.16272; diesel 0.17304; hybrid 0.12825; plug-in hybrid 0.10461; **battery EV 0.04047** including UK grid) | Business-travel factors |
| Large car, petrol / diesel | 0.26828 / 0.21007 per km | Unit cars, SUVs |
| Taxi, regular | 0.20806 per vehicle-km (0.14861 per passenger-km); London black cab 0.30604 per km | |
| **Van, Class III (1.74–3.5 t), diesel** | **0.27878 per km** (average van 0.25561; battery EV van 0.06315 including electricity) | Grip, camera and Luton-type vans |
| **HGV, rigid 3.5–7.5 t, average laden** | **0.49548 per km** | "5-ton" trucks |
| HGV, rigid 7.5–17 t / >17 t | 0.60501 / 0.99156 per km | Grip and electric trucks, honeywagons |
| HGV, articulated (all) | 0.92854 per km | Trailers |
| Rail (national UK) / international rail / coach | 0.03546 / 0.00446 / 0.02776 per passenger-km | |
| Freight: HGV average laden / freight train / container ship | 0.10163 / 0.02779 / 0.01612 per tonne-km | |
| Freight: air, long-haul (with RF) / short-haul (with RF) | 0.89939 / 1.27835 per tonne-km | Air-freighted kit |
| **Hotel stay** (per room-night; CHSB 2021 median, held constant since 2022) | **UK 10.4; London 11.5; USA 16.1; Canada 7.4; France 6.7; Germany 13.2; Spain 7.0; Italy 14.3; Australia 35; Mexico 19.3; South Africa 51.4; UAE 63.8; India 58.9; China 53.5; Japan 39** | DESNZ takes these from the Cornell Hotel Sustainability Benchmarking (CHSB) tool; there is no separate CHSB 2024/25 figure |
| **Materials (primary production)** | **Wood 269.5 per t** (re-used 38.5); metals (construction) 3,824 per t (closed-loop 1,639); plasterboard 120 per t; concrete 118.8 per t; average construction 75.0 per t; clothing 22,310 per t (re-used 152) | Set construction; wardrobe |
| **Waste disposal** | **Wood to landfill 925 per t**; commercial and industrial waste to landfill 520.5 per t; food to landfill 700 per t; paper to landfill 1,164 per t; recycling, energy-from-waste or composting ≈ 4.7–9.0 per t (transport only) | |
| Water | Supply 0.1913 per m³; treatment 0.17088 per m³ | |
| Homeworking | 0.334 per FTE-hour (office equipment plus heating) | Remote post and edit teams |

**PEAR 4.2.9 (SEA calculator, 2025; P).**
- Fuels use DEFRA 2023 values: diesel 10.07 kg per gallon; gasoline 8.88 kg per gallon; jet fuel 9.63 kg per gallon; propane 5.89 kg per gallon; renewable diesel R100 0.135 kg per gallon (Scope 1).
- Commercial flights are 0.1610 (short), 0.1097 (medium) and 0.1542 (long) kg per pkm, all without RF.
- Vehicle defaults are cars 28.3 mpg, vans, pickups and SUVs 20.4 mpg, trucks 7.5 mpg and 18-wheelers 6 mpg.
- Charters use gallons per hour: chartered commercial jet 950; large private jet 440; small private jet 220; helicopter 50.
- **Hotels count electricity only**, based on the area-based CBECS benchmarks: economy 5,516 kWh per room-year, midscale 10,870, upscale 12,596 and luxury 16,453. That is ≈15–45 kWh per room-night (DERIVED). Stages use the "warehouse" intensity of 5.8 kWh per sq ft per year.

**Diesel generator fuel efficiency.** The source is the generatorsource.com fuel-consumption table (secondary; M). The ranges below are DERIVED from gallons per hour at each load level.

| Generator size | L/kWh at 25% load | 50% | 75% | 100% |
|---|---|---|---|---|
| 20 kW | 0.45 | 0.34 | 0.33 | 0.30 |
| 100 kW | 0.39 | 0.31 | 0.29 | 0.28 |
| 500 kW | 0.33 | 0.28 | 0.27 | 0.27 |

- That gives **~0.75–1.20 kgCO2e per kWh delivered** (TTW), plus **0.17–0.28** WTT. This is **4–7 times the UK grid**, and far more against the French grid (Ecoprod: 18 times).
- Real sets run generators at low load. Film London's *Fuel Project II* (2024) found that across 190 production generators, **83% never reached 50% load and 98% were over-specified**.
- **Generator fuel per day, observed:**
  - AdGreen ads: **≈88 L per generator-day** (DERIVED).
  - *High Potential*, one 500 A generator: ≈231 L per day (DERIVED).
  - *The Diplomat* basecamp: ≈270–475 L per day avoided.
  - *Raised by Wolves* S2, all diesel (generators plus trucks): ≈4,811 L per shoot day.

**Catering (per meal).**
- ADEME Impact CO2 API, accessed 2026-09-25 (P; H): beef meal **4.97**; veal 4.12; pork 1.65; chicken **1.46**; salmon 1.46; cod 2.43; **vegetarian 0.85**; **vegan 0.54** kgCO2e.
- albert calculator factors implied by the Wales HETV production (DERIVED): **beef 9.93**, lamb 5.22, pork 3.14, chicken 2.88, fish 2.49, **vegetarian 0.76**, **vegan 0.52**; average **2.71 kg per meal**.
- AdGreen 2025 (DERIVED): beef ≈9.9, other meat or fish ≈3.4, vegetarian ≈0.64 kg per meal; ≈6.0 kg per meal once drinks, packaging and waste are included.

**Other factors.**
- **Hard drive ≈ 200 kg each**, from the AdGreen/Filmlocker factor (DERIVED; flagged as high).
- **Remote post-production or animation studio:** a 403 t per year studio with ~570 staff works out to 0.7 t per worker per year, and 65% of that came from home-working heating (CMPA 2024; S; M).

### 2.11 Energy (kWh) anchors for production

| Item | Value | Source |
|---|---|---|
| UK productions' grid electricity, 2024 | 231 million kWh; 2,540 footprints; ≈91,000 kWh per footprint and ≈20,000 kWh per hour of content (DERIVED from 174,437 t ÷ 15.33 t/h = 11,379 h) | albert 2025 (P) |
| UK generator fuel, 2024 | 3.0 million L ≈ 29.8 GWh thermal (DERIVED) → roughly 6.7–10.7 GWh of electricity at 0.28–0.45 L/kWh (DERIVED) | albert 2025 (P) |
| London supplier fleets | ~1,800 mobile power units = **64,000 t per year** (well-to-wheel, modelled); ~3,200 supplier vehicles = **50,000 t per year**. The largest units (>250 kVA) produce half of mobile-power emissions and often run at studios | Film London / Creative Zero, *The Fuel Project II* (P, M) |
| *Raised by Wolves* S2 | 1,072,008 kWh of studio power (≈10,000 kWh per shoot day); diesel 514,754 L (≈5.1 GWh thermal); petrol 240,028 L (≈2.2 GWh thermal) | GREENSET report (P) |
| *Day of the Jackal* S1 | >200,000 kWh from temporary grid connections at >40 locations | SEA 2026 (P) |
| Battery units (SPARK taxonomy) | Portable 2–20 kWh; mobile 50–350 kWh; transportable ≥500 kWh. Moxion MP75-600: 550 kWh, 75 kW continuous, ≈24 h at 22.5 kW | albert SPARK 2026; SEA 2026 (P) |
| Hotels (PEAR) | ≈15 kWh (economy) to ≈45 kWh (luxury) per room-night, electricity only (DERIVED) | PEAR 4.2.9 |

### 2.12 Virtual production (LED volumes)

| Evidence | Value | Type / confidence |
|---|---|---|
| AdGreen 2025 dataset | 251 virtual-studio days = 2.6% of shooting-space CO2e ≈ 19.9 t → **≈79 kg per VP day**. Compare ≈140 kg per studio day, ≈83 kg per location day on mains and ≈347 kg per generator day (DERIVED; UK grid, mostly on renewable tariffs) | P data, DERIVED; M–L. Scope unclear: it may exclude the energy of content creation and rendering for the volume |
| Reckitt / MCA | "Up to 75% CO2 savings per shoot day" versus traditional (Ad Net Zero award, 2023) | Claim, not verified; L |
| AMV BBDO / Bupa | "Roughly 95% lower" footprint (four locations reproduced without travel), per AdGreen's calculator | Claim; L |
| AdGreen caveat | "We need to consider the energy required to design and store virtual production assets, as well as the equipment needed" | P qualitative |
| albert 2025 | Recommends VP and local crews as ways to cut flights; gives no numbers | P qualitative |
| *The Mandalorian* (ILM StageCraft), Netflix *1899* (Dark Bay), ARRI Stage London, StoryFutures or academic LED-volume LCAs | **Not retrieved.** The web-search budget ran out before these could be located (see Section 4) | GAP |

**Recommended bottom-up VP formula** (the parameters must be supplied or sourced):

E_VP = [ LED wall kWh + processor and render-node kWh + stage HVAC kWh + lighting kWh ] × grid EF + embodied content-creation compute (GPU-hours × W × PUE × EF) + the usual crew, catering and transport terms.

Most of the savings come from removing flights, hotels, unit moves and generators, not from the stage's energy use.

### 2.13 Post-production and VFX

| Metric | Value | Source / type | Conf. |
|---|---|---|---|
| Post-production share, UK features | 5% (2024) | albert 2025 (P) | H |
| Post-production share, France | 9.2% all genres; 15.8% feature films; 26.2% documentaries; 10.5% series | Carbon'Clap (P) | H |
| Post-production share, ads | 2.7% of the mean (2022); **16.3% for projects ≤1 t**; 1.3% for projects ≥100 t | AdGreen AR2022 (P) | H |
| Post-production share, SEA/PEAR | **Excluded from scope** | SEA | H |
| UK post facilities on renewable power | 47% (2024) | albert (P) | H |
| *Avatar: The Way of Water* (Weta FX) | "Nearly **3.3 billion thread hours**"; data held on AWS | Wikipedia, citing Weta's VFX producer (S) | M |
| DERIVED energy for Avatar 2 | ≈6.6–19.8 GWh, if ASSUMED 2–6 Wh per thread-hour including cooling. **This is an assumption, not sourced.** Weta's NZ grid is largely hydro, so the CO2e is low, but it is uncalculated here | DERIVED | L |
| Pixar render times | *Toy Story 3*: ~7 h per frame on average, some frames >30 h; the most complex *Toy Story 4* frame took >1,200 h | CMPA 2024 citing Kajawood citing WIRED (S) | L |
| Illustrative animated feature | 130,000 frames × 3 h × 270 W ≈ **105,300 kWh**. The CMPA report says "≈110 t", **but 105,300 kWh × 0.110 kg/kWh (Canada 2020) = 11.6 t**, so the report's arithmetic is off by 10 times | CMPA 2024 (S) | L |
| Animation studio (British Columbia, ~570 staff) | 403 t per year in total; 0.7 t per worker per year; air travel ~18–20%; home-working heating 65% | CMPA 2024 case study (P for that studio) | M |
| DNEG, Framestore, ILM, MPC/Technicolor, Weta | **No emissions or energy figures published** on their sustainability pages. Framestore: net zero by 2050 and a 55% cut in Scope 1 and 2 by 2030 from a 2023 baseline; Montréal site on 100% hydro | Company sites (P) | – |
| Per VFX shot or per finished CG minute | **Not found anywhere** | GAP | – |

### 2.14 Water

| Item | Value | Source |
|---|---|---|
| *Raised by Wolves* S2 | **3,608 kL (m³)** in total; ≈33.7 m³ per shoot day; ≈94 L per crew/cast person-day (DERIVED); toilets used 250 ml per flush | GREENSET (P; M) |
| Industry reporting | "Total water consumption is not reported and often left out of sustainability discussions, despite being critical. The current focus is on reducing bottled water" | *A Screen New Deal* p.13 (P) |
| AdGreen (projects without a shoot) | Water use at work spaces = 0.2% of CO2e | AdGreen AR2025 (P) |
| Carbon factor for water | 0.191 kg per m³ (supply) + 0.171 kg per m³ (treatment) | DESNZ 2025 |
| Rain towers, water tanks, wet-down, SFX water | **No quantitative data found** | GAP |
| Bottled water avoided (a proxy for drinking-water volumes) | *Raised by Wolves* S2: 857,096 × 330 ml bottles (≈283 m³); *Wicked*: >500,000 bottles; *The Amazing Spider-Man 2*: 193,000 | Case studies |

---

## 3. Methodology notes: recommended bottom-up model for a user-specified shoot

### 3.1 Structure

Use a two-layer approach: an activity-based calculator, then a benchmark sanity check.

**Layer A: activity-based model.** This follows the albert, AdGreen and PEAR structure and uses DESNZ 2025 factors by default, swapping in a country grid factor where needed.

```
E_total = E_flights + E_ground_people + E_accommodation + E_catering
        + E_equipment_transport + E_power_location + E_stage + E_materials + E_waste
        + E_data_storage + E_post + E_office   (+ E_VP if an LED volume is used)
```

| Term | Formula | Default parameters (source) |
|---|---|---|
| Flights | Σ legs: passengers × **great-circle km** × EF(haul, class, **with RF**). The published DESNZ 2025 factors **already include the 8% great-circle distance uplift and the 1.7× RF multiplier on the CO2 component** (DESNZ methodology §8.18 and §8.44), so do not add them again | Economy long-haul 0.117, business 0.339, first 0.468; short-haul economy 0.126, business 0.189; domestic UK 0.229 (DESNZ 2025, with RF). Offer a "PEAR-comparable, no RF" toggle (0.069 long-haul economy) |
| Ground: people | Crew × days × round-trip km ÷ occupancy × EF(vehicle), plus rail and taxi | Average car 0.167 per km; battery EV car 0.040; taxi 0.208; rail 0.035 per pkm. ASSUMPTIONS: occupancy 1.2–1.5; commute 30–60 km round trip |
| Accommodation | Non-local crew × nights × EF(country) | CHSB/DESNZ per room-night: UK 10.4, US 16.1, Canada 7.4, France 6.7 and so on |
| Catering | People × days × meals per day × EF(menu mix) + extras | Mixed menu ≈2.7 kg per meal (albert-implied), rising to ≈6 kg once drinks, packaging and waste are added (AdGreen). Beef ≈5–10; vegetarian ≈0.6–0.85; vegan ≈0.5. ASSUMPTION: 1.5 meals per person per shoot day |
| Equipment transport | Σ vehicles × km × EF(class), or fuel litres × 2.66 | Class III van 0.279 per km; 7.5 t truck 0.495; >17 t rigid 0.99; articulated 0.93. Couriers and air freight by tonne-km |
| Location power | Generator litres × (2.66 + 0.62 WTT) for diesel, 0.036 for HVO (Scope 1); **or** kWh_e × SFC(0.28–0.45 L/kWh) × EF; **or** grid/battery kWh × grid EF | **Default generator day: 88 L** (small commercial unit, AdGreen) to **230 L** (500 A unit); large scripted basecamps run hundreds to thousands of L per day. For small shoots, default to SFC 0.40 L/kWh because of under-loading |
| Stage / studio | Stage-days × kWh per day × grid EF (+ heating gas) | AdGreen UK: ≈140 kgCO2e per studio-day and ≈83 per location-on-mains day. PEAR area method: 5.8 kWh per sq ft per year (baseline only, excluding production lighting) |
| Materials | Tonnes × EF(primary or re-used) | Timber 270 kg per t (re-used 39); steel and metals 3,824; plasterboard 120; new clothing 22,310 per t (re-used 152) |
| Waste | Tonnes × disposal EF | Wood to landfill 925 kg per t; commercial waste to landfill 521; recycling or composting ≈5–9 |
| Data storage | New drives × EF + cloud TB-months | AdGreen-implied ≈200 kg per new drive (verify); **0 if drives are re-used** |
| Post-production | Suite-days × kWh per day × grid EF + render node-hours × W × PUE × EF | ASSUMPTION placeholders: 10–30 kWh per edit or grade suite-day. Render: node-hours × 0.3–0.6 kW × PUE 1.2–1.6 (unsourced; replace with vendor data) |
| Office / remote working | FTE-hours × 0.334 kg (UK homeworking) or office kWh | DESNZ 2025 |

**Energy (kWh) output.**
- Report fuels in thermal kWh: diesel 9.93 kWh per L; petrol 9.20 kWh per L.
- Report grid and battery electricity in kWh_e.
- Flights can be expressed as fuel-energy, but this is not standard. The recommendation is to report flights in CO2e only.

**Water output.**
- Default: ≈30–35 m³ per shoot day for a large HETV unit (*Raised by Wolves* S2), and **≈90 L per person-day** as a scalable proxy (DERIVED from a single source; low confidence).
- Multiply by 0.36 kgCO2e per m³.
- Treat rain, SFX and tank water as a user input.

### 3.2 Layer B: benchmark sanity check (use to bound the model)

- **Per shoot day, by scale:**
  - micro or ≤1 t projects: **0.1–0.3 t per day**
  - typical commercial: **2–3 t per day** ("2 t + travel")
  - high-end commercial: **5–30 t per day**
  - HETV or scripted episodic: **~20–30 t per day**
  - tentpole: **33–42 t per day**
- **Per project:** use the AdGreen budget-per-shoot-day brackets (Section 2.7) for ads, music videos and branded content. Use the SEA tiers for features and episodes.
- **Per finished minute:**
  - corporate and music video: ~0.15 t/min
  - shorts: ~0.5 t/min
  - UK TV average: ~0.26 t/min
  - 1-hr drama: ~2–2.6 t/min
  - features: ~1–4 t/min for indie and mid-budget; ~23–28 t/min for tentpoles
  - ads: ~9 t per produced minute, or more
  
  Always show which runtime assumption was used.

### 3.3 Worked examples

These are illustrations of the model, using DESNZ 2025 factors and the ASSUMPTIONS stated.

**A. Local music video.** 2 shoot days, 20 crew and cast, London, no flights, generator on location.

| Term | Inputs | kgCO2e | Share |
|---|---|---|---|
| Commute | 20 × 2 × 30 km ÷ 1.5 × 0.167 | 134 | 12% |
| Van | 200 km × 0.279 | 56 | 5% |
| Generator, TTW | 2 × 88 L × 2.66 | 468 | 41% |
| Generator, WTT | | 110 | 10% |
| Catering | 20 × 2 × 1.5 × 2.7 | 162 | 14% |
| Timber | 0.2 t | 54 | 5% |
| Waste to landfill | 0.3 t | 156 | 14% |
| Edit | 5 days × 10 kWh | 10 | 1% |
| **Total** | | **≈1.15 t** | |

- That is ≈0.57 t per shoot day and ≈29 kg per person-day.
- Swapping the generator for 100 kWh per day of mains or battery power brings the total to ≈0.61 t.
- Both results sit inside AdGreen's £1–10k per shoot-day brackets (0.8–1.2 t) and below Carbon'Clap's 2 t average for "clip and institutional" videos.

**B. Commercial.** 3 shoot days, 40 crew, and 6 people flying London–LA return. The ≈8,760 km each-way distance is an ASSUMED great-circle figure.

| Term | Inputs | kgCO2e | Share |
|---|---|---|---|
| Flights (business, with RF) | 6 × 17,520 km × 0.3394 | 35,678 | 86% |
| Generator | 3 × 230 L × (2.66 + 0.62) | 2,267 | 5% |
| Set build | 1.5 t timber + 0.2 t steel | 1,169 | 3% |
| Waste to landfill | 1.5 t | 781 | 2% |
| Commute | 40 crew × 3 days × 40 km ÷ 1.5 | 535 | 1% |
| Catering | 40 × 3 × 1.5 × 2.7 | 486 | 1% |
| Hotels | 30 US room-nights | 483 | 1% |
| Trucks | two 7.5 t trucks, 3 × 80 km | 238 | 1% |
| Post | 10 suite-days × 30 kWh | 59 | 0% |
| **Total** | | **≈41.7 t** | |

- That is ≈13.9 t per shoot day and ≈350 kg per person-day.
- **With economy flights instead, the total is ≈18.3 t.** This matches AdGreen's finding that business-class flights are the single largest lever.

### 3.4 Scope and comparability guidance for the GenAI comparison

1. **Offer two scope settings.**
   - A "studio-benchmark scope" (PEAR: fuel, utilities, air without RF, housing) lets users compare against SEA tiers.
   - A "full footprint scope" (albert, AdGreen or Carbon'Clap: with RF, food, materials, waste, post and data) is the default for a fair comparison with GenAI. GenAI estimates normally include only compute, so be explicit that production-side embodied items (sets, costumes, equipment) have no equivalent in GenAI.
2. **RF, WTT and grid method.**
   - Default to **with RF** for flights. DESNZ publishes separate "with RF" factors, which apply a 1.7× multiplier to the CO2 component and note that it is "subject to significant uncertainty". albert and AdGreen both build on BEIS/DESNZ factors. Also include WTT for fuels.
   - Use **location-based** grid factors. Renewable tariffs make market-based numbers lower: albert's implied grid average for mains energy is ≈0.096 kg/kWh against the 0.177 grid factor.
3. **Per-minute normalization is unstable for short formats.** Carbon'Clap declines to publish a per-hour figure for ads for this reason. Show per-project and per-shoot-day figures as primary, and per-minute as secondary.
4. **Use medians as well as means.** Commercial footprints are heavily right-skewed (AdGreen: median ≈0.75 t against a mean of 9 t). A few flight-heavy projects drive the mean.

---

## 4. Gaps, uncertainties and conflicting values

### 4.1 Conflicts found

| Topic | Conflict | Handling |
|---|---|---|
| Tentpole average | SPA 3,370 (2016–19) vs *A Screen New Deal* 2,840 (19 tentpoles, same PEAR framework) vs SEA 2,996 (2020–22) vs SEA 2023–24 2,444 combined (1,732 Tentpole / 2,962 Tentpole+). SEA 2025 calls the 2016–19 figure "3,390" in its text but 3,370 in its charts | Use SEA 2023–24 by band; cite the others as history |
| SEA 2023–24, 1-hr drama | 128.6 t per episode (key takeaway and appendix) vs 121 t (bar chart). Fuel 72.6 (Appendix B) vs 68.2 (Appendix C and chart). Half-hour categories 45.7 and 44.5 (appendix) vs 42 and 41 (chart) | Report both; prefer the appendix table |
| SEA Appendix E, per-day utilities | The per-day electricity and heat values are internally inconsistent (for example, Small heat of 6.4 t per day exceeds its total heat) | Not used |
| albert food share | Food 12,299 t (7.05% of 174,437) in the infographic vs "Food-based emissions accounted for 4% of the total" in the text | Use tonnage, and flag |
| albert feature film per hour | Text: 66.42 t/h. Production-type chart: ~58 t/h (CHART-READ) | Use the text figure |
| albert per-hour history | 2019: 9.2 (albert/Televisual) vs "2019: 4.4" (CMPA footnote, probably the 2020 lockdown year). Calculator methods changed in 2021 (international update), so the series is not a consistent trend | Flag |
| *A Screen New Deal* vs SPA splits | SND: transport 51%, energy 34%, generators 15%. SPA: fuel 48%, utilities 22%, air 24%, housing 6%. The categories are defined differently (SND puts vehicle fuel under transport and splits generators out; SPA pools all fuel) | Do not mix the category shares |
| Generator emissions, UK | albert: 3 million L → 7,206 t (all UK productions reporting). Film London: London supplier mobile power units alone = 64,000 t per year (modelled, well-to-wheel, fleet-level) | These measure different things; flag |
| Fuel CO2e per litre | DESNZ diesel 2.66 kg/L (TTW) or 3.29 (with WTT). albert fleet average 2.40 (with 30% HVO). AdGreen generator-implied ≈3.4. *Raised by Wolves* S2 2.58 (mixed diesel and petrol). *Damsel* 2.77 | Use DESNZ plus explicit WTT |
| Flight intensities | AdGreen-implied ≈0.22 (economy) and 0.62 (business) kg/pkm vs DESNZ 2025 with RF 0.117 and 0.339 (long-haul) | Unresolved; use DESNZ |
| HVO savings | DESNZ Scope 1 0.036 kg/L (≈99% below diesel's direct emissions). Jurassic World Dominion cited ~70% lifecycle reduction; SND Wales "up to 80–90%"; AdGreen modelled a 71.9% cut in generator-fuel CO2e | Use lifecycle 70–90% for "real" savings; note the direct accounting is misleading |
| Meal factors | ADEME beef meal 4.97 kg vs albert-implied 9.93 and AdGreen-implied 9.9. ADEME vegetarian 0.85 vs albert 0.76 vs AdGreen 0.64. Ecoprod: vegetarian "up to 10 times" lower than red meat | Use albert/AdGreen for UK-comparable results; ADEME for France |
| CMPA render arithmetic | 105,300 kWh at 0.110 kg/kWh = 11.6 t, not the report's "110 t" | Use the corrected value |
| AdGreen hard-drive factor | ≈200 kg per drive (implied) looks high for one HDD | Flag; verify with Filmlocker |
| *The Amazing Spider-Man 2* "8,000+ t" | Could not be verified; Sony's page was blocked (403) | Do not use |

### 4.2 Gaps: data not found, or not retrievable in this session

- **Web-search budget exhausted.** The session's shared WebSearch budget ran out partway through this stream. After that, I only fetched known URLs, used public data APIs (Crossref, OpenAlex, ADEME Impact CO2, and the SEA site's public Sanity CMS file index), and read site sitemaps. I did not use alternative search engines. Items that still need searching are listed below. A follow-up pass with a higher web-search limit could close them.
- **Blocked sources.** web.archive.org is blocked by the egress policy. sciencedirect.com, bafta.org and several baftaalbert.org pages returned 403 (Cloudflare). I only had the abstract of the 2026 Dutch TV life-cycle paper (de Almeida Martins & Fouladvand, *Cleaner Environmental Systems*).
- **Virtual production.** I found no quantitative LED-volume energy study (albert/StoryFutures, ARRI, *The Mandalorian*, *1899*, or the academic LCAs from 2022–25). The only numbers are AdGreen's derived ≈79 kg per VP day and agency claims.
- **VFX energy.** No VFX studio sustainability report with MWh or tCO2e was found (DNEG, Framestore, Weta, ILM, MPC). There is no per-shot or per-CG-minute energy data. Avatar 2's thread-hours are a secondary source, and the energy conversion depends on an assumption. Pixar render-farm figures come from third-hand sources.
- **National schemes.** I found no quantitative production-footprint data for Germany (Grüner Drehpass, the MFG, FFA and ökologische Mindeststandards evaluations), Ireland (Screen Ireland's page covers only its organisational footprint), Australia (the Documentary Australia and Screen Australia PDFs failed to download), Creative Europe or Eurimages. Canada is covered only through the SEA and SPA regional splits (Vancouver, Toronto and Montréal) and a Reel Green mention.
- **Music videos, YouTube creators, micro-budget and corporate video.** There is no dataset specific to these formats. The proxies are Carbon'Clap "Vidéos (clip, institutionnel)", AdGreen's small projects and low budget brackets, and the bottom-up model.
- **Crew-person-day.** No benchmark publishes this metric. The anchors are *Raised by Wolves* S2 (≈35–83 kg), meal-normalized AdGreen (≈76 kg per meal, flight-heavy), albert UK (≈63 kg per meal) and Wales HETV (≈24 kg per meal).
- **Per-shoot-day values for mid-tier features.** Only tentpoles (SPA and SEA) and ads (AdGreen) publish per-day intensities.
- **Water.** There is one case study (*Raised by Wolves* S2). There is no data on rain towers, tanks, wet-downs or catering water.
- **Individual blockbusters** (*Barbie*, *Oppenheimer*, *Wicked* totals, *Bridgerton* totals). No published totals were found.
- **CHSB 2024/2025.** DESNZ still uses CHSB 2021 medians (held constant since the 2022 release). I did not obtain a newer CHSB release.
- **Data vintage.** SEA 2023–24 has small samples in some film bands (n = 8–22). The albert and AdGreen data are self-reported and unaudited. Carbon'Clap's figures include forecast (*prévisionnel*) footprints: two-thirds of Carbon'Clap footprints are forecasts.

---

## 5. Sources (all accessed 2026-09-25)

**Primary: benchmarks and reports**
1. Sustainable Production Alliance, *Carbon Emissions of Film and Television Production* (March 2021). https://greenproductionguide.com/wp-content/uploads/2021/04/SPA-Carbon-Emissions-Report.pdf
2. SPA, *Regional Analysis of Film and Television Carbon Emissions – Close up look in North America* (July 2022). https://greenproductionguide.com/wp-content/uploads/2022/07/SPA-Regional-Carbon-Emissions.pdf
3. Sustainable Entertainment Alliance, *Carbon Emissions of Film & Television Production 2020–2022* (May 2025). https://cdn.sanity.io/files/pkrr84s9/production/482921fbe8e5678d5efaaad9a5fb17bcf6a0f24e.pdf
4. SEA, *Carbon Emissions of Film & Television Production 2023–2024* (May 2026). https://cdn.sanity.io/files/pkrr84s9/production/911be83931fb506a487855de55145557aa363603.pdf
5. SPA, *Scope 3 Emissions in Film and Television Production* whitepaper (Jan 2024). https://greenproductionguide.com/wp-content/uploads/2024/03/Sustainable-Production-Alliance_Scope-3-Whitepaper.pdf
6. SEA and BAFTA albert, *Scopes 1 & 2 Emissions* whitepaper (Aug 2025). https://cdn.sanity.io/files/pkrr84s9/production/7652c18a419203aab88d119ce47212f40f047793.pdf
7. PEAR calculator v4.2.9 (xlsx, 2025). https://cdn.sanity.io/files/pkrr84s9/production/778cedbf1b0be302984677582a74a7ba119ee692.xlsx. PEAR methodology v4.2.4 (May 2024): https://cdn.sanity.io/files/pkrr84s9/production/f47c1ea9c28673669cd5363f91bfafe58651289b.pdf
8. SPA, *Soundstage Facility Survey Key Takeaways* (May 2022). https://cdn.sanity.io/files/pkrr84s9/production/fbe8b2f6fb58941bb53efc315933dbe8ca65ce1b.pdf
9. BAFTA albert, *ACCELERATE 2025* (2024 data; published Nov 2025). https://baftaalbert.org/wp-content/uploads/2026/04/ACCELERATE-2025-BAFTA-albert-report.pdf
10. BAFTA albert, *SPARK: Clean Temporary Power by 2030* (2026). https://baftaalbert.org/wp-content/uploads/2026/04/SPARK-Clean-Temporary-Power-by-2030-Final-Report.pdf
11. albert, *Year One Report: Carbon Footprinting the TV Industry* (Nov 2012). https://static.bafta.org/files/albert-year-one-report-carbon-footprinting-the-tv-industry-1574.pdf
12. BFI, BAFTA albert and Arup, *A Screen New Deal: A Route Map to Sustainable Film Production* (2020). https://www.arup.com/globalassets/downloads/insights/a-screen-new-deal-a-routemap-to-sustainable-film-production.pdf
13. BFI, albert and Arup, *Screen New Deal: Transformation Plan for Wales* (Dec 2023). https://baftaalbert.org/wp-content/uploads/2026/04/bfi-screen-new-deal-transformation-plan-for-wales-2023-12-05.pdf
14. Ecoprod, *Impact environnemental de la production audiovisuelle, cinéma et publicitaire – Statistiques Carbon'Clap et Label Ecoprod* (Jan 2025, 2024 data). https://ecoprod.com/wp-content/uploads/2026/06/IMPACT-ENVIRONNEMENTAL-DE-LA-PRODUCTION-AUDIOVISUELLE-CINEMA-ET-PUBLICITAIRE-2024.pdf (English version: https://ecoprod.com/wp-content/uploads/2025/04/english_RAPPORT-CARBONCLAP-ET-LABEL-ECOPROD-2024.pdf, not downloaded)
15. AdGreen, *Annual Review 2022*. https://cdn.prod.website-files.com/66797978774108bfe3dddcde/668fa6c13a4db2a0e126a912_AdGreen-Annual-Review-2022-2.pdf
16. AdGreen, *Annual Review 2023*. https://cdn.prod.website-files.com/66797978774108bfe3dddcde/668f9760e9fc55e48aa65672_AdGreen_AnnualReview_Digital_HighRes-compressed.pdf
17. AdGreen, *2025 Update* (2024 data). https://cdn.prod.website-files.com/66797978774108bfe3dddcde/686bda7bf91f06a9fbc55ebc_AdGreen%202025%20Update%20Review%20lo-res.pdf
18. AdGreen, *Annual Review 2025* (2025 data). https://cdn.prod.website-files.com/66797978774108bfe3dddcde/6a032ef4b961615896d663b8_2025_Annual_Review_compressedv3.pdf
19. AdGreen methodology page. https://www.weareadgreen.org/methodology
20. Film London and Creative Zero, *The Fuel Project II: The Shift* (Sept 2024). https://film-london.files.svdcdn.com/production/The-Fuel-Project-The-Shift-September-24-V1.pdf
21. Netflix, *2024 ESG Report*. https://s22.q4cdn.com/959853165/files/doc_downloads/2025/6/2024-Netflix-Environmental-Social-Governance-Report.pdf. *2022 ESG Report*: https://downloads.ctfassets.net/4cd45et68cgf/7rnC6zK537cM8zAGrXA90E/3c654a2d0023a4dac26a20b2fff39855/Netflix_2022-ESG-Report-FINAL.pdf
22. GREENSET, *Raised by Wolves Season 2 Sustainability Report* (revised March 2022). https://cdn.sanity.io/files/pkrr84s9/production/7232343ab86dafb94f02232f9f9c43b5ca64aafe.pdf
23. SEA-hosted case studies:
    - *High Potential*: https://cdn.sanity.io/files/pkrr84s9/production/87b9ee9db3171d8b11c397b2bdbbb1455379688a.pdf
    - *Abigail*: https://cdn.sanity.io/files/pkrr84s9/production/1fca1cdf7e0a1668798ebdc4b9a38fe81da7b62d.pdf
    - *Legion*: https://cdn.sanity.io/files/pkrr84s9/production/be5dd31c862eee0cea8093f22e17209f75a20687.pdf
    - *The X-Files* S11: https://cdn.sanity.io/files/pkrr84s9/production/69418805043eb5fac5922f7b121c86a2034f8cec.pdf
    - *Henry Danger: The Movie*: https://cdn.sanity.io/files/pkrr84s9/production/4253db8c02dc4eb119a49ae111b0d7ec3c6c6ecf.pdf
24. NBCUniversal, "How Universal took steps to make *Wicked* even greener." https://www.nbcuniversal.com/article/how-universal-took-steps-make-wicked-even-greener
25. BAFTA albert case studies:
    - *Bridgerton* S4: https://baftaalbert.org/case-studies/bridgerton-season-4-2026/
    - *Jurassic World Dominion*: https://baftaalbert.org/case-studies/jurassic-world-dominion-2022/
26. DESNZ, *UK Government GHG Conversion Factors for Company Reporting 2025* (flat file and methodology paper). https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2025. Flat file: https://assets.publishing.service.gov.uk/media/6846b6ea57f3515d9611f0dd/ghg-conversion-factors-2025-flat-format.xlsx. Methodology: https://assets.publishing.service.gov.uk/media/6846b0870392ed9b784c0187/2025-GHG-CF-methodology-paper.pdf
27. ADEME, Impact CO2 API (meals, category 2). https://impactco2.fr/api/v1/thematiques/ecv/2?detail=0
28. de Almeida Martins and Fouladvand (2026), "Toward a sustainable TV industry: Measuring the carbon footprint across the entire production life cycle," *Cleaner Environmental Systems*, doi:10.1016/j.cesys.2026.100467 (abstract via OpenAlex). https://www.sciencedirect.com/science/article/pii/S2666789426000735
29. Earth Angel for the Canada Media Fund / CMPA, *Animation Production Sustainability: A Case Study* (Jan 2024). https://cmpa.ca/wp-content/uploads/2024/01/Animation-Production-Sustainability_A-Case-Study.pdf
30. Framestore sustainability page. https://www.framestore.com/sustainability

**Secondary**
31. TIME, "Film and TV's Carbon Footprint Is Too Big to Ignore" (2024). https://time.com/6767943/sustainable-film-and-tv-production/
32. TVBEurope, "albert: average emissions per hour of content up by 33 per cent in 2023." https://www.tvbeurope.com/sustainability/albert-average-emissions-per-hour-of-content-up-by-33-per-cent-in-2023
33. TVBEurope, "albert: Average hour of TV contributes 5.7t CO2e per hour" (2021 data). https://www.tvbeurope.com/production-post/albert-average-hour-of-tv-contributes-5-7t-co2e-per-hour
34. Televisual, "New figures released on TV production's environmental impact" (2019 data). https://www.televisual.com/news/new-figures-released-on-tv-productions-environmental-impact/
35. Wikipedia, *Avatar: The Way of Water* (3.3 billion thread hours). https://en.wikipedia.org/wiki/Avatar:_The_Way_of_Water
36. Generator Source, diesel generator fuel consumption chart. https://www.generatorsource.com/Diesel_Fuel_Consumption.aspx
37. Variety (2021) on the SPA report. https://variety.com/2021/film/news/sustainable-production-alliance-carbon-emissions-report-1234942580/
