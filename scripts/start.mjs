// New-game start: intro skip → Claire unarmed in her open cell; lighter on the bunk; cell-block door unlocked;
// knife + M9F by the dead guard in the yard (first gun auto-equipped with a full magazine); no free character switch.
import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/usr/local/bin/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
const errors = []; page.on('pageerror', (e) => errors.push(e.message));
await page.addInitScript(() => localStorage.setItem('cv.settings', JSON.stringify({ quality: 'low', sensitivity: 1, aimAssist: 0.5, volume: 0, invertY: false })));
await page.goto('file:///data/cv-remake/dist/play.html', { timeout: 300000 });
await page.waitForTimeout(1500);
await page.click('text=НОВАЯ ИГРА');
const until = (fn) => page.waitForFunction(fn, null, { timeout: 300000, polling: 50 }).then(() => true, () => false);
const out = {};
out.cutscene = await until(() => window.__game?.mode === 'cutscene' && window.__game.cut.t > 0.5);
await page.keyboard.press('Enter');
out.skipped = await until(() => window.__game.mode === 'playing');
// the barred door rolls open (~1.1 s game time) → wait until the doorway is passable
out.exitOpen = await until(() => { const w = window.__game.world, V = w.player.pos.constructor; return w.physics.walkable(new V(34, 0, 38.6), new V(34, 0, 34.4), 0.3); });
out.cell = await page.evaluate(() => {
  const g = window.__game, w = g.world, p = w.player, V = p.pos.constructor;
  const lighter = w.interactables.find((i) => i.id === 'c_lighter');
  const cd = w.interactables.find((i) => i.id === 'cellDoor');
  return {
    pos: [p.pos.x, p.pos.z], items: w.inventory.items.length, weapon: w.weapons.current?.defId ?? null,
    hud: document.querySelector('.hud-ammo .wname')?.textContent,
    lighter: !!lighter?.enabled && lighter.pos.x > 32 && lighter.pos.x < 36 && lighter.pos.z > 36,
    exit: w.physics.walkable(new V(34, 0, 38.6), new V(34, 0, 34.4), 0.3),
    cellDoorLocked: cd?.locked ?? null,
    zombiesHidden: w.zombies.filter((z) => z.alive).some((z) => z.model.root.visible),
  };
});
// C must no longer switch characters
await page.keyboard.press('KeyC');
await page.waitForTimeout(400);
out.afterC = await page.evaluate(() => window.__game.world.character);
// F without a knife → no knife state
await page.keyboard.press('KeyF');
await page.waitForTimeout(400);
out.fState = await page.evaluate(() => window.__game.world.player.state);
// to the dead guard in the yard: pick up the M9F with E
await page.evaluate(() => {
  const w = window.__game.world;
  for (const z of w.zombies) if (z.alive) z.forceDead();
  w.player.pos.set(14.5, 0, 11.3); w.player.yaw = Math.PI;
});
await page.waitForTimeout(800);
await page.keyboard.press('KeyE');
out.gun = await until(() => !!window.__game.world.weapons.current);
out.yard = await page.evaluate(() => {
  const w = window.__game.world;
  return { weapon: w.weapons.current?.defId, mag: w.weapons.current?.mag, knifeOnGround: !!w.interactables.find((i) => i.id === 'y_knife')?.enabled, ammo: !!w.interactables.find((i) => i.id === 'y_ammo0') };
});
console.log(JSON.stringify(out));
const c = out.cell;
const ok = out.cutscene && out.skipped && c.items === 0 && c.weapon === null && c.hud === 'Без оружия' && c.lighter && out.exitOpen && c.cellDoorLocked === false &&
  out.afterC === 'claire' && out.fState === 'normal' && out.gun && out.yard.weapon === 'm9f' && out.yard.mag === 15 && out.yard.knifeOnGround && out.yard.ammo;
console.log(ok ? 'START OK' : 'START FAIL', errors.filter((e) => !e.includes('Pointer Lock')));
await browser.close(); process.exit(ok ? 0 : 1);
