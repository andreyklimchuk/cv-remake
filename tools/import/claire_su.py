"""Convert the Sketchfab 'Claire Redfield (Survival Unit)' GLB into the game's character format.

- keeps only the Claire mesh (drops the 3 weapons and all animations)
- bones renamed to the game rig names (hips/spine/neck/head/lUpperArm/.../pony0..3); helper bones
  (Root, Bip001, IK targets, gun bones) dropped and their weights moved to a game bone
- skeleton re-expressed as translation-only joints in the bind pose (Y-up, metres, faces +Z)
Usage: python3 tools/import/claire_su.py <Sclaire.glb> <out.glb>
"""
import json, struct, sys, io
import numpy as np

src, dst = sys.argv[1], sys.argv[2]
f = open(src, 'rb').read()
l = struct.unpack('<I', f[12:16])[0]; j = json.loads(f[20:20 + l]); bin_ = f[20 + l + 8:]

def acc(i):
    a = j['accessors'][i]; bv = j['bufferViews'][a['bufferView']]
    n = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4, 'MAT4': 16}[a['type']]
    dt = {5126: np.float32, 5123: np.uint16, 5121: np.uint8, 5125: np.uint32}[a['componentType']]
    off = bv.get('byteOffset', 0) + a.get('byteOffset', 0)
    return np.frombuffer(bin_, dt, a['count'] * n, off).reshape(a['count'], n).copy()

def img(i):
    bv = j['bufferViews'][j['images'][i]['bufferView']]; o = bv.get('byteOffset', 0)
    return bin_[o:o + bv['byteLength']]

nodes = j['nodes']; par = {}
for i, n in enumerate(nodes):
    for c in n.get('children', []): par[c] = i
def qm(r):
    x, y, z, w = r
    return np.array([[1-2*(y*y+z*z), 2*(x*y-z*w), 2*(x*z+y*w)], [2*(x*y+z*w), 1-2*(x*x+z*z), 2*(y*z-x*w)], [2*(x*z-y*w), 2*(y*z+x*w), 1-2*(x*x+y*y)]])
def local(n):
    t = np.array(n.get('translation', [0, 0, 0])); s = np.array(n.get('scale', [1, 1, 1]))
    M = np.eye(4); M[:3, :3] = qm(n.get('rotation', [0, 0, 0, 1])) * s; M[:3, 3] = t; return M
def world(i):
    M = local(nodes[i])
    while i in par: i = par[i]; M = local(nodes[i]) @ M
    return M

mi = next(i for i, n in enumerate(nodes) if n.get('name', '').startswith('Char_CLAIRE_L01') and 'mesh' in n)
mesh = j['meshes'][nodes[mi]['mesh']]; prim = mesh['primitives'][0]; skin = j['skins'][nodes[mi]['skin']]
J = skin['joints']; jn = [nodes[x]['name'] for x in J]

REN = {'Pelvis': 'hips', 'Spine': 'spine', 'Spine1': 'chest', 'Neck': 'neck', 'Head': 'head',
       'Thigh_L': 'lThigh', 'Calf_L': 'lShin', 'Foot_L': 'lFoot', 'Toe0_L': 'lToe',
       'Thigh_R': 'rThigh', 'Calf_R': 'rShin', 'Foot_R': 'rFoot', 'Toe0_R': 'rToe',
       'Clavicle_L': 'lClav', 'UpperArm_L': 'lUpperArm', 'UpArmTwist_L': 'lUpperTwist', 'Forearm_L': 'lForearm', 'ForeTwist_L': 'lForeTwist', 'Hand_L': 'lHand',
       'Clavicle_R': 'rClav', 'UpperArm_R': 'rUpperArm', 'UpArmTwist_R': 'rUpperTwist', 'Forearm_R': 'rForearm', 'ForeTwist_R': 'rForeTwist', 'Hand_R': 'rHand',
       'Bone_Hair_01': 'pony0', 'Bone_Hair_02': 'pony1', 'Bone_Hair_03': 'pony2', 'Bone_Hair_04': 'pony3'}
