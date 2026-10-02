# Code: Veronica — Web Remake (fan, non-commercial)

Браузерный 3D survival-horror в духе RE: Code Veronica с геймплеем RE2 Remake.
TypeScript + Vite + Three.js. Все ассеты процедурные (без оригинальных ресурсов Capcom).

## Запуск
- Готовая сборка: открыть `dist/play.html` (один файл, работает офлайн, из file://).
- Разработка: `npm i && npm run dev` → http://localhost:5173
- Сборка: `npm run build`
- Параметры URL: `?q=low|medium|ultra`, `?renderer=webgpu` (экспериментально).

## Управление
WASD — движение, Shift — бег, ПКМ — прицел, ЛКМ — выстрел, R — перезарядка,
Space (удерж.) — стойка с ножом (ЛКМ взмах, ПКМ выпад), F — нож / добивание / контратака при захвате, Q — толчок,
E — взаимодействие, Tab/I — инвентарь (R — поворот, перетащить на предмет — объединить),
1–8 / колесо — оружие, Esc — пауза, F3 — debug, F9 — (чит) весь арсенал. Геймпад поддерживается.

## Структура
```
src/
  engine/   Web RE-Engine: Renderer (WebGL2 + WebGPU fallback, GTAO/bloom/grade), Materials (PBR, SSS-кожа),
            VolumetricFX (лучи света, туман, огонь, дождь), Physics (AABB-мир, raycast, LOS),
            Nav (граф + A*), Streaming (зоны + portal culling), Pools (instanced декали/гильзы/частицы),
            AudioEngine (процедурный HRTF 3D-звук), Input, Quality, Events
  game/
    player/     PlayerController, CameraRig (over-shoulder), ClaireModel (скелет, лицо, хвост), WeaponModels
    combat/     Weapons (статы), HitZones, WeaponSystem, Projectiles
    inventory/  Items, Inventory (8x6 Tetris, ItemBox), Crafting
    ai/         Zombie (FSM + восприятие), ZombieModel (расчленение)
    world/      Interactables (двери, предметы, скрипты), LevelBuilder (batching), ItemMeshes
    levels/     PrisonLevel (тестовый уровень)
    Game.ts, World.ts, Rig.ts, SaveSystem.ts
  ui/  HUD (ECG), InventoryUI, Menus
```

## Детальные модели (Blender)

Персонажи и оружие теперь — полноценные модели, собранные в Blender (исходники `assets/blender/*.blend`,
скрипты генерации `tools/blender/`, описание там же). В игру они попадают как GLB (`src/assets/models/`),
встраиваются прямо в `play.html` и загружаются `src/game/assets/ModelLibrary.ts`.

* **Клэр** — ~124k треугольников, 4 материала (кожа с SSS, одежда, глаза, волосы-карточки), скелет из 22 костей,
  shape keys моргания/боли/хвата, физика хвоста на 4 костях, текстуры 2K (albedo / normal / ORM).
* **Зомби** (заключённый, охранник) — ~37k треугольников, 1 материал / 1 draw call, раны, кровь, рваная одежда;
  хит-зоны по доминирующей кости, отстрел конечностей с отлетающими кусками меши.
* **Оружие** — M9F и нож, hard-surface.
* Просмотрщик моделей: `play.html?viewer=claire&pose=idle|aim|run|pain&shot=full|face|torso|hands|feet&yaw=0`,
  `play.html?viewer=zombie_prisoner&pose=chase&sever=lArm`.
* Клэр — готовая модель из *Resident Evil: Survival Unit* (Sketchfab, прислана пользователем; конвертация
  `tools/import/claire_su.py`). Старая Blender-Клэр: `play.html?classic`. Права на модель принадлежат их владельцам
  (Capcom / автор загрузки), проект некоммерческий фанатский.
* Ассеты из других игр Capcom (прислал пользователь, конвертация скриптами `tools/import/*.py`): **HUNK** (охрана в интро),
  нож, травы и печатная машинка из *RE0*, **Хантер** (*RE: Revelations*) — бег, прыжок через пропасть, удары когтями. Просмотр:
  `play.html?viewer=hunter&pose=run`.
* **Стив** — тело из мода RE4R *Steve Burnside Costume* (Mralexmods), голова — прежняя (`tools/import/steve_re4r.py`).
* Сборка для игры: https://github.com/andreyklimchuk/cv-remake/releases/download/latest/cv-remake-play.zip (автосборка GitHub Actions).
* Если GLB не загрузился — автоматически используется старая процедурная модель.

## Тестовый уровень: тюрьма острова Рокфорт
Интро-катсцена (вертолёт Umbrella садится во дворе, охрана ведёт Клэр в блок B, тревога — камера открывается) →
Клэр без оружия в камере (зажигалка на койке) → караулка (сейв-комната, печатная машинка, ящик предметов) →
двор: нож и M9F у тела охранника → Блок B (огнетушитель, арбалет) → потушить огонь → западный двор
(эмблема Ястреба, дробовик M3) → эмблема в ворота → катсцена встречи со Стивом: Клэр отдаёт ему всё, кроме
пистолета, дальше игра идёт за Стива с золотыми Люгерами. Катсцены пропускаются Enter / Esc. ~13 зомби.

## Честные ограничения прототипа
- Физика — собственный AABB-мир с интерфейсом `ICollisionWorld`, совместимым для замены на Rapier.
- WebGPU — экспериментально, без пост-эффектов и кастомных шейдеров.
- Текстуры генерируются процедурно (вместо KTX2), SSS — wrap-lighting аппроксимация.
- Враги — только зомби. Cerberus, Hunter, Bandersnatch, Nosferatu, Tyrant, Стив/Крис,
  военная база и Антарктида — в роадмапе.
