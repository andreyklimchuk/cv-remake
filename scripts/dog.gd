class_name Dog
extends EnemyModel
## Zombie dog (en04), port of en04.c:
## - one motion work (19 objects) like the original: mtn_no / frm_no / mtn_add / hokan (bhSetMotion, bhEne04_ChgMtn,
##   bhEne04_RunMotion); mtn N of the bank en04ms = glb clip m<SLOT index>, mtn_md 2 = mirrored (en04_flipTree);
##   bhEne04_SetMtn root rules (root height zeroed while the code flies the dog, EXP0 0x40000000 bhEne_GetTranslateMtn)
## - Move (mode0 1): MVType00 / 01 (wakes in its area) / 02 (bursts out at the area Claire steps in), Brain00 / 01 / 02 /
##   04 / 06, EneSearch, MV00 rest, MV01 wander, MV02 run, MV03 turn at a wall, MV04 wait, MV05 get up, MV06 search,
##   MV07 leap, MV08 leap hit / landing, MV09 snap, MV10, MV12 eat; Nage (mode0 2): NG00 bite, NG01 fatal leap;
##   Damage (mode0 3): DG00; Die (mode0 4): DD00
## - Claire: PlyDG00 / PlyDG01 (her motions 100 + N of this bank = claire.glb dNN), PlayerLink, PlyDamageCheck
## Angles are BAMS (65536 = 360 deg) and distances original units (1 unit = 0.1 m) inside the AI.

const S := 0.1
const BAMS := TAU / 65536.0
const NB := 19
## bank slot of glb clip mNN (the converter numbered the 19-object blocks of en04ms in bank order)
const SLOT := [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 25, 26, 27, 28, 29, 30, 31, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49]
const FLIP := [0, 1, 2, 3, 4, 5, 9, 10, 11, 6, 7, 8, 12, 16, 17, 18, 13, 14, 15]
const HP_TBL := [60, 60, 60, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 120, 120, 120]
## en04_hp_tbl is on the scale of the original weapon damage; the port's handgun does 1.5 against the zombies' hp 8
const HP_SCALE := 0.1
## Claire's motions 100 + N from this bank (En04_PlyMtn_OffsetTbl[0] = 100): claire.glb dNN = bank slots 100..107
const PLY_CLIP := {100: "d00", 101: "d01", 102: "d02", 103: "d03", 104: "d04"}
const PLY_NF := {100: 30, 101: 33, 102: 52, 103: 71, 104: 71}
## bhEne04_PlyDG00 ply_ofs_pos[0], PlyDG01 offsets (units, the dog's frame)
const PLY_OFS := Vector3(-0.937615, 0, -9.776372)
const PLY_OFS_F := Vector3(0.000104, 0, -5.032532)
const PLY_OFS_B := Vector3(-0.785082, 0, -4.901211)
const AR := 3.0        # epw->ar
const CAR := 3.5       # epw->car
## Claire's car / collision capsule radius (PlyInfo is not ported; Claire's walk radius 0.2 m)
const PL_CAR := 2.0
const PL_R := 0.2
const KAIDAN_ANG := [0, 49152, 32768, 16384]

class Mw:
	var no := -1
	var frm := 0
	var add := 0
	var hokan := 0
	var md := 0
	var anim: Animation = null
	var nf := 1
	var tr := {}

static var _track_cache := {}
static var contact_flg := 0    # en04_contact_flg
static var atari_flg := 0      # en04_atari_flg

var index := 0
var etype := 0          # epw->type: 0 free, 1 waits in its area, 2 bursts out
var hp := 9.0
var heading := 0.0
var w := Mw.new()
var mode0 := 1
var mode1 := 0
var mode2 := 0
var mode3 := 0
var ct0 := 0
var ct1 := 0
var ct2 := 0
var ct3 := 0
var way := 0
var wax := 0
var waz := 0
var waxp := 0
var ayp := 0
var _ay := 0
var spd := 0.0
var car := CAR
var flg := 0            # epw->flg: 2 dead, 8/0x40 body collision, 0x10 walls, 0x100 on the floor, 0x2000000 motion wrapped
var flg2 := 0
var x0 := 0             # EXP0_UC(0): search counter / 0x20 seen now / 0x40 sees Claire / 0x80 no route update
var x10 := 0            # EXP0_I(0x10)
var x1c := 0            # neck turn
var x6 := 0             # wall history
var _x3c := false       # touching a wall
var _x44 := false       # the line to Claire is blocked
var _x48 := 0.0         # jump speed
var _e48 := 0           # bhEne04_Escape state (EXP0_I 0x48 / 0x4C / 0x50)
var _e4c := 0
var _e50 := 0
var _dist := 0.0        # EXP0_F(0x20)
var _tx := 0.0          # EXP0_F(0x24) / (0x2C)
var _tz := 0.0
var _link := Vector3.ZERO   # EXP0_F(0x30)
var _gy := 0.0          # rom->grand of its floor

## Claire
var player: Node3D = null
var flr: Array = []                 # the room's floor atr (vm.flr): enemy areas type 2
var on_rm_flag: Callable            # sys->rm_flg |= bit
var lever := 0
## "" / "held" (pl->mode0 4 / 6) / "free" (PlyDG00 case 5) / "dead" (PlyDG01 end)
var pl_state := ""
## PlyDamageCheck knocked Claire this frame: 1 from the front (mtn 73), 2 from behind (74)
var pl_hurt := 0
var bit := 0
var _pm0 := 0
var _pm1 := 0
var _pm3 := 0
var _pfrm := 0
var _pnf := 1
var _pl := Vector3.ZERO
var _pl1 := Vector3.ZERO
var _pay := 0
var _free := true
var _pl_run := false
var _pl_atk := false

var _P: Array[Vector3] = []
var _Q: Array[Quaternion] = []
var _rest_P: Array[Vector3] = []
var _rest_Q: Array[Quaternion] = []
var _bi: Array[int] = []
var _W: Array[Transform3D] = []
var _skel_rel := Transform3D.IDENTITY
var _acc := 0.0
var _room: Room = null
var _scripted := false

func _init(i := 0) -> void:
	index = i

func init(file: String, x: float, y: float, z: float, h: float, typ := 0) -> Dog:
	load_model(file)
	if ap: ap.stop()
	for k in NB:
		var bi := bone_index("b%02d" % k)
		_bi.append(bi)
		var rp := skel.get_bone_rest(bi).origin if bi >= 0 else Vector3.ZERO
		var rq := skel.get_bone_rest(bi).basis.get_rotation_quaternion() if bi >= 0 else Quaternion.IDENTITY
		_rest_P.append(rp); _rest_Q.append(rq); _P.append(rp); _Q.append(rq)
	var n: Node = skel
	while n != null and n != self:
		if n is Node3D: _skel_rel = (n as Node3D).transform * _skel_rel
		n = n.get_parent()
	position = Vector3(x, y, z); heading = h; rotation.y = h
	_ay = int(roundf(h / BAMS)) & 0xFFFF
	_gy = y
	# bhEne04_Init
	contact_flg = 0; atari_flg = 0
	etype = typ
	hp = HP_TBL[randi() % 16] * HP_SCALE
	x10 |= 0x21
	flg |= 0x178
	mode0 = 1; mode1 = 0; mode2 = 0; mode3 = 0
	_chg(0, 0, 0); w.add = 0
	_set_mtn()
	_apply_pose(); _save_world()
	return self

