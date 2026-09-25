# Derived numbers for D2 report. All inputs sourced in the report; assumptions labelled.
WH = {'low':2.5,'central':5.5,'high':8.5}   # Wh per thread-hour incl. PUE (derived from CCF/Boavizta; see report)
EF = {'AU2022':0.57786,'AU2024':0.55383,'NZ2022':0.10312,'NZ2024':0.11202,'UK2024':0.2165,'UKDESNZ':0.177,'US2024':0.38378,'CA2024':0.18535,'LADWP':0.229,'IN2024':0.7054}
def row(name, th, shots=None, minutes=None, ef_keys=()):
    print(f'## {name}: {th:,.0f} thread/render-hours')
    for k,w in WH.items():
        e_kwh = th*w/1000
        s = f'  {k:7s} {w} Wh/h -> {e_kwh/1e6:8.2f} GWh'
        if shots: s += f' | per shot {e_kwh/shots/1000:7.2f} MWh'
        if minutes: s += f' | per min {e_kwh/minutes/1000:7.1f} MWh'
        for ek in ef_keys: s += f' | {ek} {e_kwh*EF[ek]/1000:8,.0f} t'
        print(s)
row('Avatar: The Way of Water (AWS portion)', 3.3e9, shots=3240, minutes=192, ef_keys=('AU2022','NZ2022'))
print('   thread-hours per shot', 3.3e9/3240, ' per runtime min', 3.3e9/192)
fr24=192*60*24; fr_mix=192*60*24*(0.6+0.4*2)
print('   per final frame (all 24fps)', 3.3e9/fr24, ' (40% at 48fps)', 3.3e9/fr_mix)
row('Avatar 2 longest single shot', 13.6e6, ef_keys=('AU2022','NZ2022'))
row('Avatar 2 top-5 shots average', 51.6e6/5, ef_keys=('AU2022','NZ2022'))
row('Avatar: Fire and Ash', 1248087308, shots=3132, minutes=176.25, ef_keys=('NZ2024','AU2024'))
print('   render-hours per shot', 1248087308/3132, ' per VFX min', 1248087308/176.25, ' per final frame (24fps)', 1248087308/(176.25*60*24))
row('Kingdom of the Planet of the Apes', 946e6, shots=1500, minutes=145, ef_keys=('NZ2024',))
print('   thread-hours per shot (<=)', 946e6/1500)
# The Walk
print('## The Walk: 9.1M core-hours / 30 min ->', 9.1e6/30, 'core-h per min; 5,000/s ->', 5000*60)
for w in (5,7.9,10): print(f'   {w} Wh/core-h -> total {9.1e6*w/1e6:.1f} MWh; per min {9.1e6*w/30/1e6:.2f} MWh')
# 2014-era render-hours
bh6_wh = 1.5e6/(1.1e6/24)
print('## Disney BH6 farm: Wh per render-hour =', round(bh6_wh,1), '; annual GWh at 1.5 MW =', 1.5*8760/1000)
for name,rh,mins in (('HTTYD2',90e6,102),('KFP2',55e6,90),('KFP2 final battle',7e6,14000/24/60),('Monsters University (secondary)',100e6,104)):
    print(f'## {name}: {rh:,.0f} render-h; per min {rh/mins:,.0f}')
    for w in (15,25,32.7): print(f'   {w} Wh -> {rh*w/1e9:.2f} GWh; per min {rh*w/mins/1e6:.1f} MWh')
print('   HTTYD2 per frame', 90e6/130000, '; KFP2 battle per frame', 7e6/14000)
print('## MPC Lion King: 2,389 years x 8766 h =', 2389*8766)
# Facility intensities (UK SECR)
fac = {'Framestore 2024':(8256468,130.462),'Framestore 2023':(7854025,123.202),'ILM UK FY25':(6607699,94.299),'ILM UK FY24':(6167395,91.665),'TCS UK 2023':(3978359,87.083),'TCS UK 2022':(5057188,123.282)}
for k,(kwh,m) in fac.items(): print(f'## {k}: {kwh/m/1000:.1f} kWh per GBP1,000 turnover')
hc25=1181/1.6268; hc24=1280/1.9074
print('## ILM UK headcount FY25', round(hc25), 'kWh/employee', round(6607699/hc25), ' FY24', round(hc24), round(6167395/hc24), '; per workday(220)', round(6607699/hc25/220,1))
for cost in (3,10,25,50,100):
    print(f'   shot cost GBP{cost}k -> {cost*45.7/1000:.2f}-{cost*70.1/1000:.2f} MWh (TCS..ILM intensity)')
