# Ninja chunk model (Dreamcast-era, big-endian "MDL\xbc" as used by RE CVX PS3) -> glTF binary
import struct,math,sys,os,io,json
import numpy as np
def u32(d,o): return struct.unpack_from('>I',d,o)[0]
def s32(d,o): return struct.unpack_from('>i',d,o)[0]
def f32(d,o): return struct.unpack_from('>f',d,o)[0]
class Mdl:
    def __init__(s,d):
        b=d.find(b'MDL\xbc'); s.base=b; s.d=d
        s.nparts=struct.unpack_from('>H',d,b+6)[0]
        s.root=u32(d,b+0xc); s.ntex=u32(d,b+0x14)
        s.nodes=[]
    def off(s,p): return s.base+0x10+p
    def walk(s):
        out=[]
        def rec(p,parent):
            while p!=0xffffffff:
                o=s.off(p); d=s.d
                fl=u32(d,o); mdl=u32(d,o+4); pos=struct.unpack_from('>3f',d,o+8); ang=struct.unpack_from('>3i',d,o+20); scl=struct.unpack_from('>3f',d,o+32)
                ch=u32(d,o+44); sib=u32(d,o+48)
                idx=len(out); out.append(dict(flags=fl,model=mdl,pos=pos,ang=[a*2*math.pi/65536 for a in ang],scl=scl,parent=parent,off=p))
                if ch!=0xffffffff and not (fl&0x10): rec(ch,idx)
                p=sib
                if p==0: break
        rec(s.root,-1); s.nodes=out; return out
    def model(s,p):
        o=s.off(p); d=s.d
        vl=u32(d,o); pl=u32(d,o+4)
        verts={}; s._vchunk(vl,verts) if vl not in (0,0xffffffff) else None
        prims=s._pchunk(pl) if pl not in (0,0xffffffff) else []
        return verts,prims
    def _vchunk(s,p,verts):
        o=s.off(p); d=s.d
        while True:
            t=d[o]
            if t==0xff: break
            fl=d[o+1]; size=struct.unpack_from('>H',d,o+2)[0]
            ioff,nv=struct.unpack_from('>HH',d,o+4)
            q=o+8
            if t in (0x33,0x29,0x21):
                # observed layout: 56 bytes extra, then (x,y,z,w, nx,ny,nz,w) per vertex
                q=o+8+56 if t==0x33 else o+8
                st=32 if t in (0x33,0x21) else 24
                for i in range(nv):
                    v=struct.unpack_from('>8f' if st==32 else '>6f',d,q+i*st)
                    if st==32: verts[ioff+i]=(v[0:3],v[4:7])
                    else: verts[ioff+i]=(v[0:3],v[3:6])
            else:
                raise ValueError('vertex chunk %d at %x'%(t,o))
            o+=4+size*4
    def _pchunk(s,p):
        o=s.off(p); d=s.d; prims=[]; tex=0; mat={'diffuse':(1,1,1,1)}; flags=0
        while True:
            t=d[o]
            if t==0xff: break
            if t==0: o+=2; continue
            if 1<=t<=7: o+=2; continue   # bits
            if 8<=t<=9: tex=struct.unpack_from('>H',d,o+2)[0]&0x1fff; flags=d[o+1]; o+=4; continue
            size=struct.unpack_from('>H',d,o+2)[0]
            if 16<=t<=31:
                c=d[o+4:o+8]; mat={'diffuse':(c[2]/255,c[1]/255,c[0]/255,c[3]/255),'flags':d[o+1]}
                o+=4+size*2; continue
            if 64<=t<=75:
                q=o+4; hdr=struct.unpack_from('>H',d,q)[0]; ns=hdr&0x3fff; uo=hdr>>14; q+=2
                uvk={65:1,66:2,68:1,69:2,71:1,72:2,74:1,75:2}.get(t,0)  # 1=uvn(0..255) 2=uvh(0..1023)
                hasn=t in (67,68,69); hasc=t in (70,71,72)
                strips=[]
                for k in range(ns):
                    ln=struct.unpack_from('>h',d,q)[0]; q+=2; rev=ln<0; ln=abs(ln); pts=[]
                    for i in range(ln):
                        ix=struct.unpack_from('>H',d,q)[0]; q+=2; uv=None
                        if uvk:
                            u,v=struct.unpack_from('>hh',d,q); q+=4; sc=255.0 if uvk==1 else 1023.0; uv=(u/sc,v/sc)
                        if hasn: q+=6
                        if hasc: q+=4
                        if i>=2: q+=2*uo
                        pts.append((ix,uv))
                    strips.append((rev,pts))
                prims.append(dict(tex=tex,mat=mat,strips=strips,type=t,flags=d[o+1]))
                o+=4+size*2; continue
            if 56<=t<=58: o+=4+size*2; continue  # volume
            raise ValueError('poly chunk %d at %x'%(t,o))
        return prims
