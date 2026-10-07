class_name FaceMask
extends RefCounted
## Facial animation of the cutscene NPCs (enemy id > 90): port of face.c (bhInitMask / bhControlMask / bhSetMask / bhSetLip)
## and face_bh.c (fmCnk*: muscle vertex deformation, jaw, tongue, eyeballs). Data: tools/conv/face_export.py ->
## data/face/face_enNN.json (the model's MASK block) and data/face/fmt_rm_XXXX.json (room face motions sys->mspp and
## lip-sync streams sys->lspp). The original deforms the face model's vertex list before skinning (npCalcSkinFM); here the
## same vertices of the imported skinned mesh are rewritten in bind space (mesh_surface_update_vertex_region).
## The model has normal recalculation off (fmCnkSetMode(fm, 1)), so normals stay the source ones, as in the original.

const LIP_MASK := 0x3FFF000
const BAMS := TAU / 65536.0

var model: EnemyModel
var id := 0
var D: Dictionary
var faces: Array = []          # the model's own PARAM table (default face + lip visemes, 6 per group)
var masks: Array = []          # room face motions (bhSetMask)
var lips: Array = []           # room lip streams (bhSetLip)
# exp0 words
var flags := 0                 # [0]: 1 play, 2 loop, 4 lip, 8 new mask, 0x10 pause, 0x20 reset
var msk := -1                  # [266] the mask entry chosen by bhSetMask
var lip_no := -1               # [268] the lip stream chosen by bhSetLip
var lip_grp := 0               # [4] viseme group
var frm_start := 0             # [5]
var frame := 0                 # [6]
var last := 0                  # [7]
var face: Array = []           # fm->face (current PARAM list)
var face_lip: Array = []       # [267] PARAM list of the lip visemes (the model's own table)
# LIP_WORK
var lp := {"flag": 0, "top": [], "ptr": 0, "cnt": 0, "time": 0, "cur": 0, "next": 0}
# fm->param: muscle[32], jawang, jawtrans, eye xyz, tangx, tangy, tangz
var param := PackedFloat32Array()
var _last_param := PackedFloat32Array()

# geometry
var _src := {}                 # face vertex id -> Vector3 (model local)
var _tsrc := {}                # tongue vertex id -> Vector3
var _jmat1 := Transform3D()
var _jmat2 := Transform3D()
var _mi: MeshInstance3D
var _mesh: ArrayMesh
var _surf := []                # per surface: {"buf": PackedByteArray, "stride", "off", "verts": [[vi, id, tongue]]}
var _face_x := Transform3D()   # bind (mesh) space of the face model: rest of its node * S
var _tang_x := Transform3D()
var _bt := -1; var _bg := -1; var _be: Array = []
var _r3z := -1.0

func _init(m: EnemyModel, name: String, ene_id: int) -> void:
	model = m; id = ene_id
	var d: Variant = Assets.data_json("face/face_%s.json" % name)
	if d == null: return
	D = d
	faces = D.faces
	for k in D.fv: _src[int(k)] = U.v3(D.fv[k])
	for k in D.tv: _tsrc[int(k)] = U.v3(D.tv[k])
	param.resize(40); _last_param.resize(40)
	_set_jaw(int(D.head.jaw[0]), int(D.head.jaw[1]))
	_setup_mesh()
	var nd: Dictionary = D.nodes
	_bt = m.bone_index("b%02d" % int(nd.tooth)); _bg = m.bone_index("b%02d" % int(nd.tang))
	for e in nd.eye: _be.append(m.bone_index("b%02d" % int(e)))
	# bhInitMask
	flags = 0; lip_grp = 0; frame = 0; last = 0
	face = faces; face_lip = faces
	lp.flag = 0

var ok: bool:
	get: return not D.is_empty() and _mesh != null

## room face motions / lip streams (sys->mspp / sys->lspp of the room)
func set_room(room_id: String) -> void:
	var d: Variant = Assets.data_json("face/fmt_%s.json" % room_id)
	masks = d.masks if d else []
	lips = d.lips if d else []
	msk = -1; lip_no = -1
	if not lips.is_empty(): lip_no = 0

# ---------------------------------------------------------------- event commands (event.c)
## bhMaskSet 0x3c: bhSetMask(pp, msk_no, 0)
func set_mask(no: int, frm := 0) -> void:
	frm_start = frm
	if no < 0 or no >= masks.size(): return
	msk = no; flags |= 8
