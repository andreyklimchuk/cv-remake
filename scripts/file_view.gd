class_name FileView
extends Control
## FILE screen (port of fileview.c / itemview.c DrawSubItem + MakeTag, the parts_22 sprites of sub1.c).
## 24 documents in 3 binders x 8 tags; owned bits = sys->itm[383] (bit 0, the playing manual, always set by MakeTag).
## Page text = system message 280 + fsheader[file] + page, pages 0..fstbl[file]; the picture / arrows / EXIT come from the
## file's wallpaper texture (item1/bgNN = wallpaper[file] - 146). Logic at 30 Hz like ControlFileView.
## The binder / tag selection is drawn by the status screen into its model window (select_root); the page reader and the
## "You've filed the X." message of a picked-up document are this full-screen 640x480 overlay.

const ANG := TAU / 65536.0
var D: Dictionary
var audio: GameAudio
var input: GameInput
var owned := 1
var ev_flag: Callable = func(_n: int) -> bool: return false
var active := false          # the overlay (reader / filed message) runs
var phase := ""              # "select" | "tag" (status screen) | "read" | "filed" (overlay)
var from_get := false        # cb_flg 0x20000: a document picked up in the room
var _acc := 0.0
var _font: Font
# FV_WORK: selection
var filecsr := 0
var tag := 0
var filenum := 0
var z := 0
var j := 0
var roll := 0
var ang00 := 0
var koma := []
var koma2 := []
var child_ang := [32768, 32768, 32768]   # ang[1] of the binders (FileSyu)
var title_dirty := true
# reader
var page := 0
var pos0 := 68.0             # parts_22b[0].pos[0]
var pos4 := 560.0            # parts_22b[4].pos[0] (EXIT)
var scrol := 0
var move := 10.0
var wait800 := false         # afsmode 0x800
var pagewait00 := 0
var pagewait01 := 0
var exit_vis := false        # parts_22b[4].atr 0x20
var exit_dim := true         # parts_22b[4].color 0x8 (not selected, colour 0.4)
var arrow_l := false
var arrow_r := false
var ax2 := 16.0
var ax3 := 592.0
var _cnt := 0
var _flg := 0
var bufpage := -1            # page shown (bufnum), -1 = none yet
var _tex: Texture2D
var _done := false
# binders (built into the status screen's model viewport)
var select_root: Node3D
var _binders: Array = []     # [node, tags ImmediateMesh]
var _tag_mat: StandardMaterial3D

## FileNumberSwitch: rom_no + stg_no * 100 and the item id -> file number (85, TG-01, is always file 2)
const FILE_NO := {7: {48: 8}, 11: {47: 9}, 108: {47: 10}, 207: {135: 12, 102: 18}, 204: {134: 13}, 106: {133: 14}, 601: {48: 15}, 901: {48: 15},
	604: {48: 16, 132: 17}, 607: {132: 17}, 907: {132: 17}, 702: {102: 19}, 922: {49: 20}, 904: {102: 21, 48: 16}, 919: {133: 22}, 918: {133: 23},
	4: {132: 1}, 9: {49: 3}, 313: {132: 4}, 718: {132: 4}, 104: {58: 5}, 929: {125: 6}, 712: {132: 7}}
static func number(stg: int, rom: int, id: int) -> int:
	var k := rom + stg * 100
	var f := 11 if k == 551 else int((FILE_NO.get(k, {}) as Dictionary).get(id, 0))
	return 2 if id == 85 else f

func _ready() -> void:
	D = Assets.data_json("files.json")
	size = Vector2(1024, 768); visible = false; mouse_filter = Control.MOUSE_FILTER_IGNORE
	_font = UIRoot._sys_font(["Courier New", "Liberation Mono", "DejaVu Sans Mono"]); (_font as SystemFont).font_weight = 700

func has(f: int) -> bool: return (owned & (1 << f)) != 0
func title(f: int) -> String:
	var en := String(Text.ITEM_NAMES.get(159 + f, "")).replace("{0d}", "-")
	return Text.item_name(en)
