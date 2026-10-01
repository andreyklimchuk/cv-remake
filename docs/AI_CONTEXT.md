# CODE: VERONICA — Web Remake · полный контекст проекта (handoff для другого ИИ)

Файл написан агентом Notion AI 01.10.2026 для передачи контекста другому ИИ/разработчику.
Язык общения с пользователем (Андрей Климчук): **русский**. Ниже — всё, что нужно, чтобы продолжить работу без потери контекста.

---

## 1. Что это за проект

Браузерный 3D survival-horror — **некоммерческий фанатский ремейк Resident Evil: Code Veronica**
с геймплеем в духе RE2 Remake. Всё процедурное/оригинальное, ассетов Capcom нет.

- Стек: **TypeScript + Vite + Three.js 0.170** (`three` — единственная runtime-зависимость).
- Рабочая папка: `/data/cv-remake`.
- Репозиторий (private): **https://github.com/andreyklimchuk/cv-remake**, ветка `main`.
- Сборка: `npm run build` = `tsc --noEmit && vite build && node scripts/inline.mjs`
  → **один файл `dist/play.html`** (~49–64 МБ), работает офлайн, в т.ч. из `file://`.
  Сборка занимает ~3 минуты (инлайн всех GLB в base64 внутрь HTML).
- Дистрибутив для пользователя: `cd dist && zip -q -9 /data/cv-remake/cv-remake-play.zip play.html`.
- Параметры URL: `?q=low|medium|ultra`, `?renderer=webgpu` (эксперим.),
  `?viewer=claire|steve|zombie_prisoner|zombie_guard|cerberus|bandersnatch&pose=idle|aim|run|attack|pain|chase&weapon=m9f&lighter=1&hide=<mesh>&shot=full|torso|face|feet|hands|dog|doghead|big&yaw=<deg>&sever=lArm&seed=0` — просмотрщик моделей.
- Точка входа `src/main.ts`: если в URL есть `viewer` → `runViewer()`, иначе `new Game(canvas, ui).init()`.
  Игровой объект доступен как **`window.__game`** (`.world`, `.api`, `.mode`, `.rig`, `.backend`, `.simulate(dt, world)`).

### Структура исходников
```
src/
  engine/    Renderer (WebGL2 + WebGPU fallback, GTAO/bloom/grade), Materials (PBR, SSS-кожа),
             VolumetricFX (LightShaft, DustField, FireEmitter, Rain), Physics (AABB-мир, raycast, LOS, moveCircle,
             floors/ramps), Nav (граф + A*), Streaming (зоны + portal culling), Pools (Decal/Shell/Particle/Debris/
             MuzzleFlash), LightPool (виртуальные лампы → фиксированный пул реальных, чтобы не перекомпилировать шейдеры),
             AudioEngine (весь звук синтезируется через WebAudio: выстрелы, шаги, рычание собак, рёв, музыка шкатулки),
             Input (клавиатура + мышь + геймпад, семантические действия), Quality, Events (bus)
  game/
    Game.ts     оркестратор: режимы title/playing/inventory/paused/dialog/dead/end, кадровый цикл, warmup шейдеров,
                диалоги/документы/кодовый замок, смена персонажа, читы (F9)
    World.ts    одна игровая сессия: сцена, физика, навигация, стриминг, инвентари по персонажам, item box,
                спавн врагов (Zombie/Creature), сериализация сейва
    Rig.ts      buildHumanoid + bakeRigidSkinned + damp (процедурная анимация)
    SaveSystem.ts  сейв в localStorage (ключ 'cv.save.slot1', version 1)
    player/     PlayerController (состояния normal/dodge/knife/shove/grabbed/hurt/dead/finisher/counter,
                grab-struggle + контратака ножом, limp на низком HP), CameraRig (over-the-shoulder),
                ClaireModel (GLB-персонаж + процедурный fallback; лицо/мимика, хвост, зажигалка, dual-wield),
                WeaponModels (процедурные модели + подмена на GLB, 'muzzle' пустышка)
    combat/     Weapons (таблица баланса), HitZones (зоны попадания по доминирующей кости), WeaponSystem
                (фокус-разброс RE2R, отдача по паттернам, лазер, дробовик по патрону, гранаты, луч, болты,
                добивание ножом, aim assist), Projectiles, CombatContext
    inventory/  Items (база предметов), Inventory (сетка 4×2 = 8 слотов + расширения), Crafting (смеси трав, пороха,
                детали оружия), ItemBox
    ai/         Zombie (FSM + восприятие: конус зрения 120°/16 м, слух через шину noise с глушением стенами,
                память, A*, lunge→grab→bite, расчленение, fakeDead/revive, crawl), ZombieModel (расчленение меша),
                Creature.ts (Cerberus + Bandersnatch, см. §6)
    assets/     ModelLibrary (преload всех GLB через import.meta.glob, buildSkeletonFromJoints, reskin)
    world/      Interactables (двери, предметы, скрипты, GameAPI), LevelBuilder (batching/instancing), Props, ItemMeshes
    levels/     PrisonLevel (сборка мира + LevelContext), PrisonAnnex (помощники/двери), RockfortExterior (улица+дворец),
                Docs.ts (тексты документов)
  ui/         HUD (ECG-кардиограмма, промпты, зоны), InventoryUI (слоты, меню действий, файлы, ECG),
              ItemIcons (иконки из src/assets/icons/*.jpg), Menus (титул/пауза/настройки/управление/смерть/финал/док/замок)
  assets/     models/*.glb (встраиваются в сборку), icons/*.jpg
assets/blender/*.blend   исходники моделей (с упакованными текстурами)
tools/blender/*.py       генераторы моделей (см. §7)
scripts/*.mjs            сборка, бэкап, автотесты (см. §8)
```

