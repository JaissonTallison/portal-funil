import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";
import type { Event } from "@/types/event";
import { EVENT_CATEGORIES, formatEventDate } from "@/lib/agenda-data";

type Props = {
  event: Event;
  variant?: "default" | "compact" | "featured";
};

export function EventCard({ event, variant = "default" }: Props) {
  const cat = EVENT_CATEGORIES[event.category];
  const dateLabel = formatEventDate(event.date);
  const hasEndDate = event.endDate && event.endDate !== event.date;

  // ── COMPACT ──────────────────────────────────────────────────────────────
  if (variant === "compact") {
    return (
      <Link
        href={`/agenda/${event.slug}`}
        className="group flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-3 transition hover:border-slate-200 hover:shadow-sm"
      >
        <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-navy text-center">
          <span className="text-[9px] font-black uppercase text-gold">
            {new Date(event.date + "T00:00:00").toLocaleDateString("pt-BR", { month: "short" })}
          </span>
          <span className="text-lg font-black leading-none text-white">
            {new Date(event.date + "T00:00:00").getDate()}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
            {cat.emoji} {cat.label}
          </p>
          <p className="mt-0.5 line-clamp-2 text-sm font-bold leading-snug text-navy group-hover:text-cobalt">
            {event.title}
          </p>
          <p className="mt-1 text-xs text-slate-400">{event.venue}</p>
        </div>

        <span
          className={`shrink-0 self-start rounded-xl px-2 py-1 text-[10px] font-black uppercase ${
            event.isFree
              ? "bg-emerald-50 text-emerald-700"
              : "bg-slate-50 text-slate-500"
          }`}
        >
          {event.isFree ? "Grátis" : event.price}
        </span>
      </Link>
    );
  }

  // ── FEATURED ─────────────────────────────────────────────────────────────
  if (variant === "featured") {
    return (
      <Link
        href={`/agenda/${event.slug}`}
        className="group relative overflow-hidden rounded-[32px] bg-white shadow-[0_4px_24px_rgba(7,20,38,0.08)] transition hover:shadow-[0_12px_48px_rgba(7,20,38,0.14)]"
      >
        <div className="relative h-[300px] overflow-hidden md:h-[360px]">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span
              className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wide ${cat.bg} ${cat.color}`}
            >
              {cat.emoji} {cat.label}
            </span>
            {event.isFree && (
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase text-emerald-700">
                Gratuito
              </span>
            )}
            {event.isSponsored && (
              <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-black uppercase text-gold-dark">
                Patrocinado
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-3 text-xs text-white/60">
              <span className="flex items-center gap-1">
                <Calendar size={11} />
                {dateLabel}
                {hasEndDate && ` – ${formatEventDate(event.endDate!)}`}
              </span>
              {event.time && (
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  {event.time}
                </span>
              )}
            </div>
            <h3 className="mt-2 text-2xl font-black leading-tight text-white md:text-3xl">
              {event.title}
            </h3>
          </div>
        </div>

        <div className="p-6">
          <p className="line-clamp-2 text-sm leading-relaxed text-slate-500">
            {event.description}
          </p>
          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="flex items-center gap-1.5 text-sm text-slate-500">
              <MapPin size={13} className="text-gold" />
              <span className="line-clamp-1">{event.venue}</span>
            </span>
            <span
              className={`text-sm font-black ${event.isFree ? "text-emerald-600" : "text-navy"}`}
            >
              {event.isFree ? "Gratuito" : event.price}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // ── DEFAULT ───────────────────────────────────────────────────────────────
  return (
    <Link
      href={`/agenda/${event.slug}`}
      className="group relative overflow-hidden rounded-[28px] bg-white shadow-[0_4px_20px_rgba(7,20,38,0.07)] transition hover:shadow-[0_8px_32px_rgba(7,20,38,0.12)] hover:-translate-y-0.5"
    >
      <div className="relative h-[188px] overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />

        <div className="absolute left-3 top-3">
          <span
            className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase ${cat.bg} ${cat.color}`}
          >
            {cat.emoji} {cat.label}
          </span>
        </div>

        {event.isFree && (
          <div className="absolute right-3 top-3">
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase text-emerald-700">
              Grátis
            </span>
          </div>
        )}

        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-xl bg-black/30 px-2.5 py-1.5 backdrop-blur-sm">
          <Calendar size={11} className="text-gold" />
          <span className="text-[11px] font-bold text-white">{dateLabel}</span>
          {event.time && (
            <span className="text-[11px] text-white/60">{event.time}</span>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 text-sm font-black leading-snug text-navy group-hover:text-cobalt">
          {event.title}
        </h3>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
          <MapPin size={11} className="shrink-0 text-gold" />
          <span className="line-clamp-1">
            {event.venue}
            {event.neighborhood ? `, ${event.neighborhood}` : ""}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
          <span
            className={`text-xs font-black ${event.isFree ? "text-emerald-600" : "text-navy"}`}
          >
            {event.isFree ? "Gratuito" : event.price}
          </span>
          {event.ageRating && (
            <span className="text-[10px] text-slate-400">{event.ageRating}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
