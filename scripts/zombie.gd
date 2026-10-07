class_name Zombie
extends EnemyModel
## Zombie (en01), port of en01.c / zonzon.c / Motion.c:
## - two motion works like the original: the body work (epw, objects b00-b07) and its linked upper-body work
##   (cepw = epw->exp1, b08-b17), each with its own mtn_no / frm_no / mtn_add / hokan (bhSetMotion, bhEne_ChgMtn);
##   mtn N of the bank en01ms = glb clip m<LOWER_SLOT index>, upper mtn 200+N = the b08-b17 tracks of the same clip,
##   the upper-only blocks 5 6 26 39 42 43 118 119 = clips u00-u07; mtn_md 2 = mirrored (en01_flipTree / flipTree2)
## - locomotion from the motions: en01_mtn_tbl foot lock (bhEne01_CheckMtnTbl -> bhCalcFixOffset), root translation
##   (EXP0 0x1000000 bhEne_GetTranslateMtn, 0x2000000 bhEne_GetTranslateMtn2 + bhAddSpeed)
## - Move (mode0 1): Brain00 / EneSearch / ActionModeCheck, MV00 idle, MV01 wander, MV02 approach, MV03 turn,
##   MV04 lie / get up, MV05 lunge, MV06 join a grab, MV07 turn round; Nage (mode0 2): NG00 bite / push-off / feed;
##   Damage (mode0 3): DG03 / DG04 falls; Die (mode0 4): DD00.
## Angles are BAMS (65536 = 360 deg) and distances original units (1 unit = 0.1 m) inside the AI.

const S := 0.1
const BAMS := TAU / 65536.0
const UPPER_ONLY := [5, 6, 26, 39, 42, 43, 118, 119]
const WALK_MTN := [0, 200, 40, 240, 41, 241]
const FLIP := [0, 1, 5, 6, 7, 2, 3, 4]
const FLIP2 := [0, 1, 2, 3, 7, 8, 9, 4, 5, 6]
const TREE := [[0, 1, 5, 6, 7], [0, 1, 2, 3, 4], [0, 1, 8, 9, 15, 16, 17], [0, 1, 8, 9, 12, 13, 14], [8, 9, 15, 16, 17], [8, 9, 12, 13, 14], [0, 1, 5, 6], [0, 1, 8, 9, 10]]
## en01_mtn_tbl: [mtn, [[type, s_frm, e_frm] x3]] foot lock ranges
const MTN_TBL := [[0, [[8, 0, 10], [7, 11, 43], [8, 44, 59]]], [40, [[8, 0, 7], [7, 8, 44], [8, 45, 59]]], [41, [[8, 0, 9], [7, 10, 46], [8, 47, 77]]], [31, [[8, 0, 9], [7, 10, 29], [8, 30, 43]]], [117, [[8, 0, 9], [7, 10, 29], [8, 30, 43]]], [125, [[8, 0, 12], [7, 13, 28], [8, 29, 35]]], [127, [[0, 0, 15], [8, 16, 26], [0, 27, 60]]], [2, [[1, 0, 69], [-1, 0, 0], [-1, 0, 0]]], [49, [[1, 0, 69], [-1, 0, 0], [-1, 0, 0]]], [11, [[7, 0, 14], [7, 15, 33], [-1, 0, 0]]], [12, [[1, 0, 16], [-1, 0, 0], [-1, 0, 0]]], [13, [[6, 0, 49], [1, 50, 80], [-1, 0, 0]]], [14, [[1, 38, 80], [-1, 0, 0], [-1, 0, 0]]], [52, [[0, 31, 44], [1, 45, 70], [-1, 0, 0]]], [55, [[1, 30, 65], [-1, 0, 0], [-1, 0, 0]]], [16, [[0, 0, 7], [8, 8, 18], [0, 19, 40]]], [17, [[1, 0, 11], [0, 12, 17], [1, 18, 39]]], [18, [[1, 0, 26], [-1, 0, 0], [-1, 0, 0]]], [19, [[1, 0, 37], [-1, 0, 0], [-1, 0, 0]]], [44, [[8, 0, 13], [7, 15, 23], [-1, 0, 0]]], [45, [[7, 3, 14], [8, 15, 28], [-1, 0, 0]]], [66, [[1, 0, 44], [-1, 0, 0], [-1, 0, 0]]], [7, [[0, 0, 17], [-1, 0, 0], [-1, 0, 0]]], [96, [[7, 0, 15], [-1, 0, 0], [-1, 0, 0]]], [10, [[0, 0, 38], [-1, 0, 0], [-1, 0, 0]]]]
## MV01 stp_tbl: stop windows of the three walks
const STP_TBL := [[13, 33], [42, 59], [10, 30], [45, 59], [10, 40], [43, 77]]
## en01_PersonalType [adist, ndist, ang, add_hp, add_atk] and ene01_typ_tbl (mdlver -> type)
const PERSONAL := [[30, 70, 14563, 0, 0], [30, 50, 10922, 0, 5], [30, 70, 14563, 10, 10], [50, 100, 14563, 10, 5], [50, 90, 10922, 10, 8], [40, 80, 10922, 40, 10], [50, 100, 14563, 10, 5], [50, 90, 10922, 10, 8], [40, 80, 10922, 40, 10], [40, 80, 10922, 20, 10], [30, 70, 14563, 0, 0], [30, 50, 10922, 0, 0], [30, 70, 14563, 30, 5], [30, 50, 10922, 30, 5], [30, 70, 14563, 0, 5], [40, 90, 14563, 20, 10], [40, 80, 10922, 20, 10], [40, 90, 14563, 40, 10], [40, 80, 10922, 50, 10], [20, 50, 14563, -20, 0], [20, 50, 10922, -30, 0], [30, 70, 14563, 0, 0], [20, 50, 10922, 30, 0], [30, 70, 14563, 50, 10], [30, 70, 14563, 0, 10], [30, 70, 14563, 20, 10], [20, 50, 10922, 30, 0]]
const TYP_TBL := {0: 0, 1: 1, 31: 2, 18: 0, 2: 3, 3: 4, 4: 5, 32: 6, 33: 7, 34: 8, 21: 9, 19: 3, 5: 10, 6: 11, 35: 12, 36: 13, 22: 14, 20: 10, 7: 15, 8: 16, 37: 17, 38: 18, 24: 15, 9: 19, 10: 20, 25: 21, 39: 22, 40: 23, 41: 24, 42: 25, 43: 26}
const STUP_TIMER := [15, 30, 45, 60, 90]
## SetMtn rot_tbl: upper-body twist of a handgun hit (nm_act 0)
const ROT_TBL := [[0x800, 0xA00, 0x1000, 0xE00, 0xC00, 0x800, 0x400, 0x200], [-0x800, -0xA00, -0x1000, -0xE00, -0xC00, -0x800, -0x400, -0x200]]

## the motion part of one BH_PWORK
class Mw:
	var no := -1
	var frm := 0          # frm_no, 16.16 frames
	var add := 0x10000    # mtn_add
	var hokan := 0        # hokan_count
	var md := 0           # mtn_md (2 = mirrored)
	var anim: Animation = null
	var nf := 1           # frm_num
	var tr := {}          # object -> [position track, rotation track]
	var x40 := 0          # EXP0_I(0x40) bits 0x1000000 / 0x2000000 of this work

var index := 0
var mdlver := 0
## ENEMY type (bhEne01_InitType10 / type 10 clears the mouth morph flag EXP0_I(0x40) 0x10000000)
var etype := 0
var hp := 8.0
var heading := 0.0:
	set(v): heading = v; _ay = int(roundf(v / BAMS)) & 0xFFFF
	get: return heading
