"""A1b: convert public latency data to GPU-only energy per output second (Jegham et al. 2026 method).
E_GPU = N_GPU * 0.9 * TDP * latency ;  Wh per output second = E / output_duration.
All latencies are wall-clock API figures unless marked DiT (fal timings.inference = DiT denoise only)."""
HW = {  # node GPU power at 0.9 x TDP, in W
    '8xH800 (5.6 kW TDP)': 8*700*0.9,
    '8xB200 (8.0 kW TDP)': 8*1000*0.9,
    '8xH20  (3.2 kW TDP)': 8*400*0.9,
    '8xL20  (2.2 kW TDP)': 8*275*0.9,
}
rows = [
 # label, latency_s, output_s, note
 ('Seedance 2.5  720p 8s  OR benchmark min (n=11)', 136.534, 8.04, 'min of 11; median 255.5 s'),
 ('Seedance 2.5  720p 5s  OR playground example', 119.198, 5.04, 'single run, 2026-08-09'),
 ('Seedance 2.5  720p 5s  WaveSpeed I2V example', 143.250, 5.04, 'single run, 2026-09-24'),
 ('Seedance 2.5  720p 5s  WaveSpeed T2V example', 187.654, 5.04, 'single run, 2026-09-18'),
 ('Seedance 2.5  720p 5s  Replicate example', 220.3, 5.04, 'launch day 2026-08-07'),
 ('Seedance 2.0  720p 5s  OR example', 80.4, 5.04, '2026-08-01'),
 ('Seedance 2.0  720p 8s  Replicate', 112.9, 8.04, '2026-04-08'),
 ('Seedance 2.0  720p 8s  OR benchmark min (n=11)', 138.7, 8.04, 'median 166.8 s'),
 ('Seedance 2.0 Fast 720p 5s Replicate min (n=3)', 65.9, 5.04, '2026-04-08'),
 ('Seedance 2.0 Fast ~720p 8s Replicate (21:9)', 95.9, 8.04, '2026-04-08'),
 ('Seedance 2.0 Fast 720p 8s OR benchmark min', 134.6, 8.04, 'median 140.0 s'),
 ('Seedance 2.0 mini 720p 8s OR benchmark min', 105.6, 8.04, 'median 135.9 s'),
 ('Seedance 1.5 Pro 720p 8s OR benchmark min', 104.0, 8.04, 'calibration vs Jegham'),
 ('Seedance 1.5 Pro 720p 8s Jegham (implied)', 102.1/5.04*3600/1000, 8.04, '102.1 Wh / 5.04 kW'),
 ('Seedance 1.5 Pro 720p 5s Replicate', 55.0, 5.04, '2025-12-23'),
 ('Seedance 1.5 Pro 720p 5s Jegham (implied)', 64.6/5.04*3600/1000, 5.04, '64.6 Wh / 5.04 kW'),
 ('Seedance 1.0 Pro 1080p 5s Replicate', 50.5, 5.04, '2025-06-24; paper: 41.4 s on L20'),
 ('MiniMax H3 official 768p 5s (via WaveSpeed)', 141.555, 5.0, '2026-09-24'),
 ('MiniMax H3 official 2K 5s (OR example)', 162.0, 5.0, '2026-08-03'),
 ('MiniMax H3 official 2K 8s OR benchmark min', 264.2, 8.0, 'median 295.1 s'),
 ('MiniMax H3 open weights 480p 5s (WaveSpeed infra)', 20.993, 5.0, 'GPU type/count unknown'),
 ('MiniMax H3 Max 768p 5s OR example (e2e, via MiniMax)', 12.4, 5.0, '2026-09-02'),
]
print(f"{'case':55s} {'lat s':>7s} {'lat/out-s':>9s} " + ' '.join(f"{k.split()[0]:>7s}" for k in HW))
for label, lat, out, note in rows:
    r = lat/out
    vals = [r*P/3600 for P in HW.values()]
    print(f"{label:55s} {lat:7.1f} {r:9.2f} " + ' '.join(f"{v:7.1f}" for v in vals) + f"   {note}")

print("\nH3 Max on fal (GB200 NVL72; DiT denoise only, timings.inference = 2.53 s for 5 s 768p):")
for n in (4, 8, 16):
    P = n*1200*0.9
    e = P*2.5286/3600
    print(f"  N={n:2d} GB200 @1.2 kW x0.9: DiT {e:5.2f} Wh/clip -> {e/5:4.2f} Wh/s ; with +40% non-DiT -> {1.4*e/5:4.2f} Wh/s")

print("\nSGLang H3 physical anchors (first pass): 4xH200 74.38 s for 5.167 s ->", round(4*630*74.38/3600/5.167,2), "Wh/s; 8xB300 19.04 s ->", round(8*1100*0.9*19.04/3600/5.167,2), "Wh/s")
print("H3 official 768p 5 s latency if served on 2xH200 (throughput-optimized):", round(2*630*141.555/3600/5.0,2), "Wh/s")

# Same-channel ratio method: Seedance 2.x vs 1.5 on OR benchmark (8 s 720p, min), applied to Jegham's 1.5 estimate
jeg15_8s = 102.1  # Wh, 8 s 720p, 8xH800 assumption
for lab, t in (('2.5',136.534),('2.0',138.7),('2.0 Fast',134.6),('2.0 mini',105.6)):
    ratio = t/104.0
    print(f"ratio method {lab}: {ratio:.2f} x Jegham 1.5 -> {jeg15_8s*ratio/8.04:.1f} Wh/s (H800 basis); L20 basis {jeg15_8s*ratio/8.04*1980/5040:.1f}; H20 {jeg15_8s*ratio/8.04*2880/5040:.1f}; B200 {jeg15_8s*ratio/8.04*7200/5040:.1f}")

# Price / margin cross-check (hardware-agnostic): energy = price * cost_share * gpu_share * Wh_per_$
print("\nPrice/margin cross-check (GPU-only Wh per output second):")
cases = {'Seedance 2.5 720p ($0.2311/s)':0.2311, 'Seedance 2.0 720p ($0.152/s)':0.152, 'MiniMax H3 768p ($0.08/s)':0.08}
for lab, price in cases.items():
    for gm, gshare in ((0.70,1.0),(0.70,0.7),(0.90,1.0)):
        for whd in (250, 350, 470):
            pass
    lo = price*(1-0.90)*0.7*250; mid = price*(1-0.70)*0.85*350; hi = price*(1-0.70)*1.0*470
    print(f"  {lab}: low {lo:.1f} (90% GM, 70% GPU share, 250 Wh/$) | central {mid:.1f} (70% GM, 85% GPU share, 350 Wh/$) | high {hi:.1f} (70% GM, 100%, 470 Wh/$)")
# Wh per $ of GPU cost for assumed TCO/rental rates
for g, w, rate in (('H100/H800', 700, (1.3, 2.5)), ('B200', 1000, (2.0, 3.5)), ('H20', 400, (0.7, 1.2)), ('L20', 275, (0.4, 0.7))):
    print(f"  {g}: {0.9*w/rate[1]:.0f}-{0.9*w/rate[0]:.0f} Wh per $ at ${rate[0]}-{rate[1]}/GPU-h (assumed)")
