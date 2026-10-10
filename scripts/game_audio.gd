class_name GameAudio
extends Node
## Port of audio.ts: SE banks converted from the PS3 data (sound/se/**), BGM with loop points, voices,
## the driver volume curve (AdxVolTbl) and the 3D volume / pan tables of Get3DSoundParameter.
## Every voice plays on its own bus with a panner (pool), volume ramps run at 30 steps per second.

const SE := ["door_knob", "door_open", "door_close", "typewriter", "gun_shot", "gun_shell", "gun_empty", "gun_rl1", "gun_rl2", "gun_rl3"]
const ROOM_BANKS := ["000", "002", "003", "004", "005", "006", "007", "008", "009", "010", "011", "100", "112"]
const BG_BANKS := ["002", "003", "005", "008", "016", "100", "112"]
const PC_BANKS := ["000_0", "003_0", "003_1", "005_0", "006_0", "007_0", "010_0", "014_0", "103_0"]
const PAN360 := [0, -2, -4, -6, -8, -10, -12, -14, -16, -18, -20, -22, -24, -26, -28, -30, -32, -32, -30, -28, -26, -24, -22, -20, -18, -16, -14, -12, -10, -8, -6, -4, -2, 0, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0]
const PAN360VOL := [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -2, -4, -6, -8, -10, -12, -14, -16, -18, -20, -22, -24, -26, -28, -30, -32, -34, -36, -38, -38, -36, -34, -32, -30, -28, -26, -24, -22, -20, -18, -16, -14, -12, -10, -8, -6, -4, -2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
## footstep pitch tables (CallPlayerFootStepSeEx); unit assumed 1/1024 semitone
const WALK_PITCH := [0, 256, 256, 0]
const RUN_PITCH := [512, 768, 768, 512]
const NBUS := 40
const MASTER_GAIN := 0.9

var VOLTBL: Array = []
var _streams := {}
var _banks := {}
var _slots := {}         # key -> Voice
var _rm_bank := ""
var _bg_bank := ""
var _pc_bank := ""
var _bgm_idx: Variant = null
var _bgm_no := -1
var _bgm_vol := -127
var _bgm: Dictionary = {}
var _bg_cur := [null, null, null]
var _foot_sw := [0, 0, 0]
var _voice_idx: Variant = null
var _voice: Dictionary = {}
var _voice_no := -1
var _sys_sw := 0
var _free_bus: Array[int] = []
var _swish: AudioStreamWAV
## listener (camera) for the 3D volume / pan
var listener: Camera3D = null
var _loose: Array = []   # fire-and-forget players

class Voice:
	var players: Array = []     # [{p: AudioStreamPlayer, bus: int, db: float}]
	var pos: Variant = null
	var base := 0.0
	var gain := 1.0             # linear (fade / 3D)
	var pan := 0.0
	var fade: Variant = null    # {from, to, frames, t, units: bool}
	var stop_at := -1.0

func _ready() -> void:
	process_mode = Node.PROCESS_MODE_ALWAYS
	for i in 128:
		VOLTBL.append(-2 * i if i <= 32 else (-64 - 6 * (i - 32) if i <= 64 else (-256 - 8 * (i - 64) if i <= 96 else (-512 - 16 * (i - 96) if i < 127 else -999))))
	for i in NBUS:
		var idx := AudioServer.bus_count
		AudioServer.add_bus(idx)
		AudioServer.set_bus_name(idx, "v%d" % i)
		AudioServer.set_bus_send(idx, "Master")
		AudioServer.add_bus_effect(idx, AudioEffectPanner.new())
		_free_bus.append(idx)
	AudioServer.set_bus_volume_db(0, linear_to_db(MASTER_GAIN))
	_swish = _make_swish()

func units_db(u: float) -> float:
	return VOLTBL[clampi(int(round(-u)), 0, 127)] / 10.0
static func db_gain(db: float) -> float:
	return 0.0 if db <= -99 else pow(10.0, db / 20.0)
static func vol3d(d: float) -> float:
	return 0.0 if d < 30 else (-1.0 if d < 40 else maxf(-87, -2 - floor((d - 40) / 5)))

func _stream(p: String) -> AudioStream:
	if _streams.has(p):
		return _streams[p]
	var s: AudioStream = null
	if ResourceLoader.exists("res://assets/" + p):
		s = load("res://assets/" + p)
	_streams[p] = s
	return s

func _bank(name_: String) -> Variant:
	if not _banks.has(name_):
		_banks[name_] = Assets.json("audio/se/%s.json" % name_, null)
	return _banks[name_]

## room change: per-room SE banks (room / bg / pc footsteps)
func room(stg: int, rm: int, rcase: int) -> void:
	var srr := "%d%s" % [stg, U.pad(rm, 2)]
	_rm_bank = "rm_%s_0" % srr if ROOM_BANKS.has(srr) else ""
	var bg := "bg_%s_0" % srr if BG_BANKS.has(srr) else ""
	if bg == "":
		for i in 3: bg_se_off(i)
	_bg_bank = bg
	var pc: String = PC_BANKS[0]
	for b in PC_BANKS:
		if int(b.substr(0, 3)) <= int(srr) and (b.ends_with("_0") or int(b[4]) == rcase):
			pc = b
	var own := "%s_%d" % [U.pad(int(srr), 3), rcase]
	if PC_BANKS.has(own): pc = own
	# the yard rooms 002 / 003 use the footstep set of the next rooms (pc_005_0), as heard in the original
	if srr == "002" or srr == "003": pc = "005_0"
	_pc_bank = "pc_" + pc
	for k in _slots.keys():
		if not String(k).begins_with("bg"): stop(k)
	for i in 6: _ene_slot[i] = {}
	_ene_req.clear()
	for b in [_rm_bank, _bg_bank, _pc_bank, "rm_common"]:
		if b != "": _bank(b)

## 3D volume (units) / pan of a world point as seen by the camera
func _spatial(pos: Variant) -> Vector2:
	if pos == null or listener == null or not listener.is_inside_tree():
		return Vector2.ZERO
	var v: Vector3 = listener.global_transform.affine_inverse() * (pos as Vector3)
	var d := v.length() * 10
	var deg := rad_to_deg(atan2(-v.x, -v.z))
	if deg < 0: deg += 360
	var i := mini(67, int(floor(deg / 5)))
	return Vector2(vol3d(d) + PAN360VOL[i], PAN360[i] / 128.0)

func _alloc_bus() -> int:
	if _free_bus.is_empty():
		return 0
	return _free_bus.pop_back()

func _new_player(stream: AudioStream, bus: int) -> AudioStreamPlayer:
	var p := AudioStreamPlayer.new()
	p.stream = stream
	p.bus = AudioServer.get_bus_name(bus)
	add_child(p)
	return p

func _apply(v: Voice) -> void:
	var g := maxf(v.gain, 0.0)
	for e in v.players:
		var p: AudioStreamPlayer = e.p
		p.volume_db = linear_to_db(maxf(g * e.lin, 1e-6))
		if e.bus > 0:
			var pn := AudioServer.get_bus_effect(e.bus, 0) as AudioEffectPanner
			pn.pan = clampf(v.pan + e.pan, -1, 1)

## play request list `list` of a bank (and the lists it links to)
func _play_list(bank: String, list: int, key: Variant, o := {}) -> void:
	if bank == "":
		return
	if bank.begins_with("rm_") and list >= 64:
		bank = "rm_common"
	var b: Variant = _bank(bank)
	if b == null:
		return
	var lists: Dictionary = b.lists
	var L: Variant = lists.get(str(list))
	# rm_common (lists 64+) numbers its samples after the room bank's 64: sample s is rm_common[s - 64]
	var s0 := 64 if bank == "rm_common" else 0
	if L == null or int(L.s) - s0 < 0 or int(L.s) - s0 >= b.samples.size():
		return
	if key != null: stop(key)
	var v := Voice.new()
	v.pos = o.get("pos"); v.base = o.get("u", 0.0)
	var sp := _spatial(v.pos)
	v.pan = o.get("pan", 0.0) + sp.y
	if o.has("fade"):
		var f: Array = o.fade
		v.fade = {"from": f[0] + sp.x, "to": f[1] + sp.x, "frames": float(f[2]), "t": 0.0}
		v.gain = db_gain(units_db(v.fade.from)) if f[2] > 0 else db_gain(units_db(v.fade.to))
		if f[2] <= 0: v.fade = null
	else:
		v.gain = db_gain(units_db(v.base + sp.x))
	var l: Variant = L
	var n := 0
	while l != null and n < 4:
		if int(l.s) - s0 < 0 or int(l.s) - s0 >= b.samples.size(): break
		var s: Dictionary = b.samples[int(l.s) - s0]
		var st := _stream("audio/se/%s.ogg" % s.f)
		if st != null:
			if s.has("loop") and o.get("loop", true) != false and st is AudioStreamOggVorbis:
				st = st.duplicate()
				(st as AudioStreamOggVorbis).loop = true
				(st as AudioStreamOggVorbis).loop_offset = float(s.loop[0]) / float(s.sr)
			var bus := _alloc_bus()
			var p := _new_player(st, bus)
			if o.has("cents"): p.pitch_scale = pow(2.0, float(o.cents) / 1200.0)
			var lp := 0.0
			if l.has("p"):
				var pv := int(l.p)
				lp = (pv - 64) / 64.0 if pv < 128 else 1.0
			var e := {"p": p, "bus": bus, "lin": db_gain(float(l.v)), "pan": lp}
			v.players.append(e)
			p.finished.connect(_on_finished.bind(v, e))
		l = lists.get(str(int(l.l))) if l.has("l") else null
		n += 1
	if v.players.is_empty():
		return
	_apply(v)
	for e in v.players: e.p.play()
	if key != null: _slots[key] = v
	else: _loose.append(v)

func _release(e: Dictionary) -> void:
	var p: AudioStreamPlayer = e.p
	if is_instance_valid(p):
		p.stop(); p.queue_free()
	if e.bus > 0 and not _free_bus.has(e.bus):
		var pn := AudioServer.get_bus_effect(e.bus, 0) as AudioEffectPanner
		pn.pan = 0
		_free_bus.append(e.bus)
	e.bus = 0

func _on_finished(v: Voice, e: Dictionary) -> void:
	_release(e)
	v.players.erase(e)
	if v.players.is_empty():
		for k in _slots.keys():
			if _slots[k] == v: _slots.erase(k)
		_loose.erase(v)

func stop(key: Variant, fade_frames := 0.0) -> void:
	var v: Voice = _slots.get(key)
	if v == null:
		return
	_slots.erase(key)
	if fade_frames > 0:
		v.fade = {"lin_from": v.gain, "frames": fade_frames, "t": 0.0, "stop": true}
		_loose.append(v)
	else:
		for e in v.players: _release(e)
		v.players.clear()

## event SE (bank 2) on event slot 0-4; vol = [start, last, frames] in driver units
func event_se(slot: int, se_no: int, pos: Variant = null, vol: Variant = null) -> void:
	var o := {"pos": pos, "u": vol[0] if vol != null else 0.0}
	if vol != null and vol[1] != -1: o.fade = vol
	_play_list(_rm_bank, se_no & 0xff, "evt%d" % slot, o)

func event_se_off(slot: int) -> void:
	stop("evt%d" % slot)

## background (ambient) SE, bank 3, slot 0-2 (same SeNo keeps playing)
func bg_se(slot: int, se_no: int, fade_in := 0.0) -> void:
	if _bg_cur[slot] == se_no and _slots.has("bg%d" % slot):
		return
	_bg_cur[slot] = se_no
	var bank := _bg_bank if ((se_no >> 8) & 0xf) == 3 else _rm_bank
	_play_list(bank, se_no & 0xff, "bg%d" % slot, {"fade": [-127, 0, fade_in * 0.3]} if fade_in else {})

func bg_se_off(slot: int, fade := 0.0) -> void:
	_bg_cur[slot] = null; stop("bg%d" % slot, fade)

## object SE (RegistObjectSe): looping positional sound of the room's bank 2
func obj_se(no: int, pos: Vector3, se_no: int) -> void:
	_play_list(_rm_bank, se_no & 0xff, "obj%d" % no, {"pos": pos})

func obj_se_off(no: int) -> void:
	stop("obj%d" % no)

## player footstep (CallPlayerFootStepSeEx)
func foot(floor_: int, run: bool, pos: Variant = null, id := 0, vol: Variant = null) -> void:
	var tbl := RUN_PITCH if run else WALK_PITCH
	var p: int = tbl[randi() & 3]
	_foot_sw[id] ^= 1
	var o := {"pos": pos, "cents": p / 1024.0 * 100.0, "u": vol[0] if vol != null else 0.0}
	if vol != null and vol[1] != -1: o.fade = vol
	_play_list(_pc_bank, clampi(floor_, 0, 4), "foot%d_%d" % [id, _foot_sw[id]], o)

# ---------------------------------------------------------------- enemy SE / player voice (sdfunc.c)
## enemy SE banks (sound/se/enemy): en01 zombie -> en_000_000_0, en04 dog -> en_004_000_0
const ENEMY_BANK := {1: "en_000_000_0", 4: "en_004_000_0"}
const VOL_DOWN := [0, -2, -4, -6, -8, -9, -10, -11]   # VolDownTbl (chars 254..245)
var _ene_req := {}      # RequestEnemySeBasic: enemy no -> {"se": [no, pos, bank], "sev": [...], "prio"}
var _ene_slot: Array = [{}, {}, {}, {}, {}, {}]   # EnemySlotInfo[6]

## RequestEnemySe(EnemyNo, pPos, SeNo) (bhEne01_SePlay / bhEne04_SePlay): collected, played by exec_enemy_se
func enemy_se(enemy_no: int, enemy_id: int, pos: Vector3, se_no: int) -> void:
	var bank: String = ENEMY_BANK.get(enemy_id, "")
	if bank == "": return
	var r: Dictionary = _ene_req.get(enemy_no, {"prio": 3})
	r.prio = mini(int(r.prio), (se_no >> 16) & 0xF)
	r["sev" if se_no & 0xF000000 else "se"] = [se_no, pos, bank]
	_ene_req[enemy_no] = r

## ChechPlayEnemySe(EnemyNo, SeNo > 0): a sound of this enemy is playing
func enemy_se_playing(enemy_no: int) -> bool:
	for i in 6:
		var e: Dictionary = _ene_slot[i]
		if not e.is_empty() and _slots.has("ene%d" % i) and int(e.enemy) == enemy_no: return true
	return false

## ExecEnemySeManager (once per 30 Hz frame): 6 slots, requests by priority then distance
func exec_enemy_se() -> void:
	for i in 6:
		if not _slots.has("ene%d" % i): _ene_slot[i] = {}
	if _ene_req.is_empty(): return
	var order: Array = _ene_req.keys()
	var dist := func(n: int) -> float:
		var r: Dictionary = _ene_req[n]
		var q: Array = r.get("se", r.get("sev"))
		return (q[1] as Vector3).distance_to(listener.global_position) if listener != null and listener.is_inside_tree() else 0.0
	order.sort_custom(func(a: int, b: int) -> bool:
		var pa := int(_ene_req[a].prio); var pb := int(_ene_req[b].prio)
		return pa < pb if pa != pb else dist.call(a) < dist.call(b))
	for n in order:
		var r: Dictionary = _ene_req[n]
		for k in ["se", "sev"]:
			if not r.has(k): continue
			var q: Array = r[k]
			var se_no: int = q[0]
			var attrib := (se_no >> 24) & 0xF
			# CheckPlaySameSe: the same SE of other enemies at most (SeNo >> 12) & 0xF times
			var same := 0
			for e in _ene_slot:
				if not e.is_empty() and int(e.se) == se_no and int(e.enemy) != n: same += 1
			if same > 0 and same >= ((se_no >> 12) & 0xF): continue
			var slot := -1
			for i in 6:
				var e: Dictionary = _ene_slot[i]
				if not e.is_empty() and int(e.enemy) == n and int(e.attrib) == attrib: slot = i; break
			if slot < 0:
				for i in 6:
					if (_ene_slot[i] as Dictionary).is_empty(): slot = i; break
			if slot < 0: continue
			_ene_slot[slot] = {"enemy": n, "se": se_no, "attrib": attrib}
			_play_list(q[2], se_no & 0xff, "ene%d" % slot, {"pos": q[1], "u": VOL_DOWN[(se_no >> 20) & 7]})
			if not _slots.has("ene%d" % slot): _ene_slot[slot] = {}
	_ene_req.clear()

func stop_enemy_se() -> void:
	for i in 6:
		stop("ene%d" % i); _ene_slot[i] = {}
	_ene_req.clear()

## CallPlayerVoice(SeNo): bank 4 = the player's voice bank (core_000 Claire), slot 7
func player_voice(se_no: int, pos: Variant = null) -> void:
	_play_list("core_000", se_no & 0xff, "pvoice", {"pos": pos})

## player action SE (CallPlayerActionSe)
func action(se_no: int, pos: Variant = null) -> void:
	_play_list(_pc_bank, se_no & 0xff, "act", {"pos": pos})

## BGM (sound/bgm, bgm_all.stq request numbers). vol in ADX units (default -45), fade in 1/100 s
func bgm(no: int, fade_in := 0.0, vol := -45.0) -> void:
	if no == _bgm_no and not _bgm.is_empty():
		if vol != _bgm_vol:
			_bgm_vol = int(vol); _bgm.target = db_gain(units_db(vol)); _bgm.ramp = 0.3
		return
	bgm_off(fade_in if fade_in else 0.0)
	_bgm_no = no; _bgm_vol = int(vol)
	if _bgm_idx == null: _bgm_idx = Assets.json("audio/bgm.json", {})
	var e: Variant = _bgm_idx.get(str(no))
	if e == null:
		return
	var st := _stream("audio/bgm/%s.ogg" % e.f)
	if st == null:
		return
	st = st.duplicate()
	if e.has("loop") and st is AudioStreamOggVorbis:
		(st as AudioStreamOggVorbis).loop = true
		(st as AudioStreamOggVorbis).loop_offset = float(e.loop[0])
	var p := AudioStreamPlayer.new(); p.stream = st; add_child(p)
	var target := db_gain(units_db(vol))
	_bgm = {"p": p, "gain": 0.0 if fade_in else target, "target": target, "lin_rate": (target / (fade_in / 100.0)) if fade_in else 0.0, "ramp": 0.0, "stop": false, "loop_end": float(e.loop[1]) if e.has("loop") else -1.0, "loop_start": float(e.loop[0]) if e.has("loop") else 0.0}
	p.volume_db = linear_to_db(maxf(_bgm.gain, 1e-6))
	p.play()

func bgm2(no: int) -> void:
	bgm(no, 100)

var _bgm_fading: Array = []
func bgm_off(fade_out := 0.0) -> void:
	_bgm_no = -1
	if _bgm.is_empty():
		return
	var b := _bgm; _bgm = {}
	if fade_out > 0:
		b.stop = true; b.out_rate = b.gain / (fade_out / 100.0)
		_bgm_fading.append(b)
	else:
		(b.p as AudioStreamPlayer).queue_free()

## cutscene voice (PlayVoice, sound/voice request = VoiceNo)
func voice(no: int, fade_in := 0.0) -> void:
	voice_off(); _voice_no = no
	if _voice_idx == null: _voice_idx = Assets.json("audio/voice.json", {})
	var nm: Variant = _voice_idx.get(str(no))
	if nm == null:
		return
	var st := _stream("audio/voice/%s.ogg" % nm)
	if st == null:
		return
	var p := AudioStreamPlayer.new(); p.stream = st; add_child(p)
	_voice = {"p": p, "gain": 0.0 if fade_in else 1.0, "rate": (1.0 / (fade_in / 100.0)) if fade_in else 0.0, "stop": false}
	p.volume_db = linear_to_db(maxf(_voice.gain, 1e-6))
	p.finished.connect(func() -> void:
		if not _voice.is_empty() and _voice.p == p:
			_voice = {}
		p.queue_free())
	p.play()

func preload_voices(nos: Array) -> void:
	if _voice_idx == null: _voice_idx = Assets.json("audio/voice.json", {})
	for n in nos:
		var nm: Variant = _voice_idx.get(str(n))
		if nm != null: _stream("audio/voice/%s.ogg" % nm)

var _voice_fading: Array = []
func voice_off(fade_out := 0.0) -> void:
	_voice_no = -1
	if _voice.is_empty():
		return
	var v := _voice; _voice = {}
	if fade_out > 0:
		v.stop = true; v.out_rate = v.gain / (fade_out / 100.0); _voice_fading.append(v)
	else:
		(v.p as AudioStreamPlayer).queue_free()

## per frame: volume ramps (30 steps per second like RequestSeFadeFunctionEx), 3D updates, BGM loop end
func _process(dt: float) -> void:
	exec_enemy_se()
	for v in _slots.values() + _loose:
		var vv: Voice = v
		if vv.fade != null:
			var f: Dictionary = vv.fade
			f.t += dt * 30.0
			var k := clampf(f.t / maxf(f.frames, 1e-3), 0, 1)
			if f.has("stop"):
				vv.gain = f.lin_from * (1.0 - k)
				if k >= 1.0:
					for e in vv.players: _release(e)
					vv.players.clear(); _loose.erase(vv)
					continue
			else:
				var u: float = f.from + (f.to - f.from) * floor(k * f.frames) / maxf(f.frames, 1e-3)
				vv.gain = db_gain(units_db(u))
				if k >= 1.0: vv.fade = null
			_apply(vv)
	# looping positional sounds follow the camera
	for k in _slots.keys():
		var v: Voice = _slots[k]
		if v.pos != null and String(k).begins_with("obj") and v.fade == null:
			var sp := _spatial(v.pos)
			var tg := db_gain(units_db(v.base + sp.x))
			var a := 1.0 - exp(-dt / 0.05)
			v.gain += (tg - v.gain) * a; v.pan += (sp.y - v.pan) * a
			_apply(v)
	if not _bgm.is_empty():
		var b := _bgm
		var p: AudioStreamPlayer = b.p
		if b.lin_rate > 0:
			b.gain = minf(b.target, b.gain + b.lin_rate * dt)
			if b.gain >= b.target: b.lin_rate = 0.0
		elif b.ramp > 0:
			b.gain += (b.target - b.gain) * (1.0 - exp(-dt / b.ramp))
		p.volume_db = linear_to_db(maxf(b.gain, 1e-6))
		# loop end inside the file (AudioStreamOggVorbis loops at the end of the file)
		if b.loop_end > 0 and p.playing and p.get_playback_position() >= b.loop_end:
			p.seek(b.loop_start + (p.get_playback_position() - b.loop_end))
		if not p.playing and not (p.stream as AudioStreamOggVorbis).loop:
			p.queue_free(); _bgm = {}
	for b in _bgm_fading.duplicate():
		b.gain = maxf(0.0, b.gain - b.out_rate * dt)
		(b.p as AudioStreamPlayer).volume_db = linear_to_db(maxf(b.gain, 1e-6))
		if b.gain <= 0:
			(b.p as AudioStreamPlayer).queue_free(); _bgm_fading.erase(b)
	if not _voice.is_empty() and _voice.rate > 0:
		_voice.gain = minf(1.0, _voice.gain + _voice.rate * dt)
		(_voice.p as AudioStreamPlayer).volume_db = linear_to_db(maxf(_voice.gain, 1e-6))
		if _voice.gain >= 1.0: _voice.rate = 0.0
	for v in _voice_fading.duplicate():
		v.gain = maxf(0.0, v.gain - v.out_rate * dt)
		if is_instance_valid(v.p): (v.p as AudioStreamPlayer).volume_db = linear_to_db(maxf(v.gain, 1e-6))
		if v.gain <= 0:
			if is_instance_valid(v.p): (v.p as AudioStreamPlayer).queue_free()
			_voice_fading.erase(v)

## one-shot sample of audio/NAME.ogg; returns its duration / rate
func play(name_: String, vol := 1.0, rate := 1.0, delay := 0.0) -> float:
	var st := _stream("audio/%s.ogg" % name_)
	if st == null:
		return 0.0
	var p := AudioStreamPlayer.new(); p.stream = st; p.pitch_scale = rate; p.volume_db = linear_to_db(maxf(vol, 1e-6))
	add_child(p)
	p.finished.connect(p.queue_free)
	if delay > 0:
		get_tree().create_timer(delay, true).timeout.connect(func() -> void: if is_instance_valid(p): p.play())
	else:
		p.play()
	return st.get_length() / rate

func se(name_: String) -> void:
	match name_:
		"door":
			var d := play("door_knob"); play("door_open", 0.9, 1, maxf(0.25, d * 0.6))
		"doorClose": play("door_close")
		"locked":
			play("door_knob"); play("door_knob", 1, 1.05, 0.35)
		# system bank (CallSystemSe): 0 cancel, 1 invalid, 2 cursor, 3 decide
		"pickup", "menu": sys(3)
		"cursor": sys(2)
		"cancel": sys(0)
		"error": sys(1)
		"typewriter": play("typewriter")
		"lighter": play("door_knob", 0.35, 2.2)
		"knife": swish()
		# handgun bank (arms_000): 05 shot, 06 shell casing, 04 empty trigger, 01-03 reload
		"shot":
			play("gun_shot"); play("gun_shell", 0.6, 1, 0.35)
		"empty": play("gun_empty")
		"reload":
			play("gun_rl1", 1, 1, 0.1); play("gun_rl2", 1, 1, 0.4); play("gun_rl3", 1, 1, 0.75)

## CallSystemSe(no): system bank request list, two alternating voices
func sys(no: int) -> void:
	_sys_sw ^= 1
	_play_list("sys", no, "sys%d" % _sys_sw)

## knife swing: band-passed noise sweep (900 -> 3800 Hz)
func swish() -> void:
	var p := AudioStreamPlayer.new(); p.stream = _swish; p.volume_db = linear_to_db(0.55)
	add_child(p); p.finished.connect(p.queue_free); p.play()

func _make_swish() -> AudioStreamWAV:
	var sr := 44100
	var n := int(sr * 0.22)
	var data := PackedByteArray(); data.resize(n * 2)
	var q := 2.5
	var x1 := 0.0; var x2 := 0.0; var y1 := 0.0; var y2 := 0.0
	for i in n:
		var t := float(i) / n
		var x := (randf() * 2 - 1) * pow(sin(PI * t), 2)
		var tt := minf(1.0, float(i) / sr / 0.2)
		var f0 := 900.0 * pow(3800.0 / 900.0, tt)
		var w0 := TAU * f0 / sr
		var alpha := sin(w0) / (2 * q)
		var b0 := alpha; var b2 := -alpha; var a0 := 1 + alpha; var a1 := -2 * cos(w0); var a2 := 1 - alpha
		var y := (b0 * x + b2 * x2 - a1 * y1 - a2 * y2) / a0
		x2 = x1; x1 = x; y2 = y1; y1 = y
		data.encode_s16(i * 2, int(clampf(y, -1, 1) * 32767))
	var w := AudioStreamWAV.new()
	w.format = AudioStreamWAV.FORMAT_16_BITS; w.mix_rate = sr; w.stereo = false; w.data = data
	return w
