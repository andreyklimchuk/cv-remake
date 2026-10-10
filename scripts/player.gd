class_name Player
extends Node3D
## Claire (port of player.ts): original pl00 motion clips per damage level, tank / camera-relative movement,
## knife and handgun state machines on the original weapon motions, lighter arm IK, ponytail, footsteps.

const CLIPS := {"idle": ["m35", "m36", "m37"], "walk": ["m00", "m02", "m03"], "run": ["m04", "m07", "m08"], "back": ["m11", "m12", "m13"], "turnL": ["m46"], "turnR": ["m47"]}
## speed scale of the Danger walk / run: clip duration ratio (m03 39 vs 35 frames, m08 25 vs 19 frames)
const DANGER_SPD := {"walk": 35.0 / 39.0, "run": 19.0 / 25.0}
const WALK := 1.05
const RUN := 2.6
const TURN := 2.6
const RADIUS := 0.2
## PlyInfo[Claire]: ar 3.5, ah 16.5 (walls of bhCheckWallEx)
const AR := 0.35
const AH := 1.65
const W_KNIFE := {"draw": "k00", "act": ["k01", "k04", "k07"], "stance": ["k03", "k06", "k09"], "drawT": 9.0 / 30.0, "actT": 24.0 / 30.0, "hitT": 8.0 / 30.0}
const W_GUN := {"draw": "g00", "act": ["g01", "g03", "g05"], "stance": ["g02", "g04", "g06"], "drawT": 9.0 / 30.0, "actT": 16.0 / 30.0, "hitT": 1.0 / 30.0}
## M-100P (pl00w09 bank, wpnr_no 9; slots 100+NN = clips pNN, tools/room_clips/claire.json): 100 draw (8 frames),
## 101/106/111 shot forward/up/down (10 frames, PlMtnWpn[4] + 0/5/10), 104/109/114 aim stances (PlMtnWpn[1..3]);
## the bank has no reload motion (116) — the M-100P is loaded by combining (combidata 142 + 143)
const W_M100P := {"draw": "p00", "act": ["p01", "p06", "p11"], "stance": ["p04", "p09", "p14"], "drawT": 8.0 / 30.0, "actT": 10.0 / 30.0, "hitT": 0.0}
const G_RELOAD := "g07"
const G_RELOAD_T := 32.0 / 30.0
## PlFootSnd[0]: walk (m00) frames 10 / 28, run (m04) 8 / 18, walk back (m11) 10 / 28; left foot first
const FOOT := {"m00": [10, 28, 0], "m02": [10, 28, 0], "m03": [10, 28, 0], "m04": [8, 18, 1], "m07": [8, 18, 1], "m08": [8, 18, 1], "m11": [10, 28, 0], "m12": [10, 28, 0], "m13": [10, 28, 0]}

var model: Node3D
var ap: AnimationPlayer
var skel: Skeleton3D
var bones := {}       # bNN / ptN -> bone index
var cur := ""
var heading := 0.0
var state := "idle"
var frozen := false
## footstep: bone name (b17 left / b21 right), 0 walk / 1 run
var on_step: Callable
var _step_prev := -1
var _step_clip := ""
var _tail: Array[int] = []
var _tail_rest: Array[Quaternion] = []
var _last_pos := Vector3.ZERO
var _last_head := 0.0
## bhObjClpn / bhCalcHair (objitm.c / player.c): the ponytail object (pl00 MDL 1, 4 joints) state, Ninja units
var _hr := {}
var _hr_acc := 0.0
var _hr_q: Array[Quaternion] = []
var _mix_time := 0.0
var lighter_on := false
var _lighter: Node3D = null
var _knife_hand: Node3D = null
var _gun_hand: Node3D = null
## M-100P: pl00w09_R (joint 9) and pl00w09_L (joint 13)
var _m100_r: Node3D = null
var _m100_l: Node3D = null
var gun_on := false
## the equipped gun item (9 handgun, 142 M-100P)
var gun_id := 9
var knife_on := false
## fire request (p, dir, aim) -> bool; reload request -> bool; can fire -> bool; empty click
var on_fire: Callable
var need_reload: Callable
var can_fire: Callable
var empty_click: Callable
var on_slash: Callable
var _skin_hand_r: Array = []   # [MeshInstance3D, surface, material]
var _skin_hand_l: Array = []
var _zippo_parts: Array[MeshInstance3D] = []
## health (player.c: 160 on Normal; Fine >= 120, Caution >= 30, Danger below 30)
var hp := 160
## externally driven motion (grabbed, death)
var sync: Variant = null
var aiming := false
var slash_t := -1.0
var _k_state := "none"
var _k_t := 0.0
var _k_dir := 0
var _k_queued := false
var _slash_hit := false
var _flame: Node3D
var _flame_t := 0.0
var _arm_blend := 0.0
var _attach: BoneAttachment3D
## stairs (bhCPM2_act_kdu / kdd, mode2 14/15): {} = not on stairs; on_kaidan_end(atr) clears the use flags
var kdn := {}
var on_kaidan_end: Callable
var _kdn_acc := 0.0
var _fix_off := Vector3.ZERO
var _fix_t := -1.0
var _hold_y := false   # after the stairs: py stays at rom->grand until the player moves

