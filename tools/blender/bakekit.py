"""Texel-space bake kit: position / normal / id / AO / normal-from-high + bump combine, all via Cycles."""
import bpy, numpy as np
from lib import *

def pixels(img):
    w, h = img.size; a = np.zeros(w * h * 4, np.float32); img.pixels.foreach_get(a); return a.reshape(h, w, 4)

def to_image(name, arr, noncolor=False, alpha=False):
    h, w = arr.shape[:2]
    if name in bpy.data.images: bpy.data.images.remove(bpy.data.images[name])
    img = bpy.data.images.new(name, w, h, alpha=alpha, float_buffer=False)
    if noncolor: img.colorspace_settings.name = 'Non-Color'
    out = np.ones((h, w, 4), np.float32)
    if arr.ndim == 2: out[..., 0] = out[..., 1] = out[..., 2] = arr
    else: out[..., :arr.shape[2]] = arr
    img.pixels.foreach_set(np.clip(out, 0, 1).ravel()); img.update(); return img

def _swap_materials(o, mats):
    old = [s.material for s in o.material_slots]
    for i, s in enumerate(o.material_slots): s.material = mats[i] if isinstance(mats, list) else mats
    return old

def _restore(o, old):
    for s, m in zip(o.material_slots, old): s.material = m

def emit_mat(name, kind, color=(0, 0, 0)):
    m, nt, out = node_mat(name)
    e = nt.nodes.new('ShaderNodeEmission'); nt.links.new(e.outputs[0], out.inputs[0])
    if kind == 'const':
        e.inputs['Color'].default_value = (*color, 1)
    else:
        g = nt.nodes.new('ShaderNodeNewGeometry')
        vm = nt.nodes.new('ShaderNodeVectorMath'); vm.operation = 'MULTIPLY_ADD'
        sc = 0.25 if kind == 'pos' else 0.5
        vm.inputs[1].default_value = (sc, sc, sc); vm.inputs[2].default_value = (0.5, 0.5, 0.5)
        nt.links.new(g.outputs['Position' if kind == 'pos' else 'Normal'], vm.inputs[0]); nt.links.new(vm.outputs[0], e.inputs['Color'])
    return m

def ensure_slots(o):
    if len(o.material_slots) == 0:
        o.data.materials.append(bpy.data.materials.new(o.name + '_m'))

def bake_emit(o, size, kind, ids=None):
    ensure_slots(o)
    img = bpy.data.images.new('__%s' % kind, size, size, alpha=True, float_buffer=True)
    if kind == 'id':
        mats = [emit_mat('id%d' % i, 'const', ((i + 1) / 64.0, 0, 0)) for i in range(len(o.material_slots))]
    else:
        mats = emit_mat('__' + kind, kind)
    old = _swap_materials(o, mats)
    all_m = mats if isinstance(mats, list) else [mats]
    for m in all_m:
        t = m.node_tree.nodes.new('ShaderNodeTexImage'); t.image = img; m.node_tree.nodes.active = t
    bpy.context.scene.cycles.samples = 1
    select_only([o], o)
    with ctx(o): bpy.ops.object.bake(type='EMIT', margin=0, use_clear=True)
    _restore(o, old)
    a = pixels(img); bpy.data.images.remove(img)
    for m in all_m: bpy.data.materials.remove(m)
    return a

def _img_mat(img):
    m, nt, out = node_mat('__bakeimg')
    b = nt.nodes.new('ShaderNodeBsdfPrincipled'); nt.links.new(b.outputs[0], out.inputs[0])
    t = nt.nodes.new('ShaderNodeTexImage'); t.image = img; nt.nodes.active = t
    return m

def bake_ao(o, size, samples=24, dist=0.08):
    ensure_slots(o)
    img = bpy.data.images.new('__ao', size, size, alpha=False, float_buffer=True)
    m = _img_mat(img); old = _swap_materials(o, m)
    w = bpy.context.scene.world or bpy.data.worlds.new('w'); bpy.context.scene.world = w
    w.light_settings.distance = dist
    bpy.context.scene.cycles.samples = samples
    select_only([o], o)
    with ctx(o): bpy.ops.object.bake(type='AO', margin=16, use_clear=True)
    _restore(o, old); a = pixels(img)[..., 0]; bpy.data.images.remove(img); bpy.data.materials.remove(m)
    return a

