import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Newspaper } from "lucide-react";
import { CATEGORIES, getCategoryName } from "@/lib/data";
import { getArticlesByCategory, getAllArticles } from "@/services/articles.service";
import { NewsCard } from "@/components/cards/news-card";
import { SITE_NAME, NAV_ITEMS } from "@/lib/constants";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = getCategoryName(slug);
  return {
    title: `${name} | ${SITE_NAME}`,
    description: `Notícias de ${name} em Manaus em tempo real.`,
  };
}

export default async function CategoriaPage({ params }: Props) {
  const { slug } = await params;

  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const [categoryArticles, allArticles] = await Promise.all([
    getArticlesByCategory(slug),
    getAllArticles(),
  ]);

  const otherArticles = allArticles
    .filter((a) => a.category !== slug)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-surface text-navy">
      <section className="relative overflow-hidden bg-navy px-6 py-20">
        <div className="absolute left-[-80px] top-[-80px] h-[300px] w-[300px] rounded-full bg-gold/10 blur-[100px]" />
        <div className="absolute bottom-[-80px] right-[-80px] h-[300px] w-[300px] rounded-full bg-[#1E3A8A]/10 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-[1440px]">
          <Link
            href="/noticias"
            className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Todas as notícias
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gold/10">
              <Newspaper size={24} className="text-gold" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.35em] text-gold">Editoria</span>
          </div>

          <h1 className="mt-6 text-5xl font-black tracking-[-0.05em] text-white lg:text-7xl">
            {category.name}
          </h1>

          <p className="mt-4 text-lg text-zinc-400">
            {categoryArticles.length} matéria{categoryArticles.length !== 1 ? "s" : ""} encontrada
            {categoryArticles.length !== 1 ? "s" : ""}
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.slug}
                href={`/categoria/${item.slug}`}
                className={`rounded-2xl px-5 py-2.5 text-sm font-semibold transition ${
                  item.slug === slug
                    ? "bg-gold text-navy"
                    : "border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1440px]">
          {categoryArticles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100">
                <Newspaper size={32} className="text-slate-300" />
              </div>
              <h2 className="mt-6 text-2xl font-black text-navy">
                Nenhuma matéria em {category.name} ainda
              </h2>
              <p className="mt-3 text-slate-500">Volte mais tarde ou explore outras editorias.</p>
              <Link
                href="/noticias"
                className="mt-8 rounded-2xl bg-navy px-6 py-3 text-sm font-black text-white transition hover:bg-cobalt"
              >
                Ver todas as notícias
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categoryArticles.map((article) => (
                <NewsCard key={article.id} article={article} variant="vertical" />
              ))}
            </div>
          )}

          {otherArticles.length > 0 && (
            <div className="mt-20">
              <div className="mb-10">
                <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">OUTRAS EDITORIAS</span>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-navy">Também em destaque</h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {otherArticles.map((article) => (
                  <NewsCard key={article.id} article={article} variant="vertical" />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
