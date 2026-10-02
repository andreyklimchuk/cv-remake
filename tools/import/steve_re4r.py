"""Steve from the RE4 Remake mod 'Steve Burnside Costume' (Mralexmods; Steve from Darkside Chronicles ported to
RE Engine) -> game character GLB, keeping the HEAD (face, eyes, hair, blink/pain shape keys) of the old Steve.

- RE Engine .mesh/.tex are read with NSACloud's RE-Mesh-Editor parser modules (GPL, pure python, no Blender):
  pass its repo dir as --remesh. Body = cha000_00.mesh (outfit 'BootsLeather_Mat' + bare-arm 'Skin_Mat'), LOD0.
- RE bones -> game rig (hips/spine/chest/neck/head/l,rClav/UpperArm/Forearm/Hand/F{finger}{seg}/Thigh/Shin/Foot/Toe);
  every other bone (twist / helper / chain) gives its weights to the nearest mapped ancestor; 4 strongest weights kept.
- whole body scaled so the RE Head joint lands on the old Steve head joint; the old head (y >= NECK_CUT, from
  steve.glb) is moved onto the new head joint, the RE neck skin under it is removed (the jacket collar hides the seam).
- textures: albedo RGB; NRMR = DirectX normal (green flipped for glTF) + roughness in A; ATOC.B = occlusion
  -> ORM (R = AO, G = roughness, B = 0).
Usage: python3 tools/import/steve_re4r.py --remesh <RE-Mesh-Editor dir> <mod natives dir> <dds dir> <old steve.glb> <out.glb>
  (dds dir: .tex converted with RE-Mesh-Editor modules.tex.re_tex_utils.convertTexFileToDDS)
"""
import sys, json, struct, io, os
import numpy as np
from PIL import Image
a = sys.argv[1:]
assert a[0] == '--remesh'; sys.path.insert(0, a[1]); natives, ddsdir, oldglb, dst = a[2:6]
from modules.mesh.file_re_mesh import readREMesh
from modules.mesh.re_mesh_parse import ParsedREMesh

# ---------------------------------------------------------------- RE body
mp = os.path.join(natives, 'STM/_Chainsaw/Character/ch/cha0/cha000/00/cha000_00.mesh.221108797')
rm = readREMesh(mp, 0); pm = ParsedREMesh(); pm.ParseREMesh(rm)
bl = pm.skeleton.boneList; wnames = pm.skeleton.weightedBones
byname = {b.boneName: b for b in bl}
wpos = {b.boneName: np.array(b.worldMatrix.matrix)[3][:3] for b in bl}
par = {b.boneName: (bl[b.parentIndex].boneName if b.parentIndex >= 0 else None) for b in bl}
MAP = {'Hip': 'hips', 'Spine_0': 'spine', 'Spine_2': 'chest', 'Neck_0': 'neck', 'Head': 'head'}
for S, s in (('L', 'l'), ('R', 'r')):
    MAP.update({f'{S}_Shoulder': f'{s}Clav', f'{S}_UpperArm': f'{s}UpperArm', f'{S}_Forearm': f'{s}Forearm', f'{S}_Hand': f'{s}Hand',
                f'{S}_Thigh': f'{s}Thigh', f'{S}_Shin': f'{s}Shin', f'{S}_Foot': f'{s}Foot', f'{S}_Toe': f'{s}Toe'})
    for fi, fn in enumerate(['Thumb', 'IndexF', 'MiddleF', 'RingF', 'PinkyF']):
        for k in range(3): MAP[f'{S}_{fn}{k + 1}'] = f'{s}F{fi}{k}'
def target(n):
    while n is not None and n not in MAP: n = par[n]
    return MAP[n] if n else 'hips'
def gparent(n):  # game parent of a mapped RE bone
    p = par[n]
    while p is not None and p not in MAP: p = par[p]
    return p
