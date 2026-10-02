"""Removes the shoulder skin of the grafted old head piece of steve.glb (mesh 'steve_body'): those triangles poked
through the RE4R shirt as pale patches on top of the shoulders. Keeps the neck column only.
Usage: python3 tools/import/steve_trim_neck.py in.glb out.glb"""
import json, struct, sys, numpy as np
src, dst = sys.argv[1], sys.argv[2]
b = open(src, 'rb').read(); n = struct.unpack('<I', b[12:16])[0]; j = json.loads(b[20:20 + n]); bin_ = bytearray(b[28 + n:])
def arr(ai):
    a = j['accessors'][ai]; bv = j['bufferViews'][a['bufferView']]; o = bv.get('byteOffset', 0) + a.get('byteOffset', 0)
    nc = {'VEC3': 3, 'VEC2': 2, 'SCALAR': 1, 'VEC4': 4}[a['type']]; dt = {5126: np.float32, 5125: np.uint32, 5123: np.uint16, 5121: np.uint8}[a['componentType']]
    return np.frombuffer(bytes(bin_[o:o + a['count'] * nc * np.dtype(dt).itemsize]), dt).reshape(a['count'], nc), a, bv, o
mi = next(i for i, m in enumerate(j['meshes']) if m.get('name') == 'steve_body')
pr = j['meshes'][mi]['primitives'][0]
P, *_ = arr(pr['attributes']['POSITION'])
I, ia, ibv, io = arr(pr['indices']); I = I.reshape(-1, 3)
c = P[I].mean(1)
drop = ((c[:, 1] < 1.50) & (np.abs(c[:, 0]) > 0.072)) | (c[:, 1] < 1.468)
print('triangles', len(I), 'drop', int(drop.sum()))
keep = I[~drop].astype(I.dtype).ravel()
data = keep.tobytes()
bin_[io:io + len(data)] = data  # shrink in place (same offset, smaller count)
ia['count'] = int(len(keep))
js = json.dumps(j, separators=(',', ':')).encode()
while len(js) % 4: js += b' '
out = bytes(bin_)
glb = struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(js) + 8 + len(out)) + struct.pack('<II', len(js), 0x4E4F534A) + js + struct.pack('<II', len(out), 0x004E4942) + out
open(dst, 'wb').write(glb); print('wrote', dst)
