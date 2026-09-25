# Recommended per-output-second energy (GPU-only) and facility-level, by class & resolution.
px = {'480p':854*480, '720p':1280*720, '1080p':1920*1080}
r480 = px['480p']/px['720p']; r1080 = px['1080p']/px['720p']
print(f"pixel ratios vs 720p: 480p {r480:.3f}, 1080p {r1080:.3f}")
alpha = {'low_for_480':1.3,'central':0.7,'high_for_480':0.45,'low_for_1080':0.45,'high_for_1080':1.3}
# Seedance-class: 720p anchors (GPU-only Wh/s)
S720 = {'low':2.0,'central':10.0,'high':35.0}
seed = {
 '480p': {'low':S720['low']*r480**1.3, 'central':S720['central']*r480**0.7, 'high':S720['high']*r480**0.45},
 '720p': S720,
 '1080p':{'low':S720['low']*r1080**0.45,'central':S720['central']*r1080**0.7,'high':S720['high']*r1080**1.3},
}
# Hailuo-class: 768p anchors; 480p ratio from H3 FLOP model (0.28 dense .. 0.38 sparse) + overhead; 1080p/2K via regenerate multiplier
H720 = {'low':1.0,'central':5.0,'high':20.0}
hail = {
 '480p': {'low':H720['low']*0.30,'central':H720['central']*0.40,'high':H720['high']*0.50},
 '720p': H720,
 '1080p':{'low':H720['low']*1.6,'central':H720['central']*2.5,'high':H720['high']*4.0},
}
K = {'low':1.27,'central':1.72,'high':3.12}   # facility multiplier = k_server*k_idle*PUE
def show(name,t):
    print(f"\n{name}")
    print(f"{'res':6s} | GPU-only Wh/s low/central/high | facility Wh/s (low*Klow, central*Kc, high*Khigh) | facility kWh per minute (central)")
    for r in ('480p','720p','1080p'):
        g=t[r]
        f={k:g[k]*K[k] for k in g}
        print(f"{r:6s} | {g['low']:5.2f} / {g['central']:5.1f} / {g['high']:6.1f} | {f['low']:5.2f} / {f['central']:5.1f} / {f['high']:6.1f} | {f['central']*60/1000:5.2f}")
show('SEEDANCE-CLASS',seed); show('HAILUO-CLASS',hail)
print("\nK factors:", K, " central = 1.3*1.1*1.2 =", 1.3*1.1*1.2, " low = 1.15*1.0*1.1 =",1.15*1.0*1.1," high = 1.6*1.3*1.5 =",1.6*1.3*1.5)
# Examples
for cls,t in (('Seedance',seed),('Hailuo',hail)):
    g=t['720p']['central']; print(f"{cls} 720p central: 5 s clip = {g*5:.0f} Wh GPU, {g*5*K['central']:.0f} Wh facility")

import math
print("\nFacility-level with log-space RSS combination of (e720 range, resolution-exponent range, K range)")
def rss(c, ups, downs):
    up=math.exp(math.sqrt(sum(math.log(u)**2 for u in ups)))
    dn=math.exp(math.sqrt(sum(math.log(d)**2 for d in downs)))
    return c/dn, c, c*up
Kc=K['central']; Kup=K['high']/Kc; Kdn=Kc/K['low']
for cls,t,e in (('Seedance',seed,S720),('Hailuo',hail,H720)):
    eu=e['high']/e['central']; ed=e['central']/e['low']
    for r in ('480p','720p','1080p'):
        g=t[r]
        # resolution-scaling uncertainty factor = ratio of (bounding value / e720 bound) to central ratio
        if r=='720p': ru=rd=1.0
        else:
            cen=g['central']/e['central']; hi=g['high']/e['high']; lo=g['low']/e['low']
            ru=max(hi/cen,1.0); rd=max(cen/lo,1.0)
        lo_,c_,hi_=rss(g['central']*Kc,[eu,ru,Kup],[ed,rd,Kdn])
        print(f"{cls:9s} {r:6s}: facility central {c_:5.1f} Wh/s, likely range {lo_:5.2f} - {hi_:6.1f} Wh/s  | per 5 s clip central {c_*5:5.0f} Wh | per minute {c_*60/1000:4.2f} kWh (range {lo_*0.06:.2f}-{hi_*0.06:.2f})")
