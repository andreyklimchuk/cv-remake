#!/bin/bash
# Restore the working environment after a sandbox reset.
set -e
mkdir -p /data/cvx && cd /data/cvx
if [ ! -d web/src ]; then
  rm -rf /tmp/zz && mkdir /tmp/zz && cd /tmp/zz
  curl -sL -o b.zip https://codeload.github.com/andreyklimchuk/cv-remake/zip/refs/heads/cvx-prison && unzip -q b.zip
  cd /data/cvx; R=/tmp/zz/cv-remake-cvx-prison/cvx-prison
  cp -r $R/src-ts web; mkdir -p ghpub_dl tools; cp -r $R/data $R/index.html $R/game.js ghpub_dl/
  [ -d $R/tools ] && cp -rn $R/tools/* tools/ || true
  ln -sfn /data/cv-remake/node_modules web/node_modules
  python3 - <<'PY'
import re,json,base64,os,glob
os.chdir('/data/cvx')
G={}
for f in glob.glob('ghpub_dl/data/*.js'):
    if '/mv_' in f: continue
    t=open(f).read(); m=re.search(r"push\(\['([^']*)',(\d+),'(.*)'\]\)",t)
    if m: G.setdefault(m.group(1),{})[int(m.group(2))]=m.group(3)
    else: G.setdefault('_old',{})[f]=re.search(r"push\('(.*)'\)",t).group(1)
if len(G)>1: G.pop('_old',None)
A={}
for g,parts in G.items(): A.update(json.loads(''.join(parts[k] for k in sorted(parts))))
for k,v in A.items():
    p='web/public/assets/'+k
    if os.path.exists(p): continue
    os.makedirs(os.path.dirname(p),exist_ok=True); open(p,'wb').write(base64.b64decode(v.split(',',1)[1]))
b=''.join(re.search(r"push\('(.*)'\)",open(f).read()).group(1) for f in sorted(glob.glob('ghpub_dl/data/mv_000_*.js')))
os.makedirs('web/public/movies',exist_ok=True); open('web/public/movies/mv_000.mp4','wb').write(base64.b64decode(b))
PY
fi
# game files (kept in /tmp, outside the backed-up /data)
G=/tmp/cvxg; mkdir -p $G
if [ ! -s $G/f.bin ]; then curl -sL -o $G/f.bin "https://drive.usercontent.google.com/download?id=1XmromPRRQPSTS66wKcS_SEXGJigBBeWV&export=download&confirm=t"; fi
if [ ! -d $G/n ]; then
  cd $G && 7za x -y -ox f.bin "*/biocv_disc/eng/*" "*/biocv_disc/*.*" "*/sa/PS3/*" "*/nativePS3/system/*" -r > /dev/null
  ln -sfn "$G/x/Resident Evil Code Veronica X/NPEB00553-[RESIDENT EVIL CODE Veronica X]/PS3_GAME/USRDIR/BHCV/nativePS3" $G/n
fi
ln -sfn $G/n /data/cvx/g
echo ready
