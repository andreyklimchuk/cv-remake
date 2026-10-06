class_name Game
extends Node3D
## Port of game.ts: room loading, the event system glue (EvtHost), enemies, items, saving and the main loop.

## rooms converted from the PS3 data (room file = rm_<stage><room><case>)
const ROOMS := ["rm_0000", "rm_0010", "rm_0020", "rm_0021", "rm_0030", "rm_0031", "rm_0040", "rm_0050", "rm_0060", "rm_0070", "rm_0080", "rm_0090", "rm_0160"]
## cutscene character models (enNNaVV)
const NPC_MODELS := ["en91a00", "en93a00", "en98a00", "en62a00"]
## converted zombie models en01aNN (NN = model variant byte of the enemy record)
const ZOMBIE_VARIANTS := [0, 1, 2, 9, 10, 32, 33]
## en01_PersonalType add_atk per model variant
const EN01_ADD_ATK := {0: 0, 1: 5, 2: 5, 9: 0, 10: 0, 32: 5, 33: 8}
const LIGHTER := 55
const KNIFE := 8
const HANDGUN := 9
const BULLETS := 12
const MAG := 15
## WeaponSet numbers used by the scripts (ArmsItemCheck / WeaponSet)
const WPN_NO := {55: 1, 8: 2, 9: 4}
## handgun damage against zombies (8 hit points)
const GUN_DMG := 1.5
## probe distance in front of the player per trigger type (bhCheckExmAtari)
const EXM_DIST := [0.45, 0.075, 0.45, 0.6, 0.2]
const SAVE_PATH := "user://save.json"
const SETTINGS := "user://settings.cfg"

var ui: UIRoot
var fx := Effects.new()
## light.c: room / event light tables and ambient
var lights := RoomLights.new()
var cam := CameraRig.new()
var input := GameInput.new()
var player := Player.new()
var inv := Inventory.new()
var msg: MessageBox
var room: Room = null
var room_id := ""
var busy := false
var inv_open := false
var inv_screen: InventoryScreen
var debug := false
var audio := GameAudio.new()
var play_time := 0.0
## event script interpreter (story flags persist across rooms)
var vm: EvtVM
var running := false
var on_ready: Callable

var _evt_acc := 0.0
var _wall_sig := ""
var _movie_on := false
var _pending_door: Variant = null
var _dialog := false
var _hid_sig := ""
var _shake := Vector3.ZERO
var _over_shown := false
var _link_base := {}   # Node3D -> Transform3D

var actors: Array = []
## cutscene characters of the room record: [{index, m: EnemyModel}]
var chars: Array = []
## [{root, hittable: Callable, hit: Callable}]
var npcs: Array = []
var zombies: Array = []
var dogs: Array = []
## dog bite in progress (Claire d00/d05, fatal d03/d04)
var dog_bite: Variant = null
## zombie bite in progress (Claire z00/z01 + zombie m00, then z02/z03 push-off)
var grab: Variant = null

func _init(ui_: UIRoot) -> void:
	ui = ui_
	name = "Game"

func _ready() -> void:
	add_child(audio)
	add_child(cam.cam)
	cam.cam.current = true
	add_child(player)
	add_child(fx)
	ui.add_layer(fx.layer, true)
	msg = MessageBox.new(ui)
	msg.on_cursor = func() -> void: audio.se("cursor")
	vm = EvtVM.new(self)
	inv_screen = InventoryScreen.new()
	inv_screen.setup(inv, input, audio, player)
	ui.add_layer(inv_screen, false)
	inv_screen.visible = false
	inv_screen.on_equip_change = _equip_changed
	inv_screen.on_use_item = func(id: int) -> bool: return use_item(id)
	lights.lock_fn = func(f: int, n: int, l: Vector3, o: int) -> Variant: return lock_pos(f, n, l, o)
	var cfg := ConfigFile.new()
	if cfg.load(SETTINGS) == OK and cfg.get_value("game", "cam", "fixed") == "behind":
		cam.mode = "behind"
	player.on_slash = func(p: Vector3, _d: Vector3) -> void: on_slash(p)
	player.can_fire = func() -> bool:
		var g: Variant = _gun()
		return g != null and int(g.count) > 0
	player.empty_click = func() -> void: audio.se("empty")
	player.on_step = func(foot: String, type: int) -> void:
		var p: Variant = bone_pos(0, 0, 17 if foot == "b17" else 21) if foot != "" else player.position
		audio.foot(floor_sound(p), type == 1, p, 0)
	player.on_fire = func(p: Vector3, d: Vector3, aim: int) -> bool: return on_fire(p, d, aim)
	player.need_reload = func() -> bool:
		var g: Variant = _gun()
		var b: Variant = inv.find(BULLETS)
		if g == null or int(g.count) > 0 or b == null:
			return false
		var n := mini(MAG, int(b.count)); g.count = int(g.count) + n; b.count = int(b.count) - n
		if int(b.count) <= 0:
			inv.slots[inv.slots.find(b)] = null
		audio.se("reload")
		return true

func _gun() -> Variant:
	return inv.find(HANDGUN)

func _equip_changed() -> void:
	player.set_lighter(inv_screen.standard == LIGHTER)
	player.set_knife(inv_screen.equipped == KNIFE)
	player.set_gun(inv_screen.equipped == HANDGUN)

func start(save: Variant = null) -> void:
	player.load_model()
	if save != null:
		player.hp = int(save.get("hp", 160))
		inv.slots = []
		for s in save.inv:
			if s == null: inv.slots.append(null)
			else:
				var d: Dictionary = s.duplicate()
				d.id = int(d.id); d.count = int(d.get("count", 1))
				inv.slots.append(d)
		while inv.slots.size() < 8: inv.slots.append(null)
		inv_screen.box.clear()
		for s in save.get("box", []):
			var d: Dictionary = s.duplicate(); d.id = int(d.id); d.count = int(d.get("count", 1)); inv_screen.box.append(d)
		inv_screen.equipped = int(save.eq) if save.get("eq") != null else null
		inv_screen.standard = int(save.std) if save.get("std") != null else null
		play_time = float(save.get("t", 0))
		if save.get("evt") != null:
			vm.f = _int_flags(save.evt.f); vm.rcase = int(save.evt.rcase)
		await enter_room(save.room, int(save.get("pos", 0)), {"x": float(save.x), "y": float(save.y), "z": float(save.z), "h": float(save.h)}, false)
	else:
		# Claire starts with her lighter (rm_0000 scripts check it with PlItemCheck / ArmsItemCheck)
		inv.add(LIGHTER, Text.ITEM_NAMES.get(LIGHTER, ""))
		await enter_room("rm_0000", 0, null, false)
	_equip_changed()
	running = true
	if on_ready.is_valid(): on_ready.call()
	# a new game is faded in by the opening event of rm_0000
	if save != null: await ui.fade(false, 900)

