export class Input {
  down = new Set<string>();
  pressed = new Set<string>();
  /** accumulated mouse movement (pointer lock) since the last frame */
  mdx = 0; mdy = 0;
  locked = false;
  constructor() {
    addEventListener('keydown', (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'Tab'].includes(e.code)) e.preventDefault();
      if (!this.down.has(e.code)) this.pressed.add(e.code);
      this.down.add(e.code);
    });
    addEventListener('keyup', (e) => this.down.delete(e.code));
    addEventListener('blur', () => this.down.clear());
    addEventListener('mousedown', (e) => { const c = 'Mouse' + e.button; if (!this.down.has(c)) this.pressed.add(c); this.down.add(c); });
    addEventListener('mouseup', (e) => this.down.delete('Mouse' + e.button));
    addEventListener('contextmenu', (e) => { if (this.locked) e.preventDefault(); });
    addEventListener('mousemove', (e) => { if (this.locked) { this.mdx += e.movementX; this.mdy += e.movementY; } });
    document.addEventListener('pointerlockchange', () => { this.locked = !!document.pointerLockElement; });
  }
  requestLock(el: HTMLElement) { if (!this.locked && el.requestPointerLock) { try { const r: any = el.requestPointerLock(); r?.catch?.(() => {}); } catch { /* ignore */ } } }
  releaseLock() { if (document.pointerLockElement) document.exitPointerLock(); }
  has(...codes: string[]) { return codes.some((c) => this.down.has(c)); }
  hit(...codes: string[]) { return codes.some((c) => this.pressed.has(c)); }
  get fwd() { return this.has('KeyW', 'ArrowUp'); }
  get back() { return this.has('KeyS', 'ArrowDown'); }
  get left() { return this.has('KeyA', 'ArrowLeft'); }
  get right() { return this.has('KeyD', 'ArrowRight'); }
  /** over-the-shoulder camera: A/D strafe, ←/→ turn the camera */
  get strafeL() { return this.has('KeyA'); }
  get strafeR() { return this.has('KeyD'); }
  get camL() { return this.has('ArrowLeft'); }
  get camR() { return this.has('ArrowRight'); }
  get run() { return this.has('ShiftLeft', 'ShiftRight', 'KeyX'); }
  /** ready weapon (RE: R1) */
  get aim() { return this.has('KeyF', 'Mouse2', 'ControlLeft', 'ControlRight'); }
  /** attack while aiming (RE: X) */
  get attack() { return this.hit('KeyE', 'Space', 'Enter', 'KeyZ', 'Mouse0'); }
  get action() { return this.hit('KeyE', 'Space', 'Enter', 'KeyZ'); }
  get cancel() { return this.hit('Escape', 'Backspace', 'KeyQ'); }
  get inventory() { return this.hit('Tab', 'KeyI'); }
  get camToggle() { return this.hit('KeyC', 'KeyV'); }
  endFrame() { this.pressed.clear(); this.mdx = 0; this.mdy = 0; }
}
