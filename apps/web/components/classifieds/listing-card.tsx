import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Eye, MapPin } from "lucide-react";
import { Listing, getCategoryNameBySlug, getTypeName, formatPrice } from "@/lib/classifieds";
import { timeAgo } from "@/lib/utils";

type Props = {
  listing: Listing;
  variant?: "grid" | "list";
};

export function ListingCard({ listing, variant = "grid" }: Props) {
  if (variant === "list") {
    return (
      <Link
        href={`/classificados/${listing.id}`}
        className="group flex gap-5 overflow-hidden rounded-[28px] border border-black/5 bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.10)]"
      >
        <div className="relative h-[120px] w-[160px] shrink-0 overflow-hidden rounded-[20px]">
          <Image
            src={listing.images[0]}
            alt={listing.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute left-2.5 top-2.5">
            <span className="rounded-full bg-gold px-3 py-1 text-[9px] font-black uppercase tracking-widest text-navy">
              {getTypeName(listing.type)}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between py-1">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-dark">
              {getCategoryNameBySlug(listing.category)}
            </span>
            <h3 className="mt-1.5 line-clamp-2 text-base font-bold leading-snug text-navy transition group-hover:text-cobalt">
              {listing.title}
            </h3>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-lg font-black text-navy">
                {formatPrice(listing.price)}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <MapPin size={11} />
                {listing.contact.location}
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-white transition group-hover:bg-cobalt">
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/classificados/${listing.id}`}
      className="group overflow-hidden rounded-[32px] border border-black/5 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)] block"
    >
      <div className="relative h-[200px] overflow-hidden">
        <Image
          src={listing.images[0]}
          alt={listing.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full bg-gold px-3.5 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-navy">
            {getTypeName(listing.type)}
          </span>
          <span className="rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-navy backdrop-blur-sm">
            {getCategoryNameBySlug(listing.category)}
          </span>
        </div>

        {listing.isFeatured && (
          <div className="absolute right-4 top-4 rounded-full bg-navy/80 px-3 py-1.5 backdrop-blur-sm">
            <span className="text-[9px] font-black uppercase tracking-widest text-gold">
              Destaque
            </span>
          </div>
        )}

        <div className="absolute bottom-4 left-4">
          <span className="text-2xl font-black text-white drop-shadow-lg">
            {formatPrice(listing.price)}
          </span>
        </div>
      </div>

      <div className="px-5 pb-5 pt-4">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-navy transition group-hover:text-cobalt">
          {listing.title}
        </h3>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin size={11} />
              {listing.contact.location.split(",")[0]}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={11} />
              {listing.views}
            </span>
          </div>
          <span className="text-[10px] text-slate-400">
            {timeAgo(listing.createdAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}
