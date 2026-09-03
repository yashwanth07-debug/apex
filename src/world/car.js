import * as THREE from 'three';

// ── a proper F1 silhouette, built from primitives at 5.6 m scale ───────────
// clearcoat paint, halo, wings with endplates, real wheels (steer + spin)
export function buildF1({ paint = 0xe1141e, accent = 0x101216, number = 23, name = 'NEREIS' } = {}) {
  const car = new THREE.Group();
  const P = new THREE.MeshPhysicalMaterial({
    color: paint, roughness: 0.32, metalness: 0.08, clearcoat: 1, clearcoatRoughness: 0.14,
  });
  const C = new THREE.MeshStandardMaterial({ color: 0x14171b, roughness: 0.6, metalness: 0.5 }); // carbon
  const A = new THREE.MeshPhysicalMaterial({ color: accent, roughness: 0.4, metalness: 0.2, clearcoat: 0.6 });
  const T = new THREE.MeshStandardMaterial({ color: 0x0c0d0f, roughness: 0.9 });                 // tyre
  const R = new THREE.MeshStandardMaterial({ color: 0xb9bfc6, roughness: 0.28, metalness: 0.85 }); // rim

  const add = (g, m, x, y, z, s = [1, 1, 1], r = [0, 0, 0]) => {
    const mesh = new THREE.Mesh(g, m);
    mesh.position.set(x, y, z);
    mesh.scale.set(...s);
    mesh.rotation.set(...r);
    mesh.castShadow = true;
    car.add(mesh);
    return mesh;
  };

  // central wedge body — nose to engine
  const body = add(new THREE.BoxGeometry(1.7, 0.5, 3.4), P, 0, 0.42, -0.2);
  body.geometry.translate(0, 0, 0);
  // nosecone: tapered, droops to the front wing
  const nose = add(new THREE.CylinderGeometry(0.34, 0.13, 1.9, 10), P, 0, 0.36, 2.35, [1, 1, 1.06], [Math.PI / 2 - 0.1, 0, 0]);
  nose.rotation.x = Math.PI / 2 - 0.1;
  add(new THREE.CylinderGeometry(0.34, 0.46, 0.8, 10), P, 0, 0.44, 1.35, [1, 1, 1.15], [Math.PI / 2, 0, 0]);
  // sidepods
  add(new THREE.BoxGeometry(0.62, 0.42, 1.7), P, -0.86, 0.42, -0.35, [1, 1, 1], [0, 0.06, 0]);
  add(new THREE.BoxGeometry(0.62, 0.42, 1.7), P, 0.86, 0.42, -0.35, [1, 1, 1], [0, -0.06, 0]);
  // engine cover + shark fin
  add(new THREE.CylinderGeometry(0.29, 0.5, 1.5, 10), P, 0, 0.62, -1.7, [1, 1, 1.1], [Math.PI / 2, 0, 0]);
  const fin = add(new THREE.BoxGeometry(0.045, 0.52, 1.7), P, 0, 0.85, -1.3, [1, 1, 1], [0.16, 0, 0]);
  fin.castShadow = false;
  // cockpit rim + driver helmet + halo
  add(new THREE.CylinderGeometry(0.42, 0.52, 0.35, 12), P, 0, 0.68, -0.45, [1, 1, 1.3]);
  const helm = add(new THREE.SphereGeometry(0.16, 12, 10), new THREE.MeshStandardMaterial({ color: 0xf2f4f6, roughness: 0.35, metalness: 0.2 }), 0, 0.82, -0.52);
  helm.castShadow = false;
  add(new THREE.TorusGeometry(0.34, 0.035, 8, 18, Math.PI * 1.1), C, 0, 0.86, -0.5, [1, 1, 1], [Math.PI / 2 + 0.32, 1.6, 1.5]);
  add(new THREE.BoxGeometry(0.05, 0.28, 0.05), C, 0, 0.72, -0.28);
  // front wing: main plane + flaps + endplates
  add(new THREE.BoxGeometry(2.05, 0.06, 0.62), C, 0, 0.13, 3.0, [1, 1, 1], [0.06, 0, 0]);
  add(new THREE.BoxGeometry(1.9, 0.045, 0.34), P, 0, 0.22, 2.74, [1, 1, 1], [0.12, 0, 0]);
  add(new THREE.BoxGeometry(0.03, 0.34, 0.6), A, -1.02, 0.25, 2.9);
  add(new THREE.BoxGeometry(0.03, 0.34, 0.6), A, 1.02, 0.25, 2.9);
  // rear wing: two elements + endplates
  add(new THREE.BoxGeometry(1.35, 0.05, 0.42), C, 0, 1.06, -2.45, [1, 1, 1], [-0.24, 0, 0]);
  add(new THREE.BoxGeometry(1.25, 0.04, 0.26), P, 0, 0.78, -2.3, [1, 1, 1], [-0.12, 0, 0]);
  add(new THREE.BoxGeometry(0.03, 0.5, 0.62), P, -0.68, 0.92, -2.4, [1, 1, 1], [-0.1, 0, 0]);
  add(new THREE.BoxGeometry(0.03, 0.5, 0.62), P, 0.68, 0.92, -2.4, [1, 1, 1], [-0.1, 0, 0]);
  // diffuser + floor plank
  add(new THREE.BoxGeometry(1.5, 0.14, 0.9), C, 0, 0.16, -2.25, [1, 1, 1], [-0.18, 0, 0]);
  add(new THREE.BoxGeometry(1.9, 0.05, 4.9), C, 0, 0.16, -0.1);
  // mirrors + camera + antenna
  add(new THREE.BoxGeometry(0.16, 0.06, 0.1), P, -0.55, 0.66, 0.28);
  add(new THREE.BoxGeometry(0.16, 0.06, 0.1), P, 0.55, 0.66, 0.28);
  add(new THREE.CylinderGeometry(0.016, 0.016, 0.34, 6), C, 0, 0.9, 0.9);
  // front number plate
  add(new THREE.BoxGeometry(0.34, 0.3, 0.02), new THREE.MeshStandardMaterial({ color: 0xf2f4f6, roughness: 0.4 }), 0, 0.5, 3.22, [1, 1, 1], [-0.35, 0, 0]);

  // wheels — front pair steerable, all spin
  const wheelGeo = new THREE.TorusGeometry(0.26, 0.115, 10, 22);
  const makeWheel = (x, z, steer) => {
    const g = new THREE.Group();
    g.position.set(x, 0.27, z);
    const spin = new THREE.Group();
    const tyre = new THREE.Mesh(wheelGeo, T);
    tyre.rotation.y = Math.PI / 2;
    tyre.castShadow = true;
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.1, 14), R);
    rim.rotation.z = Math.PI / 2;
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.13, 10), C);
    disc.rotation.z = Math.PI / 2;
    spin.add(tyre, rim, disc);
    g.add(spin);
    car.add(g);
    return { g, spin, steerable: steer };
  };
  const wheels = [
    makeWheel(-0.83, 1.55, true), makeWheel(0.83, 1.55, true),
    makeWheel(-0.83, -1.65, false), makeWheel(0.83, -1.65, false),
  ];
  // suspension arms (static dressing)
  for (const [x, z] of [[-0.5, 1.55], [0.5, 1.55], [-0.5, -1.65], [0.5, -1.65]]) {
    add(new THREE.BoxGeometry(0.9, 0.035, 0.035), C, x, 0.32, z, [1, 1, 1], [0, 0, x > 0 ? 0.12 : -0.12]);
  }

  // exhaust heat shimmer quad (visible at idle/on throttle)
  const shimmer = add(new THREE.PlaneGeometry(0.5, 0.35),
    new THREE.MeshBasicMaterial({ color: 0xffa040, transparent: true, opacity: 0 }), 0, 0.32, -2.62);
  shimmer.rotation.y = Math.PI;

  car.userData = { wheels, paintMat: P, shimmer, helm };
  car.userData.setLivery = (hex) => { P.color.set(hex); };
  car.userData.spin = (rot, steer) => {
    for (const w of wheels) {
      w.spin.rotation.x += rot;
      if (w.steerable) w.g.rotation.y = steer * 0.42;
    }
  };
  return car;
}
