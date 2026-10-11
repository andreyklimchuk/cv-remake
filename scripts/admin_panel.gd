extends PanelContainer
## TEMPORARY admin / debug panel (F2): room warp, event flags, items, heal / god mode, story presets.
## The game is paused while it is open. Not part of the original game — remove before release.

const FLAG_TYPES := [["ev (событие)", 1], ["it (предмет взят)", 7], ["ky", 2], ["ed", 3], ["mp (карта)", 8], ["ic", 9], ["ts", 12], ["rm (комната)", 4]]
## story presets: [label, room, pos, ev flags, it flags, items]
const PRESETS := [
	["rm_1020 → rm_1070 → rm_1050 (люгеры)", "rm_1050", 0, [], [], []],
	["Головоломка Стива (rm_1050, руль взят)", "rm_1050", 0, [13, 146], [11], [53]],
	["Катсцена Альфреда (rm_1020, Стив спасён)", "rm_1020", 0, [13, 146, 15], [11], [53]],
]

var g: Game
var god := false
var _room: OptionButton
var _pos: SpinBox
var _ftype: OptionButton
var _fidx: SpinBox
var _fstate: Label
var _item: OptionButton
var _cnt: SpinBox
var _info: Label
var _god: CheckBox

func _init(game: Game) -> void:
	g = game
	process_mode = Node.PROCESS_MODE_ALWAYS
	visible = false
	position = Vector2(16, 16)
	custom_minimum_size = Vector2(470, 0)
	var sb := StyleBoxFlat.new(); sb.bg_color = Color(0.05, 0.05, 0.08, 0.92); sb.set_content_margin_all(10)
	sb.border_color = Color(0.8, 0.2, 0.2); sb.set_border_width_all(2)
	add_theme_stylebox_override("panel", sb)
	var v := VBoxContainer.new(); add_child(v)
	_label(v, "АДМИН-ПАНЕЛЬ (временно) — F2 закрыть, игра на паузе", Color(1, 0.5, 0.5))
	_info = _label(v, "", Color(0.8, 0.8, 0.8))

	_label(v, "Переход в комнату", Color(1, 0.85, 0.4))
	var h := _row(v)
	_room = OptionButton.new(); for r in Game.ROOMS: _room.add_item(r)
	h.add_child(_room)
	h.add_child(_txt("вход")); _pos = _spin(0, 31, 0); h.add_child(_pos)
	_btn(h, "Перейти", func() -> void: _warp(Game.ROOMS[_room.selected], int(_pos.value)))

	_label(v, "Флаги", Color(1, 0.85, 0.4))
	h = _row(v)
	_ftype = OptionButton.new(); for t in FLAG_TYPES: _ftype.add_item(t[0])
	_ftype.item_selected.connect(func(_i: int) -> void: _upd_flag())
	h.add_child(_ftype)
	_fidx = _spin(0, 1023, 0); _fidx.value_changed.connect(func(_x: float) -> void: _upd_flag()); h.add_child(_fidx)
	_fstate = _txt(""); h.add_child(_fstate)
	h = _row(v)
	_btn(h, "Установить", func() -> void: _set_flag(true))
	_btn(h, "Снять", func() -> void: _set_flag(false))

	_label(v, "Предметы", Color(1, 0.85, 0.4))
	h = _row(v)
	_item = OptionButton.new(); _item.custom_minimum_size.x = 260
	h.add_child(_item)
	h.add_child(_txt("x")); _cnt = _spin(1, 999, 1); h.add_child(_cnt)
	_btn(h, "Дать", _give)
	h = _row(v)
	_btn(h, "Очистить инвентарь", func() -> void:
		for i in g.inv.slots.size(): g.inv.slots[i] = null
		g.inv_screen.equipped = null; g.inv_screen.standard = null; g._equip_changed(); _toast("инвентарь очищен"))

	_label(v, "Игрок", Color(1, 0.85, 0.4))
	h = _row(v)
	_btn(h, "Вылечить", func() -> void: g.player.hp = 160; _toast("HP 160"))
	_god = CheckBox.new(); _god.text = "Бессмертие"; _god.toggled.connect(func(on: bool) -> void: god = on); h.add_child(_god)
	_btn(h, "Пропустить событие", func() -> void: g.vm.cb |= 0x10000000; _toast("пропуск"))

	_label(v, "Пресеты по сюжету", Color(1, 0.85, 0.4))
	for p in PRESETS:
		var pp: Array = p
		_btn(v, pp[0], func() -> void: _preset(pp))

