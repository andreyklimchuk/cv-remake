"""Steve Burnside (CODE: Veronica) — Blender Studio male base mesh (CC0) + rig + outfit
   (navy short-sleeve jacket with white trim, yellow tank top, tiger-stripe camo cargo pants, laced boots,
   belt with silver buckle, choker, wristbands), auburn curtain hair (cap + cards), shape keys blink/pain/grip.
   Separate baked texture sets: skin / outfit / eyes + strand hair atlas.  TEXSIZE=2048 python3 tools/steve.py"""
import sys, os, json, time, math; sys.path.insert(0, '/data/assets_src/tools')
from lib import *
from bakekit import *
from texlib import *
from claire_shapekeys import add_shape_keys
from PIL import Image, ImageDraw, ImageFont
from mathutils import noise
import random
Q = int(os.environ.get('TEXSIZE', '2048'))
T0 = time.time()
def log(*a): print('[%5.1fs]' % (time.time() - T0), 'steve', *a, flush=True)
S = 1.74 / 1.684; SOLE = 0.022
def Z(z): return z * S + SOLE
def U(z): return (z - SOLE) / S
TEXD = '/data/assets_src/tex/steve'; os.makedirs(TEXD, exist_ok=True)
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
FJ = {'hips': (0, .005, .905), 'spine': (0, .01, .985), 'neck': (0, -.01, 1.40), 'head': (0, -.035, 1.475), 'headTop': (0, -.03, 1.64)}
for s, sx in (('l', 1), ('r', -1)):
    FJ.update({s + 'UpperArm': (.165 * sx, .01, 1.315), s + 'Forearm': (.238 * sx, .02, 1.07), s + 'Hand': (.337 * sx, -.022, .884),
               s + 'HandTip': (.395 * sx, -.07, .765), s + 'Thigh': (.085 * sx, 0, .865), s + 'Shin': (.11 * sx, 0, .46),
               s + 'Foot': (.12 * sx, .045, .08), s + 'Toe': (.13 * sx, -.10, .02)})
Pf = V(fem); Pm0 = V(male)
jm = {}
for k, v in FJ.items():
    v = np.array(v); r = 0.11 if k in ('hips', 'spine') else 0.06 if 'Toe' not in k and 'Tip' not in k else 0.04
    ratio = 1.684 / 1.641
    for rr in (r, r * 1.6, r * 2.5, r * 4):
        idx = np.where(np.linalg.norm(Pf - v, axis=1) < rr)[0]
        if len(idx) >= 4: break
    jm[k] = Pm0[idx].mean(0) + (v - Pf[idx].mean(0)) * ratio if len(idx) >= 4 else v * ratio
bpy.data.objects.remove(fem)
# slimmer teen build: narrow the torso/arms a little around the body axis
def slim(o):
    P = V(o); z = P[:, 2]
    k = 1 - 0.06 * np.clip((z - 0.85) / 0.3, 0, 1) * np.clip((1.45 - z) / 0.1, 0, 1)
    P[:, 0] *= k; P[:, 1] = (P[:, 1] - 0.0) * (1 - 0.04 * np.clip((z - 0.9) / 0.3, 0, 1) * np.clip((1.40 - z) / 0.1, 0, 1)); setV(o, P)
high = dup(male, 's_high'); high.modifiers[0].levels = 3; apply_modifier(high, high.modifiers[0].name)
body0 = dup(male, 's_body_l0'); body0.modifiers.remove(body0.modifiers[0])
body = male; body.modifiers[0].levels = 1; apply_modifier(body, body.modifiers[0].name)
body.name = 'steve_body'; shade_smooth(body)
for o in (body, body0, high): slim(o)
for o in (body, body0, high, eL, eR):
    o.location = o.location * S + Vector((0, 0, SOLE)); o.scale = (S, S, S); apply_transform(o)
joints = {k: Vector(v) * S + Vector((0, 0, SOLE)) for k, v in jm.items()}
for k in list(joints):
    v = joints[k]; z = (v.z - SOLE) / S
    kx = 1 - 0.06 * min(1, max(0, (z - 0.85) / 0.3)) * min(1, max(0, (1.45 - z) / 0.1)); joints[k] = Vector((v.x * kx, v.y, v.z))
joints['lEye'] = Vector(V(eL).mean(0)); joints['rEye'] = Vector(V(eR).mean(0))
ad = bpy.data.armatures.new('steve_rig'); rig = bpy.data.objects.new('steve_rig', ad); link(rig)
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
for s in 'lr':
    e = joints[s + 'Eye']; bone(s + 'Eye', e, e + Vector((0, -0.02, 0)), 'head')
bpy.ops.object.mode_set(mode='OBJECT')
select_only([body0, rig], rig)
with ctx(rig, [body0, rig]): bpy.ops.object.parent_set(type='ARMATURE_AUTO')
for g in list(body0.vertex_groups):
    if g.name in ('lEye', 'rEye'): body0.vertex_groups.remove(g)
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
highs = []
def make_high(o, levels, fold):
    h = dup(o, o.name + '_high')
    for g in list(h.vertex_groups): h.vertex_groups.remove(g)
    subdivide(h, levels); displace_along_normals(h, fold); h.hide_render = True; highs.append(h); return h
def garment(vmask, name, ffilter=None):
    f = face_mask_from_verts(body0, vmask, 'all')
    if ffilter is not None: f &= ffilter(centers(body0))
    o = extract_faces(body0, f, name)
    for m in list(o.modifiers): o.modifiers.remove(m)
    o.parent = None; o.hide_render = False
    smooth_boundary(o, 14)
    return o
def fold_fn(amp=1.0):
    def f(p, n):
        x, y, z = p; zz = U(z)
        knee = smoothstep(0.08, 0.0, abs(zz - 0.46)); elbow = smoothstep(0.08, 0.0, abs(zz - 1.17)) * smoothstep(0.12, 0.2, abs(x))
        crotch = smoothstep(0.08, 0.0, abs(zz - 0.80)) * smoothstep(0.13, 0.05, abs(x)); waist = smoothstep(0.05, 0.0, abs(zz - 0.95))
        ankle = smoothstep(0.1, 0.0, abs(zz - 0.26))
        return amp * (0.0011 * nz(x * 9, y * 9, z * 22) + 0.004 * knee * nz(x * 7, y * 7, z * 55) + 0.003 * elbow * nz(x * 40, y * 12, z * 30)
                      + 0.0028 * crotch * nz(x * 26 + z * 22, y * 9, z * 24) + 0.002 * waist * nz(x * 5, y * 5, z * 70)
                      + 0.0045 * ankle * nz(x * 9, y * 9, z * 70) + 0.00025 * nz(x * 110, y * 110, z * 110))
    return f
