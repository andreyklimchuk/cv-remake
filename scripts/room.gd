class_name Room
extends Node3D
## Room of the original data (port of room.ts): model (rooms/ID.glb), objects, items, 2D wall shapes,
## floor height queries and the camera occlusion test. Floor / occluder triangles are kept in plain arrays
## (deterministic ray casts without the physics server).

var data: Dictionary
var shapes: Array = []           # active wall shapes {k:box|circle|tri,...}
## the player's wall records (bhCheckWallEx): {s: shape, sh, flr, attr, y, h, i}; wall_on = ATR flg bit 0
var pl_walls: Array = []
var wall_on: Array = []
## rom->grand (rmh header, metres): floor levels for bhCheckFloorNum
var grand: Array = []
static var _grand_db: Dictionary = {}
var wall_shapes: Array = []      # per collision record (null = no shape)
var obj_meshes := {}             # object index -> Node3D
var outside := {}                # object indices placed outside the room bounds
var player_parts := {}           # empty object rows 0/1 = Claire's right/left hand (bone space, see _add_hands)
var item_meshes := {}            # item index -> Node3D
var item_players := {}           # item index -> AnimationPlayer (room motions rm_XXXX_rNN)
var nodes := {}                  # room model object index (nNNN) -> MeshInstance3D
var bbox := AABB()
# floor: triangles with |n.y| > 0.55 in a 2D grid
var _ftri := PackedVector3Array()
var _fgrid := {}
const CELL := 1.0
# occluders: [{mi, aabb, tris: PackedVector3Array, flip: bool}]
var _occ: Array = []

## the room layout comes from scenes/rooms/ID.tscn (editable, see RoomScene) when it exists,
## otherwise directly from the converted data (assets/rooms/ID.json)
static func load_room(id: String) -> Room:
	var r := Room.new()
	r.name = id
	r.data = Assets.json("rooms/%s.json" % id, {})
	if _grand_db.is_empty():
		var f := FileAccess.open("res://data/room_grand.json", FileAccess.READ)
		if f: _grand_db = JSON.parse_string(f.get_as_text())
	r.grand = _grand_db.get(id, [])
	var sp := "res://scenes/rooms/%s.tscn" % id
	if ResourceLoader.exists(sp):
		r._build_scene((load(sp) as PackedScene).instantiate() as RoomScene)
	else:
		r._build()
	return r

var layout: RoomScene = null

func _build_scene(rs: RoomScene) -> void:
	layout = rs
	data = rs.collect(data)
	add_child(rs)
	var sc := rs.model()
	if sc:
		Assets.to_lambert(sc, "rom")
		_collect(sc)
		_find_nodes(sc)
	for o in rs.objects():
		var po := o as PlacedObject
		if po == null or not po.drawn or po.get_child_count() == 0:
			if po: po.visible = false
			continue
		var p := po.position
		if p.x < bbox.position.x - 0.05 or p.z < bbox.position.z - 0.05 or p.x > bbox.end.x + 0.05 or p.z > bbox.end.z + 0.05:
			outside[po.get_index()] = true; po.visible = false
		Assets.to_lambert(po, "obj")
		obj_meshes[po.get_index()] = po
	_add_hands()
	_build_walls()

func _build() -> void:
	var d := data
	var sc := Assets.scene("rooms/%s.glb" % d.id)
	sc.scale = Vector3.ONE * 0.1
	Assets.to_lambert(sc, "rom")
	add_child(sc)
	_collect(sc)
	_find_nodes(sc)
	var objs: Array = d.get("objects", [])
	for i in objs.size():
		var ob: Dictionary = objs[i]
		if not ob.get("model") or ob.flags == "00000000":
			continue
		var p := U.v3(ob.pos)
		var outs := p.x < bbox.position.x - 0.05 or p.z < bbox.position.z - 0.05 or p.x > bbox.end.x + 0.05 or p.z > bbox.end.z + 0.05
		var o := Assets.scene("objects/%s.glb" % ob.model)
		if o == null:
			continue
		if outs:
			outside[i] = true; o.visible = false
		Assets.to_lambert(o, "obj")
		o.transform = U.trs(p, U.euler(ob.rot[0], ob.rot[2], ob.rot[1], EULER_ORDER_ZYX), 0.1)
		o.name = "obj%d_%s" % [i, ob.model]
		add_child(o); obj_meshes[i] = o
	_add_hands()
	_build_walls()

