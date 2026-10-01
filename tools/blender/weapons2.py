"""Hard-surface models for the rest of Claire's arsenal (game frame: +Z barrel = Blender -Y, origin = grip).
   Run: python3 tools/weapons2.py [id ...]"""
import sys; sys.path.insert(0, '/data/assets_src/tools')
from hs import *
ONLY = set(sys.argv[1:])

def W(f, u, x=0.0): return Vector((x, -f, u))
def wprism(name, pts, width, m, bev=0.001, seg=2, x=0.0):
    """pts (f, u) side profile, extruded along X (width)."""
    return prism(name, [(-f, u) for f, u in pts], width, m, bev=bev, seg=seg, axis='x', off=x)
def wbox(name, f0, f1, u0, u1, w, m, x=0.0, bev=0.001, seg=2):
    return wprism(name, [(f0, u0), (f1, u0), (f1, u1), (f0, u1)], w, m, bev, seg, x)
def wcyl(name, r, f0, f1, u, m, x=0.0, verts=24, bev=0.0005, r2=None):
    o = cyl(name, r, abs(f1 - f0), (x, -(f0 + f1) / 2, u), m, rot=(math.pi / 2, 0, 0), verts=verts, bev=bev, r2=r2)
    return o
def wlathe(name, prof, u, m, x=0.0, segs=28):
    """prof [(r, f)] revolved around the barrel axis."""
    return lathe(name, prof, m, loc=(x, 0, u), rot=(math.pi / 2, 0, 0), segs=segs) if False else _wl(name, prof, u, m, x, segs)
def _wl(name, prof, u, m, x, segs):
    o = lathe(name, [(r, f) for r, f in prof], m, segs=segs)
    o.rotation_euler = (math.pi / 2, 0, 0); apply_transform(o)   # local Z → -Y (forward)
    P = V(o); P[:, 1] *= 1; setV(o, P)
    o.location = (x, 0, u); apply_transform(o); return o
def done(name, parts, muzzle, extra=()):
    o = join([p for p in parts if p is not None], name)
    try:
        wn = o.modifiers.new('wn', 'WEIGHTED_NORMAL'); wn.keep_sharp = True; apply_modifier(o, 'wn')
    except Exception: pass
    e = bpy.data.objects.new('muzzle', None); link(e); e.location = W(*muzzle); e.parent = o
    for x in extra: x.parent = o
    print(name, 'tris', tri_count(o) + sum(tri_count(x) for x in extra))
    export_glb(f'{OUT_GLB}/{name}.glb', [o, e, *extra], {'export_tangents': False})
    return o

def mats():
    return dict(
        blued=mat('w_blued', (0.02, 0.02, 0.022), 0.33, 0.9), steel=mat('w_steel', (0.32, 0.32, 0.33), 0.22, 1.0),
        park=mat('w_park', (0.05, 0.05, 0.048), 0.55, 0.7), poly=mat('w_poly', (0.015, 0.015, 0.015), 0.6),
        wood=mat('w_wood', (0.075, 0.028, 0.01), 0.42, 0.0, coat=0.4), olive=mat('w_olive', (0.05, 0.055, 0.03), 0.55, 0.3),
        rub=mat('w_rubber', (0.01, 0.01, 0.01), 0.85), brass=mat('w_brass', (0.7, 0.5, 0.2), 0.3, 1.0),
        chrome=mat('w_chrome', (0.75, 0.76, 0.78), 0.12, 1.0), white=mat('w_white', (0.78, 0.8, 0.82), 0.35, 0.5),
        glow=mat('w_glow', (0.1, 0.4, 0.9), 0.2, 0, emit=(0.2, 0.65, 1.0), emit_str=6), dark=mat('w_dark', (0.004, 0.004, 0.004), 0.8))

