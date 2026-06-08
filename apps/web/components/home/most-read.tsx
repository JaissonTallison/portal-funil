import Link from "next/link";
import { Eye, TrendingUp } from "lucide-react";
import { getMostRead, getCategoryName } from "@/services/articles.service";
import { formatViews } from "@/lib/utils";

export async function MostRead() {
  const articles = await getMostRead(6);

  return (
    <section className="relative px-6 pb-14">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">
              RANKING
            </span>
            <h2 className="mt-4 text-5xl font-black tracking-[-0.05em] text-navy">
              Mais lidas
            </h2>
          </div>

          <Link
            href="/noticias"
            className="hidden items-center gap-2 rounded-2xl border border-black/5 bg-white px-5 py-3 text-sm font-semibold text-navy shadow-[0_10px_40px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 lg:flex"
          >
            Ver todas
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* TOP 1 */}
          <Link
            href={`/noticias/${articles[0].slug}`}
            className="group relative col-span-full overflow-hidden rounded-[36px] bg-navy p-8 shadow-[0_20px_60px_rgba(15,23,42,0.12)] transition hover:-translate-y-1 lg:col-span-1 lg:row-span-3"
          >
            {/* BG */}
            <div className="absolute inset-0">
              <div className="absolute left-[-60px] top-[-60px] h-[240px] w-[240px] rounded-full bg-gold/10 blur-[80px]" />
              <div className="absolute bottom-[-60px] right-[-60px] h-[200px] w-[200px] rounded-full bg-[#1E3A8A]/20 blur-[80px]" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <span className="text-7xl font-black text-gold/20">01</span>
                <div className="flex items-center gap-1.5 rounded-full bg-gold px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-navy">
                  <TrendingUp size={11} />
                  Mais lida
                </div>
              </div>

              <span className="mt-6 block text-xs font-black uppercase tracking-[0.3em] text-gold">
                {getCategoryName(articles[0].category)}
              </span>

              <h3 className="mt-4 text-3xl font-black leading-tight tracking-[-0.04em] text-white transition group-hover:text-gold lg:text-4xl">
                {articles[0].title}
              </h3>

              <p className="mt-5 line-clamp-3 text-sm leading-relaxed text-zinc-400">
                {articles[0].description}
              </p>

              <div className="mt-8 flex items-center gap-2 text-sm text-zinc-500">
                <Eye size={14} className="text-gold" />
                <span className="font-bold text-zinc-300">
                  {formatViews(articles[0].views)}
                </span>
                visualizações
              </div>
            </div>
          </Link>

          {/* 2–6 */}
          {articles.slice(1).map((article, i) => (
            <Link
              key={article.id}
              href={`/noticias/${article.slug}`}
              className="group flex items-center gap-5 rounded-[28px] border border-black/5 bg-white/80 p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] backdrop-blur-xl transition hover:-translate-y-0.5"
            >
              <span className="shrink-0 text-4xl font-black text-slate-100 transition group-hover:text-gold/30">
                {String(i + 2).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-dark">
                  {getCategoryName(article.category)}
                </span>

                <h3 className="mt-1.5 line-clamp-2 text-sm font-bold leading-snug text-navy transition group-hover:text-cobalt">
                  {article.title}
                </h3>

                <div className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                  <Eye size={11} />
                  {formatViews(article.views)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
