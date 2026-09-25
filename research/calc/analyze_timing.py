"""Summarize timing runs from results.jsonl into a CSV and a per-configuration table."""
import csv, json, statistics as st, sys
from collections import defaultdict

rows = []
for line in open("results.jsonl"):
    d = json.loads(line)
    if "transitions" not in d:
        continue
    tr = dict((k, v) for k, v in d.get("transitions", []))
    done = next((v for k, v in d["transitions"] if k.lower() in ("succeeded", "completed")), None)
    pt = d.get("provider_times") or {}
    prov_s = (pt["updated_at"] - pt["created_at"]) if pt.get("updated_at") and pt.get("created_at") else None
    usage = d.get("usage") or {}
    rows.append({
        "provider": d["provider"], "model": d["model"], "resolution": d.get("resolution") or d.get("res"),
        "duration_s": d.get("duration") or d.get("dur"), "submitted_utc": d.get("submitted_utc", ""),
        "wall_s": done, "provider_elapsed_s": prov_s,
        "first_running_s": tr.get("running") or tr.get("IN_PROGRESS") or tr.get("in_progress"),
        "tokens": usage.get("completion_tokens") or usage.get("total_tokens"),
        "cost_usd": d.get("charged_est") or d.get("est_cost"),
    })
out = sys.argv[1] if len(sys.argv) > 1 else "timing.csv"
with open(out, "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
    w.writeheader(); w.writerows(rows)
g = defaultdict(list)
for r in rows:
    if r["wall_s"]:
        g[(r["provider"], r["model"], r["resolution"], r["duration_s"])].append(r)
print(f"{'config':52} n  wall_s(median)  s_per_video_s  tokens_per_video_s")
for k, rs in sorted(g.items(), key=lambda kv: (kv[0][1], str(kv[0][2]), kv[0][3] or 0)):
    wall = st.median(r["wall_s"] for r in rs)
    tok = rs[0]["tokens"]
    print(f"{' '.join(map(str, k)):52} {len(rs)}  {wall:8.1f}        {wall / k[3]:6.1f}         {tok / k[3] if tok else '':>8}")
