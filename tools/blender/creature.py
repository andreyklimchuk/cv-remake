"""B.O.W. creatures for the Rockfort exterior: Cerberus (zombie Doberman) and Bandersnatch.
   Organic bodies are 'sculpted' from metaball muscle masses (ellipsoids / capsules, negative balls for wounds),
   voxel-remeshed into a clean low mesh + a detailed high mesh (ribs, vertebrae, veins, striations) for the
   normal bake, rigged with auto weights, then textured with procedural texel-space shading (Cycles bakes).
   Run: CV=cerberus|bandersnatch TEXSIZE=2048 python3 tools/creature.py"""
import sys, os, json, time, math; sys.path.insert(0, '/data/assets_src/tools')
from lib import *
from bakekit import *
from texlib import *
from PIL import Image
import random
CV = os.environ.get('CV', 'cerberus'); Q = int(os.environ.get('TEXSIZE', '2048'))
T0 = time.time()
def log(*a): print('[%5.1fs]' % (time.time() - T0), CV, *a, flush=True)
TEXD = f'/data/assets_src/tex/{CV}'; os.makedirs(TEXD, exist_ok=True)
K = 1 / 0.575          # metaball radius → visible radius (threshold 0.6, stiffness 2)
reset()
mb = bpy.data.metaballs.new(CV + '_mb'); mb.resolution = 0.008 if CV == 'cerberus' else 0.012; mb.threshold = 0.6
mb.render_resolution = mb.resolution
mbo = bpy.data.objects.new(CV + '_mbo', mb); link(mbo)
def ell(c, sx, sy, sz, rot=(0, 0, 0), neg=False, stiff=2.0):
    e = mb.elements.new(type='ELLIPSOID'); e.co = c; r = max(sx, sy, sz); e.radius = r * K
    e.size_x, e.size_y, e.size_z = sx / r, sy / r, sz / r
    e.rotation = Euler(rot).to_quaternion(); e.use_negative = neg; e.stiffness = stiff
def ball(c, r, neg=False, stiff=2.0):
    e = mb.elements.new(type='BALL'); e.co = c; e.radius = r * K; e.use_negative = neg; e.stiffness = stiff
def cap(a, b, r, stiff=2.0):
    a, b = Vector(a), Vector(b); d = b - a
    e = mb.elements.new(type='CAPSULE'); e.co = (a + b) / 2; e.radius = r * K; e.size_x = d.length / 2
    e.rotation = Vector((1, 0, 0)).rotation_difference(d.normalized()); e.stiffness = stiff
def limb(a, b, r0, r1, n=3):
    a, b = Vector(a), Vector(b)
    for i in range(n):
        t0, t1 = i / n, (i + 1) / n; cap(a.lerp(b, t0), a.lerp(b, t1), r0 + (r1 - r0) * (t0 + t1) / 2)
from mathutils import Euler

BONES = []   # (name, head, tail, parent)
def bone(n, h, t, p=None): BONES.append((n, Vector(h), Vector(t), p))
WOUNDS = []  # (centre, radius) — used by both the dents and the texture
TEETH = []   # (base, dir, length, radius, bone)
EYES = []    # (centre, radius, bone)
CLAWS = []   # (base, dir, length, radius, bone)

