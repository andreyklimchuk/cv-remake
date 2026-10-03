# Room effect tables (eft/rm_XXXX: EFTM, records EF_WRK 0x44 bytes BE) -> assets/eft/rm_XXXX.json
# and effect textures (eff/ef_NNN, texture order of ef_NNN_tex SCRA list) -> assets/effects/ef_NNN_K.png
import struct,os,sys,glob,json,zlib
sys.path.insert(0,'/data/cvx/tools')
from tex import decode
EX='/data/cvx/ex'; OUT='/data/cvx/web/public/assets'
done=set()
for rd in sorted(glob.glob(EX+'/rm*')):
    r=os.path.basename(rd); rid='rm_'+r[2:]
    base=rd+'/biocv_tmp/eng/data'
    f=glob.glob(base+'/eft/*')
    if not f: continue
    d=open(f[0],'rb').read(); assert d[:4]==b'EFTM'; n=struct.unpack('<I',d[8:12])[0]
    recs=[]
    for i in range(n):
        q=d[0x10+i*0x44:0x10+(i+1)*0x44]
        flg,id_,ty,flr,mv=struct.unpack('>IHHhH',q[:12])
        px,py,pz,sx,sy,sz=struct.unpack('>6f',q[12:36])
        ay,ax=struct.unpack('>hh',q[36:40])
        lk=q[40:]
        recs.append(dict(flg=flg,id=id_,type=ty,flr=flr,mdlver=mv,p=[px,py,pz],s=[sx,sy,sz],ax=ax,ay=ay,lk=lk.hex() if any(lk) else ''))
    json.dump(recs,open(f'{OUT}/eft/{rid}.json','w'))
    for td in sorted(glob.glob(base+'/eff/ef_*_tex.*')):
        name=os.path.basename(td).split('_tex')[0]
        if name in done: continue
        t=open(td,'rb').read(); assert t[:4]==b'SCRA'
        cnt=struct.unpack('>H',t[6:8])[0]
        hs=[struct.unpack('>I',t[8+8*k+4:8+8*k+8])[0] for k in range(cnt) if t[8+8*k:8+8*k+4]==b'\x24\x1f\x5d\xeb']
        files=glob.glob(f'{base}/eff/{name}/*')
        byh={}
        for p in files:
            nm=os.path.basename(p).split('.')[0]
            h=~zlib.crc32(f'biocv_tmp\\eng\\data\\eff\\{name}\\{nm}'.encode())&0xffffffff
            byh[h]=p
        for k,h in enumerate(hs):
            if h not in byh: print('missing',name,k,hex(h)); continue
            im,_=decode(open(byh[h],'rb').read()); im.save(f'{OUT}/effects/{name}_{k}.png')
        done.add(name); print(rid,name,len(hs))
# texture count per effect texture id (assets/effects/index.json)
import re,collections
c=collections.Counter()
for f in os.listdir(OUT+'/effects'):
    m=re.match(r'ef_(\d+)_(\d+)\.png',f)
    if m: c[int(m.group(1))]+=1
json.dump(dict(sorted(c.items())),open(OUT+'/effects/index.json','w'))
