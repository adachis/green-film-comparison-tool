# H. Access and volume: how much AI video is generated, how much is watched, and when the total footprint matters

Research date: 2026-09-25. Research only; nothing here is fabricated. Every figure has a source in §8.

**Codes.** P = primary (the company's own statement, filing or blog, or the report's own author). S = secondary (press or aggregator). D = derived (my arithmetic; inputs and assumptions stated). **Confidence:** H, M or L. **MKT** = marketing claim (launch post, fundraising release or social post; not audited).

Raw captures are in `research/H/`: DuckDuckGo result dumps `ddg1–7.txt`, fetched HTML, the IEA *Key Questions* PDF and its text, the Netflix 2025 ESG report PDF and text, the MiniMax H1-2026 PDF, and the Xie et al. PDF.

---

## 1. Summary

1. **Disclosed AI-video volume was already tens of millions of clips per day by early 2026, and one consumer product accounts for most of it.**
   - **xAI Grok Imagine:** "1.245 billion videos in the last 30 days" (xAI launch post, 2 Feb 2026; P, MKT). That is about 41.5 M per day (D).
   - **Kling:** 600 M+ videos cumulative by the end of 2025 (company, via press; S). That is about 2.1 M per day in H2-2025 (D).
   - **Hailuo (MiniMax):** 600 M+ cumulative by the end of 2025 (annual report; P). That is about 1.2 M per day in H2-2025 (D).
   - **Google Veo 3:** 230 M by 29 Oct 2025 (P), about 1.6 M per day in Q3-2025 (D). **Flow:** 275 M by 15 Oct 2025 (P).
   - **PixVerse:** 2.1 B cumulative by 12 Mar 2026 (P, MKT).
   - **Seedance API:** revenue-implied up to about 1 B generated seconds per month (D). This is an **upper bound**, because Volcano Engine's president says the reported revenue figures are "all wrong, and too high".
   - **Sum of what is disclosed:** roughly **50–60 M clips per day, or about 300–550 M generated seconds per day** (D, L–M). This undercounts: Jimeng/Doubao/CapCut, Meta Vibes, Midjourney, Runway, Luma, Pika, Vidu and local open-source generation are not included.
   - **Scale comparisons:**
     - YouTube receives about 20 M uploads per day (P).
     - About 14,345 fiction features were made worldwide in 2024 (IMDb via Stephen Follows; S). At about 1.6 h each, that is roughly 23,000 hours (D).
     - One day of disclosed AI generation (roughly 85,000–150,000 hours) is more than the world's annual feature-film output in hours (D).

2. **Most generated video is never watched, but platforms do not publish a "published ÷ generated" ratio.** The best proxies:
   - **Professional work discards most takes.** Generated seconds run 57–107× the finished seconds in documented ads and shorts (C/C2 files). The Coca-Cola 2025 ad used about 70,000 clips for 60 s.
   - **Consumer apps:** Sora reached 9.6 M downloads, but daily users peaked at about 1 M (WSJ via TechCrunch). Similarweb put Sora at about 673 k DAU in Nov 2025. Vibes had about 2 M DAU (Business Insider, from internal data).
   - **In China, nearly all AI output goes unwatched.**
     - About 128,000 micro-dramas were launched in Q1-2026, and more than 95% were AI (China Netcasting Services Association, CNSA, via DataEye).
     - About 367,000 were launched in H1-2026, of which 75% were AI.
     - The hit rate is **0.117%** (AI comic dramas passing 100 M plays).
     - More than 99% of AI short dramas get fewer than 1 M plays (secondary, L).
     - About 90% of AI-drama producers lose money.
   - **Usage is heavy-tailed.** In text-to-image prompt logs, the mean user issues about 7× as many prompts as the median user (Midjourney: 87 vs 12; DiffusionDB: 213 vs 62) (P/D).
   - **Most use was play until recently.** Volcano Engine said that before Seedance 2.0, **weekend calls far exceeded weekday calls** (a "toy"). After 2.0, weekday load overtook the weekend.

3. **What is watched is concentrated in "slop" feeds.**
   - AI slop was 21% of the first 500 Shorts shown to a new YouTube account and 59% of a new TikTok For You feed (Kapwing, P).
   - 278 all-AI channels among YouTube's top 15,000 had 63 B views (P).
   - TikTok has labelled more than 3 B videos as AIGC (P, Jul 2026).
   - YouTube's classifier terminated about 130,000 AI-spam channels in six months (Google paper, via Fstoppers; S).

4. **No published top-down estimate of total AI-video electricity exists.**
   - **IEA (Apr 2026):** data centres used 485 TWh in 2025. Video generation "can require hundreds to thousands of times more energy" than text. The bulk of planned capacity "must be destined for other workloads, such as … video and image generation", but no company discloses the split.
   - **Carbon Trust/DIMPACT (Jun 2026):** separates *additive* AI video, which "otherwise would never have existed", from *displacing* use, and invokes Jevons. It gives no global total.
   - **Worked illustration (D, L):** 300–550 M s/day × 2–60 Wh/s gives **0.2–12 TWh/yr, with a central value of about 1.5 TWh/yr (≈0.3% of data-centre electricity) and about 0.6 MtCO₂e/yr**. The central case is about the size of Netflix's whole production footprint (≈0.4 Mt, 2024, D) and about 3.5× all UK productions footprinted with albert in 2024 (0.174 Mt).
   - **Rule of thumb (D):** at 10 Wh/s, **every 1 billion generated seconds ≈ 10 GWh ≈ 4,000 tCO₂e ≈ one tentpole feature** (the Sustainable Production Alliance (SPA) tentpole average is 3,370 t).

5. **Rebound evidence exists, but it is correlational.**
   - MiniMax's monthly video generations rose **+652.9%** (Jun→Nov 2025) after a new model and a "Fast" tier that cut batch cost by up to 50% (P).
   - Meta's media generation rose **>10×** after the free Vibes feed launched (P).
   - Google: +40% daily users creating video in the Gemini app after Omni, which is free in Shorts Remix (P). SynthID watermarks went from 10 B items (May 2025) to more than 100 B images and videos (May 2026) (P).
   - Artlist's "unlimited" Seedance 2.5 offer was withdrawn within days as a "demand problem" (S).
   - China: micro-drama output rose several-fold as AI cut costs. **Stephen Follows** gives a pre-AI precedent: cheaper digital production took fiction features from 4,097 (2000) to 14,345 (2024), while professionally represented films stayed at about 1,300 a year.
   - **Counter-evidence:** Sora shut down because it cost about $1 M per day against $1.4–2.1 M of *lifetime* revenue, which suggests true-cost pricing suppresses casual volume. LatePost reports that both Seedance and Kling revenue growth slowed in mid-2026.

---

## 2. Volume data

### 2.1 Company-level volume figures

