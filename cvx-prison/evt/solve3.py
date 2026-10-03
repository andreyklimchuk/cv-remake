import sys,json
from load import all_scripts
sys.setrecursionlimit(100000)
R=all_scripts()
S=[s for v in R.values() for s in v if len(s)>4]
S.sort(key=len)
def key(s,p):
    o=s[p]
    return (o,s[p+1]) if o==0x69 and p+1<len(s) else o
L={1:2,2:2,3:2,0xff:2,4:6,5:6,0xf8:4,0x86:16,0x24:4,0x65:4,0x16:2,0xa6:4,0x43:4,0x9e:2,0x9f:2,0x2b:2,0x0a:4,0x0b:4,0x0c:4,0x12:2,0x13:4,
(0x69,0x0d):6,(0x69,0x0b):6,(0x69,0x0c):6,(0x69,0x07):8,(0x69,0x18):8,(0x69,0x29):4,(0x69,0x17):4,(0x69,0x2e):4,(0x69,0x2f):2,(0x69,0x19):4,(0x69,0x22):8,
0x7e:4,0x2a:4,0x29:2,0x67:6,0x20:4,0x36:6,0x94:4,0x8b:4}
CANDS=[2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32]
def ok_end(s,p): return p<=len(s) and p>=2 and s[p-2]==0xff and all(b==0 for b in s[p:])
def parse(s,p,L,new,depth=0,pend=None):
    pend=list(pend or [])
    # returns dict of new assignments or None
    while True:
        if ok_end(s,p): return new
        if p>=len(s): return None
        k=key(s,p)
        if s[p] in (1,2):
            q=p+s[p+1]
            if q>len(s) or q<p+2: return None
            pend.append(q)
        while pend and pend[0]<p: return None
        while pend and pend[0]==p:
            if s[p] not in (2,3): return None
            pend.pop(0)
        if k in L: p+=L[k]; continue
        if k in new: p+=new[k]; continue
        for c in CANDS:
            if p+c>len(s): break
            n2=dict(new); n2[k]=c
            r=parse(s,p+c,L,n2,depth+1,pend)
            if r is not None: return r
        return None
fail=0
for i,s in enumerate(S):
    r=parse(s,0,L,{})
    if r is None: fail+=1; continue
    L.update(r)
print('fail',fail,'of',len(S))
json.dump({str(k):v for k,v in L.items()},open('L.json','w'))
print(sorted(((str(k),v) for k,v in L.items())))
