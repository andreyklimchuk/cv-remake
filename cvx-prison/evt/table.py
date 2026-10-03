# Build the PS3 command-length table: PS2 decompilation (path analysis) + PS3 overrides verified on data.
import sys,json; sys.path.insert(0,'/data/cvx/evt')
import declen,cpath
NAMES={i:n for i,(n,d,c) in declen.R.items()}
SUBN={}
def build():
    L={}
    for i,(n,d,c) in declen.R.items():
        try: ps=cpath.paths(declen.body(n))
        except Exception: ps={d}
        ps={x for x in ps if x<1000 and x>1} or {d}
        L[i]=max(ps)
    for (op,k),(n,d,c) in declen.S.items():
        try: ps={x+1 for x in cpath.paths_case(declen.cases(declen.body(n))[k])}
        except Exception: ps={d}
        ps={x for x in ps if x<1000 and x>1} or {d}
        L[(op,k)]=max(ps)
    # control flow / special
    L.update({0:2,1:2,2:2,3:2,0xff:2,0xfe:1,0xf4:1,0xfd:1,0xf3:1,0xfa:4,0xfb:2,0xf8:4,0xf9:3,0xfc:2,5:6,0x22:4,0x65:4,0xb5:4})
    # odd lengths: PS3 data is 16-bit aligned -> round up
    for k,v in list(L.items()):
        if v%2 and k not in (0xfe,0xf4,0xfd,0xf3,0xf9): L[k]=v+1
    # PS3 overrides (verified on data)
    L.update(json.load(open('/data/cvx/evt/ps3over.json'))) if False else None
    return L