if CV == 'cerberus':
    # ---------------- zombie Doberman, shoulder height ≈ 0.68 m, faces −Y
    ell((0, -0.16, 0.55), 0.115, 0.20, 0.165)                      # deep chest
    ell((0, -0.06, 0.60), 0.095, 0.14, 0.11)                       # ribs → loin
    cap((0, 0.02, 0.60), (0, 0.22, 0.61), 0.075)                   # tucked loin
    ell((0, 0.27, 0.60), 0.105, 0.12, 0.105)                       # croup
    for sx in (1, -1):
        ell((sx * 0.072, -0.22, 0.60), 0.04, 0.085, 0.12, (0.25, 0, 0))          # scapula
        ell((sx * 0.078, 0.26, 0.50), 0.05, 0.095, 0.115, (-0.2, 0, 0))          # hamstring / thigh mass
        limb((sx * 0.08, -0.19, 0.52), (sx * 0.08, -0.15, 0.33), 0.048, 0.034)    # humerus
        ell((sx * 0.08, -0.16, 0.40), 0.035, 0.05, 0.08)                          # triceps
        limb((sx * 0.08, -0.15, 0.33), (sx * 0.075, -0.18, 0.10), 0.032, 0.020)   # forearm
        limb((sx * 0.075, -0.18, 0.10), (sx * 0.075, -0.215, 0.03), 0.02, 0.019, 2)  # pastern
        ell((sx * 0.075, -0.235, 0.022), 0.028, 0.038, 0.02)                      # paw
        limb((sx * 0.085, 0.27, 0.53), (sx * 0.09, 0.19, 0.34), 0.06, 0.036)      # femur
        limb((sx * 0.09, 0.19, 0.34), (sx * 0.085, 0.33, 0.15), 0.034, 0.02)      # gaskin
        ell((sx * 0.088, 0.25, 0.28), 0.03, 0.05, 0.07, (0.6, 0, 0))              # calf
        limb((sx * 0.085, 0.33, 0.15), (sx * 0.08, 0.31, 0.03), 0.019, 0.018, 2)   # hock → paw
        ell((sx * 0.08, 0.295, 0.022), 0.027, 0.037, 0.02)
        ell((sx * 0.038, -0.47, 0.93), 0.011, 0.024, 0.05, (0.15, sx * 0.25, 0))  # cropped ears
        EYES.append(((sx * 0.036, -0.556, 0.872), 0.0105, 'head'))
        for t in range(6):
            u = t / 5
            TEETH.append(((sx * (0.031 - 0.012 * u), -0.585 - 0.1 * u, 0.808 - 0.006 * u), (0, -0.15, -1), 0.011 + (0.012 if t == 5 else 0), 0.0032 + (0.002 if t == 5 else 0), 'head'))
            TEETH.append(((sx * (0.026 - 0.01 * u), -0.585 - 0.085 * u, 0.778 - 0.006 * u), (0, -0.1, 1), 0.009 + (0.01 if t == 5 else 0), 0.0028 + (0.0016 if t == 5 else 0), 'jaw'))
        for k in range(4):
            a = (k - 1.5) * 0.35
            CLAWS.append(((sx * 0.075 + math.sin(a) * 0.02, -0.262, 0.016), (math.sin(a) * 0.3, -1, -0.6), 0.014, 0.004, ('l' if sx > 0 else 'r') + 'fPaw'))
            CLAWS.append(((sx * 0.08 + math.sin(a) * 0.02, 0.262, 0.016), (math.sin(a) * 0.3, -1, -0.6), 0.013, 0.004, ('l' if sx > 0 else 'r') + 'hFoot'))
    limb((0, -0.30, 0.64), (0, -0.44, 0.82), 0.072, 0.052)        # neck
    ell((0, -0.33, 0.70), 0.07, 0.07, 0.09, (0.7, 0, 0))           # neck muscle
    ell((0, -0.50, 0.865), 0.062, 0.085, 0.066)                    # skull
    limb((0, -0.54, 0.845), (0, -0.70, 0.808), 0.042, 0.03, 2)     # muzzle
    limb((0, -0.53, 0.795), (0, -0.68, 0.778), 0.03, 0.02, 2)      # lower jaw
    cap((0, 0.35, 0.64), (0, 0.43, 0.69), 0.022)                   # docked tail
    for c, r in (((0.11, 0.02, 0.56), 0.045), ((-0.1, -0.12, 0.47), 0.04), ((0.06, -0.38, 0.72), 0.035), ((-0.08, 0.24, 0.62), 0.04)):
        ball(c, r, neg=True); WOUNDS.append((Vector(c), r * 1.5))
    bone('hips', (0, 0.28, 0.60), (0, 0.04, 0.60)); bone('spine', (0, 0.04, 0.60), (0, -0.22, 0.63), 'hips')
    bone('neck', (0, -0.28, 0.66), (0, -0.44, 0.82), 'spine'); bone('head', (0, -0.46, 0.85), (0, -0.62, 0.85), 'neck')
    bone('jaw', (0, -0.50, 0.80), (0, -0.68, 0.777), 'head'); bone('tail', (0, 0.35, 0.64), (0, 0.43, 0.69), 'hips')
    for s, sx in (('l', 1), ('r', -1)):
        bone(s + 'fUpper', (sx * 0.08, -0.20, 0.53), (sx * 0.08, -0.15, 0.33), 'spine')
        bone(s + 'fLower', (sx * 0.08, -0.15, 0.33), (sx * 0.075, -0.18, 0.10), s + 'fUpper')
        bone(s + 'fPaw', (sx * 0.075, -0.18, 0.10), (sx * 0.075, -0.235, 0.025), s + 'fLower')
        bone(s + 'fToe', (sx * 0.075, -0.235, 0.025), (sx * 0.075, -0.26, 0.02), s + 'fPaw')
        bone(s + 'hUpper', (sx * 0.085, 0.27, 0.55), (sx * 0.09, 0.19, 0.34), 'hips')
        bone(s + 'hLower', (sx * 0.09, 0.19, 0.34), (sx * 0.085, 0.33, 0.15), s + 'hUpper')
        bone(s + 'hFoot', (sx * 0.085, 0.33, 0.15), (sx * 0.08, 0.295, 0.025), s + 'hLower')
        bone(s + 'hToe', (sx * 0.08, 0.295, 0.025), (sx * 0.08, 0.27, 0.02), s + 'hFoot')
    LOW_VOX, HIGH_VOX, TARGET = 0.011, 0.0042, 11000
