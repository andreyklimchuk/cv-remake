class_name PushBox
extends RefCounted
## objitm.c bhObj001 (ETTY object type 1): a box with a wall record (sys->mwalp type 0, attr 0x10002, prm3 = the
## object); the pushable sizes (aspd 0 / 6, pn 1) add a raised-block wall (type 7, attr 1, the floor above),
## two step records (sys->metcp type 2: prm0 0 on the box floor = climb, prm0 1 on the floor above = the top) and
## a floor sound area (sys->mflrp type 1, 0.4 m wider, prm0 = param). Every frame the four sides get their blocked
## flags (attr 0x40000 -z / 0x100000 +z / 0x80000 +x / 0x200000 -x, bhCheckWallType2 0.02 m outside) and a box
## touched by the pushing player (attr 0x20000, psh_idx) moves with plp->spd. Metres (game units x 0.1).

## aspd -> [aw, ah, ad, pn]
const SIZES := {0: [4.5, 7.99, 4.5, 1], 6: [4.5, 7.99, 4.5, 1], 1: [2.5, 19.9, 6.0, 0], 2: [3.5, 29.9, 3.5, 0],
	3: [3.0, 18.0, 7.5, 0], 4: [5.0, 10.0, 2.5, 0], 5: [2.5, 10.0, 5.0, 0], 7: [2.25, 8.5, 5.5, 0]}
## sys->psh_snd by aspd (player action SE)
const SND := {0: 527, 6: 528, 1: 529, 3: 529, 2: 531, 4: 532, 5: 532}

var idx := 0
var node: Node3D
var aspd := 0
var aw := 0.45
var ah := 0.799
var ad := 0.45
var pn := 0
var flr := 0
var wal: Dictionary
var top: Dictionary
var etc_lo: Dictionary
var etc_hi: Dictionary
var flr_snd: Dictionary

func _init(i: int, n: Node3D, aspd_: int, param: int, flr_: int, room: Room, etc: Array, flrs: Array) -> void:
	idx = i; node = n; aspd = aspd_; flr = flr_
	var sz: Array = SIZES.get(aspd, [0.0, 0.0, 0.0, 0])
	aw = sz[0] * 0.1; ah = sz[1] * 0.1; ad = sz[2] * 0.1; pn = sz[3]
	var g := room.floor_height(flr)
	wal = {"s": {"k": "box"}, "sh": 0, "flr": flr, "attr": 0x10002, "y": g, "h": ah, "i": -1, "box": self}
	room.mwal.append(wal)
	if pn:
		var up := room.floor_num(0.9 + n.position.y)
		var gu := room.floor_height(up)
		top = {"s": {"k": "box"}, "sh": 7, "flr": up, "attr": 1, "y": gu, "h": -0.1, "i": -1, "box": self}
		room.mwal.append(top)
		etc_lo = {"flg": 0x81, "type": 2, "id": 0, "flr": flr, "attr": 0, "x": 0.0, "y": g, "z": 0.0, "w": 2 * aw, "h": 0.0, "d": 2 * ad, "prm": [0, 0, 0, 0]}
		etc_hi = {"flg": 0x81, "type": 2, "id": 0, "flr": up, "attr": 0, "x": 0.0, "y": gu, "z": 0.0, "w": 2 * aw, "h": 0.0, "d": 2 * ad, "prm": [1, 0, 0, 0]}
		flr_snd = {"flg": 0x81, "type": 1, "id": 0, "flr": up, "attr": 0, "x": 0.0, "y": gu, "z": 0.0, "w": 0.8 + 2 * aw, "h": 0.0, "d": 0.8 + 2 * ad, "prm": [param, 0, 0, 0]}
		etc.append(etc_lo); etc.append(etc_hi); flrs.append(flr_snd)
	_place()

func _place() -> void:
	var x := node.position.x; var z := node.position.z
	var s: Dictionary = wal.s
	s.x0 = x - aw; s.z0 = z - ad; s.x1 = x + aw; s.z1 = z + ad
	if pn:
		top.s = s
		etc_lo.x = x - aw; etc_lo.z = z - ad
		etc_hi.x = x - aw; etc_hi.z = z - ad
		flr_snd.x = x - aw - 0.4; flr_snd.z = z - ad - 0.4

## one 30 Hz frame of mode0 1; ps = the player's push state {ay, push, m3, spd, box}; returns true when the push
## has to stop (plp->mode3 = 6)
func tick(room: Room, ps: Dictionary) -> bool:
	var stop := false
	var a: int = wal.attr & ~0x3C0000
	var p := node.position
	if room.wall_type2(Vector3(p.x, p.y, p.z - ad - 0.02), aw - 0.01, 0.01, ah, self) != null: a |= 0x40000
	if room.wall_type2(Vector3(p.x, p.y, p.z + ad + 0.02), aw - 0.01, 0.01, ah, self) != null: a |= 0x100000
	if room.wall_type2(Vector3(p.x + aw + 0.02, p.y, p.z), 0.01, ad - 0.01, ah, self) != null: a |= 0x80000
	if room.wall_type2(Vector3(p.x - aw - 0.02, p.y, p.z), 0.01, ad - 0.01, ah, self) != null: a |= 0x200000
	if a & 0x20000:
		if ps.box != self:
			stop = true; a &= ~0x20000
		else:
			ps.snd = SND.get(aspd, 527)
			if ps.push and int(ps.m3) == 5:
				var ay := float(ps.ay) / 65536.0 * TAU
				p.x -= float(ps.spd) * sin(ay); p.z -= float(ps.spd) * cos(ay)
				p = room.wall2box(p, aw, ad, ah, flr, self)
				node.position = p
				var q := int(ps.ay) & 0xC000
				if (q == 0 and a & 0x40000) or (q == 0x4000 and a & 0x200000) or (q == 0x8000 and a & 0x100000) or (q == 0xC000 and a & 0x80000):
					stop = true
			else:
				a &= ~0x20000
	wal.attr = a
	_place()
	return stop
