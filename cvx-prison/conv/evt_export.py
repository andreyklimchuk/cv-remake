# Export the original event scripts (data/evt/rm_XXXX) of the given rooms to web/public/assets/evt/rm_XXXX.json
# {"scripts": [hex, ...]}: script 0 = scd0 (room init), 1 = scd1 (every frame), N+2 = event N.
import sys,os,struct,json
sys.path.insert(0,'/data/cvx/tools')
from arc import extract
OUT='/data/cvx/web/public/assets/evt'
def scripts(d):
    n=struct.unpack_from('>I',d,0)[0]//4; offs=list(struct.unpack_from('>%dI'%n,d,0))+[len(d)]
    return [d[offs[i]:offs[i+1]].hex() for i in range(n)]
for r in sys.argv[1:]:
    ex='/data/cvx/ex/rm%s'%r[3:]
    p=ex+'/biocv_tmp/eng/data/evt/'+r
    import glob
    f=glob.glob(p+'.*')
    if not f: extract('/data/cvx/g/biocv_disc/eng/rdx_lnk/%s.arc'%r,ex); f=glob.glob(p+'.*')
    S=scripts(open(f[0],'rb').read())
    json.dump({'scripts':S},open(os.path.join(OUT,r+'.json'),'w'),separators=(',',':'))
    print(r,len(S),sum(len(s)//2 for s in S))
