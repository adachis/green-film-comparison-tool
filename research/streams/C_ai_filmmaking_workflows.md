# Stream C: Real-world AI filmmaking workflows, generation ratios, and spend

Research date: 2026-09-25. Scope: how AI video is actually produced (takes discarded, ancillary generations, spend, time), to replace the naive "one generation per finished second" assumption in the calculator.

**Legend**
- **R_count** = generations (takes) per kept shot or clip. **R_sec** = generated video seconds per finished second. A "derived" value is my arithmetic on the reported figures, and the assumptions are stated.
- **Type:** P = primary (the creator's or company's own words, including direct quotes inside an article). S = secondary (a reporter's paraphrase, an aggregator, or a search-engine summary). V = vendor blog or marketing (the tool seller has an interest). "Snippet" = seen only in a search-result summary and not confirmed in fetched page text.
- **Confidence:** H = high, M = medium, L = low.
- **Method note:** the session's web-search quota (200 calls) ran out partway through, so later work used direct fetches of known URLs only. Section 4 lists the items that were left unresearched as a result.

---

## 1. Summary of key findings

1. **The "$25,000 to generate the winning Artlist Seedance entry" claim is NOT verified.** The contest is the **Artlist $250K Seedance 2.5 Challenge**. Entrants made 30-second videos with Seedance 2.5 on Artlist, posted them publicly with #ArtlistSeedance25, and were judged on creativity plus engagement. The deadline was August 26, 2026, and there were 12 named winners, including "Liza" by Eitan Cohen and Moran Moradi. Neither Artlist's winners page nor any other source I found discloses any entrant's spend, credits, generation count, or hours. The $25k figure may be a conflation of one of these:
   - the $250K prize pool;
   - "up to 25 creators… up to $10,000 each" (search snippet only);
   - the separate **Artlist Studio Challenge**, where finalists get 5M credits a month for a year, which Kingy AI, an Artlist ambassador, values at "roughly $28,000 worth of credits per finalist."

   **Sanity check:** at Artlist's roughly $0.25 per second for Seedance 2.5, $25k buys about 100,000 generated seconds. That would be about 3,300 generated seconds per finished second for a 30-second entry, which is far beyond any documented solo workflow.
2. **Documented shot-level ratios cluster at 2–27 takes per kept shot, but the tails are long:**
   - Lost Garden anime (Seedance 2, prepared solo creator, 2026): 2.4
   - invideo's 3-minute example: 4
   - Paul Trillo's Sora music video (2024): about 12.7
   - House of David VFX shots (2025): 20 ("For every VFX shot… we're generating 20 times that")
   - Kalshi NBA Finals ad (Veo 3, 2025): 20–27
   - Coca-Cola's 2024 squirrel shot: "a couple hundred"
   - Coca-Cola 2025: 70,000+ clips for a spot of about 20 shots, roughly 3,500 clips per final shot (an extreme flagship-brand outlier that includes multiple versions).
3. **In generated seconds per finished second, the ratios are higher.** Clips are 5–20 seconds long, but finished shots in commercials and music videos are often only 2–4 seconds.
   - Trillo: about 57:1 (230 minutes generated for about 4 minutes)
   - Kalshi: about 80–107:1 (derived)
   - Air Head (Sora, 2024): claimed "300:1", which fxguide in 2026 says is "north of 80:1" on a conservative reading
   - For comparison, conventional scripted narrative shoots at 10:1–30:1 (fxguide).
4. **Budgets and spend:**

   | Project | Spend | Scope |
   |---|---|---|
   | Kalshi ad | $2,000 | 30 s, 2–3 days, 1 person |
   | Puppramin spec ad | $500 of Veo 3 credits | under 1 day |
   | Lost Garden Ep. 2 | about $1,850 | 21 min, 75 h, solo (about $88 per finished minute) |
   | Where the Robots Grow | about $8,000 per minute | 87 min, 9 people, 90 days |
   | Cully Hill Boys (Higgsfield, Aug 2026) | $2M, half on AI tokens | 110 min, 4 weeks (about $9.1k per finished minute in tokens alone) |
   | Critterz | about $30M | 9 months |
   | Bitcoin: Killing Satoshi (hybrid) | $70M, vs a $300M traditional estimate | 20-day shoot plus 30 weeks of post with 55 AI artists |
   | Staircase Studios | target of under $500k per feature | — |

   Coca-Cola 2025 used about 100 people across the campaign and took about 1 month instead of about 1 year. Secret Level's version was made by about 20 people.
5. **Throughput** ranges from about 3.5 hours per finished minute (Lost Garden, anime style) and "20 seconds of usable footage per day" (Artlist's Luccia music video) up to about 60–160 person-hours per finished minute (Trillo and Air Head in the 2024 Sora era). All of these are derived.
6. **The professional pattern is image-to-video with pre-made keyframes and reference sheets.** Examples include Genre/PJ Ace's four-angle grid image per shot, Coca-Cola (images animated into video, with 10,000 images against 5,000 video segments in 2024), House of David (Midjourney into Runway/Kling), Luccia (Nano Banana into Seedance), and Lost Garden (boards into Seedance). Pure text-to-video is mostly early-era work (Air Head, Trillo) or fast comedic spots (Kalshi). Upscaling is near-universal for delivery but is applied only to kept shots. Native audio is now standard in the leading models (Seedance 2.5, Veo 3.x, Kling 2.6/3.0, Sora 2, MiniMax H3); Hailuo 2.3 has no audio.
7. **Long-form professional production uses AI mostly in pre-production and post, or as hybrid VFX, rather than as fully generated footage:**
   - Of BFI fund applicants, fewer than 2% intend AI in project outputs.
   - CVL Economics (N=300, 2023) found 68.7% of film/TV/animation firms were early adopters, using AI mainly for 3D models (44%), character and environment design (39%), and voice and compositing (37%).
   - Fully generated footage dominates in ads, social media, contests, and indie shorts.
   - WGA and SAG-AFTRA rules require consent and compensation for digital replicas and bar AI from being a credited "writer."

---

## 2. Data tables with sources

### 2.1 Artlist competitions

| Item | Value | What it measures | Source (date) | Type | Conf. |
|---|---|---|---|---|---|
| Name | Artlist $250K Seedance 2.5 Challenge | — | Artlist blog, winners page (dated 2026-08-12) | P | H |
| Rules | 30-s video generated with Seedance 2.5 on Artlist; challenge badge visible; posted publicly on IG, TikTok, YouTube, or LinkedIn with #ArtlistSeedance25, tagging @Artlist, and kept public; deadline "by August 26th" | eligibility | same | P | H |
| Judging | "creativity and engagement" (likes, comments, shares, saves) | criteria | same | P | H |
| Prize | $250,000 pool; "up to 25 creators… up to $10,000 each" | prize structure | Artlist page (pool) and search snippet (split) | P / snippet | H / L |
| Entries | "hundreds of entries" | volume | same | P | M |
| Winners (12) | Liza (Eitan Cohen & Moran Moradi); The Last Note (Ben Keil); Meteor (Auriona.studio); Rosa (Mush Dubezki); Pirate (Aviv Nachshon); Roosters (Nimrod Stiebel); BMW M3 (Jonathan Degueldre); Taxidermy (Netanel Hag); Crazy Plants (Merav Lev); Signs (AAIRONSTUDIO); Ed (Noadarr); Used Character (Flotantte) | — | same | P | H |
| Winner spend, credits, generations, hours | **Not disclosed anywhere I found** | — | winners page, LinkedIn, and search | — | — |
| "$25k to generate" claim | **Unverified**, no source found | — | — | — | — |
| Seedance 2.5 on Artlist | Up to 30 s in one generation; up to 50 multimodal references; dialogue, music, and SFX co-generated | model capability | Artlist blog 2026-08-02; MindStudio 2026-08-15 (1080p) | P / V | H |
| Artlist Seedance 2.5 price | 10-s clip ≈ 5,000 credits; about 2,000 credits per $1, so about $0.25/s | unit cost | Moe Lueker (Artlist-sponsored) 2026-08-12 | V | M |
| Artlist "unlimited" episode | Sold as unlimited for about $500/yr (AI Creator plan at $41.67/mo billed annually), advertised at about 2,550 s/day (about 85 × 30-s clips per day), withdrawn within about a week. CineD estimates about $0.47/s at 720p (about $14 per 30-s clip). Users estimate about 15,000 credits per 30-s generation; the remedy raised monthly credits from 80,000 to 180,000 (about 12 × 30-s clips per month) | pricing and heavy-use ceiling | CineD (2026) | S | M |
| Artlist Studio Challenge | Trailer of 30 s or more made in Artlist Studio; deadline 2026-05-25; 5–10 finalists get 5M credits a month for a year ("roughly $28,000 worth of credits per finalist"), then make a pilot of 2 minutes or more; grand prize is a $100,000 production fund. Winner not announced in sources found. Tip from Artlist's video: generate scenes in "bite-sized portions of approximately five seconds." | contest | Artlist blog; Kingy AI 2026-05-18 | P / S | H / M |
| Artlist Big Game Ad Challenge | $60,000 prize for one creator | contest | Artlist blog 2026-02-04 | P | H |
| Artlist's own Super Bowl LX spots | 3 spots, 5 days, 3 small teams; Nano Banana Pro plus Seedance 1.5 plus Kling 2.6, combined with live action and animation. An Artlist exec wrote "5 days, 2% of the cost." "<$5,000" appears only in a search snippet. | time and cost | Artlist blog 2026-02-04; Liran Friedman LinkedIn post | P / snippet | H / L |

### 2.2 Other competitions and festivals

| Competition | Key facts | Spend or generation data? | Source | Type | Conf. |
|---|---|---|---|---|---|
| Global AI Film Award (1 Billion Followers Summit and Google Gemini) | Launched Sep 2025; rules required 7–10 minutes and at least 70% AI-generated with Google tools (Gemini, Veo, Imagen, Flow); 3,500 entries from 116 countries; winner announced **Jan 11, 2026** in Dubai, so the award is dated 2026, not 2025; $1M prize | None disclosed | blog.google 2026-01-14; studio.aifilms.ai | P / S | H |
| Winner "Lily" (Zoubeir Jlassi/ElJlassi, Tunisia) | About 9 min, French-language; Veo, Flow, Imagen, and Gemini. "About one month" to make appears only in a snippet | No spend or generation counts | same, plus maghrebnaute | P / S | H (facts) / L (time) |
| Runway AI Film Festival (AIF) | About 300 submissions in the first year, about 6,000 in 2025; the 2025 finalists ran 2–10 minutes; 2025 Grand Prix "Total Pixel Space" (Jacob Adler, about 9 minutes). 2026 edition renamed "AI Festival," with 10 film winners plus category winners, announced about Apr 30, 2026 | Adler worked for more than a year and made "tens of thousands of images" (search summary of Artnet) | Deadline 2025-06-06; aif.runwayml.com | P / S | H / L |
| Chroma Awards (ElevenLabs et al.) | 2025 inaugural: more than 6,500 submissions, $175K cash, $1M in sponsor trials, 11 winners screened in London (Feb 2026) | None | Deadline 2026-02-18; Devpost | S | M |
| Project Odyssey (Civitai) | S2: Dec 16, 2024 to Jan 19, 2025; more than $70k cash plus more than $750k in trials; 9 categories including Behind-the-Scenes. S1 and S2 together: about 4,500 submissions, about 190 hours of film (about 2.5 min average), 2,000+ teams. S3 merged into Chroma ($175k, 26 categories) | None found (BTS entries were not reviewed) | Civitai 2025-01-12; projectodyssey.ai; studiolist (snippet) | P / S | M |
| Luma Dream Brief (2026) | About 400 ad submissions in under 8 weeks; **more than 10,000 hours logged** (about 25 hours per entry, derived); 21 finalists sent to Cannes Lions; $1M if a Gold Lion is won; one finalist spot had 85 shots | Hours only | lumalabs.ai 2026-04-09 | P | M |
| Cinema Synthetica (AI on the Lot, 2024) | 48 hours, 3 teams of 3, 2-min films; every team used live action (one shot about 90% live action and then restyled) | Time only | VP Land 2024-05-21 | S | M |
| Higgsfield, Kling, MiniMax/Hailuo, Curious Refuge, Flow TV/"Flow Sessions", and Sora showcase contests | Not researched (search quota exhausted) | — | — | — | — |

### 2.3 Documented projects (master table)

| Project (year) | Model(s) | Finished runtime | Generations / clips | Ratio | $ spend | People | Time | Source (date) | Type | Conf. |
|---|---|---|---|---|---|---|---|---|---|---|
| **Air Head**, shy kids (2024) | Sora (preview), 480p, upscaled with Topaz | ~90 s | "hundreds of generations at 10 to 20 seconds a piece"; renders of about 10–20 min each | Claimed **"probably 300:1"** (source material to final); fxguide 2026: conservatively ">80:1" R_sec | n/a | 3 | 1.5–2 weeks | fxguide 2024-04-14; TechCrunch 2024-04-27; fxguide 2026-08-28 | P (quotes) | H |
| **Washed Out "The Hardest Part"**, Paul Trillo (2024) | Sora, 720p upscaled to 2K with Topaz | ~4 min | "almost 700 clips… used about 55 or 56… about 10%"; about 230 min generated; clips about 20 s | **R_count ≈ 12.7; R_sec ≈ 57** (derived) | fxguide's own compute guess of $644 (not an actual cost) | 1 (director) | "about six weeks"; renders 15 min–1 h each | No Film School 2024-05-02; fxguide 2024-05-08 | P | H |
| **Toys"R"Us "Origin"**, Native Foreign (2024) | Sora plus corrective VFX | ~1 min | "hundreds of iterative shots" condensed to "a couple dozen" | R_count ≈ 8–20 (derived, loose) | n/d | about a dozen (incl. corrective VFX) | "few weeks" | Marketing Dive 2024-06-25; search summary | S | M |
| **Kalshi NBA Finals**, PJ Accetturo (Jun 2025) | Veo 3 (8-s clips); Gemini for the script, shot list, and prompts | 30 s | "300–400 generations to get 15 usable clips" | **R_count 20–27; R_sec ≈ 80–107** (derived, assuming 8 s per generation) | **$2,000** | 1 | 2–3 days | Business Insider via Yahoo 2025-06-13; PJ's thread quoted by thedaringcreatives | P | H |
| Puppramin spec ad, PJ Accetturo (2025) | Veo 3 | short | n/d | n/d | $500 in Veo 3 credits | 1 | under 1 day | thedaringcreatives | P (quote) | M |
| Genre (PJ Ace) standard process (2026) | image grids, then video | ads | "30 to 40 shots in the project"; each shot gets one **4-angle grid image** for spatial consistency | — | "far cheaper than a million dollar commercial" | team | about 1 month creative plus "another couple weeks" production (vs "three plus months" traditional) | Media Brain podcast transcript 2026-02-03 | P | H |
| **Coca-Cola "Holidays Are Coming" 2024** (Silverside AI, Secret Level, Wild Card) | Leonardo, Luma, Runway, Kling (+ Sora, MiniMax) | 3 versions, >100 final assets | **>10,000 images and 5,000 video segments** (PJ Pereira, Silverside); squirrel shot "a couple hundred" iterations (Jason Zada) | about 50 video segments and 100 images per final asset (derived); images-to-video ≈ 2:1 | n/d; Zada: traditional would be "several million dollars" | n/d | about 2 months (Silverside, snippet) | The Decoder 2024-11-16 | P (quotes) | H |
| **Coca-Cola 2025** (Silverside AI and Secret Level) | Veo 3, Sora, Comfy/Flux, Runway, Kling, Luma, Higgsfield, Krea, upscalers | 2 versions (global and US); about 20 shots (VP Land) | **>70,000 video clips** (WSJ); 5 AI specialists at Silverside | ≈ 3,500 clips per final shot (derived; includes versions and exploration) | n/d ("less" than traditional) | about 100 total (Coke, WPP, 2 studios); Secret Level's version "done by 20 people" | about 1 month (vs about 1 year) | WSJ via Futurism 2025-11-05; TheWrap 2025-11-03; THR/Zada 2025-11-06; Implicator 2025-11-04; VP Land 2025-12-23 | P / S | H (counts) / M (shots) |
| **House of David** S1/S2 (Amazon/Wonder Project, 2025) | Midjourney, Runway, Kling, Magnific, Topaz, Unreal, AE ("10 to 15 core tools") | series | S1: 73 AI shots; S2: 253 AI shots (Culver Cup talk) or 350–400 (Wired via TheWrap), plus more than 150 shots of AI-assisted LED-wall environments | **"For every VFX shot in the show, we're generating 20 times that"** (R_count ≈ 20); only kept shots are upscaled to 4K HDR | "minuscule" vs traditional VFX; traditional Unreal environment build costs $15k–$200k and takes 10–12 weeks | production team | less than 1 year between seasons | VP Land 2025-10-16; TheWrap 2025-11-10 | P (quotes) | H |
| **El Eternauta** (Netflix and Eyeline, 2025) | undisclosed gen-AI | 1 sequence (building collapse) | n/d | n/d | "10 times faster" than traditional VFX; otherwise not affordable on the show's budget | Eyeline | n/d | Sarandos on the 2025-07-16 earnings call, via Vice/BBC | P (quote) | H |
| **Ancestra** (Primordial Soup and Google DeepMind, 2025) | Veo, Imagen (fine-tuned), Gemini; live action | short (Tribeca 2025-06-13) | n/d | n/d | n/d | more than 200 incl. live-action crew and VFX | n/d | blog.google 2025-06-13 | P | H |
| Goodnight, Lamby (Primordial Soup, 2026) | DeepMind tools plus live action and sculpture | short (Cannes Classics 2026) | n/d | n/d | n/d | n/d | n/d | VP Land 2026-05-16 | S | M |
| **Critterz** (Vertigo, Native Foreign, OpenAI) | OpenAI stack plus Vertigo's "Woven"; human voice cast | feature | n/d | n/d | **about $30M** ("under $30M" per WSJ) | n/d | 9 months (vs about 3 years) | Deadline 2026-05-04; WSJ via secondary | S | H |
| **Bitcoin: Killing Satoshi** (Doug Liman, Acme AI & FX, 2026) | AI backgrounds and lighting on a gray-screen stage; performances unaltered | feature | n/d | n/d | **$70M** (Acme estimates $300M traditionally) | 107 cast, 100 on-set crew, 54 non-shoot crew, **55 AI artists** | 20-day shoot plus 30 weeks of post | VP Land 2026-04-17 citing TheWrap | S | M |
| **Cully Hill Boys** (Higgsfield, Aug 2026) | Higgsfield stack; licensed likenesses; human screenwriter | **110 min** | n/d | n/d | **$2M total, "half of which went to AI tokens"** (about $9.1k per finished minute in tokens, derived) | n/d | "four weeks" | Semafor 2026-08-19 | S | M |
| **Where the Robots Grow** (AiMation, Tom Paton, 2024) | Firefly, Stable Diffusion, custom pipeline, ElevenLabs | 87 min | n/d | n/d | about $8,000 per minute (about $0.7M, derived) | 9 | 90 days | Forbes/Fink 2024-10-17 (snippet); ElevenLabs post | S | M |
| Staircase Studios AI (2025) | "ForwardMotion" workflow | features | n/d | n/d | target of **under $500,000 per film**; about 30 films in 3–4 years | n/d | n/d | THR 2025-03-04 | P (company claim) | M |
| Utopai Studios (2026) | "PAI" plus live action | 3 films and 2 series for 2027 | n/d | n/d | Forbes estimates under $10M each (company declines to say) | n/d | n/d | Forbes 2026-05-21 (snippet); Variety 2026-08-27 | S | L |
| **ASIRI ILU AWON OSU** (Nigeria, 2026) | undisclosed; live action for 20% | more than 3 hours | n/d | about 80% of visuals AI | n/d | n/d | 3 months | VP Land 2026-08-23 citing Punch | S | M |
| **Ink** (Danny Boyle, 2026) | gen-AI for 2 animated photos and CG mice | feature | — | about **30 s** of gen-AI in the film | n/d | n/d | n/d | VP Land 2026-09-06 citing Deadline and Vanity Fair | P (quote) | H |
| As Deep as the Grave (2026) | AI performance of Val Kilmer built from archival material, with estate consent and SAG compliance | Kilmer's character is in more than an hour of the film | n/d | n/d | n/d | n/d | n/d | VP Land 2026-04-17 citing Variety | S | M |
| The Frost (Waymark, 2023) | DALL-E 2 stills animated with D-ID | 12 min | "over 1,000,000 images" (snippet only) | n/d | n/d | n/d | n/d | MIT Tech Review 2023-06-01 | P / snippet | H (format) / L (count) |
| NinjaPunk (Promise, 2025) | gen-AI, 3D, and mocap plus live action | short | n/d | n/d | n/d | n/d | 3-day stunt shoot | VP Land 2025-05-13 | S | M |
| Phantom X (2025) | Arcana Labs actor models plus Runway Act-One; live voices | n/d | n/d | n/d | n/d | SAG-approved film-specific likeness licences | n/d | VP Land 2025-06-23 | S | M |
| Lionsgate–Runway | custom model on 20,000+ titles | — | — | — | — | — | underdelivered: "The Lionsgate catalog is too small to create a model… the Disney catalog is too small" | TheWrap 2025-09-22 | S (anon. sources) | M |
| Toonstar | AI animation engine | YouTube series (StEvEn & Parker, 30M weekly viewers) | n/d | n/d | "up to 90% cheaper"; traditional network animation costs $50–70k per minute | n/d | "80% faster" | NYT via Mediagazer (2025); Forbes 2024 (snippets) | S | L |
| Super Bowl LX (Feb 2026) | various | 30 s spots | — | — | Ad Age baseline: a national spot costs $250k–$500k to produce | — | about 15 of 66 ads involved AI; Svedka's "Shake Your Bots Off" was billed as the first primarily AI-generated national SB ad | Playcut 2026-06-01 (aggregating Ad Age) | S | M |

Not researched (search quota exhausted): Heinz, Puma, Under Armour, Volkswagen, Channel 4, Kalshi's later ads, Invisible Universe, Luma Dream Lab client work, Asteria's budget, and The Sweet Idleness's budget (Wikipedia confirms only the premise and the AI "director" FellinAI).

### 2.4 Creator- and vendor-level breakdowns (hobbyist to semi-pro)

| Case | Runtime | Generations / ratio | $ | Hours | Source | Type | Conf. |
|---|---|---|---|---|---|---|---|
| **Lost Garden Ep. 2** (solo anime; Dreamina OCTO/Seedance 2, Midjourney, ElevenLabs, Suno, Resolve) | 21:24 | ~400 shots kept; **~2.4 generations per kept shot** (under 1,000 generations); about 19 shots per minute | **$1,850** (another page says $1,852) | **75 h** (another page says 65 h) | ScreenWeaver blog 2026-09-19 (first-person creator account; the creator appears to be affiliated with the vendor) | P/V | M |
| Lost Garden Ep. 1 | 17:12 | — | — | 63 h (creator's YouTube update 2026-06-23) | ScreenWeaver 2026-09-19 | P/V | M |
| Artlist "Luccia" music video (Nano Banana, Photoshop cleanup, Seedance) | music video | benchmark **"20 seconds of usable footage per day"** | n/d | "a month of trial and error"; one scene took 3 days | Artlist blog 2026-08-24 | P | M |
| invideo "documented" shorts | 70 s; 90 s; 3 min; 2 min | 90-s horror: about 400 video plus 30 image generations; 3-min animated: 164 generated and 41 used (**4:1**) | $750; $870; $950; $1,500; $5,000 (20,000 credits, 4 people) | 2–5 days | invideo blog (creators not named) | V | L |
| Clixie (corporate creator, 2025–26) | 1,200 usable clips | discarded "about 80%" (about **5:1**); "iterating 20 times to get a hand gesture right" | about $15,000 in credits and subscriptions over 18 months | — | clixie.ai blog | V | L |
| MindStudio guides (Seedance 2.0) | 3 min | "40–60% usable clip rate on first generation"; 40–60 final clips; 10–15 character-design variations; 3–5 options per location | $34–66 or $100–250 | 20–30 h | mindstudio.ai 2026-06 | V | L |
| ScreenWeaver reroll model | — | Illustrative brackets (the vendor says they are not measured): unprepared 5–10 takes per usable shot; prepared about 2–3. Calculator profiles: clean 1.5, typical 3, perfectionist 5. Music video planning figure: "about 13 generated clips per clip kept." Voice lines about 5 takes each. "Every hour on the board saved ~5 hours of generating." | $112 for a 6-min short (45 shots × 8 s) | 60 h | screenweaver.ai 2026-08/09 | V | L–M |

### 2.5 Derived throughput and cost per finished minute

| Case | Person-hours per finished minute (derived) | $ per finished minute | Notes |
|---|---|---|---|
| Lost Garden Ep. 2 | about 3.5 | about $88 | anime, 3-s shots, highly systematized solo workflow |
| Luccia | about 24–30 (3 days per minute at 8–10 h/day) | n/d | "20 s usable per day" |
| Kalshi | about 32–60 (16–30 h for 0.5 min) | about $4,000 | the $2,000 figure's scope (AI costs only or total) is unclear |
| Trillo | about 60 (6 wk × 40 h ÷ 4 min) | n/d | Sora preview era |
| Where the Robots Grow | about 50–75 (9 people × 90 days) | about $8,000 | whole-production cost |
| Air Head | about 120–160 (3 people × 1.5–2 wk) | n/d | Sora preview; heavy roto and cleanup |
| Luma Dream Brief entries | about 25 h per entry | n/d | entry runtimes unknown |
| Cully Hill Boys | n/d | about $18k total; about $9.1k in tokens | 110 min in 4 weeks |
| Cross-check: API price times ratio | — | Kalshi: $2,000 ÷ 30 s = $67 per finished second. At a Veo 3-class price of about $0.75/s (the top of fxguide's Aug-2026 API range, $0.05–$0.75/s; June-2025 list price not re-verified), that implies about 89 generated seconds per finished second, consistent with the 80–107 derived from counts. | — |

### 2.6 Pricing and spec anchors that bear on the workflow

| Model or platform | Clip length | Audio | Unit price | Source | Conf. |
|---|---|---|---|---|---|
| Seedance 2.5 (Artlist, Dreamina) | up to 30 s single take | native (dialogue, SFX, music, lip-sync) | Artlist about $0.25/s; CineD estimate about $0.47/s at 720p; 8-s 720p clip costs $2.55–$5.76 across 5 platforms (about $0.32–$0.72/s) | Moe Lueker 2026-08-12; CineD; Higgsfield blog 2026-08-06 | M |
| Seedance 2.0 | 5–10 s ("clips up to 10 seconds") | varies by host (MindStudio says none) | "Seedance 2.0 video generations $15–25 for a 3-min short" | MindStudio (V) | L |
| Hailuo 2.3 (MiniMax) | 6 or 10 s (Standard); 5 s (Pro); 6 s (Fast); 5 or 10 s (Fast Pro) | **none** | Fast variant up to 50% cheaper | Artlist blog 2026-01-28 | H |
| MiniMax H3 (Jul 2026) | up to 15 s, 2K (768p option) | native stereo | claims under 1/3 the price of mainstream models at 2K | VP Land 2026-07-31 | M |
| Veo 3 / 3.1 | 8 s | native | — | Artlist, Clixie | M |
| Kling 2.6 / 3.0 | up to 15 s (3.0) | native | — | Artlist; VP Land | M |
| Sora 2 | up to 12 s on Artlist (20 s Pro) | native | — | Artlist; Clixie | M |
| Generic API (Aug 2026) | — | — | **$0.05–$0.75 per generated second** | fxguide 2026-08-28 | H |

### 2.7 Industry adoption surveys (how AI is realistically used)

| Finding | Value | Source | Type | Conf. |
|---|---|---|---|---|
| UK producers who had used gen-AI in production (2023, n=70) | 17%, plus 40% planning to | Pact 2024 via BFI/CoSTAR report (June 2025) | S (cited) | H |
| US M&E decision-makers using gen-AI in their organisation (Aug 2024, n=65) | 49% | Schomer 2024 via BFI | S | M |
| French screenwriters, producers, directors, and DPs who had used gen-AI (CNC, n=794, 2024) | 40%; 77% of those users continued, 35% daily or regularly | CNC via BFI | S | H |
| UK screen workers who "frequently use specific AI tools" (QUB 2024) | 8 of 39 | via BFI | S | M |
| BFI fund applicants intending AI in **project outputs** (3,257 applications, 2023–25) | **1.1–2.0%**; about 8% used AI to write the application | BFI Table 1 | P | H |
| Flemish fund (VAF): AI use in completed projects vs at application | 22% vs 28%, "mainly… administrative and technical tasks… text tools" | via BFI | S | M |
| BFI's characterization | The "iceberg": use is concentrated in pre-production (ideation, concept) and post/VFX (roto, upscaling), with little onscreen. Examples: Flawless visual dubbing ("vubbing"), Metaphysic de-aging on *Here*, Respeecher on *The Brutalist*, Wonder Dynamics | BFI/CoSTAR June 2025 | P | H |
| Share of audiences wanting AI disclosure | 86% of British respondents (75% internationally) | via BFI | S | M |
| CVL Economics "Future Unscripted" (N=300 execs, Nov–Dec 2023) | 72% of firms were early adopters; FTV&A 68.7%; post-production firms adopt most. Among FTV&A early adopters: 44% use AI for 3D models, 39% for character and environment design, 37% for voice generation/cloning and compositing. 75% said AI supported eliminating, reducing, or consolidating jobs. 21.4% of FTV&A jobs (about 118,500) were projected to be disrupted by 2026. 44% expected convincing AI dubbing; gaming respondents: 22% use AI for storyboarding, 40% for concept art | CVL/Animation Guild PDF, Jan 2024 | P | H |
| Creators Coalition on AI tracker (Sep 2026) | Rates about 150–185 roles against 65 AI technologies on a 0–5 scale; most pairings flagged as knowledge gaps; about 250 respondents at launch | VP Land 2026-09-11 citing THR | S | M |

### 2.8 Union and guild constraints

| Rule | Content | Source | Conf. |
|---|---|---|---|
| WGA 2023 MBA | Neither traditional AI nor gen-AI is a writer, and AI output is not "literary material." AI material given to a writer is not source or assigned material. Writers may use AI with company consent but cannot be required to. Companies must disclose AI-generated material. WGA reserves the right to assert that training on writers' work is prohibited. | wga.org AI page (fetched 2026-09) | H |
| SAG-AFTRA 2023 TV/Theatrical | Clear informed consent and compensation are required for employment-based and independently created digital replicas; producers must give notice and a chance to bargain before using synthetic performers in place of humans. From widely reported contract summaries; the sagaftra.org page was not fetchable (403). | contract summaries (not re-fetched) | M |
| Practice examples | Phantom X: SAG approval with film-specific likeness licences that prevent model reuse. As Deep as the Grave: estate-compensated, SAG-guided AI performance. Danny Boyle: AI is acceptable "provided you pay actors if you're going to replace them." | VP Land 2025-06-23, 2026-04-17, 2026-09-06 | M |
| 2026 successor agreements (WGA/SAG-AFTRA) | Not verified | — | — |

### 2.9 Workflow-structure evidence

| Dimension | Evidence |
|---|---|
| **Keyframe and reference images per shot** | Genre: 1 four-angle grid image per shot, with 30–40 shots per ad. Lost Garden: boards for every shot at about 2.4 generations per kept board, plus Midjourney character sheets. Coca-Cola 2024: 10,000 images against 5,000 video segments (about 2 images per video generation). MindStudio (V): 10–15 variations per character design and 3–5 per location. House of David: Midjourney stills into video. Luccia: Nano Banana sheets, cleaned in Photoshop, then Seedance. Kalshi, Air Head, and Trillo: text-to-video with no keyframes. |
| **Typical clip length generated** | 2024 Sora: 10–20 s. Veo 3: 8 s. Kling, Hailuo, and Seedance 2.0: 5–10 s. Seedance 2.5: up to 30 s. Artlist's own advice is to generate in about 5-s pieces to limit drift. |
| **Used length per kept shot** | Kalshi about 2 s (15 clips in 30 s). Lost Garden about 3.2 s. Trillo about 4.4 s. ScreenWeaver: music video about 2.5 s, narrative about 8 s. Genre: 30–40 shots per ad. |
| **Upscaling** | Near-universal for delivery and applied **only to kept shots**: Air Head (480p via Topaz), Trillo (720p to 2K via Topaz), House of David ("only shots that make the cut get upscaled" to 4K HDR), Coca-Cola 2025 (upscalers), USC ETC "The Bends" (8-bit 720p H.264 to a 16-bit HDR EXR pipeline via Topaz, three steps). |
| **Audio** | Native co-generation in Seedance 2.5, Veo 3.x, Kling 2.6/3.0, Sora 2, and MiniMax H3; none in Hailuo 2.3. Separate human VO: Air Head and Phantom X (deliberately human). Separate AI voice: ElevenLabs in Lost Garden, Where the Robots Grow, and Total Pixel Space; TTS about 5 takes per line (ScreenWeaver, V). Music: human in Air Head, Coca-Cola (live choir and musicians), and Luccia; Suno in Lost Garden. |
| **Edit and post** | Every professional case adds grading, retiming, roto/cleanup, compositing, and logo work (Air Head, Coca-Cola, Toys"R"Us "corrective VFX"). House of David hands generated batches to editorial "similar to traditional footage." |

---

## 3. Synthesized workflow and ratio model

### 3.1 Structure (per finished minute)

```
shots_per_min        = 60 / avg_used_shot_len
video_gens_per_min   = shots_per_min × R_count
video_gen_seconds    = video_gens_per_min × gen_clip_len
R_sec                = R_count × (gen_clip_len / avg_used_shot_len)
image_gens_per_min   = shots_per_min × images_per_kept_shot + ref_sheet_images (amortized)
upscale_seconds      = 60 × upscale_factor (kept footage + handles only)
audio                = 0 if the model has native audio; else TTS_s = dialogue_s × voice_takes, music_gens per track
```

### 3.2 Recommended R_count (takes per kept shot)

| Use case | Low | Typical | High | Anchors |
|---|---|---|---|---|
| Hobbyist short (1–5 min) | 2 | 4 | 10 | Lost Garden 2.4; invideo 4; Clixie 5; ScreenWeaver unprepared 5–10 |
| Professional short or festival entry | 5 | 12 | 30 | Trillo 12.7; House of David 20; Air Head (hundreds of takes for a handful of shots) |
| Commercial or brand spot | 8 | 25 | 200 (flagship outlier about 3,500) | Toys"R"Us about 8–20; Kalshi 20–27; Coke squirrel "couple hundred"; Coke 2025 about 3,500 per shot |
| Music video | 5 | 13 | 25 | Trillo 12.7; ScreenWeaver planning figure 13 |
| Single VFX shot in a live-action film | 5 | 20 | 50 | House of David "20 times"; El Eternauta and Ink undisclosed |
| Previz or storyboards | 1.5 | 3 | 6 | Lost Garden 2.4 per board; Genre 1 grid image per shot (weak evidence) |

Skill and prep modifiers: prepared (locked references, boards, shot list) ×0.5–0.7; unprepared or novice ×1.5–2. Evidence is weak here: ScreenWeaver's brackets are illustrative, and the gap between Lost Garden at 2.4 and Clixie at about 5 supports the direction.

### 3.3 Recommended R_sec (generated video seconds per finished second)

| Use case | Low | Typical | High | Default clip / used-shot assumption |
|---|---|---|---|---|
| Hobbyist short | 3 | **8** | 30 | 5–8 s generated, about 3–4 s used |
| Professional short or festival entry | 10 | **30** | 100 (2024 Sora cases: 57–300) | 8–10 s generated, about 4 s used |
| Commercial or brand spot | 20 | **80** | 500 (flagship multi-version outliers can reach 10³–10⁴) | 8 s generated, about 2–3 s used (Kalshi about 80–107) |
| Music video | 15 | **40** | 100 | 8–10 s generated, about 2.5–4 s used (Trillo 57) |
| VFX shot inside a live-action film | 10 | **30** | 100 | 5–8 s generated, 3–5 s used |
| Previz (video animatics) | 1.5 | **4** | 10 | mostly images; rough takes accepted |

For comparison, conventional scripted live action runs at 10:1–30:1 (fxguide). A typical AI commercial therefore "shoots" 3–8 times more footage (in generated seconds) than a live-action narrative shoot, even though each take is far cheaper.

### 3.4 Ancillary generations (defaults per finished minute)

| Item | Low | Typical | High | Basis |
|---|---|---|---|---|
| Keyframe images per kept shot (image-to-video workflows) | 1 | 3 | 10 (Coke-scale about 40, derived from its 2:1 image-to-video ratio) | Genre grid, Lost Garden 2.4, Coca-Cola 2024 |
| Reference-sheet images per character / per location (one-off) | 5 / 2 | 12 / 4 | 30 / 10 | MindStudio 10–15 and 3–5 (V) |
| Text-to-video-only workflows | 0 images | — | — | Kalshi, Air Head, Trillo |
| Upscale passes (seconds per finished second) | 1.0 | 1.2 | 2–3 (multi-step to 4K/HDR) | House of David, Trillo, ETC |
| Voice (when not native): takes per line | 2 | 4 | 8 | ScreenWeaver about 5 (V, L) |
| Music: generations per used track | 3 | 10 | 30 | **Assumption, no data found** |
| Native-audio models (Seedance 2.5, Veo 3, Kling 3, Sora 2, H3) | no separate audio generation | | | |

### 3.5 Seedance 2.5 and Hailuo adjustments

- **Seedance 2.5 (primary model).** It generates up to 30 s per take with native audio and multi-shot scenes, so a take can cover several finished shots. For 30-s skits or ads made as a single sequence, model **R_count per sequence of 5–15 (typical 8)** and a trim factor of about 1–1.3, giving R_sec ≈ 6–20. This is an assumption: no public generation counts exist for Seedance 2.5 entries. For conventional shot-by-shot work, use about 5–10-s generations, as Artlist itself advises (about 5-s pieces), and apply the use-case tables above. The heavy-use ceiling is about 2,550 s/day per user (Artlist's withdrawn "unlimited" allowance).
- **Hailuo 2.3 (secondary model).** It generates 6–10-s clips with no audio, so add separate TTS, SFX, and music generations and lip-sync passes. Its Fast variants are about 50% cheaper and image-to-video only, which suits drafting passes (for example, "draft on cheap or unlimited models, spend on premium renders").

### 3.6 Worked example (the typical commercial default)

A 30-s spot has 12 shots of about 2.5 s each. At R_count 25 that means 300 generations. At 8 s each that is 2,400 s of video (R_sec 80), plus about 36 keyframe images (3 per shot) and about 36 s of upscaling. This matches Kalshi (300–400 generations for 15 clips; $2,000; 2–3 days).

### 3.7 Workflow patterns and share-of-runtime defaults

| Pattern | Where dominant | Default AI share of runtime |
|---|---|---|
| Image-to-video with pre-made keyframes and reference sheets | professional ads, AI studios, series (Genre, Coca-Cola, House of David, Luccia, Lost Garden) | 100% of the AI shots |
| Text-to-video (now often with native dialogue) | fast comedic ads, social skits, contests (Kalshi, Seedance 2.5 skits) | 100% |
| Video-to-video, restyle, or performance transfer | hybrid indies and music videos (Cinema Synthetica team at about 90% live action restyled; Phantom X with Runway Act-One; Linkin Park "Lost") | varies |
| Hybrid live action plus AI VFX (set extension, crowds, environments, background replacement, de-aging) | studio and streamer long-form (House of David, El Eternauta, Ink, Bitcoin: Killing Satoshi, Ancestra) | **about 0.5% (Ink, about 30 s) up to most shots for backgrounds only (Bitcoin); use 1–10% of shots as the default for "a film with some AI VFX"** |
| Fully or mostly generated feature | Where the Robots Grow, Cully Hill Boys, ASIRI (80%), Lily (at least 70% by rule) | 70–100% |

---

## 4. Gaps and uncertainties

1. **The $25k Artlist claim is unverified.** No source discloses any Seedance 2.5 challenge entrant's spend, credits, generations, or hours. The winners page date (2026-08-12) also sits oddly with the "by August 26th" deadline; the page may have been updated in place.
2. **No independent survey quantifies generations per usable shot, the share of budget spent on generation, or hours per finished minute.** The Curious Refuge, Runway, Artlist trend-report, a16z, Wistia, and Adobe surveys were not retrieved because the search quota ran out. The only "survey-like" ratio figures (40–60% usable, 5–10 takes unprepared) come from vendor blogs, and ScreenWeaver explicitly calls its own brackets illustrative.
3. **Many headline counts are ambiguous.** Coca-Cola's "70,000 clips" and "10,000 frames and 5,000 segments" span multiple versions, markets, and exploration. Air Head's "300:1" doesn't reconcile with "hundreds" of 10–20-s generations (fxguide concedes this). The Kalshi $2,000 may or may not include the director's fee.
4. **Many ratios are derived.** Seconds-based ratios assume a clip length (for example, 8 s for Veo 3). Person-hour figures assume 8-hour days or 40-hour weeks.
5. **2024 Sora-era ratios (Air Head, Trillo) probably overstate current needs.** Reference-conditioned 2025–2026 models (Lost Garden at 2.4) are far more efficient, but flagship brand work still burns huge volumes.
6. **Not researched:** Heinz, Puma, Under Armour, Volkswagen, Channel 4, Kalshi's later ads; Higgsfield, Kling, and MiniMax/Hailuo contests; Curious Refuge; Google Flow TV/"Flow Sessions"; the Sora showcase; Invisible Universe; Luma Dream Lab client specifics; Asteria's budget; the 2026 WGA and SAG-AFTRA successor terms; the Artlist Studio Challenge winner.
7. **Several items rest only on search snippets** (the lowest confidence): Lily's "about one month"; The Frost's "1,000,000 images"; the Artlist Super Bowl "<$5,000"; the Seedance challenge's "up to 25 × $10,000"; Total Pixel Space's "tens of thousands of images"; Where the Robots Grow's "$8,000 per minute"; Toonstar's "90% cheaper."
8. **Music and SFX generation counts** have no data at all; the section 3.4 values are assumptions.
9. **Vendor bias:** invideo, MindStudio, ScreenWeaver, Clixie, Higgsfield, Artlist, and Luma all sell the tools they describe. The Lost Garden creator appears to be affiliated with ScreenWeaver.

---

## 5. Source list

**Artlist and Seedance**
- https://artlist.io/blog/artlist-250k-seedance-2-5-challenge/ (winners, rules; dated 2026-08-12)
- https://artlist.io/blog/seedance-2-5-on-artlist-the-ai-video-model-moving-the-needle/ (2026-08-02)
- https://artlist.io/blog/artlist-studio-challenge/
- https://kingy.ai/ai/the-artlist-studio-challenge-2026-a-100000-opportunity-to-turn-creative-visions-into-reality/ (2026-05-18)
- https://artlist.io/blog/super-bowl-ads-2026-artlist/ (2026-02-04)
- https://artlist.io/blog/artlist-big-game-ad-challenge/ (2026-02-04)
- https://artlist.io/blog/super-bowl-2026-ai-ads/ (2026-02-08)
- https://www.linkedin.com/posts/liran-friedman-7999b8155_artlist-superbowl2026-generativeai-activity-7426378814290542593-M6v1
- https://artlist.io/blog/artlist-making-of-luccia-ai-music-video/ (2026-08-24)
- https://artlist.io/blog/new-hailuo-2-3/ (2026-01-28)
- https://artlist.io/blog/sxsw-2026-future-of-filmmaking/ (2026-03-19)
- https://www.cined.com/artlist-sold-a-year-of-unlimited-seedance-2-5-for-500-and-delivered-a-week/
- https://moelueker.com/blog/how-to-use-seedance-2-5 (2026-08-12)
- https://higgsfield.ai/blog/seedance-2-5-pricing-2026 (2026-08-06)
- https://www.mindstudio.ai/blog/art-list-seedance-2-5-video

**Competitions and festivals**
- https://blog.google/company-news/inside-google/around-the-globe/google-middle-east/winner-of-the-global-ai-film-award/ (2026-01-14)
- https://blog.google/intl/en-mena/company-news/technology/lily-the-winner-of-the-global-ai-film-award/
- https://studio.aifilms.ai/blog/lily-wins-ai-film-award-dubai
- https://www.maghrebnaute.com/2026/01/21/ai-film-award-le-tunisien-zoubeir-jlassi-remporte-le-premier-prix-avec-lily/
- https://www.wearetech.africa/en/fils-uk/tech-stars/tunisian-filmmaker-zoubeir-jlassi-wins-inaugural-google-ai-film-award-with-lily
- https://deadline.com/2025/06/runway-ai-film-festival-new-york-lincoln-center-total-pixel-space-1236425801/
- https://www.spikeai.studio/blog/runway-aiff-2025-recap
- https://aif.runwayml.com/
- https://deadline.com/2026/02/seedance-chroma-awards-ai-films-cinema-1236728087/
- https://civitai.com/articles/9383/project-odyssey-season-2-the-ai-filmmaking-competition-returns
- https://www.projectodyssey.ai/about
- https://lumalabs.ai/news/luma-dreambrief-submission-finalists (2026-04-09)
- https://www.vp-land.com/stories/cinema-synthetica (2024-05-21)

**Projects**
- https://www.fxguide.com/fxfeatured/actually-using-sora/ (2024-04-14)
- https://techcrunch.com/2024/04/27/creators-of-sora-powered-short-explain-ai-generated-videos-strengths-and-limitations/
- https://www.fxguide.com/quicktakes/the-power-of-on-premises-open-weight-models-for-generative-media/ (2026-08-28)
- https://nofilmschool.com/ai-music-video (2024-05-02)
- https://www.fxguide.com/fxfeatured/1st-sora-music-video-how-sora-is-evolving-guessing-possible-pricing/ (2024-05-08)
- https://www.marketingdive.com/news/toys-r-us-openai-sora-gen-ai-first-text-video/719797/ (2024-06-25)
- https://ca.news.yahoo.com/chaotic-kalshi-ad-during-nba-173937071.html (Business Insider, 2025-06-13)
- https://www.thedaringcreatives.com/creator-stories/pj-ace-nba-finals-ad/
- https://themediabrain.substack.com/p/ais-disruption-of-advertising-and (2026-02-03)
- https://playcut.ai/blog/ai-commercial-generator/ (2026-06-01)
- https://the-decoder.com/ai-generated-holidays-are-coming-coca-cola-ad-looks-festive-but-feels-artificial-critics-say/ (2024-11-16)
- https://www.thewrap.com/coca-cola-ai-christmas-ad-2025/ (2025-11-03)
- https://futurism.com/artificial-intelligence/coke-ai-holiday-ad (2025-11-05, citing WSJ)
- https://www.hollywoodreporter.com/business/digital/ai-coke-ad-holiday-studio-interview-1236420358/ (2025-11-06)
- https://www.implicator.ai/coca-cola-debuts-ai-holiday-ads-animals-replace-actors-after-2024-backlash/ (2025-11-04)
- https://www.vp-land.com/p/coca-cola-s-ai-holiday-ad-how-70-000-generated-clips-built-a-familiar-yet-new-commercial (2025-12-23)
- https://www.adsoftheworld.com/campaigns/holidays-are-coming-ai-generated-2025-christmas-ad
- https://www.vp-land.com/stories/house-of-david-season-2-used-253-ai-generated-shots-here-s-how-they-did-it (2025-10-16)
- https://www.thewrap.com/house-of-david-season-2-showrunner-pro-ai-shots/ (2025-11-10)
- https://www.vice.com/en/article/netflix-generative-ai-the-eternaut/ (2025-07-18)
- https://blog.google/innovation-and-ai/models-and-research/google-deepmind/ancestra-behind-the-scenes/ (2025-06-13)
- https://www.vp-land.com/stories/aronofsky-produced-ai-hybrid-short-goodnight-lamby-premieres-at-cannes-classics (2026-05-16)
- https://deadline.com/2026/05/open-ai-produced-animated-family-film-critterz-cannes-1236879586/ (2026-05-04)
- https://www.screenweaver.ai/blog/cully-hill-boys-punky-duck-critterz-ai-films (2026-08-24)
- https://www.semafor.com/article/08/19/2026/ai-startup-produces-fully-ai-generated-feature-length-film (2026-08-19)
- https://www.cartoonbrew.com/artificial-intelligence/jorge-gutierrez-amazon-mgm-punky-duck-261798.html (2026-05-29)
- https://www.vp-land.com/stories/inside-bitcoin-killing-satoshi-doug-liman-s-70m-hybrid-ai-feature (2026-04-17)
- https://www.vp-land.com/stories/danny-boyle-used-about-30-seconds-of-generative-ai-in-ink-to-animate-photos-and-add-cg-mic (2026-09-06)
- https://www.vp-land.com/stories/nigerian-team-completes-asiri-ilu-awon-osu-a-three-hour-yoruba-feature-with-ai-generating (2026-08-23)
- https://www.vp-land.com/stories/as-deep-as-the-grave-trailer-premieres-with-ai-generated-val-kilmer-performance (2026-04-17)
- https://www.vp-land.com/stories/how-phantom-x-got-sag-approval-for-ai-filmmaking-with-real-actors (2025-06-23)
- https://www.vp-land.com/stories/genai-meets-live-action-promise-ai-s-ninjapunk-reimagines-film-production (2025-05-13)
- https://www.vp-land.com/stories/etc-s-the-bends-cracks-ai-video-cinema-code-with-16-bit-hdr-pipeline (2025-10-13)
- https://www.vp-land.com/stories/minimax-h3-unifies-text-image-video-and-audio-generation-with-open-weights-coming (2026-07-31)
- https://www.vp-land.com/stories/creators-coalition-on-ai-launches-a-role-by-role-tracker-rating-how-much-of-each-hollywood (2026-09-11)
- https://www.technologyreview.com/2023/06/01/1073858/surreal-ai-generative-video-changing-film/
- https://www.cognitiverevolution.ai/ai-powered-filmmaking-with-waymarks-stephen-parker-and-josh-rubin/
- https://www.forbes.com/sites/charliefink/2024/10/17/where-the-robots-grow-is-ais-first-feature/ (snippet only)
- https://www.thewrap.com/lionsgate-runway-ai-deal-ip-model-concerns/ (2025-09-22)
- https://www.hollywoodreporter.com/business/business-news/divergent-producer-pouya-shahbazian-1236153574/ (2025-03-04)
- https://variety.com/2026/biz/news/utopai-worlds-largest-independent-ai-native-film-tv-studio-will-premiere-3-movies-2-series-in-2027-1236844803/ (2026-08-27)
- https://deadline.com/2026/05/natasha-lyonne-interview-asteria-ai-studio-1236881859/ (2026-05-14)
- https://mediagazer.com/250521/p5 (Toonstar, NYT summary)

**Creator and vendor breakdowns**
- https://www.screenweaver.ai/blog/how-i-made-japanese-style-anime-with-ai (2026-09-19)
- https://www.screenweaver.ai/blog/ai-film-production-cost (2026-09-20)
- https://www.screenweaver.ai/blog/ai-film-cost-credits-rerolls (2026-08-24)
- https://www.screenweaver.ai/blog/ai-short-film-7-days-production-log (2026-09-19)
- https://www.screenweaver.ai/blog/ai-music-video-production-workflow (2026-09-22)
- https://invideo.io/blog/ai-film-production-cost/
- https://www.clixie.ai/blog/my-2026-ai-video-journey-1-200-clips-15k-spent-and-what-actually-works
- https://www.mindstudio.ai/blog/ai-animated-short-film-seedance-2-0-workflow-cost (2026-06-05)
- https://www.mindstudio.ai/blog/ai-short-film-seedance-2-workflow-voice-swap-cost-2 (2026-06-01)

**Surveys and rules**
- BFI/CoSTAR "AI in the Screen Sector: Perspectives and Paths Forward" (June 2025): https://core-cms.bfi.org.uk/media/40967/download (landing page https://www.bfi.org.uk/industry-data-insights/reports/ai-screen-sector-beyond)
- CVL Economics "Future Unscripted" (Jan 2024): https://animationguild.org/wp-content/uploads/2024/01/Future-Unscripted-The-Impact-of-Generative-Artificial-Intelligence-on-Entertainment-Industry-Jobs-pages-1.pdf
- WGA AI provisions: https://www.wga.org/contracts/know-your-rights/artificial-intelligence