else:
    # ---------------- Bandersnatch (CV reference): ≈2.9 m, hunched, a colossal right shoulder towering over the
    # small skull-like head, one huge lumpy right arm that drags its club hand on the floor, a withered thin left arm,
    # long sinewy legs; ochre-yellow wet skin with orange-red marbling (see bander_shade)
    ell((0, 0.03, 1.25), 0.2, 0.14, 0.13)                                  # pelvis
    limb((0, 0.03, 1.32), (0, -0.03, 1.72), 0.14, 0.16)                    # thin waist / abdomen
    ell((-0.06, -0.05, 1.96), 0.29, 0.19, 0.25, (0.35, 0, 0))              # chest (hunched, heavier on the right)
    ell((-0.34, -0.03, 2.30), 0.26, 0.23, 0.30)                            # colossal right shoulder mound
    ell((-0.17, 0.03, 2.38), 0.21, 0.16, 0.18)                             # trapezius ridge up to the mound
    ball((-0.50, -0.07, 2.20), 0.17); ball((-0.42, 0.06, 2.42), 0.12); ball((-0.28, -0.16, 2.42), 0.1)
    ell((-0.16, -0.15, 2.02), 0.14, 0.09, 0.12, (0.3, 0, 0))               # right pectoral mass
    ell((0.24, -0.04, 2.06), 0.1, 0.1, 0.1)                                # small left shoulder
    limb((0, -0.08, 2.12), (0.01, -0.25, 2.23), 0.095, 0.085, 2)           # short neck, head thrust forward
    ell((0.02, -0.33, 2.28), 0.10, 0.115, 0.125)                           # skull
    ell((0.02, -0.425, 2.335), 0.09, 0.035, 0.03)                          # brow ridge
    for sx in (1, -1):
        ball((0.02 + sx * 0.058, -0.425, 2.25), 0.03)                      # cheekbones
        ball((0.02 + sx * 0.038, -0.45, 2.297), 0.027, neg=True)           # deep eye sockets
        EYES.append(((0.02 + sx * 0.038, -0.428, 2.297), 0.0125, 'head'))
    ball((0.02, -0.468, 2.255), 0.017, neg=True)                           # nasal cavity
    ell((0.02, -0.415, 2.175), 0.075, 0.06, 0.045, (0.3, 0, 0))            # jaw
    for k in range(6):                                                     # tendons / veins over skull and neck
        a_ = (k - 2.5) * 0.35
        limb((0.02 + math.sin(a_) * 0.09, -0.30 + math.cos(a_) * 0.02, 2.38), (0.02 + math.sin(a_) * 0.11, -0.2, 2.16), 0.014, 0.012, 2)
    for i in range(12):                                                    # lipless grin
        a_ = (i - 5.5) / 5.5 * 1.1
        TEETH.append(((0.02 + math.sin(a_) * 0.062, -0.40 - math.cos(a_) * 0.07, 2.205), (0, -0.2, -1), 0.026, 0.007, 'head'))
        TEETH.append(((0.02 + math.sin(a_) * 0.057, -0.40 - math.cos(a_) * 0.063, 2.172), (0, -0.2, 1), 0.022, 0.0065, 'jaw'))
    # right arm: thick upper arm, very long lumpy forearm, club hand resting on the floor
    limb((-0.50, -0.06, 2.14), (-0.62, -0.14, 1.40), 0.17, 0.14)
    ell((-0.55, -0.18, 1.80), 0.12, 0.12, 0.24, (0.1, 0.1, 0))             # biceps
    ell((-0.63, 0.0, 1.78), 0.1, 0.1, 0.22)                                # triceps
    limb((-0.62, -0.14, 1.40), (-0.60, -0.30, 0.34), 0.15, 0.13)
    for k in range(7):                                                     # bulbous growths along the forearm
        t_ = (k + 0.5) / 7; c_ = Vector((-0.62, -0.14, 1.40)).lerp(Vector((-0.60, -0.30, 0.34)), t_)
        ang = k * 2.1; off = Vector((math.cos(ang) * 0.09, math.sin(ang) * 0.07, 0))
        ball(tuple(c_ + off), 0.1 + 0.03 * math.sin(k * 1.7))
    ell((-0.60, -0.33, 0.20), 0.13, 0.14, 0.13)                            # club palm
    for k in range(4):                                                     # thick curled fingers, knuckles on the ground
        fx = -0.60 + (k - 1.5) * 0.06
        limb((fx, -0.38, 0.18), (fx, -0.45, 0.07), 0.04, 0.035, 2)
        limb((fx, -0.45, 0.07), (fx, -0.40, 0.035), 0.033, 0.028, 1)
        CLAWS.append(((fx, -0.39, 0.03), (0, 0.6, -0.4), 0.06, 0.014, 'rHand'))
    limb((-0.52, -0.38, 0.24), (-0.50, -0.46, 0.14), 0.04, 0.03, 2)        # thumb
    # withered left arm
    limb((0.28, -0.04, 2.04), (0.36, -0.03, 1.62), 0.062, 0.05)
    limb((0.36, -0.03, 1.62), (0.35, -0.12, 1.24), 0.045, 0.034)
    ell((0.35, -0.14, 1.19), 0.03, 0.04, 0.05)
    for k in range(3):
        limb((0.35 + (k - 1) * 0.018, -0.15, 1.15), (0.35 + (k - 1) * 0.02, -0.17, 1.07), 0.012, 0.009, 1)
    # long sinewy legs, three-toed feet
    for sx in (1, -1):
        limb((sx * 0.2, 0.02, 1.2), (sx * 0.24, -0.10, 0.66), 0.11, 0.075)
        ell((sx * 0.21, 0.0, 0.98), 0.085, 0.095, 0.2)                     # lean thigh muscle
        ball((sx * 0.24, -0.13, 0.66), 0.07)                               # knee
        limb((sx * 0.24, -0.10, 0.66), (sx * 0.25, 0.04, 0.12), 0.065, 0.045)
        ell((sx * 0.245, 0.03, 0.44), 0.055, 0.065, 0.14)                  # calf
        ball((sx * 0.25, 0.05, 0.1), 0.05)
        for k in range(3):
            tx = sx * 0.25 + (k - 1) * 0.05
            limb((sx * 0.25, 0.0, 0.07), (tx, -0.22, 0.035), 0.035, 0.025, 2)
            CLAWS.append(((tx, -0.23, 0.03), (0, -1, -0.3), 0.04, 0.01, sx > 0 and 'lFoot' or 'rFoot'))
    for i in range(10):                                                    # spinal knobs along the hunched back
        t_ = i / 9; ball((0.0 - 0.06 * t_, 0.12 + 0.06 * math.sin(t_ * 2.5), 1.38 + 0.95 * t_), 0.035 + 0.01 * math.sin(i))
    for c, r in (((0.1, -0.14, 1.45), 0.06), ((-0.14, 0.14, 1.75), 0.06), ((0.27, -0.03, 1.9), 0.05)):
        ball(c, r, neg=True); WOUNDS.append((Vector(c), r * 1.5))
    bone('hips', (0, 0.03, 1.22), (0, 0.0, 1.62)); bone('spine', (0, 0.0, 1.62), (0, -0.05, 2.15), 'hips')
    bone('neck', (0, -0.08, 2.13), (0.01, -0.25, 2.23), 'spine'); bone('head', (0.01, -0.27, 2.24), (0.02, -0.36, 2.45), 'neck')
    bone('jaw', (0.02, -0.33, 2.21), (0.02, -0.46, 2.15), 'head')
    bone('rUpperArm', (-0.50, -0.06, 2.14), (-0.62, -0.14, 1.40), 'spine'); bone('rForearm', (-0.62, -0.14, 1.40), (-0.60, -0.30, 0.34), 'rUpperArm')
    bone('rHand', (-0.60, -0.30, 0.34), (-0.60, -0.36, 0.06), 'rForearm'); bone('rHandTip', (-0.60, -0.36, 0.06), (-0.60, -0.40, 0.0), 'rHand')
    bone('lStump', (0.28, -0.04, 2.04), (0.36, -0.03, 1.62), 'spine'); bone('lStumpFore', (0.36, -0.03, 1.62), (0.35, -0.13, 1.18), 'lStump')
    for s, sx in (('l', 1), ('r', -1)):
        bone(s + 'Thigh', (sx * 0.2, 0.02, 1.2), (sx * 0.24, -0.10, 0.66), 'hips')
        bone(s + 'Shin', (sx * 0.24, -0.10, 0.66), (sx * 0.25, 0.04, 0.12), s + 'Thigh')
        bone(s + 'Foot', (sx * 0.25, 0.04, 0.10), (sx * 0.25, -0.20, 0.03), s + 'Shin')
    LOW_VOX, HIGH_VOX, TARGET = 0.016, 0.0065, 22000

