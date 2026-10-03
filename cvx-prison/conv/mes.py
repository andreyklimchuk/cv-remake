import struct
P={0x0e:'.',0x07:"'",0x0c:',',0x1f:'?',0x01:'!'}
def dec(b,table=P):
    out='';i=0
    while i+1<len(b):
        c=struct.unpack('>H',b[i:i+2])[0]; i+=2
        if c==0xffff: break
        if c==0xff00: out+='\n'; continue
        if c==0xff01: out+=' '; continue
        if c==0xff02: a=struct.unpack('>H',b[i:i+2])[0]; i+=2; out+='\f<%d>'%a; continue
        if c>>8==0xff: a=struct.unpack('>H',b[i:i+2])[0]; i+=2; out+='{%x:%x}'%(c&0xff,a); continue
        if 0x21<=c<0x21+26: out+=chr(65+c-0x21); continue
        if 0x41<=c<0x41+26: out+=chr(97+c-0x41); continue
        if 0x10<=c<0x1a: out+=chr(48+c-0x10); continue
        out+=table.get(c,'{%02x}'%c)
    return out
def parse(d):
    n=struct.unpack('>I',d[:4])[0]; offs=list(struct.unpack('>%dI'%n,d[4:4+4*n]))+[len(d)]
    return [dec(d[offs[i]:offs[i+1]]) for i in range(n)]
