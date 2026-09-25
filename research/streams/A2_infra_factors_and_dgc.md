# A2: Infrastructure conversion factors and existing GenAI calculators

Research stream A2 for the green film comparison tool. Research date: 2026-09-25. This phase is research only; it contains no app code.

**How this was researched.** I read primary pages, PDFs and code directly. That included the DGC Toolkit JS bundle, the EcoLogits Python package data files and the CodeCarbon package source, plus HKEX filings, MEE PDFs, eGRID PDFs, NVIDIA PCF PDFs and arXiv PDFs. I re-ran the DGC and EcoLogits models locally. Working files are in `scratchpad/research/{dgc,eco,papers,minimax,byte,cc}/`.

**Constraint.** The shared WebSearch budget (200 calls per session) ran out partway through this stream. After that I used only direct fetches of known or linked URLs. A few items (the Singapore EMA grid factor, the Malaysia Energy Commission GEF, Meta primary data and Alibaba Cloud PUE) could not be verified. They are flagged below.

**Label key.** P = primary source. S = secondary source. Confidence is H (high), M (medium) or L (low).

---

## 1. Summary of key findings

1. **The DGC GenAI Toolkit (genaitoolkit.dgcgreen.ca).** It is a Directors Guild of Canada / DGC Green initiative, built by Decarbonade, a Montreal digital-sustainability studio, with support from Telefilm Canada. It launched on Earth Day, 22 April 2026, and its dataset was last updated on 1 March 2026.
   - I extracted the full model from its JS bundle. It is a bottom-up, EcoLogits-style formula with fixed hardware parameters: GPU at 0.70 kW × 70% utilization, plus non-GPU server power of 0.575 kW × 50% per GPU. **PUE is 1.15, and it is applied only to CO2, not to the displayed kWh.**
   - Embodied carbon is 128.3 kgCO2e per GPU × 1.25 for the server, over 26,298 h (3 years). The grid factor is chosen per provider.
   - Video is modelled as "tokens": 450 tokens per 720p frame and 1,013 per 1080p frame (about W×H/2048), decoded at 1,335 tokens/s on 8 GPUs at batch size 1. That gives about **14 Wh of IT energy per second of 720p/24 fps video, or 31.5 Wh for 1080p** (16.1 and 36.2 Wh with PUE).
   - An 8-second HD clip costs 111.8 Wh IT and 128.6 Wh facility energy. With the "Google" grid factor that is **54.6 gCO2e**, which reproduces the fact sheet exactly.
   - It has no water output, no Chinese providers, no 4K and no audio. It scales linearly, where real diffusion-transformer cost is super-linear. It reports no uncertainty, and its embodied factor is about 6× lower than EcoLogits'.
2. **EcoLogits (v0.11.1, June 2026).** It now has a **video-generation methodology with explicit Seedance models** (bytedance/seedance-1.0 and seedance-1.5-pro). The work comes from the Sustainable AI Group (SAIG: Jegham, Gamazaychikov and Luccioni, arXiv 2607.04553) and the Publicis-led GenAI Footprint Alliance.
   - EcoLogits' ByteDance defaults are location = Singapore (grid 497 gCO2e/kWh), PUE 1.20 and WUE 0.50 L/kWh, on DGX H800 hardware. The server power interval is 4.89 / 5.44 / 5.97 kW. The embodied footprint is 6,000 kg for the base server plus 8 × 273 kg for the GPUs, over a 3-year life.
   - Its estimate for a 5-second 1080p Seedance 1.5 Pro clip with audio is **0.123 kWh (0.110 to 0.135), 62 gCO2e and 0.53 L of water**. MiniMax is not covered.
   - EcoLogits' video "server power" derives from GPU TDP. Jegham measured GPU energy only, through NVML, so host overhead is probably missing.
3. **Where Seedance actually runs for international API users.** BytePlus ModelArk documents only two regions: **Johor, Malaysia (ap-southeast-1)** and Dublin (eu-west-1). "All the models listed in Model list are supported in ap-southeast-1," and the EU region offers only Seed text/Seedream-lite models. Seedance 2.5 (dreamina-seedance-2-5-260628: 480p to 1080p, 24 fps, 4 to 30 s) is therefore served from Johor. ModelArk notes that requests "may spill over" to the other region.
   - EcoLogits' Singapore default therefore understates the grid factor. Malaysia's 2025 figure is **602 gCO2e/kWh** against Singapore's 497.
   - WSJ (via Reuters and Straits Times, March 2026) reports ByteDance deploying about 36,000 B200s in Malaysia with Aolani Cloud.
4. **MiniMax (HKEX: 0100, IPO 9 January 2026) is asset-light.** It rents compute from third-party clouds. Its largest supplier in the first nine months of 2025 was Alibaba Cloud (US$54.9M, 23.9% of purchases), and a Dec 2025 connected-transaction agreement caps Alibaba Cloud purchases at US$115M, 125M and 135M for 2026 to 2028. Other large suppliers are Zhejiang- and Beijing-based cloud providers.
   - More than 90% of cost of sales is inference cloud spend. 2025 cost of sales was US$59.0M on revenue of US$79.0M.
   - Its ESG metrics cover **office electricity only** (735,824 kWh in 9M-2025). Data-centre energy is not disclosed.
   - MiniMax H3 (released 31 July 2026) is **open-weight**. MiniMax's own docs give an 8×B200 reference topology and a 4×H200 latency of 75.1 s for a 5-second 1344×768 clip with audio at 50 steps. That is about 53 Wh of GPU energy at 90% of TDP.
5. **PUE.** The Uptime Institute global weighted average is **1.54 (2025, n=681)** and was 1.56 in 2024; new builds average 1.48 and sites of 20 MW or more average 1.44. Hyperscaler figures:

   | Operator | PUE |
   |---|---|
   | Google fleet | 1.09 (2024 and 2025) |
   | Google Singapore campuses | 1.12 and 1.14 |
   | AWS | 1.15 (2024), 1.14 (2025) |
   | Microsoft | 1.16 (FY24), 1.17 (FY25) |
   | Microsoft APAC | 1.28 (FY25) |

   China's official policy (NDRC et al., July 2024) targets a national average **below 1.5 by end-2025**, **1.25 or less for new and expanded large data centres**, **1.2 or less at national hub nodes**, and **more than 80% green power** for new hub-node data centres. The reported national average is about 1.48 at end-2023 (secondary).
6. **Grid factors.** These are the official and harmonised values found:
   - **China:** MEE/NBS 2023 national CO2 factor **0.5306 kg/kWh**. Provinces where AI data centres cluster: Inner Mongolia 0.648, Hebei 0.652, Ningxia 0.619, Guizhou 0.568, Gansu 0.447, Beijing 0.555. The North China grid is 0.636.
   - **Ember/OWID lifecycle, 2025:** China 525, Malaysia 602, Singapore 497, US 384, Ireland 257, Sweden 35, Norway 28, Finland 57, World 458 gCO2e/kWh.
   - **eGRID2023 (latest listed):** US 350 g/kWh; CAMX 195; NWPP 288; SRVC (Virginia) 271; Oregon state 166.
   - **LADWP 2024 Power Content Label:** 505 lb/MWh, which is **229 g/kWh**. The California utility average is 163.
7. **Water.** Measured water ranges over roughly two orders of magnitude depending on boundary.

   | Operator or source | On-site WUE (L/kWh) |
   |---|---|
   | AWS (2025) | 0.12 |
   | Microsoft (FY25) | 0.27 |
   | Google (consumptive, AI-serving) | 1.15 |
   | Google whole-fleet 2025, my calculation (consumption ÷ electricity) | 0.94 |
   | Microsoft projected, Indonesia (from Li et al.) | 1.90 |

   **Off-site water** is 3.1 L/kWh for the US (Li et al.; WRI) and 6.0 for China (WRI via EcoLogits, which includes hydro evaporation). Malaysia is 1.7. Singapore has no data, and EcoLogits uses the world default of 3.9.
   - Google's 0.26 mL per prompt **excludes off-site water**. Adding 3.1 L/kWh would add about 0.75 mL.
   - Mistral's 45 mL per 400-token response uses a full LCA boundary.
8. **Embodied carbon.**
   - NVIDIA PCFs (July 2025, cradle-to-gate): **HGX H100 baseboard 1,312 kgCO2e** (164 per GPU) and **HGX B200 2,274 kgCO2e** (284 per GPU).
   - Other studies estimate H100 at 225 kg (Morand et al. 2026) and 273 kg (Lees-Perasso et al. 2026, used by EcoLogits).
   - Google's TPU v6e comes to 692 kgCO2e per chip including a share of the host and the data-centre building, over 6 years.
   - Amortized per busy GPU-hour, the range is **0.005 to 0.055 kgCO2e**. The DGC value is 0.006 and the EcoLogits value is 0.038.
9. **Measurement boundary matters (Google, August 2025).**
   - A median Gemini text prompt uses 0.24 Wh on the full-stack boundary.
   - The breakdown is: accelerators 58%, host CPU/DRAM 25%, idle provisioned machines 10%, PUE overhead 8%.
   - The narrow "accelerators only, best data centres" boundary gives 0.10 Wh, which is **2.4× lower**.
   - Google's implied multiplier on active-accelerator energy is **1.72**.
   - Any GPU-only video estimate (Jegham, NVML, EcoLogits video) should get a server-overhead multiplier of about 1.5 plus PUE before it is compared with meter-level production data.
10. **ByteDance and Volcano Engine publish no accessible ESG, energy or PUE disclosure.** The bytedance.com CSR pages return 404 or "maintenance", and the Volcano Engine pages are JS-only. This is a major gap, and the defaults must rely on regional and industry proxies.

---

## 2. Data tables (value, unit, scope, source, date, P/S, confidence)

### 2.1 DGC GenAI Toolkit: model constants extracted from production JS

