class_name EventCam
extends RefCounted
## Event camera (port of evcam.ts; cut.c bhSetEventCamera / bhInitEventCamera / bhControlEventCamera):
## key frames of an EVC record followed with an Overhauser spline, nxt chains records, lkflg looks at a target.

const A2D := 360.0 / 65536.0
const D2R := PI / 180.0

var active := false
var evc: Array = []
var no := 0
var key := 0
var ct0 := 0
var mode := 0
var paused := false
var _P: Array = []
var _F: Array = []
## lock(flg, no, ono, l: Vector3) -> Vector3 or null
var lock: Callable

static func s16(v: int) -> int:
	return ((v + 32768) & 0xffff) - 32768

static func _spline(p0: Array, p1: Array, p2: Array, p3: Array, t: float) -> Array:
	var t2 := t * t; var t3 := t2 * t
	var o := []
	for i in p1.size():
		o.append(0.5 * (2 * p1[i] + (-p0[i] + p2[i]) * t + (2 * p0[i] - 5 * p1[i] + 4 * p2[i] - p3[i]) * t2 + (-p0[i] + 3 * p1[i] - 3 * p2[i] + p3[i]) * t3))
	return o

func set_room(e: Variant) -> void:
	evc = e if e is Array else []
	active = false

func start(n: int, k: int) -> void:
	if n >= evc.size() or (evc[n].keys as Array).is_empty():
		active = false; return
	no = n; key = mini(k, evc[n].keys.size() - 1); ct0 = 0; mode = 0; active = true; paused = false

func stop() -> void:
	active = false

func _lock_ang(k: Dictionary, base: Array) -> Array:
	if not int(k.lk[0]):
		return base
	var p: Variant = lock.call(int(k.lk[0]), int(k.lk[1]), int(k.lk[2]), U.v3(k.l)) if lock.is_valid() else null
	if p == null:
		return base
	var dx: float = p.x - float(k.pos[0]); var dy: float = p.y - float(k.pos[1]); var dz: float = p.z - float(k.pos[2])
	return [s16(-int(round(10430.381 * atan2(dy, sqrt(dx * dx + dz * dz))))), s16(-int(round(10430.381 * atan2(dx, dz))) + 32768), float(k.ang[2])]

func _build() -> void:
	var ecp: Dictionary = evc[no]
	var nxt := int(ecp.nxt)
	var loop := no == nxt - 1
	var jecp: Variant = evc[nxt - 1] if nxt else null
	var kfp: Dictionary = jecp.keys[jecp.keys.size() - 1] if loop else ecp.keys[0]
	var P := []; var F := []
	var a1 := _lock_ang(kfp, kfp.ang)
	var fa := a1.map(func(v): return float(v) * A2D)
	P.append([float(kfp.pos[0]), float(kfp.pos[1]), float(kfp.pos[2])] + fa); F.append([float(kfp.pers) * A2D])
	if nxt:
		kfp = ecp.keys[0]; a1 = _lock_ang(kfp, kfp.ang); fa = a1.map(func(v): return float(v) * A2D)
	var j := 0
	for i in range(1, 20):
		P.append([float(kfp.pos[0]), float(kfp.pos[1]), float(kfp.pos[2])] + fa); F.append([float(kfp.pers) * A2D])
		var nk: Variant = null
		if i < ecp.keys.size():
			nk = ecp.keys[i]
		elif jecp != null and j < jecp.keys.size():
			nk = jecp.keys[j]; j += 1
		if nk != null:
			var a0 := a1; kfp = nk; a1 = _lock_ang(kfp, kfp.ang)
			var nf := []
			for q in fa.size():
				nf.append(fa[q] + s16(int(a1[q]) - int(a0[q])) * A2D)
			fa = nf
	_P = P; _F = F

## one 30 fps step (bhControlEventCamera)
func step() -> void:
	if not active:
		return
	if mode == 0:
		mode = 1; ct0 = 0
	if mode != 1 or paused:
		return
	var ecp: Dictionary = evc[no]
	var kfp: Dictionary = ecp.keys[key]
	ct0 += 1
	if int(kfp.frame) <= ct0:
		ct0 = 0; key += 1
		var n: int = ecp.keys.size()
		if key >= n - 1:
			if int(ecp.nxt) == 0:
				if key >= n: key = n - 1
				mode = 2
			elif key >= n:
				no = int(ecp.nxt) - 1; key = 0

## camera placement; sub = fraction of the current 30 fps frame
func apply(cam: Camera3D, sub := 0.0) -> void:
	_build()
	var ecp: Dictionary = evc[no]
	var kfp: Dictionary = ecp.keys[key]
	var fr := float(kfp.frame)
	var t := minf(1.0, (ct0 + (0.0 if paused else sub)) / fr) if mode == 1 and fr != 0.0 else 0.0
	var g := func(a: Array, i: int) -> Array: return a[mini(i, a.size() - 1)]
	var v := _spline(g.call(_P, key), g.call(_P, key + 1), g.call(_P, key + 2), g.call(_P, key + 3), t)
	var pers: float = _spline(g.call(_F, key), g.call(_F, key + 1), g.call(_F, key + 2), g.call(_F, key + 3), t)[0]
	var b := Basis.from_euler(Vector3(-v[3] * D2R, -v[4] * D2R, v[5] * D2R), EULER_ORDER_YXZ)
	cam.transform = Transform3D(b, Vector3(v[0], v[1], v[2]))
	# njSetPerspective: horizontal angle -> vertical fov for 4:3
	var fov := 2.0 * atan(tan(pers * D2R / 2.0) * 0.75) / D2R
	if absf(cam.fov - fov) > 1e-3:
		cam.fov = fov
