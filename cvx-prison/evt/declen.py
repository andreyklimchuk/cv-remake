# Derive script command lengths from the PS2 decompilation (fmil95/recvx-decomp, event.c)
import re,json,sys
t=open('/data/cvx/evt/event_ps2.c').read()
t=re.sub(r'//[^\n]*','',t)
m=re.search(r'bhScenarioJmpT\[256\]\)\(\) = \s*\{(.*?)\};',t,re.S)
names=[x.strip() for x in m.group(1).split(',')]
def body(fn):
    mm=re.search(r'\n(?:unsigned )?int '+fn+r'\([^)]*\)\s*\n\{',t)
    if not mm: return None
    i=mm.end(); d=1
    while d:
        c=t[i]; d+= (c=='{')-(c=='}'); i+=1
    return t[mm.end():i-1]
def delta(b):
    n=0
    for x in re.findall(r'bhScePtr\s*(\+=\s*\d+|\+\+)|\+\+bhScePtr|\*bhScePtr\+\+',b):
        n+= int(x.split('=')[1]) if x.startswith('+=') else 1
    # also count "*bhScePtr++" pattern counted above as '' -> handled
    return n
def cond(b): return bool(re.search(r'\bif\b|\bswitch\b|\bwhile\b|\bfor\b',b))
def cases(b):
    # split top-level switch cases (depth 1 inside the first switch block)
    s=b.find('switch'); s=b.find('{',s); d=0; out={}; cur=None; buf=''
    i=s
    while i<len(b):
        c=b[i]
        if c=='{': d+=1
        if c=='}':
            d-=1
            if d==0: break
        if d==1 or (d==2 and b[i:i+4]=='case' and False):
            mm=re.match(r'case\s+(0x[0-9a-fA-F]+|\d+)\s*:|default\s*:',b[i:])
            if mm:
                if cur is not None:
                    for k in cur: out[k]=buf
                    if buf.strip(): cur=[]
                k=mm.group(1) and int(mm.group(1),0)
                cur=(cur if cur and not buf.strip() else [])+[k]; buf=''; i+=mm.end(); continue
        buf+=c; i+=1
    if cur is not None:
        for k in cur: out[k]=buf
    return out
R={}
for i,n in enumerate(names):
    if n=='dm0': continue
    b=body(n)
    R[i]=(n,delta(b),cond(b))
SUBF={0x64:'Player_controll',0x66:'Obj_controll',0x67:'Sub_controll',0x69:'Common_controll'}
S={}
for op,fn in SUBF.items():
    b=body(fn)
    for k,cb in cases(b).items():
        if k is None: continue
        S[(op,k)]=(fn,1+delta(cb),cond(cb))   # +1 for the opcode byte consumed by bh*Ctr
if __name__=='__main__':
    for i,(n,d,c) in R.items(): print('%02x %-26s %3d %s'%(i,n,d,'C' if c else ''))
    for (op,k),(n,d,c) in sorted(S.items()): print('%02x/%02x(%3d) %-18s %3d %s'%(op,k,k,n,d,'C' if c else ''))
