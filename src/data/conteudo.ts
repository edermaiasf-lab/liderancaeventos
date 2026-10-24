// Conteúdo do site. Edite aqui e rode o gerador (ver LEIA-ME.txt na raiz).

export const site = {
  nome: 'Liderança Espaço de Eventos',
  url: 'https://www.liderancaeventos.com.br', // TROCAR pelo domínio real
  whats: '5562991035398',
  telefone: '(62) 99103-5398',
  telefoneLink: 'tel:+5562991035398',
  instagram: 'https://www.instagram.com/lideranca_espacodeeventos/', // conferir com o cliente
  endereco: ['R. Fortaleza, Qd. 030 — Lt. 010', 'Residencial Goiânia Sul · Zona Rural', 'Abadia de Goiás — GO · CEP 75325-204'],
  mapsRota: 'https://www.google.com/maps/dir/?api=1&destination=R.+Fortaleza+Qd.+030+Lt.+010+Residencial+Goi%C3%A2nia+Sul+Abadia+de+Goi%C3%A1s+GO',
  mapsEmbed: 'https://www.google.com/maps?q=R.+Fortaleza,+Residencial+Goi%C3%A2nia+Sul,+Abadia+de+Goi%C3%A1s+-+GO,+75325-204&output=embed',
  nota: '4,8',
  avaliacoes: 6,
  capacidade: 60,
  legal: { razao: '', cnpj: '', email: '', atualizacao: '24 de outubro de 2026' },
};

export const waLink = (msg = 'Olá! Vim pelo site e quero saber sobre datas no Liderança Espaço de Eventos.') =>
  `https://wa.me/${site.whats}?text=${encodeURIComponent(msg)}`;

import fotos from './fotos.json';

// tamanho das fotos (gerado por scripts/fotos.cjs; evita pulo de layout)
export const dims = (img: string): [number, number] => (fotos as Record<string, [number, number]>)[img] ?? [1280, 854];

export const nav = [
  { href: '/espaco/', label: 'O espaço', key: 'espaco' },
  { href: '/eventos/', label: 'Eventos', key: 'eventos' },
  { href: '/estrutura/', label: 'Estrutura', key: 'estrutura' },
  { href: '/galeria/', label: 'Galeria', key: 'galeria' },
  { href: '/duvidas/', label: 'Dúvidas', key: 'duvidas' },
  { href: '/contato/', label: 'Contato', key: 'contato' },
];

/** Lista oficial passada pelo cliente */
export const estrutura = [
  ['Quarto', '1 cama de casal + 2 colchões de solteiro'],
  ['Piscina ampla', 'Com cascata e aquecimento solar'],
  ['2 TVs', ''],
  ['Climatizador de ar', ''],
  ['Freezer horizontal', ''],
  ['Mesa de sinuca', ''],
  ['10 jogos de mesas e cadeiras', ''],
  ['Churrasqueira', ''],
  ['Fogão industrial', '4 bocas, com gás'],
  ['Wi-Fi liberado', ''],
  ['Câmeras de segurança', 'Sistema de monitoramento'],
];

/** O que tem no espaço, agrupado para o visitante entender de uma vez */
export const grupos = [
  { t: 'Lazer', itens: ['Piscina ampla com cascata', 'Aquecimento solar na piscina', 'Mesa de sinuca', '2 TVs'] },
  { t: 'Conforto', itens: ['Climatizador de ar', 'Quarto com 1 cama de casal e 2 colchões de solteiro', 'Wi-Fi liberado'] },
  { t: 'Comida e bebida', itens: ['Churrasqueira', 'Fogão industrial de 4 bocas, com gás', 'Freezer horizontal'] },
  { t: 'Mesas e lugares', itens: ['10 jogos de mesas e cadeiras', 'Capacidade para até 60 pessoas'] },
  { t: 'Segurança', itens: ['Sistema de câmeras de segurança'] },
];

