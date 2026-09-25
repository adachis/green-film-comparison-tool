# I. API timing tests, September 25, 2026

We timed real generations to check how cost scales with resolution and clip length.  The raw runs are in `research/data/api_timing_2026-09-25.csv`, and `research/calc/analyze_timing.py` rebuilds the summary from the harness's `results.jsonl`.

## Budget

- OpenRouter and fal (shared keys, capped at $50): **$1.34 spent**, then stopped on purpose.
- MiniMax (sunk credit, self-capped at $25): **$10.15 spent**.

## Seedance 2.5 through resellers

| Route | Clip | Wall time | What the API reports |
|---|---|---|---|
| OpenRouter | 480p, 5 s | 201 s | `pending` then `completed`, no start-of-compute time |
| fal | 480p, 4 s | 298 s | `IN_PROGRESS` at 0.4 s, `inference_time` 296 s |

Neither route separates queueing from compute.  fal marks the job in progress almost immediately and then reports the whole wait as inference time, so its "inference time" includes the upstream BytePlus queue.  At 200–300 s for a 5-second 480p clip, the queue dominates, which means more paid runs would have measured traffic, not Seedance.  We stopped at $1.34 and left the rest of the budget unspent.  A BytePlus key would expose the same queue, so only a provider disclosure can pin down Seedance's compute.

## MiniMax H3 direct

Two early pollers missed their results, so those two runs use MiniMax's own `created_at` and `updated_at`, recovered afterward.  MiniMax's v2 API reports `queued` and `running` separately, plus `created_at` and `updated_at`, and every job moved to `running` within a second.  The token counts it bills are a direct view of how much latent video the model generated.

| Model | Clip | Runs | Median wall time | Seconds per video second | Billed tokens per video second |
|---|---|---|---|---|---|
| MiniMax H3 | 768p, 5 s | 4 | 117.2 s | 23.4 | 32,549 |
| MiniMax H3 | 768p, 10 s | 1 | 202.7 s | 20.3 | 32,549 |
| MiniMax H3 | 768p, 15 s | 2 | 297.9 s | 19.9 | 32,549 |
| MiniMax H3 | 2K, 5 s | 2 | 206.6 s | 41.3 | 52,078 |
| MiniMax H3 | 2K, 10 s | 1 | 334.1 s | 33.4 | 52,078 |
| MiniMax H3 Max | 480p, 5 s | 3 | 5.1 s | 1.0 | – |
| MiniMax H3 Max | 768p, 5 s | 2 | 7.3 s | 1.5 | – |
| MiniMax H3 Max | 768p, 15 s | 1 | 40.8 s | 2.7 | – |

Findings:

1. **Resolution.**  2K took 1.65–1.76× as long as 768p and billed 1.6× the tokens (52,078 against 32,549 per video second).  The site assumes 1.5× (1.2–2.5), which holds.  Time tracks tokens almost one to one, which fits sparse attention (compute close to linear in tokens).
2. **Clip length.**  Per-second time falls from 23.4 s at 5 seconds to 19.9 s at 15 seconds, about 15% less.  A fixed overhead of roughly 25–30 seconds per job (text encoding, audio, VAE decode, upload) spreads across longer clips.  The site uses one per-second figure, so it slightly overstates long clips and understates short ones.
3. **H3 Max.**  The fast variant returned 5-second clips in 5–7 seconds.  Tripling the length took 5.6× as long, so its attention cost grows faster than linearly, unlike full H3.
4. **Energy bracket.**  A 5-second 768p H3 clip took about 117 seconds, against MiniMax's open-weight benchmark of 74 seconds on 4 H200s.  The API doesn't reveal the GPU count.  At 1–4 GPUs drawing 0.63 kW each, that's about 4–16 Wh per generated second at the GPU.  The site's 7 Wh (2–20) sits inside that range.

## What changed on the site

Nothing in the model.  The resolution factor for MiniMax 2K is confirmed, and the method section now describes these tests.