func load_model() -> void:
	model = Assets.scene("chars/claire.glb")
	Assets.to_lambert(model, "chr")
	add_child(model)
	ap = Assets.find_type(model, "AnimationPlayer") as AnimationPlayer
	ap.callback_mode_process = AnimationMixer.ANIMATION_CALLBACK_MODE_PROCESS_MANUAL
	ap.deterministic = false
	skel = Assets.find_type(model, "Skeleton3D") as Skeleton3D
	for i in skel.get_bone_count():
		bones[skel.get_bone_name(i)] = i
	for mi in Assets.find_meshes(model):
		mi.extra_cull_margin = 2.0
		for s in mi.mesh.get_surface_count():
			var m: Material = mi.get_surface_override_material(s)
			if m and m.resource_name.contains("handR"):
				_skin_hand_r.append([mi, s, m])
			if m and m.resource_name.contains("handL"):
				_skin_hand_l.append([mi, s, m])
	play("idle", 0)
	for i in 4:
		var b: int = bones.get("pt%d" % i, -1)
		if b >= 0:
			_tail.append(b); _tail_rest.append(skel.get_bone_pose_rotation(b))
	hair_reset()
	_load_hands()

func _load_hand(file: String, att: BoneAttachment3D = null) -> Node3D:
	var m := Assets.scene(file)
	if m == null:
		return null
	Assets.to_lambert(m, "chr")
	m.scale = Vector3.ONE * 0.1
	m.visible = false
	for mi in Assets.find_meshes(m):
		mi.extra_cull_margin = 1.0
	(att if att != null else _attach).add_child(m)
	return m

func _load_hands() -> void:
	_attach = BoneAttachment3D.new()
	_attach.bone_name = "b09"
	skel.add_child(_attach)
	_lighter = _load_hand("chars/hand_zippo.glb")
	if _lighter:
		for mi in Assets.find_meshes(_lighter):
			var m: Material = mi.get_surface_override_material(0)
			if m and m.resource_name.ends_with("_t0"):
				_zippo_parts.append(mi)
	_knife_hand = _load_hand("chars/hand_knife.glb")
	_gun_hand = _load_hand("chars/hand_gun.glb")
	_m100_r = _load_hand("chars/hand_m100p_R.glb")
	var la := BoneAttachment3D.new(); la.bone_name = "b13"; skel.add_child(la)
	_m100_l = _load_hand("chars/hand_m100p_L.glb", la)
	# lighter flame: additive cone + core
	_flame = Node3D.new()
	var mat := StandardMaterial3D.new()
	mat.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat.blend_mode = BaseMaterial3D.BLEND_MODE_ADD
	mat.no_depth_test = false
	mat.depth_draw_mode = BaseMaterial3D.DEPTH_DRAW_DISABLED
	mat.cull_mode = BaseMaterial3D.CULL_DISABLED
	mat.albedo_color = Color8(0xff, 0xb0, 0x40, 230)
	var cone := MeshInstance3D.new()
	var cm := CylinderMesh.new(); cm.top_radius = 0.0; cm.bottom_radius = 0.009; cm.height = 0.035; cm.radial_segments = 10; cm.rings = 1
	cm.cap_top = false; cm.cap_bottom = false
	cone.mesh = cm; cone.position.y = 0.0175; cone.material_override = mat
	var core := MeshInstance3D.new()
	var sm := SphereMesh.new(); sm.radius = 0.006; sm.height = 0.012; sm.radial_segments = 8; sm.rings = 6
	var mat2: StandardMaterial3D = mat.duplicate(); mat2.albedo_color = Color8(0xff, 0xf0, 0xc0, 230)
	core.mesh = sm; core.position.y = 0.006; core.material_override = mat2
	_flame.add_child(cone); _flame.add_child(core)
	_flame.visible = false
	add_child(_flame)

func set_lighter(on: bool) -> void:
	lighter_on = on and _lighter != null

