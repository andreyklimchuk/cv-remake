# prepare GitHub push_files argument files for every changed file (vs. the current branch zip)
import os,sys,json,subprocess,shutil,filecmp
msg=sys.argv[1]
T='/tmp/brz'; shutil.rmtree(T,ignore_errors=True); os.makedirs(T)
subprocess.run(['curl','-sL','-o',T+'/b.zip','https://codeload.github.com/andreyklimchuk/cv-remake/zip/refs/heads/cvx-prison'],check=True)
subprocess.run(['unzip','-q',T+'/b.zip','-d',T],check=True)
R=T+'/cv-remake-cvx-prison/cvx-prison'
pairs=[]
def walk(local,remote,skip=()):
    for dp,dn,fn in os.walk(local):
        dn[:]=[d for d in dn if d not in ('node_modules','dist','public','__pycache__')+skip]
        for f in fn:
            if f.endswith(('.pyc',)) or f in ('t.mjs','play.html'): continue
            lp=os.path.join(dp,f); rel=os.path.relpath(lp,local); rp=os.path.join(remote,rel)
            rr=os.path.join(R,rp)
            if not os.path.exists(rr) or not filecmp.cmp(lp,rr,shallow=False): pairs.append(('cvx-prison/'+rp,lp))
P='/data/cvx/ghpub/cvx-prison'
walk(P+'/data','data')
walk('/data/cvx/web','src-ts')
walk('/data/cvx/tools','tools')
walk('/data/cvx/conv','conv')
walk('/data/cvx/evt','evt')
walk('/data/cvx/dev','dev')
for f in ('README.md','HANDOFF.md'):
    if os.path.exists('/data/cvx/'+f): pairs.append(('cvx-prison/'+f,'/data/cvx/'+f)) if not os.path.exists(R+'/'+f) or not filecmp.cmp('/data/cvx/'+f,R+'/'+f,shallow=False) else None
last=[x for x in pairs if x[0] in ('cvx-prison/game.js','cvx-prison/index.html')]
for f in ('game.js','index.html'):
    if not filecmp.cmp(P+'/'+f,R+'/'+f,shallow=False): last.append(('cvx-prison/'+f,P+'/'+f))
pairs=[x for x in pairs if x not in last]
G='/data/cvx/ghargs'; shutil.rmtree(G,ignore_errors=True); os.makedirs(G)
batches=[];cur=[];size=0
for p,l in pairs:
    s=os.path.getsize(l)
    if cur and size+s>900000: batches.append(cur);cur=[];size=0
    cur.append((p,l)); size+=s
if cur: batches.append(cur)
if last: batches.append(last)
for i,bt in enumerate(batches):
    d={'owner':'andreyklimchuk','repo':'cv-remake','branch':'cvx-prison','message':msg,'files':[{'path':p,'content':open(l,encoding='utf-8').read()} for p,l in bt]}
    s=json.dumps(d); open(G+'/%02d.json'%i,'w').write(s); print('%02d'%i,len(s),[p for p,_ in bt])
