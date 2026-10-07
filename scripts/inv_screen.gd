class_name InventoryScreen
extends Control
## Status / item screen after the original CODE: Veronica X layout (port of invscreen.ts): top menu, equipment and
## standard boxes, status panel (portrait / info / emblem / ECG), item list, message box. Authored in a 930x650
## design space scaled to the 4:3 stage; item icons and the check window are rendered in SubViewports.

signal ask_done(v: int, gen: int)

## Original item descriptions (sysmes.msb table 1) and Russian translations
const DESC := {
	8: {"en": "This weapon is a\nveteran survivor's\nfirst choice.", "ru": "Это оружие —\nпервый выбор\nбывалого выживальщика."},
	9: {"en": "M93R\fAn Italian handgun\nwhich uses\n9mm × 19 rounds.", "ru": "M93R\fИтальянский пистолет\nпод патрон\n9 × 19 мм."},
	59: {"en": "An emblem carved\nwith a\nhawk symbol.\fIt appears to be\nmade of pure gold.", "ru": "Эмблема\nс изображением\nястреба.\fПохоже, она из\nчистого золота."},
	83: {"en": "A case made of\nmetal.\fThe case seems to\nbe closed.\fMaybe if you\nexamine it\nclosely...", "ru": "Металлический\nкейс.\fКейс, похоже,\nзакрыт.\fМожет, если\nосмотреть его\nповнимательнее..."},
	86: {"en": "A picture of a\nhawk is carved on\nit.\fIt's made of\nnewly-developed\nalloy TG-01.", "ru": "На ней вырезано\nизображение\nястреба.\fСделана из\nновейшего\nсплава TG-01."},
	12: {"en": "9mm × 19 Rounds\fThese can be used\nwith the M93R\nand Glock 17.", "ru": "Патроны 9 × 19 мм\fПодходят для\nM93R и Glock 17."},
	21: {"en": "This was made by\nbreeding the herb\nfrom Raccoon city.", "ru": "Выведена из травы,\nпривезённой из\nРаккун-Сити."},
	31: {"en": "Use this with a\ntypewriter to save\nyour progress.", "ru": "Используйте её\nс пишущей машинкой,\nчтобы сохраниться."},
	50: {"en": "Lockpick.\fA simple lock can\nbe opened with\nthis.", "ru": "Отмычка.\fЕю можно открыть\nпростой замок."},
	55: {"en": "An oil lighter.\nYou can use it to\nlight a dark area.", "ru": "Бензиновая зажигалка.\nЕю можно осветить\nтёмное место."},
	95: {"en": "Medicine that is\nused to stop\nbleeding.\fIt should be used\non someone who\nis wounded.", "ru": "Лекарство,\nостанавливающее\nкровотечение.\fЕго нужно применить\nк раненому."},
	104: {"en": "Medicine that is\nused to stop\nbleeding.\fIt should be used\non someone who\nis wounded.", "ru": "Лекарство,\nостанавливающее\nкровотечение.\fЕго нужно применить\nк раненому."},
	133: {"en": "A board clip holding\nsome papers.", "ru": "Планшет-зажим\nс бумагами."},
}
const WEAPONS := [8, 9]
## icon orientation overrides for models lying in another pose
const ICON_ROT := {9: [-1.15, 0, 0.25]}
const STANDARD := [55]
const W := 930.0
const H := 650.0
## curedata (item 20..29): low nibble = recovery level (Use_00), 0x10 = cures poison
const CUREDATA := [4, 1, 0, 16, 2, 4, 17, 18, 3, 20]
const HP_MAX := 160
## combidata: item -> [partner, result, type] (0/1 ammo into weapon, 2 ammo merge, 6 herbs)
const COMBI := {
	9: [[19, 10, 0], [12, 9, 0]], 12: [[5, 5, 1], [9, 9, 1], [10, 10, 1], [12, 12, 2], [131, 131, 1]],
	21: [[21, 24, 6], [22, 25, 6], [23, 26, 6], [24, 28, 6], [26, 27, 6]], 22: [[21, 25, 6], [26, 29, 6]],
	23: [[21, 26, 6], [24, 27, 6], [25, 29, 6]], 24: [[21, 28, 6], [23, 27, 6]], 25: [[23, 29, 6]], 26: [[21, 27, 6], [22, 29, 6]],
}
const AMMO := [12]
const BULLET_MAX := {9: 15, 10: 15, 12: 15}
## panel groups slide in from these offsets (640x480 units): 1 top menu, 2 status, 3 equipment, 5 item list, 6 message
const CEN_OFF := {1: [0, -120], 2: [-448, 0], 3: [288, 0], 5: [208, 0], 6: [0, 152]}

static func ru() -> bool: return Text.LANG == "ru"
static func T(k: String, a := "") -> Variant:
	var r := ru()
	match k:
		"menu": return ["ВЫХОД", "ФАЙЛЫ", "КАРТА", "ВЕЩИ"] if r else ["EXIT", "FILE", "MAP", "ITEM"]
		"equip": return "ЭКИПИРОВКА" if r else "EQUIP"
		"standard": return "СТАНДАРТ" if r else "STANDARD"
		"status": return "СТАТУС" if r else "STATUS"
		"info": return "ИНФО" if r else "INFO"
		"name": return "КЛЭР" if r else "CLAIRE"
		"full": return "КЛЭР РЕДФИЛД" if r else "CLAIRE REDFIELD"
		"height": return "РОСТ" if r else "HEIGHT"
		"weight": return "ВЕС" if r else "WEIGHT"
		"blood": return "ГР.КРОВИ" if r else "BLOOD TYPE"
		"cm": return "см" if r else "cm"
		"kg": return "кг" if r else "kg"
		"btype": return "0" if r else "O"
		"cond": return "СОСТОЯНИЕ" if r else "CONDITION"
		"fine": return "Норма" if r else "Fine"
		"caution": return "Внимание" if r else "Caution"
		"danger": return "Опасно" if r else "Danger"
		"list": return "СПИСОК" if r else "LIST"
		"use": return "Использовать" if r else "Use"
		"equipA": return "Экипировать" if r else "Equip"
		"unequip": return "Снять" if r else "Unequip"
		"hold": return "Взять в руку" if r else "Hold"
		"putAway": return "Убрать" if r else "Put away"
		"check": return "Осмотреть" if r else "Check"
		"combine": return "Комбинировать" if r else "Combine"
		"noData": return "Нет данных." if r else "No data."
		"equipped": return ("%s: экипировано." % a) if r else ("Equipped the %s." % a)
		"lit": return "Клэр зажгла зажигалку." if r else "Claire lit the lighter."
		"unlit": return "Клэр убрала зажигалку." if r else "Claire put the lighter away."
		"box": return "ЯЩИК" if r else "BOX"
		"boxHint": return "Enter — переложить · Esc — закрыть" if r else "Enter — move item · Esc — close"
		"rot": return "Стрелки — вращать · Enter — далее · Esc — назад" if r else "Arrows — rotate · Enter — next · Esc — back"
	return ""