/** Respostas rápidas (home) */
export const rapidas = [
  ['Quantas pessoas cabem?', 'Até 60 pessoas, com 10 jogos de mesas e cadeiras.'],
  ['Qual o horário?', 'A diária vai das 09h às 22h.'],
  ['Como reservo a data?', 'Com 50% de sinal. As datas são limitadas e sujeitas à disponibilidade.'],
  ['A piscina é aquecida?', 'Sim, por aquecimento solar. Ela também tem cascata.'],
  ['Tem churrasqueira e cozinha?', 'Tem churrasqueira, fogão industrial de 4 bocas com gás e freezer horizontal.'],
  ['Pode usar som automotivo?', 'Não. O som automotivo é proibido no espaço.'],
];

export const ambientes = [
  {
    slug: 'piscina', n: '01', nome: 'Piscina com cascata', curto: 'Piscina',
    img: 'piscina-led-3', hero: 'piscina-cascata', alt: 'Piscina ampla com cascata de pedra, luzes de LED na água e paredes escuras ao entardecer',
    resumo: 'Ampla, com cascata, aquecimento solar e luzes na água. Do dia ensolarado à noite iluminada.',
    texto: [
      'A piscina é o coração do espaço. Ampla, com uma cascata de pedra clara contra a parede escura, ela é aquecida por energia solar e tem luzes na água que transformam o ambiente quando o dia vai embora.',
      'Em volta, o deck e as luminárias de parede dão o clima: de dia, cor de turquesa; ao entardecer e à noite, um cenário de festa.',
    ],
    destaques: ['Cascata de pedra', 'Aquecimento solar', 'Luzes de LED na água', 'Luminárias de parede'],
    ideal: 'Aniversários, confraternizações e festas de dia inteiro.',
    galeria: ['piscina-cascata', 'piscina-detalhe', 'piscina-lateral', 'piscina-led-1', 'piscina-led-2', 'piscina-led-3', 'piscina-contraluz', 'piscina-dia', 'piscina-lateral-2', 'piscina-led-4', 'piscina-led-5', 'piscina-led-6', 'piscina-noite', 'piscina-noite-2'],
  },
  {
    slug: 'salao', n: '02', nome: 'Salão', curto: 'Salão',
    img: 'salao-sinuca', hero: 'salao-amplo', alt: 'Salão amplo com piso claro, iluminação de embutir no teto, TV na parede e mesa de sinuca',
    resumo: 'Piso claro, iluminação de embutir, TVs e 10 jogos de mesas e cadeiras.',
    texto: [
      'O salão é onde a festa acontece com conforto. Piso claro, spots de luz no teto, TVs na parede e 10 jogos de mesas e cadeiras para arrumar do jeito do seu evento.',
      'Ele se abre para a piscina, então quem está dentro continua vendo e participando da festa lá fora.',
    ],
    destaques: ['10 jogos de mesas e cadeiras', '2 TVs', 'Piso claro', 'Iluminação de embutir'],
    ideal: 'Festas infantis, chás, aniversários e confraternizações.',
    galeria: ['salao-sinuca', 'salao-amplo', 'salao-sinuca-2', 'vista-geral'],
  },
  {
    slug: 'sinuca-e-bancada', n: '03', nome: 'Sinuca e bancada', curto: 'Sinuca',
    img: 'bancada', hero: 'sinuca-close', alt: 'Mesa de sinuca verde com bancada escura e banquetas altas ao fundo',
    resumo: 'Mesa de sinuca e bancada escura com banquetas altas: o canto da brincadeira e da conversa.',
    texto: [
      'Mesa de sinuca de feltro verde e, ao lado, uma bancada escura com banquetas altas. É o canto da turma: jogo de um lado, conversa e petisco do outro.',
      'Fica dentro do salão, com TV por perto.',
    ],
    destaques: ['Mesa de sinuca', 'Bancada com banquetas altas', 'Dentro do salão'],
    ideal: 'Confraternizações e aniversários de adultos.',
    galeria: ['sinuca-close', 'bancada', 'salao-sinuca-2'],
  },
  {
    slug: 'entrada', n: '04', nome: 'Fachada e entrada', curto: 'Entrada',
    img: 'fachada-dia', hero: 'entrada-noite', alt: 'Fachada do espaço com letreiro Liderança iluminado e jardim de plantas',
    resumo: 'Fachada moderna com letreiro iluminado, jardim de plantas e câmeras de segurança.',
    texto: [
      'A chegada já faz parte da festa: fachada moderna, letreiro da Liderança que acende à noite e um jardim de plantas na entrada.',
      'O espaço conta com sistema de câmeras de segurança.',
    ],
    destaques: ['Letreiro iluminado', 'Jardim na entrada', 'Câmeras de segurança'],
    ideal: 'Fotos de chegada e recepção dos convidados.',
    galeria: ['fachada-dia', 'entrada-noite'],
  },
];

