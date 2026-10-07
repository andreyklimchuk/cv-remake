# CVX Prison — порт на Godot 4.3

Ветка `godot` — только проект Godot (корень ветки = папка проекта). Порт браузерной сборки `cvx-prison` (TypeScript + three.js) на **Godot Engine 4.3** (GDScript, рендерер *Compatibility*).
Логика перенесена 1:1 по файлам веб-версии — ничего своего не добавлено:

| веб (src-ts/src) | Godot (scripts) |
|---|---|
| evt.ts / evtops.ts | evt.gd + data/evtops.json (VM скриптов событий) |
| game.ts | game.gd (комнаты, EvtHost, осмотр/подбор/двери/сохранение, зомби/собаки, захваты) |
| main.ts | main.gd + scenes/main.tscn (титульное меню) |
| room.ts, camera.ts, evcam.ts, light.ts | room.gd, camera_rig.gd, evcam.gd, light.gd |
| player.ts, enemy.ts | player.gd, enemy_model.gd, zombie.gd, dog.gd |
| effects.ts | effects.gd (O_WRK, спрайты, дождь, 2D-слой пролога, полосы кино) |
| audio.ts | game_audio.gd (банки SE/BGM/голоса, панорама/громкость как в оригинале) |
| ui.ts, invscreen.ts, inventory.ts, movie.ts | ui_root.gd, message_box.gd, inv_screen.gd, deco.gd, inventory.gd, movie.gd |
| text.ts, sysmes.ts | text.gd + data/text_ru.json, data/sysmes.json |

## Как запустить
1. Ассеты (сконвертированные из PS3-версии) в git не лежат. Распаковать их из `data/*.js` веб-сборки (ветка `cvx-prison`):
   `python3 tools/fetch_assets.py` (нужен ffmpeg с libtheora/libvorbis — ролики перекодируются в .ogv).
   Скрипт сам скачает ветку `cvx-prison` с GitHub (или укажите путь к её папке `cvx-prison/` аргументом).
2. Открыть корень ветки в Godot 4.3 (первый импорт glb занимает пару минут) и запустить (F5).

Управление то же, что в вебе: W/S или ↑/↓ — вперёд/назад, A/D или ←/→ — поворот, Shift — бег, C — камера (фиксированная / из-за плеча),
F / ПКМ — оружие наизготовку, E / Пробел / Enter / ЛКМ — действие/удар, Tab — предметы, Esc — отмена/пропуск, F1 — отладка.
Сохранение (печатная машинка) — `user://save.json`, настройки — `user://settings.cfg`.

## Сцены (редактируются в Godot)
Игра собрана из отдельных сцен, которые можно открыть и править в редакторе — игра читает именно их:
- `scenes/models/<rooms|objects|items|chars|enemies|npc|inv>/<имя>.tscn` — по сцене на каждую модель (комната, объект, предмет, Клэр/NPC, враги, 3D-предметы инвентаря). Внутри — импортированный glb; чтобы менять меши/материалы — «Editable Children». `Assets.scene()` грузит эти сцены вместо glb.
- `scenes/rooms/rm_XXXX.tscn` — раскладка комнаты (`RoomScene`, скрипты в `scripts/scene/`):

| узел | что это | тип |
|---|---|---|
| Model | геометрия комнаты (сцена модели) | instance |
| Objects/objNN_* | объекты комнаты (позиция/поворот, index, flags, id, ex) | PlacedObject |
| Items/itemNN_* | предметы на полу (позиция, id предмета, flags) | PlacedItem |
| Enemies/enemyNN_* | точки появления врагов (id, позиция, поворот) | EnemySpawn |
| Spawns/spawnN | позиции входа игрока | SpawnPoint |
| Cameras/camNN | фиксированные камеры (позиция, поворот; прочие параметры — в rec) | RoomCam (Camera3D — можно смотреть через неё в редакторе) |
| Triggers, Collision, Areas | зоны событий, стены/коллизия, зоны пола/камер | AtrBox (коробка с размером, type/flags в hex) |
| Lights, EventLights | источники света комнаты | RoomLight |
| Effects/effNN_ID | таблица эффектов комнаты: 100 дождь (в редакторе видно превью капель), 101 брызги, 102 ветер, 103 дым/искры, 116–119 огонь, 154–182 спрайты… | RoomEffect |

Двигайте/поворачивайте узлы, меняйте свойства в инспекторе — при загрузке комнаты `RoomScene.collect()` собирает из них данные, которые раньше брались из `assets/rooms/ID.json`. Порядок детей в группе = номер записи, на который ссылаются скрипты событий (не переставляйте без нужды). Тексты сообщений, амбиент и скрипты событий остаются в JSON (это байткод оригинала).

Сцены генерируются из ассетов (после `fetch_assets.py`):
`godot --headless --path . -s tools/build_scenes.gd [-- all|models|rooms [rm_XXXX ...]] [--force]`.
Существующие сцены комнат не перезаписываются (там ваши правки), `--force` — пересоздать. Если сцены комнаты нет, игра грузит её из JSON как раньше.
Сцены ссылаются на `res://assets/...` — поэтому сначала `fetch_assets.py`, потом открывать проект.

## Тесты
- `godot --headless --path . -s dev/vmtest.gd -- rm_0000 600` — тот же лог VM, что `dev/vmtest.ts` веб-версии (сверено на всех 13 комнатах; отличия только в печати `-0.00`).
- `godot --headless --path . res://dev/test.tscn -- flow|rooms [rm_XXXX ...]|ui|cam|det X Z H` (det — проход Клэр из точки X,Z с курсом H, напр. металлодетектор rm_0090: `det 7.0 13.2 0`) — сценарии как dev/t_flow1.js / t_rooms.js;
  с настоящим рендером (`xvfb-run godot --path . res://dev/test.tscn -- rooms`) пишет скриншоты в `shots/`.
  Скриншоты комнат сверены с веб-версией (Chromium/three.js) — картинка совпадает.
- Ещё режимы test.tscn: `grab rm_XXXX` (захват/укус зомби), `box` (ящики rm_0090: крышка + экран ящика, предмет кладётся в один ящик и берётся из другого), `cine rm_XXXX ENTRY FLR SECS STEP` (катсцена: снимки каждые STEP с, лог NPC/зомби).
- Просмотр клипов: `dev/anim_sheet.tscn -- model.glb clip frames yaw`, пары Клэр/зомби: `dev/pair_sheet.tscn -- claireClip zombieClips front frames dist` → `shots/`.

## Отличия от веб-версии (технические, не геймплейные)
- Освещение «Ninja easy multi light» — свой spatial-шейдер (assets.gd) с глобальными uniform'ами вместо патча шейдеров three.js; формула та же (амбиент + 3 точечных + 1 направленный, линейный спад nr→fr).
- Окклюзия камер (проверка «видна ли Клэр») — собственный перебор треугольников вместо Raycaster (те же правила: только непрозрачные лицевые грани).
- Анимации комнатных движений (rmt) называются в glb `rm_XXXX_rNN` (импортёр Godot заменяет `/` на `_`).
- Состояние работ и приближения — в `HANDOFF.md`.
