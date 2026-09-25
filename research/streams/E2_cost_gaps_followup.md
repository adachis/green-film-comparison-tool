# Stream E2: Second-pass research on production-cost gaps (VFX tiers, stages and LED volumes, aerials, stock footage, voice, catering, explosions, claim checks, E&O for AI, and UK/Canada cost per hour)

Research date: 2026-09-25. This file fills the gaps listed in `E_production_costs.md` §4 and does not repeat data already there or in `G_scenarios.md` §2 (Pixune tiers, Saturation.io helicopter range, Adobe Stock credit packs).

**Conventions (same as Stream E)**

- **P / S**: P means a primary source (a vendor's own price list or rate card, a government document, a company's own terms, or an official dataset). S means secondary (trade press, blogs, aggregators, or search-result snippets).
- **Confidence**: H = high, M = medium, L = low.
- **Derived** means my own arithmetic on sourced inputs. Assumptions are stated each time.
- **Unverified** means a claim I could not trace to a primary source.
- **Snippet** means I saw the text only in a search-engine result because the page itself was blocked (403, Cloudflare, DataDome or a login wall).
- **Currencies** are left native (USD, GBP £, CAD CA$, EUR €, AUD A$). Nothing is converted.

**Tooling note.** The WebSearch quota was exhausted, so I searched DuckDuckGo Lite through a headless browser (`tools/ddg.js`) and fetched pages with urllib or Chromium (`tools/render.js`, `render2.js` and a new `tools/getpdf.js`). These sites were blocked by bot walls and were **not** bypassed:

- Shutterstock and Pond5 (DataDome captcha)
- Voices.com, Vitrina.ai and Ofcom.org.uk (Cloudflare)
- Reddit
- UK Parliament committee pages (403)
- GVAA (email sign-up gate)
- AICP member surveys (member login)
- BytePlus legal terms (sign-in)

Where a blocked page mattered, I used secondary captures or snippets and labelled them. Raw page captures are in `research/E2/pages/` and `research/E2/r2/`.

---

## 0. Summary of key findings

1. **Per-shot VFX pricing now has five or more independent sources.** The tiers span about three orders of magnitude, depending on the vendor's region and the delivery tier. See Table 1.2.
   - **Cleanup and paint-out**:
     - $20–$80 per shot, South-East Asian vendor.
     - $100–$1,000 per shot, blog tiers from Pixune and Tools for Film.
     - **$1,500–$4,000 (broadcast) and $4,000–$8,000 (theatrical)** per shot, C&I Studios, US.
   - **Set extension and matte painting**: $5,000–$25,000 typical, with full-3D camera-move environments at $50k–$80k (C&I). Framebid prices individual matte paintings at $2k–$50k+.
   - **CG creature**: $15k–$50k per shot for indie work (Tools for Film). A hero creature holding a whole scene costs **$200k–$600k per scene** (C&I).
   - **Digi-doubles**: hero photoreal humans or de-aging start at **$300k per shot** (C&I). A real-time-grade MetaHuman double costs €1.5k–€26k per asset (Enginious).
   - **Destruction**: $3k–$50k+ (Pixune). A custom period car that deforms in a collision costs $40k–$120k per shot (C&I).
   - **Water**: $2k–$20k+ (Pixune).
   - **Digital crowds**: $1k–$25k+ (Pixune), or $5k–$15k for crowd replication (Tools for Film).
2. **VFX per finished minute on streaming TV** is not published anywhere as such.
   - The derived range is **about $6k–$70k per minute for mainstream one-hour streaming** and **$65k–$210k per minute for premium franchise shows**. This uses VFX shares of 6–18% (C&I) or 20–25% (VFX Voice) of $6M–$50M episodes.
   - Stranger Things 5 carried **5,844 VFX shots over 8 episodes** (about 730 per episode).
3. **AI is compressing VFX costs, but hard numbers on bids are scarce.** The evidence is:
   - Netflix said the El Eternauta collapse was **"10× faster"** and would not otherwise have been "feasible for a show in that budget".
   - Lionsgate expects AI to save **"tens and tens of millions of dollars a year"** (June 2026).
   - Roland Berger (Aug 2026) finds roto, cleanup, plate prep and denoising most exposed, which squeezes mid-market vendors.
   - Vendor claims put roto and cleanup cost cuts at 40–70% (L). One AI-VFX vendor quotes a :30 with 8 VFX shots at $36k–$85k, against $108k–$310k traditionally (L).
   - Several widely cited statistics sites (worldmetrics, zipdo, gitnux, frameandfocal) are **unreliable or fabricated** and are excluded.
4. **Stages.**
   - Small LA and Atlanta stages publish rates. The SAF stage (1,545 sq ft) costs **$2,000 per 10-hour day**. Studio Space Atlanta's sound-stage rates are **$1,550–$1,625 per 10-hour day**, and its full 20,000 sq ft buyout costs **$3,750 per 10-hour day**. A **$29,750 one-week** rate is also listed; its scope is ambiguous. DFI's rule of thumb for independent stages is **$0.75–$1.25 per sq ft per day**.
   - Major-lot and large UK stage rates are **not published** and are quoted weekly or monthly (gap).
   - LA stage occupancy was **62% in H1 2025**, against 90%+ in 2016–22, so rates are soft.
   - UK: Millennium Studios' A Stage costs **£1,250 per 10-hour weekday**.
5. **LED volumes.** Rates from small to large:
   - Indie XR stage in LA: **$3,500 per 12-hour day all-in**.
   - London VP stage: from **£3,550 + VAT**.
   - LA's WePlay Stage A: from **$15,000/day**.
   - East Coast: $5k–$25k/day.
   - UK range: £3k–£20k+/day.
   - **Phillip Galler** (former president of Lux Machina Consulting): **$35k–$50k/week** on a standing stage, **$50k–$75k/week** for car-process work, and **$100k–$400k/week** for large pop-up volumes.
   - NEP, Pixomondo, XR Studios, ARRI Stage and Dimension publish no rates.
   - Unreal environments cost **$500–$2,000** as licensed pre-builds and **$5k–$80k+** custom. The House of David traditional figure was $15k–$200k.
6. **Helicopters.**
   - AS350/H125 charter runs about **$1,800–$2,600 per flight hour** (US marketplace).
   - Alberta's 2025 government rates are **CA$2,848/hr (AS350 B3)** and **CA$3,130/hr (H125)**.
   - An Alaska operator charges AS350 **$2,200/hr plus fuel with a 4-hour daily minimum**.
   - A Shotover F1 costs about **$2,500–$5,000 per day**. Tyler mounts cost $400–$1,195 per day.
   - A studio all-in aerial unit costs **$15k–$40k+ per day**.
   - Ferry and positioning time is billed at the full hourly rate.
7. **Stock footage.**
   - Shutterstock: **$55/clip** in a 5-pack of HD, about **$100–$110** with the Enhanced license, **$399** for the Select premium collection, or **$11.80/clip** on subscription.
   - Pond5: **$79–$299** (most $177–$199).
   - Getty: **$499** for a single HD/4K clip (down to $300 in a 15-pack); rights-managed footage is quote-only.
   - Filmsupply: from **$109** (internal use) or **$219** (web); broadcast and film use is quote-only.
   - BFI archive: **£840 for the first minute plus £14/s**, up to **£8,580 plus £143/s** for worldwide perpetual rights.
8. **Voice.**
   - Non-union GVAA-derived rates: a national cable TV spot costs **$2,500–$2,800** (12 months). Corporate narration costs **$350–$450 for 1–2 minutes** but **$1,750–$2,350 for 40–60 minutes**, so the per-minute price falls from about $300 to about $40. Audiobooks run $200–$500 per finished hour, and games $200–$350/hr.
   - Voice123 is lower: **$1,000–$1,250 for 45–60 minutes** of non-broadcast narration.
   - ElevenLabs costs about **$0.09–$0.10 per minute**, roughly 170–430× cheaper for a 60-minute narration (derived).
9. **Catering.**
   - US: about **$12–$18 for breakfast, $14–$20 for lunch and $18–$28 for dinner** per head, plus craft services at $3–$5 per head per day on indies. Saturation's figures are $15–$25 per head per day for craft services on mid-range productions and $25–$50 on studio shows.
   - UK: **£30 + VAT** per full day in Cornwall, and **£42–£65** or **£46** (breakfast, lunch and tea) in London.
   - Toronto: CA$40–$70.
10. **Explosions.**
    - A US surplus school bus has a **median sold price of $1,875** (typical range $1,000–$3,380).
    - Scrap cars fetch $200–$1,500.
    - Picture cars rent for **$135–$5,000/day**.
    - Speed (1994) used 14 buses, two of them destroyed. Fast X built 250–300 cars, at about 300 labor hours for a hero build.
11. **Claim checks.**
    - **Verified as reported by Semafor (Sept 2025)**: Genre about **$100k per :30** with "a few thousand dollars" of Veo 3 credits, and the Dor Brothers about **€200k (≈$235k) for larger spots**.
    - **Unverified, likely spurious**: "AICP 2025: $387k average bid". AICP's public documents contain no cost statistics. The 17.5% markup is probably a garbled version of the standard **17.65%** gross-up.
    - **Super Bowl (2026)**: airtime averages about $8M and tops $10M for some spots. All-in cost is **$12M–$20M+** (THR). Production excluding celebrity talent is about **$1M–$4M**, and A+ talent adds $3M–$5M.
12. **E&O and AI.**
    - Front Row, a film insurance broker, says AI-generated content **may be uninsurable under E&O** because it can't be cleared.
    - Verisk/ISO introduced generative-AI exclusion endorsements (**CG 40 47, CG 40 48 and CG 35 08**) from **1 Jan 2026**. Carriers such as Berkley, Philadelphia Indemnity and Hamilton add AI exclusions, and some price hikes are reported without numbers.
    - Baseline film E&O runs **$1k–$20k+** (3-year term, $1M/$3M limits).
    - **Seedance**: BytePlus sells "Advanced Creation Rights" at **$14k/yr or $1.4k/mo** (Premium $42k/yr), described as a "clear pathway to substantiate usage rights". The MPA–ByteDance MOU (17 Aug 2026) adds output guardrails but is non-binding and does not cover training data.
    - **MiniMax's** API IP indemnity is **capped at fees paid**.
    - Google indemnifies Veo outputs on Vertex AI.
13. **Canada (CMPA Profile 2025, FY2024/25) average budget per hour.**
    - English fiction **CA$1.797M** (median CA$1.615M); French fiction **CA$797k**.
    - English children's CA$1.114M, English documentary CA$380k, English lifestyle CA$416k and English variety CA$435k.
    - **UK**: the BBC tariff (2023) pays **£650k–£1.1M/hr for high-cost drama**, £225k–£350k for high-cost factual, and £400k–£750k for high-cost entertainment.
    - Ofcom's 2017 PSB figures were drama £769k/hr, entertainment £175k/hr and specialist factual £142k/hr (snippet). Current Ofcom figures were blocked.
    - BFI 2025: **£4.03bn over 168 HETV shows**, about £24M of UK spend per show (derived).

---

## 1. Per-shot VFX pricing tiers

### 1.1 Sources (independence noted)

| ID | Source | What it is | Region / quality tier | Date | P/S | Conf. |
|---|---|---|---|---|---|---|
| V1 | Pixune, "VFX Cost Guide 2026" | studio blog (animation/VFX vendor) | mixed; "basic / intermediate / advanced" and per-sim tiers | updated 2026-08-16 | S | L/M |
| V2 | Tools for Film, "How to Budget VFX for an Indie Film: 4 levels" | filmmaking-tools blog; **draws partly on Vitrina and AI Learning Guides, so not fully independent** | US/UK indie features | 2026-09-04 | S | M |
| V3 | Tools for Film VFX cost estimator (defaults) | calculator | "mid-tier VFX house" | accessed 2026-09-25 | S | L/M |
| V4 | C&I Studios (Fort Lauderdale, US), "CGI Services for Film Production" | US production-company price guidance | **broadcast vs theatrical** quality | published 2026-06-19, updated 2026-09-17 | S (vendor) | M |
| V5 | BLKRIP, "VFX Shot Pricing Guide" | **published vendor rate card** | **South-East Asian rates** ("40–60% lower than US/W. Europe"); music video, commercials, shorts | accessed 2026-09-25 (undated) | P (vendor) | M |
| V6 | Mimic VFX, "How Much Does VFX Cost? 2026" | European vendor blog (prices in €) | broad bands only | 2026-08-17 | S | L |
| V7 | Framebid, "Matte Painting Outsourcing Guide" | VFX bidding-platform guide | per painting; day rates by region | accessed 2026-09-25 (undated) | S | M/L |
| V8 | Framebid, "Complete Guide to VFX Outsourcing in 2025" | as above | offshore/outsourced component prices | 2025-09-16 | S | L (North American rates look implausibly low) |
| V9 | Enginious, "Digital Doubles Cost Calculator" v0.2 | **published vendor tiers** (Polish team, EUR) | MetaHuman/real-time pipeline | Q2 2026 | P (vendor) | M |
| V10 | Vitrina.ai VFX cost guide and 2026 budget breakdown | industry aggregator | tier-1 US/UK and outsourced | 2026 | S (**snippet only**; 403) | L |
| V11 | Reddit r/vfx threads | practitioner comments | freelance | 2014–2024 | S (**snippet only**) | L |