| Platform | Value | What exactly it measures | Date of statement | Source | P/S | Conf. | Flags |
|---|---|---|---|---|---|---|---|
| **xAI Grok Imagine** | **1.245 billion videos in 30 days** | Videos generated in "the last 30 days" (≈2 Jan–1 Feb 2026) | 1–2 Feb 2026 (Grok Imagine 1.0 launch; quoted by Elon Musk) | x.com/grok/status/2018165333643997600; Musk quote-post x.com/elonmusk/status/2018171445919015007 [1] | P | M | **MKT.** The month includes the January 2026 Grok image-abuse controversy. Clip length was up to 6 s before v1.0, then 10 s. Free to X users. D: ≈41.5 M per day |
| Grok (context) | Monthly users: 35 M (Dec 2025), about 117 M (Mar 2026) | Grok MAU, attributed to SpaceX's IPO filing | Mar–Jul 2026 | aibusinessweekly.net [2] | S | L | Filing not read directly |
| **Kling (Kuaishou)** | **>600 M videos cumulative; >60 M users; >30,000 enterprises**; December 2025 revenue >$20 M (ARR $240 M) | Cumulative videos generated on Kling; global registered users | Stated at CES, Jan 2026 (as of end-2025) | Android Headlines, 15 Jan 2026 [3]; Huxiu, 5 Jun 2026 [4] | S (company statement reported) | M–H | The ARR is confirmed by Kuaishou's FY2025 release [7]. The video and user counts are not in the filings |
| Kling | 22 M users; >168 M videos; >344 M images | Cumulative, first anniversary | Jun 2025 | Baidu Baike [5] | S | M | — |
| Kling | ">200 M videos, >400 M images" (Gai Kun, head of Kling) | Cumulative | late Jul 2025 (WAIC forum) | The Paper / Guancha [6] | S (quote) | M | — |
| Kling | Q1-2026 revenue **>RMB 650 M**; ARR ≈ **$500 M in Mar 2026**. Q2-2026 revenue **>RMB 850 M** (>200% YoY). Q4-2025 revenue RMB 340 M | Revenue | 27 May 2026; 19 Aug 2026; 25 Mar 2026 | Kuaishou Q1 [8], Q2 [9], FY2025 [7] | P | H | No video counts in the filings. "100 M users" at the second anniversary is a **market expectation** in the Huxiu piece [4], not a disclosure. **Do not cite it as fact** |
| **Hailuo (MiniMax)** | **>600 M videos cumulative** ("our video models had helped creators worldwide generate") | Cumulative, all MiniMax video models (app + API) | As of 31 Dec 2025 (AR 2025, 22 Apr 2026) | MiniMax Annual Report 2025 [10]; FY2025 release [11] | P | H | The H1-2026 interim results give **no** updated count [12] |
| Hailuo | >370 M videos cumulative | "Hailuo Video … empowered creators to generate" | 18 Jun 2025 | MiniMax, Hailuo 02 launch [13] | P | H | A Chinese secondary source adds "日均处理量达百万级" (daily volume in the millions) [14] (S, L) |
| Hailuo | Average MAU **2.17 M (2024) → 5.65 M (9M-2025)** | Unique devices active on the Hailuo AI app | Prospectus, 31 Dec 2025 | MiniMax Global Offering prospectus [15] | P | H | — |
| Hailuo | **Videos generated per month +652.9%**, June vs November 2025 | Month-on-month video count | Prospectus | [15] | P | H | See §6 (rebound) |
| **Google Veo 3** | **>70 M videos** "since May" | Veo 3 generations (Gemini app + Flow + API) | 23 Jul 2025 (Q2-25 call) | Alphabet CEO remarks [16] | P | H | Earlier: 40 M in 7 weeks (known) |
| Google Veo 3 | **>230 M videos** | Same | 29 Oct 2025 (Q3-25 call) | Alphabet CEO remarks [17] | P | H | No later Veo count in the Q4-25, Q1-26 or Q2-26 remarks [18] |
| **Google Flow** | **>275 M videos generated in Flow** | Flow only (launched 20 May 2025) | 15 Oct 2025 | Google blog, "Introducing Veo 3.1…" [19] | P | H | Overlaps with the Veo 3 count; do not add them |
| Google (Gemini app) | "a **40% increase in daily active users creating videos** on the Gemini app" since Omni launched at I/O (May 2026) | Growth rate only | 22 Jul 2026 (Q2-26 call) | [18] | P | H | No absolute number |
| Google (all gen-media) | SynthID has watermarked **>100 B images and videos** (plus 60,000 years of audio). A year earlier it was **>10 B pieces of content** (including text and audio) | Watermarked outputs, all Google generators | 19 May 2026; 20 May 2025 | Pichai I/O 2026 [20]; Google SynthID Detector post [21] | P | H | Images dominate; the video share is not given. Nano Banana: >50 B images [20] |
| YouTube | "every day in December, **over one million channels** used our new AI creation tools" | Channels using AI creation tools (including Veo in Shorts) per day | 4 Feb 2026 (Q4-25 call); Mohan letter, 21 Jan 2026 | [18]; YouTube CEO letter [22] | P | H | Channels, not videos |
| **OpenAI Sora app** | 9.6 M downloads and **$1.4 M** consumer spend to date. Downloads −32% MoM in December and −45% in January (1.2 M) | Appfigures estimates | 29 Jan 2026 | TechCrunch [23] | S | M | — |
| Sora app | Peak about 3.3 M downloads (Nov 2025), 1.1 M (Feb 2026) | Appfigures | 25 Mar 2026 | WIRED [24] | S | M | — |
| Sora app | Users peaked at **about 1 M**, then fell below 500 k; cost about **$1 M per day** | WSJ investigation | 29 Mar 2026 | TechCrunch citing WSJ [25] | S | M | App shut on 26 Apr 2026; API shut on 24 Sep 2026 [26] |
| Sora app | ≈673,000 DAU (Nov 2025) | Similarweb | 18 Nov 2025 | Sherwood News [27] | S | M | — |
| Sora (estimate) | "**11.3 M videos per day**", $15 M per day | Forbes arithmetic: 4.5 M users × 25% × 10 videos per day | 10 Nov 2025 | Forbes [28] | S | **L** | **Assumption-driven.** OpenAI declined to comment. The WSJ's $1 M per day implies roughly 10× less |
| Sora (limits) | 30 free generations per day at launch → "power users" exceeded it; paid packs of 10 for $4; Pro up to 100 per day; later 6 per day free | Per-user caps | Oct–Nov 2025 | Business Insider / Mashable, quoting Bill Peebles [29] | S (quotes P) | M | Peebles: economics "completely unsustainable" |
| **Meta Vibes / Meta AI** | "media generation in the app increase[d] **more than tenfold**" since Vibes launched; ">20 billion images" created with Meta products | Growth rate; cumulative images | 29 Oct 2025 (Q3-25 call) | Meta transcript [30] | P | H | No video count |
| Meta AI | "the number of daily actives **generating media tripled** year-over-year in Q4" | Growth rate | 28 Jan 2026 | Meta Q4-25 call [30] | P | H | — |
| Meta Vibes | **2 M DAU** (as of 9 Nov 2025) | Internal data reported by Business Insider | 18 Nov 2025 | Sherwood News [27] | S | M | Meta AI app DAU went from 775 k to 2.7 M in the four weeks after Vibes (Similarweb) [31] |
| Meta (ads) | Combined revenue run-rate of "video generation tools" **$10 B** in Q4-25; >9 M small businesses using AI creative tools (Q2-26) | Ad revenue flowing through ads made with gen-video tools, **not** tool revenue | Jan 2026; Jul 2026 | [30] | P | H | Shows AI video is already embedded in ad supply |
| **PixVerse** | **>2.1 B videos generated to date**; 16 M MAU; >100 M users by Sep 2025 | Cumulative generations | 12 Mar 2026 | PixVerse blog [32] | P | M | **MKT** (Series C release). The July 2026 release says 150 M users [33] |
| **Higgsfield** | >20 M users; >50 M videos generated | Cumulative | 18 Mar 2026 | PR Newswire (as recorded in C2) | P | M | MKT |
| Higgsfield | 30 M users; **$700 M annualized revenue**; agentic products drive ">20 M content generations per month" | Users; ARR; monthly generations (images + video) | 17 Aug 2026 | PR Newswire, Series B [34] | P | M | **MKT.** A wiki claims "300 M videos by early 2026" (unsourced; conflicts with the 50 M figure; **do not use**) |
| **Seedance API (Volcano/BytePlus)** | Revenue ">¥1 B per month" / "$2 B ARR" | Reported revenue | 3 Jun 2026 (36Kr); 16 Jun 2026 (LatePost) | B file [S47][S49]; LatePost [35] | S | **L–M** | **Disputed:** on 23 Jun 2026, Volcano president Tan Dai said "all the Seedance revenue figures circulating are wrong, and too high" [36] |
| Seedance | "Nearly half" of calls come from overseas. Before 2.0, "weekend call volume was far higher than weekdays"; after 2.0, weekday load overtook weekends | Usage mix | 23 Jun 2026 | Tan Dai interviews [36][37] | P (quoted) | M–H | The weekend pattern is direct evidence of hobby/"toy" use |
| Volcano Engine (all models) | Doubao daily tokens **>120 T** (Mar 2026) → **>180 T** (Jun 2026); growth attributed partly to "the explosion of AI video creation" | Daily token calls, all models | 2 Apr 2026; 23 Jun 2026 | NBD / IT Home / TMTPost [38] | P (announced) | H | **No video share disclosed** |
| Jimeng (ByteDance) | Peak DAU about **2.5 M** | App DAU | 16 Jun 2026 | LatePost [35] | S | M | No generation counts found for Jimeng, Doubao or CapCut/Dreamina |
| Doubao app | >200 M daily users; offers about 10 free Seedance 2.0 videos per day | Users; free cap | 2026 | LatePost [35]; Zhihu guide [39] | S | M/L | Free tier = volume driver |
| **China, all platforms** | "**In 2025, AI-generated video/audio totalled more than 2 billion items**, up more than 14× on 2024"; more than half of users have encountered AI audio-visual content | Unclear whether generated or published; video and audio combined | 15–16 Apr 2026 | CNSA *China Online Audio-Visual Development Report (2026)*, via People's Daily/Xinhua [40] | P (report) | M | Probably content circulating on platforms, since Kling alone generated about 430 M in H2-2025. **Ambiguous** |
| Vidu (Shengshu) | "more than 500 M clips to date" | Cumulative | ~Apr 2026 | vantaige.io [41] | S | **L** | Not found in Shengshu's PR Newswire releases |
| Hedra | ">2.5 M users have already generated millions of videos" | Cumulative | 15 May 2025 | Hedra Series A release (Yahoo/PR) [42] | P | M | MKT |
| Pika | "500 K+ daily users generating millions of videos weekly" | — | n/d | morphed.app / aitoolshq [43] | S | **L** | Unsourced aggregator |
| Luma | "30 M+ Dream Machine users" | Users | n/d | morphed.app [43] | S | L | No video count |
| Runway | ARR claims of $100–300 M; "business doubled in 2026" | Revenue | 2026 | TechTimes, Latka and others [44] | S | L | No volume disclosed |
| Midjourney | V1 video launched Jun 2025; no volume disclosed | — | — | Midjourney updates [45] | P | — | Gap |
| **Analyst market totals** | "$716 M (2025) / $847–946 M (2026)" for the AI video generator market | Market-research estimates (Fortune Business Insights, Grand View and others) | 2025–26 | aggregators [46] | S | **L** | **Unreliable.** Kling alone is at about $0.5 B ARR and Higgsfield claims $0.7 B. No analyst (a16z, Similarweb, Sensor Tower, IDC, Omdia, Morgan Stanley or Goldman) publishes a *videos or seconds* total that I could find |

