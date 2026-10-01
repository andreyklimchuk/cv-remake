// Visual tour of zones/puzzles: node scripts/tour.mjs [quality]
import { chromium } from 'playwright';
const quality = process.argv[2] || 'medium';
const only = process.argv[3] ? process.argv[3].split(',') : null;
const browser = await chromium.launch({ executablePath: '/usr/local/bin/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message + '\n' + e.stack));
await page.addInitScript((q) => localStorage.setItem('cv.settings', JSON.stringify({ quality: q, sensitivity: 1, aimAssist: 0.5, volume: 0, invertY: false })), quality);
await page.goto('file:///data/cv-remake/dist/play.html');
await page.waitForTimeout(1500);
await page.click('text=НОВАЯ ИГРА');
await page.waitForTimeout(7000);
const tp = async (x, z, yaw, pitch = -0.12, wait = 2500) => {
  await page.evaluate(([x, z, yaw, pitch]) => {
    const g = window.__game, w = g.world;
    for (const i of w.interactables) if (i.openNow && !i.open) i.openNow(w.flags);
    for (const zb of w.zombies) { zb.alive = false; if (zb.root) zb.root.visible = false; }
    w.player.pos.set(x, 0, z); w.player.yaw = yaw; g.rig.yaw = yaw; g.rig.pitch = pitch;
  }, [x, z, yaw, pitch]);
  await page.waitForTimeout(wait);
};
const shot = async (n) => { await page.screenshot({ path: `/data/cv-remake/shots/tour_${n}.png` }); console.log('shot', n); };
const stops = [
  ['saveroom', 24.5, 5.5, Math.PI + 0.3], ['guard', 27, 10, 0.2], ['corridor', 34, 4.6, Math.PI / 2], ['steam', 38.5, 4.6, Math.PI / 2],
  ['office', 42, 9.5, 0.3], ['office2', 46, 12, -2.3], ['archive', 36.5, 9, -0.2], ['cells', 30, 33.5, 0.2], ['gallery', 47, 36, Math.PI / 2], ['west', -26, 14, -2.2], ['yard', 6, 8, -0.8],
];
for (const [n, x, z, yaw] of stops) { if (only && !only.includes(n)) continue; await tp(x, z, yaw); await shot(n); }
if (!only || only.includes('inv')) {
  await page.evaluate(() => { const g = window.__game; const w = g.world; w.inventory.add('valve_handle'); w.inventory.add('gp_a'); g.openInventory(false); });
  await page.waitForTimeout(800); await shot('inventory');
  await page.keyboard.press('ArrowRight'); await page.keyboard.press('Enter'); await page.waitForTimeout(400); await shot('inventory_menu');
  await page.keyboard.press('Backspace'); await page.evaluate(() => { const g = window.__game; g.invUI.close(); g.readDoc('warden_letter'); }); await page.waitForTimeout(600); await shot('doc');
  await page.keyboard.press('Escape'); await page.waitForTimeout(300);
  await page.evaluate(() => { const g = window.__game; g.codeLock('СЕЙФ НАЧАЛЬНИКА', 4, (c) => c === '0419', () => {}); });
  await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowUp'); await page.waitForTimeout(400); await shot('codelock');
  await page.keyboard.press('Escape');
  await page.evaluate(() => { const g = window.__game; g.openInventory(true); }); await page.waitForTimeout(700); await shot('itembox');
  await page.evaluate(() => { window.__game.invUI.close(); }); await page.waitForTimeout(300);
  await tp(3, 10, 0, -0.1, 800);
  await page.mouse.move(640, 360); await page.mouse.down({ button: 'right' }); await page.waitForTimeout(1200); await shot('hud_aim'); await page.mouse.up({ button: 'right' });
}
const info = await page.evaluate(() => { const g = window.__game; return { calls: g.backend.stats(), fps: g.fps }; });
console.log(JSON.stringify(info));
console.log('ERRORS:', errors.slice(0, 15).join('\n'));
await browser.close();