var hittable: bool:
	get: return mode0 != 4 and not (flg & 2)
var alive: bool:
	get: return hp >= 0 and mode0 != 4
var state: String:
	get:
		if mode0 == 4: return "dead"
		if mode0 == 2: return "bite"
		if mode0 == 3: return "damage"
		return "mv%02d" % mode2

func forward() -> Vector3:
	return Vector3(-sin(heading), 0, -cos(heading))

# ---------------------------------------------------------------- motion system

func _clip(no: int) -> Animation:
	var k := SLOT.find(no)
	var nm := "m%02d" % k
	return ap.get_animation(nm) if k >= 0 and ap != null and ap.has_animation(nm) else null

func _set_anim(no: int) -> void:
	w.no = no
	w.anim = _clip(no)
	w.nf = int(roundf(w.anim.length * 30.0)) + 1 if w.anim else 1
	w.tr = _tracks(w.anim)

## bhEne04_ChgMtn
func _chg(no: int, frm: int, rate: int) -> int:
	w.add = 0x10000
	if w.no == no: return -1
	_set_anim(no)
	w.frm = frm; w.hokan = rate; w.md = 0
	flg &= ~0x40000; flg &= ~0x2000000
	return 0

## bhEne04_RunMotion: run straight (1) / turning (3 / 2), in a narrow place (EXP0 0x8000) 34 / 41 / 40; the frame is kept
func _run_motion(rot: int) -> void:
	var idx := 1 if rot == 0 else (0 if rot > 0 else 2)
	var no: int = ([41, 34, 40] if x10 & 0x8000 else [3, 1, 2])[idx]
	if w.no != no:
		_set_anim(no)
		if w.hokan < 8:
			w.hokan = 7; w.md = 32

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

func _key_pos(o: int, f: int) -> Vector3:
	var t: Array = w.tr.get(o, [-1, -1])
	return w.anim.position_track_interpolate(t[0], f / 30.0) if t[0] >= 0 else _rest_P[o]

## bhSetMotion: the frame's keys -> object poses (hokan blends from the last pose), then frm_no += mtn_add
func _set_motion() -> int:
	if w.anim == null: return 0
	var t := (w.frm >> 16) / 30.0
	var rate := 1.0 / w.hokan if w.hokan > 0 else 1.0
	var mir := (w.md & 2) != 0
	for o in NB:
		var dst: int = FLIP[o] if mir else o
		var tk: Array = w.tr.get(o, [-1, -1])
		var q: Quaternion = w.anim.rotation_track_interpolate(tk[1], t) if tk[1] >= 0 else _rest_Q[o]
		if mir: q = Quaternion(q.x, -q.y, -q.z, q.w)
		_Q[dst] = _Q[dst].slerp(q, rate) if w.hokan > 0 else q
		if o == 0:
			var p: Vector3 = w.anim.position_track_interpolate(tk[0], t) if tk[0] >= 0 else _rest_P[0]
			if mir: p.x = -p.x
			_P[0] = _P[0].lerp(p, rate) if w.hokan > 0 else p
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

## bhEne04_SetMtn
func _set_mtn() -> void:
	var frm := w.frm >> 16
	var moving := w.add != 0
	var ret := _set_motion()
	if x10 & 0x40000000:
		_P[0].x = 0.0; _P[0].z = 0.0
		_translate(frm, moving)
	if ret != 0: flg |= 0x2000000
	else: flg &= ~0x2000000
	if mode0 < 5:
		match w.no:
			4:
				if frm >= 11:
					_P[0].y = 0.0; flg &= ~0x100
			5: _P[0].y = 0.0
			6:
				if frm < 10:
					_P[0].y = 0.0; flg &= ~0x100
				else: flg |= 0x100
			8, 9, 20:
				_P[0].x = 0.0; _P[0].z = 0.0
				var lim: int = {8: 18, 9: 25, 20: 17}[w.no]
				if frm < lim:
					_P[0].y = 0.0; flg &= ~0x100
				else: flg |= 0x100
			10, 11:
				_P[0].x = 0.0; _P[0].z = 0.0
			12: _P[0].y = -3.880015 * S
			39: _P[0] = Vector3(0, -3.782267 * S, 0)
	# (bhEne04_CheckMtnTbl: en04_mtn_tbl sound effects / en04_mtn_tbl2 vibration; the enemy sound banks are not ported)

## bhEne_GetTranslateMtn: px += R(ay) * (key[frm] - key[frm - 1]) (y ignored)
func _translate(frm: int, moving: bool) -> void:
	if not moving and (w.frm >> 16) == frm: return
	var k := _key_pos(0, frm) - (_key_pos(0, frm - 1) if frm > 0 else Vector3.ZERO)
	k.y = 0
	position += Basis(Vector3.UP, _ay * BAMS) * k

## bhAddSpeed
func _add_speed(r: int) -> void:
	var a := ((_ay + r) & 0xFFFF) * BAMS
	position.x -= spd * S * sin(a); position.z -= spd * S * cos(a)

func _model_xf() -> Transform3D:
	return Transform3D(Basis(Vector3.UP, _ay * BAMS), position) * _skel_rel

## bhCalcModel: the world matrices of the objects (owP)
func _save_world() -> void:
	var M := _model_xf()
	_W.resize(NB)
	var G: Array[Transform3D] = []
	G.resize(NB)
	for o in NB:
		var bi := _bi[o]
		var par := skel.get_bone_parent(bi) if bi >= 0 else -1
		var po := _bi.find(par)
		var l := Transform3D(Basis(_Q[o]), _P[o])
		G[o] = (G[po] * l) if po >= 0 and po < o else l
		_W[o] = M * G[o]

func _obj(o: int) -> Vector3:
	return _W[o].origin if o < _W.size() else position

func _apply_pose() -> void:
	_ay &= 0xFFFF
	rotation.y = _ay * BAMS
	heading = rotation.y
	for o in NB:
		var bi := _bi[o]
		if bi < 0: continue
		skel.set_bone_pose_position(bi, _P[o]); skel.set_bone_pose_rotation(bi, _Q[o])

## bhEne04_RotNeck: the y angle of the neck objects 2 / 3 / 4
func _rot_neck(ry: int) -> void:
	var v := [ry, ry + int(ry / 4.0), ry + int(ry / 2.0)]
	for i in 3:
		var e := Basis(_Q[2 + i]).get_euler(EULER_ORDER_ZYX)
		e.y = v[i] * BAMS
		_Q[2 + i] = Basis.from_euler(e, EULER_ORDER_ZYX).get_rotation_quaternion()

## bhEne04_SearchNeck: the head turns towards Claire (+-4096)
func _search_neck() -> void:
	_rot_neck(x1c)
	var rot := (_ay + x1c) & 0xFFFF
	var r2 := ((_dir(position.x, position.z, _pl.x, _pl.z) - rot) + 512) & 0xFFFF
	if r2 > 1024:
		x1c += 256 if r2 <= 32768 else -256
	x1c = clampi(x1c, -4096, 4096)

# ---------------------------------------------------------------- helpers

func _rnd(n: int) -> int: return randi() % n

