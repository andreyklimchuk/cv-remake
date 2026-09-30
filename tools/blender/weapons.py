"""Hard-surface weapons built procedurally in Blender: M9F-style pistol and a combat knife.
   Game frame: +Z barrel (Blender -Y), +Y up (Blender +Z); origin = shooting-hand grip point."""
import sys, math; sys.path.insert(0, '/data/assets_src/tools')
from lib import *
def B(f, u, x=0.0): return Vector((x, -f, u))
def mat(name, col, rough, metal, coat=0.0):
    m, nt, out = node_mat(name)
    b = nt.nodes.new('ShaderNodeBsdfPrincipled'); nt.links.new(b.outputs[0], out.inputs[0])
    b.inputs['Base Color'].default_value = (*col, 1); b.inputs['Roughness'].default_value = rough; b.inputs['Metallic'].default_value = metal
    if coat: b.inputs['Coat Weight'].default_value = coat
    return m
def prism(name, pts, width, m, bevel=0.0008, x=0.0, seg=2):
    x0 = x
    bm = bmesh.new()
    top = [bm.verts.new(B(f, u, x0 + width / 2)) for f, u in pts]
    bot = [bm.verts.new(B(f, u, x0 - width / 2)) for f, u in pts]
    n = len(pts)
    bm.faces.new(top); bm.faces.new(list(reversed(bot)))
    for i in range(n):
        j = (i + 1) % n; bm.faces.new([top[i], bot[i], bot[j], top[j]])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me); link(o); o.data.materials.append(m)
    if bevel > 0:
        bv = o.modifiers.new('bv', 'BEVEL'); bv.width = bevel; bv.segments = seg; bv.limit_method = 'ANGLE'; bv.angle_limit = math.radians(30)
        apply_modifier(o, 'bv')
    shade_smooth(o, 35)
    return o
def cyl(name, r, f0, f1, u, m, x=0.0, verts=24, bevel=0.0004, axis='f'):
    bpy.ops.mesh.primitive_cylinder_add(vertices=verts, radius=r, depth=abs(f1 - f0))
    o = bpy.context.active_object; o.name = name
    if axis == 'f': o.rotation_euler = (math.pi / 2, 0, 0); o.location = B((f0 + f1) / 2, u, x)
    else: o.rotation_euler = (0, math.pi / 2, 0); o.location = B(f0, u, x + 0) ; o.dimensions
    apply_transform(o); o.data.materials.append(m)
    if bevel:
        bv = o.modifiers.new('bv', 'BEVEL'); bv.width = bevel; bv.segments = 2; bv.limit_method = 'ANGLE'; apply_modifier(o, 'bv')
    shade_smooth(o, 35); return o
def tube_curve(name, pts, r, m, closed=False, res=6):
    cu = bpy.data.curves.new(name, 'CURVE'); cu.dimensions = '3D'; cu.bevel_depth = r; cu.bevel_resolution = 3; cu.resolution_u = res
    sp = cu.splines.new('BEZIER'); sp.bezier_points.add(len(pts) - 1); sp.use_cyclic_u = closed
    for bp, p in zip(sp.bezier_points, pts):
        bp.co = p; bp.handle_left_type = bp.handle_right_type = 'AUTO'
    o = bpy.data.objects.new(name, cu); link(o)
    select_only([o], o)
    with ctx(o): bpy.ops.object.convert(target='MESH')
    o = bpy.context.view_layer.objects.active if bpy.context.view_layer.objects.active.name.startswith(name) else o
    o.data.materials.append(m); shade_smooth(o, 40); return o
def box(name, f0, f1, u0, u1, w, m, x=0.0, bevel=0.0005):
    return prism(name, [(f0, u0), (f1, u0), (f1, u1), (f0, u1)], w, m, bevel, x=x)
def finish(name, parts, muzzle_fu):
    o = join(parts, name)
    wn = o.modifiers.new('wn', 'WEIGHTED_NORMAL'); wn.keep_sharp = True
    try: apply_modifier(o, 'wn')
    except Exception: o.modifiers.remove(wn)
    e = bpy.data.objects.new('muzzle', None); link(e); e.location = B(*muzzle_fu); e.parent = o
    print(name, 'tris', tri_count(o))
    return o, e

