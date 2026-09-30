import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/usr/local/bin/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 720, height: 900 } });
page.on('pageerror', (e) => console.log('PAGEERROR', e.message));
page.on('console', (m) => console.log(m.type(), m.text().slice(0, 300)));
await page.goto('file:///data/cv-remake/dist/play.html?viewer=claire&pose=aim&shot=torso');
for (let i = 0; i < 12; i++) { await page.waitForTimeout(10000); console.log(i, await page.evaluate(() => [window.__frames, window.__viewerReady])); if (await page.evaluate(() => window.__viewerReady)) break; }
await page.screenshot({ path: '/data/cv-remake/shots/dbg.png' });
await browser.close(); process.exit(0);
