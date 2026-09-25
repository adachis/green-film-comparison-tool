"""Inline the page's CSS and JS into one self-contained HTML file: dist/index.html."""
from pathlib import Path

root = Path(__file__).parent
src = root / "src"
html = (src / "index.html").read_text()
css = (src / "styles.css").read_text()
js = "\n".join((src / f).read_text() for f in ("data.js", "model.js", "app.js"))
html = html.replace("/*STYLES*/", css).replace("/*SCRIPTS*/", js)
out = root / "dist" / "index.html"
out.parent.mkdir(exist_ok=True)
out.write_text(html)
print(f"wrote {out} ({len(html):,} bytes)")