def bake_normal_from_high(o, high, size, extrusion=0.006, ray=0.02):
    ensure_slots(o)
    img = bpy.data.images.new('__nh', size, size, alpha=False, float_buffer=True); img.colorspace_settings.name = 'Non-Color'
    m = _img_mat(img); old = _swap_materials(o, m)
    bpy.context.scene.cycles.samples = 1
    high.hide_render = False
    select_only([high, o], o)
    with ctx(o, [high, o]):
        bpy.ops.object.bake(type='NORMAL', normal_space='TANGENT', margin=16, use_clear=True, use_selected_to_active=True,
                            cage_extrusion=extrusion, max_ray_distance=ray)
    high.hide_render = True
    _restore(o, old); a = pixels(img); bpy.data.images.remove(img); bpy.data.materials.remove(m)
    return a

def bake_combined_normal(o, geo_normal, height, size, bump_dist):
    """Tangent normal = geometry normal map (from high) perturbed by a procedural height map (bump)."""
    ensure_slots(o)
    gimg = to_image('__gn', geo_normal, noncolor=True)
    hmin, hmax = float(height.min()), float(height.max())
    hn = (height - hmin) / max(1e-9, hmax - hmin)
    himg = bpy.data.images.new('__h', size, size, alpha=False, float_buffer=True); himg.colorspace_settings.name = 'Non-Color'
    buf = np.ones((size, size, 4), np.float32); buf[..., 0] = buf[..., 1] = buf[..., 2] = hn; himg.pixels.foreach_set(buf.ravel())
    out_img = bpy.data.images.new('__nf', size, size, alpha=False, float_buffer=True); out_img.colorspace_settings.name = 'Non-Color'
    m, nt, out = node_mat('__comb')
    b = nt.nodes.new('ShaderNodeBsdfPrincipled'); nt.links.new(b.outputs[0], out.inputs[0])
    tg = nt.nodes.new('ShaderNodeTexImage'); tg.image = gimg; tg.interpolation = 'Linear'
    nm = nt.nodes.new('ShaderNodeNormalMap'); nt.links.new(tg.outputs['Color'], nm.inputs['Color'])
    th = nt.nodes.new('ShaderNodeTexImage'); th.image = himg; th.interpolation = 'Cubic'
    bu = nt.nodes.new('ShaderNodeBump'); bu.inputs['Strength'].default_value = 1.0
    bu.inputs['Distance'].default_value = (hmax - hmin) * bump_dist
    nt.links.new(th.outputs['Color'], bu.inputs['Height']); nt.links.new(nm.outputs['Normal'], bu.inputs['Normal'])
    nt.links.new(bu.outputs['Normal'], b.inputs['Normal'])
    t = nt.nodes.new('ShaderNodeTexImage'); t.image = out_img; nt.nodes.active = t
    old = _swap_materials(o, m)
    bpy.context.scene.cycles.samples = 1
    select_only([o], o)
    with ctx(o): bpy.ops.object.bake(type='NORMAL', normal_space='TANGENT', margin=16, use_clear=True)
    _restore(o, old); a = pixels(out_img)
    for i in (gimg, himg, out_img): bpy.data.images.remove(i)
    bpy.data.materials.remove(m)
    return a

def decode(pos_px, nrm_px):
    cov = pos_px[..., :3].sum(-1) > 0
    P = (pos_px[..., :3] - 0.5) * 4.0; Nn = (nrm_px[..., :3] - 0.5) * 2.0
    return cov, P, Nn

def finish(arr, cov, iters=16):
    from texlib import dilate
    a = arr if arr.ndim == 3 else arr[..., None]
    return dilate(a.astype(np.float32), cov, iters)[..., :a.shape[2]] if arr.ndim == 3 else dilate(a.astype(np.float32), cov, iters)[..., 0]

def save_rgb(arr, path, quality=90, srgb=True):
    from PIL import Image
    a = np.clip(arr, 0, 1)
    if srgb: a = np.where(a <= 0.0031308, a * 12.92, 1.055 * np.power(a, 1 / 2.4) - 0.055)
    im = Image.fromarray((a[::-1] * 255 + 0.5).astype(np.uint8))
    if path.endswith('.jpg'): im.save(path, quality=quality, subsampling=0)
    else: im.save(path, optimize=True)
    return path
