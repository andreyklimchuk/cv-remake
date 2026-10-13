class_name WeaponDamage
extends RefCounted
## weapon.c EneDamNear/Mid/Far + zonzon1.c bhEne_CalcDamage.
## All joint corrections of en01/en04 are zero; retain native combo counters.
var table: Dictionary = Assets.data_json("weapondata.json")
var states := {}

func frame() -> void:
	for s in states.values(): s.timeout = maxi(0, int(s.timeout) - 1)

func reset() -> void:
	states.clear()

func base(enemy: int, weapon: int, distance: float, fly := false, far := false) -> int:
	var tier := "EneDamFar" if far else ("EneDamNear" if distance < 1.5 else ("EneDamMid" if fly or distance < 4.0 else "EneDamFar"))
	return int(table[tier][enemy][weapon])

func amount(z: Variant, weapon: int, distance: float, fly := false, far := false, override := -1) -> int:
	var enemy := 1 if z is Zombie else 4
	var damage := base(enemy, weapon, distance, fly, far) if override < 0 else override
	if damage <= 0: return 0
	var key: int = z.get_instance_id()
	if not states.has(key): states[key] = {"weapon": -1, "points": 0, "timeout": 0}
	var s: Dictionary = states[key]
	var combo: Array = table["en%02d_combo" % enemy][weapon]
	if int(s.weapon) != weapon or int(s.timeout) == 0: s.points = 0
	s.weapon = weapon; s.timeout = int(combo[4])
	var tier := 2 if far or (not fly and distance >= 4.0) else (0 if distance < 1.5 else 1)
	s.points += int(combo[1 + tier])
	if int(combo[0]) != 0 and int(s.points) >= int(combo[0]):
		s.points = 0
		damage += int(damage * int(combo[5]) / 100)
	return damage