static func item_desc(id: int) -> PackedStringArray:
	var d: Variant = DESC.get(id)
	return String(d.ru if ru() else d.en).split("\f") if d != null else PackedStringArray([""])

var is_open := false
var equipped: Variant = null   # weapon box (item id or null)
var standard: Variant = null   # standard box (lighter)
var on_equip_change: Callable
var on_use_item: Callable
var inv: Inventory
var input: GameInput
var audio: GameAudio
var player: Player
var _anim: Variant = null
var _ask: Variant = null
var _ask_gen := 0
var _cmb_a := -1
var _get_id := -1
var _acc := 0.0
var _mode := "list"
var _sel := 0
var _menu_sel := 3
var _sub_sel := 0
var _sub_opts: Array = []
var _text := ""
var _pages: Array = []
var _page := 0
var _icons := {}
var _ecg_t := 0.0
var _chk: Variant = null
var _icon_busy := false
## security / item box mode (cb 0x40000): the box contents (shared Array of {id,name,count}), cursor side and slot
var box: Array = []
var _bside := "box"
var _bsel := 0
var _bscroll := 0
const BOX_COLS := 5
const BOX_ROWS := 4
var box_panel: Deco
var box_slots: Array = []
# nodes
var scr: Control
var groups := {}
var bgc: Control
var menu_btns: Array = []
var eq_slot: Control
var st_slot: Control
var list_slots: Array = []
var msgtx: RichTextLabel
var sub: Deco
var sub_box: VBoxContainer
var chk_box: Deco
var chk_tex: TextureRect
var chk_hint: Label
var chk_vp: SubViewport
var icon_vp: SubViewport
var stc: Array = []
var fine_l: Label
var lbl := {}
var ecg: Control
var f_black: Font
var f_bold: Font
var f_mono: Font
var _noise: ImageTexture

func setup(inv_: Inventory, input_: GameInput, audio_: GameAudio, player_: Player) -> void:
	inv = inv_; input = input_; audio = audio_; player = player_

func _ready() -> void:
	size = Vector2(1024, 768)
	visible = false
	mouse_filter = Control.MOUSE_FILTER_IGNORE
	f_black = UIRoot._sys_font(["Arial Black", "Arial", "Liberation Sans", "DejaVu Sans"]); (f_black as SystemFont).font_weight = 900
	f_bold = UIRoot._sys_font(["Arial", "Liberation Sans", "DejaVu Sans"]); (f_bold as SystemFont).font_weight = 700
	f_mono = UIRoot._sys_font(["Courier New", "Liberation Mono", "DejaVu Sans Mono"]); (f_mono as SystemFont).font_weight = 700
	scr = Control.new(); scr.size = Vector2(W, H); scr.mouse_filter = Control.MOUSE_FILTER_IGNORE
	add_child(scr)
	var k := minf(1024.0 / W, 768.0 / H)
	scr.scale = Vector2(k, k); scr.position = Vector2((1024 - W * k) / 2, (768 - H * k) / 2)
	_make_noise()
	bgc = Control.new(); bgc.size = Vector2(W, H); bgc.draw.connect(_draw_background); bgc.mouse_filter = Control.MOUSE_FILTER_IGNORE
	scr.add_child(bgc)
	for g in [1, 3, 2, 5, 6]:
		var c := Control.new(); c.size = Vector2(W, H); c.mouse_filter = Control.MOUSE_FILTER_IGNORE
		scr.add_child(c); groups[g] = c
	# top menu
	var g1: Control = groups[1]
	_deco(g1, "olive", 40, 55, 428, 72)
	var tail := _deco(g1, "olive", 300, 118, 168, 28); tail.no_top = true
	for i in 4:
		var b := _deco(g1, "btn", 40 + [18, 116, 216, 314][i], 55 + 18, 90, 38)
		b.font = f_black; b.font_size = 17
		menu_btns.append(b)
	# equipment / standard
	var g3: Control = groups[3]
	_deco(g3, "olive", 484, 55, 442, 100)
	_deco(g3, "stripes", 868, 58, 56, 76)
	_deco(g3, "blue", 515, 62, 203, 68)
	_deco(g3, "blue", 765, 62, 103, 68)
	eq_slot = _slot(g3, 515 + 50, 62)
	st_slot = _slot(g3, 765, 62)
	lbl.eq = _deco(g3, "bar", 482, 133, 246, 20); lbl.st = _deco(g3, "bar", 730, 133, 196, 20)
	for b in [lbl.eq, lbl.st]:
		b.font = f_black; b.font_size = 13
	# status panel
	var g2: Control = groups[2]
	_deco(g2, "olive", 0, 135, 617, 312)
	_deco(g2, "stripes", 2, 138, 72, 305)
	_deco(g2, "black", 75, 162, 538, 278)
	lbl.status = _deco(g2, "tab", 83, 148, 139, 24); lbl.status.font = f_black; lbl.status.font_size = 17; stc.append(lbl.status)
	var pf := Panel.new(); pf.position = Vector2(105, 189); pf.size = Vector2(126, 120)
	var psb := StyleBoxFlat.new(); psb.bg_color = Color("#10104a"); psb.set_border_width_all(2); psb.border_color = Color("#0a0a40"); pf.add_theme_stylebox_override("panel", psb)
	g2.add_child(pf); stc.append(pf)
	var por := TextureRect.new(); por.texture = Assets.texture("inv/portrait.jpg"); por.expand_mode = TextureRect.EXPAND_IGNORE_SIZE; por.stretch_mode = TextureRect.STRETCH_SCALE
	por.position = Vector2(2, 2); por.size = Vector2(122, 116); pf.add_child(por)
	lbl.name = _deco(g2, "plate", 104, 314, 127, 26); lbl.name.font = f_black; lbl.name.font_size = 18; stc.append(lbl.name)
	var red := Control.new(); red.position = Vector2(108, 350); red.size = Vector2(118, 66); red.draw.connect(_draw_red.bind(red)); g2.add_child(red); stc.append(red)
	var info := _deco(g2, "teal", 245, 189, 202, 97); info.bg = Color("#08083a"); stc.append(info)
	lbl.info = _deco(info, "head", 0, 0, 202, 13); lbl.info.font = f_bold; lbl.info.font_size = 10
	for i in 4:
		var l := Label.new(); l.position = Vector2(8, 16 + i * 19); l.size = Vector2(186, 18)
		l.add_theme_font_override("font", f_bold); l.add_theme_font_size_override("font_size", 14); l.add_theme_color_override("font_color", Color("#e8e8f0"))
		info.add_child(l); lbl["i%d" % i] = l
		var r := Label.new(); r.position = Vector2(8, 16 + i * 19); r.size = Vector2(186, 18); r.horizontal_alignment = HORIZONTAL_ALIGNMENT_RIGHT
		r.add_theme_font_override("font", f_bold); r.add_theme_font_size_override("font_size", 14); r.add_theme_color_override("font_color", Color("#e8e8f0"))
		info.add_child(r); lbl["r%d" % i] = r
	var emb := Control.new(); emb.position = Vector2(465, 189); emb.size = Vector2(116, 97); emb.draw.connect(_draw_emblem.bind(emb)); g2.add_child(emb); stc.append(emb)
	var cond := _deco(g2, "teal", 245, 299, 336, 117); cond.bg = Color.BLACK; stc.append(cond)
	lbl.cond = _deco(cond, "head", 0, 0, 336, 13); lbl.cond.font = f_bold; lbl.cond.font_size = 10
	ecg = Control.new(); ecg.position = Vector2(3, 13); ecg.size = Vector2(330, 98); ecg.draw.connect(_draw_ecg); cond.add_child(ecg)
	fine_l = Label.new(); fine_l.add_theme_font_override("font", f_bold); fine_l.add_theme_font_size_override("font_size", 22)
	fine_l.position = Vector2(180, 82); fine_l.size = Vector2(146, 30); fine_l.horizontal_alignment = HORIZONTAL_ALIGNMENT_RIGHT
	cond.add_child(fine_l)
	for y in [223, 353]:
		var peg := Control.new(); peg.position = Vector2(615, y); peg.size = Vector2(44, 22); peg.draw.connect(_draw_peg.bind(peg)); g2.add_child(peg); stc.append(peg)
	# box mode: the box contents replace the status panel
	box_panel = _deco(g2, "black", 75, 176, 538, 268); box_panel.visible = false
	for i in BOX_COLS * BOX_ROWS:
		box_slots.append(_slot(box_panel, 19 + (i % BOX_COLS) * 100, 2 + (i / BOX_COLS) * 65.5))
	chk_box = _deco(g2, "check", 75, 162, 538, 278); chk_box.visible = false; chk_box.clip_contents = true
	chk_tex = TextureRect.new(); chk_tex.size = Vector2(538, 278); chk_tex.expand_mode = TextureRect.EXPAND_IGNORE_SIZE; chk_tex.stretch_mode = TextureRect.STRETCH_SCALE
	chk_box.add_child(chk_tex)
	chk_hint = Label.new(); chk_hint.position = Vector2(0, 258); chk_hint.size = Vector2(538, 16); chk_hint.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	chk_hint.add_theme_font_override("font", f_bold); chk_hint.add_theme_font_size_override("font_size", 11); chk_hint.add_theme_color_override("font_color", Color("#8a8ab8"))
	chk_box.add_child(chk_hint)
	# item list
	var g5: Control = groups[5]
	_deco(g5, "olive", 658, 162, 214, 300)
	_deco(g5, "blue", 667, 170, 200, 263)
	for i in 8:
		list_slots.append(_slot(g5, 667 + (i % 2) * 100, 170 + (i / 2) * 65.5))
	lbl.list = _deco(g5, "bar", 667, 437, 200, 20); lbl.list.font = f_black; lbl.list.font_size = 13
	_deco(g5, "stripes", 872, 155, 54, 440)
	# message box
	var g6: Control = groups[6]
	_deco(g6, "olive", 40, 450, 578, 146)
	_deco(g6, "black", 58, 459, 541, 127)
	msgtx = RichTextLabel.new(); msgtx.bbcode_enabled = true; msgtx.scroll_active = false
	msgtx.position = Vector2(58 + 14, 459 + 12); msgtx.size = Vector2(541 - 28, 127 - 22)
	msgtx.add_theme_font_override("normal_font", f_mono); msgtx.add_theme_font_size_override("normal_font_size", 24)
	msgtx.add_theme_color_override("default_color", Color("#ececec")); msgtx.add_theme_constant_override("line_separation", 2)
	msgtx.add_theme_color_override("font_shadow_color", Color("#333333")); msgtx.add_theme_constant_override("shadow_offset_x", 1); msgtx.add_theme_constant_override("shadow_offset_y", 1)
	msgtx.mouse_filter = Control.MOUSE_FILTER_IGNORE
	g6.add_child(msgtx)
	sub = _deco(scr, "olive", 478, 175, 170, 10); sub.visible = false
	sub_box = VBoxContainer.new(); sub_box.position = Vector2(0, 6); sub_box.add_theme_constant_override("separation", 0); sub.add_child(sub_box)
	# 3D: icon renderer and the check window
	icon_vp = _viewport(Vector2i(192, 128))
	icon_vp.render_target_update_mode = SubViewport.UPDATE_DISABLED
	chk_vp = _viewport(Vector2i(538, 278))
	chk_vp.render_target_update_mode = SubViewport.UPDATE_DISABLED
	chk_tex.texture = chk_vp.get_texture()

