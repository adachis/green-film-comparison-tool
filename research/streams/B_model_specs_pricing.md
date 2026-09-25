# Stream B: AI video model specs and pricing (Seedance 2.5, MiniMax H3, and comparators)

Research date: 2026-09-25. Figures were accessed on 2026-09-24 or 2026-09-25 unless a different date is noted.
FX rate used for RMB: **1 USD = 6.7126 CNY** (ECB reference rate via api.frankfurter.app, dated 2026-09-24; open.er-api.com showed 6.7173 on 2026-09-25).
Primary source means the vendor's own docs, pricing page, or filing. Secondary means press, blogs, or aggregators.
Confidence levels: **H** means verified on a primary page in this session. **M** means one primary source with some ambiguity, or a consistent secondary source. **L** means a single secondary source, an estimate, or conflicting data.

Raw captures of the primary pages are saved next to this file: `bp_pricing_extract_20260925.txt`, `bp_2607688.md`, `bp_1520757.md`, `bp_1330310.md`, `bp_2630943.md`, `volc_1544106.md`, `mm_paygo.md`, `mm_video_pkg.md`, `mm_tokenplan.md`, `mm_h3_local.md`, `h3_readme.md`, `mmcn_paygo.md`, `openrouter_video_models_20260925.json`, `gemini_pricing.txt`, `runway_pricing.txt`, `kling.html`, `ali_en.txt`, `freepik_pricing.txt`, `dreamina_price.txt`, `hl_sub.html`, `luma_plans.txt`, `minimax_doc.txt` (H1-2026 interim results), and `soochow_minimax.txt` (the Soochow Securities IPO note).

---

## 1. Summary of key findings

**Seedance 2.5 exists and is shipping.**
- ByteDance previewed it at the Volcano Engine FORCE conference on 2026-06-23, when it was in enterprise beta (TNW).
- It launched on 2026-07-31 in Jimeng (即梦) and Doubao Pro (TechNode). The Dreamina/CapCut announcement of the same date says it will roll out to subscribers in Europe, Asia, the Middle East, and South America. The US is not named for Seedance 2.5, though it is named for Seedream 5.0 Pro in the same post.
- The international API is BytePlus ModelArk model `dreamina-seedance-2-5-260628`. Its tutorial page was first published on 2026-08-07, and OpenRouter listed the model the same day.
- In China the model is `doubao-seedance-2.5` on Volcano Engine Ark.

**Official Seedance 2.5 specs (BytePlus, primary, H):**
- **Resolution:** 480p and 720p at 8-bit, and 1080p at 10-bit (H.265). The API has **no 4K**. This conflicts with TNW's and Kie.ai's "native 4K" claims.
- **Frame rate:** 24 fps.
- **Duration:** 4–30 s per generation. The ByteDance Seed page adds "the option to extend twice."
- **Audio:** native audio via `generate_audio` (default true). The API doc notes that audio output is mono. It covers 11 dialogue languages.
- **References:** up to 50 omni references (30 images, 10 videos, and 10 audio clips), and audio-only reference is now supported.
- **Frame control:** first frame and first-plus-last frame.
- **Editing:** video editing (add, remove, or replace), video extension, and timestamp-based editing.
- **Draft mode:** a 480p preview, followed by a final render.
- **Output formats:** mp4 and mov.
- **Tiers:** no offline or "flex" tier, and no Fast or mini tier for 2.5 yet.

**Seedance billing formula (verified, H):**
- tokens = (input-video seconds + output seconds) × width × height × fps ÷ 1024.
- price = tokens × the per-million-token rate. Only successful generations are billed. There is a minimum token charge when a video is used as input.
- The Seedance 1.0 paper states the VAE compresses (t,h,w) by (4,16,16) with no DiT patchification. **A billing token is therefore one latent token (4 frames × 16 × 16 px = 1,024 pixel-frames).** This is my inference for 2.x, where the architecture is not published.

**Seedance 2.5 list prices, text or image input with no video input, audio included at no extra charge:**

| Resolution | BytePlus (USD/M tokens) | BytePlus $/s | 5 s clip | 10 s clip | Volcano (RMB/M tokens) | Volcano ¥/s (≈ $/s) |
|---|---|---|---|---|---|---|
| 480p | 10.70 | **$0.103** | $0.51 | $1.03 | 70 | ¥0.67 (≈$0.100) |
| 720p | 10.70 | **$0.231** | $1.16 | $2.31 | 70 | ¥1.51 (≈$0.225) |
| 1080p | 11.70 | **$0.569** | $2.84 | $5.69 | 77 | ¥3.74 (≈$0.557) |

- With video input the rates are $6.40/M (480p and 720p) and $7.00/M (1080p) on BytePlus, or ¥42/M and ¥46/M on Volcano. Input seconds are billed too.
- Draft mode bills a 480p step and then the final render.
- There is no audio-off discount for 2.x, which differs from 1.5 Pro, where audio doubles the price.
- **Seedance 2.5 costs about 1.5× Seedance 2.0 per second** (2.0 list: $0.07, $0.15, and $0.37 per second at 480p, 720p, and 1080p).
- A 1080p promo of −28% ran from 2026-08-14 to 09-17 (secondary source) and has ended.

**Resellers range from 1× to 2× the official price:**
- Replicate and OpenRouter charge exactly list ($0.1028/s and $0.2312/s).
- Runway API: $0.20, $0.30, and $0.68 per second at 480p, 720p, and 1080p.
- WaveSpeedAI: $0.18/s and $0.36/s.
- fal.ai: **2× list** ($21.4/M tokens, or about $0.22, $0.47, and $1.16 per second).

**Subscriptions for heavy users:**
- Luma Ultra (annual) works out to about $0.06, $0.13, and $0.32 per second at 480p, 720p, and 1080p. This is the cheapest channel I verified.
- Freepik annual plans: about $0.29–0.32/s at 720p and $0.73–0.80/s at 1080p.
- Dreamina and Jimeng per-generation credit costs are rendered by JavaScript and could not be verified. The secondary estimates conflict, putting 720p at roughly $0.11–0.35/s depending on plan.

**"MiniMax H3" is the official name.**
- Aliases are "Hailuo 3.0", "Hailuo 03", `minimax/hailuo-3` (OpenRouter), and `hailuo3` (Runway).
- It was released 2026-07-31, with open weights on Hugging Face under the MiniMax H3 Community License. As of 2026-08-26 that license treats the **US, EU, UK, and South Korea** as "Excluded Territories" that need a separate licence.
- Architecture: a 33B dense DiT (about 13B of it in cacheable AdaLN branches) plus a Qwen3-VL-32B encoder.
- The base model outputs **768p (for example 1344×768)** at 24 fps, 4–15 s, with 32 kHz stereo audio. **2K (1440p per Luma)** is produced by an in-context "Regenerate-2K" pass.
- **H3 Max** was co-developed with fal and is a fast post-trained variant (480p or 768p only, 5–15 s).

**MiniMax official API prices (H):**
- H3: **$0.08/s at 768P and $0.13/s at 2K** (China: ¥0.50/s and ¥0.80/s).
- H3 Max: $0.05/s at 480P and $0.08/s at 768P.
- Regenerating 768P to 2K costs +$0.05/s.
- Legacy Hailuo 2.3: $0.28 for a 6 s 768P clip ($0.047/s) and $0.49 for a 6 s 1080P clip ($0.082/s).
- Hailuo 2.3 Fast: $0.19 for a 6 s 768P clip ($0.032/s).
- Hailuo 02: $0.10 for a 6 s 512P clip ($0.017/s).

**MiniMax third-party and consumer prices:**
- fal is *cheaper* than MiniMax at 768p ($0.06/s) and the same at 2K ($0.13/s).
- Replicate and OpenRouter charge list.
- Runway API: $0.10/s at 768P and $0.15/s at 2K.
- The Hailuo app's own plans state **$0.047–0.074/s at 768P and $0.081–0.126/s at 2K**, depending on tier and billing cycle.