parts = {}
# ---- yellow tank top
def tank_filter(C):
    x, y, zz = C.T
    return ~(((y < 0) & (zz > Z(1.30) - 0.0 * x)) | ((y > 0) & (zz > Z(1.36))) | ((np.abs(x) > 0.105) & (zz > Z(1.33))))
tk = garment((z0 > Z(0.90)) & (z0 < Z(1.42)) & (arm0 < 0.25) & (nh0 < 0.3), 'tank', tank_filter)
cloth_shell(tk, bvh, 0.0035, smooth_iters=6, passes=3, pin=boundary_verts(tk)); make_high(tk, 2, fold_fn(0.6)); parts['tank'] = tk
tbvh = bvh_of(tk)
# ---- navy jacket: short sleeves, stand collar, open front
def vest_filter(C):
    x, y, zz = C.T
    opening = (y < 0) & (np.abs(x) < 0.045 + 0.05 * smoothstep(Z(1.05), Z(1.36), zz)) & (zz > Z(0.9))
    return ~opening
vmask = (z0 > Z(0.92)) & (z0 < Z(1.43)) & (fh0 < 0.35) & (nh0 < 0.55) & ~((arm0 > 0.5) & (z0 < Z(1.17)))
vs = garment(vmask, 'jacket', vest_filter)
Pv = V(vs)
offv = 0.014 + 0.008 * smoothstep(Z(1.15), Z(0.95), Pv[:, 2]) + 0.004 * smoothstep(0.15, 0.22, np.abs(Pv[:, 0]))
cloth_shell(vs, bvh, offv, smooth_iters=6, passes=3, pin=boundary_verts(vs))
Pv = V(vs); hit = np.zeros(len(Pv), bool)
for i, p in enumerate(Pv):
    loc, nr, _, d = tbvh.find_nearest(Vector(p))
    if loc is not None and d < 0.008: Pv[i] = np.array(loc + nr * 0.008)
setV(vs, Pv)
solidify(vs, 0.004)
make_high(vs, 2, fold_fn(1.1)); parts['jacket'] = vs
# ---- tiger-stripe camo cargo pants (bloused at the ankles)
tr = garment((z0 < Z(0.985)) & (z0 > Z(0.20)) & (arm0 < 0.3), 'pants')
Pt = V(tr)
cloth_shell(tr, bvh, 0.016 + 0.016 * smoothstep(Z(0.75), Z(0.35), Pt[:, 2]) - 0.01 * smoothstep(Z(0.30), Z(0.22), Pt[:, 2]), smooth_iters=6, passes=3, pin=boundary_verts(tr))
make_high(tr, 3, fold_fn(1.3)); parts['pants'] = tr
# cargo pockets (outer thigh) as raised patches
for sx in (1, -1):
    c = Vector((sx * 0.16, -0.01, Z(0.58)))
    pts, nrs = ray_ring(bvh_of(tr), c, (0, 0, 1), (sx, 0, 0), 12, 0.003, 0.4, -0.75, 0.75, closed=False)
    top = pts; bot = [p - Vector((0, 0, 0.16)) for p in pts]
    pk = band_mesh('pocket', top, bot, nrs, nrs, 0.008, closed=False); parts['pocket%d' % (sx > 0)] = pk
# ---- belt + buckle
jb = bvh_of(tr); Pt = V(tr); band_z = Z(0.955)
cen = Pt[np.abs(Pt[:, 2] - band_z) < 0.02].mean(0)
def ring(zc, o_):
    pts, nrs = [], []
    for i in range(80):
        a = 2 * math.pi * i / 80; d = Vector((math.sin(a), -math.cos(a), 0)); c = Vector((cen[0], cen[1], zc - 0.008 * math.cos(a)))
        hit_, nr, _, _ = jb.ray_cast(c + d * 0.4, -d, 0.5)
        if hit_ is None: hit_, nr = c + d * 0.16, d
        nr = Vector((nr.x, nr.y, 0)).normalized()
        if nr.dot(d) < 0: nr = -nr
        pts.append(hit_ + nr * o_); nrs.append(nr)
    return pts, nrs
tp, tn = ring(band_z + 0.02, 0.002); bp, bn = ring(band_z - 0.02, 0.002)
belt = band_mesh('belt', tp, bp, tn, bn, 0.005); shade_smooth(belt, 40); parts['belt'] = belt
fr = (tp[0] + bp[0]) / 2; fn_ = (tn[0] + bn[0]).normalized()
bpy.ops.mesh.primitive_cylinder_add(radius=0.034, depth=0.01, vertices=32); bk = bpy.context.active_object; bk.name = 'buckle'
bk.scale = (1.0, 0.72, 1); apply_transform(bk)
m = bk.modifiers.new('bev', 'BEVEL'); m.width = 0.003; m.segments = 2; apply_modifier(bk, 'bev')
place(bk, fr + fn_ * 0.012, Vector((1, 0, 0)), Vector((0, 0, 1)), -fn_)
parts['buckle'] = bk
# ---- choker + wristbands
nk = joints['neck']; hd = joints['head']
nc = nk.lerp(hd, 0.30) + Vector((0, 0.012, 0))
t1, n1 = ray_ring(bvh, nc + Vector((0, 0, 0.010)), (0, -0.22, 1), (1, 0, 0), 48, 0.002, 0.12, inside=True)
t2, n2 = ray_ring(bvh, nc - Vector((0, 0, 0.010)), (0, -0.22, 1), (1, 0, 0), 48, 0.002, 0.12, inside=True)
ch = band_mesh('choker', t1, t2, n1, n2, 0.0035); shade_smooth(ch, 40); parts['choker'] = ch
for s in 'lr':
    w = joints[s + 'Hand']; f = joints[s + 'Forearm']; d = (w - f).normalized()
    c0 = w - d * 0.045
    # cast from inside the wrist outward: rays from outside would hit the hip next to the hanging hand
    a1, an1 = ray_ring(bvh, c0 + d * 0.028, d, (0, 0, 1) if abs(d.z) < 0.9 else (1, 0, 0), 40, 0.002, 0.07, inside=True)
    a2, an2 = ray_ring(bvh, c0 - d * 0.028, d, (0, 0, 1) if abs(d.z) < 0.9 else (1, 0, 0), 40, 0.002, 0.07, inside=True)
    wb = band_mesh('wrist_' + s, a1, a2, an1, an2, 0.006); shade_smooth(wb, 40); parts['wrist_' + s] = wb