## JSON numbers come back as floats: the flag words of the VM are ints
static func _int_flags(f: Variant) -> Dictionary:
	var out := {}
	for k in f:
		var v: Variant = f[k]
		if v is Array:
			var a := []
			for x in v: a.append(int(x))
			out[k] = a
		elif v is float: out[k] = int(v)
		else: out[k] = v
	return out

# ---------------------------------------------------------------- rooms
func enter_room(id: String, pos: int, at: Variant = null, fade := true, min_ms := 0) -> void:
	busy = true
	var t0 := Time.get_ticks_msec()
	if fade: await ui.fade(true, 350)
	if room:
		room.queue_free(); remove_child(room); vm.room_change()
	_link_base.clear()
	var r := Room.load_room(id)
	var ev: Variant = Assets.json("evt/%s.json" % id, {"scripts": []})
	if ev == null: ev = {"scripts": []}
	r.place_items()
	room = r; room_id = id
	for z in zombies + dogs: z.queue_free()
	for n in actors: n.queue_free()
	for c in chars: c.m.queue_free()
	chars = []; zombies = []; dogs = []; npcs = []; actors = []; grab = null; dog_bite = null
	# player position first (the scripts read it)
	if at != null: player.place(at.x, at.y, at.z, at.h)
	else:
		var sp: Array = r.data.spawns
		var s: Dictionary = sp[clampi(pos, 0, sp.size() - 1)]
		player.place(float(s.pos[0]), float(s.pos[1]), float(s.pos[2]), float(s.ang))
	var y: Variant = r.floor_at(player.position.x, player.position.z, player.position.y + 0.3, 0.6)
	if y != null: player.position.y = y
	# event system: bhInitEvent with the room's ATR records
	vm.stg = int(id[3]); vm.room = int(id.substr(4, 2)); vm.rcase = int(id[6]); vm.pos_no = pos
	vm.etc = (r.data.get("triggers", []) as Array).map(EvtVM.atr_from)
	vm.wal = (r.data.get("collision", []) as Array).map(EvtVM.atr_from)
	vm.flr = (r.data.get("areas", []) as Array).map(EvtVM.atr_from)
	_sync_player_work()
	cam.forced = -1; _wall_sig = ""; _hid_sig = ""
	audio.room(vm.stg, vm.room, vm.rcase); audio.listener = cam.cam
	fx.floors = vm.flr; fx.load_room(id, r.data.get("eft"))
	lights.set_room(r.data.get("lgt"), r.data.get("evl"), r.data.get("amb"))
	vm.init(ev.get("scripts", []))
	_spawn_enemies(r)
	add_child(r)
	_apply_works()
	cam.set_room(r); cam.ev.set_room(ev.get("evc", [])); cam.ev.lock = func(f: int, n: int, o: int, l: Vector3) -> Variant: return lock_pos(f, n, l, o)
	cam.update(player.position, player.head_pos(), player.heading, true)
	var wait := min_ms - (Time.get_ticks_msec() - t0)
	if wait > 0: await get_tree().create_timer(wait / 1000.0).timeout
	if fade: await ui.fade(false, 350)
	busy = false

## enemies of the room record that the scripts did not remove (InitModelSet / ENESETCK)
func _spawn_enemies(r: Room) -> void:
	var ene: Array = r.data.get("enemies", [])
	for i in ene.size():
		var e: Dictionary = ene[i]
		var ex: String = e.get("ex", "000000000000")
		var type := ex.substr(0, 4).hex_to_int()
		var variant := ex.substr(6, 2).hex_to_int()
		var eid := int(e.id)
		var rot: Array = e.get("rot", [0, 0, 0])
		var w: EvtVM.Work = vm.get_work(1, i)
		var mdl := "en%sa%s" % [U.pad(eid, 2), U.pad(variant, 2)]
		if eid == 1:
			if not ZOMBIE_VARIANTS.has(variant):
				print("%s: zombie %d model %s not converted" % [room_id, i, mdl]); continue
			# graveyard zombies (behaviour type 0 in rm_002x) lie in the ground and climb out
			var lying := type == 0 and room_id.begins_with("rm_002")
			var z := Zombie.new(i); z.mdlver = variant
			z.init("enemies/%s.glb" % mdl, float(e.pos[0]), float(e.pos[1]), float(e.pos[2]), float(rot[1] if lying else rot[2]), lying)
			zombies.append(z); add_child(z)
			var idx := i
			npcs.append({"root": z, "hittable": func() -> bool:
				var ww: EvtVM.Work = vm.get_work(1, idx)
				return z.visible and z.hittable and not (ww != null and ww.scripted), "hit": func() -> void: hit_zombie(z, 1)})
		elif eid == 4:
			var d := Dog.new(i)
			d.init("enemies/en04a00.glb", float(e.pos[0]), float(e.pos[1]), float(e.pos[2]), float(rot[2]))
			dogs.append(d); add_child(d)
			npcs.append({"root": d, "hittable": func() -> bool: return d.visible and d.hittable, "hit": func() -> void: hit_zombie(d, 1)})
		elif NPC_MODELS.has(mdl):
			# cutscene characters (Rodrigo, Steve, ...): original model, driven by the room motions of the scripts
			var m := EnemyModel.new(); m.load_model("npc/%s.glb" % mdl)
			m.position = Vector3(float(e.pos[0]), float(e.pos[1]), float(e.pos[2])); m.rotation.y = float(rot[1])
			m.visible = not (w != null and (w.gone or w.hidden))
			chars.append({"index": i, "m": m}); add_child(m)
		elif eid == 67:
			# en67: cockroaches (10 sprites of the original non-skinned model at their stored offsets). Their own movement
			# routine (en67) is not in the decompilation, so they stay at the stored positions.
			if w != null and (w.gone or w.hidden): continue
			var o := Assets.scene("npc/en67a00.glb")
			if o == null: continue
			Assets.to_lambert(o, "chr")
			o.position = Vector3(float(e.pos[0]), float(e.pos[1]), float(e.pos[2])); o.rotation.y = float(rot[1])
			actors.append(o); add_child(o)
		else:
			print("%s: character en%s (enemy %d) not converted" % [room_id, U.pad(eid, 2), i])