Source for this whole table: [JS bundle `nodes/8.nIew7tbV.js`](https://genaitoolkit.dgcgreen.ca/_app/immutable/nodes/8.nIew7tbV.js), retrieved 2026-09-25 (P). The calculator page is https://genaitoolkit.dgcgreen.ca/en/calculator and says "dataset updated March 01, 2026" on the FAQ. Confidence is H, because these are exact code constants.

| Parameter | Text | Image | Video | Audio | Meaning |
|---|---|---|---|---|---|
| tputInput (tokens/s) | 15,000 | 15,000 | 15,000 | 15,000 | Prefill throughput |
| tputOutput (tokens/s) | 30 | 85 | **1,335** | 600 | Output "token" throughput of the whole GPU group |
| batchSize | 4 | 1 | **1** | 4 | Concurrent requests sharing the hardware |
| nGpu | 8 | 1 | **8** | 1 | GPUs allocated |
| pGpu (kW) | 0.70 | 0.70 | 0.70 | 0.70 | GPU power (H100-class TDP) |
| utilGpu | 0.70 | 0.70 | 0.70 | 0.70 | GPU utilization |
| pBase (kW per GPU) | 0.575 | 0.575 | 0.575 | 0.575 | Non-GPU server power per GPU slot |
| utilServer | 0.50 | 0.50 | 0.50 | 0.50 | Server-base utilization |
| pue | 1.15 | 1.15 | 1.15 | 1.15 | **Applied to CO2 only**; the displayed kWh excludes PUE |
| embeddedImpactGpu (kgCO2e/GPU) | 128.3 | 128.3 | 128.3 | 128.3 | Embodied carbon per GPU; source undocumented |
| embeddedServerOverhead | 1.25 | 1.25 | 1.25 | 1.25 | Multiplier for the server's embodied carbon |
| lifespanGpu (h) | 26,298 | 26,298 | 26,298 | 26,298 | 3.0 years; 100% utilization implied |

Formulas, verbatim logic:
- `t = in/15000 + out/tput_out` (s).
- `E_IT(kWh) = nGpu × (pGpu×utilGpu + pBase×utilServer) / batch × t/3600`, which is 0.7775 kW per GPU slot.
- `CO2 = E_IT × PUE × grid + nGpu × 128.3 × 1.25 × (t/3600) / 26298 / batch`.

Other constants:
- Video tokens = duration × fps × (450 for "HD 720×1280", 1,013 for "FHD 1080×1920") plus 50 prompt tokens.
- Image tokens = round(43·√max(W,H) + 222).
- Audio = 300 tokens per second of audio.
- Reasoning adds 800 output tokens.

**Grid factors in the tool (kgCO2e/kWh; sources undocumented):**

| Option | Factor |
|---|---|
| Google | 0.418 |
| OpenAI | 0.363 |
| Microsoft | 0.393 |
| Anthropic | 0.501 |
| xAI (Grok) | 0.500 |
| US average | 0.414 |
| Canada average | 0.136 |
| World average | 0.480 |

**UI defaults:** video, 4 attempts × 8 s, HD, 24 fps, provider OpenAI; image, 30 attempts at 2816×1536; text, 30 pages × 500 tokens with reasoning; audio, 30 × 30 s.

**Derived outputs (my reimplementation, reproduced exactly):**

| Scenario | GPU-time | E_IT | E incl. PUE | gCO2e | Note |
|---|---|---|---|---|---|
| 1 × 8 s HD 24 fps, "Google" grid | 64.7 s × 8 GPUs | 111.8 Wh | 128.6 Wh | **54.6** | Matches fact sheet "Generate a video 54,6 g" |
| 1 × 8 s HD, OpenAI grid (default) | same | 111.8 Wh | 128.6 Wh | 47.6 | Default of 4 attempts = 190 g, 0.447 kWh displayed |
| Per second of video, HD 24 fps | 8.1 s × 8 GPUs | 14.0 Wh | 16.1 Wh | 6.8 (US) | Linear in seconds and fps |
| Per second of video, FHD 24 fps | 18.2 s × 8 GPUs | 31.5 Wh | 36.2 Wh | 15.2 (US) | Linear in pixels |
| 1 × 10 s FHD, world grid | 182 s × 8 GPUs | 314.7 Wh | 361.9 Wh | 176 | |
| 1 image 1024², US | 18.8 s × 1 GPU | 4.06 Wh | 4.67 Wh | 1.97 | Fact sheet "2,9 g" does not match the current code (3.1 g at 2K with Google) |
| 100-page summary with reasoning, Google | 46.7 s | 20.2 Wh | 23.2 Wh | 9.85 | Matches fact sheet "9.8 g" |
| 30 s audio, Google | 15 s | 0.81 Wh | 0.93 Wh | 0.40 | Fact sheet "2,1 g" does not match the code |
| Embodied per GPU-hour | | | | **6.1 g/GPU-h** | 128.3 × 1.25 / 26,298 |

**Provenance of the DGC Toolkit:**
- DGC press release, 22 April 2026: https://www.dgc.ca/en/national/press-release/dgc-launches-low-carbon-genai-toolkit (P, H).
- About page: https://genaitoolkit.dgcgreen.ca/en/about. It names Decarbonade (Montréal) as builder of the calculation models, content and site, and "Made with the support of Telefilm Canada". (P, H)
- The methodology text says "peer-reviewed studies available at the time of development (February 2026)". It lists as bases EcoLogits/CodeCarbon (with the system boundary kept to inference only, including GPU and server energy and data-centre overhead) and Antarctica's "One Token Model" as inspiration for the multimodal extension. It explicitly excludes training, storage, end-user devices and networks.
- The fact sheet PDF is https://genaitoolkit.dgcgreen.ca/pdf/FactSheet%20(PDF%20EN).pdf. Its unsourced context claims include "ChatGPT session 2.9 Wh vs Google search 0.3 Wh", "AI 73 TWh in 2026" and "731–1,125 million m³ water per year". (P, but the claims are secondary, L)

### 2.2 Other calculators and methodologies

| Item | Value | Unit | Scope | Source (date) | URL | P/S | Conf. |
|---|---|---|---|---|---|---|---|
| EcoLogits LLM GPU energy per output token | f_E = α·e^(βB)·P_active + γ; α=1.17e-6, β=−1.12e-2, γ=4.05e-5; B=64 | Wh/token/GPU (P in B params) | Fit to ML.ENERGY H100 vLLM data | EcoLogits LLM methodology (live, retrieved 2026-09-25) | https://ecologits.ai/latest/methodology/llm_inference/ | P | H |
| EcoLogits server without GPU | 1.2 | kW per 8-GPU server | p5.48xlarge via BoaviztAPI; allocated GPU/8/B | same | same | P | H |
| EcoLogits LLM embodied carbon | Server without GPU 5,700; H100 GPU 273 | kgCO2e | Boavizta p5.48xlarge; Lees-Perasso et al. 2026 (ADEME) | same | same | P | H (as documented) |
| EcoLogits hardware life | 3 | years | Allocation ΔT/(B·ΔL), so 100% utilization implied | same | same | P | H |
| EcoLogits water formula | WCF = E_server × [WUE_on + PUE × WUE_off] | L | Li et al. 2025; off-site from WRI per country | same | same | P | H |
| EcoLogits LLM provider defaults | OpenAI/Azure USA PUE 1.20, WUE 0.569; Google 1.09, 0.99; Anthropic 1.09–1.14, 0.13–0.99; Mistral SWE 1.16, 0.09; Cohere 1.09, 0.99 | PUE, L/kWh | Global provider averages | same | same | P | M |
| Older EcoLogits constants | v0.5–0.8: GPU 143 kg (an 80 GB GPU; the code does not name the model), server 3,000 kg, PUE 1.2, 1 kW; v0.9: GPU 164 kg (HGX H100 PCF ÷ 8), server 5,700 kg, 1.2 kW | kgCO2e, kW | Shows how embodied values drifted | PyPI wheels ecologits 0.5.0–0.9.0 | https://pypi.org/project/ecologits/ | P | H |
| **EcoLogits video** latency model | ΔT = [n·F·(WH)² + m·T + m1·F + m2·(WH)² + n1·F² + n2·T² + g] × ω_no-audio; F = ⌊24·D+1⌋; T = W·H·F/1000 | s | Per-model regressions from Jegham et al. 2026 | EcoLogits video methodology | https://ecologits.ai/latest/methodology/video_generation/ | P | H |
| Seedance 1.0 coefficients | m=1.02e-4, n1=3.84e-4, g=20.5 s; no audio; DGX H800 | | Capabilities 480p and 720p; 121/193/241 frames | EcoLogits `video_models.json` v0.11.1 | https://github.com/mlco2/ecologits | P | H |
| Seedance 1.5 Pro coefficients | m2=7.2e-12, n1=1.1e-3, g=20.6 s; non_audio_weight 0.5; DGX H800 | | 720p and 1080p; 121/193/241 frames | same | same | P | H |
| DGX H800 server power | 4,894.93 / **5,438.48** / 5,974.24 | W (p2.5 / mean / p97.5) | From Jegham; appears GPU-TDP-based (see §3) | same | same | P | M |
| Other hardware power | DGX H200 4,992 / 6,647 / 8,487 W; single H200 624 / 831 / 1,061 W; TPU v6e (8 chips) 1,074 / 1,673 / 2,353 W | W | same | same | same | P | M |
| Video embodied carbon | Base server: DGX H800 6,000, DGX H200 6,000, TPU v6e host 3,550. Accelerators: H800 273, H200 364, TPU v6e 323 | kgCO2e | 3-year life; whole machine allocated, no batching | same | same | P | H (as documented) |
| Video provider defaults | **ByteDance: SGP, PUE 1.20, WUE 0.50**; Kling SGP 1.20/0.50; Alibaba and Tencent SGP 1.20/0.569; Google USA 1.09/0.999; OpenAI USA 1.20/0.569; Runway and Lightricks USA 1.09–1.14 / 0.13–0.999 | | Used when location is unknown | same | same | P | H (as documented), L (as fact) |
| EcoLogits video blog | Released 18 June 2026; research by SAIG (Luccioni, Gamazaychikov, Jegham); GenAI Footprint Alliance (Publicis; founding members AXA, Engie, La Poste) | | | EcoLogits blog | https://ecologits.ai/latest/blog/2026/06/18/video-impacts/ | P | H |
| **EcoLogits output: Seedance 1.5 Pro, 1080p, 5 s, with audio** | E **0.110 / 0.123 / 0.135 kWh** (incl. PUE); GWP 0.056 / **0.062** / 0.068 kg; embodied 0.0059 kg; WCF **0.53 L** | | Default SGP location | My run of ecologits 0.11.1 `video_impacts` | (local) | P (tool output) | H (as tool output) |
| Same, 720p 5 s / 1080p 10 s / 1080p 5 s without audio | 0.078 / 0.209 / 0.061 kWh; 0.039 / 0.106 / 0.031 kg | | | same | | P | H |
| Same, 1080p 5 s at other locations | CHN 0.070 kg, 0.79 L; **MYS 0.080 kg, 0.26 L**; USA 0.053 kg, 0.44 L | | Location override | same | | P | H |
| Peers, 1080p 10 s (EcoLogits) | Veo 3.1 0.101 kWh; Kling v3 0.684; Sora 2 Pro 1.253; Runway Gen-4.5 1.326; Wan 2.2 7.10 | kWh | Default locations | same | | P | H (as tool output) |
| Jegham et al., API case study | Seedance-1, 8 s 720p: **72.1–87.9 Wh (mean 80.0)**; Veo 3 19.8–43.4 (30.8); Gen-4.5 241.6–410.9 (322.0); Sora 2 Pro 315.1–534.4 (418.5); Sora 2 Pro 12 s 1080p mean 1,313 Wh | Wh GPU energy per clip | GPU-only; P ~ N(0.9·TDP, (0.05·TDP)²); Seedance assumed on DGX H800 ("export restrictions") | Jegham, Gamazaychikov, Luccioni, "Lights, Camera, Carbon", arXiv 2607.04553 (5 July 2026) | https://arxiv.org/abs/2607.04553 | P | M |
| Jegham measurement boundary | "We only account for GPU energy consumption" (footnote 4); pyNVML sampled at 100 ms | | Open-model benchmarks | same | same | P | H |
| Antarctica One-Token Model (OTM) | Attributes inference energy and carbon per **output token** across provider, hardware and usage layers. Owner/hybrid mode uses NVML telemetry plus a PUE assumption; renter mode estimates from the API, with 26.7% divergence on short prompts and 3–4% on medium/long ones. **Text-only today; multimodal is on the roadmap.** Peer-reviewed at IEEE ICSA-C 2026 (DOI 10.1109/ICSA-C68850.2026.00062). AI Wattch v2 adds water through on-site and off-site factors. | | | DIST methodology submission #57 (1 Dec 2025); Antarctica Substack | https://github.com/thegreenwebfoundation/DIST/issues/57 ; https://antarctica.substack.com/p/the-one-token-model | P (summarized via fetch) | M |
| Antarctica OTM full equations | Not retrievable: antarctica.io returned a Vercel checkpoint (HTTP 429) | | | | https://antarctica.io/research/one-token-model | | Gap |
| CodeCarbon defaults (v3.3.1) | **PUE default 1.0** (configurable). World fallback 475 gCO2e/kWh. CPU TDP fallback at 50% of TDP. RAM 5 W per DIMM (v3; v2 used 3 W per 8 GB). Source intensities: coal 995, petroleum 816, gas 743, geothermal 38, hydro 26, nuclear 29, **solar 48**, wind 26 kg/MWh. | | Local hardware metering (RAPL, NVML) | CodeCarbon docs and package source | https://mlco2.github.io/codecarbon/latest/explanation/methodology/ | P | H |

### 2.3 PUE

| Value | Scope | Source (date) | URL | P/S | Conf. |
|---|---|---|---|---|---|
| **1.54** | Global weighted-average annual PUE of survey respondents (n=681); 6th year roughly flat | Uptime Institute Global Data Center Survey 2025 | https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2025.Annual.Survey.Report.pdf | P | H |
| 1.48 / 1.44 | Facilities commissioned within 5 years / sites of 20 MW or more (2025 survey) | same | same | P | H |
| 15% | Share of respondents at PUE 1.3 or better | same | same | P | H |
| 1.56 | 2024 global weighted average. Uptime series: 2007 2.50; 2011 1.98; 2014 1.65; 2018 1.58; 2019 1.67; 2020 1.59; 2021 1.57; 2022 1.55; 2023 1.58; 2024 1.56; 2025 1.54 | Uptime 2024 and 2025 surveys | https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2024.GlobalDataCenterSurvey.Report.pdf | P | H |
| **1.09** | Google fleet trailing-12-month PUE (2024, 2025, Q2 2026) | Google data centers efficiency page; Google 2026 Environmental Report (30 June 2026) | https://datacenters.google/efficiency/ ; https://sustainability.google/files/google-2026-environmental-report | P | H |
| 1.12 / 1.14 | Google Singapore 1st / 2nd facility, 2025 | Google 2026 Environmental Report, data tables | same | P | H |
| 1.13 / 1.12 / 1.08–1.11 | Google Changhua (Taiwan) / Inzai (Japan) / US and EU sites, 2025 | same | same | P | H |
| **1.15 → 1.14** | AWS global PUE 2024 → 2025; best: Stockholm 1.09, Ireland 1.10 | Amazon Sustainability, AWS Cloud | https://sustainability.aboutamazon.com/products-services/aws-cloud | P | H |
| **1.16 → 1.17** | Microsoft global PUE FY24 → FY25; Americas 1.16; EMEA 1.16; **APAC 1.25 → 1.28** | Microsoft Datacenters efficiency page | https://datacenters.microsoft.com/sustainability/efficiency/ | P | H |
| 1.08 | Meta fleet PUE (2024 data) | Search summary of Meta 2025 sustainability report; primary not fetched | (DCD, ppc.land) | S | L–M |
| **< 1.5** | China national average data-centre PUE target by end-2025; also rack utilization of 60% or more and renewable utilization +10%/yr | NDRC, MIIT, NEA, NDA, 数据中心绿色低碳发展专项行动计划 (发改环资〔2024〕970号), 3 July 2024 | https://www.gov.cn/zhengce/zhengceku/202407/content_6964165.htm (PDF P020240724272072479001.pdf) | P | H |
| **≤ 1.25 / ≤ 1.2** | New and expanded large or super-large data centres / national hub-node projects, by end-2025 | same | same | P | H |
| **> 80%** | Green-power share of new data centres at national hub nodes by end-2025 (formalized for all new data centres in 2025 per OIES) | same; OIES Feb 2026 | same; https://www.oxfordenergy.org/wpcms/wp-content/uploads/2026/02/Comment-The-China-data-centre-advantage.pdf | P / S | H / M |
| 1.48 | China national average PUE, end-2023 (down from 1.54) | Carbon Brief explainer, 16 April 2025, citing officials | https://www.carbonbrief.org/explainer-how-china-is-managing-the-rising-energy-demand-from-data-centres | S | M |
| 1.46 | China average data-centre PUE for 2024, attributed to CAICT | Search-engine summary only; primary not retrieved | (CAICT) | S | L |
| ~1.5 | China sector average in 2023; new large data centres below 1.3 | OIES (Anders Hove), Feb 2026 | as above | S | M |
| 1.40 | China average PUE for 2024, a *modelling assumption* | Frontiers in Energy Research 2026 (10.3389/fenrg.2026.1774740) | https://www.frontiersin.org/journals/energy-research/articles/10.3389/fenrg.2026.1774740/full | S | L |
| 1.20 | EcoLogits default for ByteDance, Kling, Alibaba and Tencent video (SGP) | EcoLogits `video_models.json` | https://ecologits.ai/latest/methodology/video_generation/ | P (assumption) | L as fact |
| 1.15 | DGC Toolkit universal PUE | DGC JS | see §2.1 | P (assumption) | L as fact |
| n/a | ByteDance, Volcano Engine or Alibaba Cloud fleet PUE | **Not found**; pages JS-only or unavailable | | | Gap |

### 2.4 Grid carbon intensity (location-based)

Note: 1 lb/MWh × 0.4536 = g/kWh. MEE and eGRID figures are combustion CO2 or CO2e. Ember/OWID figures are **lifecycle** gCO2e.

| Region | Value | Unit | Year | What it measures | Source (pub. date) | URL | P/S | Conf. |
|---|---|---|---|---|---|---|---|---|
| **China national** | **0.5306** | kgCO2/kWh | 2023 | National average electricity CO2 factor, official | MEE and NBS announcement on 2023 electricity CO2 factors (31 Dec 2025) | https://www.mee.gov.cn/xxgk2018/xxgk/xxgk01/202512/W020251231726284332528.pdf | P | H |
| China national (2022) | 0.5366 | kgCO2/kWh | 2022 | same | MEE and NBS (20 Dec 2024) | https://www.mee.gov.cn/xxgk2018/xxgk/xxgk01/202412/t20241226_1099413.html | P | H |
| China, excluding market-traded non-fossil | 0.6096 | kgCO2/kWh | 2023 | Residual-type factor | MEE 2023 table 4 | as above | P | H |
| China fossil-only | 0.8273 | kgCO2/kWh | 2023 | Fossil generation | MEE 2023 table 5 | as above | P | H |
| China lifecycle footprint | 0.5777 (2024); 0.6205 (2023) | kgCO2e/kWh | 2024 | Product-carbon-footprint factor; coal 0.924, gas 0.450, hydro 0.014, nuclear 0.0065, wind 0.032, **solar 0.052**; T&D incl. losses 0.0327 | MEE, NBS, NEA 2024 electricity footprint factors (24 Oct 2025) | https://www.mee.gov.cn/xxgk2018/xxgk/xxgk01/202510/W020251024569470952545.pdf | P | H |
| China, Ember lifecycle | **525** (2025); 555 (2024); 583 (2023) | gCO2e/kWh | 2025 | Generation lifecycle | Ember Global Electricity Review 2026 (April 2026); OWID dataset (updated 30 June 2026) | https://ember-energy.org/app/uploads/2026/04/Global-Electricity-Review-2026.pdf ; https://ourworldindata.org/grapher/carbon-intensity-electricity | P | H |
| North China grid (华北) | **0.6361** | kgCO2/kWh | 2023 | Regional grid covering Beijing, Tianjin, Hebei (Zhangbei), Shanxi, Shandong and west Inner Mongolia | MEE 2023 | as above | P | H |
| Northwest grid (西北) | 0.5543 | kgCO2/kWh | 2023 | Ningxia, Gansu, Qinghai, Shaanxi, Xinjiang | MEE 2023 | as above | P | H |
| Other grids | East 0.5500; Central 0.5271; Northeast 0.5122; **Southern 0.4042**; Southwest 0.2472 | kgCO2/kWh | 2023 | | MEE 2023 | as above | P | H |
| Inner Mongolia (Ulanqab, Horinger hubs) | **0.6479** | kgCO2/kWh | 2023 | Provincial average | MEE 2023 | as above | P | H |
| Ningxia (Zhongwei hub) | 0.6187 | kgCO2/kWh | 2023 | | MEE 2023 | | P | H |
| Guizhou (Gui'an hub) | 0.5683 | kgCO2/kWh | 2023 | | MEE 2023 | | P | H |
| Hebei (Zhangjiakou/Zhangbei hub) | 0.6516 | kgCO2/kWh | 2023 | | MEE 2023 | | P | H |
| Gansu (Qingyang hub) | 0.4471 | kgCO2/kWh | 2023 | | MEE 2023 | | P | H |
| Beijing / Shanghai / Jiangsu / Zhejiang / Guangdong | 0.5554 / 0.5737 / 0.5827 / 0.4974 / 0.4419 | kgCO2/kWh | 2023 | Eastern demand-centre provinces | MEE 2023 | | P | H |
| Sichuan / Yunnan / Qinghai | 0.1564 / 0.1333 / 0.1796 | kgCO2/kWh | 2023 | Hydro-rich provinces | MEE 2023 | | P | H |
| Hong Kong | 675 (2024) | gCO2e/kWh | 2024 | Lifecycle | OWID/Ember | as above | P | H |
| **Malaysia** (national; Johor is on the Peninsular grid) | **602** (2025); 600 (2024) | gCO2e/kWh | 2025 | Lifecycle, national | OWID/Ember (30 June 2026) | https://ourworldindata.org/grapher/carbon-intensity-electricity | P | H |
| Peninsular Malaysia specifically | Not retrieved (Energy Commission GEF) | | | | | | | Gap |
| **Singapore** | **497** (2025); 499 (2024) | gCO2e/kWh | 2025 | Lifecycle | OWID/Ember | as above | P | H |
| Singapore grid CFE | 5% | % carbon-free | 2025 | Hourly grid CFE for the Singapore region | Google 2026 Environmental Report | as above | P | H |
| Singapore EMA official grid emission factor | Not retrieved; the site blocks bots (Incapsula). Recollection of about 0.41–0.42 kgCO2/kWh (CO2-only operating margin) is unverified. | | | | | https://www.ema.gov.sg/resources/singapore-energy-statistics/chapter2 | | Gap |
| **US average** | **770.9 lb/MWh = 350 g/kWh** | CO2e | 2023 | Total output emission rate (generation) | EPA eGRID2023 summary tables rev2 (June 2025); eGRID page updated 21 Sep 2026 still lists eGRID2023 | https://www.epa.gov/system/files/documents/2025-06/summary_tables_rev2.pdf | P | H |
| US average, Ember | 384 (2025); 384 (2024); 393 (2023) | gCO2e/kWh | 2025 | Lifecycle | Ember GER 2026; OWID | as above | P | H |
| US grid gross loss | 4.2% | % | 2023 | T&D losses; divide by (1 − GGL) for consumption basis | eGRID2023 | as above | P | H |
| Virginia / Carolinas (SRVC; Dominion, part of PJM) | 596.3 lb/MWh = **270 g/kWh** | CO2e | 2023 | Subregion output rate | eGRID2023 | as above | P | H |
| Virginia state | 539.6 lb/MWh = 245 g/kWh | CO2e | 2023 | State generation | eGRID2023 | | P | H |
| PJM East (RFCE) / PJM West (RFCW) | 599.2 = 272 / 916.1 = 416 g/kWh | CO2e | 2023 | Subregions | eGRID2023 | | P | H |
| PJM hourly grid CFE | 40% | % | 2025 | Google, PJM region | Google 2026 Environmental Report | | P | H |
| Oregon state | 365.0 lb/MWh = **166 g/kWh** | CO2e | 2023 | State generation | eGRID2023 | | P | H |
| Northwest (NWPP; recommended subregion for The Dalles and Hillsboro) | 635.3 lb/MWh = 288 g/kWh | CO2e | 2023 | Subregion | eGRID2023 | | P | H |
| BPA grid CFE | 84% | % | 2025 | Google, BPA region | Google 2026 Environmental Report | | P | H |
| California (CAMX, i.e. CAISO area) | 430.0 lb/MWh = **195 g/kWh** | CO2e | 2023 | Subregion | eGRID2023 | | P | H |
| California state | 394.8 lb/MWh = 179 g/kWh | CO2e | 2023 | | eGRID2023 | | P | H |
| **LADWP** | **505 lb CO2e/MWh = 229 g/kWh** | CO2e | 2024 | Retail power mix: 41% RPS renewables, 15% solar, 14% wind, 9% geothermal, 15% nuclear, 3% large hydro, 30% gas, 11% coal and petroleum. Excludes biogenic and geothermal CO2. | CEC 2024 Power Content Label, LADWP | https://www.energy.ca.gov/filebrowser/download/9140 | P | H |
| California utility average | 359 lb/MWh = 163 g/kWh | CO2e | 2024 | | same | same | P | H |
| LADWP "Green Power for Green LA" | 0 | lb/MWh | 2024 | 100% solar opt-in product | same | same | P | H |
| Rooftop PV lifecycle (the user's solar) | 48 | gCO2e/kWh | n/a | Generic solar lifecycle factor (IPCC-based) | CodeCarbon methodology table | as above | S | M |
| Ireland (BytePlus eu-west-1 Dublin) | **257** (2025); 271 (2024) | gCO2e/kWh | 2025 | Lifecycle | OWID/Ember | | P | H |
| Sweden / Norway / Finland / Denmark | 35 / 28 / 57 / 114 | gCO2e/kWh | 2025 | Lifecycle | OWID/Ember | | P | H |
| EU-27 | 210 | gCO2e/kWh | 2025 | Lifecycle | Ember GER 2026 | | P | H |
| **World** | **458** (2025); 471 (2024) | gCO2e/kWh | 2025 | Lifecycle, generation | Ember GER 2026 | as above | P | H |
| World (IEA) | Not retrieved (iea.org returned 403) | | | | https://www.iea.org/reports/electricity-2025/emissions | | Gap |
| Google fleet, location-based | **345** (2024); 366 (2023) | gCO2e/kWh | 2024 | Average across Google data centres | Google, "Measuring the environmental impact of delivering AI at Google Scale" (Aug 2025) | https://services.google.com/fh/files/misc/measuring_the_environmental_impact_of_delivering_ai_at_google_scale.pdf | P | H |
| Google fleet, market-based | **94** (2024); 135 (2023) | gCO2e/kWh | 2024 | After CFE procurement | same | same | P | H |
| Google global hourly CFE | 65% (2025); 66% (2024); APAC 13% | % | 2025 | | Google 2026 Environmental Report | | P | H |
| EcoLogits country factors | CHN 525.3; MYS 602.0; SGP 497.1; USA 384.4; IRL 256.5; WOR 458.3 | gCO2e/kWh | 2025 | = OWID/Ember 2025 | EcoLogits `electricity_mixes.json` | https://github.com/mlco2/ecologits | P | H |

### 2.5 Where inference runs (region facts)

| Fact | Detail | Source (date) | URL | P/S | Conf. |
|---|---|---|---|---|---|
| BytePlus ModelArk regions | **Johor, Asia Pacific (ap-southeast-1)**, base URL ark.ap-southeast.bytepluses.com; Dublin, Europe (eu-west-1), ark.eu-west.bytepluses.com. "Requests are primarily routed to the region where the endpoint is created. However… some requests may be routed to inference resources in other regions." Singapore-origin requests prefer AP and may spill to EU. | BytePlus docs, Region availability (updated 10 Sep 2026) | https://docs.byteplus.com/en/docs/ModelArk/2191806 | P | H |
| Model availability by region | "All the models listed in Model list are supported in ap-southeast-1." EU supports only seed-2-0 and seedream-5-0-lite (model list); the region page says seed-2-0-lite. Minor doc inconsistency, but **Seedance is AP-only.** | BytePlus Model list | https://docs.byteplus.com/en/docs/ModelArk/1330310 | P | H |
| Seedance 2.5 specs | dreamina-seedance-2-5-260628: 480p and 720p (8-bit), 1080p (10-bit); 24 fps; 4–30 s; up to 50 reference assets; enterprise 600 RPM, concurrency 10. Seedance 2.0: 480p, 720p, 1080p, 4K; 24 fps; 4–15 s. | BytePlus Model list; Seedance 2.5 tutorial | https://docs.byteplus.com/en/docs/ModelArk/2607688 | P | H |
| ByteDance hardware in Malaysia | About 500 Nvidia Blackwell systems (**~36,000 B200**) deployed with Aolani Cloud in Malaysia, costing more than US$2.5B, for AI R&D outside China and global customers | Reuters via The Straits Times, 13 Mar 2026, citing WSJ (12 Mar) | https://www.straitstimes.com/business/companies-markets/chinas-bytedance-gets-access-to-top-nvidia-ai-chips-wsj-reports | S | M |
| Seedance hardware assumption in the literature | DGX H800 ("GPU export restrictions") | Jegham et al. 2026; EcoLogits | as above | P | M (assumption) |
| MiniMax compute model | "Asset-light": pays hardware rental and service fees to third-party cloud providers; no owned hardware | MiniMax Global Offering prospectus (31 Dec 2025) | https://www1.hkexnews.hk/listedco/listconews/sehk/2025/1231/2025123100025.pdf | P | H |
| MiniMax largest suppliers | 9M-2025: #1 Supplier J (Alibaba entities; "international cloud provider with subsidiaries in China and Singapore") US$54.9M (23.9%); #2 Supplier H (Zhejiang cloud) US$53.7M (23.3%); #3 Supplier A (Beijing) US$13.0M; #4 Supplier K (Singapore) US$11.4M; #5 Supplier C (Beijing) US$10.6M. 2024: Supplier H US$72.8M (28.0%). | same, pp. 297–300 | same | P | H |
| Alibaba Cloud agreement | Annual caps of US$115M (2026), 125M (2027), 135M (2028); used since 2022 | MiniMax Annual Report 2025 (22 Apr 2026) | https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0422/2026042202118.pdf | P | H |
| MiniMax inference region for api.minimax.io | **Not disclosed.** Singapore subsidiaries exist (e.g. Nanonoble Pte. Ltd.); 73% of 2025 revenue came from outside mainland China. | prospectus; AR 2025 | as above | P | M |
| MiniMax H3 | Released 31 July 2026; **open weights**; API output 768P or 2K, 4–15 s. H3 Max (fal.ai post-trained) outputs 480P/768P. Self-host reference: 8 × B200. SGLang benchmarks for a 5 s, 1344×768, 124-frame clip with audio at 50 steps: **4 × H200 mean latency 75.1 s** (53.7 s with the Cache-DiT "high" setting); 8 × B300 19.0 s. | MiniMax API docs: Video Generation; Run and self-host H3 | https://platform.minimax.io/docs/guides/video-generation ; https://platform.minimax.io/docs/guides/local-deploy-h3.md | P | H |

### 2.6 Water

| Value | Unit | Scope | Source (date) | URL | P/S | Conf. |
|---|---|---|---|---|---|---|
| **0.12** (2025); 0.15 (2024) | L withdrawn per kWh of IT load | AWS global on-site WUE; Ireland 0.02 | Amazon Sustainability (AWS) | https://sustainability.aboutamazon.com/products-services/aws-cloud | P | H |
| **0.27** (FY25); 0.30 (FY24) | L/kWh | Microsoft global WUE; APAC 0.03 → **0.25**; Americas 0.34; EMEA 0.03 | Microsoft Datacenters | https://datacenters.microsoft.com/sustainability/efficiency/ | P | H |
| 0.18 (from 0.20) | L/kWh | Meta WUE | Search summary (Meta 2025 report) | | S | L–M |
| **1.15** | L/kWh (consumptive, ISO WUE category 2) | Google data centres supporting LLMs, 2023 and 2024; applied to (E_total − E_overhead); Google consumes ~80% of water withdrawn | Google Gemini paper (Aug 2025) | as above | P | H |
| 0.94 consumption; 1.21 withdrawal | L/kWh (my calculation) | Google all data centres 2025: 10,523 Mgal consumption, 13,562 Mgal withdrawal ÷ 42.42 TWh DC electricity | Google 2026 Environmental Report data tables | as above | P (derived) | H |
| 0.55 on-site; **3.142 off-site** | L/kWh | US average used for GPT-3: Microsoft US WUE; EWIF for US electricity | Li, Yang, Islam, Ren, "Making AI Less Thirsty", arXiv 2304.03271 (latest version) | https://arxiv.org/abs/2304.03271 | P | H |
| Site values (on-site / off-site) | L/kWh | Arizona 1.63 / 4.96; Iowa 0.14 / 3.10; Texas 0.25 / 1.29; Virginia 0.14 / 2.39; Washington 0.95 / 9.50; Ireland 0.02 / 1.48; Sweden 0.09 / 6.02; Finland 0.01 / 4.54; Denmark 0.01 / 3.18; Netherlands 0.06 / 3.45; **Indonesia (projected) 1.90 / 2.27**; India 0.00 / 3.45 | same, Table 1 (Microsoft PUE and WUE by site) | same | P | H |
| ~1–9 | L/kWh on-site evaporation | Cooling towers: about 1 (Google's annualized global figure) to 9 (Arizona commercial data centre in summer) | same | same | P | M |
| 3.7 | L/kWh | Meta self-reported scope-2 (off-site) water, 2023 | same, citing Meta | same | S | M |
| 43.8 withdrawal / 3.1 consumption | L/kWh | US national average water for electricity | same | same | S | M |
| 10–50 responses per 500 mL | | GPT-3, on-site plus off-site | same | same | P | M |
| EcoLogits off-site WUE (WRI) | L/kWh | CHN **6.01**; MYS **1.68**; SGP 3.908 (world default, no data); USA 3.13; IRL 1.48; SWE 6.03; NOR 6.66; FIN 4.53; WOR 3.908 | EcoLogits `electricity_mixes.json` | https://github.com/mlco2/ecologits | P | M (the WRI values include hydro reservoir evaporation) |
| EcoLogits on-site WUE defaults | L/kWh | ByteDance and Kling 0.50; Alibaba and Tencent 0.569; OpenAI 0.569; Google 0.999 | EcoLogits | as above | P (assumption) | L as fact |
| **0.26 mL** / 0.03 gCO2e / 0.24 Wh | per prompt | Median Gemini Apps text prompt, May 2025; on-site consumptive water only | Google Gemini paper (Aug 2025) | as above | P | H |
| **45 mL** / 1.14 gCO2e / 0.16 mg Sb eq | per 400-token response | Mistral Large 2 marginal impact; location-based; LCA with Carbone 4 and ADEME (AFNOR Frugal AI); training: 20.4 ktCO2e and 281,000 m³ | Mistral AI, "Our contribution to a global environmental standard for AI" (22 July 2025) | https://mistral.ai/news/our-contribution-to-a-global-environmental-standard-for-ai | P | H |
| China data-centre water | The 2024 plan calls for water-saving evaluation of new data centres and a combined energy, carbon and water efficiency system; **no national WUE figure found** | NDRC et al. 2024 | as above | P | Gap |

### 2.7 Embodied carbon of AI hardware

| Value | Unit | Scope | Source (date) | URL | P/S | Conf. |
|---|---|---|---|---|---|---|
| **1,312** (164 per GPU) | kgCO2e | HGX H100 **baseboard**: 8 GPUs, 640 GB HBM3, 24 kg, 5,600 W typical; cradle-to-gate; memory 42%, ICs 25%, thermal 18%; ISO 14067, by WSP | NVIDIA PCF Summary, HGX H100 (July 2025) | https://images.nvidia.com/aem-dam/Solutions/documents/HGX-H100-PCF-Summary.pdf | P | H |
| **2,274** (284 per GPU) | kgCO2e | HGX B200 baseboard: 8 × B200, 32 kg, up to 1,000 W per GPU; memory 49%, ICs 28%, thermal 12% | NVIDIA PCF Summary, HGX B200 (July 2025) | https://images.nvidia.com/aem-dam/Solutions/documents/HGX-B200-PCF-Summary.pdf | P | H |
| 225 | kgCO2e per H100 card | Bottom-up model (memory 176 kg); compared with NVIDIA's 164 | Morand, Névéol, Ligozat, "The Rising Unsustainability of AI Graphics Cards Production", arXiv 2607.01258 (2026) | https://arxiv.org/abs/2607.01258 | P | M |
| 273 (H100); 364 (H200) | kgCO2e per GPU | Multi-criteria GPU LCA (ADEME technical report); used by EcoLogits | Lees-Perasso et al. 2026, via EcoLogits | https://ecologits.ai/latest/methodology/llm_inference/ | S (report not fetched) | M |
| 127.6 (cradle-to-gate); 141 (cradle-to-grave) | kgCO2e per A100 | Primary teardown data; **0.0054 kgCO2e per GPU-hour** at 6 years and 85% utilization (≈0.003 at the original study's lifetime and utilization assumptions) | Falk et al., "More than Carbon…", arXiv 2509.00093 (EIAR 2026) | https://arxiv.org/abs/2509.00093 | P | M |
| 5,700 / 6,000 | kgCO2e per 8-GPU server (without GPUs) | Boavizta p5.48xlarge / DGX base (includes large RAM and SSD; probably conservative-high) | EcoLogits | as above | P (model) | M |
| **692** (TPU v6e) | kgCO2e per TPU chip over 6 years | Includes host-CPU share (260) and data-centre construction (109); TPU manufacturing and transport 323. Operational 2,141 market-based / 5,759 location-based. Embodied share 24% market-based, 11% location-based. | Schneider et al., "Life-Cycle Emissions of AI Hardware", arXiv 2502.01671 (Feb 2025) | https://arxiv.org/abs/2502.01671 | P | H |
| TPU v6e machine vs accelerator power | 2,173 W per machine vs 153 W per TPU × 8 = 1,224 W | Host is about 44% of machine power. Machine/accelerator ratio: 1.78× (v6e), 2.2× (v5e), 1.97× (v4i), 1.78× (v4), 1.64× (v5p). | same, Table 1 | same | P | H |
| 0.010 of 0.033 g per prompt | gCO2e | Gemini Scope 1+3 (embodied) share per median prompt, which implies **~42 gCO2e embodied per kWh** of serving energy | Google Gemini paper | as above | P (derived) | M |

**Amortized per GPU-hour (my calculations; "busy hour" = hours of billable work):**

| Case | kgCO2e per GPU-hour |
|---|---|
| NVIDIA HGX H100 baseboard only, 3 years, 100% (≈ DGC) | 0.0062 |
| NVIDIA HGX H100 baseboard only, 5 years, 80% | 0.0047 |
| NVIDIA HGX B200 baseboard only, 5 years, 80% | 0.0081 |
| DGC Toolkit (128.3 kg × 1.25; 3 years; 100%) | 0.0061 |
| H100 GPU only, 273 kg, 5 years, 70% | 0.0089 |
| TPU v6e per chip (incl. host share), 6 years, 100% | 0.0132 |
| EcoLogits video DGX H800 ((6,000 + 8×273) / 8), 6 years, 85% | 0.0229 |
| HGX H100 + 5,700 kg host, 5 years, 70% | 0.0286 |
| EcoLogits DGX H800, 5 years, 70% | 0.0334 |
| HGX B200 + 6,000 kg host, 5 years, 70% | 0.0337 |
| EcoLogits LLM (current), 3 years, 100% | 0.0375 |
| EcoLogits video DGX H800, 3 years, 100% | 0.0389 |
| EcoLogits DGX H800, 3 years, 70% | 0.0556 |

Per kWh cross-check: EcoLogits DGX H800 comes to 57 gCO2e per kWh of IT energy, or 48 g per kWh of facility energy at PUE 1.2. Google Gemini implies about 42 g/kWh.

### 2.8 Measurement boundary and server overhead

| Value | Scope | Source | URL | P/S | Conf. |
|---|---|---|---|---|---|
| 0.24 Wh = accelerators 0.14 (58%) + host CPU/DRAM 0.06 (25%) + idle machines 0.02 (10%) + data-centre overhead 0.02 (8%) | Median Gemini Apps text prompt, May 2025, full stack | Elsworth, Huang, Patterson et al. (Google), Aug 2025 | https://services.google.com/fh/files/misc/measuring_the_environmental_impact_of_delivering_ai_at_google_scale.pdf | P | H |
| 0.10 Wh | "Existing approach": active accelerators only, top-10% most efficient data centres | same | same | P | H |
| **2.4×** | Comprehensive ÷ existing | same | same | P | H |
| **1.72×** | Multiplier on active-accelerator energy to reach production serving energy (vs "2×" in earlier estimates) | same | same | P | H |
| 33× energy, 44× carbon | Reduction per median prompt over 12 months | same | same | P | H |
| 1.21× | EcoLogits LLM: (8 × 0.7 kW GPUs + 1.2 kW server) ÷ GPUs at full TDP | EcoLogits | as above | P (derived) | M |
| 1.59× | DGC: 0.7775 kW per slot ÷ 0.49 kW GPU | DGC JS | as above | P (derived) | H |
| 5.6 kW vs ~10 kW | GPU-only TDP of an 8×700 W node vs "DGX-class" system power range | NVIDIA HGX H100 PCF (5,600 W typical); Jegham et al. ("DGX-class GPUs at 5.6–10 kW") | as above | P | M |
| Internal inconsistency in the Google paper | Table 2 gives the existing approach as 0.02 g and 0.12 mL; the body text says 0.01 g and 0.15 mL | same | same | P | H (noted) |

### 2.9 Company disclosures (headline factors)

| Company | Metric | Value | Source (date) | P/S | Conf. |
|---|---|---|---|---|---|
| Google | Data-centre electricity | **42.42 TWh (2025)**; 30.64 TWh (2024); 23.98 TWh (2023) | 2026 Environmental Report data tables (30 June 2026) | P | H |
| Google | Freshwater replenished | 7.7 billion gal = 78% of 2025 freshwater consumption | same | P | H |
| Google | Electricity by region | Asia-Pacific 4.49 TWh of 43.59 TWh total | same | P | H |
| Microsoft | PUE / WUE | FY25 1.17 / 0.27 L/kWh; FY24 1.16 / 0.30 | datacenters.microsoft.com | P | H |
| Microsoft | 2025 emissions | "Data center expansion drove 25% emissions spike in 2025" (headline) | ESG Dive (2026) | S | M |
| AWS | PUE / WUE | 1.14 / 0.12 (2025) | Amazon Sustainability | P | H |
| MiniMax | Revenue, cost of sales, R&D | 2025 revenue **US$79.04M** (73% outside mainland China); cost of sales US$58.96M (gross margin 25.4%); R&D US$252.8M, driven by training cloud spend; fair-value loss US$1.59B | Annual Report 2025 (22 Apr 2026) | P | H |
| MiniMax | Cloud spend mix | Inference cloud costs are more than 90% of cost of sales in every year (9M-2025: US$37.99M, 92.7%). Training cloud in R&D: 2024 US$140.6M (74.4% of R&D); 9M-2025 US$142.4M (79.0%). | Prospectus (31 Dec 2025) | P | H |
| MiniMax | GHG / energy disclosed | Scope 2 of 425.1 tCO2e and **735,824 kWh (9M-2025) = offices only** (Beijing, Shanghai, Chongqing, Chengdu). Cloud compute is excluded. Target: −55% Scope 1+2 per unit revenue by 2030 vs 2024. | Prospectus pp. 325–327 | P | H |
| MiniMax | Efficiency claims | ">75% inference MFU"; NCR architecture gives "2.5×" training and inference efficiency for Hailuo-02 | Prospectus | P (self-claim) | M |
| ByteDance / Volcano Engine | ESG, energy, PUE, renewable share | **Not found**: no consolidated report located; bytedance.com CSR pages unavailable; volcengine.com JS-only | Gap |
| Alibaba Cloud | PUE, clean energy | **Not retrieved** (alibabagroup.com ESG page is JS-only) | Gap |

---

## 3. Methodology notes

### 3.1 Core formulas the tool should use

These are consistent with EcoLogits, Li et al. and Google.

- **IT energy per clip.** E_IT = E_GPU × k_server × k_idle. E_GPU is GPU-only energy (from Jegham, NVML or EcoLogits video). k_server is the host overhead: CPU, DRAM, NICs, fans and PSU losses. k_idle covers provisioned idle capacity. If the source already reports whole-server or wall power, set k_server = 1. DGC already embeds about 1.59× and EcoLogits LLM about 1.2×.
- **Facility energy.** E_fac = E_IT × PUE.
- **Operational CO2e.** E_fac × grid factor (location-based by default; market-based as a labelled alternative).
- **Embodied CO2e.** (busy GPU-hours) × EF_emb, where EF_emb (kgCO2e per GPU-hour) = (GPU PCF + host share + optional building share) ÷ (lifetime h × utilization). Batch-size-1 video means one request occupies the whole GPU group (Jegham; EcoLogits video).
- **Water (L).** E_IT × WUE_on + E_fac × WUE_off, which is the same as E_IT × (WUE_on + PUE × WUE_off). WUE_on is usually defined per kWh of IT energy.

### 3.2 Why the Google boundary matters

Most public video-energy numbers are **GPU-only and at high utilization**. That covers Jegham's NVML measurements, the EcoLogits video "server power" (a TDP-based distribution around 5.4 kW for 8×H800, about 97% of 8×700 W, which looks GPU-only) and the ML.ENERGY data.

Google's production measurement shows what that misses:

| Component | Multiplier on active-accelerator energy |
|---|---|
| Host CPU and DRAM | +43% |
| Idle provisioned machines | +14% |
| PUE | +9% |
| **Total** | **1.72×** |

Relative to a benchmark-style "best DC, accelerators-only" number, the full stack is **2.4×**. For a fair comparison against film-production energy, which is metered at the building or generator, AI estimates must use the same full-stack boundary. For TPU fleets, machine power is 1.6 to 2.2× accelerator power (Schneider et al.). GPU hosts carry less relative overhead because the GPUs draw 700 to 1,000 W each.

**Market-based and location-based factors differ widely.** Google's 2024 market-based factor is 94 gCO2e/kWh and its location-based factor is 345, a 3.7× gap. The 0.03 g per prompt headline is market-based. The tool should default to location-based and show market-based only as a labelled alternative.

### 3.3 Carbon-factor families differ, so do not mix silently

- **MEE (China).** Consumption-side national, regional and provincial CO2 only (combustion). Published about two years in arrears: the 2023 factor came out on 31 Dec 2025.
- **MEE "carbon footprint factor".** Lifecycle CO2e: 0.578 kg/kWh for 2024.
- **Ember/OWID.** Lifecycle CO2e of generation, and current (2025).
- **eGRID.** Combustion CO2e of US generation, 2023, with no upstream emissions.

Lifecycle factors run about 5 to 15% above combustion factors. For China, Ember 2024 is 555 and the MEE 2024 footprint factor is 578, which is consistent. Ember 2025 at 525 is close to MEE's 2023 combustion factor of 531 because the grid decarbonized about 5% in 2025. **Recommendation:** use Ember/OWID lifecycle factors for all countries, for consistency and currency, and offer the official national factors (MEE, eGRID, LADWP PCL) as local overrides.

### 3.4 Water definitions

- AWS WUE is *withdrawal* per kWh of IT load.
- Google's 1.15 is *consumptive* (category 2) per kWh of IT energy.
- Microsoft does not specify the IT basis on its page.

Off-site (scope-2) water from WRI/EWIF includes **hydro reservoir evaporation**. That inflates Nordic, Chinese, Brazilian and New Zealand values (EcoLogits: NOR 6.7, SWE 6.0, CHN 6.0 L/kWh). Some LCAs exclude it. **Google's 0.26 mL per prompt excludes off-site water altogether.**

Mistral's 45 mL per response includes more of the life cycle, and its response is bigger. Li et al.'s GPT-3 figures (about 17 mL per request on-site plus off-site in the US) sit in between. These are boundary differences, not contradictions.

### 3.5 Assessment of the DGC Toolkit for filmmakers

**Strengths**
- It is transparent in intent: an LCA framing (ISO 14040/44, ITU), a bottom-up model and a stated system boundary.
- It covers text, image, audio and video with simple and advanced modes, in English and French.
- It includes PUE, embodied carbon and grid choice, plus a reasoning toggle.
- It provides relatable equivalents and a best-practice guide aimed at screen professionals.
- It has an institutional home (the DGC), funding (Telefilm) and a dated dataset (1 March 2026). The site itself is built to low-carbon web principles.

**Shortfalls for filmmakers**
1. **CO2 only.** There is no water output, even though the fact sheet discusses water.
2. **Inconsistent energy.** The displayed kWh excludes PUE while the CO2 includes it, so energy reads 13% low.
3. **Video physics is linear.** Cost scales linearly with frames × pixels at a fixed 1,335 tokens/s. Real diffusion-transformer cost grows with denoising steps and super-linearly with resolution and length: quadratic attention terms appear in the Jegham and EcoLogits regressions. There are only two resolutions (720p and 1080p), no 2K or 4K, and no audio track. Every model is treated the same, so Seedance, Veo, Sora and Kling are indistinguishable.
4. **Provider and grid list.** Only five US providers plus US, Canada and World averages. There are no ByteDance, MiniMax, Kuaishou or Alibaba options, and no China, Singapore or Malaysia grids. The provider factors are undocumented; "Google" is 0.418 against Google's own 2024 location-based figure of 0.345.
5. **Embodied carbon is about 6× lower than EcoLogits.** It uses 128.3 kg per GPU × 1.25 over 3 years at 100% utilization, which is 0.006 kg per GPU-hour against 0.038.
6. **No idle or over-provisioning term, and no uncertainty ranges.** EcoLogits gives intervals.
7. **It works per task.** It has no project or production aggregation (the FAQ admits this), no retries or iteration modelling beyond an "attempts" count, no storage or rendering/transcoding, no end-user devices or networks, no training amortization and no dollar cost.
8. **The fact sheet does not match the current code.** The image (2.9 g) and audio (2.1 g) figures do not reproduce, while video (54.6 g) and summary (9.8 g) do.
9. **Undocumented parameters.** The parameter values appear only in the JS.

---

## 4. Gaps, uncertainties and recommended assumptions

### 4.1 Recommended default conversion factors (low / central / high)

"Busy GPU-hour" means an hour a GPU spends serving requests. Grid factors are location-based, lifecycle gCO2e/kWh unless noted.

**A. PUE (facility energy ÷ IT energy)**

| Context | Low | Central | High | Justification |
|---|---|---|---|---|
| **Seedance via BytePlus ModelArk (Johor, MY)** | 1.15 | **1.30** | 1.50 | Low = best-in-class tropical hyperscale (Google Singapore 1.12 and 1.14). Central ≈ Microsoft APAC FY25 1.28, slightly above the EcoLogits assumption of 1.20 given the tropical climate and likely leased/colocation capacity. High ≈ Uptime 2025 global average 1.54 and new builds 1.48. |
| **MiniMax (Alibaba Cloud and other Chinese clouds)** | 1.15 | **1.30** | 1.50 | Policy: new large data centres 1.25 or less, hub nodes 1.2 or less by end-2025 (P). National average about 1.46–1.48 (S). Hyperscale cloud fleets are likely below average. |
| US hyperscale (Veo, fal.ai-hosted H3 Max, self-host in a US cloud) | 1.08 | 1.12 | 1.20 | Google 1.09, AWS 1.14, Microsoft 1.17; EcoLogits OpenAI 1.20. |
| Unknown or generic colocation | 1.30 | 1.54 | 1.80 | Uptime 2025 average 1.54. High is a judgment for legacy sites (the 2011 average was 1.98). |

**B. Grid carbon intensity by likely inference region (gCO2e/kWh)**

| Region (when to use it) | Low | Central | High | Justification |
|---|---|---|---|---|
| **Johor, Malaysia**: default for Seedance international API | 497 | **602** | 700 | Central: Malaysia 2025 (Ember). Low: Singapore 2025 (the EcoLogits default location, or if served from Singapore). High is a *judgment*: the Peninsular grid (Johor) excludes Sarawak hydro, so it is likely above the national figure. The official Energy Commission GEF was not retrieved. |
| **China national**: default for MiniMax API and Volcano Engine domestic | 404 | **530** | 650 | Central: MEE 2023 national 530.6 (P), which matches Ember 2025 at 525. Low: Southern grid 404. High: North China grid 636, Inner Mongolia 648, Hebei 652 (MEE 2023). Many of MiniMax's suppliers are Beijing (North China grid) or Zhejiang (East China grid, 550) based. |
| China hub overrides | n/a | Inner Mongolia 648; Ningxia 619; Guizhou 568; Hebei (Zhangbei) 652; Gansu 447; Beijing 555; Zhejiang 497 | n/a | MEE 2023 provincial factors (CO2, direct). |
| Singapore | 410 | 497 | 520 | Ember lifecycle 497. Low reflects EMA's CO2-only operating-margin method (unverified). |
| Dublin (BytePlus EU spill-over) | 250 | 257 | 290 | Ember 2025 257; 2024 271. |
| US average | 350 | **384** | 416 | eGRID2023 350 (combustion) / Ember 2025 384 (lifecycle) / PJM West 416. |
| Virginia, Ashburn (PJM, Dominion) | 245 | 271 | 416 | VA state / SRVC and RFCE subregions / RFCW. |
| Oregon, The Dalles and Hillsboro | 166 | 288 | 350 | OR state / NWPP subregion (eGRID-recommended for Scope 2) / US average. |
| California (CAISO) | 179 | 195 | 229 | CA state / CAMX / LADWP. |
| **LADWP (user's utility, for conventional-production electricity)** | 0 (Green Power for Green LA product) | **229** | 229 | 2024 PCL 505 lb/MWh. Rooftop PV lifecycle is about 48 g/kWh for self-consumed solar. |
| Nordics | 28 | 35–57 | 114 | NO 28, SE 35, FI 57, DK 114 (Ember 2025). |
| World | n/a | 458 | n/a | Ember 2025. |

**C. Water (L/kWh). Formula: E_IT × (on-site + PUE × off-site)**

| Context | On-site low / central / high | Off-site low / central / high | Justification |
|---|---|---|---|
| **Johor, MY (Seedance)** | 0.12 / **0.50** / 1.90 | 1.2 / **1.7** / 3.9 | On-site: AWS fleet 0.12; EcoLogits ByteDance 0.50; Microsoft projected Indonesia 1.90 (tropical evaporative cooling). Off-site: WRI Malaysia 1.68 (EcoLogits); high = WRI world default 3.9 (EcoLogits' Singapore value); low is a judgment (−30%). |
| **China (MiniMax)** | 0.14 / **0.57** / 1.63 | 1.5 / **3.0** / 6.0 | On-site: Li et al. cool-climate Microsoft sites 0.14; EcoLogits Alibaba/Tencent 0.569; Arizona 1.63. Off-site: WRI China 6.0 includes hydro reservoir evaporation; central 3.0 and low 1.5 are *judgments* that discount it (low confidence). |
| US hyperscale | 0.12 / 0.55 / 1.15 | 2.4 / **3.1** / 5.0 | AWS / Li et al. US average / Google consumptive; off-site Virginia / US average / Arizona (Li et al.). |
| Ireland / Nordics | 0.02 / 0.09 / 0.3 | 1.5 / 4.5 / 6.7 | On-site: Li et al. Ireland 0.02 and Sweden 0.09; high = Microsoft global FY24 0.30. Off-site: Li et al. Ireland 1.48; EcoLogits WRI FIN 4.5, NOR 6.7 (hydro evaporation included). |

Combined central, per kWh of IT energy: Johor ≈ 0.5 + 1.3×1.7 = **2.7 L/kWh_IT**; China ≈ 0.57 + 1.3×3.0 = **4.5**; US ≈ 0.55 + 1.12×3.1 = **4.0**.

**D. Embodied carbon (kgCO2e per busy GPU-hour, 8-GPU H100/H800/B200-class server share)**

| Low | Central | High | Justification |
|---|---|---|---|
| **0.006** | **0.03** | **0.055** | Low: NVIDIA HGX baseboard PCF only (164–284 kg per GPU) over 5 years at 80% utilization. This equals the DGC value, but it omits the host server. Central: about 1.0 t per GPU slot (GPU 273–284 kg plus about 750 kg host share from Boavizta's 6 t per 8-GPU server) over 5 years at 70% utilization, giving 0.029–0.034. High: the same 1.0 t over 3 years (the EcoLogits lifetime) at 70% utilization, giving 0.056. Cross-check: the central value equals about 30–45 g per kWh, consistent with Google's implied 42 g/kWh and EcoLogits' 48–57 g/kWh. For TPU (Veo), use 0.013 per chip-hour (Schneider et al., 6 years, 100%). |

**E. Server overhead multiplier on GPU-only energy (before PUE)**

| Component | Low | Central | High | Justification |
|---|---|---|---|---|
| Host overhead (k_server) | 1.2 | **1.5** | 1.8 | EcoLogits LLM 1.21; Google (host + idle) 1.57 and DGC 1.59; TPU machine/accelerator 1.64–2.2 and DGX-class ~10 kW vs 5.6 kW GPU TDP. |
| Idle / provisioning (k_idle; skip if already inside k_server) | 1.0 | 1.1 | 1.25 | Google: idle machines about 10% of serving energy. |
| Resulting full-stack factor on GPU-only energy (k_server × PUE) | 1.38 | **1.95** (Johor) | 2.7 | Google's measured 1.72 for its efficient fleet is a floor-ish reference for a PUE-1.09 operator. |

**F. Amortization parameters**

| Parameter | Low | Central | High | Justification |
|---|---|---|---|---|
| Lifetime | 3 years | 5 years | 6 years | EcoLogits / judgment / Google TPU LCA and Falk et al. |
| Utilization | 50% | 70% | 85% | Falk et al. used 85%. Batch-1 video serving and bursty demand argue for lower. |

**Worked sensitivity example.** Hold GPU energy fixed at EcoLogits' Seedance 1.5 Pro, 1080p, 5 s mean. That is 67.7 s on 8×H800 at 5.44 kW, or 0.102 kWh of server energy.

| Infra case | Factors | CO2e | Water |
|---|---|---|---|
| EcoLogits default | SGP, PUE 1.2, no host multiplier | 62 g | 0.53 L |
| Low | k 1.2, PUE 1.15, 497 g/kWh, water 0.12 / 1.2, embodied 0.006 | 71 g | 0.18 L |
| **Central** | k 1.5, PUE 1.3, 602 g/kWh, water 0.5 / 1.7, embodied 0.03 | **125 g** (0.199 kWh facility) | **0.42 L** |
| High | k 1.8, PUE 1.5, 700 g/kWh, water 1.9 / 3.9, embodied 0.055 | 202 g | 1.43 L |

Infrastructure factors alone span about 2.8× in CO2 and about 8× in water.

### 4.2 Default region assignment

| Model and access path | Default region | Confidence |
|---|---|---|
| Seedance 2.x via BytePlus ModelArk (international API) | **Johor, MY**. Seedance is listed only in ap-southeast-1; EU spill-over is possible but Seedance is not listed there. | H for the region, M that no other region serves it |
| Seedance via Volcano Engine (China domestic) or Dreamina/Jimeng apps | **China national**; data-centre location undisclosed | L |
| Seedance via third-party aggregators (e.g. fal.ai) | Probably proxied to BytePlus (Johor) | L |
| MiniMax H3 via MiniMax API | **China national**, via Alibaba Cloud and Zhejiang/Beijing clouds; possibly Singapore for international users | L–M |
| MiniMax H3 Max via fal.ai | US hyperscale factors | L–M |
| MiniMax H3 self-hosted (open weights) | The user's own region, e.g. LADWP 229 g/kWh; measure directly with NVML/CodeCarbon | H |

### 4.3 Hardware notes

- The literature assumes Seedance runs on **DGX H800**. ByteDance's reported Malaysian B200 build-out (March 2026) suggests Seedance 2.x international inference may run on **B200**. That would mean more embodied carbon per GPU (284 vs 164 kg PCF) but likely less energy per clip. Treat hardware as uncertain and lean on latency-based energy with ranges.
- MiniMax H3's published benchmark (4×H200, 75.1 s per 5 s 768p clip with audio, 50 steps) gives about **53 Wh GPU-only at 0.9×TDP**. That becomes about 79 Wh with k_server 1.5 and about 103 Wh at PUE 1.3. This is a handoff to stream A1.

### 4.4 Conflicts and discrepancies

1. **Seedance location, SGP vs MYS.** EcoLogits assumes Singapore (497 g, off-site 3.9 L/kWh default), but BytePlus serves from Johor (602 g, 1.7 L/kWh). Johor is +21% on CO2 and about −50% on the EcoLogits water total.
2. **The same country gives different China factors.** MEE 2023 is 531 (CO2, combustion, 2023). Ember 2025 is 525 (lifecycle, 2025). The MEE 2024 footprint factor is 578 (lifecycle incl. T&D). MEE "excluding market-traded non-fossil" is 610. The differences come from scope and year.
3. **US.** eGRID2023 is 350 (combustion CO2e). Ember 2025 is 384 (lifecycle). DGC uses 414, close to Ember 2022's 410.
4. **Embodied GPU.** NVIDIA puts H100 at 164 kg (baseboard share), Morand et al. at 225, Lees-Perasso et al. at 273, and Falk et al. puts A100 at 128–141. The spread comes from memory modelling and boundary. The host server (5.7–6 t in Boavizta) dominates the EcoLogits embodied total and is probably conservative.
5. **Water per prompt.** Google 0.26 mL (on-site only, IT basis), Li et al. about 17 mL (on-site plus off-site, GPT-3) and Mistral 45 mL (fuller LCA) differ because of boundaries.
6. **PUE, Uptime 1.54 vs hyperscalers 1.08–1.17.** The Uptime sample is dominated by enterprise and colocation sites.
7. **China PUE.** Figures of 1.46 (CAICT 2024, S), 1.48 (end-2023, S), ~1.5 (OIES) and 1.40 (a Frontiers modelling assumption) reflect different samples and years.
8. **Google paper, internal.** Table 2 and the body text give different "existing approach" water and CO2 values.
9. **DGC fact sheet vs code.** Image and audio values do not reproduce.
10. **BytePlus docs.** The region page and model list disagree on which EU models exist. This does not affect Seedance.

### 4.5 Gaps to close later

- **Unverified official grid factors.** Singapore EMA's grid emission factor and Malaysia's Energy Commission (Peninsular) GEF were not retrieved. EMA blocks bots, and WebSearch was exhausted.
- **Missing operator disclosures.** There is no ByteDance, Volcano Engine or BytePlus disclosure of PUE, WUE, renewable share or data-centre energy. Alibaba Cloud PUE and clean-energy share were not retrieved.
- **Missing water data.** There is no Chinese data-centre WUE statistic, and no hydro-excluded off-site water factor for China or Malaysia (low and central for China are judgments).
- **Inaccessible sources.** IEA's world average (403), Antarctica's OTM equations (429 Vercel checkpoint) and Meta's primary PUE/WUE report were not fetched.
- **Missing data releases and reports.** eGRID2024 is not yet listed on EPA's summary-data page (last updated 21 Sep 2026). Lees-Perasso et al. 2026 (ADEME) was cited by EcoLogits but not fetched.
- **Missing lifetime evidence.** No verified hyperscaler server-depreciation lifetimes were collected this session. The 5-year central lifetime is a judgment between EcoLogits' 3 years and Google's 6.

---

## 5. Sources

**DGC Toolkit**
1. DGC Green GenAI Toolkit calculator (dataset 1 Mar 2026): https://genaitoolkit.dgcgreen.ca/en/calculator
2. DGC Toolkit JS bundle containing the model: https://genaitoolkit.dgcgreen.ca/_app/immutable/nodes/8.nIew7tbV.js
3. DGC Toolkit About, Guide and FAQ pages: https://genaitoolkit.dgcgreen.ca/en/about ; https://genaitoolkit.dgcgreen.ca/en/guide ; https://genaitoolkit.dgcgreen.ca/en/faq
4. DGC Fact Sheet PDF: https://genaitoolkit.dgcgreen.ca/pdf/FactSheet%20(PDF%20EN).pdf
5. DGC press release (22 Apr 2026): https://www.dgc.ca/en/national/press-release/dgc-launches-low-carbon-genai-toolkit ; Broadcast Dialogue coverage: https://broadcastdialogue.com/dgc-launches-toolkit-aimed-at-reducing-genai-environmental-impact/

**Other calculators and methodologies**

6. Antarctica One-Token Model: https://antarctica.io/research/one-token-model (blocked) ; https://antarctica.substack.com/p/the-one-token-model ; https://github.com/thegreenwebfoundation/DIST/issues/57
7. EcoLogits LLM methodology: https://ecologits.ai/latest/methodology/llm_inference/
8. EcoLogits video methodology: https://ecologits.ai/latest/methodology/video_generation/ ; blog (18 Jun 2026): https://ecologits.ai/latest/blog/2026/06/18/video-impacts/ ; ByteDance provider page: https://ecologits.ai/latest/tutorial/providers/bytedance/ ; video tutorial: https://ecologits.ai/latest/tutorial/video_generation/
9. EcoLogits package v0.11.1 (data files) and older versions 0.5–0.9: https://pypi.org/project/ecologits/ ; https://github.com/mlco2/ecologits
10. Jegham, Gamazaychikov, Luccioni, "Lights, Camera, Carbon", arXiv 2607.04553 (Jul 2026): https://arxiv.org/abs/2607.04553
11. CodeCarbon methodology (v3.3.1): https://mlco2.github.io/codecarbon/latest/explanation/methodology/

**PUE and operator disclosures**

12. Uptime Institute Global Data Center Survey 2025: https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2025.Annual.Survey.Report.pdf
13. Uptime Institute Global Data Center Survey 2024: https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2024.GlobalDataCenterSurvey.Report.pdf
14. Google data center efficiency page: https://datacenters.google/efficiency/
15. Google 2026 Environmental Report (30 Jun 2026): https://sustainability.google/files/google-2026-environmental-report ; blog: https://blog.google/company-news/outreach-and-initiatives/sustainability/2026-environmental-report/
16. Google, "Measuring the environmental impact of delivering AI at Google Scale" (Aug 2025): https://services.google.com/fh/files/misc/measuring_the_environmental_impact_of_delivering_ai_at_google_scale.pdf
17. Microsoft datacenter efficiency: https://datacenters.microsoft.com/sustainability/efficiency/
18. Amazon/AWS sustainability: https://sustainability.aboutamazon.com/products-services/aws-cloud
19. NDRC, MIIT, NEA and NDA, 数据中心绿色低碳发展专项行动计划 (3 Jul 2024): https://www.gov.cn/zhengce/zhengceku/202407/content_6964165.htm ; PDF: https://www.gov.cn/zhengce/zhengceku/202407/P020240724272072479001.pdf ; English summary: https://english.www.gov.cn/news/202407/24/content_WS66a0b167c6d0868f4e8e96ba.html
20. Carbon Brief explainer on China's data-centre energy demand (16 Apr 2025): https://www.carbonbrief.org/explainer-how-china-is-managing-the-rising-energy-demand-from-data-centres
21. OIES (A. Hove), "The China data centre advantage" (Feb 2026): https://www.oxfordenergy.org/wpcms/wp-content/uploads/2026/02/Comment-The-China-data-centre-advantage.pdf
22. Frontiers in Energy Research (2026): https://www.frontiersin.org/journals/energy-research/articles/10.3389/fenrg.2026.1774740/full

**Grid carbon intensity**

23. MEE 2023 electricity CO2 emission factors (31 Dec 2025): https://www.mee.gov.cn/xxgk2018/xxgk/xxgk01/202512/t20251231_1139517.html ; PDF: https://www.mee.gov.cn/xxgk2018/xxgk/xxgk01/202512/W020251231726284332528.pdf
24. MEE 2022 electricity CO2 emission factors (20 Dec 2024): https://www.mee.gov.cn/xxgk2018/xxgk/xxgk01/202412/t20241226_1099413.html
25. MEE 2024 electricity carbon footprint factors (24 Oct 2025): https://www.mee.gov.cn/xxgk2018/xxgk/xxgk01/202510/t20251024_1130734.html ; PDF: https://www.mee.gov.cn/xxgk2018/xxgk/xxgk01/202510/W020251024569470952545.pdf
26. Ember Global Electricity Review 2026: https://ember-energy.org/app/uploads/2026/04/Global-Electricity-Review-2026.pdf
27. OWID/Ember lifecycle carbon intensity of electricity (updated 30 Jun 2026): https://ourworldindata.org/grapher/carbon-intensity-electricity
28. EPA eGRID2023 summary tables rev2 (Jun 2025): https://www.epa.gov/system/files/documents/2025-06/summary_tables_rev2.pdf ; eGRID home: https://www.epa.gov/egrid
29. CEC 2024 Power Content Label, LADWP: https://www.energy.ca.gov/filebrowser/download/9140

**Inference location**

30. BytePlus ModelArk Region availability: https://docs.byteplus.com/en/docs/ModelArk/2191806 ; Model list: https://docs.byteplus.com/en/docs/ModelArk/1330310 ; Seedance 2.5 tutorial: https://docs.byteplus.com/en/docs/ModelArk/2607688
31. The Straits Times (Reuters, citing WSJ) on ByteDance and Aolani Cloud Nvidia chips in Malaysia (13 Mar 2026): https://www.straitstimes.com/business/companies-markets/chinas-bytedance-gets-access-to-top-nvidia-ai-chips-wsj-reports
32. MiniMax Global Offering prospectus (31 Dec 2025): https://www1.hkexnews.hk/listedco/listconews/sehk/2025/1231/2025123100025.pdf
33. MiniMax Annual Report 2025 (22 Apr 2026): https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0422/2026042202118.pdf
34. MiniMax API docs, Video Generation: https://platform.minimax.io/docs/guides/video-generation ; H3 self-host guide: https://platform.minimax.io/docs/guides/local-deploy-h3.md
35. Wikipedia, MiniMax Group (secondary; used for IPO date and references): https://en.wikipedia.org/wiki/MiniMax_(company)

**Water**

36. Li, Yang, Islam, Ren, "Making AI Less Thirsty", arXiv 2304.03271: https://arxiv.org/abs/2304.03271
37. Mistral AI LCA of Mistral Large 2 (22 Jul 2025): https://mistral.ai/news/our-contribution-to-a-global-environmental-standard-for-ai

**Embodied carbon**

38. NVIDIA HGX H100 PCF Summary (Jul 2025): https://images.nvidia.com/aem-dam/Solutions/documents/HGX-H100-PCF-Summary.pdf
39. NVIDIA HGX B200 PCF Summary (Jul 2025): https://images.nvidia.com/aem-dam/Solutions/documents/HGX-B200-PCF-Summary.pdf
40. Schneider et al., "Life-Cycle Emissions of AI Hardware" (TPU LCA), arXiv 2502.01671: https://arxiv.org/abs/2502.01671
41. Falk et al., "More than Carbon" (A100 LCA), arXiv 2509.00093: https://arxiv.org/abs/2509.00093
42. Morand, Névéol, Ligozat, "The Rising Unsustainability of AI Graphics Cards Production", arXiv 2607.01258: https://arxiv.org/abs/2607.01258