func _add_hands() -> void:
	# object rows 0/1 without a model of their own: the events link them to Claire's hands (bhObjLinkSetPly bones 9 / 13)
	# and, in the cutscenes with the NPC Claire en91 (a body without hands), to its wrist bones (bhObjLinkSet 18 / 22,
	# rm_0020). Those rows are Claire's hand models -> the hand surfaces of claire.glb in their bone space.
	var objs: Array = data.get("objects", [])
	for i in 2:
		if obj_meshes.has(i) or (i < objs.size() and objs[i].get("model") and objs[i].flags != "00000000"): continue
		var h := _claire_hand("handR" if i == 0 else "handL")
		if h == null: continue
		h.name = "obj%d_claire_hand" % i; h.visible = false; h.set_meta("bone_space", true)
		add_child(h); obj_meshes[i] = h; outside[i] = true; player_parts[i] = true

## Claire's hand surface (material name containing tag) of chars/claire.glb as a static mesh in its bone's space
static var _hands := {}
static func _claire_hand(tag: String) -> MeshInstance3D:
	if not _hands.has(tag):
		var am: ArrayMesh = null
		var sc := Assets.scene("chars/claire.glb")
		if sc:
			for mi in sc.find_children("*", "MeshInstance3D", true, false):
				var mesh: Mesh = (mi as MeshInstance3D).mesh; var sk: Skin = (mi as MeshInstance3D).skin
				if mesh == null or sk == null: continue
				for si in mesh.get_surface_count():
					var mat := mesh.surface_get_material(si)
					if mat == null or not mat.resource_name.contains(tag): continue
					var arr := mesh.surface_get_arrays(si)
					var bi: int = (arr[Mesh.ARRAY_BONES] as PackedInt32Array)[0]
					var bp := sk.get_bind_pose(bi)
					var vs: PackedVector3Array = arr[Mesh.ARRAY_VERTEX]; var ns: PackedVector3Array = arr[Mesh.ARRAY_NORMAL]
					for k in vs.size(): vs[k] = bp * vs[k]
					for k in ns.size(): ns[k] = (bp.basis * ns[k]).normalized()
					arr[Mesh.ARRAY_VERTEX] = vs; arr[Mesh.ARRAY_NORMAL] = ns
					arr[Mesh.ARRAY_BONES] = null; arr[Mesh.ARRAY_WEIGHTS] = null
					if am == null: am = ArrayMesh.new()
					am.add_surface_from_arrays(Mesh.PRIMITIVE_TRIANGLES, arr)
					am.surface_set_material(am.get_surface_count() - 1, mat)
			sc.free()
		_hands[tag] = am
	if _hands[tag] == null: return null
	var m := MeshInstance3D.new(); m.mesh = _hands[tag]
	return m

func _build_walls() -> void:
	var col: Array = data.get("collision", [])
	wall_shapes = []
	for c in col:
		wall_shapes.append(_collider_shape(c))
	shapes = []
	for i in col.size():
		if wall_shapes[i] != null and (String(col[i].type).hex_to_int() & 1):
			shapes.append(wall_shapes[i])
	pl_walls = []; wall_on = []
	for i in col.size():
		var e: Dictionary = col[i]
		var t := String(e.type).hex_to_int()
		wall_on.append(bool(t & 1))
		var sh := (t >> 8) & 0xff
		if sh == 6 or sh > 7: continue
		var fl := String(e.flags).hex_to_int()
		var attr := ((fl & 0xff) << 24) | ((fl & 0xff00) << 8) | ((fl >> 8) & 0xff00) | ((fl >> 24) & 0xff)
		var x := float(e.x); var z := float(e.z); var sx := float(e.sx); var sz := float(e.sz)
		var shp: Dictionary
		if sh == 4 or sh == 5: shp = {"k": "tri", "a": Vector2(x, z), "b": Vector2(x + sx, z), "c": Vector2(x, z + sz)}
		elif sh == 2 or sh == 3: shp = {"k": "circle", "x": x, "z": z, "r": sx}
		else: shp = {"k": "box", "x0": minf(x, x + sx), "z0": minf(z, z + sz), "x1": maxf(x, x + sx), "z1": maxf(z, z + sz)}
		var h := float(e.sy)
		pl_walls.append({"s": shp, "sh": sh, "flr": t >> 24, "attr": attr, "y": float(e.y), "h": h if h != 0.0 else 1000.0, "i": i})

