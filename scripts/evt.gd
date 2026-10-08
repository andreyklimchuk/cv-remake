class_name EvtVM
extends RefCounted
## Interpreter of the original event scripts (data/evt/rm_XXXX of the PS3 version) — port of evt.ts.
## Semantics follow the PS2 decompilation of CODE:Veronica (fmil95/recvx-decomp, prog/event.c, hitchk.c, sub1.c, message.c):
## scd0 runs once at room entry, scd1 every frame, events (scripts 2..) run as 16 cooperative tasks (bhEtask).
## PS3 byte order: 16-bit operands are big-endian. All flag words are kept as unsigned 32-bit values.

const M32 := 0xFFFFFFFF
const D2R := PI / 180.0
const ARR := [1, 2, 3, 7, 8, 9, 12, 13, 14, 15, 16, 11]
const MTN_ADD := {1: 0x10000, 2: 0x10000, 0: 0x8000, 3: 0x8000, 8: 0x8000, 4: 0x5555, 5: 0x4000, 9: 0x4000, 6: 0x3333, 7: 0x2aaa, 10: 0x2aaa, 11: 0x2000, 12: 0x1999, 13: 0x1555, 14: 0x2492, 15: 0x2000, 16: 0x1c71, 17: 0x1999, 18: 0x1745, 19: 0x1555, 20: 0x1249, 21: 0x1000, 22: 0xe38, 23: 0xccc, 24: 0xba2, 25: 0xaaa}

static var OPLEN: Array = []
static var SUBLEN: Dictionary = {}

## entity work (player, enemy, object, item, effect) as seen by the scripts
class Work:
	var kind := 0
	var idx := 0
	var px := 0.0
	var py := 0.0
	var pz := 0.0
	var ax := 0.0
	var ay := 0.0
	var az := 0.0
	var pos_set := false
	var ang_set := false
	## motion frame counter (16.16 like frm_no) and step per tick (mtn_add)
	var frm := 0
	var add := 0x10000
	var mtn := -1
	var mtn_kind := -1
	## bank motions of the event (kind 4): hokan_count of the switch (ct2 6 -> 0, else 8)
	var hokan := 0
	## mode3 == 4 (bhMotionPauseSet / bhInitMotionPause): motion frame frozen
	var paused := false
	## stflg 0x1000000: not present; mdflg 0x1: not drawn
	var gone := false
	var hidden := false
	## script took control (LoadWork) / released to normal control (Sub/Player_controll 0x80)
	var scripted := false
	var parts := {}
	var dead := false
	var hp := 0
	## ObjLinkSet* / PlyItem: {kind, idx, bone, lo: Vector3 (metres)} or null
	var link: Variant = null
	func _init(k: int, i: int) -> void:
		kind = k; idx = i

class Task:
	var elgt: Array = []
	var status := 0
	var p := 0
	var scr := 0
	var loop := -1
	var cnt := {}
	var cnt2 := 0
	var cnt3 := 0
	var lstack := {}
	var lcond := {}
	var data := 0
	var work: Work = null
	var cno := 0
	var bp := [0, 0, 0]
	var ba := [0, 0, 0]
	var addp := [0.0, 0.0, 0.0]
	var adda := [0.0, 0.0, 0.0]
	var ips := [[0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]]
	var ian := [[0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]]
	## Object.assign(t, newTask()) of evt.ts: the task object itself is reused (running references stay valid)
	func reset() -> void:
		elgt = []; status = 0; p = 0; scr = 0; loop = -1; cnt = {}; cnt2 = 0; cnt3 = 0; lstack = {}; lcond = {}; data = 0
		work = null; cno = 0; bp = [0, 0, 0]; ba = [0, 0, 0]; addp = [0.0, 0.0, 0.0]; adda = [0.0, 0.0, 0.0]
		ips = [[0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]]
		ian = [[0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]]

static func new_flags() -> Dictionary:
	var z := func() -> Array:
		var a := []; a.resize(32); a.fill(0); return a
	return {"ev": z.call(), "ky": z.call(), "ed": z.call(), "it": z.call(), "mp": z.call(), "ic": z.call(), "ts": z.call(), "gm": 0}

