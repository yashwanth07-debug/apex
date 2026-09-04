import * as THREE from 'three';
import { RNG } from '../util/noise.js';
import { TRACK_HALF, MONZA_MODE } from './track.js';

// ── sky, lighting, finish gantry, trackside props ───────────────────────────
export function buildEnvironment(scene, trackApi, onReady) {
  const rng = RNG(7);

  // sky dome with sun + warm horizon
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(MONZA_MODE ? 32000 : 3200, 32, 20),
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
  scene.fog = new THREE.Fog(0xc7d6e4, MONZA_MODE ? 2400 : 760, MONZA_MODE ? 28000 : 3200);
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

  // ── trackside props ───────────────────────────────────────────────────────
  const tracksideGroup = new THREE.Group();
  scene.add(tracksideGroup);

  // finish-line gantry over start
  anim.startBulbs = addFinishSignal(trackApi, tracksideGroup) || [];
  addMarshals(tracksideGroup, rng);
  if (!MONZA_MODE) addTrees(tracksideGroup, rng); // Monza ships its own park & forest

  return {
    anim,
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
    },
  };
}

function addFinishSignal(trackApi, parent) {
  const i0 = 6;
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
  // marshal stands
}

function addTrees(parent, rng) {
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
