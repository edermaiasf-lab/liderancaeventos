import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // endereço publicado. Ao ligar o domínio próprio, trocar aqui e em src/data/conteudo.ts (site.url)
  site: 'https://liderancaeventos.pages.dev',
  integrations: [sitemap({ filter: (p) => !p.includes('/404') })],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
