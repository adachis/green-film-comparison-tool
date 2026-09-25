# Stream B2: Consumer credit pricing follow-up (Seedance 2.5 and MiniMax H3)

Research date: 2026-09-25. Every page below was accessed on 2026-09-25 unless a different date is noted.
FX: 1 USD = 6.7126 CNY (the same ECB rate as `B_model_specs_pricing.md`).
Raw captures are in `research/B2/`: rendered text (`*.txt`), network logs (`*.net.jsonl`), extracted JSON, screenshots (`*.png`), and `evidence_js_snippets.txt`. The arithmetic is in `B2/calc_b2.py`.

**Confidence levels** follow file B. **H** means read directly from the vendor's own page, JSON, or help center in this session. **M** means derived from vendor data with one assumption, or read from the vendor's client code. **L** means secondary sources, or a back-calculation from marketing claims.

**How $/s is computed.** $/s = plan price ÷ credits in that price × credits per second of output.
- "Cheapest tier" is the lowest-priced individual plan that includes the model, at its **monthly** list price. It excludes first-month promotions.
- "Heavy-user tier" is the largest self-serve individual plan, billed **annually**. This gives the lowest $/credit. It uses the standing price, not first-year promotions (those are shown separately).
- Audio is included in every Seedance 2.5 and H3 figure. None of these platforms charges extra for it.

**Reference list prices from file B:**
- Seedance 2.5 on BytePlus: $0.103/s at 480p, $0.231/s at 720p, and $0.569/s at 1080p.
- MiniMax H3: $0.08/s at 768p and $0.13/s at 2K.

---

## 0. What changed versus file B §2.6 (corrections)

1. **Runway.** The live pricing page puts the "Unlimited" badge on **Topaz AI Upscale**, not on Seedance 2.5. The first pass read the flattened text as "Unlimited Seedance 2.5" (see the `runway_cards_crop.png` screenshot). Runway's help center now publishes in-app Seedance 2.5 costs of **20, 30, and 68 credits/s** (480p, 720p, 1080p). These equal the API rates, so B's assumption is now verified.
2. **Krea.** The "109 Seedance 2.5 videos" per 20,000 units describes the **cheapest configuration**: a 4 s, 480p clip at the video-reference rate. It is not a typical clip. Krea charges **1 compute unit (CU) per $0.00135 of provider list cost**. Seedance 2.5 therefore costs **76, 171, and 421 CU/s** at 480p, 720p, and 1080p.
3. **Higgsfield.**
   - Plus costs **$59/mo for 1,200 credits**, not $49 for 1,000.
   - Seedance 2.5 costs **7 credits/s at 720p**, not 6.5.
   - 1080p costs **12 credits/s**, discounted from 16.
   - MiniMax H3 is **2K only, at 2 credits/s**, discounted from 4.
4. **Dreamina.**
   - "Save 57%/76% credits on Seedance 2.5 at 720p" is an **event discount** that runs from Sep 23 to Oct 9. Per the help center, it applies only to 720p generations that use a **reference video**.
   - "Seedance 2.5 from $0.04/sec" depends on the **$1.50 (90% off) first month** of Basic.
   - Per-clip costs sit behind a login wall. They are only derivable, at about 37–42 credits/s at 720p.
5. **Artlist.** The help center publishes Seedance 2.5 at **300, 600, and 1,000 credits/s** (480p, 720p, 1080p). The model is **no longer in any Unlimited tier**.

---

## 1. Summary table: $ per second of generated video

"Units/s" is the platform's own credit or unit cost per output second. Where two figures are separated by a slash, the second is the heavy-tier cost.

### 1a. Seedance 2.5

| Platform | Res. | Units/s | Cheapest tier (monthly) $/s | Heavy-user tier (annual) $/s | Promo or other $/s | Conf. |
|---|---|---|---|---|---|---|
| **Luma** (Plus $30 for 10k / Ultra $3,000/yr for 150k/mo) | 480p | 36 | 0.108 | **0.060** | — | H |
| | 720p | 78 | 0.234 | **0.130** | — | H |
| | 1080p | 191 | 0.573 | **0.318** | — | H |
| **Krea** (Pro $35 for 20k CU / Max-4 $99/mo annual for 100k CU) | 480p | 76.1 CU | 0.133 | **0.075** | Pro annual: 0.080 | H/M |
| | 720p | 171.2 CU | 0.300 | **0.169** | Pro annual: 0.180 | H/M |
| | 1080p | 421.2 CU | 0.737 | **0.417** | Pro annual: 0.442 | H/M |
| **Higgsfield** (Plus $59 for 1,200 / Ultra-9k $3,240/yr) | 480p | 3 | 0.147 | **0.090** | — | H |
| | 720p | 7 | 0.344 | **0.210** | — | H |
| | 1080p | 12 (list 16) | 0.590 | **0.360** | At 16 cr/s: 0.787 / 0.480 | H |
| **Runway app** (Standard $15 for 625 / Max $912/yr for 9,500/mo) | 480p | 20 | 0.480 | **0.160** | Max monthly: 0.200 | H |
| | 720p | 30 | 0.720 | **0.240** | Max monthly: 0.300 | H |
| | 1080p | 68 (88 via draft) | 1.632 | **0.544** | Via draft: 2.112 / 0.704 | H |
| **Freepik / Magnific** (Premium $20 for 20k / Pro-4M $2,520/yr) | 480p draft | 200 | 0.200 | **0.126** | — | H |
| | 720p | 440 | 0.440 | **0.277** | Premium annual: 0.319 | H |
| | 1080p | 1,100 | 1.100 | **0.693** | Premium annual: 0.797 | H |
| **Artlist** (AI Starter $19.99 for 16.5k / AI Professional ≥500k annual at $0.00048 per credit) | 480p (draft) | 300 | 0.363 | **0.144** | AI Creator annual: 0.156 | H |
| | 720p | 600 | 0.727 | **0.288** | AI Creator annual: 0.312 | H |
| | 1080p | 1,000 render (1,300 with its required 480p draft) | 1.212 (1.575 with draft) | **0.480 (0.624 with draft)** | — | H |
| **Pollo.ai** (Lite $15 for 400 / Ultra $99/mo annual for 5,000) | 480p | 15 list (6 promo) | 0.562 | **0.297** | Promo ×0.4: 0.225 / 0.119 | H (list); M (promo scope) |
| | 720p | 30 list (12 promo) | 1.125 | **0.594** | Promo: 0.450 / 0.238 | H/M |
| | 1080p | 60 list (24 promo) | 2.250 | **1.188** | Promo: 0.900 / 0.475 | H/M |
| **Dreamina / CapCut** (Basic $15 for 1,575 / Ultra annual renewal $5,999/yr for 59k/mo) | 720p | ~37 (range 37–42; login wall) | 0.35–0.40 | **0.31–0.36** | First-year Ultra ($3,599): 0.19–0.21. Event, Ultra −76% with reference video: 0.045–0.085. Event, Standard/Advanced −57%: about 0.15–0.17. Basic 90%-off first month: 0.035–0.040 | L–M |
| **Jimeng 即梦** (CN) | 720p | About 27 (secondary) | Plans ¥69/mo or ¥659/yr; ¥/credit not public | — | Banner floor: "单秒首月低至￥0.28" (as low as ¥0.28/s in the first month) ≈ **$0.042/s** (annual member, stacked discounts) | L |
| **OpenArt** (Starter $14 for 4k / Wonder $175/mo annual for 106k) | 720p | About 130 (secondary, "measured") | ≈0.455 | **≈0.215** | — | L |