### 1.2 Per-shot price by category (USD unless stated)

| Category | Offshore / low-end | Indie / mid-tier blog tiers | US broadcast / TV vendor | US theatrical / hero | Notes and sources |
|---|---|---|---|---|---|
| **Cleanup, paint-out, rig/wire removal** | **$20–$80** per simple shot (sky replacement, logo removal, wire removal; 0.5–2 h) [V5] | **$100–$1,000** "basic" [V1]; **$300–$1,000** L1 cleanup, 2–8 h, junior compositor [V2]; wire removal and simple comps **$1,000–$3,000**, 1–3 days [V2]; estimator default "simple" **$500** [V3]; "a few hundred euros" [V6] | **$1,500–$4,000** "simple invisible work at broadcast quality" (rig removal, beauty cleanup, sky replacement, brand removal) [V4] | **$4,000–$8,000** at theatrical quality [V4] | Reddit (2014): a matchmove + roto + comp averages 15 h × $60/h = $900, or about $1,800 per "average shot done right" [V11, L]. Outsourced roto is **$5–$50 per frame** [V8, L]. |
| **Screen replacement** | **$80–$300** ("medium", 2–4 h, Mocha or 3D track, corner pin) [V5] | inside Pixune "basic" **$100–$1,000** [V1]; "a few hundred euros" [V6]; the estimator counts "screen inserts" as simple ($500) [V3] | not itemised by C&I (probably inside the $1.5k–$4k invisible band; my inference, L) | — | — |
| **Set extension / matte painting** | outsourced DMP **$200–$350/day** (junior, offshore) to **$500–$750/day** (senior, offshore) [V7] | Pixune "intermediate" **$500–$5,000** and "medium complexity" $1,000–$5,000 [V1]; L3 environments **$5,000–$15,000**, 1–4 weeks [V2]; worked example $8,000 [V2]; per painting (Framebid): simple $2k–$5k; medium $5k–$12k; complex $12k–$25k; premium $25k–$50k+ [V7] | **$6,000–$25,000** per shot [V4]; TV DMP packages **$20k–$40k per episode** for 5–10 paintings [V7] | **$50,000–$80,000** when full 3D environments move with a Steadicam or aerial plate [V4]; commercial hero painting $10k–$25k [V7] | Vitrina (snippet): "mid-complexity … digital environment extensions and partial CG integration $5,000–$25,000" [V10, L]. |
| **CG creature** | "complex CG integration" $300–$1,500+ (8–20+ h) [V5] (not creature-grade) | Pixune "advanced" **$2,000–$50,000+**, with high-end creature shots at $5,000–$50,000+ [V1]; L4 creatures **$15,000–$50,000**, 4–12 weeks [V2]; worked example $25,000 [V2] | background animal that runs through frame: **$25,000** [V4] | hero creature holding a full scene with physical interaction: **$200,000–$600,000 per scene** [V4] | Vitrina (snippet): full-CGI characters "over $200,000" per shot; 40 hero-creature shots "$6M or more" [V10, L]. Asset builds are one-off costs amortised across shots [V6]. |
| **Destruction and pyro FX** | outsourced non-hero FX (particles, fluids, destruction, cloth) **$300–$3,000** per shot [V8, L]; particle comps $300–$1,500+ [V5] | destruction **$3,000–$50,000+**; fire **$1,000–$15,000**; smoke **$500–$10,000** [V1] | licensed digital double of a current car in an RBD shot: **$8,000–$20,000** per shot [V4] | custom period vehicle built to deform in a collision: **$40,000–$120,000** per shot [V4] | First-pass tentpole average was $27k–$40k per shot (E §2.8). Render compute for a mid-tier explosion is only about $150–$260 (G §2.1), so labor dominates. |
| **Fluids and water** | see "non-hero FX" $300–$3,000 [V8, L] | water **$2,000–$20,000+** [V1]; L4 includes "fluid and particle simulations" at **$15,000–$50,000** [V2] | — | — | — |
| **Digital crowds** | outsourced crowd animation **$200–$2,000** per shot [V8, L] | crowd sims **$1,000–$25,000+** [V1]; crowd replication (tiling extras) **$5,000–$15,000** [V2] | — | — | Software: Golaem 9 perpetual **$9,000**, rental **$850/mo or $5,000/yr**; Golaem Lite $2,300 (CG Channel, June 2024) [V24] (S, M). Crowd TDs and agent libraries are extra (not sourced). |
| **Digi-doubles and face work** | face replacement or de-aging **$300–$1,500+** (15–40 h) at SE Asian rates [V5] | L4 "digital doubles for stunts, face replacement" **$15,000–$50,000** per shot [V2]; Reddit (snippet): a wide-shot scan-based double is "a few thousand for processing a scan, simple rig" [V11, L] | — | hero photoreal humans including high-quality de-aging **start at $300,000 per shot** [V4] | **Asset build (real-time or MetaHuman grade, EUR, Q2 2026)** [V9]: raw head scan about €1,500 per person; cleaned mesh about €1,800; MetaHuman integration about €11,800; "Advanced Custom" (custom hair, body and wardrobe, MH rig) about €26,000. Rush (<3 weeks) +30%. Likeness rights are **excluded**. |
| **Full-CG sequence** | — | Pixune high-end cinematic **$50k–$300k+ per minute** [V1] | — | 2-minute fully animated sequence with established assets: **$400,000–$1.2M** (flat sequence rate) [V4] | — |

