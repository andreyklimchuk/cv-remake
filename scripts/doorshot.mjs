// Screenshot: player standing at closed single doors (scale check). node scripts/doorshot.mjs [quality] [ids]
import { chromium } from 'playwright';
const quality = process.argv[2] || 'medium';
const ids = (process.argv[3] || 'archiveDoor,guardDoor,officeDoor').split(',');
const browser = await chromium.launch({ executablePath: '/usr/local/bin/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.addInitScript((q) => localStorage.setItem('cv.settings', JSON.stringify({ quality: q, sensitivity: 1, aimAssist: 0.5, volume: 0, invertY: false })), quality);
await page.goto('file:///data/cv-remake/dist/play.html', { timeout: 300000 });
await page.waitForTimeout(1500);
await page.click('text=НОВАЯ ИГРА');
await page.waitForFunction(() => window.__game?.mode === 'playing', null, { timeout: 120000 });
await page.waitForTimeout(4000);
for (const id of ids) {
  const ok = await page.evaluate((id) => {
    const g = window.__game, w = g.world, d = w.interactables.find((i) => i.id === id);
    if (!d) return false;
    d.constructor.closeDelay = 1e9;
    for (const zb of w.zombies) { zb.alive = false; if (zb.root) zb.root.visible = false; }
    const l = d.leaves[0], h = new w.player.pos.constructor(); l.pivot.getWorldPosition(h);
    const ax = l.dir0.x, az = l.dir0.y, nx = az, nz = -ax;
    const cx = h.x + ax * l.width / 2, cz = h.z + az * l.width / 2;
    // stand on the side the camera can see, slightly off-centre
    const side = (window.__side ?? 1);
    const px = cx + nx * 0.75 * side + ax * 0.55, pz = cz + nz * 0.75 * side + az * 0.55;
    w.player.pos.set(px, l.y0, pz);
    const yaw = Math.atan2(-nx * side, -nz * side) + 0.5;
    w.player.yaw = yaw; g.rig.yaw = yaw; g.rig.pitch = -0.05;
    return true;
  }, id);
  if (!ok) { console.log('no door', id); continue; }
  await page.waitForTimeout(3500);
  await page.screenshot({ path: `/data/cv-remake/shots/door_${id}.png` }); console.log('shot', id);
}
await page.close(); await browser.close(); process.exit(0);
