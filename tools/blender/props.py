"""Level props for the Rockfort prison (RE-style set dressing) → src/assets/models/prop_<name>.glb
   Real-world scale, origin at floor centre, facing -Y in Blender (= +Z in game after export).
   Run: python3 tools/props.py [name ...]"""
import sys, random; sys.path.insert(0, '/data/assets_src/tools')
from hs import *
ONLY = set(sys.argv[1:])
TS = 512

# ------------------------------------------------------------------ procedural tileable textures (PIL/numpy)
def noise2(shape, scale, seed):
    rng = np.random.default_rng(seed)
    h, w = shape
    g = rng.random((max(2, h // scale), max(2, w // scale))).astype(np.float32)
    g = np.pad(g, ((0, 1), (0, 1)), mode='wrap')
    im = Image.fromarray((g * 255).astype(np.uint8)).resize((w + w // (g.shape[1] - 1), h + h // (g.shape[0] - 1)), Image.BICUBIC)
    return np.asarray(im).astype(np.float32)[:h, :w] / 255
def fbm(shape, seed, octaves=5, base=64):
    acc = np.zeros(shape, np.float32); amp = 1; tot = 0
    for o in range(octaves):
        acc += amp * noise2(shape, max(1, base >> o), seed + o); tot += amp; amp *= 0.55
    return acc / tot
def save_tex(name, arr):
    p = f'{TEXDIR}/{name}.jpg'; Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8)).save(p, quality=88); return p

def tex_paint(name, col, seed=1, rust=0.35, chips=0.4):
    n = fbm((TS, TS), seed); n2 = fbm((TS, TS), seed + 9, base=32)
    base = np.array(col, np.float32)[None, None, :] * (0.82 + 0.3 * n[..., None])
    rustc = np.array([96, 50, 26], np.float32) * (0.6 + 0.6 * n2[..., None])
    m = np.clip((n2 - (1 - rust)) * 6, 0, 1)[..., None]
    chip = np.clip((fbm((TS, TS), seed + 20, base=16) - (1 - chips * 0.35)) * 10, 0, 1)[..., None]
    metal = np.array([120, 118, 112], np.float32)[None, None, :]
    out = base * (1 - m) + rustc * m
    out = out * (1 - chip) + metal * chip
    # vertical streaks
    st = noise2((TS, TS // 4), 8, seed + 30).repeat(4, 1)
    st = np.asarray(Image.fromarray((st * 255).astype(np.uint8)).resize((TS, TS)).filter(ImageFilter.GaussianBlur(3))) / 255.0
    out *= (0.9 + 0.12 * st[..., None])
    return save_tex(name, out)

def tex_wood(name, col=(110, 70, 38), seed=2, planks=4):
    y, x = np.mgrid[0:TS, 0:TS].astype(np.float32) / TS
    n = fbm((TS, TS), seed, base=32)
    rings = np.sin((x * 3 + n * 2.5) * 40 + np.sin(y * 7) * 2) * 0.5 + 0.5
    g = 0.72 + 0.28 * rings * (0.6 + 0.4 * n)
    out = np.array(col, np.float32)[None, None, :] * g[..., None]
    for k in range(1, planks):
        yy = int(TS * k / planks); out[yy - 2:yy + 1] *= 0.45
    return save_tex(name, out)

def tex_fabric(name, col, seed=3, stripes=None):
    y, x = np.mgrid[0:TS, 0:TS].astype(np.float32)
    weave = (np.sin(x * 1.6) * np.sin(y * 1.6)) * 0.06
    n = fbm((TS, TS), seed, base=64)
    out = np.array(col, np.float32)[None, None, :] * (0.85 + weave[..., None] + 0.25 * (n[..., None] - 0.5))
    if stripes:
        s = ((x // (TS / stripes[0])) % 2 == 0)[..., None]
        out = np.where(s, out * stripes[1], out)
    stain = np.clip((fbm((TS, TS), seed + 5, base=128) - 0.62) * 4, 0, 0.6)[..., None]
    out = out * (1 - stain) + np.array([70, 55, 30], np.float32) * stain
    return save_tex(name, out)

def tex_concrete(name, col=(120, 118, 112), seed=4):
    n = fbm((TS, TS), seed, base=64); d = fbm((TS, TS), seed + 3, base=8)
    out = np.array(col, np.float32)[None, None, :] * (0.78 + 0.3 * n[..., None] + 0.08 * d[..., None])
    return save_tex(name, out)

def texmat(name, tex, rough=0.6, metal=0.0, coat=0.0):
    m = mat(name, (1, 1, 1), rough, metal, coat=coat, tex=tex); return m

def uv(o, s=2.0): box_uv(o, s); return o

def export(name, objs, extra=None):
    export_glb(f'{OUT_GLB}/prop_{name}.glb', objs, {'export_tangents': False, **(extra or {})})

def done(name, parts, center=True):
    o = finish('prop_' + name, parts, origin_floor=True, center=center)
    export(name, [o]); return o

# ------------------------------------------------------------------ props
def bed():
    frame = texmat('bed_steel', tex_paint('t_bedsteel', (70, 78, 70), 11, rust=0.4), 0.55, 0.6)
    matt = texmat('mattress', tex_fabric('t_matt', (150, 140, 118), 5, stripes=(24, 0.82)), 0.9)
    blank = texmat('blanket', tex_fabric('t_blanket', (60, 64, 52), 6), 0.95)
    pil = texmat('pillow', tex_fabric('t_pillow', (170, 165, 150), 7), 0.9)
    W, L, H = 0.8, 2.0, 0.45
    P = []
    for x in (-W / 2, W / 2):
        for y in (-L / 2, L / 2):
            P.append(uv(box('leg', (0.04, 0.04, H), (x, y, H / 2), frame, bev=0.004)))
        P.append(uv(box('rail', (0.04, L, 0.06), (x, 0, H - 0.03), frame, bev=0.004)))
    for y in (-L / 2, L / 2): P.append(uv(box('end', (W, 0.04, 0.06), (0, y, H - 0.03), frame, bev=0.004)))
    for i in range(9): P.append(uv(box('slat', (W, 0.035, 0.012), (0, -L / 2 + 0.1 + i * 0.225, H - 0.04), frame, bev=0.002)))
    # headboard bars
    P.append(uv(box('hb', (W + 0.04, 0.04, 0.04), (0, L / 2, H + 0.4), frame, bev=0.004)))
    for x in (-W / 2, W / 2): P.append(uv(box('hbp', (0.04, 0.04, 0.42), (x, L / 2, H + 0.2), frame, bev=0.004)))
    for i in range(5): P.append(cyl('hbb', 0.01, 0.4, (-W / 2 + 0.13 + i * 0.135, L / 2, H + 0.2), frame, verts=8))
    m = uv(box('matt', (W - 0.02, L - 0.06, 0.12), (0, 0, H + 0.06), matt, bev=0.03, seg=3))
    Pm = V(m); Pm[:, 2] += 0.01 * np.sin(Pm[:, 0] * 9) * np.sin(Pm[:, 1] * 5) * (Pm[:, 2] > H + 0.1); setV(m, Pm); P.append(m)
    bl = uv(box('blanket', (W + 0.04, L * 0.55, 0.03), (0, -L * 0.2, H + 0.13), blank, bev=0.012, seg=2))
    Pb = V(bl); edge = np.abs(Pb[:, 0]) > W / 2 - 0.01
    Pb[edge, 2] -= 0.12; Pb[:, 2] += 0.015 * np.sin(Pb[:, 1] * 11 + Pb[:, 0] * 4); setV(bl, Pb); P.append(bl)
    pw = uv(box('pillow', (0.55, 0.32, 0.1), (0, L / 2 - 0.25, H + 0.17), pil, bev=0.045, seg=4)); P.append(pw)
    return done('bed', P)

def toilet():
    st = mat('ss_steel', (0.55, 0.56, 0.57), 0.28, 1.0); dk = mat('ss_dark', (0.03, 0.03, 0.03), 0.6)
    P = [uv(box('base', (0.5, 0.5, 0.45), (0, 0, 0.225), st, bev=0.03, seg=3))]
    P.append(lathe('bowl', [(0.19, 0.44), (0.21, 0.46), (0.2, 0.47), (0.16, 0.46), (0.12, 0.38), (0.0, 0.36)], st, segs=32, cap_top=False))
    P[-1].scale = (1, 1.2, 1); apply_transform(P[-1])
    P.append(lathe('water', [(0, 0.39), (0.14, 0.39)], mat('water', (0.1, 0.12, 0.08), 0.05), segs=24)); P[-1].scale = (1, 1.2, 1); apply_transform(P[-1])
    P.append(uv(box('back', (0.5, 0.2, 0.55), (0, 0.25, 0.72), st, bev=0.025, seg=3)))
    P.append(lathe('sink', [(0.14, 1.0), (0.15, 1.0), (0.12, 0.93), (0.0, 0.92)], st, loc=(0, 0.2, 0), segs=28, cap_top=False))
    P.append(cyl('tap', 0.012, 0.08, (0, 0.3, 1.04), st, rot=(0.5, 0, 0), verts=10))
    P.append(cyl('btn', 0.025, 0.02, (0.17, 0.15, 0.85), dk, rot=(math.pi / 2, 0, 0), verts=16))
    return done('toilet', P)

def locker():
    paint = texmat('locker_paint', tex_paint('t_locker', (58, 76, 88), 12, rust=0.25, chips=0.6), 0.5, 0.5)
    dk = mat('lk_dark', (0.02, 0.02, 0.02), 0.6); ch = mat('lk_chrome', (0.6, 0.6, 0.6), 0.3, 1.0)
    W, D, H = 0.6, 0.5, 1.9
    P = [uv(box('body', (W, D, H), (0, 0, H / 2), paint, bev=0.006))]
    P.append(uv(box('door', (W - 0.04, 0.012, H - 0.12), (0, -D / 2 - 0.004, H / 2 + 0.02), paint, bev=0.004)))
    for i in range(6): P.append(box('vent', (0.3, 0.014, 0.012), (0, -D / 2 - 0.011, H - 0.25 - i * 0.03), dk, bev=0.003))
    for i in range(4): P.append(box('ventb', (0.3, 0.014, 0.012), (0, -D / 2 - 0.011, 0.35 - i * 0.03), dk, bev=0.003))
    P.append(box('handle', (0.03, 0.03, 0.14), (W / 2 - 0.08, -D / 2 - 0.02, H / 2), ch, bev=0.008))
    P.append(box('plate', (0.1, 0.004, 0.05), (0, -D / 2 - 0.011, H - 0.1), mat('lk_plate', (0.7, 0.6, 0.35), 0.3, 1.0), bev=0.002))
    P.append(uv(box('plinth', (W, D, 0.08), (0, 0, 0.04), dk, bev=0.004)))
    # dent
    d = P[1]; Pd = V(d); r = np.hypot(Pd[:, 0] - 0.1, Pd[:, 2] - 1.1); Pd[:, 1] += 0.012 * np.exp(-(r / 0.12) ** 2); setV(d, Pd)
    return done('locker', P)

def desk():
    top = texmat('desk_top', tex_wood('t_desktop', (80, 58, 38), 21, planks=1), 0.45, 0.0, coat=0.2)
    body = texmat('desk_steel', tex_paint('t_desk', (92, 94, 88), 13, rust=0.15), 0.55, 0.5)
    ch = mat('dk_chrome', (0.6, 0.6, 0.6), 0.3, 1.0)
    W, D, H = 1.8, 0.85, 0.78
    P = [uv(box('top', (W, D, 0.04), (0, 0, H - 0.02), top, bev=0.006))]
    P.append(uv(box('pedL', (0.45, D - 0.05, H - 0.04), (-W / 2 + 0.25, 0, (H - 0.04) / 2), body, bev=0.005)))
    P.append(uv(box('pedR', (0.45, D - 0.05, H - 0.04), (W / 2 - 0.25, 0, (H - 0.04) / 2), body, bev=0.005)))
    P.append(uv(box('modesty', (W - 1.0, 0.02, 0.45), (0, D / 2 - 0.06, H - 0.28), body, bev=0.003)))
    for sx in (-1, 1):
        for i in range(3):
            z = 0.12 + i * 0.235
            P.append(uv(box('drawer', (0.42, 0.012, 0.21), (sx * (W / 2 - 0.25), -D / 2 + 0.02, z + 0.05), body, bev=0.004)))
            P.append(box('pull', (0.12, 0.02, 0.015), (sx * (W / 2 - 0.25), -D / 2 + 0.005, z + 0.1), ch, bev=0.004))
    return done('desk', P)

def chair():
    st = mat('ch_steel', (0.12, 0.12, 0.13), 0.4, 0.8); le = texmat('ch_leather', tex_fabric('t_chair', (40, 32, 28), 8), 0.55)
    P = [cyl('col', 0.025, 0.35, (0, 0, 0.25), st, verts=12)]
    for i in range(5):
        a = i * 2 * math.pi / 5
        P.append(box('leg', (0.3, 0.04, 0.03), (0.15 * math.cos(a), 0.15 * math.sin(a), 0.05), st, bev=0.008, rot=(0, 0, a)))
        P.append(sphere('wheel', 0.03, (0.3 * math.cos(a), 0.3 * math.sin(a), 0.03), st, seg=10, rings=6))
    P.append(uv(box('seat', (0.48, 0.46, 0.08), (0, 0, 0.47), le, bev=0.03, seg=3)))
    P.append(uv(box('back', (0.44, 0.07, 0.5), (0, 0.24, 0.8), le, bev=0.03, seg=3)))
    P.append(box('bpost', (0.05, 0.03, 0.3), (0, 0.24, 0.52), st, bev=0.006))
    for sx in (-1, 1):
        P.append(box('arm', (0.05, 0.3, 0.03), (sx * 0.26, 0.0, 0.66), st, bev=0.01))
        P.append(box('armp', (0.03, 0.03, 0.18), (sx * 0.26, 0.08, 0.57), st, bev=0.006))
    return done('chair', P)

def typewriter():
    body = mat('tw_body', (0.04, 0.045, 0.04), 0.35, 0.3, coat=0.5); ch = mat('tw_chrome', (0.7, 0.7, 0.7), 0.2, 1.0)
    keym = mat('tw_key', (0.85, 0.83, 0.75), 0.4); paper = mat('tw_paper', (0.9, 0.88, 0.8), 0.8)
    P = [prism('body', [(-0.17, 0), (0.12, 0), (0.14, 0.05), (0.08, 0.14), (-0.1, 0.16), (-0.17, 0.08)], 0.4, body, bev=0.012, seg=3, axis='x')]
    P.append(cyl('platen', 0.03, 0.46, (0, 0.1, 0.18), mat('tw_rubber', (0.02, 0.02, 0.02), 0.7), rot=(0, math.pi / 2, 0), verts=24))
    for s in (-1, 1): P.append(cyl('knob', 0.035, 0.03, (s * 0.25, 0.1, 0.18), body, rot=(0, math.pi / 2, 0), verts=20, bev=0.005))
    P.append(box('lever', (0.1, 0.012, 0.012), (-0.29, 0.07, 0.21), ch, bev=0.004, rot=(0, 0, -0.3)))
    P.append(box('paper', (0.3, 0.003, 0.28), (0, 0.13, 0.32), paper, rot=(-0.2, 0, 0)))
    for r in range(4):
        for k in range(10 - (r % 2)):
            x = -0.15 + k * 0.032 + (r % 2) * 0.016; y = -0.15 + r * 0.035; z = 0.03 + r * 0.02
            P.append(cyl('key', 0.011, 0.012, (x, y, z + 0.02), keym, verts=12, bev=0.002))
            P.append(cyl('stem', 0.003, 0.03, (x, y + 0.004, z), ch, verts=6))
    P.append(box('space', (0.2, 0.02, 0.01), (0, -0.19, 0.03), ch, bev=0.004))
    for i in range(20): P.append(box('arm', (0.004, 0.08, 0.003), (-0.1 + i * 0.01, 0.02, 0.1 + 0.02 * math.cos(i / 19 * math.pi - math.pi / 2)), ch, rot=(0.7, 0, 0)))
    return done('typewriter', P)

def itembox():
    wood = texmat('ib_wood', tex_wood('t_ibwood', (92, 52, 26), 23, planks=5), 0.55)
    iron = texmat('ib_iron', tex_paint('t_ibiron', (40, 40, 38), 14, rust=0.5), 0.5, 0.8)
    brass = mat('ib_brass', (0.6, 0.45, 0.18), 0.3, 1.0)
    W, D, H = 1.2, 0.65, 0.5
    P = [uv(box('body', (W, D, H), (0, 0, H / 2), wood, bev=0.01))]
    lid = uv(box('lid', (W + 0.02, D + 0.02, 0.18), (0, 0, H + 0.09), wood, bev=0.03, seg=3)); P.append(lid)
    for x in (-W / 2 + 0.12, 0, W / 2 - 0.12):
        P.append(uv(box('band', (0.07, D + 0.03, H + 0.01), (x, 0, H / 2), iron, bev=0.004)))
        P.append(uv(box('bandl', (0.07, D + 0.04, 0.19), (x, 0, H + 0.09), iron, bev=0.01)))
        for y in (-D / 2 - 0.015, D / 2 + 0.015):
            for z in (0.08, H - 0.08, H + 0.09): P.append(sphere('rivet', 0.009, (x, y, z), iron, seg=8, rings=5))
    for sx in (-1, 1):
        for sy in (-1, 1): P.append(uv(box('corner', (0.08, 0.08, H + 0.19), (sx * (W / 2 - 0.03), sy * (D / 2 - 0.03), (H + 0.19) / 2), iron, bev=0.01)))
        P.append(torus('handle', 0.06, 0.009, (sx * (W / 2 + 0.02), 0, H * 0.6), iron, rot=(0, math.pi / 2, 0)))
    P.append(box('lockplate', (0.12, 0.012, 0.14), (0, -D / 2 - 0.02, H - 0.01), brass, bev=0.01))
    P.append(cyl('keyhole', 0.012, 0.014, (0, -D / 2 - 0.026, H - 0.02), mat('ib_hole', (0.01, 0.01, 0.01), 0.8), rot=(math.pi / 2, 0, 0), verts=12))
    return done('itembox', P)

def crate():
    wood = texmat('crate_wood', tex_wood('t_crate', (120, 92, 58), 24, planks=6), 0.8)
    S = 0.9
    P = [uv(box('core', (S - 0.04, S - 0.04, S - 0.04), (0, 0, S / 2), wood, bev=0.004))]
    for ax in range(3):
        for a in (-1, 1):
            for b in (-1, 1):
                size = [0.07, 0.07, 0.07]; size[ax] = S; loc = [0, 0, S / 2]
                o1, o2 = [i for i in range(3) if i != ax]
                loc[o1] = a * (S / 2 - 0.035); loc[o2] = b * (S / 2 - 0.035) + (S / 2 if o2 == 2 else 0) - (0 if o2 != 2 else S / 2)
                if o2 == 2: loc[o2] = S / 2 + b * (S / 2 - 0.035)
                if o1 == 2: loc[o1] = S / 2 + a * (S / 2 - 0.035)
                P.append(uv(box('edge', tuple(size), tuple(loc), wood, bev=0.006)))
    for sy in (-1, 1):
        d = uv(box('diag', (S * 1.25, 0.03, 0.08), (0, sy * (S / 2 + 0.005), S / 2), wood, bev=0.005, rot=(0, 0.785, 0))); P.append(d)
    stencil = tex_label('stencil_crate', (256, 128), (0, 0, 0, 0), lambda img, d: d.text((12, 20), 'RFI-07', font=font(FONT, 80), fill=(20, 20, 18, 200)))
    P.append(decal('st', 0.5, 0.25, (0, -S / 2 - 0.022, S * 0.72), (math.pi / 2, 0, 0), stencil, 0.9, alpha=True))
    return done('crate', P)

def barrel():
    paint = texmat('barrel_paint', tex_paint('t_barrel', (50, 70, 110), 15, rust=0.55, chips=0.7), 0.5, 0.6)
    top = mat('barrel_top', (0.08, 0.08, 0.08), 0.5, 0.8)
    R, H = 0.29, 0.88
    prof = [(0, 0), (R - 0.01, 0), (R, 0.012)]
    for z in (0.3, 0.6):
        prof += [(R, z - 0.02), (R + 0.012, z - 0.01), (R + 0.012, z + 0.01), (R, z + 0.02)]
    prof += [(R, H - 0.012), (R - 0.01, H), (R - 0.02, H - 0.01)]
    b = lathe('drum', prof, paint, segs=40, cap_top=False); P = [b]
    P.append(lathe('lid', [(0, H - 0.02), (R - 0.02, H - 0.02)], top, segs=40))
    P.append(cyl('bung', 0.025, 0.02, (0.15, 0.05, H - 0.01), top, verts=12))
    bP = V(b); r = np.hypot(bP[:, 0] - R, bP[:, 2] - 0.45); bP[:, 0] -= 0.02 * np.exp(-(r / 0.12) ** 2) * (bP[:, 0] > 0); setV(b, bP)
    return done('barrel', P)

def cabinet():
    paint = texmat('cab_paint', tex_paint('t_cab', (110, 108, 96), 16, rust=0.2), 0.55, 0.5)
    ch = mat('cab_chrome', (0.6, 0.6, 0.6), 0.3, 1.0); lab = mat('cab_label', (0.85, 0.82, 0.7), 0.7)
    W, D, H = 0.48, 0.62, 1.32
    P = [uv(box('body', (W, D, H), (0, 0, H / 2), paint, bev=0.005))]
    for i in range(4):
        z = 0.17 + i * 0.315
        dr_ = uv(box('drawer', (W - 0.03, 0.02, 0.29), (0, -D / 2 - 0.006 - (0.08 if i == 1 else 0), z), paint, bev=0.005)); P.append(dr_)
        P.append(box('pull', (0.14, 0.025, 0.02), (0, -D / 2 - 0.03 - (0.08 if i == 1 else 0), z + 0.06), ch, bev=0.006))
        P.append(box('label', (0.1, 0.004, 0.04), (0, -D / 2 - 0.018 - (0.08 if i == 1 else 0), z + 0.1), lab))
    for i in range(6): P.append(box('folder', (0.012, 0.3, 0.2), (-0.15 + i * 0.05, -0.2 - 0.08, 0.17 + 0.315 + 0.06), mat('folder_%d' % (i % 3), [(0.5, 0.4, 0.2), (0.25, 0.3, 0.45), (0.5, 0.2, 0.15)][i % 3], 0.8)))
    return done('cabinet', P)

def monitor():
    shell = mat('crt_shell', (0.55, 0.53, 0.48), 0.5); scr = mat('crt_screen', (0.02, 0.05, 0.03), 0.1, 0.0, emit=(0.1, 0.45, 0.2), emit_str=1.5)
    P = [uv(box('front', (0.42, 0.06, 0.36), (0, -0.16, 0.2), shell, bev=0.02, seg=3))]
    P.append(prism('back', [(-0.13, 0.04), (0.2, 0.08), (0.2, 0.3), (-0.13, 0.37)], 0.36, shell, bev=0.02, axis='x'))
    s = box('screen', (0.33, 0.02, 0.26), (0, -0.19, 0.21), scr, bev=0.02, seg=3); P.append(s)
    Ps = V(s); Ps[:, 1] -= 0.012 * (1 - (Ps[:, 0] / 0.17) ** 2) * (1 - ((Ps[:, 2] - 0.21) / 0.13) ** 2) * (Ps[:, 1] < -0.19); setV(s, Ps)
    P.append(uv(box('base', (0.3, 0.3, 0.04), (0, 0.0, 0.02), shell, bev=0.01)))
    P.append(cyl('led', 0.006, 0.01, (0.17, -0.192, 0.05), mat('led_g', (0.1, 0.8, 0.2), 0.3, emit=(0.2, 1, 0.3), emit_str=3), rot=(math.pi / 2, 0, 0), verts=8))
    return done('monitor', P)

def safe():
    paint = texmat('safe_paint', tex_paint('t_safe', (38, 52, 44), 17, rust=0.2, chips=0.3), 0.4, 0.6)
    ch = mat('safe_chrome', (0.75, 0.72, 0.65), 0.2, 1.0); gold = mat('safe_gold', (0.7, 0.5, 0.2), 0.3, 1.0)
    W, D, H = 0.62, 0.6, 0.8
    body = [uv(box('shell', (W, D, H), (0, 0, H / 2 + 0.06), paint, bev=0.03, seg=3))]
    body.append(uv(box('cavity', (W - 0.1, 0.02, H - 0.1), (0, -D / 2 + 0.005, H / 2 + 0.06), mat('safe_in', (0.05, 0.05, 0.05), 0.8))))
    for sx in (-1, 1):
        for sy in (-1, 1): body.append(cyl('foot', 0.035, 0.06, (sx * (W / 2 - 0.06), sy * (D / 2 - 0.06), 0.03), ch, verts=12))
    body.append(uv(box('shelf', (W - 0.1, D - 0.1, 0.015), (0, 0.02, H / 2 + 0.05), paint)))
    for sx in (-1, 1): body.append(cyl('hinge', 0.02, 0.12, (W / 2 - 0.02, -D / 2 - 0.01, 0.2 + (sx + 1) * 0.25), ch, verts=12))
    b = finish('prop_safe', body); export('safe', [b])
    # door (pivot on the hinge edge at x=+W/2)
    reset_hs()
    paint = texmat('safe_paint', f'{TEXDIR}/t_safe.jpg', 0.4, 0.6); ch = mat('safe_chrome', (0.75, 0.72, 0.65), 0.2, 1.0); gold = mat('safe_gold', (0.7, 0.5, 0.2), 0.3, 1.0)
    P = [uv(box('door', (W - 0.08, 0.06, H - 0.08), (-(W - 0.08) / 2, 0, 0), paint, bev=0.012))]
    P.append(cyl('dialring', 0.075, 0.02, (-0.26, -0.035, 0.1), ch, rot=(math.pi / 2, 0, 0), verts=40, bev=0.003))
    dial = cyl('dial', 0.06, 0.04, (-0.26, -0.05, 0.1), mat('safe_dial', (0.05, 0.05, 0.05), 0.35, 0.6), rot=(math.pi / 2, 0, 0), verts=40, bev=0.005); P.append(dial)
    for i in range(20):
        a = i * math.pi / 10
        P.append(box('tick', (0.003, 0.004, 0.012 if i % 5 else 0.02), (-0.26 + 0.052 * math.cos(a), -0.071, 0.1 + 0.052 * math.sin(a)), ch, rot=(0, -a + math.pi / 2, 0)))
    P.append(cyl('hub', 0.02, 0.06, (-0.1, -0.06, -0.12), ch, rot=(math.pi / 2, 0, 0), verts=16))
    for i in range(3):
        a = i * 2 * math.pi / 3
        P.append(cyl('spoke', 0.008, 0.12, (-0.1 + 0.06 * math.cos(a), -0.09, -0.12 + 0.06 * math.sin(a)), ch, rot=(0, a + math.pi / 2, 0), verts=8))
        P.append(sphere('ball', 0.016, (-0.1 + 0.12 * math.cos(a), -0.09, -0.12 + 0.12 * math.sin(a)), ch, seg=12, rings=8))
    P.append(box('badge', (0.2, 0.004, 0.05), (-0.27, -0.032, 0.28), gold, bev=0.003))
    o = join(P, 'prop_safe_door')
    export('safe_door', [o])
    print('safe door tris', tri_count(o))

def musicbox_prop():
    wood = texmat('mb_wood', tex_wood('t_mbwood', (70, 30, 16), 25, planks=1), 0.35, 0.0, coat=0.6)
    brass = mat('mb_brass', (0.7, 0.52, 0.22), 0.25, 1.0); velvet = mat('mb_velvet', (0.35, 0.02, 0.04), 0.9)
    W, D, H = 0.34, 0.24, 0.12
    P = [uv(box('body', (W, D, H), (0, 0, H / 2), wood, bev=0.006, seg=3))]
    P.append(uv(box('inside', (W - 0.03, D - 0.03, 0.005), (0, 0, H - 0.01), velvet)))
    for sx in (-1, 1):
        for sy in (-1, 1): P.append(sphere('foot', 0.015, (sx * (W / 2 - 0.02), sy * (D / 2 - 0.02), 0.0), brass, seg=10, rings=6))
    P.append(cyl('drum', 0.015, 0.14, (0.03, 0.03, H - 0.0), brass, rot=(0, math.pi / 2, 0), verts=16))
    for i in range(18): P.append(box('comb', (0.005, 0.05, 0.002), (-0.04 + i * 0.008, 0.0, H - 0.0), brass))
    P.append(cyl('slot', 0.072, 0.004, (-0.07, -0.02, H + 0.0), mat('mb_slot', (0.02, 0.02, 0.02), 0.6), verts=40))
    P.append(cyl('key', 0.004, 0.04, (W / 2 + 0.02, 0, H / 2), brass, rot=(0, math.pi / 2, 0), verts=8))
    P.append(box('keyw', (0.004, 0.04, 0.02), (W / 2 + 0.04, 0, H / 2), brass, bev=0.004))
    b = finish('prop_musicbox', P); export('musicbox', [b])
    reset_hs()
    wood = texmat('mb_wood', f'{TEXDIR}/t_mbwood.jpg', 0.35, 0.0, coat=0.6); brass = mat('mb_brass', (0.7, 0.52, 0.22), 0.25, 1.0)
    mirror = mat('mb_mirror', (0.9, 0.9, 0.9), 0.05, 1.0)
    # lid, pivot along the back edge (y=+D/2, z=0)
    P = [uv(box('lid', (W, D, 0.04), (0, -D / 2, 0.02), wood, bev=0.008, seg=3))]
    P.append(box('mirror', (W - 0.05, D - 0.05, 0.003), (0, -D / 2, -0.001), mirror))
    P.append(box('inlay', (W - 0.07, 0.01, 0.002), (0, -D / 2, 0.041), brass))
    P.append(box('inlay2', (0.01, D - 0.07, 0.002), (0, -D / 2, 0.041), brass))
    o = join(P, 'prop_musicbox_lid'); export('musicbox_lid', [o])

def valve_pipe():
    pipe = texmat('pipe_paint', tex_paint('t_pipe', (90, 30, 22), 18, rust=0.6), 0.55, 0.6); st = mat('vp_steel', (0.2, 0.2, 0.21), 0.45, 0.9)
    P = [cyl('pipe', 0.07, 2.4, (0, 0.1, 1.2), pipe, verts=24)]
    for z in (0.35, 1.2, 2.1): P.append(cyl('flange', 0.1, 0.04, (0, 0.1, z), st, verts=24, bev=0.005))
    P.append(lathe('body', [(0.09, -0.12), (0.11, -0.08), (0.11, 0.08), (0.09, 0.12)], st, loc=(0, 0.1, 1.2), rot=(math.pi / 2, 0, 0), segs=24))
    P.append(cyl('bonnet', 0.045, 0.16, (0, -0.06, 1.2), st, rot=(math.pi / 2, 0, 0), verts=16))
    P.append(box('stem', (0.02, 0.1, 0.02), (0, -0.17, 1.2), st))
    for i in range(6):
        a = i * math.pi / 3
        P.append(cyl('bolt', 0.008, 0.03, (0.085 * math.cos(a), 0.1, 1.2 + 0.085 * math.sin(a)), st, verts=6))
    P.append(cyl('gauge', 0.045, 0.02, (0.14, 0.02, 1.45), st, rot=(math.pi / 2, 0, 0), verts=20))
    gt = f'{TEXDIR}/gauge.png'
    if os.path.exists(gt): P.append(decal('gface', 0.075, 0.075, (0.14, 0.009, 1.45), (math.pi / 2, 0, 0), gt, 0.2))
    P.append(cyl('gstem', 0.01, 0.1, (0.14, 0.08, 1.45), st, rot=(math.pi / 2, 0, 0), verts=8))
    return done('valve_pipe', P, center=False)

def pipe_run():
    pipe = texmat('pipe_paint', tex_paint('t_pipe', (90, 30, 22), 18, rust=0.6), 0.55, 0.6); st = mat('vp_steel', (0.2, 0.2, 0.21), 0.45, 0.9)
    P = [cyl('pipe', 0.07, 4.0, (0, 0, 0.07), pipe, rot=(0, math.pi / 2, 0), verts=20)]
    P.append(cyl('pipe2', 0.045, 4.0, (0, 0.17, 0.045), pipe, rot=(0, math.pi / 2, 0), verts=16))
    for x in (-1.9, 0, 1.9):
        P.append(cyl('fl', 0.095, 0.04, (x, 0, 0.07), st, rot=(0, math.pi / 2, 0), verts=20, bev=0.004))
        P.append(box('bracket', (0.05, 0.4, 0.02), (x + 0.3, 0.1, 0.16), st, bev=0.004))
    return done('pipe', P)

def painting(name, draw, W=0.9, H=1.15):
    gold = mat('frame_gold', (0.55, 0.38, 0.12), 0.35, 1.0)
    img = Image.new('RGB', (512, int(512 * H / W)), (30, 24, 18)); d = ImageDraw.Draw(img); draw(img, d)
    img = img.filter(ImageFilter.GaussianBlur(1.2))
    arr = np.asarray(img).astype(np.float32)
    cr = fbm(arr.shape[:2], 44, base=16); arr *= (0.85 + 0.2 * cr[..., None])     # oil / craquelure
    y, x = np.mgrid[0:arr.shape[0], 0:arr.shape[1]].astype(np.float32)
    v = 1 - 0.55 * (((x / arr.shape[1] - 0.5) ** 2 + (y / arr.shape[0] - 0.5) ** 2) * 2.2)
    arr *= v[..., None]
    p = f'{TEXDIR}/paint_{name}.jpg'; Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8)).save(p, quality=90)
    P = [decal('canvas', W, H, (0, -0.01, H / 2 + 0.12), (math.pi / 2, 0, 0), p, 0.7)]
    fw = 0.1
    prof = [(0, 0), (fw, 0), (fw, 0.03), (fw * 0.7, 0.05), (fw * 0.4, 0.035), (fw * 0.2, 0.05), (0, 0.03)]
    for (cx, cz, L, rot) in [(0, H + fw / 2, W + 2 * fw, 0), (0, -fw / 2, W + 2 * fw, 0), (-W / 2 - fw / 2, H / 2, H, 1), (W / 2 + fw / 2, H / 2, H, 1)]:
        o = prism('fr', [(a - fw / 2, -b) for a, b in prof], L, gold, bev=0.003, axis='x')
        # o spans x in [-L/2, L/2], profile in (y, z)... map: y=-depth, z=width
        o.rotation_euler = (math.pi / 2, 0, 0) if False else (0, 0, 0)
        Pp = V(o); Pp = Pp[:, [0, 2, 1]]; setV(o, Pp)   # (x, depth->y, width->z)
        if rot: o.rotation_euler = (0, math.pi / 2, 0); apply_transform(o)
        o.location = (cx, 0, cz + 0.12); apply_transform(o); P.append(o)
    plaque_t = tex_label('plaque_' + name, (256, 64), (150, 110, 40, 255), lambda img, d: d.text((128 - d.textlength(name.upper(), font=font(FONT_SERIF, 34)) / 2, 12), name.upper(), font=font(FONT_SERIF, 34), fill=(40, 25, 10)))
    P.append(decal('plaque', 0.2, 0.05, (0, -0.03, 0.04), (math.pi / 2, 0, 0), plaque_t, 0.3, metal=1.0))
    o = finish('prop_painting_' + name, P, origin_floor=True, center=True)
    export('painting_' + name, [o])

def draw_eagle(img, d):
    W, H = img.size
    for yy in range(H): d.line([(0, yy), (W, yy)], fill=(int(40 + 30 * yy / H), int(34 + 20 * yy / H), int(30 + 10 * yy / H)))
    d.ellipse([W * 0.1, H * 0.12, W * 0.9, H * 0.55], fill=(120, 80, 40))   # sunset glow
    cx, cy = W / 2, H * 0.42
    for s in (-1, 1):
        for k in range(7):
            L = W * (0.42 - k * 0.03); a = math.radians(20 + k * 9)
            d.polygon([(cx, cy), (cx + s * L * math.cos(a), cy - L * math.sin(a) * 0.8), (cx + s * L * math.cos(a) * 0.95, cy - L * math.sin(a) * 0.8 + 18), (cx + s * 20, cy + 30)], fill=(30 + k * 6, 22 + k * 4, 14))
    d.ellipse([cx - 26, cy - 30, cx + 26, cy + 80], fill=(40, 30, 20)); d.ellipse([cx - 18, cy - 70, cx + 18, cy - 28], fill=(225, 220, 205))
    d.polygon([(cx - 8, cy - 52), (cx - 34, cy - 44), (cx - 10, cy - 38)], fill=(200, 160, 40))
    d.rectangle([0, H * 0.82, W, H], fill=(28, 22, 16))
def draw_wolf(img, d):
    W, H = img.size
    for yy in range(H): d.line([(0, yy), (W, yy)], fill=(int(18 + 20 * yy / H), int(24 + 18 * yy / H), int(40 + 10 * yy / H)))
    d.ellipse([W * 0.55, H * 0.08, W * 0.85, H * 0.28], fill=(220, 215, 190))                                   # moon
    d.polygon([(0, H * 0.78), (W * 0.3, H * 0.62), (W * 0.62, H * 0.7), (W, H * 0.6), (W, H), (0, H)], fill=(14, 16, 20))  # rocks
    cx, cy = W * 0.42, H * 0.56
    d.polygon([(cx - 90, cy + 60), (cx - 40, cy - 10), (cx + 10, cy - 90), (cx + 30, cy - 130), (cx + 42, cy - 100), (cx + 70, cy - 112), (cx + 62, cy - 70), (cx + 80, cy - 40), (cx + 50, cy + 10), (cx + 60, cy + 80)], fill=(22, 22, 26))
    d.polygon([(cx + 40, cy - 108), (cx + 110, cy - 150), (cx + 60, cy - 88)], fill=(22, 22, 26))   # howling muzzle
def draw_snake(img, d):
    W, H = img.size
    for yy in range(H): d.line([(0, yy), (W, yy)], fill=(int(20 + 16 * yy / H), int(34 + 14 * yy / H), int(20 + 6 * yy / H)))
    pts = []
    for i in range(80):
        t = i / 79; pts.append((W * (0.5 + 0.3 * math.sin(t * 9)), H * (0.9 - 0.75 * t)))
    for i in range(len(pts) - 1): d.line([pts[i], pts[i + 1]], fill=(90, 110, 40), width=int(34 - 20 * i / 80))
    for i in range(0, len(pts) - 1, 3): d.line([pts[i], pts[i + 1]], fill=(150, 150, 60), width=int(12 - 6 * i / 80))
    hx, hy = pts[-1]; d.ellipse([hx - 26, hy - 18, hx + 26, hy + 18], fill=(80, 100, 36)); d.ellipse([hx - 10, hy - 8, hx - 4, hy - 2], fill=(220, 180, 20))
    d.line([(hx - 26, hy + 4), (hx - 50, hy + 10), (hx - 58, hy + 2)], fill=(170, 20, 20), width=3)
def draw_warden(img, d):
    W, H = img.size
    for yy in range(H): d.line([(0, yy), (W, yy)], fill=(int(40 + 16 * yy / H), int(26 + 10 * yy / H), int(20 + 4 * yy / H)))
    cx = W / 2
    d.polygon([(cx - 170, H), (cx - 150, H * 0.62), (cx - 60, H * 0.52), (cx + 60, H * 0.52), (cx + 150, H * 0.62), (cx + 170, H)], fill=(24, 26, 34))   # uniform
    d.polygon([(cx - 40, H * 0.52), (cx, H * 0.7), (cx + 40, H * 0.52)], fill=(200, 196, 180))
    d.polygon([(cx - 10, H * 0.55), (cx, H * 0.7), (cx + 10, H * 0.55)], fill=(120, 20, 20))
    d.ellipse([cx - 62, H * 0.22, cx + 62, H * 0.5], fill=(190, 150, 120))
    d.ellipse([cx - 66, H * 0.18, cx + 66, H * 0.3], fill=(60, 50, 40))
    for ex in (-26, 26): d.ellipse([cx + ex - 9, H * 0.33, cx + ex + 9, H * 0.35], fill=(40, 30, 25))
    d.line([(cx - 20, H * 0.44), (cx + 20, H * 0.44)], fill=(110, 60, 50), width=4)
    for i in range(4): d.rectangle([cx - 140 + i * 18, H * 0.66, cx - 128 + i * 18, H * 0.7], fill=(180, 150, 60))

def bookshelf():
    wood = texmat('bs_wood', tex_wood('t_bswood', (70, 42, 22), 26, planks=1), 0.5, coat=0.2)
    W, D, H = 1.6, 0.38, 2.1
    P = [uv(box('back', (W, 0.02, H), (0, D / 2 - 0.01, H / 2), wood))]
    for sx in (-1, 1): P.append(uv(box('side', (0.04, D, H), (sx * (W / 2 - 0.02), 0, H / 2), wood, bev=0.004)))
    rng = random.Random(9)
    cols = [(0.35, 0.05, 0.04), (0.08, 0.14, 0.3), (0.12, 0.22, 0.1), (0.4, 0.3, 0.12), (0.15, 0.1, 0.06), (0.5, 0.45, 0.35)]
    bm_ = [mat('book_%d' % i, c, 0.7) for i, c in enumerate(cols)]
    for k in range(6):
        z = 0.06 + k * 0.4
        P.append(uv(box('shelf', (W - 0.06, D - 0.02, 0.03), (0, 0, z), wood, bev=0.004)))
        if k == 5: break
        x = -W / 2 + 0.06
        while x < W / 2 - 0.12:
            if rng.random() < 0.08: x += rng.uniform(0.05, 0.2); continue
            t = rng.uniform(0.025, 0.06); h = rng.uniform(0.22, 0.33); dd = rng.uniform(0.2, 0.28)
            lean = 0.0 if rng.random() > 0.1 else 0.25
            P.append(box('book', (t, dd, h), (x + t / 2, -0.02, z + 0.015 + h / 2), rng.choice(bm_), bev=0.003, rot=(0, lean, 0)))
            x += t + 0.003 + (0.05 if lean else 0)
    return done('bookshelf', P)

def lamp_cage():
    st = mat('lc_steel', (0.08, 0.08, 0.08), 0.5, 0.8); gl = mat('lc_glass', (1, 0.95, 0.8), 0.1, 0, emit=(1, 0.9, 0.7), emit_str=8)
    P = [cyl('base', 0.08, 0.04, (0, 0, 0.02), st, verts=20, bev=0.004)]
    P.append(sphere('bulb', 0.055, (0, 0, 0.12), gl, seg=16, rings=10))
    for i in range(6):
        a = i * math.pi / 3
        P.append(tube('cage', [Vector((0.07 * math.cos(a), 0.07 * math.sin(a), 0.03)), Vector((0.08 * math.cos(a), 0.08 * math.sin(a), 0.13)), Vector((0.0, 0.0, 0.2))], 0.004, st, res=6, bev_res=1))
    P.append(torus('ring', 0.078, 0.004, (0, 0, 0.1), st))
    o = finish('prop_lamp_cage', P); export('lamp_cage', [o])

def fluoro():
    st = mat('fl_steel', (0.7, 0.7, 0.68), 0.4, 0.6); tube_m = mat('fl_tube', (1, 1, 1), 0.2, 0, emit=(0.9, 0.95, 1.0), emit_str=6)
    P = [uv(box('housing', (1.3, 0.22, 0.06), (0, 0, 0.03), st, bev=0.01))]
    for y in (-0.05, 0.05): P.append(cyl('tube', 0.014, 1.2, (0, y, -0.005), tube_m, rot=(0, math.pi / 2, 0), verts=12))
    for x in (-0.6, 0.6): P.append(box('cap', (0.03, 0.2, 0.04), (x, 0, 0.0), st, bev=0.005))
    for x in (-0.4, 0.4): P.append(cyl('chain', 0.004, 0.4, (x, 0, 0.26), st, verts=6))
    o = finish('prop_fluoro', P, origin_floor=False); export('fluoro', [o])

def door_metal():
    paint = texmat('door_paint', tex_paint('t_door', (70, 72, 66), 19, rust=0.45, chips=0.5), 0.5, 0.6)
    ch = mat('door_ch', (0.5, 0.5, 0.5), 0.3, 1.0); glass = mat('door_glass', (0.15, 0.2, 0.2), 0.1, 0.5); wire = mat('door_wire', (0.3, 0.3, 0.3), 0.5, 1.0)
    W, H, T = 1.0, 1.0, 0.06   # unit door (scaled in game to the opening), hinge at x=0
    P = [uv(box('leaf', (W, T, H), (W / 2, 0, H / 2), paint, bev=0.006))]
    for (x0, z0, w, h) in [(0.1, 0.08, 0.8, 0.38), (0.1, 0.54, 0.8, 0.14)]:
        P.append(uv(box('panel', (w, T + 0.008, h), (x0 + w / 2, 0, z0 + h / 2), paint, bev=0.01)))
    P.append(box('win', (0.36, T + 0.012, 0.2), (0.5, 0, 0.8), glass, bev=0.006))
    for i in range(5): P.append(box('wire', (0.002, T + 0.016, 0.2), (0.34 + i * 0.08, 0, 0.8), wire))
    P.append(box('kick', (W - 0.04, T + 0.01, 0.07), (W / 2, 0, 0.04), ch, bev=0.004))
    for s in (-1, 1):
        P.append(cyl('rose', 0.025, 0.012, (0.86, s * (T / 2 + 0.006), 0.45), ch, rot=(math.pi / 2, 0, 0), verts=16))
        P.append(box('lever', (0.1, 0.02, 0.018), (0.82, s * (T / 2 + 0.03), 0.45), ch, bev=0.006))
    for z in (0.12, 0.88): P.append(cyl('hinge', 0.012, 0.08, (0.0, 0, z), ch, verts=10))
    o = join(P, 'prop_door_metal'); print('door tris', tri_count(o)); export('door_metal', [o])

def bench():
    wood = texmat('bench_wood', tex_wood('t_bench', (100, 70, 40), 27, planks=3), 0.7)
    st = mat('bench_st', (0.1, 0.1, 0.1), 0.5, 0.8)
    P = []
    for i in range(3): P.append(uv(box('slat', (1.6, 0.12, 0.035), (0, -0.14 + i * 0.14, 0.45), wood, bev=0.006)))
    for x in (-0.65, 0.65):
        P.append(box('leg', (0.05, 0.4, 0.04), (x, 0, 0.42), st, bev=0.005))
        for y in (-0.17, 0.17): P.append(box('legv', (0.04, 0.04, 0.42), (x, y, 0.21), st, bev=0.005))
    return done('bench', P)

def pedestal():
    stone = texmat('ped_stone', tex_concrete('t_ped', (130, 124, 112), 31), 0.8)
    P = [lathe('ped', [(0, 0), (0.32, 0), (0.32, 0.08), (0.27, 0.12), (0.2, 0.16), (0.2, 0.84), (0.26, 0.88), (0.3, 0.94), (0.3, 1.0), (0, 1.0)], stone, segs=8, smooth=10)]
    return done('pedestal', P)

BUILD = {'bed': bed, 'toilet': toilet, 'locker': locker, 'desk': desk, 'chair': chair, 'typewriter': typewriter, 'itembox': itembox,
         'crate': crate, 'barrel': barrel, 'cabinet': cabinet, 'monitor': monitor, 'safe': safe, 'musicbox': musicbox_prop,
         'valve_pipe': valve_pipe, 'pipe': pipe_run, 'bookshelf': bookshelf, 'lamp_cage': lamp_cage, 'fluoro': fluoro,
         'door_metal': door_metal, 'bench': bench, 'pedestal': pedestal,
         'painting_eagle': lambda: painting('eagle', draw_eagle), 'painting_wolf': lambda: painting('wolf', draw_wolf),
         'painting_snake': lambda: painting('snake', draw_snake), 'painting_warden': lambda: painting('warden', draw_warden, 1.0, 1.3)}
for k, fn in BUILD.items():
    if ONLY and k not in ONLY: continue
    reset_hs(); fn()
print('props done')