**Cost-to-serve evidence says price overstates compute by roughly 3× to 10×:**
- Seedance: LatePost (2026-06-16) reports **about 70% gross margin**: "for every ¥10 of API calls, server and inference cost about ¥3." Practitioners quoted by 36Kr estimate up to 90%.
- Seedance 2.0 revenue exceeds ¥1B per month, is more than half of Volcano Engine's MaaS revenue, and is reported at about $2B ARR. Seedance is priced at a *premium* ("nearly double comparable domestic models"), so it is **not subsidized**.
- MiniMax: gross margin for the Open Platform (API) was **63.2% in 2024 and 69.4% in 9M-2025**. AI-native consumer products, which include Hailuo, ran **−8.1% in 2024 and about 4.7% in 9M-2025**, so consumer subscription prices sit near cost. Group gross margin was 17.9% in H1-2026.
- The MiniMax H3 self-host benchmarks give a physical anchor. A 5 s 768p clip at 50 steps takes 75.1 s on 4×H200, which is **about 60 H200-GPU-seconds per output second**. It takes 19.0 s on 8×B300, which is **about 30 B300-GPU-seconds per output second**. At retail GPU rental that is about $0.042–0.077/s, which is close to the $0.08/s list price at batch size 1 and retail rates.

**Comparators ($/s, official unless marked):**
- **Veo 3.1:** $0.40 at 720p and 1080p with audio. Fast is $0.10 at 720p and $0.12 at 1080p. Lite is $0.05 and $0.08.
- **Gemini Omni Flash:** about $0.10 at 720p.
- **Sora 2:** $0.10. **Sora 2 Pro:** $0.30 at 720p and $0.70 at 1080p. **The Sora 2 API shut down on 2026-09-24.**
- **Kling 3.0:** $0.084 at 720p silent and $0.126 at 720p with audio. At 1080p it is $0.112 silent and $0.168 with audio.
- **Runway:** Gen-4.5 is $0.12 at 720p.
- **Luma Ray3.2 (silent):** $0.06 at 720p and $0.24 at 1080p for 5 s clips.
- **Wan:** Wan 2.5 and 2.6 are $0.10 at 720p and $0.15 at 1080p with audio. Wan 3.0 is $0.10 at 720p and $0.20 at 1080p.
- **LTX-2 (fal):** $0.06 at 1080p.
- **Pika 2.2 (fal):** $0.04 at 720p and $0.09 at 1080p.
- **Grok Imagine 1.5:** $0.14 at 720p and $0.25 at 1080p.
- **FLUX 3 Video:** $0.17 at 720p and $0.29 at 1080p.

**Recommended $/s (explained in §2.13):**

| Model | Resolution | Low | Central | High |
|---|---|---|---|---|
| Seedance 2.5 | 1080p | $0.32 | **$0.57** | $1.16 |
| Seedance 2.5 | 720p | $0.13 | **$0.23** | $0.47 |
| Seedance 2.5 | 480p | $0.06 | **$0.10** | $0.22 |
| MiniMax H3 | 2K | $0.077 | **$0.13** | $0.15 |
| MiniMax H3 | 768p | $0.047 | **$0.08** | $0.10 |

---

## 2. Data tables with sources

Source IDs such as [S1] refer to §5.

### 2.1 Seedance lineage

| Version (model ID) | Date | Max res / fps / duration | Audio | Key changes | Source | Conf. |
|---|---|---|---|---|---|---|
| Seedance 1.0 Lite | about mid-2025 (not verified here) | 480p/720p/1080p (Replicate) | No | Lower-cost tier. Not on the current BytePlus list. | [S20] Replicate | L (date) |
| Seedance 1.0 Pro (`seedance-1-0-pro-250528`) | Paper 2025-06-10; ID dated 250528 | 1080p / 24 fps / 2–12 s | No | Multi-shot; ~10× distillation speed-up; "5-s 1080p video in 41.4 s (NVIDIA-L20)"; VAE (4,16,16) | [S3][S15] | H |
| Seedance 1.0 Pro Fast (`seedance-1-0-pro-fast-251015`) | ID dated 2025-10-15 | 1080p / 24 / 2–12 s | No | Cheaper, faster 1.0 tier (T2V and first-frame I2V only) | [S3] | H |
| Seedance 1.5 Pro (`seedance-1-5-pro-251215`) | 2025-12-16 (Seed blog) | 1080p / 24 / 4–12 s | **Yes (first native A/V)** | Joint audio-video generation; >10× end-to-end speed-up; Draft mode. **Now "Retired" on BytePlus** (replacement: 2.0 mini). | [S3][S16] | H |
| Seedance 2.0 (`dreamina-seedance-2-0-260128`) | Feb 2026 (Wikipedia); "¥1/s" pricing published about 2026-03-04; Volcano API sales fully opened Apr 2026 | 480p, 720p, 1080p (8-bit), **4K (10-bit)** / 24 / 4–15 s | Yes | Omni reference (9 images, 3 videos, 3 audio), editing and extension; IP controversy (Disney cease-and-desist 2026-02-13) | [S3][S17][S18] | H (specs), M (dates) |
| Seedance 2.0 Fast (`...-2-0-fast-260128`) | With 2.0 | 480p/720p / 24 / 4–15 s | Yes | Cheaper, faster 2.0 | [S3] | H |
| Seedance 2.0 mini (`...-2-0-mini-260615`) | About 2026-06-15 (secondary) | 480p/720p / 24 / 4–15 s | Yes | About half the price of 2.0 | [S3], secondary | H (specs) |
| **Seedance 2.5** (`dreamina-seedance-2-5-260628`; Volcano `doubao-seedance-2.5`) | Preview 2026-06-23; launch 2026-07-31 (Jimeng, Doubao Pro); BytePlus docs 2026-08-07 | **480p and 720p (8-bit), 1080p (10-bit HEVC)** / 24 fps / **4–30 s** (+2 extensions) | Yes (mono in API) | 30 s single pass; 50 references (30 images, 10 videos, 10 audio); audio-only reference; editing that keeps input duration and aspect; Draft mode; mov output; 11 languages | [S1][S2][S3][S4][S12][S13][S14] | H |

**Conflicts to note:**
- TNW (2026-06-23) described 2.5 as "native 4K… 10-bit… 3D white models… 20% better prompt adherence," and Kie.ai markets "native 4K." **The official BytePlus API tops out at 1080p (10-bit).** 4K exists only on Seedance 2.0.
- OpenRouter lists 2.5 at 480p and 720p only. fal documents 480p and 720p dimensions but quotes a 1080p price.
- Wikipedia (secondary) mentions a "beta long-video mode extending clips to 3 minutes." That is not in the API docs.

### 2.2 Official Seedance token prices (all versions)

**BytePlus ModelArk (international, USD per million tokens)** [S1], page updated 2026-09-24:

| Model | Online inference | Offline (flex, −50%) |
|---|---|---|
| Seedance 2.5, 480p/720p | 10.70 without video input; 6.40 with video input | Not supported |
| Seedance 2.5, 1080p | 11.70 without video input; 7.00 with video input | Not supported |
| Seedance 2.0, 480p/720p | 7.0 / 4.3 | Not supported |
| Seedance 2.0, 1080p | 7.7 / 4.7 | Not supported |
| Seedance 2.0, 4K | 4.0 / 2.4 | Not supported |
| Seedance 2.0 Fast, 480p/720p | 5.6 / 3.3 (25% off for enterprise until 2026-10-07, capped at 1.2B tokens) | Not supported |
| Seedance 2.0 mini, 480p/720p | 3.5 / 2.1 (60% off for enterprise until 2026-10-07, capped at 3.6B tokens) | Not supported |
| Seedance 1.5 Pro | 2.4 with audio; 1.2 silent | 1.2 / 0.6 |
| Seedance 1.0 Pro | 2.5 | 1.25 |
| Seedance 1.0 Pro Fast | 1.0 | 0.5 |

**Volcano Engine Ark (China, RMB per million tokens)** [S5], page updated 2026-09-24:

| Model | Online | Offline |
|---|---|---|
| doubao-seedance-2.5, 480p/720p | 70 without video input; 42 with video input | Not supported |
| doubao-seedance-2.5, 1080p | 77 / 46 | Not supported |
| doubao-seedance-2.0, 480p/720p | 46 / 28 | Not supported |
| doubao-seedance-2.0, 1080p | 51 / 31 | Not supported |
| doubao-seedance-2.0, 4K | 26 / 16 | Not supported |
| 2.0 Fast | 37 / 22 (25% off, time-limited) | Not supported |
| 2.0 mini | 23 / 14 (60% off, time-limited) | Not supported |
| 1.0 Pro | 15 | 7.5 |
| 1.0 Pro Fast | 4.2 | 2.1 |

