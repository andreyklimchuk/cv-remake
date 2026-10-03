# BC4-style 8-byte alpha block decoding (used by fmt 0x18 = two-channel "ATI2/3Dc"-like textures in the PS3 port)
import numpy as np
def bc4_blocks(b):
    """b: (n,8) uint8 -> (n,16) uint8"""
    a0=b[:,0].astype(int); a1=b[:,1].astype(int)
    bits=np.zeros(len(b),dtype=np.uint64)
    for k in range(6): bits|=b[:,2+k].astype(np.uint64)<<np.uint64(8*k)
    idx=np.array([(bits>>np.uint64(3*i))&np.uint64(7) for i in range(16)]).T.astype(int)
    pal=np.zeros((len(b),8),int); pal[:,0]=a0; pal[:,1]=a1
    gt=a0>a1
    for i in range(1,7): pal[:,1+i]=np.where(gt,((7-i)*a0+i*a1)//7,0)
    for i in range(1,5): pal[:,1+i]=np.where(gt,pal[:,1+i],((5-i)*a0+i*a1)//5)
    pal[:,6]=np.where(gt,pal[:,6],0); pal[:,7]=np.where(gt,pal[:,7],255)
    return np.take_along_axis(pal,idx,1).astype(np.uint8)
def decode2(data,w,h):
    n=(w//4)*(h//4); b=np.frombuffer(data[:n*16],np.uint8).reshape(n,16)
    c1=bc4_blocks(b[:,:8]); c2=bc4_blocks(b[:,8:])
    def img(c): return c.reshape(h//4,w//4,4,4).transpose(0,2,1,3).reshape(h,w)
    return img(c1),img(c2)
def dxt_color(b,be=False):
    """b: (n,8) colour blocks -> (n,16,3) uint8 (always 4-colour mode as in DXT3/5)"""
    if be: c0=(b[:,0].astype(int)<<8)|b[:,1]; c1=(b[:,2].astype(int)<<8)|b[:,3]
    else: c0=(b[:,1].astype(int)<<8)|b[:,0]; c1=(b[:,3].astype(int)<<8)|b[:,2]
    def rgb(c): return np.stack([((c>>11)&31)*255//31,((c>>5)&63)*255//63,(c&31)*255//31],1)
    p0=rgb(c0); p1=rgb(c1); pal=np.stack([p0,p1,(2*p0+p1)//3,(p0+2*p1)//3],1)
    bits=b[:,4].astype(np.uint32)|(b[:,5].astype(np.uint32)<<8)|(b[:,6].astype(np.uint32)<<16)|(b[:,7].astype(np.uint32)<<24)
    if be: bits=b[:,7].astype(np.uint32)|(b[:,6].astype(np.uint32)<<8)|(b[:,5].astype(np.uint32)<<16)|(b[:,4].astype(np.uint32)<<24)
    idx=np.array([(bits>>(2*i))&3 for i in range(16)]).T.astype(int)
    return np.take_along_axis(pal,idx[:,:,None].repeat(3,2),1).astype(np.uint8)
def dxt5(data,w,h,be=False):
    n=(w//4)*(h//4); b=np.frombuffer(data[:n*16],np.uint8).reshape(n,16)
    a=bc4_blocks(b[:,:8]); c=dxt_color(b[:,8:],be)
    rgba=np.concatenate([c,a[:,:,None]],2)
    return rgba.reshape(h//4,w//4,4,4,4).transpose(0,2,1,3,4).reshape(h,w,4)