var s: Array[PackedByteArray] = []
var f: Dictionary
var rm := 0
var st := 0
var sp := M32
var cb := 0
var pl := [0, 0, 0, 0]
var etc: Array = []   # Atr dictionaries
var flr: Array = []
var wal: Array = []
var etc_idx := 0
var flr_idx := 0
var sb_id := 0
var mes_sel := 0
var rcase := 0
var pos_no := 0
var stg := 0
var room := 0
var wpnl := 0
var works := {}
var tasks: Array[Task] = []
var host: Object
var trace := false
var pending_msg: Variant = null
var _p := 0
var _cur := 0
var _ifel := 0
var _gsp: Array[int] = []
var _ct: Task = null

func _init(h: Object, flags: Variant = null) -> void:
	host = h
	f = flags if flags != null else new_flags()
	for i in 16:
		tasks.append(Task.new())
	if OPLEN.is_empty():
		var d: Dictionary = JSON.parse_string(FileAccess.get_file_as_string("res://data/evtops.json"))
		OPLEN = d.OPLEN
		for k in d.SUBLEN: SUBLEN[int(k)] = d.SUBLEN[k]

func work(kind: int, idx: int) -> Work:
	var k := "%d:%d" % [kind, idx]
	var w: Work = works.get(k)
	if w == null:
		w = Work.new(kind, idx); works[k] = w
	return w

func get_work(kind: int, idx: int) -> Work:
	return works.get("%d:%d" % [kind, idx])

## bhInitEvent: room entry (after bhFinishRoom set sp_flg = -1)
func init(scripts: Array) -> void:
	s.clear()
	for h in scripts:
		s.append(String(h).hex_decode())
	for t in tasks: t.status = 0
	wpnl = 0
	sp = M32
	_check(0)
	sp |= 0x10; _scheduler(); sp &= ~0x10 & M32

## bhControlEvent: once per frame (30 fps)
func tick() -> void:
	if s.is_empty():
		return
	_check(1)
	_scheduler()
	for w in works.values():
		if not w.paused:
			w.frm += w.add

## room change (system.c): per-room flags reset
func room_change() -> void:
	st = 0; rm = 0; cb &= 0xaf8000bb; f.gm = int(f.gm) & 0x9b8c00cb; works.clear()

# ---------------------------------------------------------------- flags
## returns [getter, setter, bit]
func _word(type: int, b2: int, b3: int) -> Array:
	if not ARR.has(type):
		var bit := b2 & 31
		match type:
			4: return [func() -> int: return rm, func(v: int) -> void: rm = v & M32, bit]
			5: return [func() -> int: return st, func(v: int) -> void: st = v & M32, bit]
			6: return [func() -> int: return sp, func(v: int) -> void: sp = v & M32, bit]
			10: return [func() -> int: return cb, func(v: int) -> void: cb = v & M32, bit]
		return [func() -> int: return 0, func(_v: int) -> void: pass, bit]
	var idx := (b2 << 8) | b3
	if type >= 13:
		var i := type - 13
		return [func() -> int: return int(pl[i]) & M32, func(v: int) -> void: pl[i] = v & M32, idx & 31]
	if type == 11:
		return [func() -> int: return int(f.gm) & M32, func(v: int) -> void: f.gm = v & M32, idx & 31]
	var arr: Array = f[{1: "ev", 2: "ky", 3: "ed", 7: "it", 8: "mp", 9: "ic", 12: "ts"}[type]]
	var wi := (idx & 0x3ff) >> 5
	return [func() -> int: return int(arr[wi]) & M32, func(v: int) -> void: arr[wi] = v & M32, idx & 31]

func flag(type: int, idx: int) -> bool:
	var w := _word(type, idx >> 8, idx & 0xff)
	return ((w[0].call() >> (31 - w[2])) & 1) == 1

func set_flag(type: int, idx: int, on: bool) -> void:
	var w := _word(type, idx >> 8, idx & 0xff)
	var m: int = 0x80000000 >> w[2]
	var v: int = w[0].call()
	w[1].call(v | m if on else v & ~m)

# ---------------------------------------------------------------- interpreter core
func _check(n: int) -> void:
	if n >= s.size():
		return
	_cur = n; _p = 0; _ifel = 0; _gsp.clear()
	# bhInitEvent runs scd0 with bhCetask = bhEtask[0]; bhControlEvent runs scd1 right after the previous
	# bhEventScheduler2, which leaves bhCetask = &bhEtask[15] (so scd1 never touches the work of task 0)
	_ct = tasks[0 if n == 0 else 15]
	_run_loop()