# ---------------------------------------------------------------- event system glue
func _sync_player_work() -> void:
	var w: EvtVM.Work = vm.work(0, 0)
	if not w.pos_set:
		w.px = player.position.x; w.py = player.position.y; w.pz = player.position.z
	if not w.ang_set:
		w.ay = player.heading

static func _set_rot(o: Node3D, w: EvtVM.Work) -> void:
	o.rotation_order = EULER_ORDER_ZYX
	o.rotation = Vector3(w.ax, w.ay, w.az)

## bhCommonCtr part offsets (WORK obj n modelK): node K of the object's model, relative to its rest pose
static func _apply_parts(o: Node3D, w: EvtVM.Work) -> void:
	for cno in w.parts:
		var q: Dictionary = w.parts[cno]
		var n := Assets.find_name(o, "n%03d" % int(cno)) as Node3D
		if n == null: continue
		if not n.has_meta("rest"): n.set_meta("rest", n.transform)
		var rest: Transform3D = n.get_meta("rest")
		var t := rest
		if q.has("ang"):
			var a: Array = q.ang
			t.basis = rest.basis * Basis.from_euler(Vector3(a[0], a[1], a[2]), EULER_ORDER_ZYX)
		if q.has("pos"):
			var p: Array = q.pos
			t.origin = rest.origin + Vector3(p[0], p[1], p[2])
		n.transform = t

## script-controlled entity state -> scene
func _apply_works() -> void:
	var r := room
	var w0: EvtVM.Work = vm.get_work(0, 0)
	if w0:
		if w0.pos_set:
			player.place(w0.px, w0.py, w0.pz, w0.ay if w0.ang_set else player.heading); w0.pos_set = false; w0.ang_set = false
		elif w0.ang_set:
			player.place(player.position.x, player.position.y, player.position.z, w0.ay); w0.ang_set = false
		player.visible = not w0.gone and not w0.hidden
	else:
		player.visible = true
	for i in r.item_meshes:
		var o: Node3D = r.item_meshes[i]
		var w: EvtVM.Work = vm.get_work(3, i)
		if w == null:
			o.visible = true; continue
		o.visible = not w.gone and not w.hidden
		if w.pos_set: o.position = Vector3(w.px, w.py, w.pz); w.pos_set = false
		if w.ang_set: _set_rot(o, w); w.ang_set = false
		# room motion of the item model (MOTION kind 3): the clip carries the world placement relative to the work position
		if w.mtn_kind == 3 and w.mtn >= 0: _node_motion(r.item_players.get(i), w)
	for i in r.obj_meshes:
		var o: Node3D = r.obj_meshes[i]
		var w: EvtVM.Work = vm.get_work(2, i)
		if w == null: continue
		# objitm.c bhDrawObject: a linked object (flg 0x80) takes the model-hidden flag (stflg 0x1000000) of its parent
		var gone := w.gone
		if w.link != null:
			var lk: Dictionary = w.link
			var pw: EvtVM.Work = vm.get_work(int(lk.kind), 0 if int(lk.kind) == 0 else int(lk.idx))
			gone = pw != null and pw.gone
		o.visible = not gone and not w.hidden and (not r.outside.has(i) or w.link != null)
		if w.pos_set: o.position = Vector3(w.px, w.py, w.pz); w.pos_set = false
		if w.ang_set: _set_rot(o, w); w.ang_set = false
		if not w.parts.is_empty(): _apply_parts(o, w)
	# WORK 4 n: effect works moved by the script (metres here, game units = 0.1 m in O_WRK)
	for w in vm.works.values():
		if w.kind == 4 and w.pos_set:
			fx.set_pos(w.idx, w.px * 10, w.py * 10, w.pz * 10); w.pos_set = false
	for c in chars:
		var w: EvtVM.Work = vm.get_work(1, c.index)
		var m: EnemyModel = c.m
		if w == null: continue
		m.visible = not w.gone and not w.hidden
		if w.pos_set: m.position = Vector3(w.px, w.py, w.pz); w.pos_set = false
		if w.ang_set: _set_rot(m, w); w.ang_set = false
		if w.mtn_kind == 1 and w.mtn >= 0: _room_motion(m, w)
	for z in zombies + dogs:
		var w: EvtVM.Work = vm.get_work(1, z.index)
		if w == null: continue
		z.visible = not w.gone and not w.hidden
		if w.pos_set:
			# POS 0 0 0 is a real position for a zombie on a room motion (rm_0030: the car zombie's shake ends at 0)
			if w.px or w.py or w.pz or w.mtn_kind == 1: z.position = Vector3(w.px, w.py, w.pz)
			w.pos_set = false
		if w.ang_set: z.heading = w.ay; z.rotation.y = w.ay; w.ang_set = false
		# room motion (rmt, MOTION kind 1): the clip carries the world placement of the root
		if w.mtn_kind == 1 and w.mtn >= 0:
			var c := "%s_r%s" % [room_id, U.pad(w.mtn, 2)]
			if z.cur != c and z.has_clip(c):
				z.position = Vector3(w.px, w.py, w.pz); z.heading = w.ay; z.rotation.y = w.ay
			_room_motion(z, w)
	var sig := ""
	for a in vm.wal: sig += "1" if int(a.flg) & 1 else "0"
	if sig != _wall_sig:
		_wall_sig = sig
		r.sync_walls(func(i: int) -> bool: return i < vm.wal.size() and bool(int(vm.wal[i].flg) & 1))

static func _in_box(a: Dictionary, x: float, z: float) -> bool:
	return x >= minf(a.x, a.x + a.w) and x <= maxf(a.x, a.x + a.w) and z >= minf(a.z, a.z + a.d) and z <= maxf(a.z, a.z + a.d)

