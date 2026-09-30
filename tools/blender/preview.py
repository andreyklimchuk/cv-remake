"""Workbench preview renders: python3 preview.py file.blend out_prefix 'key=val,...' view1 view2 ..."""
import sys; sys.path.insert(0, '/data/assets_src/tools')
import bpy, math
from mathutils import Vector
args = sys.argv[sys.argv.index('--') + 1:]
bpy.ops.wm.open_mainfile(filepath=args[0])
prefix, keys, views = args[1], args[2], args[3:]
sc = bpy.context.scene
for o in sc.objects:
    if o.type == 'MESH' and o.data.shape_keys:
        for kv in keys.split(','):
            if '=' in kv:
                k, v = kv.split('='); kb = o.data.shape_keys.key_blocks.get(k)
                if kb: kb.value = float(v)
    if o.name.endswith('_high'): o.hide_render = True
sc.render.engine = 'BLENDER_WORKBENCH'
sc.display.shading.light = 'STUDIO'; sc.display.shading.color_type = 'RANDOM'
sc.display.shading.show_cavity = True
sc.render.resolution_x = 700; sc.render.resolution_y = 700
cam = bpy.data.cameras.new('pc'); cam.type = 'ORTHO'; cam.clip_start = 0.001
co = bpy.data.objects.new('pc', cam); sc.collection.objects.link(co); sc.camera = co
VIEWS = {  # name: (target, direction to camera, ortho scale)
 'face': ((0, -0.1, 1.61), (0, -1, 0), 0.26), 'face34': ((0.0, -0.1, 1.61), (0.7, -1, 0.05), 0.28),
 'faceside': ((0, -0.05, 1.61), (1, 0, 0), 0.3),
 'lhand': ((0.37, -0.06, 0.86), (1, 0, 0), 0.32), 'lhandm': ((0.37, -0.06, 0.86), (0, -1, 0), 0.32),
 'rhand': ((-0.37, -0.06, 0.86), (-1, 0, 0), 0.32),
 'full': ((0, 0, 0.9), (0, -1, 0), 2.0), 'fullside': ((0, 0, 0.9), (1, 0, 0), 2.0), 'fullback': ((0, 0, 0.9), (0, 1, 0), 2.0),
 'full34': ((0, 0, 0.9), (0.8, -1, 0.1), 2.0), 'torso': ((0, 0, 1.2), (0.5, -1, 0.1), 0.8), 'back': ((0, 0, 1.25), (0, 1, 0.1), 0.8),
 'legs': ((0, 0, 0.5), (0.6, -1, 0.1), 1.1), 'feet': ((0, -0.05, 0.1), (0.7, -1, 0.3), 0.5), 'head34': ((0, -0.02, 1.62), (0.9, -0.8, 0.1), 0.42),
 'headback': ((0, 0.02, 1.55), (0.3, 1, 0.1), 0.6), 'hip': ((0, 0, 0.95), (0.7, -1, 0.1), 0.6),
}
for v in views:
    name, _, extra = v.partition(':')
    t, d, s = VIEWS[name]
    t = Vector(t); d = Vector(d).normalized()
    cam.ortho_scale = s
    co.location = t + d * 3; co.rotation_euler = (-d).to_track_quat('-Z', 'Y').to_euler()
    sc.render.filepath = f'{prefix}_{name}.png'; bpy.ops.render.render(write_still=True)
