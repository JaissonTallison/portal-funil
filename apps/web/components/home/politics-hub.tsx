import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  Calendar,
  Clock3,
  Globe,
  Landmark,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { pickPowerFeatured } from "@/lib/home-highlights";
import { timeAgo } from "@/lib/utils";
import { getNewsArticles, getCategoryName } from "@/services/articles.service";
import type { Article } from "@/types/article";

// Calendário eleitoral 2026 — fonte: CNN Brasil (art. 236 do Código Eleitoral).
const agenda = [
  { date: "19/09", time: "Sáb", event: "Candidatos não podem mais ser presos, salvo em flagrante", local: "Todo o Brasil" },
  { date: "29/09", time: "Ter", event: "Eleitores passam a ter proteção contra prisão", local: "Todo o Brasil" },
  { date: "04/10", time: "Dom", event: "Primeiro turno das eleições 2026", local: "Todo o Brasil" },
  { date: "06/10", time: "Ter", event: "Fim da proteção aos candidatos, 48h após a votação", local: "Todo o Brasil" },
  { date: "25/10", time: "Dom", event: "Segundo turno, se houver", local: "Todo o Brasil" },
];

const scopeStyles = [
  { id: "politica", label: "Política", icon: Landmark, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", href: "/categoria/politica" },
  { id: "economia", label: "Economia", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", href: "/categoria/economia" },
  { id: "mundo", label: "Mundo", icon: Globe, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100", href: "/categoria/mundo" },
];

const byDate = (a: Article, b: Article) =>
  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();

export async function PoliticsHub() {
  const articles = (await getNewsArticles()).sort(byDate);
  const featured = pickPowerFeatured(articles);
  const scopes = scopeStyles
    .map((scope) => ({
      ...scope,
      news: articles.filter((a) => a.category === scope.id && a.slug !== featured?.slug).slice(0, 4),
    }))
    .filter((scope) => scope.news.length > 0);

  return (
    <section className="relative px-6 pb-14">
      <div className="mx-auto max-w-[1440px]">

        {/* HEADER */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <Building2 size={14} className="text-gold-dark" />
              <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">
                POLÍTICA
              </span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.05em] text-navy">
              Poder em foco
            </h2>
            <p className="mt-3 max-w-xl text-lg text-slate-500">
              Política, economia e cenário internacional — tudo que impacta a sua vida.
            </p>
          </div>

          <Link
            href="/categoria/politica"
            className="hidden items-center gap-2 rounded-xl border border-black/5 bg-white px-5 py-3 text-sm font-semibold text-navy shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 lg:flex"
          >
            Cobertura completa
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* TOP ROW — Featured + Agenda */}
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">

          {/* FEATURED */}
          {featured && (
          <Link
            href={`/noticias/${featured.slug}`}
            className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[16px] bg-navy p-5 shadow-[0_20px_80px_rgba(2,6,23,0.2)] transition hover:-translate-y-1 sm:min-h-[460px] sm:p-10"
          >
            {/* foto */}
            <div className="pointer-events-none absolute inset-0">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/75 via-35% to-transparent" />
            </div>

            <div className="absolute left-5 top-5 z-10 sm:left-10 sm:top-10 flex items-center gap-3">
              <span className="rounded-full bg-gold px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-navy">
                {getCategoryName(featured.category)}
              </span>
              {featured.isFeatured && (
                <span className="flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/10 px-3 py-1.5 text-[10px] font-black text-gold">
                  <TrendingUp size={10} />
                  Destaque
                </span>
              )}
            </div>

            <div className="relative z-10">
              <h3 className="mt-5 text-2xl font-black leading-tight tracking-[-0.04em] text-white transition group-hover:text-gold sm:mt-7 sm:text-3xl lg:text-4xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                {featured.title}
              </h3>

              <p className="mt-3 line-clamp-3 max-w-2xl text-sm sm:mt-5 sm:line-clamp-none sm:text-base leading-relaxed text-zinc-200 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
                {featured.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-zinc-300">
                <div className="flex items-center gap-2">
                  <BookOpen size={14} className="text-gold" />
                  {featured.author}
                </div>
                <div className="flex items-center gap-2">
                  <Clock3 size={14} />
                  {timeAgo(featured.publishedAt)}
                </div>
                <div className="flex items-center gap-2">
                  <ArrowUpRight size={14} />
                  {featured.readTime} min de leitura
                </div>
              </div>
            </div>
          </Link>
          )}

          {/* AGENDA POLÍTICA */}
          <div className="overflow-hidden rounded-[16px] border border-black/5 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
            <div className="border-b border-slate-100 px-7 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy">
                  <Calendar size={16} className="text-gold" />
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    AGENDA
                  </span>
                  <h3 className="text-base font-black text-navy">Calendário eleitoral</h3>
                </div>
              </div>
            </div>

            <div className="divide-y divide-slate-50 px-4 pb-4 pt-2">
              {agenda.map((item) => (
                <div key={item.event} className="flex items-start gap-4 py-4">
                  {/* date badge */}
                  <div className="flex w-[56px] shrink-0 flex-col items-center rounded-xl bg-slate-50 py-2.5 text-center">
                    <span className="text-[10px] font-black uppercase text-gold-dark">
                      {item.date}
                    </span>
                    <span className="mt-0.5 text-xs font-black text-navy">{item.time}</span>
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-bold leading-snug text-navy">
                      {item.event}
                    </p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <MapPin size={10} className="shrink-0 text-slate-400" />
                      <span className="text-xs text-slate-400">{item.local}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM ROW — 3 scopes */}
        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
          {scopes.map(({ id, label, icon: Icon, color, bg, border, href, news }) => (
            <div
              key={id}
              className="w-[88%] shrink-0 snap-center overflow-hidden rounded-[12px] border border-black/5 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)] sm:w-[60%] lg:w-auto lg:rounded-[16px]"
            >
              {/* scope header */}
              <div className={`flex items-center gap-3 border-b ${border} bg-gradient-to-r from-slate-50 to-white px-6 py-5`}>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}>
                  <Icon size={18} className={color} />
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    EDITORIA
                  </span>
                  <h3 className={`text-base font-black ${color}`}>{label}</h3>
                </div>
                <Link
                  href={href}
                  className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:border-slate-300 hover:text-slate-600"
                >
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              {/* news list */}
              <div className="divide-y divide-slate-50">
                {news.map((item, i) => (
                  <Link
                    key={item.id}
                    href={`/noticias/${item.slug}`}
                    className="group flex items-start gap-4 px-6 py-4 transition hover:bg-slate-50"
                  >
                    {/* number */}
                    <span className="mt-0.5 shrink-0 text-2xl font-black text-slate-100 transition group-hover:text-slate-200">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0">
                      <p className="text-sm font-bold leading-snug text-navy transition group-hover:text-cobalt line-clamp-2">
                        {item.title}
                      </p>
                      <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                        <span suppressHydrationWarning>{timeAgo(item.publishedAt)}</span>
                        <span>•</span>
                        <span>{item.readTime} min de leitura</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* footer */}
              <div className={`mx-5 mb-5 rounded-xl ${bg} px-4 py-3`}>
                <Link
                  href={href}
                  className={`flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wide ${color}`}
                >
                  Ver toda a cobertura de {label}
                  <ArrowUpRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