---

## 2. Окружение (sandbox)

Linux (Amazon Linux 2023), Node 24, Python 3.13, `node_modules` уже стоят в `/data` (не править их).

- **Chromium**: `/usr/local/bin/chromium` (headless, swiftshader — очень медленно, игровое время ≪ реального).
- **Playwright** ставится так: `chromium.launch({ executablePath: '/usr/local/bin/chromium',
  args: ['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'] })`.
- **Blender как Python-модуль**: `pip3 install bpy==5.1.2` (скрипт `/data/assets_src/setup_env.sh`),
  плюс mesa (`mesa-libGL`, `mesa-libEGL`, `libXi`, `libXrender`, `libXxf86vm`, `libxkbcommon`, `libSM`).
  Проверка: `python3 -c "import bpy; print(bpy.app.version)"`.
- База анатомии (CC0): `/data/assets_src/hbm/human-base-meshes-bundle-v1.4.1/human_base_meshes_bundle.blend`
  (используется `claire_s1.py`, `steve.py`, `zombie.py`).
- Текстуры генераторов: `/data/assets_src/tex/<model>/`; рабочие файлы `/data/assets_src/work/`.
- ⚠️ Всё вне `/data` сбрасывается между сессиями: bpy ставить в **`/data/pylib`**
  (`pip3 install --target /data/pylib bpy==5.1.2`, запуск с `PYTHONPATH=/data/pylib`), mesa — `sudo dnf install`;
  playwright — `npm i -D --no-save playwright@1` (браузеры не качать, используется `/usr/local/bin/chromium`).
- **Нельзя запускать тяжёлые Blender-задачи одновременно с chromium** — был случай OOM-kill (`steve.py`).
- Сеть из sandbox доступна (pypi отвечает 200).

---

## 3. ⚠️ Инцидент: сброс sandbox и восстановление из GitHub (01.10.2026)

Провайдер переключил сессию (anthropic → baseten), и `/data` вернулся к снимку ~10:40 UTC:
**локально пропали все новые ассеты и часть кода последней итерации** (`steve.glb`, `enemy_cerberus.glb`,
`enemy_bandersnatch.glb`, `weapon_luger.glb`, `gold_lugers.jpg`, `src/game/ai/Creature.ts`, правки уровней и т.д.).

Что было сделано для восстановления:
1. Код (27 файлов) вытащен из GitHub-коммита **cf7b41e7** («Steve Burnside + gold Lugers dual-wield, character switch (C),
   lighter fix, Cerberus/Bandersnatch, barracks/armory, palace corridor + dining hall fireplace puzzle, rain/zombie
   visibility fixes») через `get_file_contents` и записан на место. Проверено `npx tsc --noEmit` — ошибок нет.
2. Blender-скрипты (`tools/blender/steve.py`, `creature.py`, `weapons2.py`, обновлённый `README.md`) восстановлены
   и скопированы в `/data/assets_src/tools/`.
