import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { PILOT, RIVALS } from './data.js';
import { buildTrack, TRACK_HALF } from './world/track.js';
import { buildEnvironment } from './world/environment.js';
import { buildF1 } from './world/car.js';
import { loadFerrari, buildFerrari } from './world/ferrari.js';
import { loadMonzaWorld } from './world/monza.js';
import { buildPost } from './core/post.js';
import { RaceAudio } from './core/audio.js';
import { buildInput } from './core/input.js';
import { HUD } from './core/hud.js';

// ?lite=1 → fast path for low-power devices
const LITE = new URLSearchParams(location.search).has('lite');

const canvas = document.getElementById('track');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: !LITE, powerPreference: 'high-performance' });
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.94;
renderer.shadowMap.enabled = !LITE;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const pixelRatio = LITE ? 1 : Math.min(devicePixelRatio, 1.75);
renderer.setPixelRatio(pixelRatio);
renderer.setSize(innerWidth, innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(62, innerWidth / innerHeight, 0.4, 45000);
camera.position.set(0, 30, 60);
scene.add(camera);

// subtle env reflections for car paint
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

let started = false, finished = false;
let autoDrive = false;

const audio = new RaceAudio();
let hud;
hud = new HUD({
  onBegin() {
    started = true;
    hud.liftVeil();
    if (envApi) envApi.lightsOut();
    try { audio.start(); } catch (e) { console.warn('[APEX] silent:', e && e.message); }
  },
  onBeginAuto() {
    autoDrive = true;
    hud.setAutoDrive(true);
  },
  onAudio: () => audio.toggle(),
  onAgain() { resetRace(); },
  onAutoDrive() {
    autoDrive = !autoDrive;
    hud.setAutoDrive(autoDrive);
    if (autoDrive && !started) {
      hud.startRace();
    }
  },
});

// ── world ───────────────────────────────────────────────────────────────────
let trackApi, envApi, postApi, hero, rivals = [], confetti;
const input = buildInput({
  onFirstEngage: () => {
    if (!started) hud.startRace();
  },
});

const player = {
  pos: new THREE.Vector3(), heading: 0, speed: 0,
  prevIdx: 0, idx: 0, off: 0, gear: 1, rpm: 0, completions: 0, lapLiveFrom: 0,
};

const GEARS = [0, 14, 25, 36, 48, 58, 68, 78, 999]; // m/s breakpoints
const MAX_SPEED = 82; // ~295 km/h at Monza

const confettiState = [];

// ── instant boot: circuit + environment + kit car ready in ~1s ─────────────
async function build() {
  const steps = [
    ['Laying Monza asphalt', () => { trackApi = buildTrack(scene); }],
    ['Setting the scene', () => { envApi = buildEnvironment(scene, trackApi); }],
    ['Building the grid', () => {
      hero = buildF1({ paint: 0xe1141e, number: 23 }); // red car
      scene.add(hero);
      for (let i = 0; i < RIVALS.length; i++) {
        const c = buildF1({ paint: RIVALS[i].livery, number: 20 + i * 7 });
        scene.add(c);
        rivals.push({
          mesh: c, rid: RIVALS[i].id, data: RIVALS[i],
          idx: 0, speed: 0, baseSpeed: 7.0 + i * 0.8,
          phase: i, done: false, lane: (i % 2 === 0 ? -1 : 1) * 2.8,
        });
      }
      resetRace();
    }],
    ['Charging post FX', () => {
      if (LITE) {
        postApi = { setSpeed() {}, setSize() {}, render() { renderer.render(scene, camera); } };
      } else {
        try {
          postApi = buildPost(renderer, scene, camera);
          postApi.setSize(innerWidth, innerHeight, pixelRatio);
        } catch (err) {
          console.warn('[APEX] post FX direct render fallback', err && err.message);
          postApi = { setSpeed() {}, setSize() {}, render() { renderer.render(scene, camera); } };
        }
      }
    }],
  ];
  for (let i = 0; i < steps.length; i++) {
    try { steps[i][1](); } catch (err) { console.error(`[APEX] build "${steps[i][0]}"`, err); throw err; }
    hud.preloader((i + 1) / steps.length, i === steps.length - 1);
    await new Promise(r => requestAnimationFrame(r));
    await new Promise(r => setTimeout(r, 80));
  }
  window.__APEX.ready = true;
  requestAnimationFrame(loop);
  loadEnhancements();
}

// background asset streaming
const loads = { monza: -1, ferrari: -1 };
function syncLoadPill() {
  const bits = [];
  if (loads.monza >= 0) bits.push(`MONZA 1998 ${Math.round(loads.monza * 100)}%`);
  if (loads.ferrari >= 0) bits.push(`FERRARI ${Math.round(loads.ferrari * 100)}%`);
  if (bits.length) hud.loading(bits.join(' · '));
  else hud.loadingDone();
}

function loadEnhancements() {
  loads.monza = 0; loads.ferrari = 0; syncLoadPill();
  loadMonzaWorld((f) => { loads.monza = f; syncLoadPill(); })
    .then((monzaScene) => {
      scene.add(monzaScene);
      console.log('[APEX] Monza 1998 3D environment added');
    })
    .catch((err) => console.warn('[APEX] Monza 3D unavailable:', err && err.message))
    .finally(() => { loads.monza = -1; syncLoadPill(); });

  loadFerrari((f) => { loads.ferrari = f; syncLoadPill(); })
    .then((gltf) => {
      const f = buildFerrari(gltf);
      f.position.copy(hero.position);
      f.rotation.copy(hero.rotation);
      scene.remove(hero);
      scene.add(f);
      hero = f;
      if (!started) placeCarOnTrack(player, player.idx, player.off, hero);
      console.log('[APEX] Ferrari F1 2019 loaded');
    })
    .catch((err) => console.warn('[APEX] Ferrari unavailable:', err && err.message))
    .finally(() => { loads.ferrari = -1; syncLoadPill(); });
}

function resetRace() {
  finished = false;
  hud.hideFinish();
  player.idx = 36; player.prevIdx = 36;
  placeCarOnTrack(player, player.idx, 2.2, hero);
  player.speed = 0; player.heading = player.heading || 0;

  // Stagger rivals along the 6 sectors of Monza
  const rivalIndices = [160, 480, 820, 1180, 1520, 1820];
  rivals.forEach((r, i) => {
    r.done = false; r.speed = 0;
    r.idx = rivalIndices[i] || (player.idx + 180 * (i + 1));
    r.targetSpeed = r.baseSpeed;
    placeCarOnTrack(r, r.idx, r.lane, r.mesh);
  });
  rivals.sort((a, b) => a.idx - b.idx);
  player.completions = 0;
  hud.initRail();
  document.querySelectorAll('#rail .r-stop').forEach(el => el.classList.remove('done', 'next'));
  hud.initRail();
}

const _at = {};
function placeCarOnTrack(vehicle, idx, lane, mesh) {
  trackApi.at(idx, _at);
  mesh = mesh || hero;
  mesh.position.copy(_at.point).addScaledVector(_at.left, lane);
  mesh.position.y = _at.point.y + (mesh.userData.rideHeight ?? 0.27);
  const yaw = Math.atan2(_at.tangent.x, _at.tangent.z);
  mesh.rotation.set(0, yaw, 0);
  if (vehicle === player) {
    player.pos.copy(mesh.position);
    player.heading = yaw;
    player.prevIdx = idx;
    player.off = lane;
  } else {
    vehicle.pos = vehicle.pos || new THREE.Vector3();
    vehicle.pos.copy(mesh.position);
  }
}

// ── drive model ────────────────────────────────────────────────────────────
const _dAt = {};
const _aheadAt = {};
const _cornerAt = {};

function stepPlayer(dt) {
  let t = input.throttle;
  let s = input.steer;

  // ── AUTO DRIVE AI CONTROLLER ─────────────────────────────────────────────
  if (autoDrive) {
    // 1. Curvature lookahead to pace entry speed before chicanes
    let maxTurnAngle = 0;
    trackApi.at(player.idx, _dAt);
    for (let offset = 6; offset <= 45; offset += 3) {
      trackApi.at(player.idx + offset, _cornerAt);
      const ang = _dAt.tangent.angleTo(_cornerAt.tangent);
      if (ang > maxTurnAngle) maxTurnAngle = ang;
    }

    let targetSpeed = 80; // flat-out on Monza straights
    if (maxTurnAngle > 0.55) targetSpeed = 36; // tight chicane (Variante del Rettifilo)
    else if (maxTurnAngle > 0.32) targetSpeed = 50; // medium chicane (Variante della Roggia)
    else if (maxTurnAngle > 0.16) targetSpeed = 64; // sweeping corners

    if (player.speed < targetSpeed - 1.5) {
      t = 1.0;
    } else if (player.speed > targetSpeed + 2.0) {
      t = -0.95; // firm braking
    } else {
      t = 0.22;
    }

    // 2. Overtake lane selection
    let targetLane = 0;
    const n = trackApi.pts.length;
    const nextRival = rivals.find(r => !r.done);
    if (nextRival) {
      let rIdxDiff = (nextRival.idx - player.idx) % n;
      if (rIdxDiff < 0) rIdxDiff += n;
      if (rIdxDiff < 150) {
        targetLane = nextRival.lane > 0 ? -2.4 : 2.4;
      }
    }

    const sp = Math.abs(player.speed);
    const lookAheadPts = Math.max(5, Math.round(sp * 0.28));
    trackApi.at(player.idx + lookAheadPts, _aheadAt);

    const targetPoint = _aheadAt.point.clone().addScaledVector(_aheadAt.left, targetLane);
    const targetYaw = Math.atan2(targetPoint.x - player.pos.x, targetPoint.z - player.pos.z);
    let dy = targetYaw - player.heading;
    dy -= Math.round(dy / (Math.PI * 2)) * Math.PI * 2;
    player.heading += dy * Math.min(1, dt * 9.5);
  }

  // acceleration
  const fwd = player.speed >= -0.5 ? 1 : -1;
  let accel;
  if (t > 0) {
    const curving = 1.15 - Math.max(0, Math.min(1, Math.abs(player.speed) / MAX_SPEED)) * 0.55;
    accel = 19.5 * t * curving * fwd;
  } else {
    accel = t * (player.speed > 0.5 ? 46 : 14);
  }
  accel -= Math.sign(player.speed) * (0.35 + player.speed * player.speed * 0.00032);
  player.speed += accel * dt;

  // off-track physics
  let offTrack = false;
  if (trackApi) {
    player.idx = trackApi.nearest(player.prevIdx, player.pos);
    trackApi.at(player.idx, _dAt);
    const dLat = player.pos.clone().sub(_dAt.point).dot(_dAt.left);
    const absLat = Math.abs(dLat);
    offTrack = absLat > TRACK_HALF + 0.4;

    // smooth barrier deflection (no violent snapping)
    if (absLat > TRACK_HALF + 1.2) {
      const clampd = Math.sign(dLat) * (TRACK_HALF + 1.2);
      player.pos.copy(_dAt.point).addScaledVector(_dAt.left, clampd);
      player.speed = THREE.MathUtils.clamp(player.speed * (1 - 0.4 * dt), -10, 52);
      const wallYaw = Math.atan2(_dAt.tangent.x, _dAt.tangent.z);
      let dy = wallYaw - player.heading;
      dy -= Math.round(dy / (Math.PI * 2)) * Math.PI * 2;
      player.heading += dy * Math.min(1, dt * 3.5);
      offTrack = false;
    } else if (offTrack) {
      const cap = 28;
      if (player.speed > cap) player.speed = THREE.MathUtils.clamp(player.speed - 22 * dt, cap, 999);
      player.speed -= player.speed * 0.7 * dt;
    }

    if (autoDrive) {
      let targetLane = 0;
      const nextRival = rivals.find(r => !r.done);
      if (nextRival) {
        let rIdxDiff = (nextRival.idx - player.idx) % trackApi.pts.length;
        if (rIdxDiff < 0) rIdxDiff += trackApi.pts.length;
        if (rIdxDiff < 150) targetLane = nextRival.lane > 0 ? -2.4 : 2.4;
      }
      player.pos.addScaledVector(_dAt.left, -(dLat - targetLane) * Math.min(1, dt * 3.5));
    }
    player.prevIdx = player.idx;
  }

  // MANUAL TRACK ASSIST
  const sp0 = Math.abs(player.speed);
  if (!autoDrive) {
    if (sp0 > 5 && Math.abs(s) < 0.2) {
      const look = Math.round(8 + sp0 * 0.25);
      trackApi.at(player.idx + look, _aheadAt);
      const yawT = Math.atan2(_aheadAt.point.x - player.pos.x, _aheadAt.point.z - player.pos.z);
      let dy0 = yawT - player.heading;
      dy0 -= Math.round(dy0 / (Math.PI * 2)) * Math.PI * 2;
      player.heading += dy0 * Math.min(1, dt * 2.8);
      const lat = player.pos.clone().sub(_dAt.point).dot(_dAt.left);
      player.pos.addScaledVector(_dAt.left, -lat * Math.min(1, dt * 1.2));
    }

    const sp = sp0;
    const steerAuthority = (0.95 / (1 + sp * 0.05)) * Math.min(1, sp / 5);
    player.heading -= s * steerAuthority * 2.5 * dt * Math.sign(player.speed || 1);
  }

  const dirX = Math.sin(player.heading), dirZ = Math.cos(player.heading);
  player.pos.x += dirX * player.speed * dt;
  player.pos.z += dirZ * player.speed * dt;

  // snap to track elevation
  if (trackApi) {
    const h = trackApi.heightAt(player.idx);
    player.pos.y += (h + (hero.userData.rideHeight ?? 0.27) - player.pos.y) * Math.min(1, dt * 10);
  }

  // gear + rpm
  for (let g = 1; g < GEARS.length; g++) {
    if (Math.abs(player.speed) < GEARS[g]) { player.gear = Math.max(1, g); break; }
  }
  const lo = GEARS[player.gear - 1], hi = GEARS[player.gear];
  player.rpm = THREE.MathUtils.clamp((Math.abs(player.speed) - lo) / Math.max(1, hi - lo), 0, 1);

  return offTrack;
}

// ── rivals: paced racing line ──────────────────────────────────────────────
function stepRivals(dt, t) {
  const n = trackApi.pts.length;
  for (const r of rivals) {
    r.idx = r.idx + (r.targetSpeed * dt / trackApi.LEN) * n;
    trackApi.at(r.idx, _dAt);
    r.mesh.position.copy(_dAt.point).addScaledVector(_dAt.left, r.lane + Math.sin(t * 0.7 + r.phase) * 0.5);
    r.mesh.position.y = _dAt.point.y + 0.27;
    const yaw = Math.atan2(_dAt.tangent.x, _dAt.tangent.z);
    r.mesh.rotation.set(0, yaw, 0);
    r.userData = r.userData || {};
    const rot = r.targetSpeed * dt / 0.34;
    r.mesh.userData.spin(rot, 0);
    r.worldT = r.idx / n;
  }
}

// overtake detection
let globalT = 0;
function checkOvertakes() {
  const n = trackApi.pts.length;
  const pT = player.idx / n;
  for (const r of rivals) {
    if (r.done) continue;
    const rT = ((r.idx % n) + n) % n / n;
    let d = rT - pT;
    d -= Math.round(d);
    if (Math.abs(d) < 0.006 && !finished && player.speed > 12) {
      const dx = r.mesh.position.x - player.pos.x;
      const dz = r.mesh.position.z - player.pos.z;
      const hdX = Math.sin(player.heading), hdZ = Math.cos(player.heading);
      const ahead = dx * hdX + dz * hdZ > -8;
      if (dx * dx + dz * dz < 80 * 80 && ahead) {
        r.done = true;
        hud.markRival(r.rid);
        hud.openPanel(r.data);
        hud.toast(`OVERTAKE · ${r.data.tag} (${rivals.filter(v => v.done).length}/6)`, 2000);
        audio.shift();
        try { audio.cheer(); } catch {}
      }
    }
  }
}

// finish handler
function checkFinish() {
  const n = trackApi.pts.length;
  const pT = player.idx / n;
  for (const c of [player]) {
    if (!c._lastT) { c._lastT = pT; return; }
    if (c._lastT > 0.86 && pT < 0.14 && !finished) {
      player.completions++;
      const allPassed = rivals.every(r => r.done);
      if (allPassed || player.completions >= 1) {
        rivals.forEach(r => { r.done = true; hud.markRival(r.rid); });
        finished = true;
        audio.horn();
        launchConfetti();
        setTimeout(() => hud.showFinish(), 1200);
        document.querySelectorAll('#rail .r-stop').forEach(el => el.classList.add('done'));
      }
    }
    c._lastT = pT;
  }
}

function launchConfetti() {
  const count = 1400;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const c = new THREE.Color();
  const palette = [0xff1e2d, 0xfff2f2, 0xf5c518, 0x6fd8ff, 0x2fd27a, 0xffffff];
  const cx = player.pos.x, cy = player.pos.y, cz = player.pos.z;
  for (let i = 0; i < count; i++) {
    pos[i * 3] = cx + (Math.random() - 0.5) * 240;
    pos[i * 3 + 1] = cy + 8 + Math.random() * 80;
    pos[i * 3 + 2] = cz + (Math.random() - 0.5) * 240;
    c.set(palette[Math.floor(Math.random() * palette.length)]);
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  if (confetti) { scene.remove(confetti); confetti.geometry.dispose(); confetti.material.dispose(); }
  confetti = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.5, vertexColors: true, transparent: true, opacity: 0.95, depthWrite: false }));
  scene.add(confetti);
  confettiState.length = 0;
  for (let i = 0; i < count; i++) confettiState.push({ v: 2.5 + Math.random() * 5, ph: Math.random() * 6.28 });
}

