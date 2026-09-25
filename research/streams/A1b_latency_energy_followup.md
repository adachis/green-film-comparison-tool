# A1b: Latency-based energy follow-up for Seedance 2.x and MiniMax H3

Research stream A1, second pass · compiled 2026-09-25 · research only (no app code)

**Conventions** (same as A1):
- **Wh/s** means watt-hours per second of generated output video. Everything is **GPU-only** unless the text says facility-level.
- **DERIVED** marks numbers I computed; the arithmetic is shown next to each one.
- **P** is a primary source and **S** is secondary.
- **Confidence:** H = directly stated or measured by the source. M = one primary source plus an assumption I added. L = secondary, a single run, or dominated by assumptions.
- **Output durations.** Seedance "5 s" is 121 frames at 24 fps (5.04 s), and "8 s" is 193 frames (8.04 s). I verified both from the billed token counts (for example, 108,900 tokens = 121 frames × 1280×720 / 1024) and from the MP4 headers of downloaded outputs. MiniMax "5 s" and "8 s" are 120 and 192 frames.
- **Jegham et al. (arXiv 2607.04553) method:** `E_GPU = N_GPU × 0.9 × TDP × latency`, using the minimum of several API runs. The node power figures used below are:

  | Node | TDP | At 0.9 × TDP |
  |---|---|---|
  | 8×H800 | 5.6 kW | 5,040 W |
  | 8×B200 | 8.0 kW | 7,200 W |
  | 8×H20 | 3.2 kW | 2,880 W |
  | 8×L20 | 2.2 kW | 1,980 W |

- **Working files:**
  - Latency observations: `research/A1b/A1b_latency_observations.csv`
  - Calculation script and output: `research/calc/a1b_latency_energy.py` and `research/calc/a1b_latency_energy_output.txt`
  - Raw captures: `research/A1b/` (Replicate, fal, WaveSpeed and OpenRouter JSON/HTML, the Carbon Trust PDF and text, and the Seedance 2.0 report text)

---

## 1. Summary

### Key findings

1. **There is now plenty of public latency data, but none of it is a vendor inference time for Seedance 2.x or H3.**
   - Every Seedance and official-H3 figure comes from resellers that proxy to BytePlus or MiniMax: Replicate, fal (partner endpoints), WaveSpeed and OpenRouter. These figures therefore include upstream queueing, prompt rewriting and safety checks, encoding and upload.
   - The best sets are:
     - **OpenRouter's own benchmark.** 11–12 identical prompts per model, all 8-s clips with audio at 720p (2K for H3), run on 26 and 31 Aug 2026 (verified from asset timestamps and MP4 headers).
     - **OpenRouter live-traffic percentiles.**
     - **Replicate example predictions**, which include timing logs.
   - **Seedance 2.5, 720p with audio:**
     - Minimum 136.5 s for an 8-s clip (n = 11; median 255.5 s).
     - 119.2 s for a 5-s clip (single run, 9 Aug).
     - Other single 5-s runs: 143–220 s.
     - Live-traffic p50 is about 180–220 s for requests averaging 10.5 s.
   - Seedance 2.0, 2.0 Fast and 2.0 mini have similar latency per output second: 12–17 s per output-second at best. **Seedance 1.5 Pro** is about 9–13.