3. Модели перегенерируются из скриптов (см. §7) — `steve.glb`, `enemy_cerberus.glb`, `enemy_bandersnatch.glb`,
   `weapon_luger.glb`, иконка `gold_lugers.jpg`.
4. Двоичный бэкап новых ассетов в GitHub был **частичным**: из ~61 батча доехали только 5
   (коммиты `4c30bda`, `b945f8c`, `7f7c281`, `3862103`, `9491779` — «Assets: steve, cerberus, bandersnatch, gold luger
   models/textures/icons (1)…(5)»). Локальный `.backup/` и `.backup-state.pending.json` при сбросе исчезли.

**Вывод на будущее:** после каждой итерации сразу делать text+bin бэкап (см. §4) и не полагаться на локальный диск.
Код в git — единственный надёжный источник; GLB восстанавливаются из Blender-скриптов, поэтому сами скрипты
обязательно должны быть в бэкапе.

---

### 3.1 Второй сброс (01.10.2026, ~11:05 UTC) — полное восстановление

`/data` оказался **полностью пустым** (нет ни `/data/cv-remake`, ни `/data/assets_src`, bpy не установлен).
Восстановление (≈20 минут):
1. Пользователь временно сделал репозиторий **публичным** → `git clone https://github.com/andreyklimchuk/cv-remake.git`
   (через MCP `get_file_contents` восстанавливать нереально — ~150 файлов + ~80 МБ base64 не влезают в контекст).
   После клонирования репозиторий нужно вернуть в private.
2. `node scripts/restore-binaries.mjs` (теперь пропускает файлы с недостающими частями, напр. `cv-remake-play.zip`).
3. `npm install` (не `npm ci` — lock-файл был рассинхронизирован), `npx tsc --noEmit` — OK.
4. `sh tools/blender/setup_env.sh`; база анатомии: `curl -L -A Mozilla/5.0 -o hbm.zip
   https://download.blender.org/demo/asset-bundles/human-base-meshes/human-base-meshes-bundle-v1.4.1.zip`
   → распаковать в `/data/assets_src/hbm/` (без `-A` сервер отдаёт HTML-страницу вместо zip).
   `cp -r tools/blender /data/assets_src/tools`.
5. `/data/assets_src/regen.sh` последовательно: luger (1 с) → иконка (2 с) → cerberus (83 с) → bandersnatch (75 с) →
   steve (175 с). Все 4 модели + `gold_lugers.jpg` перегенерированы, **полностью забэкаплены** (30 батчей, проверено
   побайтно через свежий клон + restore).
6. `npm run build` → `dist/play.html` 64 МБ. Проверено: viewer (Стив с двумя Люгерами, лицо Стива, Цербер, Бандерснэтч),
   tour (hall, barracks, pcorr, dining, fireplace), `node scripts/func.mjs` — смена персонажа, набор Стива
   (`gold_lugers, knife, ammo_hg×24, herb_g`), 36 зомби + 4 существа, камин зажигается → дверь → `mode === 'end'`.

**Совет на будущее:** если `/data` снова пуст — попросить пользователя временно открыть репозиторий (или дать
fine-grained токен) и клонировать, а не тянуть файлы по одному через MCP.

## 4. Бэкап в GitHub (как делать)

В sandbox **нет git-репозитория** — пушим через GitHub MCP (`push_files`), который принимает только текст.
Поэтому `scripts/backup.mjs` режет файлы на батчи ≤1 МБ, а бинарники кодирует gzip+base64 в `binary/<путь>.b64.NNN`.

```bash
cd /data/cv-remake
node scripts/backup.mjs "<сообщение коммита>" text   # только текстовые файлы
node scripts/backup.mjs "<сообщение>" bin            # только бинарники (.glb/.blend/.png/.jpg/.ogg/.mp3/.wav/.zip)
node scripts/backup.mjs "<сообщение>" all            # всё
# → .backup/batch_000.json … batch_NNN.json  (+ .backup-state.pending.json)
```
- Батчи пушить **строго последовательно, по одному вызову за ход**:
  `mcp_run_tool(server_name="GitHub", tool_name="push_files", arguments_file_path="/data/cv-remake/.backup/batch_NNN.json")`.
  Параллельная отправка нескольких батчей может привести к гонке за ref (в истории так потерялись батчи).
