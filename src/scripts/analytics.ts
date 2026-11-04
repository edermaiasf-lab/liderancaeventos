/* Google Analytics 4 com Consent Mode v2.
   Nada é carregado sem o ID (PUBLIC_GA_ID) e sem o aceite de cookies de estatística.
   Eventos: click_whatsapp, click_ligar, click_rota, click_instagram e submit_reservar. */
import { getConsent } from './consent';

const GA = (import.meta.env.PUBLIC_GA_ID as string | undefined)?.trim();

type Gtag = (...args: unknown[]) => void;
declare global { interface Window { dataLayer?: unknown[]; gtag?: Gtag } }

let loaded = false;

function load() {
  if (!GA || loaded) return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer!.push(arguments); };
  // tudo negado por padrão; só estatística é liberada (anúncios continuam negados)
  window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', wait_for_update: 500 });
  window.gtag('consent', 'update', { analytics_storage: 'granted' });
  window.gtag('js', new Date());
  window.gtag('config', GA, { send_page_view: false });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA)}`;
  document.head.append(s);
  pageView();
}

function pageView() {
  if (!loaded) return;
  // sem parâmetros de campanha no endereço registrado como página (eles vão nos campos de origem)
  window.gtag?.('event', 'page_view', { page_location: location.href, page_path: location.pathname, page_title: document.title });
}

/** registra um evento (não faz nada sem GA ou sem consentimento) */
export function track(name: string, params: Record<string, unknown> = {}) {
  if (loaded) window.gtag?.('event', name, params);
}

function eventoDoLink(a: HTMLAnchorElement): string | null {
  const h = a.href;
  if (/^tel:/i.test(h)) return 'click_ligar';
  if (/wa\.me|api\.whatsapp\.com|whatsapp\.com\/send/i.test(h)) return 'click_whatsapp';
  if (/instagram\.com/i.test(h)) return 'click_instagram';
  if (/google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps|g\.page/i.test(h)) return 'click_rota';
  return null;
}

let bound = false;
export function initAnalytics() {
  if (!GA) return;
  if (!bound) {
    bound = true;
    document.addEventListener('consent-change', () => { if (getConsent()?.a) load(); });
    document.addEventListener('click', (e) => {
      const a = (e.target as HTMLElement).closest?.('a');
      if (!a) return;
      const ev = eventoDoLink(a);
      if (ev) track(ev, { link_url: a.href.split('?')[0], link_text: (a.textContent || '').trim().slice(0, 60), page_path: location.pathname });
    });
    document.addEventListener('astro:after-swap', pageView);
  }
  if (getConsent()?.a) load();
}
