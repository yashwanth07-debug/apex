import * as THREE from 'three';
import { RNG, fbm } from '../util/noise.js';
import { MONZA_TRACK_PTS, MONZA_BASE_Y } from './monza-track-data.js';

// ── APEX · Autodromo Nazionale Monza 1998 Grand Prix layout ───────────────
// Control points + terrain heights are baked from the Monza 1998 3D model.
export const MONZA_MODE = true;
export const TRACK_HALF = 7.2;          // asphalt half-width
const PTS = MONZA_TRACK_PTS;

const SAMPLES = 2000;

export function buildTrack(scene) {
  const curve = new THREE.CatmullRomCurve3(PTS.map(p => new THREE.Vector3(...p)), true, 'centripetal', 0.5);
  const pts = curve.getSpacedPoints(SAMPLES).slice(0, SAMPLES);
  const LEN = curve.getLength();

  const group = new THREE.Group();
  scene.add(group);

  // ── Monza fallback floor: a flat Monza-park meadow under the circuit so
  //    the world is never an empty void while (or if) the Monza terrain loads.
  const cx = PTS.reduce((s, p) => s + p[0], 0) / PTS.length;
  const cz = PTS.reduce((s, p) => s + p[2], 0) / PTS.length;
  const fGeo = new THREE.CircleGeometry(6500, 72);
  fGeo.rotateX(-Math.PI / 2);
  fGeo.translate(cx, 0, cz);
  const floor = new THREE.Mesh(fGeo, new THREE.MeshStandardMaterial({ color: 0x274526, roughness: 0.98, metalness: 0 }));
  floor.position.y = (MONZA_BASE_Y ?? 5.0) - 2.5;
  floor.receiveShadow = true;
  group.add(floor);

  // ── asphalt ribbon (arclength table keeps UVs honest) ───────────────────
  const track = new THREE.BufferGeometry();
  const pos = [], nrm = [], uvs = [], colr = [];
  const left = new THREE.Vector3(), tan = new THREE.Vector3();
  const n = pts.length;
  for (let i = 0; i <= n; i++) {
    const j = i % n;
    const p = pts[j];
    const p2 = pts[(j + 1) % n], p0 = pts[(j - 1 + n) % n];
    tan.subVectors(p2, p0).normalize();
    left.crossVectors(new THREE.Vector3(0, 1, 0), tan).normalize();
    const lat = fbCam(p, left);
    for (const side of [-1, 1]) {
      const v = p.clone().addScaledVector(left, side * TRACK_HALF);
      pos.push(v.x, v.y + 0.02, v.z);
      nrm.push(0, 1, 0);
      const w = 0.5 + side * 0.5;
      uvs.push(i / n * LEN / 26, w);
      const sh = 0.9 + lat * 0.07;
      colr.push(0.088 * sh, 0.092 * sh, 0.098 * sh);
    }
  }
  const idx = [];
  for (let i = 0; i < n; i++) {
    const a = i * 2, b = i * 2 + 1, c = i * 2 + 2, d = i * 2 + 3;
    idx.push(a, b, c, b, d, c);
  }
  track.setIndex(idx);
  track.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  track.setAttribute('normal', new THREE.Float32BufferAttribute(nrm, 3));
  track.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  track.setAttribute('color', new THREE.Float32BufferAttribute(colr, 3));
  const asphalt = new THREE.Mesh(track, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.94, metalness: 0.02, side: THREE.DoubleSide }));
  asphalt.receiveShadow = true;
  group.add(asphalt);

  function fbCam(p, l) {
    return fbm(p.x * 0.01, p.z * 0.01, 3) - 0.5;
  }

  // ── kerbs: red/white striped shoulders, both sides ──────────────────────
  buildKerbs(pts, group, -1);
  buildKerbs(pts, group, +1);

  // ── centre line + white edge lines + start/finish grid ──────────────────
  buildPaintedLines(pts, group);
  buildStartGrid(pts, group);

  // ── guard rails + tyre bundles on the outside of fast corners ───────────
  buildRails(pts, group);

  const api = {
    pts, LEN, curve,
    // nearest track param for an arbitrary world position (hinted walk)
    nearest(hint, pos2) {
      const n2 = pts.length;
      let best = hint, bestD = Infinity;
      for (let k = -80; k <= 80; k += 4) {
        const j = ((hint + k) % n2 + n2) % n2;
        const d = pts[j].distanceToSquared(pos2);
        if (d < bestD) { bestD = d; best = j; }
      }
      // refine
      for (let k = -3; k <= 3; k++) {
        const j = ((best + k) % n2 + n2) % n2;
        const d = pts[j].distanceToSquared(pos2);
        if (d < bestD) { bestD = d; best = j; }
      }
      return best;
    },
    at(idx2, out = {}) {
      const n2 = pts.length;
      const i = Math.floor(idx2);
      const j = ((i % n2) + n2) % n2;
      const p2 = pts[(j + 1) % n2], p0 = pts[(j - 1 + n2) % n2];
      out.point = pts[j];
      out.tangent = out.tangent || new THREE.Vector3();
      out.tangent.subVectors(p2, p0).normalize();
      out.left = out.left || new THREE.Vector3();
      out.left.crossVectors(new THREE.Vector3(0, 1, 0), out.tangent).normalize();
      out.frac = i / n2;
      return out;
    },
    heightAt(idx2) { const n3 = pts.length, i = Math.floor(idx2); return pts[((i % n3) + n3) % n3].y; },
  };
  return api;
}

