#!/usr/bin/env python3
"""Room motions (rmt) of the zombies that the web build's glbs lack (e.g. rm_0070: breaking in through the window).
The clips are converted with conv/enemy.py of the cvx-prison branch (8th argument = rmt blocks) into a donor glb and only
their animation data is kept here (tools/room_clips/<model>.json or <family>.json, e.g. en01.json: name -> channels with base64 float32 times/values,
node names instead of indices). fetch_assets.py merges them into assets/enemies/<model>.glb (idempotent: existing names
are skipped).
  extract: python3 tools/add_room_clips.py extract DONOR.glb MODEL PREFIX   (PREFIX e.g. rm_0070/ -> clips rm_0070/rNN)
  merge:   python3 tools/add_room_clips.py merge assets/enemies/en01a*.glb"""
import base64, glob, json, os, struct, sys

HERE = os.path.dirname(os.path.abspath(__file__))
TYPES = {'SCALAR': 1, 'VEC3': 3, 'VEC4': 4}

def load(p):
    d = open(p, 'rb').read()
    jl = struct.unpack_from('<I', d, 12)[0]
    j = json.loads(d[20:20 + jl]); b = d[20 + jl:]
    bl = struct.unpack_from('<I', b, 0)[0]
    return j, bytearray(b[8:8 + bl])

def save(p, j, B):
    while len(B) % 4: B.append(0)
    j['buffers'][0]['byteLength'] = len(B)
    js = json.dumps(j, separators=(',', ':')).encode(); js += b' ' * ((4 - len(js) % 4) % 4)
    open(p, 'wb').write(struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(js) + 8 + len(B)) + struct.pack('<II', len(js), 0x4E4F534A) + js
                       + struct.pack('<II', len(B), 0x004E4942) + bytes(B))

def acc_bytes(j, B, i):
    a = j['accessors'][i]; v = j['bufferViews'][a['bufferView']]
    o = v.get('byteOffset', 0) + a.get('byteOffset', 0)
    return bytes(B[o:o + a['count'] * TYPES[a['type']] * 4])

def extract(donor, model, prefix):
    j, B = load(donor)
    out_p = os.path.join(HERE, 'room_clips', model + '.json')
    out = json.load(open(out_p)) if os.path.exists(out_p) else {}
    for a in j['animations']:
        if not a['name'].startswith(prefix): continue
        ch = []
        for c in a['channels']:
            s = a['samplers'][c['sampler']]
            ch.append({'node': j['nodes'][c['target']['node']]['name'], 'path': c['target']['path'], 'interp': s.get('interpolation', 'LINEAR'),
                       'type': j['accessors'][s['output']]['type'],
                       't': base64.b64encode(acc_bytes(j, B, s['input'])).decode(), 'v': base64.b64encode(acc_bytes(j, B, s['output'])).decode()})
        out[a['name']] = ch; print('clip', a['name'], len(ch), 'channels')
    os.makedirs(os.path.dirname(out_p), exist_ok=True)
    json.dump(out, open(out_p, 'w'), separators=(',', ':'))

def merge(p):
    # room_clips/<model>.json, else the one of the model family (en01.json: every zombie variant, same 18-bone skeleton)
    # large sets are split into <model>.NN.json parts (channel lists of a clip concatenated)
    clips = {}
    for base in (os.path.basename(p)[:-4], os.path.basename(p)[:4]):
        ps = glob.glob(os.path.join(HERE, 'room_clips', base + '.json')) + sorted(glob.glob(os.path.join(HERE, 'room_clips', base + '.[0-9][0-9].json')))
        for q in ps:
            for k, v in json.load(open(q)).items(): clips.setdefault(k, []).extend(v)   # a clip's channels may span parts
        if clips: break
    if not clips: return 0
    j, B = load(p)
    have = {a['name'] for a in j['animations']}
    nodes = {n.get('name'): i for i, n in enumerate(j['nodes'])}
    n = 0
    for name, chs in clips.items():
        if name in have or any(c['node'] not in nodes for c in chs): continue
        smp, chn = [], []
        for c in chs:
            ids = []
            for key, typ in (('t', 'SCALAR'), ('v', c['type'])):
                raw = base64.b64decode(c[key])
                while len(B) % 4: B.append(0)
                j['bufferViews'].append({'buffer': 0, 'byteOffset': len(B), 'byteLength': len(raw)}); B.extend(raw)
                a = {'bufferView': len(j['bufferViews']) - 1, 'componentType': 5126, 'count': len(raw) // (4 * TYPES[typ]), 'type': typ}
                if key == 't':
                    f = struct.unpack('<%df' % a['count'], raw); a['min'] = [min(f)]; a['max'] = [max(f)]
                j['accessors'].append(a); ids.append(len(j['accessors']) - 1)
            smp.append({'input': ids[0], 'output': ids[1], 'interpolation': c['interp']})
            chn.append({'sampler': len(smp) - 1, 'target': {'node': nodes[c['node']], 'path': c['path']}})
        j['animations'].append({'name': name, 'samplers': smp, 'channels': chn}); n += 1
    if n: save(p, j, B)
    return n

if __name__ == '__main__':
    a = sys.argv[1:]
    if a[0] == 'extract': extract(a[1], a[2], a[3])
    else:
        for p in a[1:]: print(p, 'room clips added:', merge(p))
