class_name Effects
extends Node3D
## Room effects (port of effects.ts: effect.c / effsub0.c / effsub1.c / effsub5.c of the PS2 decompilation).
## The original O_WRK pool (512 slots, first free slot reused by bhSetEffectTb) runs at 30 Hz in game units
## (1 = 0.1 m); sprites are camera-facing quads batched per texture / blend mode (ImmediateMesh).

const ANG := TAU / 65536.0
const S5 := 0.15625
const S6 := 0.1875
const S7 := 0.21875

static func _nsin(a: float) -> float: return sin(a * ANG)
static func _ncos(a: float) -> float: return cos(a * ANG)
static func _uvs(a: Array) -> Array:
	var r := []
	for e in a: r.append({"u": e[0], "v": e[1], "w": e[2], "h": e[3]})
	return r
static func _grid(u0: float, v0: float, n: int, cols: int, s: float) -> Array:
	var r := []
	for i in n: r.append([u0 + (i % cols) * s, v0 + (i / cols) * s, s, s])
	return r
static func _cells(a: Array) -> Array:
	var r := []
	var i := 0
	while i < a.size():
		r.append([a[i], a[i + 1]]); i += 2
	return r
static func _row(u0: float, v: float, step: float, n: int) -> Array:
	var r := []
	for i in n: r.append_array([u0 + i * step, v])
	return r

