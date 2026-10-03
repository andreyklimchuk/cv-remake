# Human-readable listing of a room's event scripts (semantics from the PS2 decompilation).
import sys,struct; sys.path.insert(0,'/data/cvx/evt')
from dis2 import walk,L,NAMES,all_scripts
FT={1:'ev',2:'ky',3:'ed',4:'rm',5:'st',6:'sp',7:'it',8:'mp',9:'ic',10:'cb',11:'gm',12:'ts',13:'plflg',14:'plst',15:'plflg2',16:'ssd'}
def cnt(s,p):
    t=s[p+1]; return s[p+2] if t in (4,5,6,10) else (s[p+2]<<8|s[p+3])
def u16(s,p): return s[p]<<8|s[p+1]
def desc(s,p,k,n):
    b=s[p:p+n]
    if k==4:
        t=b[1]; x='%s[%d]==%d'%(FT.get(t,t),cnt(s,p),1-b[5])
        if t==10 and b[2]==23: x+=' && etc_idx==%d'%b[4]
        if t==10 and b[2]==22: x+=' && flr_idx==%d'%b[4]
        return 'CK '+x
    if k==5: return 'SET %s[%d] op%d'%(FT.get(b[1],b[1]),cnt(s,p),b[5])
    if k==1: return 'IF ->+%d'%b[1]
    if k==2: return 'ELSE ->+%d'%b[1]
    if k==3: return 'ENDIF'
    if k==0xf8: return 'SLEEP %d'%u16(b,2)
    if k==0xfc: return 'WHILE ->+%d'%b[1]
    if k==0xfd: return 'EWHILE'
    if k==0xfe: return 'NEXTFRAME'
    if k==0xff: return 'EVTEND'
    if k==0xfa: return 'FOR %d'%u16(b,2)
    if k==0xfb: return 'NEXT'
    if k==0x14: return 'EVTON task%d evt%d'%(b[2],b[3])
    if k==0x0b: return 'ETC[%d] %s'%(b[1],'off' if b[2] else 'on')
    if k==0x0a: return 'WALL[%d] %s'%(b[1],'off' if b[2] else 'on')
    if k==0x0c: return 'FLOOR[%d] %s'%(b[1],'off' if b[2] else 'on')
    if k==0x25: return 'ETCSET[%d] attr=%04x prm=%d,%d,%d,%d type=%d'%(b[1],u16(b,2),b[4],b[5],b[6],b[7],b[8])
    if k==0x1f: return 'MESSAGE %s %d keep=%d'%('show' if b[1]==0 else 'close',b[2],b[3])
    if k==0x20: return 'DISP %s[%d] %s'%(['pl','ene','obj','itm'][b[2]] if b[2]<4 else b[2],b[1],'on' if b[3]==0 else 'off')
    if k==0x23: return 'ITMSETCK itm%d it[%d] etc%d keepetc=%d'%(b[1],u16(b,2),b[4],b[5])
    if k==0x22: return 'ENESETCK ene%d ed[%d]'%(b[1],u16(b,2))
    if k==0x65: return 'WORK %s %d model%d'%(['pl','ene','obj'][b[1]] if b[1]<3 else b[1],b[2],b[3])
    if k==(0x69,7): return 'POS %d %d %d'%(u16(b,2),u16(b,4),u16(b,6))
    if k==(0x69,0x0c): return 'POSSIGN %d %d %d'%(b[2],b[3],b[4])
    if k==(0x69,0x0d): return 'ANGSIGN %d %d %d'%(b[2],b[3],b[4])
    if k==(0x69,0x0b): return 'ANG %d %d %d'%(b[2],b[3],b[4])
    if k==6: return 'CMPB var%d op%d %d'%(b[1],b[2],b[3])
    if k==7: return 'CMPW var%d op%d %d (ene%d)'%(b[2],b[3],u16(b,4),b[1])
    if k==8: return 'SV var%d=%d'%(b[1],b[2])
    if k==0x13: return 'CAMSET %d'%b[2]
    if k==0x33: return 'DOORCALL '+b.hex(' ')
    return None
def listing(s,ind0=0):
    ins,e=walk(s); out=[]; ends=[]; ind=0
    for p,k,n in ins:
        while ends and ends[-1]<=p: ends.pop()
        kk=k if isinstance(k,int) else k[0]
        nm=NAMES.get(kk,'?') + ('/%02x'%k[1] if not isinstance(k,int) else '')
        try: d=desc(s,p,k,n)
        except Exception: d=None
        out.append('%4x %s%-34s %s'%(p,'  '*len(ends),d or nm,s[p:p+n].hex(' ')))
        if k in (1,2,0xfc): ends.append(p+s[p+1])
    if e is not None: out.append('  !! stop at %s'%e)
    return out
if __name__=='__main__':
    R=all_scripts(); r=sys.argv[1]
    for i,s in enumerate(R[r]):
        if len(sys.argv)>2 and str(i) not in sys.argv[2].split(','): continue
        print('==== %s script %d (%s)'%(r,i,['scd0 init','scd1 every frame'][i] if i<2 else 'event %d'%(i-2)))
        print('\n'.join(listing(s)))