## bhCheckFloorNum: floor number of a height (rom->grand)
func floor_num(py: float) -> int:
	var fno := 2
	for i in mini(31, grand.size()):
		var g := float(grand[i])
		if (g != 0.0 and py + 0.001 >= g) or (i == 2 and py + 0.001 >= g): fno = i
	return fno - 2

## rom->grand[flr_no + 2]
func floor_height(flr: int) -> float:
	var i := flr + 2
	return float(grand[i]) if i >= 0 and i < grand.size() else 0.0

## bhCheckWallEx for the player (second call, plp->px / ar / ah, flg 0x100 set): the record filters of the original —
## flg bit 0, type 1 off while on the stairs (flg 0x400), attr 1 = same floor only, attr 4 = enemy-only wall
## (the player always has stflg 0x40000000), vertical overlap (py + ah >= y and py <= y + h, h 0 = rom->h);
## type 7 = a raised block (hit while its top is above the feet and below the head)
func resolve_pl(p: Vector3, r: float, flr: int, ah := 1.65, kaidan := false) -> Vector3:
	var act: Array = []
	for w in pl_walls:
		if not wall_on[w.i]: continue
		var attr: int = w.attr
		if (attr & 1) and int(w.flr) != flr: continue
		var sh: int = w.sh
		if sh == 7:
			var top: float = w.y + w.h
			if not (p.y < top and p.y + ah > top): continue
		else:
			if (sh & 1) and kaidan: continue
			if attr & 4: continue
			if not (p.y + ah >= w.y and p.y <= w.y + w.h): continue
		act.append(w.s)
	return _resolve_in(p, r, act)

## floor triangles, occluder triangles and the bounding box of the room model
func _collect(sc: Node3D) -> void:
	var first := true
	for mi in Assets.find_meshes(sc):
		var m: Mesh = mi.mesh
		if m == null:
			continue
		var xf := U.rel_xform(mi, self)
		for s in m.get_surface_count():
			var arr := m.surface_get_arrays(s)
			var vs: PackedVector3Array = arr[Mesh.ARRAY_VERTEX]
			var idx: PackedInt32Array = arr[Mesh.ARRAY_INDEX] if arr[Mesh.ARRAY_INDEX] != null else PackedInt32Array()
			var ns: PackedVector3Array = arr[Mesh.ARRAY_NORMAL] if arr[Mesh.ARRAY_NORMAL] != null else PackedVector3Array()
			var cnt := idx.size() if idx.size() else vs.size()
			var mat: Material = mi.get_surface_override_material(s)
			var opaque: bool = not (mat != null and mat.get_meta("transparent", false))
			var tris := PackedVector3Array()
			var bb := AABB()
			var bbinit := false
			var votes := 0
			var i := 0
			while i + 2 < cnt:
				var i0 := idx[i] if idx.size() else i
				var i1 := idx[i + 1] if idx.size() else i + 1
				var i2 := idx[i + 2] if idx.size() else i + 2
				var a := xf * vs[i0]; var b := xf * vs[i1]; var c := xf * vs[i2]
				var n := (b - a).cross(c - a)
				if ns.size() and n.length_squared() > 1e-14:
					var vn := xf.basis * (ns[i0] + ns[i1] + ns[i2])
					votes += 1 if n.dot(vn) >= 0.0 else -1
				if first:
					bbox = AABB(a, Vector3.ZERO); first = false
				bbox = bbox.expand(a).expand(b).expand(c)
				var L := n.length()
				if L > 1e-9 and absf(n.y / L) >= 0.55:
					_add_floor(a, b, c)
				if opaque:
					tris.append(a); tris.append(b); tris.append(c)
					if not bbinit:
						bb = AABB(a, Vector3.ZERO); bbinit = true
					bb = bb.expand(a).expand(b).expand(c)
				i += 3
			if opaque and tris.size():
				# winding as stored by the importer vs the original front faces (vertex normals decide)
				# split into small chunks with their own bounds (fast segment tests in GDScript)
				var k := 0
				while k < tris.size():
					var ch := tris.slice(k, mini(k + 72, tris.size()))
					var cb := AABB(ch[0], Vector3.ZERO)
					for v in ch: cb = cb.expand(v)
					_occ.append({"mi": mi, "aabb": cb.grow(0.01), "tris": ch, "flip": votes < 0})
					k += 72

