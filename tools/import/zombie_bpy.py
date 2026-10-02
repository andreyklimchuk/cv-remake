"""Imports a user zombie GLB into the game's zombie format (Blender bpy, headless):
one SkinnedMesh, 16 game joints (hips spine neck head l/r UpperArm Forearm Hand Thigh Shin Foot), Y-up, facing +Z,
metres, ONE material whose base/normal/roughness are baked into a single atlas (1 draw call per zombie).
  rigged source  : bones renamed/merged by a map (json), weights of unmapped bones go to the nearest mapped ancestor
  static source  : joints estimated from the silhouette, weights from distance to bone segments ("auto")
Usage: PYTHONPATH=/data/pylib python3 tools/import/zombie_bpy.py src.glb dst.glb '<json cfg>'
cfg: {"height":1.8, "map":{...} | "auto":true, "drop":["EyeMoisture",...], "tris":30000, "tex":2048}"""
import bpy, bmesh, sys, json, math, mathutils, numpy as np
src, dst, cfg = sys.argv[-3], sys.argv[-2], json.loads(sys.argv[-1])
H = cfg.get('height', 1.78); TEX = cfg.get('tex', 2048); TRIS = cfg.get('tris', 30000)
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=src)
sc = bpy.context.scene
arm = next((o for o in sc.objects if o.type == 'ARMATURE'), None)
def dropped(o):
    names = [o.name] + [m.name for m in o.data.materials if m]
    return any(any(d.lower() in n.lower() for n in names) for d in cfg.get('drop', []))
for o in list(sc.objects):
    if o.type == 'MESH' and (dropped(o) or (arm and not any(m.type == 'ARMATURE' for m in o.modifiers))):
        print('drop', o.name); bpy.data.objects.remove(o)
for o in list(sc.objects):
    if o.type not in ('MESH', 'ARMATURE'): pass
meshes = [o for o in sc.objects if o.type == 'MESH']
def sel(objs, active=None):
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs: o.select_set(True)
    bpy.context.view_layer.objects.active = active or objs[0]
# --- flatten hierarchy, apply transforms --------------------------------------------------------------------------
for o in meshes + ([arm] if arm else []):
    mw = o.matrix_world.copy(); o.parent = None; o.matrix_world = mw
for o in [o for o in sc.objects if o.type == 'EMPTY']: bpy.data.objects.remove(o)
sel(meshes + ([arm] if arm else []))
bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
if arm:
    for o in meshes:
        for m in o.modifiers:
            if m.type == 'ARMATURE': m.object = arm
# --- join meshes -----------------------------------------------------------------------------------------------------
for o in meshes:
    if o.data.shape_keys:
        o.shape_key_clear()
# --- decimate (per object, before joining; alpha cards listed in cfg.keep are left intact) --------------------------
def ntris(o): return sum(len(p.vertices) - 2 for p in o.data.polygons)
keep = [k.lower() for k in cfg.get('keep', [])]
def kept(o): return any(k in (m.name.lower() if m else '') for m in o.data.materials for k in keep) or any(k in o.name.lower() for k in keep)
nk = sum(ntris(o) for o in meshes if kept(o)); nb = sum(ntris(o) for o in meshes if not kept(o))
r = min(1.0, max(0.03, (TRIS - nk) / max(1, nb)))
print('tris body', nb, 'kept', nk, 'ratio', round(r, 3))
for o in meshes:
    if kept(o) or r >= 0.999: continue
    dm = o.modifiers.new('dec', 'DECIMATE'); dm.ratio = r; dm.use_collapse_triangulate = True
    sel([o])
    while o.modifiers[0].name != 'dec': bpy.ops.object.modifier_move_up(modifier='dec')
    bpy.ops.object.modifier_apply(modifier='dec')
