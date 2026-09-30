"""Shared Blender (bpy 5.x) helpers for the Code: Veronica web-remake asset pipeline.
Everything is generated headlessly: geometry, rig/weights, shape keys, UVs, baked PBR textures, GLB export."""
import bpy, bmesh, math, os, numpy as np
from mathutils import Vector, Matrix, noise, bvhtree, kdtree

BUNDLE = '/data/assets_src/hbm/human-base-meshes-bundle-v1.4.1/human_base_meshes_bundle.blend'
TEX = '/data/assets_src/tex'
OUT_BLEND = '/data/cv-remake/assets/blender'
OUT_GLB = '/data/cv-remake/src/assets/models'

def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'
    sc.cycles.device = 'CPU'
    sc.cycles.samples = 1
    sc.render.bake.margin = 8
    sc.unit_settings.system = 'METRIC'
    return sc

def link(o):
    bpy.context.scene.collection.objects.link(o)
    return o

def append(names):
    with bpy.data.libraries.load(BUNDLE, link=False) as (src, dst):
        dst.objects = [n for n in src.objects if n in names]
    out = {}
    for o in dst.objects:
        link(o); out[o.name] = o
    bpy.context.view_layer.update()
    return out

def ctx(active, selected=None):
    sel = selected if selected is not None else [active]
    return bpy.context.temp_override(object=active, active_object=active, selected_objects=sel,
                                     selected_editable_objects=sel, view_layer=bpy.context.view_layer)

def select_only(objs, active):
    for o in bpy.context.view_layer.objects: o.select_set(False)
    for o in objs: o.select_set(True)
    bpy.context.view_layer.objects.active = active

def apply_modifier(o, name):
    select_only([o], o)
    with ctx(o): bpy.ops.object.modifier_apply(modifier=name)

def apply_all(o):
    for m in list(o.modifiers): apply_modifier(o, m.name)

def apply_transform(o, loc=True, rot=True, scale=True):
    select_only([o], o)
    with ctx(o): bpy.ops.object.transform_apply(location=loc, rotation=rot, scale=scale)

def unparent_keep(o):
    mw = o.matrix_world.copy(); o.parent = None; o.matrix_world = mw

def dup(o, name):
    n = o.copy(); n.data = o.data.copy(); n.name = name; n.data.name = name
    for c in list(n.users_collection): c.objects.unlink(n)
    link(n); return n

def V(o):
    a = np.zeros(len(o.data.vertices) * 3); o.data.vertices.foreach_get('co', a); return a.reshape(-1, 3)

def setV(o, arr):
    o.data.vertices.foreach_set('co', np.ascontiguousarray(arr, dtype=np.float64).ravel()); o.data.update()

def N(o):
    a = np.zeros(len(o.data.vertices) * 3); o.data.vertices.foreach_get('normal', a); return a.reshape(-1, 3)

def mesh_from(name, verts, faces, uv=None):
    me = bpy.data.meshes.new(name); me.from_pydata([tuple(v) for v in verts], [], [tuple(f) for f in faces]); me.update()
    o = bpy.data.objects.new(name, me); link(o)
    if uv is not None:
        ul = me.uv_layers.new(name='UVMap')
        for p in me.polygons:
            for li, vi in zip(p.loop_indices, p.vertices): ul.data[li].uv = uv[vi]
    return o

def shade_smooth(o, angle=None):
    for p in o.data.polygons: p.use_smooth = True
    if angle is not None:
        select_only([o], o)
        with ctx(o):
            try: bpy.ops.object.shade_smooth_by_angle(angle=angle)
            except Exception: pass

def join(objs, name):
    act = objs[0]; select_only(objs, act)
    with ctx(act, objs): bpy.ops.object.join()
    act.name = name; act.data.name = name; return act

def weights(o, bone_names):
    """(nverts, nbones) dense weight matrix for the given vertex group names."""
    idx = {vg.name: i for i, vg in enumerate(o.vertex_groups)}
    W = np.zeros((len(o.data.vertices), len(bone_names)))
    col = {idx[b]: j for j, b in enumerate(bone_names) if b in idx}
    for v in o.data.vertices:
        for g in v.groups:
            j = col.get(g.group)
            if j is not None: W[v.index, j] = g.weight
    return W

