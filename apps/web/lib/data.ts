// Importa para uso no escopo e re-exporta para retrocompatibilidade
import type { Article, Category, Columnist } from "@/types/article";
export type { Article, Category, Columnist };

export const CATEGORIES: Category[] = [
  { slug: "politica", name: "Política" },
  { slug: "futebol", name: "Futebol" },
  { slug: "policial", name: "Policial" },
  { slug: "economia", name: "Economia" },
  { slug: "tecnologia", name: "Tecnologia" },
  { slug: "saude", name: "Saúde" },
  { slug: "mundo", name: "Mundo" },
  { slug: "clima", name: "Clima" },
  { slug: "transito", name: "Trânsito" },
  { slug: "alerta", name: "Alerta" },
  { slug: "colunas", name: "Colunas" },
  { slug: "famosos", name: "Famosos" },
  { slug: "curiosidades", name: "Curiosidades" },
];

export function getCategoryName(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}

export const articles: Article[] = [
  {
    id: "1",
    slug: "chuvas-intensas-manaus-estado-atencao",
    title: "Chuvas intensas colocam Manaus em estado de atenção",
    description:
      "Defesa Civil monitora regiões críticas enquanto trânsito registra lentidão nas principais avenidas da capital.",
    content: `A Defesa Civil de Manaus emitiu um alerta máximo nesta segunda-feira após chuvas intensas atingirem a capital amazonense. Segundo o órgão, diversas regiões da cidade registram alagamentos, com maior concentração nas zonas Norte e Centro-Oeste.

O sistema meteorológico que atinge Manaus é resultante de um canal de umidade que se formou sobre a Amazônia nos últimos dias. As chuvas devem persistir até o final da semana, com acumulados que podem chegar a 150 milímetros em 24 horas.

As equipes da Defesa Civil e do Corpo de Bombeiros estão em estado de prontidão, com 12 equipes distribuídas pelos principais pontos críticos da cidade. Mais de 200 famílias já foram afetadas nas regiões mais vulneráveis.

A Prefeitura de Manaus ativou o Plano de Contingência Municipal e orienta a população a não atravessar áreas alagadas, mesmo que pareçam rasas, pois a correnteza pode ser perigosa. Bueiros entupidos e galhos nas vias foram registrados em diversos bairros.

Para emergências, o número de atendimento da Defesa Civil é o 199, disponível 24 horas por dia. Equipes de assistência social também estão disponíveis para famílias que precisarem de abrigo temporário.`,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070",
    category: "alerta",
    author: "Redação Portal Funil",
    publishedAt: "2026-05-19T10:30:00Z",
    readTime: 4,
    views: 1240,
    isLive: true,
    isFeatured: true,
  },
  {
    id: "2",
    slug: "acidente-avenida-djalma-batista-tres-feridos",
    title: "Acidente grave na Avenida Djalma Batista deixa três feridos",
    description:
      "Colisão entre automóvel e motocicleta causou congestionamento de mais de 5 km na principal via da Zona Norte.",
    content: `Um acidente grave envolvendo dois veículos foi registrado no início da manhã desta terça-feira na Avenida Djalma Batista, uma das principais vias da capital amazonense. O acidente ocorreu por volta das 7h30, causando grande congestionamento na região.

De acordo com testemunhas, a colisão aconteceu na altura do número 1.820, próximo ao Shopping Manaus ViaNorte. Os veículos envolvidos foram um automóvel e uma motocicleta, cujo condutor foi socorrido com ferimentos graves.

A Polícia Militar e o SAMU foram acionados rapidamente ao local. O motociclista foi encaminhado ao Hospital 28 de Agosto em estado estável, após receber os primeiros atendimentos no próprio local do acidente.

O tráfego foi desviado por vias paralelas, causando lentidão até a Avenida Constantino Nery. O Instituto de Medicina Legal (IML) e peritos do DETRAN estiveram no local para os procedimentos técnicos e levantamento das causas do acidente.

Segundo a Polícia Militar, o condutor do automóvel foi submetido ao teste do bafômetro, cujo resultado foi negativo. A dinâmica do acidente ainda está sendo investigada pelas autoridades competentes.`,
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069",
    category: "policial",
    author: "João Mendes",
    publishedAt: "2026-05-19T08:15:00Z",
    readTime: 3,
    views: 872,
    isFeatured: false,
  },
  {
    id: "3",
    slug: "prefeitura-programa-saneamento-zona-norte",
    title: "Prefeitura anuncia programa de saneamento de R$ 180 mi para Zona Norte",
    description:
      "Projeto beneficiará 120 mil famílias com acesso a esgotamento sanitário nos próximos dois anos.",
    content: `A Prefeitura de Manaus anunciou nesta quarta-feira um novo programa de saneamento básico voltado para a Zona Norte da cidade. O projeto prevê investimentos de R$ 180 milhões em infraestrutura hídrica para beneficiar cerca de 120 mil famílias.

O prefeito assinou os documentos durante cerimônia realizada no bairro Cidade Nova, que será o primeiro a receber as obras. O programa faz parte de uma parceria entre o município e o governo federal, com recursos do PAC Saneamento.

Segundo o secretário de infraestrutura, as obras serão executadas em três fases ao longo dos próximos dois anos. A primeira etapa contempla os bairros Cidade Nova, Monte das Oliveiras e Colônia Antônio Aleixo, regiões com maior déficit de saneamento.

Com o programa, a prefeitura estima reduzir em 40% os índices de doenças de veiculação hídrica na região norte da capital. As contratações das empresas responsáveis pelas obras acontecem nos próximos 60 dias.

Moradores da região comemoraram o anúncio. "Esperamos muito tempo por isso. Espero que desta vez as obras saiam mesmo", disse a dona de casa Marina Silva, moradora do Cidade Nova há 12 anos.`,
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070",
    category: "politica",
    author: "Ana Rodrigues",
    publishedAt: "2026-05-18T14:00:00Z",
    readTime: 5,
    views: 643,
  },
  {
    id: "4",
    slug: "amazonas-fc-vence-classico-lideranca",
    title: "Amazonas FC vence clássico por 2 a 0 e assume liderança",
    description:
      "Gols de Bruninho e Sassá garantiram a vitória no Carlos Zamith diante de 15 mil torcedores.",
    content: `O Amazonas FC venceu o clássico regional por 2 a 0 neste domingo, no estádio Carlos Zamith, e assumiu a liderança provisória com 18 pontos. Os gols foram marcados por Bruninho, no primeiro tempo, e pelo artilheiro Sassá, nos minutos finais.

A partida reuniu cerca de 15 mil torcedores nas arquibancadas e foi marcada pela festa da torcida do Boto. A equipe demonstrou organização tática e qualidade individual em todas as linhas durante os 90 minutos.

Sassá, artilheiro do torneio com 8 gols, destacou a importância da vitória: "É fundamental ganhar o clássico. A torcida merece e a equipe deu tudo em campo. Estamos no caminho certo para o objetivo da temporada."

O técnico celebrou o resultado e elogiou a entrega do grupo: "Treinamos muito para este jogo. Os atletas respeitaram o adversário, mas também foram corajosos. A vitória é justa e reflete o nosso trabalho."

Na próxima rodada, o Amazonas FC enfrenta o Atlético Mineiro, fora de casa. A partida acontece na próxima quinta-feira, às 21h30, e será transmitida ao vivo pelo canal oficial do clube.`,
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2070",
    category: "futebol",
    author: "Pedro Costa",
    publishedAt: "2026-05-18T22:00:00Z",
    readTime: 3,
    views: 2341,
    isFeatured: true,
  },
  {
    id: "5",
    slug: "hub-inovacao-tecnologia-inaugurado-manaus",
    title: "Hub de inovação tecnológica é inaugurado na Zona Franca de Manaus",
    description:
      "Espaço de 3.000 m² irá abrigar startups e pesquisadores com foco em soluções para a Amazônia.",
    content: `A empresa de tecnologia TechAmazon inaugurou nesta semana seu novo hub de inovação no coração da Zona Franca de Manaus. O espaço, com 3.000 metros quadrados, abrigará startups, desenvolvedores e pesquisadores focados em soluções para a Amazônia.

O hub conta com laboratórios de inteligência artificial, espaços de coworking, salas de reunião de última geração e um auditório para 300 pessoas. O investimento total foi de R$ 25 milhões, com recursos próprios da empresa e incentivos da SUFRAMA.

O CEO da TechAmazon afirmou que o objetivo é formar um ecossistema de inovação capaz de desenvolver tecnologias adaptadas às peculiaridades regionais: "Queremos resolver problemas reais da Amazônia com tecnologia de ponta e visão sustentável."

O hub já conta com 30 empresas instaladas e pretende absorver mais 50 startups até o final do ano. As vagas para o processo seletivo do próximo ciclo de aceleração estão abertas até o fim do mês.

Entre os projetos desenvolvidos, destacam-se soluções de monitoramento ambiental, logística fluvial inteligente e agricultura de precisão adaptada ao bioma amazônico.`,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070",
    category: "tecnologia",
    author: "Camila Torres",
    publishedAt: "2026-05-17T09:00:00Z",
    readTime: 4,
    views: 987,
  },
  {
    id: "6",
    slug: "manaus-temperatura-recorde-maio-2026",
    title: "Manaus registra temperatura recorde de 38,7°C neste mês",
    description:
      "Sensação térmica chegou a 43°C em pontos do Centro. Secretaria de Saúde emite alertas à população.",
    content: `Manaus registrou nesta quinta-feira a temperatura mais alta do mês, com os termômetros marcando 38,7°C às 14h. O índice supera em 2 graus a média histórica para o período e é o maior registrado desde 2019, segundo o INMET.

A sensação térmica chegou a 43°C em alguns pontos da cidade, especialmente nas regiões mais urbanizadas do Centro e da Zona Sul. A baixa umidade do ar, associada ao intenso calor, aumenta os riscos de problemas respiratórios e desidratação.

A Secretaria Municipal de Saúde emitiu alertas orientando a população a aumentar a ingestão de líquidos, evitar exposição ao sol entre 10h e 16h e usar protetor solar com FPS mínimo de 30. Postos de saúde registraram aumento de 35% nas consultas.

O período mais crítico deve durar até o final desta semana, quando uma frente de umidade vinda da região do Pantanal deve trazer alívio ao calor. A previsão indica chuvas e queda nas temperaturas a partir de sábado.

Crianças, idosos e pessoas com doenças crônicas são os grupos mais vulneráveis durante as ondas de calor. O número da Defesa Civil (199) está disponível para atendimentos de emergência relacionados ao clima.`,
    image:
      "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?q=80&w=2070",
    category: "clima",
    author: "Redação Portal Funil",
    publishedAt: "2026-05-19T14:00:00Z",
    readTime: 3,
    views: 1560,
    isLive: true,
  },
  {
    id: "7",
    slug: "transito-intenso-paralisa-centro-sul-rush",
    title: "Trânsito intenso paralisa Centro-Sul durante hora do rush",
    description:
      "Obras na André Araújo, acidente na Torquato e saída de escolas causaram fila de 8 km na tarde desta sexta.",
    content: `A região Centro-Sul de Manaus enfrentou grande congestionamento nesta sexta-feira durante o horário de pico. Os principais engarrafamentos foram nas avenidas Constantino Nery, Getúlio Vargas e Djalma Batista, com filas de até 8 quilômetros.

O caos no trânsito foi agravado por três fatores simultâneos: uma operação de recapeamento na Avenida André Araújo, o horário de saída das escolas e um acidente na Avenida Torquato Tapajós. O IMMU acionou agentes para pontos estratégicos.

Motoristas relataram esperas superiores a uma hora em trechos normalmente percorridos em 15 minutos. O aplicativo de navegação mais popular registrou o pior congestionamento de 2026 em Manaus nesta tarde.

O IMMU recomenda que nos próximos dias os motoristas alterem seus horários de deslocamento ou usem rotas alternativas durante o período de obras. A previsão é que os serviços de recapeamento sejam concluídos em aproximadamente 10 dias úteis.

Para acompanhar o trânsito em tempo real, a população pode acessar o portal da Prefeitura ou seguir as redes sociais do IMMU, que atualizam as informações a cada 30 minutos durante os picos.`,
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2070",
    category: "transito",
    author: "Marcos Lima",
    publishedAt: "2026-05-16T18:00:00Z",
    readTime: 3,
    views: 781,
  },
  {
    id: "8",
    slug: "zona-franca-atrai-2-bilhoes-investimentos-2026",
    title: "Zona Franca de Manaus atrai R$ 2,1 bilhões no primeiro trimestre",
    description:
      "Novo recorde histórico impulsionado por projetos de eletroeletrônicos, duas rodas e tecnologia verde.",
    content: `O Polo Industrial de Manaus registrou o maior volume de investimentos dos últimos cinco anos no primeiro trimestre de 2026. Segundo dados da SUFRAMA, foram atraídos R$ 2,1 bilhões em novos projetos industriais.

As novas instalações devem gerar 4.500 postos de trabalho diretos nos próximos 18 meses. Já estão confirmados projetos de 12 empresas multinacionais, incluindo três do setor de tecnologia verde que vão produzir baterias e equipamentos de energia solar.

O superintendente da SUFRAMA destacou a importância dos incentivos fiscais: "O diferencial competitivo do nosso polo continua sendo o regime de benefícios e a proximidade com os recursos naturais da Amazônia. Isso atrai empresas que buscam desenvolvimento sustentável."

O Banco da Amazônia anunciou uma linha de crédito especial de R$ 500 milhões para financiar a expansão das empresas já instaladas no polo e facilitar a chegada dos novos investidores ao longo de 2026.

Os setores de eletroeletrônicos e duas rodas seguem liderando os empregos gerados, mas a participação da indústria verde cresceu 180% em comparação ao mesmo período do ano anterior.`,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070",
    category: "economia",
    author: "Ana Rodrigues",
    publishedAt: "2026-05-15T10:00:00Z",
    readTime: 5,
    views: 1102,
  },
  {
    id: "9",
    slug: "hospital-trauma-equipamentos-modernos-diagnostico",
    title: "Hospital do Trauma recebe equipamentos de R$ 8 mi em diagnóstico por imagem",
    description:
      "Dois tomógrafos e uma ressonância magnética reduzirão em 60% o tempo de espera por exames no SUS.",
    content: `O Hospital e Pronto-Socorro João Lúcio recebeu nesta semana uma série de equipamentos modernos de diagnóstico por imagem, em uma entrega avaliada em R$ 8 milhões. Os aparelhos incluem dois tomógrafos de última geração e um equipamento de ressonância magnética.

Com os novos equipamentos, o hospital projeta reduzir em 60% o tempo de espera por exames de imagem. Atualmente, pacientes aguardam em média 45 dias por uma ressonância magnética no sistema público. Com o novo aparelho, esse prazo deve cair para 15 dias.

A diretora da unidade ressaltou que os equipamentos chegam em boa hora: "Estávamos com um tomógrafo operando com 80% de sua vida útil esgotada. Agora poderemos atender com mais qualidade e segurança a população que depende do SUS em Manaus."

O investimento foi viabilizado por meio de emenda parlamentar federal e recursos do Ministério da Saúde. A instalação e treinamento da equipe técnica acontecem nas próximas duas semanas, sem interrupção dos serviços hospitalares.

A unidade é referência estadual em trauma e atende cerca de 800 pacientes por dia entre consultas, exames e cirurgias. Com a melhora na capacidade diagnóstica, o hospital espera reduzir também o índice de internações desnecessárias.`,
    image:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2032",
    category: "saude",
    author: "Lucia Ferreira",
    publishedAt: "2026-05-14T09:00:00Z",
    readTime: 4,
    views: 534,
  },
  {
    id: "10",
    slug: "incendio-galpao-distrito-industrial-manaus",
    title: "Incêndio de grandes proporções atinge galpão no Distrito Industrial",
    description:
      "Oito viaturas do Corpo de Bombeiros foram acionadas. Nenhuma vítima fatal, mas dois militares inalaram fumaça.",
    content: `Um incêndio de grandes proporções atingiu um galpão no Distrito Industrial de Manaus na tarde desta segunda-feira. As chamas foram detectadas por volta das 14h e rapidamente se espalharam pelo depósito de materiais plásticos.

O Corpo de Bombeiros do Amazonas mobilizou 8 viaturas e cerca de 40 militares para combater as chamas. Após aproximadamente três horas de trabalho intenso, o incêndio foi controlado. Não há registro de vítimas fatais.

Dois bombeiros foram atendidos por inalação de fumaça e receberam alta ainda no local após avaliação médica. A coluna de fumaça escura ficou visível de vários pontos da cidade durante o período mais intenso das chamas.

As causas do incêndio ainda são investigadas, mas há indícios de que um curto-circuito elétrico pode ter iniciado o fogo. A Polícia Civil coletou materiais para perícia técnica que deve esclarecer as circunstâncias.

A fumaça densa causou visibilidade reduzida na AM-010, levando o DETRAN-AM a orientar motoristas a reduzirem a velocidade no trecho. A Vigilância Ambiental monitorou os índices de qualidade do ar nas redondezas durante todo o período.`,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2072",
    category: "policial",
    author: "João Mendes",
    publishedAt: "2026-05-19T14:30:00Z",
    readTime: 3,
    views: 3241,
    isLive: true,
    isFeatured: true,
  },
  {
    id: "11",
    slug: "techamazon-abre-vagas-programa-trainee-2026",
    title: "TechAmazon abre 200 vagas para programa trainee 2026",
    description: "Empresa líder em tecnologia na Zona Franca oferece salários de até R$ 8 mil para recém-formados em TI, engenharia e design.",
    content: `A TechAmazon, maior empresa de tecnologia da Zona Franca de Manaus, anunciou a abertura de 200 vagas para seu programa de trainee 2026. As oportunidades são para recém-formados nas áreas de tecnologia da informação, engenharia e design.

Os selecionados terão salário inicial de R$ 8 mil, além de benefícios como plano de saúde, vale-alimentação, auxílio home office e participação nos lucros. O programa tem duração de 18 meses com possibilidade de efetivação.

As inscrições estão abertas até 15 de junho no site da empresa. O processo seletivo inclui testes online, dinâmica de grupo e entrevista com gestores.`,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070",
    category: "tecnologia",
    author: "Redação Portal Funil",
    publishedAt: "2026-05-19T12:00:00Z",
    readTime: 3,
    views: 1890,
    isSponsored: true,
    sponsor: "TechAmazon",
  },
  {
    id: "12",
    slug: "shopping-manauara-festival-gastronomico-amazonia",
    title: "Shopping Manauara promove festival gastronômico com chefs da Amazônia",
    description: "Evento reúne 20 restaurantes com pratos exclusivos a partir de R$ 39,90. Festival acontece de 24 de maio a 8 de junho.",
    content: `O Shopping Manauara anuncia a primeira edição do Festival Sabores da Amazônia, que reunirá 20 restaurantes com menus exclusivos inspirados na culinária regional. O evento acontece de 24 de maio a 8 de junho.

Os pratos foram desenvolvidos por chefs renomados da região e utilizam ingredientes típicos como tucupi, jambu, pirarucu e frutas amazônicas. Os menus variam de R$ 39,90 a R$ 89,90.

Além da gastronomia, o festival contará com shows de artistas locais, oficinas de culinária e espaço kids. A programação completa está disponível no site e redes sociais do shopping.`,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070",
    category: "curiosidades",
    author: "Redação Portal Funil",
    publishedAt: "2026-05-18T09:00:00Z",
    readTime: 2,
    views: 756,
    isSponsored: true,
    sponsor: "Shopping Manauara",
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter((a) => a.category === category);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.isFeatured);
}

