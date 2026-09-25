# J. Measured local generation on a base M4 Mac mini, September 24–25, 2026

Stream F estimated local energy as generation time multiplied by an assumed wall draw.  This stream measures it.  We ran five open models in ComfyUI on a base M4 Mac mini and logged the chip's own power once a second.  The raw runs are in `research/data/mac_mini_m4_comfyui_2026-09-24.csv`.

## Setup

- **Machine:** Mac mini (Mac16,10), Apple M4 with a 10-core CPU (4 performance, 6 efficiency) and a 10-core GPU, 16 GB of unified memory, macOS 26.5.2.
- **Software:** ComfyUI v0.37.2 with ComfyUI-GGUF, PyTorch 2.14.0 on Metal (MPS).  ComfyUI's Mac defaults put diffusion models and VAEs on the GPU and text encoders on the CPU, and use sub-quadratic attention.
- **Power:** `powermetrics` combined CPU + GPU + neural-engine power, sampled every 1.02 seconds and aligned to each run to within 0.04 seconds (checked against a timed CPU load step).  **This is chip energy only.**  It leaves out memory, storage, the fan, Wi-Fi, and power-supply losses, so energy at the wall is higher.  No working wall meter was available on this machine.
- **Runs:** one untimed warm-up per model, then up to five timed runs queued through the ComfyUI API, each with its own seed and prompt so text encoding counts every time.  Time runs from queue to finish.  Idle chip draw was 0.14 W, so net energy is 1% below gross.  Other apps were closed and the display was asleep.  Thermal pressure stayed at Nominal throughout.

## Results

| Model and settings | Output | Timed runs | Mean time | Mean chip power | Chip energy | Per second of video |
|---|---|---|---|---|---|---|
| SDXL base 1.0, fp16, 30 steps, CFG 7 | 1024×1024 image | 5 | 157 s (155–159) | 15.7 W | 0.69 Wh | – |
| Z-Image Turbo, GGUF Q4_K_M, 8 steps | 1024×1024 image | 5 | 186 s (181–189) | 17.3 W | 0.89 Wh | – |
| LTX-Video 2B distilled 0.9.8, bf16, 8 steps | 121 frames at 768×512, 5.0 s | 1 | 139 s | 14.8 W | 0.57 Wh | 0.11 Wh |
| Wan 2.1 T2V 1.3B, fp16, 30 steps, CFG 6 | 81 frames at 832×480, 5.1 s | 1 | 12,295 s (3 h 25 min) | 14.8 W | 50.5 Wh | 10.0 Wh |
| Real-ESRGAN 2× upscale of the LTX clip | 121 frames, 768×512 to 1536×1024 | 3 | 171 s (170–174) | 14.7 W | 0.70 Wh | 0.14 Wh |

The GPU was busy 95–100% of each run except LTX-Video's (80%, while it waited on swapping and text encoding), and it accounts for 91–98% of the chip energy.  Most of the CPU's share is the text encoding, which ComfyUI runs on the CPU on a Mac.

## Findings

1. **An image costs well under 1 Wh at the chip.**  SDXL and Z-Image Turbo land at 0.69 and 0.89 Wh.  Stream F's estimate for Z-Image Turbo on a 16-inch M4 Max was about 1.1 Wh at the wall (35 s at 110 W).  The base M4 took five times as long at about a sixth of the power.
2. **Small video models are cheap, and slow ones aren't.**  LTX-Video's distilled 2B model made 5 seconds in under 2.5 minutes for 0.57 Wh.  Wan 2.1 1.3B needed 3 hours 25 minutes and 50.5 Wh for the same length, because its attention over about 33,000 tokens took almost 7 minutes per step on this GPU.  Stream F puts the same Wan clip at about 35 Wh on an RTX 4090 desktop (261 s at an assumed 490 W), so the Mac used more energy even counting only its chip.  A low-power chip doesn't help if it runs for hours.
3. **A lightweight upscale costs about the same as generating a short clip.**  Real-ESRGAN took 0.70 Wh to double a 5-second clip.  That supports stream F's "under 1 Wh" at the chip, though wall energy would sit near or a little above 1 Wh.  A diffusion upscaler such as SeedVR2 is still two orders of magnitude more.
4. **16 GB is the real constraint.**  Z-Image Turbo at 8-bit (Q8_0) pushed macOS into critical memory pressure and grew swap by 2.2 GB in a single run, so the timed runs use the 4-bit Q4_K_M file.  LTX-Video swapped heavily in every configuration tried, including a tiled VAE decode, because its model, T5 encoder, and VAE together hold about 9 GB.  It got one timed run, and its figure includes that swapping.  Wan fit.
5. **ComfyUI reloads models on a crowded machine.**  Its default RAM-pressure cache dropped Z-Image between runs 3 times out of 5, adding about 5 seconds each, and reloaded LTX and Wan before their timed runs.  Energy stayed within the run-to-run spread, but a 16 GB machine does repeat work that a larger one wouldn't.

## Caveats

- Chip energy is a lower bound.  The rest of a Mac mini (memory, SSD, fan, networking, and power-supply losses) adds a few watts at idle and more under load, and none of it is counted here.
- LTX-Video and Wan each have one timed run.  Wan ran over 20 minutes, and LTX was stopped early by the swap rule.
- The text encoders were 4-bit GGUF files to save memory.  Full-precision encoders would take longer on the CPU and use more memory, but they're a small share of each run.
