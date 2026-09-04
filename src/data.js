// ── pilot + race content ──────────────────────────────────────────────────
export const PILOT = {
  name: 'Yashwanth K.',
  call: 'P23 · TEAM FRONTEND',
  tagline: 'A portfolio is a race: flat-out from the green light, or forget it.',
  intro: 'Strap in at Autodromo Nazionale Monza. This paddock rents itself to a developer who treats the browser as a circuit — every overtake is a section of his story.',
  introSub: 'HOLD THROTTLE FORWARD OR TOGGLE AUTO DRIVE TO LAUNCH',
  finishTitle: 'CHEQUERED FLAG',
  finishSub: 'Race complete — one flying lap around Monza 1998 is one lap of my career. Podium time.',
  finishNote: 'Every rival you passed carried a chapter of this portfolio. Revisit them, or run the lap again — fresh rubber, same hunger.',
};

// The six rivals — each carries a portfolio section. Order = pass order.
export const RIVALS = [
  {
    id: 'about', tag: 'ABOUT', livery: 0x14b8c4, liveryName: 'TEAL',
    carTag: 'CAR 07 · AQUAPORTO',
    sub: 'Who is driving the red car?',
    body: `I'm Yashwanth — a developer who builds 3D worlds in the browser.
      This circuit isn't a template: it's the fourth immersive site in a
      touring series — sky, space, deep ocean… and now, a Formula 1 paddock at Monza.`,
    facts: [
      ['ROLE', 'creative developer · 3D engineer'],
      ['HOME CIRCUIT', 'Hyderabad, India'],
      ['DRIVING STYLE', 'late braking into new tech'],
    ],
  },
  {
    id: 'skills', tag: 'SKILLS', livery: 0x3b82f6, liveryName: 'BLUE',
    carTag: 'CAR 11 · CELERIA',
    body: `Telemetry from the garage — the tools that stay glued at 300 km/h:`,
    bars: [
      ['THREE.JS / WEBGL', 94, 'scenes, shaders, instancing'],
      ['GLSL', 90, 'custom materials & noise'],
      ['JAVASCRIPT / TS', 92, 'engine-grade architecture'],
      ['WEB AUDIO', 82, 'procedural engines, ambience'],
      ['UI / MOTION', 87, 'interfaces that feel alive'],
    ],
    facts: [['TOP SPEED', 'prototype in a weekend'], ['COMPOUND', 'soft + sticky curiosity']],
  },
  {
    id: 'work', tag: 'WORK', livery: 0xff7a1a, liveryName: 'ORANGE',
    carTag: 'CAR 22 · SCUTO',
    body: `Silverware from the previous rounds — full-site builds, all live:`,
    links: [
      ['STARJET', 'Interplanetary 3D voyage — space-jet cockpit, five GLSL planets', 'https://yashwanth07-debug.github.io/starjet-portfolio/'],
      ['AURELIA', 'Sky-archipelago flight — floating worlds, airship chase-cam', 'https://yashwanth07-debug.github.io/aurelia-3d/'],
      ['ABYSSA', 'One scroll to the bottom of the ocean — 10,935 m of procedurally built sea', 'https://yashwanth07-debug.github.io/abyssa/'],
      ['THIS CAR', 'APEX — the Monza GP circuit you are driving right now', 'https://github.com/yashwanth07-debug/apex'],
    ],
  },
  {
    id: 'journey', tag: 'JOURNEY', livery: 0xa18cff, liveryName: 'VIOLET',
    carTag: 'CAR 33 · VELA',
    body: `Sector times from the garage walls — how a rookie season became a championship run:`,
    timeline: [
      ['LAP 00', 'First HTML page — discovered the web can be bent'],
      ['LAP 07', 'First WebGL shader compiles — flat feels illegal now'],
      ['LAP 22', 'Shipped first immersive 3D site; learned perf the hard way'],
      ['LAP 50', 'Full-scene pipelines: GLSL worlds, WebAudio synth, chase cams'],
      ['LAP ++', 'WebGPU, raymarching, bigger oceans, faster cars'],
    ],
  },
  {
    id: 'awards', tag: 'MILESTONES', livery: 0xf5c518, liveryName: 'GOLD',
    carTag: 'CAR 44 · STRADA',
    body: `Points on the board — not sponsored, all earned in the garage:`,
    timeline: [
      ['P1 ×3', 'Three hackathon entries designed, built & shipped solo'],
      ['4 WORLDS', 'Sky · Space · Ocean · Asphalt — one immersive series'],
      ['0 MB', 'No external models across the series — everything procedural'],
      ['60 FPS', 'Performance budget kept on mid-range hardware'],
    ],
  },
  {
    id: 'contact', tag: 'CONTACT', livery: 0xe8edf2, liveryName: 'WHITE',
    carTag: 'CAR 88 · CHRONO',
    sub: 'Open a radio channel — the pit wall is listening.',
    body: `The chequer is close. If you liked the drive, the garage door is open:`,
    links: [
      ['GITHUB', 'yashwanth07-debug', 'https://github.com/yashwanth07-debug'],
      ['EMAIL', 'open a channel →', 'mailto:yashwanth07-debug@users.noreply.github.com'],
      ['APEX REPO', 'fork this circuit', 'https://github.com/yashwanth07-debug/apex'],
    ],
  },
];
