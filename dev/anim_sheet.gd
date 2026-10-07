extends Node3D
## dev tool: renders frames of clips of a model -> shots/anim_<model>_<clip>.png
##   godot --path . res://dev/anim_sheet.tscn -- chars/claire.glb z00,z01 [frames] [yaw_deg]
var cam: Camera3D

func _ready() -> void:
	var a := OS.get_cmdline_user_args()
	var m := EnemyModel.new(); add_child(m); m.load_model(a[0])
	RenderingServer.global_shader_parameter_set("amb_chr", Vector3(1, 1, 1))
	RenderingServer.global_shader_parameter_set("dl_col", Vector3.ZERO)
	for i in 3: RenderingServer.global_shader_parameter_set("pl_pos%d" % i, Vector4(0, 0, 0, 0))
	var nf := int(a[2]) if a.size() > 2 else 6
	m.rotation.y = deg_to_rad(float(a[3])) if a.size() > 3 else 0.0
	cam = Camera3D.new(); add_child(cam); cam.fov = 40
	cam.position = Vector3(1.3, 1.1, 2.0); cam.look_at(Vector3(0, 0.75, 0)); cam.current = true
	var env := WorldEnvironment.new(); env.environment = Environment.new(); env.environment.background_mode = Environment.BG_COLOR
	env.environment.background_color = Color(0.25, 0.3, 0.35); add_child(env)
	var clips: Array = a[1].split(",") if a[1] != "all" else Array(m.ap.get_animation_list())
	DirAccess.make_dir_recursive_absolute("res://shots")
	for c in clips:
		if not m.has_clip(c): continue
		var L := m.ap.get_animation(c).length
		m.cur = ""; m.play(c, 0, false)
		for k in nf:
			m.ap.seek(L * k / maxf(1, nf - 1), true)
			await RenderingServer.frame_post_draw
			await RenderingServer.frame_post_draw
			var img := get_viewport().get_texture().get_image()
			img.resize(256, 192)
			img.save_png("res://shots/anim_%s_%02d.png" % [c, k])
		print("clip ", c, " len ", L)
	get_tree().quit()