sel(meshes); bpy.ops.object.join(); body = bpy.context.view_layer.objects.active
print('tris after', ntris(body))
# normalise height + centre feet at origin (Blender Z-up; glTF export turns it into Y-up, -Y front -> +Z front)
co = np.array([v.co[:] for v in body.data.vertices])
lo, hi = co.min(0), co.max(0); s = H / (hi[2] - lo[2]); off = mathutils.Vector((-(lo[0] + hi[0]) / 2, -(lo[1] + hi[1]) / 2, -lo[2]))
print('raw bounds', lo.round(3), hi.round(3), 'scale', round(s, 4))
for o in [body] + ([arm] if arm else []):
    o.location = off * s; o.scale = (s, s, s)
sel([body] + ([arm] if arm else [])); bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
# --- rig ---------------------------------------------------------------------------------------------------------------
GAME = ['hips', 'spine', 'neck', 'head', 'lUpperArm', 'lForearm', 'lHand', 'rUpperArm', 'rForearm', 'rHand',
        'lThigh', 'lShin', 'lFoot', 'rThigh', 'rShin', 'rFoot']
PARENT = {'spine': 'hips', 'neck': 'spine', 'head': 'neck', 'lUpperArm': 'spine', 'lForearm': 'lUpperArm', 'lHand': 'lForearm',
          'rUpperArm': 'spine', 'rForearm': 'rUpperArm', 'rHand': 'rForearm', 'lThigh': 'hips', 'lShin': 'lThigh', 'lFoot': 'lShin',
          'rThigh': 'hips', 'rShin': 'rThigh', 'rFoot': 'rShin'}
if arm:
    mp = cfg['map']; bones = {b.name: b for b in arm.data.bones}
    def target(bn):
        b = bones[bn]
        while b is not None:
            if b.name in mp: return mp[b.name]
            b = b.parent
        return 'hips'
    vg = body.vertex_groups; inv = {v: k for k, v in mp.items()}
    for g in list(vg):
        if g.name in mp or g.name not in bones: continue
        t = inv[target(g.name)]; tg = vg.get(t) or vg.new(name=t)
        gi = g.index
        for v in body.data.vertices:
            for e in v.groups:
                if e.group == gi and e.weight > 0: tg.add([v.index], e.weight, 'ADD')
        vg.remove(g)
    for g in vg:
        if g.name in mp: g.name = mp[g.name]
    # joint rest positions straight from the glTF node hierarchy (Blender's edit bones can be degenerate for
    # Sketchfab/CC rigs); glTF (x, y, z) -> Blender (x, -z, y), then the same normalisation as the mesh
    import struct
    raw = open(src, 'rb').read(); jl = struct.unpack('<I', raw[12:16])[0]; gj = json.loads(raw[20:20 + jl])
    def lm(nd):
        if 'matrix' in nd: return np.array(nd['matrix']).reshape(4, 4).T
        t = nd.get('translation', [0, 0, 0]); x, y, z, w = nd.get('rotation', [0, 0, 0, 1]); sc_ = nd.get('scale', [1, 1, 1])
        R = np.array([[1-2*(y*y+z*z), 2*(x*y-z*w), 2*(x*z+y*w)], [2*(x*y+z*w), 1-2*(x*x+z*z), 2*(y*z-x*w)], [2*(x*z-y*w), 2*(y*z+x*w), 1-2*(x*x+y*y)]])
        M = np.eye(4); M[:3, :3] = R * np.array(sc_); M[:3, 3] = t; return M
    GW = {}
    def gw(i, P):
        M = P @ lm(gj['nodes'][i]); GW[i] = M
        for c in gj['nodes'][i].get('children', []): gw(c, M)
    for r in gj['scenes'][0]['nodes']: gw(r, np.eye(4))
    heads = {}
    for i, nd in enumerate(gj['nodes']):
        if nd.get('name') in mp:
            x, y, z = GW[i][:3, 3]; heads[mp[nd['name']]] = (mathutils.Vector((x, -z, y)) + off) * s
    tails = {}
    bpy.data.objects.remove(arm)
