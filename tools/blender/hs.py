"""Hard-surface helpers for props / items / weapons (Blender Z-up world; glTF export converts to Y-up)."""
import sys, math, os; sys.path.insert(0, '/data/assets_src/tools')
from lib import *
from PIL import Image, ImageDraw, ImageFont, ImageFilter

TEXDIR = '/data/assets_src/gen_tex'; os.makedirs(TEXDIR, exist_ok=True)
FONT = '/usr/share/fonts/msttcore/impact.ttf'
FONT_SERIF = '/usr/share/fonts/msttcore/georgia.ttf'
FONT_SANS = '/usr/share/fonts/msttcore/arialbd.ttf'
def font(path, size):
    try: return ImageFont.truetype(path, size)
    except Exception: return ImageFont.load_default()

_mats = {}
def mat(name, col, rough=0.5, metal=0.0, emit=None, emit_str=1.0, coat=0.0, tex=None, alpha=None, noise=0.0):
    """Principled material. tex = path to an image used as base colour (UV mapped)."""
    key = name
    if key in _mats: return _mats[key]
    m, nt, out = node_mat(name)
    b = nt.nodes.new('ShaderNodeBsdfPrincipled'); nt.links.new(b.outputs[0], out.inputs[0])
    b.inputs['Base Color'].default_value = (*col, 1); b.inputs['Roughness'].default_value = rough; b.inputs['Metallic'].default_value = metal
    if coat: b.inputs['Coat Weight'].default_value = coat
    if emit is not None:
        b.inputs['Emission Color'].default_value = (*emit, 1); b.inputs['Emission Strength'].default_value = emit_str
    if tex:
        t = nt.nodes.new('ShaderNodeTexImage'); t.image = bpy.data.images.load(tex, check_existing=True)
        nt.links.new(t.outputs['Color'], b.inputs['Base Color'])
        if alpha:
            nt.links.new(t.outputs['Alpha'], b.inputs['Alpha']); m.surface_render_method = 'DITHERED'
    _mats[key] = m
    return m

def reset_hs():
    _mats.clear(); return reset()

def _obj(name, bm, m):
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me); link(o)
    if m is not None: o.data.materials.append(m)
    return o

def bevel(o, w, seg=2, angle=30):
    if w <= 0: return o
    bv = o.modifiers.new('bv', 'BEVEL'); bv.width = w; bv.segments = seg; bv.limit_method = 'ANGLE'; bv.angle_limit = math.radians(angle)
    apply_modifier(o, 'bv'); return o

def box(name, size, loc, m, bev=0.0, seg=2, rot=(0, 0, 0)):
    bm = bmesh.new(); bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts: v.co = Vector((v.co.x * size[0], v.co.y * size[1], v.co.z * size[2]))
    o = _obj(name, bm, m); bevel(o, bev, seg)
    o.rotation_euler = rot; o.location = loc; apply_transform(o)
    shade_smooth(o, 35); return o

def cyl(name, r, depth, loc, m, rot=(0, 0, 0), verts=24, bev=0.0, r2=None, seg=2):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, cap_tris=False, segments=verts, radius1=r, radius2=r if r2 is None else r2, depth=depth)
    o = _obj(name, bm, m); bevel(o, bev, seg)
    o.rotation_euler = rot; o.location = loc; apply_transform(o)
    shade_smooth(o, 40); return o

def sphere(name, r, loc, m, scale=(1, 1, 1), seg=24, rings=12):
    bm = bmesh.new(); bmesh.ops.create_uvsphere(bm, u_segments=seg, v_segments=rings, radius=r)
    o = _obj(name, bm, m); o.scale = scale; o.location = loc; apply_transform(o); shade_smooth(o); return o

