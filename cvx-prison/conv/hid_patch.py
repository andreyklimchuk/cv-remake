# Adds the per-camera hide masks to the converted rooms (cut.c bhSetHideObjLgt / bhSetEventHideObjLgt):
#  rooms/rm_XXXX.json cameras[i].hid  = CUT_WORK.cam[0].hidobj[16] (bit i = room model object i, MSB first)
#                     cameras[i].hidl = CUT_WORK.cam[0].hidlgt[8]  (bit i = room light i, only lights >= 4 are used)
#  evt/rm_XXXX.json   evc[n].keys[k].hid / hidl = CAM_KEYF_WORK.hidobj[8] / hidlgt[4] (event light table)
import sys,struct,json,glob
sys.path.insert(0,'/data/cvx/tools')
from arc import parse
A='/data/cvx/web/public/assets'
for rid in sys.argv[1:]:
    data={}
    for name,h,d,us in parse(open('/data/cvx/g/biocv_disc/eng/rdx_lnk/%s.arc'%rid,'rb').read()):
        n=name.replace('\\','/')
        for k in ('cut','evc'):
            if '/%s/'%k in n: data[k]=d
    f=f'{A}/rooms/{rid}.json'; J=json.load(open(f)); d=data['cut']; n=struct.unpack_from('<I',d,8)[0]
    assert n==len(J['cameras']),(n,len(J['cameras']))
    for i,c in enumerate(J['cameras']):
        e=0x10+0x2a8*i+0x20
        c['hid']=list(struct.unpack_from('>16I',d,e+0x58)); c['hidl']=list(struct.unpack_from('>8I',d,e+0x98))
    json.dump(J,open(f,'w'))
    fe=f'{A}/evt/{rid}.json'; E=json.load(open(fe)); nk=0
    if 'evc' in data and E.get('evc'):
        d=data['evc']
        for i,ec in enumerate(E['evc']):
            for k,key in enumerate(ec['keys']):
                q=16+i*0x808+8+k*0x80
                key['hid']=list(struct.unpack_from('>8I',d,q+0x18)); key['hidl']=list(struct.unpack_from('>4I',d,q+0x38)); nk+=1
        json.dump(E,open(fe,'w'),separators=(',',':'))
    print(rid,'cams',n,'evc keys',nk,'hid',sum(1 for c in J['cameras'] if any(c['hid'])))
