import json,sys,glob,os
sys.path.insert(0,'/data/cvx/evt')
from dis2 import walk,L
from table import NAMES
want=set(int(x,16) for x in sys.argv[1].split(','))
for f in sorted(glob.glob('/data/cvx/web/public/assets/evt/rm_*.json')):
    J=json.load(open(f))
    for si,h in enumerate(J['scripts']):
        s=bytes.fromhex(h); ins,err=walk(s)
        for p,k,n in ins:
            kk=k if isinstance(k,int) else k[0]
            if kk in want: print(os.path.basename(f)[:-5],si,'%04x'%p,NAMES.get(k,k) if not isinstance(k,tuple) else k,s[p:p+n].hex(' '))
