# Convert the cutscene voices referenced by the ported rooms' scripts (bhVoiceOn, op 0x19).
# sound/voice/disc1p.stq: same SFH/QRTS layout as bgm_all.stq (file table + request table; request id = VoiceNo)
# out: web/public/assets/audio/voice/NAME.ogg + audio/voice.json {VoiceNo: NAME}
import os,sys,json,struct,subprocess,re
sys.path.insert(0,'/data/cvx/tools'); sys.path.insert(0,'/data/cvx/evt')
from sfh import clean
G='/data/cvx/g/sound/voice'; OUT='/data/cvx/web/public/assets/audio/voice'; TMP='/tmp/sndconv'
os.makedirs(TMP,exist_ok=True); os.makedirs(OUT,exist_ok=True)
st=open(G+'/disc1p.stq','rb').read(); files={}
nf,nr=struct.unpack('>II',st[0x18:0x20]); rq=struct.unpack('>I',st[0x34:0x38])[0]+0xc
for k in range(nf):
    o=0x4c+0x1c*k; no,size,_,ch,l0,l1,rate=struct.unpack('>7I',st[o:o+0x1c])
    files[k]=st[no+0x10:st.index(b'\0',no+0x10)].decode().split('\\')[-1]
req={}
for k in range(nr):
    s=rq+0x9c*k; rid,=struct.unpack('>H',st[s+4:s+6]); fi,=struct.unpack('>I',st[s+0x90:s+0x94])
    if fi in files: req[rid]=files[fi]
used=set()
out=subprocess.run(['python3','/data/cvx/evt/sndscan.py','19'],capture_output=True,text=True,cwd='/data/cvx').stdout
for l in out.splitlines():
    b=l.split('bhVoiceOn')[1].split(); used.add(int(b[2]+b[3],16))
low={f.lower():f for f in os.listdir(G+'/disc1')}
idx={}
for v in sorted(used):
    nm=req[v]; src=G+'/disc1/'+low[nm.lower()+'.at3']; idx[v]=nm
    dst=f'{OUT}/{nm}.ogg'
    if os.path.exists(dst): continue
    t=f'{TMP}/{nm}.at3'; open(t,'wb').write(clean(open(src,'rb').read()))
    r=subprocess.run(['ffmpeg','-v','error','-y','-i',t,'-c:a','libvorbis','-q:a','3',dst],capture_output=True,text=True)
    if r.returncode: print('ERR',v,nm,r.stderr[:200])
json.dump(idx,open(OUT+'/../voice.json','w'),separators=(',',':'))
print(len(idx),'voices')
