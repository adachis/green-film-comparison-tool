# Stream D2: VFX and render energy, virtual production, small-scale footprints, production water, and blockbuster checks (second pass)

Research date: 2026-09-25. This pass fills the gaps listed in `D_production_carbon.md` §4.2 and does not repeat that file's benchmarks (SEA/SPA, albert, Carbon'Clap, AdGreen, DESNZ factors). Working files, including downloaded PDFs, OCR output and search logs, are in `research/D2/`. The arithmetic for every DERIVED value is in `research/D2/calc_d2.py`, so it can be re-run.

**Conventions.** Same as file D:
- "t" means metric tonnes CO2e.
- **P** marks a primary source (the data owner or the publisher of the measurement). **S** marks a secondary source (press, a third party, or Wikipedia).
- Confidence is **H**, **M** or **L**.
- **DERIVED** marks a value I computed. The formula is shown.
- **ASSUMPTION** marks a parameter that no source provides.
- Source numbers in square brackets [n] refer to the list in §8, where every URL is given. All sources were accessed on 2026-09-25.

**Grid factors used for DERIVED CO2e.** These are Ember/OWID lifecycle intensities, as recommended in A2 [72], in kg CO2e per kWh:

| Grid | Factor | Year |
|---|---|---|
| Australia | 0.578 | 2022 |
| Australia | 0.554 | 2024 |
| New Zealand | 0.103 | 2022 |
| New Zealand | 0.112 | 2024 |
| UK | 0.217 | 2024 |
| USA | 0.384 | 2024 |
| Canada | 0.185 | 2024 |
| India | 0.705 | 2024 |
| Malta | 0.489 | 2024 |
| Belgium | 0.127 | 2024 |
| France | 0.040 | 2024 |
| LADWP (utility, from A2) | 0.229 | 2024 |
| UK, DESNZ 2025 generation factor (from file D) | 0.177 | 2025 |

---

## 1. Summary

1. **Weta's "3.3 billion thread-hours" for *Avatar: The Way of Water* is verified from AWS and Weta sources, with one nuance.**
   - AWS's own blog says "the team ran 3.3 billion thread hours **on AWS** in the following eight months", after a 14-month set-up [1, 2]. Weta's executive VFX producer David Conley said "close to 3.3 billion thread hours … in the span of eight months we produced nearly three times our annual output" [4].
   - So the figure is the **cloud portion**, and the film's true total is at least that. Wikipedia presents it as the total [73].
   - Weta's own page gives the per-shot extremes [3]:
     - 3,240 VFX shots, of which 2,225 were water shots
     - 18.5 PB of data stored
     - the longest single shot took **13.6 million thread-hours**
     - the five heaviest shots took **51.6 million** combined
   - Newer Weta totals:
     - ***Avatar: Fire and Ash*** (2025): **1,248,087,308 render-hours for 3,132 shots** (176.25 VFX minutes) on AMD EPYC [7, 8].
     - ***Kingdom of the Planet of the Apes*** (2024): **946 million thread-hours** for more than 1,500 shots [6].

2. **Energy per thread-hour is the key conversion, and it is now sourced rather than assumed.**
   - Cloud Carbon Footprint puts AWS at 0.74–3.5 W per vCPU (average across instance types), plus 0.392 W per GB of memory, with a PUE of 1.135 [29].
   - Boavizta gives 3.9–7.5 W per vCPU at 100% load for AWS c5, c6a, c6i and c7i instances [30].
   - Together these give **≈2.5 (low), 5.5 (central) and 8.5 (high) Wh per thread-hour, including PUE** (DERIVED; see §2.4).
   - On that basis, *Avatar 2*'s AWS portion was **≈8–28 GWh, central ≈18 GWh**, or **≈2.6–8.7 MWh per shot**. On the Australian grid (AWS Sydney) that is **≈4,800–16,200 t CO2e location-based, central ≈10,500 t**. This is more than three typical tentpole *production* footprints (file D: ≈2,400–3,000 t).
   - *Fire and Ash* comes to **≈3.1–10.6 GWh**, or **≈1.0–3.4 MWh per shot**. All figures here are DERIVED.

3. **VFX facility energy is disclosed after all, in UK statutory SECR filings, which I OCR'd from Companies House.** These are primary sources (P, H).

   | Company | Year | Energy | Emissions | Turnover |
   |---|---|---|---|---|
   | DNEG (Double Negative Ltd) | FY2022-23 | 11.3 GWh electricity + 1.25 GWh gas | 2,410 t | not usable (the entity books little revenue) |
   | DNEG | FY2023-24 | 10.1 GWh electricity | 2,287 t | not usable |
   | DNEG | FY2024-25 | 9.0 GWh electricity | 2,234 t | not usable |
   | Framestore | 2024 | 8.26 GWh | 1,585 t | £130.5M |
   | ILM London | FY2025 | 6.61 GWh | 1,181 t | £94.3M (≈726 staff) |
   | Technicolor Creative Studios UK (MPC and The Mill London) | 2023 | 3.98 GWh | – | – |
   | Technicolor Creative Studios UK | 2022 | 5.06 GWh | – | – |

   - DNEG's filing states that "its most significant energy consuming activities are the **render farms**" [31].
   - DERIVED intensity: **≈41–70 kWh per £1,000 of VFX revenue**, and **≈9,100 kWh per employee per year (≈41 kWh per employee-day)** at ILM London.
   - Technicolor's 2021 CDP return puts its production-services Scope 2 at **15,526 t** and its **external data centres (cloud) at 11,447 t** (a spend-based estimate) [35].

4. **Proposed per-shot energy** (§2.8). Multiply by the render and facility grid factor to get CO2e.

   | Tier | Energy per shot | Range | Basis |
   |---|---|---|---|
   | **Low**: simple 2D or cleanup shot for TV or commercials | **≈0.15 MWh** | 0.08–0.25 | Facility intensity |
   | **Central**: typical feature or HETV shot with CG | **≈1.5 MWh** | 0.8–3.5 | Facility intensity |
   | **High**: tentpole full-CG or simulation shot | **≈5 MWh** | 2–9 | Weta compute totals |
   | Extreme hero shots | **26–116 MWh** | | Weta's heaviest shots |

   - Per finished VFX minute:
     - tentpole: **18–146 MWh**
     - a 2014-era animated feature: **13–29 MWh**
     - a mid-scale photoreal show (*The Walk*): **1.5–3 MWh**, compute only

5. **Virtual production now has measured energy data.**
   - **Sony Pictures and ICF measured a real 6-day LED-volume production** (2,400 panels on a 7,752 sq ft stage) in September 2022 [41, 42]:

     | Component | kWh |
     |---|---|
     | LED array | 7,371 |
     | On-set rendering | 4,467 |
     | Stage power and AC | 2,896 |
     | Render-room AC | 1,243 |
     | **Total** | **15,977** |

     That is **≈2,660 kWh per production day**, or ≈8,000 kWh per shoot day if prep and wrap are allocated to the shoot days. The measured total was **209% higher** than ICF's spec-based estimate.
   - Specs:
     - LED panels average **58 W per panel** (Sony) and **80–95 W per 0.25 m² ROE BP2V2 panel**, which is **320–380 W/m² average and 640–760 W/m² maximum** [47].
     - Render and compute draw **25.6 kW in use and 11 kW idle** [41].
   - Case studies:
     - *Iron Flower*: 1,387 kWh for 2 shoot days plus 3 prep days [44].
     - Ulster: a 210-panel volume at **35 kW** (modelled) [45].
     - UCLA's LCA of *The Mandalorian*: 1,586 BP2 plus 906 CB5 panels, **≈377 kW of LED** [43].
   - **Proposed per-day model:**

     | Scale | kWh per production day |
     |---|---|
     | Low: small volume | ≈300–700 |
     | Central | ≈2,700 |
     | High: Mandalorian-scale | ≈6,000–8,000 |

   - VP's footprint reductions (52–99%) come almost entirely from **avoided travel, generators and set builds** [41–46].
   - **No LED-panel LCA or EPD exists**. The only embodied-carbon figure is a student proxy (≈295 kg per BP2 panel). This remains a gap.

6. **Small-scale and national-scheme data (new).**

   | Country / dataset | Result |
   |---|---|
   | **Austria**, 56 audited cinema films [49] | Features: median **561 kgCO2e per film minute**, **1,917 kg per shoot day**, 17.7 kg per €1,000. Documentaries: median 80 kg/min, 358 kg per shoot day |
   | **Germany**, 76 "green" productions [50] | Fiction films average **≈64 t** (range 12–148), ≈690 kg/min. Post-production is only ≈2% |
   | **Ireland**, 15 productions [52] | Seven features average **≈77 t** (range 8–129) |
   | **Canada**, 22 productions [53] | 280 t per production and 28 t per content-hour. **≈2 t per CA$100k of budget** (R² 0.87) |
   | **Canada**, Radio-Canada, 55 productions [54] | **2.1 t per hour** |
   | **EU**, European Commission 2021 [55] | Average European feature **192 t** (road 80, hotels 40, power 22, catering 15, sets 15, flights 12, post 1, waste 1; the listed items sum to 186 t) |
   | **Short-form shoots**, Earth Angel database of 73 US/Canada productions [44] | **35.7 t per one-day shoot**, flight-heavy (Vancouver subset: 10.2 t) |

   - **No dataset specific to music videos, YouTube creators or student films exists.**

7. **Water.**
   - Rain on a car set needs **500–800 L per minute (≈30–48 m³ per hour)** [57]. Standard rain trailers carry 1,000–2,000 L [58, 59].
   - Tank volumes:
     - Pinewood Underwater Stage: **1,200 m³**, heated to 30–32 °C [63]
     - Lites Brussels: **7,000 m³**, heated [64]
     - Baja (*Titanic*): **≈64,000 m³** (17 million gallons) [65]
     - Malta shallow tank: **≈20,000 m³** (DERIVED) [66]
     - *Avatar* tank: 120×60×30 ft. Disney says ">250,000 gallons" but the widely quoted figure is 900,000 gallons, and the two conflict [62].
   - Drinking water on the Flemish feature *Binti*: **2,102 L → 1.2 t, or 2% of the film's footprint** (LCA) [56].

