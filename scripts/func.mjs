// Functional regression (6.14): character switch, enemy roster (new zombies dominate), door transitions
// prison ⇄ yard, keycard → fence gate → west gate → end screen, admin panel (F10).
import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/usr/local/bin/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.addInitScript(() => localStorage.setItem('cv.settings', JSON.stringify({ quality: 'low', sensitivity: 1, aimAssist: 0.5, volume: 0, invertY: false })));
await page.goto('file:///data/cv-remake/dist/play.html?devstart');
await page.waitForTimeout(1500);
await page.click('text=НОВАЯ ИГРА');
await page.waitForFunction(() => window.__game?.mode === 'playing', null, { timeout: 180000 });
const sleep = (ms) => page.evaluate((ms) => new Promise((r) => setTimeout(r, ms)), ms);
const out = {};
out.a = await page.evaluate(() => {
  const g = window.__game, w = g.world, o = {};
  o.start = w.character; o.zone = w.streamer.current?.id;
  o.roster = w.zombies.map((z) => z.spawn.outfit ?? z.spawn.kind).reduce((a, k) => (a[k] = (a[k] || 0) + 1, a), {});
  o.switch1 = w.switchCharacter(); o.steveInv = w.inventory.items.map((i) => i.defId); o.switch2 = w.switchCharacter();
  for (const z of w.zombies) if (z.alive) z.forceDead();
  // yard → prison stairs through the cell-block door
  const s = window.__game.world.interactables.find((i) => i.id === 'door_block');
  w.player.pos.set(s.pos.x, 0, s.pos.z); s.interact(g.api);
  return o;
});
await page.waitForFunction(() => window.__game.mode === 'playing' && window.__game.world.player.pos.y > 6, null, { timeout: 60000 }).catch(() => {});
out.b = await page.evaluate(() => {
  const g = window.__game, w = g.world, p = w.player;
  const o = { afterBlock: [+p.pos.x.toFixed(1), +p.pos.y.toFixed(2), +p.pos.z.toFixed(1)], zone1: w.streamer.current?.id, mode1: g.mode };
  const d = w.interactables.find((i) => i.id === 'door_stairs'); p.pos.set(d.pos.x, d.pos.y, d.pos.z); d.interact(g.api);
  return o;
});
await page.waitForFunction(() => window.__game.mode === 'playing' && window.__game.world.player.pos.x > 100, null, { timeout: 60000 }).catch(() => {});
out.c = await page.evaluate(() => {
  const g = window.__game, w = g.world, p = w.player;
  const o = { afterStairs: [+p.pos.x.toFixed(1), +p.pos.z.toFixed(1)], zone2: w.streamer.current?.id };
  // fence gate: locked without the card, opens with it; west gate ends the demo
  const fg = w.interactables.find((i) => i.id === 'fenceGate');
  p.pos.set(fg.pos.x, 0, fg.pos.z);
  fg.interact(g.api); o.lockedWithout = fg.locked;
  w.inventory.add('keycard'); fg.interact(g.api); o.unlockedWith = !fg.locked && !w.inventory.has('keycard');
  o.houseDoor = !!w.interactables.find((i) => i.id === 'houseDoor'); o.study = !!w.interactables.find((i) => i.id === 'h_keycard');
  return o;
});
// admin panel: F10 opens it, buttons work, F10 closes
await page.keyboard.press('F10');
await page.waitForFunction(() => window.__game.admin.isOpen, null, { timeout: 60000 }).catch(() => {});
out.d = await page.evaluate(() => {
  const g = window.__game, w = g.world, o = { mode: g.mode, panel: g.admin.isOpen };
  const btn = (re) => [...document.querySelectorAll('.admin button')].find((b) => re.test(b.textContent)) ?? { click() {} };
  const n0 = w.zombies.length; btn(/хитмен/).click(); btn(/женщина/).click(); o.spawned = w.zombies.length - n0;
  btn(/Убить всех/).click(); o.allDead = w.zombies.every((z) => !z.alive);
  btn(/Бессмертие/).click(); o.god = g.god;
  btn(/Дом: кабинет/).click(); o.tp = [+w.player.pos.x.toFixed(1), +w.player.pos.y.toFixed(2), +w.player.pos.z.toFixed(1)]; o.tpZone = w.streamer.current?.id;
  return o;
});
await page.keyboard.press('F10');
await page.waitForFunction(() => !window.__game.admin.isOpen, null, { timeout: 60000 }).catch(() => {});
out.e = await page.evaluate(() => ({ mode: window.__game.mode, panel: window.__game.admin.isOpen }));
await page.evaluate(() => { const g = window.__game, w = g.world; g.god = false; const wg = w.interactables.find((i) => i.id === 'westGate'); w.player.pos.set(wg.pos.x, 0, wg.pos.z); wg.interact(g.api); });
await page.waitForFunction(() => window.__game.mode === 'end', null, { timeout: 60000 }).catch(() => {});
out.end = await page.evaluate(() => window.__game.mode);
console.log(JSON.stringify(out));
const a = out.a, b = out.b, c = out.c, d = out.d;
const newZ = (a.roster.hitman ?? 0) + (a.roster.female ?? 0), oldZ = (a.roster.prisoner ?? 0) + (a.roster.guard ?? 0) + (a.roster.civilian ?? 0);
const ok = a.start === 'claire' && a.zone === 'yard' && a.switch1 === 'steve' && a.switch2 === 'claire' && newZ > 2 * oldZ &&
  b.zone1 === 'p_corr' && b.afterBlock[1] > 6 && b.mode1 === 'playing' && c.zone2 === 'yard' && c.afterStairs[0] > 100 &&
  c.lockedWithout && c.unlockedWith && c.houseDoor && c.study &&
  d.mode === 'admin' && d.panel && d.spawned === 2 && d.allDead && d.god && d.tpZone === 'house' && out.e.mode === 'playing' && !out.e.panel && out.end === 'end';
console.log(ok ? 'FUNC OK' : 'FUNC FAIL', 'errors', errors.length, errors.slice(0, 3).join(' | '));
await page.close(); await browser.close(); process.exit(ok ? 0 : 1);