function stepConfetti(dt, t) {
  if (!confetti) return;
  const pos = confetti.geometry.attributes.position;
  for (let i = 0; i < confettiState.length; i++) {
    const s = confettiState[i];
    pos.array[i * 3 + 1] -= s.v * dt;
    pos.array[i * 3] += Math.sin(t * 3 + s.ph) * dt * 3.4;
    pos.array[i * 3 + 2] += Math.cos(t * 2.4 + s.ph) * dt * 2.6;
    if (pos.array[i * 3 + 1] < player.pos.y) pos.array[i * 3 + 1] = player.pos.y + 90 * Math.random();
  }
  pos.needsUpdate = true;
}

// ── camera: chase with smooth FOV ──────────────────────────────────────────
const camTarget = new THREE.Vector3();
const camPos = new THREE.Vector3(0, 30, 60);
let camYaw = 0;
function stepCamera(dt, off) {
  const backDist = 11.5 + Math.abs(player.speed) * 0.06;
  const height = 4.4 + Math.abs(player.speed) * 0.02;
  const yaw = player.heading;
  camYaw += angLerp(yaw, camYaw, Math.min(1, dt * 4.2));
  const cx = Math.sin(camYaw), cz = Math.cos(camYaw);
  const ideal = new THREE.Vector3(
    player.pos.x - cx * backDist,
    player.pos.y + height,
    player.pos.z - cz * backDist,
  );
  camPos.lerp(ideal, Math.min(1, dt * 5.5));
  const shake = (off.shake ? 0.16 : 0.03) * (0.5 + Math.abs(player.speed) / MAX_SPEED);
  camPos.x += Math.sin(globalT * 31) * shake;
  camPos.y += Math.cos(globalT * 38) * shake * 0.6;
  camera.position.copy(camPos);
  camTarget.copy(player.pos).addScaledVector(new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw)), 9).add(new THREE.Vector3(0, 1.6, 0));
  camera.lookAt(camTarget);
  camera.fov += ((60 + Math.abs(player.speed) / MAX_SPEED * 14) - camera.fov) * Math.min(1, dt * 3);
  camera.updateProjectionMatrix();
}
function angLerp(target, current, k) {
  let d = target - current;
  d -= Math.round(d / (Math.PI * 2)) * Math.PI * 2;
  return d * k;
}

