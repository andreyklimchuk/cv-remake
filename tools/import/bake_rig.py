"""Bake a skinned glTF (e.g. a Sketchfab export with axis-fix parent nodes) into the game's character layout:
vertices in their bind-pose world positions, Y up, facing +Z, joints = translation-only nodes under one root,
inverse bind matrices = pure translations. Meshes/materials/textures/other attributes are kept as they are.
Up = head - feet; facing = from the foot joints toward the foot-weighted vertices (toes point forward).
Optional 3rd arg: JSON {source joint name: game joint name}; unmapped joints give their weights to the nearest mapped
ancestor and are dropped (pure-python replacement of the Blender rig_bpy.py step).
Usage: python3 tools/import/bake_rig.py in.glb out.glb ['{"0_01":"hips",...}']"""
import sys, json, struct
import numpy as np
src, dst = sys.argv[1], sys.argv[2]
MAPJ = json.loads(sys.argv[3]) if len(sys.argv) > 3 else None
f = open(src, 'rb').read(); l = struct.unpack('<I', f[12:16])[0]; j = json.loads(f[20:20 + l]); blob = bytearray(f[20 + l + 8:])
DT = {5126: np.float32, 5123: np.uint16, 5121: np.uint8, 5125: np.uint32}
NC = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4, 'MAT4': 16}
def acc(i):
    a = j['accessors'][i]; bv = j['bufferViews'][a['bufferView']]; n = NC[a['type']]; dt = DT[a['componentType']]
    assert not bv.get('byteStride') or bv['byteStride'] == n * np.dtype(dt).itemsize, 'strided'
    r = np.frombuffer(bytes(blob), dt, a['count'] * n, bv.get('byteOffset', 0) + a.get('byteOffset', 0)).reshape(a['count'], n).astype(np.float64)
    if a.get('normalized'): r /= np.iinfo(dt).max
    return r
def add_acc(arr, ctype, typ, target=None, minmax=False):
    while len(blob) % 4: blob.append(0)
    o = len(blob); b = np.ascontiguousarray(arr).tobytes(); blob.extend(b)
    v = {'buffer': 0, 'byteOffset': o, 'byteLength': len(b)}
    if target: v['target'] = target
    j['bufferViews'].append(v)
    a = {'bufferView': len(j['bufferViews']) - 1, 'componentType': ctype, 'count': int(arr.shape[0]), 'type': typ}
    if minmax: a['min'] = arr.min(0).tolist(); a['max'] = arr.max(0).tolist()
    j['accessors'].append(a); return len(j['accessors']) - 1
ns = j['nodes']; par = {}
for i, n in enumerate(ns):
    for c in n.get('children', []): par[c] = i
def qm(r):
    x, y, z, w = r
    return np.array([[1-2*(y*y+z*z), 2*(x*y-z*w), 2*(x*z+y*w)], [2*(x*y+z*w), 1-2*(x*x+z*z), 2*(y*z-x*w)], [2*(x*z-y*w), 2*(y*z+x*w), 1-2*(x*x+y*y)]])
def local(n):
    if 'matrix' in n: return np.array(n['matrix']).reshape(4, 4).T
    M = np.eye(4); M[:3, :3] = qm(n.get('rotation', [0, 0, 0, 1])) * np.array(n.get('scale', [1, 1, 1])); M[:3, 3] = n.get('translation', [0, 0, 0]); return M
def world(i):
    M = local(ns[i])
    while i in par: i = par[i]; M = local(ns[i]) @ M
    return M
