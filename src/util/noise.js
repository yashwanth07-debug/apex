// ── deterministic RNG + tiny fbm (CPU side) ───────────────────────────────
export function RNG(seed = 1) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function hash2(x, y) {
  const h = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return h - Math.floor(h);
}
function vnoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  return hash2(xi, yi) * (1 - u) * (1 - v)
    + hash2(xi + 1, yi) * u * (1 - v)
    + hash2(xi, yi + 1) * (1 - u) * v
    + hash2(xi + 1, yi + 1) * u * v;
}
export function fbm(x, y, oct = 4) {
  let a = 0, amp = 0.5, f = 1;
  for (let i = 0; i < oct; i++) { a += amp * vnoise(x * f, y * f); amp *= 0.5; f *= 2.03; }
  return a;
}

export const NOISE_GLSL = /* glsl */`
  float hash21(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
  float vnoise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    f = f*f*(3.0-2.0*f);
    float a = hash21(i), b = hash21(i+vec2(1,0)), c = hash21(i+vec2(0,1)), d = hash21(i+vec2(1,1));
    return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
  }
  float fbm(vec2 p){ float a=0.0, w=0.5; for(int i=0;i<5;i++){ a+=w*vnoise(p); p*=2.03; w*=0.5; } return a; }
`;