func _viewport(sz: Vector2i) -> SubViewport:
	var vp := SubViewport.new(); vp.size = sz; vp.transparent_bg = true; vp.own_world_3d = true
	vp.msaa_3d = Viewport.MSAA_4X
	var cam := Camera3D.new(); cam.name = "cam"; cam.fov = 28; cam.near = 0.1; cam.far = 50; cam.keep_aspect = Camera3D.KEEP_HEIGHT
	vp.add_child(cam)
	var holder := Node3D.new(); holder.name = "holder"; vp.add_child(holder)
	add_child(vp)
	return vp

func _deco(parent: Control, st: String, x: float, y: float, w: float, h: float) -> Deco:
	var d := Deco.new(); d.style = st; d.position = Vector2(x, y); d.size = Vector2(w, h); d.mouse_filter = Control.MOUSE_FILTER_IGNORE
	parent.add_child(d)
	return d

## item slot (100x65): icon, count, E mark, selection outline
func _slot(parent: Control, x: float, y: float) -> Control:
	var s := Control.new(); s.position = Vector2(x, y); s.size = Vector2(100, 65); s.mouse_filter = Control.MOUSE_FILTER_IGNORE
	s.set_meta("tex", null); s.set_meta("item", null); s.set_meta("sel", false); s.set_meta("cmb", false); s.set_meta("eq", false)
	s.draw.connect(_draw_slot.bind(s))
	parent.add_child(s)
	return s

func _draw_slot(s: Control) -> void:
	var it: Variant = (s.get_meta("item") if s.has_meta("item") else null)
	if it != null:
		var tex: Texture2D = (s.get_meta("tex") if s.has_meta("tex") else null)
		if tex:
			var ts := tex.get_size(); var k := minf(94.0 / ts.x, 58.0 / ts.y)
			var sz := ts * k
			s.draw_texture_rect(tex, Rect2((s.size - sz) / 2, sz), false)
		else:
			var nm := Text.item_name(it.name)
			s.draw_string(f_bold, Vector2(4, 36), nm, HORIZONTAL_ALIGNMENT_CENTER, 92, 12, Color("#d8d8d0"))
		if it.count > 1 or it.id == 12 or it.id == 9:
			s.draw_string(f_bold, Vector2(5, 62), str(it.count), HORIZONTAL_ALIGNMENT_LEFT, -1, 17, Color.BLACK)
			s.draw_string(f_bold, Vector2(4, 61), str(it.count), HORIZONTAL_ALIGNMENT_LEFT, -1, 17, Color("#dfe6ff"))
		if (s.get_meta("eq") if s.has_meta("eq") else null):
			s.draw_string(f_bold, Vector2(86, 13), "E", HORIZONTAL_ALIGNMENT_LEFT, -1, 11, Color("#ffd060"))
	if (s.get_meta("sel") if s.has_meta("sel") else null):
		s.draw_rect(Rect2(1.5, 1.5, 97, 62), Color("#c81e1e"), false, 3)
		s.draw_rect(Rect2(3, 3, 94, 59), Color(1, 0.16, 0.16, 0.18), false, 4)
	if (s.get_meta("cmb") if s.has_meta("cmb") else null):
		var c := Color("#ffb030")
		var x := 1.5
		while x < 98:
			s.draw_line(Vector2(x, 1.5), Vector2(minf(x + 6, 98.5), 1.5), c, 3); s.draw_line(Vector2(x, 63.5), Vector2(minf(x + 6, 98.5), 63.5), c, 3); x += 10
		var y := 1.5
		while y < 63:
			s.draw_line(Vector2(1.5, y), Vector2(1.5, minf(y + 6, 63.5)), c, 3); s.draw_line(Vector2(98.5, y), Vector2(98.5, minf(y + 6, 63.5)), c, 3); y += 10

