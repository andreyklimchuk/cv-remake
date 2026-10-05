# CVX Prison — порт на Godot 4.3

Порт браузерной сборки `cvx-prison` (TypeScript + three.js, `../src-ts`) на **Godot Engine 4.3** (GDScript, рендерер *Compatibility*).
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
1. Ассеты (сконвертированные из PS3-версии) в git не лежат. Распаковать их из `../data/*.js` веб-сборки:
   `python3 tools/fetch_assets.py` (нужен ffmpeg с libtheora/libvorbis — ролики перекодируются в .ogv).
   Без локальной папки `data/` скрипт сам скачает ветку `cvx-prison` с GitHub.
2. Открыть папку `godot/` в Godot 4.3 (первый импорт glb занимает пару минут) и запустить (F5).

Управление то же, что в вебе: W/S или ↑/↓ — вперёд/назад, A/D или ←/→ — поворот, Shift — бег, C — камера (фиксированная / из-за плеча),
F / ПКМ — оружие наизготовку, E / Пробел / Enter / ЛКМ — действие/удар, Tab — предметы, Esc — отмена/пропуск, F1 — отладка.
Сохранение (печатная машинка) — `user://save.json`, настройки — `user://settings.cfg`.

## Тесты
- `godot --headless --path . -s dev/vmtest.gd -- rm_0000 600` — тот же лог VM, что `dev/vmtest.ts` веб-версии (сверено на всех 13 комнатах; отличия только в печати `-0.00`).
- `godot --headless --path . res://dev/test.tscn -- flow|rooms|ui|cam` — сценарии как dev/t_flow1.js / t_rooms.js;
  с настоящим рендером (`xvfb-run godot --path . res://dev/test.tscn -- rooms`) пишет скриншоты в `shots/`.
  Скриншоты комнат сверены с веб-версией (Chromium/three.js) — картинка совпадает.

## Отличия от веб-версии (технические, не геймплейные)
- Освещение «Ninja easy multi light» — свой spatial-шейдер (assets.gd) с глобальными uniform'ами вместо патча шейдеров three.js; формула та же (амбиент + 3 точечных + 1 направленный, линейный спад nr→fr).
- Окклюзия камер (проверка «видна ли Клэр») — собственный перебор треугольников вместо Raycaster (те же правила: только непрозрачные лицевые грани).
- Анимации комнатных движений (rmt) называются в glb `rm_XXXX_rNN` (импортёр Godot заменяет `/` на `_`).
- Все приближения самой игры перечислены в `../HANDOFF.md` и одинаковы в обеих версиях.
