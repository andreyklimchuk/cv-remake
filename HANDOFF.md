# HANDOFF — ветка `godot` (порт RE: Code Veronica X, тюрьма, Godot 4.3)

Ветка содержит **только** проект Godot (корень ветки = папка проекта). Веб-версия и конвертеры остаются в ветке `cvx-prison`;
ассеты берутся из её `data/*.js` скриптом `tools/fetch_assets.py`, новые/исправленные ассеты кладутся в `tools/extra_assets/*.b64`.

Правило владельца: всё «точь-в-точь как в оригинале» (декомпиляция PS2 `recvx-decomp`), ничего не придумывать; приближения перечислять здесь.

## Восстановление (после сброса песочницы 07.10 — работа над веб-версией этой сессии потеряна, переносится сюда)
Пункты по порядку:
1. Мимика лиц (оригинал: только NPC id>90 через MASK, face.c; у зомби shp_ct — жевание en01_kamikami/mogmog; у Клэр мимики нет).
2. Зомби постоянно в анимации захвата (en01.c ActionModeCheck/MV03/MV05).
3. Укус Клэр «за ногу» (en01 legGrab, синхронизация пары).
4. Собаки: анимации, без повторной атаки сразу после атаки (en04.c NG00/PlyDG00/PlayerLink).
5. Огнетушитель на машине → кейс можно забрать; «аппарат для выреза герба» rm_0090 (3D-сканер, sp_evt.c).
6. Локация со 2-го скриншота = rm_0050 (кирпичный дом с верандой, будка собак) — уточнить у пользователя, что не так.
7. Вкладка «ФАЙЛЫ» (fileview.c).
8. Ролик mv_001 после катсцены с зомби из грузовика + анимации зомби в этой катсцене.

## Журнал
- 07.10: ветка создана из `cvx-godot` (godot/ → корень).
- 07.10, п.1 мимика — готово:
  - `scripts/face_mask.gd` (FaceMask) — порт face.c / face_bh.c: bhControlMask (флаги 1/2/4/8/0x10/0x20, маски-кадры, lip sync
    fmSetLipSyncParam), fmCnkSetCurrentFrame / InterParam(+Lip), _fmCnkCalcMuscle, CalcJaw, CalcTang, CalcEye. Только NPC id>90
    с блоком MASK (en91, en93, en98). Команды событий 0x3c bhMaskSet, 0x3d bhLipSet, 0x3e MaskStart, 0x3f LipStart, 0x8f FacePause,
    0x90 FaceReSet, 0x9a FaceRep (`evt.gd` → `game.face_cmd`). Данные: `data/face/face_en91|93|98.json` (MASK модели) и
    `data/face/fmt_rm_XXXX.json` (маски `.4356673e` = sys->mspp, lip `.42940d09` = sys->lspp) — `tools/conv/face_export.py`.
  - Жевание зомби (en01.c 10450 + eneset.c bhDrawEneObject → njplus.c npCalcMorphing/npTransform): вес shp_ct·0.001 по mtn_no и кадру
    (8/120 kamikami, 85/121 kamikami2, 0/40/41/125/117 mogmog[frm%40]); obj_b = второй SKIN+MDL файла en01aNN.108f442e;
    `data/face/zmorph_en01aNN.json` (`tools/conv/zombie_morph.py`), в Godot — относительный blend shape (позиция + нормаль).
    mtn_no клипа mNN = Zombie.LOWER_SLOT[NN] (номер 8-объектного блока банка en01ms по порядку слотов).
  - Исправлено: bhMovieCk = CheckPlayEndMovie (= MovieInfo.ExecMovieSystemFlag, 1 пока идёт ролик) — раньше было инвертировано,
    стартовая катсцена rm_0000 зависала на событии 31.
  - Приближения: вершины MASK-модели и морфа сопоставляются с вершинами glb по позиции в bind-пространстве (допуск 0.1 мм);
    поворот зубов/языка по челюсти принят как вращение вокруг оси X, глаза Ry·Rx (в оригинале матрица кости 0xA0000000 eval);
    нормали лица не пересчитываются (в оригинале mode 1 — тоже).
  - Тесты: `dev/test.tscn -- face SECS STEP [room|- spawn] [snap_every]` (rm_0000: идёт до события 0 с масками Родриго/Клэр),
    `-- zmorph [room]` (крупный план рта зомби, вес 0/0.5/1).
