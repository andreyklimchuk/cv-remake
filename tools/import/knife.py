"""Combat knife (user asset /data/assets_in/knife.glb) -> weapon_knife.glb in the game convention:
three.js +Z = blade forward, +Y = spine up, origin at the grip, total length 0.30 m."""
import bpy, math, mathutils
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath='/data/assets_in/knife.glb')
objs = list(bpy.context.scene.objects)
for o in objs: o.select_set(o.type == 'MESH')
ms = [o for o in objs if o.type == 'MESH']; bpy.context.view_layer.objects.active = ms[0]
bpy.ops.object.parent_clear(type='CLEAR_KEEP_TRANSFORM'); bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
for o in objs:
    if o.type != 'MESH': bpy.data.objects.remove(o)
bpy.ops.object.join(); o = bpy.context.view_layer.objects.active
R = mathutils.Matrix.Rotation(math.radians(90), 4, 'X')
o.data.transform(R)
vs = [v.co for v in o.data.vertices]
lo = mathutils.Vector([min(v[i] for v in vs) for i in range(3)]); hi = mathutils.Vector([max(v[i] for v in vs) for i in range(3)])
s = 0.30 / (hi.y - lo.y)
T = mathutils.Matrix.Translation((-(lo.x + hi.x) / 2 * s, -0.22 - lo.y * s, -(lo.z + hi.z) / 2 * s)) @ mathutils.Matrix.Scale(s, 4)
o.data.transform(T); o.name = 'weapon_knife'
bpy.ops.export_scene.gltf(filepath='/data/cv-remake/src/assets/models/weapon_knife.glb', export_format='GLB', use_selection=True)