## NitenDir_ck
func _dir(hx: float, hz: float, tx: float, tz: float) -> int:
	return int(atan2(hx - tx, hz - tz) * 10430.381)

## ikou
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

## bhCdirCheck: 1 = the same way (one behind the other), 0 = facing
static func _cdir(a: int, b: int) -> int:
	return 1 if (((a - b) + 0x4000) & 0xFFFF) < 0x8000 else 0

## bhSearchPlayer: Claire within +-r of the dog's way
func _search(r: int) -> bool:
	var a := _ay * BAMS
	var f := Vector3(-sin(a), 0, -cos(a))
	var v := (position - _pl) * Vector3(1, 0, 1)
	if v.length() < 1e-6: return true
	return f.dot(v.normalized()) < -cos(r * BAMS)

## a wall (collision shape) within r (m) of the point
func _wall_at(p: Vector3, r := AR * S) -> bool:
	return _room != null and _room.resolve(p, r).distance_to(p) > 0.001

## bhEne_CheckDirWall3: a wall at step units in the direction ay + ang
func _dir_wall3(p: Vector3, ang: int, step: float) -> bool:
	var a := ((_ay + ang) & 0xFFFF) * BAMS
	return _wall_at(Vector3(p.x - step * S * sin(a), p.y, p.z - step * S * cos(a)))

func _dir_wall(ang: int, step: float) -> bool:
	return _dir_wall3(position, ang, step)

## bhEne_CheckSideWall: 1 wall on the left, -1 on the right, both = walls on both sides
func _side_wall(step: float, both: int) -> int:
	var l := 1 if _dir_wall(-0x4000, step) else 0
	var r := -1 if _dir_wall(0x4000, step) else 0
	if l != 0 and r != 0: return both
	return l + r

## bhCollisionCheckLine: [point, push-out normal] of the first collision on the segment (null = free)
func _line_hit(a: Vector3, b: Vector3) -> Variant:
	if _room == null: return null
	var L := Vector2(b.x - a.x, b.z - a.z).length()
	var n := maxi(1, int(ceil(L / 0.05)))
	for i in range(1, n + 1):
		var q := a.lerp(b, float(i) / n)
		var q2 := _room.resolve(q, 0.02)
		if q2.distance_to(q) > 0.001: return [q, (q2 - q).normalized()]
	return null

## bhEne_EnemyAtariCheck: the enemy area (floor atr type 2, prm0 = id 4, prm1 = kind) containing p (or numbered ip)
func _zone(p: Vector3, kind: int, ip := -1) -> Variant:
	for a in flr:
		if not (int(a.flg) & 1) or int(a.type) != 2: continue
		var prm: Array = a.prm
		if prm[0] != 4 or prm[1] != kind: continue
		if ip >= 0:
			if prm[3] == ip: return a
			continue
		if a.x <= p.x and p.x <= a.x + a.w and a.z <= p.z and p.z <= a.z + a.d: return a
	return null

func _ground() -> float:
	if _room == null: return _gy
	var y: Variant = _room.floor_at(position.x, position.z, maxf(position.y, _gy))
	return y if y != null else _gy

# ---------------------------------------------------------------- frame loop

## one rendered frame: the original runs at 30 Hz
func tick(dt: float, _target: Vector3, target_free: bool, room: Room) -> bool:
	_room = room; _free = target_free
	if _scripted: _resume_ai()
	_acc += dt
	var n := 0
	while _acc >= 1.0 / 30.0 and n < 4:
		_acc -= 1.0 / 30.0; n += 1
		_read_player()
		_frame()
	if n > 0: _apply_pose()
	return false

func _read_player() -> void:
	if player == null: return
	_pl = player.position
	_pl1 = player.bone_pos("b01")
	_pay = int(roundf(player.heading / BAMS)) & 0xFFFF
	_pl_run = player.state == "run"
	_pl_atk = player._k_state == "slash"

## bhEne04: MainLoop (Mode0, PlayerControl, SetMtn, neck), CollisionCheck, PlayerLink, CalcModel
func _frame() -> void:
	match mode0:
		1: _move()
		2: _nage()
		3: _damage()
		4: _die()
	_player_control()
	if not (x10 & 0x40): _set_mtn()
	if mode0 != 5:
		if x10 & 0x80: _search_neck()
		elif x1c != 0:
			if (x1c & 0xFFFF) < 32768: x1c = maxi(0, x1c - 256)
			else: x1c = mini(0, x1c + 256)
			_rot_neck(x1c)
	_collision_check()
	if flg & 0x100:
		position.y = _ground(); _gy = position.y
	_player_link()
	_save_world()

## back from a script (room motion on the AnimationPlayer): take over the pose
func _resume_ai() -> void:
	_scripted = false
	if ap: ap.stop(true)
	for o in NB:
		var bi := _bi[o]
		if bi < 0: continue
		_P[o] = skel.get_bone_pose_position(bi); _Q[o] = skel.get_bone_pose_rotation(bi)
	_ay = int(roundf(rotation.y / BAMS)) & 0xFFFF
	w.no = -1
	mode0 = 1; mode1 = 0; mode2 = 0; mode3 = 0
	_chg(49, 0, 0)
	_save_world()

func update(dt: float) -> void:
	_scripted = true
	super.update(dt)

## bhEne04_CollisionCheck: Claire (bhCheckPlayer) and the walls (bhEne04_CollCheckWall)
func _collision_check() -> void:
	if not (flg & 2) and (x10 & 0x20) and player != null and player.hp >= 0 and _free:
		_check_player()
	if not (x10 & 0x10) and (flg & 0x10) and _room != null:
		_x44 = _line_hit(position, _pl) != null
		x6 = (x6 << 1) & 0xE
		_x3c = _wall_at(position)
		if _x3c: x6 |= 1
		if (x10 & 0xF) == 1:
			# bhCheckWallEx (ar 3) and the head against the walls (2.5)
			position = _room.resolve(position, AR * S)
			if _W.size() == NB:
				var h := _obj(5)
				var h2 := _room.resolve(h, 2.5 * S)
				if h2.distance_to(h) > 0.001:
					_x3c = true
					position.x += h2.x - h.x; position.z += h2.z - h.z

## bhCheckPlayer: the body circles (car) of Claire and the dog push each other apart
func _check_player() -> void:
	if not (flg & 8) or (flg2 & 1) or not (flg & 0x40): return
	var a := _ay * BAMS
	var c := position + Vector3(-3.0 * S * sin(a), 0, -3.0 * S * cos(a))
	var v := Vector2(_pl.x - c.x, _pl.z - c.z)
	var ln := v.length() / S
	var cr := PL_CAR + car
	if ln >= cr or ln < 1e-4: return
	var push := v.normalized() * (0.5 * (cr - ln) * S)
	player.position.x += push.x; player.position.z += push.y
	position.x -= push.x; position.z -= push.y
	_pl = player.position

# ---------------------------------------------------------------- Move (mode0 1)

func _move() -> void:
	x10 &= ~0x80
	match etype:
		1: _mv_type01()
		2: _mv_type02()
		_: _mv_type00()

func _pl_dist() -> float:
	return Vector2(_pl1.x - position.x, _pl1.z - position.z).length() / S

