# Solve per-opcode command lengths for the PS3 scripts, seeded by the PS2 decompilation (declen.py).
import sys,json
sys.setrecursionlimit(100000)
from load import all_scripts
import declen
R=all_scripts()
S=[s for v in R.values() for s in v if len(s)>4]; S.sort(key=len)
SUB={0x64,0x66,0x67,0x69}
def key(s,p):
    o=s[p]; return (o,s[p+1]) if o in SUB and p+1<len(s) else o
# trusted fixed lengths
L={0:2,1:2,2:2,3:2,0xff:2,0xfe:1,0xf4:1,0xfd:1,0xf3:1,0xfa:4,0xfb:2,0xf8:4,4:6,5:6,0x25:8}
L.update({int(k) if k[0]!='(' else eval(k):v for k,v in json.load(open('Lman.json')).items() if (k[0]=='(' or int(k)!=0xfc)})
L[0x25]=8
HINT={}
for i,(n,d,c) in declen.R.items(): HINT[i]=d
for k,(n,d,c) in declen.S.items(): HINT[k]=d
def LEN(s,p,k,LL):
    if k==0xfc: return 2  # while: header, cond follows inline (fc LL cond... body fd)
    return LL[k]
def ok_end(s,p): return p>=2 and s[p-2]==0xff and all(b==0 for b in s[p:])
def cands(k):
    h=HINT.get(k); c=[h] if h and h<=40 else []
    return c+[x for x in range(1,33) if x!=h]
def parse(s,p,new,pend=(),depth=0):
    pend=list(pend)
    while True:
        if p>len(s): return None
        if p==len(s): return new if (ok_end(s,p) and not pend) else None
        if s[p]==0xff and all(b==0 for b in s[p+2:]): return new if not pend else None
        if s[p] in (1,2):
            if p+1>=len(s): return None
            q=p+s[p+1]
            if q>len(s) or q<p+2: return None
            pend.append(q); pend.sort()
        if pend and pend[0]<p: return None
        while pend and pend[0]==p:
            if s[p] not in (2,3): return None
            pend.pop(0)
        k=key(s,p)
        if k==0xfc: p+=2; continue
        if k in L: p+=L[k]; continue
        if k in new: p+=new[k]; continue
        if depth>6: return None
        for c in cands(k):
            if p+c>len(s): break
            n2=dict(new); n2[k]=c
            r=parse(s,p+c,n2,pend,depth+1)
            if r is not None: return r
        return None
if __name__=='__main__':
    fail=[]
    for s in S:
        r=parse(s,0,{})
        if r is None: fail.append(s); continue
        L.update(r)
    print('fail',len(fail),'of',len(S))
    json.dump({str(k):v for k,v in L.items()},open('L4.json','w'))
    diff=[(k,L[k],HINT.get(k)) for k in L if HINT.get(k) is not None and HINT.get(k)!=L[k]]
    print('differs from decomp:',sorted(diff,key=str))