# ============================================================ mesh from metaballs
bpy.context.view_layer.objects.active = mbo; mbo.select_set(True); bpy.context.view_layer.update()
with ctx(mbo): bpy.ops.object.convert(target='MESH')
base = bpy.context.view_layer.objects.active; base.name = CV + '_base'
log('metaball mesh', len(base.data.vertices))
smooth_verts(base, 4, 0.5)
def remesh(o, vox):
    m = o.modifiers.new('rm', 'REMESH'); m.mode = 'VOXEL'; m.voxel_size = vox; apply_modifier(o, 'rm')
high = dup(base, CV + '_high'); remesh(high, HIGH_VOX); smooth_verts(high, 3, 0.5)
low = dup(base, CV + '_body'); remesh(low, LOW_VOX); smooth_verts(low, 3, 0.5)
bpy.data.objects.remove(base)

# ---- high detail sculpt (numpy displacement along normals)
P = V(high); Nn = N(high); x, y, z = P[:, 0], P[:, 1], P[:, 2]
def wound_mask(P):
    m = np.zeros(len(P), np.float32)
    for c, r in WOUNDS:
        d = np.linalg.norm(P - np.array(c), axis=1) / r
        m = np.maximum(m, 1 - ss(0.65, 1.0, d + 0.25 * fbm(P, 2, scale=30.0)))
    return m