## bhEne04_MVType00
func _mv_type00() -> void:
	_dist = _pl_dist()
	if _zone(_pl, 0) != null: x10 |= 0x200000
	else: x10 &= ~0x200000
	if mode1 == 1: _brain()
	if mode0 != 1: return
	var a := _ay * BAMS
	var p := Vector3(position.x - 6.0 * S * sin(a), 0, position.z - 6.0 * S * cos(a))
	if _zone(p, 5) != null: x10 |= 0x8000
	else: x10 &= ~0x8000
	# (areas kind 4 push open a room object (obwp[prm2].ayp) in mode2 2 / 3: not ported)
	_move_mode2()

## bhEne04_MVType01: waits until Claire steps in the area kind 1 matching its area kind 2
func _mv_type01() -> void:
	_dist = _pl_dist()
	var hp_: Variant = _zone(_pl, 1)
	if hp_ != null:
		var no: int = hp_.prm[3]
		var h2: Variant = _zone(position, 2)
		if h2 != null and h2.prm[3] == no:
			mode1 = 1; mode2 = 2; mode3 = 0; etype = 0
	if mode0 == 1: _move_mode2()

## bhEne04_MVType02: bursts out (bhEne04_AtariCheck / AtariCheck2)
func _mv_type02() -> void:
	_dist = _pl_dist()
	if contact_flg & 1:
		_atari_check2()
		mode1 = 1; mode2 = 2; mode3 = 0; etype = 0
	elif _atari_check():
		mode1 = 1; mode2 = 2; mode3 = 0; etype = 0
	if mode0 == 1: _move_mode2()

## Claire in an area kind 6: the dog appears at the area kind 7 with the same number (sys->rm_flg bit 16 + n)
func _atari_check() -> bool:
	var hp_: Variant = _zone(_pl, 6)
	if hp_ == null: return false
	var ip: int = hp_.prm[3]
	if ip > 32 or atari_flg & (1 << ip): return false
	atari_flg |= 1 << ip
	var n := 0
	for a in flr:
		if (int(a.flg) & 1) and int(a.type) == 2 and a != hp_ and a.prm[0] == 4 and a.prm[1] == 6 and not (atari_flg & (1 << int(a.prm[3]))): n += 1
	if n == 0 or _rnd(2) == 0:
		var h2: Variant = _zone(position, 7, ip)
		if h2 != null:
			_appear(h2, true)
			contact_flg |= 1
			return true
	return false

func _atari_check2() -> bool:
	var hp_: Variant = _zone(_pl, 6)
	if hp_ == null or int(hp_.prm[3]) > 32: return false
	var work := []
	for a in flr:
		if (int(a.flg) & 1) and int(a.type) == 2 and a != hp_ and a.prm[0] == 4 and a.prm[1] == 6: work.append(a)
	if work.is_empty(): return false
	var fp: Dictionary = work[0] if work.size() == 1 else work[_rnd(work.size())]
	var h2: Variant = _zone(position, 7, int(fp.prm[3]))
	if h2 == null: return false
	_appear(h2, _rnd(3) == 0)
	return true

func _appear(a: Dictionary, flag: bool) -> void:
	position.x = a.x + a.w / 2.0; position.z = a.z + a.d / 2.0
	_ay = KAIDAN_ANG[int(a.prm[2]) & 3]
	if flag and on_rm_flag.is_valid(): on_rm_flag.call(1 << (int(a.prm[3]) + 16))

func _move_mode2() -> void:
	match mode2:
		0: _mv00()
		1: _mv01()
		2: _mv02()
		3: _mv03()
		4: _mv04()
		5: _mv05()
		6: _mv06()
		7: _mv07()
		8: _mv08()
		9: _mv09()
		10: _mv10()
		12: _mv12()
		_:
			# (MV11 stairs: bhEne04_KaidanCheck is not ported)
			mode1 = 1; mode2 = 2; mode3 = 0

## bhEne04_EneSearch: Claire seen (+-18204, line free) is kept for 16 frames; the route target refreshes every 16
func _ene_search() -> void:
	x0 |= 0x80
	if (x0 & 0x1F) < 4:
		if _search(18204) and not _x44: x0 |= 0x20
		if (x0 & 0x1F) == 3:
			if x0 & 0x20: x0 |= 0x40
			else: x0 &= ~0x40
			x0 &= 0x5F
	x0 = (x0 & 0xE0) | ((x0 + 1) & 0x1F)
	if (x0 & 0x1F) > 15: x0 &= 0xE0

## bhEne04_Brain (bhCheckRoute route tables are not ported: the target is Claire)
func _brain() -> void:
	_ene_search()
	if not (x0 & 0x80):
		_tx = _pl.x; _tz = _pl.z
	match mode2:
		0: _brain00()
		1: _brain01()
		2: _brain02()
		4: _brain04()
		6: _brain06()

func _brain00() -> void:
	if (_ikou3(_pl.x, _pl.z, 12288) == 0 and _dist < 35.0) or _pl_atk or (_pl_run and _dist < 40.0):
		x10 |= 0x400000

func _brain01() -> void:
	if (_ikou3(_pl.x, _pl.z, 8192) == 0 and _dist < 20.0) or _pl_atk or (_pl_run and _dist < 40.0) or (x10 & 0x8000):
		mode1 = 1; mode2 = 2; mode3 = 0

func _brain02() -> void:
	if _dist < 20.0 and not (x10 & 0x8000) and _free:
		if _dist > 11.0:
			if _ikou3(_pl.x, _pl.z, 1024) == 0:
				var back := _cdir(_ay, _pay)
				if back == 0 or (back == 1 and not _pl_run):
					if _line_hit(position, _pl) == null:
						mode1 = 0; mode2 = 7; mode3 = 0
		else:
			if _ikou3(_pl.x, _pl.z, 2048) == 0:
				var back := _cdir(_ay, _pay)
				if not (x10 & 0x200000) and _free and back == 0:
					# the bite (NG00)
					mode0 = 2; mode1 = 0; mode2 = 0; mode3 = 0
					_free = false
					x10 |= 0x4000000
					return
				mode1 = 0; mode2 = 9; mode3 = 0
		if _ikou3(_pl.x, _pl.z, 16384) == 0: x10 |= 0x2000
		elif x10 & 0x2000:
			if _rnd(64) > 56:
				x10 &= ~0x2000; x10 |= 0x1800
	if _dist >= 8.0 and _dist <= 15.0 and not _free:
		if _ikou3(_pl.x, _pl.z, 4096) == 0:
			mode1 = 0; mode2 = 4; mode3 = 0

func _brain04() -> void:
	if player != null and player.hp < 0:
		mode1 = 0; mode2 = 12; mode3 = 0; x10 &= ~0x2000000
		return
	if _dist < 20.0 and not (x10 & 0x8000) and _free:
		if _dist > 11.0:
			if _ikou3(_pl.x, _pl.z, 1024) == 0 and _line_hit(position, _pl) == null:
				mode1 = 0; mode2 = 7; mode3 = 0; x10 &= ~0x2000000
		elif _ikou3(_pl.x, _pl.z, 2048) == 0:
			mode1 = 0; mode2 = 9; mode3 = 0; x10 &= ~0x2000000