func _label(p: Control, t: String, c: Color) -> Label:
	var l := Label.new(); l.text = t; l.add_theme_color_override("font_color", c); p.add_child(l); return l
func _txt(t: String) -> Label:
	var l := Label.new(); l.text = t; return l
func _row(p: Control) -> HBoxContainer:
	var h := HBoxContainer.new(); p.add_child(h); return h
func _spin(a: int, b: int, v: int) -> SpinBox:
	var s := SpinBox.new(); s.min_value = a; s.max_value = b; s.value = v; s.rounded = true; return s
func _btn(p: Control, t: String, f: Callable) -> Button:
	var b := Button.new(); b.text = t; b.pressed.connect(f); p.add_child(b); return b
func _toast(t: String) -> void:
	_info.text = t

func toggle() -> void:
	visible = not visible
	if visible:
		Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
		var i := Game.ROOMS.find(g.room_id)
		if i >= 0: _room.select(i)
		_upd_flag(); _upd_info()
		if _item.item_count == 0:   # Text.ITEM_NAMES is loaded after the game node
			var ids := Text.ITEM_NAMES.keys(); ids.sort()
			for id in ids:
				if String(Text.ITEM_NAMES[id]) != "": _item.add_item("%d  %s" % [id, Text.ITEM_NAMES[id]], id)
	else:
		g.input.down.clear(); g.input.pressed.clear()

func _input(ev: InputEvent) -> void:
	if ev is InputEventKey and ev.pressed and not ev.echo and ev.keycode == KEY_F2:
		toggle(); get_viewport().set_input_as_handled()

func _process(_dt: float) -> void:
	if god and g.player.hp < 160: g.player.hp = 160

func _upd_info() -> void:
	var p := g.player.position
	_info.text = "%s  pos %.2f %.2f %.2f  HP %d" % [g.room_id, p.x, p.y, p.z, g.player.hp]

func _ftype_id() -> int: return FLAG_TYPES[_ftype.selected][1]

func _upd_flag() -> void:
	if g.vm == null: return
	_fstate.text = "= 1" if g.vm.flag(_ftype_id(), int(_fidx.value)) else "= 0"

func _set_flag(on: bool) -> void:
	var t := _ftype_id(); var i := int(_fidx.value)
	if t == 4: i &= 31
	g.vm.set_flag(t, i, on); _upd_flag()
	_toast("%s[%d] = %d" % [FLAG_TYPES[_ftype.selected][0].get_slice(" ", 0), i, int(on)])

func _give() -> void:
	if _item.item_count == 0: return
	var id := _item.get_item_id(_item.selected)
	var ok := g.inv.add(id, Text.ITEM_NAMES.get(id, ""), int(_cnt.value))
	_toast(("выдан: %s" if ok else "нет места: %s") % Text.ITEM_NAMES.get(id, str(id)))

func _warp(id: String, pos: int) -> void:
	if g.busy: _toast("подождите — идёт загрузка"); return
	visible = false
	g.input.down.clear(); g.input.pressed.clear()
	g.msg.abort(); g.vm.pending_msg = null
	await g.enter_room(id, pos)

func _preset(p: Array) -> void:
	for n in p[3]: g.vm.set_flag(1, n, true)
	for n in p[4]: g.vm.set_flag(7, n, true)
	for id in p[5]:
		if not g.inv.has(id): g.inv.add(id, Text.ITEM_NAMES.get(id, ""))
	_warp(p[1], p[2])
