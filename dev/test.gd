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
		"det": await det_test()
		"grab": await grab_test()
		"box": await box_test()
		"cine": await cine_test()
		"face": await face_test()
		"zmorph": await zmorph_test()
		"zai": await zai_test()
		"use": await use_test()
		"file": await file_test()
	print("DONE")
	get_tree().quit()

func sleep(ms: float) -> void:
	await get_tree().create_timer(ms / 1000.0).timeout

func stt() -> String:
	if vm == null: return ""
	var tasks := []
	for i in vm.tasks.size():
		if vm.tasks[i].status: tasks.append("%d:e%d@%x" % [i, vm.tasks[i].scr - 2, vm.tasks[i].p])
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
	var ua := OS.get_cmdline_user_args()
	var ids: Array = ua.slice(1) if ua.size() > 1 else ["rm_0010", "rm_0020", "rm_0021", "rm_0030", "rm_0031", "rm_0040", "rm_0050", "rm_0060", "rm_0070", "rm_0080", "rm_0090", "rm_0160"]
	for id in ids:
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

func det_test() -> void:
	g.sim(1); vm.cb |= 0x10000000
	await wait_free(); g.set_weapon(1)
	await g.enter_room("rm_0090", 0, null, false)
	await wait_free(); await snap("det in")
	for i in vm.flr.size():
		var a: Dictionary = vm.flr[i]
		print("flr %d flg %d type %d attr %x x %.2f..%.2f z %.2f..%.2f prm %s" % [i, a.flg, a.type, a.attr, a.x, a.x + a.w, a.z, a.z + a.d, str(a.get("prm", []))])
	var a := OS.get_cmdline_user_args()
	P.place(float(a[1]), P.position.y, float(a[2]), float(a[3])); await sim(0.2)
	for k in 30:
		await sim(0.5, ["KeyW"] if (k < 6 or (k >= 11 and k < 14)) else [])
		print("  t", k, " busy ", g.busy, " cine ", g.in_cine, " msg ", g.msg.active, " dlg ", g._dialog, " ", stt())
		pass
		if k >= 2 and k <= 13: await snap("det%02d" % k)
	print("ov ", g.cam._override, " busy ", g.busy, " cine ", g.in_cine, " movie ", g.movie_playing())

## zombie grab: front/back bite, shove-off and the death variant
func grab_test() -> void:
	g.sim(1)
	await wait_free()
	var a := OS.get_cmdline_user_args()
	await g.enter_room(a[1] if a.size() > 1 else "rm_0050", 0, null, false)
	await wait_free()
	print("zombies ", g.zombies.size())
	for pass_i in 3:
		var z: Zombie = null
		for zz in g.zombies:
			if zz.alive: z = zz; break
		if z == null: print("no zombie"); return
		z.set_state("walk"); var ww = vm.work(1, z.index); ww.hidden = false; ww.gone = false
		var f := z.forward()
		var front := pass_i != 1
		var pp := z.position + f * 0.8
		P.place(pp.x, P.position.y, pp.z, z.heading + PI if front else z.heading)
		P.hp = 200 if pass_i < 2 else 1
		z.set_state("bite"); g._start_grab(z)
		print("z ", z.position, " vis ", z.visible, " in tree ", z.is_inside_tree(), " P ", P.position, " zg ", z.global_position)
		for k in 8:
			await sim(0.45)
			print("  grab%d t%d grab %s pl %s/%d P %s %.2f hp %d z m%d/%d mtn %d:%d p %s ay %d" % [pass_i, k, g.grab != null, z.pl_state, z._pm3, str(P.position), P.heading, P.hp, z.mode0, z.mode3, z.lo.no, z.lo.frm >> 16, str(z.position), z._ay])
			await snap("grab%d_%02d" % [pass_i, k])
		g.grab = null; P.play_sync(null); P.hp = 200; z.set_state("walk")