def grip_pistol(M, P, rake=16, h=0.1, f0=-0.035, w=0.028, m='poly'):
    rk = math.tan(math.radians(rake))
    P.append(wprism('pgrip', [(f0, 0.004), (f0 + 0.045, 0.004), (f0 + 0.043 - h * rk, -h), (f0 - 0.004 - h * rk, -h - 0.004), (f0 - 0.008, -0.03)], w, M[m], bev=0.004, seg=3))
    for i in range(5):  # finger grooves
        u = -0.02 - i * 0.018
        P.append(wbox('fg', f0 + 0.042 - (-u) * rk, f0 + 0.046 - (-u) * rk, u - 0.006, u + 0.002, w * 0.9, M[m], bev=0.002))
def trigger(M, P, f=0.02, u=0.0):
    P.append(tube('guard', [W(f - 0.02, u), W(f - 0.01, u - 0.028), W(f + 0.02, u - 0.032), W(f + 0.035, u - 0.02), W(f + 0.034, u)], 0.0028, M['blued']))
    tg = tube('trig', [W(f + 0.004, u - 0.001), W(f + 0.008, u - 0.012), W(f + 0.004, u - 0.022)], 0.0022, M['blued']); P.append(tg)

# ------------------------------------------------------------------ M3 (pump / semi shotgun)
def m3():
    M = mats(); P = []
    P.append(wcyl('barrel', 0.0105, 0.05, 0.63, 0.036, M['blued'], verts=28))
    P.append(wcyl('bore', 0.0085, 0.628, 0.6305, 0.036, M['dark'], verts=20, bev=0))
    P.append(wcyl('tube', 0.0115, 0.06, 0.5, 0.012, M['blued'], verts=24))
    P.append(wcyl('cap', 0.0125, 0.5, 0.53, 0.012, M['blued'], verts=24, bev=0.002))
    P.append(wcyl('band', 0.013, 0.46, 0.47, 0.024, M['blued'], verts=20))
    P.append(wbox('bead', 0.618, 0.624, 0.046, 0.051, 0.004, M['steel'], bev=0.0008))
    # receiver
    P.append(wprism('recv', [(-0.09, -0.004), (0.06, -0.004), (0.065, 0.004), (0.065, 0.044), (0.055, 0.052), (-0.07, 0.052), (-0.09, 0.04)], 0.034, M['blued'], bev=0.0025, seg=3))
    P.append(wbox('ejport', -0.03, 0.03, 0.02, 0.042, 0.0346, M['dark'], bev=0.001))
    P.append(wbox('bolt', -0.025, 0.025, 0.025, 0.037, 0.035, M['steel'], bev=0.001))
    P.append(wbox('loadport', -0.05, 0.04, -0.006, 0.0, 0.02, M['dark'], bev=0.001))
    P.append(wbox('rail', -0.08, 0.05, 0.052, 0.06, 0.012, M['blued'], bev=0.001))
    for i in range(8): P.append(wbox('rs', -0.075 + i * 0.016, -0.068 + i * 0.016, 0.059, 0.063, 0.016, M['blued'], bev=0.0005))
    P.append(wbox('ghost', -0.07, -0.058, 0.06, 0.078, 0.02, M['blued'], bev=0.002))
    # pump fore-end with grooves
    P.append(wcyl('pump', 0.022, 0.18, 0.42, 0.018, M['poly'], verts=28, bev=0.003))
    for i in range(10): P.append(wcyl('pg', 0.0232, 0.2 + i * 0.021, 0.208 + i * 0.021, 0.018, M['poly'], verts=28, bev=0.001))
    trigger(M, P, f=-0.005, u=-0.004)
    # pistol grip + stock
    grip_pistol(M, P, rake=22, h=0.1, f0=-0.07, w=0.03)
    P.append(wprism('stock', [(-0.09, 0.046), (-0.09, -0.02), (-0.2, -0.05), (-0.34, -0.085), (-0.36, -0.086), (-0.36, 0.04), (-0.3, 0.046)], 0.036, M['poly'], bev=0.005, seg=3))
    P.append(wbox('pad', -0.375, -0.36, -0.088, 0.042, 0.04, M['rub'], bev=0.004, seg=3))
    P.append(wcyl('sling', 0.006, -0.29, -0.28, -0.07, M['steel'], verts=12))
    done('weapon_m3', P, (0.63, 0.036))

