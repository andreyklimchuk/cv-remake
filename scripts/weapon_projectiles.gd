class_name WeaponProjectiles
extends RefCounted
## 30 Hz trajectories/collisions of bhEff013 (arrows) and bhEff130 (GL).
## Native speeds, homing, lifetime, gravity, five-fragment grenade spread,
## secondary radii and delayed room-wide B.O.W. Gas damage. Metres externally.
var game: Variant
var shots: Array = []

func _init(host: Variant) -> void:
	game = host

func clear() -> void:
	for s in shots:
		if is_instance_valid(s.mesh): s.mesh.queue_free()
		if s.has("attachment") and is_instance_valid(s.attachment): s.attachment.queue_free()
		if int(s.visual) >= 0: game.fx.eff[int(s.visual)].flg = 0
	shots.clear()

func launch(weapon: int, p: Vector3, heading: float, aim: int) -> void:
	var pitch := PI / 4.0 * (1 if aim == 1 else (-1 if aim == 2 else 0))
	if weapon in [10, 19]:
		_add(weapon, p, _vector(heading, pitch) * 0.3, 100)
	elif weapon == 14:
		# player.c: centre + four fragments, cumulative pitch rotations (BAMS).
		if pitch > 0: pitch *= 0.5
		_add(weapon, p, _vector(heading, pitch) * 0.2, 15)
		pitch += 3276.0 * TAU / 65536.0
		_add(weapon, p, _vector(heading - 2730.0 * TAU / 65536.0, pitch) * 0.16, 15)
		pitch += 728.0 * TAU / 65536.0
		_add(weapon, p, _vector(heading + 2730.0 * TAU / 65536.0, pitch) * 0.16, 15)
		pitch += 2548.0 * TAU / 65536.0
		_add(weapon, p, _vector(heading - 1092.0 * TAU / 65536.0, pitch) * 0.12, 15)
		pitch += 364.0 * TAU / 65536.0
		_add(weapon, p, _vector(heading + 1092.0 * TAU / 65536.0, pitch) * 0.12, 15)
	else:
		_add(weapon, p, _vector(heading, pitch) * 0.25, 20)

static func _vector(heading: float, pitch: float) -> Vector3:
	return Vector3(-sin(heading) * cos(pitch), sin(pitch), -cos(heading) * cos(pitch))

func _add(w: int, p: Vector3, velocity: Vector3, life: int) -> void:
	var s := {"w": w, "p": p, "origin": p, "v": velocity, "direction": velocity.normalized(), "life": life, "mode": 0, "age": 0, "target": null, "direct": null, "mesh": null, "visual": -1, "floor_hit": false, "radius": 0.1}
	if w in [10, 19]:
		var near := INF
		for z in game.zombies + game.dogs:
			if not z.visible or not z.hittable: continue
			var v: Vector3 = z.position - p; v.y = 0
			var h := Vector3(velocity.x, 0, velocity.z).normalized()
			if v.length() > 0 and h.dot(v.normalized()) >= cos(2730.0 * TAU / 65536.0) and v.length() < near:
				near = v.length(); s.target = z
		s.mesh = Assets.scene("objects/projectile_arrow.glb")
		if s.mesh != null:
			s.mesh.scale = Vector3.ONE * 0.1; game.add_child(s.mesh)
	else:
		s.visual = game.fx._set_tb({"flg": 0x4100001, "id": 130, "type": w - 14, "px": p.x * 10, "py": p.y * 10, "pz": p.z * 10, "sx": 1.0, "sy": 1.0, "sz": 1.0, "ax": 0, "ay": 0})
	shots.append(s)
	_pose(s)

func _pose(s: Dictionary) -> void:
	if int(s.mode) == 2 and s.has("attachment"): return
	if is_instance_valid(s.mesh):
		s.mesh.position = s.p
		var dir: Vector3 = s.v.normalized()
		s.mesh.rotation = Vector3(asin(clampf(dir.y, -1, 1)), atan2(-dir.x, -dir.z), 0)
	if int(s.visual) >= 0:
		var op: Effects.O = game.fx.eff[int(s.visual)]
		op.px = s.p.x * 10; op.py = s.p.y * 10; op.pz = s.p.z * 10

func _sphere(p: Vector3, radius: float, s: Dictionary, skip: Variant, far := false) -> Array:
	var found := []
	for z in game.zombies + game.dogs:
		if z == skip or not z.visible or not z.hittable: continue
		var cap: Array = z.gun_capsule()
		var pair: Array = Game._seg_seg(p, p, cap[0], cap[1])
		var q: Vector3 = pair[1]
		if p.distance_to(q) > radius + float(cap[2]): continue
		if game._shot_wall(q, p) != null: continue
		game.weapon_hit(z, int(s.w), p, s.origin, true, far)
		found.append(z)
	return found

func _arrow_hit(s: Dictionary, dir: Vector3) -> Variant:
	# bhEff013 gat: p-3*unitdir to p+3*unitdir, radius .1 native units.
	var a: Vector3 = s.p - dir * 0.3; var b: Vector3 = s.p + dir * 0.3
	var best: Variant = null; var nearest := INF
	for z in game.zombies + game.dogs:
		if not z.visible or not z.hittable: continue
		var cap: Array = z.gun_capsule()
		var pair: Array = Game._seg_seg(a, b, cap[0], cap[1])
		if pair[0].distance_to(pair[1]) > 0.01 + float(cap[2]): continue
		if game._shot_wall(pair[1], a) != null: continue
		var d: float = a.distance_to(pair[1])
		if d < nearest: nearest = d; best = z
	if best != null: game.weapon_hit(best, int(s.w), a, a)
	return best