func set_knife(on: bool) -> void:
	knife_on = on and _knife_hand != null
	if not knife_on and not gun_on:
		aiming = false; slash_t = -1

func set_gun(on: bool, id := 9) -> void:
	if on and id != gun_id: _k_state = "none"
	gun_id = id
	gun_on = on and (_gun_hand != null if id != 142 else _m100_r != null)
	if gun_on: knife_on = false
	if not knife_on and not gun_on:
		aiming = false; slash_t = -1
	_k_state = "none"

func _wpn() -> Dictionary:
	if gun_on: return W_M100P if gun_id == 142 else W_GUN
	return W_KNIFE

func _update_hands() -> void:
	var zippo := _arm_blend > 0.5
	var knife := knife_on and not zippo
	var gun := gun_on and not zippo
	if _lighter: _lighter.visible = zippo
	if _knife_hand: _knife_hand.visible = knife
	var m100 := gun and gun_id == 142
	if _gun_hand: _gun_hand.visible = gun and not m100
	if _m100_r: _m100_r.visible = m100
	if _m100_l: _m100_l.visible = m100
	var show_skin := not zippo and not knife and not gun
	for e in _skin_hand_r:
		(e[0] as MeshInstance3D).set_surface_override_material(e[1], e[2] if show_skin else Assets.hidden_mat)
	for e in _skin_hand_l:
		(e[0] as MeshInstance3D).set_surface_override_material(e[1], e[2] if not m100 else Assets.hidden_mat)

## damage level of the motions (player.c bhSetPlayer / bhCheckPlayerKegaMotion)
func dmlvl() -> int:
	return 0 if hp >= 120 else (1 if hp >= 30 else 2)

func play(name_: String, fade := 0.18, speed := 1.0) -> void:
	var c: Array = CLIPS[name_]
	_play_id(c[mini(c.size() - 1, dmlvl())], fade, true, speed)

func _play_id(id: String, fade: float, loop: bool, speed := 1.0, restart := false) -> void:
	if not ap.has_animation(id):
		return
	ap.speed_scale = speed
	if cur == id and not restart:
		return
	if cur == id:
		ap.play(id); ap.seek(0.0, true); return
	var a := ap.get_animation(id)
	a.loop_mode = Animation.LOOP_LINEAR if loop else Animation.LOOP_NONE
	var had := cur != "" and ap.is_playing()
	if ap.current_animation == id:
		ap.stop()
	ap.play(id, fade if (had and fade > 0) else 0.0)
	cur = id

func forward() -> Vector3:
	return Vector3(-sin(heading), 0, -cos(heading))

func place(x: float, y: float, z: float, h: float) -> void:
	position = Vector3(x, y, z); heading = h; rotation.y = h; _last_pos = position; _last_head = h
	if not kdn.is_empty() and on_kaidan_end.is_valid(): on_kaidan_end.call(kdn.a)
	kdn = {}; _hold_y = false; _fix_t = -1.0
	if model: model.position = Vector3.ZERO
	hair_reset()

func bone_xform(i: int) -> Transform3D:
	return skel.global_transform * skel.get_bone_global_pose(i)

func bone_pos(nm: String) -> Vector3:
	var i: int = bones.get(nm, -1)
	return bone_xform(i).origin if i >= 0 else global_position

## world position of Claire's head (camera target)
func head_pos() -> Vector3:
	if bones.has("b05") and is_inside_tree():
		return bone_xform(bones.b05).origin
	return position + Vector3(0, 1.5, 0)

func play_sync(id: Variant, loop := false, fade := 0.08) -> void:
	sync = id; aiming = false; _k_state = "none"
	if id != null: _play_id(id, fade, loop)
	else: play("idle", 0.25)

