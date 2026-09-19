import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ColumnistsCarousel } from "@/components/home/columnists-carousel";
import { columnists } from "@/lib/data";

export function ColumnistsSpotlight() {
  return (
    <section className="relative px-6 pb-14">
      <div className="mx-auto max-w-[1440px]">
        {/* HEADER */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">
              OPINIÃO
            </span>
            <h2 className="mt-4 text-5xl font-black tracking-[-0.05em] text-navy">
              Nossos colunistas
            </h2>
          </div>

          <Link
            href="/colunas"
            className="hidden items-center gap-2 rounded-2xl border border-black/5 bg-white px-5 py-3 text-sm font-semibold text-navy shadow-[0_10px_40px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 lg:flex"
          >
            Todas as colunas
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* CARROSSEL — uma linha só */}
        <ColumnistsCarousel
          columnists={columnists.map((c) => ({
            id: c.id,
            slug: c.slug,
            name: c.name,
            role: c.role,
            specialty: c.specialty,
            avatar: c.avatar,
            count: c.articleIds.length + (c.articleSlugs?.length ?? 0),
          }))}
        />
      </div>
    </section>
  );
}
