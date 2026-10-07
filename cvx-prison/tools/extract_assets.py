import re,json,base64,os,glob
os.chdir('/data/cvx')
G={}
cur=re.findall(r'<script src="(data/[^"]+)"',open('ghpub_dl/index.html').read())
for f in ['ghpub_dl/'+x for x in cur]:
    if '/mv_' in f: continue
    t=open(f).read(); m=re.search(r"push\(\['([^']*)',(\d+),'(.*)'\]\)",t)
    if m: G.setdefault(m.group(1),{})[int(m.group(2))]=m.group(3)
    else: G.setdefault('_old',{})[f]=re.search(r"push\('(.*)'\)",t).group(1)
if len(G)>1: G.pop('_old',None)
A={}
for g,parts in G.items(): A.update(json.loads(''.join(parts[k] for k in sorted(parts))))
n=0
for k,v in A.items():
    p='web/public/assets/'+k
    if os.path.exists(p): continue
    os.makedirs(os.path.dirname(p),exist_ok=True); open(p,'wb').write(base64.b64decode(v.split(',',1)[1])); n+=1
b=''.join(re.search(r"push\('(.*)'\)",open(f).read()).group(1) for f in sorted(glob.glob('ghpub_dl/data/mv_000_*.js')))
os.makedirs('web/public/movies',exist_ok=True)
if not os.path.exists('web/public/movies/mv_000.mp4'): open('web/public/movies/mv_000.mp4','wb').write(base64.b64decode(b))
print('assets written:',n,'total keys',len(A))
