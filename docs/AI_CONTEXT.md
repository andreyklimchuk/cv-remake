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

### 3.2 Третий сброс (01.10.2026, ~17:50 UTC)

`/data/cv-remake` откатился к снимку ~13:41 (до итерации 6.8), хотя 6.8 уже была полностью в GitHub.
Восстановление (~3 мин): `git clone --depth 1 https://github.com/andreyklimchuk/cv-remake.git /tmp/cvclone` →
скопировать `src scripts tools docs binary binary-manifest.json package.json index.html tsconfig.json vite.config.ts`
в `/data/cv-remake` (node_modules не трогать) → `.backup-state.pending.json` из клона → `.backup-state.json` →
`node scripts/restore-binaries.mjs` → `npx tsc --noEmit` → `cp tools/blender/*.py /data/assets_src/tools/`.
Проверка: `grep -c closeDelay src/game/world/Interactables.ts` (>0), `grep -c kickK src/game/player/ClaireModel.ts` (>0).

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
7. **Итерация 6.7**: футболка/волосы Стива, физичные двери, новый Бандерснэтч, походка, фонарик Стива.
8. **Итерация 6.8**: лица Клэр и Стива ближе к оригиналу CV, непрозрачные асимметричные волосы Стива, одинарные
   двери меньше (как в RE2) + автозакрытие, детальные Люгеры с анимацией затвора, нормальный хват оружия двумя руками.
9. **Итерация 6.9**: «при закрытии любой двери происходит это» (дыра в стене комнаты), анимация убирания Люгеров
   Стива в кобуры, предметы подсвечиваются меньше, стойка с ножом на зажатый пробел (как в RE2R/RE4R).
10. **Итерация 6.10**: убрать свободную смену персонажа; катсцена-интро (вертолёт → посадка → охрана ведёт Клэр в
   тюрьму → тревога, клетка открывается); Клэр стартует безоружной в клетке (зажигалка в камере, нож и пистолет —
   снаружи); катсцена после открытия ворот: знакомство со Стивом, Клэр отдаёт ему всё, кроме пистолета, дальше
   играем за Стива (у него сразу Люгеры).

---

## 6. Сделано в последних итерациях (6.1–6.10)

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

### 6.8 Итерация «лица / волосы / двери RE2 / Люгеры / хват оружия»
- **Похожесть лиц** (`tools/blender/faceshape.py`): по ориентирам головы HBM (`landmarks`: центр глаз M, межзрачковое
  iod, нос, подбородок, рот, бровь) строится гладкое поле смещений `field()` (ширина челюсти/подбородка, длина нижней
  трети, скулы, ширина/кончик носа, губы, уголки рта, брови, лоб) + `lids()` (поворот век вокруг центра глазного
  яблока: тяжёлое верхнее веко, нижнее вверх, наклон глазной щели). Профили `CLAIRE` (овал, высокие скулы, узкий
  подбородок, прямой узкий нос, миндалевидные «тяжёлые» глаза) и `STEVE` (юное вытянутое лицо, мягкая узкая челюсть,
  маленький нос, ухмылка — правый уголок выше). Применяется одинаково ко всем LOD (`body`, `body0`, `high`) —
  веса/UV не ломаются: в `claire_s1.py` после масштаба, в `steve.py` после `slim`. Быстрый подбор:
  `CV=claire|steve PROF='dict(jaw_w=0.88)' python3 tools/facepreview.py out.png` (Workbench до/после, анфас + 3/4).
- **Текстуры лиц**: тонкие сужающиеся брови (Клэр — тёмные бордово-коричневые, Стив — медные); волосы Клэр —
  тёмный бордово-каштановый (`claire_s4.py`, `dark/light` атласа).
- **Волосы Стива асимметричные** (`steve.py`, «hair (cap + cards)»): пробор смещён к его левой стороне (+X), длинная
  чёлка (62 % прядей, `fr=1`) идёт через лоб к его правому глазу, кончики на уровне глаза, отступ от лица растёт к
  кончику; короткая сторона зачёсана назад над ухом; 5 слоёв × 190 карт.