func _run_loop() -> void:
	var guard := 0
	while true:
		while _exec() != 0:
			guard += 1
			if guard > 100000:
				_log("evt: runaway script %d" % _cur); return
		if _ifel <= 0:
			break
		_p = _gsp.pop_back() if not _gsp.is_empty() else _p
		_ifel -= 1

func _scheduler() -> void:
	if not (sp & 0x10):
		return
	for i in 16:
		var t := tasks[i]; _ct = t
		if not t.status:
			continue
		_cur = t.scr; _p = t.p; _ifel = 0; _gsp.clear()
		_run_loop()
		t.p = _p

func evt_on(task: int, evt: int) -> void:
	if task >= 16:
		task = 0
		while tasks[task].status != 0 and task != 15:
			task += 1
	var t := tasks[task]
	var keep := t.work
	t.reset(); t.work = keep
	t.status = 1; t.scr = evt + 2; t.p = 0

func _b(o: int) -> int:
	if _cur >= s.size():
		return 0
	var a := s[_cur]
	var i := _p + o
	return a[i] if i < a.size() else 0

func _u16(o: int) -> int:
	return (_b(o) << 8) | _b(o + 1)

func _len(op: int) -> int:
	if op == 0x64 or op == 0x66 or op == 0x67 or op == 0x69:
		var t: Array = SUBLEN.get(op, [])
		var sb := _b(1)
		return int(t[sb]) if sb < t.size() and int(t[sb]) != 0 else 2
	return int(OPLEN[op]) if op < OPLEN.size() and int(OPLEN[op]) != 0 else 2

func _log(m: String) -> void:
	if host.has_method("log_msg"):
		host.log_msg(m)

func _face(cmd: String, ene: int, v: int, g := 0) -> void:
	if host.has_method("face_cmd"): host.face_cmd(cmd, ene, v, g)

func _snd(cmd: String, a: Array, w: Work = null) -> void:
	host.snd(cmd, a, w)

static func _cmp(v0: int, op: int, v1: int) -> int:
	match op:
		0: return int(v0 == v1)
		1: return int(v0 > v1)
		2: return int(v0 >= v1)
		3: return int(v0 < v1)
		4: return int(v0 <= v1)
		5: return int(v0 != v1)
	return 0

func _ent(kind: int, idx: int) -> Work:
	return work(kind, 0 if kind == 0 else idx) if kind <= 3 else null

