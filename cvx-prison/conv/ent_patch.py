# Add the raw bytes 6..11 of the ene/obj/itm records ("ex": enemy behaviour type u16, model variant at byte 9, ...)
# to already converted room JSONs (same as conv/room.py ents() now writes) without re-converting the rooms.
import sys,json,struct
sys.path.insert(0,'/data/cvx/tools')
from arc import parse
for r in sys.argv[1:]:
    J=json.load(open('/data/cvx/web/public/assets/rooms/%s.json'%r))
    for name,h,d,us in parse(open('/data/cvx/g/biocv_disc/eng/rdx_lnk/%s.arc'%r,'rb').read()):
        k=name.split('\\')[-2]
        key={'ene':'enemies','obj':'objects','itm':'items'}.get(k)
        if not key or name.split('\\')[-1]!=r: continue
        for i,e in enumerate(J[key]): e['ex']=d[0x10+36*i+6:0x10+36*i+12].hex()
    json.dump(J,open('/data/cvx/web/public/assets/rooms/%s.json'%r,'w'),separators=(',',':'))
    print(r,[(e['id'],e['ex']) for e in J['enemies']])
