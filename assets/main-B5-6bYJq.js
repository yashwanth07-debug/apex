import{S as Qe,B as P,M as D,a as Xe,P as st,b as E,c as ee,C as it,V as w,G,d as ue,F as H,D as ye,e as je,f as Ae,I as De,g as ie,Q as at,h as ae,i as _e,j as q,k as ot,l as nt,H as rt,A as lt,m as Oe,n as Y,T as Ue,o as $e,p as ze,O as ct,U as we,q as k,W as ve,r as xe,N as dt,s as Ye,t as ht,R as ut,u as ft,v as pt,L as mt,w as gt,x as vt,y as qe,z as xt,E as wt,J as bt,K as Tt,X as Mt,Y as St,Z as be,_ as Be,$ as yt,a0 as At}from"./GLTFLoader-BdCAVIgn.js";class Et extends Qe{constructor(e=null){super();const t=new P;t.deleteAttribute("uv");const s=new D({side:Xe}),i=new D,a=new st(16777215,900,28,2);a.position.set(.418,16.199,.3),this.add(a);const n=new E(t,s);n.position.set(-.757,13.219,.717),n.scale.set(31.713,28.305,28.591),this.add(n);const d=new E(t,i);d.position.set(-10.906,2.009,1.846),d.rotation.set(0,-.195,0),d.scale.set(2.328,7.905,4.651),this.add(d);const l=new E(t,i);l.position.set(-5.607,-.754,-.758),l.rotation.set(0,.994,0),l.scale.set(1.97,1.534,3.955),this.add(l);const h=new E(t,i);h.position.set(6.167,.857,7.803),h.rotation.set(0,.561,0),h.scale.set(3.927,6.285,3.687),this.add(h);const c=new E(t,i);c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),this.add(c);const u=new E(t,i);u.position.set(2.291,-.756,-2.621),u.rotation.set(0,-.286,0),u.scale.set(1.546,1.552,1.496),this.add(u);const m=new E(t,i);m.position.set(-2.193,-.369,-5.547),m.rotation.set(0,.516,0),m.scale.set(3.875,3.487,2.986),this.add(m);const g=new E(t,te(50));g.position.set(-16.116,14.37,8.208),g.scale.set(.1,2.428,2.739),this.add(g);const S=new E(t,te(50));S.position.set(-16.109,18.021,-8.207),S.scale.set(.1,2.425,2.751),this.add(S);const p=new E(t,te(17));p.position.set(14.904,12.198,-1.832),p.scale.set(.15,4.265,6.331),this.add(p);const T=new E(t,te(43));T.position.set(-.462,8.89,14.52),T.scale.set(4.38,5.441,.088),this.add(T);const f=new E(t,te(20));f.position.set(3.235,11.486,-12.541),f.scale.set(2.5,2,.1),this.add(f);const x=new E(t,te(100));x.position.set(0,20,0),x.scale.set(1,.1,1),this.add(x)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function te(o){const e=new ee;return e.color.setScalar(o),e}const re={name:"Yashwanth K.",intro:"Strap in. This paddock rents itself to a developer who treats the browser as a circuit — every overtake is a section of his story.",finishTitle:"CHEQUERED FLAG",finishSub:"Race complete — one lap of an F1 circuit is one lap of my career. Podium time.",finishNote:"Every rival you passed carried a chapter of this portfolio. Revisit them, or run the lap again — fresh rubber, same hunger."},de=[{id:"about",tag:"ABOUT",livery:1358020,liveryName:"TEAL",carTag:"CAR 07 · AQUAPORTO",sub:"Who is driving the red car?",body:`I'm Yashwanth — a developer who builds 3D worlds in the browser.
      This circuit isn't a template: it's the fourth immersive site in a
      touring series — sky, space, deep ocean… and now, a Formula 1 paddock.`,facts:[["ROLE","creative developer · 3D engineer"],["HOME CIRCUIT","Hyderabad, India"],["DRIVING STYLE","late braking into new tech"]]},{id:"skills",tag:"SKILLS",livery:3900150,liveryName:"BLUE",carTag:"CAR 11 · CELERIA",body:"Telemetry from the garage — the tools that stay glued at 300 km/h:",bars:[["THREE.JS / WEBGL",94,"scenes, shaders, instancing"],["GLSL",90,"custom materials & noise"],["JAVASCRIPT / TS",92,"engine-grade architecture"],["WEB AUDIO",82,"procedural engines, ambience"],["UI / MOTION",87,"interfaces that feel alive"]],facts:[["TOP SPEED","prototype in a weekend"],["COMPOUND","soft + sticky curiosity"]]},{id:"work",tag:"WORK",livery:16742938,liveryName:"ORANGE",carTag:"CAR 22 · SCUTO",body:"Silverware from the previous rounds — full-site builds, all live:",links:[["STARJET","Interplanetary 3D voyage — space-jet cockpit, five GLSL planets","https://yashwanth07-debug.github.io/starjet-portfolio/"],["AURELIA","Sky-archipelago flight — floating worlds, airship chase-cam","https://yashwanth07-debug.github.io/aurelia-3d/"],["ABYSSA","One scroll to the bottom of the ocean — 10,935 m of procedurally built sea","https://yashwanth07-debug.github.io/abyssa/"],["THIS CAR","APEX — the circuit you are driving right now","https://github.com/yashwanth07-debug/apex"]]},{id:"journey",tag:"JOURNEY",livery:10587391,liveryName:"VIOLET",carTag:"CAR 33 · VELA",body:"Sector times from the garage walls — how a rookie season became a championship run:",timeline:[["LAP 00","First HTML page — discovered the web can be bent"],["LAP 07","First WebGL shader compiles — flat feels illegal now"],["LAP 22","Shipped first immersive 3D site; learned perf the hard way"],["LAP 50","Full-scene pipelines: GLSL worlds, WebAudio synth, chase cams"],["LAP ++","WebGPU, raymarching, bigger oceans, faster cars"]]},{id:"awards",tag:"MILESTONES",livery:16106776,liveryName:"GOLD",carTag:"CAR 44 · STRADA",body:"Points on the board — not sponsored, all earned in the garage:",timeline:[["P1 ×3","Three hackathon entries designed, built & shipped solo"],["4 WORLDS","Sky · Space · Ocean · Asphalt — one immersive series"],["0 MB","No external models across the series — everything procedural"],["60 FPS","Performance budget kept on mid-range hardware"]]},{id:"contact",tag:"CONTACT",livery:15265266,liveryName:"WHITE",carTag:"CAR 88 · CHRONO",sub:"Open a radio channel — the pit wall is listening.",body:"The chequer is close. If you liked the drive, the garage door is open:",links:[["GITHUB","yashwanth07-debug","https://github.com/yashwanth07-debug"],["EMAIL","open a channel →","mailto:yashwanth07-debug@users.noreply.github.com"],["APEX REPO","fork this circuit","https://github.com/yashwanth07-debug/apex"]]}];function fe(o,e){const t=Math.sin(o*127.1+e*311.7)*43758.5453;return t-Math.floor(t)}function Rt(o,e){const t=Math.floor(o),s=Math.floor(e),i=o-t,a=e-s,n=i*i*(3-2*i),d=a*a*(3-2*a);return fe(t,s)*(1-n)*(1-d)+fe(t+1,s)*n*(1-d)+fe(t,s+1)*(1-n)*d+fe(t+1,s+1)*n*d}function Ct(o,e,t=4){let s=0,i=.5,a=1;for(let n=0;n<t;n++)s+=i*Rt(o*a,e*a),i*=.5,a*=2.03;return s}const Pt=[[-241.2,105.09,2137.4],[-241,104.93,2180.9],[-244.7,104.82,2224.3],[-253.9,104.71,2266.8],[-265.8,104.61,2308.7],[-282.1,104.56,2349],[-303.5,104.62,2386.9],[-327,104.81,2423.5],[-354.2,105.14,2457.5],[-385.6,105.62,2487.6],[-419,106.19,2515.5],[-452.8,106.84,2543.1],[-486.9,107.54,2570],[-520.7,108.25,2597.5],[-554.7,108.95,2624.7],[-588.6,109.59,2652.1],[-622.8,110.16,2679.1],[-657.1,110.72,2705.9],[-685.3,111.39,2733.4],[-721.3,112.21,2757.8],[-756.9,113.1,2782.8],[-793.6,113.92,2806.1],[-832.5,114.47,2825.7],[-871.4,114.74,2845.2],[-881.5,114.76,2869.2],[-838,114.62,2867],[-795,114.43,2861.2],[-784,114.14,2896.8],[-775.5,113.75,2932.4],[-741.9,113.24,2949.7],[-706.4,112.57,2974.7],[-677.1,111.81,2976.1],[-639,110.97,2955.3],[-611.3,110.13,2975.5],[-568,109.3,2970.9],[-524.9,108.51,2965.7],[-482.4,107.75,2956.3],[-439.9,107.02,2946.8],[-397.8,106.34,2939.7],[-355.4,105.74,2929.9],[-315.6,105.25,2935.7],[-288.4,104.9,2969],[-269.4,104.65,3005.8],[-232,104.48,3010.5],[-189.6,104.36,3020.3],[-147.2,104.28,3030.2],[-126.5,104.23,3004.7],[-118.2,104.22,2962],[-122.2,104.23,2919.6],[-141.4,104.26,2880.5],[-149.9,104.29,2838.6],[-121.7,104.3,2828.5],[-87.1,104.28,2852.4],[-75,104.24,2894.2],[-62.8,104.19,2936],[-34.9,104.16,2963.2],[-5,104.17,2941.6],[-1.4,104.22,2899.2],[-4.4,104.32,2860.2],[-6.5,104.49,2817.6],[19.7,104.73,2784.4],[49.5,105.05,2753.1],[78.5,105.46,2720.7],[95.7,105.94,2684],[110.4,106.5,2649.8],[147.6,107.15,2627.2],[186.5,107.86,2607.7],[225.3,108.74,2588.2],[259.2,109.77,2560.8],[293.4,110.95,2533.9],[328.1,112.26,2507.6],[362.9,113.54,2481.4],[398.7,114.75,2475.9],[403.2,115.85,2449.2],[434.5,116.89,2418.9],[465.8,117.93,2388.6],[496.8,119.14,2385],[521.7,120.6,2369.2],[543.6,122.31,2331.6],[566.8,124.17,2295],[597.8,125.92,2264.4],[628.1,127.5,2233.1],[656.2,128.95,2199.8],[683.6,130.43,2166],[710.2,131.98,2131.6],[735.6,133.53,2096.2],[761.8,135.04,2062.4],[797.7,136.33,2087.1],[814,137.51,2071.3],[816.9,138.61,2027.9],[821,139.59,1984.5],[825.4,140.51,1941.2],[825.2,141.3,1897.7],[821.7,141.93,1857.5],[831.6,142.4,1822.7],[821.3,142.67,1781],[801.2,142.74,1742.6],[775.6,142.68,1707.4],[749.9,142.53,1672.3],[724.1,142.35,1637.2],[699.4,142.17,1601.3],[675.1,141.97,1565.2],[650.8,141.73,1529.1],[625.8,141.43,1493.4],[595.2,141.05,1481.3],[574.6,140.54,1515],[576.5,139.96,1552.6],[550.9,139.24,1587.8],[526.1,138.39,1623.1],[537.8,137.56,1661.7],[517.8,136.69,1698.5],[488.2,135.92,1706.4],[468.2,135.35,1668.6],[430.8,134.86,1647],[389,134.44,1635.4],[345.7,133.86,1636.3],[304.6,132.99,1622.1],[265.5,131.82,1602.9],[226.8,130.41,1583],[184.5,129.06,1573.1],[141.2,127.96,1573.7],[97.9,127.29,1573.6],[61.8,127.12,1551.6],[50.3,127.39,1510.9],[55.4,127.97,1467.7],[60.8,128.69,1424.5],[66.3,129.34,1381.3],[56,129.75,1339.3],[32.2,129.83,1307.2],[11.2,129.59,1280.8],[-22.4,129.06,1271.6],[-51.8,128.36,1286.2],[-82.4,127.48,1301],[-125.5,126.49,1307.8],[-153.4,125.41,1325.9],[-195,124.23,1334.4],[-236.2,123.04,1337],[-265.9,121.82,1367.9],[-292.5,120.61,1395.5],[-307.1,119.4,1436.6],[-321.7,118.21,1477.6],[-335,117.16,1519.1],[-365.8,116.3,1546],[-408.9,115.72,1544.7],[-441.5,115.38,1516.6],[-449.4,115.05,1521.2],[-439.7,114.63,1563.7],[-429.8,114.01,1606.1],[-419.5,113.17,1648.4],[-406.2,112.27,1689.8],[-391.1,111.39,1730.6],[-374.6,110.59,1770.9],[-357.3,109.89,1810.9],[-339.7,109.21,1850.7],[-322.1,108.51,1890.6],[-304.8,107.77,1930.5],[-287.1,107.01,1970.3],[-270.1,106.3,2010.4],[-256.6,105.73,2051.8],[-247.2,105.34,2094.3]],U=7.2,It=Pt,Lt=2e3;function Ft(o){const e=new it(It.map(f=>new w(...f)),!0,"centripetal",.5),t=e.getSpacedPoints(Lt),s=e.getLength(),i=new G;o.add(i);const a=new ue,n=[],d=[],l=[],h=[],c=new w;new w;const u=new w,m=t.length;for(let f=0;f<=m;f++){const x=f%m,v=t[x],M=t[(x+1)%m],R=t[(x-1+m)%m];u.subVectors(M,R).normalize(),c.crossVectors(new w(0,1,0),u).normalize();const L=p(v);for(const b of[-1,1]){const A=v.clone().addScaledVector(c,b*U);n.push(A.x,A.y+.02,A.z),d.push(0,1,0);const F=.5+b*.5;l.push(f/m*s/26,F);const C=.9+L*.07;h.push(.088*C,.092*C,.098*C)}}const g=[];for(let f=0;f<m;f++){const x=f*2,v=f*2+1,M=f*2+2,R=f*2+3;g.push(x,v,M,v,R,M)}a.setIndex(g),a.setAttribute("position",new H(n,3)),a.setAttribute("normal",new H(d,3)),a.setAttribute("uv",new H(l,2)),a.setAttribute("color",new H(h,3));const S=new E(a,new D({vertexColors:!0,roughness:.94,metalness:.02,side:ye}));S.receiveShadow=!0,i.add(S);function p(f,x){return Ct(f.x*.01,f.z*.01,3)-.5}return Ve(t,i,-1),Ve(t,i,1),Nt(t,i),Dt(t,i),Ot(t,i),{pts:t,LEN:s,curve:e,nearest(f,x){const v=t.length;let M=f,R=1/0;for(let L=-80;L<=80;L+=4){const b=((f+L)%v+v)%v,A=t[b].distanceToSquared(x);A<R&&(R=A,M=b)}for(let L=-3;L<=3;L++){const b=((M+L)%v+v)%v,A=t[b].distanceToSquared(x);A<R&&(R=A,M=b)}return M},at(f,x={}){const v=t.length,M=Math.floor(f),R=(M%v+v)%v,L=t[(R+1)%v],b=t[(R-1+v)%v];return x.point=t[R],x.tangent=x.tangent||new w,x.tangent.subVectors(L,b).normalize(),x.left=x.left||new w,x.left.crossVectors(new w(0,1,0),x.tangent).normalize(),x.frac=M/v,x},heightAt(f){const x=t.length,v=Math.floor(f);return t[(v%x+x)%x].y}}}function _t(o,e,t,s,i){const a=new ue,n=[],d=[],l=[],h=new w,c=new w,u=new ae,m=o.length;for(let p=0;p<=m;p++){const T=p%m,f=o[T],x=o[(T+1)%m],v=o[(T-1+m)%m];c.subVectors(x,v).normalize(),h.crossVectors(new w(0,1,0),c).normalize();const M=f.clone().addScaledVector(h,t*U),R=f.clone().addScaledVector(h,t*(U+1.6));n.push(M.x,M.y+.03,M.z,R.x,R.y+.05,R.z),d.push(0,1,0,0,1,0),u.set(p%8<4?s:i),l.push(u.r,u.g,u.b,u.r,u.g,u.b)}const g=[];for(let p=0;p<m;p++){const T=p*2,f=p*2+1,x=p*2+2,v=p*2+3;g.push(T,f,x,f,v,x)}a.setIndex(g),a.setAttribute("position",new H(n,3)),a.setAttribute("normal",new H(d,3)),a.setAttribute("color",new H(l,3));const S=new E(a,new D({vertexColors:!0,roughness:.85,side:ye}));S.receiveShadow=!0,e.add(S)}function Ve(o,e,t){_t(o,e,t,13704490,15922422)}function Nt(o,e){for(const t of[-1,1]){const s=new ue,i=[],a=[],n=new w,d=new w,l=o.length;for(let u=0;u<=l;u++){const m=u%l,g=o[m],S=o[(m+1)%l],p=o[(m-1+l)%l];d.subVectors(S,p).normalize(),n.crossVectors(new w(0,1,0),d).normalize();const T=g.clone().addScaledVector(n,t*(U-.7)),f=g.clone().addScaledVector(n,t*(U-.28));i.push(T.x,T.y+.025,T.z,f.x,f.y+.027,f.z),a.push(0,1,0,0,1,0)}const h=[];for(let u=0;u<l;u++){const m=u*2,g=u*2+1,S=u*2+2,p=u*2+3;h.push(m,g,S,g,p,S)}s.setIndex(h),s.setAttribute("position",new H(i,3)),s.setAttribute("normal",new H(a,3));const c=new E(s,new ee({color:15265264,side:ye}));e.add(c)}}function Dt(o,e){const t=document.createElement("canvas");t.width=1024,t.height=1024;const s=t.getContext("2d");s.clearRect(0,0,1024,1024);const i=64;for(let h=0;h<2;h++)for(let c=0;c<16;c++)s.fillStyle=(h+c)%2?"rgba(240,244,246,0.95)":"rgba(14,16,19,0.92)",s.fillRect(c*i,24+h*i,i,i);s.fillStyle="rgba(255,30,45,0.65)",s.fillRect(0,176,1024,10),s.strokeStyle="rgba(235,240,244,0.5)",s.lineWidth=7;for(let h=0;h<8;h++){const c=230+h*96,u=h%2?80:430;s.strokeRect(u,c,300,64)}const a=new je(t);a.anisotropy=8;const n=new E(new Ae(U*2-1,30),new ee({map:a,transparent:!0,depthWrite:!1}));n.rotation.x=-Math.PI/2;const d=6;n.position.copy(o[d]),n.position.y+=.06;const l=new w().subVectors(o[d+4],o[d-4]).normalize();n.rotation.z=-Math.atan2(l.z,l.x)+Math.PI/2,e.add(n)}function Ot(o,e){const t=new P(5.4,.62,.26),s=new D({color:12174026,roughness:.5,metalness:.7}),i=o.length,a=Math.floor(i/6),n=new De(t,s,a*2),d=new De(t,s,a*2),l=new ie,h=new at,c=new w(1,1,1);let u=0,m=0;const g=new w,S=new w;for(let p=0;p<2;p++){const T=p===0?-1:1;for(let f=0;f<i;f+=6){const x=o[f%i],v=o[(f+6)%i];g.subVectors(v,x).normalize(),S.crossVectors(new w(0,1,0),g).normalize();const M=x.clone().addScaledVector(S,T*(U+3.4));M.y+=.55,h.setFromRotationMatrix(new ie().lookAt(g,new w,new w(0,1,0))),l.compose(M,h,c),n.setMatrixAt(u++,l);const R=M.clone();R.y-=.45;const L=new ie().compose(R,h,new w(.09,1.7,3.4));d.setMatrixAt(m++,L)}}n.count=u,d.count=m,e.add(n),e.add(d),Ut(o,e)}function Ut(o,e){const t=zt("APEX GRAND PRIX"),s=new G,i=o.length;for(const a of[160,700,1250,1800]){const n=a%i,d=o[n],l=o[(n+5)%i],h=new w().subVectors(l,d).normalize(),c=new w().crossVectors(new w(0,1,0),h).normalize(),u=new E(new P(U*2+8,1.1,1.1),new D({color:1843494,roughness:.6,metalness:.5}));u.position.copy(d).y+=9.2,u.position.copy(d),u.position.y+=9.2,u.quaternion.setFromRotationMatrix(new ie().lookAt(c,new w,new w(0,1,0))),s.add(u);const m=new E(new Ae(U*1.6,2.6),new ee({map:t,side:ye}));m.position.copy(d),m.position.y+=7.6,m.quaternion.setFromRotationMatrix(new ie().lookAt(h,new w,new w(0,1,0))),s.add(m);for(const g of[-1,1]){const S=new E(new P(.55,9.5,.55),u.material);S.position.copy(d).addScaledVector(c,g*(U+3.5)),S.position.y+=4.7,s.add(S)}}e.add(s)}function zt(o,e=1024,t=128){const s=document.createElement("canvas");s.width=e,s.height=t;const i=s.getContext("2d");i.fillStyle="#0d1117",i.fillRect(0,0,e,t),i.fillStyle="#ff1e2d",i.fillRect(0,0,26,t),i.fillRect(e-26,0,26,t),i.font='800 64px "IBM Plex Mono", monospace',i.textAlign="center",i.textBaseline="middle",i.fillStyle="#f2f6fa",i.fillText(o,e/2,t/2+4,e-120);const a=new je(s);return a.anisotropy=8,a}function Bt(o,e,t){const s=new E(new _e(26e3,32,20),new q({side:Xe,depthWrite:!1,fog:!1,uniforms:{uTime:{value:0}},vertexShader:`
        varying vec3 vDir;
        void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
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
        }`}));s.frustumCulled=!1,o.add(s),o.fog=new ot(13096676,2200,24e3);const i=new nt(16774112,3.1);i.position.set(180,240,150),i.castShadow=!0,i.shadow.mapSize.set(2048,2048),i.shadow.camera.near=30,i.shadow.camera.far=700;const a=130;i.shadow.camera.left=-a,i.shadow.camera.right=a,i.shadow.camera.top=a,i.shadow.camera.bottom=-a,i.shadow.bias=-4e-4,o.add(i),o.add(i.target);const n=new rt(10471144,4151860,.9);o.add(n);const d=new lt(16777215,.14);o.add(d);const l={sky:s,sun:i},h=new G;return o.add(h),l.startBulbs=Vt(e,h)||[],kt(),{anim:l,followShadow(c,u){i.position.set(c.x+180,240,c.z+150),i.target.position.copy(c),i.target.updateMatrixWorld()},lightsOut(){for(const c of l.startBulbs||[])c.color.set(1931834),c.emissive.set(1007402);setTimeout(()=>{for(const c of l.startBulbs||[])c.color.set(1711392),c.emissive.set(0)},2600)},update(c,u){s.material.uniforms.uTime.value=c,s.position.copy(u)}}}function Vt(o,e){o.pts.length;const t=2,s=o.pts[t],i=o.pts[t+6],a=new w().subVectors(i,s).normalize(),n=new w().crossVectors(new w(0,1,0),a).normalize(),d=new G,l=new E(new P(.65,11,.65),new D({color:2304561,roughness:.5,metalness:.6}));l.position.y=5.5,l.castShadow=!0,d.add(l);const h=new E(new P(3.4,1.7,.9),new D({color:1316636,emissive:1118481}));h.position.y=10.6,d.add(h);const c=[];for(let u=0;u<5;u++){const m=new E(new _e(.3,10,8),new D({color:3804947,emissive:5771286,emissiveIntensity:1.4}));m.position.set(-1.5+u*.75,10.6,.55),d.add(m),c.push(m.material)}return d.position.copy(s).addScaledVector(n,U+3.2),d.quaternion.setFromRotationMatrix(new ie().lookAt(a,new w,new w(0,1,0))),e.add(d),c}function kt(o,e){new D({color:15885354,roughness:.8}),new D({color:13555420,roughness:.7})}function ke({paint:o=14750750,accent:e=1053206,number:t=23,name:s="NEREIS"}={}){const i=new G,a=new Oe({color:o,roughness:.32,metalness:.08,clearcoat:1,clearcoatRoughness:.14}),n=new D({color:1316635,roughness:.6,metalness:.5}),d=new Oe({color:e,roughness:.4,metalness:.2,clearcoat:.6}),l=new D({color:789775,roughness:.9}),h=new D({color:12173254,roughness:.28,metalness:.85}),c=(v,M,R,L,b,A=[1,1,1],F=[0,0,0])=>{const C=new E(v,M);return C.position.set(R,L,b),C.scale.set(...A),C.rotation.set(...F),C.castShadow=!0,i.add(C),C};c(new P(1.7,.5,3.4),a,0,.42,-.2).geometry.translate(0,0,0);const m=c(new Y(.34,.13,1.9,10),a,0,.36,2.35,[1,1,1.06],[Math.PI/2-.1,0,0]);m.rotation.x=Math.PI/2-.1,c(new Y(.34,.46,.8,10),a,0,.44,1.35,[1,1,1.15],[Math.PI/2,0,0]),c(new P(.62,.42,1.7),a,-.86,.42,-.35,[1,1,1],[0,.06,0]),c(new P(.62,.42,1.7),a,.86,.42,-.35,[1,1,1],[0,-.06,0]),c(new Y(.29,.5,1.5,10),a,0,.62,-1.7,[1,1,1.1],[Math.PI/2,0,0]);const g=c(new P(.045,.52,1.7),a,0,.85,-1.3,[1,1,1],[.16,0,0]);g.castShadow=!1,c(new Y(.42,.52,.35,12),a,0,.68,-.45,[1,1,1.3]);const S=c(new _e(.16,12,10),new D({color:15922422,roughness:.35,metalness:.2}),0,.82,-.52);S.castShadow=!1,c(new Ue(.34,.035,8,18,Math.PI*1.1),n,0,.86,-.5,[1,1,1],[Math.PI/2+.32,1.6,1.5]),c(new P(.05,.28,.05),n,0,.72,-.28),c(new P(2.05,.06,.62),n,0,.13,3,[1,1,1],[.06,0,0]),c(new P(1.9,.045,.34),a,0,.22,2.74,[1,1,1],[.12,0,0]),c(new P(.03,.34,.6),d,-1.02,.25,2.9),c(new P(.03,.34,.6),d,1.02,.25,2.9),c(new P(1.35,.05,.42),n,0,1.06,-2.45,[1,1,1],[-.24,0,0]),c(new P(1.25,.04,.26),a,0,.78,-2.3,[1,1,1],[-.12,0,0]),c(new P(.03,.5,.62),a,-.68,.92,-2.4,[1,1,1],[-.1,0,0]),c(new P(.03,.5,.62),a,.68,.92,-2.4,[1,1,1],[-.1,0,0]),c(new P(1.5,.14,.9),n,0,.16,-2.25,[1,1,1],[-.18,0,0]),c(new P(1.9,.05,4.9),n,0,.16,-.1),c(new P(.16,.06,.1),a,-.55,.66,.28),c(new P(.16,.06,.1),a,.55,.66,.28),c(new Y(.016,.016,.34,6),n,0,.9,.9),c(new P(.34,.3,.02),new D({color:15922422,roughness:.4}),0,.5,3.22,[1,1,1],[-.35,0,0]);const p=new Ue(.26,.115,10,22),T=(v,M,R)=>{const L=new G;L.position.set(v,.27,M);const b=new G,A=new E(p,l);A.rotation.y=Math.PI/2,A.castShadow=!0;const F=new E(new Y(.15,.15,.1,14),h);F.rotation.z=Math.PI/2;const C=new E(new Y(.075,.075,.13,10),n);return C.rotation.z=Math.PI/2,b.add(A,F,C),L.add(b),i.add(L),{g:L,spin:b,steerable:R}},f=[T(-.83,1.55,!0),T(.83,1.55,!0),T(-.83,-1.65,!1),T(.83,-1.65,!1)];for(const[v,M]of[[-.5,1.55],[.5,1.55],[-.5,-1.65],[.5,-1.65]])c(new P(.9,.035,.035),n,v,.32,M,[1,1,1],[0,0,v>0?.12:-.12]);const x=c(new Ae(.5,.35),new ee({color:16752704,transparent:!0,opacity:0}),0,.32,-2.62);return x.rotation.y=Math.PI,i.userData={wheels:f,paintMat:a,shimmer:x,helm:S},i.userData.setLivery=v=>{a.color.set(v)},i.userData.spin=(v,M)=>{for(const R of f)R.spin.rotation.x+=v,R.steerable&&(R.g.rotation.y=M*.42)},i}const Gt="/apex/models/ferrari_f1_2019.glb",Ht=5.9;let Ee=null,le=null;function Wt(){return Ee?Promise.resolve(Ee):le||(le=new Promise((o,e)=>{new $e().load(Gt,t=>{Ee=t,o(t)},void 0,t=>{le=null,e(t)})}),le)}function Qt(o){const e=new G,t=new G;t.add(o.scene),e.add(t),o.scene.traverse(p=>{p.isMesh&&(p.castShadow=!0,p.receiveShadow=!0)});const s={};o.scene.traverse(p=>{const T=p.name||"";(T.startsWith("Tire")||T.startsWith("Rim")||T.startsWith("Decal Tire"))&&(s[T]||(s[T]=[])).push(p)});const i=p=>s[p]&&s[p][0]||null,a=(p,T)=>{for(const f of Object.keys(s))if(f.startsWith(p)&&f!==T)return s[f][0];return null},n=[{tire:i("Tire FL"),rim:i("Rim FL"),steerable:!0},{tire:a("Tire F","Tire FL"),rim:a("Rim F","Rim FL"),steerable:!0},{tire:i("Tire RL"),rim:i("Rim RL"),steerable:!1},{tire:i("Tire RL.001"),rim:i("Rim RL.001"),steerable:!1}],d=[];o.scene.traverse(p=>{p.isMesh&&(p.name||"").startsWith("Decal Tire")&&d.push(p)});const l=d.map(p=>({d:p,p:p.getWorldPosition(new w)})),h=[];for(const p of n){if(!p.tire)continue;const T=new ze().setFromObject(p.tire).getCenter(new w),f=new G;f.position.copy(T),t.add(f);const x=new G;f.add(x),p.rim&&x.attach(p.rim);for(const{d:v,p:M}of l)v.parent&&M.distanceTo(T)<.55&&x.attach(v);h.push({g:f,spin:x,steerable:p.steerable})}const c=new ze().setFromObject(t),u=c.getSize(new w),m=Ht/u.z,g=c.getCenter(new w);t.scale.setScalar(m),t.position.set(-g.x*m,-c.min.y*m,-g.z*m);const S=new E(new Ae(.5,.3),new ee({color:16752704,transparent:!0,opacity:0,depthWrite:!1}));return S.rotation.y=Math.PI,S.position.set(0,.45,-3),e.add(S),e.userData={wheels:h,rideHeight:.06,shimmer:S,setLivery(){}},e.userData.spin=(p,T)=>{for(const f of h)f.spin.rotation.x+=p,f.steerable&&(f.g.rotation.y=T*.42)},e}const Xt="/apex/models/spa.glb",jt=["grass","hill","pine","gbrm","grvl"];let ce=null;function $t(){return ce||(ce=new Promise((o,e)=>{new $e().load(Xt,t=>{const s=t.scene;let i=0,a=0;s.traverse(n=>{if(!n.isMesh)return;const d=(n.material&&n.material.name||n.name||"").toLowerCase();jt.some(l=>d.includes(l))?(n.castShadow=!1,n.receiveShadow=!0,i++):(n.visible=!1,a++)}),console.log(`[spa] kept ${i} terrain meshes, hid ${a}`),o(s)},void 0,t=>{ce=null,e(t)})}),ce)}const Ke={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class ne{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Yt=new ct(-1,1,1,-1,0,1);class qt extends ue{constructor(){super(),this.setAttribute("position",new H([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new H([0,2,0,0,2,0],2))}}const Kt=new qt;class Ne{constructor(e){this._mesh=new E(Kt,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Yt)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Ce extends ne{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof q?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=we.clone(e.uniforms),this.material=new q({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Ne(this.material)}render(e,t,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Ge extends ne{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,s){const i=e.getContext(),a=e.state;a.buffers.color.setMask(!1),a.buffers.depth.setMask(!1),a.buffers.color.setLocked(!0),a.buffers.depth.setLocked(!0);let n,d;this.inverse?(n=0,d=1):(n=1,d=0),a.buffers.stencil.setTest(!0),a.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),a.buffers.stencil.setFunc(i.ALWAYS,n,4294967295),a.buffers.stencil.setClear(d),a.buffers.stencil.setLocked(!0),e.setRenderTarget(s),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),a.buffers.color.setLocked(!1),a.buffers.depth.setLocked(!1),a.buffers.color.setMask(!0),a.buffers.depth.setMask(!0),a.buffers.stencil.setLocked(!1),a.buffers.stencil.setFunc(i.EQUAL,1,4294967295),a.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),a.buffers.stencil.setLocked(!0)}}class Jt extends ne{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Zt{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const s=e.getSize(new k);this._width=s.width,this._height=s.height,t=new ve(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:xe}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ce(Ke),this.copyPass.material.blending=dt,this.clock=new Ye}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let s=!1;for(let i=0,a=this.passes.length;i<a;i++){const n=this.passes[i];if(n.enabled!==!1){if(n.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),n.render(this.renderer,this.writeBuffer,this.readBuffer,e,s),n.needsSwap){if(s){const d=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(d.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(d.EQUAL,1,4294967295)}this.swapBuffers()}Ge!==void 0&&(n instanceof Ge?s=!0:n instanceof Jt&&(s=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new k);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const s=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(s,i),this.renderTarget2.setSize(s,i);for(let a=0;a<this.passes.length;a++)this.passes[a].setSize(s,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class es extends ne{constructor(e,t,s=null,i=null,a=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=s,this.clearColor=i,this.clearAlpha=a,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new ae}render(e,t,s){const i=e.autoClear;e.autoClear=!1;let a,n;this.overrideMaterial!==null&&(n=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(a=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:s),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(a),this.overrideMaterial!==null&&(this.scene.overrideMaterial=n),e.autoClear=i}}const ts={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new ae(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class oe extends ne{constructor(e,t,s,i){super(),this.strength=t!==void 0?t:1,this.radius=s,this.threshold=i,this.resolution=e!==void 0?new k(e.x,e.y):new k(256,256),this.clearColor=new ae(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),n=Math.round(this.resolution.y/2);this.renderTargetBright=new ve(a,n,{type:xe}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const m=new ve(a,n,{type:xe});m.texture.name="UnrealBloomPass.h"+u,m.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(m);const g=new ve(a,n,{type:xe});g.texture.name="UnrealBloomPass.v"+u,g.texture.generateMipmaps=!1,this.renderTargetsVertical.push(g),a=Math.round(a/2),n=Math.round(n/2)}const d=ts;this.highPassUniforms=we.clone(d.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new q({uniforms:this.highPassUniforms,vertexShader:d.vertexShader,fragmentShader:d.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];a=Math.round(this.resolution.x/2),n=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new k(1/a,1/n),a=Math.round(a/2),n=Math.round(n/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const h=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=h,this.bloomTintColors=[new w(1,1,1),new w(1,1,1),new w(1,1,1),new w(1,1,1),new w(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const c=Ke;this.copyUniforms=we.clone(c.uniforms),this.blendMaterial=new q({uniforms:this.copyUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader,blending:ht,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new ae,this.oldClearAlpha=1,this.basic=new ee,this.fsQuad=new Ne(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let s=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(s,i);for(let a=0;a<this.nMips;a++)this.renderTargetsHorizontal[a].setSize(s,i),this.renderTargetsVertical[a].setSize(s,i),this.separableBlurMaterials[a].uniforms.invSize.value=new k(1/s,1/i),s=Math.round(s/2),i=Math.round(i/2)}render(e,t,s,i,a){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const n=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),a&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=s.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=s.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let d=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=d.texture,this.separableBlurMaterials[l].uniforms.direction.value=oe.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=oe.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),d=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(s),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=n}getSeperableBlurMaterial(e){const t=[];for(let s=0;s<e;s++)t.push(.39894*Math.exp(-.5*s*s/(e*e))/e);return new q({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new k(.5,.5)},direction:{value:new k(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new q({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}oe.BlurDirectionX=new k(1,0);oe.BlurDirectionY=new k(0,1);const ss={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class is extends ne{constructor(){super();const e=ss;this.uniforms=we.clone(e.uniforms),this.material=new ut({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new Ne(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,s){this.uniforms.tDiffuse.value=s.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},ft.getTransfer(this._outputColorSpace)===pt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===mt?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===gt?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===vt?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===qe?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===xt?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===wt&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const as={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new k(1/1024,1/512)}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
		precision highp float;

		uniform sampler2D tDiffuse;

		uniform vec2 resolution;

		varying vec2 vUv;

		// FXAA 3.11 implementation by NVIDIA, ported to WebGL by Agost Biro (biro@archilogic.com)

		//----------------------------------------------------------------------------------
		// File:        es3-keplerFXAAassetsshaders/FXAA_DefaultES.frag
		// SDK Version: v3.00
		// Email:       gameworks@nvidia.com
		// Site:        http://developer.nvidia.com/
		//
		// Copyright (c) 2014-2015, NVIDIA CORPORATION. All rights reserved.
		//
		// Redistribution and use in source and binary forms, with or without
		// modification, are permitted provided that the following conditions
		// are met:
		//  * Redistributions of source code must retain the above copyright
		//    notice, this list of conditions and the following disclaimer.
		//  * Redistributions in binary form must reproduce the above copyright
		//    notice, this list of conditions and the following disclaimer in the
		//    documentation and/or other materials provided with the distribution.
		//  * Neither the name of NVIDIA CORPORATION nor the names of its
		//    contributors may be used to endorse or promote products derived
		//    from this software without specific prior written permission.
		//
		// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS ''AS IS'' AND ANY
		// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
		// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
		// PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
		// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
		// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
		// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
		// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
		// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
		// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
		// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
		//
		//----------------------------------------------------------------------------------

		#ifndef FXAA_DISCARD
			//
			// Only valid for PC OpenGL currently.
			// Probably will not work when FXAA_GREEN_AS_LUMA = 1.
			//
			// 1 = Use discard on pixels which don't need AA.
			//     For APIs which enable concurrent TEX+ROP from same surface.
			// 0 = Return unchanged color on pixels which don't need AA.
			//
			#define FXAA_DISCARD 0
		#endif

		/*--------------------------------------------------------------------------*/
		#define FxaaTexTop(t, p) texture2D(t, p, -100.0)
		#define FxaaTexOff(t, p, o, r) texture2D(t, p + (o * r), -100.0)
		/*--------------------------------------------------------------------------*/

		#define NUM_SAMPLES 5

		// assumes colors have premultipliedAlpha, so that the calculated color contrast is scaled by alpha
		float contrast( vec4 a, vec4 b ) {
			vec4 diff = abs( a - b );
			return max( max( max( diff.r, diff.g ), diff.b ), diff.a );
		}

		/*============================================================================

									FXAA3 QUALITY - PC

		============================================================================*/

		/*--------------------------------------------------------------------------*/
		vec4 FxaaPixelShader(
			vec2 posM,
			sampler2D tex,
			vec2 fxaaQualityRcpFrame,
			float fxaaQualityEdgeThreshold,
			float fxaaQualityinvEdgeThreshold
		) {
			vec4 rgbaM = FxaaTexTop(tex, posM);
			vec4 rgbaS = FxaaTexOff(tex, posM, vec2( 0.0, 1.0), fxaaQualityRcpFrame.xy);
			vec4 rgbaE = FxaaTexOff(tex, posM, vec2( 1.0, 0.0), fxaaQualityRcpFrame.xy);
			vec4 rgbaN = FxaaTexOff(tex, posM, vec2( 0.0,-1.0), fxaaQualityRcpFrame.xy);
			vec4 rgbaW = FxaaTexOff(tex, posM, vec2(-1.0, 0.0), fxaaQualityRcpFrame.xy);
			// . S .
			// W M E
			// . N .

			bool earlyExit = max( max( max(
					contrast( rgbaM, rgbaN ),
					contrast( rgbaM, rgbaS ) ),
					contrast( rgbaM, rgbaE ) ),
					contrast( rgbaM, rgbaW ) )
					< fxaaQualityEdgeThreshold;
			// . 0 .
			// 0 0 0
			// . 0 .

			#if (FXAA_DISCARD == 1)
				if(earlyExit) FxaaDiscard;
			#else
				if(earlyExit) return rgbaM;
			#endif

			float contrastN = contrast( rgbaM, rgbaN );
			float contrastS = contrast( rgbaM, rgbaS );
			float contrastE = contrast( rgbaM, rgbaE );
			float contrastW = contrast( rgbaM, rgbaW );

			float relativeVContrast = ( contrastN + contrastS ) - ( contrastE + contrastW );
			relativeVContrast *= fxaaQualityinvEdgeThreshold;

			bool horzSpan = relativeVContrast > 0.;
			// . 1 .
			// 0 0 0
			// . 1 .

			// 45 deg edge detection and corners of objects, aka V/H contrast is too similar
			if( abs( relativeVContrast ) < .3 ) {
				// locate the edge
				vec2 dirToEdge;
				dirToEdge.x = contrastE > contrastW ? 1. : -1.;
				dirToEdge.y = contrastS > contrastN ? 1. : -1.;
				// . 2 .      . 1 .
				// 1 0 2  ~=  0 0 1
				// . 1 .      . 0 .

				// tap 2 pixels and see which ones are "outside" the edge, to
				// determine if the edge is vertical or horizontal

				vec4 rgbaAlongH = FxaaTexOff(tex, posM, vec2( dirToEdge.x, -dirToEdge.y ), fxaaQualityRcpFrame.xy);
				float matchAlongH = contrast( rgbaM, rgbaAlongH );
				// . 1 .
				// 0 0 1
				// . 0 H

				vec4 rgbaAlongV = FxaaTexOff(tex, posM, vec2( -dirToEdge.x, dirToEdge.y ), fxaaQualityRcpFrame.xy);
				float matchAlongV = contrast( rgbaM, rgbaAlongV );
				// V 1 .
				// 0 0 1
				// . 0 .

				relativeVContrast = matchAlongV - matchAlongH;
				relativeVContrast *= fxaaQualityinvEdgeThreshold;

				if( abs( relativeVContrast ) < .3 ) { // 45 deg edge
					// 1 1 .
					// 0 0 1
					// . 0 1

					// do a simple blur
					return mix(
						rgbaM,
						(rgbaN + rgbaS + rgbaE + rgbaW) * .25,
						.4
					);
				}

				horzSpan = relativeVContrast > 0.;
			}

			if(!horzSpan) rgbaN = rgbaW;
			if(!horzSpan) rgbaS = rgbaE;
			// . 0 .      1
			// 1 0 1  ->  0
			// . 0 .      1

			bool pairN = contrast( rgbaM, rgbaN ) > contrast( rgbaM, rgbaS );
			if(!pairN) rgbaN = rgbaS;

			vec2 offNP;
			offNP.x = (!horzSpan) ? 0.0 : fxaaQualityRcpFrame.x;
			offNP.y = ( horzSpan) ? 0.0 : fxaaQualityRcpFrame.y;

			bool doneN = false;
			bool doneP = false;

			float nDist = 0.;
			float pDist = 0.;

			vec2 posN = posM;
			vec2 posP = posM;

			int iterationsUsed = 0;
			int iterationsUsedN = 0;
			int iterationsUsedP = 0;
			for( int i = 0; i < NUM_SAMPLES; i++ ) {
				iterationsUsed = i;

				float increment = float(i + 1);

				if(!doneN) {
					nDist += increment;
					posN = posM + offNP * nDist;
					vec4 rgbaEndN = FxaaTexTop(tex, posN.xy);
					doneN = contrast( rgbaEndN, rgbaM ) > contrast( rgbaEndN, rgbaN );
					iterationsUsedN = i;
				}

				if(!doneP) {
					pDist += increment;
					posP = posM - offNP * pDist;
					vec4 rgbaEndP = FxaaTexTop(tex, posP.xy);
					doneP = contrast( rgbaEndP, rgbaM ) > contrast( rgbaEndP, rgbaN );
					iterationsUsedP = i;
				}

				if(doneN || doneP) break;
			}


			if ( !doneP && !doneN ) return rgbaM; // failed to find end of edge

			float dist = min(
				doneN ? float( iterationsUsedN ) / float( NUM_SAMPLES - 1 ) : 1.,
				doneP ? float( iterationsUsedP ) / float( NUM_SAMPLES - 1 ) : 1.
			);

			// hacky way of reduces blurriness of mostly diagonal edges
			// but reduces AA quality
			dist = pow(dist, .5);

			dist = 1. - dist;

			return mix(
				rgbaM,
				rgbaN,
				dist * .5
			);
		}

		void main() {
			const float edgeDetectionQuality = .2;
			const float invEdgeDetectionQuality = 1. / edgeDetectionQuality;

			gl_FragColor = FxaaPixelShader(
				vUv,
				tDiffuse,
				resolution,
				edgeDetectionQuality, // [0,1] contrast needed, otherwise early discard
				invEdgeDetectionQuality
			);

		}
	`},os={uniforms:{tDiffuse:{value:null},uSpeed:{value:0}},vertexShader:`
    varying vec2 vUv;
    void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
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
    }`};function ns(o,e,t){const s=new Zt(o);s.addPass(new es(e,t));const i=new oe(new k(innerWidth,innerHeight),.34,.75,.82);s.addPass(i);const a=new Ce(os);s.addPass(a);const n=new Ce(as);return s.addPass(n),s.addPass(new is),{bloom:i,grade:a,render(){s.render()},setSize(d,l,h){s.setPixelRatio(h),s.setSize(d,l),n.material.uniforms.resolution.value.set(1/(d*h),1/(l*h))},setSpeed(d){a.uniforms.uSpeed.value=d}}}class rs{constructor(){this.ctx=null,this.on=!0,this.gear=0}start(){if(this.ctx)return;const e=this.ctx=new(window.AudioContext||window.webkitAudioContext),t=this.master=e.createGain();t.gain.value=0;const s=e.createDynamicsCompressor();t.connect(s).connect(e.destination),t.gain.linearRampToValueAtTime(.6,e.currentTime+1.6),this.engFilter=e.createBiquadFilter(),this.engFilter.type="lowpass",this.engFilter.frequency.value=900,this.engFilter.Q.value=2.4,this.engGain=e.createGain(),this.engGain.gain.value=0,this.engFilter.connect(this.engGain).connect(t),this.osc=[];const i=[["sawtooth",1,.5],["sawtooth",1.494,.36],["square",.5,.3]];for(const[g,S,p]of i){const T=e.createOscillator();T.type=g,T.frequency.value=60*S;const f=e.createGain();f.gain.value=p,T.connect(f).connect(this.engFilter),T.start(),this.osc.push({o:T,mult:S})}const a=e.sampleRate*2,n=e.createBuffer(1,a,e.sampleRate),d=n.getChannelData(0);for(let g=0;g<a;g++)d[g]=Math.random()*2-1;const l=e.createBufferSource();l.buffer=n,l.loop=!0,this.windFilter=e.createBiquadFilter(),this.windFilter.type="highpass",this.windFilter.frequency.value=480,this.windGain=e.createGain(),this.windGain.gain.value=0,l.connect(this.windFilter).connect(this.windGain).connect(t),l.start();const h=e.createBuffer(1,a,e.sampleRate),c=h.getChannelData(0);for(let g=0;g<a;g++)c[g]=Math.random()*2-1;const u=e.createBufferSource();u.buffer=h,u.loop=!0;const m=e.createBiquadFilter();m.type="bandpass",m.frequency.value=700,m.Q.value=.6,this.crowdGain=e.createGain(),this.crowdGain.gain.value=0,u.connect(m).connect(this.crowdGain).connect(t),u.start(),this._crowdLfo=0}update(e,t,s,i,a){if(!this.ctx||!this.on)return;const n=this.ctx.currentTime,d=60+t*155+s*9;for(const{o:u,mult:m}of this.osc)u.frequency.setTargetAtTime(d*m,n,.03);const l=Math.min(.5,.16+t*.34);this.engGain.gain.setTargetAtTime(l,n,.05),this.engFilter.frequency.setTargetAtTime(450+t*2400,n,.06);const h=Math.abs(e);this.windGain.gain.setTargetAtTime(Math.min(.4,h*h*55e-6),n,.12),this._crowdLfo=n;const c=i*(.55+.25*Math.sin(a*.8));this.crowdGain.gain.setTargetAtTime(Math.min(.5,c*.42),n,.3)}shift(){if(!this.ctx||!this.on)return;const e=this.ctx.currentTime;this.engGain.gain.cancelScheduledValues(e),this.engGain.gain.setValueAtTime(this.engGain.gain.value,e),this.engGain.gain.linearRampToValueAtTime(this.engGain.gain.value*.35,e+.05),this.engGain.gain.linearRampToValueAtTime(Math.min(.5,.2),e+.16)}horn(){if(!this.ctx||!this.on)return;const e=this.ctx,t=e.currentTime;for(const[s,i]of[[523,0],[659,.12],[784,.24],[1046,.36]]){const a=e.createOscillator();a.type="square",a.frequency.value=s;const n=e.createGain();n.gain.setValueAtTime(1e-4,t+i),n.gain.linearRampToValueAtTime(.12,t+i+.03),n.gain.linearRampToValueAtTime(1e-4,t+i+.42),a.connect(n).connect(this.master),a.start(t+i),a.stop(t+i+.5)}}cheer(){if(!this.ctx||!this.on)return;const e=this.ctx.currentTime;this.crowdGain.gain.cancelScheduledValues(e),this.crowdGain.gain.setValueAtTime(.5,e),this.crowdGain.gain.linearRampToValueAtTime(.7,e+.4),this.crowdGain.gain.exponentialRampToValueAtTime(.001,e+5)}toggle(){return this.on=!this.on,this.on}}function ls({onFirstEngage:o}={}){const e={throttle:0,steer:0},t=document.getElementById("joyPad"),s=document.getElementById("joyKnob"),i=document.getElementById("joyFwd"),a=document.getElementById("joyBrake");let n=!1;const d=()=>{if(!n){n=!0;try{o&&o()}catch{}}},l=42;let h=null;const c={t:0,s:0},u={t:0},m={t:0,s:0},g=()=>{e.throttle=u.t||c.t||m.t,e.steer=c.s||m.s,s.classList.toggle("live",Math.abs(e.throttle)>.05||Math.abs(e.steer)>.05)},S=(b,A)=>{s.style.transform=`translate(calc(-50% + ${b}px), calc(-50% + ${A}px))`},p=b=>{const F=Math.abs(b);if(F<.14)return 0;const C=Math.min(1,(F-.14)/(1-.14));return Math.sign(b)*C*C*(3-2*C)};if(t&&s){t.addEventListener("pointerdown",A=>{h=A.pointerId,t.setPointerCapture(h),d();const F=t.getBoundingClientRect(),C=Math.max(-l,Math.min(l,A.clientX-(F.left+F.width/2))),X=Math.max(-l,Math.min(l,A.clientY-(F.top+F.height/2)));c.s=p(C/l),c.t=Math.abs(X/l)<.1?0:-X/l,S(C,X),g()}),t.addEventListener("pointermove",A=>{if(h===null||A.pointerId!==h)return;const F=t.getBoundingClientRect(),C=Math.max(-l,Math.min(l,A.clientX-(F.left+F.width/2))),X=Math.max(-l,Math.min(l,A.clientY-(F.top+F.height/2)));c.s=p(C/l),c.t=Math.abs(X/l)<.1?0:-X/l,S(C,X),g()});const b=A=>{h===null||A&&A.pointerId!==h||(h=null,c.t=0,c.s=0,S(0,0),g())};t.addEventListener("pointerup",b),t.addEventListener("pointercancel",b)}const T=(b,A)=>{const F=X=>{X.preventDefault(),d(),b.classList.add("live"),u.t=A,g()},C=()=>{b.classList.remove("live"),u.t=0,g()};b.addEventListener("pointerdown",F),b.addEventListener("pointerup",C),b.addEventListener("pointercancel",C),b.addEventListener("pointerleave",C)};i&&T(i,1),a&&T(a,-1);const f={KeyW:1,ArrowUp:1,KeyS:-1,ArrowDown:-1},x={KeyA:-1,ArrowLeft:-1,KeyD:1,ArrowRight:1};let v=[],M=[];addEventListener("keydown",b=>{b.repeat||(b.code in f&&(b.preventDefault(),d(),v.includes(f[b.code])||v.push(f[b.code]),m.t=v[v.length-1],g()),b.code in x&&(b.preventDefault(),d(),M.includes(x[b.code])||M.push(x[b.code]),m.s=M[M.length-1],L(R(),0),g()))}),addEventListener("keyup",b=>{b.code in f&&(v=v.filter(A=>A!==f[b.code]),m.t=v.length?v[v.length-1]:0,g()),b.code in x&&(M=M.filter(A=>A!==x[b.code]),m.s=M.length?M[M.length-1]:0,g())});const R=()=>M.length?M[M.length-1]*l:0,L=(b,A)=>S(b,A);return e}const y=o=>document.getElementById(o);class cs{constructor({onBegin:e,onAudio:t,onAgain:s}={}){this._lastTxt={},y("igBody").textContent=re.intro,y("heroSub").textContent="Six rivals ahead. Every car you catch carries a part of who I am.",y("fTitle").textContent=re.finishTitle,y("fSub").textContent=re.finishSub,y("fNote").textContent=re.finishNote,y("fWho").textContent=re.name,y("fLinks").innerHTML=[["GITHUB","https://github.com/yashwanth07-debug"],["EMAIL","mailto:yashwanth07-debug@users.noreply.github.com"],["APEX REPO","https://github.com/yashwanth07-debug/apex"]].map(([n,d])=>`<a href="${d}" target="_blank" rel="noopener">${n} ↗</a>`).join(""),y("rail").innerHTML=de.map((n,d)=>`<div class="r-stop" data-id="${n.id}"><span class="r-lab">${n.tag}</span><span class="r-dot"></span></div>`).join("");let i=!1;const a=()=>{if(!i){i=!0,y("ignition").classList.add("hidden"),y("ignition").dataset.lock="1",y("hud").classList.remove("hidden"),y("hero").classList.add("hidden");try{e()}catch(n){console.error("[APEX] begin:",n)}}};this.startRace=a,y("begin").addEventListener("click",a),y("begin").addEventListener("pointerdown",a),y("audioBtn").addEventListener("click",()=>{const n=t();y("audioBtn").classList.toggle("off",!n),y("audioBtn").innerHTML=`<i></i>PIT RADIO&nbsp;${n?"ON":"OFF"}`}),y("zClose").addEventListener("click",()=>y("panel").classList.add("hidden")),y("again").addEventListener("click",()=>s()),this._toastTimer=null,this._panelTimer=null}liftVeil(){y("veil").classList.add("hidden")}preloader(e,t){y("pFill").style.width=`${Math.round(e*100)}%`,y("pPct").textContent=String(Math.round(e*100)).padStart(3,"0");const s=["CONNECTING THE PIT WALL…","PAINTING SIX RIVAL LIVERIES…","CHARGING THE BATTERY…","BOLTING ON FRESH RUBBER…","GREEN LIGHT IN 3…2…"];y("pLog").textContent=s[Math.min(s.length-1,Math.floor(e*s.length))],t&&setTimeout(()=>{y("preloader").classList.add("hidden"),y("ignition").dataset.lock||y("ignition").classList.remove("hidden")},300)}toast(e,t=1600){const s=y("toast");s.textContent=e,s.classList.add("show"),clearTimeout(this._toastTimer),this._toastTimer=setTimeout(()=>s.classList.remove("show"),t)}_txt(e,t){this._lastTxt[e]!==t&&(this._lastTxt[e]=t,y(e).textContent=t)}update({speed:e,gear:t,rpm:s,lap:i,finished:a,zone:n,zoneSub:d}){this._txt("kSpeed",String(Math.round(Math.abs(e)*3.6))),this._txt("kGear",e<-.5?"R":String(t));const l=Math.max(0,Math.min(1,s));y("rpmFill").style.width=`${l*100}%`,this._txt("kLap",a?"FINAL":`LAP ${i}/1`),this._txt("kZone",n),this._txt("kSub",d)}openPanel(e){y("zTitle").textContent=e.tag,y("zCarTag").textContent=e.carTag,y("zBody").textContent=e.body||e.sub||"";const t=y("zExtra");e.bars?t.innerHTML=e.bars.map(([s,i,a])=>`<div class="bar"><div class="b-t"><span>${s}</span><b>${i}</b></div><div class="k"><i style="width:${i}%"></i></div><div class="b-l">${a||""}</div></div>`).join(""):e.links?t.innerHTML=e.links.map(([s,i,a])=>`<div class="job"><b><a href="${a}" target="_blank" rel="noopener">${s} ↗</a></b><p>${i}</p></div>`).join(""):e.timeline?t.innerHTML=e.timeline.map(([s,i])=>`<div class="tl"><b>${s}</b><p>${i}</p></div>`).join(""):t.innerHTML="",y("zFacts").innerHTML=(e.facts||[]).map(([s,i])=>`<li><b>${s}</b><span>${i}</span></li>`).join(""),y("panel").classList.remove("hidden"),clearTimeout(this._panelTimer),this._panelTimer=setTimeout(()=>y("panel").classList.add("hidden"),9e3)}markRival(e){document.querySelectorAll("#rail .r-stop").forEach(t=>{t.classList.remove("next"),t.dataset.id===e&&t.classList.add("done")}),this._next()}_next(){const e=[...document.querySelectorAll("#rail .r-stop")];for(const t of e)if(!t.classList.contains("done")){t.classList.add("next");return}}initRail(){this._next()}showFinish(){y("finish").classList.remove("hidden")}hideFinish(){y("finish").classList.add("hidden")}}const ds=document.getElementById("track"),V=new bt({canvas:ds,antialias:!0,powerPreference:"high-performance"});V.toneMapping=qe;V.toneMappingExposure=.94;V.shadowMap.enabled=!0;V.shadowMap.type=Tt;const Te=Math.min(devicePixelRatio,1.75);V.setPixelRatio(Te);V.setSize(innerWidth,innerHeight);const B=new Qe,N=new Mt(62,innerWidth/innerHeight,.4,45e3);N.position.set(0,30,60);B.add(N);const hs=new St(V);B.environment=hs.fromScene(new Et,.04).texture;let K=!1,J=!1;const Z=new rs,z=new cs({onBegin(){K=!0,z.liftVeil(),he&&he.lightsOut();try{Z.start()}catch(o){console.warn("[APEX] silent:",o&&o.message)}},onAudio:()=>Z.toggle(),onAgain(){Je()}});let _,he,j,O,W=[],$;const Q=ls({onFirstEngage:()=>{K||z.startRace()}}),r={pos:new w,heading:0,speed:0,prevIdx:0,idx:0,off:0,gear:1,rpm:0,completions:0,lapLiveFrom:0},pe=[0,12,22,32,42,52,62,72,999],Me=80,Se=[];async function us(){const o=[["Laying asphalt",async()=>{try{const e=await $t();B.add(e),console.log("[APEX] Spa-Francorchamps world loaded")}catch(e){console.warn("[APEX] Spa world unavailable — using flat terrain",e&&e.message)}_=Ft(B)}],["Setting the scene",()=>{he=Bt(B,_)}],["Building the grid",async()=>{try{const e=await Wt();O=Qt(e),console.log("[APEX] Ferrari F1 2019 loaded")}catch(e){console.warn("[APEX] Ferrari failed to load — falling back to kit car",e&&e.message),O=ke({paint:14750750,number:23})}B.add(O);for(let e=0;e<de.length;e++){const t=ke({paint:de[e].livery,number:20+e*7});B.add(t),W.push({mesh:t,rid:de[e].id,data:de[e],idx:0,speed:0,baseSpeed:13.5+e*1.6,phase:e,done:!1,lane:(e%2===0?-1:1)*2.6})}Je()}],["Charging post FX",()=>{j=ns(V,B,N),j.setSize(innerWidth,innerHeight,Te)}],["Warming tires",()=>{V.compile(B,N)}]];for(let e=0;e<o.length;e++){try{await o[e][1]()}catch(t){throw console.error(`[APEX] build "${o[e][0]}"`,t),t}z.preloader((e+1)/o.length,e===o.length-1),await new Promise(t=>requestAnimationFrame(t)),await new Promise(t=>setTimeout(t,100))}window.__APEX.ready=!0,tt()}function Je(){J=!1,z.hideFinish();const o=26;r.idx=30,r.prevIdx=30,Pe(r,r.idx,2.2,O),r.speed=0,r.heading=r.heading||0,W.forEach((e,t)=>{e.done=!1,e.speed=0,e.idx=r.idx+o*(t+1)*4+60+t*22,e.targetSpeed=e.baseSpeed,Pe(e,e.idx,e.lane,e.mesh)}),W.sort((e,t)=>e.idx-t.idx),r.completions=0,z.initRail(),document.querySelectorAll("#rail .r-stop").forEach(e=>e.classList.remove("done","next")),z.initRail()}const se={};function Pe(o,e,t,s){_.at(e,se),s=s||O,s.position.copy(se.point).addScaledVector(se.left,t),s.position.y=se.point.y+(s.userData.rideHeight??.27);const i=Math.atan2(se.tangent.x,se.tangent.z);s.rotation.set(0,i,0),o===r?(r.pos.copy(s.position),r.heading=i,r.prevIdx=e,r.off=t):(o.pos=o.pos||new w,o.pos.copy(s.position))}const I={},Re={};function fs(o){const e=Q.throttle,t=Q.steer,s=r.speed>=-.5?1:-1;let i;if(e>0){const g=1.15-Math.max(0,Math.min(1,Math.abs(r.speed)/Me))*.55;i=17.5*e*g*s}else i=e*(r.speed>.5?34:12);i-=Math.sign(r.speed)*(.4+r.speed*r.speed*38e-5),r.speed+=i*o;let a=!1;if(_){r.idx=_.nearest(r.prevIdx,r.pos),_.at(r.idx,I),I.left.clone().multiplyScalar(-1);const g=r.pos.clone().sub(I.point).dot(I.left),S=Math.abs(g);if(a=S>U+.4,S>U+4.2){const p=Math.sign(g)*(U+4.2);r.pos.copy(I.point).addScaledVector(I.left,p),r.speed*=.96;let f=Math.atan2(I.tangent.x,I.tangent.z)-r.heading;f-=Math.round(f/(Math.PI*2))*Math.PI*2,r.heading+=f*.35,a=!1}a&&(r.speed>26&&(r.speed=be.clamp(r.speed-22*o,26,999)),r.speed-=r.speed*.8*o),r.prevIdx=r.idx}const n=Math.abs(r.speed);if(n>5&&Math.abs(t)<.22){const g=Math.round(6+n*1.6);_.at(r.idx+g,Re);let p=Math.atan2(Re.point.x-r.pos.x,Re.point.z-r.pos.z)-r.heading;p-=Math.round(p/(Math.PI*2))*Math.PI*2,r.heading+=p*Math.min(1,o*3.2);const T=r.pos.clone().sub(I.point).dot(I.left);r.pos.addScaledVector(I.left,-T*Math.min(1,o*1.4))}const d=n,l=.9/(1+d*.055)*Math.min(1,d/6);r.heading-=t*l*2.1*o*Math.sign(r.speed||1);const h=Math.sin(r.heading),c=Math.cos(r.heading);if(r.pos.x+=h*r.speed*o,r.pos.z+=c*r.speed*o,_){const g=_.heightAt(r.idx);r.pos.y+=(g+(O.userData.rideHeight??.27)-r.pos.y)*Math.min(1,o*10)}for(let g=1;g<pe.length;g++)if(Math.abs(r.speed)<pe[g]){r.gear=Math.max(1,g);break}const u=pe[r.gear-1],m=pe[r.gear];return r.rpm=be.clamp((Math.abs(r.speed)-u)/Math.max(1,m-u),0,1),a}function ps(o,e){const t=_.pts.length;for(const s of W){s.idx=s.idx+s.targetSpeed*o/_.LEN*t,_.at(s.idx,I),s.mesh.position.copy(I.point).addScaledVector(I.left,s.lane+Math.sin(e*.7+s.phase)*.7),s.mesh.position.y=I.point.y+.27;const i=Math.atan2(I.tangent.x,I.tangent.z);s.mesh.rotation.set(0,i,0),s.userData=s.userData||{};const a=s.targetSpeed*o/.34;s.mesh.userData.spin(a,0),I.point.distanceTo,s.worldT=s.idx/t}}let He=0;function ms(){const o=_.pts.length,e=r.idx/o;for(const t of W){if(t.done)continue;let i=(t.idx%o+o)%o/o-e;if(i-=Math.round(i),Math.abs(i)<.0045&&!J&&r.speed>14){const a=t.mesh.position.x-r.pos.x,n=t.mesh.position.z-r.pos.z,d=Math.sin(r.heading),l=Math.cos(r.heading),h=a*d+n*l>-4;if(a*a+n*n<60*60&&h){t.done=!0,z.markRival(t.rid),z.openPanel(t.data),z.toast(`OVERTAKE · ${t.data.tag} (${W.filter(c=>c.done).length}/6)`,1800),Z.shift();try{Z.cheer()}catch{}}}}}function gs(){const o=_.pts.length,e=r.idx/o;for(const t of[r]){if(!t._lastT){t._lastT=e;return}t._lastT>.88&&e<.12&&!J&&(r.completions++,W.every(i=>i.done)?(J=!0,Z.horn(),vs(),setTimeout(()=>z.showFinish(),1400),document.querySelectorAll("#rail .r-stop").forEach(i=>i.classList.add("done"))):r.completions===1&&z.toast("LAP 2 · HUNT THE REMAINING CARS",2200)),t._lastT=e}}function vs(){const e=new ue,t=new Float32Array(1400*3),s=new Float32Array(1400*3),i=new ae,a=[16719405,16773874,16106776,7330047,3134074,16777215],n=r.pos.x,d=r.pos.y,l=r.pos.z;for(let h=0;h<1400;h++)t[h*3]=n+(Math.random()-.5)*240,t[h*3+1]=d+8+Math.random()*80,t[h*3+2]=l+(Math.random()-.5)*240,i.set(a[Math.floor(Math.random()*a.length)]),s[h*3]=i.r,s[h*3+1]=i.g,s[h*3+2]=i.b;e.setAttribute("position",new Be(t,3)),e.setAttribute("color",new Be(s,3)),$&&(B.remove($),$.geometry.dispose(),$.material.dispose()),$=new yt(e,new At({size:.5,vertexColors:!0,transparent:!0,opacity:.95,depthWrite:!1})),B.add($),Se.length=0;for(let h=0;h<1400;h++)Se.push({v:2.5+Math.random()*5,ph:Math.random()*6.28})}function xs(o,e){if(!$)return;const t=$.geometry.attributes.position;for(let s=0;s<Se.length;s++){const i=Se[s];t.array[s*3+1]-=i.v*o,t.array[s*3]+=Math.sin(e*3+i.ph)*o*3.4,t.array[s*3+2]+=Math.cos(e*2.4+i.ph)*o*2.6,t.array[s*3+1]<r.pos.y&&(t.array[s*3+1]=r.pos.y+90*Math.random())}t.needsUpdate=!0}const We=new w,me=new w(0,30,60);let ge=0;function ws(o,e){const t=11.5+Math.abs(r.speed)*.06,s=4.4+Math.abs(r.speed)*.02,i=r.heading;ge+=bs(i,ge,Math.min(1,o*4.2));const a=Math.sin(ge),n=Math.cos(ge),d=new w(r.pos.x-a*t,r.pos.y+s,r.pos.z-n*t);me.lerp(d,Math.min(1,o*5.5));const l=(e.shake?.16:.03)*(.5+Math.abs(r.speed)/Me);me.x+=Math.sin(He*31)*l,me.y+=Math.cos(He*38)*l*.6,N.position.copy(me),We.copy(r.pos).addScaledVector(new w(Math.sin(i),0,Math.cos(i)),9).add(new w(0,1.6,0)),N.lookAt(We),N.fov+=(60+Math.abs(r.speed)/Me*14-N.fov)*Math.min(1,o*3),N.updateProjectionMatrix()}function bs(o,e,t){let s=o-e;return s-=Math.round(s/(Math.PI*2))*Math.PI*2,s*t}function Ts(o){if(o<.05)return["FORMATION","the field ahead — hunt them down"];const e=W.find(t=>!t.done);return e?[`HUNTING ${e.data.tag}`,`${e.data.carTag} · section ${W.filter(t=>t.done).length+1} of 6`]:["FINAL RUN","chequer is out — bring it home"]}function Ms(o,e){const t=r.speed*o/.34;O.userData.spin(t,-Q.steer*.8*Math.min(1,Math.abs(r.speed)/20)),O.position.copy(r.pos),O.rotation.y=r.heading,O.rotation.x=be.clamp(-Q.throttle*Math.abs(r.speed)*9e-4-(r.speed>0?.006:0),-.05,.01),O.rotation.z=be.clamp(Q.steer*Math.abs(r.speed)*.0012,-.06,.06),O.userData.shimmer.material.opacity=Math.min(.7,Math.abs(Q.throttle)*Math.abs(r.speed)*.015+.08)}const Ss=new Ye;let Ze=1,Ie=0;function Le(o){Ie+=o;const e=Ie;let t=!1;if(_){if(K&&!J&&(t=fs(o)),K&&(ps(o,e),ms(),gs()),Ms(o),K)ws(o,{shake:t});else{const s=e*.12,i=O.position;N.position.set(i.x+Math.sin(s)*30,i.y+8.5,i.z+Math.cos(s)*30),N.lookAt(i.x,i.y+1.4,i.z),N.fov+=(58-N.fov)*Math.min(1,o*2),N.updateProjectionMatrix()}xs(o,e),he.followShadow(O.position,null),he.update(e,N.position),j.setSpeed(Math.min(1,Math.abs(r.speed)/Me))}}function Fe(){const o=_?r.idx/_.pts.length:0,[e,t]=Ts(o);if(z.update({speed:r.speed,gear:r.gear,rpm:r.rpm,lap:Math.min(1,r.completions+1),finished:J,zone:e,zoneSub:t}),K&&Z.ctx){const s=W.reduce((i,a)=>Math.min(i,a.mesh.position.distanceTo(r.pos)),999);Z.update(r.speed,r.rpm,r.gear,s<90?1:.3,Ie)}}let et=!1;function tt(){if(requestAnimationFrame(tt),et)return;const o=Math.min(Ss.getDelta(),.066)*Ze;Le(o),Fe(),j?j.render():V.render(B,N)}function ys(){N.aspect=innerWidth/innerHeight,N.updateProjectionMatrix(),V.setSize(innerWidth,innerHeight),V.setPixelRatio(Te),j&&j.setSize(innerWidth,innerHeight,Te)}addEventListener("resize",ys);window.__APEX={ready:!1,slowmo(o){Ze=o},start(){z.startRace()},setThrottle(o){Q.throttle=o},setSteer(o){Q.steer=o},teleportFrac(o){const e=_.pts.length;r.idx=Math.floor(o*e),Pe(r,r.idx,2.2,O),r.speed=44},state(){return{speed:r.speed,pT:r.idx/_.pts.length,finished:J,done:W.filter(o=>o.done).length}},debug(){_.at(r.idx,I);const o=r.pos.clone().sub(I.point).dot(I.left);return{th:+Q.throttle.toFixed(2),st:+Q.steer.toFixed(2),started:K,idx:r.idx,dLat:+o.toFixed(2),yaw:+Math.atan2(I.tangent.x,I.tangent.z).toFixed(2),hd:+r.heading.toFixed(2),pos:r.pos.toArray().map(e=>+e.toFixed(1))}},veil(){z.liftVeil()},capture(o){et=!!o},renderFrame(){Le(0),Fe(),j?j.render():V.render(B,N)},tick(o=1){const e=.016666666666666666,t=Math.max(1,Math.round(o/e));for(let s=0;s<t;s++)Le(e);Fe()}};us();
