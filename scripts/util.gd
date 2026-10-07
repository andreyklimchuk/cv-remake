class_name U
## small helpers shared by the port (three.js conventions -> Godot)

static func pad(n: int, w: int) -> String:
	return str(n).pad_zeros(w)

## three.js Euler (same matrix order letters as Godot's EulerOrder)
static func euler(x: float, y: float, z: float, order: int) -> Basis:
	return Basis.from_euler(Vector3(x, y, z), order)

## position + rotation (Euler) + uniform scale, like three's T * R * S
static func trs(p: Vector3, b: Basis, s: float) -> Transform3D:
	return Transform3D(b * Basis.from_scale(Vector3.ONE * s) if s != 1.0 else b, p)

static func v3(a: Array) -> Vector3:
	return Vector3(float(a[0]), float(a[1]), float(a[2]))

static func wrap_pi(a: float) -> float:
	return atan2(sin(a), cos(a))

## transform of node n relative to ancestor `top` (works before the nodes are in the scene tree)
static func rel_xform(n: Node, top: Node) -> Transform3D:
	var t := Transform3D()
	var c := n
	while c != null and c != top:
		if c is Node3D:
			t = (c as Node3D).transform * t
		c = c.get_parent()
	return t

## world rotation of a basis without scale
static func rot_q(b: Basis) -> Quaternion:
	return b.orthonormalized().get_rotation_quaternion()
