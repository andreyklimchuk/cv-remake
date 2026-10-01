// Door physics + flashlight regression.
import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/usr/local/bin/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.addInitScript(() => localStorage.setItem('cv.settings', JSON.stringify({ quality: 'low', sensitivity: 1, aimAssist: 0.5, volume: 0, invertY: false })));
await page.goto('file:///data/cv-remake/dist/play.html?devstart');
await page.waitForTimeout(1500);
await page.click('text=НОВАЯ ИГРА');
await page.waitForFunction(() => window.__game?.mode === 'playing', null, { timeout: 120000 });
const r = await page.evaluate(() => {
  const g = window.__game, w = g.world, out = [];
  const doors = w.interactables.filter((i) => Array.isArray(i.leaves) && i.leaves.length && i.collider);
  const Door = doors[0].constructor, saveAgents = Door.agents, saveDelay = Door.closeDelay;
  Door.closeDelay = 1e9;   // push test: no auto-close
  const V = w.player.pos.constructor;
  const hinge = (l) => { const p = new V(); l.pivot.getWorldPosition(p); return p; };
  const tip = (l) => { const h = hinge(l); const a = l.a, c = Math.cos(a), s = Math.sin(a); const dx = l.dir0.x * c + l.dir0.y * s, dz = -l.dir0.x * s + l.dir0.y * c; return [h.x + dx * l.width, h.z + dz * l.width]; };
  for (const d of doors) {
    if (d.locked || d.open) { out.push({ id: d.id, skip: d.locked ? 'locked' : 'open' }); continue; }
    for (const side of [1, -1]) {
      // reset
      d.open = false; d.enabled = true; d.collider.enabled = true; d.pushT = 0; d.idleT = 0;
      for (const l of d.leaves) { l.a = 0; l.w = 0; l.pivot.rotation.y = l.base; }
      const l0 = d.leaves[0], h = hinge(l0);
      const dx = l0.dir0.x, dz = l0.dir0.y, nx = dz, nz = -dx;
      const s0 = d.leaves.length > 1 ? l0.width * 0.7 : l0.width * 0.5;
      const ag = { pos: new V(h.x + dx * s0 + nx * side * 0.9, l0.y0, h.z + dz * s0 + nz * side * 0.9), vel: new V(-nx * side * 2, 0, -nz * side * 2), radius: 0.35, player: true };
      Door.agents = () => [ag];
      const tips0 = d.leaves.map(tip);
      for (let i = 0; i < 150; i++) { ag.pos.x += ag.vel.x / 60; ag.pos.z += ag.vel.z / 60; d.update(1 / 60, 0); }
      const tips1 = d.leaves.map(tip);
      // each tip must move away from the pusher (to the -side normal)
      const away = tips1.map((t, i) => ((t[0] - tips0[i][0]) * nx + (t[1] - tips0[i][1]) * nz) * -side);
      const crossed = ((ag.pos.x - h.x) * nx + (ag.pos.z - h.z) * nz) * side < 0;
      out.push({ id: d.id, side, open: d.open, away: away.map((a) => +a.toFixed(2)), angles: d.leaves.map((l) => +l.a.toFixed(2)), crossed, ok: d.open && away.every((a) => a > 0.3) && crossed });
    }
    // leave the door closed again
    d.open = false; d.enabled = true; d.collider.enabled = true; w.flags.delete('open:' + d.id);
    for (const l of d.leaves) { l.a = 0; l.w = 0; l.pivot.rotation.y = l.base; }
  }
  // auto-close: push a single door open, walk away, the closer swings it shut and latches it again
  Door.closeDelay = saveDelay;
  for (const d of doors.filter((x) => !x.locked && x.leaves.length === 1).slice(0, 4)) {
    d.open = false; d.enabled = true; d.collider.enabled = true; d.pushT = 0; d.idleT = 0;
    const l0 = d.leaves[0]; l0.a = 0; l0.w = 0; l0.pivot.rotation.y = l0.base;
    const h = hinge(l0), dx = l0.dir0.x, dz = l0.dir0.y, nx = dz, nz = -dx;
    const ag = { pos: new V(h.x + dx * l0.width * 0.5 + nx * 0.9, l0.y0, h.z + dz * l0.width * 0.5 + nz * 0.9), vel: new V(-nx * 2, 0, -nz * 2), radius: 0.35, player: true };
    Door.agents = () => [ag];
    for (let i = 0; i < 150; i++) { ag.pos.x += ag.vel.x / 60; ag.pos.z += ag.vel.z / 60; d.update(1 / 60, 0); }
    const openA = +l0.a.toFixed(2), wasOpen = d.open;
    ag.pos.set(ag.pos.x - nx * 6, ag.pos.y, ag.pos.z - nz * 6);   // walk away
    let tClose = -1;
    for (let i = 0; i < 60 * 12; i++) { d.update(1 / 60, 0); if (!d.open && tClose < 0) tClose = i / 60; }
    out.push({ id: d.id, autoclose: true, wasOpen, openA, closedAfter: +tClose.toFixed(1), a: +l0.a.toFixed(3), collider: d.collider.enabled, navPass: d.collider.navPass, ok: wasOpen && !d.open && d.collider.enabled && Math.abs(l0.a) < 0.05 && tClose > 3 });
  }
  Door.agents = saveAgents;
  return out;
});
// flashlight: Steve on, follows the camera
const f = await page.evaluate(async () => {
  const g = window.__game, w = g.world;
  w.switchCharacter();
  const t0 = performance.now();
  while (performance.now() - t0 < 20000 && !(w.character === 'steve' && w.flashlight.intensity > 0)) await new Promise((res) => setTimeout(res, 200));
  await new Promise((res) => setTimeout(res, 1500));
  const fl = w.flashlight, cam = g.camera;
  const fwd = cam.getWorldDirection(new fl.position.constructor());
  const fp = fl.getWorldPosition(new fl.position.constructor()), tp = fl.target.getWorldPosition(new fl.position.constructor());
  const dir = tp.sub(fp).normalize();
  const res = { steve: w.character ?? w.player.character, intensity: +fl.intensity.toFixed(1), dot: +dir.dot(fwd).toFixed(3) };
  w.switchCharacter();
  const t1 = performance.now(); while (performance.now() - t1 < 20000 && !(w.character === 'claire' && w.flashlight.intensity === 0)) await new Promise((r) => setTimeout(r, 200)); res.after = w.character;
  res.claireIntensity = +w.flashlight.intensity.toFixed(1);
  return res;
});
let bad = 0;
for (const x of r) { console.log(JSON.stringify(x)); if (x.ok === false) bad++; }
console.log('flashlight', JSON.stringify(f));
console.log('door failures', bad, 'errors', errors.length, errors.slice(0, 3).join(' | '));
await page.close(); await browser.close(); process.exit(0);