## facing quadrant bit of the ATR attr (0x400 / 0x800 / 0x1000 / 0x2000 exclude a facing direction)
func _quad_bit() -> int:
	var a := (int(round(player.heading / TAU * 65536)) + 8192) & 0xc000
	return 0x400 if a == 0x8000 else (0x800 if a == 0x4000 else (0x1000 if a == 0 else 0x2000))

## bhCheckFloorP: floor areas under / in front of the player
func _floor_check() -> void:
	var f := player.forward(); var q := _quad_bit(); var P := player.position
	vm.cb &= ~(0x200 | 0x8000000) & EvtVM.M32
	# the floor check runs from the player's own control: not while an event drives Claire (bhPlCtr/80 ...)
	if player.frozen: return
	for i in vm.flr.size():
		var a: Dictionary = vm.flr[i]
		if not (a.flg & 1) or a.type != 0: continue
		var hit: bool
		if a.attr & 1: hit = _in_box(a, P.x + f.x * 0.6, P.z + f.z * 0.6) and not (a.attr & q)
		else: hit = _in_box(a, P.x, P.z)
		if hit:
			vm.cb |= 0x200; vm.flr_idx = i

## bhCheckExmAtari: the action button against the trigger records
func _examine() -> bool:
	var f := player.forward(); var q := _quad_bit(); var P := player.position
	vm.cb &= ~0x100 & EvtVM.M32
	for i in vm.etc.size():
		var a: Dictionary = vm.etc[i]
		if not (a.flg & 1): continue
		var d: float = EXM_DIST[a.type] if a.type < EXM_DIST.size() else 0.45
		if not _in_box(a, P.x + f.x * d, P.z + f.z * d) or (a.attr & q): continue
		vm.cb |= 0x100; vm.etc_idx = i
		if a.type == 0: door(0, a.prm[0], a.prm[1], a.prm[2])
		elif a.type == 3:
			if a.attr & 0x8000: _show_message(a.prm[1], true)
		elif a.type == 4 and not (a.attr & 2):
			var k: int = a.prm[0]
			var items: Array = room.data.get("items", [])
			var w: EvtVM.Work = vm.get_work(3, k)
			if k < items.size() and not (w != null and w.gone):
				vm.sb_id = int(items[k].id); _item_screen()
		return true
	return false

## item use from the inventory (ItemUse / Use_05): only inside a floor area that accepts the item
func use_item(id: int) -> bool:
	if not (vm.cb & 0x200): return false
	if vm.flr_idx >= vm.flr.size(): return false
	var a: Dictionary = vm.flr[vm.flr_idx]
	if not (a.prm as Array).has(id): return false
	vm.sb_id = id; vm.cb |= 0x400
	toggle_inv(false)
	return true

func _room_message(idx: int) -> String:
	var m: Array = room.data.get("messages", []) if room else []
	return m[idx] if idx >= 0 and idx < m.size() else ""

## message box for a room message; the result goes back to the scripts
func _show_message(idx: int, from_examine: bool) -> void:
	var m := _room_message(idx)
	var pg := Text.pages(m, vm.sb_id)
	var ch := Text.has_choice(m)
	if from_examine: vm.st |= 0x200 | 0x2000
	if pg.is_empty():
		vm.message_closed.call_deferred(-1, from_examine); return
	var sel: int = await msg.show(pg, [Text.yes(), Text.no()] if ch else null)
	vm.message_closed(sel if ch else -1, from_examine)

## item screen (subscreenmode 8, GetItem): the status screen opens in "get" mode with the item model,
## "Take the X?" in its message box -> cb 0x800
func _item_screen() -> void:
	var id := vm.sb_id
	var S := inv_screen
	var auto := bool(vm.cb & 0x4000); vm.cb &= ~(0x10 | 0x4000) & EvtVM.M32
	_dialog = true; inv_open = true
	await S.show_screen(true, id)
	await _item_screen_body(id, auto)
	await S.show_screen(false)
	inv_open = false; _dialog = false

## item box request (cb 0x40000; the security boxes of rm_0090 add 0x80000 = box A / 0x100000 = box B).
## Both boxes share one storage, so what is left in box A is taken out of box B past the metal detector.
func _box_screen() -> void:
	vm.cb &= ~(0x40000 | 0x80000 | 0x100000) & EvtVM.M32
	inv_open = true
	await inv_screen.show_screen(true, -1, true)

func _item_screen_body(id: int, auto: bool) -> void:
	var S := inv_screen
	if not auto:
		var c: int = await S.say(Text.pages(Text.SYSMES.get(157, ""), id), [Text.yes(), Text.no()])
		if c != 0:
			vm.cb &= ~0x8000 & EvtVM.M32; return
	var count := MAG if id == BULLETS or id == HANDGUN else 1
	if vm.cb & 0x8000 and id == HANDGUN: count -= 3
	if not inv.can_add(id):
		vm.cb &= ~0x8000 & EvtVM.M32
		# recovery items can be used on the spot (message 153), anything else: 154
		if id == 20 or id == 21 or id == 23:
			var c: int = await S.say(Text.pages(Text.SYSMES.get(153, "")), [Text.yes(), Text.no()])
			if c == 0:
				S.heal(id); vm.cb |= 0x800; S.refresh()
		else:
			await S.say(Text.pages(Text.SYSMES.get(154, "")))
		return
	inv.add(id, Text.ITEM_NAMES.get(id, ""), count)
	vm.cb |= 0x800
	if vm.cb & 0x8000 and id == HANDGUN:
		# one weapon slot: the lighter is put away
		S.equipped = HANDGUN; S.standard = null; _equip_changed()
	vm.cb &= ~0x8000 & EvtVM.M32
	S.refresh()
	await S.say(Text.pages(Text.SYSMES.get(158, ""), id))

