# Stream G scenario calculations. All factors cited in G_scenarios.md section 3.
# S = sourced factor; A = assumption (unsourced activity quantity)
GAL=3.78541
EF = dict(
 # DESNZ 2026 flat file v1.2 (Scope1 + WTT), kgCO2e per litre
 diesel_blend = 2.58354+0.61101, diesel_min = 2.66155+0.62409,
 petrol_min = 2.35372+0.60664, kerosene = 2.54016+0.53078,
 jetA = 2.54269+0.52817, propane = 1.54358+0.1817,
 # EPA 2025 hub, CO2 only, per litre
 epa_gasoline = 8.78/GAL, epa_diesel=10.21/GAL, epa_jet=9.75/GAL, epa_kero=10.15/GAL, epa_propane=5.72/GAL,
 # electricity
 us_grid = 771.5*0.45359237/1000,   # eGRID2023 US avg lb/MWh -> kg/kWh (CO2)
 uk_grid = 0.13096+0.01299,         # DESNZ 2026 generation + T&D
 # vehicles, kgCO2e/km (Scope1 + WTT) DESNZ 2026
 car_avg_petrol = 0.16152+0.04599, car_large_petrol=0.26606+0.04599, car_large_diesel=0.20905+0.0507,
 van_diesel = 0.25716+0.06128, hgv_rigid = 0.84606+0.20099,
 coach_pkm = 0.03948+0.00656,
 # flights per passenger-km incl WTT
 lh_econ_rf = 0.11704+0.02461, lh_econ_norf=0.06926+0.02461, lh_bus_rf=0.3394+0.07137,
 intl_econ_rf = 0.10916+0.01656, intl_bus_rf = 0.31656+0.04802,
 air_freight_lh_rf = 0.89939,  # per tonne-km
 water_m3 = 0.1913+0.17088,
)
MEAL_MIX = (0.85+1.46+4.97)/3   # ADEME Impact CO2: veg, chicken, beef meal (kgCO2e)
def gen_L(gal_per_h, hours): return gal_per_h*GAL*hours
out=[]
def p(*a):
    s=' '.join(str(x) for x in a); print(s); out.append(s)

p("== Factors derived ==")
for k,v in EF.items(): p(f"{k}: {v:.5f}")
p(f"MEAL_MIX: {MEAL_MIX:.3f}")
# implied densities from DESNZ per-tonne / per-litre
p("density kerosene kg/L", round(3165.04181/2.54016/1000**0,1), "L/t ->", round(1000/(3165.04181/2.54016),4))
for n,t,l in [('kerosene',3165.04181,2.54016),('petrol_min',3154.08213,2.35372),('diesel_min',3203.91143,2.66155),('jetA',3178.3652,2.54269),('propane',2997.63233,1.54358)]:
    p(f"implied density {n}: {1000/(t/l):.4f} kg/L")

p("\n== S1 Vehicle explosion ==")
# Spectre record (Guinness): 8,418 L kerosene + 33 kg explosives
sp = 8418*EF['kerosene']; sp_epa=8418*EF['epa_kero']
p(f"Spectre kerosene CO2e (DESNZ incl WTT): {sp:,.0f} kg ; EPA CO2 only: {sp_epa:,.0f} kg")
kero_mass = 8418*1000/(3165.04181/2.54016)
p(f"Spectre kerosene mass: {kero_mass:,.0f} kg")
for ys in (0.01,0.04):
    for gwp in (120,900,1800):
        p(f"  BC sensitivity soot_yield={ys} GWP100={gwp}: {kero_mass*ys*gwp/1000:,.1f} tCO2e")
