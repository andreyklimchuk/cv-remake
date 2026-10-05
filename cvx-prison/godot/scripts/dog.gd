class_name Dog
extends EnemyModel
## Zombie dog (en04) driven by the original en04ms motion bank (port of enemy.ts Dog):
## m00 trot, m01 gallop, m04 leap, m07 recoil after a bite, m10 knocked back, m11 collapse.

const D_CLIP := {"idle": "m00", "trot": "m00", "run": "m01", "leap": "m04", "recoil": "m07", "flinch": "m10", "die": "m11"}

var state := "idle"
var t := 0.0
var hp := 6.0
var heading := 0.0
var cool := 0.0
var index := 0
## seconds left of bursting out of the kennel (its walls are ignored)
var _burst := 0.0
var _b00 := -1
var _root_rest := Vector3.ZERO

func _init(i := 0) -> void:
	index = i

func init(file: String, x: float, y: float, z: float, h: float) -> Dog:
	load_model(file)
	_b00 = bone_index("b00")
	if _b00 >= 0:
		_root_rest = skel.get_bone_pose_position(_b00)
	position = Vector3(x, y, z); heading = h; rotation.y = h
	set_state("idle"); update(0)
	return self

var hittable: bool:
	get: return state != "die" and state != "dead"
var alive: bool:
	get: return hittable

func set_state(s: String) -> void:
	state = s; t = 0
	var loop := s == "idle" or s == "trot" or s == "run"
	cur = ""; play(D_CLIP[s], 0.15, loop, 1)

func forward() -> Vector3:
	return Vector3(-sin(heading), 0, -cos(heading))

func _move(room: Room, sp: float, dt: float) -> void:
	var np := position + forward() * sp * dt
	if _burst <= 0:
		np = room.resolve(np, 0.25)
	var y: Variant = room.floor_at(np.x, np.z, position.y)
	np.y = y if y != null and absf(y - position.y) < 0.5 else position.y
	position = np

## returns true when the leap reaches Claire this frame
func tick(dt: float, target: Vector3, target_free: bool, room: Room) -> bool:
	t += dt; cool = maxf(0, cool - dt); _burst = maxf(0, _burst - dt)
	var dx := target.x - position.x; var dz := target.z - position.z; var dist := sqrt(dx * dx + dz * dz)
	var d := U.wrap_pi(atan2(-dx, -dz) - heading)
	var bite := false
	var turn := func(rate: float) -> void: heading += clampf(d, -rate * dt, rate * dt)
	match state:
		"idle":
			if dist < 6.5:
				_burst = 1.2; set_state("run")
		"trot":
			turn.call(2.5); _move(room, 1.0, dt)
			if cool <= 0: set_state("run")
		"run":
			turn.call(3.2); _move(room, 3.4, dt)
			if dist < 1.9 and absf(d) < 0.35 and cool <= 0 and target_free: set_state("leap")
		"leap":
			if t < 0.45: _move(room, 3.6, dt)
			if t > 0.15 and t < 0.5 and dist < 0.75 and target_free:
				bite = true
			elif t >= clip_len:
				cool = 0.6; set_state("trot")
		"recoil":
			if t < 0.4: _move(room, -1.2, dt)
			if t >= clip_len:
				cool = 1.5; set_state("trot")
		"flinch":
			if t < 0.3: _move(room, -1.5, dt)
			if t >= clip_len:
				cool = 0.8; set_state("trot")
		"die":
			if t >= clip_len: state = "dead"
	rotation.y = heading
	update(dt)
	if _b00 >= 0 and state != "die" and state != "dead":
		var p := skel.get_bone_pose_position(_b00)
		skel.set_bone_pose_position(_b00, Vector3(_root_rest.x, p.y, _root_rest.z))
	return bite

func hit(dmg: float) -> void:
	if not hittable:
		return
	hp -= dmg
	set_state("die" if hp <= 0 else "flinch")
