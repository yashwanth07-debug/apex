import * as THREE from 'three';
import { makeGLTFLoader } from './gltf.js';

const MONZA_URL = `${import.meta.env.BASE_URL}models/monza.glb`;

// Duplicate road surfaces and outer skybox planes to hide so the clean procedural
// asphalt raceway remains completely unobstructed while keeping 3D trees, park, and grandstands.
const HIDE_OBJECTS = new Set([
  'Object_0', 'Object_2', 'Object_3', 'Object_14', 'Object_29', 'Object_31',
  'Object_74', 'Object_79', 'Object_80', 'Object_81', 'Object_82', 'Object_85',
  'Object_86', 'Object_88', 'Object_94', 'Object_95', 'Object_97', 'Object_98',
  'Object_100', 'Object_101', 'Object_103', 'Object_106'
]);

let _promise = null;

export function loadMonzaWorld(onProgress) {
  if (_promise) return _promise;
  _promise = new Promise((resolve, reject) => {
    makeGLTFLoader().load(
      MONZA_URL,
      (gltf) => {
        const scene = gltf.scene;
        let kept = 0, hidden = 0;
        scene.traverse((o) => {
          if (o.isMesh) {
            if (HIDE_OBJECTS.has(o.name)) {
              o.visible = false;
              hidden++;
            } else {
              o.visible = true;
              o.castShadow = false;
              o.receiveShadow = true;
              if (o.material) {
                if (o.material.transparent) {
                  o.material.alphaTest = 0.5;
                  o.material.depthWrite = true;
                }
                o.material.side = THREE.DoubleSide;
              }
              kept++;
            }
          }
        });
        console.log(`[monza] Monza 1998 3D environment loaded: ${kept} meshes kept, ${hidden} road meshes hidden`);
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
