# The web build's dog (en04a00.glb) binds each leg mesh rigidly to its upper bone (b06/b09/b13/b16): the converter
# read only the body part of the SKIN block. The SKIN stream holds one entry per node: the legs are parts of their
# own with vertex records on the knee / paw bones (b07/b08, b10/b11, b14/b15, b17/b18). dog_skin.json = JOINTS_0 /
# WEIGHTS_0 of every primitive rebuilt from it (conv/enemy.py skin_parts) -> written over the glb's (idempotent).
import json, struct, base64, os
HERE = os.path.dirname(os.path.abspath(__file__))
def fix(path):
    fx = json.load(open(os.path.join(HERE, 'dog_skin.json')))
    d = bytearray(open(path, 'rb').read())
    jl = struct.unpack_from('<I', d, 12)[0]; j = json.loads(d[20:20 + jl]); b0 = 20 + jl + 8
    changed = False
    for pi, p in enumerate(j['meshes'][0]['primitives']):
        for k in ('JOINTS_0', 'WEIGHTS_0'):
            a = j['accessors'][p['attributes'][k]]; bv = j['bufferViews'][a['bufferView']]
            o = b0 + bv.get('byteOffset', 0) + a.get('byteOffset', 0)
            new = base64.b64decode(fx[pi][k])
            if len(new) != a['count'] * (8 if k == 'JOINTS_0' else 16): raise ValueError('dog_skin.json does not fit ' + path)
            if d[o:o + len(new)] != new: d[o:o + len(new)] = new; changed = True
    if changed: open(path, 'wb').write(d)
    return changed