def euler_m(ang,zxy):
    x,y,z=ang
    cx,sx,cy,sy,cz,sz=math.cos(x),math.sin(x),math.cos(y),math.sin(y),math.cos(z),math.sin(z)
    Rx=np.array([[1,0,0],[0,cx,-sx],[0,sx,cx]]); Ry=np.array([[cy,0,sy],[0,1,0],[-sy,0,cy]]); Rz=np.array([[cz,-sz,0],[sz,cz,0],[0,0,1]])
    return Rz@Rx@Ry if zxy else Rz@Ry@Rx
def mat2quat(R):
    t=R[0,0]+R[1,1]+R[2,2]
    if t>0: s=math.sqrt(t+1)*2; w=s/4; x=(R[2,1]-R[1,2])/s; y=(R[0,2]-R[2,0])/s; z=(R[1,0]-R[0,1])/s
    elif R[0,0]>R[1,1] and R[0,0]>R[2,2]: s=math.sqrt(1+R[0,0]-R[1,1]-R[2,2])*2; w=(R[2,1]-R[1,2])/s; x=s/4; y=(R[0,1]+R[1,0])/s; z=(R[0,2]+R[2,0])/s
    elif R[1,1]>R[2,2]: s=math.sqrt(1+R[1,1]-R[0,0]-R[2,2])*2; w=(R[0,2]-R[2,0])/s; x=(R[0,1]+R[1,0])/s; y=s/4; z=(R[1,2]+R[2,1])/s
    else: s=math.sqrt(1+R[2,2]-R[0,0]-R[1,1])*2; w=(R[1,0]-R[0,1])/s; x=(R[0,2]+R[2,0])/s; y=(R[1,2]+R[2,1])/s; z=s/4
    return [x,y,z,w]

