import { MetadataRoute } from "next";
import { articles } from "@/lib/data";
import { events } from "@/lib/agenda-data";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const articleRoutes = articles.map((article) => ({
    url: `${SITE_URL}/noticias/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "daily" as const,
    priority: article.isFeatured ? 0.9 : 0.8,
  }));

  const eventRoutes = events.map((event) => ({
    url: `${SITE_URL}/agenda/${event.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const categoryRoutes = [
    "politica", "futebol", "policial", "economia",
    "tecnologia", "saude", "mundo", "clima", "transito", "alerta",
  ].map((slug) => ({
    url: `${SITE_URL}/categoria/${slug}`,
    lastModified: new Date(),
    changeFrequency: "hourly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    },
    {
      url: `${SITE_URL}/noticias`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/agenda`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/ao-vivo`,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/colunas`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/classificados`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.65,
    },
    ...categoryRoutes,
    ...articleRoutes,
    ...eventRoutes,
  ];
}