def delete_verts(o, mask):
    bm = bmesh.new(); bm.from_mesh(o.data); bm.verts.ensure_lookup_table()
    bmesh.ops.delete(bm, geom=[bm.verts[i] for i in np.nonzero(mask)[0]], context='VERTS')
    bm.to_mesh(o.data); bm.free(); o.data.update()

def delete_faces(o, fmask):
    bm = bmesh.new(); bm.from_mesh(o.data); bm.faces.ensure_lookup_table()
    bmesh.ops.delete(bm, geom=[bm.faces[i] for i in np.nonzero(fmask)[0]], context='FACES')
    bm.to_mesh(o.data); bm.free(); o.data.update()

def face_mask_from_verts(o, vmask, mode='all'):
    f = np.zeros(len(o.data.polygons), bool)
    for p in o.data.polygons:
        vs = [vmask[v] for v in p.vertices]
        f[p.index] = all(vs) if mode == 'all' else any(vs)
    return f

def extract_faces(src, fmask, name):
    """New object containing only masked faces of src (keeps UVs, vertex groups)."""
    o = dup(src, name)
    delete_faces(o, ~fmask)
    return o

def smooth_verts(o, iters=5, lam=0.5, pin=None):
    """Laplacian smoothing (numpy) over mesh edges."""
    P = V(o); E = np.array([e.vertices[:] for e in o.data.edges])
    n = len(P)
    for _ in range(iters):
        acc = np.zeros_like(P); cnt = np.zeros(n)
        np.add.at(acc, E[:, 0], P[E[:, 1]]); np.add.at(acc, E[:, 1], P[E[:, 0]])
        np.add.at(cnt, E[:, 0], 1); np.add.at(cnt, E[:, 1], 1)
        avg = acc / np.maximum(cnt, 1)[:, None]
        step = (avg - P) * lam
        if pin is not None: step[pin] = 0
        P = P + step
    setV(o, P)

def bvh_of(o):
    bm = bmesh.new(); bm.from_mesh(o.data); bm.transform(o.matrix_world)
    t = bvhtree.BVHTree.FromBMesh(bm); bm.free(); return t

def push_out(o, body_bvh, dmin, iters=1):
    """Ensure every vertex is at least dmin[i] outside the body surface (along body normal)."""
    P = V(o); d = np.broadcast_to(np.asarray(dmin, float), (len(P),))
    for i in range(len(P)):
        loc, nrm, fi, dist = body_bvh.find_nearest(Vector(P[i]))
        if loc is None: continue
        v = Vector(P[i]) - loc
        sd = v.dot(nrm)
        if sd < d[i]: P[i] = np.array(loc + nrm * d[i])
    setV(o, P)

def cloth_shell(o, body_bvh, offset, smooth_iters=6, passes=3, pin=None):
    """Offset + relax + push-out loop: drapes fabric over concavities instead of shrink-wrapping them."""
    P = V(o); Nn = N(o); off = np.broadcast_to(np.asarray(offset, float), (len(P),))
    setV(o, P + Nn * off[:, None])
    for _ in range(passes):
        smooth_verts(o, smooth_iters, 0.5, pin)
        push_out(o, body_bvh, off)

def fbm3(p, octaves=4, scale=1.0):
    return noise.fractal(Vector(p) * scale, 0.5, 2.0, octaves, noise_basis='PERLIN_ORIGINAL')

def displace_along_normals(o, fn):
    P = V(o); Nn = N(o)
    d = np.array([fn(P[i], Nn[i]) for i in range(len(P))])
    setV(o, P + Nn * d[:, None])

def solidify(o, thickness, offset=-1.0, rim=True, even=False):
    m = o.modifiers.new('solid', 'SOLIDIFY'); m.thickness = thickness; m.offset = offset
    m.use_rim = rim; m.use_even_offset = even; m.use_quality_normals = True
    apply_modifier(o, m.name)

def subdivide(o, levels=1, simple=False):
    m = o.modifiers.new('sub', 'SUBSURF'); m.levels = levels; m.render_levels = levels
    m.subdivision_type = 'SIMPLE' if simple else 'CATMULL_CLARK'
    m.boundary_smooth = 'PRESERVE_CORNERS'
    apply_modifier(o, m.name)

