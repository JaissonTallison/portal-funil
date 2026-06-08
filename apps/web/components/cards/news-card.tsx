import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Eye, Radio } from "lucide-react";
import type { Article } from "@/types/article";
import { getCategoryName } from "@/lib/data";
import { timeAgo, formatViews } from "@/lib/utils";

type Variant = "vertical" | "horizontal" | "compact";

type Props = {
  article: Article;
  variant?: Variant;
};

export function NewsCard({ article, variant = "vertical" }: Props) {
  if (variant === "horizontal") {
    return (
      <Link href={`/noticias/${article.slug}`} className="group flex gap-5 rounded-[28px] border border-black/5 bg-white/80 p-5 shadow-[0_10px_40px_rgba(15,23,42,0.05)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5">
        <div className="relative h-[100px] w-[140px] shrink-0 overflow-hidden rounded-[20px]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col justify-between py-1">
          <div>
            <div className="flex items-center gap-2">
              {article.isLive && (
                <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-red-500">
                  <Radio size={10} className="animate-pulse" />
                  Ao vivo
                </span>
              )}
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-dark">
                {getCategoryName(article.category)}
              </span>
            </div>

            <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-snug text-navy transition group-hover:text-cobalt">
              {article.title}
            </h3>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {timeAgo(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={11} />
              {formatViews(article.views)}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/noticias/${article.slug}`} className="group flex items-start gap-4 rounded-[24px] border border-black/5 bg-white/80 p-5 transition hover:bg-slate-50">
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gold/10">
          <span className="text-xs font-black text-gold-dark">
            {getCategoryName(article.category).slice(0, 2).toUpperCase()}
          </span>
        </div>

        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-dark">
            {getCategoryName(article.category)}
          </span>

          <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-navy transition group-hover:text-cobalt">
            {article.title}
          </h3>

          <span className="mt-1 block text-xs text-slate-400">
            {timeAgo(article.publishedAt)}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/noticias/${article.slug}`} className="group overflow-hidden rounded-[36px] border border-black/5 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition duration-500 hover:-translate-y-2 block">
      <div className="relative h-[260px] overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute left-5 top-5 flex items-center gap-2">
          {article.isSponsored && (
            <span className="rounded-full bg-navy/80 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-gold backdrop-blur-sm">
              Patrocinado
            </span>
          )}
          {article.isLive && (
            <span className="flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white">
              <Radio size={10} className="animate-pulse" />
              Ao vivo
            </span>
          )}
          <span className="rounded-full bg-gold px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-navy">
            {getCategoryName(article.category)}
          </span>
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <h3 className="line-clamp-2 text-xl font-black leading-tight tracking-[-0.04em] text-white">
            {article.title}
          </h3>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {timeAgo(article.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={12} />
            {formatViews(article.views)}
          </span>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cobalt text-white transition group-hover:bg-navy">
          <ArrowUpRight size={16} />
        </div>
      </div>
    </Link>
  );
}