## rm_0090 security boxes: lid (object part transform) + box screen, items left in box A come out of box B
func box_test() -> void:
	g.sim(1); vm.cb |= 0x10000000
	await wait_free(); g.set_weapon(1)
	await g.enter_room("rm_0090", 0, null, false)
	await wait_free()
	for i in [3, 4]:
		var a: Dictionary = vm.flr[i]; print("flr %d x %.2f..%.2f z %.2f..%.2f" % [i, a.x, a.x + a.w, a.z, a.z + a.d])
	for i in [11, 12]:
		var a: Dictionary = vm.etc[i]; print("etc %d flg %d type %d x %.2f..%.2f z %.2f..%.2f" % [i, a.flg, a.type, a.x, a.x + a.w, a.z, a.z + a.d])
	g.inv.add(9, "Handgun", 15)
	print("inv ", g.inv.slots)
	for side in [3, 4]:
		var f: Dictionary = vm.flr[side]; var e: Dictionary = vm.etc[8 + side]
		var cx: float = f.x + f.w / 2; var cz: float = f.z + f.d / 2
		var ex: float = e.x + e.w / 2; var ez: float = e.z + e.d / 2
		P.place(cx, P.position.y, cz, atan2(-(ex - cx), -(ez - cz))); await sim(1.5)
		await wait_free()
		P.place(cx, P.position.y, cz, atan2(-(ex - cx), -(ez - cz))); await sim(1.5)
		print("parts ", _parts(14), " ", _parts(5))
		await snap("box%d_lid" % side)
		await sim(0.05); g.sim(0.05, ["KeyE"]); await sleep(10)
		await sim(1.0)
		print("scr mode ", g.inv_screen._mode, " anim ", g.inv_screen._anim, " open ", g.inv_screen.is_open)
		print("inv_open ", g.inv_open, " cb ", "%x" % vm.cb, " box ", g.inv_screen.box)
		await snap("box%d_open" % side)
		if g.inv_open:
			# side A: move the first item into the box; side B: take everything back
			for k in 6:
				g.sim(0.05, ["ArrowRight"] if (side == 3 and k == 0) else ["KeyE"]); await sleep(10); await sim(0.1)
				print("  k", k, " side ", g.inv_screen._bside, " sel ", g.inv_screen._sel, " bsel ", g.inv_screen._bsel)
				if side == 3 and k == 1: break
			await snap("box%d_moved" % side)
			print("after: inv ", g.inv.slots, " box ", g.inv_screen.box)
			g.sim(0.05, ["Escape"]); await sleep(10)
			await sim(1.5)
			print("closed inv_open ", g.inv_open, " parts ", _parts(14), " ", _parts(5))
			await snap("box%d_closed" % side)

func _parts(i: int) -> Variant:
	var w: EvtVM.Work = vm.get_work(2, i)
	return w.parts if w != null else null

## cutscene snapshots: -- cine rm_0030 pos flr secs step
func cine_test() -> void:
	var a := OS.get_cmdline_user_args()
	g.sim(1); vm.cb |= 0x10000000
	await wait_free()
	vm.cb &= ~0x10000000 & EvtVM.M32
	if a[1] == "start":
		g.set_weapon(1); await sim(0.5)
		var f0: Dictionary = vm.flr[int(a[3])]
		P.place(f0.x + f0.w / 2, P.position.y, f0.z + f0.d + 0.4, 0); await sim(1); P.place(f0.x + f0.w / 2, P.position.y, f0.z + f0.d / 2, 0)
	else:
		await g.enter_room(a[1], int(a[2]), null, false); await sim(0.5)
		var f: Dictionary = vm.flr[int(a[3])]
		P.place(f.x + f.w / 2, P.position.y, f.z + f.d / 2, PI)
	var n := int(float(a[4]) / float(a[5]))
	for k in n:
		if g.msg.active: g.sim(0.3, ["KeyE"]); await sleep(10)
		if OS.get_environment("SKIPMV") != "" and g.movie_playing():
			Input.parse_input_event(_key(KEY_ESCAPE)); await sleep(100)
		await sim(float(a[5]))
		var vis := []
		for i in g.room.obj_meshes:
			var o: Node3D = g.room.obj_meshes[i]
			var w: EvtVM.Work = vm.get_work(2, i)
			if w != null and w.link != null: vis.append("o%d:%s link %s %s s%.3f" % [i, o.visible, str(w.link.kind) + "/" + str(w.link.idx) + "/" + str(w.link.bone), str(o.global_position), o.global_transform.basis.get_scale().x])
		var zs := []
		for z in g.zombies:
			var zw: EvtVM.Work = vm.get_work(1, z.index)
			zs.append("z%d vis %s st %s cur %s pos %s scr %s mk %s mtn %s" % [z.index, z.visible, z.state, z.cur, str(z.position), zw.scripted if zw else "-", zw.mtn_kind if zw else "-", zw.mtn if zw else "-"])
		print("T%.1f cine %s chars %s zombies %s" % [(k + 1) * float(a[5]), g.in_cine, str(g.chars.map(func(c): return "%d:%s@%s" % [c.index, c.m.visible, str(c.m.global_position)])), " | ".join(zs)])
		if not vis.is_empty(): print("  links ", " | ".join(vis))
		var w4: EvtVM.Work = vm.get_work(1, 4)
		print("  movie ", g.movie_playing(), " ", stt(), " e4 frm ", (w4.frm >> 16) if w4 else -1, " mtn ", w4.mtn if w4 else -1, " kind ", w4.mtn_kind if w4 else -1)
		await snap("cine_%s_%02d" % [a[1], k])