func update(dt: float, inp: GameInput, room: Room, cam_yaw: Variant = null) -> void:
	if not kdn.is_empty() and sync == null:
		state = "stairs"; aiming = false; _k_state = "none"
		if not frozen:
			_kdn_acc = minf(_kdn_acc + dt, 0.25)
			while _kdn_acc >= 1.0 / 30.0 and not kdn.is_empty():
				_kdn_acc -= 1.0 / 30.0; _kdn_tick(room)
		rotation.y = heading
		_update_tail(dt); _update_lighter(dt); _update_hands(); return
	if _fix_t >= 0.0:
		_fix_t += dt
		var w := minf(1.0, _fix_t / (8.0 / 30.0))
		model.position = _fix_off * (1.0 - w) if not frozen else model.position
		if w >= 1.0: _fix_t = -1.0; model.position = Vector3.ZERO
	if sync != null:
		state = "sync"; rotation.y = heading; _advance(dt); _update_tail(dt); _update_lighter(dt); _update_hands(); return
	var speed := 0.0
	var turn := 0.0
	var can_aim := (knife_on or gun_on) and not lighter_on and not frozen
	aiming = can_aim and (inp.aim or _k_state == "slash" or _k_state == "reload")
	if not aiming: _k_state = "none"
	if not frozen and cam_yaw != null:
		var mx := (1 if inp.strafe_r else 0) - (1 if inp.strafe_l else 0)
		var mz := (1 if inp.fwd else 0) - (1 if inp.back else 0)
		var target: Variant = null
		if aiming:
			target = cam_yaw
		elif mx or mz:
			var cy := cos(cam_yaw); var sy := sin(cam_yaw)
			var dx := -sy * mz + cy * mx; var dz := -cy * mz - sy * mx
			target = atan2(-dx, -dz); speed = RUN if inp.run else WALK
		if target != null:
			var d := U.wrap_pi(target - heading)
			var mxt := (14.0 if aiming else 9.0) * dt
			heading += clampf(d, -mxt, mxt)
			if absf(d) > 1.6 and speed > 0: speed *= 0.35
			if speed == 0 and absf(d) > 0.05 and not aiming: turn = signf(d)
	elif not frozen:
		if inp.left: turn += 1
		if inp.right: turn -= 1
		if inp.fwd: speed = RUN if inp.run else WALK
		elif inp.back: speed = -0.62
		if aiming: speed = 0
	var lv := dmlvl()
	if lv == 2 and speed > 0: speed *= DANGER_SPD.run if speed > WALK else DANGER_SPD.walk
	# bhCPM1_act_bas: rtspd 0.8 at dmlvl 2
	heading += turn * TURN * dt * (0.8 if speed > WALK else 1.0) * (0.8 if lv == 2 else 1.0) * (0.0 if cam_yaw != null else 1.0)
	rotation.y = heading
	if aiming: _update_knife(dt, inp)
	elif speed > 0:
		state = "run" if inp.run else "walk"; play(state)
	elif speed < 0:
		state = "back"; play("back")
	elif turn != 0:
		state = "turn"; play("walk", 0.15, 0.7)
	else:
		state = "idle"; play("idle", 0.25)
	if speed != 0:
		_hold_y = false
		var np := room.resolve_pl(position + forward() * speed * dt, AR, room.floor_num(position.y), AH)
		var y: Variant = room.floor_at(np.x, np.z, position.y)
		if y != null and absf(y - position.y) < 0.5:
			position = Vector3(np.x, y, np.z)
	elif not _hold_y:
		var y: Variant = room.floor_at(position.x, position.z, position.y)
		if y != null: position.y = y
	_advance(dt)
	_footsteps()
	_update_tail(dt)
	_update_lighter(dt)
	_update_hands()

## ---- stairs: bhCheckExmAtari type 1 -> mode2 14 (prm0 0, up) / 15 (down); kdu/kdd of player.c at 30 Hz ----
## PlMtnAct[0][dmlvl]: [0] stand 42/43/44, [1] turn 39/40/41, [2] walk 0/2/3; stairs motions 31/32 (35/36 when
## prm2 % 4 == 0, +2 at dmlvl 2) = clips m24..m31, turns m32..m34, stand m35..m37 (pl00 motion order)
const KDN_STAND := ["m35", "m36", "m37"]
const KDN_TURN := ["m32", "m33", "m34"]
const KDN_WALK := ["m00", "m02", "m03"]
const PL_KDU := [19, 6, 15]      # PlKDU[Claire][dlvl]
const KDN_FOOT := {true: [21, 8], false: [20, 8]}   # PlFootSnd[0][0/1][5 kdu / 6 kdd]

func start_kaidan(a: Dictionary) -> void:
	kdn = {"a": a, "up": int(a.prm[0]) == 0, "m3": 0, "f": 0, "end": false}
	_kdn_acc = 0.0

static func _kdn_mtn(n: int) -> String:
	return "m%02d" % (n - 7)

func _root_local(id: String, t: float) -> Vector3:
	var an := ap.get_animation(id)
	if an == null: return Vector3.ZERO
	for k in an.get_track_count():
		if an.track_get_type(k) == Animation.TYPE_POSITION_3D and String(an.track_get_path(k)).ends_with("b00"):
			return an.position_track_interpolate(k, t)
	return Vector3.ZERO