1.5 Pro does not appear on the current Volcano list.

**Billing rules (both platforms, H):**
- tokens ≈ (input-video duration + output duration) × W × H × fps ÷ 1024. The actual count is `usage.completion_tokens`.
- Only successful videos are billed.
- A minimum token consumption applies when video is used as input on 2.0 and 2.5.
- **Seedance 2.5 Draft mode:** step 1 is billed as a 480p video. Step 2 is billed at the target resolution. The rate is set by whether step 1 had video input, and the draft video itself is not counted as input.
- 1.5 Pro draft = normal token count × 0.7 (silent) or × 0.6 (with audio).
- The `service_tier=flex` option (offline, 50% price) is **not available for 2.0 or 2.5** [S6].

**Output dimensions for Seedance 2.5 at 16:9 (H) [S2]:** 480p is 854×480, 720p is 1280×720, and 1080p is 1920×1080. The page also gives 4:3, 1:1, 3:4, 9:16, and 21:9 sizes. Output is 24 fps.
Tokens per second of output: 480p 9,607.5; 720p 21,600; 1080p 48,600.

### 2.3 Seedance 2.5 per-clip cost (computed from the official formula, no video input)

My computations match the official examples exactly: $0.514, $1.156, and $2.843 for 5 s at 480p, 720p, and 1080p.

| Resolution | $/s (BytePlus) | 5 s | 10 s | 15 s | 30 s | ¥/s (Volcano) | ¥ per 5 s / 10 s |
|---|---|---|---|---|---|---|---|
| 480p | 0.1028 | 0.514 | 1.028 | 1.542 | 3.08 | 0.6725 | 3.36 / 6.73 |
| 720p | 0.2311 | 1.156 | 2.311 | 3.467 | 6.93 | 1.512 | 7.56 / 15.12 |
| 1080p | 0.5686 | 2.843 | 5.686 | 8.529 | 17.06 | 3.742 | 18.71 / 37.42 |

**Variants:**
- **With video input** (for example, editing a 5 s input into 5 s of output) costs $0.615 at 480p, $1.382 at 720p, and $3.402 at 1080p. That is $0.123, $0.277, and $0.680 per output second. The official range for a 5 s output with 2–30 s of input is $0.553–2.152 at 480p, $1.244–4.838 at 720p, and $3.062–11.907 at 1080p [S1].
- **Draft plus final**, with one 480p draft per final, raises the per-second cost to $0.206 at 480p, $0.334 at 720p, and $0.671 at 1080p.
- **1080p promotion from 2026-08-14 to 09-17 (secondary [S31]):** $8.42/M without video input, which is **$0.409/s**. It has ended.

### 2.4 Other Seedance versions, official $/s (no video input)

From BytePlus 16:9 examples ÷ 5 s.

| Model | 480p | 720p | 1080p | 4K | Audio |
|---|---|---|---|---|---|
| 2.0 | 0.07 | 0.152 | 0.374 | 0.778 | Included |
| 2.0 Fast (list) | 0.056 | 0.12 | — | — | Included |
| 2.0 mini (list) | 0.036 | 0.076 | — | — | Included |
| 1.5 Pro | 0.024 with audio / 0.012 silent | 0.052 / 0.026 | 0.116 / 0.058 | — | Priced separately |
| 1.0 Pro | 0.024 | 0.052 | 0.122 | — | None |
| 1.0 Pro Fast | 0.010 | 0.020 | 0.048 | — | None |

### 2.5 Seedance 2.5 on third-party APIs

| Channel | 480p $/s | 720p $/s | 1080p $/s | Notes | Source | Type | Conf. |
|---|---|---|---|---|---|---|---|
| BytePlus ModelArk (official) | 0.1028 | 0.2311 | 0.5686 | $10.70 or $11.70 per M tokens | [S1] | Primary | H |
| Volcano Engine (official, CN) | ≈0.100 | ≈0.225 | ≈0.557 | ¥ list converted at 6.7126 | [S5] | Primary | H |
| Replicate | 0.1028 | 0.2312 | n/a | With video input: $0.4304 and $0.9676 per output second (480p, 720p) | [S19] | Primary | H |
| OpenRouter | 0.1028 | 0.2311 | n/a | $10.7/M; $6.4/M with video input; lists 480p and 720p only | [S21] | Primary | H |
| Runway API | 0.20 | 0.30 | 0.68 | Plus $0.10, $0.15, or $0.34 per s of input video; 80-credit ($0.80) minimum | [S22] | Primary | H |
| WaveSpeedAI | 0.18 | 0.36 | n/a | "$0.90/5s at 480p, $1.80/5s at 720p", with a discounted price of $0.81/5s. Its "Turbo" endpoint ($1.00/5s, 720p or 1080p) is WaveSpeed's own tier, not an official ByteDance tier. | [S23] | Primary (reseller page) | M |
| fal.ai | 0.2205 | 0.4730 | 1.164 | $0.0214 per 1k tokens (480p and 720p); $0.0234 per 1k tokens (1080p); ×0.6 when video references are used | [S24] | Primary | H |
| Kie.ai | 0.14 | 0.315 | n/a | Could not load the pricing page | [S31] cellcog | Secondary | L |
| Atlas Cloud / EvoLink / reAPI | 0.14 / 0.136 / 0.119 | 0.30 / 0.293 / 0.267 | 0.59 / 0.528 / n/a | Promos as of Aug 2026 | [S31] | Secondary | L |
| "BytePlus LAS" | 0.2056 | 0.4621 | n/a | A managed operator at 2× ModelArk | [S31] | Secondary | L |

### 2.6 Seedance 2.5 via consumer subscriptions (effective $/s = plan price ÷ credits × credits per second)

| Platform / plan | Plan price and credits | Seedance 2.5 credits per second | 480p | 720p | 1080p | Source | Conf. |
|---|---|---|---|---|---|---|---|
| **Luma** Plus / Pro / Ultra (monthly) | $30 for 10k, $90 for 40k, $300 for 150k credits | 36 (480p), 78 (720p), 191 (1080p) for T2V/I2V | 0.108 / 0.081 / 0.072 | 0.234 / 0.176 / 0.156 | 0.573 / 0.430 / 0.382 | [S25] | H |
| **Luma** Plus / Pro / Ultra (annual) | $300, $900, $3,000 per year | Same | 0.090 / 0.068 / **0.060** | 0.195 / 0.146 / **0.130** | 0.478 / 0.358 / **0.318** | [S25] | H |
| **Freepik** Premium, annual ($14.50/mo, 240k credits/yr) | $0.000725 per credit | Draft 480p: 200; 720p: 440 (1,760 per 4 s); 1080p: 1,100 (4,400 per 4 s) | 0.145 (draft) | 0.319 | 0.798 | [S26] | H |
| **Freepik** Premium+, annual ($33.75/mo, 600k/yr) | $0.000675 per credit | Same | 0.135 | 0.297 | 0.743 | [S26] | H |
| **Freepik** Pro, annual ($82.50/mo, 1.5M/yr) | $0.00066 per credit | Same | 0.132 | 0.290 | 0.726 | [S26] | H |
| **Freepik** Premium, monthly ($20/mo) | $0.001 per credit | Same | 0.20 | 0.44 | 1.10 | [S26] | M (monthly credit amount assumed to be 20k per month) |
| **Runway** app Standard / Pro / Max ($15/$35/$95 per month; 625 / 2,250 / 9,500 credits) | $0.024 / $0.0156 / $0.010 per credit | Not shown on the plan page. The API rate is 20/30/68. Pro and Max include **"Unlimited Seedance 2.5"** (relaxed mode). | 0.48 / 0.31 / 0.20 | 0.72 / 0.47 / 0.30 | 1.63 / 1.06 / 0.68 | [S22][S27] | M (assumes app credits equal API credits) |
| **Dreamina (CapCut)**: Basic $15 (1,575 credits), Standard $36 (3,885), Advanced $159 (17,600), Ultra $520 (59,000) per month; annual Ultra $3,599 | $0.0095, $0.0093, $0.0090, $0.0088 per credit (monthly list); $0.0051 per credit (annual Ultra) | **Not retrievable** (JavaScript). Secondary estimates: about 37 credits/s at 720p ("296 credits per 8 s") [S31], or about 22 credits/s ("660 per 30 s", a pre-launch China leak) [S32]. The page claims "Save 57% credits on Seedance 2.5 at 720p" (Standard, Advanced) and "76%" (Ultra), and "Seedance 2.5 from $0.04/sec" and "from $0.05/sec". | — | ≈0.19–0.35 (monthly list) and ≈0.11–0.19 (annual Ultra) | — | [S28] (plans are primary; credits are secondary) | L |
| **Jimeng (即梦, CN)** | About ¥41–79/mo (secondary) | "About 215 credits per 8 s at 720p" (secondary) | — | Unknown | — | [S31] | L |
| **Higgsfield** | Plus $49/mo (secondary) | 3 credits/s (480p), 6.5 credits/s (720p) (secondary) | — | About 0.32 ("$2.55 per 8 s at 720p") | — | [S31] | L |
| **OpenArt**: Starter $13, Plus $27, Pro $44, Wonder $175 per month, annual (4k, 12k, 24k, 106k credits) | $0.00325 to $0.00165 per credit | About 130 credits/s at 720p (secondary) | — | About 0.42 (Starter) to 0.21 (Wonder) | — | [S29] plans primary; [S31] rate | L |
| **Krea**: Pro $35/mo ($21 annual), 20k units | $0.00175 or $0.00105 per unit | The page says "109 Seedance 2.5 videos" per 20k units, which is about 183 units per video. The clip length and resolution are not stated. | — | $0.19–0.32 per video (spec unknown) | — | [S30] | L |
| **Artlist**: AI Starter $19.99 (16.5k), Core $39.99 (40k), Creator $69.99 (80k credits) per month | $0.0012 / $0.001 / $0.00087 per credit | Not published. The page says "up to 103 AI videos" on Starter. Seedance is listed as available, with "Unlimited generations on select models." | — | Unknown | — | [S33] | L |
| **Pollo.ai** | Page loads only with JavaScript | — | — | Unknown | — | — | — |
| **Doubao (CN), Pro version** | 2.5 is available to Pro users (TechNode) | — | — | Unknown | — | [S13] | L |