# ------------------------------------------------------------------ MP5
def mp5():
    M = mats(); P = []
    P.append(wprism('recv', [(-0.06, 0.0), (0.24, 0.0), (0.25, 0.012), (0.25, 0.05), (-0.06, 0.05)], 0.036, M['park'], bev=0.003, seg=3))
    P.append(wcyl('ctube', 0.012, 0.18, 0.3, 0.04, M['park'], verts=24))
    P.append(wcyl('barrel', 0.008, 0.25, 0.37, 0.028, M['blued'], verts=20))
    P.append(wlathe('flash', [(0.009, 0.36), (0.011, 0.37), (0.011, 0.4), (0.006, 0.401)], 0.028, M['blued']))
    P.append(wlathe('fsight', [(0.014, 0.3), (0.016, 0.31), (0.014, 0.32)], 0.058, M['park']) if False else wbox('fs', 0.3, 0.32, 0.05, 0.078, 0.022, M['park'], bev=0.002))
    P.append(torus('fring', 0.011, 0.0025, (0, -0.31, 0.074), M['park'], rot=(math.pi / 2, 0, 0)))
    P.append(wbox('rs', -0.04, -0.01, 0.05, 0.072, 0.026, M['park'], bev=0.003))
    P.append(wcyl('rdrum', 0.01, -0.03, -0.018, 0.072, M['park'], verts=16))
    P.append(wprism('handguard', [(0.13, -0.004), (0.25, -0.004), (0.25, 0.012), (0.13, 0.012)], 0.042, M['poly'], bev=0.006, seg=3))
    for i in range(6): P.append(wbox('hg', 0.14 + i * 0.018, 0.148 + i * 0.018, -0.006, 0.01, 0.0432, M['poly'], bev=0.002))
    P.append(wbox('chandle', 0.19, 0.2, 0.04, 0.05, 0.05, M['blued'], x=0.0, bev=0.002))
    # curved mag
    pts = []
    for i in range(9):
        t = i / 8; pts.append((0.1 + 0.035 * t * t + 0.03 * t, -0.0 - 0.15 * t))
    prof = [(f, u) for f, u in pts] + [(f + 0.028, u) for f, u in reversed(pts)]
    P.append(wprism('mag', prof, 0.024, M['blued'], bev=0.002))
    P.append(wbox('magwell', 0.095, 0.135, -0.02, 0.002, 0.03, M['park'], bev=0.002))
    grip_pistol(M, P, rake=18, h=0.095, f0=-0.035, w=0.032)
    trigger(M, P, f=0.0, u=0.0)
    P.append(wbox('selector', -0.03, -0.015, 0.005, 0.016, 0.039, M['steel'], bev=0.002))
    # retractable stock
    for s in (1, -1): P.append(wcyl('srail', 0.004, -0.26, -0.05, 0.03, M['blued'], x=s * 0.012, verts=10))
    P.append(wbox('butt', -0.275, -0.255, -0.05, 0.06, 0.04, M['rub'], bev=0.005, seg=3))
    done('weapon_mp5', P, (0.4, 0.028))

