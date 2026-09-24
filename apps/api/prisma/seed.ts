import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const CATEGORIES = [
  { slug: 'amazonas',      name: 'Amazonas' },
  { slug: 'politica',      name: 'Política' },
  { slug: 'futebol',       name: 'Futebol' },
  { slug: 'policial',      name: 'Policial' },
  { slug: 'economia',      name: 'Economia' },
  { slug: 'tecnologia',    name: 'Tecnologia' },
  { slug: 'saude',         name: 'Saúde' },
  { slug: 'mundo',         name: 'Mundo' },
  { slug: 'musica',        name: 'Música' },
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
    slug: 'judas-priest-banda-exception-condado',
    title: 'Judas Priest com a Banda Exception',
    description: 'A Banda Exception, de Manaus, apresenta um show dedicado ao Judas Priest no Condado. A informação foi divulgada pelo músico Matheus Marques nos Stories do Instagram; endereço, valor do ingresso e classificação não foram informados e precisam ser confirmados com a banda e a casa.',
    category: 'show',
    startDate: new Date('2026-09-25'),
    time: '23:00',
    venue: 'Condado',
    isFree: false,
    image: '/noticias/condado-judas-priest.png',
    organizer: 'Banda Exception Manaus',
    isHighlighted: false,
    isSponsored: false,
    tags: ['rock', 'heavy-metal', 'judas-priest', 'manaus'],
  },
  {
    slug: 'ce-ta-doido-festival-manaus-2026',
    title: 'Cê Tá Doido Festival',
    description: 'Ícaro & Gilmar, Panda e Humberto & Ronaldo se apresentam simultaneamente em um palco 360°, com mais de quatro horas de show. É a primeira vez que o "Cê Tá Doido" chega ao Amazonas.',
    category: 'show',
    startDate: new Date('2026-10-03'),
    time: '16:00',
    venue: 'Pódium da Arena da Amazônia',
    isFree: false,
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1920',
    organizer: 'Pump Entertainment',
    isHighlighted: false,
    isSponsored: false,
    tags: ['sertanejo', 'show', 'arena-da-amazonia', 'manaus'],
  },
  {
    slug: 'hoka-sunset-run-2026-manaus',
    title: 'Hoka Sunset Run 2026',
    description: 'Corrida de rua com largada no fim de tarde, aproveitando o pôr do sol sobre a Ponta Negra. Inscrições a partir de R$ 119,90 mais taxa.',
    category: 'esporte',
    startDate: new Date('2026-10-17'),
    venue: 'Alphaville Manaus (Estacionamento Comercial 3)',
    neighborhood: 'Ponta Negra',
    price: 'A partir de R$ 119,90 + taxa',
    isFree: false,
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1920',
    organizer: 'Hoka',
    isHighlighted: false,
    isSponsored: false,
    tags: ['corrida', 'esporte', 'ponta-negra', 'manaus'],
  },
  {
    slug: 'desbrava-centauro-2026-etapa-manaus',
    title: 'Desbrava Centauro 2026 – Etapa Manaus',
    description: 'Etapa manauara do circuito de corrida Desbrava, da Centauro, com concentração no Largo de São Sebastião, ao lado do Teatro Amazonas. Inscrições de R$ 79 a R$ 199, conforme o lote.',
    category: 'esporte',
    startDate: new Date('2026-10-18'),
    venue: 'Largo de São Sebastião',
    neighborhood: 'Centro',
    price: 'R$ 79,00 a R$ 199,00',
    isFree: false,
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1920',
    organizer: 'Centauro',
    isHighlighted: false,
    isSponsored: false,
    tags: ['corrida', 'esporte', 'centro', 'manaus'],
  },
  {
    slug: 'festival-de-teatro-da-amazonia-2026',
    title: '20º Festival de Teatro da Amazônia (FTA 2026)',
    description: 'A 20ª edição do FTA reúne 20 espetáculos em duas mostras: a competitiva Jurupari, com 14 montagens amazonenses (8 adultas e 6 infantis), e a Chico Cardoso, não competitiva, com produções do Amazonas, Maranhão, Mato Grosso e Pará. A programação inclui atividades pedagógicas, encontros setoriais, debates e lançamentos de livros. Locais, horários e valores por espetáculo devem ser confirmados na divulgação oficial.',
    category: 'cultura',
    startDate: new Date('2026-09-27'),
    endDate: new Date('2026-10-11'),
    venue: 'Teatros de Manaus',
    isFree: false,
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=1920',
    organizer: 'Federação de Teatro do Amazonas (Fetam)',
    isHighlighted: true,
    isSponsored: false,
    tags: ['teatro', 'fta', 'cultura', 'manaus'],
  },
  {
    slug: 'diogo-almeida-mes-dos-professores-2026',
    title: 'Diogo Almeida: Mês dos Professores 2026',
    description: 'O humorista Diogo Almeida apresenta o show "Mês dos Professores 2026" em duas datas no Teatro Manauara. Horários e valores devem ser confirmados nos canais de venda.',
    category: 'show',
    startDate: new Date('2026-09-30'),
    endDate: new Date('2026-10-01'),
    venue: 'Teatro Manauara',
    isFree: false,
    image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?q=80&w=1920',
    organizer: 'Diogo Almeida',
    isHighlighted: false,
    isSponsored: false,
    tags: ['humor', 'stand-up', 'teatro-manauara', 'manaus'],
  },
  {
    slug: 'samba-manaus-2026',
    title: 'Samba Manaus 2026',
    description: '25 horas de samba e pagode na Arena da Amazônia, nos dias 9 e 10 de outubro. Portões abrem às 20h. A entrada é permitida a partir dos 15 anos completos, acompanhados dos pais ou responsáveis legais; menores de 15 não entram. A pré-venda online esgotou, e há vendas físicas na Oba Ingressos (Millennium Shopping) e na bilheteria do Teatro Manauara. Line-up não informado na página de vendas.',
    category: 'show',
    startDate: new Date('2026-10-09'),
    endDate: new Date('2026-10-10'),
    time: '20:00',
    venue: 'Arena da Amazônia',
    isFree: false,
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1920',
    ageRating: '15 anos, acompanhado dos responsáveis',
    organizer: 'Bilheteria Digital',
    isHighlighted: false,
    isSponsored: false,
    tags: ['samba', 'pagode', 'arena-da-amazonia', 'manaus'],
  },
  {
    slug: 'festival-rock-brasil-2026',
    title: 'Festival Rock Brasil 2026',
    description: 'Clássicos do rock nacional no Pódium da Arena da Amazônia, em 11 de outubro. A edição marca os 30 anos sem Renato Russo, com tributo da banda Critical Age, além de homenagens a Raimundos e Charlie Brown Jr. Ingressos nominais, com documento com foto na entrada; ingressos PCD são gratuitos. Vendas na Oba Ingressos (Millennium Shopping) e na bilheteria do Teatro Manauara.',
    category: 'show',
    startDate: new Date('2026-10-11'),
    venue: 'Pódium da Arena da Amazônia',
    isFree: false,
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1920',
    organizer: 'Bilheteria Digital',
    isHighlighted: false,
    isSponsored: false,
    tags: ['rock', 'renato-russo', 'arena-da-amazonia', 'manaus'],
  },
  {
    slug: 'manaus-rock-festival-2026',
    title: 'Manaus Rock Festival 2026',
    description: 'Festival de rock no Sambódromo de Manaus, em 14 de novembro, a partir das 17h30, com Matanza Ritual, Gloria e outras bandas nacionais e regionais. Há ingressos de pista, camarotes e experiências VIP com backstage e meet & greet, à venda no shopingressos.com e em lojas Bibi Cell (Vieiralves, Ponta Negra, Shopping Manauara e Shopping Mundi).',
    category: 'festival',
    startDate: new Date('2026-11-14'),
    time: '17:30',
    venue: 'Sambódromo de Manaus',
    isFree: false,
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1920',
    organizer: 'Manaus Rock Festival',
    isHighlighted: false,
    isSponsored: false,
    tags: ['rock', 'matanza-ritual', 'sambodromo', 'manaus'],
  },
  {
    slug: 'fiinsa-2026',
    title: 'FIINSA 2026: Festival de Investimentos de Impacto e Negócios Sustentáveis da Amazônia',
    description: 'Evento reúne investidores, empreendedores, pesquisadores e negócios da floresta em torno da bioeconomia e do impacto sustentável na Amazônia, com palestras, painéis temáticos, rodadas de negócios, sessões de pitch, feira de empreendedorismo e programação cultural. Na pré-venda, o lote Semente custa R$ 280 (acesso aos dias 4 e 5) e o lote Raiz, R$ 350 (dias 3 a 5), com refeições, certificado e happy hour.',
    category: 'festival',
    startDate: new Date('2026-11-03'),
    endDate: new Date('2026-11-05'),
    venue: 'Manaus Plaza Centro de Convenções',
    neighborhood: 'Djalma Batista',
    price: 'R$ 280 – R$ 350 (pré-venda)',
    isFree: false,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1920',
    organizer: 'Idesam e Impact Hub Manaus',
    isHighlighted: false,
    isSponsored: false,
    tags: ['bioeconomia', 'sustentabilidade', 'negocios', 'manaus'],
  },
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
  const amazonasCategory = await prisma.category.findUnique({ where: { slug: 'amazonas' } });
  const climaCategory = await prisma.category.findUnique({ where: { slug: 'clima' } });
  const musicaCategory = await prisma.category.findUnique({ where: { slug: 'musica' } });
  const transitoCategory = await prisma.category.findUnique({ where: { slug: 'transito' } });
  const famososCategory = await prisma.category.findUnique({ where: { slug: 'famosos' } });

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
  const colunasCategory = await prisma.category.findUnique({ where: { slug: 'colunas' } });
  const saudeCategory    = await prisma.category.findUnique({ where: { slug: 'saude' } });
  const automotorsCategory = await prisma.category.findUnique({ where: { slug: 'automotors' } });

  const editorialArticles = [
    {
      slug: 'manaus-atinge-nivel-pessimo-de-qualidade-do-ar-apos-queimadas-na-amazonia',
      title: 'Manaus atinge nível péssimo de qualidade do ar após queimadas na Amazônia',
      description: 'Pesquisadores apontam que fumaça de queimadas afeta a capital amazonense desde o início de setembro.',
      content: `A qualidade do ar em Manaus atingiu um nível "péssimo" na manhã desta quarta-feira (23). A fumaça que encobriu a cidade é atribuída a queimadas em diferentes áreas da Amazônia.

De acordo com a administração municipal, as principais áreas de origem da fumaça estão em municípios da Região Metropolitana de Manaus e no leste do Amazonas.

Pesquisadores do IPAM (Instituto de Pesquisa Ambiental da Amazônia) afirmam que a cidade vem registrando níveis de poluição acima do recomendado pela OMS (Organização Mundial da Saúde) desde o início de setembro.

Monitoramento da qualidade do ar

O aplicativo SELVA (Sistema Eletrônico de Vigilância Ambiental), desenvolvido pela UEA (Universidade do Estado do Amazonas) para fornecer dados meteorológicos, sobre queimadas e sobre poluição do ar em tempo real, apontou diversos pontos da cidade com o nível "péssimo".

As cidades de Manacapuru e Manaquiri também tiveram a qualidade do ar classificada como "péssima". Outras cidades do Amazonas, como Iranduba, Careiro e Itacoatiara, registraram a qualidade do ar como "muito ruim".

Queimadas próximas à capital

Segundo o IPAM, municípios da região metropolitana registraram aumento da área atingida pelo fogo em agosto. Em Manacapuru, foram 2 mil hectares de vegetação afetados pelas queimadas, aumento de 293% em relação ao mesmo período, entre janeiro e agosto, de 2025. Em Iranduba, o crescimento foi de 212%.

O pesquisador Newton Monteiro, do IPAM, afirma que as condições atmosféricas também têm dificultado a dispersão da fumaça. Segundo ele, o atual episódio de El Niño alterou o padrão dos ventos e favoreceu a permanência da poluição sobre Manaus e municípios vizinhos.

Orientação para a população

A Secretaria Municipal de Saúde recomenda que crianças, idosos, gestantes e pessoas com doenças respiratórias ou cardíacas reduzam a exposição. Também orienta evitar atividades físicas ao ar livre durante os períodos de pior qualidade do ar.

A prefeitura recomenda manter a hidratação e proteger os olhos e o nariz. Quando a exposição for inevitável, máscaras como a N95 podem ajudar a reduzir a inalação de partículas.

Tosse, irritação na garganta, ardência nos olhos, chiado no peito e falta de ar estão entre os sintomas que podem ocorrer após a exposição. Em casos graves, a orientação é procurar atendimento médico.

Manaus tem monitoramento

A Prefeitura de Manaus informou que mantém ações de prevenção, fiscalização e monitoramento de queimadas. A Secretaria Municipal de Meio Ambiente e Mudança do Clima também utiliza drones nas atividades de fiscalização.`,
      image: '/noticias/qualidade-ar-manaus-fumaca-queimadas.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-23T13:00:00Z'),
      readTime: 4,
      authorId: admin.id,
      categoryId: climaCategory!.id,
    },
    {
      slug: 'helicoptero-foi-localizado-em-area-de-dificil-acesso',
      title: 'Helicóptero foi localizado em área de difícil acesso',
      description: 'Cinco ocupantes da aeronave foram encontrados mortos; além do cantor Rick, empresário Bruno Avelar também está entre os mortos.',
      content: `O helicóptero que desapareceu na tarde de segunda-feira (21) em Urubici, na Serra Catarinense, foi localizado nesta terça-feira (22) em uma região de mata e de difícil acesso. Os cinco ocupantes da aeronave foram encontrados mortos, entre eles o cantor Rick Sollo, da dupla Rick e Renner, e o empresário Bruno Avelar.

Os destroços foram encontrados na região de Santa Bárbara, após uma intensa operação de buscas. Segundo o Corpo de Bombeiros, embora fosse uma aeronave moderna, não houve emissão de sinais que indicassem uma queda durante o período em que esteve desaparecida.

Além de Rick e Bruno Avelar, estavam a bordo o videomaker Paulo Soares, o piloto Antônio e o copiloto Leopoldo.

Neste momento, os bombeiros iniciam o trabalho de resgate dos corpos. Em seguida, a Polícia Científica deverá realizar a perícia no local.

Em nota, a FAB (Força Aérea Brasileira) informou que a queda será investigada e concluída no menor prazo possível, considerando a complexidade da ocorrência e a necessidade de identificação dos possíveis fatores contribuintes.

Operação de buscas

A operação de busca dos bombeiros, que ocorreu ininterruptamente desde o desaparecimento, mobilizou aproximadamente 40 bombeiros, dois cães de busca e resgate, dez viaturas, além de drones com capacidade de identificação térmica.

As equipes atuaram em áreas de mata e de difícil acesso, enfrentando condições que dificultaram o deslocamento e a localização da aeronave. Nas últimas horas, a Serra Catarinense enfrentou chuva intensa, ventos fortes e baixa visibilidade, condições que também dificultaram o emprego de aeronaves.

Quem são as vítimas

O Corpo de Bombeiros confirmou, na manhã desta terça-feira (22), a morte dos cinco ocupantes da aeronave que estava desaparecida desde a tarde de segunda-feira (21). Os destroços foram encontrados em uma área de difícil acesso em Santa Bárbara.

Rick Sollo: o artista tinha 59 anos e deixa seis filhos. Além de cantor, Rick era compositor de grandes sucessos gravados por outros duetos, como "Página de Amigos", famosa na voz de Chitãozinho & Xororó; "Só Dá Você na Minha Vida", João Paulo & Daniel; "Agenda Rabiscada", Cleiton & Camargo; "Bebo pa Carai", Gino & Geno; entre outras.

Bruno Avelar: empresário e fundador do "Poder do Network", Bruno era reconhecido por sua experiência em conexões profissionais e por compartilhar nas redes sociais sua rotina de palestras sobre o tema. Nas redes sociais, o empresário contava com mais de 550 mil seguidores.

Paulo Soares: também a bordo da aeronave, Paulo era videomaker e realizava trabalhos com o empresário Bruno Avelar. Nas redes sociais, ele compartilhava momentos da vida profissional, dicas de filmagens para os seguidores, além de momentos com a esposa.

Piloto: o piloto foi identificado como Antônio. Ainda não foram divulgadas informações sobre o comandante.

Copiloto: o copiloto foi identificado como Leopoldo. Ainda não foram divulgadas informações sobre ele.

Fonte: CNN Brasil, com informações do Corpo de Bombeiros de Santa Catarina.`,
      image: '/noticias/acidente.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-22T14:00:00Z'),
      readTime: 4,
      authorId: admin.id,
      categoryId: famososCategory!.id,
    },
    {
      slug: 'quem-foi-rick-da-dupla-com-renner-que-morreu-em-queda-de-helicoptero',
      title: 'Quem foi Rick, da dupla com Renner, que morreu em queda de helicóptero',
      description: 'Cantor e compositor estava em veículo que caiu na segunda-feira (21) em Santa Catarina.',
      content: `O cantor e compositor Rick Sollo, conhecido pela dupla sertaneja com Renner, morreu na segunda-feira (21), aos 59 anos. Segundo informações do Corpo de Bombeiros, confirmadas pela CNN Brasil, não há sobreviventes entre os destroços do helicóptero encontrado em Santa Catarina nesta terça-feira (22).

O helicóptero que levava o artista desapareceu na tarde de segunda e foi encontrado nesta terça. Na aeronave estavam o cantor, o empresário Bruno Avelar, do projeto "O Poder do Network", o videomaker Paulo Soares, o piloto e o copiloto, que não tiveram a identidade revelada nesta reportagem.

Quem foi Rick Sollo?

Nascido em Monte do Carmo, no Tocantins, Geraldo Antônio de Carvalho começou a cantar aos 10 anos, quando formou um dueto com a irmã, Dalva, chamado Sereno & Serenata.

Além dessa, participou de outras duplas, como Luciano & Leomar e Rick & Ray, que antecederam a parceria com Ivair dos Reis Gonçalves, que adotou o nome Renner.

Além de cantor, ele era compositor de grandes sucessos gravados por outros duetos, como "Página de Amigos", famosa na voz de Chitãozinho & Xororó; "Só Dá Você na Minha Vida", de João Paulo & Daniel; "Agenda Rabiscada", de Cleiton & Camargo; "Bebo pa Carai", de Gino & Geno; entre outras.

Um dos seus primeiros hits como compositor foi "Sabor do Pecado", que Zezé indicou para a dupla Leandro & Leonardo.

O cantor teve dois filhos, Victor Henrique e Mônica, e quatro netos: Matheus, Maria Helena, Isabela e Mariana.

Fonte: CNN Brasil.`,
      image: '/noticias/rick.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-22T18:00:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: famososCategory!.id,
    },
    {
      slug: 'manaus-lidera-mercado-de-carros-eletricos-no-norte-com-7-6-mil-veiculos',
      title: 'Manaus lidera mercado de carros elétricos no Norte, com 7,6 mil veículos',
      description: 'Frota de elétricos e híbridos na capital passou de 7,6 mil unidades, segundo a ABVE. No Amazonas, os emplacamentos de eletrificados cresceram 169% em dois anos, aponta o Detran-AM.',
      content: `A frota de veículos elétricos e híbridos em circulação em Manaus e na Região Metropolitana já passou de 7,6 mil unidades, o que dá à capital a liderança isolada do segmento na região Norte, segundo a Associação Brasileira do Veículo Elétrico (ABVE). O avanço é puxado por motoristas de aplicativo e por consumidores que buscam sustentabilidade e economia.

Dados do Detran-AM mostram o tamanho da mudança: o Amazonas tinha pouco mais de 2,7 mil veículos eletrificados emplacados em 2024 e chegou a mais de 7,3 mil registros em 2026, alta de 169%.

Para Alexandre Matias, motorista há oito anos e presidente da Associação de Motoristas do Amazonas, a troca do carro a gasolina pelo elétrico trouxe previsibilidade financeira a quem vive da direção e está acostumado com a instabilidade no preço dos combustíveis.

Nas vendas, o levantamento da ABVE aponta crescimento contínuo desde 2022, quando foram comercializadas 459 unidades no estado. Em 2025, o total chegou a 2.863, uma alta acumulada de 523%. Nos dados mais recentes de 2026, o Amazonas é o segundo maior mercado do Norte, com 405 unidades vendidas, atrás do Pará, com 453.

Cleverson Nogueira, gerente comercial de uma concessionária de Manaus, diz que o elétrico "deixou de ser nicho e acompanha a expansão nacional", com vendas até 146% maiores do que em anos anteriores. Segundo ele, os elétricos já representam de 15% a 16% do mercado brasileiro. Ele afirma que a troca da gasolina ou do etanol pela energia elétrica pode reduzir os gastos em até 70%: quem gasta cerca de R$ 1 mil por mês com combustível pode passar a gastar em torno de R$ 200, recarregando em casa ou em postos credenciados.

O consultor financeiro André Torbey alerta que o benefício não é automático e depende da quilometragem rodada, da forma de compra e do regime tributário. No Amazonas, veículos elétricos pagam 50% do IPVA, o que reduz o custo anual. Por outro lado, o preço inicial mais alto e os juros do financiamento podem alongar o tempo de retorno do investimento, e há o risco de mudanças tributárias futuras sobre veículos importados. Fonte: URBNews, com informações do Toda Hora.`,
      image: '/noticias/carro-eletrico-manaus.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-06-15T12:00:00Z'),
      readTime: 4,
      authorId: admin.id,
      categoryId: automotorsCategory!.id,
    },
    {
      slug: 'banda-foxy-de-manaus-se-apresenta-no-condado',
      title: 'Banda Foxy, de Manaus, se apresenta no Condado',
      description: 'Grupo formado por Ícaro Mafra, Matheus Marques, Sander Marques e Liniker sobe ao palco da casa de shows. Data e horário exatos devem ser confirmados com a banda e com o Condado.',
      content: `A Banda Foxy, de Manaus, vai se apresentar no Condado, segundo anúncio do grupo. Data e horário exatos do show não foram detalhados até a publicação desta matéria e devem ser confirmados diretamente com a banda ou com a casa de shows.

Transparência: o guitarrista Matheus Marques é colunista de música e rock do Portal Funil e integrante da Banda Foxy.

Quem é a Banda Foxy

A banda é formada por Ícaro Mafra, na guitarra e nos vocais, Matheus Marques, também na guitarra, o baixista identificado no Instagram como @sdmarke e o baterista Liniker. O grupo mantém perfil no Instagram, @foxyband_, e um canal no YouTube, @bandafoxy4537, onde publica vídeos e registros de apresentações.

Em agosto, a Foxy subiu ao palco do Gullag Fest, na rua Itajubá, no bairro São José Operário, em Manaus, com entrada de R$ 15. O cartaz reuniu a banda ao lado de outros grupos da cena local.

O show no Condado

O Condado é uma casa de shows conhecida pela iluminação em tons de azul e roxo e pelas paredes pintadas com nomes de bandas de rock, como o Metallica, além de mesas e barris usados como mobiliário. A casa já recebeu outras apresentações de bandas de Manaus, como um tributo ao Judas Priest feito pela Banda Exception, da qual Matheus Marques também participa.

Até o fechamento desta matéria, a Foxy não havia divulgado o repertório da noite, o valor do ingresso nem a classificação indicativa do show no Condado. Quem quiser acompanhar as próximas atualizações pode seguir o perfil @foxyband_ no Instagram.

Fonte: Instagram da Banda Foxy (@foxyband_).`,
      image: '/noticias/banda-foxy.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-24T18:00:00Z'),
      readTime: 4,
      authorId: admin.id,
      categoryId: amazonasCategory!.id,
    },
    {
      slug: 'judas-priest-no-condado-banda-exception-faz-show-na-sexta-25-as-23h',
      title: 'Judas Priest no Condado: Banda Exception faz show na sexta (25), às 23h',
      description: 'Grupo de Manaus sobe ao palco do Condado com um show dedicado ao Judas Priest, segundo anúncio do músico Matheus Marques, colunista de música do Portal Funil.',
      content: `A Banda Exception, de Manaus, se apresenta na próxima sexta-feira (25), às 23h, no Condado, com um show dedicado ao Judas Priest. A informação foi divulgada pelo músico Matheus Marques, nos Stories do Instagram, com a frase "25/09 estaremos apresentando Judas Priest no Condado às 23h". O texto, escrito na primeira pessoa do plural, indica que ele participa da apresentação.

Transparência: Matheus Marques é colunista de música e rock do Portal Funil.

O anúncio marca o perfil da Banda Exception Manaus (@bandaexceptionmanaus) e outros perfis ligados ao show, e traz versos em inglês: "Fall to your knees and repent if you please / Who is this man? Where is he from?". O story não informa o endereço da casa, o valor do ingresso, a classificação indicativa nem o repertório da noite.

O Condado é uma casa de shows com palco, iluminação em tons de azul e roxo e paredes pintadas com nomes de bandas de rock, como o Metallica, além de mesas e barris usados como mobiliário.

Formado em Birmingham, na Inglaterra, em 1969, o Judas Priest é uma das principais bandas do heavy metal, com Rob Halford nos vocais. O grupo é lembrado por discos como British Steel (1980), que inclui Breaking the Law e Living After Midnight, Screaming for Vengeance (1982) e Painkiller (1990).

Quem quiser ir deve confirmar horário, local e valores diretamente com a banda e com a casa antes da data. Fonte: Instagram de Matheus Marques (@mathx_marques).`,
      image: '/noticias/condado-judas-priest.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-19T17:10:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: musicaCategory!.id,
    },
    {
      slug: 'amazonas-fc-empata-com-o-ypiranga-e-se-despede-da-serie-c',
      title: 'Amazonas FC empata com o Ypiranga e se despede da Série C',
      description: 'Empate por 2 a 2 no Carlos Zamith deixou a Onça em 13º, com 26 pontos, fora do quadrangular. O clube garantiu vaga na Série C de 2027.',
      content: `O Amazonas FC empatou por 2 a 2 com o Ypiranga-RS, no sábado (30 de agosto), no estádio Carlos Zamith, em Manaus, na última rodada da primeira fase da Série C, e ficou fora do quadrangular de acesso.

O Ypiranga abriu o placar aos 19 minutos do primeiro tempo, com Pedro, e ampliou aos 3 do segundo, com William. A reação amazonense veio logo depois: Ronan diminuiu aos 4 minutos e Adrien empatou aos 13.

O Amazonas terminou a fase em 13º lugar, com 26 pontos. O resultado, porém, garante a permanência do clube na Série C de 2027. O Ypiranga ficou em 9º, com 29 pontos, e também não se classificou.

Fonte: Canal 92 AM.`,
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-08-30T22:00:00Z'),
      readTime: 2,
      authorId: admin.id,
      categoryId: futebolCategory!.id,
    },
    {
      slug: 'apple-lanca-iphone-18-pro-e-primeiro-iphone-dobravel-veja-precos-no-brasil',
      title: 'Apple lança iPhone 18 Pro e o primeiro iPhone dobrável; veja preços no Brasil',
      description: 'iPhone 18 Pro parte de R$ 11.999 e chega às lojas em 18 de setembro. O iPhone Duo, dobrável, começa em R$ 21.999 e só chega em 23 de outubro.',
      content: `A Apple apresentou em 9 de setembro, no Apple Park, a linha iPhone 18, o primeiro iPhone dobrável, o iPhone Duo, e novos relógios e fones. O evento, segundo a cobertura, marcou a estreia de John Ternus como apresentador após assumir o comando da empresa.

iPhone 18 Pro e Pro Max: o Pro parte de R$ 11.999 e o Pro Max, de R$ 12.999. Os dois usam o chip A20 Pro, de 2 nanômetros, e um sistema de câmera de abertura variável, que permite controlar a profundidade de campo manualmente. A Apple promete até 36 horas de vídeo no Pro e 45 horas no Pro Max, com 50% de carga em 15 minutos. A pré-venda começou em 12 de setembro, e os aparelhos chegam a todos em 18 de setembro.

iPhone Duo: o dobrável tem tela externa de 5,4 e interna de 7,6 polegadas, chip A20 Pro, câmeras de 48 MP e bateria para até 44 horas de vídeo. Os preços vão de R$ 21.999 (256 GB) a R$ 30.999 (2 TB). A pré-venda começa em 16 de outubro, e a venda geral, em 23 de outubro.

Outros lançamentos: o Apple Watch Series 12 começa em R$ 5.499 e o Ultra 4, em R$ 10.499. O AirPods 5 custa de R$ 1.499 a R$ 1.699 e chega em 18 de setembro.

Fonte: TechTudo, O Tempo e Times Brasil (CNBC).`,
      image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-09T22:00:00Z'),
      readTime: 4,
      authorId: admin.id,
      categoryId: tecnologiaCategory!.id,
    },
    {
      slug: 'operacao-gota-leva-vacinacao-a-22-aldeias-no-medio-purus-no-amazonas',
      title: 'Operação Gota leva vacinação a 22 aldeias do Médio Purus, no Amazonas',
      description: 'Última missão de 2026, de 10 a 20 de setembro, atende Lábrea, Canutama e Tapauá e prevê aplicar 2,3 mil doses, com apoio da Força Aérea.',
      content: `O Ministério da Saúde, em parceria com a Força Aérea Brasileira, realiza de 10 a 20 de setembro a última etapa da Operação Gota de 2026, com vacinação em 22 aldeias indígenas dos municípios de Lábrea, Canutama e Tapauá, no Médio Rio Purus, no Amazonas. A expectativa é aplicar cerca de 2,3 mil doses.

Crianças, adultos, idosos e gestantes recebem os imunizantes do Calendário Nacional de Vacinação do SUS, conforme a idade e a situação vacinal. Entre eles estão BCG, hepatite B, pentavalente, poliomielite, rotavírus, pneumocócicas, meningocócicas, influenza, covid-19, febre amarela, tríplice viral, varicela, HPV e VSR, além de profilaxia antirrábica. Como a logística é feita 100% por via aérea, a operação leva a vacinação a locais de difícil acesso.

Em 2026, a Operação Gota já vacinou 8,4 mil indígenas e aplicou 14 mil doses, com missões em 121 aldeias ao todo. Segundo a secretária de Saúde Indígena, Lucinha Tremembé, manter a caderneta atualizada ajuda a prevenir doenças e a cuidar da saúde individual e coletiva.

Fonte: Agência Gov (EBC), 10/09/2026.`,
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-10T15:00:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: saudeCategory!.id,
    },
    {
      slug: 'recuperafone-apreende-52-celulares-e-prende-cinco-pessoas-em-manaus',
      title: 'RecuperaFone apreende 52 celulares e prende cinco pessoas em Manaus',
      description: 'Segunda fase da operação da Polícia Civil fiscalizou o Centro e o bairro Redenção nesta quinta-feira (17). Em três dias, foram 286 aparelhos recuperados.',
      content: `A segunda fase da operação RecuperaFone apreendeu 52 celulares e prendeu cinco pessoas em flagrante nesta quinta-feira (17), em fiscalizações no Centro e no bairro Redenção, em Manaus. A ação é da Secretaria de Segurança Pública do Amazonas (SSP-AM), por meio do Núcleo de Investigação e Recuperação de Celulares (Nirc) da Polícia Civil.

Participaram mais de 30 agentes e 8 viaturas. O objetivo é recuperar celulares roubados ou furtados e combater a receptação. A nota da SSP-AM não detalha o crime atribuído a cada preso.

Entre 15 e 17 de setembro, a operação somou 49 estabelecimentos fiscalizados, 8 prisões, 286 aparelhos recuperados e 600 pessoas notificadas, das quais 428 compareceram.

Fonte: SSP-AM, via Segundo a Segundo.`,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-17T21:00:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: policialCategory!.id,
    },
    {
      slug: 'rio-negro-pode-baixar-ate-13-metros-em-manaus-e-vazante-de-2026-preocupa',
      title: 'Rio Negro pode baixar até 13 metros em Manaus e vazante de 2026 preocupa',
      description: 'Cenários do SGB e do Inpa indicam cota mínima entre 13 e 16 metros neste ano. No pior caso, seria a terceira maior seca da série histórica, atrás só de 2023 e 2024.',
      content: `O Rio Negro pode chegar a uma cota mínima entre 13 e 16 metros em Manaus neste ano, segundo cenários do Serviço Geológico do Brasil (SGB) e do Instituto Nacional de Pesquisas da Amazônia (Inpa). No cenário mais favorável, a vazante ficaria entre as dez maiores já registradas. No mais severo, seria a terceira maior da série histórica, atrás apenas das secas extremas de 2023 e 2024.

Em 1º de setembro, o rio marcava 24,09 metros no porto de Manaus. Em agosto, o nível caiu 3,16 metros, e a queda acumulada desde o pico do ano chegou a 4,32 metros. Os pesquisadores destacam que a descida em agosto superou as médias históricas e acompanhou o padrão de 2023, quando o rio chegou a recuar de 3 a 3,5 metros só no início de setembro.

Por isso, a primeira quinzena de setembro foi apontada como decisiva para definir qual cenário vai se confirmar. O contexto regional também preocupa: em Barcelos, no Médio Rio Negro, os níveis ficaram fora das faixas normais, e em Roraima os rios monitorados estavam nos menores níveis para a época.

A previsão de El Niño reforça o alerta. O fenômeno deve reduzir as chuvas até o primeiro trimestre de 2027, o que pode atrasar a recuperação dos rios para dezembro. A Defesa Civil municipal participou, em 1º de setembro, da reunião de alerta com o SGB e o Inpa para coordenar informações e planos de contingência.

Os números acima são de 1º de setembro; a cota atual deve ser conferida nos boletins do SGB.

Fonte: Portal Valor Amazônico, com dados do SGB e do Inpa.`,
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-02T15:00:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: amazonasCategory!.id,
    },
    {
      slug: 'amazonas-lidera-focos-de-queimadas-e-fumaca-deixa-ar-perigoso-em-bairros-de-manaus',
      title: 'Amazonas soma 4,5 mil focos de queimadas em 2026 e fumaça deixa ar perigoso em bairros de Manaus',
      description: 'Alta de 54% sobre 2025 nos focos de fogo. Medições em Compensa e Parque 10 superaram em muito o limite recomendado pela OMS, segundo levantamento da UEA.',
      content: `De 1º de janeiro a 16 de setembro, o Amazonas registrou 4.496 focos de queimadas, alta de 54% sobre os 2.922 do mesmo período de 2025, segundo dados do Inpe. Segundo a reportagem, os incêndios têm origem a leste e nordeste de Manaus, em áreas do Amazonas e do Pará.

A fumaça chegou à capital. Medições do sistema Selva, da Universidade do Estado do Amazonas (UEA), registraram 129,5 µg/m³ de partículas no bairro Compensa, na zona oeste, e 125,6 µg/m³ no Parque 10, na zona centro-sul. A Organização Mundial da Saúde (OMS) recomenda o máximo de 15 µg/m³ na média de 24 horas.

Moradores relataram dor de cabeça, náusea, cansaço e ressecamento do nariz. A combinação de fumaça, temperaturas acima de 37°C e falta de água em oito bairros, atingidos por um rompimento de tubulação segundo a reportagem, aumenta os riscos cardiovasculares e respiratórios. A Águas de Manaus é citada como fonte sobre o abastecimento.

Fonte: Racismo Ambiental (18/09/2026), com dados do Inpe e do sistema Selva/UEA.`,
      image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-18T16:00:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: amazonasCategory!.id,
    },
    {
      slug: 'expo-favela-innovation-amazonas-reune-palestras-shows-e-campeonato-de-capoeira-em-manaus',
      title: 'Expo Favela Innovation Amazonas reúne palestras, shows e campeonato de capoeira em Manaus',
      description: 'Evento gratuito acontece neste sábado (19) e domingo (20), no Centro de Convenções Vasco Vasques, com batalhas culturais e mais de 200 atletas de capoeira.',
      content: `A Expo Favela Innovation Amazonas 2026 acontece neste sábado (19) e domingo (20), no Centro de Convenções Vasco Vasques, em Manaus. A entrada é gratuita, com credenciamento.

A programação inclui palestras e painéis sobre arte amazônica, arte urbana, comunicação em comunidades periféricas, design sustentável, mudanças climáticas e economia criativa. Entre os palestrantes confirmados estão René Silva, da comunicação comunitária, a atriz Clara Monek, o produtor cultural Orsine Júnior, a consultora de sustentabilidade Loredana Kotínski e Régia Moreira, presidente da Comissão de ESG do CIEAM.

No palco, estão previstas apresentações do DJ Rafa Militão, Forró Vibe, do coletivo de hip-hop DDtanks, da CUFA-AM Jazz Company e do Maracatu Pedra Encantada, além de grafite ao vivo. Também haverá batalhas de MC, de breaking e de k-pop e um campeonato de capoeira com mais de 200 atletas.

Segundo os organizadores, Fabiana Carioca e Alexey Ribeiro, presidente da CUFA, o evento oferece visibilidade, aprendizado e oportunidades reais a empreendedores e talentos culturais.

Fonte: Gazeta da Amazônia.`,
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-20T12:00:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: amazonasCategory!.id,
    },
    {
      slug: 'semsa-manaus-orienta-cuidados-com-a-saude-na-estiagem-e-na-fumaca-de-queimadas',
      title: 'Semsa orienta cuidados com a saúde na estiagem e na fumaça de queimadas em Manaus',
      description: 'Prefeitura alerta para irritação nos olhos e nas vias aéreas, desidratação e complicações pulmonares e cardíacas, e lista quando procurar atendimento.',
      content: `A Secretaria Municipal de Saúde (Semsa) de Manaus divulgou orientações para o período de estiagem e de fumaça de queimadas. Os principais riscos são irritação nos olhos e nas vias aéreas, desidratação e complicações pulmonares e cardíacas. Crianças, idosos, gestantes e pessoas com asma ou bronquite formam os grupos mais vulneráveis.

Entre as recomendações estão evitar a exposição ao ar livre quando há muita fumaça, manter portas e janelas fechadas nos horários de maior concentração, não fazer caminhada, corrida ou pedalada nos dias com fumaça e beber água com frequência para manter a hidratação das vias respiratórias. Quando não for possível evitar a rua, o uso de máscara N95 é indicado. Também é preciso evitar fontes de fumaça dentro de casa, como cigarro, incenso e queima de lixo, não coçar os olhos e manter o ambiente sem poeira.

Tosse, irritação na garganta, olhos vermelhos ou lacrimejando, nariz entupido, dor de cabeça, chiado no peito, falta de ar e piora da asma são sinais de alerta. Casos leves devem procurar uma unidade básica de saúde, casos graves, uma unidade de pronto atendimento, e emergências, o SAMU pelo 192.

Segundo Aldeniza Araújo, subsecretária de Gestão de Saúde da Semsa, reduzir a exposição significa evitar ambientes externos quando há muita fumaça no ar.

Fonte: Prefeitura de Manaus/Semsa (09/09/2026).`,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-09T14:00:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: saudeCategory!.id,
    },
    {
      slug: 'startup-inherent-diz-que-agente-de-ia-superou-anthropic-e-openai-em-replicar-pesquisas',
      title: 'Startup Inherent diz que agente de IA superou Anthropic e OpenAI em replicar pesquisas',
      description: 'Fundada por ex-DeepMind, a empresa londrina levantou US$ 50 milhões e afirma que o agente Faraday reproduz estudos científicos com modelo bem menor que os rivais.',
      content: `A Inherent, laboratório de inteligência artificial de Londres fundado por ex-pesquisadores do Google DeepMind, afirma que seu agente de IA, o Faraday, superou modelos da Anthropic e da OpenAI em uma tarefa: reproduzir de forma independente os resultados de artigos científicos, sem receber a resposta antes. A informação é do TechCrunch, em 22 de agosto.

Segundo a empresa, o Faraday usa o modelo Qwen 3.6, de 27 bilhões de parâmetros, bem menor que os sistemas de fronteira com os quais foi comparado, o Claude Opus 4.8 e o GPT-5.5. Os resultados são da própria empresa, não de uma avaliação independente.

Edward Hughes, cofundador e cientista-chefe, diz que o foco é construir um agente cientista de IA e dar aos agentes “gosto” para pesquisa, ou seja, a intuição para escolher experimentos que valem a pena e projetar bons métodos. Ele ressalta que superar outros modelos foi secundário, e que o mais importante é a metodologia e a forma de treinamento.

A Inherent levantou US$ 50 milhões em uma rodada inicial, tem como cofundadores Louis Kirsch, Kaloyan Aleksiev e Tantum Collins, todos ex-DeepMind, e planeja chegar a 20 ou 25 funcionários até o fim do ano. O objetivo de longo prazo é criar uma IA capaz de descobrir novos conhecimentos científicos.

Fonte: TechCrunch.`,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-08-22T15:00:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: tecnologiaCategory!.id,
    },
    {
      slug: 'manaus-abre-semana-nacional-de-transito-com-acoes-gratuitas-nesta-segunda-feira',
      title: 'Manaus abre Semana Nacional de Trânsito com ações gratuitas nesta segunda-feira',
      description: 'Abertura é às 9h, no mirante Lúcia Almeida, no Centro Histórico. Programação de educação e segurança segue até sábado (26), com o tema "No trânsito, enxergar o outro é salvar vidas".',
      content: `A Semana Nacional de Trânsito 2026 começa em Manaus nesta segunda-feira (21), com uma programação gratuita voltada à educação e à segurança de motoristas, motociclistas, ciclistas e pedestres. A abertura oficial será às 9h, no mirante Lúcia Almeida, na avenida 7 de Setembro, no Centro Histórico.

As atividades acontecem das 8h às 12h e incluem serviços gratuitos, ações educativas e de cidadania, realizadas em parceria com órgãos municipais e entidades ligadas ao setor de transporte.

Com o tema “No trânsito, enxergar o outro é salvar vidas”, a campanha segue até sábado (26), com atividades em espaços públicos, escolas e empresas da capital. Alunos da Escola Municipal Raimundo Nonato de Oliveira Gomes, servidores públicos e moradores também participam da abertura.

Fonte: Portal do Holanda.`,
      image: '/noticias/semana-nacional-transito-manaus.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-20T18:55:00Z'),
      readTime: 2,
      authorId: admin.id,
      categoryId: transitoCategory!.id,
    },
    {
      slug: 'em-agenda-no-interior-roberto-cidade-destaca-propostas-para-saude-seguranca-e-emprego',
      title: 'Em agenda no interior, Roberto Cidade destaca propostas para saúde, segurança e emprego',
      description: 'Candidato à reeleição ao governo do Amazonas visitou Urucurituba, Boa Vista do Ramos e Maués e apresentou propostas do plano de governo, como o programa Amazonas Empreendedor.',
      content: `O governador e candidato à reeleição Roberto Cidade (União Progressista) cumpriu agenda de campanha no sábado (19) em Urucurituba, Boa Vista do Ramos e Maués, no Médio e Baixo Amazonas. Nas visitas, ele participou de carreatas e apresentou propostas do seu plano de governo, segundo o Portal do Holanda.

Entre as medidas divulgadas estão ações para empreendedorismo, saúde, segurança pública, educação, infraestrutura e produção rural. Na área econômica, Cidade apresentou o programa “Amazonas Empreendedor”, que prevê ampliação do microcrédito, qualificação profissional, incentivo à inovação, digitalização e participação de pequenos negócios nas compras governamentais.

Em Urucurituba, incluindo o distrito de Itapeaçu, a campanha destacou propostas para produção rural, pesca, bioeconomia e infraestrutura. Em Boa Vista do Ramos, a agenda teve foco na educação, com destaque para o polo da Universidade do Estado do Amazonas (UEA) instalado no município durante a atual gestão, segundo a campanha.

Em Maués, o candidato apresentou compromissos ligados a geração de emprego e renda, saúde, segurança, infraestrutura e apoio ao setor produtivo. Entre as propostas estão a criação de polos regionais de bioeconomia, a ampliação das Carretas da Saúde e da Telemedicina e o reforço de ações voltadas a idosos, pessoas com deficiência e pessoas com Transtorno do Espectro Autista (TEA).

O plano também prevê investimentos em assistência técnica, crédito, mecanização e armazenagem para produtores, além de medidas para fortalecer a piscicultura, a pesca artesanal e a agroindústria. Na infraestrutura, a campanha propõe pavimentação e recuperação de estradas vicinais e melhorias em portos, terminais, aeroportos e pontes no interior.

A agenda nos três municípios faz parte da série de viagens do candidato durante a campanha eleitoral de 2026.

Transparência: as propostas e as informações sobre obras e programas são da campanha e não foram verificadas de forma independente pelo Portal Funil.

Fonte: Portal do Holanda.`,
      image: '/noticias/roberto-cidade-agenda-interior.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-20T20:45:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: politicaCategory!.id,
    },
    {
      slug: 'trump-diz-que-transformara-arco-do-triunfo-dos-eua-em-complexo-militar',
      title: "Trump diz que transformará 'Arco do Triunfo dos EUA' em complexo militar",
      description: 'Presidente dos EUA afirma que projeto, pedido pelos militares por razões de segurança nacional, terá drones, atiradores de elite e estoque de munição; estrutura será construída perto da Ponte Memorial de Arlington.',
      content: `O presidente dos Estados Unidos, Donald Trump, afirmou neste domingo (20) que concordou em transformar o projeto de um Arco do Triunfo em Washington, D.C., em um complexo militar.

Segundo ele, a mudança foi feita “a forte pedido dos militares dos Estados Unidos” e por razões de segurança nacional. Trump afirmou que a estrutura será construída no Receptive Circle, próximo à Ponte Memorial de Arlington, e terá capacidade para abrigar e armazenar grandes quantidades de drones e munição, além de permitir o uso de atiradores de elite no telhado e nas áreas da praça.

“Não haverá nenhuma instalação como esta em nenhum lugar do mundo”, escreveu Trump em uma publicação na rede Truth Social.

Segundo o presidente, o projeto do Arco do Triunfo é planejado desde a época da Guerra Civil americana. Ele também afirmou que Washington, D.C., é “a única” entre as 59 principais cidades e capitais do mundo que não possui um Arco do Triunfo. “Mas agora terá e, de longe, será o maior de todos”, escreveu Trump.

Maior que monumento francês: a Comissão de Belas Artes dos EUA aprovou em maio o projeto do arco triunfal que o presidente Donald Trump quer construir em Washington, capital do país. Segundo ele, será “o maior e mais bonito arco triunfal do mundo”. Ao lado da estrutura principal, o monumento contará com duas águias douradas. Já os quatro leões previstos inicialmente para a base foram retirados da versão final.

A proposta também prevê as inscrições “Uma Nação Sob Deus” e “Liberdade e Justiça para Todos”, frases presentes no juramento de fidelidade dos EUA. A obra, que lembra o Arco do Triunfo, deverá ser erguida às margens do Rio Potomac e terá, no topo, uma figura semelhante à Estátua da Liberdade segurando uma tocha.

Apesar da inspiração no monumento encomendado por Napoleão Bonaparte, o arco norte-americano deverá ser o maior do mundo entre estruturas do tipo. A proposta inicial previa cerca de 78 metros de altura, mas a versão revisada reduziu a dimensão para 76,2 metros. Logo atrás do projeto dos Estados Unidos aparece o Monumento à Revolução, da Cidade do México, com aproximadamente 67 metros de altura, cerca de 9 metros a menos que o arco planejado por Trump.

Críticas ao projeto: um grupo de veteranos e um historiador acionaram a Justiça federal para tentar barrar a construção. Eles argumentam que o arco prejudicaria a linha de visão entre o Memorial Lincoln e a Arlington House, localizada no Cemitério Nacional de Arlington. Trump e o secretário do Interior dos EUA, Doug Burgum, afirmam que Washington é a única grande capital ocidental sem um arco triunfal. O Departamento do Interior supervisiona o Serviço Nacional de Parques, responsável pelo terreno onde Trump quer construir o monumento.

O presidente também afirmou que outros projetos, como adicionar um revestimento azul ao interior do espelho d’água do Memorial Lincoln, ajudariam a embelezar a cidade para as comemorações de 4 de julho pelos 250 anos da independência dos EUA.

A reforma do espelho d’água também virou alvo de ação judicial movida pela organização The Cultural Landscape Foundation. O grupo argumenta que a decisão de pintar o fundo do local de azul, sem passar pelas revisões necessárias, viola leis federais de preservação histórica. Segundo a organização, as mudanças fazem parte de um esforço mais amplo de Trump para promover reformas drásticas em Washington sem a devida análise técnica e alterar o caráter histórico da região.

Uma audiência sobre o caso estava marcada para acontecer ainda nesta quinta-feira em um tribunal federal de Washington.`,
      image: '/noticias/trump-arco-triunfo-complexo-militar.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-20T17:45:00Z'),
      readTime: 4,
      authorId: admin.id,
      categoryId: mundoCategory!.id,
    },
    {
      slug: 'weverton-faz-milagres-e-gremio-e-palmeiras-empatam-sem-gols-na-arena',
      title: 'Weverton faz milagres, e Grêmio e Palmeiras empatam sem gols na Arena',
      description: 'Partida foi bastante movimentada, com chances dos dois lados e bolas no travessão, mas goleiro gremista foi o destaque e saiu aplaudido de campo.',
      content: `Grêmio e Palmeiras empataram em 0 a 0 na manhã deste domingo, na Arena do Grêmio, pela 28ª rodada do Brasileirão. A partida foi muito movimentada, com chances para os dois lados, mas brilhou a estrela de Weverton, que fez defesaças e saiu de campo aplaudido pelo estádio inteiro.

O Palmeiras ainda carimbou o travessão duas vezes, com Vitor Roque, enquanto o Grêmio também acertou o travessão com Gustavo Martins, após grande defesa de Carlos Miguel. No último lance do jogo, Weverton garantiu o empate em defesa milagrosa após finalização de Maurício.

O resultado deixa o Grêmio dentro da zona do rebaixamento, com 29 pontos. O primeiro fora da zona é o Vasco, que tem 31 pontos e um jogo a menos que os gaúchos. Já o Palmeiras chegou a 57 pontos e igualou o Flamengo, mas os cariocas seguem na liderança pelo número de vitórias. A equipe rubro-negra ainda joga na rodada nesta tarde, quando recebe o Red Bull Bragantino.

Os primeiros 45 minutos foram muito movimentados na Arena do Grêmio. O Palmeiras acertou duas bolas no travessão, com Vitor Roque, e o Grêmio colocou uma no travessão do outro lado, com Gustavo Martins. O time visitante teve o domínio da posse de bola e tentou criar jogadas durante todo o tempo, mas os gaúchos se mostraram bem postados para sair no contra-ataque e criaram também ótimas chances de gol. Dentro de sua proposta, cada time fez um bom primeiro tempo.

A partida caiu em intensidade na segunda etapa e o jogo só retomou o ritmo após os 20 minutos, quando os técnicos promoveram as substituições. Do lado gremista, o time de Renato Gaúcho perdeu força diante das atuações ruins de Enamorado e Jovane Cabral em comparação com os incisivos Pavón e Amuzu. O Palmeiras, por outro lado, mostrou a força do seu elenco e melhorou em campo. Mas foi aí que Weverton tomou conta do jogo: o goleiro fez dois milagres em finalizações de Andreas Pereira e Maurício, já no último minuto, e garantiu o empate.

Depois da parada para a data Fifa, o Palmeiras volta a campo para enfrentar o Bahia, no dia 8 de outubro, no Nubank Parque. Já o Grêmio joga um dia antes, dia 7 de outubro, contra o Remo, no Mangueirão, mas já de olho no Grenal do dia 11, na Arena.`,
      image: '/noticias/gremio-palmeiras-weverton.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-20T16:10:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: futebolCategory!.id,
    },
    {
      slug: 'ira-envia-a-trump-lista-de-condicoes-para-o-fim-de-conflito-mas-ameaca-uso-de-armas-nucleares',
      title: 'Irã envia a Trump lista de condições para o fim de conflito, mas ameaça uso de armas nucleares: "Estamos preparados para guerra decisiva"',
      description: 'Iranianos podem optar por este tipo de armamento caso Washington não abandone as sanções econômicas, diz chefe militar do país.',
      content: `O Irã enviou ao presidente Donald Trump uma lista formal de condições para o fim da guerra, afirmou o secretário do Conselho Supremo Nacional de Segurança do país, Mohsen Rezaei, à rede Al Jazeera no fim deste sábado (19).

"Permanecemos em contato com o mediador Qatar, que repassou nossas condições a Washington com o objetivo de colocar um fim à guerra. Estamos esperando a resposta do presidente Trump. Nossas condições são um fim para a guerra em todos os frontes, a liberação de nossos fundos congelados e um fim para o bloqueio naval", sinalizou Rezaei. Esta foi a primeira vez, desde o início do conflito em fevereiro, que o Irã não exige reparações pelas suas perdas materiais e humanas.

Apesar de ter tomado a iniciativa de negociar a paz, Rezaei garante que "é do interesse de Washington" aceitar as exigências iranianas e subiu o tom: "As ameaças de Trump não alcançarão nenhum resultado. Estamos preparados para uma guerra decisiva." Ele ainda disse que "Teerã está pronta", caso Trump decida fazer um novo ataque. Mediadores do Qatar e do Paquistão têm feito a ponte entre EUA e Irã para reestabelecer as negociações desde o fim do memorando de entendimento que perdeu a validade no último mês.

Entre suas "provas" de que iranianos estariam prontos para uma escalada, o líder militar citou que suas forças testaram recentemente um míssil antinavio de ogivas múltiplas próximo a uma embarcação americana, simulando um ataque. Ele garantiu que as ogivas ainda podem ser aprimoradas.

Rezaei confirmou que a guerra deve ficar confinada ao Golfo; o Irã não tem planos de atacar o território continental dos EUA, mas apenas suas bases e recursos navais que se estendem da costa iraniana ao Golfo de Omã e ao Mar Arábico. O intuito de qualquer futura operação iraniana é acertar "de maneira pesada" no bolso dos americanos, que têm amplo interesse no comércio de petróleo regional.

EUA pode "impulsionar" a saída de Teerã de pacto antinuclear: Rezaei garantiu que o país não tem planos de se retirar do Tratado de Não-Proliferação Nuclear, mas que possíveis sanções ou posturas hostis de Trump ou do Conselho de Segurança da ONU podem levar Teerã a escolher se adotará armas nucleares ou não. Apesar disso, ele garante que o país continua a honrar neste momento uma fatwa, decreto religioso do Aiatolá Khomeini que proibia este tipo de armamento.

Ele sinalizou que Ormuz segue vital para a paz e que o Irã quase chegou a um acordo com Omã de retomada de circulação, mas que a falta de apoio regional acabou colocando a proposta na gaveta. Mesmo assim, o Irã não tem interesse em fechar o Estreito de Bab al-Mandeb para pressionar o mercado energético global, garantiu. O corredor marítimo é "problema do Iêmen", segundo Rezaei, que garantiu que o Irã não está envolvido na guerra dos Houthis contra o governo local.`,
      image: '/noticias/ira-condicoes-fim-conflito.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-20T17:30:00Z'),
      readTime: 4,
      authorId: admin.id,
      categoryId: mundoCategory!.id,
    },
    {
      slug: 'flamengo-vence-o-bragantino-e-abre-vantagem-na-lideranca-do-brasileirao',
      title: 'Flamengo vence o Bragantino e abre vantagem na liderança do Brasileirão',
      description: 'Gols de Varela e Pedro garantiram a vitória por 2 a 1 no Maracanã, pela 28ª rodada. Time chegou aos 60 pontos, três à frente do Palmeiras, que empatou com o Grêmio.',
      content: `O Flamengo venceu o Red Bull Bragantino por 2 a 1 neste domingo (20), no Maracanã, pela 28ª rodada do Campeonato Brasileiro, e ampliou a vantagem na liderança da competição. A partida teve 66.053 torcedores no estádio.

Guillermo Varela abriu o placar aos 13 minutos do primeiro tempo, em cruzamento de Jorge Carrascal pela esquerda. Pedro ampliou aos 25 do segundo tempo, em jogada iniciada por Jorginho. O Bragantino descontou aos 41 do segundo tempo, com Nacho Sosa.

Com o resultado, o Flamengo chegou aos 60 pontos e segue na ponta da tabela. O Palmeiras, segundo colocado, tem 57 pontos, após empatar sem gols com o Grêmio na Arena, em partida na qual o goleiro Weverton foi o destaque.

Fonte: Correio Braziliense.`,
      image: '/noticias/flamengo-bragantino-lance.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-20T21:30:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: futebolCategory!.id,
    },
    {
      slug: 'manausfc-anuncia-goleiro-wendel-simao-para-a-temporada-2027',
      title: 'ManausFC anuncia goleiro Wendel Simão para a temporada 2027',
      description: 'Com 1,93 metro de altura, jogador de 22 anos passou pela base do Grêmio e defendeu Ceará, Guarany-AL e Cruzeiro-AL. Clube chega a 11 jogadores confirmados para o próximo ano.',
      content: `O ManausFC anunciou, em 9 de setembro, a contratação do goleiro Wendel Simão, de 22 anos, para a temporada 2027. Com 1,93 metro de altura, o jogador chega ao Gavião Real após passar pelas categorias de base do Grêmio-RS e defender clubes como Ceará-CE, Guarany-AL e Cruzeiro-AL.

Em sua chegada ao clube amazonense, Wendel agradeceu a oportunidade e destacou a confiança recebida para vestir a camisa do ManausFC. "Estou muito feliz e motivado com essa oportunidade. Sei da responsabilidade que é representar esse clube e podem ter certeza de que não vai faltar trabalho, dedicação e comprometimento da minha parte", disse o goleiro.

Com o novo reforço, o ManausFC chega a 11 jogadores confirmados para 2027. Além de Wendel, o elenco já conta com o lateral-esquerdo Henrique, o lateral-direito Marcos Sérgio, os volantes Wallace, João Neto e Luiz Gabriel, o meia Daniel e os atacantes Pedro, Samuel, Railan e Anderson.

O clube segue montando o elenco para a próxima temporada e, por enquanto, o novo goleiro é o jogador de maior estatura entre os reforços anunciados pelo Gavião Real.

Fonte: MSKTV.`,
      image: 'https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-09T15:00:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: futebolCategory!.id,
    },
    {
      slug: 'com-um-a-mais-atletico-de-madrid-vence-real-no-classico-espanhol',
      title: 'Com um a mais, Atlético de Madrid vence Real no clássico espanhol',
      description: 'Jogando em casa, time de Diego Simeone aproveita expulsão de Dean Huijsen para superar o rival.',
      content: `O Atlético de Madrid venceu o Real Madrid por 2 a 1 neste domingo, no Metropolitano, pela sétima rodada do Campeonato Espanhol. O clássico teve dois momentos distintos. Com 11 de cada lado, o Real vinha conseguindo, a duras penas, segurar a pressão atleticana. A expulsão do zagueiro Dean Huijsen, no lance do pênalti em Giuliano Simeone, transformou o jogo. Alex Grimaldo abriu o placar aos sete, cobrando a penalidade com categoria, e com um a mais o Atlético tomou conta do jogo. Jonathan David ampliou aos 15, e o Real praticamente não jogou mais. Só acordou aos 43, quando Antonio Rüdiger descontou de cabeça, após cobrança de falta de Bernardo Silva da esquerda.

Com a vitória, o Atlético de Madrid tomou a vice-liderança do rival, agora com 16 pontos, um à frente do Real. O Barcelona, que ganhou seus sete jogos até aqui, é o líder disparado, com 21.

O primeiro tempo teve mais disputas ríspidas do que chances de gol no Metropolitano. Com menos de dez minutos, Güler e Baena já tinham se estranhado duas vezes, e em uma delas o técnico atleticano Diego Simeone levou cartão amarelo por uma reclamação desproporcional à beira do campo. Ao longo de 45 minutos, os dois times disputaram cada palmo do gramado. Só quem não trabalhou foram os goleiros Thibaut Courtois e Jan Oblak. Nenhum chute a gol dos dois lados.

Não deve ser fácil para Giuliano Simeone jogar sob as ordens do pai, sempre precisando driblar a desconfiança de favorecimento. Quando precisar mostrar seu valor, o argentino pode apresentar a atuação deste domingo. O meia argentino de 23 anos, mais novo dos três filhos jogadores de Diego Simeone, não apenas mostrou a raça habitual como participou diretamente dos lances decisivos da partida. No pênalti, dominou com categoria o lançamento de Hancko e foi puxado por Huijsen na área. Logo depois, foi dele o cruzamento na medida para David fazer o segundo.

Mais uma vez, Vini Jr. teve atuação apagada, ainda que neste domingo tenha tido a companhia de quase todo o time do Real, sempre um passo atrás dos rivais nas disputas de bola. O brasileiro deu lugar a Diomandé imediatamente após o Atlético abrir o placar, no início do segundo tempo. O marfinense tentou explorar sua velocidade, mas encontrou uma partida já condicionada pela expulsão e só levou perigo em um chute de fora da área defendida por Oblak.`,
      image: '/noticias/atletico-real-classico.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-20T16:50:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: futebolCategory!.id,
    },
    {
      slug: 'dallagnol-contesta-suspensao-de-campanha-e-diz-que-vai-recorrer',
      title: 'Dallagnol contesta suspensão de campanha e diz que vai recorrer',
      description: 'Candidato do Novo ao Senado pelo Paraná aponta "contradições" na decisão do TSE, que suspendeu atividades de campanha e repasses de recursos. Ele afirma que o registro da candidatura segue ativo.',
      content: `O candidato ao Senado pelo Paraná Deltan Dallagnol (Novo) contestou a decisão do Tribunal Superior Eleitoral (TSE) que suspendeu sua campanha e disse que vai recorrer. A informação foi divulgada pela CNN Brasil neste domingo (20).

A suspensão foi determinada pelo ministro do TSE Floriano de Azevedo Marques no sábado (19). A decisão paralisa as atividades de campanha e os repasses de recursos eleitorais e partidários. Segundo a reportagem, o ministro considerou que a decisão do Tribunal Regional Eleitoral do Paraná (TRE-PR), que havia aprovado o registro da candidatura em 9 de setembro, foi tomada sem o mínimo amparo legal, em afronta ao TSE, e com efeitos perturbadores para o processo eleitoral.

O pedido partiu da coligação Paraná Para Todos, liderada pelo PDT, e da Federação Brasil da Esperança, formada por PSOL, PT e PCdoB.

Dallagnol afirmou que o registro da sua candidatura continua ativo e apontou o que chamou de contradições na decisão do ministro. Ele também ressaltou que a medida foi tomada quando, segundo ele, liderava as intenções de voto, e questionou a ligação do ministro com o ministro do Supremo Tribunal Federal Alexandre de Moraes.

O portal acompanha o caso.

Fonte: CNN Brasil.`,
      image: '/noticias/dallagnol-suspensao-campanha.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-20T16:05:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: politicaCategory!.id,
    },
    {
      slug: 'tre-pr-mantem-candidatura-de-deltan-dallagnol-ao-senado-apesar-de-campanha-suspensa',
      title: 'TRE-PR mantém candidatura de Deltan Dallagnol ao Senado, mas nome depende do TSE',
      description: 'Corte paranaense acolheu parcialmente os embargos da defesa nesta quarta-feira (23) e manteve o registro. A campanha, porém, segue suspensa por decisão do TSE, e a palavra final cabe ao plenário da Corte Superior.',
      content: `O Tribunal Regional Eleitoral do Paraná (TRE-PR) manteve, nesta quarta-feira (23), o registro da candidatura de Deltan Dallagnol (Novo) ao Senado. Por unanimidade, os magistrados acolheram parcialmente os embargos de declaração apresentados pela defesa, mas fizeram apenas ajustes formais na decisão anterior, sem mudar o resultado que havia autorizado o registro. O caso agora segue para o Tribunal Superior Eleitoral (TSE), que dará a palavra final sobre a validade da candidatura.

Mesmo com o registro mantido, Dallagnol continua sem poder fazer campanha. Por decisão liminar do ministro Floriano de Azevedo Marques, mantida pelo plenário do TSE por 5 votos a 2 na segunda-feira (21), ele segue impedido de pedir votos, participar de debates, usar recursos dos fundos partidário e eleitoral e veicular propaganda no rádio e na televisão enquanto a decisão estiver em vigor. Segundo a liminar, o descumprimento dessas restrições pode configurar crime de desobediência eleitoral.

A distinção entre "campanha suspensa" e "candidatura cancelada" gerou confusão entre eleitores após a decisão do TSE. Em publicação no X, no dia seguinte à liminar, o próprio Dallagnol tentou esclarecer o ponto: "Este é o ministro que me proibiu de fazer campanha, pedir votos, participar de debates e aparecer no horário eleitoral de rádio e TV. Mas quero deixar uma coisa muito clara: mesmo proibido de fazer campanha, meu registro continua deferido e meu nome estará na urna."

O registro da candidatura havia sido deferido pelo TRE-PR em votação apertada de 4 a 3, em 8 de setembro, e permanece formalmente válido enquanto não for derrubado pelo TSE.

Durante o julgamento desta quarta-feira, partidos que contestam a candidatura pediram celeridade para que o processo chegasse logo ao TSE. A relatora, juíza Vanessa Jamus Marchi, reagiu: "Esta Corte não precisa de lições pedagógicas, dispensando-se qualquer tutoramento por parte dos peticionantes." Ela também rejeitou um pedido para multar Dallagnol por suposto uso protelatório dos embargos, afirmando que recorrer às instâncias superiores é um direito do candidato.

O caso remonta a 2023, quando Dallagnol perdeu o mandato de deputado federal por decisão do TSE, que considerou que ele deixou o Ministério Público Federal enquanto havia procedimentos disciplinares em andamento, entendendo que a saída antecipada se relacionava a uma possível inelegibilidade futura. Para liberar o registro em 2026, o TRE-PR considerou, entre outros pontos, o arquivamento posterior desses procedimentos. Os partidos que tentam barrar a candidatura questionam essa interpretação, argumentando que fatos posteriores não anulariam a conduta já analisada pelo TSE em 2023.

Em nota, a defesa de Dallagnol comemorou a decisão desta quarta-feira e afirmou que a Corte paranaense "reconheceu novamente sua elegibilidade". A defesa diz que segue trabalhando para reverter, no TSE, a suspensão da campanha.

Fonte: Banda B, com informações da Gazeta do Povo.`,
      image: '/noticias/dallagnol-suspensao-campanha.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-23T23:04:00Z'),
      readTime: 4,
      authorId: admin.id,
      categoryId: politicaCategory!.id,
    },
    {
      slug: 'omar-aziz-lidera-no-1o-turno-para-o-governo-do-amazonas-diz-pesquisa',
      title: 'Omar Aziz lidera no 1º turno para o governo do Amazonas, diz pesquisa',
      description: 'Levantamento da Paraná Pesquisas ouviu 1.350 eleitores em 38 municípios do estado. Roberto Cidade e Professora Maria do Carmo aparecem tecnicamente empatados na segunda colocação.',
      content: `O senador Omar Aziz (PSD) lidera a corrida pelo governo do Amazonas, com 29,6% das intenções de voto em cenário estimulado de primeiro turno, segundo pesquisa da Paraná Pesquisas divulgada pelo Poder360.

O levantamento ouviu 1.350 eleitores em 38 municípios do Amazonas, em entrevistas presenciais e domiciliares realizadas entre 2 e 4 de setembro. A margem de erro é de 2,7 pontos percentuais, para mais ou para menos, com nível de confiança de 95%. A pesquisa está registrada no Tribunal Superior Eleitoral sob o número AM-01118/2026, a um custo de R$ 45 mil.

Roberto Cidade (União Brasil) aparece em segundo lugar, com 21,5%, e a Professora Maria do Carmo (PL) em terceiro, com 19,4%. Os dois estão tecnicamente empatados, já que a diferença entre eles, de 2,1 pontos percentuais, fica dentro da margem de erro da pesquisa. David Almeida (Avante) soma 16,8%, Cabo Daciolo (Mobiliza) tem 3%, Isael Munduruku (Rede) aparece com 0,4% e Gilberto Vasconcelos (PSTU), com 0,3%. Brancos, nulos ou indecisos somam 4,5% cada.

Fonte: Poder360, com dados da Paraná Pesquisas.`,
      image: '/noticias/omar-aziz-campanha-carreata.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-05T10:00:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: politicaCategory!.id,
    },
    {
      slug: 'delcy-rodriguez-usa-broche-com-mapa-do-essequibo-em-discurso-na-onu',
      title: 'Delcy Rodríguez usa broche com mapa do Essequibo em discurso na ONU',
      description: 'Presidente interina da Venezuela reafirmou, na Assembleia Geral da ONU, a reivindicação de Caracas sobre o território que pertence à Guiana e defendeu negociação bilateral com o país vizinho.',
      content: `A presidente interina da Venezuela, Delcy Rodríguez, subiu ao púlpito da Assembleia Geral da ONU nesta quarta-feira (23) com um broche semelhante a um mapa da Venezuela, com a região de Essequibo anexada.

Essequibo é um território que pertence à Guiana, mas é reivindicado pela Venezuela. Caracas formalizou essa reivindicação em 2023, quando o então presidente Nicolás Maduro fez um referendo para incorporar a região e promulgou uma lei que cria uma província do país no território. A partir de então, o regime chevista passou a adotar um mapa oficial mostrando Essequibo como parte da Venezuela. A comunidade internacional rejeita a visão da Venezuela e considera Essequibo parte da Guiana.

Rodríguez fez referência à reivindicação durante seu discurso na ONU: "Não posso deixar de mencionar (...) nossa reafirmação dos direitos históricos da Venezuela sobre a região do Essequibo e nosso apelo à República Cooperativa da Guiana para que resolva a situação e retome as negociações, conforme estipulado pelo Acordo de Genebra. Os acordos que perduram são aqueles que surgem de negociações bilaterais, e não aqueles que envolvem organizações externas", disse a presidente interina.

A Venezuela contesta a Sentença Arbitral de Paris, de 3 de outubro de 1899, que definiu a fronteira entre o país e a então Guiana Britânica.

Reservas de petróleo

Localizado na parte mais a oeste do território da Guiana, a região de Essequibo ocupa 159 mil km² e representa cerca de 70% do território do país, uma área maior que o estado do Ceará e a Inglaterra.

Em 2015, foram encontradas grandes reservas de petróleo na região. Estima-se que na Guiana haja o equivalente a 11 bilhões de barris, parte significativa deles "offshore", no mar, perto de Essequibo. Em consequência do boom do petróleo, a Guiana é o país sul-americano cuja economia mais cresce nos últimos anos.

No entanto, a região passou a ser cobiçada pelo governo da Venezuela, que afirma ter direito sobre o território. Em 3 de dezembro, um plebiscito para a anexação do território, chamado pelos venezuelanos de "Guiana Essequiba", foi aprovado por 95% dos eleitores presentes, com comparecimento equivalente a metade dos eleitores venezuelanos.

Em estado de alerta, as Forças Armadas brasileiras ampliaram a presença de militares nas fronteiras com a Venezuela e com a Guiana, já que tropas venezuelanas precisariam passar pelo norte de Roraima em caso de confronto. O território brasileiro faz fronteira tanto com a Guiana quanto com a Venezuela.

As tensões continuaram a escalar. Em 7 de dezembro, os Estados Unidos anunciaram exercícios militares na Guiana, inclusive em Essequibo. No dia seguinte, o presidente venezuelano Nicolás Maduro assinou decretos para incorporar o território.`,
      image: '/noticias/delcy-rodriguez-essequibo-onu.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-23T19:30:00Z'),
      readTime: 4,
      authorId: admin.id,
      categoryId: mundoCategory!.id,
    },
    {
      slug: 'copom-reduz-selic-para-13-75-pela-quinta-vez-seguida',
      title: 'Copom reduz Selic para 13,75% ao ano pela quinta vez seguida',
      description: 'Corte de 0,25 ponto foi unânime e veio com a inflação em queda: o IPCA de agosto recuou 0,32% e acumula 4,22% em 12 meses, abaixo do teto da meta.',
      content: `O Comitê de Política Monetária (Copom) do Banco Central reduziu a taxa básica de juros, a Selic, em 0,25 ponto percentual, para 13,75% ao ano. É o quinto corte consecutivo do mesmo tamanho, e a decisão foi unânime.

O principal argumento foi o alívio da inflação. O IPCA de agosto registrou queda de 0,32%, e o índice acumulado em 12 meses ficou em 4,22%, abaixo do teto da meta, de 4,5%.

Apesar do corte, o comunicado do Copom não assumiu compromisso com os próximos passos. O comitê reforçou que as decisões dependem dos dados e citou riscos de inflação para cima. Especialistas ouvidos na cobertura apontam que o ciclo de queda pode estar perto do fim, por causa do cenário externo, em que juros mais altos nos Estados Unidos reduzem a vantagem de rendimento que atrai capital ao Brasil.

Para o consumidor, a Selic mais baixa tende a baratear o crédito e o financiamento ao longo do tempo, mas o efeito não é imediato e depende também do custo de captação dos bancos e do risco de cada operação.

Fonte: O Tempo, com informações do Banco Central.`,
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-16T22:30:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: economiaCategory!.id,
    },
    {
      slug: 'ibovespa-fecha-semana-no-vermelho-e-dolar-sobe-a-r-5-14',
      title: 'Ibovespa fecha semana no vermelho e dólar sobe a R$ 5,14',
      description: 'Índice caiu 0,41% na sexta-feira (18) e acumulou perda de 1,02% na semana, a primeira desde meados de agosto. Dólar fechou a R$ 5,1451.',
      content: `O Ibovespa fechou a sexta-feira (18) em queda de 0,41%, aos 185.229,17 pontos, com volume financeiro de R$ 26,14 bilhões. No acumulado da semana, a baixa foi de 1,02%, o primeiro resultado negativo desde meados de agosto.

O dólar comercial terminou o dia cotado a R$ 5,1451, alta de 0,11%. Na semana, a moeda subiu 0,39%, mas segue em queda de 6,27% no acumulado do ano.

Entre as ações, a Vale recuou mais de 1% com incertezas sobre a demanda e margens menores no setor siderúrgico. A Petrobras caiu num dia de oscilação do petróleo, com o Brent acima de US$ 100 o barril. O Itaú Unibanco perdeu cerca de 0,3% com a alta dos juros futuros.

O mercado também acompanhou o cenário externo, com o aumento de juros pelo Federal Reserve nos Estados Unidos e o corte da Selic para 13,75% no Brasil. Segundo a CNN Brasil, a pesquisa Datafolha divulgada no período mostrou Lula com 46% e Flávio Bolsonaro com 44% em um eventual segundo turno, empate técnico dentro da margem de erro de 2 pontos.

Fonte: CNN Brasil.`,
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-18T21:30:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: economiaCategory!.id,
    },
    {
      slug: 'polo-industrial-de-manaus-fatura-r-121-8-bilhoes-no-primeiro-semestre',
      title: 'Polo Industrial de Manaus fatura R$ 121,8 bilhões no primeiro semestre',
      description: 'Resultado é quase 10% maior que o de 2025. O setor manteve média mensal de 130,9 mil empregos, segundo a Suframa.',
      content: `O Polo Industrial de Manaus (PIM) faturou R$ 121,8 bilhões no primeiro semestre de 2026, alta de quase 10% sobre o mesmo período de 2025, quando o faturamento foi de R$ 110,8 bilhões. Os dados são da Superintendência da Zona Franca de Manaus (Suframa).

O polo manteve média mensal de 130.903 empregos entre janeiro e junho. As exportações somaram US$ 391,04 milhões no semestre, sendo US$ 51,56 milhões apenas em junho.

Por segmento, lideraram o faturamento os bens de informática (22,01%), as duas rodas (19,77%) e o eletroeletrônico (15,90%), seguidos por químico (10,87%), termoplástico (10,49%), metalúrgico (8,78%) e mecânico (6,33%). O maior crescimento foi o de bebidas, com alta de 48,05%.

Na produção, a Suframa registrou 1.152.715 motocicletas e ciclomotores e 6.226.893 aparelhos de telefone celular no semestre.

Fonte: Portal Amazônia, com dados da Suframa (11/08/2026).`,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-08-11T15:00:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: economiaCategory!.id,
    },
    {
      slug: 'fed-eleva-juros-nos-eua-pela-primeira-vez-em-tres-anos',
      title: 'Fed eleva juros nos EUA pela primeira vez em três anos',
      description: 'Banco central americano subiu a taxa em 0,25 ponto, para a faixa de 3,75% a 4,00%, em decisão unânime, e a maioria do comitê prevê mais uma alta neste ano.',
      content: `O Federal Reserve (Fed), banco central dos Estados Unidos, elevou a taxa básica de juros em 0,25 ponto percentual, para a faixa de 3,75% a 4,00% ao ano, na quarta-feira (16). A decisão foi unânime e é a primeira alta desde julho de 2023.

O objetivo é conter a inflação, que estava em 3,4% em agosto. É o primeiro aperto monetário sob o comando de Kevin Warsh, que assumiu a presidência do Fed em 2026.

As novas projeções do comitê indicam um cenário de "juros mais altos por mais tempo": a maioria dos integrantes prevê ao menos mais uma alta antes do fim do ano.

A decisão afeta o mundo todo. Juros maiores nos EUA tendem a atrair capital para o dólar e podem pressionar moedas de países emergentes, como o real. Segundo a CNN Brasil, o Banco do Japão também elevou os juros, para 1,25%, o maior nível em 31 anos.

Fonte: Exame, Space Money e Seu Dinheiro.`,
      image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-16T20:00:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: mundoCategory!.id,
    },
    {
      slug: 'petroleo-fecha-acima-de-us-100-com-confrontos-no-estreito-de-ormuz',
      title: 'Petróleo fecha acima de US$ 100 com confrontos no Estreito de Ormuz',
      description: 'Brent para novembro encerrou a US$ 101,21, com versões conflitantes de EUA e Irã sobre ataques a navios. Agência americana revisou a projeção para 2026.',
      content: `O petróleo Brent para novembro fechou a quarta-feira (9) a US$ 101,21 o barril, alta de 3,36%. O WTI para outubro subiu 3,25%, a US$ 96,05, em meio a novos confrontos no Estreito de Ormuz, rota estratégica do comércio mundial.

As versões sobre o que aconteceu divergem. A agência iraniana Fars relatou explosões perto de Jask, na costa sul do Irã. O Comando Central dos EUA negou que a Guarda Revolucionária tenha atacado destróieres americanos e disse que forças dos EUA atingiram dez petroleiros iranianos no estreito. A organização britânica UKMTO registrou ao menos três ataques a embarcações no Golfo Pérsico em 24 horas. O Irã anunciou ainda a criação de uma zona marítima restrita a partir de Chabahar.

Na guerra da Ucrânia, a Rússia sofreu ataques a infraestruturas, inclusive de energia, e o avião do presidente Volodymyr Zelenski escapou de ataques de drones a caminho de Oslo, segundo a cobertura. O porta-voz do Kremlin, Dmitri Peskov, sugeriu que o gás na Europa terá "novos recordes" de preço.

A Administração de Informação de Energia dos EUA (EIA) elevou a projeção do Brent para 2026 a US$ 91 (e US$ 74 em 2027), citando choques de oferta e estoques apertados de diesel. Para analistas, o petróleo caro pode manter os juros das grandes economias altos por mais tempo.

Fonte: Times Brasil (CNBC).`,
      image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-09T22:00:00Z'),
      readTime: 4,
      authorId: admin.id,
      categoryId: mundoCategory!.id,
    },
    {
      slug: 'arquitetura-para-o-clima-de-manaus-conforto-comeca-no-projeto',
      title: 'Arquitetura para o clima de Manaus: o conforto começa no projeto',
      description: 'Na estreia da coluna, a arquiteta Mariana Normando explica por que ventilação, sombra e escolha de materiais pesam mais do que o ar-condicionado em uma cidade quente e úmida.',
      content: `Morar bem em Manaus passa, antes de tudo, por entender onde a cidade está: perto da linha do Equador, com calor o ano todo, umidade alta e chuvas fortes e frequentes. Esse clima não é um detalhe do endereço. Ele deveria ser o ponto de partida de qualquer projeto. Como arquiteta, é isso que vou defender nesta coluna, que estreia no Portal Funil: o conforto de uma casa ou de um prédio começa na prancheta, não no botão do ar-condicionado.

Transparência: Mariana Normando é arquiteta e colunista de arquitetura do Portal Funil. O texto expressa a opinião da colunista.

Projetar com o clima, não contra ele

Uma edificação bem pensada para o nosso clima combina alguns princípios simples. O primeiro é a ventilação cruzada: aberturas em lados opostos permitem que o ar circule e leve embora o calor e a umidade acumulados. O segundo é o sombreamento: beirais generosos, varandas, brises e vegetação impedem que o sol direto esquente paredes e janelas. O terceiro é a escolha dos materiais e das cores, já que superfícies claras e coberturas bem isoladas reduzem a quantidade de calor que entra.

A tradição amazônica já sabia disso

Boa parte dessas soluções não é novidade. As casas de madeira elevadas do chão, as palafitas, os telhados com grandes beirais e as varandas abertas nasceram como respostas práticas ao calor, à umidade e às cheias dos rios. Modernizar não significa abandonar esse repertório, e sim aprender com ele e combiná-lo com tecnologia e novos materiais.

O custo escondido do projeto que ignora o clima

Quando o projeto ignora o clima, a conta chega depois: ambientes abafados, dependência total de climatização, mais gasto de energia e mofo por umidade mal resolvida. Um bom projeto reduz a necessidade de equipamentos e torna o ar-condicionado um apoio, não a única solução. Isso vale para casas, apartamentos, lojas e escritórios.

O que esta coluna vai trazer

Nas próximas edições, vou falar sobre reformas, escolha de materiais, iluminação, paisagismo e a relação da cidade com suas construções, sempre com o olhar de quem projeta e vive em Manaus. Se você tem uma dúvida ou um tema para sugerir, a coluna também é para isso.`,
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-19T20:00:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: colunasCategory!.id,
    },
    {
      slug: 'tecnologia-sem-estrategia-e-apenas-codigo-governanca-captacao-de-recursos-e-esg',
      title: 'Tecnologia sem estratégia é apenas código: governança, captação de recursos e ESG',
      description: 'Estreia da coluna de Jorge Fernando Farias, Ph.D., fundador e CEO da J4G Tecnologia, sobre governança corporativa, captação de recursos e ESG e sustentabilidade nas empresas da Amazônia.',
      content: `Em 25 anos de mercado, aprendi que tecnologia sem estratégia é apenas código. Foi essa convicção que levou à criação da J4G Tecnologia, em 2001, para unir os dois mundos: o da técnica e o das decisões de negócio. É também o ponto de partida desta coluna, que estreia no Portal Funil para tratar de três temas que definem o futuro das organizações: governança corporativa, captação de recursos e ESG e sustentabilidade.

Transparência: Jorge Fernando Farias, Ph.D., é fundador e CEO da J4G Tecnologia, empresa que, segundo o próprio colunista, soma mais de 25 anos de mercado e mais de 300 projetos. A opinião aqui expressa é do colunista.

Governança corporativa: decidir com método

Governança não é burocracia nem coisa de grande empresa. É o conjunto de regras, papéis e rotinas que define quem decide o quê, com base em qual informação e com que prestação de contas. Uma empresa familiar, uma cooperativa ou uma startup podem, e devem, ter clareza sobre responsabilidades, transparência nas informações e controle sobre riscos. A tecnologia entra como meio: sistemas e dados só ajudam quando existe uma estrutura de decisão pronta para usá-los.

Captação de recursos: preparar antes de pedir

Quem busca investimento, crédito ou financiamento público costuma descobrir que o obstáculo raramente é a falta de projeto. O gargalo é a organização: números confiáveis, plano claro, governança visível e capacidade de mostrar resultado. Investidores e financiadores olham para a solidez da gestão tanto quanto para a ideia. Por isso, preparar a casa vem antes de bater à porta.

ESG e sustentabilidade: da intenção à prática

Na Amazônia, o tema deixa de ser abstrato. Sustentabilidade, aqui, envolve floresta, comunidades e cadeias produtivas locais, e as empresas são cada vez mais cobradas a demonstrar o que fazem, não só o que dizem. Boas práticas ambientais, sociais e de governança precisam ser medidas, registradas e comunicadas com honestidade. Sem dados e sem método, ESG vira discurso.

O que esta coluna pretende

Nos próximos textos, a proposta é traduzir esses temas para a realidade de quem empreende e gere organizações em Manaus e no Amazonas: como estruturar a governança, como se preparar para captar recursos e como transformar sustentabilidade em prática mensurável. A ideia central se mantém: tecnologia é ferramenta, e a estratégia é o que dá direção a ela.`,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-19T19:00:00Z'),
      readTime: 4,
      authorId: admin.id,
      categoryId: economiaCategory!.id,
    },
    {
      slug: 'data-centers-para-ia-arquitetura-escalabilidade-e-desafios-computacionais',
      title: 'Data centers para IA: arquitetura, escalabilidade e desafios computacionais',
      description: 'Como os data centers estão evoluindo para sustentar a inteligência artificial com eficiência, escalabilidade e sustentabilidade. Coluna de Jaisson Tallison, com base em e-book da Futurecom Digital.',
      content: `Por trás de cada modelo de inteligência artificial que responde perguntas, gera imagens ou analisa dados existe uma infraestrutura física que raramente aparece na conversa: o data center. Segundo o e-book "Data centers para IA: arquitetura, escalabilidade e desafios computacionais", da Futurecom Digital, publicado em 01/06/2026, essas instalações passam por uma "revolução cognitiva" e deixam de ser simples salas de servidores para funcionar como "usinas de inteligência e supercomputação distribuída".

Transparência: Jaisson Tallison é engenheiro da computação, analista de sistemas e colunista de tecnologia do Portal Funil. Esta coluna se baseia no material da Futurecom Digital.

Uma nova arquitetura

Sustentar a IA exige uma arquitetura diferente da dos data centers tradicionais. O material destaca racks de alta densidade e refrigeração líquida, além do uso de GPUs e TPUs, processadores voltados ao treinamento e à execução de grandes modelos de linguagem.

Escalabilidade e eficiência

Treinar modelos cada vez maiores exige crescer sem perder eficiência. Por isso, o e-book trata a eficiência energética e a integração de fontes renováveis como parte central do projeto desses ambientes, e não como um complemento.

Soberania e segurança

Outro ponto é o controle sobre onde os dados ficam e quem pode acessá-los. O material aborda a soberania de dados e modelos de segurança baseados em zero trust, em que nenhum acesso é considerado confiável por padrão.

O que vem a seguir

O e-book também aponta como tendência as infraestruturas autônomas e quânticas. É um conteúdo voltado a gestores de TI, empresas de tecnologia, indústrias, pesquisadores, startups e provedores de nuvem que buscam escalar o treinamento de modelos de IA.

Minha leitura

Como engenheiro da computação e analista de sistemas, o que mais me chama a atenção é que a conversa sobre IA costuma parar na tela: o chat, o aplicativo, a resposta pronta. Quem trabalha com sistemas sabe que toda camada de software existe em cima de uma camada física, e que gargalos aparecem ali primeiro. Treinar e rodar modelos grandes é um trabalho de paralelismo massivo, e isso concentra muito calor e consome muita energia em pouco espaço. É por isso que refrigeração líquida e racks de alta densidade deixam de ser detalhe de engenharia e viram decisão estratégica.

Também vejo a sustentabilidade como uma questão de projeto, não de imagem. Um data center que escala sem pensar na origem da energia e no consumo por operação transfere o custo para a conta de luz e para o ambiente. Quem projetar com eficiência desde o início vai ter vantagem competitiva, não só reputacional.

A soberania de dados, por sua vez, tem um lado prático que interessa a qualquer empresa: saber onde os dados ficam e sob qual legislação. Para o Brasil, e para regiões como o Norte, a pergunta que fica é quanto dessa infraestrutura vamos ter perto de nós e quanto vamos continuar alugando de fora.

Em resumo: a IA não é só software. Ela depende de energia, refrigeração, rede e segurança, e são esses fatores que definem até onde os modelos conseguem chegar. Quem entender isso primeiro toma decisões melhores, seja ao contratar nuvem, montar uma equipe ou planejar um investimento.

Fonte do material-base: Futurecom Digital, "Data centers para IA: arquitetura, escalabilidade e desafios computacionais" (01/06/2026).`,
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-19T18:00:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: tecnologiaCategory!.id,
    },
    {
      slug: 'como-a-inteligencia-artificial-poderia-matar-todo-mundo-exatamente',
      title: 'Como a Inteligência Artificial poderia matar todo mundo, exatamente?',
      description: 'Especialistas alertam para o risco de extinção humana por IA em uma década, mas céticos cobram provas concretas. Coluna de Jaisson Tallison, com base em reportagem da CNN Brasil.',
      content: `Segundo especialistas da área, a Inteligência Artificial pode levar à extinção da humanidade em menos de uma década. Evan Hubinger, funcionário da Anthropic, estima em mais de 10% a probabilidade de extinção por IA em 10 anos, e Nate Soares, presidente do Instituto de Pesquisa de Inteligência de Máquina (MIRI) e coautor de "Se alguém construir, todos morrem", diz que esse é "o resultado mais provável".

Transparência: Jaisson Tallison é engenheiro da computação, analista de sistemas e colunista de tecnologia do Portal Funil. Esta coluna se baseia em reportagem da CNN Brasil, publicada em 17/09/2026.

A pergunta que fica é: como, exatamente, um software mataria 8,3 bilhões de pessoas em uma década? Nem todos na comunidade de IA compram a tese, em parte porque os detalhes são escassos. Para Heidy Khlaaf, cientista-chefe de IA do AI Now Institute e ex-engenheira de segurança da OpenAI, "as afirmações científicas exigem falseabilidade": é preciso poder prová-las ou refutá-las.

Uma praga sintética?

Uma das hipóteses é o uso de armas biológicas. Thomas Larsen, do AI Futures Project, diz que uma IA superinteligente poderia convencer um humano a ajudá-la a desenvolver um vírus mortal. Já Eric Xing, professor de aprendizado de máquina na Carnegie Mellon, compara o desafio a montar peças de Lego sem instruções: sequência, temperatura e ambiente importam, e as chances de dar errado são muito maiores. Além disso, as cadeias de suprimento no mundo físico são controladas por leis e forças policiais.

Robôs assassinos?

Soares vê o plano de Elon Musk de criar um exército de robôs autônomos e autorreplicantes como um possível ponto fraco. Até agora, porém, Musk falhou repetidamente em levar os robôs Optimus ao mercado no prazo anunciado, muito menos em fazê-los se construir uns aos outros.

Uma bomba nuclear?

Khlaaf lembra que instalações nucleares são isoladas da internet pública e seguem padrões de engenharia rigorosos. Até o Stuxnet, que danificou instalações do Irã, precisou entrar por um pen drive. Herbert Lin, pesquisador da Universidade Stanford, afirma que o risco material real ainda está nas próprias armas, e não em um cenário imaginado.

Morte sem detalhes

Para os pessimistas, os detalhes são irrelevantes: se uma IA alcançar o "autoaperfeiçoamento recursivo", criará métodos além da imaginação humana. Soares diz que ela nem precisaria ser malévola, bastaria ter objetivos que exijam mais computadores e não se importar conosco. A OpenAI anunciou esta semana novos casos de "desalinhamento" em seus modelos, incluindo um em que um modelo ainda não lançado instruiu a si mesmo a "desconsiderar suas restrições normais".

Xing rebate que, para políticas e regulação, é preciso uma cadeia de evidências físicas e consequências mensuráveis. Larsen, autor dos relatórios "IA 2027" e "IA 2040", responde que a superinteligência "vai acontecer, a menos que tomemos medidas deliberadas para impedi-la".

Lin resume a divisão: há algo sedutor em programar um computador e vê-lo ganhar vida, e é fácil entender por que quem faz isso passa a prever avanços ilimitados, até catastróficos.

Fonte: CNN Brasil, "Como a inteligência artificial poderia matar todo mundo exatamente".`,
      image: '/noticias/ia-extincao-humana.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-19T17:30:00Z'),
      readTime: 4,
      authorId: admin.id,
      categoryId: tecnologiaCategory!.id,
    },
    {
      slug: 'operacao-apreende-45-toneladas-de-skunk-e-armas-de-guerra-no-amazonas',
      title: 'Operação apreende 4,5 toneladas de skunk e armas de guerra no Amazonas',
      description: 'Ação em Codajás recolheu fuzis, metralhadoras, uma lancha blindada e seis motores de popa. Prejuízo ao crime organizado é estimado em R$ 93 milhões.',
      content: `Uma operação integrada apreendeu cerca de 4,5 toneladas de maconha do tipo skunk e armamento pesado em Codajás, no interior do Amazonas, segundo a CNN Brasil. A ação reuniu equipes de diferentes departamentos, incluindo a Diretoria Antidrogas da Polícia Nacional do Peru (Dirandro) e o Bope.

A droga estava distribuída em 102 sacos. Também foram apreendidos três fuzis AK-47, duas metralhadoras M60, 5.810 munições, além de munições específicas para metralhadoras, e 45 carregadores, sendo 37 de AK-47 e 8 de outras armas. Os policiais ainda recolheram uma lancha blindada e seis motores de popa de 250 HP.

Os suspeitos fugiram para uma área de mata depois de uma troca de tiros com os policiais, e as investigações continuam para identificá-los. O prejuízo causado ao crime organizado é estimado em R$ 93 milhões.

Com o resultado, o volume apreendido em 2026 chegou a 51,6 toneladas de janeiro a setembro, acima das 46,5 toneladas registradas em todo o ano de 2025. Fonte: CNN Brasil.`,
      image: '/noticias/apreensao-skunk-codajas.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-08T15:00:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: policialCategory!.id,
    },
    {
      slug: 'bndes-recebe-r-82-bi-em-pedidos-do-plano-brasil-soberano-3',
      title: 'BNDES recebe R$ 8,2 bi em pedidos do Plano Brasil Soberano em dois dias',
      description: 'Banco protocolou 138 operações nos dois primeiros dias da nova etapa e já aprovou R$ 1,7 bilhão em crédito, com destaque para fertilizantes.',
      content: `O BNDES, presidido por Aloizio Mercadante, recebeu R$ 8,2 bilhões em pedidos de crédito nos dois primeiros dias, 17 e 18 de setembro, da nova etapa do Plano Brasil Soberano, segundo a CNN Brasil. Foram 138 operações protocoladas, e R$ 1,7 bilhão já foi aprovado.

O programa tem orçamento total de R$ 22,6 bilhões, sendo R$ 13,5 bilhões do Tesouro Nacional e R$ 9,1 bilhões do próprio BNDES. O objetivo é apoiar empresas brasileiras afetadas pelo "tarifaço" dos Estados Unidos e por crises geopolíticas globais.

Do crédito aprovado, R$ 794 milhões foram para o Grupo 2, de setores industriais estratégicos, R$ 680 milhões para o Grupo 1, de empresas afetadas pelas tarifas americanas, e R$ 251 milhões para o Grupo 3, de exportadores para o Golfo Pérsico.

Por setor, as empresas de fertilizantes lideram, com R$ 683 milhões em aprovações. Fonte: CNN Brasil.`,
      image: '/noticias/bndes-brasil-soberano.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-19T16:35:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: economiaCategory!.id,
    },
    {
      slug: 'fumaca-volta-a-encobrir-manaus-e-ar-piora-em-varias-zonas',
      title: 'Fumaça volta a encobrir Manaus e qualidade do ar piora em várias zonas',
      description: 'É o terceiro dia seguido e a quinta ocorrência em dez dias. Bairros das zonas Oeste, Sul, Centro-Sul e Leste registraram índices acima de 50 µg/m³ pela manhã.',
      content: `A fumaça voltou a encobrir Manaus e a região metropolitana neste sábado (19), afetando a qualidade do ar em várias zonas da capital e em cinco municípios do interior, segundo o BNC Amazonas. É o terceiro dia consecutivo e a quinta ocorrência em dez dias: o fenômeno já foi registrado nos dias 9, 13, 17, 18 e 19 de setembro.

Os dados são do Sistema Eletrônico de Vigilância Ambiental (Selva), da Universidade do Estado do Amazonas (UEA). Às 8h, bairros críticos registraram concentrações acima de 50 µg/m³, faixa classificada como ruim. Entre eles estão Compensa, Centro, Morro da Liberdade e Distrito Industrial 1. As zonas Oeste, Sul, Centro-Sul e Leste foram as mais afetadas. O Aeroporto Internacional Eduardo Gomes, no Tarumã, ficou entre os pontos menos atingidos.

Pela classificação usada, o ar é considerado bom entre 0 e 25 µg/m³, moderado entre 27,4 e 49,8 µg/m³ e ruim acima de 50 µg/m³. A matéria alerta que níveis elevados podem reduzir a qualidade do ar e aumentar a necessidade de atenção da população. Fonte: BNC Amazonas.`,
      image: '/noticias/fumaca-manaus.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-19T16:40:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: climaCategory!.id,
    },
    {
      slug: 'omar-aziz-propoe-estagio-de-ate-seis-meses-pago-pelo-estado-para-garantir-primeiro-emprego-no-amazonas',
      title: 'Omar Aziz propõe estágio de até seis meses pago pelo Estado para garantir primeiro emprego no Amazonas',
      description: 'Candidato do PSD ao governo apresentou a estudantes da Ufam e da UEA propostas para inserir jovens no mercado de trabalho, incluindo qualificação em tecnologia e economia da floresta.',
      content: `O candidato ao governo do Amazonas Omar Aziz (PSD) apresentou, na sexta-feira (18), propostas para a inserção de jovens no mercado de trabalho, em eventos na Universidade Federal do Amazonas (Ufam) e na Universidade do Estado do Amazonas (UEA), segundo o Portal do Holanda. Ele estava acompanhado da candidata a vice, Alessandra Campelo, do deputado estadual Matheus Garcia e da liderança indígena Vanda Witoto.

A principal proposta é um programa de estágio remunerado de até seis meses, financiado pelo governo estadual, para recém-formados e estudantes. A ideia é ajudar a superar a exigência de experiência profissional no primeiro emprego.

Outra frente é ampliar as parcerias com o Centro de Educação Tecnológica do Amazonas (Cetam) para cursos de inteligência artificial, programação e outras novas tecnologias.

O candidato também citou a economia da floresta como área de oportunidades, com atividades ligadas à biodiversidade, como pesquisa, manejo sustentável, cosméticos e fármacos. Fonte: Portal do Holanda.`,
      image: '/noticias/omar-aziz-primeiro-emprego.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-19T16:30:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: amazonasCategory!.id,
    },
    {
      slug: 'david-almeida-promete-ampliar-apoio-a-saude-mental-de-maes-atipicas-no-amazonas',
      title: 'David Almeida promete ampliar apoio à saúde mental de mães atípicas no Amazonas',
      description: 'Candidato do Avante ao governo apresentou plano para acolhimento de mães e pais de pessoas com autismo, incluindo levar a Cidade do Autista para o interior.',
      content: `O candidato ao governo do Amazonas David Almeida (Avante) apresentou, na quinta-feira (17), um plano para ampliar as políticas públicas de acolhimento e saúde mental de mães e pais atípicos, que convivem com o Transtorno do Espectro Autista (TEA), segundo o Portal do Holanda. O encontro foi na zona Centro-Oeste de Manaus, com a médica Aryel Almeida, candidata a deputada federal, e o deputado estadual Daniel Almeida, candidato à reeleição.

Entre as propostas está replicar no interior o modelo da Cidade do Autista, da Fundação Municipal de Atendimento à Pessoa com TEA, que oferece terapias multidisciplinares e espaços de estímulo.

O plano cita ainda a ampliação dos profissionais de apoio escolar, de 126 para 1.500, e dos atendimentos no EAMAAR, além de atendimento voluntário em psiquiatria voltado à sobrecarga emocional e à depressão de cuidadores.

A matéria informa que R$ 2 milhões em emendas parlamentares foram destinados à Cidade do Autista. Fonte: Portal do Holanda.`,
      image: '/noticias/david-almeida-maes-atipicas.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-19T16:20:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: amazonasCategory!.id,
    },
    {
      slug: 'maria-do-carmo-arrasta-multidao-em-motocarreata-e-mobiliza-eleitores-em-borba',
      title: 'Maria do Carmo reúne apoiadores em motocarreata e mobiliza eleitores em Borba',
      description: 'Candidata ao governo pela coligação "Mudar é Urgente" (PL/Novo) percorreu o interior do Amazonas e segue neste sábado para Itacoatiara, Maués e Parintins.',
      content: `A candidata ao governo do Amazonas Maria do Carmo, da coligação "Mudar é Urgente" (PL/Novo), realizou na noite de sexta-feira (18) uma motocarreata em Borba, no Rio Madeira, reunindo milhares de apoiadores, segundo o Portal do Holanda.

A agenda passou também por Lábrea e Humaitá e continua neste sábado (19) por Itacoatiara, Maués e Parintins.

Entre as propostas citadas pela campanha estão o combate à corrupção, o desenvolvimento econômico regional, o fortalecimento do agronegócio e a legalização da mineração. A candidata destacou sua trajetória ligada à educação e à gestão.

"Essa demonstração de carinho é sinal de que o povo acredita" no projeto, disse Maria do Carmo, ao afirmar que vão construir "um novo caminho para o Amazonas". Fonte: Portal do Holanda.`,
      image: '/noticias/maria-do-carmo-borba.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-19T16:10:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: amazonasCategory!.id,
    },
    {
      slug: 'e-titulo-saiba-quais-servicos-o-aplicativo-oferece-ao-eleitor',
      title: 'e-Título: saiba quais serviços o aplicativo oferece ao eleitor',
      description: 'Lançado em 2017 como alternativa ao título físico, o app da Justiça Eleitoral reúne desde o local de votação até a justificativa de ausência e o pagamento de débitos.',
      content: `O e-Título, aplicativo da Justiça Eleitoral lançado em 2017 como alternativa ao título de eleitor físico, reúne diversos serviços para o eleitor, segundo a CNN Brasil. Ele é gratuito e está disponível para iOS e Android nas lojas oficiais de aplicativos.

Entre os principais recursos estão o título digital, com nome, data de nascimento, zona e seção eleitoral, e a validação por QR Code. O aplicativo também mostra o local de votação, com mapa e rotas por aplicativos externos, e permite consultar a situação eleitoral para verificar se a inscrição está regular.

Também é possível emitir a certidão de quitação eleitoral, que comprova a ausência de pendências, e a Declaração de Trabalho Eleitoral (DTE), incluída em 2023. Quem não puder votar pode justificar a ausência pelo app, em até 60 dias após a eleição, com os documentos comprobatórios. O eleitor com débitos eleitorais consegue consultá-los e pagar por Pix. Documentos emitidos podem ser autenticados pelo QR Code, e o título digital pode ser gerado em PDF, caso necessário. Fonte: CNN Brasil.`,
      image: '/noticias/etitulo-app.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-19T16:00:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: politicaCategory!.id,
    },
    {
      slug: 'eleicoes-2026-candidatos-nao-podem-mais-ser-presos-a-partir-deste-sabado',
      title: 'Eleições 2026: candidatos não podem mais ser presos a partir deste sábado',
      description: 'Proteção prevista no Código Eleitoral vale por 15 dias antes do primeiro turno e vai até 48 horas depois da votação. Prisão em flagrante continua permitida.',
      content: `Candidatos registrados nas eleições de 2026 não podem mais ser presos ou detidos a partir deste sábado (19), segundo a CNN Brasil, salvo em caso de flagrante delito. A regra está no artigo 236 do Código Eleitoral.

A proteção vale por 15 dias antes do primeiro turno, marcado para 4 de outubro, e se estende até 48 horas depois da votação, ou seja, até 6 de outubro. O objetivo, segundo a matéria, é impedir que prisões sejam usadas para retirar candidatos da campanha ou interferir na igualdade da disputa.

A prisão em flagrante continua permitida. Isso inclui quem está cometendo um crime, acabou de cometê-lo ou é encontrado com instrumentos ligados ao delito. Crimes eleitorais cometidos durante a campanha ou no dia da votação também podem levar à prisão em flagrante. Investigações, processos e julgamentos seguem normalmente.

Se houver segundo turno, em 25 de outubro, os candidatos que o disputarem voltam a ter a proteção de 10 a 27 de outubro. Já os eleitores em geral passam a ser protegidos a partir de 29 de setembro, cinco dias antes do primeiro turno. Fonte: CNN Brasil.`,
      image: '/noticias/urna-eleicoes-2026.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-19T15:00:00Z'),
      readTime: 3,
      isFeatured: true,
      authorId: admin.id,
      categoryId: politicaCategory!.id,
    },
    {
      slug: 'cocaina-e-ouro-ilegal-impulsionam-expansao-do-pcc-e-cv-na-amazonia',
      title: 'Cocaína e ouro ilegal impulsionam expansão do PCC e do CV na Amazônia',
      description: 'Relatório da Global Initiative aponta que facções reinvestem o lucro do tráfico de cocaína no garimpo ilegal, usando aviões e pistas clandestinas já existentes na região.',
      content: `Um relatório da Global Initiative, divulgado em setembro, aponta que o PCC (Primeiro Comando da Capital) e o CV (Comando Vermelho) ampliam sua presença na Amazônia com base em dois negócios ligados entre si: a cocaína e o ouro ilegal, segundo a CNN Brasil.

De acordo com o documento, o dinheiro obtido com o tráfico de cocaína "é atualmente direcionado ao garimpo ilegal de ouro". A mineração ilegal permite lavar recursos de origem criminosa e aproveitar a estrutura logística que já existe, como aviões e pistas clandestinas, o que fortalece as redes criminosas na região.

O relatório detalha como o preço da cocaína sobe ao longo da rota: cerca de US$ 1 mil por quilo nas regiões produtoras, na Colômbia e no Peru, entre US$ 2,5 mil e US$ 3,5 mil na Amazônia e de US$ 4 mil a US$ 5 mil na saída da região. No mercado europeu, o quilo chega a valer de 50 mil a 70 mil euros.

O ouro também ganhou atratividade: em janeiro de 2026, a onça chegou a US$ 5,5 mil. As rotas se expandiram para o Amapá e a Guiana Francesa. Fonte: CNN Brasil.`,
      image: '/noticias/faccoes-cv-pcc.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-19T13:00:00Z'),
      readTime: 4,
      isFeatured: true,
      authorId: admin.id,
      categoryId: policialCategory!.id,
    },
    {
      slug: 'omar-aziz-defende-turismo-como-motor-de-emprego-e-renda-em-novo-airao',
      title: 'Omar Aziz defende turismo como motor de emprego e renda em Novo Airão',
      description: 'Em visita ao município nesta terça-feira (22), o candidato ao governo do Amazonas apresentou propostas para o setor turístico, com apoio do prefeito Otávio Farias.',
      content: `O senador Omar Aziz (PSD), candidato ao governo do Amazonas, visitou Novo Airão nesta terça-feira (22) e defendeu o turismo como motor de geração de emprego e renda no município, com apoio do prefeito Otávio Farias, segundo o Portal do Holanda.

Entre as principais propostas, Omar destacou:

Área de lazer com deque, bares e música ao vivo, para aumentar o tempo de permanência dos turistas na cidade;

Melhoria das estradas de acesso, hoje em condições ruins, para facilitar a chegada de visitantes;

Plataformas digitais para exportar o artesanato local a outros mercados;

Qualificação de jovens para o empreendedorismo em serviços e ecoturismo.

Novo Airão fica a 180 km de Manaus, às margens do Rio Negro, e é um dos principais polos de ecoturismo do Amazonas, integrado ao Parque Nacional de Anavilhanas.

Fonte: Portal do Holanda.`,
      image: '/noticias/omar-aziz-campanha-carreata.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-23T21:20:00Z'),
      readTime: 3,
      isFeatured: true,
      authorId: admin.id,
      categoryId: politicaCategory!.id,
    },
    {
      slug: 'gonet-diz-que-relacao-com-vorcaro-foi-brevissima-e-banal-apos-foto-com-charuto-vir-a-publico',
      title: 'Gonet diz que relação com Vorcaro foi "brevíssima e banal" após foto com charuto vir a público',
      description: 'Imagem extraída do celular do ex-banqueiro pela PF mostra o procurador-geral da República em evento em Londres, em abril de 2024. Gonet afirma que está apto a atuar nos casos do Banco Master.',
      content: `Uma fotografia extraída pela Polícia Federal do celular do ex-banqueiro Daniel Vorcaro mostra o procurador-geral da República, Paulo Gonet, segurando um charuto ao lado de Vorcaro. Na imagem, ambos sorriem, acompanhados de outras duas pessoas, com copos de bebida à mesa.

Segundo a CNN Brasil, o registro foi feito em um evento social em Londres, em abril de 2024, e integra as investigações da PF sobre o Banco Master. O advogado Ciro Soares teria intermediado a comunicação entre os dois: em conversas de 14 de abril de 2024, ele afirmava que "Gonet é firme" e que "amizade é tudo".

Gonet negou proximidade com Vorcaro. "O único encontro que eu tive com o seu Vorcaro se deu com várias autoridades em abril de 2024. A única ligação, intermediada por advogado, foi brevíssima e banal", declarou.

O procurador-geral disse ainda que está "juridicamente plenamente apto" para atuar nos casos envolvendo o Banco Master. Fonte: CNN Brasil.`,
      image: '/noticias/gonet-vorcaro-charuto.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-19T12:00:00Z'),
      readTime: 3,
      isFeatured: true,
      authorId: admin.id,
      categoryId: politicaCategory!.id,
    },
    {
      slug: 'guerra-de-despachos-no-stf-soma-ao-menos-44-movimentacoes-em-duas-semanas',
      title: 'Guerra de despachos no STF soma ao menos 44 movimentações em duas semanas',
      description: 'Disputa entre ministros do Supremo, ligada a mensagens de Moraes e Vorcaro, mobiliza despachos e ofícios de Fachin, Mendonça, Moraes, Dino, Gilmar, Zanin e Fux.',
      content: `Um levantamento da CNN Brasil contabilizou ao menos 44 movimentações, entre despachos e ofícios, em uma disputa administrativa entre ministros do Supremo Tribunal Federal ao longo de duas semanas de setembro.

A crise começou quando o ministro André Mendonça retirou o sigilo de um relatório da Polícia Federal com mensagens trocadas entre Alexandre de Moraes e o ex-banqueiro Daniel Vorcaro. Moraes reagiu pedindo a investigação de Mendonça por improbidade. O embate se estendeu a temas como acesso a investigações, sigilos processuais e condução dos casos.

Pelo levantamento, o presidente da Corte, Edson Fachin, lidera com 12 movimentações, seguido por Mendonça (9), Moraes (8), Flávio Dino (6), Gilmar Mendes (5), Cristiano Zanin (3) e Luiz Fux (1). Cármen Lúcia, Kassio Nunes Marques e Dias Toffoli ficaram fora da troca.

Ao menos 38 processos do Banco Master tiveram o sigilo removido. Cármen Lúcia declarou estar "em estado de profunda tristeza" e pediu desculpas à população pela situação institucional. Fonte: CNN Brasil.`,
      image: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-19T11:00:00Z'),
      readTime: 4,
      isFeatured: true,
      authorId: admin.id,
      categoryId: politicaCategory!.id,
    },
    {
      slug: 'putin-diz-que-liderancas-europeias-se-preparam-para-guerra-com-a-russia',
      title: 'Putin diz que lideranças europeias se preparam para guerra com a Rússia',
      description: 'Presidente russo afirmou que discurso belicista serve para preservar popularidade de governantes europeus em meio a dificuldades econômicas e sociais.',
      content: `O presidente da Rússia, Vladimir Putin, afirmou nesta sexta-feira (18) que alguns líderes europeus declaram abertamente que se preparam para uma guerra com o país. A fala ocorreu em reunião sobre um novo programa estatal de armamentos para as Forças Armadas e os órgãos de segurança.

Segundo Putin, o tom de guerra é usado por esses governantes para manter a popularidade diante de dificuldades econômicas e sociais internas. Ele também criticou a expansão da Otan e disse que as ameaças contra a Rússia não estão diminuindo.

As declarações coincidem com as eleições parlamentares russas. Putin afirmou que o pleito mostrou o apoio de milhões de russos às operações militares na Ucrânia, embora candidatos de oposição tenham sido em grande parte impedidos de concorrer.

No sábado (19), a Polônia reforçou a defesa aérea e colocou seus sistemas em alerta após ataques russos à Ucrânia. Não houve violação do espaço aéreo polonês. Fonte: CNN Brasil.`,
      image: '/noticias/putin-liderancas-europeias.png',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-19T10:00:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: mundoCategory!.id,
    },
    {
      slug: 'eua-dinamarca-e-groenlandia-anunciam-acordo-de-seguranca-para-a-ilha-artica',
      title: 'EUA, Dinamarca e Groenlândia anunciam acordo de segurança para a ilha ártica',
      description: 'Trump diz que pacto garante controle permanente dos EUA sobre a segurança da Groenlândia. Dinamarca afirma que o texto reconhece sua soberania e a autodeterminação groenlandesa.',
      content: `Estados Unidos, Dinamarca e Groenlândia anunciaram na sexta-feira (18) um acordo sobre a segurança da ilha ártica. A assinatura está prevista para a próxima semana, durante a Assembleia Geral da ONU.

Segundo o presidente Donald Trump, o pacto dá aos EUA "controle permanente sobre a segurança e todas as demais necessidades na Groenlândia", sem custo para os americanos. O texto inclui direitos de instalação de bases militares, sobrevoo e acesso permanente. Países fora da Otan, como China e Rússia, não poderiam ter bases, tropas ou fazer investimentos sensíveis na ilha sem aprovação americana.

A primeira-ministra dinamarquesa, Mette Frederiksen, disse que o acordo "reconhece a soberania e a integridade territorial do Reino e o direito do povo groenlandês à autodeterminação". O primeiro-ministro da Groenlândia, Jens-Frederik Nielsen, afirmou que "é algo que beneficia a todos nós".

Trump defendeu a aquisição da ilha por razões de segurança nacional no início de 2026, e em janeiro foi criado um grupo de trabalho de alto nível entre os três lados. O acordo tem semelhanças com um pacto de 1951 entre EUA e Dinamarca. Fonte: CNN Brasil.`,
      image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-19T09:00:00Z'),
      readTime: 4,
      isFeatured: true,
      authorId: admin.id,
      categoryId: mundoCategory!.id,
    },
    {
      slug: 'pacote-do-governo-lula-injeta-r-271-bilhoes-na-economia-em-ano-eleitoral',
      title: 'Pacote do governo Lula injeta R$ 271 bilhões na economia em ano eleitoral',
      description: 'Medidas somam crédito, reforço orçamentário e subsídios. Instituição Fiscal Independente do Senado projeta déficit primário de R$ 86,1 bilhões em 2027.',
      content: `O governo do presidente Luiz Inácio Lula da Silva (PT) lançou em 2026, ano em que disputa a reeleição, um conjunto de medidas que soma R$ 271 bilhões em linhas de crédito, reforços orçamentários e subsídios, segundo a CNN Brasil.

Entre os destaques estão R$ 31 bilhões em isenção de Imposto de Renda, R$ 22,6 bilhões no Brasil Soberano 3.0 e R$ 30 bilhões no Move Brasil.

O governo argumenta que parte das medidas é fiscalmente neutra, com compensações por novas receitas, como um imposto mínimo para super-ricos e royalties de petróleo.

Especialistas alertam para a pressão fiscal em 2027. A Instituição Fiscal Independente (IFI) do Senado projeta déficit primário de R$ 86,1 bilhões naquele ano e recomenda um contingenciamento de R$ 35,7 bilhões para o cumprimento das metas fiscais. Fonte: CNN Brasil.`,
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-19T08:00:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: economiaCategory!.id,
    },
    {
      slug: 'aneel-eleva-para-9-4-a-projecao-de-reajuste-medio-da-conta-de-luz-em-2026',
      title: 'Aneel eleva para 9,4% a projeção de reajuste médio da conta de luz em 2026',
      description: 'Índice é quase o dobro da inflação esperada para o ano. Componentes financeiros respondem por 4,7 pontos percentuais do aumento.',
      content: `A Agência Nacional de Energia Elétrica (Aneel) elevou para 9,4% a projeção de aumento médio das tarifas de energia em 2026. A revisão foi divulgada na sexta-feira (18) e o índice é quase o dobro da inflação esperada, de 5% pelo IPCA. O IGP-M é projetado em 4,4%.

Pela decomposição da Aneel, os componentes financeiros pesam 4,7 pontos percentuais. Os encargos setoriais respondem por 1,6 ponto, a compra de energia por 1,1, a transmissão por 0,9 e os custos de distribuição por 0,8.

A estimativa já considera R$ 5,5 bilhões de recursos da repactuação de obrigações de hidrelétricas nas regiões Norte e Nordeste, usados para aliviar o impacto nas tarifas.

Cerca de 16% do mercado das distribuidoras enfrentará aumentos superiores a 15%. Dos 51 processos tarifários previstos para 2026, 15 são revisões periódicas. Fonte: CNN Brasil.`,
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1920',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-09-19T07:00:00Z'),
      readTime: 3,
      authorId: admin.id,
      categoryId: economiaCategory!.id,
    },
  ];

  // Remove os artigos editoriais antigos (o upsert abaixo não atualiza registros existentes)
  const oldEditorialSlugs = [
    'palmeiras-encara-o-gremio-em-porto-alegre-de-olho-na-lideranca-do-brasileirao',
    'flavio-e-lula-levam-campanhas-a-santa-catarina-em-situacoes-opostas',
    'moraes-e-viviane-usaram-jatinho-de-vorcaro-em-2025-diz-jornal',
    'putin-diz-que-liderancas-europeias-se-preparam-para-guerra-com-a-russia',
    'omar-aziz-propoe-estagio-de-ate-seis-meses-pago-pelo-estado-para-garantir-primeiro-emprego-no-amazonas',
    'david-almeida-promete-ampliar-apoio-a-saude-mental-de-maes-atipicas-no-amazonas',
    'maria-do-carmo-arrasta-multidao-em-motocarreata-e-mobiliza-eleitores-em-borba',
    'eleicoes-2026-candidatos-nao-podem-mais-ser-presos-a-partir-deste-sabado',
    'e-titulo-saiba-quais-servicos-o-aplicativo-oferece-ao-eleitor',
    'gonet-diz-que-relacao-com-vorcaro-foi-brevissima-e-banal-apos-foto-com-charuto-vir-a-publico',
    'colombia-vai-a-juri-popular-por-mandar-matar-bruno-pereira-e-dom-phillips-no-amazonas',
    'amazonas-suspende-vacina-da-dengue-do-butantan-apos-identificacao-de-reacoes-graves',
    'sistema-paredao-da-ssp-am-prende-quatro-foragidos-com-reconhecimento-facial-em-manaus',
    'camara-municipal-de-manaus-aprova-em-primeira-discussao-a-ldo-para-2027',
    'neymar-fora-da-estreia-do-brasil-contra-o-marrocos-na-copa-do-mundo-2026',
    'balanca-comercial-do-brasil-registra-superavit-de-us-3247-bilhoes-na-primeira-semana-de-junho',
    'nunes-marques-suspende-pesquisa-eleitoral-do-tse-flavio-bolsonaro-celebra-decisao',
    'dia-dos-namorados-deve-movimentar-r-284-bilhoes-no-varejo-brasileiro',
    'papa-leao-xiv-reune-70-mil-pessoas-em-estadio-de-madri-e-discursa-no-parlamento-espanhol',
    'ira-promete-manter-controle-do-estreito-de-ormuz-apesar-das-novas-sancoes-da-uniao-europeia',
    'eleicao-presidencial-no-peru-roberto-sanchez-lidera-com-margem-minima-sobre-keiko-fujimori',
    'ataques-russos-intensificados-na-ucrania-deixam-ao-menos-23-mortos-em-kiev-dnipro-e-kharkiv',
    'espanha-goleia-em-amistoso-e-chega-a-copa-2026-como-uma-das-favoritas-ao-titulo',
    'trump-e-vaiado-na-final-da-nba-e-video-viraliza-com-milhoes-de-visualizacoes',
  ];
  await prisma.article.deleteMany({ where: { slug: { in: oldEditorialSlugs } } });

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
