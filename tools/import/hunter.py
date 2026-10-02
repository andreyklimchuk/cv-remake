"""Hunter (RE: Revelations Sketchfab rip, 74 clips) -> src/assets/models/enemy_hunter.glb
Keeps only the clips the game uses (renamed), strips horizontal root motion (the AI moves the actor),
and repacks the binary buffer. Usage: python3 tools/import/hunter.py SRC.glb OUT.glb"""
import json, struct, sys, numpy as np
src, out = sys.argv[1], sys.argv[2]
KEEP = {  # game name: source clip suffix
  'idle': 'BA_4', 'idle2': 'BA_1', 'walk': 'BA_16', 'run': 'BA_19', 'jump': 'BA_46', 'land': 'BA_48',
  'leap': 'HT_1', 'swipe': 'BA_81', 'swipe2': 'BA_82', 'slash': 'BA_92', 'lunge': 'BA_83',
  'hurt': 'DM_1', 'hurt2': 'DM_3', 'hurtBig': 'DM_11', 'die': 'DM_41', 'die2': 'DM_45', 'dead': 'DM_123',
}
d = open(src, 'rb').read()
n = struct.unpack('<I', d[12:16])[0]; j = json.loads(d[20:20 + n]); B = d[20 + n + 8:]
ROOT = next(i for i, nd in enumerate(j['nodes']) if nd.get('name', '').startswith('bone0_'))
by = {a['name'].split('em1230_')[-1]: a for a in j['animations']}
anims = []
for k, s in KEEP.items():
  a = by[s]; a['name'] = k; anims.append(a)
j['animations'] = anims
def acc_data(i):
  a = j['accessors'][i]; bv = j['bufferViews'][a['bufferView']]
  c = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4, 'MAT4': 16}[a['type']]
  dt = {5126: np.float32, 5123: np.uint16, 5125: np.uint32, 5121: np.uint8}[a['componentType']]
  sz = np.dtype(dt).itemsize * c
  st = bv.get('byteStride', sz); o = bv.get('byteOffset', 0) + a.get('byteOffset', 0)
  raw = np.frombuffer(B, np.uint8, (a['count'] - 1) * st + sz, o).reshape(-1) if st == sz else None
  if st == sz: return np.frombuffer(B, dt, a['count'] * c, o).reshape(a['count'], c).copy()
  rows = [np.frombuffer(B, dt, c, o + r * st) for r in range(a['count'])]
  return np.array(rows)
# collect referenced accessors
used = []
def use(i):
  if i is not None and i not in used: used.append(i)
for m in j['meshes']:
  for p in m['primitives']:
    for v in p['attributes'].values(): use(v)
    use(p.get('indices'))
for s in j.get('skins', []): use(s.get('inverseBindMatrices'))
override = {}
for a in anims:
  for s in a['samplers']: use(s['input']); use(s['output'])
  for ch in a['channels']:
    if ch['target']['node'] == ROOT and ch['target']['path'] == 'translation':
      o = a['samplers'][ch['sampler']]['output']; v = acc_data(o); v[:, 0] = 0; v[:, 2] = 0; override[o] = v
newB = bytearray(); views = []; remap = {}; accs = []
def push(data, target=None):
  while len(newB) % 4: newB.append(0)
  off = len(newB); newB.extend(data); bv = {'buffer': 0, 'byteOffset': off, 'byteLength': len(data)}
  if target: bv['target'] = target
  views.append(bv); return len(views) - 1
for i in used:
  a = dict(j['accessors'][i]); data = override.get(i, acc_data(i))
  a['bufferView'] = push(data.tobytes()); a.pop('byteOffset', None)
  if i in override: a['min'] = data.min(0).tolist(); a['max'] = data.max(0).tolist()
  remap[i] = len(accs); accs.append(a)
for im in j.get('images', []):
  bv = j['bufferViews'][im['bufferView']]; o = bv.get('byteOffset', 0)
  from PIL import Image; import io
  I = Image.open(io.BytesIO(B[o:o + bv['byteLength']])).convert('RGB'); buf = io.BytesIO(); I.save(buf, 'JPEG', quality=88)
  im['bufferView'] = push(buf.getvalue()); im['mimeType'] = 'image/jpeg'
R = lambda i: remap[i]
for m in j['meshes']:
  for p in m['primitives']:
    p['attributes'] = {k: R(v) for k, v in p['attributes'].items()}
    if 'indices' in p: p['indices'] = R(p['indices'])
for s in j.get('skins', []):
  if 'inverseBindMatrices' in s: s['inverseBindMatrices'] = R(s['inverseBindMatrices'])
for a in anims:
  for s in a['samplers']: s['input'] = R(s['input']); s['output'] = R(s['output'])
j['accessors'] = accs; j['bufferViews'] = views; j['buffers'] = [{'byteLength': len(newB)}]
js = json.dumps(j, separators=(',', ':')).encode()
while len(js) % 4: js += b' '
while len(newB) % 4: newB.append(0)
tot = 12 + 8 + len(js) + 8 + len(newB)
open(out, 'wb').write(struct.pack('<III', 0x46546C67, 2, tot) + struct.pack('<II', len(js), 0x4E4F534A) + js + struct.pack('<II', len(newB), 0x004E4942) + bytes(newB))
print(out, tot // 1024, 'KB', len(anims), 'clips')
