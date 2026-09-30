# Blender-пайплайн персонажей (Python / bpy 5.1)

Все модели генерируются кодом из этих скриптов и сохраняются в `assets/blender/*.blend`
(с упакованными текстурами) + экспортируются в `src/assets/models/*.glb` для игры.

Требования: `pip install bpy==5.1.2` (Blender как Python-модуль) или запуск через
`blender -b -P script.py`. База анатомии — **Blender Studio Human Base Meshes v1.4.1 (CC0)**,
положить в `/data/assets_src/hbm/human-base-meshes-bundle-v1.4.1/human_base_meshes_bundle.blend`
(пути в `lib.py` при необходимости поправить).

| Скрипт | Что делает |
|---|---|
| `claire_s1.py` | тело (multires 1 для игры, multires 3 для запекания нормалей), скелет с игровыми именами костей, heat-weights |
| `claire_shapekeys.py` | shape keys: blink, pain, grip_L, grip_R |
| `claire_s2.py` | одежда: майка, красный жилет (V-вырез, молния), джинсы, ботинки, перчатки без пальцев, ремень + пряжка, подсумки, набедренная кобура; high-poly копии со складками |
| `claire_s3.py` | волосы: скальп + ~400 hair cards, хвост на 4 костях, ресницы |
| `claire_s4.py` | UV, запекание (Cycles): position/normal/AO/normal-from-high, процедурные PBR-текстуры (кожа с порами/веснушками, деним, кожа, швы, принт LET ME LIVE), атлас волос, экспорт GLB |
| `zombie.py` | `ZV=prisoner|guard`: мужская база, скелет по топологическому соответствию, рваная одежда, раны, кровь, вены, мутные глаза — один атлас 2K |
| `weapons.py` | hard-surface M9F (серрации, насечка рукояти, прицелы с точками, курок, предохранитель) и боевой нож |

Порядок: `claire_s1 → claire_s2 → claire_s3 → TEXSIZE=2048 claire_s4`, затем `zombie.py` (для двух вариантов) и `weapons.py`.
