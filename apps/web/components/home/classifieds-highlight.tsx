import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Eye, MapPin, Plus, ShoppingBag } from "lucide-react";
import { getFeaturedListings } from "@/services/classifieds.service";
import { formatPrice, getCategoryNameBySlug, getTypeName } from "@/lib/classifieds";
import type { Listing } from "@/types/listing";

export async function ClassifiedsHighlight() {
  const featured: Listing[] = await getFeaturedListings(4);

  if (featured.length === 0) return null;

  return (
    <section className="relative px-6 pb-14">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <ShoppingBag size={14} className="text-gold-dark" />
              <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">
                CLASSIFICADOS
              </span>
            </div>
            <h2 className="mt-4 text-5xl font-black tracking-[-0.05em] text-navy">
              Compre e venda em Manaus
            </h2>
            <p className="mt-3 max-w-xl text-lg text-slate-500">
              Anúncios em destaque da comunidade — eletrônicos, veículos, imóveis, serviços e muito mais.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/classificados/novo"
              className="flex items-center gap-2 rounded-2xl bg-gold px-5 py-3 text-sm font-black text-navy transition hover:-translate-y-0.5 hover:bg-gold-hover"
            >
              <Plus size={15} />
              Anunciar grátis
            </Link>
            <Link
              href="/classificados"
              className="hidden items-center gap-2 rounded-2xl border border-black/5 bg-white px-5 py-3 text-sm font-semibold text-navy shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 lg:flex"
            >
              Ver todos
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* GRID */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((listing) => {
            const coverImage = listing.images?.[0];
            return (
              <Link
                key={listing.id}
                href={`/classificados/${listing.id}`}
                className="group overflow-hidden rounded-[32px] border border-black/5 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)] block"
              >
                <div className="relative h-[180px] overflow-hidden bg-slate-100">
                  {coverImage ? (
                    <Image
                      src={coverImage}
                      alt={listing.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <ShoppingBag size={32} className="text-slate-300" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <div className="absolute left-3.5 top-3.5">
                    <span className="rounded-full bg-gold px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-navy">
                      {getTypeName(listing.type)}
                    </span>
                  </div>

                  <div className="absolute bottom-3.5 left-3.5">
                    <span className="text-xl font-black text-white drop-shadow-lg">
                      {formatPrice(listing.price)}
                    </span>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-3.5">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gold-dark">
                    {getCategoryNameBySlug(listing.category)}
                  </span>
                  <h3 className="mt-1.5 line-clamp-2 text-sm font-bold leading-snug text-navy transition group-hover:text-cobalt">
                    {listing.title}
                  </h3>

                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin size={10} />
                      {listing.contact?.location?.split(",")[0] ?? "Manaus"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={10} />
                      {listing.views}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-10 text-center lg:hidden">
          <Link
            href="/classificados"
            className="inline-flex items-center gap-2 rounded-2xl border border-black/5 bg-white px-6 py-3.5 text-sm font-semibold text-navy shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5"
          >
            Ver todos os classificados
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