def lathe(name, prof, m, loc=(0, 0, 0), segs=32, rot=(0, 0, 0), cap_top=True, cap_bot=True, smooth=40, uv=True):
    """Revolve profile [(r, z), ...] (bottom → top) around local Z."""
    bm = bmesh.new(); rings = []
    for i in range(segs):
        a = 2 * math.pi * i / segs; ca, sa = math.cos(a), math.sin(a)
        rings.append([bm.verts.new((r * ca, r * sa, z)) for r, z in prof])
    faces = []
    for i in range(segs):
        A, B_ = rings[i], rings[(i + 1) % segs]
        for j in range(len(prof) - 1):
            if prof[j][0] < 1e-6 and prof[j + 1][0] < 1e-6: continue
            try: faces.append((bm.faces.new([A[j], B_[j], B_[j + 1], A[j + 1]]), i, j))
            except ValueError: pass
    if cap_bot and prof[0][0] > 1e-6: bm.faces.new([rings[i][0] for i in reversed(range(segs))])
    if cap_top and prof[-1][0] > 1e-6: bm.faces.new([rings[i][-1] for i in range(segs)])
    bmesh.ops.remove_doubles(bm, verts=bm.verts[:], dist=1e-6)
    if uv:
        lay = bm.loops.layers.uv.new('UVMap')
        L = [0.0]
        for j in range(1, len(prof)): L.append(L[-1] + math.dist(prof[j], prof[j - 1]))
        tot = max(L[-1], 1e-6)
        for f in bm.faces:
            for lp in f.loops:
                co = lp.vert.co; u = (math.atan2(co.y, co.x) / (2 * math.pi)) % 1.0
                # nearest profile index by z/r
                j = min(range(len(prof)), key=lambda k: (prof[k][1] - co.z) ** 2 + (prof[k][0] - math.hypot(co.x, co.y)) ** 2)
                lp[lay].uv = (u, L[j] / tot)
        # fix seam
        for f in bm.faces:
            us = [lp[lay].uv.x for lp in f.loops]
            if max(us) - min(us) > 0.5:
                for lp in f.loops:
                    if lp[lay].uv.x < 0.5: lp[lay].uv.x += 1.0
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    o = _obj(name, bm, m); o.rotation_euler = rot; o.location = loc; apply_transform(o)
    shade_smooth(o, smooth); return o

def prism(name, pts, width, m, bev=0.0, seg=2, axis='x', off=0.0):
    """Extrude 2D polygon pts [(a, b)] by width. axis='x': pts are (y, z) in the YZ plane, extruded along X."""
    bm = bmesh.new()
    def P(a, b, c):
        return (c, a, b) if axis == 'x' else (a, c, b) if axis == 'y' else (a, b, c)
    top = [bm.verts.new(P(a, b, off + width / 2)) for a, b in pts]
    bot = [bm.verts.new(P(a, b, off - width / 2)) for a, b in pts]
    n = len(pts)
    bm.faces.new(top); bm.faces.new(list(reversed(bot)))
    for i in range(n):
        j = (i + 1) % n; bm.faces.new([top[i], bot[i], bot[j], top[j]])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    o = _obj(name, bm, m); bevel(o, bev, seg); shade_smooth(o, 35); return o

def tube(name, pts, r, m, closed=False, res=6, bev_res=3):
    cu = bpy.data.curves.new(name, 'CURVE'); cu.dimensions = '3D'; cu.bevel_depth = r; cu.bevel_resolution = bev_res; cu.resolution_u = res
    cu.use_fill_caps = True
    sp = cu.splines.new('BEZIER'); sp.bezier_points.add(len(pts) - 1); sp.use_cyclic_u = closed
    for bp, p in zip(sp.bezier_points, pts):
        bp.co = p; bp.handle_left_type = bp.handle_right_type = 'AUTO'
    o = bpy.data.objects.new(name, cu); link(o)
    select_only([o], o)
    with ctx(o): bpy.ops.object.convert(target='MESH')
    o = bpy.context.view_layer.objects.active
    o.data.materials.clear(); o.data.materials.append(m); shade_smooth(o, 40); return o

def torus(name, R, r, loc, m, rot=(0, 0, 0), maj=32, mnr=10):
    bpy.ops.mesh.primitive_torus_add(major_radius=R, minor_radius=r, major_segments=maj, minor_segments=mnr)
    o = bpy.context.active_object; o.name = name; o.rotation_euler = rot; o.location = loc; apply_transform(o)
    o.data.materials.append(m); shade_smooth(o); return o

