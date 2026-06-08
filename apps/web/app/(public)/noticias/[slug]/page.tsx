import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Radio,
  Share2,
  TriangleAlert,
} from "lucide-react";
import { articles } from "@/lib/data";
import {
  getArticleBySlug,
  getCategoryName,
  getRelatedArticles,
} from "@/services/articles.service";
import { NewsCard } from "@/components/cards/news-card";
import { ReadingProgress } from "@/components/news/reading-progress";
import { ShareButtons } from "@/components/news/share-buttons";
import { formatDate, formatViews } from "@/lib/utils";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  const canonical = `${SITE_URL}/noticias/${article.slug}`;

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: article.title,
      description: article.description,
      publishedTime: article.publishedAt,
      modifiedTime: article.publishedAt,
      authors: [article.author],
      section: getCategoryName(article.category),
      images: [{ url: article.image, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article);
  const allRelated = related.length > 0 ? related : articles.filter((a) => a.id !== article.id).slice(0, 3);
  const paragraphs = article.content.split("\n\n").filter(Boolean);
  const canonical = `${SITE_URL}/noticias/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.description,
    image: [article.image],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: { "@type": "Person", name: article.author },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo-primary.png`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    articleSection: getCategoryName(article.category),
    inLanguage: "pt-BR",
    isAccessibleForFree: true,
  };

  return (
    <main className="min-h-screen bg-surface text-navy">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />
      {/* HERO */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden bg-navy">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />

        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-12">
          <div className="mx-auto w-full max-w-4xl">
            {/* BACK */}
            <Link
              href="/noticias"
              className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
            >
              <ArrowLeft size={16} />
              Voltar para notícias
            </Link>

            {/* BADGES */}
            <div className="flex flex-wrap items-center gap-3">
              {article.isLive && (
                <span className="flex items-center gap-2 rounded-full bg-red-500 px-5 py-2 text-xs font-black uppercase tracking-[0.3em] text-white">
                  <Radio size={12} className="animate-pulse" />
                  Ao vivo
                </span>
              )}
              <Link
                href={`/categoria/${article.category}`}
                className="rounded-full bg-gold px-5 py-2 text-xs font-black uppercase tracking-[0.25em] text-navy transition hover:bg-gold-hover"
              >
                {getCategoryName(article.category)}
              </Link>
            </div>

            {/* TITLE */}
            <h1 className="mt-6 text-3xl font-black leading-tight tracking-[-0.04em] text-white sm:text-5xl">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          {/* META */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
            <div className="flex flex-wrap gap-5 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gold/10">
                  <span className="text-xs font-black text-gold-dark">
                    {article.author.charAt(0)}
                  </span>
                </div>
                <span className="font-semibold text-navy">{article.author}</span>
              </div>

              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {formatDate(article.publishedAt)}
              </span>

              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {article.readTime} min de leitura
              </span>

              <span className="flex items-center gap-1.5">
                <Eye size={14} />
                {formatViews(article.views)} visualizações
              </span>
            </div>

            <button className="flex items-center gap-2 rounded-2xl border border-black/5 bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
              <Share2 size={15} />
              Compartilhar
            </button>
          </div>

          {/* DESCRIPTION */}
          <p className="mt-10 text-xl leading-relaxed text-slate-600">
            {article.description}
          </p>

          {/* CONTENT */}
          <div className="mt-8 space-y-6">
            {paragraphs.map((para, i) => (
              <p key={i} className="text-base leading-relaxed text-slate-700">
                {para}
              </p>
            ))}
          </div>

          {/* ALERT BOX */}
          {article.isLive && (
            <div className="mt-10 flex items-start gap-4 rounded-[28px] border border-gold/20 bg-navy p-7">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/10">
                <TriangleAlert className="text-gold" size={20} />
              </div>
              <div>
                <p className="font-black text-gold">Cobertura em andamento</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Esta matéria está sendo atualizada em tempo real. Recarregue a página
                  para ver as últimas informações.
                </p>
              </div>
            </div>
          )}

          {/* SHARE FOOTER */}
          <div className="mt-12 border-t border-black/5 pt-8">
            <ShareButtons title={article.title} slug={article.slug} />
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="border-t border-black/5 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">
                LEIA TAMBÉM
              </span>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-navy">
                Notícias relacionadas
              </h2>
            </div>

            <Link
              href="/noticias"
              className="hidden items-center gap-2 rounded-2xl border border-black/5 bg-white px-5 py-3 text-sm font-semibold text-navy shadow-[0_10px_40px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 sm:flex"
            >
              Ver todas
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allRelated.map((a) => (
              <NewsCard key={a.id} article={a} variant="vertical" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
