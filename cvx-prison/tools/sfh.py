# Capcom SFH container (PS3): every 0x20000-byte chunk starts with 0x10 junk bytes (vgmstream sfh_streamfile.h)
import struct
def clean(d):
    assert d[1:4]==b'SFH'
    ver,size=struct.unpack('>II',d[4:12])
    cs={0x00010000:0x10010,0x00010001:0x20000}[ver]
    out=bytearray()
    for o in range(0,len(d),cs): out+=d[o+0x10:o+cs]
    return bytes(out[:size])
