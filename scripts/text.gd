extends Node
## Original texts (sysmes / room messages) and their Russian translations (port of text.ts + sysmes.ts).

var LANG := "ru"
var RU := {}
var ITEM_RU := {}
var ITEM_NAMES := {}   # int -> String (PS3 system message file)
var SYSMES := {}       # int -> String
var _re_item := RegEx.create_from_string("\\{3:([0-9a-f]+)\\}")
var _re_01 := RegEx.create_from_string("<0>|<1>")
var _re_yn := RegEx.create_from_string("\\n\\s*\\{4:39\\}es\\s+\\{4:2e\\}o")
var _re_tag := RegEx.create_from_string("\\{[0-9a-f]+:[0-9a-f]+\\}")
var _re_lead := RegEx.create_from_string("^\\n+")
var _re_choice := RegEx.create_from_string("\\{4:39\\}es")

func _ready() -> void:
	var cfg := ConfigFile.new()
	if cfg.load("user://settings.cfg") == OK:
		LANG = cfg.get_value("ui", "lang", "ru")
	var t: Dictionary = Assets.data_json("text_ru.json")
	RU = t.RU; ITEM_RU = t.ITEM_RU
	var s: Dictionary = Assets.data_json("sysmes.json")
	# {0d} = the hyphen glyph of the original font (TG{0d}01 -> TG-01)
	for k in s.ITEM_NAMES: ITEM_NAMES[int(k)] = String(s.ITEM_NAMES[k]).replace("{0d}", "-")
	for k in s.SYSMES: SYSMES[int(k)] = s.SYSMES[k]

func set_lang(l: String) -> void:
	LANG = l
	var cfg := ConfigFile.new(); cfg.load("user://settings.cfg")
	cfg.set_value("ui", "lang", l); cfg.save("user://settings.cfg")

func ru() -> bool:
	return LANG == "ru"

## does the original message end with the Yes/No question?
func has_choice(msg: String) -> bool:
	return _re_choice.search(msg) != null

## Split an original message into pages (form-feed separated) and translate each page.
## {3:XX} is the name of item XX ({3:ffff} = the item in question, sb).
func pages(msg: String, sb := 0) -> PackedStringArray:
	var names: Array[String] = []
	var m := ""
	var last := 0
	for r in _re_item.search_all(msg):
		m += msg.substr(last, r.get_start() - last)
		var h := r.get_string(1)
		var id := sb if h == "ffff" else h.hex_to_int()
		names.append(String(ITEM_NAMES.get(id, "")).replace("{0d}", "-"))
		m += "\u0001"
		last = r.get_end()
	m += msg.substr(last)
	m = _re_01.sub(m, "", true)
	m = _re_yn.sub(m, "", true)
	m = m.replace("{0d}", "-")
	var out := PackedStringArray()
	var k := 0
	for p0 in m.split("\f"):
		var p := _re_tag.sub(_re_lead.sub(p0, ""), "", true).rstrip(" \t\n\r")
		if p.strip_edges() == "":
			continue
		var key := p.replace("\u0001", "{N}")
		var t: String = key if LANG == "en" else RU.get(key, RU.get(key.strip_edges(), key))
		while t.find("{N}") >= 0:
			var nmv: String = names[k] if k < names.size() else ""
			k += 1
			t = _replace_first(t, "{N}", item_name(nmv))
		out.append(t)
	return out

static func _replace_first(s: String, what: String, with: String) -> String:
	var i := s.find(what)
	return s if i < 0 else s.substr(0, i) + with + s.substr(i + what.length())

func item_name(en: String) -> String:
	return ITEM_RU.get(en, en) if LANG == "ru" else en

# ---- UI strings (ui.ts UI)
func yes() -> String: return "Да" if ru() else "Yes"
func no() -> String: return "Нет" if ru() else "No"
func saved() -> String: return "Игра сохранена." if ru() else "Game saved."
func cam_fixed() -> String: return "Камера: фиксированная" if ru() else "Camera: fixed"
func cam_behind() -> String: return "Камера: от плеча (мышь — обзор)" if ru() else "Camera: over the shoulder (mouse to look)"
