/* Every factor the calculator uses, with its range and where it comes from.
   Research date: 2026-09-25.  The research folder in the repo holds the full sourcing. */
const DATA = {
  asOf: "2026-09-25",

  /* ---------- AI video models ----------
     gpuWh: GPU-only watt-hours per generated second at the model's reference resolution.
     resFactor: multiplier on gpuWh for each resolution (reference = 1).
     price: USD per generated second at list price, with the cheapest heavy-use subscription
     and the priciest mainstream reseller as the range. */
  models: {
    seedance25: {
      label: "Seedance 2.5",
      maker: "ByteDance",
      region: "johor",
      audio: "Native audio included",
      maxClip: 30,
      gpuWh: { lo: 5, c: 18, hi: 40 },
      resolutions: {
        "480p": { resFactor: { lo: 0.35, c: 0.57, hi: 0.69 }, price: { lo: 0.06, c: 0.103, hi: 0.22 } },
        "720p": { resFactor: { lo: 1, c: 1, hi: 1 }, price: { lo: 0.13, c: 0.231, hi: 0.47 } },
        "1080p": { resFactor: { lo: 1.44, c: 1.76, hi: 2.87 }, price: { lo: 0.32, c: 0.569, hi: 1.16 } },
      },
      defaultRes: "720p",
      note: "Energy is estimated from OpenRouter's Seedance 2.5 latency benchmark, a calibration against Seedance 1.5, and ByteDance's reported 70% gross margin.  ByteDance publishes no energy data.",
    },
    minimaxH3: {
      label: "MiniMax H3",
      maker: "MiniMax",
      region: "china",
      audio: "Native stereo audio included",
      maxClip: 15,
      gpuWh: { lo: 2, c: 7, hi: 20 },
      resolutions: {
        "768p": { resFactor: { lo: 1, c: 1, hi: 1 }, price: { lo: 0.047, c: 0.08, hi: 0.10 } },
        "2K": { resFactor: { lo: 1.2, c: 1.5, hi: 2.5 }, price: { lo: 0.077, c: 0.13, hi: 0.15 } },
      },
      defaultRes: "768p",
      note: "Anchored on MiniMax's own benchmark for its open-weight H3 model (74 s on 4 H200 GPUs for 5 s at 768p), less the sparse attention MiniMax uses in production.",
    },
    minimaxH3Max: {
      label: "MiniMax H3 Max",
      maker: "MiniMax and fal",
      region: "china",
      audio: "Native audio included",
      maxClip: 15,
      gpuWh: { lo: 0.6, c: 1.5, hi: 3.5 },
      resolutions: {
        "480p": { resFactor: { lo: 0.3, c: 0.4, hi: 0.5 }, price: { lo: 0.027, c: 0.05, hi: 0.05 } },
        "768p": { resFactor: { lo: 1, c: 1, hi: 1 }, price: { lo: 0.047, c: 0.08, hi: 0.08 } },
      },
      defaultRes: "768p",
      note: "A distilled fast variant.  fal reports about 2.5 s of GPU time for a 5 s clip on its own hardware.",
    },
  },

  /* ---------- Data-center factors ---------- */
  hostMultiplier: { lo: 1.15, c: 1.43, hi: 2.1 },   // CPU, memory, and idle capacity on top of GPU energy (before PUE)
  gpuKw: 0.63,                                        // average draw of one H100/H200-class GPU during diffusion (0.9 × 700 W)
  embodiedKgPerGpuHour: { lo: 0.006, c: 0.03, hi: 0.055 },
  training: { lo: 0.01, c: 0.05, hi: 0.3 },           // share added for training the model, spread over its lifetime use

  regions: {
    johor: { label: "Johor, Malaysia", why: "BytePlus serves Seedance to international users only from Johor.", grid: { lo: 0.497, c: 0.602, hi: 0.7 }, pue: { lo: 1.15, c: 1.3, hi: 1.5 }, wueOn: { lo: 0.12, c: 0.5, hi: 1.9 }, wueOff: { lo: 1.2, c: 1.7, hi: 3.9 } },
    china: { label: "Mainland China", why: "MiniMax rents compute from Chinese clouds, mainly Alibaba Cloud.", grid: { lo: 0.404, c: 0.53, hi: 0.65 }, pue: { lo: 1.15, c: 1.3, hi: 1.5 }, wueOn: { lo: 0.14, c: 0.57, hi: 1.63 }, wueOff: { lo: 1.5, c: 3.0, hi: 6.0 } },
    us: { label: "United States (hyperscale)", why: "Typical for US resellers such as fal.", grid: { lo: 0.35, c: 0.384, hi: 0.416 }, pue: { lo: 1.08, c: 1.12, hi: 1.2 }, wueOn: { lo: 0.12, c: 0.55, hi: 1.15 }, wueOff: { lo: 2.4, c: 3.1, hi: 5.0 } },
    nordics: { label: "Nordics", why: "A low-carbon grid, for comparison.", grid: { lo: 0.028, c: 0.045, hi: 0.114 }, pue: { lo: 1.08, c: 1.12, hi: 1.2 }, wueOn: { lo: 0.02, c: 0.09, hi: 0.3 }, wueOff: { lo: 1.5, c: 4.5, hi: 6.7 } },
  },

  /* ---------- How people actually use AI video ----------
     genPerFinished: generated seconds per finished second (low / typical / high).
     laborDaysPerMin: person-days of human work per finished minute. */
  styles: {
    microdrama: { label: "Industrial micro-drama", takes: "1–3 takes per kept shot", genPerFinished: { lo: 3, c: 5, hi: 8 }, laborDaysPerMin: 0.3, example: "Chinese AI short-drama studios, 2026" },
    solo: { label: "Prepared solo creator", takes: "2–4 takes per kept shot", genPerFinished: { lo: 4, c: 8, hi: 30 }, laborDaysPerMin: 0.45, example: "Lost Garden: 21 minutes in 75 hours" },
    pro: { label: "Professional ad or music video", takes: "13–27 takes per kept shot", genPerFinished: { lo: 30, c: 80, hi: 110 }, laborDaysPerMin: 5, example: "Kalshi NBA Finals ad: 300–400 generations for 15 clips" },
    feature: { label: "AI feature film", takes: "About 64 takes per kept shot", genPerFinished: { lo: 60, c: 160, hi: 250 }, laborDaysPerMin: 2.2, example: "Hell Grind: 61,000 generations for 960 shots in 95 minutes" },
    flagship: { label: "Flagship brand campaign", takes: "Hundreds to thousands of takes per kept shot", genPerFinished: { lo: 500, c: 2000, hi: 6000 }, laborDaysPerMin: 1000, example: "Coca-Cola 2025: 70,000 clips for about 20 shots" },
  },

  /* ---------- Conventional productions (benchmarks) ----------
     t: tCO2e per project.  scope: "full" (albert, AdGreen, Carbon'Clap style) or "pear"
     (US studio benchmark: fuel, utilities, flights without radiative forcing, hotels only). */
  productions: {
    micro: { label: "Micro shoot", detail: "1–2 days, a small local crew", minutes: 2, t: { lo: 0.1, c: 0.29, hi: 1 }, scope: "full", cost: { lo: 1500, c: 5000, hi: 12000 }, days: 1.8, crew: 8, source: "AdGreen 2022, projects under 1 t (mean 0.29 t, median 0.19 t)" },
    musicVideo: { label: "Local music video", detail: "2 days, about 20 people", minutes: 3.5, t: { lo: 0.6, c: 0.9, hi: 2 }, scope: "full", cost: { lo: 5000, c: 15000, hi: 30000 }, days: 2, crew: 20, source: "Bottom-up estimate with UK DESNZ 2025 factors; Carbon'Clap music and corporate video average 2 t" },
    commercial: { label: "Commercial, typical", detail: "1–3 days, AdGreen median", minutes: 0.5, t: { lo: 0.3, c: 0.75, hi: 4.5 }, scope: "full", cost: { lo: 25000, c: 75000, hi: 150000 }, days: 2, crew: 30, source: "AdGreen 2022–24 median project 0.75 t" },
    commercialHigh: { label: "Commercial, high budget", detail: "£250k or more per shoot day", minutes: 0.5, t: { lo: 14, c: 24.6, hi: 75 }, scope: "full", cost: { lo: 350000, c: 750000, hi: 2000000 }, days: 3, crew: 60, source: "AdGreen 2025 budget brackets (£250–500k per day: 24.6 t; £500k+: 75 t)" },
    shortFilm: { label: "Short film", detail: "About 10 minutes", minutes: 10, t: { lo: 2, c: 8, hi: 20 }, scope: "full", cost: { lo: 6000, c: 25000, hi: 60000 }, days: 5, crew: 20, source: "Ecoprod Carbon'Clap 2024, short fiction average 8 t" },
    tvEpisode: { label: "One-hour TV drama episode", detail: "About 50 minutes", minutes: 50, t: { lo: 77, c: 128.6, hi: 398 }, scope: "pear", cost: { lo: 3800000, c: 6000000, hi: 15000000 }, days: 8, crew: 150, source: "Sustainable Entertainment Alliance 2023–24: 128.6 t per episode" },
    indieFeature: { label: "Indie feature", detail: "About 100 minutes", minutes: 100, t: { lo: 77, c: 271, hi: 631 }, scope: "full", cost: { lo: 1000000, c: 3000000, hi: 6000000 }, days: 25, crew: 60, source: "Carbon'Clap French feature average 271 t; Screen Ireland average 77 t; US medium feature 631 t" },
    tentpole: { label: "Studio tentpole", detail: "About 130 minutes", minutes: 130, t: { lo: 1732, c: 2444, hi: 2996 }, scope: "pear", cost: { lo: 150000000, c: 250000000, hi: 430000000 }, days: 70, crew: 500, source: "Sustainable Entertainment Alliance 2023–24 tentpole bands; excludes VFX rendering" },
  },
  pearToFull: { lo: 1.15, c: 1.3, hi: 1.5 },   // assumption: the US benchmark leaves out food, materials, waste, post, and flight RF

  /* ---------- Bottom-up factors for a custom shoot (UK DESNZ 2025 unless noted) ---------- */
  factors: {
    flightLongEconomy: 0.117 + 0.0246,   // kg per passenger-km with radiative forcing, plus upstream fuel
    flightLongBusiness: 0.3394 + 0.0714,
    flightShortEconomy: 0.126 + 0.025,
    carKm: 0.167 + 0.04,                  // average car per km, plus upstream fuel
    vanKm: 0.279,
    truckKm: 0.495,
    dieselKgPerL: 2.66 + 0.62,
    dieselKwhPerL: 9.93,
    genLPerDay: { small: 88, large: 230 },
    gridKgPerKwh: { uk: 0.177, us: 0.35, ladwp: 0.229, eu: 0.21 },
    hotelNight: { uk: 10.4, us: 16.1, canada: 7.4, france: 6.7, southAfrica: 51.4, japan: 39 },
    mealKg: { mixed: 2.7, vegetarian: 0.8, beef: 9.9 },
    timberKgPerT: 269.5,
    steelKgPerT: 3824,
    landfillWoodKgPerT: 925,
    waterLPerPersonDay: 94,               // Raised by Wolves S2, the only published production water figure
    vfxShotKwh: { simple: 150, typical: 1500, hero: 5000 },
    vfxGrid: 0.35,
  },


  /* ---------- Scenes: what one scene adds to a shoot that's already happening ----------
     practical and vfx are kg CO2e {lo, c, hi}.  seconds is the finished screen time the scene
     produces.  takes is generated seconds per finished second for this kind of shot. */
  scenes: [
    { key: "explosion", title: "Bus explosion", seconds: 5, takes: { lo: 10, c: 30, hi: 100 },
      practical: { lo: 794, c: 2124, hi: 6682 }, practicalLabel: "Practical explosion day",
      vfx: { lo: 280, c: 525, hi: 1225 }, vfxLabel: "CG explosion shot",
      body: ["The fireball is the small part.  The biggest film explosion on record, in <i>Spectre</i>, burned 8,418 L of kerosene, about 26 t CO2e, which is under 1% of a tentpole.  A typical bus gag adds crew and effects vehicles, a generator, and trucks for an extra day.",
             "The destroyed vehicle is the swing factor.  A new 12 m bus embodies about 37 t CO2e, while a bus already headed for scrap arguably counts as zero, which is how we count it here."],
      cost: "Practical: $10k–$11k for the stunt team, safety officer, and permits, plus an extra unit day ($15k–$120k on an indie, $315k–$1.6M on a studio film).  CG: $5k–$50k per destruction shot." },
    { key: "chase", title: "Car chase day", seconds: 30, takes: { lo: 15, c: 40, hi: 120 },
      practical: { lo: 1000, c: 2390, hi: 6000 }, practicalLabel: "One practical chase day",
      vfx: { lo: 700, c: 1500, hi: 5800 }, vfxLabel: "CG chase, same screen time",
      body: ["A chase day means picture cars in multiples, precision drivers, camera cars, road closures, and police.  <i>Furious 7</i> wrecked more than 230 cars, about 1,650 t CO2e if you count them as new.",
             "Continuity from shot to shot is AI's weak spot, so expect more takes here than for a single wide shot."],
      cost: "Practical: road closures from $312 per location plus police at $67–$78 an hour, before picture cars and crew.  CG: $3k–$50k per shot." },
    { key: "crowd", title: "Crowd of 500 extras", seconds: 15, takes: { lo: 5, c: 10, hi: 30 },
      practical: { lo: 2000, c: 5000, hi: 12500 }, practicalLabel: "500 extras for a day",
      vfx: { lo: 108, c: 300, hi: 906 }, vfxLabel: "Digital crowd, 3 shots",
      body: ["Crowds cost carbon through travel, meals, and holding areas, at about 10 kg per extra per day.  Beef versus vegetarian catering alone is a 6× difference per meal.",
             "Foreground interaction still favors real people, so the usual answer is a small real crowd extended digitally."],
      cost: "Practical: about $140k–$150k a day in SAG-AFTRA wages and benefits for 500 background actors, before meals, wardrobe, and holding.  CG: $1k–$25k per crowd shot." },
    { key: "aerial", title: "Helicopter aerial day", seconds: 25, takes: { lo: 2, c: 5, hi: 20 },
      practical: { lo: 1750, c: 2917, hi: 5830 }, practicalLabel: "Helicopter day",
      vfx: { lo: 20, c: 33, hi: 60 }, vfxLabel: "Drone day instead",
      body: ["An H125 helicopter burns about 190 L of jet fuel an hour, about 580 kg CO2e per flight hour.  A drone removes about 99% of that, so AI's extra saving over a drone is small.",
             "Helicopters still win for altitude, speed, restricted airspace, and heavy camera payloads."],
      cost: "Helicopter: $8k–$30k a day all-in.  Drone with crew: $2.5k–$8.5k.  Stock clip: $55–$499." },
    { key: "abroad", title: "Establishing shots abroad", seconds: 15, takes: { lo: 5, c: 10, hi: 50 },
      practical: { lo: 9900, c: 15941, hi: 46300 }, practicalLabel: "5 crew, London to Cape Town, a week",
      vfx: { lo: 240, c: 500, hi: 900 }, vfxLabel: "3 matte paintings",
      body: ["Five crew flying London to Cape Town for a week comes to about 16 t CO2e in economy and about 42 t in business class.  Flights are 65% of all emissions on ad shoots that fly.",
             "This is AI's strongest case, and stock footage's, as long as the generated shot replaces the trip instead of adding to it."],
      cost: "Practical: tens of thousands of dollars in travel.  Matte painting: $5k–$25k per shot.  Stock: $55–$499 per clip." },
    { key: "set", title: "Large period set", seconds: 120, takes: { lo: 10, c: 30, hi: 100 },
      practical: { lo: 30000, c: 57000, hi: 103000 }, practicalLabel: "Physical build",
      vfx: { lo: 3000, c: 9450, hi: 28000 }, vfxLabel: "LED volume, 10 days",
      body: ["End of life matters as much as materials.  Sending 50 t of set timber to landfill nearly doubles an illustrative build's footprint, while recycling it adds almost nothing.",
             "LED volumes cut most of the build but draw real power: Sony measured one six-day shoot at about 16,000 kWh, 209% above its own spec-sheet estimate."],
      cost: "Practical: a studio tentpole's set construction line ran $19M.  LED volume: $3.5k–$15k+ a day, or $35k–$50k a week for a standing stage." },
    { key: "night", title: "Night exterior", seconds: 120, takes: { lo: 10, c: 30, hi: 100 },
      practical: { lo: 680, c: 900, hi: 1120 }, practicalLabel: "Diesel-powered night",
      vfx: { lo: 70, c: 120, hi: 170 }, vfxLabel: "Same night on grid power",
      body: ["Big night exteriors run 18 kW lamps on condors from tow-plant generators, which are usually oversized: 83% of measured production generators never passed half load.",
             "Swapping diesel for a grid tie-in or batteries already removes 60–90% of the lighting footprint."],
      cost: "Mostly crew time at night rates.  A studio tentpole's lighting line ran $7.1M." },
    { key: "rain", title: "Rain scene", seconds: 60, takes: { lo: 5, c: 10, hi: 30 },
      practical: { lo: 118, c: 300, hi: 590 }, practicalLabel: "Practical rain, 4 hours",
      vfx: { lo: 1, c: 3, hi: 6 }, vfxLabel: "Library rain elements",
      body: ["Practical rain is modest on carbon but heavy on water.  A car-set rain rig runs 500–800 L a minute, so 4 hours uses 48,000–240,000 L.",
             "Real rain on actors still reads best, which pushes productions toward a mix of both."],
      cost: "Practical: part of the effects budget.  Composited rain: $2k–$20k per shot." },
    { key: "impossible", title: "Creature or disaster shot", seconds: 5, takes: { lo: 15, c: 50, hi: 150 },
      practical: null, practicalLabel: "",
      vfx: { lo: 700, c: 1750, hi: 3150 }, vfxLabel: "Hero CG shot (2–9 MWh)",
      body: ["When practical isn't possible, the comparison is AI against VFX, and heavy VFX is energy-hungry.  Weta's single longest shot on <i>Avatar: The Way of Water</i> took 13.6 million thread-hours.",
             "Netflix's <i>El Eternauta</i> finished its AI building collapse about 10× faster than traditional VFX.  Hero creature performance is still hard to control with AI."],
      cost: "CG creature: $15k–$50k per shot, and $200k–$600k per scene for a hero creature.  Digi-doubles start around $300k per shot." },
    { key: "dialogue", title: "Two people talking", seconds: 120, takes: { lo: 10, c: 30, hi: 300 },
      practical: { lo: 29, c: 105, hi: 140 }, practicalLabel: "On a standing set",
      vfx: { lo: 600, c: 860, hi: 1300 }, vfxLabel: "A whole location day",
      body: ["This is where AI's advantage disappears.  On a set that already exists, the scene adds only a few hours of lighting.",
             "Performance and lip-sync push rerolls up, and at 30 or more takes per kept clip, AI can exceed the practical footprint."],
      cost: "Practical: cheap at the margin on an existing set.  AI still needs heavy human work on performance and lip-sync." },
  ],


  /* ---------- Access: what happens when anyone can generate ----------
     Rungs are annual kg CO2e.  The scenario uses Seedance 2.5 at 720p. */
  access: {
    model: "seedance25", res: "720p",
    rungs: [
      { key: "ukPerson", label: "One UK resident's year", kg: 4400, cls: "alt", src: "UK territorial emissions per person" },
      { key: "usPerson", label: "One American's year", kg: 14300, cls: "alt", src: "US territorial emissions per person" },
      { key: "indie", label: "One indie feature", kg: 271000, src: "Ecoprod Carbon'Clap 2024, French feature average" },
      { key: "tentpole", label: "One studio tentpole", kg: 3177200, src: "Sustainable Entertainment Alliance 2023–24, raised 1.3× to full footprint" },
      { key: "ukScreen", label: "All UK film and TV production, 2024", kg: 174437000, src: "BAFTA albert ACCELERATE 2025: 2,540 footprints" },
      { key: "netflix", label: "Netflix's production footprint, 2024", kg: 425000000, src: "Netflix 2024 ESG report: 1,037,226 t total, 41% from production" },
    ],
    // Disclosed volume, early 2026: 300–550 million generated seconds a day across platforms that
    // publish counts.  lo: 300 M s/day at 2 Wh/s; c: about 1.5 TWh a year; hi: 550 M s/day at Seedance 720p.
    world: { label: "All disclosed AI video, 2026", kg: { lo: 0.09e9, c: 0.6e9, hi: 4.4e9 } },
    prose: [
      "The calculator compares one production with one production.  That's the right question for a filmmaker, but it misses what makes generative video different: almost anyone can make it.  Shooting a scene takes a crew, a budget, and weeks of planning.  Generating one takes a text box and a subscription, so people generate far more video than anyone would ever shoot, and a lot of it is never watched by anyone.",
      "One person generating a minute of Seedance 2.5 a day for a year emits about 480 kg CO2e, around a ninth of a UK resident's annual footprint.  That doesn't register on its own.  Scale changes the picture.  About 560 people at that pace match an indie feature every year, about 6,600 match a studio tentpole, and about 360,000 match all UK film and TV production.",
      "That line is already behind us.  The platforms that publish counts generated about 300–550 million seconds of video a day in early 2026, the same as 5–9 million people making a minute each, and xAI says Grok Imagine alone made 1.2 billion videos in 30 days.  Most of that runs on lighter models than Seedance.  At an average of 10 Wh per generated second, it comes to roughly 0.6 Mt CO2e a year, about 3.4 times all UK film and TV production and more than Netflix's whole production slate.  At Seedance's energy it would be 2.4–4.4 Mt.  Cheaper tiers push the volume up: MiniMax's monthly generations rose 653% after it launched a new model and a cheaper Fast tier.",
      "Much of it is barely watched.  No platform publishes how much of what it generates gets posted, but professionals keep only one generated second in 57–107, and Volcano Engine says Seedance traffic peaked on weekends, when people play, until its 2.0 release.  In China, more than 95% of the 128,000 micro-dramas launched in early 2026 were AI-made, and only 0.117% of AI animated dramas reach 100 million plays.",
      "Views change the math, too.  A studio tentpole spreads about 3,200 t across something like 100 million viewers, roughly 15 g per hour watched.  A ten-second clip generated five times over and watched by 20 people comes to about 20 kg per hour watched, more than 1,000× worse.  Video that nobody watches has no audience to spread its footprint across at all.",
    ],
    facts: [
      { fig: "1.2 billion", text: "videos generated with Grok Imagine in 30 days, by xAI's own count (February 2026)." },
      { fig: "85,000+ hours", text: "of AI video generated each day on platforms that publish counts, more than the world's entire yearly output of fiction features (about 23,000 hours)." },
      { fig: "59%", text: "of a new TikTok account's For You feed was AI-generated in Kapwing's test.  On YouTube Shorts it was 21%." },
    ],
  },

  /* ---------- Factor table for the method section ---------- */
  factorTable: [
    ["Seedance 2.5 GPU energy, 720p", "18 Wh/s", "5–40", "OpenRouter latency benchmark, Jegham et al. 2026, and ByteDance's gross margin"],
    ["Seedance 2.5 resolution scaling", "480p 0.57×, 1080p 1.76×", "0.35–2.87×", "Pixels to the 0.7 power, bracketed by measured video models"],
    ["MiniMax H3 GPU energy, 768p", "7 Wh/s", "2–20", "MiniMax's H3 benchmark, less sparse attention"],
    ["Host and idle overhead", "1.43×", "1.15–2.1×", "Google's August 2025 serving study"],
    ["Data-center PUE, Johor and China", "1.3", "1.15–1.5", "Operator reports and regional surveys"],
    ["Grid, Johor (Seedance international API)", "602 g/kWh", "497–700", "Ember 2026"],
    ["Grid, China (MiniMax)", "530 g/kWh", "404–650", "China MEE 2023 national factor"],
    ["Water on site, Johor", "0.5 L per IT kWh", "0.12–1.9", "EcoLogits, Li et al., AWS, and Microsoft"],
    ["Water behind electricity, Johor", "1.7 L/kWh", "1.2–3.9", "EcoLogits and WRI"],
    ["Embodied hardware", "0.03 kg per GPU-hour", "0.006–0.055", "NVIDIA HGX carbon reports and Boavizta"],
    ["Training amortization", "+5%", "1–30%", "Seaweed-7B's 665,000 GPU-hours spread over use"],
    ["Seedance 2.5 price, 720p", "$0.231/s", "$0.13–$0.47", "BytePlus list, subscriptions, and resellers"],
    ["MiniMax H3 price, 768p", "$0.08/s", "$0.047–$0.10", "MiniMax list, subscriptions, and Runway"],
    ["US studio benchmark to full footprint", "1.3×", "1.15–1.5×", "Our assumption from albert and AdGreen category shares"],
    ["Diesel", "3.28 kg/L", "", "UK DESNZ 2025, with upstream fuel"],
    ["Long-haul flight, economy", "0.142 kg per passenger-km", "", "UK DESNZ 2025, with high-altitude warming and upstream fuel"],
    ["Long-haul flight, business", "0.411 kg per passenger-km", "", "UK DESNZ 2025"],
    ["Hotel night, US", "16.1 kg", "6.7–51.4 by country", "UK DESNZ 2025"],
    ["Meal", "2.7 kg mixed", "0.8 vegetarian, 9.9 beef", "WRAP and DEFRA"],
    ["Production water", "94 L per person per day", "", "<i>Raised by Wolves</i> season 2, the only published figure"],
    ["VFX shot rendering", "1,500 kWh typical", "150–5,000", "Weta, DreamWorks, and render-farm disclosures"],
    ["AI artist day rate", "$450", "$250–$1,000", "Freelance rate surveys, 2026"],
  ],

  /* ---------- Sources ---------- */
  sources: [
    { t: "Jegham, Gamazaychikov, and Luccioni, \"Lights, Camera, Carbon\" (arXiv 2607.04553, 2026)", u: "https://arxiv.org/abs/2607.04553" },
    { t: "Google, \"Measuring the environmental impact of delivering AI at Google scale\" (arXiv 2508.15734, 2025)", u: "https://arxiv.org/abs/2508.15734" },
    { t: "OpenRouter, Seedance 2.5 model page and latency data", u: "https://openrouter.ai/bytedance/seedance-2.5" },
    { t: "ML.ENERGY leaderboard, text-to-video tasks", u: "https://ml.energy/leaderboard/data/tasks/text-to-video.json" },
    { t: "MiniMax H3 open-weight release and benchmark", u: "https://github.com/MiniMax-AI/MiniMax-H3" },
    { t: "BytePlus ModelArk pricing and region documentation", u: "https://ai.byteplus.com/ark/region:ap-southeast-1/docs/ModelArk/1569618" },
    { t: "EcoLogits video generation methodology", u: "https://ecologits.ai/latest/methodology/video_generation/" },
    { t: "Li et al., \"Making AI Less Thirsty\" (arXiv 2304.03271)", u: "https://arxiv.org/abs/2304.03271" },
    { t: "Ember, Global Electricity Review 2026", u: "https://ember-energy.org/app/uploads/2026/04/Global-Electricity-Review-2026.pdf" },
    { t: "BAFTA albert, ACCELERATE 2025 report", u: "https://baftaalbert.org/wp-content/uploads/2026/04/ACCELERATE-2025-BAFTA-albert-report.pdf" },
    { t: "Sustainable Entertainment Alliance and Green Production Guide research", u: "https://greenproductionguide.com/industry-resources/research" },
    { t: "AdGreen 2025 update review", u: "https://cdn.prod.website-files.com/66797978774108bfe3dddcde/686bda7bf91f06a9fbc55ebc_AdGreen%202025%20Update%20Review%20lo-res.pdf" },
    { t: "AdGreen methodology", u: "https://www.weareadgreen.org/methodology" },
    { t: "Ecoprod, Carbon'Clap and Ecoprod label report 2024", u: "https://ecoprod.com/wp-content/uploads/2025/04/english_RAPPORT-CARBONCLAP-ET-LABEL-ECOPROD-2024.pdf" },
    { t: "UK DESNZ greenhouse gas conversion factors", u: "https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2025" },
    { t: "Netflix 2024 Environmental, Social, and Governance report", u: "https://s22.q4cdn.com/959853165/files/doc_downloads/2025/6/2024-Netflix-Environmental-Social-Governance-Report.pdf" },
    { t: "Sony Pictures, virtual production greenhouse gas analysis", u: "https://sonypicturesgreenerworld.com/sites/sonypicturesgreenerworld.com/files/2022-09/Sony%20Pictures_Virtual%20Production%20GHG%20Analysis_2022_2.pdf" },
    { t: "Hell Grind production coverage, CineD", u: "https://www.cined.com/hell-grind-the-95-minute-ai-feature-cannes-2026-says-it-never-screened/" },
    { t: "Coca-Cola's 2025 AI holiday ad, VP Land", u: "https://www.vp-land.com/p/coca-cola-s-ai-holiday-ad-how-70-000-generated-clips-built-a-familiar-yet-new-commercial" },
    { t: "House of David season 2 AI shots, VP Land", u: "https://www.vp-land.com/stories/house-of-david-season-2-used-253-ai-generated-shots-here-s-how-they-did-it" },
    { t: "Svedka's AI Super Bowl ad, The Hollywood Reporter", u: "https://www.hollywoodreporter.com/business/digital/svedka-super-bowl-ad-ai-watch-1236493612/" },
    { t: "Airbus H125 operating costs, Aviacost", u: "https://aviacost.com/aircraft-operating-cost-calculator/airbus-h125" },
    { t: "xAI, Grok Imagine 1.0 launch post (February 2026)", u: "https://x.com/grok/status/2018165333643997600" },
    { t: "Google, Veo and Flow usage updates", u: "https://blog.google/technology/ai/veo-updates-flow/" },
    { t: "MiniMax full-year 2025 results", u: "https://www.minimax.io/news/minimax-global-announces-full-year-2025-financial-results" },
    { t: "Kapwing, AI slop report", u: "https://www.kapwing.com/blog/ai-slop-report-the-global-rise-of-low-quality-ai-videos/" },
    { t: "IEA, Key Questions on Energy and AI (2026)", u: "https://iea.blob.core.windows.net/assets/3179f7f8-01f6-4dd6-bffa-c9f7b73f1dc9/KeyQuestionsonEnergyandAI.pdf" },
    { t: "Stephen Follows, feature films without a sales agent", u: "https://stephenfollows.com/p/how-many-feature-films-never-sign-with-a-sales-agent" },
    { t: "Our energy measurements of five open models on a base M4 Mac mini", u: "https://github.com/adachis/green-film-comparison-tool/blob/prompt-vs-camera/research/streams/J_mac_mini_measurements.md" },
    { t: "Full research streams, calculations, and timing data", u: "https://github.com/adachis/green-film-comparison-tool/tree/prompt-vs-camera/research" },
  ],

  /* ---------- Cost context ---------- */
  laborDayRate: { lo: 250, c: 450, hi: 1000 },    // AI artist day rate, USD

  /* ---------- Everyday equivalents ---------- */
  equiv: {
    carKmKg: 0.167,         // average car, kg CO2e per km
    phoneChargeWh: 15,      // one full smartphone charge, approximately
    showerL: 65,            // an 8-minute shower
    ukPersonYearT: 4.4,     // UK territorial CO2e per person per year
    usPersonYearT: 14.3,
  },
};
if (typeof module !== "undefined") module.exports = DATA;
