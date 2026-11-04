// Conteúdo extra das páginas de evento: textos longos, perguntas próprias e eventos sazonais.
// Regra: só fatos confirmados pelo dono. Datas de 24, 25 e 31/12 ficam como "consulte a data".

type Faq = [string, string];

/** parágrafos a mais e perguntas de cada evento (por slug) */
export const extras: Record<string, { mais?: string[]; faqs?: Faq[] }> = {
  aniversarios: {
    mais: [
      'Quem faz aniversário no Liderança costuma aproveitar o dia inteiro: a montagem começa de manhã, o almoço sai da churrasqueira e a turma passa a tarde entre a piscina aquecida e a mesa de sinuca. À noite, as luzes da piscina acendem e o parabéns ganha um cenário pronto para as fotos.',
      'O espaço recebe até 60 pessoas, com 10 jogos de mesas e cadeiras. Para quem vem de Goiânia ou de Aparecida de Goiânia, o caminho é pela GO-040, e o endereço fica no Residencial Goiânia Sul, em Abadia de Goiás.',
    ],
    faqs: [
      ['Dá para fazer aniversário de adulto e de criança no mesmo lugar?', 'Sim. O salão recebe a decoração e as mesas, a piscina e a sinuca ocupam a turma, e a diária das 09h às 22h dá tempo para montar, comemorar e desmontar com calma.'],
      ['Posso levar a minha decoração e a minha comida?', 'A decoração e o cardápio são do seu jeito. Combine os detalhes da montagem pelo WhatsApp no momento da reserva.'],
      ['Quanto custa fazer o aniversário aí?', 'O valor depende da data e é passado pelo WhatsApp. A reserva é feita com 50% de sinal.'],
    ],
  },
  'festas-infantis': {
    mais: [
      'Para festa infantil, o salão de piso claro funciona como uma tela em branco: o painel, os balões e a mesa do bolo do tema escolhido ficam em destaque. Os adultos acompanham tudo de perto, porque o salão é aberto para a área da piscina.',
      'A diária das 09h às 22h permite montar a decoração sem correria antes de os convidados chegarem. O espaço tem churrasqueira, fogão industrial de 4 bocas e freezer horizontal para apoiar a comida, e conta com câmeras de segurança.',
    ],
    faqs: [
      ['As crianças podem usar a piscina?', 'A piscina faz parte do espaço alugado. Crianças na água sempre com um adulto responsável olhando.'],
      ['Cabe quantas pessoas numa festa infantil?', 'Até 60 pessoas, somando crianças e adultos.'],
      ['Com quanto tempo de antecedência devo reservar?', 'As datas são limitadas, principalmente sábados. O ideal é consultar assim que tiver a data do aniversário.'],
    ],
  },
  'cha-de-bebe': {
    mais: [
      'Chá de bebê, chá de fraldas e chá revelação pedem um lugar tranquilo e bonito para as fotos. O salão tem iluminação de embutir e 10 jogos de mesas e cadeiras, e a entrada com o letreiro iluminado vira cenário para os registros com a família.',
      'Como a diária vai das 09h às 22h, dá para fazer o chá à tarde, com tempo de sobra para a montagem antes e para a desmontagem depois. O espaço fica em Abadia de Goiás, a 25 minutos do Buriti Shopping, pela GO-040.',
    ],
    faqs: [
      ['Vocês recebem chá revelação?', 'Sim. O salão recebe a decoração do momento da revelação e a entrada com letreiro é ótima para fotos.'],
      ['O espaço é confortável para a gestante e para os avós?', 'O salão tem climatizador de ar, mesas e cadeiras para todos e o quarto com cama de casal fica disponível para descanso.'],
      ['Como consulto uma data para o chá?', 'Pela página Reservar ou pelo WhatsApp. A mensagem já chega pronta com o tipo de evento e a data.'],
    ],
  },
  confraternizacoes: {
    mais: [
      'Para confraternização de amigos, da família ou da empresa, o espaço junta descontração e conversa: piscina com cascata, mesa de sinuca, bancada com banquetas altas, churrasqueira e fogão industrial. O Wi-Fi é liberado e há 2 TVs no salão.',
      'Com capacidade para até 60 pessoas e diária das 09h às 22h, dá para começar com o churrasco do almoço e seguir até a noite com a piscina iluminada. Fica em Abadia de Goiás, perto de Goiânia e de Aparecida de Goiânia.',
    ],
    faqs: [
      ['Serve para confraternização de empresa?', 'Sim. O espaço comporta até 60 pessoas, tem Wi-Fi liberado, TVs e churrasqueira. Combine os detalhes pelo WhatsApp.'],
      ['Pode levar som?', 'Som automotivo é proibido no espaço. Outras formas de som, consulte no WhatsApp.'],
      ['Quais formas de pagamento vocês aceitam?', 'Cartão de crédito, cartão de débito e pagamento por aproximação. A reserva é feita com 50% de sinal.'],
    ],
  },
  'outras-celebracoes': {
    faqs: [
      ['Meu evento não está na lista. Vocês recebem?', 'Provavelmente sim. Conte no WhatsApp o que você tem em mente e vemos juntos como o espaço se adapta.'],
      ['Qual o horário de uso do espaço?', 'A diária vai das 09h às 22h.'],
    ],
  },
  casamento: {
    mais: [
      'Para um casamento pequeno, uma recepção depois do civil ou um mini wedding, o Liderança oferece um espaço reservado só para os seus convidados, com capacidade para até 60 pessoas. O salão recebe as mesas e a decoração, e a piscina com cascata iluminada vira o cenário das fotos quando o dia termina.',
      'A diária das 09h às 22h permite receber a equipe de decoração cedo e fazer a cerimônia ou a recepção no fim da tarde, aproveitando a luz do entardecer e, depois, as luzes da piscina e o letreiro iluminado da entrada.',
      'O espaço tem churrasqueira, fogão industrial de 4 bocas, freezer horizontal e quarto com cama de casal, útil para os noivos se arrumarem e descansarem. Os detalhes de montagem, comida e decoração são combinados pelo WhatsApp no momento da reserva.',
      'O Liderança fica na Rua Fortaleza, no Residencial Goiânia Sul, em Abadia de Goiás, a 25 minutos do Buriti Shopping, pela GO-040. É uma opção perto de Goiânia e de Aparecida de Goiânia para quem quer um casamento íntimo, longe do barulho da cidade.',
    ],
    faqs: [
      ['Quantos convidados cabem num casamento?', 'Até 60 pessoas.'],
      ['Os noivos têm onde se arrumar?', 'Sim. O espaço tem um quarto com cama de casal e dois colchões de solteiro.'],
      ['Como saber o valor e reservar a data?', 'O valor depende da data e é passado pelo WhatsApp. A reserva é feita com 50% de sinal e as datas são limitadas.'],
    ],
  },
  'confraternizacao-fim-de-ano': {
    mais: [
      'Novembro e dezembro são os meses mais disputados para confraternização de fim de ano. O Liderança recebe grupos de até 60 pessoas para a festa da empresa, do time, da turma do trabalho ou da família, com o espaço reservado só para vocês.',
      'O roteiro que mais combina com o espaço é o do churrasco: a churrasqueira e o fogão industrial de 4 bocas dão conta do almoço, o freezer horizontal guarda as bebidas e, à tarde, a turma se divide entre a piscina com aquecimento solar, a mesa de sinuca e a bancada com banquetas altas.',
      'Para confraternização de empresa, o Wi-Fi liberado e as 2 TVs ajudam em uma fala rápida, uma homenagem ou um vídeo de fim de ano. A diária vai das 09h às 22h, então dá para começar cedo e terminar com a piscina iluminada.',
      'Como as datas de fim de ano acabam rápido, o ideal é consultar a disponibilidade o quanto antes. O espaço fica em Abadia de Goiás, a 25 minutos do Buriti Shopping, pela GO-040, perto de Goiânia e de Aparecida de Goiânia.',
    ],
    faqs: [
      ['Ainda tem data para confraternização em dezembro?', 'As datas são limitadas e sujeitas à disponibilidade. Consulte a sua data pelo WhatsApp ou pela página Reservar.'],
      ['Dá para fazer a confraternização da empresa em dia de semana?', 'Consulte a data desejada pelo WhatsApp. A diária é das 09h às 22h.'],
      ['Quais formas de pagamento vocês aceitam?', 'Cartão de crédito, cartão de débito e pagamento por aproximação. A reserva é feita com 50% de sinal.'],
    ],
  },
  'natal-e-reveillon': {
    mais: [
      'Para reunir a família no Natal ou comemorar o fim do ano com os amigos, o Liderança oferece um espaço inteiro para até 60 pessoas, com salão, piscina com cascata e aquecimento solar, churrasqueira e fogão industrial de 4 bocas.',
      'A diária do espaço vai das 09h às 22h. Para as datas de 24, 25 e 31 de dezembro, a disponibilidade e as condições são combinadas diretamente pelo WhatsApp: consulte a data antes de planejar a festa.',
      'No calor de dezembro, a piscina é o centro da comemoração durante o dia, e à noite as luzes da piscina e o letreiro iluminado da entrada deixam o espaço com clima de festa para as fotos da família.',
      'O espaço fica na Rua Fortaleza, no Residencial Goiânia Sul, em Abadia de Goiás, a 25 minutos do Buriti Shopping, pela GO-040. Como dezembro é o mês mais procurado, vale consultar com antecedência.',
    ],
    faqs: [
      ['O espaço funciona no dia 24, 25 e 31 de dezembro?', 'Consulte a data pelo WhatsApp. A disponibilidade e as condições dessas datas são combinadas diretamente com o espaço.'],
      ['Dá para virar o ano no espaço?', 'A diária padrão vai das 09h às 22h. Para a noite da virada, consulte as condições pelo WhatsApp.'],
      ['Quantas pessoas cabem na ceia?', 'Até 60 pessoas, com 10 jogos de mesas e cadeiras.'],
    ],
  },
};