**Planning bands that combine these sources** (derived, M/L; for the tool's VFX-alternative cost where a live-action plate already exists):

| Category | Low (offshore/indie) | Central (mid-tier TV/streaming) | High (US theatrical hero) |
|---|---|---|---|
| Cleanup / wire removal | $50–$500 | $1,000–$4,000 | $4,000–$8,000 |
| Screen replacement | $100–$300 | $500–$2,000 | $2,000–$5,000 (L; inferred) |
| Set extension / DMP | $2,000–$5,000 | $6,000–$25,000 | $50,000–$80,000 |
| CG creature (per shot) | $15,000 | $25,000–$50,000 | $100k+ (a hero scene costs $200k–$600k) |
| Destruction / pyro | $1,000–$3,000 | $3,000–$20,000 | $40,000–$120,000 |
| Fluids / water | $2,000 | $5,000–$20,000 | $50,000+ (L) |
| Digital crowd | $1,000–$5,000 | $5,000–$15,000 | $25,000+ |
| Digi-double | €1.5k–€26k asset plus $1k–$15k per shot | $15,000–$50,000 | $300,000+ |

### 1.3 VFX labor rates (context for bottom-up bids)

| Item | Value | Covers | Source | P/S, conf. |
|---|---|---|---|---|
| Senior matte painter, hourly | LA **$120–$150/h**; Europe $60–$80; Asia $40–$60 | freelance or outsourced | [V7] | S, M/L |
| Matte painter day rates (junior → senior → art director) | North America **$500–$700 → $1,000–$1,500 → $1,400–$2,000**; Europe $350–$500 → $750–$1,000 → $1,000–$1,400; offshore $200–$350 → $500–$750 → $750–$1,000 | outsourced | [V7] | S, M/L |
| 3D/VFX talent day rates | junior $125–$250; mid $250–$400; senior $400–$600; principal or director $600–$1,000 | CGHERO outsourcing (region not stated) | CGHERO pricing, 2026-02-05 [V12] | S (vendor), L/M |
| VFX supervisor | pre-production **$875/day** ("one published 2026 rate card"); on set **$1,500–$4,000/day** (via Vitrina) | US indie | [V2] | S, L/M |
| Estimator defaults | VFX supervisor about $5,000/week; coordinator about $2,500/week; contingency 15% | mid-tier house | [V3] | S, L |
| Freelance Nuke compositor (US) | about **$700/day** paid by one producer (2021–22) | snippet | Reddit r/vfx [V11] | L |

### 1.4 VFX cost per finished minute for streaming TV

No source publishes this directly. The inputs are:

| Input | Value | Source | P/S, conf. |
|---|---|---|---|
| VFX share of TV/streaming production cost | **20–25%** | VFX Voice (about 2019–20; first pass [S80]) | S, M |
| VFX share, prestige streaming drama | **6–18% of total negative cost** (indie features 3–9%) | C&I Studios 2026 [V4] | S, M |
| Premium streaming originals ($10M+/episode) | **200–600 VFX shots per episode; $1.5M–$5M VFX per episode** | Vitrina (snippet) [V10] | S, L |
| Stranger Things 5 | **5,844 VFX shots across 8 episodes; 1,456 in episode 508** | VFX Voice (2026; snippet) and The Yard VFX interview (2026-06-16; snippet) [V17] | S, M |
| Pixune per-minute bands | social $2k–$10k; commercial $10k–$50k; **high-end cinematic $50k–$300k+ per minute** | [V1] | S, L/M |
| Episode costs | streaming one-hour $6M–$15M typical; premium $20M–$58M (first pass Table 2.1) | E §2.1 | H/M |

**Derived VFX cost per finished minute** (M/L; assumes about 55–60 finished minutes per one-hour episode):

- Mainstream streaming one-hour ($6M–$15M per episode × 6–25% VFX) gives $0.36M–$3.75M per episode, or **about $6k–$68k per finished minute**.
- Premium franchise ($20M–$50M per episode × 20–25%) gives $4M–$12.5M per episode, or **about $67k–$208k per finished minute**.
- Vitrina's $1.5M–$5M per episode gives about $27k–$91k per minute, which sits inside these bands.

### 1.5 AI and VFX bids (2025–2026 evidence)

| Evidence | What it says | Source, date | P/S, conf. |
|---|---|---|---|
| Netflix, El Eternauta building collapse | Completed **"10 times faster"** than with traditional VFX; "The cost of it would just wouldn't have been feasible for a show in that budget" (Sarandos, Q2 2025 call); made with Eyeline Studios | IBC, 2025-07-23 [V15] | S (direct quote), H |
| Netflix, about 300 titles in 2026 | GenAI "at a lower cost than traditional methods" | Q2 2026 shareholder letter (first pass [S67]) | P, H |
| Lionsgate | AI "is going to save us **tens and tens of millions of dollars a year**" (Michael Burns, Gabelli symposium); Lionsgate studio revenue is more than $3B a year | Deadline, 2026-06-04 [V14] | S (quote), M |
| House of David (Amazon / Wonder Project) | "The cost of augmenting those shots is minuscule compared to the time and cost it would have been to generate those with … traditional VFX methods" (Jon Erwin); traditional Unreal environment builds cost $15k–$200k and take 10–12 weeks | Wired quote via aggregators; VP Land 2025-10-16 via Stream C [V20] | S, M |
| Dimension Studio, Those About to Die | about **2,000 VFX shots on the VP stage "at a fraction of the traditional cost"** (a 4-minute golden-hour shot was cheaper via VP) | VFX Voice, 2025-04-01 [V16] | S, M |
| Roland Berger analysis (35 sources, 313 vendor-documented capabilities mapped to an 82-step VFX workflow) | Automation concentrates in **roto, clean-up, plate prep, matte generation, denoising, asset upscaling and texture generation**. Supervision and hero-shot judgment are much less exposed. The **mid-market is "squeezed from both sides"**. | Roland Berger, 2026-08-09 [V13] | S (consultancy), M |
| AEstruct white paper | roto and cleanup **40–70% cost reduction**; AI denoising 60–80% render-time cut; markerless mocap about 60% cheaper; a "reinvestment pattern" (200 → 300 shots at the same budget) | AEstruct, Feb 2026 [V18] | S (vendor), L |
| XineMind (AI VFX vendor) | :30 with 8 VFX shots: traditional **$108k–$310k** vs AI pipeline **$36k–$85k** (about 70% lower); senior compositing, cleanup and finishing remain | 2026-05-09 [V19] | S (vendor), L |
| ML roto cost | CopyCat on a cloud GPU: about $15–$20 of compute per 500-frame shot plus 1–2 h of artist time ($50–$100) | vfxrendering.com (render-farm blog) [V25] | S, L |
| MARZ Vanity AI | "300 times faster than traditional VFX pipelines" for 2D aging and de-aging | MARZ press via AWN (vendor claim) [V21] | S, L |
| "20–35% VFX cost reduction" | still **unverified** (Vitrina, no source) | first pass [S81] | L |
| "$40k shot in 2023 now $5k–$15k"; "$3k–$5k shot now $200–$800" | **unverified marketing claims** | ailearningguides.com; aivideoadvisor.com [V26] | L |

**Excluded as unreliable:**

- **worldmetrics.org, zipdo.co, gitnux.org, wifitalents**: "Deloitte study 18–25%", "ILM $250,000 per project" and similar. These pages list no traceable sources.
- **frameandfocal.com (2026-07-23)**: cites a "2023 VES Cost Transparency Initiative" and "scalp biopsies" for hair simulation. These are almost certainly fabricated, and I could find no VES document by that name.

---

## 2. Sound stage and LED volume day rates

### 2.1 Sound stages (published rates)

| Stage | Rate | Covers | Source, date | P/S, conf. |
|---|---|---|---|---|
| Stray Angel SAF Production Stage, LA Westside, **1,545 sq ft** cyc stage, soundproofed, green room and office, 14-ft grid, no lights | **$2,000 per 10-h day; $2,400 per 12-h day; $1,000 per 6-h half day; $1,000 per build/strike/prep day**; weekend stage manager $250/day | 2026 | strayangel.com product page, 2026-08-12 [ST3] | P, H |
| Studio Space Atlanta, Studio 1 (8,000 sq ft private) | **sound stage** $210/h (2-h min); half day $950; full day (10 h) **$1,550**; 15 h $1,950; 24 h $2,650. MOS: $79/h; 10 h $650 | 2026 | studiospaceatl.com, modified 2026-07-29 [ST1] | P, H |
| Studio Space Atlanta, Studio 3 (described as a 12,000 sq ft multi-stage with standing sets and an 80′ green screen; its sound-stage block repeats "entire 8,000 sf private") | sound stage $240/h; 10 h **$1,625**; 15 h $2,175; 24 h $2,950. MOS 10 h $1,275 | 2026 | same [ST1] | P, H |
| Studio Space Atlanta, full buyout (20,000 sq ft) | $2,400 (half) / **$3,750 per 10 h** / $4,750 (15 h) / $6,500 (24 h) | 2026 | same [ST1] | P, H |
| Studio Space Atlanta, one-week rate | **$29,750 per week**, printed on the Studio 3 page just above Studio 3's feature list. It is **unclear whether it covers Studio 3 or the full buyout** | 2026 | same [ST1] | P, M (scope ambiguous) |
| ATL Film Studios (7 standing sets, sound-insulated) | **$150/h (4-h minimum) or $1,200 per 8-h day**; its LED volume is quoted separately | 2026 | atlfilmstudios.com FAQ [ST2] | P, H |
| LA independent stages, rule of thumb | **$0.75–$1.25 per sq ft per day** for small, well-equipped stages. 5,000–12,000 sq ft four-wall stages run "low-to-mid four figures" per day (estimate). **Major-lot 15,000–30,000 sq ft stages are sold weekly or multi-month.** Prep and strike days about **50%** of the shoot-day rate. Power, security and similar extras add **20–40%**. Example: an 8,000 sq ft stage for 9 calendar days (5 shoot days) costs about $28,000 at an illustrative $4,000/$2,000 | 2025 | DFI Rentals, "Soundstage Rental Cost Los Angeles: 2025 Rate Breakdown" [ST4] | S (rental-house analysis), M |
| LA standing sets (Affordable Sound Stages) | courtroom **$3,500 per 12-h shoot day; $1,750 per prep/strike day**; bank or police desk set $2,000 / $1,000 | 2025 | via DFI [ST4] | S, M |
| UK: Millennium Studios 'A' Stage (production rehearsal stage with a 12.5 m × 7.8 m cyc) | **£1,250 per 10-h weekday; £1,500 per 10-h weekend day**; overtime £125–£150/h; power 50p/kWh metered; up-rigger £400 per shift | 2025/26 | Millennium Studios rate card PDF [ST6] | P, H |
| UK: 3 Mills Studios, London (9 stages, 3,755–13,424 sq ft) | **rates not published** ("dry hire"; utilities, cleaning and internet extra) | 2026 | 3mills.com [ST17] | P (no price) |
| UK: The Bottle Yard Studios, Bristol (11 stages up to 22,000 sq ft) | **rates not published** ("competitive rates") | 2025 | thebottleyard.com [ST18] | P (no price) |
| Large UK and LA studio lots (Pinewood, Shepperton, Sunset/Warner, etc.) | **not published**; Knight Frank's UK studio market reports give capacity (7.7M sq ft in 2025) but no rents | — | — | **Gap** |

**Market context (primary data via press):**

- LA stage occupancy was in the **mid-90s % from 2016 to 2022**, fell to **69% in 2023** and **63% in 2024**, and was **62% in H1 2025** (FilmLA 8th Sound Stage Production Report, 18 Mar 2026).
- LA County had about **8.3M sq ft** of stages in 2025, up from 8M. The UK went from **7.0M to 7.7M sq ft** and New York from 3.4M to 4.4M.
- California production jobs fell from 136,000 (2022) to 82,000 (Sep 2025) [ST5 Variety 2026-03-18; ST4]. The soft market implies negotiable, discounted rates.

### 2.2 LED volume and virtual production stage rates

| Provider / tier | Rate | Covers | Source, date | P/S, conf. |
|---|---|---|---|---|
| **XR Stage LA** (Affordable Sound Stages, North Hollywood), 30-ft curved LED wall, Unreal Engine 5 | **$3,500 per 12-h shoot day "all-in"**; build/pre-light (Unreal off) $2,250/day; LED tech $700 per 12-h day; hourly $350/h (2-h min) plus tech $65/h; student or music-video rate $2,950/day; overtime 10% of the day rate per hour; weekly rates on request | 2026 | xrstagela.com [ST9] | P, H |
| **WePlay Studios** (LA), Stage A: 25,000+ sq ft, 70-ft curved P1.8 LED wall | **from $15,000/day** (facility-only base; tech levels extra); Stage B broadcast (8,000 sq ft) from $8,000/day | 2026 | book.weplay.tv/pricing [ST10] | P ("starting" rates), M |
| **Silvertown Studios**, London (St Marks, 3,600 sq ft) | **VP/LED stage from £3,550 + VAT**; on-location VP from £5,000 + VAT | 2026 | silvertownstudios.co.uk/rates-1 [ST7] | P, H |
| UK market range | **£3,000–£20,000+/day**; "many shoots around £5,000–£15,000+" | Aug 2026 | Mammoth (London production company) [ST8] | S, M |
| East Coast US | **$5,000–$25,000/day** for LED volume stage rentals (Aug 2026 piece). By wall size (May 2026 piece, DC/Mid-Atlantic): small walls (8×5 ft to 12×8 ft, one tech) **$2,500–$6,000/day**; mid walls (16×9 ft to 24×12 ft, media server, 2 techs) **$7,000–$18,000/day**; large VP volumes (30×14 ft+, often curved with a ceiling) **$20,000–$50,000+/day**; extra crew $1,500–$5,000+/day | 2026 | TriVision Studios (DC), 2026-05-12 and 2026-08-25 [ST12] | S (vendor), M |
| Toronto | LED volumes **about $15,000–$50,000+/day** vs green screen studios $2,000–$8,000/day | 2026 | SP Studios (Toronto) [ST14] | S, L/M |
| **Lux Machina** (proxy via former president) | 2D plate playback (mostly car process): **$50k–$75k/week** (was $75k–$100k a few years earlier); **standing stage $35k–$50k/week**; **medium pop-up volumes $100k–$250k/week** (including some tracking); **large pop-up (80-ft diameter, near-360°, 20–30 ft tall) $100k–$400k/week**; building an 80-ft × 30-ft volume costs **$8M–$16M** excluding labor; a healthy large-project VP team is about 14 people | 2025 | CoPilot Co. interview with **Phillip Galler** (co-founder of seismiq, former president of Lux Machina Consulting), 2025-02-26 [ST11] | S (expert quote), M |
| Pixomondo / MELS (Canada) | "Day rates **CA$22,000–36,000** all-in premium; **CA$14,000–24,000** mid-tier" | 2026 | Xinglu LED blog (**snippet**; page blocked) [ST15] | S, L |
| Estimator (claims Lux Machina, DNEG and Fuse rates) | full VP stage **$10,000–$80,000/day**; LED wall rental $3,000–$55,000/day (20–120+ m²); camera tracking $1,200–$4,000/day; VP supervisor $1,500–$3,000/day; dedicated VP stage rental $3,000–$15,000/day | 2025–26 | Tools for Film VP estimator [ST13] | S, L/M |
| Practitioner anecdote | "**40k for a day**, actually two days because one day is required for prep" | ~2023 | Reddit r/cinematography (**snippet**) [ST16] | L |
| NEP Virtual Studios, Pixomondo, XR Studios, Lux Machina, ARRI Stage London (708 m² facility, 343 m² LED), Dimension | **No public rates** (quote only). The ARRI Stage and Dimension pages list specifications only. | 2026 | vendor sites | P (no price) — **Gap** |

**Derived day equivalents from Galler's weekly figures** (assuming 5 shoot days per week; L/M): a standing stage costs about $7k–$10k/day, car process $10k–$15k/day, a medium pop-up $20k–$50k/day, and a large pop-up $20k–$80k/day.

### 2.3 Unreal Engine environment build costs

| Tier | Cost | Source | P/S, conf. |
|---|---|---|---|
| Licensed pre-built environment (Unreal Marketplace/Fab, VP asset libraries) | **$500–$2,000** one-time; production-ready in days | Tools for Film VP estimator [ST13] | S, M/L |
| Custom, modest digital set | **$5,000–$25,000** | [ST13] | S, M/L |
| Custom photoreal feature-quality world | **$20,000–$80,000+** | [ST13] | S, M/L |
| East Coast commercial/corporate custom Unreal environment | **$3,000–$15,000+** | TriVision 2026-08-25 [ST12] | S, M |
| Bespoke cinematic LED environment | "a few hundred dollars to **$20,000+**" | TriVision 2026-05-12 [ST12] | S, M |
| House of David (traditional pipeline figure) | **$15k–$200k and 10–12 weeks** per Unreal environment; S2 used AI-assisted environments for more than 100–150 LED shots | VP Land 2025-10-16 via Stream C [ST19] | S, M |

---

## 3. Helicopter camera ship and aerial unit

### 3.1 Aircraft hourly rates (AS350/H125 class and alternatives)

| Aircraft / operator | Rate | Covers | Source, date | P/S, conf. |
|---|---|---|---|---|
| **AS350 B2 / B3 / B3e (H125)** | **CA$2,653 / CA$2,848 / CA$3,130 per flying hour** (H125 BLR CA$3,193). Also Bell 206B CA$1,480, Bell 407 CA$2,676, R44 CA$1,124, EC130 B4 CA$2,951, AS355 N CA$3,544, Bell 212 CA$4,263 | Government of Alberta casual-charter (wildfire) rates, **effective 2025-04-01**; rates include oil; daily minimums per the pilot handbook | alberta.ca PDF [H1] | P, H (for this market) |
| **AS350SD** (Alaska operator) | **$2,200/h plus fuel** (40 gal/h; Jet A estimated at $6/gal, so about $240/h), making about **$2,440/h** (derived). R66: $1,250/h plus fuel (24 gal/h) | **4 flight-hour daily minimum**; 2-h half-day minimum; minimums cumulative on consecutive days; weather days in the field billed | Ridgeline Aviation, "Helicopter Pricing and Policies", 2025-01-01 [H2] | P, H |
| AS350 B3 charter (US marketplace) | **$1,800–$2,600 per flight hour**, varying with repositioning and fees | 2026 | Jettly [H3] | S, M |
| Light single (R44/H125), Europe | **€1,400–€2,200/h** (calculator); indicative band €1,500–€2,600/h; light twin €2,600–€4,200/h | 2026 | SkyMatch calculator [H4] | S, M |
| Aerial photography (film) | "$2,500–$3,500 per hour for light to intermediate turbine helicopters, plus equipment and crew" | 2026 | Jettly helicopter taxi guide (snippet) [H11] | S, L/M |
| Twin-engine over Manhattan | about **$1,750/h** plus pilot fee and landing | 2015 | WPR NY [H9] | S, L (dated) |
| NY/Boston helicopter time | "$2,000/hr plus what the pilot charges" | 2014 | cinematography.com forum (snippet) | L (dated) |

### 3.2 Camera systems and mounts

| System | Rate | Source, date | P/S, conf. |
|---|---|---|---|
| **Shotover F1** gyro-stabilised system | about **$2,500–$5,000/day** rental | Saturation.io "Helicam Operator", 2026-03-23 (mod 2026-04-25) [H5] | S, M |
| **Cineflex V14 HD** (Sony HDC-1500; legacy HD system) | **A$4,200/day (A$16,800/week)**; UK **£1,785/day (£7,140/week)**; EU €2,515/day. Equipment charged **50% for travel and rig/de-rig days**; insurance 10% of equipment (7% EU). Helicopters sourced at cost ("POA"), **2-hour daily minimum** | Helifilms rate card (**undated; legacy HD equipment, so probably 2010s**) [H7] | P (vendor), M for structure / L for current price |
| Cineflex rental (NYC) | "about $4,500 to rent" (mount costs $600k to buy) | WPR NY, 2015-05-08 [H9] | S, L (dated) |
| **Tyler** helicopter mounts (Van Nuys) | Major Mount **$800/day** ($1,195 with gyros); Middle Mount II $585 ($895 with gyros); Minigyro **$400/day**; Nose Mount II $620–$1,000/day; batteries $50/day. Weekly (4-day week) Major $3,400, Major with gyros $4,700 | tylermount.com pricing page (© 2015; still posted) [H8] | P, M (possibly dated) |
| Shotover, Cineflex and Helinet price lists | **Not public.** Rental houses (Rocket Aerial, Vancal Cine, team5, Aering, Motion Air, Flying Pictures, Aerial Film Company) and Helinet quote on request. | — | **Gap** |

### 3.3 Crew and all-in aerial unit day

| Item | Rate | Source | P/S, conf. |
|---|---|---|---|
| Helicam **pilot** personal day rate | entry $1,000–$1,500; network TV and commercials $1,500–$2,500; feature senior $2,500–$5,000+; lead on major studio films $5,000–$7,500+ | Saturation.io "Helicam Pilot" (2026) [H6] | S, M |
| **Wet rate** (turbine helicopter with camera mount, fuel, maintenance and crew via an aerial company such as Helinet, National or Airborne) | **$3,000–$8,000+ per day** | [H6] | S, M |
| Aerial DP / helicam operator personal rate | mid-budget $1,500–$3,000/day; studio $2,500–$5,000/day within the package; commercials $2,000–$4,000/day | [H5] | S, M |
| **All-in manned helicopter aerial unit** | **mid-budget feature: $8,000–$25,000 per flight day** (helicopter, mount and crew via the aerial company); **studio feature full package (Wescam/Shotover): $15,000–$40,000+ per day**; commercials $10,000–$30,000 per day; "full manned helicopter packages … start around $8,000–$15,000 per flight day and can reach $30,000 or more"; "budget lines for aerial units on feature films commonly run $10,000–$25,000+ per shooting day" | [H5, H6] | S, M |
| Cineflex crew (Helifilms) | Cineflex DP A$1,500 per 10-h day; DP/operator A$950–$1,100; mount tech A$450–$650; aerial coordinator A$950. UK DoP £710, camera operator £500, engineer £385 | [H7] | P, L (dated) |
| Historical (2011) | "Average cost is between **$10,000–$20,000 for the day**" (Cineflex V14 crew plus turbine helicopter, shipping, rigging, per diems) | Streamwerx [H10] | S, L (dated) |
| Film helicopter aviation insurance | independent pilots need $2M–$5M liability; film-specific operations insurance about **$15,000–$30,000+ per year** | [H6] | S, L/M |

### 3.4 Ferry and positioning charges, and minimums

- Repositioning (ferry or deadhead) hours are **"usually billed at or near the normal hourly rate"** (Flight Ops HQ). A charter example: a 35-minute flight with 0.5 h of repositioning becomes 1.5 billed hours (Jettly). Operators multiply **chargeable time including empty positioning to and from base** by the hourly rate, then add waiting, landing and handling (SkyMatch) [H11] (S, M).
- One travel-industry source says repositioning "routinely adds **30–100%** to a charter invoice" (uncompromised.travel) (S, L).
- Minimums: **4 flight hours per day** (Ridgeline 2025) [H2]; 2-hour daily minimum (Helifilms) [H7]; weather days in the field are billed (Ridgeline).
- Camera equipment is billed at **50% for travel and rig days** (Helifilms) [H7].

### 3.5 Derived AS350/H125 camera-ship day (M/L)

The inputs are:

- aircraft $1,800–$3,200 per hour × **4–6 billed hours including ferry** (4-h minimum): $7.2k–$19.2k
- gyro system $2.5k–$5k per day
- aerial DP $2.5k–$5k
- a separate pilot fee where not in the wet rate: $0–$5k
- a mount technician: about $0.5k–$1k

That totals **about $13k–$35k per flight day** before travel. It is consistent with Saturation's $15k–$40k+ for a studio package and $8k–$25k for mid-budget work, and with Stream G's $8k–$30k.

---

## 4. Stock footage per clip

| Library | Price | Covers | Source, date | P/S, conf. |
|---|---|---|---|---|
| **Shutterstock**, subscription | **$59/mo billed $708/yr for 5 videos/month**, so **$11.80/clip** at full use. SD, HD and 4K each use one download (Standard license) | captured signed-out, US, **2026-07-30** | Photutorial [SK1] | S (dated capture), M/H |
| Shutterstock, Standard pack | **$275 for 5 HD videos ($55/clip)**, 12-month validity; 10- and 25-packs exist (prices not captured) | same | [SK1] | S, M/H |
| Shutterstock, **Enhanced** license (TV/film, unlimited audience) | HD packs **$549/5 ($110), $1,049/10 ($105), $2,499/25 ($100)** | same | [SK1] | S, M/H |
| Shutterstock **Select** (premium, cinema-grade) | **$399 per clip**, HD or 4K; Standard license only; not in subscriptions | same | [SK1] | S, M/H |
| Shutterstock Unlimited Plus | $69/mo billed $828/yr (selected collection of 100M+ mixed assets; fair-use limits) | same | [SK1] | S, M |
| Shutterstock single clip on demand (older capture) | Web $39; SD $59; **HD $79; 4K $199**; pack prices HD $63.16, 4K $159.16 | FootageSecrets (updated 2025-11-17) [SK2] | S, M/L |
| **Pond5** | marketplace prices **$79–$299 per clip (most about $177–$199)**; contributors report pricing HD at about $79 | Stockfilm licensing calculator, 2026 [SK3]; MicrostockGroup contributor post (snippet) [SK12] | S, M/L |
| Pond5 (aggregator) | "pay-per-clip from $5; subscription from $199/yr" | BityClips [SK4] | S, L |
| **Getty Images**, UltraPacks (royalty-free, mixed media) | single HD/4K video **$499**; 5-pack $1,750 ($350 each); 10-pack $3,300 ($330); 15-pack **$4,500 ($300 each)**. Small or low-res video: $175 single down to $130 in a 15-pack. **Premium Access, rights-managed, "rights-ready" and BBC footage are quote-only** | Photutorial (updated 2026-07-30) [SK5] | S, M/H |
| **iStock** (first pass) | basic clip 6 credits, premium 18 credits; FootageSecrets gives base prices of **$60 (Essentials)** and **$170 (Signature)**, or $48 / $144 with packs | [SK2]; E [S54] | S/P, M |
| **Artlist** (Artgrid is now folded into Artlist's "Stock Catalog") | **Max** (footage, templates, LUTs, music, SFX plus 16,500 AI credits): **$50.66/mo billed annually**, with unlimited stock downloads. **Max Business: $399/mo billed annually** (180,000 credits, 7 seats, **legal indemnification**). Music & SFX only: from $9.99/mo | artlist.io/pricing, Stock Catalog tab, rendered 2026-09-25 [SK7] | P, H |
| **Storyblocks** (first pass) | $21–$40/mo unlimited (annual) | E [S53] | P, H |
| **Adobe Stock** (Stream G) | about $67–$75 per video via credit packs | G §2.4 | P, H |
| **Filmsupply** (premium cinematic) | **Internal use from $109/clip; Web/Social from $219/clip; Extended use (TV/broadcast, film, VOD, OOH, theatrical) quote-only** | filmsupply.com/pricing, rendered 2026-09-25 [SK6] | P, H |
| Filmsupply (competitor claim) | "individual clips typically run $300–$1,000+" | Filmpac comparison page [SK10] | S (competitor), L |
| **Dissolve** | "clip licensing from $99" | BityClips [SK4] | S, L |
| **DroneImageBank** (aerial specialist) | "starting from **$5 per clip**", pay per second, commercial license | droneimagebank.com [SK8] | P, M |
| Axiom Images (premium aerials) | price generator is JavaScript-only; **not captured** | — | Gap |

**"Premium cinematic" exotic aerial 4K clip** (derived from the rows above; M):

| Tier | Price per clip |
|---|---|
| Budget aerial marketplace | $5–$55 |
| Mid (Pond5 or a Shutterstock pack) | $55–$300 |
| Premium (Shutterstock Select, Getty single, or Filmsupply web to broadcast) | **$219–$1,000+** |
| Broadcast, film or rights-managed | quote-only; often several hundred to a few thousand dollars (L) |

**Archival and rights-managed footage (per second):**

| Source | Price | P/S, conf. |
|---|---|---|
| **BFI archive rate card** (£, excluding VAT; 60-second minimum) [SK9] | single-country TV, up to 5 years: **£840 for the first 60 s + £14/s**. Europe TV, 10 years: £2,280 + £38/s. Europe all media, perpetual: £3,300 + £55/s. Worldwide TV, 10 years: £3,300 + £55/s. Worldwide online, perpetual: £3,600 + £60/s. Worldwide all media, 10 years: £3,960 + £66/s. **Worldwide all media, perpetual: £8,580 + £143/s** (documentaries £4,320 + £72/s) | P, H |
| Stockfilm | flat **$149 per clip** (4K master, worldwide, perpetual) [SK3] | S/P, M |
| TVDATA | royalty-free archival **£250 per consecutive minute** (snippet) | L |

---

## 5. Voice: non-union rates vs ElevenLabs

### 5.1 Non-union human voice-over

| Use | Rate | Covers | Source | P/S, conf. |
|---|---|---|---|---|
| **TV commercial**, non-union, 12-month licence (15–90 s spots) | local **$1,200–$1,500**; regional $1,500–$1,800; cable or national **$2,500–$2,800**; network national **$3,200–$3,500**. Three-month terms: local $400–$500; regional $500–$650; cable/national $750–$1,250; network $1,250–$1,400 | GVAA Rate Guide figures reproduced by RealVOTalent (2026) | RealVOTalent [VO1] (GVAA page itself is gated [VO4]) | S, M |
| Radio commercial, non-union | local $250–$320 (3 mo) to $850–$950 (12 mo); regional $300–$375 to $950–$1,100; national $600–$750 to **$1,500–$1,700** | same | [VO1] | S, M |
| Digital/streaming ads | <100k impressions $150–$500; 100k–1M $500–$1,000; 1M–10M $1,000–$2,000; 10M+ $1,250–$3,000 | Gravy For The Brain US | [VO1] | S, M |
| **Corporate narration** (by finished length) | 1–2 min **$350–$450**; 3–5 min $450–$700; 10–20 min $700–$1,200; 40–60 min **$1,750–$2,350** | GVAA non-union | [VO1] | S, M |
| **Non-broadcast narration** (by finished length, 150 wpm) | 0–1 min **$50–$200**; 2–5 min $200–$350; 5–15 min $350–$500; 15–30 min $500–$750; 30–45 min $750–$1,000; **45–60 min $1,000–$1,250** | Voice123 (open marketplace; based on actual quotes), non-union, non-broadcast; updated 2026-06-02 | Voice123 rates page [VO2] | P (marketplace), H |
| E-learning | GVAA **$30–$55 per finished minute** or $0.20–$0.35/word; Gravy For The Brain $15–$50/min; a typical 60-min module costs $1,200–$3,600 | 2026 | [VO1] | S, M |
| E-learning / explainer (short-form) | $150–$300 per minute; "don't discount below $175/finished minute" | Take One (2026-05-12) | [VO3] | S, L/M |
| Audiobook | GVAA **$200–$500 per finished hour** (Take One: GVAA minimum $225 PFH; $300+ standard); SAG-AFTRA $200–$275 PFH plus contributions | 2026 | [VO1, VO3] | S, M |
| Video games (characters) | non-union **$200–$350/h (2–4 h minimum)**; mobile games $200–$500 per game; SAG-AFTRA $1,135/day (up to 3 voices) | 2026 | [VO1] | S, M |
| Animation | non-union about **$1,000 per 22-min episode**; SAG-AFTRA $1,082–$1,092 per session | 2026 | [VO1] | S, M |
| Voices.com rate guide | **not retrievable** (Cloudflare); snippets say only "non-broadcast jobs … priced per word or per finished minute". A Voices blog puts animation narrators at $20–$100/h (entry) and $100–$300/h (mid) | — | [VO5] | Gap / L |
| SAG-AFTRA references | TV session $618.30; audio session $404.30 (as listed by RealVOTalent); corporate SAG-AFTRA scale $505–$563 for the first hour + $148 per extra half-hour | [VO1]; see E §2.10 for primary SAG figures | S, M |

**Why short scripts cost more per minute:** minimum fees dominate. At GVAA rates, a 1–2 minute narration costs **about $175–$450 per finished minute**, while a 60-minute one costs **about $29–$59 per minute**. The Voice123 equivalents are about $50–$200 and about $17–$21 per minute (derived).

### 5.2 ElevenLabs vs human (derived; prices from E [S57])

- ElevenLabs API v3 / Multilingual v2 costs **$0.10 per 1k characters**. At about 900–1,000 characters per spoken minute, that is **about $0.09–$0.10 per minute**. Flash/Turbo is about half that.
- A 60-min narration costs about **$5.40–$6** by API, against **$1,000–$1,250** (Voice123) or **$1,750–$2,350** (GVAA) non-union. That makes AI about **170–430× cheaper** on the voice line alone, before human direction and QC time.
- A cross-check from bundled pricing: Artlist AI Starter at $11.99/mo (annual) includes "up to 3 hours of AI voiceover", about **$0.07/min**. AI Core at $23.99 includes up to 8 hours, about $0.05/min [SK7].
- A 30-s national TV spot with a non-union human voice costs **$2,500–$3,500**. An AI voice is under $1 in compute, but commercial and likeness rules apply (SAG-AFTRA digital-replica terms, E §2.12).

---

## 6. Catering and craft services per head per day

| Market | Rate | Covers | Source, date | P/S, conf. |
|---|---|---|---|---|
| **US** (national; NYC/LA **+15–30%**) | breakfast **$12–$18**; lunch **$14–$20**; dinner or second meal **$18–$28** per head; **craft services $3–$5 per head per day**. Worked examples: 20 crew with 2 meals plus craft = $37 per head, or $42.55 with 15% contingency; 60 crew with 3 meals plus craft = $68, or $78 with contingency | 2026 US production catering | Tools for Film, 2026-07-18 [C1] | S, M |
| US benchmark | GSA M&IE FY2026 **$68/day** standard (B $16, L $19, D $28, incidentals $5); up to **$92/day** in high-cost localities | federal per diem | via [C1] (gsa.gov) | P via S, H |
| US (budget guide) | catering **$35–$75 per person per meal**; craft services **$8–$15 per person per day**; 60 crew × 40 days gives $84k–$180k | 2026 | Saturation.io "Film Budget Breakdown by Department" (snippet) [C2] | S, L/M |
| US craft services (coordinator budgets) | **$15–$25 per person per day** (mid-range); **$25–$50** (studio). Craft coordinator day rates: LA mid-level $350–$550, senior $600–$1,000+; kit fee $25–$100/day | 2026 | Saturation.io "Craft Services", 2026-03-23 (mod 2026-04-25) [C2] | S, M |
| US micro-budget | craft from about **$10 per person per day** (Raindance); $2 / $5 / $10 quality tiers (Rodeo Cat, snippet) | — | [C9] | S, L |
| **UK, Cornwall** | **£30.00 per head + VAT** for a full production day (hot breakfast, craft table, multi-course hot lunch, afternoon break, all-day standby). The caterer says this is "the rate we have actually charged across 42 billed shoot days". Night shoots and suppers are extra | 2026 | Salt Wind Catering menu PDF [C3] | P, H |
| **UK, London** | "breakfast, lunch and afternoon tea" **£46**; supper £18; hand-held hot £12; soup and sandwiches £8. Continuous-working-day surcharge **£800/day**; Saturday surcharge £700 and Sunday £900–£1,200 (the page lists both figures) for the first 10 h; overtime £325–£550/h weekdays; **night shoots £1,250 (weekday) or £1,500 (weekend) for the first 10 h**; early calls £350–£600; travel days £1,200–£1,500; kitchen mileage £3.25/mile; generator £30/h | undated price list | Delicious Film Catering [C4] | P, M |
| UK, small TV (10–40 crew) | full shoot day (≤10 h) **£42 per head** (simple) or **£65** (premium), both with a 15-cover minimum. Long day or night (12+ h): **£55** (simple, 10-cover minimum) or **£85** (premium, 15-cover minimum) | 2026 | Chef Jones [C5] | P, H |
| UK, caterer guide | basic all-in **£18–£30 per head per day** (breakfast, lunch, tea); mid-range £22–£45; premium £45+ | 2026-03-26 | Nomad Crew Catering [C6] | S, M |
| UK, other snippets | ReelMenus £18–£35 per head; Manna Made "breakfast and lunch from £22 per person delivered"; Poptop average £20 per guest | 2026 | snippets [C7] | S, L |
| **Canada, Toronto/Ontario** | **CA$40–$70 per person per shoot day** (hot meals plus craft); craft CA$5–$10 per person per day; breakfast CA$12–$18; lunch CA$25–$45; second meal CA$25–$40 | 2026 | Onyx Hospitality [C8] | S, M |
| Union meal penalties (US) | SAG-AFTRA: $25 for the first half-hour, $35 for the second, then $50 per half-hour (ULB flat $25) | per [C1] | S, M |

---

## 7. Explosion vehicles, picture-car multiples and rigging

| Item | Value | Covers | Source, date | P/S, conf. |
|---|---|---|---|---|
| **US surplus school bus** (government auctions) | **median $1,875** across **801 completed auctions** since May 2026; typical **$1,000–$3,380**; individual listed examples range from $10 to $21,500 (bus age and condition not captured); Kansas median $3,380 (snippet) | 2026 | GovAuctions.app sold-price index [X2] | S (aggregator of public auction results), M/H |
| Retired district bus (high end) | "can sell for **$8,500**" at auction | 2026 | BusesForSale.com (snippet) [X3] | S, L |
| Live surplus bus bids | $760 (2015 IC CE bus), $1,275 (22-passenger) | Sept 2026 | Public Surplus (snippet) | S, L |
| **Junk or scrap car** (purchase proxy) | junkyards pay **$200–$1,500** per car; scrap steel **$120–$200/ton** (early 2026) or $155–$205/ton (July 2026); a car weighs 1.5–2 tons, about $180–$400 of metal | 2026 | U-Pull-It (2026-04-28, mod 2026-08-30) [X4]; CA junkyard blog (snippet) [X5] | S, M |
| Junker for a stunt (practitioner) | "a junker for like **$750**" | old | Reddit r/Filmmakers (snippet) [X9] | L |
| **Picture-car rental** | economy **$135–$210/day**; SUV $165–$270; luxury or sport $270–$420; **pre-1980 classic $420–$3,000**; **specialty or picture build $600–$5,000/day** | 2026, US marketplace published rates | Revolution Picture Cars, 2026-08-27 [X1] | P (published marketplace rates), H |
| **Picture-car multiples** | Fast X: **700–800 cars** on screen; **250–300 built** in the shop; hero builds take **about 300 hours of labor** each; 6 duplicate Caprices built quickly for Fast 7; about 7 duplicates per hero car (Stream G) | 2023 | CBR interview with Dennis McCarthy, 2023-05-18 [X6] | S (direct quotes), M |
| Tokyo Drift car budget | "more than **200 cars** … for only **$7 million**", about **$35k per car** (derived) | 2006 | Edmunds (**snippet**; 403) [X7] | S, L/M |
| Speed (1994) buses | **11 GM New Look TDH-5303 plus 3 Grumman 870** buses; **2 destroyed** in explosions; others adapted for interior, high-speed and "under bus" work | 1994 | Wikipedia [X8] | S, M |
| Stunt adjustments (practitioner) | "Stunt bump probably **$1,500** for crashing. Maybe **$2,500** for the flip"; coordinator plus player about $985/day + about 44% fringes | old (about 2018) | Reddit r/Filmmakers (snippet) [X9] | L |
| Budget-guide ranges | high-risk stunt **$5,000–$100,000**; special effects **$1,000–$10,000 per scene** | 2024–25 | Filmustage (mod 2025-03-03) [X10] | S, L |
| Nitrogen cannon-roll rigs | full six-point cage, fuel cell, seat, harness and extinguisher systems; **no price published** | UK | Bickers Action [X11] | P (capability), — |
| 747 (Tenet) | Nolan said buying a real 747 was cheaper than miniatures plus CG; **price not disclosed** | 2020 | Total Film via GamesRadar/No Film School [X12] | S, M |
| Labor and permit core for an explosion (first pass) | about **$10–11k per 12-h day** (stunt coordinator, 2 performers, pyro foreperson, 2 FX techs, FSO, permits) | 2025–26 | E §2.9 | derived, M |

**Derived marginal cost of a bus or car explosion gag**, excluding the unit day (L/M):

- **vehicle**: $0.2k–$1.5k for a car, or $1k–$3.4k for a surplus bus (up to $8.5k for a newer one)
- **transport and tow**: not sourced (assume $0.5k–$2k)
- **SFX prep and rigging**: 1–2 days of the FX crew (about $2.7k/day in wages, first pass) plus pyro consumables (not sourced)
- **safety and permits**: $1.6k–$3.5k
- **stunt team** if performers are involved: about $4.5k plus stunt adjustments of $1.5k–$2.5k

That totals **about $5k–$25k per gag**, or about $10k–$25k when a stunt team is on the gag (consistent with the first-pass $10–11k labor-and-permit core). The **added unit day** ($15k–$120k indie; $315k–$1.6M studio, CFC-qualified) remains the dominant cost, as in Stream E/G.

---

## 8. Verify or refute: specific claims

| Claim | Verdict | Evidence | Source(s) |
|---|---|---|---|
| **"AICP 2025: $387k average national :30 bid"** | **Unverified; probably spurious.** | The figure appears only in blogs (Intrigue Video Production, 2026-06-04; Greenfrog Labs) that cite "AICP 2025 Guidelines" with no link. AICP's public bidding resources contain **no average-cost statistics**: the Bid Form, the National Guidelines, the **Bidding Reference Guide (Feb 2026)** and the **Suggested Best Practices – Bidding (2026)**. AICP's member surveys (Bovitz) are **behind a member login**. The last public national-average series is the **4A's TV Production Cost Survey**: $354k per :30 on 2011 data, discontinued in 2014 (E [S50–51]). Greenfrog also cites a "4A's 2025 Production Cost Survey median $342,000", which **conflicts with that discontinuation**. | [A3, A4, A5]; E [S50–S52] |
| **"17.5% agency markup"** | **Not in AICP documents; probably a garbled version of 17.65%.** | The standard agency commission is 15% of gross, which equals a **17.65% markup on net**: $100 net × 1.1765 = $117.65, and $17.65 is 15% of $117.65. Production-company markups are a separate line (Saturation cites about 25%, range 20–35%; E notes). | Communications Counsel; Bizfluent [A6] (S, M) |
| **AICP shoot-day cost tiers** ($15–30k small, $40–80k medium, $100–300k large) | **Unverified.** | No AICP or other primary source was found. Other secondary claims include "full crew $30,000–$100,000+ per shoot day" (h3aifilms, an AI studio; L) and a "full-production day with 15–30 crew $15,000–$50,000+" (a photography context; L). Stream E's union-component floor of ≥$55k per day for a national spot is the best-grounded number. | search results; E §3.2 |
| **"Genre charges ~$100k per :30"** | **Verified as reported (self-reported to Semafor).** | "His content studio, Genre.ai, charges around **$100,000** to make a 30-second commercial, though he only spends **a few thousand dollars for credits on Veo 3** to create them." | Semafor, "Mad Men GPT…", 17 Sep 2025 (URL date; page metadata 2025-09-16 to 2025-09-19; also syndicated on Yahoo Finance) [A1] (S, H) |
| **"Dor Brothers charge ~€200k per spot"** | **Verified as reported.** | "The German company charges roughly **€200,000 (about $235,000)** for its larger advertising spots, said CEO Yonatan Dor." A separate claim, "more than $1M revenue", comes from **the NYT (2025-07-18)**: the studio (Yonatan Dor plus 4 staff and freelancers) "plans to exceed $1 million … in revenue … including AI-related consulting" (via Gigazine; the year in the summary is ambiguous). | Semafor [A1]; Gigazine 2025-07-31 summarising the NYT [A2] (S, M) |
| **Super Bowl production costs** | **Partly supported; needs splitting into components.** | **Airtime:** about **$8M** average for :30 in 2026, with some late buyers paying **over $10M** (THR, citing buyers; USA Today, citing Bloomberg). **All-in:** "starts at **$12 million** on the low end and can run north of **$20 million** … including the $8–$10 million buy-in" (THR). **Talent:** A+ sweet spot **$3M–$5M** (WME's Tim Curtis); cameos five or six figures, some low seven. **Production excluding celebrity:** "a typical Super Bowl will cost **~$1–4M to produce**, excluding celebrity talent" (Ro, from conversations with repeat advertisers); celebrity talent $1M–$5M. Networks also typically require a matching media commitment. The first-pass "$4M–$10M" matches production plus talent, **not production alone**. | THR, 2026-02-05 [A7] (S, H); Ro, 2026 [A8] (S, M); USA Today, 2026-02-08 [A9] (S, H) |

---

## 9. E&O insurance and legal clearance for AI-generated content

### 9.1 Insurer and broker statements, exclusions

| Item | Detail | Source, date | P/S, conf. |
|---|---|---|---|
| **Film insurance broker: AI content may be uninsurable** | "If your production includes AI-generated content, you may not be able to get E&O insurance for the AI-generated content," because "you can't get the kind of clearances insurers need". Its application questions ask: what AI tools, what training or inputs, commercial-use terms reviewed by counsel, infringement checks, disclaimers, and indemnity language | Front Row Insurance (US/Canada), 2025-07-14 (mod 2026-04-02) [I1] | S (broker's own practice), M/H |
| **ISO/Verisk generative-AI exclusions** | New CGL endorsements with a **January 2026** edition date (forms **CG 40 47, CG 40 48 and CG 35 08**) let carriers "generally exclude" generative-AI exposures. CG 40 48 targets **personal and advertising injury**, which includes media and marketing content. Verisk reported "great interest from carriers". Definition: "a machine-based learning system or model that is trained on data with the ability to create content … including … images, audio, video" | IndependentAgent.com (Big "I"), 2025-10-21 [I2]; broker briefings (snippets) | S, H |
| Carrier filings | AIG, Great American and W.R. Berkley filed to exclude AI-tool liabilities (FT, Nov 2025). Carriers are now "quietly declining" E&O and cyber cover for AI outputs, and others are "jacking up prices" (**no figures given**) | CSO Online, 2026-04-16 [I3] | S, M |
| State approvals | Berkshire Hathaway, Chubb and Travelers won state approval to exclude AI liability from standard commercial policies | The Information (snippet) | S, L/M |
| Exclusion examples | Philadelphia Indemnity AI exclusion; Hamilton "generative AI" exclusion; Berkley "absolute" AI exclusion for D&O, E&O and fiduciary lines | Hunton Andrews Kurth [I4] | S, M |
| Entertainment E&O practice | "Carriers now routinely ask whether a production contains AI-generated material, what tools were used, and how rights were cleared … Some policies have begun adding AI-specific exclusions or conditions." Recommends indemnified enterprise tiers and generation logs | Agarunov Law, 2026-07-03 (mod 2026-09-01) [I5] | S, M |
| **AI-specific E&O premium surcharge** | **No figure found** | — | **Gap** |

### 9.2 Baseline film E&O cost (for context; not AI-specific)

| Item | Value | Source | P/S, conf. |
|---|---|---|---|
| Film E&O premium by budget | overall **$1,000–$20,000+**. Under $100k with no third-party content: $1,000–$3,000. $500k–$1M with several territories: $5,000–$12,000. $5M+ with existing music or trademarks and global reach: **$15,000–$30,000+** | TH Agency (mod 2026-03-29) [I6] | S, M |
| Film E&O premium (another broker) | independent films $800–$1,500; commercials $1,500–$5,000; larger productions $2,000–$4,000+ | MovieInsure (mod 2026-07-07) [I7] | S, L/M |
| Typical terms | one premium covers a **3-year term**; distributor minimum **$1M per claim / $3M aggregate** (Netflix/HBO often $1M/$5M+); deductible $2,500–$25,000 (distributors often cap it at $10,000); carrier AM Best B+ or better | Kelly Insurance Group FAQ (mod 2026-06-28) [I8] | S, M |
| Script clearance report | **$1,000** for a feature-length project (Hollywood Script Research); **$10 per page** (Saga Clearance, scripts of 50 pages or fewer) | snippets [I17] | P via snippet, M |

### 9.3 Studio and platform clearance requirements and AI vendor indemnities

| Item | Detail | Source, date | P/S, conf. |
|---|---|---|---|
| **Netflix partner guidance on generative AI** | Partners must **inform Netflix of any intended genAI use**. Five principles: no replication of copyrighted material; tools must not store, reuse or train on production data; enterprise-secured environments; generated material temporary and **not part of final deliverables** unless approved; no replacing talent or union work without consent. **Escalation and written approval** are required for genAI main characters, key visuals or central settings, and for inputs referencing copyrighted works or public figures. "**Production partners are responsible for legal vetting**" of vendors | IBC, 2025-08-30 [I9]; Netflix Studio Partner page (snippet) [I10] | S / P (snippet), H |
| **MPA–ByteDance MOU (Seedance)** | On 2026-08-17 the MPA and ByteDance signed a **non-binding** MOU covering Seedance, Seedream, TikTok, CapCut and Dreamina with "strong guardrails". **Output-layer measures**: real-face input blocking, character filters, visible watermarks and **C2PA** credentials, shipped after Seedance 2.0's global rollout was paused (30 Mar 2026). Seedance 2.5 launched in July 2026. It **does not address training-data infringement**. Studios that sent cease-and-desist letters (Disney, WBD, Paramount, Sony, Netflix) keep their legal options. Red-teamers still report "likeness-adjacent" outputs | THR, 2026-08-17 [I15] (S, H); Tech Times, 2026-08-18 [I16] (S, M) | S |
| **BytePlus Seedance "Advanced Creation Rights"** (enterprise add-on for Seedance 2.0/2.5) | Free and Entry tiers (50 assets, 3 QPM). **Advanced: $14,000/year or $1,400/month** (1M assets, 120 QPM, "**Clear pathway to substantiate usage rights**"). **Premium: $42,000/year or $4,200/month** (5M assets, 300 QPM). Requires enterprise real-name verification and a real-person verification/upload flow for a **private real-person portrait library**. No refunds | BytePlus docs, last updated **2026-08-31** [I13] | P, H |
| BytePlus video-generation specific terms | behind sign-in (**not read**); an IP indemnity position is not confirmed | — | Gap |
| **MiniMax Open Platform ToS** (effective **2026-03-30**) | MiniMax **will defend and pay judgments** for third-party **patent or copyright** claims alleging the user's use of the service infringes, **"within the limitations of liability"**. The cap is **the fees paid for the service that caused the loss** (for terms over 12 months, fees paid in the prior 6 months). Excluded: Client Data, combinations, modifications and more. **The user indemnifies MiniMax** for claims involving the user's inputs or products. MiniMax may use inputs and outputs to improve its services | platform.minimax.io/protocol/terms-of-service [I14] | P, H |
| **Google Veo** | "Veo" (generally available versions via the Gemini Enterprise Agent Platform, formerly Vertex AI) is on Google Cloud's **Generative AI Indemnified Services** list (training-data and generated-output indemnities) | cloud.google.com terms page, last modified **2026-07-20** [I11] | P, H |
| Adobe Firefly | enterprise customers can buy an entitlement with **contractual IP indemnification** for select Firefly outputs | Adobe business page (snippet) [I12] | P (snippet), M |
| Shutterstock AI | indemnification for AI-generated images for enterprise customers | Shutterstock blog (snippet) [I19] | P (snippet), M |
| Artlist | Max Business ($399/mo annually) includes **legal indemnification** for the stock catalog (AI outputs not stated) | [SK7] | P, M |
| **Studio legal-clearance cost specifically for AI content** | **No published figure.** The practical cost items are clearance-counsel time, generation logs and documentation (Copyright Office Part 2), vendor enterprise tiers ($14k–$42k/yr for Seedance rights; enterprise Firefly), and possible E&O exclusions | — | **Gap** |

---

## 10. UK and Canada: average production cost per hour by genre

### 10.1 Canada: CMPA Profile 2025 (Nordicity; fiscal 2024/25, April 2024–March 2025)

Values are budgets in **CA$000s per hour** for Canadian-certified TV production (CAVCO/CRTC). The source is the Profile 2025 online report dataset "Exhibit 3-10 a/b Average budgets, by category", imported 2026-05-20 and read from the page payload. The Profile PDF says English hourly budgets exceed French "in all categories, except for variety and performing arts" [U1] (P, H).

| Category | English: average | English: median | French: average | French: median | English average, 2015/16 → 2023/24 → 2024/25 |
|---|---|---|---|---|---|
| **Fiction** (drama, comedy) | **1,797** | **1,615** | **797** | 730 | 1,298 → 1,549 → 1,797 |
| **Children's and youth** | **1,114** | 648 | 390 | 284 | 1,073 → 1,292 → 1,114 |
| **Documentary** | **380** | 305 | 242 | 187 | 333 → 411 → 380 |
| **Lifestyle and human interest** | **416** | 311 | 284 | 144 | 273 → 367 → 416 |
| **Variety and performing arts** | **435** | 313 | 452 | 254 | 424 → 486 → 435 |

**Canadian theatrical features (fiction), 2024/25** (Exhibit 4-7) [U2] (P, H):

| | Average | Median |
|---|---|---|
| English-language | **CA$4.1M** | CA$2.2M |
| French-language | CA$2.6M | CA$2.4M |
| All languages | CA$3.5M | CA$2.3M |

By budget band, 16% of features were under CA$1M, 26% CA$1M–$2.5M, 32% CA$2.5M–$5M and 26% CA$5M or more.

The CMPA Profile 2025 summary reports total Canadian production volume of **CA$10.2bn** in 2024/25 (+4.6%).

**Derived per finished minute:**

- English fiction: about **CA$30k/min** (average) and CA$27k (median).
- English documentary: about CA$6.3k/min.
- Lifestyle: about CA$6.9k/min.
- English feature: about CA$45k/min (CA$4.1M ÷ about 90 min).

### 10.2 United Kingdom

| Measure | Value | Covers | Source, date | P/S, conf. |
|---|---|---|---|---|
| **BBC tariff (price the BBC pays per hour, £k)** | **Drama:** non-network 30–500; low-cost 50–600; **mid-cost 500–800**; **high-cost 650–1,100** (expected to use HETV relief and third-party money). **Comedy:** non-network 50–500; low 160–360; mid 360–540; high 540–900. **Entertainment:** non-network 20–220; low 20–130; mid 130–400; **high 400–750**. **Factual:** non-network 10–200; daytime 10–60; low 40–125; mid 125–225; **high 225–350**. **Children's:** high-cost CBBC drama 400–700; low-cost CBBC drama 140–400; CBBC factual 80–200; CBBC factual entertainment 100–250; CBBC entertainment 50–300; **animation 150–300**; CBeebies drama 150–600; age 6–9 drama 250–400 | licence-fee price including the production fee; **not total budget** (HETV shows add tax relief and deficit finance) | BBC "tariff range of indicative prices", **updated Aug 2023** [U3] | P, H |
| Ofcom PSB cost per hour (2017) | **drama £769k/hr; entertainment £175k/hr; specialist factual £142k/hr** (PSB channels, first-run UK originations) | 2017 Ofcom data | UK Parliament written evidence PSB0037 (**snippet**; site 403) [U6] | S, M (dated) |
| Channel 4 and BBC drama inflation | C4 commissioned drama budget per hour rose from **£750k to £1.5M (2013–2017)**; BBC high-end drama budgets up **60% in 5 years** | 2019 | House of Lords Communications Committee, "Public service broadcasting: as vital as ever" (**snippet**; 403) [U7] | S, M (dated) |
| UK drama "Band 2" | **£1.25M–£3M per hour** | 2025 | Broadcast (paywalled; **snippet**) [U8] | S, L/M |
| Statutory HETV threshold | ≥ **£1M core expenditure per broadcast hour** | 2026 | gov.uk AVEC (E [S79]) | P, H (a floor) |
| **BFI 2025 production statistics** | HETV UK spend **£4.03bn across 168 shows** (inward investment £3.26bn or 81%; domestic £688m or 17%; co-productions £84m or 2%), about **£24.0M UK spend per HETV show** (derived). Film: **£2.77bn across 193 films** (inward £2.51bn from 58 features, about **£43M each**, derived; 96 domestic films £193m, about **£2.0M each**, derived; 39 co-productions £68m) | UK spend only (not total budget); 2025 | BFI official statistics, 2026-02-05, via Cinematography World [U4] | S (reporting P), H |
| BFI 2024 | HETV £3.44bn (first reported; revised £3.75bn) across **181 shows** (about £19M each, derived); domestic operators' HETV (>£1M/hr) spend fell 25% to **£598m** | 2024 | Guardian, 2025-02-06 [U5]; [U4] | S, H |
| **Pact Census 2026** (Oliver & Ohlbaum) | independent producers' total revenue **£3.81bn** in 2025 (+4.1%); UK primary TV revenues **£1.99bn** (−4.7%); international £1.57bn (+15.8%); secondary rights £575m. **No per-hour costs published** in the coverage. Pact/O&O research cited by the BBC says per-hour costs have risen across all genres since 2014, fastest in children's (figures not retrieved) | 2025 | Deadline, 2026-09-08 [U9]; BBC written evidence BBC0032 (snippet) | S, M |
| Ofcom Media Nations 2025 / PSB annual report cost per hour by genre | **Not retrieved** (Cloudflare challenge on ofcom.org.uk) | — | [U11] | **Gap** |

---

## 11. Remaining gaps and uncertainties

1. **Large-stage rates.** Major-lot LA and Atlanta rates, and UK studio rates (Pinewood, Shepperton, Shinfield, Bottle Yard, 3 Mills), are unpublished and quoted weekly or monthly. Only small and independent stages have published prices. Knight Frank's reports give capacity, not rents.
2. **LED volume rates for named vendors** (NEP Virtual Studios, Pixomondo, XR Studios, Lux Machina, the ARRI Stage and Dimension) are quote-only. The Pixomondo/MELS figure of CA$14k–$36k/day comes from a snippet of an LED maker's blog (L).
3. **Current rental prices for Shotover and Cineflex** from rental houses are not public. The Helifilms and Tyler lists are dated. The Hovercam (UK) rate card sits behind a broken certificate and was not read.
4. **Shutterstock and Pond5 first-hand prices** are behind a DataDome captcha. Photutorial's 30 July 2026 capture and Stockfilm's Pond5 range are used instead. The full Pond5 tier table was not captured.
5. **The GVAA guide itself** (email gate) and **Voices.com** (Cloudflare) were not read. The GVAA numbers come via RealVOTalent (S).
6. **Ofcom per-hour costs by genre (2024/25)** were blocked by Cloudflare. The UK per-hour figures rely on the 2023 BBC tariff (prices, not budgets) and 2017–2019 parliamentary evidence. BFI publishes spend per production, not per hour.
7. **AI-specific E&O premium surcharges** and **studio AI-clearance costs**: no published figures. BytePlus's video-generation terms were not read (sign-in).
8. **VFX per finished minute for TV** is derived only. The Vitrina figures behind Tools for Film are snippet-level and not independent of it.
9. **Explosion SFX consumables, tow and transport, and fire-equipment standby** remain unsourced. The vehicle and labor parts are sourced.
10. **AICP**: the member surveys are login-gated, so the $387k claim can't be definitively refuted. It remains unverified, with no primary trace.
11. **Voice rate conflicts.** E-learning ranges from $15–$55/min (per-word derived) to $150–$300/min (short-form). This reflects minimum fees on short scripts.
12. **Reddit** was blocked, so all Reddit-sourced numbers are snippets (L).

---

## 12. Sources (all accessed 2026-09-25 unless stated otherwise)

**VFX**

- [V1] Pixune, "VFX Cost Guide 2026: Cost Per Shot, Second & Minute" (updated 2026-08-16). https://pixune.com/blog/3d-vfx-cost/
- [V2] Tools for Film, "How to Budget VFX for an Indie Film: Real Cost at 4 Levels" (2026-09-04). https://www.toolsforfilm.com/blog/how-to-budget-vfx-indie-film-real-cost-four-complexity-levels
- [V3] Tools for Film, VFX Shot Cost Estimator. https://www.toolsforfilm.com/tools/vfx-cost
- [V4] C&I Studios, "CGI Services for Film Production" (2026-06-19, updated 2026-09-17). https://c-istudios.com/cgi-services-for-film-production/
- [V5] BLKRIP, "VFX Shot Pricing Guide". https://blkrip.vip/pricing/vfx-shot-pricing/
- [V6] Mimic VFX, "How Much Does VFX Cost? 2026 Pricing Guide" (2026-08-17). https://www.mimicvfx.com/post/how-much-does-vfx-cost-1 ; and "2026 Budget Guide" (2026-07-16). https://www.mimicvfx.com/post/how-much-does-vfx-cost-budget-guide
- [V7] Framebid, "Matte Painting Outsourcing Guide". https://www.framebid.com/blog/matte-painting-outsourcing-guide
- [V8] Framebid, "Complete Guide to VFX Outsourcing in 2025" (2025-09-16). https://www.framebid.com/blog/complete-guide-vfx-outsourcing-2025
- [V9] Enginious, "Digital Doubles Cost Calculator" (v0.2, Q2 2026). https://enginious.tech/enginious-digital-doubles-calculator/
- [V10] Vitrina.ai (snippets; 403): https://vitrina.ai/blog/vfx-cost-guide/ ; https://vitrina.ai/blog/vfx-budget-breakdown-2026/
- [V11] Reddit r/vfx (snippets): https://www.reddit.com/r/vfx/comments/1u1pq3/vfx_pricing/ ; https://www.reddit.com/r/vfx/comments/vqt18a/ ; https://www.reddit.com/r/vfx/comments/1dqw8fv/ ; https://www.reddit.com/r/vfx/comments/yx5quy/
- [V12] CGHERO, "3D & CGI Production Pricing" (2026-02-05). https://cghero.com/pricing
- [V13] Roland Berger, "AI in VFX: where automation is changing the pipeline" (2026-08-09). https://www.rolandberger.com/en/Insights/Publications/AI-in-VFX-where-automation-is-changing-the-pipeline.html
- [V14] Deadline, "Lionsgate's Michael Burns Says AI Will Save The Company 'Tens And Tens Of Millions…'" (2026-06-04). https://deadline.com/2026/06/lionsgate-michael-burns-ai-saves-millions-runway-1236941043/
- [V15] IBC, "Netflix embraces generative AI for Argentine TV series" (2025-07-23). https://www.ibc.org/artificial-intelligence/news/netflix-embraces-generative-ai-for-argentine-tv-series/22053
- [V16] VFX Voice, "The Indie VFX Revolution Is in Full Swing" (2025-04-01). https://vfxvoice.com/the-indie-vfx-revolution-is-in-full-swing/
- [V17] VFX Voice, "Stranger Things Season 5 Turns the Upside Down Right Side Up" (snippet). https://vfxvoice.com/stranger-things-season-5-turns-the-upside-down-right-side-up/ ; The Yard VFX, "Inside the VFX of Stranger Things 5" (2026-06-16; snippet). https://theyard-vfx.com/2026/06/16/art-of-vfx-stranger-things-5/
- [V18] AEstruct, "AI in Digital Video & Animation Production" (Feb 2026). https://assets.aestruct.com/resources/reports/ai-in-digital-video-animation-2026-02.pdf
- [V19] XineMind, "AI VFX vs Traditional VFX: Cost & Timeline Comparison" (2026-05-09). https://www.xinemind.com/blog/ai-vfx-vs-traditional-vfx-cost-timeline-comparison
- [V20] House of David: Stream C (VP Land 2025-10-16; TheWrap 2025-11-10); Wired quote via https://news.spotlightnews.us/articles/house-of-david-showrunner-defends-using-5x-more-ai-in-season-2-battle-sequences
- [V21] AWN, "MARZ Announces Breakthrough 'Vanity AI' De-aging VFX System". https://www.awn.com/news/marz-announces-breakthrough-vanity-ai-de-aging-vfx-system
- [V22] (Rejected) Frame & Focal (2026-07-23). https://frameandfocal.com/photography-tips/look-what-goes-your-favorite-movie-visual-effects-3508
- [V23] (Rejected) worldmetrics.org, zipdo.co and gitnux.org "AI in VFX statistics" pages.
- [V24] CG Channel, "Golaem releases crowd animation tool Golaem 9" (June 2024). https://www.cgchannel.com/2024/06/golaem-releases-crowd-simulation-tool-golaem-9/
- [V25] vfxrendering.com, "Best Render Farm for VFX Roto and Paint". https://vfxrendering.com/best-render-farm-for-vfx-roto-and-paint-plate-processing-on-cloud/
- [V26] ailearningguides.com (2026-05-09) and aivideoadvisor.com (marketing claims; L).

**Stages and virtual production**

- [ST1] Studio Space Atlanta rates (modified 2026-07-29). https://studiospaceatl.com/studio-1-rates/ ; https://studiospaceatl.com/studio-5-rates/
- [ST2] ATL Film Studios FAQ. https://www.atlfilmstudios.com/faq/
- [ST3] Stray Angel Films, SAF Production Stage (2026-08-12). https://www.strayangel.com/saf/production-services/saf-stage-rentals/rent-saf-white-infinity-cyc-soundstage/
- [ST4] DFI Rentals, "Soundstage Rental Cost Los Angeles: 2025 Rate Breakdown". https://www.dfirentals.com/news/soundstage-rental-cost-los-angeles
- [ST5] Variety, "L.A. Soundstages Remain One-Third Empty Even as New Facilities Open" (2026-03-18). https://variety.com/2026/film/news/soundstage-occupancy-filmla-report-vacant-1236691657/
- [ST6] Millennium Studios, 'A' Stage Rate Card 2025/2026. https://millenniumstudios.co.uk/pdf/Millennium-Studios-Rate-Card-2025-2026.pdf
- [ST7] Silvertown Studios, rates. https://www.silvertownstudios.co.uk/rates-1
- [ST8] Mammoth, "Virtual production stage in London costs explained" (2026-08-10). https://www.mammoth.london/post/virtual-production-stage-london-costs-explained
- [ST9] XR Stage LA (Affordable Sound Stages). https://xrstagela.com/
- [ST10] WePlay Studios pricing. https://book.weplay.tv/pricing
- [ST11] CoPilot Co., "How Expensive is LED Virtual Production? A Cost Breakdown" (2025-02-26). https://www.copilotco.io/blog-posts/how-expensive-is-led-virtual-production
- [ST12] TriVision Studios, "How Much Does LED Wall Rental Cost? 2026" (2026-05-12). https://trivisionstudios.com/how-much-does-led-wall-rental-cost-2026-pricing-guide/ ; "LED Volume Stage Rental on the East Coast" (2026-08-25). https://trivisionstudios.com/led-volume-stage-rental-on-the-east-coast-what-to-know/
- [ST13] Tools for Film, Virtual Production Cost Estimator. https://www.toolsforfilm.com/tools/virtual-production-cost
- [ST14] SP Studios, "How Much Does Virtual Production Cost in Toronto?". https://www.spstudios.ca/post/how-much-does-virtual-production-cost-in-toronto-led-volume-vs-green-screen
- [ST15] Xinglu LED (snippet). https://www.xingluled.com/led-wall-film-studio-rental-what-icvfx-volume-rental-actually-costs-on-your-shoot-week/
- [ST16] Reddit r/cinematography (snippet). https://www.reddit.com/r/cinematography/comments/13uuqti/
- [ST17] 3 Mills Studios, stages. https://3mills.com/allstages/
- [ST18] The Bottle Yard Studios, stages. https://www.thebottleyard.com/space/stages/
- [ST19] Stream C (House of David; VP Land 2025-10-16).
- ARRI Stage London (specifications only). https://www.arri.com/en/solutions/virtual-production/arri-stage-london

**Helicopter and aerial**

- [H1] Government of Alberta, "2025 Casual Charter Helicopter Rates" (effective 2025-04-01). https://www.alberta.ca/system/files/custom_downloaded_images/fpt-wildfire-casual-charter-helicopter-rates.pdf
- [H2] Ridgeline Aviation, "Helicopter Pricing and Policies" (2025-01-01). https://www.flyridgeline.com/wp-content/uploads/2025/03/Heli-Pricing-2025.pdf
- [H3] Jettly, Airbus AS350 B3 charter rates. https://jettly.com/private-jet/airbus-as350-b3
- [H4] SkyMatch, helicopter charter cost calculator. https://skymatchgroup.com/helicopter-charter-cost-calculator
- [H5] Saturation.io, "Helicam Operator" (2026-03-23, mod 2026-04-25). https://saturation.io/film-crew-positions/helicam-operator
- [H6] Saturation.io, "Helicam Pilot" (2026-03-23, mod 2026-04-25). https://saturation.io/film-crew-positions/helicam-pilot
- [H7] Helifilms rate card. http://helifilms.com/ratecard.html
- [H8] Tyler Camera Systems, camera mount pricing. https://www.tylermount.com/camera-mount-pricing.html
- [H9] WPR NY, "Cost of Aerial Helicopter Video Over Manhattan" (2015-05-08). https://wprny.com/nyc-video-company/video-production/cost-of-aerial-helicopter-video-over-manhattan/
- [H10] Streamwerx offer (Oct 2011). https://streamwerx.com/offer
- [H11] Flight Ops HQ repositioning estimator, https://www.flightopshq.com/calculators/repositioning-fee-estimator ; Jettly, "Helicopter Taxi Price Guide 2026", https://jettly.com/post/helicopter-taxi-price ; uncompromised.travel (snippet).

**Stock footage**

- [SK1] Photutorial, "Shutterstock video pricing, explained" (mod 2026-07-30). https://photutorial.com/shutterstock-video-pricing/
- [SK2] FootageSecrets, "How Much does Stock Footage Cost?" (mod 2025-11-17). https://www.footagesecrets.com/buyers-guide/how-much-does-stock-footage-cost/
- [SK3] Stockfilm, Licensing Calculator. https://stockfilm.com/tools/licensing-calculator
- [SK4] BityClips, Pond5 and Dissolve pricing pages. https://bityclips.com/tool/pond5/pricing ; https://bityclips.com/tool/dissolve/pricing
- [SK5] Photutorial, "Getty Images pricing, explained" (mod 2026-07-30). https://photutorial.com/getty-images-pricing/
- [SK6] Filmsupply pricing (rendered). https://www.filmsupply.com/pricing
- [SK7] Artlist pricing, Stock Catalog and AI tabs (rendered). https://artlist.io/pricing
- [SK8] DroneImageBank. https://droneimagebank.com/
- [SK9] BFI, "Archive footage licensing rates". https://www.bfi.org.uk/archive-content-sales-licensing/archive-footage-sales/archive-footage-licensing-rates
- [SK10] Filmpac, "Filmpac vs Filmsupply". https://filmpac.com/filmpac-vs-filmsupply/
- [SK11] Shutterstock and Pond5 pricing pages: DataDome captcha (not retrieved). https://www.shutterstock.com/video/pricing ; https://www.pond5.com/pricing
- [SK12] MicrostockGroup contributor thread (snippet). https://www.microstockgroup.com/general-stock-video/just-did-pond5-clip-pricesales-research-here's-the-result/

**Voice**

- [VO1] RealVOTalent, "Voiceover Rates 2026: Rate Guide Data for Buyers". https://www.realvotalent.com/voiceover-rates
- [VO2] Voice123, voice-over rates calculator (mod 2026-06-02). https://voice123.com/pages/voice-over-rates-calculator/
- [VO3] Take One, "Voice Over Rates: What to Charge in 2026" (2026-05-12). https://www.onetakevo.com/blog-vo-rates-2026.html
- [VO4] GVAA Rate Guide (gated; mod 2026-01-02). https://globalvoiceacademy.com/gvaa-rate-guide-2/
- [VO5] Voices.com rates (Cloudflare; snippet). https://www.voices.com/rates
- [VO7] VoiceCrafters (GVAA-based guide; mod 2026-08-11). https://www.voicecrafters.com/industry-standard-voice-over-rates/
- ElevenLabs pricing: see E [S57].

**Catering**

- [C1] Tools for Film, "How to Estimate Crew Catering Costs Before You Lock a Budget" (2026-07-18). https://www.toolsforfilm.com/blog/crew-catering-cost-estimate
- [C2] Saturation.io, "Craft Services" (2026). https://saturation.io/film-crew-positions/craft-services ; "Film Budget Breakdown by Department" (snippet). https://saturation.io/blog/film-budget-breakdown-by-department
- [C3] Salt Wind Catering, Film & TV Production Menus (PDF, 2026). https://www.saltwind.catering/pdfs/salt-wind-film-menu.pdf
- [C4] Delicious Film Catering, price list. https://www.deliciousfilmcatering.com/pricelist
- [C5] Chef Jones, Small TV Production Catering. https://chefjonesonset.co.uk/services/small-tv-productions
- [C6] Nomad Crew Catering, "How Much Does Film Crew Catering Cost?" (2026-03-26). https://www.nomadcrewcatering.com/blog/film-crew-catering-cost
- [C7] Snippets: ReelMenus https://reelmenus.com/blog/best-uk-film-studios-catering ; Manna Made https://mannamade.co.uk/ ; Poptop https://www.poptop.uk.com/suppliers/catering/film-set-catering/
- [C8] Onyx Hospitality, "What Does Film Set Catering Cost?". https://onyxhospitality.ca/blogs/news/what-does-film-set-catering-cost-a-production-budget-breakdown
- [C9] Raindance (snippet). https://raindance.org/lights-camera-catering-examining-the-typical-cost-of-craft-services/

**Explosions and vehicles**

- [X1] Revolution, "Picture Car Rental Cost Per Day for Film & TV (2026 Guide)" (2026-08-27). https://revolution.film/picture-cars/guides/picture-car-rental-cost-per-day
- [X2] GovAuctions.app, school bus sold prices. https://govauctions.app/sold-prices/school-bus
- [X3] BusesForSale.com (snippet). https://www.busesforsale.com/how-much-does-a-school-bus-cost-2026-4
- [X4] U-Pull-It, "How Much Do Junkyards Pay for Cars? 2026" (2026-04-28, mod 2026-08-30). https://u-pull-it.com/blog/how-much-do-junkyards-pay-for-cars
- [X5] CA Junkyards, "Scrap Car Prices by Weight" (snippet). https://cajunkyardsnearme.com/blog/scrap-car-prices-by-weight
- [X6] CBR, "Fast X: Dennis McCarthy on the Cars, Explosions…" (2023-05-18). https://www.cbr.com/fast-x-dennis-mccarthy-interview/
- [X7] Edmunds, Tokyo Drift behind the scenes (snippet; 403). https://www.edmunds.com/car-reviews/features/behind-the-scenes-of-the-fast-and-the-furious-tokyo-drift.html
- [X8] Wikipedia, Speed (1994 film). https://en.wikipedia.org/wiki/Speed_(1994_film)
- [X9] Reddit r/Filmmakers (snippets). https://www.reddit.com/r/Filmmakers/comments/8wmyr8/ ; https://www.reddit.com/r/Filmmakers/comments/28zf26/
- [X10] Filmustage, "Stunts & Special Effects in Film Budgets" (mod 2025-03-03). https://filmustage.com/blog/how-to-include-stunts-and-special-effects-in-film-budgets/
- [X11] Bickers Action, nitrogen roll-over cannons. https://www.bickers.co.uk/stunts/driven-vehicle-cannons/
- [X12] No Film School, Tenet 747. https://nofilmschool.com/tenet-christopher-nolan-bought-747-plane-because-it-was-cheaper-than-cgi

**Claim verification**

- [A1] Semafor, "Mad Men GPT: AI creative studios are drawing investors and consumer eyeballs" (2025-09-16/19). https://www.semafor.com/article/09/17/2025/mad-men-gpt-ai-creative-studios-are-drawing-investors-and-consumer-eyeballs
- [A2] Gigazine (2025-07-31), summarising the NYT, "How a Video Studio Embraced A.I. and Stormed the Internet" (2025-07-18). https://gigazine.net/gsc_news/en/20250731-dor-video-studio-ai
- [A3] AICP Bidding Resources, https://aicp.com/business-resources/business-affairs-information/bidding-resources/ ; AICP Bidding Reference Guide 2026, https://aicp.nyc3.digitaloceanspaces.com/content/assets/editor/PDFs/AICP-Bidding-Reference-Guide-2026_FINAL.pdf ; AICP Suggested Best Practices – Bidding 2026, https://aicp.nyc3.digitaloceanspaces.com/content/assets/editor/AICP-Suggested-Best-Practices-Bidding-2026_FINAL_.pdf
- [A4] AICP past member surveys (login). https://aicp.com/business-resources/aicp-legilative-information/past-member-surveys
- [A5] Intrigue Video Production (2026-06-04). https://www.intriguevideoproduction.com/single-post/what-does-a-tv-commercial-actually-cost-industry-standards-every-brand-should-know ; Greenfrog Labs. https://greenfroglabs.com/blog/30-second-commercial-cost
- [A6] Communications Counsel, https://www.communicationscounsel.com/commission-system ; Bizfluent, https://bizfluent.com/how-to-calculate-advertising-agency-commission.html
- [A7] The Hollywood Reporter, "Super Bowl Ads: Star Talent Fees Down As AI Surges" (2026-02-05). https://www.hollywoodreporter.com/business/business-news/2026-super-bowl-ads-stars-ai-comedy-1236490270/
- [A8] Ro, "The Economics of a Super Bowl Ad" (2026). https://ro.co/perspectives/super-bowl-economics/
- [A9] USA Today (2026-02-08). https://www.usatoday.com/story/sports/ad-meter/2026/02/08/super-bowl-commercial-cost-2026-30-seconds/88575821007/

**Insurance, clearance and AI terms**

- [I1] Front Row Insurance, "Thinking about using AI in your production?…" (2025-07-14, mod 2026-04-02). https://www.frontrowinsurance.com/news/thinking-about-using-ai-in-your-production-heres-what-you-need-to-know-about-insurance/
- [I2] IndependentAgent.com, "Verisk to Roll Out New General Liability Exclusions for Generative AI Exposures" (2025-10-21). https://www.independentagent.com/vu_resource/verisk-to-roll-out-new-general-liability-exclusions-for-generative-ai-exposures/
- [I3] CSO Online, "Insurance carriers quietly back away from covering AI outputs" (2026-04-16). https://www.csoonline.com/article/4159292/insurance-carriers-quietly-back-away-from-covering-ai-outputs.html
- [I4] Hunton Andrews Kurth, "How Insurance Policies Are Adapting To AI Risk". https://www.hunton.com/insights/publications/how-insurance-policies-are-adapting-to-ai-risk
- [I5] Agarunov Law, "AI in Entertainment Production: Legal Guide (2026)". https://agarunovlaw.com/articles/ai-entertainment-production-legal-guide.html
- [I6] TH Agency, "How much is E&O insurance for film?". https://thagency.com/how-much-is-eo-insurance-for-film/
- [I7] MovieInsure, "Film Insurance Cost Guide". https://movieinsure.com/film-insurance-cost-guide/
- [I8] Kelly Insurance Group, "Film E&O Insurance FAQ". https://kellyinsurancegroup.com/film-e-and-o-faq/
- [I9] IBC, "Netflix publishes generative AI guidance for filmmakers" (2025-08-30). https://www.ibc.org/artificial-intelligence/news/netflix-publishes-generative-ai-guidance-for-filmmakers/22220
- [I10] Netflix Studio Partner, "Generative Workflows, Applications, and Use Cases" (snippet). https://studiopartner.netflix.net/studio/generative-workflows-applications-and-use-cases
- [I11] Google Cloud, "Generative AI Indemnified Services" (last modified 2026-07-20). https://cloud.google.com/terms/generative-ai-indemnified-services
- [I12] Adobe, Firefly for business (snippet). https://business.adobe.com/products/firefly-business/firefly-ai-approach.html
- [I13] BytePlus, "Dreamina Seedance Advanced Creation Rights purchase guide" (updated 2026-08-31). https://docs.byteplus.com/en/docs/ModelArk/2377608/
- [I14] MiniMax Open Platform Terms of Service (effective 2026-03-30). https://platform.minimax.io/protocol/terms-of-service
- [I15] The Hollywood Reporter, "Motion Picture Association Inks AI IP Protection Deal With ByteDance" (2026-08-17). https://www.hollywoodreporter.com/business/digital/mpa-inks-ai-video-ip-protection-bytedance-1236675016/
- [I16] Tech Times, "MPA Strikes First AI Copyright Pact; ByteDance Training Liability Stays in Court" (2026-08-18). https://www.techtimes.com/articles/324834/20260818/mpa-strikes-first-ai-copyright-pact-bytedance-training-liability-stays-court.htm
- [I17] Hollywood Script Research rates (snippet), https://www.hollywoodscriptresearch.com/our-rates/ ; Saga Clearance prices (snippet), http://www.sagaclearance.com/Prices.html
- [I19] Shutterstock, "AI indemnity protection for commercial use" (snippet). https://www.shutterstock.com/blog/ai-indemnity-protection-commercial-use

**UK and Canada**

- [U1] CMPA, Profile 2025 (Nordicity; FY2024/25): online report page https://profile.cmpa.ca/en/canadian-television-production/34-program-categories (dataset "Exhibit 3-10 a/b"); PDF https://profile.cmpa.ca/PROFILE_2025_ENG_FINAL.pdf
- [U2] CMPA, Profile 2025, Exhibit 4-7. https://profile.cmpa.ca/en/canadian-theatrical-feature-film-production/44-budgets
- [U3] BBC, "Tariff range of indicative prices for the supply of commissioned television programmes" (updated Aug 2023). https://downloads.bbc.co.uk/commissioning/site/tariff_prices_for_independents.pdf
- [U4] Cinematography World, "BFI official 2025 statistics reveal £6.8 billion film and HETV production spend" (2026-02-05). https://www.cinematography.world/bfi-official-2025-statistics-reveal-6-8-billion-filma-and-high-end-television-hetv-production-spend-in-the-uk/
- [U5] The Guardian, "BBC and ITV slash big-budget TV spend as US streamers pour money into UK" (2025-02-06). https://www.theguardian.com/media/2025/feb/06/bbc-itv-slash-big-budget-tv-spend-us-streamers-netflix-disney-amazon-uk-investment
- [U6] UK Parliament written evidence PSB0037 (snippet; 403). https://committees.parliament.uk/writtenevidence/102239/html/
- [U7] House of Lords Communications Committee, "Public service broadcasting: as vital as ever" (2019; snippet; 403). https://publications.parliament.uk/pa/ld201919/ldselect/ldcomuni/16/1606.htm
- [U8] Broadcast, "UK drama: Tackling the cost conundrum" (paywalled; snippet). https://www.broadcastnow.co.uk/magazine/uk-drama-tackling-the-cost-conundrum/5199570.article
- [U9] Deadline, "International Revenues Of $2.1B Boost British TV Makers – Pact Census" (2026-09-08). https://deadline.com/2026/09/pact-census-international-tv-revenues-up-1237070622/
- [U11] Ofcom, Media Nations 2025 UK report (Cloudflare; not retrieved). https://www.ofcom.org.uk/siteassets/resources/documents/research-and-data/multi-sector/media-nations/2025/media-nations-2025-uk-report.pdf

Raw captures are in `research/E2/pages/` (text extracts, PDFs) and `research/E2/r2/` (rendered pages, network JSON). The search logs are `research/E2/ddg_*.txt`.
