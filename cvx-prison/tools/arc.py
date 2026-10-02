# MT Framework ARC (PS3, big endian). 'SFH' files: a 16-byte header at the start of every 0x20000 block.
import struct,zlib,sys,os
def strip(d,B=0x20000,H=16):
    if d[1:4]!=b'SFH': return d
    out=bytearray()
    for i in range(0,len(d),B): out+=d[i+H:i+B]
    return bytes(out)
def parse(d):
    d=strip(d)
    n=struct.unpack('>H',d[6:8])[0]; p=8; out=[]
    for i in range(n):
        name=d[p:p+64].split(b'\0')[0].decode('latin1'); h,cs,us,off=struct.unpack('>IIII',d[p+64:p+80]); p+=80
        raw=d[off:off+cs]
        try: data=zlib.decompress(raw)
        except Exception:
            data=raw
            if cs!=(us>>3): print('BAD',name,cs,us>>3,file=sys.stderr)
        out.append((name,h,data,us))
    return out
def extract(src,dst,verbose=False):
    res=[]
    for name,h,data,us in parse(open(src,'rb').read()):
        fn=os.path.join(dst,name.replace('\\','/'))+'.%08x'%h
        os.makedirs(os.path.dirname(fn),exist_ok=True); open(fn,'wb').write(data); res.append(fn)
        if verbose: print('%08x %7d %s'%(h,len(data),name))
    return res
if __name__=='__main__':
    extract(sys.argv[1],sys.argv[2],len(sys.argv)>3)
