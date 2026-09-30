import numpy as np
from lib import *

def add_shape_keys(body, joints, S):
    P0 = V(body)
    # ---- shape keys: blink / pain / grip
    body.shape_key_add(name='Basis', from_mix=False)
    def smoothstep(a, b, x):
        t = np.clip((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t)
    def rot_about(P, origin, axis, ang):
        axis = axis / np.linalg.norm(axis); v = P - origin
        c, s_ = np.cos(ang)[:, None], np.sin(ang)[:, None]
        return origin + v * c + np.cross(axis, v) * s_ + axis * (v @ axis)[:, None] * (1 - c)

    def blink_positions(P, amount=1.0, lower=1.0):
        out = P.copy()
        for side in 'lr':
            c = np.array(joints[side + 'Eye']); r = 0.012 * S
            d = np.linalg.norm(P - c, axis=1)
            rel = P - c
            front = rel[:, 1] < -0.15 * r
            el = np.degrees(np.arctan2(rel[:, 2], -rel[:, 1]))
            near = (d < 2.4 * r) & front & (np.abs(rel[:, 0]) < 1.9 * r)
            rim = near & (d < r * 1.3) & (rel[:, 1] < -0.45 * r)
            top = el[rim & (el > 0)].max() if np.any(rim & (el > 0)) else 25
            bot = el[rim & (el < 0)].min() if np.any(rim & (el < 0)) else -20
            close = bot + 0.25 * (top - bot)
            fall_d = smoothstep(2.4 * r, 1.35 * r, d)
            up = near & (el > close)
            w_up = fall_d * smoothstep(top + 40, top + 4, el)
            ang_up = np.radians(top - close) * w_up * amount
            low = near & (el <= close)
            w_lo = fall_d * smoothstep(bot - 25, bot - 2, el)
            ang_lo = -np.radians(close - bot) * w_lo * amount * lower
            ang = np.where(up, ang_up, np.where(low, ang_lo, 0.0))
            idx = np.nonzero(near)[0]
            out[idx] = rot_about(P[idx], c, np.array([1.0, 0, 0]), ang[idx])
            print(side, 'eye rim elev top %.1f bottom %.1f' % (top, bot), 'verts', len(idx))
        return out

    k = body.shape_key_add(name='blink', from_mix=False)
    Pb = blink_positions(P0)
    k.data.foreach_set('co', Pb.ravel())
    # pain: brows pulled down/in + slight squint
    Pp = blink_positions(P0, 0.3, 0.8)
    for side, sx in (('l', 1), ('r', -1)):
        c = np.array(joints[side + 'Eye'])
        rel = Pp - c
        w = smoothstep(0.03, 0.008, np.hypot(rel[:, 0] - 0.004 * sx * 0, (rel[:, 2] - 0.02))) * (rel[:, 1] < 0.0)
        Pp[:, 2] -= w * 0.0035; Pp[:, 0] -= w * sx * 0.002
    k = body.shape_key_add(name='pain', from_mix=False); k.data.foreach_set('co', Pp.ravel())

    def grip_positions(P, side):
        sx = 1 if side == 'l' else -1
        wrist = np.array(joints[side + 'Hand']); fore = np.array(joints[side + 'Forearm'])
        fdir = (wrist - fore) / np.linalg.norm(wrist - fore)
        rel = P - wrist; t = rel @ fdir
        H = (t > -0.005) & (P[:, 0] * sx > 0.2) & (np.linalg.norm(rel, axis=1) < 0.26)
        Q = rel[H]; u, sv, vh = np.linalg.svd(Q - Q.mean(0), full_matrices=False)
        e1, e2, e3 = vh[0], vh[1], vh[2]
        if e1 @ fdir < 0: e1 = -e1
        medial = np.array([-sx, 0, 0.0])
        if e3 @ medial < 0: e3 = -e3
        e2 = np.cross(e3, e1)
        a1, a2 = Q @ e1, Q @ e2
        dist = np.hypot(a1, a2); ang = np.arctan2(a2, a1)
        distal = dist > 0.085
        A = ang[distal]; qs = np.quantile(A, [0.1, 0.3, 0.5, 0.7, 0.9]); cent = qs.copy()
        for _ in range(30):
            lab = np.argmin(np.abs(A[:, None] - cent[None]), 1)
            cent = np.array([A[lab == i].mean() if np.any(lab == i) else cent[i] for i in range(5)])
        order = np.argsort(cent); cent = cent[order]
        reach = np.array([dist[distal][np.argmin(np.abs(A[:, None] - cent[None]), 1) == i].max() for i in range(5)])
        thumb = 0 if reach[0] < reach[4] else 4
        print(side, 'finger angles', np.round(np.degrees(cent), 1), 'reach', np.round(reach, 3), 'thumb idx', thumb)
        out = P.copy(); HQ = np.nonzero(H)[0]
        lab_all = np.argmin(np.abs(ang[:, None] - cent[None]), 1)
        fingers = [i for i in range(5) if i != thumb]
        # index finger = the finger adjacent to the thumb
        index_f = fingers[0] if thumb == 0 else fingers[-1]
        Rp = Q.copy()
        for i in range(5):
            m = lab_all == i
            if not np.any(m): continue
            pts = Q[m & distal] if i != thumb else Q[m & (dist > 0.04)]
            cc = pts.mean(0); _, _, vv = np.linalg.svd(pts - cc, full_matrices=False); d_ = vv[0]
            if d_ @ e1 < 0 and i != thumb: d_ = -d_
            if i == thumb and d_ @ (cc) < 0: d_ = -d_
            d_ = d_ / np.linalg.norm(d_)
            k_ax = np.cross(d_, e3); k_ax /= np.linalg.norm(k_ax)
            tip_s = (pts - cc) @ d_
            tip = cc + d_ * tip_s.max()
            if i == thumb:
                L = np.linalg.norm(tip) * 0.72; joints_s = [0.0, 0.55 * L]; angs = [0.55, 0.45]
                base = tip - d_ * L
            else:
                L = np.linalg.norm(tip) * 0.46; base = tip - d_ * L
                joints_s = [0.0, 0.5 * L, 0.8 * L]
                angs = [0.55, 0.9, 0.5] if i == index_f and side == 'r' else [1.0, 1.35, 0.75]
            sel = np.nonzero(m)[0]
            s_v = (Q[sel] - base) @ d_
            for js, a in reversed(list(zip(joints_s, angs))):
                wv = smoothstep(js - 0.005, js + 0.005, s_v)
                origin = base + d_ * js
                ok = wv > 0
                if np.any(ok):
                    Rp[sel[ok]] = rot_about(Rp[sel[ok]], origin, k_ax, a * wv[ok])
        out[HQ] = Rp + wrist
        return out

    for side in 'lr':
        k = body.shape_key_add(name='grip_' + side.upper(), from_mix=False)
        k.data.foreach_set('co', grip_positions(P0, side).ravel())
    zero_keys(body)