wm = wound_mask(P)
disp = 0.0006 * fbm(P, 3, scale=60.0)
if CV == 'cerberus':
    rib = (np.abs(x) > 0.05) & (y > -0.30) & (y < 0.06) & (z > 0.42) & (z < 0.68)
    ribs = ss(0.55, 0.95, np.abs(np.sin((y - 0.35 * (0.62 - z) + 0.01 * np.sin(z * 30)) * 2 * math.pi / 0.05))) * rib * ss(0.66, 0.6, z)
    disp += 0.0035 * ribs * (0.25 + 0.75 * wm)
    top = (np.abs(x) < 0.03) & (Nn[:, 2] > 0.6) & (y > -0.25) & (y < 0.34)
    disp += 0.004 * top * ss(0.3, 0.9, np.abs(np.sin(y * 2 * math.pi / 0.038)))
    fur = perlin(np.stack([x * 900, y * 160, z * 900], 1))
    disp += 0.00025 * fur * (1 - wm)
    neckw = np.exp(-((y + 0.36) / 0.06) ** 2) * (z < 0.75)
    disp += 0.0015 * neckw * np.sin(z * 2 * math.pi / 0.02)
else:
    veins = 1 - ss(0.0, 0.05, np.abs(fbm(P * np.array([1, 1, 0.35]), 3, scale=9.0)))
    disp += 0.0018 * veins * (1 - wm)
    wr = np.abs(perlin(P * np.array([40, 40, 160])))
    disp -= 0.0012 * (1 - ss(0.0, 0.12, wr))
    abs_ = (y < -0.1) & (z > 1.36) & (z < 1.74) & (np.abs(x) < 0.12)
    disp -= 0.004 * abs_ * (1 - ss(0.0, 0.25, np.abs(np.sin(z * 2 * math.pi / 0.11)))) - 0.003 * abs_ * (np.abs(x) < 0.012)
disp += 0.004 * wm * fbm(P, 3, scale=120.0) - 0.004 * wm
setV(high, P + Nn * disp[:, None])

# ---- teeth / eyes / claws (separate shells, rigid-weighted; material slots: 0 body, 1 bone/teeth, 2 eye)
def cone(base_, dir_, length, r, name):
    d = Vector(dir_).normalized()
    bpy.ops.mesh.primitive_cone_add(vertices=8, radius1=r, radius2=r * 0.12, depth=length)
    o = bpy.context.active_object; o.name = name
    o.rotation_euler = Vector((0, 0, 1)).rotation_difference(d).to_euler(); o.location = Vector(base_) + d * length * 0.45
    apply_transform(o); return o
extras = []
def add_part(o, slot, bone_):
    while len(o.data.materials): o.data.materials.pop()
    for i in range(3): o.data.materials.append(bpy.data.materials.get('slot%d' % i) or bpy.data.materials.new('slot%d' % i))
    for p in o.data.polygons: p.material_index = slot
    rigid_weight(o, bone_); extras.append(o)
for b_, d_, L_, r_, bn in TEETH: add_part(cone(b_, d_, L_, r_, 'tooth'), 1, bn)
for b_, d_, L_, r_, bn in CLAWS: add_part(cone(b_, d_, L_, r_, 'claw'), 1, bn)
for c, r, bn in EYES:
    bpy.ops.mesh.primitive_uv_sphere_add(segments=16, ring_count=10, radius=r, location=c); e = bpy.context.active_object; e.name = 'eye'
    add_part(e, 2, bn)
hx = [dup(o, o.name + '_h') for o in extras]
for o in hx:
    for g in list(o.vertex_groups): o.vertex_groups.remove(g)
