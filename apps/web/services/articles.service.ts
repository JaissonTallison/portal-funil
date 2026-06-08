import type { Article, Category, Columnist } from "@/types/article";
import {
  articles,
  columnists,
  CATEGORIES,
} from "@/lib/data";

// ─── Articles ────────────────────────────────────────────────────────────────

export async function getAllArticles(): Promise<Article[]> {
  return [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return articles.find((a) => a.slug === slug) ?? null;
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  return articles
    .filter((a) => a.category === category)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getFilteredArticles(params: {
  categoria?: string;
}): Promise<Article[]> {
  const filtered = params.categoria
    ? articles.filter((a) => a.category === params.categoria)
    : articles;

  return [...filtered].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getFeaturedArticles(): Promise<Article[]> {
  return articles.filter((a) => a.isFeatured);
}

export async function getLiveArticles(): Promise<Article[]> {
  return articles.filter((a) => a.isLive);
}

export async function getMostRead(limit = 5): Promise<Article[]> {
  return [...articles].sort((a, b) => b.views - a.views).slice(0, limit);
}

export async function getRelatedArticles(current: Article, limit = 3): Promise<Article[]> {
  return articles
    .filter((a) => a.id !== current.id && a.category === current.category)
    .slice(0, limit);
}

export async function getSponsoredArticles(): Promise<Article[]> {
  return articles.filter((a) => a.isSponsored);
}

// ─── Categories ──────────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  return CATEGORIES;
}

export function getCategoryName(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}

// ─── Columnists ──────────────────────────────────────────────────────────────

export async function getAllColumnists(): Promise<Columnist[]> {
  return columnists;
}

export async function getColumnistBySlug(slug: string): Promise<Columnist | null> {
  return columnists.find((c) => c.slug === slug) ?? null;
}

export async function getColumnistArticles(columnist: Columnist): Promise<Article[]> {
  return articles.filter((a) => columnist.articleIds.includes(a.id));
}