- **Прозрачные волосы — причина и фикс**: видимая часть карт (особенно чёлки) приходилась на нижние 20–40 % UV, где в
  атласе пряди были редкими/обрезанными → `alphaTest` выбрасывал пиксели (на любом качестве). Теперь в атласах
  (Стив и Клэр) под прядями лежит непрозрачная «сердцевина» с прозрачными краями и ступенчатыми кончиками, длина
  прядей 0.82–1.0, затухание только в последних 12 %. На Ultra дополнительно: волосы без alpha-to-coverage,
  `gl_FragColor.a = 1`, и они исключены из GTAO-прохода (`src/engine/RenderFlags.ts` → `NO_AO`, обёртка `ao.render`
  в `Renderer.ts`; override-материал GTAO игнорировал alphaTest).
- **Двери как в RE2** (`PrisonAnnex.ts`: `DOOR_W=0.95`, `DOOR_H=2.12`, `singleDoor(...)`): одинарные двери меньше
  (персонаж ≈80 % высоты), створка по центру проёма, панели-заполнители над/по бокам (коллайдеры 'wall') + стальная
  коробка. Применено к archive/office/guard/cell/admin/gallery/train/barracks. Двойные (palaceDoor, hallEnd) не менялись.
- **Автозакрытие** (`Door` в `Interactables.ts`): `static closeDelay = 3.5` с; если рядом никого (ближе
  width+radius+0.9) дольше задержки — доводчик-пружина возвращает створки, при |a|<0.035 и |w|<0.5 → `latch()`
  (коллайдер обратно, flag `open:id` снимается, щелчок, шум). `onOpen` срабатывает только при первом открытии.
  `collider.navPass = !locked` → `Physics.walkable()` (navQuery) пропускает такие коллайдеры, ИИ строит путь сквозь
  закрытые незапертые двери и толкает их. Тесты: `scripts/doors.mjs` (ставит `closeDelay=1e9` на время push-теста,
  затем проверяет автозакрытие), `scripts/tour.mjs` тоже ставит `closeDelay=1e9`.
- **Хват оружия** (`ClaireModel.ts`): `gripOff` — ориентация оружия относительно кисти (ствол вдоль пальцев, наклон
  0.45 рад), `twoBoneIK(upper, fore, hand, target, pole, w)`. Длинное оружие (hold 'rifle'): поза оружия от тела —
  при прицеливании приклад в плечевом кармане, в покое у бедра стволом вниз-влево; правая рука IK на рукоять, левая
  на цевьё (`gunSupport`). Пистолет при прицеливании — левая рука обхватывает рукоять (IK). Двойные Люгеры — по кадру
  кистей.
- **Отдача и механика**: `AnimParams.shots` (= `WeaponSystem.shots`) → `fireT`; `kickK()` — огибающая отдачи: оружие
  подбрасывается вокруг рукояти и уходит назад, руки дёргаются вверх. **Люгер P08** (`weapons2.py luger`, ≈22k тр.):
  ступенчатый ствол с мушкой на основании, ствольная коробка-вилка, рама с выборкой, спуск/скоба, предохранитель,
  флажок разборки, накладки из слоновой кости с насечкой и тёмной гравировкой, гравировка-арабески на золоте,
  магазин с кнопкой, антабка; **затвор toggle-lock — отдельные узлы** `toggle_r` (задний рычаг на оси рамы),
  `toggle_f` (передний рычаг), `breech` (затвор): при выстреле колено рычагов «ломается» вверх, затвор уезжает назад
  (`animateAction`, кинематика двух звеньев). Viewer: `&fireT=0.04` — фаза после выстрела, `shot=gun&cx=&cy=&cz=`.

---

### 6.9 Итерация «двери-дыры / кобуры / блеск предметов / нож на пробел»

1. **Баг закрытия двери** (скриншот: в комнате пропадала стена с дверью, вместо неё — плоский тёмный фон).
   Причина — портальное отсечение `ZoneStreamer` (`src/engine/Streaming.ts`): стена/проём между зонами строится
   группой *соседней* зоны; пока дверь открыта (`portalOpen`), соседняя зона видима, а после `latch()` её группа
   целиком скрывалась вместе с общей стеной. Плюс отсечение считалось от зоны **камеры** (камера могла оказаться
   в соседней зоне → скрывалась комната игрока). Исправление:
   - видимость считается от зоны игрока **и** зоны камеры (объединение их открытых порталов);
   - соседи за **закрытым** порталом в «краевом режиме»: группа видима, но скрыты все дочерние объекты, чей bbox
     не касается границ текущей зоны (+0.35 м); bbox кешируются (WeakMap), набор скрытых восстанавливается при выходе;
   - `streamer.shown` — зоны, видимые полностью; по нему видимость зомби (`World.updateZombies`) и дождя (`Game.ts`).
   Тест: `node scripts/doorvis.mjs` (40 комбинаций дверь×сторона×камера → зона игрока видима, `bad 0`).
