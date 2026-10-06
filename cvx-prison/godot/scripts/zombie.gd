class_name Zombie
extends EnemyModel
## Zombie (en01) driven by the original en01ms motion bank (port of enemy.ts Zombie):
## m11 get up, m71 shamble, m56 idle sway, m73 lunge, m32 bite (with Claire's z00/z01; same 59 frames),
## m14 shoved off (Claire z02/z03), m43 kneels to feed on her (Claire z10/z11), m15/m16 flinch, m09/m10 collapse.

const Z_CLIP := {"rise": "m11", "walk": "m71", "idle": "m56", "lunge": "m73", "bite": "m32", "release": "m14", "eat": "m43", "flinch": "m15", "flinch2": "m16", "dieF": "m09", "dieB": "m10", "lie": "m13"}

var state := "idle"
var t := 0.0
var hp := 8.0
var heading := 0.0
var cool := 0.0
var index := 0
## model variant (en01 mdlver, picks the personal add_atk)
var mdlver := 0
var _b00 := -1
var _root_rest := Vector3.ZERO

func _init(i := 0) -> void:
	index = i

func init(file: String, x: float, y: float, z: float, h: float, lying: bool) -> Zombie:
	load_model(file)
	_b00 = bone_index("b00")
	if _b00 >= 0:
		_root_rest = skel.get_bone_pose_position(_b00)
	position = Vector3(x, y, z); heading = h; rotation.y = h
	if lying:
		state = "lying"; play(Z_CLIP.lie, 0, true)
	else:
		set_state("idle")
	update(0)
	return self

var hittable: bool:
	get: return not ["lying", "die", "dead", "rise"].has(state)
var alive: bool:
	get: return state != "die" and state != "dead"

func set_state(s: String) -> void:
	state = s; t = 0
	var once := s != "walk" and s != "idle"
	var c: String = Z_CLIP.get(s, Z_CLIP.idle)
	if s == "flinch": c = Z_CLIP.flinch if randf() < 0.5 else Z_CLIP.flinch2
	if s == "die": c = Z_CLIP.dieF if randf() < 0.5 else Z_CLIP.dieB
	cur = ""; play(c, 0.05 if s == "bite" else 0.2, not once, 1)

func forward() -> Vector3:
	return Vector3(-sin(heading), 0, -cos(heading))

func _move(room: Room, sp: float, dt: float) -> void:
	var np := room.resolve(position + forward() * sp * dt, 0.25)
	var y: Variant = room.floor_at(np.x, np.z, position.y)
	np.y = y if y != null and absf(y - position.y) < 0.5 else position.y
	position = np

## returns true when the zombie starts a bite this frame
func tick(dt: float, target: Vector3, target_free: bool, room: Room) -> bool:
	t += dt; cool = maxf(0, cool - dt)
	var dx := target.x - position.x; var dz := target.z - position.z; var dist := sqrt(dx * dx + dz * dz)
	var d := U.wrap_pi(atan2(-dx, -dz) - heading)
	var bite := false
	var turn := func(rate: float) -> void: heading += clampf(d, -rate * dt, rate * dt)
	match state:
		"lying":
			if dist < 3.2: set_state("rise")
		"rise":
			if t >= clip_len: set_state("walk")
		"idle":
			if dist < 7: set_state("walk")
		"walk":
			turn.call(1.1); _move(room, 0.36, dt)
			if dist < 0.95 and absf(d) < 0.5 and cool <= 0 and target_free: set_state("lunge")
		"lunge":
			turn.call(1.5)
			if t < 0.6 and dist > 0.55: _move(room, 0.9, dt)
			if t > 0.35 and t < 0.9 and dist < 0.7 and target_free:
				set_state("bite"); bite = true
			elif t >= minf(clip_len, 1.3):
				cool = 1.2; set_state("walk")
		"bite":
			pass
		"release":
			if t < 0.5: _move(room, -0.8, dt)
			if t >= minf(clip_len, 1.4):
				cool = 2.5; set_state("walk")
		"flinch":
			if t < 0.3: _move(room, -0.5, dt)
			if t >= minf(clip_len, 1.0): set_state("walk")
		"die":
			if t >= clip_len: state = "dead"
	rotation.y = heading
	update(dt)
	# the bank's root translation is applied in place, except the vertical part
	if _b00 >= 0 and state != "die" and state != "dead":
		var p := skel.get_bone_pose_position(_b00)
		skel.set_bone_pose_position(_b00, Vector3(_root_rest.x, p.y, _root_rest.z))
	return bite

func hit(dmg: float) -> void:
	if not hittable:
		return
	hp -= dmg
	if hp <= 0: set_state("die")
	elif state != "bite": set_state("flinch")
