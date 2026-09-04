import * as THREE from 'three';
import { makeGLTFLoader } from './gltf.js';

const MONZA_URL = `${import.meta.env.BASE_URL}models/monza.glb`;

let _promise = null;

export function loadMonzaWorld(onProgress) {
  if (_promise) return _promise;
  _promise = new Promise((resolve, reject) => {
    makeGLTFLoader().load(
      MONZA_URL,
      (gltf) => {
        const scene = gltf.scene;
        let meshCount = 0;
        scene.traverse((o) => {
          if (o.isMesh) {
            o.castShadow = false;
            o.receiveShadow = true;
            if (o.material) {
              if (o.material.transparent) {
                o.material.alphaTest = 0.5;
                o.material.depthWrite = true;
              }
              o.material.side = THREE.DoubleSide;
            }
            meshCount++;
          }
        });
        console.log(`[monza] Monza 1998 3D circuit loaded (${meshCount} meshes)`);
        resolve(scene);
      },
      (xhr) => {
        if (xhr.lengthComputable && onProgress) onProgress(xhr.loaded / xhr.total);
      },
      (err) => {
        console.error('[monza] load error:', err);
        _promise = null;
        reject(err);
      },
    );
  });
  return _promise;
}