## PlayPageCheck: the manual (file 0) unlocks its later hint pages with the story flags
func last_page(f: int) -> int:
	var e := 0
	if f == 0:
		e = 0 if ev_flag.call(0x199) else (1 if ev_flag.call(0x2b) else (2 if ev_flag.call(0x129) else (4 if ev_flag.call(0xe0) else (6 if ev_flag.call(0x96) else 7))))
	return (int(D.FSTBL[f]) & 0xf) - e
func page_text(f: int, p: int) -> String:
	if Text.ru():
		var r: Variant = (D.RU as Dictionary).get(str(f))
		if r != null and p < (r as Array).size(): return r[p]
	var i := int(D.FSHEADER[f]) + p
	return D.EN[i] if i < (D.EN as Array).size() else ""

# ---------------------------------------------------------------- selection (FileSelect: SelectFile / SelectTag)
## SearchTag: first owned tag of the binder from the current one on
func search_tag(dir: int) -> bool:
	var b := tag
	while true:
		if has(tag + filecsr * 8): return true
		tag = (tag + dir) & 7
		if tag == b: return false
	return false

## the FILE command: the binders appear in the status screen's model window
func begin_select(root: Node3D) -> void:
	select_root = root; phase = "select"
	filecsr = 0; tag = 0; z = 0; j = 0; roll = 0; ang00 = 0; koma = []; koma2 = []
	child_ang = [32768, 32768, 32768]
	search_tag(1)
	_build_binders()
	_place_binders()

func end_select() -> void:
	phase = ""; _binders = []; select_root = null

func _build_binders() -> void:
	_binders = []
	var o := Assets.scene("inv/it_139.glb")
	if o == null or select_root == null: return
	Assets.to_lambert(o, "inv")
	var grp := Node3D.new(); grp.scale = Vector3.ONE * 0.58   # njScale 0.58 for rdid 139
	select_root.add_child(grp)
	_tag_mat = StandardMaterial3D.new(); _tag_mat.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	_tag_mat.vertex_color_use_as_albedo = true; _tag_mat.cull_mode = BaseMaterial3D.CULL_DISABLED
	for nm in ["n001", "n002", "n003"]:
		var src := o.find_child(nm, true, false) as Node3D
		var holder := Node3D.new(); grp.add_child(holder)
		var base := Vector3.ZERO
		if src:
			base = src.position
			for c in [src] + src.get_children():
				if c is MeshInstance3D:
					var mi := (c as MeshInstance3D).duplicate() as MeshInstance3D
					for k in mi.get_children(): mi.remove_child(k); k.queue_free()
					mi.transform = Transform3D(); holder.add_child(mi)
		var im := ImmediateMesh.new()
		var tmi := MeshInstance3D.new(); tmi.mesh = im; tmi.material_override = _tag_mat; holder.add_child(tmi)
		_binders.append({"node": holder, "pos": base, "tags": im})
	o.queue_free()

## DrawSubItem (rdid 139): every binder is drawn unrotated at njCalcPoint(Rx ang0 * Ry ang1 * Rz ang2, pos) — FileSyu
## sets ang0 = 0x8000 — the selected one also turns by ang00; while afsmode 0x20 only the selected binder is drawn.
## The view rotation (dsptbl[139] ax 180) and the Ninja view axes (y down, z forward) cancel: model axes = Godot axes.
## child 0 = binder 0 (files 0..7), child 1 = binder 2, child 2 = binder 1 (MakeTag flg 0 / 2 / 1).
const BINDER_OF := [0, 2, 1]
func _place_binders() -> void:
	for k in _binders.size():
		var b: Dictionary = _binders[k]
		var a := float(child_ang[k]) * ANG
		var p: Vector3 = b.pos
		var q := Vector3(p.x * cos(a) + p.z * sin(a), p.y, -p.x * sin(a) + p.z * cos(a))
		q = Vector3(q.x, -q.y, -q.z)
		var n: Node3D = b.node
		var sel: bool = BINDER_OF[k] == filecsr
		n.position = q
		n.basis = Basis(Vector3.UP, float(ang00) * ANG) if sel else Basis()
		n.visible = sel or not ((phase == "tag" and z <= 1) or (phase == "select" and z == 3))
		_make_tags(b.tags, BINDER_OF[k])

