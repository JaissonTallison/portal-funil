import Link from "next/link";
import { ArrowUpRight, Siren } from "lucide-react";
import { getNewsArticles } from "@/services/articles.service";
import type { Article } from "@/types/article";

const MAX_AGE_MS = 48 * 60 * 60 * 1000;

export async function UrgentAlert() {
  const articles = await getNewsArticles();
  const byDate = (a: Article, b: Article) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  const isRecent = (a: Article) => Date.now() - new Date(a.publishedAt).getTime() <= MAX_AGE_MS;

  const urgent = articles.filter((a) => (a.category === "alerta" || a.isLive) && isRecent(a)).sort(byDate)[0];
  // Sem alerta recente, destaca a matéria em destaque mais nova para a faixa não sumir.
  const alert = urgent ?? articles.filter((a) => a.isFeatured).sort(byDate)[0];
  const badge = urgent ? "URGENTE" : "DESTAQUE";

  if (!alert) return null;

  return (
    <section className="px-6 pb-8 pt-2">
      <div className="mx-auto max-w-[1440px]">
        <Link
          href={`/noticias/${alert.slug}`}
          className="group flex items-center gap-4 overflow-hidden rounded-xl border border-red-500/20 bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 shadow-[0_8px_30px_rgba(239,68,68,0.25)] transition hover:shadow-[0_12px_40px_rgba(239,68,68,0.35)]"
        >
          {/* icon */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
            <Siren size={18} className="text-white" />
          </div>

          {/* text */}
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1">
            <span className="rounded-full bg-white px-3 py-0.5 text-[10px] font-black uppercase tracking-widest text-red-600">
              {badge}
            </span>
            <p className="truncate text-sm font-semibold text-white">
              {alert.title}
            </p>
          </div>

          {/* cta */}
          <div className="hidden shrink-0 items-center gap-1.5 text-xs font-black uppercase tracking-wide text-white/80 transition group-hover:text-white sm:flex">
            Ver cobertura
            <ArrowUpRight size={14} />
          </div>
        </Link>
      </div>
    </section>
  );
}