SC = None
# ---------------------------------------------------------------- old Steve GLB
f = open(oldglb, 'rb').read(); l = struct.unpack('<I', f[12:16])[0]; oj = json.loads(f[20:20 + l]); ob = f[20 + l + 8:]
DT = {5126: np.float32, 5123: np.uint16, 5121: np.uint8, 5125: np.uint32}
def oview(bvi, off, dt, cnt):
    bv = oj['bufferViews'][bvi]; return np.frombuffer(ob, dt, cnt, bv.get('byteOffset', 0) + off).copy()
def oacc(i):
    ac = oj['accessors'][i]
    n = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4, 'MAT4': 16}[ac['type']]
    dt = DT[ac['componentType']]
    if 'bufferView' in ac:
        bv = oj['bufferViews'][ac['bufferView']]
        assert not bv.get('byteStride') or bv['byteStride'] == n * np.dtype(dt).itemsize
        r = oview(ac['bufferView'], ac.get('byteOffset', 0), dt, ac['count'] * n).reshape(ac['count'], n)
    else: r = np.zeros((ac['count'], n), dt)
    if 'sparse' in ac:
        sp = ac['sparse']; c = sp['count']
        idx = oview(sp['indices']['bufferView'], sp['indices'].get('byteOffset', 0), DT[sp['indices']['componentType']], c).astype(np.int64)
        r[idx] = oview(sp['values']['bufferView'], sp['values'].get('byteOffset', 0), dt, c * n).reshape(c, n)
    if ac.get('normalized'): r = r / float(np.iinfo(dt).max)
    return r
def oimg(i):
    bv = oj['bufferViews'][oj['images'][i]['bufferView']]; o = bv.get('byteOffset', 0); return ob[o:o + bv['byteLength']], oj['images'][i]['mimeType']
osk = oj['skins'][0]; ojn = [oj['nodes'][i]['name'] for i in osk['joints']]
oibm = oacc(osk['inverseBindMatrices']).reshape(-1, 4, 4).transpose(0, 2, 1)
opos = {n: np.linalg.inv(oibm[k])[:3, 3] for k, n in enumerate(ojn)}
SC = opos['head'][1] / wpos['Head'][1]
D = wpos['Head'] * SC - opos['head']          # old head -> new head joint
print('scale', round(SC, 4), 'head shift', D.round(4))

# game joints
gnames = [MAP[n] for n in MAP if n in byname]
gp = {MAP[n]: wpos[n] * SC for n in MAP if n in byname}
gpar = {MAP[n]: (MAP[gparent(n)] if gparent(n) else None) for n in MAP if n in byname}
for e in ('lEye', 'rEye'): gnames.append(e); gp[e] = opos[e] + D; gpar[e] = 'head'
gi = {n: i for i, n in enumerate(gnames)}

def collapse(JI, W, names_of):
    """JI/W (n,k) with bone names via names_of(index) -> top-4 game-bone weights"""
    n = len(JI); J2 = np.zeros((n, 4), np.uint16); W2 = np.zeros((n, 4), np.float32)
    for v in range(n):
        d = {}
        for c in range(JI.shape[1]):
            if W[v, c] > 0: g = gi[names_of(JI[v, c])]; d[g] = d.get(g, 0) + W[v, c]
        it = sorted(d.items(), key=lambda x: -x[1])[:4]; s = sum(w for _, w in it) or 1
        for c, (b, w) in enumerate(it): J2[v, c] = b; W2[v, c] = w / s
    return J2, W2

