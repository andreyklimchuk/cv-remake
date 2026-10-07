class_name Zombie
extends EnemyModel
## Zombie (en01) driven by the original en01ms motion bank (port of enemy.ts Zombie). The bank's lower-body (b00-b07) and
## upper-body (b08-b17) clips are paired by equal frame counts (tools/fix_zombie_clips.py). The AI's clip table is not in
## the decompiled code: the clips are chosen by matching Claire's synchronised motions / frame counts:
## m11 get up, m71 shamble, m56 idle sway, m73 lunge, m32 bite (with Claire's z00/z01, 60 frames), m76 shoved off
## (Claire's kick z08/z09, 36 frames), m43 kneels to feed on her then m44 feeding loop (Claire z10/z11), m15/m16 flinch,
## m09/m10 collapse, m03 lying (its last pose is the first one of m11).

const Z_CLIP := {"rise": "m11", "walk": "m71", "idle": "m56", "lunge": "m73", "bite": "m32", "release": "m76", "eat": "m43", "feed": "m44", "flinch": "m15", "flinch2": "m16", "dieF": "m09", "dieB": "m10", "lie": "m03"}
## m71 / m56 are not seamless loops: each pass cross-fades into a copy of the clip ("m71~")
const BLEND := 0.25

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
## walking speed (m/s) = root (b00) travel of the walk clip
var walk_speed := 0.36
var _loop_alt := false
## ENEMY type (bhEne01_InitType10 / type 10 clears the mouth morph flag EXP0_I(0x40) 0x10000000)
var etype := 0

## mtn_no (bank slot) of glb clip mNN: the converter numbered the 8-object (lower body) blocks of en01ms in bank order
const LOWER_SLOT := [0, 1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 24, 25, 27, 28, 31, 32, 33, 34, 35, 36, 37, 38, 40, 41, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 75, 76, 85, 86, 95, 96, 97, 98, 99, 100, 110, 111, 116, 117, 120, 121, 122, 123, 124, 125, 127, 129, 130, 131, 132, 133, 150, 151, 152, 153]
## en01.c mouth morph curves (shp_ct per motion frame, 0..1000)
const KAMIKAMI := [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200, 400, 600, 800, 1000, 1000, 1000, 1000, 900, 800, 700, 600, 500, 300, 150, 0, 250, 500, 250, 500, 250, 500, 250, 0, 500, 250, 0, 250, 500, 250, 0, 500, 500, 500, 500, 500, 250, 0, 0, 250, 500, 1000, 1000, 1000, 750, 750, 500, 500, 250, 0, 250, 0, 250, 500, 250, 0, 250, 500, 250, 500, 500]
const KAMIKAMI2 := [0, 0, 0, 0, 0, 0, 0, 200, 400, 600, 800, 1000, 1000, 1000, 1000, 1000, 1000, 900, 800, 700, 600, 500, 300, 150, 0, 250, 500, 250, 500, 250, 500, 250, 0, 500, 250, 0, 250, 500, 250, 0, 500, 500, 500, 500, 500, 250, 0, 0, 250, 500, 1000, 1000, 1000, 750, 750, 500, 500, 250, 0, 250, 0, 250, 500, 250, 0, 250, 500, 250, 500, 250]
const MOGMOG := [100, 200, 300, 400, 500, 400, 300, 200, 100, 0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
## morphed meshes per model file (obj_a -> obj_b blend shape), shared by the zombies of one variant
static var _morph_cache := {}
var _morph_mi: MeshInstance3D = null

func _init(i := 0) -> void:
	index = i

func init(file: String, x: float, y: float, z: float, h: float, lying: bool) -> Zombie:
	load_model(file)
	_b00 = bone_index("b00")
	if _b00 >= 0:
		_root_rest = skel.get_bone_pose_position(_b00)
	for k in ["walk", "idle"]:
		var c: String = Z_CLIP[k]
		if has_clip(c) and not has_clip(c + "~"):
			var lib := ap.get_animation_library(ap.find_animation_library(ap.get_animation(c)))
			lib.add_animation(c + "~", ap.get_animation(c).duplicate())
	if not mdlver in [0x12, 0x13, 0x14, 0x18]: _setup_morph(file)
	var rs := _root_speed(Z_CLIP.walk)
	if rs > 0.01: walk_speed = rs
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
	var c: String = Z_CLIP.get(s, Z_CLIP.idle)
	if s == "flinch": c = Z_CLIP.flinch if randf() < 0.5 else Z_CLIP.flinch2
	if s == "die": c = Z_CLIP.dieF if randf() < 0.5 else Z_CLIP.dieB
	_loop_alt = false
	cur = ""; play(c, 0.05 if s == "bite" else 0.2, false, 1)

## walk / idle: restart the clip near its end, cross-fading into the other copy
func _loop_blend() -> void:
	if cur == "" or ap.current_animation_position < clip_len - BLEND: return
	_loop_alt = not _loop_alt
	var c: String = Z_CLIP[state] + ("~" if _loop_alt else "")
	cur = ""; play(c, BLEND, false, 1)

## horizontal root (b00) travel per second of a clip, in metres
func _root_speed(c: String) -> float:
	if not has_clip(c): return 0.0
	var a := ap.get_animation(c)
	for ti in a.get_track_count():
		if a.track_get_type(ti) != Animation.TYPE_POSITION_3D or not str(a.track_get_path(ti)).ends_with(":b00"): continue
		var n := a.track_get_key_count(ti)
		if n < 2: return 0.0
		var d: Vector3 = a.track_get_key_value(ti, n - 1) - a.track_get_key_value(ti, 0)
		var sc := 1.0
		var nd: Node = skel
		while nd != null and nd != self:
			if nd is Node3D: sc *= (nd as Node3D).scale.x
			nd = nd.get_parent()
		return Vector2(d.x, d.z).length() * sc / maxf(a.length, 0.001)
	return 0.0

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
			_loop_blend()
			if dist < 7: set_state("walk")
		"walk":
			_loop_blend()
			turn.call(1.1); _move(room, walk_speed, dt)
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
		"eat":
			if t >= clip_len and cur == Z_CLIP.eat: cur = ""; play(Z_CLIP.feed, 0.1, true, 1)
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
	_update_morph()
	return bite

## bhEne01 (en01.c 10450): mtn 8 / 120 -> en01_kamikami[frm], 85 / 121 -> kamikami2, 0 / 40 / 41 / 125 / 117 ->
## mogmog[frm % 40], otherwise no morph; bhDrawEneObject then draws npCalcMorphing(obj_a, obj_b, shp_ct)
func mtn_no() -> int:
	var c := cur.trim_suffix("~")
	if c.length() < 2 or c[0] != "m" or not c.substr(1).is_valid_int(): return -1
	var k := c.substr(1).to_int()
	return LOWER_SLOT[k] if k < LOWER_SLOT.size() else -1

func _update_morph() -> void:
	if _morph_mi == null: return
	var w := 0.0
	if etype != 10 and ap != null and ap.current_animation != "":
		var frm := int(ap.current_animation_position * 30.0 + 0.001)
		match mtn_no():
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

func hit(dmg: float) -> void:
	if not hittable:
		return
	hp -= dmg
	if hp <= 0: set_state("die")
	elif state != "bite": set_state("flinch")
