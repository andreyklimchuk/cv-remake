# Capcom SE request table (.srq after SFH clean): 'QERS' header, entries 0x90 bytes from 0x34 up to u32@0x1c
import struct,sys
from sfh import clean
def parse(path):
    d=clean(open(path,'rb').read()); assert d[:4]==b'QERS'
    end=struct.unpack('>I',d[0x1c:0x20])[0]; out=[]
    for o in range(0x34,end,0x90):
        e=d[o:o+0x90]
        out.append(dict(list=struct.unpack('>H',e[0:2])[0],raw=e))
    return out
if __name__=='__main__':
    for e in parse(sys.argv[1]):
        r=e['raw']; print('%3d'%e['list'], r[:0x34].hex(' '))
