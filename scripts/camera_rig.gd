class_name CameraRig
extends RefCounted
## Port of camera.ts: original fixed cameras (zones, tracking limits) with a visibility check (another original
## camera or the follow camera when Claire is out of frame / behind walls), event camera, over-the-shoulder camera.

const ASPECT := 4.0 / 3.0
const FOV := 46.0

var cam: Camera3D
var index := -1
## camera chosen by the event scripts (CAMSET) while a cinematic runs; -1 = automatic
var forced := -1
var ev := EventCam.new()
## fraction of the current 30 fps event frame
var ev_sub := 0.0
var mode := "fixed"   # fixed | behind
var using_fallback := false
var shown := -1
var _cams: Array = []
var _room: Room = null
var _track_yaw: Variant = null
var _track_pitch := 0.0
var _vis_t := 0.0
var _override := -2   # -2 none, -1 follow camera, >= 0 camera index
var _fpos := Vector3.ZERO
var _flook := Vector3.ZERO
var _finit := false
var _cut: Array = []
## cut.c: CUT_WORK flg bit 0 (bhCamInfoSet) and the cuttp areas [[attr, flr_no, atr_tp, minx, minz, maxx, maxz]...]
## per cut (data/room_cuts.json); flr = the player's floor number, zone_p = plp->gpx/gpz (root object on the stairs)
var cuts: Array = []
var cut_on: Array = []
var flr := 0
var zone_p: Variant = null
static var _cut_db: Dictionary = {}
## shoulder camera
var yaw := 0.0
var pitch := 0.08
var zoom := 0.0

func _init() -> void:
	cam = Camera3D.new()
	cam.fov = FOV; cam.near = 0.05; cam.far = 200.0
	cam.keep_aspect = Camera3D.KEEP_HEIGHT

func set_room(room: Room) -> void:
	_room = room; ev.stop(); forced = -1; _cams = room.data.get("cameras", [])
	_cut = []
	if _cut_db.is_empty():
		var f := FileAccess.open("res://data/room_cuts.json", FileAccess.READ)
		if f: _cut_db = JSON.parse_string(f.get_as_text())
	cuts = _cut_db.get(String(room.data.get("id", "")), [])
	if cuts.size() != _cams.size(): cuts = []
	cut_on = []
	for c in cuts: cut_on.append(bool(int(c[0]) & 1))
	for c in _cams:
		_cut.append(room.hidden_meshes(c.get("hid")))
	index = -1; _override = -2; _finit = false; _track_yaw = null

func _inside(c: Dictionary, x: float, z: float, m := 0.0) -> bool:
	var zn: Array = c.zone
	return x >= minf(zn[0], zn[2]) - m and x <= maxf(zn[0], zn[2]) + m and z >= minf(zn[1], zn[3]) - m and z <= maxf(zn[1], zn[3]) + m

## bhCamInfoSet: v0 == 0 enables the cut, otherwise disables it
func set_cut(no: int, on: bool) -> void:
	if no >= 0 and no < cut_on.size(): cut_on[no] = on

## bhCheckCutArea: first enabled cut with an area of the floor containing (px, pz)
func cut_area(px: float, pz: float, f: int) -> int:
	for i in cuts.size():
		if not cut_on[i]: continue
		for t in cuts[i][2]:
			if int(t[1]) != f: continue
			if int(t[2]) == 0:
				if t[3] <= px and t[5] > px and t[4] <= pz and t[6] > pz: return i
			elif _in_cut_tri(px, pz, t): return i
	return -1

## bhCheckCutAreaInnerTriangle
static func _in_cut_tri(px: float, pz: float, t: Array) -> bool:
	var minx: float = t[3]; var minz: float = t[4]; var maxx: float = t[5]; var maxz: float = t[6]
	if px < minx or px > maxx or pz < minz or pz > maxz: return false
	var p0 := Vector2(maxx, maxz); var p1 := Vector2(minx, minz)
	match int(t[2]):
		2: p0 = Vector2(minx, maxz); p1 = Vector2(maxx, minz)
		3: p0 = Vector2(minx, minz); p1 = Vector2(maxx, maxz)
		4: p0 = Vector2(maxx, minz); p1 = Vector2(minx, maxz)
	var d := p1.y - p0.y
	var p2x := px - p0.x
	var p2z := absf(d / ((p1.x - p0.x) / p2x)) if p2x != 0.0 else 0.0
	return not (absf((p0.y + d) - pz) <= p2z)

