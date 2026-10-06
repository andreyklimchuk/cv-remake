@tool
class_name RoomLight
extends Node3D
## LGT_WORK record (light.c): room light table (Lights) or event light table (EventLights).
## Position = p; c = colour (may exceed 1), nr / fr = full / zero range (metres), lsrc 4 = point, 2 = directional,
## type = animation (1..6 flicker, 8/9 rotating, 12 blink, 13/101 fade, 100 one frame); flg bit 0 = on.
## rec keeps the remaining fields (lkflg / lkno / lkono link, l, v, spc, dif, amb, ang, aspd).

@export var flg := 1
@export var type := 0
@export var lsrc := 4
@export var c := Vector3.ONE:
	set(v): c = v; _gizmo()
@export var nr := 0.0
@export var fr := 1.0
@export var rec: Dictionary = {}

var _g: MeshInstance3D

func _ready() -> void:
	_gizmo()

func _gizmo() -> void:
	if not Engine.is_editor_hint() or not is_inside_tree():
		return
	if _g == null:
		_g = MeshInstance3D.new(); add_child(_g)
		var s := SphereMesh.new(); s.radius = 0.06; s.height = 0.12; _g.mesh = s
		var m := StandardMaterial3D.new(); m.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED; _g.material_override = m
	var k := maxf(1.0, maxf(c.x, maxf(c.y, c.z)))
	(_g.material_override as StandardMaterial3D).albedo_color = Color(c.x / k, c.y / k, c.z / k)

func to_record() -> Dictionary:
	var d := rec.duplicate(true)
	d.flg = flg; d.type = type; d.lsrc = lsrc; d.c = [c.x, c.y, c.z]; d.nr = nr; d.fr = fr
	d.p = [position.x, position.y, position.z]
	return d
