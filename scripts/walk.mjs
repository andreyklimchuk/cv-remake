// physics walk test over stairs: node scripts/walk.mjs
import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/usr/local/bin/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
await page.addInitScript(() => localStorage.setItem('cv.settings', JSON.stringify({ quality: 'low', sensitivity: 1, aimAssist: 0.5, volume: 0, invertY: false })));
await page.goto('file:///data/cv-remake/dist/play.html');
await page.waitForTimeout(1500); await page.click('text=НОВАЯ ИГРА'); await page.waitForTimeout(6000);
const r = await page.evaluate(() => {
  const w = window.__game.world, ph = w.physics; const V = w.player.pos.constructor;
  const run = (name, x, y, z, dx, dz, n) => { const p = new V(x, y, z); const out = []; for (let i = 0; i < n; i++) { ph.moveCircle(p, new V(dx, 0, dz), 0.3); if (i % 5 === 4) out.push(`${p.x.toFixed(1)},${p.y.toFixed(2)},${p.z.toFixed(1)}`); } return name + ': ' + out.join(' | '); };
  return [
    run('plazaStairs', 0, 0, 95, 0, 0.2, 75),
    run('hallStairL', -11.7, 3.6, 168, 0, 0.2, 90),
    run('underGallery', 0, 3.6, 175, 0, 0.2, 70),
    run('terraceToYard', 0, 3.6, 110, -0.25, 0, 120),
    run('bridgeEdge', 0, 0, 60, 0.2, 0, 30),
    run('galleryFront', 0, 7.6, 185, 0, -0.2, 40),
    run('stairSide', -8, 3.6, 175, -0.2, 0, 20),
  ];
});
console.log(r.join('\n'));
await browser.close();