## facial animation of the cutscene NPCs: -- face SECS STEP [room spawn]  (default: the opening cutscene of rm_0000)
func face_test() -> void:
	var a := OS.get_cmdline_user_args()
	if a.size() > 4 and a[3] != "-":
		await g.enter_room(a[3], int(a[4]), null, false)
	var n := int(float(a[1]) / float(a[2]))
	for c in g.chars:
		if c.has("face"):
			var fm: FaceMask = c.face
			print("face %d en%d surfaces %s" % [c.index, fm.id, str(fm._surf.map(func(s): return s.verts.size()))])
	var prev := ""
	for k in n:
		if g.movie_playing(): Input.parse_input_event(_key(KEY_ESCAPE)); await sleep(300)
		if g.msg.active: g.sim(0.3, ["KeyE"]); await sleep(10)
		# the opening room: walk onto FLOOR[2] (event 0, Rodrigo opens the cell)
		if a.size() <= 4 and g.room_id == "rm_0000" and not g.player.frozen and g.vm.flr.size() > 2:
			var f: Dictionary = g.vm.flr[2]
			g.player.position = Vector3(f.x + f.w / 2, g.player.position.y, f.z + f.d / 2)
			if g.weapon() != 1: g.set_weapon(1)   # bhArmsItemCheck 1: the lighter in hand
		await sim(float(a[2]))
		var st := []
		for c in g.chars:
			if not c.has("face"): continue
			var fm: FaceMask = c.face
			var nz := 0
			for i in 32: if fm.param[i] != 0.0: nz += 1
			st.append("%d: vis %s fl %x msk %d frm %d/%d lip %d m%d jaw %.1f tr %.2f eye %.2f,%.2f,%.2f tg %.1f,%.1f,%.2f" % [c.index, c.m.visible, fm.flags, fm.msk, fm.frame, fm.last, fm.lp.flag, nz, fm.param[32], fm.param[33], fm.param[34], fm.param[35], fm.param[36], fm.param[37], fm.param[38], fm.param[39]])
		var line := " | ".join(st)
		if line != prev: print("T%.1f %s cine %s | %s" % [(k + 1) * float(a[2]), g.room_id, g.in_cine, line])
		prev = line
		if a.size() <= 5 or k % int(a[5]) == 0: await snap("face_%03d" % k)

