#!/usr/bin/env python3
"""Zombie mouth morph (bhEne01 shp_ct / npCalcMorphing): en01aNN.108f442e holds two SKIN+MDL sets; the draw code
interpolates every node pos and every model vertex (position + normal) of obj_a = mbp[0] towards obj_b = mbp[1] by
shp_ct * 0.001.  Exports the differing vertices in the bind space of the glb built by conv/enemy.py (node world @ p * 0.1):
data/face/zmorph_en01aNN.json = {"verts": [[x, y, z, dx, dy, dz, dnx, dny, dnz], ...], "pos": node pos deltas}
Usage: zombie_morph.py OUTDIR en01aNN.108f442e ..."""
import sys, os, struct, json, re
import numpy as np
sys.path.insert(0, os.path.dirname(__file__)); sys.path.insert(0, '/data/cvx/tools'); sys.path.insert(0, '/data/cvx/conv')
from ninja import Mdl
from enemy import node_local, world

def sets(d):
    sk = [m.start() - 4 for m in re.finditer(b'SKIN', d)]
    out = []
    for k, b in enumerate(sk):
        mb = d.find(b'MDL', b + 8)
        dd = bytearray(d); dd[mb:mb + 4] = b'MDL\xbc'
        # hide the other MDL tags so Mdl() locks on this one
        for m in re.finditer(b'MDL\xbc', bytes(dd)):
            if m.start() != mb: dd[m.start():m.start() + 4] = b'XXXX'
        m = Mdl(bytes(dd)); out.append(m)
    return out

def export(path, S=0.1):
    d = open(path, 'rb').read()
    ms = sets(d)
    if len(ms) < 2: return None
    a, b = ms[0], ms[1]
    na, nb = a.walk(), b.walk()
    assert len(na) == len(nb)
    Wa = world(na, [node_local(n) for n in na])
    res = {"verts": [], "pos": []}
    for i, (x, y) in enumerate(zip(na, nb)):
        dp = np.array(y['pos']) - np.array(x['pos'])
        if np.abs(dp).max() > 1e-6: res["pos"].append([i] + (dp * S).tolist())
        if x['model'] == 0xffffffff or y['model'] == 0xffffffff: continue
        va, _ = a.model(x['model']); vb, _ = b.model(y['model'])
        if len(va) != len(vb): print(path, 'node', i, 'vertex count differs', len(va), len(vb)); continue
        R = Wa[i][:3, :3]
        for ix in va:
            (pa, qa), (pb, qb) = va[ix], vb[ix]
            if pa == pb and qa == qb: continue
            P = (Wa[i] @ np.array(list(pa) + [1]))[:3] * S
            D = R @ (np.array(pb) - np.array(pa)) * S
            N = R @ (np.array(qb) - np.array(qa))
            res["verts"].append([round(float(v), 6) for v in list(P) + list(D) + list(N)] + [i])
    return res

if __name__ == '__main__':
    out = sys.argv[1]
    for p in sys.argv[2:]:
        r = export(p)
        name = os.path.basename(p).split('.')[0]
        if r is None: print(name, 'no second model'); continue
        print(name, len(r["verts"]), 'verts, nodes', sorted({v[-1] for v in r["verts"]}), 'pos', r["pos"])
        json.dump(r, open(os.path.join(out, 'zmorph_%s.json' % name), 'w'), separators=(',', ':'))
