"""Zombie generator: Blender Studio male base mesh (CC0) + rig + torn clothes + decayed skin, one texture atlas.
   ZV=prisoner|guard TEXSIZE=2048 python3 tools/zombie.py"""
import sys, os, json, time, math; sys.path.insert(0, '/data/assets_src/tools')
from lib import *
from bakekit import *
from texlib import *
from PIL import Image, ImageDraw, ImageFont
from mathutils import noise, kdtree
VAR = os.environ.get('ZV', 'prisoner'); Q = int(os.environ.get('TEXSIZE', '2048'))
T0 = time.time()
def log(*a): print('[%5.1fs]' % (time.time() - T0), VAR, *a, flush=True)
S = 1.77 / 1.684; SOLE = 0.022
def Z(z): return z * S + SOLE
def U(z): return (z - SOLE) / S
sc = reset()
names = ['GEO-body_male_realistic', 'GEO-body_female_realistic', 'GEO-body_male_realistic.eye.L', 'GEO-body_male_realistic.eye.R']
ob = append(names)
male, fem, eL, eR = [ob[n] for n in names]
for e in (eL, eR): unparent_keep(e)
off = male.matrix_world.translation.copy()
for o in (male, eL, eR): o.location -= off
fem.location -= fem.matrix_world.translation.copy()
for o in (male, fem, eL, eR): apply_transform(o)
for o in (male, fem):
    with ctx(o): bpy.ops.object.multires_base_apply(modifier=o.modifiers[0].name)

# ---- joints by topological correspondence with the (hand-measured) female skeleton
FJ = {'hips': (0, .005, .905), 'spine': (0, .01, .985), 'neck': (0, -.01, 1.40), 'head': (0, -.035, 1.475), 'headTop': (0, -.03, 1.64)}
for s, sx in (('l', 1), ('r', -1)):
    FJ.update({s + 'UpperArm': (.165 * sx, .01, 1.315), s + 'Forearm': (.238 * sx, .02, 1.07), s + 'Hand': (.337 * sx, -.022, .884),
               s + 'HandTip': (.395 * sx, -.07, .765), s + 'Thigh': (.085 * sx, 0, .865), s + 'Shin': (.11 * sx, 0, .46),
               s + 'Foot': (.12 * sx, .045, .08), s + 'Toe': (.13 * sx, -.10, .02)})
Pf = V(fem); Pm0 = V(male)
assert len(Pf) == len(Pm0)
jm = {}
for k, v in FJ.items():
    v = np.array(v); r = 0.11 if k in ('hips', 'spine') else 0.06 if 'Toe' not in k and 'Tip' not in k else 0.04
    ratio = 1.684 / 1.641
    for rr in (r, r * 1.6, r * 2.5, r * 4):
        idx = np.where(np.linalg.norm(Pf - v, axis=1) < rr)[0]
        if len(idx) >= 4: break
    jm[k] = Pm0[idx].mean(0) + (v - Pf[idx].mean(0)) * ratio if len(idx) >= 4 else v * ratio
bpy.data.objects.remove(fem)
high = dup(male, 'z_high'); high.modifiers[0].levels = 3; apply_modifier(high, high.modifiers[0].name)
body0 = dup(male, 'z_body_l0'); body0.modifiers.remove(body0.modifiers[0])
body = male; body.modifiers[0].levels = 1; apply_modifier(body, body.modifiers[0].name)
body.name = 'zombie_body'; shade_smooth(body)
for o in (body, body0, high, eL, eR):
    o.location = o.location * S + Vector((0, 0, SOLE)); o.scale = (S, S, S); apply_transform(o)
joints = {k: Vector(v) * S + Vector((0, 0, SOLE)) for k, v in jm.items()}
joints['lEye'] = Vector(V(eL).mean(0)); joints['rEye'] = Vector(V(eR).mean(0))
log('joints', {k: tuple(round(c, 3) for c in v) for k, v in joints.items() if k in ('hips', 'lUpperArm', 'lHand', 'lFoot', 'head')})

# ---- armature
ad = bpy.data.armatures.new('zombie_rig'); rig = bpy.data.objects.new('zombie_rig', ad); link(rig)
select_only([rig], rig); bpy.ops.object.mode_set(mode='EDIT'); eb = ad.edit_bones
def bone(name, h, t, parent=None):
    b = eb.new(name); b.head = h; b.tail = t
    if parent: b.parent = eb[parent]
bone('hips', joints['hips'], joints['spine']); bone('spine', joints['spine'], joints['neck'], 'hips')
bone('neck', joints['neck'], joints['head'], 'spine'); bone('head', joints['head'], joints['headTop'], 'neck')
for s in 'lr':
    bone(s + 'UpperArm', joints[s + 'UpperArm'], joints[s + 'Forearm'], 'spine'); bone(s + 'Forearm', joints[s + 'Forearm'], joints[s + 'Hand'], s + 'UpperArm')
    bone(s + 'Hand', joints[s + 'Hand'], joints[s + 'HandTip'], s + 'Forearm'); bone(s + 'Thigh', joints[s + 'Thigh'], joints[s + 'Shin'], 'hips')
    bone(s + 'Shin', joints[s + 'Shin'], joints[s + 'Foot'], s + 'Thigh'); bone(s + 'Foot', joints[s + 'Foot'], joints[s + 'Toe'], s + 'Shin')
