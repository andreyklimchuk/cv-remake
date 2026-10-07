extends Node3D
## dev tool: Claire clip + zombie clip side by side as the synchronised grab places them
##   godot --path . res://dev/pair_sheet.tscn -- z00 m00,m32 [front=1] [frames=6] [dist=0.42]
func _ready() -> void:
	var a := OS.get_cmdline_user_args()
	RenderingServer.global_shader_parameter_set("amb_chr", Vector3(1, 1, 1))
	RenderingServer.global_shader_parameter_set("dl_col", Vector3.ZERO)
	for i in 3: RenderingServer.global_shader_parameter_set("pl_pos%d" % i, Vector4(0, 0, 0, 0))
	var front := a.size() < 3 or a[2] == "1"
	var nf := int(a[3]) if a.size() > 3 else 6
	var dist := float(a[4]) if a.size() > 4 else 0.42
	var cam := Camera3D.new(); add_child(cam); cam.fov = 45
	cam.position = Vector3(2.6, 1.2, -0.2); cam.look_at(Vector3(0, 0.8, -0.2)); cam.current = true
	var env := WorldEnvironment.new(); env.environment = Environment.new(); env.environment.background_mode = Environment.BG_COLOR
	env.environment.background_color = Color(0.3, 0.35, 0.4); add_child(env)
	DirAccess.make_dir_recursive_absolute("res://shots")
	for zc in a[1].split(","):
		var c := EnemyModel.new(); add_child(c); c.load_model("chars/claire.glb")
		var z := EnemyModel.new(); add_child(z); z.load_model("enemies/en01a00.glb")
		# zombie at the origin facing -z; Claire 0.42 in front of it, facing it (front) or turned away
		z.rotation.y = 0.0
		c.position = Vector3(0, 0, -dist); c.rotation.y = PI if front else 0.0
		c.play(a[0], 0, false); z.play(zc, 0, false)
		var L := maxf(c.ap.get_animation(a[0]).length, z.ap.get_animation(zc).length)
		for k in nf:
			var t := L * k / maxf(1, nf - 1)
			c.ap.seek(minf(t, c.ap.get_animation(a[0]).length), true); z.ap.seek(minf(t, z.ap.get_animation(zc).length), true)
			await RenderingServer.frame_post_draw
			await RenderingServer.frame_post_draw
			var img := get_viewport().get_texture().get_image(); img.resize(256, 192)
			img.save_png("res://shots/pair_%s_%s_%02d.png" % [a[0], zc, k])
		c.queue_free(); z.queue_free()
		await get_tree().process_frame
	get_tree().quit()
