"""Detailed pickup item models (RE-style) → src/assets/models/item_<id>.glb.
   Run: cd /data/assets_src && python3 tools/items.py [id ...]"""
import sys; sys.path.insert(0, '/data/assets_src/tools')
from hs import *
import random

ONLY = set(sys.argv[1:])
OUT = OUT_GLB
def export(o, id_):
    export_glb(f'{OUT}/item_{id_}.glb', [o], {'export_tangents': False})

# ------------------------------------------------------------------ shared parts
def cartridge(name, loc, case_len=0.019, r=0.0048, bullet=0.012, brass=(0.78, 0.55, 0.22), tip=(0.62, 0.35, 0.2), rot=(0, 0, 0), hp=False):
    m1 = mat('brass', brass, 0.3, 1.0); m2 = mat('copper_' + str(tip), tip, 0.35, 1.0)
    c = lathe(name + '_c', [(0, 0), (r * 1.02, 0), (r * 1.02, 0.0012), (r * 0.86, 0.0016), (r * 0.9, 0.0024), (r, 0.003), (r, case_len), (r * 0.96, case_len)], m1, segs=20)
    b = lathe(name + '_b', [(r * 0.94, case_len - 0.0005)] + [(r * 0.94 * math.cos(t * math.pi / 2) ** 0.6, case_len + bullet * math.sin(t * math.pi / 2)) for t in np.linspace(0.05, 1, 7)], m2, segs=20)
    o = join([c, b], name); o.rotation_euler = rot; o.location = loc; apply_transform(o); return o

def cardboard_box(name, size, loc, col, top_tex=None, side_tex=None, flap=True):
    m = mat('card_' + name, col, 0.8)
    parts = [box(name, size, loc, m, bev=0.0015, seg=2)]
    x, y, z = size; lx, ly, lz = loc
    if top_tex: parts.append(decal(name + '_top', x * 0.96, y * 0.94, (lx, ly, lz + z / 2 + 0.0004), (0, 0, 0), top_tex, 0.75))
    if side_tex:
        parts.append(decal(name + '_side', x * 0.96, z * 0.86, (lx, ly - y / 2 - 0.0004, lz), (math.pi / 2, 0, 0), side_tex, 0.75))
    if flap:  # tuck flap seam
        parts.append(box(name + '_seam', (x * 0.98, 0.0012, 0.0008), (lx, ly + y * 0.2, lz + z / 2 + 0.0002), mat('card_seam', tuple(c * 0.7 for c in col), 0.9)))
    return parts

def label_tex(fname, W, H, bg, lines, stripe=None, fg=(20, 20, 20), border=None, seed=1):
    def dr(img, d):
        if stripe: d.rectangle([0, int(H * stripe[0]), W, int(H * stripe[1])], fill=stripe[2])
        if border: d.rectangle([6, 6, W - 7, H - 7], outline=border, width=4)
        for (txt, fy, sz, fnt, col) in lines:
            f = font(fnt, sz); tw = d.textlength(txt, font=f)
            d.text(((W - tw) / 2, H * fy - sz / 2), txt, font=f, fill=col or fg)
    img = Image.new('RGBA', (W, H), bg); d = ImageDraw.Draw(img); dr(img, d)
    img = grunge(img, 0.18, seed)
    p = f'{TEXDIR}/{fname}.png'; img.save(p); return p

# ------------------------------------------------------------------ ammo
def ammo_hg():
    t = label_tex('lab_hg_top', 512, 320, (196, 170, 120, 255), [('9mm', 0.3, 110, FONT, (120, 20, 15)), ('PARABELLUM', 0.62, 64, FONT, (25, 25, 25)), ('15 CENTERFIRE CARTRIDGES', 0.86, 30, FONT_SANS, (40, 40, 40))], stripe=(0.0, 0.08, (130, 25, 20)))
    s = label_tex('lab_hg_side', 512, 160, (180, 152, 104, 255), [('HANDGUN AMMUNITION · 124 GR FMJ', 0.5, 34, FONT_SANS, (30, 30, 30))], seed=2)
    P = cardboard_box('hg_box', (0.105, 0.068, 0.034), (0, 0, 0.017), (0.38, 0.28, 0.15), t, s)
    P.append(cartridge('r1', (0.075, -0.01, 0.0048), rot=(0, math.pi / 2, 0.3)))
    P.append(cartridge('r2', (0.07, 0.022, 0.0048), rot=(0, math.pi / 2, -0.6)))
    return finish('item_ammo_hg', P)

def shell(name, loc, rot, hull=(0.55, 0.05, 0.04)):
    mh = mat('shell_hull_' + str(hull), hull, 0.45); mb = mat('brass', (0.78, 0.55, 0.22), 0.3, 1.0)
    r = 0.0105
    b = lathe(name + '_b', [(0, 0), (r * 1.08, 0), (r * 1.08, 0.0015), (r, 0.002), (r, 0.014), (r * 0.99, 0.015)], mb, segs=24)
    h = lathe(name + '_h', [(r * 0.99, 0.0145), (r * 0.985, 0.063), (r * 0.8, 0.066), (r * 0.25, 0.0668), (0, 0.0665)], mh, segs=24)
    for i in range(6):  # crimp folds
        a = i * math.pi / 3
        pass
    o = join([b, h], name); o.rotation_euler = rot; o.location = loc; apply_transform(o); return o