export const eventos = [
  {
    slug: 'aniversarios', nome: 'Aniversários', img: 'piscina-led-1', alt: 'Piscina iluminada ao entardecer ao lado do salão',
    resumo: 'Piscina com cascata, salão e sinuca para festa de dia inteiro.',
    titulo: 'Aniversário com piscina, sinuca e espaço de sobra',
    texto: [
      'Para aniversário, o espaço junta tudo num lugar só: salão para as mesas e o bolo, piscina com cascata e aquecimento solar para a turma curtir, sinuca para a brincadeira e churrasqueira e fogão industrial para a comida.',
      'A diária vai das 09h às 22h, e o espaço comporta até 60 pessoas.',
    ],
    usa: ['salao', 'piscina', 'sinuca-e-bancada'],
    whatsMsg: 'Olá! Vim pelo site e quero consultar uma data para aniversário.',
  },
  {
    slug: 'festas-infantis', nome: 'Festas infantis', img: 'salao-amplo', alt: 'Salão amplo com piso claro pronto para receber decoração',
    resumo: 'Salão amplo e livre para a decoração do tema que você escolher.',
    titulo: 'Festa infantil com o tema que você escolher',
    texto: [
      'O salão é amplo e de piso claro: uma tela em branco para o painel, o arco de balões e a mesa do bolo do tema que você escolher.',
      'O espaço é a base, o tema é seu. E o espaço conta com sistema de câmeras de segurança.',
    ],
    usa: ['salao', 'entrada'],
    whatsMsg: 'Olá! Vim pelo site e quero consultar uma data para festa infantil.',
  },
  {
    slug: 'cha-de-bebe', nome: 'Chá de bebê e revelação', img: 'salao-sinuca-2', alt: 'Salão com iluminação de embutir',
    resumo: 'Salão confortável para receber os convidados do momento especial.',
    titulo: 'Chá de bebê e revelação com conforto para todos',
    texto: [
      'Salão com iluminação de embutir, 10 jogos de mesas e cadeiras e a entrada com letreiro iluminado para as fotos. Conforto para os convidados e espaço para a decoração do seu jeito.',
    ],
    usa: ['salao', 'entrada'],
    whatsMsg: 'Olá! Vim pelo site e quero consultar uma data para chá de bebê / revelação.',
  },
  {
    slug: 'confraternizacoes', nome: 'Confraternizações', img: 'bancada', alt: 'Bancada escura com banquetas altas e mesa de sinuca',
    resumo: 'Piscina, sinuca, churrasqueira e bancada para reunir a turma ou a empresa.',
    titulo: 'Confraternização para a turma, a família ou a empresa',
    texto: [
      'Piscina com cascata, mesa de sinuca, bancada com banquetas, churrasqueira e fogão industrial: o espaço junta descontração e conversa sem apertos, com Wi-Fi liberado para quem precisa.',
    ],
    usa: ['piscina', 'sinuca-e-bancada', 'salao'],
    whatsMsg: 'Olá! Vim pelo site e quero consultar uma data para confraternização.',
  },
  {
    slug: 'outras-celebracoes', nome: 'Outras celebrações', img: 'piscina-noite-2', alt: 'Piscina com cascata à noite, sob toldo, com luzes acesas',
    resumo: 'Cada celebração é diferente. Fale com a gente e veja como o espaço se adapta.',
    titulo: 'Outras celebrações',
    texto: [
      'Piscina iluminada à noite, salão e fachada com letreiro: um cenário versátil. Cada celebração é diferente, então fale com a gente para ver como o espaço se adapta ao seu formato.',
    ],
    usa: ['piscina', 'salao', 'entrada'],
    whatsMsg: 'Olá! Vim pelo site e quero consultar uma data para uma celebração.',
  },
];