func _kdn_tick(room: Room) -> void:
	var k := kdn
	var a: Dictionary = k.a
	var up: bool = k.up
	var lv := dmlvl()
	var dl := 1 if lv >= 2 else 0
	var bams := int(round(heading / TAU * 65536.0)) & 0xFFFF
	var ayp := -(int(182.04445 * (int(a.prm[1]) * 90)) & 0xFFFF)
	var rt := 0.8 if lv == 2 else 1.0
	match int(k.m3):
		0:
			_play_id(KDN_TURN[lv], 4.0 / 30.0, true)
			k.m3 = 2 if _s16(ayp - _s16(bams)) >= 0 else 1
			ap.speed_scale = 1.0 if k.m3 == 2 else -1.0
			ap.advance(1.0 / 30.0)
			return
		1, 2:
			if absi(_s16(ayp) - _s16(bams)) < 1310:
				k.m3 = 3
			else:
				var st := int(182.04445 * (7.2 * rt))
				bams += st if k.m3 == 2 else -st
				heading = _bams(bams)
				ap.advance(1.0 / 30.0)
				return
	if int(k.m3) == 3:
		var n: int = (35 if int(a.prm[2]) % 4 == 0 else 31) + (0 if up else 1) + (2 if lv >= 2 else 0)
		k.id = _kdn_mtn(n)
		k.ct2 = int(a.prm[2]); k.ct3 = int(a.prm[2]) / 4
		if up:
			k.yn = room.floor_height(room.floor_num(position.y + 0.2 * int(a.prm[2])))
		heading = _bams(ayp)
		position += forward() * (0.1 if up else 0.2)
		_play_id(k.id, 4.0 / 30.0, false, 1.0, true)
		k.n = int(round(ap.get_animation(k.id).length * 30.0)) + 1
		k.py0 = _root_local(k.id, 0.0).y
		k.f = 0; k.end = false
		k.m3 = 5
	if int(k.m3) == 5:
		var pos := _root_local(k.id, k.f / 30.0)
		if not up and position.y + pos.y <= float(a.y) - 0.2 * int(a.prm[2]):
			_kdn_land(room, Vector3(bone_pos("b00").x, float(a.y) - 0.2 * int(a.prm[2]), bone_pos("b00").z), 0.2)
			return
		if k.end:
			if int(k.ct3) > 0: k.ct3 = int(k.ct3) - 1
			position += Basis(Vector3.UP, heading) * Vector3(pos.x, 0, pos.z) + Vector3(0, pos.y - float(k.py0), 0)
			k.f = 0; k.end = false
			ap.seek(0.0, true)
		if up and ((int(k.ct2) % 4 == 0 and int(k.ct3) == 1 and int(k.f) >= PL_KDU[0]) or (int(k.ct2) % 4 != 0 and int(k.ct3) == 0 and int(k.f) >= PL_KDU[1])):
			# the root offset of the stairs motion is kept (flg 0x8040000; the motion engine is not in the
			# decompilation — without it the final px = root object would fall back to the start of the loop):
			# the model is shifted by the offset in step with the 4-frame cross-fade
			k.carry = Vector3(pos.x, pos.y - float(k.py0), pos.z); k.fade = 0
			_play_id(KDN_WALK[lv], 4.0 / 30.0, true, 1.0, true)
			ap.seek(PL_KDU[2] / 30.0, true)
			k.ct1 = 10 if lv < 2 else 4
			if on_step.is_valid(): on_step.call("b21", 0)
			k.m3 = 6
			ap.advance(1.0 / 30.0)
			return
		var fs: Array = KDN_FOOT[up]
		if int(k.f) == fs[0] and on_step.is_valid(): on_step.call("b17", 0)
		if int(k.f) == fs[1] and on_step.is_valid(): on_step.call("b21", 0)
		ap.advance(1.0 / 30.0)
		k.f = int(k.f) + 1
		if int(k.f) >= int(k.n) - 1:
			k.f = int(k.n) - 1; k.end = true
		return
	if int(k.m3) == 6:
		ap.advance(1.0 / 30.0)
		k.fade = int(k.fade) + 1
		model.position = (k.carry as Vector3) * minf(1.0, k.fade / 4.0)
		k.ct1 = int(k.ct1) - 1
		if int(k.ct1) <= 0:
			var b := bone_pos("b00")
			_kdn_land(room, Vector3(b.x, float(k.yn), b.z), 0.0)

