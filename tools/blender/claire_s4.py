import sys, os, json, time, math
sys.path.insert(0, '/data/assets_src/tools')
from lib import *
from bakekit import *
from texlib import *
from PIL import Image, ImageDraw, ImageFont
S = 1.70 / 1.641; SOLE = 0.022
def Z(z): return z * S + SOLE
T0 = time.time()
def log(*a): print('[%5.1fs]' % (time.time() - T0), *a, flush=True)
bpy.ops.wm.open_mainfile(filepath='/data/assets_src/work/claire_s3.blend')
sc = bpy.context.scene; sc.render.engine = 'CYCLES'; sc.cycles.device = 'CPU'
joints = {k: np.array(v) for k, v in json.load(open('/data/assets_src/work/claire_joints.json')).items()}
TEXD = '/data/assets_src/tex/claire'; os.makedirs(TEXD, exist_ok=True)
Q = int(os.environ.get('TEXSIZE', '2048'))
ob = bpy.data.objects
body = ob['claire_body']; high = ob['claire_high']; rig = ob['claire_rig']
for o in ob: 
    if o.name.endswith('_high') or o.name in ('claire_body_l0',): o.hide_render = True

# ============================================================ UV layouts
def fresh_uv(o):
    while len(o.data.uv_layers): o.data.uv_layers.remove(o.data.uv_layers[0])
    o.data.uv_layers.new(name='UVMap'); smart_uv(o, 60, 0.003)
OUTFIT = ['vest', 'collar', 'zipper', 'top', 'jeans', 'belt', 'buckle', 'pouches', 'holster', 'boots', 'gloves', 'hair_tie']
for n in OUTFIT:
    o = ob[n]; fresh_uv(o)
    while len(o.data.materials): o.data.materials.pop()
    o.data.materials.append(bpy.data.materials.new('id_' + n))
ARMB = ('lUpperArm', 'lForearm', 'lHand', 'rUpperArm', 'rForearm', 'rHand')
ALLOW = {'belt': ('hips', 'spine'), 'buckle': ('hips', 'spine'), 'pouches': ('hips',), 'holster': ('hips', 'rThigh'),
         'jeans': ('hips', 'spine', 'lThigh', 'rThigh', 'lShin', 'rShin', 'lFoot', 'rFoot')}
for n, allow in ALLOW.items():
    o = ob[n]; gi = {g.index: g.name for g in o.vertex_groups}
    fixed = 0
    for v in o.data.vertices:
        ws = [(gi[g.group], g.weight) for g in v.groups if g.weight > 0]
        keep = [(k, w) for k, w in ws if k in allow]
        if len(keep) != len(ws):
            fixed += 1
            tot = sum(w for _, w in keep)
            for g in list(v.groups): g.weight = 0.0
            if tot < 1e-4: keep, tot = [(allow[0] if n != 'holster' or v.co.z > 0.8 else 'rThigh', 1.0)], 1.0
            for k, w in keep: o.vertex_groups[k].add([v.index], w / tot, 'REPLACE')
    log('weights fixed', n, fixed)
outfit = join([ob['vest']] + [ob[n] for n in OUTFIT[1:]], 'claire_outfit')
pack_uv(outfit); pack_only(outfit, 0.004)
outfit_high = join([ob[n + '_high'] for n in OUTFIT if n + '_high' in ob], 'claire_outfit_high'); outfit_high.hide_render = True
# body: keep the artist UV islands, give the head/face 1.8x texel density, then pack into 0-1
groups = [g.name for g in body.vertex_groups]
Wb = weights(body, groups)
headv = (Wb[:, groups.index('head')] + Wb[:, groups.index('neck')]) > 0.5
pack_uv(body)
uv_scale_faces(body, face_mask_from_verts(body, headv, 'any'), 1.0)
fm_head = face_mask_from_verts(body, headv, 'any')
# scale head islands per island via bmesh-free approach: scale every head face UV about its island centroid is complex;
# instead scale all head loops about the UV centroid of the head (islands keep relative layout, pack separates them)
uv = body.data.uv_layers.active.data
loops = [li for p in body.data.polygons if fm_head[p.index] for li in p.loop_indices]
A = np.array([uv[l].uv[:] for l in loops]); c = A.mean(0)
for l, a in zip(loops, A): uv[l].uv = tuple(c + (a - c) * 1.8)
pack_only(body, 0.003)
eyes = join([ob['claire_eye_L'], ob['claire_eye_R']], 'claire_eyes'); fresh_uv(eyes); pack_only(eyes, 0.01)
_la = ob['eyelashes']; _off = np.array([0.0, -0.0012, -0.0046])
if _la.data.shape_keys:
    for _kb in _la.data.shape_keys.key_blocks:
        _a = np.zeros(len(_kb.data) * 3); _kb.data.foreach_get('co', _a); _kb.data.foreach_set('co', (_a.reshape(-1, 3) + _off).ravel())
else: setV(_la, V(_la) + _off)
hair = join([ob['hair_cards'], ob['hair_cap'], ob['eyelashes']], 'claire_hair')
import bmesh as _bmesh
for _o in (body, outfit, eyes):   # triangulate BEFORE baking so the tangent basis matches the exported mesh
    _bm = _bmesh.new(); _bm.from_mesh(_o.data); _bmesh.ops.triangulate(_bm, faces=_bm.faces[:], quad_method='BEAUTY', ngon_method='BEAUTY'); _bm.to_mesh(_o.data); _bm.free()
log('uv done', 'outfit tris', tri_count(outfit), 'body', tri_count(body), 'hair', tri_count(hair))