def ammo_sg():
    t = label_tex('lab_sg_top', 512, 320, (40, 90, 50, 255), [('12', 0.28, 120, FONT, (240, 220, 160)), ('GAUGE', 0.58, 62, FONT, (240, 240, 230)), ('00 BUCKSHOT · 2¾"', 0.84, 36, FONT_SANS, (240, 220, 160))], stripe=(0.0, 0.07, (190, 40, 30)), seed=3)
    P = cardboard_box('sg_box', (0.12, 0.075, 0.07), (0, 0, 0.035), (0.03, 0.1, 0.04), t, None)
    P.append(shell('s1', (0.09, -0.02, 0.0105), (0, math.pi / 2, 0.25)))
    P.append(shell('s2', (0.085, 0.03, 0.0105), (0, math.pi / 2, -0.4)))
    P.append(shell('s3', (-0.02, -0.06, 0.0105), (0, math.pi / 2, 1.4)))
    return finish('item_ammo_sg', P)

def bolt(name, loc, rot):
    ms = mat('bolt_shaft', (0.06, 0.06, 0.065), 0.35, 0.9); mt = mat('bolt_tip', (0.6, 0.6, 0.62), 0.2, 1.0); mf = mat('bolt_fin', (0.5, 0.08, 0.06), 0.6)
    L = 0.3
    sh = cyl(name + 's', 0.0035, L, (0, 0, L / 2), ms, verts=12)
    tp = lathe(name + 't', [(0.0036, L), (0.0055, L + 0.006), (0.0, L + 0.03)], mt, segs=4 * 3)
    fins = []
    for i in range(3):
        a = i * 2 * math.pi / 3
        f = prism(name + 'f%d' % i, [(0, 0.005), (0.013, 0.012), (0.013, 0.05), (0, 0.06)], 0.0008, mf, axis='x')
        f.rotation_euler = (0, 0, a); apply_transform(f); fins.append(f)
    o = join([sh, tp] + fins, name); o.rotation_euler = rot; o.location = loc; apply_transform(o); return o

def ammo_bolt():
    P = []
    for i, (dx, dz) in enumerate([(-0.012, 0.004), (0, 0.004), (0.012, 0.004), (-0.006, 0.014), (0.006, 0.014), (0, 0.024)]):
        P.append(bolt('b%d' % i, (dx, -0.16, dz + 0.0035), (-math.pi / 2, 0, 0)))
    ml = mat('leather_strap', (0.16, 0.08, 0.04), 0.7)
    for y in (-0.08, 0.06):
        P.append(torus('strap', 0.02, 0.003, (0, y, 0.014), ml, rot=(math.pi / 2, 0, 0), maj=24, mnr=6))
        P[-1].scale = (1.05, 1, 0.8); apply_transform(P[-1])
    return finish('item_ammo_bolt', P)

def ammo_smg():
    t = label_tex('lab_smg_top', 512, 320, (60, 70, 86, 255), [('9mm', 0.3, 100, FONT, (230, 200, 90)), ('SUBMACHINE GUN', 0.62, 56, FONT, (235, 235, 235)), ('50 ROUNDS', 0.86, 34, FONT_SANS, (220, 220, 220))], stripe=(0.92, 1.0, (230, 200, 90)), seed=4)
    P = cardboard_box('smg_box', (0.13, 0.08, 0.045), (0, 0, 0.0225), (0.035, 0.045, 0.07), t, None)
    # curved magazine lying beside
    mm = mat('mag_steel', (0.03, 0.03, 0.032), 0.4, 0.85)
    pts = []
    for i in range(9):
        t_ = i / 8; a = 0.35 * t_
        pts.append((0.02 * math.sin(a) * 0 + t_ * 0.19, 0.03 * t_ * t_))
    prof = [(p[0], p[1]) for p in pts] + [(p[0] - 0.004, p[1] + 0.034) for p in reversed(pts)]
    mg = prism('smg_mag', [(a, b + 0.0) for a, b in prof], 0.022, mm, bev=0.0015, axis='z')
    mg.rotation_euler = (0, 0, 0); mg.location = (-0.08, 0.06, 0.011); apply_transform(mg)
    P.append(mg)
    return finish('item_ammo_smg', P)

def ammo_mag():
    t = label_tex('lab_mag_top', 400, 300, (90, 20, 22, 255), [('.357', 0.32, 110, FONT, (240, 210, 120)), ('MAGNUM', 0.66, 70, FONT, (240, 240, 230)), ('6 ROUNDS · JHP', 0.88, 30, FONT_SANS, (230, 200, 120))], seed=5)
    P = cardboard_box('mag_box', (0.07, 0.05, 0.04), (0, 0, 0.02), (0.16, 0.015, 0.015), t, None)
    for i, (x, y) in enumerate([(0.05, -0.012), (0.058, 0.01), (0.043, 0.02)]):
        P.append(cartridge('m%d' % i, (x, y, 0), case_len=0.033, r=0.0048, bullet=0.008, tip=(0.72, 0.5, 0.3)))
    return finish('item_ammo_mag', P)

