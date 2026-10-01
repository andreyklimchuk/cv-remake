// Knife stance (Space hold) + Steve's Luger holster / draw regression.
import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/usr/local/bin/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
const errors = []; page.on('pageerror', (e) => errors.push(e.message));
await page.addInitScript(() => localStorage.setItem('cv.settings', JSON.stringify({ quality: 'low', sensitivity: 1, aimAssist: 0.5, volume: 0, invertY: false })));
await page.goto('file:///data/cv-remake/dist/play.html');
await page.waitForTimeout(1500);
await page.click('text=НОВАЯ ИГРА');
await page.waitForFunction(() => window.__game?.mode === 'playing', null, { timeout: 120000 });
const st = () => page.evaluate(() => { const p = window.__game.world.player; return { state: p.state, ready: p.knifeReady, aiming: p.aiming }; });
const out = {};
// headless swiftshader runs only a few frames per second → wait on game state, not wall time
const until = (fn) => page.waitForFunction(fn, null, { timeout: 120000, polling: 50 }).then(() => true, () => false);
await page.mouse.move(320, 180);
await page.keyboard.down('Space');
await until(() => window.__game.world.player.knifeReady);
out.hold = await st();
await page.mouse.down({ button: 'left' }); await page.mouse.up({ button: 'left' });
out.slashSeen = await until(() => window.__game.world.player.state === 'knife');
await until(() => window.__game.world.player.state === 'normal');
await page.mouse.down({ button: 'right' }); await page.mouse.up({ button: 'right' });
out.stabSeen = await until(() => window.__game.world.player.state === 'stab');
out.stab = await st();
await until(() => window.__game.world.player.state === 'normal');
await page.keyboard.up('Space');
await until(() => !window.__game.world.player.knifeReady);
out.release = await st();
// Steve: holster the Lugers (switch to knife), then draw them again
out.steve = await page.evaluate(async () => {
  const g = window.__game, w = g.world; w.switchCharacter();
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const m = w.player.model; const t0 = performance.now();
  while (performance.now() - t0 < 30000 && m.weaponBusy()) await wait(100);
  const r = { char: w.character, gun: m.gunId };
  const knife = w.inventory.firstOf('knife'); w.equip(knife);
  r.putBusy = m.weaponBusy(); r.gunDuringPut = m.gunId;
  const t1 = performance.now(); while (performance.now() - t1 < 30000 && m.weaponBusy()) await wait(100);
  await wait(300); r.afterPut = m.gunId; r.holstered = m.holsters.map((h) => h.gun.visible); r.dbg = { has: m.hasLugers, st: w.player.state, kk: m.knifeK, vis: m.root.visible };
  w.equip(w.inventory.firstOf('gold_lugers'));
  r.drawBusy = m.weaponBusy();
  const t2 = performance.now(); while (performance.now() - t2 < 30000 && m.weaponBusy()) await wait(100);
  await wait(500);
  r.afterDraw = m.gunId; r.holsteredAfterDraw = m.holsters.map((h) => h.gun.visible); r.handGun = m.gun?.visible;
  return r;
});
console.log(JSON.stringify(out));
const s = out.steve;
const ok = out.hold.ready && !out.hold.aiming && out.slashSeen && out.stabSeen && !out.stab.aiming && !out.release.ready &&
  s.char === 'steve' && s.putBusy && s.gunDuringPut === 'gold_lugers' && s.afterPut === 'knife' && s.holstered.every(Boolean) && s.drawBusy && s.afterDraw === 'gold_lugers' && !s.holsteredAfterDraw.some(Boolean) && s.handGun;
console.log(ok ? 'KNIFE/HOLSTER OK' : 'KNIFE/HOLSTER FAIL', errors.filter((e) => !e.includes('Pointer Lock')));
await browser.close(); process.exit(ok ? 0 : 1);