# stoichiometric CO2 upper bounds for explosives
bp = 0.15*44/12; petn = (5*12.011)/(5*12.011+8*1.008+4*14.007+12*15.999)*44.01/12.011
p(f"black powder CO2 upper bound kg/kg: {bp:.3f}; PETN CO2 upper bound kg/kg: {petn:.3f}")
p(f"Spectre 33 kg explosives CO2 upper bound (as PETN): {33*petn:.1f} kg")
# bus / car embodied
bus = 11.6*3.2; p(f"diesel urban bus manufacturing (ICCT: 11.6 t x 3.2 tCO2e/t): {bus:.1f} t")
p(f"ICE car lower-medium (ICCT): 7.2 t; US SUV 1.935 t x 5.2 = {1.935*5.2:.1f} t")
# bottom-up incremental practical day (central; A = assumed quantities)
comp = {
 'pyro gasoline 80 L (A)': 80*EF['petrol_min'],
 'propane 50 L (A)': 50*EF['propane'],
 'explosives <=5 kg BP + 50 m det cord (A)': 5*bp + 50*0.0106*petn,
 'SFX/stunt vehicles 2,000 km van (A: 4 vans x 5 days x 100 km)': 2000*EF['van_diesel'],
 'fire engine standby 24 L diesel (A: 8 h x 3 L/h)': 24*EF['diesel_blend'],
 'generator 100 kW @1/2 load 10 h (S table)': gen_L(4.1,10)*EF['diesel_blend'],
 'crew commute 40 ppl/1.3 x 60 km (A)': 40/1.3*60*EF['car_avg_petrol'],
 'catering 40 meals (mix)': 40*MEAL_MIX,
 'wreck haul HGV 100 km (A)': 100*EF['hgv_rigid'],
 'fire water 10 m3 (A)': 10*EF['water_m3'],
}
tot=0
for k,v in comp.items(): p(f"  {k}: {v:,.0f} kg"); tot+=v
p(f"  TOTAL incremental practical (central, excl vehicle embodied): {tot:,.0f} kg")
low = 20*EF['petrol_min'] + 800*EF['van_diesel'] + gen_L(2.6,8)*EF['diesel_blend'] + 20/1.3*40*EF['car_avg_petrol'] + 20*MEAL_MIX + 50*EF['hgv_rigid']
high = 400*EF['petrol_min']+200*EF['propane'] + 5000*EF['van_diesel'] + 2*gen_L(5.8,12)*EF['diesel_blend'] + 80/1.3*80*EF['car_avg_petrol'] + 80*2*MEAL_MIX + 300*EF['hgv_rigid'] + 48*EF['diesel_blend']
p(f"  low {low:,.0f} kg ; high {high:,.0f} kg")

p("\n== VFX compute energy per core-hour ==")
spec = 346/96; p(f"SPECpower EPYC 9654P W/core @100%: {spec:.2f}")
bh6 = 1.5e3*24/1e6*1000; p(f"Big Hero 6 Wh per render(core)-hour (1.5 MW, 1M h/day): {bh6:.1f}")
ccf = (3.5+4*0.392)*1.135; p(f"CCF AWS vCPU max + 4 GB RAM x PUE 1.135: {ccf:.2f} Wh/vCPU-h")
central_whc = 5.2*1.54; p(f"central on-prem Wh/core-h (5.2 W x PUE 1.54): {central_whc:.1f}")
def vfx(core_h, whc, artist_days, ws_kw=0.4, ci=EF['us_grid']):
    e = core_h*whc/1000 + artist_days*8*ws_kw
    return e, e*ci
for name,(ch,whc,ad) in {'VFX mid explosion central':(5000,8,10),'VFX mid low':(1000,4,5),'VFX mid high':(20000,16,15),
    'VFX hero central':(200000,8,30),'VFX hero low':(50000,4,20),'VFX hero high':(1000000,16,60)}.items():
    e,c=vfx(ch,whc,ad); p(f"  {name}: {e:,.0f} kWh -> {c:,.0f} kgCO2e (US grid)")
p(f"  compute cost 5,000 core-h @ Fox implied $0.0306: ${5000*0.0306:,.0f}; @GarageFarm low 2.2 GHz x $0.024: ${5000*2.2*0.024:,.0f}")
p(f"  compute cost 200,000 core-h @ $0.0306: ${200000*0.0306:,.0f}; @ $0.0528: ${200000*0.0528:,.0f}")

p("\n== Big-show VFX compute (order of magnitude) ==")
for label,th in [('Avatar TWoW AWS thread-hours',3.3e9),('Avatar TWoW longest shot',13.6e6),('Avatar F&A render hours',1.248e9)]:
    for whc in (2.0,5.75):
        e=th*whc/1000
        p(f"  {label} @ {whc} Wh/h: {e/1e6:,.2f} GWh -> {e*0.35/1000:,.0f} t @0.35 ; {e*0.1/1000:,.0f} t @0.10")
p(f"  Avatar F&A per shot render hours: {1.248e9/3132:,.0f}")
p(f"  Aquaman render hours per shot: {5381615/450:,.0f}")

p("\n== S2 Car chase day ==")
chase = {
 'picture cars 640 km x1.5 aggressive (A)': 640*EF['car_large_petrol']*1.5,
 'camera cars 300 km x1.3 (A)': 300*EF['car_large_petrol']*1.3,
 'transport/tow HGV 400 km (A)': 400*EF['hgv_rigid'],
 'police/closure vehicles 300 km (A)': 300*EF['car_large_petrol'],
 'crew commute 80/1.3 x 60 km (A)': 80/1.3*60*EF['car_avg_petrol'],
 'generator 100 kW 1/2 load 10 h': gen_L(4.1,10)*EF['diesel_blend'],
 'catering 80 meals': 80*MEAL_MIX,
}
t2=0
for k,v in chase.items(): p(f"  {k}: {v:,.0f}"); t2+=v
p(f"  TOTAL per chase day excl embodied: {t2:,.0f} kg")
p(f"  Furious 7: 230 destroyed x 7.2 t = {230*7.2:,.0f} t (new-equivalent); x20% remaining-life = {230*7.2*0.2:,.0f} t")
p(f"  Fury Road: 150 built -62 not surviving: 62 x 7.2 = {62*7.2:,.0f} t (proxy, custom-built vehicles differ)")
for ch in (20000,200000):
    e = 40*ch*8/1000 + 40*15*8*0.4
    p(f"  VFX 40-shot CG chase @ {ch} core-h/shot: {e:,.0f} kWh -> {e*EF['us_grid']/1000:,.1f} t")