def grenade_round(name, loc, band, rot=(0, 0, 0)):
    mc = mat('gl_case', (0.72, 0.62, 0.35), 0.35, 1.0); mh = mat('gl_head_' + str(band), (0.15, 0.17, 0.12), 0.5, 0.3); mb = mat('gl_band_' + str(band), band, 0.45)
    R = 0.02
    c = lathe(name + 'c', [(0, 0), (R * 1.05, 0), (R * 1.05, 0.003), (R, 0.004), (R, 0.04)], mc, segs=28)
    h = lathe(name + 'h', [(R, 0.04)] + [(R * math.cos(t) ** 0.8, 0.04 + 0.036 * math.sin(t)) for t in np.linspace(0.1, math.pi / 2, 8)], mh, segs=28)
    b = lathe(name + 'b', [(R * 1.003, 0.046), (R * 1.003, 0.054)], mb, segs=28, cap_top=False, cap_bot=False)
    o = join([c, h, b], name); o.rotation_euler = rot; o.location = loc; apply_transform(o); return o

def grenades(id_, band, label):
    P = []
    for i, (x, y) in enumerate([(-0.022, 0), (0.022, 0), (0, 0.036)]):
        P.append(grenade_round('g%d' % i, (x, y, 0), band))
    t = label_tex('lab_' + id_, 512, 128, (70, 78, 50, 255), [(label, 0.5, 60, FONT, (240, 230, 190))], seed=6)
    P.append(wrap_label('sleeve', 0.0205, 0.012, 0.036, -2.2, -0.9, t, loc=(-0.022, 0, 0)))
    return finish('item_' + id_, P)

def ammo_linear():
    mb = mat('cell_body', (0.75, 0.77, 0.8), 0.25, 0.9); mg = mat('cell_glow', (0.1, 0.4, 0.8), 0.2, 0, emit=(0.25, 0.7, 1.0), emit_str=4); md = mat('cell_dark', (0.04, 0.045, 0.05), 0.4, 0.6)
    P = [lathe('cell', [(0, 0), (0.024, 0), (0.026, 0.004), (0.026, 0.02), (0.024, 0.022), (0.024, 0.078), (0.026, 0.08), (0.026, 0.096), (0.024, 0.1), (0.012, 0.102), (0.012, 0.108), (0, 0.108)], mb, segs=32)]
    P.append(lathe('win', [(0.0243, 0.026), (0.0243, 0.074)], mg, segs=32, cap_top=False, cap_bot=False))
    for i in range(4):
        a = i * math.pi / 2
        P.append(box('rib', (0.004, 0.006, 0.05), (0.025 * math.cos(a), 0.025 * math.sin(a), 0.05), md, bev=0.001, rot=(0, 0, a)))
    o = finish('item_ammo_linear', P)
    o.rotation_euler = (0, math.pi / 2, 0.4); apply_transform(o)
    return finish('item_ammo_linear', [o])

# ------------------------------------------------------------------ gunpowder
def gunpowder(id_, letter, powder):
    glass = mat('glass', (0.35, 0.45, 0.42), 0.08, 0.0)
    glass.node_tree.nodes['Principled BSDF'].inputs['Alpha'].default_value = 0.22
    glass.surface_render_method = 'BLENDED'
    mp = mat('powder_' + id_, powder, 0.95)
    mc = mat('cork', (0.5, 0.36, 0.22), 0.9)
    prof = [(0, 0), (0.028, 0), (0.031, 0.004), (0.032, 0.06), (0.029, 0.072), (0.016, 0.082), (0.014, 0.092), (0.016, 0.096)]
    P = [lathe('jar', prof, glass, segs=36, cap_top=False)]
    P.append(lathe('powder', [(0, 0.002), (0.029, 0.002), (0.03, 0.05), (0.02, 0.054), (0, 0.056)], mp, segs=30))
    P.append(lathe('cork', [(0, 0.086), (0.0125, 0.086), (0.014, 0.1), (0.015, 0.104), (0, 0.105)], mc, segs=20))
    t = label_tex('lab_gp_' + id_, 512, 256, (226, 214, 180, 255), [(letter, 0.46, 170, FONT_SERIF, (25, 20, 15)), ('GUNPOWDER', 0.88, 36, FONT_SANS, (60, 40, 30))], border=(90, 30, 20), seed=7)
    P.append(wrap_label('lab', 0.0322, 0.016, 0.05, -2.3, -0.84, t))
    return finish('item_' + id_, P)

# ------------------------------------------------------------------ herbs
def leaf(name, L, W, m, bend=0.4, curl=0.25, seg=8, serr=0.0):
    bm = bmesh.new(); rows = []
    for i in range(seg + 1):
        t = i / seg
        w = W * math.sin(math.pi * t ** 0.8) * (1 - 0.15 * t)
        row = []
        for j in (-1, -0.5, 0, 0.5, 1):
            s = 1 + (serr * math.sin(t * 40) if abs(j) == 1 else 0)
            x = j * w * s
            z = -curl * abs(j) * w + (-bend * (t * L) ** 2 / L)
            row.append(bm.verts.new((x, t * L, z + 0.002 * math.sin(j * 3 + t * 9))))
        rows.append(row)
    for i in range(seg):
        for j in range(4): bm.faces.new([rows[i][j], rows[i][j + 1], rows[i + 1][j + 1], rows[i + 1][j]])
    o = _hs_obj(name, bm, m)
    s = o.modifiers.new('s', 'SOLIDIFY'); s.thickness = 0.0008; apply_modifier(o, 's')
    shade_smooth(o); return o
