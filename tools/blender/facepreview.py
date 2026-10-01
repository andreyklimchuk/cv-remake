"""Quick likeness iteration: CV=claire|steve PYTHONPATH=/data/pylib python3 tools/facepreview.py out.png
Renders before/after (front + 3/4) of the HBM head with the faceshape profile, Workbench engine."""
import sys, os, math, importlib; sys.path.insert(0, '/data/assets_src/tools')
from lib import *
import faceshape; importlib.reload(faceshape)
import bpy, numpy as np
from mathutils import Vector, Euler
who = os.environ.get('CV', 'claire'); out = sys.argv[-1]
sc = reset()
g = 'female' if who == 'claire' else 'male'
names = [f'GEO-body_{g}_realistic', f'GEO-body_{g}_realistic.eye.L', f'GEO-body_{g}_realistic.eye.R']
ob = append(names); body, eL, eR = [ob[n] for n in names]
for e in (eL, eR): unparent_keep(e)
off = body.matrix_world.translation.copy()
for o in (body, eL, eR): o.location -= off
for o in (body, eL, eR): apply_transform(o)
with ctx(body): bpy.ops.object.multires_base_apply(modifier=body.modifiers[0].name)
body.modifiers[0].levels = 2; apply_modifier(body, body.modifiers[0].name); shade_smooth(body)
ce = lambda e: V(e).mean(0)
P = V(body); head = P[:, 2] > ce(eL)[2] - 0.16
L = faceshape.landmarks(P[head], ce(eL), ce(eR))
print({k: np.round(v, 4).tolist() if hasattr(v, 'tolist') else v for k, v in L.items()})
before = dup(body, 'before'); be = [dup(eL, 'bl'), dup(eR, 'br')]
prof = getattr(faceshape, who.upper())
over = os.environ.get('PROF')
if over: prof = dict(prof, **eval(over))
faceshape.apply([body], L, prof, lambda Q: Q[:, 2] > ce(eL)[2] - 0.16)
M = L['M']
dx = 0.22
for o in [before] + be: o.location.x -= dx
for o in (body, eL, eR): o.location.x += 0
sc.render.engine = 'BLENDER_WORKBENCH'
sh = sc.display.shading; sh.light = 'STUDIO'; sh.color_type = 'SINGLE'; sh.single_color = (0.85, 0.66, 0.56)
sh.show_cavity = True; sh.cavity_type = 'BOTH'; sh.show_specular_highlight = True
sc.render.resolution_x = 360; sc.render.resolution_y = 440; sc.render.film_transparent = False
sc.world = bpy.data.worlds.new('w') if not sc.world else sc.world
cam = bpy.data.cameras.new('c'); cam.lens = 105; co = bpy.data.objects.new('c', cam); link(co); sc.camera = co
imgs = []
for k, (ox, yaw) in enumerate(((-dx, 0), (0, 0), (-dx, 38), (0, 38))):
    c = Vector((M[0] + ox, M[1], M[2] - 0.02)); r = 0.62; a = math.radians(yaw)
    co.location = c + Vector((math.sin(a) * r, -math.cos(a) * r, 0.01))
    co.rotation_euler = Euler((math.radians(90), 0, a))
    f = f'/tmp/fp_{k}.png'; sc.render.filepath = f; bpy.ops.render.render(write_still=True); imgs.append(f)
os.system(f'magick {" ".join(imgs)} +append {out}')
print('saved', out)
