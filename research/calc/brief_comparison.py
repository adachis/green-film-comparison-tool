"""Revised consolidated numbers after A1b (Seedance 2.5 720p GPU-only 18 Wh/s; H3 768p 7 Wh/s; H3 2K x1.5)."""
ALPHA = 0.7
PX720 = 1280*720
def res_factor(px): return (px/PX720) ** ALPHA
MODELS = {
  # name: (GPU Wh/s, grid kg/kWh, PUE, WUE on-site, WUE off-site, $/s)
  "Seedance 2.5 480p":  (18*res_factor(854*480),  0.602, 1.3, 0.50, 1.7, 0.103),
  "Seedance 2.5 720p":  (18.0,                    0.602, 1.3, 0.50, 1.7, 0.231),
  "Seedance 2.5 1080p": (18*res_factor(1920*1080), 0.602, 1.3, 0.50, 1.7, 0.569),
  "MiniMax H3 768p":    (7.0,  0.530, 1.3, 0.57, 3.0, 0.08),
  "MiniMax H3 2K":      (10.5, 0.530, 1.3, 0.57, 3.0, 0.13),
}
FAC, EMB, GPUKW, TRAIN = 1.72, 0.03, 0.63, 0.05
def per_s(m):
    g, grid, pue, won, woff, usd = MODELS[m]
    kwh = g * FAC / 1000
    co2 = (kwh * grid + g / 1000 / GPUKW * EMB) * (1 + TRAIN)
    water = kwh / pue * (won + pue * woff)
    return g, kwh, co2, water, usd
for m in MODELS:
    g, k, c, w, u = per_s(m)
    print(f"{m:20s} GPU {g:5.1f} | fac {k*1000:5.1f} Wh | {c*1000:5.1f} g | {w*1000:4.0f} mL | ${u:.3f}  (= {c/0.16725*1000:.0f} m driving)")

M = "Seedance 2.5 720p"
_, k, c, w, u = per_s(M)
print(f"\nScenario table ({M}; typical takes / high takes):")
rows = [
 ("30 s commercial", 30*80, 30*500, 0.75, "0.75 t median ad shoot"),
 ("3.5 min music video", 210*40, 210*100, 1.15, "~1.15 t 2-day local shoot"),
 ("10 min short film", 600*30, 600*160, 8.0, "8 t French short-film average"),
 ("50 min TV drama episode", 3000*30, 3000*160, 128.6, "129 t US benchmark"),
 ("100 min indie feature (192 t)", 6000*30, 6000*160, 192.0, "EU average"),
 ("100 min indie feature (375 t)", 6000*30, 6000*160, 375.0, "US small feature"),
 ("5 s VFX shot in a feature", 5*30, 5*100, 1.5*0.35, "~0.5 t render+facility (1.5 MWh @0.35)"),
 ("5 s bus explosion", 5*30, 5*100, 2.1, "~2.1 t extra day, bus not counted"),
 ("3 establishing shots abroad", 15*10, 15*50, 15.9, "15.9 t trip"),
 ("Aerial day 5 shots", 25*5, 25*20, 2.9, "2.9 t helicopter day"),
 ("500 extras x1 day (3 shots)", 15*10, 15*30, 5.0, "5 t crowd day"),
 ("2 min dialogue existing set", 120*30, 120*300, 0.105, "~105 kg extra lighting"),
]
for name, gt, gh, conv, lab in rows:
    at, ah = gt*c, gh*c
    print(f"{name:32s} AI {at:9.1f} - {ah:9.1f} kg | water {gt*w:7.0f}-{gh*w:7.0f} L | gen$ {gt*u:9,.0f}-{gh*u:9,.0f} | conv {conv*1000:9.0f} kg | ratio {conv*1000/at:7.1f}x .. {conv*1000/ah:6.1f}x | {lab}")

# Coca-Cola bracket
for label, mm in (("720p", "Seedance 2.5 720p"), ("1080p", "Seedance 2.5 1080p")):
    _, k2, c2, w2, u2 = per_s(mm)
    for clip in (5, 8):
        print(f"Coca-Cola 70,000 x {clip}s at Seedance 2.5 {label}: {70000*clip*c2/1000:.1f} t, {70000*clip*k2/1000:.1f} MWh")
