extends Node
## Title screen (adv.c Adv_BioCvTitle, PS3 HD art): the HD background (title_bg_1, logo included) on a 16:9 strip
## of the 4:3 canvas, "PRESS START" (mode 5-7) pulsing, then the game mode plate (mode 8-10). Layout: the PS2
## 640x480 positions of DisplayPressStartPlate / DisplayGameModePlate / DisplayTitleBg mapped to the HD screen
## (x 160 + 1.5x, y 1.5y — the 4:3 area of 1280x720), the plates drawn 1:1 from the menu_font atlas (HD pixels).
## English: the atlas plates; Russian: the same plates set in Cambria Bold (closest to the atlas lettering) with the
## atlas' 2 px grey outline. Frame counters at 60 Hz (the adv screens).

var ui: UIRoot
var game: Game = null
var _title: Control
var _hd: Control
var _press: Control
var _menu: Array = []          # plates of the game mode menu
var _sel := 0
var _save: Variant = null
var _busy := false
## ap->Mode: 5/6 PRESS START, 7 its fade-out, 8 menu fade-in, 9 menu, 10 menu fade-out
var _mode := 5
var _timer := 900.0
var _fc := 0.0; var _fs := 32.0          # FlushCount / FlushSpeed
var _fc2 := 0.0; var _fs2 := 0.0         # FlushCount2 / FlushSpeed2 (cursor pulse)
var _next := ""
var _acc := 0.0
var _atlas: Texture2D

const HD := Vector2(1280, 720)
## atlas plates (x, y, w, h) — PS3 eng menu_font
const AT_PRESS := Rect2(225, 56, 316, 34)
const AT_LOAD := Rect2(240, 104, 290, 34)
const AT_NEW := Rect2(250, 152, 268, 34)
const AT_COPY := Rect2(40, 13, 690, 28)

func _ready() -> void:
	ui = UIRoot.new()
	add_child(ui)
	_save = Game.load_save()
	_atlas = load("res://assets/title/menu_font.webp") if ResourceLoader.exists("res://assets/title/menu_font.webp") else null
	_build()
	_enter_press()

func _items() -> Array:
	var ru := Text.ru()
	# CursorMax 3: LOAD GAME, NEW GAME, OPTION (the port's option = the language)
	return [{"k": "load", "t": "ЗАГРУЗИТЬ ИГРУ" if ru else "LOAD GAME", "at": AT_LOAD},
		{"k": "new", "t": "НОВАЯ ИГРА" if ru else "NEW GAME", "at": AT_NEW},
		{"k": "lang", "t": "ЯЗЫК: РУССКИЙ" if ru else "LANGUAGE: ENGLISH", "at": null}]

func _build() -> void:
	_title = Control.new(); _title.size = Vector2(1024, 768); _title.mouse_filter = Control.MOUSE_FILTER_STOP
	var black := ColorRect.new(); black.color = Color.BLACK; black.size = _title.size; black.mouse_filter = Control.MOUSE_FILTER_IGNORE
	_title.add_child(black)
	_hd = Control.new(); _hd.size = HD; _hd.scale = Vector2.ONE * (1024.0 / HD.x)
	_hd.position = Vector2(0, (768 - HD.y * 1024.0 / HD.x) * 0.5); _hd.mouse_filter = Control.MOUSE_FILTER_IGNORE
	_title.add_child(_hd)
	if ResourceLoader.exists("res://assets/title/bg_hd.webp"):
		var bg := TextureRect.new(); bg.texture = load("res://assets/title/bg_hd.webp"); bg.size = HD
		bg.mouse_filter = Control.MOUSE_FILTER_IGNORE; _hd.add_child(bg)
	# DisplayTitleBg: the copyright plate (PS2 (348, 418) 240x32 -> centre y 651)
	var cp := _plate("©CAPCOM CO., LTD. 2000, 2011 ALL RIGHTS RESERVED.", AT_COPY, 651, 20, true)
	cp.modulate = Color(1, 1, 1, 1)
	_title.gui_input.connect(_on_click)
	ui.base.add_child(_title)
	ui.base.move_child(_title, 0)

