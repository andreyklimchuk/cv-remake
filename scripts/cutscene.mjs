// Intro + "meet Steve" cutscenes: frames at key moments, end-state checks (unarmed Claire in her cell; Steve takes over).
import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/usr/local/bin/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const W = +(process.env.W ?? 960), H = Math.round(W * 9 / 16);
const page = await browser.newPage({ viewport: { width: W, height: H } });
const errors = []; page.on('pageerror', (e) => errors.push(e.message));
await page.addInitScript(() => localStorage.setItem('cv.settings', JSON.stringify({ quality: 'medium', sensitivity: 1, aimAssist: 0.5, volume: 0, invertY: false })));
await page.goto('file:///data/cv-remake/dist/play.html', { timeout: 300000 });
await page.waitForTimeout(1500);
await page.click('text=НОВАЯ ИГРА');
const until = (fn, arg) => page.waitForFunction(fn, arg, { timeout: 300000, polling: 50 }).then(() => true, () => false);
const out = {};
out.introStarted = await until(() => window.__game?.mode === 'cutscene');
const shots = (process.env.SHOTS ?? '1').split(',').length ? process.env.SHOTS !== '0' : true;
/** fast-forward the running cutscene to time T without rendering, then let a few frames render and grab a shot */
async function at(T, name) {
  await page.evaluate((T) => {
    const g = window.__game, c = g.cut, w = g.world;
    while (c && !c.done && c.t < T) { c.step(0.05); w.level.update(0.05, w.time, c.focus); w.time += 0.05; }
  }, T);
  await page.evaluate(() => new Promise((r) => { let n = 0; const f = () => (++n > 3 ? r() : requestAnimationFrame(f)); requestAnimationFrame(f); }));
  if (shots) await page.screenshot({ path: `shots/${name}.png` });
}
const introT = (process.env.INTRO ?? '3,10,15.2,17.4,21,24,29,32.4,38.6,41.5,45.4').split(',').map(Number);
for (const [i, T] of introT.entries()) await at(T, `cut_intro_${i}`);
await at(48, 'cut_intro_end');
out.afterIntro = await until(() => window.__game.mode === 'playing');
await page.evaluate(() => new Promise((r) => setTimeout(r, 1500)));
await page.screenshot({ path: 'shots/cut_cell_play.png' });
out.cell = await page.evaluate(() => {
  const w = window.__game.world, p = w.player;
  return { char: w.character, x: +p.pos.x.toFixed(2), z: +p.pos.z.toFixed(2), items: w.inventory.items.map((i) => i.defId), weapon: w.weapons.current?.defId ?? null,
    flags: ['introDone', 'cellOpen'].filter((f) => w.flags.has(f)), heli: !!w.scene.children.find((o) => o.children.length > 30 && o.position.y > 0 && false) };
});
// --- meet Steve: give Claire a kit, open the gate and walk her past it
await page.evaluate(() => {
  const w = window.__game.world, inv = w.inventory;
  inv.add('m9f', 1, { mag: 12 }); inv.add('knife'); inv.add('ammo_hg', 20); inv.add('bowgun', 1, { mag: 10 }); inv.add('herb_g'); inv.add('lighter');
  w.equip(inv.firstOf('m9f'));
  w.flags.add('gateOpen'); w.player.pos.set(0, 0, 43);
});
out.meetStarted = await until(() => window.__game.mode === 'cutscene');
const meetT = (process.env.MEET ?? '1.2,2.6,5,9,14,21,23.5,27,32').split(',').map(Number);
for (const [i, T] of meetT.entries()) await at(T, `cut_meet_${i}`);
await at(38, 'cut_meet_end');
out.afterMeet = await until(() => window.__game.mode === 'playing');
await page.evaluate(() => new Promise((r) => setTimeout(r, 1500)));
await page.screenshot({ path: 'shots/cut_steve_play.png' });
out.steve = await page.evaluate(() => {
  const w = window.__game.world;
  return { char: w.character, weapon: w.weapons.current?.defId ?? null, items: w.inventory.items.map((i) => i.defId + (i.qty > 1 ? '×' + i.qty : '')), claire: w.inventories.claire.items.map((i) => i.defId), steveMet: w.flags.has('steveMet'), go1: w.flags.has('dead:go_1') };
});
console.log(JSON.stringify(out));
const ok = out.introStarted && out.afterIntro && out.cell.char === 'claire' && out.cell.items.length === 0 && out.cell.weapon === null && out.cell.z > 37 && out.cell.flags.length === 2 &&
  out.meetStarted && out.afterMeet && out.steve.char === 'steve' && out.steve.weapon === 'gold_lugers' && !out.steve.items.some((i) => i.startsWith('m9f')) && out.steve.items.some((i) => i.startsWith('bowgun')) && out.steve.items.includes('lighter') && out.steve.claire.includes('m9f');
console.log(ok ? 'CUTSCENES OK' : 'CUTSCENES FAIL', errors.filter((e) => !e.includes('Pointer Lock')));
await browser.close(); process.exit(ok ? 0 : 1);
