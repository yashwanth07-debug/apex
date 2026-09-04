import * as THREE from 'three';
import { RNG } from '../util/noise.js';
import { sponsorTex } from './track.js';
import { TRACK_HALF, SPA_MODE } from './track.js';

// ── sky, grandstands, crowd, flags, towers, daisies ─────────────────────────
export function buildEnvironment(scene, trackApi, onReady) {
  const rng = RNG(7);

  // sky dome with sun + warm horizon
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(SPA_MODE ? 26000 : 3200, 32, 20),
    new THREE.ShaderMaterial({
      side: THREE.BackSide, depthWrite: false, fog: false,
      uniforms: { uTime: { value: 0 } },
      vertexShader: /* glsl */`
        varying vec3 vDir;
        void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: /* glsl */`
        varying vec3 vDir; uniform float uTime;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
        float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
          return mix(mix(hash(i),hash(i+vec2(1,0)),f.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y); }
        void main(){
          float h = clamp(vDir.y, -0.05, 1.0);
          vec3 zen = vec3(0.10, 0.30, 0.68);
          vec3 mid = vec3(0.30, 0.55, 0.85);
          vec3 hor = vec3(0.62, 0.74, 0.86);
          vec3 col = mix(hor, mid, smoothstep(0.015, 0.16, h));
          col = mix(col, zen, smoothstep(0.14, 0.55, h));
          // warm haze at horizon (sun side)
          vec3 sunDir = normalize(vec3(0.55, 0.62, 0.42));
          float s = max(dot(vDir, sunDir), 0.0);
          col = mix(col, vec3(1.0, 0.80, 0.60), pow(max(0.0, 1.0 - h * 5.5), 3.0) * 0.32 * (0.35 + 0.65 * s));
          col += vec3(1.0, 0.92, 0.75) * (pow(s, 1200.0) * 3.0 + pow(s, 60.0) * 0.13);
          // drifting cloud bands
          vec2 cuv = vDir.xz / max(vDir.y + 0.18, 0.06);
          float cl = noise(cuv * 1.4 + vec2(uTime * 0.006, 0.0));
          cl = smoothstep(0.58, 0.9, cl) * smoothstep(0.06, 0.3, h);
          col = mix(col, vec3(0.98, 0.99, 1.0), cl * 0.30);
          gl_FragColor = vec4(col, 1.0);
        }`,
    }),
  );
  sky.frustumCulled = false;
  scene.add(sky);

  // lighting
  scene.fog = new THREE.Fog(0xc7d6e4, SPA_MODE ? 2200 : 760, SPA_MODE ? 24000 : 3200);
  const sun = new THREE.DirectionalLight(0xfff3e0, 3.1);
  sun.position.set(180, 240, 150);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.near = 30; sun.shadow.camera.far = 700;
  const sc = 130;
  sun.shadow.camera.left = -sc; sun.shadow.camera.right = sc;
  sun.shadow.camera.top = sc; sun.shadow.camera.bottom = -sc;
  sun.shadow.bias = -0.0004;
  scene.add(sun);
  scene.add(sun.target);
  const hemi = new THREE.HemisphereLight(0x9fc6e8, 0x3f5a34, 0.9);
  scene.add(hemi);
  const amb = new THREE.AmbientLight(0xffffff, 0.14);
  scene.add(amb);

  const anim = { sky, sun };

  // ── grandstands (stands[0] is the main straight one) ────────────────────
  const standsGroup = new THREE.Group();
  scene.add(standsGroup);
  const stands = [];
  const standDefs = [
    { at: 40, side: -1, len: 120, tiers: 12 },  // main straight
    { at: 560, side: 1, len: 90, tiers: 9 },
    { at: 1020, side: -1, len: 100, tiers: 10 },
    { at: 1420, side: 1, len: 80, tiers: 8 },
    { at: 1780, side: -1, len: 70, tiers: 8 },
  ];
  for (const def of standDefs) {
    const g = buildStand(def, rng, standsGroup);
    const idx = Math.floor(def.at % trackApi.pts.length);
    const { point, tangent, left } = trackApi.at(idx, {});
    const yaw = Math.atan2(tangent.x, tangent.z);
    // stand origin = front edge; rows recede along local -z, so local +z must
    // point AT the road: side+1 (placed left) -> yaw+PI/2; side-1 -> yaw-PI/2
    const back = TRACK_HALF + 6.2;
    g.position.copy(point).addScaledVector(left, def.side * back);
    g.position.y = point.y - 0.5;
    g.rotation.y = yaw + (def.side > 0 ? Math.PI / 2 : -Math.PI / 2);
    stands.push(g);
  }
  anim.stands = stands;

  // finish-line gantry over start
  anim.startBulbs = addFinishSignal(trackApi, standsGroup) || [];
  // marshal posts + tyre walls + decent ground props
  addMarshals(standsGroup, rng);
  if (!SPA_MODE) addTrees(standsGroup, rng); // Spa ships its own forest

  // ── crowd (one instanced mesh across all stands) ────────────────────────
  buildCrowd(stands, anim, rng);

  // wave flags at the main stand
  buildFlags(stands[0], standsGroup, rng, anim);

  return {
    anim,
    // keep the sun's shadow box glued to the hero, shadow follows the action
    followShadow(carPos, tangent) {
      sun.position.set(carPos.x + 180, 240, carPos.z + 150);
      sun.target.position.copy(carPos);
      sun.target.updateMatrixWorld();
    },
    lightsOut() {
      for (const bm of anim.startBulbs || []) { bm.color.set(0x1d7a3a); bm.emissive.set(0x0f5f2a); }
      setTimeout(() => { for (const bm of anim.startBulbs || []) { bm.color.set(0x1a1d20); bm.emissive.set(0x000000); } }, 2600);
    },
    update(t, cameraPos) {
      sky.material.uniforms.uTime.value = t;
      sky.position.copy(cameraPos);
      for (const fl of anim.flags || []) fl.material?.uniforms && (fl.material.uniforms.uT.value = t);
      if (anim.crowdMat && anim.crowdMat.userData && anim.crowdMat.userData.uT) anim.crowdMat.userData.uT.value = t;
    },
  };
}

function buildStand(def, rng, parent) {
  const g = new THREE.Group();
  const tierW = 4.4, tierH = 1.15;
  const conc = new THREE.MeshStandardMaterial({ color: 0x99a3ab, roughness: 0.85 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x2a3138, roughness: 0.8, metalness: 0.3 });
  for (let t = 0; t < def.tiers; t++) {
    const step = new THREE.Mesh(new THREE.BoxGeometry(def.len, tierH, tierW), conc);
    step.position.set(0, t * tierH + tierH / 2, -t * tierW);
    step.castShadow = step.receiveShadow = true;
    g.add(step);
    const seat = new THREE.Mesh(new THREE.BoxGeometry(def.len, 0.42, tierW * 0.5), dark);
    seat.position.set(0, t * tierH + tierH + 0.2, -t * tierW + 0.7);
    g.add(seat);
  }
  // roof on posts
  const roof = new THREE.Mesh(new THREE.BoxGeometry(def.len + 8, 0.5, def.tiers * tierW * 0.72), dark);
  roof.position.set(0, def.tiers * tierH + 5.4, -def.tiers * tierW * 0.34);
  roof.castShadow = true;
  g.add(roof);
  for (const x of [-def.len / 2 + 3, 0, def.len / 2 - 3]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.7, def.tiers * tierH + 5.4, 0.7), dark);
    post.position.set(x, (def.tiers * tierH + 5.4) / 2, -def.tiers * tierW * 0.62);
    g.add(post);
  }
  // crowd seats recording (rows along the stand for instancing)
  const seats = [];
  for (let t = 0; t < def.tiers; t++) {
    const rowN = Math.floor(def.len / 1.05);
    for (let s = 0; s < rowN; s++) {
      seats.push(new THREE.Vector3(
        -def.len / 2 + 0.6 + s * 1.05 + rng() * 0.5,
        t * tierH + tierH + 0.78,
        -t * tierW + 0.7 + (rng() - 0.5) * 0.6,
      ));
    }
  }
  g.userData = { seats, def };
  parent.add(g);
  return g;
}

function buildCrowd(stands, anim, rng) {
  const capsule = new THREE.CapsuleGeometry(0.21, 0.42, 3, 8);
  const crowdMats = [];
  const palette = [0xe23636, 0xf2f4f7, 0x2f7fd0, 0xf5c518, 0x27a05f, 0xf07a1e, 0xd84fb5, 0x38cdd8, 0x8d99ab, 0xbbbcff];
  const positions = [], colors = [];
  for (const st of stands) {
    for (const s of st.userData.seats) {
      positions.push(st.localToWorld ? s.clone() : s);
      colors.push(palette[Math.floor(rng() * palette.length)]);
    }
    // seats were authored in stand-local space; stand transforms get applied below
  }
  const inst = new THREE.InstancedMesh(capsule, new THREE.MeshStandardMaterial({ roughness: 0.8 }), positions.length);
  const M = new THREE.Matrix4(), Q = new THREE.Quaternion(), S = new THREE.Vector3();
  const c = new THREE.Color();
  let k = 0;
  for (const st of stands) {
    st.updateMatrixWorld();
    for (const sLocal of st.userData.seats) {
      const w = sLocal.clone().applyMatrix4(st.matrixWorld);
      S.setScalar(0.85 + rng() * 0.4);
      Q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rng() * Math.PI * 2);
      M.compose(w, Q, S);
      inst.setMatrixAt(k, M);
      c.set(palette[Math.floor(rng() * palette.length)]);
      inst.setColorAt(k, c);
      k++;
    }
  }
  inst.instanceMatrix.needsUpdate = true;
  if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
  inst.castShadow = false;
  // crowd bounce — free-ish price: vertex shader sine over instance world pos
  inst.material.onBeforeCompile = (sh) => {
    sh.uniforms.uT = { value: 0 };
    inst.material.userData.uT = sh.uniforms.uT;
    sh.vertexShader = 'uniform float uT;\n' + sh.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
       #ifdef USE_INSTANCING
         vec4 ipos = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
         transformed.y += sin(uT * 3.1 + ipos.x * 0.13 + ipos.z * 0.11) * 0.09 + 0.06;
       #endif`,
    );
  };
  stands.length && stands[0].parent && stands[0].parent.add(inst);
  anim.crowdMat = inst.material;
  anim.crowd = inst;
}

