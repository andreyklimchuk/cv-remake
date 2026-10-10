#!/usr/bin/env python3
"""Unpack the converted PS3 assets of the web build (cvx-prison/data/*.js) into the Godot project (godot/assets).

The web build stores every asset as base64 inside data/*.js (see HANDOFF.md). This script:
  * decodes the parts referenced by cvx-prison/index.html into godot/assets/<same path as the web build>;
  * decodes the movies data/mv_NNN_*.js and re-encodes them to Ogg Theora (Godot's VideoStreamTheora) -> assets/movies;
  * trims looped SE samples whose loop end is before the end of the file (Godot loops ogg streams at the file end).
Usage: python3 tools/fetch_assets.py [path/to/cvx-prison]   (default: the parent folder of godot/)
If the folder has no data/, the cvx-prison branch is downloaded from GitHub.
Needs ffmpeg (libtheora + libvorbis) for the movies / trimming.
"""
import base64, glob, json, os, re, shutil, subprocess, sys, tempfile, urllib.request, zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
GD = os.path.dirname(HERE)
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(GD), 'cvx-prison')
OUT = os.path.join(GD, 'assets')

if not os.path.exists(os.path.join(SRC, 'data')):
    tmp = tempfile.mkdtemp()
    url = 'https://codeload.github.com/andreyklimchuk/cv-remake/zip/refs/heads/cvx-prison'
    print('downloading', url)
    zp = os.path.join(tmp, 'b.zip'); urllib.request.urlretrieve(url, zp)
    zipfile.ZipFile(zp).extractall(tmp)
    SRC = os.path.join(tmp, 'cv-remake-cvx-prison', 'cvx-prison')

html = open(os.path.join(SRC, 'index.html'), encoding='utf-8').read()
cur = re.findall(r'<script src="(data/[^"]+)"', html)
G = {}
for f in cur:
    if '/mv_' in f: continue
    t = open(os.path.join(SRC, f), encoding='utf-8').read()
    m = re.search(r"push\(\['([^']*)',(\d+),'(.*)'\]\)", t)
    if m: G.setdefault(m.group(1), {})[int(m.group(2))] = m.group(3)
    else:
        m = re.search(r"push\('(.*)'\)", t)
        if m: G.setdefault('_old', {})[f] = m.group(1)
if len(G) > 1: G.pop('_old', None)
A = {}
for g, parts in G.items(): A.update(json.loads(''.join(parts[k] for k in sorted(parts))))
n = 0
for k, v in A.items():
    p = os.path.join(OUT, k)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    data = base64.b64decode(v.split(',', 1)[1])
    if os.path.exists(p) and os.path.getsize(p) == len(data): continue
    open(p, 'wb').write(data); n += 1
print('assets:', len(A), 'written:', n)
# assets converted only for the Godot port (not in the web build): tools/extra_assets/<path under assets>.b64
# large files are split into <path>.b64.000, .001, ... (concatenated); payload may be gzip-compressed
import gzip
EX = {}
for b in glob.glob(os.path.join(HERE, 'extra_assets', '**', '*.b64*'), recursive=True):
    m = re.match(r'(.*)\.b64(?:\.(\d{3}))?$', os.path.relpath(b, os.path.join(HERE, 'extra_assets')))
    if m: EX.setdefault(m.group(1), []).append((m.group(2) or '', b))
for rel, parts in sorted(EX.items()):
    p = os.path.join(OUT, rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    data = base64.b64decode(''.join(open(b).read().strip() for _, b in sorted(parts)))
    if data[:2] == b'\x1f\x8b': data = gzip.decompress(data)
    open(p, 'wb').write(data); print('extra', rel)
# extra effect textures (system textures, tools/conv/syseff.py): add their counts to effects/index.json
ix = os.path.join(OUT, 'effects', 'index.json')
if os.path.exists(ix):
    c = json.load(open(ix))
    for b in glob.glob(os.path.join(HERE, 'extra_assets', 'effects', 'ef_*_*.png.b64')):
        m = re.match(r'ef_(\d+)_(\d+)\.png', os.path.basename(b))
        c[str(int(m.group(1)))] = max(int(c.get(str(int(m.group(1))), 0)), int(m.group(2)) + 1)
    json.dump(dict(sorted(c.items(), key=lambda x: int(x[0]))), open(ix, 'w'))
# zombie glbs of the web build pair lower/upper clips off by one -> re-pair (idempotent)
sys.path.insert(0, HERE); import fix_zombie_clips
for p in sorted(glob.glob(os.path.join(OUT, 'enemies', 'en01a*.glb'))):
    if fix_zombie_clips.fix(p): print('zfix', os.path.relpath(p, OUT))
# room motions (rmt) the web build's zombie glbs lack (tools/room_clips, see add_room_clips.py) -> merged in (idempotent)
import add_room_clips
for p in sorted(glob.glob(os.path.join(OUT, 'enemies', 'en01a*.glb'))):
    k = add_room_clips.merge(p)
    if k: print('room clips', os.path.relpath(p, OUT), k)
# Claire's motion banks the web build lacks (tools/room_clips/claire.json: pl00w09 M-100P -> clips pNN = slot 100+NN)
k = add_room_clips.merge(os.path.join(OUT, 'chars', 'claire.glb'))
if k: print('player clips', k)
# material alpha of Ninja BLEND materials the web glbs drop (tools/mat_alpha.json) -> baseColorFactor (idempotent)
import fix_mat_alpha
for r in fix_mat_alpha.run(OUT): print('mat alpha', r)

have_ff = shutil.which('ffmpeg') is not None
# movies
os.makedirs(os.path.join(OUT, 'movies'), exist_ok=True)
names = sorted({re.sub(r'_\d+\.js$', '', os.path.basename(f)) for f in glob.glob(os.path.join(SRC, 'data', 'mv_*_*.js'))})
for name in names:
    ogv = os.path.join(OUT, 'movies', name + '.ogv')
    if os.path.exists(ogv): continue
    parts = sorted(glob.glob(os.path.join(SRC, 'data', name + '_*.js')))
    b = b''.join(base64.b64decode(re.search(r"push\('(.*)'\)", open(f, encoding='utf-8').read()).group(1)) for f in parts)
    mp4 = os.path.join(tempfile.gettempdir(), name + '.mp4'); open(mp4, 'wb').write(b)
    if not have_ff: print('ffmpeg missing: movie', name, 'left as', mp4); continue
    print('encoding', name)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', mp4, '-c:v', 'libtheora', '-q:v', '8', '-c:a', 'libvorbis', '-q:a', '6', ogv], check=True)

# looped SE samples: cut at the loop end (the loop start becomes AudioStreamOggVorbis.loop_offset)
if have_ff:
    done = set()
    for bj in glob.glob(os.path.join(OUT, 'audio', 'se', '*.json')):
        bank = json.load(open(bj, encoding='utf-8'))
        for s in bank['samples']:
            lp = s.get('loop')
            if not lp or s['f'] in done or lp[1] >= s['n'] - 16: continue
            done.add(s['f'])
            p = os.path.join(OUT, 'audio', 'se', s['f'] + '.ogg'); q = p + '.tmp.ogg'
            if not os.path.exists(p): continue
            subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', p, '-af', f"atrim=end_sample={lp[1]}", '-c:a', 'libvorbis', '-q:a', '6', q], check=True)
            os.replace(q, p)
            print('trimmed', s['f'])
print('done ->', OUT)