for s, S in (('L', 'l'), ('R', 'r')):
    for a in range(3):
        for b in range(3):
            REN[f'Finger{a}{"" if b == 0 else b}_{s}'.replace(f'Finger{a}0', f'Finger{a}')] = f'{S}F{a}{b}'
# helper bones -> weights moved to
MERGE = {'Root': 'hips', 'Bip001': 'hips', 'Bone_Gun_01': 'rThigh', 'Bone_Gun_02': 'rThigh',
         'ArmIK_L': 'hips', 'ArmIK_R': 'hips', 'LegIK_L': 'hips', 'LegIK_R': 'hips'}
for k in list(REN):
    if k not in jn: raise SystemExit('missing bone ' + k)

# joint world positions in bind pose (node default pose == bind pose for this asset; verified by skinning)
pos = {jn[k]: world(J[k])[:3, 3] for k in range(len(J))}
keep = [n for n in jn if n in REN]                       # parent-first order (skin order is hierarchical)
PARENT_OVERRIDE = {}
def gparent(n):
    if n in PARENT_OVERRIDE: return PARENT_OVERRIDE[n]
    i = nodes.index(next(x for x in nodes if x.get('name') == n))
    while i in par:
        i = par[i]; nm = nodes[i].get('name')
        if nm in REN: return nm
    return None

P = acc(prim['attributes']['POSITION']); N = acc(prim['attributes']['NORMAL']); UV = acc(prim['attributes']['TEXCOORD_0'])
JI = acc(prim['attributes']['JOINTS_0']).astype(np.int64); W = acc(prim['attributes']['WEIGHTS_0']).astype(np.float32)
IDX = acc(prim['indices']).reshape(-1).astype(np.uint32)
# verify rest == bind
IBM = acc(skin['inverseBindMatrices']).reshape(-1, 4, 4).transpose(0, 2, 1)
S = np.array([world(J[k]) @ IBM[k] for k in range(len(J))])
V = np.zeros_like(P)
for c in range(4):
    M = S[JI[:, c]]; V += W[:, c:c + 1] * (np.einsum('nij,nj->ni', M[:, :3, :3], P) + M[:, :3, 3])
