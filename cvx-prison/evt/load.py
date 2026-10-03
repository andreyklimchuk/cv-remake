import glob,struct,os
def scripts(path):
    d=open(path,'rb').read()
    n=struct.unpack_from('>I',d,0)[0]//4; offs=list(struct.unpack_from('>%dI'%n,d,0))+[len(d)]
    out=[]
    for i in range(n):
        s=d[offs[i]:offs[i+1]]
        # trim trailing zero padding after last ff 00 00 00
        while len(s)>=4 and s[-4:]==b'\0\0\0\0': s=s[:-4]
        out.append(s)
    return out
def all_scripts():
    R={}
    for f in sorted(glob.glob('/data/cvx/ex/rm*/biocv_tmp/eng/data/evt/*')):
        R[f.split('/')[4]]=scripts(f)
    return R