# ---- boots (laced, tan leather)
boot_top = Z(0.27)
bo = garment((z0 < boot_top) & (z0 > Z(0.075)) & (arm0 < 0.2), 'boots')
Pb = V(bo); cloth_shell(bo, bvh, 0.010 + 0.008 * smoothstep(Z(0.10), Z(0.16), Pb[:, 2]), smooth_iters=3, passes=2, pin=boundary_verts(bo))
hulls = []
for sx in (1, -1):
    fm = (z0 < Z(0.14)) & (P0[:, 0] * sx > 0.02) & (arm0 < 0.2)
    bm = bmesh.new()
    for p in P0[fm]: bm.verts.new(p)
    bmesh.ops.convex_hull(bm, input=bm.verts); me = bpy.data.meshes.new('hull'); bm.to_mesh(me); bm.free()
    ho = bpy.data.objects.new('boot_foot', me); link(ho)
    rm = ho.modifiers.new('rm', 'REMESH'); rm.mode = 'VOXEL'; rm.voxel_size = 0.0065; apply_modifier(ho, 'rm')
    Ph = V(ho); setV(ho, Ph + N(ho) * 0.010); smooth_verts(ho, 6, 0.5); hulls.append(ho)
foot = join(hulls, 'boot_feet'); shade_smooth(foot); Pf2 = V(foot)
b_ = smoothstep(SOLE + 0.02, SOLE - 0.004, Pf2[:, 2]); Pf2[:, 2] *= (1 - b_); setV(foot, Pf2)
transfer_weights(foot, body0)
bo = join([bo, foot], 'boots')
bo_hi_src = dup(bo, 'boots_src'); decimate(bo, 0.4)
make_high(bo_hi_src, 1, lambda p, n: 0.0006 * nz(p[0] * 30, p[1] * 30, p[2] * 30) + 0.0015 * smoothstep(0.05, 0.0, abs(U(p[2]) - 0.10)) * nz(p[0] * 10, p[1] * 10, p[2] * 90))
parts['boots'] = bo
# ---- hide covered body
W1 = weights(body, groups); P1 = V(body)
cover = (((P1[:, 2] > Z(0.92)) & (P1[:, 2] < Z(1.28)) & (wsum(W1, ARM) < 0.1)) | ((P1[:, 2] > Z(0.22)) & (P1[:, 2] < Z(0.95)) & (wsum(W1, ARM) < 0.1))) & (wsum(W1, ['neck', 'head']) < 0.2)
cover |= (P1[:, 2] < boot_top - 0.03) & (wsum(W1, ARM) < 0.1)
delete_faces(body, face_mask_from_verts(body, cover, 'all'))
bm = bmesh.new(); bm.from_mesh(body.data)
bmesh.ops.delete(bm, geom=[v for v in bm.verts if not v.link_faces], context='VERTS'); bm.to_mesh(body.data); bm.free()
decimate(body, 0.55)
ALLOWW = {'belt': ('hips', 'spine'), 'buckle': ('hips',), 'pants': ('hips', 'spine', 'lThigh', 'rThigh', 'lShin', 'rShin', 'lFoot', 'rFoot'),
          'pocket0': ('rThigh',), 'pocket1': ('lThigh',), 'choker': ('neck',), 'wrist_l': ('lForearm', 'lHand'), 'wrist_r': ('rForearm', 'rHand')}
for n_, o in parts.items():
    transfer_weights(o, body0)
    if n_ in ALLOWW:
        allow = ALLOWW[n_]; gi = {g.index: g.name for g in o.vertex_groups}
        for gname in allow:
            if gname not in o.vertex_groups: o.vertex_groups.new(name=gname)
        for v in o.data.vertices:
            ws = [(gi.get(g.group, ''), g.weight) for g in v.groups if g.weight > 0]; keep = [(k, w) for k, w in ws if k in allow]
            if len(keep) != len(ws) or not keep:
                tot = sum(w for _, w in keep)
                for g in list(v.groups): g.weight = 0.0
                if tot < 1e-4: keep, tot = [(allow[0], 1.0)], 1.0
                for k, w in keep: o.vertex_groups[k].add([v.index], w / tot, 'REPLACE')
for e, s in ((eL, 'lEye'), (eR, 'rEye')): rigid_weight(e, s)
log('clothes', {k: tri_count(o) for k, o in parts.items()}, 'body', tri_count(body))

# ============================================================ hair (cap + cards)
Wb = weights(body, groups); Pb = V(body)
Hv = Pb[(Wb[:, groups.index('head')] > 0.6) & (Pb[:, 2] > joints['lEye'].z + 0.03)]
C = Vector(((Hv[:, 0].min() + Hv[:, 0].max()) / 2, (Hv[:, 1].min() + Hv[:, 1].max()) / 2, float(joints['lEye'].z) + 0.005))
hbvh = bvh_of(body)
def az_el(p):
    d = np.asarray(p) - np.array(C)
    return np.degrees(np.arctan2(d[..., 0], -d[..., 1])), np.degrees(np.arctan2(d[..., 2], np.hypot(d[..., 0], d[..., 1])))
def hairline(az):
    return np.interp(np.abs(az), [0, 25, 45, 70, 95, 120, 150, 180], [44, 42, 34, 24, 22, 8, -18, -32])
def surf(direction, off_):
    d = Vector(direction).normalized()
    hit_, nr, _, _ = hbvh.ray_cast(C + d * 0.3, -d, 0.35)
    if hit_ is None: return C + d * 0.1, d
    return hit_ + nr * off_, nr