- После успешной отправки всех батчей:
  `mv .backup-state.pending.json .backup-state.json && rm -rf .backup`
- `.backup-state.json` хранит sha1 последнего забэкапленного состояния каждого файла (инкрементальный бэкап).
- `binary-manifest.json` — карта частей/sha1/размеров бинарников; `node scripts/restore-binaries.mjs` собирает
  бинарники обратно из `binary/*.b64.*` после клонирования репозитория.
- В репозиторий НЕ попадают `node_modules`, `dist`, `shots`, `.backup`, `.git`, `.backup-state.json`.
- `push_files` ограничение: файл аргументов ≤ 1 МиБ → отсюда размер батча (~1.03 МБ).

---

## 5. Что просил пользователь (история итераций)

1. **Базовая игра** (RE2R-подобный геймплей): тюрьма Рокфорта — двор, караулка, блок B, западный двор, ворота,
   мост, лестница, плац, учебный корпус, проход, дворцовая площадь, главный зал Эшфорд-паласа; инвентарь 4×2,
   крафт трав/пороха, сейв у печатной машинки, документы, головоломки (сейф 0419, вентиль, эмблема ястреба,
   музыкальная шкатулка, витрина «Песнь трёх зверей»).
2. **Детальные GLB-модели** (Blender-пайплайн): Клэр (тело, одежда, волосы, лицо, shape keys), зомби (заключённый
   и охранник), оружие, предметы, реквизит, иконки инвентаря.
3. **Клэр: качество модели** — много правок лица/рук/одежды (в т.ч. принт «LET ME LIVE» на спине куртки).
4. **Реквизит и локации второго акта** — улица/дворец (props2.py: балюстрада, люстра, колонна, розетка-окно,
   портрет Алексии, знамя, фонарь, ворота…).
5. **Зомби-механики**: расчленение, отстрел конечностей, fake-dead, вставание, crawl; свет/лампы, дождь,
   GTAO/bloom, звук.
6. **Последняя итерация (текущая)** — 6 пунктов:
   1) не получалось зажечь зажигалку;
   2) невидимые зомби;
   3) дождь шёл внутри зала дворца;
   4) нужны реалистичные Cerberus и Bandersnatch;
   5) расширить локации: справа от лестницы (учебный корпус) и впереди за главным залом;
   6) смена персонажа + реалистичный Стив Бернсайд с золотыми Люгерами Эшфордов, стрельба с двух рук.

---

## 6. Сделано в последней итерации (пункты 6.1–6.6)

### 6.1 Зажигалка
- `ClaireModel.setLighter(on)` — ленивая сборка: модель `item_lighter.glb`, спрайт-пламя, `PointLight` c
  `userData.priority = 12`, свет уходит в `LightPool` (`LightPool.active?.adopt(g)`).
- Инвентарь: у предмета `lighter` появилось действие **«Зажечь / Погасить»** (`InventoryUI.actions`), вызывает
  `Game.useItem` → ставит/снимает флаг `lighterOn`, сообщение в HUD. Работает только у Клэр.
- Анимация: зажигалка поднимается в левой руке (не мешает прицелу одной рукой, скрывается при dual-wield).
- Флаг `lighterOn` сохраняется в сейве и восстанавливается в `World`.

### 6.2 Невидимые зомби
- Причина: враги добавлялись в группу зоны и исчезали при portal-culling зоны спавна.
- Фикс: `World` создаёт врагов **в корне сцены** (`scene.add`), видимость вычисляется каждый кадр
  (`World.updateZombies`: `z.model.root.visible = zone ? zone.group.visible : true`).

### 6.3 Дождь только на улице
- `Rain.reset()` бросает капли только над объединением «открытых» боксов `level.outdoorBounds` и убивает их о
  землю под собой (`ground` callback = `physics.groundAt`), поэтому капли не падают сквозь крышу зала.
- `Game.simulate`: `w.rain.lines.visible = outdoor || сосед-зона открыта`.