export const faq = [
  ['Quantas pessoas cabem no espaço?', 'O espaço comporta até 60 pessoas, com 10 jogos de mesas e cadeiras.', 'O espaço'],
  ['Qual o horário da diária?', 'A diária vai das 09h às 22h.', 'Reserva'],
  ['Como funciona a reserva?', 'A reserva é feita com 50% de sinal. As datas são limitadas e sujeitas à disponibilidade, então o ideal é consultar com antecedência pelo WhatsApp.', 'Reserva'],
  ['Quanto custa a diária?', 'Os valores são passados pelo WhatsApp, de acordo com a data. Chame no (62) 99103-5398 para receber o orçamento.', 'Reserva'],
  ['Como consulto uma data?', 'Pelo formulário da página Reservar: você escolhe o tipo de evento e a data e a mensagem já chega pronta no WhatsApp. Também dá para ligar para (62) 99103-5398.', 'Reserva'],
  ['A piscina é aquecida?', 'Sim. A piscina é ampla, tem cascata e aquecimento solar.', 'O espaço'],
  ['Tem churrasqueira e cozinha?', 'Tem churrasqueira, fogão industrial de 4 bocas com gás e freezer horizontal.', 'O espaço'],
  ['O espaço tem quarto?', 'Sim: 1 cama de casal e 2 colchões de solteiro.', 'O espaço'],
  ['Tem Wi-Fi e TV?', 'Tem Wi-Fi liberado e 2 TVs.', 'O espaço'],
  ['O espaço tem câmeras de segurança?', 'Sim, o espaço conta com sistema de câmeras de segurança.', 'O espaço'],
  ['Pode usar som automotivo?', 'Não. O som automotivo é proibido no espaço.', 'Regras'],
  ['Que tipos de evento vocês recebem?', 'Aniversários, festas infantis, chás de bebê e revelação, confraternizações e outras celebrações. Se o seu evento é diferente, chame no WhatsApp e converse.', 'Eventos'],
  ['Onde fica?', 'Em Abadia de Goiás — GO, no Residencial Goiânia Sul (R. Fortaleza, Qd. 030, Lt. 010). Na página Contato há o mapa e o botão de rota.', 'Como chegar'],
];

export const galeria = [
  ['piscina-cascata', 'Piscina', 'Piscina com cascata ao entardecer'],
  ['piscina-detalhe', 'Piscina', 'Detalhe da cascata de pedra sobre a água'],
  ['piscina-lateral', 'Piscina', 'Cascata e piscina vistas de lado, com o salão ao fundo'],
  ['piscina-lateral-2', 'Piscina', 'A cascata e a água azul, vistas de perto'],
  ['piscina-led-1', 'Piscina', 'Piscina com luzes de LED e luminárias acesas'],
  ['piscina-led-2', 'Piscina', 'Piscina com luzes rosa na água'],
  ['piscina-led-3', 'Piscina', 'Piscina com luzes coloridas e a cascata ao fundo'],
  ['piscina-led-4', 'Piscina', 'Piscina com luzes coloridas ao entardecer'],
  ['piscina-led-5', 'Piscina', 'Piscina iluminada, vista da borda'],
  ['piscina-led-6', 'Piscina', 'Piscina com luzes verdes e rosa na água'],
  ['piscina-contraluz', 'Piscina', 'Piscina e cascata com o sol ao fundo'],
  ['piscina-dia', 'Piscina', 'Piscina de dia, água azul'],
  ['cascata-salao', 'Piscina', 'Cascata em primeiro plano e o salão ao fundo'],
  ['piscina-noite', 'Piscina', 'Piscina à noite sob o toldo'],
  ['piscina-noite-2', 'Piscina', 'Piscina com cascata iluminada, no fim do dia'],
  ['vista-geral', 'Visão geral', 'Visão geral: piscina, cascata e salão'],
  ['salao-sinuca', 'Salão e sinuca', 'Salão com mesa de sinuca, bancada e TV'],
  ['salao-amplo', 'Salão e sinuca', 'Salão amplo com piso claro e TV'],
  ['salao-sinuca-2', 'Salão e sinuca', 'Mesa de sinuca no salão'],
  ['sinuca-close', 'Salão e sinuca', 'Mesa de sinuca de feltro verde'],
  ['bancada', 'Salão e sinuca', 'Bancada com banquetas e piscina ao fundo'],
  ['entrada-noite', 'Entrada', 'Letreiro Liderança iluminado à noite'],
  ['fachada-dia', 'Entrada', 'Fachada com letreiro e jardim de plantas'],
];


