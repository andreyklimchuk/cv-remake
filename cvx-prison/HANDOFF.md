# HANDOFF — состояние проекта `cvx-prison` (для продолжения другим ИИ)

Ветка **`cvx-prison`** репозитория `andreyklimchuk/cv-remake`. Работать **только** в этой ветке и только в папке `cvx-prison/` (ветки `main`/`cv-remake` не трогать).

## Цель (требования владельца — Андрей, общаться по-русски)
Браузерный порт **Resident Evil Code: Veronica X**. Все ресурсы (комнаты, модели, анимации, тексты, звуки) берутся из **PS3-версии** игры и конвертируются. Главное правило: **всё «точь-в-точь как в оригинале», ничего не придумывать от себя** (тексты — только оригинальные, переведённые на русский; поведение — по данным игры). Если что-то сделано приближённо — честно сообщать.

Текущая задача владельца (в порядке приоритета):
1. ✅ Исправить: перевёрнутая иконка пистолета, экипировка оружия, повторные удары ножом, локация справа от ворот (rm_0050).
2. ✅/⏳ **Всё через скрипты событий (evt)** — интерпретатор написан (`src/evt.ts`), ручные таблицы game.ts удалены. Остались: камеры событий (evc), модели/движения NPC, эффекты — см. «Приближения».

## Структура ветки
```
cvx-prison/
  index.html, game.js      — опубликованная сборка (играбельна прямо с GitHub Pages/raw)
  data/*.js                — ассеты, порезанные на части ~800 КБ (base64 внутри push([...]))
  src-ts/                  — исходники игры (Vite + TypeScript + three.js 0.170)
    src/game.ts            — игровой цикл, комнаты, EvtHost (связка VM ↔ сцена), осмотр/подбор/двери/сохранение по ATR
    src/evt.ts             — ВИРТУАЛЬНАЯ МАШИНА СКРИПТОВ (EvtVM, задачи-корутины, флаги, works, ATR etc/wal/flr)
    src/evtops.ts          — таблица длин/имён команд (генерируется evt/mkops.py из evt/ops.json)
    src/sysmes.ts          — оригинальные системные сообщения и имена предметов (сгенерировано из conv/sysnames.json)
    src/room.ts            — загрузка комнаты (glb + json: камеры, коллизии, триггеры, спавны, сообщения)
    src/player.ts          — Клэр: движение, нож/пистолет/зажигалка, синхронные анимации (playSync)
    src/enemy.ts           — EnemyModel, Zombie (en01), Dog (en04)
    src/invscreen.ts       — экран инвентаря (иконки из оригинальных inv-моделей, ICON_ROT)
    src/text.ts            — русские переводы оригинальных строк (RU, ITEM_RU), pages()
    src/evcam.ts           — камеры событий (порт bhInitEventCamera/bhControlEventCamera из cut.c)
    src/camera.ts, ui.ts, audio.ts, input.ts, inventory.ts, assets.ts
    scripts/split.mjs      — режет web/dist в ghpub/cvx-prison (data/*.js, game.js, index.html)
  tools/                   — конвертеры и служебные скрипты (python)
    bootstrap.sh           — ВОССТАНОВЛЕНИЕ ОКРУЖЕНИЯ (см. ниже)
    mkpush.py              — готовит батчи для GitHub push_files
    arc.py, ninja.py, mtn.py, tex.py, glb.py, conv_mdl.py, add_clips.py, add_clips2.py, spc.py, ...
  conv/                    — конвертеры комнат/врагов: room.py, enemy.py, mes.py, itemnames.json ...
  evt/                     — разбор скриптов: load.py, dis2.py, pretty.py (листинг: `python3 pretty.py rm0050 0`),
                             table.py/declen.py (длины команд из PS2-декомпиляции + PS3-поправки ps3over.json), ops.json, mkops.py
  conv/evt_export.py       — `python3 conv/evt_export.py rm_XXXX ...` → web/public/assets/evt/rm_XXXX.json {scripts:[hex]}
  conv/evc_export.py       — `python3 conv/evc_export.py` → дописывает "evc" (камеры событий EVCM) в assets/evt/rm_XXXX.json
  conv/ent_patch.py        — дописывает поле "ex" (байты 6..11 записей ene/obj/itm) в готовые room.json
  dev/                     — тест-стенд: shot.mjs, shotc.sh, t_start.js, t_*.js
```

