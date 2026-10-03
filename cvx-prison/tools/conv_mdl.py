# convert an extracted MDL (+ its tex folder) to glb.  usage: conv_mdl.py <mdl file> <tex dir or -> <out.glb> [scale]
import sys,os,glob,io; sys.path.insert(0,os.path.dirname(__file__))
from ninja import Mdl,build_gltf
from tex import decode
ALPHA=set()
def texlist(texdir,n):
    out=[]; ALPHA.clear()
    for i in range(n):
        f=glob.glob(os.path.join(texdir,'tex%04x_BM.241f5deb'%i)) if texdir!='-' else []
        if not f: out.append(None); continue
        im,inf=decode(open(f[0],'rb').read()); b=io.BytesIO()
        if inf['fmt'] in (0x17,0x18,0x19): ALPHA.add(i)  # DXT5: the PS3 port blends these by their alpha
        im.save(b,'PNG'); out.append(b.getvalue())
    return out
if __name__=='__main__':
    src,tdir,dst=sys.argv[1:4]
    m=Mdl(open(src,'rb').read())
    open(dst,'wb').write(build_gltf(m,texlist(tdir,max(m.ntex,1)+2),os.path.basename(dst).split('.')[0],alpha_tex=set(ALPHA)))
    print(dst,os.path.getsize(dst))