p("\n== S3 Crowd per extra-day ==")
travel_coach = 40*EF['coach_pkm']; travel_car = 40/1.3*EF['car_avg_petrol']
meals = 2*MEAL_MIX
gen_share = gen_L(3.8,12)*EF['diesel_blend']/500
p(f"  travel coach 40 km: {travel_coach:.2f}; car 40 km/1.3: {travel_car:.2f}")
p(f"  meals 2 x mix: {meals:.2f}; (veg 2x0.85={1.7}; beef 2x4.97={9.94})")
p(f"  holding generator 60 kW 3/4 load 12 h shared by 500: {gen_share:.2f}")
central = (travel_coach+travel_car)/2 + meals + gen_share
lowx = travel_coach + 2*0.85 + gen_share*0.5
highx = travel_car*2 + 2*4.97 + gen_share*2
p(f"  per extra-day central {central:.1f} (low {lowx:.1f}, high {highx:.1f}) kg")
for n,d in [(500,1),(1000,3),(3000,3)]:
    p(f"  {n} extras x {d} days: {n*d*central/1000:,.1f} t (range {n*d*lowx/1000:,.1f}-{n*d*highx/1000:,.1f})")
for ch in (5000,100000):
    e = ch*8/1000 + 20*8*0.4
    p(f"  digital crowd shot {ch} core-h + 20 artist-days: {e:,.0f} kWh -> {e*EF['us_grid']:,.0f} kg")

p("\n== S4 Aerial ==")
h190 = 190*EF['jetA']; h166 = 44*GAL*EF['jetA']
p(f"  H125 190 L/h -> {h190:.0f} kgCO2e/h (no RF); 166.6 L/h -> {h166:.0f}; with RF x1.7 on CO2 part: {190*(2.54269*1.7+0.52817):.0f}")
for hrs in (3,5,10): p(f"  aerial day {hrs} flight h: {hrs*h190/1000:.2f} t")
drone_kwh = 12*2*0.0988/0.88
p(f"  drone 12 flights x 197.6 Wh /0.88 charge eff (A): {drone_kwh:.2f} kWh -> {drone_kwh*EF['us_grid']:.2f} kg ; + van 100 km {100*EF['van_diesel']:.0f} kg")

p("\n== S5 Location abroad, 5 crew, 6 hotel nights ==")
def trip(dist, crew, f_air, hotel, nights, local_km=1800, veh=EF['car_large_diesel'], freight_t=0.25, days=6):
    flights = crew*2*dist*f_air
    hot = crew*nights*hotel
    loc = local_km*veh
    meals = crew*days*3*MEAL_MIX
    freight = freight_t*2*dist*EF['air_freight_lh_rf']
    return flights,hot,loc,meals,freight
for label,dist,f,hotel in [('LHR-CPT econ RF',9681,EF['lh_econ_rf'],51.4),('LHR-CPT econ noRF',9681,EF['lh_econ_norf'],51.4),('LHR-CPT business RF',9681,EF['lh_bus_rf'],51.4),('LAX-NRT econ RF',8753,EF['intl_econ_rf'],39.0),('LAX-NRT business RF',8753,EF['intl_bus_rf'],39.0),('LAX-KEF econ RF (hotel proxy US 16.1)',6926,EF['intl_econ_rf'],16.1)]:
    fl,ho,lo,me,fr = trip(dist,5,f,hotel,6)
    p(f"  {label}: flights {fl:,.0f} hotels {ho:,.0f} local {lo:,.0f} meals {me:,.0f} = {fl+ho+lo+me:,.0f} kg (+air freight 250 kg gear {fr:,.0f} -> {fl+ho+lo+me+fr:,.0f})")
fl,ho,lo,me,fr = trip(9681,2,EF['lh_econ_rf'],51.4,6)
p(f"  local-crew variant (2 flown + 3 local): flights {fl:,.0f} hotels(5 rooms) {5*6*51.4:,.0f} -> {fl+5*6*51.4+lo+me*2.5:,.0f} kg approx")