az, el = az_el(Pb)
hm = (el > hairline(az) - 4) & (Wb[:, groups.index('head')] > 0.5)
cap = extract_faces(body, face_mask_from_verts(body, hm, 'all'), 'hair_cap')
for m in list(cap.modifiers): cap.modifiers.remove(m)
cap.parent = None
smooth_boundary(cap, 10)
cloth_shell(cap, hbvh, 0.004, smooth_iters=2, passes=2, pin=boundary_verts(cap))
cap.data.update()
for _v in cap.data.vertices: _v.co += _v.normal * 0.0035   # keep the whole cap above the skin (was sinking under the forehead)
Pc = V(cap); tdir = np.array([0, 0.25, 1.0]); tdir /= np.linalg.norm(tdir)
ref = np.cross(tdir, [1, 0, 0]); ref /= np.linalg.norm(ref); ref2 = np.cross(tdir, ref)
d = Pc - np.array(C); d /= np.linalg.norm(d, axis=1)[:, None]
vv = np.arccos(np.clip(d @ tdir, -1, 1)) / np.pi; uu = (np.arctan2(d @ ref2, d @ ref) / (2 * np.pi)) % 1.0
ul = cap.data.uv_layers.new(name='UVMap')
for p in cap.data.polygons:
    us = [uu[v] for v in p.vertices]; wrap = max(us) - min(us) > 0.5
    for li, vi in zip(p.loop_indices, p.vertices):
        u = uu[vi] + (1.0 if wrap and uu[vi] < 0.5 else 0.0); ul.data[li].uv = (u * 0.5, 0.08 + 0.92 * min(1, vv[vi] * 1.6))
rigid_weight(cap, 'head')
verts, faces, uvs = [], [], []
rnd = random.Random(23)
def add_card(path, widths, normals, variant):
    n = len(path); base = len(verts); u0 = 0.5 + 0.125 * variant; u1 = u0 + 0.125
    for i in range(n):
        tng = (path[min(i + 1, n - 1)] - path[max(i - 1, 0)]).normalized()
        side = normals[i].cross(tng).normalized() * widths[i] * 0.5; v = i / (n - 1)
        verts.append(path[i] - side); uvs.append((u0 + 0.004, 1 - v * 0.98)); verts.append(path[i] + side); uvs.append((u1 - 0.004, 1 - v * 0.98))
    for i in range(n - 1):
        a = base + 2 * i; faces.append((a, a + 1, a + 3, a + 2))
def slerp_dir(a, b, t):
    a = a.normalized(); b = b.normalized(); om = math.acos(max(-1, min(1, a.dot(b))))
    if om < 1e-4: return a
    return (a * math.sin((1 - t) * om) + b * math.sin(t * om)) / math.sin(om)
def dir_of(az_, el_):
    ar, er = math.radians(az_), math.radians(el_); return Vector((math.sin(ar) * math.cos(er), -math.cos(ar) * math.cos(er), math.sin(er)))
count = 0
# centre-parted curtain: roots along the part line, strands sweep to the sides and down
for layer, offl in enumerate((0.005, 0.0085, 0.012)):
    for k in range(95):
        u = rnd.random(); s = rnd.choice((-1, 1))
        phi = 44 + u * 118                                 # front hairline -> crown/back
        root_dir = Vector((s * 0.04, -math.cos(math.radians(phi)), math.sin(math.radians(phi))))
        end_az = s * (30 + 140 * u ** 0.8 + rnd.uniform(-8, 8)); end_el = -4 - 34 * u ** 0.7 + rnd.uniform(-5, 4)
        if u < 0.30:                                                                   # curtain fringe over the brows / temples
            end_az = s * rnd.uniform(14, 58); end_el = 22 - 0.42 * abs(end_az) + rnd.uniform(-4, 3)
        end_dir = dir_of(end_az, end_el)
        pts, nrs = [], []
        nseg = 11
        for i in range(nseg + 1):
            t = i / nseg; dd = slerp_dir(root_dir, end_dir, t)
            p, nr = surf(dd, offl + 0.010 * math.sin(t * math.pi) * (1 - 0.4 * t) + 0.004 * t)
            pts.append(p); nrs.append(nr)
        # tips fall a bit more vertically
        for i in range(nseg - 2, nseg + 1): pts[i] = pts[i] + Vector((0, 0, -0.012 * (i - nseg + 3) / 3))
        w = rnd.uniform(0.022, 0.036)
        add_card(pts, [w * (1 - 0.55 * (i / nseg) ** 2) for i in range(nseg + 1)], nrs, rnd.randrange(4)); count += 1
cards = mesh_from('hair_cards', verts, faces)
ulc = cards.data.uv_layers.new(name='UVMap')
for p in cards.data.polygons:
    for li, vi in zip(p.loop_indices, p.vertices): ulc.data[li].uv = uvs[vi]
shade_smooth(cards); rigid_weight(cards, 'head')
hair = join([cards, cap], 'steve_hair')
log('hair cards', count, 'tris', tri_count(hair))

# ============================================================ UV, objects
def fresh_uv(o):
    while len(o.data.uv_layers): o.data.uv_layers.remove(o.data.uv_layers[0])
    o.data.uv_layers.new(name='UVMap'); smart_uv(o, 60, 0.003)
OUTFIT = list(parts.keys())
for n_, o in parts.items():
    fresh_uv(o)
    while len(o.data.materials): o.data.materials.pop()
    o.data.materials.append(bpy.data.materials.new('id_' + n_))
outfit = join([parts[n] for n in OUTFIT], 'steve_outfit')
pack_uv(outfit); pack_only(outfit, 0.004)
outfit_high = join(highs, 'steve_outfit_high'); outfit_high.hide_render = True
headv = (Wb[:, groups.index('head')] + Wb[:, groups.index('neck')]) > 0.5
fresh_uv(body); pack_uv(body)
fm_head = face_mask_from_verts(body, headv if len(headv) == len(body.data.vertices) else (weights(body, groups)[:, groups.index('head')] > 0.5), 'any')
uvd = body.data.uv_layers.active.data
loops = [li for p in body.data.polygons if fm_head[p.index] for li in p.loop_indices]
A = np.array([uvd[l].uv[:] for l in loops]); c = A.mean(0)
for l, a in zip(loops, A): uvd[l].uv = tuple(c + (a - c) * 1.8)
pack_only(body, 0.003)
eyes = join([eL, eR], 'steve_eyes'); fresh_uv(eyes); pack_only(eyes, 0.01)
# shape keys on the final body (blink / pain / grip_L / grip_R)
add_shape_keys(body, {k: np.array(v) for k, v in joints.items()}, S)
for _o in (body, outfit, eyes):
    _bm = bmesh.new(); _bm.from_mesh(_o.data); bmesh.ops.triangulate(_bm, faces=_bm.faces[:], quad_method='BEAUTY', ngon_method='BEAUTY'); _bm.to_mesh(_o.data); _bm.free()
log('uv done', 'outfit', tri_count(outfit), 'body', tri_count(body))

