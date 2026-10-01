"""Rockfort exterior + Ashford Palace props → src/assets/models/prop_<name>.glb
   (bridge, plaza, Military Training Facility, palace main hall). Same conventions as props.py:
   real-world scale, origin at floor centre, front faces -Y in Blender (= +Z in game).
   Run: python3 tools/props2.py [name ...]"""
import sys, random
_argv = sys.argv[:]; sys.argv = [sys.argv[0], '__none__']
sys.path.insert(0, '/data/assets_src/tools')
import props as PR          # texture helpers (its build loop is skipped by the dummy filter)
sys.argv = _argv
from hs import *
from PIL import ImageFilter
ONLY = set(sys.argv[1:])
tex_wood, tex_paint, tex_concrete, tex_fabric, texmat, uv, done, fbm, save_tex = PR.tex_wood, PR.tex_paint, PR.tex_concrete, PR.tex_fabric, PR.texmat, PR.uv, PR.done, PR.fbm, PR.save_tex
TS = PR.TS

def dark_wood(): return texmat('pal_wood', tex_wood('t_pal_wood', (62, 34, 20), 41, planks=1), 0.45, coat=0.4)
def brass(): return mat('pal_brass', (0.62, 0.45, 0.16), 0.28, 1.0)
def iron(): return mat('pal_iron', (0.05, 0.05, 0.055), 0.45, 0.85)
def flame(): return mat('candle_flame', (1.0, 0.8, 0.45), 0.5, 0.0, emit=(1.0, 0.72, 0.35), emit_str=14.0)
def wax(): return mat('candle_wax', (0.86, 0.82, 0.72), 0.5)

def candle(name, loc, h=0.16, r=0.012):
    x, y, z = loc
    return [cyl(name + 'w', r, h, (x, y, z + h / 2), wax(), verts=10),
            sphere(name + 'f', 0.011, (x, y, z + h + 0.018), flame(), scale=(0.7, 0.7, 1.6), seg=8, rings=6)]

# ------------------------------------------------------------------ palace hall
def baluster_rail():
    """1 m railing section: plinth, 4 turned balusters, moulded handrail (instanced along galleries/stairs)"""
    w = dark_wood(); P = []
    P.append(uv(box('plinth', (1.0, 0.16, 0.1), (0, 0, 0.05), w, bev=0.01)))
    P.append(uv(box('rail', (1.0, 0.13, 0.07), (0, 0, 0.98), w, bev=0.02, seg=3)))
    P.append(uv(box('rail2', (1.0, 0.09, 0.03), (0, 0, 0.93), w, bev=0.008)))
    prof = [(0, 0.1), (0.03, 0.1), (0.032, 0.14), (0.022, 0.18), (0.02, 0.3), (0.042, 0.45), (0.045, 0.52), (0.026, 0.68), (0.018, 0.8), (0.03, 0.86), (0.032, 0.92), (0, 0.92)]
    for i in range(4): P.append(lathe('bal%d' % i, prof, w, loc=(-0.375 + i * 0.25, 0, 0), segs=10, smooth=10))
    return done('baluster_rail', P)

def newel_post():
    w = dark_wood(); b = brass(); P = []
    P.append(uv(box('post', (0.26, 0.26, 1.1), (0, 0, 0.55), w, bev=0.02)))
    for z in (0.12, 0.95): P.append(uv(box('band', (0.3, 0.3, 0.06), (0, 0, z), w, bev=0.015)))
    P.append(uv(box('cap', (0.32, 0.32, 0.08), (0, 0, 1.14), w, bev=0.02)))
    P.append(lathe('stem', [(0, 1.18), (0.05, 1.18), (0.03, 1.26), (0.018, 1.5), (0.05, 1.54), (0, 1.56)], b, segs=16))
    for i in range(3):
        a = i * 2 * math.pi / 3; x, y = 0.14 * math.cos(a), 0.14 * math.sin(a)
        P.append(tube('arm%d' % i, [(0, 0, 1.45), (x * 0.6, y * 0.6, 1.47), (x, y, 1.56)], 0.008, b))
        P.append(lathe('cup%d' % i, [(0, 1.55), (0.03, 1.56), (0.032, 1.58), (0, 1.58)], b, loc=(x, y, 0), segs=12))
        P += candle('c%d' % i, (x, y, 1.58))
    P += candle('cm', (0, 0, 1.56), h=0.2)
    return done('newel_post', P)

