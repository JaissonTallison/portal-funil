import Link from "next/link";
import { Flame, TrendingUp } from "lucide-react";
import { getAllArticles, getCategoryName } from "@/services/articles.service";
import type { Article } from "@/types/article";

const LABEL_OVERRIDES: Record<string, string> = { policial: "Segurança" };
const MAX_TOPICS = 8;
const HOT_TOPICS = 2;

function buildTopics(articles: Article[]) {
  const counts = new Map<string, number>();
  for (const a of articles) counts.set(a.category, (counts.get(a.category) ?? 0) + 1);

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_TOPICS)
    .map(([slug, count], i) => ({
      slug,
      label: LABEL_OVERRIDES[slug] ?? getCategoryName(slug),
      count: `${count} ${count === 1 ? "matéria" : "matérias"}`,
      hot: i < HOT_TOPICS,
    }));
}

export async function TrendingTopics() {
  const topics = buildTopics(await getAllArticles());
  if (topics.length === 0) return null;

  return (
    <section className="relative px-6 pb-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="overflow-hidden rounded-[36px] border border-black/5 bg-white p-8 shadow-[0_10px_50px_rgba(15,23,42,0.06)]">
          <div className="flex flex-wrap items-center gap-4 lg:flex-nowrap">
            {/* LABEL */}
            <div className="flex shrink-0 items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold/10">
                <TrendingUp size={18} className="text-gold-dark" />
              </div>
              <div>
                <span className="block text-[10px] font-black uppercase tracking-[0.35em] text-gold-dark">
                  TENDÊNCIAS
                </span>
                <span className="text-sm font-black text-navy">Agora</span>
              </div>
              <div className="ml-2 h-8 w-px bg-slate-200" />
            </div>

            {/* TOPICS */}
            <div className="scrollbar-hide flex flex-1 flex-wrap gap-2.5 overflow-x-auto sm:flex-nowrap">
              {topics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/categoria/${topic.slug}`}
                  className={`group flex shrink-0 items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 ${
                    topic.hot
                      ? "border-gold/30 bg-gold/8 text-navy hover:bg-gold/15"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100 hover:text-navy"
                  }`}
                >
                  {topic.hot && (
                    <Flame size={13} className="text-orange-500" />
                  )}
                  <span className="font-black text-navy">#{topic.label}</span>
                  <span className={`text-xs ${topic.hot ? "text-gold-dark" : "text-slate-400"}`}>
                    {topic.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
