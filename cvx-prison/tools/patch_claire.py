# ponytail: use the hair texture (pl00 tex0005, previously unused) and attach it higher on the head
import sys,io,os,glob; sys.path.insert(0,os.path.dirname(__file__))
from glb import GLB
from tex import decode
import numpy as np
src,texf=sys.argv[1],sys.argv[2]
g=GLB(src)
if any(m.get('name')=='claire_hair' for m in g.j['materials']): print('already patched'); sys.exit()
im,_=decode(open(texf,'rb').read()); b=io.BytesIO(); im.convert('RGB').save(b,'PNG'); png=b.getvalue()
while len(g.B)%4: g.B.append(0)
g.j['bufferViews'].append({'buffer':0,'byteOffset':len(g.B),'byteLength':len(png)}); g.B.extend(png)
g.j['images'].append({'bufferView':len(g.j['bufferViews'])-1,'mimeType':'image/png'})
g.j['textures'].append({'source':len(g.j['images'])-1,'sampler':0})
mi=[i for i,m in enumerate(g.j['materials']) if m.get('name')=='claire_pt_t0'][0]
g.j['materials'][mi]['pbrMetallicRoughness']['baseColorTexture']={'index':len(g.j['textures'])-1}
g.j['materials'][mi]['name']='claire_hair'
names=[n.get('name') for n in g.j['nodes']]; pt=g.j['nodes'][names.index('pt0')]
pt['translation']=[0.0,0.145,0.097]
g.j['buffers'][0]['byteLength']=len(g.B)
g.save(src); print('patched',src)