function kerbStrip(pts, group, side, colorA, colorB) {
  const geo = new THREE.BufferGeometry();
  const pos = [], nrm = [], col = [];
  const left = new THREE.Vector3(), tan = new THREE.Vector3(), c = new THREE.Color();
  const n = pts.length;
  for (let i = 0; i <= n; i++) {
    const j = i % n;
    const p = pts[j], p2 = pts[(j + 1) % n], p0 = pts[(j - 1 + n) % n];
    tan.subVectors(p2, p0).normalize();
    left.crossVectors(new THREE.Vector3(0, 1, 0), tan).normalize();
    const a = p.clone().addScaledVector(left, side * TRACK_HALF);
    const b = p.clone().addScaledVector(left, side * (TRACK_HALF + 1.6));
    pos.push(a.x, a.y + 0.03, a.z, b.x, b.y + 0.05, b.z);
    nrm.push(0, 1, 0, 0, 1, 0);
    c.set(i % 8 < 4 ? colorA : colorB);
    col.push(c.r, c.g, c.b, c.r, c.g, c.b);
  }
  const idx = [];
  for (let i = 0; i < n; i++) {
    const a = i * 2, b = i * 2 + 1, c2 = i * 2 + 2, d = i * 2 + 3;
    idx.push(a, b, c2, b, d, c2);
  }
  geo.setIndex(idx);
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(nrm, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.85, side: THREE.DoubleSide }));
  m.receiveShadow = true;
  group.add(m);
}
function buildKerbs(pts, group, side) { kerbStrip(pts, group, side, 0xd11d2a, 0xf2f4f6); }

function buildPaintedLines(pts, group) {
  for (const side of [-1, 1]) {
    const geo = new THREE.BufferGeometry();
    const pos = [], nrm = [];
    const left = new THREE.Vector3(), tan = new THREE.Vector3();
    const n = pts.length;
    for (let i = 0; i <= n; i++) {
      const j = i % n;
      const p = pts[j], p2 = pts[(j + 1) % n], p0 = pts[(j - 1 + n) % n];
      tan.subVectors(p2, p0).normalize();
      left.crossVectors(new THREE.Vector3(0, 1, 0), tan).normalize();
      const a = p.clone().addScaledVector(left, side * (TRACK_HALF - 0.7));
      const b = p.clone().addScaledVector(left, side * (TRACK_HALF - 0.28));
      pos.push(a.x, a.y + 0.025, a.z, b.x, b.y + 0.027, b.z);
      nrm.push(0, 1, 0, 0, 1, 0);
    }
    const idx = [];
    for (let i = 0; i < n; i++) {
      const a = i * 2, b = i * 2 + 1, c = i * 2 + 2, d = i * 2 + 3;
      idx.push(a, b, c, b, d, c);
    }
    geo.setIndex(idx);
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(nrm, 3));
    const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0xe8edf0, side: THREE.DoubleSide }));
    group.add(m);
  }
}

function buildStartGrid(pts, group) {
  const cvs = document.createElement('canvas');
  cvs.width = 1024; cvs.height = 1024;
  const ctx = cvs.getContext('2d');
  ctx.clearRect(0, 0, 1024, 1024);
  const sq = 64;
  for (let r = 0; r < 2; r++) for (let cx = 0; cx < 16; cx++) {
    ctx.fillStyle = (r + cx) % 2 ? 'rgba(240,244,246,0.95)' : 'rgba(14,16,19,0.92)';
    ctx.fillRect(cx * sq, 24 + r * sq, sq, sq);
  }
  ctx.fillStyle = 'rgba(255,30,45,0.65)';
  ctx.fillRect(0, 176, 1024, 10);
  ctx.strokeStyle = 'rgba(235,240,244,0.5)';
  ctx.lineWidth = 7;
  for (let g = 0; g < 8; g++) {
    const yy = 230 + g * 96;
    const L = g % 2 ? 80 : 430;
    ctx.strokeRect(L, yy, 300, 64);
  }
  const tex = new THREE.CanvasTexture(cvs);
  tex.anisotropy = 8;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(TRACK_HALF * 2 - 1, 30),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }));
  m.rotation.x = -Math.PI / 2;
  const i0 = 6;
  m.position.copy(pts[i0]);
  m.position.y += 0.06;
  const tan = new THREE.Vector3().subVectors(pts[i0 + 4], pts[i0 - 4]).normalize();
  m.rotation.z = -Math.atan2(tan.z, tan.x) + Math.PI / 2;
  group.add(m);
}

