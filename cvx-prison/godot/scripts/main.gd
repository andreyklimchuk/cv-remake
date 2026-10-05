extends Node
## Title menu (port of main.ts): New game / Continue / Opening movie / Language.

var ui: UIRoot
var game: Game = null
var _title: Control
var _menu: VBoxContainer
var _help: Label
var _h3: Label
var _sel := 0
var _save: Variant = null
var _busy := false

func _ready() -> void:
	ui = UIRoot.new()
	add_child(ui)
	_save = Game.load_save()
	_build()
	_render()

func _items() -> Array:
	var ru := Text.ru()
	var a := [{"k": "new", "t": "Новая игра" if ru else "New game"}]
	if _save != null: a.append({"k": "load", "t": "Продолжить" if ru else "Continue"})
	a.append({"k": "movie", "t": "Вступительный ролик" if ru else "Opening movie"})
	a.append({"k": "lang", "t": "Язык: русский" if ru else "Language: English"})
	return a

func _build() -> void:
	_title = Control.new(); _title.size = Vector2(1024, 768)
	var bg := _Radial.new(); bg.size = Vector2(1024, 768); _title.add_child(bg)
	var box := VBoxContainer.new(); box.size = Vector2(1024, 768 * 0.84); box.alignment = BoxContainer.ALIGNMENT_CENTER
	_title.add_child(box)
	var h1 := Label.new(); h1.text = "R E S I D E N T   E V I L\nC O D E :  V e r o n i c a   X"
	h1.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	h1.add_theme_font_override("font", ui.serif); h1.add_theme_font_size_override("font_size", 38)
	h1.add_theme_color_override("font_color", Color8(0xd9, 0xcf, 0xae))
	box.add_child(h1)
	_h3 = Label.new(); _h3.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	_h3.add_theme_font_override("font", ui.serif); _h3.add_theme_font_size_override("font_size", 17)
	_h3.add_theme_color_override("font_color", Color8(0xaa, 0x33, 0x33))
	box.add_child(_h3)
	var sp := Control.new(); sp.custom_minimum_size = Vector2(0, 40); box.add_child(sp)
	_menu = VBoxContainer.new(); _menu.add_theme_constant_override("separation", 14); box.add_child(_menu)
	_help = Label.new(); _help.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	_help.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	_help.add_theme_font_override("font", ui.serif); _help.add_theme_font_size_override("font_size", 12)
	_help.modulate.a = 0.6
	_help.position = Vector2(40, 768 * 0.84); _help.size = Vector2(1024 - 80, 110)
	_title.add_child(_help)
	ui.base.add_child(_title)
	ui.base.move_child(_title, 0)

func _render() -> void:
	var ru := Text.ru()
	_h3.text = "Т Ю Р Ь М А  ·  О С Т Р О В   Р О К Ф О Р Т" if ru else "P R I S O N  ·  R O C K F O R T   I S L A N D"
	for c in _menu.get_children(): c.queue_free()
	var it := _items()
	for i in it.size():
		var l := Label.new(); l.text = it[i].t; l.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
		l.add_theme_font_override("font", ui.serif); l.add_theme_font_size_override("font_size", 22)
		l.add_theme_color_override("font_color", Color.WHITE if i == _sel else Color(0.85, 0.85, 0.85))
		l.modulate.a = 1.0 if i == _sel else 0.65
		l.mouse_filter = Control.MOUSE_FILTER_STOP
		var k: String = it[i].k
		var idx := i
		l.gui_input.connect(func(ev: InputEvent) -> void:
			if ev is InputEventMouseButton and ev.pressed and ev.button_index == MOUSE_BUTTON_LEFT:
				_sel = idx; _choose(k))
		_menu.add_child(l)
	_help.text = ("W/S или ↑/↓ — вперёд/назад · A/D или ←/→ — поворот · Shift — бег · C — камера (фиксированная / от плеча: мышь или ←/→ — обзор, A/D — шаг вбок)\nF / ПКМ — приготовить нож · E / Пробел / Enter / ЛКМ — действие, удар · Tab — предметы · Esc — отмена · F1 — отладка\nФанатский порт на основе ресурсов PS3-версии. Не для распространения."
		if ru else "W/S or ↑/↓ — forward/back · A/D or ←/→ — turn · Shift — run · C — camera (fixed / over-the-shoulder: mouse or ←/→ look, A/D strafe)\nF / RMB — ready knife · E / Space / Enter / LMB — action, attack · Tab — items · Esc — cancel · F1 — debug\nFan port built from the PS3 version assets. Not for distribution.")

func _unhandled_input(ev: InputEvent) -> void:
	if game != null or _busy or not (ev is InputEventKey) or not ev.pressed or ev.echo: return
	var c := GameInput.code_of(ev)
	var n := _items().size()
	if c == "ArrowDown" or c == "KeyS":
		_sel = (_sel + 1) % n; _render()
	elif c == "ArrowUp" or c == "KeyW":
		_sel = (_sel + n - 1) % n; _render()
	elif c in ["Enter", "Space", "KeyE"]:
		get_viewport().set_input_as_handled()
		_choose(_items()[_sel].k)

func _choose(k: String) -> void:
	if _busy or game != null: return
	if k == "lang":
		Text.set_lang("en" if Text.ru() else "ru"); _render(); return
	_busy = true
	if k == "movie":
		_title.visible = false
		await Movie.play(self, "mv_000")
		_title.visible = true; _busy = false; _render(); return
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

class _Radial extends Control:
	func _draw() -> void:
		var c := size * 0.5
		var r := size.length() * 0.5
		draw_rect(Rect2(Vector2.ZERO, size), Color.BLACK)
		for i in range(24, 0, -1):
			var t := float(i) / 24.0
			draw_circle(c, r * 0.7 * t, Color(0.125 * (1.0 - t), 0, 0, 1))
