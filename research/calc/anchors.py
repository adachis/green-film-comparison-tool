# Normalize measured/official anchors to GPU-seconds and Wh per output-second (GPU-only).
# Power assumption where not measured: fraction f of TDP.
TDP={'H100':700,'H800':700,'H200':700,'H20':400,'L20':275,'A100':400,'4090':450,'B200':1000,'B300':1100,'GB300':1400}
rows=[
 # name, gpu, n_gpu, latency_s, out_seconds, res, steps/NFE, note, measured_Wh (GPU) or None
 ('Wan2.1-14B T2V (README)','H100',1,1837.9,81/16,'1280x720','50x2 CFG','offload',None),
 ('Wan2.1-14B T2V (README)','H100',8,287.9,81/16,'1280x720','50x2','',None),
 ('Wan2.1-14B T2V (README)','H20',1,6935.5,81/16,'1280x720','50x2','offload',None),
 ('Wan2.1-14B T2V (README)','H20',8,980.5,81/16,'1280x720','50x2','',None),
 ('Wan2.2-A14B T2V (README)','H100',1,326.9,81/16,'832x480','40x2','offload',None),
 ('Wan2.2-A14B T2V (README)','H100',1,1041.5,81/16,'1280x720','40x2','offload',None),
 ('Wan2.2-A14B T2V (README)','H100',8,155.1,81/16,'1280x720','40x2','',None),
 ('Wan2.2-A14B T2V (README)','H20',1,1133.9,81/16,'832x480','40x2','offload',None),
 ('Wan2.2-A14B T2V (README)','H20',1,4048.7,81/16,'1280x720','40x2','offload',None),
 ('Wan2.2-A14B T2V (README)','H20',8,564.7,81/16,'1280x720','40x2','',None),
 ('Wan2.2-TI2V-5B (README)','4090',1,534.7,121/24,'1280x704','50x2','offload',None),
 ('HunyuanVideo-1.5 (README)','H800',8,13.90,121/24,'848x480','50 (accel)','',None),
 ('HunyuanVideo-1.5 (README)','H800',8,28.33,121/24,'1280x720','50 (accel)','',None),
 ('HunyuanVideo-1.5 sparse (README)','H800',8,26.41,121/24,'1280x720','50 (accel)','',None),
 ('HunyuanVideo-1.5 (README)','H800',8,96.78,241/24,'1280x720','50 (accel)','',None),
 ('HunyuanVideo-1.5 sparse (README)','H800',8,58.39,241/24,'1280x720','50 (accel)','',None),
 ('HunyuanVideo 13B (README xDiT)','H100',8,337.58,129/24,'1280x720','50','GPU type assumed',None),
 ('Kandinsky5 Pro 100NFE','H100',1,1241,121/24,'1280x768','100 NFE','',None),
 ('Kandinsky5 Pro Flash 16NFE','H100',1,235,121/24,'1280x768','16 NFE','',None),
 ('Kandinsky5 Pro 100NFE','H100',1,560,121/24,'768x512','100 NFE','',None),
 ('Kandinsky5 Pro Flash','H100',1,123,121/24,'768x512','16 NFE','',None),
 ('Step-Video-T2V 30B','H100',4,743,204/25,'992x544','50x2','GPU type assumed H100/H800; +1 GPU for TE/VAE not counted',None),
 ('MAGI-1 24B realtime','H100',24,1.0,1.0,'480p 3:4','16 steps FP8','steady-state TPOC 0.98 s/s',None),
 ('LTX-Video 2B','H100',1,2.0,121/24,'768x512','20','',None),
 ('LTX-2 19B (1.22 s/step, 40 steps assumed)','H100',1,1.22*40,121/24,'1280x720','40 (assumed)','per-step only',None),
 ('Seedance 1.0 (report) if 8xL20','L20',8,41.4,5,'1920x1080','distilled','GPU COUNT ASSUMED',None),
 ('Seedance 1.0 (report) if 4xL20','L20',4,41.4,5,'1920x1080','distilled','GPU COUNT ASSUMED',None),
 ('MiniMax H3 BF16 50 steps (SGLang)','H200',4,74.38,124/24,'1344x768 +audio','50 (CFG-distilled)','measured latency',None),
 ('MiniMax H3 BF16 50 steps (SGLang)','B300',8,19.04,124/24,'1344x768 +audio','50','',None),
 ('MiniMax H3 FP8 50 steps (SGLang)','B300',8,18.03,124/24,'1344x768 +audio','50','',None),
 ('MiniMax H3 50 steps (SGLang)','GB300',4,33.10,124/24,'1344x768 +audio','50','client-observed',None),
 ('FastH3 4-step VSA0.9 (SGLang)','B300',4,4.1,124/24,'1344x768 +audio','4 fwd','community distill',None),
 ('FastH3 4-step VSA0.9 (SGLang)','B300',4,8.0,243/24,'1344x768 +audio','4 fwd','',None),
 ('FastH3 4-step VSA0.9 (SGLang)','B300',4,13.3,362/24,'1344x768 +audio','4 fwd','',None),
 ('VDN-H3 8-NFE (SGLang)','B200',8,8.7,345/24,'1344x768 +audio','8 NFE','',None),
 ('ML.ENERGY HunyuanVideo','H100',1,1689,129/24,'1280x720','50','measured',323.4),
 ('ML.ENERGY Wan2.1-14B','H100',1,467,81/16,'832x480','50x2','measured',80.3),
 ('ML.ENERGY CogVideoX1.5-5B','H100',1,496,81/16,'1360x768','50x2','measured',93.2),
 ('ML.ENERGY Wan2.1-1.3B','H100',1,95,81/16,'832x480','50x2','measured',18.0),
 ('Delavande Wan2.1-14B','H100',1,1875,81/16,'1280x720','50x2','measured GPU',359.7),
 ('Delavande Mochi-1','H100',1,263,84/30,'848x480','64','measured GPU',44.7),
 ('Delavande LTX-Video 0.9.7','H100',1,9.7,121/24,'704x512','40','measured GPU',3.16),
]
print(f"{'anchor':46s} {'gpu':5s} {'n':>2s} {'lat_s':>7s} {'out_s':>5s} {'res':>16s} {'GPUs/out-s':>10s} {'Wh/out-s@f=0.9':>14s} {'meas Wh/out-s':>12s}")
for name,gpu,n,lat,outs,res,steps,note,meas in rows:
    gpus=n*lat/outs
    wh=gpus*0.9*TDP[gpu]/3600
    m=f"{meas/outs:.1f}" if meas else ''
    print(f"{name:46s} {gpu:5s} {n:2d} {lat:7.1f} {outs:5.2f} {res:>16s} {gpus:10.1f} {wh:14.2f} {m:>12s}")
