import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const CATEGORIES = [
  { slug: 'politica',      name: 'Política' },
  { slug: 'futebol',       name: 'Futebol' },
  { slug: 'policial',      name: 'Policial' },
  { slug: 'economia',      name: 'Economia' },
  { slug: 'tecnologia',    name: 'Tecnologia' },
  { slug: 'saude',         name: 'Saúde' },
  { slug: 'mundo',         name: 'Mundo' },
  { slug: 'clima',         name: 'Clima' },
  { slug: 'transito',      name: 'Trânsito' },
  { slug: 'alerta',        name: 'Alerta' },
  { slug: 'colunas',       name: 'Colunas' },
  { slug: 'famosos',       name: 'Famosos' },
  { slug: 'curiosidades',  name: 'Curiosidades' },
  { slug: 'automotors',    name: 'Funil Automotors' },
];

const EVENTS = [
  {
    slug: 'festival-amazonas-2026',
    title: 'Festival Amazonas de Ópera 2026',
    description: 'A 30ª edição do maior festival de ópera da América Latina acontece no coração de Manaus, com apresentações no histórico Teatro Amazonas e espetáculos gratuitos no Largo de São Sebastião.',
    category: 'festival',
    startDate: new Date('2026-07-15'),
    endDate: new Date('2026-07-30'),
    time: '20:00',
    venue: 'Teatro Amazonas',
    neighborhood: 'Centro',
    price: 'R$ 80 – R$ 300',
    isFree: false,
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=2069',
    ageRating: 'Livre',
    organizer: 'Governo do Amazonas / Secretaria de Cultura',
    isHighlighted: true,
    isSponsored: false,
    tags: ['opera', 'cultura', 'teatro-amazonas', 'classica'],
  },
  {
    slug: 'feira-artesanato-zona-franca',
    title: 'Feira de Artesanato da Zona Franca',
    description: 'A maior feira de produtos regionais e artesanato do Amazonas reúne mais de 200 expositores com produtos típicos, gastronomia regional e apresentações folclóricas.',
    category: 'feira',
    startDate: new Date('2026-06-20'),
    endDate: new Date('2026-06-22'),
    time: '09:00',
    venue: 'Centro de Convenções Vasco Vasquez',
    neighborhood: 'Centro',
    isFree: true,
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2070',
    organizer: 'SEPROR / Prefeitura de Manaus',
    isHighlighted: false,
    isSponsored: false,
    tags: ['artesanato', 'regional', 'cultura'],
  },
  {
    slug: 'show-boi-bumba-garantido',
    title: 'Apresentação Especial Boi-Bumbá Garantido',
    description: 'O bicampeão Boi-Bumbá Garantido apresenta espetáculo especial com os melhores momentos do festival, num evento aberto ao público no Centro de Convenções.',
    category: 'show',
    startDate: new Date('2026-06-28'),
    time: '19:00',
    venue: 'Arena da Amazônia',
    neighborhood: 'Flores',
    isFree: true,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2074',
    organizer: 'Associação Folclórica Boi-Bumbá Garantido',
    isHighlighted: false,
    isSponsored: false,
    tags: ['boi-bumba', 'folclore', 'parintins', 'cultura'],
  },
];

