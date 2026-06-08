"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CalendarDays, Filter, Search, X } from "lucide-react";
import {
  events,
  EVENT_CATEGORIES,
  EventCategory,
  getUpcomingSpecialDates,
  formatEventDateLong,
} from "@/lib/agenda-data";
import { EventCard } from "@/components/agenda/event-card";

type FilterValue = EventCategory | "all" | "gratuito";

const FILTER_OPTIONS: { value: FilterValue; label: string; emoji: string }[] = [
  { value: "all",        label: "Todos",       emoji: "🗓️" },
  { value: "show",       label: "Shows",       emoji: "🎤" },
  { value: "festival",   label: "Festivais",   emoji: "🎪" },
  { value: "gastronomia",label: "Gastronomia", emoji: "🍽️" },
  { value: "cultura",    label: "Cultura",     emoji: "🎭" },
  { value: "feira",      label: "Feiras",      emoji: "🏪" },
  { value: "turismo",    label: "Turismo",     emoji: "🌿" },
  { value: "municipal",  label: "Municipal",   emoji: "🏛️" },
  { value: "gratuito",   label: "Gratuito",    emoji: "🎁" },
];

export default function AgendaPage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [search, setSearch] = useState("");

  const upcomingDates = getUpcomingSpecialDates(7);
  const todayLabel = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const featured = events.find((e) => e.isHighlighted);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchCat =
        activeFilter === "all"
          ? true
          : activeFilter === "gratuito"
          ? e.isFree
          : e.category === activeFilter;

      const q = search.toLowerCase();
      const matchSearch =
        q === ""
          ? true
          : e.title.toLowerCase().includes(q) ||
            e.venue.toLowerCase().includes(q) ||
            e.description.toLowerCase().includes(q) ||
            (e.neighborhood ?? "").toLowerCase().includes(q);

      return matchCat && matchSearch;
    });
  }, [activeFilter, search]);

  return (
    <main className="min-h-screen bg-surface">

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <div className="bg-navy px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">

          {/* BREADCRUMB */}
          <div className="flex items-center gap-2 text-xs text-white/30">
            <Link href="/" className="transition hover:text-white/60">Início</Link>
            <span>/</span>
            <span className="text-white/60">Agenda Cultural</span>
          </div>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="inline-block rounded-full bg-gold/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-gold">
                🗓️ Agenda Cultural — Manaus
              </span>
              <h1 className="mt-5 text-4xl font-black leading-none tracking-[-0.04em] text-white md:text-6xl">
                O que fazer<br />em Manaus
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/50">
                Shows, festivais, feiras, gastronomia, turismo e atrações culturais
                do Amazonas. Sua agenda regional completa, atualizada todo dia.
              </p>
            </div>

            {/* TODAY CARD */}
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm lg:w-[280px]">
              <div className="flex items-center gap-2">
                <CalendarDays size={13} className="text-gold" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gold">
                  Hoje
                </span>
              </div>
              <p className="mt-1 capitalize text-xs text-white/50">{todayLabel}</p>
              {upcomingDates.slice(0, 3).length > 0 && (
                <div className="mt-3 space-y-2">
                  {upcomingDates.slice(0, 3).map((d) => (
                    <div key={d.id} className="flex items-center gap-2">
                      <span className="text-base">{d.emoji}</span>
                      <span className="text-xs font-semibold text-white">{d.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── DATAS ESPECIAIS ─────────────────────────────────────────────────── */}
      {upcomingDates.length > 0 && (
        <div className="border-b border-gold/10 bg-cobalt px-4 py-4 md:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
              <span className="shrink-0 text-[10px] font-black uppercase tracking-widest text-gold">
                Datas especiais
              </span>
              <div className="flex gap-2">
                {upcomingDates.map((d) => (
                  <div
                    key={d.id}
                    className="flex shrink-0 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2"
                  >
                    <span className="text-base">{d.emoji}</span>
                    <div>
                      <p className="text-xs font-bold text-white">{d.title}</p>
                      <p className="text-[10px] text-white/30">{d.hashtag}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">

        {/* ── DESTAQUE ──────────────────────────────────────────────────────── */}
        {featured && activeFilter === "all" && search === "" && (
          <div className="mb-12">
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-gold-dark">
              ✦ Destaque da semana
            </p>
            <EventCard event={featured} variant="featured" />
          </div>
        )}

        {/* ── BUSCA + CONTAGEM ──────────────────────────────────────────────── */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <Search size={16} className="shrink-0 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar shows, feiras, locais..."
              className="flex-1 bg-transparent text-sm text-navy outline-none placeholder:text-slate-400"
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <X size={14} className="text-slate-400 transition hover:text-slate-600" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter size={13} />
            <span>
              {filtered.length} evento{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* ── FILTROS ───────────────────────────────────────────────────────── */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setActiveFilter(opt.value)}
              className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition ${
                activeFilter === opt.value
                  ? "bg-navy text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span>{opt.emoji}</span>
              {opt.label}
            </button>
          ))}
        </div>

        {/* ── GRID ──────────────────────────────────────────────────────────── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} variant="default" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-200 bg-white py-24">
            <CalendarDays size={40} className="text-slate-300" />
            <p className="mt-4 text-sm font-semibold text-slate-400">
              Nenhum evento encontrado
            </p>
            <p className="mt-1 text-xs text-slate-300">
              Tente outro filtro ou limpe a busca
            </p>
            <button
              onClick={() => { setActiveFilter("all"); setSearch(""); }}
              className="mt-5 rounded-xl bg-navy px-5 py-2.5 text-xs font-black text-white transition hover:bg-cobalt"
            >
              Ver todos os eventos
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
