extends Node
## Asset access (port of assets.ts): glTF scenes / JSON from res://assets (same paths as the web build),
## and the "Ninja chunk easy multi light" materials (to_lambert).

const ROOT := "res://assets/"
const DA := 178.0 / 255.0  # Ninja chunk material DA 0xb2b2b2: diffuse = ambient reflectance 0.7

var _scenes := {}
var _shaders := {}
var _mats := {}
var hidden_mat: ShaderMaterial

func _ready() -> void:
	var sh := Shader.new()
	sh.code = "shader_type spatial;\nrender_mode unshaded;\nvoid fragment(){ discard; }\n"
	hidden_mat = ShaderMaterial.new(); hidden_mat.shader = sh

func exists(p: String) -> bool:
	return ResourceLoader.exists(ROOT + p) or FileAccess.file_exists(ROOT + p)

## instantiated copy of a glTF scene (null when missing)
func scene(p: String) -> Node3D:
	var ps: PackedScene = _scenes.get(p)
	if ps == null:
		if not ResourceLoader.exists(ROOT + p):
			return null
		ps = load(ROOT + p)
		_scenes[p] = ps
	return ps.instantiate() as Node3D

func json(p: String, def: Variant = null) -> Variant:
	var f := FileAccess.open(ROOT + p, FileAccess.READ)
	if f == null:
		return def
	var v: Variant = JSON.parse_string(f.get_as_text())
	return def if v == null else v

func data_json(p: String) -> Variant:
	var f := FileAccess.open("res://data/" + p, FileAccess.READ)
	return JSON.parse_string(f.get_as_text()) if f else null

func texture(p: String) -> Texture2D:
	if not ResourceLoader.exists(ROOT + p):
		return null
	return load(ROOT + p)

## lighting shader: colour = texture * DA * (ambient(category) + sum light * N.L * range); computed in the stored
## (gamma) texture space like the console; the result is converted so that Godot's sRGB output shows the same value.
func _shader(blend: bool, scissor: bool, cull: bool, unlit: bool) -> Shader:
	var key := "%s%s%s%s" % [blend, scissor, cull, unlit]
	if _shaders.has(key):
		return _shaders[key]
	var rm := "unshaded, " + ("cull_back" if cull else "cull_disabled")
	if blend:
		rm += ", blend_mix, depth_draw_opaque"
	var c := "shader_type spatial;\nrender_mode %s;\n" % rm
	c += """
uniform sampler2D tex : filter_linear_mipmap_anisotropic, repeat_enable;
uniform vec4 col = vec4(1.0);
uniform int cat = 0;
uniform float da = 1.0;
uniform float alpha_cut = 0.5;
global uniform vec3 amb_rom; global uniform vec3 amb_chr; global uniform vec3 amb_obj; global uniform vec3 amb_itm;
global uniform vec4 pl_pos0; global uniform vec4 pl_pos1; global uniform vec4 pl_pos2;
global uniform vec3 pl_col0; global uniform vec3 pl_col1; global uniform vec3 pl_col2;
global uniform vec2 pl_rng0; global uniform vec2 pl_rng1; global uniform vec2 pl_rng2;
global uniform vec3 dl_dir; global uniform vec3 dl_col;
varying vec3 wn;
varying vec3 wp;
void vertex() {
	wn = (MODEL_MATRIX * vec4(NORMAL, 0.0)).xyz;
	wp = (MODEL_MATRIX * vec4(VERTEX, 1.0)).xyz;
}
vec3 pt(vec4 p, vec3 c, vec2 r, vec3 n) {
	if (p.w < 0.5) return vec3(0.0);
	vec3 d = p.xyz - wp; float L = length(d);
	float att = clamp((r.y - L) / max(r.y - r.x, 1e-4), 0.0, 1.0);
	return c * max(dot(n, d / max(L, 1e-5)), 0.0) * att;
}
vec3 s2l(vec3 c) { return clamp(c, 0.0, 1.0); }
void fragment() {
	vec4 t = texture(tex, UV) * col;
"""
	if scissor:
		c += "\tif (t.a < alpha_cut) discard;\n"
	if unlit:
		c += "\tALBEDO = s2l(t.rgb);\n"
	else:
		c += """	vec3 n = normalize(wn); if (!FRONT_FACING) n = -n;
	vec3 L;
	if (cat == 4) {
		L = vec3(0.55) + vec3(2.4 / 3.14159265) * max(dot(n, normalize(vec3(1.0, 2.0, 2.5))), 0.0)
			+ vec3(0.623, 0.816, 1.0) * (0.8 / 3.14159265) * max(dot(n, normalize(vec3(-2.0, -1.0, -1.0))), 0.0);
	} else {
		L = (cat == 0 ? amb_rom : (cat == 1 ? amb_chr : (cat == 2 ? amb_obj : amb_itm)));
		L += pt(pl_pos0, pl_col0, pl_rng0, n) + pt(pl_pos1, pl_col1, pl_rng1, n) + pt(pl_pos2, pl_col2, pl_rng2, n);
		L += dl_col * max(dot(n, -dl_dir), 0.0);
	}
	ALBEDO = s2l(t.rgb * da * L);
"""
	if blend:
		c += "\tALPHA = t.a;\n"
	c += "}\n"
	var sh := Shader.new(); sh.code = c
	_shaders[key] = sh
	return sh

