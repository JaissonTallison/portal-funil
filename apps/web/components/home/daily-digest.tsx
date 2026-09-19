import Link from "next/link";
import { Headphones, Sparkles } from "lucide-react";
import { ListenButton } from "@/components/home/listen-button";
import { HERO_SLUGS } from "@/lib/home-highlights";
import { getNewsArticles, getCategoryName } from "@/services/articles.service";
import type { Article } from "@/types/article";

const DIGEST_ITEMS = 5;
const MAX_AGE_MS = 48 * 60 * 60 * 1000;

/** Uma matéria por editoria (as mais novas, fora do carrossel principal); sobras completam a lista. */
function pickDigest(articles: Article[]): Article[] {
  const now = Date.now();
  const pool = articles
    .filter((a) => !HERO_SLUGS.includes(a.slug) && now - new Date(a.publishedAt).getTime() <= MAX_AGE_MS)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const firstPerCategory = pool.filter((a, i) => pool.findIndex((b) => b.category === a.category) === i);
  const rest = pool.filter((a) => !firstPerCategory.includes(a));
  return [...firstPerCategory, ...rest].slice(0, DIGEST_ITEMS);
}

export async function DailyDigest() {
  const top5 = pickDigest(await getNewsArticles());
  if (top5.length === 0) return null;

  const spoken = `Resumo do dia. ${top5.map((a) => `${a.title}. ${a.description}`).join(" ")}`;

  return (
    <section className="px-6 pb-6 pt-6">
      <div className="mx-auto max-w-[1440px]">
        <div className="overflow-hidden rounded-[32px] border border-black/5 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)] md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            {/* HEADER + BULLETS */}
            <div className="flex-1">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/10">
                  <Sparkles size={16} className="text-gold-dark" />
                </div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-black text-navy">Resumo do dia</h2>
                  <span className="rounded-full bg-navy px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-gold">
                    Últimas 48h
                  </span>
                </div>
              </div>

              <ul className="mt-4 space-y-2.5">
                {top5.map((article, i) => (
                  <li key={article.id} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-100 text-[10px] font-black text-slate-500">
                      {i + 1}
                    </span>
                    <Link
                      href={`/noticias/${article.slug}`}
                      className="text-sm leading-snug text-slate-600 transition hover:text-navy"
                    >
                      <span className="mr-2 rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-slate-500">
                        {getCategoryName(article.category)}
                      </span>
                      <span className="font-bold text-navy">{article.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* AUDIO BUTTON */}
            <ListenButton text={spoken} />
          </div>
        </div>
      </div>
    </section>
  );
}
