// Rebuilds binary assets (GLB, .blend, textures) from the base64 chunks in binary/ (see scripts/backup.mjs).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { gunzipSync } from 'node:zlib';
const ROOT = new URL('..', import.meta.url).pathname;
const man = JSON.parse(readFileSync(join(ROOT, 'binary-manifest.json'), 'utf8'));
for (const [f, { parts, gzip }] of Object.entries(man)) {
  let b64 = '';
  for (let i = 0; i < parts; i++) b64 += readFileSync(join(ROOT, 'binary', `${f}.b64.${String(i).padStart(3, '0')}`), 'utf8');
  mkdirSync(dirname(join(ROOT, f)), { recursive: true }); const raw = Buffer.from(b64, 'base64'); writeFileSync(join(ROOT, f), gzip ? gunzipSync(raw) : raw);
  console.log('restored', f);
}
