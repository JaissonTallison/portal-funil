import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Megaphone } from "lucide-react";
import { getSponsoredArticles, getCategoryName } from "@/lib/data";
import { timeAgo } from "@/lib/utils";

export function SponsoredContent() {
  const sponsored = getSponsoredArticles();

  if (sponsored.length === 0) return null;

  return (
    <section className="px-6 pb-14">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[36px] border border-black/5 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)] md:p-8">
          {/* HEADER */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100">
                <Megaphone size={16} className="text-slate-500" />
              </div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-navy">Conteúdo patrocinado</h2>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  Publicidade
                </span>
              </div>
            </div>

            <Link
              href="/publicidade"
              className="hidden items-center gap-1.5 text-xs font-semibold text-slate-400 transition hover:text-navy sm:flex"
            >
              Anuncie aqui
              <ArrowUpRight size={12} />
            </Link>
          </div>

          {/* CARDS */}
          <div className="grid gap-4 sm:grid-cols-2">
            {sponsored.map((article) => (
              <Link
                key={article.id}
                href={`/noticias/${article.slug}`}
                className="group flex gap-4 rounded-[24px] border border-black/5 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                <div className="relative h-[90px] w-[120px] shrink-0 overflow-hidden rounded-[16px]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col justify-between py-0.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gold-dark">
                        {getCategoryName(article.category)}
                      </span>
                      {article.sponsor && (
                        <span className="text-[9px] font-bold text-slate-400">
                          por {article.sponsor}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1.5 line-clamp-2 text-sm font-bold leading-snug text-navy transition group-hover:text-cobalt">
                      {article.title}
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-400">{timeAgo(article.publishedAt)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
