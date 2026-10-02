# append MTN motions (e.g. weapon motions from pl00wNN.arc) as glTF clips to claire.glb
# usage: add_clips.py <claire.glb> <mtn file> <prefix>
import sys,os,struct,json; sys.path.insert(0,os.path.dirname(__file__))
import numpy as np
from glb import GLB
from mtn import find,parse3,quat
def add(glb,mtnfile,prefix):
    g=GLB(glb); j=g.j
    names={n.get('name'):i for i,n in enumerate(j['nodes'])}
    j['animations']=[a for a in j['animations'] if not a['name'].startswith(prefix)]
    d=open(mtnfile,'rb').read()
    def put(arr,typ,mm=False):
        arr=np.ascontiguousarray(arr,dtype='<f4'); off=len(g.B); g.B+=arr.tobytes()
        while len(g.B)%4: g.B+=b'\0'
        j['bufferViews'].append(dict(buffer=0,byteOffset=off,byteLength=arr.nbytes))
        a=dict(bufferView=len(j['bufferViews'])-1,componentType=5126,count=arr.shape[0],type=typ)
        if mm: a['min']=[float(arr.min())]; a['max']=[float(arr.max())]
        j['accessors'].append(a); return len(j['accessors'])-1
    for k,o in enumerate(find(d)):
        m=parse3(d,o); N=m['N']
        t=put(np.arange(N,dtype=float)/30.0,'SCALAR',True)
        S=[];C=[]
        for b in range(min(22,m['nb'])):
            q=np.array([quat(m['R'][b,f]) for f in range(N)])
            S.append(dict(input=t,output=put(q,'VEC4'),interpolation='LINEAR')); C.append(dict(sampler=len(S)-1,target=dict(node=names['b%02d'%b],path='rotation')))
            if b==0:
                S.append(dict(input=t,output=put(m['T']*0.1+np.array(j['nodes'][names['b00']].get('translation',[0,0,0])),'VEC3'),interpolation='LINEAR')); C.append(dict(sampler=len(S)-1,target=dict(node=names['b00'],path='translation')))
        j['animations'].append(dict(name='%s%02d'%(prefix,k),samplers=S,channels=C))
    j['buffers'][0]['byteLength']=len(g.B); g.save(glb)
if __name__=='__main__': add(*sys.argv[1:4])
