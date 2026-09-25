# Stream F: Local generation (MacBook Pro M4 Max, RTX desktops) and guided platforms (Krea and peers)

Research date: 2026-09-25. Research only; nothing here has been built into the tool yet.

**How to read this file.** Each number is labelled with its type:
- **[M]** measured by the source
- **[V]** a vendor or platform claim
- **[D]** derived by me (Stream F) from the cited inputs, with the arithmetic shown
- **[A]** an assumption or placeholder that the tool should expose as a user-adjustable parameter

"GPU-only" means the accelerator's energy alone, with no host CPU or DRAM, idle capacity or facility (PUE) overhead. Raw working files (downloaded PDFs, READMEs, chart images, `model.py`, `workflow.py`, `notes_F.md`) are in `scratchpad/research/F/`.

**Process limit.** Partway through the stream, the session's shared WebSearch budget (200 calls) ran out. After that, all evidence came from fetching known URLs directly: vendor pages, GitHub raw files, Hugging Face Hub, arXiv, CEC, Apple, EIA and IPCC. Reddit, MacRumors, Freepik and NREL returned 403 or were blocked by policy, and adobe.com timed out. Community benchmarks for the M4 Max are therefore thinner than I wanted. Section 4 lists the gaps this caused.

---

## 1. Summary of key findings

1. **Per unit of compute, the M4 Max is less energy-efficient than an RTX 4090, 5090 or data-center GPU for diffusion work.** Diffusion is compute-bound. A 2026 preprint measured the M4 Max's sustained FP16 matrix-multiply ceiling at about 14.8 TFLOP/s, with a GPU rail draw of about 42–48 W. A 16-inch M4 Max draws about 110 W at the wall under this kind of load [D; range 90–130 W]. The same FLUX.1-dev image (1024², 20 steps) costs:
   - about **3 Wh on a 16-inch M4 Max** (range 2.1–4.3) [D]
   - about **1.3 Wh on an RTX 4090 desktop** (1.1–1.6) [D from measured it/s and GPU watts]
   - about **1.5 Wh on an RTX 5090 desktop** (1.3–1.8) [D]
   - about **0.9 Wh GPU-only on an H100**, or 1.15–1.5 Wh with facility overhead [M, ML.ENERGY; overhead multiplier A]

   **The M5 Max changes this.** Draw Things measured it at more than 3.3× the M4 Max's speed for image generation [V]. That brings it to roughly parity with a 4090 per image.
2. **The saving from local generation comes from what it replaces, not from local efficiency.** An image keyframe costs roughly 0.3–3 Wh, while one cloud video generation costs tens to hundreds of Wh. Other streams estimate Seedance-class 5–10 s clips at 57–137 Wh GPU-only (Jegham et al. 2026, via Stream A). A local keyframe therefore pays for itself only if it avoids at least a small fraction of one cloud reroll. Heavy local image models erase the advantage: FLUX.2-dev at 28 steps costs about 16 Wh per image on an M4 Max [D].
3. **Local video on a Mac is practical only with distilled models, and the quality is well below Seedance.**
   - LTX-2.3 22B (distilled, 8+3 steps, 1280×768, 121 frames ≈ 5 s): measured 96–123 s on an M5 Max and 213 s on an M3 Ultra (60-core) [M, Draw Things]. For the M4 Max I estimate about 4–7 min, or about 6–15 Wh [D].
   - Wan 2.2 A14B with a 6-step Lightning LoRA at 448×768, 81 frames: 525 s on an M3 Ultra [M]. For the M4 Max I estimate about 10–11 min, or about 15–25 Wh [D].
   - Full-step Wan 14B at 720p takes hours on a Mac [D].
   - Quality: in the Artificial Analysis arena, Seedance 2.0 720p scores 1210 Elo against 958–975 for LTX-2.3. Voters prefer Seedance about 80% of the time [M/D].
   - RTX 4090 references: Wan2.2-TI2V-5B at 720p for 5 s takes 525–535 s [M], about 66–77 Wh [D]. HunyuanVideo-1.5 at 480p with its step-distilled I2V model takes about 75 s [V], about 10 Wh [D].
4. **Local TTS and music cost very little energy.**
   - TTS, per minute of speech: about 0.01–0.1 Wh for Kokoro-class models (estimated; I found no Mac RTF measurement), about 1 Wh for F5-TTS on a Mac (RTF about 0.7 on an M3 Max [M]), and 1.4–5.8 Wh for Dia or IndexTTS on a 4090 [D from M RTFs].
   - Music, per minute of audio: ACE-Step v1 takes 1.74 s on a 4090 (about 0.23 Wh) and 26 s on an M2 Max [M].
   - Swapping native audio for local TTS saves only what the video model spends on audio. That is **+21–34% of compute for LTX-2** [D from Jegham et al. coefficients]. Prices overstate it: Seedance 1.5 Pro and Veo 3.1 charge 2× for audio.
