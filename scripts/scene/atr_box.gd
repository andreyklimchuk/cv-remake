@tool
class_name AtrBox
extends Node3D
## ATR record of a room (trigger / collision / floor area). Position = (x, y, z), size = (sx, sy, sz) as stored
## (the box spans position .. position + size). type / flags are the original hex words, extra the parameter word.

@export_enum("trigger", "collision", "area") var kind := "trigger":
	set(v): kind = v; _gizmo()
@export var size := Vector3.ONE:
	set(v): size = v; _gizmo()
@export var type_hex := "0"
@export var flags_hex := "0"
@export var extra := 0

const COLORS := {"trigger": Color(1, 0.8, 0.1, 0.25), "collision": Color(1, 0.2, 0.2, 0.25), "area": Color(0.2, 0.6, 1, 0.25)}
var _g: MeshInstance3D

func _ready() -> void:
	_gizmo()

## editor only: translucent box (not saved with the scene)
func _gizmo() -> void:
	if not Engine.is_editor_hint() or not is_inside_tree():
		return
	if _g == null:
		_g = MeshInstance3D.new(); add_child(_g)
		var m := StandardMaterial3D.new(); m.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
		m.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED; m.cull_mode = BaseMaterial3D.CULL_DISABLED
		m.no_depth_test = false; _g.material_override = m
		_g.mesh = BoxMesh.new()
	var s := Vector3(maxf(absf(size.x), 0.02), maxf(absf(size.y), 0.05), maxf(absf(size.z), 0.02))
	(_g.mesh as BoxMesh).size = s
	_g.position = Vector3(size.x * 0.5, size.y * 0.5 if absf(size.y) > 0.001 else 0.025, size.z * 0.5)
	(_g.material_override as StandardMaterial3D).albedo_color = COLORS.get(kind, Color(1, 1, 1, 0.25))

func to_record() -> Dictionary:
	return {"type": type_hex, "flags": flags_hex, "x": position.x, "y": position.y, "z": position.z,
		"sx": size.x, "sy": size.y, "sz": size.z, "extra": extra}
