export class Input {
  down = new Set<string>();
  pressed = new Set<string>();
  constructor() {
    addEventListener('keydown', (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'Tab'].includes(e.code)) e.preventDefault();
      if (!this.down.has(e.code)) this.pressed.add(e.code);
      this.down.add(e.code);
    });
    addEventListener('keyup', (e) => this.down.delete(e.code));
    addEventListener('blur', () => this.down.clear());
  }
  has(...codes: string[]) { return codes.some((c) => this.down.has(c)); }
  hit(...codes: string[]) { return codes.some((c) => this.pressed.has(c)); }
  get fwd() { return this.has('KeyW', 'ArrowUp'); }
  get back() { return this.has('KeyS', 'ArrowDown'); }
  get left() { return this.has('KeyA', 'ArrowLeft'); }
  get right() { return this.has('KeyD', 'ArrowRight'); }
  get run() { return this.has('ShiftLeft', 'ShiftRight', 'KeyX'); }
  get action() { return this.hit('KeyE', 'Space', 'Enter', 'KeyZ'); }
  get cancel() { return this.hit('Escape', 'Backspace', 'KeyQ'); }
  get inventory() { return this.hit('Tab', 'KeyI'); }
  get camToggle() { return this.hit('KeyC', 'KeyV'); }
  endFrame() { this.pressed.clear(); }
}
