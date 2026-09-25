# Prompt or Camera

A calculator that compares making video with generative AI (Seedance 2.5, MiniMax H3) against shooting it conventionally, on CO2e, energy, water, and cost.

- `src/data.js` holds every factor, range, and source.
- `src/model.js` is the calculation engine (pure functions, runs in Node too).
- `src/app.js` wires the page.
- `src/index.html` and `src/styles.css` follow the Nature Design System.

Build the single-file page with `python3 build.py`, which writes `dist/index.html`.

Check the engine from the command line:

```
node -e 'const M=require("./src/model.js"); console.log(M.perGeneratedSecond("seedance25","720p"))'
```
