# DEVPOST SUBMISSION COPY — APEX · GRAND PRIX

Copy-paste sections for the 3D Websites Hackathon submission form.

---

## Project name

APEX · GRAND PRIX — the portfolio you win by driving

## Tagline

An F1 Grand Prix where every overtake unlocks a chapter of the developer's story — pass six cars, take the chequered flag, see the whole portfolio.

## Live project link

https://yashwanth07-debug.github.io/apex/

## Video (1–5 min)

`demo.mp4` in the repo root (upload to Devpost video field or a video host of choice).
Watch the live site with sound on — the engine note is synthesized in Web Audio.

## Screenshots (≥3)

In `screenshots/`:
1. `shot1-race.png` — chase-cam racing down the main straight
2. `shot2-grandstand.png` — start grid, grandstand and bouncing crowd
3. `shot3-overtake.png` — overtake panel unlocking the WORK section
4. `shot4-finish.png` — chequered flag + P1 podium
5. `shot5-mobile.png` — joystick control on a phone-sized viewport

## Source code

https://github.com/yashwanth07-debug/apex

## Inspiration

This hackathon's last three rounds turned my own portfolio into three browser-built
worlds — a sky archipelago, a space voyage, and a 10,935 m ocean descent. For the
final round I wanted the portfolio itself to become **a race you have to win**:
six rival cars instead of six page sections, and a chequered flag instead of a
footer. Formula 1 gave me the mechanics: a grid, rivals to hunt, overtakes, and a
finish line that only falls when the work is done.

## What it does

You control the red #23 F1 car with an on-screen joystick 🕹️ (hold forward to
drive, drag sideways to steer — W/A/S/D works too). Six slow rivals cruise the
racing line, each carrying one portfolio section — About, Skills, Work, Journey,
Milestones, Contact. Passing a rival opens its section trackside as the race
continues. Pass all six and cross the line: confetti, fireworks, chequered flag,
P1 podium, and the links that matter (GitHub / email / this repo).

The race *is* the website: it ends when you finish.

## How I built it

Everything is procedural — no model or texture downloads anywhere in the build:

- Circuit from a Catmull-Rom spline (2,000 samples): extruded asphalt ribbon,
  red-white kerb strips, painted edge lines, a canvas-textured start grid,
  guard rails (instanced), overhead sponsor gantries, and a start-light tower
  whose bulbs go green when the race begins.
- Five grandstands, each with tiered concrete, roof, and an instanced crowd
  (thousands of capsules) that *bounces in the vertex shader* via
  `onBeforeCompile` injection — the stadium literally cheers as you pass.
- Sky dome shader: zenith→horizon gradient, sun disc with halo, drifting fbm
  cloud bands; matching scene fog + directional shadow rig that follows the car.
- Procedural F1 cars from ~40 primitives each — nose, floor, sidepods, halo,
  front/rear wings, wheels that spin and steer, driver + hands — in seven liveries.
- Arcade drive model: throttle curve, gear stepping from velocity, off-track
  (grass) penalty, wall slide-and-aim recovery, soft lane-keep assist; rivals
  follow the racing line with mild weaving.
- Chase camera with speed-widened FOV, velocity shimmer, and off-track rumble.
- Post pipeline: UnrealBloom + custom chromatic-aberration/vignette speed grade +
  FXAA + ACES filmic output.
- Web Audio synthesis for engine (RPM→oscillator mapping), wind, crowd loops and
  an air horn at the flag — no audio files.
- DOM/UX: glass HUD (speedo, RPM bar, zone kicker, overtake rail), glass panels
  per section, toasts, marquee ticker; z-ordered so the joystick always stays
  reachable.

Stack: **Three.js (r166), Vite 5, GLSL, Web Audio API, vanilla JS/CSS**.

## Challenges I ran into

- Building a believable circuit start-to-finish without assets: the track ribbon,
  kerbs and decals were originally winding backwards (invisible from above!) —
  diagnosed via headless-Chrome screenshots and fixed by vertex-order/DoubleSide
  passes.
- Headless QA at ~1 fps (SwiftShader): I added deterministic sim-step hooks
  (`__APEX.tick`) and autopiloted the car around a full lap in CI-style probes to
  verify overtakes, panels, lap logic and the finish gate.
- Mobile ergonomics: the ignition card initially swallowed joystick taps — fixed
  with a strict z-order contract and pointer-capture on the pad.

## What I learned

Shaders are the cheapest actors in the world: a whole cheering stadium costs one
InstancedMesh and six lines of GLSL. Also, a racing line is just a Catmull-Rom
curve — but making a *game feel* fair (wall slide instead of wall death, lane-keep
assist, slow rivals) is 90% of the work.

## What's next

Pit-lane fast travel between sections, photo finish (slow-mo replay of your last
overtake), and a shared leaderboard for fastest lap — if the hackathon had a
caster mode, this would be the broadcast.

## Eligibility / licensing note

Built during the submission window. All assets procedural; no paid or
rights-restricted content. MIT licensed source.