## MakeTag: one 1.2 x 0.2 quad per owned file of the binder, 0.35 apart (z -0.02 each); 192 = the current tag, else 128
func _make_tags(im: ImmediateMesh, flg: int) -> void:
	im.clear_surfaces()
	var ypos := 1.2; var zpos := 0.04
	var quads := []
	for i in 8:
		if has(i + flg * 8):
			var c := 192 if (tag + filecsr * 8) == i + flg * 8 else 128
			quads.append([ypos, zpos, Color8(c, c, c)])
		ypos -= 0.35; zpos -= 0.02
	if quads.is_empty(): return
	im.surface_begin(Mesh.PRIMITIVE_TRIANGLES)
	for q in quads:
		var y: float = q[0]; var zz: float = q[1]
		var v := [Vector3(0, y, zz), Vector3(0, y + 0.2, zz), Vector3(1.2, y + 0.2, zz), Vector3(1.2, y, zz)]
		for k in [0, 1, 2, 0, 2, 3]:
			im.surface_set_color(q[2]); im.surface_add_vertex(v[k])
	im.surface_end()

## one 30 Hz frame of the binder / tag selection. Returns "" (stay), "menu" (cancel to the top menu) or "read".
func select_frame(L: bool, R: bool, U: bool, Dn: bool, act: bool, can: bool) -> String:
	var res := ""
	if phase == "select": res = _select_file(L, R, act, can)
	elif phase == "tag": res = _select_tag(U, Dn, act, can)
	_place_binders()
	return res

func _select_file(L: bool, R: bool, act: bool, can: bool) -> String:
	if z == 0:
		if not act and not can:
			if roll == 0 and j == 0:
				if L:
					tag = 0; filecsr = (filecsr + 1) % 3; roll = 1; koma = []; koma.resize(8); koma.fill(2730); z = 1; audio.sys(6)
				elif R:
					tag = 0; filecsr = (filecsr + 2) % 3; roll = 1; koma = []; koma.resize(8); koma.fill(-2730); z = 1; audio.sys(6)
		elif roll == 0:
			if act:
				if search_tag(1):
					z = 2; audio.sys(3); koma2 = [1820, 1820, 1820, 1820, 1820, 1820]
			elif can:
				audio.sys(0); return "menu"
	match z:
		1:
			if j < koma.size() and koma[j] != 0:
				for k in 3: child_ang[k] = (int(child_ang[k]) + int(koma[j])) & 0xffff
				j += 1
			else:
				for k in 3: child_ang[k] = (filecsr * 21845 - 32768) & 0xffff
				roll = 0; z = 0; j = 0; koma = []
		2:
			if j < koma2.size():
				_spread(int(koma2[j])); j += 1
			else:
				j = 0; koma2 = [1820, 1820, 1820, 1820, 1820, 1820]; z = 3
		3:
			if j < koma2.size():
				ang00 = (ang00 - int(koma2[j])) & 0xffff; j += 1
			else:
				j = 0; koma2 = []; z = 0; phase = "tag"; title_dirty = true
				var b := tag
				while not has(tag + filecsr * 8):
					tag = (tag + 1) & 7
					if tag == b: break
	return ""

## the two other binders swing aside (z 2) / back (SelectTag z 2)
func _spread(v: int) -> void:
	match filecsr:
		0: child_ang[1] = (int(child_ang[1]) + v) & 0xffff; child_ang[2] = (int(child_ang[2]) - v) & 0xffff
		1: child_ang[0] = (int(child_ang[0]) + v) & 0xffff; child_ang[1] = (int(child_ang[1]) - v) & 0xffff
		2: child_ang[0] = (int(child_ang[0]) - v) & 0xffff; child_ang[2] = (int(child_ang[2]) + v) & 0xffff

