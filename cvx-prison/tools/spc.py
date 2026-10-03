# Decode PS3 SE banks (.spc: SFH + CAPS + MSF0 headers, ATRAC3 mono/stereo data) to wav via ffmpeg
import struct,sys,os,subprocess
def parse(b):
    assert b[1:4]==b'SFH'
    o=0x10; assert b[o:o+4]==b'CAPS'
    hs=[];p=0x30
    while b[p:p+4]==b'MSF0':
        codec,ch,size,sr=struct.unpack('>IIII',b[p+4:p+20]); hs.append((codec,ch,size,sr)); p+=0x40
    return hs,p
def riff(data,ch,sr,ba):
    ext=struct.pack('<HIHHHH',1,0x800*ch,0,0,1,0)
    fmt=struct.pack('<HHIIHHH',0x270,ch,sr,sr*ba//1024,ba,0,len(ext))+ext
    return b'RIFF'+struct.pack('<I',4+8+len(fmt)+8+len(data))+b'WAVE'+b'fmt '+struct.pack('<I',len(fmt))+fmt+b'data'+struct.pack('<I',len(data))+data
if __name__=='__main__':
    f,dst=sys.argv[1],sys.argv[2]; os.makedirs(dst,exist_ok=True)
    b=open(f,'rb').read(); hs,p=parse(b)
    caps=struct.unpack('>7I',b[0x14:0x30]); print('caps',caps,'data@',hex(p),'len',len(b))
    for i,(c,ch,sz,sr) in enumerate(hs): print(i,c,ch,sz,sr)
    p=0x10+caps[6]
    for i,(c,ch,sz,sr) in enumerate(hs):
        ba={4:0x60,5:0x98,6:0xc0}[c]*ch
        w=riff(b[p:p+sz],ch,sr,ba); fn=os.path.join(dst,'%s_%02d'%(os.path.basename(f)[:-4],i))
        open(fn+'.at3','wb').write(w)
        r=subprocess.run(['ffmpeg','-v','error','-y','-i',fn+'.at3',fn+'.wav'],capture_output=True,text=True)
        os.remove(fn+'.at3'); print(i,'ok' if not r.stderr else r.stderr[:200])
        p+=(sz+0x7f)&~0x7f
