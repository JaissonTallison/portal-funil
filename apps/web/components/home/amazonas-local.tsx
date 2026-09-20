import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { timeAgo } from "@/lib/utils";
import { getArticlesByCategory } from "@/services/articles.service";

const MAX_ITEMS = 3;

export async function AmazonasLocal() {
  const articles = (await getArticlesByCategory("amazonas"))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, MAX_ITEMS);

  if (articles.length === 0) return null;

  return (
    <section className="relative px-6 pb-14">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-gold-dark" />
              <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">
                AMAZONAS
              </span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.05em] text-navy">
              Notícias locais
            </h2>
            <p className="mt-3 max-w-xl text-lg text-slate-500">
              O que acontece no Amazonas, de Manaus ao interior.
            </p>
          </div>

          <Link
            href="/categoria/amazonas"
            className="hidden items-center gap-2 rounded-xl border border-black/5 bg-white px-5 py-3 text-sm font-semibold text-navy shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 lg:flex"
          >
            Ver todas
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {articles.map((item) => (
            <Link
              key={item.id}
              href={`/noticias/${item.slug}`}
              className="group block w-[80%] shrink-0 snap-center overflow-hidden rounded-[12px] border border-black/5 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition duration-500 hover:-translate-y-2 md:w-auto md:rounded-[16px]"
            >
              <div className="relative h-[260px] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="line-clamp-3 text-lg font-black leading-tight tracking-[-0.03em] text-navy transition group-hover:text-cobalt">
                  {item.title}
                </h3>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-500">
                  {item.description}
                </p>
                <span className="mt-4 block text-xs text-slate-400" suppressHydrationWarning>
                  {timeAgo(item.publishedAt)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
