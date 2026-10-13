#!/usr/bin/env python3
"""Resolve sparse weapon tone IDs through the native CAPS tone table.
Usage: fix_weapon_sound.py ORIGINAL.spc assets/audio/se/arms_NNN.json
sound.py exports packed MSF samples, but QERS refers to sparse tone numbers.
"""
import json, struct, sys

def fix(spc, index):
    d = open(spc, 'rb').read()
    if d[1:4] == b'SFH':
        d = b''.join(d[i+16:i+0x20000] for i in range(0, len(d), 0x20000))
    assert d[:4] == b'CAPS'
    n = struct.unpack_from('>I', d, 8)[0]
    off = struct.unpack_from('>I', d, 24)[0]
    mapping = {struct.unpack_from('>I', d, off+4+44*i)[0]: struct.unpack_from('>I', d, off+40+44*i)[0] for i in range(n)}
    j = json.load(open(index))
    if '_native_sample_map' not in j:
        for entry in j['lists'].values():
            entry['s'] = mapping[entry['s']]
            assert 0 <= entry['s'] < len(j['samples'])
        j['_native_sample_map'] = mapping
        json.dump(j, open(index, 'w'), separators=(',', ':'))
    print(index, mapping)

if __name__ == '__main__': fix(*sys.argv[1:3])