func _brain06() -> void:
	if _dist < 11.0:
		ct1 += 1
		if _pl_run: ct1 += 20
		if _ikou3(_pl.x, _pl.z, 2048) == 0 and _free and not (_dist <= 8.0):
			mode1 = 0; mode2 = 7; mode3 = 0
			contact_flg |= 2
	else:
		if ct2 > 0: ct1 -= 1
		if _ikou3(_pl.x, _pl.z, 2048) == 0 and _pl_run: ct1 += 6
	if ct1 >= 65 or _pl_atk or (contact_flg & 2) or (x10 & 0x8000):
		mode1 = 1; mode2 = 2; mode3 = 0

## MV00: rests lying (47) / stands (49); type 0 gets up (48) after a while or when it noticed Claire
func _mv00() -> void:
	if mode3 == 0:
		_chg(47 if etype == 0 else 49, 0, 7)
		ct0 = _rnd(128) + 100
		mode1 = 1; mode3 = 1
	if mode3 == 1:
		x10 |= 0x80; x1c = 4096
		ct0 -= 1
		if (ct0 <= 0 or (x10 & 0x400000)) and etype == 0:
			_chg(48, 0, 10)
			if not (x10 & 0x400000):
				x10 &= ~0x80; x1c = 0
			mode3 = 2
		return
	if mode3 == 2:
		if x10 & 0x400000: x10 |= 0x80
		if (w.frm >> 16) == w.nf - 1:
			mode1 = 1; mode2 = 2 if x10 & 0x400000 else 1; mode3 = 0

## MV01: wanders (0)
func _mv01() -> void:
	if (x0 & 0x40) and _dist < 35.0: x10 |= 0x80
	if mode3 == 0:
		_chg(0, 0, 7)
		way = 256; ct0 = _rnd(32) + 75; ct2 = 0
		_tx = _pl.x; _tz = _pl.z
		mode3 = 1
	if mode3 == 1:
		spd = 0.15
		if (x0 & 0x40) and _dist < 35.0: _ikou(_tx, _tz, way)
		_add_speed(0)
		if _x3c or ct0 == 0:
			var hit := _side_wall(10.0, 0)
			way = (256 if _rnd(2) != 0 else -256) if hit == 0 else hit * 256
			ct0 = 16384; ct1 = 256
			mode3 = 2
		else: ct0 -= 1
	elif mode3 == 2:
		spd = 0.08
		_add_speed(16)
		_ay += way
		ct0 -= 256
		if ct0 < 0:
			mode3 = 1; ct0 = _rnd(32) + 75
	ct2 += 1

func _speed_up(g: float, limit: float) -> void:
	if spd < limit: spd = minf(spd + g, limit)

func _speed_down(g: float, limit: float) -> void:
	if spd > limit: spd = maxf(spd - g, limit)

## MV02: runs at Claire (1 / 3 / 2), U-turns (0x1000)
func _mv02() -> void:
	var rot := 0
	if mode3 == 0:
		if w.no == 6: _chg(1, 5 << 16, 0)
		else: _chg(1, 0, 7)
		way = 1152; wax = 0; ct0 = 0; ct1 = 0; ct2 = 0; ct3 = 0
		if x10 & 0x800: ct1 = _rnd(15) + 20
		x10 &= ~0x3000; x10 &= ~0x4000
		spd = 0.08
		_tx = _pl.x; _tz = _pl.z
		mode3 = 1
	match mode3:
		1:
			if x10 & 0x1000:
				mode3 = 2
			else:
				_speed_up(0.1, 1.2)
				if spd >= 1.2 and ct1 < 10 and ct3 == 0:
					rot = _ikou3(_tx, _tz, way)
					_ikou(_tx, _tz, way)
					wax = rot
				else:
					if _x3c:
						wax = (64 if not (x10 & 0x800) else 0) + _ikou3(_tx, _tz, way)
						x10 &= ~0x800
					rot = wax
					_ay += rot
					ct1 -= 1
					if ct1 < 11:
						ct1 = 5; x10 &= ~0x800
				if not (x0 & 0x80):
					if not (x0 & 0x40):
						ct2 += 1
						if ct2 >= 6:
							mode2 = 6; mode3 = 0
							_run_end(rot); return
					else: ct2 = 0
				var ang := _ikou3(_tx, _tz, 8192)
				if (ang != 0 and not (_dist < 20.0) and _x3c) or (_x44 and _x3c):
					ct0 += 2
					if ct0 > 20:
						mode1 = 0; mode2 = 3; mode3 = 0
				elif ct0 > 0: ct0 -= 1
				_add_speed(0)
		2, 3:
			if mode3 == 2:
				wax = 0; ct0 = 0; mode3 = 3
			rot = _ikou3(_tx, _tz, 1280)
			_add_speed(-rot)
			if ct0 == 0:
				_speed_down(0.07, 0.05)
				if spd <= 0.05: ct0 += 1
			else: _speed_up(0.07, 1.2)
			_ay += rot
			wax += 1280
			if (wax & 0xFFFF) >= 32768 or rot == 0:
				x10 &= ~0x1000; ct0 = 0; wax = 0; mode3 = 1
		5:
			rot = 1280
			_add_speed(-1280)
			if ct0 == 0:
				_speed_down(0.07, 0.05)
				if spd <= 0.05: ct0 += 1
			else: _speed_up(0.07, 1.2)
			_ay += 1280
			wax += 1280
			if (wax & 0xFFFF) >= 32768:
				x0 = 132; ct1 = _rnd(15) + 20; ct0 = 0; wax = 0; mode3 = 0
	_run_end(rot)

func _run_end(rot: int) -> void:
	if ((((_dir(position.x, position.z, _tx, _tz) - _ay) + 9102) & 0xFFFF) < 18204) or _dist < 15.0: rot = 0
	_run_motion(rot)

## MV03: turns away from a wall
func _mv03() -> void:
	if mode3 == 0:
		var hit := _side_wall(10.0, 0)
		var rot := 0
		if hit == 0:
			rot = _ikou3(_tx, _tz, 1536)
			if rot == 0: rot = 1536 if _rnd(2) else -1536
		else: rot = hit * 1536
		way = rot; ct0 = 8; ct1 = 0
		mode3 = 1
	match mode3:
		1:
			_ay += way
			_add_speed(0)
			if ct0 > 0: ct0 -= 1
			elif not _x3c:
				mode1 = 1; mode2 = 2; mode3 = 0; way = 1152
		2:
			_ay += way
			_add_speed(0)
			if not _x3c:
				mode1 = 1; mode2 = 2; mode3 = 0; way = 1152
			else:
				ct0 += 1
				if ct0 - 1 >= 8:
					ct0 = 19; spd = 0.3; mode3 = 3
		3:
			_speed_down(0.1, 0.08)
			_ikou(_tx, _tz, 256)
			ct0 -= 1
			if ct0 + 1 <= 0:
				mode1 = 1; mode2 = 2; mode3 = 0; way = 1152
	_run_motion(way)