2. **Кобуры Стива + анимация** (`ClaireModel.buildHolsters`, только для `key === 'steve'` и detailed):
   кожаные набедренные кобуры (сужающийся чехол, окантовка, 2 ремня с пряжками, ремешок к поясу) строятся в
   пространстве персонажа в rest-позе и `thigh.attach()` к костям бёдер; в каждой — свой Люгер (ствол вниз,
   рукоять назад-вверх). `setWeapon()` теперь: с Люгеров на другое → `holsterAnim {mode:'put', dur 0.72, swap 0.4}`
   (руки IK-ом тянутся к рукоятям в кобурах, в момент swap пистолеты из рук пропадают, в кобурах появляются, затем
   `applyWeapon(pending)`); на Люгеры → `draw {dur 0.62, swap 0.27}`. Пока идёт анимация `weaponBusy()` → прицел
   запрещён. В кобурах Люгеры видны, когда у Стива другое оружие / нож / стойка с ножом (`hasLugers` ставит
   `World.equip` по инвентарю Стива). Viewer: `viewer=steve&weapon=gold_lugers&holster=0.3` (заморозка кадра
   убирания), `viewer=steve&weapon=knife&draw=0.4`.
3. **Блеск предметов меньше** (`ItemPickup.update`): спрайт 0.07 (было 0.18–0.38), opacity 0.35, короткая
   вспышка до 0.18/0.7 раз в ~2.5 с (фаза от позиции, чтобы предметы мерцали вразнобой).
4. **Стойка с ножом (Space удерж., геймпад RB/кнопка 5)** — как в RE2R/RE4R: `Input.knifeHold()`,
   `PlayerController.knifeReady` (также ПКМ, если экипирован нож): персонаж поворачивается за камерой, медленный шаг,
   пистолеты убраны (у Стива — в кобурах), нож поднят в левой руке (`knifeK`-бленд позы: рука с ножом вперёд на
   уровне пояса/груди, вторая рука прикрывает, колени мягкие; лезвие повёрнуто вперёд `rotation.x = π/2 − 0.75·k`).
   ЛКМ — быстрый взмах (`knife`, как F; с добиванием лежачих), ПКМ — колющий выпад `stab` (0.62 с: замах →
   выпад с полушагом вперёд → возврат; `knifeAttack(..., heavy=true)`: узкий конус ±0.14 рад, дальность +0.45 м,
   урон ×2.2). Space раньше использовался только для вырывания из захвата (`struggle`) — не конфликтует.
   Тест: `node scripts/knife.mjs` (стойка, взмах, выпад, отпускание + убрать/достать Люгеры Стива) → `KNIFE/HOLSTER OK`.

### 6.10 Итерация «сюжет: интро, клетка, встреча со Стивом»

1. **Свободной смены персонажа больше нет**: убраны клавиша C / D-pad ↑ (`Input.switchCharacter` удалён, блок в
   `Game.simulate` удалён, меню/README/§10). Метод `World.switchCharacter()` оставлен — им пользуется сюжет и тесты.
2. **Система катсцен** (`src/game/cutscenes/`):
   - `Cutscene.ts` — базовый класс: таймлайн одноразовых событий `at(t, fn)`, субтитры `line(t0, dur, who, text)`,
     титры `caption()`, затемнения `fadeKeys([t, opacity]...)`, тряска камеры, хелперы `cam()/dolly()`;
     `focus` — точка для стриминга/`level.update`/дождя; `hideZombies`, `activeZombies` (кого симулировать);
     `skip()` → `finish()` (финальное состояние мира). Мягкий заполняющий свет у камеры (виртуальный PointLight в LightPool).
   - `Game`: режим `'cutscene'` → `cutsceneStep()` (игрок и AI заморожены; FX, уровень, интерактивы, стриминг, свет,
     дождь работают; камера — от сценария, `rig.update` не вызывается). Пропуск: Enter / Esc / геймпад Start
     (`Input.skip()`), после 0.3 с. В конце — HUD обратно, `rig.yaw = player.yaw`.
   - UI: `src/ui/Cinema.ts` + стили `.cinema` (леттербокс, субтитры с именем говорящего, титр локации, затемнение,
     подсказка пропуска).
   - `Actors.ts`: `HumanActor` (Клэр/Стив по путевым точкам через `ClaireModel.animate`, прицел/взгляд/отдача),
     `GuardActor` — охранник Umbrella из меша `zombie_guard`: «очищенная» текстура (кровь → ткань, кожа → чёрные
     перчатки/балаклава, `cleanUniform()` на canvas), шлем + противогаз (крепятся к кости головы), разгрузка, MP5 в
     положении «у груди» (прикреплён к spine, руки — `twoBoneIK` на рукоять и цевьё), процедурная походка.
   - `Helicopter.ts` — процедурный вертолёт (пропорции UH-1): фюзеляж, остекление, хвостовая балка, вращающиеся
     несущий/рулевой винты + диск размытия, лыжи, сдвижная дверь (+X), логотип Umbrella (canvas), маячки,
     прожектор (SpotLight, гаснет после посадки), подсветка днища и салона.
   - Звук (`AudioEngine`): `heliLoop(pos)` (рубящий шум лопастей + турбина, setPos/setLevel/stop), `alarm(dur)`
     (двухтональная сирена), `clank()` (решётка), `thunder()`.
