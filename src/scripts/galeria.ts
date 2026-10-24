

/* ---------- lightbox global: qualquer foto com [data-lb] amplia ---------- */
const st = { list: [] as HTMLElement[], idx: 0, opener: null as HTMLElement | null };
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const lb = () => document.getElementById('lb');
const isOpen = () => !!lb()?.classList.contains('on');

function render() {
  const box = lb();
  if (!box) return;
  const it = st.list[st.idx];
  const img = box.querySelector('img')!;
  img.src = it.dataset.src!;
  img.alt = it.dataset.alt ?? '';
  box.querySelector('figcaption')!.textContent = it.dataset.alt ?? '';
  box.querySelector<HTMLElement>('.lb-count')!.textContent = `${st.idx + 1} / ${st.list.length}`;
  const nx = new Image();
  nx.src = st.list[(st.idx + 1) % st.list.length].dataset.src!;
}
function show(i: number) {
  st.idx = (i + st.list.length) % st.list.length;
  const img = lb()?.querySelector('img');
  if (reduce() || !img) { render(); return; }
  img.classList.add('out');
  setTimeout(() => { render(); img.classList.remove('out'); }, 180);
}
function open(el: HTMLElement) {
  const g = el.dataset.lbGroup ?? 'all';
  st.list = [...document.querySelectorAll<HTMLElement>('[data-lb]')].filter((e) => (e.dataset.lbGroup ?? 'all') === g && !e.hidden);
  st.idx = Math.max(0, st.list.indexOf(el));
  st.opener = el;
  render();
  lb()?.classList.add('on');
  document.body.style.overflow = 'hidden';
  lb()?.querySelector<HTMLButtonElement>('.x')?.focus();
}
function close() {
  lb()?.classList.remove('on');
  document.body.style.overflow = '';
  st.opener?.focus();
}

let bound = false;
function bind() {
  if (bound) return;
  bound = true;
  document.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    const item = t.closest<HTMLElement>('[data-lb]');
    if (item && !isOpen()) { open(item); return; }
    if (!isOpen()) return;
    if (t.closest('#lb .x') || t.id === 'lb') close();
    else if (t.closest('#lb .p')) show(st.idx - 1);
    else if (t.closest('#lb .n')) show(st.idx + 1);
  });
  document.addEventListener('keydown', (e) => {
    if (isOpen()) {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(st.idx - 1);
      if (e.key === 'ArrowRight') show(st.idx + 1);
      return;
    }
    const t = e.target as HTMLElement;
    if ((e.key === 'Enter' || e.key === ' ') && t.matches?.('[data-lb]')) { e.preventDefault(); open(t); }
  });
  let x0 = 0;
  document.addEventListener('touchstart', (e) => { if (isOpen()) x0 = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', (e) => {
    if (!isOpen()) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) show(st.idx + (dx < 0 ? 1 : -1));
  });
}

/* ---------- página Galeria: filtros e entrada em cascata ---------- */
export async function initGaleria() {
  bind();
  const root = document.getElementById('galeria');
  if (!root) return;
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
  gsap.registerPlugin(ScrollTrigger);
  const items = [...root.querySelectorAll<HTMLButtonElement>('[data-item]')];
  const filters = [...document.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const count = document.querySelector<HTMLElement>('[data-gcount]');

  if (!reduce()) {
    ScrollTrigger.batch(items, {
      start: 'top 94%',
      once: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.07, ease: 'power3.out', overwrite: true }),
    });
  } else items.forEach((i) => (i.style.opacity = '1'));

  filters.forEach((f) =>
    f.addEventListener('click', () => {
      const cat = f.dataset.filter!;
      filters.forEach((x) => x.setAttribute('aria-pressed', String(x === f)));
      items.forEach((it) => (it.hidden = cat !== 'todos' && it.dataset.cat !== cat));
      const list = items.filter((it) => !it.hidden);
      if (count) count.textContent = String(list.length);
      if (!reduce()) gsap.fromTo(list, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.04, ease: 'power3.out', overwrite: true });
      else list.forEach((i) => (i.style.opacity = '1'));
      ScrollTrigger.refresh();
    }),
  );
}
