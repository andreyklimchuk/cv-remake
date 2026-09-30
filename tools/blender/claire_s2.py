import sys; sys.path.insert(0, '/data/assets_src/tools')
from lib import *
import json
from claire_shapekeys import add_shape_keys
S = 1.70 / 1.641; SOLE = 0.022
def Z(z): return z * S + SOLE
def U(z): return (z - SOLE) / S
bpy.ops.wm.open_mainfile(filepath='/data/assets_src/work/claire_s1.blend')
sc = bpy.context.scene
body = bpy.data.objects['claire_body']; body0 = bpy.data.objects['claire_body_l0']; rig = bpy.data.objects['claire_rig']
joints = {k: Vector(v) for k, v in json.load(open('/data/assets_src/work/claire_joints.json')).items()}
bvh = bvh_of(body)
groups = [g.name for g in body0.vertex_groups]
def wsum(W, names): return sum(W[:, groups.index(n)] for n in names if n in groups)
ARM = [s + b for s in 'lr' for b in ('UpperArm', 'Forearm', 'Hand')]
W0 = weights(body0, groups); P0 = V(body0); z0 = P0[:, 2]
arm0 = wsum(W0, ARM); nh0 = wsum(W0, ['neck', 'head'])
def smoothstep(a, b, x):
    t = np.clip((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t)
def centers(o):
    a = np.zeros(len(o.data.polygons) * 3); o.data.polygons.foreach_get('center', a); return a.reshape(-1, 3)
def garment(src, vmask, name, ffilter=None):
    f = face_mask_from_verts(src, vmask, 'all')
    if ffilter is not None: f &= ffilter(centers(src))
    o = extract_faces(src, f, name)
    for m in list(o.modifiers): o.modifiers.remove(m)
    o.parent = None; o.hide_render = False
    if o.data.shape_keys: o.shape_key_clear()
    smooth_boundary(o, 14)
    return o
highs = []
def make_high(o, levels, fold):
    h = dup(o, o.name + '_high')
    for g in list(h.vertex_groups): h.vertex_groups.remove(g)
    subdivide(h, levels)
    displace_along_normals(h, fold)
    h.hide_render = True; highs.append(h); return h
def nz(x, y, z): return noise.noise(Vector((x, y, z)))
parts = {}

# ------------------------------------------------------------ black top (tank)
def top_filter(C):
    x, y, zz = C.T
    return (zz < Z(1.075)) | ((y < 0) & (zz > Z(1.18)) & (np.abs(x) < 0.10)) | (np.abs(x) > 0.105)
top = garment(body0, (z0 > Z(0.925)) & (z0 < Z(1.392)) & (arm0 < 0.45) & (nh0 < 0.35), 'top', top_filter)
subdivide(top, 1)
cloth_shell(top, bvh, 0.0028, smooth_iters=2, passes=2, pin=boundary_verts(top))
make_high(top, 1, lambda p, n: 0.0004 * nz(p[0] * 60, p[1] * 60, p[2] * 30) + 0.0008 * nz(p[0] * 8, p[1] * 8, p[2] * 30))
parts['top'] = top

# ------------------------------------------------------------ red vest
def vest_filter(C):
    x, y, zz = C.T
    vcut = (y < 0) & (zz > Z(1.235)) & (np.abs(x) < 0.010 + (zz - Z(1.235)) * 0.40)
    return ~vcut
vest = garment(body0, (z0 > Z(0.995)) & (z0 < Z(1.392)) & (arm0 < 0.38) & (nh0 < 0.4), 'vest', vest_filter)
subdivide(vest, 1)
cloth_shell(vest, bvh, 0.0105, smooth_iters=5, passes=3, pin=boundary_verts(vest))
def vest_fold(p, n):
    x, y, z = p; zz = U(z)
    arm = smoothstep(0.09, 0.14, abs(x)) * smoothstep(1.12, 1.2, zz) * smoothstep(1.34, 1.26, zz)
    waist = smoothstep(1.08, 1.0, zz)
    return (0.0009 * nz(x * 9, y * 9, z * 22) + 0.0022 * arm * nz(x * 20 + z * 20, y * 20, z * 12)
            + 0.0016 * waist * nz(x * 5, y * 5, z * 60) + 0.00025 * nz(x * 90, y * 90, z * 90))
make_high(vest, 2, vest_fold)
parts['vest'] = vest

# ------------------------------------------------------------ jeans
wl = lambda y: Z(0.972) + 0.014 * np.tanh(y / 0.05)
jm = (z0 < wl(P0[:, 1])) & (z0 > Z(0.212)) & (arm0 < 0.3)
jeans = garment(body0, jm, 'jeans')
subdivide(jeans, 1)
Pj = V(jeans); off_j = 0.0075 + 0.004 * smoothstep(Z(0.60), Z(0.34), Pj[:, 2]) + 0.0012 * smoothstep(Z(0.9), Z(0.96), Pj[:, 2])
cloth_shell(jeans, bvh, off_j, smooth_iters=6, passes=3, pin=boundary_verts(jeans))
def jeans_fold(p, n):
    x, y, z = p; zz = U(z)
    knee = smoothstep(0.08, 0.0, abs(zz - 0.455)) * (1.0 if y > 0 else 0.45)
    crotch = smoothstep(0.08, 0.0, abs(zz - 0.80)) * smoothstep(0.13, 0.05, abs(x)) * (1.0 if y < 0.02 else 0.3)
    stack = smoothstep(0.07, 0.0, abs(zz - 0.27))
    hipf = smoothstep(0.1, 0.0, abs(zz - 0.9))
    return (0.0007 * nz(x * 11, y * 11, z * 26)
            + 0.0034 * knee * nz(x * 7, y * 7, z * 60)
            + 0.0024 * crotch * nz(x * 26 + z * 22, y * 9, z * 24)
            + 0.0032 * stack * nz(x * 9, y * 9, z * 75)
            + 0.0009 * hipf * nz(x * 30, y * 30, z * 14)
            + 0.0002 * nz(x * 120, y * 120, z * 120))
make_high(jeans, 2, jeans_fold)
parts['jeans'] = jeans

# ------------------------------------------------------------ boots
# shaft: tube over the shin, foot: offset convex hull (boot last) -> voxel remesh
boots = garment(body0, (z0 < Z(0.305)) & (z0 > Z(0.075)) & (arm0 < 0.2), 'boots')
Pb = V(boots); shaft = smoothstep(Z(0.10), Z(0.16), Pb[:, 2]); off_s = 0.0095 + 0.011 * shaft
cloth_shell(boots, bvh, off_s, smooth_iters=3, passes=2, pin=boundary_verts(boots))
hull_objs = []
for sx in (1, -1):
    fm = (z0 < Z(0.14)) & (P0[:, 0] * sx > 0.02) & (arm0 < 0.2)
    bm = bmesh.new()
    for p in P0[fm]: bm.verts.new(p)
    bmesh.ops.convex_hull(bm, input=bm.verts)
    me = bpy.data.meshes.new('hull'); bm.to_mesh(me); bm.free()
    ho = bpy.data.objects.new('boot_foot', me); link(ho)
    rm = ho.modifiers.new('rm', 'REMESH'); rm.mode = 'VOXEL'; rm.voxel_size = 0.0045; apply_modifier(ho, 'rm')
    Ph = V(ho); setV(ho, Ph + N(ho) * 0.0085); smooth_verts(ho, 6, 0.5)
    Ph = V(ho)
    c = np.array(joints[('l' if sx > 0 else 'r') + 'Foot'])
    toe = smoothstep(0.02, -0.12, Ph[:, 1] - c[1])            # rounder, taller toe box
    Ph[:, 2] += toe * 0.004 * smoothstep(SOLE + 0.01, SOLE + 0.05, Ph[:, 2])
    setV(ho, Ph)
    hull_objs.append(ho)
foot = join(hull_objs, 'boot_feet')
shade_smooth(foot)
Pb = V(foot)

b = smoothstep(SOLE + 0.02, SOLE - 0.004, Pb[:, 2])
foot_c = {s_: np.array(joints[s_ + 'Foot']) for s_ in 'lr'}
for i in range(len(Pb)):
    if b[i] <= 0: continue
    c = foot_c['l' if Pb[i, 0] > 0 else 'r']
    d = Pb[i, :2] - c[:2]; ln = np.linalg.norm(d) + 1e-6
    Pb[i, :2] += d / ln * 0.005 * b[i]
    Pb[i, 2] = Pb[i, 2] * (1 - b[i])
setV(foot, Pb)
transfer_weights(foot, body0)
boots = join([boots, foot], 'boots')
def boot_fold(p, n):
    x, y, z = p; zz = U(z)
    ank = smoothstep(0.05, 0.0, abs(zz - 0.10)) * (1.0 if y < 0.03 else 0.3)
    return 0.0006 * nz(x * 30, y * 30, z * 30) + 0.0018 * ank * nz(x * 10, y * 10, z * 90)
make_high(boots, 1, boot_fold)
parts['boots'] = boots

# ------------------------------------------------------------ fingerless gloves (from the dense body)
W1 = weights(body, groups); P1 = V(body)
gm = np.zeros(len(P1), bool)
for s in 'lr':
    wrist = np.array(joints[s + 'Hand']); fore = np.array(joints[s + 'Forearm'])
    fdir = (wrist - fore) / np.linalg.norm(wrist - fore)
    rel = P1 - wrist; t = rel @ fdir
    near = np.linalg.norm(rel, axis=1) < 0.26
    side = (P1[:, 0] > 0.2) if s == 'l' else (P1[:, 0] < -0.2)
    gm |= near & side & (t > -0.042) & (np.linalg.norm(rel, axis=1) < 0.142)
gloves = garment(body, gm, 'gloves')
decimate(gloves, 0.5)
cloth_shell(gloves, bvh, 0.0013, smooth_iters=1, passes=1, pin=boundary_verts(gloves))
make_high(gloves, 1, lambda p, n: 0.00025 * nz(p[0] * 150, p[1] * 150, p[2] * 150))
solidify(gloves, 0.0011, offset=1)
parts['gloves'] = gloves

# ------------------------------------------------------------ belt + buckle + pouches
jb = bvh_of(jeans)
Pj = V(jeans)
band_z = Z(0.952)
sel = np.abs(Pj[:, 2] - band_z) < 0.02
cen = Pj[sel].mean(0); cen[2] = band_z
N_ = 96
def belt_ring(zc, off):
    pts, nrs = [], []
    for i in range(N_):
        a = 2 * math.pi * i / N_
        d = Vector((math.sin(a), -math.cos(a), 0))      # a=0 -> front (-Y)
        zz = zc - 0.010 * math.cos(a)                   # belt dips at the front
        c = Vector((cen[0], cen[1], zz))
        hit, nr, _, _ = jb.ray_cast(c, d, 0.5)
        if hit is None: hit, nr = c + d * 0.15, d
        nr = Vector((nr.x, nr.y, 0)).normalized()
        pts.append(hit + nr * off); nrs.append(nr)
    return pts, nrs
tp, tn = belt_ring(band_z + 0.017, 0.0015); bp, bn = belt_ring(band_z - 0.017, 0.0015)
belt = band_mesh('belt', tp, bp, tn, bn, 0.0045)
front = (tp[0] + bp[0]) / 2; fn = (tn[0] + bn[0]).normalized()
buckle_parts = []
for (sx, sz, px, pz) in [(0.052, 0.007, 0, 0.0185), (0.052, 0.007, 0, -0.0185), (0.007, 0.044, 0.0225, 0), (0.007, 0.044, -0.0225, 0)]:
    bx = box_mesh('buckle_bar', (sx, 0.006, sz), bevel=0.0015)
    xa = Vector((1, 0, 0)); ya = -fn; za = Vector((0, 0, 1))
    place(bx, front + fn * 0.0075 + xa * px + za * pz, xa, ya, za); buckle_parts.append(bx)
prong = box_mesh('prong', (0.036, 0.004, 0.004), bevel=0.001); place(prong, front + fn * 0.0095, Vector((1, 0, 0)), -fn, Vector((0, 0, 1))); buckle_parts.append(prong)
buckle = join(buckle_parts, 'buckle')
pouch_parts = []
for ang in (2.2, -1.95):
    i = int(round(ang / (2 * math.pi) * N_)) % N_
    p = (tp[i] + bp[i]) / 2; n_ = ((tn[i] + bn[i]) / 2).normalized()
    xa = Vector((0, 0, 1)).cross(n_).normalized(); za = Vector((0, 0, 1))
    body_ = box_mesh('pouch', (0.085, 0.036, 0.072), bevel=0.006, segments=3)
    place(body_, p + n_ * 0.022 + za * -0.006, xa, n_, za)
    flap = box_mesh('flap', (0.089, 0.04, 0.024), bevel=0.004, segments=2)
    place(flap, p + n_ * 0.024 + za * 0.024, xa, n_, za)
    snap = cyl_mesh('snap', 0.005, 0.004, 12)
    place(snap, p + n_ * 0.045 + za * 0.02, xa, za, n_)
    pouch_parts += [body_, flap, snap]
pouches = join(pouch_parts, 'pouches')

# ------------------------------------------------------------ right-thigh holster
th0, th1 = joints['rThigh'], joints['rShin']
ax = (th1 - th0).normalized()
straps = []
for t_, hgt in ((0.30, 0.028), (0.62, 0.026)):
    c = th0 + (th1 - th0) * t_
    up = -ax
    tp_, tn_ = ray_ring(jb, c + up * hgt / 2, ax, Vector((0, -1, 0)), 48, 0.001, reach=0.3, inside=True)
    bp_, bn_ = ray_ring(jb, c - up * hgt / 2, ax, Vector((0, -1, 0)), 48, 0.001, reach=0.3, inside=True)
    straps.append(band_mesh('strap', tp_, bp_, tn_, bn_, 0.003))
c = th0 + (th1 - th0) * 0.36
lat = Vector((-1, 0, 0)); lat = (lat - ax * lat.dot(ax)).normalized()
hit, nr, _, _ = jb.ray_cast(c, lat, 0.4)
za = -ax; ya = Vector((nr.x, nr.y, nr.z)); xa = ya.cross(za).normalized(); ya = za.cross(xa).normalized()
hol = box_mesh('holster', (0.078, 0.036, 0.19), bevel=0.01, segments=3)
place(hol, hit + ya * 0.021, xa, ya, za)
hflap = box_mesh('hflap', (0.082, 0.04, 0.05), bevel=0.006, segments=2)
place(hflap, hit + ya * 0.024 + za * 0.075, xa, ya, za)
belt_i = int(round(-1.62 / (2 * math.pi) * N_)) % N_
bpnt = bp[belt_i]; hol_top = hit + ya * 0.012 + za * 0.1
dl = (bpnt - hol_top).length
drop = box_mesh('drop', (0.028, 0.004, dl), bevel=0.001)
dz = (bpnt - hol_top).normalized(); dx = ya.cross(dz).normalized(); dy = dz.cross(dx)
place(drop, (bpnt + hol_top) / 2, dx, dy, dz)
holster = join(straps + [hol, hflap, drop], 'holster')

# ------------------------------------------------------------ vest collar + zipper
nk0, nk1 = joints['neck'], joints['head']
nax = (nk1 - nk0).normalized()
def neck_ring(zc, off):
    c = nk0 + nax * ((zc - nk0.z) / nax.z)
    return ray_ring(bvh, c, nax, Vector((0, 1, 0)), 40, off, reach=0.25, a0=-1.95, a1=1.95, closed=False)
cb, cbn = neck_ring(Z(1.382), 0.0115)
ct, ctn = neck_ring(Z(1.382) + 0.042, 0.0078)
collar = band_mesh('collar', ct, cb, ctn, cbn, 0.0032, closed=False)
vb = bvh_of(vest)
zl, zr, znl, znr = [], [], [], []
for k in range(26):
    zz = Z(1.0) + (Z(1.235) - Z(1.0)) * k / 25
    for sx, L, NL in ((-0.0065, zl, znl), (0.0065, zr, znr)):
        hit, nr, _, _ = vb.ray_cast(Vector((sx, -0.4, zz)), Vector((0, 1, 0)), 0.6)
        if hit is None: hit, nr = Vector((sx, -0.15, zz)), Vector((0, -1, 0))
        if nr.y > 0: nr = -nr
        L.append(hit + nr * 0.0004); NL.append(nr)
zipper = band_mesh('zipper', zl, zr, znl, znr, 0.0016, closed=False)
zp = zl[-1].lerp(zr[-1], 0.5)
pull = box_mesh('zip_pull', (0.011, 0.0035, 0.026), bevel=0.0012)
place(pull, zp + znl[-1] * 0.004 + Vector((0, 0, -0.012)), Vector((1, 0, 0)), Vector((0, 1, 0)), Vector((0, 0, 1)))
zipper = join([zipper, pull], 'zipper')
solidify(vest, 0.0034, offset=-1)
solidify(top, 0.0012, offset=-1)
for o in (collar, belt, buckle, pouches, holster, zipper):
    shade_smooth(o, math.radians(40)); recalc_normals(o)
    parts[o.name] = o
    make_high(o, 1, lambda p, n: 0.0)  # highs for hard-surface pieces = same shape (bake uses detail maps)

# ------------------------------------------------------------ hide body under clothes, shape keys
W1 = weights(body, groups); P1 = V(body); z1 = P1[:, 2]
arm1 = wsum(W1, ARM); nh1 = wsum(W1, ['neck', 'head'])
hide = (((z1 > Z(0.96)) & (z1 < Z(1.362)) & (arm1 < 0.22) & (nh1 < 0.25))
        | ((z1 < Z(0.95)) & (z1 > Z(0.235)) & (arm1 < 0.1))
        | ((z1 < Z(0.29)) & (arm1 < 0.1)))
delete_faces(body, face_mask_from_verts(body, hide, 'all'))
# drop loose verts
bm = bmesh.new(); bm.from_mesh(body.data)
bmesh.ops.delete(bm, geom=[v for v in bm.verts if not v.link_faces], context='VERTS'); bm.to_mesh(body.data); bm.free()
print('body faces after hide+decimate', len(body.data.polygons), 'xmax', V(body)[:,0].max(), 'n', len(body.data.vertices))
add_shape_keys(body, joints, S)
# gloves inherit the grip shape keys from the hand they cover
kd = kdtree.KDTree(len(body.data.vertices))
Pb0 = V(body)
for i, p in enumerate(Pb0): kd.insert(p, i)
kd.balance()
kb = body.data.shape_keys.key_blocks
gl = parts['gloves']; Pg = V(gl)
near = np.array([kd.find(Vector(p))[1] for p in Pg])
gl.shape_key_add(name='Basis', from_mix=False)
for kname in ('grip_L', 'grip_R'):
    kk = np.zeros(len(Pb0) * 3); kb[kname].data.foreach_get('co', kk); kk = kk.reshape(-1, 3)
    k = gl.shape_key_add(name=kname, from_mix=False); k.data.foreach_set('co', (Pg + kk[near] - Pb0[near]).ravel())
zero_keys(gl)

# ------------------------------------------------------------ weights for all outfit parts
for name, o in parts.items():
    if name not in ('vest', 'top', 'jeans', 'boots', 'gloves'):
        transfer_weights(o, body)
    normalize_limit(o)
    o.parent = rig
    m = o.modifiers.new('rig', 'ARMATURE'); m.object = rig
    print(name, 'tris', tri_count(o))
print('body tris', tri_count(body), 'highs', {h.name: len(h.data.polygons) for h in highs})
bpy.ops.wm.save_as_mainfile(filepath='/data/assets_src/work/claire_s2.blend')
print('stage2 done')
