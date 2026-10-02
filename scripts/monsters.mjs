// Licker + Hunter smoke test: teleport Claire next to each, let the AI run, report states / damage / errors, screenshot.
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
for (const [kind, dx, dz, yaw] of [['hunter', 0, -7, 0], ['licker', 2.6, 0, -Math.PI / 2]]) {
  const ok = await page.evaluate(([kind, dx, dz, yaw]) => {
    const g = window.__game, w = g.world, p = w.player;
    const m = w.zombies.find((z) => z.kind === kind);
    if (!m) return false;
    p.pos.set(m.position.x + dx, m.position.y, m.position.z + dz); p.yaw = yaw; g.rig.yaw = yaw + Math.PI; p.hp = 100;
    window.__mon = m; return true;
  }, [kind, dx, dz, yaw]);
  if (!ok) { console.log(kind, 'missing'); continue; }
  const log = []; let last = ''; const shot = new Set(); const t0 = Date.now(); let hits = 0;
  while (Date.now() - t0 < 16000 && log.length < 16) {
    const st = await page.evaluate(() => { const m = window.__mon, p = window.__game.world.player; const r = { s: m.state, hp: p.hp }; if (p.hp < 50) p.hp = 100; return r; });
    if (st.hp < 100) hits++;
    if (st.s !== last) { last = st.s; log.push(st.s + '@' + ((Date.now() - t0) / 1000).toFixed(1)); }
    if (['leap', 'lash', 'pounce', 'swipe', 'chase'].includes(st.s) && !shot.has(st.s)) { shot.add(st.s); await page.screenshot({ path: `/data/cv-remake/shots/mon_${kind}_${st.s}.png` }); }
    await page.waitForTimeout(80);
  }
  const fin = await page.evaluate(() => { const m = window.__mon, p = window.__game.world.player; return { hp: p.hp.toFixed(0), dist: m.position.distanceTo(p.pos).toFixed(1), alive: m.alive }; });
  console.log(JSON.stringify({ kind, states: log.join(' '), hurtSamples: hits, ...fin, shots: [...shot] }));
}
console.log('errors', errors.length, errors.slice(0, 3).join(' | '));
await page.close(); await browser.close(); process.exit(0);
