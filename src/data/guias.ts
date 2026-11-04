// Guias (blog). Um novo por mês: copie um item, troque o slug, o título, a data e as seções.
// Sem preços inventados; dados do espaço só os confirmados em conteudo.ts.
import { site } from './conteudo';

export type Guia = {
  slug: string; titulo: string; resumo: string; data: string; img: string;
  secoes: { h: string; p?: string[]; lista?: string[] }[];
  relacionados: [string, string][];
};

export const guias: Guia[] = [
  {
    slug: 'checklist-festa-com-piscina',
    titulo: 'Checklist para festa com piscina',
    resumo: 'O que levar, o que combinar antes e os cuidados com crianças para a festa na piscina dar certo do começo ao fim.',
    data: '2026-11-04',
    img: 'piscina-dia',
    secoes: [
      { p: [
        'Festa com piscina é sinônimo de diversão, mas pede alguns cuidados a mais do que uma festa só no salão. Este checklist ajuda a organizar o que levar, o que combinar com o espaço e como deixar todo mundo seguro e à vontade.',
      ] },
      { h: 'Antes da festa', lista: [
        'Confirme o horário de uso do espaço e quanto tempo você terá para montar e desmontar.',
        'Avise os convidados para levarem roupa de banho, toalha, chinelo e uma muda de roupa.',
        'Pergunte se a piscina é aquecida: em dias mais frios isso faz diferença para as crianças.',
        'Combine onde fica a área das mesas e onde ficam as cadeiras em volta da piscina.',
        'Confira as regras do lugar sobre som, horário de encerramento e uso da churrasqueira.',
      ] },
      { h: 'O que levar no dia', lista: [
        'Protetor solar e repelente.',
        'Sacolas para roupas molhadas.',
        'Copos plásticos para a área da piscina (vidro e piscina não combinam).',
        'Gelo extra: com piscina e calor, a bebida acaba gelando menos do que você imagina.',
        'Uma caixa com primeiros socorros básicos.',
      ] },
      { h: 'Crianças na piscina', p: [
        'Defina um adulto responsável por olhar a piscina o tempo todo, revezando com outro adulto a cada hora. Boia e colete ajudam, mas não substituem alguém atento. Evite deixar a piscina livre durante o parabéns, quando todo mundo se distrai.',
      ] },
      { h: 'Comida e horários', p: [
        'Em festa com piscina, o almoço costuma ser mais leve e o lanche da tarde faz sucesso. Deixe as comidas na sombra e combine um intervalo da piscina para o parabéns e as fotos.',
        `No Liderança Espaço de Eventos, a piscina é ampla, com cascata e aquecimento solar, e a diária vai das 09h às 22h: dá para aproveitar o dia e terminar com as luzes da piscina acesas. Até ${site.capacidade} pessoas.`,
      ] },
    ],
    relacionados: [['Aniversários', '/eventos/aniversarios/'], ['Festas infantis', '/eventos/festas-infantis/'], ['Espaço com piscina perto de Goiânia', '/espaco-de-eventos-com-piscina-perto-de-goiania/']],
  },
  {
    slug: 'quanto-tempo-antes-reservar-salao-de-festas',
    titulo: 'Quanto tempo antes reservar o salão de festas',
    resumo: 'Sábados, dezembro e datas comemorativas acabam primeiro. Veja com quanto tempo de antecedência vale consultar a data.',
    data: '2026-11-04',
    img: 'salao-amplo',
    secoes: [
      { p: [
        'A pergunta mais comum de quem vai organizar uma festa é: com quanto tempo de antecedência eu preciso reservar o salão? A resposta depende do dia da semana e da época do ano.',
      ] },
      { h: 'Sábados acabam primeiro', p: [
        'Sábado é o dia mais procurado para aniversários, chás e casamentos pequenos. Se a sua festa precisa ser num sábado específico, o ideal é consultar a data assim que ela estiver definida, com alguns meses de folga. Sextas e domingos costumam ter mais opções.',
      ] },
      { h: 'Novembro e dezembro', p: [
        'Confraternizações de empresa, festas de fim de ano, Natal e Réveillon concentram muitos pedidos em poucas semanas. Para dezembro, comece a procurar ainda em setembro ou outubro.',
      ] },
      { h: 'Antes de fechar, confira', lista: [
        'A capacidade do espaço para o seu número de convidados.',
        'O horário de uso e se ele inclui montagem e desmontagem.',
        'Como funciona o sinal da reserva e as formas de pagamento.',
        'As regras do espaço, como som e horário de encerramento.',
        'Se dá para visitar antes.',
      ] },
      { h: 'No Liderança', p: [
        `As datas são limitadas e a reserva é feita com 50% de sinal. O espaço recebe até ${site.capacidade} pessoas, a diária vai das 09h às 22h e o pagamento pode ser no cartão de crédito, no débito ou por aproximação. Os valores são passados pelo WhatsApp, de acordo com a data.`,
      ] },
    ],
    relacionados: [['Consultar a minha data', '/reservar/'], ['Salão de festas em Abadia de Goiás', '/salao-de-festas-abadia-de-goias/'], ['Dúvidas frequentes', '/duvidas/']],
  },
  {
    slug: 'confraternizacao-de-fim-de-ano-com-churrasco-e-piscina',
    titulo: 'Como organizar uma confraternização de fim de ano com churrasco e piscina',
    resumo: 'Do convite ao encerramento: um roteiro simples para a confraternização da empresa ou da turma dar certo.',
    data: '2026-11-04',
    img: 'bancada',
    secoes: [
      { p: [
        'Churrasco e piscina são a combinação mais pedida para confraternização de fim de ano. Com um pouco de planejamento, dá para todo mundo aproveitar sem que ninguém passe o dia preso na churrasqueira.',
      ] },
      { h: '1. Defina data e lista de convidados', p: [
        'Dezembro enche rápido. Feche a data primeiro e confirme a lista depois, sempre dentro da capacidade do espaço. Para empresas, sextas-feiras e sábados do começo de dezembro são os mais disputados.',
      ] },
      { h: '2. Monte um roteiro do dia', lista: [
        'Manhã: chegada, montagem das mesas e bebidas no freezer.',
        'Almoço: churrasco, com alguém escalado para a churrasqueira em turnos.',
        'Tarde: piscina, sinuca e conversa.',
        'Fim da tarde: homenagens, amigo secreto ou uma fala rápida.',
        'Noite: encerramento com calma, dentro do horário combinado.',
      ] },
      { h: '3. Divida as tarefas', p: [
        'Escolha uma pessoa para as compras, outra para a churrasqueira e outra para receber os convidados. Uma planilha simples com o que cada um leva evita sobras e faltas.',
      ] },
      { h: '4. Combine as regras do espaço', p: [
        'Pergunte sobre horário, som e uso da piscina antes do dia. No Liderança, por exemplo, o som automotivo é proibido e a diária vai das 09h às 22h.',
      ] },
      { h: 'No Liderança', p: [
        `O espaço tem churrasqueira, fogão industrial de 4 bocas, freezer horizontal, piscina com cascata e aquecimento solar, mesa de sinuca, Wi-Fi e 2 TVs, para até ${site.capacidade} pessoas, em Abadia de Goiás, a ${site.referencia}.`,
      ] },
    ],
    relacionados: [['Confraternização de fim de ano', '/eventos/confraternizacao-fim-de-ano/'], ['Confraternizações', '/eventos/confraternizacoes/'], ['Como chegar', '/como-chegar/']],
  },
];
