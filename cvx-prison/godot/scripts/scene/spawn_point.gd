@tool
class_name SpawnPoint
extends Marker3D
## Entry position of the room (door arrival pos_no = index among the Spawns children); rotation.y = facing.

@export var raw := 0

func to_record() -> Dictionary:
	return {"pos": [position.x, position.y, position.z], "ang": rotation.y, "raw": raw}