5. **Generating at a lower resolution and upscaling locally can save a lot, or it can backfire.**
   - Cloud energy rises steeply with resolution:
     - About 4.3–4.5× from 720p to 1080p for full-attention DiTs (Wan, HunyuanVideo-1.5) [D, Jegham scaling law].
     - About 2.1–2.2× for LTX-2 [D].
     - About 1.43× for Jegham's black-box Seedance-1 estimate [M/D].
     - About 2.46× by Seedance 2.5 price [M].
   - A lightweight local upscaler costs under 1 Wh per 5 s clip [D; I found no verified Topaz-on-Mac figures].
   - **A diffusion upscaler such as SeedVR2-3B costs about 125 Wh GPU-only per 5 s at 1080p** [D from the paper's 269 s per 100 frames at 768×1344]. That can exceed the saving.
6. **Draft or preview tiers are the strongest lever that is well documented.** Prices relative to the final tier:
   - Seedance 2.5 Draft mode (480p, then a 1080p final): the draft is billed as a normal 480p video, **18% of the 1080p price** [M].
   - Luma Ray3.x Draft: **20% of 720p and 5% of 1080p** credits. Luma markets it as "5× faster, 5× cheaper" [M/V].
   - Veo 3.1 Fast: 25–30% of Standard; Veo 3.1 Lite: 12.5–20% [M]. Both have Elo within 5 points of Standard (1085 and 1083 against 1088) [M].
   - Runway Gen-4 Turbo: 42% of Gen-4.5 [M].
   - Hailuo 2.3 Fast: 65–70% of Hailuo 2.3; Hailuo 02 at 512p: 30% of 768p [M].

   **Price ratios are not energy ratios.** Jegham's latency-based estimate puts Veo 3 Fast at about 90% of Veo 3's energy, even though it costs 25–30% of the price [M/D; method caveats apply].
7. **Evidence that image-to-video reduces rerolls is thin and indirect.**
   - No platform publishes reroll or acceptance rates by workflow.
   - Seedance 2.0's own blind expert benchmark shows that I2V is **not** more satisfying per clip than T2V. Per-dimension satisfaction (score ≥4) is 39–64% for I2V against 51–68% for T2V, on different prompt sets [M].
   - Practitioners value I2V and references for continuity across shots, which benchmarks don't measure. The creator data Stream C gathered: Air Head (Sora, text-only) about 300:1 footage; a Kalshi ad at about 20–27 generations per kept clip; invideo's rule of thumb of about 3 generations per usable shot; Lost Garden at 2.4 per kept shot; an illustrative bracket of 5–10 takes unprepared against 2–3 prepared.
   - I model the effect of preparation as a 20% / 40% / 60% cut in takes (low / central / high) [A].
8. **Optimized-workflow model (deliverable b).** Per kept 5 s shot against a baseline of unprepared T2V at 1080p with native audio. Each figure is (baseline − optimized energy) ÷ baseline, the same measure as the Saving column in Table 2.11. A negative saving means the optimized workflow uses more energy:

   | Workflow | Low | Central | High |
   |---|---|---|---|
   | Platform draft mode, 1080p final (Scenario A) | −33% to +15% | ~65–70% | ~90% |
   | 480p exploration, 720p final plus local upscale (Scenario B) | −21% to +28% | ~77–81% | ~96% |

   These ranges hold across V = 50–250 Wh per cloud generation. **The draft or low-resolution lever does most of the work. Local keyframes contribute through fewer takes (central 37% alone), but heavy local image use can cancel them.** "Local" matters little in itself: keyframes made in the cloud would yield the same take reduction at similar energy.
9. **Verdict on Krea (deliverable c).**
   - **What Krea hosts:** Seedance (Pro, Pro Fast, 1.5 Pro, 2.0, 2.0 Fast, 2.0 Mini, 2.5) and the Hailuo/MiniMax line (Hailuo, 02, 2.3, 2.3 Fast, H3, H3 Max, H3 Max Turbo), next to cheap exploration tools.
   - **Compute-unit costs:** a realtime image costs about 0.11 compute units (CU), Krea 2 Turbo 2 CU, and a Seedance 2.0 clip about 241 CU [M]. One Seedance 2.0 clip ≈ 2,170 realtime frames ≈ 120 Krea 2 Turbo images in Krea's own price units.
   - **Consistency tools:** style references, moodboards, LoRA training, and Node workflows. The Node Agent shows compute cost per node and re-runs only what sits downstream of an edit [V].
   - **No published evidence** from Krea or anyone else shows that using Krea reduces total compute.
   - **Realtime video is not free:** Krea Realtime 14B runs at 11 fps on one B200 [V], so a minute of streaming costs about **14–17 Wh GPU-only (18–28 Wh with overhead)** [D]. That is roughly ¼–⅓ of one Seedance-class 5 s generation.
   - **Counter-pressures:** agentic multi-model iteration, fan-out workflows, "unlimited relaxed" in-house generations, and continuous realtime canvases.
   - **Bottom line:** Krea and similar guided platforms are likely greener **only if** they are used as a cheap exploration layer that cuts premium video rerolls, and the savings cannot be verified.
10. **Embodied carbon of the laptop is comparable to its operational carbon.**
    - Apple's reports: 14-inch M4 Max (1 TB) **248 kg CO2e**; 16-inch M4 Max (1 TB) **303 kg** (4-year use assumption).
    - Excluding the use phase: about 200 kg (14-inch) and about 230 kg (16-inch).
    - Amortized embodied carbon: **17–29 g CO2e per hour** over general use (4–6 years × 2,000 h), or **50–58 g/h** if only about 1,000 generative hours per year carry the burden.
    - Operational carbon at 110 W on LADWP's 2024 average (505 lb/MWh = 0.229 kg/kWh): about 25 g/h.
    - At a marginal gas unit (0.41–0.49 kg/kWh): 45–54 g/h.
    - On self-consumed rooftop PV (IPCC lifecycle median 41 g/kWh): about 4.5 g/h.
    - Result: about 0.8 g embodied plus about 0.7 g operational (LADWP average) per FLUX-dev image on the 16-inch M4 Max.

---

## 2. Data tables with sources

Source IDs such as [S1] refer to the list in Section 5. Confidence ratings: H = high, M = medium, L = low.

### 2.1 Hardware power draw

| # | Value | What it measures (hardware / conditions) | Source | Date | Prim./Sec. | Conf. |
|---|---|---|---|---|---|---|
| P1 | Off 0.23 W; standby 0.42 W; idle min/avg/max 4.7 / 15.5 / 15.6 W | Wall power (Metrahit Energy), MacBook Pro 16-inch, M4 Max (16-core CPU / 40-core GPU), 48 GB | Notebookcheck review [S1] | 2024-12-08 | P [M] | H |
| P2 | Load avg 125 W; load max 143.7 W ("~144 W then ~120 W"); Cyberpunk 2077 ultra 116.2 W (111.7–119.1); with external monitor 107.2 W | Same device; limited by the 140 W adapter; no battery drain | [S1] | 2024-12-08 | P [M] | H |
| P3 | CPU package 57 W brief, then ~50 W (Auto); 57–59 W sustained (High Power); single-core 6.2–6.5 W | Same device, Cinebench | [S1] | 2024-12-08 | P [M] | H |
| P4 | GPU max 75 W; "in lots of tests, a maximum of 60 W"; combined CPU+GPU stress settles at ~28 W + ~28 W (~56 W) because of cooling | Same device | [S1] | 2024-12-08 | P [M] | H |
| P5 | M4 Pro 16-inch: load avg 76.4 W, max 138.1 W, Cyberpunk 83.4 W, idle 4.6/16.8/17.1 W. M3 Max 16-inch (2023, 40-core GPU): load avg 90.5 W, max 145.2 W, idle 5.2/16.9/17.2 W | Notebookcheck comparison table, wall power | [S1] | 2024-12-08 | P [M] | H |
| P6 | Idle with display on (ENERGY STAR conditions, 115 V): 14-inch M4 3.91 W; 14-inch M4 Pro 4.07 W; 16-inch M4 Pro 6.53 W; **16-inch M4 Max 7.47 W**. Sleep 0.22–0.45 W. Adapter no-load 0.04–0.05 W. Adapter efficiency 91.2% (14-inch) and 87.9% (16-inch) | Apple Product Environmental Reports (the 14-inch report lists no M4 Max row) | [S2][S3] | 2024-10-30 | P [M] | H |
| P7 | 14-inch M4 Max: **96 W** USB-C adapter, 72.4 Wh battery. 16-inch M4 Max: **140 W** adapter, 100 Wh battery | Apple tech specs | [S4][S5] | 2024 | P | H |
| P8 | GPU rail **~42 W** at 100% active residency (IOReport rail 0.27 → 47.6 W); FP16 matmul2d sustained **14.8 TFLOP/s** (≈46% of the ~32 TFLOP/s scalar-ALU roofline); FP8 emulated at 0.94× FP16 | Single M4 Max (enclosure not stated), Metal 4.1 microbenchmarks, macOS 27 beta; CPU and ANE power not metered | RIGEL preprint, arXiv 2606.12765 [S6] | 2026-06 | P [M] (preprint, one author) | M |
| P9 | powermetrics GPU idle-to-load delta **65 W** vs. system DC rise **179 W** (SMC PDTR) → about 2/3 of system power missing from powermetrics | Mac Studio M4 Max, GPU-heavy compute | Apple Developer Forums thread 819927 [S7] | 2026-03 | P (single user, unanswered) | L–M |
| P10 | MacBook Pro 14 M5 Max: GPU 72 W peak / 44 W sustained (High Power), 60/32 W (Auto); CPU 75/52 W; CPU+GPU 96/42 W (High), 84/30 W (Auto); input **capped at ~97 W** even with 140/180 W chargers; **−15% battery in a 1-hour stress test** (72.4 Wh × 15% ≈ 11 W deficit → ≈108 W total draw [D]) | Notebookcheck review and news | [S8][S9] | 2026-03-11 / 2026-03-14 | P [M] | H |
| P11 | MacBook Pro 16 M5 Max: cooling handles ~70 W; CPU 75 → 70 W; GPU 72/38 W (Auto), 72/42 W (High); combined 94/48 W (Auto), 114/70 W (High); battery −12%/h under full load even with larger PSUs | Notebookcheck review | [S10] | 2026-08-27 | P [M] | H |
| P12 | MacBook Pro 16 M5 Pro: max 145 W, then 134 W; up to 147 W with a larger PSU; battery drain up to 40 W | Notebookcheck news | [S9] | 2026-03-14 | P [M] | H |
| P13 | RTX 4090: total graphics power (TGP) 450 W; idle 19 W; video playback 25 W; average gaming 315 W; required system power 850 W. RTX 5090: TGP **575 W**; required system power 1000 W | NVIDIA spec pages | [S11][S12] | fetched 2026-09-25 | P | H |
| P14 | RTX 4090 **290 W** (2.52 GHz / 875 mV) → 10.01 s per image; **400 W** (2.8 GHz / 1000 mV) → 9.07 s | FLUX.1-dev FP8 `--fast`, 1024², 20 steps, ComfyUI | ComfyUI GitHub discussion #4571 (user jepjoo) [S13] | 2024-08-26 | P (community) [M] | M |

**Wall-power assumptions used below [A]:**

| Machine | Low | Central | High | Basis |
|---|---|---|---|---|
| 16-inch M4 Max, sustained GPU diffusion | 90 W | 110 W | 130 W | P2, P4, P8, P9 |
| 14-inch M4 Max | 75 W | 90 W | 100 W | 96 W adapter; P10 cap. Expect about 10–15% longer run times, so energy per image is roughly equal (±15%) [A]. No direct 14-inch M4 Max measurement was found. |
| Binned M4 Max (14-core CPU / 32-core GPU) | — | — | — | About 20% slower on GPU work at somewhat lower power, so similar Wh per image [A]. No measurement found. |
| RTX 4090 desktop | 420 W | 480 W | 520 W | GPU 290–400 W (P14) plus ~120 W for the rest of the system [A] |
| RTX 5090 desktop | 600 W | 650 W | 725 W | [A] |

### 2.2 Image generation speed

| # | Value | Model / settings / hardware | Source | Date | P/S | Conf. |
|---|---|---|---|---|---|---|
| I1 | **M4 Max 128 GB MacBook Pro ~19 s**; M3 Max ~20 s; M2 Ultra <15 s; M2 Max 96 GB ~25 s; M4 Pro 64 GB Mac mini ~34 s | FLUX.1-schnell, non-quantized, 2 steps, 1024², mflux (MLX), wall time **including model load** | mflux README table (PyPI 0.9.6) [S14] | 2025-07-20 | P (community reports) | M |
| I2 | Z-Image Turbo, 8 steps, end-to-end at 1024²: Draw Things (DT) M2 Ultra (76-core) 22.9 s; M3 Ultra (60-core) 28.0 s; **M4 Pro (20-core) 71.0 s**; M5 iPad 55.7 s. mflux 0.13.3: 30 / 31 / 88 s. Per sampling step at 1024²: M4 Pro 8.31 s; M3 Ultra 3.09 s | Draw Things v1.20251207 | Draw Things release post [S15] | 2025-12-09 | P (vendor) [M] | M–H |
| I3 | "Z-Image Turbo … 1.01×–1.23× improvement over FLUX.1 [dev] … per step" | Draw Things | [S15] | 2025-12-09 | V | M |
| I4 | 4-step end-to-end at 1024² (M2 Max 38-core / M3 Ultra 60-core / M4 iPad / M5 iPad): FLUX.1-schnell 36.4 / 20.1 / 141.1 / 33.7 s; Qwen-Image + Lightning 54.9 / 30.0 / 150.1 / 45.2 s; HiDream-I1-fast 50.1 / 27.6 / 168.4 / 47.0 s; SD3.5 Large Turbo 21.4 / 11.8 / 70.8 / 21.0 s | Draw Things MFA v2.5 | [S16] | 2025-11-10 | P (vendor) [M] | M–H |
| I5 | **M5 Max (40-core), end-to-end** at 1024², figures given as base v1.20260323 → with Metal Quantized Attention and 8-bit S. HiDream-I1-dev 28 steps: 83.7 → 55.2 s. Z-Image Turbo 8 steps: 16.6 → 9.4 s. Qwen-Image-2512 BF16 30 steps with CFG: 178.3 → 103.5 s. FLUX.2-dev 28 steps: 227.9 → 137.9 s. FLUX.2-klein 4B, 4 steps: 3.72 → 3.12 s. FLUX.2-klein 9B, 4 steps: 8.05 → 5.24 s. **LTX-2.3 22B, 1280×768×121, 8+3 steps: 123.3 → 95.9 s**. **M3 Ultra (60-core)** on the same tests: 132.8 / 26.9 / 265.3 / 426.6 / 9.12 / 18.0 / 213.3 s | Draw Things "Metal Quantized Attention" | [S17] | 2026-04-01 | P (vendor) [M] | M–H |
| I6 | "M5 Max … more than a 3.3× speed-up over M4 Max". Lightning Draft gives ~≤1 s interactive latency with FLUX.2-klein and Z-Image Turbo on M5 Max. M5 Max FP16 matmul ~60 TFLOPs, ~110 TFLOPs effective with int8 attention | Draw Things | [S17][S18] | 2026-03-24 / 04-01 | V | M |
| I7 | M5 Max: ~1.5 s per step at 1024²; **~78 s for 40 steps** (bf16); diffusers on MPS ~85 s; peak memory ~46 GB | Qwen-Image-2.1 (7.1B + 8B text encoder), mflux | mflux README [S19] | 2026-09 | P [M] | M–H |
| I8 | M4 Max 48 GB: 85 s | FLUX.1-dev FP16, 1024², 30 steps (unattributed) | Apatero blog [S20] | 2025-10 | S | **L** (implies ~28 TFLOP/s, above the P8 ceiling; treated as optimistic) |
| I9 | M4 Pro 24 GB: Draw Things ~50 s; ComfyUI ~50–90 s. DiffusionBee: ~6 min for 704², 25 steps (author's own test) | FLUX.1-dev Q6_K, 1024², 20 steps ("community reports") | bitdoze [S21] | 2026-08-09 | S | L |
| I10 | RTX 5090: 8.78 s (2.38 it/s); 8 s; 5.46 s optimized. **RTX 4090: 11.28 s (1.85 it/s)**. RTX 3090: 26 s. RTX 5080: 16.7 / 10.8 / 6.7 s | FLUX.1-dev FP8, ComfyUI template, 1024², 20 steps | ComfyUI discussion #9002 [S22] | 2025-07 to 2026-02 | P (community) [M] | M |
| I11 | RTX 4090: 7.15 s (3.16 it/s) with Triton and Sage Attention | FLUX.1-dev, 20 steps | ComfyUI #4571 [S13] | 2026-02-22 | P (community) | M |
| I12 | **FLUX.1-dev 1024², 50 steps, batch 1: H100 7,949 J = 2.21 Wh (11.64 s, 683 W avg); B200 1.86 Wh (7.75 s, 861 W)**. SD3.5 Large (28 steps): H100 1.23 Wh, B200 1.01 Wh. SD3.5 Medium: 0.44 Wh. SANA-1.5 1.6B (20 steps): 0.116 Wh. PixArt-Σ: 0.198 Wh | GPU-only energy (NVML), 1 GPU | ML.ENERGY Leaderboard v3.0 data [S23] | data 2026-02-16 | P [M] | H |

**Derived M4 Max (40-core, 16-inch) image times [D]:**
- **Method.** M4 Max time ≈ M3 Ultra (60-core) time × 1.15–1.30. Basis: Notebookcheck found the M4 Max GPU 14–27% faster than the M3 Max (40-core), and the M3 Ultra (60-core) has 1.5× the cores of an M3 Max (40-core).
- **FLUX.1-dev.** I cross-check with FLOPs, using about 74 TFLOP per step for FLUX.1-dev at 1024² and about 14–15 TFLOP/s effective (P8).
- **Results:**
  - FLUX.1-schnell, 4 steps: 23–26 s
  - FLUX.1-dev, 20 steps: **~100 s (85–120)**
  - Z-Image Turbo, 8 steps: ~35 s (31–40)
  - FLUX.2-klein 4B, 4 steps: ~11 s
  - SD3.5 Large Turbo, 4 steps: ~14.5 s
  - Qwen-Image + Lightning, 4 steps: ~37 s
  - HiDream-I1-dev, 28 steps: ~163 s
  - Qwen-Image-2512, 30 steps with CFG: ~325 s
  - FLUX.2-dev, 28 steps: ~520 s
  - SDXL, 30 steps: ~55 s. This one is low confidence, based on a secondary snippet of 75 s on an M3 Max.
- **Cross-check.** The FLUX.1-schnell mflux figure (I1: 2 steps at ~5.3 s each, plus encoders, VAE and load ≈ 19 s) is consistent with these estimates.

### 2.3 Deliverable (a): local energy per asset, with cloud equivalents

Wh = time × wall power. Laptop figures include the display. RTX figures include the whole desktop but not the monitor. Cloud figures are GPU-only unless stated. As a facility overhead multiplier I suggest **1.3–1.7×**. Basis: Google measured active accelerators at 58% of comprehensive energy (0.14 of 0.24 Wh), about 1.7× [S45]. Delavande et al. found the GPU at 80–90% of server energy; add a PUE of 1.1–1.2.

| Asset | 16-inch M4 Max (Wh) [D] low / central / high | RTX 4090 desktop (Wh) [D] | RTX 5090 desktop (Wh) [D] | Cloud equivalent (Wh) | Notes and inputs |
|---|---|---|---|---|---|
| **Image, distilled** (1024²: FLUX.2-klein 4B, 4 steps / Z-Image Turbo, 8 steps) | klein-4B 0.26 / **0.34** / 0.43; Z-Image 0.78 / **1.07** / 1.44 | Z-Image 0.23 / 0.33 / 0.43 (secondary timing 2–3 s) | ≈ 4090 [D] | SANA-1.5 1.6B, 20 steps: 0.116 Wh GPU (H100) [M, I12] | M5 Max Z-Image: 9.4–16.6 s × ~120 W ≈ 0.3–0.55 Wh [D] |
| **Image, FLUX.1-dev class** (1024², 20 steps) | 2.1 / **3.1** / 4.3 | 1.1 / **1.3** / 1.6 | 1.3 / **1.5** / 1.8 | **0.88 GPU-only** (H100: 2.21 Wh × 20/50) → 1.15–1.5 with overhead [M/D]. AI Energy Score mean image-generation 2.9 Wh/image (Stream A) | 4090: measured it/s and GPU watts (P14, I10); 5090: I10 |
| **Image, heavy** (FLUX.2-dev 28 steps / Qwen-2512 30 steps with CFG) | Qwen-2512 7.6 / 9.9 / 12.5; **FLUX.2-dev 12 / 16 / 20** | n/a (not measured) | n/a | n/a | M5 Max: FLUX.2-dev 137.9 s × 120 W ≈ 4.6 Wh; Qwen-2512 ≈ 3.5 Wh [D] |
| **5 s of video** | LTX-2.3 distilled at 1280×768: 6.1 / **9.2** / 14.8. Wan2.2-A14B + Lightning (6 steps) at 448×768: 15 / **20** / 25. Full-step Wan-14B at 720p: impractical, hours and >250 Wh [D, L] | Wan2.2-TI2V-5B, 720p (1280×704×121): 66 / **72** / 77. Wan2.1-1.3B, 480p: 33 / 36 / 38. HunyuanVideo-1.5, 480p, step-distilled I2V: 9.4 / **10.2** / 10.8 | ≈ 4090 per clip (about 1.3× faster at about 1.3× power) [D] | Wan2.1-14B, 480×832×81, 50 steps: **80.3** GPU (H100) [M]. Wan2.1-1.3B: 18.0 [M]. LTX-2 T2V at 1024p, 5 s, 40 steps: **9.1** GPU (B200) [M, Stream A]. Seedance-1 5 s at 720p: **56.6**; Seedance-1.5: **64.6** (estimated black-box, GPU-only; Jegham via Stream A). Krea Realtime 14B: ~2.5–3.0 GPU per 5 s of 480p output [D] | M5 Max LTX-2.3: 96–123 s × 110–130 W ≈ **2.9–4.4 Wh** [D] |
| **1 min of TTS** | Kokoro-82M: 0.01 / **0.04** / 0.09 (real-time factor (RTF) 0.01–0.05 is assumed; no Mac measurement found). F5-TTS (MLX): 0.9 / **1.3** / 1.6 (M3 Max RTF ≈ 0.70 [M]) | IndexTTS 2.5: 1.4 / 1.65 / 1.9 (RTF 0.2 [M]). Dia 1.6B: 3.4 / 4.5 / 5.8 (RTF 0.48–0.67 [M]) | ≈ 4090 | F5-TTS with TensorRT-LLM on an L20: RTF 0.04 → ~0.18 GPU single-stream [D]. Fish S2 Pro on an H200: RTF 0.195 → ≤2.3 single-stream [D], much lower when batched. **ElevenLabs discloses no energy figure** | Kokoro API market price <$1 per million characters; ElevenLabs $0.05–0.10 per minute [M] |
| **1 min of music** | ACE-Step v1, 27 steps: 0.40 / **0.52** / 0.67 (M2 Max measured 26.4 s per minute, scaled × 0.6–0.7) | ACE-Step v1: **0.23** (27 steps, 1.74 s); **0.51** (60 steps, 3.84 s) [M times] | ≈ 4090 | ACE-Step 1.5: "<2 s per full song on A100" → <0.22 GPU per song [D]. **Suno, Udio and ElevenLabs Music disclose nothing** | ElevenLabs Music $0.15 per minute [M] |
| **1 min of footage upscaled** (720p → 1080p) | Lightweight upscaler (Topaz- or Real-ESRGAN-class; 5–20 fps is assumed): 1.8 / **4.4** / 10.4 | Similar order (unverified) | similar | FlashVSR at 768×1408 on an A100 (17 fps [M]): ~9 GPU per minute [D]. **SeedVR2-3B at 1080p: ~1,500 GPU per minute (~125 per 5 s)** [D from I-U2] | Per minute of processing time: M4 Max 16-inch ≈ 1.5–2.2 Wh; 14-inch ≈ 1.25–1.7; 4090 box ≈ 7–8.7; 5090 box ≈ 10–12; B200 ≈ 14–17 GPU-only |

### 2.4 Local video generation: measured inputs

| # | Value | Settings / hardware | Source | Date | P/S | Conf. |
|---|---|---|---|---|---|---|
| V1 | **Wan2.2 TI2V-5B, 720p (1280×704, 121 frames, 24 fps): 1× RTX 4090: 534.7 s T2V / 524.8 s I2V**, peak 22.9 GB (with `--offload_model True --convert_model_dtype --t5_cpu`). A14B on 1× H100: 480p 326.9 s, 720p 1041.5 s (T2V). A14B on 1× A100: 785.7 s / 2735.7 s. README: "5-second 720P video in under 9 minutes on a single consumer-grade GPU" | Official efficiency table | Wan2.2 GitHub [S24] | 2025-07 (fetched 2026-09) | P [M] | H |
| V2 | **Wan2.1 T2V-1.3B at 480p on 1× RTX 4090: 261.4 s**, 8.19 GB. T2V-14B at 720p on 1× H100: 1837.9 s. I2V-14B at 720p on 1× H100: 1491.6 s | Official efficiency table | Wan2.1 GitHub [S25] | 2025-02 | P [M] | H |
| V3 | "a single RTX 4090 can generate videos within **75 seconds**" (−75% end-to-end); minimum 14 GB with offload; CFG-distilled model ~2× faster; sparse attention 1.5–2× (H-series GPUs) | HunyuanVideo-1.5 480p I2V step-distilled model, 8 or 12 steps | HunyuanVideo-1.5 GitHub [S26] | 2025-12-05 | V | M–H |
| V4 | **LTX-2.3 22B, 1280×768×121 (≈5 s at 24 fps), 8+3 steps: M5 Max 95.9–123.3 s; M3 Ultra 213.3 s**. 720p variant on M5 Max: 122.7–135.5 s. mlx-video on M5 Max: 137.5 s | Draw Things | [S17][S18] | 2026-03/04 | P (vendor) [M] | M–H |
| V5 | **Wan 2.2 A14B with Lightning LoRA, 6 steps, 448×768, 81 frames: M3 Ultra 524.59 s; M5 iPad 1166.62 s** | Draw Things MFA v2.5 | [S16] | 2025-11-10 | P (vendor) [M] | M–H |
| V6 | M4 Max estimates: **LTX-2.3 245–410 s (central ~300 s)**; **Wan2.2 A14B + Lightning 600–680 s**. The low end comes from M3 Ultra × 1.15–1.3; the high end from M5 Max × 3.3 (I6) | Derived | — | — | [D] | L–M |
| V7 | Seedance 2.0 720p **Elo 1210**; LTX-2.3 Fast/Pro 975/958; LTX-2.5 Fast/Pro 1055/1053 (open weights, Aug 2026); LTX-2 924/905; Veo 3.1 1088, Fast 1085, Lite 1083; **MiniMax H3 1220 (open weights; 33B dense; README examples run on 4 GPUs)**; Wan 3.0 1229; Gemini Omni Flash 1233 (#1); Seedance 1.5 pro 1000. Seedance 2.5 not listed | Artificial Analysis text-to-video arena (crowd preference votes) | [S27] | fetched 2026-09-25 | P [M] | M–H |
| V8 | Elo gap 235–252 (Seedance 2.0 vs LTX-2.3) → expected win rate ≈ 0.80. Gap 155 (vs LTX-2.5 Fast) → ≈ 0.71 | Elo formula 1/(1+10^(−Δ/400)) | — | — | [D] | M |

**Is local video on a Mac practical? [D]**
- **For previsualization, animatics and motion tests, yes**, with distilled models: LTX-2.x takes about 4–7 min per 5 s clip on an M4 Max and about 1.5–2 min on an M5 Max; Wan with Lightning takes about 10–11 min.
- **As a replacement for Seedance, no.** The quality gap is about 250 Elo, it lacks joint audio at Seedance quality, and 720p-plus runs with full-step 14B models take hours.
- **The RTX 4090 and 5090 are 3–6× faster** and use about the same or more energy per clip.
- **Energy per local clip (6–25 Wh on an M4 Max) is below the estimated 57–137 Wh GPU-only for a Seedance-class generation.** But the comparison is not like-for-like, because the resolution, model size and quality all differ.

### 2.5 TTS, music and upscaling: measured inputs

| # | Value | Settings | Source | Date | P/S | Conf. |
|---|---|---|---|---|---|---|
| T1 | Kokoro-82M: v1.0 released 2025-01-27; API market rate **<$1 per million characters** (Replicate $0.65, DeepInfra $0.80); "1000 characters ≈ 1 minute"; trained on ~1,000 A100-hours (~$1,000) | Model card | [S28] | 2025 | P | M–H |
| T2 | Kokoro-FastAPI: **35×–100× real time** (RTX 4060 Ti 16 GB); first token <1 s on CPU (M3 Pro) | Community server README | [S29] | 2025–26 | P (community) | M |
| T3 | F5-TTS MLX: sample of **5.70 s** "generated in ~4 seconds on an M3 Max MacBook Pro" → **RTF ≈ 0.70** [D; sample length measured by me] | f5-tts-mlx README plus sample.wav | [S30] | 2024–25 | P | M |
| T4 | F5-TTS on an L20 GPU, 16 function evaluations: **RTF 0.0394** (Triton/TRT-LLM, concurrency 2); 0.1467 offline PyTorch | F5-TTS README | [S31] | 2025–26 | P [M] | M–H |
| T5 | Dia 1.6B on an RTX 4090: ×2.1 real time (bf16, compiled), ×1.5 without compile; 4.4 GB | nari-labs/dia README | [S32] | 2025 | P [M] | M–H |
| T6 | IndexTTS 2.5 on an RTX 4090: **RTF 0.2065** (bf16); IndexTTS 2.0: 0.3257 (fp16) | index-tts README | [S33] | 2026 | P [M] | M–H |
| T7 | Fish Audio S2 Pro on an H200: RTF 0.195; time to first audio ~100 ms; 3,000+ acoustic tokens/s with RTF <0.5 | fish-speech README | [S34] | 2026 | V | M |
| T8 | Chatterbox-Turbo 350M (one-step decoder); Chatterbox-Nano 110M "3x faster than realtime on 8 CPU cores". VibeVoice-Realtime-0.5B ~300 ms first latency. Qwen3-TTS 97 ms latency. NeuTTS Air: iMac M4 16 GB CPU 111/195 tok/s vs RTX 4090 16,194/19,268 tok/s | READMEs | [S35] | 2025–26 | V | M |
| T9 | ElevenLabs API: **TTS v3 $0.10 per 1K characters (~$0.10/min); Flash/Turbo $0.05**; Music $0.15/min; no energy disclosure | ElevenLabs pricing | [S36] | fetched 2026-09-25 | P | H |
| M1 | **ACE-Step v1 (3.5B), real-time factor (RTF, higher = faster) with time to render 1 min of audio, at 27 / 60 steps, batch 1: RTX 4090 34.48× (1.74 s) / 15.63× (3.84 s); A100 27.27× (2.20 s) / 12.27× (4.89 s); RTX 3090 12.76× (4.70 s) / 6.48× (9.26 s); MacBook M2 Max 2.27× (26.43 s) / 1.03× (58.25 s)** | ACE-Step README | [S37] | 2025 | P [M] | H |
| M2 | ACE-Step 1.5: "under 2 seconds per full song on an A100 and under 10 seconds on an RTX 3090"; <4 GB VRAM; MLX backend on Mac; 10 s–10 min songs; self-assessed "between Suno v4.5 and Suno v5" | ACE-Step-1.5 README | [S38] | 2026 | V | M |
| M3 | Suno Pro $8/mo (annual) for 2,500 credits and 20 downloads; no energy disclosure. Udio pricing page did not render | Suno pricing | [S39] | fetched 2026-09-25 | P | H (price) |
| U1 | **FlashVSR: ~17 fps for 768×1408 on one A100** (one-step streaming ×4 super-resolution; up to ~12× faster than earlier one-step diffusion super-resolution); v1.1 Nov 2025; block-sparse attention validated on A100/A800 | FlashVSR README / paper | [S40] | 2025-10/11 | P [M/V] | M |
| U2 | **SeedVR2-3B: 269.0 s; 7B: 299.4 s per video of 100 × 768 × 1344 frames**; SeedVR-7B (50 steps) 1284.8 s; STAR 2326 s. GPU not stated (trained on H100-80G) | SeedVR2 paper, Table 6 | [S41] | 2025-06 | P [M] | M |
| U3 | Air Head "was done at 480p for speed and then up-res'd using Topaz" | Shy Kids interview | [S42] | 2024-04-14 | S (interview) | M |
| U4 | No verified Topaz Video AI or Real-ESRGAN fps figures on Apple Silicon were found; the Topaz docs URLs returned 404 | — | — | — | gap | — |

### 2.6 Draft, fast and preview tiers, and resolution price ratios

| # | Platform / model | Price per unit | Ratio (cheap ÷ final) | Source | Date | Conf. |
|---|---|---|---|---|---|---|
| D1 | **Seedance 2.5** (BytePlus) 5 s 16:9, no video input | 480p **$0.514**; 720p **$1.156**; 1080p **$2.843**. Rates $10.70/M tokens (480/720p), $11.7/M (1080p); tokens = (input + output duration) × W × H × fps ÷ 1024 | 480p ÷ 1080p = **0.18**; 720p ÷ 1080p = **0.41**; 480p ÷ 720p = 0.44 | BytePlus ModelArk pricing [S43] (fetched by another stream; re-read by me) | 2026-09 | H |
| D2 | **Seedance 2.5 Draft mode** | Step 1: 480p draft only, "billed as a 480p video"; step 2: **1080p-only** final reusing the prompt, seed, references and duration; draft ID valid 7 days | Draft = 0.18 of the final price | BytePlus docs 2607688 [S44] | 2026 | H |
| D3 | Seedance 1.5 Pro | Draft tokens = normal × **0.7 (silent) / 0.6 (with audio)**. Audio doubles the price: $2.4 vs $1.2 per M tokens | 0.6–0.7 | [S43] | 2026 | H |
| D4 | Seedance 2.0 / 2.0 Fast / 2.0 Mini | 5 s: 480p $0.35 / 0.28 / 0.18; 720p $0.76 / 0.60 / 0.38; 1080p $1.87; 4K $3.89 | Fast = 0.8; Mini = 0.5 of 2.0 | [S43] | 2026 | H |
| D5 | **Luma Ray3.14** (credits) | Draft 4 credits/s; 540p 10; 720p 20; 1080p 80 | Draft ÷ 720p = **0.20**; draft ÷ 1080p = **0.05** | Luma pricing [S46] | fetched 2026-09-25 | H |
| D6 | Luma Ray3.2 (credits / API) | Draft 20 credits per 5 s; 720p 100; 1080p 400. API per 5 s: 540p $0.15, 720p $0.30, 1080p $1.20 | 0.2 / 0.05 | [S46][S47] | 2026 | H |
| D7 | Luma claims | "Draft Mode … 5x faster, 5x cheaper"; "up to 10 times faster"; "explore dozens of ideas up to 20x faster"; "Draft Mode preserves the identity, motion, and composition of the draft when moving to the final render"; Ray3 "judges early drafts, and retries until your quality bar is met" (hidden retries) | — | Luma Ray3 page and news [S48][S49] | 2025-09-18 onward | V |
| D8 | **Veo 3.1** (Gemini API, with audio) | Standard $0.40/s (720p/1080p); **Fast $0.10 (720p) / $0.12 (1080p)**; **Lite $0.05 / $0.08** | Fast = 0.25–0.30; Lite = 0.125–0.20. **Elo: 1088 / 1085 / 1083 (V7)** | Google pricing [S50] | fetched 2026-09-25 | H |
| D9 | Runway API ($0.01 per credit) | gen4.5 12 credits/s; **gen4_turbo 5**; act_two 5; aleph2 28; veo3.1 40 with audio / 20 without; veo3.1_fast 15 / 10; gen4_image 5–8 credits; gen4_image_turbo 2 | Turbo = **0.42** of Gen-4.5; audio premium on Veo 3.1 = 1.5–2.0× | Runway dev docs [S51] | fetched 2026-09-25 | H |
| D10 | MiniMax Hailuo (video points) | 768p 6 s: 2.3 Fast 0.7 vs 2.3 or 02 1.0; 1080p 6 s: 1.3 vs 2; Hailuo 02 at 512p 6 s: 0.3 | Fast = 0.65–0.70; 512p ÷ 768p = 0.30 | MiniMax docs (file saved by another stream) [S52] | 2026 | M–H |
| D11 | **Energy (not price)** | Veo 3 Fast 27.6 Wh vs Veo 3 30.8 Wh (8 s, 720p; latency-based black-box estimate) | **≈0.90** | Jegham et al. 2026 (via Stream A notes) [S53] | 2026-07 | M (method assumes the same hardware) |

### 2.7 Embodied carbon and grid

| # | Value | What | Source | Date | P/S | Conf. |
|---|---|---|---|---|---|---|
| E1 | **14-inch MacBook Pro M4 Max 1TB: 248 kg CO2e**. M4 Pro 512GB: 218 kg (production 74%, transport 6%, product use 20%, end of life <1%; business-as-usual baseline 403 kg). M4 512GB: 198 kg | Apple PER, ISO 14040/44/14067, GWP100 (IPCC AR6); **use phase = 4 years for macOS devices**; regional grid mixes | [S2] | 2024-10-30 | P | H |
| E2 | **16-inch MacBook Pro M4 Max 1TB: 303 kg CO2e**. M4 Pro 512GB: 279 kg (production 69%, transport 6%, use 25%, end of life <1%; baseline 506 kg) | Apple PER | [S3] | 2024-10-30 | P | H |
| E3 | MacBook Pro M5 Pro / M5 Max (introduced 2026-03-03). 16-inch: M5 Pro 1TB 280 kg; M5 Max 32-core / 36 GB / 2TB 324 kg; **40-core / 48 GB / 2TB 326 kg**. 14-inch: M5 Pro 212–246 kg; **M5 Max 32-core 261 kg**. Pie chart for the 16-inch M5 Pro: materials 38%, production electricity 22%, renewable-energy emissions 1%, **use 31%**, transport 8% (label order inferred) | Apple PER | [S54] | 2026-03-03 | P | H (totals), M (pie mapping) |
| E4 | Embodied share excluding use for the M4 Max. The reports give no M4 Max breakdown, so I apply the M4 Pro shares, or subtract the M4 Pro's absolute use-phase emissions. Result: **14-inch ≈ 198–204 kg; 16-inch ≈ 227–233 kg** | [D] | — | — | D | M |
| E5 | Amortization. **General use, 4 years × 2,000 h: 25–29 g CO2e/h. 6 years × 2,000 h: 17–19 g/h. Dedicated generative use, 4 years × 1,000 h: 50–58 g/h** | [D, A for hours] | — | — | D | M |
| E6 | **LADWP 2024 Power Content Label: 505 lb CO2e/MWh (0.229 kg/kWh)**. Green LA: 0. CA utility average: 359 lb/MWh (0.163 kg/kWh). LADWP mix: renewables eligible for California's Renewables Portfolio Standard (RPS) 41% (solar 15, wind 14, geothermal 9, eligible hydro 2); nuclear 15%; large hydro 3%; **natural gas 30%; coal and petroleum 11%**; unspecified 0%. Excludes biogenic CO2, geothermal emissions and grandfathered firmed imports | CEC Power Source Disclosure | [S55] | 2025 (2024 data) | P | H |
| E7 | Natural gas 116.65 lb CO2/MMBtu; 2024 average operating heat rate for natural gas 7,754 Btu/kWh → **0.41 kg CO2/kWh** at the stack for an average gas unit [D] | EIA | [S56][S57] | 2024–25 | P | H |
| E8 | Lifecycle g CO2e/kWh (min / median / max): **rooftop PV 26 / 41 / 60**; utility PV 18 / 48 / 180; **gas combined cycle 410 / 490 / 650** (direct 350 / 370 / 490); coal 740 / 820 / 910 | IPCC AR5 WGIII Annex III Table A.III.2 | [S58] | 2014 | P | H (dated) |
| E9 | Operational carbon for 1 h at 110 W (16-inch M4 Max): **25 g** (LADWP average); 18 g (CA average); **45 g** (average gas marginal); **54 g** (gas combined-cycle lifecycle); **4.5 g** (own rooftop PV, lifecycle). A 4090 desktop at 480 W: 110 / 78 / 197 / 235 / 20 g | [D] | — | — | D | M |

**Marginal vs average for a home user with rooftop solar [D; methodology].**
- **Attributional (average) accounting** uses the utility label: 0.229 kg/kWh for LADWP 2024. Electricity drawn during self-consumed solar hours carries PV lifecycle emissions (about 0.041 kg/kWh).
- **Consequential (marginal) accounting.** With net metering, every extra kWh used while the panels are producing is a kWh not exported. Exports displace the grid's marginal generator, which in LADWP's system is usually a gas unit (about 0.41–0.49 kg/kWh). So a render run "on your own solar" in the middle of the day causes roughly the emissions of the displaced marginal generation, not zero.
- **Exception:** during hours when solar is curtailed and the grid's marginal energy is itself surplus solar, marginal emissions approach zero. I found no LADWP-specific hourly marginal emission rates (a gap: WattTime and Electricity Maps were not reachable without search).
- **Recommendation:** the tool should offer the three modes (average, marginal, self-solar attributional) and label them.

### 2.8 Krea in depth

| # | Item | Value / fact | Source | Date | Conf. |
|---|---|---|---|---|---|
| K1 | **Krea Realtime 14B** (open, Apache-2.0) | Distilled from Wan 2.1 T2V-14B with Self-Forcing (autoregressive, block-causal); **11 fps T2V with 4 inference steps on a single NVIDIA B200**; about 1 s to first frames; example resolution 832×480; recommends 40 GB+ VRAM; "H100, RTX 5xxx series also supported" (no fps given). Distillation cuts about 30 steps to 4. KV cache up to 25 GB per GPU. Supports prompt changes mid-generation, video-to-video restyling and webcam streaming | HF model card, Krea blog, GitHub [S59][S60][S61] | Blog dated 20 Oct 2025 (index lists Oct 15) | H (spec) |
| K2 | Realtime session energy [D] | One B200 at 0.83–1.0 kW (ML.ENERGY measured B200 video-diffusion average 780–918 W) → **13.8–16.7 Wh GPU per minute of streaming**, or 18–28 Wh with a 1.3–1.7× overhead. Per 5 s of 24-fps-equivalent output (120 frames at 11 fps = 10.9 s): **2.5–3.0 Wh GPU** | [D] from K1 and ML.ENERGY | — | M–L (production batching and fps unknown) |
| K3 | Realtime vs Seedance | 1 min of realtime streaming ≈ 24–30% of Jegham's Seedance-1 GPU-only estimate for 5 s at 720p (56.6 Wh). **3–4 min of streaming ≈ one Seedance generation** [D] | [D] | — | L–M |
| K4 | **Pricing (compute units, CU)** | Free: 100 units/day. **Pro: 20,000 units/mo, $35 monthly or $21/mo billed yearly** ("83 Seedance 2.0 videos"). Max: 60,000 units, $105 or $63 ("250 Seedance 2.0 videos"). Business: 80k units, $200 or $160 | krea.ai/pricing [S62] | fetched 2026-09-25 | H |
| K5 | **CU per generation** (20,000 ÷ generations per Pro plan). Default durations and resolutions per model are not stated | **Realtime image 0.11**; **Krea Realtime (video) 5.3**; Edit 3; Enhancer 8; Krea 2 Turbo 2; Krea 1 5.6; Krea 2 Medium 9; Krea 2 Large 18; Flux 3.3; Z-Image 3.2; Qwen 8.9; Nano Banana 2 44 (the plan header implies 78); LoRA training 952. **Seedance**: Pro 208; **Pro Fast 15.6**; 1.5 Pro 206; **2.0 241**; **2.5 183**; 2.0 Fast 192; **2.0 Mini 122**. **Hailuo/MiniMax**: Hailuo 323; **Hailuo 02 74**; 2.3 208; **2.3 Fast 141**; H3 488; H3 Max 185; H3 Max Turbo 93. Veo 3 741; Veo 3 Fast 370; Veo 3.1 606; Veo 3.1 Fast 238; Veo 3.1 Lite 89. LTX-2 34; LTX-2.3 22B 133; LTX-2.5 Fast 400; LTX-2.5 Pro 540. Ray 2 299; Ray 3.2 111; Runway Gen-4 185; Gen-4.5 179; Kling 3.0 187; Wan 2.2 222; Wan 3.0 111 | [S62] [D] | 2026-09-25 | H (prices); **L as a compute proxy** |
| K6 | Exploration budget in Krea's own units [D] | **1 Seedance 2.0 clip (241 CU) ≈ 2,170 realtime frames ≈ 45 Krea Realtime video units ≈ 120 Krea 2 Turbo images ≈ 43 Krea 1 images ≈ 30 enhancer passes** | [D] | — | L (price ≠ energy; third-party pass-through vs in-house GPUs) |
| K7 | Consistency and control features | Style references and moodboards; **LoRA training** (image and video, 50 images on Pro; Krea 2 LoRA training since May 21 2026); Krea Edit (region edit, relight, colorize); Generative Sliders (Jun 2026); image upscaling up to 22K (Topaz Standard) and video upscaling; video style transfer, motion transfer, lip sync. **Nodes** (workflow editor) plus App Builder. **Node Agent: "shows you compute cost, broken down per node. Nothing runs until you say go … only reruns what's downstream of the edit"** (caching). Prompt-to-Workflow can "fan out from a single prompt into multiple generations". **Krea Agent** "plans, generates, and iterates across models for you" (Max/Business plans). Pro includes "Unlimited relaxed generations" for in-house image models | Krea pricing and blog [S62][S63] | 2026 | H (features, V) |
| K8 | Krea Realtime Edit (Jan 20 2026) | "every brushstroke updates the image instantly … No generate button"; webcam and screen restyling "live, frame by frame" → continuous GPU load while the user interacts | Krea blog [S63] | 2026-01-20 | V |
| K9 | Krea 2 (open weights, Jun 23 2026 technical report); Krea 2 Turbo "images in just 2 seconds"; Krea 2 API $0.030 (Medium) / $0.060 (Large) per image, rising to $0.035–0.070 with style references or moodboards. **mflux supports Krea 2 (12B turbo) locally on a Mac** | Krea blog, mflux README [S63][S14] | 2026-05/06 | H |
| K10 | Seedance on Krea | API default is 720p; options are 480p, 720p and 1080p; generate_audio defaults to false. "30 seconds of 1080p video took 10m 17s"; failed or cancelled jobs are not billed; moderation-stopped jobs were retried. Krea Pro works out to about $0.19 per Seedance 2.5 clip vs $0.25 for Seedance 2.0. **Conflict:** Krea's comparison post says Seedance 2.5's "native output ceiling" is 720p, while its API guide and BytePlus both price 1080p output | Krea blog [S63] | 2026-08-26 | M |

### 2.9 Guided platforms: features that could reduce wasted generations

None of these platforms publishes reroll rates, generations per final shot, or energy data. Everything below is a description of features, largely vendor-stated.

| Platform | Draft or preview mechanisms | Consistency mechanisms | Mechanisms that could increase compute | Evidence of reduced compute | Source |
|---|---|---|---|---|---|
| **Krea** | Realtime image canvas (0.11 CU/frame); Krea 2 Turbo; Seedance 2.0 Mini, Pro Fast, Hailuo 02 and 2.3 Fast; 480p option | Style references, moodboards, LoRAs, Node caching, per-node cost display | Realtime video and Realtime Edit keep GPUs busy; agent iteration; fan-out workflows; unlimited relaxed image generation | **None published** | [S62][S63] |
| **Luma** (Dream Machine, Ray3) | **Draft mode at 5–20% of final credits**; Hi-Fi "mastering" of chosen drafts | Character reference from a single image; keyframes; annotation | **Hidden "chain of thought" retries** | Vendor claim "5× cheaper" | [S46][S48][S49] |
| **Seedance** (native API) | **Draft mode 480p → 1080p (18% of the price)** | Up to 30 reference images (2.5); first and last frame | — | ByteDance: "users … probe capability boundaries through trial and error" | [S43][S44][S64] |
| **Runway** | Gen-4 Turbo (42% of Gen-4.5); Gen-4 Image Turbo | **Gen-4 "consistent characters … with a single reference image"**; Act-Two performance transfer; **Aleph** in-context editing of existing video instead of regenerating | — | None | [S51][S65][S66] |
| **Google Flow** | Veo 3.1 Fast and Lite (Elo within 5 of Standard) | "Ingredients" (consistent subjects via Imagen); Frames-to-video; Scenebuilder extends shots with consistent characters | — | None | [S50][S67] |
| **LTX Studio** | Script → storyboard; LTX-2.x Fast; open weights allow **local drafts** | "Elements" (characters, objects, locations); keyframes; camera control | — | Testimonial: "ability to quickly storyboard" | [S68] |
| **Flora** | Infinite canvas with many models | "Character Lock" (one character, six angles) | "Turn a single concept into thousands of production-grade assets" (volume) | None | [S69] |
| **OpenArt** | Director (storyboard via chat) | Character Builder (tagged reuse) | — | None | [S70] |
| **Artlist AI** | Lists Fast/Turbo tiers "for previews and rapid concepts" | Reference images | Stream C: an "unlimited" Seedance 2.5 plan sold, then pulled within a week → no price signal (rebound) | None | [S71] |
| **Higgsfield** | Presets | "Genjutsu" recasts motion with your characters | — | None | [S72] (thin page) |
| **Adobe Firefly Boards, Freepik Spaces** | Multi-model moodboard or node canvases | Not verified in this session (Freepik returned 403; Adobe timed out). Luma news confirms Adobe as a Ray3 partner | — | None | [S49] |

### 2.10 Evidence on rerolls and image-to-video

| # | Evidence | Value | Source | Type / Conf. |
|---|---|---|---|---|
| R1 | Air Head (Shy Kids, Sora, text-only, 2024) | 1.5 min final; "hundreds of generations at 10 to 20 seconds a piece"; **"probably 300:1"** source to final; consistency achieved via "hyper-descriptive" prompts because the model had no reference input | fxguide [S42] | Interview / M |
| R2 | Creator and vendor data (Stream C, not re-fetched by F) | Kalshi ad: **300–400 generations for 15 usable clips (~20–27 per kept clip)**. invideo: "3 video generations per usable shot … about 25% of clips reach final cut"; 3-min animation: 164 generated, 41 used. Lost Garden Ep 2: **~2.4 generations per kept shot**. fxguide (2026): scripted narrative 10:1–30:1. ScreenWeaver (illustrative, not measured): **unprepared 5–10 takes per usable shot; prepared ~2–3** | Stream C notes (`research/C_notes.md`) | S / L–M |
| R3 | Seedance 2.0 blind expert benchmark (SeedVideoBench 2.0) | **T2V usability (score ≥3):** motion 97.6%, prompt following 85.0%, aesthetics 96.3%. **T2V satisfaction (score ≥4):** 67.2 / 51.2 / 61.7%. **I2V usability:** motion 87.1%, prompt following 88.9%, image preservation 91.4%. **I2V satisfaction:** 43.9 / 47.5 / 38.9%. Competitor T2V satisfaction is much lower (Veo 3.1 motion 6.6%, prompt following 12.1%; Kling 3.0 28.2 / 21.5%). Prompt sets and tasks differ between T2V and I2V | Seedance 2.0 technical report, arXiv 2604.14148 [S64] | Vendor benchmark / M |
| R4 | DiffusionDB (Stable Diffusion Discord) | **14M images from 1.8M unique prompts (≈7.8 images per prompt)**. This is an upper bound on "rerolls", since the bot produced multiple images per request | arXiv 2210.14896 [S73] | P / M (proxy) |
| R5 | Prompt-log study (Midjourney, SD, etc.) | "Users make more edits within creation sessions, which present remarkable exploratory patterns" (no numbers in the abstract) | Xie et al. 2023, arXiv 2303.04587 [S74] | P / qualitative |
| R6 | Platform statements | Runway: Gen-4 "solves the character consistency problem" with one reference image. Luma: draft "preserves the identity, motion, and composition". Seedance: draft lets you "validate key elements … before generating a high-quality final video". Google Flow: ingredients "into different clips and scenes with consistency" | [S65][S49][S44][S67] | V |
| R7 | Agentic generation | VideoGen-Agent: tool-using agent raises VABench from 56.5 to 75.6 (+19.1) over its base T2V generator (86.1 with upgraded tools). Success improves, but the agent adds generation and verification calls | arXiv 2609.24997 [S75] | P / M |
| R8 | Rebound | Luccioni et al. 2025: efficiency gains can raise total consumption (Jevons' paradox) | arXiv 2501.16548 [S76] | P / qualitative |

**Interpretation [D].** There is no controlled evidence that image-to-video with a prepared keyframe lowers per-clip rejection. The benchmark in R3 shows a *lower* per-dimension satisfaction rate for I2V. The practical gain is about *intent and continuity*:
- The keyframe fixes composition, character, wardrobe and look.
- Those are the attributes that cause most rejections in multi-shot work, and T2V cannot hold them across shots.
- T2V benchmarks don't measure these rejections.

I therefore treat "fewer takes" as a user parameter, not as an established effect.

### 2.11 Deliverable (b): optimized-workflow model (per kept 5 s shot)

**Definitions.**
- **V** is the cloud energy of one 5 s 1080p generation with native audio (Seedance 2.x class). Plug in Stream A's estimate. The illustrations below use V = 50, 100 and 250 Wh [A].
- **Baseline** = N_base × V: unprepared T2V, every take at 1080p with audio.
- **Optimized** = K + N_d·d·a·V + F·r·a·V + F·U + A, where:
  - K = local keyframe and reference energy
  - N_d = N_base·(1−ρ)·(1+rebound) = number of exploratory takes
  - d = energy ratio of a 480p draft to the final
  - a = audio-off factor
  - F = finals including redos
  - r = energy ratio of a 720p final to 1080p (1 in Scenario A)
  - U = local upscale energy per final
  - A = local TTS and music energy
- **Scenario A** is platform draft mode (Seedance 2.5 style: 480p drafts, 1080p final; r = 1, U = 0).
- **Scenario B** is 480p exploration, a 720p final, and a local upscale to 1080p.

| Parameter | Low (pessimistic) | Central | High (optimistic) | Evidence |
|---|---|---|---|---|
| N_base (takes per kept shot, unprepared T2V) | 3 | 5 | 10 | R1, R2 |
| ρ (take reduction from keyframes, references and I2V) | 20% | 40% | 60% | R2 bracket; R3 shows no benchmark gain → [A] |
| Rebound on the number of drafts | +50% | 0 | 0 | R8 [A] |
| d (480p draft ÷ 1080p final, energy) | 0.25 (could reach ~0.5 for cascaded models) | 0.18 (Seedance 2.5 price ratio) | 0.06 (full-attention DiT physics, 1080p ÷ 480p ≈ 17–19×) | D1, 2.12 |
| a (audio off) | 1.0 (dialogue needs native lip-sync) | 0.85 | 0.70 | LTX-2 audio +21–34% [D] |
| F (finals including redos) | 1.3 | 1.2 | 1.1 | [A] |
| r (720p ÷ 1080p energy) | 0.70 (Seedance-1 cascade, 1/1.43) | 0.41 (Seedance 2.5 price) | 0.23 (full-attention DiT, 1/4.4) | 2.12 |
| U (local upscale per 5 s final) | 0.9 Wh | 0.4 Wh | 0.2 Wh | 2.3; **SeedVR2-class excluded (~125 Wh)** |
| K (local keyframe energy per shot) | 90 Wh (30 images × 3 Wh; FLUX-dev/HiDream class, no reuse) | 13 Wh (12 × 1.1 Wh; Z-Image class) | 2 Wh (6 × 0.35 Wh; FLUX.2-klein class) | 2.3 |
| A (local TTS and music) | 0 | 0.3 Wh | 0.05 Wh | 2.3 |

**Results** (from `F/workflow.py`). Energy per kept shot; a negative saving means the optimized workflow uses more energy than the baseline.

| V (Wh) | Scenario | Low | Central | High |
|---|---|---|---|---|
| 50 | A (draft → 1080p) | 150 → 200 Wh (**−33%**) | 250 → 87 Wh (**65%**) | 500 → 49 Wh (**90%**) |
| 50 | B (720p + upscale) | 150 → 182 Wh (**−21%**) | 250 → 58 Wh (**77%**) | 500 → 20 Wh (**96%**) |
| 100 | A | 300 → 310 Wh (**−3%**) | 500 → 161 Wh (**68%**) | 1000 → 96 Wh (**90%**) |
| 100 | B | 300 → 272 Wh (**9%**) | 500 → 102 Wh (**80%**) | 1000 → 37 Wh (**96%**) |
| 250 | A | 750 → 640 Wh (**15%**) | 1250 → 383 Wh (**69%**) | 2500 → 237 Wh (**90%**) |
| 250 | B | 750 → 544 Wh (**28%**) | 1250 → 233 Wh (**81%**) | 2500 → 89 Wh (**96%**) |

**Each lever on its own** (central parameters, V = 100 Wh, baseline 500 Wh):

| Lever | Saving |
|---|---|
| Keyframes / I2V only (40% fewer takes, all at 1080p, +13 Wh local) | **37%** |
| Draft mode only (5 drafts at 0.18 + 1.2 finals) | **58%** |
| 720p final plus local upscale only | **59%** |
| Native audio off only | **15%** |

**Caveats that matter:**
1. **Seedance 2.5's native draft flow allows only 1080p finals**, so Scenario B needs manual seed-and-prompt reuse, which is not guaranteed to match the draft.
2. If the provider's 1080p output is already an internal upscale of a lower-resolution base (Krea says Seedance 2.5's native ceiling is 720p; Jegham models Seedance-1 as a cascade), then r and d move toward the low column.
3. Price-based ratios (d, r) may overstate energy savings (Veo Fast: 25% of the price but about 90% of the energy in D11).
4. Heavy local image models (FLUX.2-dev at about 16 Wh per image on an M4 Max) can make K larger than the video savings.
5. A diffusion upscaler (SeedVR2) adds about 125 Wh per 5 s at 1080p, which cancels Scenario B.
6. Rebound (cheap drafts leading to more drafts) is the main way the "optimized" workflow ends up worse than the baseline.

### 2.12 Resolution scaling of cloud video energy (inputs for d and r)

| Model class | 720p ÷ 480p | 1080p ÷ 720p | 1080p ÷ 480p | Basis |
|---|---|---|---|---|
| Wan 2.1 / 2.2, 1× H200, 40 steps, 121 frames | 4.08–4.09× | **4.44×** | 18.1× | [D] from the Jegham et al. 2026 fitted law E = N1·T²·S + M·T·S + G, T = H·W·F/1000 (coefficients via Stream A) |
| HunyuanVideo-1.5, H200 / B200 | 4.07–4.18× | 4.48–4.50× | 18.3–18.7× | [D] same |
| LTX-2 T2V / T2VA, B200 | 1.79–1.89× | **2.13–2.24×** | 3.8–4.3× | [D] same (two-stage, high-compression VAE) |
| Seedance-1 (black-box estimate) | — | **1.43×** (8 s: 114.2 vs 80.0 Wh) | — | Jegham (via Stream A) |
| Seedance 2.5 price | 2.25× | **2.46×** | 5.53× | D1 |
| Wan 2.1 measured time, H100 1 GPU | 3.19× (time) | — | — | Stream A notes |
| LTX-2 audio overhead (T2VA vs T2V) | — | — | — | **+21% (1080p) to +34% (480p)** [D] |

---

## 3. Methodology notes

1. **Energy on Apple Silicon.**
   - No source I could reach reported watt-hours per image for an M4 Max. I compute Wh = end-to-end time × **wall** power.
   - I use the Notebookcheck wall measurements (P2, P5) and set a central 110 W for the 16-inch M4 Max under sustained GPU diffusion (range 90–130 W). This sits below gaming (116 W) and the load average (125 W), because diffusion loads the GPU, not the CPU.
   - I don't use powermetrics or asitop GPU readings for energy. They report only the GPU rail. The Apple forum case (P9) shows the whole system rising about 2.75× more than the GPU rail.
   - The 14-inch M4 Max is capped near 96–97 W of input and will throttle sooner. I assume roughly equal Wh per image (±15%) because it runs slower at lower power.
2. **M4 Max times.**
   - Direct M4 Max image timings are scarce (only the mflux schnell entry I1 is attributable).
   - I scale Draw Things' M3 Ultra (60-core) measurements by 1.15–1.30 (from Notebookcheck's +14–27% for M4 Max over M3 Max, and the 1.5× core ratio from M3 Max 40-core to M3 Ultra 60-core).
   - I cross-check with FLOP counts: FLUX.1-dev ≈ 74 TFLOP per step at 1024², counting per-token active parameters of about 6.45B, 4,608 tokens, and attention; Z-Image ≈ 60 TFLOP per step. I divide by the measured 14.8 TFLOP/s FP16 ceiling (P8). Both methods agree within about 20%.
   - For LTX-2.3 I bracket between the M3 Ultra scaling and the M5 Max ÷ 3.3 claim, which gives a wide range.
3. **RTX energy.** GPU power comes from a community measurement (290–400 W in FLUX FP8, P14) plus about 120 W for the rest of the system [A]. The 5090 is assumed at 600–725 W for the system. Monitors are excluded. RTX results are sensitive to power-limit tuning: undervolting cut GPU power by 27% for a 10% time penalty in P14.
4. **Cloud comparisons** use ML.ENERGY v3.0 GPU-only measurements, which are batch-1 and reproducible. For facility-level comparisons, apply a 1.3–1.7× multiplier (host CPU and DRAM, idle capacity, PUE) based on Google's comprehensive-vs-accelerator split and Delavande et al.'s 80–90% GPU share.
5. **Price as a compute proxy** (Krea CU, draft ratios). Useful for *relative* comparisons inside one provider. Unreliable across providers, and it can diverge from energy by 3× or more (D11). I flag every use.
6. **Realtime energy.** GPU occupancy × B200 average power (ML.ENERGY measured 780–918 W during video diffusion). Krea's production system may batch several users per GPU or throttle fps, so the per-user energy may be lower. That is unknown.
7. **Embodied amortization.** Take the Apple report total, subtract the use phase (M4 Pro shares are applied to the M4 Max configurations because the M4 Max breakdown isn't published), and divide by attributed hours. The attribution choice (all use vs generative-only) changes the result by 2–3×, so the tool should expose it.
8. **Workflow model.** Per kept shot, a deterministic calculation with low/central/high parameter sets. Parameters are grouped by scenario for readability. A Monte Carlo over independent ranges would be better for the tool. `F/workflow.py` implements the formula and can be ported directly.
9. **Arithmetic.** All derived values come from `F/model.py` and `F/workflow.py` (reproducible).

---

## 4. Gaps and uncertainties

1. **Process limit.** The shared WebSearch budget ran out partway through, and Reddit, MacRumors, Freepik and NREL were blocked. This mainly weakens: community M4 Max benchmarks (ComfyUI/MPS and Draw Things on the M4 Max specifically), Topaz Video AI on Mac, Kokoro RTF on Mac, and LADWP marginal emission data.
2. **No direct Wh-per-image measurement on any Apple Silicon Mac** was found. All Mac energy figures are derived (time × assumed wall power). The ±20% power uncertainty and the ±20–30% time uncertainty compound.
3. **Direct 14-inch M4 Max and binned (32-core GPU) M4 Max** power and sustained-throughput reviews were not retrieved. The 14-inch figures are inferred from the 96 W adapter and the 14-inch M5 Max behavior.
4. **M4 Max timings** are mostly scaled from M3 Ultra, M2 Max and M5 Max measurements (Draw Things, a vendor). The Apatero M4 Max FLUX figure (85 s for 30 steps) conflicts with the measured FP16 ceiling and was not used.
5. **Topaz, Real-ESRGAN and SeedVR2 on Mac:** no verified fps. The SeedVR2 paper doesn't state its GPU. The lightweight-upscaler energy range (0.2–0.9 Wh per 5 s) is an assumption.
6. **Cloud TTS and music energy** (ElevenLabs, Suno, Udio) is undisclosed. The ranges are bounded from open-model RTFs on data-center GPUs and do not account for production batching.
7. **Krea:** no disclosure of hardware, batching, realtime fps in production, energy, or generations-per-asset. The CU-to-energy mapping is speculative. The "Krea Realtime video unit" (5.3 CU) is undefined in duration.
8. **Reroll reduction from I2V and keyframes** has no controlled study. The only benchmark (Seedance 2.0) doesn't show a per-clip gain. The take-reduction parameter (20/40/60%) is an assumption anchored to creator anecdotes.
9. **Draft-to-energy mapping:** we don't know whether Seedance 2.5, Veo Fast or Luma Draft use smaller models, fewer steps, lower resolution, or cascades. Price ratios (0.05–0.30) may not equal energy ratios (D11 suggests about 0.9 for Veo Fast).
10. **Seedance 2.5 native resolution** is reported inconsistently (720p ceiling per Krea's comparison post; 1080p per BytePlus pricing and draft rules). That affects whether a "720p + local upscale" workflow saves energy or only money.
11. **Audio overhead** is measured only for LTX-2 (+21–34%). Seedance 2.x joint audio-video overhead is unknown, and 2.x pricing doesn't separate audio.
12. **Water:** a laptop at home has no direct cooling water, only off-site water from electricity generation. I found no LADWP water-intensity figure. Water should come from other streams.
13. **Embodied carbon of RTX desktops:** there is no product report for DIY desktops, so no figure was found.
14. **Model churn:** Z-Image, FLUX.2-klein, Krea 2, Qwen-Image-2.1, LTX-2.5 and M5-generation optimizations all appeared in the last 10 months. Timings go stale quickly, and energy per image falls about 3× per chip generation on Apple (M4 Max → M5 Max).
15. **Rebound:** cheaper drafts and realtime canvases may increase total generations. No data quantifies this.

---

## 5. Source list

**Hardware and power**
- [S1] Notebookcheck, "Apple MacBook Pro 16 M4 Max review" (A. Osthoff), 2024-12-08. https://www.notebookcheck.net/Apple-MacBook-Pro-16-M4-Max-review-The-M4-Max-is-one-of-the-fastest-mobile-processors.929593.0.html
- [S2] Apple, Product Environmental Report, MacBook Pro 14-inch (M4 / M4 Pro / M4 Max), introduced 2024-10-30. https://www.apple.com/environment/pdf/products/notebooks/MacBook_Pro_14-inch_PER_Oct2024.pdf
- [S3] Apple, Product Environmental Report, MacBook Pro 16-inch, 2024-10-30. https://www.apple.com/environment/pdf/products/notebooks/MacBook_Pro_16-inch_PER_Oct2024.pdf
- [S4] Apple Support, MacBook Pro (14-inch, M4 Pro or M4 Max, 2024) tech specs. https://support.apple.com/en-us/121553
- [S5] Apple Support, MacBook Pro (16-inch, 2024) tech specs. https://support.apple.com/en-us/121554
- [S6] R. Kumaresan, "RIGEL: Reverse-Engineering the Metal 4.1 Tensor Compute Path on the Apple M4 Max GPU", arXiv 2606.12765, June 2026. https://arxiv.org/pdf/2606.12765
- [S7] Apple Developer Forums, "Powermetrics GPU power vs system DC power discrepancy on M4 Max", Mar 2026. https://developer.apple.com/forums/thread/819927
- [S8] Notebookcheck, "M5 Max with inconsistent performance and throttling issues – Apple MacBook Pro 14 Review", 2026-03-11. https://www.notebookcheck.net/M5-Max-with-inconsistent-performance-and-throttling-issues-Apple-MacBook-Pro-14-Review.1246064.0.html
- [S9] Notebookcheck, "Apple tries to hide that the power adaptors of MacBook Pro models are insufficient", 2026-03-14. https://www.notebookcheck.net/Apple-tries-to-hide-that-the-power-adaptors-of-MacBook-Pro-models-are-insufficient.1249028.0.html
- [S10] Notebookcheck, "Apple's fastest laptop starts to show its age – MacBook Pro 16 2026 M5 Max Review", 2026-08-27. https://www.notebookcheck.net/Apple-s-fastest-laptop-starts-to-show-its-age-Apple-MacBook-Pro-16-2026-M5-Max-Review.1250821.0.html
- [S11] NVIDIA, GeForce RTX 4090 specifications. https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4090/
- [S12] NVIDIA, GeForce RTX 5090 specifications. https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5090/
- [S13] ComfyUI GitHub Discussion #4571, "RTX 4090 benchmarks – FLUX model", 2024-08 to 2026-02. https://github.com/comfyanonymous/ComfyUI/discussions/4571

**Image and video generation speed**
- [S14] mflux README (current) and v0.9.6 README on PyPI (2025-07-20). https://github.com/filipstrand/mflux ; https://pypi.org/project/mflux/0.9.6/
- [S15] Draw Things, "Quantify Z Image Turbo efficiency gains", 2025-12-09. https://releases.drawthings.ai/p/quantify-z-image-turbo-efficiency
- [S16] Draw Things, "Metal FlashAttention v2.5 w/ Neural Accelerators", 2025-11-10. https://releases.drawthings.ai/p/metal-flashattention-v25-w-neural
- [S17] Draw Things, "Metal Quantized Attention: pulling M5 Max ahead with Int8 matrix multiplication", 2026-04-01. https://releases.drawthings.ai/p/metal-quantized-attention-pulling
- [S18] Draw Things, "Introducing Lightning Draft: interactive image generation on M5 Max", 2026-03-24. https://releases.drawthings.ai/p/introducing-lightning-draft-interactive
- [S19] mflux Qwen-Image-2.1 README, 2026-09. https://raw.githubusercontent.com/filipstrand/mflux/main/src/mflux/models/qwen21/README.md
- [S20] Apatero, "Flux on Apple Silicon: M1/M2/M3/M4 Complete Guide", updated 2025-10. https://www.apatero.com/blog/flux-apple-silicon-m1-m2-m3-m4-complete-performance-guide-2025
- [S21] bitdoze, "How to Generate AI Images Locally on Mac with Flux (2026)", 2026-08-09. https://www.bitdoze.com/ai-images-mac/
- [S22] ComfyUI GitHub Discussion #9002, "GPU Benchmark Flux DEV fp8 5090 4090 3090", 2025–26. https://github.com/Comfy-Org/ComfyUI/discussions/9002
- [S23] ML.ENERGY Leaderboard v3.0 (task data; last_updated 2026-02-16) and blog (2026-01-29). https://ml.energy/leaderboard/data/tasks/text-to-image.json ; https://ml.energy/leaderboard/data/tasks/text-to-video.json ; https://ml.energy/blog/measurement/energy/diagnosing-inference-energy-consumption-with-the-mlenergy-leaderboard-v30/
- [S24] Wan2.2 GitHub README and computational-efficiency table. https://github.com/Wan-Video/Wan2.2 ; https://raw.githubusercontent.com/Wan-Video/Wan2.2/main/assets/comp_effic.png
- [S25] Wan2.1 GitHub README and computational-efficiency table. https://github.com/Wan-Video/Wan2.1
- [S26] HunyuanVideo-1.5 GitHub README (news 2025-12-05). https://github.com/Tencent-Hunyuan/HunyuanVideo-1.5
- [S27] Artificial Analysis, Text-to-Video leaderboard (fetched 2026-09-25). https://artificialanalysis.ai/video/leaderboard/text-to-video

**TTS, music and upscaling**
- [S28] Kokoro-82M model card. https://huggingface.co/hexgrad/Kokoro-82M
- [S29] Kokoro-FastAPI README. https://github.com/remsky/Kokoro-FastAPI
- [S30] f5-tts-mlx README and sample. https://github.com/lucasnewman/f5-tts-mlx ; https://s3.amazonaws.com/lucasnewman.datasets/f5tts/sample.wav
- [S31] F5-TTS README. https://github.com/SWivid/F5-TTS
- [S32] Dia README. https://github.com/nari-labs/dia
- [S33] IndexTTS README. https://github.com/index-tts/index-tts
- [S34] Fish-speech README. https://github.com/fishaudio/fish-speech
- [S35] Chatterbox, VibeVoice, Qwen3-TTS and NeuTTS Air READMEs. https://github.com/resemble-ai/chatterbox ; https://github.com/microsoft/VibeVoice ; https://github.com/QwenLM/Qwen3-TTS ; https://github.com/neuphonic/neutts-air
- [S36] ElevenLabs pricing and API pricing (fetched 2026-09-25). https://elevenlabs.io/pricing ; https://elevenlabs.io/pricing/api
- [S37] ACE-Step README (RTF table). https://github.com/ace-step/ACE-Step
- [S38] ACE-Step 1.5 README and BENCHMARK.md. https://github.com/ace-step/ACE-Step-1.5
- [S39] Suno pricing (fetched 2026-09-25). https://suno.com/pricing
- [S40] FlashVSR README. https://github.com/OpenImagingLab/FlashVSR
- [S41] SeedVR2, "One-Step Video Restoration via Diffusion Adversarial Post-Training", arXiv 2506.05301 (Table 6). https://arxiv.org/abs/2506.05301
- [S42] fxguide, "Actually using SORA" (M. Seymour), 2024-04-14. https://www.fxguide.com/fxfeatured/actually-using-sora/

**Pricing, draft modes and platforms**
- [S43] BytePlus ModelArk, Seedance pricing (doc 1544106; copy saved at `research/bp_pricing_md.txt`). https://docs.byteplus.com/en/docs/ModelArk/1544106
- [S44] BytePlus ModelArk, Seedance 2.5 Draft mode (doc 2607688; copy at `research/bp_2607688.md`). https://ai.byteplus.com/ark/region:ap-southeast-1/docs/ModelArk/2607688
- [S45] Google, "Measuring the environmental impact of delivering AI at Google scale" (Aug 2025; copy at `research/papers/google_gemini_env.txt`). https://arxiv.org/abs/2508.15734
- [S46] Luma pricing (credits). https://lumalabs.ai/pricing
- [S47] Luma API pricing. https://lumalabs.ai/api/pricing
- [S48] Luma Ray3 page. https://lumalabs.ai/ray3
- [S49] Luma news, Ray3 launch, 2025-09-18. https://lumalabs.ai/news/ray3
- [S50] Google Gemini API pricing (Veo 3.1). https://ai.google.dev/gemini-api/docs/pricing
- [S51] Runway API pricing. https://docs.dev.runwayml.com/guides/pricing/ ; app plans https://runwayml.com/pricing
- [S52] MiniMax video packages and points (copy at `research/mm_video_pkg.md`). https://platform.minimax.io
- [S53] Jegham, Gamazaychikov, Luccioni, "Lights, Camera, Carbon: Architectural Scaling Laws for Video Generation Energy Consumption", arXiv 2607.04553, 2026-07-05 (coefficients from Stream A notes, `research/notes_A1.md`, and `research/papers/lights_flat.txt`). https://arxiv.org/abs/2607.04553
- [S54] Apple, Product Environmental Report, MacBook Pro (M5 Pro or M5 Max), 2026-03-03. https://www.apple.com/environment/pdf/products/notebooks/MacBook_Pro_M5_Pro_or_M5_Max_PER_Mar2026.pdf
- [S55] California Energy Commission, 2024 Power Content Label, LADWP. https://www.energy.ca.gov/filebrowser/download/9140 (index: https://www.energy.ca.gov/programs-and-topics/programs/power-source-disclosure-program/power-content-label/annual-power-5)
- [S56] EIA, carbon dioxide emissions coefficients. https://www.eia.gov/environment/emissions/co2_vol_mass.php
- [S57] EIA Electric Power Annual, Table 8.1 (average operating heat rates). https://www.eia.gov/electricity/annual/html/epa_08_01.html
- [S58] IPCC AR5 WGIII Annex III (Table A.III.2). https://www.ipcc.ch/site/assets/uploads/2018/02/ipcc_wg3_ar5_annex-iii.pdf
- [S59] Krea Realtime 14B model card. https://huggingface.co/krea/krea-realtime-video
- [S60] Krea blog, "Krea Realtime 14B: Real-Time, Long-Form AI Video Generation" (E. Millon), Oct 2025. https://www.krea.ai/blog/krea-realtime-14b
- [S61] krea-ai/realtime-video GitHub README. https://github.com/krea-ai/realtime-video
- [S62] Krea pricing (fetched 2026-09-25). https://www.krea.ai/pricing
- [S63] Krea blog posts: realtime-edit (2026-01-20), krea-2-turbo (2026-06-03), ai-workflow-agent (Node Agent), prompt-to-workflow (2026-02-10), krea-2-api-launch, krea-2-technical-report (2026-06-23), seedance-2-5-vs-seedance-2-0-tested-on-a-real-fashion-brief (2026-08-26), seedance-2-5-api-access-guide… (2026-08-26), how-to-edit-video-with-krea-agent. Base URL https://www.krea.ai/blog/ ; Krea Nodes https://www.krea.ai/nodes
- [S64] ByteDance Seed, Seedance 2.0 technical report, arXiv 2604.14148, 2026-04-15 (copy at `research/papers/seedance20.txt`). https://arxiv.org/abs/2604.14148
- [S65] Runway, "Introducing Runway Gen-4". https://runwayml.com/research/introducing-runway-gen-4
- [S66] Runway, "Introducing Runway Aleph", 2025-07-25. https://runwayml.com/research/introducing-runway-aleph
- [S67] Google, "Meet Flow: AI-powered filmmaking with Veo 3". https://blog.google/technology/ai/google-flow-veo-ai-filmmaking-tool/
- [S68] LTX Studio. https://ltx.studio/ ; LTX-2 repo https://github.com/Lightricks/LTX-2
- [S69] FLORA. https://www.flora.ai/
- [S70] OpenArt. https://openart.ai/
- [S71] Artlist AI. https://artlist.io/ai (the unlimited-plan episode comes from Stream C: https://www.cined.com/artlist-sold-a-year-of-unlimited-seedance-2-5-for-500-and-delivered-a-week/)
- [S72] Higgsfield. https://higgsfield.ai/

**Literature**
- [S73] Wang et al., "DiffusionDB", arXiv 2210.14896. https://arxiv.org/abs/2210.14896
- [S74] Xie et al., "A Prompt Log Analysis of Text-to-Image Generation Systems", arXiv 2303.04587 (2023). https://arxiv.org/abs/2303.04587
- [S75] "VideoGen-Agent: Reinforcing Video Generation Agents", arXiv 2609.24997 (2026-09). https://arxiv.org/abs/2609.24997
- [S76] Luccioni et al., "From Efficiency Gains to Rebound Effects: The Problem of Jevons' Paradox in AI's Polarized Environmental Debate", arXiv 2501.16548 (2025). https://arxiv.org/abs/2501.16548
- Cross-referenced from other streams (not re-fetched by F): Delavande, Pierrard, Luccioni 2025 (arXiv 2509.19222); AI Energy Score image-generation mean 2.9 Wh per image; Stream C creator shooting-ratio data (`research/C_notes.md`).