# ------------------------------------------------------------------ Python .357
def python():
    M = mats(); P = []
    st = M['chrome']
    P.append(wcyl('barrel', 0.0095, 0.05, 0.245, 0.036, st, verts=24))
    P.append(wbox('rib', 0.05, 0.245, 0.042, 0.052, 0.012, st, bev=0.001))
    for i in range(10): P.append(wbox('vent', 0.07 + i * 0.017, 0.078 + i * 0.017, 0.046, 0.0525, 0.0124, M['dark'], bev=0.0004))
    P.append(wprism('lug', [(0.05, 0.028), (0.245, 0.028), (0.245, 0.018), (0.235, 0.015), (0.05, 0.015)], 0.016, st, bev=0.002))
    P.append(wbox('fsight', 0.228, 0.24, 0.052, 0.064, 0.004, st, bev=0.001))
    P.append(wcyl('bore', 0.0045, 0.244, 0.2465, 0.036, M['dark'], verts=16, bev=0))
    P.append(wcyl('cyl', 0.02, -0.005, 0.042, 0.026, st, verts=36, bev=0.002))
    for i in range(6):
        a = i * math.pi / 3
        P.append(wbox('flute', -0.0, 0.034, 0.026 + 0.0198 * math.sin(a) - 0.003, 0.026 + 0.0198 * math.sin(a) + 0.003, 0.006, M['blued'], x=0.0198 * math.cos(a), bev=0.001))
    P.append(wprism('frame', [(-0.035, -0.005), (0.05, -0.005), (0.05, 0.05), (-0.015, 0.052), (-0.04, 0.035)], 0.018, st, bev=0.002))
    P.append(wprism('hammer', [(-0.035, 0.035), (-0.05, 0.04), (-0.062, 0.058), (-0.055, 0.062), (-0.036, 0.048)], 0.007, st, bev=0.001))
    P.append(wbox('rsight', -0.03, -0.015, 0.052, 0.058, 0.01, st, bev=0.001))
    grip_pistol(M, P, rake=24, h=0.105, f0=-0.045, w=0.032, m='wood')
    P.append(wprism('gframe', [(-0.045, 0.0), (-0.01, 0.0), (-0.03, -0.03), (-0.05, -0.03)], 0.02, st, bev=0.002))
    for s in (1, -1): P.append(wcyl('med', 0.006, 0, 0, 0, M['brass'], verts=12) if False else None)
    trigger(M, P, f=-0.005, u=-0.002)
    done('weapon_python', P, (0.25, 0.036))

# ------------------------------------------------------------------ Grenade launcher (M79-style)
def gl():
    M = mats(); P = []
    P.append(wcyl('barrel', 0.028, 0.04, 0.38, 0.03, M['olive'], verts=36, bev=0.002))
    P.append(wcyl('muzzle', 0.03, 0.37, 0.4, 0.03, M['olive'], verts=36, bev=0.003))
    P.append(wcyl('bore', 0.021, 0.399, 0.4015, 0.03, M['dark'], verts=28, bev=0))
    for i in range(6):
        a = i * math.pi / 3 + 0.5
        P.append(wbox('rifl', 0.395, 0.402, 0.03 + 0.019 * math.sin(a) - 0.002, 0.03 + 0.019 * math.sin(a) + 0.002, 0.004, M['blued'], x=0.019 * math.cos(a), bev=0))
    P.append(wprism('recv', [(-0.07, -0.01), (0.06, -0.01), (0.06, 0.06), (-0.05, 0.06), (-0.07, 0.04)], 0.05, M['blued'], bev=0.004, seg=3))
    P.append(wbox('ladder', 0.08, 0.14, 0.058, 0.064, 0.024, M['blued'], bev=0.001))
    for s in (1, -1): P.append(wbox('ls', 0.08, 0.13, 0.064, 0.1, 0.003, M['blued'], x=s * 0.011, bev=0.0006))
    P.append(wbox('fsight', 0.35, 0.36, 0.058, 0.072, 0.004, M['blued'], bev=0.001))
    P.append(wprism('fore', [(0.06, -0.02), (0.26, -0.018), (0.26, 0.012), (0.06, 0.012)], 0.046, M['wood'], bev=0.008, seg=3))
    trigger(M, P, f=-0.02, u=-0.01)
    P.append(wprism('stock', [(-0.07, 0.04), (-0.07, -0.03), (-0.14, -0.05), (-0.34, -0.1), (-0.36, -0.1), (-0.36, 0.035), (-0.2, 0.045)], 0.044, M['wood'], bev=0.008, seg=3))
    P.append(wbox('pad', -0.375, -0.36, -0.1, 0.035, 0.046, M['rub'], bev=0.005, seg=3))
    P.append(wbox('lever', -0.03, 0.02, 0.06, 0.068, 0.012, M['steel'], bev=0.002))
    done('weapon_gl', P, (0.4, 0.03))