func _select_tag(U: bool, Dn: bool, act: bool, can: bool) -> String:
	if z == 0:
		if not act and not can:
			if U or Dn:
				var b := tag
				while true:
					tag = (tag + (7 if U else 1)) & 7
					if tag == b: break
					if has(tag + filecsr * 8):
						audio.sys(3); title_dirty = true; break
			filenum = tag + filecsr * 8
		elif act:
			if has(tag + filecsr * 8):
				audio.sys(3); filenum = tag + filecsr * 8; return "read"
		elif can:
			audio.sys(0); koma2 = [1820, 1820, 1820, 1820, 1820, 1820]; z = 1; title_dirty = true
	elif z == 1:
		if j < koma2.size():
			ang00 = (ang00 + int(koma2[j])) & 0xffff; j += 1
		else:
			j = 0; koma2 = [1820, 1820, 1820, 1820, 1820, 1820]; z = 2
	elif z == 2:
		if j < koma2.size():
			_spread(-int(koma2[j])); j += 1
		else:
			j = 0; koma2 = []; z = 0; phase = "select"
	return ""

## the name shown under the binders while a tag is chosen (bhDispItemName 42,342: item name 159 + file)
func select_title() -> String:
	if phase == "tag" and z == 0 and has(tag + filecsr * 8): return title(tag + filecsr * 8)
	return ""

# ---------------------------------------------------------------- reader (FileViewInit / FileScrollSet / PageScroll / FileEtcDisplay)
## open the reader for file f; returns when it is closed (picked-up documents: after "You've filed the X.")
func read(f: int, get_: bool) -> void:
	from_get = get_; filenum = f
	if get_: owned |= 1 << f   # GetFile
	_tex = Assets.texture("files/bg%02d.png" % (int(D.WALLPAPER[f]) - 146))
	page = 0; bufpage = -1; scrol = 0; move = 10; wait800 = false; pagewait00 = 0; pagewait01 = 0
	exit_vis = false; exit_dim = true; _cnt = 0; _flg = 0; ax2 = 16; ax3 = 592
	# ReadFstx mode 4: the first page slides in from the right
	pos0 = 708; pos4 = 1200; scrol = 3; move = 10; audio.sys(4)
	phase = "read"; active = true; visible = true; _acc = 0; _done = false
	while not _done:
		await get_tree().process_frame
	active = false; visible = false
	if select_root != null: phase = "tag"
	else: phase = ""

func update(dt: float) -> void:
	if not active: return
	_acc += dt
	var n := 0
	while _acc >= 1.0 / 30.0 and n < 4:
		_acc -= 1.0 / 30.0; n += 1
		_read_frame(n == 1)
	if _acc > 1.0 / 30.0: _acc = 0
	queue_redraw()

func _read_frame(first: bool) -> void:
	var act := first and input.action; var can := first and (input.cancel or input.inventory)
	var L := input.has(["KeyA", "ArrowLeft"]); var R := input.has(["KeyD", "ArrowRight"])
	if phase == "filed":
		# FileGetWait: message 152 with sb_id = file + 159, closed with the action / cancel button
		if act or can:
			audio.sys(3); _done = true
		return
	_scroll_set(act, can, L, R)
	if phase != "read": return
	_page_scroll()
	_etc_display()

func _close(se: int) -> void:
	audio.sys(se)
	if from_get: phase = "filed"
	else: _done = true

func _scroll_set(act: bool, can: bool, L: bool, R: bool) -> void:
	if scrol == 3 or scrol == 4: bufpage = page
	if wait800 or scrol != 0: return
	if pagewait01 != 0:
		pagewait01 -= 1; return
	var last := last_page(filenum)
	if not act and not can:
		if R:
			if page != last:
				scrol = 1; move = 10; page += 1; audio.sys(4); return
			exit_dim = false   # EXIT lit (colour 1.0)
		elif L and page != 0:
			if exit_dim:
				exit_vis = false; scrol = 2; move = 10; page -= 1; audio.sys(4); return
			pagewait01 = 2; exit_dim = true
	else:
		if act and not exit_dim:
			_close(3); return
		if can:
			_close(3 if from_get else 0)