# ---------- procedural art ----------
func _make_noise() -> void:
	var im := Image.create(256, 256, false, Image.FORMAT_RGB8)
	for y in 256:
		for x in 256:
			var v := (14.0 + randf() * 16.0) / 255.0
			im.set_pixel(x, y, Color(v, v, v))
	_noise = ImageTexture.create_from_image(im)

func _draw_background() -> void:
	var c := bgc
	c.draw_rect(Rect2(0, 0, W, H), Color("#121212"))
	var y := 0.0
	while y < H:
		var x := 0.0
		while x < W:
			c.draw_texture(_noise, Vector2(x, y)); x += 256
		y += 256
	var beam := func(x0: float, y0: float, x1: float, y1: float, w: float) -> void:
		c.draw_line(Vector2(x0, y0), Vector2(x1, y1), Color("#2a2a2a"), w)
		c.draw_line(Vector2(x0, y0), Vector2(x1, y1), Color("#4a4a48"), w * 0.6)
		c.draw_line(Vector2(x0, y0), Vector2(x1, y1), Color("#6c6c68"), w * 0.25)
		c.draw_line(Vector2(x0, y0 - w / 3), Vector2(x1, y1 - w / 3), Color(160 / 255.0, 160 / 255.0, 150 / 255.0, 0.25), 1)
	var S := 190.0
	var x2 := -H
	while x2 < W + H:
		beam.call(x2, 0, x2 + H, H, 16); beam.call(x2 + H, 0, x2, H, 16); x2 += S
	for yy in [8.0, H - 10]:
		Deco._grad(c, Rect2(0, yy - 10, W, 20), [[0.0, Color("#222222")], [0.5, Color("#5e5e5a")], [1.0, Color("#1c1c1c")]])
	var xx := 0.0
	while xx < W:
		c.draw_circle(Vector2(xx, 8), 2.5, Color("#7a7a72")); c.draw_circle(Vector2(xx, H - 10), 2.5, Color("#7a7a72")); xx += S / 2

static func _ellipse(c: CanvasItem, ctr: Vector2, rx: float, ry: float, col: Color) -> void:
	var pts := PackedVector2Array()
	for i in 32:
		var a := TAU * i / 32.0
		pts.append(ctr + Vector2(cos(a) * rx, sin(a) * ry))
	c.draw_colored_polygon(pts, col)

func _draw_red(c: Control) -> void:
	var w := c.size.x; var h := c.size.y
	c.draw_rect(Rect2(0, 0, w, h), Color("#3a0000"))
	for k in range(10, 0, -1):
		var t := k / 10.0
		var col := Color("#a00808").lerp(Color("#3a0000"), t) if t > 0.5 else Color("#5a0000").lerp(Color("#a00808"), t * 2)
		_ellipse(c, Vector2(w / 2, h / 2), w * 0.7 * t, w * 0.7 * t * 0.75, col)
	_ellipse(c, Vector2(w / 2, h / 2 - 4), 30, 18, Color(0, 0, 0, 0.55))
	_ellipse(c, Vector2(w / 2 - 12, h / 2 - 7), 7, 4, Color(1, 90 / 255.0, 90 / 255.0, 0.5))
	_ellipse(c, Vector2(w / 2 + 12, h / 2 - 7), 7, 4, Color(1, 90 / 255.0, 90 / 255.0, 0.5))
	for i in 3:
		c.draw_string(f_bold, Vector2(10, h - 18 + i * 6), "LET ME LIVE · MADE IN HEAVEN · ROCKFORT", HORIZONTAL_ALIGNMENT_LEFT, -1, 6, Color(1, 200 / 255.0, 200 / 255.0, 0.75))
	var lc := Color(1, 220 / 255.0, 220 / 255.0, 0.8)
	for e in [[3, 3, 1, 1], [w - 3, 3, -1, 1], [3, h - 3, 1, -1], [w - 3, h - 3, -1, -1]]:
		c.draw_polyline(PackedVector2Array([Vector2(e[0], e[1] + e[3] * 8), Vector2(e[0], e[1]), Vector2(e[0] + e[2] * 8, e[1])]), lc, 1)
	c.clip_contents = true

func _draw_emblem(c: Control) -> void:
	var w := c.size.x; var h := c.size.y
	c.draw_rect(Rect2(0, 0, w, h), Color("#0c0c66"))
	var gl := Color(90 / 255.0, 110 / 255.0, 1, 0.7)
	var x := 0.0
	while x <= w:
		c.draw_line(Vector2(x + 0.5, 0), Vector2(x + 0.5, h), gl, 1); x += 9
	var y := 0.0
	while y <= h:
		c.draw_line(Vector2(0, y + 0.5), Vector2(w, y + 0.5), gl, 1); y += 9
	for i in 9:
		var s := 34.0 - absf(i - 4) * 4
		var px := w / 2 + (i - 4) * 10; var py := h * 0.72 - absf(i - 4) * 3; var a := (i - 4) * 0.22
		var xf := Transform2D(a, Vector2(px, py))
		var pts := PackedVector2Array(); var cols := PackedColorArray()
		var shape := [Vector2(-s * 0.25, 0), Vector2(-s * 0.3, -s * 0.5), Vector2(0, -s), Vector2(s * 0.12, -s * 0.55), Vector2(s * 0.3, 0)]
		var cc := [Color("#ff4a00"), Color("#ffb000"), Color("#fff4a0"), Color("#ffb000"), Color("#ff4a00")]
		for k in shape.size():
			pts.append(xf * shape[k]); cols.append(cc[k])
		c.draw_polygon(pts, cols)
	for sg in [-1, 1]:
		c.draw_colored_polygon(PackedVector2Array([Vector2(w / 2, h * 0.45), Vector2(w / 2 + sg * 22, h * 0.24), Vector2(w / 2 + sg * 44, h * 0.3), Vector2(w / 2 + sg * 24, h * 0.38), Vector2(w / 2 + sg * 6, h * 0.55)]), Color("#e8e8f8"))
	c.draw_circle(Vector2(w / 2, h * 0.36), 6, Color("#1a1010"))
	c.draw_colored_polygon(PackedVector2Array([Vector2(w / 2 - 7, h * 0.44), Vector2(w / 2 + 7, h * 0.44), Vector2(w / 2 + 10, h * 0.78), Vector2(w / 2 - 10, h * 0.78)]), Color("#1a1010"))
	c.draw_string(f_bold, Vector2(0, h - 5), "MADE IN HEAVEN", HORIZONTAL_ALIGNMENT_CENTER, w, 8, Color("#f6f0d0"))
	c.draw_rect(Rect2(0, 0, w, h), Color("#23238a"), false, 2)