# ------------------------------------------------------------------ Bow gun (CV crossbow pistol)
def bowgun():
    M = mats(); P = []
    P.append(wprism('rail', [(-0.12, 0.0), (0.33, 0.0), (0.35, 0.012), (0.35, 0.03), (-0.1, 0.035), (-0.12, 0.025)], 0.036, M['park'], bev=0.003, seg=3))
    P.append(wbox('groove', -0.06, 0.34, 0.03, 0.036, 0.008, M['dark'], bev=0.0005))
    P.append(wbox('prod_mount', 0.29, 0.34, -0.01, 0.035, 0.06, M['blued'], bev=0.004))
    # recurve limbs (tubes) + string
    for s in (1, -1):
        P.append(tube('limb', [W(0.31, 0.012, s * 0.03), W(0.33, 0.012, s * 0.12), W(0.3, 0.012, s * 0.22), W(0.27, 0.012, s * 0.25)], 0.007, M['poly'], res=10))
        P.append(wcyl('tip', 0.006, 0.265, 0.275, 0.012, M['steel'], x=s * 0.25, verts=12))
    P.append(tube('string', [W(0.27, 0.012, 0.25), W(0.05, 0.02, 0.0), W(0.27, 0.012, -0.25)], 0.0012, M['white'], res=2, bev_res=1))
    # bolt magazine (3-bolt salvo) on top
    P.append(wbox('mag', 0.0, 0.2, 0.036, 0.068, 0.05, M['blued'], bev=0.004))
    for s in (-1, 0, 1):
        P.append(wcyl('boltv', 0.0035, 0.2, 0.34, 0.05, M['blued'], x=s * 0.014, verts=10))
        P.append(wlathe('bt', [(0.0036, 0.34), (0.0055, 0.346), (0.0, 0.37)], 0.05, M['steel'], x=s * 0.014, segs=8))
    P.append(wbox('scope_rail', -0.08, 0.0, 0.035, 0.045, 0.016, M['blued'], bev=0.001))
    P.append(wcyl('scope', 0.012, -0.09, 0.02, 0.064, M['blued'], verts=24, bev=0.002))
    P.append(wcyl('lens', 0.0105, 0.0195, 0.021, 0.064, mat('lens', (0.02, 0.05, 0.08), 0.05, 0.5), verts=20, bev=0))
    grip_pistol(M, P, rake=18, h=0.1, f0=-0.03, w=0.03)
    trigger(M, P, f=0.0, u=0.0)
    P.append(wprism('stock', [(-0.12, 0.025), (-0.12, -0.01), (-0.26, -0.04), (-0.27, 0.02)], 0.028, M['poly'], bev=0.004))
    done('weapon_bowgun', P, (0.36, 0.05))

# ------------------------------------------------------------------ Linear launcher
def linear():
    M = mats(); P = []
    body = [(-0.2, -0.03), (0.45, -0.03), (0.55, -0.01), (0.62, 0.0), (0.62, 0.05), (0.5, 0.075), (-0.1, 0.085), (-0.2, 0.07)]
    P.append(wprism('body', body, 0.1, M['white'], bev=0.01, seg=3))
    P.append(wprism('coil', [(0.0, 0.03), (0.5, 0.03), (0.5, 0.05), (0.0, 0.05)], 0.104, M['glow'], bev=0.002))
    for i in range(14): P.append(wbox('rib', 0.02 + i * 0.034, 0.03 + i * 0.034, 0.025, 0.056, 0.108, M['park'], bev=0.002))
    P.append(wcyl('emit', 0.022, 0.6, 0.64, 0.026, M['park'], verts=28, bev=0.003))
    P.append(wcyl('emitg', 0.015, 0.64, 0.642, 0.026, M['glow'], verts=24, bev=0))
    P.append(wbox('handle', -0.05, 0.25, 0.1, 0.12, 0.03, M['park'], bev=0.006))
    for f in (-0.03, 0.23): P.append(wbox('hpost', f, f + 0.02, 0.08, 0.105, 0.03, M['park'], bev=0.003))
    grip_pistol(M, P, rake=10, h=0.1, f0=-0.035, w=0.034, m='park')
    trigger(M, P, f=0.0, u=-0.03)
    P.append(wprism('fgrip', [(0.3, -0.03), (0.34, -0.03), (0.335, -0.12), (0.305, -0.12)], 0.03, M['park'], bev=0.006, seg=3))
    P.append(wbox('butt', -0.3, -0.19, -0.02, 0.07, 0.07, M['park'], bev=0.01, seg=3))
    P.append(wbox('screen', -0.12, -0.04, 0.086, 0.088, 0.05, M['glow'], bev=0.0))
    done('weapon_linear', P, (0.64, 0.026))