err = np.abs(V - P).max(); print('bind error', err)
assert err < 1e-3
# the holstered pistol baked into the mesh (Bone_Gun_02) is removed: the game draws its own weapons
gi = jn.index('Bone_Gun_02'); gw = (W * (JI == gi)).sum(1)
tri = IDX.reshape(-1, 3); IDX = tri[~(gw[tri] > 0.5).all(1)].reshape(-1)
print('removed pistol tris', len(tri) - len(IDX) // 3)
remap = np.array([keep.index(n) if n in REN else keep.index(next(k for k in keep if REN[k] == MERGE[n])) for n in jn])
JI2 = remap[JI]
# merge duplicate joint slots
W2 = np.zeros_like(W); J2 = np.zeros_like(JI2)
for v in range(len(P)):
    d = {}
    for c in range(4):
        if W[v, c] > 0: d[JI2[v, c]] = d.get(JI2[v, c], 0) + W[v, c]
    it = sorted(d.items(), key=lambda x: -x[1])[:4]; s = sum(w for _, w in it) or 1
    for c, (b, w) in enumerate(it): J2[v, c] = b; W2[v, c] = w / s
names = [REN[n] for n in keep]

out = {'asset': {'version': '2.0', 'generator': 'cv-remake claire_su.py'}, 'scene': 0, 'scenes': [{'nodes': []}],
       'nodes': [], 'meshes': [], 'skins': [], 'accessors': [], 'bufferViews': [], 'buffers': [],
       'materials': [], 'textures': [], 'images': [], 'samplers': [{'magFilter': 9729, 'minFilter': 9987, 'wrapS': 10497, 'wrapT': 10497}]}
blob = bytearray()
def add_view(b, target=None):
    while len(blob) % 4: blob.append(0)
    o = len(blob); blob.extend(b)
    v = {'buffer': 0, 'byteOffset': o, 'byteLength': len(b)}
    if target: v['target'] = target
    out['bufferViews'].append(v); return len(out['bufferViews']) - 1
def add_acc(arr, ctype, typ, target=None, minmax=False):
    v = add_view(arr.tobytes(), target)
    a = {'bufferView': v, 'componentType': ctype, 'count': int(arr.shape[0]), 'type': typ}
    if minmax: a['min'] = arr.min(0).tolist(); a['max'] = arr.max(0).tolist()
    out['accessors'].append(a); return len(out['accessors']) - 1

# bone nodes
for k, n in enumerate(keep):
    p = gparent(n); t = pos[n] - (pos[p] if p else 0)
    out['nodes'].append({'name': REN[n], 'translation': [float(x) for x in t]})
for k, n in enumerate(keep):
    ch = [i for i, m in enumerate(keep) if gparent(m) == n]
    if ch: out['nodes'][k]['children'] = ch
ibm = np.array([np.linalg.inv(np.block([[np.eye(3), pos[n][:, None]], [np.zeros((1, 3)), np.ones((1, 1))]])).T.reshape(-1) for n in keep], np.float32)
# images: D (opaque) as JPEG-free PNG passthrough, N, ORM (R=AO, G=rough, B=metal)
from PIL import Image
def png(i, keep_alpha=False):
    im = Image.open(io.BytesIO(img(i))); im = im.convert('RGBA' if keep_alpha else 'RGB')
    b = io.BytesIO(); im.save(b, 'PNG', optimize=True); return b.getvalue()
mat = j['materials'][prim['material']]; pb = mat['pbrMetallicRoughness']
src_tex = lambda t: j['textures'][t['index']]['source']
for nm, si in (('claire_su_D', src_tex(pb['baseColorTexture'])), ('claire_su_N', src_tex(mat['normalTexture'])), ('claire_su_ORM', src_tex(pb['metallicRoughnessTexture']))):
    out['images'].append({'name': nm, 'mimeType': 'image/png', 'bufferView': add_view(png(si))})
    out['textures'].append({'sampler': 0, 'source': len(out['images']) - 1})
out['materials'].append({'name': 'claire_su', 'doubleSided': True,
    'pbrMetallicRoughness': {'baseColorTexture': {'index': 0}, 'metallicRoughnessTexture': {'index': 2}, 'metallicFactor': 1, 'roughnessFactor': 1},
    'normalTexture': {'index': 1}, 'occlusionTexture': {'index': 2}})
attrs = {'POSITION': add_acc(P.astype(np.float32), 5126, 'VEC3', 34962, True),
         'NORMAL': add_acc(N.astype(np.float32), 5126, 'VEC3', 34962),
         'TEXCOORD_0': add_acc(UV.astype(np.float32), 5126, 'VEC2', 34962),
         'JOINTS_0': add_acc(J2.astype(np.uint16), 5123, 'VEC4', 34962),
         'WEIGHTS_0': add_acc(W2.astype(np.float32), 5126, 'VEC4', 34962)}
ind = add_acc(IDX, 5125, 'SCALAR', 34963)
out['meshes'].append({'name': 'claire_outfit', 'primitives': [{'attributes': attrs, 'indices': ind, 'material': 0}]})
out['skins'].append({'name': 'claire_rig', 'joints': list(range(len(keep))), 'inverseBindMatrices': add_acc(ibm, 5126, 'MAT4')})
mesh_node = len(out['nodes']); out['nodes'].append({'name': 'claire_outfit', 'mesh': 0, 'skin': 0})
rig = len(out['nodes']); out['nodes'].append({'name': 'claire_rig', 'children': [0, mesh_node]})
out['scenes'][0]['nodes'] = [rig]
while len(blob) % 4: blob.append(0)
out['buffers'].append({'byteLength': len(blob)})
js = json.dumps(out, separators=(',', ':')).encode()
while len(js) % 4: js += b' '
glb = struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(js) + 8 + len(blob)) + struct.pack('<II', len(js), 0x4E4F534A) + js + struct.pack('<II', len(blob), 0x004E4942) + bytes(blob)
open(dst, 'wb').write(glb)
print('bones', len(keep), names[:8], '... verts', len(P), 'tris', len(IDX) // 3, 'size', len(glb))
