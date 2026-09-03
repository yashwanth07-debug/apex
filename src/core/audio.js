// ── APEX procedural audio: V-engine scream + wind + crowd + horns ─────────
export class RaceAudio {
  constructor() {
    this.ctx = null;
    this.on = true;
    this.gear = 0;
  }

  start() {
    if (this.ctx) return;
    const ctx = (this.ctx = new (window.AudioContext || window.webkitAudioContext)());
    const M = (this.master = ctx.createGain());
    M.gain.value = 0;
    const comp = ctx.createDynamicsCompressor();
    M.connect(comp).connect(ctx.destination);
    M.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 1.6);

    // engine: two saws + sub square through a tight lowpass — pitch rides rpm
    this.engFilter = ctx.createBiquadFilter();
    this.engFilter.type = 'lowpass';
    this.engFilter.frequency.value = 900;
    this.engFilter.Q.value = 2.4;
    this.engGain = ctx.createGain();
    this.engGain.gain.value = 0.0;
    this.engFilter.connect(this.engGain).connect(M);
    this.osc = [];
    const specs = [
      ['sawtooth', 1.0, 0.5], ['sawtooth', 1.494, 0.36], ['square', 0.5, 0.3],
    ];
    for (const [type, mult, vol] of specs) {
      const o = ctx.createOscillator();
      o.type = type;
      o.frequency.value = 60 * mult;
      const g = ctx.createGain(); g.gain.value = vol;
      o.connect(g).connect(this.engFilter);
      o.start();
      this.osc.push({ o, mult });
    }

    // wind: filtered noise, gain ~ speed²
    const wlen = ctx.sampleRate * 2;
    const wbuf = ctx.createBuffer(1, wlen, ctx.sampleRate);
    const wd = wbuf.getChannelData(0);
    for (let i = 0; i < wlen; i++) wd[i] = Math.random() * 2 - 1;
    const wsrc = ctx.createBufferSource();
    wsrc.buffer = wbuf; wsrc.loop = true;
    this.windFilter = ctx.createBiquadFilter();
    this.windFilter.type = 'highpass'; this.windFilter.frequency.value = 480;
    this.windGain = ctx.createGain(); this.windGain.gain.value = 0;
    wsrc.connect(this.windFilter).connect(this.windGain).connect(M);
    wsrc.start();

    // crowd bed: warmer noise loop with slow swells
    const cbuf = ctx.createBuffer(1, wlen, ctx.sampleRate);
    const cd = cbuf.getChannelData(0);
    for (let i = 0; i < wlen; i++) cd[i] = Math.random() * 2 - 1;
    const csrc = ctx.createBufferSource();
    csrc.buffer = cbuf; csrc.loop = true;
    const cf = ctx.createBiquadFilter();
    cf.type = 'bandpass'; cf.frequency.value = 700; cf.Q.value = 0.6;
    this.crowdGain = ctx.createGain(); this.crowdGain.gain.value = 0.0;
    csrc.connect(cf).connect(this.crowdGain).connect(M);
    csrc.start();
    this._crowdLfo = 0;
  }

  // v: signed m/s, rpm01: 0..1 engine load, gear: int, nearCrowd: 0..1
  update(v, rpm01, gear, nearCrowd, t) {
    if (!this.ctx || !this.on) return;
    const ct = this.ctx.currentTime;
    const rev = 60 + rpm01 * 155 + gear * 9;              // Hz
    for (const { o, mult } of this.osc) o.frequency.setTargetAtTime(rev * mult, ct, 0.03);
    const engVol = Math.min(0.5, 0.16 + rpm01 * 0.34);
    this.engGain.gain.setTargetAtTime(engVol, ct, 0.05);
    this.engFilter.frequency.setTargetAtTime(450 + rpm01 * 2400, ct, 0.06);
    const speed = Math.abs(v);
    this.windGain.gain.setTargetAtTime(Math.min(0.4, speed * speed * 0.000055), ct, 0.12);
    // crowd swells slower than the engine
    this._crowdLfo = ct;
    const swell = nearCrowd * (0.55 + 0.25 * Math.sin(t * 0.8));
    this.crowdGain.gain.setTargetAtTime(Math.min(0.5, swell * 0.42), ct, 0.3);
  }

  shift() {
    if (!this.ctx || !this.on) return;
    const ct = this.ctx.currentTime;
    // ignition-cut blip
    this.engGain.gain.cancelScheduledValues(ct);
    this.engGain.gain.setValueAtTime(this.engGain.gain.value, ct);
    this.engGain.gain.linearRampToValueAtTime(this.engGain.gain.value * 0.35, ct + 0.05);
    this.engGain.gain.linearRampToValueAtTime(Math.min(0.5, 0.2), ct + 0.16);
  }

  horn() {
    if (!this.ctx || !this.on) return;
    const ctx = this.ctx, ct = ctx.currentTime;
    for (const [f, d] of [[523, 0], [659, 0.12], [784, 0.24], [1046, 0.36]]) {
      const o = ctx.createOscillator();
      o.type = 'square'; o.frequency.value = f;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, ct + d);
      g.gain.linearRampToValueAtTime(0.12, ct + d + 0.03);
      g.gain.linearRampToValueAtTime(0.0001, ct + d + 0.42);
      o.connect(g).connect(this.master);
      o.start(ct + d); o.stop(ct + d + 0.5);
    }
  }

  cheer() {
    if (!this.ctx || !this.on) return;
    const ct = this.ctx.currentTime;
    this.crowdGain.gain.cancelScheduledValues(ct);
    this.crowdGain.gain.setValueAtTime(0.5, ct);
    this.crowdGain.gain.linearRampToValueAtTime(0.7, ct + 0.4);
    this.crowdGain.gain.exponentialRampToValueAtTime(0.001, ct + 5.0);
  }

  toggle() { this.on = !this.on; return this.on; }
}
