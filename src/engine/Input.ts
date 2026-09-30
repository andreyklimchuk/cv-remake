/**
 * Unified input: keyboard + mouse (pointer lock) + gamepad (standard mapping).
 * Game code queries semantic actions, never raw keys.
 */
export class Input {
  private keys = new Set<string>();
  private pressed = new Set<string>();
  private mouseDown = new Set<number>();
  private mousePressed = new Set<number>();
  private mouseDX = 0;
  private mouseDY = 0;
  wheel = 0;
  pointerLocked = false;
  usingGamepad = false;
  sensitivity = 1;
  invertY = false;

  private pad: Gamepad | null = null;
  private padPrev: boolean[] = [];
  private padNow: boolean[] = [];

  constructor(private canvas: HTMLCanvasElement) {
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Tab' || e.code === 'Space') e.preventDefault();
      if (!this.keys.has(e.code)) this.pressed.add(e.code);
      this.keys.add(e.code);
      this.usingGamepad = false;
    });
    window.addEventListener('keyup', (e) => this.keys.delete(e.code));
    window.addEventListener('blur', () => { this.keys.clear(); this.mouseDown.clear(); });
    canvas.addEventListener('mousedown', (e) => {
      if (!this.mouseDown.has(e.button)) this.mousePressed.add(e.button);
      this.mouseDown.add(e.button);
      this.usingGamepad = false;
    });
    window.addEventListener('mouseup', (e) => this.mouseDown.delete(e.button));
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    window.addEventListener('mousemove', (e) => {
      if (!this.pointerLocked) return;
      this.mouseDX += e.movementX;
      this.mouseDY += e.movementY;
    });
    window.addEventListener('wheel', (e) => { this.wheel += Math.sign(e.deltaY); }, { passive: true });
    document.addEventListener('pointerlockchange', () => {
      this.pointerLocked = document.pointerLockElement === canvas;
    });
  }

  lockPointer(): void {
    if (!this.pointerLocked) this.canvas.requestPointerLock?.();
  }
  unlockPointer(): void {
    if (document.pointerLockElement) document.exitPointerLock();
  }

  /** Must be called once per frame before game update. */
  poll(): void {
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    this.pad = null;
    for (const p of pads) if (p && p.connected) { this.pad = p; break; }
    this.padPrev = this.padNow;
    this.padNow = this.pad ? this.pad.buttons.map((b) => b.pressed) : [];
    if (this.pad && (this.padNow.some(Boolean) || this.pad.axes.some((a) => Math.abs(a) > 0.3))) this.usingGamepad = true;
  }

  endFrame(): void {
    this.pressed.clear();
    this.mousePressed.clear();
    this.mouseDX = this.mouseDY = 0;
    this.wheel = 0;
  }

  private key(code: string) { return this.keys.has(code); }
  private keyPressed(code: string) { return this.pressed.has(code); }
  private btn(i: number) { return !!this.padNow[i]; }
  private btnPressed(i: number) { return !!this.padNow[i] && !this.padPrev[i]; }
  private axis(i: number) {
    const v = this.pad?.axes[i] ?? 0;
    const dz = 0.18;
    return Math.abs(v) < dz ? 0 : (v - Math.sign(v) * dz) / (1 - dz);
  }

  // ---- semantic actions ------------------------------------------------
  moveX(): number { return (this.key('KeyD') ? 1 : 0) - (this.key('KeyA') ? 1 : 0) + this.axis(0); }
  moveY(): number { return (this.key('KeyW') ? 1 : 0) - (this.key('KeyS') ? 1 : 0) - this.axis(1); }
  /** Look delta in radians for this frame */
  lookDelta(dt: number): { x: number; y: number } {
    const m = 0.0022 * this.sensitivity;
    const g = 2.6 * this.sensitivity * dt;
    const inv = this.invertY ? -1 : 1;
    return { x: this.mouseDX * m + this.axis(2) * g, y: (this.mouseDY * m + this.axis(3) * g) * inv };
  }
  aim(): boolean { return this.mouseDown.has(2) || (this.pad?.buttons[6]?.value ?? 0) > 0.4; }
  fire(): boolean { return this.mouseDown.has(0) || (this.pad?.buttons[7]?.value ?? 0) > 0.4; }
  firePressed(): boolean { return this.mousePressed.has(0) || this.btnPressed(7); }
  run(): boolean { return this.key('ShiftLeft') || this.key('ShiftRight') || this.btn(10); }
  dodge(): boolean { return this.keyPressed('Space') || this.btnPressed(0); }
  reload(): boolean { return this.keyPressed('KeyR') || this.btnPressed(2); }
  knife(): boolean { return this.keyPressed('KeyF') || this.btnPressed(1); }
  interact(): boolean { return this.keyPressed('KeyE') || this.btnPressed(3); }
  shove(): boolean { return this.keyPressed('KeyQ') || this.btnPressed(4); }
  inventory(): boolean { return this.keyPressed('Tab') || this.keyPressed('KeyI') || this.btnPressed(8); }
  pause(): boolean { return this.keyPressed('Escape') || this.keyPressed('KeyP') || this.btnPressed(9); }
  struggle(): boolean { return this.keyPressed('Space') || this.keyPressed('KeyF') || this.btnPressed(0) || this.btnPressed(1); }
  weaponSlot(): number {
    for (let i = 1; i <= 8; i++) if (this.keyPressed('Digit' + i)) return i;
    return 0;
  }
  cycleWeapon(): number { return this.wheel + (this.btnPressed(15) ? 1 : 0) - (this.btnPressed(14) ? 1 : 0); }
  debugToggle(): boolean { return this.keyPressed('F3'); }
  cheat(): boolean { return this.keyPressed('F9'); }
  raw(code: string): boolean { return this.keyPressed(code); }
}