### 2.2 Derived run-rates (D; my arithmetic)

| Platform | Inputs | Derived rate | Conf. |
|---|---|---|---|
| Grok Imagine | 1.245 B ÷ 30 d | **≈41.5 M videos per day** (Jan 2026). At 6–10 s: ≈250–415 M s/day | M (the count is MKT; the length mix is unknown) |
| Kling | 168 M (early Jun 2025) → 600 M (31 Dec 2025) ≈ 432 M in ≈208 d | **≈2.1 M per day** in H2-2025 (≈2.5 M per day from the late-July 200 M point) | M |
| Kling, 2026 (revenue-scaled) | H2-2025 revenue ≈ ¥640 M (FY ≈¥1.04 B, S, minus Q1 ¥150 M and Q2 ¥250 M) ÷ ≈432 M videos ≈ ¥1.5 per video. Q2-2026 ¥850 M ÷ ¥1.5 | ≈570 M per quarter ≈ **6 M per day** | **L** (paid mix and prices changed) |
| Hailuo | 370 M (18 Jun 2025) → 600 M (31 Dec 2025) = 230 M in 196 d | **≈1.2 M per day** | M–H |
| Veo 3 | 70 M (23 Jul) → 230 M (29 Oct 2025) = 160 M in 98 d | **≈1.6 M per day** (≈1.1 M per day in the first 64 days) | H |
| Flow | 275 M in 148 d (20 May–15 Oct 2025) | ≈1.9 M per day (overlaps Veo 3) | H |
| PixVerse | 2.1 B over about 2 years of operation | ≈2–3 M per day average (current rate unknown) | L |
| Seedance API (upper bound) | ¥1 B per month ÷ ¥46 per M tokens (2.0, 480p/720p, no video input) = 21.7 T tokens per month. At 720p/24 fps (21,600 tokens/s, B file) → **≈1.0 B s per month ≈ 33 M s/day ≈ 9,300 h/day** (≈3 M 10-s clips per day). If mostly 1080p (48,600 tokens/s at ¥51/M), ≈0.4 B s per month | **0.4–1.0 B s per month** as an **upper bound** (the revenue figure is disputed [36]) | L |
| Seedance share of Doubao tokens | 21.7 T per month ≈ 0.72 T per day vs 180 T per day | ≈0.4% of Volcano's daily token count, *if* video tokens are in that metric (unknown) | L |
| Sora (WSJ-based) | $1 M per day ÷ Forbes' $1.30 per video | ≈0.8 M per day at peak | L |
| **Disclosed total, early 2026** | Grok 41.5 M + Kling 2–6 M + Seedance API ≤3 M + Veo 1.6–1.9 M + Hailuo 1.2 M + PixVerse 2–3 M + Sora ≤0.8 M + Higgsfield ≈0.5 M | **≈50–60 M clips per day ≈ 18–22 B per year; ≈300–550 M generated seconds per day ≈ 85,000–150,000 h/day ≈ 30–55 M h/yr** | **L–M.** Periods differ (Q3-2025 to Jan 2026), and the Grok month may be a peak. It **excludes** Jimeng/Doubao/CapCut, Meta, Midjourney, Runway, Luma, Pika, Vidu and local open models, so it is probably an **undercount** of the total |

