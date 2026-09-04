import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const FERRARI_URL = `${import.meta.env.BASE_URL}models/ferrari_f1_2019.glb`;

// Match the procedural kit car's footprint so the track, lanes, camera and
// overtake distances all feel identical to the original game.
const TARGET_LENGTH = 5.9;

let _gltf = null;
let _loadPromise = null;

/** Fetch (once) the Ferrari F1 2019 GLB. Cached across calls. */
export function loadFerrari() {
  if (_gltf) return Promise.resolve(_gltf);
  if (_loadPromise) return _loadPromise;
  _loadPromise = new Promise((resolve, reject) => {
    new GLTFLoader().load(
      FERRARI_URL,
      (gltf) => { _gltf = gltf; resolve(gltf); },
      undefined,
      (err) => { _loadPromise = null; reject(err); },
    );
  });
  return _loadPromise;
}

/**
 * Turn the raw GLTF into a car group with the SAME userData contract as
 * buildF1():  userData.wheels [{ g, spin, steerable }], userData.spin(rot, steer),
 * userData.shimmer.material.opacity, userData.rideHeight.
 */
export function buildFerrari(gltf) {
  const car = new THREE.Group();   // what main.js drives (`hero`)
  const model = new THREE.Group(); // scaled + recentred so origin = ground centre
  model.add(gltf.scene);
  car.add(model);

  gltf.scene.traverse((o) => {
    if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; }
  });

  // ── locate the four wheel pairs by name ────────────────────────────────────
  // Sketchfab export names: "Tire FL", "Tire F??" (mojibake = FR), "Tire RL",
  // "Tire RL.001" (= RR), plus matching "Rim …" nodes.
  const byName = {};
  gltf.scene.traverse((o) => {
    const n = o.name || '';
    if (n.startsWith('Tire') || n.startsWith('Rim') || n.startsWith('Decal Tire')) {
      (byName[n] || (byName[n] = [])).push(o);
    }
  });
  const find = (name) => (byName[name] && byName[name][0]) || null;
  const findPrefix = (prefix, exclude) => {
    for (const n of Object.keys(byName)) {
      if (n.startsWith(prefix) && n !== exclude) return byName[n][0];
    }
    return null;
  };

  const corners = [
    { tire: find('Tire FL'),        rim: find('Rim FL'),        steerable: true  },
    { tire: findPrefix('Tire F', 'Tire FL'), rim: findPrefix('Rim F', 'Rim FL'), steerable: true },
    { tire: find('Tire RL'),        rim: find('Rim RL'),        steerable: false },
    { tire: find('Tire RL.001'),    rim: find('Rim RL.001'),    steerable: false },
  ];

  // sidewall decals → collected first (world positions), then re-parented
  const decals = [];
  gltf.scene.traverse((o) => {
    if (o.isMesh && (o.name || '').startsWith('Decal Tire')) decals.push(o);
  });
  const decalCenters = decals.map((d) => ({
    d, p: d.getWorldPosition(new THREE.Vector3()),
  }));

  // ── wheel assemblies BEFORE scaling (model is still identity, so world == local)
  const wheels = [];
  for (const corner of corners) {
    if (!corner.tire) continue;
    const center = new THREE.Box3()
      .setFromObject(corner.tire)
      .getCenter(new THREE.Vector3());
    const steer = new THREE.Group();
    steer.position.copy(center);
    model.add(steer);
    const spin = new THREE.Group();
    steer.add(spin);
    if (corner.rim) spin.attach(corner.rim);
    for (const { d, p } of decalCenters) {
      if (d.parent && p.distanceTo(center) < 0.55) spin.attach(d);
    }
    wheels.push({ g: steer, spin, steerable: corner.steerable });
  }

  // ── fit to kit-car footprint + ground it ───────────────────────────────────
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const s = TARGET_LENGTH / size.z;                 // forward axis is +Z
  const c = box.getCenter(new THREE.Vector3());
  model.scale.setScalar(s);
  model.position.set(-c.x * s, -box.min.y * s, -c.z * s);

  // ── exhaust shimmer (same hook the game drives every frame) ────────────────
  const shimmer = new THREE.Mesh(
    new THREE.PlaneGeometry(0.5, 0.3),
    new THREE.MeshBasicMaterial({ color: 0xffa040, transparent: true, opacity: 0, depthWrite: false }),
  );
  shimmer.rotation.y = Math.PI;
  shimmer.position.set(0, 0.45, -3.0);
  car.add(shimmer);

  car.userData = {
    wheels,
    rideHeight: 0.06,                    // sit just on top of the asphalt ribbon
    shimmer,
    setLivery() { /* livery is baked into the model's textures */ },
  };
  car.userData.spin = (rot, steerVal) => {
    for (const w of wheels) {
      w.spin.rotation.x += rot;
      if (w.steerable) w.g.rotation.y = steerVal * 0.42;
    }
  };

  return car;
}
