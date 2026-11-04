import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Endereço oficial do site. Tudo que é link absoluto (canonical, sitemap, og:url, og:image,
// dados estruturados e robots.txt) sai daqui. Para publicar em outro endereço, defina a
// variável de ambiente SITE_URL no build (ex.: no painel do Cloudflare Pages).
const SITE_URL = (process.env.SITE_URL || 'https://liderancaespacodeeventos.com.br').replace(/\/$/, '');

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (p) => !p.includes('/404') })],
  build: { inlineStylesheets: 'always' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
