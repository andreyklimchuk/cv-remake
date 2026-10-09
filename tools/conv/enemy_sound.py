#!/usr/bin/env python3
"""Enemy SE banks (sound/se/enemy/en_000_000_0 zombie, en_004_000_0 dog) and the player voice bank (sound/se/core/core_000,
Claire) of the PS3 data -> tools/extra_assets/audio/se/<bank>/NN.ogg.b64 + <bank>.json.b64 (same format as conv/sound.py
of the cvx-prison branch). Usage: python3 tools/conv/enemy_sound.py <nativePS3 dir> <cvx-prison tools dir (sfh.py, spc.py)>"""
import os, sys, json, struct, subprocess, base64, tempfile
G, T = sys.argv[1], sys.argv[2]
sys.path.insert(0, T)
from sfh import clean
from spc import riff
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(os.path.dirname(HERE), 'extra_assets', 'audio', 'se')
BA = {4: 0x60, 5: 0x98, 6: 0xc0}
TMP = tempfile.mkdtemp()
def bank(path, name):
    s = clean(open(path + '.spc', 'rb').read()); assert s[:4] == b'CAPS'
    ds = struct.unpack('>I', s[0x1c:0x20])[0]; p = 0x20; hs = []
    while s[p:p+4] == b'MSF0': hs.append(struct.unpack('>7I', s[p+4:p+32])); p += 0x40
    od = os.path.join(OUT, name); os.makedirs(od, exist_ok=True)
    samples = []; q = ds
    for i, (codec, ch, sz, sr, flg, ls, ll) in enumerate(hs):
        ba = BA[codec] * ch; w = riff(s[q:q+sz], ch, sr, ba); q += (sz + 0x7f) & ~0x7f
        t = f'{TMP}/{name}_{i}.at3'; o = f'{TMP}/{name}_{i}.ogg'; open(t, 'wb').write(w)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', t, '-c:a', 'libvorbis', '-q:a', '3', o], check=True)
        open(f'{od}/{i:02d}.ogg.b64', 'w').write(base64.b64encode(open(o, 'rb').read()).decode())
        info = {'f': f'{name}/{i:02d}', 'n': sz // ba * 1024, 'sr': sr}
        if flg != 0xffffffff and flg & 1: info['loop'] = [ls // ba * 1024, min(ls + ll, sz) // ba * 1024]
        samples.append(info)
    r = clean(open(path + '.srq', 'rb').read()); end = struct.unpack('>I', r[0x1c:0x20])[0]; lists = {}
    for o in range(0x34, end, 0x90):
        e = r[o:o+0x90]; lst = struct.unpack('>H', e[0:2])[0]
        nxt, = struct.unpack('>H', e[0x1c:0x1e]); smp, pan = struct.unpack('>HH', e[0x20:0x24]); vol, = struct.unpack('>f', e[0x24:0x28])
        ent = {'s': smp, 'v': round(vol, 2)}
        if pan != 0xffff: ent['p'] = pan
        if nxt != 0xffff: ent['l'] = nxt
        lists[lst] = ent
    js = json.dumps({'samples': samples, 'lists': lists}, separators=(',', ':'))
    open(os.path.join(OUT, name + '.json.b64'), 'w').write(base64.b64encode(js.encode()).decode())
    print(name, len(samples), 'samples', len(lists), 'lists')
bank(f'{G}/sound/se/enemy/en_000_000_0', 'en_000_000_0')
bank(f'{G}/sound/se/enemy/en_004_000_0', 'en_004_000_0')
bank(f'{G}/sound/se/core/core_000', 'core_000')
