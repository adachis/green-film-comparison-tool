# Stream C2: AI filmmaking workflows, second-pass follow-up

Research date: 2026-09-25. This follow-up fills gaps left by `C_ai_filmmaking_workflows.md` and does not repeat what that file already documents.

**Legend**
- **Type:** P = primary (the creator's or company's own words or documents, including direct quotes inside an article). S = secondary (a reporter's paraphrase or an aggregator). V = vendor blog or marketing (the tool seller has an interest). "Snippet" = seen only in a search-result summary, not in fetched page text.
- **Confidence:** H = high, M = medium, L = low.
- **R_count** = generations per kept shot. **R_sec** = generated seconds per finished second. "Derived" = my arithmetic, with assumptions stated.
- **Currency:** CNY figures are converted at ¥6.7126 per US$ (ECB reference rate for 2026-09-24, via api.frankfurter.dev). This is approximate, because the underlying reports date from Mar–Apr 2026, when the rate may have differed.
- **Method note:**
  - Bing, the first fallback, returned degraded first-word-only results for this IP, so most searches used DuckDuckGo Lite through headless Chromium (`tools/ddg.js`, written for this pass).
  - X posts were read through the public fxtwitter API.
  - Reddit, Instagram, and sagaftra.org blocked all access, so I used the AMPTP-hosted SAG-AFTRA MOA PDF for guild terms.

---

## 1. Summary

1. **The "$25,000 to generate the Artlist Seedance 2.5 winner" claim is still unverified, and I now think it is almost certainly a conflation.**
   - None of the 12 winners of the Artlist $250K Seedance 2.5 Challenge disclosed spend, credits, generation counts, or hours in anything I could reach: the winners' LinkedIn posts, Instagram captions (via search snippets), Artlist's pages, the "You Should See This" write-up, and Israeli and trade press.
   - The best match for "$25,000" in the same weeks is a different project: **Odysseus: The Fall**, Ash Koosha and Fountain 0's fully AI-generated feature of about 135–150 minutes. It was released on Sep 16, 2026 and was widely described as made for **about $25,000** (Fox Business, Sep 15, 2026), "one person, one laptop… four months."
   - It was made with **Kling, not Seedance**, and its press release says Kling **"underwr[ote]… the token cost of the film,"** so the $25k does not include the real generation cost.
   - The Artlist winners were announced at almost the same time (Instagram, Sep 8; LinkedIn posts, Sep 10–14), which makes a mix-up plausible.
   - Other possible sources: the Artlist Studio Challenge credit grant (about $28k of credits per finalist, per Kingy AI, first pass) and Higgsfield's $500K Seedance 2.0 feature, **Hell Grind** (see below).
2. **The best new Seedance-specific data point is Hell Grind** (Higgsfield, premiered May 21, 2026 at the Cannes market, not the festival).
   - It is a **95-minute** feature made in **14 days** by a **15-person** team, for a budget of **under $500K, of which about $400K was compute**.
   - Higgsfield's own post says **"The first 25 minutes needed 16,181 generations for 253 shots"**, so **R_count ≈ 64**. At about 15 s per attempt, that is **R_sec ≈ 160** (derived).
   - The primary video model was **Dreamina Seedance 2.0**, with some Veo 3 (CineD). Secondary reports give about 61,000 generations for 960 kept clips across the whole film, the same ratio of about 64:1.
   - Derived costs: about **$4,200 of compute per finished minute** and about **$6.50 per generation**.
3. **Chinese AI micro-drama reporting is the richest source of real reroll ("抽卡", *chōukǎ*, literally "card-drawing") data for Seedance and its competitors.** It shows ratios that swing with model version and provider load:
   - **10–20 draws per shot in Aug 2025, falling to 1–2 by Mar 2026** after Seedance 1.5 Pro and 2.0 (a Hengdian producer, *First Financial*, 2026-03-13).
   - **"Previously 2–3 generations to pick one usable clip; now often 7–8"** during Seedance 2.0 congestion and quality throttling (*China Entrepreneur*, 2026-04-01).
   - **"Many shots… 10–20+ draws, sometimes dozens"** (a drama screenwriter's team, same source).
   - **"Nearly ten generations for a simple shot"** (a creator, *Beluga Lab*, 2026-04-28).
   - Cost per finished minute:
     - about **¥200 (~$30) of compute** for experienced teams, and **over ¥500 (~$75)** for teams still learning (*China Entrepreneur*);
     - about **¥1,000 (~$149) all-in production cost** for AI short drama, against about **¥20,000 (~$2,980)** for live-action xianxia (*First Financial*).
4. **Brand ads:**
   - **McDonald's NL** (45 s, Dec 2025): 7 weeks, "up to 10" in-house AI and post specialists plus directors, "thousands of takes." That is at least about 44 takes per finished second (derived).
   - **Svedka**, the first primarily AI Super Bowl ad (30 s, Feb 2026): Silverside says it took "under one month" against a traditional "half a year," but the brand's CMO said it **"didn't save much money and certainly not a ton of time."**
   - **Under Armour** (2024): 4 weeks, 21 people, "thousands of stills" animated with Runway Gen-2.
   - **Puma's Eusébio** campaign: one-third of the traditional cost, but **6–8 months**.
   - **Artlist's own Super Bowl ad:** **$5,000 in 3 days** (Ynet, May 2026; the first pass had this only as a snippet).
   - **Kalshi** (Sep 2026): now says it "no longer uses AI-generated content that depicts people."
5. **Surveys and academic work:**
   - **No peer-reviewed study measures generations per usable shot for video production.** The closest academic evidence is text-to-image prompt-log research: sessions average **10–14 prompts** (median 4–5), against about 2 for web search. Lab data from CHI 2026's Vidmento study show **8 videos and 31 images per session** on average.
   - **Adobe's 2026 survey of more than 16,000 creators:** **57%** say AI outputs "typically require moderate or extensive editing" before they can be used.
   - Vendor benchmarks: 60–85% "social-ready" yield for simple clips (1.2–1.7 generations per usable clip), against 3.75% for Kalshi's broadcast bar.
6. **Guilds, 2026:**
   - **WGA 2026 MBA** (May 2, 2026 to May 1, 2030): keeps all the 2023 AI terms. It adds semi-annual meetings on generative AI and written notice to the Guild, with a right to discuss remuneration, when companies license writers' material to train a public-facing commercial generative AI system.
   - **SAG-AFTRA 2026 TV/Theatrical** (ratified June 2026 with 91.42% in favour; effective July 1, 2026 to June 30, 2030):
     - adds a **"principle strongly favoring human performances"**;
     - bars AI "Synthetics" in human roles unless the producer "reasonably concludes" they bring **"significant additional value,"** and then requires notice, bargaining, and arbitration, with any remuneration paid to the health or pension plan;
     - requires notice of third-party training licences and an "articulable business reason" for scanning performers;
     - requires consent (but not payment) for foreign-language voice replicas from July 2027.

**Implications for the calculator (my inference, not a source finding):**
- Add a **"feature-scale Seedance" anchor**: R_count about 64 and R_sec about 160, at roughly $4.2k of compute per finished minute (Hell Grind).
- Add a **"Chinese micro-drama production line" anchor**: R_count about 2–8 in normal conditions, 10–20+ for hard shots, and about ¥200–500 ($30–75) of compute per finished minute.
- Add a **provider-load multiplier**: throttling tripled rerolls (from 2–3 to 7–8) in April 2026.
- Note that **quantized, "dumbed-down" inference** (Seedance 2.0 moved from FP32 to INT8 or lower, per *Beluga Lab*) may cut energy per generation while raising generations per keeper.

---

## 2. The $25,000 claim

### 2.1 What was checked, and what was found

| Check | Result | Source (date) | Type | Conf. |
|---|---|---|---|---|
| Artlist winners page (re-fetched) | 12 winners with descriptions only. **No spend, credits, generation counts, or hours.** The 12 embedded YouTube videos are Artlist re-uploads, all titled "Artlist Seeedance 2.5 Challenge Winner." | https://artlist.io/blog/artlist-250k-seedance-2-5-challenge/ (page dated 12 Aug 2026, but the winners' content was added later) | P | H |
| Challenge dates and rules | "The challenge runs from August 17th to August 31th, 2026." Minimum 30 s, **no maximum length**, one entry per account. The FAQ on the same page says "after August 26th" and the blog says "by August 26th," so Artlist's pages contradict each other. Up to 25 winners at up to $10,000 each. | help.artlist.io article 38321747541661 (fetched 2026-09-25) | P | H |
| "Unlimited" at the time of the challenge | The help page still says "Artlist subscribers get 365 days of unlimited Seedance 2.5 generations… without spending credits." However, CineD (2026-08-14) reports that the unlimited offer, sold Aug 7–10, was **withdrawn within days, before the Aug 17 start**, and the product FAQ now says Seedance 2.5 runs on credits. Entrants therefore most likely paid in credits. | help.artlist.io; https://www.cined.com/artlist-sold-a-year-of-unlimited-seedance-2-5-for-500-and-delivered-a-week/ (2026-08-14) | P / S | H / M |
| Winners announced | Artlist Instagram, **Sep 8, 2026**: "we selected 12 winners." | instagram.com/p/DdB4q8ADVX9 (snippet) | P (snippet) | M |
| "Liza" (Eitan Cohen & Moran Moradi) | Posted **Aug 31, 2026** by @eitanxcohen (1,206 likes): "Part of the Artlist Seedance 2.5 Contest… Created by @porandfavor aka @eitanxcohen and @morani_____." A second snippet for the same URL reads "This is a **40-second** AI-generated film — every frame made with Seedance 2.5 on @artlist.io, using our own footage of Sophisticated Lady as reference… built with Danny over **the last week**." The reference to "Danny" does not match the credited team, so this may be another reel shown on the same page. **No spend stated.** | instagram.com/reel/Dcs4sjENot5 (snippets; Instagram blocked direct fetch) | P (snippet) | L |
| "The Last Note" (Ben Keil, Israel) | **74-second** film "with Seedance 2.5 in Artlist." No spend. | You Should See This, LinkedIn 2026-09-03; youshouldseethis.ai/magazine/the-last-note | S | M |
| "Ed" (Noa Adar / Noa Yossef) | Winner's LinkedIn posts (Sep 10 and 14): thanks and quotes only. No spend. | linkedin.com/posts/noa-adar_… (2026-09-14) | P | H |
| Other winners (Meteor, Rosa, Pirate, Roosters, BMW M3, Taxidermy, Crazy Plants, Signs, Used Character) | Profiles found (for example Auriona.studio's Seedance 2.5 test reels, Jonathan Degueldre's car-content site, and Mush Dubezki at McCann Israel). **No spend or generation disclosures found.** | DDG searches, 2026-09-25 | — | — |
| Observers | Tom Halards (LinkedIn, 2026-09-10) singled out Liza. Mark Itskowitch, a non-winner, wrote "Many are extremely professional - ad agency worthy!" Neither gives numbers. | LinkedIn | P | H |
| Israeli press (Calcalist, Globes, Geektime, Ynet) | Artlist coverage exists (June 2026 layoffs of about 200 of 500 staff; revenue figures; the Super Bowl ad), but **nothing on the challenge winners' costs.** | calcalist.co.il; globes.co.il; ynet.co.il | S | M |
| Reddit (r/aivideo and others) | Reddit's JSON, RSS, and old.reddit endpoints returned 403 or 429, and DDG `site:reddit.com` searches found nothing on the challenge. **Not researchable here.** | — | — | — |
| "$25,000" + Seedance / AI film / credits (general search) | Matches found only for **Odysseus: The Fall** (Kling-based; next table), for unrelated "$25k/month AI video income" posts on X, and for generic "$25k–$150k AI feature" estimate posts. **No Seedance winner reported at $25k.** | DDG, 2026-09-25 | — | — |

### 2.2 The most likely origin of "$25,000": Odysseus: The Fall (Fountain 0)

| Item | Value | What it measures | Source (date) | Type | Conf. |
|---|---|---|---|---|---|
| Budget, July 2026 announcement | "mid-five figures" | total budget | THR 2026-07-14 (Koosha quote); Variety 2026-07-14 | P (quote) | H |
| Budget, September 2026 release | "**$25,000** budget", "a budget of about $25,000 using tools like Kling AI, Claude and Gemini" | total budget | Fox Business video description, 2026-09-15 | S | M |
| Social framing | "ONE PERSON. ONE LAPTOP. $25,000. FOUR MONTHS." and "One guy. One laptop. $25,000." | promotion | Instagram (cinememe; Cinema.Shorts.Daily), 2026-09-15 (snippets) | S | L |
| Implied by the producer | "**10,000 films** of the quality of Odysseus… can now be created at the same cost of Nolan's film" ($250M ÷ 10,000 = $25,000 each, derived) | per-film cost claim | PR Newswire 2026-09-16 (Tom Rogers quote) | P | H (quote) |
| Token cost | "extremely grateful to the AI model Kling for its valuable contributions **and its underwriting of the token cost of the film**" | compute was subsidized, so the $25k excludes true generation cost | PR Newswire 2026-09-16 (Pooya Koosha) | P | H |
| Runtime | **150 min** (September release) vs **135 min** (July announcement) | finished runtime | PR Newswire 2026-09-16; THR and Variety 2026-07-14 | P | H (both stated) |
| People and time | "sole creator… **only part-time work** by Ash over the course of **four months**." Other accounts: "two, three months… just one person on a laptop and part-time" (SYFY) and three months (Variety). Pooya Koosha did post-production. | labour | PR Newswire; SYFY 2026-07-22; Variety | P | H |
| Tools | Fountain 0 engine "operated on top of the Kling video model" (Kling 3.0 series, native 4K); Google Nano Banana for "imagery and core frames"; Claude for language editing; Gemini for research. The script and all voices are by Koosha. | stack | PR Newswire; THR | P | H |
| Likenesses | 13 real people (PR), or 12 (Variety), licensed; they are paid from backend grosses | casting model | PR Newswire; Variety | P | H |
| Generation count | **Not disclosed** | — | — | — | — |
| Reception | The Verge: "2.5 hours too long"; continuity errors throughout | quality | The Verge 2026-09-16 | S | H |
| Derived | about **$167 per finished minute** at $25k/150 min, excluding the Kling-underwritten tokens | $/min | derived | — | L |
| Predecessor | **Dreams of Violets** (Tribeca 2026) "cost $2,000 to make" | total cost | THR 2026-07-14; The Verge 2026-07-15 | S | M |

### 2.3 Sanity check on $25k for a 30–74-s Artlist entry (derived)

Assume Artlist Seedance 2.5 costs about $7.50 per 30-s generation (about 15,000 credits, a customer estimate, at about 2,000 credits per $1 from the first pass) up to about $14 (CineD's raw-inference estimate). Then $25k buys roughly **1,800–3,300 thirty-second generations**. For a 40-s film, that is about **1,300–2,500 generated seconds per finished second**, 8–15 times Hell Grind's feature-scale R_sec of about 160, for an entry reportedly built in about a week. By contrast, the AI Creator plan's 80,000 monthly credits (180,000 after Artlist's remedy) cover only about **5–12 thirty-second generations**. **Conclusion:** $25k in generation spend on one Artlist challenge entry is implausible unless it counts crew, agency time, or other costs. No source says so.

### 2.4 Other contests checked (for a "$25k" figure or spend disclosures)

| Contest | Facts | Spend disclosed? | Source (date) | Type | Conf. |
|---|---|---|---|---|---|
| Artlist Studio Challenge (winner) | Won by **Jonathan Boden / Bizarre Bunny**, "Three Bells at Blackwood Hall" (announced Aug 14, 2026). 6 finalists. The winner wrote "about **16 iterations**" of the script before production. | No | Boden on LinkedIn, 2026-08-14; Artlist Instagram 2026-08-14 | P | H |
| CapCut Seedance 2.5 Video Challenge (Wave 1) | Prizes: $10,000 best overall, $3,000, then $1,000 ×3, then $100 ×20 | No | CapCut on Instagram and X, 2026-07-31 | P | H |
| CapCut Seedance 2.5 Challenge Wave 2 | $80,000 pool, Aug 10 to Sep 6, 2026. Entries must be **3 min or longer**, built in CapCut Desktop, and continue an official opening scene. Unlimited entries. | No | capcutaichallenge.com | P | H |
| Higgsfield "Make Your Action Scene" | About **8,800 submissions** from 139 countries, $500K pool. 1st "GRANDMA vs WASP" (Nassar & Meyer, $150k). 3rd "SCRATCH" (Gevorkyan brothers) made "**in just five days**." Higgsfield: "more than 20 million users… generated over 50 million videos" (about 2.5 videos per user, derived and heavily skewed). | No | PR Newswire (Higgsfield) 2026-03-18 | P (company) | H |
| Kling AI NEXTGEN 2026 | Awards in Seoul (July 2026). The 2025 edition drew 4,600+ entries from 122 countries. Creator interviews were "coming soon." | No | Kling on X 2026-07-15; TikTok | P | H |
| Runway AI Festival 2026 | Six tracks. Film track 3–15 min. Grand Prix $50k plus 1M credits. Galas in NY (Jun 11), LA (Jun 18), Tokyo (Jul 30). | No | aivideoadvisor 2026-08-11; aif/aiff.runwayml.com | S | M |
| Google Flow Sessions (cohort 4) | Six-week residency; 11 artists; screened at the Metrograph (late July 2026) | No | blog.google 2026-07-30 | P | H |
| Curious Refuge | Four themed competitions a year ($10–12k pools); 2026 Feel-Good winner "In Another Breath" | No | aifilmcontests; YouTube | S | M |
| yes& "Skills Try-Out" (Seedance 2.5) | An entrant wrote "**100K+ credits?** I may have taken the challenge a little too literally" (credits were provided by the platform; $ value unknown) | credits only | Facebook video post (snippet) | P (snippet) | L |

---

## 3. New project data table

All entries are new relative to the first pass unless marked "update."

| Project (date) | Model(s) | Finished runtime | Generations / kept | Ratio | $ spend | People | Time | Source (date) | Type | Conf. |
|---|---|---|---|---|---|---|---|---|---|---|
| **Hell Grind** (Higgsfield; premiered 2026-05-21, Cannes market) | **Dreamina Seedance 2.0** (primary video) plus Veo 3; Higgsfield Soul Cinema (images), Soul Cast (faces), Cinema Studio 3.5, DoP image-to-video. Compute on Nebius and CoreWeave. | **95 min**; the platform's video file is 5,759.85 s at 4096×1716 | **First 25 min: 16,181 generations → 253 shots.** Whole film (secondary): "more than 61,000" (61,487 per one analysis video) → **960** clips. The Higgsfield project panel shows "Generations: 115 446" (scope unclear; probably includes images). | **R_count ≈ 64.** R_sec ≈ 160 at about 15 s per attempt (CineD: "about 15 seconds of footage per attempt"). About 647 generations per finished minute. Kept shot about 5.9 s. (derived) | **Under $500K total; about $400K (80%) compute; about $100K labour.** About $4,200 of compute per finished minute and about $6.50 per generation (derived). | **15** directors, DPs, and editors (mostly in person, Almaty) | **14 days** | Higgsfield on X 2026-05-20 (primary numbers); CineD; Crypto Briefing 2026-05-26; bottlerocketcontent 2026-08-06; st-hakky 2026-08-05; Higgsfield project page (fetched 2026-09-25) | P (16,181/253, $400K); S (61k/960; stack) | H / M |
| Hell Grind, extra facts | Prompts of "**around 3,000 words**" per 15-s shot; physics phrases added to prompts ("no floating props"). Released as about 22–25-min episodes. Open-sourced on 2026-08-04 (prompts, assets, iteration history, a 19-min BTS). Variety called the look "ghastly." | — | — | — | Higgsfield compared it to about $50M for a traditional film (its own figure, unverified) | — | — | CineD; Higgsfield on X 2026-08-04; bottlerocketcontent | S / P | M |
| **Odysseus: The Fall** (Fountain 0, 2026-09-16) | Kling (3.0 series), Nano Banana, Claude, Gemini, Fountain 0 engine | 150 min (Sep) / 135 min (Jul) | n/d | n/d | "about **$25,000**" (Fox Business) / "mid-five figures" (July). **Token cost underwritten by Kling.** | 1 (plus a producer and post) | part-time over 4 months (or 2–3 months) | See §2.2 | P / S | M |
| **McDonald's NL**, "It's the Most Terrible Time of the Year" (TBWA\Neboko and The Sweetshop, released 2025-12-06, pulled about 4 days later) | undisclosed gen-AI ("The Gardening Club" in-house engine) | **45 s** | "thousands of takes" ("what felt like dailies") | at least about 44 takes per finished second at ≥2,000 takes (derived) | n/d | "**up to 10** of our in-house AI and post specialists" plus directors | **7 weeks** ("we hardly slept") | The Sweetshop CEO, quoted in Futurism 2025-12-09 | P (quote) | H |
| (derived) McDonald's NL labour | — | — | — | — | — | about 3,500–4,200 person-hours (10 people × 7 weeks × 50–60 h), or about **4,700–5,600 person-hours per finished minute** (assumed hours/week) | — | derived | — | L |
| **Svedka, "Shake Your Bots Off"** (Silverside AI; Super Bowl LX, 2026-02-08) | ComfyUI workflows; custom-trained character and world models; a real human dance mapped to the robots | 30 s | n/d. "12 separate robot actions in the first 10 seconds"; "a dedicated final pass cleaned remaining hallucinations" | n/d | n/d. The Sazerac CMO: "**didn't save much money and certainly not a ton of time**… never been an efficiency play" | "just as many brains and hands… as any traditional production ad" | "a production timeline that historically runs half a year, reduced to **under one month**"; changes were made a week before air | Comfy case study (Svedka and Silverside quotes); THR 2026-02-03 | P (quotes) | H |
| **Under Armour, "Forever Is Made Now"** (Tool; Wes Walker, 2024-03) | Text-to-image ("**thousands of stills**") animated with Runway Gen-2; CG; licensed footage; AI voiceover | about 1 min (not verified) | thousands of stills → curated groups → Gen-2 clips | n/d | n/d ("exponentially higher" if traditional) | **21** | **4 weeks** (1 week ideation, 3 weeks production), against a usual "5–6 weeks on the quick side" | Runway customer story 2024-02-29 (Tool); Communication Arts 2024-05-01 (Walker) | P | H |
| **Puma, Eusébio special-edition campaign** (Puma and Portugal; campaign date not stated; reported 2026-02) | fully AI-generated apart from product shots | 360° campaign | n/d ("extensive iteration" for model consistency) | n/d | "**one-third** the cost of traditional production" | agencies "had to hire external AI specialists mid-project" | **6–8 months** | Samuel Barreto (PUMA), interview in the Enrich Labs newsletter, 2026-02-06 | P (interview) / S | M |
| **Kalshi** (update) | Veo 3 | 30 s | (first pass: 300–400 → 15) | — | **$2,000 budget**, "three days and a laptop… built entirely inside Google Veo 3"; 7.3M views on first post | 1 | 3 days | Genre.ai campaign page (fetched 2026-09-25) | P | H |
| Kalshi, later (update) | — | — | — | — | — | — | — | Kalshi "no longer uses AI-generated content that depicts people" after a face-swap ad controversy; it is reviewing the agency; Ad Age reports a shift to human-talent campaigns | BI 2026-09-24; Ad Age (title only) | P (statement) / S | H |
| **Artlist Super Bowl LX spots** (update) | Nano Banana Pro, Seedance 1.5, Kling 2.6 (first pass) | 30 s spots | n/d | n/d | "**a tiny budget of $5,000**" | small team | "**produced in three days**" (Ynet). The first pass had "5 days, 2% of the cost" from an Artlist exec, so the two accounts differ. | Ynet 2026-05-27 and Yedioth feature | S | M |
| **The Arc** (Artlist Original, 5 episodes; premiered in London 2026-08-18) | Artlist Studio | 5 episodes (runtimes n/d) | "iterating through **hundreds of scene concepts**" with image models | n/d | n/d | director Darin Stewart (led all generation), EP Simone Ferretti, Happy Monday Labs (production), Kids Don't Know (post) | **3.5 months** from idea to series. Voice tools failed mid-production: "lost three full days on a three-week deadline." All-nighters and 7-day weeks. | Artlist blog 2026-08-24 | P | H |
| **《困境》 ("Dilemma")** (Beijing Xunzhi Zhonghe Tech, CEO Liu Shuai; Spring Festival 2026) | model not stated for this film (the team used Veo 3 before Seedance 2.0 launched, and Nano Banana for storyboard tweaks) | **7+ min** | **100+ shots selected from 3,000+ generated images** (about 30 images per kept shot, derived) | — | token compute "**only several thousand yuan**" (roughly $300–1,300); traditional would be at least ¥200,000 (~$30k) | **2** (CEO and director) | the Spring Festival holiday | *China Entrepreneur* 2026-04-01 (via 36Kr) | P (quotes) | M |
| **Peng Yuhong's team** (AI live-action short drama, China, 2026) | Jimeng and Xiaoyunque (both Seedance) | 60-episode series | "many shots… **10–20+ draws**… sometimes **dozens** and still not usable" (they then simplify the script) | 10–20+ per hard shot | **¥800 compute for 30 s** of material (about $238 per minute, derived; "not all usable"). **At least ¥300,000 (~$44.7k) production per 60-episode series**, excluding script and IP. | team | "over a week" to polish episode 1 | *China Entrepreneur* 2026-04-01 | P (quotes) | M |
| **Liu Taibao's team** (pseudonym; Hengdian; AI live-action short drama) | Seedance 1.5 Pro and later models | ~100-min series (typical) | **Aug 2025: 10–20 draws per shot → Mar 2026: 1–2** | 1–2 to 10–20 | **¥4,000–5,000 per minute (Nov 2025) → about ¥1,000 per minute (after Dec 2025)**, about $149 per minute. Live-action xianxia: about ¥20,000 per minute. | about **30** | about **1 series per day** | *First Financial* 2026-03-13 | P (quotes) | M |
| **Lingju Animation** (Juding subsidiary, AI manga dramas) | not named | about 100 series per month | — | — | per-minute cost of about ¥15,000 (2024) → ¥1,500 (Mar 2025). **Token fees "nearly ¥1M per month"** (~$149k). Derived: about ¥100 (~$15) per finished minute if about 100 series × about 100 min (the output length assumption is mine). | about **800** staff (from 30 at launch) | — | *First Financial* 2026-03-13 | P (quotes) / derived | M / L |
| **Creator "Li Er Wang"** (Jimeng, April 2026) | Seedance 2.0 | one ~**4-min** video | used about **13,500 of 15,000** monthly credits in **3 days** for that single video. At 120–210 credits per 15-s generation, that is about **64–112 generations**, about **16–28 per finished minute**, R_sec about 4–7 (derived). "A simple shot takes **nearly ten generations**" after the throttling. | ~10 per simple shot | about ¥20 per 15-s generation when buying top-up credits (≈¥1.3/s) | 1 | 3 days | *Beluga Lab* (via NetEase) 2026-04-28 | P (quote) / derived | M / L |

**Brands and programmes with no usable numbers found:** Heinz (only the 2022 image-based "A.I. Ketchup"), Volkswagen (only spec ads and AWS asset pipelines), Channel 4 (its "Smart Ad Engine" gives SMEs free generative TV ads, but without generation counts), Curious Refuge student projects, Google Flow TV and Flow Sessions films, Runway AIF 2026 winners, Kling and Hailuo contest winners, Higgsfield's "GRANDMA vs WASP" (LinkedIn commenters only guess "a billion prompts"), and creator YouTube videos along the lines of "I spent $X on an AI film" (none with verifiable totals). Reddit r/aivideo could not be accessed.

---

## 4. Survey and academic evidence

### 4.1 Surveys (2025–2026)

| Survey | Finding | What it measures | Source (date) | Type | Conf. |
|---|---|---|---|---|---|
| **Adobe 2026 Creators' Toolkit Report** (more than 16,000 creators in the US, UK, FR, DE, KR, JP, IN, AU) | **57%** say creative-AI outputs "typically require **moderate or extensive editing** before they're ready to share." 93% say it is faster. 75% call it integrated or essential. 87% say it grew their business. 49% always or often disclose AI use; 18% rarely or never do. | post-generation editing burden and adoption | news.adobe.com 2026-06-16 | P | H |
| **Artlist AI Trend Report 2026** (6,500+ creators, 140 countries) | 87% use AI tools; 37% use AI to explore concepts faster; 26% cite quicker post-production; 63% focus on commercial rights. **No reroll or cost data.** | adoption | PR Newswire 2025-11-19 | P (vendor) | M |
| **Wistia, AI Video Marketing Trends 2026** (500+ marketers) | 99% have experimented with AI; 51% use it for ideation or scripts; 42% in pre-production; **91% produce more videos** since adopting AI and 37% at 2× or more output. Top success metric: time saved (35%), then engagement (33%), with cost reduction last (22%). | adoption and output | Wistia PDF (2026) | P (vendor) | M |
| **Wistia, State of Video 2026** (13M+ videos, about 1,000 respondents) | "Over one-third of teams already use AI, most commonly in pre-production." In-house production rose from 35% to 55% "with AI tools" (secondary). | adoption | wistia.com; orm-tech summary | P / S | M |
| **Resemble AI** (Meta Ad Library scan) | About **9%** of ads in recent months contain generative AI | market share of AI ads | quoted in BI 2026-09-24 | S | M |
| Curious Refuge, Runway, a16z, Descript, CapCut/Dreamina, MPA, VES, Animation Guild | **No 2025–26 survey with reroll, spend-share, or hours-per-minute data found.** VES turned up only its board survey; MPA, a16z, and Descript were not retrieved. | — | DDG, 2026-09-25 | — | — |

### 4.2 Industry-reported reroll rates and cost per finished minute (mostly Seedance; China)

| Claim | Value | Context | Source (date) | Type | Conf. |
|---|---|---|---|---|---|
| Rerolls fell with Seedance 1.5 Pro and 2.0 | **10–20 → 1–2** draws per shot (Aug 2025 → Mar 2026) | AI live-action short drama | *First Financial* 2026-03-13 (producer quote) | P | M |
| Rerolls rose under load and throttling | **2–3 → 7–8** generations per usable clip | Seedance 2.0 during congestion. The article says ByteDance lowered per-task compute and precision to serve more users at once. | *China Entrepreneur* 2026-04-01 (practitioner quote) | P | M |
| Hard shots | **10–20+** draws, sometimes dozens, before simplifying the script | professional drama team | same source (Peng Yuhong) | P | M |
| Simple shots after throttling | "nearly **10** generations" | solo creator | *Beluga Lab* 2026-04-28 | P | M |
| Earlier-generation tools | "needed to regenerate **dozens of times**" (36Kr) or "**dozens or even hundreds**" (ThePaper) for a few usable seconds | Sora, Runway, Kling, Jimeng before Seedance 2.0 | 36Kr (early 2026); ThePaper (Feb/Mar 2026, citing an NBD test) | S | L–M |
| Compute per usable minute | **about ¥200 (~$30)** for experienced teams; **over ¥500 (~$75)** for teams still learning | "生成一分钟可用视频的算力成本" (compute cost of one usable minute) | *China Entrepreneur* 2026-04-01 (insider) | S | M |
| All-in AI short-drama production | about **¥1,000 per minute** (~$149); a typical drama runs about 100 min | industry | *First Financial* 2026-03-13 | S | M |
| Outsourced low end | **¥400 per minute** (~$60). Some teams auto-produce 800–1,000 min per day of manga drama. | mass production | *China Entrepreneur* 2026-04-01 | S | M |
| Seedance 2.0 API | **¥28** (video input) / **¥46** (no video input) per million tokens. A 15-s clip costs about ¥15 (**≈¥1 per second**, about $0.15/s). About **308,880 tokens per 15-s clip** (about 20.6k tokens per second, derived). | unit cost | *China Entrepreneur*; Tencent Cloud dev article (2026) | S | M |
| Jimeng price path | per 15-s clip: **45 → 120 credits** (Feb–Mar 2026), then VIP no-queue **210**; monthly credits cut from 15,000 to 6,100. Effective ¥0.1/s → at least ¥1.1/s ("**10×** in three months"). | price volatility | *Beluga Lab* 2026-04-28; smzdm (120 vs 45, "+167%") | S | M |
| Queues | about 90,000 in the queue (an NBD test); 7+ hours of waiting; a record 68 h (position 1,900 → 50,000). Teams moved generation to 4–5 am or ran 24-hour shifts. | throughput | ThePaper (NBD); *Beluga Lab*; *China Entrepreneur* | S | M |
| Inference quantization | Seedance 2.0 moved from **FP32 to INT8 or lower** to serve more users; users reported a quality drop | energy per generation vs rerolls | *Beluga Lab* 2026-04-28 | S | L–M |
| Platform guarantees (context) | Hongguo pays manga-drama creators guaranteed minimums of **¥3,000 (A), ¥4,000 (S), and ¥6,000 (S+) per minute**, and up to ¥30,000 per minute for top in-house projects | revenue side | *Beluga Lab* 2026-04-28 | S | M |
| Illustrative | "if you draw **20** times for one satisfying shot, cost = ¥300" (a hypothetical, not a measurement) | — | Tencent Cloud dev community | S | L |

**Western vendor benchmarks** (conflicted sources; use only for ranges):

| Claim | Value | Source (date) | Type | Conf. |
|---|---|---|---|---|
| Cliprise 500-generation benchmark (6 models, Feb 2026, via topvidtools) | "Social-ready" yield **60–85%** (Kling 3.0 Pro 85%, Kling 3.0 Std 72%, Runway Gen-4 Turbo 68%, Sora 2 Std 65%, Hailuo 02 60%), which means **1.2–1.7 generations per usable clip** for simple content. Broadcast bar: Kalshi about 3.75%. "10–29% of generations contain hallucinations" (AdMonsters). | topvidtools.com 2026-04-05 | V / S | L |
| ofox (gateway) | Measured: a 6-s 480p Seedance 2.5 clip billed **$0.66** (103-s latency); a 30-s clip billed $3.30 (200 s). Cites the "2–3 → 7–8" figure (verified above in *China Entrepreneur*). | ofox.ai 2026-08-25 | V | M |
| invideo FAQ | "Only 25% of AI-generated video clips make the final cut"; "plan 3 generations per usable shot" (the two statements are inconsistent) | invideo.io | V | L |
| Seedance 2.5 "Draft mode" | Draft at low resolution, then render 1080p; "cost savings up to 77%" | uied.cn (snippet; fetch failed) | S (snippet) | L |

### 4.3 Academic evidence

| Study | Finding | Relevance | Source | Type | Conf. |
|---|---|---|---|---|---|
| **Xie et al., "A Prompt Log Analysis of Text-to-Image Generation Systems," WWW '23** (Midjourney Discord 145k prompts from 1,665 users; DiffusionDB 2.2M prompts from 10,380 users) | Sessions (30-min timeout) average **10.19 prompts (Midjourney) and 13.71 (DiffusionDB)**, medians **4 and 5**, against web search at about 2.02 (median 1). The median user edits 3–5 terms between consecutive prompts. Some prompts are **repeated by the same user more than 100 times** to exploit randomness. Median prompts per user: 12 and 62. | best large-scale log evidence on iteration per creative goal (images, not video) | arXiv 2303.04587 | P | H |
| **Torricelli, Martino, Baronchelli & Aiello, 2024** (more than 145,000 prompts from Stable Diffusion and Pick-a-Pic) | 63% of Stable Diffusion users change topic more often than not. By contrast, **almost all Pick-a-Pic users (an interface with quick-variant shortcuts) change topic less than once every five prompts, and 26% never do**. Shortcuts reduce exploration and prompt detail, so users iterate on one concept many times. | interface design shapes reroll behaviour | arXiv 2312.00233 | P | H |
| **Vidmento, CHI 2026** (lab study, 12 creators; formative interviews with 8) | Per session, participants generated on average **31 images (4–65) and 8 videos (1–17)**. Formative findings: limited prompt control (7 of 8), slow iteration (6 of 8), style and motion mismatch (5 of 8); one creator called it "**like a slot machine**." | lab counts for hybrid (captured plus generated) video | arXiv 2601.22013; ACM DOI 10.1145/3772318.3791337 | P | H |
| **PrevizWhiz, CHI 2026** (Autodesk; study with filmmakers) | Rough 3D blocking plus 2D video guide generation; "accelerates creative iteration." **No counts retrieved.** | previs workflows | programs.sigchi.org/chi/2026 (abstract) | P | M |
| **Anderson & Niu 2025**, "Making AI-Enhanced Videos" (274 YouTube how-to videos) | Maps GenAI use across planning, production, editing, and upload (scripts in 31%). **No iteration counts.** | use cases | arXiv 2503.03134 | P | H |
| Fable Studio SHOW-1 paper | Names the "**Slot Machine Effect**": generation "feels more like a random game of chance than a deliberate creative process" | qualitative framing | fablestudio.github.io PDF | P | H |
| Park 2026, "Creators' Experiences in Generative AI Video Production" (*Broadcasting & Communication*, Korea) | Qualitative study of how planning, shooting, and editing are reconfigured. **Not retrieved.** | — | doi.org/10.22876/bnc.2026.27.3.004 | — | — |
| VidProM (1.67M prompts) and TIP-I2V (1.70M prompts), from Pika users | **No per-user iteration statistics reported** | — | arXiv 2403.06098, 2411.04709 | P | H |

**Bottom line:** no academic study measures "generations per usable shot" or "hours per finished minute" for video production. The only large-N behavioural data are text-to-image logs (median 4–5 prompts per session, mean 10–14, with each prompt yielding one or more images) and small lab studies. Industry reporting (Hell Grind, the Chinese micro-drama press, Kalshi, Coca-Cola) remains the best evidence for the calculator.

---

## 5. Guild updates (2026)

| Agreement | What changed on AI | Dates | Source | Type | Conf. |
|---|---|---|---|---|---|
| **WGA 2026 MBA** | Keeps all 2023 AI protections (AI is not a writer; AI output is not literary material; no required use; disclosure). Adds to Art. 72.G: (1) each company meets the Guild **at least semi-annually** on request to review its "use and intended use of GAI"; (2) written **notice to the Guild when the company licenses covered literary material to a non-affiliated third party, for compensation, to train "a public-facing commercially available GAI system"**, with a meeting on request to discuss the licence "**including remuneration, if any**." | Term May 2, 2026 to May 1, 2030 | WGA 2026 MOA PDF (item 15, WGA Proposal No. 39); WGA summary and FAQ pages | P | H |
| **SAG-AFTRA 2026 TV/Theatrical** | New §64.1.A "Synthetics" wording for pictures starting principal photography on or after **July 1, 2026**. Producers agree to "**a principle strongly favoring human performances**" and do "not intend to use Synthetics created through a GAI system in a human role that would otherwise be performed by a human except… [where the Producer] reasonably concludes that the Synthetic brings **significant additional value**." In those cases: prior written notice, good-faith bargaining within **10 business days**, and union arbitration of remuneration if there is no deal within 15 business days (20 at most after notice). Any payment goes to the **Health or Pension plan**. This clause expires **June 30, 2030**. | Tentative May 2; MOA signed **May 27**; ratified **June 4–5, 2026** with **91.42%** in favour (19.25% turnout); term **July 1, 2026 to June 30, 2030** | AMPTP-hosted 2026 SAG-AFTRA MOA PDF; ratification figures from GreenSlate, ScenePaper, Likeness Ledger, StreamingMeme | P (MOA) / S (vote) | H / M |
| SAG-AFTRA, other AI terms | (a) A Synthetic built by prompting with a named performer's name and a principal facial feature needs that **performer's consent and bargaining**. (b) **Written notice to the union** when footage or soundtrack is licensed, for compensation, to a non-affiliated third party to **train a public-facing commercial GAI system**, with a meeting on request "including remuneration, if any." (c) Semi-annual GAI meetings, now including bias mitigation and tracking of unauthorized AI performances. (d) Producers need an **"articulable business reason"** to seek consent to scan a performer for a digital replica. (e) For performer contracts from **July 1, 2027**, using a digital replica to render a performer's voice in a foreign language requires **consent (not compensation)**. (f) No use of fingerprint, palm, or iris scans for unrelated purposes; limits on minors' replicas; **no replica use in place of a performer who could lawfully refuse during a strike**; access and security limits. (g) Background-actor digital-replica rules re-dated to July 1, 2026. | same | AMPTP MOA PDF | P | H |
| Context: Cannes 2026 | Festival leaders stated a curatorial exclusion of films "primarily driven by generative AI" from the Competition (not a codified rule) | 2026-04-09 | CineD (Hell Grind article) | S | M |

---

## 6. Gaps remaining

1. **No Artlist Seedance 2.5 winner has disclosed spend, credits, generations, or hours.** The two runtimes (Liza about 40 s from a snippet only; The Last Note 74 s) are the only production facts found. Instagram captions and Reddit threads could not be fetched directly.
2. **Where the $25k figure comes from is still unconfirmed.** I found no statement tying $25k to any Artlist or Seedance entry. The Odysseus link is a strong hypothesis, not a proven source of the user's memory.
3. **Hell Grind's whole-film figures (61,487 generations → 960 shots) are secondary.** Only the first-25-minute figures (16,181 → 253) and $400K compute are primary. The project panel's "115,446 generations" has unknown scope (images, audio, and post-release activity may be included). Seconds per attempt (about 15 s) comes from CineD, not Higgsfield.
4. **The Odysseus $25k excludes Kling-underwritten tokens**, so it is not a generation cost. Its runtime is reported as both 135 and 150 min.
5. **No academic measurement of video R_count or hours per finished minute.** Text-to-image logs and lab sessions are proxies only. Semantic Scholar and OpenAlex were rate-limited (429), so CHI 2025–26 coverage may be incomplete.
6. **Surveys not retrieved:** a16z, Descript, CapCut/Dreamina creator reports, MPA, VES, Animation Guild 2026, and Runway reports. No Curious Refuge survey was found.
7. **Brands with no data:** Heinz (2025–26), Volkswagen, Channel 4 (beyond its free SME service), Kalshi's later agency ads, other Super Bowl LX AI ads (beyond Svedka and Artlist).
8. **The Chinese figures are reported quotes** (mostly anonymous or pseudonymous practitioners). The per-minute compute costs (¥200–500) and the Lingju token-per-minute derivation depend on unverified output volumes. The CNY conversions use a September 2026 rate for March–April figures.
9. **Energy relevance still unquantified:**
   - Moderation-rejected generations (reported as frequent on Jimeng) may or may not consume full compute.
   - Night-time "off-peak" generation shifts timing, and so grid carbon intensity.
   - INT8 quantization lowers energy per generation but may raise rerolls. No source quantifies the net effect.

---

## 7. Sources with URLs

**Artlist, the Seedance challenge, and related**
- https://artlist.io/blog/artlist-250k-seedance-2-5-challenge/ (winners; page dated 2026-08-12)
- https://help.artlist.io/hc/en-us/articles/38321747541661-Artlist-Seedance-2-5-Challenge-250-000-Prize-Pool (rules; fetched 2026-09-25)
- https://www.cined.com/artlist-sold-a-year-of-unlimited-seedance-2-5-for-500-and-delivered-a-week/ (2026-08-14)
- https://www.instagram.com/p/DdB4q8ADVX9/ (Artlist winners post, 2026-09-08; snippet)
- https://www.instagram.com/reel/Dcs4sjENot5/ (Liza, 2026-08-31; snippets)
- https://www.linkedin.com/posts/noa-adar_artlist-250k-seedance-25-challenge-the-activity-7505263008009326592-K6Jz (2026-09-14)
- https://www.linkedin.com/posts/tomhalards_artlist-250k-seedance-25-challenge-the-activity-7503845925640110080-skNP (2026-09-10)
- https://www.linkedin.com/posts/mark-itskowitch_artlist-250k-seedance-25-challenge-the-activity-7503962604848119810-BCvq (2026-09-10)
- https://www.linkedin.com/posts/you-should-see-this_youshouldseethis-thelastnote-aifilm-activity-7501224153161555968-2fKd (2026-09-03)
- https://youshouldseethis.ai/magazine/the-last-note
- https://www.linkedin.com/posts/jonathanboden_we-just-won-the-artlist-studio-challenge-activity-7493965946982707200-f4Xn (2026-08-14)
- https://artlist.io/blog/the-arc-ai-series-london-premiere/ (2026-08-24)
- https://www.ynet.co.il/digital/technews/article/skjqak4xml (2026-05-27; $5,000 Super Bowl ad) and https://www.ynet.co.il/yedioth/article/yokra14777944
- https://www.prnewswire.com/news-releases/artlist-releases-its-ai-trend-report-2026-ai-broke-the-rules-heres-whats-next-302619955.html (2025-11-19)
- https://www.calcalist.co.il/calcalistech/article/hjnph6rwme ; https://www.globes.co.il/news/article.aspx?did=1001546041 (Artlist layoffs, context)

**Odysseus: The Fall and Fountain 0**
- https://www.hollywoodreporter.com/business/digital/ai-generated-feature-odysseus-the-fall-1236646751/ (2026-07-14)
- https://variety.com/2026/film/news/ai-generated-odyssey-film-fountain-0-dreams-of-violets-1236810051/ (2026-07-14)
- https://www.syfy.com/syfy-wire/odysseus-the-fall-creators-on-making-ai-generated-movie-in-just-months (2026-07-22)
- https://www.prnewswire.com/news-releases/fountain-0-announces-the-release-of-odysseus-the-fall-on-wednesday-september-16-the-first-completely-ai-generated-film-produced-at-the-level-of-a-big-budget-hollywood-movie-302880609.html (2026-09-16)
- https://www.foxbusiness.com/video/6405111746112 (2026-09-15)
- https://www.theverge.com/entertainment/996499/ai-odyssey-movie-review (2026-09-16)
- https://www.theverge.com/entertainment/965616/ash-koosha-odysseus-the-fall-foundtain-zero-tilly-norwood (2026-07-15)
- https://studio.aifilms.ai/blog/ash-koosha-odysseus-fall-fountain-0-ai-film (2026-07-14)
- https://www.instagram.com/reel/DdWBRheBRXP/ and https://www.instagram.com/reel/DdVZZxmPewz/ (2026-09-15; snippets)

**Hell Grind and Higgsfield**
- https://x.com/higgsfield/status/2057185280940261720 (2026-05-20; primary numbers)
- https://x.com/higgsfield/status/2084702370764820572 (2026-08-04; open-sourcing)
- https://higgsfield.ai/@higgsfield.studio/projects/hell-grind (project page; fetched 2026-09-25)
- https://www.cined.com/hell-grind-the-95-minute-ai-feature-cannes-2026-says-it-never-screened/
- https://cryptobriefing.com/higgsfield-ai-hell-grind-cannes-film/ (2026-05-26)
- https://www.bottlerocketcontent.com/higgsfield-hell-grind-open-source/ (2026-08-06)
- https://book.st-hakky.com/en/news/higgsfield-ai-film-14-days (2026-08-05)
- https://forward.themoonunit.com/hell-grind-isnt-cannes-its-a-warning-shot/ (2026-06-07)
- https://www.youtube.com/watch?v=lCZMMo6B_uo (analysis video: "61,487 tries, 960 kept"; snippet)
- https://www.thewrap.com/creative-content/movies/create-ai-movies-for-free-higgsfield-academy/ (2026-08-17)
- https://www.prnewswire.com/news-releases/the-largest-ai-film-competition-highlights-emerging-trends-in-global-ai-filmmaking-302717810.html (2026-03-18)

**Brand ads**
- https://futurism.com/artificial-intelligence/mcdonalds-ai-generated-commercial (2025-12-09)
- https://comfy.org/customers/svedka-silverside ; https://www.silverside.ai/projects/svedka-super-bowl
- https://www.hollywoodreporter.com/business/digital/svedka-super-bowl-ad-ai-watch-1236493612/ (2026-02-03)
- https://runway.com/customers/how-tool-is-reimagining-the-commercial-production-process-with-runway (2024-02-29)
- https://www.commarts.com/exhibit/under-armour-forever-is-made-now-campaign (2024-05-01)
- https://www.enrichlabs.ai/newsletter/how-ai-generated-5m-in-earned-media-inside-puma-s-eus-bio-campaign (2026-02-06)
- https://www.genre.ai/worlds-gone-mad (Kalshi)
- https://www.businessinsider.com/kalshi-in-hot-water-over-race-swapping-ai-ads-2026-9 (2026-09-24)
- https://adage.com/brand-marketing/aa-why-kalshi-droppe-generative-ai/ (title only; 403)
- https://www.8frame.co/blog/best-ai-ads-2026 (2026-07-30; roundup)
- https://www.channel4sales.com/SmartAdEngine (context)

**Chinese industry reporting**
- https://www.163.com/dy/article/KNU3AU6R0519DDQ2.html (*First Financial*, 2026-03-13)
- https://www.36kr.com/p/3747480996053507 (*China Entrepreneur*, 2026-04-01)
- https://www.163.com/dy/article/KRJF1HQV0556CUWO.html (*Beluga Lab*, 2026-04-28; also news.qq.com/rain/a/20260428A02EYJ00)
- https://www.thepaper.cn/newsDetail_forward_32721447 (citing an NBD test)
- https://www.36kr.com/p/3678229676041093 ; https://www.36kr.com/p/3676072215163399
- https://cloud.tencent.com/developer/article/2674291
- https://post.smzdm.com/p/a5rv5dnk/ (credits 45 → 120; snippet)
- https://www.uied.cn/posts/921910 (Seedance 2.5 Draft mode; snippet only)

**Contests**
- https://www.instagram.com/p/Dbdl61BJ5Ce/ (CapCut Wave 1, 2026-07-31; snippet) ; https://capcutaichallenge.com/ (Wave 2)
- https://x.com/Kling_ai/status/2077382388405993869 (2026-07-15)
- https://aivideoadvisor.com/runway-ai-film-festival-2026-just-wrapped-inside-the-0k-grand-prix-and-what-creators-should-take-away/ (2026-08-11)
- https://blog.google/innovation-and-ai/models-and-research/google-labs/google-flow-sessions-short-films/ (2026-07-30)
- https://aifilmcontests.com/topics/curious-refuge-ai-film-competitions-2026

**Surveys and vendor benchmarks**
- https://news.adobe.com/news/2026/06/creators-toolkit-report-2026 (2026-06-16)
- https://assets.ctfassets.net/j7pfe8y48ry3/52tUrnNMkkSs13oAaliBZk/677770b0b75fd170ea816084a5d64a9a/Wistia_AI_Video_Marketing_Trends_for_2026.pdf
- https://wistia.com/explore/state-of-video-report
- https://topvidtools.com/ai-video-real-cost-yield-rate/ (2026-04-05)
- https://ofox.ai/blog/ai-video-generation-api-cost-per-usable-clip-2026/ (2026-08-25)
- https://invideo.io/faq/what-percentage-of-ai-generated-video-clips-are-actually/

**Academic**
- https://arxiv.org/abs/2303.04587 (Xie et al., WWW '23)
- https://arxiv.org/abs/2312.00233 (Torricelli et al., 2024)
- https://arxiv.org/abs/2601.22013 ; https://dl.acm.org/doi/10.1145/3772318.3791337 (Vidmento, CHI 2026)
- https://programs.sigchi.org/chi/2026/program/content/222835 (PrevizWhiz, CHI 2026)
- https://arxiv.org/abs/2503.03134 (Anderson & Niu, 2025)
- https://fablestudio.github.io/showrunner-agents/static/pdfs/To_Infinity_and_Beyond_SHOW-1_And_Showrunner_Agents_in_Multi_Agent_Simulations_v2.pdf
- https://arxiv.org/abs/2403.06098 (VidProM) ; https://arxiv.org/abs/2411.04709 (TIP-I2V)
- https://doi.org/10.22876/bnc.2026.27.3.004 (Park 2026; not retrieved)

**Guilds**
- https://www.wga.org/uploadedfiles/contracts/2026_mba_moa.pdf (2026 MOA; AI in item 15)
- https://www.wga.org/contracts/contracts/mba/summary-of-the-2026-wga-mba ; https://www.wga.org/contracts/contracts/mba/2026-mba-contract-changes-faq
- https://www.wga.org/contracts/know-your-rights/artificial-intelligence
- https://amptp.org/wp-content/themes/amptp/assets/pdf/SAG-AFTRA/2026%20SAG-AFTRA%20Memorandum%20of%20Agreement%20FULLY%20EXECUTED%202026-05-27.pdf (§64, §64.1, Schedule X §72)
- https://greenslate.com/blog/sag-aftra-tv-theatrical-agreement ; https://scenepaper.com/blog/sag-aftra-ai-contract-2026 ; https://thelikenessledger.substack.com/p/sag-aftras-2026-tvtheatrical-agreement ; https://www.streamingmeme.com/articles/sag-aftra-members-ratify-2026-contract-with-91percent-approval-and-ai-limits (ratification figures)

**Exchange rate**
- https://api.frankfurter.dev/v1/latest?base=USD&symbols=CNY (¥6.7126 per US$, 2026-09-24)

**Local copies** (in `scratchpad/research/C2/`): artlist_help_challenge.txt, cined.html, sag_2026_moa.pdf/.txt, wga_2026_moa.pdf/.txt, wistia_ai_2026.pdf/.txt, kr_jam.txt (*China Entrepreneur*), cn_fupan.txt (*Beluga Lab*), cn_a3441ece.txt (*First Financial*), hg_project.html (Higgsfield project page), and papers/*.txt.
