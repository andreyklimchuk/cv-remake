class_name GameInput
extends RefCounted
## Port of input.ts: keys are tracked by their web KeyboardEvent.code names so the game logic stays identical.

var down := {}
var pressed := {}
var mdx := 0.0
var mdy := 0.0

static func code_of(ev: InputEvent) -> String:
	if ev is InputEventKey:
		var k: int = ev.physical_keycode if ev.physical_keycode != 0 else ev.keycode
		if k >= KEY_A and k <= KEY_Z:
			return "Key" + char(k)
		if k >= KEY_0 and k <= KEY_9:
			return "Digit" + char(k)
		match k:
			KEY_UP: return "ArrowUp"
			KEY_DOWN: return "ArrowDown"
			KEY_LEFT: return "ArrowLeft"
			KEY_RIGHT: return "ArrowRight"
			KEY_SPACE: return "Space"
			KEY_ENTER, KEY_KP_ENTER: return "Enter"
			KEY_ESCAPE: return "Escape"
			KEY_BACKSPACE: return "Backspace"
			KEY_TAB: return "Tab"
			KEY_SHIFT: return "ShiftLeft"
			KEY_CTRL: return "ControlLeft"
			KEY_F1: return "F1"
			KEY_QUOTELEFT: return "Backquote"
		return ""
	if ev is InputEventMouseButton:
		match ev.button_index:
			MOUSE_BUTTON_LEFT: return "Mouse0"
			MOUSE_BUTTON_MIDDLE: return "Mouse1"
			MOUSE_BUTTON_RIGHT: return "Mouse2"
	return ""

func handle(ev: InputEvent) -> void:
	if ev is InputEventMouseMotion:
		if Input.mouse_mode == Input.MOUSE_MODE_CAPTURED:
			mdx += ev.relative.x; mdy += ev.relative.y
		return
	var c := code_of(ev)
	if c == "":
		return
	var is_down: bool = ev.pressed
	if ev is InputEventKey and ev.echo:
		return
	if is_down:
		if not down.has(c):
			pressed[c] = true
		down[c] = true
	else:
		down.erase(c)

func clear() -> void:
	down.clear()

func has(codes: Array) -> bool:
	for c in codes:
		if down.has(c): return true
	return false

func hit(codes: Array) -> bool:
	for c in codes:
		if pressed.has(c): return true
	return false

var fwd: bool:
	get: return has(["KeyW", "ArrowUp"])
var back: bool:
	get: return has(["KeyS", "ArrowDown"])
var left: bool:
	get: return has(["KeyA", "ArrowLeft"])
var right: bool:
	get: return has(["KeyD", "ArrowRight"])
var strafe_l: bool:
	get: return has(["KeyA"])
var strafe_r: bool:
	get: return has(["KeyD"])
var cam_l: bool:
	get: return has(["ArrowLeft"])
var cam_r: bool:
	get: return has(["ArrowRight"])
var run: bool:
	get: return has(["ShiftLeft", "ShiftRight", "KeyX"])
var aim: bool:
	get: return has(["KeyF", "Mouse2", "ControlLeft", "ControlRight"])
var attack: bool:
	get: return hit(["KeyE", "Space", "Enter", "KeyZ", "Mouse0"])
var action: bool:
	get: return hit(["KeyE", "Space", "Enter", "KeyZ"])
var cancel: bool:
	get: return hit(["Escape", "Backspace", "KeyQ"])
var inventory: bool:
	get: return hit(["Tab", "KeyI"])
var cam_toggle: bool:
	get: return hit(["KeyC", "KeyV"])

func end_frame() -> void:
	pressed.clear(); mdx = 0.0; mdy = 0.0