const CATS := {"rom": 0, "chr": 1, "obj": 2, "itm": 3, "inv": 4}

## replace the imported (PBR) materials by the Ninja lighting ones; cat = rom | chr | obj | itm | inv
func to_lambert(root: Node, cat := "chr") -> void:
	for mi in find_meshes(root):
		var m: Mesh = mi.mesh
		if m == null:
			continue
		for i in m.get_surface_count():
			var src: Material = mi.get_surface_override_material(i)
			if src == null:
				src = m.surface_get_material(i)
			mi.set_surface_override_material(i, convert_mat(src, cat))

func convert_mat(src: Material, cat: String) -> Material:
	var key := [src, cat]
	if _mats.has(key):
		return _mats[key]
	var tex: Texture2D = null
	var colr := Color(1, 1, 1, 1)
	var blend := false
	var scissor := false
	var cull := true
	var cut := 0.5
	var unlit := false
	var nm := ""
	if src is BaseMaterial3D:
		var s := src as BaseMaterial3D
		tex = s.albedo_texture; colr = s.albedo_color; nm = s.resource_name
		blend = s.transparency == BaseMaterial3D.TRANSPARENCY_ALPHA or s.transparency == BaseMaterial3D.TRANSPARENCY_ALPHA_DEPTH_PRE_PASS
		scissor = s.transparency == BaseMaterial3D.TRANSPARENCY_ALPHA_SCISSOR
		cut = s.alpha_scissor_threshold
		cull = s.cull_mode == BaseMaterial3D.CULL_BACK
		unlit = s.shading_mode == BaseMaterial3D.SHADING_MODE_UNSHADED
	var out := ShaderMaterial.new()
	out.shader = _shader(blend, scissor, cull, unlit)
	out.resource_name = nm
	out.set_meta("cat", cat)
	out.set_meta("transparent", blend or scissor)
	if tex:
		out.set_shader_parameter("tex", tex)
	else:
		out.set_shader_parameter("tex", _white())
	out.set_shader_parameter("col", colr)
	out.set_shader_parameter("cat", CATS.get(cat, 1))
	out.set_shader_parameter("da", 1.0 if cat == "inv" else DA)
	out.set_shader_parameter("alpha_cut", cut)
	if blend:
		out.render_priority = 0
	_mats[key] = out
	return out

var _white_tex: Texture2D
func _white() -> Texture2D:
	if _white_tex == null:
		var im := Image.create(2, 2, false, Image.FORMAT_RGBA8); im.fill(Color.WHITE)
		_white_tex = ImageTexture.create_from_image(im)
	return _white_tex

static func find_meshes(root: Node, out: Array[MeshInstance3D] = []) -> Array[MeshInstance3D]:
	if root is MeshInstance3D:
		out.append(root)
	for c in root.get_children():
		find_meshes(c, out)
	return out

static func find_type(root: Node, cls: String) -> Node:
	if root.is_class(cls):
		return root
	for c in root.get_children():
		var r := find_type(c, cls)
		if r:
			return r
	return null

static func find_name(root: Node, nm: String) -> Node:
	if root.name == nm:
		return root
	for c in root.get_children():
		var r := find_name(c, nm)
		if r:
			return r
	return null
