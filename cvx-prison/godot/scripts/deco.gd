class_name Deco
extends Control
## Panels of the status screen (the CSS boxes of invscreen.ts drawn with gradients and bevelled borders).

var style := "olive"
var text := ""
var font: Font
var font_size := 16
var text_color := Color.WHITE
var sel := false
var on := false
var bg := Color(0, 0, 0, 0)
var no_top := false

static func _grad(c: CanvasItem, r: Rect2, stops: Array) -> void:
	# stops: [[t, Color], ...] vertical
	for i in stops.size() - 1:
		var y0: float = r.position.y + r.size.y * stops[i][0]
		var y1: float = r.position.y + r.size.y * stops[i + 1][0]
		var c0: Color = stops[i][1]; var c1: Color = stops[i + 1][1]
		c.draw_polygon(PackedVector2Array([Vector2(r.position.x, y0), Vector2(r.end.x, y0), Vector2(r.end.x, y1), Vector2(r.position.x, y1)]), PackedColorArray([c0, c0, c1, c1]))

static func _bevel(c: CanvasItem, r: Rect2, w: float, top: Color, right: Color, bottom: Color, left: Color, skip_top := false) -> void:
	if not skip_top: c.draw_rect(Rect2(r.position, Vector2(r.size.x, w)), top)
	c.draw_rect(Rect2(Vector2(r.end.x - w, r.position.y), Vector2(w, r.size.y)), right)
	c.draw_rect(Rect2(Vector2(r.position.x, r.end.y - w), Vector2(r.size.x, w)), bottom)
	c.draw_rect(Rect2(r.position, Vector2(w, r.size.y)), left)

func _centered(r: Rect2, col: Color, shadow := false) -> void:
	if text == "" or font == null:
		return
	var sz := font.get_string_size(text, HORIZONTAL_ALIGNMENT_LEFT, -1, font_size)
	var p := Vector2(r.position.x + (r.size.x - sz.x) / 2, r.position.y + (r.size.y + font.get_ascent(font_size) - font.get_descent(font_size)) / 2)
	if shadow: draw_string(font, p + Vector2(1, 1), text, HORIZONTAL_ALIGNMENT_LEFT, -1, font_size, Color.BLACK)
	draw_string(font, p, text, HORIZONTAL_ALIGNMENT_LEFT, -1, font_size, col)

func _draw() -> void:
	var r := Rect2(Vector2.ZERO, size)
	match style:
		"olive":
			_grad(self, r, [[0.0, Color("#b3b08a")], [0.18, Color("#8f8c66")], [0.6, Color("#6f6d4c")], [1.0, Color("#5a583c")]])
			_bevel(self, r, 2, Color("#d6d3b0"), Color("#4b4930"), Color("#3e3c27"), Color("#cfcca8"), no_top)
		"stripes":
			var x := 0.0
			var cols := [Color("#8d8a64"), Color("#6b694a"), Color("#7c7a58")]
			var i := 0
			while x < size.x:
				draw_rect(Rect2(x, 0, minf(2, size.x - x), size.y), cols[i % 3]); x += 2; i += 1
			_bevel(self, r, 2, Color("#cfcca8"), Color("#3e3c27"), Color("#3e3c27"), Color("#cfcca8"))
		"blue":
			_grad(self, r, [[0.0, Color("#0b0b56")], [0.45, Color("#1b1b8c")], [0.7, Color("#12127a")], [1.0, Color("#0a0a58")]])
			_bevel(self, r, 2, Color("#05052a"), Color("#7a7ac8"), Color("#9a9ae0"), Color("#05052a"))
		"bar":
			_grad(self, r, [[0.0, Color("#f0eedc")], [0.35, Color("#c9c6a8")], [0.7, Color("#8f8c70")], [1.0, Color("#bdb99a")]])
			draw_rect(r, Color("#3b3a2a"), false, 1)
			_centered(r, Color("#2a2a22"))
		"btn":
			draw_rect(r.grow(2), Color("#ff8a2e") if sel else Color("#2a2718"))
			_grad(self, r, [[0.0, Color("#5a5338")], [0.5, Color("#3a3424")], [1.0, Color("#2b2618")]])
			_bevel(self, r, 3, Color("#e2dcb0"), Color("#6b6440"), Color("#5a5434"), Color("#d8d2a6"))
			draw_rect(r.grow(-3), Color.BLACK, false, 1)
			_centered(r, Color("#ff8a2e") if on else Color("#cfcfc4"), true)
		"black":
			draw_rect(r.grow(2), Color("#2d2a1a"))
			draw_rect(r, Color.BLACK)
			_bevel(self, r, 3, Color("#cbbf7a"), Color("#6e663c"), Color("#6e663c"), Color("#cbbf7a"))
		"tab":
			draw_rect(r.grow(2), Color.BLACK)
			_grad(self, r, [[0.0, Color("#2a2aa8")], [1.0, Color("#121270")]])
			draw_rect(r, Color("#e8e8ff"), false, 2)
			if font:
				draw_string(font, Vector2(10, (size.y + font.get_ascent(font_size) - font.get_descent(font_size)) / 2), text, HORIZONTAL_ALIGNMENT_LEFT, -1, font_size, Color.WHITE)
			var cy := size.y / 2
			draw_colored_polygon(PackedVector2Array([Vector2(size.x - 13, cy - 7), Vector2(size.x - 4, cy), Vector2(size.x - 13, cy + 7)]), Color("#a0a0c0"))
		"teal":
			draw_rect(r, bg)
			draw_rect(r.grow(1), Color("#005522"), false, 1)
			draw_rect(Rect2(1.5, 1.5, size.x - 3, size.y - 3), Color("#1d9f98"), false, 3)
		"plate":
			draw_rect(r.grow(2), Color.BLACK)
			_grad(self, r, [[0.0, Color("#26265e")], [1.0, Color("#0c0c34")]])
			draw_rect(r, Color("#f2f2f2"), false, 2)
			_centered(r, Color.WHITE)
		"head":
			var y := 0.0
			while y < size.y:
				draw_rect(Rect2(0, y, size.x, 1), Color("#112266")); draw_rect(Rect2(0, y + 1, size.x, 2), Color("#0a0a3c")); y += 3
			if font:
				draw_string(font, Vector2(6, size.y - 2), text, HORIZONTAL_ALIGNMENT_LEFT, -1, font_size, Color("#bbffee"))
		"check":
			draw_rect(r, Color("#03031c"))
			var c := size / 2
			for k in range(12, 0, -1):
				var t := k / 12.0
				var col := Color("#1a1a70").lerp(Color("#03031c"), t)
				var pts := PackedVector2Array()
				for a in 24:
					var ang := TAU * a / 24.0
					pts.append(c + Vector2(cos(ang) * size.x * 0.75 * t, sin(ang) * size.y * 0.75 * t))
				draw_colored_polygon(pts, col)
			_bevel(self, r, 3, Color("#cbbf7a"), Color("#6e663c"), Color("#6e663c"), Color("#cbbf7a"))
		"none":
			pass