for d in (2,5,20,60,200): print(f'   {d} artist-days x 41 kWh = {d*41.2:.0f} kWh')
# VP
print('## Sony/ICF measured 6-day VP: per day', 15977/6, 'LED/day', 7371/6, 'render/day', 4467/6, 'stage/day', 2896/6, 'AC/day', 1243/6, 'per shoot day (2)', 15977/2)
print('   Sony est. load: LED', 2400*58/1000, 'kW + render 25.6 kW =', 2400*58/1000+25.6, 'kW; 12h =', (2400*58/1000+25.6)*12, 'kWh')
print('   check est A: 164.8*40.8 + 11*79.2 + 0.24*79.2 =', 164.8*40.8+11*79.2+0.24*79.2)
for ef in ('LADWP','US2024','UKDESNZ','CA2024'): print(f'   2,663 kWh/day x {ef} = {2663*EF[ef]:.0f} kg/day')
mand_kw = 1586*95/1000+906*250/1000
print('## UCLA Mandalorian LED kW', mand_kw, '; 36h kWh', mand_kw*36, '; kg', mand_kw*36*0.252396, '; per min', mand_kw*36*0.252396/5.42)
print('   S1 LED kW', 701*.095+200*.25, ' S2', 301*.095+100*.25)
print('   HVAC S1 kW', 77.386*2.38/0.252396/12, ' S3 kW', 226.542*5.42/0.252396/36)
emb_bp2 = 0.029472616+0.004622709+0.000931182; emb_cb5=0.084680079+0.001905711
print('   UCLA embodied kg/panel-h BP2', emb_bp2, ' CB5(+frame?)', emb_cb5, '; Mand per h', 1586*emb_bp2+906*emb_cb5, '; per 12h', 12*(1586*emb_bp2+906*emb_cb5))
print('   BP2 embodied over 10,000 h:', 0.029472616*1e4, 'kg/panel ->', 0.029472616*1e4/0.25, 'kg/m2')
print('   Mandalorian 12h day: LED', mand_kw*12, 'kWh + HVAC', 135*12, '+ PCs', 7*0.8*12, '=', mand_kw*12+135*12+7*0.8*12)
print('## ROE BP2V2 W/m2 max/avg (2024):', 190/0.25, 95/0.25, ' (2021):', 160/0.25, 80/0.25, '; mass kg/m2', 9.35/0.25)
print('## Iron Flower: per day (5)', 1387/5, ' per shoot day', 1387/2)
print('## Ulster: 35 kW x 10 h =', 350, 'kWh/day; 210 panels')
print('## AdGreen VP day 79 kg / 0.177 =', 79/0.177, 'kWh')
# Water
gal=3.785411784e-3
print('## Avatar tank geometric max m3', 120*60*30*0.0283168, ' gal', 120*60*30*7.48052, '; 250k gal m3', 250000*gal, '; 900k gal m3', 900000*gal)
print('## Baja 17M gal m3', 17e6*gal, '; 9,000 gpm m3/h', 9000*gal*60)
print('## Malta shallow m3 (no pit)', 91*122*1.8, '; deep upper bound', 107*49*11, '; indoor', 15*9*3.6)
print('## Rain 500-800 L/min -> m3/h', 0.5*60, 0.8*60, '; GPM', 500/3.785, 800/3.785)
print('## Heating Pinewood 1200 m3 +19K MWh_th', 1.2e6*4.186*19/3.6e6, '; Lites 7000 m3', 7e6*4.186*19/3.6e6)
print('## Binti: 1.2 t = 2% -> total', 1.2/0.02, 't')
print('## Tatort: 33.9 t = 46% -> total', 33.9/0.46)
print('## Screen Ireland: features avg', 537.6/7, ' TV avg', 920.8/8)
print('## Telefilm micro budget CA$50k at 2t/100k ->', 0.5*2, 't; CA$10k ->', 0.1*2)
