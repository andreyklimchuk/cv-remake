# Add the original light tables to converted rooms/<id>.json:
#   lgt / evl : LGT_WORK records of lgt/ and evl/ (light.c: flg, type, aspd, lkflg, lkno, lkono, lsrc, p, l, v, spc/dif/amb, rgb, nr, fr, angles)
#   amb       : ROM_WORK ambient block from rmh/ (amb_rom, amb_chr, amb_obj, amb_itm, amb_r[4], amb_g[4], amb_b[4])
import sys,glob,json,struct,os
OUT='/data/cvx/web/public/assets/rooms'
def recs(d):
    n=struct.unpack_from('<I',d,8)[0]; out=[]
    for i in range(n):
        e=0x10+224*i
        I=struct.unpack_from('>7i',d,e); F=struct.unpack_from('>17f',d,e+0x1c); A=struct.unpack_from('>5i',d,e+0x60)
        out.append(dict(flg=I[0]&0xffffffff,type=I[1],aspd=I[2],lkflg=I[3],lkno=I[4],lkono=I[5],lsrc=I[6],
            p=[F[0]*.1,F[1]*.1,F[2]*.1],l=list(F[3:6]),v=list(F[6:9]),spc=F[9],dif=F[10],amb=F[11],c=list(F[12:15]),nr=F[15]*.1,fr=F[16]*.1,ang=list(A)))
    return out
def one(ex,sub):
    L=glob.glob(f'{ex}/biocv_tmp/eng/data/{sub}/*'); return open(L[0],'rb').read() if L else None
for rid in sys.argv[1:]:
    ex='/data/cvx/ex/'+rid.replace('_',''); p=f'{OUT}/{rid}.json'
    J=json.load(open(p))
    J['lgt']=recs(one(ex,'lgt')) if one(ex,'lgt') else []
    J['evl']=recs(one(ex,'evl')) if one(ex,'evl') else []
    d=one(ex,'rmh'); o=len(d)-0x34; a=struct.unpack_from('<12f',d,o+4)
    J['amb']=dict(idx=list(d[o:o+4]),r=list(a[0:4]),g=list(a[4:8]),b=list(a[8:12]))
    json.dump(J,open(p,'w'),separators=(',',':'))
    print(rid,len(J['lgt']),len(J['evl']),J['amb']['idx'])