### 2.7 MiniMax video lineage

| Model | Date | Res / fps / duration | Audio | Notes | Source | Conf. |
|---|---|---|---|---|---|---|
| video-01 (T2V-01, I2V-01, S2V-01) | 2024 (exact date not verified here) | 720p, about 6 s | No | Replicate charges $0.50 per video | [S34] | M |
| T2V-01-Director / I2V-01-Director | 2025-02-11 | — | No | Camera control | [S7] | H |
| Hailuo 02 | 2025-06-18 | 512p, 768p, 1080p; 6 s or 10 s (1080p is 6 s only) | No audio in the API tables | NCR architecture, "2.5× training and inference efficiency, 3× parameters" (Soochow, citing MiniMax) | [S7][S10][S36] | H/M |
| Hailuo 2.3 and 2.3 Fast | 2025-10-28 | 768p and 1080p; 6 s or 10 s | No audio in the API tables | Fast is "up to 50% cheaper for batch creation" | [S7][S10] | H |
| **MiniMax H3** ("Hailuo 3.0", "Hailuo 03", `hailuo-3`) | **2026-07-31**; open weights on Hugging Face (repo live; secondary sources date it 2026-08-05) | **768P base (1344×768 at 16:9); 2K via regeneration (1440p per Luma)**; 24 fps; 4–15 s | **32 kHz stereo** | Omni-modal: up to 9 image, 3 video, and 3 audio references (12 files); editing; H3-Context-IR prompt pre-processor; 33B dense DiT (about 13B in cacheable AdaLN) plus a Qwen3-VL-32B encoder; sparse attention not yet released | [S7][S8][S9][S11] | H |
| **MiniMax H3 Max** (with fal) | About late Aug to early Sep 2026 (OpenRouter listing 2026-09-02; fal promo "ends September 30") | MiniMax lists 480P and 768P, 5–15 s. fal also sells 1080p. | Yes | "Post-trained by fal.ai on MiniMax H3 … high-speed." fal's example ran in 2.5 s of inference time. | [S9][S21][S37] | M (date) |

### 2.8 MiniMax official API pricing

International pay-as-you-go [S10]; China [S38].

| Model | Resolution | $ per second | 6 s | 10 s | 15 s | China ¥/s | Notes |
|---|---|---|---|---|---|---|---|
| MiniMax-H3 | 768P | **0.08** | 0.48 | 0.80 | 1.20 | 0.50 (≈$0.074) | Input video is billed at the output rate. The first 5 images are free, then $0.04 each. Audio input is free. |
| MiniMax-H3 | 2K | **0.13** | 0.78 | 1.30 | 1.95 | 0.80 (≈$0.119) | |
| H3 Regeneration (768P → 2K) | 2K | +0.05 | — | — | — | 0.30 | 768P plus regeneration = $0.13/s, the same as direct 2K |
| MiniMax-H3-Max | 480P | 0.05 | 0.30 | 0.50 | 0.75 | 0.33 | Input video costs $0.0553/s (480P) or $0.143/s (768P) |
| MiniMax-H3-Max | 768P | 0.08 | 0.48 | 0.80 | 1.20 | 0.50 | |
| H3-Context-IR | — | $0.90 input / $3.60 output per M tokens | | | | ¥5.8 / ¥23 | Prompt pre-processing |
| Hailuo-2.3 | 768P | 0.047 (6 s clip), 0.056 (10 s clip) | 0.28 | 0.56 | — | ¥2.00 / ¥4.00 per clip | Legacy |
| Hailuo-2.3 | 1080P | 0.082 | 0.49 | — | — | ¥3.50 per clip | |
| Hailuo-2.3-Fast | 768P / 1080P | 0.032 / 0.055 | 0.19 / 0.33 | 0.32 | — | ¥1.35 / ¥2.31 per 6 s clip | I2V only (per the China table) |
| Hailuo-02 | 512P / 768P / 1080P | 0.017 / 0.047 / 0.082 | 0.10 / 0.28 / 0.49 | 0.15 / 0.56 | — | | |

**Other official options:**
- **Video Packages** are prepaid monthly plans for Hailuo 02 and 2.3 only; they do not cover H3 [S39]. Standard is $1,000 for 3,760 points, and Business is $6,000 for 26,780 points. One point = one 6 s 768P Hailuo 2.3 clip, so the effective rate is **$0.037–0.044/s**.
- **Token Plan** subscriptions ($22, $55, or $132 per month) exclude H3 [S40].
- A Hugging Face blog from about 2026-08-01 (secondary) stated "768p $0.09/s (closed beta)". The current list price is $0.08.

### 2.9 MiniMax H3 through third parties and consumer apps

| Channel | 480p | 768p | 2K | Other | Source | Conf. |
|---|---|---|---|---|---|---|
| fal.ai (H3) | 0.05 | **0.06** | 0.13 | 4K $0.16/s | [S37] | H |
| fal.ai (H3 Max) | 0.025 promo / 0.05 list | 0.04 promo / 0.08 list | — | 1080p $0.08 promo / $0.16 list; promo ends Sep 30 | [S37] | H |
| Replicate (H3) | — | 0.08 | 0.13 | | [S19] | H |
| OpenRouter | H3 Max: 0.05 | H3 Max: 0.08 | H3: 0.13 (lists 2K only) | Reference images $0.04 each | [S21] | H |
| Runway API | h3_max: 0.05 | hailuo3 0.10; h3_max 0.08 | 0.15 | +$0.02 per reference image | [S22] | H |
| **Hailuo app** (Hailuo's own "$/sec" labels) | H3 Max: 0.027–0.042 | **H3: 0.074 Standard monthly; 0.059 Pro and Master monthly; 0.056 Max monthly; 0.047 any annual plan** | **H3: 0.126 Standard monthly; 0.101 Standard annual; 0.102 Pro and Master monthly; 0.096 Max monthly; 0.081 annual** | Monthly credits: Standard 1,000; Pro 4,500; Master 10,500; Max 27,000. H3 uses **12 credits/s at 2K and 7 credits/s at 768P** (derived from the site's "~2250 s" and "~3857 s" per 27,000 credits). | [S11] | H (labels); M (credit derivation) |
| Luma (monthly → annual Ultra) | — | 28 credits/s: 0.084 → 0.047 | 46 credits/s: 0.138 → 0.077 | | [S25] | H |
| Freepik (H3 Max Turbo 768p) | — | 200 credits per 5 s: 0.027–0.040 | — | Hailuo 2.3 Fast 768p: 150 credits per 6 s, unlimited on Premium+ | [S26] | H |
| OpenArt | Plans list H3, H3 Max, and H3 Max Turbo. Per-model credit costs are not shown. An offer of up to 30% off H3 runs until Oct 4. | | | | [S29] | L |
| Krea | "41 MiniMax H3 videos" per 20k units (Pro) | | | Spec unknown | [S30] | L |

