@tool
class_name RoomCam
extends Camera3D
## Fixed camera of the room. The node transform is the stored position / pitch / yaw / roll
## (select it and use "Preview" in the editor to see the original framing). `rec` keeps the other fields
## (zone, flags, pan / tracking limits, hide masks hid / hidl, raw).

@export var rec: Dictionary = {}

static func basis_of(pitch: float, yaw: float, roll: float) -> Basis:
	return Basis.from_euler(Vector3(-pitch, yaw, roll), EULER_ORDER_YXZ)

func to_record() -> Dictionary:
	var d := rec.duplicate(true)
	var e := transform.basis.orthonormalized().get_euler(EULER_ORDER_YXZ)
	d.pos = [position.x, position.y, position.z]
	d.pitch = -e.x; d.yaw = e.y; d.roll = e.z
	return d
