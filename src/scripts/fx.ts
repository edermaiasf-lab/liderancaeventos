/* Efeitos com GSAP. Carregado só depois que a página aparece, para não atrasar a primeira pintura. */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const $ = <T extends HTMLElement = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends HTMLElement = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

let ctx: gsap.Context | null = null;

/* ---------- botões magnéticos (ideia do 21st.dev, só com mouse) ---------- */
export function initMagnetic() {
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
export function initCounts() {
  if (reduce()) return;
  $$('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const o = { v: 0 };
    el.textContent = '0';
    gsap.to(o, { v: end, duration: 1.8, ease: 'power3.out', onUpdate: () => (el.textContent = String(Math.round(o.v))), onComplete: () => (el.textContent = String(end)), scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
  });
}

/* ---------- parallax e relógio da diária (GSAP) ---------- */
export function initScrollFx() {
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


export function killFx() {
  ctx?.revert();
  ctx = null;
  ScrollTrigger.getAll().forEach((s) => s.kill());
}