# ======================================================= M9F
reset()
blued = mat('gun_blued', (0.018, 0.018, 0.02), 0.32, 0.9)
steel = mat('gun_steel', (0.30, 0.30, 0.31), 0.22, 1.0)
grip = mat('gun_grip', (0.012, 0.012, 0.012), 0.62, 0.0)
white = mat('gun_dot', (0.85, 0.85, 0.8), 0.4, 0.0)
P = []
# slide: lower full-length body, rear upper, front bridge (open-top Beretta slide)
P.append(prism('slide_low', [(-0.058, 0.012), (0.158, 0.012), (0.160, 0.016), (0.160, 0.030), (0.155, 0.036), (-0.058, 0.036)], 0.027, blued, 0.0012))
P.append(prism('slide_top', [(-0.058, 0.035), (0.060, 0.035), (0.066, 0.041), (0.060, 0.046), (-0.050, 0.047), (-0.058, 0.044)], 0.024, blued, 0.0025, seg=3))
P.append(prism('slide_bridge', [(0.138, 0.035), (0.160, 0.035), (0.160, 0.042), (0.140, 0.043)], 0.022, blued, 0.0018, seg=3))
for i in range(9):                                            # rear cocking serrations
    f = -0.052 + i * 0.0033
    for sx in (1, -1): P.append(box('serr', f, f + 0.0016, 0.015, 0.043, 0.0012, blued, x=sx * 0.0137, bevel=0.0003))
P.append(cyl('barrel', 0.0074, 0.0, 0.1585, 0.034, steel, verts=28))
P.append(cyl('bore', 0.0046, 0.1585, 0.1595, 0.034, mat('gun_bore', (0.003, 0.003, 0.003), 0.8, 0.5), verts=20, bevel=0))
P.append(cyl('ejport', 0.0098, 0.040, 0.050, 0.041, steel, verts=20))   # locking-block hint in the ejection opening
# frame: dust cover + receiver
P.append(prism('frame', [(-0.058, -0.004), (-0.005, -0.004), (0.004, 0.0), (0.128, 0.0), (0.134, 0.004), (0.134, 0.012), (-0.058, 0.012)], 0.0235, blued, 0.001))
# grip (rake ~ 16 deg), panels, backstrap, magazine base
g0, g1 = (-0.058, 0.004), (-0.005, 0.0)
rk = math.tan(math.radians(16))
gpts = [(-0.058, 0.006), (-0.006, 0.0), (-0.004, -0.012), (-0.006 - 0.095 * rk * 0.6, -0.098), (-0.060 - 0.095 * rk, -0.100), (-0.066 - 0.090 * rk * 0.4, -0.020), (-0.066, 0.0)]
P.append(prism('grip_core', gpts, 0.026, blued, 0.004, seg=3))
panel = [(-0.056 - 0.01 * rk, -0.008), (-0.012, -0.012), (-0.014 - 0.08 * rk * 0.6, -0.090), (-0.058 - 0.08 * rk, -0.092), (-0.062 - 0.04 * rk, -0.04)]
for sx in (1, -1):
    P.append(prism('panel', panel, 0.004, grip, 0.0015, x=sx * 0.0142, seg=3))
    for (f, u) in ((-0.030 - 0.02 * rk, -0.022), (-0.036 - 0.07 * rk, -0.080)):
        P.append(cyl('screw', 0.0028, 0, 0, u, steel, x=sx * 0.0165, verts=12, axis='x') if False else None)
P = [p for p in P if p is not None]
for sx in (1, -1):                                             # panel checkering: raised diamond studs
    for iu in range(10):
        for jf in range(4):
            u = -0.018 - iu * 0.0072; f = -0.022 - jf * 0.0075 - (iu % 2) * 0.0037 + u * rk * 0.6 + 0.004
            P.append(box('chk', f, f + 0.0034, u, u + 0.0034, 0.0012, grip, x=sx * 0.0166, bevel=0.0005))
