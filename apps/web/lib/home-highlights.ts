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