### 1b. MiniMax H3

| Platform | Res. | Units/s | Cheapest (monthly) $/s | Heavy (annual) $/s | Promo or other | Conf. |
|---|---|---|---|---|---|---|
| **Luma** | 768p | 28 | 0.084 | **0.047** | — | H |
| | 2K (1440p) | 46 | 0.138 | **0.077** | — | H |
| **Artlist** | 2K | 120 | 0.145 | **0.058** | This rate looks anomalously low (see §2.5) | H (as published) |
| **Higgsfield** (2K only) | 2K | 2 (original price 4) | 0.098 | **0.060** | At 4 cr/s: 0.197 / 0.120 | M (client JS) |
| **Krea** (2K only) | 2K | 96.3 CU | 0.169 | **0.095** | — | H/M |
| **Runway** | 768P / 2K | 10 / 15 (API rates; the app table omits H3) | 0.240 / 0.360 | **0.080 / 0.120** | — | M |
| **Pollo.ai** | 768P | 10 list (5 promo) | 0.375 | **0.198** | Promo: 0.188 / 0.099. Ultra plan includes a "10-DAY UNLIMITED" H3 offer. | H/M |
| | 2K | 16 list (8 promo) | 0.600 | **0.317** | Promo: 0.300 / 0.158 | H/M |
| **Freepik** | H3 Max Turbo 768p only | 40 | 0.040 | **0.025** | Standard H3 is not on the price list | H |
| **OpenArt** | — | Not public | — | — | "Up to 30% off all MiniMax H3 models until October 4" | L |
| **Dreamina, Jimeng** | — | Not offered (ByteDance apps) | — | — | — | — |

### 1c. Heavy-user tier, ranked (standing prices)

**Seedance 2.5 at 720p (list $0.231/s):**
1. Luma Ultra annual: **$0.130**
2. Krea Max-4 annual: $0.169
3. Higgsfield Ultra-9k annual: $0.210
4. OpenArt Wonder: about $0.215 (L)
5. Runway Max annual: $0.240
6. Freepik Pro-4M: $0.277
7. Artlist ≥500k annual: $0.288
8. Dreamina Ultra annual renewal: about $0.31–0.36
9. Pollo Ultra annual: $0.594 at list credits, or $0.238 at the promo rate now shown.

**Seedance 2.5 at 1080p (list $0.569/s):**
1. Luma: **$0.318**
2. Higgsfield: $0.360
3. Krea: $0.417
4. Artlist: $0.480 render only, or $0.624 with its required draft
5. Runway: $0.544, or $0.704 via draft
6. Freepik: $0.693
7. Pollo: $1.188 list, or $0.475 promo.

**How this range compares with list price:**
- The spread across consumer platforms is roughly **0.56× to 2.6× the API list price**. About half the heavy tiers (Higgsfield, OpenArt, Runway, Freepik, Artlist) sit within ±25% of list. Luma (0.56×) and Krea (0.73×) are below that band; Dreamina renewal (1.3–1.5×) and Pollo at list credits (2.6×) are above it.
- Promotions such as the Dreamina event, Jimeng first-month offers, and "unlimited" windows push the *marginal* price toward $0.04/s or $0.

---

## 2. Per-platform detail and raw evidence

### 2.1 Dreamina / CapCut (dreamina.capcut.com): partial (login wall on per-generation cost)

**Plans (primary, H).** Source: SSR product JSON in the pricing page (`research/dreamina_price.txt`, `dr_price.html`), re-rendered on 2026-09-25 as `B2/dr_price2.txt`. The US App Store in-app-purchase list agrees: "Basic Monthly Subscription $15.00 … Standard Monthly Subscription $36.00 … Advanced Monthly Subscription $79.00" (`B2/appstore_us_app_id6749606485.html`).

| Plan | Credits per month | Monthly list | First month now | Annual (first year / renewal) | Quarterly | One-month (non-renewing) |
|---|---|---|---|---|---|---|
| Basic | 1,575 | $15 | **$1.50** (90% off) | $101 / $167.99 | $45 | $18 |
| Standard | 3,885 | $36 | $22 | $246 / $409.99 | $105 | $42 |
| Advanced | 8,645 · 17,600 · 23,500 · 35,500 | $79 · $159 · $212 · $320 | $47 · $95 · $127 · $192 | $540/$900 · $1,095/$1,825 · $1,455/$2,425 · $2,196/$3,660 | $225 · $455 · $605 · $915 | $84 · $192 · $255 · $385 |
| Ultra | 59,000 | $520 | $312 | $3,599 / $5,999 | $900 first, then $1,500 | $640 |

$/credit at list:
- Monthly: $0.00952 (Basic), $0.00927 (Standard), $0.00914 to $0.00901 (Advanced), $0.00881 (Ultra).
- Annual renewal, Ultra: $0.00847.
- First-year promotion, Ultra: $0.00508.

**Claims on the pricing page and in the app (verbatim):**
- Plan badges: Basic card "Seedance 2.5 from $0.04/sec"; Ultra card "Seedance 2.5 from $0.05/sec".
- Standard and Advanced: "Save 57% credits on Seedance 2.5 at 720p." Ultra: "Save 76% credits on Seedance 2.5 at 720p."
- All plans: "Save 43% credits on Seedance 2.0 Fast at 720p."
- Tooltip: "1. Credit and plan discounts are available from Sep 23 to Oct 9. 2. The lower credit usage for the specified models and resolutions applies only during the event. 3. The 10-second video count per month is estimated based on Seedance 2.0 Fast at 720p."
- Offer banner: "Offer period: 2026.09.23–2026.10.09". App top banner, from `commerce/v1/resource_position`: "Up to 90% OFF plans + Seedance 2.5 at 720p from $0.04/sec & 2.0 Fast from $0.01/sec". The activity is `subscription_dreamina_90off_260916`, internally named "【正式】dreamina_重点地区价格竞争策略" ("[Official] Dreamina key-region price-competition strategy"). The countdown ends 2026-09-29 23:59:59 UTC+8.
- Help-desk FAQ #649 (`B2/dr_helpdesk_starling.json`): "Dreamina Seedance 2.5 currently offers a limited-time promotional discount. During the campaign, selecting the Dreamina Seedance 2.5 model with 720P quality and uploading a reference video may qualify you for a discounted credit rate. Note that the discount varies by membership level."
- FAQ #603: "Dreamina Seedance 2.5 is available to all Dreamina members. If you want to use it, subscribe…"
- FAQ #680: "The exact credits used depend on the generation page."

