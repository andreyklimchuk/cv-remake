# Append room motions (rmt blocks) of an item / object model as glTF clips 'rm_XXXX/rNN' (node animation, model units).
# usage: item_rmt.py <model.glb> <rmt file> <room id> <block,block,...>
import sys,os,struct; sys.path.insert(0,os.path.dirname(__file__)); sys.path.insert(0,'/data/cvx/conv')
import numpy as np
from glb import GLB
from mtn import quat
from enemy import track_table
def add(glb,rmt,rid,ks):
    g=GLB(glb); j=g.j
    nn=sorted([i for i,n in enumerate(j['nodes']) if (n.get('name') or '').startswith('n') and n['name'][1:].isdigit()],key=lambda i:j['nodes'][i]['name'])
    rd=open(rmt,'rb').read(); blocks=[]; i=-1
    while True:
        i=rd.find(b'MTN',i+1)
        if i<0: break
        if rd[i+3] in (0x20,0x30,0x80,0x90) and i>=4: blocks.append(i)
    j['animations']=[a for a in j.get('animations',[]) if not a['name'].startswith(rid+'/')]
    def put(arr,typ,mm=False):
        arr=np.ascontiguousarray(arr,dtype='<f4'); off=len(g.B); g.B+=arr.tobytes()
        while len(g.B)%4: g.B+=b'\0'
        j['bufferViews'].append(dict(buffer=0,byteOffset=off,byteLength=arr.nbytes))
        a=dict(bufferView=len(j['bufferViews'])-1,componentType=5126,count=arr.shape[0],type=typ)
        if mm: a['min']=[float(arr.min())]; a['max']=[float(arr.max())]
        j['accessors'].append(a); return len(j['accessors'])-1
    for k in ks:
        N,nb,T,R,has=track_table(rd,blocks[k]); assert nb==len(nn),(nb,len(nn))
        t=put(np.arange(N,dtype=float)/30.0,'SCALAR',True); S=[];C=[]
        for b in range(nb):
            if not has[b]: continue
            q=np.array([quat(R[b,f]) for f in range(N)])
            S.append(dict(input=t,output=put(q,'VEC4'),interpolation='LINEAR')); C.append(dict(sampler=len(S)-1,target=dict(node=nn[b],path='rotation')))
            if b==0 and T is not None:
                S.append(dict(input=t,output=put(T+np.array(j['nodes'][nn[0]].get('translation',[0,0,0])),'VEC3'),interpolation='LINEAR')); C.append(dict(sampler=len(S)-1,target=dict(node=nn[0],path='translation')))
        j['animations'].append(dict(name='%s/r%02d'%(rid,k),samplers=S,channels=C))
        print(rid,k,'frames',N,'start',T[0].round(1).tolist(),'end',T[-1].round(1).tolist())
    j['buffers'][0]['byteLength']=len(g.B); g.save(glb)
if __name__=='__main__': add(sys.argv[1],sys.argv[2],sys.argv[3],[int(x) for x in sys.argv[4].split(',')])