def build_gltf(m, texpngs, name='model', alpha_tex=None, extra_nodes=None):
    """texpngs: list of PNG bytes indexed by texture id. Returns glb bytes."""
    ns=m.walk()
    bin_=bytearray(); bviews=[]; accs=[]; meshes=[]; nodes=[]; mats=[]; matkey={}
    def addbuf(arr,target=None):
        b=arr.tobytes(); 
        while len(bin_)%4: bin_.append(0)
        bv={'buffer':0,'byteOffset':len(bin_),'byteLength':len(b)}
        if target: bv['target']=target
        bin_.extend(b); bviews.append(bv); return len(bviews)-1
    def addacc(arr,typ,ct,target=None,mm=False):
        bv=addbuf(arr,target); a={'bufferView':bv,'componentType':ct,'count':len(arr),'type':typ}
        if mm: a['min']=arr.min(0).tolist(); a['max']=arr.max(0).tolist()
        accs.append(a); return len(accs)-1
    images=[]; textures=[]; texmap={}
    def tex_index(t):
        if t in texmap: return texmap[t]
        if t>=len(texpngs) or texpngs[t] is None: texmap[t]=None; return None
        bv=addbuf(np.frombuffer(texpngs[t],np.uint8)); images.append({'bufferView':bv,'mimeType':'image/png'})
        textures.append({'source':len(images)-1,'sampler':0}); texmap[t]=len(textures)-1; return texmap[t]
    def mat_index(pr):
        fl=pr['flags']; t=pr['tex']; key=(t,fl&0x18, pr['type'] in (64,67,70,73))
        if key in matkey: return matkey[key]
        mt={'name':'%s_t%d'%(name,t),'pbrMetallicRoughness':{'metallicFactor':0,'roughnessFactor':1}}
        if not key[2]:
            ti=tex_index(t)
            if ti is not None: mt['pbrMetallicRoughness']['baseColorTexture']={'index':ti}
        if fl&0x10: mt['doubleSided']=True
        if fl&0x08 or (alpha_tex and t in alpha_tex): mt['alphaMode']='BLEND'
        mats.append(mt); matkey[key]=len(mats)-1; return matkey[key]
    for i,n in enumerate(ns):
        R=euler_m(n['ang'], bool(n['flags']&0x20))
        nd={'name':'n%03d'%i,'translation':list(n['pos']),'rotation':mat2quat(R),'scale':list(n['scl'])}
        if n['flags']&0x01: nd.pop('translation')
        if n['flags']&0x02: nd.pop('rotation')
        if n['flags']&0x04: nd.pop('scale')
        if n['model']!=0xffffffff:
            verts,prims=m.model(n['model'])
            gp=[]
            for pr in prims:
                P=[];N=[];T=[];I=[]; vm={}
                for rev,pts in pr['strips']:
                    ids=[]
                    for ix,uv in pts:
                        k=(ix,uv)
                        if k not in vm:
                            if ix not in verts: continue
                            vm[k]=len(P); p,nn=verts[ix]; P.append(p); N.append(nn); T.append(uv or (0,0))
                        ids.append(vm[k])
                    for j in range(len(ids)-2):
                        a,b,c=ids[j],ids[j+1],ids[j+2]
                        if (j%2==1)^rev: a,b=b,a
                        if a!=b and b!=c and a!=c: I.append((a,b,c))
                if not I: continue
                P=np.array(P,np.float32); N=np.array(N,np.float32); T=np.array(T,np.float32); I=np.array(I,np.uint32).reshape(-1)
                nl=np.linalg.norm(N,axis=1,keepdims=True); nl[nl==0]=1; N=(N/nl).astype(np.float32)
                attrs={'POSITION':addacc(P,'VEC3',5126,34962,True),'NORMAL':addacc(N,'VEC3',5126,34962),'TEXCOORD_0':addacc(T,'VEC2',5126,34962)}
                gp.append({'attributes':attrs,'indices':addacc(I,'SCALAR',5125,34963),'material':mat_index(pr)})
            if gp: meshes.append({'name':nd['name'],'primitives':gp}); nd['mesh']=len(meshes)-1
        nodes.append(nd)
    for i,n in enumerate(ns):
        if n['parent']>=0: nodes[n['parent']].setdefault('children',[]).append(i)
    roots=[i for i,n in enumerate(ns) if n['parent']<0]
    nodes.append({'name':name,'children':roots}); top=len(nodes)-1
    j={'asset':{'version':'2.0','generator':'cvx-ninja'},'scene':0,'scenes':[{'nodes':[top]}],'nodes':nodes,'meshes':meshes,'materials':mats,
       'accessors':accs,'bufferViews':bviews,'buffers':[{'byteLength':len(bin_)}]}
    if images: j['images']=images; j['textures']=textures; j['samplers']=[{'magFilter':9729,'minFilter':9987,'wrapS':10497,'wrapT':10497}]
    while len(bin_)%4: bin_.append(0)
    js=json.dumps(j,separators=(',',':')).encode(); js+=b' '*((4-len(js)%4)%4); j['buffers'][0]['byteLength']=len(bin_)
    js=json.dumps(j,separators=(',',':')).encode(); js+=b' '*((4-len(js)%4)%4)
    return struct.pack('<III',0x46546C67,2,12+8+len(js)+8+len(bin_))+struct.pack('<II',len(js),0x4E4F534A)+js+struct.pack('<II',len(bin_),0x004E4942)+bytes(bin_)