assert len(j['skins']) == 1; sk = j['skins'][0]; J = sk['joints']
IBM = acc(sk['inverseBindMatrices']).reshape(-1, 4, 4).transpose(0, 2, 1)
JW = np.array([world(i) for i in J]); SK = np.array([JW[k] @ IBM[k] for k in range(len(J))])
jpos = JW[:, :3, 3]; jname = [ns[i].get('name', '') for i in J]; ji = {n: k for k, n in enumerate(jname)}
# bind-pose vertices
prims = []
for mi, m in enumerate(j['meshes']):
    for p in m['primitives']:
        at = p['attributes']; P = acc(at['POSITION']); JI = acc(at['JOINTS_0']).astype(int); W = acc(at['WEIGHTS_0'])
        # some Sketchfab exports leave part of a primitive in centimetres (HUNK's gloves): bring those back to metres
        cm = np.abs(P).max(1) > 20
        if cm.any(): print(m.get('name'), 'cm vertices fixed:', int(cm.sum())); P[cm] *= 0.01
        W /= W.sum(1, keepdims=True) + 1e-12
        M = np.einsum('vk,vkab->vab', W, SK[JI])
        P2 = np.einsum('vab,vb->va', M[:, :3, :3], P) + M[:, :3, 3]
        N2 = None
        if 'NORMAL' in at:
            N = acc(at['NORMAL']); N2 = np.einsum('vab,vb->va', np.linalg.inv(M[:, :3, :3]).transpose(0, 2, 1), N); N2 /= np.linalg.norm(N2, axis=1, keepdims=True) + 1e-12
        prims.append((p, P2, N2, JI, W))
# repair broken joint placements (seen in HUNK: finger joints in centimetres, hand joints at the origin)
jpar = {}
for k, i in enumerate(J):
    q = par.get(i)
    while q is not None and q not in J: q = par.get(q)
    jpar[k] = J.index(q) if q is not None else None
for k in range(len(J)):
    if np.abs(jpos[k]).max() > 20: jpos[k] = jpos[k] * 0.01; print('joint cm -> m:', jname[k])
for k in range(len(J)):
    if np.linalg.norm(jpos[k]) < 1e-3 and jpar[k] is not None:
        kids = [c for c in range(len(J)) if jpar[c] == k]
        pp = jpos[jpar[k]]; tgt = np.mean([jpos[c] for c in kids], 0) if kids else pp + (pp - jpos[jpar[jpar[k]]])
        d = tgt - pp; L = np.linalg.norm(d); d /= L
        pts = np.concatenate([P2[((JI == k) & (W > 0.5)).any(1)] for _, P2, _, JI, W in prims])
        t = np.percentile((pts - pp) @ d, 3) if len(pts) else 0.6 * L
        jpos[k] = pp + d * float(np.clip(t, 0.2 * L, 0.95 * L)); print('joint re-placed from its vertices:', jname[k], jpos[k].round(3))
# orientation
REV = {v: k for k, v in (MAPJ or {}).items()}
def jp(*names):
    for n in names:
        n = REV.get(n, n)
        if n in ji: return jpos[ji[n]]
    raise KeyError(names)
feet = (jp('lFoot') + jp('rFoot')) / 2; up = jp('head') - feet; up /= np.linalg.norm(up)
fv = []
for p, P2, N2, JI, W in prims:
    for fn in (REV.get('lFoot', 'lFoot'), REV.get('rFoot', 'rFoot')):
        if fn in ji: sel = ((JI == ji[fn]) & (W > 0.5)).any(1); fv.append(P2[sel] - jpos[ji[fn]])
fwd = np.concatenate(fv).mean(0); fwd -= up * fwd.dot(up); fwd /= np.linalg.norm(fwd)
R = np.stack([np.cross(up, fwd), up, fwd])   # rows: new x, y(up), z(forward)
print('up', up.round(3), 'forward', fwd.round(3))
P_all = np.concatenate([q[1] for q in prims]) @ R.T; floor = P_all[:, 1].min()
off = np.array([-(jp('hips') @ R.T)[0], -floor, -(jp('hips') @ R.T)[2]])
newj = jpos @ R.T + off
for p, P2, N2, JI, W in prims:
    p['attributes']['POSITION'] = add_acc((P2 @ R.T + off).astype(np.float32), 5126, 'VEC3', 34962, True)
    if N2 is not None: p['attributes']['NORMAL'] = add_acc((N2 @ R.T).astype(np.float32), 5126, 'VEC3', 34962)
    p['attributes'].pop('TANGENT', None)