## bhLipSet 0x3d: exp0[4] = group, bhSetLip(pp, no)
func set_lip(grp: int, no: int) -> void:
	lip_grp = grp
	if no >= 0 and no < lips.size(): lip_no = no
## bhMaskStart 0x3e (v2 == 0 -> play)
func mask_start(on: bool) -> void:
	flags = (flags | 1) if on else (flags & ~1)
## bhLipStart 0x3f
func lip_start(on: bool) -> void:
	flags = (flags | 4) if on else (flags & ~4)
## bhFacePauseSet 0x8f
func pause(on: bool) -> void:
	flags = (flags | 0x10) if on else (flags & ~0x10)
## bhFaceReSet 0x90
func reset() -> void:
	flags |= 0x20
## bhFaceRep 0x9a (v1 == 0 -> loop)
func repeat(on: bool) -> void:
	flags = (flags | 2) if on else (flags & ~2)

# ---------------------------------------------------------------- bhControlMask (30 Hz)
func control() -> void:
	if not ok: return
	if flags & 8:
		flags &= ~8
		var e: Dictionary = masks[msk]
		if int(e.id) == 0 or int(e.id) == id:
			face = e.frames
			frame = frm_start
			last = int(face[face.size() - 1].frame)
			if frame > last: frame = 0
	if flags & 4:
		if lp.flag == 0 and lip_no >= 0:
			lp.top = lips[lip_no]; lp.ptr = 0; lp.cnt = 0; lp.time = 0; lp.flag = 1
	else:
		lp.flag = 0
	_set_frame(frame)
	if lp.flag:
		_lip_sync(lip_grp * 6)
		if lp.flag == 0: flags &= ~4
	if flags & 1 and not flags & 0x10:
		frame += 1
		if frame >= last:
			if not flags & 2:
				frame = maxi(last - 1, 0); flags &= ~1
			else:
				frame = 0
	if flags & 0x20:
		flags &= ~0x31
		face = faces; face_lip = faces; frame = 0
		last = int(face[face.size() - 1].frame)
	_calc_face()

# fmCnkSetCurrentFrame
func _set_frame(f: float) -> void:
	var n := face.size()
	var i := 0
	while i < n and int(face[i].frame) <= int(f): i += 1
	if i == 0: _set_param(face[0])
	elif i == n: _set_param(face[n - 1])
	else:
		var a: Dictionary = face[i - 1]; var b: Dictionary = face[i]
		_inter(a, b, (f - float(a.frame)) / (float(b.frame) - float(a.frame)), 1.0, -1)

func _set_param(p: Dictionary) -> void:
	var f: Array = p.f
	for k in 40: param[k] = float(f[k])

static func _rate(p: Dictionary, t: float) -> float:
	match int(p.flag):
		1: return t * t
		2: return sqrt(t)
		3: return 0.5 - 0.5 * cos(PI * t)
		4: return 0.0
	return t

# fmCnkSetInterParam
func _inter(p1: Dictionary, p2: Dictionary, t: float, lv: float, mask: int) -> void:
	var r := _rate(p1, t)
	var a: Array = p1.f; var b: Array = p2.f
	for k in 32:
		if mask & (1 << k): param[k] = (float(a[k]) + r * (float(b[k]) - float(a[k]))) * lv
	for k in [32, 33]: param[k] = lv * (float(a[k]) + r * (float(b[k]) - float(a[k])))
	for k in [34, 35, 36]: param[k] = float(a[k]) + r * (float(b[k]) - float(a[k]))
	for k in [37, 38, 39]: param[k] = lv * (float(a[k]) + r * (float(b[k]) - float(a[k])))

# fmCnkSetParamLip
func _param_lip(p: Dictionary, mask: int) -> void:
	var f: Array = p.f; var iv: Array = p.i
	for k in 32:
		if mask & (1 << k): param[k] = float(f[k])
	param[32] = 0.005493164 * float(iv[0]); param[33] = float(f[33])
	param[37] = 0.005493164 * float(iv[1]); param[38] = 0.005493164 * float(iv[2]); param[39] = float(f[39])

