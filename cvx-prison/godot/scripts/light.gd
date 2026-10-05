class_name RoomLights
extends RefCounted
## Port of light.ts (light.c bhControlLight / bhSetLightTab + the ROM_WORK ambient). Up to three point lights
## (lsrc 4) and one directional light (lsrc 2) of the active records are handed to the materials through the
## global shader parameters (Assets lighting shader): pl_pos0..2 / pl_col0..2 / pl_rng0..2, dl_dir / dl_col, amb_*.

## light.c lgttab[1]: the lighter flame (type 4 flicker, linked to the right wrist b09)
const LIGHTER_TAB := {"flg": 1, "type": 4, "aspd": 30, "lkflg": 1, "lkno": 0, "lkono": 9, "lsrc": 4, "p": [0, 0, 0], "l": [0.3, 0, -1.5], "v": [0, 1, 0], "spc": 0, "dif": 0, "amb": 0, "c": [3.16, 2.06, 0.7], "nr": 0.8, "fr": 40, "ang": [0, 0, 0, 0, 0]}

var lgt: Array = []
var evl: Array = []
var amb := {"idx": [0, 1, 0, 2], "r": [1, 1, 1, 0], "g": [1, 1, 1, 0], "b": [1, 1, 1, 0]}
## event camera active (cam.flg & 2): lights 4.. come from the event light table
var event := false
## world position of a link target: lkflg (1 player, 2 enemy, 3 object, 4 item), number, local offset (m), bone
var lock_fn: Callable

static func _sin(a: float) -> float: return sin(a * TAU / 65536.0)
static func _cos(a: float) -> float: return cos(a * TAU / 65536.0)

static func _mk(r: Dictionary) -> Dictionary:
	var w: Dictionary = r.duplicate(true)
	w.mode = 0; w.ct0 = 0
	w.px = float(r.p[0]); w.py = float(r.p[1]); w.pz = float(r.p[2])
	var ang: Array = r.get("ang", [])
	w.way = int(ang[3]) if ang.size() > 3 else 0
	for k in ["flg", "type", "aspd", "lkflg", "lkno", "lkono", "lsrc"]:
		w[k] = int(w.get(k, 0))
	w.nr = float(w.get("nr", 0)); w.fr = float(w.get("fr", 0))
	return w

func set_room(lg: Variant, ev: Variant, am: Variant) -> void:
	lgt = []; evl = []
	if lg is Array:
		for r in lg: lgt.append(_mk(r))
	if ev is Array:
		for r in ev: evl.append(_mk(r))
	while lgt.size() < 4:
		var t: Dictionary = LIGHTER_TAB.duplicate(true)
		t.flg = 1; t.type = 0; t.lkflg = 0; t.c = [0, 0, 0]
		lgt.append(_mk(t))
	# bhInitLight: the system lights start inactive
	for i in 4:
		lgt[i].flg &= ~2
	if am is Dictionary:
		amb = (am as Dictionary).duplicate(true)
	event = false
	_apply_amb()

## camera hidlgt mask: room lights 4.. (normal cameras) or the event light table; bit set = light off
func hide(evt: bool, mask: Array) -> void:
	var t := evl if evt else lgt
	for i in range(0 if evt else 4, t.size()):
		var w: int = int(mask[i >> 5]) if (i >> 5) < mask.size() else 0
		if w & (0x80000000 >> (i & 31)):
			t[i].flg &= ~2
		else:
			t[i].flg |= 2

## bhLightSet (0x35): v2 0 = on / 1 = off, v1 light number, v0 0 = room table / 1 = event table
func set_light(v2: int, v1: int, v0: int) -> void:
	var t := lgt if v0 == 0 else evl
	if v1 < t.size():
		if v2 == 0: t[v1].flg |= 1
		else: t[v1].flg &= ~1

## bhLightTypeSet (0x4b)
func set_type(no: int, type: int, aspd: int) -> void:
	if no < lgt.size():
		lgt[no].type = type; lgt[no].aspd = aspd

## bhLightParameterSet (0x78): colour / range in 1/100
func param(no: int, ev: int, r: float, g: float, b: float, nr: float, fr: float) -> void:
	var t := lgt if ev == 0 else evl
	if no >= t.size():
		return
	var lp: Dictionary = t[no]
	lp.c = [r / 100.0, g / 100.0, b / 100.0]; lp.nr = nr / 100.0 * 0.1; lp.fr = fr / 100.0 * 0.1

## bhEffAmbSet (0x44): ambient table entry i = r, g, b / 10
func set_amb(r: float, g: float, b: float, i: int) -> void:
	while amb.r.size() <= i: amb.r.append(0); amb.g.append(0); amb.b.append(0)
	amb.r[i] = r * 0.1; amb.g[i] = g * 0.1; amb.b[i] = b * 0.1
	_apply_amb()

func _apply_amb() -> void:
	var a := amb
	var getc := func(i: int) -> Vector3:
		var r: float = float(a.r[i]) if i < a.r.size() else 0.0
		var g: float = float(a.g[i]) if i < a.g.size() else 0.0
		var b: float = float(a.b[i]) if i < a.b.size() else 0.0
		return Vector3(r, g, b)
	RenderingServer.global_shader_parameter_set("amb_rom", getc.call(int(a.idx[0])))
	RenderingServer.global_shader_parameter_set("amb_chr", getc.call(int(a.idx[1])))
	RenderingServer.global_shader_parameter_set("amb_obj", getc.call(int(a.idx[2])))
	RenderingServer.global_shader_parameter_set("amb_itm", getc.call(int(a.idx[3])))

