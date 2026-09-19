import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { columnists } from "@/lib/data";

export function ColumnistsSpotlight() {
  return (
    <section className="relative px-6 pb-14">
      <div className="mx-auto max-w-[1440px]">
        {/* HEADER */}
        <div className="mb-10 flex items-end justify-between">
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

        {/* GRID */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {columnists.map((columnist) => (
            <Link
              key={columnist.id}
              href={`/colunas/${columnist.slug}`}
              className="group flex flex-col overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1.5"
            >
              {/* TOP */}
              <div className="relative h-20 bg-gradient-to-br from-navy to-cobalt">
                <div className="absolute -right-6 -top-10 h-32 w-32 rounded-full bg-gold/15 blur-2xl" />
              </div>

              {/* AVATAR */}
              <div className="-mt-12 flex justify-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.18)]">
                  <Image
                    src={columnist.avatar}
                    alt={columnist.name}
                    fill
                    sizes="96px"
                    className="object-cover object-[center_20%] transition duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* BOTTOM */}
              <div className="flex flex-1 flex-col justify-between p-4 pt-3 text-center">
                <div>
                  <h3 className="font-black leading-tight text-navy transition group-hover:text-cobalt">
                    {columnist.name}
                  </h3>

                  <span className="mt-1 block text-xs font-semibold text-gold-dark">
                    {columnist.role}
                  </span>

                  <span className="mt-2 inline-block rounded-full bg-gold/20 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-navy">
                    {columnist.specialty}
                  </span>

                  <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-500">
                    {columnist.bio}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {(columnist.articleIds.length + (columnist.articleSlugs?.length ?? 0))}{" "}
                    {columnist.articleIds.length + (columnist.articleSlugs?.length ?? 0) === 1 ? "coluna" : "colunas"}
                  </span>

                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-navy text-white transition group-hover:bg-cobalt">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
