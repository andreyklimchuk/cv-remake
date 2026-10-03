# Path-sensitive estimate of how far a decompiled handler advances bhScePtr.
import re
TOK=re.compile(r'\s*(0x[0-9a-fA-F]+|\d+\.?\d*f?|[A-Za-z_]\w*|\+\+|--|\+=|-=|->|==|!=|<=|>=|&&|\|\||<<|>>|.)',re.S)
def toks(s):
    s=re.sub(r'/\*.*?\*/','',s,flags=re.S); s=re.sub(r'//[^\n]*','',s)
    out=[];i=0
    while i<len(s):
        m=TOK.match(s,i)
        if not m or m.end()==i: break
        if m.group(1).strip(): out.append(m.group(1))
        i=m.end()
    return out
def sdelta(ts):
    # delta of bhScePtr in a flat token list (no control flow)
    d=0; i=0
    while i<len(ts):
        if ts[i]=='bhScePtr':
            if i+1<len(ts) and ts[i+1]=='++': d+=1
            elif i+2<len(ts) and ts[i+1]=='+=' and ts[i+2].isdigit(): d+=int(ts[i+2])
            elif i+1<len(ts) and ts[i+1]=='=' : d+=1000  # reassignment: unknown
            elif i>0 and ts[i-1]=='++' : d+=1
        i+=1
    return d
class P:
    def __init__(s,ts): s.t=ts; s.i=0
    def peek(s): return s.t[s.i] if s.i<len(s.t) else None
    def eat(s,x=None):
        v=s.t[s.i]; s.i+=1; return v
    def paren(s):
        assert s.eat()=='('; d=1; st=s.i
        while d:
            v=s.eat(); d+=(v=='(')-(v==')')
        return s.t[st:s.i-1]
    # returns (set of fallthrough deltas, set of returned deltas, set of break deltas)
    def stmt(s):
        p=s.peek()
        if p=='{':
            s.eat(); F={0};Rt=set();B=set()
            while s.peek()!='}':
                f,r,b=s.stmt()
                Rt|={x+y for x in F for y in r}; B|={x+y for x in F for y in b}
                F={x+y for x in F for y in f}
            s.eat(); return F,Rt,B
        if p=='if':
            s.eat(); c=s.paren(); cd=sdelta(c)
            f1,r1,b1=s.stmt()
            if s.peek()=='else': s.eat(); f2,r2,b2=s.stmt()
            else: f2,r2,b2={0},set(),set()
            add=lambda S:{x+cd for x in S}
            return add(f1|f2),add(r1|r2),add(b1|b2)
        if p in ('while','for'):
            s.eat(); c=s.paren(); f,r,b=s.stmt(); return {sdelta(c)}|{x+sdelta(c) for x in f|b},r,set()
        if p=='do':
            s.eat(); f,r,b=s.stmt(); s.eat(); s.paren(); s.eat(); return f|b,r,set()
        if p=='switch':
            s.eat(); c=s.paren(); cd=sdelta(c); assert s.eat()=='{'
            F=set();Rt=set();cur=None;fall={0};hasdef=False
            # treat body as sequence of labelled statements
            curF=None
            while s.peek()!='}':
                if s.peek() in ('case','default'):
                    if s.eat()=='default': hasdef=True
                    while s.peek()!=':': s.eat()
                    s.eat()
                    curF=({0}|(curF or set())) if curF is not None else {0}
                    continue
                f,r,b=s.stmt()
                if curF is None: curF={0}
                Rt|={x+y for x in curF for y in r}; F|={x+y for x in curF for y in b}
                curF={x+y for x in curF for y in f}
            s.eat()
            if curF: F|=curF
            if not hasdef: F|={0}
            return {x+cd for x in F},{x+cd for x in Rt},set()
        if p=='return':
            st=s.i
            while s.eat()!=';': pass
            return set(),{sdelta(s.t[st:s.i])},set()
        if p=='break':
            s.eat(); s.eat(); return set(),set(),{0}
        if p==';': s.eat(); return {0},set(),set()
        st=s.i; d=0
        while True:
            v=s.eat()
            if v in '([{': d+=1
            if v in ')]}': d-=1
            if v==';' and d==0: break
        return {sdelta(s.t[st:s.i])},set(),set()
def paths(body):
    p=P(toks('{'+body+'}')); f,r,b=p.stmt(); return f|r
def paths_case(body):
    p=P(toks('{'+body+'}')); f,r,b=p.stmt(); return f|r|b
