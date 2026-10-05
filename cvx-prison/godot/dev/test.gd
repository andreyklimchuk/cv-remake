extends Node
## Headless test harness (port of dev/t_lib.js): `godot --headless --path . res://dev/test.tscn -- flow`
## Screenshots (shots/NAME.png) are written when running with a real renderer (xvfb-run, no --headless).

var ui: UIRoot
var g: Game
var vm: EvtVM
var P: Player
var shots := 0

func _ready() -> void:
	var args := OS.get_cmdline_user_args()
	var which: String = args[0] if args.size() else "flow"
	if which == "title":
		var m: Node = load("res://scenes/main.tscn").instantiate(); add_child(m)
		await sleep(1500); await snap("title")
		if args.size() > 1:
			if args[1] == "load": Input.parse_input_event(_key(KEY_DOWN)); await sleep(200)
			Input.parse_input_event(_key(KEY_ENTER)); await sleep(100)
			var e := _key(KEY_ENTER); e.pressed = false; Input.parse_input_event(e)
			for k in (int(args[2]) if args.size() > 2 else 12):
				await sleep(1000)
				var gm: Game = m.game
				if gm and gm.movie_playing() and args.size() <= 3: Input.parse_input_event(_key(KEY_ESCAPE))
				if gm:
					for op in gm.fx._trs2d: print("2d ", op.tex, " ", op.ani, " p ", op.px, ",", op.py, " s ", op.sx, ",", op.sy, " uv ", op.tv[0].u, ",", op.tv[1].u, ",", op.tv[0].v, ",", op.tv[2].v, " layer ", gm.fx.layer.size)
				if gm: print("t%d %s busy %s cine %s movie %s msg %s fade %.2f" % [k, gm.room_id, gm.busy, gm.in_cine, gm.movie_playing(), gm.msg.active, m.ui.fade_rect.modulate.a])
			await snap("after_" + args[1])
		get_tree().quit(); return
	ui = UIRoot.new(); add_child(ui)
	g = Game.new(ui); add_child(g)
	vm = g.vm; P = g.player; g.debug = true
	await g.start(null if which != "load" else Game.load_save())
	g.running = false
	match which:
		"flow": await flow()
		"rooms": await rooms()
		"shot": await shot_rooms()
		"ui": await ui_test()
		"cam": await cam_test()
	print("DONE")
	get_tree().quit()

func sleep(ms: float) -> void:
	await get_tree().create_timer(ms / 1000.0).timeout

func stt() -> String:
	if vm == null: return ""
	var tasks := []
	for i in vm.tasks.size():
		if vm.tasks[i].status: tasks.append("%d:e%d" % [i, vm.tasks[i].scr - 2])
	var m := "-"
	if g.msg.active: m = JSON.stringify(ui.msg_text.text.substr(0, 60))
	return "%s cb %x st %x tasks %s msg %s frozen %s pos %.2f,%.2f cam %d shown %d ov %d mode %s" % [g.room_id, vm.cb, vm.st, " ".join(tasks), m, P.frozen, P.position.x, P.position.z, g.cam.index, g.cam.shown, g.cam._override, g.cam.mode]

func snap(t: String) -> void:
	print(t, " ", stt())
	if DisplayServer.get_name() == "headless": return
	await RenderingServer.frame_post_draw
	var img := get_viewport().get_texture().get_image()
	DirAccess.make_dir_recursive_absolute("res://shots")
	shots += 1
	img.save_png("res://shots/%02d_%s.png" % [shots, t.replace(" ", "_").replace("/", "_")])

func sim(s: float, k: Array = []) -> void:
	g.sim(s, k); await sleep(5)

func close_msgs() -> void:
	for i in 20:
		if not (g.msg.active or g._dialog or g.busy): return
		if g.busy and not g.msg.active:
			await sleep(200); continue
		g.sim(0.4, ["KeyE"]); await sleep(10)

func wait_free(mx := 60) -> bool:
	for i in mx:
		if g.msg.active or g._dialog:
			await close_msgs(); continue
		if g.busy or g.movie_playing():
			if g.movie_playing(): Input.parse_input_event(_key(KEY_ESCAPE))
			await sleep(200); continue
		if not g.in_cine: return true
		if vm.cb & 4: await sim(0.1, ["Escape"])
		await sim(1)
	return false

func _key(k: Key) -> InputEventKey:
	var e := InputEventKey.new(); e.keycode = k; e.physical_keycode = k; e.pressed = true
	return e