else:
    # static mesh: joints from the silhouette (front = -Y in Blender)
    co = np.array([v.co[:] for v in body.data.vertices]); X, Y, Z = co[:, 0], co[:, 1], co[:, 2]
    h = H
    def slab(z0, z1, m=None):
        k = (Z > z0) & (Z < z1)
        return co[k if m is None else k & m]
    hipZ = cfg.get('hipZ', 0.53) * h
    torso = slab(0.3 * h, 0.82 * h, np.abs(X) < 0.13 * h)
    cy = float(np.median(torso[:, 1]))
    J = {}
    J['hips'] = np.array([0, cy, hipZ]); J['spine'] = np.array([0, cy, hipZ + 0.05 * h])
    J['neck'] = np.array([0, cy, cfg.get('neckZ', 0.835) * h]); J['head'] = np.array([0, cy, cfg.get('headZ', 0.875) * h])
    shZ = cfg.get('shoulderZ', 0.80) * h; shX = cfg.get('shoulderX', 0.105) * h
    for sd, sgn in (('l', 1), ('r', -1)):
        # legs: per-slab centroid of the side's points
        def legc(z):
            p = slab(z - 0.02 * h, z + 0.02 * h, (X * sgn > 0.0) & (np.abs(X) < 0.16 * h)); return p.mean(0)
        J[sd + 'Thigh'] = np.array([sgn * 0.05 * h, cy, hipZ - 0.03 * h]); kn = legc(0.27 * h); an = legc(0.055 * h)
        J[sd + 'Shin'] = kn; J[sd + 'Foot'] = np.array([an[0], an[1], 0.05 * h])
        # arm: points outside the torso on this side above the hips
        sh = np.array([sgn * shX, cy, shZ])
        m = (X * sgn > cfg.get('armX', 0.12) * h) & (Z > hipZ) & (Z < shZ + 0.04 * h)
        ap = co[m]; d = np.linalg.norm(ap - sh, axis=1); tip = ap[d.argmax()]
        L = tip - sh; t = (ap - sh) @ L / (L @ L)
        el = ap[(t > 0.40) & (t < 0.50)].mean(0); wr = ap[(t > 0.74) & (t < 0.80)].mean(0)
        J[sd + 'UpperArm'] = sh; J[sd + 'Forearm'] = el; J[sd + 'Hand'] = wr
        J['_' + sd + 'tip'] = tip
        J['_' + sd + 'toe'] = slab(0, 0.04 * h, X * sgn > 0)[slab(0, 0.04 * h, X * sgn > 0)[:, 1].argmin()]
    heads = {k: mathutils.Vector(v) for k, v in J.items() if not k.startswith('_')}
    # segments for skin weights
    seg = {'hips': (J['hips'] - [0, 0, 0.06 * h], J['spine']), 'spine': (J['spine'], J['neck']), 'neck': (J['neck'], J['head']),
           'head': (J['head'], J['head'] + [0, 0, 0.12 * h])}
    for sd in 'lr':
        seg[sd + 'UpperArm'] = (J[sd + 'UpperArm'], J[sd + 'Forearm']); seg[sd + 'Forearm'] = (J[sd + 'Forearm'], J[sd + 'Hand'])
        seg[sd + 'Hand'] = (J[sd + 'Hand'], J['_' + sd + 'tip']); seg[sd + 'Thigh'] = (J[sd + 'Thigh'], J[sd + 'Shin'])
        seg[sd + 'Shin'] = (J[sd + 'Shin'], J[sd + 'Foot']); seg[sd + 'Foot'] = (J[sd + 'Foot'], J['_' + sd + 'toe'])
    names = list(seg.keys()); D = np.zeros((len(co), len(names)))
    for i, n in enumerate(names):
        a, b = np.array(seg[n][0], float), np.array(seg[n][1], float); ab = b - a
        t = np.clip(((co - a) @ ab) / max(ab @ ab, 1e-9), 0, 1); D[:, i] = np.linalg.norm(co - (a + t[:, None] * ab), axis=1)
        side = n[0] if n[0] in 'lr' and n[1].isupper() else None
        if side:  # limb bones never take vertices from the other side of the body
            sg = 1 if side == 'l' else -1; D[X * sg < -0.01 * h, i] += 10
        if 'Thigh' in n or 'Shin' in n or 'Foot' in n: D[Z > hipZ + 0.03 * h, i] += 10
        if n in ('neck', 'head'): D[Z < (cfg.get('neckZ', 0.835) - 0.035) * h, i] += 10
    dmin = D.min(1, keepdims=True); W = np.exp(-(D - dmin) / (0.018 * h)); W[D - dmin > 0.06 * h] = 0
    top = np.argsort(-W, 1)[:, :4]
    for g in list(body.vertex_groups): body.vertex_groups.remove(g)
    groups = {n: body.vertex_groups.new(name=n) for n in GAME}
    for vi in range(len(co)):
        ws = W[vi, top[vi]]; ws = ws / ws.sum()
        for k, w in zip(top[vi], ws):
            if w > 0.02: groups[names[k]].add([vi], float(w), 'REPLACE')
    tails = {}
