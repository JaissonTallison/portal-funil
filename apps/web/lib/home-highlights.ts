import { columnists } from "@/lib/data";

/** Matérias fixas do carrossel principal da home. Os demais blocos evitam repeti-las. */
export const HERO_SLIDES = [
  {
    slug: "manaus-atinge-nivel-pessimo-de-qualidade-do-ar-apos-queimadas-na-amazonia",
    image: "/noticias/qualidade-ar-manaus-fumaca-queimadas.png",
    category: "CLIMA",
    label: "Manaus",
    title: "Manaus atinge nível péssimo de qualidade do ar após queimadas na Amazônia.",
    description: "Fumaça de queimadas afeta a capital desde o início de setembro. Segundo o IPAM, a poluição está acima do recomendado pela OMS.",
  },
  {
    slug: "delcy-rodriguez-usa-broche-com-mapa-do-essequibo-em-discurso-na-onu",
    image: "/noticias/delcy-rodriguez-essequibo-onu.png",
    category: "MUNDO",
    label: "ONU",
    title: "Delcy Rodríguez usa broche com mapa do Essequibo em discurso na ONU.",
    description: "Presidente interina da Venezuela reafirmou a reivindicação sobre o território da Guiana e defendeu negociação bilateral, conforme o Acordo de Genebra.",
  },
  {
    slug: "helicoptero-foi-localizado-em-area-de-dificil-acesso",
    image: "/noticias/acidente.png",
    category: "FAMOSOS",
    label: "Santa Catarina",
    title: "Helicóptero foi localizado em área de difícil acesso.",
    description: "Cinco ocupantes da aeronave foram encontrados mortos; além do cantor Rick, empresário Bruno Avelar também está entre os mortos.",
  },
  {
    slug: "quem-foi-rick-da-dupla-com-renner-que-morreu-em-queda-de-helicoptero",
    image: "/noticias/rick.png",
    category: "FAMOSOS",
    label: "Sertanejo",
    title: "Quem foi Rick, da dupla com Renner, que morreu em queda de helicóptero.",
    description: "Cantor e compositor estava em veículo que caiu na segunda-feira (21) em Santa Catarina.",
  },
];

export const HERO_SLUGS: string[] = HERO_SLIDES.map((s) => s.slug);

/**
 * Destaque da Central ao vivo: a matéria em destaque mais nova fora do carrossel
 * principal (ou, sem nenhuma, a mais nova). Outros blocos usam o mesmo critério para evitá-la.
 */
export function pickLiveLead<T extends { slug: string; isFeatured?: boolean; publishedAt: string }>(
  articles: T[],
): T | undefined {
  const pool = articles
    .filter((a) => !HERO_SLUGS.includes(a.slug))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  return pool.find((a) => a.isFeatured) ?? pool[0];
}

/**
 * Destaque do bloco "Poder em foco": a matéria de política ou economia mais nova fora do
 * carrossel principal e do destaque da Central ao vivo.
 */
export function pickPowerFeatured<T extends { slug: string; category: string; isFeatured?: boolean; publishedAt: string }>(
  articles: T[],
): T | undefined {
  const liveLeadSlug = pickLiveLead(articles)?.slug;
  return articles
    .filter(
      (a) =>
        (a.category === "politica" || a.category === "economia") &&
        !HERO_SLUGS.includes(a.slug) &&
        a.slug !== liveLeadSlug,
    )
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())[0];
}

const COLUMN_SLUGS = new Set(columnists.flatMap((c) => c.articleSlugs ?? []));

/** Textos de opinião assinados por colunistas. Ficam nas páginas de colunas, não nos blocos de notícias. */
export function isColumnArticle(slug: string): boolean {
  return COLUMN_SLUGS.has(slug);
}

/**
 * Escolhe até `limit` matérias variando a editoria: uma por categoria (a mais nova de cada,
 * começando pela categoria com a matéria mais recente), e só repete categoria quando faltam outras.
 */
export function pickDiverse<T extends { category: string; publishedAt: string }>(articles: T[], limit: number): T[] {
  const byDate = [...articles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  const queues = new Map<string, T[]>();
  for (const a of byDate) queues.set(a.category, [...(queues.get(a.category) ?? []), a]);

  const picked: T[] = [];
  while (picked.length < limit && queues.size > 0) {
    for (const [category, queue] of queues) {
      if (picked.length >= limit) break;
      picked.push(queue.shift() as T);
      if (queue.length === 0) queues.delete(category);
    }
  }
  return picked;
}