# ============================================================ landmarks
Pb = V(body)
face = Pb[(Wb[:, groups.index('head')] > 0.6) & (np.abs(Pb[:, 0]) < 0.004)]
nose = face[np.argmin(face[:, 1])]
mz = Z(1.464); mouth = face[np.abs(face[:, 2] - mz) < 0.004]; mouth_y = mouth[:, 1].min() if len(mouth) else nose[1] + 0.012
EL, ER = joints['lEye'], joints['rEye']; RE = 0.012 * S
log('nose', nose, 'mouth y', mouth_y)

# ============================================================ SKIN
def skin_shade(P, Nn):
    n = len(P); x, y, z = P[:, 0], P[:, 1], P[:, 2]
    base = np.array([0.60, 0.395, 0.315], np.float32)
    lo = fbm(P, 3, scale=9.0); mid = fbm(P, 3, scale=38.0)
    col = base * (1 + 0.05 * lo[:, None] + 0.03 * mid[:, None])
    red = np.array([0.62, 0.30, 0.26], np.float32)
    head = (z > Z(1.40))
    def g(c, r): return np.exp(-((P - np.array(c)) ** 2).sum(1) / (2 * r * r))
    cheeks = sum(g((sx * 0.047, EL[1] + 0.012, EL[2] - 0.033), 0.017) for sx in (1, -1))
    nose_r = g(nose, 0.010) * 0.8
    ears = head * ss(0.058, 0.068, np.abs(x)) * ss(Z(1.47), Z(1.49), z) * (1 - ss(Z(1.57), Z(1.59), z)) * (y > EL[1] + 0.03)
    hands = ss(0.29, 0.34, np.abs(x)) * (z < Z(0.95))
    knuck = hands * ss(0.36, 0.38, np.abs(x)) * 0.5
    col = mix3(col, red * (col / base), np.clip(cheeks * 0.35 + nose_r * 0.4 + ears * 0.35 + knuck * 0.3, 0, 0.6))
    under = sum(g((sx * 0.031, EL[1] - 0.004, EL[2] - 0.014), 0.008) for sx in (1, -1))
    col = mix3(col, col * np.array([0.78, 0.72, 0.78]), np.clip(under * 0.5, 0, 0.5))
    # freckles (nose + cheeks)
    fr_zone = np.clip(cheeks * 1.2 + g(nose + np.array([0, 0.01, 0.012]), 0.02), 0, 1) * head
    F1, _ = worley(P, 900.0); fr = (1 - ss(0.08, 0.28, F1)) * (cellid(P, 900.0) > 0.72) * fr_zone
    col = mix3(col, col * np.array([0.72, 0.55, 0.45]), fr * 0.45)
    # lips
    dx = x / (0.0265 * S); dzu = (z - mz) / 0.0088; dzl = (z - mz) / 0.0098
    ell = np.where(z > mz, dx ** 2 + dzu ** 2, dx ** 2 + dzl ** 2)
    lipm = (1 - ss(0.72, 1.05, ell)) * (Nn[:, 1] < -0.35) * (y < mouth_y + 0.02) * head
    lipc = np.array([0.40, 0.145, 0.13], np.float32)
    col = mix3(col, lipc * (1 + 0.1 * mid[:, None]), lipm * 0.85)
    # eyebrows (strand streaks)
    brows = np.zeros(n, np.float32)
    for sx, E in ((1, EL), (-1, ER)):
        xl = x * sx
        t = (xl - 0.011) / 0.050
        zc = E[2] + 0.0165 + 0.0065 * np.sin(np.clip(t, 0, 1) * math.pi * 0.85) - 0.002 * np.clip(t, 0, 1)
        thick = 0.0042 * (1 - 0.6 * np.clip(t, 0, 1)) + 0.0009
        m = (1 - ss(thick * 0.4, thick, np.abs(z - zc))) * ss(-0.06, 0.05, t) * (1 - ss(0.86, 1.02, t)) * (Nn[:, 1] < -0.2) * (y < E[1] + 0.02)
        streak = ss(-0.2, 0.4, perlin(np.stack([xl * 330 - z * 260, z * 4200 + xl * 900, y * 60], 1)))
        brows = np.maximum(brows, m * (0.55 + 0.45 * streak))
    col = mix3(col, np.array([0.035, 0.014, 0.01]), brows * 0.95)
    # lash line / eyeliner
    liner = np.zeros(n, np.float32)
    for E in (EL, ER):
        rel = P - E; d = np.linalg.norm(rel, axis=1); elv = np.degrees(np.arctan2(rel[:, 2], -rel[:, 1]))
        liner = np.maximum(liner, np.exp(-((d - RE * 1.26) / 0.0011) ** 2) * ss(-12, 5, elv) * (rel[:, 1] < -0.3 * RE))
    col = mix3(col, np.array([0.06, 0.035, 0.03]), liner * 0.7)
    # nails
    nails = np.zeros(n, np.float32)
    for sx in (1, -1):
        s = 'l' if sx > 0 else 'r'; w = joints[s + 'Hand']; tip = joints[s + 'HandTip']
        rel = P - w; dd = np.linalg.norm(rel, axis=1)
        nails = np.maximum(nails, ss(0.188, 0.197, dd) * (Nn[:, 0] * sx > 0.25) * (np.abs(x) > 0.3))
    col = mix3(col, np.array([0.62, 0.42, 0.38]), nails * 0.7)
    # subtle veins on forearms/hands
    veins = (1 - ss(0.0, 0.06, np.abs(fbm(P * np.array([30, 30, 8]), 2)))) * ss(0.2, 0.3, np.abs(x)) * (z < Z(1.1))
    col = mix3(col, col * np.array([0.8, 0.85, 1.05]), veins * 0.25)
    rough = 0.50 + 0.06 * mid
    tz = head * ((ss(EL[2] + 0.02, EL[2] + 0.04, z) * (Nn[:, 1] < -0.5)) + g(nose, 0.015))
    rough = rough - 0.09 * np.clip(tz, 0, 1) - 0.18 * lipm - 0.22 * nails + 0.08 * brows
    # micro relief: pores (face finer), wrinkles on knuckles, lips vertical lines
    F1f, _ = worley(P, 2300.0); F1b, _ = worley(P, 1300.0)
    pores = np.where(head, 1 - ss(0.0, 0.35, F1f), 1 - ss(0.0, 0.3, F1b) * 0.6)
    h = -0.000035 * pores * (1 - lipm) + 0.00002 * fbm(P, 3, scale=500.0)
    h += -0.00004 * lipm * ss(0.3, 0.9, np.abs(np.sin(x * 2 * math.pi / 0.0016)))
    h += -0.00005 * knuck * ss(0.2, 0.8, np.abs(np.sin(P @ np.array([0, 0.6, 0.8]) * 2 * math.pi / 0.0025)))
    h += 0.00006 * nails
    rough = rough + 0.05 * pores
    return col, np.clip(rough, 0.15, 0.95), np.zeros(n, np.float32), h

