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
const W_KNIFE := {"draw": "k00", "act": ["k01", "k04", "k07"], "stance": ["k03", "k06", "k09"], "drawT": 9.0 / 30.0, "actT": 24.0 / 30.0, "hitT": 8.0 / 30.0}
const W_GUN := {"draw": "g00", "act": ["g01", "g03", "g05"], "stance": ["g02", "g04", "g06"], "drawT": 9.0 / 30.0, "actT": 16.0 / 30.0, "hitT": 1.0 / 30.0}
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
var _sway := Vector2.ZERO
var _sway_v := Vector2.ZERO
var _last_pos := Vector3.ZERO
var _last_head := 0.0
var _mix_time := 0.0
var lighter_on := false
var _lighter: Node3D = null
var _knife_hand: Node3D = null
var _gun_hand: Node3D = null
var gun_on := false
var knife_on := false
## fire request (p, dir, aim) -> bool; reload request -> bool; can fire -> bool; empty click
var on_fire: Callable
var need_reload: Callable
var can_fire: Callable
var empty_click: Callable
var on_slash: Callable
var _skin_hand_r: Array = []   # [MeshInstance3D, surface, material]
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
	play("idle", 0)
	for i in 4:
		var b: int = bones.get("pt%d" % i, -1)
		if b >= 0:
			_tail.append(b); _tail_rest.append(skel.get_bone_pose_rotation(b))
	_load_hands()

func _load_hand(file: String) -> Node3D:
	var m := Assets.scene(file)
	if m == null:
		return null
	Assets.to_lambert(m, "chr")
	m.scale = Vector3.ONE * 0.1
	m.visible = false
	for mi in Assets.find_meshes(m):
		mi.extra_cull_margin = 1.0
	_attach.add_child(m)
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

func set_gun(on: bool) -> void:
	gun_on = on and _gun_hand != null
	if gun_on: knife_on = false
	if not knife_on and not gun_on:
		aiming = false; slash_t = -1
	_k_state = "none"

func _wpn() -> Dictionary:
	return W_GUN if gun_on else W_KNIFE

func _update_hands() -> void:
	var zippo := _arm_blend > 0.5
	var knife := knife_on and not zippo
	var gun := gun_on and not zippo
	if _lighter: _lighter.visible = zippo
	if _knife_hand: _knife_hand.visible = knife
	if _gun_hand: _gun_hand.visible = gun
	var show_skin := not zippo and not knife and not gun
	for e in _skin_hand_r:
		(e[0] as MeshInstance3D).set_surface_override_material(e[1], e[2] if show_skin else Assets.hidden_mat)

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
		var np := room.resolve(position + forward() * speed * dt, RADIUS)
		var y: Variant = room.floor_at(np.x, np.z, position.y)
		if y != null and absf(y - position.y) < 0.5:
			position = Vector3(np.x, y, np.z)
	else:
		var y: Variant = room.floor_at(position.x, position.z, position.y)
		if y != null: position.y = y
	_advance(dt)
	_footsteps()
	_update_tail(dt)
	_update_lighter(dt)
	_update_hands()

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

func _update_tail(dt: float) -> void:
	if _tail.is_empty() or dt <= 0:
		return
	var vel := (position - _last_pos) / dt; _last_pos = position
	var dh := U.wrap_pi(heading - _last_head) / dt; _last_head = heading
	var f := forward()
	var fv := vel.x * f.x + vel.z * f.z
	var target := Vector2(clampf(fv * 0.22, -0.3, 0.6), clampf(-dh * 0.12, -0.5, 0.5))
	target.x += sin(_mix_time * 9) * 0.03 * minf(1, absf(fv))
	_sway_v = (_sway_v + (target - _sway) * 60 * dt) * exp(-7 * dt)
	_sway += _sway_v * dt
	var side := Vector3(-f.z, 0, f.x)
	var D := (Vector3(0, -1, 0) + f * (-0.14 - _sway.x * 1.1) + side * (_sway.y * 0.9)).normalized()
	var X := (side - D * side.dot(D)).normalized()
	var Y := D.cross(X)
	var qw := Basis(X, Y, D).get_rotation_quaternion()
	var p0 := _tail[0]
	skel.set_bone_pose_rotation(p0, (_parent_wq(p0).inverse() * qw).normalized())
	for i in range(1, _tail.size()):
		var q := Basis.from_euler(Vector3(-_sway.x * 0.3, _sway.y * 0.3, 0), EULER_ORDER_XYZ).get_rotation_quaternion()
		skel.set_bone_pose_rotation(_tail[i], _tail_rest[i] * q)

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
