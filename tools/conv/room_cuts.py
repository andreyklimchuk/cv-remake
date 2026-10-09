# camera cut areas of every room (CUT_WORK.flg / flr_no / cuttp tables, cut.c bhCheckCutArea) from the cut file of
# rdx_lnk/rm_XXXX.arc -> data/room_cuts.json {room: [[flg, flr_no, [[attr, flr_no, atr_tp, minx, minz, maxx, maxz]...]]...]}
# (metres; PS3 layout: count at 8, the CUT_WRK tables follow the 0x2a8 entries in order of ctab_n)
# usage: room_cuts.py <nativePS3/biocv_disc/eng/rdx_lnk> <cvx-prison tools dir (arc.py)>
import sys,glob,os,struct,json
sys.path.insert(0,sys.argv[2])
from arc import parse
G={}
for p in sorted(glob.glob(os.path.join(sys.argv[1],'rm_*.arc'))):
    for name,h,d,us in parse(open(p,'rb').read()):
        if '\\cut\\' in name and d[:4]==b'CUTM':
            n=struct.unpack_from('<I',d,8)[0]; o=0x10+0x2a8*n; out=[]
            for i in range(n):
                e=0x10+0x2a8*i; fl,tp,fr,cn=d[e],d[e+1],struct.unpack_from('b',d,e+2)[0],d[e+3]; T=[]
                for k in range(cn):
                    attr=struct.unpack_from('>I',d,o)[0]; f2=struct.unpack_from('b',d,o+4)[0]; at=d[o+7]
                    x0,z0,x1,z1=struct.unpack_from('>4f',d,o+16)
                    T.append([attr,f2,at,round(x0*.1,4),round(z0*.1,4),round(x1*.1,4),round(z1*.1,4)]); o+=32
                out.append([fl,fr,T])
            G[os.path.basename(p)[:-4]]=out; break
json.dump(G,open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'../../data/room_cuts.json'),'w'),separators=(',',':'))
print(len(G))
