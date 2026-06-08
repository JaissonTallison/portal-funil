import { Metadata } from "next";
import { NewsCard } from "@/components/cards/news-card";
import { CATEGORIES } from "@/lib/data";
import { getFilteredArticles } from "@/services/articles.service";
import { SITE_NAME } from "@/lib/constants";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";

export const metadata: Metadata = {
  title: `Notícias | ${SITE_NAME}`,
  description: "Todas as notícias de Manaus em tempo real.",
};

type Props = {
  searchParams: Promise<{ categoria?: string }>;
};

export default async function NoticiasPage({ searchParams }: Props) {
  const { categoria } = await searchParams;
  const sorted = await getFilteredArticles({ categoria });

  return (
    <main className="min-h-screen bg-surface text-navy">
      {/* HEADER */}
      <section className="bg-navy px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10">
              <Newspaper size={22} className="text-gold" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.35em] text-gold">
              PORTAL FUNIL
            </span>
          </div>

          <h1 className="mt-6 text-5xl font-black tracking-[-0.05em] text-white lg:text-7xl">
            {categoria
              ? CATEGORIES.find((c) => c.slug === categoria)?.name ?? "Notícias"
              : "Todas as notícias"}
          </h1>

          <p className="mt-4 text-lg text-zinc-400">
            {sorted.length} matéria{sorted.length !== 1 ? "s" : ""} encontrada
            {sorted.length !== 1 ? "s" : ""}
          </p>

          {/* CATEGORY TABS */}
          <div className="mt-10 flex flex-wrap gap-2">
            <Link
              href="/noticias"
              className={`rounded-2xl px-5 py-2.5 text-sm font-semibold transition ${
                !categoria
                  ? "bg-gold text-navy"
                  : "border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              Todas
            </Link>

            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/noticias?categoria=${cat.slug}`}
                className={`rounded-2xl px-5 py-2.5 text-sm font-semibold transition ${
                  categoria === cat.slug
                    ? "bg-gold text-navy"
                    : "border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          {sorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100">
                <Newspaper size={32} className="text-slate-300" />
              </div>
              <h2 className="mt-6 text-2xl font-black text-navy">
                Nenhuma notícia encontrada
              </h2>
              <p className="mt-3 text-slate-500">
                Tente outra categoria ou volte mais tarde.
              </p>
              <Link
                href="/noticias"
                className="mt-8 flex items-center gap-2 rounded-2xl bg-navy px-6 py-3 text-sm font-black text-white transition hover:bg-cobalt"
              >
                Ver todas <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sorted.map((article) => (
                <NewsCard key={article.id} article={article} variant="vertical" />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
