import { columnists } from "@/lib/data";

/** Matérias fixas do carrossel principal da home. Os demais blocos evitam repeti-las. */
export const HERO_SLIDES = [
  {
    slug: "cocaina-e-ouro-ilegal-impulsionam-expansao-do-pcc-e-cv-na-amazonia",
    image: "/noticias/faccoes-cv-pcc.png",
    category: "SEGURANÇA",
    label: "Amazônia",
    title: "Cocaína e ouro ilegal impulsionam expansão do PCC e do CV na Amazônia.",
    description: "Relatório aponta que facções reinvestem o lucro do tráfico no garimpo ilegal, aproveitando aviões e pistas clandestinas da região.",
  },
  {
    slug: "gonet-diz-que-relacao-com-vorcaro-foi-brevissima-e-banal-apos-foto-com-charuto-vir-a-publico",
    image: "/noticias/gonet-vorcaro-charuto.png",
    category: "POLÍTICA",
    label: "PGR",
    title: "Gonet diz que relação com Vorcaro foi “brevíssima e banal” após foto com charuto vir a público.",
    description: "Imagem extraída do celular do ex-banqueiro pela PF mostra o procurador-geral em evento em Londres, em abril de 2024.",
  },
  {
    slug: "flavio-e-lula-levam-campanhas-a-santa-catarina-em-situacoes-opostas",
    image: "/noticias/flavio-lula-sc.png",
    category: "ELEIÇÕES",
    label: "Santa Catarina",
    title: "Flávio e Lula levam campanhas a Santa Catarina em situações opostas.",
    description: "Pesquisa mostra Flávio com 52% e Lula com 26% no primeiro turno no estado. Os dois têm agenda neste sábado (19).",
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