8. **Blockbusters.** The claim that *The Amazing Spider-Man 2* had a footprint of "8,000+ t" is **still unverified**.
   - Sony, *The Hollywood Reporter*, Sustainable Brands, edie and a 2019 academic paper all describe the film only as "carbon-neutral" through Gold Standard cookstove offsets. None gives a tonnage [67–70].
   - No other individual blockbuster total was found. *Spider-Man: Brand New Day* (2026) reports only a **21.6% cut** in utility and fuel emissions [71].
   - Several AI-generated "statistics" sites (gitnux, worldmetrics, zipdo, wifitalents) circulate invented figures, for example that *Avengers: Endgame* emitted both "3,500 t" and "14.8 million kg". **Do not use them** [75].

---

## 2. VFX and render data

### 2.1 Film-level compute totals (all iterations included unless noted)

| Film (studio, year) | Metric as published | Shots / minutes | DERIVED intensity | Source | P/S | Conf. |
|---|---|---|---|---|---|---|
| ***Avatar: The Way of Water*** (Wētā FX, 2022) | **3.3 billion thread-hours "on AWS"** in 8 months, after a 14-month set-up. Peak of **>1 million vCPUs** (AWS's Nina Walsh). Weta averaged **≈500 iterations per shot**. 40% at 48 fps; 3D; 4K and 8K deliverables | 3,289 shots in the film; **3,240 by Weta**; 2,225 water shots; only 2 shots without VFX. Runtime 192 min | **≈1.02 million thread-hours per shot**. ≈17 million per runtime minute. ≈8,500 thread-hours per final frame if 40% is at 48 fps (≈11,900 if all at 24 fps). This matches an unsourced "8,000 thread-hours per frame" claim [74] | AWS blog 28 Feb 2023 [1]; AWS Mar 2023 [2]; Weta 30 Mar 2023 [3]; Spinoff 8 Dec 2022 [4]; TVBEurope 15 Dec 2022 [5] | P (AWS, Weta) | **H** for the value. M for "total vs AWS-only" (IMDb trivia says most rendering was in Weta's own data centre; unverified [74]) |
| Same film, per-shot extremes | **Longest single shot: 13.6 million threaded hours. Five heaviest shots: 51.6 million combined.** Data stored: **18.5 PB** (18.5 times *Avatar* 2009) | – | Top-5 average ≈10.3 million thread-hours per shot | Weta [3] | P | H |
| ***Avatar: Fire and Ash*** (Wētā FX, 2025) | **1,248,087,308 render-hours** ("142,000 years on a single processor"). Peak data **200–250 TB per day**; **140 PB** of disk. AMD EPYC servers | **3,132 shots**; **176.25 VFX minutes** of a 195-minute film | **≈398,500 render-hours per shot**. ≈7.1 million per VFX minute. ≈4,900 per final frame at 24 fps | befores & afters 24 Mar 2026 (AMD-sponsored) [7]; postPerspective 28 Jan 2026 [8] | S (quoting Weta) | H/M |
| ***Kingdom of the Planet of the Apes*** (Wētā FX, 2024) | **946 million thread-hours** "between the on-site render wall and cloud rendering" | **>1,500 VFX shots**; 33 minutes fully digital; 38 shots without VFX | **≤≈630,000 thread-hours per shot** | befores & afters 12 May 2024 [6] | S (Weta stat) | M |
| ***The Walk*** (Atomic Fiction, 2015) | **9.1 million core-hours** on Google Cloud (Conductor). Peak **>15,000 cores**. 2 million core-hours in the final month. A single frame iteration took 7 hours on a 16-core instance (≈112 core-hours) | **≈30 minutes** of photoreal environments delivered in 8 months | **≈300,000 core-hours per finished minute**. The studio's planning figure was "≈5,000 processor-hours per second of screen time" | Conductor / Google Cloud blog, Oct 2015 [24] | P | H |
| ***How to Train Your Dragon 2*** (DreamWorks, 2014) | **90 million render-hours**; 500,000 render jobs per day; >130,000 frames; 400 TB; 700 million files | 102 min | ≈690 render-hours per frame; ≈880,000 per minute | HP release via StorageReview 19 Jun 2014 [17] | S | M |
| ***Kung Fu Panda*** (2008) / ***Kung Fu Panda 2*** (2011) (DreamWorks) | **≈25 million** and **>55 million** render-hours. KFP2's final battle took **>7 million render-hours for 14,000 frames**. 50 TB and 100 TB of data | – | Final battle: **500 render-hours per frame** | Data Center Knowledge 11 Jul 2011 [16] | S (HP/DreamWorks) | M |
| ***Cars 2*** (Pixar, 2011) | Average **11.5 hours per frame**; ray-traced sequences **80–90 hours per frame**. The farm was tripled to **12,500 cores** (Dell blades) | – | – | DCK 2011 [16] | S | M |
| ***Monsters University*** (Pixar, 2013) | **≈29 hours per frame**, from supervising TD Sanjay Bakshi. The farm doubled to **2,000 machines and 24,000 cores**. Commonly cited as "100 million CPU hours", but not traced to a primary source | 104 min | ≈960,000 CPU-hours per minute, if the 100 million figure is right | GamesBeat 2013 [18]; Science Behind Pixar [19] | S | M (100 million: L) |
| ***Moana*** (Disney, 2016) | Frames with Te Kā lighting smoke were **projected at an average of 450 core-hours per frame** before a sampling fix | ≈100 shots affected | – | Burley et al., ACM TOG 2018 [15] | P (peer-reviewed) | H |
| ***Big Hero 6*** (Disney, 2014) | Farm of **55,000 Intel cores** at 4 sites; **400 TB of RAM**; **≈1.5 MW**; **1.1 million render-hours per day**; queue >90% utilised | – | **≈32.7 Wh per render-hour at facility level** (1.5 MW ÷ 45,833 render-hours per hour). ≈13 GWh per year if run continuously | Electronic Design Oct 2014 [13]; fxguide Oct 2014 [14]; Guinness [23] | S (Disney's Hank Driskill quoted) | M |
| ***Frozen*** (2013) / ***Frozen 2*** (2019) | *Frozen*: "30 hours to render each frame, with 4,000 computers". *Frozen 2*: "hundreds of CPU hours to render a single frame with volumetric effects" | – | – | Wikipedia citing *Animation Magazine* [21]; arXiv 2005.12518 [28] | S | L |
| ***Elemental*** (Pixar, 2023) | **151,000 cores** used across three rooms at Pixar. For context: *Toy Story* 294 cores, *Monsters, Inc.* 672, *Finding Nemo* 923 | – | – | Wikipedia citing press-conference coverage (Apr 2023) [20] | S | L–M |
| ***Toy Story*** (1995) | 800,000 machine-hours on 117 computers; 114,240 frames | 77 min | ≈10,400 machine-hours per minute | Secondary web sources (search snippets) | S | L |
| ***Dune*** (DNEG, 2021) | The CG desert mouse rendered at **"30+ hours per frame at final quality"**. DNEG did ≈1,200 of the 1,700 shots | – | – | DNEG social post [25]; SIGGRAPH 2022 CAF [26] | P | M |
| ***The Lion King*** (MPC, 2019) | **1,490 shots**; 1,250 artists; "a single computer would need to render for **2,389 years**". A secondary source says "77 million hours" | – | 2,389 years × 8,766 h ≈ **20.9 million machine-hours** (DERIVED). The 77 million figure is unverified and may be core-hours | MPC site and LinkedIn [27]; AnimationXpress (S) | P / S | M / L |
| *Spider-Verse* (Imageworks) | No reliable render-hour figure found. Social-media claims ("a week per second", "18 hours per frame") are unsourced | – | – | – | – | GAP |

**Caveats.**
- The units are not like for like. Weta's figures are "thread-hours", or processor-hours in the *Fire and Ash* statement. DreamWorks' are "render-hours", probably core-hours. Pixar's are hours per frame on one machine.
- Hardware efficiency per core-hour improved roughly 5–10 times between 2011 and 2025, so per-hour energy factors must be tied to the era (§2.4).
- *Fire and Ash* (1.25 billion hours) is lower than *The Way of Water* (≥3.3 billion) even though the shot counts are similar. The likely reasons are the AMD multithreading efficiency that Weta's CTO cites [7], and perhaps different accounting (AWS thread-hours including simulations and iterations, against "hours to render the final shots"). Treat the two as a range, not a trend.

### 2.2 Render farm sizes and power (studio disclosures)

| Studio / farm | Value | Source | P/S | Conf. |
|---|---|---|---|---|
| Weta Digital, 2008–09 (*Avatar*) | 10,000 sq ft data centre; **>4,000 HP BL2x220c blades** (≈40,000 processors); **104 TB RAM**; Top500 ranks 193–197; **35 water-cooled Rittal racks rated up to 30 kW each** (≤≈1.05 MW of rack cooling capacity, DERIVED); free cooling whenever it is ≤15 °C outside; cooling costs **40% below** an equivalent standard build | Rittal case study [10]; DCK 22 Dec 2009 [11]; HP release [12] | P (vendor) / S | M |
| Wētā FX, 2020–22 | Its Miramar data centre ("one of the largest in the Southern Hemisphere") ran out of capacity. Expanding it locally was rejected, so Weta **burst to AWS** (the Australian region, with Singapore on standby) | Spinoff [4]; AWS [1] | S / P | H |
| Disney Animation, 2014 | **55,000 cores, 1.5 MW**, 4 sites; 1U commodity servers; SSD storage; 4 PB archive | [13, 14] | S | M |
| Pixar | 2011: 12,500 cores. 2013: 24,000 cores on 2,000 machines. 2023: 151,000 cores | [16, 19, 20] | S | M / L |
| DreamWorks | The data centre was "at capacity for real estate, power and cooling", so it moved to liquid-cooled Lenovo Neptune (+20% performance) | Lenovo case study (search snippet) | P (vendor) | L |
| Fox Renderfarm (cloud) | **30,000+ physical servers**; "green data centre" powered by wind and hydro; **PUE under 1.2** (self-declared) | [38] | P (claim) | L |
| Ranch Computing (France) | "Electricity from 100% renewable sources": the supplier commits to injecting renewable energy equal to consumption (a market-based tariff) | [39] | P (claim) | L |

### 2.3 VFX facility energy (statutory and CDP disclosures, new)

All the UK figures come from **SECR** sections of the directors' reports, OCR'd from the Companies House scans [31–34]. "Location-based" means Scope 2 before REGOs.

| Company (entity) | Period | Energy | GHG | Intensity (DERIVED) | Notes |
|---|---|---|---|---|---|
| **Double Negative Ltd (DNEG London)** [31] | FY to 31 Mar 2023 | Electricity **11,286,143 kWh**; gas 1,254,224 kWh | Scope 1: 228 t. Scope 2: 2,182.5 t | – | "The Company recognises that its most significant energy consuming activities are the **render farms** … computing power within desk computers and data centres" |
| same | FY to 31 Mar 2024 | Electricity **10,079,170 kWh**; gas 1,094,316 kWh (total 11,173,486) | 200 + 2,087 = **2,287 t** | The per-$ turnover figure is not meaningful (the entity's turnover is only $54.2M) | – |
| same | FY to 31 Mar 2025 | Electricity **9,046,723 kWh**; gas 1,971,039 kWh (total 11,017,762) | 361 + 1,873 = **2,234 t** | – | New render-farm servers installed; some equipment may move to other global sites |
| **The Framestore Ltd** [32] | 2024 | Electricity **6,587,488 kWh**; gas 1,152,600 kWh; vehicles 35,498 kWh (total **8,256,468 kWh**) | Gross **1,585 t** (Scope 2: 1,331 t location-based; market-based 0 through EDF REGOs) | **63.3 kWh per £1,000** of turnover (£130.46M) | 2023: 7,854,025 kWh; 1,622 t; 63.7 kWh per £1,000 |
| **Industrial Light & Magic (UK) Ltd** [33] | FY to 27 Sep 2025 | **6,607,699 kWh** | **1,181 t** location-based (768 t market-based) | **70.1 kWh per £1,000** (£94.3M). ≈726 staff (1,181 t ÷ 1.6268 t per head) → **≈9,100 kWh per employee per year**, or ≈41 kWh per employee-day | FY2024: 6,167,395 kWh; 1,280 t; 67.3 kWh per £1,000. ILM notes that "one of our **data centre suppliers**" changed tariff, so colocated render electricity is inside Scope 2 |
| **Technicolor Creative Studios UK Ltd (MPC and The Mill London)** [34] | 2023 | **3,978,359 kWh** (2022: 5,057,188) | Scope 2 reported as 0 (market-based) | **45.7 kWh per £1,000** (£87.1M). 2022: 41.0 | Revenue fell 29% (the strikes) |
| **Technicolor SA, group (CDP 2022, FY2021 data)** [35] | 2021 | Electricity: India **15,688 MWh**; UK **7,484**; Australia **7,002**; Canada **6,682**; France 4,001. The country totals mix divisions | **Production Services** (MPC, The Mill, Mikros, post) Scope 2 location-based **15,526 t**; Scope 1: 49 t. **"Energy consumed by external data centers": 11,447 t** (a spend-based estimate filed under Scope 3 category 3) | – | Shows that **cloud rendering can match the on-site footprint** |

Cinesite VFX Ltd, Untold Studios, Jellyfish (Valentia Realisations), One of Us and Blue Zoo: I found no SECR energy table in the pages I scanned. Untold is cloud-native on AWS, so its render energy would be Scope 3.

### 2.4 Energy per thread-hour or core-hour (conversion factors)

| Parameter | Value | Source | Notes |
|---|---|---|---|
| CCF: AWS average per vCPU | min **0.74 W**, max **3.5 W**. GCP median 0.71–4.26 W. Azure 0.78–3.76 W | CCF methodology [29] | Derived from SPECpower. Average watts = min + utilisation × (max − min) |
| CCF by microarchitecture (max W per vCPU) | Skylake 4.10; Cascade Lake 4.06; Ice Lake 3.76; Sapphire Rapids 4.16; Haswell 5.60; EPYC 2nd gen 1.69; EPYC 3rd gen 1.96; EPYC 4th gen 2.28 | CCF coefficients CSV [29] | P (method); H |
| CCF memory; PUE | **0.392 W per GB**. PUE: AWS 1.135; GCP 1.1; Azure 1.185 | [29] | – |
| Boavizta, whole instance at 100% load | c5.24xlarge **724 W** / 96 vCPU = **7.5 W per vCPU**. c6i.32xlarge 911 W / 128 = 7.1. **c6a.48xlarge (EPYC) 756 W / 192 = 3.9**. c7i.48xlarge 1,190 W / 192 = 6.2. r5.24xlarge 942 W / 96 = 9.8 (768 GB RAM) | Boavizta API v1 [30] | P (model); M. PUE not included |
| **Adopted factor, including PUE (DERIVED)** | **Low 2.5 Wh**: EPYC-class, ≈2 GB per thread, 80–100% utilisation, PUE ≈1.1. **Central 5.5 Wh**: CCF AWS 3.5 W + 4 GB × 0.392 = 5.07 W × 1.135 ≈ 5.75, rounded. **High 8.5 Wh**: Boavizta c5, 7.5 W × 1.135 | – | Applies to 2020s hardware |
| Facility-level check, 2014 | Disney: **32.7 Wh per render-hour** (1.5 MW ÷ (1.1 million render-hours per day ÷ 24)) | [13, 14] | Use **15–33 Wh per core-hour for 2011–2015 hardware** (ASSUMPTION band anchored on Disney) |
| Illustrative figure that should be corrected | *"British Film Institute calculates that a 90-minute film can consume 100,000 kWh"* (hahsoftware) is a mis-attribution of the CMPA/Earth Angel illustration (130,000 frames × 3 h × 270 W; see file D). That illustration assumes only 3 hours per frame. Published studio figures are roughly 12–690 render-hours per frame, including iterations | [76]; file D | Do not use the 100,000 kWh figure as a benchmark |

**DERIVED film energy and CO2e.** The calculation is thread-hours × Wh per thread-hour, then × grid factor. See `calc_d2.py`.

| Film | Energy: low / central / high | Per shot | Per VFX or runtime minute | CO2e (location-based) |
|---|---|---|---|---|
| *Avatar 2*, AWS portion (3.3 billion) | 8.3 / **18.2** / 28.1 GWh | 2.6 / **5.6** / 8.7 MWh | 43 / **95** / 146 MWh per runtime minute | Australian grid (0.578): 4,770 / **10,490** / 16,210 t. If run on the NZ grid (0.103): 850 / 1,870 / 2,890 t. AWS's market-based claims (renewable matching) would be far lower; this is not verified |
| *Avatar 2*, heaviest shot (13.6 million) | 34 / **75** / 116 MWh | – | – | Australia: 20 / 43 / 67 t |
| *Fire and Ash* (1.248 billion) | 3.1 / **6.9** / 10.6 GWh | 1.0 / **2.2** / 3.4 MWh | 18 / **39** / 60 MWh per VFX minute | NZ grid (0.112): 350 / **770** / 1,190 t. Australia: 1,730–5,880 t |
| *Kingdom* (946 million) | 2.4 / **5.2** / 8.0 GWh | 1.6 / **3.5** / 5.4 MWh | – | NZ: 265 / **583** / 901 t |
| *The Walk* (9.1 million core-hours, 2015, GCP) | 46 / **72** / 91 MWh at 5 / 7.9 / 10 Wh per core-hour | – | **1.5 / 2.4 / 3.0 MWh per finished minute** | US grid: 17–35 t |
| *HTTYD2* (90 million render-hours, 2014) | 1.35 / **2.25** / 2.94 GWh at 15 / 25 / 32.7 Wh | – | **13 / 22 / 29 MWh per minute** | US grid (0.384): 520 / **860** / 1,130 t |
| *Monsters University* (100 million, secondary) | 1.5 / 2.5 / 3.3 GWh | – | 14 / 24 / 31 MWh per minute | – |

### 2.5 Simulation compute (Houdini-class FX)

No core-hour figures were published for individual pyro, destruction or FLIP simulations. The quantitative statements I found are these:

| Item | Value | Source | P/S | Conf. |
|---|---|---|---|---|
| *Avatar 2* water simulations | Water effects in **2,225 shots**, "some taking **up to eight days of simulation**". Thin-film and drip simulations at sub-millimetre scale "would often take days to compute" | Unity / Weta blog (2023) [9] | P | M |
| *Fire and Ash* fire (Kora solver) | Low-resolution simulations take "a couple of hours"; high-resolution simulations run **overnight**; MPI across multiple machines for the largest events (factory-ship explosion, 300 m fire tornado); otherwise a single high-memory machine. Wardrobe simulations "running for **24 hours** on the render farm" | befores & afters [7] | S (Weta quotes) | M |
| Houdini forums | FLIP with tens of millions of particles can need >100 GB of RAM. There are no production core-hour logs | iRender, SideFX forum (search snippets) | S | L |

- DERIVED order of magnitude: one overnight high-resolution simulation on a single 128–192-thread node is ≈12 h × 128–192 threads ≈ **1,500–2,300 thread-hours per simulation pass**. This is an ASSUMPTION built on the durations above.
- Tens of iterations per shot put simulations at **tens of thousands of thread-hours per sim-heavy shot**. That is small next to Weta's 0.4–1 million thread-hours per shot for rendering.

### 2.6 Cloud rendering and green claims

- **AWS:** there is no AWS Deadline Cloud carbon disclosure specific to rendering. The Weta case (§2.1) is the only large quantified cloud-render case. Technicolor's CDP puts external data-centre energy at 11,447 t (2021), comparable to the group's in-house production Scope 2 [35].
- **Google Cloud / Conductor:** *The Walk*'s 9.1 million core-hours [24]. Google publishes carbon-free-energy percentages by region, which could supply the grid factor (not retrieved here).
- **Fox Renderfarm:** claims wind and hydro power and a PUE under 1.2 [38].
- **Ranch Computing:** a 100% renewable tariff [39].
- **GarageFarm:** qualitative only. It notes that an RTX 4090 draws up to 450 W, and cites Masanet et al. (2020): server workloads grew 550% while their energy grew 6% between 2010 and 2018 [40].
- All three render-farm companies make self-declared, market-based claims. None publishes kWh per render-hour.

### 2.7 Other and academic sources

- **Ecoprod *Green Animation Guide* (June 2025)** [36]:
  - Real-time 3D can cut rendering energy by ">90%" on some projects.
  - Nexus Studios' internal case study saved ">80% of the projected rendering energy".
  - A "2022 Carbon Trust study" put rendering at **30–45% of the digital energy footprint** of a 3D animation workflow. The original study was not located.
  - Manufacturing a desktop computer: **≈262 kgCO2e**. A high-end GPU: **300–500 kgCO2e** before first use.
  - France's Cartouch'Verte network: a 2D workstation without a GPU emits **90 rather than 190 kgCO2e per year**, and one 3D series delivered 15 TB of assets but stored 107 TB.
  - AnimFrance's **Carbulator**, an animation-specific calculator, exists, but I found no published aggregate results.
  - Evidence type: P/S; confidence M–L.
- **Blender Cycles, student measurement (TU Delft, 2025)** [37]:
  - The Donut benchmark scene used **4.0–5.1 kJ per render on CPU and 0.41–0.96 kJ on GPU** (1.1–1.4 Wh against 0.11–0.27 Wh). That is **81–90% less energy on GPU**.
  - Measured with EnergiBridge (component-level power, not the wall socket).
  - Evidence type: P, but a student project; confidence L.
- **SIGGRAPH 2025 talk** "Towards a sustainable use of GPUs in Graphics Research" and sustainable.graphics: these cover graphics research, not production rendering. No production data.
- **"Green AI in VFX and Rendering…"** (ResearchGate, March 2026): not reviewed. Its abstract is qualitative.

### 2.8 Proposed per-shot energy model

**Structure.** Use two independent estimators, then reconcile them:

```
(A) Top-down (facility-inclusive):
    E_shot = shot_cost_GBP/1000 × I_fac
    I_fac = 41–70 kWh per £1,000 of VFX revenue (UK SECR 2022–25: TCS 41–46, Framestore 63–64, ILM 67–70)
  or
    E_shot = artist_days × 41 kWh   (ILM UK: 9,100 kWh per employee-year ÷ 220 days)

(B) Bottom-up (compute):
    E_shot = TH_shot × w
    w = 2.5 / 5.5 / 8.5 Wh per thread-hour (2020s, including PUE); 15–33 Wh per core-hour (2011–15)
    TH_shot comes from studio totals (Weta: 0.40–1.02 million per shot)

CO2e_shot = E_shot × EF_grid(render location)   (use market-based only where contracts are verified)
```

- Approach (A) covers everything a facility draws: the render farm, workstations, HVAC and offices. It also covers all iterations and R&D.
- It misses **cloud bursting and offshore work**. Technicolor's external data centres roughly **doubled** its production Scope 2 in 2021.
- Approach (B) covers compute only.

| Tier | Typical content | Inputs | (A) facility-based | (B) compute-based | **Proposed energy per shot** | Confidence |
|---|---|---|---|---|---|---|
| **Low** | 2D compositing, cleanup, screen replacement or matte extension in TV, commercials or music video | Cost ≈£2–5k; 2–5 artist-days; render 1,000–5,000 thread-hours (ASSUMPTION) | £3k × 41–70 = **0.12–0.21 MWh**. 2–5 days × 41 kWh = **0.08–0.21 MWh** | 1,000–5,000 × 5.5 Wh = 0.006–0.03 MWh (compute is minor) | **≈0.15 MWh (0.08–0.25)** | M–L |
| **Central** | A typical feature or HETV shot with CG elements, set extension or creature, from a mid-to-large vendor | Cost ≈£15–50k; 20–60 artist-days | £25k → **1.0–1.75 MWh**. £50k → 2.05–3.5 MWh. 20–60 days → **0.8–2.5 MWh** | *The Walk*: 5,000 core-hours per second × a ≈5 s shot ≈ 25,000 core-hours → 0.1–0.25 MWh. Compute alone looks like only ~10–20% of facility energy for this tier; the rest is iterations, artists, storage and HVAC (my inference, not measured) | **≈1.5 MWh (0.8–3.5)** | M |
| **High** | A tentpole full-CG or simulation-heavy shot (Weta *Avatar* or *Apes* class) | 0.40–1.02 million thread-hours per shot (Weta's per-film totals ÷ shots) | £100k → 4.1–7.0 MWh | 0.4 million × 2.5 = **1.0 MWh** up to 1.02 million × 8.5 = **8.7 MWh**. Central: *Fire and Ash* 2.2 MWh; *Avatar 2* (AWS) 5.6 MWh | **≈5 MWh (2–9)**, plus facility overhead | M |
| **Extreme** | Hero shots | Weta: top-5 average 10.3 million; maximum 13.6 million thread-hours | – | **26–88 MWh** (top-5 average); **34–116 MWh** (maximum) | Use only for sensitivity analysis | M |

**Per finished minute of VFX** (useful for comparing against GenAI per-second output):
- Tentpole: **18–146 MWh per minute**. The central range is ≈40–95 (*Fire and Ash*, *Avatar 2*, *Kingdom*).
- 2011–14 animated feature: **9–31 MWh per minute** (*KFP2*, *HTTYD2*, *MU*).
- Mid-scale photoreal environment work, 2015: **1.5–3 MWh per minute**, compute only (*The Walk*).
- Typical shots per VFX minute ≈ **18** (*Fire and Ash*: 3,132 shots ÷ 176 min), so the facility-based central tier gives about **27 MWh per fully-VFX minute** (18 × 1.5).

**Worked CO2e examples (DERIVED):**
- Central shot, 1.5 MWh, rendered in London: × 0.177 = **≈270 kg**; with the Ember lifecycle factor 0.217, **≈330 kg**.
- The same shot in Bangalore: × 0.705 = **≈1.06 t**.
- In Wellington: × 0.112 = **≈170 kg**.
- In Montréal: Hydro-Québec's factor was not retrieved, but it is very low.
- A *Fire and Ash*-class shot, 2.2 MWh on the NZ grid: **≈245 kg**. The same work on AWS Sydney location-based: **≈1.3 t**.

---

## 3. Virtual production (LED volumes)

### 3.1 Measured and modelled energy

| Case | Scale | Energy | Scope and notes | Source | P/S | Conf. |
|---|---|---|---|---|---|---|
| **Sony Pictures VP stage, Sept 2022 (measured)** | 2,400 LED panels; 7,752 sq ft stage; 6-day production | **LED array 7,371 kWh; rendering ("Bubble Room") 4,467 kWh; Stage 7 shooting power and AC 2,896 kWh; render-room AC 1,243 kWh; total 15,977 kWh** | The measurement came out **+209%** above ICF's spec-based estimate (5,165 kWh). DERIVED: **≈2,663 kWh per production day** (LED ≈1,229; render ≈745; stage ≈483; render AC ≈207), or ≈7,990 kWh per shoot day if all energy is allocated to 2 shoot days. On LADWP's grid (0.229): **≈610 kg CO2e per production day** | ICF for SPE, revised analysis, H1 2023 [42] | P | **H** (measured) |
| Sony / ICF specs used in the original estimate | 2,400 panels | LED **58 W average per panel in use; 0.1 W on standby**. Render nodes, compute, display signalling and networking: **25.6 kW in use, 11 kW idle**. Panels on 70% of prep hours, 100% of shoot hours, 0% of wrap hours | DERIVED: 139.2 kW LED + 25.6 kW = **164.8 kW** in use, or ≈1,980 kWh per 12-hour day. The reconstruction matches ICF's 7,650.8 kWh for the Production A scenario | ICF memo, Aug 2022 [41] | P | H |
| **UCLA IoES LCA (for SPA), *The Mandalorian* S1E6 scene** | **1,586 ROE BP2 + 906 ROE CB5** panels; 36 h VP against 48 h conventional | ROE average power: **BP2 95 W, CB5 250 W** → **≈377 kW of LED** (DERIVED). 7 PCs at 0.8 kW (the report says "0.8 kWh per computer", which I read as per hour). HVAC (scaled from a residential AC unit) **≈135 kW** (DERIVED) | LED emissions of 1,547 kg per scene-minute include amortised embodied carbon (§3.4). My reconstruction: operational 632 kg/min plus embodied ≈915 kg/min. Grid factor 0.252 kg/kWh (PEAR, LA). For a 12-hour day: **≈4,530 kWh LED + ≈1,620 kWh HVAC + 67 kWh PCs ≈ 6,200 kWh** (DERIVED) | UCLA practicum report, June 2023 [43] | P (student LCA) | M–L |
| UCLA: *How I Met Your Father* and *The Old Man* scenes | 701 BP2 + 200 CB5 (≈117 kW); 301 BP2 + 100 CB5 (≈54 kW) | VP against conventional: **561 vs 6,338 kg per scene-minute (9%)**; **279 vs 1,420 (19.6%)**. For *The Mandalorian*: **5,714 vs 26,498 kg/min (22%)** | Travel, and for *The Mandalorian* the materials (a physical hangar set: 141.9 t against 21.3 t for VP), drive the difference | [43] | P (student) | M–L |
| ***Iron Flower*** (Versatile Media, Burnaby BC; one of the world's largest LED stages) | 2 shoot days plus 3 prep days of LED calibration | **1,387 kWh** in total. Excludes the game-engine computers used to create the environments | ≈277 kWh per day averaged; ≈694 kWh per shoot day (DERIVED). **0.326 t in total** (BC grid near zero) | Earth Angel for Trembling Void, 2024 [44] | P | H/M |
| **Ulster University VP studio** (Belfast; a **210-panel** volume costing £1.6M) | Short film *A Thing Called Joy* / *The Joy of Nothing*; £80k budget; 4-day shoot; 15 cast and crew | "Equipment uses **35 kW** (LED wall plus additional equipment), 10 h per day for 6 days → **2,100 kWh**". Post: 25 kW × 8 h × 9 days = 1,800 kWh | Modelled. The authors used 0.5 kg/kWh. The total came to **3.87 t**. They claim VP cuts carbon by **20–50%** and time-and-motion studies show **10–30%** shorter shoots | Future Observatory / Ulster, Nov 2023 [45] | P (modelled) | M–L |
| AdGreen 2025 (file D) | 251 VP studio days | ≈79 kg per VP day → ≈450 kWh per day if the UK grid is 0.177 (DERIVED) | Scope unclear | file D | P / DERIVED | L |

### 3.2 Component specifications

| Component | Value | Source | Conf. |
|---|---|---|---|
| **ROE Black Pearl BP2V2** (2.84 mm; the *Mandalorian* and *1899* class panel) | 500 × 500 × 90 mm; **9.35 kg** (37.4 kg/m²). Power max/average: **190/95 W** (2024 brochure), i.e. **760/380 W/m²**; **160/80 W** in the 2021 brochure (640/320 W/m²). BTU max/average 630/300 | ROE brochures, Feb 2024 and Jan 2021 [47] | P, H |
| ROE Ruby 2.6 | 500 × 500 × 73 mm; 8.5 kg; **160/80 W** (640/320 W/m²) | ROE, Jan 2024 [47] | P, H |
| ROE CB5 | **250 W average** (as used by UCLA) | [43] | P (student citing ROE); M |
| Sony (panel model not named) | **58 W average; 0.1 W standby** | [41] | P; M |
| Generic indoor LED guidance | 150–400 W/m² at maximum brightness; 100–200 W/m² for typical content. Barco bases "typical" power on ≈70% brightness | ShowTech glossary; Barco (search snippets) | S; L |
| Render and compute | **25.6 kW in use and 11 kW idle** for a 2,400-panel volume (Sony) [41]. **0.8 kW per PC**, 7 PCs (UCLA). One university volume used 2 render nodes, each a Threadripper 7975WX with 1–3 RTX 6000 Ada cards (Epic forum) | [41, 43] | P; M |
| HVAC | Sony measured **483 kWh per day of stage power and AC plus 207 kWh per day of render-room AC** [42]. UCLA-scaled HVAC ≈61 kW (small scene) to 135 kW (*The Mandalorian*) [43] | – | M / L |
| LED processors (Brompton SX40, Megapixel Helios) | Datasheet power not retrieved (the download failed). Likely small, at the scale of one 2U server per ≈9 million pixels | – | GAP |

### 3.3 Comparative footprint studies (all show large reductions, driven by travel)

| Study | Result | Driver | Source |
|---|---|---|---|
| Sony / ICF, two 1-hour dramas (Production A: BC campus, 1 day, 133 people. Production B: UK stables, 11 days, 117 people) | Revised: **A 3.09 → 0.73 t (−76%)**; **B 16.47 → 7.87 t (−52%)**. With renewable electricity, 0.55 t and 1.96 t (−82% and −88%). Per shoot day (original, unrevised analysis): A 3.09 → 0.31 t; B 8.24 → 2.00 t | Vehicles and hotels on location. The **LED array was the largest VP source** | [41, 42] P, H |
| Quite Brilliant, Garden Studios London (a 2021 ad; 10 scenes) | **VP 2 days = 0.74 t against a hypothetical location version (5 days, including an overseas day) = 94.82 t**, using the albert/AdGreen calculator | Travel >90% of the location total; <25% of VP | LBBOnline 2021 [46] (company claim) M–L |
| *Iron Flower* (2024) | **0.326 t** against an Earth Angel short-form average of **35.68 t per one-day shoot** (Vancouver average 10.2 t) | No air travel; no generators; 89 L of truck diesel | [44] P, M |
| UCLA (2023) | VP at **9–22%** of conventional per scene-minute | Air travel (scenario 1), generators, set materials | [43] P (student) |
| Ulster (2023) | 20–50% savings claimed, especially for productions with ≥30% VP | Travel | [45] P, L–M |

**Claims about *The Mandalorian* / StageCraft.** I found no ILM or Disney disclosure of energy or carbon for StageCraft. The only quantified analysis is the UCLA student LCA of one S1E6 scene [43]. The ACM paper on StageCraft 2.0's hardware was not accessible (ACM is blocked). ARRI Stage London, Pixomondo, NEP Virtual Studios, Dimension, and Dark Bay/*1899* publish **no energy or carbon figures** that I could find. The Dark Bay pages give only technology descriptions (ROE panels, Megapixel Helios processing).

### 3.4 Embodied carbon of LED panels

- **No manufacturer LCA or EPD with values was found** for ROE, Sony, Absen, AOTO, Leyard or Samsung.
  - Samsung's *The Wall* and LH012IAB LED displays, and Leyard's TX, MG and NCV series, hold TÜV ISO 14067 product carbon footprint certificates (2023), but **the values are not published** [48].
- **The only proxy is UCLA's**:
  - Raw materials and manufacturing for a BP2 panel: **0.0295 kgCO2e per panel-hour**.
  - Frames: +0.0046. Distribution: +0.0009.
  - These are scaled from an LCA of LED *monitors* (Bhakar et al., 2015), amortised over a **10,000-hour** life.
  - Result: **≈295 kg per BP2 panel (≈1,180 kg/m²)** (DERIVED).
  - Applied to *The Mandalorian* scene, amortised embodied carbon (≈134 kg per volume-hour) exceeds operational emissions on the LA grid.
  - **Confidence L.** Two assumptions drive it: the lifetime (a panel's LEDs are commonly rated at far more than 10,000 hours) and the analogy between a monitor and a panel. With a 50,000-hour life, embodied carbon falls five-fold.
- For comparison, the Ecoprod guide gives **262 kg per desktop PC** and **300–500 kg per high-end GPU** [36].

### 3.5 Proposed per-day VP model

```
E_day = N_panels × W_avg × h_on  +  N_panels × W_standby × h_off
      + P_render_on × h_on + P_render_idle × h_off
      + HVAC_stage + HVAC_render_room + other stage power
CO2e_day = E_day × EF_grid  +  (optional) embodied: N_panels × h_on × e_panel
        (e_panel ≈ 0.035 kg per BP2-class panel-hour, UCLA proxy, L)
Content creation (virtual art department, Unreal environment builds) happens in pre-production and must be added separately.
```

| Tier | Volume | Assumptions | kWh per production day | CO2e per day on the LA grid (0.229) / UK grid (0.177) | Anchors |
|---|---|---|---|---|---|
| **Low** | Small, ≈50–100 m² (≈200–400 panels) | ≈35 kW total draw for 10 h | **≈300–700** | 70–160 kg / 55–125 kg | Ulster 350 kWh per day (modelled); *Iron Flower* 277–694 kWh per day (measured); AdGreen ≈450 |
| **Central** | Mid-to-large, ≈2,400 panels | Sony's measured profile (averaged over prep, shoot and wrap) | **≈2,700** (shoot days alone ≈8,000 if prep is allocated) | ≈610 kg / ≈470 kg | Sony/ICF measured 15,977 kWh over 6 days |
| **High** | *Mandalorian*-scale, ≈2,500 BP2/CB5 panels including the ceiling | ROE average specs (≈377 kW LED) for 12 h + ≈135 kW HVAC + render | **≈6,000–8,000** | 1.4–1.8 t / 1.1–1.4 t | UCLA reconstruction ≈6,200 kWh |

- Add ≈1 t per day of amortised embodied carbon for the central tier only if the UCLA proxy is used (2,400 × 12 h × 0.035 kg); this is L confidence.
- The avoided alternatives (flights, hotels, unit moves, generators at 88–230 L per day, sets) typically dominate, so VP comes out 50–99% lower in every study above.

---

## 4. Small-scale footprints and national-scheme data

### 4.1 New datasets

| Dataset | Values | Scope | Source | P/S | Conf. |
|---|---|---|---|---|---|
| **Austria: Österreichisches Filminstitut, *Green Filming Report*** (56 audited "IST" balances; KlimAktiv calculator; 15 documentaries and 41 fiction features) | **Features:** per film minute, median **561 kg** (IQR 397–928; mean 816; minimum 36; maximum 3,009). Per shoot day, median **1,917 kg** (IQR 1,324–2,792; mean 2,484; maximum 9,458). Per €1,000 of production cost, median **17.7 kg** (IQR 12.4–24.1). Shoot days 14–80. **Documentaries:** per minute, median **79.7 kg** (IQR 41–183; mean 121). Per shoot day, median **358 kg** (IQR 162–625). Per €1,000, median 19.4 kg. Travel and transport are the largest share | Full production (KlimAktiv scope) | ÖFI web report, 2025 [49] | P | H |
| DERIVED Austrian feature total | ≈**56 t** (median 561 kg × 100 min); mean-based ≈82 t | – | – | DERIVED | M |
| **Germany: Öko-Institut, evaluation of the "100 Grüne Produktionen" Green Shooting initiative** (76 of 78 productions; KlimAktiv; RFI included) | **Fiction films and TV films** (n=38; 86–110 min): total **12–148 t, mean ≈64 t** (appendix mean ≈67 t); **≈690 kg per minute** (135–1,530). Shares: travel **61%** (33–87), equipment and sets 21%, catering 12%, general costs 4%, **post-production 2%**, studio 0.2%. Appendix means per film: travel 39.3 t (hotels 14.9, people transport 18.0, freight 5.5, flights 1.0); sets and equipment 12.9 t; catering 10.4 t; **post 1.7 t**. Shoot days and emissions correlate at r = 0.51. **Other formats:** mini-series ≈1,400 kg/min; weekly series ≈200; entertainment series ≈200; **documentaries ≈40**; docuseries ≈35; daily soaps ≈25 kg/min. One 1-minute production emitted **20 t** (an outlier) | Covid-era (few flights); emission factors: electricity 0.44–0.50 kg/kWh, meals 1.85–2.3 kg | Öko-Institut, 10 Aug 2022 [50] | P | H |
| Germany: MFG pilot, *Tatort: Fünf Minuten Himmel* (≈2011–12) | Hotels **33.9 t = 46%** of the total → **≈74 t** (DERIVED). Flights were 17.2%. The crew averaged 40 hotel nights each. Press rule of thumb: a *Tatort* ≈100–140 t (taz); a 90-minute TV film ≈100 t (Gassmann via Constantin) | – | MFG report [51]; taz and Constantin (search snippets) | P / S | M / L |
| **Ireland: Screen Ireland and Native Events, *Decarbonisation Report*** (15 albert footprints, Aug 2021 – Apr 2024) | Total **1,458.36 t**. **7 features: 537.6 t → mean ≈76.8 t** (largest 129.2 t; smallest 8.2 t; both budgets under €5M). **8 TV dramas: 920.8 t → mean ≈115 t** (largest 293.9 t for 6 episodes; smallest 13.97 t for 8 episodes). Features: air travel is the largest category, then energy on location. TV: road travel. More than 400 Irish productions have used albert since 2019 | albert scope | Screen Ireland, July 2025 [52] | P | H (small n) |
| **Canada: Telefilm Canada and Green Spark Group** (22 productions: 15 features, 7 series; albert) | Average **280 t per production**; **28 t per content-hour**. Travel 58% (70% of it petrol vehicles; 22% air); materials 23% (61% of that food). Features under CA$1M: **12 t/h**; over CA$5M: **59 t/h**. Fiction 36 t/h against under 7 t/h for other genres. **≈2 tCO2e per CA$100,000 of budget** (R² = 0.869; SPA ≈2.5). Sector total: features 7,126 t per year; TV 260,843 t per year | albert | Telefilm, Feb 2024 [53] | P | H |
| DERIVED micro-budget (Telefilm intensity, extrapolated below the sample) | CA$50k → **≈1 t**; CA$10k → ≈0.2 t | – | – | DERIVED | L |
| **Canada: CBC/Radio-Canada** (albert; Québec grid) | **2.1 t per hour** (55 productions, 2024-25); 2.6 t/h (46, 2023-24). Documentaries included from 2024-25. Scripted fell 3.7 t/h | albert | Radio-Canada 2025 [54] | P | H |
| **EU: European Commission, *Greening the European Audiovisual Industry*** (June 2021) | **Average European feature ≈192 t**: cars and trucks 80; hotels 40; electricity and generators 22; catering 15; set construction 15; flights 12; post 1; waste 1. The listed items sum to 186 t; the report does not itemise the remaining 6 t. Cinema: "30 to several hundred t per hour", average ≈100 t/h. TV entertainment 5–10 t/h. France Télévisions: fiction ≈200 t per 90 min; one-hour entertainment ≈10 t | Expert estimate (Gassmann et al.), not audited data | EC study [55] | P (study) | M |
| **North America: Earth Angel short-form productions (SFP) database** (73 productions, US and Canada) | Per **one-day shoot**: **35.68 t**; 3,280 kWh; 488.7 gal of fuel (304.8 petrol, 183.9 diesel); **41,016 passenger-miles of air travel**; 2,129 lb of waste (80% diverted). Vancouver subset (n=3): **10.2 t**; 407 kWh; 554.5 gal; 18,118 passenger-miles | The SFPs are mostly commercials; flight-heavy | *Iron Flower* report, 2024 [44] | P | M |
| **Flanders: *Binti*** (feature) | Drinking water was 1.2 t = 2% of the total → total **≈60 t** (DERIVED) | – | Interreg / KU Leuven [56] | P / DERIVED | M |
| Sony / ICF on-location TV scenes | **3.09 t for 1 day** (133 people; 4 generators burning 152.7 gal of diesel) | Scene-level | [41] | P | H |
| Ulster VP short film (£80k budget) | **3.87 t** for a 4-day VP shoot plus post (modelled) | – | [45] | P | L–M |

### 4.2 Music videos, YouTube/creator shoots, student films and corporate video

- **Still no format-specific datasets.** I searched for albert's online categories, Julie's Bicycle, "green music video" guides, creator footprints (including MrBeast), film-school studies (Lincoln, the *Film Education Journal* article on albert), French *clip* footprints and AdGreen case studies. None published a production footprint.
- University of Lincoln and the *Film Education Journal* (2025) confirm that UK film schools have students calculate albert footprints, but they publish **no numbers**.
- **Best proxies, in order:**
  1. AdGreen's budget-per-shoot-day brackets and its ≤1 t project group (file D).
  2. Carbon'Clap's "clip, institutionnel" category, ≈2 t (file D).
  3. The Austrian documentary per-shoot-day median, **358 kg per day** (IQR 162–625), as a proxy for a small-crew day [49].
  4. Telefilm's budget intensity, **≈2 t per CA$100k** [53].
  5. The Earth Angel SFP average (35.7 t per day, flight-driven) as a flight-heavy upper case [44].
- **Recommendation for the tool:** for micro, creator and music-video shoots, use the bottom-up model in file D §3 (the local music video, ≈0.6–1.15 t for 2 days). Validate it against the Austrian documentary per-day band and AdGreen's ≤1 t group.

---

## 5. Water

| Item | Value | Unit / scope | Source | P/S | Conf. |
|---|---|---|---|---|---|
| **Rain, large area (car set)** | **500–800 L per minute** | ≈**30–48 m³ per hour** of running rain (DERIVED); ≈130–210 US gal/min | SFX Department Berlin [57] | P (vendor) | M |
| Rain trailer, standard | **2,000 L** (two 1,000 L bowsers; 8-bar petrol pump; 6 rain stands). A 400 L tank for vehicle rigs. A licensed standpipe for hydrant water | Capacity, not consumption | Quicksilver SFX (UK) [58] | P | H |
| Truck-mounted wetdown | **1,000 L** reservoir. Pool and tank heating up to **100,000 L** | – | AX-7 [59] | P | H |
| Rain towers (20 ft) | Connect to **fire hydrants or large-capacity water trucks**; flow is not published ("performance will vary based on available water/pump pressure") | – | J&M Special Effects [60] | P | – (no GPM) |
| Recirculated "river" for a film | **60,000–110,000 US gal/min** recirculated by four 30-inch pumps. This is not consumptive use | – | Rain for Rent case study [61] | P | M |
| **Pinewood Underwater Stage** | **1,200,000 L (1,200 m³)**; 20 × 10 × 6 m; water at **30–32 °C**; UV filtration; permanently filled | – | Pinewood [63] | P | H |
| **Lites Water Stage (Brussels)** | **7,000,000 L** of warm water (30–32 °C): 5 ML in the tank and buffers plus 2 ML on the flooded floor; 1,250 m²; up to 10.8 m deep | – | Lites Studios [64] | P | H |
| **Baja Studios (*Titanic*)** | Main tank **17 million US gal (≈64,350 m³)**; fills or empties in **40 h**; filtration plant **9,000 gal/min** (≈2,040 m³ per hour) of seawater; combined >20 million gal | – | Wikipedia; theStudioTour [65] | S | M |
| **Malta Film Studios** | Shallow tank 91 × 122 × 1.8 m (4 m central pit) → **≈20,000 m³** (DERIVED, excluding the pit). Deep tank 107 × 49 m, **11 m deep** (built 1979 for *Raise the Titanic*): ≤≈57,700 m³ as a box (DERIVED upper bound). Indoor tank 15 × 9 × 3.6 m = 486 m³ (DERIVED). Coastal and seawater-fed | – | PCP Malta [66] | S | M |
| **Manhattan Beach tank (*Avatar 2*)** | 120 × 60 × 30 ft. **Disney says "more than 250,000 gallons" (≈950 m³)**; widely quoted as **900,000 gallons (≈3,400 m³)**. The geometric maximum is ≈1.62 million gal (≈6,100 m³) (DERIVED). **The figures conflict** | – | Disney [62]; press (search snippets) | P / S | M / L |
| DERIVED heating energy for warm-water tanks | Heating the Pinewood volume by 19 K (12 → 31 °C) ≈ **26.5 MWh thermal** per full fill; Lites ≈ **155 MWh thermal**. This excludes heat losses while held at temperature | – | DERIVED (4.186 kJ/kg·K) | – | M |
| **Drinking water on set (*Binti*, Flanders)** | **2,102 L** (690 L from 15 L dispensers; 1,412 L tap) → **1.2 tCO2e, or 2% of the production** (the scenario 1 mix). Consumer use and transport are 63% of that impact. Scenario 2 (0.5 L plastic bottles) is worse | LCA, KU Leuven | Interreg / Green Screen [56]; Procedia CIRP 2022 | P | H |
| *Raised by Wolves* S2 (file D) | 3,608 m³ in total; ≈34 m³ per shoot day | – | file D | P | H |
| Snow | SFX snow is paper, polymer or cellulose, or "evaporative snow" fluid (≈0.4 L per minute of snow fluid per machine). No water data | – | Vendor pages (search snippets) | P | L |
| Unreliable figures to avoid | "1–2 million L per major feature", "500,000 L per day in desert locations", "FilmL.A.: 1.2 million gal per month" | AI-generated statistics pages | [75] | – | Do not use |

**Recommendation.**
- Model rain as **minutes of rain × 500–800 L per minute**, multiplied by takes and resets. A 2-hour rain sequence with 50% duty cycle ≈ **30–48 m³**.
- Model tanks as fill volume × number of fills, plus a heating term: **≈0.022 MWh thermal per m³ for a 19 K rise**.
- Water's carbon factor is small (0.36 kg per m³, DESNZ; file D). Heating and pumping energy, and drinking-water logistics, matter more.

---

## 6. Blockbuster checks

| Claim or item | Finding | Sources | Status |
|---|---|---|---|
| *The Amazing Spider-Man 2* (Sony, 2014) "8,000+ tCO2e" | **Not found in any source.** Sony's 2014 materials, as quoted, say only that the physical production **and** publicity tour were rendered **carbon-neutral** with **Gold Standard offsets** (100 clean cookstoves near China's giant-panda habitat, via WWF China and Earth Hour). Other facts: 49.7 t of materials donated or reused; 193,000 plastic bottles avoided; 52% landfill diversion; 72 t of food waste and compostable dishware composted; 5,862 meals donated; ≈$400,000 saved. Ashe's 2019 academic analysis of the "EcoSpidey" campaign cites no tonnage. Sony's current Greener World site hosts no ASM2 footprint | Sustainable Brands [67]; *The Hollywood Reporter* via greenfilmmaking.com [68]; Ashe 2019 [69]; edie [70]; Green Film Shooting (search snippet); Sony GW [77] | **Unverified. Do not use** |
| *Spider-Man: Brand New Day* (Sony, 2026, UK) | **Utility and fuel GHG −21.6%**. 62% of technical trucks were electric (8 battery trucks; AGS iTrailer with 200 kWh of storage). 35+ low-emission vehicles. 200+ local crew in Glasgow. A chartered train carried 126 crew; rail rather than air avoided an estimated 86% on comparable routes. albert 3-star and EMA Gold Seal. **No total published** | albert case study [71]; Sony GW [77] | P, H (percentages only) |
| *Jurassic World Dominion* | Pinewood on 100% renewable electricity; tagging-based CO2 report "comparable to albert". **No total published** | albert; Comcast/NBCU (search snippets) | No total |
| *The Day After Tomorrow* (2004) | "10,000 metric tons", calculated and offset (file D; TIME) | file D | S, L. Still the only individual blockbuster total |
| *Avengers: Endgame* "3,500 t" or "14.8 million kg"; "US EPA: blockbusters 2,000–10,000 t"; "WWF: 250–400 t per Hollywood feature"; "Carbon Trust: 110 t per hour of filming" | Found only on AI-generated statistics aggregators (gitnux, worldmetrics, zipdo, wifitalents, everycalculators). They are mutually inconsistent and I traced none to a primary source | [75] | **Fabricated or unsupported. Do not use** |

---

## 7. Gaps remaining

1. **Per-shot energy is still not published by any studio.**
   - The model in §2.8 rests on DERIVED facility intensities (UK SECR) and on Weta's compute totals.
   - The definitions differ: thread- against core-hours, "render-hours", and whether simulations and iterations are included.
   - Cloud and offshore shares are unknown.
   - Technicolor's 2021 CDP suggests cloud and external data centres can equal in-house Scope 2.
2. **Simulation core-hours** for Houdini pyro, FLIP and destruction: only durations are available ("overnight", "up to 8 days").
3. **Spider-Verse, Soul, Encanto and Frozen 2**: no reliable total render-hours were found. Elemental's 151,000 cores is secondary.
4. **LED-panel embodied carbon**: no LCA or EPD values from any manufacturer. TÜV certificates for Samsung and Leyard exist, but their values are unpublished. The UCLA monitor-based proxy is L confidence.
5. **Brompton and Megapixel processor power** and **StageCraft hardware**: not retrieved (the ACM paper is blocked).
6. **ARRI Stage London, Pixomondo, NEP, Dimension, Dark Bay/*1899*, ILM StageCraft**: no energy or carbon disclosures found.
7. **Music videos, YouTube creators, student films and corporate video**: no datasets. Only proxies (§4.2).
8. **Water:**
   - US rain-tower GPM ratings and water-truck capacities are not published by vendors (only UK and German figures).
   - How often tanks are refilled, and their heating energy in use.
   - Snow effects, and catering water beyond *Binti*.
   - The *Avatar* tank volume conflicts (250,000 against 900,000 gallons).
9. **Individual blockbuster totals**: none beyond *The Day After Tomorrow*. The ASM2 "8,000+ t" figure remains unsourced.
10. **UK SECR coverage:** Cinesite, Untold, Jellyfish, One of Us and Blue Zoo had no SECR table in the scanned pages. DNEG's per-£ intensity is unusable because the entity's turnover is booked elsewhere. Weta FX (New Zealand) has no public energy disclosure.
11. **Blocked or unavailable sources:** Cineuropa (Cloudflare), ACM DL PDFs, ScienceDirect, web.archive.org. Bing search results were degraded during this pass; DuckDuckGo through headless Chromium was used instead.

---

## 8. Sources (all accessed 2026-09-25)

**VFX and rendering**
1. AWS Media blog, Colin Cupp, "'Avatar: The Way of Water' and the future of filmmaking" (28 Feb 2023). https://aws.amazon.com/blogs/media/avatar-the-way-of-water-and-the-future-of-filmmaking/
2. AWS Media blog, "AWS Congratulates 'Avatar: The Way of Water' Production Team on VFX Academy Award Win" (Mar 2023). https://aws.amazon.com/blogs/media/aws-congratulates-avatar-the-way-of-water-production-team-on-vfx-academy-award-win/
3. Wētā FX, "Our Work on Avatar: The Way of Water" (30 Mar 2023). https://www.wetafx.co.nz/articles/our-work-on-avatar-the-way-of-water
4. The Spinoff, Chris Schultz, "'Like seeing the first images from the moon': How Wētā gave Avatar 2 its visual wow factor" (8 Dec 2022; the trip was funded by AWS). https://thespinoff.co.nz/business/08-12-2022/like-seeing-the-first-images-from-the-moon-how-weta-gave-avatar-2-its-visual-wow-factor
5. TVBEurope, "How the cloud met the 'eye-watering' compute requirements for Avatar: The Way of Water" (15 Dec 2022). https://www.tvbeurope.com/production-post/how-the-cloud-met-the-eye-watering-compute-requirements-for-avatar-the-way-of-water
6. befores & afters, "How exactly does Wētā FX take on set performance capture…" (Kingdom of the Planet of the Apes; 12 May 2024). https://beforesandafters.com/2024/05/12/how-exactly-does-weta-fx-take-on-set-performance-capture-and-translate-it-into-living-breathing-apes/
7. befores & afters, "Powering a VFX Oscar winner" (Avatar: Fire and Ash; AMD-sponsored; 24 Mar 2026). https://beforesandafters.com/2026/03/24/powering-a-vfx-oscar-winner/
8. postPerspective, "Inside Weta's VFX Pipeline for 'Avatar: Fire and Ash'" (28 Jan 2026). https://postperspective.com/inside-wetas-vfx-pipeline-for-avatar-fire-and-ash/
9. Unity blog, "The water technology behind Avatar: The Way of Water" (2023). https://unity.com/blog/industry/technology-behind-avatar-the-way-of-water
10. Rittal case study, "Weta Digital Wins Data Centre Efficiency Award." https://www.rittal.com/nz-en/Solutions/Case-Studies/Weta-Digital
11. Data Center Knowledge, "The Data-Crunching Powerhouse Behind 'Avatar'" (22 Dec 2009). https://www.datacenterknowledge.com/energy-power-supply/the-data-crunching-powerhouse-behind-avatar-
12. HP release via SupercomputingOnline, "HP enables Weta Digital to produce 'Avatar'" (2010). https://www.supercomputingonline.com/latest/academia/5312-hp-enables-weta-digital-to-produce-avatar
13. Electronic Design, "Disney Supercomputer Renders Big Hero 6" (Oct 2014). https://www.electronicdesign.com/blogs/article/21801218/disney-supercomputer-renders-big-hero-6
14. fxguide, "Disney's new production renderer 'Hyperion' – yes, Disney!" (Oct 2014). https://www.fxguide.com/fxfeatured/disneys-new-production-renderer-hyperion-yes-disney/
15. Burley et al., "The Design and Evolution of Disney's Hyperion Renderer," *ACM Transactions on Graphics* 37(3):33 (2018). https://media.disneyanimation.com/uploads/production/publication_asset/177/asset/a.pdf
16. Data Center Knowledge, "Turbo-Charging Digital Render Farms" (11 Jul 2011). https://www.datacenterknowledge.com/business/turbo-charging-digital-render-farms
17. StorageReview, "HP And DreamWorks Bring How To Train Your Dragon 2 To Life" (19 Jun 2014). https://www.storagereview.com/news/hp-and-dreamworks-bring-how-to-train-your-dragon-2-to-life
18. GamesBeat/VentureBeat, "Creating a creature with 5.5M pieces of animated hair in Pixar's Monsters University" (2013). https://gamesbeat.com/the-insiders-view-of-the-tech-behind-pixars-monsters-university-interview/
19. The Science Behind Pixar, "Rendering." https://sciencebehindpixar.org/pipeline/rendering
20. Wikipedia, *Elemental (2023 film)*, citing Geek Vibes Nation press-conference coverage (Apr 2023). https://en.wikipedia.org/wiki/Elemental_(2023_film)
21. Wikipedia, *Frozen (2013 film)*, citing *Animation Magazine* (27 Nov 2013). https://en.wikipedia.org/wiki/Frozen_(2013_film)
22. Wikipedia, *Big Hero 6 (film)*. https://en.wikipedia.org/wiki/Big_Hero_6_(film)
23. Guinness World Records, "Most computing power used in making a film." https://www.guinnessworldrecords.com/world-records/418247-most-computing-power-used-in-making-a-film
24. Conductor / Atomic Fiction, "Atomic Fiction Walks The Walk" (also on the Google Cloud Platform blog, Oct 2015). https://www.conductortech.com/blog/article-the-walk ; https://cloudplatform.googleblog.com/2015/10/Atomic-Fiction-walks-The-Walk.html
25. DNEG, social post on Dune's desert mouse ("30+ hours per frame"). https://www.facebook.com/dnegvfx/posts/rendering-at-about-30-hours-per-frame-at-final-quality-the-cg-desert-mouse-of-du/10159288817192763/
26. ACM SIGGRAPH 2022 Computer Animation Festival, "The VFX of Dune" (abstract). https://dl.acm.org/doi/10.1145/3512752.3527785
27. MPC, *The Lion King* filmography page, https://www.mpcvfx.com/en/filmography/the-lion-king/ ; MPC LinkedIn post, https://www.linkedin.com/posts/mpcvfx_didyouknow-thelionking-activity-6613496406126788608-lQO5 ; AnimationXpress (77 million hours; S), https://www.animationxpress.com/vfx/animated-marvels-cloud-renderings-role-in-animation-and-vfx/
28. arXiv 2005.12518, "Survey: Machine Learning in Production Rendering" (2020). https://arxiv.org/html/2005.12518v1
29. Cloud Carbon Footprint, methodology, https://www.cloudcarbonfootprint.org/docs/methodology/ ; AWS coefficients, https://raw.githubusercontent.com/cloud-carbon-footprint/ccf-coefficients/main/output/coefficients-aws-use.csv
30. Boavizta API v1, `/cloud/instance` (queried 2026-09-25; 100% load; usage location AUS). https://api.boavizta.org/
31. Double Negative Limited (company 03325701), annual reports for the years to 31 Mar 2025 and 31 Mar 2024 (SECR sections), Companies House. https://find-and-update.company-information.service.gov.uk/company/03325701/filing-history
32. The Framestore Limited (01972029), accounts for the year to 31 Dec 2024 (SECR), Companies House. https://find-and-update.company-information.service.gov.uk/company/01972029/filing-history
33. Industrial Light & Magic (UK) Ltd (08315430), accounts for the year to 27 Sep 2025 (SECR), Companies House. https://find-and-update.company-information.service.gov.uk/company/08315430/filing-history
34. Technicolor Creative Studios UK Limited (01191228), accounts for the year to 31 Dec 2023 (SECR), Companies House. https://find-and-update.company-information.service.gov.uk/company/01191228/filing-history
35. Technicolor SA, CDP Climate Change Questionnaire 2022 (FY2021 data; 28 Jul 2022). https://www.vantiva.com/app/uploads/2024/10/Technicolor-2022-CDP-Climate-Change-Answer-6.pdf
36. Ecoprod, *Green Animation Guide* (2025 edition, 10 Jun 2025). https://ecoprod.com/wp-content/uploads/2025/06/GREEN-ANIMATION-GUIDE-ECOPROD-20250610.pdf
37. TU Delft SustainableSE 2025 (student project), "Comparing energy consumption between the Cycles rendering engine in Blender." https://luiscruz.github.io/course_sustainableSE/2025/p1_measuring_software/g3_blender.html
38. Fox Renderfarm, About page. https://www.foxrenderfarm.com/about.html
39. Ranch Computing, Green Impact page. https://www.ranchcomputing.com/en/green-impact/
40. GarageFarm, "Render farms and the sustainability question." https://garagefarm.net/blog/render-farms-and-the-sustainability-question-energy-use-and-carbon-footprint

**Virtual production**

41. ICF for Sony Pictures Entertainment, "Comparison of GHG Emissions from Scenes of On-Location and Virtual Productions" (memorandum, Aug 2022). https://sonypicturesgreenerworld.com/sites/sonypicturesgreenerworld.com/files/2022-09/Sony%20Pictures_Virtual%20Production%20GHG%20Analysis_2022_2.pdf
42. ICF for SPE, "Revised Analysis Comparing GHG Emissions from Scenes of On-Location and Virtual Productions" (H1 2023; posted Mar 2024). https://sonypicturesgreenerworld.com/sites/sonypicturesgreenerworld.com/files/2024-03/Revised%20Virtual%20Production%20Analysis%20Results%20Explanation_2023%5B1%5D.pdf
43. UCLA Institute of the Environment and Sustainability, practicum for the Sustainable Production Alliance, "A life cycle analysis of virtual vs. physical production for film and television," final report (June 2023). https://www.ioes.ucla.edu/wp-content/uploads/2023/06/UCLA-IoES-Practicum-SPA-Virtual-Production-Final-Report-2023.pdf
44. Earth Angel for Trembling Void and Versatile Media, "Environmental Impacts of Virtual Production" (*Iron Flower* case study, 2024). https://cdn.prod.website-files.com/65a864a37441438c7ad1a4f5/67fb0739f4590010d56afbce_Environmental%20Impacts%20of%20Virtual%20Production.pdf
45. Ulster University / Studio Ulster for Future Observatory (DCMS), "Virtual Production's Role in Carbon Reduction and Net Zero Production" (Nov 2023). https://futureobservatory.org/files/dcmsreports/futureobservatory_culturalpolicyreport_studioulster.pdf
46. LBBOnline, Chris Chaundler (Quite Brilliant), "A Virtual Carbon Comparison – To Go or Not to Go?" (2021). https://www.lbbonline.com/news/a-virtual-carbon-comparison-to-go-or-not-to-go
47. ROE Visual brochures:
    - BP2V2 (3 Feb 2024): https://www.roevisual.com/uploads/files/Product%20File/Black%20Pearl/bp2v2-brochure-en-feb.-3-2024.pdf
    - BP2V2 (28 Jan 2021): https://www.roevisual.com/uploads/Images/Products/Black%20Pearl%202%20V2/bp2-v2-brochure-28-jan-2021.pdf
    - Ruby 2.6 (12 Jan 2024): https://www.roevisual.com/uploads/files/Product%20File/Ruby/ruby-2.6-brochure-en-jan.-12-2024.pdf
48. TÜV Rheinland, "TÜV Rheinland issues first Product Carbon Footprint certificate to Samsung" (2023; no values). https://www.tuv.com/press/en/press-releases/first-product-carbon-footprint-certificate-samsung.html ; Leyard PCF news, https://www.leyardhk.com/press/news/519.html

**Small-scale and national schemes**

49. Österreichisches Filminstitut, *Green Filming Report*: "Analyse der Treibhausgasbilanzen von Kinofilmen" (2025). https://filminstitut.at/green-filming/green-report/analyse-der-treibhausgasbilanzen-von-kinofilmen
50. Öko-Institut (Rüdenauer, López, Gensch), "100 Grüne Produktionen – Evaluation der Nachhaltigkeitsinitiative des Arbeitskreises 'Green Shooting' (1. Update)" (Freiburg, 10 Aug 2022). https://www.oeko.de/fileadmin/oekodoc/Evaluation_100_Produktionen.pdf
51. MFG Baden-Württemberg, "Tatort: Fünf Minuten Himmel – Green-Shooting-Ergebnisbericht." https://greenshooting.mfg.de/files/02_MFG_Filmfoerderung/PDF/tatort_green_shooting_ergebnisbericht.pdf ; taz, "Tatort muss kein Klimakiller sein," https://taz.de/Bewegtbild-und-Green-Producing/!5684405/
52. Screen Ireland and Native Events, "Decarbonisation Report for Ireland's Screen Stakeholders" (July 2025). https://www.screenireland.ie/decarbonisation-report-for-irelands-screen-stakeholders
53. Telefilm Canada and Green Spark Group, "Estimating the Carbon Footprint of Canada's Audio-visual Content" (Feb 2024). https://telefilm.ca/wp-content/uploads/2024/02/EstimatingCarbonFootprint-EN-GSG.pdf
54. CBC/Radio-Canada, "2024-2025 Radio-Canada Report on Television Production Carbon Emissions" (2025). https://site-cbc.radio-canada.ca/documents/impact-and-accountability/environment/2025/2024-2025-radio-canada-report-on-television-production-carbon-emissions.pdf
55. European Commission, "Greening the European Audiovisual Industry" (study, June 2021). https://digital-strategy.ec.europa.eu/en/library/greening-european-audiovisual-industry (PDF: https://ec.europa.eu/newsroom/dae/redirection/document/77071)

**Water**

56. Interreg Europe / Green Screen, "The Life Cycle of water consumption on a film set" (*Binti*; KU Leuven LCA). https://www.interregeurope.eu/sites/default/files/good_practices/Green%20Screen%20Water%20Good%20Practice_Interreg%20Europe.pdf ; paper: "Comparative life cycle analysis of drinking water supply on a filmset: the case study of 'Binti'," Procedia CIRP (2022), https://www.sciencedirect.com/science/article/pii/S2212827122001263
57. SFX Department Berlin, "Water • Rain." https://sfxdepartment-berlin.de/en/effects-2/water-rain
58. Quicksilver SFX, "Rain effects." https://quicksilversfx.co.uk/special-effects/rain-effects/
59. AX-7, "Rain FX, Wetdown & Heated Water." https://ax-7.com/rain-water/
60. J&M Special Effects, "Rain Tower." https://jmfx.net/products/water/rain-tower
61. Rain for Rent, "Customized Flow Rates Produce VFX for Film's River Simulation." https://www.rainforrent.com/case/customized-flow-rates-produce-vfx-for-films-river-simulation/
62. The Walt Disney Company, "How 'Avatar: The Way of Water' Revolutionizes Underwater Cinematography." https://thewaltdisneycompany.com/news/how-avatar-the-way-of-water-revolutionizes-underwater-cinematography/
63. Pinewood Studios, "Underwater Stage." https://pinewoodgroup.com/pinewood-studios/stages/underwater-stage/
64. Lites Studios, "Water Stage." https://www.litesstudios.com/stage-4-water-stage-1450m-15-600ft
65. Wikipedia, *Baja Studios*, https://en.wikipedia.org/wiki/Baja_Studios ; theStudioTour, "Baja Film Studios," https://www.thestudiotour.com/wp/studios/baja-film-studios/
66. PCP Malta, "Film Water Tanks." https://pcpmalta.com/tanks

**Blockbuster checks**

67. Sustainable Brands, "The Amazing Spider-Man 2: With Great Power Comes Great Environmental Responsibility" (2014). https://sustainablebrands.com/read/the-amazing-spider-man-2-with-great-power-comes-great-environmental-responsibility
68. *The Hollywood Reporter* (2014), "'The Amazing Spider-Man 2' Honored for Environmental Efforts," https://www.hollywoodreporter.com/movies/movie-news/amazing-spider-man-2-honored-692925/ ; quoted by greenfilmmaking.com, https://greenfilmmaking.com/2014/04/the-amazing-sustainable-spider-man-2-with-great-power-comes-great-responsibility/
69. Ashe, M. (2019), "'With Great Power': Spinning Environmental Worlds and 'Green' Production in The Amazing Spider-Man 2's Marketing." https://pdfs.semanticscholar.org/a68e/eac020a8d20b88c8d2ac74995daa71d5aef5.pdf
70. edie.net, "Amazing Spiderman-2 film most 'sustainable blockbuster' in Sony Pictures history" (2014). https://www.edie.net/amazing-spiderman-2-film-most-sustainable-blockbuster-in-sony-pictures-history/
71. BAFTA albert case study, *Spider-Man: Brand New Day* (2026). https://baftaalbert.org/case-studies/spider-man-brand-new-day-2026/

**Factors and other**

72. Our World in Data / Ember, "Carbon intensity of electricity generation" (CSV, 2020–2025). https://ourworldindata.org/grapher/carbon-intensity-electricity
73. Wikipedia, *Avatar: The Way of Water* (citation trail for the 3.3 billion figure). https://en.wikipedia.org/wiki/Avatar:_The_Way_of_Water
74. IMDb trivia for *Avatar: The Way of Water*, and LinkedIn posts ("8,000 thread hours per frame … 3,000 vCPUs"): unverified, tertiary. https://www.imdb.com/title/tt1630029/trivia/?item=tr6654613
75. AI-generated statistics aggregators (gitnux.org, worldmetrics.org, zipdo.co, wifitalents.com, everycalculators.com): flagged as unreliable and not used.
76. hahsoftware, "Low carbon rendering for post-production and VFX studios" (mis-attributes the 100,000 kWh illustration to the BFI): flagged. https://hahsoftware.com/news/sustainable-rendering-for-post-production-studios/
77. Sony Pictures, A Greener World, Productions page (2026). https://sonypicturesgreenerworld.com/en/productions