from hs import _obj as _hs_obj

HERB = {'g': (0.08, 0.32, 0.06), 'r': (0.55, 0.05, 0.04), 'b': (0.06, 0.14, 0.5)}
def herb(id_, colors, dense=1.0):
    random.seed(hash(id_) & 0xffff)
    terra = mat('terracotta', (0.2, 0.065, 0.028), 0.85); soil = mat('soil', (0.08, 0.05, 0.03), 0.95)
    P = [lathe('pot', [(0, 0), (0.042, 0), (0.044, 0.004), (0.052, 0.07), (0.058, 0.071), (0.06, 0.074), (0.06, 0.086), (0.057, 0.088), (0.052, 0.086), (0.05, 0.075), (0.042, 0.02), (0, 0.02)], terra, segs=36, cap_top=False)]
    P.append(lathe('soil', [(0, 0.074), (0.05, 0.074), (0.0505, 0.075)], soil, segs=30))
    stemm = mat('stem', (0.1, 0.22, 0.05), 0.7)
    n = int(len(colors) * 7 * dense)
    for i in range(n):
        c = colors[i % len(colors)]
        m = mat('leaf_' + c, HERB[c], 0.55)
        a = i * 2.39996 + random.uniform(-0.2, 0.2)
        L = random.uniform(0.09, 0.13) * (1.1 if i < n // 2 else 0.85)
        lf = leaf('lf%d' % i, L, L * 0.28, m, bend=random.uniform(0.25, 0.6), curl=0.3, serr=0.08)
        tilt = random.uniform(0.55, 1.0) if i >= 3 else random.uniform(0.15, 0.45)
        lf.rotation_euler = ((math.pi / 2 - tilt), 0, a)
        r0 = random.uniform(0.0, 0.012)
        lf.location = (r0 * math.cos(a + 1.57), r0 * math.sin(a + 1.57), 0.078 + random.uniform(0, 0.02))
        apply_transform(lf); P.append(lf)
    for i in range(4):
        a = i * 1.7
        P.append(tube('st%d' % i, [Vector((0, 0, 0.074)), Vector((0.006 * math.cos(a), 0.006 * math.sin(a), 0.09)), Vector((0.01 * math.cos(a), 0.01 * math.sin(a), 0.1))], 0.0016, stemm, res=4, bev_res=1))
    return finish('item_' + id_, P)

# ------------------------------------------------------------------ weapon parts
def part_mag():
    ms = mat('mag_steel', (0.03, 0.03, 0.032), 0.4, 0.85); mp = mat('mag_base', (0.02, 0.02, 0.02), 0.6)
    rk = math.tan(math.radians(16))
    L = 0.155
    P = [prism('body', [(0, 0), (0.034, 0), (0.034 + L * rk, L), (L * rk, L)], 0.013, ms, bev=0.001, axis='x')]
    P.append(prism('base', [(-0.004, -0.012), (0.04, -0.012), (0.038, 0.001), (-0.003, 0.001)], 0.017, mp, bev=0.0025, axis='x'))
    mw = mat('mag_hole', (0.004, 0.004, 0.004), 0.8)
    for i in range(5):
        z = 0.02 + i * 0.024
        P.append(cyl('hole', 0.0022, 0.0006, (0.0066, 0.012 + z * rk, z), mw, rot=(0, math.pi / 2, 0), verts=12))
    P.append(cartridge('top', (0, 0.012 + L * rk, L + 0.0015), rot=(-math.pi / 2 + 0.0, 0, 0)))
    o = finish('item_part_mag', P)
    o.rotation_euler = (0, math.pi / 2, 0); apply_transform(o)
    return finish('item_part_mag', [o])

def part_brake():
    ms = mat('brake_steel', (0.035, 0.035, 0.04), 0.3, 0.9); mh = mat('mag_hole', (0.004, 0.004, 0.004), 0.8)
    P = [box('body', (0.045, 0.026, 0.03), (0, 0, 0.015), ms, bev=0.003, seg=3)]
    for i in range(3):
        P.append(box('port', (0.006, 0.0262, 0.004), (-0.01 + i * 0.01, 0, 0.0302), mh, bev=0.0008))
    P.append(cyl('bore', 0.006, 0.0452, (0, 0, 0.017), mh, rot=(0, math.pi / 2, 0), verts=20))
    P.append(box('clamp', (0.012, 0.03, 0.01), (0.017, 0, 0.005), ms, bev=0.002))
    for s in (1, -1): P.append(cyl('screw', 0.002, 0.004, (0.017, s * 0.016, 0.005), mat('screw', (0.5, 0.5, 0.5), 0.3, 1), rot=(math.pi / 2, 0, 0), verts=10))
    return finish('item_part_brake', P)

def part_stock():
    ms = mat('stock_poly', (0.025, 0.025, 0.025), 0.55, 0.2); mr = mat('stock_rub', (0.01, 0.01, 0.01), 0.9)
    P = [tube('frame', [Vector((0, 0.0, 0.03)), Vector((0.12, 0.0, 0.035)), Vector((0.22, 0.0, 0.028))], 0.006, ms, res=8)]
    P.append(tube('frame2', [Vector((0, 0.0, 0.0)), Vector((0.12, 0.0, -0.01)), Vector((0.22, 0.0, -0.035))], 0.006, ms, res=8))
    P.append(box('pad', (0.02, 0.035, 0.1), (0.23, 0, -0.005), mr, bev=0.006, seg=3))
    P.append(box('hinge', (0.03, 0.03, 0.05), (-0.005, 0, 0.015), ms, bev=0.004))
    o = finish('item_part_stock', P); o.rotation_euler = (math.pi / 2, 0, 0); apply_transform(o)
    return finish('item_part_stock', [o])

# ------------------------------------------------------------------ key items
def keycard():
    def dr(img, d):
        W, H = img.size
        d.rectangle([0, 0, W, 70], fill=(150, 20, 18))
        d.text((24, 12), 'ROCKFORT ISLAND', font=font(FONT, 44), fill=(245, 240, 230))
        d.text((24, 84), 'SECURITY  ·  LEVEL 2', font=font(FONT_SANS, 30), fill=(40, 40, 50))
        d.rectangle([24, 130, 150, 290], fill=(120, 130, 140), outline=(40, 40, 40), width=3)
        d.ellipse([56, 150, 118, 212], fill=(80, 70, 60)); d.rectangle([44, 212, 130, 290], fill=(60, 60, 70))
        for i, t in enumerate(['ID 0419-UB', 'CELL BLOCK', 'ACCESS']):
            d.text((175, 140 + i * 44), t, font=font(FONT_SANS, 30), fill=(30, 30, 30))
        x = 175
        rng = random.Random(3)
        while x < 480: w = rng.choice([2, 3, 5]); d.rectangle([x, 270, x + w, 305], fill=(15, 15, 15)); x += w + rng.choice([2, 3, 4])
        # umbrella-like emblem
        cx, cy, r = 440, 170, 50
        for k in range(8):
            a0 = k * 45; d.pieslice([cx - r, cy - r, cx + r, cy + r], a0, a0 + 45, fill=(200, 20, 20) if k % 2 == 0 else (240, 240, 240))
    t = tex_label('keycard', (512, 320), (232, 228, 214, 255), dr)
    mc = mat('card_plastic', (0.9, 0.9, 0.86), 0.35)
    P = [box('card', (0.086, 0.054, 0.0012), (0, 0, 0.0006), mc, bev=0.0004)]
    P.append(decal('face', 0.084, 0.052, (0, 0, 0.0013), (0, 0, 0), t, 0.35))
    ms = mat('mag_stripe', (0.02, 0.02, 0.02), 0.4)
    P.append(box('stripe', (0.086, 0.01, 0.0002), (0, 0.016, -0.0001), ms))
    P.append(box('hole', (0.012, 0.003, 0.0014), (-0.034, 0.0, 0.0007), mat('hole_dark', (0.1, 0.1, 0.1), 0.5)))
    mclip = mat('clip_metal', (0.7, 0.7, 0.72), 0.25, 1.0)
    P.append(torus('ring', 0.009, 0.0012, (-0.05, 0.0, 0.0012), mclip, maj=20, mnr=6))
    return finish('item_keycard', P)

def extinguisher():
    red = mat('ext_red', (0.55, 0.02, 0.015), 0.3, 0.1, coat=0.6); blk = mat('ext_black', (0.02, 0.02, 0.02), 0.6); chrome = mat('chrome', (0.8, 0.8, 0.82), 0.12, 1.0)
    P = [lathe('body', [(0, 0), (0.07, 0), (0.078, 0.008), (0.08, 0.02), (0.08, 0.4), (0.075, 0.44), (0.05, 0.47), (0.02, 0.48), (0, 0.48)], red, segs=40)]
    P.append(lathe('foot', [(0, -0.001), (0.081, -0.001), (0.082, 0.02), (0, 0.02)], blk, segs=40))
    P.append(cyl('neck', 0.018, 0.03, (0, 0, 0.49), chrome, verts=20))
    P.append(box('head', (0.03, 0.05, 0.035), (0, 0, 0.515), chrome, bev=0.006, seg=3))
    P.append(prism('lever', [(-0.02, 0.53), (0.09, 0.545), (0.09, 0.552), (-0.02, 0.542)], 0.022, blk, bev=0.002, axis='x'))
    P.append(prism('handle', [(-0.02, 0.505), (0.08, 0.49), (0.08, 0.498), (-0.02, 0.513)], 0.02, blk, bev=0.002, axis='x'))
    P.append(cyl('pin_ring', 0.004, 0.03, (0, 0.03, 0.53), chrome, rot=(0, math.pi / 2, 0), verts=10))
    P.append(torus('pin', 0.012, 0.0018, (0.018, 0.03, 0.53), chrome, rot=(0, math.pi / 2, 0)))
    P.append(cyl('gauge', 0.014, 0.012, (0, -0.03, 0.51), chrome, rot=(math.pi / 2, 0, 0), verts=20))
    gt = tex_label('gauge', (128, 128), (240, 240, 235, 255), lambda img, d: (d.pieslice([10, 10, 118, 118], 200, 260, fill=(200, 30, 30)), d.pieslice([10, 10, 118, 118], 260, 340, fill=(40, 170, 60)), d.ellipse([30, 30, 98, 98], fill=(240, 240, 235)), d.line([64, 64, 100, 40], fill=(10, 10, 10), width=5)))
    P.append(decal('gface', 0.024, 0.024, (0, -0.0362, 0.51), (math.pi / 2, 0, 0), gt, 0.2))
    P.append(tube('hose', [Vector((0, 0.028, 0.5)), Vector((0, 0.07, 0.42)), Vector((0, 0.095, 0.25)), Vector((0.0, 0.088, 0.12))], 0.008, blk, res=10))
    P.append(lathe('nozzle', [(0.009, 0.1), (0.012, 0.12), (0.016, 0.07), (0.012, 0.065)], blk, loc=(0, 0.088, 0.0), segs=16))
    P.append(box('clip', (0.02, 0.012, 0.03), (0, 0.082, 0.3), blk, bev=0.002))
    def dr(img, d):
        W, H = img.size
        d.rectangle([0, 0, W, H], fill=(240, 236, 226))
        d.text((W / 2 - d.textlength('FIRE', font=font(FONT, 90)) / 2, 20), 'FIRE', font=font(FONT, 90), fill=(170, 10, 10))
        d.text((W / 2 - d.textlength('EXTINGUISHER', font=font(FONT, 56)) / 2, 120), 'EXTINGUISHER', font=font(FONT, 56), fill=(20, 20, 20))
        for i, t in enumerate(['1. PULL PIN', '2. AIM AT BASE OF FIRE', '3. SQUEEZE LEVER', '4. SWEEP SIDE TO SIDE']):
            d.text((40, 210 + i * 42), t, font=font(FONT_SANS, 30), fill=(40, 40, 40))
        d.rectangle([30, 400, W - 30, 440], fill=(170, 10, 10))
        d.text((50, 402), 'CLASS  A · B · C', font=font(FONT_SANS, 30), fill=(255, 255, 255))
    t = tex_label('ext_label', (512, 460), (240, 236, 226, 255), dr)
    P.append(wrap_label('label', 0.0806, 0.16, 0.34, -2.35, -0.8, t, segs=20))
    return finish('item_extinguisher', P)

def relief_disc(name, img_path, R, height, thick, m, res=160, shape='circle', sides=6):
    """Heightfield relief (from grayscale image) cut to a circle/polygon, solidified."""
    im = np.asarray(Image.open(img_path).convert('L').resize((res, res), Image.BILINEAR)).astype(np.float32) / 255
    bm = bmesh.new(); vid = {}
    def inside(x, y):
        if shape == 'circle': return x * x + y * y <= R * R
        a = math.atan2(y, x); k = math.pi / sides
        rr = R * math.cos(k) / math.cos(((a + k) % (2 * k)) - k)
        return math.hypot(x, y) <= rr
    for j in range(res):
        for i in range(res):
            x = (i / (res - 1) * 2 - 1) * R; y = (j / (res - 1) * 2 - 1) * R
            if inside(x, y): vid[i, j] = bm.verts.new((x, y, height * im[res - 1 - j, i]))
    for j in range(res - 1):
        for i in range(res - 1):
            q = [(i, j), (i + 1, j), (i + 1, j + 1), (i, j + 1)]
            if all(k in vid for k in q): bm.faces.new([vid[k] for k in q])
    lay = bm.loops.layers.uv.new('UVMap')
    for f in bm.faces:
        for lp in f.loops: lp[lay].uv = (lp.vert.co.x / (2 * R) + 0.5, lp.vert.co.y / (2 * R) + 0.5)
    o = _hs_obj(name, bm, m)
    d = o.modifiers.new('d', 'DECIMATE'); d.ratio = 0.14; apply_modifier(o, 'd')
    s = o.modifiers.new('s', 'SOLIDIFY'); s.thickness = thick; s.offset = 1.0; apply_modifier(o, 's')
    shade_smooth(o, 60)
    return o

def contour_prism(name, mask_path, R, z0, depth, m, eps=1.2, bev=0.0008):
    """Extrude the white areas of a mask image (size S, mapped to [-R, R]) — crisp relief silhouettes."""
    import cv2
    im = cv2.imread(mask_path, cv2.IMREAD_GRAYSCALE); S = im.shape[0]
    _, th = cv2.threshold(im, 127, 255, cv2.THRESH_BINARY)
    cs, hier = cv2.findContours(th, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
    bm = bmesh.new()
    for ci, c in enumerate(cs):
        if hier[0][ci][3] != -1 or cv2.contourArea(c) < 30: continue
        c = cv2.approxPolyDP(c, eps, True)[:, 0, :]
        if len(c) < 3: continue
        pts = [((x / S * 2 - 1) * R, (1 - y / S * 2) * R) for x, y in c]
        top = [bm.verts.new((x, y, z0 + depth)) for x, y in pts]; bot = [bm.verts.new((x, y, z0)) for x, y in pts]
        try:
            ft = bm.faces.new(top)
        except ValueError: continue
        bm.faces.new(list(reversed(bot)))
        for i in range(len(pts)):
            j = (i + 1) % len(pts); bm.faces.new([top[i], bot[i], bot[j], top[j]])
    bmesh.ops.triangulate(bm, faces=[f for f in bm.faces if len(f.verts) > 4])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    o = _hs_obj(name, bm, m); bevel(o, bev, 2, 40); shade_smooth(o, 30); return o

def hawk_mask(S=512):
    img = Image.new('L', (S, S), 0); d = ImageDraw.Draw(img)
    cx, cy = S / 2, S / 2 + 20
    for side in (-1, 1):   # wings: layered feathers
        for k in range(8):
            ang = math.radians(160 - k * 13)
            L = 175 - k * 6
            bx, by = cx + side * 22, cy - 30
            tx, ty = bx + side * math.cos(math.radians(k * 11 + 5)) * L, by - math.sin(math.radians(k * 11 + 5)) * L * 0.95
            nx, ny = -(ty - by), (tx - bx); nl = math.hypot(nx, ny); nx, ny = nx / nl * 13, ny / nl * 13
            d.polygon([(bx, by + 24), (tx - nx * 0.3, ty - ny * 0.3), (tx + nx, ty + ny), (bx + side * 6, by + 44)], fill=255)
    d.ellipse([cx - 36, cy - 62, cx + 36, cy + 72], fill=255)
    d.polygon([(cx - 36, cy + 58), (cx + 36, cy + 58), (cx + 44, cy + 150), (cx + 14, cy + 132), (cx, cy + 156), (cx - 14, cy + 132), (cx - 44, cy + 150)], fill=255)
    d.ellipse([cx - 28, cy - 122, cx + 24, cy - 62], fill=255)
    d.polygon([(cx - 22, cy - 104), (cx - 60, cy - 94), (cx - 36, cy - 84), (cx - 22, cy - 80)], fill=255)
    d.ellipse([cx - 16, cy - 104, cx - 6, cy - 94], fill=0)   # eye
    for k in range(3):   # talons
        d.line([(cx - 20 + k * 20, cy + 70), (cx - 30 + k * 26, cy + 108)], fill=255, width=9)
    p = f'{TEXDIR}/hawk_mask.png'; img.save(p); return p

def emblem():
    bronze = mat('bronze', (0.5, 0.3, 0.1), 0.35, 1.0); dark = mat('bronze_dark', (0.18, 0.1, 0.04), 0.55, 1.0)
    R = 0.085
    P = [cyl('plate', R, 0.01, (0, 0, 0.005), bronze, verts=6, bev=0.003, seg=3)]
    P.append(cyl('inset', R * 0.86, 0.0012, (0, 0, 0.0104), dark, verts=6, bev=0.0))
    P.append(torus('rim', R * 0.88, 0.0025, (0, 0, 0.011), bronze, maj=6, mnr=8))
    P[-1].rotation_euler = (0, 0, 0); 
    hk = contour_prism('hawk', hawk_mask(), R * 0.8, 0.011, 0.004, bronze)
    P.append(hk)
    for i in range(6):
        a = i * math.pi / 3 + math.pi / 6
        P.append(sphere('rivet', 0.004, (R * 0.8 * math.cos(a), R * 0.8 * math.sin(a), 0.011), bronze, seg=10, rings=6))
    return finish('item_emblem', P)

def musicbox():
    S = 512
    img = Image.new('L', (S, S), 60); d = ImageDraw.Draw(img)
    d.ellipse([4, 4, S - 4, S - 4], fill=150); d.ellipse([22, 22, S - 22, S - 22], fill=110)
    rng = random.Random(5)
    for ring in range(9):
        r = 60 + ring * 20
        for k in range(0, 360, 6):
            if rng.random() < 0.42:
                a = math.radians(k + ring * 3)
                x, y = S / 2 + r * math.cos(a), S / 2 + r * math.sin(a)
                d.rectangle([x - 3, y - 3, x + 3, y + 3], fill=230)
    d.ellipse([S / 2 - 34, S / 2 - 34, S / 2 + 34, S / 2 + 34], fill=200); d.ellipse([S / 2 - 12, S / 2 - 12, S / 2 + 12, S / 2 + 12], fill=0)
    for k in range(3):
        a = math.radians(k * 120); d.ellipse([S / 2 + 44 * math.cos(a) - 6, S / 2 + 44 * math.sin(a) - 6, S / 2 + 44 * math.cos(a) + 6, S / 2 + 44 * math.sin(a) + 6], fill=0)
    img = img.filter(ImageFilter.GaussianBlur(1.0))
    p = f'{TEXDIR}/musicbox_h.png'; img.save(p)
    brass = mat('plate_brass', (0.7, 0.52, 0.22), 0.25, 1.0)
    o = relief_disc('disc', p, 0.07, 0.003, 0.0015, brass, res=200)
    return finish('item_musicbox', [o])

def lighter():
    chrome = mat('zippo', (0.75, 0.75, 0.77), 0.18, 1.0); dark = mat('zippo_in', (0.2, 0.2, 0.21), 0.4, 1.0); wick = mat('wick', (0.8, 0.75, 0.6), 0.9)
    P = [box('case', (0.038, 0.013, 0.04), (0, 0, 0.02), chrome, bev=0.003, seg=4)]
    lid = box('lid', (0.038, 0.013, 0.016), (-0.019, 0, 0.008), chrome, bev=0.003, seg=4)
    lid.rotation_euler = (0, 2.0, 0); lid.location = (0.019, 0, 0.04); apply_transform(lid); P.append(lid)
    P.append(box('chimney', (0.026, 0.011, 0.018), (-0.004, 0, 0.049), dark, bev=0.001))
    for i in range(4):
        for j in range(2): P.append(cyl('vent', 0.0014, 0.0112, (-0.013 + i * 0.006, 0, 0.045 + j * 0.006), mat('vent_hole', (0.01, 0.01, 0.01), 0.8), rot=(math.pi / 2, 0, 0), verts=8))
    P.append(cyl('wheel', 0.004, 0.006, (0.011, 0, 0.054), dark, rot=(math.pi / 2, 0, 0), verts=16))
    P.append(cyl('wick', 0.0016, 0.006, (-0.004, 0, 0.06), wick, verts=8))
    # engraved "C" initial (Chris' gift)
    t = tex_label('zippo_engr', (128, 128), (190, 190, 195, 0), lambda img, d: d.text((34, 10), 'CR', font=font(FONT_SERIF, 60), fill=(60, 60, 60, 255)))
    P.append(decal('eng', 0.024, 0.024, (0, -0.0066, 0.022), (math.pi / 2, 0, 0), t, 0.3, alpha=True, metal=1.0))
    o = finish('item_lighter', P); o.rotation_euler = (math.pi / 2, 0, 0.3); apply_transform(o)
    return finish('item_lighter', [o])

def valve_handle():
    iron = mat('valve_iron', (0.35, 0.05, 0.04), 0.55, 0.5); steel = mat('valve_steel', (0.18, 0.18, 0.19), 0.45, 0.9)
    P = [torus('rim', 0.09, 0.009, (0, 0, 0.012), iron, maj=48, mnr=12)]
    for i in range(5):
        a = i * 2 * math.pi / 5
        P.append(cyl('spoke', 0.0065, 0.085, (0.045 * math.cos(a), 0.045 * math.sin(a), 0.012), iron, rot=(0, math.pi / 2, a), verts=10))
    P.append(cyl('hub', 0.02, 0.03, (0, 0, 0.015), iron, verts=24, bev=0.002))
    P.append(box('sq', (0.014, 0.014, 0.032), (0, 0, 0.016), steel, bev=0.001))
    for i in range(12):
        a = i * math.pi / 6
        P.append(sphere('knurl', 0.0045, (0.09 * math.cos(a), 0.09 * math.sin(a), 0.012), iron, seg=8, rings=6))
    return finish('item_valve_handle', P)

def eagle_plate(id_, animal):
    """Small gold/silver crest plates for the portrait puzzle (not used as inventory items)."""
    pass

BUILD = {
    'ammo_hg': ammo_hg, 'ammo_sg': ammo_sg, 'ammo_bolt': ammo_bolt, 'ammo_smg': ammo_smg, 'ammo_mag': ammo_mag,
    'gren_exp': lambda: grenades('gren_exp', (0.8, 0.65, 0.05), 'HE  40mm'),
    'gren_fire': lambda: grenades('gren_fire', (0.75, 0.08, 0.03), 'INCENDIARY'),
    'gren_acid': lambda: grenades('gren_acid', (0.2, 0.7, 0.15), 'ACID  40mm'),
    'ammo_linear': ammo_linear,
    'gp_a': lambda: gunpowder('gp_a', 'A', (0.25, 0.25, 0.26)),
    'gp_b': lambda: gunpowder('gp_b', 'B', (0.6, 0.25, 0.08)),
    'gp_c': lambda: gunpowder('gp_c', 'C', (0.7, 0.6, 0.15)),
    'herb_g': lambda: herb('herb_g', ['g']), 'herb_r': lambda: herb('herb_r', ['r']), 'herb_b': lambda: herb('herb_b', ['b']),
    'herb_gg': lambda: herb('herb_gg', ['g', 'g'], 0.8), 'herb_ggg': lambda: herb('herb_ggg', ['g', 'g', 'g'], 0.7),
    'herb_gr': lambda: herb('herb_gr', ['g', 'r'], 0.8), 'herb_gb': lambda: herb('herb_gb', ['g', 'b'], 0.8),
    'herb_grb': lambda: herb('herb_grb', ['g', 'r', 'b'], 0.7),
    'part_mag': part_mag, 'part_brake': part_brake, 'part_stock': part_stock,
    'keycard': keycard, 'extinguisher': extinguisher, 'emblem': emblem, 'musicbox': musicbox, 'lighter': lighter,
    'valve_handle': valve_handle,
}
for k, fn in BUILD.items():
    if ONLY and k not in ONLY: continue
    reset_hs()
    o = fn()
    export(o, k)
    if k in ('herb_g', 'extinguisher', 'emblem', 'ammo_hg', 'keycard'): save_blend(f'{OUT_BLEND}/item_{k}.blend')
print('items done')
