// Post-build: produce dist/play.html — a single self-contained file that runs from file://
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
const dist = new URL('../dist/', import.meta.url);
let html = readFileSync(new URL('index.html', dist), 'utf8');
const assets = readdirSync(new URL('assets/', dist));
for (const f of assets) {
  const code = readFileSync(new URL('assets/' + f, dist), 'utf8');
  if (f.endsWith('.js')) {
    html = html.replace(new RegExp(`<script type="module" crossorigin src="\\./assets/${f.replace('.', '\\.')}"></script>`),
      () => `<script type="module">${code.replace(/<\/script>/g, '<\\/script>')}</script>`);
  } else if (f.endsWith('.css')) {
    html = html.replace(new RegExp(`<link rel="stylesheet" crossorigin href="\\./assets/${f.replace('.', '\\.')}">`), () => `<style>${code}</style>`);
  }
}
writeFileSync(new URL('play.html', dist), html);
console.log('dist/play.html written', (html.length / 1024).toFixed(0), 'KB');