def chandelier():
    """three-tier brass & crystal chandelier with candle bulbs (origin = top hook)"""
    b = brass(); cr = mat('crystal', (0.9, 0.92, 0.95), 0.05, 0.0, emit=(1.0, 0.9, 0.7), emit_str=0.6)
    P = [lathe('stem', [(0, 0), (0.03, 0), (0.03, -0.5), (0.06, -0.55), (0.04, -0.9), (0.09, -1.0), (0.05, -1.4), (0.08, -1.6), (0, -1.9)], b, segs=16)]
    for (R, z, n) in [(0.75, -1.35, 12), (0.5, -0.95, 8), (0.28, -0.6, 6)]:
        P.append(torus('ring', R, 0.018, (0, 0, z), b, maj=48, mnr=6))
        for i in range(n):
            a = i * 2 * math.pi / n; x, y = R * math.cos(a), R * math.sin(a)
            P.append(tube('arm', [(0, 0, z + 0.25), (x * 0.5, y * 0.5, z + 0.05), (x, y, z)], 0.01, b))
            P += candle('c', (x, y, z + 0.01), h=0.12, r=0.014)
            P.append(box('pr', (0.02, 0.02, 0.12), (x * 0.92, y * 0.92, z - 0.1), cr, rot=(0, 0, a)))
        for i in range(n * 2):
            a = (i + 0.5) * math.pi / n
            P.append(sphere('dr', 0.015, (R * 1.02 * math.cos(a), R * 1.02 * math.sin(a), z - 0.06 - 0.04 * (i % 2)), cr, scale=(1, 1, 1.8), seg=6, rings=4))
    for i in range(16):
        a = i * math.pi / 8
        P.append(box('tear', (0.018, 0.018, 0.22), (0.12 * math.cos(a), 0.12 * math.sin(a), -1.75), cr, rot=(0, 0, a)))
    o = finish('prop_chandelier', P, origin_floor=False, center=True)
    PR.export('chandelier', [o])

def column():
    """classical column with fluted shaft and capital, 5 m (scaled in game)"""
    st = texmat('col_stone', tex_concrete('t_col', (190, 182, 160), 51), 0.6)
    P = [uv(box('plinth', (0.8, 0.8, 0.25), (0, 0, 0.125), st, bev=0.02))]
    P.append(lathe('base', [(0, 0.25), (0.36, 0.25), (0.37, 0.3), (0.32, 0.35), (0.34, 0.42), (0.28, 0.48), (0, 0.48)], st, segs=24))
    shaft = lathe('shaft', [(0, 0.48), (0.27, 0.48), (0.26, 2.5), (0.235, 4.3), (0, 4.3)], st, segs=40, smooth=60)
    Pp = V(shaft); a = np.arctan2(Pp[:, 1], Pp[:, 0]); r = np.hypot(Pp[:, 0], Pp[:, 1])
    k = (r > 0.1) & (Pp[:, 2] > 0.6) & (Pp[:, 2] < 4.2)
    r2 = np.where(k, r - 0.012 * (0.5 + 0.5 * np.cos(a * 20)), r)
    Pp[:, 0] = r2 * np.cos(a); Pp[:, 1] = r2 * np.sin(a); setV(shaft, Pp); P.append(shaft)
    P.append(lathe('neck', [(0, 4.3), (0.27, 4.3), (0.28, 4.36), (0.25, 4.4), (0, 4.4)], st, segs=24))
    P.append(lathe('bell', [(0, 4.4), (0.25, 4.4), (0.3, 4.6), (0.4, 4.78), (0, 4.78)], st, segs=24))
    for i in range(8):
        a = i * math.pi / 4
        P.append(prism('leaf%d' % i, [(0, 4.4), (0.06, 4.5), (0.1, 4.72), (0.04, 4.8), (0, 4.75)], 0.1, st, axis='x'))
        P[-1].location = (0.27 * math.cos(a), 0.27 * math.sin(a), 0); P[-1].rotation_euler = (0, 0, a + math.pi / 2); apply_transform(P[-1])
    P.append(uv(box('abacus', (0.9, 0.9, 0.16), (0, 0, 4.86), st, bev=0.02)))
    return done('column', P)