## zombie AI log: -- zai ROOM SECS STEP [x z ang | -] [snap_every]  (Claire placed at x z, or left at the door)
func zai_test() -> void:
	var a := OS.get_cmdline_user_args()
	# ZAI_FLAGS="1:117 ..." sets event flags (type:index) before the room loads (rm_0050's dogs need 1:117 from rm_0080)
	for fs in OS.get_environment("ZAI_FLAGS").split(" ", false):
		vm.set_flag(int(fs.get_slice(":", 0)), int(fs.get_slice(":", 1)), true)
	await g.enter_room(a[1], 0, null, false)
	await wait_free()
	if a.size() > 6 and a[4] != "-": P.place(float(a[4]), P.position.y, float(a[5]), float(a[6]))
	P.hp = 100000
	var n := int(float(a[2]) / float(a[3]))
	for k in n:
		if g.msg.active: g.sim(0.3, ["KeyE"]); await sleep(10)
		await sim(float(a[3]))
		# -- zai ... SNAP shoot: one handgun hit per step on every visible AI zombie
		if a.size() > 8 and a[8] == "shoot":
			for z in g.zombies:
				if z.visible and z.hittable: g.hit_zombie(z, 1.5)
			for z in g.dogs:
				if z.visible and z.hittable: g.hit_zombie(z, 1.5)
		var zs := []
		for z in g.zombies:
			if not z.visible: continue
			zs.append("z%d m%d/%d/%d/%d mtn %d:%d/%d up %d f%x x40 %x d %.1f p %.2f,%.2f ay %d" % [z.index, z.mode0, z.mode1, z.mode2, z.mode3, z.lo.no, z.lo.frm >> 16, z.lo.nf, z.up.no, z.flg, z.x40, z._dist, z.position.x, z.position.z, z._ay])
		for z in g.dogs:
			var dw: EvtVM.Work = vm.get_work(1, z.index)
			if not z.visible: zs.append("dog%d hidden gone %s hid %s scr %s" % [z.index, dw.gone if dw else "-", dw.hidden if dw else "-", dw.scripted if dw else "-"]); continue
			zs.append("dog%d t%d m%d/%d/%d/%d mtn %d:%d/%d x10 %x f%x d %.1f p %.2f,%.2f,%.2f ay %d hp %.1f pl %s%d" % [z.index, z.etype, z.mode0, z.mode1, z.mode2, z.mode3, z.w.no, z.w.frm >> 16, z.w.nf, z.x10, z.flg, z._dist, z.position.x, z.position.y, z.position.z, z._ay, z.hp, z.pl_state, z._pm3])
		if g.dog_bite != null: zs.append("BITE")
		if g.dog_hurt > 0: zs.append("HURT %s" % P.sync)
		var zw0: EvtVM.Work = vm.get_work(1, g.zombies[0].index) if g.zombies.size() else null
		print("T%.1f P %.2f,%.2f hp %d grab %s busy %s cine %s msg %s scr %s | %s" % [(k + 1) * float(a[3]), P.position.x, P.position.z, P.hp, (g.grab.z.pl_state + str(g.grab.z._pm3)) if g.grab != null else "-", g.busy, g.in_cine, g.msg.active, zw0.scripted if zw0 else "-", " | ".join(zs)])
		if a.size() > 7 and k % int(a[7]) == 0: await snap("zai_%03d" % k)

## zombie mouth morph close-up: -- zmorph ROOM
func zmorph_test() -> void:
	var a := OS.get_cmdline_user_args()
	await g.enter_room(a[1] if a.size() > 1 else "rm_0020", 0, null, false)
	await sim(0.5)
	g.running = false
	for z in g.zombies:
		if z._morph_mi == null: continue
		z.visible = true
		var cam := Camera3D.new(); add_child(cam)
		# a mouth vertex of the morph (bind space) carried by its nearest bone
		var D: Dictionary = Assets.data_json("face/zmorph_en01a%s.json" % U.pad(z.mdlver, 2))
		var mp := Vector3(D.verts[0][0], D.verts[0][1], D.verts[0][2])
		var hb := 0
		for bi in z.skel.get_bone_count():
			if z.skel.get_bone_global_rest(bi).origin.distance_to(mp) < z.skel.get_bone_global_rest(hb).origin.distance_to(mp): hb = bi
		var hp: Vector3 = z.skel.global_transform * z.skel.get_bone_global_pose(hb) * z.skel.get_bone_global_rest(hb).affine_inverse() * mp
		var fw: Vector3 = z.forward()
		cam.global_position = hp + fw * 0.45 + Vector3(0, 0.05, 0)
		cam.look_at(hp, Vector3.UP); cam.fov = 40; cam.current = true
		print("zombie ", z.index, " head ", z.skel.get_bone_name(hb), hp, " pos ", z.global_position)
		for w in [0.0, 0.5, 1.0]:
			z._morph_mi.set_blend_shape_value(0, w)
			await sleep(100)
			await snap("zmorph_%d_%.1f" % [z.index, w])
		cam.queue_free()
		break

