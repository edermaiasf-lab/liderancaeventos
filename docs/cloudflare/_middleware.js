// Redirecionamento 301 do endereço antigo (liderancaeventos.pages.dev) para o domínio próprio.
// NÃO está ativo. Para ativar, depois que https://liderancaespacodeeventos.com.br estiver respondendo:
//   copie este arquivo para  functions/_middleware.js  (na raiz do projeto), faça commit e publique.
// Mantém o caminho e os parâmetros (ex.: /eventos/aniversarios/?utm_source=x).
// As prévias do Cloudflare (xxxx.liderancaeventos.pages.dev) não são afetadas.
const ANTIGO = 'liderancaeventos.pages.dev';
const NOVO = 'liderancaespacodeeventos.com.br';

export const onRequest = async (ctx) => {
  const url = new URL(ctx.request.url);
  if (url.hostname === ANTIGO) {
    url.hostname = NOVO;
    return Response.redirect(url.toString(), 301);
  }
  return ctx.next();
};