# fmCnkSetInterParamLip
func _inter_lip(p1: Dictionary, p2: Dictionary, t: float, lv: float, mask: int) -> void:
	var r := _rate(p1, t)
	var a: Array = p1.f; var b: Array = p2.f; var ia: Array = p1.i; var ib: Array = p2.i
	for k in 32:
		if mask & (1 << k): param[k] = (float(a[k]) + r * (float(b[k]) - float(a[k]))) * lv
	param[32] = lv * (0.005493164 * float(ia[0]) + r * (0.005493164 * (float(ib[0]) - float(ia[0]))))
	param[33] = lv * (float(a[33]) + r * (float(b[33]) - float(a[33])))
	param[37] = lv * (0.005493164 * float(ia[1]) + r * (0.005493164 * (float(ib[1]) - float(ia[1]))))
	param[38] = lv * (0.005493164 * float(ia[2]) + r * (0.005493164 * (float(ib[2]) - float(ia[2]))))
	param[39] = lv * (float(a[39]) + r * (float(b[39]) - float(a[39])))

# fmSetLipSyncParam (base = first viseme of the group in the model's PARAM table)
func _lip_sync(base: int) -> void:
	var s: Array = lp.top
	if lp.cnt >= lp.time:
		lp.cnt -= lp.time
		if lp.ptr >= s.size() or int(s[lp.ptr]) == 0xff:
			lp.cur = 0; lp.flag = 0
		else:
			lp.cur = int(s[lp.ptr]); lp.time = int(s[lp.ptr + 1]); lp.ptr += 2
			lp.next = 0 if lp.ptr >= s.size() or int(s[lp.ptr]) == 0xff else int(s[lp.ptr])
	var p1: Dictionary = face_lip[mini(base + lp.cur, face_lip.size() - 1)]
	if lp.time - lp.cnt < 10 and lp.flag:
		var p2: Dictionary = face_lip[mini(base + lp.next, face_lip.size() - 1)]
		var rate: float; var level: float
		if lp.time < 10:
			rate = float(lp.cnt) / maxf(lp.time, 1); level = lp.time / 10.0
		else:
			rate = (10 - (lp.time - lp.cnt)) / 10.0; level = 1.0
		_inter_lip(p1, p2, rate, level, LIP_MASK)
	else:
		_param_lip(p1, LIP_MASK)
	if lp.flag: lp.cnt += 2

# ---------------------------------------------------------------- fmCnkCalcFace
static func _bams(deg: float) -> float:
	return float(int(182.04445 * deg) & 0xFFFF) * BAMS

# _fmCnkSetJaw: the jaw hinge runs from vertex v0 to v1
func _set_jaw(v0: int, v1: int) -> void:
	if not _src.has(v0) or not _src.has(v1): return
	var p0: Vector3 = _src[v0]; var d: Vector3 = _src[v1] - p0
	var ry := float(int((65536.0 / TAU) * atan(d.y / d.x))) * BAMS
	var rz := float(int((65536.0 / TAU) * atan(d.z / sqrt(d.x * d.x + d.y * d.y)))) * BAMS
	_jmat1 = Transform3D(Basis(Vector3.UP, -rz) * Basis(Vector3.BACK, -ry), Vector3.ZERO) * Transform3D(Basis(), -p0)
	_jmat2 = Transform3D(Basis(), p0) * Transform3D(Basis(Vector3.BACK, ry) * Basis(Vector3.UP, rz), Vector3.ZERO)