## world transform of a script bone / object: [Transform3D, valid]
## script bone number -> node: the player model uses the original numbering; the cutscene NPC models (27 nodes)
## lack the face parts 6..14 (-> head 5) so their bones >= 15 are node - 4 (18 / 22 = wrists)
func bone_obj(kind: int, idx: int, bone: int) -> Variant:
	if kind == 0:
		var b: int = player.bones.get("b" + U.pad(bone, 2), -1)
		return player.bone_xform(b) if b >= 0 else player.global_transform
	if kind == 1:
		for c in chars:
			if c.index == idx:
				var n := bone if bone <= 5 else (5 if bone < 15 else bone - 4)
				var m: EnemyModel = c.m
				var bi := m.bone_index("b" + U.pad(n, 2))
				return m.bone_xform(bi) if bi >= 0 else m.global_transform
		for z in zombies + dogs:
			if z.index == idx:
				var bi: int = z.bone_index("b" + U.pad(bone, 2))
				return z.bone_xform(bi) if bi >= 0 else z.global_transform
		return null
	if kind == 2 and room and room.obj_meshes.has(idx): return (room.obj_meshes[idx] as Node3D).global_transform
	if kind == 3 and room and room.item_meshes.has(idx): return (room.item_meshes[idx] as Node3D).global_transform
	return null

func bone_pos(kind: int, idx: int, bone: int) -> Variant:
	var t: Variant = bone_obj(kind, idx, bone)
	return (t as Transform3D).origin if t != null else null

## bhGetEvtCamLockPosition: point of a character / object (local offset l) the event camera looks at
func lock_pos(f: int, n: int, l: Vector3, ono := 0) -> Variant:
	var r := room
	if r == null: return null
	if f == 6:
		var sp: Array = r.data.get("spawns", [])
		if sp.is_empty(): return null
		var s: Dictionary = sp[n] if n < sp.size() else sp[0]
		return Vector3(float(s.pos[0]) + l.x, float(s.pos[1]) + l.y, float(s.pos[2]) + l.z)
	var t: Variant = null
	if f == 1: t = player.global_transform
	elif f == 2:
		for c in chars:
			if c.index == n: t = (c.m as Node3D).global_transform; break
		if t == null:
			for z in zombies + dogs:
				if z.index == n: t = (z as Node3D).global_transform; break
	elif f == 3 and r.obj_meshes.has(n): t = (r.obj_meshes[n] as Node3D).global_transform
	elif f == 4 and r.item_meshes.has(n):
		var o: Node3D = r.item_meshes[n]
		var n0 := Assets.find_name(o, "n000") as Node3D
		t = (n0 if n0 else o).global_transform
	if t == null: return null
	# lkono > 0: offset in the space of that bone (njCalcPoint(owP[lkono].mtx, l)); bone numbering as bone_obj
	if ono > 0 and f <= 4:
		var b: Variant = bone_obj(f - 1, n, ono)
		if b != null: t = b
	var tr: Transform3D = t
	tr.basis = tr.basis.orthonormalized()
	return tr * l

## room motion (rmt) of a scripted character: clip time = the work's frame counter (frm_no, 16.16)
func _room_motion(m: EnemyModel, w: EvtVM.Work) -> void:
	var c := "%s_r%s" % [room_id, U.pad(w.mtn, 2)]
	if not m.has_clip(c): return
	if m.cur != c: m.play(c, 0, false)
	m.ap.speed_scale = 0
	var a := m.ap.get_animation(c)
	m.ap.seek(minf(w.frm / 65536.0 / 30.0, a.length), true)

## rmt clip on a plain node hierarchy (items): time = frm_no (16.16)
func _node_motion(ap: AnimationPlayer, w: EvtVM.Work) -> void:
	if ap == null: return
	var nm := "%s_r%s" % [room_id, U.pad(w.mtn, 2)]
	if not ap.has_animation(nm): return
	var a := ap.get_animation(nm)
	if ap.current_animation != nm:
		a.loop_mode = Animation.LOOP_NONE
		ap.play(nm, 0.0)
	ap.speed_scale = 0
	ap.seek(minf(w.frm / 65536.0 / 30.0, a.length), true)

## one 30 Hz frame of the event system
func _evt_frame() -> void:
	_sync_player_work()
	_floor_check()
	vm.tick()
	fx.update(cam.cam)
	cam.ev.step()
	_apply_works()
	_light_frame()
	if vm.cb & 0x10 and not _dialog: _item_screen()
	if vm.cb & 0x40000 and not _dialog and not inv_open: _box_screen()
	if vm.cb & 0x200000:
		vm.cb &= ~0x200000 & EvtVM.M32; _save_screen()

## bhControlLight (30 Hz): event light table while the event camera runs; player.c lights lgtp[1] while the lighter is equipped
func _light_frame() -> void:
	lights.event = cam.ev.active
	lights.lighter(weapon() == 1 and player.visible)
	_hide_frame()
	lights.frame()

## hide masks of the current camera (cut.c bhSetHideObjLgt / bhSetEventHideObjLgt): room objects and lights
func _hide_frame() -> void:
	var r := room
	if r == null: return
	var ev := cam.ev
	var k: Variant = null
	if ev.active and ev.no < ev.evc.size():
		var keys: Array = ev.evc[ev.no].get("keys", [])
		if keys.size(): k = keys[mini(ev.key, keys.size() - 1)]
	elif not ev.active and cam.shown >= 0:
		var cams: Array = r.data.get("cameras", [])
		if cam.shown < cams.size(): k = cams[cam.shown]
	var hid: Array = k.get("hid", []) if k != null and k.get("hid") != null else []
	var hidl: Array = k.get("hidl", []) if k != null and k.get("hidl") != null else []
	var sig := "%s|%s|%s|%s" % [r.data.id, ev.active, str(hid), str(hidl)]
	if sig == _hid_sig: return
	_hid_sig = sig
	r.set_hidden(hid); lights.hide(ev.active, hidl)

## light commands of the scripts (bhLightSet / bhLightTypeSet / bhLightParameterSet / bhEffAmbSet)
func light(cmd: String, a: Array) -> void:
	match cmd:
		"set": lights.set_light(a[0], a[1], a[2])
		"type": lights.set_type(a[0], a[1], a[2])
		"param": lights.param(a[0], a[1], a[2], a[3], a[4], a[5], a[6])
		"amb": lights.set_amb(a[0], a[1], a[2], a[3])

var in_cine: bool:
	get:
		var w0: EvtVM.Work = vm.get_work(0, 0)
		return bool(vm.st & 4) or (w0 != null and (w0.scripted or w0.gone))

# ---- EvtHost
func has_item(id: int) -> bool: return inv.has(id)
func lose_item(id: int) -> void:
	var i := -1
	for k in inv.slots.size():
		if inv.slots[k] != null and int(inv.slots[k].id) == id: i = k; break
	if i >= 0: inv.slots[i] = null
	if inv_screen.equipped == id: inv_screen.equipped = null
	if inv_screen.standard == id: inv_screen.standard = null
	_equip_changed()