Legacy Hailuo app FAQ (possibly stale) [S11]: Standard $14.99/mo (promo $7.99) with 1,000 credits; Pro $54.99 (promo $24.99) with 4,500; Master $94.99 (promo $63.99) with 10,000; Ultra $124.99 with 12,000; Max $199.99 with 20,000. Another string on the same page says Max monthly credits rose from 20,000 to 27,000 at the H3 launch.

### 2.10 Comparator models ($ per second of output)

| Model | Channel | 720p | 1080p | Other | Audio | Source | Conf. |
|---|---|---|---|---|---|---|---|
| Veo 3.1 Standard | Gemini API (official) | 0.40 | 0.40 | 4K 0.60 | Included (default) | [S41] | H |
| Veo 3.1 Standard, silent | OpenRouter, fal | 0.20 | 0.20 | 4K 0.40 | Off | [S21][S24] | H |
| Veo 3.1 Fast | Gemini API | 0.10 | 0.12 | 4K 0.30 | Included | [S41] | H |
| Veo 3.1 Fast, silent | OpenRouter | 0.08 | 0.10 | 4K 0.25 | Off | [S21] | H |
| Veo 3.1 Lite | Gemini API / OpenRouter | 0.05 (0.03 silent) | 0.08 (0.05 silent) | — | Both | [S41][S21] | H |
| Veo 3 | fal | 0.40 (with audio) | — | — | — | [S24] | M |
| **Gemini Omni Flash** (`gemini-omni-1.1-flash`, new in 2026) | Gemini API | ≈0.10 ($17.50 per M video tokens × 5,792 tokens/s) | — | — | — | [S41] | H |
| Sora 2 | OpenAI (**API shut down 2026-09-24**) | 0.10 | — | — | Yes | [S42] | H |
| Sora 2 Pro | OpenAI (shut down) | 0.30 | **0.70** (1920×1080); 0.50 at 1792×1024 | — | Yes | [S42] | H. OpenRouter lists 1080p at $0.50, which conflicts. |
| Kling 3.0 | Kling official | 0.084 silent / 0.126 audio | 0.112 / 0.168 | 4K 0.42 | Both | [S43] | H |
| Kling 3.0 Turbo | Kling official | 0.112 | 0.14 | — | Yes | [S43] | H |
| Kling 3.0 Omni | Kling official | 0.084–0.126 | 0.112–0.168 | 4K 0.42 | Both | [S43] | H |
| Kling 2.6 Pro | fal | 0.07 silent / 0.14 audio | — | — | Both | [S24] | H |
| Kling 2.5 Turbo Pro | fal | 0.07 | — | — | No | [S24] | H |
| Runway Gen-4.5 | Runway API | 0.12 | — | — | No | [S22] | H |
| Runway Gen-4 Turbo / Aleph 2 | Runway API | 0.05 / 0.28 | — | — | No | [S22] | H |
| Luma Ray3.2 (5 s clip) | Luma API | 0.06 | 0.24 | 540p 0.03; HDR 2×; EXR 3× | No | [S44] | H |
| Luma Ray3.2 (10 s clip) | Luma API | 0.09 | 0.36 | — | No | [S44] | H |
| Wan 2.5 (preview) | Alibaba (Intl) | 0.10 | 0.15 | 480p 0.05 | Yes | [S45] | H |
| Wan 2.6 / 2.7 | Alibaba (Intl) | 0.10 | 0.15 | — | Yes | [S45] | H |
| Wan 2.6-i2v-flash | Alibaba (Intl) | 0.05 audio / 0.025 silent | 0.075 / 0.0375 | — | Both | [S45] | H |
| Wan 3.0 / Wan 3.0 Prime | Alibaba (Intl) | 0.10 / 0.14 | 0.20 / 0.28 | 480p 0.05 / 0.068; up to 30 s; 30% promo on 3.0 | — | [S45] | H |
| HappyHorse 1.0 / 1.1 (Alibaba) | Alibaba (Intl) | 0.14 (1.0) | 0.169 (OpenRouter) | 480p 0.07 (1.1) | — | [S45][S21] | H |
| LTX-2 / LTX-2.3 | fal | — | 0.06 / 0.08 | 1440p 0.12 / 0.16; 2160p 0.24 / 0.32 | Yes (per LTX) | [S24][S46] | H (price) |
| Pika 2.2 | fal | 0.04 | 0.09 | — | No | [S24] | H |
| Grok Imagine Video 1.5 | OpenRouter | 0.14 | 0.25 | 480p 0.08 | — | [S21] | H |
| FLUX 3 Video | OpenRouter | 0.17 | 0.29 | — | Optional | [S21] | H |

Other new 2026 models seen in these listings: Kling O3 and Kling Video O1, LTX-2.5 (Krea and LTX), FLUX Video Edit, and Runway Aleph 2.

### 2.11 Cost-to-serve clues (to judge whether price is a good proxy for compute)

**ByteDance / Volcano Engine and Seedance:**

| Item | Value | Source | Type | Conf. |
|---|---|---|---|---|
| Seedance gross margin | "毛利率达 70%——每卖出 10 元 API 调用，服务器和推理成本约占 3 元" (70% gross margin; about ¥3 of server and inference cost per ¥10 of API sales) | LatePost via NetEase, 2026-06-16 [S47] | Secondary (named reporting) | M |
| Practitioners' margin estimate | "as high as 90%" | 36Kr, via BigGo [S48] | Secondary | L |
| Seedance revenue | >¥1B per month for 2.0 (36Kr, 2026-06-03); about $2B ARR (≈¥14.3B) (LatePost) | [S47][S49] | Secondary | M |
| Share of Volcano MaaS | ">50% of MaaS revenue this year" (Tan Dai to 36Kr). 2025 MaaS revenue was about ¥1.5B; the 2026 target was raised to ¥15B (150亿元) in April 2026. | [S49] | Secondary | M |
| Pricing stance | About ¥1/s at 720p, "nearly double comparable domestic video models"; a ¥10M annual-contract threshold when API sales opened in April 2026. Tan Dai says the price is "actually not that high." | [S48] | Secondary | L/M |
| Market | About 95% penetration of short-drama production (36Kr); 50% of Seedance revenue comes from short-drama customers | [S49][S48] | Secondary | L |
| Contrast with the consumer side | The Doubao app earns less than ¥1M per day while consuming tens of millions of yuan per day in compute, so consumer apps are subsidized (LatePost) | [S47] | Secondary | M |
| What a token means for compute | The billing token equals W×H×fps×s ÷ 1024. Seedance 1.0 uses a VAE with (t,h,w) = (4,16,16) and no DiT patchify, so **one billing token ≈ one DiT latent token** (inferred; not stated for 2.x). | [S1][S15] | Primary plus inference | M |
| Measured speed | Seedance 1.0: "5-second video at 1080p … 41.4 seconds (NVIDIA-L20)" after a ~10× distillation speed-up. The number of GPUs is not stated. 1.5 Pro claims ">10× end-to-end acceleration." | [S15][S16] | Primary | H (quote) |
| Price per token is not constant | Seedance 2.0 4K costs $4.0/M, *less* per token than 1080p ($7.7/M). 4K is probably a cheaper pathway (super-resolution/refiner) or strategic pricing. | [S1] | Primary | H (fact); L (interpretation) |

**MiniMax:**