## a plate centred at HD y: the atlas region (English / always for `atlas_always`) or the text in the atlas style
func _plate(t: String, at: Variant, cy: float, fsize := 48, atlas_always := false) -> Control:
	var c: Control
	if at != null and _atlas != null and (atlas_always or not Text.ru()):
		var tr := TextureRect.new(); var a := AtlasTexture.new(); a.atlas = _atlas; a.region = at; tr.texture = a
		tr.size = (at as Rect2).size; c = tr
	else:
		var l := Label.new(); l.text = t
		var f := SystemFont.new(); f.font_names = PackedStringArray(["Cambria", "Georgia", "Times New Roman", "Liberation Serif", "serif"])
		f.font_weight = 700
		l.add_theme_font_override("font", f); l.add_theme_font_size_override("font_size", fsize)
		l.add_theme_color_override("font_color", Color.WHITE)
		l.add_theme_color_override("font_outline_color", Color(0.5, 0.5, 0.5, 0.88))
		l.add_theme_constant_override("outline_size", 4)
		l.scale.x = 1.07; c = l
	c.mouse_filter = Control.MOUSE_FILTER_IGNORE
	_hd.add_child(c)
	if c is Label: c.reset_size()
	c.position = Vector2(HD.x * 0.5 - c.size.x * c.scale.x * 0.5, cy - c.size.y * 0.5)
	return c

func _clear_plates() -> void:
	if _press: _press.queue_free(); _press = null
	for p in _menu: (p as Control).queue_free()
	_menu = []

## mode 5: PRESS START (FlushCount 0 -> pulse 128..255), Timer 900
func _enter_press() -> void:
	_clear_plates()
	_press = _plate("НАЖМИТЕ START" if Text.ru() else "PRESS START", AT_PRESS, 1.5 * (304 + 16))
	_timer = 900.0; _fc = 0.0; _fs = 32.0; _mode = 6
	_press.modulate.a = 0.0

## mode 8: the game mode plate (PosYDef[0] 288 / 320 / 352, 33 high); cursor 0 (LOAD) without a save -> 1
func _enter_menu() -> void:
	_clear_plates()
	var it := _items()
	for i in it.size():
		_menu.append(_plate(it[i].t, it[i].at, 1.5 * (288 + 32 * i + 16.5)))
	if _sel == 0 and _save == null: _sel = 1
	_fc = 0.0; _fs = 32.0; _fc2 = 0.0; _fs2 = 0.0; _mode = 8
	_paint_menu()

## DisplayGameModePlate: the cursor plate FontBaseColor (255 + FlushCount2) with alpha FadeRate + FlushCount2,
## the others 0x7F7F7F with alpha FadeRate
func _paint_menu() -> void:
	for i in _menu.size():
		var p: Control = _menu[i]
		if i == _sel:
			var b := (255.0 + _fc2) / 255.0
			p.modulate = Color(b, b, b, clampf((_fc + (_fc2 if _mode == 9 else 0.0)) / 255.0, 0, 1))
		else:
			p.modulate = Color(127 / 255.0, 127 / 255.0, 127 / 255.0, _fc / 255.0)

func _process(dt: float) -> void:
	if game != null or _busy: return
	_acc = minf(_acc + dt, 0.25)
	while _acc >= 1.0 / 60.0:
		_acc -= 1.0 / 60.0; _frame()