## bhCheckCut: on entry the cut of the position; afterwards a new cut is taken only when none of the four points
## 1 unit (0.1 m) around the position is still in the current one
func _cut_cam(p: Vector3, snap: bool) -> int:
	var q: Vector3 = zone_p if zone_p != null else p
	var pp := cut_area(p.x, p.z, flr)
	if snap or index < 0:
		return pp if pp != -1 else maxi(index, 0)
	if pp != -1 and pp != index:
		if cut_area(q.x, q.z - 0.1, flr) != index and cut_area(q.x, q.z + 0.1, flr) != index and cut_area(q.x - 0.1, q.z, flr) != index and cut_area(q.x + 0.1, q.z, flr) != index:
			return pp
	return index

func _zone_cam(p: Vector3) -> int:
	var cur: Variant = _cams[index] if index >= 0 and index < _cams.size() else null
	if cur != null and _inside(cur, p.x, p.z, 0.05):
		return index
	var best := -1
	var bd := INF
	for i in _cams.size():
		var c: Dictionary = _cams[i]
		if _inside(c, p.x, p.z):
			return i
		var zn: Array = c.zone
		var cx := clampf(p.x, minf(zn[0], zn[2]), maxf(zn[0], zn[2]))
		var cz := clampf(p.z, minf(zn[1], zn[3]), maxf(zn[1], zn[3]))
		var d := Vector2(cx - p.x, cz - p.z).length()
		if d < bd:
			bd = d; best = i
	return index if cur != null else best

## target yaw / pitch for camera c looking at the player (tracking cameras turn within their limits)
func _aim(c: Dictionary, p: Vector3) -> Dictionary:
	var lim: Array = c.get("lim", [0, 0, 0, 0])
	var ly := maxf(lim[0], lim[1]); var lp := maxf(lim[2], lim[3])
	if ly <= 0 and lp <= 0:
		return {"yaw": float(c.yaw), "pitch": float(c.pitch), "track": false}
	var dx: float = p.x - c.pos[0]; var dy: float = p.y + 1 - c.pos[1]; var dz: float = p.z - c.pos[2]
	var yw := atan2(-dx, -dz); var pt := atan2(-dy, sqrt(dx * dx + dz * dz))
	var d := U.wrap_pi(yw - c.yaw)
	return {"yaw": c.yaw + clampf(d, -ly, ly), "pitch": clampf(pt, c.pitch - lp, c.pitch + lp), "track": true}

static func cam_basis(pitch_: float, yaw_: float, roll: float) -> Basis:
	return Basis.from_euler(Vector3(-pitch_, yaw_, roll), EULER_ORDER_YXZ)

## projection to NDC of a camera (position, basis, vertical fov) -> Vector3 (x, y, depth in front)
static func project(pos: Vector3, b: Basis, fov: float, q: Vector3) -> Vector3:
	var l := b.transposed() * (q - pos)
	var depth := -l.z
	if depth <= 0.05:
		return Vector3(9, 9, -1)
	var t := tan(deg_to_rad(fov) * 0.5)
	return Vector3(l.x / depth / (t * ASPECT), l.y / depth / t, depth)

## is Claire (chest and head) inside the frame of camera c and not hidden behind walls?
func visible(ci: int, p: Vector3, head: Vector3) -> bool:
	var c: Dictionary = _cams[ci]
	var a := _aim(c, p)
	var cp := U.v3(c.pos)
	var b := cam_basis(a.pitch, a.yaw, float(c.roll))
	var pts := [Vector3(p.x, p.y + 0.9, p.z), head, Vector3(p.x, p.y + 0.3, p.z)]
	var in_frame := 0
	var seen := 0
	for q in pts:
		var n := project(cp, b, FOV, q)
		if n.z > 0 and absf(n.x) < 0.97 and absf(n.y) < 0.97:
			in_frame += 1
		else:
			continue
		if _room == null:
			seen += 1; continue
		var L := cp.distance_to(q)
		var free := _room.clear_distance(cp, q, _cut[ci] if ci < _cut.size() else null)
		if free >= L - 0.25:
			seen += 1
	return in_frame >= 2 and seen >= 1