### 6.4 Реалистичные Cerberus и Bandersnatch
- `tools/blender/creature.py` (запуск: `CV=cerberus|bandersnatch TEXSIZE=2048 python3 tools/creature.py`) —
  скульпт из метаболов (мышечные массы, негативные шары = раны), воксельный ремеш (low + high), рёбра/позвоночник/
  вены/потёртости как смещения по нормалям, отдельные оболочки зубов/когтей/глаз, авто-веса, процедурный запекатель
  (albedo/normal/ORM, Cycles), экспорт `enemy_<kind>.glb`.
  - Cerberus — зомби-доберман (≈0.68 м в холке), чёрно-подпалый окрас, облезшая кожа, гниль, кровь; порода скелета:
    `lfUpper/lfLower/lfPaw/lfToe`, `rf*`, `lh*`, `rh*`, `hips`, `spine`, `neck`, `head`, `jaw`, `tail`.
  - Bandersnatch — ≈2.4 м, сгорбленный, одна огромная тянущаяся правая рука, левая — культя: `rUpperArm/rForearm/rHand/rHandTip`,
    `lStump`, `lThigh/lShin/lFoot`, `rThigh/rShin/rFoot`, `hips/spine/neck/head/jaw`. Кожа серо-каучуковая
    (в коде `CreatureModel` для bandersnatch применяется `MeshPhysicalMaterial` с sheen/clearcoat — «мокрый» вид).
- `src/game/ai/Creature.ts` (~544 строки) — `CreatureModel` (ре-скин GLB на игровой скелет через `buildSkeletonFromJoints`
  + `AIM`-карта, дельты поз от rest-позы, `stretch` для удлинения предплечья) и `Creature` (AI + процедурная анимация).
  Состояния: `idle/wander/chase/circle/pounce/bite/swipe/stretch/stagger/down/dead`.
  - **Cerberus** — стайный: галоп (6.2 м/с), кружит на ~4 м, прыжок-зажим (`pounce` → `bite` = grab-борьба, 12 урона),
    knockdown при сильном попадании, HP ~55–75.
  - **Bandersnatch** — медленно идёт (1.35 м/с), на 3–7.5 м бьёт растягивающейся рукой (`stretch`, wind-up 0.6 с →
    выброс 0.3 с → удержание → втягивание, урон 24–32 + отброс), вблизи тяжёлый `swipe` (28–36), HP ~290–330.
  - Оба реализуют интерфейсы `Combatant` + `PlayerTarget` (оружие, нож, толчок, захват, сейв работают без изменений);
    есть fallback-капсула, если GLB не загрузился.
  - Спавн: `spawnZombie` в `World` смотрит на `spawn.kind` (`'cerberus' | 'bandersnatch'`) и создаёт `Creature`.
  - Звук: `audio.dog(pos,'snarl'|'bark'|'yelp')` и `audio.roar(pos, long)` в `AudioEngine`.

### 6.5 Новые локации
`src/game/levels/RockfortExterior.ts` (803 строки). Координаты/содержимое:
- **barracks** (КАЗАРМА И ОРУЖЕЙНАЯ, MILITARY TRAINING FACILITY) — за дверью `barrDoor` в задней стене учебного
  корпуса (x −35…−33.4): границы x −38.2…−16.1, z 130.3…145; койки, питомник (кровь), оружейная со стойками;
  предметы `b_hg`(ammo_hg ×20), `b_sg`(ammo_sg ×7), `b_herb`(herb_g), `b_herb2`(herb_r), `b_gren`(gren_exp ×4);
  документ `kennel_log`; спавны `cb_1..cb_3` (cerberus) + `cb_z` (фейк-мёртвый охранник).
- **pcorr** (ГАЛЕРЕЯ ПОРТРЕТОВ, ASHFORD PALACE) — за двустворчатой дверью `hallEnd` в задней стене главного зала
  (флаг `open:hallEnd`, створки распахиваются в коридор): x −2.3…2.3, z 190.5…206; картины, бра;
  `c_hg`(ammo_hg ×15), зомби `pc_1`.
- **dining** (ОБЕДЕННЫЙ ЗАЛ) — x −10.3…10.3, z 206…224.5; банкетный стол, стулья, канделябры, люстра, мраморный пол,
  камин на западной стене с `painting_alexia`.
  **Головоломка:** взаимодействие `fireplace` требует `inventory.has('lighter')` (Стиву подсказка переключиться на C),
  подтверждение → флаг `dining:fire`, `FireEmitter` + свет; дверь `diningEnd` в северной стене завершает уровень
  (`completeLevel`) только если камин горит (проверено: `mode === 'end'`).
  Документ `dining_letter`; предметы `d_herb`(herb_g), `d_mag`(ammo_mag ×6); спавны `bs_1` (bandersnatch), `dn_1` (фейк-мёртвый).
