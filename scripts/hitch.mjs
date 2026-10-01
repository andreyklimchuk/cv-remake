// Frame-hitch probe: walks/teleports through zone transitions and reports long frames.
import { chromium } from 'playwright';
const quality = process.argv[2] || 'medium';
const browser = await chromium.launch({ executablePath: '/usr/local/bin/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
const errors = [];
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); if (m.text().startsWith('[hitch]')) console.log(m.text()); });
await page.addInitScript((q) => localStorage.setItem('cv.settings', JSON.stringify({ quality: q, sensitivity: 1, aimAssist: 0.5, volume: 0, invertY: false })), quality);
await page.addInitScript(() => {
  window.__gl = {};
  for (const C of [WebGL2RenderingContext, WebGLRenderingContext]) for (const fn of ['linkProgram', 'texImage2D', 'texSubImage2D', 'bufferData', 'compressedTexImage2D', 'texStorage2D', 'generateMipmap', 'getProgramParameter']) {
    const o = C.prototype[fn]; if (!o) continue;
    C.prototype[fn] = function (...a) { const t = performance.now(); const r = o.apply(this, a); const d = performance.now() - t; const e = window.__gl[fn] || (window.__gl[fn] = [0, 0]); e[0]++; e[1] += d; return r; };
  }
});
await page.goto('file:///data/cv-remake/dist/play.html?devstart');
await page.waitForTimeout(1500);
const t0 = Date.now();
await page.click('text=НОВАЯ ИГРА');
await page.waitForFunction(() => window.__game?.mode === 'playing', null, { timeout: 300000 });
console.log('load ms', Date.now() - t0);
await page.waitForTimeout(4000);
await page.evaluate(() => {
  window.__ft = []; let last = performance.now(); const be = window.__game.backend; const f = be.render.bind(be);
  be.render = (dt) => { const n = performance.now(); f(dt); const e = performance.now(); window.__ft.push(Math.round(n - last) + '/' + Math.round(e - n)); last = e; };
});
const route = (process.argv[3] || 'yard:0,5;guard:24,5;guard2:28,12;cells:30,30;yard2:5,20;west:-26,14;yard3:0,30').split(';').map((s) => { const [n, p] = s.split(':'); const [x, z] = p.split(',').map(Number); return [n, x, z]; });
for (const [n, x, z] of route) {
  await page.evaluate(() => { window.__ft.length = 0; window.__gl = {}; window.__pn = new Set(window.__game.backend.renderer.info.programs.map((p) => p.id)); });
  await page.evaluate(([x, z]) => { const w = window.__game.world; w.player.pos.set(x, w.player.pos.y, z); }, [x, z]);
  await page.waitForTimeout(2500);
  const ft = await page.evaluate(() => window.__ft.slice());
  const inf = await page.evaluate(() => { const g = window.__game; return JSON.stringify({ fps: g.fps.toFixed(1), calls: g.backend.stats(), progs: g.backend.renderer.info.programs.length, vis: [...g.world.streamer.zones.values()].filter((z) => z.group.visible).map((z) => z.id).join(','), pos: [g.world.player.pos.x.toFixed(1), g.world.player.pos.z.toFixed(1)], cam: g.camera.position.toArray().map((v) => v.toFixed(1)) }); });
  console.log(inf);
  console.log('new progs', await page.evaluate(() => window.__game.backend.renderer.info.programs.filter((p) => !window.__pn.has(p.id)).map((p) => p.name + ' ' + p.cacheKey.slice(0, 300)).join('\n')));
  console.log(n.padEnd(8), 'frames', ft.length, ft.slice(0, 12).join(' '), await page.evaluate(() => JSON.stringify(Object.fromEntries(Object.entries(window.__gl).map(([k, v]) => [k, v[0] + '/' + Math.round(v[1])])))));
}
console.log('ERRORS:', errors.slice(0, 10).join('\n'));
await browser.close();
process.exit(0);
