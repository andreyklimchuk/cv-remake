import struct,numpy as np
def find(d):
    L=[];i=-1
    while True:
        i=d.find(b'MTN\x80',i+1)
        if i<0: return L
        L.append(i)
def parse(d,o,tail=176):
    nb=struct.unpack('>H',d[o+6:o+8])[0]; sz=struct.unpack('>I',d[o+8:o+12])[0]
    N=(sz-tail)//(12+nb*6)
    p=o+0x10
    T=np.frombuffer(d[p:p+N*12],dtype='>f4').reshape(N,3).astype(float); p+=N*12
    R=np.frombuffer(d[p:p+nb*N*6],dtype='>i2').reshape(nb,N,3).astype(float)*(2*np.pi/65536); p+=nb*N*6
    return dict(nb=nb,N=N,T=T,R=R,rest=d[p:o+12+sz])
def quat(e,order='zyx'):
    x,y,z=e
    def q(ax,a):
        r=np.zeros(4);r[3]=np.cos(a/2);r['xyz'.index(ax)]=np.sin(a/2);return r
    def mul(a,b):
        x1,y1,z1,w1=a;x2,y2,z2,w2=b
        return np.array([w1*x2+x1*w2+y1*z2-z1*y2,w1*y2-x1*z2+y1*w2+z1*x2,w1*z2+x1*y2-y1*x2+z1*w2,w1*w2-x1*x2-y1*y2-z1*z2])
    Q={'x':q('x',x),'y':q('y',y),'z':q('z',z)}
    r=np.array([0,0,0,1.])
    for ax in order: r=mul(r,Q[ax])
    return r
def parse2(d,o):
    """parse using the offset table at the end of the block"""
    nb=struct.unpack('>H',d[o+6:o+8])[0]; sz=struct.unpack('>I',d[o+8:o+12])[0]; end=o+0xc+sz
    base=o+0x10
    W=struct.unpack('>%dI'%(2*nb),d[end-8*nb:end])
    # find pairs (trans, rot): first word pair in table belongs to bone 0
    tr=[W[2*i] for i in range(nb)]; rt=[W[2*i+1] for i in range(nb)]
    return tr,rt,W
def qmat(q):
    x,y,z,w=q
    return np.array([[1-2*(y*y+z*z),2*(x*y-z*w),2*(x*z+y*w)],[2*(x*y+z*w),1-2*(x*x+z*z),2*(y*z-x*w)],[2*(x*z-y*w),2*(y*z+x*w),1-2*(x*x+y*y)]])
def eul(e):
    x,y,z=e
    cx,sx,cy,sy,cz,sz=np.cos(x),np.sin(x),np.cos(y),np.sin(y),np.cos(z),np.sin(z)
    Rx=np.array([[1,0,0],[0,cx,-sx],[0,sx,cx]]);Ry=np.array([[cy,0,sy],[0,1,0],[-sy,0,cy]]);Rz=np.array([[cz,-sz,0],[sz,cz,0],[0,0,1]])
    return Rz@Ry@Rx
def parse3(d,o):
    nb=struct.unpack('>H',d[o+6:o+8])[0]; sz=struct.unpack('>I',d[o+8:o+12])[0]; end=o+0xc+sz
    W=struct.unpack('>%dI'%(2*nb),d[end-8*nb:end]); base=o+0x10
    offs=[W[0]]+[W[2*i+1] for i in range(nb-1)] if False else None
    rots=[W[2*i] for i in range(1,nb)]  # placeholder
    # layout: translation N*12 at 0, then nb rotation tracks
    # N from first rotation offset
    r0=[x for x in W if x not in (0,0xffffffff)][0]; N=r0//12
    stride=(N*6+3)&~3
    T=np.frombuffer(d[base:base+N*12],dtype='>f4').reshape(N,3).astype(float)
    R=np.array([np.frombuffer(d[base+r0+k*stride:base+r0+k*stride+N*6],dtype='>i2').reshape(N,3) for k in range(nb)]).astype(float)*(2*np.pi/65536)
    return dict(nb=nb,N=N,T=T,R=R)