- Функции порталов сделаны по-соседски (training/hall/pcorr); добавлены полы, узлы/связи навигации.
- Тексты документов `kennel_log`, `dining_letter` — в `src/game/levels/Docs.ts`.
- Названия зон в `Game.simulate` (таблица `names`): `barracks`, `pcorr`, `dining` добавлены.

### 6.6 Смена персонажа + Стив с золотыми Люгерами
- `tools/blender/steve.py` (~591 строка) — Стив: база Blender Studio (male), стройнее подросток, куртка navy с белой
  отделкой, жёлтая майка, камуфляжные штаны-карго (тигровые полосы), ботинки со шнуровкой, ремень с пряжкой, чокер,
  напульсники; причёска «занавес» (cap + ~285 hair cards, 4 варианта атласа), shape keys `blink/pain/grip_L/grip_R`;
  отдельные запечённые наборы текстур skin/outfit/eyes + атлас волос.
  Правки этой итерации: лучи напульсников внутрь, кепка выдвинута на 3.5 мм наружу, тёмная полоса скальпа от линии
  роста −5°, сплющенная нормаль лба, **поиск кончика носа ограничен зоной ниже глаз** (иначе lip-маска попадала на лоб
  и давала «овал»), убран глянец T-зоны лба.
- `weapon_luger.glb` (`python3 tools/weapons2.py luger`) — позолоченный Luger P08: золотая рамка рукояти, белые
  («ivory») накладки с гравировкой, toggle-lock с насечёнными колёсиками, без желобков под пальцы.
- Иконка: `ICON_GLOB=weapon_luger.glb python3 tools/icons.py` → `icons/luger.jpg`, переименована в
  `src/assets/icons/gold_lugers.jpg` (иконки именуются по id предмета).
- Оружие `gold_lugers` (Weapons.ts): hitscan, `ammo_hg`, `ammoPerShot: 2`, `magSize 16`, `pellets 2`, damage 12,
  fireRate 2.8, `sound` как у пистолета, `noise 24`, `stagger 0.42`.
- `ClaireModel` держит **два** ствола: `gunHolder` (правая рука) и `gunHolderL` (левая, только для `weaponHold(id)==='dual'`),
  `muzzleWorld()` / `muzzleWorldL()`, при прицеливании обе руки вытянуты (поза `hold === 'dual'`).
  `WeaponSystem.shoot` стреляет из обеих точек: вспышка `flash.fire(muzzle, scale, muzzle2)`, гильзы с обеих сторон,
  `MuzzleFlash` ставит один свет посередине между стволами и второй спрайт.
- `World`: **раздельные инвентари** `inventories = { claire, steve }` (общий item box), `equippedBy` на персонажа,
  `switchCharacter()` меняет управляемое тело, инвентарь и оружие; `stockSteve()` выдаёт `gold_lugers` (mag 16),
  нож, `ammo_hg ×24`, `herb_g`.
- `PlayerController`: `models = { claire, steve }` — обе модели строятся сразу (прогрев шейдеров), видима одна;
  `setCharacter()` меняет местами HP/яд (`hpBy`).
- Управление: **C** (или D-pad ↑ / кнопка 12 геймпада) — `Input.switchCharacter()`; разрешено только в свободном
  состоянии (`p0ok`: `player.state === 'normal' && !weapons.isReloading()`).
- Сейв: `SaveData.character`, `cap`, `other: { inventory, equipped, cap, hp, poisoned }` — при загрузке
  инвентари меняются местами, если сохранились за Стива.
- `InventoryUI`: попытка экипировать `gold_lugers` за Клэр → сообщение «Это пистолеты Стива — Клэр не стреляет с двух рук.»

---

### 6.7 Итерация «футболка / двери / Бандерснэтч / походка / фонарик»
- **Стив** (`tools/blender/steve.py`): жёлтая футболка с круглым вырезом вместо майки (часть по-прежнему называется
  `tank`; `tee_filter` — скруглённый вырез, `detooth()` убирает зубцы на краю выреза), тело скрыто под футболкой до
  Z(1.345); волосы — 4 слоя × 175 карт, 17 сегментов, V-образные карты (≈49k треугольников), медно-каштановый цвет.
