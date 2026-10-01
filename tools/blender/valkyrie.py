"""Valkyrie back-print artwork for Claire's biker jacket -> work/valkyrie.png (RGBA, 1024x1024)."""
import math, os
from PIL import Image, ImageDraw, ImageFont, ImageFilter
W = 1024; SS = 2; R = W * SS
img = Image.new('RGBA', (R, R), (0, 0, 0, 0)); d = ImageDraw.Draw(img)
INK = (232, 222, 196, 255); GOLD = (196, 150, 70, 255); DARK = (30, 14, 10, 255)
cx, cy = R // 2, int(R * 0.46)
def P(x, y): return (cx + x * SS, cy + y * SS)
# outer rings
for rr, w, c in ((440, 22, INK), (408, 6, GOLD)):
    d.ellipse([cx - rr * SS, cy - rr * SS, cx + rr * SS, cy + rr * SS], outline=c, width=w * SS)
# wings: layered feathers fanning out from shoulders
def feather(x0, y0, ang, ln, wd, col):
    a = math.radians(ang); dx, dy = math.cos(a), math.sin(a); nx, ny = -dy, dx
    pts = [P(x0 + nx * wd * 0.3, y0 + ny * wd * 0.3), P(x0 + dx * ln * 0.55 + nx * wd, y0 + dy * ln * 0.55 + ny * wd),
           P(x0 + dx * ln, y0 + dy * ln), P(x0 + dx * ln * 0.55 - nx * wd * 0.5, y0 + dy * ln * 0.55 - ny * wd * 0.5),
           P(x0 - nx * wd * 0.3, y0 - ny * wd * 0.3)]
    d.polygon(pts, fill=col, outline=DARK); d.line(pts, fill=DARK, width=4 * SS)
for side in (1, -1):
    for row, (lscale, wd, col) in enumerate(((1.0, 30, INK), (0.72, 28, GOLD), (0.45, 26, INK))):
        n = 11 - row * 3
        for i in range(n):
            t = i / max(1, n - 1)
            ang = -75 + t * 105            # up-out -> down-out (image coords, y down)
            ln = 360 * lscale * (0.62 + 0.45 * math.sin(math.pi * min(1, t * 1.25)))
            a = ang if side > 0 else 180 - ang
            feather(side * 30, -55 + row * 6, a, ln, wd, col)
    # wing bone / covert arc
    d.polygon([P(side * 20, -70), P(side * 120, -150), P(side * 230, -170), P(side * 160, -95), P(side * 40, -20)], fill=GOLD, outline=DARK)
# body: robe/armour silhouette
d.polygon([P(-55, -40), P(55, -40), P(80, 110), P(120, 300), P(-120, 300), P(-80, 110)], fill=INK, outline=DARK)
d.line([P(-55, -40), P(-80, 110), P(-120, 300)], fill=DARK, width=5 * SS); d.line([P(55, -40), P(80, 110), P(120, 300)], fill=DARK, width=5 * SS)
for k in range(-2, 3): d.line([P(k * 22, 130), P(k * 40, 300)], fill=DARK, width=4 * SS)  # robe folds
d.rectangle([P(-62, 90), P(62, 112)], fill=GOLD, outline=DARK, width=4 * SS)  # belt
# breastplate
d.polygon([P(-50, -30), P(50, -30), P(40, 70), P(0, 88), P(-40, 70)], fill=GOLD, outline=DARK); d.line([P(0, -30), P(0, 85)], fill=DARK, width=4 * SS)
# neck + head with winged helmet
d.rectangle([P(-16, -70), P(16, -36)], fill=INK, outline=DARK, width=4 * SS)
d.ellipse([P(-42, -150), P(42, -62)], fill=INK, outline=DARK, width=5 * SS)
d.chord([P(-48, -165), P(48, -85)], 180, 360, fill=GOLD, outline=DARK, width=5 * SS)  # helmet dome
d.rectangle([P(-6, -112), P(6, -78)], fill=GOLD, outline=DARK, width=3 * SS)  # nose guard
for s in (1, -1):  # helmet wings
    for j in range(4):
        a = math.radians(-100 + j * 18) if s > 0 else math.radians(-80 - j * 18)
        x0, y0 = s * 44, -128
        tip = (x0 + math.cos(a) * (-1 if s > 0 else 1) * -70 * 1.0, y0 + math.sin(a) * 70)
        d.polygon([P(x0, y0 + 6), P(tip[0] + s * 30, tip[1]), P(x0 + s * 6, y0 - 8)], fill=INK, outline=DARK)
# hair flowing
for s in (1, -1):
    d.polygon([P(s * 40, -110), P(s * 70, -40), P(s * 58, 10), P(s * 30, -60)], fill=GOLD, outline=DARK)
# eyes (shadow)
d.rectangle([P(-26, -112), P(-8, -104)], fill=DARK); d.rectangle([P(8, -112), P(26, -104)], fill=DARK)
# spear (diagonal, right hand)
d.line([P(170, -330), P(-150, 330)], fill=DARK, width=20 * SS); d.line([P(170, -330), P(-150, 330)], fill=INK, width=10 * SS)
d.polygon([P(205, -400), P(150, -320), P(190, -310)], fill=GOLD, outline=DARK)
# round shield (left)
sx, sy, sr = -150, 160, 105
d.ellipse([P(sx - sr, sy - sr), P(sx + sr, sy + sr)], fill=GOLD, outline=DARK, width=8 * SS)
d.ellipse([P(sx - sr + 20, sy - sr + 20), P(sx + sr - 20, sy + sr - 20)], outline=DARK, width=5 * SS)
for k in range(8):
    a = k * math.pi / 4; d.line([P(sx, sy), P(sx + math.cos(a) * (sr - 20), sy + math.sin(a) * (sr - 20))], fill=DARK, width=4 * SS)
d.ellipse([P(sx - 22, sy - 22), P(sx + 22, sy + 22)], fill=INK, outline=DARK, width=4 * SS)
# banner with text
by = 395
d.polygon([P(-380, by - 55), P(380, by - 55), P(420, by), P(380, by + 55), P(-380, by + 55), P(-420, by)], fill=DARK, outline=INK)
d.line([P(-380, by - 55), P(380, by - 55)], fill=INK, width=6 * SS); d.line([P(-380, by + 55), P(380, by + 55)], fill=INK, width=6 * SS)
fp = '/usr/share/fonts/msttcore/impact.ttf'
if not os.path.exists(fp):
    fp = [os.path.join(r, f) for r, _, fs in os.walk('/usr/share/fonts') for f in fs if 'impact' in f.lower() or 'Bold' in f][0]
font = ImageFont.truetype(fp, 92 * SS)
d.text(P(0, by + 2), 'VALKYRIE', fill=INK, font=font, anchor='mm')
img = img.resize((W, W), Image.LANCZOS)
os.makedirs('/data/assets_src/work', exist_ok=True)
img.save('/data/assets_src/work/valkyrie.png')
bg = Image.new('RGBA', (W, W), (40, 10, 6, 255)); bg.alpha_composite(img); bg.convert('RGB').save('/tmp/valk_prev.jpg')
print('ok')
