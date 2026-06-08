import Link from "next/link";
import {
  ArrowUpRight,
  Calendar,
  Eye,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  Tag,
} from "lucide-react";
import { Listing, getCategoryNameBySlug, getTypeName, formatPrice } from "@/lib/classifieds";
import { formatDate } from "@/lib/utils";
import { ListingGallery } from "./listing-gallery";

type Props = {
  listing: Listing;
};

export function ListingDetail({ listing }: Props) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      {/* LEFT — Gallery + Info */}
      <div className="space-y-8">
        <ListingGallery images={listing.images} title={listing.title} />

        {/* INFO */}
        <div className="rounded-[32px] border border-black/5 bg-white p-7 shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
          {/* BADGES */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-gold px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-navy">
              {getTypeName(listing.type)}
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-600">
              {getCategoryNameBySlug(listing.category)}
            </span>
            {listing.isFeatured && (
              <span className="rounded-full bg-navy px-3.5 py-1.5 text-[10px] font-black uppercase tracking-widest text-gold">
                Destaque
              </span>
            )}
          </div>

          {/* TITLE */}
          <h1 className="mt-6 text-3xl font-black leading-tight tracking-[-0.04em] text-navy lg:text-4xl">
            {listing.title}
          </h1>

          {/* PRICE */}
          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-4xl font-black text-navy">
              {formatPrice(listing.price)}
            </span>
            {listing.type === "emprego" && listing.price && (
              <span className="text-sm text-slate-400">/mês</span>
            )}
          </div>

          {/* META */}
          <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-slate-100 pt-5 text-sm text-slate-500">
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-gold-dark" />
              {listing.contact.location}
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-gold-dark" />
              {formatDate(listing.createdAt)}
            </div>
            <div className="flex items-center gap-1.5">
              <Eye size={14} className="text-gold-dark" />
              {listing.views} visualizações
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-8">
            <h2 className="text-lg font-black text-navy">Descrição</h2>
            <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-slate-600">
              {listing.description}
            </p>
          </div>

          {/* SHARE */}
          <div className="mt-8 flex items-center gap-3 border-t border-slate-100 pt-5">
            <button className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-100">
              <Share2 size={14} />
              Compartilhar
            </button>
            <button className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-100">
              <Tag size={14} />
              Denunciar anúncio
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT — Contact Card */}
      <div className="lg:sticky lg:top-[240px] lg:self-start">
        <div className="overflow-hidden rounded-[32px] border border-black/5 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
          {/* HEADER */}
          <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-7 py-5">
            <h3 className="text-base font-black text-navy">Dados do anunciante</h3>
            <p className="mt-1 text-sm text-slate-400">{listing.contact.name}</p>
          </div>

          {/* ACTIONS */}
          <div className="space-y-3 p-6">
            {listing.contact.whatsapp && (
              <a
                href={`https://wa.me/${listing.contact.whatsapp}?text=Olá! Vi seu anúncio "${listing.title}" no Portal Funil e tenho interesse.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-emerald-500 px-5 py-4 text-sm font-black text-white transition hover:bg-emerald-600"
              >
                <MessageCircle size={18} />
                Chamar no WhatsApp
              </a>
            )}

            <a
              href={`tel:${listing.contact.phone}`}
              className="flex w-full items-center justify-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold text-navy transition hover:bg-slate-50"
            >
              <Phone size={16} />
              {listing.contact.phone}
            </a>

            <a
              href={`mailto:${listing.contact.email}?subject=Interesse no anúncio: ${listing.title}`}
              className="flex w-full items-center justify-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold text-navy transition hover:bg-slate-50"
            >
              <Mail size={16} />
              Enviar e-mail
            </a>
          </div>

          {/* LOCATION */}
          <div className="border-t border-slate-100 px-6 py-5">
            <div className="flex items-center gap-2.5 text-sm text-slate-500">
              <MapPin size={14} className="shrink-0 text-gold-dark" />
              {listing.contact.location}
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/classificados/novo"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gold px-5 py-4 text-sm font-black text-navy transition hover:-translate-y-0.5 hover:bg-gold-hover"
        >
          Anunciar grátis
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </div>
  );
}
