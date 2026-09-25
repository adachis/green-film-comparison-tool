# A1 — Energy of AI video (and image) generation inference, and how to estimate it for closed models (Seedance, Hailuo)

Research stream A1 · compiled 2026-09-25 · research only (no app code)

**Conventions used throughout**

- **Wh** = watt-hours; 1 Wh = 3,600 J. **Wh/s** = Wh per second of *generated output video* (not per second of compute).
- **GPU-only** = accelerator energy (NVML/pyNVML readings, or `N_GPU × fraction × TDP × time`). **Facility-level** = GPU + host (CPU, DRAM, network, fans, PSU losses) + idle/provisioned capacity + data-centre overhead (PUE). Every number below is tagged with its scope.
- **Derived** means I computed it from a primary source's time and hardware figures. Unless the row says otherwise, I assumed GPU power = 0.9 × TDP (justified in §2.11). That assumption was checked against measured data: it reproduces ML.ENERGY's measured HunyuanVideo energy to within about 9% (§2.6).
- **Confidence:** High = primary source, directly stated or measured. Medium = primary source with a derivation or assumption I added, or a secondary report of a primary figure. Low = secondary, unverified, or dominated by assumptions.
- "480p", "720p" and "1080p" mean 16:9 frames of about 854×480, 1280×720 and 1920×1080 unless a model's native size differs (for example Wan's 832×480 or H3's 1344×768), which is noted where it applies.
- **Research limitation:** the session's WebSearch budget ran out partway through this stream. After that, everything came from fetching known primary URLs (arXiv, GitHub, Hugging Face, official vendor pages) and following citations. Some press and analyst coverage therefore could not be surveyed (see §4).

---

## 1. Summary of key findings

1. **No commercial video model has first-party energy data.** ByteDance (Seedance), MiniMax (Hailuo/H3), Google (Veo), OpenAI (Sora), Runway and Kling do not publish energy per video. Google's August 2025 environmental paper covers only the median Gemini Apps *text* prompt (0.24 Wh). Its full text never mentions "video", "Veo" or "image" (verified by text search). Sam Altman's "0.34 Wh per query" is also text-only and says nothing about Sora.
2. **Measured energy for open models (GPU-only) spans more than three orders of magnitude per clip.** AnimateDiff uses 0.115 Wh. At the other end, Wan2.1-14B at 720p (81 frames, 50 steps, 1×H100) uses 359.7 Wh GPU and 415.1 Wh GPU+CPU+RAM (Delavande et al. 2025), and HunyuanVideo at 720p (129 frames, 1×H100) uses 323 Wh (ML.ENERGY v3). Per second of output, undistilled 13–14B-class models at 720p on Hopper GPUs draw about **35–80 Wh/s GPU-only** (measured 60–71; derived 36–80). Distilled or real-time models draw about **0.1–5 Wh/s**.
3. **The only published Seedance estimate is a third-party backward estimate** (Jegham, Gamazaychikov & Luccioni, arXiv 2607.04553, 5 Jul 2026). They took API latencies from fal.ai and assumed a DGX H800 node running at 90% of TDP, reporting GPU-only energy. Their figures for **Seedance 1** are 56.6 Wh (5 s at 720p), **80.0 Wh (8 s at 720p; 95% CI 72.1–87.9)**, 98.8 Wh (10 s at 720p) and 114.2 Wh (8 s at 1080p). For **Seedance 1.5** (which generates audio) they report 64.6, 102.1 and 136.7 Wh for 5, 8 and 10 s at 720p. That works out to **about 10–14 Wh per output second**. The same paper puts Veo 3 at 30.8 Wh (8 s at 720p), Sora 2 Pro at 418.5 Wh (8 s at 720p) and 1,313 Wh (12 s at 1080p), and Gen-4.5 at 322 Wh (8 s at 720p). **There is no published Hailuo estimate.**
4. **Seedance 1.0's speed claim is confirmed, but the GPU count is not disclosed.** The technical report (arXiv 2506.09113) says it "can generate a 5-second video at 1080p resolution only with 41.4 seconds (NVIDIA-L20)". My order-of-magnitude FLOP check says this must be a multi-GPU figure. If it ran on 8×L20 (275 W each), that is about 23 Wh GPU per 5-s 1080p clip (4.6 Wh/s). If the same 41.4 s ran on 8×H800, it would be about 58 Wh (11.6 Wh/s).
5. **MiniMax H3 (Hailuo 3.0, open-weight release on 31 Jul 2026) is the best Hailuo-class proxy.** It is a 33B dense single-stream transformer (about 13B of that in AdaLN branches), with joint audio and CFG distillation, a 768p base output and a 2K "regenerate" pass. The SGLang cookbook gives measured serving latencies. A 5.17-s clip at 1344×768 with audio and 50 steps took 74.4 s on 4×H200, which is **≈10 Wh/s GPU-only** (derived). On 8×B300 it took 19.0 s (≈8 Wh/s). A community 4-step sparse-attention distillation (FastH3) generates faster than real time at **≈0.9 Wh/s**.
6. **Hailuo 02's "NCR" claim is relative only.** MiniMax's official post says NCR "boosts our training and inference efficiency by 2.5 times" at comparable parameter scale, and that the model has 3× the parameters of its predecessor and 4× the training data. There are no absolute figures. Aggregator claims of "22% energy reduction" and "1080p in 62 s" do not appear in MiniMax's post and are unverified.
7. **Scaling laws.**
   - **Steps:** energy grows linearly with steps (Delavande: 1.9% error).
   - **Resolution and frames:** full-attention models grow roughly quadratically in token count, because the attention term is O(ℓ²).
   - **Measured scaling of production pipelines is gentler.** Energy ∝ pixels^α, with α ≈ 0.4–0.9 for cascaded or closed models (Seedance 1: 0.44; Veo 3: 0.56–0.67; Sora 2 Pro: 0.63–0.75) and α ≈ 1.2–1.6 for single-stage full-attention open models (Wan 2.2: 1.3–1.5; H3 per step: 1.22).
   - **Duration:** energy ∝ duration^β, with β ≈ 0.8–1.15 for closed or sparse models and β ≈ 1.7–1.8 for full-attention models at 720p (doubling the length raises energy about 3.3×).
   - **Batching and multi-GPU:** batching gives **no** per-video saving. Multi-GPU serving adds 10–33% energy.
