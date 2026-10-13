#!/usr/bin/env python3
"""Convert a native weapon MTN bank into persisted Claire clips.
Usage: import_weapon_bank.py CLAIRE.glb MTN PREFIX PART (e.g. gl 10).
Requires the original conversion tools beside /data/cvx/{tools,conv}.
Unlike add_clips2, retain zero-sized native motion slots (dread.c bhReadWeapon).
"""
import os, struct, sys, tempfile, shutil, json
sys.path.insert(0, '/data/cvx/tools')
import add_clips2
import add_room_clips

def slot_map(path):
    d = open(path, 'rb').read()
    p, slot, out = 4, 0, []
    while p + 4 <= len(d):
        size = struct.unpack_from('>I', d, p)[0]
        if size == 0xffffffff:
            break
        if size:
            assert d[p+4:p+8] == b'MTN\x80'
            out.append(slot)
        p += 4 + size
        slot += 1
    return out

def convert(claire, bank, prefix, part):
    with tempfile.TemporaryDirectory() as tmp:
        donor = os.path.join(tmp, 'donor.glb')
        shutil.copyfile(claire, donor)
        add_clips2.add(donor, bank, prefix)
        j, b = add_room_clips.load(donor)
        mapping = slot_map(bank)
        for a in j['animations']:
            if a['name'].startswith(prefix):
                a['name'] = '%s%02d' % (prefix, mapping[int(a['name'][len(prefix):])])
        add_room_clips.save(donor, j, b)
        out = os.path.join(os.path.dirname(__file__), 'room_clips', 'claire.' + part + '.json')
        if os.path.exists(out): os.unlink(out)
        add_room_clips.extract(donor, 'claire.' + part, prefix)
    j, b = add_room_clips.load(claire)
    j['animations'] = [a for a in j['animations'] if not a['name'].startswith(prefix)]
    add_room_clips.save(claire, j, b)
    add_room_clips.merge(claire)
    print('Native slots:', mapping)

if __name__ == '__main__':
    convert(*sys.argv[1:5])