## MV04: backs off (7) and waits (49) facing Claire while she is caught
func _mv04() -> void:
	var cp: Vector3 = player.bone_pos("b00") if player != null else _pl
	if mode3 == 0:
		_chg(7, 0, 7)
		x10 |= 0x40000000
		mode1 = 0; mode3 = 1
	if mode3 == 1:
		_ay += _ikou3(cp.x, cp.z, 512)
		if flg & 0x2000000:
			_chg(49, 0, 0)
			x10 &= ~0x40000000
			mode1 = 1; mode3 = 2
	elif mode3 == 2:
		_ay += _ikou3(cp.x, cp.z, 512)
		if _free:
			mode1 = 1; mode2 = 2; mode3 = 0; x10 &= ~0x2000000

## MV05: gets up (15, in a narrow place 46)
func _mv05() -> void:
	if mode3 == 0:
		if w.no == 45: _ay += 32768
		if x10 & 0x8000:
			_chg(46, 0, 0); x10 &= ~0x40000000
		else: _chg(15, 0, 0)
		x10 |= 0x100000
		flg2 |= 1
		mode3 = 1
	_ay += _ikou3(_pl.x, _pl.z, 512)
	if (w.frm >> 16) >= 30: x10 &= ~0x100000
	if (w.frm >> 16) == w.nf - 1:
		if x10 & 0x8000:
			mode1 = 1; mode2 = 2; mode3 = 0; x10 &= ~0x2000000
		else:
			mode1 = 0; mode2 = 4; mode3 = 0
		flg2 &= ~1

## MV06: lost Claire: trots around (0)
func _mv06() -> void:
	x10 |= 0x80
	if mode3 == 0:
		_chg(0, 0, 7)
		way = 256 - _rnd(7) * 16
		ct0 = _rnd(32) + 45; ct1 = 0
		_tx = _pl.x; _tz = _pl.z
		x10 &= ~0x4000
		mode3 = 1
	match mode3:
		1:
			spd = 0.15
			_add_speed(0)
			_ay += way
			ct0 -= 1
			if ct0 == 0:
				ct0 = _rnd(32) + 15; mode3 = 2
		2:
			_add_speed(0)
			ct0 -= 1
			if ct0 == 0 or _x3c:
				way = _ikou3(_pl.x, _pl.z, 256 - _rnd(7) * 16)
				mode3 = 1; ct0 = _rnd(32) + 45
		3:
			_add_speed(0)
			_escape(600, 256)
			if x10 & 0x4000: mode3 = 0
	if mode3 != 3:
		var rot := _dir(position.x, position.z, _pl.x, _pl.z)
		if _dir_wall(rot, 8.0):
			_e50 = 0; _e4c = 0; _e48 = 0
			mode3 = 3

## bhEne04_Escape
func _escape(res: int, r: int) -> int:
	var d := 0
	match _e48:
		0, 1:
			if _e48 == 0:
				var t := _ikou3(_pl.x, _pl.z, r)
				wax = t if t != 0 else r
				x10 &= ~0x4000; _e4c = 0; _e48 = 1
			if _x3c:
				_e48 += 1; d = wax
			if _e4c > 8: _e4c = 8
		2:
			if not (x6 & 0xF):
				_e48 += 1; _e50 = 0
				waz = _side_wall(3.0, 1)
				if waz == 0: waz = -1
				waz = -waz
			_ay += wax
			d = wax
			if _e4c > 8: _e4c = 8
		3:
			if (not _dir_wall(waz * 16384, 3.0) and _e50 == 0) or (x6 & 1):
				d = 0; _e48 = 4; wax = waz; _e50 = 0x4000
			else:
				d = 0
				if _e50 > 0: _e50 -= 1
		4:
			_ay += wax * r
			_e50 -= r
			if _e50 <= 0:
				_e48 = 3; _e50 = 4
			d = wax
	var rot := _dir(position.x, position.z, _pl.x, _pl.z)
	if not _dir_wall(rot, 4.0) and _e4c > 12:
		waz = 0; x10 |= 0x4000
	_e4c += 1
	if _e4c > res: _e48 = 0
	return (0 if d == 0 else (1 if d > 0 else -1)) + 1

## MV07: the leap (4 take-off, 5 flight, 6 landing; 20 a wall in the way)
func _mv07() -> void:
	if mode3 == 0:
		_chg(4, 0, 7)
		spd = 0.4; ct0 = 11
		mode3 = 1
	match mode3:
		1:
			_add_speed(0)
			ct0 -= 1
			if ct0 <= 0:
				ct0 = 0; _x48 = 2.2; x10 |= 0x400; spd = 1.9
				mode3 = 2
		2:
			_add_speed(0)
			position.y += (_x48 - 0.28 * ct0) * S
			ct0 += 1
			if (w.frm >> 16) >= 13 or (flg & 0x2000000):
				if _leap_hit(): return
			elif _ply_damage_check(0) != 0:
				_chg(8, 0, 5)
				mode1 = 0; mode2 = 8; mode3 = 2
				_pl_damage(6)
				return
			if (w.frm >> 16) == 17:
				_chg(5, 0, 0); mode3 = 3
		3:
			_add_speed(0)
			position.y += (_x48 - 0.28 * ct0) * S
			ct0 += 1
			var hp_ := _obj(5)
			var a := _ay * BAMS
			var hp2 := Vector3(hp_.x - 6.0 * S * sin(a), hp_.y, hp_.z - 6.0 * S * cos(a))
			if _leap_hit(): return
			var h: Variant = _line_hit(hp_, hp2)
			if h != null:
				var nrm: Vector3 = h[1]
				var back := Vector3(-sin(a + PI), 0, -cos(a + PI))
				if nrm.dot(back) > cos(8192 * BAMS):
					ayp = int(10430.381 * atan2(nrm.x, nrm.z))
					ayp = (ayp - _ay) & 0xFFFF
					if ayp > 32768: ayp = ayp - 32768 - 32768
					_chg(20, 0, 0)
					mode3 = 6; ct0 = 0
					return
			if ct0 > 7:
				_chg(6, 0, 0); mode3 = 4
		4:
			_add_speed(0)
			position.y += (_x48 - 0.28 * ct0) * S
			if position.y <= _ground():
				flg |= 0x100; position.y = _ground()
			ct0 += 1
			if (w.frm >> 16) == 9:
				mode3 = 5; x10 &= ~0x400
		5:
			_add_speed(0)
			_speed_down(0.2, 1.2)
			if (w.frm >> 16) == w.nf - 1:
				mode1 = 1; mode2 = 2; mode3 = 0
		6:
			if (w.frm >> 16) < 8: _ay += int(ayp / 8.0)
			spd = 2.0 - ct0 * 0.1
			_add_speed(0)
			ct0 += 1
			if (w.frm >> 16) == 11:
				ct0 = 10; spd = 1.9; mode3 = 7
		7:
			_add_speed(32768)
			_speed_down(0.2, 1.2)
			position.y += (_x48 - 0.28 * ct0) * S
			if position.y <= _ground():
				x10 &= ~0x400; flg |= 0x100; position.y = _ground()
			ct0 += 1
			if (w.frm >> 16) == 20:
				_chg(1, 0, 5)
				_ay += 32768
				mode1 = 1; mode2 = 2; mode3 = 0

## MV07: the jaws reach Claire: knocked down (12 damage, MV08 mtn 9) or, below 12 hp, the fatal NG01
func _leap_hit() -> bool:
	var ret := _ply_damage_check(1)
	if ret == 2:
		mode0 = 2; mode1 = 0; mode2 = 1; mode3 = 0
		x10 &= ~0x400; x10 |= 0x4000000
		_free = false
		return true
	if ret == 1:
		_chg(9, 0, 0)
		mode1 = 0; mode2 = 8; mode3 = 0
		_pl_damage(12)
		return true
	return false