## execute one command; returns the handler's value (0 = stop / false)
func _exec() -> int:
	var sc := s[_cur]
	if _p >= sc.size():
		_ifel = 0; return 0
	var op: int = sc[_p]
	var t := _ct
	var L := _len(op)
	if trace:
		_log("evt s%d @%x op %x" % [_cur, _p, op])
	var r := 1
	match op:
		0x00:
			_ifel = 0; return 0
		0x01:
			_gsp.append(_p + 2 + _b(1)); _ifel += 1; _p += 2; return 1
		0x02:
			_gsp.pop_back(); _ifel -= 1; _p += _b(1); return 1
		0x03:
			_gsp.pop_back(); _ifel -= 1; _p += 2; return 1
		0x04:
			var type := _b(1)
			if type == 10:
				if _b(2) == 23 and etc_idx != _b(4): r = 0
				elif _b(2) == 22 and flr_idx != _b(4): r = 0
				else:
					var w := _word(type, _b(2), _b(3))
					r = (_b(5) & 1) ^ ((w[0].call() >> (31 - w[2])) & 1)
			else:
				var w := _word(type, _b(2), _b(3))
				r = (_b(5) & 1) ^ ((w[0].call() >> (31 - w[2])) & 1)
		0x05:
			var w := _word(_b(1), _b(2), _b(3))
			var m: int = 0x80000000 >> w[2]
			var mm: int = M32 >> w[2]
			var v: int = w[0].call()
			match _b(5):
				0: w[1].call(v | m)
				1: w[1].call(v & ~m)
				2: w[1].call(v ^ m)
				3: w[1].call(v | mm)
				4: w[1].call(v & ~mm)
				5: w[1].call(v ^ mm)
		0x06:
			var vars := {0: stg, 1: room, 15: pos_no, 8: sb_id, 17: wpnl, 21: rcase, 23: 0, 24: 0, 25: 0}
			r = _cmp(vars.get(_b(1), 0), _b(2), _b(3))
		0x07:
			var v := 0
			match _b(2):
				5: v = host.player_hp()
				7: v = mes_sel
				10: v = work(1, _b(1)).hp
			r = _cmp(v, _b(3), _u16(4))
		0x08:
			var v := _b(2)
			match _b(1):
				0: stg = v
				1: room = v
				8: sb_id = v
				15: pos_no = v
				18: host.set_weapon(v)
				20: etc_idx = v
				21: rcase = v
		0x0a:
			var a = wal[_b(1)] if _b(1) < wal.size() else null
			if a: a.flg = (a.flg & ~1) if _b(2) else (a.flg | 1)
		0x0b:
			var a = etc[_b(1)] if _b(1) < etc.size() else null
			if a: a.flg = (a.flg & ~1) if _b(2) else (a.flg | 1)
		0x0c:
			var a = flr[_b(1)] if _b(1) < flr.size() else null
			if a: a.flg = (a.flg & ~1) if _b(2) else (a.flg | 1)
		0x0d:
			var fl := _u16(2)
			if not flag(3, fl) and work(1, _b(1)).dead: set_flag(3, fl, true)
		0x0e:
			var fl := _u16(2)
			var e := _b(4)
			var keep := _b(5)
			if etc_idx == e:
				if cb & 0x800:
					if not flag(7, fl):
						var a = etc[e] if e < etc.size() else null
						if a:
							if not keep: a.flg &= ~1
							work(3, a.prm[0]).gone = true
						set_flag(7, fl, true); set_flag(9, fl, false)
				elif not flag(7, fl):
					set_flag(9, fl, true)
				cb &= ~0x800 & M32
		0x0f:
			cb &= ~0x400 & M32; r = 0
		0x10:
			r = int(sb_id == _b(1)) if cb & 0x400 else 0
		0x11:
			r = int(host.has_item(_b(1)))
		0x12:
			var v := _b(1)
			if v == 0 or v == 5:
				cb &= ~0x40 & M32; cb |= 4; st |= 4
			elif v == 1 or v == 4:
				if v == 4: cb &= ~0x40 & M32
				cb &= ~4 & M32; st &= ~4 & M32; sp = M32
			elif v == 2:
				cb &= ~4 & M32; st &= ~4 & M32
			elif v == 3:
				cb |= 0x44; st |= 4
			host.cine(v)
		0x13: host.cam_set(_b(1), _b(2), _b(3))
		0x29: host.cam_pause(_b(1) == 0)
		0x2a: host.cam_fix(_b(1), _b(2))
		0x5b: host.cam_init()
		# bhMotionPauseSet (mode3 = 4 / 1), bhInitMotionPause, bhInitMotionPauseEx (room motion v1 at frame 0)
		0x2b:
			if t.work: t.work.paused = _b(1) == 0
		0x2d: work(1, _b(1)).paused = true
		0x30:
			var w := work(1, _b(1)); w.paused = true; w.frm = 0; w.mtn = _b(2); w.mtn_kind = 1
		0x14: evt_on(_b(2), _b(3))
		0x1f:
			if _b(1) == 0:
				if _b(3) == 0: sp &= ~7 & M32
				open_message(_b(2))
			else:
				sp |= 7
		0x20:
			var w := _ent(_b(2), _b(1))
			if w: w.hidden = _b(3) == 0
		0x22:
			if flag(3, _u16(2)): work(1, _b(1)).gone = true
		0x23:
			var a = etc[_b(4)] if _b(4) < etc.size() else null
			if flag(7, _u16(2)):
				if a and not _b(5): a.flg &= ~1
				work(3, _b(1)).gone = true
			elif a:
				a.flg |= 1
		0x24:
			var w := _ent(_b(1), _b(2))
			if w: w.gone = _b(3) == 0
		0x25:
			var a = etc[_b(1)] if _b(1) < etc.size() else null
			if a:
				a.attr = _u16(2); a.prm = [_b(4), _b(5), _b(6), _b(7)]; a.type = _b(8)
		0x26: r = int(host.weapon() == _b(1))
		0x27: host.set_weapon(_b(1))
		0x31: host.lose_item(_b(1))
		0x33:
			host.door(_u16(2), _b(4), _b(5), _b(6), _b(7)); sp = 0x48; cb |= 1
		0x36: host.fade(((_b(1) << 24) | (_b(2) << 16) | (_b(3) << 8) | _b(4)) & M32, _b(5))
		0x37: rcase = _b(1)
		0x38:
			var N := (_u16(4) << 16) + (0x8000 if _b(3) else 0)
			var w := work(0, 0) if _b(1) == 0 else (work(1, _b(2)) if _b(1) == 1 else work(2, _b(2)))
			r = 0 if w.frm >= N else 1
		0x5e: host.movie(_b(1))
		# face masks of the cutscene NPCs (bhMaskSet / bhLipSet / bhMaskStart / bhLipStart / bhFacePauseSet / bhFaceReSet / bhFaceRep)
		0x3c: _face("mask", _b(2), _b(3))
		0x3d: _face("lip", _b(2), _b(3), _b(1))
		0x3e: _face("mstart", _b(2), _b(3))
		0x3f: _face("lstart", _b(2), _b(3))
		0x8f: _face("pause", _b(1), _b(2))
		0x90: _face("reset", _b(1), 0)
		0x9a: _face("rep", _b(1), _b(2))
		# ---- sound (event.c bhBgmOn.. / sdfunc.c); fades in 1/100 s (x10), volumes in driver units (negative)
		0x19: _snd("voice", [_u16(2), _b(4), _b(5) * 10])
		0x1a: _snd("voiceOff", [_b(1) * 10])
		0x15: _snd("bgm", [_b(1), _b(2) * 10, -45])
		0x16: _snd("bgmOff", [_b(1) * 10])
		0xa6: _snd("bgm", [_b(1), _b(2) * 10, -_b(3)])
		0x95: _snd("bgm2", [_b(1), -45])
		0xa7: _snd("bgm2", [_b(1), -_b(2)])
		0x93: _snd("bgmOff", [100])
		0x17: _snd("se", [_b(1), _b(2), _b(3), _u16(4), _b(6)])
		0x18: _snd("seOff", [_b(1)])
		0x1c: _snd("bgSe", [_b(1), _u16(2), _b(4) * 10])
		0x94: _snd("bgSe", [_b(1), _u16(2), 0])
		0x1d: _snd("bgSeOff", [_b(1), _b(2) * 10])
		0x92: _snd("bgSeOff", [_b(1), 100])
		0x8b:
			var sg := _b(3)
			_snd("objSe", [_b(1), (-1 if sg & 1 else 1) * _u16(4) / 1000.0, (-1 if sg & 2 else 1) * _u16(6) / 1000.0, (-1 if sg & 4 else 1) * _u16(8) / 1000.0, _u16(10)])
		0x45: _snd("objSeOff", [_b(1)])
		0x48: _snd("foot", [_b(1), _b(3), _b(4), _b(5)], t.work)
		# bhEasySESet: Type Slot StartVol LastVol StartPan LastPan Frame FloorType target(kind, idx, bone) SeType . SeNo
		0x86: _snd("easy", [_b(1), _b(2), -_b(3), -_b(4), _b(5) - 128, _b(6) - 128, _b(7), _b(8), _b(9), _b(10), _b(11), _b(12), _u16(14)])
		0xd4: _snd("sys", [_u16(2)])
		0xb6: _snd("case", [_b(1)])
		# ---- links (bhObjLinkSet / Ply / EneItem / ObjItem / bhPlyItem): [3] bone, [4] 0 = on, [5] sign bits, [6..11] offset /100 game units
		0x32, 0x34, 0x52, 0x53, 0xa3:
			var tgt := work(2, _b(2)) if op == 0x32 or op == 0x34 else work(3, _b(2))
			if _b(4) != 0:
				tgt.link = null
			else:
				var sg := _b(5)
				var lo := Vector3((-1 if sg & 1 else 1) * _u16(6) / 1000.0, (-1 if sg & 2 else 1) * _u16(8) / 1000.0, (-1 if sg & 4 else 1) * _u16(10) / 1000.0)
				var k := 0 if (op == 0x34 or op == 0xa3) else (2 if op == 0x52 else 1)
				tgt.link = {"kind": k, "idx": _b(1), "bone": _b(3), "lo": lo}
		0x63: wpnl = (randi() % 100) % maxi(1, _b(1))
		0x65:
			var k := _b(1)
			t.work = work(k, 0 if k == 0 else _b(2)); t.work.scripted = true
			t.cno = _b(3) if k == 1 or k == 2 else 0
			if k == 0:
				t.work.mtn = 42; t.work.frm = 0
		0x64:
			# Player_controll: 07 position, 0c/0d sign flags (shared with bhCommonCtr), 80/8b hand control back
			var sub := _b(1)
			var w := t.work
			if (sub == 0x80 or sub == 0x8b) and w: w.scripted = false
			elif sub == 0x07 or sub == 0x0c or sub == 0x0d: _common(t)
		0x67:
			var v := _b(1)
			var w := t.work
			if (v == 0x80 or v == 0x8f or v == 0x8b) and w: w.scripted = false
			# Sub_controll: mode3 reset (0x8f -> 0, 0x90 -> 3, 0x92/0x93 from the script)
			if w:
				if v == 0x8f or v == 0x90: w.paused = false
				elif v == 0x92: w.paused = _b(6) == 4
				elif v == 0x93: w.paused = _b(5) == 4
		0x69:
			# interpolation subs (1c-21, 2b-2d) consume one byte less than their table length: the trailing 0xfe is
			# then executed as bhEvtNext, i.e. each step of a FOR loop waits one frame (Common_controll cases 28-33, 43-45)
			_common(t)
			var sb := _b(1)
			if ((sb >= 0x1c and sb <= 0x21) or (sb >= 0x2b and sb <= 0x2d) or sb == 0x02 or sb == 0x03 or sb == 0x11 or sb == 0x12) and _b(L - 1) == 0xfe:
				_p += L - 1; return 1
		0x81:
			var busy := bool(st & 0x40000) or bool(st & 8)
			r = (0 if _b(1) else 1) if busy else (1 if _b(1) else 0)
		0x9b: r = 1 if host.movie_playing() else 0  # CheckPlayEndMovie = MovieInfo.ExecMovieSystemFlag
		# lights (light.c): bhLightSet, bhLightTypeSet, bhLightParameterSet, bhLightParameterCSet / Start (FOR interpolation), bhEffAmbSet
		0x35: host.light("set", [_b(1), _b(2), _b(3)])
		0x4b: host.light("type", [_b(1), _b(2), _b(3)])
		0x78: host.light("param", [_b(1), _b(2), _u16(4), _u16(6), _u16(8), _u16(10), _u16(12)])
		0x73:
			t.elgt = []
			for k in 10: t.elgt.append(_u16(2 + 2 * k) / 100.0)
		0x74:
			var e: Array = t.elgt if not t.elgt.is_empty() else [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			var fr := float(t.cnt2) / t.cnt3 if t.cnt3 else 0.0
			var li := func(k: int) -> float: return e[5 + k] + (e[k] - e[5 + k]) * fr
			host.light("param", [_b(1), _b(2), li.call(0) * 100, li.call(1) * 100, li.call(2) * 100, li.call(3) * 100, li.call(4) * 100])
			r = 0
		0x44: host.light("amb", [_b(1), _b(2), _b(3), _b(4)])
		# effects (bhEffDispSet / bhEffModeSet) and bhCamYureSet
		0x43: host.eff("disp", _b(1), _b(2))
		0x91: host.eff("mode", _b(1), _b(2))
		0x5a: host.eff("yure", _b(1), _u16(2))
		0xbc:
			if _b(1) < 16: tasks[_b(1)].status = 0
		# ---- flow control
		0xf3, 0xfd:
			t.data = _p
			var cp: int = t.lcond.get(t.loop, 0)
			_p = cp
			var rr := _exec()
			if rr != 0:
				_p = t.lstack.get(t.loop, 0); return 1
			_p = t.data + 1; t.loop -= 1
			return 1 if op == 0xf3 else 0
		0xf4:
			_p += 1; return 1
		0xf8:
			t.loop += 1; t.cnt[t.loop] = _u16(2); _p += 1
			t.cnt[t.loop] -= 1
			if t.cnt[t.loop] <= 0:
				_p += 3; t.loop -= 1
			return 0
		0xf9:
			t.cnt[t.loop] = t.cnt.get(t.loop, 0) - 1
			if t.cnt[t.loop] <= 0:
				_p += 3; t.loop -= 1
			return 0
		0xfa:
			t.loop += 1
			var n := _u16(2)
			if n >= 0x8000: n -= 0x10000
			t.cnt[t.loop] = n; t.cnt2 = n; t.cnt3 = n
			_p += 4; t.lstack[t.loop] = _p; return 1
		0xfb:
			t.cnt[t.loop] = t.cnt.get(t.loop, 0) - 1
			if t.cnt[t.loop] != 0:
				t.cnt2 = t.cnt[t.loop]; _p = t.lstack.get(t.loop, 0)
			else:
				_p += 2; t.loop -= 1
			return 1
		0xfc:
			t.loop += 1; t.lcond[t.loop] = _p + 2; _p = _p + _b(1); t.lstack[t.loop] = _p; return 1
		0xfe:
			_p += 1; return 0
		0xff:
			t.status = 0; _p += 2; return 0
	_p += L
	return r

## bhSetMessage + the message-closing flags of bhControlMessage
func open_message(idx: int) -> void:
	mes_sel = 0; st |= 0x200; st &= ~(0x80000 | 0x8000 | 0x4000 | 0x1000 | 0x400 | 0x800) & M32
	cb &= ~(0x20000000 | 0x2000 | 0x1000) & M32
	pending_msg = idx; host.message(idx)

## message closed by the player (sel = chosen answer or -1 when there was no question)
func message_closed(sel: int, from_examine: bool) -> void:
	st &= ~0x200 & M32
	if sel >= 0:
		mes_sel = sel; cb |= 0x1000; st |= 0x4000
	cb |= 0x2000
	if from_examine:
		cb |= 0x20000000; sp = M32; st &= ~0x2204 & M32
	pending_msg = null

func _common(t: Task) -> void:
	var w := t.work
	var sub := _b(1)
	if w == null:
		return
	var part := func() -> Dictionary:
		if not w.parts.has(t.cno): w.parts[t.cno] = {}
		return w.parts[t.cno]
	var sg := func(v: float, neg: int) -> float: return -v if neg else v
	match sub:
		0x02:
			w.px += sg.call(t.addp[0], t.bp[0]); w.py += sg.call(t.addp[1], t.bp[1]); w.pz += sg.call(t.addp[2], t.bp[2]); w.pos_set = true
		0x03:
			w.ax += sg.call(t.adda[0], t.ba[0]); w.ay += sg.call(t.adda[1], t.ba[1]); w.az += sg.call(t.adda[2], t.ba[2]); w.ang_set = true
		0x05: t.addp = [_b(2) * 0.01, _b(3) * 0.01, _b(4) * 0.01]
		0x06: t.adda = [_b(2) * D2R / 2, _b(3) * D2R / 2, _b(4) * D2R / 2]
		0x07:
			w.px = sg.call(_u16(2) / 1000.0, t.bp[0]); w.py = sg.call(_u16(4) / 1000.0, t.bp[1]); w.pz = sg.call(_u16(6) / 1000.0, t.bp[2]); w.pos_set = true
		0x08: part.call().pos = [sg.call(_u16(2) / 1000.0, t.bp[0]), sg.call(_u16(4) / 1000.0, t.bp[1]), sg.call(_u16(6) / 1000.0, t.bp[2])]
		0x09: part.call().ang = [sg.call(_b(2), t.ba[0]) * D2R, sg.call(_b(3), t.ba[1]) * D2R, sg.call(_b(4), t.ba[2]) * D2R]
		0x0b, 0x0f:
			w.ax = sg.call(_b(2), t.ba[0]) * D2R; w.ay = sg.call(_b(3), t.ba[1]) * D2R; w.az = sg.call(_b(4), t.ba[2]) * D2R; w.ang_set = true
		0x0c: t.bp = [_b(2), _b(3), _b(4)]
		0x0d: t.ba = [_b(2), _b(3), _b(4)]
		0x11:
			var q: Dictionary = part.call()
			var p: Array = q.get("pos", [0.0, 0.0, 0.0])
			q.pos = [p[0] + sg.call(t.addp[0], t.bp[0]), p[1] + sg.call(t.addp[1], t.bp[1]), p[2] + sg.call(t.addp[2], t.bp[2])]
		0x12:
			var q: Dictionary = part.call()
			var a: Array = q.get("ang", [0.0, 0.0, 0.0])
			q.ang = [a[0] + sg.call(t.adda[0], t.ba[0]), a[1] + sg.call(t.adda[1], t.ba[1]), a[2] + sg.call(t.adda[2], t.ba[2])]
		0x18, 0x22, 0x19, 0x23:
			w.add = MTN_ADD.get(_b(2), 0x10000)
			if sub == 0x18 or sub == 0x22:
				w.paused = false; w.mtn_kind = _b(3); w.mtn = _b(4); w.frm = 0
				if sub == 0x22: w.frm = _u16(8) << 16
			elif _b(3) == 1:
				# 0x19 / 0x23 with 1: the enemy's own motion bank (mnwP = sys->emtp[id], mtn_no = mode1, frm_no 0) -> kind 4
				w.paused = false; w.mtn_kind = 4; w.mtn = _b(4); w.frm = 0; w.hokan = 0 if _b(7) == 6 else 8
		0x1a: t.ips[_b(2)] = [sg.call(_u16(4) / 1000.0, _b(3) & 1), sg.call(_u16(6) / 1000.0, _b(3) & 2), sg.call(_u16(8) / 1000.0, _b(3) & 4)]
		0x1b: t.ian[_b(2)] = [sg.call(_b(4), _b(3) & 1), sg.call(_b(5), _b(3) & 2), sg.call(_b(6), _b(3) & 4)]
		0x1e, 0x1f, 0x1c, 0x2b, 0x2c, 0x2d:
			var fr := float(t.cnt2) / t.cnt3 if t.cnt3 else 1.0
			var lin := _b(2) != 0
			var k := fr if lin else 0.5 * fr + 1.5 * fr * fr - fr * fr * fr
			var mix := func(A: Array, B: Array) -> Array: return [A[0] + (B[0] - A[0]) * k, A[1] + (B[1] - A[1]) * k, A[2] + (B[2] - A[2]) * k]
			var do_pos := sub == 0x1e or sub == 0x1c or sub == 0x2b or sub == 0x2c
			var do_ang := sub == 0x1f or sub == 0x1c or sub == 0x2b or sub == 0x2d
			var pm := _b(3) if (sub == 0x2b or sub == 0x2c) else 7
			var am := _b(4) if sub == 0x2b else (_b(3) if sub == 0x2d else 7)
			if do_pos:
				var P: Array = mix.call(t.ips[1], t.ips[0])
				if t.cno == 0:
					if pm & 1: w.px = P[0]
					if pm & 2: w.py = P[1]
					if pm & 4: w.pz = P[2]
					w.pos_set = true
				else:
					var q: Dictionary = part.call()
					var o: Array = q.get("pos", [0.0, 0.0, 0.0])
					q.pos = [P[0] if pm & 1 else o[0], P[1] if pm & 2 else o[1], P[2] if pm & 4 else o[2]]
			if do_ang:
				var A0: Array = mix.call(t.ian[1], t.ian[0])
				var A := [A0[0] * D2R, A0[1] * D2R, A0[2] * D2R]
				if t.cno == 0:
					if am & 1: w.ax = A[0]
					if am & 2: w.ay = A[1]
					if am & 4: w.az = A[2]
					w.ang_set = true
				else:
					var q: Dictionary = part.call()
					var o: Array = q.get("ang", [0.0, 0.0, 0.0])
					q.ang = [A[0] if am & 1 else o[0], A[1] if am & 2 else o[1], A[2] if am & 4 else o[2]]
		0x28: w.frm = _u16(2) << 16
		0x30:
			t.ips[_b(2)] = [w.px, w.py, w.pz] if t.cno == 0 else (part.call().get("pos", [0.0, 0.0, 0.0]) as Array).duplicate()
		0x31: t.ian[_b(2)] = [w.ax / D2R, w.ay / D2R, w.az / D2R]

## ATR record from the room JSON (type/flags strings as exported by conv/room.py)
static func atr_from(e: Dictionary) -> Dictionary:
	var t := String(e.type).hex_to_int() & M32
	var fl := String(e.flags).hex_to_int() & M32
	var x := int(e.extra) & M32
	var attr := (((fl & 0xff) << 24) | ((fl & 0xff00) << 8) | ((fl >> 8) & 0xff00) | (fl >> 24)) & M32
	return {"flg": t & 0xff, "type": (t >> 8) & 0xff, "id": (t >> 16) & 0xff, "flr": t >> 24, "attr": attr,
		"x": float(e.x), "y": float(e.y), "z": float(e.z), "w": float(e.sx), "h": float(e.sy), "d": float(e.sz),
		"prm": [x & 0xff, (x >> 8) & 0xff, (x >> 16) & 0xff, x >> 24]}