export function getLiveArticles(): Article[] {
  return articles.filter((a) => a.isLive);
}

export function getRelatedArticles(current: Article, limit = 3): Article[] {
  return articles
    .filter((a) => a.id !== current.id && a.category === current.category)
    .slice(0, limit);
}

export function getMostRead(limit = 5): Article[] {
  return [...articles].sort((a, b) => b.views - a.views).slice(0, limit);
}

export function getSponsoredArticles(): Article[] {
  return articles.filter((a) => a.isSponsored);
}

// ─── COLUMNISTS ────────────────────────────────────────────────────────────

export const columnists: Columnist[] = [
  {
    id: "c1",
    slug: "carlos-eduardo-sousa",
    name: "Carlos Eduardo Sousa",
    role: "Analista Político",
    specialty: "Política Amazônica",
    bio: "Com 20 anos de experiência em análise política, Carlos Eduardo acompanha de perto o cenário do Amazonas e da Amazônia Legal, com foco em gestão pública e eleições.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400",
    articleIds: ["3", "8"],
    social: { twitter: "@carloseduardo", instagram: "@carloseduardopolitico" },
  },
  {
    id: "c2",
    slug: "fernanda-lima",
    name: "Dra. Fernanda Lima",
    role: "Saúde e Bem-estar",
    specialty: "Medicina Preventiva",
    bio: "Médica com especialização em saúde pública, Fernanda Lima escreve sobre bem-estar, prevenção de doenças e os desafios da saúde na Amazônia.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
    articleIds: ["9", "6"],
    social: { instagram: "@dra.fernandalima" },
  },
  {
    id: "c3",
    slug: "rafael-monteiro",
    name: "Rafael Monteiro",
    role: "Economia & Negócios",
    specialty: "Zona Franca de Manaus",
    bio: "Economista e consultor empresarial, Rafael analisa os impactos das políticas econômicas para o polo industrial de Manaus e o desenvolvimento regional.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
    articleIds: ["8"],
    social: { twitter: "@rafaelmonteiro_ec", instagram: "@rafaelmonteiro" },
  },
  {
    id: "c4",
    slug: "julia-santos",
    name: "Julia Santos",
    role: "Cultura & Sociedade",
    specialty: "Identidade Amazônica",
    bio: "Jornalista cultural com foco na identidade amazônica, Julia escreve sobre arte, folclore, gastronomia e o cotidiano de quem vive e respira a floresta.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",
    articleIds: ["5"],
    social: { instagram: "@juliasantos.cultura" },
  },
  {
    id: "c5",
    slug: "paulo-rodrigues",
    name: "Paulo Rodrigues",
    role: "Esportes",
    specialty: "Futebol Amazônico",
    bio: "Ex-atleta e comentarista esportivo, Paulo acompanha o futebol amazonense há 15 anos com análises táticas, bastidores e histórias do esporte regional.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
    articleIds: ["4"],
    social: { twitter: "@paulorodesportes", instagram: "@paulorodesportes" },
  },
];

export function getColumnistBySlug(slug: string): Columnist | undefined {
  return columnists.find((c) => c.slug === slug);
}

export function getColumnistArticles(columnist: Columnist): Article[] {
  return articles.filter((a) => columnist.articleIds.includes(a.id));
}