func _pl_damage(n: int) -> void:
	if player != null: player.hp -= n

## MV08: after the leap hit Claire: lands (8 / 9) and runs off (1)
func _mv08() -> void:
	if mode3 == 0:
		x10 |= 0x800
		ct0 = 8; ct1 = 5; _x48 = 2.2; way = 0; spd = 0.8; car = 1.5
		mode3 = 1
	match mode3:
		1:
			var frm := w.frm >> 16
			if frm < 10:
				spd = 1.2 - ct0 * 0.05
				_add_speed(0)
				ct0 += 1
			if frm >= 14 and frm < 26:
				car = CAR
				position.y += (_x48 - 0.28 * ct1) * S
				if position.y <= _ground():
					x10 &= ~0x400; flg |= 0x100; position.y = _ground()
				else:
					spd = 0.8; _add_speed(32768)
				ct1 += 1
			if (w.frm >> 16) == 26:
				_chg(1, 0, 5)
				_ay += 32768
				mode1 = 1; mode2 = 2; mode3 = 0
		2, 3:
			if mode3 == 2:
				x10 |= 0x800
				ct0 = 0; ct1 = 10; _x48 = 2.5
				# the side to turn: the walls beside Claire (with the dog's way)
				var keep := position
				position = Vector3(_pl.x, position.y, _pl.z)
				spd = 1.0
				way = _side_wall(5.0, 3)
				position = keep
				_tx = position.x - 40.0 * S * sin(_ay * BAMS); _tz = position.z - 40.0 * S * cos(_ay * BAMS)
				if way == 3: way = 0
				else:
					if way == 0: way = 1
					if _line_hit(position, Vector3(_tx, position.y, _tz)) != null: way = 0
					if way > 0: w.md |= 2
					way *= 546
				mode3 = 3
			var frm := w.frm >> 16
			if frm >= 4 and frm < 14: _ay += way
			var jump := 0.0
			if frm < 13:
				jump = 0.3 - ct0 * 0.02; ct0 += 1
			else:
				jump = _x48 - 0.28 * ct1; ct1 += 1
			position.y += jump * S
			if position.y <= _ground():
				x10 &= ~0x400; flg |= 0x100; position.y = _ground()
			if frm == 26:
				mode3 = 5 if way == 0 else 4
				_chg(1, 0, 5)
				way = 1152; spd = 0.08; ct0 = 12
		4:
			ct0 -= 1
			if ct0 < 0:
				x0 = 132; mode1 = 1; mode2 = 2; mode3 = 1
			_speed_up(0.1, 1.2)
			_add_speed(0)
			_run_motion(0)
		5:
			_add_speed(-1280)
			if ct0 == 0:
				_speed_down(0.07, 0.05)
				if spd <= 0.05: ct0 += 1
			else: _speed_up(0.07, 1.2)
			_ay += 1280
			wax += 1280
			if (wax & 0xFFFF) >= 32768:
				mode1 = 1; mode2 = 2; mode3 = 0
			_run_motion(1280)

## MV09: snaps sideways (36): 6 damage
func _mv09() -> void:
	if mode3 == 0:
		_chg(36, 0, 5)
		spd = 0.0; way = -546
		x10 |= 0x40000000
		mode3 = 1
	var frm := w.frm >> 16
	if frm >= 4 and frm < 14:
		_ay += way
		if _ply_damage_check(0) != 0: _pl_damage(6)
	if flg & 0x2000000:
		x10 &= ~0x40000000
		_chg(1, 0, 0)
		_run_restart()

func _run_restart() -> void:
	wax = 0; ct0 = 0; ct1 = 0; ct2 = 0
	if x10 & 0x800: ct1 = _rnd(15) + 20
	x10 &= ~0x3000; x10 &= ~0x4000
	spd = 0.6
	_tx = _pl.x; _tz = _pl.z
	mode1 = 1; mode2 = 2; mode3 = 1

func _mv10() -> void:
	if mode3 == 0:
		_chg(33, 0, 5); mode3 = 1
	if (w.frm >> 16) < 8: _ay += int(ayp / 8.0)
	_speed_up(0.1, 1.2)
	_add_speed(0)
	if flg & 0x2000000:
		_chg(1, 0, 0)
		_run_restart()

## MV12: Claire is dead: walks up (0) and eats (42, 43)
func _mv12() -> void:
	if mode3 == 0:
		_chg(0, 0, 7); mode3 = 1
	match mode3:
		1:
			spd = 0.15
			_add_speed(0)
			_ay += _ikou3(_pl1.x, _pl1.z, 256)
			if _dist <= 9.0:
				_chg(42, 0, 7); x10 |= 0x40000000; mode3 = 2
		2:
			_ay += _ikou3(_pl1.x, _pl1.z, 256)
			if flg & 0x2000000:
				x10 &= ~0x40000000
				_chg(43, 0, 7); mode3 = 3

# ---------------------------------------------------------------- Nage (mode0 2)

## bhEne04_NGType00
func _nage() -> void:
	x10 &= ~0x80
	if mode3 == 0:
		if _cdir(_pay, _ay) == 0: x10 |= 0x200
		else: x10 &= ~0x200
	if mode2 == 1: _ng01()
	else: _ng00()

## NG00: the bite (17), shakes her (18: 8 damage a loop) until she struggles free (ct0 60 - lever), lets go (19)
func _ng00() -> void:
	if mode3 == 0:
		_chg(17, 0, 5)
		_ay = _dir(position.x, position.z, _pl.x, _pl.z) & 0xFFFF
		flg &= ~0x40
		x10 |= 0x40000 | 0x80000
		_pm0 = 4; _pm1 = 0; _pm3 = 0; pl_state = "held"
		ct0 = 60
		mode3 = 1
	match mode3:
		1:
			if (w.frm >> 16) == 12: bit += 1
			if flg & 0x2000000:
				_chg(18, 0, 0); mode3 = 2
		2:
			if (w.frm >> 16) == 1 and player != null:
				player.hp = maxi(0, player.hp - 8); bit += 1
			ct0 -= lever + 1
			lever = 0
			if ct0 < 0 and (flg & 0x2000000):
				_chg(19, 0, 0)
				mode3 = 3; _pm3 += 1
				flg |= 0x20
		3:
			if flg & 0x2000000:
				var o := _obj(0)
				position.x = o.x; position.z = o.z
				_P[0].x = 0.0; _P[0].z = 0.0
				x10 &= ~0x80000
				_chg(14, 0, 0)
				mode3 = 4
		4:
			if (w.frm >> 16) == w.nf - 1:
				flg |= 0x40
				w.add = 0
				mode0 = 1; mode1 = 0; mode2 = 5; mode3 = 0
				x10 |= 0x2100000

