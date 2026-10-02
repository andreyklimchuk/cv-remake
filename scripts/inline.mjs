// Post-build: produce dist/play.html — a single self-contained file that runs from file://
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
const dist = new URL('../dist/', import.meta.url);
let html = readFileSync(new URL('index.html', dist), 'utf8');
const assets = readdirSync(new URL('assets/', dist));
const MIME = { glb: 'model/gltf-binary', jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', ogg: 'audio/ogg', mp3: 'audio/mpeg', wav: 'audio/wav', woff2: 'font/woff2', woff: 'font/woff', ttf: 'font/ttf', svg: 'image/svg+xml', json: 'application/json', hdr: 'application/octet-stream', bin: 'application/octet-stream' };
const data = new Map();
for (const f of assets) {
  if (f.endsWith('.js') || f.endsWith('.css')) continue;
  const ext = f.split('.').pop().toLowerCase();
  data.set(f, `data:${MIME[ext] ?? 'application/octet-stream'};base64,` + readFileSync(new URL('assets/' + f, dist)).toString('base64'));
}
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/** asset file references ("x-hash.glb", "./assets/x-hash.glb", url(./x-hash.png)) → data: URIs */
const embed = (code) => {
  for (const [f, uri] of data) code = code.replace(new RegExp(`(["'\x60(])((?:\\.{1,2}/)?(?:assets/)?)${esc(f)}(?=["'\x60)])`, 'g'), (_m, q) => q + uri);
  return code;
};
html = embed(html);
for (const f of assets) {
  if (!f.endsWith('.js') && !f.endsWith('.css')) continue;
  const code = embed(readFileSync(new URL('assets/' + f, dist), 'utf8'));
  if (f.endsWith('.js')) {
    html = html.replace(new RegExp(`<script type="module" crossorigin src="\\./assets/${f.replace('.', '\\.')}"></script>`),
      () => `<script type="module">${code.replace(/<\/script>/g, '<\\/script>')}</script>`);
  } else if (f.endsWith('.css')) {
    html = html.replace(new RegExp(`<link rel="stylesheet" crossorigin href="\\./assets/${f.replace('.', '\\.')}">`), () => `<style>${code}</style>`);
  }
}
writeFileSync(new URL('play.html', dist), html);
console.log('dist/play.html written', (html.length / 1024).toFixed(0), 'KB');