func update(p: Vector3, head: Vector3, heading: float, snap := false, dt := 1.0 / 60.0) -> bool:
	var prev_idx := index
	var prev_ov := _override
	shown = -1
	if ev.active:
		ev.apply(cam, ev_sub); _finit = false; index = -1; return false
	if mode == "behind":
		_update_shoulder(p, head, snap, dt); return false
	var fc := forced if forced >= 0 and forced < _cams.size() else -1
	var idx := fc if fc >= 0 else (_cut_cam(p, snap) if cuts.size() else _zone_cam(p))
	index = idx
	_vis_t -= dt
	if fc >= 0 or cuts.size():
		# the original has no visibility fallback: the cut areas decide (the fallback stays for rooms without data)
		_override = -2
	elif snap or _vis_t <= 0 or idx != prev_idx:
		_vis_t = 0.2
		if idx >= 0 and idx < _cams.size() and visible(idx, p, head):
			_override = -2
		elif _override >= 0 and _override < _cams.size() and visible(_override, p, head):
			pass
		else:
			var best := -1
			var bd := INF
			for i in _cams.size():
				if i == idx or not visible(i, p, head):
					continue
				var c: Dictionary = _cams[i]
				var d := Vector2(c.pos[0] - p.x, c.pos[2] - p.z).length()
				if d < bd:
					bd = d; best = i
			_override = best if best >= 0 else -1
	using_fallback = _override != -2
	if _override == -1:
		_update_follow(p, head, heading, snap or prev_ov != -1, dt)
		return prev_ov != -1
	var ci := _override if _override >= 0 else idx
	if ci < 0 or ci >= _cams.size():
		return false
	var c: Dictionary = _cams[ci]
	shown = ci
	var changed := ci != (prev_ov if prev_ov >= 0 else prev_idx) or prev_ov == -1
	cam.fov = FOV
	var a := _aim(c, p)
	var b: Basis
	if a.track:
		if changed or snap or _track_yaw == null:
			_track_yaw = a.yaw; _track_pitch = a.pitch
		else:
			var k := 1.0 - exp(-4.0 * dt)
			_track_yaw += (a.yaw - _track_yaw) * k; _track_pitch += (a.pitch - _track_pitch) * k
		b = cam_basis(_track_pitch, _track_yaw, float(c.roll))
	else:
		_track_yaw = null
		b = cam_basis(a.pitch, a.yaw, float(c.roll))
	cam.transform = Transform3D(b, U.v3(c.pos))
	_finit = false
	return changed

func look(dx: float, dy: float) -> void:
	yaw -= dx; pitch = clampf(pitch + dy, -0.65, 0.75)

func reset_yaw(h: float) -> void:
	yaw = h; pitch = 0.08

func _pull(from: Vector3, to: Vector3, minl: float, margin: float) -> Vector3:
	if _room == null:
		return to
	var L := from.distance_to(to)
	var free := _room.clear_distance(from, to)
	if free < L:
		return from + (to - from).normalized() * maxf(minl, free - margin)
	return to

func _look_at(pos: Vector3, target: Vector3) -> void:
	var t := Transform3D(Basis(), pos)
	if (target - pos).length() > 1e-6:
		var up := Vector3.UP
		if absf((target - pos).normalized().dot(up)) > 0.999:
			up = Vector3.BACK
		t = t.looking_at(target, up)
	cam.transform = t

func _update_shoulder(p: Vector3, head: Vector3, snap: bool, dt: float) -> void:
	var cy := cos(yaw); var sy := sin(yaw)
	var f := Vector3(-sy, 0, -cy); var r := Vector3(cy, 0, -sy)
	var z := zoom
	var pivot := Vector3(p.x, maxf(head.y - 0.02, p.y + 1.15), p.z)
	var cp := cos(pitch); var sp := sin(pitch)
	var dir := Vector3(f.x * cp, -sp, f.z * cp)
	var side := 0.36 - 0.04 * z; var back := 1.15 - 0.45 * z; var up := 0.06
	var shoulder := pivot + r * side
	if _room:
		var L := pivot.distance_to(shoulder); var free := _room.clear_distance(pivot, shoulder)
		if free < L: shoulder = pivot + (shoulder - pivot).normalized() * maxf(0.05, free - 0.12)
	var want := shoulder - dir * back + Vector3(0, up, 0)
	want = _pull(shoulder, want, 0.12, 0.15)
	var lk := want + dir * 6.0
	if not _finit or snap:
		_fpos = want; _flook = lk; _finit = true
	else:
		_fpos = _fpos.lerp(want, 1.0 - exp(-18.0 * dt)); _flook = lk
		_fpos = _pull(shoulder, _fpos, 0.12, 0.15)
	cam.fov = 58.0 - 10.0 * z
	_look_at(_fpos, _flook)

func _update_follow(p: Vector3, head: Vector3, heading: float, snap: bool, dt: float) -> void:
	var f := Vector3(-sin(heading), 0, -cos(heading))
	var pivot := Vector3(p.x, maxf(head.y, p.y + 1.2) + 0.12, p.z)
	var want := pivot - f * 1.9 + Vector3(0, 0.35, 0)
	want = _pull(pivot, want, 0.25, 0.18)
	var lk := pivot + f * 1.2 + Vector3(0, -0.25, 0)
	if not _finit or snap:
		_fpos = want; _flook = lk; _finit = true
	else:
		_fpos = _fpos.lerp(want, 1.0 - exp(-8.0 * dt)); _flook = _flook.lerp(lk, 1.0 - exp(-10.0 * dt))
		_fpos = _pull(pivot, _fpos, 0.25, 0.18)
	cam.fov = 60.0
	_look_at(_fpos, _flook)
