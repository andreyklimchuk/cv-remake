"""Landmark-driven facial re-shaping for the Human Base Mesh heads (Claire / Steve likeness).
A smooth displacement field is built from the head's own landmarks (eye centres, nose tip, mouth, chin, cheekbones,
jaw angles) and applied identically to every mesh level (base, low, high), so normal bakes and weights stay valid.
Eyelids are moved by *rotating* the lid skin about the eyeball centre, so they slide over the eye without
intersecting it.  Coordinates: Blender, Z up, the face looks toward −Y, +X = the character's left."""
import numpy as np

def landmarks(P, eL, eR):
    """P: (n,3) head-region vertices of the base mesh; eL/eR: eyeball centres."""
    eL = np.asarray(eL, float); eR = np.asarray(eR, float); M = (eL + eR) / 2; iod = np.linalg.norm(eL - eR)
    mid = P[np.abs(P[:, 0] - M[0]) < 0.004]
    band = mid[(mid[:, 2] < M[2] - 0.010) & (mid[:, 2] > M[2] - 0.075)]
    nose = band[np.argmin(band[:, 1])]
    low = mid[(mid[:, 2] < nose[2] - 0.02) & (mid[:, 1] < M[1] + 0.03)]
    # chin = the most forward-down point of the midline profile below the mouth
    chin_c = low[low[:, 2] < nose[2] - 0.055]
    chin = chin_c[np.argmin(chin_c[:, 1] + 0.6 * chin_c[:, 2])] if len(chin_c) else nose + np.array([0, 0.02, -0.08])
    mouth_z = nose[2] - 0.38 * (nose[2] - chin[2])
    mz = low[np.abs(low[:, 2] - mouth_z) < 0.004]
    mouth = np.array([M[0], mz[:, 1].min() if len(mz) else nose[1] + 0.015, mouth_z])
    brow = mid[(mid[:, 2] > M[2] + 0.008) & (mid[:, 2] < M[2] + 0.03)]
    brow = brow[np.argmin(brow[:, 1])] if len(brow) else M + np.array([0, -0.03, 0.02])
    eye_r = 0.0122
    return dict(M=M, eL=eL, eR=eR, iod=iod, nose=nose, chin=chin, mouth=mouth, brow=brow, eye_r=eye_r)

def _g(P, c, r):
    d = P - np.asarray(c)[None]; return np.exp(-(d * d).sum(1) / (r * r))

def _rot_x(P, c, ang):
    """rotate points about the X axis through c by ang (rad, + = top moves forward/down toward −Y)"""
    d = P - c; ca, sa = np.cos(ang), np.sin(ang)
    y = d[:, 1] * ca - d[:, 2] * sa; z = d[:, 1] * sa + d[:, 2] * ca
    return np.stack([d[:, 0], y, z], 1) + c

def field(P, L, prof):
    """Displacement for points P (n,3) given landmarks L and a profile dict (all lengths in metres)."""
    M, nose, chin, mouth, brow, iod = L['M'], L['nose'], L['chin'], L['mouth'], L['brow'], L['iod']
    D = np.zeros_like(P)
    face = np.clip((P[:, 2] - (chin[2] - 0.035)) / 0.02, 0, 1) * np.clip((M[1] + 0.07 - P[:, 1]) / 0.03, 0, 1)
    def add(c, r, v, mirror=True):
        nonlocal D
        D += _g(P, c, r)[:, None] * np.asarray(v)[None]
        if mirror and abs(c[0] - M[0]) > 1e-4:
            cm = np.array(c, float); cm[0] = 2 * M[0] - cm[0]; vm = np.array(v, float); vm[0] = -vm[0]
            D += _g(P, cm, r)[:, None] * vm[None]
    def scale_x(c, r, k):
        nonlocal D
        D[:, 0] += _g(P, c, r) * (P[:, 0] - M[0]) * (k - 1)
    def scale_z(c, r, k, z0):
        nonlocal D
        D[:, 2] += _g(P, c, r) * (P[:, 2] - z0) * (k - 1)
    p = prof
    # ---- lower face: jaw width, chin, face length
    jaw = np.array([M[0], M[1] + 0.045, mouth[2] - 0.02])
    scale_x(jaw, p.get('jaw_r', 0.06), p.get('jaw_w', 1.0))
    scale_x(chin + np.array([0, 0.01, 0.005]), 0.028, p.get('chin_w', 1.0))
    add(chin, 0.026, (0, -p.get('chin_fwd', 0), -p.get('chin_down', 0)))
    # longer lower face: everything below the nose shifts down progressively
    if p.get('lower_len', 0):
        k = np.clip((nose[2] - P[:, 2]) / max(1e-4, nose[2] - chin[2]), 0, 1.4) * face
        D[:, 2] -= k * p['lower_len']
    # ---- cheekbones / cheeks
    cb = np.array([M[0] + 0.047, M[1] + 0.006, M[2] - 0.026])
    add(cb, 0.02, (p.get('cheek_out', 0), -p.get('cheek_fwd', 0), p.get('cheek_up', 0)))
    jowl = np.array([M[0] + 0.045, M[1] + 0.018, mouth[2] - 0.004])
    add(jowl, 0.022, (-p.get('hollow', 0) * 0.5, p.get('hollow', 0), 0))
    # ---- nose
    alar = nose + np.array([0, 0.012, -0.008])
    scale_x(alar, 0.016, p.get('nose_w', 1.0))
    add(nose, 0.011, (0, -p.get('tip_fwd', 0), p.get('tip_up', 0)), mirror=False)
    bridge = np.array([M[0], 0, M[2] - 0.008]); bridge[1] = nose[1] + 0.012
    add(bridge, 0.012, (0, -p.get('bridge', 0), 0), mirror=False)
    if p.get('nose_len', 0):
        add(nose + np.array([0, 0.004, -0.004]), 0.014, (0, 0, -p['nose_len']), mirror=False)
    # ---- mouth & lips
    ul = mouth + np.array([0, -0.001, 0.006]); ll = mouth + np.array([0, 0.0, -0.007])
    add(ul, 0.009, (0, -p.get('upper_lip', 0), 0), mirror=False)
    add(ll, 0.009, (0, -p.get('lower_lip', 0), 0), mirror=False)
    scale_x(mouth, 0.022, p.get('mouth_w', 1.0))
    for sx, up in ((1, p.get('corner_up_l', 0)), (-1, p.get('corner_up_r', 0))):
        if up: add(mouth + np.array([sx * 0.024, 0.004, 0]), 0.008, (0, 0, up), mirror=False)
    # ---- brows
    for sx in (1, -1):
        bo = np.array([M[0] + sx * 0.040, M[1] - 0.004, M[2] + 0.024])
        bi = np.array([M[0] + sx * 0.014, M[1] - 0.008, M[2] + 0.020])
        add(bo, 0.014, (0, 0, -p.get('brow_outer_down', 0)), mirror=False)
        add(bi, 0.012, (0, 0, -p.get('brow_inner_down', 0)), mirror=False)
    add(brow, 0.022, (0, p.get('brow_ridge_back', 0), 0), mirror=False)
    # ---- temples / forehead
    if p.get('forehead_w', 1.0) != 1.0:
        scale_x(np.array([M[0], M[1] + 0.02, M[2] + 0.05]), 0.06, p['forehead_w'])
    D *= face[:, None] if p.get('mask_face', True) else 1
    return D