- 07.10, п.2 зомби «постоянно в анимации захвата» — готово:
  - Причина: старый `zombie.gd` брал как ходьбу клип m71 (= слот 120 банка en01ms — укус-захват NG00 для Криса) и вместо ИИ
    оригинала имел самодельную машину состояний. Реальная ходьба — en01_walk_mtn [0/200, 40/240, 41/241].
  - Новый `scripts/zombie.gd` — порт en01.c / zonzon.c / Motion.c на 30 Гц: две рабочие структуры движения (тело b00–b07 и
    связанный верх b08–b17, у каждой mtn_no/frm_no/mtn_add/hokan; bhEne_ChgMtn, bhSetMotion с hokan, зеркало mtn_md 2 по
    en01_flipTree/flipTree2), перемещение из движений: фиксация стопы en01_mtn_tbl (bhEne01_CheckMtnTbl → bhCalcFixOffset),
    EXP0 0x1000000 GetTranslateMtn, 0x2000000 GetTranslateMtn2 + bhAddSpeed; Brain00/EneSearch (поле зрения шеи
    en01_PersonalType.ang), ActionModeCheck, MV00 стоит, MV01 бродит (stp_tbl, поворот у стены, ≤15 ед. — поворот к Клэр),
    MV02 подход (ChgWalkMtn → 117/125 с руками 118/119, bhGetFrameNum как скомпилировано, FastWalkCheck), MV03 поворот 44,
    MV04 лежит/встаёт (StupTimer, 13/14/15), MV05 выпад 122 (захват на кадрах 8–12 → 85), MV06 ждёт 49 пока Клэр держит другой,
    MV07 разворот 127; NG00: 8/208, отталкивание 7 (кадры 17–31 назад 1.5−ct0·0.14) → падение 12 с кадра 7 → MV04, смерть Клэр
    34 → поедание 111; DG03 (11, кадр nf−2 → MV04); DD00 (37/38, подёргивания ct1 раз); поворот верха при попадании
    из пистолета (nm_act 0, rot_tbl 8 кадров), убийство/выпад/захват → cb_act 6 = DG03.
  - Тест: `dev/test.tscn -- zai ROOM SECS STEP [x z ang|- - -] [snap_every]` — журнал mode0/1/2/3, mtn:кадр, флаги, дистанция.
  - Приближения: hokan — slerp кватернионов (в оригинале — линейно по углам BAMS); маршруты bhCheckRoute/bhCheckRouteID
    не перенесены (цель всегда Клэр); bhEne_CheckDirWall — шаг по формам коллизии комнаты, CheckSideWall не перенесён (поворот
    в сторону Клэр); bhEne_EnemyAtariCheck = «Клэр уже держит другой враг»; EatCheck берёт позицию Клэр вместо owP[3];
    угол шеи (objP[11].ang[1]) в EneSearch не учитывается; поворот верха собран Эйлером ZYX; урон/комбо (bhEne_CalcDamage,
    en01_hp_tbl) не перенесены — hp 8 и урон 1.5 как раньше, поэтому превращение в ползуна (hp<15) пропущено;
    DmgModeJumpCheck (chg_mtn_tbl) не перенесён — попадания по лежащему/встающему засчитываются только как убийство;
    лежачие зомби кладбища (mtn 3) встают (13) при подходе ближе 32 ед. — порог не из оригинала; звуки SE зомби, кровь,
    PoisonCheck/WormCheck/KaidanCheck (лестницы)/ZulzulCheck (скольжение у стены) не перенесены; сторона укуса и длительность
    захвата пока ведёт game.gd (`_update_grab`, 2 с) — полный NG00 с LeverCheck — п.3.
