// serve web/dist on :5199 and run a script in the page (script body gets `return` value printed as RESULT)
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
import { chromium } from '/data/cvxweb/node_modules/playwright/index.mjs';
const root = '/data/cvx/web/dist';
const types = { js: 'text/javascript', html: 'text/html', glb: 'model/gltf-binary', json: 'application/json', ogg: 'audio/ogg', jpg: 'image/jpeg', png: 'image/png', mp4: 'video/mp4' };
const srv = http.createServer((q, r) => { const p = path.join(root, decodeURIComponent(q.url.split('?')[0])); const f = fs.existsSync(p) && fs.statSync(p).isFile() ? p : null; if (!f) { console.log('404 ' + q.url); r.writeHead(404); r.end(); return; } r.writeHead(200, { 'content-type': types[f.split('.').pop()] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); });
await new Promise((ok) => srv.listen(5199, ok));
const b = await chromium.launch({ executablePath: '/usr/local/bin/chromium', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] });
const pg = await b.newPage({ viewport: { width: 960, height: 720 } });
pg.on('console', (m) => console.log('CONSOLE ' + m.text().slice(0, 4000)));
pg.on('pageerror', (e) => console.log('PAGEERR ' + e.message));
await pg.goto('http://127.0.0.1:5199/index.html');
const src = fs.readFileSync(process.argv[2], 'utf8');
try { const r = await pg.evaluate(`(async()=>{${src}})()`); console.log('RESULT ' + JSON.stringify(r ?? null)); } catch (e) { console.log('ERR ' + e.message.slice(0, 2000)); }
await b.close(); srv.close(); process.exit(0);