# ------------------------------------------------------------------ Steve's gold Luger P08 (one of a pair)
def pivot(o, f, u, name):
    """re-origin a part at the (f, u) hinge so the game can animate it; returned as a separate exported node"""
    o.name = name; P = V(o); c = np.array(W(f, u)); setV(o, P - c); o.location = Vector(c); return o
def scroll(name, cx, cf, cu, r, turns, m, sx=1, a0=0.0, rr=0.00035):
    """engraved arabesque: a small raised spiral with a tail on the X = cx surface"""
    pts = []
    n = int(10 * turns) + 4
    for i in range(n):
        t = i / (n - 1); a = a0 + t * turns * 2 * math.pi; rad = r * (0.25 + 0.75 * t)
        pts.append(Vector((cx, -(cf + rad * math.cos(a)), cu + rad * math.sin(a) * sx)))
    return tube(name, pts, rr, m, res=2, bev_res=1)
def luger():
    M = mats(); P = []
    gold = mat('w_gold', (1.0, 0.74, 0.32), 0.22, 1.0, noise=0.15)
    gold2 = mat('w_gold_dark', (0.62, 0.42, 0.14), 0.35, 1.0)
    goldp = mat('w_gold_pol', (1.0, 0.8, 0.42), 0.12, 1.0)
    ivory = mat('w_ivory', (0.8, 0.75, 0.64), 0.4, 0.0, coat=0.5, noise=0.3)
    inlay = mat('w_ivory_ink', (0.32, 0.25, 0.16), 0.5, 0.0)
    M['ivory'] = ivory; M['blued'] = gold
    # ---- barrel: stepped shank, tapered tube, crowned muzzle, front sight on a dovetail base
    P.append(_wl('barrel', [(0.0001, 0.068), (0.0104, 0.068), (0.0104, 0.084), (0.0086, 0.088), (0.0074, 0.172), (0.0069, 0.1785), (0.0046, 0.1785), (0.0046, 0.172)], 0.024, gold, 0, 28))
    P.append(wcyl('bore', 0.0045, 0.17, 0.1788, 0.024, M['dark'], verts=16, bev=0))
    P.append(wcyl('bring', 0.0108, 0.076, 0.08, 0.024, goldp, verts=28, bev=0.0003))
    P.append(wbox('fsbase', 0.158, 0.172, 0.029, 0.0325, 0.006, gold, bev=0.0006))
    P.append(wprism('fsight', [(0.161, 0.032), (0.17, 0.032), (0.168, 0.0395), (0.1645, 0.0395)], 0.0022, goldp, bev=0.0004))
    # ---- barrel extension (receiver): fork with side walls the toggle sits between
    for sx in (1, -1):
        P.append(wprism('rwall', [(-0.052, 0.012), (0.068, 0.012), (0.068, 0.033), (0.04, 0.035), (-0.03, 0.036), (-0.052, 0.034)], 0.0032, gold, bev=0.0006, x=sx * 0.0086))
    P.append(wbox('rfloor', -0.052, 0.068, 0.012, 0.018, 0.0204, gold, bev=0.001))
    P.append(wbox('rring', 0.058, 0.068, 0.012, 0.036, 0.021, goldp, bev=0.0012))
    # ---- frame: forward frame under the extension, dished front, trigger guard, side plate
    P.append(wprism('frame', [(-0.058, -0.006), (0.052, -0.006), (0.064, 0.0), (0.07, 0.008), (0.07, 0.012), (-0.058, 0.014)], 0.0236, gold, bev=0.0016))
    P.append(tube('guard', [W(0.034, 0.0), W(0.03, -0.018), W(0.012, -0.03), W(-0.008, -0.03), W(-0.02, -0.022), W(-0.026, -0.006)], 0.0026, gold))
    P.append(tube('trig', [W(0.002, -0.004), W(0.008, -0.012), W(0.006, -0.022), W(0.001, -0.026)], 0.0024, goldp))
    P.append(wbox('sideplate', -0.026, 0.046, -0.002, 0.011, 0.0012, gold2, x=0.0124, bev=0.0003))
    P.append(cyl('tdlever', 0.0032, 0.003, (0.0128, -0.05, 0.004), goldp, rot=(0, math.pi / 2, 0), verts=14, bev=0.0004))
    P.append(wbox('safety', -0.054, -0.038, 0.005, 0.012, 0.0028, goldp, x=-0.0128, bev=0.0005))
    P.append(cyl('safeknob', 0.0026, 0.004, (-0.014, 0.052, 0.009), goldp, rot=(0, math.pi / 2, 0), verts=12, bev=0.0004))
    for f in (-0.03, 0.03): P.append(cyl('pin', 0.0016, 0.0254, (0, -f, 0.006), goldp, rot=(0, math.pi / 2, 0), verts=10))
    # ---- raked grip: frame straps, ivory panels with chequering inside a plain border, mag base + lanyard loop
    rk = math.tan(math.radians(36)); h = 0.1
    P.append(wprism('gripframe', [(-0.062, 0.002), (0.0, 0.002), (-0.006 - h * rk, -h), (-0.064 - h * rk, -h)], 0.0236, gold, bev=0.0022, seg=2))
    gp = [(-0.054, -0.008), (-0.01, -0.008), (-0.013 - 0.087 * rk, -0.094), (-0.056 - 0.087 * rk, -0.094)]
    for sx in (1, -1):
        P.append(wprism('grip', gp, 0.0045, ivory, bev=0.0014, seg=3, x=sx * 0.0128))
        for iu in range(22):
            u = -0.014 - iu * 0.0035
            fa = -0.051 + u * rk * 0.97; fb = -0.014 + u * rk * 0.97
            nf = int((fb - fa) / 0.0035)
            for jf in range(nf):
                f = fa + 0.002 + jf * 0.0035 + (0.00175 if iu % 2 else 0)
                if f > fb - 0.002: continue
                c = Vector((sx * 0.0152, -f, u))
                P.append(cyl('chq', 0.0013, 0.0008, tuple(c), ivory, rot=(0, math.pi / 2, math.pi / 4), verts=4, r2=0.0002))
        # dark-inlaid scroll on the upper panel (engraved ivory)
        P.append(scroll('iscroll', sx * 0.0151, -0.03 - 0.012 * rk, -0.012, 0.0045, 1.4, inlay, sx))
    P.append(wbox('magbase', -0.066 - h * rk, -0.004 - h * rk, -0.111, -h + 0.002, 0.0216, gold2, bev=0.002))
    P.append(cyl('magknob', 0.0042, 0.0236, (0, 0.035 + h * rk, -0.106), goldp, rot=(0, math.pi / 2, 0), verts=14, bev=0.0006))
    P.append(torus('lanyard', 0.0045, 0.0011, tuple(W(-0.064 - 0.085 * rk, -0.085, 0)), goldp, rot=(0, math.pi / 2, 0), maj=14, mnr=5))
    # ---- engraving: scrolls over the receiver walls, side plate and frame (raised arabesques)
    for sx in (1, -1):
        X = sx * 0.0103
        for k in range(9):                                   # vine of small alternating curls along the receiver wall
            cf = -0.046 + k * 0.0135; cu = 0.0255 + (0.003 if k % 2 else -0.003)
            P.append(scroll('escroll', X, cf, cu, 0.0034, 1.5, goldp, sx if k % 2 else -sx, a0=k * 1.7, rr=0.00028))
        P.append(tube('evine', [Vector((X, -(-0.05 + i * 0.0058), 0.0255 + 0.0032 * math.sin(i * 1.15))) for i in range(21)], 0.00026, goldp, res=2, bev_res=1))
        Xf = sx * (0.0132 if sx > 0 else 0.0120)
        for k in range(6):
            cf = -0.044 + k * 0.016; cu = 0.0045 + (0.0018 if k % 2 else -0.0018)
            P.append(scroll('fscroll', Xf, cf, cu, 0.0028, 1.4, goldp, -sx if k % 2 else sx, a0=2.3 * k, rr=0.00026))
        P.append(scroll('gscroll', sx * 0.0122, -0.05 - 0.05 * rk, -0.05, 0.0038, 1.0, goldp, sx))
    # ---- toggle-lock (separate animated nodes): rear link on the frame axle, front link, breech block
    R = (-0.062, 0.035); K = (-0.036, 0.040); B = (-0.004, 0.035)
    tr = [wprism('trl', [(R[0] - 0.004, R[1] - 0.004), (K[0], K[1] - 0.005), (K[0] + 0.002, K[1] + 0.005), (R[0] - 0.002, R[1] + 0.006)], 0.0136, gold, bev=0.0012)]
    tr.append(wprism('rsight', [(-0.062, 0.04), (-0.054, 0.042), (-0.055, 0.048), (-0.061, 0.047)], 0.006, goldp, bev=0.0005))
    for sx in (1, -1):
        tr.append(cyl('knob', 0.0088, 0.0072, (sx * 0.0112, -K[0], K[1]), goldp, rot=(0, math.pi / 2, 0), verts=24, bev=0.0008))
        for i in range(14):
            a = i * 2 * math.pi / 14
            tr.append(wbox('knurl', K[0] + 0.0089 * math.cos(a) - 0.0009, K[0] + 0.0089 * math.cos(a) + 0.0009, K[1] + 0.0089 * math.sin(a) - 0.0009, K[1] + 0.0089 * math.sin(a) + 0.0009, 0.0068, gold2, x=sx * 0.0112, bev=0.0003))
    tr.append(wcyl('axle', 0.0028, -0.002, 0.002, 0, goldp)) if False else None
    tr.append(cyl('axle', 0.0026, 0.0226, (0, -R[0], R[1]), goldp, rot=(0, math.pi / 2, 0), verts=12))
    tog_r = pivot(join(tr, 'tog_r'), R[0], R[1], 'toggle_r')
    tf = [wprism('tfl', [(K[0] - 0.002, K[1] - 0.004), (B[0], B[1] - 0.003), (B[0], B[1] + 0.003), (K[0], K[1] + 0.005)], 0.012, gold, bev=0.0012)]
    tf.append(cyl('kpin', 0.0024, 0.0146, (0, -K[0], K[1]), goldp, rot=(0, math.pi / 2, 0), verts=12))
    tog_f = pivot(join(tf, 'tog_f'), K[0], K[1], 'toggle_f')
    br = [wbox('breech', B[0] - 0.002, 0.056, 0.019, 0.0355, 0.0138, gold, bev=0.001)]
    br.append(wbox('extractor', 0.006, 0.05, 0.0355, 0.0375, 0.004, goldp, bev=0.0005))
    br.append(cyl('bpin', 0.0024, 0.0146, (0, -B[0], B[1]), goldp, rot=(0, math.pi / 2, 0), verts=12))
    brc = pivot(join(br, 'brc'), B[0], B[1], 'breech')
    done('weapon_luger', P, (0.18, 0.024), extra=[tog_r, tog_f, brc])

for k, fn in [('luger', luger), ('m3', m3), ('mp5', mp5), ('python', python), ('gl', gl), ('bowgun', bowgun), ('linear', linear)]:
    if ONLY and k not in ONLY: continue
    reset_hs(); fn()
print('weapons2 done')

