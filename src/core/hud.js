import { RIVALS, PILOT } from '../data.js';

const $ = (id) => document.getElementById(id);

export class HUD {
  constructor({ onBegin, onAudio, onAgain } = {}) {
    this._lastTxt = {};
    $('igBody').textContent = PILOT.intro;
    $('heroSub').textContent = 'Six rivals ahead. Every car you catch carries a part of who I am.';
    $('fTitle').textContent = PILOT.finishTitle;
    $('fSub').textContent = PILOT.finishSub;
    $('fNote').textContent = PILOT.finishNote;
    $('fWho').textContent = PILOT.name;
    $('fLinks').innerHTML = [
      ['GITHUB', 'https://github.com/yashwanth07-debug'],
      ['EMAIL', 'mailto:yashwanth07-debug@users.noreply.github.com'],
      ['APEX REPO', 'https://github.com/yashwanth07-debug/apex'],
    ].map(([k, u]) => `<a href="${u}" target="_blank" rel="noopener">${k} ↗</a>`).join('');

    // progress rail
    $('rail').innerHTML = RIVALS.map((r, i) =>
      `<div class="r-stop" data-id="${r.id}"><span class="r-lab">${r.tag}</span><span class="r-dot"></span></div>`).join('');

    let begun = false;
    const dive = () => {
      if (begun) return; begun = true;
      $('ignition').classList.add('hidden');
      $('ignition').dataset.lock = '1';
      $('hud').classList.remove('hidden');
      $('hero').classList.add('hidden');
      try { onBegin(); } catch (e) { console.error('[APEX] begin:', e); }
    };
    this.startRace = dive;
    $('begin').addEventListener('click', dive);
    $('begin').addEventListener('pointerdown', dive);
    $('audioBtn').addEventListener('click', () => {
      const on = onAudio();
      $('audioBtn').classList.toggle('off', !on);
      $('audioBtn').innerHTML = `<i></i>PIT RADIO&nbsp;${on ? 'ON' : 'OFF'}`;
    });
    $('zClose').addEventListener('click', () => $('panel').classList.add('hidden'));
    $('again').addEventListener('click', () => onAgain());
    this._toastTimer = null;
    this._panelTimer = null;
  }

  liftVeil() { $('veil').classList.add('hidden'); }

  loading(msg) {
    const p = $('loadPill'); if (!p) return;
    p.classList.remove('hidden');
    $('loadPillTxt').textContent = msg || 'LOADING…';
  }

  loadingDone() {
    const p = $('loadPill'); if (!p) return;
    p.classList.add('hidden');
  }

  preloader(p, done) {
    $('pFill').style.width = `${Math.round(p * 100)}%`;
    $('pPct').textContent = String(Math.round(p * 100)).padStart(3, '0');
    const logs = ['CONNECTING THE PIT WALL…', 'PAINTING SIX RIVAL LIVERIES…', 'CHARGING THE BATTERY…', 'BOLTING ON FRESH RUBBER…', 'GREEN LIGHT IN 3…2…'];
    $('pLog').textContent = logs[Math.min(logs.length - 1, Math.floor(p * logs.length))];
    if (done) setTimeout(() => {
      $('preloader').classList.add('hidden');
      if (!$('ignition').dataset.lock) $('ignition').classList.remove('hidden');
    }, 300);
  }

  toast(msg, ms = 1600) {
    const t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => t.classList.remove('show'), ms);
  }

  _txt(id, v) {
    if (this._lastTxt[id] === v) return;
    this._lastTxt[id] = v;
    $(id).textContent = v;
  }

  update({ speed, gear, rpm, lap, finished, zone, zoneSub }) {
    this._txt('kSpeed', String(Math.round(Math.abs(speed) * 3.6)));
    this._txt('kGear', speed < -0.5 ? 'R' : String(gear));
    const fill = Math.max(0, Math.min(1, rpm));
    $('rpmFill').style.width = `${fill * 100}%`;
    this._txt('kLap', finished ? 'FINAL' : `LAP ${lap}/1`);
    this._txt('kZone', zone);
    this._txt('kSub', zoneSub);
  }

  openPanel(rival) {
    $('zTitle').textContent = rival.tag;
    $('zCarTag').textContent = rival.carTag;
    $('zBody').textContent = rival.body || rival.sub || '';
    const ex = $('zExtra');
    if (rival.bars) {
      ex.innerHTML = rival.bars.map(([k, v, note]) =>
        `<div class="bar"><div class="b-t"><span>${k}</span><b>${v}</b></div><div class="k"><i style="width:${v}%"></i></div><div class="b-l">${note || ''}</div></div>`).join('');
    } else if (rival.links) {
      ex.innerHTML = rival.links.map(([k, desc, url]) =>
        `<div class="job"><b><a href="${url}" target="_blank" rel="noopener">${k} ↗</a></b><p>${desc}</p></div>`).join('');
    } else if (rival.timeline) {
      ex.innerHTML = rival.timeline.map(([k, v]) =>
        `<div class="tl"><b>${k}</b><p>${v}</p></div>`).join('');
    } else ex.innerHTML = '';
    $('zFacts').innerHTML = (rival.facts || []).map(([k, v]) => `<li><b>${k}</b><span>${v}</span></li>`).join('');
    $('panel').classList.remove('hidden');
    clearTimeout(this._panelTimer);
    this._panelTimer = setTimeout(() => $('panel').classList.add('hidden'), 9000);
  }

  markRival(id) {
    document.querySelectorAll(`#rail .r-stop`).forEach((el) => {
      el.classList.remove('next');
      if (el.dataset.id === id) el.classList.add('done');
    });
    this._next();
  }
  _next() {
    // first not-done gets "next"
    const stops = [...document.querySelectorAll('#rail .r-stop')];
    for (const el of stops) if (!el.classList.contains('done')) { el.classList.add('next'); return; }
  }
  initRail() { this._next(); }

  showFinish() {
    $('finish').classList.remove('hidden');
  }
  hideFinish() {
    $('finish').classList.add('hidden');
  }
}
