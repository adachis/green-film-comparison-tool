# Prompt vs. Camera

A calculator that compares making video with generative AI (Seedance 2.5, MiniMax H3) against shooting it conventionally, on CO2e, energy, water, and cost.

- `src/data.js` holds every factor, range, and source.
- `src/model.js` is the calculation engine (pure functions, runs in Node too).
- `src/app.js` wires the page.
- `src/index.html` and `src/styles.css` follow the Nature Design System.

Build with `python3 build.py`.  It writes two self-contained files:

- `dist/site/index.html` is the complete page to deploy on any static web server (live at https://pvc.logira.cc once deployed).  Its only external requests are Google Fonts.
- `dist/index.html` is the same page without the document skeleton, for embedding in a host page.

Don't serve it behind a Content-Security-Policy that blocks inline scripts and styles.  If the server sets one, allow `'unsafe-inline'` for scripts and styles, plus `https://fonts.googleapis.com` and `https://fonts.gstatic.com`.

Check the engine from the command line:

```
node -e 'const M=require("./src/model.js"); console.log(M.perGeneratedSecond("seedance25","720p"))'
```