# ============================================================ OUTFIT
ID = {n: i for i, n in enumerate(OUTFIT)}
text_img = Image.new('L', (1400, 260), 0); dr = ImageDraw.Draw(text_img)
try: font = ImageFont.truetype('/usr/share/fonts/msttcore/impact.ttf', 200)
except Exception:
    font = ImageFont.truetype(sorted([os.path.join(r, f) for r, _, fs in os.walk('/usr/share/fonts') for f in fs if f.lower().startswith('impact') or 'Bold' in f])[0], 200)
dr.text((700, 130), 'LET ME LIVE', fill=255, font=font, anchor='mm')
TXT = np.array(text_img, np.float32) / 255.0
def sample_text(u, v):
    H, W = TXT.shape; ui = np.clip(u, 0, 0.9999) * (W - 1); vi = np.clip(1 - v, 0, 0.9999) * (H - 1)
    x0 = ui.astype(int); y0 = vi.astype(int); fx = ui - x0; fy = vi - y0
    a = TXT[y0, x0] * (1 - fx) + TXT[y0, np.minimum(x0 + 1, W - 1)] * fx
    b = TXT[np.minimum(y0 + 1, H - 1), x0] * (1 - fx) + TXT[np.minimum(y0 + 1, H - 1), np.minimum(x0 + 1, W - 1)] * fx
    return (a * (1 - fy) + b * fy) * (u >= 0) * (u <= 1) * (v >= 0) * (v <= 1)

VALK = np.array(Image.open('/data/assets_src/work/valkyrie.png').convert('RGBA'), np.float32) / 255.0
VALK[..., :3] = VALK[..., :3] ** 2.2
def sample_print(u, v):
    H, W = VALK.shape[:2]; ui = np.clip(u, 0, 0.9999) * (W - 1); vi = np.clip(1 - v, 0, 0.9999) * (H - 1)
    x0 = ui.astype(int); y0 = vi.astype(int); fx = (ui - x0)[:, None]; fy = (vi - y0)[:, None]
    x1 = np.minimum(x0 + 1, W - 1); y1 = np.minimum(y0 + 1, H - 1)
    p = (VALK[y0, x0] * (1 - fx) + VALK[y0, x1] * fx) * (1 - fy) + (VALK[y1, x0] * (1 - fx) + VALK[y1, x1] * fx) * fy
    inside = ((u >= 0) & (u <= 1) & (v >= 0) & (v <= 1)).astype(np.float32)
    return p[:, :3] * 0.8, p[:, 3] * inside