high = join([high] + hx, CV + '_high'); high.hide_render = True

# ============================================================ rig + weights
ad = bpy.data.armatures.new(CV + '_rig'); rig = bpy.data.objects.new(CV + '_rig', ad); link(rig)
select_only([rig], rig); bpy.ops.object.mode_set(mode='EDIT'); eb = ad.edit_bones
for n_, h_, t_, p_ in BONES:
    b = eb.new(n_); b.head = h_; b.tail = t_
    if p_: b.parent = eb[p_]
bpy.ops.object.mode_set(mode='OBJECT')
decimate(low, min(1.0, TARGET / max(1, tri_count(low))))
while len(low.data.materials): low.data.materials.pop()
for i in range(3): low.data.materials.append(bpy.data.materials.get('slot%d' % i) or bpy.data.materials.new('slot%d' % i))
for p in low.data.polygons: p.material_index = 0
select_only([low, rig], rig)
with ctx(rig, [low, rig]): bpy.ops.object.parent_set(type='ARMATURE_AUTO')
for m in list(low.modifiers): low.modifiers.remove(m)
low.parent = None
body = join([low] + extras, CV + '_body')
shade_smooth(body)
log('rigged', tri_count(body), 'tris; high', tri_count(high))

# ============================================================ UV + bake
while len(body.data.uv_layers): body.data.uv_layers.remove(body.data.uv_layers[0])
body.data.uv_layers.new(name='UVMap'); smart_uv(body, 62, 0.003); pack_uv(body); pack_only(body, 0.003)
bm_ = bmesh.new(); bm_.from_mesh(body.data); bmesh.ops.triangulate(bm_, faces=bm_.faces[:]); bm_.to_mesh(body.data); bm_.free()

def cerberus_shade(P, Nn, ids):
    n = len(P); x, y, z = P[:, 0], P[:, 1], P[:, 2]
    lo = fbm(P, 3, scale=7.0); mid = fbm(P, 3, scale=40.0); hi = fbm(P, 2, scale=300.0)
    black = np.array([0.022, 0.019, 0.018]); tan = np.array([0.20, 0.085, 0.03])
    # Doberman black & tan points: muzzle, brows, chest, lower legs, under the tail
    tanm = np.clip(ss(0.84, 0.80, z) * (y < -0.52) + ss(0.86, 0.84, z) * ss(-0.47, -0.52, y) * (np.abs(x) < 0.05)
                   + np.exp(-(((np.abs(x) - 0.035) / 0.012) ** 2 + ((y + 0.545) / 0.012) ** 2 + ((z - 0.893) / 0.01) ** 2))
                   + ss(0.18, 0.11, z) + np.exp(-((y + 0.3) / 0.05) ** 2) * ss(0.56, 0.5, z) * (np.abs(x) < 0.07), 0, 1)
    col = mix3(black[None, :] * (1 + 0.25 * mid[:, None]), tan * (1 + 0.3 * mid[:, None]), tanm * 0.9)
    fur = 0.5 + 0.5 * perlin(np.stack([x * 1400, y * 220, z * 1400], 1))
    col = col * (0.8 + 0.4 * fur[:, None])
    # mange: hairless grey-pink rotting skin patches
    mange = ss(0.35, 0.75, fbm(P, 4, scale=9.0) + 0.35 * fbm(P, 2, scale=45.0)) * (z > 0.14)
    skin = np.array([0.11, 0.075, 0.07]) * (1 + 0.35 * mid[:, None]); skin = mix3(skin, np.array([0.17, 0.10, 0.09]), ss(0.2, 0.8, hi) * 0.5)
    col = mix3(col, skin, mange * 0.75)
    scab = ss(0.55, 0.8, fbm(P, 3, scale=55.0)) * mange
    col = mix3(col, np.array([0.08, 0.02, 0.012]), scab * 0.6)
    wm = wound_mask(P)
    flesh = mix3(np.array([0.22, 0.025, 0.02]), np.array([0.07, 0.006, 0.006]), ss(-0.2, 0.5, fbm(P, 3, scale=90.0)))
    rib = (np.abs(x) > 0.05) & (y > -0.30) & (y < 0.06) & (z > 0.42) & (z < 0.68)
    ribs = ss(0.6, 0.95, np.abs(np.sin((y - 0.35 * (0.62 - z) + 0.01 * np.sin(z * 30)) * 2 * math.pi / 0.05))) * rib
    flesh = mix3(flesh, np.array([0.55, 0.47, 0.36]), ribs * 0.85)
    edge = ss(0.2, 0.5, wm) * (1 - ss(0.5, 0.8, wm))
    col = mix3(col, np.array([0.45, 0.34, 0.12]), edge * 0.5)       # fatty yellow rim
    col = mix3(col, flesh, ss(0.45, 0.7, wm))
    # gore around the mouth and dripping down the chest
    mouth = np.exp(-((y + 0.62) / 0.06) ** 2) * ss(0.85, 0.78, z) * (np.abs(x) < 0.05)
    drip = (np.abs(np.sin(x * 140 + lo * 3)) > 0.7) * np.exp(-((y + 0.42) / 0.12) ** 2) * ss(0.78, 0.5, z) * (y < -0.3)
    gore = np.clip(mouth + drip * 0.7 + ss(0.3, 0.9, fbm(P, 3, scale=18.0)) * 0.25, 0, 1)
    col = mix3(col, np.array([0.12, 0.012, 0.01]), gore * 0.75)
    rough = 0.72 - 0.25 * mange * 0.4 - 0.45 * ss(0.45, 0.7, wm) - 0.35 * gore
    h = 0.00004 * fur * (1 - mange) - 0.00006 * ss(0.45, 0.7, wm) * fbm(P, 2, scale=900.0)
    metal = np.zeros(n, np.float32)
    tm = ids == 1
    if np.any(tm):
        col[tm] = mix3(np.array([0.62, 0.55, 0.40]), np.array([0.30, 0.18, 0.08]), ss(0.0, 0.9, fbm(P, 2, scale=400.0)) * 0.6)[tm]
        col[tm] = mix3(col, np.array([0.25, 0.03, 0.02]), ss(0.2, 0.9, fbm(P, 2, scale=150.0)) * 0.5)[tm]; rough[tm] = 0.35
    em = ids == 2
    if np.any(em):
        col[em] = np.array([0.55, 0.52, 0.42]) * (0.85 + 0.3 * hi[em, None]); rough[em] = 0.08
    return col, np.clip(rough, 0.06, 1), metal, h

