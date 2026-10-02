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
const introT = (process.env.INTRO ?? '3,10,15.2,17.4,21,25,29,33.4,39,42,46').split(',').map(Number);
for (const [i, T] of introT.entries()) await at(T, `cut_intro_${i}`);
await at(50, 'cut_intro_end');
out.afterIntro = await until(() => window.__game.mode === 'playing');
await page.evaluate(() => new Promise((r) => setTimeout(r, 1500)));
await page.screenshot({ path: 'shots/cut_cell_play.png' });
out.cell = await page.evaluate(() => {
  const w = window.__game.world, p = w.player;
  return { char: w.character, x: +p.pos.x.toFixed(2), z: +p.pos.z.toFixed(2), zone: w.streamer.current?.id, items: w.inventory.items.map((i) => i.defId), weapon: w.weapons.current?.defId ?? null,
    flags: ['introDone', 'cellOpen', 'alarm'].filter((f) => w.flags.has(f)), heliGate: w.flags.has('heliGate'), heliGone: !w.scene.getObjectByName('Top_Rotor') };
});
// the second cutscene (meeting Steve) is gone: Claire stays the player character everywhere
await page.evaluate(() => { const w = window.__game.world; w.player.pos.set(0, 0, 43); });
await page.evaluate(() => new Promise((r) => setTimeout(r, 1200)));
out.noMeet = await page.evaluate(() => window.__game.mode === 'playing' && window.__game.world.character === 'claire');
console.log(JSON.stringify(out));
const ok = out.introStarted && out.afterIntro && out.cell.char === 'claire' && out.cell.items.length === 0 && out.cell.weapon === null && out.cell.zone === 'p_room' && out.cell.x > 3.3 && out.cell.flags.length === 3 &&
  !out.cell.heliGate && out.cell.heliGone && out.noMeet;
console.log(ok ? 'CUTSCENES OK' : 'CUTSCENES FAIL', errors.filter((e) => !e.includes('Pointer Lock')));
await browser.close(); process.exit(ok ? 0 : 1);