/** eventos novos (entram na lista de eventos e ganham página em /eventos/<slug>/) */
export const eventosNovos = [
  {
    slug: 'casamento', nome: 'Casamento e mini wedding', img: 'piscina-noite-2', alt: 'Piscina com cascata iluminada no fim do dia, cenário para casamento',
    resumo: 'Casamento íntimo, recepção ou mini wedding para até 60 convidados, com a piscina iluminada como cenário.',
    titulo: 'Casamento íntimo e mini wedding perto de Goiânia',
    texto: ['Um espaço só para os seus convidados, com salão para a recepção e a piscina com cascata iluminada como cenário das fotos no fim do dia.'],
    usa: ['salao', 'piscina', 'entrada'],
    whatsMsg: 'Olá! Vim pelo site e quero consultar uma data para casamento / mini wedding.',
  },
  {
    slug: 'confraternizacao-fim-de-ano', nome: 'Confraternização de fim de ano', img: 'bancada', alt: 'Bancada com banquetas altas e mesa de sinuca para confraternização',
    resumo: 'Churrasco, piscina e sinuca para a festa de fim de ano da empresa, da turma ou da família.',
    titulo: 'Confraternização de fim de ano com churrasco e piscina',
    texto: ['Churrasqueira, fogão industrial, piscina com aquecimento solar e mesa de sinuca: o roteiro completo da confraternização de fim de ano em um espaço reservado só para o seu grupo.'],
    usa: ['piscina', 'sinuca-e-bancada', 'salao'],
    whatsMsg: 'Olá! Vim pelo site e quero consultar uma data para confraternização de fim de ano.',
  },
  {
    slug: 'natal-e-reveillon', nome: 'Natal e Réveillon', img: 'piscina-led-1', alt: 'Piscina iluminada ao entardecer para festa de fim de ano',
    resumo: 'Reúna a família ou os amigos no fim do ano. Consulte a disponibilidade de 24, 25 e 31/12.',
    titulo: 'Natal e fim de ano em família, com piscina',
    texto: ['Piscina, salão e churrasqueira para reunir a família no fim do ano. As datas de 24, 25 e 31 de dezembro são combinadas pelo WhatsApp: consulte a sua.'],
    usa: ['piscina', 'salao', 'entrada'],
    whatsMsg: 'Olá! Vim pelo site e quero consultar uma data para Natal / Réveillon.',
  },
];

