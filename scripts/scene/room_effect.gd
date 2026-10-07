@tool
class_name RoomEffect
extends Node3D
## EF table record of the room (bhSetEffectTb): one effect work, e.g. 100 rain, 101 rain splashes, 102 wind,
## 103 smoke / sparks, 116..119 fire, 154..182 room sprites, 201 / 218 lamps. Order of the children = efid slot
## used by the event scripts (bhEffDispSet / bhEffModeSet / WORK 4 n).
## Position = p (metres), s = size / parameters, ax / ay = angles (65536 = 360 deg), lk = link record (hex).
## In the editor the rain record (100) shows a preview of the drops around the node.

@export var flg := 1
@export var id := 0:
	set(v): id = v; _gizmo()
@export var type := 0
@export var flr := 0
@export var mdlver := 0
@export var s := Vector3.ZERO
@export var ax := 0
@export var ay := 0
@export var lk := ""

var _g: MeshInstance3D

func _ready() -> void:
	_gizmo()

func _gizmo() -> void:
	if not Engine.is_editor_hint() or not is_inside_tree():
		return
	if _g == null:
		_g = MeshInstance3D.new(); add_child(_g)
		var m := StandardMaterial3D.new(); m.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
		m.vertex_color_use_as_albedo = true; m.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
		_g.material_override = m
	var im := ImmediateMesh.new()
	im.surface_begin(Mesh.PRIMITIVE_LINES)
	if id == 100:
		# rain preview: 77 drops like bhEff100 (8 m square, 8 m high, 1.4 m streaks)
		var rng := RandomNumberGenerator.new(); rng.seed = 100
		for i in 77:
			var p := Vector3(rng.randf_range(-4, 4), rng.randf_range(0, 8), rng.randf_range(-4, 4))
			im.surface_set_color(Color(0.8, 0.85, 1.0, 0.15)); im.surface_add_vertex(p + Vector3(0, 0.7, 0))
			im.surface_set_color(Color(0.8, 0.85, 1.0, 0.7)); im.surface_add_vertex(p - Vector3(0, 0.7, 0))
	else:
		var c := Color(1, 0.6, 0.2) if id >= 100 else Color(0.4, 1, 0.6)
		for a in [Vector3(0.15, 0, 0), Vector3(0, 0.15, 0), Vector3(0, 0, 0.15)]:
			im.surface_set_color(c); im.surface_add_vertex(-a)
			im.surface_set_color(c); im.surface_add_vertex(a)
	im.surface_end()
	_g.mesh = im

func to_record() -> Dictionary:
	return {"flg": flg, "id": id, "type": type, "flr": flr, "mdlver": mdlver,
		"p": [position.x * 10.0, position.y * 10.0, position.z * 10.0], "s": [s.x, s.y, s.z], "ax": ax, "ay": ay, "lk": lk}