// ── HUD zone names ──────────────────────────────────────────────────────────
function zoneFor(pT) {
  if (pT < 0.05) return ['RETTIFILO TRIBUNE', 'Monza pit straight — launch into Variante'];
  const next = rivals.find(r => !r.done);
  if (!next) return ['PARABOLICA RUN', 'Chequered flag ahead — full throttle to the line'];
  return [`HUNTING ${next.data.tag}`, `${next.data.carTag} · section ${rivals.filter(r => r.done).length + 1} of 6`];
}

function dressHero(dt, off) {
  const rot = player.speed * dt / 0.34;
  hero.userData.spin(rot, -input.steer * 0.8 * Math.min(1, Math.abs(player.speed) / 20));
  hero.position.copy(player.pos);
  hero.rotation.y = player.heading;
  hero.rotation.x = THREE.MathUtils.clamp(-input.throttle * Math.abs(player.speed) * 0.0009 - (player.speed > 0 ? 0.006 : 0), -0.05, 0.01);
  hero.rotation.z = THREE.MathUtils.clamp(input.steer * Math.abs(player.speed) * 0.0012, -0.06, 0.06);
  if (hero.userData.shimmer) {
    hero.userData.shimmer.material.opacity = Math.min(0.7, Math.abs(input.throttle) * Math.abs(player.speed) * 0.015 + 0.08);
  }
}

