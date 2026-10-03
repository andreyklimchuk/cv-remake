import sys; sys.path.insert(0,'/data/cvx/evt')
from dis2 import *
from collections import Counter
R=all_scripts(); blame=Counter(); tot=Counter(); ex={}
okc=Counter()
for r,v in R.items():
    for i,s in enumerate(v):
        if len(s)<=4: continue
        ins,e=walk(s)
        for _,k,_ in ins: tot[k]+=1
        if e is not None: continue
        if check(s,ins):
            for _,k,_ in ins: okc[k]+=1
            continue
        starts={p for p,_,_ in ins}
        for p,k,l in ins:
            if k in (1,2,0xfc):
                q=p+s[p+1]
                if q not in starts or (k==1 and s[q] not in (2,3)):
                    inner=set(kk for pp,kk,ll in ins if p<pp<q)
                    for kk in inner:
                        blame[kk]+=1
                        ex.setdefault(kk,'%s/%d '%(r,i)+s[p:q+2].hex(' ')[:150])
                    break
# commands that appear in fully-good scripts are likely right
res=sorted(((c/(okc[k]+1),c,okc[k],k) for k,c in blame.items()),reverse=True)
for sc,c,o,k in res[:25]:
    nm=NAMES.get(k if isinstance(k,int) else k[0],'?')
    print(k if isinstance(k,int) and print(end='') is None and False else (hex(k) if isinstance(k,int) else tuple(hex(x) for x in k)),nm,'len',L.get(k),'bad',c,'ok',o)
    print('    ',ex[k])