## item use: -- use ROOM x z ang ITEM SECS [snap_every] [trace]  (Claire placed in an area, the item used from the inventory)
func use_test() -> void:
	var a := OS.get_cmdline_user_args()
	for fs in OS.get_environment("ZAI_FLAGS").split(" ", false):
		vm.set_flag(int(fs.get_slice(":", 0)), int(fs.get_slice(":", 1)), true)
	await g.enter_room(a[1], 0, null, false)
	await wait_free()
	P.place(float(a[2]), P.position.y, float(a[3]), float(a[4]))
	var id := int(a[5])
	g.inv.add(id, Text.ITEM_NAMES.get(id, ""))
	await sim(0.3)
	print("before ", stt(), " flr ", vm.flr_idx)
	if a.size() > 8 and a[8] == "trace": vm.trace = true
	vm.st |= 8   # the subscreen is open
	print("use ", g.use_item(id))
	var n := int(float(a[6]) / 0.25)
	for k in n:
		if g.msg.active: print("MSG ", stt()); g.sim(0.3, ["KeyE"]); await sleep(10)
		await sim(0.25)
		if a.size() > 7 and k % int(a[7]) == 0: await snap("use_%03d" % k)
		elif k % 4 == 0: print("T%.2f %s" % [(k + 1) * 0.25, stt()])
	# EX1="x z ang secs": the action button there before the USE2 steps (messages answered with the default choice)
	var ex1 := OS.get_environment("EX1").split(" ", false)
	if ex1.size() > 3:
		P.place(float(ex1[0]), P.position.y, float(ex1[1]), float(ex1[2]))
		await sim(0.2)
		g.sim(0.1, ["KeyE"]); await sleep(10)
		for k in int(float(ex1[3]) / 0.25):
			if g.msg.active: print("MSG ", stt()); g.sim(0.3, ["KeyE"]); await sleep(10)
			await sim(0.25)
			if k % 4 == 0: print("X%.2f %s" % [(k + 1) * 0.25, stt()])
		print("flags 7b ", vm.flag(1, 0x7b), " 7c ", vm.flag(1, 0x7c), " 7d ", vm.flag(1, 0x7d), " rm %x" % vm.rm)
	# USE2="x z ang id secs; ..." more item uses after the first (multi-step machines like rm_0090's cutter)
	for st_ in OS.get_environment("USE2").split(";", false):
		var u := st_.strip_edges().split(" ", false)
		P.place(float(u[0]), P.position.y, float(u[1]), float(u[2]))
		g.inv.add(int(u[3]), Text.ITEM_NAMES.get(int(u[3]), ""))
		await sim(0.3)
		vm.st |= 8
		print("use2 ", u[3], " flr ", vm.flr_idx if vm.cb & 0x200 else -1, " -> ", g.use_item(int(u[3])))
		for k in int(float(u[4]) / 0.25):
			if g.msg.active: print("MSG ", stt()); g.sim(0.3, ["KeyE"]); await sleep(10)
			await sim(0.25)
			if k % 4 == 0: print("U%.2f %s" % [(k + 1) * 0.25, stt()])
	# -- use ... SNAP trace|- ex X Z ANG: then the action button there (the item screen / message it opens)
	if a.size() > 12 and a[9] == "ex":
		P.place(float(a[10]), P.position.y, float(a[11]), float(a[12]))
		await sim(0.2)
		if a.size() > 13: await sim(float(a[13]), ["KeyW"]); await sim(0.3); print("walked to ", P.position)
		g.sim(0.1, ["KeyE"]); await sleep(10)
		for k in 12:
			if g.msg.active: print("MSG ", stt()); g.sim(0.3, ["KeyE"]); await sleep(10)
			await sim(0.25)
			print("E%.2f inv_open %s dialog %s %s" % [(k + 1) * 0.25, g.inv_open, g._dialog, stt()])
	print("inv ", g.inv.has(id), " slots ", g.inv.slots.map(func(x): return x.id if x else -1))

## file ROOM POS [get | menu MASK]: pick up the room's document (etc type 4, attr 0x10) / the FILE command
func _fsim(sec: float, k: Array, shot := "") -> void:
	await sim(sec, k); await sleep(20)
	if shot != "": await snap(shot)
	print("  fv ", g.file_view.phase, " act ", g.file_view.active, " page ", g.file_view.page, " exit ", g.file_view.exit_vis, "/", g.file_view.exit_dim, " sel ", g.file_view.filecsr, ":", g.file_view.tag, " z ", g.file_view.z, " ang ", g.file_view.child_ang, " inv ", g.inv_screen._mode, " cb %x" % vm.cb)