def draw_rosette(W):
    img = Image.new('RGB', (W, W), (0, 0, 0)); d = ImageDraw.Draw(img)
    c = W / 2
    for r, col in ((0.48, (70, 60, 40)), (0.44, (150, 130, 80)), (0.4, (40, 50, 70))):
        d.ellipse([c - r * W, c - r * W, c + r * W, c + r * W], fill=col)
    pts = [(c + 0.38 * W * math.sin(i * 4 * math.pi / 5), c - 0.38 * W * math.cos(i * 4 * math.pi / 5)) for i in range(6)]
    d.line(pts, fill=(200, 175, 110), width=W // 40)
    for i in range(10):
        a = i * math.pi / 5
        d.line([(c, c), (c + 0.4 * W * math.cos(a), c + 0.4 * W * math.sin(a))], fill=(120, 100, 60), width=W // 90)
    d.ellipse([c - 0.07 * W, c - 0.07 * W, c + 0.07 * W, c + 0.07 * W], fill=(220, 190, 120))
    return img

def rosette_window():
    """round stone-framed window with pentagram tracery (wall decoration, faintly lit glass)"""
    st = texmat('ros_stone', tex_concrete('t_ros', (170, 160, 135), 53), 0.65)
    img = draw_rosette(512); p = f'{TEXDIR}/t_rosette.png'; img.save(p)
    glass = mat('ros_glass', (1, 1, 1), 0.3, tex=p)
    gl = glass.node_tree.nodes['Principled BSDF']
    t = [n for n in glass.node_tree.nodes if n.type == 'TEX_IMAGE'][0]
    glass.node_tree.links.new(t.outputs['Color'], gl.inputs['Emission Color']); gl.inputs['Emission Strength'].default_value = 0.8
    P = [torus('frame', 0.95, 0.09, (0, 0, 1.0), st, rot=(math.pi / 2, 0, 0), maj=48, mnr=10)]
    P.append(torus('frame2', 0.78, 0.04, (0, -0.02, 1.0), st, rot=(math.pi / 2, 0, 0), maj=40, mnr=6))
    P.append(decal('glass', 1.8, 1.8, (0, 0.02, 1.0), (math.pi / 2, 0, 0), p, 0.3))
    P[-1].data.materials[0] = glass
    for i in range(8):
        a = i * math.pi / 4
        P.append(sphere('boss', 0.06, (1.0 * math.cos(a), -0.06, 1.0 + 1.0 * math.sin(a)), st, seg=10, rings=6))
    return done('rosette_window', P)

def door_wood():
    """ornate palace door leaf, unit 1×1 (scaled), hinge at x=0, raised panels + brass ring pull"""
    w = dark_wood(); b = brass(); T = 0.07
    P = [uv(box('leaf', (1.0, T, 1.0), (0.5, 0, 0.5), w, bev=0.008))]
    for (x0, z0, ww, hh) in [(0.1, 0.06, 0.8, 0.32), (0.1, 0.44, 0.8, 0.22), (0.1, 0.72, 0.8, 0.22)]:
        P.append(uv(box('pan', (ww, T + 0.016, hh), (x0 + ww / 2, 0, z0 + hh / 2), w, bev=0.02, seg=3)))
        P.append(uv(box('pan2', (ww * 0.8, T + 0.028, hh * 0.7), (x0 + ww / 2, 0, z0 + hh / 2), w, bev=0.015, seg=2)))
    for s in (-1, 1):
        P.append(cyl('rose', 0.04, 0.012, (0.88, s * (T / 2 + 0.008), 0.48), b, rot=(math.pi / 2, 0, 0), verts=16))
        P.append(torus('ring', 0.035, 0.006, (0.88, s * (T / 2 + 0.018), 0.44), b, rot=(0, 0, 0), maj=16, mnr=6))
    o = join(P, 'prop_door_wood'); print('door_wood tris', tri_count(o)); PR.export('door_wood', [o])

def sconce():
    b = brass(); P = [box('plate', (0.14, 0.03, 0.3), (0, 0.0, 0.0), b, bev=0.01)]
    for s in (-1, 1):
        P.append(tube('arm', [(0, -0.015, -0.05), (s * 0.08, -0.12, 0.0), (s * 0.13, -0.16, 0.08)], 0.009, b))
        P.append(lathe('cup', [(0, 0.07), (0.035, 0.075), (0.037, 0.095), (0, 0.095)], b, loc=(s * 0.13, -0.16, 0), segs=12))
        P += candle('c', (s * 0.13, -0.16, 0.095), h=0.14)
    o = finish('prop_sconce', P, origin_floor=False, center=False); PR.export('sconce', [o])

def banner():
    """Ashford crest banner: red velvet, gold fringe & hawk emblem"""
    W, H = 1.0, 2.6
    img = Image.new('RGB', (256, 666), (110, 12, 16)); d = ImageDraw.Draw(img)
    d.rectangle([10, 10, 246, 656], outline=(200, 160, 70), width=6)
    cx, cy = 128, 260
    d.ellipse([cx - 80, cy - 80, cx + 80, cy + 80], outline=(210, 170, 80), width=8)
    for s in (-1, 1):
        d.polygon([(cx, cy - 10), (cx + s * 70, cy - 60), (cx + s * 60, cy - 20), (cx + s * 75, cy - 5), (cx + s * 40, cy + 20)], fill=(210, 170, 80))
    d.polygon([(cx - 14, cy - 40), (cx + 14, cy - 40), (cx + 18, cy + 50), (cx, cy + 70), (cx - 18, cy + 50)], fill=(210, 170, 80))
    d.text((cx - d.textlength('A', font=font(FONT_SERIF, 90)) / 2, 420), 'A', font=font(FONT_SERIF, 90), fill=(210, 170, 80))
    arr = np.asarray(img.filter(ImageFilter.GaussianBlur(0.8))).astype(np.float32)
    arr *= (0.8 + 0.3 * fbm(arr.shape[:2], 61, base=32))[..., None]
    p = save_tex('t_banner', arr)
    vel = mat('banner_vel', (1, 1, 1), 0.85, tex=p)
    bm = bmesh.new(); N = 12; vs = []
    for j in range(N + 1):
        row = []
        for i in range(5):
            x = (i / 4 - 0.5) * W; z = H * (1 - j / N)
            row.append(bm.verts.new((x, -0.04 * math.sin(i * 1.4 + j * 0.4) - 0.03 * (j / N), z)))
        vs.append(row)
    uvs = []
    for j in range(N):
        for i in range(4): uvs.append(bm.faces.new([vs[j][i], vs[j + 1][i], vs[j + 1][i + 1], vs[j][i + 1]]))
    lay = bm.loops.layers.uv.new()
    for f in bm.faces:
        for l in f.loops: l[lay].uv = (l.vert.co.x / W + 0.5, l.vert.co.z / H)
    from hs import _obj
    cloth = _obj('banner', bm, vel)
    so = cloth.modifiers.new('s', 'SOLIDIFY'); so.thickness = 0.01; apply_modifier(cloth, 's'); shade_smooth(cloth)
    b = brass()
    P = [cloth, cyl('rod', 0.02, W + 0.2, (0, 0, H + 0.02), b, rot=(0, math.pi / 2, 0), verts=12)]
    for s in (-1, 1): P.append(sphere('fin', 0.04, (s * (W / 2 + 0.12), 0, H + 0.02), b, seg=10, rings=6))
    for i in range(14): P.append(box('fr', (0.012, 0.012, 0.09), (-W / 2 + 0.04 + i * (W - 0.08) / 13, -0.03, -0.04), b))
    return done('banner', P)

def portrait_alexia():
    def draw(img, d):
        W, H = img.size
        d.rectangle([0, 0, W, H], fill=(28, 22, 30))
        d.ellipse([W * 0.25, H * 0.42, W * 0.75, H * 1.25], fill=(130, 110, 120))          # gown
        d.rectangle([W * 0.44, H * 0.34, W * 0.56, H * 0.46], fill=(205, 175, 150))          # neck
        d.ellipse([W * 0.36, H * 0.14, W * 0.64, H * 0.4], fill=(215, 185, 160))            # face
        d.pieslice([W * 0.32, H * 0.08, W * 0.68, H * 0.44], 180, 360, fill=(220, 190, 120)) # blonde hair
        d.rectangle([W * 0.32, H * 0.25, W * 0.38, H * 0.5], fill=(220, 190, 120)); d.rectangle([W * 0.62, H * 0.25, W * 0.68, H * 0.5], fill=(220, 190, 120))
        for ex in (0.45, 0.55): d.ellipse([W * ex - 6, H * 0.26 - 3, W * ex + 6, H * 0.26 + 3], fill=(40, 60, 90))
        d.line([(W * 0.47, H * 0.34), (W * 0.53, H * 0.34)], fill=(150, 70, 70), width=3)
        d.ellipse([W * 0.47, H * 0.5, W * 0.53, H * 0.55], fill=(170, 30, 40))              # brooch
    PR.painting('alexia', draw, 1.2, 1.7)

# ------------------------------------------------------------------ exterior
def lamp_post():
    ir = iron(); glow = mat('lamp_glass', (1, 0.9, 0.7), 0.2, emit=(1.0, 0.82, 0.55), emit_str=6.0)
    P = [lathe('post', [(0, 0), (0.18, 0), (0.16, 0.12), (0.09, 0.2), (0.07, 0.6), (0.05, 0.62), (0.05, 3.4), (0.08, 3.45), (0, 3.45)], ir, segs=16)]
    P.append(lathe('head', [(0, 3.45), (0.16, 3.5), (0.2, 3.55), (0, 3.56)], ir, segs=8, smooth=0))
    P.append(cyl('glass', 0.13, 0.42, (0, 0, 3.78), glow, verts=8, r2=0.17))
    for i in range(4):
        a = i * math.pi / 2 + math.pi / 4
        P.append(box('bar', (0.02, 0.02, 0.44), (0.16 * math.cos(a), 0.16 * math.sin(a), 3.78), ir))
    P.append(lathe('roof', [(0, 4.12), (0.24, 4.0), (0.24, 4.02), (0.05, 4.2), (0.03, 4.32), (0, 4.34)], ir, segs=8, smooth=0))
    return done('lamp_post', P)

def bridge_rail():
    """2 m steel railing segment for the bridge (posts, 3 rails, rust)"""
    paint = texmat('br_paint', tex_paint('t_bridge', (70, 78, 74), 71, rust=0.55, chips=0.6), 0.55, 0.6)
    P = [uv(box('post', (0.1, 0.1, 1.15), (-0.95, 0, 0.575), paint, bev=0.008))]
    for z in (0.35, 0.72, 1.08): P.append(uv(box('rail', (2.0, 0.06, 0.06 if z < 1 else 0.08), (0, 0, z), paint, bev=0.006)))
    for x in (-0.5, 0.0, 0.5):
        P.append(uv(box('diag', (0.04, 0.04, 0.8), (x, 0, 0.55), paint, rot=(0, 0.55, 0))))
    P.append(uv(box('kick', (2.0, 0.08, 0.12), (0, 0, 0.06), paint, bev=0.004)))
    return done('bridge_rail', P)

def sandbags():
    jute = texmat('jute', tex_fabric('t_jute', (120, 100, 66), 73), 0.95)
    P = []; rng = random.Random(5)
    for row in range(3):
        n = 4 - (row % 2)
        for i in range(n):
            x = (i - (n - 1) / 2) * 0.42
            o = sphere('bag', 0.25, (x, 0, 0.1 + row * 0.17), jute, scale=(0.85, 0.62, 0.36), seg=14, rings=8)
            o.rotation_euler = (0, 0, rng.uniform(-0.1, 0.1)); apply_transform(o); P.append(uv(o, 0.6))
    return done('sandbags', P)

def sign_umbrella():
    def draw(img, d):
        W, H = img.size
        d.rectangle([0, 0, W, H], fill=(205, 200, 188, 255)); d.rectangle([8, 8, W - 9, H - 9], outline=(40, 40, 40, 255), width=6)
        cx, cy, r = 150, H / 2, 105
        for i in range(8):
            a0, a1 = i * 45 - 90, (i + 1) * 45 - 90
            d.pieslice([cx - r, cy - r, cx + r, cy + r], a0, a1, fill=(190, 20, 25, 255) if i % 2 == 0 else (240, 240, 235, 255))
        d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(40, 40, 40, 255), width=4)
        f = font(FONT_SANS, 64); d.text((290, 70), 'UMBRELLA', font=f, fill=(30, 30, 30, 255))
        f2 = font(FONT_SANS, 40); d.text((290, 150), 'MILITARY TRAINING FACILITY', font=f2, fill=(160, 20, 25, 255))
        f3 = font(FONT_SANS, 26); d.text((290, 205), 'ROCKFORT ISLAND · AUTHORIZED PERSONNEL ONLY', font=f3, fill=(50, 50, 50, 255))
    t = tex_label('t_sign_umb', (1100, 280), (0, 0, 0, 255), draw)
    img = Image.open(t).convert('RGBA'); grunge(img, 0.25, 5).save(t)
    st = mat('sign_st', (0.2, 0.2, 0.2), 0.5, 0.8)
    P = [box('plate', (3.0, 0.05, 0.76), (0, 0, 0.38), st, bev=0.01), decal('face', 2.95, 0.74, (0, -0.03, 0.38), (math.pi / 2, 0, 0), t, 0.6)]
    for x in (-1.4, 1.4): P.append(box('bolt', (0.03, 0.02, 0.03), (x, -0.035, 0.66), st))
    return done('sign_umbrella', P)

def window_frame():
    """steel window (1.2×1.4) with mullions, dark wired glass and sill — for facades"""
    paint = texmat('win_paint', tex_paint('t_win', (60, 64, 60), 75, rust=0.4), 0.55, 0.6)
    glass = mat('win_glass', (0.04, 0.05, 0.055), 0.08, 0.4)
    P = [box('glass', (1.1, 0.02, 1.3), (0, 0.03, 0.75), glass)]
    for (w, h, x, z) in [(1.2, 0.08, 0, 0.06), (1.2, 0.08, 0, 1.44), (0.08, 1.46, -0.56, 0.75), (0.08, 1.46, 0.56, 0.75), (0.05, 1.3, 0, 0.75), (1.1, 0.05, 0, 0.98)]:
        P.append(uv(box('fr', (w, 0.08, h), (x, 0, z), paint, bev=0.005)))
    P.append(uv(box('sill', (1.35, 0.2, 0.06), (0, -0.08, 0.0), paint, bev=0.006)))
    return done('window_frame', P)

def statue_hawk():
    """bronze hawk with spread wings on a stone plinth (palace forecourt)"""
    st = texmat('st_plinth', tex_concrete('t_plinth', (150, 144, 130), 77), 0.75)
    br = mat('st_bronze', (0.22, 0.17, 0.09), 0.35, 1.0)
    P = [uv(box('pl', (1.4, 1.4, 0.3), (0, 0, 0.15), st, bev=0.03)), uv(box('pl2', (1.0, 1.0, 1.6), (0, 0, 1.1), st, bev=0.03)), uv(box('pl3', (1.3, 1.3, 0.2), (0, 0, 2.0), st, bev=0.03))]
    body = sphere('body', 0.3, (0, 0, 2.55), br, scale=(0.7, 0.9, 1.3), seg=18, rings=12); P.append(body)
    P.append(sphere('head', 0.14, (0, -0.15, 3.0), br, seg=14, rings=10))
    P.append(cyl('beak', 0.05, 0.14, (0, -0.3, 2.98), br, rot=(math.pi / 2 + 0.4, 0, 0), verts=8, r2=0.0))
    for s in (-1, 1):
        wing = prism('wing', [(0.0, 0.0), (0.5, 0.35), (1.1, 0.75), (1.25, 0.55), (1.0, 0.2), (0.9, -0.1), (0.6, -0.3), (0.2, -0.25)], 0.06, br, axis='y')
        Pw = V(wing); Pw[:, 0] *= s; setV(wing, Pw)
        wing.location = (s * 0.12, 0.05, 2.55); wing.rotation_euler = (0, s * -0.2, 0); apply_transform(wing); P.append(wing)
        for k in range(5):
            f = box('fe', (0.36, 0.03, 0.08), (s * (0.75 + k * 0.1), 0.05, 2.25 + k * 0.17), br, rot=(0, s * (0.9 - k * 0.12), 0)); P.append(f)
    P.append(prism('tail', [(-0.15, 0), (0.15, 0), (0.25, -0.5), (-0.25, -0.5)], 0.05, br, axis='y'))
    P[-1].location = (0, 0.18, 2.3); apply_transform(P[-1])
    for s in (-1, 1): P.append(cyl('talon', 0.04, 0.3, (s * 0.1, 0, 2.2), br, verts=8))
    return done('statue_hawk', P)

def urn():
    st = texmat('urn_stone', tex_concrete('t_urn', (160, 152, 136), 79), 0.75)
    P = [uv(box('ped', (0.6, 0.6, 0.9), (0, 0, 0.45), st, bev=0.02))]
    P.append(lathe('urn', [(0, 0.9), (0.18, 0.9), (0.12, 0.98), (0.14, 1.05), (0.32, 1.2), (0.34, 1.4), (0.28, 1.5), (0.33, 1.56), (0.3, 1.6), (0, 1.55)], st, segs=24))
    plant = mat('urn_plant', (0.05, 0.09, 0.03), 0.9)
    rng = random.Random(9)
    for i in range(12):
        a = rng.uniform(0, 6.28)
        P.append(sphere('bush', rng.uniform(0.1, 0.17), (0.18 * math.cos(a), 0.18 * math.sin(a), 1.62 + rng.uniform(0, 0.15)), plant, seg=8, rings=6))
    return done('urn', P)

def gate_iron():
    """wrought-iron gate leaf (unit 1 wide × 1 high, hinge x=0) with spear finials"""
    ir = iron(); P = []
    for z in (0.05, 0.5, 0.95): P.append(box('h', (1.0, 0.03, 0.03), (0.5, 0, z), ir))
    for i in range(11):
        x = 0.04 + i * 0.092
        P.append(cyl('v', 0.01, 1.0, (x, 0, 0.5), ir, verts=6))
        P.append(cyl('tip', 0.02, 0.06, (x, 0, 1.03), ir, verts=6, r2=0.0))
    for i in range(5):
        P.append(torus('sc', 0.04, 0.006, (0.14 + i * 0.18, 0, 0.72), ir, rot=(math.pi / 2, 0, 0), maj=12, mnr=4))
    o = join(P, 'prop_gate_iron'); PR.export('gate_iron', [o])

BUILD = {'baluster_rail': baluster_rail, 'newel_post': newel_post, 'chandelier': chandelier, 'column': column,
         'rosette_window': rosette_window, 'door_wood': door_wood, 'sconce': sconce, 'banner': banner, 'portrait_alexia': portrait_alexia,
         'lamp_post': lamp_post, 'bridge_rail': bridge_rail, 'sandbags': sandbags, 'sign_umbrella': sign_umbrella,
         'window_frame': window_frame, 'statue_hawk': statue_hawk, 'urn': urn, 'gate_iron': gate_iron}
for k, fn in BUILD.items():
    if ONLY and k not in ONLY: continue
    reset_hs(); fn()
print('props2 done')
