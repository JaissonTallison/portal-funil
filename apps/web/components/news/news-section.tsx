import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, Radio, TriangleAlert } from "lucide-react";
import { getNewsArticles, getCategoryName } from "@/services/articles.service";
import { HERO_SLUGS, pickDiverse, pickLiveLead, pickPowerFeatured } from "@/lib/home-highlights";
import { timeAgo } from "@/lib/utils";

export async function NewsSection() {
  const articles = await getNewsArticles();
  // Evita repetir o carrossel principal, o destaque da Central ao vivo e a seção local (Amazonas).
  const liveLeadSlug = pickLiveLead(articles)?.slug;
  const powerSlug = pickPowerFeatured(articles)?.slug;
  const pool = [...articles]
    .filter((a) => !HERO_SLUGS.includes(a.slug) && a.slug !== liveLeadSlug && a.slug !== powerSlug)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  const notBreaking = (a: { category: string }) => a.category !== "amazonas" && a.category !== "musica";
  const featured = pool.find(notBreaking) ?? pool[0];
  const sideNews = pickDiverse(
    pool.filter((a) => a.id !== featured?.id && a.category !== featured?.category && notBreaking(a)),
    3,
  );

  if (!featured) return null;

  return (
    <section className="relative px-6 pb-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">
              BREAKING NEWS
            </span>
            <h2 className="mt-4 text-5xl font-black tracking-[-0.05em] text-navy">
              Cobertura em destaque
            </h2>
          </div>
          <Link
            href="/noticias"
            className="hidden items-center gap-2 rounded-2xl border border-black/5 bg-white px-5 py-3 text-sm font-semibold text-navy shadow-[0_10px_40px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 lg:flex"
          >
            Ver cobertura completa
            <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_420px]">
          {/* MAIN */}
          <Link
            href={`/noticias/${featured.slug}`}
            className="group relative overflow-hidden rounded-[40px] border border-black/5 bg-navy p-10 text-white shadow-[0_20px_80px_rgba(2,6,23,0.25)] transition hover:-translate-y-1 block"
          >
            <div className="absolute inset-0">
              <Image src={featured.image} alt={featured.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-navy/60 via-transparent to-transparent" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2 text-xs font-black uppercase tracking-[0.25em] text-navy">
                {featured.isLive && <Radio size={14} />}
                {featured.isLive ? "Ao vivo" : getCategoryName(featured.category)}
              </div>
              <h3 className="mt-8 max-w-4xl text-5xl font-black leading-[1] tracking-[-0.05em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] transition group-hover:text-gold lg:text-7xl">
                {featured.title}
              </h3>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-200 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
                {featured.description}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-zinc-400">
                <div className="flex items-center gap-2">
                  <Clock3 size={16} />
                  {timeAgo(featured.publishedAt)}
                </div>
                <div className="flex items-center gap-2">
                  <TriangleAlert size={16} />
                  {featured.readTime} min de leitura
                </div>
              </div>
            </div>
          </Link>

          {/* SIDE */}
          <div className="space-y-5">
            {sideNews.map((item) => (
              <Link
                key={item.id}
                href={`/noticias/${item.slug}`}
                className="group flex gap-5 overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.10)]"
              >
                <div className="relative h-auto w-[120px] shrink-0 overflow-hidden rounded-l-[28px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-between py-5 pr-5">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-dark">
                      {getCategoryName(item.category)}
                    </span>
                    <h3 className="mt-2 line-clamp-2 text-base font-black leading-snug tracking-[-0.03em] text-navy transition group-hover:text-cobalt">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{timeAgo(item.publishedAt)}</span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-navy text-white transition group-hover:bg-cobalt">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