def decal(name, w, h, loc, rot, tex, rough=0.6, alpha=False, metal=0.0):
    """Textured quad (UV 0..1) — labels, prints, screens."""
    bm = bmesh.new()
    vs = [bm.verts.new((x * w / 2, y * h / 2, 0)) for x, y in ((-1, -1), (1, -1), (1, 1), (-1, 1))]
    f = bm.faces.new(vs); lay = bm.loops.layers.uv.new('UVMap')
    for lp, uv in zip(f.loops, ((0, 0), (1, 0), (1, 1), (0, 1))): lp[lay].uv = uv
    m = mat('dec_' + os.path.basename(tex), (1, 1, 1), rough, metal, tex=tex, alpha=alpha)
    o = _obj(name, bm, m); o.rotation_euler = rot; o.location = loc; apply_transform(o); return o

def wrap_label(name, r, z0, z1, a0, a1, tex, loc=(0, 0, 0), segs=24, rough=0.55):
    """Cylindrical label (bottle/can) from angle a0..a1 (radians), height z0..z1."""
    bm = bmesh.new(); lay = bm.loops.layers.uv.new('UVMap')
    cols = []
    for i in range(segs + 1):
        a = a0 + (a1 - a0) * i / segs
        cols.append((bm.verts.new((r * math.cos(a), r * math.sin(a), z0)), bm.verts.new((r * math.cos(a), r * math.sin(a), z1)), i / segs))
    for i in range(segs):
        (b0, t0, u0), (b1, t1, u1) = cols[i], cols[i + 1]
        f = bm.faces.new([b0, b1, t1, t0])
        for lp, uv in zip(f.loops, ((u0, 0), (u1, 0), (u1, 1), (u0, 1))): lp[lay].uv = (1 - uv[0], uv[1])
    m = mat('lab_' + os.path.basename(tex), (1, 1, 1), rough, tex=tex)
    o = _obj(name, bm, m); o.location = loc; apply_transform(o); shade_smooth(o); return o

def box_uv(o, scale=1.0):
    """Cube-projection UVs (world-size), for tiling textures on props."""
    me = o.data
    if not me.uv_layers: me.uv_layers.new(name='UVMap')
    uv = me.uv_layers.active.data
    for p in me.polygons:
        n = p.normal; ax = max(range(3), key=lambda i: abs(n[i]))
        for li in p.loop_indices:
            co = me.vertices[me.loops[li].vertex_index].co
            a, b = [(co.y, co.z), (co.x, co.z), (co.x, co.y)][ax]
            uv[li].uv = (a * scale, b * scale)

def finish(name, parts, origin_floor=True, center=True):
    parts = [p for p in parts if p is not None]
    o = join(parts, name)
    if center or origin_floor:
        P = V(o); mn, mx = P.min(0), P.max(0)
        off = np.array([(mn[0] + mx[0]) / 2 if center else 0, (mn[1] + mx[1]) / 2 if center else 0, mn[2] if origin_floor else 0])
        setV(o, P - off)
    try:
        wn = o.modifiers.new('wn', 'WEIGHTED_NORMAL'); wn.keep_sharp = True; apply_modifier(o, 'wn')
    except Exception: pass
    print(name, 'tris', tri_count(o))
    return o

# ------------------------------------------------------------------ PIL texture helpers
def tex_label(fname, size, bg, draw_fn):
    img = Image.new('RGBA', size, bg); d = ImageDraw.Draw(img); draw_fn(img, d)
    p = f'{TEXDIR}/{fname}.png'; img.save(p); return p

def grunge(img, amount=0.15, seed=1):
    """Worn print: darken with noise + edge wear."""
    rng = np.random.default_rng(seed)
    a = np.asarray(img).astype(np.float32)
    h, w = a.shape[:2]
    n = rng.random((h // 8 + 1, w // 8 + 1)).astype(np.float32)
    n = np.asarray(Image.fromarray((n * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC)).astype(np.float32) / 255
    f = 1 - amount * n
    a[..., :3] *= f[..., None]
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