var lo := Mw.new()
var up := Mw.new()
var mode0 := 1
var mode1 := 0
var mode2 := 0
var mode3 := 0
var ct0 := 0
var ct1 := 0
var ct2 := 0
var ct3 := 0
var way := 0
var ayp := 0
var _ay := 0
var flg := 0          # epw->flg: 0x40000 foot lock, 0x80000 idle foot, 0x2000000 motion wrapped
var x40 := 0          # EXP0_I(0x40): 0x400 sees Claire, 0x2000 hit from behind, 0x8000000 hit twist, 0x20000000 blocked
var x44 := 0
var x94 := 0
var x98 := 0
var x2f := 0
var x28 := 0
var x29 := 0
var x2c := 0
var walk_a := 0       # EXP0_I(0xA0)
var ptype := 0        # EXP0_I(0x4C)
var spd := 0.0
var _tx := 0.0        # EXP0_F(0x58) / (0x60): the walking target
var _tz := 0.0
var _dist := 0.0      # EXP0_F(0x54)
var _bite := false
var _lying := false
var _hit := false
## object poses (b00-b17): position / rotation now and the world transforms of the last frame (owP)
var _P: Array[Vector3] = []
var _Q: Array[Quaternion] = []
var _rest_P: Array[Vector3] = []
var _rest_Q: Array[Quaternion] = []
var _bi: Array[int] = []
var _skel_rel := Transform3D.IDENTITY
var _prevW: Array[Transform3D] = []
var _acc := 0.0
var _room: Room = null
var _pl := Vector3.ZERO
var _free := true
static var _track_cache := {}

## glb clip state names kept for the room scripts / Claire's grab code
var state: String:
	get:
		if mode0 == 4: return "dead"
		if mode0 == 2: return "bite" if mode3 <= 2 else ("eat" if mode3 >= 6 else "release")
		if _lying: return "lying"
		if mode0 == 1 and mode2 == 4: return "rise"
		return "walk"

func _init(i := 0) -> void:
	index = i

func init(file: String, x: float, y: float, z: float, h: float, lying: bool) -> Zombie:
	load_model(file)
	if ap: ap.stop()
	ptype = TYP_TBL.get(mdlver, 0)
	for k in 18:
		var bi := bone_index("b%02d" % k)
		_bi.append(bi)
		var rp := skel.get_bone_rest(bi).origin if bi >= 0 else Vector3.ZERO
		var rq := skel.get_bone_rest(bi).basis.get_rotation_quaternion() if bi >= 0 else Quaternion.IDENTITY
		_rest_P.append(rp); _rest_Q.append(rq); _P.append(rp); _Q.append(rq)
	var n: Node = skel
	while n != null and n != self:
		if n is Node3D: _skel_rel = (n as Node3D).transform * _skel_rel
		n = n.get_parent()
	if not mdlver in [0x12, 0x13, 0x14, 0x18]: _setup_morph(file)
	position = Vector3(x, y, z); heading = h; rotation.y = h
	# bhEne01_InitType00: mode 1/0/0/0, bhEne01_GetWalkMotion, mtn 2 / 202
	walk_a = (randi() % 3) * 2
	mode0 = 1; mode1 = 0; mode2 = 0; mode3 = 0
	x40 = 1
	if lying:
		# graveyard zombies (type 0 in rm_002x) lie until Claire comes near, then get up (MV04 mtn 13)
		_lying = true; mode2 = 4; mode3 = 10; x40 |= 0x40000
		_chg(lo, 3, 0, 0); _chg(up, 203, 0, 0); lo.add = 0; up.add = 0
	else:
		_chg(lo, 2, 0, 0); _chg(up, 202, 0, 0)
	_set_mtn(true)
	_apply_pose()
	_save_world()
	_update_morph()
	return self

var hittable: bool:
	get: return mode0 != 4 and not _lying and not (mode0 == 3 and mode2 >= 3)
var alive: bool:
	get: return hp > 0 and mode0 != 4

## kept for the game code: "walk" (bite without a grab), "release" (Claire shook it off), "eat" (Claire died)
func set_state(s: String) -> void:
	match s:
		"walk", "idle":
			mode0 = 1; mode1 = 1; mode2 = 1; mode3 = 0
			x40 &= ~0xA4080; pl_state = ""
		"release":
			_ng_release()
		"eat":
			_ng_eat()
		"bite":
			mode0 = 2; mode1 = 0; mode2 = 0; mode3 = 0
			x40 |= 0x80; pl_state = "held"; _pm3 = 0

func forward() -> Vector3:
	return Vector3(-sin(heading), 0, -cos(heading))

# ---------------------------------------------------------------- motion system

func _clip(no: int) -> Animation:
	var n := no - 200 if no >= 200 else no
	var nm := ""
	var k := LOWER_SLOT.find(n)
	if k >= 0: nm = "m%02d" % k
	else:
		var u := UPPER_ONLY.find(n)
		if u >= 0: nm = "u%02d" % u
	return ap.get_animation(nm) if nm != "" and ap != null and ap.has_animation(nm) else null

## bhEne_ChgMtn
func _chg(w: Mw, no: int, frm: int, rate: int) -> int:
	w.add = 0x10000
	if w.no == no: return -1
	w.no = no; w.frm = frm; w.hokan = rate; w.md = 0x20
	w.anim = _clip(no)
	w.nf = int(roundf(w.anim.length * 30.0)) + 1 if w.anim else 1
	w.tr = _tracks(w.anim)
	if w == lo: flg &= ~0x40000; flg &= ~0x2000000
	return 0

func _tracks(a: Animation) -> Dictionary:
	if a == null: return {}
	var key := a.get_instance_id()
	if _track_cache.has(key): return _track_cache[key]
	var d := {}
	for ti in a.get_track_count():
		var path := str(a.track_get_path(ti))
		var c := path.rfind(":b")
		if c < 0: continue
		var o := path.substr(c + 2).to_int()
		if not d.has(o): d[o] = [-1, -1]
		if a.track_get_type(ti) == Animation.TYPE_POSITION_3D: d[o][0] = ti
		elif a.track_get_type(ti) == Animation.TYPE_ROTATION_3D: d[o][1] = ti
	_track_cache[key] = d
	return d

func _key_pos(w: Mw, o: int, f: int) -> Vector3:
	var t: Array = w.tr.get(o, [-1, -1])
	return w.anim.position_track_interpolate(t[0], f / 30.0) if t[0] >= 0 else _rest_P[o]

## bhSetMotion (SetMtnFast / SetMtnFastHokan): the frame's keys -> object poses, then frm_no += mtn_add
func _set_motion(w: Mw, first: int, count: int, flip: Array) -> int:
	if w.anim == null: return 0
	var f := w.frm >> 16
	var t := f / 30.0
	var rate := 1.0 / w.hokan if w.hokan > 0 else 1.0
	var mir := (w.md & 2) != 0
	for i in count:
		var o := first + i
		var dst := first + (int(flip[i]) if mir else i)
		var tk: Array = w.tr.get(o, [-1, -1])
		var q: Quaternion = w.anim.rotation_track_interpolate(tk[1], t) if tk[1] >= 0 else _rest_Q[o]
		if mir: q = Quaternion(q.x, -q.y, -q.z, q.w)
		_Q[dst] = _Q[dst].slerp(q, rate) if w.hokan > 0 else q
		# only the first object takes its position from the motion
		if i == 0:
			var p: Vector3 = w.anim.position_track_interpolate(tk[0], t) if tk[0] >= 0 else _rest_P[o]
			if mir: p.x = -p.x
			_P[dst] = _P[dst].lerp(p, rate) if w.hokan > 0 else p
	if w.hokan > 0: w.hokan -= 1
	var nf := w.nf << 16
	w.frm += w.add
	if w.frm < 0:
		while w.frm < 0: w.frm += nf
		return -1
	if w.frm >= nf:
		while w.frm >= nf: w.frm -= nf
		return 1
	return 0