- **Двери** (`src/game/world/Interactables.ts`, класс `Door`) — физичные, как в RE Engine: в закрытую незапертую дверь
  достаточно идти (>0.12 с толкания) — она открывается **от толкающего в любую сторону**; E тоже открывает (толчок от
  игрока). Открытая створка — вращающийся отрезок с коллизией (circle-vs-segment), инерцией, трением петли и упорами
  ±maxAngle; враги тоже толкают (`Door.agents` в World: игрок + живые враги в 30 м). Двустворчатые `palaceDoor` и
  `hallEnd` — массив pivot'ов, обе створки уходят в одну сторону (раньше в hallEnd одна открывалась в коридор, другая
  в зал). `Door.NEVER` как onOpen — дверь не открывается ходьбой. Запертые — дребезжат и показывают lockedText.
- **Бандерснэтч** (`tools/blender/creature.py`): новый скульпт 2.9 м — охристая мокрая кожа с прожилками
  (`bander_shade`), маленькая черепоподобная голова, гигантское правое плечо выше головы, бугристая рука до земли с
  кулаком-булавой, тонкая левая рука (кости `lStump`, `lStumpFore`), длинные жилистые ноги; ~23.5k треугольников.
- **Походка** (`src/game/player/ClaireModel.ts`, модуль `Gait`): кривые суставов по циклу шага (Winter) для ходьбы и
  бега, длина шага от скорости, стопы (удар пяткой → перекат → толчок носком), покачивание/поворот/крен таза,
  контрвращение корпуса, стабилизация головы, наклон при разгоне/торможении, крен в поворотах, idle-перенос веса.
  Viewer: `pose=walk|run&speed=&phase=`.
- **Фонарик Стива** (`Game.updateFlashlight`, `World.flashlight` SpotLight): закреплён на левой стороне груди, светит
  туда, куда смотрит камера (raycast + сглаживание); яркость адаптивная `5·d^decay` (5…150), чтобы пятно не
  пересвечивало вблизи; источник вынесен на 0.38 м вперёд (руки не затеняют луч); **L / D-pad ↓ (кнопка 13)** — вкл/выкл (флаг `flashOff`).
- Тест: `node scripts/doors.mjs` — все незапертые двери толкаются с обеих сторон (створки уходят от толкающего,
  агент проходит насквозь) + фонарик (Стив: intensity > 0, направление ≈ камере; Клэр: 0).
  `node scripts/showcase.mjs` — Стив с фонариком идёт в закрытую `hallEnd` без E → `shots/sc_*.png`.

---

## 7. Blender-пайплайн (как перегенерировать ассеты)

Все модели генерируются кодом; запускать **из `/data/assets_src`**, скрипты лежат в `/data/assets_src/tools/`
(копии — в `/data/cv-remake/tools/blender/`). Выход: `OUT_GLB = /data/cv-remake/src/assets/models`,
`OUT_BLEND = /data/cv-remake/assets/blender`, текстуры `/data/assets_src/tex/<name>/`.

Порядок полной пересборки (в скобках — время в этом sandbox, приблизительно):
```bash
sh /data/assets_src/setup_env.sh                      # bpy 5.1.2 + mesa (если bpy нет)
cd /data/assets_src
TEXSIZE=2048 python3 tools/claire_s1.py               # тело + риг (multires 1 / 3 для запекания)
python3 tools/claire_s2.py                            # одежда
python3 tools/claire_s3.py                            # волосы
python3 tools/valkyrie.py                             # принт на спине (до s4)
TEXSIZE=2048 python3 tools/claire_s4.py               # UV + запекание + экспорт claire.glb
ZV=prisoner python3 tools/zombie.py ; ZV=guard python3 tools/zombie.py
python3 tools/weapons.py                              # M9F + нож
python3 tools/weapons2.py                             # M3, MP5, Python, GL, арбалет, Linear
python3 tools/weapons2.py luger                       # золотые Люгеры (один ствол пары)
python3 tools/items.py ; python3 tools/props.py ; python3 tools/props2.py
TEXSIZE=2048 python3 tools/steve.py                   # Стив (~591 стр.)
CV=cerberus TEXSIZE=2048 python3 tools/creature.py
CV=bandersnatch TEXSIZE=2048 python3 tools/creature.py
ICON_GLOB=weapon_luger.glb python3 tools/icons.py     # иконки (без ICON_GLOB — все item_*/weapon_*)
```
Важно: тяжёлые задачи — по одной; `icons.py` рендерит Cycles'ом и пишет в `src/assets/icons/<имя>.jpg`
(`ICON_DST` переопределяет папку), иконки ключуются по id предмета (поэтому `luger.jpg` → `gold_lugers.jpg`).