# ============================================================ shading
Pb = V(body); Wb = weights(body, groups)
face = Pb[(Wb[:, groups.index('head')] > 0.6) & (np.abs(Pb[:, 0]) < 0.004)]
_fz = face[(face[:, 2] < joints['lEye'][2] - 0.012) & (face[:, 2] > joints['lEye'][2] - 0.07)]
nose = _fz[np.argmin(_fz[:, 1])]   # tip of the nose (search below the eyes; the brow is further forward on Steve)
mz = nose[2] - 0.040 * S
mouth = face[np.abs(face[:, 2] - mz) < 0.004]; mouth_y = mouth[:, 1].min() if len(mouth) else nose[1] + 0.012
EL, ER = np.array(joints['lEye']), np.array(joints['rEye']); RE = 0.012 * S
def skin_shade(P, Nn):
    n = len(P); x, y, z = P[:, 0], P[:, 1], P[:, 2]
    base = np.array([0.58, 0.39, 0.30], np.float32)
    lo = fbm(P, 3, scale=9.0); mid = fbm(P, 3, scale=38.0)
    col = base * (1 + 0.06 * lo[:, None] + 0.035 * mid[:, None])
    red = np.array([0.60, 0.29, 0.24], np.float32)
    head = (z > joints['neck'][2] + 0.02)
    def g(c, r): return np.exp(-((P - np.array(c)) ** 2).sum(1) / (2 * r * r))
    cheeks = sum(g((sx * 0.05, EL[1] + 0.014, EL[2] - 0.036), 0.02) for sx in (1, -1))
    nose_r = g(nose, 0.011) * 0.8
    hands = ss(0.29, 0.34, np.abs(x)) * (z < Z(0.95)); knuck = hands * ss(0.36, 0.38, np.abs(x)) * 0.5
    col = mix3(col, red * (col / base), np.clip(cheeks * 0.3 + nose_r * 0.35 + knuck * 0.3, 0, 0.6))
    under = sum(g((sx * 0.033, EL[1] - 0.004, EL[2] - 0.015), 0.009) for sx in (1, -1))
    col = mix3(col, col * np.array([0.8, 0.74, 0.8]), np.clip(under * 0.5, 0, 0.5))
    fr_zone = np.clip(cheeks * 1.2 + g(nose + np.array([0, 0.01, 0.012]), 0.02), 0, 1) * head
    F1, _ = worley(P, 900.0); fr = (1 - ss(0.08, 0.28, F1)) * (cellid(P, 900.0) > 0.8) * fr_zone
    col = mix3(col, col * np.array([0.75, 0.58, 0.48]), fr * 0.35)
    dx = x / (0.026 * S); dzu = (z - mz) / 0.0075; dzl = (z - mz) / 0.0088
    ell = np.where(z > mz, dx ** 2 + dzu ** 2, dx ** 2 + dzl ** 2)
    lipm = (1 - ss(0.72, 1.05, ell)) * (Nn[:, 1] < -0.35) * (y < mouth_y + 0.02) * head
    col = mix3(col, np.array([0.36, 0.17, 0.15]) * (1 + 0.1 * mid[:, None]), lipm * 0.7)
    brows = np.zeros(n, np.float32)
    for sx, E in ((1, EL), (-1, ER)):
        xl = x * sx; t = (xl - 0.010) / 0.054
        zc = E[2] + 0.018 + 0.004 * np.sin(np.clip(t, 0, 1) * math.pi * 0.85) - 0.002 * np.clip(t, 0, 1)
        thick = 0.0068 * (1 - 0.5 * np.clip(t, 0, 1)) + 0.001
        m = (1 - ss(thick * 0.6, thick, np.abs(z - zc))) * ss(-0.05, 0.02, t) * (1 - ss(0.92, 1.05, t)) * (Nn[:, 1] < -0.2) * (y < E[1] + 0.02)
        streak = ss(-0.1, 0.5, perlin(np.stack([xl * 900 - z * 300, z * 2500, y * 50], 1)))
        brows = np.maximum(brows, m * (0.4 + 0.6 * streak))
    col = mix3(col, np.array([0.09, 0.035, 0.018]), brows * 0.9)
    liner = np.zeros(n, np.float32)
    for E in (EL, ER):
        rel = P - E; d_ = np.linalg.norm(rel, axis=1); elv = np.degrees(np.arctan2(rel[:, 2], -rel[:, 1]))
        liner = np.maximum(liner, np.exp(-((d_ - RE * 1.26) / 0.0011) ** 2) * ss(-12, 5, elv) * (rel[:, 1] < -0.3 * RE))
    col = mix3(col, np.array([0.08, 0.045, 0.035]), liner * 0.55)
    nails = np.zeros(n, np.float32)
    for sx in (1, -1):
        s = 'l' if sx > 0 else 'r'; w = np.array(joints[s + 'Hand']); rel = P - w; dd = np.linalg.norm(rel, axis=1)
        nails = np.maximum(nails, ss(0.19, 0.2, dd) * (Nn[:, 0] * sx > 0.25) * (np.abs(x) > 0.3))
    col = mix3(col, np.array([0.62, 0.44, 0.40]), nails * 0.6)
    veins = (1 - ss(0.0, 0.06, np.abs(fbm(P * np.array([30, 30, 8]), 2)))) * ss(0.2, 0.3, np.abs(x)) * (z < Z(1.1))
    col = mix3(col, col * np.array([0.8, 0.85, 1.05]), veins * 0.3)
    # scalp under the hair: dark
    az_, el_ = az_el(P); scalp = ss(hairline(az_) - 5, hairline(az_) - 1.5, el_) * head
    col = mix3(col, np.array([0.17, 0.065, 0.025]), scalp * 0.95)
    rough = 0.52 + 0.06 * mid
    tz = head * g(nose, 0.015)
    rough = rough - 0.08 * np.clip(tz, 0, 1) - 0.18 * lipm - 0.2 * nails + 0.08 * brows
    F1f, _ = worley(P, 2300.0); F1b, _ = worley(P, 1300.0)
    pores = np.where(head, 1 - ss(0.0, 0.35, F1f), 1 - ss(0.0, 0.3, F1b) * 0.6)
    h = -0.000035 * pores * (1 - lipm) + 0.00002 * fbm(P, 3, scale=500.0) - 0.00004 * lipm * ss(0.3, 0.9, np.abs(np.sin(x * 2 * math.pi / 0.0016)))
    h += -0.00005 * knuck * ss(0.2, 0.8, np.abs(np.sin(P @ np.array([0, 0.6, 0.8]) * 2 * math.pi / 0.0025))) + 0.00006 * nails
    return col, np.clip(rough + 0.05 * pores, 0.15, 0.95), np.zeros(n, np.float32), h
