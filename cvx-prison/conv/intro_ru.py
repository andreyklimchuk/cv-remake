"""Russian versions of the rm_0000 story insert pages (eft type 45, ef_045_0..2).
Same 768x768 page layout as the original textures (left margin, 48 px line pitch, first baseline,
grey-teal text on black); only the wording is translated. Output: effects/ef_045_K_ru.png"""
import sys
from PIL import Image, ImageDraw, ImageFont
OUT = sys.argv[1] if len(sys.argv) > 1 else '/data/cvx/web/public/assets/effects'
FONT = '/usr/share/fonts/liberation-serif/LiberationSerif-Regular.ttf'
COL = (196, 212, 210, 255)
PAGES = [
    (156, 228, ['Американский город на Среднем Западе', '«Раккун-Сити»', 'был полностью уничтожен', 'вспышкой T-вируса,', 'причиной которой стала', 'международная корпорация', '«Амбрелла».']),
    (158, 228, ['Клэр Редфилд,', 'приехавшая в Раккун-Сити', 'на поиски пропавшего брата Криса,', 'и новичок-полицейский', 'Леон С. Кеннеди', 'сумели выбраться из города,', 'но их испытания были лишь', 'прелюдией к грядущему...']),
    (None, 360, ['3 месяца спустя...']),
]
for k, (x0, y0, lines) in enumerate(PAGES):
    size = 31
    while True:
        f = ImageFont.truetype(FONT, size)
        w = max(f.getlength(s) for s in lines)
        if (x0 or 0) + w <= 690 or size <= 22: break
        size -= 1
    im = Image.new('RGBA', (768, 768), (0, 0, 0, 255)); d = ImageDraw.Draw(im)
    for i, s in enumerate(lines):
        x = x0 if x0 is not None else (768 - f.getlength(s)) / 2
        d.text((x, y0 - 6 + 48 * i), s, font=f, fill=COL, stroke_width=1, stroke_fill=COL)
    im.save(f'{OUT}/ef_045_{k}_ru.png'); print(k, size)