## bhEne01_SetMtn for the body work and the linked upper-body work
func _set_mtn(first := false) -> void:
	var frm := lo.frm >> 16
	var moving := lo.add != 0
	var ret := _set_motion(lo, 0, 8, FLIP)
	if lo.x40 & 0x1000000:
		_P[0].x = _rest_P[0].x; _P[0].z = _rest_P[0].z
		_translate(frm, moving)
	elif lo.x40 & 0x2000000:
		_P[0].x = _rest_P[0].x; _P[0].z = _rest_P[0].z
		_translate2(frm, moving)
		if (lo.no == 1 or lo.no == 32) and spd > 0.05: _ikou(_tx, _tz, 256)
		_add_speed(0)
	if ret != 0: flg |= 0x2000000
	else: flg &= ~0x2000000
	_set_motion(up, 8, 10, FLIP2)
	if up.x40 & 0x2000000: _P[8].x = _rest_P[8].x; _P[8].z = _rest_P[8].z
	# handgun hit: the upper body twists for 8 frames
	if x40 & 0x8000000:
		var e := Basis(_Q[8]).get_euler(EULER_ORDER_ZYX)
		var r0: int = ROT_TBL[0 if x40 & 0x2000 else 1][x2c]
		var r1: int = ROT_TBL[0 if (x40 & 0x2000) == (x44 & 0x20) * 0x100 else 1][x2c]
		_Q[8] = Basis.from_euler(Vector3(r0 * BAMS, r1 * BAMS, e.z), EULER_ORDER_ZYX).get_rotation_quaternion()
		x2c += 1
		if x2c >= 8: x40 &= ~0x8000000; x2c = 0
	if not first: _check_mtn_tbl(frm)

## bhEne_GetTranslateMtn: px += R(ay) * (key[frm] - key[frm - 1]) (y ignored)
func _translate(frm: int, moving: bool) -> void:
	if not moving and (lo.frm >> 16) == frm: return
	var k := _key_pos(lo, 0, frm) - (_key_pos(lo, 0, frm - 1) if frm > 0 else Vector3.ZERO)
	k.y = 0
	position += Basis(Vector3.UP, _ay * BAMS) * k

## bhEne_GetTranslateMtn2: spd = |key[frm] - key[frm - 1]| (horizontal)
func _translate2(frm: int, moving: bool) -> void:
	if not moving and (lo.frm >> 16) == frm: return
	var k := _key_pos(lo, 0, frm) - (_key_pos(lo, 0, frm - 1) if frm > 0 else Vector3.ZERO)
	k.y = 0
	spd = k.length() / S

## bhAddSpeed
func _add_speed(r: int) -> void:
	var a := ((_ay + r) & 0xFFFF) * BAMS
	position.x -= spd * S * sin(a); position.z -= spd * S * cos(a)

## world transform of the model space (px, ay)
func _model_xf() -> Transform3D:
	return Transform3D(Basis(Vector3.UP, _ay * BAMS), position) * _skel_rel

func _chain(tree: Array, P: Array, Q: Array) -> Transform3D:
	var m := Transform3D.IDENTITY
	for o in tree: m = m * Transform3D(Basis(Q[o]), P[o])
	return m

## bhCalcFixOffset: keep the given point of the last object of the chain where it was last frame
func _fix(tree_i: int, off: Vector3, k := 1.0) -> void:
	var tree: Array = TREE[tree_i]
	var dst := _model_xf() * _chain(tree, _P, _Q) * off
	var src: Vector3 = _prevW[tree[-1]] * off
	position.x -= (dst.x - src.x) * k; position.z -= (dst.z - src.z) * k

## bhEne01_CheckMtnTbl: en01_mtn_tbl foot lock
func _check_mtn_tbl(frm: int) -> void:
	if not (flg & 0x40000): return
	var v2 := Vector3(0, -1.0, -1.9) * S
	if lo.no == 2:
		_fix(0 if flg & 0x80000 else 1, Vector3.ZERO); return
	var mir := (lo.md & 2) != 0
	for e in MTN_TBL:
		if e[0] != lo.no: continue
		for fm in e[1]:
			if fm[0] == -1 or frm < fm[1] or frm > fm[2]: continue
			match int(fm[0]):
				0: _fix(1 if mir else 0, Vector3.ZERO)
				1: _fix(0 if mir else 1, Vector3.ZERO)
				6: _fix(6, Vector3.ZERO)
				7: _fix(1 if mir else 0, v2, 1.2 if lo.no == 125 else 1.0)
				8: _fix(0 if mir else 1, v2, 1.2 if lo.no == 125 else 1.0)
			break

## bhEne01_CalcEnemy: the world matrices of this frame (owP) for the next frame's foot lock
func _save_world() -> void:
	var M := _model_xf()
	_prevW.resize(18)
	var G: Array[Transform3D] = []
	G.resize(18)
	for o in 18:
		var bi := _bi[o]
		var par := skel.get_bone_parent(bi) if bi >= 0 else -1
		var po := _bi.find(par)
		var l := Transform3D(Basis(_Q[o]), _P[o])
		G[o] = (G[po] * l) if po >= 0 and po < o else l
		_prevW[o] = M * G[o]

func _apply_pose() -> void:
	rotation.y = _ay * BAMS
	if heading != rotation.y: heading = rotation.y
	for o in 18:
		var bi := _bi[o]
		if bi < 0: continue
		skel.set_bone_pose_position(bi, _P[o]); skel.set_bone_pose_rotation(bi, _Q[o])

# ---------------------------------------------------------------- helpers of the AI

func _rnd(n: int) -> int: return randi() % n

## NitenDir_ck
func _dir(hx: float, hz: float, tx: float, tz: float) -> int:
	return int(atan2(hx - tx, hz - tz) * 10430.381)

## ikou: turn towards a point by add_dir
func _ikou(tx: float, tz: float, add_dir: int) -> void:
	var ang := _dir(position.x, position.z, tx, tz)
	if add_dir < 0:
		add_dir = -add_dir; ang = (ang + 0x8000) & 0xFFFF
	var rot := (add_dir + (ang - _ay)) & 0xFFFF
	if rot < add_dir + add_dir: _ay = ang & 0xFFFF
	else:
		_ay -= add_dir
		if rot <= 0x8000: _ay += add_dir + add_dir
	_ay &= 0xFFFF

## ikou3: 0 when the point is within +-add_dir, else the turn step
func _ikou3(tx: float, tz: float, add_dir: int) -> int:
	var rot := (add_dir + (_dir(position.x, position.z, tx, tz) - _ay)) & 0xFFFF
	if rot < add_dir + add_dir: return 0
	return add_dir if rot < 0x8001 else -add_dir

## bhCdirCheck
static func _cdir(a: int, b: int) -> int:
	return 1 if (((a - b) + 0x4000) & 0xFFFF) < 0x8000 else 0

## bhSearchPlayer2: Claire within +-r of direction dir seen from p
func _search(p: Vector3, dir: int, r: int) -> bool:
	if r == 0: r = 32768
	var a := dir * BAMS
	var f := Vector3(-sin(a), 0, -cos(a))
	var v := (p - _pl).normalized()
	return f.dot(v) < -cos(r * BAMS)

## world position of an object (this frame's pose)
func _obj_pos(o: int) -> Vector3:
	return _prevW[o].origin if o < _prevW.size() else position

## bhEne01_EatCheck mode 0: Claire's chest (owP[3]) against the zombie's head (owP[10]) within dist and +-rng
func _eat_check(rng: int, dist: float) -> bool:
	if x40 & 0x20000000 or not _free: return false
	var e := _obj_pos(10); e.y = _pl.y
	var ps := Vector3(_pl.x, _pl.y, _pl.z)
	if not _search(e, _ay, rng): return false
	return Vector2(ps.x - e.x, ps.z - e.z).length() / S < dist

