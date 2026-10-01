// Steve walks into the closed hallEnd double door (no E) with the flashlight on.
import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/usr/local/bin/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.addInitScript(() => localStorage.setItem('cv.settings', JSON.stringify({ quality: 'medium', sensitivity: 1, aimAssist: 0.5, volume: 0, invertY: false })));
await page.goto('file:///data/cv-remake/dist/play.html');
await page.waitForTimeout(1500);
await page.click('text=НОВАЯ ИГРА');
await page.waitForFunction(() => window.__game?.mode === 'playing', null, { timeout: 120000 });
await page.evaluate(() => {
  const g = window.__game, w = g.world;
  for (const zb of w.zombies) { zb.alive = false; if (zb.root) zb.root.visible = false; }
  w.flags.add('gateOpen'); w.flags.add('open:palaceDoor');
  w.switchCharacter();
  w.player.pos.set(-0.4, 3.6, 186.6); w.player.yaw = 0; g.rig.yaw = 0; g.rig.pitch = -0.1;
});
await page.waitForTimeout(6000);
await page.screenshot({ path: 'shots/sc_0.png' });
console.log(await page.evaluate(() => { const g = window.__game; return JSON.stringify({ mode: g.mode, st: g.world.player.state, inp: !!g.input }); }));
await page.evaluate(() => window.__game.input.keys.add('KeyW'));
const info = [];
for (let i = 1; i <= 7; i++) {
  await page.waitForTimeout(2200);
  await page.screenshot({ path: `shots/sc_${i}.png` });
  info.push(await page.evaluate(() => { const w = window.__game.world, d = w.interactables.find((x) => x.id === 'hallEnd'); return { z: +w.player.pos.z.toFixed(2), open: d.open, a: d.leaves.map((l) => +l.a.toFixed(2)) }; }));
}
await page.evaluate(() => window.__game.input.keys.delete('KeyW'));
console.log(JSON.stringify(info));
await page.close(); await browser.close(); process.exit(0);
