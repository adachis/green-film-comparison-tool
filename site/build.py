"""Inline the page's CSS and JS into self-contained HTML.

dist/index.html       page body for a claude.ai Artifact (the Artifact adds its own document skeleton)
dist/site/index.html  complete standalone document for any static web server
"""
from pathlib import Path

SITE_URL = "https://pvc.logira.cc/"
FAVICON = (
    "data:image/svg+xml,"
    "%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E"
    "%3Crect width='64' height='64' rx='14' fill='%23374836'/%3E"
    "%3Ccircle cx='32' cy='32' r='15' fill='none' stroke='%2377a32a' stroke-width='6'/%3E"
    "%3Ccircle cx='32' cy='32' r='5' fill='%23f9fbf3'/%3E%3C/svg%3E"
)

root = Path(__file__).parent
src = root / "src"
html = (src / "index.html").read_text()
css = (src / "styles.css").read_text()
js = "\n".join((src / f).read_text() for f in ("data.js", "model.js", "app.js"))
page = html.replace("/*STYLES*/", css).replace("/*SCRIPTS*/", js)

out = root / "dist" / "index.html"
out.parent.mkdir(exist_ok=True)
out.write_text(page)
print(f"wrote {out} ({len(page):,} bytes)")

# Standalone: everything before <header> belongs in <head>, the rest in <body>.
head, body = page.split("<header", 1)
title = head.split("<title>", 1)[1].split("</title>", 1)[0]
desc = head.split('name="description" content="', 1)[1].split('"', 1)[0]
doc = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta property="og:type" content="website">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{SITE_URL}">
<meta name="twitter:card" content="summary">
<link rel="canonical" href="{SITE_URL}">
<link rel="icon" href="{FAVICON}">
{head.strip()}
</head>
<body>
<header{body.rstrip()}
</body>
</html>
"""
site = root / "dist" / "site" / "index.html"
site.parent.mkdir(parents=True, exist_ok=True)
site.write_text(doc)
print(f"wrote {site} ({len(doc):,} bytes)")
