// Prepares GitHub backup batches (used with the GitHub MCP push_files tool, which only accepts text).
// Text files are pushed as-is; binaries (.glb/.blend/.png/.jpg) as base64 chunks under binary/ + manifest.
// Only files changed since the last backup are included (state in .backup-state.json).
// Restore binaries after cloning: node scripts/restore-binaries.mjs
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';
import { join, relative } from 'node:path';
const ROOT = new URL('..', import.meta.url).pathname;
const OWNER = 'andreyklimchuk', REPO = 'cv-remake', BRANCH = 'main';
const msg = process.argv[2] || 'backup';
const MODE = process.argv[3] || 'all'; // text | bin | all
const SKIP = ['node_modules', 'dist', 'shots', '.backup', '.git'];
const BIN = /\.(glb|blend|png|jpg|jpeg|ogg|mp3|wav|zip)$/i;
const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = join(d, f); const r = relative(ROOT, p);
  if (SKIP.some((s) => r === s || r.startsWith(s + '/')) || f === '.backup-state.json' || f.endsWith('.blend1')) return [];
  return statSync(p).isDirectory() ? walk(p) : [r];
});
const statePath = join(ROOT, '.backup-state.json');
const state = existsSync(statePath) ? JSON.parse(readFileSync(statePath, 'utf8')) : {};
const files = walk(ROOT);
const out = []; const newState = {}; const manifest = existsSync(join(ROOT, 'binary-manifest.json')) ? JSON.parse(readFileSync(join(ROOT, 'binary-manifest.json'), 'utf8')) : {};
const CH = 700_000;
for (const f of files) {
  if (f === 'binary-manifest.json') continue;
  const buf = readFileSync(join(ROOT, f)); const h = createHash('sha1').update(buf).digest('hex'); newState[f] = h;
  if (state[f] === h) continue;
  if (MODE === 'text' && BIN.test(f)) { newState[f] = state[f]; continue; }
  if (MODE === 'bin' && !BIN.test(f)) { newState[f] = state[f]; continue; }
  if (BIN.test(f)) {
    const b64 = gzipSync(buf, { level: 9 }).toString('base64'); const parts = Math.ceil(b64.length / CH);
    for (let i = 0; i < parts; i++) out.push({ path: `binary/${f}.b64.${String(i).padStart(3, '0')}`, content: b64.slice(i * CH, (i + 1) * CH) });
    manifest[f] = { parts, sha1: h, bytes: buf.length, gzip: true };
  } else out.push({ path: f, content: buf.toString('utf8') });
}
for (const f of Object.keys(manifest)) if (!files.includes(f)) delete manifest[f];
out.push({ path: 'binary-manifest.json', content: JSON.stringify(manifest, null, 1) });
writeFileSync(join(ROOT, 'binary-manifest.json'), JSON.stringify(manifest, null, 1));
const dir = join(ROOT, '.backup'); rmSync(dir, { recursive: true, force: true }); mkdirSync(dir);
let batch = [], size = 0, n = 0;
const flush = () => { if (!batch.length) return; writeFileSync(join(dir, `batch_${String(n).padStart(3, '0')}.json`), JSON.stringify({ owner: OWNER, repo: REPO, branch: BRANCH, message: `${msg} (${n + 1})`, files: batch })); n++; batch = []; size = 0; };
for (const o of out) { const s = o.content.length + 200; if (size + s > 900_000) flush(); batch.push(o); size += s; }
flush();
for (const k of Object.keys(newState)) if (newState[k] === undefined) delete newState[k];
writeFileSync(join(ROOT, '.backup-state.pending.json'), JSON.stringify(newState));
console.log(`${out.length} files -> ${n} batches in .backup/`);
