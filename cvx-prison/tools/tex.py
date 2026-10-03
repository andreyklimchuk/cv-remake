# MT Framework PS3 TEX (v0x98, big endian) -> PNG via a synthetic DDS header (Pillow decodes DXT)
import struct,sys,io,os
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from PIL import Image
FMT={0x13:'DXT1',0x14:'DXT1',0x15:'DXT3',0x16:'DXT3',0x17:'DXT5',0x18:'DXT5',0x19:'DXT5',0x1f:'DXT5',0x2f:'DXT5'}
def info(d):
    assert d[1:4]==b'XET', d[:4]
    a,b,c=struct.unpack('>III',d[4:16])
    mips=b&0x3f; w=(b>>6)&0x1fff; h=b>>19
    fmt=(c>>8)&0xff
    return dict(w=w,h=h,mips=mips,fmt=fmt,c=c,a=a)
def dds(fourcc,w,h,data):
    hdr=struct.pack('<4sIIIIIII44xII4sIIIIIIIII12x',b'DDS ',124,0x1007|0x80000,h,w,len(data),0,1,32,4,fourcc.encode(),0,0,0,0,0,0x1000,0,0,0)
    return hdr+data
def decode(d):
    i=info(d); w,h,f=i['w'],i['h'],i['fmt']
    nm=max(1,i['mips'])
    off=struct.unpack('>I',d[16:20])[0]
    if f in FMT and FMT[f]=='DXT5' and w>=4 and h>=4:
        # Pillow mis-decodes these blocks; decode BC3 directly (BC4 alpha + 4-colour block)
        from bc4 import dxt5
        return Image.fromarray(dxt5(d[off:],w,h),'RGBA'), i
    if f in FMT:
        bs=8 if FMT[f]=='DXT1' else 16
        sz=max(1,(w+3)//4)*max(1,(h+3)//4)*bs
        return Image.open(io.BytesIO(dds(FMT[f],w,h,d[off:off+sz]))).convert('RGBA'), i
    # uncompressed 32-bit (ARGB big endian)
    sz=w*h*4; raw=d[off:off+sz]
    im=Image.frombytes('RGBA',(w,h),raw,'raw','ARGB')
    return im,i
if __name__=='__main__':
    for p in sys.argv[1:]:
        try:
            im,i=decode(open(p,'rb').read()); out=p.rsplit('.',1)[0]+'.png'; im.save(out); print(out,i['w'],i['h'],hex(i['fmt']))
        except Exception as e: print('ERR',p,e)
