const DIAS = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
const DIAS_CURTO = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const pad = (n: number) => String(n).padStart(2, '0');
const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromISO = (s: string) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const fmt = (d: Date) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;

const ABRE = 9;
const FECHA = 22;

export function initReserva() {
  const form = document.getElementById('reserva') as HTMLFormElement | null;
  if (!form) return;

  const whats = form.dataset.whats!;
  const max = Number(form.dataset.max);
  const dataEl = form.querySelector<HTMLInputElement>('#f-data')!;
  const nomeEl = form.querySelector<HTMLInputElement>('#f-nome')!;
  const convEl = form.querySelector<HTMLInputElement>('#f-conv')!;
  const iniEl = form.querySelector<HTMLSelectElement>('#f-ini')!;
  const quick = form.querySelector<HTMLElement>('#quick')!;
  const ok = form.querySelector<HTMLElement>('#form-ok')!;
  const hint = form.querySelector<HTMLElement>('#form-hint')!;
  const arc = document.querySelector<SVGElement>('[data-form-arc]');
  const readEl = document.querySelector<HTMLElement>('[data-clock-read]');
  const subEl = document.querySelector<HTMLElement>('[data-clock-sub]');
  const durVal = () => Number((form.querySelector('input[name="dur"]:checked') as HTMLInputElement).value);

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  dataEl.min = toISO(hoje);

  const setErr = (el: HTMLInputElement, msg: string) => {
    document.getElementById('err-' + el.name)!.textContent = msg;
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
  };

  /* horários: a diária só existe das 09h às 22h */
  iniEl.replaceChildren();
  for (let h = ABRE; h <= FECHA - 4; h++) iniEl.add(new Option(`${pad(h)}:00`, String(h)));
  iniEl.value = String(ABRE);

  const horario = () => {
    const dur = durVal();
    let ini = Number(iniEl.value);
    let ajustou = false;
    if (ini + dur > FECHA) { ini = FECHA - dur; iniEl.value = String(ini); ajustou = true; }
    return { ini, dur, fim: ini + dur, ajustou };
  };

  const render = () => {
    const { ini, dur, fim, ajustou } = horario();
    if (arc) {
      const f = dur / (FECHA - ABRE);
      arc.style.strokeDasharray = `${f} 1`;
      arc.style.strokeDashoffset = String(-(ini - ABRE) / (FECHA - ABRE));
    }
    if (readEl) readEl.textContent = `${pad(ini)}h às ${pad(fim)}h`;
    if (subEl) subEl.textContent = `${dur} horas de festa, no mesmo dia.`;
    hint.textContent = ajustou
      ? `Ajustamos o início para ${pad(ini)}h: a diária termina às ${FECHA}h.`
      : `${dur} horas de festa. A diária vai das ${pad(ABRE)}h às ${FECHA}h.`;
  };
  iniEl.addEventListener('change', render);
  form.querySelectorAll('input[name="dur"]').forEach((r) => r.addEventListener('change', render));

  /* atalhos: próximas sextas e sábados */
  quick.replaceChildren();
  const atalhos: Date[] = [];
  for (let i = 0; atalhos.length < 4 && i < 28; i++) {
    const d = new Date(hoje);
    d.setDate(hoje.getDate() + i);
    if (d.getDay() === 5 || d.getDay() === 6) atalhos.push(d);
  }
  const onDate = () => {
    [...quick.children].forEach((b) => b.setAttribute('aria-pressed', String((b as HTMLElement).dataset.iso === dataEl.value)));
    if (dataEl.value) setErr(dataEl, '');
  };
  atalhos.forEach((d) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.dataset.iso = toISO(d);
    b.setAttribute('aria-pressed', 'false');
    b.innerHTML = `<b>${DIAS_CURTO[d.getDay()]}</b>${fmt(d)}`;
    b.addEventListener('click', () => { dataEl.value = b.dataset.iso!; onDate(); });
    quick.appendChild(b);
  });
  dataEl.addEventListener('input', onDate);
  dataEl.addEventListener('change', onDate);
  nomeEl.addEventListener('blur', () => nomeEl.value.trim() && setErr(nomeEl, ''));
  render();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let first: HTMLInputElement | null = null;

    if (!dataEl.value) { setErr(dataEl, 'Escolha a data do evento (ou toque num dos atalhos acima).'); first = dataEl; }
    else if (fromISO(dataEl.value) < hoje) { setErr(dataEl, 'Essa data já passou. Escolha uma data a partir de hoje.'); first = dataEl; }
    else setErr(dataEl, '');

    const conv = parseInt(convEl.value, 10);
    if (convEl.value && (!Number.isFinite(conv) || conv < 1 || conv > max)) {
      setErr(convEl, `O espaço comporta até ${max} pessoas.`);
      first = first || convEl;
    } else setErr(convEl, '');

    if (!nomeEl.value.trim()) { setErr(nomeEl, 'Diz seu nome pra gente saber com quem fala.'); first = first || nomeEl; }
    else setErr(nomeEl, '');

    if (first) { first.focus(); ok.hidden = true; return; }

    const d = fromISO(dataEl.value);
    const evento = (form.querySelector('input[name="evento"]:checked') as HTMLInputElement).value;
    const { ini, dur, fim } = horario();
    const linhas = [
      `Olá! Sou ${nomeEl.value.trim()} e vim pelo site do Liderança Espaço de Eventos. Quero consultar uma data:`,
      '',
      `• Evento: ${evento}`,
      `• Data: ${fmt(d)}/${d.getFullYear()} (${DIAS[d.getDay()]})`,
      `• Horário: das ${pad(ini)}h às ${pad(fim)}h (${dur}h)`,
    ];
    if (convEl.value) linhas.push(`• Convidados: cerca de ${conv}`);
    linhas.push('', 'Essa data está disponível?');

    const url = `https://wa.me/${whats}?text=${encodeURIComponent(linhas.join('\n'))}`;
    const win = window.open(url, '_blank');
    if (win) win.opener = null;
    ok.innerHTML = win
      ? `Pronto! Abrimos o WhatsApp com a sua mensagem. Não abriu? <a href="${url}" target="_blank" rel="noopener">Toque aqui</a>.`
      : `Seu navegador bloqueou a janela. <a href="${url}" target="_blank" rel="noopener">Toque aqui pra abrir o WhatsApp</a>.`;
    ok.hidden = false;
  });
}
