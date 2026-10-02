// Full-screen FMV playback (original PAMF movies re-encoded to H.264/AAC).
// In the GitHub build the video is split into base64 script parts (data/<name>_NN.js) declared in window.__MOVIES.
import { LANG } from './text';
declare global { interface Window { __MOVIES?: Record<string, number>; __MV?: Record<string, string[]> } }

function loadScript(src: string) {
  return new Promise<void>((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = () => res(); s.onerror = () => rej(new Error('load ' + src)); document.head.appendChild(s); });
}
async function movieUrl(name: string, onProgress: (f: number) => void): Promise<string | null> {
  const n = window.__MOVIES?.[name];
  if (window.__ASSETS) {
    if (!n) return null;
    if (!window.__MV?.[name] || window.__MV[name].length < n) for (let i = 0; i < n; i++) { await loadScript(`data/${name}_${String(i).padStart(2, '0')}.js`); onProgress((i + 1) / n); }
    const parts = window.__MV?.[name] ?? [];
    const bufs = parts.map((b64) => { const bin = atob(b64); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u; });
    delete window.__MV![name];
    return URL.createObjectURL(new Blob(bufs, { type: 'video/mp4' }));
  }
  return `movies/${name}.mp4`;
}
/** Play a movie; resolves when finished or skipped (Enter / Space / Esc / click). */
export async function playMovie(stage: HTMLElement, name: string): Promise<void> {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'position:absolute;inset:0;background:#000;z-index:20;display:flex;align-items:center;justify-content:center';
  const info = document.createElement('div');
  info.style.cssText = 'position:absolute;bottom:3%;right:3%;font:12px sans-serif;color:#777;letter-spacing:.1em;transition:opacity .5s';
  wrap.appendChild(info); stage.appendChild(wrap);
  info.textContent = LANG === 'ru' ? 'ЗАГРУЗКА РОЛИКА…' : 'LOADING MOVIE…';
  let url: string | null = null;
  try { url = await movieUrl(name, (f) => (info.textContent = (LANG === 'ru' ? 'ЗАГРУЗКА РОЛИКА… ' : 'LOADING MOVIE… ') + Math.round(f * 100) + '%')); } catch (e) { console.warn(e); }
  if (!url) { wrap.remove(); return; }
  const v = document.createElement('video');
  v.src = url; v.playsInline = true; v.preload = 'auto';
  v.style.cssText = 'width:100%;height:100%;object-fit:contain;background:#000';
  wrap.insertBefore(v, info);
  info.textContent = LANG === 'ru' ? 'Enter / Esc — пропустить' : 'Enter / Esc — skip';
  await new Promise<void>((res) => {
    let done = false;
    const fin = () => { if (done) return; done = true; removeEventListener('keydown', key, true); v.pause(); res(); };
    const key = (e: KeyboardEvent) => { if (['Enter', 'Space', 'Escape', 'KeyE'].includes(e.code)) { e.preventDefault(); e.stopPropagation(); fin(); } };
    addEventListener('keydown', key, true);
    wrap.addEventListener('click', fin);
    v.addEventListener('ended', fin); v.addEventListener('error', fin);
    v.play().catch(() => { v.muted = true; v.play().catch(fin); });
    setTimeout(() => (info.style.opacity = '0'), 4000);
  });
  wrap.remove();
  if (url.startsWith('blob:')) URL.revokeObjectURL(url);
}
