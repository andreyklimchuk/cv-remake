"""Mixed-herb inventory icons from the user's RE2-remake reference shots (/data/assets_in/ref_*.png):
background removed (flood fill of dark pixels from the border), piles recoloured for the missing combos,
composited on the game's navy icon tile -> src/assets/icons/herb_{gg,gr,gb,ggg,grb}.jpg"""
import numpy as np, cv2
from PIL import Image, ImageDraw
SRC = '/data/assets_in'; DST = '/data/cv-remake/src/assets/icons'; RES = 256

def tile():
    W = RES
    y, x = np.mgrid[0:W, 0:W].astype(np.float32) / W
    r = np.sqrt((x - 0.5) ** 2 + (y - 0.42) ** 2)
    c0 = np.array([34, 58, 118], np.float32); c1 = np.array([6, 12, 34], np.float32)
    t = np.clip(r / 0.72, 0, 1)[..., None] ** 1.2
    img = c0 * (1 - t) + c1 * t
    img += (np.random.default_rng(1).random((W, W, 1)) - 0.5) * 5
    im = Image.fromarray(np.clip(img, 0, 255).astype(np.uint8))
    d = ImageDraw.Draw(im)
    d.rectangle([1, 1, W - 2, W - 2], outline=(70, 96, 150), width=2)
    d.rectangle([4, 4, W - 5, W - 5], outline=(12, 20, 44), width=1)
    return im

def cutout(path, crop=None, thr=46, grey_cut=False):
    a = cv2.imread(path)
    if crop: x0, y0, x1, y1 = crop; a = a[y0:y1, x0:x1]
    lum = a.max(2)
    dark = (lum < thr).astype(np.uint8)
    # background = dark region connected to the border
    n, lab = cv2.connectedComponents(dark, connectivity=4)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0} if True else set()
    bg = np.isin(lab, list(border)) & (dark > 0)
    m = (~bg).astype(np.uint8) * 255
    if grey_cut:
        hsv = cv2.cvtColor(a, cv2.COLOR_BGR2HSV); m[(hsv[..., 1] < 40)] = 0
        m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
    # keep the largest blob (paper) + things touching it
    n, lab, st, _ = cv2.connectedComponentsWithStats(m)
    big = 1 + np.argmax(st[1:, cv2.CC_STAT_AREA]); m = np.where(lab == big, 255, 0).astype(np.uint8)
    # fill holes (anything not reachable from the border)
    pad = cv2.copyMakeBorder(m, 1, 1, 1, 1, cv2.BORDER_CONSTANT, value=0); ff = pad.copy()
    cv2.floodFill(ff, np.zeros((pad.shape[0] + 2, pad.shape[1] + 2), np.uint8), (0, 0), 128)
    m = np.where(ff[1:-1, 1:-1] == 128, 0, 255).astype(np.uint8)
    m = cv2.GaussianBlur(m, (3, 3), 0)
    return a, m

def recolor(a, hue_ranges, to_hue, region=None, sat_min=0.28):
    hsv = cv2.cvtColor(a, cv2.COLOR_BGR2HSV_FULL).astype(np.float32)  # H 0..255
    h = hsv[..., 0] * 360 / 255; s = hsv[..., 1] / 255
    sel = np.zeros(h.shape, bool)
    for lo, hi in hue_ranges: sel |= (h >= lo) & (h <= hi)
    sel &= s > sat_min
    if region is not None: sel &= region
    w = cv2.GaussianBlur(sel.astype(np.float32), (5, 5), 0)
    hsv2 = hsv.copy(); hsv2[..., 0] = to_hue * 255 / 360
    if 60 < to_hue < 140: hsv2[..., 1] = np.clip(np.maximum(hsv[..., 1] * 1.1, 150), 0, 255); hsv2[..., 2] = np.clip(hsv[..., 2] * 0.95 + 10, 0, 255)
    out = cv2.cvtColor(hsv2.astype(np.uint8), cv2.COLOR_HSV2BGR_FULL).astype(np.float32)
    return (a * (1 - w[..., None]) + out * w[..., None]).astype(np.uint8)

def compose(a, m, name):
    ys, xs = np.nonzero(m > 128); a = a[ys.min():ys.max() + 1, xs.min():xs.max() + 1]; m = m[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    h, w = m.shape; s = (RES - 36) / max(h, w)
    a = cv2.resize(a, (int(w * s), int(h * s)), interpolation=cv2.INTER_AREA); m = cv2.resize(m, (int(w * s), int(h * s)), interpolation=cv2.INTER_AREA)
    t = tile(); rgb = Image.fromarray(cv2.cvtColor(a, cv2.COLOR_BGR2RGB))
    # soft drop shadow
    sh = Image.new('L', t.size, 0); sh.paste(Image.fromarray((m * 0.55).astype(np.uint8)), ((RES - a.shape[1]) // 2 + 4, (RES - a.shape[0]) // 2 + 7))
    from PIL import ImageFilter
    t.paste((0, 0, 0), (0, 0), sh.filter(ImageFilter.GaussianBlur(6)))
    t.paste(rgb, ((RES - a.shape[1]) // 2, (RES - a.shape[0]) // 2), Image.fromarray(m))
    t.save(f'{DST}/{name}.jpg', quality=92); print('icon', name, a.shape)

gr, mgr = cutout(f'{SRC}/ref_gr.png', crop=(395, 200, 840, 540), thr=70, grey_cut=True)
compose(gr, mgr, 'herb_gr')
# G+B: red pile (left) -> blue
H, W = mgr.shape; yy, xx = np.mgrid[0:H, 0:W]
left = xx < W * 0.52
compose(recolor(gr, [(320, 360), (0, 12)], 240, left, 0.30), mgr, 'herb_gb')
grb, mgrb = cutout(f'{SRC}/ref_grb.png', thr=30)
compose(grb, mgrb, 'herb_grb')
# G+G+G: red and blue piles -> green (hue of the green pile ~ 78)
g3 = recolor(grb, [(320, 360), (0, 14)], 80, None, 0.42)
g3 = recolor(g3, [(200, 300)], 80, None, 0.25)
compose(g3, mgrb, 'herb_ggg')
gg, mgg = cutout(f'{SRC}/ref_gg.png', thr=30)
compose(gg, mgg, 'herb_gg')
