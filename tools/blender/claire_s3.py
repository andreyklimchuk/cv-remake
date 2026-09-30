import sys; sys.path.insert(0, '/data/assets_src/tools')
from lib import *
import json, random
S = 1.70 / 1.641; SOLE = 0.022
def Z(z): return z * S + SOLE
bpy.ops.wm.open_mainfile(filepath='/data/assets_src/work/claire_s2.blend')
body = bpy.data.objects['claire_body']; rig = bpy.data.objects['claire_rig']
for o in bpy.data.objects:
    if o.type == 'MESH' and o.name == 'boots': shade_smooth(o)
joints = {k: Vector(v) for k, v in json.load(open('/data/assets_src/work/claire_joints.json')).items()}
rnd = random.Random(11)
bvh = bvh_of(body)
groups = [g.name for g in body.vertex_groups]
Wb = weights(body, groups); Pb = V(body)
headw = Wb[:, groups.index('head')] + Wb[:, groups.index('neck')] * 0.5
Hv = Pb[(Wb[:, groups.index('head')] > 0.6) & (Pb[:, 2] > Z(1.43))]
C = Vector(((Hv[:, 0].min() + Hv[:, 0].max()) / 2, (Hv[:, 1].min() + Hv[:, 1].max()) / 2, float(np.array(joints['lEye'])[2]) + 0.005))
print('head center', C, 'ranges', Hv.min(0), Hv.max(0))
def smoothstep(a, b, x):
    t = np.clip((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t)
def az_el(p):
    d = np.asarray(p) - np.array(C)
    az = np.degrees(np.arctan2(d[..., 0], -d[..., 1]))   # 0 = front, +90 = character left
    el = np.degrees(np.arctan2(d[..., 2], np.hypot(d[..., 0], d[..., 1])))
    return az, el
def hairline(az):
    a = np.abs(az)
    return np.interp(a, [0, 25, 45, 70, 95, 120, 150, 180], [40, 38, 30, 22, 20, 5, -25, -38])
def surf(direction, off):
    d = Vector(direction).normalized()
    hit, nr, _, _ = bvh.ray_cast(C + d * 0.3, -d, 0.35)
    if hit is None: return C + d * 0.1, d
    return hit + nr * off, nr

# ------------------------------------------------------------ hair tie point + ponytail bones
T_dir = Vector((0, 0.72, 0.62)).normalized()
T, Tn = surf(T_dir, 0.012)
pony_pts = [T, T + Vector((0, 0.05, -0.02)), T + Vector((0, 0.085, -0.11)), T + Vector((0, 0.085, -0.22)), T + Vector((0, 0.07, -0.34))]
select_only([rig], rig); bpy.ops.object.mode_set(mode='EDIT')
eb = rig.data.edit_bones
prev = 'head'
for i in range(4):
    b = eb.new('pony%d' % i); b.head = pony_pts[i]; b.tail = pony_pts[i + 1]; b.parent = eb[prev]; prev = b.name
bpy.ops.object.mode_set(mode='OBJECT')

# ------------------------------------------------------------ scalp cap
az, el = az_el(Pb)
hm = (el > hairline(az) - 4) & (Wb[:, groups.index('head')] > 0.5)
fm = face_mask_from_verts(body, hm, 'all')
cap = extract_faces(body, fm, 'hair_cap')
for m in list(cap.modifiers): cap.modifiers.remove(m)
cap.parent = None
if cap.data.shape_keys: cap.shape_key_clear()
smooth_boundary(cap, 10)
cloth_shell(cap, bvh, 0.0026, smooth_iters=2, passes=2, pin=boundary_verts(cap))
# UV: strands radiate from the tie point: v = angular distance from T, u = angle around T axis
Pc = V(cap); tdir = np.array(T - C); tdir /= np.linalg.norm(tdir)
ref = np.cross(tdir, [1, 0, 0]); ref /= np.linalg.norm(ref); ref2 = np.cross(tdir, ref)
d = Pc - np.array(C); d /= np.linalg.norm(d, axis=1)[:, None]
vv = np.arccos(np.clip(d @ tdir, -1, 1)) / np.pi
uu = (np.arctan2(d @ ref2, d @ ref) / (2 * np.pi)) % 1.0
ul = cap.data.uv_layers.new(name='UVMap')
for p in cap.data.polygons:
    us = [uu[v] for v in p.vertices]
    wrap = max(us) - min(us) > 0.5
    for li, vi in zip(p.loop_indices, p.vertices):
        u = uu[vi] + (1.0 if wrap and uu[vi] < 0.5 else 0.0)
        ul.data[li].uv = (u * 0.5, 0.08 + 0.92 * vv[vi])   # hair atlas: cap tile = left half above the lash strip
azc, elc = az_el(Pc)
fade = smoothstep(0.0, 7.0, elc - hairline(azc))
ca = cap.data.color_attributes.new(name='Col', type='FLOAT_COLOR', domain='POINT')
for i, f in enumerate(fade): ca.data[i].color = (1, 1, 1, float(f))
rigid_weight(cap, 'head')

# ------------------------------------------------------------ hair cards
verts, faces, uvs, bones_w = [], [], [], []
def add_card(path, widths, normals, variant, pony=False):
    n = len(path); base = len(verts)
    u0 = 0.5 + 0.125 * variant; u1 = u0 + 0.125
    for i in range(n):
        tng = (path[min(i + 1, n - 1)] - path[max(i - 1, 0)]).normalized()
        side = normals[i].cross(tng).normalized() * widths[i] * 0.5
        v = i / (n - 1)
        verts.append(path[i] - side); uvs.append((u0 + 0.004, 1 - v * 0.98))
        verts.append(path[i] + side); uvs.append((u1 - 0.004, 1 - v * 0.98))
        bones_w.append(('pony', path[i]) if pony else ('head', None)); bones_w.append(bones_w[-1])
    for i in range(n - 1):
        a = base + 2 * i
        faces.append((a, a + 1, a + 3, a + 2))
def slerp_dir(a, b, t):
    a = a.normalized(); b = b.normalized(); om = math.acos(max(-1, min(1, a.dot(b))))
    if om < 1e-4: return a
    return (a * math.sin((1 - t) * om) + b * math.sin(t * om)) / math.sin(om)
# scalp layers -> tie
count = 0
for layer, off in enumerate((0.0045, 0.0068, 0.0092)):
    for k in range(95):
        a = rnd.uniform(-180, 180)
        e = float(hairline(np.array([a]))[0]) + rnd.uniform(0, 5 if layer == 0 else 25)
        if abs(a) > 150 and layer > 0: e += rnd.uniform(0, 20)
        ar, er = math.radians(a), math.radians(e)
        root_dir = Vector((math.sin(ar) * math.cos(er), -math.cos(ar) * math.cos(er), math.sin(er)))
        pts, nrs = [], []
        nseg = 9
        for i in range(nseg + 1):
            t = i / nseg
            dd = slerp_dir(root_dir, T_dir, t)
            p, nr = surf(dd, off + 0.002 * math.sin(t * math.pi))
            pts.append(p); nrs.append(nr)
        w = rnd.uniform(0.016, 0.026)
        add_card(pts, [w * (1 - 0.6 * (i / nseg) ** 2) for i in range(nseg + 1)], nrs, rnd.randrange(4))
        count += 1
# ponytail bundle
def pony_path(t, ang, rad, jitter):
    # sample along bone chain polyline
    L = [0]
    for i in range(4): L.append(L[-1] + (pony_pts[i + 1] - pony_pts[i]).length)
    s = t * L[-1]; i = min(3, max(j for j in range(4) if L[j] <= s)); f = (s - L[i]) / (L[i + 1] - L[i])
    c = pony_pts[i].lerp(pony_pts[i + 1], f)
    dirv = (pony_pts[i + 1] - pony_pts[i]).normalized()
    u = dirv.cross(Vector((1, 0, 0))).normalized(); v = dirv.cross(u)
    r = rad * (0.35 + 1.25 * math.sin(min(1, t * 2.2) * math.pi * 0.5) * (1 - 0.55 * t))
    off = (u * math.cos(ang) + v * math.sin(ang)) * r
    return c + off + jitter * t, off.normalized() if off.length > 1e-6 else u
for k in range(110):
    ang = rnd.uniform(0, 2 * math.pi); rad = rnd.uniform(0.012, 0.034)
    jit = Vector((rnd.uniform(-0.02, 0.02), rnd.uniform(-0.01, 0.02), rnd.uniform(-0.03, 0.02)))
    lenf = rnd.uniform(0.75, 1.0)
    pts, nrs = [], []
    for i in range(13):
        p, nr = pony_path(i / 12 * lenf, ang + i * 0.05, rad, jit)
        pts.append(p); nrs.append(nr)
    w = rnd.uniform(0.02, 0.032)
    add_card(pts, [w * (1 - 0.75 * (i / 12) ** 1.5) for i in range(13)], nrs, rnd.randrange(4), pony=True)
# side bangs framing the face (clumps of thin cards, lifted off the skin)
for side in (1, -1):
    for clump in range(3):
        cx = side * (0.022 + 0.016 * clump)
        for k in range(4):
            x0 = cx + rnd.uniform(-0.006, 0.006)
            root, rn = surf(Vector((x0 * 6, -1, 0.8)), 0.008)
            ctrl = [root,
                    Vector((side * (0.05 + 0.008 * clump + rnd.uniform(0, 0.008)), root.y + 0.02, root.z - 0.025)),
                    Vector((side * (0.078 + 0.004 * clump + rnd.uniform(-0.003, 0.004)), float(C.y) - 0.06 + 0.012 * clump, Z(1.535) + rnd.uniform(-0.008, 0.008))),
                    Vector((side * (0.07 + 0.005 * clump + rnd.uniform(-0.004, 0.006)), float(C.y) - 0.05 + 0.012 * clump, Z(1.455) + rnd.uniform(-0.02, 0.02) - 0.015 * clump))]
            pts, nrs = [], []
            for i in range(12):
                t = i / 11 * 3; j = min(2, int(t)); f = t - j
                p = ctrl[j].lerp(ctrl[j + 1], f * f * (3 - 2 * f))
                loc, nr, _, _ = bvh.find_nearest(p)
                mind = 0.009 + 0.004 * clump
                if loc is not None and (p - loc).dot(nr) < mind: p = loc + nr * mind
                pts.append(p); nrs.append(nr if loc is not None else Vector((side, 0, 0)))
            w = rnd.uniform(0.009, 0.015)
            add_card(pts, [w * (1 - 0.65 * (i / 11) ** 2) for i in range(12)], nrs, rnd.randrange(4))
# swept fringe from a side part, arching over the upper forehead
for k in range(11):
    xa = 0.018 + rnd.uniform(-0.006, 0.01)
    pts, nrs = [], []
    for i in range(10):
        t = i / 9
        dd = Vector((xa * 5 - 2.2 * t, -1, 1.35 - 0.75 * t - 0.25 * t * t))
        p, nr = surf(dd, 0.009 + 0.006 * math.sin(t * math.pi) + 0.001 * k)
        pts.append(p); nrs.append(nr)
    add_card(pts, [0.017 * (1 - 0.55 * (i / 9) ** 2) for i in range(10)], nrs, rnd.randrange(4))
cards = mesh_from('hair_cards', verts, faces)
ul = cards.data.uv_layers.new(name='UVMap')
for p in cards.data.polygons:
    for li, vi in zip(p.loop_indices, p.vertices): ul.data[li].uv = uvs[vi]
shade_smooth(cards)
# weights: head or ponytail chain by distance along the chain
for n_ in ['head'] + ['pony%d' % i for i in range(4)]: cards.vertex_groups.new(name=n_)
seglen = [(pony_pts[i + 1] - pony_pts[i]).length for i in range(4)]
for vi, (kind, p) in enumerate(bones_w):
    if kind == 'head': cards.vertex_groups['head'].add([vi], 1.0, 'REPLACE'); continue
    best, bt = 0, 0
    bd = 1e9
    for i in range(4):
        a, b = pony_pts[i], pony_pts[i + 1]; ab = b - a
        t = max(0, min(1, (p - a).dot(ab) / ab.length_squared)); d_ = (a + ab * t - p).length
        if d_ < bd: bd, best, bt = d_, i, t
    w1 = bt; g0 = 'pony%d' % best
    if best == 0 and bt < 0.3:
        cards.vertex_groups['head'].add([vi], 1 - bt / 0.3, 'REPLACE'); cards.vertex_groups[g0].add([vi], bt / 0.3, 'REPLACE')
    elif best < 3 and bt > 0.6:
        f = (bt - 0.6) / 0.4 * 0.5
        cards.vertex_groups[g0].add([vi], 1 - f, 'REPLACE'); cards.vertex_groups['pony%d' % (best + 1)].add([vi], f, 'REPLACE')
    else:
        cards.vertex_groups[g0].add([vi], 1.0, 'REPLACE')
# hair tie
tie = bpy.ops.mesh.primitive_torus_add(major_radius=0.016, minor_radius=0.0055, major_segments=24, minor_segments=8)
tie = bpy.context.active_object; tie.name = 'hair_tie'
dz = (pony_pts[1] - pony_pts[0]).normalized()
place(tie, pony_pts[0].lerp(pony_pts[1], 0.35), dz.cross(Vector((1, 0, 0))).normalized(), Vector((1, 0, 0)).cross(dz.cross(Vector((1, 0, 0))).normalized()) * -1, dz)
rigid_weight(tie, 'pony0')
print('hair cards', count, 'tris', tri_count(cards), 'cap tris', tri_count(cap))

# ------------------------------------------------------------ eyelashes (follow the blink key)
kb = body.data.shape_keys.key_blocks
Pbas = V(body); Pbl = np.zeros(len(Pbas) * 3); kb['blink'].data.foreach_get('co', Pbl); Pbl = Pbl.reshape(-1, 3)
lv, lf, luv = [], [], []
for side in 'lr':
    c = np.array(joints[side + 'Eye']); r = 0.012 * S
    rel = Pbas - c; dd = np.linalg.norm(rel, axis=1)
    elv = np.degrees(np.arctan2(rel[:, 2], -rel[:, 1]))
    rim = (dd < r * 1.32) & (rel[:, 1] < -0.45 * r) & (elv > 5)
    R = Pbas[rim]
    xs = np.linspace(R[:, 0].min() + 0.001, R[:, 0].max() - 0.001, 14)
    top = []
    for x in xs:
        m = np.abs(R[:, 0] - x) < 0.0025
        if not np.any(m): continue
        cand = R[m]; top.append(cand[np.argmax(cand[:, 2] - cand[:, 1] * 0.2)])
    base = len(lv)
    for i, p in enumerate(top):
        out = (p - c); out /= np.linalg.norm(out)
        tipp = p + out * 0.0035 + np.array([0, -0.004, 0.0035])
        lv += [p + out * 0.0004, tipp]
        u = i / (len(top) - 1)
        luv += [(u * 0.5, 0.065), (u * 0.5, 0.002)]
    for i in range(len(top) - 1):
        a = base + 2 * i; lf.append((a, a + 2, a + 3, a + 1))
lashes = mesh_from('eyelashes', lv, lf)
ul = lashes.data.uv_layers.new(name='UVMap')
for p in lashes.data.polygons:
    for li, vi in zip(p.loop_indices, p.vertices): ul.data[li].uv = luv[vi]
rigid_weight(lashes, 'head')
kd = kdtree.KDTree(len(Pbas))
for i, p in enumerate(Pbas): kd.insert(p, i)
kd.balance()
Pl = V(lashes); near = np.array([kd.find(Vector(p))[1] for p in Pl])
lashes.shape_key_add(name='Basis', from_mix=False)
for kname in ('blink', 'pain'):
    kk = np.zeros(len(Pbas) * 3); kb[kname].data.foreach_get('co', kk); kk = kk.reshape(-1, 3)
    k = lashes.shape_key_add(name=kname, from_mix=False); k.data.foreach_set('co', (Pl + kk[near] - Pbas[near]).ravel())
zero_keys(lashes)

for o in (cap, cards, tie, lashes):
    o.parent = rig; m = o.modifiers.new('rig', 'ARMATURE'); m.object = rig
json.dump({'pony': [list(p) for p in pony_pts], 'tie': list(T)}, open('/data/assets_src/work/claire_hair.json', 'w'))
bpy.ops.wm.save_as_mainfile(filepath='/data/assets_src/work/claire_s3.blend')
print('stage3 done')
