# Claire's ponytail (pl00 MDL #2, 4 bones pt0..pt3, hair atlas tex0001):
# attach it at the back of the head inside the hair, single-sided like the original material,
# and give it radial (tube) normals so it is lit like the hair around it (one tone with the hair).
import sys,os; sys.path.insert(0,os.path.dirname(__file__))
import numpy as np
from glb import GLB
src=sys.argv[1]; root=[float(x) for x in (sys.argv[2] if len(sys.argv)>2 else '0,0.075,0.072').split(',')]
g=GLB(src); j=g.j
names=[n.get('name') for n in j['nodes']]
mi=[i for i,m in enumerate(j['materials']) if m.get('name')=='claire_hair'][0]
m=j['materials'][mi]; m.pop('doubleSided',None); m['alphaMode']='OPAQUE'
pt=j['nodes'][names.index('pt0')]; pt['translation']=root
for me in j['meshes']:
    for p in me['primitives']:
        if p['material']!=mi: continue
        P,_=g.acc(p['attributes']['POSITION']); N,_=g.acc(p['attributes']['NORMAL'])
        a=P[np.argmax(P[:,1])]; b=P[np.argmin(P[:,1])]; ax=(b-a)/np.linalg.norm(b-a)
        c=P.mean(0); a=c+ax*np.dot(a-c,ax)
        out=[]
        for v,n in zip(P,N):
            r=(v-a)-ax*np.dot(v-a,ax); L=np.linalg.norm(r)
            r=r/L if L>1e-5 else n
            out.append(r if np.dot(r,n)>=-0.2 else r)  # tube normal
        g.setacc(p['attributes']['NORMAL'],np.array(out))
g.save(src); print('tail fixed',root)
# tone: the strand patch of the atlas is browner than the hair on the scalp -> tint it to the scalp hair colour
g=GLB(src); m=g.j['materials'][mi]; m['pbrMetallicRoughness']['baseColorFactor']=[0.95,0.42,0.36,1]; g.save(src)
