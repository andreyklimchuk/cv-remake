# Original enemy (SKIN + Ninja MDL) and its MTN motion bank -> skinned glb
import sys,os,struct,math,io,json,glob
sys.path.insert(0,'/data/cvx/tools')
import numpy as np
from ninja import Mdl,euler_m
from mtn import find,quat
def skin_mdl(d,base=0):
    """returns (skin records, Mdl) for the SKIN block starting at base (offset of the size word)"""
    assert d[base+4:base+8]==b'SKIN'
    nv=struct.unpack_from('>I',d,base+0x14)[0]
    rec=[tuple(d[base+0x18+4*i:base+0x1c+4*i]) for i in range(nv)]
    mb=d.find(b'MDL\xbc',base)
    return rec,Mdl(d[mb:])
def track_table(d,o):
    """MTN\x80 block at o: returns (N, nb, trans[N,3] or None, rot[nb,N,3] radians, per-track has_rot)"""
    nb,sz=struct.unpack_from('>HI',d,o+6); base=o+0x10
    for t in range(base, len(d)-8*nb, 4):
        W=struct.unpack_from('>%dI'%(2*nb),d,t)
        rots=[W[2*k+1] for k in range(nb)]; tr=W[0]
        if tr not in (0,0xffffffff): continue
        if any(W[2*k]!=0xffffffff for k in range(1,nb)): continue
        r=[x for x in rots if x!=0xffffffff]
        if not r: continue
        if tr==0: N=r[0]//12
        else:
            if len(r)<2: continue
            N=(r[1]-r[0])//6
            if r[0]!=0: continue
        if N<=0 or N>2000: continue
        stride=(N*6+3)&~3
        if all(r[k]==r[0]+k*stride for k in range(len(r))) and (t-base)==r[-1]+stride or (t-base)==r[-1]+N*6:
            T=np.frombuffer(d[base:base+N*12],dtype='>f4').reshape(N,3).astype(float) if tr==0 else None
            R=np.zeros((nb,N,3)); has=[]
            for k in range(nb):
                if rots[k]==0xffffffff: has.append(False); continue
                R[k]=np.frombuffer(d[base+rots[k]:base+rots[k]+N*6],dtype='>i2').reshape(N,3).astype(float)*(2*np.pi/65536); has.append(True)
            return N,nb,T,R,has
    return None
def bank(d):
    out=[]
    for o in find(d):
        r=track_table(d,o)
        out.append((o,r))
    return out
def node_local(n):
    M=np.eye(4)
    if not n['flags']&2: M[:3,:3]=euler_m(n['ang'],bool(n['flags']&0x20))
    if not n['flags']&1: M[:3,3]=n['pos']
    return M
def world(ns,locals_):
    W=[None]*len(ns)
    for i,n in enumerate(ns):
        W[i]=locals_[i] if n['parent']<0 else W[n['parent']]@locals_[i]
    return W
def posed_locals(ns,clips,f):
    """clips: list of (first_node, (N,nb,T,R,has))"""
    L=[node_local(n) for n in ns]
    for first,(N,nb,T,R,has) in clips:
        fr=min(f,N-1)
        for k in range(nb):
            i=first+k
            if i>=len(ns) or not has[k]: continue
            q=quat(R[k,fr]); x,y,z,w=q
            L[i][:3,:3]=np.array([[1-2*(y*y+z*z),2*(x*y-z*w),2*(x*z+y*w)],[2*(x*y+z*w),1-2*(x*x+z*z),2*(y*z-x*w)],[2*(x*z-y*w),2*(y*z+x*w),1-2*(x*x+y*y)]])
            if k==0 and T is not None and first==0: L[i][:3,3]=T[fr]+np.array(ns[i]['pos'])*(0 if ns[i]['flags']&1 else 1)
    return L
from tex import decode
def texpngs(texdir,n):
    out=[]
    for i in range(n):
        f=glob.glob(os.path.join(texdir,'tex%04x_BM.241f5deb'%i))
        if not f: out.append(None); continue
        im,_=decode(open(f[0],'rb').read()); b=io.BytesIO(); im.save(b,'PNG'); out.append(b.getvalue())
    return out
def mat2quat(R):
    from ninja import mat2quat as mq
    return mq(R)
