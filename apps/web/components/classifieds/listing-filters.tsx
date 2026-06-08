"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { LISTING_TYPES } from "@/lib/classifieds";
import { CategoryPills } from "./category-pills";

export function ListingFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("busca") ?? "");

  const activeCategory = searchParams.get("categoria") ?? undefined;
  const activeType = searchParams.get("tipo") ?? undefined;

  function updateParams(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/classificados?${params.toString()}`);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    updateParams("busca", search || null);
  }

  return (
    <div className="space-y-5">
      {/* SEARCH BAR */}
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition focus-within:border-gold/40 focus-within:shadow-[0_4px_20px_rgba(244,197,66,0.1)]">
          <Search size={18} className="shrink-0 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar anúncios por título, descrição ou localização..."
            className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-slate-400"
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 rounded-2xl bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-cobalt"
        >
          <SlidersHorizontal size={15} />
          <span className="hidden sm:inline">Buscar</span>
        </button>
      </form>

      {/* CATEGORY PILLS */}
      <CategoryPills active={activeCategory} />

      {/* TYPE PILLS */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => updateParams("tipo", null)}
          className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
            !activeType
              ? "bg-navy text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Todos os tipos
        </button>
        {LISTING_TYPES.map((t) => (
          <button
            key={t.value}
            onClick={() => updateParams("tipo", activeType === t.value ? null : t.value)}
            className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
              activeType === t.value
                ? "bg-navy text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
