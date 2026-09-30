import { chromium } from 'playwright';
// usage: node scripts/viewer.mjs out_prefix "pose=idle&shot=full&yaw=0" ["pose=aim&shot=torso&yaw=30" ...]
const [prefix, ...qs] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: '/usr/local/bin/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 720, height: 900 } });
page.on('pageerror', (e) => console.log('PAGEERROR', e.message));
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.log(m.type(), m.text().slice(0, 300)); });
let i = 0;
for (const q of qs) {
  await page.goto('file:///data/cv-remake/dist/play.html?' + (q.includes('viewer=') ? '' : 'viewer=claire&') + q);
  await page.waitForFunction(() => window.__viewerReady, null, { timeout: 600000 });
  console.log(q, JSON.stringify(await page.evaluate(() => window.__viewerInfo())));
  await page.screenshot({ path: `/data/cv-remake/shots/${prefix}_${i++}.png` });
}
await browser.close();
process.exit(0);