export const roteirosNovos: Record<string, [string, string, string][]> = {
  casamento: [
    ['09h', 'Montagem', 'Equipe de decoração arrumando o salão e as mesas com calma.'],
    ['15h', 'Noivos se arrumam', 'O quarto com cama de casal fica à disposição.'],
    ['17h', 'Cerimônia ou recepção', 'Aproveitando a luz do fim da tarde.'],
    ['19h', 'Fotos', 'Piscina iluminada e letreiro da entrada como cenário.'],
    ['22h', 'Encerramento', 'Fim da diária.'],
  ],
  'confraternizacao-fim-de-ano': [
    ['09h', 'Chegada', 'Mesas organizadas e bebidas no freezer horizontal.'],
    ['11h', 'Churrasco', 'Churrasqueira e fogão industrial de 4 bocas para o almoço.'],
    ['14h', 'Piscina e sinuca', 'Piscina aquecida, mesa de sinuca e bancada para a conversa.'],
    ['18h', 'Homenagens', 'As TVs ajudam numa fala rápida ou num vídeo de fim de ano.'],
    ['22h', 'Encerramento', 'Fim da diária, com a piscina iluminada.'],
  ],
  'natal-e-reveillon': [
    ['09h', 'Montagem', 'Mesa da ceia e decoração de fim de ano no salão.'],
    ['12h', 'Almoço em família', 'Churrasqueira e fogão industrial para o cardápio.'],
    ['15h', 'Piscina', 'Água aquecida por energia solar no calor de dezembro.'],
    ['19h', 'Ceia e fotos', 'Piscina e letreiro iluminados para os registros.'],
    ['22h', 'Encerramento', 'Fim da diária padrão. Outras condições, só pelo WhatsApp.'],
  ],
};