## Восстановление окружения (песочница сбрасывается!)
```bash
# скачать ветку и выполнить bootstrap
curl -sL -o /tmp/b.zip https://codeload.github.com/andreyklimchuk/cv-remake/zip/refs/heads/cvx-prison && cd /tmp && unzip -qo b.zip
bash /tmp/cv-remake-cvx-prison/cvx-prison/tools/bootstrap.sh
```
bootstrap.sh делает:
- `/data/cvx/web` ← `src-ts`; `web/public/assets` собирается из `data/*.js` **только по `<script src="data/...">` из index.html** (в data/ бывают устаревшие части); ролик mv_000 — из `data/mv_000_*.js`.
- `/data/cvx/tools`, `/data/cvx/conv`; node_modules ставятся в `/data/cvxweb/node_modules` (three@0.170, vite@5, typescript, @types/three@0.170, playwright) и линкуются в `web/node_modules`.
- Образ игры (PS3 ISO, Google Drive id в скрипте) качается в `/tmp/cvxg`, распаковывается; `/data/cvx/g` → `.../USRDIR/BHCV/nativePS3`.
- **Не делает** (сделать вручную): скопировать `evt/` и `dev/` из ветки в `/data/cvx/evt`, `/data/cvx/dev`, и `cp /data/cvx/dev/* /data/cvx/` (тест-стенд ожидает файлы в /data/cvx); распаковать комнаты в `/data/cvx/ex/rmXXXX` (через tools/arc.py из `g/biocv_disc/eng/rdx_lnk/*` — так делал conv/room.py; при отсутствии ex/ room.py может распаковать сам — проверить).

## Сборка, тест, публикация
- Сборка: `cd /data/cvx/web && npx vite build` (→ web/dist).
- Тест: `cd /data/cvx && bash shotc.sh NAME t_xxx.js [scale]` (тестирует **web/dist** — сначала vite build) — поднимает dist на :5199, headless chromium (`/usr/local/bin/chromium`, swiftshader), выполняет `t_start.js` (новая игра, пропуск ролика, `g = window.__game`) + тестовый скрипт; `return [dataURL...]` → `shots/NAME.png` (сетка), `console.log('LOG ...')` → в вывод. В тестах: `g.loop=()=>{}`, `g.sim(sec, ['KeyE',...])`, `g.enterRoom(id, spawn, undefined, false)`, `g.interact(trigger)`, `g.player.place(x,y,z,h)`.
- Публикация: `cd web && node scripts/split.mjs && cd .. && python3 tools/mkpush.py "сообщение"` → `/data/cvx/ghargs/NN.json`; затем **по одному** `GitHub.push_files(arguments_file_path=/data/cvx/ghargs/NN.json)` по порядку (последний батч — game.js+index.html). Проверка: повторный `mkpush.py` должен выдать 0 батчей.

## Что есть в игре (на коммит этой передачи)
Комнаты (ROOMS в game.ts): rm_0000, rm_0010, rm_0020, rm_0021, rm_0030, rm_0031, rm_0040, rm_0050, rm_0060, rm_0080. Id комнаты = `rm_{stg}{room:2}{rcase}`; rcase (вариант комнаты) выбирает скрипт (vm.rcase). Дверь в неперенесённую комнату → сообщение «Дверь ведёт в … не перенесена».