func _add_floor(a: Vector3, b: Vector3, c: Vector3) -> void:
	var t := _ftri.size() / 3
	_ftri.append(a); _ftri.append(b); _ftri.append(c)
	var x0 := int(floor(minf(a.x, minf(b.x, c.x)) / CELL)); var x1 := int(floor(maxf(a.x, maxf(b.x, c.x)) / CELL))
	var z0 := int(floor(minf(a.z, minf(b.z, c.z)) / CELL)); var z1 := int(floor(maxf(a.z, maxf(b.z, c.z)) / CELL))
	for x in range(x0, x1 + 1):
		for z in range(z0, z1 + 1):
			var k := Vector2i(x, z)
			if not _fgrid.has(k):
				_fgrid[k] = PackedInt32Array()
			var arr: PackedInt32Array = _fgrid[k]
			arr.append(t)
			_fgrid[k] = arr

func _find_nodes(n: Node) -> void:
	var nm := String(n.name)
	if nm.length() == 4 and nm[0] == "n" and nm.substr(1).is_valid_int():
		nodes[nm.substr(1).to_int()] = n
	for c in n.get_children():
		_find_nodes(c)

## primitives of room object i itself (not of its child objects)
func own_meshes(i: int) -> Array:
	var o: Node = nodes.get(i)
	if o == null:
		return []
	var own := []
	if o is MeshInstance3D:
		own.append(o)
	for c in o.get_children():
		var nm := String(c.name)
		if c is MeshInstance3D and not (nm.length() == 4 and nm[0] == "n" and nm.substr(1).is_valid_int()):
			own.append(c)
	return own

static func _bit(mask: Array, i: int) -> bool:
	var w: int = int(mask[i >> 5]) if (i >> 5) < mask.size() else 0
	return (w & (0x80000000 >> (i & 31))) != 0

## cut.c bhSetHideObjLgt: NJD_EVAL_HIDE skips only the object's own model, its children are still drawn
func set_hidden(mask: Array) -> void:
	for i in nodes.keys():
		var hide := _bit(mask, i)
		for m in own_meshes(i):
			(m as MeshInstance3D).layers = 0 if hide else 1

## meshes hidden by a hide mask (ignored in visibility checks)
func hidden_meshes(mask: Variant) -> Dictionary:
	var s := {}
	if mask == null:
		return s
	for i in nodes.keys():
		if _bit(mask, i):
			for m in own_meshes(i):
				s[m] = true
	return s

## collision record -> 2D shape (walls of the floor level only)
func _collider_shape(e: Dictionary) -> Variant:
	var t := String(e.type).hex_to_int()
	var shape := (t >> 8) & 0xff
	if shape == 7 or shape == 6 or shape == 2 or float(e.y) > 0.6:
		return null
	var x := float(e.x); var z := float(e.z); var sx := float(e.sx); var sz := float(e.sz)
	if shape == 4 or shape == 5:
		return {"k": "tri", "a": Vector2(x, z), "b": Vector2(x + sx, z), "c": Vector2(x, z + sz)}
	if shape == 3:
		return {"k": "circle", "x": x, "z": z, "r": maxf(0.08, sx * 0.5)}
	return {"k": "box", "x0": x, "z0": z, "x1": x + sx, "z1": z + sz}

