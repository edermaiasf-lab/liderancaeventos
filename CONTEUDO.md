# Fase 0 — Briefing e conteúdo (Liderança Espaço de Eventos)

## Já temos (passado pelo cliente)
- Estrutura: quarto (1 cama de casal + 2 colchões), piscina ampla com cascata e aquecimento solar, 2 TVs, climatizador, freezer horizontal, mesa de sinuca, 10 jogos de mesas e cadeiras, churrasqueira, fogão industrial 4 bocas com gás, Wi-Fi, câmeras de segurança
- Capacidade: até 60 pessoas
- Diária: 09h às 22h
- Reserva com 50% de sinal; datas limitadas
- Proibido som automotivo
- Endereço, telefone/WhatsApp, 11 imagens (todas pequenas, ~500px)

## Pendências para confirmar com o cliente
1. **Horário:** o modelo dizia "aberto 24 horas" (vem do Google). A informação oficial é diária 09h–22h. Qual vale? Existe hora extra? Quanto custa?
2. **Valores:** mostrar preço no site ou só "consulte"? Tem pacotes (dia de semana x fim de semana)?
3. **Cancelamento/remarcação:** o sinal de 50% é reembolsável?
4. **Regras:** limite de horário de som, bebida/comida de fora, decoração (o que pode fixar), taxa de limpeza, caução, crianças na piscina.
5. **Quarto:** serve para noiva/aniversariante se trocar? Tem banheiro? Quantos banheiros no total?
6. **Estacionamento:** quantas vagas?
7. **Casamentos:** o espaço aceita cerimônia? (removi a página específica por não termos confirmação)
8. **Depoimentos:** conseguir 5–8 avaliações reais (Google/WhatsApp) com autorização.
9. **Redes sociais:** Instagram, Facebook e perfil do Google Meu Negócio (link).
10. **Domínio:** qual será? (hoje o `astro.config.mjs` usa `liderancaeventos.com.br` como provisório)

## Material de mídia a pedir (o que mais pesa na qualidade)
- Fotos originais em alta (mín. 2000px de largura) de cada ambiente, de dia e de noite
- Fotos com festas montadas e decoradas (várias, por tipo de evento)
- Vídeo curto (10–20 s, vertical e horizontal) do espaço para o hero
- Foto da fachada/entrada (ajuda quem vai chegar)
- Fotos do quarto, da churrasqueira/cozinha e da sinuca (hoje não temos)

## Sitemap (implementado)
```
/                         Home
/espaco/                  Hub dos ambientes
  /espaco/piscina/
  /espaco/area-coberta/
  /espaco/patio/
  /espaco/pergolado-e-balanco/
  /espaco/lounge/
/eventos/                 Hub dos eventos
  /eventos/aniversarios/
  /eventos/festas-infantis/
  /eventos/cha-de-bebe/
  /eventos/confraternizacoes/
  /eventos/outras-celebracoes/
/estrutura/               Lista completa + condições
/galeria/                 Filtro + lightbox
/duvidas/                 FAQ (schema FAQPage)
/contato/                 Endereço, mapa e rota
/reservar/                Formulário -> WhatsApp
/404
```

## Como rodar
```bash
cd site
npm install
npm run dev      # http://localhost:4321
npm run build    # gera a pasta dist/
```
