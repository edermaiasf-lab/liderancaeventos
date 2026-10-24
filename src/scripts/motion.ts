import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initReserva } from './reserva';
import { initGaleria } from './galeria';
import { initConsent } from './consent';

gsap.registerPlugin(ScrollTrigger);

const $ = <T extends HTMLElement = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends HTMLElement = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

let ctx: gsap.Context | null = null;
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
  $$('[data-pin]').forEach((el) => el.style.setProperty('--pin-offset', `${Math.min(0, innerHeight - el.offsetHeight)}px`));
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
      (el as HTMLElement).style.transitionDelay = `${180 + i * 140}ms`;
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

/* ---------- botões magnéticos (ideia do 21st.dev, só com mouse) ---------- */
function initMagnetic() {
  if (reduce() || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  $$('.btn.gold, .btn.fill').forEach((el) => {
    if (el.closest('.cc, .form')) return;
    const qx = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'elastic.out(1,.55)' });
    const qy = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'elastic.out(1,.55)' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      qx((e.clientX - (r.left + r.width / 2)) * 0.22);
      qy((e.clientY - (r.top + r.height / 2)) * 0.32);
    });
    el.addEventListener('pointerleave', () => { qx(0); qy(0); });
  });
}

/* ---------- números que contam ao entrar na tela ---------- */
function initCounts() {
  if (reduce()) return;
  $$('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const o = { v: 0 };
    el.textContent = '0';
    gsap.to(o, { v: end, duration: 1.8, ease: 'power3.out', onUpdate: () => (el.textContent = String(Math.round(o.v))), onComplete: () => (el.textContent = String(end)), scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
  });
}

/* ---------- parallax e relógio da diária (GSAP) ---------- */
function initScrollFx() {
  ctx?.revert();
  ScrollTrigger.getAll().forEach((s) => s.kill());
  if (reduce()) return;

  ctx = gsap.context(() => {
    // faixas de foto que se expandem ao rolar (ideia "Scroll Reveal Image")
    $$('.band').forEach((b) => {
      gsap.fromTo(b, { clipPath: 'inset(0 10% 0 10%)' }, { clipPath: 'inset(0 0% 0 0%)', ease: 'none', scrollTrigger: { trigger: b, start: 'top 95%', end: 'top 30%', scrub: true } });
    });
    // fotos de fundo andam mais devagar que o conteúdo
    $$('.backdrop img, .band img').forEach((el) => {
      gsap.fromTo(el, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    $$('.collage .a img, .collage .b img').forEach((el, i) => {
      gsap.fromTo(el, { yPercent: i ? 5 : -4 }, { yPercent: i ? -5 : 4, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    const hero = $('.hero-media img');
    if (hero) gsap.to(hero, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: true } });
    // topo das páginas internas: a foto fica para trás e o texto some aos poucos ao rolar
    const pm = $('.phero-media');
    if (pm) {
      gsap.to(pm, { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '.phero', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.phero-text', { y: -50, opacity: 0.15, ease: 'none', scrollTrigger: { trigger: '.phero', start: 'top top', end: 'bottom 25%', scrub: true } });
    }

    // a diária: rolar avança de 09h a 22h e a foto troca
    const dn = $('[data-dn]');
    if (dn) {
      const time = $('[data-dn-time]', dn)!;
      const label = $('[data-dn-label]', dn)!;
      const cap = $('[data-dn-cap]', dn)!;
      const arc = $('[data-dial-arc]', dn) as unknown as SVGPathElement;
      const dot = $('[data-dial-dot]', dn) as unknown as SVGCircleElement;
      const s = { h: 9 };
      const pt = (h: number) => {
        const a = ((h - 9) / 13) * 2 * Math.PI - Math.PI / 2;
        return [60 + 48 * Math.cos(a), 60 + 48 * Math.sin(a)];
      };
      const render = () => {
        const h = Math.floor(s.h);
        const m = Math.floor((s.h - h) * 60);
        time.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        const f = s.h < 12 ? 'manhã' : s.h < 17 ? 'tarde' : s.h < 19 ? 'entardecer' : 'noite';
        label.textContent = f;
        cap.textContent = f === 'manhã' || f === 'tarde' ? 'Piscina de dia' : f === 'entardecer' ? 'A cascata ao entardecer' : 'A piscina à noite';
        arc.style.strokeDashoffset = String(1 - (s.h - 9) / 13);
        const [x, y] = pt(s.h);
        dot.setAttribute('cx', x.toFixed(2));
        dot.setAttribute('cy', y.toFixed(2));
      };
      const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: dn, start: 'top top', end: '+=220%', pin: true, scrub: 0.6, anticipatePin: 1 } });
      tl.to(s, { h: 22, duration: 3, onUpdate: render }, 0)
        .to($('.dn-2', dn), { clipPath: 'inset(0% 0 0 0)', duration: 0.9 }, 0.5)
        .to($('.dn-3', dn), { clipPath: 'inset(0% 0 0 0)', duration: 0.9 }, 1.8);
      render();
    }
  });
  ScrollTrigger.refresh();
}

initChrome();
document.addEventListener('astro:page-load', () => {
  initPins();
  initHeroIntro();
  initReveals();
  initCarousels();
  initFaq();
  initScrollFx();
  initMagnetic();
  initCounts();
  initConsent();
  initReserva();
  initGaleria();
  const ano = $('#ano');
  if (ano) ano.textContent = String(new Date().getFullYear());
});
document.addEventListener('astro:before-swap', () => {
  io?.disconnect();
  ro?.disconnect();
  ctx?.revert();
  ctx = null;
  ScrollTrigger.getAll().forEach((s) => s.kill());
  document.body.classList.remove('menu-open');
});
