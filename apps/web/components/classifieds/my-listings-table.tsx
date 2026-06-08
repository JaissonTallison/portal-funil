"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Edit3,
  Eye,
  Pause,
  Play,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { formatPrice, getCategoryNameBySlug, statusConfig } from "@/lib/classifieds";
import type { Listing } from "@/lib/classifieds";
import { timeAgo } from "@/lib/utils";
import { API_URL } from "@/lib/api";

export function MyListingsTable() {
  const [myListings, setMyListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/listings/user/mine`, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => setMyListings(Array.isArray(data) ? data : []))
      .catch(() => setMyListings([]))
      .finally(() => setLoading(false));
  }, []);

  async function toggleStatus(listing: Listing) {
    const nextStatus = listing.status === "ACTIVE" ? "PAUSED" : "ACTIVE";
    try {
      const res = await fetch(`${API_URL}/listings/${listing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        setMyListings((prev) =>
          prev.map((l) => (l.id === listing.id ? { ...l, status: nextStatus } : l))
        );
      }
    } catch {
      // ignore
    }
  }

  async function removeListing(id: string) {
    if (!confirm("Tem certeza que deseja excluir este anúncio?")) return;
    try {
      const res = await fetch(`${API_URL}/listings/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setMyListings((prev) => prev.filter((l) => l.id !== id));
      }
    } catch {
      // ignore
    }
  }

  const activeCount = myListings.filter((l) => l.status === "ACTIVE").length;
  const totalViews = myListings.reduce((sum, l) => sum + l.views, 0);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    );
  }

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
            const coverImage = listing.images?.[0];
            return (
              <div
                key={listing.id}
                className="group relative flex flex-col gap-4 overflow-hidden rounded-[28px] border border-black/5 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)] sm:flex-row sm:items-center"
              >
                {/* IMAGE */}
                <div className="relative h-[100px] w-full shrink-0 overflow-hidden rounded-[20px] bg-slate-100 sm:w-[140px]">
                  {coverImage ? (
                    <Image
                      src={coverImage}
                      alt={listing.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <ShoppingBag size={24} className="text-slate-300" />
                    </div>
                  )}
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
                    disabled
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    onClick={() => toggleStatus(listing)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-slate-300 hover:text-navy"
                    title={listing.status === "ACTIVE" ? "Pausar" : "Ativar"}
                  >
                    {listing.status === "ACTIVE" ? <Pause size={15} /> : <Play size={15} />}
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