func weapon() -> int:
	if inv_screen.standard == LIGHTER: return 1
	return WPN_NO.get(inv_screen.equipped if inv_screen.equipped != null else -1, 0)
func set_weapon(n: int) -> void:
	var id: Variant = null
	for k in WPN_NO:
		if WPN_NO[k] == n: id = k
	if id == LIGHTER:
		if inv.has(LIGHTER): inv_screen.standard = LIGHTER; inv_screen.equipped = null
	elif id != null:
		if inv.has(id): inv_screen.equipped = id; inv_screen.standard = null
	else:
		inv_screen.equipped = null; inv_screen.standard = null
	_equip_changed()
func message(idx: int) -> void: _show_message(idx, false)
func fade(argb: int, speed: int) -> void: ui.fade((argb >> 24) & 0xff >= 0x80, maxi(1, speed) * 1000.0 / 30.0)
func cine(mode: int) -> void:
	if mode == 1 or mode == 2 or mode == 4: cam.forced = -1
## CAMSET kind 0 = event camera (evc data); kind 1 = back to the room cameras
func cam_set(kind: int, a: int, b: int) -> void:
	if kind == 0: cam.ev.start(a, b)
	else: cam.ev.stop()
func cam_fix(kind: int, a: int) -> void: cam.forced = a if kind == 0 else -1
func cam_pause(on: bool) -> void: cam.ev.paused = on
func cam_init() -> void: cam.ev.stop(); cam.forced = -1
func door(_attr: int, stg: int, rm: int, pos: int, _x := 0) -> void: _pending_door = {"stg": stg, "room": rm, "pos": pos}
func movie(no: int) -> void:
	_movie_on = true
	# PlayStartMovieEx: StopBgm(0); StopVoice(0)
	audio.bgm_off(0); audio.voice_off(0)
	await Movie.play(self, "mv_%s" % U.pad(no, 3))
	_movie_on = false
func movie_playing() -> bool: return _movie_on
func eff(cmd: String, a: int, v: int) -> void:
	if cmd == "disp": fx.disp(a, v)
	elif cmd == "mode": fx.mode(a, v)
	else: fx.yure(a, v)

## bhCheckFloorSound: FLR records (flg 1, type 1) give the floor sound type (prm0) under a point
func floor_sound(p: Variant) -> int:
	if p == null: return 0
	var sno := 0
	for a in vm.flr:
		# FootDef has 5 entries (rm_0020 uses 82 near the car)
		if a.flg & 1 and a.type == 1 and not (a.attr & 1) and _in_box(a, p.x, p.z) and a.prm[0] <= 4: sno = a.prm[0]
	return sno

## ObjLinkSet* / PlyItem: linked objects and items follow their bone (MdlPut.c: bone matrix * T(lo) * R(object))
func _update_links() -> void:
	var r := room
	if r == null: return
	for w in vm.works.values():
		if w.kind != 2 and w.kind != 3: continue
		var m: Dictionary = r.obj_meshes if w.kind == 2 else r.item_meshes
		var o: Node3D = m.get(w.idx)
		if o == null: continue
		if w.link == null:
			if _link_base.has(o):
				o.transform = _link_base[o]; _link_base.erase(o)
			continue
		var lk: Dictionary = w.link
		var bt: Variant = bone_obj(int(lk.kind), int(lk.idx), int(lk.bone))
		if bt == null: continue
		if int(lk.kind) == w.kind and int(lk.idx) == w.idx: continue
		if not _link_base.has(o): _link_base[o] = o.transform
		var base: Transform3D = _link_base[o]
		var b: Transform3D = bt
		var lo: Vector3 = lk.lo if lk.lo is Vector3 else U.v3(lk.lo)
		var M := b * Transform3D(Basis(), lo) * Transform3D(base.basis, Vector3.ZERO)
		# undo the bone's own scale (models are in metres, the object keeps its 0.1 game-unit scale)
		var bs := b.basis.get_scale()
		M = M * Transform3D(Basis.from_scale(Vector3(1.0 / bs.x, 1.0 / bs.y, 1.0 / bs.z)), Vector3.ZERO)
		var par := o.get_parent() as Node3D
		if par: M = par.global_transform.affine_inverse() * M
		o.transform = M

## sound commands of the event scripts
func snd(cmd: String, a: Array, w: Variant = null) -> void:
	var A := audio
	match cmd:
		"bgm": A.bgm(a[0], a[1], a[2])
		"bgm2": A.bgm(a[0], 100, a[1])
		"bgmOff": A.bgm_off(a[0])
		"voice": A.voice(a[0], a[2] if a[1] == 1 else 0)
		"voiceOff": A.voice_off(a[0])
		"se": A.event_se(a[0], a[3], bone_pos(a[1], a[2], 0) if a[4] == 0 else null)
		"seOff": A.event_se_off(a[0])
		"bgSe": A.bg_se(a[0], a[1], a[2])
		"bgSeOff": A.bg_se_off(a[0], a[1] * 0.3)
		"objSe": A.obj_se(a[0], Vector3(a[1], a[2], a[3]), a[4])
		"objSeOff": A.obj_se_off(a[0])
		"foot":
			# bhFootSeCall: [flag (0 = on), id, type, bone] of the task's character
			if w == null or a[0] != 0: return
			var p: Variant = bone_pos(w.kind, w.idx, a[3])
			A.foot(floor_sound(p), a[2] == 1, p, mini(2, a[1]))
		"easy":
			# bhEasySESet
			var type: int = a[0]; var slot: int = a[1]; var sv: int = a[2]; var lv: int = a[3]
			var frame: int = a[6]; var flo: int = a[7]; var kind: int = a[8]; var idx: int = a[9]; var bone: int = a[10]
			var se_type: int = a[11]; var se_no: int = a[12]
			var vol := [sv, lv, frame]
			var p: Variant = bone_pos(kind, idx, bone)
			if type == 7: A.event_se(slot, se_no, null, vol)
			elif type == 1: A.foot(flo, se_type == 1, null if lv != -1 else p, mini(2, slot), vol)
			elif type == 2: A.action(se_no, p)
			elif type == 6: A.bg_se(slot, se_no)