def build(mdlfile,texdir,motfile,dst,name,skin_at=0,S=0.1,lower_n=8,rmtfile=None):
    d=open(mdlfile,'rb').read()
    rec,m=skin_mdl(d,skin_at); ns=m.walk()
    Lb=[node_local(n) for n in ns]; Wb=world(ns,Lb)
    mi=[i for i,n in enumerate(ns) if n['model']!=0xffffffff][0]
    v,prims=m.model(ns[mi]['model'])
    tex=texpngs(texdir,max(m.ntex,1))
    B=bytearray(); bv=[]; acc=[]
    def put(arr,ct,typ,target=None,mm=False):
        b=arr.tobytes()
        while len(B)%4: B.append(0)
        x={'buffer':0,'byteOffset':len(B),'byteLength':len(b)}
        if target: x['target']=target
        B.extend(b); bv.append(x); a={'bufferView':len(bv)-1,'componentType':ct,'count':len(arr),'type':typ}
        if mm: a['min']=np.atleast_1d(arr.min(0)).tolist(); a['max']=np.atleast_1d(arr.max(0)).tolist()
        acc.append(a); return len(acc)-1
    images=[];textures=[];mats=[];tmap={}
    def mat(pr):
        t=pr['tex']; fl=pr['flags']; key=(t,fl&0x18)
        if key in tmap: return tmap[key]
        mt={'name':'%s_t%d'%(name,t),'pbrMetallicRoughness':{'metallicFactor':0,'roughnessFactor':1}}
        if t<len(tex) and tex[t]:
            images.append({'bufferView':None,'mimeType':'image/png','_png':tex[t]}); textures.append({'source':len(images)-1,'sampler':0})
            mt['pbrMetallicRoughness']['baseColorTexture']={'index':len(textures)-1}
        if fl&0x10: mt['doubleSided']=True
        if fl&0x08: mt['alphaMode']='BLEND'
        mats.append(mt); tmap[key]=len(mats)-1; return tmap[key]
    prim_out=[]
    parts=[(mi,v,prims,True)]+[(k,)+tuple(m.model(ns[k]['model']))+(False,) for k,n in enumerate(ns) if n['model']!=0xffffffff and k!=mi]
    for pi_,v,prims,skinned in parts:
      Mw=Wb[pi_]; Rn=Mw[:3,:3]
      for pr in prims:
          Pp=[];Nn=[];T=[];J=[];Wt=[];I=[];vm={}
          for rev,pts in pr['strips']:
              ids=[]
              for ix,uv in pts:
                  k=(ix,uv)
                  if k not in vm:
                      if ix not in v: continue
                      vm[k]=len(Pp); p,nn=v[ix]
                      Pp.append((Mw@np.array(list(p)+[1]))[:3]*S); Nn.append(Rn@np.array(nn)); T.append(uv or (0,0))
                      a,ca,b,cb=rec[ix] if skinned else (pi_,9,pi_,9); par=ns[a]['parent']
                      w=(ca+1)/10 if ca<9 else 1.0
                      if par<0 or w>=1: J.append((a,0,0,0)); Wt.append((1,0,0,0))
                      else: J.append((a,par,0,0)); Wt.append((w,1-w,0,0))
                  ids.append(vm[k])
              for j in range(len(ids)-2):
                  a_,b_,c_=ids[j],ids[j+1],ids[j+2]
                  if (j%2==1)^rev: a_,b_=b_,a_
                  if a_!=b_ and b_!=c_ and a_!=c_: I.append((a_,b_,c_))
          if not I: continue
          Nn=np.array(Nn,np.float32); l=np.linalg.norm(Nn,axis=1,keepdims=True); l[l==0]=1
          at={'POSITION':put(np.array(Pp,np.float32),5126,'VEC3',34962,True),'NORMAL':put((Nn/l).astype(np.float32),5126,'VEC3',34962),
              'TEXCOORD_0':put(np.array(T,np.float32),5126,'VEC2',34962),'JOINTS_0':put(np.array(J,np.uint16),5123,'VEC4',34962),'WEIGHTS_0':put(np.array(Wt,np.float32),5126,'VEC4',34962)}
          prim_out.append({'attributes':at,'indices':put(np.array(I,np.uint32).reshape(-1),5125,'SCALAR',34963),'material':mat(pr)})
    nodes=[]
    for i,n in enumerate(ns):
        L=Lb[i]; nd={'name':'b%02d'%i,'translation':(L[:3,3]*S).tolist(),'rotation':mat2quat(L[:3,:3])}
        nodes.append(nd)
    for i,n in enumerate(ns):
        if n['parent']>=0: nodes[n['parent']].setdefault('children',[]).append(i)
    ibm=np.array([np.linalg.inv(np.vstack([np.hstack([W[:3,:3],(W[:3,3]*S)[:,None]]),[0,0,0,1]])).T.reshape(-1) for W in Wb],np.float32)
    ib=put(ibm,5126,'MAT4')
    nodes.append({'name':name+'_mesh','mesh':0,'skin':0}); nodes.append({'name':name,'children':[0,len(nodes)-1]})
    # animations: lower-body (bones 0..lower_n-1) and upper-body (lower_n..) tracks are stored separately in the bank
    anims=[]
    def chans(r,first,ti,nmap=None):
        N,nb,Tr,R,has=r; S_=[];C=[]
        for k in range(nb):
            if not has[k] or first+k>=len(ns): continue
            if nmap is not None:
                if k>=len(nmap): continue
                q=np.array([quat(R[k,f]) for f in range(N)],np.float32)
                S_.append({'input':ti,'output':put(q,5126,'VEC4'),'interpolation':'LINEAR'}); C.append((nmap[k],'rotation'))
                if k==0 and Tr is not None:
                    S_.append({'input':ti,'output':put((Tr*S+np.array(nodes[0]['translation'])).astype(np.float32),5126,'VEC3'),'interpolation':'LINEAR'}); C.append((0,'translation'))
                continue
            q=np.array([quat(R[k,f]) for f in range(N)],np.float32)
            S_.append({'input':ti,'output':put(q,5126,'VEC4'),'interpolation':'LINEAR'}); C.append((first+k,'rotation'))
            if k==0 and Tr is not None and first==0:
                S_.append({'input':ti,'output':put((Tr*S+np.array(nodes[0]['translation'])).astype(np.float32),5126,'VEC3'),'interpolation':'LINEAR'}); C.append((0,'translation'))
        return S_,C
    if motfile:
        md=open(motfile,'rb').read(); Bk=bank(md)
        nbl=lower_n; nbu=len(ns)-lower_n
        lo=[r for o,r in Bk if r and r[1]==nbl]; 
        if nbu<=0:
            for k,r in enumerate(lo):
                ti=put(np.arange(r[0],dtype=np.float32)/30,5126,'SCALAR',mm=True); s,c=chans(r,0,ti)
                anims.append({'name':'m%02d'%k,'samplers':s,'channels':[{'sampler':i,'target':{'node':n_,'path':p_}} for i,(n_,p_) in enumerate(c)]})
            lo=[]
        first_up=None
        # upper list = trailing run of nbu-bone clips that follows the last lower clip
        idx=[k for k,(o,r) in enumerate(Bk) if r and r[1]==nbl]; last=idx[-1] if lo else len(Bk)
        up=[r for o,r in Bk[last+1:] if r and r[1]==nbu]
        # extras (upper-only) between lower clips
        for k in range(min(len(lo),len(up))):
            N=lo[k][0]; ti=put(np.arange(N,dtype=np.float32)/30,5126,'SCALAR',mm=True)
            s1,c1=chans(lo[k],0,ti)
            N2=up[k][0]; ti2=ti if N2==N else put(np.arange(N2,dtype=np.float32)/30,5126,'SCALAR',mm=True)
            s2,c2=chans(up[k],nbl,ti2)
            Ss=s1+s2; Cs=[{'sampler':i,'target':{'node':n_,'path':p_}} for i,(n_,p_) in enumerate(c1+c2)]
            anims.append({'name':'m%02d'%k,'samplers':Ss,'channels':Cs})
        ex=[r for o,r in Bk[:last] if r and r[1]==nbu] if nbu>0 else []
        for k,r in enumerate(ex):
            ti=put(np.arange(r[0],dtype=np.float32)/30,5126,'SCALAR',mm=True); s,c=chans(r,nbl,ti)
            anims.append({'name':'u%02d'%k,'samplers':s,'channels':[{'sampler':i,'target':{'node':n_,'path':p_}} for i,(n_,p_) in enumerate(c)]})
    for rmtspec in (rmtfile.split(';') if rmtfile else []):
        rmtfile,_,only=rmtspec.partition(':'); only={int(x) for x in only.split(',')} if only else None
        # room motions (rmt): blocks are numbered in file order ('MTN ' full-body blocks of other characters included);
        # a clip of this model = lower-body block k followed by the upper-body block k+1 -> 'rNN' (NN = k)
        rd=open(rmtfile,'rb').read(); blocks=[]; i=-1
        while True:
            i=rd.find(b'MTN',i+1)
            if i<0: break
            if rd[i+3] in (0x20,0x30,0x80,0x90) and i>=4: blocks.append(i)
        nbl=lower_n; nbu=len(ns)-lower_n
        for k,o in enumerate(blocks):
            if only is not None and k not in only: continue
            nbk=struct.unpack_from('>H',rd,o+6)[0]
            if nbu<=0 or nbk==len(ns) or (nbk>nbl and nbk<=len(ns)):
                # whole-body clip (cutscene characters: tracks drive the first nb nodes)
                if not (16<=nbk<=len(ns)): continue
                r1=track_table(rd,o)
                if not r1: continue
                # the motion has no tracks for the rigid head parts (nodes with a model hanging off the head, flags 0x10)
                nmap=[i for i,n in enumerate(ns) if not (n['flags']&0x10 and n['model']!=0xffffffff)]
                if len(nmap)!=nbk: nmap=list(range(nbk))
                ti=put(np.arange(r1[0],dtype=np.float32)/30,5126,'SCALAR',mm=True); s1,c1=chans(r1,0,ti,nmap)
                anims.append({'name':os.path.basename(rmtfile).split('.')[0]+'/r%02d'%k,'samplers':s1,'channels':[{'sampler':i_,'target':{'node':n_,'path':p_}} for i_,(n_,p_) in enumerate(c1)]})
                print('room motion r%02d frames %d (whole body %d tracks)'%(k,r1[0],nbk)); continue
            if rd[o+3]&0xf0 not in (0x80,0x90) or k+1>=len(blocks): continue
            r1=track_table(rd,o); r2=track_table(rd,blocks[k+1])
            if not r1 or not r2 or r1[1]!=nbl or r2[1]!=nbu: continue
            ti=put(np.arange(r1[0],dtype=np.float32)/30,5126,'SCALAR',mm=True); s1,c1=chans(r1,0,ti)
            ti2=ti if r2[0]==r1[0] else put(np.arange(r2[0],dtype=np.float32)/30,5126,'SCALAR',mm=True); s2,c2=chans(r2,nbl,ti2)
            anims.append({'name':os.path.basename(rmtfile).split('.')[0]+'/r%02d'%k,'samplers':s1+s2,'channels':[{'sampler':i_,'target':{'node':n_,'path':p_}} for i_,(n_,p_) in enumerate(c1+c2)]})
            print('room motion r%02d frames %d/%d'%(k,r1[0],r2[0]), 'root', None if r1[2] is None else (r1[2][0]*S).round(2).tolist())
    for im in images:
        b=im.pop('_png')
        while len(B)%4: B.append(0)
        bv.append({'buffer':0,'byteOffset':len(B),'byteLength':len(b)}); B.extend(b); im['bufferView']=len(bv)-1
    j={'asset':{'version':'2.0','generator':'cvx-enemy'},'scene':0,'scenes':[{'nodes':[len(nodes)-1]}],'nodes':nodes,
       'meshes':[{'name':name,'primitives':prim_out}],'skins':[{'joints':list(range(len(ns))),'inverseBindMatrices':ib,'skeleton':0}],
       'materials':mats,'accessors':acc,'bufferViews':bv,'buffers':[{'byteLength':len(B)}],'animations':anims}
    if images: j['images']=images; j['textures']=textures; j['samplers']=[{'magFilter':9729,'minFilter':9987,'wrapS':10497,'wrapT':10497}]
    while len(B)%4: B.append(0)
    j['buffers'][0]['byteLength']=len(B)
    js=json.dumps(j,separators=(',',':')).encode(); js+=b' '*((4-len(js)%4)%4)
    open(dst,'wb').write(struct.pack('<III',0x46546C67,2,12+8+len(js)+8+len(B))+struct.pack('<II',len(js),0x4E4F534A)+js+struct.pack('<II',len(B),0x004E4942)+bytes(B))
    return len(anims)
if __name__=='__main__':
    a=sys.argv[1:]
    print(build(a[0],a[1],a[2] if a[2]!='-' else None,a[3],a[4],int(a[5],0) if len(a)>5 else 0,lower_n=int(a[6]) if len(a)>6 else 8,rmtfile=a[7] if len(a)>7 else None))