print('joints', {k: tuple(round(x, 3) for x in v) for k, v in heads.items()})
# build the game armature (bone tails toward children; leaf bones get a short tail)
ad = bpy.data.armatures.new('rig'); ao = bpy.data.objects.new('rig', ad); sc.collection.objects.link(ao)
sel([ao]); bpy.ops.object.mode_set(mode='EDIT')
child = {}
for c, p in PARENT.items(): child.setdefault(p, c)
child.update({'spine': 'neck', 'lUpperArm': 'lForearm', 'rUpperArm': 'rForearm'})
eb = {}
for n in GAME:
    b = ad.edit_bones.new(n); b.head = heads[n]
    c = child.get(n); tl = heads[c] if c in heads else heads[n] + mathutils.Vector((0, 0, 0.08)) if n in ('head', 'neck') else heads[n] + (heads[n] - heads[PARENT[n]]).normalized() * 0.08
    if (tl - b.head).length < 0.01: tl = b.head + mathutils.Vector((0, 0, 0.05))
    b.tail = tl; eb[n] = b
for n, p in PARENT.items(): eb[n].parent = eb[p]
bpy.ops.object.mode_set(mode='OBJECT')
for m in list(body.modifiers): body.modifiers.remove(m)
body.parent = ao; md = body.modifiers.new('arm', 'ARMATURE'); md.object = ao
for g in list(body.vertex_groups):
    if g.name not in GAME: print('stray group', g.name); body.vertex_groups.remove(g)
# limit to 4 influences + normalise
sel([body]); bpy.ops.object.mode_set(mode='WEIGHT_PAINT')
bpy.ops.object.vertex_group_limit_total(group_select_mode='ALL', limit=4); bpy.ops.object.vertex_group_normalize_all(lock_active=False)
bpy.ops.object.mode_set(mode='OBJECT')
# --- atlas bake -----------------------------------------------------------------------------------------------------------
me = body.data
src_uv = me.uv_layers.active.name if me.uv_layers.active else None
for l in me.uv_layers: l.active_render = (l.name == src_uv)
atl = me.uv_layers.new(name='atlas'); me.uv_layers.active = atl
sel([body]); bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT')
sc.tool_settings.use_uv_select_sync = True
bpy.ops.uv.smart_project(angle_limit=math.radians(60), island_margin=0.002, area_weight=1.0)
bpy.ops.uv.select_all(action='SELECT'); bpy.ops.uv.average_islands_scale(); bpy.ops.uv.pack_islands(rotate=True, margin=0.002)
print('packed')
bpy.ops.object.mode_set(mode='OBJECT')
sc.render.engine = 'CYCLES'; sc.cycles.samples = 1; sc.cycles.device = 'CPU'; sc.render.bake.margin = 6
has_alpha = cfg.get('alpha', False)
imgs = {k: bpy.data.images.new('zb_' + k, TEX, TEX, alpha=(k == 'base' and has_alpha)) for k in ('base', 'normal', 'rough', 'alpha')}
for k in ('normal', 'rough', 'alpha'): imgs[k].colorspace_settings.name = 'Non-Color'
mats = [m for m in me.materials if m]
def set_target(img):
    for m in mats:
        m.use_nodes = True; nt_ = m.node_tree
        n = nt_.nodes.get('__bake') or nt_.nodes.new('ShaderNodeTexImage'); n.name = '__bake'; n.image = img
        for x in nt_.nodes: x.select = False
        n.select = True; nt_.nodes.active = n
