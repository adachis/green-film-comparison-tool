# Effective $/s = (plan price / plan credits) * credits per second
FX=6.7126
plans = {
 # platform: {plan_label: (usd_price, credits_in_that_price)}
 'Higgsfield': {
   'Plus monthly ($59, 1,200 cr)': (59,1200),
   'Plus annual ($564/yr, 1,200 cr/mo)': (564,14400),
   'Ultra 3k monthly ($129)': (129,3000),
   'Ultra 9k monthly ($375)': (375,9000),
   'Ultra 9k annual ($3,240/yr)': (3240,108000),
 },
 'Krea': {
   'Pro monthly ($35, 20k CU)': (35,20000),
   'Pro annual ($21/mo)': (21*12,20000*12),
   'Max 4 monthly ($165, 100k CU)': (165,100000),
   'Max 4 annual ($99/mo)': (99*12,100000*12),
 },
 'Artlist': {
   'AI Starter monthly ($19.99, 16.5k)': (19.99,16500),
   'AI Starter annual ($143.88/yr)': (143.88,16500*12),
   'AI Creator annual ($499.99/yr, 80k/mo)': (499.99,80000*12),
   'AI Professional 500k monthly ($399.99)': (399.99,500000),
   'AI Professional 500k+ annual ($0.00048/cr)': (2879.88,500000*12),
 },
 'Pollo': {
   'Lite monthly ($15, 400 cr)': (15,400),
   'Ultra monthly ($129, 5,000 cr)': (129,5000),
   'Pro annual flash sale ($14.50/mo, 800 cr)': (14.50,800),
   'Ultra annual ($99/mo, 5,000 cr)': (99,5000),
 },
 'Freepik': {
   'Premium monthly ($20, 20k/mo)': (20,20000),
   'Premium annual ($174/yr, 240k)': (174,240000),
   'Premium+ annual ($405/yr, 600k)': (405,600000),
   'Pro annual 4M ($2,520/yr)': (2520,4000000),
   'Pro monthly 300k ($280)': (280,300000),
 },
 'Runway': {
   'Standard monthly ($15, 625)': (15,625),
   'Standard annual ($144/yr, 7,500)': (144,7500),
   'Pro monthly ($35, 2,250)': (35,2250),
   'Pro annual ($336/yr, 27,000)': (336,27000),
   'Max monthly ($95, 9,500)': (95,9500),
   'Max annual ($912/yr, 114,000)': (912,114000),
 },
 'Luma': {
   'Plus monthly ($30, 10k)': (30,10000),
   'Plus annual ($300/yr)': (300,120000),
   'Pro annual ($900/yr, 40k/mo)': (900,480000),
   'Ultra monthly ($300, 150k)': (300,150000),
   'Ultra annual ($3,000/yr)': (3000,1800000),
 },
 'Dreamina': {
   'Basic monthly list ($15, 1,575)': (15,1575),
   'Basic first month promo ($1.50)': (1.5,1575),
   'Standard monthly list ($36, 3,885)': (36,3885),
   'Advanced 35.5k monthly list ($320)': (320,35500),
   'Ultra monthly list ($520, 59,000)': (520,59000),
   'Ultra first month promo ($312)': (312,59000),
   'Ultra annual renewal ($5,999/yr)': (5999,708000),
   'Ultra annual first year ($3,599)': (3599,708000),
 },
 'OpenArt': {
   'Starter monthly ($14, 4k)': (14,4000),
   'Starter annual ($13/mo)': (13,4000),
   'Wonder monthly ($240, 106k)': (240,106000),
   'Wonder annual ($175/mo)': (175,106000),
 },
}
rates = {
 # platform: {model/res: credits per second}
 'Higgsfield': {'SD2.5 480p':3,'SD2.5 720p':7,'SD2.5 1080p':12,'SD2.5 1080p (orig 16)':16,'H3 2K':2,'H3 2K (orig 4)':4},
 'Krea': {'SD2.5 480p':0.10269/0.00135,'SD2.5 720p':0.23112/0.00135,'SD2.5 1080p':0.56862/0.00135,'SD2.0 720p':0.3034/0.00135,'SD2.0 1080p':0.68265/0.00135,'H3 2K':0.13/0.00135},
 'Artlist': {'SD2.5 480p':300,'SD2.5 720p':600,'SD2.5 1080p (render only)':1000,'SD2.5 1080p (draft+render)':1300,'H3 2K':120},
 'Pollo': {'SD2.5 480p list':15,'SD2.5 720p list':30,'SD2.5 1080p list':60,'SD2.5 480p promo x0.4':6,'SD2.5 720p promo x0.4':12,'SD2.5 1080p promo x0.4':24,'H3 768P list':10,'H3 2K list':16,'H3 768P promo x0.5':5,'H3 2K promo x0.5':8},
 'Freepik': {'SD2.5 480p draft':200,'SD2.5 720p':440,'SD2.5 1080p':1100,'H3 Max Turbo 768p':40},
 'Runway': {'SD2.5 480p':20,'SD2.5 720p':30,'SD2.5 1080p':68,'SD2.5 1080p via draft':88,'H3 768P (API rate)':10,'H3 2K (API rate)':15},
 'Luma': {'SD2.5 480p':36,'SD2.5 720p':78,'SD2.5 1080p':191,'H3 768p':28,'H3 2K':46},
 'Dreamina': {'SD2.5 720p @37cr/s':37,'SD2.5 720p @42cr/s':42,'SD2.5 720p event Ultra x0.24 @37':37*0.24,'SD2.5 720p event Ultra x0.24 @42':42*0.24,'SD2.5 720p event Std/Adv x0.43 @37':37*0.43,'SD2.5 720p event Std/Adv x0.43 @42':42*0.43,'SD2.0 Fast 720p event':8,'SD2.0 Fast 720p list (derived)':14},
 'OpenArt': {'SD2.5 720p @130cr/s (secondary)':130},
}
out=[]
for p in plans:
    print('\n##', p)
    for pl,(usd,cr) in plans[p].items():
        upc=usd/cr
        row=[f'{k}: ${upc*v:.3f}/s' for k,v in rates[p].items()]
        print(f'- {pl} | $/credit {upc:.6f} | ' + '; '.join(row))
print('\nKrea CU/s:', {k: round(v,1) for k,v in rates['Krea'].items()})
print('Jimeng ¥0.28/s =', round(0.28/FX,4), 'USD/s')
