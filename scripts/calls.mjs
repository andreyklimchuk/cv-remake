import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/usr/local/bin/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
page.on('pageerror', (e) => console.log('PAGEERROR', e.message));
await page.addInitScript((q) => localStorage.setItem('cv.settings', JSON.stringify({ quality: q, volume: 0 })), process.argv[2] || 'medium');
await page.goto('file:///data/cv-remake/dist/play.html');
await page.waitForTimeout(800);
await page.click('text=НОВАЯ ИГРА');
await page.waitForTimeout(5000);
console.log(await page.evaluate(() => {
  const w = window.__game.world; const cats = {}; let casters = 0, total = 0;
  const cam = window.__game.camera;
  w.scene.traverseVisible((o) => {
    if (!(o.isMesh || o.isPoints || o.isLine || o.isSprite)) return;
    const mats = Array.isArray(o.material) ? o.material.length : 1;
    total += mats; if (o.castShadow) casters += mats;
    let p = o; let zone = 'root'; while (p) { if (p.name?.startsWith('zone:')) { zone = p.name; break; } p = p.parent; }
    const k = zone + ':' + o.type; cats[k] = (cats[k] || 0) + mats;
  });
  const shadowLights = []; w.scene.traverseVisible((o) => { if (o.isLight && o.castShadow) shadowLights.push(o.type); });
  return JSON.stringify({ total, casters, shadowLights, cats, calls: window.__game.backend.stats() }, null, 1);
}));
await browser.close();