func _explosion(s: Dictionary) -> void:
	var w := int(s.w); var p: Vector3 = s.p
	if int(s.visual) >= 0:
		game.fx.eff[int(s.visual)].flg = 0; s.visual = -1
	var se: int = 269 if w == 10 and is_instance_valid(s.direct) else (270 if w == 10 else (281 if w == 19 else {14: 266, 15: 268, 16: 267, 17: 280}.get(w, 266)))
	game.audio.weapon(w, se, p)
	if w == 17:
		game.fx.weapon_explosion(p)
		s.mode = 3; s.age = 0
	elif w == 10:
		s.mode = 2; s.age = 0
		# BoneAttachment3D retains the original arrow transform in the enemy's joint space.
		if is_instance_valid(s.direct) and is_instance_valid(s.mesh):
			var z: Variant = s.direct; var nearest := INF; var bone := 1
			for i in (18 if z is Zombie else 19):
				if i == 0: continue
				var q: Vector3 = z._obj_pos(i) if z is Zombie else z._obj(i)
				if p.distance_to(q) < nearest: nearest = p.distance_to(q); bone = i
			var att := BoneAttachment3D.new(); att.bone_name = "b%02d" % bone
			z.skel.add_child(att); s.mesh.reparent(att, true); s.attachment = att
	else:
		var radius := 0.4 if w == 19 else (1.2 if w == 15 else 0.8)
		var offset := Vector3.ZERO if w == 19 else Vector3(0, 0.3 if w == 15 else 0.2, 0)
		_sphere(p + offset, radius, s, s.direct)
		game.fx.weapon_explosion(p)
		if w == 16 and bool(s.floor_hit):
			s.mode = 4; s.age = 0; s.v = Vector3(s.v.x, 0, s.v.z).normalized() * 0.05
		else: s.mode = 5

func frame() -> void:
	for s in shots:
		if int(s.mode) == 0:
			var old: Vector3 = s.p; var dir: Vector3 = s.v.normalized()
			s.p += s.v
			if int(s.w) in [10, 19]:
				if is_instance_valid(s.target) and s.target.alive:
					var cap: Array = s.target.gun_capsule()
					var v: Vector3 = ((cap[0] + cap[1]) * 0.5 - s.p).normalized()
					s.direction += Vector3(0.2 * (v.x - s.direction.x), 0.05 * (v.y - s.direction.y), 0.2 * (v.z - s.direction.z))
					if Vector2(v.x, v.z).dot(Vector2(s.direction.x, s.direction.z)) > 0.5: s.v = s.direction * 0.3
					else: s.target = null
			else: s.v.y -= 0.002
			var wall: Variant = game._shot_wall(old, s.p)
			var floor_: Variant = game.room.floor_at(s.p.x, s.p.z, old.y + 0.1, 0.6) if game.room != null else null
			var floor_hit: bool = floor_ != null and s.p.y <= float(floor_)
			if wall != null or floor_hit:
				if wall != null: s.p = old + dir * float(wall) - dir * (0.3 if int(s.w) != 10 else 0.0)
				elif floor_hit: s.p.y = float(floor_)
				s.floor_hit = floor_hit
				_explosion(s)
			else:
				if int(s.w) in [10, 19]: s.direct = _arrow_hit(s, dir)
				else:
					var targets := _sphere(s.p, 0.2, s, null)
					if not targets.is_empty(): s.direct = targets.back()
				if s.direct != null: _explosion(s)
				s.life -= 1
				if int(s.life) <= 0:
					if int(s.w) in [10, 19]: s.mode = 5
					else: _explosion(s)
		elif int(s.mode) == 2:
			s.age += 1
			if int(s.age) >= 121 or (s.direct != null and not is_instance_valid(s.direct)): s.mode = 5
		elif int(s.mode) == 3:
			s.age += 1
			if int(s.age) == 25:
				# bhSetBowDamage: halve current HP of every susceptible active enemy, not a radius cloud.
				for z in game.zombies + game.dogs:
					if z.visible and z.hittable: game.weapon_hit(z, 17, z.position, s.origin, false, true, int(z.hp * 0.5))
			if int(s.age) > 57: s.mode = 5
		elif int(s.mode) == 4:
			s.p += s.v; s.v *= 0.9
			_sphere(s.p + Vector3(0, 0.2, 0), s.radius, s, null, true)
			s.radius = minf(0.4, float(s.radius) + 0.05); s.age += 1
			if int(s.age) >= 50 or game._shot_wall(s.p, s.p + s.v) != null: s.mode = 5
		_pose(s)
	for i in range(shots.size() - 1, -1, -1):
		var s: Dictionary = shots[i]
		if int(s.mode) == 5:
			if is_instance_valid(s.mesh): s.mesh.queue_free()
			if s.has("attachment") and is_instance_valid(s.attachment): s.attachment.queue_free()
			if int(s.visual) >= 0: game.fx.eff[int(s.visual)].flg = 0
			shots.remove_at(i)
