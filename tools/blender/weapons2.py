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
def done(name, parts, muzzle):
    o = join([p for p in parts if p is not None], name)
    try:
        wn = o.modifiers.new('wn', 'WEIGHTED_NORMAL'); wn.keep_sharp = True; apply_modifier(o, 'wn')
    except Exception: pass
    e = bpy.data.objects.new('muzzle', None); link(e); e.location = W(*muzzle); e.parent = o
    print(name, 'tris', tri_count(o))
    export_glb(f'{OUT_GLB}/{name}.glb', [o, e], {'export_tangents': False})
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
def luger():
    M = mats(); P = []
    gold = mat('w_gold', (1.0, 0.74, 0.32), 0.22, 1.0, noise=0.15)
    gold2 = mat('w_gold_dark', (0.62, 0.42, 0.14), 0.35, 1.0)
    ivory = mat('w_ivory', (0.86, 0.84, 0.78), 0.38, 0.0, coat=0.5, noise=0.25)
    M['ivory'] = ivory; M['blued'] = gold
    # barrel + front sight + muzzle crown
    P.append(wcyl('barrel', 0.0082, 0.07, 0.178, 0.024, gold, verts=24, r2=0.0072))
    P.append(wcyl('bore', 0.0045, 0.177, 0.1795, 0.024, M['dark'], verts=16, bev=0))
    P.append(wprism('fsight', [(0.162, 0.03), (0.172, 0.03), (0.17, 0.038), (0.165, 0.038)], 0.0035, gold, bev=0.0006))
    P.append(wcyl('bring', 0.0105, 0.068, 0.078, 0.024, gold2, verts=24))
    # receiver / barrel extension + frame
    P.append(wprism('receiver', [(-0.045, 0.012), (0.07, 0.012), (0.07, 0.034), (0.0, 0.036), (-0.045, 0.036)], 0.021, gold, bev=0.0015))
    P.append(wprism('frame', [(-0.04, -0.006), (0.07, -0.006), (0.075, 0.012), (-0.045, 0.014)], 0.024, gold, bev=0.0018))
    # toggle-lock: links + knurled knobs
    P.append(wbox('toggle1', -0.04, -0.005, 0.034, 0.045, 0.014, gold, bev=0.0012))
    P.append(wbox('toggle2', -0.062, -0.04, 0.036, 0.047, 0.014, gold, bev=0.0012))
    for sx in (1, -1):
        P.append(cyl('knob', 0.0085, 0.008, (sx * 0.011, 0.04, 0.043), gold2, rot=(0, math.pi / 2, 0), verts=20, bev=0.0008))
        for i in range(8):
            a = i * math.pi / 4
            P.append(wbox('knurl', -0.04 + 0.0086 * math.cos(a) - 0.0012, -0.04 + 0.0086 * math.cos(a) + 0.0012, 0.043 + 0.0086 * math.sin(a) - 0.0012, 0.043 + 0.0086 * math.sin(a) + 0.0012, 0.009, gold, x=sx * 0.011, bev=0.0003))
    P.append(wprism('rsight', [(-0.064, 0.044), (-0.054, 0.044), (-0.055, 0.052), (-0.063, 0.052)], 0.008, gold, bev=0.0006))
    # raked grip with white engraved grips + gold frame strap
    rk = math.tan(math.radians(36)); h = 0.1
    P.append(wprism('gripframe', [(-0.06, 0.002), (0.0, 0.002), (-0.006 - h * rk, -h), (-0.062 - h * rk, -h)], 0.024, gold, bev=0.002, seg=2))
    P.append(wprism('grips', [(-0.054, -0.008), (-0.01, -0.008), (-0.013 - 0.087 * rk, -0.094), (-0.056 - 0.087 * rk, -0.094)], 0.031, ivory, bev=0.003, seg=3))
    P.append(wbox('magbase', -0.064 - h * rk, -0.004 - h * rk, -0.11, -h + 0.002, 0.022, gold2, bev=0.002))
    P.append(wcyl('lanyard', 0.003, -0.056 - h * rk, -0.05 - h * rk, -0.098, gold2, verts=10)) if False else None
    # side plate + safety lever + engraving bosses
    for sx in (1, -1): P.append(wbox('sideplate', -0.03, 0.05, 0.0, 0.01, 0.002, gold2, x=sx * 0.0125, bev=0.0004))
    P.append(wbox('safety', -0.05, -0.038, 0.004, 0.012, 0.004, gold2, x=-0.014, bev=0.0006))
    trigger(M, P, f=0.002, u=-0.004)
    done('weapon_luger', P, (0.18, 0.024))

for k, fn in [('luger', luger), ('m3', m3), ('mp5', mp5), ('python', python), ('gl', gl), ('bowgun', bowgun), ('linear', linear)]:
    if ONLY and k not in ONLY: continue
    reset_hs(); fn()
print('weapons2 done')