| Item | Value | Source | Type | Conf. |
|---|---|---|---|---|
| Gross margin by segment | Open Platform (API): **63.2% (2024), 69.4% (9M-2025)**. AI-native products (Hailuo and Talkie): **−8.1% (2024), ≈4.7% (9M-2025)**. | Prospectus, via Soochow Securities and Futu/Yahoo [S36][S50] | Secondary (quoting prospectus) | M |
| Group | FY2025 revenue $79.0M; cost of sales $58.96M; gross margin 25.4%. H1-2026 revenue $116.6M; cost of sales $95.8M; **gross margin 17.9%**; AI-native $42.6M; Open Platform $73.9M. | FY2025 results; H1-2026 interim [S51][S52] | Primary | H |
| Hailuo revenue | 9M-2025: $17.46M (Soochow) or $18.75M (Tiger Brokers), which conflict; about 32.6% of revenue. Paid subscribers reportedly 311,100 in Sep 2025. | [S36][S53] | Secondary | L |
| Compute spend | Training-related cloud spend $142M in 9M-2025, 79% of R&D (Soochow). H1-2026 R&D was $296.9M, "mainly … cloud services expenses related to training." Inference cost reportedly down 45% year on year. | [S36][S52] | Primary / secondary | M |
| Scale | ">600 million videos" generated cumulatively (FY2025 release) | [S51] | Primary | H |
| Physical benchmark | H3-Base, 5 s at 1344×768, 124 frames, 50 steps: **4×H200 in 75.1 s** (53.7 s with cache-DiT); **8×B300 in 19.0 s** (BF16) or 18.0 s (FP8). That is **≈60 H200-GPU-seconds** or **≈30 B300-GPU-seconds per output second**. It excludes Context-IR and the 2K regeneration. An 8-step Turbo LoRA exists. | MiniMax self-host guide (SGLang upstream benchmarks) [S9] | Primary | H |
| Implied self-host cost | At RunPod on-demand rates (H200 $4.59/hr, B300 $7.89/hr), batch size 1: **$0.077/s** (H200, lossless), $0.055/s (with cache), $0.063–0.067/s (B300). At $2.50 per GPU-hour: $0.042/s. MiniMax's list price is $0.08/s. | [S9][S54] | Primary inputs, my arithmetic | M |

**How price might proxy compute**
- **API prices are about 3× to 10× compute cost.**
  - Seedance: 70–90% gross margin means compute and serving are about **10–30% of list**. At 1080p that is about **$0.06–0.17 per output second**; at 720p, about $0.02–0.07.
  - MiniMax Open Platform: 63–69% gross margin means cost of revenue is about **31–37% of list**, or about $0.025–0.03/s at 768p and $0.04–0.05/s at 2K. The margin is company-wide for the API, not specific to video.
  - The H3 self-host benchmark is consistent with this. Retail single-request cost roughly equals list price, and optimized internal serving (batching, FP8, cache, owned GPUs) plausibly cuts it by about 3×.
- **Consumer subscriptions sit near cost or below it** (Hailuo segment gross margin about 5%, Doubao subsidized), so they are weaker proxies. The heaviest-user plans (for example Luma Ultra annual at about $0.13/s for 720p Seedance 2.5, or Hailuo annual at $0.047/s for H3 768p) may approach or fall below serving cost.
- **Linear per-token pricing understates compute for long or high-resolution clips.** Attention cost grows faster than linearly with sequence length, and a 30 s clip is one long sequence. Tiers and versions also differ in parameter count and step count, so price per token differs across versions for reasons other than compute.
- **Suggested conversion for the energy stream:** GPU-seconds per output second ≈ ($/s × compute share) ÷ ($ per GPU-hour ÷ 3600).
  - Example: Seedance 2.5 at 1080p, $0.569 × 0.30 = $0.171/s. At $4.59/hr (retail H200) that is about 134 GPU-seconds; at an assumed internal $2/hr it is about 307 GPU-seconds.
  - The only physically measured anchor is MiniMax H3: 60 H200-GPU-seconds per output second at 768p (1.03 MP), lossless, batch size 1.
  - Treat the Seedance derivation as order-of-magnitude only.

### 2.12 Master table: $ per second of generated video

Audio is noted per row. There is no video input.

| Model | Resolution | Audio | Official API | Reseller API (min–max) | Subscription (heavy tier → light tier) |
|---|---|---|---|---|---|
| **Seedance 2.5** | 480p | Included (no silent discount) | 0.103 (BytePlus), ≈0.100 (Volcano) | 0.103 (Replicate, OpenRouter) – 0.22 (fal) | 0.060 (Luma Ultra annual) – 0.145 (Freepik Premium annual, draft) |
| **Seedance 2.5** | 720p | Included | 0.231, ≈0.225 | 0.231 – 0.47 (fal); Runway 0.30; WaveSpeed 0.36 | 0.13 (Luma Ultra annual) – 0.32 (Freepik annual) – 0.44 (Freepik monthly); Dreamina about 0.11–0.35 (L) |
| **Seedance 2.5** | 1080p | Included | 0.569, ≈0.557 | 0.68 (Runway) – 1.16 (fal) | 0.32 (Luma Ultra annual) – 0.73–0.80 (Freepik annual) – 1.10 (Freepik monthly) |
| Seedance 2.0 | 720p / 1080p / 4K | Included | 0.152 / 0.374 / 0.778 | Replicate 0.18 / 0.45 / 1.00; fal 0.30 / 0.68 (720p, 1080p) | — |
| Seedance 2.0 Fast / mini | 720p | Included | 0.12 / 0.076 (list) | Replicate 0.15 / 0.09 | — |
| **MiniMax H3** | 768p | Stereo, included | 0.08 (≈0.074 via the China ¥ price) | 0.06 (fal) – 0.10 (Runway) | 0.047 (Hailuo annual, Luma Ultra annual) – 0.074 (Hailuo Standard monthly) – 0.084 (Luma Plus) |
| **MiniMax H3** | 2K (1440p) | Stereo, included | 0.13 (≈0.119 via ¥) | 0.13 (fal, Replicate, OpenRouter) – 0.15 (Runway) | 0.077 (Luma Ultra annual) / 0.081 (Hailuo annual) – 0.126 (Hailuo Standard monthly) – 0.138 (Luma Plus) |
| MiniMax H3 Max | 480p / 768p | Included | 0.05 / 0.08 | fal promo 0.025 / 0.04 | Hailuo 0.027–0.042 / 0.047–0.074; Freepik 768p 0.027–0.040 |
| Hailuo 2.3 | 768p / 1080p | None | 0.047 (6 s) / 0.082 | Replicate same | Video Packages 0.037–0.044 at 768p |
| Veo 3.1 | 720p / 1080p | Audio / silent | 0.40 / 0.20 | fal same | Luma 280 or 140 credits/s |
| Veo 3.1 Fast | 720p / 1080p | Audio | 0.10 / 0.12 | fal 0.15 | — |
| Sora 2 Pro (retired 2026-09-24) | 720p / 1080p | Audio | 0.30 / 0.70 | fal 0.30 / 0.50 | — |
| Kling 3.0 | 720p / 1080p | Silent / audio | 0.084 / 0.126; 0.112 / 0.168 | OpenRouter and fal same | Luma 30–49 credits/s |
| Runway Gen-4.5 | 720p | None | 0.12 | OpenRouter 0.12 | Runway Max ≈0.12 |
| Luma Ray3.2 | 720p / 1080p | None | 0.06 / 0.24 (5 s) | — | Same credits |
| Wan 2.6 / 3.0 | 720p / 1080p | Audio | 0.10 / 0.15; 0.10 / 0.20 | fal 0.10 / 0.15 | — |
| LTX-2 / 2.3 | 1080p | Audio | — | fal 0.06 / 0.08 | — |
| Pika 2.2 | 720p / 1080p | None | — | fal 0.04 / 0.09 | — |

### 2.13 Recommended values for the tool

**Seedance 2.5** (primary model; audio on, since audio has no discount; text or image input; per second of generated output):

| Resolution | Low | Central | High | Basis |
|---|---|---|---|---|
| 480p | **$0.06** | **$0.10** | **$0.22** | Low: Luma Ultra annual credits (the cheapest verified channel). Central: BytePlus list, which matches Volcano ¥ and Replicate/OpenRouter within 3%. High: fal (2× list). |
| 720p | **$0.13** | **$0.23** | **$0.47** | Same basis |
| 1080p (recommended default for film comparisons) | **$0.32** | **$0.57** | **$1.16** | Same basis. The Aug–Sep BytePlus promo ($0.41) and Runway ($0.68) fall inside this range. |

Adjustments to consider:
- Video-to-video editing: add about +20% per output second (720p $0.277/s and 1080p $0.680/s for equal input and output length), more for long inputs.
- Draft mode: add the 480p cost per draft.
- Iteration or "takes" ratio: multiply by generated seconds ÷ kept seconds. This is not a price item but it dominates real cost.

**MiniMax H3** (secondary model; stereo audio included):

