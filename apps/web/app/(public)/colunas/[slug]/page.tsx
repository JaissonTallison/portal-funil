import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Instagram, Twitter } from "lucide-react";
import { columnists, getColumnistBySlug, getColumnistArticles } from "@/lib/data";
import { NewsCard } from "@/components/cards/news-card";
import { SITE_NAME } from "@/lib/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return columnists.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const columnist = getColumnistBySlug(slug);
  if (!columnist) return {};
  return {
    title: `${columnist.name} — ${columnist.role} | ${SITE_NAME}`,
    description: columnist.bio,
  };
}

export default async function ColumnistPage({ params }: Props) {
  const { slug } = await params;
  const columnist = getColumnistBySlug(slug);
  if (!columnist) notFound();

  const articles = getColumnistArticles(columnist);

  return (
    <main className="min-h-screen bg-surface text-navy">
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy px-6 py-20">
        {/* GLOWS */}
        <div className="absolute left-[-80px] top-[-80px] h-[300px] w-[300px] rounded-full bg-gold/10 blur-[100px]" />
        <div className="absolute bottom-[-80px] right-[-80px] h-[300px] w-[300px] rounded-full bg-[#1E3A8A]/15 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-[1440px]">
          <Link
            href="/colunas"
            className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Todos os colunistas
          </Link>

          <div className="grid gap-12 lg:grid-cols-[auto_1fr]">
            {/* AVATAR */}
            <div className="relative h-[160px] w-[160px] overflow-hidden rounded-[32px] border-4 border-gold/20 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <Image
                src={columnist.avatar}
                alt={columnist.name}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* INFO */}
            <div className="flex flex-col justify-center">
              <span className="text-xs font-black uppercase tracking-[0.35em] text-gold">
                {columnist.specialty}
              </span>

              <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] text-white lg:text-6xl">
                {columnist.name}
              </h1>

              <p className="mt-2 text-xl font-semibold text-zinc-400">
                {columnist.role}
              </p>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">
                {columnist.bio}
              </p>

              {columnist.social && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {columnist.social.twitter && (
                    <a
                      href="#"
                      className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-zinc-400 transition hover:border-white/20 hover:text-white"
                    >
                      <Twitter size={15} />
                      {columnist.social.twitter}
                    </a>
                  )}
                  {columnist.social.instagram && (
                    <a
                      href="#"
                      className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-zinc-400 transition hover:border-white/20 hover:text-white"
                    >
                      <Instagram size={15} />
                      {columnist.social.instagram}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10">
            <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">
              COLUNAS
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-navy">
              Publicações de {columnist.name.split(" ")[0]}
            </h2>
          </div>

          {articles.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <NewsCard key={article.id} article={article} variant="vertical" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100">
                <span className="text-3xl">✍️</span>
              </div>
              <h3 className="mt-6 text-xl font-black text-navy">
                Nenhuma coluna ainda
              </h3>
              <p className="mt-2 text-slate-500">
                Em breve teremos publicações de {columnist.name.split(" ")[0]}.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* OTHER COLUMNISTS */}
      <section className="border-t border-black/5 px-6 py-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-8">
            <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">
              OUTROS COLUNISTAS
            </span>
            <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-navy">
              Mais vozes do portal
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {columnists
              .filter((c) => c.id !== columnist.id)
              .map((c) => (
                <Link
                  key={c.id}
                  href={`/colunas/${c.slug}`}
                  className="group flex items-center gap-4 rounded-[24px] border border-black/5 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl">
                    <Image
                      src={c.avatar}
                      alt={c.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="truncate text-sm font-black text-navy transition group-hover:text-cobalt">
                      {c.name}
                    </h4>
                    <span className="block text-xs text-gold-dark">{c.role}</span>
                  </div>
                  <ArrowUpRight size={14} className="ml-auto shrink-0 text-slate-300 transition group-hover:text-cobalt" />
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
