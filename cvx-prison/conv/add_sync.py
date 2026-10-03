# add the 22-bone Claire motions stored in an enemy motion bank (grab/bite sync motions) to claire.glb as <prefix>NN
import sys,os; sys.path.insert(0,'/data/cvx/conv'); sys.path.insert(0,'/data/cvx/tools')
import numpy as np
from glb import GLB
from enemy import bank
from mtn import quat
def add(glbf,motf,prefix,out=None,keep=None):
    g=GLB(glbf); j=g.j
    names={n.get('name'):i for i,n in enumerate(j['nodes'])}
    j['animations']=[a for a in j['animations'] if not a['name'].startswith(prefix)]
    def put(arr,typ,mm=False):
        arr=np.ascontiguousarray(arr,dtype='<f4'); off=len(g.B); g.B+=arr.tobytes()
        while len(g.B)%4: g.B+=b'\0'
        j['bufferViews'].append(dict(buffer=0,byteOffset=off,byteLength=arr.nbytes))
        a=dict(bufferView=len(j['bufferViews'])-1,componentType=5126,count=arr.shape[0],type=typ)
        if mm: a['min']=[float(arr.min())]; a['max']=[float(arr.max())]
        j['accessors'].append(a); return len(j['accessors'])-1
    k=0
    for o,r in bank(open(motf,'rb').read()):
        if not r or r[1]!=22: continue
        if keep is not None and k>=keep: break
        N,nb,T,R,has=r; t=put(np.arange(N)/30.0,'SCALAR',True); S=[];C=[]
        for b in range(22):
            if not has[b]: continue
            q=np.array([quat(R[b,f]) for f in range(N)])
            S.append(dict(input=t,output=put(q,'VEC4'),interpolation='LINEAR')); C.append(dict(sampler=len(S)-1,target=dict(node=names['b%02d'%b],path='rotation')))
            if b==0 and T is not None:
                S.append(dict(input=t,output=put(T*0.1+np.array(j['nodes'][names['b00']].get('translation',[0,0,0])),'VEC3'),interpolation='LINEAR')); C.append(dict(sampler=len(S)-1,target=dict(node=names['b00'],path='translation')))
        j['animations'].append(dict(name='%s%02d'%(prefix,k),samplers=S,channels=C)); k+=1
    j['buffers'][0]['byteLength']=len(g.B); g.save(out or glbf); return k
if __name__=='__main__':
    a=sys.argv[1:]; print(add(a[0],a[1],a[2],None,int(a[3]) if len(a)>3 else None))