---

## 3. Never-watched and usage-distribution evidence

No platform publishes "share of generations published/shared/downloaded". The evidence below consists of proxies.

### 3.1 Generated vs used (professional)

- **Documented takes per kept shot:** 2–27. **Generated seconds per finished second:** Trillo ≈57:1, Kalshi ≈80–107:1, Air Head ">80:1", a Seedance feature ≈64:1 (61,000 generations for 960 kept clips). Conventional live action runs at 10–30:1 (C, C2 files; H for the individual cases).
- **Coca-Cola 2025 holiday ad:** "70,000 AI-generated video clips" for a 60-s spot (Carbon Trust report p.11; Ketan Joshi, 17 Dec 2025 [47]). This is the extreme case: almost everything generated was discarded.
- **Carbon Trust VFX case study:** 2,137 generated videos for a 53-s scene (6,411 in the high-iteration case) (A1b file).

### 3.2 Consumer apps: installs far exceed sustained use

| Evidence | Value | Source | P/S | Conf. |
|---|---|---|---|---|
| Sora: downloads vs users | 9.6 M downloads (Jan 2026) vs ≈1 M peak users, then <500 k; ≈673 k DAU (Nov 2025) | [23][25][27] | S | M |
| Sora: money | $1.4 M consumer spend by Jan 2026 ($2.1 M lifetime, later reports) vs about $1 M per day compute (WSJ) | [23][25] | S | M |
| Vibes | 2 M DAU while integrated with Facebook and Instagram (≈3.5 B daily people). Appfigures estimate: +2.6 M incremental Meta AI downloads in the 28 days after Vibes, vs 22 M for Nano Banana | [27][48] | S | M |
| Higgsfield | 50 M videos ÷ 20 M users = **2.5 videos per user** cumulative (D). Kling: 600 M ÷ 60 M = 10 per user (D). PixVerse: 2.1 B ÷ >100 M = ≈20 per user (D) | [3][32] | D | M. Registered users greatly exceed active users; the median user makes very few videos |
| Seedance usage timing | Before 2.0: "weekend call volume far higher than weekdays" ("toy" use); after 2.0: weekday load overtook weekends | [36][37] | P (quoted) | M–H |
| Per-user caps (sets the heavy-user ceiling) | Sora: 30 per day free at launch, 100 per day Pro; Artlist "unlimited" Seedance 2.5: ≈2,550 s per day (≈85 × 30-s clips); Doubao: ≈10 free per day | [29]; B2 file (CineD); [39] | S | M |

### 3.3 Heavy vs casual users (log data)