function buildRails(pts, group) {
  const box = new THREE.BoxGeometry(5.4, 0.62, 0.26);
  const mat = new THREE.MeshStandardMaterial({ color: 0xb9c2ca, roughness: 0.5, metalness: 0.7 });
  const n = pts.length, count = Math.floor(n / 6);
  const rails = new THREE.InstancedMesh(box, mat, count * 2);
  const posts = new THREE.InstancedMesh(box, mat, count * 2);
  const M = new THREE.Matrix4(), Q = new THREE.Quaternion(), S = new THREE.Vector3(1, 1, 1);
  let k = 0, pn = 0;
  const tan = new THREE.Vector3(), left = new THREE.Vector3();
  for (let sideI = 0; sideI < 2; sideI++) {
    const side = sideI === 0 ? -1 : 1;
    for (let i = 0; i < n; i += 6) {
      const p = pts[i % n], p2 = pts[(i + 6) % n];
      tan.subVectors(p2, p).normalize();
      left.crossVectors(new THREE.Vector3(0, 1, 0), tan).normalize();
      const pos = p.clone().addScaledVector(left, side * (TRACK_HALF + 3.4));
      pos.y += 0.55;
      Q.setFromRotationMatrix(new THREE.Matrix4().lookAt(tan, new THREE.Vector3(), new THREE.Vector3(0, 1, 0)));
      M.compose(pos, Q, S);
      rails.setMatrixAt(k++, M);
      const postPos = pos.clone(); postPos.y -= 0.45;
      const PM = new THREE.Matrix4().compose(postPos, Q, new THREE.Vector3(0.09, 1.7, 3.4));
      posts.setMatrixAt(pn++, PM);
    }
  }
  rails.count = k;
  posts.count = pn;
  group.add(rails); group.add(posts);
  buildBannerPosts(pts, group);
}

function buildBannerPosts(pts, group) {
  const tex = sponsorTex('MONZA GRAND PRIX');
  const signs = new THREE.Group();
  const n = pts.length;
  for (const off of [160, 650, 1150, 1680]) {
    const i = off % n;
    const p = pts[i], p2 = pts[(i + 5) % n];
    const tan = new THREE.Vector3().subVectors(p2, p).normalize();
    const left = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), tan).normalize();
    const beam = new THREE.Mesh(new THREE.BoxGeometry(TRACK_HALF * 2 + 8, 1.1, 1.1),
      new THREE.MeshStandardMaterial({ color: 0x1c2126, roughness: 0.6, metalness: 0.5 }));
    beam.position.copy(p);
    beam.position.y += 9.2;
    beam.quaternion.setFromRotationMatrix(new THREE.Matrix4().lookAt(left, new THREE.Vector3(), new THREE.Vector3(0, 1, 0)));
    signs.add(beam);
    const banner = new THREE.Mesh(new THREE.PlaneGeometry(TRACK_HALF * 1.6, 2.6),
      new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide }));
    banner.position.copy(p);
    banner.position.y += 7.6;
    banner.quaternion.setFromRotationMatrix(new THREE.Matrix4().lookAt(tan, new THREE.Vector3(), new THREE.Vector3(0, 1, 0)));
    signs.add(banner);
    for (const s of [-1, 1]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.55, 9.5, 0.55), beam.material);
      post.position.copy(p).addScaledVector(left, s * (TRACK_HALF + 3.5));
      post.position.y += 4.7;
      signs.add(post);
    }
  }
  group.add(signs);
}

export function sponsorTex(text, w = 1024, h = 128) {
  const cvs = document.createElement('canvas');
  cvs.width = w; cvs.height = h;
  const ctx = cvs.getContext('2d');
  ctx.fillStyle = '#0d1117'; ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#ff1e2d'; ctx.fillRect(0, 0, 26, h); ctx.fillRect(w - 26, 0, 26, h);
  ctx.font = '800 64px "IBM Plex Mono", monospace';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = '#f2f6fa';
  ctx.fillText(text, w / 2, h / 2 + 4, w - 120);
  const tex = new THREE.CanvasTexture(cvs);
  tex.anisotropy = 8;
  return tex;
}
