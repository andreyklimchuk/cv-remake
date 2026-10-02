# list sprite islands (alpha connected components) in an atlas
import sys,numpy as np
from PIL import Image
from collections import deque
def comps(path,th=40,step=2,minpx=6):
    im=np.array(Image.open(path).convert('RGBA'))
    a=im[::step,::step,3]>th; H,W=a.shape; lab=np.zeros((H,W),int); out=[]
    k=0
    for y in range(H):
        for x in range(W):
            if a[y,x] and not lab[y,x]:
                k+=1; q=deque([(y,x)]); lab[y,x]=k; ys=[];xs=[]
                while q:
                    cy,cx=q.popleft(); ys.append(cy); xs.append(cx)
                    for dy in (-1,0,1):
                        for dx in (-1,0,1):
                            ny,nx=cy+dy,cx+dx
                            if 0<=ny<H and 0<=nx<W and a[ny,nx] and not lab[ny,nx]: lab[ny,nx]=k; q.append((ny,nx))
                if len(ys)>=minpx:
                    x0,x1,y0,y1=min(xs)*step,(max(xs)+1)*step,min(ys)*step,(max(ys)+1)*step
                    reg=im[y0:y1,x0:x1]; m=reg[...,3]>th; c=reg[m][:,:3].mean(0).astype(int)
                    out.append((x0,y0,x1-x0,y1-y0,len(ys)*step*step,tuple(c)))
    return out
if __name__=='__main__':
    for c in comps(sys.argv[1]): print(c)
