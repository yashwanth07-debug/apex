import { makeGLTFLoader } from './gltf.js';

const SPA_URL = `${import.meta.env.BASE_URL}models/spa.glb`;

// Terrain & vegetation we keep visible; everything else (roads, buildings,
// fences, walls, pit structures…) is hidden so the game's own circuit sits
// cleanly on the real Spa-Francorchamps countryside.
const KEEP = ['grass', 'hill', 'pine', 'gbrm', 'grvl'];

let _promise = null;

export function loadSpaWorld(onProgress) {
  if (_promise) return _promise;
  _promise = new Promise((resolve, reject) => {
    makeGLTFLoader().load(
      SPA_URL,
      (gltf) => {
        const scene = gltf.scene;
        let kept = 0, hidden = 0;
        scene.traverse((o) => {
          if (!o.isMesh) return;
          const name = ((o.material && o.material.name) || o.name || '').toLowerCase();
          if (KEEP.some((k) => name.includes(k))) {
            o.castShadow = false;
            o.receiveShadow = true;
            kept++;
          } else {
            o.visible = false;
            hidden++;
          }
        });
        console.log(`[spa] kept ${kept} terrain meshes, hid ${hidden}`);
        resolve(scene);
      },
      (e) => {
        if (onProgress && e.total) { try { onProgress(e.loaded / e.total); } catch {} }
      },
      (err) => { _promise = null; reject(err); },
    );
  });
  return _promise;
}
