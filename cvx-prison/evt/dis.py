import json,sys
from load import all_scripts
from collections import Counter,defaultdict
R=all_scripts()
SUB={0x69,0x64,0x26,0x67}
def K(s,p): return (s[p],s[p+1]) if s[p] in SUB else s[p]
def LEN(s,p,k,L):
    v=L[k]
    return 2+s[p+1] if v=='fc' else v
def load_L():
    try: return {eval(k):v for k,v in json.load(open('Lman.json')).items()}
    except: return {}
def walk(s,L):
    p=0; ins=[]
    while p<len(s):
        if s[p]==0xff and all(b==0 for b in s[p+2:]): ins.append((p,0xff,2)); return ins,None
        k=K(s,p)
        if k not in L: return ins,p
        n=LEN(s,p,k,L); ins.append((p,k,n)); p+=n
    return ins,'over'
if __name__=='__main__':
    L=load_L(); unk=Counter(); ex=defaultdict(list); good=0; tot=0; bad=[]
    for r,v in R.items():
        for i,s in enumerate(v):
            if len(s)<=4: continue
            tot+=1; ins,e=walk(s,L)
            # check if-blocks
            okb=True
            if e is None:
                starts={p for p,_,_ in ins}
                for p,k,l in ins:
                    if k in (1,2):
                        q=p+s[p+1]
                        if q not in starts or s[q] not in (2,3): okb=False
                if okb: good+=1
                else: bad.append((r,i))
            elif e=='over': unk['over']+=1
            else:
                k=K(s,e); unk[k]+=1
                if len(ex[k])<6: ex[k].append(s[max(0,e-6):e].hex(' ')+' | '+s[e:e+26].hex(' '))
    print('good',good,'of',tot,'badblocks',len(bad),bad[:5])
    for k,c in unk.most_common(int(sys.argv[1]) if len(sys.argv)>1 else 8):
        print(k if isinstance(k,str) else (hex(k) if isinstance(k,int) else (hex(k[0]),hex(k[1]))),c)
        for e in ex[k]: print('    ',e)
