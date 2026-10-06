#!/usr/bin/env python3
"""Fix the en01 (zombie) glbs of the web build: the motion bank stores the lower-body clips (bones b00-b07) and then the
upper-body clips (b08-b17), but the upper run starts with one extra 2-frame block, so conv/enemy.py paired lower clip k with
upper clip k-1 (frame counts differ in 76 of 87 clips -> upper body out of step, jerky loops).
Here clip mNN gets the upper-body channels of the old m(NN+1) (frame counts then match in every clip); the upper half of the
last clip was dropped by the converter and stays empty. Idempotent: a fixed file (asset.extras.zfix) is skipped.
Usage: python3 tools/fix_zombie_clips.py assets/enemies/en01a*.glb"""
import json, struct, sys

def fix(path, lower_n=8):
    d = open(path, 'rb').read()
    jl = struct.unpack_from('<I', d, 12)[0]
    j = json.loads(d[20:20 + jl]); rest = d[20 + jl:]
    if j['asset'].get('extras', {}).get('zfix'): return False
    acc = j['accessors']
    m = sorted([a for a in j['animations'] if a['name'][0] == 'm' and a['name'][1:].isdigit()], key=lambda a: int(a['name'][1:]))
    def split(a):
        lo, up = [], []
        for ch in a['channels']:
            s = a['samplers'][ch['sampler']]
            (up if ch['target']['node'] >= lower_n else lo).append((ch['target'], s))
        return lo, up
    parts = [split(a) for a in m]
    for k, a in enumerate(m):
        lo = parts[k][0]; up = parts[k + 1][1] if k + 1 < len(parts) else []
        a['samplers'] = []; a['channels'] = []
        for tgt, s in lo + up:
            a['samplers'].append(dict(s)); a['channels'].append({'sampler': len(a['samplers']) - 1, 'target': dict(tgt)})
        cn = {acc[s['input']]['count'] for s in a['samplers']}
        if len(cn) > 1 and k + 1 < len(parts): print(path, a['name'], 'frame counts still differ', cn)
    j['asset'].setdefault('extras', {})['zfix'] = 1
    js = json.dumps(j, separators=(',', ':')).encode(); js += b' ' * ((4 - len(js) % 4) % 4)
    out = struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(js) + len(rest)) + struct.pack('<II', len(js), 0x4E4F534A) + js + rest
    open(path, 'wb').write(out)
    return True

if __name__ == '__main__':
    for p in sys.argv[1:]:
        print(p, 'fixed' if fix(p) else 'already fixed')
