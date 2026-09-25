# Optimized-workflow model per KEPT 5-second shot. V = cloud energy of one 5 s 1080p generation with native audio (Wh).
sc = {
 'low':     dict(N=3,  rho=0.20, reb=0.5, d=0.25, a=1.00, F=1.3, r=0.70, U=0.9, K=90.0, A=0.0),
 'central': dict(N=5,  rho=0.40, reb=0.0, d=0.18, a=0.85, F=1.2, r=0.41, U=0.4, K=13.0, A=0.3),
 'high':    dict(N=10, rho=0.60, reb=0.0, d=0.06, a=0.70, F=1.1, r=0.23, U=0.2, K=2.0,  A=0.05),
}
def run(p,V,scenario):
    base = p['N']*V
    Nd = p['N']*(1-p['rho'])*(1+p['reb'])       # exploratory (draft) takes
    drafts = Nd*p['d']*p['a']*V
    if scenario=='A':   # platform draft mode, final at native 1080p (Seedance 2.5 Draft: 480p draft -> 1080p final)
        finals = p['F']*1.0*p['a']*V; ups=0
    else:               # B: 480p exploration, 720p final + local upscale to 1080p
        finals = p['F']*p['r']*p['a']*V; ups=p['F']*p['U']
    tot = p['K'] + drafts + finals + ups + p['A']
    return base, dict(keyframes=p['K'], drafts=drafts, finals=finals, upscale=ups, audio=p['A'], total=tot, saving=1-tot/base, Nd=Nd)
for V in (50,100,250):
    for s in ('A','B'):
        for k,p in sc.items():
            base,r = run(p,V,s)
            print(f"V={V:3d} Scenario {s} {k:8s}: baseline {base:7.0f} Wh | keyframes {r['keyframes']:5.1f} drafts({r['Nd']:.1f}) {r['drafts']:6.1f} finals {r['finals']:6.1f} upscale {r['upscale']:4.1f} audio {r['audio']:4.2f} -> total {r['total']:6.1f} Wh | saving {r['saving']*100:5.1f}%")
    print()
# lever-by-lever (central, V=100) isolated effects
p=sc['central']; V=100; base=p['N']*V
print("Isolated levers (central, V=100, baseline 500 Wh):")
print(" keyframe/I2V only (40% fewer takes, all at 1080p, +13 Wh local):", round(1-(p['N']*(1-p['rho'])*V+13)/base,3))
print(" draft mode only (5 takes as 480p drafts d=0.18 + 1.2 finals):", round(1-(p['N']*0.18*V+1.2*V)/base,3))
print(" 720p final + upscale only (5 takes at 720p r=0.41 +0.4 Wh each):", round(1-(p['N']*(0.41*V+0.4))/base,3))
print(" audio off only (a=0.85):", round(1-0.85,3))
