import json,struct,sys
def load(path):
    d=open(path,'rb').read(); off=12; js=None
    while off<len(d):
        ln,ty=struct.unpack_from('<II',d,off)
        if ty==0x4E4F534A: js=json.loads(d[off+8:off+8+ln]); break
        off+=8+ln
    return js
def dur(js):
    out={}
    for a in js.get('animations',[]):
        mx=0
        for s in a['samplers']:
            acc=js['accessors'][s['input']]
            if 'max' in acc: mx=max(mx,acc['max'][0])
        out[a.get('name','?')]=mx
    return out
for p in sys.argv[1:]:
    js=load(p); dd=dur(js)
    print('==',p)
    print(' '.join(f'{k}:{v:.3f}({round(v*30)}f)' for k,v in dd.items()))