8. **Audio adds 0–40%.** In LTX-2, the audio overhead comes from an extra multimodal CFG pass rather than from the audio tokens: +26% at 40 steps (from Jegham's fitted coefficients). In H3's single-stream design, audio is about 3% of the sequence, so the overhead is likely a few percent (my estimate). **Reference conditioning costs more than audio.** H3's reference-to-video mode (Ref2VA) takes 53% longer than its text/keyframe mode (FL2VA), and video-to-video takes 3.4× longer per step.
9. **Diffusion inference is compute-bound, so GPUs run near TDP.** Measured draw during denoising is 97.8–98.9% of TDP on H200 and B200 (Jegham). Per-GPU averages in ML.ENERGY v3 are 0.89–0.98×TDP on a single H100, 0.71–0.98 across multi-GPU H100 runs, and 0.63–0.92 on B200. Energy is therefore ≈ `N_GPU × ~0.9 × TDP × generation time`.
10. **Hardware moves energy by 2–3×.** On official Wan runs, H20 is 3.5–3.9× slower than H100, which means **≈2.0–2.2× more energy per video** at 400 W versus 700 W TDP. That matters because Chinese providers serve on H20, L20 and H800 hardware. B200 versus Hopper ranges from about 0.65× energy (Jegham) to about 1.0× (ML.ENERGY), depending on software.
11. **Facility overheads.** GPUs account for 80–90% of GPU+CPU+RAM energy (Delavande). For text serving, Google's full stack uses 1.71× the accelerator energy. MIT Technology Review doubled GPU energy. **I recommend a facility multiplier of ×1.7 (range 1.27–3.1).**
12. **MIT TR's CogVideoX figure conflicts with other measurements.** MIT TR reports 3.4 MJ = 944 Wh total (472 Wh GPU) for a 5-s video from what appears to be CogVideoX1.5-5B. That is **~5× higher** than ML.ENERGY's measurement of CogVideoX1.5-5B on the same H100 class (93.2 Wh GPU) and the model card's own speed figure (~550 s per 5-s video). Treat the MIT TR number as an outlier.
13. **Images for context.** A 1024² image costs 0.1–2.2 Wh GPU (ML.ENERGY v3; AI Energy Score gives 0.19–1.64 Wh/image). The Power Hungry Processing mean is 2.9 Wh/image (whole system, A100, 2023-era models). A single video clip is therefore 10–1,000× an image.
14. **Training.**
   - Seaweed-7B, Seedance's precursor, used **665,000 H100 GPU-hours** (≈0.37 GWh GPU, ≈0.64 GWh facility; derived).
   - Open-Sora 2.0 used 4,160 H200 GPU-days (≈100k GPU-h, $199.6k).
   - Movie Gen trained on up to 6,144 H100s; the Open-Sora team estimates 1.25M H100-h.
   - Amortized over hundreds of millions of clips, training adds typically **~1–10%** to per-video energy for mass-market models.
15. **Recommended estimates (§3.2), in Wh per second of generated video:**

    | Class | Scope | 480p | 720p | 1080p |
    |---|---|---|---|---|
    | Seedance-class | GPU-only | 5.7 | 10 | 17.6 |
    | Seedance-class | Facility | 9.8 | 17.2 | 30.3 |
    | Hailuo-class | GPU-only | 2.0 | 5.0 | 12.5 |
    | Hailuo-class | Facility | 3.4 | 8.6 | 21.5 |

    Each value has a likely range of roughly 5× down and 4× up. At 720p, one 5-s clip is about **86 Wh (Seedance-class) or 43 Wh (Hailuo-class) at facility level**. Take count (the number of generations per kept shot) dominates total energy.

---

## 2. Data tables (numbers with sources)

### 2.1 Delavande, Pierrard & Luccioni (2025), "Video Killed the Energy Budget" — direct measurements

Source: arXiv 2509.19222 v1 (23 Sep 2025), NeurIPS 2025 NextVid Workshop (oral). https://arxiv.org/abs/2509.19222 · **Primary · High confidence**

Setup:
- Hardware: 1× **H100 SXM 80 GB** with an 8-core AMD EPYC 7R13 CPU and no co-scheduled jobs.
- Measurement: **CodeCarbon**. GPU energy via NVML, CPU via pyRAPL, RAM via CodeCarbon's heuristic.
- Protocol: Hugging Face Diffusers default settings; 2 warm-ups plus 5 runs for each of 50 prompts. No caching or quantization.

**Table 4 (mean ± std, default settings per model card):**

| Model | Res (H×W) | Frames @fps (paper) | Steps | Latency (s) | GPU Wh | CPU Wh | RAM Wh | Total Wh | GPU Wh per output-s* |
|---|---|---|---|---|---|---|---|---|---|
| WAN2.1-T2V-14B | 720×1280 | 81 @15 | 50 | 1875 ± 2.1 | 359.7 ± 0.5 | 35.6 ± 4.0 | 19.8 | **415.1** | 71.1 |
| WAN2.1-T2V-1.3B | 720×1280 | 81 @15 | 50 | 410 ± 0.5 | 78.8 | 7.4 | 4.3 | **90.5** | 15.6 |
| Mochi-1-preview | 480×848 | 84 @30 | 64 | 263 ± 0.5 | 44.7 | 4.6 | 2.8 | 52.1 | 16.0 |
| CogVideoX-5B | 480×720 | 49 @8 | 50 | 124 ± 0.4 | 21.6 | 2.4 | 1.3 | 25.3 | 3.5 |
| CogVideoX-2B | 480×720 | 49 @8 | 50 | 50.6 ± 0.2 | 8.3 | 0.84 | 0.53 | 9.67 | 1.4 |
| LTX-Video-0.9.7-dev | 512×704 | 121 @24 | 40 | 9.7 | 3.16 | 0.32 | 0.19 | 3.67 | 0.63 |
| AnimateDiff | 512×512 | 16 @10 | 4 | 0.68 | 0.115 | 0.016 | 0.008 | **0.14** | 0.07 |

*Output seconds use each model's native frame rate. Wan's official config is `sample_fps = 16`, so 81 frames ≈ 5.06 s; the paper lists 15 fps.

Other quantitative content in the paper:

- **GPU share of energy:** GPU is "80–90% of the total consumption" and ">80%" across all models. That means CPU+RAM add ×1.11–1.25 on top of GPU energy (this excludes PUE, network and fans).
- **Analytic FLOP model** (reusable):
  - Token length `ℓ = (1 + T/4)·(H/16)·(W/16)`.
  - `F_total = F_text + F_VAE + S·g·(F_self + F_cross + F_mlp + F_τ)`, where
    - `F_self = N(8ℓd² + 4ℓ²d)`
    - `F_cross = N(4ℓd² + 4md² + 4ℓmd)`
    - `F_mlp = N·4fℓd²`
  - Latency `D = F_total / (μ·Θ_peak)`, with **μ = 0.456** calibrated on Wan2.1-1.3B (R² = 0.998) and **Θ_peak = 989 TFLOP/s** (H100 dense BF16).
  - Energy `E ≈ P_max · D` with **P_max ≈ 700 W**.
- **Model error versus measurement (mean percentage error):** resolution scaling 11.6% (energy) / 14.0% (latency); frame scaling 6.6% / 10.5%; step scaling **1.9% / 1.9%**.
- **Scaling regimes:** quadratic in spatial and temporal size (doubling H *and* W gives up to 16× in the attention term), and linear in steps. Resolution was swept from 256×256 to 3520×1980, frames from 4 to 100, and steps from 1 to 200.
- **Comparison with other tasks:** 0.002 Wh (text classification), 0.047 Wh (text generation) and 2.9 Wh (image generation) per query. By comparison, Wan2.1-1.3B's roughly 90 Wh per video is "roughly 30× more costly than image generation, 2,000× than text generation".
- **Compute-bound thresholds:** ℓ* = 295 (attention) and 590 (MLP) on H100. Actual runs have ℓ ≫ 10⁴, so all tested accelerators are compute-bound (Table 7).
- **Limitations stated by the authors:** single hardware platform; the Diffusers implementation lacks caching and quantization (the Wan report cites 1.62× from caching and ~1.27× from FP8/INT8); **audio is not explored**.
- ⚠ **Constant mismatch:** Appendix Table 5 lists Wan2.1-1.3B as d = 2048, N = 32. The official config is `dim = 1536, num_layers = 30`. Because μ is calibrated against the paper's own FLOP formula, **μ = 0.456 is not transferable** to other FLOP counts.

**Follow-up by the same group (found):** Jegham, Gamazaychikov & **Luccioni** (Sustainable AI Group), "Lights, Camera, Carbon" (arXiv 2607.04553 v1, 5 Jul 2026), covered in §2.3 and §2.8. Delavande has no other paper listed on his Hugging Face profile. I could not search further (budget exhausted).

### 2.2 ML.ENERGY Leaderboard v3.0 (GPU-only, Zeus/NVML)

Sources:
- Raw data: `https://ml.energy/leaderboard/data/tasks/text-to-video.json` and `.../text-to-image.json`. Data `last_updated` 2026-02-16; Benchmark v3.0 released Dec 2025. **Primary · High**
- Blog: "Diagnosing Inference Energy Consumption with the ML.ENERGY Leaderboard v3.0" (J.-W. Chung, 29 Jan 2026; also arXiv 2601.22076, "Where Do the Joules Go?").
- Benchmark paper: arXiv 2505.06371 (NeurIPS 2025 Datasets & Benchmarks track).

Scope notes:
- v3 covers 46 models across 7 tasks, with 1,858 configurations on H100 and B200. Diffusion models run on xDiT 0.4.5.
- v3 includes **text-to-video but no image-to-video task**. The benchmark paper lists older I2V models (I2VGen-XL, SVD, SVD-XT) from earlier versions.
- The leaderboard's `fps` field (15 or 8) does not match native frame rates. Output seconds below use native fps.

| Model | Res | Frames | Steps | 1×H100, batch 1: GPU Wh / latency / avg W | 1×B200, batch 1 | 8-GPU batch 1 (fastest) | GPU Wh per output-s (H100) |
|---|---|---|---|---|---|---|---|
| Wan 2.1 1.3B | 832×480 | 81 | 50 | 18.0 Wh / 95 s / 678 W | 17.1 Wh / 74 s / 831 W | 8×H100: 21 s, 26.8 Wh | 3.6 |
| Wan 2.1 14B | 832×480 | 81 | 50 | 80.3 Wh / 467 s / 620 W | 85.2 Wh / 334 s / 918 W | 8×H100: 72 s, 106.8 Wh; 8×B200: 54 s, 101.5 Wh | 15.9 |
| HunyuanVideo 13B | 1280×720 | 129 | 50 | **323.4 Wh** / 1689 s / 689 W | 322.3 Wh / 1384 s / 839 W | 8×H100: 270 s, 369.8 Wh; 8×B200: 205 s, 388.0 Wh | **60.2** |
| CogVideoX 2B | 720×480 | 49 | 50 | 7.9 Wh / 43 s / 665 W | 7.5 Wh / 35 s / 780 W | — | 1.3 |
| CogVideoX 1.5 5B | 1360×768 | 81 | 50 | **93.2 Wh** / 496 s / 676 W | 90.3 Wh / 393 s / 826 W | 8×H100: 92 s, 104.9 Wh | 18.4 |

- Blog: "Generating a single video consumes **26 kJ to 1.16 MJ**" (7.2–322 Wh), which is "one to two orders of magnitude more than images".
- B200 versus H100 at matched latency (text-to-video): B200 wins 11 of 14 comparisons, with a **median 4% energy reduction** (range 6% more to 8% less).
- **Batching gives no per-video saving.** Wan 1.3B on B200 uses 17.1 Wh at batch size 1 and 16.9 Wh at batch size 8.
- **Multi-GPU (8×) versus single GPU at batch 1:** HunyuanVideo +14% (H100) and +20% (B200); Wan 14B +33% (H100).
- **Text-to-image, GPU J per 1024² image (1×H100, batch 1):** SANA 1.5 1.6B 417 J (20 steps); SANA 4.8B 1,181; PixArt-Σ 714; SD3.5 Medium 1,581 (28 steps); SD3.5 Large 4,420; Hunyuan-DiT 1.2 5,181 (50 steps); **FLUX.1-dev 7,949 J = 2.2 Wh** (50 steps).
- Benchmark paper: GPUs are "50–70% of the total provisioned power in the datacenter". Diffusion models "consume nearly the maximum power of the GPU". In the SVD-XT timeline, each denoising step peaks at TDP and decode draws less.

### 2.3 Jegham, Gamazaychikov & Luccioni (2026), "Lights, Camera, Carbon" — measured open models

Source: arXiv 2607.04553 v1 (5 Jul 2026), https://arxiv.org/abs/2607.04553 · **Primary · High** for the measured values.

Setup:
- Measurement: **GPU-only**, pyNVML sampled every 100 ms.
- Hardware: 8×H200 DGX (8H2, 5.6 kW GPU TDP), 1×H200 (0.7 kW) and 1×B200 (1 kW).
- Models: HunyuanVideo 13B, HunyuanVideo-1.5 8.3B, LTX-2 19B (text-to-video and text-to-video+audio), Wan 2.2 27B (MoE, 14B active) and Wan 2.1 14B.
- Prompts: Artificial Analysis prompt list. Total cost of the experiments: 17 GPU-hours, 61.9 kWh GPU.

| Finding | Value | Scope |
|---|---|---|
| Range across configs | 2.95 Wh (3-s LTX-2 text-to-video at 1024p, B200) to 3,364.6 Wh (23-s Wan 2.2 at 720p, 50 steps, 8×H200) | GPU-only |
| 5-s, 40-step comparison | LTX-2 text-to-video at 1024p: 9.1 Wh (B200); HunyuanVideo-1.5 at 720p: 57.5 Wh; Wan 2.1 / 2.2 at 720p: 113.9 / 114.8 Wh | B200 (inferred from coefficients) |
| 8-s 720p, 40 steps | Wan 2.2 on 1×H200: 390 Wh; HunyuanVideo-1.5 on 8×H200: 478.5 Wh | GPU-only |
| Fig. 2 (8×H200, 720×1280, 40 steps; 121 / 193 / 241 frames) | HunyuanVideo 186 / 411 / 609 Wh; HunyuanVideo-1.5 213 / 479 / 706; Wan 2.1 383 / 855 / 1270; Wan 2.2 383 / 856 / 1275 | Doubling the frame count raises energy ≈3.3× |
| Power as % of TDP | Denoising: 98.8–98.9% (B200), 98.5–98.6% (H200), 97.8–98.1% (8×H200). Whole pipeline: 80.9–98.7%. VAE with tiling: as low as 71.6% (HunyuanVideo). Wan VAE: 90.4–96.1% TDP and only 0.83–3.43% of energy. HunyuanVideo VAE: 4.2–25.8% of energy | GPU |
| Batch size (HunyuanVideo, 720p, 30 steps, 121 frames) | 146.1 Wh (batch 1), 141.3 (batch 2), 144.2 (batch 4) per video, so energy is **linear in batch** | GPU |
| Multi-GPU penalty (121 frames, 40 steps; 8×H200 vs 1×H200) | Wan 2.1: 383 vs 345 Wh; Wan 2.2: 383 vs 349; HunyuanVideo-1.5: 215 vs 177 (+10% to +21%). 8 GPUs run ≈8× faster | GPU |
| Audio | LTX-2 text-to-video+audio overhead comes from a **third multimodal CFG pass**, not the audio tokens. The audio waveform takes <0.1 s per 10 s of audio | — |
| Parameters versus energy | HunyuanVideo-1.5 (8.3B) uses more energy than HunyuanVideo (13B). Wan 2.1 uses ~2× HunyuanVideo at a similar active size, so **parameter count is not a predictor** | — |

⚠ **Internal inconsistency I found.** The "57.5 Wh for 5 s at 720p" HunyuanVideo-1.5 figure matches the paper's own B200 coefficients only for **81 frames** (57.47 Wh). At the model's native 24 fps, a 5-s clip is 121 frames, which gives **115.7 Wh**. Its other quoted values reproduce exactly from the coefficients (177 Wh and 214.7 Wh; see §2.4).

### 2.4 Fitted scaling-law coefficients (Jegham et al. 2026, Table 2) — reusable formula

Formula: `E_GPU[Wh] = S·B·(N1·T² + M·T) + G·B` (+ `N2·(W·H)²·F·B` for HunyuanVideo's VAE attention; LTX-2 uses `+N2·T²·B` for its second stage). Here `T = H·W·F/1000`, `F = L·fps + 1`, `S` = steps and `B` = batch size. Accuracy: MAPE 0.007–3.1%; leave-one-out cross-validation MAPE ≤ 3.2%.

| HW | Model | N1 | M | N2 | G (Wh) |
|---|---|---|---|---|---|
| 8×H200 | HunyuanVideo | 2.40E-10 | 8.5E-06 | 3.20E-13 | 0.22 |
| 8×H200 | HunyuanVideo-1.5 | 3.00E-10 | 1.05E-05 | – | 18.61 |
| 8×H200 | Wan2.1 | 5.25E-10 | 2.52E-05 | – | 9.52 |
| 8×H200 | Wan2.2 | 5.36E-10 | 2.32E-05 | – | 12.93 |
| 1×H200 | HunyuanVideo-1.5 | 2.82E-10 | 8.29E-06 | – | 0.00 |
| 1×H200 | Wan2.1 | 5.42E-10 | 1.64E-05 | – | 2.29 |
| 1×H200 | Wan2.2 | 5.48E-10 | 1.67E-05 | – | 1.85 |
| 1×H200 | LTX-2 T2VA | 4.56E-13 | 7.79E-07 | 1.83E-11 | 1.00 |
| 1×H200 | LTX-2 T2V | 4.56E-13 | 6.47E-07 | 1.83E-11 | 0.56 |
| 1×B200 | HunyuanVideo-1.5 | 1.88E-10 | 4.46E-06 | – | 2.25 |
| 1×B200 | Wan2.1 | 3.31E-10 | 1.31E-05 | – | 0.94 |
| 1×B200 | Wan2.2 | 3.33E-10 | 1.32E-05 | – | 1.07 |
| 1×B200 | LTX-2 T2VA | 2.29E-13 | 6.11E-07 | 1.35E-11 | 1.01 |
| 1×B200 | LTX-2 T2V | 2.29E-13 | 5.00E-07 | 1.35E-11 | 0.65 |

**My evaluation of these coefficients** (GPU-only, S = 40 steps, B = 1, native fps; 480p = 854×480, 720p = 1280×720, 1080p = 1920×1080). **Derived · Medium.** Values extrapolated to 1080p go beyond the paper's tested range.

| Model / HW | 5 s: 480p / 720p / 1080p (Wh per clip) | Wh per output-s at 5 s | 10 s: 480p / 720p / 1080p (Wh) | Wh/s at 10 s |
|---|---|---|---|---|
| Wan2.2 on 1×H200 | 48 / 174 / 732 | 9.6 / 34.8 / 146 | 141 / 584 / 2,668 | 14.1 / 58.4 / 267 |
| Wan2.2 on 1×B200 | 33 / 115 / 466 | 6.7 / 22.9 / 93 | 94 / 373 / 1,662 | 9.4 / 37.3 / 166 |
| HunyuanVideo-1.5 on 1×H200 (24 fps) | 44 / 177 / 793 | 8.8 / 35.4 / 159 | 143 / 630 / 2,983 | 14.3 / 63.0 / 298 |
| HunyuanVideo-1.5 on 1×B200 | 30 / 116 / 520 | 5.9 / 23.1 / 104 | 93 / 413 / 1,969 | 9.3 / 41.3 / 197 |

LTX-2 at 720p, 121 frames on 1×H200: text-to-video 3.90 Wh versus text-to-video+audio 4.93 Wh at 40 steps (**audio +26%**). At 8 steps: 1.41 versus 1.97 Wh (+40%).

These coefficients describe **undistilled, full-attention open models with vanilla serving**. They are an **upper-bound regime** for optimized commercial services.

### 2.5 Image-generation energy (context)

| Source | Value | Scope | Date | Primary? | Confidence |
|---|---|---|---|---|---|
| Luccioni, Jernite & Strubell, "Power Hungry Processing" (arXiv 2311.16863; FAccT '24) | Image generation **mean 2.907 kWh per 1,000 inferences** (std 3.31), i.e. 2.9 Wh/image. Least efficient (SDXL-base): 11.49 kWh/1,000, or 11.5 Wh/image and 1,594 gCO₂e/1,000. Text classification 0.002; text generation 0.047; summarization 0.049; captioning 0.063 kWh/1,000 | 8×A100-SXM4-80GB node (AWS us-west-2, 297.6 gCO₂e/kWh); CodeCarbon **GPU+CPU+RAM**; no batching; 8 image models (SD 1.4/1.5/2.1, SDXL, etc.) | Nov 2023 / Jun 2024 | Primary | High |
| Hugging Face AI Energy Score, image-generation CSV (GPU kWh per 1,000 queries = Wh/image) | SDXL-base 1.640; Stable Cascade 1.214; epiCPhotoGasm 0.587; dreamlike-photoreal 0.581; SD 2.1 0.534; SDXL-turbo 0.386; LCM-Dreamshaper 0.322; openjourney-v4 0.203; sd-turbo 0.190; mitsua 0.187 | H100-80GB, **GPU-only** | v1 Feb 2025; v2 4 Dec 2025 | Primary | High |
| AI Energy Score coverage | 10 tasks, including image generation. **No video generation**; video is listed only as a "future iteration" | — | Dec 2025 | Primary | High |
| ML.ENERGY v3 text-to-image | 0.1–2.2 Wh per 1024² image (see §2.2) | H100/B200 GPU-only | Feb 2026 | Primary | High |
| MIT TR (SD3 Medium 2B, 1024²) | 1,141 J GPU → **2,282 J total** (×2) at 25 steps; ~4,402 J total at 50 steps | H100, GPU×2 | 20 May 2025 | Primary (journalism with measurement) | High (for what it measures) |
| Google Gemini paper | No image or video figures | — | Aug 2025 | Primary | High |

### 2.6 Official speed and hardware disclosures, converted to GPU-seconds and energy per output second

GPU-s/out-s = `N_GPU × latency / output duration`. Wh/out-s = GPU-s/out-s × 0.9 × TDP / 3600 (**derived · Medium** unless the row says measured).

Validation of the 0.9×TDP method: ML.ENERGY HunyuanVideo on H100 derives to 55.0 Wh/s versus 60.2 measured (−9%). Wan2.1-14B at 480p: 16.1 versus 15.9 (+1%). CogVideoX1.5: 17.2 versus 18.4 (−7%). Delavande Wan2.1-14B: 64.8 versus 71.1 (−9%).

| Model (source) | HW × N | Latency (s) | Output (res, frames, s) | Steps / NFE | GPU-s per out-s | Wh per out-s (GPU) | Notes |
|---|---|---|---|---|---|---|---|
| **Seedance 1.0** (tech report 2506.09113) | **L20 × ? (not stated)** | **41.4** | 1080p, 5 s | distilled (TSCD + RayFlow + APT; ">10×") | 66 if 8×L20; 33 if 4×L20 | **4.6 if 8×L20**; 2.3 if 4×L20; 11.6 *if* 8×H800 | GPU count unknown. The FLOP check (§3.4) points to multi-GPU (≥4, likely ~8). Low confidence for energy |
| Wan2.1-T2V-14B (GitHub README) | H100 × 1 | 1837.9 | 1280×720, 81 frames, 5.06 s | 50 × CFG 2 | 363 | 63.5 | 1-GPU runs use `--offload_model True` |
| same | H100 × 8 | 287.9 | same | same | 455 | 79.6 | FSDP + Ulysses |
| same | **H20 × 1** | 6935.5 | same | same | 1,370 | **137** | H20 is 3.77× slower than H100 → **~2.2× energy** |
| same | H20 × 8 | 980.5 | same | same | 1,549 | 155 | |
| Wan2.1-I2V-14B (README) | H100 × 1 / × 8 | 1491.6 / 238.8 | 720p, 81 frames | 40 × 2 | 295 / 378 | 51.6 / 66.1 | Image-to-video ≈ text-to-video cost per step |
| Wan2.1-T2V-1.3B (README) | RTX 4090 × 1 | 261.4 | 480p, 81 frames | 50 × 2 | 52 | 5.8 (450 W TDP) | "about 4 minutes" |
| Wan2.2-T2V-A14B (README; MoE 27B total / 14B active) | H100 × 1 | 326.9 / 1041.5 | 832×480 / 1280×720, 81 frames | 40 × 2 | 64.6 / 206 | 11.3 / 36.0 | FA3 on Hopper |
| same | H100 × 8 | 51.5 / 155.1 | 480p / 720p | same | 81 / 245 | 14.2 / 42.9 | |
| same | H20 × 1 | 1133.9 / 4048.7 | 480p / 720p | same | 224 / 800 | 22.4 / 80.0 | |
| same | H20 × 8 | 170.5 / 564.7 | 480p / 720p | same | 270 / 892 | 27.0 / 89.2 | |
| same | A100 × 1 | 785.7 / 2735.7 | 480p / 720p | same | 155 / 540 | 15.5 / 54.0 (400 W) | |
| Wan2.2-TI2V-5B (README; VAE 4×32×32) | RTX 4090 × 1 | 534.7 | 1280×704, 121 frames, 5.04 s | 50 × 2 | 106 | 11.9 | Consumer GPU |
| HunyuanVideo-1.5 8.3B (README, "basic engineering-level acceleration") | **H800 × 8** | 13.90 | 848×480, 121 frames, 5.04 s | 50 | 22 | **3.9** | |
| same | H800 × 8 | 28.33 (sparse: 26.41) | 1280×720, 121 frames | 50 | 45 (42) | **7.9 (7.3)** | Roughly 5× faster than the vanilla run in Jegham et al. |
| same | H800 × 8 | 96.78 (sparse: 58.39) | 1280×720, 241 frames, 10.04 s | 50 | 77 (47) | 13.5 (8.1) | SSTA sparse attention gives 1.66× at 10 s |
| HunyuanVideo 13B (README, xDiT) | GPU type not stated × 1 / × 8 | 1904.08 / 337.58 | 1280×720, 129 frames, 5.4 s | 50 (guidance-distilled) | 354 / 502 | 62 / 88 (if H100) | Measured: 323 Wh on 1×H100 (ML.ENERGY) |
| Kandinsky 5.0 Video Pro 19B (arXiv 2511.14993, Table 5) | H100 × 1 | 1241 (Flash 16 NFE: **235**) | 1280×768, 121 frames, 5 s | 100 NFE (16) | 246 (47) | 43.1 (**8.2**) | Distillation from 100 to 16 NFE gives 5.3× |
| same | H100 × 1 | 560 (Flash: 123) | 768×512, 121 frames | 100 (16) | 111 (24) | 19.4 (4.3) | |
| same, 10 s | H100 × 1 | 3218* (Flash: 576*) | 1280×768, 241 frames | 100 (16) | 320 (57) | 56.0 (10.0) | *With offloading |
| Kandinsky 5.0 Video Lite 2B | H100 × 1 | 139 (Flash: 35) | 768×512, 121 frames | 100 (16) | 28 (7) | 4.8 (1.2) | |
| Step-Video-T2V 30B (README) | 4 × 80 GB (assumed H100/H800) | 743 (w/ flash-attn) | 992×544, 204 frames, ~8.2–8.5 s (fps not verified) | 50 × CFG | 350–364 | 61–64 | Plus a dedicated GPU for the text encoder and VAE (not counted). 768×768×204 frames: 860 s |
| Open-Sora 2.0 11B (arXiv 2503.09642) | 1 GPU (H200 implied) | **162** (Video DC-AE) versus 1,656 (HunyuanVideo VAE) | 768px, 5 s, 24 fps | 50 | 32 | 5.6 | Tokens drop from 76K to 19K (VAE 4×32×32), giving ">10×" speed |
| MAGI-1 24B (arXiv 2505.13211) | **H100/H800 × 24** | 0.98 s per 1-s chunk (real-time) | 480p (3:4), streaming | 16 steps, W8A8 FP8 | **24** | **4.2** | "~9 PFLOPS of compute per second of video"; TTFC 2.3 s |
| LTX-Video <2B (arXiv 2501.00103) | H100 × 1 | **2.0** | 768×512, 121 frames, 5 s | 20 | 0.4 | 0.07 | "Faster than real time". Delavande measured 9.7 s and 3.16 Wh at 40 steps and 512×704 |
| LTX-2 19B (arXiv 2601.03233) | H100 × 1 | 1.22 s/step (Wan 2.2-14B: 22.30 s/step) | 720p, 121 frames, with audio | — | — | — | ~18× faster than Wan 2.2. Measured 9.1 Wh for 5 s at 1024p on B200 (Jegham) |
| Mochi 1 10B (README) | ≥1 H100 (~60 GB VRAM) | — | 480p | — | — | 16.0 (measured, Delavande) | |

Wan's own optimization factors (Wan tech report, arXiv 2503.20314):
- Diffusion caching **1.62×**.
- FP8 GEMM 1.13× on the DiT.
- 8-bit FlashAttention **95% MFU on H20** and >1.27×. This is evidence that **H20 is a production target**.

### 2.7 MiniMax H3 (Hailuo 3.0) measured serving latencies — the best Hailuo-class proxy

**Model card** (https://huggingface.co/MiniMaxAI/MiniMax-H3; repo created 28 Jul 2026, launched 31 Jul 2026; open weights under the MiniMax H3 Community License). **Primary · High.**

- **Transformer:** "H3-Omni-Transformer is a **33B-parameter dense, single-stream Transformer**, with approximately **13B parameters residing in AdaLN-related branches**" (precomputable). Config: hidden 5376, 50 layers, 56 heads × 128, FFN 14336 (SwiGLU). That gives **≈19.3B compute parameters** (my count).
- **Encoders and VAEs:** text/visual encoder = full **Qwen3-VL-32B** (hidden state from layer 50; ≈62 GB). Visual VAE f16t4d24 + 1×2×2 patchify (effectively **32× spatial, 4× temporal**). Audio VAE: 32 kHz stereo, 40 Hz latents per channel.
- **Distillation and attention:** checkpoints are **CFG/guidance-distilled** (one forward pass per step). Production uses **native sparse attention**; the open release is full-attention only.
- **Output:** 4–15 s at 24 fps; default short edge **768** (trained canvas 1344×768). **2K comes from "H3-Regenerate-2K"**, which feeds the 768p result back into H3 to regenerate it at 2K (not open-sourced).
- **Resolution/speed note (diffusers docs):** "960x544 runs about **2.3× faster per step** than the trained 1344x768."
- **Pricing** (MiniMax pay-as-you-go page, fetched 25 Sep 2026): H3 **$0.08/s at 768p, $0.13/s at 2K**. H3-Max $0.05/s at 480p and $0.08/s at 768p. Legacy Hailuo-02: 512p 6 s $0.10; 768p 6 s $0.28 and 10 s $0.56; 1080p 6 s $0.49. "Audio materials … Free."
- **Official MiniMax H3 blog** (31 Jul 2026): context sources of "around 100K tokens … distilled down to an average of roughly 4K tokens"; H3-VAE gives a "4× gain in effective sequence length"; training throughput "+~30%". No energy, time or parameter data.

**SGLang cookbook** (https://docs.sglang.io/cookbook/diffusion/MiniMax/MiniMax-H3, fetched 25 Sep 2026). Workload: **1344×768, 124 frames (5.167 s) at 24 fps with audio, 50 steps**, video/audio flow shift 12/3, batch 1. **Primary (framework maintainers' measurements) · High** for latency; energy derived (Medium).

| Config | Latency | GPU-s per out-s | Wh per out-s (GPU, 0.9×TDP) |
|---|---|---|---|
| **4×H200, Ulysses4, BF16, warm-up matched** | denoise 71.73 s + decode 1.32 s = **74.38 s end-to-end** (84.14 s with default warm-up) | 57.6 | **10.1** |
| 4×H200, TP2 + Ulysses2 | 78.33 s | 60.6 | 10.6 |
| 8×H200, Ulysses8 | 0.749 s per step (text-to-video+audio) → ~37.5 s denoise | ~58 | ~10 |
| **8×B300, FL2VA, BF16** | **19.04 s** | 29.5 | **8.1** (1,100 W TDP assumed) |
| 8×B300, FL2VA, FP8 | 18.03 s | 27.9 | 7.7 |
| 8×B300, Ref2VA (reference-conditioned), BF16 / FP8 | 29.12 / 27.12 s | 45.1 / 42.0 | 12.4 / 11.6 (**+53% versus FL2VA**) |
| 4×GB300 (client-observed) | 33.10 s | 25.6 | 9.0 (1,400 W TDP assumed) |
| 8× Ascend NPU (TP2 + SP4, Cache-DiT) / 4× NPU | 55.07 s / 103.57 s | — | — |
| 16×H200 across nodes (U8 × Ring2) | 0.477 s per step (−36% versus 8 GPUs). Video-to-video / Ref2VA: 2.572 → 1.494 s per step | — | Video-to-video costs **3.4× per step** versus text-to-video+audio |
| **FastH3** (FastVideo community 4-step distill + VSA sparsity 0.9), 4×B300 | 5 s: **4.1 s**; 10 s (243 frames): 8.0 s; 15 s (362 frames): 13.3 s (faster than real time) | 3.2 / 3.2 / 3.5 | **0.87 / 0.87 / 0.97** |
| VDN-H3 (OpenVDN community 8-NFE + hybrid window attention), 8×B200, 14.375 s (345 frames, ~104k rows) | 0.88 s/NFE; ~8.7 s per request | 4.8 | 1.2 |

Sanity check (derived): my FLOP count for H3 at 5 s and 768p is ≈38.5k packed rows per forward. Linear layers take 1.48e15 FLOPs and attention 2.12e15, so ×50 steps ≈ **1.8e17 FLOPs**. Running that in 71.73 s on 4×H200 implies **~64% MFU** (dense BF16). That is consistent with a compute-bound run near TDP.

### 2.8 Third-party estimates for proprietary models

**Jegham et al. (2026), §4.4 and Appendix E (GPU/accelerator-only; Monte Carlo on P ~ N(0.9·TDP, (0.05·TDP)²))**

- Latency: minimum of 3 fal.ai API runs per configuration.
- Hardware assumptions: **Seedance 1 and 1.5 on DGX H800 (8×700 W)**; Veo on a TPU v6e node (2.173 kW); Sora 2 Pro and Gen-4.5 on 8×B200 or 8×H200 (equal weights).
- Values below come from Fig. 5 and the text. **Primary (their estimate) · Medium.**

| Model | 720p 4 s | 720p 5 s | 720p 6 s | 720p 8 s | 720p 10 s | 1080p 4 s | 1080p 6 s | 1080p 8 s | Wh per out-s (720p) |
|---|---|---|---|---|---|---|---|---|---|
| **Seedance 1** (video only) | — | **56.6** | — | **80.0 (72.1–87.9)** | **98.8** | — | — | **114.2** | 9.9–11.3 (1080p 8 s: 14.3) |
| **Seedance 1.5** (with audio) | — | **64.6** | — | **102.1** | **136.7** | — | — | — | 12.8–13.7 |
| Veo 3 | 23.2 | — | 27.2 | 30.8 (19.8–43.4) | — | 36.4 | 46.7 | ~55 (bar unlabeled) | 3.9–5.8 |
| Veo 3 Fast | 20.8 | — | 24.1 | 27.6 | — | 32.8 | 42.3 | ~50 (unlabeled) | 3.5–5.2 |
| Veo 3.1 | 25.4 | — | 32.4 | 39.5 | — | 43.3 | 58.5 | 74.7 | 4.9–6.4 |
| Veo 3.1 Fast | 22.8 | — | 25.4 | 27.6–27.8 | — | 39.7 | 50.2 | 60.9 | 3.5–5.7 |
| Gen-4.5 (Runway) | — | 190.2 | — | 322.0 (241.6–410.9) | 417.7 | — | — | — | 38.0–41.8 |
| Sora 2 Pro | 199.4 | — | — | 418.5 (315.1–534.4) | — | 332.7 | — | 766.1; **12 s: 1,313** | 49.9–52.3 (1080p: 83–109) |

- Fit quality (MAPE / max): Seedance 1.0 3.08% / 8.57% (9 configs); Seedance 1.5 3.80% / 7.28% (5 configs); Gen-4.5 0.08%; Veo 8–11% (queue-contaminated).
- **Seedance formula forms used:**
  - Seedance 1 is modeled as a two-stage pipeline (480p base generation, then upscaling): `E = N1·F² + M·T + G`.
  - Seedance 1.5 uses **decoupled attention**: `E = N1·F² + M2·W·H² + G`.
  - Numeric coefficients are not published for proprietary models.
- The paper also claims OpenAI announced Sora's discontinuation in March 2026 (citing Futurism). I did not verify this.
- **Hailuo, Kling and Wan 2.5/2.6 are not estimated.**

**MIT Technology Review** — O'Donnell & Crownhart, "We did the math on AI's energy footprint", and the methodology companion, both 20 May 2025. https://www.technologyreview.com/2025/05/20/1116327/ai-energy-usage-climate-footprint-big-tech/ · https://www.technologyreview.com/2025/05/20/1116331/ai-energy-demand-methodology/ · **Primary journalism with commissioned measurement · Medium**

- Measurement: Sasha Luccioni, CodeCarbon, on "the same hardware as our text and image tests" (H100). "She reported the GPU energy demands, which we again doubled to estimate total energy demands" (the 50% rule of thumb, citing a 2024 Microsoft paper).
- **Older CogVideoX (Aug 2024; 8 fps, "grainy")**: **~109,000 J per video = 30.3 Wh total**, so ~15 Wh GPU. This is consistent with CogVideoX-2B/5B measurements of 7.9–21.6 Wh GPU.
- **Newer CogVideoX (Nov 2024 → CogVideoX1.5-5B; 5 s at 16 fps; 1360×768 by default)**:
  - Energy: **~3.4 MJ per 5-s video = 944 Wh total, so 472 Wh GPU**.
  - Quoted comparisons: ">30×" the old model; ">700×" a high-quality image; "a microwave for over an hour", "38 miles on an e-bike".
  - ⚠ Conflict: ML.ENERGY measured **93.2 Wh GPU** for CogVideoX1.5-5B (5 s, 1×H100, 496 s), and the model card says "Single H100: ~550 seconds (5-second video)". MIT TR's figure is **≈5× higher**. The cause is undetermined. Candidate explanations, all hypotheses: the model-card example code enables `pipe.enable_sequential_cpu_offload()` and VAE tiling/slicing ("disabling optimizations can … increase speed by 3–4 times"); CodeCarbon may have counted idle GPUs on a multi-GPU node; or the output length or settings differed. Andy Masley reports "a lot of people … skeptical that the number's this large".
- MIT TR scenario: 15 text questions, 10 images and **three 5-s video attempts** ≈ **2.9 kWh**. MIT TR adds: "AI companies have defended these numbers saying that generative video has a smaller footprint than the film shoots and travel that go into typical video production. That claim is hard to test."
- Carbon intensity used: 402.49 gCO₂e/kWh (US average; data centres 48% higher).

**Other third-party material**

- **Factorial Funds, "Under the hood: How OpenAI's Sora model works"** (M. Plappert, Mar 2024): the URL now returns 404, the blog has been removed from factorialfunds.com, and the Wayback Machine is blocked by this session's proxy. **Not verified; do not use its numbers without re-checking.**
- **Futurism** (V. Tangermann, 25 Sep 2025) reports on Delavande et al. and repeats Google's claim that "users had created over 40 million videos in just seven weeks" with Veo 3. Its paraphrase "doubling length quadruples energy" is the upper-bound regime; measured values are ≈3.3× for full attention and ≈2× for sparse attention.
- **Epoch AI**, "How much energy does ChatGPT use?" (7 Feb 2025): 0.3 Wh per query. Assumes "H100 clusters can consume up to ~1500 W per GPU due to the overhead costs of servers and data centers" and ~70% of TDP for LLMs. It explicitly does **not** cover image or video.
- **Not surveyed** because the search budget ran out: SemiAnalysis, Epoch pieces on video, The Verge / Wired / Guardian coverage, and academic "carbon footprint of AI video" papers beyond Delavande, Jegham and Li et al. 2024.

### 2.9 Seedance and Hailuo disclosures (architecture, parameters, acceleration)

| Model | Date | Parameters | Architecture | Output specs | Audio | Acceleration | Compute disclosure | Source (primary unless noted) |
|---|---|---|---|---|---|---|---|---|
| Seaweed-7B (ByteDance Seed; Seedance's precursor) | 11 Apr 2025 | 7B | DiT; VAE (4,16,16) or (4,32,32) | — | No | TSCD → ~24 NFE; CFG distillation (1 NFE per step); adversarial training → **8 NFE** | Training **665,000 H100 GPU-h** (27.7 days on 1,000 H100); MFU 38% | arXiv 2504.08685 |
| **Seedance 1.0 (Pro)** | 10 Jun 2025 (v2 28 Jun) | **Not disclosed** | MMDiT with **decoupled spatial and temporal layers** (windowed temporal attention); VAE (4,16,16), C = 48, no patchify; **cascade: 480p base → diffusion refiner to 720p/1080p**; prompt-rewrite LLM (Qwen2.5-14B) | Up to 1080p, 5–10 s (trained on 3–12 s clips) | No | ">10× … multi-stage distillation" (TSCD 4× alone; RayFlow; APT); thin VAE decoder 2×; kernel fusion +15%; fine-grained mixed-precision quantization; sparse attention; hybrid context parallel (communication at 1/4 of Ulysses); FP8 communication; AsyncOffloading for memory-limited devices | **"5-second video at 1080p … 41.4 seconds (NVIDIA-L20)"**; GPU count **not stated** | arXiv 2506.09113 |
| Seedance 1.0 Pro Fast | ~Oct 2025 | — | Same family | 480p/720p/1080p, 2–12 s, 24 fps | No | "30–60% faster inference", "~60% reduced compute cost vs Seedance 1.0 Pro" | — | Replicate model page (**secondary / vendor**). Other secondary claims of "3× faster, 72% cheaper" **conflict** |
| Seedance 1.0 Pro billing | 1 Aug 2025 | — | — | — | — | — | Billing tokens = W×H×fps×duration/1024 (5 s: 48,600 tokens at 480p, 244,800 at 1080p); $2.50 per M tokens | BytePlus blog (primary for pricing) |
| **Seedance 1.5 pro** | 15 Dec 2025 (v3 23 Dec) | Not disclosed | **Dual-branch DiT** (video + audio) with cross-modal joint module | — | **Yes (native)** | ">10×" (distillation, quantization, parallel inference) | None | arXiv 2512.13507 |
| **Seedance 2.0** | CN release early Feb 2026; report 15 Apr 2026 | Not disclosed | "unified, highly efficient, and **large-scale** architecture for multi-modal audio-video joint generation" | **4–15 s; native 480p and 720p**; references: 3 video + 9 image + 3 audio | Yes | "Seedance 2.0 Fast" variant | None. Serves "billion-level daily active users" | arXiv 2604.14148 |
| **Seedance 2.5** | Announced 23 Jun 2026; released **31 Jul 2026**; API 7 Aug 2026 (secondary) | Not disclosed | Unified multimodal audio-video joint generation | **Up to 30 s per generation**, multi-round extension. Resolution not given officially (secondary: 4K; 3-minute beta long-video mode) | Yes (up to 10 audio references) | — | None | Seed blog (primary); kie.ai / others (secondary) |
| Hailuo 02 | 18 Jun 2025 | 3× Hailuo 01 (absolute undisclosed) | **NCR (Noise-aware Compute Redistribution)** | 768p 6/10 s; 1080p 6 s | No | "training and inference efficiency ×2.5 at comparable parameter scale"; 4× data | None | minimax.io news |
| Hailuo 2.3 / 2.3 Fast | 28 Oct 2025 | — | — | 768p / 1080p, 6 / 10 s | No | Fast variant: "faster generation, lower price, batch creation cost up to 50% lower" (Soochow Securities IPO report on MiniMax, 8 Jan 2026) | None | Secondary (Scenario, MindStudio, Soochow). Now listed as "legacy" by MiniMax |
| **MiniMax H3 (Hailuo 3.0)** | 31 Jul 2026 | **33B dense** (~13B AdaLN) | See §2.7 | 4–15 s, 24 fps, 768p base, 2K regenerate | Yes (32 kHz stereo) | CFG-distilled; native sparse attention in production | Open weights; third-party latencies (§2.7) | HF model card; SGLang cookbook |

### 2.10 Scaling evidence (for the calculator's resolution, duration, step, audio and reference factors)

| Factor | Evidence | Value | Source |
|---|---|---|---|
| **Steps** | Linear; error 1.9% | E ∝ S (plus fixed overhead) | Delavande 2025 |
| Fixed per-request overhead | Kandinsky: 100 → 16 NFE cuts time 5.3× (overhead ≈3% at 100 NFE). Wan VAE 0.8–3.4% of energy. HunyuanVideo VAE 4–26%. FastH3 decode ≈21% of 4.1 s | 3–25% of the clip (larger for distilled models) | Kandinsky 5; Jegham; SGLang |
| **Resolution (α in E ∝ pixels^α)**, full attention, single stage | Wan2.2 720P/480P time ratio 3.19 (H100×1), 3.01 (×8), 3.57 (H20) for 2.31× pixels | **α = 1.3–1.5** | Wan2.2 README |
| same | H3 at 960×544 is 2.3× faster per step than 1344×768 (1.98× pixels) | α ≈ 1.2 | Diffusers docs |
| same | HunyuanVideo-1.5 8×H800 720p/480p: 2.04 at 5 s, 3.57 at 10 s (2.26× pixels) | α = 0.87 (5 s), 1.56 (10 s) | HunyuanVideo-1.5 README |
| same | Kandinsky 5 Pro 1280×768 versus 768×512: 2.22 (100 NFE) and 1.91 (16 NFE) for 2.5× pixels | α = 0.87 / 0.71 | Kandinsky 5 Table 5 |
| **Cascaded / closed** | Seedance 1, 1080p/720p at 8 s: 1.43 | **α = 0.44** | Jegham |
| same | Veo 3, 1080p/720p: 1.57 (4 s), 1.72 (6 s) | α = 0.56–0.67 | Jegham |
| same | Sora 2 Pro: 1.67 (4 s), 1.83 (8 s) | α = 0.63–0.75 | Jegham |
| Price proxies (weak) | Hailuo-02 1080p versus 768p per second: 1.75 (1.98× pixels) → 0.82. H3 2K versus 768p: 1.63 (3.57× pixels) → 0.38 | — | MiniMax pricing |
| **Duration (β in E ∝ D^β)**, full attention, 720p | 121 → 241 frames (1.99×) gives 3.27–3.32× energy | **β ≈ 1.72–1.74** | Jegham Fig. 2 |
| same | HunyuanVideo-1.5 720p: 3.42× (dense) versus **2.21× (sparse)**; 480p: 1.95× | β = 1.79 / 1.15 / 0.97 | HunyuanVideo-1.5 README |
| same | Kandinsky 5 Pro: 1.97–2.59× for 10 s versus 5 s | β = 0.98–1.37 | Kandinsky 5 |
| Sparse or distilled | FastH3: 5 → 10 → 15 s gives 4.1 → 8.0 → 13.3 s | **β ≈ 1.0–1.07** | SGLang |
| **Closed models** | Seedance 1 (5 → 10 s, 720p): 1.75× → β = 0.80. Seedance 1.5: 2.12× → **β = 1.08**. Gen-4.5: 2.20× → 1.14. Sora 2 Pro (4 → 8 s): 2.10× → 1.07. Veo 3 (4 → 8 s): 1.33× → 0.41 (large fixed overhead or queue noise) | β ≈ 0.8–1.15 | Jegham |
| **Batch size** | No per-video saving (HunyuanVideo 146.1 / 141.3 / 144.2 Wh; ML.ENERGY Wan 1.3B 17.1 versus 16.9 Wh) | ×1.0 | Jegham; ML.ENERGY |
| **Multi-GPU** | +10% to +21% (Jegham, 8×H200); +14% to +33% (ML.ENERGY, 8× at batch 1) | ×1.1–1.3 versus 1 GPU | Jegham; ML.ENERGY |
| **Audio** | LTX-2 text-to-video+audio versus text-to-video: +26% (40 steps), +40% (8 steps), from the third CFG pass. H3 audio rows ≈3% of the sequence → ≲5% (my estimate; single stream, CFG-distilled). Seedance 1.5 versus 1.0 (+14% to +38%) is confounded by model changes | **×1.0–1.4** | Jegham; H3 card |
| **Reference / multimodal conditioning** | H3 Ref2VA versus FL2VA: +53% latency (8×B300). Video-to-video / Ref2VA versus text-to-video+audio per step: 3.4× (8×H200) | ×1.5 (multi-reference), up to ×3.4 (video-to-video) | SGLang |
| **Hardware** | H20 versus H100 (same software): 3.77–3.89× time → **~2.2× energy**. B200 versus H200: ~0.65× energy (Jegham coefficients). B200 versus H100: ~1.0× (ML.ENERGY, xDiT 0.4.5) | ×0.65–2.2 | Wan READMEs; Jegham; ML.ENERGY |
| **Distillation** | Kandinsky 100 → 16 NFE: 5.3×. HunyuanVideo-1.5 step distill: 75% faster (8–12 steps). Seaweed/Seedance: >10×. MAGI-1: 16 steps. FastH3: 50 → 4 steps + sparsity ≈ 18× lower GPU-seconds | ÷4 to ÷18 | Various primary |
| **VAE compression** | Open-Sora 2.0: 76K → 19K tokens gives >10× speed-up | — | arXiv 2503.09642 |

### 2.11 GPU power draw during diffusion, and overhead multipliers

| Item | Value | Scope | Source | Confidence |
|---|---|---|---|---|
| Denoising power, % of TDP | 98.8–98.9% (B200); 98.5–98.6% (H200); 97.8–98.1% (8×H200). Whole pipeline 80.9–98.7%. LTX-2: 80.9–81.1% (B200), 86.2–92.1% (H200) | GPU | Jegham 2026 | High |
| ML.ENERGY per-GPU average, text-to-video, batch 1 | H100 ×1: 0.89–0.98 TDP. H100 multi-GPU: 0.71–0.98. B200 ×1: 0.78–0.92. B200 multi-GPU: 0.63–0.92 | GPU | ML.ENERGY raw data (my calculation) | High |
| Delavande assumption | P_max ≈ 700 W (H100) held throughout | GPU | Delavande 2025 | High |
| Epoch (LLMs) | ~70% of TDP for LLM inference | GPU | Epoch AI 2025 | Medium |
| **Recommended GPU power** | **0.9 × TDP** (range 0.75–0.98) | GPU | This report | — |
| GPU share of GPU+CPU+RAM (diffusion) | 80–90% → ×1.11–1.25 | Server, CodeCarbon | Delavande | High |
| GPU share of provisioned DC power | 50–70% | Facility | ML.ENERGY paper | Medium |
| DGX H100/H200 system max | **10.2 kW** versus 8×700 W = 5.6 kW GPU TDP → ×1.82 at nameplate max | Server | NVIDIA DGX H100/H200 user guide | High |
| DGX B200 system max | **~14.3 kW** versus 8×1,000 W → ×1.79 at max | Server | NVIDIA DGX B200 page | High |
| Google full-stack (text LLM) | Accelerators 0.14 Wh; CPU & DRAM 0.06; idle machines 0.02; overhead (PUE) 0.02; **total 0.24 Wh → ×1.71 of accelerator**. Fleet PUE **1.09**. WUE **1.15 L/kWh** | Facility | Elsworth et al. (Google), arXiv 2508.15734 | High (for LLMs) |
| MIT TR rule of thumb | ×2 of GPU energy | Facility | MIT TR methodology | Medium |
| Epoch | "up to ~1500 W per GPU" for an H100 (700 W) including server and data-centre overhead → ≤ ×2.1 | Facility | Epoch AI | Medium |
| **Recommended facility multiplier** | **k_server 1.3 × k_idle 1.1 × PUE 1.2 = 1.72** (low 1.15 × 1.0 × 1.1 = 1.27; high 1.6 × 1.3 × 1.5 = 3.12) | Facility | This report (anchored on the rows above) | Medium |

### 2.12 Hardware reference values

| GPU | TDP (W) | Dense BF16 TFLOP/s | Source / status |
|---|---|---|---|
| H100 SXM | 700 (configurable) | 989 (NVIDIA lists 1,979 with sparsity); FP8 3,958 with sparsity | NVIDIA H100 page (verified) |
| H100 NVL | 350–400 | — | NVIDIA (verified) |
| H800 SXM | 700 | ≈ H100 (export variant; reduced NVLink) | Jegham App. E uses 700 W; standard |
| H200 SXM | 700 | 989 | Jegham App. B |
| B200 | 1,000 | ~2,250 (DGX B200: 72 PF FP8 sparse for 8 GPUs → 4.5 PF FP8 dense per GPU) | Jegham App. B; NVIDIA DGX B200 page |
| B300 (HGX) | ~1,100 (reported) | — | **Not verified this session** |
| GB300 | ~1,400 (reported) | — | **Not verified** |
| A100 SXM | 400 | 312 | Delavande Table 7 (peak); standard TDP |
| **H20** (China) | **400** (commonly reported) | ~148 (commonly reported); 96 GB HBM3 | **Secondary / not verified from NVIDIA.** Empirical: 3.8× slower than H100 on Wan |
| **L20** (China) | **275** (commonly reported) | ~119.5 FP16 dense (commonly reported); 48 GB GDDR6; Ada FP8 | **Secondary / not verified** |
| RTX 4090 | 450 | 330 | Delavande Table 7 (peak) |
| TPU v6e node (8 chips) | 2,173 W machine mean | — | Jegham, citing Schneider et al. 2025 |

### 2.13 Training compute and energy

Conversions to MWh are mine: `GPU-h × TDP × 0.8` average utilization, then ×1.72 for facility level. **Derived · Medium.**

| Model | Disclosed compute | GPU energy | Facility energy | Source / status |
|---|---|---|---|---|
| **Seaweed-7B** (Seedance precursor) | **665,000 H100 GPU-h** | ≈372 MWh | ≈640 MWh | arXiv 2504.08685 (primary, High for GPU-h) |
| **Open-Sora 2.0** (11B) | **4,160 H200 GPU-days = 99,840 GPU-h**; **$199.6k** at $2/GPU-h; up to 224 GPUs | ≈56 MWh | ≈96 MWh | arXiv 2503.09642 (primary) |
| **Meta Movie Gen** (30B) | Up to **6,144 H100 at 700 W**; SFT on 512 H100. GPU-hours not disclosed | ≈700 MWh if 1.25M H100-h | ≈1.2 GWh | arXiv 2410.13720 (primary for GPUs). 1.25M H100-h is the Open-Sora team's **estimate** (secondary) |
| Step-Video-T2V (30B) | "thousands of NVIDIA H800"; ~2,992 GPUs and ~500k H100-h (Open-Sora estimate) | ≈280 MWh | ≈480 MWh | arXiv 2502.10248 (primary, GPUs); estimate secondary |
| Wan, HunyuanVideo (1.5), MAGI-1, Kandinsky 5, LTX-2, Seedance 1.0–2.5, Hailuo / H3 | Not disclosed (MFU only: MAGI-1 66%, Kandinsky 58.8%, Step-Video 32%) | — | — | Primary reports checked |
| BLOOMz-7B (context) | Training 51,686 kWh + fine-tuning 7,571 kWh; breakeven ("cost parity") at **592.6M inferences** | — | — | Power Hungry Processing Table 5 |

### 2.14 Per-query context figures (non-video)

| Item | Value | Scope | Source |
|---|---|---|---|
| Median Gemini Apps text prompt | 0.24 Wh; 0.03 gCO₂e; 0.26 mL water (accelerator-only "existing approach": 0.10 Wh) | Full stack | Google, arXiv 2508.15734 (21 Aug 2025) |
| Average ChatGPT query | 0.34 Wh; 0.000085 gal water | Undisclosed scope | S. Altman, "The Gentle Singularity" (10 Jun 2025) |
| ChatGPT estimate | 0.3 Wh per typical query | Facility, estimated | Epoch AI (7 Feb 2025) |
| Llama 3.1 8B / 405B response | 57 J → 114 J total; 3,353 J → 6,706 J total | H100, GPU ×2 | MIT TR |

---

## 3. Methodology notes: how to use these numbers in the calculator

### 3.1 Recommended method: anchor × scaling × overhead

For each generated clip:

```
E_GPU,clip  = e720[class, scenario] × D × R(res) × Dur(D) × Stp × A_audio × Ref × H_hw
E_fac,clip  = E_GPU,clip × K_fac                         (K_fac = k_server × k_idle × PUE)
E_project   = Σ over all generations (including rejected takes) of E_fac,clip
              + training amortization (optional, see §3.5)
```

| Symbol | Meaning | Default (central) | Low / high |
|---|---|---|---|
| `e720` | GPU-only Wh per output-second at 720p for the model class (§3.2) | Seedance 10; Hailuo 5 | Seedance 2 / 35; Hailuo 1 / 20 |
| `D` | Output duration (s) | — | — |
| `R(res)` | Resolution factor versus 720p: Seedance-class `(px/px720)^α`; Hailuo-class from the table in §3.2 | α = 0.7 | α = 0.45 / 1.3 (use whichever is more extreme in the needed direction) |
| `Dur(D)` | Long-clip penalty: `(D/8)^(β−1)` for D > 8 s, otherwise 1 | β = 1.15 | 1.0 / 1.5 |
| `Stp` | Step multiplier (use only if the user overrides steps): `S/S_ref` on the ~90% of energy that is denoising | 1 | — |
| `A_audio` | Audio. The anchors already **include** audio for 2.x/H3-class models. Enter <1 only if the model runs video-only | 1.0 | 0.8 / 1.1 |
| `Ref` | Reference conditioning (multi-reference, video-to-video, extensions) | 1.0 (text/image-to-video) | 1.5 multi-reference; up to 3.4 video-to-video |
| `H_hw` | Hardware relative to the anchor (H800/H200-class) | 1.0 | 0.65 (Blackwell) / 2.2 (H20- or L20-class) |
| `K_fac` | Facility multiplier | 1.72 | 1.27 / 3.12 |

**Why this form?**

1. Every closed-model provider hides parameters, steps and hardware. Energy is (to within about 10%) `N_GPU × ~0.9·TDP × time`, and model size is *not* a reliable predictor (Jegham, Property 2). So the defensible unit is **measured or estimated GPU-seconds per output-second**, converted with TDP.
2. Scaling exponents measured on production pipelines (α ≈ 0.4–0.9, β ≈ 0.8–1.15) are far gentler than the theoretical quadratic of full attention. That matches what Seedance (cascade + decoupled attention) and H3 (native sparse attention) actually do.
3. Linear batch scaling and near-TDP operation mean per-video energy does not depend on how busy the provider is, apart from the idle/provisioning factor.

### 3.2 Class estimates (energy per second of generated video)

**Seedance-class (Seedance 2.x; primary model).** Derivation of `e720`:

- **Anchor A (third-party backward estimate).** Jegham et al.: Seedance 1 at 720p = 9.9–11.3 Wh/s; Seedance 1.5 (with audio) = 12.8–13.7 Wh/s. Both are GPU-only, assume 8×H800 at 0.9 TDP, and use API latency. Likely biases:
  - *Upward*: API latency includes prompt rewriting, safety checks, encoding and possible queueing; all 8 GPUs are assumed dedicated to one request.
  - *Downward*: CPU, idle capacity and PUE are excluded.
  - *Either direction*: the hardware might be L20 or H20, which draw 2.2–3.2 kW per node rather than 5.6 kW.
- **Anchor B (vendor self-report).** 41.4 s for 5 s at 1080p on L20s. On 8×L20 that is ≈4.6 Wh/s at 1080p, or ≈3 Wh/s at 720p using Seedance 1's own α = 0.44.
- **Anchor C (open-weight 2026 audio-video proxy).** H3 at 50 steps, full attention: 8–10 Wh/s at 768p. Distilled and sparse: ≈0.9–1.2 Wh/s.
- **Central.** The geometric mean of Seedance 1.0 under the L20 and H800 hardware readings is ≈7 Wh/s at 720p. Multiplying by **1.4 for Seedance 2.x** gives **≈10 Wh/s**. The 1.4 factor (range 1.0–2.0) is my **assumption**: a "large-scale" architecture plus native audio, supported by Seedance 1.5 coming in +14% to +38% over 1.0 in Jegham's estimates.
- **Low 2 Wh/s.** An optimized in-house deployment between Anchor B and FastH3-style distillation.
- **High 35 Wh/s.** Covers H20-class serving (×2.2) of a larger model, and matches Gen-4.5's range of 38–42 Wh/s.

**Hailuo-class (MiniMax H3 / Hailuo 2.3).** Derivation of `e720` (≈768p):

- **Measured baseline.** H3 open weights at 50 steps, BF16, full attention: **8–10 Wh/s** on H200 or B300 (§2.7).
- **Central 5 Wh/s.** Production uses native sparse attention. Attention is 59% of H3's FLOPs at 5 s and 768p (my FLOP model), so sparsity of 0.7–0.9 saves 1.6–2.1×. I assume no step distillation in the central case.
- **Low 1 Wh/s.** FastH3-like 4-step distillation plus sparsity on Blackwell (measured 0.87–0.97).
- **High 20 Wh/s.** 50 steps with full attention on H20-class hardware (≈10 × 2.2).

**Hailuo-class resolution factors** (from H3's architecture rather than α):
- **480p** = 0.40 × the 768p value (range 0.30–0.50). My FLOP model gives 0.28 (dense) to 0.38 (sparse); fixed overheads push the ratio up.
- **1080p/2K** = the 768p pass plus the "Regenerate-2K" pass: **×2.5** (range ×1.6, the price-ratio proxy, to ×4, a heavier regenerate).

**Table 3.2a — GPU-only, Wh per output second (low / central / high)**

| Class | 480p | 720p | 1080p |
|---|---|---|---|
| **Seedance-class** | 0.70 / **5.7** / 24 | 2.0 / **10** / 35 | 2.9 / **17.6** / 100 |
| **Hailuo-class** | 0.30 / **2.0** / 10 | 1.0 / **5.0** / 20 | 1.6 / **12.5** / 80 |

The low and high columns here are *bounding* values: I stacked the extreme `e720` with the extreme resolution exponent.

**Table 3.2b — Facility-level, Wh per output second** (central = GPU × 1.72; likely range = log-space root-sum-square of the `e720`, resolution and `K_fac` uncertainties)

| Class | 480p | 720p | 1080p | kWh per generated minute at 720p (central) |
|---|---|---|---|---|
| **Seedance-class** | **9.8** (1.8–40) | **17.2** (3.3–69) | **30.3** (5.8–132) | **1.03** (0.20–4.1) |
| **Hailuo-class** | **3.4** (0.65–16) | **8.6** (1.7–39) | **21.5** (3.9–104) | **0.52** (0.10–2.3) |

Per 5-s clip at 720p (facility, central): **Seedance-class ≈ 86 Wh; Hailuo-class ≈ 43 Wh.** For scale, that is roughly a 1,200-W microwave running for 4.3 and 2.2 minutes.

Caveat on comparing the two classes: the ~2× gap between the central values comes mostly from the **anchor method**. Seedance-class is anchored on backward estimates from API latency; Hailuo-class on measured open-weight GPU time with a production adjustment. **It is not evidence that Seedance is less efficient than Hailuo.** If the tool needs a single "generic frontier model" default, use **~7 Wh/s GPU-only (~12 Wh/s facility) at 720p**.

### 3.3 Scaling rules to expose in the calculator

- **Resolution.** Use `R = (px/px720)^α` with α = 0.7 central (0.45–1.3). 480p ≈ 0.57× and 1080p ≈ 1.76× the 720p per-second value. For 2K/4K "upscale" tiers, do **not** extrapolate α beyond 1080p. Seedance 2.5 4K and H3 2K almost certainly use an upscale or regenerate stage; use ×1.6–4 of the base pass.
- **Duration.** For single-pass clips up to ~10 s, treat energy as **linear in duration**. For longer single passes (Seedance 2.5 up to 30 s; H3 up to 15 s), apply `(D/8)^(β−1)` with β = 1.15 (1.0–1.5). A 30-s single pass then costs 1.22× per second at central and 1.94× at high. For clips assembled by **extension or multi-round** generation, sum the segments and apply `Ref` ×1.2–1.5 per extension for the context/reference tokens (**assumption**, supported by H3's +53% for reference conditioning).
- **Steps.** Linear. Production step counts for closed models are unknown; the anchors already embed them. Only use `Stp` for open models or user-specified settings.
- **Audio.** Seedance 1.5/2.x and H3 generate audio jointly, and the anchors include it. Offer "audio off" at ×0.8–1.0 only for models with a video-only mode. For video-only models (e.g. Seedance 1.0), adding audio costs ×1.1 central (1.0–1.4).
- **Takes (the dominant driver).** The calculator should make the **generation-to-final ratio** explicit. MIT TR's scenario assumed 3 attempts per 5-s clip. Jegham et al. cite reports that Coca-Cola's AI holiday ad involved "prompting and refining over 70,000 videos" (secondary, via The Verge; not verified).
- **Prompt rewriting and other LLM calls.** Seedance uses a Qwen2.5-14B prompt rewriter and H3 a hosted Context-IR pipeline. Each call costs ~0.1–2 Wh (Google 0.24 Wh; Llama 405B ~1.9 Wh GPU×2), under 5% of a clip. It can be ignored or added as +1 Wh per request.

### 3.4 Alternative bottom-up methods (for users with more information)

1. **Latency × power (preferred for closed models; Jegham, "Properties 1 and 3").** `E_GPU = N_GPU × f × TDP × t_gen`, with f = 0.9. Measure `t_gen` as the minimum of several API runs to strip queueing. The unknown `N_GPU` is the main risk: consumer latency expectations imply 4–8 GPUs per request.
   - Validation: this method reproduces measured energies within about ±10% (§2.6).
2. **FLOPs.** `E = FLOPs / (MFU × peak) × f × TDP`, with FLOPs ≈ `S × g × (2·P_compute·n + 4·L·n²·d_attn)`. For H3: P_compute ≈ 19.3B, L = 50, d_attn = 7168, n ≈ 38.5k rows at 5 s and 768p, giving 1.8e17 FLOPs and 64% MFU on H200.
   - Use MFU 0.4–0.65. **Do not reuse Delavande's μ = 0.456** with a different FLOP formula (§2.1).
   - Sanity check for Seedance 1.0's 41.4 s: a ~7B-class model running ~8 base NFE at 480p plus ~6 refiner NFE at 1080p, with decoupled attention, needs ~3.5e16 FLOPs. That implies ≥4 and more likely ~8 L20 GPUs at a plausible 40% FP8 MFU. **This is my illustrative assumption; Seedance's parameter count and NFE are undisclosed.**
3. **Fitted scaling law (open models only).** Use Jegham's coefficients (§2.4) for Wan, HunyuanVideo-1.5 and LTX-2 on H200/B200. It is excellent within the tested range and extrapolates poorly to distilled or sparse production systems.

### 3.5 Training amortization (optional line item)

`e_train [Wh/s] = E_train,facility / (lifetime clips × average seconds per clip)`

- **Training energy:** GPU-h × TDP × 0.8 × 1.72, times an R&D factor of 1.5–3 for ablations, earlier checkpoints and failed runs (**assumption**).
  - Seaweed-7B: ≈0.64 GWh before the R&D factor.
  - A 2026 frontier model at 1–5M H100-h: ≈1–5 GWh (**assumption; undisclosed**).
- **Volume:** Google claims 40M Veo 3 videos in 7 weeks (≈300M per year) and 100M videos made with Flow. ByteDance serves "billion-level DAU" products. For a mass-market model over one year: 2–3B output seconds.
- **Result:** ~0.3–2 Wh/s, i.e. **~2–12% of central facility inference**. **Default: +5% (range 1–30%).** Use the upper end for niche or short-lived models.
- Embodied hardware emissions are separate from energy (see Schneider et al. 2025, arXiv 2502.01671) and belong to the carbon stream.

### 3.6 Worked example

A 30-s spot at 720p made from six 5-s shots, with 8 generations per kept shot, is **240 s of generated video**.

- Seedance-class, facility central: 240 × 17.2 ≈ **4.1 kWh**. Likely range 0.8–16.5 kWh. Adding +5% training gives ≈ **4.3 kWh**.
- Hailuo-class: 240 × 8.6 ≈ **2.1 kWh** (0.4–9.3 kWh).
- The same spot at 1080p: Seedance ≈ 7.3 kWh; Hailuo ≈ 5.2 kWh.
- **Carbon and water (handled by other streams):** multiply kWh by the grid factor, for example 402 gCO₂e/kWh (US average per MIT TR) or a China grid factor for ByteDance/MiniMax. On-site water is kWh × WUE (Google 1.15 L/kWh, applied to IT energy); add off-site generation water separately.

---

## 4. Gaps, uncertainties, conflicts and recommended assumptions

**Conflicts and discrepancies**

| Conflict | Values | Explanation / recommendation |
|---|---|---|
| CogVideoX1.5 5-s clip | MIT TR 944 Wh total (472 GPU) versus ML.ENERGY 93.2 Wh GPU (H100) and a model-card speed of ~550 s (≈100 Wh) | ~5× gap. Probably unoptimized settings (sequential CPU offload in the model-card example), CodeCarbon counting idle GPUs, or different output settings. **Use ML.ENERGY.** Cite MIT TR only as a historical outlier |
| HunyuanVideo-1.5, "5 s at 720p" in Jegham | 57.5 Wh in the text versus 115.7 Wh from their own coefficients at 121 frames | The text value matches 81 frames. Use the coefficients with explicit frame counts |
| HunyuanVideo-1.5 serving speed | Tencent README 8×H800: 28.3 s (720p 5 s, 50 steps) versus Jegham 8×H200 vanilla ≈140–150 s implied (213 Wh at 40 steps) | Same model, ~5× gap from serving optimizations (CFG distillation, caching, attention kernels). **The same model can vary 5× in energy with serving stack**; this is why ranges are wide |
| B200 benefit | ~35% less energy than H200 (Jegham) versus ~0% versus H100 (ML.ENERGY, xDiT 0.4.5) | Software maturity on Blackwell. Use H_hw 0.65–1.0 |
| Wan fps | Delavande and ML.ENERGY list 15 fps; official config is 16 | Use 16 (5.06 s per 81 frames) |
| Delavande Wan-1.3B constants | Paper: d = 2048, N = 32. Config: dim 1536, 30 layers | μ = 0.456 is specific to their FLOP formula |
| Seedance 1.0 Pro Fast speed-up | Replicate: 30–60% faster, ~60% cheaper compute. Other secondary sources: "3× faster", "72% cheaper" | Vendor/secondary. Do not model separately; use the Seedance-class low scenario for "Fast" variants |
| Hailuo 02 efficiency | Official: 2.5× training and inference efficiency. Aggregators: "22% energy reduction", "62 s for 1080p" | Only the official claim is verified, and it is relative (no absolute) |
| Seedance 1.0 speed | 41.4 s for 5 s 1080p on "NVIDIA-L20" versus fal API latency ≈40 s for 5 s 720p (implied by Jegham's 56.6 Wh / 5,040 W) | Same order. The GPU count and hardware of the API are unknown → range 2.3–11.6 Wh/s at 1080p |

**Key unknowns**

1. Parameter counts, NFE/steps, GPU type and count, and utilization for Seedance 1.5/2.0/2.5 and Hailuo 02/2.3. H3 architecture is public, but its production serving (sparse attention, steps, hardware) is not.
2. Seedance 2.5 output resolutions (4K is secondary only) and whether 30-s clips are single-pass or internally chunked, which changes the duration exponent.
3. Real-world take ratios and prompt-rewrite overheads.
4. Chinese data-centre PUE and hardware mix (H20, L20, H800, Ascend) for ByteDance and MiniMax. H20/L20 specs are not verified from NVIDIA.
5. **Search budget exhausted.** Not surveyed: The Verge/Wired/Guardian, SemiAnalysis, Epoch on video, Li et al. 2024 (Open-Sora "Carbon in Motion", known only via Delavande's summary: 2-s 240p clips, near-quadratic in resolution, denoising dominates), and Wan 2.5/2.6 (closed; no compute data found in Wan's GitHub). Factorial Funds' Sora estimate could not be verified (404).

**Recommended default assumptions for the tool**

- GPU power 0.9 × TDP. Facility multiplier 1.72 (1.27–3.12). Training +5% (1–30%).
- 720p GPU-only e720: **Seedance-class 10 Wh/s (2–35); Hailuo-class 5 Wh/s (1–20)**. Resolution α = 0.7 (0.45–1.3). Duration β = 1.15 for clips over 8 s.
- Audio included for 2.x/H3-class anchors. Reference conditioning ×1.5 when the user selects multi-reference or consistency workflows.
- Always show the range as well as the central value, and the facility-level versus GPU-only distinction.
- Treat all closed-model figures as **estimates, not disclosures**, and label them that way in the UI.
- Revisit when ByteDance or MiniMax publish production serving details, or when Jegham et al.-style API measurements for Seedance 2.x and Hailuo/H3 appear.

---

## 5. Sources

Primary (P) or secondary (S), with publication date and access notes. All accessed 25 Sep 2026.

**Energy measurement studies and benchmarks**

1. Delavande, Pierrard & Luccioni, "Video Killed the Energy Budget: Characterizing the Latency and Power Regimes of Open Text-to-Video Models", arXiv 2509.19222, 23 Sep 2025 (NeurIPS 2025 NextVid Workshop). https://arxiv.org/abs/2509.19222 (P)
2. Jegham, Gamazaychikov & Luccioni, "Lights, Camera, Carbon: Architectural Scaling Laws for Video Generation Energy Consumption", arXiv 2607.04553 v1, 5 Jul 2026. https://arxiv.org/abs/2607.04553 · HTML and figures: https://arxiv.org/html/2607.04553v1 (P)
3. ML.ENERGY Leaderboard v3.0 raw data (last_updated 2026-02-16): https://ml.energy/leaderboard/data/tasks/text-to-video.json and https://ml.energy/leaderboard/data/tasks/text-to-image.json · leaderboard https://ml.energy/leaderboard/ (P)
4. J.-W. Chung, "Diagnosing Inference Energy Consumption with the ML.ENERGY Leaderboard v3.0", 29 Jan 2026. https://ml.energy/blog/measurement/energy/diagnosing-inference-energy-consumption-with-the-mlenergy-leaderboard-v30/ · arXiv 2601.22076 (P)
5. Chung et al., "The ML.ENERGY Benchmark: Toward Automated Inference Energy Measurement and Optimization", arXiv 2505.06371, 9 May 2025 (v2 16 Oct 2025), NeurIPS 2025 Datasets & Benchmarks. https://arxiv.org/abs/2505.06371 (P)
6. Luccioni, Jernite & Strubell, "Power Hungry Processing: Watts Driving the Cost of AI Deployment?", arXiv 2311.16863, Nov 2023; FAccT '24. https://arxiv.org/abs/2311.16863 (P)
7. Hugging Face AI Energy Score: site https://huggingface.github.io/AIEnergyScore/ · image-generation data https://huggingface.co/spaces/AIEnergyScore/Leaderboard/resolve/main/data/energy/image_generation.csv · v2 blog (4 Dec 2025) https://huggingface.co/blog/sasha/ai-energy-score-v2 · GitHub https://github.com/huggingface/AIEnergyScore (P)
8. Elsworth et al. (Google), "Measuring the environmental impact of delivering AI at Google Scale", arXiv 2508.15734, 21 Aug 2025. https://arxiv.org/abs/2508.15734 (P)

**Journalism, commentary and third-party estimates**

9. O'Donnell & Crownhart, "We did the math on AI's energy footprint. Here's the story you haven't heard.", MIT Technology Review, 20 May 2025. https://www.technologyreview.com/2025/05/20/1116327/ai-energy-usage-climate-footprint-big-tech/ (P, journalism with measurement)
10. "Everything you need to know about estimating AI's energy and emissions burden", MIT Technology Review, 20 May 2025. https://www.technologyreview.com/2025/05/20/1116331/ai-energy-demand-methodology/ (P)
11. A. Masley, "Reactions to MIT Technology Review's report on AI and the environment", 2025. https://blog.andymasley.com/p/reactions-to-mit-technology-reviews (S)
12. S. Altman, "The Gentle Singularity", 10 Jun 2025. https://blog.samaltman.com/the-gentle-singularity (P, text only)
13. Epoch AI, "How much energy does ChatGPT use?", 7 Feb 2025. https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use (S / analysis)
14. V. Tangermann, "Researchers Just Found Something Extremely Alarming About AI's Power Usage", Futurism, 25 Sep 2025. https://futurism.com/future-society/ai-power-usage-text-to-video-generator (S)
15. Factorial Funds (M. Plappert), "Under the hood: How OpenAI's Sora model works", Mar 2024. https://www.factorialfunds.com/blog/under-the-hood-how-openai-s-sora-model-works — **404 at access; not verified** (S)

**Seedance / ByteDance**

16. ByteDance Seed, "Seedance 1.0: Exploring the Boundaries of Video Generation Models", arXiv 2506.09113, 10 Jun 2025 (v2 28 Jun 2025). https://arxiv.org/abs/2506.09113 (P)
17. ByteDance Seed, "Seedance 1.5 pro: A Native Audio-Visual Joint Generation Foundation Model", arXiv 2512.13507, 15 Dec 2025 (v3 23 Dec 2025). https://arxiv.org/abs/2512.13507 (P)
18. ByteDance Seed, "Seedance 2.0: Advancing Video Generation for World Complexity", arXiv 2604.14148, 15 Apr 2026. https://arxiv.org/abs/2604.14148 (P)
19. ByteDance Seed, "Introducing Seedance 2.5" (blog), 31 Jul 2026. https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5 (P)
20. kie.ai, "Seedance 2.5 Release: What ByteDance Just Shipped", 2026. https://kie.ai/blog/seedance-2-5-release-deep-dive (S)
21. ByteDance Seed, "Seaweed-7B: Cost-Effective Training of Video Generation Foundation Model", arXiv 2504.08685, 11 Apr 2025. https://arxiv.org/abs/2504.08685 (P)
22. BytePlus, "Seedance 1.0 Pro Explained … API Pricing", 1 Aug 2025. https://www.byteplus.com/en/blog/seedance-1-0-pro-guide-api-pricing (P for pricing)
23. Replicate, "bytedance/seedance-1-pro-fast" model page. https://replicate.com/bytedance/seedance-1-pro-fast (S / vendor)

**MiniMax / Hailuo**

24. MiniMax, "MiniMax Hailuo 02, World-Class Quality, Record-Breaking Cost Efficiency", 18 Jun 2025. https://www.minimax.io/news/minimax-hailuo-02 (P)
25. MiniMax, "MiniMax Hailuo 2.3 …", 28 Oct 2025. https://www.minimax.io/news/minimax-hailuo-23 (P; content via secondary summaries)
26. MiniMax, H3 model card (repo created 28 Jul 2026). https://huggingface.co/MiniMaxAI/MiniMax-H3 · transformer config https://huggingface.co/MiniMaxAI/MiniMax-H3/raw/main/FL2VA/transformer/config.json (P)
27. MiniMax, "MiniMax H3" blog, 31 Jul 2026. https://www.minimax.io/blog/minimax-h3 (P)
28. MiniMax pay-as-you-go pricing. https://platform.minimax.io/docs/guides/pricing-paygo (P)
29. Hugging Face Diffusers, MiniMax-H3 pipeline docs (v0.40.0). https://huggingface.co/docs/diffusers/api/pipelines/minimax_h3 (P)
30. SGLang cookbook, MiniMax-H3 (benchmarks section). https://docs.sglang.io/cookbook/diffusion/MiniMax/MiniMax-H3 (P, framework measurements)
31. ResterChed, "What Is MiniMax H3 (Hailuo 3.0)?", Hugging Face blog. https://huggingface.co/blog/ResterChed/minimax-h3-hailuo-3-0 (S)

**Open video models**

32. Wan2.1 GitHub README and computational-efficiency table: https://github.com/Wan-Video/Wan2.1 (assets/comp_effic.png) (P)
33. Wan2.2 GitHub README, efficiency table and configs: https://github.com/Wan-Video/Wan2.2 (assets/comp_effic.png; wan/configs/*.py) (P)
34. Wan Team, "Wan: Open and Advanced Large-Scale Video Generative Models", arXiv 2503.20314, Mar 2025. https://arxiv.org/abs/2503.20314 (P)
35. HunyuanVideo-1.5 GitHub README and speed table: https://github.com/Tencent-Hunyuan/HunyuanVideo-1.5 (assets/speed.png) (P)
36. HunyuanVideo GitHub README (xDiT latency table): https://github.com/Tencent-Hunyuan/HunyuanVideo · paper arXiv 2412.03603 (P)
37. Open-Sora Team, "Open-Sora 2.0: Training a Commercial-Level Video Generation Model in $200k", arXiv 2503.09642, 12 Mar 2025. https://arxiv.org/abs/2503.09642 (P)
38. StepFun, "Step-Video-T2V Technical Report", arXiv 2502.10248 · README https://github.com/stepfun-ai/Step-Video-T2V (P)
39. Sand AI, "MAGI-1: Autoregressive Video Generation at Scale", arXiv 2505.13211, 19 May 2025 · README https://github.com/SandAI-org/MAGI-1 (P)
40. Kandinsky Lab, "Kandinsky 5.0: A Family of Foundation Models for Image and Video Generation", arXiv 2511.14993, Nov 2025 (Table 5). https://arxiv.org/abs/2511.14993 (P)
41. HaCohen et al., "LTX-2: Efficient Joint Audio-Visual Foundation Model", arXiv 2601.03233, Jan 2026. https://arxiv.org/abs/2601.03233 (P)
42. HaCohen et al., "LTX-Video: Realtime Video Latent Diffusion", arXiv 2501.00103. https://arxiv.org/abs/2501.00103 (P)
43. Genmo, Mochi 1 README. https://github.com/genmoai/mochi (P)
44. Zhipu / THUDM, CogVideo README and CogVideoX1.5-5B model card: https://github.com/zai-org/CogVideo · https://huggingface.co/zai-org/CogVideoX1.5-5B (P)
45. Meta, "Movie Gen: A Cast of Media Foundation Models", arXiv 2410.13720, Oct 2024. https://arxiv.org/abs/2410.13720 (P)

**Hardware**

46. NVIDIA H100 product page (specifications). https://www.nvidia.com/en-us/data-center/h100/ (P)
47. NVIDIA DGX B200 page. https://www.nvidia.com/en-us/data-center/dgx-b200/ (P)
48. NVIDIA DGX H100/H200 User Guide, "Introduction". https://docs.nvidia.com/dgx/dgxh100-user-guide/introduction-to-dgxh100.html (P)

**Cited but not directly accessed**

49. Li, Jiang & Tiwari, "Carbon in Motion: Characterizing Open-Sora on the Sustainability of Generative AI for Video Generation", ACM SIGENERGY Energy Informatics Review 4(5), 2024. Known only through Delavande et al.'s summary.
50. Schneider et al. (Google), "Life-cycle emissions of AI hardware: a cradle-to-grave approach and generational trends", arXiv 2502.01671, 2025. Cited by Jegham for TPU v6e power (2.173 kW); for the carbon/embodied stream.

Working files: raw extractions in `research/notes_A1.md`; calculation scripts in `research/calc/anchors.py`, `research/calc/scaling.py` and `research/calc/recommend.py`; downloaded papers and data in `research/papers/`.