ID = {n: i for i, n in enumerate(OUTFIT)}
def camo(P):
    """tiger stripe: horizontal brush strokes of dark brown/black over khaki-olive"""
    x, y, z = P.T
    warp = fbm(P * np.array([4, 4, 2]), 3) * 0.6
    band = np.sin((z * 38 + warp * 6 + fbm(P * np.array([2, 2, 9]), 2) * 2.5) * 1.0)
    br = perlin(np.stack([x * 14, y * 14, z * 3], 1) + 3) * 0.5 + 0.5
    s1 = ss(0.55, 0.75, band * 0.6 + br * 0.6 - 0.1)
    s2 = ss(0.62, 0.8, -band * 0.5 + (perlin(np.stack([x * 20 + 5, y * 20, z * 60], 1)) * 0.5 + 0.5) * 0.8)
    base = np.array([0.20, 0.17, 0.09]); mid_ = np.array([0.12, 0.11, 0.05]); dark = np.array([0.035, 0.025, 0.018])
    c = mix3(base * (1 + 0.15 * fbm(P, 3, scale=20.0)[:, None]), mid_, s2 * 0.85)
    return mix3(c, dark, s1)
def outfit_shade(P, Nn, ids):
    n = len(P); x, y, z = P.T
    col = np.zeros((n, 3), np.float32); rough = np.full(n, 0.75, np.float32); metal = np.zeros(n, np.float32); h = np.zeros(n, np.float32)
    lo = fbm(P, 3, scale=6.0); mid = fbm(P, 3, scale=35.0); hi = fbm(P, 2, scale=240.0)
    def M(k): return ids == ID[k] if k in ID else np.zeros(n, bool)
    weave = perlin(P * 2200.0) * 0.5 + perlin(P * np.array([900, 900, 3000])) * 0.5
    def cloth(mask, c, r=0.82, hh=None):
        if not np.any(mask): return
        c = c * (1 + 0.12 * lo[:, None] + 0.06 * mid[:, None] + 0.07 * weave[:, None])
        col[mask] = c[mask]; rough[mask] = (r + 0.05 * mid)[mask]; h[mask] = ((0.00003 * weave) + (hh if hh is not None else 0))[mask]
    # tank top: mustard yellow ribbed knit
    rib = ss(0.2, 0.8, np.abs(np.sin(x * 2 * math.pi / 0.004)))
    cloth(M('tank'), np.tile(np.array([0.62, 0.48, 0.08]), (n, 1)) * (0.92 + 0.08 * rib[:, None]), 0.85, -0.00004 * rib)
    # jacket: dark navy cotton twill, white piping on sleeve hems / collar edge, seams
    m = M('jacket')
    if np.any(m):
        tw = ss(0.3, 0.9, np.abs(np.sin((x * 0.7 + z) * 2 * math.pi / 0.0022)))
        c = np.tile(np.array([0.030, 0.042, 0.085]), (n, 1)) * (1 + 0.12 * tw[:, None])
        c = mix3(c, np.array([0.06, 0.075, 0.12]), ss(0.3, 0.9, hi)[:, None].squeeze() * 0.3)
        sleeve_hem = ss(0.012, 0.004, np.abs(z - Z(1.18))) * ss(0.17, 0.2, np.abs(x))
        coll = ss(Z(1.385), Z(1.40), z)
        trim = np.clip(sleeve_hem + coll * 0.0, 0, 1)
        c = mix3(c, np.array([0.62, 0.62, 0.6]), trim)
        sd = np.minimum(np.abs(np.abs(x) - 0.16), 1.0); seam = line_mask(sd, 0.0016, 0.0008) * (z > Z(1.2))
        st = stitches(np.abs(np.abs(x) - 0.06) - 0.0, z) * (y < 0) * (z < Z(1.36))
        c = mix3(c, c * 0.6, seam * 0.6); c = mix3(c, np.array([0.25, 0.27, 0.33]), st * 0.5)
        # chest pockets with flaps
        pk = (np.abs(np.abs(x) - 0.095) < 0.045) & (y < 0) & (np.abs(z - Z(1.27)) < 0.04)
        ed = pk & ~((np.abs(np.abs(x) - 0.095) < 0.041) & (np.abs(z - Z(1.27)) < 0.036))
        flap = pk & (np.abs(z - Z(1.30)) < 0.004)
        c[ed] *= 0.55; c[flap] *= 0.6
        col[m] = c[m]; rough[m] = (0.78 + 0.05 * mid)[m]; h[m] = (0.00004 * tw - 0.0002 * seam + 0.0003 * ed + 0.0002 * flap + 0.0004 * trim)[m]
    # camo pants with cargo pockets
    for nm_ in ('pants', 'pocket0', 'pocket1'):
        m = M(nm_)
        if np.any(m):
            c = camo(P) * (1 + 0.07 * weave[:, None])
            seam = line_mask(np.abs(x), 0.0015, 0.0008) + line_mask(np.abs(np.abs(x) - 0.17), 0.0015, 0.0008) * (z < Z(0.85))
            c = mix3(c, c * 0.6, np.clip(seam, 0, 1) * 0.6)
            col[m] = c[m]; rough[m] = (0.86 + 0.04 * mid)[m]; h[m] = (0.00003 * weave - 0.00018 * np.clip(seam, 0, 1))[m]
    m = M('belt')
    if np.any(m):
        c = np.array([0.18, 0.06, 0.03]) * (1 + 0.2 * mid[:, None]); col[m] = c[m]; rough[m] = 0.45
        holes = ss(0.004, 0.002, np.abs(np.mod(np.arctan2(x, -y) * 0.14, 0.025) - 0.0125)) * (y > 0.05)
        col[m & (holes > 0.5)] *= 0.3
    m = M('buckle')
    if np.any(m):
        eng = ss(0.0, 0.5, np.abs(perlin(P * 900)))
        col[m] = (np.array([0.78, 0.78, 0.8]) * (0.8 + 0.2 * eng[:, None]))[m]; rough[m] = 0.25; metal[m] = 1.0; h[m] = (0.0002 * eng)[m]
    m = M('choker')
    if np.any(m): col[m] = np.array([0.02, 0.02, 0.022]); rough[m] = 0.5; h[m] = (0.00005 * weave)[m]
    for s in 'lr':
        m = M('wrist_' + s)
        if np.any(m):
            rb = ss(0.2, 0.8, np.abs(np.sin(np.arctan2(x, z) * 60)))
            col[m] = (np.array([0.018, 0.018, 0.02]) * (1 + 0.3 * rb[:, None]))[m]; rough[m] = 0.9; h[m] = (-0.00008 * rb)[m]
    m = M('boots')
    if np.any(m):
        sole = ss(SOLE + 0.006, SOLE - 0.002, z)
        c = np.array([0.075, 0.042, 0.022]) * (1 + 0.25 * mid[:, None]); c = mix3(c, np.array([0.14, 0.085, 0.045]), ss(0.4, 0.9, hi) * 0.45)
        xc = np.where(x > 0, P[m & (x > 0), 0].mean() if np.any(m & (x > 0)) else 0.1, P[m & (x < 0), 0].mean() if np.any(m & (x < 0)) else -0.1)
        dxl = np.abs(x - xc)
        lace_zone = (y < 0) & (Nn[:, 1] < -0.3) & (dxl < 0.016) & (z > Z(0.085)) & (z < Z(0.265))
        lace = lace_zone * ss(0.35, 0.75, np.abs(np.sin((z + dxl * 0.7) * 2 * math.pi / 0.013)))
        eyel = lace_zone * (np.abs(dxl - 0.014) < 0.003) * (np.abs(np.sin(z * 2 * math.pi / 0.013)) > 0.85)
        c = mix3(c, np.array([0.11, 0.07, 0.035]), lace * 0.85)
        c = mix3(c, np.array([0.22, 0.2, 0.17]), eyel * 0.7); metal[m] = (eyel * 0.8)[m]
        c = mix3(c, np.array([0.03, 0.025, 0.02]), sole)
        crease = ss(0.05, 0.0, np.abs(perlin(P * np.array([60, 60, 400]))))
        col[m] = c[m]; rough[m] = (0.55 + 0.15 * crease)[m]; h[m] = (0.0003 * crease * ss(Z(0.08), Z(0.12), z) + 0.0002 * lace)[m]
    return col, np.clip(rough, 0.08, 1), metal, h
