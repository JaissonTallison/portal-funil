import { MetadataRoute } from "next";
import { getArticleSlugs } from "@/services/articles.service";
import { getEventSlugs } from "@/services/events.service";
import { SITE_URL } from "@/lib/constants";
import { CATEGORIES } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articleSlugs, eventSlugs] = await Promise.all([
    getArticleSlugs(),
    getEventSlugs(),
  ]).catch(() => [[], []] as [string[], string[]]);

  const articleRoutes = articleSlugs.map((slug) => ({
    url: `${SITE_URL}/noticias/${slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const eventRoutes = eventSlugs.map((slug) => ({
    url: `${SITE_URL}/agenda/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const categoryRoutes = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/categoria/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "hourly" as const,
    priority: 0.7,
  }));

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "always", priority: 1 },
    { url: `${SITE_URL}/noticias`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.95 },
    { url: `${SITE_URL}/agenda`, lastModified: new Date(), changeFrequency: "daily", priority: 0.75 },
    { url: `${SITE_URL}/ao-vivo`, lastModified: new Date(), changeFrequency: "always", priority: 0.9 },
    { url: `${SITE_URL}/colunas`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
    { url: `${SITE_URL}/classificados`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.65 },
    ...categoryRoutes,
    ...articleRoutes,
    ...eventRoutes,
  ];
}