func _draw_peg(c: Control) -> void:
	Deco._grad(c, Rect2(0, 0, 33, 22), [[0.0, Color("#e8e8e0")], [0.45, Color("#8a8a80")], [1.0, Color("#3a3a34")]])
	var pts := PackedVector2Array(); var cols := PackedColorArray()
	for i in 13:
		var a := -PI / 2 + PI * i / 12.0
		var p := Vector2(33, 11) + Vector2(cos(a), sin(a)) * 11
		pts.append(p)
		var t := (p.y) / 22.0
		cols.append(Color("#e8e8e0").lerp(Color("#8a8a80"), t / 0.45) if t < 0.45 else Color("#8a8a80").lerp(Color("#3a3a34"), (t - 0.45) / 0.55))
	pts.append(Vector2(33, 22)); cols.append(Color("#3a3a34"))
	pts.append(Vector2(33, 0)); cols.append(Color("#e8e8e0"))
	c.draw_polygon(pts, cols)

## condition level (4 steps): Fine, Caution (yellow), Caution (orange), Danger
func _lvl() -> int:
	var hp := player.hp if player else HP_MAX
	return 0 if hp >= 120 else (1 if hp >= 60 else (2 if hp >= 30 else 3))
func _cond() -> int:
	return [0, 1, 1, 2][_lvl()]
func _cond_rgb(a := 1.0) -> Color:
	var c: Color = [Color8(40, 200, 40), Color8(230, 200, 30), Color8(240, 120, 20), Color8(220, 40, 30)][_lvl()]
	c.a = a
	return c

func _draw_ecg() -> void:
	var c := ecg
	var w := c.size.x; var h := c.size.y
	c.draw_rect(Rect2(0, 0, w, h), Color.BLACK)
	var y := 6.0
	while y < h:
		c.draw_line(Vector2(8, y + 0.5), Vector2(w - 8, y + 0.5), Color("#4a4a4a"), 1); y += 9
	var period: float = [1.9, 1.3, 0.9][_cond()]
	var ph := fmod(_ecg_t, period) / period
	var x0 := 40.0; var span := w - 80; var head := x0 + ph * span; var y0 := h * 0.52
	var yy := func(x: float) -> float:
		var t := (x - x0) / span
		if t <= 0.18: return 0.0
		var u := (t - 0.18) * 14
		return sin(u * 1.6) * exp(-u * 0.32) * 0.95
	var x := x0
	while x < head:
		var age := (head - x) / span
		c.draw_line(Vector2(x, y0 - yy.call(x) * h * 0.45), Vector2(x + 2, y0 - yy.call(x + 2) * h * 0.45), _cond_rgb(maxf(0, 1 - age * 1.6)), 2)
		x += 2

# ---------- 3D ----------
func _model(id: int) -> Node3D:
	var n := "it_%s.glb" % U.pad(id, 3)
	var o := Assets.scene("inv/" + n)
	if o == null: o = Assets.scene("items/" + n)
	if o == null:
		return null
	Assets.to_lambert(o, "inv")
	var box := _aabb(o, o)
	var s := box.size.length()
	if s == 0: s = 1
	o.position = -box.get_center()
	var piv := Node3D.new(); piv.add_child(o); piv.scale = Vector3.ONE * (2.0 / s)
	return piv

## bounds of all meshes below `root` in the space of `top`
static func _aabb(root: Node, top: Node) -> AABB:
	var out := AABB()
	var has := false
	for mi in Assets.find_meshes(root):
		if mi.mesh == null: continue
		var xf := U.rel_xform(mi, top)
		var ab := mi.mesh.get_aabb()
		for k in 8:
			var p := xf * ab.get_endpoint(k)
			if not has:
				out = AABB(p, Vector3.ZERO); has = true
			else:
				out = out.expand(p)
	return out

func _clear_holder(vp: SubViewport) -> Node3D:
	var h: Node3D = vp.get_node("holder")
	for c in h.get_children():
		h.remove_child(c); c.queue_free()
	return h

func icon(id: int) -> Texture2D:
	if _icons.has(id):
		return _icons[id]
	while _icon_busy:
		await get_tree().process_frame
	if _icons.has(id):
		return _icons[id]
	_icon_busy = true
	var obj := _model(id)
	if obj == null:
		_icons[id] = null; _icon_busy = false; return null
	var holder := _clear_holder(icon_vp)
	holder.add_child(obj)
	var s0 := _aabb(obj, holder).size
	var ov: Variant = ICON_ROT.get(id)
	var rot := Vector3(0.3, -0.45, 0)
	if ov != null: rot = Vector3(ov[0], ov[1], ov[2])
	elif s0.y <= s0.x and s0.y <= s0.z: rot = Vector3(1.15, 0, -0.25)
	elif s0.x <= s0.y and s0.x <= s0.z: rot = Vector3(0.3, -1.2, 0)
	obj.basis = Basis.from_euler(rot, EULER_ORDER_XYZ).scaled(obj.scale) if false else Basis.from_euler(rot, EULER_ORDER_XYZ) * Basis().scaled(obj.scale)
	var bb := _aabb(obj, holder)
	var sz := bb.size; var ct := bb.get_center()
	var cam: Camera3D = icon_vp.get_node("cam")
	var tn := tan(deg_to_rad(cam.fov) / 2)
	var aspect := 1.5
	var dist := maxf(sz.y, sz.x / aspect) / (2 * tn) * 1.08 + sz.z / 2
	cam.transform = Transform3D(Basis(), ct + Vector3(0, 0, dist))
	icon_vp.render_target_update_mode = SubViewport.UPDATE_ONCE
	await RenderingServer.frame_post_draw
	await RenderingServer.frame_post_draw
	var img := icon_vp.get_texture().get_image()
	var tex: Texture2D = ImageTexture.create_from_image(img) if img else null
	_icons[id] = tex
	_clear_holder(icon_vp)
	_icon_busy = false
	return tex

