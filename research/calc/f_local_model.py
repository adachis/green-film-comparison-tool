# Energy per asset and optimized-workflow model (stream F). All derivations documented in F_local_and_guided.md
def wh(t_s, p_w): return t_s*p_w/3600

print("=== LOCAL ENERGY PER ASSET (Wh) ===")
P16=(90,110,130)   # MBP16 M4 Max wall W under sustained GPU diffusion (low, central, high)
P4090=(420,480,520) # 4090 desktop wall W (GPU 290-400 + rest 120)
P5090=(600,650,725)
rows = [
 # name, device, t_low, t_c, t_high, power tuple
 ("FLUX.1 schnell 4-step 1024^2","M4Max16",23,24.5,26,P16),
 ("FLUX.1 dev 20-step 1024^2","M4Max16",85,100,120,P16),
 ("Z-Image Turbo 8-step 1024^2","M4Max16",31,35,40,P16),
 ("FLUX.2 klein 4B 4-step 1024^2","M4Max16",10.5,11,12,P16),
 ("SD3.5 Large Turbo 4-step 1024^2","M4Max16",13.5,14.5,15.3,P16),
 ("Qwen-Image+Lightning 4-step","M4Max16",34.5,37,39,P16),
 ("HiDream I1 dev 28-step","M4Max16",153,163,173,P16),
 ("Qwen-Image-2512 30-step CFG","M4Max16",305,325,345,P16),
 ("FLUX.2 dev 28-step","M4Max16",490,520,555,P16),
 ("FLUX.1 dev FP8 20-step 1024^2","RTX4090",9.1,10,11.3,P4090),
 ("FLUX.1 dev FP8 20-step 1024^2","RTX5090",8.0,8.5,8.8,P5090),
 ("Z-Image Turbo 8-step (secondary 2-3 s)","RTX4090",2,2.5,3,P4090),
 ("LTX-2.3 22B distilled 1280x768x121 (5 s)","M4Max16",245,300,410,P16),
 ("LTX-2.3 22B distilled 1280x768x121 (5 s)","M5Max",96,110,123,(110,120,130)),
 ("Wan2.2 A14B+Lightning 6-step 448x768x81 (5 s)","M4Max16",600,640,680,P16),
 ("Wan2.2 TI2V-5B 720p 121f (5 s)","RTX4090",525,530,535,(450,490,520)),
 ("Wan2.1 1.3B 480p 81f (5 s)","RTX4090",261,261,261,(450,490,520)),
 ("HunyuanVideo-1.5 480p I2V step-distilled","RTX4090",75,75,75,(450,490,520)),
 ("Kokoro-82M 1 min speech (RTF 0.01-0.05, est.)","M4Max16",0.6,1.5,3,(60,90,110)),
 ("F5-TTS MLX 1 min speech (RTF~0.7 on M3 Max)","M4Max16",36,42,45,P16),
 ("Dia 1.6B 1 min speech (RTF 0.48-0.67)","RTX4090",29,34,40,P4090),
 ("IndexTTS2.5 1 min speech (RTF 0.2)","RTX4090",12,12.4,13,P4090),
 ("ACE-Step v1 1 min music 27 steps (M2Max 26.4 s x0.6-0.7)","M4Max16",16,17,18.5,P16),
 ("ACE-Step v1 1 min music 27 steps","RTX4090",1.74,1.74,1.74,P4090),
 ("ACE-Step v1 1 min music 60 steps","RTX4090",3.84,3.84,3.84,P4090),
 ("Upscale 5 s to 1080p, fast upscaler 5-20 fps (est.)","M4Max16",6,12,24,P16),
]
for n,d,a,b,c,P in rows:
    print(f"{n:52s} {d:8s} t={a}-{c}s (c {b}) -> {wh(a,P[0]):6.2f} / {wh(b,P[1]):6.2f} / {wh(c,P[2]):6.2f} Wh")

print("\n=== CLOUD REFERENCE ===")
print("FLUX.1 dev 20 steps H100 GPU-only:", round(2.208*20/50,3), "Wh; facility x1.3-1.6:", round(2.208*20/50*1.3,2), "-", round(2.208*20/50*1.6,2))
for fac in (1.3,1.6):
    print(" Krea Realtime 14B per session-minute on B200 (0.83-1.0 kW GPU) x facility",fac,":", round(0.83*60/60*1000/60*fac,1), "-", round(1.0*1000/60*fac,1),"Wh")
print(" Krea Realtime per 5 s of output (120 frames @11 fps = 10.9 s GPU):", round(0.83*1000*10.9/3600,2),"-",round(1.0*1000*10.9/3600,2),"Wh GPU-only")
print(" SeedVR2-3B 5 s 1080p on H100-class (645 s x 700 W):", round(wh(645,700),0), "Wh GPU-only")
print(" FlashVSR 5 s at 768x1408 on A100 (7.1 s x 400 W):", round(wh(120/17,400),2), "Wh GPU-only")

print("\n=== EMBODIED AMORTIZATION ===")
for name,total,use_share,use_abs in [("MBP14 M4 Max 1TB",248,0.20,43.6),("MBP16 M4 Max 1TB",303,0.25,69.75)]:
    emb1=total*(1-use_share); emb2=total-use_abs
    for hours,label in [(4*2000,"4 yr x 2000 h"),(6*2000,"6 yr x 2000 h"),(4*1000,"4 yr x 1000 gen-h (dedicated)")]:
        print(f"{name}: embodied {emb1:.0f}-{emb2:.0f} kg -> {label}: {emb1/hours*1000:.1f}-{emb2/hours*1000:.1f} g/h")
for grid,ef in [("LADWP avg 2024",0.229),("CA avg",0.163),("marginal gas avg (EIA)",0.410),("gas CC lifecycle median (IPCC)",0.49),("rooftop PV lifecycle (IPCC median)",0.041)]:
    print(f"operational at 110 W for 1 h, {grid}: {0.11*ef*1000:.1f} g/h; 4090 box 480 W: {0.48*ef*1000:.0f} g/h")
