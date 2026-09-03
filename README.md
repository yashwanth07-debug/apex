# APEX · GRAND PRIX — the portfolio you win by driving

**Live site → [https://yashwanth07-debug.github.io/apex/](https://yashwanth07-debug.github.io/apex/)**
**Source → this repository · MIT licensed**
**Built for the 3D Websites Hackathon (Devpost), Round 04 · “The Portfolio Lap”**

![Hero](screenshots/shot1-race.png)

---

## The idea

A portfolio, re-imagined as a Formula 1 Grand Prix.

You arrive on the grid of a hand-shaped grand-prix circuit at golden hour — grandstands
packed with a bouncing crowd, flags waving, the start-light tower glowing red.
Lights out: you drive the **red #23 car** with an on-screen joystick 🕹️
(hold forward = throttle, drag sideways = steering), the holdable **DRIVE / BRAKE**
buttons, or plain **W/A/S/D**.

Ahead of you are **six rival cars**, each in its own livery, cruising the racing line.
Every rival carries a section of the portfolio — **About, Skills, Work, Journey,
Milestones, Contact**. Catch a car and pass it: the section unfolds trackside while
the race goes on around you. Someone overtakes you? Never happens — they’re slow.
(That part is intentional: the site *wants* you to win.)

Pass all six, cross the line, and the chequered flag falls: fireworks, confetti,
a P1 podium card — and links to GitHub, email, and this very repo.

**The race is the site. Finishing the lap *is* finishing the portfolio.**

## Why it’s built this way

Scrolling portfolios ask visitors to read. This one asks them to *drive*.
The six-section structure is identical to any portfolio site — but each section is
*earned* at 200 km/h, which makes it memorable. Devpost’s criteria (visual design,
creativity, user experience) are the exact design targets here:

- **Visual** — a fully procedural circuit with kerbs, guard-rails, gantries, a
  start/finish grid decal, five grandstands with ~7,000 instanced crowd members
  bouncing in the vertex shader, waving GLSL flags, drifting cloud bands in a
  gradient sky dome, PCF soft shadows that follow the car, ACES tone mapping,
  bloom, chromatic aberration/vignette speed grading, FXAA.
- **Creativity** — the overtake-to-unlock mechanic; the race *is* the nav bar
  (watch the right-edge rail fill in as you pass cars).
- **UX** — one input you already know how to use (a joystick), unless you prefer
  keys; the car gently lane-keeps when your hands are off; walls slide you back
  onto the circuit instead of killing your run; sound is synthesized live and can
  be muted from the pit radio button.

## Controls

| Input | Action |
| --- | --- |
| 🕹️ **Joystick** | hold **forward** = throttle · drag **left/right** = steer · pull **back** = brake |
| **DRIVE / BRAKE** buttons | hold to accelerate / brake |
| **W / ↑** · **S / ↓** | throttle / brake |
| **A / ←** · **D / →** | steering |
| First input | starts the race (lights out) |
| 🏁 chequered flag | appear only after you pass **all six** rivals |

## Tech list

- **Three.js** (r166) — scene graph, Catmull-Rom track spline, instanced crowd/rails/trees
- **Vite 5** — build & dev server (deploys at `/apex/`)
- **GLSL** — sky dome (gradient + sun + drifting procedural clouds), waving flags,
  crowd bounce injected via `onBeforeCompile`
- **Web Audio API** — fully synthesized engine note (RPM → oscillator frequencies,
  gear stepping), wind, crowd loops, air horn at the flag — zero audio files
- **EffectComposer** — UnrealBloom, custom speed-grade (chromatic aberration +
  vignette), FXAA, ACES output
- **Zero external assets** — every model (F1 cars, grandstands, light tower,
  gantries, start grid, kerbs) is built from primitives in code at load time

## Project layout

```
apex/
├─ index.html            # DOM: preloader, ignition card, HUD, panels, finish screen
├─ src/
│  ├─ style.css          # glass HUD, joysticks, panels, z-order contract
│  ├─ main.js            # renderer, game loop, drive model, rivals, overtakes, camera
│  ├─ data.js            # the six portfolio sections + rival liveries
│  ├─ world/
│  │  ├─ track.js        # Catmull-Rom circuit, kerbs, rails, gantries, grid decal
│  │  ├─ environment.js  # sky, sun/shadow rig, grandstands, crowd, flags, trees
│  │  └─ car.js          # procedural F1 car (wings, halo, wheels, driver)
│  ├─ core/
│  │  ├─ input.js        # joystick + hold buttons + keyboard → {throttle, steer}
│  │  ├─ audio.js        # synthesized engine / wind / crowd / horn
│  │  ├─ hud.js          # DOM drivers: speedo, rail, panels, toast, finish
│  │  └─ post.js         # bloom + grade + FXAA pipeline
│  └─ util/noise.js      # deterministic RNG + fbm (CPU) + shared GLSL noise
├─ screenshots/          # submission stills
├─ demo.mp4              # 1–5 min demo video for the submission
└─ vite.config.js        # base /apex/ (GitHub Pages), VERCEL=1 → /
```

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173/apex/
npm run build      # → dist/ (static, deployable anywhere)
```

## Deploy

Static `dist/` output. The repo ships a Pages deployment on branch `gh-pages`;
visit → **https://yashwanth07-debug.github.io/apex/**

## The portfolio family

This is the fourth browser-built 3D world in a touring series:

1. **STARJET** — interplanetary 3D voyage → [live](https://yashwanth07-debug.github.io/starjet-portfolio/)
2. **AURELIA** — floating-island sky chase → [live](https://yashwanth07-debug.github.io/aurelia-3d/)
3. **ABYSSA** — one scroll, 10,935 m of ocean → [live](https://yashwanth07-debug.github.io/abyssa/)
4. **APEX** — this circuit. 🏁

---

Built by **Yashwanth K.** · [github.com/yashwanth07-debug](https://github.com/yashwanth07-debug)
with Three.js, GLSL, procedural everything, and no asset downloads.