func player_hp() -> int: return player.hp
func log_msg(s: String) -> void:
	if debug: print(s)

func _go_door(d: Dictionary) -> void:
	var id := "rm_%d%s%d" % [d.stg, U.pad(d.room, 2), vm.rcase]
	log_msg("door -> %s pos %d (from %s)" % [id, d.pos, room_id])
	busy = true
	if not ROOMS.has(id):
		# not converted: the scripts stay in this room
		vm.sp = EvtVM.M32; vm.cb &= ~1 & EvtVM.M32
		await escaped(id)
		busy = false
		return
	audio.se("door")
	await enter_room(id, d.pos, null, true, 1400)
	audio.se("doorClose")
	busy = false

## typewriter (cb 0x200000 from the rm_0010 script): the save screen uses one ink ribbon
func _save_screen() -> void:
	busy = true
	if inv.take(31):
		audio.se("typewriter")
		save()
		await msg.raw([Text.saved()])
	busy = false

func save() -> void:
	var p := player.position
	var s := {"hp": player.hp, "room": room_id, "pos": vm.pos_no, "x": p.x, "y": p.y, "z": p.z, "h": player.heading, "inv": inv.slots, "box": inv_screen.box,
		"eq": inv_screen.equipped, "std": inv_screen.standard, "evt": {"f": vm.f, "rcase": vm.rcase}, "t": play_time}
	var fa := FileAccess.open(SAVE_PATH, FileAccess.WRITE)
	if fa: fa.store_string(JSON.stringify(s)); fa.close()

static func load_save() -> Variant:
	if not FileAccess.file_exists(SAVE_PATH): return null
	return JSON.parse_string(FileAccess.get_file_as_string(SAVE_PATH))

func toggle_inv(open: bool) -> void:
	if open:
		inv_open = true; await inv_screen.show_screen(true)
	elif inv_screen.is_open:
		await inv_screen.show_screen(false); inv_open = false
	else:
		inv_open = false

func toggle_camera() -> void:
	cam.mode = "behind" if cam.mode == "fixed" else "fixed"
	var cfg := ConfigFile.new(); cfg.load(SETTINGS); cfg.set_value("game", "cam", cam.mode); cfg.save(SETTINGS)
	if cam.mode == "behind": cam.reset_yaw(player.heading)
	else: Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
	ui.toast(Text.cam_fixed() if cam.mode == "fixed" else Text.cam_behind())
	cam.update(player.position, player.head_pos(), player.heading, true)

## knife hit: enemies within reach of the blade
func on_slash(p: Vector3) -> void:
	audio.se("knife")
	for n in npcs:
		var rt: Node3D = n.root
		if n.hittable.call() and rt.position.distance_to(Vector3(p.x, rt.position.y, p.z)) < 0.6: n.hit.call()

## handgun shot: the nearest zombie in the line of fire (auto-aim like the original)
func on_fire(p: Vector3, d: Vector3, aim: int) -> bool:
	var g: Variant = _gun()
	if g == null or int(g.count) <= 0: return false
	g.count = int(g.count) - 1; audio.se("shot")
	var f := Vector2(d.x, d.z).normalized()
	var best: Variant = null
	var bd := 12.0
	for z in zombies + dogs:
		if not z.hittable: continue
		var v := Vector2(z.position.x - p.x, z.position.z - p.z)
		var dist := v.length()
		if dist > bd or dist < 0.05: continue
		var c := v.dot(f) / dist
		if c < (0.94 if aim == 0 else 0.8): continue
		best = z; bd = dist
	if best != null: hit_zombie(best, GUN_DMG)
	return true

func hit_zombie(z: Variant, dmg: float) -> void:
	z.hit(dmg)
	# the scripts' DieCk turns this into the enemy's ed flag (the enemy stays dead)
	if not z.alive: vm.work(1, z.index).dead = true

func _start_grab(z: Zombie) -> void:
	var p := player.position; var zp := z.position
	var to_z := Vector3(zp.x - p.x, 0, zp.z - p.z)
	var front := player.forward().dot(to_z) >= 0
	# line Claire up with the zombie like the synchronised original motions
	z.heading = atan2(-(p.x - zp.x), -(p.z - zp.z)); z.rotation.y = z.heading
	var np := zp + z.forward() * 0.42; np.y = p.y
	player.place(np.x, np.y, np.z, z.heading + PI if front else z.heading)
	player.play_sync("z00" if front else "z01")
	grab = {"z": z, "t": 0.0, "front": front, "phase": "bite", "hurt": false, "hurt2": false}

func _start_dog_bite(z: Dog) -> void:
	var p := player.position; var zp := z.position
	var front := player.forward().dot(Vector3(zp.x - p.x, 0, zp.z - p.z)) >= 0
	player.heading = atan2(-(zp.x - p.x), -(zp.z - p.z)) if front else atan2(-(p.x - zp.x), -(p.z - zp.z))
	player.rotation.y = player.heading
	player.hp -= 12; audio.se("bite")   # en04 bite damage 12
	var dead := player.hp <= 0
	player.play_sync(("d03" if front else "d04") if dead else ("d00" if front else "d05"))
	z.set_state("idle" if dead else "recoil")
	dog_bite = {"z": z, "t": 0.0, "front": front, "dead": dead}

func _update_dog_bite(dt: float) -> void:
	var b: Dictionary = dog_bite
	b.t += dt
	if not b.dead and b.t >= 1.0:
		player.play_sync(null); dog_bite = null
	elif b.dead and b.t >= 2.6:
		dog_bite = null; game_over()

func _update_grab(dt: float) -> void:
	var g: Dictionary = grab
	g.t += dt
	if g.phase == "bite":
		# en01 grab motion bites at frames 25 and 59.5: 10 + the variant's add_atk each
		var dmg: int = 10 + int(EN01_ADD_ATK.get(g.z.mdlver, 0))
		if not g.hurt and g.t * 30 >= 25:
			g.hurt = true; player.hp -= dmg; audio.se("bite")
		if not g.hurt2 and g.t * 30 >= 59.5:
			g.hurt2 = true; player.hp -= dmg; audio.se("bite")
		if g.t >= 2.0:
			g.t = 0.0
			if player.hp <= 0:
				g.phase = "dead"; player.play_sync("z10" if g.front else "z11"); g.z.set_state("eat")
			else:
				g.phase = "push"; player.play_sync("z02" if g.front else "z03"); g.z.set_state("release")
	elif g.phase == "push":
		if g.t >= 1.6:
			player.play_sync(null); grab = null
	elif g.phase == "dead" and g.t >= 2.6:
		grab = null; game_over()