def bake(kind, img, **kw):
    set_target(img); sel([body]); bpy.ops.object.bake(type=kind, **kw); print('baked', kind)
bake('DIFFUSE', imgs['base'], pass_filter={'COLOR'})
bake('NORMAL', imgs['normal'])
bake('ROUGHNESS', imgs['rough'])
if has_alpha:
    for m in mats:  # alpha -> emission, bake EMIT
        nt_ = m.node_tree; bsdf = next((n for n in nt_.nodes if n.type == 'BSDF_PRINCIPLED'), None)
        out = next(n for n in nt_.nodes if n.type == 'OUTPUT_MATERIAL'); em = nt_.nodes.new('ShaderNodeEmission')
        a_in = bsdf.inputs['Alpha'] if bsdf else None
        if a_in and a_in.is_linked: nt_.links.new(a_in.links[0].from_socket, em.inputs['Color'])
        else: em.inputs['Color'].default_value = (1, 1, 1, 1) if not a_in else (a_in.default_value,) * 3 + (1,)
        nt_.links.new(em.outputs[0], out.inputs['Surface'])
    bake('EMIT', imgs['alpha'])
    b = np.array(imgs['base'].pixels[:]).reshape(-1, 4); a = np.array(imgs['alpha'].pixels[:]).reshape(-1, 4)
    b[:, 3] = np.where(a[:, 0] > 0.5, 1.0, 0.0); imgs['base'].pixels[:] = b.ravel()
# --- final material ---------------------------------------------------------------------------------------------------
fm = bpy.data.materials.new('zombie_' + cfg.get('name', 'x')); fm.use_nodes = True; nt_ = fm.node_tree
bsdf = nt_.nodes['Principled BSDF']; bsdf.inputs['Metallic'].default_value = 0
tb = nt_.nodes.new('ShaderNodeTexImage'); tb.image = imgs['base']; nt_.links.new(tb.outputs['Color'], bsdf.inputs['Base Color'])
if has_alpha: nt_.links.new(tb.outputs['Alpha'], bsdf.inputs['Alpha']); fm.blend_method = 'CLIP' if hasattr(fm, 'blend_method') else None
tn = nt_.nodes.new('ShaderNodeTexImage'); tn.image = imgs['normal']; nm = nt_.nodes.new('ShaderNodeNormalMap'); nm.uv_map = 'atlas'
nt_.links.new(tn.outputs['Color'], nm.inputs['Color']); nt_.links.new(nm.outputs['Normal'], bsdf.inputs['Normal'])
tr = nt_.nodes.new('ShaderNodeTexImage'); tr.image = imgs['rough']; sep = nt_.nodes.new('ShaderNodeSeparateColor')
nt_.links.new(tr.outputs['Color'], sep.inputs['Color']); nt_.links.new(sep.outputs['Green'], bsdf.inputs['Roughness'])
me.materials.clear(); me.materials.append(fm)
for l in [l for l in me.uv_layers if l.name != 'atlas']: me.uv_layers.remove(l)
me.uv_layers['atlas'].active = True; me.uv_layers['atlas'].active_render = True
for k, im in imgs.items():
    im.file_format = 'PNG' if (k == 'base' and has_alpha) else 'JPEG'; im.pack()
body.name = me.name = 'zombie_' + cfg.get('name', 'x')
bpy.data.objects.remove(bpy.data.objects.get('Icosphere')) if bpy.data.objects.get('Icosphere') else None
sel([ao, body], ao)
bpy.ops.export_scene.gltf(filepath=dst, export_format='GLB', use_selection=True, export_animations=False,
                          export_image_format='AUTO', export_jpeg_quality=88, export_morph=False)
print('EXPORTED', dst)
