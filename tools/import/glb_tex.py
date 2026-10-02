"""Re-encode GLB textures: every image except those with real alpha -> JPEG (quality q), optional max size.
Usage: python3 tools/import/glb_tex.py in.glb out.glb [maxSize=2048] [q=88] [alphaMode=MASK|keep]"""
import json, struct, sys, io
from PIL import Image
src, dst = sys.argv[1], sys.argv[2]
MAX = int(sys.argv[3]) if len(sys.argv) > 3 else 2048; Q = int(sys.argv[4]) if len(sys.argv) > 4 else 88
AM = sys.argv[5] if len(sys.argv) > 5 else 'keep'
b = open(src, 'rb').read(); n = struct.unpack('<I', b[12:16])[0]; j = json.loads(b[20:20 + n]); bin_ = b[28 + n:]
blobs = []
def view(i):
    bv = j['bufferViews'][i]; o = bv.get('byteOffset', 0); return bin_[o:o + bv['byteLength']]
img_views = {im['bufferView'] for im in j.get('images', [])}
newdata = {}
for k, im in enumerate(j.get('images', [])):
    pil = Image.open(io.BytesIO(view(im['bufferView'])))
    alpha = pil.mode in ('RGBA', 'LA') and pil.getchannel('A').getextrema()[0] < 250
    if max(pil.size) > MAX: pil = pil.resize((min(MAX, pil.size[0]), min(MAX, pil.size[1])), Image.LANCZOS)
    out = io.BytesIO()
    if alpha: pil.save(out, 'PNG', optimize=True); im['mimeType'] = 'image/png'
    else: pil.convert('RGB').save(out, 'JPEG', quality=Q, optimize=True); im['mimeType'] = 'image/jpeg'
    newdata[im['bufferView']] = out.getvalue(); print('image', k, pil.size, 'alpha' if alpha else 'jpeg', len(out.getvalue()) // 1024, 'KB')
if AM == 'MASK':
    for m in j['materials']:
        if m.get('alphaMode') == 'BLEND' or m.get('alphaMode') == 'MASK': m['alphaMode'] = 'MASK'; m['alphaCutoff'] = 0.5
# rebuild buffer
out = bytearray()
for i, bv in enumerate(j['bufferViews']):
    data = newdata.get(i, view(i))
    while len(out) % 4: out.append(0)
    bv['byteOffset'] = len(out); bv['byteLength'] = len(data); out += data
while len(out) % 4: out.append(0)
j['buffers'] = [{'byteLength': len(out)}]
js = json.dumps(j, separators=(',', ':')).encode()
while len(js) % 4: js += b' '
glb = struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(js) + 8 + len(out)) + struct.pack('<II', len(js), 0x4E4F534A) + js + struct.pack('<II', len(out), 0x004E4942) + bytes(out)
open(dst, 'wb').write(glb); print('wrote', dst, len(glb) // 1024, 'KB')
