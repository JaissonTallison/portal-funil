"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Plus, ShoppingBag } from "lucide-react";
import { API_URL } from "@/lib/api";
import type { Listing } from "@/types/listing";
import { ListingCard } from "@/components/classifieds/listing-card";
import { ListingFilters } from "@/components/classifieds/listing-filters";

function ClassificadosContent() {
  const searchParams = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const categoria = searchParams.get("categoria") ?? "";
  const tipo = searchParams.get("tipo") ?? "";
  const busca = searchParams.get("busca") ?? "";

  useEffect(() => {
    const params = new URLSearchParams();
    if (categoria) params.set("category", categoria);
    if (tipo) params.set("type", tipo);
    params.set("limit", "50");

    setLoading(true);
    fetch(`${API_URL}/listings?${params.toString()}`, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        setListings(data.items ?? []);
        setTotal(data.total ?? 0);
      })
      .catch(() => {
        setListings([]);
        setTotal(0);
      })
      .finally(() => setLoading(false));
  }, [categoria, tipo]);

  const results = busca
    ? listings.filter((l) => {
        const q = busca.toLowerCase();
        return (
          l.title.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.contact.location.toLowerCase().includes(q)
        );
      })
    : listings;

  return (
    <>
      <p className="mb-3 max-w-xl text-lg text-slate-500">
        Compre, venda e anuncie serviços na maior comunidade de Manaus.
        <span className="ml-2 font-bold text-navy">{total} anúncios ativos</span>
      </p>

      <div className="mb-10 mt-6">
        <ListingFilters />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        </div>
      ) : results.length > 0 ? (
        <>
          <p className="mb-6 text-sm text-slate-400">
            {results.length} anúncio{results.length !== 1 ? "s" : ""} encontrado{results.length !== 1 ? "s" : ""}
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-[32px] border border-black/5 bg-white px-8 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <ShoppingBag size={28} className="text-slate-300" />
          </div>
          <h3 className="mt-5 text-lg font-black text-navy">Nenhum anúncio encontrado</h3>
          <p className="mt-2 max-w-sm text-sm text-slate-400">
            Tente ajustar os filtros ou buscar por outro termo.
          </p>
          <Link
            href="/classificados"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-navy transition hover:bg-slate-50"
          >
            Limpar filtros
          </Link>
        </div>
      )}
    </>
  );
}

export default function ClassificadosPage() {
  return (
    <main className="min-h-screen bg-surface px-6 pb-24 pt-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <ShoppingBag size={14} className="text-gold-dark" />
              <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">
                CLASSIFICADOS
              </span>
            </div>
            <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] text-navy">
              Classificados Manaus
            </h1>
          </div>

          <Link
            href="/classificados/novo"
            className="flex items-center gap-2 rounded-2xl bg-gold px-6 py-3.5 text-sm font-black text-navy transition hover:-translate-y-0.5 hover:bg-gold-hover"
          >
            <Plus size={16} />
            Anunciar grátis
          </Link>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
            </div>
          }
        >
          <ClassificadosContent />
        </Suspense>
      </div>
    </main>
  );
}