**Xie et al., "A Prompt Log Analysis of Text-to-Image Generation Systems" (WWW '23; arXiv 2303.04587) [49], Table 2 (P, H):**

| Dataset | Prompts | Users | Median per user | Max per user | Mean (D) |
|---|---|---|---|---|---|
| Midjourney Discord (4 weeks) | 145,074 | 1,665 | 12 | 2,493 | ≈87 |
| DiffusionDB | 2,208,019 | 10,380 | 62 | 19,556 | ≈213 |

- The mean is 3.4–7× the median, so volume comes from a minority of heavy users.
- Sessions average 10–14 prompts (median 4–5), against about 2 for web search (C2 file).
- These are image logs; there is **no equivalent public log for video**.
- VidProM (NeurIPS 2024) holds 1.67 M real text-to-video prompts from Pika's Discord and 6.69 M generated videos, but reports no per-user distribution [50].

### 3.4 China micro-drama: industrial-scale output, almost none of it watched

| Metric | Value | Source | P/S | Conf. |
|---|---|---|---|---|
| Micro-dramas launched, Q1-2026 | **≈128,000**, of which **AI >95%** (≈122,000) | CNSA data via DataEye / The Paper, 23 Jul 2026 [51] | S (citing P) | M–H |
| Micro-dramas launched, H1-2026 | **≈367,000**, of which **AI ≈275,000 (75%)** | 快科技 via 199it, 23 Aug 2026 [52] | S | M |
| Micro-dramas launched, 2025 (Jan–Aug, CNSA) | 140,000 vertical dramas | 199it list citing CNSA [52] | S | M |
| AI comic dramas (AI漫剧) | 2025: >40,000 launched, 70 B plays. Jan 2026: **14,634 launched (>470 per day)**. "100 M-play rate" **0.117%** | CG世界 via Huxiu, 15 Apr 2026 [53] | S | M |
| Plays distribution | ">99% of AI short dramas have fewer than 1 M plays; hit rate <0.2%"; monthly capacity rose from 5,000 to >38,000 | tecdat aggregator [54] | S | **L** (the underlying DataEye source was not seen) |
| Producer economics | About **90% of AI-drama companies are loss-making** | DataEye via The Paper [51] | S | M |
| Douyin, H1-2026 | >220,000 new dramas, >500 B cumulative plays (all dramas) | DataEye via vzkoo [55] | S | M |
| Earlier known | Lingju: about 100 series per month × about 100 min | (brief) | — | — |

### 3.5 AI video that *is* watched: "slop" share of feeds

| Metric | Value | Source | P/S | Conf. |
|---|---|---|---|---|
| New YouTube account, first 500 Shorts | **104 (21%) AI-generated; 165 (33%) "brainrot"** | Kapwing, 28 Nov 2025 [56] | P | H (n=1 account; a snapshot) |
| YouTube top channels | Of about 15,000 (top 100 per country), **278 are all-AI slop**, with **>63 B views, 221 M subscribers, ≈$117 M per year** (estimate) | Kapwing [56]; Guardian, 27 Dec 2025 [57] | P / S | M (the revenue is modelled) |
| Fastest-growing YouTube channels | **9 of the top 100** (July 2025) were purely AI | Guardian / Playboard, 11 Aug 2025 [58] | P (analysis) | M |
| New TikTok account, first 500 videos | **294 (59%) AI slop**. Category sample: 10,742 videos across 20 categories; Kids 57.4% | Kapwing, 9 Jun 2026 [59] | P | M–H |
| TikTok AIGC labels | "**labeled over 3 billion videos as AIGC**" (cumulative; Content Credentials, creator labels and watermarks) | TikTok Newsroom, 10 Jul 2026 [60] | P | H. About 1.3 B was reported for Nov 2025 (S, M) [61] |
| YouTube enforcement | Google's Scalable Cluster Termination System (S-CTS) terminated **≈50,000 clusters ≈130,000 channels in six months** | Google paper, via Fstoppers, 19 Jul 2026 [62] | S | M |
| YouTube uploads (context) | **>20 M videos uploaded per day**; Shorts **200 B daily views**; >10 M channels publish Shorts daily (Mar 2026) | YouTube for Press [63]; Mohan letter [22]; Q1-26 call [18] | P | H |

**Reading (D).**
- Disclosed AI generation (≈50–60 M clips per day) is 2–3× YouTube's total daily uploads (20 M).
- TikTok's cumulative 3 B labelled AI videos is roughly **two months** of Grok Imagine output alone.
- Only a small fraction of generations appear to be published anywhere, but the true share is unknown (L).
- Of what is published, a small set of monetised slop channels captures most of the views.

---

## 4. Aggregate energy estimates

### 4.1 Published top-down sources

| Source | What it says | Date | P/S | Notes |
|---|---|---|---|---|
| **IEA, *Key Questions on Energy and AI*** [64] | Data-centre electricity **485 TWh in 2025 (+17%)**. AI-focused data centres +50% in 2025. About **950 TWh by 2030**. "Video generation can require hundreds to thousands of times more energy [than short text queries], depending on duration and resolution." 10 B text queries per day at a generous 1 Wh ≈ 3.6 TWh/yr, "<1% of the 485 TWh", so "the bulk of planned capacity must be destined for other workloads, such as … video and image generation … none of the companies … have offered a comparable breakdown" | Apr 2026 | P | **No video-specific total** |
| IEA, *Energy and AI* (2025) | Data centres 415 TWh (2024) → about 945 TWh (2030); about 180 MtCO₂ in 2024 (via the Carbon Trust summary) | Apr 2025 | P (via S) | iea.org returned 403; the blob PDF for 2026 worked |
| **Carbon Trust / DIMPACT**, *The carbon impact of AI video generation* | Distinguishes AI video that displaces other production (comparative) from content "that otherwise would never have existed" (additive). "Consistent with the Jevons' paradox, efficiency improvements can lead to more frequent and widespread use." If true-cost pricing is passed through, "usage will decrease outside professional production companies". **No global volume or TWh estimate** | 23 Jun 2026 | P | The text is saved in `A1b/ct_report.txt` |
| **Ketan Joshi** | Coca-Cola: "Assuming about a kilowatt hour per clip, that is **70 megawatt hours**", "more than four times the total CO2 impact of an average single advertising project". The Carbon Trust's alternative is 2.6 t | 17 Dec 2025 | P (his post) | A single project, not a total [47] |
| MIT Technology Review | 5-s video ≈ 3.4 MJ (≈0.94 kWh), ">700× a high-quality image" | 20 May 2025 | P (journalism) | Per clip; no total [65] |
| Epoch AI, Luccioni, SemiAnalysis | No aggregate AI-video energy piece found (A1b file). Luccioni's 2026 output is the per-clip paper (Jegham, Gamazaychikov & Luccioni, arXiv 2607.04553) | — | — | Gap |
| Hackernoon, "One Day of AI Video Generation Undid a Forest's Work" | Title and date only (22 Jul 2026); **not retrieved**, so its method is unknown | — | — | Do not cite without reading it |

### 4.2 Worked illustration for the tool (D; every input sourced above)

- **Volume V:** 300–550 M generated s/day (disclosed only, §2.2). Central 400 M s/day ≈ 146 B s/yr.
- **Intensity E (facility Wh per generated second):**
  - Low 2: MiniMax H3 Max on GB200 ≈1.5 Wh/s GPU; Veo 3 ≈3.9 Wh/s GPU (Jegham) (A1b).
  - Central 10.
  - High 60: Carbon Trust assumption, 494 Wh total per 8-s 720p clip.
  - Grok Imagine's intensity is unknown.
- **Energy = V × E:** low 300 M × 2 = 0.6 GWh/day (0.2 TWh/yr); **central 400 M × 10 = 4 GWh/day (≈1.5 TWh/yr)**; high 550 M × 60 = 33 GWh/day (≈12 TWh/yr).
- **Share of 485 TWh:** low ≈0.05%, **central ≈0.3%**, high ≈2.5%.
- **Carbon at 0.41 kgCO₂e/kWh** (the Carbon Trust's US grid factor): low ≈0.09 Mt, **central ≈0.6 Mt**, high ≈5 MtCO₂e/yr (training and embodied excluded; the Carbon Trust adds 0.1–1.0× for training).
- **Scale rule (D):** **1 B generated seconds × 10 Wh/s = 10 GWh ≈ 4,100 tCO₂e ≈ 1.2 SPA-average tentpoles** (3,370 t [66]) **≈ 62 average albert UK feature-hours** (66.4 t/h).
  - Seedance API at its disputed upper bound (≈1 B s per month) ≈ one tentpole per month.
  - Grok's January 2026 (≈7.5–12.5 B s) ≈ 9–15 tentpoles, *if* it ran at 10 Wh/s (unknown).
- **Per hour (D):** 10 Wh/s = 36 kWh ≈ 15 kgCO₂e per *generated* hour. The UK average (albert) is 15.3 t per *finished* hour, about 1,000× more. But the disclosed total generates **≈30–55 M hours/yr**, about 2,600–4,800× the ≈11,400 hours albert footprinted in the UK in 2024.
- **Takeaway:** each unit is cheap, but the total volume is huge.

---

## 5. Conventional scale references

| Reference | Value | What it measures | Date | Source | P/S | Conf. |
|---|---|---|---|---|---|---|
| Fiction feature films worldwide | **14,345 in 2024** (4,097 in 2000); **224,914** in 2000–24 | IMDb "made" fiction features (excluding documentaries, adult, in-development) | 31 Aug 2026 | Stephen Follows [67] | S (analysis of IMDb) | M–H |
| … with a professional sales agent | **8.9% (2024)**; ≈**1,250–1,400 films per year** (peak 1,480 in 2019) | Films with a genuine sales company | same | [67] | S | M–H |
| Europe | **2,514 feature films produced in 2024** (record); "2,523 in 36 markets" in *Key Trends 2026* | European Audiovisual Observatory (EAO) counts | 2025–Mar 2026 | EAO press release [68]; Broadband TV News [69] | P / S | H / M |
| UNESCO | UIS series "Number of national feature films produced" (by country; no current world total retrieved) | — | — | UNdata [70] | P | Gap (no world total fetched) |
| US series | **1,122 US-produced shows premiered in 2025** (−11% from 1,266 in 2024; peak 1,695 in 2022). All genres except live sports and news. Streaming 584, cable 384, broadcast 154 | Series count, not hours | 21 Jan 2026 | Luminate via The Hollywood Reporter [71] | S (data P) | H |
| US scripted (FX count) | ≈600 (2022) → 516 (2023) → ≈510 (2024) | Adult scripted series | 2024–25 | c21media / others [72] | S | M |
| UK TV | Public service broadcasters (PSBs) delivered **≈31,400 hours of first-run UK-originated content in 2025** (+3%); >60,000 h UK programming on demand | Hours | Jul 2026 | Ofcom, *Media Nations* (via Ofcom page and ISPreview) [73] | P / S | H |
| **YouTube uploads** | **>20 M videos per day** (current). The historic figure was ">500 hours per minute" (≈720,000 h/day; 2019–22) | Uploads | live page, 2026-09-25 | YouTube for Press [63] | P | H (count); the hours figure is dated |
| YouTube Shorts | 200 B daily views | Views | Jan 2026 | [22] | P | H |
| **UK production emissions (albert)** | **174,437 tCO₂e from 2,540 footprints (2024)**; 210,598 t (2023). 15.3 t per content-hour; features 66.4 t/h | albert-footprinted UK productions | Nov 2025 | BAFTA albert *ACCELERATE 2025* (D file) | P | H |
| **Netflix** | Total **1,092,236 t** market-based (1,373,907 t location-based) in 2025. 2024: 1,037,226 t, of which production ≈41% ≈ **0.38–0.43 Mt** (D file, derived). In 2025, "largest source … corporate, followed by production" | Company footprint | 2025 ESG report | Netflix [74] | P | H |
| SPA (US) | Tentpole average **3,370 t** (≈33 t per shoot day); large 1,081 t; medium 769 t; small 391 t (2016–19 data) | Per-production averages | 2021 | SPA report [66] | P | H |
| Canada (Telefilm) | Features about 7,126 t/yr; TV about 260,843 t/yr (sector totals) | albert-based | Feb 2024 | D2 file | P | H |
| California (UCLA 2006) | Film and TV industry ≈**8.4 MtCO₂e** (LA area ≈8 Mt) | Whole-industry activity (broad scope) | 2006 | UCLA Institute of the Environment [75] | P | M (old; broad boundary). **TIME's "15 Mt" is inconsistent** |
| **Global film/TV total** | **None credible found.** "≈1.4 Mt globally" appears on one site with no source (**do not use**). Gitnux-style statistic pages are unreliable (D2 file) | — | — | — | — | Gap |

---

## 6. Rebound and Jevons evidence

| Evidence | What happened | Source | P/S | Conf. | Caveat |
|---|---|---|---|---|---|
| MiniMax | June vs November 2025: **videos generated per month +652.9%**, alongside Hailuo 2.3 and a Fast model that "can reduce batch content creation costs by up to 50%" | Prospectus [15]; AR 2025 [10] | P | H | Quality and price changed at the same time |
| Google Veo 3 price cut | API price about halved on 8 Sep 2025 ($0.75 → $0.40/s; Fast $0.40 → $0.15/s). The Veo 3 run-rate rose from ≈1.1 M to ≈1.6 M per day between the two disclosures (D) | Google Developers blog [76]; [16][17] | P / D | M | Most volume is consumer-app, not API; correlation only |
| Google Omni free in Shorts Remix | "+40% daily active users creating videos on the Gemini app" | [18][20] | P | H | — |
| Google SynthID | >10 B items (May 2025, all modalities) → >100 B images and videos (May 2026) | [21][20] | P | H | Mostly images |
| Meta Vibes (free) | Media generation in Meta AI rose ">10×"; daily actives generating media tripled YoY | [30] | P | H | — |
| Grok Imagine (free on X; API $0.05/s) | 1.245 B videos in 30 days | [1]; x.ai API page | P | M | MKT |
| Artlist "unlimited" | One year of unlimited Seedance 2.5 for about $500 (7–10 Aug 2026), capped at about 2,550 s/day, withdrawn "within days". Artlist: a commitment "we couldn't keep" | CineD, 14 Aug 2026 (B2 file) | S | M | Zero marginal price overwhelmed capacity |
| Sora | "30 gens per day would suffice … hasn't been the case" (power users) → economics "completely unsustainable" → free tier cut to 6 per day → shutdown | [29][25] | S (quoting P) | M | Shows the reverse: charging the true cost suppresses casual volume (the Carbon Trust makes the same point) |
| China micro-drama | AI cut production cost (from about ¥50,000 to under ¥1,000 per drama, L). Launches reached ≈128,000 in Q1-2026 (95% AI) and ≈367,000 in H1-2026 | [51][52]; Sohu white paper | S | M | — |
| Pre-AI precedent | Cheaper digital production took fiction features from 4,097 (2000) to 14,345 (2024), 3.5×. Represented films stayed at about 1,300 per year | Stephen Follows [67] | S | M–H | Strong analogue for the "access" argument |
| IEA | Energy per AI task is "dropping by at least an order of magnitude annually", yet data-centre demand +17% and AI data centres +50% in 2025 | [64] | P | H | Sector-wide |
| Slowdown signals | Seedance revenue growth "has slowed"; Kling ARR growth slowed after ≈$500 M in early May 2026 | LatePost [35] | S | M | Rebound is not unbounded |

---

## 7. Gaps

1. **No generation counts** for Jimeng, Doubao, CapCut/Dreamina (probably the largest Chinese consumer volume), Meta Vibes, Midjourney video, Runway, Luma, Pika or Vidu (except L-grade claims), or local open-source models (Wan and others).
2. **No "published ÷ generated" or "downloaded ÷ generated" statistic** from any platform. The Sora and Vibes feed-posting shares were not disclosed.
3. **No analyst total in videos or seconds.** a16z, Similarweb, Sensor Tower (*State of AI 2026*: 36 B hours on gen-AI apps in H1-2026; not video-specific), IDC, Omdia, Morgan Stanley and Goldman all measure revenue or traffic only. Market-size reports conflict with company revenues.
4. **The Seedance revenue figure is disputed** by Volcano's president, so volumes derived from it are an upper bound.
5. **Per-second energy for Grok Imagine** (the largest volume) is unknown. The aggregate estimate is dominated by that assumption.
6. **CNSA's "2 B AI video/audio items in 2025"** is undefined (generated or published; video vs audio).
7. **No global film/TV production emissions total.** UCLA 2006 (California, 8.4 Mt, broad scope) is the only regional industry-wide figure. The UNESCO world total of features was not fetched; IMDb via Follows is the best proxy.
8. **Hours of US and UK scripted TV:** only series counts (Luminate) and UK PSB first-run hours (all genres) were found.
9. Not retrieved:
   - the Hackernoon aggregate piece
   - the Kapwing slop data after 2026-06
   - the SpaceX IPO filing text (the Grok MAU figure is second-hand)
   - the Google S-CTS paper itself (it came via Fstoppers)
10. The Grok 1.245 B month may be atypical: the launch month, the image-abuse controversy and free access all fell in it.

---

## 8. Sources

1. xAI / @grok, "Introducing Grok Imagine 1.0 … Imagine has generated 1.245 billion videos in the last 30 days alone", 1–2 Feb 2026. https://x.com/grok/status/2018165333643997600 ; quoted by Elon Musk: https://x.com/elonmusk/status/2018171445919015007 (text verified via api.fxtwitter.com)
2. AI Business Weekly, "Grok AI Statistics 2026: What the SpaceX IPO Filing Revealed". https://aibusinessweekly.net/p/grok-ai-statistics
3. Android Headlines, "With 60 million users, USD240 million Run Rate, Kling AI Showcases … at CES", 15 Jan 2026. https://www.androidheadlines.com/2026/01/with-60-million-users-usd240-million-run-rate-kling-ai-showcases-next-gen-video-creation-tools-at-ces.html
4. Huxiu, "可灵AI两周年：全球用户突破1亿，企业客户近5万家" ("Kling AI at two: 100 M global users, nearly 50,000 enterprise customers"; the headline figures are an *expectation*), 5 Jun 2026. https://www.huxiu.com/ainews/12964.html
5. Baidu Baike, Kling entry (as of Jun 2025: 22 M users; 168 M videos; 344 M images). https://baike.baidu.com/item/Kling3.04K/67770115
6. The Paper / Guancha, "累计生成超2亿视频，快手可灵AI…" ("Over 200 M videos generated: Kuaishou's Kling AI…"), Jul 2025. https://m.thepaper.cn/newsDetail_forward_31268440
7. Kuaishou, Q4 and FY2025 results (PR Newswire mirror), 25 Mar 2026. https://scitechanddigital.news/2026/03/25/kuaishou-technology-announces-fourth-quarter-and-full-year-2025-financial-results/
8. Kuaishou, Q1 2026 results, 27 May 2026. https://www.prnewswire.com/news-releases/kuaishou-technology-announces-first-quarter-2026-unaudited-financial-results-302782888.html
9. Kuaishou, Q2 and interim 2026 results, 19 Aug 2026. https://www.nasdaq.com/press-release/kuaishou-technology-announces-second-quarter-and-interim-2026-unaudited-financial (mirror: https://ohsem.me/2026/08/kuaishou-technology-announces-second-quarter-and-interim-2026-unaudited-financial-results/); Q2 call transcript: https://stockanalysis.com/quote/hkg/1024/transcripts/680856-q2-2026/
10. MiniMax, Annual Report 2025 (">600 million videos"), 22 Apr 2026. https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0422/2026042202118.pdf
11. MiniMax, FY2025 results release, 2 Mar 2026. https://www.minimax.io/news/minimax-global-announces-full-year-2025-financial-results
12. MiniMax, H1-2026 results, 26 Aug 2026. https://www.minimax.io/news/minimax-announces-first-half-2026-financial-results-1787744160 ; PDF https://file.cdn.minimax.io/public/586c7995-cab1-41b5-9178-c06685b32c88.pdf
13. MiniMax, "Hailuo 02" (">370 million videos"), 18 Jun 2025. https://www.minimax.io/news/minimax-hailuo-02
14. Zhihu, "MiniMax双剑齐发…" ("MiniMax launches two products at once…"), Jun 2025. https://zhuanlan.zhihu.com/p/1919721121412015766
15. MiniMax, Global Offering prospectus (Hailuo MAU; +652.9% monthly videos), 31 Dec 2025. https://www1.hkexnews.hk/listedco/listconews/sehk/2025/1231/2025123100025.pdf
16. Alphabet Q2-2025 CEO remarks, 23 Jul 2025. https://blog.google/company-news/inside-google/message-ceo/alphabet-earnings-q2-2025/
17. Alphabet Q3-2025 CEO remarks, 29 Oct 2025. https://blog.google/company-news/inside-google/message-ceo/alphabet-earnings-q3-2025/
18. Alphabet CEO remarks Q4-2025, Q1-2026, Q2-2026. https://blog.google/company-news/inside-google/message-ceo/alphabet-earnings-q4-2025/ ; …/alphabet-earnings-q1-2026/ ; …/alphabet-earnings-q2-2026/
19. Google, "Introducing Veo 3.1 and advanced capabilities in Flow", 15 Oct 2025. https://blog.google/technology/ai/veo-updates-flow/
20. Sundar Pichai, "I/O 2026: Welcome to the agentic Gemini era", 19 May 2026. https://blog.google/innovation-and-ai/sundar-pichai-io-2026/
21. Google, SynthID Detector ("Over 10 billion pieces of content"), 20 May 2025. https://blog.google/technology/ai/google-synthid-ai-content-detector/
22. Neal Mohan, "From the CEO: What's coming to YouTube in 2026", 21 Jan 2026. https://blog.youtube/inside-youtube/the-future-of-youtube-2026/
23. TechCrunch, "OpenAI's Sora app is struggling after its stellar launch" (Appfigures), 29 Jan 2026. https://techcrunch.com/2026/01/29/openais-sora-app-is-struggling-after-its-stellar-launch/
24. WIRED, "OpenAI Enters Its Focus Era by Killing Sora", 25 Mar 2026. https://www.wired.com/story/openai-shuts-down-sora-ipo-ai-superapp/
25. TechCrunch, "Why OpenAI really shut down Sora" (citing WSJ), 29 Mar 2026. https://techcrunch.com/2026/03/29/why-openai-really-shut-down-sora/
26. OpenAI, Sora discontinuation FAQ. https://openai.com/sora/?view=Schedule
27. Sherwood News, "Meta's Vibes AI video feed has 2 million daily active users", 18 Nov 2025. https://sherwood.news/tech/metas-vibes-ai-video-feed-has-2-million-daily-active-users/
28. Forbes, "OpenAI Could Be Blowing As Much As $15 Million Per Day On Silly Sora Videos", 10 Nov 2025. https://www.forbes.com/sites/phoebeliu/2025/11/10/openai-spending-ai-generated-sora-videos/
29. Business Insider, "OpenAI explains how it plans to start making money from Sora users", Oct 2025. https://www.businessinsider.com/openai-sora-monetization-plan-daily-limit-2025-10 ; Mashable https://mashable.com/article/openai-sora-pay-make-more-ai-videos
30. Meta earnings-call transcripts Q3-2025, Q4-2025, Q1-2026, Q2-2026. https://stockanalysis.com/stocks/meta/transcripts/368931-q3-2025/ ; …/405037-q4-2025/ ; …/547899-q1-2026/ ; …/657318-q2-2026/
31. TechCrunch, "Meta AI's app downloads and daily users spiked after launch of 'Vibes'" (Similarweb), 20 Oct 2025. https://techcrunch.com/2025/10/20/meta-ais-app-downloads-and-daily-users-spiked-after-launch-of-vibes-ai-video-feed/
32. PixVerse, "PixVerse Joins the Ranks of Global AI Unicorns…", 12 Mar 2026. https://pixverse.ai/en/blog/pixverse-joins-global-ai-unicorns-asia-largest-funding-ai-video
33. PixVerse, "Series C Extension…", 14 Jul 2026. https://pixverse.ai/en/blog/pixverse-closes-series-c-extension-and-announces-expansion-into-interactive-entertainment
34. Higgsfield, "Higgsfield Raises $400 Million Series B…", 17 Aug 2026. https://www.prnewswire.com/news-releases/higgsfield-raises-400-million-series-b-financing-at-5-4-billion-valuation-with-annualized-revenue-reaching-700-million-302852430.html
35. LatePost via NetEase, "字节跳动的 AI 账本…" ("ByteDance's AI ledger…"), 16 Jun 2026. https://www.163.com/dy/article/KVIL6O950531M1CO.html
36. Sohu Tech, "对话火山引擎谭待：传闻的Seedance收入数据都是错的" ("Tan Dai of Volcano Engine: the circulating Seedance revenue figures are all wrong"), 23 Jun 2026. https://www.sohu.com/a/1040624951_115565
37. Tencent News, Tan Dai interview (weekend vs weekday calls; overseas share), 24 Jun 2026. https://news.qq.com/rain/a/20260624A0271S00 ; tvcn https://www.tvcn.com.cn/tech/4054922.html
38. NBD, "豆包日均120万亿Tokens…" ("Doubao hits 120 trillion daily tokens…"), 3 Apr 2026. https://www.nbd.com.cn/articles/2026-04-03/4325344.html ; TMTPost (180 T), Jun 2026. https://en.tmtpost.com/news/8037307
39. Zhihu, Seedance 2.0 free-quota guide (Doubao about 10 per day). https://zhuanlan.zhihu.com/p/2004138628176168008
40. People's Daily via Xinhua, "《中国网络视听发展研究报告（2026）》发布" ("*China Online Audio-Visual Development Report (2026)* released"), 16 Apr 2026. https://www.news.cn/politics/20260416/cac5d121fdbf4dd88a92f22bc2218e9d/c.html
41. vantaige.io, Vidu profile. https://vantaige.io/ai-tool/vidu
42. Hedra Series A release (Yahoo Finance), 15 May 2025. https://finance.yahoo.com/news/hedra-raises-32m-build-leading-130000097.html
43. morphed.app aggregator pages (Pika, Luma). https://morphed.app/stats/pika-statistics ; https://morphed.app/stats/luma-dream-machine-statistics
44. TechTimes, "Runway AI Hits $200M ARR…", Sep 2026. https://www.techtimes.com/articles/326994/20260908/runway-ai-hits-200m-arr-enterprise-video-adoption-triples-existing-spend.htm
45. Midjourney, "Introducing Our V1 Video Model". https://updates.midjourney.com/introducing-our-v1-video-model/
46. Aggregators of market-size figures (for example adwave.com, axis-intelligence.com). https://adwave.com/resources/ai-video-generation-statistics-2026
47. Ketan Joshi, LinkedIn post on Coca-Cola (70 MWh), 17 Dec 2025. https://www.linkedin.com/posts/ketanjoshi1_this-is-a-huge-admission-coca-cola-revealed-activity-7406978626123956224-Kw8V
48. aboutchromebooks.com, Meta AI usage statistics (Appfigures incremental downloads). https://www.aboutchromebooks.com/meta-ai-usage-statistics/
49. Xie et al., "A Prompt Log Analysis of Text-to-Image Generation Systems", WWW '23. https://arxiv.org/abs/2303.04587
50. Wang & Yang, "VidProM", NeurIPS 2024. https://arxiv.org/abs/2403.06098
51. The Paper (DataEye), "AI短剧90%承制方亏损…" ("90% of AI short-drama producers lose money…"), 23 Jul 2026. https://www.thepaper.cn/newsDetail_forward_33634747
52. 199it, "2026年上半年全国上线微短剧约36.7万部，AI微短剧27.5万部占75%" ("About 367,000 micro-dramas launched nationally in H1-2026; 275,000 AI micro-dramas, 75%"), 23 Aug 2026. https://www.199it.com/archives/1847149.html
53. Huxiu (CG世界), "亏损率90%？，AI漫剧是风口还是镰刀？" ("90% loss rate? Are AI comic dramas an opportunity or a trap?"), 15 Apr 2026. https://www.huxiu.com/article/4850830.html
54. tecdat, 2026 short-drama report summary. https://tecdat.cn/2026短剧，漫剧及ai剧报告：出海与成本革命-附100报告/
55. vzkoo, DataEye *H1-2026 AI drama report* summary. https://www.vzkoo.com/read/11290660848400017215a95ddaa8.html
56. Kapwing, "AI Slop Report: The Global Rise of Low-Quality AI Videos", 28 Nov 2025. https://www.kapwing.com/blog/ai-slop-report-the-global-rise-of-low-quality-ai-videos/
57. The Guardian, "More than 20% of videos shown to new YouTube users are 'AI slop'", 27 Dec 2025. https://www.theguardian.com/technology/2025/dec/27/more-than-20-of-videos-shown-to-new-youtube-users-are-ai-slop-study-finds
58. The Guardian, "Cat soap operas and babies trapped in space…", 11 Aug 2025. https://www.theguardian.com/technology/2025/aug/11/cat-soap-operas-and-babies-trapped-in-space-the-ai-slop-taking-over-youtube
59. Kapwing, "The TikTok AI Slop Report", 9 Jun 2026. https://www.kapwing.com/resources/the-tiktok-ai-slop-report/
60. TikTok Newsroom, "Helping people spot and understand AI generated content on TikTok", 10 Jul 2026. https://newsroom.tiktok.com/helping-people-spot-and-understand-aigc-on-tiktok?lang=en-150
61. Dynamoi (1.3 B labelled, secondary). https://dynamoi.com/learn/ai-music-distribution/tiktok-ai-content-statistics
62. Fstoppers, "How a Google Machine Terminated 130,000 AI Slop YouTube Channels in Six Months", 19 Jul 2026. https://fstoppers.com/artificial-intelligence/how-google-machine-terminated-130000-ai-slop-youtube-channels-six-months-903645
63. YouTube for Press ("over 20 million videos uploaded daily"; retrieved 2026-09-25). https://blog.youtube/press/
64. IEA, *Key Questions on Energy and AI*, Apr 2026. https://iea.blob.core.windows.net/assets/3179f7f8-01f6-4dd6-bffa-c9f7b73f1dc9/KeyQuestionsonEnergyandAI.pdf
65. MIT Technology Review, "We did the math on AI's energy footprint", 20 May 2025. https://www.technologyreview.com/2025/05/20/1116327/ai-energy-usage-climate-footprint-big-tech/
66. Sustainable Production Alliance, *Carbon Emissions of Film and Television Production*, 2021. https://greenproductionguide.com/wp-content/uploads/2021/04/SPA-Carbon-Emissions-Report.pdf
67. Stephen Follows, "How many feature films never sign with a sales agent?", 31 Aug 2026. https://stephenfollows.com/p/how-many-feature-films-never-sign-with-a-sales-agent
68. European Audiovisual Observatory, "European films made up a third of all cinema admissions in Europe in 2024". https://www.obs.coe.int/en/web/observatoire/-/european-films-made-up-a-third-of-all-cinema-admissions-in-europe-in-2024
69. Broadband TV News, "European audiovisual market reaches €142bn", 25 Mar 2026. https://www.broadbandtvnews.com/2026/03/25/european-audiovisual-market-reaches-e142bn-says-observatory/
70. UNdata, UIS "Number of national feature films produced". https://data.un.org/Data.aspx?d=UNESCO&f=series:C_F_220006
71. The Hollywood Reporter, "Past the Peak: TV Series Count Declines for Third Straight Year in 2025" (Luminate), 21 Jan 2026. https://www.hollywoodreporter.com/tv/tv-news/no-more-peak-tv-series-total-falls-2025-1236479596/
72. C21Media, "'Peak TV' is now in rearview mirror…" (516 in 2023). https://www.c21media.net/news/peak-tv-now-in-rearview-mirror-according-to-fxs-john-landgraf/
73. Ofcom, "Nation's media habits revealed in annual Ofcom report" (2026). https://www.ofcom.org.uk/media-use-and-attitudes/media-habits-adults/nations-media-habits-revealed-in-annual-ofcom-report ; ISPreview, Jul 2026. https://www.ispreview.co.uk/index.php/2026/07/ofcom-subscription-streaming-services-in-uk-homes-have-plateaued.html
74. Netflix, *2025 ESG Report*. https://downloads.ctfassets.net/4cd45et68cgf/4wE55CdOTayavbYsdmB16O/40151d21709e52b10b0905bcdb8ac736/2025_Netflix_Environmental_Social_Governance__ESG__Report_Final.pdf
75. UCLA Institute of the Environment, *Sustainability in the Motion Picture Industry* (2006). https://www.ioes.ucla.edu/wp-content/uploads/2016/10/RC06.pdf
76. Google Developers Blog, "Veo 3 and Veo 3 Fast – new pricing…", Sep 2025. https://developers.googleblog.com/en/veo-3-and-veo-3-fast-new-pricing-new-configurations-and-better-resolution/

**Cross-references to earlier files:**
- **B:** Seedance tokens and prices; 36Kr and LatePost.
- **B2:** the Artlist and CineD unlimited episode.
- **C and C2:** generation-to-use ratios; Higgsfield, March 2026.
- **A1b:** Carbon Trust figures; per-second energy.
- **D and D2:** albert, Netflix 2024, Telefilm.
