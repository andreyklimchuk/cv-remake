// Steve hair at different quality presets (third-person, close)
import { chromium } from 'playwright';
const q = process.argv[2] || 'ultra';
const browser = await chromium.launch({ executablePath: '/usr/local/bin/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 960, height: 600 } });
await page.addInitScript((q) => { localStorage.setItem('cv.settings', JSON.stringify({ quality: q, sensitivity: 1, aimAssist: 0.5, volume: 0, invertY: false })); localStorage.setItem('cv.quality', q); }, q);
await page.goto('file:///data/cv-remake/dist/play.html');
await page.waitForTimeout(1500);
await page.click('text=НОВАЯ ИГРА');
await page.waitForFunction(() => window.__game?.mode === 'playing', null, { timeout: 180000 });
await page.evaluate(() => { const g = window.__game, w = g.world; for (const zb of w.zombies) { zb.alive = false; if (zb.root) zb.root.visible = false; } w.switchCharacter(); const P = w.player.pos.clone(); const f = w.player.forward(); g.rig.update = () => { const c = g.camera; c.position.set(P.x + f.x * 0.75 + f.z * 0.25, P.y + 1.62, P.z + f.z * 0.75 - f.x * 0.25); c.lookAt(P.x, P.y + 1.6, P.z); }; });
await page.waitForTimeout(8000);
await page.screenshot({ path: `shots/hair_${q}.png` });
await page.close(); await browser.close(); process.exit(0);