| Resolution | Low | Central | High | Basis |
|---|---|---|---|---|
| 768p | **$0.047** | **$0.08** | **$0.10** | Low: Hailuo app annual and Luma Ultra annual. Central: MiniMax list, which Replicate matches. High: Runway API. fal is cheaper at $0.06. |
| 2K (1440p) | **$0.077** | **$0.13** | **$0.15** | Low: Luma Ultra annual (Hailuo annual is $0.081). Central: MiniMax, fal, Replicate, and OpenRouter all agree. High: Runway API. |

**Compute-cost proxy (for energy):** use about **30% of the central API price for Seedance** (range 10–30%) and about **31–37% for MiniMax**. That gives compute cost per output second of:
- Seedance 2.5 1080p: about $0.06–0.17.
- Seedance 2.5 720p: about $0.02–0.07.
- H3 768p: about $0.025–0.03, cross-checked at ≈60 H200-GPU-seconds per output second unoptimized.
- H3 2K: about $0.04–0.05.

---

## 3. Methodology notes

1. **Primary first.** Official docs were fetched with `curl` and parsed from embedded JSON or Markdown. Sources: BytePlus docs (the SSR JSON holds a Markdown copy), the Volcano Engine doc API (`/api/doc/getDocDetail`), MiniMax docs (`.md` endpoints), the OpenRouter `/api/v1/videos/models` JSON, the Kling pricing JSON, and the Alibaba Cloud help page. Resellers' own pages were used for reseller prices.
2. **$/s definitions.**
   - Token-priced models: $/s = (W×H×24÷1024) × rate ÷ 10⁶, at 16:9 official dimensions and 24 fps. Official BytePlus 5 s examples reproduce exactly.
   - Clip-priced models: the clip price divided by its duration.
   - Subscriptions: (plan price ÷ credits in plan) × credits per second. Monthly and annual figures are shown separately. Promotional first-month prices were **not** used for the recommendations.