## end of the stairs: position from the root object, floor number, py = rom->grand, stand motion (hokan 8)
func _kdn_land(room: Room, p: Vector3, fwd: float) -> void:
	var a: Dictionary = kdn.a
	var rl := Basis(Vector3.UP, -heading) * (bone_pos("b00") - position) - model.position
	model.position = Vector3.ZERO
	position = p + forward() * fwd
	position.y = room.floor_height(room.floor_num(position.y))
	# flg 0x10 again: the wall check of the next frame (bhCheckWallEx) pushes the player out of the walls
	position = room.resolve_pl(position, AR, room.floor_num(position.y), AH)
	_hold_y = true
	kdn = {}
	_play_id(KDN_STAND[dmlvl()], 8.0 / 30.0, true, 1.0, true)
	cur = KDN_STAND[dmlvl()]
	# the cross-fade (hokan 8) blends the root translation of the stairs motion too: the model is shifted back by
	# the fading part of it so the root stays at the new position
	_fix_off = -(rl - _root_local(cur, 0.0))
	_fix_t = 0.0; model.position = _fix_off
	if on_kaidan_end.is_valid(): on_kaidan_end.call(a)
	_last_pos = position

func _advance(dt: float) -> void:
	_mix_time += dt * ap.speed_scale
	ap.advance(dt)

func _footsteps() -> void:
	var f: Variant = FOOT.get(cur) if (state == "walk" or state == "run" or state == "back") else null
	if f == null or ap.current_animation != cur:
		_step_clip = ""; return
	var fr := int(floor(ap.current_animation_position * 30))
	if _step_clip == cur:
		var hit := func(k: int) -> bool: return (_step_prev < k and fr >= k) or (fr < _step_prev and (fr >= k or _step_prev < k))
		if hit.call(f[0]) and on_step.is_valid(): on_step.call("b17", f[2])
		if hit.call(f[1]) and on_step.is_valid(): on_step.call("b21", f[2])
	_step_clip = cur; _step_prev = fr

## knife / handgun: ready (draw) -> stance; attack plays the action of the current direction (up / forward / down)
func _update_knife(dt: float, inp: GameInput) -> void:
	var W := _wpn()
	var dir := 1 if inp.fwd else (2 if inp.back else 0)
	_k_t += dt
	if _k_state == "none":
		_k_state = "draw"; _k_t = 0; _k_queued = false; _play_id(W.draw, 0.12, false, 1, true)
	if inp.attack and _k_state != "stance": _k_queued = true
	if _k_state == "draw" and _k_t >= W.drawT:
		_k_state = "stance"; _k_t = 0
	if _k_state == "reload" and _k_t >= G_RELOAD_T:
		_k_state = "stance"; _k_t = 0; _k_queued = false
	if _k_state == "slash":
		if not _slash_hit and _k_t >= W.hitT:
			_slash_hit = true
			var f := forward()
			var w := bone_pos("b09") if bones.has("b09") else head_pos()
			if gun_on:
				if _k_dir == 1: f.y = 0.6
				elif _k_dir == 2: f.y = -0.6
				f = f.normalized()
				if on_fire.is_valid(): on_fire.call(w, f, _k_dir)
			elif on_slash.is_valid():
				on_slash.call(w + f * 0.25, f)
		if _k_t >= W.actT:
			_k_state = "stance"; _k_t = 0
	if _k_state == "stance":
		if gun_on and need_reload.is_valid() and need_reload.call():
			_k_state = "reload"; _k_t = 0; _play_id(G_RELOAD, 0.1, false, 1, true)
		elif inp.attack or _k_queued:
			_k_queued = false; _k_dir = dir; _slash_hit = false
			if gun_on and on_fire.is_valid() and can_fire.is_valid() and not can_fire.call():
				if empty_click.is_valid(): empty_click.call()
				_k_t = 0; _k_state = "slash"; _slash_hit = true; _play_id(W.stance[dir], 0.15, true)
			else:
				_k_state = "slash"; _k_t = 0; _play_id(W.act[dir], 0.06, false, 1, true)
		else:
			_k_dir = dir; _play_id(W.stance[dir], 0.15, true)
	slash_t = _k_t if _k_state == "slash" else -1.0
	state = "slash" if _k_state == "slash" else ("reload" if _k_state == "reload" else "aim")

# ---- bones in world space
func _bone_wq(i: int) -> Quaternion:
	return (skel.global_basis * skel.get_bone_global_pose(i).basis).orthonormalized().get_rotation_quaternion()

func _parent_wq(i: int) -> Quaternion:
	var p := skel.get_bone_parent(i)
	if p < 0:
		return skel.global_basis.orthonormalized().get_rotation_quaternion()
	return _bone_wq(p)