## enable flags of the collision records (ATR flg bit 0, switched by the WALL command)
func sync_walls(on: Callable) -> void:
	shapes = []
	for i in wall_on.size(): wall_on[i] = on.call(i)
	for i in wall_shapes.size():
		if wall_shapes[i] != null and on.call(i):
			shapes.append(wall_shapes[i])

func place_items() -> void:
	if layout:
		for o in layout.items():
			var i: int = o.get_index()
			var ap := Assets.find_type(o, "AnimationPlayer") as AnimationPlayer
			if ap and ap.get_animation_list().size():
				ap.callback_mode_process = AnimationMixer.ANIMATION_CALLBACK_MODE_PROCESS_MANUAL
				item_players[i] = ap
			Assets.to_lambert(o, "itm")
			item_meshes[i] = o
		return
	var items: Array = data.get("items", [])
	for i in items.size():
		var it: Dictionary = items[i]
		var o := Assets.scene("items/it_%s.glb" % U.pad(int(it.id), 3))
		if o == null:
			continue
		var ap := Assets.find_type(o, "AnimationPlayer") as AnimationPlayer
		if ap and ap.get_animation_list().size():
			ap.callback_mode_process = AnimationMixer.ANIMATION_CALLBACK_MODE_PROCESS_MANUAL
			item_players[i] = ap
		Assets.to_lambert(o, "itm")
		o.transform = U.trs(U.v3(it.pos), U.euler(it.rot[0], it.rot[2], it.rot[1], EULER_ORDER_ZYX), 0.1)
		o.name = "item%d" % i
		add_child(o); item_meshes[i] = o

func remove_item(i: int) -> void:
	var o: Node = item_meshes.get(i)
	if o:
		o.queue_free(); item_meshes.erase(i); item_players.erase(i)

## height of the floor below (x, y + up, z) within up + 2 m (null = none)
func floor_at(x: float, z: float, y: float, up := 0.45) -> Variant:
	var cell: Variant = _fgrid.get(Vector2i(int(floor(x / CELL)), int(floor(z / CELL))))
	if cell == null:
		return null
	var top := y + up
	var bot := top - (up + 2.0)
	var best: Variant = null
	var p := Vector2(x, z)
	for t in cell as PackedInt32Array:
		var a := _ftri[t * 3]; var b := _ftri[t * 3 + 1]; var c := _ftri[t * 3 + 2]
		var a2 := Vector2(a.x, a.z); var b2 := Vector2(b.x, b.z); var c2 := Vector2(c.x, c.z)
		var den := (b2.y - c2.y) * (a2.x - c2.x) + (c2.x - b2.x) * (a2.y - c2.y)
		if absf(den) < 1e-12:
			continue
		var l1 := ((b2.y - c2.y) * (p.x - c2.x) + (c2.x - b2.x) * (p.y - c2.y)) / den
		var l2 := ((c2.y - a2.y) * (p.x - c2.x) + (a2.x - c2.x) * (p.y - c2.y)) / den
		var l3 := 1.0 - l1 - l2
		if l1 < -1e-6 or l2 < -1e-6 or l3 < -1e-6:
			continue
		var hy := l1 * a.y + l2 * b.y + l3 * c.y
		if hy <= top and hy >= bot and (best == null or hy > best):
			best = hy
	return best