## player.c: lighter equipped (wpnr_no 1) -> lgtp[1] = lgttab[1] linked to the right wrist, active
func lighter(on: bool) -> void:
	if lgt.size() < 2:
		return
	var lp: Dictionary = lgt[1]
	if on:
		if not (lp.flg & 2):
			var n := _mk(LIGHTER_TAB); n.flg |= 2; lgt[1] = n
	else:
		lp.flg &= ~2

## bhControlLight: one 30 Hz frame
func frame() -> void:
	var list: Array = lgt
	if event:
		list = lgt.slice(0, 4) + evl
	var lct := 0
	var dirf := false
	for lp in list:
		if not (lp.flg & 1) or not (lp.flg & 2):
			continue
		var r := float(lp.c[0]); var g := float(lp.c[1]); var b := float(lp.c[2])
		var v := Vector3(float(lp.v[0]), float(lp.v[1]), float(lp.v[2]))
		var fl := 0.0
		match int(lp.type):
			1:
				fl = _sin(lp.ct0) * 0.25; r = fl * r + r * 0.75; g = fl * g + g * 0.75; b = fl * b + b * 0.75; lp.ct0 = (lp.ct0 + (lp.aspd << 8)) & 0x7fff
			2:
				fl = _sin(lp.ct0) * 0.5; r = fl * r + r * 0.5; g = fl * g + g * 0.5; b = fl * b + b * 0.5; lp.ct0 = (lp.ct0 + (lp.aspd << 8)) & 0x7fff
			3:
				fl = _sin(lp.ct0); r *= fl; g *= fl; b *= fl; lp.ct0 = (lp.ct0 + (lp.aspd << 8)) & 0x7fff
			4:
				fl = _sin(lp.ct0) * 0.25; r = fl * r + r * 0.75; g = fl * g + g * 0.75; b = fl * b + b * 0.75; lp.ct0 = (lp.ct0 + int(floor((lp.aspd << 8) * randf()))) & 0x7fff
			5:
				fl = _sin(lp.ct0) * 0.5; r = fl * r + r * 0.5; g = fl * g + g * 0.5; b = fl * b + b * 0.5; lp.ct0 = (lp.ct0 + int(floor((lp.aspd << 8) * randf()))) & 0x7fff
			6:
				fl = _sin(lp.ct0); r *= fl; g *= fl; b *= fl; lp.ct0 = (lp.ct0 + int(floor((lp.aspd << 8) * randf()))) & 0x7fff
			8, 9:
				lp.way = (lp.way + (-1 if lp.type == 8 else 1) * (int(floor(182.04445 * 0.5 * lp.aspd)) & 0xffff)) & 0xffff
				v = light_vector(float(lp.ang[2]), float(lp.way), float(lp.ang[4]))
			12:
				if lp.mode == 0:
					lp.ct0 -= 1
					if lp.ct0 <= 0:
						lp.ct0 = int(floor(lp.aspd * randf())) + 1; lp.mode = 1
				else:
					r *= 0.5; g *= 0.5; b *= 0.5
					lp.ct0 -= 1
					if lp.ct0 <= 0:
						lp.ct0 = int(floor(lp.aspd * randf())) + 1; lp.mode = 0
			13:
				fl = _cos(lp.ct0); r *= fl; g *= fl; b *= fl; lp.ct0 += lp.aspd << 8
				if lp.ct0 > 16383: lp.flg &= ~1
			100:
				if lp.mode == 0: lp.mode += 1
				else: lp.flg &= ~2
			101:
				fl = _cos(lp.ct0); r *= fl; g *= fl; b *= fl; lp.ct0 += lp.aspd << 8
				if lp.ct0 > 16383: lp.flg &= ~2
		var px: float = lp.px; var py: float = lp.py; var pz: float = lp.pz
		if lp.lkflg >= 1 and lp.lkflg <= 4:
			var q: Variant = lock_fn.call(lp.lkflg, lp.lkno, Vector3(float(lp.l[0]) * 0.1, float(lp.l[1]) * 0.1, float(lp.l[2]) * 0.1), lp.lkono) if lock_fn.is_valid() else null
			if q == null:
				lp.flg &= ~3
				continue
			px = q.x; py = q.y; pz = q.z
			lp.px = px; lp.py = py; lp.pz = pz
		if lp.lsrc == 2 and not dirf:
			dirf = true
			RenderingServer.global_shader_parameter_set("dl_col", Vector3(r, g, b))
			RenderingServer.global_shader_parameter_set("dl_dir", v.normalized() if v.length() > 0 else Vector3.DOWN)
		elif lp.lsrc == 4 and lct < 3:
			RenderingServer.global_shader_parameter_set("pl_pos%d" % lct, Vector4(px, py, pz, 1.0))
			RenderingServer.global_shader_parameter_set("pl_col%d" % lct, Vector3(maxf(0, r), maxf(0, g), maxf(0, b)))
			RenderingServer.global_shader_parameter_set("pl_rng%d" % lct, Vector2(maxf(0.0, lp.nr), maxf(lp.fr, 1e-3)))
			lct += 1
	if not dirf:
		RenderingServer.global_shader_parameter_set("dl_col", Vector3.ZERO)
	for i in range(lct, 3):
		RenderingServer.global_shader_parameter_set("pl_pos%d" % i, Vector4(0, 0, 0, 0))

## bhGetLightVector: (0,0,-1) through njRotateZ, njRotateY, njRotateX (16-bit angles)
static func light_vector(xr: float, yr: float, zr: float) -> Vector3:
	var k := TAU / 65536.0
	return Basis.from_euler(Vector3(xr * k, yr * k, zr * k), EULER_ORDER_ZYX) * Vector3(0, 0, -1)