/* ================= detalhes extras (depoimentos, papéis, roteiros) ================= */
export const googleLink =
  'https://www.google.com/maps/search/?api=1&query=Abadia+de+Goi%C3%A1s+R.+Fortaleza+Qd.+030+Lt.+010+Residencial+Goi%C3%A2nia+Sul';

export const reviews = [
  { q: 'A piscina é nota 10 e a limpeza do espaço impressiona.', a: 'Maria Natalina' },
  { q: 'O sistema de som também é de primeira.', a: 'Tay Gomes' },
];

/** o que cada ambiente faz na festa (usado nas páginas de evento) */
export const papeis: Record<string, string> = {
  piscina: 'Diversão, descanso e fotos',
  salao: 'Mesas, bolo e decoração',
  'sinuca-e-bancada': 'Brincadeira e conversa',
  entrada: 'Recepção e fotos',
};

/** sugestão de roteiro por tipo de evento: [hora, título, texto] */
export const roteiros: Record<string, [string, string, string][]> = {
  aniversarios: [
    ['09h', 'Chegada e montagem', 'Hora de arrumar mesas, bolo e decoração no salão.'],
    ['12h', 'Almoço na churrasqueira', 'Churrasqueira e fogão industrial para preparar a comida do jeito da família.'],
    ['15h', 'Piscina e sinuca', 'Piscina com aquecimento solar, mesa de sinuca e espaço de sobra para a turma.'],
    ['18h', 'Parabéns', 'Bolo e fotos com a cascata e o letreiro iluminado ao fundo.'],
    ['22h', 'Encerramento', 'A piscina acende à noite e a festa segue até o fim da diária.'],
  ],
  'festas-infantis': [
    ['09h', 'Montagem do tema', 'Painel, balões e mesa do bolo no salão, com tempo para deixar tudo pronto.'],
    ['11h', 'Chegada dos convidados', 'Recepção das crianças e das famílias, com 10 jogos de mesas e cadeiras.'],
    ['13h', 'Almoço', 'Churrasqueira, fogão industrial e freezer horizontal para apoiar a comida.'],
    ['16h', 'Parabéns', 'Bolo, fotos e a decoração do tema no centro da festa.'],
    ['18h', 'Encerramento', 'Hora de recolher a decoração com calma, dentro da diária.'],
  ],
  'cha-de-bebe': [
    ['09h', 'Montagem', 'Decoração e mesas arrumadas no salão antes dos convidados chegarem.'],
    ['12h', 'Recepção', 'Os convidados chegam pela entrada com letreiro iluminado.'],
    ['14h', 'Momento especial', 'Chá ou revelação, com o salão preparado para o momento.'],
    ['16h', 'Fotos e comemoração', 'Registros na entrada e nos ambientes do espaço.'],
    ['18h', 'Encerramento', 'Despedida e desmontagem, sem pressa, até as 22h.'],
  ],
  confraternizacoes: [
    ['09h', 'Chegada da turma', 'Mesas organizadas e bebidas no freezer horizontal.'],
    ['11h', 'Churrasco', 'Churrasqueira e fogão industrial para a comida.'],
    ['14h', 'Piscina e sinuca', 'Descontração na piscina com cascata e na mesa de sinuca.'],
    ['18h', 'Conversa na bancada', 'A bancada com banquetas é o canto para conversar com calma.'],
    ['22h', 'Encerramento', 'Fim da diária.'],
  ],
  'outras-celebracoes': [
    ['09h', 'Montagem', 'Espaço livre no salão para montar do seu jeito.'],
    ['12h', 'Recepção', 'Chegada dos convidados com 10 jogos de mesas e cadeiras.'],
    ['15h', 'Momento principal', 'O ponto alto da sua celebração, no ambiente que combinar com ela.'],
    ['18h', 'Fotos', 'Piscina iluminada e letreiro na entrada como cenário.'],
    ['22h', 'Encerramento', 'Fim da diária.'],
  ],
};
