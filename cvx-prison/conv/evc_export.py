# Export the event cameras (data/evc/rm_XXXX, EVC_WORK[n] after a 16-byte 'EVCM' header) into web/public/assets/evt/rm_XXXX.json "evc".
# EVC_WORK (0x808): flg u16, type u16, nxt_no s16, keyf_n s16, CAM_KEYF_WORK keyf[16] (0x80 each):
#   flg u16, frame s16, px py pz f32, ax ay az pers s16, hidobj[8] u32, hidlgt[4] u32, fog_col u32, fog_nr fog_fr f32,
#   lkflg lkno lkono nxt_no s16, lx ly lz f32 ...  (cut.c: bhSetEventCamera / bhControlEventCamera)
import sys,os,struct,json,glob
sys.path.insert(0,'/data/cvx/tools')
from arc import parse
OUT='/data/cvx/web/public/assets/evt'
def evc(d):
    assert d[:4]==b'EVCM'; n=struct.unpack_from('<I',d,8)[0]; out=[]
    for i in range(n):
        o=16+i*0x808
        flg,typ,nxt,kn=struct.unpack_from('>HHhh',d,o); keys=[]
        for k in range(max(kn,0)):
            q=o+8+k*0x80
            kf,fr,px,py,pz,ax,ay,az,pers=struct.unpack_from('>Hh3f4h',d,q)
            lk=struct.unpack_from('>4h',d,q+0x54); l=struct.unpack_from('>3f',d,q+0x5c)
            keys.append(dict(flg=kf,frame=fr,pos=[round(px*.1,5),round(py*.1,5),round(pz*.1,5)],ang=[ax,ay,az],pers=pers,lk=list(lk[:3]),l=[round(v*.1,5) for v in l]))
        out.append(dict(flg=flg,type=typ,nxt=nxt,keys=keys))
    return out
for r in sys.argv[1:]:
    f=OUT+'/%s.json'%r; J=json.load(open(f))
    arc='/data/cvx/g/biocv_disc/eng/rdx_lnk/%s.arc'%r
    for name,h,data,us in parse(open(arc,'rb').read()):
        if '/evc/' in name.replace('\\','/'): J['evc']=evc(data); break
    json.dump(J,open(f,'w'),separators=(',',':'))
    print(r,'evc',len(J.get('evc',[])))
