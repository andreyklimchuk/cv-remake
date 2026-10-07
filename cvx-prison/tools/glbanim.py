import json,struct,sys
def anims(path):
    with open(path,'rb') as f: d=f.read()
    off=12; js=None
    while off<len(d):
        ln,ty=struct.unpack_from('<II',d,off)
        if ty==0x4E4F534A: js=json.loads(d[off+8:off+8+ln]); break
        off+=8+ln
    return [a.get('name','?') for a in js.get('animations',[])], js
for p in sys.argv[1:]:
    names,js=anims(p)
    print('==',p,len(names),'clips')
    print(' '.join(names))
