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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {columnists.map((columnist) => (
            <Link
              key={columnist.id}
              href={`/colunas/${columnist.slug}`}
              className="group flex flex-col overflow-hidden rounded-[36px] border border-black/5 bg-white shadow-[0_10px_50px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-2"
            >
              {/* TOP */}
              <div className="relative h-[180px] overflow-hidden bg-gradient-to-br from-navy to-cobalt">
                <Image
                  src={columnist.avatar}
                  alt={columnist.name}
                  fill
                  className="object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute bottom-4 left-4">
                  <span className="rounded-full bg-gold px-3 py-1 text-[9px] font-black uppercase tracking-widest text-navy">
                    {columnist.specialty}
                  </span>
                </div>
              </div>

              {/* BOTTOM */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="font-black leading-tight text-navy transition group-hover:text-cobalt">
                    {columnist.name}
                  </h3>

                  <span className="mt-1 block text-xs text-gold-dark font-semibold">
                    {columnist.role}
                  </span>

                  <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-500">
                    {columnist.bio}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {columnist.articleIds.length} colunas
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
