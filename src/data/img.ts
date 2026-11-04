// Tamanhos gerados por scripts/fotos.cjs: xs 480, sm 800, md 1200 (só nas horizontais) e o original.
import { dims } from './conteudo';

export const srcsetFoto = (name: string) => {
  const [w] = dims(name);
  return [`/img/xs/${name}.webp 480w`, `/img/sm/${name}.webp 800w`, ...(w > 1400 ? [`/img/md/${name}.webp 1200w`] : []), `/img/${name}.webp ${w}w`].join(', ');
};

/** mesmas larguras em AVIF */
export const srcsetAvif = (name: string) => {
  const [w] = dims(name);
  return [`/img/xs/${name}.avif 480w`, `/img/sm/${name}.avif 800w`, ...(w > 1400 ? [`/img/md/${name}.avif 1200w`] : []), `/img/${name}.avif ${w}w`].join(', ');
};

/** pré-carregamento da imagem principal (LCP), colocado no topo do <head> */
export type Preload = { srcset: string; sizes: string; media?: string; type?: string };

/** foto do topo das páginas internas (PageHero) */
export const sizesHero = '(max-width: 1000px) 100vw, 60vw';
export const lcpHero = (name: string): Preload[] => [{ srcset: srcsetAvif(name), sizes: sizesHero, type: 'image/avif' }];
