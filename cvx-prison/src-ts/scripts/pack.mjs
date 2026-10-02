// Build a single self-contained HTML (game code + all extracted assets as data URIs). Movies are not included.
import fs from 'node:fs'; import path from 'node:path';
const dist = path.resolve('dist');
let html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const mime = { glb: 'model/gltf-binary', json: 'application/json', ogg: 'audio/ogg', png: 'image/png', jpg: 'image/jpeg' };
const assets = {};
const walk = (d, rel = '') => { for (const f of fs.readdirSync(d)) { const p = path.join(d, f), r = rel ? rel + '/' + f : f; if (fs.statSync(p).isDirectory()) walk(p, r); else { const ext = f.split('.').pop(); assets[r] = `data:${mime[ext] ?? 'application/octet-stream'};base64,` + fs.readFileSync(p).toString('base64'); } } };
walk(path.join(dist, 'assets'));
html = html.replace(/<script type="module" crossorigin src="\.\/(js\/[^"]+)"><\/script>/, (_, src) => {
  const js = fs.readFileSync(path.join(dist, src), 'utf8').replace(/<\/script/g, '<\\/script');
  return `<script>window.__ASSETS=${JSON.stringify(assets)};</script>\n<script type="module">${js}</script>`;
});
const out = path.resolve('play.html');
fs.writeFileSync(out, html);
console.log('wrote', out, (fs.statSync(out).size / 1e6).toFixed(1) + ' MB,', Object.keys(assets).length, 'assets');