if MAPJ:
    # ---- rename + merge: keep only mapped joints, every other joint -> nearest mapped ancestor
    jparK = {}
    for k, i in enumerate(J):
        q = par.get(i)
        while q is not None and q not in J: q = par.get(q)
        jparK[k] = J.index(q) if q is not None else None
    keep = [k for k in range(len(J)) if jname[k] in MAPJ]
    newk = {k: n for n, k in enumerate(keep)}
    def tgt(k):
        q = k
        while q is not None and jname[q] not in MAPJ: q = jparK[q]
        return newk[q] if q is not None else newk[ji[next(n for n in MAPJ if MAPJ[n] == 'hips')]]
    T = np.array([tgt(k) for k in range(len(J))])
    for p, P2, N2, JI, W in prims:
        n = len(JI); J2 = np.zeros((n, 4), np.uint16); W2 = np.zeros((n, 4), np.float32)
        for v in range(n):
            d = {}
            for c in range(JI.shape[1]):
                if W[v, c] > 0: d[T[JI[v, c]]] = d.get(T[JI[v, c]], 0) + W[v, c]
            it = sorted(d.items(), key=lambda x: -x[1])[:4]; sm = sum(w for _, w in it) or 1
            for c, (b, w) in enumerate(it): J2[v, c] = b; W2[v, c] = w / sm
        p['attributes']['JOINTS_0'] = add_acc(J2, 5123, 'VEC4', 34962); p['attributes']['WEIGHTS_0'] = add_acc(W2, 5126, 'VEC4', 34962)
    base = len(ns); kpar = {}
    for k in keep:
        q = jparK[k]
        while q is not None and jname[q] not in MAPJ: q = jparK[q]
        kpar[k] = q
    for k in keep: ns.append({'name': MAPJ[jname[k]]})
    for k in keep:
        nd = ns[base + newk[k]]; q = kpar[k]
        nd['translation'] = [float(x) for x in (newj[k] - (newj[q] if q is not None else 0))]
        ch = [base + newk[c] for c in keep if kpar[c] == k]
        if ch: nd['children'] = ch
    ibm = np.array([np.linalg.inv(np.block([[np.eye(3), newj[k][:, None]], [np.zeros((1, 3)), np.ones((1, 1))]])).T.reshape(-1) for k in keep], np.float32)
    sk['joints'] = [base + newk[k] for k in keep]; sk['inverseBindMatrices'] = add_acc(ibm, 5126, 'MAT4'); sk.pop('skeleton', None)
    mesh_nodes = [i for i, n in enumerate(ns) if 'mesh' in n]
    for i in mesh_nodes: [ns[i].pop(x, None) for x in ('rotation', 'scale', 'matrix', 'translation')]
    for i, n in enumerate(ns[:base]): n.pop('children', None)
    roots = [base + newk[k] for k in keep if kpar[k] is None]
    ns.append({'name': 'rig_root', 'children': roots + mesh_nodes}); j['scenes'] = [{'nodes': [len(ns) - 1]}]; j['scene'] = 0
    J = None
if J is not None:
    # joints: translation only, parent = nearest joint ancestor
    jset = set(J)
    def jparent(i):
        q = par.get(i)
        while q is not None and q not in jset: q = par.get(q)
        return q
    for k, i in enumerate(J):
        pq = jparent(i); t = newj[k] - (newj[J.index(pq)] if pq is not None else 0)
        nd = ns[i]; [nd.pop(x, None) for x in ('rotation', 'scale', 'matrix')]; nd['translation'] = [float(x) for x in t]
        ch = [c for c in J if jparent(c) == i]   # via the nearest joint ancestor (skips helper nodes in between)
        if ch: nd['children'] = ch
        else: nd.pop('children', None)
    ibm = np.array([np.linalg.inv(np.block([[np.eye(3), newj[k][:, None]], [np.zeros((1, 3)), np.ones((1, 1))]])).T.reshape(-1) for k in range(len(J))], np.float32)
    sk['inverseBindMatrices'] = add_acc(ibm, 5126, 'MAT4'); sk.pop('skeleton', None)
    roots = [i for i in J if jparent(i) is None]
    mesh_nodes = [i for i, n in enumerate(ns) if 'mesh' in n]
    for i in mesh_nodes: [ns[i].pop(x, None) for x in ('rotation', 'scale', 'matrix', 'translation')]
    # detach everything from the old hierarchy, new single root
    for i, n in enumerate(ns):
        if i in jset: continue
        if 'children' in n: n['children'] = [c for c in n['children'] if c not in mesh_nodes and c not in jset]
        if 'children' in n and not n['children']: n.pop('children')
    ns.append({'name': 'rig_root', 'children': roots + mesh_nodes}); j['scenes'] = [{'nodes': [len(ns) - 1]}]; j['scene'] = 0
