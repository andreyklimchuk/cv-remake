import sys; sys.path.insert(0, '/data/assets_src/tools')
from lib import *
S = 1.70 / 1.641
SOLE = 0.022
sc = reset()
names = ['GEO-body_female_realistic', 'GEO-body_female_realistic.eye.L', 'GEO-body_female_realistic.eye.R']
ob = append(names)
body, eL, eR = ob[names[0]], ob[names[1]], ob[names[2]]
for e in (eL, eR): unparent_keep(e)
off = body.matrix_world.translation.copy()
for o in (body, eL, eR): o.location -= off
# ---- multires: fit base to sculpt, keep a level-3 copy for normal baking
with ctx(body): bpy.ops.object.multires_base_apply(modifier=body.modifiers[0].name)
high = dup(body, 'claire_high')
high.modifiers[0].levels = 3
apply_modifier(high, high.modifiers[0].name)
body0 = dup(body, 'claire_body_l0')
body0.modifiers.remove(body0.modifiers[0])
body.modifiers[0].levels = 1
apply_modifier(body, body.modifiers[0].name)
shade_smooth(body)
body.name = 'claire_body'; body.data.name = 'claire_body'
eL.name, eR.name = 'claire_eye_L', 'claire_eye_R'
for o in (body, body0, high, eL, eR):
    o.location = o.location * S + Vector((0, 0, SOLE)); o.scale = (S, S, S)
    apply_transform(o)
# CV likeness: reshape the face (same smooth field on every LOD)
import faceshape
_ez = V(eL).mean(0)[2] - 0.16 * S
_P = V(body); _L = faceshape.landmarks(_P[_P[:, 2] > _ez], V(eL).mean(0), V(eR).mean(0))
faceshape.apply([body, body0, high], _L, faceshape.CLAIRE, lambda Q: Q[:, 2] > _ez)
print('high faces', len(high.data.polygons), 'low', len(body.data.polygons))

def J(v): return Vector(v) * S + Vector((0, 0, SOLE))
joints = {
    'hips': J((0, 0.005, 0.905)), 'spine': J((0, 0.01, 0.985)), 'neck': J((0, -0.01, 1.40)),
    'head': J((0, -0.035, 1.475)), 'headTop': J((0, -0.03, 1.64)),
}
for s, sx in (('l', 1), ('r', -1)):
    joints.update({
        s + 'UpperArm': J((0.165 * sx, 0.01, 1.315)), s + 'Forearm': J((0.238 * sx, 0.02, 1.07)),
        s + 'Hand': J((0.337 * sx, -0.022, 0.884)), s + 'HandTip': J((0.395 * sx, -0.07, 0.765)),
        s + 'Thigh': J((0.085 * sx, 0.0, 0.865)), s + 'Shin': J((0.110 * sx, 0.0, 0.46)),
        s + 'Foot': J((0.12 * sx, 0.045, 0.08)), s + 'Toe': J((0.13 * sx, -0.10, 0.02)),
    })
joints['lEye'] = eL.matrix_world.translation.copy() if False else Vector(np.array([v.co[:] for v in eL.data.vertices]).mean(0))
joints['rEye'] = Vector(np.array([v.co[:] for v in eR.data.vertices]).mean(0))

# ---- armature (bone names == game rig names)
arm_data = bpy.data.armatures.new('claire_rig'); rig = bpy.data.objects.new('claire_rig', arm_data); link(rig)
select_only([rig], rig); bpy.ops.object.mode_set(mode='EDIT')
eb = arm_data.edit_bones
def bone(name, head, tail, parent=None, deform=True):
    b = eb.new(name); b.head = head; b.tail = tail; b.use_deform = deform
    if parent: b.parent = eb[parent]
    return b
bone('hips', joints['hips'], joints['spine'])
bone('spine', joints['spine'], joints['neck'], 'hips')
bone('neck', joints['neck'], joints['head'], 'spine')
bone('head', joints['head'], joints['headTop'], 'neck')
for s in 'lr':
    bone(s + 'UpperArm', joints[s + 'UpperArm'], joints[s + 'Forearm'], 'spine')
    bone(s + 'Forearm', joints[s + 'Forearm'], joints[s + 'Hand'], s + 'UpperArm')
    bone(s + 'Hand', joints[s + 'Hand'], joints[s + 'HandTip'], s + 'Forearm')
    bone(s + 'Thigh', joints[s + 'Thigh'], joints[s + 'Shin'], 'hips')
    bone(s + 'Shin', joints[s + 'Shin'], joints[s + 'Foot'], s + 'Thigh')
    bone(s + 'Foot', joints[s + 'Foot'], joints[s + 'Toe'], s + 'Shin')
    bone(s + 'Eye', joints[s + 'Eye'], joints[s + 'Eye'] + Vector((0, -0.02, 0)), 'head', deform=False)
bpy.ops.object.mode_set(mode='OBJECT')

# ---- automatic (bone-heat) weights for the body
select_only([body0, rig], rig)
with ctx(rig, [body0, rig]): bpy.ops.object.parent_set(type='ARMATURE_AUTO')
transfer_weights(body, body0)
body.parent = rig
m = body.modifiers.new('rig', 'ARMATURE'); m.object = rig
W = weights(body, [g.name for g in body.vertex_groups]); print('unweighted verts', int((W.sum(1) < 0.5).sum()), 'of', len(W))
body0.hide_render = True
print('vgroups', [g.name for g in body.vertex_groups])
for b in arm_data.bones: b.use_deform = True
for e, s in ((eL, 'l'), (eR, 'r')):
    rigid_weight(e, s + 'Eye'); e.parent = rig
    m = e.modifiers.new('rig', 'ARMATURE'); m.object = rig

import json
json.dump({k: list(v) for k, v in joints.items()}, open('/data/assets_src/work/claire_joints.json', 'w'), indent=1)
bpy.ops.wm.save_as_mainfile(filepath='/data/assets_src/work/claire_s1.blend')
print('stage1 done')
