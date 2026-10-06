@tool
class_name EnemySpawn
extends Node3D
## Enemy / character record of the room (index = enemy work number of the scripts).
## id: 1 zombie (en01aVV), 4 dog, 67 cockroaches, 91.. cutscene characters; VV = model variant (ex bytes 3).
## rotation.y = the facing the game uses (rot.z for walking zombies / dogs, rot.y otherwise).
## In the editor a preview of the model is shown (not saved).

@export var index := 0
@export var id := 0:
	set(v): id = v; _preview()
@export var flags := "00000001"
@export var r3 := 0
@export var ex := "000000000000":
	set(v): ex = v; _preview()
@export var rot := Vector3.ZERO
@export var room_id := ""

var _pv: Node3D

static func heading_axis(e_id: int, ex_: String, room: String) -> int:
	var type := ex_.substr(0, 4).hex_to_int()
	var lying := e_id == 1 and type == 0 and room.begins_with("rm_002")
	return 2 if (e_id == 1 and not lying) or e_id == 4 else 1

func model_path() -> String:
	var v := ex.substr(6, 2).hex_to_int()
	var m := "en%02da%02d" % [id, v]
	if id == 4: m = "en04a00"
	if id == 67: m = "en67a00"
	for d in ["enemies", "npc"]:
		var p := "res://scenes/models/%s/%s.tscn" % [d, m]
		if ResourceLoader.exists(p): return p
	return ""

func _ready() -> void:
	_preview()

func _preview() -> void:
	if not Engine.is_editor_hint() or not is_inside_tree():
		return
	if _pv: _pv.queue_free(); _pv = null
	var p := model_path()
	if p == "": return
	var ps: PackedScene = load(p)
	if ps: _pv = ps.instantiate(); add_child(_pv)

func to_record() -> Dictionary:
	var r := [rot.x, rot.y, rot.z]
	r[heading_axis(id, ex, room_id)] = rotation.y
	return {"flags": flags, "id": id, "pos": [position.x, position.y, position.z], "rot": r, "r3": r3, "ex": ex}
