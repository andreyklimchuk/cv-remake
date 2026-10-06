@tool
class_name PlacedObject
extends Node3D
## Room object record (index = its number used by the event scripts). The child is the model scene
## (scenes/models/objects/<model>.tscn). Records with flags 00000000 or without model are not drawn.

@export var index := 0
@export var flags := "00000000"
@export var id := 0
@export var r3 := 0
@export var model := ""
@export var ex := "000000000000"
## original placement as stored (the node transform is what the game uses)
@export var pos := Vector3.ZERO
@export var rot := Vector3.ZERO

var drawn: bool:
	get: return model != "" and flags != "00000000"

func to_record() -> Dictionary:
	return {"flags": flags, "id": id, "pos": [position.x, position.y, position.z], "rot": [rot.x, rot.y, rot.z], "r3": r3, "model": model, "ex": ex}