3. **Интро** (`Intro.ts`, 47 с; только новая игра без флага `introDone`): вертолёт заходит из-за южной стены сквозь
   ливень с молниями (вспышки `moon`/`hemi`, у них теперь `name`), садится во дворе (−1,0,18) → выходят охранник,
   Клэр, охранник → проход через двор к караулке (камера сопровождает) → затемнение → блок B: Клэр заводят в камеру,
   решётка задвигается (флаг `cellOpen` снят), «Добро пожаловать на Рокфорт» → «Несколько часов спустя» → взрыв,
   тряска, сирена, оповещение, аварийная разблокировка (флаг `cellOpen`). `finish()`: убрать вертолёт/охрану, Клэр в
   камере `CELL_SPAWN (34,0,38.6) yaw π`, флаги `introDone`, `cellOpen`, сирена (если пропустили раньше).
   Объекты интро создаются **до** `warmup()`, чтобы шейдеры скомпилировались за экраном загрузки.
4. **Старт без оружия** (`World` — новый инвентарь Клэр пуст; `PrisonLevel`):
   - камера Клэр — №3 (x 32–36) блока B: раздвижная решётчатая дверь (группа прутьев катится на восток, коллайдер
     выключается при k>0.6, `doorsChanged` → nav), состояние — флаг `cellOpen`; навточка (34, 38.5);
   - зажигалка `c_lighter` на койке камеры; ключ-карта `g_key` убрана, дверь блока B (`cellDoor`) без замка
     (тревога сняла блокировку; журнал охраны переписан); `cells_1` перенесён в конец холла (41.5, 33.4);
   - во дворе у караулки — мёртвый охранник (`y_guardBody`, зомби с флагом `dead:`), рядом нож `y_knife`, M9F
     `y_m9f` (`ItemPickup` получил `extra` → `{mag:15}`) и патроны `y_ammo0` ×15;
   - без ножа: нет F/стойки/контратаки (`PlayerController`: `hasKnife = weapons.inv.has('knife')`, сообщение
     «Ножа нет. Q — оттолкнуть.»), HUD «Без оружия»; подобранное первое огнестрельное оружие экипируется само.
   - `?devstart` (`World.devStart()`): старый старт для тестов — без интро, двор (0,0,3), M9F/нож/патроны/трава/зажигалка.
5. **Встреча со Стивом** (`MeetSteve.ts`, 37 с): триггер в `Game.simulate` — `gateOpen`, нет `steveMet`, играем за
   Клэр, `z > 42.4`, `|x| < 7`. Стив выходит у ворот, двумя выстрелами из Люгеров сносит голову зомби `go_1`
   (если тот жив), берёт Клэр на прицел, диалог (пересказ, не дословно), Клэр отдаёт снаряжение и уходит к мосту.
   `finish()`: `World.handOverToSteve()` — всё из инвентаря Клэр, **кроме M9F** (и дубля ножа), переходит Стиву
   (ёмкость Стива ≥ Клэр, излишек — в сундук), затем `switchCharacter()` → Стив с Люгерами в (−1.3, 0, 48.2), флаг
   `steveMet`. Зажигалкой теперь может пользоваться Стив (`useItem` через `player.model`); камин больше не
   подсказывает про смену персонажа.
6. Тест: `node scripts/cutscene.mjs` (кадры интро/встречи → `shots/cut_*.png`, проверки финальных состояний) →
   `CUTSCENES OK`; `node scripts/start.mjs` (пропуск интро, клетка, зажигалка, дверь, C не работает, F без ножа,
   подбор M9F с mag 15) → `START OK`. Старые тесты переведены на `play.html?devstart`.

