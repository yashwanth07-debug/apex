import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';

const GradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    uSpeed: { value: 0 },
  },
  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: /* glsl */`
    varying vec2 vUv;
    uniform sampler2D tDiffuse;
    uniform float uSpeed;
    void main(){
      vec2 d2 = vUv - 0.5;
      float d = length(d2);
      // subtle chroma grows with speed at frame edges
      float ca = (0.0012 + uSpeed * 0.0032) * smoothstep(0.18, 0.75, d);
      vec2 off = normalize(d2 + 0.0001) * ca;
      vec4 c;
      c.r = texture2D(tDiffuse, vUv - off).r;
      c.g = texture2D(tDiffuse, vUv).g;
      c.b = texture2D(tDiffuse, vUv + off).b;
      c.a = 1.0;
      // racing vignette
      float vig = smoothstep(0.95, 0.38, d);
      c.rgb *= mix(0.62, 1.0, vig);
      // slight warm lift at speed
      c.rgb += vec3(0.02, 0.01, 0.0) * uSpeed;
      gl_FragColor = c;
    }`,
};

export function buildPost(renderer, scene, camera) {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.34, 0.75, 0.82);
  composer.addPass(bloom);
  const grade = new ShaderPass(GradeShader);
  composer.addPass(grade);
  const fxaa = new ShaderPass(FXAAShader);
  composer.addPass(fxaa);
  composer.addPass(new OutputPass());
  return {
    bloom, grade,
    render() { composer.render(); },
    setSize(w, h, pr) {
      composer.setPixelRatio(pr);
      composer.setSize(w, h);
      fxaa.material.uniforms.resolution.value.set(1 / (w * pr), 1 / (h * pr));
    },
    setSpeed(v) { grade.uniforms.uSpeed.value = v; },
  };
}