def lids(P, L, prof):
    """Rotate upper/lower lid skin about each eyeball centre (hooding / squint / tilt)."""
    out = P.copy()
    for e, sx in ((L['eL'], 1), (L['eR'], -1)):
        d = P - e; r = np.linalg.norm(d, axis=1); R = L['eye_r']
        shell = np.exp(-((r - R - 0.003) / 0.006) ** 2) * (d[:, 1] < 0.004)
        lat = np.exp(-(d[:, 0] / 0.019) ** 2)
        up = shell * lat * np.clip(d[:, 2] / 0.006 + 0.5, 0, 1)
        lo = shell * lat * np.clip(-d[:, 2] / 0.006 + 0.5, 0, 1)
        # tilt: outer corner up (almond); rotate about Y through the eye (outer = sign sx)
        ang_up = np.radians(prof.get('upper_lid_down', 0)) * up
        ang_lo = -np.radians(prof.get('lower_lid_up', 0)) * lo
        ang = ang_up + ang_lo
        ca, sa = np.cos(ang), np.sin(ang)
        y = d[:, 1] * ca - d[:, 2] * sa; z = d[:, 1] * sa + d[:, 2] * ca
        nd = np.stack([d[:, 0], y, z], 1)
        tilt = np.radians(prof.get('canthal_tilt', 0)) * shell * np.exp(-(d[:, 0] / 0.03) ** 2)
        ct, st = np.cos(tilt * sx), np.sin(tilt * sx)
        x2 = nd[:, 0] * ct - nd[:, 2] * st; z2 = nd[:, 0] * st + nd[:, 2] * ct
        nd = np.stack([x2, nd[:, 1], z2], 1)
        m = (shell > 1e-3)
        out[m] = (nd + e)[m] + (out[m] - P[m])
    return out

def apply(objs, L, prof, head_mask_fn=None):
    """Apply the profile to every object (list of bpy objects) — same field everywhere."""
    from lib import V, setV
    for o in objs:
        P = V(o)
        m = head_mask_fn(P) if head_mask_fn else np.ones(len(P), bool)
        Q = P.copy()
        sub = Q[m]
        sub = sub + field(sub, L, prof)
        sub = lids(sub, L, prof)
        Q[m] = sub
        setV(o, Q)

CLAIRE = dict(  # CV Claire: slender oval face, high cheekbones, narrow pointed chin, straight narrow nose, fuller
    jaw_w=0.90, jaw_r=0.06, chin_w=0.86, chin_fwd=0.0025, chin_down=0.003, lower_len=0.003,   # lips, intense
    cheek_out=0.0015, cheek_fwd=0.0012, cheek_up=0.0015, hollow=0.0012,                       # hooded almond eyes
    nose_w=0.80, tip_fwd=0.0, tip_up=0.0012, bridge=0.0012,
    upper_lip=0.0014, lower_lip=0.0008, mouth_w=0.93,
    brow_inner_down=0.0016, brow_outer_down=0.0004, brow_ridge_back=0.0008,
    upper_lid_down=10.0, lower_lid_up=4.5, canthal_tilt=5.0, forehead_w=0.97)
STEVE = dict(   # CV Steve: youthful long face, narrow soft jaw, small straight nose, thin lips with a smirk
    jaw_w=0.91, jaw_r=0.065, chin_w=0.9, chin_fwd=0.001, chin_down=0.004, lower_len=0.004,
    cheek_out=0.0008, cheek_fwd=0.0006, cheek_up=0.001, hollow=0.0015,
    nose_w=0.82, tip_fwd=-0.0008, tip_up=0.0015, bridge=0.0, nose_len=-0.001,
    upper_lip=-0.0004, lower_lip=-0.0012, mouth_w=0.95, corner_up_r=0.0028, corner_up_l=0.0008,
    brow_inner_down=0.0, brow_outer_down=0.0006, brow_ridge_back=0.0025,
    upper_lid_down=5.0, lower_lid_up=2.0, canthal_tilt=1.5, forehead_w=0.97)