def bander_shade(P, Nn, ids):
    n = len(P); x, y, z = P[:, 0], P[:, 1], P[:, 2]
    lo = fbm(P, 3, scale=5.0); mid = fbm(P, 3, scale=30.0); hi = fbm(P, 2, scale=260.0)
    # ochre-yellow skin, paler on raised masses, orange-red marbling along the veins, brown in the creases
    base = np.array([0.60, 0.40, 0.11]) * (1 + 0.14 * lo[:, None] + 0.07 * mid[:, None])
    col = mix3(base, np.array([0.76, 0.60, 0.24]), ss(0.15, 0.8, mid) * 0.45)
    veins = 1 - ss(0.0, 0.06, np.abs(fbm(P * np.array([1, 1, 0.35]), 3, scale=9.0)))
    fine = 1 - ss(0.0, 0.04, np.abs(fbm(P * np.array([1, 1, 0.5]), 3, scale=26.0)))
    col = mix3(col, np.array([0.55, 0.14, 0.03]), veins * 0.75)
    col = mix3(col, np.array([0.62, 0.24, 0.05]), fine * 0.45)
    marb = ss(0.2, 0.75, fbm(P, 3, scale=3.5))
    col = mix3(col, np.array([0.50, 0.22, 0.06]), marb * 0.45)
    crease = ss(0.0, 0.35, -Nn[:, 2]) * 0.0 + ss(0.15, 0.6, np.abs(fbm(P, 2, scale=55.0))) * 0.0
    wm = wound_mask(P)
    flesh = mix3(np.array([0.36, 0.05, 0.03]), np.array([0.12, 0.012, 0.008]), ss(-0.2, 0.5, fbm(P, 3, scale=70.0)))
    col = mix3(col, np.array([0.35, 0.14, 0.05]), (ss(0.2, 0.5, wm) * (1 - ss(0.5, 0.8, wm))) * 0.6)
    col = mix3(col, flesh, ss(0.45, 0.7, wm))
    # face: darker sunken sockets, gums
    head = (z > 2.12) & (y < -0.28)
    gums = np.exp(-((z - 2.19) / 0.03) ** 2) * (y < -0.42) * (np.abs(x - 0.02) < 0.08)
    col = mix3(col, np.array([0.38, 0.07, 0.04]), gums * 0.9)
    sock = head * np.exp(-((z - 2.297) / 0.03) ** 2) * np.exp(-((np.abs(x - 0.02) - 0.038) / 0.03) ** 2)
    col = mix3(col, np.array([0.16, 0.06, 0.02]), np.clip(sock, 0, 1) * 0.8)
    knuck = ss(0.3, 0.05, z) * (x < -0.45)
    col = mix3(col, col * np.array([0.62, 0.5, 0.42]), knuck * 0.6)
    blood = ss(0.45, 0.95, fbm(P, 3, scale=12.0)) * (0.3 + 0.7 * (x < -0.3))
    col = mix3(col, np.array([0.2, 0.025, 0.015]), blood * 0.4)
    rough = 0.34 + 0.1 * mid - 0.25 * ss(0.45, 0.7, wm) - 0.15 * gums - 0.12 * veins
    h = -0.00003 * (1 - ss(0.0, 0.3, worley(P, 1600.0)[0])) + 0.00007 * veins + 0.00003 * fine
    metal = np.zeros(n, np.float32)
    tm = ids == 1
    if np.any(tm):
        col[tm] = mix3(np.array([0.62, 0.55, 0.36]), np.array([0.3, 0.17, 0.06]), ss(0.0, 0.9, fbm(P, 2, scale=300.0)) * 0.7)[tm]; rough[tm] = 0.3
    em = ids == 2
    if np.any(em):
        col[em] = np.array([0.7, 0.62, 0.42]) * (0.9 + 0.2 * hi[em, None]); rough[em] = 0.05
    return col, np.clip(rough, 0.06, 1), metal, h

