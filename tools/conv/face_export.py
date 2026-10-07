#!/usr/bin/env python3
"""Export the facial animation data of the original cutscene NPC models (MASK block, face.c / face_bh.c) and the per-room
face motions / lip-sync streams (data/fmt) to JSON for scripts/face_mask.gd.
Needs the extracted game files (see README: ex/rmXXXX = MT ARC of rdx_lnk/rm_XXXX.arc).
Usage: python3 tools/conv/face_export.py EX_DIR OUT_DIR
  EX_DIR/rmXXXX/biocv_tmp/eng/data/mdl/enNNa00.108f442e (model: SKIN + MDL + MASK), .../fmt/rm_XXXX.4356673e (masks),
  .../fmt/rm_XXXX.42940d09 (lip streams)  ->  OUT_DIR/face_enNN.json, OUT_DIR/fmt_rm_XXXX.json
"""
import sys, os, glob, json, struct, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import ninja

def param(d, o):
    """PARAM_WORK (0xa4): muscle[32], jawang, jawtrans, eye[3], tangx, tangy, tangz (floats), frame, flag (shorts).
    jawang / tangx / tangy are kept as raw words too: the model's own table stores them as BAMS-like ints
    (fmCnkSetParamLip reads *(int*)&jawang * 0.005493164)."""
    f = list(struct.unpack_from('>40f', d, o)); i = struct.unpack_from('>40i', d, o)
    fr, fl = struct.unpack_from('>hh', d, o + 0xa0)
    return {'f': [round(x, 6) for x in f], 'i': [i[32], i[37], i[38]], 'frame': fr, 'flag': fl}

def model(path):
    d = open(path, 'rb').read(); o = d.find(b'MASK')
    if o < 0: return None
    v = struct.unpack_from('>4sHH2H6I4I', d, o); ids = struct.unpack_from('>3b9b', d, o + 0x34)
    H = dict(jaw=list(v[3:5]), nAttr=v[5], nList=v[6], nConnect=v[7], nJaw=v[8], nTang=v[9], nFace=v[10],
             face=ids[0], tang=ids[1], tooth=ids[2], eye=list(ids[3:]))
    m = ninja.Mdl(d); ns = m.walk(); mi = [k for k, n in enumerate(ns) if n['model'] != 0xffffffff]
    node = lambda i: mi[i] if i >= 0 else -1
    # MASK body: vlist[nList] (short id, char mnum, char nvnum), nvpt (nvnum*2 vertex refs per list entry),
    # list[nConnect] (int id, vec3, scal), jaw[nJaw] (int id, float rate), tang[nTang], face[nFace] (PARAM_WORK)
    p = o + 0x40; vl = []
    for k in range(H['nList']):
        vid, mn, nv = struct.unpack_from('>hbb', d, p); vl.append([vid, mn, nv]); p += 4
    p += 4 * sum(x[2] for x in vl)
    con = []
    for k in range(H['nConnect']):
        cid, x, y, z, s = struct.unpack_from('>i4f', d, p); con.append([cid, round(x, 6), round(y, 6), round(z, 6), round(s, 6)]); p += 20
    jaw = []
    for k in range(H['nJaw']):
        jid, r = struct.unpack_from('>if', d, p); jaw.append([jid, round(r, 6)]); p += 8
    tang = []
    for k in range(H['nTang']):
        tid, r = struct.unpack_from('>if', d, p); tang.append([tid, round(r, 6)]); p += 8
    faces = [param(d, p + 0xa4 * k) for k in range(H['nFace'])]
    assert sum(x[1] for x in vl) == H['nConnect'], 'connect count'
    # source vertices (model-local) of the face model and the tongue model
    def verts(n):
        vv, _ = m.model(ns[n]['model']); return vv
    fv = verts(node(H['face'])); need = {x[0] for x in vl} | {x[0] for x in jaw} | set(H['jaw'])
    tv = verts(node(H['tang'])) if H['tang'] >= 0 else {}
    return {'head': H, 'nodes': {'face': node(H['face']), 'tang': node(H['tang']), 'tooth': node(H['tooth']),
                                 'eye': [node(e) for e in H['eye'] if e >= 0]},
            'vtype': d[m.off(struct.unpack_from('>I', d, m.off(ns[node(H['face'])]['model']))[0])],
            'vlist': [[x[0], x[1]] for x in vl], 'con': con, 'jaw': jaw, 'tang': tang, 'faces': faces,
            'fv': {str(k): [round(c, 6) for c in fv[k][0]] for k in sorted(need)},
            'tv': {str(k): [round(c, 6) for c in tv[k][0]] for k in sorted(tv)},
            'pos': [[round(c, 6) for c in ns[i]['pos']] for i in range(len(ns))]}

def entries(d):
    p = 0; out = []
    while p + 4 <= len(d):
        sz = struct.unpack_from('>I', d, p)[0]
        if sz == 0xffffffff: break
        out.append(d[p + 4:p + 4 + sz]); p += 4 + sz
    return out

def fmt(mask_file, lip_file):
    masks = []
    for e in entries(open(mask_file, 'rb').read()):
        n = struct.unpack_from('>I', e, 4)[0]
        masks.append({'id': e[0], 'frames': [param(e, 8 + 0xa4 * k) for k in range(n)]})
    lips = []
    for e in (entries(open(lip_file, 'rb').read()) if os.path.exists(lip_file) else []):
        b = list(e); lips.append(b[:b.index(0xff) + 1] if 0xff in b else b)
    return {'masks': masks, 'lips': lips}

if __name__ == '__main__':
    ex, out = sys.argv[1], sys.argv[2]; os.makedirs(out, exist_ok=True)
    seen = set()
    for f in sorted(glob.glob(os.path.join(ex, 'rm*', 'biocv_tmp', 'eng', 'data', 'mdl', 'en9*a00.108f442e'))):
        nm = os.path.basename(f)[:4]
        if nm in seen: continue
        r = model(f)
        if r: seen.add(nm); json.dump(r, open(os.path.join(out, 'face_%s.json' % nm), 'w'), separators=(',', ':')); print(nm, r['head'], 'vtype', r['vtype'])
    for f in sorted(glob.glob(os.path.join(ex, 'rm*', 'biocv_tmp', 'eng', 'data', 'fmt', '*.4356673e'))):
        lip = f[:-8] + '42940d09'; rm = os.path.basename(f).split('.')[0]
        r = fmt(f, lip); json.dump(r, open(os.path.join(out, 'fmt_%s.json' % rm), 'w'), separators=(',', ':'))
        print(rm, 'masks', len(r['masks']), 'lips', len(r['lips']))
