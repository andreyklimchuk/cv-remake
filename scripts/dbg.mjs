import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/usr/local/bin/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
page.on('pageerror', (e) => console.log('PAGEERROR: ' + e.message)); const cm = {}; page.on('console', (m) => { const k = m.type() + ':' + m.text().slice(0, 120); cm[k] = (cm[k] || 0) + 1; }); process.on('exit', () => console.log(JSON.stringify(cm, null, 1).slice(0, 3000)));
await page.addInitScript(() => localStorage.setItem('cv.settings', JSON.stringify({ quality: 'medium', sensitivity: 1, aimAssist: 0.5, volume: 0, invertY: false })));
await page.goto('file:///data/cv-remake/dist/play.html');
await page.waitForTimeout(1500);
await page.click('text=НОВАЯ ИГРА');
await page.waitForFunction(() => window.__game?.mode === 'playing', null, { timeout: 300000 });
await page.evaluate(() => {
  const g = window.__game, w = g.world; window.__t = {};
  const wrap = (obj, name, key) => { const f = obj[name].bind(obj); obj[name] = (...a) => { const t = performance.now(); const r = f(...a); window.__t[key] = Math.max(window.__t[key] || 0, performance.now() - t); return r; }; };
  wrap(g.backend, 'render', 'render'); wrap(w.streamer, 'update', 'stream'); wrap(w.lights, 'update', 'lights'); wrap(w, 'updateZombies', 'zombies'); wrap(w.level, 'update', 'level'); wrap(w.nav, 'rebuild', 'nav');
  wrap(w.player, 'update', 'player'); wrap(g.hud, 'update', 'hud'); wrap(g.rig, 'update', 'rig');
});
for (const [x, z] of [[24, 5], [30, 30], [-26, 14], [0, 30]]) {
  await page.evaluate(() => { window.__t = {}; });
  await page.evaluate(([x, z]) => { window.__game.world.player.pos.set(x, 0, z); }, [x, z]);
  await page.waitForTimeout(3000);
  console.log(x, z, await page.evaluate(() => JSON.stringify({ t: Object.fromEntries(Object.entries(window.__t).map(([k, v]) => [k, Math.round(v)])), progs: window.__game.backend.renderer.info.programs.length })));
}
for (let i = 0; i < 1; i++) {
  await page.waitForTimeout(2000);
  console.log(await page.evaluate(() => {
    const g = window.__game, w = g.world; const vis = [...w.streamer.zones.values()].filter((z) => z.group.visible).map((z) => z.id);
    let lights = 0, vl = 0; w.scene.traverse((o) => { if (o.isLight) { lights++; if (o.layers.mask === 1) vl++; } });
    const r = g.backend.renderer; const progs = r.info.programs?.length;
    return JSON.stringify({ mode: g.mode, fps: g.fps.toFixed(1), vis, lights, layer0: vl, progs, calls: g.backend.stats() });
  }));
}
await browser.close(); process.exit(0);
