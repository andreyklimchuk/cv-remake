@tool
class_name PlacedItem
extends Node3D
## Room item record (index = item number of the scripts, ITMSETCK / pick-up triggers point to it).
## The child is the item model scene (scenes/models/items/it_NNN.tscn).

@export var index := 0
@export var flags := "00000001"
@export var id := 0
@export var r3 := 0
@export var item_name := ""
@export var ex := "000000000000"
@export var rot := Vector3.ZERO

func to_record() -> Dictionary:
	return {"flags": flags, "id": id, "pos": [position.x, position.y, position.z], "rot": [rot.x, rot.y, rot.z], "r3": r3, "name": item_name, "ex": ex}
