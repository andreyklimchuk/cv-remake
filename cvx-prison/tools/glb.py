import json,struct
import numpy as np
class GLB:
    def __init__(s,p):
        d=open(p,'rb').read(); l=struct.unpack('<I',d[12:16])[0]; s.j=json.loads(d[20:20+l]); bl=struct.unpack('<I',d[20+l:24+l])[0]; s.B=bytearray(d[28+l:28+l+bl])
    def acc(s,i):
        a=s.j['accessors'][i]; v=s.j['bufferViews'][a['bufferView']]; n=a['count']; t={'VEC2':2,'VEC3':3,'VEC4':4,'SCALAR':1,'MAT4':16}[a['type']]
        ct={5126:'f',5123:'H',5121:'B',5125:'I'}[a['componentType']]; sz=struct.calcsize(ct)
        off=v.get('byteOffset',0)+a.get('byteOffset',0); st=v.get('byteStride',0) or t*sz
        return np.array([struct.unpack_from('<'+ct*t,s.B,off+k*st) for k in range(n)]),(off,st,ct,t)
    def setacc(s,i,arr):
        _,(off,st,ct,t)=s.acc(i)
        for k,row in enumerate(arr): struct.pack_into('<'+ct*t,s.B,off+k*st,*row)
    def save(s,p):
        js=json.dumps(s.j,separators=(',',':')).encode(); js+=b' '*((4-len(js)%4)%4); b=bytes(s.B); b+=b'\0'*((4-len(b)%4)%4)
        out=struct.pack('<III',0x46546C67,2,12+8+len(js)+8+len(b))+struct.pack('<II',len(js),0x4E4F534A)+js+struct.pack('<II',len(b),0x004E4942)+b
        open(p,'wb').write(out)
