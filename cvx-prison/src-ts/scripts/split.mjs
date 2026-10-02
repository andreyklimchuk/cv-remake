// Split build into small text files (<1 MiB each) for uploading via the GitHub API.
import fs from 'node:fs'; import path from 'node:path';
const dist = path.resolve('dist'), out = path.resolve('../ghpub/cvx-prison');
fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(path.join(out, 'data'), { recursive: true });
const mime = { glb: 'model/gltf-binary', json: 'application/json', ogg: 'audio/ogg' };
const assets = {};
const walk = (d, rel = '') => { for (const f of fs.readdirSync(d)) { const p = path.join(d, f), r = rel ? rel + '/' + f : f; if (fs.statSync(p).isDirectory()) walk(p, r); else assets[r] = `data:${mime[f.split('.').pop()] ?? 'application/octet-stream'};base64,` + fs.readFileSync(p).toString('base64'); } };
walk(path.join(dist, 'assets'));
const S = JSON.stringify(assets); if (S.includes("'") || S.includes('\\')) throw new Error('unsafe');
const N = 800000; const parts = [];
for (let i = 0; i < S.length; i += N) parts.push(S.slice(i, i + N));
const names = parts.map((p, i) => { const n = `data/part${String(i).padStart(2, '0')}.js`; fs.writeFileSync(path.join(out, n), `(window.__P=window.__P||[]).push('${p}');\n`); return n; });
// movies: base64 parts loaded on demand
const movies = {}; const mdir = path.join(dist, 'movies');
if (fs.existsSync(mdir)) for (const f of fs.readdirSync(mdir)) {
  const name = f.replace(/\.mp4$/, ''); const b = fs.readFileSync(path.join(mdir, f)).toString('base64'); let k = 0;
  for (let i = 0; i < b.length; i += N, k++) fs.writeFileSync(path.join(out, `data/${name}_${String(k).padStart(2, '0')}.js`), `((window.__MV=window.__MV||{})['${name}']=window.__MV['${name}']||[]).push('${b.slice(i, i + N)}');\n`);
  movies[name] = k;
}
const jsName = fs.readdirSync(path.join(dist, 'js'))[0];
fs.writeFileSync(path.join(out, 'game.js'), fs.readFileSync(path.join(dist, 'js', jsName), 'utf8'));
let html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const diag = `<style>html,body{background:#000;color:#ccc;font:16px/1.5 sans-serif}</style>
<script>window.__err=function(m){var d=document.getElementById('boot');if(!d){d=document.createElement('pre');d.id='boot';document.documentElement.appendChild(d)}d.style.cssText='position:fixed;left:2%;top:2%;right:2%;color:#f88;white-space:pre-wrap;z-index:99;font:14px monospace';d.textContent+=m+'\\n'};
window.addEventListener('error',function(e){window.__err('Ошибка: '+(e.message||'')+' '+(e.filename||(e.target&&e.target.src)||'')+(e.lineno?':'+e.lineno:''))},true);
window.addEventListener('load',function(){setTimeout(function(){var a=document.getElementById('app');if(a&&!a.children.length)window.__err('Игра не запустилась (пустой экран). Браузер: '+navigator.userAgent)},4000)});
window.addEventListener('unhandledrejection',function(e){window.__err('Ошибка: '+(e.reason&&e.reason.message||e.reason))});</script>`;
html = html.replace(/<script type="module" crossorigin src="[^"]+"><\/script>/, () => diag + names.map((n) => `<script src="${n}"></script>`).join('\n') + `\n<script>if(!window.__P||window.__P.length!==${names.length})window.__err('Не загрузились файлы ресурсов из папки data/ ('+(window.__P?window.__P.length:0)+' из ${names.length}). Распакуйте архив целиком и откройте index.html из распакованной папки.');else{window.__ASSETS=JSON.parse(window.__P.join(''));delete window.__P;window.__MOVIES=${JSON.stringify(movies)};}</script>\n<script defer src="game.js" onerror="window.__err('Не найден game.js. Распакуйте архив целиком.')"></script>`);
fs.writeFileSync(path.join(out, 'index.html'), html);
console.log(parts.length, 'parts', JSON.stringify(movies));