j.pop('animations', None)
# compact: keep only buffer views that are still referenced, drop orphan nodes' data
refs = set()
for a in j['accessors']:
    if 'bufferView' in a: refs.add(a['bufferView'])
    if 'sparse' in a: refs.add(a['sparse']['indices']['bufferView']); refs.add(a['sparse']['values']['bufferView'])
used_acc = set()
for m in j['meshes']:
    for p in m['primitives']:
        used_acc |= set(p['attributes'].values()); used_acc.add(p.get('indices')); [used_acc.update(t.values()) for t in p.get('targets', [])]
for s_ in j['skins']: used_acc.add(s_['inverseBindMatrices'])
amap = {}; accs = []
for i, a in enumerate(j['accessors']):
    if i in used_acc: amap[i] = len(accs); accs.append(a)
j['accessors'] = accs
for m in j['meshes']:
    for p in m['primitives']:
        p['attributes'] = {k: amap[v] for k, v in p['attributes'].items()}
        if 'indices' in p: p['indices'] = amap[p['indices']]
        if 'targets' in p: p['targets'] = [{k: amap[v] for k, v in t.items()} for t in p['targets']]
for s_ in j['skins']: s_['inverseBindMatrices'] = amap[s_['inverseBindMatrices']]
refs = set()
for a in j['accessors']:
    if 'bufferView' in a: refs.add(a['bufferView'])
    if 'sparse' in a: refs.add(a['sparse']['indices']['bufferView']); refs.add(a['sparse']['values']['bufferView'])
for im in j.get('images', []):
    if 'bufferView' in im: refs.add(im['bufferView'])
nb = bytearray(); vmap = {}; views = []
for i, v in enumerate(j['bufferViews']):
    if i not in refs: continue
    while len(nb) % 4: nb.append(0)
    o = v.get('byteOffset', 0); d = blob[o:o + v['byteLength']]; v = dict(v); v['byteOffset'] = len(nb); nb.extend(d)
    vmap[i] = len(views); views.append(v)
j['bufferViews'] = views
for a in j['accessors']:
    if 'bufferView' in a: a['bufferView'] = vmap[a['bufferView']]
    if 'sparse' in a: a['sparse']['indices']['bufferView'] = vmap[a['sparse']['indices']['bufferView']]; a['sparse']['values']['bufferView'] = vmap[a['sparse']['values']['bufferView']]
for im in j.get('images', []):
    if 'bufferView' in im: im['bufferView'] = vmap[im['bufferView']]
blob = nb
while len(blob) % 4: blob.append(0)
j['buffers'] = [{'byteLength': len(blob)}]
js = json.dumps(j, separators=(',', ':')).encode()
while len(js) % 4: js += b' '
open(dst, 'wb').write(struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(js) + 8 + len(blob)) + struct.pack('<II', len(js), 0x4E4F534A) + js + struct.pack('<II', len(blob), 0x004E4942) + bytes(blob))
print('joints', len(sk['joints']), 'hips', (jp('hips') @ R.T + off).round(3), 'head', (jp('head') @ R.T + off).round(3), 'height', round(P_all[:, 1].max() - floor, 3))
