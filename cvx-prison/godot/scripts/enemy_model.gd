class_name EnemyModel
extends Node3D
## An original skinned model (SKIN + Ninja MDL) with its motion bank (port of enemy.ts EnemyModel).
## The AnimationPlayer runs in manual mode (advance(dt) from the game loop), like three's AnimationMixer.update.

var model: Node3D
var ap: AnimationPlayer
var skel: Skeleton3D
var cur := ""
## skeleton bones bNN (original node numbering) -> bone index
var bones := {}

func load_model(file: String, cat := "chr") -> EnemyModel:
	model = Assets.scene(file)
	Assets.to_lambert(model, cat)
	add_child(model)
	ap = Assets.find_type(model, "AnimationPlayer") as AnimationPlayer
	skel = Assets.find_type(model, "Skeleton3D") as Skeleton3D
	if ap:
		ap.callback_mode_process = AnimationMixer.ANIMATION_CALLBACK_MODE_PROCESS_MANUAL
		ap.deterministic = false
	if skel:
		for i in skel.get_bone_count():
			var n := skel.get_bone_name(i)
			if not bones.has(n):
				bones[n] = i
	for mi in Assets.find_meshes(model):
		mi.extra_cull_margin = 2.0
	return self

func has_clip(name_: String) -> bool:
	return ap != null and ap.has_animation(name_)

func play(name_: String, fade := 0.2, loop := true, speed := 1.0) -> bool:
	if cur == name_:
		return true
	if not has_clip(name_):
		return false
	var a := ap.get_animation(name_)
	a.loop_mode = Animation.LOOP_LINEAR if loop else Animation.LOOP_NONE
	var same := ap.current_animation == name_
	ap.speed_scale = 1.0
	ap.play(name_, fade if (fade > 0 and ap.is_playing()) else 0.0, speed)
	if same:
		ap.seek(0.0, true)
	cur = name_
	return true

var clip_len: float:
	get: return ap.get_animation(cur).length if cur != "" and has_clip(cur) else 0.0

func update(dt: float) -> void:
	if ap:
		ap.advance(dt)

## world transform of a bone
func bone_xform(i: int) -> Transform3D:
	return skel.global_transform * skel.get_bone_global_pose(i)

## node for a bone name: returns null when missing (the caller falls back to the root)
func bone_index(nm: String) -> int:
	return bones.get(nm, -1)
