class_name WeaponAmmo
extends RefCounted
## Native Combi_01, Combi_02, Combi_04 (sub1.c). Base item id stays in `id`;
## `ammo` stores the loaded item kind (the original pip 0x7000 bits).
const AMMO := [15, 16, 17, 18, 36, 37]
const POWDER := [35, 130]
const GL_AMMO := [15, 16, 17, 37]

static func loaded(w: Dictionary) -> int:
	return int(w.get("ammo", 18 if int(w.id) == 7 else 15))

static func weapon_no(w: Dictionary) -> int:
	if int(w.id) == 7: return 19 if loaded(w) == 36 else 10
	if int(w.id) == 6: return 14 + GL_AMMO.find(loaded(w))
	return 9 if int(w.id) == 142 else 4

static func _kind(s: Dictionary, id: int) -> void:
	s.id = id; s.name = Text.ITEM_NAMES.get(id, ""); s.erase("ammo")

## -1 = unrelated pair, 0 = refused without mutation, 1 = combined.
## Selection order has no effect on the result; no free slot is needed for a swap.
static func combine(inv: Inventory, a: int, b: int) -> int:
	if a == b: return -1
	var A: Variant = inv.slots[a]; var B: Variant = inv.slots[b]
	if A == null or B == null: return -1
	var wi := a if int(A.id) in [6, 7] else (b if int(B.id) in [6, 7] else -1)
	if wi >= 0:
		var mi := b if wi == a else a
		var w: Dictionary = inv.slots[wi]; var m: Dictionary = inv.slots[mi]
		var old := loaded(w); var mid := int(m.id)
		var valid := GL_AMMO.has(mid) if int(w.id) == 6 else (mid in [18, 36] or POWDER.has(mid))
		if not valid: return -1
		var wc := int(w.count); var mc := int(m.count)
		if POWDER.has(mid):
			# Powder only combines with regular loaded arrows (native combidata).
			if old != 18 or wc <= 0 or mc <= 0: return 0
			w.ammo = 36
			if wc < mc:
				m.count = mc - wc; _kind(m, 35)
			else:
				w.count = mc; m.count = wc - mc; _kind(m, old)
		elif old == mid:
			var n := mini(999 - wc, mc)
			if n <= 0: return 0
			w.count = wc + n; m.count = mc - n
		else:
			# Different ammo: return the old load to the source slot, never discard it.
			w.ammo = mid; w.count = mc; m.count = wc; _kind(m, old)
		if int(m.count) == 0: inv.slots[mi] = null
		return 1
	if POWDER.has(int(A.id)) and POWDER.has(int(B.id)):
		var n := mini(999 - int(B.count), int(A.count))
		if n <= 0: return 0
		B.count += n; A.count -= n; _kind(B, 35)
		if int(A.count) == 0: inv.slots[a] = null
		return 1
	# Gun Powder Arrow creation from loose arrows and Bow Gun Powder.
	var pi := a if POWDER.has(int(A.id)) else (b if POWDER.has(int(B.id)) else -1)
	if pi >= 0:
		var ai := b if pi == a else a
		var p: Dictionary = inv.slots[pi]; var arrows: Dictionary = inv.slots[ai]
		if int(arrows.id) != 18: return -1
		if int(p.count) <= 0 or int(arrows.count) <= 0: return 0
		if int(arrows.count) <= int(p.count):
			p.count -= int(arrows.count); _kind(arrows, 36)
			if int(p.count) == 0: inv.slots[pi] = null
		else:
			arrows.count -= int(p.count); _kind(p, 36)
		return 1
	if int(A.id) == int(B.id) and AMMO.has(int(A.id)):
		var n := mini(999 - int(B.count), int(A.count))
		if n <= 0: return 0
		B.count += n; A.count -= n
		if int(A.count) == 0: inv.slots[a] = null
		return 1
	return -1

static func label(w: Dictionary) -> String:
	if int(w.id) not in [6, 7]: return Text.item_name(w.name)
	return "%s · %s" % [Text.item_name(w.name), Text.item_name(Text.ITEM_NAMES.get(loaded(w), ""))]