## distance from `from` towards `to` until the first opaque front-facing surface (or the full length)
func clear_distance(from: Vector3, to: Vector3, skip: Variant = null) -> float:
	var dir := to - from
	var L := dir.length()
	if L < 1e-6:
		return 0.0
	dir /= L
	var best := L
	for o in _occ:
		if skip != null and (skip as Dictionary).has(o.mi):
			continue
		var bb: AABB = o.aabb
		if not bb.has_point(from) and bb.intersects_segment(from, to) == null:
			continue
		var tr: PackedVector3Array = o.tris
		var fl: bool = o.flip
		var i := 0
		var n := tr.size()
		while i < n:
			var a := tr[i]; var b := tr[i + 1]; var c := tr[i + 2]
			i += 3
			var nn := (b - a).cross(c - a)
			if fl:
				nn = -nn
			if nn.dot(dir) >= 0.0:
				continue
			var h: Variant = Geometry3D.ray_intersects_triangle(from, dir, a, b, c)
			if h == null:
				continue
			var d := from.distance_to(h)
			if d < best:
				best = d
	return best

## push a point (x, z) out of all collision shapes keeping radius r
func resolve(p: Vector3, r: float) -> Vector3:
	return _resolve_in(p, r, shapes)

func _resolve_in(p: Vector3, r: float, list: Array) -> Vector3:
	for _it in 3:
		for s in list:
			match s.k:
				"box":
					var cx := clampf(p.x, s.x0, s.x1); var cz := clampf(p.z, s.z0, s.z1)
					var dx := p.x - cx; var dz := p.z - cz; var d2 := dx * dx + dz * dz
					if d2 >= r * r:
						continue
					if d2 > 1e-10:
						var d := sqrt(d2); p.x = cx + dx / d * r; p.z = cz + dz / d * r
					else:
						var l: float = p.x - s.x0; var rr: float = s.x1 - p.x; var t: float = p.z - s.z0; var bo: float = s.z1 - p.z
						var m := minf(minf(l, rr), minf(t, bo))
						if m == l: p.x = s.x0 - r
						elif m == rr: p.x = s.x1 + r
						elif m == t: p.z = s.z0 - r
						else: p.z = s.z1 + r
				"circle":
					var dx: float = p.x - s.x; var dz: float = p.z - s.z; var d := sqrt(dx * dx + dz * dz); var m: float = r + s.r
					if d < m and d > 1e-6:
						p.x = s.x + dx / d * m; p.z = s.z + dz / d * m
				_:
					var q := Vector2(p.x, p.z)
					var inside := _in_tri(q, s.a, s.b, s.c)
					var c := _closest_on_tri(q, s.a, s.b, s.c)
					var d := q.distance_to(c)
					if inside:
						var v := c - q; var l := v.length(); if l == 0: l = 1
						p.x = c.x + v.x / l * r; p.z = c.y + v.y / l * r
					elif d < r:
						var v := (q - c) / (d if d != 0 else 1.0)
						p.x = c.x + v.x * r; p.z = c.y + v.y * r
	return p

static func _in_tri(p: Vector2, a: Vector2, b: Vector2, c: Vector2) -> bool:
	var sg := func(p1: Vector2, p2: Vector2, p3: Vector2) -> float: return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y)
	var d1: float = sg.call(p, a, b); var d2: float = sg.call(p, b, c); var d3: float = sg.call(p, c, a)
	var neg := d1 < 0 or d2 < 0 or d3 < 0
	var pos := d1 > 0 or d2 > 0 or d3 > 0
	return not (neg and pos)

static func _closest_on_seg(p: Vector2, a: Vector2, b: Vector2) -> Vector2:
	var ab := b - a
	var l2 := ab.length_squared()
	var t := clampf((p - a).dot(ab) / (l2 if l2 != 0 else 1.0), 0.0, 1.0)
	return a + ab * t

static func _closest_on_tri(p: Vector2, a: Vector2, b: Vector2, c: Vector2) -> Vector2:
	var x := _closest_on_seg(p, a, b); var y := _closest_on_seg(p, b, c); var z := _closest_on_seg(p, c, a)
	var dx := p.distance_squared_to(x); var dy := p.distance_squared_to(y); var dz := p.distance_squared_to(z)
	return x if dx <= dy and dx <= dz else (y if dy <= dz else z)
