"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Edit3,
  Eye,
  Pause,
  Play,
  Plus,
  Trash2,
} from "lucide-react";
import { listings, formatPrice, getCategoryNameBySlug } from "@/lib/classifieds";
import type { Listing, ListingStatus } from "@/lib/classifieds";
import { timeAgo } from "@/lib/utils";

const statusConfig: Record<ListingStatus, { label: string; color: string; bg: string }> = {
  ativo: { label: "Ativo", color: "text-emerald-600", bg: "bg-emerald-50" },
  pendente: { label: "Pendente", color: "text-amber-600", bg: "bg-amber-50" },
  pausado: { label: "Pausado", color: "text-slate-500", bg: "bg-slate-100" },
  recusado: { label: "Recusado", color: "text-red-600", bg: "bg-red-50" },
  expirado: { label: "Expirado", color: "text-slate-400", bg: "bg-slate-50" },
};

export function MyListingsTable() {
  const [myListings, setMyListings] = useState<Listing[]>(listings.slice(0, 5));

  function toggleStatus(id: string) {
    setMyListings((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, status: l.status === "ativo" ? "pausado" : "ativo" }
          : l
      )
    );
  }

  function removeListing(id: string) {
    setMyListings((prev) => prev.filter((l) => l.id !== id));
  }

  const activeCount = myListings.filter((l) => l.status === "ativo").length;
  const totalViews = myListings.reduce((sum, l) => sum + l.views, 0);

  return (
    <div className="space-y-8">
      {/* STATS */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-[24px] border border-black/5 bg-white px-5 py-4 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
          <div className="text-2xl font-black text-navy">{myListings.length}</div>
          <div className="mt-0.5 text-xs text-slate-400">Total de anúncios</div>
        </div>
        <div className="rounded-[24px] border border-black/5 bg-white px-5 py-4 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
          <div className="text-2xl font-black text-emerald-600">{activeCount}</div>
          <div className="mt-0.5 text-xs text-slate-400">Ativos</div>
        </div>
        <div className="rounded-[24px] border border-black/5 bg-white px-5 py-4 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
          <div className="text-2xl font-black text-navy">{totalViews.toLocaleString("pt-BR")}</div>
          <div className="mt-0.5 text-xs text-slate-400">Visualizações</div>
        </div>
        <Link
          href="/classificados/novo"
          className="flex items-center justify-center gap-2 rounded-[24px] bg-gold px-5 py-4 text-sm font-black text-navy transition hover:-translate-y-0.5 hover:bg-gold-hover"
        >
          <Plus size={18} />
          Novo anúncio
        </Link>
      </div>

      {/* LISTINGS */}
      <div className="space-y-4">
        {myListings.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[32px] border border-black/5 bg-white px-8 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <Plus size={28} className="text-slate-300" />
            </div>
            <h3 className="mt-5 text-lg font-black text-navy">Nenhum anúncio ainda</h3>
            <p className="mt-2 text-sm text-slate-400">Crie seu primeiro anúncio e comece a vender.</p>
            <Link
              href="/classificados/novo"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-navy px-5 py-3 text-sm font-black text-white transition hover:bg-cobalt"
            >
              <Plus size={15} />
              Criar anúncio
            </Link>
          </div>
        ) : (
          myListings.map((listing) => {
            const status = statusConfig[listing.status];
            return (
              <div
                key={listing.id}
                className="group relative flex flex-col gap-4 overflow-hidden rounded-[28px] border border-black/5 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)] sm:flex-row sm:items-center"
              >
                {/* IMAGE */}
                <div className="relative h-[100px] w-full shrink-0 overflow-hidden rounded-[20px] sm:w-[140px]">
                  <Image
                    src={listing.images[0]}
                    alt={listing.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* INFO */}
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-black ${status.bg} ${status.color}`}>
                      {status.label}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      {getCategoryNameBySlug(listing.category)}
                    </span>
                  </div>

                  <h3 className="line-clamp-1 text-sm font-bold text-navy">
                    {listing.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="font-bold text-navy">{formatPrice(listing.price)}</span>
                    <span className="flex items-center gap-1">
                      <Eye size={11} />
                      {listing.views}
                    </span>
                    <span>{timeAgo(listing.createdAt)}</span>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-2 sm:shrink-0">
                  <Link
                    href={`/classificados/${listing.id}`}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-slate-300 hover:text-navy"
                    title="Ver anúncio"
                  >
                    <Eye size={15} />
                  </Link>
                  <button
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-slate-300 hover:text-navy"
                    title="Editar"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    onClick={() => toggleStatus(listing.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-slate-300 hover:text-navy"
                    title={listing.status === "ativo" ? "Pausar" : "Ativar"}
                  >
                    {listing.status === "ativo" ? <Pause size={15} /> : <Play size={15} />}
                  </button>
                  <button
                    onClick={() => removeListing(listing.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-100 text-red-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    title="Excluir"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