func _calc_face() -> void:
	if param == _last_param: return
	_last_param = param.duplicate()
	var dst := {}
	# _fmCnkCalcMuscle: jaw vertices start from the source, listed vertices = source + weighted muscle vectors
	for j in D.jaw: dst[int(j[0])] = _src.get(int(j[0]), Vector3.ZERO)
	var con: Array = D.con
	var ci := 0
	for vl in D.vlist:
		var vid := int(vl[0]); var n := int(vl[1])
		var sum := 0.0; var acc := Vector3.ZERO
		for k in n:
			var c: Array = con[ci + k]
			var pa := param[int(c[0])]
			if pa != 0.0:
				var rate := float(c[4]) * absf(pa)
				sum += rate
				acc += Vector3(float(c[1]), float(c[2]), float(c[3])) * (pa * rate)
		ci += n
		var s: Vector3 = _src.get(vid, Vector3.ZERO)
		dst[vid] = s + acc / sum if sum != 0.0 else s
	# _fmCnkCalcJaw
	var jawang := -param[32]
	var jawtrans := param[33]
	if not D.jaw.is_empty():
		var tj := Transform3D(Basis(), Vector3(jawtrans, 0, 0))
		var m1 := _jmat2 * Transform3D(Basis(Vector3.RIGHT, _bams(jawang)), Vector3.ZERO) * tj * _jmat1
		for j in D.jaw:
			var jid := int(j[0]); var r := float(j[1])
			var m := m1 if r == 1.0 else _jmat2 * Transform3D(Basis(Vector3.RIGHT, _bams(jawang * r)), Vector3.ZERO) * tj * _jmat1
			dst[jid] = m * (dst[jid] as Vector3)
	# _fmCnkCalcTang: (x, y, z * tangz) rotated by X(tangx * rate) Y(tangy * rate)
	var tdst := {}
	for t in D.tang:
		var tid := int(t[0]); var r := float(t[1])
		var b := Basis(Vector3.RIGHT, _bams(param[37] * r)) * Basis(Vector3.UP, _bams(param[38] * r))
		var s: Vector3 = _tsrc.get(tid, Vector3.ZERO)
		tdst[tid] = b * Vector3(s.x, s.y, s.z * param[39])
	_write(dst, tdst)
	# teeth / tongue pivots follow the jaw angle (objP[7] / objP[11] ang[0]); eyeballs look along param.eye (_fmCnkCalcEye)
	var ja := _bams(jawang)
	if _bt >= 0: model.skel.set_bone_pose_rotation(_bt, Quaternion(Vector3.RIGHT, ja))
	if _bg >= 0: model.skel.set_bone_pose_rotation(_bg, Quaternion(Vector3.RIGHT, ja))
	var dx := param[34]; var dy := param[35]; var dz := param[36]
	var a0 := float(int(10430.381 * atan(dy / sqrt(dx * dx + dz * dz)))) if dx != 0.0 or dz != 0.0 else 0.0
	if _r3z >= 0: a0 = -a0
	var a1 := float(int(10430.381 * atan(dx / dz))) if dz != 0.0 else 0.0
	if dz >= 0: a1 += 32768.0
	for b in _be:
		if b >= 0: model.skel.set_bone_pose_rotation(b, (Basis(Vector3.UP, -a1 * BAMS) * Basis(Vector3.RIGHT, -a0 * BAMS)).get_rotation_quaternion())