function buildFlags(stand, parent, rng, anim) {
  anim.flags = [];
  const cols = [0xff1e2d, 0xf2f4f6, 0x1a6fd4, 0xf5c518, 0x2fd27a];
  for (let f = 0; f < 5; f++) {
    const tex = sponsorTex(cols[f] === 0xff1e2d ? 'DRIVE APEX' : 'P1 CUSTOMS', 512, 96);
    const mat = new THREE.ShaderMaterial({
      side: THREE.DoubleSide, transparent: true,
      uniforms: { tMap: { value: tex }, uT: { value: 0 } },
      vertexShader: /* glsl */`
        uniform float uT; varying vec2 vUv;
        void main(){
          vUv = uv;
          vec3 p = position;
          float w = sin(p.x * 2.6 + uT * (6.0 + uv.x * 2.0)) * 0.16 * uv.x;
          p.z += w;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }`,
      fragmentShader: /* glsl */`
        uniform sampler2D tMap; varying vec2 vUv;
        void main(){
          vec4 c = texture2D(tMap, vUv);
          c.rgb = mix(c.rgb, vec3(0.9), 0.06);
          gl_FragColor = c;
        }`,
    });
    const flag = new THREE.Mesh(new THREE.PlaneGeometry(7.4, 1.4, 18, 2), mat);
    const x = -stand.userData.def.len / 2 + 8 + f * ((stand.userData.def.len - 16) / 4);
    flag.position.set(x, stand.userData.def.tiers * 1.15 + 4.6, -stand.userData.def.tiers * 4.4 * 0.2);
    flag.rotation.y = Math.PI / 2;
    parent.add(flag);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 6.5, 6),
      new THREE.MeshStandardMaterial({ color: 0x878e96, roughness: 0.5, metalness: 0.8 }));
    pole.position.set(x - 0.05, stand.userData.def.tiers * 1.15 + 3.2, flag.position.z);
    parent.add(pole);
    anim.flags.push(flag);
    // lift flags with the parent stand
    parent.add(flag), parent.add(pole);
  }
}