func act(i: int, label := "") -> bool:
	var a: Dictionary = vm.etc[i]
	var cx: float = a.x + a.w / 2; var cz: float = a.z + a.d / 2
	var d: float = [0.45, 0.075, 0.45, 0.6, 0.2][a.type] if a.type < 5 else 0.45
	for h in [0.0, PI / 2, PI, -PI / 2]:
		var f := Vector2(-sin(h), -cos(h))
		P.place(cx - f.x * d, P.position.y, cz - f.y * d, h)
		await sim(0.05); g.sim(0.05, ["KeyE"]); await sleep(10); await sim(0.1)
		if g.msg.active or g._dialog or g.busy or g._pending_door != null:
			await snap(label if label != "" else "etc%d" % i); await close_msgs(); return true
	print("no reaction etc%d" % i)
	return false

func list_etc() -> void:
	for i in vm.etc.size():
		var a: Dictionary = vm.etc[i]
		print("etc %d flg %d type %d attr %x prm %s c %.2f %.2f" % [i, a.flg, a.type, a.attr, str(a.prm), a.x + a.w / 2, a.z + a.d / 2])

func inv() -> void:
	var a := []
	for s in g.inv.slots:
		if s != null: a.append("%d:%d" % [s.id, s.count])
	print("inv ", a)

func flow() -> void:
	g.sim(1); vm.cb |= 0x10000000
	await wait_free(); g.set_weapon(1); await sim(2); await wait_free(); await snap("free")
	await act(7); await act(4); await act(8); inv()
	await act(0, "door"); await wait_free(); await snap("in " + g.room_id); list_etc()
	var its := []
	for i in (g.room.data.get("items", []) as Array).size():
		var it: Dictionary = g.room.data.items[i]
		its.append([i, it.id, it.get("name", ""), g.room.item_meshes[i].visible if g.room.item_meshes.has(i) else null])
	print("items ", its)
	await act(2); await act(3); inv(); await act(1, "typewriter"); await act(4, "etc4")
	await act(0, "door10"); await wait_free(); await snap("in " + g.room_id)

func rooms() -> void:
	for id in ["rm_0010", "rm_0020", "rm_0021", "rm_0030", "rm_0031", "rm_0040", "rm_0050", "rm_0060", "rm_0070", "rm_0080", "rm_0090", "rm_0160"]:
		await g.enter_room(id, 0, null, false)
		for k in 6:
			await sim(1); await sleep(50); await close_msgs()
			if g.movie_playing(): Input.parse_input_event(_key(KEY_ESCAPE)); await sleep(300)
		await snap("room " + id)
		print("R ", id, " zombies ", g.zombies.size(), " dogs ", g.dogs.size(), " chars ", g.chars.size(), " msg ", g.msg.active)

func shot_rooms() -> void:
	await rooms()

func ui_test() -> void:
	g.running = true
	g.sim(1); vm.cb |= 0x10000000
	await wait_free(); g.set_weapon(1); await sim(2); await wait_free(); await snap("free")
	await act(4, "pickup"); await sleep(600); await snap("pickup2")
	await close_msgs()
	g.toggle_inv(true); await sleep(1200); await snap("inventory")
	g.toggle_inv(false); await sleep(1000)
	await act(7, "etc7")
	g.toggle_camera(); await sim(0.5); await snap("behind")
	await sim(1.5, ["KeyW"]); await snap("behind_walk")

func cam_test() -> void:
	g.sim(1); vm.cb |= 0x10000000
	await wait_free()
	P.place(1.95, P.position.y, 5.6, 0); await sim(0.2)
	var c := g.cam
	print("idx ", c.index, " shown ", c.shown, " zone ", c._zone_cam(P.position))
	for i in c._cams.size():
		var cd: Dictionary = c._cams[i]
		var a := c._aim(cd, P.position)
		var cp := U.v3(cd.pos)
		var b := CameraRig.cam_basis(a.pitch, a.yaw, float(cd.roll))
		var out := []
		for q in [P.position + Vector3(0, 0.9, 0), P.head_pos(), P.position + Vector3(0, 0.3, 0)]:
			var n := CameraRig.project(cp, b, CameraRig.FOV, q)
			out.append("n(%.2f,%.2f,%.2f) free %.2f L %.2f" % [n.x, n.y, n.z, g.room.clear_distance(cp, q, c._cut[i]), cp.distance_to(q)])
		print("cam ", i, " vis ", c.visible(i, P.position, P.head_pos()), " ", out)