def build_set(o, name, size, shade, high_obj, ao_size=1024, ao_dist=0.08, extrusion=0.006, ray=0.02, bump=1.0):
    log(name, 'bake maps...')
    pos = bake_emit(o, size, 'pos'); nrm = bake_emit(o, size, 'nrm'); cov, P, Nn = decode(pos, nrm)
    idmap = bake_emit(o, size, 'id')
    Pc, Nc = P[cov], Nn[cov]
    idc = (np.round(idmap[..., 0][cov] * 64) - 1).astype(int)
    col, rough, metal, h = shade(Pc, Nc, idc)
    def full(v, ch):
        a = np.zeros((size, size, ch) if ch > 1 else (size, size), np.float32); a[cov] = v; return a
    ao = bake_ao(o, ao_size, 24, ao_dist)
    if ao_size != size: ao = np.array(Image.fromarray((ao * 255).astype(np.uint8)).resize((size, size), Image.BILINEAR), np.float32) / 255.0
    albedo = finish(full(col, 3) * (0.5 + 0.5 * ao[..., None]), cov)
    orm = np.stack([ao, finish(full(rough, 1), cov), finish(full(metal, 1), cov)], -1)
    gn = bake_normal_from_high(o, high_obj, size, extrusion, ray)[..., :3]
    _n = gn * 2 - 1; _inv = _n[..., 2] < -0.35; _n[_inv] = -_n[_inv]; gn = (_n + 1) * 0.5
    _bad = (_n[..., 2] < 0.35) | ~np.isfinite(_n).all(-1); gn[_bad] = (0.5, 0.5, 1.0)
    nf = bake_combined_normal(o, gn, finish(full(h, 1), cov), size, bump)[..., :3]
    _n = nf * 2 - 1; nf = nf.copy(); nf[_n[..., 2] < 0.2] = (0.5, 0.5, 1.0)
    save_rgb(albedo, f'{TEXD}/{name}_albedo.jpg', 90); save_rgb(nf, f'{TEXD}/{name}_normal.jpg', 92, srgb=False)
    Image.fromarray((np.clip(orm[::-1], 0, 1) * 255).astype(np.uint8)).resize((size // 2, size // 2), Image.LANCZOS).save(f'{TEXD}/{name}_orm.jpg', quality=90)
    log(name, 'saved')
for o in bpy.data.objects:
    if o.type == 'MESH': o.hide_render = True
body.hide_render = False
sz = 1.0 if CV == 'cerberus' else 2.9
build_set(body, CV, Q, cerberus_shade if CV == 'cerberus' else bander_shade, high, 1024, 0.06 * sz, 0.006 * sz, 0.016 * sz)

# ============================================================ export
def load(p, noncolor=False):
    im = bpy.data.images.load(p, check_existing=False)
    if noncolor: im.colorspace_settings.name = 'Non-Color'
    return im
mat_ = export_material(CV, load(f'{TEXD}/{CV}_albedo.jpg'), load(f'{TEXD}/{CV}_normal.jpg', True), load(f'{TEXD}/{CV}_orm.jpg', True))
while len(body.data.materials): body.data.materials.pop()
body.data.materials.append(mat_)
for p in body.data.polygons: p.material_index = 0
mm = body.modifiers.new('rig', 'ARMATURE'); mm.object = rig; body.parent = rig; normalize_limit(body)
keep = {body.name, rig.name}
for o in list(bpy.data.objects):
    if o.name not in keep: bpy.data.objects.remove(o)
bpy.context.view_layer.update()
export_glb(f'{OUT_GLB}/enemy_{CV}.glb', [rig, body])
save_blend(f'{OUT_BLEND}/enemy_{CV}.blend')
log('DONE', tri_count(body))