# ---------------------------------------------------------------- mesh
func _setup_mesh() -> void:
	for mi in Assets.find_meshes(model):
		if mi.skin != null or mi.mesh != null:
			_mi = mi; break
	if _mi == null or _mi.mesh == null: return
	var sk := model.skel
	var S := 0.1
	var nd: Dictionary = D.nodes
	var fb := model.bone_index("b%02d" % int(nd.face)); var tb := model.bone_index("b%02d" % int(nd.tang))
	if fb < 0: return
	_face_x = sk.get_bone_global_rest(fb) * Transform3D(Basis.from_scale(Vector3.ONE * S), Vector3.ZERO)
	if tb >= 0: _tang_x = sk.get_bone_global_rest(tb) * Transform3D(Basis.from_scale(Vector3.ONE * S), Vector3.ZERO)
	# eyeball forward test of _fmCnkCalcEye: r3 = eyemat * (0, 0, -100)
	if not nd.eye.is_empty():
		var eb := model.bone_index("b%02d" % int(nd.eye[0]))
		if eb >= 0: _r3z = (sk.get_bone_global_rest(eb) * Transform3D(Basis.from_scale(Vector3.ONE * S), Vector3.ZERO) * Vector3(0, 0, -100)).z
	# grid of the deformable source vertices in bind space
	var grid := {}
	var Q := 0.001
	for vid in _src: _grid_add(grid, _face_x * (_src[vid] as Vector3), [vid, false], Q)
	for vid in _tsrc: _grid_add(grid, _tang_x * (_tsrc[vid] as Vector3), [vid, true], Q)
	var src_mesh := _mi.mesh
	var skin := _mi.skin
	# rigid head parts (teeth, tongue, eyeballs and the other model nodes under the head) are not part of the face model
	var rigid := {}
	for k in [nd.tooth, nd.tang] + nd.eye: rigid[model.bone_index("b%02d" % int(k))] = true
	for k in range(6, 11): rigid[model.bone_index("b%02d" % k)] = true
	_mesh = ArrayMesh.new()
	var overrides := []
	for s in src_mesh.get_surface_count():
		var arr := src_mesh.surface_get_arrays(s)
		var mat: Material = _mi.get_surface_override_material(s)
		overrides.append(mat if mat else src_mesh.surface_get_material(s))
		_mesh.add_surface_from_arrays(Mesh.PRIMITIVE_TRIANGLES, arr, [], {}, Mesh.ARRAY_FLAG_USE_DYNAMIC_UPDATE)
		_mesh.surface_set_material(s, src_mesh.surface_get_material(s))
		var verts := []
		var pos: PackedVector3Array = arr[Mesh.ARRAY_VERTEX]
		var bones: Variant = arr[Mesh.ARRAY_BONES]
		var weights: Variant = arr[Mesh.ARRAY_WEIGHTS]
		var nb := 8 if (src_mesh.surface_get_format(s) & Mesh.ARRAY_FLAG_USE_8_BONE_WEIGHTS) else 4
		for vi in pos.size():
			var hit: Variant = _grid_find(grid, pos[vi], Q, 1e-4)
			if hit == null: continue
			# the face model is the skinned body; the tongue is the rigid part on its own node
			var bone := -1
			if bones != null and bones.size() >= (vi + 1) * nb:
				var bw := -1.0
				for j in nb:
					var w: float = weights[vi * nb + j] if weights != null and weights.size() > vi * nb + j else (1.0 if j == 0 else 0.0)
					if w > bw: bw = w; bone = int(bones[vi * nb + j])
			if bone >= 0 and skin != null and bone < skin.get_bind_count():
				bone = skin.get_bind_bone(bone) if skin.get_bind_bone(bone) >= 0 else sk.find_bone(skin.get_bind_name(bone))
			if bool(hit[1]) != (bone == tb) or (not bool(hit[1]) and rigid.has(bone)): continue
			verts.append([vi, int(hit[0]), bool(hit[1])])
		var info := {"verts": verts}
		if not verts.is_empty():
			var sd := RenderingServer.mesh_get_surface(_mesh.get_rid(), s)
			var fmt: int = sd.format
			info.buf = sd.vertex_data
			info.stride = RenderingServer.mesh_surface_get_format_vertex_stride(fmt, pos.size())
			info.off = RenderingServer.mesh_surface_get_format_offset(fmt, pos.size(), Mesh.ARRAY_VERTEX)
		_surf.append(info)
	_mi.mesh = _mesh
	for s in overrides.size(): _mi.set_surface_override_material(s, overrides[s])

static func _grid_add(g: Dictionary, p: Vector3, v: Array, q: float) -> void:
	var k := Vector3i((p / q).floor())
	if not g.has(k): g[k] = []
	g[k].append([p, v])

static func _grid_find(g: Dictionary, p: Vector3, q: float, tol: float) -> Variant:
	var k := Vector3i((p / q).floor())
	var best: Variant = null; var bd := tol
	for dx in [-1, 0, 1]:
		for dy in [-1, 0, 1]:
			for dz in [-1, 0, 1]:
				var c: Variant = g.get(k + Vector3i(dx, dy, dz))
				if c == null: continue
				for e in c:
					var d := (e[0] as Vector3).distance_to(p)
					if d < bd: bd = d; best = e[1]
	return best

func _write(dst: Dictionary, tdst: Dictionary) -> void:
	for s in _surf.size():
		var info: Dictionary = _surf[s]
		if info.verts.is_empty(): continue
		var buf: PackedByteArray = info.buf
		var st: int = info.stride; var off: int = info.off
		var changed := false
		for v in info.verts:
			var p: Variant
			if v[2]:
				if not tdst.has(v[1]): continue
				p = _tang_x * (tdst[v[1]] as Vector3)
			else:
				if not dst.has(v[1]): continue
				p = _face_x * (dst[v[1]] as Vector3)
			var o: int = v[0] * st + off
			buf.encode_float(o, p.x); buf.encode_float(o + 4, p.y); buf.encode_float(o + 8, p.z)
			changed = true
		if changed:
			info.buf = buf
			RenderingServer.mesh_surface_update_vertex_region(_mesh.get_rid(), s, 0, buf)
