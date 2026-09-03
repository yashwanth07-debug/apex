// ── throttle/steering stick + hold buttons + keyboard ─────────────────────
// state: { throttle: -1 brake .. +1 drive, steer: -1 left .. +1 right }
export function buildInput({ onFirstEngage } = {}) {
  const state = { throttle: 0, steer: 0 };
  const pad = document.getElementById('joyPad');
  const knob = document.getElementById('joyKnob');
  const btnF = document.getElementById('joyFwd');
  const btnB = document.getElementById('joyBrake');
  let engaged = false;
  const engage = () => { if (!engaged) { engaged = true; try { onFirstEngage && onFirstEngage(); } catch {} } };

  const R = 42;
  let pid = null;
  const padV = { t: 0, s: 0 };
  const btnV = { t: 0 };
  const keyV = { t: 0, s: 0 };

  const commit = () => {
    state.throttle = btnV.t || padV.t || keyV.t;
    state.steer = padV.s || keyV.s;
    knob.classList.toggle('live', Math.abs(state.throttle) > 0.05 || Math.abs(state.steer) > 0.05);
  };

  const knobTo = (dx, dy) => {
    knob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
  };

  // steering response: deadzone + smoothstep — tiny drags won't twitch the car
  const steerCurve = (v) => {
    const D = 0.14, a = Math.abs(v);
    if (a < D) return 0;
    const t = Math.min(1, (a - D) / (1 - D));
    return Math.sign(v) * t * t * (3 - 2 * t);
  };

  if (pad && knob) {
    pad.addEventListener('pointerdown', (e) => {
      pid = e.pointerId; pad.setPointerCapture(pid); engage();
      const r = pad.getBoundingClientRect();
      const dx = Math.max(-R, Math.min(R, e.clientX - (r.left + r.width / 2)));
      const dy = Math.max(-R, Math.min(R, e.clientY - (r.top + r.height / 2)));
      padV.s = steerCurve(dx / R);
      padV.t = Math.abs(dy / R) < 0.1 ? 0 : -dy / R;
      knobTo(dx, dy); commit();
    });
    pad.addEventListener('pointermove', (e) => {
      if (pid === null || e.pointerId !== pid) return;
      const r = pad.getBoundingClientRect();
      const dx = Math.max(-R, Math.min(R, e.clientX - (r.left + r.width / 2)));
      const dy = Math.max(-R, Math.min(R, e.clientY - (r.top + r.height / 2)));
      padV.s = steerCurve(dx / R);
      padV.t = Math.abs(dy / R) < 0.1 ? 0 : -dy / R;
      knobTo(dx, dy); commit();
    });
    const release = (e) => {
      if (pid === null || (e && e.pointerId !== pid)) return;
      pid = null; padV.t = 0; padV.s = 0; knobTo(0, 0); commit();
    };
    pad.addEventListener('pointerup', release);
    pad.addEventListener('pointercancel', release);
  }

  const hold = (btn, v) => {
    const down = (e) => { e.preventDefault(); engage(); btn.classList.add('live'); btnV.t = v; commit(); };
    const up = () => { btn.classList.remove('live'); btnV.t = 0; commit(); };
    btn.addEventListener('pointerdown', down);
    btn.addEventListener('pointerup', up);
    btn.addEventListener('pointercancel', up);
    btn.addEventListener('pointerleave', up);
  };
  if (btnF) hold(btnF, 1);
  if (btnB) hold(btnB, -1);

  const tMap = { KeyW: 1, ArrowUp: 1, KeyS: -1, ArrowDown: -1 };
  const sMap = { KeyA: -1, ArrowLeft: -1, KeyD: 1, ArrowRight: 1 };
  let tStack = [], sStack = [];
  addEventListener('keydown', (e) => {
    if (e.repeat) return;
    if (e.code in tMap) { e.preventDefault(); engage(); if (!tStack.includes(tMap[e.code])) tStack.push(tMap[e.code]); keyV.t = tStack[tStack.length - 1]; commit(); }
    if (e.code in sMap) { e.preventDefault(); engage(); if (!sStack.includes(sMap[e.code])) sStack.push(sMap[e.code]); keyV.s = sStack[sStack.length - 1]; findPad(dx(), 0); commit(); }
  });
  addEventListener('keyup', (e) => {
    if (e.code in tMap) { tStack = tStack.filter(k => k !== tMap[e.code]); keyV.t = tStack.length ? tStack[tStack.length - 1] : 0; commit(); }
    if (e.code in sMap) { sStack = sStack.filter(k => k !== sMap[e.code]); keyV.s = sStack.length ? sStack[sStack.length - 1] : 0; commit(); }
  });
  const dx = () => sStack.length ? sStack[sStack.length - 1] * R : 0;
  const findPad = (x, y) => knobTo(x, y);

  return state;
}
