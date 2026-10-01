// Functional regression: character switch, Steve dual Lugers, creatures spawn, fireplace puzzle -> end.
import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/usr/local/bin/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.addInitScript(() => localStorage.setItem('cv.settings', JSON.stringify({ quality: 'low', sensitivity: 1, aimAssist: 0.5, volume: 0, invertY: false })));
await page.goto('file:///data/cv-remake/dist/play.html?devstart');
await page.waitForTimeout(1500);
await page.click('text=НОВАЯ ИГРА');
await page.waitForFunction(() => window.__game?.mode === 'playing', null, { timeout: 120000 });
const r = await page.evaluate(() => {
  const g = window.__game, w = g.world, out = {};
  out.start = w.character ?? w.player.character;
  out.creatures = w.zombies.map((z) => z.kind ?? z.constructor.name).reduce((a, k) => (a[k] = (a[k] || 0) + 1, a), {});
  out.switch1 = w.switchCharacter();
  out.steveInv = w.inventory.items.map((i) => i.defId + 'x' + (i.qty ?? 1));
  out.steveHasLighter = w.inventory.has('lighter');
  out.switch2 = w.switchCharacter();
  const fp = w.interactables.find((i) => i.id === 'fireplace'), de = w.interactables.find((i) => i.id === 'diningEnd');
  out.hasFireplace = !!fp; out.hasDiningEnd = !!de;
  out.claireHasLighter = w.inventory.has('lighter');
  // fireplace: door locked before, open after lighting (as Claire, auto-confirm dialogs)
  g.api.confirm = g.api.confirm; window.confirm = () => true;
  const msgs = []; const om = g.api.message; g.api.message = (m, t) => { msgs.push(m); return om?.call(g.api, m, t); };
  de?.interact(g.api); out.doorBefore = w.flags.has('dining:fire');
  fp?.interact(g.api);
  out.dialogMode = g.mode;
  return out;
});
// accept the confirmation dialog if one was shown
await page.waitForTimeout(500);
const r2 = await page.evaluate(async () => {
  const g = window.__game, w = g.world;
  const btn = [...document.querySelectorAll('button')].find((b) => /да|зажечь|yes/i.test(b.textContent) && b.offsetParent);
  btn?.click();
  await new Promise((res) => setTimeout(res, 500));
  const lit = w.flags.has('dining:fire');
  if (g.mode !== 'playing') g.mode = 'playing';
  w.interactables.find((i) => i.id === 'diningEnd').interact(g.api);
  await new Promise((res) => setTimeout(res, 3000));
  return { lit, finalMode: g.mode, clicked: !!btn };
});
console.log(JSON.stringify(r2));
console.log(JSON.stringify(r));
console.log('errors', errors.length, errors.slice(0, 3).join(' | '));
await page.close(); await browser.close(); process.exit(0);