def decimate(o, ratio):
    m = o.modifiers.new('dec', 'DECIMATE'); m.ratio = ratio; m.use_collapse_triangulate = False
    apply_modifier(o, m.name)

def triangulate(o):
    m = o.modifiers.new('tri', 'TRIANGULATE'); m.keep_custom_normals = True; apply_modifier(o, m.name)

def transfer_weights(dst, src):
    for vg in src.vertex_groups:
        if vg.name not in dst.vertex_groups: dst.vertex_groups.new(name=vg.name)
    m = dst.modifiers.new('dt', 'DATA_TRANSFER'); m.object = src
    m.use_vert_data = True; m.data_types_verts = {'VGROUP_WEIGHTS'}; m.vert_mapping = 'POLYINTERP_NEAREST'
    m.layers_vgroup_select_src = 'ALL'; m.layers_vgroup_select_dst = 'NAME'
    select_only([dst], dst)
    with ctx(dst): bpy.ops.object.datalayout_transfer(modifier=m.name)
    apply_modifier(dst, m.name)

def rigid_weight(o, bone):
    for vg in list(o.vertex_groups): o.vertex_groups.remove(vg)
    g = o.vertex_groups.new(name=bone); g.add(list(range(len(o.data.vertices))), 1.0, 'REPLACE')

def normalize_limit(o, limit=4):
    select_only([o], o)
    with ctx(o):
        bpy.ops.object.vertex_group_limit_total(group_select_mode='ALL', limit=limit)
        bpy.ops.object.vertex_group_normalize_all(group_select_mode='ALL', lock_active=False)

# ------------------------------------------------------------------ UV
def edit(o):
    select_only([o], o)
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')

def smart_uv(o, angle=66, margin=0.004):
    edit(o)
    bpy.ops.uv.smart_project(angle_limit=math.radians(angle), island_margin=margin, area_weight=0.0, correct_aspect=True, scale_to_bounds=False)
    bpy.ops.object.mode_set(mode='OBJECT')

def uv_scale_faces(o, fmask, s):
    """Scale UV islands of masked faces around their own centroid (gives them more texels when packed)."""
    uv = o.data.uv_layers.active.data
    loops = [li for p in o.data.polygons if fmask[p.index] for li in p.loop_indices]
    if not loops: return
    A = np.array([uv[l].uv[:] for l in loops]); c = A.mean(0)
    for l, a in zip(loops, A): uv[l].uv = tuple(c + (a - c) * s)

def pack_uv(o, margin=0.003, average=True, rotate=True):
    edit(o)
    bpy.ops.uv.select_all(action='SELECT')
    if average: bpy.ops.uv.average_islands_scale()
    bpy.ops.object.mode_set(mode='OBJECT')

def pack_only(o, margin=0.003, rotate=True):
    edit(o)
    bpy.ops.uv.select_all(action='SELECT')
    bpy.ops.uv.pack_islands(rotate=rotate, margin=margin, shape_method='CONCAVE')
    bpy.ops.object.mode_set(mode='OBJECT')

# ------------------------------------------------------------------ materials / baking
def new_image(name, size, alpha=False, noncolor=False):
    if name in bpy.data.images: bpy.data.images.remove(bpy.data.images[name])
    img = bpy.data.images.new(name, size, size, alpha=alpha, float_buffer=False)
    if noncolor: img.colorspace_settings.name = 'Non-Color'
    return img

def node_mat(name):
    m = bpy.data.materials.new(name); m.use_nodes = True
    nt = m.node_tree
    for n in list(nt.nodes): nt.nodes.remove(n)
    out = nt.nodes.new('ShaderNodeOutputMaterial')
    return m, nt, out

def bake(o, bake_type, img, samples=1, high=None, extrusion=0.01, ray=0.03, pass_filter=None, normal_space='TANGENT'):
    """Bake `bake_type` of o's materials into img (all material slots write into the same image)."""
    sc = bpy.context.scene; sc.cycles.samples = samples
    for slot in o.material_slots:
        nt = slot.material.node_tree
        t = nt.nodes.get('__bake__') or nt.nodes.new('ShaderNodeTexImage'); t.name = '__bake__'
        t.image = img; nt.nodes.active = t; t.select = True
    kw = dict(type=bake_type, margin=8, use_clear=True)
    if pass_filter: kw['pass_filter'] = pass_filter
    if bake_type == 'NORMAL': kw['normal_space'] = normal_space
    if high is not None:
        select_only([high, o], o); kw.update(use_selected_to_active=True, cage_extrusion=extrusion, max_ray_distance=ray)
        with ctx(o, [high, o]): bpy.ops.object.bake(**kw)
    else:
        select_only([o], o)
        with ctx(o): bpy.ops.object.bake(**kw)
    for slot in o.material_slots:
        nt = slot.material.node_tree; n = nt.nodes.get('__bake__')
        if n: nt.nodes.remove(n)

