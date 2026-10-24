import { initReserva } from './reserva';
import { initGaleria } from './galeria';
import { initConsent } from './consent';


const $ = <T extends HTMLElement = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends HTMLElement = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

let fx: typeof import('./fx') | null = null;
let io: IntersectionObserver | null = null;
let ro: ResizeObserver | null = null;
let resizeBound = false;

/* ---------- menu, header transparente → osso, barra de progresso (uma vez) ---------- */
let chromeReady = false;
function initChrome() {
  if (chromeReady) return;
  chromeReady = true;
  const setMenu = (open: boolean) => {
    document.body.classList.toggle('menu-open', open);
    $('#burger')?.setAttribute('aria-expanded', String(open));
  };
  document.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    if (t.closest('#burger')) setMenu(!document.body.classList.contains('menu-open'));
    else if (t.closest('#drawer a')) setMenu(false);
  });
  document.addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));

  let last = 0;
  const onScroll = () => {
    const nav = $('#nav');
    const bar = $('#progress');
    const y = scrollY;
    if (nav) {
      const hero = $('[data-hero]');
      const heroEnd = hero ? hero.offsetHeight - nav.offsetHeight : 0;
      const menu = document.body.classList.contains('menu-open');
      nav.classList.toggle('solid', y > heroEnd && !menu);
      nav.classList.toggle('hide', y > last + 4 && y > 700 && !menu);
      if (y < last - 4) nav.classList.remove('hide');
    }
    last = y;
    const max = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  };
  addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('astro:page-load', onScroll);
}

/* ---------- painéis que ficam fixos e são cobertos pela próxima seção ---------- */
function measurePins() {
  const els = $$('[data-pin]');
  const vh = innerHeight;
  const hs = els.map((el) => el.offsetHeight);
  els.forEach((el, i) => el.style.setProperty('--pin-offset', `${Math.min(0, vh - hs[i])}px`));
}
function initPins() {
  ro?.disconnect();
  measurePins();
  if ('ResizeObserver' in window) {
    ro = new ResizeObserver(measurePins);
    $$('[data-pin]').forEach((el) => ro!.observe(el));
  }
  if (!resizeBound) {
    resizeBound = true;
    addEventListener('resize', measurePins, { passive: true });
  }
}

/* ---------- entrada suave dos blocos (como na referência: opacidade + 22px) ---------- */
function initReveals() {
  io?.disconnect();
  const hero = $('[data-hero]');
  const targets = $$('[data-reveal], [data-split], [data-img], [data-stagger] > *');
  if (reduce() || !('IntersectionObserver' in window)) return;

  // pendentes só os que estão abaixo da dobra (os do topo entram pelo timeline do hero)
  io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('in'); io!.unobserve(en.target); }
  }), { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

  const groups = new Map<Element, number>();
  targets.forEach((el) => {
    if (hero?.contains(el)) return;
    el.classList.add('rv');
    const p = el.parentElement;
    if (p && p.hasAttribute('data-stagger')) {
      const i = groups.get(p) ?? 0;
      groups.set(p, i + 1);
      (el as HTMLElement).style.transitionDelay = `${Math.min(i, 8) * 90}ms`;
    }
    io!.observe(el);
  });
}

/* ---------- entrada do banner: foto assenta, marca e textos sobem em sequência ---------- */
function initHeroIntro() {
  const hero = $('[data-hero]');
  if (!hero || reduce()) return;
  const items = $$('[data-reveal], [data-split], [data-fade], [data-img], .phero-photo', hero);
  items.forEach((el) => el.classList.add('rv'));
  hero.classList.add('pre');
  requestAnimationFrame(() => requestAnimationFrame(() => {
    hero.classList.add('is-in');
    items.forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${60 + i * 90}ms`;
      el.classList.add('in');
    });
  }));
}

/* ---------- carrosséis de fotos ---------- */
function initCarousels() {
  $$('[data-car]').forEach((car) => {
    const track = $('.car-track', car)!;
    const slides = $$('.car-slide', car);
    const cur = $('[data-car-cur]', car)!;
    const prev = $<HTMLButtonElement>('[data-car-prev]', car)!;
    const next = $<HTMLButtonElement>('[data-car-next]', car)!;
    const step = () => (slides[1] ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth);
    const update = () => {
      const i = Math.min(slides.length - 1, Math.round(track.scrollLeft / step()));
      cur.textContent = String(i + 1).padStart(2, '0');
      prev.disabled = track.scrollLeft < 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    };
    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
    track.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') track.scrollBy({ left: step(), behavior: 'smooth' });
      if (e.key === 'ArrowLeft') track.scrollBy({ left: -step(), behavior: 'smooth' });
    });
    update();
  });
}

/* ---------- faq: filtro por assunto ---------- */
function initFaq() {
  $$('[data-faq]').forEach((box) => {
    const chips = $$('[data-faq-filter]', box);
    const items = $$('details', box);
    chips.forEach((ch) => ch.addEventListener('click', () => {
      chips.forEach((x) => x.setAttribute('aria-pressed', String(x === ch)));
      const cat = ch.dataset.faqFilter;
      items.forEach((d) => { d.hidden = cat !== 'todas' && d.dataset.cat !== cat; });
    }));
  });
}

initChrome();
document.addEventListener('astro:page-load', () => {
  initPins();
  initHeroIntro();
  initReveals();
  initCarousels();
  initFaq();
  const later = () => {
    initConsent();
    import('./fx').then((mod) => { fx = mod; mod.initScrollFx(); mod.initMagnetic(); mod.initCounts(); });
  };
  if ('requestIdleCallback' in window) requestIdleCallback(later, { timeout: 1200 }); else setTimeout(later, 300);
  initReserva();
  initGaleria();
  const ano = $('#ano');
  if (ano) ano.textContent = String(new Date().getFullYear());
});
document.addEventListener('astro:before-swap', () => {
  io?.disconnect();
  ro?.disconnect();
  fx?.killFx();
  document.body.classList.remove('menu-open');
});