parts = []   # dicts: name, P, N, UV, J, W, IDX, mat, extra attrs, targets
NECK_CUT = 1.455
for vg in pm.mainMeshLODList[0].visconGroupList:
    for sm in vg.subMeshList:
        if len(sm.vertexPosList) < 10: continue
        mat = pm.materialNameList[sm.materialIndex]
        P = np.asarray(sm.vertexPosList, np.float64) * SC; N = np.asarray(sm.normalList, np.float64)
        N /= np.linalg.norm(N, axis=1, keepdims=True) + 1e-9
        UV = np.asarray(sm.uvList, np.float32); F = np.asarray(sm.faceList, np.int64)
        J, W = collapse(np.asarray(sm.weightIndicesList), np.asarray(sm.weightList), lambda i: target(wnames[i]))
        # winding: glTF wants CCW (geometric normal along the vertex normals)
        gn = np.cross(P[F[:, 1]] - P[F[:, 0]], P[F[:, 2]] - P[F[:, 0]]); sgn = np.sign((gn * N[F].sum(1)).sum(1)).mean()
        if sgn < 0: F = F[:, [0, 2, 1]]
        if mat == 'Skin_Mat':   # drop the neck under the old head
            bad = (P[:, 1] > NECK_CUT) & (np.abs(P[:, 0]) < 0.105)
            F = F[~bad[F].any(1)]
        parts.append(dict(name='steve_body_re' if mat == 'Skin_Mat' else 'steve_outfit', P=P, N=N, UV=UV, J=J, W=W, IDX=F, mat=mat))
        print(mat, 'verts', len(P), 'tris', len(F), 'winding flipped' if sgn < 0 else '')

# old head / eyes / hair
OREN = {'spine': 'chest', 'hips': 'chest'}
onames = lambda i: OREN.get(ojn[i], ojn[i]) if OREN.get(ojn[i], ojn[i]) in gi else ('head' if ojn[i] in ('lEye', 'rEye') else 'neck')
node_of_mesh = {n['mesh']: n['name'] for n in oj['nodes'] if 'mesh' in n}
for mi, m in enumerate(oj['meshes']):
    nm = node_of_mesh[mi]
    if nm == 'steve_outfit': continue
    pr = m['primitives'][0]; at = pr['attributes']
    P = oacc(at['POSITION']).astype(np.float64); N = oacc(at['NORMAL']).astype(np.float64); UV = oacc(at['TEXCOORD_0']).astype(np.float32)
    JI = oacc(at['JOINTS_0']).astype(np.int64); W = oacc(at['WEIGHTS_0']).astype(np.float64)
    F = oacc(pr['indices']).reshape(-1, 3).astype(np.int64)
    extra = {}
    if 'TEXCOORD_1' in at: extra['TEXCOORD_1'] = oacc(at['TEXCOORD_1']).astype(np.float32)
    if 'COLOR_0' in at: extra['COLOR_0'] = oacc(at['COLOR_0']).astype(np.float32)
    tg = [oacc(t['POSITION']).astype(np.float32) for t in pr.get('targets', [])]; tnames = m.get('extras', {}).get('targetNames', [])
    keep = np.ones(len(P), bool)
    if nm == 'steve_body': keep = P[:, 1] >= NECK_CUT
    F = F[keep[F].all(1)]; used = np.unique(F); rem = -np.ones(len(P), np.int64); rem[used] = np.arange(len(used))
    J, W2 = collapse(JI[used], W[used], onames)
    tg2 = [(tn, t[used]) for tn, t in zip(tnames, tg) if tn in ('blink', 'pain')]
    parts.append(dict(name=nm, P=P[used] + D, N=N[used], UV=UV[used], J=J, W=W2, IDX=rem[F], mat=('old', pr['material']),
                      extra={k: v[used] for k, v in extra.items()}, targets=tg2))
    print(nm, 'verts', len(used), 'tris', len(F))

# ---------------------------------------------------------------- GLB writer
out = {'asset': {'version': '2.0', 'generator': 'cv-remake steve_re4r.py'}, 'scene': 0, 'scenes': [{'nodes': []}],
       'nodes': [], 'meshes': [], 'skins': [], 'accessors': [], 'bufferViews': [], 'buffers': [],
       'materials': [], 'textures': [], 'images': [], 'samplers': [{'magFilter': 9729, 'minFilter': 9987, 'wrapS': 10497, 'wrapT': 10497}]}
