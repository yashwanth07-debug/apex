import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const BASE = import.meta.env.BASE_URL;

const canvas = document.getElementById('viewer');
const statusEl = document.getElementById('status');
const btnSpa = document.getElementById('btnSpa');
const btnFerrari = document.getElementById('btnFerrari');
const btnReset = document.getElementById('btnReset');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1c2b47);
scene.fog = new THREE.Fog(0xc3d2e4, 1800, 12000);

const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 5, 60000);
camera.position.set(0, 2500, 7000);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.maxPolarAngle = Math.PI * 0.52;
controls.target.set(0, 0, 0);

// ── lights ────────────────────────────────────────────────────────────────
const sun = new THREE.DirectionalLight(0xfff1dc, 3.0);
sun.position.set(5000, 7000, 3500);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
const sc = 600;
sun.shadow.camera.left = -sc; sun.shadow.camera.right = sc;
sun.shadow.camera.top = sc; sun.shadow.camera.bottom = -sc;
sun.shadow.camera.near = 50; sun.shadow.camera.far = 16000;
sun.shadow.bias = -0.0004;
scene.add(sun);
scene.add(new THREE.HemisphereLight(0xbfd8ff, 0x4c5a3a, 0.9));
scene.add(new THREE.AmbientLight(0xffffff, 0.12));

const loader = new GLTFLoader();
const root = new THREE.Group();
scene.add(root);

let spaModel = null;
let ferrari = null;
let spaLoaded = false, ferrariLoaded = false;

function updateStatus() {
  if (spaLoaded && ferrariLoaded) {
    statusEl.textContent = 'Both assets loaded — Ferrari F1 2019 & the 1992 Spa circuit.';
  } else if (spaLoaded) {
    statusEl.textContent = 'Circuit loaded — loading the Ferrari F1 2019…';
  }
}

// ── load the circuit ───────────────────────────────────────────────────────
loader.load(
  `${BASE}models/spa.glb`,
  (gltf) => {
    spaModel = gltf.scene;
    spaModel.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    root.add(spaModel);
    spaLoaded = true;

    const box = new THREE.Box3().setFromObject(spaModel);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    // recentre horizontally so orbiting feels natural
    spaModel.position.set(-center.x, 0, -center.z);
    controls.target.set(0, center.y, 0);
    const d = Math.max(size.x, size.z);
    camera.position.set(d * 0.45, center.y + d * 0.22, d * 0.62);
    controls.update();
    updateStatus();

    // park the Ferrari on the circuit surface via a downward raycast
    loadFerrari(new THREE.Vector3(0, 0, 0));
  },
  undefined,
  (err) => {
    statusEl.textContent = 'Circuit failed to load: ' + (err && err.message ? err.message : err);
  },
);

function loadFerrari(targetXZ) {
  loader.load(
    `${BASE}models/ferrari_f1_2019.glb`,
    (gltf) => {
      ferrari = gltf.scene;
      ferrari.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
      // scale to ~6 m long + ground it
      const fb = new THREE.Box3().setFromObject(ferrari);
      const fs = fb.getSize(new THREE.Vector3());
      const s = 6 / fs.z;
      ferrari.scale.setScalar(s);
      const fc = fb.getCenter(new THREE.Vector3());
      ferrari.position.set(-fc.x * s, -fb.min.y * s, -fc.z * s);

      // drop it onto the circuit surface
      if (spaModel) {
        const raycaster = new THREE.Raycaster();
        raycaster.set(new THREE.Vector3(targetXZ.x, 8000, targetXZ.y), new THREE.Vector3(0, -1, 0));
        raycaster.far = 40000;
        const hits = raycaster.intersectObject(spaModel, true);
        if (hits.length) {
          const p = hits[0].point;
          ferrari.position.set(p.x, p.y, p.z);
        } else {
          const box = new THREE.Box3().setFromObject(spaModel);
          ferrari.position.y = box.getCenter(new THREE.Vector3()).y;
        }
      }
      ferrari.visible = false;
      root.add(ferrari);
      ferrariLoaded = true;
      updateStatus();
    },
    undefined,
    (err) => {
      ferrariLoaded = true;
      updateStatus();
      console.warn('[spa] ferrari load failed', err && err.message);
    },
  );
}

// ── UI toggles ─────────────────────────────────────────────────────────────
btnSpa.addEventListener('click', () => {
  if (spaModel) spaModel.visible = !spaModel.visible;
  btnSpa.classList.toggle('active', spaModel ? spaModel.visible : false);
});
btnFerrari.addEventListener('click', () => {
  if (!ferrari) return;
  ferrari.visible = !ferrari.visible;
  btnFerrari.classList.toggle('active', ferrari.visible);
  if (ferrari.visible && spaModel) {
    const box = new THREE.Box3().setFromObject(ferrari);
    const c = box.getCenter(new THREE.Vector3());
    controls.target.lerp(c, 0.5);
  }
});
btnReset.addEventListener('click', () => {
  const box = new THREE.Box3().setFromObject(root);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  controls.target.copy(center);
  const d = Math.max(size.x, size.z, 1);
  camera.position.set(center.x + d * 0.45, center.y + d * 0.22, center.z + d * 0.62);
  controls.update();
});

// ── loop ───────────────────────────────────────────────────────────────────
const clock = new THREE.Clock();
function loop() {
  requestAnimationFrame(loop);
  const dt = Math.min(clock.getDelta(), 0.1);
  controls.update();
  if (ferrari && ferrari.visible) {
    ferrari.rotation.y += dt * 0.35; // slow turntable spin so the car reads from all angles
  }
  renderer.render(scene, camera);
}
loop();

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