band_z = Z(0.952)
def outfit_shade(P, Nn, ids):
    n = len(P); x, y, z = P[:, 0], P[:, 1], P[:, 2]
    col = np.zeros((n, 3), np.float32); rough = np.full(n, 0.7, np.float32); metal = np.zeros(n, np.float32); h = np.zeros(n, np.float32)
    lo = fbm(P, 3, scale=7.0); mid = fbm(P, 3, scale=40.0); hi = fbm(P, 2, scale=260.0)
    def M(name): return ids == ID[name]
    theta = np.arctan2(x, -(y + 0.005))
    # ---- biker jacket + collar/lapels (dark red-brown leather)
    m = M('vest') | M('collar')
    if np.any(m):
        F1, F2 = worley(P, 1400.0)
        pebble = ss(0.0, 0.5, F2 - F1)                      # leather pebble grain
        crease = ss(0.55, 0.95, np.abs(fbm(P * np.array([60, 60, 160]), 3)))
        base = np.array([0.062, 0.016, 0.011], np.float32)
        c = base * (1 + 0.18 * lo[:, None] + 0.10 * mid[:, None] - 0.08 * pebble[:, None])
        arm = np.abs(x) > 0.165
        side = (np.abs(np.abs(theta) - math.pi / 2)) * 0.13
        princ = np.where(y < 0, np.abs(np.abs(x) - 0.075), np.abs(np.abs(x) - 0.085))
        yoke = np.where((y > 0) & ~arm, np.abs(z - Z(1.30)), 1.0)
        hemband = np.abs(z - (Z(1.0) + 0.045))
        hem = z - (Z(1.0) + 0.006)
        # zip pockets: diagonal chest pocket (wearer's left) + two horizontal waist pockets
        cx_ = x - 0.075; cz_ = z - Z(1.24)
        chest = np.where((y < 0) & (np.abs(cx_) < 0.035) & (np.abs(cz_) < 0.03), np.abs(cz_ - 0.45 * cx_), 1.0)
        waist = np.where((y < 0) & (np.abs(np.abs(x) - 0.105) < 0.04), np.abs(z - Z(1.07) - 0.12 * (np.abs(x) - 0.105)), 1.0)
        pocket = np.minimum(chest, waist)
        pk_teeth = line_mask(pocket, 0.0018, 0.0012)
        pk_lip = line_mask(pocket, 0.0045, 0.0015) - pk_teeth
        sleeve_seam = np.where(arm, np.abs(y - 0.012), 1.0)
        along = z + 0.3 * x
        groove = (line_mask(side, 0.0025, 0.002) + line_mask(princ, 0.0022, 0.0018) + line_mask(yoke, 0.002, 0.0015)
                  + line_mask(hemband, 0.002, 0.0015) + line_mask(sleeve_seam, 0.002, 0.0015))
        st = (stitches(side - 0.0035, along) + stitches(princ - 0.0032, along) + stitches(yoke - 0.003, x)
              + stitches(hemband - 0.003, x + y) + stitches(hem, x * np.sign(y + 1e-6) + y) + stitches(pocket - 0.006, x))
        # worn edges / highlights on creases, darker in folds
        wear = np.clip(groove * 0.5 + crease * 0.5, 0, 1) * ss(-0.2, 0.6, hi)
        c = mix3(c, c * np.array([1.9, 1.7, 1.6]) + 0.01, wear * 0.35)
        c = mix3(c, np.array([0.035, 0.010, 0.007]), np.clip(groove, 0, 1) * 0.6)
        c = mix3(c, np.array([0.16, 0.10, 0.07]), np.clip(st, 0, 1) * 0.55)   # tan thread
        c = mix3(c, np.array([0.03, 0.028, 0.027]), pk_teeth * 0.95)          # pocket zips (dark metal)
        c = mix3(c, np.array([0.04, 0.012, 0.008]), np.clip(pk_lip, 0, 1) * 0.7)
        grime = ss(0.2, 0.8, lo) * 0.2
        c = c * (1 - grime[:, None] * 0.3)
        # back print: Valkyrie patch
        u = (0.12 - x) / 0.24; v = (z - Z(1.065)) / 0.245
        pr, pa = sample_print(u, v)
        pa = pa * (y > 0) * (Nn[:, 1] > 0.25) * ~arm * (0.82 + 0.18 * ss(-0.4, 0.3, mid + 0.4))
        c = mix3(c, pr, pa * 0.95)
        col[m] = c[m]
        rough[m] = (0.42 + 0.08 * mid + 0.10 * pebble - 0.10 * wear + 0.2 * pa)[m]
        metal[m] = (0.9 * pk_teeth)[m]
        h[m] = (0.00004 * hi - 0.00003 * pebble - 0.00025 * groove + 0.00010 * st - 0.0002 * pk_lip + 0.00012 * pk_teeth
                + 0.00006 * pa - 0.00008 * crease)[m]
    # ---- black tank top (jersey)
    m = M('top')
    if np.any(m):
        c = np.array([0.018, 0.018, 0.02]) * (1 + 0.15 * mid[:, None])
        col[m] = c[m]; rough[m] = 0.82; h[m] = (0.00003 * perlin(P * np.array([2400, 2400, 300])))[m]
    # ---- jeans (indigo denim)
    m = M('jeans')
    if np.any(m):
        leg_s = np.sign(x + 1e-6)
        streak = fbm(P * np.array([70, 70, 12]), 3)
        c = mix3(np.array([0.030, 0.052, 0.13]), np.array([0.085, 0.13, 0.26]), np.clip(0.28 + 0.35 * streak, 0, 1))
        c = c * (1 + 0.08 * lo[:, None])
        thigh_front = (y < 0.0) * ss(Z(0.52), Z(0.62), z) * (1 - ss(Z(0.82), Z(0.88), z))
        knee = np.exp(-((z - Z(0.46)) / 0.05) ** 2) * (y < 0.02)
        seat = (y > 0.02) * np.exp(-((z - Z(0.82)) / 0.07) ** 2)
        whisk_m = (y < 0) * np.exp(-((z - Z(0.84)) / 0.04) ** 2) * ss(0.02, 0.06, np.abs(x)) * (1 - ss(0.12, 0.16, np.abs(x)))
        whisk = ss(0.35, 0.8, perlin(np.stack([x * 30 * leg_s + z * 40, z * 160, y * 10], 1))) * whisk_m
        fade = np.clip(thigh_front * 0.35 * ss(-0.3, 0.6, lo) + knee * 0.3 + seat * 0.3 + whisk * 0.8, 0, 1)
        c = mix3(c, np.array([0.20, 0.27, 0.40]), fade * 0.6)
        # waistband
        wl = Z(0.972) + 0.014 * np.tanh(y / 0.05)
        wb = z > wl - 0.036
        gold = np.array([0.55, 0.33, 0.10])
        st = stitches(z - (wl - 0.005), theta * 0.15) + stitches(z - (wl - 0.034), theta * 0.15) + stitches(z - (wl - 0.038), theta * 0.15)
        # leg seams: angle around each leg axis
        th = np.where(leg_s > 0, 1, 0)
        cx = np.interp(z, [Z(0.2), Z(0.46), Z(0.87)], [0.118, 0.11, 0.09]) * leg_s
        phi = np.arctan2(y - 0.005, (x - cx) * leg_s)
        rr = np.hypot(x - cx, y - 0.005)
        outs = np.abs(phi) * rr
        ins = np.abs(np.abs(phi) - math.pi) * rr
        legz = (z < Z(0.86))
        st = st + legz * (stitches(outs - 0.004, z) + stitches(ins - 0.003, z) + stitches(ins + 0.003, z) * 0 + stitches(ins - 0.0065, z))
        groove = legz * (line_mask(outs, 0.002, 0.0015) + line_mask(ins, 0.002, 0.0015))
        # back pockets
        px = np.abs(x) - 0.075; pz = z - Z(0.858)
        bot = 0.058 + 0.018 * (1 - np.clip(np.abs(px) / 0.063, 0, 1))
        sdf = np.maximum.reduce([np.abs(px) - 0.063, pz - 0.047, -pz - bot])
        pk = (y > 0.02) * (Nn[:, 1] > 0.2)
        st = st + pk * (stitches(sdf + 0.0025, px + pz) + stitches(sdf + 0.0065, px + pz))
        c = mix3(c, c * 0.85, pk * (sdf < 0) * 0.5)
        # front pockets + fly
        fp = np.abs(np.hypot(np.abs(x) - 0.165, z - Z(0.955)) - 0.078) * (y < 0) * (np.abs(x) < 0.16) * (z > Z(0.86))
        st = st + stitches(fp - 0.003, z + x) * (fp > 0)
        fly_x = 0.032 - 0.032 * ss(Z(0.845), Z(0.80), z)
        fly = (y < 0) * (x > -0.005) * (z > Z(0.795)) * (z < wl - 0.036)
        st = st + fly * (stitches(np.abs(x - fly_x) - 0.0, z) + stitches(np.abs(x - fly_x) - 0.004, z))
        rivet = sum(np.exp(-(((np.abs(x) - rx) ** 2 + (z - rz) ** 2) / (2 * 0.0028 ** 2))) for rx, rz in ((0.155, Z(0.94)), (0.10, Z(0.878)))) * (y < 0)
        st = np.clip(st, 0, 1)
        c = mix3(c, gold, st * 0.8)
        c = mix3(c, np.array([0.55, 0.32, 0.18]), ss(0.4, 0.6, rivet))
        c = c * (1 - 0.12 * wb[:, None])
        col[m] = c[m]
        rough[m] = (0.84 + 0.05 * mid - 0.45 * ss(0.4, 0.6, rivet))[m]
        metal[m] = ss(0.4, 0.6, rivet)[m]
        diag = perlin(np.stack([(x + z) * 700 * leg_s, (y - z) * 700, z * 80], 1))
        h[m] = (0.00004 * diag - 0.00035 * groove + 0.00012 * st + 0.0003 * ss(0.3, 0.7, rivet) + 0.0002 * pk * (sdf < 0))[m]
    # ---- boots (brown leather, rubber sole, laces)
    m = M('boots')
    if np.any(m):
        sgn = np.sign(x + 1e-6); fc = np.where(sgn[:, None] > 0, joints['lFoot'], joints['rFoot'])
        lat = (x - fc[:, 0]) * sgn
        F1, _ = worley(P, 700.0)
        leather = np.array([0.080, 0.045, 0.026]) * (1 + 0.18 * lo[:, None] + 0.1 * mid[:, None])
        c = leather.copy()
        sole = (z < SOLE * 0.95)
        c = mix3(c, np.array([0.02, 0.018, 0.016]), sole * 1.0)
        welt = stitches(z - (SOLE + 0.003), x + y, 0.0012, 0.004)
        front = (y < fc[:, 1] + 0.01) & (z > Z(0.07)) & (z < Z(0.295))
        lace_zone = front * (1 - ss(0.012, 0.018, np.abs(lat))) * (Nn[:, 1] < -0.2)
        a1 = ((lat + z) / 0.012) % 1.0; a2 = ((-lat + z) / 0.012) % 1.0
        lace = lace_zone * np.clip(line_mask(a1 - 0.5, 0.35, 0.08) + line_mask(a2 - 0.5, 0.35, 0.08), 0, 1)
        eyel = front * np.exp(-((np.abs(lat) - 0.017) ** 2 + (((z / 0.012) % 1.0 - 0.5) * 0.012) ** 2) / (2 * 0.0018 ** 2))
        c = mix3(c, np.array([0.025, 0.02, 0.018]), lace)
        c = mix3(c, np.array([0.45, 0.42, 0.38]), ss(0.5, 0.7, eyel))
        toe = (y < fc[:, 1] - 0.075) & (z < SOLE + 0.06)
        c = mix3(c, c * 0.8, toe * 0.5)
        crease = (1 - ss(0.0, 0.04, np.abs(perlin(P * np.array([40, 40, 160]))))) * np.exp(-((z - Z(0.10)) / 0.03) ** 2)
        c = c * (1 - 0.35 * crease[:, None])
        topb = ss(Z(0.28), Z(0.29), z)
        c = mix3(c, c * 0.6, topb)
        c = mix3(c, np.array([0.25, 0.18, 0.1]), welt * 0.6)
        scuff = ss(0.55, 0.85, fbm(P, 3, scale=25.0)) * (z < Z(0.12))
        c = mix3(c, np.array([0.16, 0.12, 0.09]), scuff * 0.5)
        col[m] = c[m]
        rough[m] = np.where(sole, 0.9, 0.42 + 0.12 * mid + 0.3 * lace + 0.2 * scuff - 0.1 * toe)[m]
        metal[m] = ss(0.5, 0.7, eyel)[m]
        tread = sole * (Nn[:, 2] < -0.5) * ss(0.3, 0.6, np.abs(np.sin(y * 2 * math.pi / 0.009)))
        ribs = sole * (np.abs(Nn[:, 2]) < 0.5) * np.abs(np.sin(z * 2 * math.pi / 0.004))
        h[m] = (-0.00005 * F1 + 0.0004 * lace + 0.0003 * ss(0.5, 0.7, eyel) - 0.0006 * tread - 0.0002 * ribs + 0.0001 * welt - 0.00025 * crease)[m]
    # ---- gloves (black leather, velcro strap)
    m = M('gloves')
    if np.any(m):
        F1, _ = worley(P, 1100.0)
        c = np.array([0.022, 0.019, 0.018]) * (1 + 0.2 * mid[:, None])
        sgn = np.sign(x); wr = np.where(sgn[:, None] > 0, joints['lHand'], joints['rHand']); fo = np.where(sgn[:, None] > 0, joints['lForearm'], joints['rForearm'])
        fd = (wr - fo) / np.linalg.norm(wr - fo, axis=1)[:, None]
        t = ((P - wr) * fd).sum(1)
        strap = (t > -0.036) & (t < -0.012)
        c = mix3(c, np.array([0.03, 0.03, 0.032]), strap * 1.0)
        st = stitches(t + 0.037, x * sgn + y) + stitches(t + 0.011, x * sgn + y)
        c = mix3(c, np.array([0.08, 0.08, 0.08]), st * 0.6)
        col[m] = c[m]; rough[m] = np.where(strap, 0.85, 0.38 + 0.1 * mid)[m]
        h[m] = (-0.00003 * F1 + 0.0002 * strap * perlin(P * 3000) * 0.3 + 0.0001 * st)[m]
    # ---- belt
    m = M('belt')
    if np.any(m):
        bh = z - (band_z - 0.010 * np.cos(theta))
        F1, _ = worley(P, 800.0)
        c = np.array([0.03, 0.02, 0.014]) * (1 + 0.2 * mid[:, None])
        st = stitches(np.abs(bh) - 0.0125, theta * 0.15)
        edge = ss(0.0145, 0.017, np.abs(bh))
        c = mix3(c, np.array([0.12, 0.09, 0.07]), st * 0.5 + edge * 0.3)
        col[m] = c[m]; rough[m] = (0.45 + 0.1 * mid)[m]; h[m] = (-0.00004 * F1 + 0.00012 * st)[m]
    for nm_, c_, r_, me_ in (('buckle', (0.56, 0.55, 0.53), 0.30, 1.0), ('zipper', (0.30, 0.29, 0.28), 0.38, 1.0)):
        m = M(nm_)
        if np.any(m):
            scratch = ss(0.6, 0.95, np.abs(perlin(P * np.array([300, 4000, 300]))))
            c = np.array(c_) * (1 + 0.1 * mid[:, None]); c = mix3(c, np.array(c_) * 1.3, scratch * 0.4)
            col[m] = c[m]; rough[m] = (r_ + 0.1 * hi - 0.1 * scratch)[m]; metal[m] = me_
            if nm_ == 'zipper':
                cuff = np.abs(x) > 0.165
                teeth = ss(0.2, 0.5, np.abs(np.sin(z * 2 * math.pi / 0.0032))) * ~cuff
                h[m] = (0.0002 * teeth)[m]; col[m] = mix3(col, col * 0.35, 1 - teeth)[m]
                mc = m & cuff
                if np.any(mc):
                    F1c, F2c = worley(P, 1400.0)
                    cc = np.array([0.07, 0.017, 0.011]) * (1 + 0.15 * mid[:, None] - 0.1 * ss(0, 0.5, F2c - F1c)[:, None])
                    col[mc] = cc[mc]; rough[mc] = 0.45; metal[mc] = 0.0; h[mc] = (-0.00003 * ss(0, 0.5, F2c - F1c))[mc]
    for nm_ in ('pouches', 'holster', 'hair_tie'):
        m = M(nm_)
        if np.any(m):
            weave = perlin(P * np.array([1500, 1500, 1500]))
            c = np.array([0.024, 0.024, 0.026]) * (1 + 0.15 * mid[:, None] + 0.1 * weave[:, None])
            col[m] = c[m]; rough[m] = (0.8 + 0.05 * mid)[m]; h[m] = (0.00004 * weave)[m]
    return col, np.clip(rough, 0.05, 1.0), metal, h