const END := [-1, 0, 0, 0]
var HIBANA: Array
var EXP0: Array
var EXP1: Array
const EXP_BANK0 := [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 3, 3, 3]
const EXP_BANK1 := [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
var HIBA2: Array
var KEMU: Array
const KEMU_TEX := [400, 400, 401, 402, 403, 404, 405, 406, 407, 400]
const KCOL := [
	[0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF], [0xD0201010, 0x70302A2A, 0xD0201010, 0x70302A2A], [0xFFE0E0E0, 0xFFA0A0A0, 0xFF808080, 0xFF404040],
	[0xFFC01000, 0xFF900000, 0xFF900000, 0xFF600000], [0xFFA0C090, 0xFF80A070, 0xFF609060, 0xFF506040], [0xFFF0F040, 0xFFD0C030, 0xFFC0B020, 0xFFA09010],
	[0xFF806040, 0xFF706040, 0xFF605030, 0xFF504030], [0xFFC0E0FF, 0xFFB0C0E0, 0xFFA0B0D0, 0xFF80A0B0], [0xD0201010, 0x70302A2A, 0xD0201010, 0x70302A2A],
	[0xFF404040, 0xFF808080, 0xFFA0A0A0, 0xFFE0E0E0],
]
var P0_119: Array
var T0_15: Array
var T1_15: Array
var T2_15: Array
var OIL: Array
var OILH: Array
var SPLASH: Array
var EFF218: Array

func _init_tables() -> void:
	HIBANA = [
		_uvs([[0, 0, .1875, .1875], [.1875, 0, .1875, .1875], [.375, 0, .1875, .1875], [.5625, 0, .1875, .1875], [.75, 0, .1875, .1875], [0, .1875, .1875, .1875], [.1875, .1875, .1875, .1875], END]),
		_uvs([[.375, .1875, .1875, .1875], [.5625, .1875, .1875, .1875], [.75, .1875, .1875, .1875], [0, .375, .1875, .1875], [.1875, .375, .1875, .1875], [.375, .375, .1875, .1875], [.5625, .375, .1875, .1875], END]),
		_uvs([[.75, .375, .1875, .1875], [0, .5625, .1875, .1875], [.1875, .5625, .1875, .1875], [.375, .5625, .1875, .1875], [.5625, .5625, .1875, .1875], [.75, .5625, .1875, .1875], [0, .75, .1875, .1875], END]),
	]
	var head := [[.09375, .15625, .0625, .0625], [0, .125, .09375, .09375], [0, 0, .125, .125], [.125, 0, .15625, .15625], [.28125, 0, .15625, .15625], [.4375, 0, .1875, .1875], [.625, 0, .1875, .1875], [.8125, 0, .1875, .1875], [0, .21875, .1875, .1875], [.1875, .1875, .21875, .21875], [.40625, .1875, .21875, .21875], [.625, .1875, .21875, .21875], [0, .40625, .25, .25], [.25, .40625, .25, .25]]
	EXP0 = _uvs(head + [[.5, .40625, .25, .25], [.75, .40625, .25, .25], [0, .65625, .25, .25], [.25, .65625, .25, .25], [.5, .65625, .25, .25], [.75, .65625, .25, .25], [0, .75, .25, .25], [.25, .75, .25, .25], [.5, .75, .25, .25], [.75, .75, .25, .25], END])
	EXP1 = _uvs(head + [[0, 0, .25, .25], [.25, 0, .25, .25], [.5, 0, .25, .25], [.75, 0, .25, .25], [0, .25, .25, .25], [.25, .25, .25, .25], [.5, .25, .25, .25], [.75, .25, .25, .25], [0, .5, .25, .25], [.25, .5, .25, .25], [.5, .5, .25, .25], [.75, .5, .25, .25], END])
	HIBA2 = [_uvs(_grid(0, 0, 6, 6, .15625) + _grid(0, .15625, 4, 4, .15625) + [END]), _uvs(_grid(0, .3125, 6, 6, .15625) + _grid(0, .46875, 4, 4, .15625) + [END])]
	var g24 := _grid(0, 0, 25, 5, S6).slice(0, 24)
	KEMU = [
		_uvs([[0, 0, .09375, .09375], [.09375, 0, .09375, .09375], [.1875, 0, .09375, .09375], [.28125, 0, .09375, .09375], [.375, 0, .09375, .09375], [.46875, 0, .125, .125], [.59375, 0, .125, .125], [.71875, 0, .125, .125], [.84375, 0, .125, .125], [0, .09375, .125, .125], [.125, .09375, S5, S5], [.28125, .09375, S5, S5], [.4375, .125, S5, S5], [.59375, .125, S5, S5], [.75, .125, S5, S5], [0, .25, S5, S5], [S5, .25, S5, S5], [.3125, .28125, S5, .125], [.46875, .28125, S5, .125], [.625, .28125, .125, .125], END]),
		_uvs([[0, .40625, .125, .125], [.125, .40625, S5, S5], [.28125, .40625, S5, S5], [.4375, .40625, S5, S5], [.59375, .40625, S5, S5], [.75, .40625, S5, S5]] + _grid(0, .5625, 6, 6, S5) + _grid(0, .71875, 6, 6, S5) + [[0, .875, S5, .125], [S5, .875, S5, .125], [.3125, .875, .125, .125], [.4375, .875, .125, .125], END]),
		_uvs(g24 + [END]),
		_uvs(g24 + [END]),
		_uvs(_grid(0, 0, 16, 4, S7) + [END]),
		_uvs([[0, 0, .125, .125], [0, .125, .125, .125], [0, .25, .125, .125], [0, .375, .125, .125], [.125, 0, S6, S6], [.125, S6, S6, S6], [.125, .375, S6, S6], [.125, .5625, S6, S6], [.3125, 0, S7, S7], [.3125, S7, S7, S7], [.3125, .4375, S7, S7], [.3125, .65625, S7, S7], [.53125, 0, S7, S7], [.53125, S7, S7, S7], [.53125, .4375, S7, S7], [.53125, .65625, S7, S7], [.75, 0, S7, S7], [.75, S7, S7, S7], [.75, .4375, S7, S7], [.75, .65625, S7, S7], END]),
		_uvs([[0, 0, S5, S5], [S5, 0, S5, S5], [.3125, 0, S5, S5], [.46875, 0, S6, S6], [.65625, 0, S6, S6], [0, S5, S7, S7], [S7, S5, S7, S7], [.4375, S6, S7, S7], [.65625, S6, S7, S7], [0, .375, S7, S7], [S7, .375, S7, S7], [.4375, .40625, S7, S7], [.65625, .40625, S7, S7], [0, .59375, S7, S7], [S7, .59375, S7, S7], [.4375, .625, S7, S7], [.65625, .625, S7, S7], END]),
		_uvs([[0, 0, S5, S5], [S5, 0, S5, S5], [.3125, 0, S5, S5], [.46875, 0, S6, S6], [.65625, 0, S6, S6], [0, S5, S7, S7], [S7, S5, S7, S7], [.4375, S6, S7, S7], [.65625, S6, S7, S7], [0, .375, .25, .25], [.25, .40625, .25, .25], [.5, .40625, .25, .25], [0, .625, .25, .25], [.25, .65625, .25, .25], [.5, .65625, .25, .25], [.75, .40625, S7, S7], END]),
		_uvs(_grid(0, 0, 5, 5, S6) + [[0, S6, S7, S7], [S7, S6, S7, S7], [.4375, S6, S7, S7], [.65625, S6, S7, S7], [0, .40625, S7, S7], [S7, .40625, S7, S7], [.4375, .40625, S7, S7], [.65625, .40625, S7, S7], [0, .625, S7, S7], [S7, .625, S7, S7], [.4375, .625, S7, S7], [.65625, .625, S7, S7], END]),
	]
	KEMU.append(KEMU[0])
	P0_119 = _uvs([[0, 0, .0625, .0625], [0, .0625, .0625, .0625], [.0625, 0, .09375, .09375], [.15625, 0, .125, .125], [.28125, 0, .125, .125], [.40625, 0, S6, S6], [.59375, 0, S6, S6], [.78125, 0, S6, S6], [0, .125, S7, S7], [0, .34375, .25, .25], [.25, .34375, .25, .25], [.5, .34375, .25, .25], [.75, .34375, .25, .25], [0, .59375, .25, .25], [.25, .59375, .25, .25], END])
	T0_15 = _uvs(_grid(0, 0, 10, 4, .25) + [END])
	T1_15 = _uvs([[.5, .5, .25, .125], [.75, .5, .25, .125], [.5, .625, .25, .125], [.75, .625, .25, .125], END])
	T2_15 = _uvs([[.09375, .90625, .125, .09375], [.21875, .84375, .125, S5], [.34375, .8125, .125, S6], [.46875, .6875, .125, .3125], [.59375, .625, S6, .375], [.78125, .5625, S7, .4375], [0, .53125, S6, .375], [S6, .53125, S5, .28125], [.34375, .53125, .125, .25], [.46875, .53125, .125, S5], [.59375, .53125, .125, .09375], END])
	OIL = _uvs([[.375, .375, S6, S6], [.5625, .375, S6, S6], [0, .5625, S6, S6], [S6, .5625, S6, S6], [.375, .5625, S6, S6], [.5625, .5625, S6, S6], [0, .75, S6, S6], [S6, .75, S6, S6], END])
	OILH = _uvs([[.375, .75, S6, .09375], [.5625, .75, S6, .09375], [.375, .84375, S6, .09375], [.5625, .84375, S6, .09375], END])
	SPLASH = _uvs([[0, 0, .109375, .09375], [.109375, 0, .109375, .09375], [.21875, 0, .109375, .09375], [.328125, 0, .109375, .09375], [.4375, 0, .109375, .09375], END])
	var F13 := _cells(_row(0, 0, 40, 6) + _row(0, 40, 40, 4)); var F16 := _cells(_row(0, 80, 40, 6) + _row(0, 120, 40, 6)); var F14 := _cells(_row(0, 160, 40, 6) + _row(0, 200, 40, 6))
	var F02 := _cells(_row(0, 0, 56, 4) + _row(0, 56, 56, 4)); var F04 := _cells(_row(0, 112, 24, 10)); var F07 := _cells(_row(0, 136, 48, 5) + _row(0, 184, 48, 5))
	var F06 := _cells(_row(0, 112, 48, 5) + _row(0, 168, 48, 5)); var F08 := _cells(_row(0, 0, 48, 5) + _row(0, 48, 48, 5)); var F05 := _cells(_row(0, 96, 48, 5) + _row(0, 144, 48, 5))
	var F09 := _cells(_row(0, 0, 56, 4) + _row(0, 56, 56, 4) + _row(0, 112, 56, 2)); var F11 := _cells(_row(0, 0, 56, 4) + _row(0, 56, 56, 4) + _row(0, 112, 56, 4))
	var F12 := _cells(_row(0, 0, 32, 7) + _row(0, 32, 32, 7)); var F00 := _cells(_row(0, 64, 56, 4) + _row(0, 120, 56, 4)); var F15 := _cells(_row(0, 0, 40, 6) + _row(0, 40, 40, 6))
	EFF218 = [
		[70, F13, 40, 40], [70, F16, 40, 40], [70, F14, 40, 40], [71, F02, 56, 56], [71, F04, 24, 24], [71, F07, 48, 48], [72, F02, 56, 56], [72, F06, 48, 56],
		[73, F08, 48, 48], [73, F05, 48, 48], [74, F09, 56, 56], [75, F13, 40, 40], [76, F08, 48, 48], [77, F11, 56, 56], [78, F12, 32, 32], [78, F00, 56, 56], [79, F15, 40, 40],
	]

## O_WRK
class O:
	var flg := 0
	var stflg := 0
	var id := 0
	var type := 0
	var mode0 := 0
	var mode1 := 0
	var mdlver := 0
	var flr := 0
	var ct0 := 0
	var ct1 := 0
	var ct2 := 0
	var ct3 := 0
	var px := 0.0
	var py := 0.0
	var pz := 0.0
	var sx := 0.0
	var sy := 0.0
	var sz := 0.0
	var sxb := 0.0
	var syb := 0.0
	var szb := 0.0
	var ax := 0.0
	var ay := 0.0
	var az := 0.0
	var xn := 0.0
	var yn := 0.0
	var zn := 0.0
	var spd := 0.0
	var aox := 0.0
	var aoy := 0.0
	var aoz := 0.0
	var axp := 0.0
	var ayp := 0.0
	var azp := 0.0
	var gpx := 0.0
	var gpy := 0.0
	var gpz := 0.0
	var tex := -1
	var ani := 0
	var bls := 8
	var bld := 6
	var tv: Array = []   # 4 x {x, y, u, v, col}
	var exp: Variant = null
	var er: Variant = null
	var fn := 0
	var lkono := 0
	func reset() -> void:
		flg = 0; stflg = 0; id = 0; type = 0; mode0 = 0; mode1 = 0; mdlver = 0; flr = 0; ct0 = 0; ct1 = 0; ct2 = 0; ct3 = 0
		px = 0; py = 0; pz = 0; sx = 0; sy = 0; sz = 0; sxb = 0; syb = 0; szb = 0; ax = 0; ay = 0; az = 0; xn = 0; yn = 0; zn = 0; spd = 0
		aox = 0; aoy = 0; aoz = 0; axp = 0; ayp = 0; azp = 0; gpx = 0; gpy = 0; gpz = 0; tex = -1; ani = 0; bls = 8; bld = 6
		tv = [{"x": -1.0, "y": -1.0, "u": 0.0, "v": 0.0, "col": 0}, {"x": 1.0, "y": -1.0, "u": 1.0, "v": 0.0, "col": 0}, {"x": -1.0, "y": 1.0, "u": 0.0, "v": 1.0, "col": 0}, {"x": 1.0, "y": 1.0, "u": 1.0, "v": 1.0, "col": 0}]
		exp = null; er = null; fn = 0; lkono = 0
	func _init() -> void:
		reset()

var eff: Array[O] = []
var _trs: Array = []
var _fnc: Array = []
var _trs2d: Array = []
## bhEff102 wind
var windr := 0
var winds := 0.0
## camera shake offset (game units)
var of := [0.0, 0.0, 0.0]
## room floor ATR list (bhCheckFloorEffect) in metres
var floors: Array = []
var _cam_pos := Vector3.ZERO
var _cam_dir := Vector3.FORWARD
var _tex := {}
var _index: Variant = null
var _batches := {}
var _rain: MeshInstance3D
var _cam_fov := 60.0
var _rain_mesh: ImmediateMesh
var unknown := {}
## 2D layer (640x480 of the original) for bhEff2D sprites and the bhDraw021 cinema bars
var layer: Control
var _l2d := {}
var _bars: TextureRect = null
var _shaders := {}

func _init() -> void:
	_init_tables()
	for i in 512:
		eff.append(O.new())
	_rain_mesh = ImmediateMesh.new()
	_rain = MeshInstance3D.new(); _rain.mesh = _rain_mesh
	_rain.material_override = _material(null, 8, 10)
	_rain.visible = false
	add_child(_rain)
	layer = Control.new()
	layer.size = Vector2(1024, 768)
	layer.mouse_filter = Control.MOUSE_FILTER_IGNORE
	layer.clip_contents = true

## sprite material: texture * vertex colour (8-bit scale of the GS: 0x80 = 1.0), original blend modes
func _material(tex: Texture2D, bls: int, bld: int, lines := false) -> ShaderMaterial:
	# GS alpha: 8/6, 8/3 = (Cs-Cd)As+Cd; 8/10 = Cs*As+Cd; 11/3 = Cd(1-As)
	var mode := "mix"
	if bld == 10: mode = "add"
	elif bls == 11: mode = "sub"
	var key := mode + ("L" if lines else "")
	var sh: Shader = _shaders.get(key)
	if sh == null:
		var rm := "unshaded, cull_disabled, depth_draw_never, "
		rm += "blend_add" if mode == "add" else ("blend_premul_alpha" if mode == "sub" else "blend_mix")
		var c := "shader_type spatial;\nrender_mode %s;\n" % rm
		c += "uniform sampler2D tex : filter_linear, repeat_disable;\nuniform bool has_tex = true;\n"
		c += "vec3 s2l(vec3 c) { return clamp(c, 0.0, 1.0); }\n"
		c += "void fragment() {\n\tvec4 t = has_tex ? texture(tex, UV) : vec4(1.0);\n\tvec4 c = t * COLOR;\n"
		if mode == "sub":
			c += "\tALBEDO = vec3(0.0); ALPHA = clamp(c.a, 0.0, 1.0);\n"
		else:
			c += "\tALBEDO = s2l(c.rgb); ALPHA = clamp(c.a, 0.0, 1.0);\n"
		c += "}\n"
		sh = Shader.new(); sh.code = c; _shaders[key] = sh
	var m := ShaderMaterial.new(); m.shader = sh
	m.set_shader_parameter("has_tex", tex != null)
	if tex: m.set_shader_parameter("tex", tex)
	return m

## bhClearEffect + the room's EF table (bhSetEffectTb for every record; efid[i] = slot i)
func load_room(room_id: String, scene_recs: Variant = null) -> void:
	for o in eff: o.flg = 0
	of = [0.0, 0.0, 0.0]; windr = 0; winds = 0.0
	# the Effects nodes of scenes/rooms/ID.tscn, otherwise assets/eft/ID.json
	var recs: Array = scene_recs if scene_recs is Array else Assets.json("eft/%s.json" % room_id, [])
	for r in recs:
		var i := _set_tb({"flg": int(r.flg), "id": int(r.id), "type": int(r.type), "flr": int(r.get("flr", 0)), "mdlver": int(r.get("mdlver", 0)), "px": r.p[0], "py": r.p[1], "pz": r.p[2], "sx": r.s[0], "sy": r.s[1], "sz": r.s[2], "ax": r.ax, "ay": r.ay})
		var lk: String = r.get("lk", "")
		if i >= 0 and lk.length() >= 24:
			var v := lk.substr(16, 8).hex_to_int()
			if v >= 0x80000000: v -= 0x100000000
			eff[i].lkono = v
	if _index == null:
		_index = Assets.json("effects/index.json", {})
	for r in recs:
		var id := int(r.id)
		if id < 100 or id >= 400:
			var tid := int(r.type) if id == 20 else id
			for k in int(_index.get(str(tid), 0)):
				_texture(tid, k)
	for k in _l2d.keys():
		_l2d[k].queue_free()
	_l2d.clear()

func _texture(id: int, k: int) -> Texture2D:
	var key := "ef_%s_%d" % [U.pad(id, 3), k]
	if _tex.has(key):
		return _tex[key]
	var t: Texture2D = null
	if _index != null and k < int(_index.get(str(id), 0)):
		t = Assets.texture("effects/%s.png" % key)
	_tex[key] = t
	return t

## WORK 4 n + POS: the event script moves an effect work (game units)
func set_pos(i: int, x: float, y: float, z: float) -> void:
	var o := eff[i]; o.px = x; o.py = y; o.pz = z
func disp(i: int, on: int) -> void:
	if on == 0: eff[i].stflg |= 0x1000000
	else: eff[i].stflg &= ~0x1000000
func mode(i: int, v: int) -> void:
	eff[i].mode1 = v
func yure(kind: int, v: int) -> void:
	if kind == 0: of = [0.01 * v * randf(), 0.01 * v * randf(), 0.01 * v * randf()]
	else: of = [0.0, 0.0, 0.0]

func _set_tb(e: Dictionary) -> int:
	for i in 512:
		var o := eff[i]
		if o.flg & 3:
			continue
		o.reset()
		o.flg = int(e.flg); o.id = int(e.id); o.type = int(e.type); o.tex = -1; o.mdlver = int(e.get("mdlver", 0)); o.flr = int(e.get("flr", 0))
		o.px = e.px; o.py = e.py; o.pz = e.pz; o.sx = e.sx; o.sxb = e.sx; o.sy = e.sy; o.syb = e.sy; o.sz = e.sz; o.szb = e.sz; o.ax = e.ax; o.ay = e.ay; o.az = 0
		return i
	return -1

func _setentry(id: int, type: int, op: O) -> int:
	return _set_tb({"flg": 0x04100001, "id": id, "type": type, "px": op.px, "py": op.py, "pz": op.pz, "sx": op.sx, "sy": op.sy, "sz": op.sz, "ax": op.ax, "ay": op.ay})

func _effinit(op: O) -> void:
	op.flg |= 0x04100000
	var t := op.tv
	t[0].x = -1.0; t[0].y = -1.0; t[1].x = 1.0; t[1].y = -1.0; t[2].x = -1.0; t[2].y = 1.0; t[3].x = 1.0; t[3].y = 1.0
	for v in t: v.col = 0xFFFFFFFF
	op.bls = 8; op.bld = 6; op.ani = 0; op.ct1 = 0; op.ct0 = 0; op.sxb = op.sx; op.syb = op.sy; op.spd = 0; op.xn = 0; op.yn = 0; op.zn = 0

func _effset(op: O, uv: Dictionary, num: int) -> void:
	op.sx = 4 * op.sxb * uv.w; op.sy = 4 * op.syb * uv.h
	var c: Array = KCOL[num]
	for i in 4: op.tv[i].col = c[i]
	_uv4(op, uv.u, uv.v, uv.u + uv.w, uv.v + uv.h)

func _uv4(op: O, u0: float, v0: float, u1: float, v1: float) -> void:
	var t := op.tv
	t[0].u = u0; t[2].u = u0; t[1].u = u1; t[3].u = u1; t[0].v = v0; t[1].v = v0; t[2].v = v1; t[3].v = v1

## njUnitMatrix; njRotateXYZ(ax, ay, 0); njCalcVector((0,0,z))
func _dir(ax: float, ay: float, z: float) -> Vector3:
	return Basis.from_euler(Vector3(ax * ANG, ay * ANG, 0), EULER_ORDER_ZYX) * Vector3(0, 0, z)

## bhEff2D: screen-space textured quad, texture set `type`, page lkono
func _e2d(op: O) -> void:
	if op.mode0 == 0:
		op.flg |= 0x1000000; op.tex = op.type; op.ani = op.lkono; op.px = 0; op.py = 0; op.pz = 0; _uv4(op, 0, 0, 1, 1)
		for t in op.tv: t.col = 0xFFE0E0E0
		op.bls = 8; op.bld = 6; op.mode0 = 1; return
	if op.mode1 == 0:
		op.flg |= 0x1000000; return
	op.flg &= ~0x1000000; _trs2d.append(op)

## bhEff021: cinema bars while mode1 != 0
func _e021(op: O) -> void:
	if op.mode1 != 0:
		op.fn = 21; _fnc.append(op)
	else:
		op.flg |= 0x1000000

## draw the 2D layer (640x480 coordinates scaled to the stage)
func draw_2d() -> void:
	var sz := layer.size
	if sz.x <= 0:
		sz = Vector2(1024, 768)
	var seen := {}
	for op in _trs2d:
		if op.stflg & 0x1000000:
			continue
		var i := eff.find(op); seen[i] = true
		var el: TextureRect = _l2d.get(i)
		var key := "ef_%s_%d" % [U.pad(op.tex, 3), op.ani]
		var src := "effects/%s_ru.png" % key if Text.LANG == "ru" else "effects/%s.png" % key
		if el == null:
			el = TextureRect.new(); el.expand_mode = TextureRect.EXPAND_IGNORE_SIZE; el.stretch_mode = TextureRect.STRETCH_SCALE
			el.mouse_filter = Control.MOUSE_FILTER_IGNORE
			# vertex colour 0xFFE0E0E0 modulates the texture (0xE0 -> 0.88)
			el.modulate = Color(0.88, 0.88, 0.88, 1)
			layer.add_child(el); _l2d[i] = el
		if el.get_meta("src", "") != src:
			el.set_meta("src", src)
			var t := Assets.texture(src)
			if t == null: t = Assets.texture("effects/%s.png" % key)
			el.texture = t
		var w: float = (op.sx / 4) * 512 * (op.tv[1].u - op.tv[0].u)
		var h: float = (op.sy / 4) * 512 * (op.tv[2].v - op.tv[0].v)
		el.position = Vector2(op.px / 640.0 * sz.x, op.py / 480.0 * sz.y)
		el.size = Vector2(w / 640.0 * sz.x, h / 480.0 * sz.y)
		el.visible = true
	for i in _l2d.keys():
		if not seen.has(i): _l2d[i].visible = false
	var bars_on := false
	for o in _fnc:
		if o.fn == 21: bars_on = true
	if bars_on and _bars == null:
		var g := Gradient.new()
		g.offsets = PackedFloat32Array([0.0, 0.08333, 0.21667, 0.78333, 0.91667, 1.0])
		g.colors = PackedColorArray([Color.BLACK, Color.BLACK, Color(0, 0, 0, 0), Color(0, 0, 0, 0), Color.BLACK, Color.BLACK])
		var gt := GradientTexture2D.new(); gt.gradient = g; gt.fill_from = Vector2(0, 0); gt.fill_to = Vector2(0, 1); gt.width = 4; gt.height = 256
		_bars = TextureRect.new(); _bars.texture = gt; _bars.expand_mode = TextureRect.EXPAND_IGNORE_SIZE; _bars.stretch_mode = TextureRect.STRETCH_SCALE
		_bars.size = Vector2(1024, 768); _bars.mouse_filter = Control.MOUSE_FILTER_IGNORE
		layer.add_child(_bars)
	if _bars: _bars.visible = bars_on

## bhControlEffect: one 30 Hz frame
func update(camera: Camera3D) -> void:
	_cam_pos = camera.global_position * 10.0
	_cam_fov = camera.fov
	_cam_dir = -camera.global_transform.basis.z
	for op in _fnc:
		if op.fn == 107:
			for e in op.er: e.ay += 1
	_trs.clear(); _fnc.clear(); _trs2d.clear()
	for i in 512:
		var op := eff[i]
		if not (op.flg & 1) or (op.stflg & 0x1000000):
			continue
		if op.id >= 400:
			op.flg = 0; continue
		_run(op)

func _run(op: O) -> void:
	match op.id:
		15: _e015(op)
		20: _e2d(op)
		21: _e021(op)
		32, 36, 39, 52, 54, 59, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 31, 33, 34, 35, 41, 45: op.flg = 0
		100: _e100(op)
		101: _e101(op)
		102: _e102(op)
		103: _e103(op)
		106: op.flg = 0
		107: _e107(op)
		116: _e116(op)
		119: _e119(op)
		154: _e154(op)
		155: _e155(op)
		158: _e158(op)
		159: _e159(op)
		164: _e164(op)
		165: _e165(op)
		179: _e179(op)
		180: _e180(op)
		181: _e181(op)
		182: _e182(op)
		201: _e201(op)
		218: _e218(op)
		_:
			# not ported (camera filters 90..99, other rooms' effects): left alive but not drawn
			if not unknown.has(op.id):
				unknown[op.id] = true; print("effect id ", op.id, " not ported")
			op.flg |= 0x1000000

func _rnd_drop(dist: float) -> Dictionary:
	return {"px": _cam_pos.x + dist * _cam_dir.x + (80 * randf() - 40), "py": 80 * randf(), "pz": _cam_pos.z + dist * _cam_dir.z + (80 * randf() - 40), "ax": 0.0, "ay": 0.0}

# ---- rain / wind (effsub1.c)
func _e100(op: O) -> void:
	op.flg |= 0x1000000
	if op.stflg & 0x1000000:
		op.flg = 0; return
	if op.mode0 == 0:
		op.fn = 106; op.er = []
		for i in 77: op.er.append(_rnd_drop(30))
		op.mode0 = 1; return
	for e in op.er:
		e.ax = 182.04445 * (25 * winds)
		e.px -= winds * _nsin(e.ay); e.pz -= winds * _ncos(e.ay); e.py -= 5
		if e.py < 0:
			var n := _rnd_drop(30)
			e.ay = windr; e.px = n.px; e.py = 80; e.pz = n.pz
	_fnc.append(op)

func _e101(op: O) -> void:
	op.flg |= 0x1000000
	if op.stflg & 0x1000000:
		op.flg = 0; return
	_set_tb({"flg": 1, "id": 107, "type": 0, "px": 0, "py": 0, "pz": 0, "sx": op.sx, "sy": op.sy, "sz": op.sz, "ax": 0, "ay": 0})

func _e102(op: O) -> void:
	op.flg |= 0x1000000
	if op.lkono != 0:
		windr = windr + (int(182.04445 * (op.sz * randf() - 0.5 * op.sz)) & 0xffff)
	else:
		windr = int(op.ay) + (int(182.04445 * (20 * _nsin(op.ct0))) & 0xffff)
	winds = op.sx + op.sy * _nsin(op.ct0)
	op.ct0 = (op.ct0 + op.type * 256) & 0xffff

func _e107(op: O) -> void:
	if op.mode0 == 0:
		op.fn = 107; op.er = []
		for i in 8:
			var px := _cam_pos.x + 40 * _cam_dir.x + (80 * randf() - 40); var pz := _cam_pos.z + 40 * _cam_dir.z + (80 * randf() - 40)
			var hp: Variant = null
			for f in floors:
				if (f.flg & 1) and f.type == 3 and f.flr == 0 and f.x * 10 <= px and (f.x + f.w) * 10 >= px and f.z * 10 <= pz and (f.z + f.d) * 10 >= pz:
					hp = f; break
			op.er.append({"px": px, "py": 0.1, "pz": pz, "ax": 0 if (hp != null and int(hp.prm[0]) == 0) else 1, "ay": 0})
		op.mode0 = 1; op.ct0 = 0; return
	op.ct0 += 1
	if op.ct0 > 4:
		op.flg = 0; return
	_fnc.append(op)

func _e103(op: O) -> void:
	op.flg |= 0x1000000
	match op.type:
		0:
			if randf() < 0.3:
				_set_tb({"flg": 0x100001, "id": 10, "type": 1, "px": op.px + 3 * randf() - 1.5, "py": op.py + 3 * randf() - 1.5, "pz": op.pz + 3 * randf() - 1.5, "sx": op.sx, "sy": op.sy, "sz": op.sz, "ax": 0, "ay": 0})
		1:
			op.ct0 = (op.ct0 + 1) & 3
			if op.ct0 == 0:
				_set_tb({"flg": 0x4100001, "id": 119, "type": 0, "px": op.px, "py": op.py, "pz": op.pz, "sx": op.sx, "sy": op.sy, "sz": op.sz, "ax": 0, "ay": op.ay + int(2048 * _nsin(op.ct1))})
				op.ct1 += 2048
		2:
			op.ct0 = (op.ct0 + 1) & 1
			if op.ct0 == 0:
				_set_tb({"flg": 0x4100001, "id": 119, "type": 1, "px": op.px, "py": op.py, "pz": op.pz, "sx": op.sx, "sy": op.sy, "sz": op.sz, "ax": 0, "ay": 0})

func _e116(op: O) -> void:
	op.flg |= 0x1000000
	op.ct3 = (op.ct3 + 1) & 3
	if op.ct3 != 0:
		return
	if op.type == 0:
		_set_tb({"flg": 0x4100001, "id": 15, "type": 5, "mdlver": op.ct3 & 7, "px": op.px, "py": op.py, "pz": op.pz, "sx": op.sx, "sy": op.sy, "sz": op.sz, "ax": 0, "ay": op.ay})

func _e015(op: O) -> void:
	var t := op.tv
	if op.mode0 == 0:
		op.flg = 0x4100001; op.tex = 33
		for v in t: v.col = 0xA0FFFFFF
		op.bls = 8; op.bld = 6; op.ani = 0
		match op.type:
			0: op.xn = 0.7; op.yn = 0.2; op.exp = T0_15
			1: op.exp = T1_15
			2:
				op.tex = 34; op.bls = 8; op.bld = 10
				t[0].x = -1.0; t[0].y = -2.0; t[1].x = 1.0; t[1].y = -2.0; t[2].x = -1.0; t[2].y = 0.0; t[3].x = 1.0; t[3].y = 0.0
				op.exp = T2_15
			3: op.tex = 31; op.xn = 0.4; op.yn = 0.3; op.exp = T0_15
			4: op.tex = 31; op.exp = T1_15
			5:
				op.tex = 36; op.gpx = op.px; op.gpy = op.py; op.gpz = op.pz; op.xn = op.sz; op.yn = op.sy; op.sxb = op.sx; op.sy = op.sx; op.syb = op.sx; op.sz = op.sx; op.szb = op.sx; op.ct1 = op.mdlver; op.exp = OIL
			6: op.tex = 36; op.exp = OILH
		op.ct0 = 0; op.mode0 = 1
	if op.type == 2:
		if op.flr > 0:
			op.flg |= 0x1000000; op.flr -= 1; return
		op.flg &= ~0x1000000
	var uv: Dictionary = op.exp[op.ct0]
	if uv.u == -1:
		if op.type == 5:
			op.ct0 = 0; uv = op.exp[0]
		else:
			op.flg = 0
			if op.type == 0 or op.type == 3:
				_set_tb({"flg": 0x4100001, "id": 15, "type": op.type + 1, "mdlver": 0, "sx": 2, "sy": 2, "sz": 2, "px": op.px + 2 * randf() - 1, "py": op.py, "pz": op.pz + 2 * randf() - 1, "ax": 0, "ay": 0})
			return
	if op.type == 2:
		op.sx = 8 * op.sxb * uv.w; op.sy = 8 * op.syb * uv.h
	_uv4(op, uv.u, uv.v, uv.u + uv.w, uv.v + uv.h)
	match op.type:
		0, 3:
			op.sx += 0.1; op.sy += 0.1; op.px -= op.xn * _nsin(op.ay); op.pz -= op.xn * _ncos(op.ay); op.py += op.yn; op.xn -= 0.07 * op.xn; op.yn -= 0.15
		5:
			var xn := op.xn * -_nsin(op.ct1)
			op.px = op.gpx + xn * _nsin(op.ay); op.pz = op.gpz + xn * _ncos(op.ay); op.py = op.gpy + op.yn * _ncos(op.ct1)
			op.sx += 0.001; op.ct1 += 512
			if op.ct1 >= 16384:
				op.flg = 0
				_set_tb({"flg": 0x4100001, "id": 15, "type": op.type + 1, "mdlver": 0, "sx": 1.2 * op.sx, "sy": 1.2 * op.sy, "sz": 1.2 * op.sz, "px": op.px + randf() - 0.5, "py": op.py, "pz": op.pz + randf() - 0.5, "ax": 0, "ay": 0})
				return
	op.ct0 += 1
	_trs.append(op)

func _e119(op: O) -> void:
	var t := op.tv
	if op.mode0 == 0:
		op.tex = 39; op.flg |= 0x4100000
		for v in t: v.col = 0xFFFFFFFF
		op.bls = 11; op.bld = 3; op.gpy = op.py; op.ani = 0; op.ct0 = 0
		op.xn = 0.4 * randf() - 0.2; op.zn = 0.4 * randf() - 0.2
		if op.type == 0:
			for v in t: v.col = 0xC0FFFFFF
			op.ct2 = 192; op.exp = P0_119; op.spd = 0.1 * op.sz
		elif op.type == 1:
			op.exp = P0_119.slice(5)
		op.mode0 = 1
	var uv: Dictionary = op.exp[op.ct0]
	if uv.u == -1:
		op.flg = 0; return
	if op.type == 0:
		for v in t: v.col = ((op.ct2 << 24) | 0xFFFFFF) & 0xFFFFFFFF
		op.spd *= 0.9; op.px -= op.spd * _nsin(op.ay); op.pz -= op.spd * _ncos(op.ay); op.py += 0.5; op.ct2 -= 8
	elif op.type == 1:
		op.px += op.xn; op.pz += op.zn; op.py = op.gpy + op.sz * _nsin(op.ct0 * 1024)
		op.sx = 8 * op.sxb * uv.w; op.sy = 8 * op.syb * uv.h
	_uv4(op, uv.u, uv.v, uv.u + uv.w, uv.v + uv.h)
	op.ct0 += 1
	_trs.append(op)

# ---- sparks / explosion / smoke (effsub0.c)
func _e154(op: O) -> void:
	op.flg |= 0x1000000
	if op.type == 0 and op.mode1 != 0: op.type = op.mode1
	if op.type != 0:
		if op.ct1 < 1 or op.ct1 > 7:
			if op.ct0 == 1: op.ct0 = 2 if randf() >= 0.5 else 0
			elif op.ct0 == 2: op.ct0 = 1 if randf() >= 0.5 else 0
			else: op.ct0 = 2 if randf() >= 0.5 else 1
			_setentry(155, op.ct0, op); op.mode1 = 0; op.ct1 = 7
		op.ct1 -= 1

func _e155(op: O) -> void:
	if op.mode0 == 0:
		op.tex = 52; _effinit(op); op.exp = HIBANA[1 if op.type == 1 else (2 if op.type == 2 else 0)]; op.mode0 = 1
	_seq(op, 0)

func _seq(op: O, num: int) -> void:
	var uv: Dictionary = op.exp[op.ct0]
	if uv.u == -1:
		op.flg = 0; return
	_effset(op, uv, num); op.ct0 += 1; _trs.append(op)

func _e158(op: O) -> void:
	op.flg |= 0x1000000
	if op.type == 0 and op.mode1 != 0: op.type = op.mode1
	if op.type != 0:
		_setentry(159, 1 if op.type == 2 else 0, op); op.mode1 = 0; op.type = 0

func _e159(op: O) -> void:
	if op.mode0 == 0:
		op.tex = 54; _effinit(op)
		if op.type == 1: op.exp = EXP1
		elif op.type == 2:
			op.exp = EXP0; op.type -= 2
			op.xn = op.sz * (randf() - 0.5) / 8; op.yn = op.sz * (randf() - 0.5) / 8; op.zn = op.sz * (randf() - 0.5) / 8
		else:
			op.exp = EXP0; op.type = 0
		op.mode0 = 1
	var uv: Dictionary = op.exp[op.ct0]
	if uv.u == -1:
		op.flg = 0; return
	var bank: Array = EXP_BANK1 if op.type == 1 else EXP_BANK0
	op.ani = bank[op.ct0] if op.ct0 < bank.size() else 0
	op.px += op.xn; op.py += op.yn; op.pz += op.zn
	_effset(op, uv, 0); op.ct0 += 1; _trs.append(op)

func _e164(op: O) -> void:
	op.flg |= 0x1000000
	if op.type == 0 and op.mode1 != 0:
		op.type = op.mode1; op.mode1 = 0
	if op.type != 0 and op.ct0 == 0: op.ct0 = op.type & 0xffff
	if op.ct0 != 0:
		_setentry(159, 2, op); op.ct0 -= 1
		if op.ct0 == 0: op.type = 0

func _e165(op: O) -> void:
	op.flg |= 0x1000000
	if op.type == 0 and op.mode1 != 0:
		op.type = op.mode1 & 0xff; op.mode1 = 0
	if op.type != 0 and op.ct0 == 0:
		op.ct0 = op.type * 2
		var v := _dir(op.ax, op.ay, op.sz); op.xn = v.x; op.yn = v.y; op.zn = v.z; op.spd = 0
		op.aox = op.px; op.aoy = op.py; op.aoz = op.pz; op.axp = op.ax; op.ayp = op.ay; op.azp = op.az
	if op.ct0 != 0:
		if not (op.ct0 & 1): _setentry(159, 1, op)
		op.px += op.xn; op.py += op.yn; op.pz += op.zn; op.py += op.spd; op.spd -= 0.05
		# bhCheckWallRefAngle (wall reflection) is not ported
		var v := _dir(op.ax, op.ay, op.sz); op.xn = v.x; op.yn = v.y; op.zn = v.z
		var gy := 0.0  # bhGetGroundPosition: flat ground at y = 0
		if gy >= op.py:
			if op.yn < 0:
				op.spd = 2 * -op.yn; op.yn = 0
			else:
				op.yn = -(op.yn + op.spd); op.spd = 0
		op.ct0 -= 1
		if op.ct0 == 0:
			op.type = 0; op.px = op.aox; op.py = op.aoy; op.pz = op.aoz; op.ax = op.axp; op.ay = op.ayp; op.az = op.azp

func _e179(op: O) -> void:
	op.flg |= 0x1000000
	if op.type == 0 and op.mode1 != 0: op.type = op.mode1
	if op.type != 0:
		if not op.sz:
			_setentry(180, op.type - 1, op); op.mode1 = 0; op.type = 0; return
		if op.ct1 <= 0:
			_setentry(180, op.type - 1, op); op.ct1 = int(op.sz)
		op.ct1 -= 1

func _e180(op: O) -> void:
	if op.mode0 == 0:
		op.tex = 408; _effinit(op)
		if op.type == 1:
			op.exp = HIBA2[1]; op.ani = 1
		else:
			op.exp = HIBA2[0]
		op.mode0 = 1
	_seq(op, 0)

func _e181(op: O) -> void:
	op.flg |= 0x1000000
	if op.type == 0 and op.mode1 != 0: op.type = op.mode1
	if op.type != 0:
		var typ := op.type - 1
		if not int(floor(op.sz)):
			_setentry(182, typ, op); op.mode1 = 0; op.type = 0; return
		if op.ct1 < 1:
			_setentry(182, typ, op); op.ct1 = int(floor(op.sz))
		op.ct1 -= 1

func _e182(op: O) -> void:
	var kcolor := op.type % 10; var ktype := op.type / 10
	if op.mode0 == 0:
		op.tex = KEMU_TEX[kcolor]; _effinit(op); op.exp = KEMU[kcolor]; op.mode0 = 1
	var v := _dir(op.ax, op.ay, op.sz - float(int(op.sz)))
	op.px += v.x; op.py += v.y; op.pz += v.z
	var uv: Dictionary = op.exp[op.ct0]
	if uv.u == -1:
		op.flg = 0; return
	_effset(op, uv, ktype); op.ct0 += 1; _trs.append(op)

# ---- looping flame flipbooks (effsub5.c)
func _e201(op: O) -> void:
	if op.type == 0 and op.mode1 != 0: op.type = op.mode1
	if op.type == 0:
		op.flg |= 0x1000000; return
	op.flg &= ~0x1000000
	if op.mode0 == 0:
		op.flg |= 0x4180000; op.tex = 59; op.ani = 0; op.bls = 8; op.bld = 3; op.ct0 = int(16 * randf())
		for v in op.tv: v.col = 0xFFFFFFFF
		op.mode0 = 1
	else:
		op.ct0 += 1
		if op.ct0 >= 16: op.ct0 = 0
	var u := (op.ct0 % 4) * 64; var w := (op.ct0 / 4) * 64
	_uv4(op, u / 256.0, w / 256.0, (u + 63) / 256.0, (w + 63) / 256.0)
	_trs.append(op)

func _e218(op: O) -> void:
	if op.type == 0 and op.mode1 != 0: op.type = op.mode1
	if op.type == 0:
		op.flg |= 0x1000000; return
	op.flg &= ~0x1000000
	var T: Array = EFF218[(op.type - 1) % 17]
	var t := op.tv
	var cells: Array = T[1]
	if op.mode0 == 0:
		op.flg |= 0x4180000; op.bls = 8; op.bld = 3
		t[0].x = -1.0; t[2].x = -1.0; t[1].x = 1.0; t[3].x = 1.0; t[0].y = -2.0; t[1].y = -2.0; t[2].y = 0.0; t[3].y = 0.0
		for v in t: v.col = 0xFFFFFFFF
		op.ct0 = int(cells.size() * randf()); op.mode0 = 1
	else:
		op.ct0 += 1
		if op.ct0 >= cells.size(): op.ct0 = 0
	op.tex = T[0]; op.ani = 0
	var cu: float = cells[op.ct0][0]; var cv: float = cells[op.ct0][1]
	_uv4(op, cu / 256.0, (cv + 1 if cv else cv) / 256.0, (cu + T[2] - 1) / 256.0, (cv + T[3]) / 256.0)
	_trs.append(op)

# ---------------------------------------------------------------- drawing (bhDrawEffect)
func _batch(key: String, tex: Texture2D, bls: int, bld: int) -> Dictionary:
	var b: Dictionary = _batches.get(key, {})
	if b.is_empty():
		var im := ImmediateMesh.new()
		var mi := MeshInstance3D.new(); mi.mesh = im
		mi.material_override = _material(tex, bls, bld)
		mi.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
		mi.extra_cull_margin = 16384
		add_child(mi)
		b = {"mi": mi, "im": im, "quads": [], "order": 0}
		_batches[key] = b
	return b

static func _col(c: int) -> Color:
	return Color(float((((c >> 16) & 255) + 1) >> 1) / 128.0, float((((c >> 8) & 255) + 1) >> 1) / 128.0, float(((c & 255) + 1) >> 1) / 128.0, minf(1.0, float((((c >> 24) & 255) + 1) >> 1) / 128.0))

## rebuild the sprite geometry for the current camera (every rendered frame)
func draw(camera: Camera3D) -> void:
	for b in _batches.values():
		b.quads = []
	var bs := camera.global_transform.basis
	var R := bs.x
	var Up := bs.y
	var order := 0
	for op in _trs:
		if (op.flg & 0x1000000) or (op.stflg & 0x1000000) or op.tex < 0 or not (op.flg & 1):
			continue
		var tk := "ef_%s_%d" % [U.pad(op.tex, 3), op.ani]
		var map: Texture2D = _tex[tk] if _tex.has(tk) else _texture(op.tex, op.ani)
		if map == null:
			continue
		var b := _batch("%d_%d_%d_%d" % [op.tex, op.ani, op.bls, op.bld], map, op.bls, op.bld)
		if b.quads.is_empty():
			b.order = order; order += 1
		if b.quads.size() >= 512:
			continue
		var ca := cos(op.az * ANG); var sa := sin(op.az * ANG)
		var q := []
		for k in 4:
			var t: Dictionary = op.tv[k]
			# view space of the original: x right, y down; scale then rotate about z
			var x0: float = t.x * op.sx; var y0: float = t.y * op.sy
			var x := x0 * ca - y0 * sa; var y := -(x0 * sa + y0 * ca)
			var p := (Vector3(op.px, op.py, op.pz) + R * x + Up * y) * 0.1
			q.append([p, Vector2(t.u, t.v), _col(int(t.col))])
		b.quads.append(q)
	# ef_fnc: rain lines (bhEff106) and splashes (bhDraw107)
	var rain_on := false
	for op in _fnc:
		if op.fn == 106:
			rain_on = true; _draw_rain(op)
		elif op.fn == 107:
			_draw_splash(op, R, Up)
	_rain.visible = rain_on
	for b in _batches.values():
		var im: ImmediateMesh = b.im
		im.clear_surfaces()
		var mi: MeshInstance3D = b.mi
		mi.visible = not b.quads.is_empty()
		if b.quads.is_empty():
			continue
		mi.sorting_offset = -float(b.order)
		(mi.material_override as ShaderMaterial).render_priority = clampi(b.order, 0, 100)
		im.surface_begin(Mesh.PRIMITIVE_TRIANGLES)
		for q in b.quads:
			for k in [0, 2, 1, 1, 2, 3]:
				im.surface_set_color(q[k][2]); im.surface_set_uv(q[k][1]); im.surface_add_vertex(q[k][0])
		im.surface_end()

func _draw_rain(op: O) -> void:
	_rain_mesh.clear_surfaces()
	# col 0x10101010 (+7) / 0x40303030 (-7), additive 8/10 = Cs*As + Cd: untextured GS colour 0..255, As 0x80 = 1.0
	var c0 := Color(16.0 / 255, 16.0 / 255, 16.0 / 255, 16.0 / 128); var c1 := Color(48.0 / 255, 48.0 / 255, 48.0 / 255, 64.0 / 128)
	# GS lines are one pixel of the 448-line PS2 frame: drawn as camera-facing strips of that height at any resolution
	var cp := _cam_pos * 0.1
	var px := 2.0 * tan(deg_to_rad(_cam_fov) * 0.5) / 448.0
	_rain_mesh.surface_begin(Mesh.PRIMITIVE_TRIANGLES)
	for e in op.er:
		var bs := Basis.from_euler(Vector3(e.ax * ANG, e.ay * ANG, 0), EULER_ORDER_ZYX)
		var p := Vector3(e.px, e.py, e.pz)
		var a: Vector3 = (p + bs * Vector3(0, 7, 0)) * 0.1; var b: Vector3 = (p + bs * Vector3(0, -7, 0)) * 0.1
		var side := (b - a).cross(((a + b) * 0.5 - cp)).normalized()
		var wa := side * (0.5 * px * a.distance_to(cp)); var wb := side * (0.5 * px * b.distance_to(cp))
		var q := [[a - wa, c0], [a + wa, c0], [b - wb, c1], [b + wb, c1]]
		for k in [0, 2, 1, 1, 2, 3]:
			_rain_mesh.surface_set_color(q[k][1]); _rain_mesh.surface_add_vertex(q[k][0])
	_rain_mesh.surface_end()

func _draw_splash(op: O, R: Vector3, Up: Vector3) -> void:
	var map := _texture(32, 0)
	if map == null:
		return
	var b := _batch("32_0_8_10", map, 8, 10)
	if b.quads.is_empty(): b.order = 90
	var tv := [[-0.7, -1.4], [0.7, -1.4], [-0.7, 0.0], [0.7, 0.0]]
	for e in op.er:
		var uv: Dictionary = SPLASH[mini(int(e.ay), 5)]
		if e.ay < 5 and e.ax != 0 and b.quads.size() < 512:
			var us := [uv.u, uv.u + uv.w, uv.u, uv.u + uv.w]; var vs := [uv.v, uv.v, uv.v + uv.h, uv.v + uv.h]
			var q := []
			for k in 4:
				var x: float = tv[k][0]; var y: float = -tv[k][1]
				q.append([(Vector3(e.px, e.py, e.pz) + R * x + Up * y) * 0.1, Vector2(us[k], vs[k]), Color(0.5, 0.5, 0.5, 0.5)])
			b.quads.append(q)
