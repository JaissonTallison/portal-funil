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
