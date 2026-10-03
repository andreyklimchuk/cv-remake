# Export the PS3 event-command table (lengths verified on all PS3 scripts, names from the PS2 decompilation).
import json,sys; sys.path.insert(0,'/data/cvx/evt')
from dis2 import L,NAMES
import declen
out={}
for k,v in L.items():
    if isinstance(k,tuple): out['%02x%02x'%k]=[v,declen.S.get(k,('?',))[0]]
    else: out['%02x'%k]=[v,NAMES.get(k,'')]
json.dump(out,open(sys.argv[1],'w'),indent=0,sort_keys=True)
print(len(out))