## NG01: Claire below 12 hp: the dog brings her down (16) and feeds (25)
func _ng01() -> void:
	if mode3 == 0:
		position.y = _ground()
		_chg(16, 0, 5)
		_ay = _dir(position.x, position.z, _pl.x, _pl.z) & 0xFFFF
		flg &= ~0x40
		x10 |= 0x40000 | 0x80000
		x10 &= ~0xF; x10 |= 2
		_pm0 = 6; _pm1 = 1; _pm3 = 0; pl_state = "held"
		mode3 = 1
	if mode3 == 1:
		if flg & 0x2000000:
			var o := _obj(0)
			position.x = o.x; position.z = o.z
			_chg(25, 0, 0)
			x10 &= ~0x40C0000
			flg |= 0x20
			mode3 = 2

# ---------------------------------------------------------------- Claire (PlyDG00 / PlyDG01, PlayerLink)

func _ply_motion(m: int, hokan: int) -> void:
	_pfrm = 0; _pnf = PLY_NF[m]
	if player != null: player.play_sync(PLY_CLIP[m], false, hokan / 30.0)

## bhEne04_PlayerControl
func _player_control() -> void:
	if not (x10 & 0x40000) or not (_pm0 == 4 or _pm0 == 6): return
	if _pm3 > 0:
		_pfrm += 1
		if _pfrm >= _pnf: _pfrm = 0
	if _pm1 == 0: _ply_dg00()
	else: _ply_dg01()

## bhEne04_PlyDG00: bitten from the front (100), held (101), shakes it off (102)
func _ply_dg00() -> void:
	match _pm3:
		0:
			_ply_motion(100, 5)
			_link = PLY_OFS; waxp = -32768
			_pm3 = 1
		1:
			if _pfrm == 0:
				_ply_motion(101, 0)
				_pm3 = 2
		3:
			_ply_motion(102, 0)
			_pm3 = 4
		4:
			if _pfrm == 0:
				# her root's place is her new position; her own stand motion (42) follows
				if player != null:
					var r: Vector3 = player.bone_pos("b00")
					player.place(r.x, player.position.y, r.z, player.heading)
				_pm3 = 5
		5:
			_pm0 = 1; pl_state = "free"
			x10 &= ~0x4040000

## bhEne04_PlyDG01: the fatal leap, from the front (103) or behind (104)
func _ply_dg01() -> void:
	match _pm3:
		0:
			if x10 & 0x200:
				_ply_motion(103, 5); _link = PLY_OFS_F; waxp = -32768
			else:
				_ply_motion(104, 5); _link = PLY_OFS_B; waxp = 0
			if player != null: player.hp = -1
			_pm3 = 1
		1:
			if _pfrm == _pnf - 1:
				pl_state = "dead"; _pm3 = 2

## bhEne04_PlayerLink: Claire at the offset in the dog's frame, turned by waxp
func _player_link() -> void:
	if not (x10 & 0x80000) or player == null: return
	var a := _ay * BAMS
	var off := Vector3(_link.x * cos(a) + _link.z * sin(a), 0, -_link.x * sin(a) + _link.z * cos(a)) * S
	player.place(position.x + off.x, player.position.y, position.z + off.z, ((_ay + waxp) & 0xFFFF) * BAMS)
	_pl = player.position

## bhEne04_PlyDamageCheck: the jaws (object 5, r 1.2) against Claire: 1 she is knocked down, 2 the fatal leap (type 1)
func _ply_damage_check(typ: int) -> int:
	if not _free or player == null or player.hp < 0: return 0
	var c := _obj(5)
	var a: Vector3 = player.position + Vector3(0, 0.3, 0)
	var b: Vector3 = player.head_pos()
	var q := Geometry3D.get_closest_point_to_segment(c, a, b)
	if q.distance_to(c) > 1.2 * S + PL_R: return 0
	var front := _cdir(_pay, _ay) == 0
	if typ == 1 and player.hp < 12: return 2
	_free = false
	pl_hurt = 1 if front else 2
	return 1

# ---------------------------------------------------------------- Damage (mode0 3) / Die (mode0 4)

func _damage() -> void:
	x10 &= ~0x80
	_dg00()

## DG00: knocked back (10 from behind / 11 from the front; in a narrow place 45 / 44; in the air 12), lies (14)
func _dg00() -> void:
	if mode3 == 0:
		ct0 = 0
		if x10 & 0x400:
			flg &= ~0x100
			x10 &= ~0x8400
			position.y += 3.8 * S
			_x48 = 1.0
			_chg(12, 0, 5)
		elif x10 & 0x8000:
			spd = 0.0
			var no := 0
			if x10 & 0x100:
				way = -28672; no = 45
			else:
				way = 4096; no = 44
			mode3 = 2
			_chg(no, 0, 5)
			x10 |= 0x40000000
			return
		else:
			spd = 0.0
			var no := 0
			if x10 & 0x100:
				way = -28672; no = 10
			else:
				way = 4096; no = 11
			_chg(no, 0, 5)
			x10 &= ~0x40000000
		mode3 = 1
	match mode3:
		1:
			if w.no == 12:
				position.y += (absf(_x48) * sin(8192 * BAMS) - 0.2 * ct0) * S
				if _ground() > position.y: position.y = _ground()
				else:
					spd = _x48 * cos(8192 * BAMS)
					_add_speed(32768)
				ct0 += 1
			elif (w.frm >> 16) > 3:
				spd += 0.25 - 0.05 * ct0
				if spd < 0.0: spd = 0.0
				_add_speed(way)
				ct0 += 1
			if flg & 0x2000000:
				flg |= 0x100
				var h := 0
				if w.no == 11: _ay += 32768
				elif w.no == 12: h = 5
				_chg(14, 0, h)
				position.y = _ground()
				mode3 = 2
		2:
			if (w.frm >> 16) == w.nf - 1:
				w.add = 0
				if hp < 0:
					mode0 = 4; mode1 = 0; mode2 = 0; mode3 = 0
					return
				mode0 = 1; mode1 = 0; mode2 = 5; mode3 = 0
				x10 |= 0x2100000

## DD00: lies dead (the last frame of 14)
func _die() -> void:
	x10 &= ~0x80
	if mode3 == 0:
		flg |= 2; flg &= ~0x28
		mode3 = 1

## bhEne04_DmgChk / DamageAdd / ChgDmgMode (a handgun hit: En04_WpnDamageTbl[2] nm_act 0, cb_act 3 -> DG00)
func hit(dmg: float) -> void:
	if not hittable: return
	if hp >= 0: hp -= dmg
	etype = 0
	if mode0 >= 3: return
	flg |= 0x40
	# comb_flg 4 (bhEne_DGDirCheck: the shot comes from in front of the dog) -> EXP0 0x100
	var dv := position - _pl
	if forward().dot(Vector3(dv.x, 0, dv.z)) <= 0: x10 |= 0x100
	else: x10 &= ~0x100
	if x10 & 0x100000:
		# getting up (MV05, first 30 frames): falls straight back down (14)
		mode0 = 3; mode1 = 0; mode2 = 0; mode3 = 2
		_chg(14, 0, 10)
		x10 &= ~0x100000
		_release()
		return
	mode0 = 3; mode1 = 0; mode2 = 0; mode3 = 0
	_release()

## a hit makes the dog holding Claire let go (she is back in control)
func _release() -> void:
	if x10 & 0x4000000:
		x10 &= ~0x40C0000
		if pl_state == "held" and player != null and player.hp >= 0:
			_pm0 = 1; pl_state = "free"