def eye_shade(P, Nn):
    n = len(P); c = np.where((P[:, 0] > 0)[:, None], EL, ER)
    d = P - c; d /= np.linalg.norm(d, axis=1)[:, None]
    a = np.degrees(np.arccos(np.clip(-d[:, 1], -1, 1))); ang = np.arctan2(d[:, 2], d[:, 0])
    fib = perlin(np.stack([np.cos(ang) * 6, np.sin(ang) * 6, a * 0.35], 1)) * 0.5 + perlin(np.stack([ang * 40, a * 0.8, a * 0.1], 1)) * 0.5
    iris = np.array([0.12, 0.17, 0.20]) * (1 + 0.5 * fib[:, None])
    iris = mix3(iris, np.array([0.28, 0.18, 0.08]), (1 - ss(10, 15, a)) * 0.5)
    iris = mix3(iris, np.array([0.02, 0.03, 0.04]), ss(23, 27, a))
    sclera = np.array([0.74, 0.70, 0.66]) * (1 + 0.03 * fbm(P, 2, scale=400.0)[:, None])
    veins = (1 - ss(0.0, 0.05, np.abs(fbm(P, 3, scale=600.0)))) * ss(45, 75, a)
    sclera = mix3(sclera, np.array([0.55, 0.20, 0.18]), veins * 0.45); sclera = mix3(sclera, sclera * 0.8, ss(60, 90, a))
    col = np.where((a < 28)[:, None], iris, sclera); col = mix3(col, np.array([0.01, 0.01, 0.012]), 1 - ss(8.5, 10.0, a))
    col = mix3(col, col * 0.5, np.exp(-((a - 28) / 1.5) ** 2))
    return col, np.full(n, 0.06, np.float32), np.zeros(n, np.float32), -0.0002 * (1 - ss(20, 29, a))
