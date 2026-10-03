# Convert an original room archive (rdx_lnk/rm_XXXX.arc) into rooms/<id>.glb + rooms/<id>.json
# (+ objects/ob_*.glb, items/it_*.glb) in the format used by the web game.
import sys,os,glob,struct,json,math,shutil
sys.path.insert(0,'/data/cvx/tools'); sys.path.insert(0,'/data/cvx/conv')
from arc import extract
from mes import parse as parse_mes
import subprocess
A=2*math.pi/65536
OUT='/data/cvx/web/public/assets'
def f(d,o): return struct.unpack_from('>f',d,o)[0]
def s16(d,o): return struct.unpack_from('>h',d,o)[0]
def box(d,o):
    t,fl=struct.unpack_from('<II',d,o); x,y,z,sx,sy,sz=struct.unpack_from('>6f',d,o+8); ex=struct.unpack_from('<I',d,o+32)[0]
    return dict(type='%x'%t,flags='%x'%fl,x=x*.1,y=y*.1,z=z*.1,sx=sx*.1,sy=sy*.1,sz=sz*.1,extra=ex)
def atr(d):
    nc,nt,na=struct.unpack_from('<III',d,8)
    o=0x20; C=[box(d,o+36*i) for i in range(nc)]; o+=36*nc
    T=[box(d,o+36*i) for i in range(nt)]; o+=36*nt
    R=[box(d,o+36*i) for i in range(na)]
    return C,T,R
def ents(d):
    n=struct.unpack_from('>I',d,8)[0] if d[8:12]!=b'\0\0\0\0' and struct.unpack_from('>I',d,8)[0]<4096 else struct.unpack_from('<I',d,8)[0]
    if n>4096: n=struct.unpack_from('<I',d,8)[0]
    out=[]
    for i in range(n):
        o=0x10+36*i
        if o+36>len(d): break
        fl=struct.unpack_from('>I',d,o)[0]; idn=struct.unpack_from('>H',d,o+4)[0]
        x,y,z=struct.unpack_from('>3f',d,o+12); rx,ry,rz,r3=struct.unpack_from('>hhhh',d,o+24)
        out.append(dict(flags='%08x'%fl,id=idn,pos=[x*.1,y*.1,z*.1],rot=[rx*A,ry*A,rz*A],r3=r3))
    return out
def cams(d):
    n=struct.unpack_from('<I',d,8)[0]; out=[]
    for i in range(n):
        e=0x10+0x2a8*i
        x0,_,z0,sx,_,sz=struct.unpack_from('>6f',d,e+0x08)
        fl=struct.unpack_from('>I',d,e+0x20)[0]; pos=struct.unpack_from('>3f',d,e+0x24); raw=struct.unpack_from('>4f',d,e+0x30)
        pitch,yaw,roll=[s16(d,e+0x56+4*k) for k in range(3)]; p0,p1=s16(d,e+0x62),s16(d,e+0x66)
        lim=struct.unpack_from('>HHHH',d,e+0x68) if fl&0xff0000!=0x280000 else (0,0,0,0)
        lens=d[e+0x70]
        out.append(dict(zone=[x0*.1,z0*.1,(x0+sx)*.1,(z0+sz)*.1],pos=[p*.1 for p in pos],pitch=pitch*A,yaw=-yaw*A,roll=roll*A,flags='%08x'%fl,
                        pan=[p0*A,p1*A],raw=list(raw),lim=[l*A for l in lim],lens=lens))
    return out
def lights(d):
    n=struct.unpack_from('<I',d,8)[0]; out=[]
    for i in range(n):
        e=0x10+224*i
        typ=struct.unpack_from('>I',d,e+0x14)[0]; pos=struct.unpack_from('>3f',d,e+0x1c); dr=struct.unpack_from('>3f',d,e+0x34)
        amb=struct.unpack_from('>3f',d,e+0x40); col=struct.unpack_from('>3f',d,e+0x4c); near,far=struct.unpack_from('>2f',d,e+0x58)
        if not any(pos) and not any(col): continue
        out.append(dict(type=0,pos=[p*.1 for p in pos],dir=list(dr),color=list(col),near=near*.1,far=far*.1,amb=list(amb)))
    return out
