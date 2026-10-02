# ASCII preview of an image: letter = hue class (r,o,y,g,c,b,m,w=gray), uppercase = bright, '.' = dark, ' ' = transparent
import sys,colorsys
from PIL import Image
def asc(path,W=96,box=None):
    im=Image.open(path).convert('RGBA')
    if box: im=im.crop(box)
    H=max(1,int(W*im.size[1]/im.size[0]/2))
    s=im.resize((W,H),Image.BOX)
    out=[]
    for y in range(H):
        row=''
        for x in range(W):
            r,g,b,a=s.getpixel((x,y))
            if a<40: row+=' '; continue
            h,l,sat=colorsys.rgb_to_hls(r/255,g/255,b/255)
            if l<0.12: row+='.'; continue
            if sat<0.25 or l>0.92: c='w'
            else: c='roygcbmr'[int(h*8)%8] if h<0.95 else 'r'
            if c=='r' and 0.05<h<0.1: c='o'
            row+=c.upper() if l>0.5 else c
        out.append(row)
    return '\n'.join(out)
if __name__=='__main__':
    box=tuple(map(int,sys.argv[3].split(','))) if len(sys.argv)>3 else None
    print(asc(sys.argv[1],int(sys.argv[2]) if len(sys.argv)>2 else 96,box))
