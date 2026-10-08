#!/usr/bin/env python3
"""System effect textures (biocv_disc/eng/system/syseff.arc) -> assets/effects/ef_NNN_K.png.

PS2 bhInitEffect (effect.c): system effect texture id i starts at ef_tn[i] = sum of ef_info[0..i-1].nbAnim and has
nbAnim textures; the 40 textures of syseff_tex (SCRA list order) are that flat list. ef_tn[op->tex_id] + ani_ct picks one.
Usage: python3 tools/conv/syseff.py syseff.arc OUT_DIR [id ...]   (needs cvx-prison/tools: arc.py, tex.py)
"""
import os, struct, sys, zlib
sys.path.insert(0, os.environ.get('CVX_TOOLS', '/tmp/tmp8qokm6of/cv-remake-cvx-prison/cvx-prison/tools'))
from arc import parse
from tex import decode
NB_ANIM = [9, 0, 2, 4, 4, 4, 2, 0, 1, 2, 3, 5, 0, 0, 0, 0, 0, 2, 1, 1]   # ef_info[].nbAnim
files = {h_name: data for h_name, data in ((n, d) for n, h, d, us in parse(open(sys.argv[1], 'rb').read()))}
lst = next(d for n, d in files.items() if n.endswith('syseff_tex'))
cnt = struct.unpack('>H', lst[6:8])[0]
byh = {~zlib.crc32(n.encode()) & 0xffffffff: d for n, d in files.items() if '\\syseff\\tex' in n}
order = [struct.unpack('>I', lst[12 + 8 * k:16 + 8 * k])[0] for k in range(cnt)]
want = set(int(a) for a in sys.argv[3:])
tn = 0
for i, nb in enumerate(NB_ANIM):
    for k in range(nb):
        if (not want or i in want) and order[tn + k] in byh:
            im, _ = decode(byh[order[tn + k]]); im.save(os.path.join(sys.argv[2], 'ef_%03d_%d.png' % (i, k))); print(i, k, im.size)
    tn += nb