# ---------- state ----------
## open / close with the original panel animation (8 frames slide, SE 7 when in place, SE 9 on close)
func show_screen(open: bool, get := -1, box_mode := false) -> void:
	if open:
		is_open = true; visible = true
		_mode = "get" if get >= 0 else ("box" if box_mode else "list"); _menu_sel = 3; _get_id = get; _cmb_a = -1; _ask = null
		for n in stc: n.visible = get < 0 and not box_mode
		lbl.status.visible = get < 0
		box_panel.visible = box_mode
		if box_mode: _bside = "box"; _bsel = 0; _bscroll = 0
		_set_text("" if get >= 0 else _cur_name())
		audio.se("menu")
		_anim = {"dir": 1, "f": 0, "wait": 0, "se7": false, "lock": 8 if get >= 0 else 14, "gen": randi()}
		var gen: int = _anim.gen
		_apply_anim()
		render()
		if get >= 0: _show_get_model(get)
		while _anim != null and _anim.gen == gen:
			await get_tree().process_frame
		return
	if not is_open:
		return
	_anim = null
	if _ask != null:
		var a: Dictionary = _ask; _ask = null
		ask_done.emit(a.choices.size() - 1 if a.choices != null else 0, a.gen)
	audio.sys(9)
	_anim = {"dir": -1, "f": 8, "wait": 6, "se7": true, "lock": 0, "gen": randi(), "close": true}
	var g2: int = _anim.gen
	while _anim != null and _anim.gen == g2:
		await get_tree().process_frame
	is_open = false; visible = false; _close_check(); _mode = "list"
	for n in stc: n.visible = true
	box_panel.visible = false
	_get_id = -1

## one 30 Hz frame of the open / close animation
func _step_anim() -> void:
	var a: Dictionary = _anim
	if a.dir > 0:
		if a.f < 8:
			a.f += 1
			if a.f == 8 and not a.se7:
				a.se7 = true; audio.sys(7)
		else:
			a.lock -= 1
			if a.lock <= 0: _anim = null
	elif a.wait > 0: a.wait -= 1
	elif a.f > 0: a.f -= 1
	else: _anim = null
	_apply_anim(a.f)

func _apply_anim(fv: Variant = null) -> void:
	var f: float = fv if fv != null else (_anim.f if _anim != null else 8.0)
	var k := 1.0 - f / 8.0
	for g in groups.keys():
		var o: Array = CEN_OFF.get(g, [0, 0])
		groups[g].position = Vector2(o[0] * k * W / 640.0, o[1] * k * H / 480.0)
	var op := minf(1.0, f * 0.0571 * 2.2)
	self_modulate = Color(1, 1, 1, 1)
	_bg_alpha = op
	bgc.modulate.a = minf(1.0, f * 0.0571)
	queue_redraw()

var _bg_alpha := 1.0
func _draw() -> void:
	draw_rect(Rect2(Vector2.ZERO, Vector2(1024, 768)), Color(0, 0, 0, _bg_alpha))

## message box question / pages inside the status screen; returns the chosen index (0 without choices)
func say(pg: Variant, choices: Variant = null) -> int:
	if _ask != null:
		ask_done.emit(-1, _ask.gen)
	var arr := Array(pg)
	_ask_gen += 1
	var g := _ask_gen
	_ask = {"pages": arr if not arr.is_empty() else [""], "page": 0, "choices": choices, "sel": 0, "gen": g}
	_render_ask()
	while true:
		var r: Array = await ask_done
		if r[1] == g:
			return r[0]
	return -1

func _esc(s: String) -> String:
	return s.replace("[", "[lb]")

func _render_ask() -> void:
	var a: Dictionary = _ask
	var last: bool = a.page == a.pages.size() - 1
	var t := _esc(a.pages[a.page])
	if last and a.choices != null:
		t += "\n"
		for i in a.choices.size():
			var c := _esc(a.choices[i])
			t += ("   [color=#ff8a2e]%s[/color]   " % c) if i == a.sel else ("   %s   " % c)
	msgtx.text = t

func _update_ask() -> void:
	var a: Dictionary = _ask
	var last: bool = a.page == a.pages.size() - 1
	var end := func(v: int) -> void:
		_ask = null; msgtx.text = _esc(_text); ask_done.emit(v, a.gen)
	if last and a.choices != null:
		if input.hit(["KeyA", "ArrowLeft"]) or input.hit(["KeyD", "ArrowRight"]):
			a.sel = (a.sel + 1) % a.choices.size(); audio.se("cursor"); _render_ask()
		elif input.action:
			audio.se("cancel" if a.sel == a.choices.size() - 1 else "menu"); end.call(a.sel)
		elif input.cancel:
			audio.se("cancel"); end.call(a.choices.size() - 1)
	elif input.action or input.cancel:
		if last: end.call(0)
		else:
			a.page += 1; _render_ask()

## GetItem: the picked-up item turns in the check window
func _show_get_model(id: int) -> void:
	var obj := _model(id)
	if _get_id != id:
		return
	chk_box.visible = true; chk_hint.text = ""
	_setup_check(obj, id)

func _setup_check(obj: Node3D, id: int) -> void:
	var holder := _clear_holder(chk_vp)
	var grp := Node3D.new(); holder.add_child(grp)
	if obj:
		grp.add_child(obj)
		var ov: Variant = ICON_ROT.get(id)
		if ov != null: obj.basis = Basis.from_euler(Vector3(ov[0], ov[1], ov[2]), EULER_ORDER_XYZ) * Basis().scaled(obj.scale)
	var cam: Camera3D = chk_vp.get_node("cam")
	cam.transform = Transform3D(Basis(), Vector3(0, 0, 3.4))
	chk_vp.render_target_update_mode = SubViewport.UPDATE_ALWAYS
	_chk = {"obj": grp, "rx": 0.35, "ry": 0.0}
	_spin_apply()

func _spin_apply() -> void:
	if _chk == null: return
	(_chk.obj as Node3D).basis = Basis.from_euler(Vector3(_chk.rx, _chk.ry, 0), EULER_ORDER_XYZ)

func refresh() -> void:
	render()

## Use_00: recovery items (curedata)
func heal(id: int) -> void:
	var c: int = CUREDATA[id - 20] if id - 20 >= 0 and id - 20 < CUREDATA.size() else 0
	var h := c & 15
	if player == null: return
	if h == 1: player.hp += 50
	elif h == 2: player.hp += 100
	elif h >= 3: player.hp = HP_MAX
	player.hp = mini(HP_MAX, player.hp)

func _cur() -> Variant:
	return inv.slots[_sel]
func _cur_name() -> String:
	var s: Variant = _cur()
	if _mode == "box" and _bside == "box": s = box[_bsel] if _bsel < box.size() else null
	if _mode == "box" and s == null: return T("boxHint")
	return Text.item_name(s.name) if s != null else ""

func _set_text(t: Variant) -> void:
	_pages = Array(t) if (t is Array or t is PackedStringArray) else Array(String(t).split("\f"))
	_page = 0; _text = _pages[0] if not _pages.is_empty() else ""
	if msgtx: msgtx.text = _esc(_text)

