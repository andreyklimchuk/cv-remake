# Restore the face joints (b06..b10) of the player model: the original pl00 skeleton has separate
# mouth (6/7/9) and eye (8/10) nodes, the converted claire.glb had them merged into the head (b05).
# usage: face_joints.py <claire.glb>
import sys,os,struct
sys.path.insert(0,os.path.dirname(__file__))
import numpy as np
from glb import GLB
# rest translations of the face nodes, taken from the original en91 (Claire double) skeleton
# (the player skeleton uses b06..b09 for the right arm, so the face nodes are named f06..f10)
FACE = {'f06': (0.0, 0.046, -0.026), 'f07': (0.0, 0.046, -0.026), 'f08': (-0.024, 0.077, -0.071),
        'f09': (0.0, 0.046, -0.026), 'f10': (0.024, 0.077, -0.071)}
src = sys.argv[1]
g = GLB(src); j = g.j
names = [n.get('name') for n in j['nodes']]
if 'f06' in names:
    print('already patched'); sys.exit()
head = names.index('b05')
skin = j['skins'][0]
def mat4(node_i):
    """world rest matrix of a node (translation + rotation, no scale)"""
    n = j['nodes'][node_i]
    t = np.array(n.get('translation', [0, 0, 0]), float)
    q = np.array(n.get('rotation', [0, 0, 0, 1]), float)
    x, y, z, w = q
    R = np.array([[1-2*(y*y+z*z), 2*(x*y-z*w), 2*(x*z+y*w)],
                  [2*(x*y+z*w), 1-2*(x*x+z*z), 2*(y*z-x*w)],
                  [2*(x*z-y*w), 2*(y*z+x*w), 1-2*(x*x+y*y)]])
    M = np.eye(4); M[:3, :3] = R; M[:3, 3] = t
    return M
Mhead = mat4(head)
new_joints = []
for nm, t in FACE.items():
    M = Mhead @ np.array([[1, 0, 0, t[0]], [0, 1, 0, t[1]], [0, 0, 1, t[2]], [0, 0, 0, 1]])
    idx = len(j['nodes'])
    j['nodes'].append({'name': nm, 'translation': list(t)})
    j['nodes'][head].setdefault('children', []).append(idx)
    skin['joints'].append(idx)
    new_joints.append((nm, idx, np.linalg.inv(M)))
# inverse bind matrices: append after the existing ones
ibm_acc = skin['inverseBindMatrices']
a = j['accessors'][ibm_acc]; bv = j['bufferViews'][a['bufferView']]
off = bv.get('byteOffset', 0) + a.get('byteOffset', 0)
old = np.frombuffer(bytes(g.B), dtype='<f4', count=a['count']*16, offset=off).reshape(a['count'], 4, 4)
add = np.array([M.T.reshape(-1) for _, _, M in new_joints], dtype='<f4')  # glTF stores column-major
while len(g.B) % 4: g.B.append(0)
new_off = len(g.B)
g.B.extend(np.concatenate([old.reshape(-1), add.reshape(-1)]).astype('<f4').tobytes())
bv['byteOffset'] = new_off; bv.pop('byteStride', None)
a['count'] = old.shape[0] + len(new_joints)
bv['byteLength'] = a['count'] * 64
# reassign the face vertices of the player mesh: the lower face (mouth) and the eye region
prim_of = {}
for pi, pr in enumerate(j['meshes'][0]['primitives']):
    P, _ = g.acc(pr['attributes']['POSITION'])
    mat = j['materials'][pr['material']].get('name')
    ymin, ymax = P[:, 1].min(), P[:, 1].max()
    zmax = P[:, 2].max()
    if mat in ('claire_t1', 'claire_t2') and ymin > 1.45 and zmax < 0.02 and len(P) < 160:
        prim_of[pi] = P
J = g.acc(j['meshes'][0]['primitives'][0]['attributes']['JOINTS_0'])[0].copy()
print('face primitives:', list(prim_of), [len(v) for v in prim_of.values()])
idx = {nm: i for nm, i, _ in new_joints}
mouth = [idx['f06'], idx['f07'], idx['f09']]
for pi, P in prim_of.items():
    pr = j['meshes'][0]['primitives'][pi]
    Jt, _ = g.acc(pr['attributes']['JOINTS_0'])
    Wt, _ = g.acc(pr['attributes']['WEIGHTS_0'])
    Jt = Jt.astype(np.uint16).copy(); Wt = Wt.astype('<f4').copy()
    for k, p in enumerate(P):
        if p[1] >= 1.575:                      # eye region -> b08 (left) / b10 (right)
            jt = idx['f08'] if p[0] < 0 else idx['f10']
            Jt[k] = (jt, 0, 0, 0); Wt[k] = (1.0, 0, 0, 0)
        elif p[1] <= 1.56:                     # mouth / chin -> the mouth nodes
            Jt[k] = (mouth[k % 3], 0, 0, 0); Wt[k] = (1.0, 0, 0, 0)
    g.setacc(pr['attributes']['JOINTS_0'], Jt); g.setacc(pr['attributes']['WEIGHTS_0'], Wt)
j['buffers'][0]['byteLength'] = len(g.B)
g.save(src)
print('patched', src, 'joints', len(skin['joints']))
