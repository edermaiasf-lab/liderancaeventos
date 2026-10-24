/* Consentimento de cookies (LGPD): só o essencial por padrão; mapa do Google só com permissão. */
const KEY = 'lid_consent_v1';
const TTL = 365 * 24 * 60 * 60 * 1000;

type Consent = { t: boolean; ts: number };

export function getConsent(): Consent | null {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || 'null') as Consent | null;
    if (!v || typeof v.t !== 'boolean' || Date.now() - v.ts > TTL) return null;
    return v;
  } catch {
    return null;
  }
}
function setConsent(t: boolean) {
  try { localStorage.setItem(KEY, JSON.stringify({ t, ts: Date.now() })); } catch { /* sem armazenamento: vale só nesta visita */ }
  document.dispatchEvent(new CustomEvent('consent-change', { detail: { t } }));
}

const $ = <T extends HTMLElement = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends HTMLElement = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

/* ---------- mapa: iframe só existe depois da permissão ---------- */
function syncMaps() {
  const ok = !!getConsent()?.t;
  $$('[data-map]').forEach((box) => {
    const has = box.querySelector('iframe');
    if (ok && !has) {
      const f = document.createElement('iframe');
      f.title = 'Mapa: Liderança Espaço de Eventos, Abadia de Goiás - GO';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.src = box.dataset.src!;
      box.append(f);
      box.classList.add('loaded');
    } else if (!ok && has) {
      has.remove();
      box.classList.remove('loaded');
    }
  });
}

/* ---------- aviso ---------- */
function banner() { return document.getElementById('cc') as HTMLElement | null; }
function openBanner() {
  const b = banner();
  if (!b) return;
  b.hidden = false;
  requestAnimationFrame(() => b.classList.add('on'));
}
function closeBanner() {
  const b = banner();
  if (!b) return;
  b.classList.remove('on');
  setTimeout(() => (b.hidden = true), 400);
}

let bound = false;
function bind() {
  if (bound) return;
  bound = true;
  document.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    if (t.closest('[data-cc-accept]')) { setConsent(true); closeBanner(); }
    else if (t.closest('[data-cc-reject]')) { setConsent(false); closeBanner(); }
    else if (t.closest('[data-cc-open]')) { openBanner(); }
    else if (t.closest('[data-map-load]')) { setConsent(true); }
  });
  document.addEventListener('consent-change', syncMaps);
}

export function initConsent() {
  bind();
  syncMaps();
  if (!getConsent()) setTimeout(() => openBanner(), 900);
}
