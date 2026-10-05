class_name UIRoot
extends CanvasLayer
## Port of ui.ts: stage overlays (message box, fade, debug HUD, toast) on a 1024x768 (4:3) canvas.

signal msg_closed(v: int)

var fade_rect: ColorRect
var hud: Label
var toast_l: Label
var msg_panel: Panel
var msg_text: Label
var more: Label
var choice_box: HBoxContainer
var serif: Font
var mono: Font
var sans: Font
var _toast_t := 0.0
var _fade_tw: Tween
var base: Control

func _init() -> void:
	layer = 10
	serif = _sys_font(["Times New Roman", "Liberation Serif", "Georgia", "DejaVu Serif", "serif"])
	mono = _sys_font(["Courier New", "Liberation Mono", "DejaVu Sans Mono", "monospace"])
	sans = _sys_font(["Arial", "Liberation Sans", "DejaVu Sans", "sans-serif"])

static func _sys_font(names: Array) -> Font:
	var f := SystemFont.new()
	f.font_names = PackedStringArray(names)
	return f

func _ready() -> void:
	var root := Control.new(); root.mouse_filter = Control.MOUSE_FILTER_IGNORE
	root.size = Vector2(1024, 768)
	add_child(root); base = root
	# message box: left/right 6 %, bottom 5 %, min height 16 %
	msg_panel = Panel.new()
	var sb := StyleBoxFlat.new(); sb.bg_color = Color(0, 0, 0, 0.72); sb.border_width_top = 1; sb.border_color = Color(200 / 255.0, 190 / 255.0, 160 / 255.0, 0.25)
	msg_panel.add_theme_stylebox_override("panel", sb)
	msg_panel.position = Vector2(1024 * 0.06, 768 * (1 - 0.05 - 0.16)); msg_panel.size = Vector2(1024 * 0.88, 768 * 0.16)
	msg_panel.visible = false; msg_panel.mouse_filter = Control.MOUSE_FILTER_IGNORE
	root.add_child(msg_panel)
	msg_text = Label.new(); msg_text.position = Vector2(1024 * 0.88 * 0.04, 768 * 0.16 * 0.12); msg_text.size = Vector2(1024 * 0.88 * 0.92, 768 * 0.16 * 0.8)
	msg_text.add_theme_font_override("font", serif); msg_text.add_theme_font_size_override("font_size", 22)
	msg_text.add_theme_color_override("font_color", Color8(0xe8, 0xe2, 0xd0)); msg_text.add_theme_constant_override("line_spacing", 4)
	msg_text.add_theme_color_override("font_shadow_color", Color(0, 0, 0, 1)); msg_text.add_theme_constant_override("shadow_outline_size", 3)
	msg_panel.add_child(msg_text)
	choice_box = HBoxContainer.new(); choice_box.add_theme_constant_override("separation", 40)
	msg_panel.add_child(choice_box)
	more = Label.new(); more.text = "▼"; more.add_theme_font_size_override("font_size", 14); more.add_theme_color_override("font_color", Color8(0xe8, 0xe2, 0xd0))
	more.position = Vector2(1024 * 0.88 * 0.95, 768 * 0.16 * 0.72); msg_panel.add_child(more)
	hud = Label.new(); hud.position = Vector2(10, 8); hud.add_theme_font_override("font", mono); hud.add_theme_font_size_override("font_size", 12)
	hud.add_theme_color_override("font_color", Color(0.6, 0.67, 0.6, 0.75)); hud.visible = false
	root.add_child(hud)
	toast_l = Label.new(); toast_l.add_theme_font_override("font", sans); toast_l.add_theme_font_size_override("font_size", 14)
	toast_l.add_theme_color_override("font_color", Color8(0xcc, 0xdd, 0xcc))
	var tsb := StyleBoxFlat.new(); tsb.bg_color = Color(0, 0, 0, 0.55); tsb.content_margin_left = 10; tsb.content_margin_right = 10; tsb.content_margin_top = 4; tsb.content_margin_bottom = 4
	toast_l.add_theme_stylebox_override("normal", tsb)
	toast_l.modulate.a = 0; toast_l.position = Vector2(1024 * 0.7, 768 * 0.02)
	root.add_child(toast_l)
	fade_rect = ColorRect.new(); fade_rect.color = Color.BLACK; fade_rect.size = Vector2(1024, 768); fade_rect.modulate.a = 0
	fade_rect.mouse_filter = Control.MOUSE_FILTER_IGNORE
	root.add_child(fade_rect)

## fade to / from black; returns after ms + 20 ms
func fade(on: bool, ms := 450.0) -> void:
	if _fade_tw: _fade_tw.kill()
	_fade_tw = create_tween()
	_fade_tw.tween_property(fade_rect, "modulate:a", 1.0 if on else 0.0, ms / 1000.0)
	await get_tree().create_timer((ms + 20) / 1000.0).timeout

func fade_set(a: float) -> void:
	if _fade_tw: _fade_tw.kill()
	fade_rect.modulate.a = a

func toast(t: String) -> void:
	toast_l.text = t; toast_l.reset_size()
	toast_l.position.x = 1024 * 0.98 - toast_l.size.x
	toast_l.modulate.a = 1; _toast_t = 1.6

func _process(dt: float) -> void:
	if _toast_t > 0:
		_toast_t -= dt
		if _toast_t <= 0:
			create_tween().tween_property(toast_l, "modulate:a", 0.0, 0.3)

## insert a stage layer below the message box (effect 2D layer) or below the fade (status screen)
func add_layer(c: Control, below_msg: bool) -> void:
	base.add_child(c)
	base.move_child(c, msg_panel.get_index() if below_msg else fade_rect.get_index())
