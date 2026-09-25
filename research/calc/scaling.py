# 1) Evaluate Jegham et al. (2026) fitted GPU-energy formulas: E[Wh] = S*(N1*T^2 + M*T) + G, T = H*W*F/1000
coef = {  # (N1, M, G)
 ('Wan2.2','H200x1'):(5.48e-10,1.67e-05,1.85), ('Wan2.2','B200x1'):(3.33e-10,1.32e-05,1.07), ('Wan2.2','H200x8'):(5.36e-10,2.32e-05,12.93),
 ('Wan2.1','H200x1'):(5.42e-10,1.64e-05,2.29), ('Wan2.1','B200x1'):(3.31e-10,1.31e-05,0.94),
 ('HV1.5','H200x1'):(2.82e-10,8.29e-06,0.0), ('HV1.5','B200x1'):(1.88e-10,4.46e-06,2.25), ('HV1.5','H200x8'):(3.00e-10,1.05e-05,18.61),
}
fps={'Wan2.2':16,'Wan2.1':16,'HV1.5':24}
res={'480p':(480,854),'720p':(720,1280),'1080p':(1080,1920)}
S=40
print("Jegham-coefficient GPU energy (Wh per clip) and Wh per output second, S=40 steps")
for (m,hw),(N1,M,G) in coef.items():
    out=[]
    for dur in (5,10):
        F=dur*fps[m]+1
        for r,(h,w) in res.items():
            T=h*w*F/1000
            E=S*(N1*T*T+M*T)+G
            out.append(f"{r} {dur}s: {E:7.1f} Wh ({E/dur:5.1f}/s)")
    print(f"{m:6s} {hw:7s} | " + " | ".join(out))
# check: paper's quoted numbers
T=720*1280*81/1000; print("check Wan2.1 B200 5s(81fr) 720p:", 40*(3.31e-10*T*T+1.31e-5*T)+0.94)
T=720*1280*81/1000; print("check HV1.5 B200 81fr 720p:", 40*(1.88e-10*T*T+4.46e-6*T)+2.25, " (paper quotes 57.5 Wh as '5-second')")
T=720*1280*121/1000; print("check HV1.5 H200x1 121fr 720p:", 40*(2.82e-10*T*T+8.29e-6*T), " (paper quotes 177)")
T=720*1280*121/1000; print("check HV1.5 H200x8 121fr 720p:", 40*(3.0e-10*T*T+1.05e-5*T)+18.61, " (paper quotes 213-215)")
# LTX-2 audio overhead check (H200): E = N1*T^2*S + N2*T^2 + M*T*S + G
for S2 in (40,8):
    T=720*1280*121/1000
    v=4.56e-13*T*T*S2+1.83e-11*T*T+6.47e-7*T*S2+0.56
    va=4.56e-13*T*T*S2+1.83e-11*T*T+7.79e-7*T*S2+1.00
    print(f"LTX-2 H200 720p 121fr S={S2}: T2V {v:.2f} Wh, T2VA {va:.2f} Wh, audio overhead {va/v-1:+.0%}")

# 2) MiniMax H3 analytic FLOPs (per forward; CFG-distilled => 1 forward/step)
L=50; d_attn=56*128; lin_params=L*(4*5376*7168 + 3*5376*14336)   # ~19.3B compute params (AdaLN excluded)
print(f"\nH3 compute params (attn+FFN): {lin_params/1e9:.1f}B")
def h3_rows(h,w,frames,other=1200):
    n=(frames-5)//17; lat=5*n+2           # latent frames per diffusers note (17n+5 frames -> 5n+2 latents)
    return lat*(h//32)*(w//32)+other
def h3_flops(rows, sparsity=0.0):
    lin=2*lin_params*rows
    att=4*L*rows*rows*d_attn*(1-sparsity)
    return lin,att
base=h3_rows(768,1344,124); bl,ba=h3_flops(base)
print(f"768p 5s rows={base}, linear {bl:.2e}, attn {ba:.2e}, total/fwd {bl+ba:.2e}; x50 = {(bl+ba)*50:.2e} FLOPs")
print(f"implied MFU on 4xH200 in 71.73 s denoise: {(bl+ba)*50/71.73/4/989e12:.0%}")
cfgs={'480p':(480,864),'720p':(704,1280),'768p':(768,1344),'1080p':(1088,1920),'2K':(1440,2560)}
for sp in (0.0,0.9):
    print(f"-- attention sparsity {sp}")
    for dur,frames in ((5,124),(10,243),(15,362)):
        s=[]
        for r,(h,w) in cfgs.items():
            rows=h3_rows(h,w,frames); l,a=h3_flops(rows,sp)
            rel=(l+a)/(bl+ba)
            s.append(f"{r}:{rel:5.2f}x ({rel/(dur/5):4.2f}x/s)")
        print(f"  {dur:2d}s: "+"  ".join(s))