## rotate bone i so that world direction `from` becomes `to` (blended by w)
func _aim_bone(i: int, from: Vector3, to: Vector3, w: float) -> void:
	if from.length() < 1e-6 or to.length() < 1e-6:
		return
	var a := from.normalized(); var b := to.normalized()
	var q: Quaternion
	if a.dot(b) < -0.9999:
		q = Quaternion(a.cross(Vector3.UP).normalized() if absf(a.y) < 0.9 else a.cross(Vector3.RIGHT).normalized(), PI)
	else:
		q = Quaternion(a, b)
	if w < 1:
		q = Quaternion.IDENTITY.slerp(q, w)
	var wq := _bone_wq(i)
	var pq := _parent_wq(i)
	skel.set_bone_pose_rotation(i, (pq.inverse() * q * wq).normalized())

## pp->flg2 |= 2 (bhInitPonySet 0, a new position): bhObjClpn clears the hair work on its next frame
func hair_reset() -> void:
	_hr = {}

## the hair object: linked to joint 5 at (0, 1.5869, 0.7747) (bhInitPlayer, Claire), flg 0x1000 -> no rotation
const HAIR_LO := Vector3(0, 1.5869, 0.7747)
const NJ := 10.0     # Ninja units per metre
static func _bams(a: float) -> float: return float(int(a) & 0xFFFF) * TAU / 65536.0
static func _s16(a: float) -> int:
	var i := int(a) & 0xFFFF
	return i - 0x10000 if i >= 0x8000 else i

func _update_tail(dt: float) -> void:
	if _tail.size() < 4 or dt <= 0:
		return
	_hr_acc += dt
	while _hr_acc >= 1.0 / 30.0:
		_hr_acc -= 1.0 / 30.0
		_hair_frame()
	if _hr_q.size() == 4:
		# the root object has no rotation of its own (njUnitRotPortion): joint 0 turns in the world's frame
		skel.set_bone_pose_rotation(_tail[0], (_parent_wq(_tail[0]).inverse() * _hr_q[0]).normalized())
		for i in range(1, 4): skel.set_bone_pose_rotation(_tail[i], _hr_q[i])
		skel.set_bone_pose_position(_tail[0], HAIR_LO / NJ)

func _hair_frame() -> void:
	var head := bone_xform(bones.b05)
	var hm := Transform3D(head.basis, head.origin * NJ)     # owP[5].mtx in Ninja units
	var root := hm * HAIR_LO                                  # op->mlwP->owP->mtx[12..14]
	# bhCalcHair: pp->ax/ay/az + the angles of joints 0..5
	var e := Vector3(0, heading * 65536.0 / TAU, 0)
	for j in 6:
		var b: int = bones.get("b%02d" % j, -1)
		if b >= 0: e += skel.get_bone_pose_rotation(b).get_euler(EULER_ORDER_ZYX) * 65536.0 / TAU
	var ax := _s16(e.x); var ay := _s16(e.y); var az := _s16(e.z)
	if _hr.is_empty():
		var ring: Array[Vector3] = []
		ring.resize(128); ring.fill(Vector3.ZERO)
		var z4: Array[Vector3] = [Vector3.ZERO, Vector3.ZERO, Vector3.ZERO, Vector3.ZERO]
		_hr = {"ring": ring, "ct0": 0, "n": Vector3.ZERO, "spd": 0.0, "o": Vector3.ZERO, "sp": Vector3.ZERO,
			"g": z4.duplicate(), "ps": z4.duplicate()}
	var h: Dictionary = _hr
	var ob: Vector3 = h.o
	h.o = root
	var ps := Vector3(root.x - ob.x, 0, root.z - ob.z)
	var m := Basis(Vector3.UP, _bams(-ay)) * Basis(Vector3.RIGHT, _bams(-ax)) * Basis(Vector3.BACK, _bams(-az))
	var sp := m * ps
	sp.y = root.y - ob.y
	sp = sp.clamp(Vector3(-1, -1, -1), Vector3(1, 1, 1))
	h.sp = sp
	var n: Vector3 = h.n
	n += 0.333 * (-sp * 0.25 - n)
	h.n = n
	var ring: Array[Vector3] = h.ring
	var ct0: int = h.ct0
	ring[ct0] = n
	var px := root
	var rx := 0; var ry := 0
	var g: Array[Vector3] = h.g
	var psp: Array[Vector3] = h.ps
	var q: Array[Quaternion] = []
	var rot_y := Basis(Vector3.UP, _bams(ay))
	for i in 4:
		var p3: Vector3 = ring[(ct0 - 3 * i) & 0x7F]
		var ps1 := rot_y * p3
		# (pp->flg2 & 0x100: the joints are pulled 1 unit straight down - its setter is not in the decompilation)
		h.spd = clampf(float(h.spd) + p3.y - 0.333, -0.5, 0.5)
		g[i] = Vector3(px.x + ps1.x, float(h.spd) + px.y + ps1.y, px.z + ps1.z)
		var ps3 := hm * Vector3(0, 1, 0)
		var d := g[i] - ps3
		if Vector2(d.x, d.z).length() < 1.0:
			var u := Vector3(d.x, 0, d.z).normalized()
			g[i].x = ps3.x + u.x; g[i].z = ps3.z + u.z
		psp[i] += 0.333 * (g[i] - psp[i])
		var v := psp[i] - px
		if v.length() > 0.5: psp[i] = px + v.normalized() * 0.5
		var ps5 := hm * Vector3(0, 1.8, -0.3)
		ps5.y = ps3.y
		d = psp[i] - ps5
		if Vector2(d.x, d.z).length() < 1.3:
			var u := Vector3(d.x, 0, d.z).normalized()
			psp[i].x = ps5.x + 1.3 * u.x; psp[i].z = ps5.z + 1.3 * u.z
		v = psp[i] - px
		if v.length() > 0.5:
			v = v.normalized() * 0.5; psp[i] = px + v
		var c := (Basis(Vector3.RIGHT, _bams(rx)) * Basis(Vector3.UP, _bams(ry))) * v
		var a_y := _s16(10430.381 * atan2(c.x, 0.1 + c.z))
		ry -= a_y
		var a_x := _s16(182.04445 * (150.0 * -c.y))
		rx -= a_x
		# objP[i].ang[0] / [1] (ang[2] of the model is 0): the joint's local njRotateXYZ = Rz Ry Rx (tools ninja.euler_m)
		var lb := Basis(Vector3.UP, _bams(a_y)) * Basis(Vector3.RIGHT, _bams(a_x))
		q.append(lb.get_rotation_quaternion())
		px = psp[i]
	h.ct0 = (ct0 + 1) & 0x7F
	_hr_q = q

