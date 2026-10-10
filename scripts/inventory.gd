class_name Inventory
extends RefCounted
## Port of inventory.ts: 8 slots of {id, name, count}; ammo (12) and ink ribbons (31) stack.
## Items with itemdata type 0x100 (sub1.c: rocket launcher, rifles, Gold Lugers, SMG, M-100P) take two slots side by side:
## sorted first like ItemSort, picking one up needs two free slots (ItemGet: num2 >= 2). The second slot holds a tail
## marker (id -1).

const STACK := [12, 31]
## itemdata[id].type & 0x100 (item.c)
const WIDE := [1, 2, 3, 33, 34, 142]
var slots: Array = [null, null, null, null, null, null, null, null]

static func is_wide(id: int) -> bool:
	return WIDE.has(id)

static func is_tail(s: Variant) -> bool:
	return s != null and int(s.id) == -1

func free_count() -> int:
	var n := 0
	for s in slots:
		if s == null: n += 1
	return n

func add(id: int, name_: String, count := 1) -> bool:
	if STACK.has(id):
		for s in slots:
			if s != null and s.id == id:
				s.count += count; return true
	if free_count() < (2 if is_wide(id) else 1): return false
	slots[slots.find(null)] = {"id": id, "name": name_, "count": count}
	sort()
	return true

## ItemSort (sub1.c): two-slot items first (each followed by its tail), then the others in their order (compacted);
## tails of removed items are dropped
func sort() -> void:
	var out: Array = []
	for s in slots:
		if s != null and not is_tail(s) and is_wide(int(s.id)):
			out.append(s); out.append({"id": -1, "name": "", "count": 0})
	for s in slots:
		if s != null and not is_tail(s) and not is_wide(int(s.id)): out.append(s)
	while out.size() < 8: out.append(null)
	slots = out.slice(0, 8)

## room for one more of this item
func can_add(id: int) -> bool:
	if STACK.has(id) and has(id): return true
	return free_count() >= (2 if is_wide(id) else 1)

func has(id: int) -> bool:
	for s in slots:
		if s != null and s.id == id: return true
	return false

func find(id: int) -> Variant:
	for s in slots:
		if s != null and s.id == id: return s
	return null

## the item shown in slot i (a tail -> its two-slot item)
func head(i: int) -> int:
	return i - 1 if i > 0 and i < slots.size() and is_tail(slots[i]) else i

func take(id: int) -> bool:
	for i in 8:
		var s: Variant = slots[i]
		if s != null and s.id == id:
			s.count -= 1
			if s.count <= 0:
				slots[i] = null; sort()
			return true
	return false