func game_over() -> void:
	if _over_shown: return
	_over_shown = true; busy = true
	await ui.fade(true, 1200)
	await msg.raw(["ВЫ ПОГИБЛИ" if Text.ru() else "YOU ARE DEAD"])
	Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
	get_tree().reload_current_scene()

## door to a room that is not converted: the ported part ends here
func escaped(id: String) -> void:
	await ui.fade(true, 600)
	if Text.ru(): await msg.raw(["Дверь ведёт в %s." % id, "Эта часть игры\nпока не перенесена."])
	else: await msg.raw(["The door leads to %s." % id, "This area is\nnot ported yet."])
	await ui.fade(false, 600)

## Test hook: advance the simulation synchronously with the given keys held.
func sim(sec: float, codes: Array = []) -> void:
	for c in codes: input.down[c] = true; input.pressed[c] = true
	var t := 0.0
	while t < sec:
		step(1.0 / 30.0); input.pressed.clear(); t += 1.0 / 30.0
	for c in codes: input.down.erase(c)
	_render_prep()

func _unhandled_input(ev: InputEvent) -> void:
	input.handle(ev)
	if ev is InputEventMouseButton and ev.pressed and cam.mode == "behind" and not inv_open and not msg.active:
		Input.mouse_mode = Input.MOUSE_MODE_CAPTURED

func _process(dt: float) -> void:
	if not running: return
	step(minf(dt, 0.1))
	_render_prep()
	input.end_frame()

## effects; bhCamYureSet offsets the camera position (cam.ofx..ofz) for this frame
func _render_prep() -> void:
	var c := cam.cam
	c.position -= _shake
	_shake = Vector3(fx.of[0], fx.of[1], fx.of[2]) * 0.1
	c.position += _shake
	fx.draw(c); fx.draw_2d()

func step(dt: float) -> void:
	var inp := input
	play_time += dt
	if inp.hit(["F1", "Backquote"]): debug = not debug
	var cine := in_cine
	if msg.active:
		msg.update(dt, inp.action, inp.hit(["KeyA", "ArrowLeft"]), inp.hit(["KeyD", "ArrowRight"]), inp.cancel)
		player.frozen = true
	elif inv_open:
		player.frozen = true
		if not inv_screen.update(dt): toggle_inv(false)
	elif busy or _dialog: player.frozen = true
	elif cine:
		player.frozen = true
		# event skip (START in the original): the scripts check cb bit 0x10000000
		if vm.cb & 4 and inp.hit(["Escape", "Enter", "Space"]): vm.cb |= 0x10000000
	else:
		player.frozen = false
		if player.sync != null: pass   # grabbed
		elif inp.inventory: toggle_inv(true)
		elif inp.cam_toggle: toggle_camera()
		elif inp.action and not player.aiming: _examine()
	if room:
		# event scripts at the original 30 Hz (paused while the inventory is open or a room loads)
		if not inv_open and not busy:
			_evt_acc = minf(_evt_acc + dt, 0.25)
			while _evt_acc >= 1.0 / 30.0 and not busy:
				_evt_acc -= 1.0 / 30.0; _evt_frame()
			cam.ev_sub = _evt_acc * 30
		if _pending_door != null and not busy:
			var d: Dictionary = _pending_door; _pending_door = null; _go_door(d)
		var sh := cam.mode == "behind"
		if sh and not player.frozen:
			# mouse (captured) or ←/→ turn the over-the-shoulder camera; the fixed cameras cannot be moved
			var sens := 0.0024 * (0.6 if player.aiming else 1.0)
			cam.look(inp.mdx * sens + ((1 if inp.cam_r else 0) - (1 if inp.cam_l else 0)) * 2.2 * dt, inp.mdy * sens)
		cam.zoom += ((1.0 if sh and player.aiming else 0.0) - cam.zoom) * minf(1, dt * 10)
		player.update(dt, inp, room, cam.yaw if sh else null)
		if not msg.active and not inv_open and not in_cine and not (busy and grab == null):
			if grab != null: _update_grab(dt)
			if dog_bite != null: _update_dog_bite(dt)
			var free := grab == null and dog_bite == null and player.sync == null and player.hp > 0
			for z in zombies:
				var zw: EvtVM.Work = vm.get_work(1, z.index)
				if zw != null and (zw.gone or zw.hidden): continue
				if zw != null and zw.scripted: z.update(dt); continue
				if z.state == "bite" and (grab == null or grab.z != z): z.set_state("walk")
				if z.tick(dt, player.position, free, room) and grab == null and free: _start_grab(z)
			for z in dogs:
				var zw: EvtVM.Work = vm.get_work(1, z.index)
				if zw != null and (zw.gone or zw.hidden): continue
				if zw != null and zw.scripted: z.update(dt); continue
				if z.tick(dt, player.position, free and grab == null and dog_bite == null, room) and grab == null and dog_bite == null and free: _start_dog_bite(z)
		cam.cam.position -= _shake; _shake = Vector3.ZERO
		cam.update(player.position, player.head_pos(), player.heading, false, dt)
		_update_links()
	ui.hud.visible = debug
	if debug and room:
		var p := player.position
		var tasks := []
		for i in vm.tasks.size():
			if vm.tasks[i].status: tasks.append("%d:e%d" % [i, vm.tasks[i].scr - 2])
		var cs := "behind" if cam.mode == "behind" else str(cam.index) + (" (event %d)" % cam.forced if cam.forced >= 0 else (" (fallback)" if cam.using_fallback else ""))
		ui.hud.text = "%s cam %s\npos %.2f %.2f %.2f h %d°\nevt cb %x st %x etc %d flr %s tasks %s" % [room_id, cs, p.x, p.y, p.z, int(rad_to_deg(player.heading)), vm.cb & EvtVM.M32, vm.st & EvtVM.M32, vm.etc_idx, str(vm.flr_idx) if vm.cb & 0x200 else "-", " ".join(tasks)]
