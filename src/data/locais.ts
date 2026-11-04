// Páginas para buscas locais. Texto único em cada uma; só fatos confirmados.
import { site } from './conteudo';

type Bloco = { h: string; p: string[] };
export type Local = {
  slug: string; title: string; description: string; h1: string; eyebrow: string; lead: string;
  img: string; alt: string; blocos: Bloco[]; faqs: [string, string][]; fotos: string[]; whatsMsg: string;
};

export const locais: Local[] = [
  {
    slug: 'salao-de-festas-abadia-de-goias',
    title: 'Salão de festas em Abadia de Goiás com piscina | Liderança',
    description: `Salão de festas com piscina com cascata em Abadia de Goiás (GO): até ${site.capacidade} pessoas, diária das 09h às 22h, churrasqueira e sinuca. Consulte a data pelo WhatsApp.`,
    h1: 'Salão de festas em <em>Abadia de Goiás.</em>',
    eyebrow: 'Abadia de Goiás – GO',
    lead: `Salão, piscina com cascata e aquecimento solar, sinuca e churrasqueira em um espaço só para o seu evento, para até ${site.capacidade} pessoas.`,
    img: 'vista-geral', alt: 'Vista geral do salão de festas com piscina em Abadia de Goiás',
    blocos: [
      { h: 'Um salão de festas com piscina, em Abadia de Goiás', p: [
        'O Liderança Espaço de Eventos fica na Rua Fortaleza, no Residencial Goiânia Sul, em Abadia de Goiás. É um espaço para alugar por diária, das 09h às 22h, reservado só para o seu grupo: não há outro evento acontecendo ao mesmo tempo.',
        'A estrutura junta o que costuma pedir dois lugares diferentes. Tem o salão, de piso claro e iluminação de embutir, para as mesas, o bolo e a decoração. E tem a área da piscina ampla, com cascata de pedra e aquecimento solar, que vira cenário à noite com as luzes acesas.',
      ] },
      { h: 'O que tem no espaço', p: [
        `São 10 jogos de mesas e cadeiras para até ${site.capacidade} pessoas, 2 TVs, climatizador de ar, mesa de sinuca, bancada com banquetas altas, Wi-Fi liberado e sistema de câmeras de segurança.`,
        'Para a comida, há churrasqueira, fogão industrial de 4 bocas com gás e freezer horizontal. O espaço também tem um quarto com cama de casal e dois colchões de solteiro, útil para quem vai se arrumar ou descansar durante a festa.',
      ] },
      { h: 'Para quais festas', p: [
        'Recebemos aniversários de adultos e crianças, festas infantis com tema, chá de bebê e chá revelação, casamentos pequenos e mini weddings, confraternizações de amigos e de empresa e as festas de fim de ano. Se o seu evento é diferente, conte no WhatsApp: a gente vê como o espaço se adapta.',
      ] },
      { h: 'Como reservar a sua data', p: [
        'Os valores dependem da data e são passados pelo WhatsApp. A reserva é feita com 50% de sinal, e as datas são limitadas, principalmente aos sábados e em dezembro. Aceitamos cartão de crédito, cartão de débito e pagamento por aproximação.',
        'Uma regra importante: o som automotivo é proibido no espaço. Na página Reservar você escolhe o tipo de evento e a data, e a mensagem chega pronta no WhatsApp para conferir antes de enviar.',
      ] },
    ],
    faqs: [
      ['Onde fica o salão de festas?', `${site.enderecoLinha}. Fica a ${site.referencia}.`],
      ['Quantas pessoas cabem?', `Até ${site.capacidade} pessoas, com 10 jogos de mesas e cadeiras.`],
      ['A piscina é aquecida?', 'Sim, por aquecimento solar. Ela também tem cascata e luzes na água.'],
      ['Qual o horário de uso?', 'A diária vai das 09h às 22h.'],
    ],
    fotos: ['piscina-cascata', 'salao-amplo', 'sinuca-close', 'fachada-dia', 'piscina-led-5'],
    whatsMsg: 'Olá! Vi o salão de festas em Abadia de Goiás pelo site e quero consultar uma data.',
  },
  {
    slug: 'espaco-de-eventos-com-piscina-perto-de-goiania',
    title: 'Espaço de eventos com piscina perto de Goiânia | Liderança',
    description: `Espaço de eventos com piscina aquecida e cascata a ${site.referencia}, perto de Goiânia e Aparecida de Goiânia. Até ${site.capacidade} pessoas, diária das 09h às 22h.`,
    h1: 'Espaço de eventos com piscina <em>perto de Goiânia.</em>',
    eyebrow: 'Perto de Goiânia e Aparecida',
    lead: `Para quem mora em Goiânia ou em Aparecida de Goiânia e quer fazer a festa com piscina sem ir longe: o Liderança fica a ${site.referencia}.`,
    img: 'piscina-led-3', alt: 'Piscina com cascata e luzes na água, espaço de eventos perto de Goiânia',
    blocos: [
      { h: 'Piscina para a festa, sem sair da região de Goiânia', p: [
        `Fazer a festa com piscina geralmente significa procurar chácara longe da cidade. O Liderança Espaço de Eventos fica em Abadia de Goiás, a ${site.referencia}, e dá para chegar rápido saindo de Goiânia ou de Aparecida de Goiânia. ${site.semBarreira}`,
        'O espaço é alugado por diária, das 09h às 22h, só para o seu grupo. Isso dá tempo para montar com calma de manhã, aproveitar a piscina à tarde e encerrar a festa à noite com as luzes da piscina acesas.',
      ] },
      { h: 'A piscina: ampla, com cascata e aquecimento solar', p: [
        'A piscina é o centro do espaço. É ampla, tem cascata de pedra e aquecimento solar, e à noite as luzes na água e as luminárias de parede mudam o clima da festa. Em volta, a área aberta recebe as cadeiras e a turma.',
        'Ao lado da piscina fica o salão, aberto para a área externa: quem está dentro continua vendo e participando da festa lá fora. No salão ficam a mesa de sinuca, a bancada com banquetas altas e as 2 TVs.',
      ] },
      { h: 'Estrutura para o dia inteiro', p: [
        `São 10 jogos de mesas e cadeiras para até ${site.capacidade} pessoas, churrasqueira, fogão industrial de 4 bocas com gás, freezer horizontal, climatizador de ar, Wi-Fi liberado, quarto com cama de casal e câmeras de segurança.`,
        'É uma boa opção para aniversário, confraternização de empresa, festa de fim de ano, chá de bebê e encontro de família, para quem quer piscina sem a distância de uma chácara.',
      ] },
      { h: 'Valores e reserva', p: [
        'Os valores são passados pelo WhatsApp, de acordo com a data. A reserva é feita com 50% de sinal e as datas são limitadas. Som automotivo é proibido no espaço.',
      ] },
    ],
    faqs: [
      ['Qual a distância de Goiânia?', `O espaço fica a ${site.referencia}. Pelo Google Maps são cerca de 20 km saindo da região do Buriti Shopping.`],
      ['Serve como chácara para confraternização?', `Sim. É um espaço com piscina, churrasqueira e sinuca para até ${site.capacidade} pessoas, alugado por diária.`],
      ['Como chego saindo de Aparecida de Goiânia?', 'A referência é o Buriti Shopping e a GO-040. Na página Como chegar há o mapa e os links de rota prontos no Google Maps.'],
      ['Como reservo?', 'Pela página Reservar ou pelo WhatsApp. A reserva é feita com 50% de sinal.'],
    ],
    fotos: ['piscina-led-1', 'piscina-detalhe', 'cascata-salao', 'bancada', 'piscina-noite-2'],
    whatsMsg: 'Olá! Vi o espaço com piscina perto de Goiânia pelo site e quero consultar uma data.',
  },
];

/** rotas prontas no Google Maps (o Maps calcula o caminho e o tempo na hora) */
const destino = encodeURIComponent('Rua Fortaleza, Qd. 030, Lt. 010, Residencial Goiânia Sul, Abadia de Goiás - GO, 75325-204');
const rota = (origem: string) => `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origem)}&destination=${destino}&travelmode=driving`;
export const rotas = [
  { de: 'Buriti Shopping', origem: 'Buriti Shopping, Aparecida de Goiânia - GO', texto: `Saindo do Buriti Shopping, o caminho é pela GO-040. ${site.semBarreira}` },
  { de: 'Centro de Goiânia', origem: 'Praça Cívica, Goiânia - GO', texto: 'O link abre no Google Maps a rota a partir do centro de Goiânia (Praça Cívica), com o trânsito do momento.' },
  { de: 'Aparecida de Goiânia', origem: 'Aparecida de Goiânia - GO', texto: 'O link abre no Google Maps a rota a partir de Aparecida de Goiânia. A referência no caminho é o Buriti Shopping e a GO-040.' },
].map((r) => ({ ...r, link: rota(r.origem) }));