def save_img(img, path, quality=90):
    fmt = 'JPEG' if path.endswith('.jpg') else 'PNG'
    img.filepath_raw = path; img.file_format = fmt
    sc = bpy.context.scene
    sc.render.image_settings.quality = quality
    img.save_render(path) if False else img.save()
    return path

def export_material(name, color, normal=None, orm=None, rough=0.6, metal=0.0, alpha=None, blend='OPAQUE', sheen=0.0):
    """glTF-friendly Principled BSDF material referencing baked images."""
    m, nt, out = node_mat(name)
    b = nt.nodes.new('ShaderNodeBsdfPrincipled'); nt.links.new(b.outputs[0], out.inputs[0])
    tc = nt.nodes.new('ShaderNodeTexImage'); tc.image = color
    nt.links.new(tc.outputs['Color'], b.inputs['Base Color'])
    if alpha:
        nt.links.new(tc.outputs['Alpha'], b.inputs['Alpha'])
        m.surface_render_method = 'DITHERED'
    if normal is not None:
        tn = nt.nodes.new('ShaderNodeTexImage'); tn.image = normal
        nm = nt.nodes.new('ShaderNodeNormalMap'); nt.links.new(tn.outputs['Color'], nm.inputs['Color']); nt.links.new(nm.outputs[0], b.inputs['Normal'])
    if orm is not None:
        to = nt.nodes.new('ShaderNodeTexImage'); to.image = orm
        sp = nt.nodes.new('ShaderNodeSeparateColor'); nt.links.new(to.outputs['Color'], sp.inputs[0])
        nt.links.new(sp.outputs['Green'], b.inputs['Roughness']); nt.links.new(sp.outputs['Blue'], b.inputs['Metallic'])
    else:
        b.inputs['Roughness'].default_value = rough; b.inputs['Metallic'].default_value = metal
    if sheen > 0:
        b.inputs['Sheen Weight'].default_value = sheen
    return m

def combine_orm(ao_img, rough_img, metal_img, name, size):
    """Pack AO(R) / Roughness(G) / Metallic(B) into one glTF ORM texture."""
    img = new_image(name, size, noncolor=True)
    def px(i):
        if i is None: return None
        a = np.zeros(size * size * 4, np.float32); i.pixels.foreach_get(a); return a.reshape(-1, 4)
    A, R, M = px(ao_img), px(rough_img), px(metal_img)
    out = np.ones((size * size, 4), np.float32)
    out[:, 0] = A[:, 0] if A is not None else 1
    out[:, 1] = R[:, 0] if R is not None else 0.6
    out[:, 2] = M[:, 0] if M is not None else 0
    img.pixels.foreach_set(out.ravel()); return img

