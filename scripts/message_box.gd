class_name MessageBox
extends RefCounted
## A queue-based message box (port of ui.ts MessageBox). show() returns (await) the chosen answer when
## the player dismissed all pages.

signal closed(v: int, gen: int)

var _gen := 0

var _ui: UIRoot
var _queue: Array = []
var _full := ""
var _shown := 0.0
var _choices: Variant = null
var _sel := 0
var active := false
var on_cursor: Callable

func _init(ui: UIRoot) -> void:
	_ui = ui

func show(text: Variant, choices: Variant = null) -> int:
	_queue = Array(text) if (text is Array or text is PackedStringArray) else Array(Text.pages(text))
	if _queue.is_empty(): _queue = [""]
	_choices = choices; _sel = 0
	active = true; _next()
	_ui.msg_panel.visible = true
	_gen += 1
	var g := _gen
	while true:
		var r: Array = await closed
		if r[1] == g:
			return r[0]
	return -1

func raw(lines: Array, choices: Variant = null) -> int:
	var v: int = await show(lines, choices)
	return v

func _next() -> void:
	_full = _queue.pop_front() if not _queue.is_empty() else ""
	_shown = 0; _render()

func _render() -> void:
	var done := _shown >= _full.length()
	_ui.msg_text.text = _full.substr(0, int(floor(_shown)))
	for c in _ui.choice_box.get_children(): c.queue_free()
	_ui.choice_box.visible = false
	if done and _queue.is_empty() and _choices != null:
		_ui.choice_box.visible = true
		var lines := _full.count("\n") + 1
		_ui.choice_box.position = Vector2(_ui.msg_text.position.x, _ui.msg_text.position.y + lines * 30 + 6)
		for i in (_choices as Array).size():
			var l := Label.new(); l.text = _choices[i]
			l.add_theme_font_override("font", _ui.serif); l.add_theme_font_size_override("font_size", 22)
			l.add_theme_color_override("font_color", Color.WHITE if i == _sel else Color8(0xe8, 0xe2, 0xd0, 0xb0))
			if i == _sel: l.text = "[ " + l.text + " ]"
			_ui.choice_box.add_child(l)
	_ui.more.visible = done and (not _queue.is_empty() or _choices == null)

func update(dt: float, action: bool, left: bool, right: bool, cancel: bool) -> void:
	if not active:
		return
	if _shown < _full.length():
		_shown = minf(_full.length(), _shown + dt * 60)
		if action: _shown = _full.length()
		_render(); return
	if _queue.is_empty() and _choices != null:
		if left or right:
			if on_cursor.is_valid(): on_cursor.call()
			_sel = (_sel + (1 if right else (_choices as Array).size() - 1)) % (_choices as Array).size(); _render()
		if action: return _close(_sel)
		if cancel: return _close((_choices as Array).size() - 1)
		return
	if action or cancel:
		if not _queue.is_empty(): _next()
		else: _close(0)

func _close(v: int) -> void:
	active = false; _ui.msg_panel.visible = false
	closed.emit(v, _gen)