# ============================================================ texture sets
def build_set(o, name, size, shade, high_obj=None, ao_size=1024, ao_dist=0.08, extrusion=0.006, ray=0.02, bump=1.0, ids=False):
    log(name, 'bake maps...')
    pos = bake_emit(o, size, 'pos'); nrm = bake_emit(o, size, 'nrm')
    cov, P, Nn = decode(pos, nrm)
    idmap = bake_emit(o, size, 'id') if ids else None
    Pc, Nc = P[cov], Nn[cov]
    idc = (np.round(idmap[..., 0][cov] * 64) - 1).astype(int) if ids else None
    log(name, 'shading', int(cov.sum()), 'texels')
    col, rough, metal, h = shade(Pc, Nc, idc) if ids else shade(Pc, Nc)
    def full(v, ch):
        a = np.zeros((size, size, ch) if ch > 1 else (size, size), np.float32); a[cov] = v; return a
    ao = bake_ao(o, ao_size, 24, ao_dist)
    if ao_size != size:
        ao = np.array(Image.fromarray((ao * 255).astype(np.uint8)).resize((size, size), Image.BILINEAR), np.float32) / 255.0
    albedo = full(col, 3) * (0.55 + 0.45 * ao[..., None])
    albedo = finish(albedo, cov)
    orm = np.stack([ao, finish(full(rough, 1), cov), finish(full(metal, 1), cov)], -1)
    log(name, 'normal...')
    gn = bake_normal_from_high(o, high_obj, size, extrusion, ray)[..., :3] if high_obj is not None else np.dstack([np.full((size, size), 0.5), np.full((size, size), 0.5), np.ones((size, size))])
    _n = gn * 2 - 1; _inv = _n[..., 2] < -0.35
    _n[_inv] = -_n[_inv]; log(name, 'inverted normal texels', int(_inv.sum()))
    gn = (_n + 1) * 0.5
    _bad = (_n[..., 2] < 0.35) | ~np.isfinite(_n).all(-1)
    gn[_bad] = (0.5, 0.5, 1.0)
    log(name, 'bad normal texels', int(_bad.sum()))
    hmap = finish(full(h, 1), cov)
    nf = bake_combined_normal(o, gn, hmap, size, bump)[..., :3]
    save_rgb(albedo, f'{TEXD}/{name}_albedo.jpg', 90)
    _n = nf * 2 - 1; _bad = _n[..., 2] < 0.2; nf = nf.copy(); nf[_bad] = (0.5, 0.5, 1.0)
    save_rgb(nf, f'{TEXD}/{name}_normal.jpg', 92, srgb=False)
    Image.fromarray((np.clip(orm[::-1], 0, 1) * 255).astype(np.uint8)).resize((size // 2, size // 2), Image.LANCZOS).save(f'{TEXD}/{name}_orm.jpg', quality=90)
    log(name, 'saved')

build_set(body, 'claire_skin', Q, skin_shade, high, ao_dist=0.05, extrusion=0.004, ray=0.012)
build_set(outfit, 'claire_outfit', Q, outfit_shade, outfit_high, ao_dist=0.06, extrusion=0.005, ray=0.014, ids=True)

# ============================================================ eyes (iris/sclera from object-space direction)
def eye_shade(P, Nn):
    n = len(P); out = np.zeros((n, 3), np.float32)
    c = np.where((P[:, 0] > 0)[:, None], EL, ER)
    d = P - c; d /= np.linalg.norm(d, axis=1)[:, None]
    a = np.degrees(np.arccos(np.clip(-d[:, 1], -1, 1)))
    ang = np.arctan2(d[:, 2], d[:, 0])
    fib = perlin(np.stack([np.cos(ang) * 6, np.sin(ang) * 6, a * 0.35], 1)) * 0.5 + perlin(np.stack([ang * 40, a * 0.8, a * 0.1], 1)) * 0.5
    iris = np.array([0.10, 0.20, 0.33]) * (1 + 0.5 * fib[:, None])
    iris = mix3(iris, np.array([0.30, 0.22, 0.10]), (1 - ss(10, 15, a)) * 0.6)
    iris = mix3(iris, np.array([0.02, 0.03, 0.05]), ss(23, 27, a))
    sclera = np.array([0.74, 0.70, 0.66]) * (1 + 0.03 * fbm(P, 2, scale=400.0)[:, None])
    veins = (1 - ss(0.0, 0.05, np.abs(fbm(P, 3, scale=600.0)))) * ss(45, 75, a)
    sclera = mix3(sclera, np.array([0.55, 0.20, 0.18]), veins * 0.5)
    sclera = mix3(sclera, sclera * 0.8, ss(60, 90, a))
    col = np.where((a < 28)[:, None], iris, sclera)
    col = mix3(col, np.array([0.01, 0.01, 0.012]), 1 - ss(8.5, 10.0, a))
    edge = np.exp(-((a - 28) / 1.5) ** 2); col = mix3(col, col * 0.5, edge)
    return col, np.full(n, 0.06, np.float32), np.zeros(n, np.float32), -0.0002 * (1 - ss(20, 29, a))
build_set(eyes, 'claire_eyes', 512, eye_shade, None, ao_size=256, ao_dist=0.01)

# ============================================================ hair atlas (strands, cap tile, lashes)
HS = 1024
rng = np.random.RandomState(5)
acc = np.zeros((HS, HS, 3), np.float32); alpha = np.zeros((HS, HS), np.float32)
dark = np.array([0.048, 0.013, 0.009]); light = np.array([0.215, 0.058, 0.034])   # CV: dark burgundy-chestnut
rows = np.arange(HS)
def strand(x0, r0, r1, amp, freq, ph, width, col_s, alpha_s, wrap=None, taper=True):
    rr = rows[r0:r1]; t = (rr - r0) / max(1, (r1 - r0 - 1))
    xc = x0 + amp * np.sin(rr * freq + ph)
    for dx in range(-3, 4):
        xi = np.floor(xc).astype(int) + dx
        w = np.exp(-((xi + 0.5 - xc) / (width * 0.6)) ** 2)
        a = alpha_s * w * ((1 - ss(0.88, 1.0, 1 - t)) if taper else 1)
        if wrap: xi = wrap[0] + (xi - wrap[0]) % (wrap[1] - wrap[0])
        ok = (xi >= 0) & (xi < HS)
        ri, xi_, a_ = rr[ok], xi[ok], a[ok]
        cc = col_s[None, :] * (0.7 + 0.6 * (1 - t[ok]))[:, None] if not taper else col_s[None, :] * (0.55 + 0.6 * t[ok])[:, None]
        acc[ri, xi_] = acc[ri, xi_] * (1 - a_[:, None]) + cc * a_[:, None]
        alpha[ri, xi_] = 1 - (1 - alpha[ri, xi_]) * (1 - a_)
# opaque core under the strands: cards stay solid under mip-mapping/alpha test (sparse strands alone vanish at a
# distance -> see-through hair); only the card edges and the staggered tips are wispy
_xf = (np.arange(128) + 0.5) / 128; _rf = (rows + 0.5) / HS
for vi in range(4):
    xa = 512 + vi * 128
    _p1, _p2, _k1, _k2 = rng.uniform(0, 6.28), rng.uniform(0, 6.28), rng.uniform(6, 14), rng.uniform(6, 14)
    ex = ss(0.02, 0.22, _xf[None, :] + 0.07 * np.sin(_rf[:, None] * _k1 + _p1)) * ss(0.02, 0.22, 1 - _xf[None, :] + 0.07 * np.sin(_rf[:, None] * _k2 + _p2))
    ey = ss(0.02 + 0.04 * rng.uniform(), 0.13, _rf)
    _tip = np.convolve(rng.uniform(0.0, 0.16, 132) ** 1.4 * 1.6, np.ones(3) / 3, 'same')[2:130]   # jagged strand ends per column
    stag = ss(0.0, 0.03, _rf[:, None] - _tip[None, :])
    a_ = ey[:, None] * ex * stag * 0.98
    lum = 0.12 + 0.75 * np.convolve(rng.uniform(0, 1, 140), np.ones(2) / 2, 'same')[:128] ** 1.3
    c_ = (dark[None, None, :] + (light - dark)[None, None, :] * lum[None, :, None]) * (0.6 + 0.5 * _rf)[:, None, None]
    acc[:, xa:xa + 128] = acc[:, xa:xa + 128] * (1 - a_[..., None]) + c_ * a_[..., None]
    alpha[:, xa:xa + 128] = 1 - (1 - alpha[:, xa:xa + 128]) * (1 - a_)
# card strips (u 0.5..1): root at top rows (v=1)
for vi in range(4):
    xa = 512 + vi * 128
    for k in range(95):
        L = rng.uniform(0.82, 1.0)
        r1 = HS; r0 = int(HS - L * HS * 0.98)
        col_s = dark + (light - dark) * rng.uniform(0.1, 0.9)
        strand(xa + rng.uniform(6, 122), r0, r1, rng.uniform(0.5, 3.0), rng.uniform(0.004, 0.02), rng.uniform(0, 6.28), rng.uniform(1.0, 2.3), col_s, rng.uniform(0.6, 1.0))
# cap tile (u 0..0.5, v 0.08..1): dense, tileable horizontally, opaque
r_cap0 = int(0.08 * HS)
acc[r_cap0:, :512] = (dark * 0.9)[None, None, :]; alpha[r_cap0:, :512] = 1.0
for k in range(900):
    col_s = dark + (light - dark) * rng.uniform(0.0, 0.8)
    strand(rng.uniform(0, 512), r_cap0, HS, rng.uniform(0.3, 2.0), rng.uniform(0.003, 0.012), rng.uniform(0, 6.28), rng.uniform(1.0, 2.0), col_s, rng.uniform(0.4, 0.9), wrap=(0, 512), taper=False)
alpha[r_cap0:, :512] = 1.0
# lash strip (u 0..0.5, v 0..0.065): root at top of the strip, tips at the bottom
lr1 = int(0.066 * HS)
for k in range(260):
    x0 = rng.uniform(4, 508); ln = rng.uniform(0.6, 1.0)
    strand(x0, max(0, int(lr1 - ln * lr1)), lr1, rng.uniform(0.5, 2.5), rng.uniform(0.05, 0.1), rng.uniform(0, 6.28), 1.0, np.array([0.012, 0.008, 0.007]), 0.8) if k % 3 else None
avg = acc[alpha > 0.5].mean(0)
acc = np.where(alpha[..., None] > 0.02, acc / np.maximum(alpha[..., None], 1e-3) * np.minimum(alpha[..., None] * 3, 1) + avg * (1 - np.minimum(alpha[..., None] * 3, 1)), avg)
rgba = np.concatenate([np.clip(acc, 0, 1), alpha[..., None]], -1)
srgb = np.where(rgba[..., :3] <= 0.0031308, rgba[..., :3] * 12.92, 1.055 * np.power(rgba[..., :3], 1 / 2.4) - 0.055)
Image.fromarray((np.concatenate([srgb, rgba[..., 3:]], -1)[::-1] * 255).astype(np.uint8), 'RGBA').save(f'{TEXD}/claire_hair.png', optimize=True)
log('hair atlas saved')
# vertex colours (hair cap alpha fade already on the cap; cards/lashes opaque)
if 'Col' not in hair.data.color_attributes:
    ca = hair.data.color_attributes.new(name='Col', type='FLOAT_COLOR', domain='POINT')
    for d in ca.data: d.color = (1, 1, 1, 1)

# ============================================================ export materials + GLB
def load(p, noncolor=False):
    im = bpy.data.images.load(p, check_existing=False)
    if noncolor: im.colorspace_settings.name = 'Non-Color'
    return im
def set_mat(o, mat):
    while len(o.data.materials): o.data.materials.pop()
    o.data.materials.append(mat)
    for p in o.data.polygons: p.material_index = 0
for o, name in ((body, 'claire_skin'), (outfit, 'claire_outfit'), (eyes, 'claire_eyes')):
    mat = export_material(name, load(f'{TEXD}/{name}_albedo.jpg'), load(f'{TEXD}/{name}_normal.jpg', True), load(f'{TEXD}/{name}_orm.jpg', True))
    set_mat(o, mat)
hmat = export_material('claire_hair', load(f'{TEXD}/claire_hair.png'), None, None, rough=0.42, alpha=True)
set_mat(hair, hmat)
for o in (body, outfit, eyes, hair):
    for m in list(o.modifiers):
        if m.type != 'ARMATURE': o.modifiers.remove(m)
    if not any(m.type == 'ARMATURE' for m in o.modifiers):
        mm = o.modifiers.new('rig', 'ARMATURE'); mm.object = rig
    o.parent = rig
    normalize_limit(o)
for o in list(ob):
    if o.name.endswith('_high') or o.name in ('claire_high', 'claire_body_l0', 'claire_outfit_high'):
        bpy.data.objects.remove(o)
os.makedirs(OUT_GLB, exist_ok=True)
for _o in [body, outfit, eyes, hair]:
    import bmesh
    _bm = bmesh.new(); _bm.from_mesh(_o.data)
    bmesh.ops.triangulate(_bm, faces=_bm.faces[:], quad_method='BEAUTY', ngon_method='BEAUTY')
    _bm.to_mesh(_o.data); _bm.free(); _o.data.update()
export_glb(f'{OUT_GLB}/claire.glb', [rig, body, outfit, eyes, hair], dict(export_vertex_color='ACTIVE', export_all_vertex_colors=False) if False else dict())
save_blend(f'{OUT_BLEND}/claire.blend')
log('DONE', {o.name: tri_count(o) for o in (body, outfit, eyes, hair)})
