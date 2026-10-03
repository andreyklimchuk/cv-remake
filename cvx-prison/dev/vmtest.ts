import { EvtVM, atrFrom } from '../web/src/evt';
import fs from 'fs';
const room = process.argv[2] ?? 'rm_0000', N = +(process.argv[3] ?? 300);
const A = '/data/cvx/web/public/assets/';
const rd = JSON.parse(fs.readFileSync(A + 'rooms/' + room + '.json', 'utf8'));
const ev = JSON.parse(fs.readFileSync(A + 'evt/' + room + '.json', 'utf8'));
let tick = 0;
const log = (s: string) => console.log(`[${tick}] ${s}`);
const vm: EvtVM = new EvtVM({
  hasItem: (id) => id === 55, loseItem: (id) => log('lose ' + id), weapon: () => (tick > 700 ? 1 : 0), setWeapon: (w) => log('setWeapon ' + w),
  message: (i) => { log('MSG ' + i + ' ' + JSON.stringify(rd.messages[i]?.slice(0, 60))); setTimeout0(() => vm.messageClosed(-1, false)); },
  fade: (a, s) => log('fade ' + a.toString(16) + ' ' + s), cine: (m) => log('cine ' + m), camSet: (k, a, b) => log(`cam ${k} ${a} ${b}`),
  door: (...a) => log('door ' + a.join(',')), movie: (n) => log('movie ' + n), moviePlaying: () => false, playerHp: () => 200, log,
});
const q: (() => void)[] = []; function setTimeout0(f: () => void) { q.push(f); }
vm.etc = rd.triggers.map(atrFrom); vm.wal = rd.collision.map(atrFrom); vm.flr = (rd.areas ?? []).map(atrFrom);
vm.stg = 0; vm.room = +room.slice(5, 7);
vm.init(ev.scripts);
const dump = () => { for (const [k, w] of vm.works) log(`work ${k} gone=${w.gone} hid=${w.hidden} pos=${w.posSet ? [w.px, w.py, w.pz].map((v) => v.toFixed(2)) : '-'} ang=${w.angSet ? [w.ax, w.ay, w.az].map((v) => (v * 57.3).toFixed(0)) : '-'} mtn=${w.mtn}`); };
log('after init: sp=' + vm.sp.toString(16) + ' cb=' + vm.cb.toString(16) + ' tasks=' + vm.tasks.map((t) => t.status ? t.script : '.').join(''));
dump();
log('etc flg ' + vm.etc.map((a) => a.flg & 1).join('') + ' wal ' + vm.wal.map((a) => a.flg & 1).join(''));
for (tick = 1; tick <= N; tick++) { while (q.length) q.shift()!(); if (tick > 720 && process.env.FLR) { vm.cb |= 0x200; vm.flr_idx = +process.env.FLR; } vm.tick(); vm.cb &= ~(0x200 | 0x8000000); }
log('end: sp=' + vm.sp.toString(16) + ' cb=' + vm.cb.toString(16) + ' st=' + vm.st.toString(16) + ' tasks=' + vm.tasks.map((t) => t.status ? t.script : '.').join(''));
dump();
log('ev ' + vm.f.ev.map((v) => v.toString(16)).join(' '));
for (const [i, t] of vm.tasks.entries()) if (t.status) log(`task ${i} script ${t.script} (evt ${t.script - 2}) p=${t.p.toString(16)} loop=${t.loop} cnt=${t.cnt.slice(0, t.loop + 1)}`);