P.append(prism('magbase', [(-0.004 - 0.1 * rk * 0.6, -0.097), (-0.060 - 0.1 * rk, -0.099), (-0.062 - 0.1 * rk, -0.108), (-0.002 - 0.1 * rk * 0.6, -0.106)], 0.028, blued, 0.0015))
# trigger guard (squared front like the 92FS/M9) and trigger
guard = [B(-0.004, -0.004), B(0.012, -0.030), B(0.040, -0.034), B(0.058, -0.030), B(0.062, -0.012), B(0.058, 0.0)]
P.append(tube_curve('guard', guard, 0.0028, blued))
trig = [B(0.022, -0.001), B(0.026, -0.010), B(0.024, -0.020), B(0.018, -0.026)]
tg = tube_curve('trigger', trig, 0.0022, blued); tg.scale = (0.7, 1, 1); apply_transform(tg); P.append(tg)
# hammer, sights, levers, slide stop, takedown, lanyard
P.append(prism('hammer', [(-0.060, 0.028), (-0.066, 0.030), (-0.072, 0.046), (-0.066, 0.050), (-0.060, 0.042)], 0.008, blued, 0.0012))
P.append(prism('front_sight', [(0.148, 0.046), (0.157, 0.046), (0.156, 0.052), (0.151, 0.052)], 0.003, blued, 0.0005))
for sx in (1, -1): P.append(box('rear_sight', -0.052, -0.044, 0.046, 0.052, 0.0045, blued, x=sx * 0.0045, bevel=0.0005))
P.append(cyl('dot_f', 0.0011, 0.1569, 0.1575, 0.0495, white, verts=10, bevel=0))
for sx in (1, -1): P.append(cyl('dot_r', 0.0009, -0.0438, -0.0432, 0.0495, white, x=sx * 0.0045, verts=10, bevel=0))
for sx in (1, -1):
    P.append(prism('safety', [(-0.050, 0.040), (-0.036, 0.040), (-0.034, 0.044), (-0.050, 0.046)], 0.003, blued, 0.0006, x=sx * 0.0147))
    P.append(cyl('safety_hub', 0.0035, 0, 0, 0.041, blued, x=sx * 0.015, verts=16, axis='x') if False else box('hub', -0.047, -0.041, 0.038, 0.044, 0.0035, blued, x=sx * 0.0145, bevel=0.0012))
P.append(box('slide_stop', -0.020, 0.012, 0.004, 0.009, 0.0025, blued, x=0.0128, bevel=0.0008))
P.append(box('takedown', 0.006, 0.014, 0.001, 0.010, 0.003, blued, x=0.0128, bevel=0.0012))
P.append(box('mag_release', -0.004, 0.003, -0.012, -0.004, 0.003, blued, x=-0.013, bevel=0.001))
P.append(box('rail_seam', -0.058, 0.130, 0.0115, 0.0125, 0.0242, steel, bevel=0.0002))
pistol, mz = finish('weapon_m9f', P, (0.162, 0.034))
export_glb(f'{OUT_GLB}/weapon_m9f.glb', [pistol, mz])
save_blend(f'{OUT_BLEND}/weapon_m9f.blend')

# ======================================================= combat knife
reset()
blade = mat('knife_blade', (0.55, 0.55, 0.56), 0.18, 1.0)
edge = mat('knife_edge', (0.75, 0.75, 0.76), 0.1, 1.0)
rub = mat('knife_handle', (0.02, 0.02, 0.018), 0.75, 0.0)
guardm = mat('knife_guard', (0.05, 0.05, 0.055), 0.35, 0.9)
P = []
bl = [(0.052, 0.006), (0.150, 0.008), (0.185, 0.012), (0.212, 0.016), (0.190, 0.000), (0.150, -0.011), (0.080, -0.013), (0.056, -0.010)]
b = prism('blade', bl, 0.0042, blade, 0.0006)
Pb = V(b); ed = np.clip((0.004 - Pb[:, 2]) / 0.018, 0, 1) * (Pb[:, 1] < -0.06)   # grind: thin the edge side
Pb[:, 0] *= 1 - 0.8 * ed; setV(b, Pb); P.append(b)
eg = prism('edge', [(0.060, -0.0105), (0.150, -0.0095), (0.19, 0.0005), (0.21, 0.0145), (0.20, 0.012), (0.15, -0.007), (0.06, -0.008)], 0.0012, edge, 0.0002)
P.append(eg)
fuller = box('fuller', 0.065, 0.135, 0.001, 0.004, 0.0046, mat('knife_fuller', (0.3, 0.3, 0.31), 0.3, 1.0), bevel=0.0008); P.append(fuller)
P.append(prism('guard', [(0.046, 0.016), (0.052, 0.016), (0.052, -0.022), (0.046, -0.022)], 0.016, guardm, 0.0015))
hd = []
for i in range(9):
    f = -0.058 + i * 0.0118
    r = 0.0125 + 0.0012 * math.sin(i * 0.9)
    hd.append(cyl('ring', r, f, f + 0.011, -0.002, rub, verts=20, bevel=0.0015))
for h_ in hd: h_.scale = (0.75, 1, 1); apply_transform(h_)
P += hd
P.append(prism('pommel', [(-0.068, 0.012), (-0.058, 0.014), (-0.058, -0.017), (-0.068, -0.015), (-0.072, -0.002)], 0.018, guardm, 0.002))
knife, mz = finish('weapon_knife', P, (0.212, 0.016))
export_glb(f'{OUT_GLB}/weapon_knife.glb', [knife, mz])
save_blend(f'{OUT_BLEND}/weapon_knife.blend')
print('weapons done')