### 6.11 Итерация «готовая модель Клэр от пользователя»
- Пользователь прислал `claire-redfield-survival-unit.zip` (Sketchfab, Claire из *Resident Evil: Survival Unit*:
  1 меш ~3k треугольников, текстуры D 512 / N 1024 / ORM 512, скелет Bip001 (55 костей), 3 оружия и ~300 чужих
  анимаций). Исходник НЕ хранится в репо (лежал в `/data/cv_claire_src/source/Sclaire.glb`).
- Конвертер `tools/import/claire_su.py <Sclaire.glb> src/assets/models/claire_su.glb` (python+numpy, без Blender):
  оставляет только меш Клэр, проверяет bind == rest, переименовывает кости в имена игрового рига
  (Pelvis→hips, Spine→spine, Spine1→chest, Clavicle→lClav, UpperArm/Forearm/Hand, Calf→lShin, Hair_01..04→pony0..3,
  пальцы → `lF{палец}{сегмент}`, 0 = большой), хелперы (Root/Bip001/IK/Bone_Gun_01) сливает в hips/rThigh,
  **удаляет треугольники пистолета в кобуре** (Bone_Gun_02; scale 0 у кости давал NaN-нормали → чёрный экран через bloom),
  суставы — только translation, меш `claire_outfit` (ветка «прочие материалы» в buildDetailed, aoMap = ORM.R).
- `ModelLibrary`: `claire` = `claire_su.glb` по умолчанию; `?classic` — старая Blender-Клэр (`claire.glb` остался).
- `ClaireModel.buildFingers/curlFingers`: у новой модели нет shape keys (blink/pain/grip) → хват делается сгибанием
  костей пальцев по `gripL/gripR` (ось = поперёк костяшек, знак проверен рендером). Моргания/мимики нет.
- Стив пока старая Blender-модель (разный стиль); тесты start/cutscene/knife/func/doors пройдены.

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
- `node scripts/cutscene.mjs` — катсцены интро и встречи со Стивом: перемотка `cut.step(0.05)` без рендера до нужного
  времени, кадры `shots/cut_intro_*.png`, `shots/cut_meet_*.png`, проверки → `CUTSCENES OK` (переменные INTRO/MEET —
  списки времён кадров).
- `node scripts/start.mjs` — старт новой игры (клетка, без оружия, подбор M9F) → `START OK`.
- Тесты, которым нужен старый старт (двор, с оружием), открывают `dist/play.html?devstart`.
- `node scripts/doorvis.mjs` — после закрытия двери зона игрока остаётся видимой (портальное отсечение).
- `node scripts/knife.mjs` — стойка с ножом на Space (ЛКМ/ПКМ) + кобуры Стива. В headless кадры идут редко →
  ждать состояние через `waitForFunction`, а не `waitForTimeout`.
- `node scripts/doors.mjs` — физика дверей (толчок с обеих сторон + автозакрытие) + фонарик.
- `node scripts/doorshot.mjs medium archiveDoor,officeDoor` — персонаж у закрытой двери (масштаб) → `shots/door_<id>.png`.
- `node scripts/hairq.mjs ultra|medium` — крупный план волос Стива в игре → `shots/hair_<q>.png`.
- Viewer: `window.__scene` — сцена для отладки из `page.evaluate`; `npm run build` обязателен перед viewer (он грузит `dist/play.html`).
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
**Space (удерж.) — стойка с ножом: ЛКМ взмах, ПКМ колющий выпад** ·
R — перезарядка / смена типа гранат и болтов · F — нож / добивание лежачих / контратака при захвате ·
Q — оттолкнуть зомби · E — взаимодействие · Tab / I — инвентарь (R — поворот, перетаскивание — объединить) ·
1–8 / колесо — смена оружия · **L — фонарик (Стив)** · двери открываются, если идти в них · Esc — пауза · F3 — отладка · F9 — чит (весь арсенал).
Катсцены: Enter / Esc (геймпад Start) — пропустить. Персонаж меняется только по сюжету (Клэр → Стив после ворот).
Геймпад: LS/RS, LT прицел, RT огонь, B нож, X перезарядка, Y действие, LB толчок, RB (удерж.) — стойка с ножом, D-pad ↓ (кнопка 13) — фонарик, Start — пауза / пропуск катсцены.