// ── main loop ───────────────────────────────────────────────────────────────
const clock = new THREE.Clock();
let timeScale = 1, tSim = 0;
let offNoise = { shake: false };

function simStep(dt) {
  tSim += dt;
  globalT = tSim;
  const t = tSim;
  let off = false;
  if (trackApi) {
    if (started && !finished) off = stepPlayer(dt);
    if (started) { stepRivals(dt, t); checkOvertakes(); checkFinish(); }
    dressHero(dt, off);
    if (!started) {
      const a = t * 0.12;
      const c = hero.position;
      camera.position.set(c.x + Math.sin(a) * 30, c.y + 8.5, c.z + Math.cos(a) * 30);
      camera.lookAt(c.x, c.y + 1.4, c.z);
      camera.fov += (58 - camera.fov) * Math.min(1, dt * 2);
      camera.updateProjectionMatrix();
    } else stepCamera(dt, offNoise = { shake: off });
    stepConfetti(dt, t);
    envApi.followShadow(hero.position, null);
    envApi.update(t, camera.position);
    postApi.setSpeed(Math.min(1, Math.abs(player.speed) / MAX_SPEED));
  }
}

function hudSync() {
  const pT = trackApi ? player.idx / trackApi.pts.length : 0;
  const [zone, sub] = zoneFor(pT);
  hud.update({
    speed: player.speed, gear: player.gear, rpm: player.rpm,
    lap: Math.min(1, player.completions + 1), finished, zone, zoneSub: sub,
  });
  if (started && audio.ctx) {
    const near = rivals.reduce((mn, r) => Math.min(mn, r.mesh.position.distanceTo(player.pos)), 999);
    audio.update(player.speed, player.rpm, player.gear, near < 90 ? 1 : 0.3, tSim);
  }
}

