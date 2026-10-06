extends SceneTree
## Generates the editable scenes from the converted assets (run after tools/fetch_assets.py):
##   godot --headless --path . -s tools/build_scenes.gd            (all)
##   godot --headless --path . -s tools/build_scenes.gd -- models  (model wrappers only)
##   godot --headless --path . -s tools/build_scenes.gd -- rooms [rm_0000 ...]
## * scenes/models/<dir>/<name>.tscn — one scene per model (room, object, item, character, enemy, npc, inventory):
##   the imported glb as an instance (use "Editable Children" to change it). Assets.scene() loads these instead of the glb.
## * scenes/rooms/rm_XXXX.tscn — the room layout (RoomScene, see scripts/scene/room_scene.gd).
## Existing room scenes are NOT overwritten unless --force is given (they may contain your edits).

const DIRS := ["rooms", "objects", "items", "chars", "enemies", "npc", "inv"]
var force := false

func _init() -> void:
	var args := Array(OS.get_cmdline_user_args())
	force = args.has("--force")
	args = args.filter(func(a): return a != "--force")
	var what: String = args[0] if args.size() else "all"
	if what == "all" or what == "models":
		for d in DIRS: _models(d)
	if what == "all" or what == "rooms":
		var ids: Array = args.slice(1) if args.size() > 1 else []
		if ids.is_empty():
			for f in DirAccess.get_files_at("res://assets/rooms"):
				if f.ends_with(".json"): ids.append(f.get_basename())
		for id in ids: _room(id)
	quit()

func _save(root: Node, path: String) -> void:
	DirAccess.make_dir_recursive_absolute(path.get_base_dir())
	var ps := PackedScene.new()
	var err := ps.pack(root)
	if err != OK:
		push_error("pack %s: %d" % [path, err]); return
	ResourceSaver.save(ps, path)
	# path-based references: the uids of the imported glb differ on every machine
	var t := FileAccess.get_file_as_string(path)
	var re := RegEx.create_from_string(" uid=\"uid://[a-z0-9]+\"")
	t = re.sub(t, "", true)
	var f := FileAccess.open(path, FileAccess.WRITE); f.store_string(t); f.close()
	root.free()
	print("saved ", path)

## JSON numbers are floats: whole numbers (masks, flags, angles in 1/65536) are stored as ints so the
## scene text keeps them exactly
static func _ints(v: Variant) -> Variant:
	if v is float and v == floor(v) and absf(v) < 9.0e15: return int(v)
	if v is Array:
		var a := []
		for x in v: a.append(_ints(x))
		return a
	if v is Dictionary:
		var d := {}
		for k in v: d[k] = _ints(v[k])
		return d
	return v

func _own(n: Node, owner_: Node) -> void:
	n.owner = owner_

func _models(dir: String) -> void:
	var src := "res://assets/" + dir
	if not DirAccess.dir_exists_absolute(src): return
	for f in DirAccess.get_files_at(src):
		if not f.ends_with(".glb"): continue
		var nm := f.get_basename()
		var root := Node3D.new(); root.name = nm
		var ps: PackedScene = load(src + "/" + f)
		if ps == null: continue
		var inst := ps.instantiate(); inst.name = "glb"
		root.add_child(inst); _own(inst, root)
		_save(root, "res://scenes/models/%s/%s.tscn" % [dir, nm])

func _inst(path: String) -> Node3D:
	var ps: PackedScene = load(path) if ResourceLoader.exists(path) else null
	return ps.instantiate() as Node3D if ps else null

func _add(parent: Node, n: Node, root: Node) -> Node:
	parent.add_child(n); n.owner = root
	return n

func _group(root: Node, nm: String) -> Node3D:
	var g := Node3D.new(); g.name = nm
	_add(root, g, root)
	return g