---

## 8. Тесты и отладка

- `node scripts/viewer.mjs <prefix> "<query>"...` — рендер модели(ей) в `shots/<prefix>_<i>.png`
  (viewer=claire|steve|cerberus|bandersnatch|zombie_x, pose=, weapon=, lighter=1, hide=<подстрока меша>, shot=full|torso|face|feet|hands|dog|doghead|big, yaw=).
- `node scripts/tour.mjs medium [список_точек]` — визуальный тур по зонам в `shots/tour_<точка>.png`.
  Точки: saveroom, guard, corridor, steam, office, office2, archive, cells, gallery, west, yard, gateout, bridge, plaza,
  terrace, tyard, training, passage, pyard, hall, hall2, hall3, **barracks, armory, pcorr, dining, dining2, fireplace**,
  плюс `inv` (инвентарь, меню, документ, кодовый замок, item box, прицел).
  Первая точка тура может выйти пустой (зоны ещё не построены/туман) — это не баг.
- `node scripts/doors.mjs` — физика дверей + фонарик.
- `node scripts/func.mjs` — функциональный тест (смена персонажа, набор Стива, существа, камин → финал).
- `node scripts/smoke.mjs medium`, `node scripts/hitch.mjs`, `node scripts/walk.mjs` — прогон уровня, замеры фризов,
  проход по маршруту.
- Headless очень медленный: игровое время идёт сильно медленнее реального; для проверок AI лучше крутить симуляцию
  вручную из `page.evaluate`: `for (let i=0;i<N;i++) g.simulate(0.05, w)`.
- Полезные точки входа в рантайме: `window.__game`, `g.world` (`interactables`, `zombies`, `flags`, `player`,
  `inventory`, `weapons`, `streamer`, `nav`, `physics`), `g.mode`, `g.rig`.
  Пример: `w.interactables.find(i => i.id === 'fireplace').interact(g.api)`.

---

## 9. Текущее состояние и что осталось

Готово и проверено: см. §6 (компилируется, собиралось, тестировалось симуляцией; сборка `dist/play.html`
с последними правками делалась до сброса sandbox).

Осталось / в работе:
1. ~~Перегенерировать потерянные ассеты~~ — сделано (см. §3.1).
2. ~~Пересобрать `dist/play.html` и протестировать~~ — сделано (см. §3.1).
3. ~~Довести двоичный бэкап~~ — сделано, все бинарники в `binary/` + `binary-manifest.json`.
4. Мелкая полировка (по желанию): детализация головы Bandersnatch; проверка скриншотов `shots/tz_fire1.png`,
   `shots/tz_dogs.png` (не отсмотрены); возможная оптимизация размера GLB.
5. Дальше по роадмапу: военная база/Антарктида, Hunter/Nosferatu/Tyrant, Крис, апгрейды оружия, сохранения по слотам.

Известные ограничения прототипа: физика — собственный AABB-мир (интерфейс `ICollisionWorld` готов под Rapier);
WebGPU — экспериментально, без пост-эффектов; SSS — аппроксимация wrap-lighting; текстуры процедурные.

---

## 10. Управление (актуальный список)

WASD — движение · мышь — камера · ПКМ (удерж.) — прицел от плеча · ЛКМ — выстрел · Shift — бег ·
R — перезарядка / смена типа гранат и болтов · F — нож / добивание лежачих / контратака при захвате ·
Q — оттолкнуть зомби · E — взаимодействие · Tab / I — инвентарь (R — поворот, перетаскивание — объединить) ·
1–8 / колесо — смена оружия · **C — смена персонажа (Клэр ⇄ Стив)** · **L — фонарик (Стив)** · двери открываются, если идти в них · Esc — пауза · F3 — отладка · F9 — чит (весь арсенал).
Геймпад: LS/RS, LT прицел, RT огонь, B нож, X перезарядка, Y действие, LB толчок, D-pad ↑ (кнопка 12) — смена персонажа, D-pad ↓ (кнопка 13) — фонарик.