func render() -> void:
	var names: Array = T("menu")
	for i in 4:
		var b: Deco = menu_btns[i]
		b.text = names[i]
		b.on = (i == 3 and _mode != "menu") or (_mode == "menu" and i == _menu_sel)
		b.sel = _mode == "menu" and i == _menu_sel
		b.queue_redraw()
	lbl.eq.text = T("equip"); lbl.st.text = T("standard"); lbl.status.text = T("status"); lbl.name.text = T("name")
	lbl.info.text = T("info"); lbl.cond.text = T("cond"); lbl.list.text = T("list")
	for k in ["eq", "st", "status", "name", "info", "cond", "list"]: lbl[k].queue_redraw()
	if _mode == "box":
		lbl.status.text = T("box")
		var maxs := maxi(0, (box.size() + 1 + BOX_COLS - 1) / BOX_COLS - BOX_ROWS)
		_bscroll = clampi(_bscroll, 0, maxs)
		for i in box_slots.size():
			var k: int = _bscroll * BOX_COLS + i
			await _fill_slot(box_slots[i], box[k] if k < box.size() else null, _bside == "box" and k == _bsel, false, false)
	lbl.i0.text = T("full"); lbl.i1.text = T("height"); lbl.i2.text = T("weight"); lbl.i3.text = T("blood")
	lbl.r1.text = "169" + T("cm"); lbl.r2.text = "52.4" + T("kg"); lbl.r3.text = T("btype")
	var st := _cond()
	fine_l.text = T("danger") if st == 2 else (T("caution") if st == 1 else T("fine"))
	fine_l.add_theme_color_override("font_color", _cond_rgb())
	var eqi: Variant = inv.find(equipped) if equipped != null else null
	var sti: Variant = inv.find(standard) if standard != null else null
	if eqi == null and equipped != null:
		equipped = null
		if on_equip_change.is_valid(): on_equip_change.call()
	if sti == null and standard != null:
		standard = null
		if on_equip_change.is_valid(): on_equip_change.call()
	await _fill_slot(eq_slot, eqi, false, false, false)
	await _fill_slot(st_slot, sti, false, false, false)
	for i in 8:
		var s: Variant = inv.slots[i]
		var mark: bool = s != null and (s.id == equipped or s.id == standard)
		await _fill_slot(list_slots[i], s, i == _sel and _mode != "menu" and _mode != "get" and not (_mode == "box" and _bside != "inv"), _mode == "comb" and i == _cmb_a, mark)
	if _mode == "sub":
		for c in sub_box.get_children(): c.queue_free()
		for i in _sub_opts.size():
			var l := Label.new(); l.text = "  " + _sub_opts[i].t + "  "
			l.add_theme_font_override("font", f_bold); l.add_theme_font_size_override("font_size", 15)
			l.add_theme_color_override("font_color", Color("#ff8a2e") if i == _sub_sel else Color("#cfcfc4"))
			l.custom_minimum_size = Vector2(170, 26)
			sub_box.add_child(l)
		sub.size = Vector2(190, 12 + 26 * _sub_opts.size())
		sub.position = Vector2(478, minf(330, 175 + (_sel / 2) * 65))
		sub.visible = true; sub.queue_redraw()
	else:
		sub.visible = false
	if _ask != null: _render_ask()
	else: msgtx.text = _esc(_text)

func _fill_slot(s: Control, it: Variant, sel: bool, cmb: bool, eq: bool) -> void:
	s.set_meta("item", it); s.set_meta("sel", sel); s.set_meta("cmb", cmb); s.set_meta("eq", eq)
	s.set_meta("tex", null)
	if it != null:
		var t: Texture2D = _icons.get(it.id) if _icons.has(it.id) else await icon(it.id)
		s.set_meta("tex", t)
	s.queue_redraw()

func _open_sub() -> void:
	var s: Variant = _cur()
	if s == null: return
	var first: Dictionary
	if WEAPONS.has(s.id): first = {"t": T("unequip") if equipped == s.id else T("equipA"), "k": "use"}
	elif STANDARD.has(s.id): first = {"t": T("putAway") if standard == s.id else T("hold"), "k": "use"}
	else: first = {"t": T("use"), "k": "use"}
	_sub_opts = [first, {"t": T("check"), "k": "check"}, {"t": T("combine"), "k": "combine"}]
	_sub_sel = 0; _mode = "sub"; audio.se("menu")

func _do_use() -> void:
	var s: Variant = _cur()
	if s == null: return
	if WEAPONS.has(s.id):
		# a weapon and the lighter share Claire's hands: equipping one puts the other away
		equipped = null if equipped == s.id else s.id
		if equipped != null: standard = null
		if on_equip_change.is_valid(): on_equip_change.call()
		_set_text(T("equipped", Text.item_name(s.name)) if equipped != null else _cur_name())
	elif STANDARD.has(s.id):
		standard = null if standard == s.id else s.id
		if standard != null: equipped = null
		if on_equip_change.is_valid(): on_equip_change.call()
		_set_text(T("lit") if standard != null else T("unlit"))
	elif s.id >= 20 and s.id <= 29:
		if CUREDATA[s.id - 20] == 0:
			_set_text(Text.pages(Text.SYSMES[161])); return
		heal(s.id); inv.take(s.id); _set_text(_cur_name())
	elif on_use_item.is_valid() and on_use_item.call(s.id):
		return
	else:
		_set_text(Text.pages(Text.SYSMES[160 if AMMO.has(s.id) else 161]))

## Combi_00 / herb mixing: item in slot a is combined into slot b
func _combine(a: int, b: int) -> void:
	var A: Variant = inv.slots[a]; var B: Variant = inv.slots[b]
	var e: Variant = null
	if A != null and B != null and a != b:
		for x in COMBI.get(int(B.id), []):
			if x[0] == A.id:
				e = x; break
	if e == null:
		audio.se("error"); return
	var res: int = e[1]; var type: int = e[2]
	if type == 0 or type == 1:
		var Wp: Dictionary = B if AMMO.has(A.id) else A
		var M: Dictionary = A if AMMO.has(A.id) else B
		if not AMMO.has(M.id):
			inv.slots[a] = null; B.id = res; B.name = Text.ITEM_NAMES.get(res, B.name); audio.se("menu"); return
		var mx: int = BULLET_MAX.get(int(Wp.id), 15)
		var n := mini(mx - int(Wp.count), int(M.count))
		if n <= 0:
			audio.se("cancel"); _set_text(Text.pages(Text.SYSMES[156])); return
		Wp.count += n; M.count -= n
		if M.count <= 0: inv.slots[inv.slots.find(M)] = null
		audio.se("menu")
	elif type == 2:
		B.count += A.count; inv.slots[a] = null; audio.se("menu")
	elif type == 6:
		audio.se("menu")
		var c: int = await say(Text.pages(Text.SYSMES[155]), [Text.yes(), Text.no()])
		if c != 0: return
		inv.slots[a] = null; inv.slots[b] = {"id": res, "name": Text.ITEM_NAMES.get(res, ""), "count": 1}
		_sel = b
	else:
		audio.se("error"); return
	_set_text(_cur_name())

func _open_check() -> void:
	var s: Variant = _cur()
	if s == null: return
	var obj := _model(s.id)
	chk_box.visible = true; chk_hint.text = T("rot")
	_setup_check(obj, s.id)
	_set_text(item_desc(s.id))
	_mode = "check"

func _close_check() -> void:
	_chk = null
	if chk_box: chk_box.visible = false
	if chk_vp: chk_vp.render_target_update_mode = SubViewport.UPDATE_DISABLED
	if _mode == "check": _mode = "list"