p("\n== S6 Set build (illustrative 'large set' A quantities) ==")
mats = {'sawn softwood 30 t x0.31 (ICE)':30*0.31,'plywood 20 t x0.68 (ICE)':20*0.68,'steel 5 t x1.55 (ICE world avg)':5*1.55,
        'plasterboard/plaster 10 t x0.39 (ICE)':10*0.39,'paint 2 t x3.17 (DESNZ avg plastics PROXY)':2*3.1705,'polystyrene 1 t x4.374 (DESNZ PS)':1*4.37439}
tm=0
for k,v in mats.items(): p(f"  {k}: {v:.1f} t"); tm+=v
labor = 40/1.3*30*60*EF['car_avg_petrol']/1000
eol_land = 50*0.92537; eol_rec = 50*0.00465
p(f"  materials total {tm:.1f} t; build-crew commute 40 x 30 d x 60 km: {labor:.1f} t; wood EoL landfill 50 t: {eol_land:.1f} t vs recycle {eol_rec:.2f} t")
p(f"  DESNZ cross-check: wood 50 t x0.2695 = {50*0.2695:.1f} t; metals 5 t x3.822 = {5*3.822:.1f} t")
led_kw = 1000*0.095 + 20
p(f"  LED volume 1,000 BP2V2 panels avg 95 W + 20 kW (A): {led_kw:.0f} kW x 12 h = {led_kw*12:,.0f} kWh/day -> US {led_kw*12*EF['us_grid']:,.0f} kg, UK {led_kw*12*EF['uk_grid']:,.0f} kg")
p(f"  Max: 1,000 x 190 W = 190 kW")
for ch in (20000,100000):
    e = 30*ch*8/1000 + 30*20*8*0.4
    p(f"  full-CG environment 30 shots @ {ch} core-h/shot + 20 artist-days/shot: {e:,.0f} kWh -> {e*EF['us_grid']/1000:,.1f} t")

p("\n== S7 Weather ==")
for lpm in (200,1000):
    m3 = lpm*60*4/1000
    p(f"  rain {lpm} L/min x 4 h (A): {m3:.0f} m3 -> water carbon {m3*EF['water_m3']:.0f} kg; trucks (15 m3 each, 30 km) {m3/15*30*EF['hgv_rigid']:.0f} kg")
p(f"  Titanic tank 17M gal = {17e6*GAL/1000:,.0f} m3 -> supply+treatment {17e6*GAL/1000*EF['water_m3']/1000:,.1f} t (fill only)")
p(f"  Baja filtration 9,000 gal/min = {9000*GAL/1000:.1f} m3/min")

p("\n== S8 Night exterior lighting ==")
for load,g in [('1/4',4.7),('1/2',7.7)]:
    L = gen_L(g,12); p(f"  200 kW gen @ {load} load 12 h: {L:.0f} L -> {L*EF['diesel_blend']:.0f} kg")
p(f"  connected load example: 2x18 kW + 10x1.5 kW + 2x4 kW(A) + 10 kW(A) = {2*18+10*1.5+2*4+10} kW")
p(f"  same energy from grid tie-in: {41*12} kWh -> US {41*12*EF['us_grid']:.0f} kg; UK {41*12*EF['uk_grid']:.0f} kg")

p("\n== S10 Dialogue ==")
dl = {'crew 25/1.3 x 60 km':25/1.3*60*EF['car_avg_petrol'],'generator 60 kW 1/2 load 10 h':gen_L(2.9,10)*EF['diesel_blend'],
      'catering 25 x mix':25*MEAL_MIX,'2 trucks 100 km':2*100*EF['hgv_rigid']}
t10=0
for k,v in dl.items(): p(f"  {k}: {v:,.0f}"); t10+=v
p(f"  standalone location day marginal total: {t10:,.0f} kg")
p(f"  standing-set stage: lighting 20-40 kW x 10 h grid: US {200*EF['us_grid']:.0f}-{400*EF['us_grid']:.0f} kg; UK {200*EF['uk_grid']:.0f}-{400*EF['uk_grid']:.0f} kg")
# SEA-derived per day
for n,ptot,elec,eday in [('tentpole',2996,443,6.7),('large',1262,129,2.3),('medium',623,84,1.4),('small',435,52,1.4)]:
    d = elec/eday; p(f"  SEA {n}: implied days {d:.0f} -> {ptot/d:.1f} t/day")
p("\n== Break-even AI energy (kWh) at 0.35 kg/kWh for practical marginal totals ==")
for n,kg in [('explosion incremental central',tot),('chase day',t2),('aerial heli day 5h',5*h190),('location LHR-CPT econ',15899),('dialogue location day',t10),('dialogue stage day US',105)]:
    p(f"  {n}: {kg:,.0f} kg -> {kg/0.35:,.0f} kWh")
import os
open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'g_scenarios_calc_output.txt'), 'w').write('\n'.join(out))
