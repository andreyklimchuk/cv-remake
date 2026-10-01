import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/usr/local/bin/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
await page.addInitScript(() => localStorage.setItem('cv.settings', JSON.stringify({ quality: 'low', sensitivity: 1, aimAssist: 0.5, volume: 0, invertY: false })));
await page.goto('file:///data/cv-remake/dist/play.html?devstart');
await page.waitForTimeout(1500);
await page.click('text=НОВАЯ ИГРА');
await page.waitForTimeout(5000);
const st = async (l) => console.log(l, JSON.stringify(await page.evaluate(() => ({ mode: window.__game.mode, open: window.__game.invUI.isOpen, items: window.__game.world.inventory.items.map(i => `${i.defId}x${i.qty}@${i.x},${i.y}${i.rot?'r':''}`) }))));
await page.evaluate(() => { const inv = window.__game.world.inventory; inv.add('herb_g', 1); inv.add('herb_g', 1); inv.add('powder_a', 1); inv.add('powder_a', 1); });
await st('before');
await page.keyboard.press('Tab'); await page.waitForTimeout(1500);
await st('after Tab');
await page.screenshot({ path: 'shots/inv_open.png' });
// drag first herb onto second herb
const tiles = await page.$$eval('.inv-item', els => els.map(e => { const r = e.getBoundingClientRect(); return { n: e.querySelector('.nm').textContent, x: r.x + r.width / 2, y: r.y + r.height / 2 }; }));
console.log(JSON.stringify(tiles));
const herbs = tiles.filter(t => /herb/i.test(t.n));
if (herbs.length >= 2) {
  await page.mouse.move(herbs[0].x, herbs[0].y); await page.mouse.down();
  await page.mouse.move(herbs[1].x, herbs[1].y, { steps: 8 }); await page.mouse.up();
  await page.waitForTimeout(800);
}
await st('after herb combine');
// move an item to empty cell (bottom right)
const g = await page.$eval('.inv-grid', e => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y }; });
const t2 = await page.$$eval('.inv-item', els => els.map(e => { const r = e.getBoundingClientRect(); return { n: e.querySelector('.nm').textContent, x: r.x + 20, y: r.y + 20 }; }));
const last = t2[t2.length - 1];
await page.mouse.move(last.x, last.y); await page.mouse.down();
await page.mouse.move(g.x + 7 * 58 + 20, g.y + 5 * 58 + 20, { steps: 8 }); await page.mouse.up();
await page.waitForTimeout(800);
await st('after move');
await page.screenshot({ path: 'shots/inv_after.png' });
await page.keyboard.press('Tab'); await page.waitForTimeout(1500);
await st('after close Tab');
await page.keyboard.press('KeyI'); await page.waitForTimeout(1500);
await st('after I');
await page.keyboard.press('Escape'); await page.waitForTimeout(1500);
await st('after Esc');
console.log(errors.join('\n'));
await browser.close();
