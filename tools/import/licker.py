"""Licker (RE6 em3000 via Source/Sketchfab, ValveBiped rig, 254 bones) -> src/assets/models/enemy_licker.glb
Pure glTF edit (Blender's importer explodes this skin): skin reduced to the game bones (weights of every other joint
merged into its nearest kept ancestor), bones renamed, spec-gloss materials -> metal-rough, textures -> JPEG 1024,
model scaled to metres with the floor at y=0. Usage: python3 tools/import/licker.py SRC.glb OUT.glb"""
import json, struct, sys, io, numpy as np
from PIL import Image
src, out = sys.argv[1], sys.argv[2]
S = 0.022            # cm-ish -> m (body ~1.4 m long, head ~1 m high)
FLOOR = 23.03        # source floor height (bind pose)
MAP = {'COG': 'hips', 'ValveBiped.Bip01_Pelvis': 'pelvis', 'ValveBiped.Bip01_Spine1': 'spine', 'ValveBiped.Bip01_Spine2': 'spine2',
       'ValveBiped.Bip01_Spine4': 'chest', 'ValveBiped.Bip01_Neck': 'neck', 'ValveBiped.Bip01_Head1': 'head', 'Jaw': 'jaw',
       'Tongue_base': 'tongue', 'Tongue35': 'tongueTip'}
for s, p in (('R', 'r'), ('L', 'l')):
  for a, b in (('Clavicle', 'Clav'), ('UpperArm', 'UpperArm'), ('Forearm', 'Forearm'), ('Hand', 'Hand'), ('Thigh', 'Thigh'), ('Calf', 'Shin'), ('Foot', 'Foot'), ('Toe0', 'Toe')):
    MAP[f'ValveBiped.Bip01_{s}_{a}'] = p + b
d = open(src, 'rb').read()
n = struct.unpack('<I', d[12:16])[0]; j = json.loads(d[20:20 + n]); B = d[20 + n + 8:]
def base(nm): return nm.rsplit('_', 1)[0] if nm.rsplit('_', 1)[-1].isdigit() else nm
def get(i):
  a = j['accessors'][i]; bv = j['bufferViews'][a['bufferView']]
  c = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4, 'MAT4': 16}[a['type']]
  dt = {5126: np.float32, 5123: np.uint16, 5125: np.uint32, 5121: np.uint8}[a['componentType']]
  st = bv.get('byteStride'); o = bv.get('byteOffset', 0) + a.get('byteOffset', 0); sz = np.dtype(dt).itemsize * c
  if not st or st == sz: return np.frombuffer(B, dt, a['count'] * c, o).reshape(a['count'], c).copy()
  return np.array([np.frombuffer(B, dt, c, o + r * st) for r in range(a['count'])])
parent = {}
for i, nd in enumerate(j['nodes']):
  for c in nd.get('children', []): parent[c] = i
skin = j['skins'][0]; joints = skin['joints']; ibm = get(skin['inverseBindMatrices'])
keep = [k for k, ni in enumerate(joints) if base(j['nodes'][ni]['name']) in MAP]
newidx = {k: e for e, k in enumerate(keep)}
def tgt(k):
  ni = joints[k]
  while True:
    if joints.index(ni) in newidx if ni in joints else False: return newidx[joints.index(ni)]
    if ni not in parent: return newidx[next(k2 for k2 in keep if MAP[base(j['nodes'][joints[k2]]['name'])] == 'hips')]
    ni = parent[ni]
remap = np.array([tgt(k) for k in range(len(joints))])
for k in keep: j['nodes'][joints[k]]['name'] = MAP[base(j['nodes'][joints[k]]['name'])]
print('kept', [j['nodes'][joints[k]]['name'] for k in keep])
# ---------------------------------------------------------------- rebuild buffers
newB = bytearray(); views = []; accs = []
def push(data, target=None):
  while len(newB) % 4: newB.append(0)
  off = len(newB); newB.extend(data); bv = {'buffer': 0, 'byteOffset': off, 'byteLength': len(data)}
  if target: bv['target'] = target
  views.append(bv); return len(views) - 1
