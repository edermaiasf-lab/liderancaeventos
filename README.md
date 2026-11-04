# Liderança Espaço de Eventos — site

Site em Astro, publicado no Cloudflare Pages. Textos e dados ficam em `src/data/`:

| Arquivo | O que tem |
|---|---|
| `src/data/conteudo.ts` | nome, telefone, endereço, distância (referência), nota do Google, eventos, ambientes, FAQ, galeria, texto alternativo das fotos (`altFoto`) |
| `src/data/eventos-extra.ts` | textos longos e perguntas de cada evento; casamento, confraternização de fim de ano, Natal e Réveillon |
| `src/data/locais.ts` | páginas locais (salão de festas em Abadia de Goiás, espaço com piscina perto de Goiânia) e rotas do Como chegar |
| `src/data/guias.ts` | guias (blog). Para publicar um novo, copie um item, troque `slug`, `titulo`, `data` e as seções |

Comandos: `npm install`, `npm run dev` (ou `ABRIR-SITE.bat`), `npm run build`.

## Variáveis de ambiente

Veja `.env.example`. No Cloudflare: **Workers & Pages > liderancaeventos > Configurações > Variáveis e segredos** (produção).

| Variável | Para que serve |
|---|---|
| `SITE_URL` | Endereço oficial. Padrão hoje: `https://liderancaeventos.pages.dev` (constante `PADRAO` em `astro.config.mjs`); trocar para `https://liderancaespacodeeventos.com.br` quando o domínio abrir. Canonical, sitemap, `og:url`, `og:image`, dados estruturados e `robots.txt` saem daqui. |
| `PUBLIC_GA_ID` | ID do Google Analytics 4 (`G-XXXXXXXXXX`). Vazio = nada do Analytics é carregado. |
| `PUBLIC_GSC_VERIFICATION` | Valor da meta tag de verificação do Search Console. |

Depois de mudar uma variável, faça um novo deploy (Implantações > Tentar implantar de novo).

## 1. Ligar o domínio novo

1. Registrar `liderancaespacodeeventos.com.br` no Registro.br.
2. Cloudflare > **Adicionar um site** com o domínio e trocar os servidores DNS no Registro.br pelos dois que o Cloudflare indicar. Esperar o status "Ativo".
3. Workers & Pages > liderancaeventos > **Domínios personalizados** > adicionar `liderancaespacodeeventos.com.br` e também `www.liderancaespacodeeventos.com.br`.
4. HTTPS: o Cloudflare emite o certificado sozinho. Em SSL/TLS deixe o modo **Completo (estrito)** e ative **Sempre usar HTTPS**.
5. Escolher um só endereço: **sem www**. Em Regras > **Regras de redirecionamento**, crie: "Se o host for `www.liderancaespacodeeventos.com.br`" → redirecionamento dinâmico 301 para `concat("https://liderancaespacodeeventos.com.br", http.request.uri.path)`, preservando a query string.
6. Confirmar que `https://liderancaespacodeeventos.com.br/` abre o site e trocar `PADRAO` em `astro.config.mjs` para o domínio novo (ou cadastrar `SITE_URL`).
7. **Só agora** ativar o 301 do endereço antigo: copie `docs/cloudflare/_middleware.js` para `functions/_middleware.js`, faça commit e publique. Ele manda `liderancaeventos.pages.dev/qualquer-caminho` para `liderancaespacodeeventos.com.br/qualquer-caminho` (as prévias `xxxx.liderancaeventos.pages.dev` continuam funcionando).
   - Observação: o arquivo `_redirects` do Cloudflare Pages não aceita regra de um domínio para outro; por isso o redirecionamento usa o `_middleware.js`. A regra equivalente para "Redirecionamentos em massa" está em `docs/cloudflare/_redirects.exemplo`.
8. Atualizar o link do site no perfil do Google (já está com o domínio novo) e no Instagram.

## 2. Google Search Console

1. search.google.com/search-console > **Adicionar propriedade** > **Domínio** > `liderancaespacodeeventos.com.br`. A verificação por DNS é a mais simples: crie o registro TXT no Cloudflare (DNS > Adicionar registro > TXT).
   - Alternativa por meta tag: escolha "Prefixo de URL", copie só o valor de `content="..."` para a variável `PUBLIC_GSC_VERIFICATION` e publique de novo.
   - Alternativa por arquivo: coloque o arquivo `googleXXXX.html` que o Google fornece dentro de `public/` e publique.