function addFinishSignal(trackApi, parent) {
  const n = trackApi.pts.length;
  const i0 = 2;
  const p = trackApi.pts[i0], p2 = trackApi.pts[i0 + 6];
  const tan = new THREE.Vector3().subVectors(p2, p).normalize();
  const left = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), tan).normalize();
  const tower = new THREE.Group();
  const mast = new THREE.Mesh(new THREE.BoxGeometry(0.65, 11, 0.65), new THREE.MeshStandardMaterial({ color: 0x232a31, roughness: 0.5, metalness: 0.6 }));
  mast.position.y = 5.5;
  mast.castShadow = true;
  tower.add(mast);
  const box = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.7, 0.9), new THREE.MeshStandardMaterial({ color: 0x14171c, emissive: 0x111111 }));
  box.position.y = 10.6;
  tower.add(box);
  const lights = [];
  for (let l = 0; l < 5; l++) {
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.30, 10, 8),
      new THREE.MeshStandardMaterial({ color: 0x3a0f13, emissive: 0x581016, emissiveIntensity: 1.4 }));
    bulb.position.set(-1.5 + l * 0.75, 10.6, 0.55);
    tower.add(bulb);
    lights.push(bulb.material);
  }
  tower.position.copy(p).addScaledVector(left, TRACK_HALF + 3.2);
  tower.quaternion.setFromRotationMatrix(new THREE.Matrix4().lookAt(tan, new THREE.Vector3(), new THREE.Vector3(0, 1, 0)));
  parent.add(tower);
  return lights;
}