### Интерпретатор событий (src/evt.ts) — как устроено
- Источник семантики: PS2-декомпиляция **fmil95/recvx-decomp** (`event.c`, `bh*`-функции; клонировать в /tmp/recvx-decomp при необходимости). Длины команд PS3 сверены на всех скриптах (evt/ops.json).
- Скрипты комнаты: 0 = scd0 (init при входе), 1 = scd1 (каждый кадр), N+2 = событие N. Логика 30 Гц (Ps2SwapDBuff ждёт 2 vsync) — `evtFrame` в game.ts.
- Байт-порядок: команды big-endian; ATR-записи (`atrFrom`): flg=t&0xff, type=(t>>8)&0xff, attr=bswap32(flags), prm = LE-байты extra.
- Флаги: группы `ev`(1) события, `ed`(3) убитые враги, `it`(7) взятые предметы, `mp`(8) карта, `rm`(4) комнатные и т.д. (`vm.f`), сохраняются в SaveData.evt.
- works (`vm.works`, ключ `kind:idx`; kind 0 игрок, 1 враги/NPC, 2 объекты, 3 предметы, 4 эффекты): pos/ang (POS/ANG/…SIGN), gone (bhInitModelSet b3=0, ENESETCK, ITMSETCK), hidden, scripted, mtnKind/mtn (MOTION: kind 1 = комнатное движение rmt).
- Системные биты `vm.cb`: 0x100 осмотр (etc_idx), 0x200 стоим в FLOOR-зоне (flr_idx), 0x400 предмет использован, 0x800 предмет взят, 0x4000/0x8000 авто-подбор/пистолет, 0x10 открыть экран предмета (sb_id), 0x200000 экран сохранения, 4 = катсцена (пропуск Esc/Enter/Space → cb|=0x10000000). `vm.st&4` — катсцена (игрок заморожен).
- Хост (game.ts implements EvtHost): message/yes-no (mes_sel), fade, movie (MV_NNN — в сборке есть только mv_000), door, weapon/setWeapon, hasItem/loseItem, camSet (kind 0 → камера события evc, иначе обычная), camFix (0x2a), camPause (0x29), camInit (0x5b).
- bhCheckExmAtari (`examine`): EXM_DIST по type, биты 0x400/0x800/0x1000/0x2000 исключают направление взгляда; type0 дверь, 3 сообщение, 4 предмет. bhCheckFloorP (`floorCheck`): использование предмета в зоне FLOOR, если prm зоны содержит id.
- Враги: спавн из room.enemies, если work не gone; en01 (зомби) варианты 0,1,2,9,10,32,33; en04 собака. Комнатные движения rmt конвертируются в клипы `rm_XXXX/rNN` модели (conv/enemy.py, 8-й аргумент — список rmt через запятую); так сделан труп охранника в rm_0030/0031.
- NPC катсцен (assets/npc/*.glb, NPC_MODELS в game.ts → `this.chars`): **en91 = двойник Клэр** для катсцен (rm_0000/0030/0040), **en98 = Родриго** (rm_0000), **en93 = Стив** (rm_0030 на вышке, rm_0040). Позиция/видимость/движение — только из works скриптов; клип `rm_XXXX/rNN`, время = frm/65536/30.
  Конвертация: `python3 conv/enemy.py MDL TEXDIR - OUT NAME 0 27 "rm_0000/…/xxx.rmt:0,5;…"` — 8-й аргумент: rmt через `;`, у каждого `файл[:i,j]` (номера блоков MTN = номер движения).
- Движения: 0x18/0x22 (bhCommonCtr) ставят mtn и frm (0x22: frm = u16<<16 для всех kind) и снимают паузу; bhMotionPauseSet 0x2b / bhInitMotionPause 0x2d / 0x30 (mode3=4) — замораживают кадр (`work.paused`); Sub_controll 0x8f/0x90/0x92/0x93 — сбрасывают.
- Player_controll 0x64 sub 07/0c/0d — позиция/угол игрока (так скрипт возвращает Клэр после катсцены; раньше игнорировалось → телепорт в 0,0,0).
- Камеры событий (evcam.ts): 20-точечный сплайн Overhauser по ключам, кадров на сегмент при 30 Гц, nxt-цепочки, lock на персонажа/объект (lockPos в game.ts: 1 игрок, 2 NPC/враги, 3 объекты, 4 предметы, 6 спавны); углы (-ax,-ay,az) 'YXZ', верт. fov = 2·atan(tan(pers/2)·0.75).
- Отладка без браузера: `npx tsx dev/vmtest.ts rm_XXXX тиков` (FLR=n — имитация стояния в зоне). Хелперы браузерных тестов — dev/t_lib.js (`cat t_lib.js t_flowN.js > /tmp/tf.js`): st, snap, sim, closeMsgs, skipMovie, waitFree, act(etc), listEtc, inv. Промисы (MessageBox) резолвятся только на await → `await sleep()` между sim.

### Проверено тестами
Катсцены: rm_0000 встреча с Родриго (dev/t_r00c.js, события 0–5/18/21, камеры evc 1,2,31,36,4,32,35,33,8,23,24,25; в конце игрок там, где двойник en91), rm_0030 труп/Стив (dev/t_cine30b.js). Пролог (события 29/32/31, ролик 0, пробуждение, сообщение 4 про зажигалку) → зажигалка в зоне → сцена Родриго (пропускается) → дверь камеры открыта скриптом; подборы ножа/патронов/трав через ITMSETCK; rm_0010 лента+патроны, машинка (вопрос → сохранение); rm_0020 зомби; rm_0030 пистолет через событие трупа; вход во все 10 комнат без ошибок. Собаки rm_0050 появляются только при ev[117]==1 (так в скрипте).

### Известные приближения / недоделки (честно)
- Камера события: lock на кость (lkono) приближён корнем модели; hidobj/туман/clip из evc не применяются.
- Не сконвертированы: en62 (пулемёт/прожектор, нескиннинговая MDL, rm_0030), en67 (rm_0010), en00. Собственный ИИ NPC (после Sub 0x80) не реализован — NPC стоит в последней позе скрипта.
- Голос/субтитры катсцен отсутствуют (англ. сообщения катсцен пустые); эффекты (works kind 4) не рисуются; FrameCheck — по счётчику кадров work, а не по реальной анимации.
- Количество патронов в пачках/пистолете — по данным предметов (пистолет 12/15), экран сохранения упрощён (текст UI.saved — свой).
- «Лежачие» зомби на кладбище: эвристика (тип поведения 0 в rm_002x). Назначение клипов собаки и выход из будок — приближённо.
- Звуки зомби/собак не сопоставлены.

## План дальше
1. en62/en67, hidobj камер событий.
2. Следующие комнаты (7, 9, 16 …): `python3 conv/room.py rm_XXXX`, `python3 conv/evt_export.py rm_XXXX`, добавить в ROOMS.
