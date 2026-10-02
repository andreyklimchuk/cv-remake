/**
 * Admin / debug panel (F10 or ~): teleports, arsenal, god mode, enemy spawner, kill all, character switch,
 * open every door, time scale, debug overlay. Pure DOM; the game passes the actions in (no game imports here).
 */
export interface AdminActions {
  spots: [string, string][];
  teleport(id: string): void;
  arsenal(): void;
  ammo(): void;
  heal(): void;
  god(): boolean;
  setGod(on: boolean): void;
  spawn(kind: string): void;
  killAll(): number;
  switchChar(): string;
  openDoors(): number;
  timeScale(): number;
  setTimeScale(k: number): void;
  debug(): void;
  save(): void;
  info(): string;
  close(): void;
}

const CSS = `
.admin{position:absolute;right:18px;top:18px;width:430px;max-height:calc(100% - 36px);overflow:auto;background:rgba(8,10,12,.94);border:1px solid #6a1a14;
  color:#ddd;font:13px/1.35 system-ui,sans-serif;padding:12px 14px;z-index:60;box-shadow:0 0 30px #000;pointer-events:auto}
.admin h3{margin:0 0 6px;font:600 14px system-ui;color:#e8412e;letter-spacing:.12em}
.admin h4{margin:10px 0 4px;font:600 11px system-ui;color:#999;letter-spacing:.14em;text-transform:uppercase}
.admin .row{display:flex;flex-wrap:wrap;gap:4px}
.admin button{background:#1c2024;color:#ddd;border:1px solid #3a3f45;padding:4px 8px;font:12px system-ui;cursor:pointer}
.admin button:hover{background:#6a1a14;border-color:#e8412e}
.admin button.on{background:#2a5a2a;border-color:#4c4}
.admin .info{white-space:pre;font:11px monospace;color:#9ab;margin-top:8px}
.admin .msg{color:#e8c33a;min-height:16px;margin-top:6px}
`;

export class AdminPanel {
  root: HTMLDivElement;
  isOpen = false;
  constructor(parent: HTMLElement, private a: AdminActions) {
    if (!document.getElementById('admin-css')) { const st = document.createElement('style'); st.id = 'admin-css'; st.textContent = CSS; document.head.appendChild(st); }
    this.root = document.createElement('div');
    this.root.className = 'admin';
    this.root.style.display = 'none';
    parent.appendChild(this.root);
  }
  open(): void { this.isOpen = true; this.root.style.display = ''; this.render(); }
  close(): void { this.isOpen = false; this.root.style.display = 'none'; }
  private flash(t: string): void { const m = this.root.querySelector('.msg'); if (m) m.textContent = t; }
  private render(): void {
    const a = this.a;
    const r = this.root;
    r.innerHTML = '';
    const h = (tag: string, text: string) => { const e = document.createElement(tag); e.textContent = text; r.appendChild(e); return e; };
    const row = () => { const d = document.createElement('div'); d.className = 'row'; r.appendChild(d); return d; };
    const btn = (parent: HTMLElement, label: string, fn: () => void, on?: boolean) => {
      const b = document.createElement('button'); b.textContent = label; if (on) b.className = 'on';
      b.onclick = (e) => { e.stopPropagation(); fn(); }; parent.appendChild(b); return b;
    };
    h('h3', 'АДМИН-ПАНЕЛЬ  ·  F10 / ~ — закрыть');
    h('h4', 'Телепорт');
    const tp = row();
    for (const [id, label] of a.spots) btn(tp, label, () => { a.teleport(id); this.flash('Телепорт: ' + label); });
    h('h4', 'Игрок');
    const pl = row();
    btn(pl, 'Весь арсенал', () => { a.arsenal(); this.flash('Арсенал выдан'); });
    btn(pl, 'Патроны', () => { a.ammo(); this.flash('Патроны выданы'); });
    btn(pl, 'Вылечить', () => { a.heal(); this.flash('Здоровье восстановлено'); });
    btn(pl, a.god() ? 'Бессмертие: ВКЛ' : 'Бессмертие: выкл', () => { a.setGod(!a.god()); this.render(); }, a.god());
    btn(pl, 'Клэр ⇄ Стив', () => this.flash('Персонаж: ' + a.switchChar()));
    btn(pl, 'Сохранить', () => a.save());
    h('h4', 'Враги');
    const en = row();
    for (const [k, label] of [['hitman', 'Зомби (хитмен)'], ['female', 'Зомби (женщина)'], ['prisoner', 'Зомби-заключённый'], ['guard', 'Зомби-охранник'], ['civilian', 'Зомби-гражданский'],
      ['cerberus', 'Цербер'], ['hunter', 'Хантер'], ['licker', 'Ликер'], ['bandersnatch', 'Бандерснатч']]) btn(en, label, () => { a.spawn(k); this.flash('Создан: ' + label); });
    btn(en, 'Убить всех', () => this.flash('Убито: ' + a.killAll()));
    h('h4', 'Мир');
    const wd = row();
    btn(wd, 'Открыть все двери', () => this.flash('Открыто дверей: ' + a.openDoors()));
    for (const k of [0.25, 0.5, 1, 2]) btn(wd, `Время ×${k}`, () => { a.setTimeScale(k); this.render(); }, a.timeScale() === k);
    btn(wd, 'Отладка (F3)', () => a.debug());
    btn(wd, 'Закрыть', () => a.close());
    const msg = document.createElement('div'); msg.className = 'msg'; r.appendChild(msg);
    const info = document.createElement('div'); info.className = 'info'; info.textContent = a.info(); r.appendChild(info);
  }
}
