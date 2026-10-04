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
    src/audio.ts           — звук: BGM (петли из bgm_all.stq), банки SE комнаты/ambience/шагов, 3D-громкость/панорама, слоты
    src/camera.ts, ui.ts, input.ts, inventory.ts, assets.ts
    scripts/split.mjs      — режет web/dist в ghpub/cvx-prison (data/*.js, game.js, index.html)
  tools/                   — конвертеры и служебные скрипты (python)
    bootstrap.sh           — ВОССТАНОВЛЕНИЕ ОКРУЖЕНИЯ (см. ниже)
    mkpush.py              — готовит батчи для GitHub push_files
    arc.py, ninja.py, mtn.py, tex.py, glb.py, conv_mdl.py, add_clips.py, add_clips2.py, spc.py, ...
  conv/                    — конвертеры комнат/врагов: room.py, enemy.py, mes.py, itemnames.json ...
  conv/sound.py            — звук PS3 → web/public/assets/audio/{se/БАНК.json + se/БАНК/NN.ogg, bgm.json + bgm/ИМЯ.ogg}
  tools/sfh.py, srq.py     — SFH-деблокинг (ОБЯЗАТЕЛЕН для всех .spc/.srq/.at3!) и разбор таблиц запросов SE (.srq)
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
Комнаты (ROOMS в game.ts): rm_0000, rm_0010, rm_0020, rm_0021, rm_0030, rm_0031, rm_0040, rm_0050, rm_0060, rm_0070 (дом во дворе), rm_0080, rm_0090, rm_0160. Id комнаты = `rm_{stg}{room:2}{rcase}`; rcase (вариант комнаты) выбирает скрипт (vm.rcase). Дверь в неперенесённую комнату → сообщение «Дверь ведёт в … не перенесена».

### Интерпретатор событий (src/evt.ts) — как устроено
- Источник семантики: PS2-декомпиляция **fmil95/recvx-decomp** (`event.c`, `bh*`-функции; клонировать в /tmp/recvx-decomp при необходимости). Длины команд PS3 сверены на всех скриптах (evt/ops.json).
- Скрипты комнаты: 0 = scd0 (init при входе), 1 = scd1 (каждый кадр), N+2 = событие N. Логика 30 Гц (Ps2SwapDBuff ждёт 2 vsync) — `evtFrame` в game.ts.
- Байт-порядок: команды big-endian; ATR-записи (`atrFrom`): flg=t&0xff, type=(t>>8)&0xff, attr=bswap32(flags), prm = LE-байты extra.
- Флаги: группы `ev`(1) события, `ed`(3) убитые враги, `it`(7) взятые предметы, `mp`(8) карта, `rm`(4) комнатные и т.д. (`vm.f`), сохраняются в SaveData.evt.
- works (`vm.works`, ключ `kind:idx`; kind 0 игрок, 1 враги/NPC, 2 объекты, 3 предметы, 4 эффекты): pos/ang (POS/ANG/…SIGN), gone (bhInitModelSet b3=0, ENESETCK, ITMSETCK), hidden, scripted, mtnKind/mtn (MOTION: kind 1 = комнатное движение rmt).
- Системные биты `vm.cb`: 0x100 осмотр (etc_idx), 0x200 стоим в FLOOR-зоне (flr_idx), 0x400 предмет использован, 0x800 предмет взят, 0x4000/0x8000 авто-подбор/пистолет, 0x10 открыть экран предмета (sb_id), 0x200000 экран сохранения, 4 = катсцена (пропуск Esc/Enter/Space → cb|=0x10000000). `vm.st&4` — катсцена (игрок заморожен).
- Хост (game.ts implements EvtHost): message/yes-no (mes_sel), fade, movie (MV_NNN — в сборке есть mv_000 и mv_001), door, weapon/setWeapon, hasItem/loseItem, camSet (kind 0 → камера события evc, иначе обычная), camFix (0x2a), camPause (0x29), camInit (0x5b).
- bhCheckExmAtari (`examine`): EXM_DIST по type, биты 0x400/0x800/0x1000/0x2000 исключают направление взгляда; type0 дверь, 3 сообщение, 4 предмет. bhCheckFloorP (`floorCheck`): использование предмета в зоне FLOOR, если prm зоны содержит id.
- Враги: спавн из room.enemies, если work не gone; en01 (зомби) варианты 0,1,2,9,10,32,33; en04 собака. Комнатные движения rmt конвертируются в клипы `rm_XXXX/rNN` модели (conv/enemy.py, 8-й аргумент — список rmt через запятую); так сделан труп охранника в rm_0030/0031.
- NPC катсцен (assets/npc/*.glb, NPC_MODELS в game.ts → `this.chars`): **en91 = двойник Клэр** для катсцен (rm_0000/0030/0040), **en98 = Родриго** (rm_0000), **en93 = Стив** (rm_0030 на вышке, rm_0040). Позиция/видимость/движение — только из works скриптов; клип `rm_XXXX/rNN`, время = frm/65536/30.
  Конвертация: `python3 conv/enemy.py MDL TEXDIR - OUT NAME 0 27 "rm_0000/…/xxx.rmt:0,5;…"` — 8-й аргумент: rmt через `;`, у каждого `файл[:i,j]` (номера блоков MTN = номер движения).
- Движения: 0x18/0x22 (bhCommonCtr) ставят mtn и frm (0x22: frm = u16<<16 для всех kind) и снимают паузу; bhMotionPauseSet 0x2b / bhInitMotionPause 0x2d / 0x30 (mode3=4) — замораживают кадр (`work.paused`); Sub_controll 0x8f/0x90/0x92/0x93 — сбрасывают.
- **Common_controll 0x69**: субкоманды 0x1c–0x21, 0x2b–0x2d потребляют на 1 байт меньше длины из таблицы; хвостовой 0xfe исполняется как bhEvtNext → каждый шаг FOR-интерполяции ждёт кадр (раньше циклы FOR проходили мгновенно).
- **Задачи**: scd0 выполняется с tasks[0], scd1 — с tasks[15] (в оригинале после планировщика bhCetask = &bhEtask[15]). Раньше scd1 rm_0030 («WORK obj 6») затирал work задачи 0 → Клэр после сцены Стива телепортировалась в 0,0,0.
- Player_controll 0x64 sub 07/0c/0d — позиция/угол игрока (так скрипт возвращает Клэр после катсцены; раньше игнорировалось → телепорт в 0,0,0).
- Камеры событий (evcam.ts): 20-точечный сплайн Overhauser по ключам, кадров на сегмент при 30 Гц, nxt-цепочки, lock на персонажа/объект (lockPos в game.ts: 1 игрок, 2 NPC/враги, 3 объекты, 4 предметы, 6 спавны); углы (-ax,-ay,az) 'YXZ', верт. fov = 2·atan(tan(pers/2)·0.75).
- Отладка без браузера: `npx tsx dev/vmtest.ts rm_XXXX тиков` (FLR=n — имитация стояния в зоне). Хелперы браузерных тестов — dev/t_lib.js (`cat t_lib.js t_flowN.js > /tmp/tf.js`): st, snap, sim, closeMsgs, skipMovie, waitFree, act(etc), listEtc, inv. Промисы (MessageBox) резолвятся только на await → `await sleep()` между sim.

### Звук (src/audio.ts, conv/sound.py) — как устроено
- Файлы: `g/sound/bgm/source/*.at3` (ATRAC3plus), `g/sound/se/{room/rm_000/rm_SRR_C, room/rm_common, bg/bg_SRR_C, pc/pc_SRR_C, arms, door, core}.{spc,srq}`.
  **Все они в контейнере Capcom SFH**: каждые 0x20000 байт начинаются с 0x10 байт мусора, размер — u32 по +8 (`tools/sfh.py clean`). Старый tools/spc.py этого не делал → сэмплы за 128 КБ были битые.
- .spc после clean: 'CAPS', данные с u32@0x1c, заголовки MSF0 по 0x40 с 0x20 (codec 5 = ATRAC3 0x98·ch, ch, size, rate, flags, loopStart, loopLen в байтах; петля если flags≠-1 и &1; конец обрезается по размеру как в vgmstream). Сэмплы выровнены на 0x80.
- .srq ('QERS'): записи 0x90 с 0x34 до u32@0x1c: [u16 list] … +0x1c u16 связанный list (играет одновременно — правый канал стерео-эмбиента), +0x20 u16 сэмпл, +0x22 u16 pan (0 лево, 0x80 право, ffff нет), +0x24 float громкость dB.
- Банки (sdfunc.c): SeNo>>8&0xF = банк, младший байт = list. Банк 2 = rm_SRR_0 (list ≥ 64 → rm_common), банк 3 = bg_SRR_0 (у 002/003/005/008 одинаковые сэмплы, разные списки), шаги/действия игрока = pc-банк (list 0..4 = тип пола, 5.. действия).
- BGM: bgm_all.stq — 109 файлов (0x1c с 0x4c: nameOff+0x10, size, 0, ch, loopStart, loopEnd, rate) и 133 запроса (шаг 0x9c с 0xc34: номер u16@+4, файл u32@+0x90). В assets/audio/bgm.json номер → файл+петля (сек); ogg обрезан по концу петли. Конвертированы только номера тюрьмы (0,1,0x2d–0x31,0x34,0x4b,0x4c,0x53,0x72).
- Громкости: единицы драйвера 0..-127 → dB по AdxVolTbl (adxwrap.c), BGM по умолчанию -45 (= -14.2 dB); fade BGM в 1/100 с (×10 из скрипта); fade SE — кадры 30 Гц. 3D: ThreeDVolTbl (−1 на 5 игровых единиц после 30) + PanTbl360/PanTbl360Vol от камеры.
- Команды скриптов (evt.ts → host.snd в game.ts): 15/a6 BgmOn(Ex), 95/a7 BgmOn2(Ex) (тот же номер продолжает играть), 16/93 BgmOff, 17/18 SeOn/Off (слоты событий 0–4), 1c/94 BGSeOn(2), 1d/92 BGSeOff(2), 8b/45 Add/DelObjSe (позиционный звук объекта), 48 FootSeCall (шаги NPC по кости задачи), 86 EasySESet (Type 7 событие, 1 шаг, 2 действие игрока, 6 BG; громкость Start→Last за Frame).
- Шаги Клэр: по кадрам клипа (PlFootSnd): ходьба m00 кадры 10/28, бег m04 8/18, назад m11 10/28 (левая нога b17, правая b21); тип пола — bhCheckFloorSound (FLR flg&1, type 1, prm0 под стопой); случайный pitch WalkPitchTbl {0,256,256,0} / RunPitchTbl {512,768,768,512}; 2 чередующихся слота.

### Эффекты (src/effects.ts, conv/effects.py)
- Порт effect.c/effsub0/1/5: пул 512 O_WRK, bhSetEffectTb/setentry/effinit/effset, обновление 30 Гц в evtFrame после vm.tick, спрайты-билборды батчами (tex, ani, blend) в `game.render()` (там же тряска камеры bhCamYureSet, op 0x5a). Команды: 0x43 disp, 0x91 mode, 0x5a yure → host.eff().
- Данные: `python3 conv/effects.py` (нужна распаковка комнат в /data/cvx/ex через conv/room.py) → assets/eft/rm_XXXX.json (таблицы eft) и assets/effects/ef_NNN_K.png (порядок текстур SCRA по CRC имени `biocv_tmp\eng\data\eff\ef_NNN\texNNNN_BM`).
- Перенесены id: 15, 100–103, 106, 107, 116, 119, 154, 155, 158, 159, 164, 165, 179–182, 201, 218. Blend по alpha_tbl GS: 8/6, 8/3 обычный, 8/10 аддитивный, 11/3 затемнение. Цвет вершин ((c+1)>>1)/128.
- Голоса: conv/voice.py, audio.ts voice/voiceOff/preloadVoices, ops 0x19/0x1a. Ролик mv_001 (tools/pamf.py) после взрыва грузовика rm_0020; game.movie() глушит BGM и голос (PlayStartMovieEx).
- rm_0020: зомби en01a32 клипы rm_0020/r02,r04,r06; кейс it_083 клипы r08/r09 (tools/item_rmt.py; движения предметов mtnKind 3).

### Руки NPC и связанные объекты (ObjLinkSet)
- У моделей en91/en93/en98 (27 узлов) нет кистей: кисти — отдельные объекты комнаты (ob_1000/1012/1020/1028/…), лежат ВНЕ комнаты и крепятся скриптом: 0x32 ObjLinkSet (враг b1, объект b2), 0x34 ObjLinkSetPly, 0x53 EneItem, 0x52 ObjItem, 0xa3 PlyItem. Формат 12 байт: [3] кость (lkono), [4] 0 = вкл., [5] знаки, [6..11] смещение u16/100 игр. ед. (= /1000 м). → `work.link`.
- game.ts `updateLinks()` каждый кадр: мир = матрица кости · T(lo) · R(углы объекта) · S(0.1) (MdlPut.c bhCalcModel). Номера костей скрипта → узлы NPC: ≤5 как есть, 6–14 (лицо) → 5, ≥15 → n−4 (18/22 = запястья b14/b18). У Клэр нумерация прямая (9, 13 запястья, 5 голова). Объекты вне границ комнаты (room.outside) видимы только пока привязаны. Тот же маппинг костей — в lock камеры событий (lkono).

### Освещение (src/light.ts, conv/light_patch.py)
- Порт light.c (bhControlLight/bhSetLightTab) + амбиент ROM_WORK. `conv/light_patch.py` добавляет в rooms/<id>.json `lgt` (LGT_WORK из lgt/), `evl` (свет событий, пока камера события с flg&2) и `amb` (amb_rom/chr/obj/itm + amb_r/g/b[4] из rmh/).
- Каждый кадр 30 Гц: до 3 точечных (lsrc 4) + 1 направленный (lsrc 2) из записей flg&3==3; мерцание type 1–6 как в оригинале; range: 1 до nr, линейно к 0 у fr. Амбиент — униформы AMB_U по категориям (assets.toLambert(obj, 'rom'|'chr'|'obj'|'itm'|'inv')).
- Зажигалка = lgttab[1] (type 4, привязка к правому запястью b09) — включается при экипированной зажигалке; поэтому камера rm_0000 тёмная, пока зажигалка не взята. При взятии оружия зажигалка снимается (S.standard=null в itemScreen).
- Скрытие (камера): `conv/hid_patch.py` добавляет cameras[i].hid (16 слов hidobj) / hidl (8 слов hidlgt) из CUT_WORK.cam[0] и в ключи evc hid(8)/hidl(4). room.ts: `nodes` (узлы glb nNNN = индекс objP), `setHidden(mask)` прячет только СОБСТВЕННЫЕ примитивы узла (NJD_EVAL_HIDE не прячет детей) через setDrawRange; light.ts `hide()` (свет ≥4 из lgt или все evl). game.ts `hideFrame()`: маска ключа события, иначе камеры `cam.shown`, иначе ничего (follow-камера). camera.ts: эвристика raycast-отсечения заменена множествами из hid (только для проверок видимости).

### Пролог (2D-эффекты)
- effects.ts: bhEff2D (id 20: экранный квад, tex=type, страница = lkono, размер (sx/4)·512, цвет 0xE0) и bhEff021 (id 21, кинорамки — DOM-градиент); DOM-слой `fx.layer` поверх canvas; позиция из WORK 4 (applyWorks, px·10).
- Русские страницы вступления `effects/ef_045_K_ru.png` — `conv/intro_ru.py` (тот же текст в переводе, та же раскладка, шрифт Liberation Serif); fx.lang=LANG, иначе английская.
- evt.ts: Common_controll sub 02/03/11/12 с хвостовым 0xfe ждут кадр (bhScePtr+=2) → прокрутка вступления ~24 с, затем mv_000.

### Прочее (сессия 3)
- Шаги: в rm_0020/0030 (комнаты 002/003) — банк pc_005_0, как в rm_0050 (раньше pc_003 давал неверный звук).
- Зомби, утаскиваемый под дом (rm_0050, враг 2, вариант 1): комнатное движение r00 (bhCommonCtr/18 b4 = mtn); `enemies/en01a01.glb` = `python3 conv/enemy.py ex/rm0070/.../mdl/en01a01.108f442e ex/rm0050/.../mdl/en01a01 ex/rm0050/.../mtn/en01ms.7618cc9a OUT en01a01 0 8 "ex/rm0050/biocv_tmp/eng/data/rmt/rm_0050.070078b5:0"`.
- en67 = тараканы (нескиннинговая MDL, 10 спрайтов; кода en67 в декомпиляции нет): `tools/conv_mdl.py` → `npc/en67a00.glb`, ставится статично на позицию записи (spawnEnemies id 67).
- Звуки инвентаря по декомпиляции (CallSystemSe): открытие sys3 + sys7 когда панели на месте, закрытие sys9, курсор sys2, подтверждение подбора sys3.
- Новые банки: rm_009_0, bg_016_0, pc_010_0, pc_014_0 (conv/sound.py).
- Тесты: shotc.sh поддерживает `PRE=` (без t_start) и `SHOT=shot2.mjs` (снимки страницы через window.pshot()).

### Проверено тестами
Звук/руки: dev/t_hands30.js (rm_0030: кисти Стива/двойника на запястьях, лог звуковых команд), dev/t_aud.js (шаги по кадрам ходьбы/бега, банки комнаты, BGM). Катсцены: rm_0000 встреча с Родриго (dev/t_r00c.js, события 0–5/18/21, камеры evc 1,2,31,36,4,32,35,33,8,23,24,25; в конце игрок там, где двойник en91), rm_0030 труп/Стив (dev/t_cine30b.js). Пролог (события 29/32/31, ролик 0, пробуждение, сообщение 4 про зажигалку) → зажигалка в зоне → сцена Родриго (пропускается) → дверь камеры открыта скриптом; подборы ножа/патронов/трав через ITMSETCK; rm_0010 лента+патроны, машинка (вопрос → сохранение); rm_0020 зомби; rm_0030 пистолет через событие трупа; вход во все 10 комнат без ошибок. Собаки rm_0050 появляются только при ev[117]==1 (так в скрипте).

### Известные приближения / недоделки (честно)
- Туман/clip камер не применяются. Материалы: общий коэффициент 0.7 (DA 0xb2b2b2) — гамма/HD-шейдер PS3 могут отличаться.
- Не сконвертированы: en62 (пулемёт/прожектор, нескиннинговая MDL, rm_0030), en00 (rm_0080/rm_0160). en67 (тараканы) — статичная модель без ИИ/анимации. Предметы-файлы (Director's Memo, rm_0160) нельзя прочитать — меню FILE не сделано. Собственный ИИ NPC (после Sub 0x80) не реализован — NPC стоит в последней позе скрипта.
- Голоса есть, но липсинк (bhLipSet) не реализован. Эффекты: bhEffAmbSet (0x44, амбиент) игнорируется; не перенесены id 9,10,18,20,21,92 (фильтр камеры bhEffFil),115,122,123,125,230,234,245 (скрыты, console.info); у 165 нет отражения от стен (bhCheckWallRefAngle), земля = y 0; проверка пола у брызг дождя — по списку FLR; цвета/blend по PS2 (HD-шейдер PS3 может отличаться). События продолжают тикать во время диалога предмета. FrameCheck — по счётчику кадров work, а не по реальной анимации.
- Количество патронов в пачках/пистолете — по данным предметов (пистолет 12/15), экран сохранения упрощён (текст UI.saved — свой).
- «Лежачие» зомби на кладбище: эвристика (тип поведения 0 в rm_002x). Назначение клипов собаки и выход из будок — приближённо.
- Звуки зомби/собак (банки se/enemy) не подключены; голоса Клэр (core_000) и CallSysSe (d4) тоже; взмах ножа — синтезированный шум, щелчок зажигалки — door_knob с pitch (оригинальные сэмплы не найдены: банк ножа среди arms_* не опознан).
- Звук, приближения: таблица «комната → pc-банк шагов» лежит в зашифрованном EBOOT — берётся ближайший pc_SRR_C с номером ≤ комнаты (00–02 → pc_000, 03/04 → pc_003_C, 05 → pc_005, 06 → pc_006, 08 → pc_007); единицы pitch шагов приняты 1/1024 полутона; шкала громкости SE принята такой же, как AdxVolTbl у BGM; длительность fade BGM = Timer/100 с; pan записей .srq (0/0x80) трактуется как лево/право; RoomSoundCase (b6) и SetNextRoomBgm/BgSe (46/47) не реализованы (в тюрьме у банков есть только case 0); stflg&0x10-зоны пола (attr&1) пропускаются; номер этажа зоны не сверяется.

## План дальше
1. en62 (пулемёт/прожектор rm_0030), en00, ИИ/анимация тараканов en67.
2. Меню FILE (чтение документов), голоса Клэр/звуки врагов.
3. Следующие комнаты (10, 11, …): `python3 conv/room.py rm_XXXX`, `python3 conv/evt_export.py rm_XXXX`, evc_export, ent_patch, light_patch, hid_patch, effects.py; добавить в ROOMS и банки звука в audio.ts/conv/sound.py.
