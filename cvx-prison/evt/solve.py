import sys,json
from load import all_scripts
sys.setrecursionlimit(100000)
R=all_scripts()
S=[s for v in R.values() for s in v if len(s)>4]
S.sort(key=len)
def key(s,p):
    o=s[p]
    return (o,s[p+1]) if o==0x69 and p+1<len(s) else o
L={}
CANDS=[2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32]
def ok_end(s,p): return p<=len(s) and all(b==0 for b in s[p:]) and p>=len(s)-2
def parse(s,p,L,new,depth=0):
    # returns dict of new assignments or None
    while True:
        if ok_end(s,p): return new
        if p>=len(s): return None
        k=key(s,p)
        if k in L: p+=L[k]; continue
        if k in new: p+=new[k]; continue
        for c in CANDS:
            if p+c>len(s): break
            n2=dict(new); n2[k]=c
            r=parse(s,p+c,L,n2,depth+1)
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