## lighter: two-bone IK on the right arm (b07 shoulder, b08 elbow, b09 wrist)
func _update_lighter(dt: float) -> void:
	var want := 1.0 if lighter_on else 0.0
	_arm_blend += (want - _arm_blend) * minf(1, dt * 6)
	var S: int = bones.get("b07", -1); var E: int = bones.get("b08", -1); var Wb: int = bones.get("b09", -1)
	var lit := _arm_blend > 0.02 and _lighter != null and S >= 0 and E >= 0 and Wb >= 0 and is_inside_tree()
	_flame.visible = lit and _arm_blend > 0.6
	if not lit:
		return
	var s := bone_xform(S).origin; var e := bone_xform(E).origin; var w := bone_xform(Wb).origin
	var a := s.distance_to(e); var b := e.distance_to(w)
	var f := forward(); var up := Vector3.UP; var right := f.cross(up).normalized()
	var T := s + f * 0.33 + right * -0.06 + up * -0.08
	var dTS := T - s; var d := dTS.length(); var maxd := (a + b) * 0.98
	if d > maxd:
		dTS = dTS.normalized() * maxd; d = maxd; T = s + dTS
	var dir := dTS.normalized()
	var pole := (-up + right * 0.6).normalized()
	var n := (pole - dir * pole.dot(dir)).normalized()
	var cos_a := clampf((a * a + d * d - b * b) / (2 * a * d), -1, 1); var sin_a := sqrt(1 - cos_a * cos_a)
	var e2 := s + dir * (a * cos_a) + n * (a * sin_a)
	_aim_bone(S, e - s, e2 - s, _arm_blend)
	var e3 := bone_xform(E).origin; var w3 := bone_xform(Wb).origin
	_aim_bone(E, w3 - e3, T - e3, _arm_blend)
	# flame on top of the Zippo held in the original hand model
	var hx := bone_xform(Wb) * Transform3D(Basis().scaled(Vector3.ONE * 0.1), Vector3.ZERO)
	var box := AABB()
	var has := false
	for z in _zippo_parts:
		var zx := hx * U.rel_xform(z, _lighter)
		var ab := z.mesh.get_aabb()
		for k in 8:
			var c := zx * ab.get_endpoint(k)
			if not has:
				box = AABB(c, Vector3.ZERO); has = true
			else:
				box = box.expand(c)
	var hand := box.get_center() if has else w
	if has: hand.y = box.end.y - 0.035
	_flame_t += dt
	var top := global_transform.affine_inverse() * (hand + up * 0.035)
	var fl := 1 + sin(_flame_t * 23) * 0.08 + sin(_flame_t * 37.7) * 0.06 + (randf() - 0.5) * 0.08
	_flame.position = top; _flame.scale = Vector3(1, fl, 1)
	_flame.rotation = Vector3(0, 0, 0)
