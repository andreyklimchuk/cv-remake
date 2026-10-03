import sys,json; sys.path.insert(0,'/data/cvx/evt')
from load import all_scripts
from collections import Counter,defaultdict
from table import build,NAMES
SUB={0x64,0x66,0x67,0x69}
L=build()
OV={eval(k):v for k,v in json.load(open('/data/cvx/evt/ps3over.json')).items()}
L.update(OV)
def K(s,p): return (s[p],s[p+1]) if s[p] in SUB and p+1<len(s) else s[p]
def walk(s):
    p=0; ins=[]
    while p<len(s):
        if s[p] in (0,0xff) and all(b==0 for b in s[p+2:]): ins.append((p,s[p],2)); return ins,None
        k=K(s,p)
        if k not in L: return ins,p
        n=L[k]; ins.append((p,k,n)); p+=n
    return ins,'over'
def check(s,ins):
    starts={p for p,_,_ in ins}
    for p,k,l in ins:
        if k==1:
            q=p+s[p+1]
            if q not in starts or s[q] not in (2,3,0xff): return False
        if k==2:
            q=p+s[p+1]
            if q not in starts and q!=len(s): return False
        if k==0xfc:
            q=p+s[p+1]
            if q not in starts: return False
    return True
if __name__=='__main__':
    R=all_scripts(); unk=Counter(); ex=defaultdict(list); good=0; tot=0; badb=Counter()
    for r,v in R.items():
        for i,s in enumerate(v):
            if len(s)<=4: continue
            tot+=1; ins,e=walk(s)
            if e is None:
                if check(s,ins): good+=1
                else: badb[ins[-2][1] if len(ins)>1 else 0]+=1; unk['badblock']+=1
                continue
            if e=='over': k='over'
            else:
                # blame previous instruction
                k=('after',ins[-1][1]) if ins else ('start',)
            unk[k]+=1
            if len(ex[k])<4: ex[k].append('%s/%d '%(r,i)+(s[max(0,(ins[-1][0] if ins else 0)):][:28].hex(' ')))
    print('good',good,'of',tot)
    for k,c in unk.most_common(int(sys.argv[1]) if len(sys.argv)>1 else 10):
        print(k,c); [print('    ',e) for e in ex[k]]