3. **Currency.** 6.7126 CNY/USD (ECB, 2026-09-24).
4. **Resolution classes are not identical across vendors.** Seedance 720p is 0.92 MP. H3 "768P" is 1.03 MP (1344×768). H3 "2K" is 1440p, about 3.7 MP if 2560×1440 (inferred from Luma's "1440p (2K)"). Per megapixel-second at list price: Seedance 2.5 1080p ≈ $0.27, H3 768p ≈ $0.078, H3 2K ≈ $0.035, Veo 3.1 1080p ≈ $0.19, and Kling 3.0 1080p with audio ≈ $0.081. The H3 2K figure uses a cheaper regeneration path.
5. **Audio.** Seedance 2.x and H3 generate audio by default with no separate price (the Seedance "without_audio" SKU on OpenRouter equals the with-audio price). The comparator table flags audio or silent where the price differs (Veo, Kling, Wan flash, Seedance 1.5).
6. **Search budget.** The shared WebSearch quota (200 per session) ran out partway through. Later items were gathered by fetching known URLs directly. That is why Pollo, the Higgsfield plan page, Jimeng VIP prices, and some secondary checks are missing (see §4).

---

## 4. Gaps and uncertainties

- **Dreamina, Jimeng, and Doubao credits per Seedance 2.5 generation:** not retrievable, because the pages render client-side. Only plan prices and credits are verified for Dreamina. The secondary figures conflict: about 37 credits/s ([S31]) versus about 22 credits/s ([S32], a pre-launch China leak). Dreamina also advertises "from $0.04–0.05/sec" without saying the resolution. Jimeng VIP prices are unverified (secondary: about ¥41–79/mo).
- **Seedance 2.5 availability in the US** through Dreamina/CapCut is not stated; the 2026-07-31 announcement lists other regions. The BytePlus API is international. Region restrictions for the API were not checked.
- **Higgsfield, Pollo, Artlist, Krea, and OpenArt:** per-model credit costs for Seedance 2.5 or H3 are missing or ambiguous. Higgsfield and OpenArt rates are secondary only. Krea gives "videos per plan" without a clip spec.
- **Kie.ai, Atlas Cloud, EvoLink, reAPI, and BytePlus "LAS":** secondary only (cellcog, Aug 2026). Kie.ai's own pricing page renders client-side.
- **BytePlus resource packs, AI Savings Plans, and enterprise contract discounts** for Seedance 2.5 exist but their prices were not retrievable. The 1080p −28% promo (2026-08-14 to 09-17) is secondary only.
- **Seedance 2.5 max resolution:** the official API gives 1080p. "Native 4K" claims (TNW, Kie.ai) are unsupported for the API. It is possible that 4K exists in Jimeng; not verified.
- **Seedance 1.0 Lite** official price and date, and the exact **video-01 release date**, were not verified.
- **H3 Max:** MiniMax lists 480P and 768P, while fal sells 1080p. The release date is inferred.
- **The exact H3 2K pixel dimensions** are not in MiniMax docs (1440p per Luma and a secondary Hugging Face blog).
- **MiniMax video-specific gross margin is not disclosed.** Segment margins mix LLM, speech, and video. The two Hailuo 9M-2025 revenue figures conflict ($17.46M vs $18.75M).
- **Seedance margins come from press reports** (LatePost, 36Kr), not filings. ByteDance is private.
- **The Seedance 1.0 L20 benchmark** does not state the number of GPUs. There are no published Seedance 2.x or 2.5 inference benchmarks. The token-to-latent mapping is my inference from the 1.0 paper.
- **Sora 2 prices** are historical; the API was shut down on 2026-09-24. The OpenAI page gives Sora 2 Pro 1080p as $0.70 and OpenRouter gives $0.50, which conflict.
- **fal vs official:** fal prices Seedance 2.x at exactly 2× BytePlus (for example 2.0 Fast at $11.2/M vs $5.6/M), but prices H3 at or below MiniMax. The reason for the premium (licensing or margin) is unknown.
- **Replicate rounds Seedance 2.0 prices up** relative to BytePlus (720p $0.18 vs $0.152), but matches 2.5 exactly.

---

## 5. Sources

Accessed 2026-09-24 or 2026-09-25 unless noted. P = primary, S = secondary.

- [S1] P. BytePlus ModelArk, Pricing (Video generation models). https://docs.byteplus.com/en/docs/ModelArk/1544106 (updated 2026-09-24)
- [S2] P. BytePlus, Dreamina Seedance 2.5 tutorial. https://docs.byteplus.com/en/docs/ModelArk/2607688 (first published 2026-08-07)
- [S3] P. BytePlus, Model list. https://docs.byteplus.com/en/docs/ModelArk/1330310
- [S4] P. BytePlus, Video Generation API reference (duration, frames, generate_audio, service_tier). https://docs.byteplus.com/en/docs/ModelArk/1520757
- [S5] P. Volcano Engine Ark, 模型价格 (model pricing). https://www.volcengine.com/docs/82379/1544106 (via /api/doc/getDocDetail; updated 2026-09-24)
- [S6] P. BytePlus, Limited-time discount for Seedance 2.0 fast and mini. https://docs.byteplus.com/en/docs/ModelArk/2630943
- [S7] P. MiniMax, Model release notes. https://platform.minimax.io/docs/release-notes/models.md
- [S8] P. MiniMax, H3 blog (2026-07-31). https://www.minimax.io/blog/minimax-h3
- [S9] P. MiniMax, Run and self-host MiniMax H3 (benchmarks and license note, reviewed 2026-08-26). https://platform.minimax.io/docs/guides/local-deploy-h3.md ; Video generation guide https://platform.minimax.io/docs/guides/video-generation.md ; API https://platform.minimax.io/docs/api-reference/video-generation-v2-create.md
- [S10] P. MiniMax, Pay as You Go pricing. https://platform.minimax.io/docs/guides/pricing-paygo.md
- [S11] P. Hailuo AI subscribe page (embedded plan and $/sec strings). https://hailuoai.video/subscribe
- [S12] S. TNW, "ByteDance unveils Seedance 2.5…" (2026-06-23). https://thenextweb.com/news/bytedance-seedance-2-5-ai-video-4k-30-seconds
- [S13] S. TechNode, "ByteDance launches Seedance 2.5" (2026-07-31). https://technode.com/2026/07/31/bytedance-launches-seedance-2-5-video-generation-model/
- [S14] P. Dreamina, Seedance 2.5 launch (2026-07-31). https://dreamina.capcut.com/resource/seedance-2-5-launch ; ByteDance Seed, Seedance 2.5 page https://seed.bytedance.com/en/seedance2_5
- [S15] P. Seedance 1.0 technical report, arXiv 2506.09113 (2025-06-10). https://arxiv.org/abs/2506.09113
- [S16] P. ByteDance Seed, "The Official Release of Seedance 1.5 pro" (2025-12-16). https://seed.bytedance.com/en/blog/sound-and-vision-all-in-one-take-the-official-release-of-seedance-1-5-pro
- [S17] S. Wikipedia, Seedance 2.0. https://en.wikipedia.org/wiki/Seedance_2.0
- [S18] S. Sina / IT之家, "1 元 1 秒…Seedance 2.0 公布 API 定价" (2026-03-04). https://finance.sina.com.cn/tech/digi/2026-03-04/doc-inhpvpqk3851254.shtml ; TechCrunch, Seedance 2.0 comes to CapCut (2026-03-26). https://techcrunch.com/2026/03/26/bytedances-new-ai-video-generation-model-dreamina-seedance-2-0-comes-to-capcut/
- [S19] P. Replicate model pages: https://replicate.com/bytedance/seedance-2.5 , /bytedance/seedance-2.0 , /seedance-2.0-fast , /seedance-2.0-mini , /seedance-1.5-pro , /seedance-1-pro , /seedance-1-pro-fast , https://replicate.com/minimax/h3 , /minimax/hailuo-2.3 , /hailuo-2.3-fast , /hailuo-02 , /video-01
- [S20] P. Replicate, bytedance/seedance-1-lite. https://replicate.com/bytedance/seedance-1-lite
- [S21] P. OpenRouter video models API. https://openrouter.ai/api/v1/videos/models (snapshot saved as openrouter_video_models_20260925.json)
- [S22] P. Runway API pricing. https://docs.dev.runwayml.com/guides/pricing/
- [S23] P. WaveSpeedAI, Seedance 2.5 API page. https://wavespeed.ai/seedance-2-5-api
- [S24] P. fal.ai model pages: https://fal.ai/models/bytedance/seedance-2.5/text-to-video (and /image-to-video, /reference-to-video), https://fal.ai/models/bytedance/seedance-2.0/text-to-video , /fast ; Veo https://fal.ai/models/fal-ai/veo3.1 , /fast ; Kling https://fal.ai/models/fal-ai/kling-video/v3/pro/text-to-video , v2.6, v2.5-turbo ; LTX https://fal.ai/models/fal-ai/ltx-2/text-to-video , ltx-2.3 ; Pika https://fal.ai/models/fal-ai/pika/v2.2/text-to-video ; Wan https://fal.ai/models/wan/v2.6/text-to-video ; Sora 2 Pro https://fal.ai/models/fal-ai/sora-2/text-to-video/pro ; fal pricing https://fal.ai/pricing
- [S25] P. Luma plans and credit costs. https://lumalabs.ai/pricing
- [S26] P. Freepik pricing (plans and per-model credits). https://www.freepik.com/pricing
- [S27] P. Runway plans. https://runwayml.com/pricing
- [S28] P. Dreamina pricing (plan JSON). https://dreamina.capcut.com/pricing/dreamina-price
- [S29] P. OpenArt pricing. https://openart.ai/pricing
- [S30] P. Krea pricing. https://www.krea.ai/pricing
- [S31] S. CellCog, "Seedance 2.5 Pricing: Every API and Platform Compared (August 2026)". https://cellcog.ai/blog/seedance-2-5-pricing/ ; Melies, Seedance 2.5 pricing https://melies.co/seedance-2-5-pricing ; Atlas Cloud guide https://www.atlascloud.ai/blog/guides/seedance-2.5-pricing-guide
- [S32] S. Kie.ai blog, "Seedance 2.5 Pricing: What We Know" (pre-launch, about 2026-07-15). https://kie.ai/blog/seedance-2-5-pricing ; Kie.ai 2.5 page https://kie.ai/seedance-2-5
- [S33] P. Artlist pricing. https://artlist.io/pricing
- [S34] P. Replicate, minimax/video-01. https://replicate.com/minimax/video-01
- [S35] S. Hugging Face community blog, "What Is MiniMax H3 (Hailuo 3.0)?". https://huggingface.co/blog/ResterChed/minimax-h3-hailuo-3-0 ; model card (P) https://huggingface.co/MiniMaxAI/MiniMax-H3
- [S36] S. Soochow Securities (东吴证券) IPO research note on MiniMax (00100.HK), Jan 2026, citing the prospectus. https://pdf.dfcfw.com/pdf/H3_AP202601081816847687_1.pdf
- [S37] P. fal.ai, MiniMax H3 and H3 Max pages. https://fal.ai/models/minimax/h3/text-to-video , https://fal.ai/models/minimax/h3-max/text-to-video
- [S38] P. MiniMax China (minimaxi), 按量计费 (pay-as-you-go). https://platform.minimaxi.com/docs/guides/pricing-paygo.md
- [S39] P. MiniMax Video Packages. https://platform.minimax.io/docs/guides/pricing-video.md
- [S40] P. MiniMax Token Plan. https://platform.minimax.io/docs/guides/pricing-token-plan.md
- [S41] P. Google Gemini API pricing (Veo 3.1, Gemini Omni Flash; last updated 2026-09-24). https://ai.google.dev/gemini-api/docs/pricing
- [S42] P. OpenAI model pages, Sora 2 and Sora 2 Pro (with the shutdown notice). https://developers.openai.com/api/docs/models/sora-2 , https://developers.openai.com/api/docs/models/sora-2-pro
- [S43] P. Kling AI developer pricing. https://klingai.com/global/dev/pricing
- [S44] P. Luma API pricing (Ray3.2). https://lumalabs.ai/api/pricing
- [S45] P. Alibaba Cloud Model Studio pricing (Wan, HappyHorse). https://www.alibabacloud.com/help/en/model-studio/model-pricing
- [S46] P. LTX API page. https://ltx.io/model/api
- [S47] S. LatePost via NetEase, "字节跳动的 AI 账本：豆包每天不足百万收入、Seedance 毛利 70%" ("ByteDance's AI ledger: Doubao earns under ¥1M a day, Seedance gross margin 70%") (2026-06-16). https://www.163.com/dy/article/KVIL6O950531M1CO.html
- [S48] S. BigGo Finance, "How ByteDance's Seedance 2.0 Became an AI Cash Machine…". https://finance.biggo.com/news/98d36dcf-1051-463b-a962-430c503d70ca
- [S49] S. 36Kr via Sina, "火山引擎提升MaaS营收目标至全年150亿元，Seedance 2.0单月营收已超10亿元" ("Volcano Engine raises its full-year MaaS revenue target to ¥15B; Seedance 2.0 monthly revenue tops ¥1B") (2026-06-03). https://finance.sina.com.cn/stock/t/2026-06-03/doc-iniachnr0887651.shtml ; original https://36kr.com/p/3836973710423429
- [S50] S. Search summaries of the prospectus segment margins (−8.1% / 63.2% for 2024; 4.7% / 69.4% for 9M-2025), e.g. Futu, "In-depth Analysis of the Unicorn AI Large Model Prospectus". https://news.futunn.com/en/post/66478828/in-depth-analysis-of-the-unicorn-ai-large-model-prospectus
- [S51] P. MiniMax, Full Year 2025 results (2026-03-02). https://www.minimax.io/news/minimax-global-announces-full-year-2025-financial-results
- [S52] P. MiniMax, H1-2026 interim results (HKEX announcement, 2026-08-26). https://file.cdn.minimax.io/public/586c7995-cab1-41b5-9178-c06685b32c88.pdf ; press release https://www.minimax.io/news/minimax-announces-first-half-2026-financial-results-1787744160
- [S53] S. Tiger Brokers, "MiniMax Races to Hong Kong IPO…". https://www.itiger.com/news/1162773889
- [S54] P. RunPod pricing (H200 $4.59/hr, B300 $7.89/hr, B200 $6.79/hr on-demand). https://www.runpod.io/pricing ; Lambda pricing (B200 $6.69/hr, H100 $3.99/hr) https://lambda.ai/pricing
- FX: ECB via Frankfurter. https://api.frankfurter.app/latest?from=USD&to=CNY (2026-09-24: 6.7126)