**Login wall (verified).**
- The generator (`/ai-tool/home?type=video`) loads its model config (`mweb/v1/video_generate/get_common_config`, saved as `B2/dr_video_common_config.json`). Every Seedance 2.5 price entry has `"amount": 0` placeholders, with benefit types `seedance_25_{480p,720p,1080p}_output`, `…_no_input_video_output`, and `…_long_video_…`.
- With a prompt typed and Seedance 2.5 at 720P selected, no credit estimate is shown while logged out (screenshots `dr_gen3.*.png`).
- The credit calculation is server-side. The front-end bundles contain no table.

**Model options (H):**
- Resolutions: `"480p","720p","1080p"`. There is no 4K, despite the landing page's "Create cinematic 4K videos with Seedance 2.5 unlimited".
- Frame slider: 96–720 frames at 24 fps, which is 4–30 s.
- A beta "long_video" mode runs from 30,000 to 180,000 ms and has its own benefit type.
- CMS popup (2026-09-21 to 10-21): "Seedance 2.5 Draft Mode … Preview first, then render in HD—cut generation costs significantly".

**Derived Seedance 2.5 credit rate (L–M).** Three independent constraints agree on about **37 credits/s at 720p** (range 37–42):
- (a) The Basic badge "from $0.04/sec" at $1.50 per 1,575 credits ($0.000952/credit) implies 36.8–47.3 cr/s, allowing for rounding to $0.035–0.045.
- (b) The Ultra badge "from $0.05/sec" at the $312 first month ($0.00529/credit) with −76% implies 35.5–43.3 cr/s.
- (c) CellCog (secondary; published 2026-08-22, updated 2026-09-08) says "Dreamina (ByteDance) … 8s 720p costs about ~296 credits", which is 37.0 cr/s.

**Byproduct (H-derived).** The "Generate N videos (10s each)" counts give Seedance **2.0 Fast 720p = exactly 80 credits per 10 s during the event**:
- 1,575/19, 3,885/48, 17,600/220, and 59,000/737 all bracket 80. That is 8 cr/s.
- It implies about 14 cr/s at list (80 ÷ 0.57).
- $0.0076/s at the $1.50 first month matches the banner's "2.0 Fast from $0.01/sec".

**Resulting $/s for Seedance 2.5 at 720p:**
- Monthly list: $0.33–0.40.
- Ultra annual renewal: $0.31–0.36. First year: $0.19–0.21.
- During the event (720p with reference video): Ultra costs about 9–10 cr/s, which is $0.075–0.089/s at list and $0.045–0.053/s on first-period prices. Standard and Advanced cost about 16–18 cr/s, which is $0.14–0.17/s.
- 480p and 1080p rates: **not retrievable**.

### 2.2 Jimeng 即梦 (jimeng.jianying.com): partial

- **Login wall.** The VIP page opens only through a phone-number or Douyin login modal (`B2/jm_vip.vip.png`). The generator shows no credit estimate while logged out. Every probed pricing path returns the SPA shell.
- **VIP prices (primary, via Apple, H).** The App Store listing for "即梦AI - 抖音旗下AI图片和视频工具", seller Shenzhen Lianmeng Technology (id6503676563), includes this auto-renew statement: "订阅服务【即梦会员订阅】 订阅价格：连续包月每月69元，连续包年每年659元" (Jimeng membership subscription; price: ¥69/month on monthly auto-renew, ¥659/year on annual auto-renew).
  - In-app purchase list: 基础会员连续包月 ¥69.00 (Basic member, monthly auto-renew); 基础会员首月优惠 ¥69.00 (Basic member first-month offer); 即梦会员 ¥79.00 (Jimeng membership); 即梦积分 ¥50 / ¥75 / ¥150 (Jimeng credits packs).
  - The statement names a single membership. It appears to be the Basic tier. Prices for 标准 (Standard), 高级 (Advanced), and 超级 (Super) are not public.
- **Help center (primary, H).** Source: helpdesk.bytedance.com, biz_id=73; answers from the `i.snssdk.com/api/v3/help/home/hot/` JSON, saved as `B2/jm_help_hot.json`.
  - "Seedance 2.5 模型如何收费？上线是否有折扣？" (How is Seedance 2.5 charged? Is there a launch discount?) → "若您在活动期内选择使用 Seedance 2.5 模型，画质选择 720P 且有上传参考视频，即可享受积分消耗优惠，不同等级会员积分消耗折扣不同。具体折扣请以页面实际展示为准。" (During the campaign, choosing Seedance 2.5 at 720P with an uploaded reference video earns a credit-consumption discount. The discount differs by membership level; the page shows the exact figure.)
  - "Seedance 2.5 模型的使用条件" (conditions for using Seedance 2.5) → "模型支持会员用户使用 … 正在逐步开放中" (available to members … being rolled out gradually).
  - "超级会员享有哪些权益？" (What does Super membership include?) → "超级会员的每月积分为54600" (Super members get 54,600 credits per month).
  - Tier order: "超级会员＞高级会员＞标准会员＞基础会员" (Super > Advanced > Standard > Basic).
- **Current promo (H).** App banner, activity `subscription_jimeng_sd_gift_202609`, countdown to 2026-09-28 23:59:59 Beijing time: "🌕 中秋礼遇 | 即买即送 · 年卡会员最高加赠25条Seedance 2.5 720P成片，叠加折扣单秒首月低至￥0.28" (Mid-Autumn gift, delivered on purchase: annual members get up to 25 free Seedance 2.5 720P clips; with stacked discounts, the per-second price in the first month is as low as ¥0.28). **¥0.28/s ≈ $0.042/s.**
- **Past promos (Jimeng CMS JSON `bee_publish_12992`, H):**
  - Seedance 2.5 launch dialog, 2026-07-31 15:30 to 08-19 15:30: "积分消耗 5.4 折" (credits consumed at 54% of normal).
  - Draft-mode dialog, 2026-09-09 to 10-06: "Seedance 2.5 样片模式 … 先看样片，再定高清版本，大幅降低抽卡成本" (Seedance 2.5 draft mode: preview a sample, then choose the HD version, which greatly cuts re-roll cost).
  - Seedance 2.0 Mini launch (June): "首发价，720P单秒仅 0.16元起 … 会员限时3.8折 + Mini积分消耗6.7折" (launch price from ¥0.16/s at 720P; members get a time-limited 62% off, plus Mini credit use at 67%).