blob = bytearray()
def add_view(b, target=None):
    while len(blob) % 4: blob.append(0)
    o = len(blob); blob.extend(b); v = {'buffer': 0, 'byteOffset': o, 'byteLength': len(b)}
    if target: v['target'] = target
    out['bufferViews'].append(v); return len(out['bufferViews']) - 1
def add_acc(arr, ctype, typ, target=None, minmax=False):
    v = add_view(np.ascontiguousarray(arr).tobytes(), target)
    ac = {'bufferView': v, 'componentType': ctype, 'count': int(arr.shape[0]), 'type': typ}
    if minmax: ac['min'] = arr.min(0).tolist(); ac['max'] = arr.max(0).tolist()
    out['accessors'].append(ac); return len(out['accessors']) - 1
def add_img(name, data, mime):
    out['images'].append({'name': name, 'mimeType': mime, 'bufferView': add_view(data)})
    out['textures'].append({'sampler': 0, 'source': len(out['images']) - 1}); return len(out['textures']) - 1
def jpg(im, q=88):
    b = io.BytesIO(); im.convert('RGB').save(b, 'JPEG', quality=q, optimize=True); return b.getvalue()
def dds(n): return Image.open(os.path.join(ddsdir, n + '.dds')).convert('RGBA')
def re_material(name, alb, nrm, atoc, maxs, tint=None):
    A = dds(alb); Nn = dds(nrm); O = dds(atoc)
    if tint is not None:   # match the old head's skin tone (median albedo ratio)
        t = np.asarray(A).astype(np.float32); t[:, :, :3] *= np.array(tint, np.float32); A = Image.fromarray(t.clip(0, 255).astype(np.uint8))
    def fit(im):
        w, h = im.size; s = min(1, maxs / max(w, h)); return im.resize((int(w * s), int(h * s)), Image.LANCZOS) if s < 1 else im
    A = fit(A); Nn = fit(Nn); O = O.resize((Nn.size[0] // 2, Nn.size[1] // 2), Image.LANCZOS)
    n = np.asarray(Nn).copy(); rough = n[:, :, 3].copy()
    x = n[:, :, 0] / 127.5 - 1; y = -(n[:, :, 1] / 127.5 - 1); z = np.sqrt(np.clip(1 - x * x - y * y, 0, 1))
    nrgb = np.stack([(x + 1) * 127.5, (y + 1) * 127.5, (z + 1) * 127.5], -1).clip(0, 255).astype(np.uint8)
    ao = np.asarray(O)[:, :, 2]
    rr = np.asarray(Image.fromarray(rough).resize(O.size, Image.LANCZOS))
    orm = np.stack([ao, rr, np.zeros_like(ao)], -1)
    t0 = add_img(name + '_albedo', jpg(A), 'image/jpeg'); t1 = add_img(name + '_normal', jpg(Image.fromarray(nrgb), 92), 'image/jpeg')
    t2 = add_img(name + '_orm', jpg(Image.fromarray(orm)), 'image/jpeg')
    out['materials'].append({'name': name, 'doubleSided': False, 'normalTexture': {'index': t1}, 'occlusionTexture': {'index': t2},
        'pbrMetallicRoughness': {'baseColorTexture': {'index': t0}, 'metallicRoughnessTexture': {'index': t2}, 'metallicFactor': 0, 'roughnessFactor': 1}})
    return len(out['materials']) - 1
oldtex = {}
def old_material(i):
    m = json.loads(json.dumps(oj['materials'][i]))
    def remap(d):
        for k, v in list(d.items()):
            if isinstance(v, dict) and 'index' in v and k.endswith('Texture'):
                si = oj['textures'][v['index']]['source']
                if si not in oldtex: data, mime = oimg(si); oldtex[si] = add_img(oj['images'][si]['name'], data, mime)
                v['index'] = oldtex[si]
            elif isinstance(v, dict): remap(v)
    remap(m); out['materials'].append(m); return len(out['materials']) - 1
def old_skin_median():
    si = next(i for i, im in enumerate(oj['images']) if im['name'] == 'steve_skin_albedo'); data, _ = oimg(si)
    return np.median(np.asarray(Image.open(io.BytesIO(data)).convert('RGB')).reshape(-1, 3), 0).astype(np.float32)
mats = {}
for p in parts:
    key = p['mat'] if isinstance(p['mat'], str) else 'old%d' % p['mat'][1]
    if key not in mats:
        if key == 'Skin_Mat':
            ref = old_skin_median(); cur = np.median(np.asarray(dds('steve_body_albd').convert('RGB'))[::4, ::4].reshape(-1, 3), 0)
            mats[key] = re_material('steve_re_skin', 'steve_body_albd', 'steve_body_nrmr', 'steve_body_atoc', 2048, tint=(ref / np.maximum(cur, 1)).tolist())
        elif isinstance(p['mat'], str): mats[key] = re_material('steve_re_outfit', 'cha000_00_steve_albd', 'cha000_00_steve_nrmr', 'cha000_00_steve_atoc', 2560)
        else: mats[key] = old_material(p['mat'][1])
    p['mi'] = mats[key]
# joints
for n in gnames:
    t = gp[n] - (gp[gpar[n]] if gpar[n] else 0)
    out['nodes'].append({'name': n, 'translation': [float(x) for x in t]})
for n in gnames:
    ch = [gi[m] for m in gnames if gpar[m] == n]
    if ch: out['nodes'][gi[n]]['children'] = ch
ibm = np.array([np.linalg.inv(np.block([[np.eye(3), gp[n][:, None]], [np.zeros((1, 3)), np.ones((1, 1))]])).T.reshape(-1) for n in gnames], np.float32)
out['skins'].append({'name': 'steve_rig', 'joints': list(range(len(gnames))), 'inverseBindMatrices': add_acc(ibm, 5126, 'MAT4')})
mesh_nodes = []
for p in parts:
    at = {'POSITION': add_acc(p['P'].astype(np.float32), 5126, 'VEC3', 34962, True), 'NORMAL': add_acc(p['N'].astype(np.float32), 5126, 'VEC3', 34962),
          'TEXCOORD_0': add_acc(p['UV'], 5126, 'VEC2', 34962), 'JOINTS_0': add_acc(p['J'], 5123, 'VEC4', 34962), 'WEIGHTS_0': add_acc(p['W'], 5126, 'VEC4', 34962)}
    for k, v in p.get('extra', {}).items(): at[k] = add_acc(v, 5126, 'VEC%d' % v.shape[1], 34962)
    prim = {'attributes': at, 'indices': add_acc(p['IDX'].reshape(-1).astype(np.uint32), 5125, 'SCALAR', 34963), 'material': p['mi']}
    mesh = {'name': p['name'], 'primitives': [prim]}
    if p.get('targets'):
        prim['targets'] = [{'POSITION': add_acc(t, 5126, 'VEC3', None, True)} for _, t in p['targets']]
        mesh['extras'] = {'targetNames': [n for n, _ in p['targets']]}; mesh['weights'] = [0] * len(p['targets'])
    out['meshes'].append(mesh)
    mesh_nodes.append(len(out['nodes'])); out['nodes'].append({'name': p['name'], 'mesh': len(out['meshes']) - 1, 'skin': 0})
rig = len(out['nodes']); out['nodes'].append({'name': 'steve_root', 'children': [gi['hips']] + mesh_nodes})
out['scenes'][0]['nodes'] = [rig]
while len(blob) % 4: blob.append(0)
out['buffers'].append({'byteLength': len(blob)})
js = json.dumps(out, separators=(',', ':')).encode()
while len(js) % 4: js += b' '
glb = struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(js) + 8 + len(blob)) + struct.pack('<II', len(js), 0x4E4F534A) + js + struct.pack('<II', len(blob), 0x004E4942) + bytes(blob)
open(dst, 'wb').write(glb)
print('joints', len(gnames), 'size', len(glb) // 1024, 'KB')