func _spin_get(dt: float) -> void:
	if _mode != "get" or _chk == null: return
	_chk.ry += dt * 0.6; _spin_apply()

## Per-frame update while the screen is open. Returns false when the screen was closed.
func update(dt: float) -> bool:
	if not is_open:
		return false
	_ecg_t += dt
	ecg.queue_redraw()
	_acc += dt
	if _anim != null:
		while _acc >= 1.0 / 30.0 and _anim != null:
			_acc -= 1.0 / 30.0; _step_anim()
		_spin_get(dt)
		return true
	_acc = 0
	if _mode == "get":
		_spin_get(dt)
		if _ask != null: _update_ask()
		return true
	if _ask != null:
		_update_ask(); return true
	var L := input.hit(["KeyA", "ArrowLeft"]); var R := input.hit(["KeyD", "ArrowRight"]); var Up := input.hit(["KeyW", "ArrowUp"]); var D := input.hit(["KeyS", "ArrowDown"])
	if _mode == "box":
		if input.cancel or input.inventory:
			audio.se("cancel"); return false
		_update_box(L, R, Up, D); return true
	if _mode == "check" and _chk != null:
		var c: Dictionary = _chk
		if input.has(["KeyA", "ArrowLeft"]): c.ry -= dt * 2.2
		elif input.has(["KeyD", "ArrowRight"]): c.ry += dt * 2.2
		else: c.ry += dt * 0.6
		if input.has(["KeyW", "ArrowUp"]): c.rx -= dt * 2.2
		if input.has(["KeyS", "ArrowDown"]): c.rx += dt * 2.2
		_spin_apply()
		if input.action:
			if _page + 1 < _pages.size():
				_page += 1; _text = _pages[_page]; msgtx.text = _esc(_text); audio.se("cursor")
			else:
				audio.se("cancel"); _close_check(); _set_text(_cur_name()); render()
		elif input.cancel or input.inventory:
			audio.se("cancel"); _close_check(); _set_text(_cur_name()); render()
		return true
	if _mode == "sub":
		if Up or D:
			_sub_sel = (_sub_sel + (1 if D else _sub_opts.size() - 1)) % _sub_opts.size(); audio.se("cursor"); render()
		elif input.action:
			var k: String = _sub_opts[_sub_sel].k; _mode = "list"
			if k == "use":
				audio.se("menu"); _do_use(); render()
			elif k == "check":
				audio.se("menu"); _open_check(); render()
			else:
				audio.se("menu"); _cmb_a = _sel; _mode = "comb"; render()
		elif input.cancel:
			_mode = "list"; audio.se("cancel"); render()
		return true
	if _mode == "menu":
		if L or R:
			_menu_sel = (_menu_sel + (1 if R else 3)) % 4; audio.se("cursor"); _set_text(""); render()
		elif D:
			_mode = "list"; _menu_sel = 3; audio.se("cursor"); _set_text(_cur_name()); render()
		elif input.action:
			if _menu_sel == 3:
				_mode = "list"; audio.se("menu"); _set_text(_cur_name()); render()
			elif _menu_sel == 0:
				audio.se("cancel"); return false
			else:
				audio.se("menu"); _set_text(T("noData"))
		elif input.cancel or input.inventory:
			audio.se("cancel"); return false
		return true
	if _mode == "comb":
		var d := 0
		if L and _sel % 2 == 1: d = -1
		if R and _sel % 2 == 0: d = 1
		if D and _sel < 6: d = 2
		if Up and _sel >= 2: d = -2
		if d:
			_sel += d; audio.se("cursor"); _set_text(_cur_name()); render()
		elif input.action:
			var a := _cmb_a; _mode = "list"; _cmb_a = -1
			_combine_then_render(a, _sel); render()
		elif input.cancel:
			_mode = "list"; _cmb_a = -1; audio.se("cancel"); render()
		return true
	# item list (2 columns x 4 rows)
	var dd := 0
	if L and _sel % 2 == 1: dd = -1
	if R and _sel % 2 == 0: dd = 1
	if D and _sel < 6: dd = 2
	if Up:
		if _sel >= 2: dd = -2
		else:
			_mode = "menu"; _menu_sel = 3; audio.se("cursor"); render(); return true
	if dd:
		_sel += dd; audio.se("cursor"); _set_text(_cur_name()); render()
	elif input.action:
		if _cur() != null:
			_open_sub(); render()
	elif input.cancel or input.inventory:
		audio.se("cancel"); return false
	return true

## box mode: the cursor walks the box grid (left) and the item list (right); the action button moves the item across
func _update_box(L: bool, R: bool, Up: bool, D: bool) -> void:
	var moved := false
	if _bside == "box":
		var c := _bsel % BOX_COLS
		if L and c > 0: _bsel -= 1; moved = true
		elif R:
			if c < BOX_COLS - 1 and _bsel < box.size(): _bsel += 1
			else: _bside = "inv"; _sel = clampi(((_bsel / BOX_COLS - _bscroll) / 2) * 2, 0, 6)
			moved = true
		elif Up and _bsel >= BOX_COLS: _bsel -= BOX_COLS; moved = true
		elif D and _bsel + BOX_COLS <= box.size(): _bsel += BOX_COLS; moved = true
		_bsel = clampi(_bsel, 0, maxi(0, box.size()))
		if _bsel / BOX_COLS < _bscroll: _bscroll = _bsel / BOX_COLS
		if _bsel / BOX_COLS >= _bscroll + BOX_ROWS: _bscroll = _bsel / BOX_COLS - BOX_ROWS + 1
	else:
		if L:
			if _sel % 2 == 1: _sel -= 1
			else: _bside = "box"; _bsel = clampi((_bscroll + _sel / 2) * BOX_COLS + BOX_COLS - 1, 0, box.size())
			moved = true
		elif R and _sel % 2 == 0: _sel += 1; moved = true
		elif Up and _sel >= 2: _sel -= 2; moved = true
		elif D and _sel < 6: _sel += 2; moved = true
	if moved:
		audio.se("cursor"); _set_text(_cur_name()); render(); return
	if not input.action: return
	if _bside == "inv":
		var it: Variant = inv.slots[_sel]
		if it == null: return
		inv.slots[_sel] = null
		var merged := false
		if Inventory.STACK.has(it.id):
			for b in box:
				if b.id == it.id: b.count += it.count; merged = true; break
		if not merged: box.append(it)
		if equipped == it.id or standard == it.id:
			if equipped == it.id: equipped = null
			if standard == it.id: standard = null
			if on_equip_change.is_valid(): on_equip_change.call()
	else:
		if _bsel >= box.size(): return
		var it: Dictionary = box[_bsel]
		if not inv.can_add(it.id):
			audio.se("cancel"); _set_text(Text.pages(Text.SYSMES.get(154, ""))); render(); return
		box.remove_at(_bsel)
		inv.add(it.id, it.name, it.count)
	audio.se("menu"); _set_text(_cur_name()); render()

func _combine_then_render(a: int, b: int) -> void:
	await _combine(a, b)
	render()