func _room(id: String) -> void:
	var path := "res://scenes/rooms/%s.tscn" % id
	if ResourceLoader.exists(path) and not force:
		print("keep ", path, " (use --force to regenerate)"); return
	var d: Dictionary = JSON.parse_string(FileAccess.get_file_as_string("res://assets/rooms/%s.json" % id))
	var root := Node3D.new(); root.name = id
	root.set_script(load("res://scripts/scene/room_scene.gd")); root.room_id = id
	var m := _inst("res://scenes/models/rooms/%s.tscn" % id)
	if m:
		m.name = "Model"; m.scale = Vector3.ONE * 0.1; _add(root, m, root)
	# objects
	var g := _group(root, "Objects")
	var objs: Array = d.get("objects", [])
	for i in objs.size():
		var ob: Dictionary = objs[i]
		var n := Node3D.new(); n.set_script(load("res://scripts/scene/placed_object.gd"))
		n.index = i; n.flags = ob.flags; n.id = int(ob.id); n.r3 = int(ob.get("r3", 0)); n.model = String(ob.get("model", "")); n.ex = ob.get("ex", "000000000000")
		n.pos = U.v3(ob.pos); n.rot = U.v3(ob.rot)
		n.name = "obj%02d_%s" % [i, n.model if n.model != "" else "none"]
		n.transform = U.trs(U.v3(ob.pos), U.euler(ob.rot[0], ob.rot[2], ob.rot[1], EULER_ORDER_ZYX), 0.1)
		_add(g, n, root)
		if n.drawn:
			var mi := _inst("res://scenes/models/objects/%s.tscn" % n.model)
			if mi: mi.name = "model"; _add(n, mi, root)
	# items
	g = _group(root, "Items")
	var its: Array = d.get("items", [])
	for i in its.size():
		var it: Dictionary = its[i]
		var n := Node3D.new(); n.set_script(load("res://scripts/scene/placed_item.gd"))
		n.index = i; n.flags = it.flags; n.id = int(it.id); n.r3 = int(it.get("r3", 0)); n.ex = it.get("ex", "000000000000"); n.rot = U.v3(it.rot)
		n.name = "item%02d_it_%s" % [i, U.pad(int(it.id), 3)]
		n.transform = U.trs(U.v3(it.pos), U.euler(it.rot[0], it.rot[2], it.rot[1], EULER_ORDER_ZYX), 0.1)
		_add(g, n, root)
		var mi := _inst("res://scenes/models/items/it_%s.tscn" % U.pad(int(it.id), 3))
		if mi: mi.name = "model"; _add(n, mi, root)
	# enemies / characters
	g = _group(root, "Enemies")
	var ene: Array = d.get("enemies", [])
	for i in ene.size():
		var e: Dictionary = ene[i]
		var n := Node3D.new(); n.set_script(load("res://scripts/scene/enemy_spawn.gd"))
		n.room_id = id; n.index = i; n.flags = e.flags; n.r3 = int(e.get("r3", 0)); n.ex = e.get("ex", "000000000000"); n.id = int(e.id)
		n.rot = U.v3(e.get("rot", [0, 0, 0]))
		n.name = "enemy%02d_en%s" % [i, U.pad(int(e.id), 2)]
		n.position = U.v3(e.pos)
		n.rotation.y = float(e.rot[EnemySpawn.heading_axis(n.id, n.ex, id)])
		_add(g, n, root)
	# spawns
	g = _group(root, "Spawns")
	var sp: Array = d.get("spawns", [])
	for i in sp.size():
		var s: Dictionary = sp[i]
		var n := Marker3D.new(); n.set_script(load("res://scripts/scene/spawn_point.gd"))
		n.name = "spawn%d" % i; n.raw = int(s.get("raw", 0)); n.position = U.v3(s.pos); n.rotation.y = float(s.ang)
		_add(g, n, root)
	# cameras
	g = _group(root, "Cameras")
	var cams: Array = d.get("cameras", [])
	for i in cams.size():
		var c: Dictionary = cams[i]
		var n := Camera3D.new(); n.set_script(load("res://scripts/scene/room_cam.gd"))
		n.name = "cam%02d" % i
		var rec := c.duplicate(true)
		for k in ["pos", "pitch", "yaw", "roll"]: rec.erase(k)
		n.rec = _ints(rec)
		n.fov = 46.0; n.near = 0.05; n.far = 200.0; n.keep_aspect = Camera3D.KEEP_HEIGHT; n.current = false
		n.transform = Transform3D(RoomCam.basis_of(float(c.pitch), float(c.yaw), float(c.roll)), U.v3(c.pos))
		_add(g, n, root)
	# ATR records
	for grp in [["Triggers", "triggers", "trigger"], ["Collision", "collision", "collision"], ["Areas", "areas", "area"]]:
		g = _group(root, grp[0])
		var arr: Array = d.get(grp[1], [])
		for i in arr.size():
			var a: Dictionary = arr[i]
			var n := Node3D.new(); n.set_script(load("res://scripts/scene/atr_box.gd"))
			n.name = "%s%02d" % [grp[2], i]
			n.kind = grp[2]; n.type_hex = String(a.type); n.flags_hex = String(a.flags); n.extra = int(a.extra)
			n.position = Vector3(float(a.x), float(a.y), float(a.z)); n.size = Vector3(float(a.sx), float(a.sy), float(a.sz))
			_add(g, n, root)
	# light tables
	for grp in [["Lights", "lgt"], ["EventLights", "evl"]]:
		g = _group(root, grp[0])
		var arr: Array = d.get(grp[1], [])
		for i in arr.size():
			var L: Dictionary = arr[i]
			var n := Node3D.new(); n.set_script(load("res://scripts/scene/room_light.gd"))
			n.name = "light%02d" % i
			var rec := L.duplicate(true)
			for k in ["flg", "type", "lsrc", "c", "nr", "fr", "p"]: rec.erase(k)
			n.rec = _ints(rec)
			n.flg = int(L.flg); n.type = int(L.type); n.lsrc = int(L.lsrc); n.c = U.v3(L.c); n.nr = float(L.nr); n.fr = float(L.fr)
			n.position = U.v3(L.p)
			_add(g, n, root)
	# effect table (rain, fire, smoke, room sprites ...)
	g = _group(root, "Effects")
	var ep := "res://assets/eft/%s.json" % id
	var ef: Array = JSON.parse_string(FileAccess.get_file_as_string(ep)) if FileAccess.file_exists(ep) else []
	for i in ef.size():
		var E: Dictionary = ef[i]
		var n := Node3D.new(); n.set_script(load("res://scripts/scene/room_effect.gd"))
		n.name = "eff%02d_%d" % [i, int(E.id)]
		n.flg = int(E.flg); n.id = int(E.id); n.type = int(E.type); n.flr = int(E.get("flr", 0)); n.mdlver = int(E.get("mdlver", 0))
		n.s = U.v3(E.s); n.ax = int(E.ax); n.ay = int(E.ay); n.lk = String(E.get("lk", ""))
		n.position = U.v3(E.p) * 0.1
		_add(g, n, root)
	_save(root, path)