func _frame() -> void:
	match _mode:
		6:
			_fc += _fs
			if _fs < 0:
				if _fc <= 128.0: _fc = 128.0; _fs = 4.0
			elif _fc >= 255.0: _fc = 255.0; _fs = -4.0
			_timer -= 1
			if _timer < 0: _choose("movie"); return
			if _press: _press.modulate.a = _fc / 255.0
		7:
			# FadeOutPlate
			_fc -= _fs
			if _fc < 0: _fc = 0; _enter_menu(); return
			if _press: _press.modulate.a = _fc / 255.0
		8:
			# FadeInPlate(9)
			_fc += _fs
			if _fc > 255.0: _fc = 255.0; _mode = 9
			_paint_menu()
		9:
			# FlushPlate: FlushCount2 0 .. -64, 2 a frame
			_fc2 += _fs2
			if _fs2 < 0:
				if _fc2 <= -64.0: _fc2 = -64.0; _fs2 = 2.0
			elif _fc2 >= 0: _fc2 = 0; _fs2 = -2.0
			_paint_menu()
		10:
			_fc -= _fs
			_paint_menu()
			if _fc < 0:
				_fc = 0; _paint_menu(); var k := _next; _next = ""; _choose(k)

func _start_pressed() -> void:
	if _mode == 6: _fc = 255.0; _fs = 32.0; _mode = 7

func _unhandled_input(ev: InputEvent) -> void:
	if game != null or _busy or not (ev is InputEventKey) or not ev.pressed or ev.echo: return
	var c := GameInput.code_of(ev)
	if _mode == 6:
		if c in ["Enter", "Space", "KeyE"]:
			get_viewport().set_input_as_handled(); _start_pressed()
		return
	if _mode != 9: return
	var n := _menu.size()
	if c == "ArrowDown" or c == "KeyS":
		_sel = (_sel + 1) % n; _fc2 = 0; _fs2 = 0; _paint_menu()
	elif c == "ArrowUp" or c == "KeyW":
		_sel = (_sel + n - 1) % n; _fc2 = 0; _fs2 = 0; _paint_menu()
	elif c in ["Enter", "Space", "KeyE"]:
		get_viewport().set_input_as_handled()
		_decide(_items()[_sel].k)
	elif c == "Escape":
		_next = "back"; _mode = 10; _fc = 255.0

func _on_click(ev: InputEvent) -> void:
	if game != null or _busy or not (ev is InputEventMouseButton) or not ev.pressed or ev.button_index != MOUSE_BUTTON_LEFT: return
	if _mode == 6: _start_pressed(); return
	if _mode != 9: return
	var hy: float = (ev.position.y - _hd.position.y) / _hd.scale.y
	for i in _menu.size():
		var p: Control = _menu[i]
		if hy >= p.position.y and hy <= p.position.y + p.size.y:
			_sel = i; _paint_menu(); _decide(_items()[i].k); return

func _decide(k: String) -> void:
	if k == "load" and _save == null: return   # no save data
	if k == "lang":
		Text.set_lang("en" if Text.ru() else "ru"); _enter_menu(); _fc = 255.0; _mode = 9; _paint_menu(); return
	_next = k; _mode = 10; _fc = 255.0

func _choose(k: String) -> void:
	if _busy or game != null: return
	if k == "back": _enter_press(); return
	_busy = true
	if k == "movie":
		# Timer 900 on PRESS START: the opening movie, then the title again
		_title.visible = false
		await Movie.play(self, "mv_000")
		_title.visible = true; _busy = false; _enter_press(); return
	_title.queue_free()
	ui.fade_set(1.0)
	var ld := Label.new(); ld.text = "ЗАГРУЗКА…" if Text.ru() else "LOADING…"
	ld.add_theme_font_override("font", ui.serif); ld.add_theme_font_size_override("font_size", 18)
	ld.position = Vector2(1024 * 0.82, 768 * 0.92)
	ui.add_child(ld)
	await get_tree().process_frame
	await get_tree().process_frame
	game = Game.new(ui)
	add_child(game)
	var data: Variant = _save if k == "load" else null
	game.on_ready = func() -> void: ld.queue_free()
	await game.start(data)
