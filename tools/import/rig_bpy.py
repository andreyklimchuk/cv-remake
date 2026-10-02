"""Generic rig importer (Blender bpy): renames the bones of a user GLB to the game rig names, merges the weights of
every unmapped bone into its nearest mapped ancestor, removes those bones, strips animations, optional texture
downscale, exports GLB. Usage (python3, bpy module):
  python3 tools/import/rig_bpy.py src.glb dst.glb '{"0_01":"hips",...}' [maxTex] [yaw_deg]"""
import bpy, sys, json, math, mathutils
src, dst, mp = sys.argv[1], sys.argv[2], json.loads(sys.argv[3])
max_tex = int(sys.argv[4]) if len(sys.argv) > 4 else 1024
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=src)
arm = next(o for o in bpy.context.scene.objects if o.type == 'ARMATURE')
meshes = [o for o in bpy.context.scene.objects if o.type == 'MESH' and any(m.type == 'ARMATURE' for m in o.modifiers)]
for o in [o for o in bpy.context.scene.objects if o.type == 'MESH' and o not in meshes]:
    print('drop unskinned mesh', o.name); bpy.data.objects.remove(o)
# strip glTF node suffixes? names in bpy are the node names as-is
bones = {b.name: b for b in arm.data.bones}
def target(bn):
    b = bones[bn]
    while b is not None:
        if b.name in mp: return mp[b.name]
        b = b.parent
    return None
merge = {}
for bn in bones:
    if bn not in mp:
        t = target(bn)
        if t is None:  # above the hips: merge into the first mapped descendant root ("hips")
            t = 'hips'
        merge[bn] = t
# weights
for o in meshes:
    vg = o.vertex_groups
    for bn, t in merge.items():
        g = vg.get(bn)
        if not g: continue
        tn = next(k for k, v in mp.items() if v == t)
        tg = vg.get(tn) or vg.new(name=tn)
        for v in o.data.vertices:
            for e in v.groups:
                if e.group == g.index and e.weight > 0: tg.add([v.index], e.weight, 'ADD')
        vg.remove(g)
# delete merged bones, rename mapped
bpy.context.view_layer.objects.active = arm; arm.select_set(True)
bpy.ops.object.mode_set(mode='EDIT')
eb = arm.data.edit_bones
for bn in merge:
    if bn in eb: eb.remove(eb[bn])
bpy.ops.object.mode_set(mode='OBJECT')
for o in meshes:
    for g in o.vertex_groups:
        if g.name in mp: g.name = mp[g.name]
for b in arm.data.bones:
    if b.name in mp: b.name = mp[b.name]
arm.animation_data_clear()
for a in list(bpy.data.actions): bpy.data.actions.remove(a)
for im in bpy.data.images:
    if im.size[0] > max_tex: im.scale(max_tex, max(1, im.size[1] * max_tex // im.size[0]))
import os
if os.environ.get('DECIMATE'):  # optional polygon budget (collapse keeps vertex-group weights)
    r = float(os.environ['DECIMATE'])
    for o in meshes:
        md = o.modifiers.new('dec', 'DECIMATE'); md.ratio = r
        bpy.context.view_layer.objects.active = o
        while o.modifiers[0].name != 'dec': bpy.ops.object.modifier_move_up(modifier='dec')
        bpy.ops.object.modifier_apply(modifier='dec')
print('BONES', [b.name for b in arm.data.bones])
bpy.ops.export_scene.gltf(filepath=dst, export_format='GLB', export_animations=False, export_image_format='JPEG' if max_tex <= 1024 else 'AUTO', export_jpeg_quality=88)
