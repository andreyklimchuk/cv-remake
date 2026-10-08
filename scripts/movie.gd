class_name Movie
extends RefCounted
## Full-screen FMV playback (port of movie.ts): the original PAMF movies re-encoded to Ogg Theora
## (res://assets/movies/mv_NNN.ogv). Returns when finished or skipped (Enter / Space / Esc / E / click).

static func play(parent: Node, name_: String) -> void:
	var path := "res://assets/movies/%s.ogv" % name_
	if not ResourceLoader.exists(path):
		return
	var layer := CanvasLayer.new(); layer.layer = 20
	parent.add_child(layer)
	var bg := ColorRect.new(); bg.color = Color.BLACK; bg.size = Vector2(1024, 768)
	layer.add_child(bg)
	var v := VideoStreamPlayer.new()
	v.stream = load(path)
	v.expand = true
	v.size = Vector2(1024, 768)
	layer.add_child(v)
	var info := Label.new()
	info.text = "Enter / Esc — пропустить" if Text.ru() else "Enter / Esc — skip"
	info.add_theme_font_size_override("font_size", 12); info.add_theme_color_override("font_color", Color8(0x77, 0x77, 0x77))
	info.position = Vector2(1024 * 0.78, 768 * 0.94)
	layer.add_child(info)
	var st := {"done": false}
	v.finished.connect(func() -> void: st.done = true)
	var catcher := _Skip.new(); catcher.st = st
	layer.add_child(catcher)
	v.play()
	var tree := parent.get_tree()
	var t := 0.0
	var fitted := false
	while not st.done and is_instance_valid(v):
		await tree.process_frame
		t += parent.get_process_delta_time()
		# keep the movie's aspect (the PAMF movies are 640x320): letterboxed like object-fit: contain
		var tex := v.get_video_texture()
		if not fitted and tex != null and tex.get_width() > 0 and tex.get_height() > 0:
			fitted = true
			var k := minf(1024.0 / tex.get_width(), 768.0 / tex.get_height())
			v.size = Vector2(tex.get_width(), tex.get_height()) * k
			v.position = (Vector2(1024, 768) - v.size) / 2
		if t > 4.0: info.visible = false
		if not v.is_playing() and t > 1.0: st.done = true
	layer.queue_free()

class _Skip extends Node:
	var st: Dictionary
	func _input(ev: InputEvent) -> void:
		var c := GameInput.code_of(ev)
		if (ev is InputEventKey or ev is InputEventMouseButton) and ev.pressed and c in ["Enter", "Space", "Escape", "KeyE", "Mouse0"]:
			st.done = true
			get_viewport().set_input_as_handled()
