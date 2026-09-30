import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/usr/local/bin/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
page.on('pageerror', (e) => console.log('PAGEERROR', e.message));
await page.addInitScript(() => localStorage.setItem('cv.settings', JSON.stringify({ quality: 'low', volume: 0 })));
await page.goto('file:///data/cv-remake/dist/play.html');
await page.waitForTimeout(1000);
await page.click('text=НОВАЯ ИГРА');
await page.waitForTimeout(5000);
await page.keyboard.down('KeyW');
for (let i = 0; i < 6; i++) {
  await page.waitForTimeout(500);
  console.log(await page.evaluate(() => { const w = window.__game.world; return JSON.stringify({ z: w.player.pos.z.toFixed(2), v: w.player.vel.toArray().map(n => n.toFixed(2)), st: w.player.state, fps: window.__game.fps.toFixed(0), mode: window.__game.mode, t: w.time.toFixed(2) }); }));
}
await page.keyboard.up('KeyW');
await browser.close();