2. **Using OpenRouter minimums as a stand-in for Jegham's fal minimums is validated.** For Veo 3.1, Sora 2 Pro and Gen-4.5, the OpenRouter 8-s/720p minimum latencies fall within −14% to +13% of the latencies implied by Jegham's published energies. Seedance 1.5 Pro is the outlier at +43% (§2.3).
3. **Applying Jegham's method directly** to the Seedance 2.5 minimum (136.5 s / 8.04 s = 17.0 latency-seconds per output-second) gives, DERIVED, GPU-only at 720p:

   | Node | Wh/s |
   |---|---|
   | 8×H800/H100 | 23.8 |
   | 8×B200 | 34.0 |
   | 8×H20 | 13.6 |
   | 8×L20 | 9.3 |

   A same-channel ratio against Seedance 1.5 (2.5 is 1.31× 1.5's OpenRouter minimum), applied to Jegham's 1.5 estimate, gives **16.7 Wh/s** on an H800/H100 basis. That is 6.5 on L20 and 23.8 on B200.
4. **The hardware is more likely Hopper/Blackwell than L20/H20.**
   - BytePlus ModelArk serves Seedance only from its Johor, Malaysia region (A2).
   - Per WSJ (via The Decoder, 13 Mar 2026), ByteDance has leased H100 servers from Aolani Cloud in Malaysia since Feb 2025 and is adding about 500 Blackwell systems (about 36,000 B200s, more than $2.5B) "to meet rising AI demand from its global customers".
   - Jegham chose H800 only because of Chinese export limits. That rationale does not apply to Malaysia, but H800 and H100 have the same 700 W TDP, so the energy basis is unchanged.
   - L20 and H20 remain plausible for China-served products (Jimeng, Doubao, Volcano Engine). The Seedance 1.0 report gave its speed on "NVIDIA-L20".
5. **Latency × 8 GPUs overstates energy when a provider serves requests on fewer GPUs.**
   - The official MiniMax H3 endpoint takes 141.6 s for a 5-s 768p clip. On 8×H800 that would be 39.6 Wh/s.
   - But H3 at 50 steps measures 10 Wh/s on 4×H200 (74.4 s). The observed latency matches roughly 2 H200-class GPUs per request (9.9 Wh/s, DERIVED).
   - Latency-based estimates are therefore upper-bound-leaning unless the GPU count is known.
6. **A price/margin cross-check (hardware-agnostic) lands in the same range.**
   - LatePost reports about 70% gross margin on Seedance. At about 250–470 Wh of GPU energy per dollar of GPU cost (my TCO assumption), Seedance 2.5 at 720p ($0.2311/s) gives **about 21 Wh/s central (4–33)**.
   - MiniMax's API segment gross margin (69.4%, 9M-2025) with H3 at $0.08/s gives **about 7 Wh/s (1.4–11)**.
7. **H3 Max (fal) is an order of magnitude cheaper in energy than H3.**
   - fal's example output reports `timings.inference` = **2.53 s** (text-to-video) and **2.77 s** (image-to-video) for a 5-s 768p clip. The schema defines this as "the DiT denoising time on the GPU backend".
   - fal says H3 Max is "trained and served entirely on NVIDIA GB200 NVL72 systems", with multi-node inference.
   - DERIVED: 0.6–2.4 Wh/s for the DiT on 4–16 GB200s, or about **1.5 Wh/s** with non-DiT stages.
8. **New literature.**
   - The main find is the **Carbon Trust / DIMPACT report** (23 Jun 2026; commissioned by the BBC, Netflix, Sky and Spotify). It assumes **381 Wh GPU (494 Wh total) per 8-s 720p cloud video**, derived from Delavande's Wan2.1-1.3B model. That is about 48 Wh/s GPU, **2.6× my revised Seedance central**.
   - Its streaming-series VFX case study used **2,137 generated videos for a 53-s scene** (6,411 in a high-iteration case). It estimated about 0.9–2.1 t CO₂e for generative VFX versus 8.5–25 t for traditional VFX rendering (US grid).
   - It reports that leading video-model developers gave "no substantive responses" to data requests.
   - No new peer-reviewed measurement of commercial video APIs exists. Jegham et al. has 0 citations in Semantic Scholar, and Delavande has 4.
9. **The Seedance 2.0 technical report (arXiv 2604.14148 v1) is evaluation-only.** It gives no parameters, steps, distillation, hardware or inference time (§5).
10. **The Factorial Funds Sora estimate is still unrecoverable.** The only trace is a Hacker News quote of its formula, "10.7M / 120 ≈ 89k" H100s, plus headlines (§4.3).

### Recommended revision

All values are GPU-only at the native base resolution with audio on. Facility-level = × 1.72 (A1 §2.11, unchanged).

| Class / model | First pass | **Revised central** | Range (low–high) | Confidence | Main basis |
|---|---|---|---|---|---|
| **Seedance-class: Seedance 2.5, 720p** | 10 (2–35) | **18 Wh/s** | 5–40 | M-/L | Latency × H100-class, calibrated vs Seedance 1.5 (16.7); raw latency × 8×H100 (23.8); price/margin (20.6). Low = L20/H20 serving or about 90% margin; high = B200 at the observed latency |
| Seedance 2.0 / 2.0 Fast / 2.0 mini, 720p | (not separated) | 14 / 11 / 7 Wh/s (0.8 / 0.6 / 0.4 × 2.5) | ×0.3–×2 each | L | Latency per output-second 0.8–1.0 × 2.5 for 2.0 and Fast; list price 0.65 / 0.52 / 0.33 × 2.5. Mini's latency is not lower, so it probably runs on fewer or cheaper GPUs; weight by price |
| **Hailuo-class: MiniMax H3 via MiniMax API, 768p** | 5 (1–20) | **7 Wh/s** | 2–20 | M-/L | SGLang 50-step physical 8–10 Wh/s, less sparse attention; latency consistent with about 2 H200-class GPUs per request (≈10); API-margin cross-check about 7 |
| **New: MiniMax H3 Max (fal-hosted, GB200)** | (not separate; FastH3 0.9 was the "low") | **1.5 Wh/s** | 0.6–3.5 | M-/L | fal DiT timing of 2.53 s per 5-s clip on 4–16 GB200, plus non-DiT stages |
| H3 2K multiplier (vs 768p) | ×2.5 (1.6–4) | **×1.5** | 1.15–2.5 | L | Official-API latency is only +14% to +21% for 2K vs 768p (5-s clips); price is +63% |
| Seedance resolution factor (α) | 0.7 | unchanged (480p 0.57×; 1080p 1.76×) | 0.45–1.3 | L | No 480p or 1080p latency data found for 2.5. The price ratio (2.46× from 720p to 1080p) hints the 1080p factor could be higher |

Resulting Seedance 2.5 values (DERIVED from 18 × 0.57 and 18 × 1.76):

| Resolution | GPU-only Wh/s |
|---|---|
| 480p | ≈10 |
| 720p | 18 |
| 1080p | ≈32 |

**Facility-level centrals (× 1.72):**
- Seedance 2.5 at 720p ≈ **31 Wh/s**: about 155 Wh per 5-s clip and about 250 Wh per 8-s clip.
- H3 at 768p ≈ **12 Wh/s**: about 60 Wh per 5-s clip.
- H3 Max ≈ **2.6 Wh/s**.

### Reasoning

- **Why raise Seedance from 10 to 18.**
  - The first pass multiplied a Seedance 1.0 geometric mean (L20 × H800) by an *assumed* 1.4.
  - New same-channel data put 2.x at 1.3× (benchmark minimum) to 2.1–2.4× (live-traffic p50 per output-second) of Seedance 1.5. So 1.4 was at the low end.
  - More importantly, international (BytePlus) Seedance runs in Malaysia, where ByteDance's documented fleet is H100 and B200, not L20. That removes most of the weight on the first pass's low L20 leg.
  - Three largely independent routes give 16.7 (ratio), 20.6 (price/margin) and 23.8 (raw latency) Wh/s on Hopper-class assumptions.
  - I shaded the central below the geometric mean (≈20) for two reasons: the H3 case shows the 8-GPU-per-request assumption can overstate energy several-fold, and part of API latency is prompt planning (Seedance 2.x exposes `enable_web_search`), safety review and upload.
- **Why raise H3 only slightly, from 5 to 7.**
  - The physical anchor (10 Wh/s at 50 steps, full attention, BF16) is unchanged.
  - Production sparse attention should cut it by 1.5–2×.
  - But the official endpoint shows no sign of aggressive acceleration: it is about 2× slower than a 4×H200 SGLang run and "≈35× slower than H3 Max" per fal.
  - MiniMax rents compute mainly from Alibaba Cloud (China), where H20-class GPUs roughly double energy per video.
  - The API-margin check gives about 7.
- **The Seedance/Hailuo gap is now about 2.6×.** This is consistent with the list-price ratio (Seedance 2.5 720p at $0.231/s vs H3 768p at $0.08/s = 2.9×) at similar reported margins (about 70% and 69%). It is still a modelling result, not a disclosure.

---

## 2. Latency data

### 2.1 Observations (all figures are wall-clock unless marked)

- **Latency types:**
  - **e2e:** request to finished file, including upstream queue.
  - **upstream wait:** the time a proxy spent waiting on BytePlus or MiniMax.
  - **DiT:** GPU denoising only.
- **Queue vs inference:** only fal's H3 Max (DiT field) and WaveSpeed's self-hosted H3 separate GPU time from queueing. Replicate's own queue was negligible: `created_at` to `started_at` took 0.01–0.05 s in every example.
- **Audio:** audio is on for all Seedance 2.x and H3 rows (the default). The OpenRouter benchmark MP4s contain stereo AAC tracks (verified).
- Full list: `A1b_latency_observations.csv` (36 rows).

| Model | Channel (provider behind it) | Mode · res · output · audio | Latency (type) | Date | n | Source | P/S | Conf. |
|---|---|---|---|---|---|---|---|---|
| **Seedance 2.5** | OpenRouter benchmark (provider "Seed" = BytePlus ModelArk, model `dreamina-seedance-2-5-260628`) | T2V · 1280×720 · 8.04 s · audio | **136.5 s min**; median 255.5; max 316.0 (e2e) | 26 and 31 Aug 2026 | 11 | [S1] OpenRouter arena API | P (platform measurement) | H (value), M (as inference time) |
| Seedance 2.5 | OpenRouter playground example | T2V · 1280×720 · 5.04 s · audio | **119.2 s** (e2e), $1.1556 | 9 Aug 2026 | 1 | [S2] | P | M |
| Seedance 2.5 | OpenRouter live traffic | mixed: average 10.5 s per request; about 72% 720p by $ (DERIVED: ($0.195 − $0.103)/($0.231 − $0.103)) | Page p50 **180.05 s** ("best provider"). Daily p50 on 17–24 Sep: 257, 237, 207, 193, 228, 204, 202, 220 s. Week averages: P75 290.6, P90 376.1, P95 442.9, P99 633.9 s | 17–24 Sep 2026 | ≈22.7k requests per 7 days | [S3][S4] | P | H (value), L (per-second use) |
| Seedance 2.5 | WaveSpeed (proxy) | T2V · 720p · 5 s · audio | 187.7 s (`timings.inference` = upstream wait); FAQ "around 279 s" | 18 Sep 2026 | 1 | [S5] | P (reseller) | M |
| Seedance 2.5 | WaveSpeed (proxy) | I2V · 720p · 5 s · audio | 143.3 s; FAQ 193 s | 24 Sep 2026 | 1 | [S5] | P (reseller) | M |
| Seedance 2.5 | WaveSpeed "Turbo" (WaveSpeed's own tier) | T2V / I2V · 720p · 5 s | 223.9 / 330.1 s | 24 Sep / 7 Aug | 1 each | [S5] | P (reseller) | L |
| Seedance 2.5 | WaveSpeed | Extend: 5 s (+input) · 720p / Edit: 720p | 467.6 / 703.2 s | 24 Sep / 7 Aug | 1 each | [S5] | P (reseller) | L |
| Seedance 2.5 | Replicate (proxy) | T2V · 720p · 5.04 s · audio (default) | 220.3 s ("Generated video in"); predict_time 224.1 | 7 Aug 2026 (API launch day) | 1 | [S6] | P | M |
| **Seedance 2.0** | OpenRouter example | T2V · 720p · 5 s · audio | **80.4 s** | 1 Aug 2026 | 1 | [S2] | P | M |
| Seedance 2.0 | Replicate (4 requests submitted within 4 s) | T2V · 720p 16:9 · 5 s / 5 s / 7 s / 8 s; plus 9:16 5 s · audio | 101.3 / 159.2 / 111.7 / **112.9**; 9:16 115.6 s | 8 Apr 2026 | 5 | [S7] | P | M |
| Seedance 2.0 | OpenRouter benchmark | T2V · 1280×720 · 8.04 s · audio | 138.7 min; median 166.8 | 26 and 31 Aug | 11 | [S1] | P | H/M |
| Seedance 2.0 | WaveSpeed | T2V / I2V · 720p · 5 s · audio | 139.1 / 210.2 s | 15 Jul / 24 Sep | 1 each | [S5] | P (reseller) | L |
| **Seedance 2.0 Fast** | Replicate | T2V · 720p · 5 s (×2), 9:16 5 s, 7 s, 21:9 8 s · audio | **65.9** / 103.3; 97.2; 86.2; **95.9** s | 8 Apr 2026 | 5 | [S7] | P | M |
| Seedance 2.0 Fast | OpenRouter benchmark | T2V · 720p · 8.04 s · audio | 134.6 min; median 140.0 | 26 and 31 Aug | 11 | [S1] | P | H/M |
| Seedance 2.0 Fast | OpenRouter example / WaveSpeed | T2V · 720p · 5 s | 170.1 / 174.2 s | 10 Aug / 24 Sep | 1 each | [S2][S5] | P | L |
| **Seedance 2.0 mini** | OpenRouter benchmark | T2V · 720p · 8.04 s · audio | 105.6 min; median 135.9 | 26 and 31 Aug | 11 | [S1] | P | H/M |
| Seedance 2.0 mini | OpenRouter / WaveSpeed / Replicate | T2V · 720p · 5 s | 116.6 / 126.8 / 167.2 s | 12 Aug / 15 Jul / 24 Jun | 1 each | [S2][S5][S6] | P | L |
| Seedance 1.5 Pro (calibration) | OpenRouter benchmark | T2V · 720p · 8.04 s · audio | 104.0 min; median 138.3 | 26 and 31 Aug | 12 | [S1] | P | H/M |
| Seedance 1.5 Pro | Replicate | T2V · 720p (default) · 5 s · audio | 55.0 s | 23 Dec 2025 | 1 | [S6] | P | M |
| Seedance 1.0 Pro / Pro Fast | Replicate | T2V · 1080p · 5 s · no audio | 50.5 s / 32.8 s. Paper: **41.4 s on "NVIDIA-L20"** | 24 Jun / 24 Oct 2025 | 1 each | [S6]; arXiv 2506.09113 | P | M |
| **MiniMax H3 (official API)** | WaveSpeed (proxy to MiniMax) | T2V / I2V · 768p · 5 s · audio | **141.6** / 156.5 s; FAQ 161 / 353 s | 24 Sep / 3 Aug | 1 each | [S8] | P (reseller) | M |
| MiniMax H3 (official API) | OpenRouter | T2V · 2560×1440 (2K) · 5 s / 8 s · audio | 162.0 (example) / **264.2 min**, median 295.1 (benchmark) | 3 Aug / 26 and 31 Aug | 1 / 12 | [S1][S2] | P | M |
| MiniMax H3 (official API) | OpenRouter live traffic | 2K only · average 8.0 s | daily p50 median 333 s | 17–24 Sep | ≈5.6k requests per 7 days | [S3][S4] | P | L (per-second use) |
| MiniMax H3 (official API) | Replicate | I2V · 2K · 5 s | 189.3 s (predict_time) | 13 Aug 2026 | 1 | [S6] | P | M |
| MiniMax H3 open weights | WaveSpeed's own GPUs (hardware undisclosed) | T2V / I2V / R2V / extend · 480p · 5 s | **21.0** / 24.0 / 26.5 / 38.4 s (`timings.inference`) | 5 Sep 2026 | 1 each | [S9] | P (host) | M |
| **MiniMax H3 Max** (fal post-train) | fal (fal-hosted: `provider_type: fal`) | T2V / I2V · 768P · 5 s · audio, `prompt_expansion_mode: balanced` | **2.53 / 2.77 s DiT denoising only** | page 25 Sep 2026 (model launched 27 Aug) | 1 each | [S10] | P (host) | H (value), M (interpretation) |
| MiniMax H3 Max | fal blog | 5 s | "generates a 5-second video in under 3 seconds … roughly 35x the throughput of the official MiniMax H3 endpoint" | 27 Aug 2026 | — | [S11] | P (vendor claim) | M |
| MiniMax H3 Max | OpenRouter (provider "Minimax") | T2V · 1344×768 · 5 s / 8 s | 12.4 s e2e (example) / 42.1 min, median 62.7 (benchmark on 3 Sep, launch week) | 2–3 Sep 2026 | 1 / 11 | [S1][S2] | P | M / L |
| MiniMax H3 Max | OpenRouter live traffic | 480p/768p · average 7.4 s | daily p50 14–15 s | 17–24 Sep | ≈6.7k requests per 7 days | [S3][S4] | P | M |
| MiniMax H3 (SGLang, first pass) | self-host | 1344×768 · 5.17 s · audio · 50 steps | 74.38 s on 4×H200; 19.04 s on 8×B300 | Aug–Sep 2026 | — | A1 §2.7 | P | H |
| Hailuo 2.3 / 2.3 Fast / 02 (legacy) | Replicate | 768p 6 s / 768p 10 s I2V / 1080p 6 s | 93.9 / 172.1 / 214.7 s | Aug–Oct 2025 | 1 each | [S6] | P | L |

### 2.2 OpenRouter live traffic, as a rough per-second latency index

DERIVED: the median of daily p50 latencies divided by the mean output duration per request. This mixes resolutions and includes queueing, so treat it as an index, not an inference time.

Source: OpenRouter frontend stats APIs, 7 days to 24 Sep 2026 [S3][S4].

| Model | Median of daily p50 (s) | Mean output per request (s) | p50 ÷ mean duration (s per s) | Average $ per output-second |
|---|---|---|---|---|
| Seedance 2.5 | 213 | 10.5 | 20.3 | 0.195 |
| Seedance 2.0 | 185 | 7.9 | 23.4 | 0.177 |
| Seedance 2.0 Fast | 131 | 7.8 | 16.8 | 0.062 |
| Seedance 2.0 mini | 109 | 7.7 | 14.2 | 0.050 |
| Seedance 1.5 Pro | 59 | 6.1 | 9.7 | 0.031 |
| MiniMax H3 (2K) | 333 | 8.0 | 41.6 | 0.130 |
| MiniMax H3 Max | 15 | 7.4 | 2.0 | 0.076 |
| Veo 3.1 / 3.1 Fast / 3.1 Lite | 92 / 64 / 45 | 6.6 / 6.7 / 5.2 | 13.9 / 9.6 / 8.7 | 0.318 / 0.102 / 0.043 |
| Kling 3.0 Pro (1080p) | 163 | 6.6 | 24.7 | 0.150 |

- Useful side facts: OpenRouter's Seedance 2.5 users request **10.5 s per clip on average**. Across models, 5–10 s is typical.
- OpenRouter ranks Seedance 2.5 **21st of 25 on speed** in its benchmark [S2].

### 2.3 Calibration: do OpenRouter minimums reproduce Jegham's latencies?

Jegham's implied latency is DERIVED as energy ÷ (0.9 × node TDP), using his hardware assumptions:
- **Veo 3.1:** TPU v6e node at 2.173 kW, used with or without the 0.9 factor, hence a range.
- **Sora 2 Pro and Gen-4.5:** equal-weight 8×B200 / 8×H200, mean 6.8 kW × 0.9 = 6.12 kW.
- **Seedance:** 8×H800 at 5.04 kW.

| Model, 8 s at 720p | Jegham energy (Wh) | Implied latency | OpenRouter benchmark min (n) | Ratio (OR ÷ Jegham) |
|---|---|---|---|---|
| Veo 3.1 | 39.5 | 65–73 s | 73.9 s (12) | 1.02–1.13 |
| Sora 2 Pro | 418.5 | 246 s | 254.6 s (10) | 1.03 |
| Runway Gen-4.5 | 322.0 | 189 s | 163.5 s (12) | 0.86 |
| **Seedance 1.5 Pro** | 102.1 | **72.9 s** | **104.0 s (12)** | **1.43** |

Conclusions:
- For non-ByteDance models, OpenRouter minimums reproduce Jegham's latencies within about ±15%, so they are a reasonable proxy.
- For Seedance, the same channel shows 43% more latency than Jegham measured on fal (an earlier date, and a now-retired model). I use that ratio as a queue/overhead deflator in §3.4.

### 2.4 Other sources checked

- **Artificial Analysis** [S12]:
  - AA publishes "API Generation Time" (seconds for a 720p, 5-s video; the "median time the provider takes … over the past 3 days … end-to-end, including downloading").
  - The public comparison shows this for **only 7 models**: LTX-2.3 Fast 25.2 s, LTX-2.3 Pro 50.8 s, Kling 3.0 1080p Pro via fal 88.3 s, HappyHorse-1.1 109.0 s, Wan 2.2 A14B at 480p via DeepInfra 269.6 s, Vidu Q3 Turbo 439.6 s and Vidu Q3 Pro 559.7 s.
  - **No Seedance or H3 generation time is published** (checked 25 Sep 2026; provider pages for `seedance-2-0` and `minimax-h3` return 404).
  - Seedance 2.5 is not yet on the text-to-video leaderboard. Current Elo: H3 Max 1227 at $2.40/min, H3 1220 at $7.80/min, Seedance 2.0 720p 1210 at $9.07/min.
- **BytePlus docs** [S13]:
  - No expected generation time is published.
  - Seedance 2.5, 2.0, 2.0 Fast and 2.0 mini rate limits: **600 RPM and 10 concurrent tasks (enterprise); 180 RPM and 3 concurrent (individual)**. "When this limit is reached, newly created tasks enter a queue."
  - Seedance 2.0 at 4K: 15 RPM and concurrency 1.
  - The API has a FIFO queue with an optional `priority` and a default task expiry (`execution_expires_after`) of 172,800 s.
  - The sample code polls every 30 s with a 30-min timeout.
  - Per-account concurrency caps explain the queueing spread in aggregator data. For example, OpenRouter's 11 simultaneous benchmark prompts span 136–316 s. The DERIVED average concurrency of OpenRouter's Seedance 2.5 traffic is 3,981 requests × about 220 s / 86,400 s ≈ 10.
- **fal pages:**
  - Seedance 2.x and official H3 on fal are **partner (proxied) endpoints** with no timings.
  - The fal article comparing H3 Max and Seedance 2.5 (15 Sep 2026) lists "Backend timing returned: ✅ timings.inference" for H3 Max only. It notes prompt expansion "balanced, back in about a second" versus "quality, spending up to thirty seconds" [S14].
- **Design Arena**, quoted by fal (S): "MiniMax H3 Max by fal delivers the quality of MiniMax H3 at more than 50× the speed" [S11].
- **User reports (Reddit, X, YouTube): not obtainable.**
  - Reddit returned 403, X is not reachable, and search engines were degraded (Bing ignores quotes; DuckDuckGo shows a CAPTCHA).
  - Hacker News (Algolia API) has no Seedance 2.5 timing reports. One anecdote from a user on 22 Aug 2026 says a typical AI "scene" "might cost thousands of dollars in generation … Directors will shoot the same shot dozens of times" [S15] (S, L).

---

## 3. Energy conversions

### 3.1 Hardware basis

| GPU | TDP used | Status |
|---|---|---|
| H800 / H100 SXM | 700 W | NVIDIA spec for H100; H800 is the same TDP (Jegham App. E) |
| B200 | 1,000 W | Jegham App. B; DGX B200 page |
| H20 | 400 W | Commonly reported; **not verified from NVIDIA** (no public NVIDIA page found) |
| L20 | 275 W | Commonly reported; **not verified** (NVIDIA L20 pages return 404) |
| GB200 (for H3 Max) | about 1,200 W per GPU | **Secondary / not verified**; used only for the H3 Max bracket |

### 3.2 Latency to GPU energy per output second

DERIVED, Jegham method: Wh/s = (latency ÷ output s) × node W at 0.9 × TDP ÷ 3,600.

Worked example: 136.5 s ÷ 8.04 s = 16.98 latency-seconds per output-second; × 5,040 W ÷ 3,600 = **23.8 Wh/s**.

| Case | Latency per output-second | 8×H800 | 8×B200 | 8×H20 | 8×L20 |
|---|---|---|---|---|---|
| **Seedance 2.5**, 8 s 720p, OpenRouter benchmark min (136.5 s) | 16.98 | **23.8** | 34.0 | 13.6 | 9.3 |
| Seedance 2.5, 5 s 720p, OpenRouter example (119.2 s) | 23.65 | 33.1 | 47.3 | 18.9 | 13.0 |
| Seedance 2.5, 5 s 720p, WaveSpeed image-to-video (143.3 s) | 28.42 | 39.8 | 56.8 | 22.7 | 15.6 |
| Seedance 2.5, 5 s 720p, Replicate at launch (220.3 s) | 43.71 | 61.2 | 87.4 | 35.0 | 24.0 |
| Seedance 2.0, 8 s 720p, Replicate (112.9 s) | 14.04 | 19.7 | 28.1 | 11.2 | 7.7 |
| Seedance 2.0, 8 s 720p, OpenRouter min (138.7 s) | 17.25 | 24.2 | 34.5 | 13.8 | 9.5 |
| Seedance 2.0, 5 s 720p, OpenRouter example (80.4 s) | 15.95 | 22.3 | 31.9 | 12.8 | 8.8 |
| Seedance 2.0 Fast, 8 s 21:9, Replicate (95.9 s) | 11.93 | 16.7 | 23.9 | 9.5 | 6.6 |
| Seedance 2.0 Fast, 5 s 720p, Replicate min (65.9 s) | 13.08 | 18.3 | 26.2 | 10.5 | 7.2 |
| Seedance 2.0 mini, 8 s 720p, OpenRouter min (105.6 s) | 13.13 | 18.4 | 26.3 | 10.5 | 7.2 |
| Seedance 1.5 Pro, 8 s 720p, OpenRouter min (104.0 s) | 12.94 | 18.1 | 25.9 | 10.3 | 7.1 |
| Seedance 1.5 Pro, 8 s 720p, Jegham-implied (72.9 s) | 9.07 | 12.7 (= Jegham's published 102.1 Wh / 8.04 s) | 18.1 | 7.3 | 5.0 |
| Seedance 1.0 Pro, 5 s 1080p, Replicate (50.5 s) | 10.02 | 14.0 | 20.0 | 8.0 | 5.5 |
| **MiniMax H3 official**, 5 s 768p (141.6 s) | 28.31 | 39.6 | 56.6 | 22.6 | 15.6 |
| MiniMax H3 official, 8 s 2K, OpenRouter min (264.2 s) | 33.02 | 46.2 | 66.0 | 26.4 | 18.2 |
| MiniMax H3 open weights on WaveSpeed, 5 s 480p (21.0 s) | 4.20 | 5.9 | 8.4 | 3.4 | 2.3 |
| MiniMax H3 Max, 5 s 768p, OpenRouter e2e (12.4 s) | 2.48 | 3.5 | 5.0 | 2.0 | 1.4 |

Physical anchors and other brackets (DERIVED unless noted):

- **SGLang H3, measured latency (first pass):**
  - 4×H200: 4 × 630 W × 74.38 s ÷ 5.167 s ÷ 3,600 = **10.1 Wh/s**
  - 8×B300: 8 × 990 W × 19.04 s ÷ 5.167 ÷ 3,600 = **8.1 Wh/s**
- **H3 Max on fal** (DiT only, 2.53 s, GB200 at 1.2 kW × 0.9 = 1,080 W each):

  | GPUs | DiT energy | Wh/s |
  |---|---|---|
  | 4 | 3.0 Wh | 0.61 |
  | 8 | 6.1 Wh | 1.21 |
  | 16 | 12.1 Wh | 2.43 |

  - Adding about 40% for text encoding (Qwen3-VL-32B), VAE and audio decode (my assumption) gives 0.85 / 1.70 / 3.40 Wh/s.
  - fal says H3 Max runs multi-node on GB200 "because a model of this size does not fit comfortably on one node". A GB200 NVL72 compute tray has 4 GPUs, so ≥8 GPUs is likely. The count is not disclosed.
  - The FastH3 community distillation (first pass) measured 0.87 Wh/s on 4×B300.
- **Official H3 if served on 2×H200** (a throughput-optimized allocation): 2 × 630 W × 141.6 s ÷ 5 s ÷ 3,600 = **9.9 Wh/s**. This matches the SGLang physical anchor.

### 3.3 Which hardware is plausible

- **BytePlus / Seedance (international API): H100 now, B200 increasingly.**
  - BytePlus ModelArk serves Seedance only from ap-southeast-1 (Johor, Malaysia). The EU region has no Seedance (A2, BytePlus region doc [S16]).
  - WSJ (via The Decoder [S17]; Reuters/Straits Times in A2) reports that Aolani Cloud "has been leasing servers with Nvidia's H100 chips to Bytedance in Malaysia since February 2025". ByteDance and Aolani plan "around 500 Nvidia Blackwell computing systems … approximately 36,000 B200 chips", costing more than $2.5B, for "AI research and development outside China, as well as to meet rising AI demand from its global customers".
  - The summary I read says Malaysia, not Johor specifically. 500 systems holding 36,000 GPUs implies 72-GPU (NVL72-class) racks (DERIVED: 36,000 ÷ 500).
  - **Energy per latency-second is therefore 5.04 kW (H100) to 7.2 kW (B200) per 8 GPUs.** Jegham's H800 assumption was justified by Chinese export restrictions [S18 App. E], which do not apply in Malaysia, but it is energy-equivalent to H100.
- **China-served Seedance** (Jimeng, Doubao, Volcano Engine; most of the global volume): H20, L20, H800 or domestic accelerators are plausible. The Seedance 1.0 report benchmarked on "NVIDIA-L20" (A1). That gives 1.98–2.88 kW per 8 GPUs, which is 0.39–0.57× the H100 energy for the same latency.
- **The B200 caveat.** On B200 the same model runs faster. A *measured* latency, if it came from B200s, therefore implies 1.43× the H100-basis energy. The latency is what we observe; the hardware behind it is what we cannot see.
- **MiniMax** is asset-light: more than 90% of its cost of sales is rented inference cloud, and Alibaba Cloud is its largest supplier (A2). The official-API hardware is not disclosed.
- **fal H3 Max:** GB200 NVL72, per fal's own statements [S11][S19].

### 3.4 Biases in latency × 8 GPUs, and how I corrected for them

1. **GPUs per request (largest bias).** Jegham assumes a dedicated 8-GPU node per request. The H3 case shows why that can overstate energy:
   - The official endpoint's 141.6 s implies 39.6 Wh/s on 8×H800.
   - But the same 50-step model physically needs about 10 Wh/s, and the latency fits about 2 H200-class GPUs per request.
   - Providers that optimize for throughput use fewer GPUs per request and accept longer latency. **Latency-based numbers are upper-bound-leaning** unless the GPU count is known.
2. **Non-GPU time.**
   - Seedance 2.x has an LLM planning/rewrite stage (WaveSpeed's input includes `enable_web_search`), safety review, encode/upload and proxy polling.
   - For Seedance 1.0, Replicate's 50.5 s versus the paper's 41.4 s suggests about 18% non-benchmark overhead (DERIVED: 1 − 41.4/50.5).
   - For H3 Max, OpenRouter's 12.4 s e2e versus 2.53 s of DiT shows that overhead dominates for very fast models.
3. **Queueing.** Per-account concurrency caps (10 enterprise) and parallel submissions inflate proxy latencies. Minimums help. The Seedance 1.5 calibration (OpenRouter minimum is 1.43× Jegham's) gives a deflator of **0.70**.

**Calibrated same-channel method** (DERIVED; H800/H100 basis):
- Seedance 2.5 ÷ 1.5 OpenRouter minimum = 136.5 / 104.0 = **1.31**.
- × Jegham's 1.5 estimate of 12.7 Wh/s gives **16.7 Wh/s**. On other hardware: L20 6.5, H20 9.5, B200 23.8.
- Same method for other models: 2.0 → 16.9, 2.0 Fast → 16.4, 2.0 mini → 12.9.
- Live traffic gives a higher 2.x/1.5 ratio (2.1–2.4× on the per-second p50 index, §2.2), which would imply 27–30 Wh/s. I treat that as the upper side, because the traffic mixes differ.

### 3.5 Hardware-agnostic cross-check: price × cost share × energy per dollar

DERIVED formula: Wh/s = list price ($/s) × (1 − gross margin) × GPU share of serving cost × Wh of GPU energy per $ of GPU cost.

- **Margins:**
  - Seedance: LatePost (16 Jun 2026) reports about 70%, "for every ¥10 of API calls, server and inference cost about ¥3" (S, M, via B). 36Kr practitioners estimate "as high as 90%" (S, L).
  - MiniMax Open Platform: 69.4% (9M-2025, prospectus, via B). This is a blended figure across text, speech and video.
- **Energy per dollar (my assumption):** about 250–470 Wh per $ of GPU time. This assumes a TCO or long-term rental of $1.3–2.5/h for H100/H800 (630 W at 0.9 TDP), $2.0–3.5/h for B200, $0.7–1.2/h for H20 and $0.4–0.7/h for L20. These give 252–485, 257–450, 300–514 and 354–619 Wh/$ respectively.
  - The ratio is similar across GPU generations, which is why this check does not depend on hardware.
  - At *retail on-demand* prices (Lambda H100 $3.99/h; RunPod or Lambda B200 about $6.7–6.8/h; per B), it falls to about 135–160 Wh/$, which would roughly halve the results.
- **Results:**

  | Model | Low | Central | High |
  |---|---|---|---|
  | Seedance 2.5, 720p ($0.2311/s) | 4.0 | **20.6** | 32.6 |
  | Seedance 2.0, 720p ($0.152/s) | 2.7 | 13.6 | 21.4 |
  | MiniMax H3, 768p ($0.08/s) | 1.4 | **7.1** | 11.3 |

  - Central: 70% gross margin, 85% GPU share, 350 Wh/$.
  - Low: 90% gross margin, 70% GPU share, 250 Wh/$.
  - High: 70% gross margin, 100% GPU share, 470 Wh/$.
  - **Confidence L.** The margins are secondary and blended, and the dollars-to-energy conversion is my assumption.

### 3.6 Comparison with the first pass and the H3 open-weight measurement

| Anchor | Wh/s (GPU-only, base resolution) | Comment |
|---|---|---|
| First pass, Seedance-class central | 10 (2–35) | Seedance 1.0 geometric mean (L20, H800) × assumed 1.4 |
| **This pass, Seedance 2.5** | 16.7 (ratio) / 20.6 (price) / 23.8 (raw latency, H100) → **recommend 18 (5–40)** | The first pass's 1.4 was low-end, and its L20 leg is unlikely for the BytePlus international service |
| First pass, Hailuo-class central | 5 (1–20) | H3 at 50 steps (8–10) with production sparse attention |
| MiniMax H3 open-weight measurement | 10.1 (4×H200), 8.1 (8×B300) | 50 steps, full attention, BF16 |
| **This pass, H3 official** | Latency-based 39.6 on 8×H800 is implausible; 9.9 if 2×H200; price check 7.1 → **recommend 7 (2–20)** | |
| **This pass, H3 Max** | 0.6–2.4 DiT only → **1.5 (0.6–3.5)** | Brackets FastH3's 0.87 |

---

## 4. New literature and coverage

### 4.1 Items found (2025–2026)

| Item | Date | Key content (numbers) | P/S | Relevance / confidence |
|---|---|---|---|---|
| **Carbon Trust, "The carbon impact of AI video generation"** (report + news release; commissioned and funded by DIMPACT: BBC, Netflix, Sky, Spotify; ITV also reviewed). The expert group included Luccioni and Gamazaychikov (Jegham's co-authors) and D. Schien [S20][S21] | 23 Jun 2026 | See the numbered list below | P (report); estimates are model-based | **High relevance.** Its per-video energy is a Wan2.1-1.3B extrapolation, which is conservative (high) for commercial services: about 2.6× my Seedance central |
| fal, "Introducing H3 Max by fal" [S11] | 27 Aug 2026 | "post-trained version of MiniMax H3 … optimized for maximum speed"; "generating a 5-second video in under 3 seconds, which is roughly 35x the throughput of the official MiniMax H3 endpoint"; "trained and served entirely on NVIDIA GB200 NVL72 systems"; per chip, GB200 "up to 2x the performance of the previous-generation accelerators" | P (vendor) | M ("throughput" appears to mean speed) |
| fal, "H3 Max: Built with fal Inference and Training" [S19] | 17 Sep 2026 | Multi-node inference on GB200 "because a model of this size does not fit comfortably on one node"; "We ported H3 from sglang to Falcon" (fal's engine); training run of about 1 week to 10 days on GB200 NVL72; example cold start: 26 s to acquire a B200, 496 s of setup | P (vendor) | M |
| WSJ via The Decoder (and Reuters/Straits Times; Tom's Hardware, W.Media and Tech in Asia headlines) [S17] | 12–13 Mar 2026 | About 500 Blackwell systems (about 36,000 B200) with Aolani Cloud in Malaysia, more than $2.5B; H100 leases since Feb 2025; for R&D and global customers | S (WSJ reporting) | M; key for the hardware choice (§3.3) |
| TechCrunch, "Why OpenAI really shut down Sora" (citing WSJ) [S22] | 29 Mar 2026 | Sora "burning through roughly $1 million every day"; users peaked at about 1M, then fell below 500k. The Sora 2 API shut down on 24 Sep 2026 (B) | S | Context: video serving cost. No per-video energy |
| CNET, "Your AI Videos Use Way More Energy Than Chatbots" [S23] | 24 Oct 2025 | Popular write-up of Delavande: "approximately 90 Watt-hours" per video, 30× image and 2,000× text; H100 SXM | S | L (no new data) |
| G-TRACE, arXiv 2511.04776 [S24] | Nov 2025 (revised 2026) | A region-aware GenAI carbon framework. The video claim is secondary: "inference costs approaching twenty times those of image synthesis (U.S. GAO, 2025)" | P (paper), S (video figure) | L |
| Li, Jiang & Tiwari, "Carbon in Motion: Characterizing Open-Sora on the Sustainability of Generative AI for Video Generation" [S25] | Dec 2024 | ACM SIGEnergy Energy Informatics Review 4(5):160–165, DOI 10.1145/3727200.3727224. Abstract: the "iterative diffusion denoising process [is] the primary source of carbon emissions"; footprint "largely dictated by denoising step number, video resolution, and duration"; proposes "carbon-aware credit systems" and offline generation during high-carbon periods | P (metadata/abstract via Crossref) | Full text is behind ACM's Cloudflare wall (403); figures not retrieved. Delavande's summary in A1 still applies |
| Papers citing Delavande 2509.19222 (Semantic Scholar, 25 Sep 2026) [S26] | 2025–26 | 4 citations: Jegham 2607.04553; "Is Your Request Worthy Enough?" (21 Jul 2026, not retrieved); "The Global Landscape of Environmental AI Regulation" (arXiv 2603.00068; about reasoning and search, not video); "Energy Scaling Laws for Diffusion Models" (arXiv 2511.17031; images only). **Jegham 2607.04553 has 0 citations** | P (index) | No new commercial-API video measurements. An arXiv abstract search found none either |
| Luccioni et al., "From Cradle to Cloud: A Life Cycle Review of AI's Environmental Footprint" (arXiv 2605.05416) | 6 May 2026 | Literature review; the abstract does not mention video | P | L |
| Google 2026 Environmental Report (first-pass PDF) | 2026 | Per-prompt figures cover only the median Gemini Apps *text* prompt. **No video or Veo energy** (checked by text search) | P | Confirms there is no first-party video disclosure |
| **ByteDance / MiniMax statements on inference energy, GPU-seconds or serving hardware** | — | **None found.** The Seedance 2.0 report gives no compute (§5). The Carbon Trust asked "all the leading model developers" and got "no substantive responses". MiniMax gives no hardware for its official API | — | Gap |

**Carbon Trust / DIMPACT report — key numbers** (first row above):

1. **Wan2.1-T2V-1.3B, 5.4 s at 720p, 15 fps, 50 steps:** lifecycle **49–88 g CO₂e per video** on the US grid (410 g/kWh), reported as "around 50–100".
2. **Case-study cloud assumption:** **381 Wh GPU** and **494 Wh total** (other IT plus PUE 1.1) per **8-s 720p, 24 fps** video, and 1,847 / 2,391 Wh at 1080p. These come from Delavande's prediction model. Training uplift is 0.1–1.0× inference; embodied carbon is 5% on the US grid.
   - DERIVED: 381 / 8 = **47.6 Wh/s GPU**, and 494 / 8 = 61.8 Wh/s total.
   - ⚠ Its Appendix 3 factor of 0.017 kg CO₂e/s (720p inference, US) implies 0.017 / 0.41 = 41.5 Wh/s. I could not reconcile this with 61.8 Wh/s.
3. **Case study (a streaming-series VFX scene, 53 s, 2160p final):**
   - Generative-FX base case: **2,137 videos** (687 cloud + 1,450 local on workstations, all at 720p, with 87 upscales). High-iteration case: 6,411 videos (the text also says 6,525).
   - Emissions: about **900–2,100 kg CO₂e** (base) and about 2,000–5,500 kg (high-iteration), versus traditional VFX at **8,500–25,000 kg** (66,145–201,248 workstation hours; 16,791–51,087 kWh).
   - Local workstation electricity for generative FX: 794 kWh (base) and 2,381 kWh (high).
   - Training accounts for 12% of scene emissions nominally, rising to 57% at the high end.
   - Caveats: "not indicative of all scenarios"; UK production plus US cloud at 1080p would be "not significantly different".
4. **Coca-Cola 2025 holiday ad:** "70,000 AI-generated video clips". Ketan Joshi (2026) estimated **70 MWh and 27 t CO₂e**; the Carbon Trust's alternative is **2.6 t** (90 Wh per clip × 70,000 × 0.410).
5. "We asked all the leading model developers to share data / methodology and received no substantive responses."

### 4.2 Outlets the first pass could not survey

Discovery used Google News RSS: about 30 queries, 25 Sep 2026.

- **Dedicated AI-video-energy pieces found: none** from The Verge, Wired, the Guardian, Bloomberg, the FT, SemiAnalysis or Epoch AI.
- **Nearest items, found but not read** (titles and dates only; I do not characterize their content):
  - The Verge, "Why OpenAI killed Sora" (28 Mar 2026)
  - The Verge, "OpenAI just gave up Sora and its billion-dollar Disney deal" (24 Mar 2026)
  - Guardian, "The environmental cost of datacentres is rising. Is it time to quit AI?" (13 Mar 2026)
  - FT, "ByteDance's big bet on AI" (29 Jul 2026)
  - FT, "Just how much power will AI need?" (23 Sep 2026)
  - Forbes, "Upset About AI Energy Use For Text? What About Video Generation?" (27 Oct 2025)
  - Forbes, "Here's How Much Cash OpenAI Is Burning On AI Video App Sora" (10 Nov 2025)
  - The Conversation, "OpenAI's newly launched Sora 2 makes AI's environmental impact impossible to ignore" (9 Oct 2025)
  - The Tech Buzz, "ByteDance's Seedance 2.0 Hits Compute Wall, Copyright Crisis" (5 Mar 2026)
  - Hackernoon, "One Day of AI Video Generation Undid a Forest's Work" (22 Jul 2026)
  - UNU/UN News report on AI's water, land and CO₂ costs (3–4 Jun 2026)
- **Epoch AI:** the site's sitemaps and energy topic page list no video-generation energy piece. The only related item is "How much energy does ChatGPT use?", which is text-only (A1).
- **SemiAnalysis:** RSS hits were GPU-cloud and LLM pieces, including the "H100 1 Year Rental Price Index" (1 Apr 2026), which could anchor $/GPU-h. None concerned video.
- Jegham et al. 2026 itself got **no news coverage** that I could find.

### 4.3 Factorial Funds Sora estimate (M. Plappert, Mar 2024): still unverified

**What failed:**
- factorialfunds.com returns 404; its sitemap has no blog.
- web.archive.org is blocked; archive.ph and archive.is time out; arquivo.pt returns 404; the Memento aggregator does not respond.
- The author's site (matthiasplappert.com) has no copy.
- TweakTown and Windows Report return 403.

**What survives:**
1. **Hacker News thread 39766776** (20 Mar 2024, 23 comments) [S27]. A commenter quotes the article: "*Total Nvidia H100 needed to support the creator community on TikTok & YouTube: 10.7M / 120 ≈ 89k*".
2. **Headlines via Google News RSS:**
   - TweakTown (26 Mar 2024): "OpenAI Sora video tool large-scale deployment uses 720,000 NVIDIA H100 GPUs worth $21.6 billion" (DERIVED: $30k per H100).
   - Windows Report (3 Apr 2024): "Sora AI would need over 750k Nvidia H100 GPUs to rival TikTok & YouTube".

**Interpretation (DERIVED, L; my reading of an unseen formula):**
- If "120" is minutes of video per H100 per day, one H100 makes 5 min of video per hour.
- That is 3,600 s ÷ 300 s = **12 H100-seconds per output second**, or 12 × 630 W ÷ 3,600 = **≈2.1 Wh/s GPU-only** for 2024-era Sora.
- This is not usable for the calculator without the original assumptions.

---

## 5. Seedance 2.0 technical report (arXiv 2604.14148 v1, 15 Apr 2026, 26 pp.)

I read the full PDF text. Only v1 exists.

**Stated:**
- **Model:** "a new native multi-modal audio-video generation model, officially released in China in early February 2026". Model ID `doubao-seedance-2-0-260128`.
- **Architecture:** "adopts a unified, highly efficient, and large-scale architecture for multi-modal audio-video joint generation".
- **Inputs:** four input modalities (text, image, audio, video). Up to 3 video clips, 9 images and 3 audio clips as references.
- **Outputs:** 4–15 s of audio-video with "native output resolutions of 480p and 720p". Audio is "binaural", with multi-track output.
- **Fast variant:** "we provide Seedance 2.0 Fast version, an accelerated variant of Seedance 2.0 designed to boost generation speed for low-latency scenarios". No speed-up factor is given.
- **Scale:** the Seedance stack is "widely integrated into our large-scale product ecosystem, supporting video generation services for billion-level daily active users".
- **Evaluation:** SeedVideoBench 2.0 (expert ratings) plus Arena.AI. Dreamina Seedance 2.0 720p was #1 on text-to-video (Elo 1450 ± 15) and image-to-video (1449 ± 11) as of 8 Apr 2026. It covers 20 of 22 multimodal input combinations. Extension quality trails Veo 3.1.
- **Production claim:** "By replacing complex visual effects production and live-action shooting workflows with AI generation, Seedance 2.0 can significantly reduce production costs and shorten the production cycle." No quantification is given.

**Not stated anywhere:** parameter count, layer or width details, VAE compression, step or NFE counts, distillation, attention sparsity, quantization, serving hardware, GPU count, or inference time. A text search for "param*", "GPU", "H100/H800/H20/L20", "NFE", "step", "distill", "FLOP", "latency" and "inference" found only the lines quoted above.

**Lineage for comparison:**
- **Seedance 1.5 Pro report** (arXiv 2512.13507; 11 pp.; read this pass). A "multi-stage distillation framework … to substantially reduce the Number of Function Evaluations" plus quantization and parallelism gave "end-to-end acceleration exceeding 10×"; training speed improved "nearly 3×". It gives **no parameter count**.
  - OpenRouter's catalogue describes 1.5 Pro as a "**4.5B parameter** Dual-Branch Diffusion Transformer". That is S, unverified: the figure does not appear in ByteDance's paper.
- **Seedance 1.0:** 41.4 s for 5 s at 1080p on "NVIDIA-L20" (A1).
- **Seedance 2.5** (official blog and page, re-read): 30-s single pass with multi-round extension, and timestamp-level editing. It gives no compute, speed or efficiency data.

---

## 6. Gaps

1. **GPU count per request and serving hardware for Seedance 2.x and official H3.** This is the dominant unknown: a ×4 swing is possible (§3.4). No vendor statement exists. The Johor fleet evidence is indirect (WSJ).
2. **Queue-free inference time for Seedance 2.x.** The only queue-free timing field on any aggregator is fal's DiT timing, and it exists only for fal-hosted models. A controlled measurement would give a much tighter number: 3–5 sequential BytePlus calls per configuration at off-peak times, repeated on several days, with a direct enterprise key.
3. **Resolution and duration scaling for Seedance 2.5.** No 480p, 1080p, 15-s or 30-s latencies were found. The price ratio (1080p/720p = 2.46× per second) versus α = 0.7 (1.76×) is unresolved.
4. **Audio on vs off.** No off/on pair exists for 2.x, and BytePlus does not discount audio-off for 2.x.
5. **User timing reports** (Reddit, X, YouTube) could not be accessed from this environment (403s or no search).
6. **Artificial Analysis generation time** for Seedance and H3 is not public in the free comparison. It may exist behind AA's data product.
7. **Primary text of Li et al. 2024** (ACM 403) and the **Factorial Funds** article (404; archives blocked).
8. **H20 and L20 TDPs** remain unverified from NVIDIA (400 W and 275 W are commonly reported). GB200 per-GPU power (about 1.2 kW) is also unverified.
9. **Price/margin cross-check inputs.** Margins are secondary and blended (Seedance about 70% per LatePost vs "up to 90%" per 36Kr; MiniMax 69.4% across all API products). $/GPU-h for ByteDance and MiniMax is my assumption.
10. **Carbon Trust internal inconsistency:** 494 Wh per 8-s video versus the 0.017 kg CO₂e/s emission factor (§4.1). This needs a query to the authors if the tool cites it.

---

## 7. Sources

All accessed 25 Sep 2026 unless noted. P = primary, S = secondary.

**Latency data**

- [S1] OpenRouter model-benchmark ("arena explore") API, one call per model. The OpenRouter-generated output MP4s are timestamped 26 and 31 Aug 2026 (3 Sep for H3 Max). Base URL `https://openrouter.ai/api/frontend/v1/arena/explore/models/<permaslug>?tab=video`, with these permaslugs:
  - `bytedance/seedance-2.5-20260807`
  - `bytedance/seedance-2.0-20260414`
  - `bytedance/seedance-2.0-fast-20260414`
  - `bytedance/seedance-2.0-mini-20260811`
  - `bytedance/seedance-1-5-pro-20260320`
  - `minimax/hailuo-03-20260730`
  - `minimax/hailuo-3-max-20260901`
  - `google/veo-3.1-20260320`
  - `openai/sora-2-pro-20260320`
  - `runway/gen-4.5-20260729`

  (P, platform measurement)
- [S2] OpenRouter model pages and examples. https://openrouter.ai/bytedance/seedance-2.5 ; `https://openrouter.ai/api/frontend/v1/model-examples?modality=video&permaslug=<permaslug>` (P)
- [S3] OpenRouter latency percentiles. `https://openrouter.ai/api/frontend/v1/stats/latency-e2e-comparison?percentileLines=true&perfWorkload=video_generation&permaslug=<permaslug>&timeRange=1w&variant=standard` (P)
- [S4] OpenRouter model activity (requests, output seconds, spend). `https://openrouter.ai/api/frontend/v1/stats/model-activity?permaslug=<permaslug>&variant=standard` (P)
- [S5] WaveSpeedAI model pages, whose embedded example results include `timings.inference` and `execution_time`. Base URL `https://wavespeed.ai/models/bytedance/<path>`, with these paths:
  - `seedance-2.5/text-to-video`
  - `seedance-2.5/image-to-video`
  - `seedance-2.5/text-to-video-turbo`
  - `seedance-2.5/image-to-video-turbo`
  - `seedance-2.5/video-extend`
  - `seedance-2.5/video-edit`
  - `seedance-2.0/text-to-video`
  - `seedance-2.0/image-to-video`
  - `seedance-2.0-fast/text-to-video`
  - `seedance-2.0-fast/image-to-video`
  - `seedance-2.0-mini/text-to-video`
  - `seedance-2.0-mini/image-to-video`

  (P, reseller)
- [S6] Replicate model pages and embedded example predictions (metrics and logs):
  - Seedance: https://replicate.com/bytedance/seedance-2.5 (and /examples), /bytedance/seedance-2.0-mini, /seedance-1.5-pro, /seedance-1-pro, /seedance-1-pro-fast
  - MiniMax: https://replicate.com/minimax/h3, /hailuo-2.3, /hailuo-2.3-fast, /hailuo-02
  - https://replicate.com/minimax/h3-max returns 404

  (P)
- [S7] Replicate examples: https://replicate.com/bytedance/seedance-2.0/examples ; https://replicate.com/bytedance/seedance-2.0-fast/examples (P)
- [S8] WaveSpeedAI, MiniMax H3 official-API proxy: https://wavespeed.ai/models/minimax/h3/text-to-video ; /image-to-video (P, reseller)
- [S9] WaveSpeedAI, H3 open weights on WaveSpeed infrastructure: https://wavespeed.ai/models/wavespeed-ai/minimax-h3/text-to-video ; /image-to-video ; /reference-to-video ; /video-extend ; also /wavespeed-ai/minimax-h3-singularity/… (P, host)
- [S10] fal model pages. https://fal.ai/models/minimax/h3-max/text-to-video and /image-to-video (example `timings.inference`; schema: "'inference' is the DiT denoising time on the GPU backend"; `provider_type: fal`). https://fal.ai/models/minimax/h3/text-to-video and https://fal.ai/models/bytedance/seedance-2.5/text-to-video (`provider_type: partner`) (P)
- [S11] fal, "Introducing H3 Max by fal", 27 Aug 2026. https://blog.fal.ai/introducing-h3-max-by-fal/ (P, vendor; includes the Design Arena quote, S)
- [S12] Artificial Analysis, video model and provider comparisons and methodology text. https://artificialanalysis.ai/video/models ; https://artificialanalysis.ai/video/providers ; https://artificialanalysis.ai/video/leaderboard/text-to-video (P)
- [S13] BytePlus ModelArk docs:
  - Seedance 2.5 tutorial, rate-limits section: https://docs.byteplus.com/en/docs/ModelArk/2607688
  - Model list: https://docs.byteplus.com/en/docs/ModelArk/1330310
  - Video Generation API (`priority`, `execution_expires_after`): https://docs.byteplus.com/en/docs/ModelArk/1520757

  (P)
- [S14] fal Learn, "MiniMax H3 Max vs. Seedance 2.5: Head-To-Head [2026]", J. Ozuysal, 15 Sep 2026. https://fal.ai/learn/devs/minimax-h3-max-vs-seedance-2-5 (P, vendor)
- [S15] Hacker News comment by user "echelon", 22 Aug 2026 (item 49400973, story 49399941), via https://hn.algolia.com/api (S, anecdote)

**Hardware and serving context**

- [S16] BytePlus, Region availability (Johor ap-southeast-1; Dublin eu-west-1), updated 10 Sep 2026. https://docs.byteplus.com/en/docs/ModelArk/2191806 (P; via A2)
- [S17] M. Schreiner, "Bytedance secures access to Nvidia Blackwell cluster in Malaysia, circumventing US export ban on China", The Decoder, 13 Mar 2026, summarizing WSJ, 12 Mar 2026. https://the-decoder.com/bytedance-secures-access-to-nvidia-blackwell-cluster-in-malaysia-circumventing-us-export-ban-on-china/ ; Reuters via The Straits Times: https://www.straitstimes.com/business/companies-markets/chinas-bytedance-gets-access-to-top-nvidia-ai-chips-wsj-reports (S)
- [S18] Jegham, Gamazaychikov & Luccioni, "Lights, Camera, Carbon", arXiv 2607.04553 v1, 5 Jul 2026, Appendix E (method: minimum of 3 fal runs; Seedance on DGX H800 "reflecting GPU export restrictions"). https://arxiv.org/abs/2607.04553 (P)
- [S19] A. Matthews, "H3 Max: Built with fal Inference and Training", fal blog, 17 Sep 2026. https://blog.fal.ai/h3-max-built-with-fal-inference-and-training/ (P, vendor)

**Literature and coverage**

- [S20] Carbon Trust, "The carbon impact of AI video generation" (report, June 2026; commissioned by DIMPACT). Landing page: https://www.carbontrust.com/our-work-and-impact/guides-reports-and-tools/the-carbon-impact-of-ai-video-generation ; PDF: https://www.carbontrust.com/sites/default/files/documents/resource/public/The%20carbon%20impact%20of%20AI%20video%20generation_The%20Carbon%20Trust%20and%20DIMPACT.pdf (P)
- [S21] Carbon Trust news release, "New report explores path to better understand and manage AI video emissions", 23 Jun 2026. https://www.carbontrust.com/news-and-insights/news/new-report-explores-path-to-better-understand-and-manage-ai-video-emissions (P)
- [S22] TechCrunch, "Why OpenAI really shut down Sora", 29 Mar 2026 (citing WSJ). https://techcrunch.com/2026/03/29/why-openai-really-shut-down-sora/ (S)
- [S23] K. Chedraoui, "Your AI Videos Use Way More Energy Than Chatbots. It's a Big Problem", CNET, 24 Oct 2025. https://www.cnet.com/tech/services-and-software/your-ai-videos-use-way-more-energy-than-chatbots-its-a-big-problem/ (S)
- [S24] "Quantifying the Climate Risk of Generative AI: Region-Aware Carbon Accounting with G-TRACE and the AI Sustainability Pyramid", arXiv 2511.04776. https://arxiv.org/abs/2511.04776 (P paper; its video figure is S)
- [S25] Li, Jiang & Tiwari, "Carbon in Motion: Characterizing Open-Sora on the Sustainability of Generative AI for Video Generation", ACM SIGEnergy Energy Informatics Review 4(5):160–165, Dec 2024. https://doi.org/10.1145/3727200.3727224. Metadata and abstract via https://api.crossref.org/works/10.1145/3727200.3727224 ; full text blocked (403) (P, abstract only)
- [S26] Semantic Scholar Graph API, citations of arXiv:2509.19222 and arXiv:2607.04553. https://api.semanticscholar.org/graph/v1/paper/arXiv:2509.19222/citations (P, index)
- [S27] Hacker News, "How OpenAI's Sora Model Works" (Factorial Funds), item 39766776, 20 Mar 2024. https://news.ycombinator.com/item?id=39766776 . Headlines via Google News RSS: TweakTown (26 Mar 2024) and Windows Report (3 Apr 2024); both sites returned 403 (S)
- [S28] ByteDance Seed, "Seedance 2.0: Advancing Video Generation for World Complexity", arXiv 2604.14148 v1, 15 Apr 2026. https://arxiv.org/abs/2604.14148 (P)
- [S29] ByteDance Seed, "Seedance 1.5 pro: A Native Audio-Visual Joint Generation Foundation Model", arXiv 2512.13507. https://arxiv.org/abs/2512.13507 (P)
- [S30] ByteDance Seed, Seedance 2.5 page and launch blog. https://seed.bytedance.com/en/seedance2_5 ; https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5 (P)
- [S31] OpenRouter video-models catalogue (Seedance 1.5 Pro "4.5B parameter" description). https://openrouter.ai/api/v1/videos/models (S for the parameter claim)

**From other streams (not re-fetched):** A1 (SGLang H3, Jegham tables, Seedance 1.0 L20 figure); A2 (BytePlus regions, MiniMax suppliers and asset-light model, grid factors); B (prices, LatePost/36Kr margins, MiniMax prospectus margins, RunPod/Lambda GPU prices).

**Search methods this pass.** WebSearch was exhausted and Bing was degraded, so I used:
- Google News RSS (discovery)
- the arXiv HTML search and author feeds
- the Crossref, Semantic Scholar and HN Algolia APIs
- OpenRouter frontend APIs
- headless Chromium

Blocked: web.archive.org, ACM DL, Reddit, TweakTown and Windows Report (403), and DuckDuckGo (CAPTCHA). The Google News article links could not be resolved.
