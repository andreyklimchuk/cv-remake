# rom->grand (floor levels) of every room: the rmh header of rdx_lnk/rm_XXXX.arc (PS3 layout: 32 LE floats
# right before amb_rom/amb_r/g/b = end - 52 - 128) -> data/room_grand.json (metres)
# usage: room_grand.py <nativePS3/biocv_disc/eng/rdx_lnk> <cvx-prison tools dir (arc.py)>
import sys,glob,os,struct,json
sys.path.insert(0,sys.argv[2])
from arc import parse
G={}
for p in sorted(glob.glob(os.path.join(sys.argv[1],'rm_*.arc'))):
    for name,h,data,us in parse(open(p,'rb').read()):
        if '\\rmh\\' in name and data[:4]==b'RMHM':
            G[os.path.basename(p)[:-4]]=[round(x*0.1,4) for x in struct.unpack_from('<32f',data,len(data)-180)]; break
json.dump(G,open(os.path.join(os.path.dirname(__file__),'../../data/room_grand.json'),'w'),separators=(',',':'))
print(len(G))