- **Credits per clip (secondary, L).** CellCog gives "Jimeng (China) … ~¥41-79/mo plans … ~215 credits" per 8 s at 720p, which is about 27 cr/s. It is not verifiable without login. ¥/credit is unknown because credits per plan are not public (except Super's 54,600/month).

### 2.3 Higgsfield (higgsfield.ai/pricing): resolved via public JSON

- **Per-second credits (primary JSON, H).** Source: `GET https://fnf-api-gw.higgsfield.ai/fnf/job-sets/costs` (no login; saved as `B2/higgs_jobset_costs.json`):
  ```
  "job_set_type":"seedance_2_5","cost":[
   {"resolution":"480p","video":{"with_video":{"cost_per_second":3,"original_cost_per_second":3},"without_video":{"cost_per_second":3,...}}},
   {"resolution":"720p", ... "cost_per_second":7,"original_cost_per_second":7 ...},
   {"resolution":"1080p", ... "cost_per_second":12,"original_cost_per_second":16 ...}]
  ```
  - Seedance 2.0, for comparison: 3 / 4.5 / 9 / 22 cr/s at 480p, 720p, 1080p, and 4K. The originals are 6 / 6 / 12 / 26.
  - Seedance 2.0 Mini: 0.5 / 1 cr/s.
- **Plans (primary JSON, H).** Source: `fnf/subscriptions/v2/plans?plan_set_key=ps_a3` (`B2/higgs_plans.json`).

  | Plan | Credits per month | Monthly | Annual |
  |---|---|---|---|
  | Starter | 270 | $19 | $228/yr |
  | Plus | 1,200 | $59 | $564/yr ($47/mo) |
  | Ultra | 3,000 | $129 | $1,188/yr ($99/mo) |
  | Ultra | 6,000 | $250 ($220 first month) | $2,322/yr |
  | Ultra | 9,000 | $375 ($310 first month) | $3,240/yr ($270/mo) |

  Starter shows "Access to Seedance 2.0 Fast & 2.0 Mini" and "Access to selected models only". Seedance 2.5 therefore starts at **Plus**.
- **MiniMax H3 (client code, M).** H3 is absent from the public cost JSON. The bundled cost resolver is `minimax_h3:Kn` with `Kn={store:oe,resolve:e=>g(e.duration)}`. Here `g` is imported from module `EJ0VaEGexRuzx4e9.js`, where `function A(e){return Math.ceil(e*j)}` with `j=2`, and the strikethrough "original" is `Ee(e)=Math.ceil(e*M)` with `M=4` (see `B2/evidence_js_snippets.txt`). H3 therefore costs **ceil(2 × seconds) credits**, shown against an original of 4 × seconds. The i18n strings say "MiniMax H3 currently supports only 2K resolution".
- **Marketing claim to treat with care:** the i18n includes "Seedance 2.5 on Higgsfield — 30 seconds of cinema, native 4K, sound included". The cost table and model offer only 480p, 720p, and 1080p.

### 2.4 Krea (krea.ai/pricing and docs): resolved via Krea's own client code

- **Plans (SSR data in `B2/krea.html`, H):**
  - Pro: 20,000 CU for $35/mo, or $21/mo billed yearly.
  - Max: 40k CU ($70 / $42), 60k ($105 / $63), 80k ($135 / $81), 100k ($165 / $99).
  - Basic: 5,000 CU. Model pages show "$9" per month; the compare table shows $5.25/mo billed yearly.
  - Business: 20k CU for $50 ($40 yearly), up to 1.5M CU for $2,850 ($2,280 yearly).
  - One-time compute packs of 2k to 50k CU require sign-in; their prices are not public.
  - Access: `"bytedance/seedance-2-5":{...T,creator_max:2}` with `T={…creator_basic:0,creator_pro:2,…}`. **Basic has no Seedance 2.5 access; Pro and Max do.**
- **USD → CU conversion (client code, H for the formula):**
  - `MS_PER_COMPUTE_UNIT=1800`, default `exchangeRate` `c=75e-5`.
  - `function Ko(e,t=ve){return e/t/(Re.MS_PER_COMPUTE_UNIT*.001)}`, so CU = USD ÷ 0.00075 ÷ 1.8 = **USD ÷ $0.00135**.
  - The cost table is `"bytedance/seedance-2-5": rates {"480p:false":.10269,"480p:true":.0614208,"720p:false":.23112,"720p:true":.13824,"1080p:false":.56862,"1080p:true":.3402}, perSecond`. This is **exactly the BytePlus list price**.
- **Pricing-page counts decoded (H).** The comparison table uses `...ps(e.minCostCU,…)` with `minCostCU = Math.min(...costCU)` and `count = Math.floor(planCU / minCostCU)`. That minimum is the cheapest option: 4 s at 480p with a video reference.

  | Model | minCostCU (cheapest config) | Clip spec | Pro 20k CU | Max 40k CU |
  |---|---|---|---|---|
  | Seedance 2.5 | 4 × $0.0614208 ÷ 0.00135 = **182.0 CU** | 4 s, 480p, video-reference rate | 109 videos ✓ | 219 ✓ |
  | Seedance 2.0 | 4 × $0.0809 ÷ 0.00135 = **239.7 CU** | 4 s, 480p, video reference | 83 ✓ | 166 ✓ |
  | MiniMax H3 | $0.65 ÷ 0.00135 = **481.5 CU** | 5 s, 2K ("Hailuo 3 at 2K: $0.13 per billable second") | 41 ✓ | 83 ✓ |

  The same arithmetic reproduces the Veo 3.1 counts (33/67; 4 s at 720p, silent, $0.80) and Kling 3.0 (107/214; 3 s standard, silent, $0.252).
- **Typical clips, text or image input:**
  - Seedance 2.5 at 720p: 171.2 CU/s, so a 5 s clip is 856 CU. At 1080p: 421.2 CU/s, so 10 s is 4,212 CU.
  - Seedance 2.0 (Krea prices it at about 2× BytePlus): 224.7 CU/s at 720p and 505.7 CU/s at 1080p.
  - H3 at 2K: 96.3 CU/s.
- **Krea API** (a separate USD balance) charges the same USD figures. From docs `api-reference/video/seedance-25*.md`: "720p | No | $0.2311/sec … 1080p | No | $0.5686/sec".
- **Caveat (M):** the numbers come from the client's cost estimator, not from a logged-in charge. The docs state "Failed and cancelled jobs are not billed", and the FAQ says "Generations will also be less costly on higher tier plans". The pricing-page counts, however, use a single CU cost for all plans.

### 2.5 Artlist (artlist.io and help.artlist.io): resolved

- **Credits per second (primary).** Source: the help-center article "AI Toolkit: Understanding credits for AI Image and Video", updated 2026-09-23 (Zendesk API, saved as `B2/artlist_help_38815633707421.json`). Raw rows: "Seedance 2.5 | 480 | 300", "Seedance 2.5 | 720 | 600", "Seedance 2.5 | 1080 | 1000", "MiniMax H3 | 2K | 120". Seedance 2.0 is 200/300/600/1,200 (480p, 720p, 1080p, 4K). The Studio article gives the same Seedance 2.5 rates.
- **Draft Mode.** From the "Seedance 2.5" article, updated 2026-09-22:
  - "480p draft preview; 720p direct generation; 1080p final render via Draft Mode".
  - "Both the 480p draft and the 1080p render are billed at standard rates for each step".
  - "1080p output is only available by rendering an existing 480p draft".
  - The effective 1080p cost is therefore **1,300 credits/s** (300 + 1,000) per final.
- **Plans (primary JSON).** Source: `artlist.io/api/pricing/plans?currencyCode=USD&countryCode=US` (`B2/artlist_pricing_plans.json`).
  - AI Starter: 16.5k credits, $19.99/mo or $143.88/yr.
  - AI Core: 40k, $39.99 or $287.88/yr.
  - AI Creator: 80k, $69.99 or **$499.99/yr**.
  - AI Suite or AI Professional: 120k at $99.99/mo ($719.88/yr); 180k at $149.99 ($1,079.88/yr); 240k at $199.99 ($1,439.88/yr); 500k to 10M at $0.0008/credit monthly or **$0.00048/credit annual**.
  - Max Pro and Max Business bundles, which include the stock catalog, cost more per credit.
- **Unlimited status now (H):**
  - The "AI Toolkit: Understanding Unlimited Models" article (updated 2026-09-23) lists unlimited video models by tier: Seedance 2.0 Mini at 480p/5 s, Wan 3.0 at 480p/5 s, Veo 3.1 Lite at 720p/4 s, and others. **Seedance 2.5 appears in no tier.**
  - "For monthly subscription plans, and yearly plans below 40,000 credits, all model generations require credits."
  - The pricing page shows "Unlimited applies only to supported models and is subject to plan features, model availability, technical capacity, and reasonable use limitations" and "Unlimited generations apply to Artlist — MCP usage is credit-based."
  - A leftover FAQ line reads: "Is Seedance 2.5's Video Reference (Reference-to-Video) feature covered by Unlimited? No — Unlimited covers Text-to-Video and Image-to-Video generations only."
- **The "unlimited" controversy (secondary, CineD opinion piece, 2026-08-14).** Source: "Artlist Sold a Year of Unlimited Seedance 2.5 for $500 and Delivered a Week" (text saved as `B2/cined_artlist.txt`). Quotes:
  - "an annual AI Creator subscription bought them twelve months of unlimited generations on ByteDance's Seedance 2.5 … Within days the model was gone from Unlimited on every plan".
  - "Artlist's own promotional terms advertised a daily allowance of about 2,550 seconds, meaning around 85 half-minute clips per day".
  - "Affected subscribers were bumped from 80,000 credits a month to 180,000 for the remainder of their term".
  - "users report paying $499.99 for the promotional year".
  - "Customers calculate a 30-second generation at roughly 15,000 credits" (500 cr/s; customer arithmetic). The current published rate at 720p is 600 cr/s, or 18,000 per 30 s.
  - "The refund … was made opt-in and restricted to people who bought inside the August 7 to 10 window."
  - Artlist statement: a huge commitment "that we couldn't keep".
  - Other platforms mentioned: "Higgsfield advertised up to 33 days of unlimited Seedance 2.5, tiered by clip length. Runway offered seven days at launch for new Max subscribers. Renoise ran a one-week window. Topview sells 60 days, Creaa sells 7, 15 and 30-day blocks, OpenArt caps its unlimited tier at five seconds and 480p."
  - The Artlist Terms define Unlimited as no credit deduction during an access period, with no guarantee of "continued availability of any AI service, Model, feature."
- **Flag.** H3 at 120 cr/s at 2K works out to $0.058/s on the top annual tier. That is *below* MiniMax's own $0.13/s list and one-fifth of Artlist's Seedance 2.5 720p rate. It could be a promotional rate or an error. Treat it as "as published" (M).

### 2.6 Pollo.ai: resolved via Pollo's Next.js data JSON

- **Credit table (primary JSON, H).** Source: `pollo.ai/_next/data/…/en/m/seedance-2-5.json` (curl hits a Cloudflare challenge, so it was captured through the browser; saved as `B2/pollo_sd25_captured.json`). The model `seedance-2-5` (Text, Image, and Ref variants) has `"creditFormula":"perOutputSecond"` and `minCreditConsumption` 60:
  - `{"resolution":"480p","aspectRatio":"16:9",…,"credit":15,"apiPlatformPrice":0.10185}`
  - `{"resolution":"720p",…,"credit":30,"apiPlatformPrice":0.21915}`
  - `{"resolution":"1080p",…,"credit":60,"apiPlatformPrice":0.54675}`
  - With video references (`perTotalSecond`, input plus output seconds): 8.43 / 18.12 / 36.24 credits.
- **MiniMax H3** (`minimax-hailuo-03`): 480P 5, 768P 10, 2K 16 credits/s. The API prices are $0.0372, $0.0744, and $0.1188 per second. H3 Max costs 2, 3, and 10 credits/s at 480P, 768P, and 1080P.
- **Current promotions (trpc JSON `B2/pollo_trpc.json`, M on scope):**
  - `seedance-2-5`: `displayConfig {"resolution":"480p","duration":"5","credits":30}`, `"activityMode":"discount","discount":40`. 30 credits = 40% of the list 75 (15 × 5 s). The pricing page shows "Seedance 2.5 480P 30 credits/5s".
  - `minimax-hailuo-03`: `{"resolution":"2K","duration":"5","credits":40}`, `"discount":50` (50% of 80).
  - The JSON does not state whether these discounts apply to every resolution, or for how long.
- **Plans (rendered pricing page plus screenshots `pollo2_cards.png` and `pollo3_cards.png`, H):**
  - Monthly: Lite $15 (400 credits), Pro $29 (800; slider 800, 2K, or 3K), Ultra $129 (5,000; slider 5K, 8K, or 12K).
  - Annual ("50% OFF" toggle): Lite **$12/mo** (was $15), Pro **$14.50/mo** ("FLASH SALE 50% OFF", was $29), Ultra **$99/mo** (was $129).
  - The trpc product list also contains older SKUs: Lite $15 for 300, Pro $59 for 2,000, Ultra $139 for 5,000. The page-displayed prices were used.
- **Unlimited.** The Ultra card lists "MiniMax H3 10-DAY UNLIMITED" and "MiniMax H3 Max 10-DAY UNLIMITED", among others. The JSON for that tier reads `{"activityMode":"unlimited","freeTimes":100,"condition":[resolution 768P, length 4–5],"duration":10,"subProduct":{"productName":"Ultra","price":13900,"usageCount":5000}}`. The page also shows "Unlimited usage may be subject to dynamic speed adjustments during high-traffic periods". **Seedance 2.5 is not unlimited.**

### 2.7 OpenArt: partial (login wall)

- **Plans (H):**
  - Starter: 4,000 credits/mo, $14 monthly or $13/mo billed annually.
  - Plus: 12,000, $34 or $27.
  - Pro: 24,000, $56 or $44.
  - Wonder: 106,000, $240 or $175 (all per seat).
  - The page shows "Upgrade to any higher plan for up to 30% off all MiniMax H3 models until October 4, 11:59 PM PT"; every card marks H3, H3 Max, and H3 Max Turbo with "DISCOUNT".
  - Wonder lists "Unlimited Creation" and "FLUX 3 — UNLIMITED" (`openart2_crop.png`).
- **Per-model cost.** The help page says: "Costs depend on the model or tool being used. The interface indicates the number of credits required for each generation action". The model page (`/models/seedance-2-5`) and the new workspace show no credits while logged out. **Login wall.**
- **Secondary (L).** CellCog gives "~1,040 credits (measured)" per 8 s at 720p, which is 130 cr/s, on Starter.
- **Unlimited FAQ (H):** "Unlimited generation is available for Pro and Wonder plan users, and applies only to select models — the specific models and promotion periods are listed on the pricing page… we may temporarily place high-activity accounts in a slower queue". CineD (secondary) says the Seedance 2.5 unlimited tier was capped at 5 s and 480p in August.

### 2.8 Freepik / Magnific (freepik.com/pricing): the 1080p figures are verified

The pricing page, now branded "Magnific (formerly Freepik)", was re-rendered with both the Monthly/Annual toggle and the 4M option selected (`freepik_compare.png`).

- **Per-model credits (H):**
  - "Seedance 2.5 720p 1,760 credits/4s" (440/s).
  - "**Seedance 2.5 1080p 4,400 credits/4s**" (1,100/s).
  - "Seedance 2.5 Draft 480p NEW 800 credits/4s" (200/s).
  - "MiniMax H3 Max Turbo 768p NEW 200 credits/5s" (40/s).
  - The counts check out: 240,000 ÷ 4,400 = 54, 600,000 ÷ 4,400 = 136, and 4,000,000 ÷ 4,400 = 909 videos. These match the page, where a "video" is a 4 s clip.
- **Plans (H):**
  - Annual: Premium $14.50/mo (240K credits/yr); Premium+ $33.75/mo (600K/yr); Pro $82.50/mo (1.5M/yr) or **$210/mo (4M/yr)**.
  - Monthly: Premium $20 (20K/mo); Premium+ $45 (45K/mo); Pro $280 (300K/mo). A $110 plan for 112.5K/mo is implied by the strikethrough (M).
- **Conclusion.** B's 1080p figures ($0.73–0.80/s on annual plans, $1.10/s on Premium monthly) stand. The new heavy tier (Pro 4M) reaches **$0.693/s**.
- **Open question.** Whether 1080p on Freepik must go through the 480p draft step (which would add 200 credits/s) is not stated.
- **Unlimited** applies only to listed models: "Kling 2.5 720p Unlimited" and "MiniMax Hailuo 2.3 Fast 768p Unlimited" on Premium+ and Pro, plus Nano Banana images. **Seedance 2.5 and H3 are credit-based.**

### 2.9 Runway app (in-app, not the API): resolved

- **Primary (H).** Source: help-center article "Creating with Seedance 2.5", updated 2026-09-24 (`B2/runway_help_53542207042323.json`). The "Credit cost" row reads: "1080p: 68 credits per sec (optional: +34 credits per input video sec) / 720p: 30 credits per sec (optional: +15 …) / 480p: 20 credits per sec (optional: +10 …) / Draft: 20 credits per sec … / Enhance Draft: 68 credits per sec". The same article lists output of 480p, 720p, and 1080p at 4–30 s.
- **Cross-check that app credits equal API credits (H).** The in-app comparison table (`B2/runway.txt`) shows:
  - "Seedance 2.0 Pro 1080p 160 credits/4s" (40/s; API `seedance2 (1080p)` is 40/s).
  - "Seedance 2.0 Fast 116 credits/4s" (29/s = API).
  - "Seedance 2.0 Mini 64 credits/4s" (16/s = API).
  - "Gen-4.5 60 credits/5s" (12/s = API).
  - The app table does **not** list Seedance 2.5 or H3.
- **Plans (H):** Standard $15/mo ($12 annual), 625 credits; Pro $35 ($28), 2,250; Max $95 ($76), 9,500, with a one-month rollover. Extra credits have a 1,000-credit minimum; their price is not stated in the help article.
- **H3 in the app.** Not shown in the app table. API rates are hailuo3 10 cr/s at 768P and 15 at 2K, and h3_max 5 and 8. This file assumes the app matches the API, as it does for the four models checked (M).
- **Unlimited Mode (H).** From "Generating in Unlimited Mode", updated 2026-09-15: "Unlimited Mode lets you generate without using credits on supported models and tools. Generations in Unlimited Mode may take longer to start and run fewer at a time… This mode is currently available on Pro and Max plans… Model access in Unlimited mode may vary based on promotional periods and plan type."
  - The legacy Unlimited plan ("Explore Mode … infinite generations at a relaxed rate") is extended through 2026-11-30.
  - The live pricing card badges only **Topaz AI Upscale** as "Unlimited".
  - Whether Seedance 2.5 is in Unlimited Mode today cannot be verified while logged out. CineD reported a 7-day Seedance 2.5 unlimited window at launch for new Max subscribers.

### 2.10 Luma (lumalabs.ai/pricing): re-verified

The client render crashes, but the SSR JSON-LD is intact (`B2/luma_curl.html`):
- Plans: Plus $30/mo or $25/mo yearly (10,000 credits); Pro $90 or $75 (40,000); Ultra $300 or $250 (150,000).
- Seedance 2.5, Text-to-Video and Image-to-Video: "480p — Yes: 36 credits/sec", "720p: 78 credits/sec", "1080p: 191 credits/sec". Video-to-Video and Modify: 22, 47, and 115 credits/s.
- "Minimax H3 … 768p — Yes: 28 credits/sec", "1440p (2K): 46 credits/sec".
- There is no unlimited or relaxed mode for these models on the page.
- These figures are unchanged from file B. Luma Ultra annual remains the cheapest standing channel: $0.060, $0.130, and $0.318 per second for Seedance 2.5 at 480p, 720p, and 1080p, and $0.047 and $0.077 for H3 at 768p and 2K.

---

## 3. Unlimited and relaxed modes (status on 2026-09-25)

| Platform | Current offer | Scope and throttles | Past or recent offers for Seedance 2.5 or H3 | Source |
|---|---|---|---|---|
| **Runway** | Unlimited Mode on Pro and Max; legacy Unlimited plan (Explore Mode) until 2026-11-30 | "may take longer to start and run fewer at a time"; model list "may vary based on promotional periods". The pricing page now badges only Topaz Upscale. | Seedance 2.5 unlimited for 7 days at launch, for new Max subscribers (CineD) | Help center (H); CineD (S) |
| **Higgsfield** | Plan cards: "7-day unlimited" Kling 3.0 and Nano Banana 2/Pro; "Unlimited usage may be subject to dynamic speed adjustments during high-traffic periods"; unlimited is web-only, not MCP/CLI | Time-boxed per model | i18n templates for "Get 7-day Unlimited Seedance 2.5", "Get 33-day Unlimited Seedance 2.5", "N-day unlimited Seedance 2.5 & 2.0 (1080p)", and a presale "Seedance 2.5 is Unlimited for N days from launch". CineD: up to 33 days, tiered by clip length. | JSON/i18n (H); CineD (S) |
| **Krea** | "Unlimited relaxed generations" for **in-house image models only** | — | Client promo code: `seedance-25-unlimited-10d/14d` (redeem 2026-08-07 to 08-21) and `seedance-25-studio-10d/14d/30d/60d` (redeem 08-19 to 08-25), both `billFactor:()=>0`, yearly Pro/Max only. Banner: "Unlimited Seedance 2.5 for N days… Free for N days with Max or Pro annual." Also `h3max-unlimited-7d` (from 08-26, 7 days). `seedance-free-month` bills Seedance 2 and 2.5 at 0 except 1080p for 30 days (offer-gated). | Client JS (H) |
| **Artlist** | Unlimited only on listed cheap models (for example Seedance 2.0 Mini 480p/5 s). **Not Seedance 2.5.** | "reasonable use limits, daily usage thresholds"; no guarantee of "continued availability" | Aug 7–10: one year of unlimited Seedance 2.5 for about $499.99, with about 2,550 s/day; withdrawn within about a week; users compensated with 180k credits/month | Help center (H); CineD (S) |
| **Pollo** | Ultra: "MiniMax H3 10-DAY UNLIMITED" (768P, 4–5 s clips; JSON `freeTimes:100`), plus H3 Max and others | "dynamic speed adjustments during high-traffic periods" | — | JSON and page (H) |
| **OpenArt** | Pro and Wonder, select models: currently FLUX 3 (Wonder) | Heavy users go to "a slower queue"; may be paused | Seedance 2.5 unlimited was capped at 5 s and 480p (CineD) | FAQ (H); CineD (S) |
| **Freepik** | Premium+ and Pro: unlimited on listed models (Kling 2.5 720p, Hailuo 2.3 Fast 768p, Nano Banana) | Web app only ("API calls always run on the credit model") | — | Page (H) |
| **Dreamina** | None for video. Landing copy says "Seedance 2.5 unlimited", but plans carry only credits (plus free Seedream image access for earlier subscribers). | — | Event credit discounts: −57% and −76% (Sep 23–Oct 9) | Page/JSON (H) |
| **Jimeng** | None. Annual members get up to 25 free Seedance 2.5 720P clips (until 09-28). | — | Launch credit use at 54% (Jul 31–Aug 19) | CMS/banner (H) |
| **Luma** | None found | — | — | Page (H) |

**Messaging implication for the tool:**
- Unlimited or relaxed modes make the user's **marginal price $0**, but they do not change the GPU-seconds, energy, or water per generated second.
- They are usually time-boxed (7–60 days), capped by resolution and length (for example 480p/5 s), throttled through slower queues, lower concurrency, or daily caps (such as Artlist's about 2,550 s/day), and revocable.
- They also encourage more takes, which raises energy per *kept* second.
- The tool should therefore compute footprint from **generated seconds × model × resolution** (and the takes ratio), never from the user's spend. It should show a note along these lines: "your plan may make this free to you; the data-centre energy is the same."
- The Artlist episode shows that heavy use of a flat-price offer was uneconomic at list inference prices. CineD estimated about $1,190/day of inference against a $500/yr plan.

---

## 4. Remaining gaps

1. **Dreamina per-generation credits** for Seedance 2.5 at 480p, 720p, and 1080p, and in long-video mode, sit behind a login wall. The 720p figure (about 37 credits/s) is derived. 480p and 1080p are unknown. No public rules page exists; the FAQ points to "Credit balance → Rules" inside the account.
2. **Jimeng:** credits per clip, and the credits and prices of the 标准 (Standard), 高级 (Advanced), and 超级 (Super) tiers, need a Chinese phone login. Only the ¥69/mo and ¥659/yr membership, Super's 54,600 credits/month, and the ¥0.28/s first-month floor are verified.
3. **OpenArt:** Seedance 2.5 and H3 credit costs need login. Only the secondary figure of about 130 credits/s is available.
4. **Pollo:** how long the current discount lasts and whether it covers all resolutions (list vs "pay 40%") is not stated. Two SKU sets appear, trpc vs page, and page prices were used.
5. **Runway:** H3 in-app credits are not listed (API rate assumed). Which models are in Unlimited Mode today cannot be seen while logged out. The top-up credit price is not published in the help article.
6. **Higgsfield:** H3 cost is taken from client code, not from a charged generation. H3 Max cost was not extracted. Current Seedance 2.5 "unlimited" availability depends on personalized offers.
7. **Krea:** compute-pack prices need sign-in. The per-plan discount mentioned in the FAQ ("less costly on higher tier plans") is not visible in the client estimator.
8. **Artlist:** the H3 rate (120 credits/s at 2K) looks inconsistent with its other rates. It may be a promotion or a typo.
9. **Freepik:** whether 1080p needs the 480p draft first; whether standard H3 is available (only H3 Max Turbo is listed).
10. **Doubao** (Pro version with Seedance 2.5) consumer pricing was not investigated.

---

## 5. Sources (accessed 2026-09-25 unless noted)

P means primary (vendor) and S means secondary. Local captures are in `research/B2/`.

**Dreamina**
- [D1] P. Dreamina pricing (SSR plan JSON). https://dreamina.capcut.com/pricing/dreamina-price (`dr_price2.txt`, `../dr_price.html`)
- [D2] P. Dreamina generator config `mweb/v1/video_generate/get_common_config`. https://dreamina-api-us-ttp2.us.capcut.com/mweb/v1/video_generate/get_common_config (`dr_video_common_config.json`)
- [D3] P. Dreamina top banner `commerce/v1/resource_position` (in `dr_gen.net.jsonl`)
- [D4] P. Dreamina help-desk FAQ strings. https://starling16-normal-us-ttp.capcutapi.us/check_and_get_text/9cd6dd509af811f19f8619aa245aa697/normal/biz8 (`dr_helpdesk_starling.json`)
- [D5] P. Dreamina Seedance 2.5 page. https://dreamina.capcut.com/seedance/seedance-2-5 (`dr_sd25.txt`)
- [D6] P. Apple App Store, Dreamina AI (US). https://apps.apple.com/us/app/id6749606485

**Jimeng**
- [J1] P. Jimeng web app and banner. https://jimeng.jianying.com/ai-tool/home (`jm_home.txt`, `jm_home.net.jsonl`)
- [J2] P. Jimeng help center. https://helpdesk.bytedance.com/sites/standalone/helpcenter_web/home?biz_id=73 (`jm_help_hot.json`)
- [J3] P. Apple App Store, 即梦AI (CN). https://apps.apple.com/cn/app/id6503676563

**Higgsfield**
- [H1] P. Higgsfield pricing. https://higgsfield.ai/pricing
- [H2] P. Job-set costs JSON. https://fnf-api-gw.higgsfield.ai/fnf/job-sets/costs
- [H3] P. Plans JSON. https://fnf-api-gw.higgsfield.ai/fnf/subscriptions/v2/plans?plan_set_key=ps_a3&with_localization=true
- [H4] P. Compare JSON. https://fnf-api-gw.higgsfield.ai/fnf/subscriptions/v2/compare?plan_set_key=ps_a3&billing_period=annual&with_localization=true
- [H5] P. i18n strings. https://higgsfield.ai/_i18n/en.280e4fddf2.json
- [H6] P. Client JS. https://assets.higgsfield.ai/tanstack/assets/cd8179dd-Q5jLA536_ugrtLp1.js and https://assets.higgsfield.ai/tanstack/assets/cd8179dd-EJ0VaEGexRuzx4e9.js (`evidence_js_snippets.txt`)
- [H7] P. Seedance 2.5 page. https://higgsfield.ai/seedance-2.5

**Krea**
- [K1] P. Krea pricing (SSR data). https://www.krea.ai/pricing (`krea.html`, `krea.txt`)
- [K2] P. Krea client JS. https://www.krea.ai/_app/a2e0ef59c6167fde/immutable/chunks/xemubgHt.js, /chunks/BO9k5Hkq.js, /chunks/B6gr0gn1.js, /chunks/C5poArrq.js, /chunks/1IFQ6g83.js, /chunks/vu1SP-F6.js, and /nodes/120.Bd6Wy1n7.js (`evidence_js_snippets.txt`)
- [K3] P. Krea API docs, Seedance 2.5, 2.0, and 2.0 Mini, and MiniMax H3. https://www.krea.ai/docs/api-reference/video/seedance-25%2A.md , …/seedance-20%2A.md , …/seedance-20-mini.md , …/minimax-h3.md
- [K4] P. Krea docs on compute units and billing. https://www.krea.ai/docs/user-guide/help-and-support/compute-units.md and https://www.krea.ai/docs/developers/api-keys-and-billing.md

**Artlist**
- [A1] P. Artlist pricing. https://artlist.io/pricing
- [A2] P. Pricing API. https://artlist.io/api/pricing/plans?currencyCode=USD&countryCode=US
- [A3] P. Help center, "AI Toolkit: Understanding credits for AI Image and Video" (updated 2026-09-23). https://help.artlist.io/hc/en-us/articles/38815633707421
- [A4] P. "Seedance 2.5" (updated 2026-09-22). https://help.artlist.io/hc/en-us/articles/38194082501021
- [A5] P. "AI Toolkit: Understanding Unlimited Models" (updated 2026-09-23). https://help.artlist.io/hc/en-us/articles/38932625351709
- [A6] P. "AI Toolkit: Image and Video FAQs". https://help.artlist.io/hc/en-us/articles/33210293103005
- [A7] P. "MiniMax H3 (Hailuo 3)". https://help.artlist.io/hc/en-us/articles/38170376973853
- [A8] P. "Studio: Understanding AI Credits". https://help.artlist.io/hc/en-us/articles/37462605912861
- [A9] S. CineD, "Artlist Sold a Year of Unlimited Seedance 2.5 for $500 and Delivered a Week" (opinion piece, 2026-08-14). https://www.cined.com/artlist-sold-a-year-of-unlimited-seedance-2-5-for-500-and-delivered-a-week/ . Follow-up podcast (2026-08-20): https://www.cined.com/youtube-view-count-change-artlist-seedance-us-drone-tariffs-focus-check-ep130/

**Pollo.ai**
- [P1] P. Pollo pricing. https://pollo.ai/pricing (screenshots `pollo2_cards.png`, `pollo3_cards.png`)
- [P2] P. Pollo Next.js data JSON. https://pollo.ai/_next/data/70104d5-v9jt/en/m/seedance-2-5.json (`pollo_sd25_captured.json`)
- [P3] P. Pollo trpc product and promo data. https://pollo.ai/api/trpc/user.getReqInfo,product.getDiscountInfo,… (`pollo_trpc.json`)

**OpenArt**
- [O1] P. OpenArt pricing. https://openart.ai/pricing
- [O2] P. Help page. https://openart.ai/help
- [O3] P. Seedance 2.5 model page. https://openart.ai/models/seedance-2-5

**Freepik / Magnific**
- [F1] P. Pricing. https://www.freepik.com/pricing (`freepik.annual.txt`, `freepik_m2.monthly.txt`, `freepik_compare.png`)

**Runway**
- [R1] P. Runway pricing. https://runwayml.com/pricing (`runway.txt`, `runway_cards_crop.png`)
- [R2] P. Help center, "Creating with Seedance 2.5" (updated 2026-09-24). https://help.runwayml.com/hc/en-us/articles/53542207042323
- [R3] P. "Generating in Unlimited Mode". https://help.runwayml.com/hc/en-us/articles/54428296933011
- [R4] P. "Pro plan details". https://help.runwayml.com/hc/en-us/articles/52070807060755
- [R5] P. "How do credits work?". https://help.runwayml.com/hc/en-us/articles/15124877443219
- [R6] P. "Why does the Unlimited plan have credits?". https://help.runwayml.com/hc/en-us/articles/37309724921747
- [R7] P. Runway API pricing (from file B). https://docs.dev.runwayml.com/guides/pricing/

**Luma**
- [L1] P. Luma pricing (JSON-LD). https://lumalabs.ai/pricing (`luma_curl.html`)

**Secondary**
- [S31] S. CellCog, "Seedance 2.5 Pricing: Every API and Platform Compared" (published 2026-08-22, modified 2026-09-08). https://cellcog.ai/blog/seedance-2-5-pricing/
