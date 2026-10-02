"""Herbs from the user's RE0 herb model (/data/assets_in/herb.glb): the plant is planted into the pot of the old
Blender herb (terracotta + soil kept), recoloured for red / blue, combined for mixed herbs.
Run: python3 tools/import/herbs.py   -> src/assets/models/item_herb_*.glb"""
import bpy, bmesh, math, mathutils, os, random, colorsys
import numpy as np
from PIL import Image
SRC = '/data/assets_in/herb.glb'; DST = '/data/cv-remake/src/assets/models'; TMP = '/data/assets_in/herbtex'
os.makedirs(TMP, exist_ok=True)

def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)

def import_glb(p):
    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=p)
    objs = [o for o in bpy.data.objects if o not in before]
    for o in objs: o.select_set(o.type == 'MESH')
    meshes = [o for o in objs if o.type == 'MESH']
    bpy.context.view_layer.objects.active = meshes[0]
    # bake transforms, drop empties
    bpy.ops.object.parent_clear(type='CLEAR_KEEP_TRANSFORM')
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    for o in objs:
        if o.type != 'MESH': bpy.data.objects.remove(o)
    if len(meshes) > 1: bpy.ops.object.join()
    return bpy.context.view_layer.objects.active

def recolor(img_path, hue_to, out):
    """shift green pixels (hue 50..170 deg) to the target hue, keep value; slightly boost saturation"""
    im = Image.open(img_path).convert('RGBA'); a = np.asarray(im).astype(np.float32) / 255
    rgb = a[..., :3]; mx = rgb.max(-1); mn = rgb.min(-1); d = mx - mn + 1e-6
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    h = np.where(mx == r, ((g - b) / d) % 6, np.where(mx == g, (b - r) / d + 2, (r - g) / d + 4)) * 60
    s = np.where(mx > 0, d / (mx + 1e-6), 0); v = mx
    m = ((h > 45) & (h < 175) & (s > 0.12)).astype(np.float32)
    w = m * np.clip((s - 0.12) / 0.15, 0, 1)
    h2 = np.where(w > 0, hue_to, h); s2 = np.clip(s * 1.45 + 0.08, 0, 1)
    v2 = np.clip(v * 1.2, 0, 1)
    # hsv -> rgb
    c = v2 * s2; x = c * (1 - np.abs((h2 / 60) % 2 - 1)); mm = v2 - c
    k = (h2 // 60).astype(int) % 6
    lut = [(c, x, 0 * c), (x, c, 0 * c), (0 * c, c, x), (0 * c, x, c), (x, 0 * c, c), (c, 0 * c, x)]
    out_rgb = np.zeros_like(rgb)
    for i, (R, G, B) in enumerate(lut):
        sel = k == i
        out_rgb[..., 0][sel] = (R + mm)[sel]; out_rgb[..., 1][sel] = (G + mm)[sel]; out_rgb[..., 2][sel] = (B + mm)[sel]
    res = rgb * (1 - w[..., None]) + out_rgb * w[..., None]
    a[..., :3] = res
    Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8)).resize((512, 512), Image.LANCZOS).save(out)

# --- prepare recoloured textures once
reset(); p = import_glb(SRC)
imgs = []
for ms in p.material_slots:
    for n in ms.material.node_tree.nodes:
        if n.type == 'TEX_IMAGE' and n.image and n.image not in imgs: imgs.append(n.image)
paths = {}
for i, im in enumerate(imgs):
    base = os.path.join(TMP, f'herb_{i}.png'); im.filepath_raw = base; im.file_format = 'PNG'; im.save()
    paths[im.name] = base
    Image.open(base).convert('RGBA').resize((512, 512), Image.LANCZOS).save(os.path.join(TMP, f'herb_{i}_g.png'))
    recolor(base, 352, os.path.join(TMP, f'herb_{i}_r.png'))
    recolor(base, 228, os.path.join(TMP, f'herb_{i}_b.png'))
print('textures', paths)

def plant(col, scale, x, y, yaw, soil_z):
    o = import_glb(SRC)
    lo = mathutils.Vector([min(v.co[i] for v in o.data.vertices) for i in range(3)])
    hi = mathutils.Vector([max(v.co[i] for v in o.data.vertices) for i in range(3)])
    ctr = (lo + hi) / 2
    # stem base ~ where roots start: take the xy of the lowest 40% verts' upper boundary -> use bbox centre
    for v in o.data.vertices:
        v.co = (v.co - mathutils.Vector((ctr.x, ctr.y, lo.z))) * scale
    o.rotation_euler = (0, 0, yaw); o.location = (x, y, soil_z - 0.36 * scale)
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    # per-colour material copies with swapped textures
    for ms in o.material_slots:
        m = ms.material.copy(); m.name = ms.material.name + '_' + col; ms.material = m
        for n in m.node_tree.nodes:
            if n.type == 'TEX_IMAGE' and n.image:
                i = list(paths).index(n.image.name) if n.image.name in paths else 0
                n.image = bpy.data.images.load(os.path.join(TMP, f'herb_{i}_{col}.png'), check_existing=True)
        m.blend_method = 'CLIP' if hasattr(m, 'blend_method') else None
    return o

LAYOUT = {1: [(0, 0)], 2: [(-0.024, 0.0), (0.024, 0.0)], 3: [(-0.024, -0.015), (0.024, -0.015), (0.0, 0.026)]}
for hid in ['g', 'r', 'b', 'gg', 'gr', 'gb', 'ggg', 'grb']:
    reset()
    pot = import_glb(f'/data/assets_in/item_herb_{hid}.orig.glb')
    keep = {i for i, ms in enumerate(pot.material_slots) if ms.material and ms.material.name.split('.')[0] in ('terracotta', 'soil')}
    soil = [i for i, ms in enumerate(pot.material_slots) if ms.material and ms.material.name.startswith('soil')]
    bm = bmesh.new(); bm.from_mesh(pot.data)
    soil_z = max((v.co.z for f in bm.faces if f.material_index in soil for v in f.verts), default=0.09)
    bmesh.ops.delete(bm, geom=[f for f in bm.faces if f.material_index not in keep], context='FACES')
    bm.to_mesh(pot.data); bm.free()
    n = len(hid); rnd = random.Random(hash(hid) & 0xffff)
    sc = {1: 0.2, 2: 0.17, 3: 0.155}[n]
    parts = [pot]
    for (x, y), c in zip(LAYOUT[n], hid):
        parts.append(plant(c, sc, x, y, rnd.uniform(0, math.tau), soil_z))
    for o in bpy.context.selected_objects: o.select_set(False)
    for o in parts: o.select_set(True)
    bpy.context.view_layer.objects.active = pot; bpy.ops.object.join()
    pot.name = f'item_herb_{hid}'
    bpy.ops.export_scene.gltf(filepath=f'/data/assets_in/out_herb_{hid}.glb', export_format='GLB', use_selection=True, export_apply=True)
    print('herb', hid, 'soil', round(soil_z, 3))