function addMarshals(parent, rng) {
  const mat = new THREE.MeshStandardMaterial({ color: 0xf2642a, roughness: 0.8 });
  const roofM = new THREE.MeshStandardMaterial({ color: 0xced6dc, roughness: 0.7 });
  const a = parent;
}

function addTrees(parent, rng) {
  // stylised pines ringing the infield — hint of green depth past the rails
  const treeGeo = new THREE.ConeGeometry(8, 24, 7);
  const treeMat = new THREE.MeshStandardMaterial({ color: 0x1f4526, roughness: 0.95 });
  const trunkGeo = new THREE.CylinderGeometry(0.9, 1.1, 5, 6);
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a3626, roughness: 0.9 });
  const spots = [];
  for (let i = 0; i < 46; i++) {
    const a = rng() * Math.PI * 2;
    const r = 640 + rng() * 420;
    spots.push([Math.cos(a) * r, Math.sin(a) * r]);
  }
  const crowns = new THREE.InstancedMesh(treeGeo, treeMat, spots.length);
  const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, spots.length);
  const M = new THREE.Matrix4(), Q = new THREE.Quaternion(), S = new THREE.Vector3();
  spots.forEach(([x, z], i) => {
    const s = 0.7 + rng() * 1.2;
    S.set(s, s * (0.9 + rng() * 0.5), s);
    M.compose(new THREE.Vector3(x, 10 * S.y - 4, z), Q, S);
    crowns.setMatrixAt(i, M);
    M.compose(new THREE.Vector3(x, 0.8, z), Q, S);
    trunks.setMatrixAt(i, M);
  });
  crowns.castShadow = true;
  parent.add(crowns, trunks);
}
