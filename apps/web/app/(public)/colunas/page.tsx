import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, PenLine } from "lucide-react";
import { columnists, getColumnistArticles } from "@/lib/data";
import { SITE_NAME } from "@/lib/constants";
import { timeAgo } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Colunas de Opinião | ${SITE_NAME}`,
  description: "Leia as colunas dos nossos especialistas e analistas sobre política, economia, saúde e muito mais.",
};

export default function ColunasPage() {
  return (
    <main className="min-h-screen bg-surface text-navy">
      {/* HEADER */}
      <section className="relative overflow-hidden bg-navy px-6 py-20">
        <div className="absolute left-[-100px] top-[-100px] h-[350px] w-[350px] rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#1E3A8A]/15 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-[1440px]">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10">
              <PenLine size={22} className="text-gold" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.35em] text-gold">
              PORTAL FUNIL
            </span>
          </div>

          <h1 className="mt-6 text-5xl font-black tracking-[-0.05em] text-white lg:text-7xl">
            Colunas de
            <br />
            <span className="text-gold">opinião</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Análises aprofundadas, perspectivas únicas e opiniões qualificadas
            sobre os temas que moldam Manaus e o Amazonas.
          </p>

          {/* STATS */}
          <div className="mt-10 flex flex-wrap gap-6">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
              <span className="text-2xl font-black text-gold">{columnists.length}</span>
              <span className="text-sm text-zinc-400">colunistas</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
              <span className="text-2xl font-black text-gold">
                {columnists.reduce((acc, c) => acc + c.articleIds.length, 0)}
              </span>
              <span className="text-sm text-zinc-400">colunas publicadas</span>
            </div>
          </div>
        </div>
      </section>

      {/* COLUMNISTS GRID */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1440px] space-y-8">
          {columnists.map((columnist) => {
            const articles = getColumnistArticles(columnist);
            const latest = articles[0];

            return (
              <div
                key={columnist.id}
                className="overflow-hidden rounded-[40px] border border-black/5 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]"
              >
                <div className="grid lg:grid-cols-[320px_1fr]">
                  {/* LEFT – PROFILE */}
                  <div className="relative flex flex-col items-center justify-center gap-6 overflow-hidden bg-gradient-to-br from-navy to-cobalt p-10 text-center">
                    {/* GLOW */}
                    <div className="absolute left-1/2 top-0 h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-gold/10 blur-[80px]" />

                    {/* AVATAR */}
                    <div className="relative z-10">
                      <div className="relative h-[120px] w-[120px] overflow-hidden rounded-full border-4 border-gold/30">
                        <Image
                          src={columnist.avatar}
                          alt={columnist.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="relative z-10">
                      <h2 className="text-xl font-black text-white">
                        {columnist.name}
                      </h2>

                      <span className="mt-1.5 block text-sm font-semibold text-gold">
                        {columnist.role}
                      </span>

                      <span className="mt-1 block text-xs text-zinc-400">
                        {columnist.specialty}
                      </span>
                    </div>

                    {/* SOCIAL */}
                    {columnist.social && (
                      <div className="relative z-10 flex gap-2">
                        {columnist.social.twitter && (
                          <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400">
                            {columnist.social.twitter}
                          </span>
                        )}
                      </div>
                    )}

                    <Link
                      href={`/colunas/${columnist.slug}`}
                      className="relative z-10 flex items-center gap-2 rounded-2xl bg-gold px-6 py-3 text-sm font-black text-navy transition hover:bg-gold-hover"
                    >
                      Ver todas as colunas
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>

                  {/* RIGHT – BIO + LATEST */}
                  <div className="flex flex-col justify-between p-8 lg:p-10">
                    <div>
                      <p className="text-base leading-relaxed text-slate-600">
                        {columnist.bio}
                      </p>

                      {latest && (
                        <div className="mt-8">
                          <span className="text-xs font-black uppercase tracking-[0.3em] text-gold-dark">
                            ÚLTIMA COLUNA
                          </span>

                          <Link
                            href={`/noticias/${latest.slug}`}
                            className="group mt-4 block"
                          >
                            <h3 className="text-2xl font-black leading-tight tracking-[-0.04em] text-navy transition group-hover:text-cobalt">
                              {latest.title}
                            </h3>

                            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-500">
                              {latest.description}
                            </p>

                            <span className="mt-3 block text-xs text-slate-400">
                              {timeAgo(latest.publishedAt)} · {latest.readTime} min
                            </span>
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* ARTICLE LIST */}
                    {articles.length > 1 && (
                      <div className="mt-8 border-t border-black/5 pt-6">
                        <span className="text-xs font-semibold text-slate-400">
                          Outras colunas
                        </span>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {articles.slice(1).map((a) => (
                            <Link
                              key={a.id}
                              href={`/noticias/${a.slug}`}
                              className="rounded-xl border border-black/5 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                            >
                              {a.title.length > 50 ? a.title.slice(0, 50) + "…" : a.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative overflow-hidden rounded-[40px] bg-navy p-12 text-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[400px] w-[400px] rounded-full bg-gold/5 blur-[120px]" />
            </div>

            <div className="relative z-10">
              <span className="text-xs font-black uppercase tracking-[0.35em] text-gold">
                ESCREVA PARA NÓS
              </span>

              <h2 className="mt-6 text-4xl font-black tracking-[-0.05em] text-white">
                Quer ser colunista do Portal Funil?
              </h2>

              <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-zinc-400">
                Compartilhe seu conhecimento com milhares de leitores. Entre em
                contato com nossa equipe editorial.
              </p>

              <Link
                href="/contato"
                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gold px-8 py-4 text-sm font-black text-navy transition hover:-translate-y-0.5"
              >
                Entrar em contato
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