func file_test() -> void:
	var a := OS.get_cmdline_user_args()
	await g.enter_room(a[1], int(a[2]), null, false)
	await wait_free()
	if a[3] == "act":
		for i in vm.etc.size():
			var e0: Dictionary = vm.etc[i]
			print("etc ", i, " type ", e0.type, " flg ", e0.flg, " attr %x" % e0.attr, " prm ", e0.prm)
		var e1: Dictionary = vm.etc[int(a[4])]
		var cx1: float = e1.x + e1.w / 2; var cz1: float = e1.z + e1.d / 2
		for h in [0.0, PI / 2, PI, -PI / 2]:
			var f := Vector2(-sin(h), -cos(h))
			P.place(cx1 - f.x * 0.4, P.position.y, cz1 - f.y * 0.4, h)
			await sim(0.05); g.sim(0.05, ["KeyE"]); await sleep(10)
			if g.msg.active or g._dialog or g.file_view.active: break
		for k in 30:
			if g.msg.active: print("MSG ", stt()); g.sim(0.1, ["KeyE"]); await sleep(10)
			await _fsim(0.25, [], "act_%02d" % k if k % 6 == 3 else "")
			if g.file_view.active and g.file_view.phase == "read": g.sim(0.1, ["KeyD"]); await sleep(10)
			if g.file_view.exit_vis: g.sim(0.1, ["KeyD"]); g.sim(0.1, []); g.sim(0.1, ["KeyE"]); await sleep(10)
			if g.file_view.phase == "filed": await _fsim(0.3, [], "act_filed"); g.sim(0.1, ["KeyE"]); await sleep(10)
		print("owned %x" % g.file_view.owned)
		return
	if a[3] == "get":
		var idx := -1
		for i in vm.etc.size():
			var e: Dictionary = vm.etc[i]
			if e.flg & 1 and e.type == 4: print("etc ", i, " attr %x" % e.attr, " prm ", e.prm)
			if e.flg & 1 and e.type == 4 and e.attr & 0x10: idx = i
		if idx < 0: print("no document"); return
		var e: Dictionary = vm.etc[idx]
		var cx: float = e.x + e.w / 2; var cz: float = e.z + e.d / 2
		for h in [0.0, PI / 2, PI, -PI / 2]:
			var f := Vector2(-sin(h), -cos(h))
			P.place(cx - f.x * 0.2, P.position.y, cz - f.y * 0.2, h)
			await sim(0.05); g.sim(0.05, ["KeyE"]); await sleep(10)
			if g.file_view.active: break
		await _fsim(0.2, [], "get_slide")
		await _fsim(1.0, [], "get_page0")
		for k in 8:
			await _fsim(0.1, ["KeyD"]); await _fsim(1.2, [], "get_page%d" % (k + 1))
			if g.file_view.exit_vis: break
		await _fsim(0.1, ["KeyD"], "get_exitlit")
		await _fsim(0.1, ["KeyE"]); await _fsim(0.5, [], "get_filed")
		await _fsim(0.1, ["KeyE"]); await _fsim(0.5, [])
		print("owned %x" % g.file_view.owned, " inv ", g.inv.slots.map(func(x): return x.id if x else -1), " ", stt())
		return
	g.file_view.owned = int(a[4]) if a.size() > 4 else 1
	g.toggle_inv(true)
	await _fsim(1.0, [])
	g.inv_screen._mode = "menu"; g.inv_screen._menu_sel = 1; g.inv_screen.render()
	await _fsim(0.1, ["KeyE"]); await _fsim(0.5, [], "menu_binders")
	await _fsim(0.2, ["KeyA"]); await _fsim(0.5, [], "menu_rot1")
	await _fsim(0.2, ["KeyD"]); await _fsim(0.5, [], "menu_rot0")
	await _fsim(0.1, ["KeyE"]); await _fsim(0.15, [], "menu_spread")
	await _fsim(0.6, [], "menu_tag")
	await _fsim(0.1, ["KeyS"]); await _fsim(0.3, [], "menu_tag2")
	await _fsim(0.1, ["KeyE"]); await _fsim(1.0, [], "menu_read")
	await _fsim(0.1, ["Escape"]); await _fsim(0.5, [], "menu_back")
	await _fsim(0.1, ["Escape"]); await _fsim(0.8, [], "menu_untag")
	await _fsim(0.1, ["Escape"]); await _fsim(0.5, [], "menu_top")