def build_set(o, name, size, shade, high_obj=None, ao_size=1024, ao_dist=0.08, extrusion=0.006, ray=0.02, bump=1.0, ids=False):
    log(name, 'bake maps...')
    pos = bake_emit(o, size, 'pos'); nrm = bake_emit(o, size, 'nrm'); cov, P, Nn = decode(pos, nrm)
    idmap = bake_emit(o, size, 'id') if ids else None
    Pc, Nc = P[cov], Nn[cov]
    idc = (np.round(idmap[..., 0][cov] * 64) - 1).astype(int) if ids else None
    col, rough, metal, h = shade(Pc, Nc, idc) if ids else shade(Pc, Nc)
    def full(v, ch):
        a = np.zeros((size, size, ch) if ch > 1 else (size, size), np.float32); a[cov] = v; return a
    ao = bake_ao(o, ao_size, 24, ao_dist)
    if ao_size != size: ao = np.array(Image.fromarray((ao * 255).astype(np.uint8)).resize((size, size), Image.BILINEAR), np.float32) / 255.0
    albedo = finish(full(col, 3) * (0.55 + 0.45 * ao[..., None]), cov)
    orm = np.stack([ao, finish(full(rough, 1), cov), finish(full(metal, 1), cov)], -1)
    if high_obj is not None:
        gn = bake_normal_from_high(o, high_obj, size, extrusion, ray)[..., :3]
        _n = gn * 2 - 1; _inv = _n[..., 2] < -0.35; _n[_inv] = -_n[_inv]; gn = (_n + 1) * 0.5
        _bad = (_n[..., 2] < 0.35) | ~np.isfinite(_n).all(-1); gn[_bad] = (0.5, 0.5, 1.0)
        if name == 'steve_skin':  # forehead/scalp: the high-res cage hit the inner shell there (oval artefact) → flat, detail comes from h
            fh = (Pc[:, 2] > float(joints['lEye'].z) + 0.03) & (np.linalg.norm(Pc - np.array(C), axis=1) < 0.16)
            gn[full(fh.astype(np.float32), 1) > 0.5] = (0.5, 0.5, 1.0)
    else: gn = np.dstack([np.full((size, size), 0.5), np.full((size, size), 0.5), np.ones((size, size))])
    nf = bake_combined_normal(o, gn, finish(full(h, 1), cov), size, bump)[..., :3]
    _n = nf * 2 - 1; nf = nf.copy(); nf[_n[..., 2] < 0.2] = (0.5, 0.5, 1.0)
    save_rgb(albedo, f'{TEXD}/{name}_albedo.jpg', 90); save_rgb(nf, f'{TEXD}/{name}_normal.jpg', 92, srgb=False)
    Image.fromarray((np.clip(orm[::-1], 0, 1) * 255).astype(np.uint8)).resize((size // 2, size // 2), Image.LANCZOS).save(f'{TEXD}/{name}_orm.jpg', quality=90)
    log(name, 'saved')
for o in bpy.data.objects:
    if o.type == 'MESH': o.hide_render = True
for o, args in ((body, ('steve_skin', Q, skin_shade, high, 1024, 0.05, 0.004, 0.012)),):
    o.hide_render = False; high.hide_render = True
    build_set(o, *args); o.hide_render = True
outfit.hide_render = False
build_set(outfit, 'steve_outfit', Q, outfit_shade, outfit_high, 1024, 0.06, 0.005, 0.014, 1.0, True); outfit.hide_render = True
eyes.hide_render = False
build_set(eyes, 'steve_eyes', 512, eye_shade, None, 256, 0.01); eyes.hide_render = True

# ============================================================ hair atlas
HS = 1024; rng = np.random.RandomState(9)
acc = np.zeros((HS, HS, 3), np.float32); alpha = np.zeros((HS, HS), np.float32)
dark = np.array([0.11, 0.036, 0.013]); light = np.array([0.40, 0.14, 0.05]); rows = np.arange(HS)
def strand(x0, r0, r1, amp, freq, ph, width, col_s, alpha_s, wrap=None, taper=True):
    rr = rows[r0:r1]; t = (rr - r0) / max(1, (r1 - r0 - 1))
    xc = x0 + amp * np.sin(rr * freq + ph)
    for dx in range(-3, 4):
        xi = np.floor(xc).astype(int) + dx
        w = np.exp(-((xi + 0.5 - xc) / (width * 0.6)) ** 2)
        a = alpha_s * w * ((1 - ss(0.75, 1.0, 1 - t)) if taper else 1)
        if wrap: xi = wrap[0] + (xi - wrap[0]) % (wrap[1] - wrap[0])
        ok = (xi >= 0) & (xi < HS); ri, xi_, a_ = rr[ok], xi[ok], a[ok]
        cc = col_s[None, :] * (0.55 + 0.6 * t[ok])[:, None]
        acc[ri, xi_] = acc[ri, xi_] * (1 - a_[:, None]) + cc * a_[:, None]; alpha[ri, xi_] = 1 - (1 - alpha[ri, xi_]) * (1 - a_)
for vi in range(4):
    xa = 512 + vi * 128
    for k in range(95):
        L = rng.uniform(0.55, 1.0); r1 = HS; r0 = int(HS - L * HS * 0.98)
        strand(xa + rng.uniform(6, 122), r0, r1, rng.uniform(0.5, 3.0), rng.uniform(0.004, 0.02), rng.uniform(0, 6.28), rng.uniform(1.0, 2.3), dark + (light - dark) * rng.uniform(0.1, 0.9), rng.uniform(0.6, 1.0))
r_cap0 = int(0.08 * HS)
acc[r_cap0:, :512] = (dark * 0.9)[None, None, :]; alpha[r_cap0:, :512] = 1.0
for k in range(900):
    strand(rng.uniform(0, 512), r_cap0, HS, rng.uniform(0.3, 2.0), rng.uniform(0.003, 0.012), rng.uniform(0, 6.28), rng.uniform(1.0, 2.0), dark + (light - dark) * rng.uniform(0.0, 0.8), rng.uniform(0.4, 0.9), wrap=(0, 512), taper=False)
alpha[r_cap0:, :512] = 1.0
avg = acc[alpha > 0.5].mean(0)
acc = np.where(alpha[..., None] > 0.02, acc / np.maximum(alpha[..., None], 1e-3) * np.minimum(alpha[..., None] * 3, 1) + avg * (1 - np.minimum(alpha[..., None] * 3, 1)), avg)
rgba = np.concatenate([np.clip(acc, 0, 1), alpha[..., None]], -1)
srgb = np.where(rgba[..., :3] <= 0.0031308, rgba[..., :3] * 12.92, 1.055 * np.power(rgba[..., :3], 1 / 2.4) - 0.055)
Image.fromarray((np.concatenate([srgb, rgba[..., 3:]], -1)[::-1] * 255).astype(np.uint8), 'RGBA').save(f'{TEXD}/steve_hair.png', optimize=True)

# ============================================================ export
def load(p, noncolor=False):
    im = bpy.data.images.load(p, check_existing=False)
    if noncolor: im.colorspace_settings.name = 'Non-Color'
    return im
def set_mat(o, mat):
    while len(o.data.materials): o.data.materials.pop()
    o.data.materials.append(mat)
    for p in o.data.polygons: p.material_index = 0
for o, name in ((body, 'steve_skin'), (outfit, 'steve_outfit'), (eyes, 'steve_eyes')):
    set_mat(o, export_material(name, load(f'{TEXD}/{name}_albedo.jpg'), load(f'{TEXD}/{name}_normal.jpg', True), load(f'{TEXD}/{name}_orm.jpg', True)))
set_mat(hair, export_material('steve_hair', load(f'{TEXD}/steve_hair.png'), None, None, rough=0.42, alpha=True))
for o in (body, outfit, eyes, hair):
    for m in list(o.modifiers):
        if m.type != 'ARMATURE': o.modifiers.remove(m)
    if not any(m.type == 'ARMATURE' for m in o.modifiers):
        mm = o.modifiers.new('rig', 'ARMATURE'); mm.object = rig
    o.parent = rig; normalize_limit(o)
keep = {body.name, outfit.name, eyes.name, hair.name, rig.name}
for o in list(bpy.data.objects):
    if o.name not in keep: bpy.data.objects.remove(o)
_bm = bmesh.new(); _bm.from_mesh(hair.data); bmesh.ops.triangulate(_bm, faces=_bm.faces[:]); _bm.to_mesh(hair.data); _bm.free()
export_glb(f'{OUT_GLB}/steve.glb', [rig, body, outfit, eyes, hair])
save_blend(f'{OUT_BLEND}/steve.blend')
json.dump({k: list(v) for k, v in joints.items()}, open('/data/assets_src/work/steve_joints.json', 'w'))
log('DONE', {o.name: tri_count(o) for o in (body, outfit, eyes, hair)})