def add(arr, typ, ctype, target=None, mm=False):
  a = {'bufferView': push(arr.tobytes(), target), 'componentType': ctype, 'count': len(arr), 'type': typ}
  if mm: a['min'] = arr.min(0).tolist(); a['max'] = arr.max(0).tolist()
  accs.append(a); return len(accs) - 1
for m in j['meshes']:
  for p in m['primitives']:
    at = p['attributes']; J = get(at['JOINTS_0']).astype(np.int64); W = get(at['WEIGHTS_0']).astype(np.float32)
    J2 = remap[J]; W2 = np.zeros_like(W); Jn = np.zeros_like(J2)
    for v in range(len(J2)):
      acc = {}
      for c in range(4):
        if W[v, c] > 0: acc[J2[v, c]] = acc.get(J2[v, c], 0) + W[v, c]
      it = sorted(acc.items(), key=lambda x: -x[1])[:4]; s = sum(w for _, w in it) or 1
      for c, (jj, w) in enumerate(it): Jn[v, c] = jj; W2[v, c] = w / s
    na = {'POSITION': add(get(at['POSITION']).astype(np.float32), 'VEC3', 5126, 34962, True),
          'NORMAL': add(get(at['NORMAL']).astype(np.float32), 'VEC3', 5126, 34962),
          'TEXCOORD_0': add(get(at['TEXCOORD_0']).astype(np.float32), 'VEC2', 5126, 34962),
          'JOINTS_0': add(Jn.astype(np.uint16), 'VEC4', 5123, 34962), 'WEIGHTS_0': add(W2, 'VEC4', 5126, 34962)}
    p['attributes'] = na
    p['indices'] = add(get(p['indices']).astype(np.uint32).reshape(-1), 'SCALAR', 5125, 34963)
skin['joints'] = [joints[k] for k in keep]
skin['inverseBindMatrices'] = add(ibm[keep].astype(np.float32), 'MAT4', 5126)
# materials: spec-gloss -> metal-rough (diffuse + normal only)
used_img = []
def img(ti):
  s = j['textures'][ti]['source']
  if s not in used_img: used_img.append(s)
  return used_img.index(s)
for mt in j['materials']:
  sg = mt.pop('extensions')['KHR_materials_pbrSpecularGlossiness']
  mt['pbrMetallicRoughness'] = {'baseColorTexture': {'index': img(sg['diffuseTexture']['index'])}, 'metallicFactor': 0, 'roughnessFactor': 0.42}
  mt['normalTexture'] = {'index': img(mt['normalTexture']['index'])}
  mt['doubleSided'] = False
newimgs = []
for s in used_img:
  im = j['images'][s]; bv = j['bufferViews'][im['bufferView']]; o = bv.get('byteOffset', 0)
  I = Image.open(io.BytesIO(B[o:o + bv['byteLength']])).convert('RGB')
  if I.width > 1024: I = I.resize((1024, I.height * 1024 // I.width), Image.LANCZOS)
  buf = io.BytesIO(); I.save(buf, 'JPEG', quality=88)
  newimgs.append({'bufferView': push(buf.getvalue()), 'mimeType': 'image/jpeg'})
j['images'] = newimgs; j['textures'] = [{'sampler': 0, 'source': i} for i in range(len(newimgs))]
j.pop('extensionsUsed', None); j.pop('extensionsRequired', None)
# metres, floor at 0
top = j['scenes'][0]['nodes']
j['nodes'].append({'name': 'licker', 'scale': [S, S, S], 'translation': [0, -FLOOR * S, 0], 'children': top})
j['scenes'][0]['nodes'] = [len(j['nodes']) - 1]
j['accessors'] = accs; j['bufferViews'] = views; j['buffers'] = [{'byteLength': len(newB)}]
js = json.dumps(j, separators=(',', ':')).encode()
while len(js) % 4: js += b' '
while len(newB) % 4: newB.append(0)
tot = 12 + 8 + len(js) + 8 + len(newB)
open(out, 'wb').write(struct.pack('<III', 0x46546C67, 2, tot) + struct.pack('<II', len(js), 0x4E4F534A) + js + struct.pack('<II', len(newB), 0x004E4942) + bytes(newB))
print(out, tot // 1024, 'KB')