bpy.ops.object.mode_set(mode='OBJECT')
select_only([body0, rig], rig)
with ctx(rig, [body0, rig]): bpy.ops.object.parent_set(type='ARMATURE_AUTO')
transfer_weights(body, body0)
groups = [g.name for g in body0.vertex_groups]
W0 = weights(body0, groups); P0 = V(body0); z0 = P0[:, 2]
def wsum(W, names): return sum(W[:, groups.index(n)] for n in names if n in groups)
ARM = [s + b for s in 'lr' for b in ('UpperArm', 'Forearm', 'Hand')]
FH = [s + b for s in 'lr' for b in ('Forearm', 'Hand')]
HAND = ['lHand', 'rHand']
arm0 = wsum(W0, ARM); fh0 = wsum(W0, FH); hd0 = wsum(W0, HAND); nh0 = wsum(W0, ['neck', 'head'])
bvh = bvh_of(body)
log('rig + weights done')

def smoothstep(a, b, x):
    t = np.clip((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t)
def centers(o):
    a = np.zeros(len(o.data.polygons) * 3); o.data.polygons.foreach_get('center', a); return a.reshape(-1, 3)
def nz(x, y, z): return noise.noise(Vector((x, y, z)))
# torn holes: (centre, radius) in world space; jagged via noise
rng = np.random.default_rng(7 if VAR == 'prisoner' else 11)
if VAR == 'prisoner':
    HOLES = [((0.10, -0.11, Z(0.47)), 0.055), ((-0.13, 0.02, Z(1.08)), 0.06), ((0.05, 0.13, Z(1.22)), 0.05), ((-0.09, -0.10, Z(0.33)), 0.035), ((0.18, 0.0, Z(1.30)), 0.035)]
else:
    HOLES = [((-0.09, -0.11, Z(0.50)), 0.045), ((0.12, -0.12, Z(1.12)), 0.05), ((-0.25, 0.02, Z(1.10)), 0.04), ((0.02, 0.14, Z(1.02)), 0.045)]
HC = np.array([h[0] for h in HOLES]); HR = np.array([h[1] for h in HOLES])
def hole_field(P):
    d = np.min(np.linalg.norm(P[:, None, :] - HC[None], axis=2) / HR[None], axis=1)
    j = fbm(P, 3, scale=38.0) * 0.55
    return d + j - 1.0          # < 0 inside a hole
highs = []
def make_high(o, levels, fold):
    h = dup(o, o.name + '_high')
    for g in list(h.vertex_groups): h.vertex_groups.remove(g)
    subdivide(h, levels); displace_along_normals(h, fold); h.hide_render = True; highs.append(h); return h
def garment(vmask, name, ffilter=None, holes=True):
    f = face_mask_from_verts(body0, vmask, 'all')
    if ffilter is not None: f &= ffilter(centers(body0))
    o = extract_faces(body0, f, name)
    for m in list(o.modifiers): o.modifiers.remove(m)
    o.parent = None; o.hide_render = False
    smooth_boundary(o, 14)
    return o
def tear(o):
    hf = hole_field(centers(o)); delete_faces(o, hf < 0)
    bm = bmesh.new(); bm.from_mesh(o.data)
    bmesh.ops.delete(bm, geom=[v for v in bm.verts if not v.link_faces], context='VERTS'); bm.to_mesh(o.data); bm.free()
    # fray: pull boundary verts slightly inward/outward
    P = V(o); bv = boundary_verts(o)
    if bv is not None and len(bv):
        Nn = N(o); jit = np.array([nz(*(p * 90)) for p in P[bv]])
        P[bv] += Nn[bv] * (0.0015 * jit)[:, None]; setV(o, P)
parts = {}
def fold_fn(scale_z=1.0, amp=1.0):
    def f(p, n):
        x, y, z = p; zz = U(z)
        knee = smoothstep(0.08, 0.0, abs(zz - 0.46)); elbow = smoothstep(0.06, 0.0, abs(zz - 1.07)) * smoothstep(0.12, 0.2, abs(x))
        crotch = smoothstep(0.08, 0.0, abs(zz - 0.80)) * smoothstep(0.13, 0.05, abs(x)); waist = smoothstep(0.05, 0.0, abs(zz - 0.95))
        return amp * (0.0009 * nz(x * 9, y * 9, z * 22) + 0.0035 * knee * nz(x * 7, y * 7, z * 55) + 0.0028 * elbow * nz(x * 40, y * 12, z * 30)
                      + 0.0025 * crotch * nz(x * 26 + z * 22, y * 9, z * 24) + 0.002 * waist * nz(x * 5, y * 5, z * 70) + 0.00025 * nz(x * 110, y * 110, z * 110))
    return f

if VAR == 'prisoner':
    # one-piece jumpsuit, short rolled sleeves, open collar
    def neck_filter(C):
        x, y, zz = C.T
        return ~((y < 0) & (zz > Z(1.30)) & (np.abs(x) < 0.012 + (zz - Z(1.30)) * 0.9))
    js = garment((z0 > Z(0.17)) & (z0 < Z(1.42)) & (fh0 < 0.5) & (nh0 < 0.35), 'suit', neck_filter)
    Pj = V(js); offj = 0.016 + 0.012 * smoothstep(Z(0.6), Z(0.25), Pj[:, 2]) + 0.004 * smoothstep(Z(1.0), Z(1.15), Pj[:, 2]) * (Pj[:, 1] > 0)
    cloth_shell(js, bvh, offj, smooth_iters=6, passes=3, pin=boundary_verts(js))
    tear(js); make_high(js, 3, fold_fn(amp=1.2)); parts['suit'] = js
    cover = lambda P, W: ((P[:, 2] > Z(0.20)) & (P[:, 2] < Z(1.36)) & (wsum(W, FH) < 0.2) & (wsum(W, ['neck', 'head']) < 0.2)
                          & ~((P[:, 1] < 0) & (P[:, 2] > Z(1.25))))
    boot_top = Z(0.22)
else:
    # guard: long-sleeve shirt + trousers + belt
    def collar_filter(C):
        x, y, zz = C.T
        return ~((y < 0) & (zz > Z(1.33)) & (np.abs(x) < 0.01 + (zz - Z(1.33)) * 0.6))
    sh = garment((z0 > Z(0.88)) & (z0 < Z(1.42)) & (hd0 < 0.4) & (nh0 < 0.35), 'shirt', collar_filter)
    Ps = V(sh)
    cloth_shell(sh, bvh, 0.008 + 0.005 * smoothstep(Z(1.2), Z(0.95), Ps[:, 2]), smooth_iters=6, passes=3, pin=boundary_verts(sh))
    tear(sh); make_high(sh, 3, fold_fn(amp=1.0)); parts['shirt'] = sh
    wl = Z(0.96)
    tr = garment((z0 < wl) & (z0 > Z(0.19)) & (arm0 < 0.3), 'pants')
    Pt = V(tr)
    cloth_shell(tr, bvh, 0.012 + 0.012 * smoothstep(Z(0.6), Z(0.3), Pt[:, 2]), smooth_iters=6, passes=3, pin=boundary_verts(tr))
    # waist sits on top of the shirt tail
    Pt = V(tr); Pt += N(tr) * (0.004 * smoothstep(Z(0.88), Z(0.95), Pt[:, 2]))[:, None]; setV(tr, Pt)
    tear(tr); make_high(tr, 3, fold_fn(amp=1.1)); parts['pants'] = tr
    jb = bvh_of(tr); Pt = V(tr); band_z = Z(0.935)
    cen = Pt[np.abs(Pt[:, 2] - band_z) < 0.02].mean(0)
    def ring(zc, o_):
        pts, nrs = [], []
        for i in range(80):
            a = 2 * math.pi * i / 80; d = Vector((math.sin(a), -math.cos(a), 0)); c = Vector((cen[0], cen[1], zc - 0.008 * math.cos(a)))
            hit, nr, _, _ = jb.ray_cast(c + d * 0.4, -d, 0.5)
            if hit is None: hit, nr = c + d * 0.16, d
            nr = Vector((nr.x, nr.y, 0)).normalized()
            if nr.dot(d) < 0: nr = -nr
            pts.append(hit + nr * o_); nrs.append(nr)
        return pts, nrs
    tp, tn = ring(band_z + 0.019, 0.002); bp, bn = ring(band_z - 0.019, 0.002)
    belt = band_mesh('belt', tp, bp, tn, bn, 0.005); shade_smooth(belt, 40); parts['belt'] = belt
    fr = (tp[0] + bp[0]) / 2; fn_ = (tn[0] + bn[0]).normalized()
    bk = box_mesh('buckle', (0.058, 0.008, 0.045), 0.002, 2); place(bk, fr + fn_ * 0.009, Vector((1, 0, 0)), -fn_, Vector((0, 0, 1)))
    parts['buckle'] = bk
    cover = lambda P, W: ((((P[:, 2] > Z(0.90)) & (P[:, 2] < Z(1.36)) & (wsum(W, HAND) < 0.1)) | ((P[:, 2] > Z(0.21)) & (P[:, 2] < Z(0.95)) & (wsum(W, ARM) < 0.1)))
                          & (wsum(W, ['neck', 'head']) < 0.2) & ~((P[:, 1] < 0) & (P[:, 2] > Z(1.28))) & ~((P[:, 2] > Z(1.0)) & (np.abs(P[:, 0]) > 0.3)))
    boot_top = Z(0.27)

# ---- boots (shaft tube + convex-hull boot last)
bo = garment((z0 < U(boot_top) * S + SOLE) & (z0 > Z(0.075)) & (arm0 < 0.2), 'boots')
Pb = V(bo); cloth_shell(bo, bvh, 0.009 + 0.008 * smoothstep(Z(0.10), Z(0.16), Pb[:, 2]), smooth_iters=3, passes=2, pin=boundary_verts(bo))
hulls = []
for sx in (1, -1):
    fm = (z0 < Z(0.14)) & (P0[:, 0] * sx > 0.02) & (arm0 < 0.2)
    bm = bmesh.new()
    for p in P0[fm]: bm.verts.new(p)
    bmesh.ops.convex_hull(bm, input=bm.verts); me = bpy.data.meshes.new('hull'); bm.to_mesh(me); bm.free()
    ho = bpy.data.objects.new('boot_foot', me); link(ho)
    rm = ho.modifiers.new('rm', 'REMESH'); rm.mode = 'VOXEL'; rm.voxel_size = 0.0065; apply_modifier(ho, 'rm')
    Ph = V(ho); setV(ho, Ph + N(ho) * 0.009); smooth_verts(ho, 6, 0.5); hulls.append(ho)
foot = join(hulls, 'boot_feet'); shade_smooth(foot); Pf2 = V(foot)
b = smoothstep(SOLE + 0.02, SOLE - 0.004, Pf2[:, 2]); Pf2[:, 2] *= (1 - b); setV(foot, Pf2)
transfer_weights(foot, body0)
bo = join([bo, foot], 'boots')
bo_hi_src = dup(bo, 'boots_src')
decimate(bo, 0.4)
make_high(bo_hi_src, 1, lambda p, n: 0.0006 * nz(p[0] * 30, p[1] * 30, p[2] * 30) + 0.0015 * smoothstep(0.05, 0.0, abs(U(p[2]) - 0.10)) * nz(p[0] * 10, p[1] * 10, p[2] * 90))
parts['boots'] = bo

# ---- hide covered body faces (keep skin around holes), weights for clothes
W1 = weights(body, groups); P1 = V(body)
hide = cover(P1, W1) & (hole_field(P1) > 0.35)
hide |= (P1[:, 2] < boot_top - 0.03) & (wsum(W1, ARM) < 0.1)
delete_faces(body, face_mask_from_verts(body, hide, 'all'))
bm = bmesh.new(); bm.from_mesh(body.data)
bmesh.ops.delete(bm, geom=[v for v in bm.verts if not v.link_faces], context='VERTS'); bm.to_mesh(body.data); bm.free()
decimate(body, 0.5)
for n_, o in parts.items():
    transfer_weights(o, body0 if n_ not in ('belt', 'buckle') else body0)
    if n_ in ('belt', 'buckle', 'pants'):
        gi = {g.index: g.name for g in o.vertex_groups}; allow = ('hips', 'spine', 'lThigh', 'rThigh', 'lShin', 'rShin', 'lFoot', 'rFoot') if n_ == 'pants' else ('hips',)
        for v in o.data.vertices:
            ws = [(gi[g.group], g.weight) for g in v.groups if g.weight > 0]; keep = [(k, w) for k, w in ws if k in allow]
            if len(keep) != len(ws):
                tot = sum(w for _, w in keep)
                for g in list(v.groups): g.weight = 0.0
                if tot < 1e-4: keep, tot = [('hips', 1.0)], 1.0
                for k, w in keep: o.vertex_groups[k].add([v.index], w / tot, 'REPLACE')
for e, s in ((eL, 'l'), (eR, 'r')): rigid_weight(e, 'head')
log('clothes', {k: tri_count(o) for k, o in parts.items()}, 'body', tri_count(body))

# ============================================================ UV + atlas
def fresh_uv(o):
    while len(o.data.uv_layers): o.data.uv_layers.remove(o.data.uv_layers[0])
    o.data.uv_layers.new(name='UVMap'); smart_uv(o, 60, 0.003)
ORDER = ['skin', 'eyes'] + list(parts.keys())
ID = {n: i for i, n in enumerate(ORDER)}
def set_id(o, n):
    while len(o.data.materials): o.data.materials.pop()
    o.data.materials.append(bpy.data.materials.new('id_' + n))
    for p_ in o.data.polygons: p_.material_index = 0
for n_, o in parts.items(): fresh_uv(o); set_id(o, n_)
eyes = join([eL, eR], 'z_eyes'); fresh_uv(eyes); set_id(eyes, 'eyes')
set_id(body, 'skin')
# head gets 1.7x texel density
Wb = weights(body, groups); headv = (Wb[:, groups.index('head')] + Wb[:, groups.index('neck')]) > 0.5
log('headv', int(headv.sum()), len(headv))
nb = len(body.data.vertices)
mesh = join([body, eyes] + list(parts.values()), 'zombie_' + VAR)
pack_uv(mesh)
Pm_ = V(mesh); hv = np.zeros(len(Pm_), bool); hv[:nb] = headv if len(headv) == nb else False
uv = mesh.data.uv_layers.active.data
for sel, k in (([p for p in mesh.data.polygons if p.material_index == ID['skin']], 1.45), ([p for p in mesh.data.polygons if hv[p.vertices[0]]], 1.6)):
    loops = [li for p in sel for li in p.loop_indices]
    if not loops: log('no loops for uv scale', k); continue
    A = np.array([uv[l].uv[:] for l in loops]); c = A.mean(0)
    for l, a in zip(loops, A): uv[l].uv = tuple(c + (a - c) * k)
pack_only(mesh, 0.003)
# high: body level 3 + cloth highs + eye copies
eyes_hi = dup(mesh, 'tmp'); delete_faces(eyes_hi, np.array([p.material_index != ID['eyes'] for p in eyes_hi.data.polygons]))
for g in list(eyes_hi.vertex_groups): eyes_hi.vertex_groups.remove(g)
zhigh = join([high, eyes_hi] + highs, 'zombie_high'); zhigh.hide_render = True
normalize_limit(mesh)
bm = bmesh.new(); bm.from_mesh(mesh.data); bmesh.ops.triangulate(bm, faces=bm.faces[:]); bm.to_mesh(mesh.data); bm.free()
log('uv done', tri_count(mesh))

# ============================================================ shading
Pm = V(mesh)
face = Pm[(np.abs(Pm[:, 0]) < 0.004) & (Pm[:, 2] > joints['neck'][2] + 0.03)]
nose = face[np.argmin(face[:, 1])] if len(face) else np.array(joints['head']) + np.array([0, -0.1, 0])
MOUTH = nose + np.array([0, 0.012, -0.045 * S])
EYEC = [np.array(joints['lEye']), np.array(joints['rEye'])]
if VAR == 'prisoner':
    WOUNDS = [((0.055, -0.035, Z(1.40)), 0.035), ((0.26, -0.03, Z(0.98)), 0.022), ((-0.045, -0.095, Z(1.52)), 0.016), ((-0.13, 0.02, Z(1.08)), 0.045), ((0.10, -0.11, Z(0.47)), 0.03)]
else:
    WOUNDS = [((-0.06, -0.03, Z(1.39)), 0.04), ((0.12, -0.12, Z(1.12)), 0.035), ((-0.32, -0.02, Z(0.9)), 0.02), ((0.05, -0.10, Z(1.55)), 0.014)]
WC = np.array([w[0] for w in WOUNDS]); WR = np.array([w[1] for w in WOUNDS])
def wound_field(P):
    d = np.min(np.linalg.norm(P[:, None, :] - WC[None], axis=2) / WR[None], axis=1)
    return d + fbm(P, 3, scale=60.0) * 0.45
def blood_drip(P, src, width, length, seed):
    """Streaks running down (-z) from a source point."""
    x, y, z = P.T; dz = src[2] - z
    lat = np.sqrt((x - src[0]) ** 2 + (y - src[1]) ** 2 * 0.3)
    q = np.stack([x * 55 + seed, y * 55, np.zeros_like(x)], -1)
    streak = ss(0.1, 0.6, perlin(q) * 0.5 + 0.5 + 0.3 * perlin(q * 2.3))
    ln = length * (0.25 + 0.75 * ss(-0.4, 0.6, perlin(q * 0.7 + 11.0)))
    w = width * (1 + 0.5 * perlin(np.stack([x * 20, y * 20, z * 3 + seed], -1)))
    return ss(w, w * 0.4, lat) * (dz > -0.01) * ss(ln, ln * 0.2, dz) * (0.25 + 0.75 * streak)
TEXT = Image.new('L', (1600, 700), 0); dr = ImageDraw.Draw(TEXT)
font = ImageFont.truetype('/usr/share/fonts/msttcore/impact.ttf', 230) if os.path.exists('/usr/share/fonts/msttcore/impact.ttf') else ImageFont.load_default()
if VAR == 'prisoner':
    dr.text((800, 200), 'ROCKFORT', fill=255, font=font, anchor='mm'); dr.text((800, 480), 'P-0413', fill=255, font=font, anchor='mm')
else:
    f2 = ImageFont.truetype('/usr/share/fonts/msttcore/impact.ttf', 200) if os.path.exists('/usr/share/fonts/msttcore/impact.ttf') else font
    dr.text((800, 200), 'ROCKFORT', fill=255, font=f2, anchor='mm'); dr.text((800, 470), 'SECURITY', fill=255, font=f2, anchor='mm')
TXT = np.array(TEXT, np.float32) / 255.0
def text_at(u, v):
    H, W = TXT.shape; ok = (u >= 0) & (u <= 1) & (v >= 0) & (v <= 1)
    xi = (np.clip(u, 0, 0.999) * (W - 1)).astype(int); yi = (np.clip(1 - v, 0, 0.999) * (H - 1)).astype(int)
    return TXT[yi, xi] * ok

def shade(P, Nn, ids):
    n = len(P); x, y, z = P.T
    col = np.zeros((n, 3), np.float32); rough = np.full(n, 0.7, np.float32); metal = np.zeros(n, np.float32); h = np.zeros(n, np.float32)
    lo = fbm(P, 3, scale=6.0); mid = fbm(P, 3, scale=35.0); hi = fbm(P, 2, scale=240.0)
    def M(k): return ids == ID[k] if k in ID else np.zeros(n, bool)
    wf = wound_field(P)
    # blood: mouth drool over chin/neck/chest (skin AND clothes), random splatter
    drip = np.maximum(blood_drip(P, MOUTH, 0.028, 0.45, 1.0), blood_drip(P, MOUTH + np.array([0.02, 0, -0.02]), 0.012, 0.6, 5.0))
    for c, r in WOUNDS: drip = np.maximum(drip, blood_drip(P, np.array(c), r * 0.7, 0.35, c[0] * 50))
    spl = ss(0.62, 0.75, fbm(P, 4, scale=18.0) * 0.5 + 0.5) * ss(0.2, 0.8, perlin(P * 120) * 0.5 + 0.5)
    blood = np.clip(np.maximum(drip, spl * 0.8), 0, 1)
    blood_col = mix3(np.array([0.10, 0.006, 0.004]), np.array([0.035, 0.008, 0.004]), ss(-0.3, 0.5, mid))  # fresh -> dried
    grime = ss(0.0, 0.7, fbm(P, 4, scale=9.0) * 0.5 + 0.5 + ss(Z(0.6), Z(0.1), z) * 0.45)
    # ---------------- skin
    m = M('skin')
    if np.any(m):
        base = np.array([0.15, 0.125, 0.095]) if VAR == 'prisoner' else np.array([0.14, 0.125, 0.10])
        c = base * (1 + 0.14 * lo[:, None] + 0.06 * mid[:, None])
        c = mix3(c, np.array([0.20, 0.23, 0.17]), ss(0.1, 0.6, lo) * 0.5)                       # greenish decay mottling
        c = mix3(c, np.array([0.17, 0.10, 0.16]), ss(0.25, 0.75, fbm(P, 3, scale=11.0)) * 0.55)  # bruising / lividity
        r1 = np.abs(perlin(P * 22.0 + 3.1)); r2 = np.abs(perlin(P * 55.0 + 7.7))
        vein = np.maximum(ss(0.05, 0.0, r1), ss(0.035, 0.0, r2) * 0.7) * ss(0.0, 0.45, fbm(P, 3, scale=9.0))
        vein_zone = ss(0.2, 0.0, np.abs(z - joints['neck'][2])) + ss(0.3, 0.1, np.abs(np.abs(x) - 0.3)) * 0.7 + 0.35
        c = mix3(c, np.array([0.08, 0.09, 0.14]), np.clip(vein * vein_zone, 0, 1) * 0.7)
        for e in EYEC:                                                                           # sunken dark sockets
            d = np.linalg.norm(P - e, axis=1); c = mix3(c, np.array([0.07, 0.04, 0.05]), ss(0.04, 0.012, d) * 0.85)
        dm = np.linalg.norm((P - MOUTH) * np.array([1, 1.4, 2.2]), axis=1)
        c = mix3(c, np.array([0.08, 0.035, 0.04]), ss(0.03, 0.01, dm))                           # grey-purple lips
        hd = np.array(joints['head']); lEy = EYEC[0]
        scalp = ss(lEy[2] + 0.025, lEy[2] + 0.05, z) * ss(-0.075, -0.055, y - hd[1]) + ss(lEy[2] - 0.02, lEy[2] + 0.02, z) * ss(0.02, 0.05, y - hd[1])
        scalp = np.clip(scalp, 0, 1) * (z > joints['neck'][2] + 0.05) * (wsum_head > 0.5 if False else 1)
        stub = ss(0.2, 0.7, perlin(P * 2500) * 0.5 + 0.5)
        c = mix3(c, np.array([0.03, 0.025, 0.02]) * (1 + 0.3 * mid[:, None]), scalp * (0.55 + 0.35 * stub))
        brow = np.zeros(n)
        for e in EYEC:
            d = (P - e) * np.array([1.0, 1.0, 2.2]) - np.array([0, 0, 0.022 * 2.2]); brow = np.maximum(brow, ss(0.022, 0.012, np.linalg.norm(d, axis=1)) * (y < e[1] + 0.005))
        c = mix3(c, np.array([0.025, 0.02, 0.016]), brow * 0.7 * stub)
        tips = ss(0.03, 0.0, np.min([np.linalg.norm(P - np.array(joints[s + 'HandTip']), axis=1) for s in 'lr'], axis=0))
        c = mix3(c, np.array([0.16, 0.13, 0.07]), tips * 0.6)
        wd = ss(1.0, 0.55, wf); rim = ss(1.35, 1.0, wf) * (1 - wd)
        F1w, _ = worley(P, 450.0)
        flesh = mix3(np.array([0.16, 0.01, 0.01]), np.array([0.28, 0.06, 0.05]), ss(0.1, 0.35, F1w))
        c = mix3(c, np.array([0.12, 0.04, 0.025]), rim * 0.8); c = mix3(c, flesh, wd)
        c = mix3(c, c * 0.55 + np.array([0.02, 0.015, 0.01]), grime * 0.5)
        c = mix3(c, blood_col, blood * 0.9)
        col[m] = c[m]
        Fp, _ = worley(P, 1800.0)
        rough[m] = (0.6 + 0.08 * mid - 0.3 * wd - 0.25 * blood * (mid < 0) + 0.1 * grime)[m]
        h[m] = (-0.00002 * Fp - 0.0022 * wd + 0.0006 * rim + 0.0003 * vein - 0.00025 * F1w * wd + 0.00004 * hi)[m]
    # ---------------- eyes: milky, clouded
    m = M('eyes')
    if np.any(m):
        c = np.tile(np.array([0.55, 0.52, 0.42]), (n, 1))
        for e in EYEC:
            d = P - e; fw = -d[:, 1] / (np.linalg.norm(d, axis=1) + 1e-6); sel = np.linalg.norm(d, axis=1) < 0.03
            iris = ss(0.93, 0.96, fw) & sel if False else ss(0.93, 0.96, fw) * sel
            c = mix3(c, np.array([0.45, 0.47, 0.46]), iris * 0.8)
            c = mix3(c, np.array([0.25, 0.26, 0.25]), ss(0.985, 0.995, fw) * sel * 0.6)
            vv = ss(0.05, 0.0, np.abs(perlin(P * 900))) * ss(0.9, 0.5, fw) * sel
            c = mix3(c, np.array([0.35, 0.03, 0.02]), vv * 0.7)
        col[m] = c[m]; rough[m] = 0.15
    # ---------------- clothes
    theta = np.arctan2(x, -(y + 0.01))
    weave = perlin(P * np.array([2200, 2200, 2200])) * 0.5 + perlin(P * np.array([900, 900, 3000])) * 0.5
    hf = hole_field(P); fray = ss(0.18, 0.0, hf)
    def cloth(mask, base, seams=True, printed=False):
        if not np.any(mask): return
        c = base * (1 + 0.16 * lo[:, None] + 0.08 * mid[:, None] + 0.06 * weave[:, None])
        c = mix3(c, base * 1.5 + 0.02, ss(0.3, 0.9, hi) * 0.25)                                  # worn/faded fibres
        hh = 0.00003 * weave
        if seams:
            sd = np.minimum(np.abs(x), np.abs(np.abs(theta) - math.pi / 2) * 0.12)
            sm = line_mask(sd, 0.0016, 0.0008); st = stitches(sd - 0.004, z) + stitches(sd + 0.004, z)
            c = mix3(c, c * 0.6, sm * 0.7); c = mix3(c, base * 1.8, st * 0.5); hh = hh - 0.0002 * sm + 0.00008 * st
        if printed:
            u = (0.16 - x) / 0.32; v = (z - Z(1.02)) / 0.14
            t = text_at(u, v) * (y > 0.02) * (1 - 0.5 * ss(0.3, 0.8, hi))
            c = mix3(c, np.array([0.55, 0.52, 0.45]) if VAR == 'prisoner' else np.array([0.5, 0.45, 0.25]), t * 0.9)
        c = mix3(c, c * 0.35 + np.array([0.03, 0.022, 0.012]), grime * 0.55)
        c = mix3(c, np.array([0.05, 0.035, 0.02]), fray * 0.8)
        c = mix3(c, blood_col * 1.1, blood)
        col[mask] = c[mask]; rough[mask] = (0.82 + 0.06 * mid - 0.35 * blood * (mid < 0))[mask]; h[mask] = (hh + 0.0002 * fray * perlin(P * 3000))[mask]
    if VAR == 'prisoner':
        cloth(M('suit'), np.array([0.17, 0.062, 0.022]), printed=True)
    else:
        m = M('shirt')
        if np.any(m):
            cloth(m, np.array([0.020, 0.028, 0.052]), printed=True)
            bt = (np.abs(x) < 0.008) & (y < 0) & (np.abs(np.mod(z - Z(1.0), 0.085) - 0.042) < 0.006)
            col[m & bt] = np.array([0.02, 0.02, 0.02]); h[m & bt] = 0.0004
            pk = (np.abs(np.abs(x) - 0.09) < 0.05) & (y < 0) & (np.abs(z - Z(1.25)) < 0.035)
            ed = pk & ~((np.abs(np.abs(x) - 0.09) < 0.046) & (np.abs(z - Z(1.25)) < 0.031))
            col[m & ed] *= 0.5; h[m & ed] = 0.0003
        cloth(M('pants'), np.array([0.018, 0.022, 0.038]))
        m = M('belt')
        if np.any(m): col[m] = (np.array([0.02, 0.018, 0.016]) * (1 + 0.2 * mid[:, None]))[m]; rough[m] = 0.45
        m = M('buckle')
        if np.any(m): col[m] = np.array([0.5, 0.48, 0.45]); rough[m] = 0.35; metal[m] = 1
    m = M('boots')
    if np.any(m):
        sole = ss(SOLE + 0.004, SOLE - 0.002, z)
        c = np.array([0.012, 0.009, 0.007]) * (1 + 0.25 * mid[:, None]); c = mix3(c, np.array([0.07, 0.06, 0.05]), ss(0.4, 0.9, hi) * 0.4)
        c = mix3(c, np.array([0.008, 0.008, 0.008]), sole); c = mix3(c, np.array([0.03, 0.025, 0.018]), grime * 0.3)
        crease = ss(0.05, 0.0, np.abs(perlin(P * np.array([60, 60, 400]))))
        col[m] = c[m]; rough[m] = (0.62 + 0.2 * grime - 0.1 * crease)[m]; h[m] = (0.0003 * crease * ss(Z(0.08), Z(0.12), z) + 0.00003 * hi)[m]
    return col, np.clip(rough, 0.08, 1), metal, h

def build_set(o, name, size, high_obj):
    pos = bake_emit(o, size, 'pos'); nrm = bake_emit(o, size, 'nrm'); cov, P, Nn = decode(pos, nrm)
    idm = bake_emit(o, size, 'id'); idc = (np.round(idm[..., 0][cov] * 64) - 1).astype(int)
    log('shading', int(cov.sum()))
    col, rough, metal, h = shade(P[cov], Nn[cov], idc)
    def full(v, ch):
        a = np.zeros((size, size, ch) if ch > 1 else (size, size), np.float32); a[cov] = v; return a
    ao = bake_ao(o, 1024, 24, 0.08)
    if 1024 != size: ao = np.array(Image.fromarray((ao * 255).astype(np.uint8)).resize((size, size), Image.BILINEAR), np.float32) / 255.0
    albedo = finish(full(col, 3) * (0.5 + 0.5 * ao[..., None]), cov)
    orm = np.stack([ao, finish(full(rough, 1), cov), finish(full(metal, 1), cov)], -1)
    log('normal...')
    gn = bake_normal_from_high(o, high_obj, size, 0.008, 0.025)[..., :3]
    n_ = gn * 2 - 1; inv = n_[..., 2] < -0.35; n_[inv] = -n_[inv]; gn = (n_ + 1) * 0.5
    bad = (n_[..., 2] < 0.35) | ~np.isfinite(n_).all(-1); gn[bad] = (0.5, 0.5, 1.0)
    nf = bake_combined_normal(o, gn, finish(full(h, 1), cov), size, 1.0)[..., :3]
    n_ = nf * 2 - 1; nf[n_[..., 2] < 0.2] = (0.5, 0.5, 1.0)
    TEXD = '/data/assets_src/tex/zombie'
    save_rgb(albedo, f'{TEXD}/{name}_albedo.jpg', 88); save_rgb(nf, f'{TEXD}/{name}_normal.jpg', 90, srgb=False)
    Image.fromarray((np.clip(orm[::-1], 0, 1) * 255).astype(np.uint8)).resize((size // 2, size // 2), Image.LANCZOS).save(f'{TEXD}/{name}_orm.jpg', quality=88)
    return [f'{TEXD}/{name}_{k}.jpg' for k in ('albedo', 'normal', 'orm')]
sc.render.engine = 'CYCLES'; sc.cycles.device = 'CPU'
for o in bpy.data.objects:
    if o.type == 'MESH' and o is not mesh: o.hide_render = True
paths = build_set(mesh, 'zombie_' + VAR, Q, zhigh)
log('textures saved')
def load(p, nc=False):
    im = bpy.data.images.load(p, check_existing=False)
    if nc: im.colorspace_settings.name = 'Non-Color'
    return im
mat = export_material('zombie_' + VAR, load(paths[0]), load(paths[1], True), load(paths[2], True))
while len(mesh.data.materials): mesh.data.materials.pop()
mesh.data.materials.append(mat)
for p in mesh.data.polygons: p.material_index = 0
for o in list(bpy.data.objects):
    if o.type == 'MESH' and o is not mesh: bpy.data.objects.remove(o)
mesh.parent = rig; mod = mesh.modifiers.new('rig', 'ARMATURE'); mod.object = rig
bpy.context.view_layer.update()
export_glb(f'{OUT_GLB}/zombie_{VAR}.glb', [rig, mesh])
save_blend(f'{OUT_BLEND}/zombie_{VAR}.blend')
log('DONE tris', tri_count(mesh))
