# The web build's glbs keep alphaMode BLEND of Ninja materials with flag 0x08 but drop the material
# diffuse alpha -> such glass (rm_0090 windows ob_027 etc.) renders opaque.  Sets baseColorFactor
# alpha from tools/mat_alpha.json (idempotent).  ob_023 has two alphas (0.498/0.8) on one glb
# material (key tex+flags), so it is left as is.
import json, os, struct
HERE = os.path.dirname(os.path.abspath(__file__))
TABLE = {k: v for k, v in json.load(open(os.path.join(HERE, 'mat_alpha.json'))).items() if not k.startswith('_')}

def fix(path, mats):
    d = open(path, 'rb').read()
    n = struct.unpack_from('<I', d, 12)[0]
    j = json.loads(d[20:20 + n]); rest = d[20 + n:]
    ch = False
    for m in j.get('materials', []):
        a = mats.get(m.get('name'))
        if a is None or m.get('alphaMode') != 'BLEND':
            continue
        pb = m.setdefault('pbrMetallicRoughness', {})
        f = [1.0, 1.0, 1.0, a]
        if pb.get('baseColorFactor') != f:
            pb['baseColorFactor'] = f; ch = True
    if not ch:
        return False
    js = json.dumps(j, separators=(',', ':')).encode()
    js += b' ' * (-len(js) % 4)
    out = struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(js) + len(rest)) + struct.pack('<I', len(js)) + b'JSON' + js + rest
    open(path, 'wb').write(out)
    return True

def run(out_dir):
    r = []
    for rel, mats in TABLE.items():
        p = os.path.join(out_dir, rel)
        if os.path.exists(p) and fix(p, mats):
            r.append(rel)
    return r
