# Demux a PS3 PAMF movie (SFH-deblocked) into a raw H.264 stream + ATRAC3plus frames (RIFF .at3).
import sys,struct
sys.path.insert(0,'/data/cvx/tools')
from sfh import clean
def demux(src):
    d=clean(open(src,'rb').read()); assert d[:4]==b'PAMF'
    p=struct.unpack('>I',d[8:12])[0]*0x800; v=bytearray(); a=bytearray(); n=len(d)
    while p+4<=n:
        if d[p:p+3]!=b'\0\0\1': p+=1; continue
        sid=d[p+3]
        if sid==0xba: p+=14+(d[p+13]&7); continue
        if sid==0xb9: p+=4; continue
        ln=struct.unpack('>H',d[p+4:p+6])[0]; body=d[p+6:p+6+ln]; p+=6+ln
        if sid in (0xe0,0xbd):
            hl=body[2]; pl=body[3+hl:]
            if sid==0xe0: v+=pl
            else: a+=pl[4:]   # private stream 1: 4-byte substream header
    return bytes(v),bytes(a)
if __name__=='__main__':
    v,a=demux(sys.argv[1]); open(sys.argv[2]+'.h264','wb').write(v); open(sys.argv[2]+'.a','wb').write(a)
    print(len(v),len(a),a[:16].hex())
def at3p(a):
    """ATRAC3plus units (8-byte 0FD0 header + frame) -> RIFF WAVE (AT3plus fmt like the bgm .at3 files)"""
    assert a[:2]==b'\x0f\xd0'
    fs=((a[2]&3)<<8|a[3])*8+8; ch=2 if (a[2]>>2)&7==2 else 1
    fr=bytearray(); p=0
    while p+8+fs<=len(a) and a[p:p+2]==b'\x0f\xd0': fr+=a[p+8:p+8+fs]; p+=8+fs
    fmt=struct.pack('<HHIIHHHHIHH',0xfffe,ch,48000,fs*48000//2048,fs,0,0x22,0x800 if False else 0x0800,ch==2 and 3 or 4,0,0)
    # extensible fmt: cbSize 0x22, valid bits/samples-per-block 0x0800, channel mask, AT3plus GUID, version 1, config bytes
    fmt=struct.pack('<HHIIHH',0xfffe,ch,48000,fs*48000//2048,fs,0)+struct.pack('<HHI',0x22,0x0800,3 if ch==2 else 4)
    fmt+=bytes.fromhex('bfaa23e958cb7144a119fffa01e4ce62')+struct.pack('<H',1)+a[2:4]+bytes(6)
    nsmp=len(fr)//fs*2048
    body=b'WAVE'+b'fmt '+struct.pack('<I',len(fmt))+fmt+b'fact'+struct.pack('<III',8,nsmp,0)+b'data'+struct.pack('<I',len(fr))+bytes(fr)
    return b'RIFF'+struct.pack('<I',len(body))+body
