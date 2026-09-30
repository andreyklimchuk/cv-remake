"""Vectorised procedural texture synthesis (numpy) evaluated on baked per-texel positions."""
import numpy as np
_rs = np.random.RandomState(1234)
_perm = _rs.permutation(256).astype(np.int32); PERM = np.concatenate([_perm, _perm, _perm])
G3 = np.array([[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]], np.float32)
H3 = _rs.rand(256, 3).astype(np.float32)

def _h(ix, iy, iz): return PERM[PERM[PERM[ix & 255] + (iy & 255)] + (iz & 255)]

def perlin(p):
    p = np.asarray(p, np.float32); pi = np.floor(p); f = p - pi; i = pi.astype(np.int32)
    u = f * f * f * (f * (f * 6 - 15) + 10)
    def g(dx, dy, dz):
        G = G3[_h(i[:, 0] + dx, i[:, 1] + dy, i[:, 2] + dz) % 12]
        return G[:, 0] * (f[:, 0] - dx) + G[:, 1] * (f[:, 1] - dy) + G[:, 2] * (f[:, 2] - dz)
    x00 = g(0,0,0) + u[:,0] * (g(1,0,0) - g(0,0,0)); x10 = g(0,1,0) + u[:,0] * (g(1,1,0) - g(0,1,0))
    x01 = g(0,0,1) + u[:,0] * (g(1,0,1) - g(0,0,1)); x11 = g(0,1,1) + u[:,0] * (g(1,1,1) - g(0,1,1))
    y0 = x00 + u[:,1] * (x10 - x00); y1 = x01 + u[:,1] * (x11 - x01)
    return (y0 + u[:,2] * (y1 - y0)) * 1.4

def fbm(p, octaves=4, lac=2.0, gain=0.5, scale=1.0):
    p = np.asarray(p, np.float32) * scale; a, s, tot = 1.0, 0.0, 0.0
    for o in range(octaves):
        s = s + a * perlin(p + o * 17.13); tot += a; a *= gain; p = p * lac
    return s / tot

def worley(p, scale=1.0):
    """Returns F1, F2 cellular distances (in cell units)."""
    p = np.asarray(p, np.float32) * scale; pi = np.floor(p).astype(np.int32); f = p - pi
    F1 = np.full(len(p), 9.0, np.float32); F2 = np.full(len(p), 9.0, np.float32)
    for dx in (-1, 0, 1):
        for dy in (-1, 0, 1):
            for dz in (-1, 0, 1):
                h = H3[_h(pi[:, 0] + dx, pi[:, 1] + dy, pi[:, 2] + dz)]
                d = np.sqrt(((np.array([dx, dy, dz], np.float32) + h - f) ** 2).sum(1))
                F2 = np.where(d < F1, F1, np.minimum(F2, d)); F1 = np.minimum(F1, d)
    return F1, F2

def cellid(p, scale=1.0):
    p = np.asarray(p, np.float32) * scale; pi = np.floor(p).astype(np.int32)
    return H3[_h(pi[:, 0], pi[:, 1], pi[:, 2])][:, 0]

def ss(a, b, x):
    t = np.clip((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t)

def lerp(a, b, t):
    t = np.asarray(t, np.float32)
    if np.ndim(a) and np.ndim(t) == 1 and np.ndim(a) > 1: t = t[:, None]
    return a + (b - a) * (t[:, None] if np.ndim(t) == 1 and np.ndim(b) > 0 and np.asarray(b).shape[-1:] == (3,) else t)

def mix3(a, b, t):
    a = np.broadcast_to(np.asarray(a, np.float32), (len(t), 3)); b = np.broadcast_to(np.asarray(b, np.float32), (len(t), 3))
    return a + (b - a) * np.asarray(t, np.float32)[:, None]

def line_mask(d, width, soft):
    """Anti-aliased line from a signed/abs distance field."""
    return 1 - ss(width * 0.5, width * 0.5 + soft, np.abs(d))

def stitches(d_across, s_along, width=0.0012, period=0.0045, duty=0.62, soft=0.0005):
    """Dashed stitch line: d_across = distance to seam line, s_along = arc-length coordinate."""
    ph = (s_along / period) % 1.0
    dash = ss(0.0, 0.08, ph) * (1 - ss(duty - 0.08, duty, ph))
    return line_mask(d_across, width, soft) * dash

def dilate(img, mask, iters=12):
    """Fill uncovered texels by iterative neighbour averaging (UV seam padding)."""
    img = img.copy(); m = mask.copy()
    for _ in range(iters):
        acc = np.zeros_like(img); cnt = np.zeros(m.shape, np.float32)
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1), (1, 1), (-1, -1), (1, -1), (-1, 1)):
            sm = np.roll(np.roll(m, dy, 0), dx, 1); si = np.roll(np.roll(img, dy, 0), dx, 1)
            acc += si * sm[..., None]; cnt += sm
        new = (~m) & (cnt > 0)
        img[new] = acc[new] / cnt[new][:, None]; m = m | new
    return img