def export_glb(path, objs, extra_opts=None):
    select_only(objs, objs[0])
    opts = dict(filepath=path, export_format='GLB', use_selection=True, export_apply=True, export_yup=True,
                export_skins=True, export_morph=True, export_morph_normal=True, export_tangents=True,
                export_image_format='JPEG', export_jpeg_quality=88, export_animations=False,
                export_materials='EXPORT', export_extras=True, export_all_influences=False)
    if extra_opts: opts.update(extra_opts)
    with ctx(objs[0], objs): bpy.ops.export_scene.gltf(**opts)
    print('exported', path, os.path.getsize(path) // 1024, 'KB')

def save_blend(path):
    bpy.ops.file.pack_all()
    bpy.ops.wm.save_as_mainfile(filepath=path, compress=True)
    print('saved', path, os.path.getsize(path) // 1024, 'KB')

def tri_count(o):
    return sum(len(p.vertices) - 2 for p in o.data.polygons)

def recalc_normals(o, inside=False):
    edit(o); bpy.ops.mesh.normals_make_consistent(inside=inside); bpy.ops.object.mode_set(mode='OBJECT')

def ray_ring(bvh, center, axis, ref, n, offset=0.0, reach=0.5, a0=0.0, a1=2 * math.pi, closed=True, inside=False):
    """Cast rays from outside toward the axis; returns outermost hit points (+offset along normal) and normals."""
    axis = Vector(axis).normalized(); u = Vector(ref) - axis * Vector(ref).dot(axis); u.normalize(); v = axis.cross(u)
    pts, nrms = [], []
    cnt = n if closed else n + 1
    for i in range(cnt):
        a = a0 + (a1 - a0) * i / n
        d = u * math.cos(a) + v * math.sin(a)
        if inside: hit, nr, _, _ = bvh.ray_cast(Vector(center), d, reach)
        else: hit, nr, _, _ = bvh.ray_cast(Vector(center) + d * reach, -d, reach * 1.2)
        if hit is None: hit, nr = Vector(center) + d * 0.05, d
        if nr.dot(d) < 0: nr = -nr
        pts.append(hit + nr * offset); nrms.append(nr)
    return pts, nrms

def band_mesh(name, top, bot, ntop, nbot, thick, closed=True):
    """Rectangular-profile band between two rings of points (belts, straps, collars)."""
    n = len(top); verts, faces, uvs = [], [], []
    for i in range(n):
        verts += [top[i] + ntop[i] * thick, bot[i] + nbot[i] * thick, bot[i], top[i]]
    m = n if closed else n - 1
    for i in range(m):
        j = (i + 1) % n; a, b = 4 * i, 4 * j
        faces += [(a, b, b + 1, a + 1), (a + 1, b + 1, b + 2, a + 2), (a + 2, b + 2, b + 3, a + 3), (a + 3, b + 3, b, a)]
    if not closed:
        faces += [(0, 1, 2, 3), (4 * (n - 1) + 3, 4 * (n - 1) + 2, 4 * (n - 1) + 1, 4 * (n - 1))]
    o = mesh_from(name, verts, faces)
    return o

def box_mesh(name, size, bevel=0.0, segments=2):
    bpy.ops.mesh.primitive_cube_add(size=1)
    o = bpy.context.active_object; o.name = name; o.data.name = name
    o.scale = size; apply_transform(o)
    if bevel > 0:
        m = o.modifiers.new('bev', 'BEVEL'); m.width = bevel; m.segments = segments; m.limit_method = 'NONE'
        apply_modifier(o, m.name)
    return o

def cyl_mesh(name, r, depth, verts=16):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=depth, vertices=verts)
    o = bpy.context.active_object; o.name = name; o.data.name = name; return o

def place(o, loc, x_axis, y_axis, z_axis):
    """Orient object so its local axes map to the given world axes, then bake transform."""
    M = Matrix((x_axis, y_axis, z_axis)).transposed().to_4x4(); M.translation = Vector(loc)
    o.matrix_world = M; apply_transform(o)

def boundary_verts(o):
    bm = bmesh.new(); bm.from_mesh(o.data)
    b = np.zeros(len(bm.verts), bool)
    for e in bm.edges:
        if e.is_boundary: b[e.verts[0].index] = b[e.verts[1].index] = True
    bm.free(); return b

def smooth_boundary(o, iters=12, lam=0.5):
    """Straighten jagged cut edges: 1D Laplacian along boundary loops."""
    bm = bmesh.new(); bm.from_mesh(o.data); bm.verts.ensure_lookup_table()
    nb = {}
    for e in bm.edges:
        if e.is_boundary:
            a, b = e.verts[0].index, e.verts[1].index
            nb.setdefault(a, []).append(b); nb.setdefault(b, []).append(a)
    bm.free()
    P = V(o); idx = np.array([k for k, v in nb.items() if len(v) == 2])
    if len(idx) == 0: return
    n1 = np.array([nb[k][0] for k in idx]); n2 = np.array([nb[k][1] for k in idx])
    for _ in range(iters):
        P[idx] += ((P[n1] + P[n2]) * 0.5 - P[idx]) * lam
    setV(o, P)

def zero_keys(o):
    if o.data.shape_keys:
        for k in o.data.shape_keys.key_blocks: k.value = 0.0
