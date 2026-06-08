import Link from "next/link";
import { Headphones, Sparkles } from "lucide-react";
import { getAllArticles } from "@/services/articles.service";

export async function DailyDigest() {
  const all = await getAllArticles();
  const top5 = all.slice(0, 5);

  return (
    <section className="px-6 pb-6 pt-6">
      <div className="mx-auto max-w-7xl">
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
                    IA
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
                      <span className="font-bold text-navy">{article.title}</span>
                      {" — "}
                      {article.description.slice(0, 80)}...
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* AUDIO BUTTON */}
            <button className="flex shrink-0 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-100">
              <Headphones size={14} />
              Ouvir resumo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