def spawns(d):
    n=struct.unpack_from('<I',d,8)[0]; out=[]
    for i in range(n):
        x,y,z=struct.unpack_from('>3f',d,0x10+16*i); a=struct.unpack_from('>i',d,0x10+16*i+12)[0]
        out.append(dict(pos=[x*.1,y*.1,z*.1],ang=a*A,raw=a))
    return out
def one(dirp,sub,name=None):
    L=glob.glob(os.path.join(dirp,'biocv_tmp/eng/data',sub,'*'))
    L=[x for x in L if os.path.isfile(x) and (name is None or os.path.basename(x).startswith(name))]
    return open(L[0],'rb').read() if L else None
ITEMNAMES=json.load(open('/data/cvx/conv/sysnames.json'))
def convert(rid,force_models=False):
    src='/data/cvx/g/biocv_disc/eng/rdx_lnk/%s.arc'%rid; ex='/data/cvx/ex/%s'%rid.replace('_','')
    if not os.path.isdir(ex): extract(src,ex)
    D=ex+'/biocv_tmp/eng/data'
    C,T,R=atr(one(ex,'atr'))
    J=dict(id=rid,cameras=cams(one(ex,'cut')),collision=C,triggers=T,areas=R,spawns=spawns(one(ex,'pos')),
           messages=parse_mes(one(ex,'mes')) if one(ex,'mes') else [],items=ents(one(ex,'itm')),objects=ents(one(ex,'obj')),
           enemies=ents(one(ex,'ene')) if one(ex,'ene') else [],lights=lights(one(ex,'lgt')))
    for it in J['items']:
        n=ITEMNAMES.get(str(it['id']))
        if n: it['name']=n
    om={int(os.path.basename(p).split('.')[0][3:]):p for p in glob.glob(D+'/omd/ob_*.7db518e8')}
    for ob in J['objects']:
        if ob['id'] in om or ob['flags']!='00000000':
            p=om.get(ob['id'])
            if p:
                ob['model']='ob_%03d'%ob['id'] if ob['id']<1000 else 'ob_%d'%ob['id']
    os.makedirs(OUT+'/rooms',exist_ok=True); os.makedirs(OUT+'/objects',exist_ok=True); os.makedirs(OUT+'/items',exist_ok=True)
    # geometry
    mp=[p for p in glob.glob(D+'/map/*.7db518e8')][0]; tdir=mp.rsplit('.',1)[0]
    g=OUT+'/rooms/%s.glb'%rid
    if force_models or not os.path.exists(g): subprocess.run(['python3','/data/cvx/tools/conv_mdl.py',mp,tdir,g],check=True,capture_output=True)
    for p in glob.glob(D+'/omd/ob_*.7db518e8')+glob.glob(D+'/imd/it_*.7db518e8'):
        nm=os.path.basename(p).split('.')[0]; kind='objects' if nm.startswith('ob') else 'items'
        o=OUT+'/%s/%s.glb'%(kind,nm)
        if force_models or not os.path.exists(o): subprocess.run(['python3','/data/cvx/tools/conv_mdl.py',p,p.rsplit('.',1)[0],o],check=True,capture_output=True)
    json.dump(J,open(OUT+'/rooms/%s.json'%rid,'w'))
    return J
if __name__=='__main__':
    for r in sys.argv[1:]:
        J=convert(r); print(r,'cams',len(J['cameras']),'coll',len(J['collision']),'trig',len(J['triggers']),'items',[(i['id'],i.get('name')) for i in J['items']],'ene',[e['id'] for e in J['enemies']])
