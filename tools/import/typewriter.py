"""Underwood No.5 typewriter (user asset) -> prop_typewriter.glb: drops the stray wrench plane, decimates
541k -> ~35k triangles, textures 512 JPEG, origin on the floor centre, keys facing three.js +Z, width 0.55 m."""
import bpy, mathutils
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath='/data/assets_in/typewriter.glb')
objs = list(bpy.context.scene.objects)
for o in objs: o.select_set(o.type == 'MESH')
ms = [o for o in objs if o.type == 'MESH']; bpy.context.view_layer.objects.active = ms[0]
bpy.ops.object.parent_clear(type='CLEAR_KEEP_TRANSFORM'); bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
for o in objs:
    if o.type != 'MESH': bpy.data.objects.remove(o)
ms = [o for o in bpy.context.scene.objects if o.type == 'MESH']
def ctr(o):
    pts = [o.matrix_world @ mathutils.Vector(c) for c in o.bound_box]; return sum(pts, mathutils.Vector()) / 8
for o in ms:
    c = ctr(o)
    if any('wrench' in m.name for m in o.data.materials if m) or c.x > -200 or c.y > -1700:
        print('DROP', o.name, c); bpy.data.objects.remove(o)
ms = [o for o in bpy.context.scene.objects if o.type == 'MESH']
for o in ms:
    vs = [o.matrix_world @ v.co for v in o.data.vertices]; print('OB', o.name, [round(min(v[i] for v in vs),3) for i in range(3)], [round(max(v[i] for v in vs),3) for i in range(3)])
total = sum(len(o.data.polygons) for o in ms); target = 35000
for o in ms:
    n = len(o.data.polygons); r = min(1.0, max(target * n / total, 250) / n)
    if r < 0.98:
        m = o.modifiers.new('dec', 'DECIMATE'); m.ratio = r
        bpy.context.view_layer.objects.active = o; bpy.ops.object.modifier_apply(modifier='dec')
for o in ms: o.select_set(True)
bpy.context.view_layer.objects.active = ms[0]; bpy.ops.object.join(); o = bpy.context.view_layer.objects.active
import numpy as np
X = np.array([v.co[:] for v in o.data.vertices]); print('PCT', np.percentile(X, [0, 0.1, 50, 99.9, 100], axis=0).round(1).tolist())
med = np.median(X, 0); bad = np.abs(X - med).max(1) > 400
print('FAR verts', int(bad.sum()))
if bad.any():
    import bmesh
    bm = bmesh.new(); bm.from_mesh(o.data); bm.verts.ensure_lookup_table()
    bmesh.ops.delete(bm, geom=[bm.verts[i] for i in np.nonzero(bad)[0]], context='VERTS'); bm.to_mesh(o.data); bm.free()
vs = [v.co for v in o.data.vertices]
lo = mathutils.Vector([min(v[i] for v in vs) for i in range(3)]); hi = mathutils.Vector([max(v[i] for v in vs) for i in range(3)])
s = 0.55 / (hi.x - lo.x)
o.data.transform(mathutils.Matrix.Scale(s, 4) @ mathutils.Matrix.Translation((-(lo.x + hi.x) / 2, -(lo.y + hi.y) / 2, -lo.z)))
for im in bpy.data.images:
    if im.size[0] > 512: im.scale(512, 512)
o.name = 'prop_typewriter'
vs = [v.co for v in o.data.vertices]; lo = mathutils.Vector([min(v[i] for v in vs) for i in range(3)]); hi = mathutils.Vector([max(v[i] for v in vs) for i in range(3)]); s = 1
print('TRIS', sum(len(p.vertices) - 2 for p in o.data.polygons), 'size', [round(x * s, 3) for x in (hi - lo)])
bpy.ops.export_scene.gltf(filepath='/data/cv-remake/src/assets/models/prop_typewriter.glb', export_format='GLB', use_selection=True,
                          export_image_format='JPEG', export_jpeg_quality=85)
