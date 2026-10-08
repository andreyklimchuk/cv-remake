#!/usr/bin/env python3
"""FILE screen assets (fileview.c) from the PS3 data:
  * item1/bgNN_tex.arc -> assets/files/bgNN.png: wallpaper[file] - 146 (the file's picture, uv 0..160/256, and the
    parts_22 arrows / EXIT at v 240..256);
  * item1/it_139.arc   -> assets/inv/it_139.glb: the three binders (FileSyu / MakeTag in itemview.c);
  * data/files.json (texts) is written from sysmes.msb (system messages 280 + fsheader[file] + page) by hand-run code
    in HANDOFF (font codes {02} " {0d} - {0f} / {08}( {09}) {1a}: {1b}; {5b}α {5c}Σ, buttons {61}/{62} -> [Shift]/[E]).
Usage: python3 tools/conv/files.py ITEM1_DIR OUT_ASSETS [NN ...]   (needs cvx-prison/tools: arc.py, tex.py, conv_mdl.py)
"""
import os, subprocess, sys, tempfile
T = os.environ.get('CVX_TOOLS', '/tmp/tmp8qokm6of/cv-remake-cvx-prison/cvx-prison/tools')
sys.path.insert(0, T)
from arc import parse
from tex import decode
src, out = sys.argv[1], sys.argv[2]
os.makedirs(out + '/files', exist_ok=True); os.makedirs(out + '/inv', exist_ok=True)
for nn in (sys.argv[3:] or ['%02d' % i for i in range(14)]):
    for name, h, data, us in parse(open(f'{src}/bg{nn}_tex.arc', 'rb').read()):
        if name.endswith('tex0000_BM'):
            im, _ = decode(data); im.save(f'{out}/files/bg{nn}.png'); print('bg', nn, im.size)
tmp = tempfile.mkdtemp()
subprocess.check_call([sys.executable, T + '/arc.py', f'{src}/it_139.arc', tmp])
d = tmp + '/biocv_tmp/eng/item1/item/it_139'
mdl = [f for f in os.listdir(d) if f.startswith('it_139.7db518e8')][0]
subprocess.check_call([sys.executable, T + '/conv_mdl.py', f'{d}/{mdl}', f'{d}/it_139', f'{out}/inv/it_139.glb'])
