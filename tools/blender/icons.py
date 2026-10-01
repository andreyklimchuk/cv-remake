"""RE-style inventory icons: renders each item_*.glb / weapon_*.glb with Cycles on a transparent film,
   composites onto a dark navy gradient tile (PS1-era Resident Evil look) → src/assets/icons/<id>.jpg
   Run: python3 tools/icons.py [id ...]"""
import sys, os, glob; sys.path.insert(0, '/data/assets_src/tools')
from lib import *
from PIL import Image, ImageDraw, ImageFilter
ONLY = set(sys.argv[1:])
SRC = '/data/cv-remake/src/assets/models'
DST = os.environ.get('ICON_DST', '/data/cv-remake/src/assets/icons'); os.makedirs(DST, exist_ok=True)
RES = 256

def tile():
    W = RES
    y, x = np.mgrid[0:W, 0:W].astype(np.float32) / W
    r = np.sqrt((x - 0.5) ** 2 + (y - 0.42) ** 2)
    c0 = np.array([34, 58, 118], np.float32); c1 = np.array([6, 12, 34], np.float32)
    t = np.clip(r / 0.72, 0, 1)[..., None] ** 1.2
    img = c0 * (1 - t) + c1 * t
    img += (np.random.default_rng(1).random((W, W, 1)) - 0.5) * 5          # dither
    im = Image.fromarray(np.clip(img, 0, 255).astype(np.uint8))
    d = ImageDraw.Draw(im)
    d.rectangle([1, 1, W - 2, W - 2], outline=(70, 96, 150), width=2)
    d.rectangle([4, 4, W - 5, W - 5], outline=(12, 20, 44), width=1)
    return im

VIEW = {  # (azimuth deg, elevation deg, zoom)
    'weapon': (90, 8, 1.0), 'item': (35, 38, 1.0),
    'keycard': (15, 60, 0.95), 'emblem': (10, 62, 0.95), 'musicbox': (10, 60, 0.95), 'valve_handle': (15, 55, 0.95),
    'extinguisher': (30, 14, 1.0), 'ammo_bolt': (60, 40, 1.0), 'lighter': (30, 25, 1.0),
    'part_mag': (80, 20, 1.0), 'part_stock': (80, 25, 1.0), 'ammo_linear': (40, 30, 1.0),
}

def render(path, key, kind):
    reset()
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'; sc.cycles.samples = 48; sc.cycles.use_denoising = True
    try: sc.cycles.denoiser = 'OPENIMAGEDENOISE'
    except Exception: pass
    sc.render.film_transparent = True
    sc.render.resolution_x = sc.render.resolution_y = RES
    sc.view_settings.view_transform = 'Standard'; sc.view_settings.look = 'None'
    bpy.ops.import_scene.gltf(filepath=path)
    objs = [o for o in sc.objects if o.type == 'MESH']
    pts = np.concatenate([np.array([o.matrix_world @ v.co for v in o.data.vertices]) for o in objs])
    mn, mx = pts.min(0), pts.max(0); ctr = Vector(((mn + mx) / 2).tolist()); rad = float(np.linalg.norm(mx - mn)) / 2
    az, el, zoom = VIEW.get(key, VIEW[kind])
    if kind == 'weapon':
        # weapon frame: barrel along -Y (Blender) → show left profile, muzzle pointing right
        az, el = 0 - 180 + 180, el
    a, e = math.radians(az), math.radians(el)
    d = Vector((math.sin(a) * math.cos(e), -math.cos(a) * math.cos(e), math.sin(e)))
    if kind == 'weapon': d = Vector((1, 0, 0.12)).normalized() * -1; d = Vector((-1, 0, 0.14)).normalized()
    cam = bpy.data.cameras.new('c'); cam.lens = 70; cam.clip_start = 0.005
    co = bpy.data.objects.new('c', cam); sc.collection.objects.link(co); sc.camera = co
    fov = 2 * math.atan(18 / cam.lens)
    dist = rad / math.sin(fov / 2) * 0.93 / zoom
    co.location = ctr + d * dist; co.rotation_euler = (-d).to_track_quat('-Z', 'Y').to_euler()
    # lights: warm key, cool rim, soft fill
    def light(name, typ, loc, energy, col, size=0.5):
        L = bpy.data.lights.new(name, typ); L.energy = energy; L.color = col
        if typ == 'AREA': L.size = size * rad * 4
        o = bpy.data.objects.new(name, L); sc.collection.objects.link(o); o.location = ctr + Vector(loc) * rad * 6
        o.rotation_euler = (ctr - o.location).to_track_quat('-Z', 'Y').to_euler(); return o
    k = rad * rad * 36
    right = d.cross(Vector((0, 0, 1))).normalized()
    light('key', 'AREA', tuple(d * 0.8 + right * -0.7 + Vector((0, 0, 0.9))), 110 * k, (1.0, 0.95, 0.88))
    light('rim', 'AREA', tuple(-d * 0.9 + right * 0.6 + Vector((0, 0, 0.5))), 150 * k, (0.7, 0.8, 1.0))
    light('fill', 'AREA', tuple(d * 0.9 + right * 0.9 - Vector((0, 0, 0.1))), 35 * k, (0.8, 0.85, 1.0))
    w = sc.world or bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True
    bg = w.node_tree.nodes.get('Background'); bg.inputs[0].default_value = (0.05, 0.07, 0.12, 1); bg.inputs[1].default_value = 0.35
    out = f'/tmp/icon_{key}.png'; sc.render.filepath = out; bpy.ops.render.render(write_still=True)
    fg = Image.open(out).convert('RGBA')
    base = tile().convert('RGBA')
    # soft drop shadow
    sh = Image.new('RGBA', fg.size, (0, 0, 0, 0)); a_ = fg.split()[3].filter(ImageFilter.GaussianBlur(6))
    sh.putalpha(a_.point(lambda v: int(v * 0.55)))
    base.alpha_composite(sh, (4, 6)); base.alpha_composite(fg)
    base.convert('RGB').save(f'{DST}/{key}.jpg', quality=90)
    print('icon', key)

files = sorted(glob.glob(f'{SRC}/item_*.glb') + glob.glob(f'{SRC}/weapon_*.glb')) if not os.environ.get('ICON_GLOB') else sorted(glob.glob(f"{SRC}/{os.environ['ICON_GLOB']}"))
for f in files:
    name = os.path.basename(f)[:-4]
    kind, key = ('weapon', name[7:]) if name.startswith('weapon_') else ('item', name[5:]) if name.startswith('item_') else ('item', name)
    if ONLY and key not in ONLY: continue
    render(f, key, kind)
