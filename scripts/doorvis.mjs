// Door latch → portal culling regression: the zone the player stands in must stay visible.
import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/usr/local/bin/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
const errors = []; page.on('pageerror', (e) => errors.push(e.message));
await page.addInitScript(() => localStorage.setItem('cv.settings', JSON.stringify({ quality: 'low', sensitivity: 1, aimAssist: 0.5, volume: 0, invertY: false })));
await page.goto('file:///data/cv-remake/dist/play.html');
await page.waitForTimeout(1500);
await page.click('text=НОВАЯ ИГРА');
await page.waitForFunction(() => window.__game?.mode === 'playing', null, { timeout: 120000 });
const r = await page.evaluate(() => {
  const g = window.__game, w = g.world, st = w.streamer, out = [];
  for (const z of st.zones.values()) st.buildNow(z.id);
  const doors = w.interactables.filter((i) => Array.isArray(i.leaves) && i.leaves.length && i.collider);
  const V = w.player.pos.constructor;
  for (const d of doors) {
    const l0 = d.leaves[0]; const h = new V(); l0.pivot.getWorldPosition(h);
    const nx = l0.dir0.y, nz = -l0.dir0.x, mx = h.x + l0.dir0.x * l0.width * 0.5, mz = h.z + l0.dir0.y * l0.width * 0.5;
    for (const side of [1, -1]) for (const camBack of [-3, 1.5]) {
      d.openNow(w.flags);
      const p = new V(mx + nx * side * 1.6, l0.y0, mz + nz * side * 1.6);
      const cam = new V(mx + nx * side * (1.6 - camBack), l0.y0 + 1.6, mz + nz * side * (1.6 - camBack));
      st.update(p, cam);
      d.latch();
      st.update(p, cam);
      const pz = st.zoneAt(p);
      out.push({ id: d.id, side, camBack, pz: pz?.id, cz: st.zoneAt(cam)?.id, cur: st.current?.id, ok: !pz || pz.group.visible });
    }
  }
  return out;
});
let bad = 0; for (const x of r) { if (!x.ok) { bad++; console.log(JSON.stringify(x)); } }
console.log('checked', r.length, 'bad', bad, 'errors', errors.length);
await browser.close(); process.exit(0);
