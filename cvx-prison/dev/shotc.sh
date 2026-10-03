#!/bin/bash
cat t_start.js $2 > /tmp/tv.js
timeout 280 node shot.mjs /tmp/tv.js > /tmp/tv.out 2>&1
grep "^CONSOLE LOG\|^ERR\|PAGEERR\|^404" /tmp/tv.out | cut -c1-3000
python3 - "$1" "${3:-0.5}" <<'PY'
import json,base64,sys,io
from PIL import Image
t=open('/tmp/tv.out').read(); l=[x for x in t.splitlines() if x.startswith('RESULT ')]
if not l: sys.exit()
r=json.loads(l[0][7:])
if not r: sys.exit()
ims=[Image.open(io.BytesIO(base64.b64decode(u.split(',')[1]))) for u in r]
s=float(sys.argv[2]); ims=[i.resize((int(i.width*s),int(i.height*s))) for i in ims]
C=(8 if len(ims)%8==0 else 6) if len(ims)>8 else len(ims); Rr=(len(ims)+C-1)//C; w,h=ims[0].width,ims[0].height
out=Image.new('RGB',(w*C,h*Rr))
for k,i in enumerate(ims): out.paste(i,((k%C)*w,(k//C)*h))
out.save('/data/cvx/shots/%s.png'%sys.argv[1]); print('ok',len(ims))
PY