func _page_scroll() -> void:
	var last := last_page(filenum)
	if not wait800:
		if scrol == 1 or scrol == 3:
			pos0 -= move; pos4 -= move; move += move
			if move > 640 and scrol == 1:
				pos0 = 708; pos4 = 1200
				if page == last:
					exit_vis = true; exit_dim = true
				wait800 = true; pagewait00 = 8; scrol = 3; move = 10
			elif pos0 < 0 and scrol == 3:
				pagewait01 = 2
				pos0 = 68; pos4 = 560; scrol = 0; move = 10
		elif scrol == 2 or scrol == 4:
			pos0 += move; pos4 += move; move += move
			if move > 640 and scrol == 2:
				pos0 = -572; pos4 = -80; wait800 = true; pagewait00 = 8; move = 10; scrol = 4
			elif pos0 > 0 and scrol == 4:
				pos0 = 68; pos4 = 560; scrol = 0; move = 10
	elif pagewait00 == 0:
		wait800 = false; pagewait01 = 2
	else:
		pagewait00 -= 1

func _etc_display() -> void:
	var last := last_page(filenum)
	if page != 0 and scrol == 0:
		if page == last:
			arrow_l = exit_dim; arrow_r = false
		else:
			arrow_l = true; arrow_r = true
	elif scrol == 0 and page == 0:
		arrow_l = false; arrow_r = page != last
	else:
		arrow_l = false; arrow_r = false
	_cnt += 1
	if _cnt > 4:
		_cnt = 0; _flg = (_flg + 1) & 1
	if _cnt == 3:
		if _flg != 0: ax2 -= 2; ax3 += 2
		else: ax2 += 2; ax3 -= 2

# ---------------------------------------------------------------- drawing (640x480 -> the 4:3 stage)
func _draw() -> void:
	var k := minf(size.x / 640.0, size.y / 480.0)
	var o := (size - Vector2(640, 480) * k) / 2
	draw_rect(Rect2(Vector2.ZERO, size), Color.BLACK)
	draw_set_transform(o, 0, Vector2(k, k))
	if phase == "filed":
		var pg := Text.pages(String(Text.SYSMES.get(152, "")), 159 + filenum)
		_text(pg[0] if not pg.is_empty() else "", 80, 360)
		draw_set_transform(Vector2.ZERO); return
	if _tex == null:
		draw_set_transform(Vector2.ZERO); return
	var tw := float(_tex.get_width()) / 256.0
	# parts_22b[1]: the picture (uv 0..160) at 162,80, 320x240, colour 0.5
	draw_texture_rect_region(_tex, Rect2(162, 80, 320, 240), Rect2(0, 0, 160 * tw, 160 * tw), Color(0.5, 0.5, 0.5, 1))
	if bufpage >= 0: _text(page_text(filenum, bufpage), pos0, 64)
	# parts_22b[2] / [3]: arrows (colour 0, 1, 0), [4]: EXIT (1.0 lit / 0.4)
	if arrow_l: draw_texture_rect_region(_tex, Rect2(ax2, 224, 32, 32), Rect2(192 * tw, 240 * tw, 16 * tw, 16 * tw), Color(0, 1, 0, 1))
	if arrow_r: draw_texture_rect_region(_tex, Rect2(ax3, 224, 32, 32), Rect2(208 * tw, 240 * tw, 16 * tw, 16 * tw), Color(0, 1, 0, 1))
	if exit_vis:
		var c := 0.4 if exit_dim else 1.0
		draw_texture_rect_region(_tex, Rect2(pos4, 224, 64, 32), Rect2(224 * tw, 240 * tw, 32 * tw, 16 * tw), Color(c, c, c, 1))
	draw_set_transform(Vector2.ZERO)

func _text(s: String, x: float, y: float) -> void:
	var i := 0
	for l in s.split("\n"):
		var p := Vector2(x, y + 22 + i * 30)
		draw_string(_font, p + Vector2(1.5, 1.5), l, HORIZONTAL_ALIGNMENT_LEFT, -1, 23, Color.BLACK)
		draw_string(_font, p, l, HORIZONTAL_ALIGNMENT_LEFT, -1, 23, Color("#f0f0f0"))
		i += 1
