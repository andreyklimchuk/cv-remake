# Convert the PS3 sound data used by the prison rooms to ogg + JSON indices.
#  SE banks  (sound/se/**/NAME.spc + NAME.srq): SFH deblock -> CAPS/MSF0 ATRAC3 samples, QERS request lists
#  BGM       (sound/bgm/source/NAME.at3, table bgm_all.stq): SFH deblock -> RIFF ATRAC3plus
# out: web/public/assets/audio/se/NAME/NN.ogg + se/NAME.json, audio/bgm/NAME.ogg + audio/bgm.json
import os,sys,json,struct,subprocess,math,hashlib
SEEN={}  # identical sample data is stored once (raw md5 -> 'bank/NN')
sys.path.insert(0,'/data/cvx/tools')
from sfh import clean
from spc import riff
G='/data/cvx/g/sound'; OUT='/data/cvx/web/public/assets/audio'; TMP='/tmp/sndconv'
os.makedirs(TMP,exist_ok=True)
BA={4:0x60,5:0x98,6:0xc0}
def enc(src,dst,q='3',extra=()):
    r=subprocess.run(['ffmpeg','-v','error','-y','-i',src,*extra,'-c:a','libvorbis','-q:a',q,dst],capture_output=True,text=True)
    if r.returncode: raise RuntimeError(r.stderr)
def bank(path,name):
    s=clean(open(path+'.spc','rb').read()); assert s[:4]==b'CAPS'
    ds=struct.unpack('>I',s[0x1c:0x20])[0]; p=0x20; hs=[]
    while s[p:p+4]==b'MSF0': hs.append(struct.unpack('>7I',s[p+4:p+32])); p+=0x40
    od=os.path.join(OUT,'se',name); os.makedirs(od,exist_ok=True)
    for f in os.listdir(od): os.remove(os.path.join(od,f))
    samples=[]; q=ds
    for i,(codec,ch,sz,sr,flg,ls,ll) in enumerate(hs):
        ba=BA[codec]*ch; w=riff(s[q:q+sz],ch,sr,ba); q+=(sz+0x7f)&~0x7f
        h=hashlib.md5(w).hexdigest()
        if h not in SEEN:
            t=f'{TMP}/{name}_{i}.at3'; open(t,'wb').write(w); enc(t,f'{od}/{i:02d}.ogg'); SEEN[h]=f'{name}/{i:02d}'
        info={'f':SEEN[h],'n':sz//ba*1024,'sr':sr}
        if flg!=0xffffffff and flg&1:   # MSF loop: start byte, length bytes (clamped to the data, like vgmstream)
            info['loop']=[ls//ba*1024,min(ls+ll,sz)//ba*1024]
        samples.append(info)
    r=clean(open(path+'.srq','rb').read()); assert r[:4]==b'QERS'
    end=struct.unpack('>I',r[0x1c:0x20])[0]; lists={}
    for o in range(0x34,end,0x90):
        e=r[o:o+0x90]; lst=struct.unpack('>H',e[0:2])[0]
        nxt,=struct.unpack('>H',e[0x1c:0x1e]); smp,pan=struct.unpack('>HH',e[0x20:0x24]); vol,=struct.unpack('>f',e[0x24:0x28])
        ent={'s':smp,'v':round(vol,2)}
        if pan!=0xffff: ent['p']=pan
        if nxt!=0xffff: ent['l']=nxt
        lists[lst]=ent
    json.dump({'samples':samples,'lists':lists},open(os.path.join(OUT,'se',name+'.json'),'w'),separators=(',',':'))
    print(name,len(samples),'samples',len(lists),'lists')
    if not os.listdir(od): os.rmdir(od)
def bgm(names):
    st=open(G+'/bgm/bgm_all.stq','rb').read(); files={}
    for k in range(109):
        o=0x4c+0x1c*k; no,size,_,ch,l0,l1,rate=struct.unpack('>7I',st[o:o+0x1c])
        nm=st[no+0x10:st.index(b'\0',no+0x10)].decode().split('\\')[-1]; files[k]=(nm,ch,l0,l1,rate)
    req={}
    for k in range(133):
        s=0xc34+0x9c*k; rid,=struct.unpack('>H',st[s+4:s+6]); fi,=struct.unpack('>I',st[s+0x90:s+0x94])
        if fi in files: req[rid]=files[fi]
    od=os.path.join(OUT,'bgm'); os.makedirs(od,exist_ok=True); idx={}
    for rid,(nm,ch,l0,l1,rate) in sorted(req.items()):
        if nm not in names: continue
        idx[rid]={'f':nm}
        if l1>l0: idx[rid]['loop']=[round(l0/rate,4),round(l1/rate,4)]
        if os.path.exists(f'{od}/{nm}.ogg'): continue
        t=f'{TMP}/{nm}.at3'; open(t,'wb').write(clean(open(f'{G}/bgm/source/{nm}.at3','rb').read()))
        # keep only what is played: up to the loop end
        enc(t,f'{od}/{nm}.ogg','2',('-t',str(l1/rate+0.05)) if l1>l0 else ())
        print('bgm',hex(rid),nm,idx[rid])
    json.dump(idx,open(OUT+'/bgm.json','w'),separators=(',',':'))
if __name__=='__main__':
    for n in ['000','002','003','004','005','006','008']: bank(f'{G}/se/room/rm_000/rm_{n}_0',f'rm_{n}_0')
    bank(f'{G}/se/room/rm_common','rm_common')
    for n in ['002','003','005','008']: bank(f'{G}/se/bg/bg_{n}_0',f'bg_{n}_0')
    for n in ['000_0','003_0','003_1','005_0','006_0','007_0']: bank(f'{G}/se/pc/pc_{n}',f'pc_{n}')
    bgm({'main00','main01','sub_01','sub_02','sub_03','sub_04','sub_05','sub_08','sub_31','sub_32','sub_39','sub_70'})