2. **Sitemaps** > enviar `sitemap-index.xml`.
3. Mudança de endereço (depois do 301 ativo): adicione também a propriedade antiga `https://liderancaeventos.pages.dev/` (verificação por meta tag funciona, usando a mesma variável), abra **Configurações > Alteração de endereço** nela e escolha a propriedade nova.
4. Em **Inspeção de URL**, peça indexação da home e das páginas novas (salão de festas, como chegar, eventos).

## 3. Google Analytics 4

1. analytics.google.com > Administrador > Criar propriedade > Fluxo de dados **Web** com `https://liderancaespacodeeventos.com.br`. Copie o ID `G-...` para `PUBLIC_GA_ID` e publique.
2. O Analytics só carrega depois que o visitante clica em **Aceitar** no aviso de cookies (Consent Mode v2: estatística liberada só com o aceite; anúncios sempre negados). Com o ID preenchido, o aviso, a Política de Cookies e a tabela de cookies passam a citar o Analytics automaticamente.
3. Eventos enviados pelo site: `click_whatsapp`, `click_ligar`, `click_rota`, `click_instagram`, `submit_reservar` (envio do formulário de reserva).
4. Marcar como conversão: Administrador > **Eventos** (eles aparecem depois do primeiro uso, em até 24 h) > ativar **Marcar como evento principal** em `click_whatsapp`, `click_ligar` e `submit_reservar` (e `click_rota`, se quiser).
5. Vincular ao Search Console: Administrador > **Links de produtos** > Search Console > Vincular > escolher a propriedade do domínio.
6. Perfil do Google: no link do site do perfil, use `https://liderancaespacodeeventos.com.br/?utm_source=google&utm_medium=organic&utm_campaign=perfil`. Assim as visitas vindas do Maps/perfil aparecem separadas no Analytics (Aquisição > Aquisição de tráfego > Campanha "perfil"). O canonical das páginas ignora esses parâmetros.

## 4. Pendências com o dono

- [ ] Registrar o domínio e configurar o DNS (seção 1).
- [ ] ID do GA4 (`PUBLIC_GA_ID`) e verificação do Search Console.
- [ ] Link do perfil no Google (`site.googlePerfil` em `conteudo.ts`): entra no rodapé, no Como chegar e nos dados estruturados (`sameAs`).
- [ ] Link curto "Avalie no Google" (`site.googleAvaliar`): o botão aparece sozinho quando preenchido.
- [ ] Latitude e longitude do portão (`site.geo`): no Google Maps, clique com o botão direito no portão e copie os números.
- [ ] Número de avaliações do Google (`site.avaliacoes`). Hoje o site mostra só a nota 5,0.
- [ ] Depoimentos: autorização de cada cliente antes de citar o nome no site (`reviews` em `conteudo.ts`).
- [ ] **Distância:** o site diz "25 minutos do Buriti Shopping, pela GO-040" a pedido do dono, mas o Google Maps mostra 34 a 36 minutos (cerca de 20 km) saindo da Rua Fortaleza. Para trocar, edite só `site.referencia` em `conteudo.ts`. A frase "O trajeto não passa por barreira" fica em `site.semBarreira`.
- [ ] **Nome no Google:** o perfil se chama "Espaço de eventos Liderança" e o site usa "Liderança Espaço de Eventos". O ideal é o mesmo nome nos dois; hoje o nome do Google entra como `alternateName`.
- [ ] **Endereço:** o site usa "Rua Fortaleza, Qd. 030, Lt. 010, Residencial Goiânia Sul, Zona Rural, CEP 75325-204, Abadia de Goiás – GO". Conferir se o perfil do Google tem exatamente a mesma grafia.
- [ ] Confirmar: estacionamento (gratuito? coberto? quantas vagas?) — só entra no site e nos dados depois de confirmado; acessibilidade; espaço para crianças; se aceita decoração e comida de fornecedores de fora; datas de 24, 25 e 31/12 e se dá para passar das 22h na virada.
- [ ] Casamento: a página `/eventos/casamento/` foi criada porque o formulário já oferecia "Casamento". Confirmar que o espaço recebe casamentos/mini weddings.
- [ ] Razão social, CNPJ e e-mail para as páginas legais (`site.legal`).

## 5. Rotina de SEO

- Um guia novo por mês em `src/data/guias.ts` (sugestão: "Chá de bebê em casa de festas: como planejar").
- Responder todas as avaliações do Google e pedir avaliação depois de cada evento.
- Postar fotos de eventos (com autorização) no perfil do Google e no Instagram.
- Manter nome, endereço e telefone iguais no site, no Google e no Instagram.
