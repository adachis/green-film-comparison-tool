# L. Where the Avatar sequels' power came from

Research date: 2026-09-25.  This stream checks two things that change how the *Avatar* rendering figures in streams D and D2 should be read: where Wētā FX's cloud rendering for *Avatar: The Way of Water* physically ran, and how Lightstorm powered the sequels' own stages.  Source numbers in square brackets refer to the list at the end.  **P** marks a primary source and **S** a secondary one.

## Findings

1. **The cloud rendering for *The Way of Water* ran in Australia, not New Zealand.**  Wētā FX is in Wellington, but New Zealand had no AWS region in 2021–22.  The Spinoff, reporting from Wētā on a trip funded by AWS: "Soon, they'd used all of Australia's data capacity, and had Singapore on standby, at one point making daily phone calls to ensure its demands could be met" [1] (S, H).  Data Center Dynamics reports that Wētā used capacity across three Australian AWS data centers and that AWS planned its first New Zealand region for 2024 [2] (S; the page returned 403, so this is from its search summary; M).
2. **Nobody publishes the split between AWS and Wētā's own farm.**  AWS says "the team ran 3.3 billion thread hours on AWS in the following eight months" [3] (P).  Wētā's own Miramar data center, on New Zealand's grid, did the rest.  The "more than 40 percent" that appears in coverage of the film is the share shown at 48 frames per second, not the cloud share; stream G's note has been corrected.
3. **The two grids differ by more than five times.**  87% of New Zealand's electricity came from renewable sources in 2022 [4] (P, H).  Stream D2 uses Ember lifecycle intensities of 0.578 kg CO2e per kWh for Australia and 0.103 for New Zealand in 2022.  On those factors, the AWS portion (8.3 / 18.2 / 28.1 GWh, stream D2) comes to **4,770 / 10,490 / 16,210 t** location-based on Australia's grid, against **850 / 1,870 / 2,890 t** had it run on New Zealand's (DERIVED in D2).
4. **Amazon's renewable purchases change the market-based figure, not the physical one.**  Amazon reports that renewable energy matched 90% of the electricity used across its operations in 2022, and 100% in 2023 [5] (P).  Under market-based accounting that would shrink the rendering's footprint considerably, but the servers drew from Australia's grid.  The site shows the location-based range and mentions the market-based claim.
5. **Lightstorm ran the sequels' stages on its own solar power.**  Stellar Energy completed a 960 kW rooftop array of 3,692 modules for Lightstorm at the MBS Media Campus in Manhattan Beach in September 2012 [6, 7] (P/S).  James Cameron at the time: "Going into Avatar 2 and 3, we are going to be able produce enough solar energy to handle the entire electrical demand for our computers and performance capture systems here at MBS Media Campus" [7].  Suzy Amis Cameron, speaking to the Academy in December 2022: "The whole production — two sound stages — was completely powered by solar power," and the production served 55,000 plant-based meals [8] (S, M).  Stellar also said the array would offset "over 1,034 metric tons of carbon dioxide," without stating over what period [7].
6. **No source found for a net surplus.**  The documented claim is that solar covered the stages' own demand.  We found no statement that the production generated more than it used, so the site says the stages ran "entirely" on solar and does not describe the production as energy-negative.
7. ***Fire and Ash*'s render location is not stated.**  Wētā reports 1,248,087,308 render-hours on AMD EPYC servers for *Avatar: Fire and Ash* (stream D2), but the sources checked [9, 10] don't say whether any of it ran in the cloud, so the site draws no grid conclusion for that film.

## How the site uses this

- Method, conventional production: the Australian and New Zealand ranges, the 87% renewable share, Amazon's 90% claim, and Lightstorm's solar stages and plant-based catering.
- Scenes, creature or disaster shot: the same render emits about a quarter as much on New Zealand's grid (0.103–0.112) as on the US grid (0.384).
- Access: the rendering example supports the point that the energy supply matters more than any one production choice.

## Sources

1. The Spinoff, Chris Schultz, "'Like seeing the first images from the moon': How Wētā gave Avatar 2 its visual wow factor" (8 December 2022).  https://thespinoff.co.nz/business/08-12-2022/like-seeing-the-first-images-from-the-moon-how-weta-gave-avatar-2-its-visual-wow-factor
2. Data Center Dynamics, "Avatar: The Way of Water was rendered in Amazon Web Services."  https://www.datacenterdynamics.com/en/news/avatar-the-way-of-water-was-rendered-in-amazon-web-services/
3. AWS for M&E Blog, "'Avatar: The Way of Water' and the future of filmmaking" (28 February 2023).  https://aws.amazon.com/blogs/media/avatar-the-way-of-water-and-the-future-of-filmmaking/
4. Ministry of Business, Innovation and Employment, "Energy in New Zealand 2023 shows renewable electricity generation increased to 87%."  https://www.mbie.govt.nz/about/news/energy-in-new-zealand-2023-shows-renewable-electricity-generation-increased-to-87-percent
5. Amazon, 2022 Sustainability Report executive summary.  https://sustainability.aboutamazon.com/2022-sustainability-executive-summary.pdf
6. Solar Builder, "Stellar Energy Installs 960-kW System for James Cameron's Film Company" (2012).  https://solarbuildermag.com/news/stellar-energy-installs-960-kw-system-for-james-camerons-film-company/
7. The Christian Science Monitor, "James Cameron's 'Avatar' films run on clean energy" (10 October 2012).  https://www.csmonitor.com/Environment/Energy-Voices/2012/1010/James-Cameron-s-Avatar-films-run-on-clean-energy
8. Academy of Motion Picture Arts and Sciences, "The Inside Story of How 'Avatar: The Way of Water' Became One of the Greenest Sets Ever" (30 December 2022).  https://newsletter.oscars.org/news/post/avatar-the-way-of-wayer-suzy-amis-cameron-interview
9. fxguide, "From capture to compute: the technology powering Avatar: Fire and Ash."  https://www.fxguide.com/fxfeatured/from-capture-to-compute-the-technology-powering-avatar-fire-and-ash/
10. befores & afters, "Powering a VFX Oscar winner" (24 March 2026).  https://beforesandafters.com/2026/03/24/powering-a-vfx-oscar-winner/