async function main() {
  console.log('🌱 Iniciando seed...');

  // 1. Categories
  console.log('  → Criando categorias...');
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name },
      create: cat,
    });
  }
  console.log(`  ✓ ${CATEGORIES.length} categorias criadas`);

  // 2. Users
  console.log('  → Criando usuários...');
  const passwordHash = await bcrypt.hash('Admin@2026', 12);
  const editorHash = await bcrypt.hash('Editor@2026', 12);
  const journalistHash = await bcrypt.hash('Jornalista@2026', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@funildenoticias.com.br' },
    update: {},
    create: { name: 'Admin Portal Funil', email: 'admin@funildenoticias.com.br', passwordHash, role: 'ADMIN' },
  });

  await prisma.user.upsert({
    where: { email: 'editor@funildenoticias.com.br' },
    update: {},
    create: { name: 'Maria Editora', email: 'editor@funildenoticias.com.br', passwordHash: editorHash, role: 'EDITOR' },
  });

  await prisma.user.upsert({
    where: { email: 'jornalista@funildenoticias.com.br' },
    update: {},
    create: { name: 'João Jornalista', email: 'jornalista@funildenoticias.com.br', passwordHash: journalistHash, role: 'JOURNALIST' },
  });

  console.log('  ✓ 3 usuários criados (admin, editor, jornalista)');

  // 3. Sample articles
  console.log('  → Criando artigos de exemplo...');
  const alertaCategory = await prisma.category.findUnique({ where: { slug: 'alerta' } });
  const politicaCategory = await prisma.category.findUnique({ where: { slug: 'politica' } });
  const transitoCategory = await prisma.category.findUnique({ where: { slug: 'transito' } });

  const sampleArticles = [
    {
      slug: 'chuvas-intensas-manaus-estado-atencao',
      title: 'Chuvas intensas colocam Manaus em estado de atenção',
      description: 'Defesa Civil monitora regiões críticas enquanto trânsito registra lentidão nas principais avenidas da capital.',
      content: `A Defesa Civil de Manaus emitiu um alerta máximo nesta segunda-feira após chuvas intensas atingirem a capital amazonense.

O sistema meteorológico que atinge Manaus é resultante de um canal de umidade que se formou sobre a Amazônia nos últimos dias. As chuvas devem persistir até o final da semana, com acumulados que podem chegar a 150 milímetros em 24 horas.

As equipes da Defesa Civil e do Corpo de Bombeiros estão em estado de prontidão, com 12 equipes distribuídas pelos principais pontos críticos da cidade.

Para emergências, o número de atendimento da Defesa Civil é o 199, disponível 24 horas por dia.`,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-06-07T10:30:00Z'),
      readTime: 4,
      views: 1240,
      isLive: true,
      isFeatured: true,
      authorId: admin.id,
      categoryId: alertaCategory!.id,
    },
    {
      slug: 'zona-franca-manaus-recorde-investimentos',
      title: 'Zona Franca de Manaus bate recorde com R$ 2,1 bi em investimentos',
      description: 'Polo industrial registra o melhor primeiro trimestre em toda sua história, impulsionado por empresas de tecnologia e eletroeletrônicos.',
      content: `A Zona Franca de Manaus (ZFM) registrou no primeiro trimestre de 2026 o maior volume de investimentos de sua história, atingindo R$ 2,1 bilhões.

Segundo dados da Superintendência da Zona Franca de Manaus (Suframa), o crescimento foi de 34% em relação ao mesmo período de 2025.

O setor de tecnologia e eletroeletrônicos liderou os investimentos, com a instalação de três novas plantas fabris e a ampliação de outras quatro unidades já existentes.

O presidente da Suframa afirmou que os números demonstram a solidez do modelo Zona Franca e sua importância para o desenvolvimento sustentável da Amazônia.`,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-06-07T08:15:00Z'),
      readTime: 5,
      views: 892,
      isFeatured: true,
      authorId: admin.id,
      categoryId: politicaCategory!.id,
    },
    {
      slug: 'transito-lento-avenida-djalma-batista',
      title: 'Trânsito lento na Avenida Djalma Batista após acidente',
      description: 'Colisão entre dois veículos causa congestionamento de 4 km na principal via da Zona Norte.',
      content: `Um acidente entre dois veículos na Avenida Djalma Batista causa lentidão de aproximadamente 4 quilômetros nesta segunda-feira.

O acidente ocorreu por volta das 7h30, próximo ao Shopping Manaus ViaNorte. O IMMU registrou o incidente e enviou agentes de trânsito para o local.

Motoristas que trafegam pela região devem preferir vias alternativas como a Avenida Constantino Nery ou a Avenida Torquato Tapajós.

A lentidão afeta principalmente o sentido Centro-Zona Norte.`,
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-06-07T07:45:00Z'),
      readTime: 3,
      views: 645,
      isLive: true,
      authorId: admin.id,
      categoryId: transitoCategory!.id,
    },
  ];

  for (const article of sampleArticles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: article,
    });
  }
  console.log(`  ✓ ${sampleArticles.length} artigos criados`);

  // 3b. Artigos editoriais
  console.log('  → Criando artigos editoriais...');
  const mundoCategory    = await prisma.category.findUnique({ where: { slug: 'mundo' } });
  const futebolCategory  = await prisma.category.findUnique({ where: { slug: 'futebol' } });
  const policialCategory = await prisma.category.findUnique({ where: { slug: 'policial' } });
  const economiaCategory = await prisma.category.findUnique({ where: { slug: 'economia' } });
  const tecnologiaCategory = await prisma.category.findUnique({ where: { slug: 'tecnologia' } });
  const saudeCategory    = await prisma.category.findUnique({ where: { slug: 'saude' } });
  const automotorsCategory = await prisma.category.findUnique({ where: { slug: 'automotors' } });

  const editorialArticles = [
    {
      slug: 'colombia-vai-a-juri-popular-por-mandar-matar-bruno-pereira-e-dom-phillips-no-amazonas',
      title: '"Colômbia" vai a júri popular por mandar matar Bruno Pereira e Dom Phillips no Amazonas',
      description: 'A Justiça Federal pronunciou Rubens Villar Coelho, o "Colômbia", para ser julgado como mandante dos homicídios do indigenista Bruno Pereira e do jornalista Dom Phillips, mortos no Vale do Javari em 2022.',
      content: `A Justiça Federal pronunciou Rubens Villar Coelho, conhecido como "Colômbia", para ser julgado pelo Tribunal do Júri como mandante dos homicídios do indigenista Bruno Pereira e do jornalista britânico Dom Phillips.

Os dois foram mortos em junho de 2022, no Vale do Javari, na Amazônia. O crime chocou o Brasil e repercutiu internacionalmente, gerando comoção entre defensores dos direitos humanos e da imprensa livre.

A decisão da juíza federal foi publicada após análise detalhada das provas reunidas pela Polícia Federal ao longo de mais de dois anos de investigação.

"Colômbia" é considerado o líder de uma rede de pesca ilegal que atuava na região e que teria encomendado os assassinatos para conter as denúncias de atividades criminosas no Vale do Javari.`,
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-06-08T09:00:00Z'),
      readTime: 4,
      views: 3241,
      isFeatured: true,
      authorId: admin.id,
      categoryId: policialCategory!.id,
    },
    {
      slug: 'amazonas-suspende-vacina-da-dengue-do-butantan-apos-identificacao-de-reacoes-graves',
      title: 'Amazonas suspende vacina da dengue do Butantan após identificação de reações graves',
      description: 'O estado interrompeu a vacinação com o imunizante do Butantan seguindo orientação do Ministério da Saúde após 42 reações severas notificadas em todo o Brasil.',
      content: `O Amazonas suspendeu a aplicação da vacina contra a dengue desenvolvida pelo Instituto Butantan, seguindo determinação do Ministério da Saúde publicada nesta semana.

A medida ocorre após 42 notificações de reações graves em todo o país, incluindo dois óbitos que ainda estão sendo investigados para determinar se há relação de causalidade com o imunizante.

A Secretaria Estadual de Saúde do Amazonas informou que todos os lotes do imunizante foram recolhidos das unidades básicas de saúde da capital e do interior.

O Butantan emitiu nota afirmando que os dados de segurança da vacina continuam dentro dos parâmetros esperados e que colabora plenamente com as investigações em andamento.`,
      image: 'https://images.unsplash.com/photo-1605289982774-9a6fef564df8?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-06-08T08:30:00Z'),
      readTime: 3,
      views: 2180,
      authorId: admin.id,
      categoryId: saudeCategory!.id,
    },
    {
      slug: 'sistema-paredao-da-ssp-am-prende-quatro-foragidos-com-reconhecimento-facial-em-manaus',
      title: 'Sistema "Paredão" da SSP-AM prende quatro foragidos com reconhecimento facial em Manaus',
      description: 'A tecnologia de reconhecimento facial acumula 204 foragidos capturados em 2026. Em uma única operação, quatro suspeitos com mandados em aberto foram detidos em diferentes bairros.',
      content: `O sistema de reconhecimento facial "Paredão", implantado pela Secretaria de Segurança Pública do Amazonas (SSP-AM), prendeu quatro foragidos da Justiça em uma única operação realizada nesta semana em Manaus.

Os suspeitos, todos com mandados de prisão em aberto, foram identificados em diferentes bairros da capital por câmeras integradas ao sistema de monitoramento inteligente.

Com as novas capturas, o "Paredão" acumula 204 foragidos presos em 2026, uma média de mais de 30 prisões por mês desde o início do ano.

A SSP-AM informou que o sistema conta hoje com mais de 1.200 câmeras distribuídas por pontos estratégicos de Manaus e segue em expansão com a previsão de novos equipamentos para o segundo semestre.`,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-06-08T10:00:00Z'),
      readTime: 3,
      views: 1850,
      authorId: admin.id,
      categoryId: tecnologiaCategory!.id,
    },
    {
      slug: 'camara-municipal-de-manaus-aprova-em-primeira-discussao-a-ldo-para-2027',
      title: 'Câmara Municipal de Manaus aprova em primeira discussão a LDO para 2027',
      description: 'O plenário aprovou em primeira votação a Lei de Diretrizes Orçamentárias do município para 2027, que estabelece metas e prioridades para o orçamento anual.',
      content: `O plenário da Câmara Municipal de Manaus aprovou em primeira discussão o projeto de lei da Lei de Diretrizes Orçamentárias (LDO) para o exercício financeiro de 2027.

A votação, realizada em sessão ordinária, registrou 26 votos favoráveis e 5 contrários. O texto deverá passar por uma segunda votação antes de seguir para sanção do prefeito.

A LDO 2027 estabelece as metas fiscais, as prioridades do governo municipal e as diretrizes que orientarão a elaboração da Lei Orçamentária Anual (LOA).

Entre as prioridades definidas no texto estão investimentos em mobilidade urbana, saneamento básico e habitação, áreas consideradas críticas pela administração municipal.`,
      image: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-06-08T11:00:00Z'),
      readTime: 3,
      views: 720,
      authorId: admin.id,
      categoryId: politicaCategory!.id,
    },
    {
      slug: 'neymar-fora-da-estreia-do-brasil-contra-o-marrocos-na-copa-do-mundo-2026',
      title: 'Neymar fora da estreia do Brasil contra o Marrocos na Copa do Mundo 2026',
      description: 'O atacante sofreu lesão grau 2 na panturrilha e está descartado para o primeiro jogo da Seleção no Mundial. Ancelotti espera contar com ele a partir do segundo jogo.',
      content: `O atacante Neymar Jr. não participará da estreia da Seleção Brasileira na Copa do Mundo 2026, marcada para o dia 13 de junho contra o Marrocos, em Los Angeles.

O jogador sofreu uma lesão muscular grau 2 na panturrilha esquerda durante o último treino antes da viagem e foi submetido a exames de imagem que confirmaram o problema.

O técnico Carlo Ancelotti lamentou a ausência do camisa 10, mas demonstrou otimismo para os jogos seguintes. "Esperamos que ele esteja recuperado para o segundo jogo, contra o Haiti, em 19 de junho", afirmou o treinador.

A comissão médica da CBF vai reavaliar o atleta diariamente. Vini Jr. e Rodrygo devem ser escalados no ataque titular na estreia.`,
      image: '/noticias/neymar-fora-da-estreia.jpeg',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-06-08T07:00:00Z'),
      readTime: 4,
      views: 8920,
      isFeatured: true,
      authorId: admin.id,
      categoryId: futebolCategory!.id,
    },
    {
      slug: 'balanca-comercial-do-brasil-registra-superavit-de-us-3247-bilhoes-na-primeira-semana-de-junho',
      title: 'Balança comercial do Brasil registra superávit de US$ 3,247 bilhões na primeira semana de junho',
      description: 'As exportações cresceram 37,6% em relação ao mesmo período de 2025, puxadas pelos setores agropecuário, extrativo e industrial.',
      content: `A balança comercial brasileira registrou superávit de US$ 3,247 bilhões na primeira semana de junho, informou o Ministério do Desenvolvimento, Indústria, Comércio e Serviços (MDIC).

As exportações totalizaram US$ 8,1 bilhões, alta de 37,6% em comparação com a mesma semana de 2025. As importações somaram US$ 4,85 bilhões, crescimento de 18,2% no mesmo período.

Os setores agropecuário, extrativo mineral e manufaturado lideraram as exportações. Soja, petróleo bruto e produtos semimanufaturados de ferro e aço figuraram entre os principais produtos.

No acumulado de 2026, o superávit comercial já supera US$ 35,9 bilhões, colocando o Brasil no caminho de bater novamente o recorde histórico da balança.`,
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-06-08T12:00:00Z'),
      readTime: 3,
      views: 1120,
      authorId: admin.id,
      categoryId: economiaCategory!.id,
    },
    {
      slug: 'nunes-marques-suspende-pesquisa-eleitoral-do-tse-flavio-bolsonaro-celebra-decisao',
      title: 'Nunes Marques suspende pesquisa eleitoral do TSE; Flávio Bolsonaro celebra decisão',
      description: 'Ministro do STF acatou pedido do Congresso e cancelou levantamento que seria divulgado antes das eleições de 2026. Senador reeleito comemorou a medida nas redes sociais.',
      content: `O ministro do Supremo Tribunal Federal (STF) Alexandre de Moraes Nunes Marques suspendeu a divulgação da pesquisa eleitoral encomendada pelo Tribunal Superior Eleitoral (TSE), que estava prevista para ser publicada ainda neste semestre.

A decisão atendeu a pedido formulado por líderes do Congresso Nacional que questionavam a legalidade do levantamento realizado com recursos públicos em período pré-eleitoral.

O senador Flávio Bolsonaro (PL-RJ) foi ao X (ex-Twitter) comemorar a suspensão. "Vitória da democracia. O TSE não pode usar dinheiro do povo para fazer pesquisa que favorece candidatos do establishment", escreveu.

O TSE ainda não se manifestou oficialmente sobre a decisão e tem prazo para apresentar recurso ao plenário do STF.`,
      image: '/noticias/nunescancelapesquisa.jpeg',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-06-08T13:00:00Z'),
      readTime: 3,
      views: 4560,
      isFeatured: true,
      authorId: admin.id,
      categoryId: politicaCategory!.id,
    },
    {
      slug: 'dia-dos-namorados-deve-movimentar-r-284-bilhoes-no-varejo-brasileiro',
      title: 'Dia dos Namorados deve movimentar R$ 2,84 bilhões no varejo brasileiro',
      description: 'A CNC projeta crescimento de 2,5% nas vendas em relação a 2025, impulsionado pela recuperação do consumo das famílias e pela isenção do IR para rendas até R$ 5 mil.',
      content: `O Dia dos Namorados, celebrado no dia 12 de junho, deve movimentar R$ 2,84 bilhões no varejo brasileiro em 2026, segundo projeção da Confederação Nacional do Comércio de Bens, Serviços e Turismo (CNC).

O número representa crescimento de 2,5% em relação ao mesmo período do ano passado e é o maior da última meia década para a data comemorativa.

Perfumaria, joias e eletrônicos lideram as intenções de compra, seguidos por roupas, calçados e jantar em restaurantes.

A melhora no poder de compra das famílias, impulsionada pelo início da isenção do Imposto de Renda para rendimentos de até R$ 5 mil mensais, é apontada como um dos principais fatores do otimismo do setor.`,
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-06-08T06:00:00Z'),
      readTime: 3,
      views: 1890,
      authorId: admin.id,
      categoryId: economiaCategory!.id,
    },
    {
      slug: 'papa-leao-xiv-reune-70-mil-pessoas-em-estadio-de-madri-e-discursa-no-parlamento-espanhol',
      title: 'Papa Leão XIV reúne 70 mil pessoas em estádio de Madri e discursa no Parlamento espanhol',
      description: 'Em viagem apostólica à Espanha, o pontífice tornou-se o primeiro papa a discursar no Parlamento espanhol. Mais de 1,2 milhão de fiéis participaram de missa na Praça de Cibeles.',
      content: `O Papa Leão XIV encerrou sua visita apostólica à Espanha com uma missa histórica na Praça de Cibeles, em Madri, reunindo mais de 1,2 milhão de fiéis de toda a Europa.

Na véspera, o pontífice discursou no Congresso dos Deputados espanhol, tornando-se o primeiro papa da história a se dirigir ao Parlamento daquele país. O discurso abordou temas como a crise migratória, o diálogo inter-religioso e a necessidade de paz no Oriente Médio.

Num estádio transformado em palco para a celebração, 70 mil pessoas acompanharam a missa em clima de intensa emoção. Líderes de governo de mais de 15 países estiveram presentes.

A visita, de quatro dias, também incluiu um encontro com o Rei Felipe VI e reuniões com representantes de comunidades cristãs e muçulmanas da Espanha.`,
      image: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-06-08T08:00:00Z'),
      readTime: 4,
      views: 2340,
      authorId: admin.id,
      categoryId: mundoCategory!.id,
    },
    {
      slug: 'ira-promete-manter-controle-do-estreito-de-ormuz-apesar-das-novas-sancoes-da-uniao-europeia',
      title: 'Irã promete manter controle do Estreito de Ormuz apesar das novas sanções da União Europeia',
      description: 'Teerã reagiu à mais recente rodada de sanções europeias reafirmando sua soberania sobre o Estreito, por onde transita cerca de 20% do petróleo mundial.',
      content: `O governo iraniano reafirmou seu controle sobre o Estreito de Ormuz após a União Europeia anunciar uma nova rodada de sanções econômicas contra Teerã, ligadas ao programa nuclear do país.

O ministro das Relações Exteriores do Irã declarou que "qualquer ameaça à soberania iraniana terá consequências proporcionais", numa referência direta às rotas marítimas estratégicas que passam pelo Estreito.

O Estreito de Ormuz é responsável pelo trânsito de aproximadamente 20% de todo o petróleo consumido no mundo, tornando-o um ponto geopolítico crítico.

As negociações nucleares entre Teerã e Washington permanecem em impasse, sem perspectiva de acordo à vista. A comunidade internacional teme um possível fechamento do Estreito, que causaria uma crise energética global.`,
      image: '/noticias/estreitohormuz.jpeg',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-06-08T14:00:00Z'),
      readTime: 4,
      views: 1670,
      authorId: admin.id,
      categoryId: mundoCategory!.id,
    },
    {
      slug: 'eleicao-presidencial-no-peru-roberto-sanchez-lidera-com-margem-minima-sobre-keiko-fujimori',
      title: 'Eleição presidencial no Peru: Roberto Sánchez lidera com margem mínima sobre Keiko Fujimori',
      description: 'Com 94% das urnas apuradas, o candidato de esquerda tem 50,1% dos votos contra 49,9% da adversária. Resultado definitivo ainda não foi proclamado.',
      content: `A apuração da eleição presidencial no Peru aponta vitória apertadíssima do candidato de esquerda Roberto Sánchez sobre Keiko Fujimori, com 94% das urnas contabilizadas pelo Jurado Nacional de Elecciones (JNE).

Sánchez tem 50,1% dos votos válidos contra 49,9% de Keiko. A diferença de apenas 0,2 ponto percentual equivale a cerca de 35 mil votos num universo de 18 milhões de eleitores.

Os votos ainda não apurados incluem regiões rurais do interior do país, historicamente favoráveis à esquerda, e os consulados no exterior, o que pode ampliar a vantagem de Sánchez.

Keiko Fujimori, que já contestou resultados eleitorais anteriores, avisou que aguardará a conclusão da apuração antes de se pronunciar.`,
      image: '/noticias/eleicaonoperu.jpeg',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-06-08T15:00:00Z'),
      readTime: 4,
      views: 2890,
      authorId: admin.id,
      categoryId: mundoCategory!.id,
    },
    {
      slug: 'ataques-russos-intensificados-na-ucrania-deixam-ao-menos-23-mortos-em-kiev-dnipro-e-kharkiv',
      title: 'Ataques russos intensificados na Ucrânia deixam ao menos 23 mortos em Kiev, Dnipro e Kharkiv',
      description: 'Uma nova onda de mísseis e drones atingiu cidades ucranianas em uma das piores semanas do conflito em 2026. Zelensky pediu urgência no fornecimento de defesa aérea.',
      content: `Uma série de ataques com mísseis balísticos e drones kamikaze atingiu Kiev, Dnipro e Kharkiv na madrugada desta segunda-feira, deixando ao menos 23 mortos e dezenas de feridos, segundo o governo ucraniano.

Os bombardeios se concentraram em infraestrutura energética, com subestações e usinas termelétricas como alvos principais. A capital Kiev ficou sem eletricidade por mais de seis horas.

O presidente Volodymyr Zelensky convocou uma reunião de emergência do Conselho Nacional de Segurança e reiterou o apelo aos aliados ocidentais para o envio urgente de sistemas de defesa antiaérea de longo alcance.

A ONU condenou os ataques e classificou a semana como uma das mais violentas desde o início da invasão em fevereiro de 2022.`,
      image: '/noticias/ataque-russo-em-kiev.jpeg',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-06-08T16:00:00Z'),
      readTime: 4,
      views: 3780,
      isFeatured: true,
      authorId: admin.id,
      categoryId: mundoCategory!.id,
    },
    {
      slug: 'espanha-goleia-em-amistoso-e-chega-a-copa-2026-como-uma-das-favoritas-ao-titulo',
      title: 'Espanha goleia em amistoso e chega à Copa 2026 como uma das favoritas ao título',
      description: 'La Roja venceu por 3 a 1 e fecha preparação em alta. Yamal e Williams foram os destaques. Seleção chega ao Mundial como atual campeã europeia.',
      content: `A seleção espanhola encerrou sua preparação para a Copa do Mundo 2026 com uma goleada de 3 a 1 sobre a Bélgica em amistoso disputado no Estádio Santiago Bernabéu, em Madri.

Lamine Yamal, 19 anos, foi o grande nome da partida com dois gols e uma assistência. Nico Williams completou o placar espanhol. A Bélgica descontou com Doku no segundo tempo.

A Espanha chega à Copa do Mundo como atual campeã da Eurocopa e uma das favoritas ao título. Com um elenco jovem e em plena ascensão, "La Roja" é apontada por analistas como a grande ameaça para o Brasil e a França nas fases eliminatórias.

O técnico Luis de la Fuente elogiou a postura do grupo. "Estamos prontos para conquistar o mundo", declarou.`,
      image: '/noticias/espanhavence.jpeg',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-06-08T17:00:00Z'),
      readTime: 4,
      views: 5120,
      isFeatured: true,
      authorId: admin.id,
      categoryId: futebolCategory!.id,
    },
    {
      slug: 'trump-e-vaiado-na-final-da-nba-e-video-viraliza-com-milhoes-de-visualizacoes',
      title: 'Trump é vaiado na final da NBA e vídeo viraliza com milhões de visualizações',
      description: 'Presidente dos EUA foi recebido com vaias da plateia durante jogo decisivo da final da NBA. Imagens circularam rapidamente nas redes sociais e geraram debate nos EUA.',
      content: `O presidente dos Estados Unidos, Donald Trump, foi recebido com fortes vaias ao ser anunciado durante o jogo 7 da final da NBA, realizado no Chase Center, em San Francisco, entre Golden State Warriors e Boston Celtics.

O vídeo da reação da plateia viralizou rapidamente nas redes sociais e acumulou mais de 30 milhões de visualizações em menos de 24 horas, tornando-se um dos assuntos mais comentados do dia nos EUA e no mundo.

A aparição de Trump no jogo foi amplamente criticada por grupos progressistas e celebrada por apoiadores do presidente. Comentaristas políticos americanos debatem se o episódio terá reflexos na aprovação do presidente.

Golden State Warriors venceu o jogo 7 por 112 a 108 e conquistou o título da NBA, o quinto da franquia.`,
      image: '/noticias/trump.jpeg',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-06-08T18:00:00Z'),
      readTime: 3,
      views: 9840,
      isFeatured: true,
      authorId: admin.id,
      categoryId: mundoCategory!.id,
    },
  ];

  for (const article of editorialArticles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: article,
    });
  }
  console.log(`  ✓ ${editorialArticles.length} artigos editoriais criados`);

  // 3c. Artigos Funil Automotors
  console.log('  → Criando artigos do Funil Automotors...');
  const automotorsArticles = [
    {
      slug: 'venda-de-veiculos-novos-no-brasil-cresce-12-em-maio-de-2026-aponta-fenabrave',
      title: 'Venda de veículos novos no Brasil cresce 12% em maio de 2026, aponta Fenabrave',
      description: 'O resultado é o melhor para o mês desde 2019, impulsionado pela queda nos juros do financiamento e pelo lançamento de novos modelos populares.',
      content: `O mercado automotivo brasileiro emplacou 215,4 mil veículos novos em maio de 2026, alta de 12% em relação ao mesmo mês do ano anterior, segundo dados da Federação Nacional da Distribuição de Veículos Automotores (Fenabrave).

O resultado é o melhor para o mês de maio desde 2019, antes da pandemia, e consolida a recuperação do setor ao longo do primeiro semestre. Os SUVs compactos continuam como a categoria mais procurada, respondendo por quase um terço das vendas.

Entre os fatores que impulsionaram o desempenho, especialistas destacam a redução gradual da taxa de financiamento de veículos e o lançamento de novos modelos com motorização flex-híbrida, que ampliaram as opções para o consumidor.

Em Manaus, as concessionárias da capital registraram alta de 9% nas vendas no período, segundo o Sindicato dos Distribuidores de Veículos do Amazonas, com destaque para picapes e SUVs compactos.`,
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-06-09T08:00:00Z'),
      readTime: 3,
      views: 980,
      isFeatured: true,
      authorId: admin.id,
      categoryId: automotorsCategory!.id,
    },
    {
      slug: 'nova-fiat-pulse-2027-chega-ao-brasil-com-versao-hibrida-e-pacote-de-seguranca-ampliado',
      title: 'Nova Fiat Pulse 2027 chega ao Brasil com versão híbrida e pacote de segurança ampliado',
      description: 'O SUV compacto da Fiat ganha motorização híbrida flex inédita na categoria e passa a oferecer frenagem autônoma de série em todas as versões.',
      content: `A Fiat apresentou a nova geração do Pulse para o mercado brasileiro, trazendo pela primeira vez uma versão híbrida flex no segmento de SUVs compactos nacionais.

O novo sistema combina um motor 1.0 turbo flex com um motor elétrico, prometendo redução de até 18% no consumo de combustível em ciclo urbano sem perda de desempenho. A montadora também ampliou os itens de série, com frenagem autônoma de emergência disponível em toda a linha.

O design recebeu retoques na frente e nas lanternas traseiras, além de um novo painel digital de 10,2 polegadas com integração sem fio para Apple CarPlay e Android Auto.

A Fiat informou que a Pulse híbrida chega às concessionárias brasileiras no segundo semestre de 2026, com preços a partir de R$ 119.990.`,
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-06-10T09:30:00Z'),
      readTime: 3,
      views: 1340,
      authorId: admin.id,
      categoryId: automotorsCategory!.id,
    },
    {
      slug: 'sete-cuidados-essenciais-para-proteger-o-carro-na-temporada-de-chuvas-em-manaus',
      title: '7 cuidados essenciais para proteger o carro na temporada de chuvas em Manaus',
      description: 'Mecânicos da capital alertam para revisão de pneus, freios e sistema elétrico antes do período mais chuvoso do ano na região amazônica.',
      content: `Com a intensificação das chuvas em Manaus, oficinas mecânicas da capital relatam aumento na procura por revisões preventivas. Especialistas listam os cuidados essenciais para evitar problemas e acidentes nas ruas alagadas da cidade.

O primeiro ponto de atenção é o estado dos pneus: sulcos rasos reduzem drasticamente a aderência em pista molhada e aumentam o risco de aquaplanagem. A recomendação é trocar os pneus quando a profundidade dos sulcos chegar a 1,6 mm.

Os freios também merecem atenção redobrada — pastilhas desgastadas aumentam a distância de frenagem em piso úmido. Outro ponto crítico é o sistema elétrico: para-brisas embaçados e faróis com baixa luminosidade comprometem a visibilidade durante temporais.

Por fim, mecânicos recomendam verificar a vedação das portas e do porta-malas, evitar atravessar áreas alagadas com a água acima do meio da roda, e manter o nível do óleo e do fluido de freio sempre dentro do recomendado pelo fabricante.`,
      image: 'https://images.unsplash.com/photo-1551522435-a13afa10f103?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-06-11T10:00:00Z'),
      readTime: 4,
      views: 760,
      authorId: admin.id,
      categoryId: automotorsCategory!.id,
    },
    {
      slug: 'vendas-de-carros-eletrificados-no-brasil-batem-recorde-e-superam-15-do-mercado-total',
      title: 'Vendas de carros eletrificados no Brasil batem recorde e superam 15% do mercado total',
      description: 'BYD, GWM e Volvo lideram a expansão dos elétricos e híbridos no país, impulsionada pela ampliação da rede de eletropostos e incentivos fiscais.',
      content: `As vendas de veículos elétricos e híbridos no Brasil atingiram 15,3% do total de carros novos comercializados em 2026, segundo a Associação Brasileira do Veículo Elétrico (ABVE), um recorde histórico para o país.

A BYD lidera o segmento com cerca de 40% de participação, seguida por GWM e Volvo. O crescimento é atribuído à ampliação da rede pública e privada de eletropostos, que já passa de 12 mil pontos de recarga em todo o território nacional.

Incentivos fiscais estaduais e a redução de impostos de importação para elétricos também contribuíram para tornar os modelos mais competitivos frente aos veículos a combustão equivalentes.

No Amazonas, a infraestrutura de recarga ainda é incipiente, com pouco mais de 20 eletropostos instalados, concentrados majoritariamente em Manaus — um dos principais desafios apontados por especialistas para a popularização da tecnologia na região Norte.`,
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-06-12T11:00:00Z'),
      readTime: 4,
      views: 1120,
      authorId: admin.id,
      categoryId: automotorsCategory!.id,
    },
    {
      slug: 'honda-amplia-producao-em-manaus-e-lanca-nova-cg-160-2027-com-painel-digital',
      title: 'Honda amplia produção em Manaus e lança nova CG 160 2027 com painel digital',
      description: 'A moto mais vendida do Brasil ganha painel totalmente digital, novo desenho de farol e injeção eletrônica revisada para maior economia de combustível.',
      content: `A Honda anunciou a nova geração da CG 160, a motocicleta mais vendida do Brasil há mais de uma década, com produção concentrada na fábrica da montadora no Distrito Industrial de Manaus.

A atualização traz painel de instrumentos totalmente digital, novo desenho de farol em LED e revisão na injeção eletrônica, que passa a entregar redução de 6% no consumo de combustível em ciclo combinado.

Para acompanhar o lançamento, a Honda confirmou ampliação da linha de produção em Manaus, com investimento adicional na planta que já emprega mais de 6 mil trabalhadores diretos no Polo Industrial de Duas Rodas.

A nova CG 160 chega às concessionárias em julho de 2026, com preço sugerido a partir de R$ 14.490 na versão de entrada.`,
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-06-13T08:30:00Z'),
      readTime: 3,
      views: 1540,
      authorId: admin.id,
      categoryId: automotorsCategory!.id,
    },
    {
      slug: 'volvo-apresenta-novo-caminhao-eletrico-para-o-mercado-brasileiro-de-cargas',
      title: 'Volvo apresenta novo caminhão elétrico para o mercado brasileiro de cargas',
      description: 'Modelo promete autonomia de até 300 km por carga e chega ao país em 2027, mirando frotas de logística urbana e distribuição de curta distância.',
      content: `A Volvo Trucks apresentou ao mercado brasileiro seu novo caminhão 100% elétrico voltado para operações de logística urbana e distribuição de curta e média distância.

Segundo a montadora, o modelo tem autonomia de até 300 km por carga completa e suporta recarga rápida em cerca de 90 minutos. A capacidade de carga útil é equivalente à dos modelos a diesel da mesma categoria, sem perda de eficiência operacional.

A chegada ao Brasil está prevista para o início de 2027, com foco inicial em frotas de empresas de e-commerce e distribuidoras de bebidas e alimentos nos grandes centros urbanos.

A Volvo também anunciou parceria com fabricantes de eletropostos para instalar pontos de recarga rápida em centros de distribuição de clientes-piloto nas regiões Sudeste e Sul.`,
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-06-14T09:00:00Z'),
      readTime: 3,
      views: 690,
      authorId: admin.id,
      categoryId: automotorsCategory!.id,
    },
    {
      slug: 'volkswagen-convoca-recall-de-mais-de-40-mil-unidades-do-novo-polo-por-falha-no-airbag',
      title: 'Volkswagen convoca recall de mais de 40 mil unidades do Novo Polo por falha no airbag',
      description: 'A montadora identificou defeito no módulo do airbag do motorista que pode impedir o acionamento correto em caso de colisão. Reparo é gratuito.',
      content: `A Volkswagen do Brasil convocou recall de 41.280 unidades do Novo Polo, fabricadas entre janeiro de 2025 e março de 2026, após identificar um defeito no módulo do airbag do motorista.

Segundo a montadora, em condições específicas o componente pode não acionar corretamente em caso de colisão frontal, comprometendo a proteção do condutor. Nenhum acidente relacionado à falha foi registrado até o momento.

Os proprietários dos veículos afetados serão notificados por carta e podem verificar se o chassi está na lista de recall no site oficial da Volkswagen ou em qualquer concessionária autorizada da marca.

O reparo, que consiste na substituição do módulo do airbag, é gratuito e tem duração estimada de uma hora. A Volkswagen recomenda que os proprietários agendem a revisão o mais rápido possível.`,
      image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-06-15T07:00:00Z'),
      readTime: 3,
      views: 2030,
      authorId: admin.id,
      categoryId: automotorsCategory!.id,
    },
    {
      slug: 'polo-industrial-de-duas-rodas-de-manaus-bate-recorde-historico-de-producao-em-2026',
      title: 'Polo Industrial de Duas Rodas de Manaus bate recorde histórico de produção em 2026',
      description: 'Fabricantes instaladas na Zona Franca produziram mais de 1,8 milhão de motocicletas neste ano, consolidando Manaus como maior polo do tipo na América Latina.',
      content: `O Polo Industrial de Duas Rodas de Manaus registrou produção histórica em 2026, com mais de 1,8 milhão de motocicletas fabricadas até maio, segundo dados da Associação Brasileira dos Fabricantes de Motocicletas, Ciclomotores, Motonetas, Bicicletas e Similares (Abraciclo).

O resultado representa alta de 14% em relação ao mesmo período do ano anterior e consolida Manaus como o maior polo de produção de motocicletas da América Latina, concentrando montadoras como Honda, Yamaha e Dafra.

O setor é um dos pilares da economia do Amazonas, respondendo por cerca de 80 mil empregos diretos e indiretos na capital, segundo a Federação das Indústrias do Estado do Amazonas (Fieam).

Representantes do setor atribuem o crescimento à demanda por mobilidade urbana de baixo custo e à expansão das entregas por aplicativo, que impulsionaram as vendas de modelos de entrada em todo o país.`,
      image: 'https://images.unsplash.com/photo-1558980664-10e7170b5df9?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-06-16T08:00:00Z'),
      readTime: 4,
      views: 1280,
      isFeatured: true,
      authorId: admin.id,
      categoryId: automotorsCategory!.id,
    },
  ];

  for (const article of automotorsArticles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: article,
    });
  }
  console.log(`  ✓ ${automotorsArticles.length} artigos do Funil Automotors criados`);

  // 4. Events
  console.log('  → Criando eventos...');
  for (const event of EVENTS) {
    await prisma.event.upsert({
      where: { slug: event.slug },
      update: {},
      create: event,
    });
  }
  console.log(`  ✓ ${EVENTS.length} eventos criados`);

  console.log('');
  console.log('✅ Seed concluído com sucesso!');
  console.log('');
  console.log('Credenciais:');
  console.log('  ADMIN      admin@funildenoticias.com.br    / Admin@2026');
  console.log('  EDITOR     editor@funildenoticias.com.br   / Editor@2026');
  console.log('  JORNALISTA jornalista@funildenoticias.com.br / Jornalista@2026');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
