import type { Article, Category, Columnist } from "@/types/article";
import { apiGet } from "@/lib/api";
import { columnists, CATEGORIES } from "@/lib/data";

// ─── API response shapes ──────────────────────────────────────────────────────

type ApiArticle = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content?: string;
  image: string;
  status: string;
  publishedAt: string | null;
  readTime: number;
  views: number;
  isLive: boolean;
  isFeatured: boolean;
  isSponsored: boolean;
  sponsor: string | null;
  author: { id: string; name: string; avatar: string | null };
  category: { id: string; slug: string; name: string };
};

type ApiListResponse = { items: ApiArticle[]; total: number };

function toArticle(a: ApiArticle): Article {
  return {
    id: a.id,
    slug: a.slug,
    title: a.title,
    description: a.description,
    content: a.content ?? "",
    image: a.image,
    category: a.category.slug,
    author: a.author.name,
    publishedAt: a.publishedAt ?? new Date().toISOString(),
    readTime: a.readTime,
    views: a.views,
    isLive: a.isLive,
    isFeatured: a.isFeatured,
    isSponsored: a.isSponsored,
    sponsor: a.sponsor ?? undefined,
  };
}

// ─── Articles ────────────────────────────────────────────────────────────────

export async function getAllArticles(): Promise<Article[]> {
  const data = await apiGet<ApiListResponse>("/articles?limit=50");
  return data.items.map(toArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const data = await apiGet<ApiArticle & { content: string }>(`/articles/${slug}`);
    return toArticle(data);
  } catch {
    return null;
  }
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const data = await apiGet<ApiListResponse>(`/articles?category=${category}&limit=50`);
  return data.items.map(toArticle);
}

export async function getFilteredArticles(params: { categoria?: string }): Promise<Article[]> {
  const qs = params.categoria ? `?category=${params.categoria}&limit=50` : "?limit=50";
  const data = await apiGet<ApiListResponse>(`/articles${qs}`);
  return data.items.map(toArticle);
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const data = await apiGet<ApiArticle[]>("/articles/featured");
  return data.map(toArticle);
}

export async function getLiveArticles(): Promise<Article[]> {
  const data = await apiGet<ApiArticle[]>("/articles/live");
  return data.map(toArticle);
}

export async function getMostRead(limit = 5): Promise<Article[]> {
  const data = await apiGet<ApiArticle[]>(`/articles/most-read?limit=${limit}`);
  return data.map(toArticle);
}

export async function getRelatedArticles(current: Article, limit = 3): Promise<Article[]> {
  const data = await apiGet<ApiListResponse>(
    `/articles?category=${current.category}&limit=${limit + 1}`
  );
  return data.items
    .map(toArticle)
    .filter((a) => a.id !== current.id)
    .slice(0, limit);
}

export async function getSponsoredArticles(): Promise<Article[]> {
  const data = await apiGet<ApiListResponse>("/articles?limit=50");
  return data.items.map(toArticle).filter((a) => a.isSponsored);
}

export async function getArticleSlugs(): Promise<string[]> {
  const data = await apiGet<ApiListResponse>("/articles?limit=200");
  return data.items.map((a) => a.slug);
}

// ─── Categories ──────────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  return CATEGORIES;
}

export function getCategoryName(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}

// ─── Columnists (remain as mock — no API) ────────────────────────────────────

export async function getAllColumnists(): Promise<Columnist[]> {
  return columnists;
}

export async function getColumnistBySlug(slug: string): Promise<Columnist | null> {
  return columnists.find((c) => c.slug === slug) ?? null;
}

export async function getColumnistArticles(columnist: Columnist): Promise<Article[]> {
  const data = await getAllArticles();
  return data.filter((a) => columnist.articleIds.includes(a.id));
}