let captureMode = false;
function loop() {
  requestAnimationFrame(loop);
  if (captureMode) return;
  const dt = Math.min(clock.getDelta(), 0.066) * timeScale;
  simStep(dt);
  hudSync();
  if (postApi) postApi.render();
  else renderer.render(scene, camera);
}

function applySize() {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(pixelRatio);
  if (postApi) postApi.setSize(innerWidth, innerHeight, pixelRatio);
}
addEventListener('resize', applySize);

// QA + automation API
window.__APEX = {
  ready: false,
  slowmo(x) { timeScale = x; },
  start() { hud.startRace(); },
  autoDrive(on = true) {
    autoDrive = !!on;
    hud.setAutoDrive(autoDrive);
    if (autoDrive && !started) hud.startRace();
  },
  setThrottle(v) { input.throttle = v; },
  setSteer(v) { input.steer = v; },
  teleportFrac(f) {
    const n = trackApi.pts.length;
    player.idx = Math.floor(f * n);
    placeCarOnTrack(player, player.idx, 2.2, hero);
    player.speed = 44;
  },
  state() { return { speed: player.speed, pT: player.idx / trackApi.pts.length, finished, done: rivals.filter(r => r.done).length, autoDrive }; },
  debug() {
    trackApi.at(player.idx, _dAt);
    const dLat = player.pos.clone().sub(_dAt.point).dot(_dAt.left);
    return { th: +input.throttle.toFixed(2), st: +input.steer.toFixed(2), started, idx: player.idx, dLat: +dLat.toFixed(2), yaw: +Math.atan2(_dAt.tangent.x, _dAt.tangent.z).toFixed(2), hd: +player.heading.toFixed(2), pos: player.pos.toArray().map(v => +v.toFixed(1)) };
  },
  veil() { hud.liftVeil(); },
  capture(on) { captureMode = !!on; },
  renderFrame() {
    simStep(0);
    hudSync();
    if (postApi) postApi.render();
    else renderer.render(scene, camera);
  },
  tick(sec = 1) {
    const h = 1 / 60;
    const steps = Math.max(1, Math.round(sec / h));
    for (let i = 0; i < steps; i++) { simStep(h); }
    hudSync();
  },
};

build();