## bhEne_CheckDirWall: a collision wall within len (units) ahead (the line is marched against the room's shapes)
func _dir_wall(len_: float) -> bool:
	if _room == null: return false
	var f := Vector3(-sin(_ay * BAMS), 0, -cos(_ay * BAMS))
	var n := int(ceil(len_ * S / 0.05))
	for i in range(1, n + 1):
		var q := position + f * (len_ * S * i / n)
		if _room.resolve(q, 0.02).distance_to(q) > 0.001: return true
	return false


# ---------------------------------------------------------------- frame loop

## mtn_no (bank slot) of glb clip mNN: the converter numbered the 8-object (lower body) blocks of en01ms in bank order
const LOWER_SLOT := [0, 1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 24, 25, 27, 28, 31, 32, 33, 34, 35, 36, 37, 38, 40, 41, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 75, 76, 85, 86, 95, 96, 97, 98, 99, 100, 110, 111, 116, 117, 120, 121, 122, 123, 124, 125, 127, 129, 130, 131, 132, 133, 150, 151, 152, 153]
## en01.c mouth morph curves (shp_ct per motion frame, 0..1000)
const KAMIKAMI := [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200, 400, 600, 800, 1000, 1000, 1000, 1000, 900, 800, 700, 600, 500, 300, 150, 0, 250, 500, 250, 500, 250, 500, 250, 0, 500, 250, 0, 250, 500, 250, 0, 500, 500, 500, 500, 500, 250, 0, 0, 250, 500, 1000, 1000, 1000, 750, 750, 500, 500, 250, 0, 250, 0, 250, 500, 250, 0, 250, 500, 250, 500, 500]
const KAMIKAMI2 := [0, 0, 0, 0, 0, 0, 0, 200, 400, 600, 800, 1000, 1000, 1000, 1000, 1000, 1000, 900, 800, 700, 600, 500, 300, 150, 0, 250, 500, 250, 500, 250, 500, 250, 0, 500, 250, 0, 250, 500, 250, 0, 500, 500, 500, 500, 500, 250, 0, 0, 250, 500, 1000, 1000, 1000, 750, 750, 500, 500, 250, 0, 250, 0, 250, 500, 250, 0, 250, 500, 250, 500, 250]
const MOGMOG := [100, 200, 300, 400, 500, 400, 300, 200, 100, 0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
## graveyard zombies get up when Claire comes this close (units; not from the original, see HANDOFF)
const RISE_DIST := 32.0

static var _morph_cache := {}
static var _all: Array = []
var _morph_mi: MeshInstance3D = null
var _scripted := false
var _hit_flg := false

## one rendered frame: the original runs at 30 Hz; returns true when the zombie grabbed Claire this frame
func tick(dt: float, target: Vector3, target_free: bool, room: Room) -> bool:
	_room = room; _pl = target; _free = target_free
	if _scripted: _resume_ai()
	if not _all.has(self): _all.append(self)
	_acc += dt
	var grabbed := false
	var n := 0
	while _acc >= 1.0 / 30.0 and n < 4:
		_acc -= 1.0 / 30.0; n += 1
		if _frame(): grabbed = true
	if n > 0:
		_apply_pose(); _update_morph()
	return grabbed

## bhEne01: DmgCheck (in hit()), MainLoop (Mode0 + SetMtn), counters, CollCheck, CalcEnemy
func _frame() -> bool:
	_dist = Vector2(_pl.x - position.x, _pl.z - position.z).length() / S
	var grabbed := false
	match mode0:
		1: grabbed = _move()
		2: _nage()
		3: _damage()
		4: _die()
	if (x40 & 0x20000) and pl_state == "held": _player_control()
	_set_mtn()
	flg &= ~4
	if x2f > 0: x2f -= 1
	if _room != null:
		if mode0 != 4 and not (x40 & 0x80000): position = _room.resolve(position, 0.25)
		var y: Variant = _room.floor_at(position.x, position.z, position.y)
		if y != null and absf(y - position.y) < 0.5: position.y = y
	if x40 & 0x80000: _player_link()
	_save_world()
	return grabbed

## back from a script (room motion on the AnimationPlayer): take over the pose and the root placement
func _resume_ai() -> void:
	_scripted = false
	if ap: ap.stop(true)
	var b0 := _bi[0]
	if b0 >= 0:
		var w := (skel.global_transform * skel.get_bone_global_pose(b0)).origin
		position.x = w.x; position.z = w.z
	for o in 18:
		var bi := _bi[o]
		if bi < 0: continue
		_P[o] = skel.get_bone_pose_position(bi); _Q[o] = skel.get_bone_pose_rotation(bi)
	_P[0].x = _rest_P[0].x; _P[0].z = _rest_P[0].z
	lo.no = -1; up.no = -1
	mode0 = 1; mode1 = 0; mode2 = 0; mode3 = 0; _lying = false
	_chg(lo, 2, 0, 0); _chg(up, 202, 0, 0)
	_save_world()

## scripted zombies (event MOTION / room motions) are played by the game on the AnimationPlayer
func update(dt: float) -> void:
	_scripted = true
	super.update(dt)
	_update_morph()

# ---------------------------------------------------------------- Move (mode0 1)

## bhEne01_MVType00
func _move() -> bool:
	# bhEne_EnemyAtariCheck: another enemy already has Claire
	if not _free: x40 |= 0x20000000
	else: x40 &= ~0x20000000
	if mode1 == 1: _brain()
	if _action_check(): return true
	if mode0 != 1: return false
	match mode2:
		0: _mv00()
		1: _mv01()
		2: _mv02()
		3: _mv03()
		4: _mv04()
		5: return _mv05()
		6: return _mv06()
		7: _mv07()
		_: mode2 = 1; mode3 = 0
	return false

## bhEne01_EneSearch: Claire in the field of view (en01_PersonalType ang) of the neck, kept 15 frames
func _ene_search() -> void:
	if (x28 & 0x1F) < 31:
		if _search(_obj_pos(11) * Vector3(1, 0, 1), _ay, PERSONAL[ptype][2]): x28 |= 0x20
		if x28 & 0x20:
			x28 |= 0x40; x28 &= ~0x20
		elif (x28 & 0x1F) == 30:
			x28 &= ~0x40
	x28 = (x28 + 1) & 0xFF
	if (x28 & 0x1F) >= 31: x28 &= ~0x1F
	if x28 & 0x40:
		x40 |= 0x400; x29 = 15
	# (the unsigned EXP0_UC(0x29) never gets below 0: 0x400 stays until MV00 clears it)

## bhEne01_Brain00: the target is Claire (the route tables bhCheckRoute are not ported)
func _brain() -> void:
	_ene_search()
	if x40 & 0x400:
		_tx = _pl.x; _tz = _pl.z

## bhEne01_ActionModeCheck (mode2 0..2 = idle / wander / approach)
func _action_check() -> bool:
	var walking := mode2 <= 2
	if not _free:
		# Claire is held by another enemy: join in (MV06)
		if _search(position, _ay, 5461) and _dist < 7.0 and walking and _pl_hp_ok():
			mode1 = 0; mode2 = 6; mode3 = 0
		return false
	if walking:
		if _eat_check(8192, 5.5) and x2f == 0 and (lo.no == 117 or lo.no == 125):
			mode0 = 2; mode1 = 0; mode2 = 0; mode3 = 0
			x40 |= 0x80; pl_state = "held"; _pm3 = 0
			return true
		if _dist < 11.0 and _ikou3(_pl.x, _pl.z, 16384) != 0 and not (x40 & 0x20000000):
			mode1 = 0; mode2 = 3; mode3 = 0
			return false
		if _hit_flg and _dist > 15.0 and _ikou3(_pl.x, _pl.z, 24576) != 0:
			mode1 = 0; mode2 = 7; mode3 = 0
	_hit_flg = false
	return false

func _pl_hp_ok() -> bool: return true

func _mv00() -> void:
	if mode3 == 0:
		var f := _rnd(maxi(lo.nf, 1)) << 16
		_chg(lo, 2, 0, 15); lo.x40 &= ~0x3000000; lo.frm = f
		_chg(up, 202, 0, 15); up.x40 &= ~0x3000000; up.frm = lo.frm
		flg |= 0x40000
		ct0 = _rnd(10) * 20 + 15
		x40 &= ~0x400; x40 &= ~0xF; x40 |= 1
		mode1 = 1
		ct3 = _rnd(110) + 10
		mode3 = 1
	if mode3 == 1:
		ct0 -= 1
		if ct0 <= 0 or (x40 & 0x400):
			mode1 = 1; mode2 = 1; mode3 = 0

func _mv01() -> void:
	if mode3 == 0:
		_chg(lo, WALK_MTN[walk_a], 0, 8); lo.x40 &= ~0x3000000
		_chg(up, WALK_MTN[walk_a + 1], 0, 8); up.x40 &= ~0x3000000
		way = 0x100
		flg |= 0x40000
		ct0 = _rnd(128) + 200; ct1 = 0; ct3 = _rnd(120)
		_tx = _pl.x; _tz = _pl.z
		mode3 = 1
	match mode3:
		1:
			if _dist < PERSONAL[ptype][0] and (x40 & 0x400):
				mode1 = 1; mode2 = 2; mode3 = 0
			elif _dist <= 15.0:
				mode3 = 3; ct0 = _rnd(64) + 100
			elif _dir_wall(6.0):
				# bhEne_CheckSideWall is not ported: turn the way Claire is
				ayp = (_dir(position.x, position.z, _pl.x, _pl.z) - _ay) & 0xFFFF
				way = 256 if ayp <= 0x8000 else -256
				mode3 = 2
			else:
				ct0 -= 1
				if ct0 < 0:
					var f := lo.frm >> 16
					var a: Array = STP_TBL[walk_a]; var b: Array = STP_TBL[walk_a + 1]
					if f >= a[0] and f <= a[1]:
						flg |= 0x80000; mode1 = 0; mode2 = 0; mode3 = 0
					elif f >= b[0] and f <= b[1]:
						flg &= ~0x80000; mode1 = 0; mode2 = 0; mode3 = 0
		2:
			if not _dir_wall(6.0): mode3 = 1
			else: _ay = (_ay + way) & 0xFFFF
		3:
			_tx = _pl.x; _tz = _pl.z
			_ikou(_tx, _tz, way)
			ct0 -= 1
			if ct0 < 0:
				mode3 = 1; ct0 = _rnd(128) + 200

## bhEne01_FastWalkCheck: only one zombie at a time takes the fast walk 125
func _fast_walk() -> bool:
	for z in _all:
		if is_instance_valid(z) and z != self and z.is_inside_tree() and z.alive and (z.x44 & 0x80): return true
	return false

func _mv02() -> void:
	if mode3 == 0:
		_chg(lo, WALK_MTN[walk_a], 0, 8); lo.x40 &= ~0x3000000
		_chg(up, WALK_MTN[walk_a + 1], 0, 8); up.x40 &= ~0x3000000
		way = 256
		flg |= 0x40000
		ct0 = 0; ct1 = 0; ct2 = _rnd(120) + 120
		x94 = 0; x98 = 0
		ct3 = _rnd(120)
		x44 &= ~0x80
		x40 &= ~0xF; x40 |= 2
		mode3 = 1
	if mode3 == 1:
		if not (x44 & 0x80) and _dist >= 15.0:
			if _rnd(3) != 0:
				_ikou(_tx, _tz, way)
				ct1 += 1
				if ct1 > ct2 and ct1 < ct2 + 30: _ikou(_tx, _tz, way * -2)
				if ct1 > ct2 + 30:
					ct2 = _rnd(120) + 120; ct1 = 0
		else:
			_ikou(_tx, _tz, way)
		if x98 == 0:
			if x94 == 0:
				if (((x44 & 2) and _dist <= 25.0) or (not (x44 & 2) and _dist <= 20.0)) and _ikou3(_pl.x, _pl.z, 16384) == 0:
					x44 &= ~0x80
					ct3 = _rnd(120) + 180
					_chg_walk()
					x2f = 5
					way = 512
					ct0 = _rnd(60) + 30
					x94 = 1; x98 = 18
			elif x94 == 1:
				if x98 == 0 and _rnd(10) == 1 and (flg & 0x2000000) and lo.no == 117 and not _fast_walk():
					x44 |= 0x80
					_chg(lo, 125, 0, 3); lo.x40 &= ~0x3000000
					_chg(up, 325, 0, 3); up.x40 &= ~0x3000000
					flg |= 0x40000
				if ((x44 & 2) and _dist > 30.0) or (not (x44 & 2) and _dist > 25.0):
					ct0 -= 1
					if ct0 < 0:
						_chg_walk()
						way = 256; flg |= 0x40000
						x44 &= ~0x80; x94 = 0; x98 = 18
		var stay: bool = _dist <= PERSONAL[ptype][1] and (x40 & 0x400) != 0
		if not stay and (flg & 0x2000000):
			mode2 = 1; mode3 = 0
	elif mode3 == 2:
		if not _dir_wall(6.0): mode3 = 1
		else: _ay = (_ay + way) & 0xFFFF
	if x98 > 0:
		x98 -= 1
		if x98 == 0: _chg_walk()

## bhGetFrameNum (as compiled: the 16.16 result is clamped against the frame count)
static func _frame_num(nf_old: int, nf_new: int, frm: int) -> int:
	var f := int(nf_new * ((100.0 / nf_old) * (frm >> 16)) / 100.0) * 65536
	return clampi(f, 0, nf_new)

## bhEne01_ChgWalkMtn: walk <-> arms-out walk (117 / 125 with the upper 118 / 119)
func _chg_walk() -> void:
	var m1: int; var m2: int
	if lo.no == 117:
		if up.no == 317: m1 = WALK_MTN[walk_a]; m2 = 119
		else: m1 = 117; m2 = 317
	elif lo.no == 125:
		if up.no == 325: m1 = WALK_MTN[walk_a]; m2 = 119
		else: m1 = 125; m2 = 325
	elif up.no in [200, 240, 241]:
		m1 = 125 if x44 & 0x80 else 117
		m2 = 118
	else:
		m1 = WALK_MTN[walk_a]; m2 = WALK_MTN[walk_a + 1]
	var nf_new := _nf_of(m1)
	var frm := _frame_num(lo.nf, nf_new, lo.frm) * 65536
	_chg(lo, m1, frm, 20); lo.x40 &= ~0x3000000
	if m2 == 118 or m2 == 119: _chg(up, m2, 0, 10)
	else: _chg(up, m2, lo.frm, 10)
	up.x40 &= ~0x3000000
	flg |= 0x40000

func _nf_of(no: int) -> int:
	var a := _clip(no)
	return int(roundf(a.length * 30.0)) + 1 if a else 1

func _mv03() -> void:
	if mode3 == 0:
		_chg(lo, 44, 0, 8); lo.x40 &= ~0x3000000; lo.add = 0
		_chg(up, 244, 0, 8); up.x40 &= ~0x3000000; up.add = 0
		ct0 = 6
		mode3 = 1
	var rot := _ikou3(_pl.x, _pl.z, 4096)
	ct0 -= 1
	if ct0 <= 0 or rot == 0:
		mode1 = 0; mode2 = 5; mode3 = 0
	_ay = (_ay + rot) & 0xFFFF

## bhEne01_MV04: lying after a fall, getting up (13 / 14 / 15); graveyard zombies (mode3 10) wait in the ground
func _mv04() -> void:
	if mode3 == 10:
		if _dist < RISE_DIST:
			_lying = false
			_chg(lo, 13, 0, 0); lo.x40 &= ~0x3000000
			_chg(up, 213, 0, 0); up.x40 &= ~0x3000000
			flg |= 0x40000
			ct1 = _rnd(10) + 10
			mode3 = 2
		return
	if mode3 == 0:
		x40 |= 0x40000; x44 |= 0x8
		if hp <= 0:
			mode0 = 4; mode2 = 0; mode3 = 0
			if lo.no in [11, 130, 25, 96]: mode1 = 0
			elif lo.no in [12, 116, 129, 28, 95]: mode1 = 1
			elif lo.no in [13, 27]: mode1 = 2
			return
		var m1 := 15; var m2 := 215
		if lo.no in [12, 116, 129, 28, 95]: m1 = 14; m2 = 214
		elif lo.no in [13, 27]: m1 = 13; m2 = 213
		ct0 = _rnd(15) + STUP_TIMER[_rnd(5)]
		_chg(lo, m1, 0, 8); lo.x40 &= ~0x3000000; lo.add = 0
		flg |= 0x40000
		_chg(up, m2, 0, 8); up.x40 &= ~0x3000000; up.add = 0
		mode3 = 1
	match mode3:
		1:
			ct0 -= 1
			if ct0 < 0 or (x40 & 0x200000):
				lo.add = 0x10000; up.add = 0x10000
				# (the crawler change of mtn 15 with hp < 15 is not ported: hit points are not the original's)
				if lo.no == 15: mode3 = 3
				else: mode3 = 2
				ct1 = _rnd(10) + 10
				ct0 = 0
		2:
			var f := lo.frm >> 16
			if (lo.no == 13 or lo.no == 14) and f == 73:
				lo.add = 0
				mode0 = 1; mode1 = 1; mode2 = 1; mode3 = 0
				x40 &= ~0xF; x40 |= 1; x40 &= ~0x240240; x44 &= ~0x8
		3:
			x40 &= ~0xF; x40 |= 6
			if (lo.frm >> 16) == lo.nf - 1:
				x40 &= ~0xF; x40 |= 1
				_chg(lo, 13, 0, 0); lo.x40 &= ~0x3000000
				flg |= 0x40000
				_chg(up, 213, 0, 0); up.x40 &= ~0x3000000
				mode3 = 2

## bhEne01_MV05: the lunge 122 (root translation), a catch between frames 8 and 12 -> NG00 from mode3 2 (85)
func _mv05() -> bool:
	if mode3 == 0:
		_chg(lo, 122, 0, 8); lo.x40 &= ~0x2000000; lo.x40 |= 0x1000000
		_chg(up, 322, 0, 8); up.x40 &= ~0x2000000; up.x40 |= 0x1000000
		_ay = _dir(position.x, position.z, _pl.x, _pl.z) & 0xFFFF
		mode3 = 1
	if mode3 == 1:
		var f := lo.frm >> 16
		if f < 13: _ay = (_ay + _ikou3(_pl.x, _pl.z, 1536)) & 0xFFFF
		if f >= 8 and f < 13 and _free and _eat_check(3640, 5.5):
			x40 |= 0x80
			# Claire: mode0 4, mode3 4 (PlyDG00 case 4: the synchronised 408 / 409)
			pl_state = "held"; _pm3 = 4
			x40 |= 0x20000
			if _cdir(_pay(), _ay) == 0: x40 |= 0x4000
			else: x40 &= ~0x4000
			_chg(lo, 85, 0, 5); lo.x40 &= ~0x3000000
			_chg(up, 285, 0, 5); up.x40 &= ~0x3000000
			_ay = _dir(position.x, position.z, _pl.x, _pl.z) & 0xFFFF
			x40 &= ~0xF; x40 |= 5
			mode0 = 2; mode1 = 0; mode2 = 0; mode3 = 2
			ct0 = 75
			return true
		if f == 12: mode3 = 2
	elif mode3 == 2:
		if (lo.frm >> 16) == lo.nf - 1:
			mode0 = 1; mode1 = 1; mode2 = 1; mode3 = 0
	return false

## bhEne01_MV06: Claire is held by another zombie: wait (49 from frame 45), then grab or lunge
func _mv06() -> bool:
	if mode3 == 0:
		_chg(lo, 49, 45 << 16, 15); lo.x40 &= ~0x3000000
		_chg(up, 249, 45 << 16, 15); up.x40 &= ~0x3000000
		flg |= 0x40000
		ct0 = _rnd(15) + 15
		mode1 = 1
		mode3 = 1
	_ay = (_ay + _ikou3(_pl.x, _pl.z, 910)) & 0xFFFF
	if _free:
		if _eat_check(4551, 5.5):
			mode0 = 2; mode1 = 0; mode2 = 0; mode3 = 0
			x40 |= 0x80; pl_state = "held"; _pm3 = 0
			return true
		mode1 = 0; mode2 = 5; mode3 = 0
	return false

## bhEne01_MV07: turn round (127, mirrored for a left turn)
func _mv07() -> void:
	if mode3 == 0:
		_chg(lo, 127, 0, 8); lo.x40 &= ~0x3000000
		_chg(up, 327, 0, 8); up.x40 &= ~0x3000000
		ayp = (_dir(position.x, position.z, _pl.x, _pl.z) - _ay) & 0xFFFF
		if ayp < 0x8001: ayp = ayp / 22
		else:
			ayp = -(0x10000 - ayp) / 22
			lo.md |= 2; up.md |= 2
		flg |= 0x40000
		mode3 = 1
	var f := lo.frm >> 16
	if f >= 17 and f < 40: _ay = (_ay + ayp) & 0xFFFF
	if f == 40:
		mode1 = 1; mode2 = 1; mode3 = 0

# ---------------------------------------------------------------- Nage (mode0 2): NG00

func _nage() -> void:
	# bhEne01_NGType00: facing Claire (0x4000) or behind her
	if mode3 == 0:
		if _cdir(_pay(), _ay) == 0: x40 |= 0x4000
		else: x40 &= ~0x4000
	match mode3:
		0:
			_chg(lo, 8, 0, 0); lo.x40 &= ~0x3000000
			_chg(up, 208, 0, 0); up.x40 &= ~0x3000000
			_ay = _dir(position.x, position.z, _pl.x, _pl.z) & 0xFFFF
			flg &= ~0x40
			x40 &= ~0xF; x40 |= 5; x40 &= ~0x4000000
			# Claire: mode0 4, mode2 0, mode3 0 (PlyDG00 case 0)
			pl_state = "held"; _pm3 = 0
			# the zombie stands 6.44 (in front of Claire) / 6.29 (behind her) units from her
			var z := -6.442887 if x40 & 0x4000 else 6.290813
			var ang := ((_ay + 0x8000) if x40 & 0x4000 else _ay) & 0xFFFF
			var a := ang * BAMS
			position = Vector3(_pl.x + z * sin(a) * S, _pl.y, _pl.z + z * cos(a) * S)
			if hp < 0: hp = 0
			x40 |= 0x20000
			mode3 = 1
			if (lo.frm >> 16) == 20:
				ct0 = 60; mode3 = 2
		1:
			if (lo.frm >> 16) == 20:
				ct0 = 60; mode3 = 2
		2:
			var f := lo.frm >> 16
			if f == 25 or f == 60:
				if player != null: player.hp -= PERSONAL[ptype][4] + 10
				bit += 1
			# bhEne_LeverCheck: Claire struggles free sooner
			ct0 -= lever + 1
			lever = 0
			if ct0 <= 0 or (flg & 0x2000000):
				if player != null and player.hp < 0: _ng_eat()
				else: _ng_release()
				flg |= 0x20
		3:
			var f := lo.frm >> 16
			if f > 17 and f < 31:
				spd = 1.5 - ct0 * 0.14
				if spd < 0.0: spd = 0.05
				_add_speed(32768)
				ct0 += 1
			if f == lo.nf - 1:
				_chg(lo, 12, 7 << 16, 0); lo.x40 &= ~0x3000000
				flg |= 0x40000
				_chg(up, 212, 7 << 16, 0); up.x40 &= ~0x3000000
				flg |= 0x40
				x40 &= ~0xF; x40 |= 6
				mode3 = 4
		4:
			if (lo.frm >> 16) == lo.nf - 1:
				x40 &= ~0xF; x40 |= 6; x40 |= 0x40000; x44 |= 0x40
				lo.add = 0; up.add = 0
				mode0 = 1; mode1 = 0; mode2 = 4; mode3 = 0
		6:
			if flg & 0x2000000:
				var w := _obj_pos(0)
				position.x = w.x; position.z = w.z
				x40 &= ~0x80000
				_chg(lo, 111, 0, 0); lo.x40 &= ~0x3000000
				_chg(up, 311, 0, 0); up.x40 &= ~0x3000000
				x40 &= ~0xF
				mode3 = 7

## NG00 case 2 end, Claire alive: the push-off 7 / 207, then the fall 12 from frame 7 -> MV04
func _ng_release() -> void:
	mode0 = 2; mode2 = 0
	_chg(lo, 7, 0, 5); lo.x40 &= ~0x3000000
	flg |= 0x40000
	_chg(up, 207, 0, 5); up.x40 &= ~0x3000000
	mode3 = 3
	_pm3 = 2   # Claire: pl->mode3 2, the push-off 410 / 411
	x40 &= ~0xF; x40 |= 6
	ct0 = 0
	flg |= 0x20

## NG00 case 2 end, Claire dead: 34 / 234, then feeding 111 / 311
func _ng_eat() -> void:
	mode0 = 2; mode2 = 0
	_chg(lo, 34, 0, 0); lo.x40 &= ~0x3000000
	_chg(up, 234, 0, 0); up.x40 &= ~0x3000000
	x40 &= ~0xF; x40 |= 5
	mode3 = 6
	_pm3 = 6   # Claire: pl->mode0 6, mode3 6, the death 412 / 413

# ---------------------------------------------------------------- Claire in a grab: PlyDG00 / PlayerLink

## Claire (set by the game); bhEne01_PlayerControl drives her while EXP0_I(0x40) 0x20000 is set
var player: Node3D = null
## bhEne_LeverCheck points (4 for a new direction press, 3 for a new button press) gathered by the game
var lever := 0
## "" / "held" (pl->mode0 4 or 6) / "free" (PlyDG00 case 3 end: mode0 1) / "dead" (case 7 end: flg 2)
var pl_state := ""
## bites this frame (the game plays the sound)
var bit := 0
var _pm3 := 0      # pl->mode3
var _pct0 := 0     # pl->ct0
var _payp := 0     # pl->ayp
var _waxp := 0     # epw->waxp: Claire's angle against the zombie's
var _pfrm := 0     # pl->frm_no of her synchronised motion
var _pnf := 1
var _link := Vector3.ZERO   # EXP0_F(0x64): Claire's offset in the zombie's frame (units)
## Claire's motions 400 + N come from the zombie's bank (pl->mnwP = epw->mnwP); claire.glb zNN = bank slots in order
const PLY_CLIP := {401: "z00", 402: "z01", 404: "z02", 405: "z03", 406: "z04", 407: "z05", 408: "z06", 409: "z07", 410: "z08", 411: "z09", 412: "z10", 413: "z11"}
const PLY_NF := {401: 60, 402: 60, 404: 50, 405: 50, 406: 68, 407: 68, 408: 70, 409: 70, 410: 36, 411: 36, 412: 71, 413: 71}
const PLY_OFS := [Vector3(0, 0, -6.326351), Vector3(0, 0, -6.326351)]
const PLY_OFS2 := [Vector3(0.469302, 0, -5.826981), Vector3(0.469231, 0, -5.499186)]

func _pay() -> int:
	return int(roundf(player.heading / BAMS)) & 0xFFFF if player != null else ((_ay + 0x8000) & 0xFFFF)

## pl->mtn_no = 400 + n from the zombie bank, frm_no 0, hokan_count
func _ply_motion(n: int, hokan: int) -> void:
	var m := 400 + n
	_pfrm = 0; _pnf = PLY_NF[m]
	if player != null: player.play_sync(PLY_CLIP[m], false, hokan / 30.0)

## the turn of PlyDG00 cases 0 / 4: Claire turns to face the zombie (0x4000) or its way over 5 frames
func _ply_turn_start() -> void:
	var pay := _pay()
	if x40 & 0x4000:
		_payp = (_ay + 0x8000 - pay) & 0xFFFF; _waxp = -32768
	else:
		_payp = (_ay - pay) & 0xFFFF; _waxp = 0
	if _payp > 0x8000: _payp = _payp - 0x8000 - 0x8000
	_waxp -= _payp
	_payp = int(_payp / 5.0)
	_pct0 = 0

func _ply_turn() -> void:
	if _pct0 < 5: _waxp += _payp
	elif _pct0 == 5: _waxp = -32768 if x40 & 0x4000 else 0
	_pct0 += 1

## bhEne01_PlyDG00
func _player_control() -> void:
	var front := (x40 & 0x4000) != 0
	_pfrm += 1
	match _pm3:
		0:
			if player != null: player.play_sync(player.cur)   # Claire stops (her control is off)
			_ply_turn_start()
			_pm3 = 1
			_pdg_1(front)
		1:
			_pdg_1(front)
		2:
			_ply_motion(10 if front else 11, 0)
			x40 &= ~0x80000
			_pm3 = 3
		3:
			# (bhEne01_EnemyPushChk at frames 14 / 17 is not ported)
			if _pfrm >= _pnf - 1:
				pl_state = "free"
				x40 &= ~0x24080
		4:
			_ply_motion(8 if front else 9, 5)
			_link = PLY_OFS2[0 if front else 1]
			x40 |= 0x80000
			_ply_turn_start()
			_pm3 = 5
			_ply_turn()
		5:
			_ply_turn()
		6:
			_ply_motion(12 if front else 13, 0)
			_pm3 = 7
		7:
			if _pfrm >= _pnf - 1:
				pl_state = "dead"
				x40 &= ~0xA4080

func _pdg_1(front: bool) -> void:
	_ply_turn()
	if (lo.frm >> 16) == 1:
		_ply_motion(6 if front else 7, 5)
		_link = PLY_OFS[0 if front else 1]
		x40 |= 0x80000

## bhEne01_PlayerLink: Claire stands at the offset in the zombie's frame, turned by waxp; a wall in her way pushes both
func _player_link() -> void:
	if player == null: return
	var a := _ay * BAMS
	var off := Vector3(_link.x * cos(a) + _link.z * sin(a), 0, -_link.x * sin(a) + _link.z * cos(a)) * S
	var c := Vector3(position.x + off.x, player.position.y, position.z + off.z)
	if _room != null:
		var c2 := _room.resolve(c, 0.25)
		position.x += c2.x - c.x; position.z += c2.z - c.z
		c = c2
	player.place(c.x, c.y, c.z, ((_ay + _waxp) & 0xFFFF) * BAMS)

# ---------------------------------------------------------------- Damage (mode0 3) / Die (mode0 4)

func _damage() -> void:
	# DG03: falls on its back (11); (the handgun's combo act 6 always picks DG03)
	match mode3:
		0:
			x40 &= ~0xF; x40 |= 6
			spd = 0.0
			_chg(lo, 11, 0, 10); lo.x40 &= ~0x3000000
			_chg(up, 211, 0, 10); up.x40 &= ~0x3000000
			flg |= 0x40000
			ct1 = 0
			mode3 = 1
		1:
			if (lo.frm >> 16) == lo.nf - 2:
				x40 &= ~0xF; x40 |= 6
				lo.add = 0; up.add = 0
				mode0 = 1; mode1 = 0; mode2 = 4; mode3 = 0
				x40 |= 0x40000; x44 |= 0x40

## bhEne01_DD00: lies dead, twitching (37 / 38) a few times
const DD_MTN := [[37, 237], [38, 238], [3, 203]]
func _die() -> void:
	match mode3:
		0:
			var m: Array = DD_MTN[clampi(mode1, 0, 2)]
			_chg(lo, m[0], 0, 0); lo.x40 &= ~0x3000000; lo.add = 0
			_chg(up, m[1], 0, 0); up.x40 &= ~0x3000000; up.add = 0
			flg |= 2
			ct0 = 0
			ct1 = _rnd(5) + 10
			mode3 = 1
			_die_wait()
		1:
			_die_wait()
		2:
			if (lo.frm >> 16) == lo.nf - 1:
				lo.add = 0; up.add = 0
				var c := ct1
				ct1 -= 1
				if c > 0:
					ct0 = _rnd(50) + 10
					mode3 = 1
				else:
					mode3 = 3

func _die_wait() -> void:
	ct0 -= 1
	if ct0 < 0:
		lo.add = 0x10000; up.add = 0x10000
		mode3 = 2

## a handgun hit (game.hit_zombie): bhEne01_DmgCheck / DmgCheckType00 with En01_WpnDamageTbl[2] (nm_act 0, cb_act 6)
func hit(dmg: float) -> void:
	if not hittable: return
	hp -= dmg
	flg |= 4; _hit_flg = true
	x40 |= 0x200400; x48 = 0
	# from behind (comb_flg 4 -> EXP0_I(0x40) 0x2000) and the side of the hit (EXP0_I(0x44) 0x20)
	var dv := position - _pl
	var behind := forward().dot(Vector3(dv.x, 0, dv.z)) > 0
	if behind: x40 |= 0x2000
	else: x40 &= ~0x2000
	var ang := int(atan2(dv.x, dv.z) * 10430.381) & 0xFFFF
	if ((ang - _ay) & 0xFFFF) <= 0x8000: x44 |= 0x20
	else: x44 &= ~0x20
	if x40 & 0x80:
		# bhEne01_DmgCheck: a zombie holding Claire lets go (she is back in control)
		x40 &= ~0xA4080
		if pl_state == "held": pl_state = "free"
	if (x40 & 0x40000) and mode0 == 1 and mode2 == 4:
		# lying / getting up (DmgModeJumpCheck chg_mtn_tbl is not ported): only a killing shot counts
		if hp <= 0:
			mode0 = 4; mode2 = 0; mode3 = 0
			mode1 = 1 if lo.no in [12, 14] else (2 if lo.no == 13 else 0)
		return
	if mode2 == 5 or mode0 == 2 or hp <= 0:
		# combo / kill: act = cb_act 6 -> DG03
		mode0 = 3; mode1 = 0; mode2 = 3; mode3 = 0
		return
	# nm_act 0: the upper body twists (SetMtn rot_tbl)
	if not (x40 & 0x8000000):
		x40 |= 0x8000000; x2c = 0

var x48 := 0

func mtn_no() -> int:
	return lo.no

## bhEne01_SetMtn: mtn 8 / 120 -> en01_kamikami[frm], 85 / 121 -> kamikami2, 0 / 40 / 41 / 125 / 117 -> mogmog[frm % 40];
## bhDrawEneObject then draws npCalcMorphing(obj_a, obj_b, shp_ct)
func _update_morph() -> void:
	if _morph_mi == null: return
	var w := 0.0
	if etype != 10:
		var no := lo.no
		var frm := lo.frm >> 16
		if _scripted:
			no = -1
			var c := cur
			if c.length() >= 3 and c[0] == "m" and c.substr(1).is_valid_int():
				var k := c.substr(1).to_int()
				if k < LOWER_SLOT.size(): no = LOWER_SLOT[k]
			frm = int(ap.current_animation_position * 30.0 + 0.001) if ap and ap.current_animation != "" else 0
		match no:
			8, 120: w = KAMIKAMI[mini(frm, KAMIKAMI.size() - 1)]
			85, 121: w = KAMIKAMI2[mini(frm, KAMIKAMI2.size() - 1)]
			0, 40, 41, 125, 117: w = MOGMOG[frm % 40]
	_morph_mi.set_blend_shape_value(0, w * 0.001)

## npTransform interpolates position and normal of every vertex of obj_a towards obj_b (data/face/zmorph_*.json, exported
## from the second SKIN / MDL of en01aNN by tools/conv/zombie_morph.py in the glb bind space); here a relative blend shape
func _setup_morph(file: String) -> void:
	var name_ := file.get_file().get_basename()
	var mi: MeshInstance3D = null
	for m in Assets.find_meshes(model):
		if m.skin != null: mi = m; break
	if mi == null or mi.mesh == null: return
	if not _morph_cache.has(name_):
		_morph_cache[name_] = null
		var D: Variant = Assets.data_json("face/zmorph_%s.json" % name_)
		if D == null: return
		var grid := {}
		for v in D.verts:
			var k := Vector3i((Vector3(v[0], v[1], v[2]) / 0.001).floor())
			if not grid.has(k): grid[k] = []
			grid[k].append(v)
		var src := mi.mesh
		var dst := ArrayMesh.new()
		dst.blend_shape_mode = Mesh.BLEND_SHAPE_MODE_RELATIVE
		dst.add_blend_shape("mouth")
		var hits := 0
		for s in src.get_surface_count():
			var arr := src.surface_get_arrays(s)
			var pos: PackedVector3Array = arr[Mesh.ARRAY_VERTEX]
			var dp := PackedVector3Array(); dp.resize(pos.size())
			var dn := PackedVector3Array(); dn.resize(pos.size())
			for i in pos.size():
				var c := Vector3i((pos[i] / 0.001).floor())
				var best: Variant = null; var bd := 1e-4
				for dx in [-1, 0, 1]:
					for dy in [-1, 0, 1]:
						for dz in [-1, 0, 1]:
							for v in grid.get(c + Vector3i(dx, dy, dz), []):
								var d := Vector3(v[0], v[1], v[2]).distance_to(pos[i])
								if d < bd: bd = d; best = v
				if best != null:
					dp[i] = Vector3(best[3], best[4], best[5]); dn[i] = Vector3(best[6], best[7], best[8]); hits += 1
			var bs := []; bs.resize(Mesh.ARRAY_MAX)
			bs[Mesh.ARRAY_VERTEX] = dp
			if arr[Mesh.ARRAY_NORMAL] != null: bs[Mesh.ARRAY_NORMAL] = dn
			if arr[Mesh.ARRAY_TANGENT] != null:
				var tz := PackedFloat32Array(); tz.resize((arr[Mesh.ARRAY_TANGENT] as PackedFloat32Array).size()); bs[Mesh.ARRAY_TANGENT] = tz
			dst.add_surface_from_arrays(Mesh.PRIMITIVE_TRIANGLES, arr, [bs])
			dst.surface_set_material(s, src.surface_get_material(s))
		_morph_cache[name_] = dst
	if _morph_cache[name_] == null: return
	var overrides := []
	for s in mi.mesh.get_surface_count(): overrides.append(mi.get_surface_override_material(s))
	mi.mesh = _morph_cache[name_]
	for s in overrides.size(): mi.set_surface_override_material(s, overrides[s])
	_morph_mi = mi
