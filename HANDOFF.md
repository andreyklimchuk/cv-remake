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
