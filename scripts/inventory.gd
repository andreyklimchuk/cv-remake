class_name Inventory
extends RefCounted
## Port of inventory.ts: 8 slots of {id, name, count}; ammo (12) and ink ribbons (31) stack.

const STACK := [12, 31]
var slots: Array = [null, null, null, null, null, null, null, null]

func add(id: int, name_: String, count := 1) -> bool:
	if STACK.has(id):
		for s in slots:
			if s != null and s.id == id:
				s.count += count; return true
	for i in 8:
		if slots[i] == null:
			slots[i] = {"id": id, "name": name_, "count": count}; return true
	return false

## room for one more of this item
func can_add(id: int) -> bool:
	return (STACK.has(id) and has(id)) or slots.has(null)

func has(id: int) -> bool:
	for s in slots:
		if s != null and s.id == id: return true
	return false

func find(id: int) -> Variant:
	for s in slots:
		if s != null and s.id == id: return s
	return null

func take(id: int) -> bool:
	for i in 8:
		var s: Variant = slots[i]
		if s != null and s.id == id:
			s.count -= 1
			if s.count <= 0: slots[i] = null
			return true
	return false
