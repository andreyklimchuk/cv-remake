extends SceneTree
## Headless check of the event VM (same output as dev/vmtest.ts of the web build):
## godot --headless -s dev/vmtest.gd -- rm_0000 300
var tick := 0
var rd: Dictionary
var vm: EvtVM
var q: Array[Callable] = []

func log_msg(s: String) -> void: print("[%d] %s" % [tick, s])
func has_item(id: int) -> bool: return id == 55
func lose_item(id: int) -> void: log_msg("lose %d" % id)
func weapon() -> int: return 1 if tick > 700 else 0
func set_weapon(w: int) -> void: log_msg("setWeapon %d" % w)
func message(i: int) -> void:
	var m: String = rd.messages[i] if i < rd.messages.size() else ""
	log_msg("MSG %d %s" % [i, JSON.stringify(m.substr(0, 60))])
	q.append(func() -> void: vm.message_closed(-1, false))
func fade(a: int, sp: int) -> void: log_msg("fade %x %d" % [a, sp])
func cine(m: int) -> void: log_msg("cine %d" % m)
func cam_set(k: int, a: int, b: int) -> void: log_msg("cam %d %d %d" % [k, a, b])
func cam_fix(_k: int, _a: int) -> void: pass
func cam_pause(_on: bool) -> void: pass
func cam_init() -> void: pass
func door(a: int, b: int, c: int, d: int, e: int) -> void: log_msg("door %d,%d,%d,%d,%d" % [a, b, c, d, e])
func movie(n: int) -> void: log_msg("movie %d" % n)
func movie_playing() -> bool: return false
func player_hp() -> int: return 200
func snd(_c: String, _a: Array, _w = null) -> void: pass
func light(_c: String, _a: Array) -> void: pass
func eff(_c: String, _a: int, _v: int) -> void: pass

func _f2(v: float) -> String: return "%.2f" % v
func dump() -> void:
	for k in vm.works:
		var w: EvtVM.Work = vm.works[k]
		var pos := ",".join([_f2(w.px), _f2(w.py), _f2(w.pz)]) if w.pos_set else "-"
		var ang := ",".join(["%d" % roundi(w.ax * 57.3), "%d" % roundi(w.ay * 57.3), "%d" % roundi(w.az * 57.3)]) if w.ang_set else "-"
		log_msg("work %s gone=%s hid=%s pos=%s ang=%s mtn=%d" % [k, w.gone, w.hidden, pos, ang, w.mtn])
func tasks_s() -> String:
	var o := ""
	for t in vm.tasks: o += (str(t.scr) if t.status else ".")
	return o

func _init() -> void:
	var args := OS.get_cmdline_user_args()
	var room: String = args[0] if args.size() > 0 else "rm_0000"
	var N: int = int(args[1]) if args.size() > 1 else 300
	rd = JSON.parse_string(FileAccess.get_file_as_string("res://assets/rooms/%s.json" % room))
	var ev: Dictionary = JSON.parse_string(FileAccess.get_file_as_string("res://assets/evt/%s.json" % room))
	vm = EvtVM.new(self)
	for e in rd.triggers: vm.etc.append(EvtVM.atr_from(e))
	for e in rd.collision: vm.wal.append(EvtVM.atr_from(e))
	for e in rd.get("areas", []): vm.flr.append(EvtVM.atr_from(e))
	vm.stg = 0; vm.room = int(room.substr(5, 2))
	vm.init(ev.scripts)
	log_msg("after init: sp=%s cb=%s tasks=%s" % [hx(s32(vm.sp)), hx(vm.cb), tasks_s()])
	dump()
	var ef := ""; var wf := ""
	for a in vm.etc: ef += str(a.flg & 1)
	for a in vm.wal: wf += str(a.flg & 1)
	log_msg("etc flg %s wal %s" % [ef, wf])
	var flr_env := OS.get_environment("FLR")
	tick = 1
	while tick <= N:
		while not q.is_empty(): q.pop_front().call()
		if tick > 720 and flr_env != "":
			vm.cb |= 0x200; vm.flr_idx = int(flr_env)
		vm.tick(); vm.cb &= ~(0x200 | 0x8000000) & 0xFFFFFFFF
		tick += 1
	log_msg("end: sp=%s cb=%s st=%s tasks=%s" % [hx(s32(vm.sp)), hx(vm.cb), hx(vm.st), tasks_s()])
	dump()
	var evs := []
	for v in vm.f.ev: evs.append("%x" % v)
	log_msg("ev " + " ".join(evs))
	for i in vm.tasks.size():
		var t: EvtVM.Task = vm.tasks[i]
		if t.status:
			var c := []
			for j in t.loop + 1: c.append(str(t.cnt.get(j, "")))
			log_msg("task %d script %d (evt %d) p=%x loop=%d cnt=%s" % [i, t.scr, t.scr - 2, t.p, t.loop, ",".join(c)])
	quit()

## JS Number.toString(16): negative values keep their sign
static func hx(v: int) -> String:
	return ("-%x" % -v) if v < 0 else ("%x" % v)
## the web VM keeps sp as a signed 32-bit result of its bit operations
static func s32(v: int) -> int:
	v &= 0xFFFFFFFF
	return v - 0x100000000 if v >= 0x80000000 and v != 0xFFFFFFFF else v
