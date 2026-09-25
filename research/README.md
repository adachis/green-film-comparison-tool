# Research: AI video generation vs. conventional production

This folder holds the research behind the comparison tool.  It covers energy, carbon, water, and cost on both sides: generative AI video (ByteDance Seedance 2.5 as the main model, with MiniMax H3 for range) and conventional production with crews, actors, and VFX.  Everything here was gathered on September 25, 2026.

The short version lives in the published research brief.  These files are the long version, and every number in them carries a source, a date, and a confidence rating.

## Streams

The first pass ran eight research streams in parallel.  Follow-ups (the files ending in `followup`) went back for the gaps.

| File | What it covers |
|---|---|
| `streams/A1_ai_video_energy.md` | Measured energy for open video models, published estimates for closed ones, scaling with resolution and length, and the estimation method |
| `streams/A1b_latency_energy_followup.md` | Seedance 2.5 and MiniMax H3 generation times, the energy revision they support, and the Carbon Trust / DIMPACT report |
| `streams/A2_infra_factors_and_dgc.md` | PUE, grid carbon intensity, water, embodied hardware carbon, where each model actually runs, and a teardown of the DGC GenAI Toolkit |
| `streams/B_model_specs_pricing.md` | Seedance and MiniMax lineages, official pricing (including Seedance's token formula), resellers, and cost-to-serve evidence |
| `streams/B2_credit_pricing_followup.md` | Subscription credit costs per second on Luma, Krea, Higgsfield, Runway, Freepik, Artlist, Pollo, and Dreamina |
| `streams/C_ai_filmmaking_workflows.md` | Takes per kept shot, spend, and team sizes from real AI productions, plus how studios actually use AI |
| `streams/C2_workflows_followup.md` | The $25,000 Artlist question, Hell Grind, Chinese AI micro-drama data, brand ads, and the 2026 guild contracts |
| `streams/D_production_carbon.md` | Production carbon benchmarks from micro-shoots to tentpoles, emission factors, and a bottom-up model |
| `streams/D2_vfx_vp_small_followup.md` | VFX render energy, LED-volume energy, national audit data, and water on set |
| `streams/E_production_costs.md` | Production costs by tier, 2026 union rates, scenario costs, and what AI production really costs |
| `streams/E2_cost_gaps_followup.md` | VFX per-shot pricing, stage and LED-volume rates, aerial units, stock and voice rates, and insurance for AI content |
| `streams/F_local_and_guided.md` | Local generation on Apple Silicon and RTX desktops, draft modes, and Krea and other guided platforms |
| `streams/G_scenarios.md` | Ten shot-level scenarios (explosions, chases, crowds, aerials, travel, sets, weather, night work, impossible shots, and dialogue) |
| `streams/H_access_volume.md` | How much AI video gets generated (Grok Imagine, Kling, Hailuo, Veo, Sora, Seedance), evidence on how little is watched, aggregate energy, and rebound |
| `streams/I_api_timing_tests.md` | Our own timing runs: Seedance 2.5 through OpenRouter and fal (queue-dominated) and MiniMax H3 direct (resolution and clip-length scaling) |
| `streams/J_mac_mini_measurements.md` | Our own energy measurements of SDXL, Z-Image Turbo, LTX-Video, Wan 2.1, and Real-ESRGAN in ComfyUI on a base M4 Mac mini (chip power from `powermetrics`), and how local generation compares with the cloud |
| `streams/K_global_production_footprint.md` | An estimate of the annual footprint of all film and TV production worldwide, for comparison with all AI video |
| `streams/L_avatar_energy_context.md` | Where Wētā's cloud rendering for *Avatar: The Way of Water* ran, New Zealand's and Australia's grids, and Lightstorm's solar-powered stages |

## Central factors used in the brief

| Factor | Central | Range |
|---|---|---|
| Seedance 2.5 GPU energy, 720p | 18 Wh per generated second | 5–40 |
| MiniMax H3 GPU energy, 768p | 7 Wh per generated second | 2–20 |
| Facility multiplier (host, idle capacity, PUE) | 1.72× | 1.27–3.12 |
| Grid, Johor, Malaysia (Seedance international API) | 602 g CO2e/kWh | 497–700 |
| Grid, China (MiniMax) | 530 g CO2e/kWh | 404–650 |
| Takes per kept shot | Depends on production style | 1 to about 3,500 |

## Calculations

The scripts in `calc/` reproduce the derived numbers.  They're plain Python with no dependencies, and each one runs on its own with `python3 <script>`.  Most print their results, and `g_scenarios_calc.py` also writes `g_scenarios_calc_output.txt` next to itself.

- `brief_comparison.py` produces the per-second figures and the scenario table in the brief.
- `anchors.py`, `scaling.py`, and `recommend.py` build the first-pass energy estimates.  `a1b_latency_energy.py` converts the latency observations in `data/` into the revised energy figures.
- `g_scenarios_calc.py` builds the ten scenario inventories.
- `f_local_model.py` and `f_workflow_model.py` model local generation and the optimized-workflow savings.
- `d2_vfx_vp_calc.py` and `b2_credit_pricing_calc.py` cover VFX and LED-volume energy and subscription pricing.

## Caveats

No video provider discloses energy per clip, so every AI energy figure is an estimate with a wide range.  The raw page captures and PDFs the streams relied on aren't included here, because most of them are copyrighted pages.  The URLs in each stream's source list point to the originals.
