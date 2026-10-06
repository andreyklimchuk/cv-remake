@tool
class_name RoomScene
extends Node3D
## Editable layout of a room (scenes/rooms/rm_XXXX.tscn), generated from the converted PS3 data by
## tools/build_scenes.gd. The game reads everything below from the nodes (move / rotate / add / delete them
## in the editor): Model (room model), Objects, Items, Enemies, Spawns, Cameras, Triggers, Collision, Areas,
## Lights, EventLights. Order of the children = record number used by the event scripts.
## Not in the scene (stays in assets/rooms/ID.json and assets/evt/ID.json): messages, ambient table, event scripts.

@export var room_id := ""

func _group(n: String) -> Array:
	var g := get_node_or_null(n)
	return g.get_children() if g else []

func _recs(n: String) -> Array:
	var out := []
	for c in _group(n):
		if c.has_method("to_record"): out.append(c.to_record())
	return out

## room data dictionary (same layout as the JSON of the web build) with the records taken from the nodes
func collect(base: Dictionary) -> Dictionary:
	var d := base.duplicate(true)
	d.id = room_id if room_id != "" else d.get("id", "")
	d.triggers = _recs("Triggers"); d.collision = _recs("Collision"); d.areas = _recs("Areas")
	d.spawns = _recs("Spawns"); d.cameras = _recs("Cameras")
	d.lgt = _recs("Lights"); d.evl = _recs("EventLights")
	d.objects = []; d.items = []; d.enemies = []
	for c in _group("Objects"): d.objects.append(c.to_record())
	for c in _group("Items"): d.items.append(c.to_record())
	for c in _group("Enemies"): d.enemies.append(c.to_record())
	return d

func model() -> Node3D: return get_node_or_null("Model") as Node3D
func objects() -> Array: return _group("Objects")
func items() -> Array: return _group("Items")
