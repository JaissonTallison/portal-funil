import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { getUpcomingEvents } from "@/services/events.service";
import { EventCard } from "@/components/agenda/event-card";

const FILTER_PILLS = [
  { label: "Todos",       href: "/agenda" },
  { label: "Shows",       href: "/agenda?cat=show" },
  { label: "Festivais",   href: "/agenda?cat=festival" },
  { label: "Gastronomia", href: "/agenda?cat=gastronomia" },
  { label: "Cultura",     href: "/agenda?cat=cultura" },
  { label: "Gratuito",    href: "/agenda?cat=gratuito" },
  { label: "Turismo",     href: "/agenda?cat=turismo" },
];

export async function AgendaHighlight() {
  const upcoming = await getUpcomingEvents(6);
  const cards = upcoming.slice(0, 3);
  const compacts = upcoming.slice(3, 6);

  return (
    <section className="bg-surface px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gold/15">
                <CalendarDays size={15} className="text-gold-dark" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-gold-dark">
                Agenda Cultural
              </span>
            </div>
            <h2 className="mt-3 text-2xl font-black tracking-[-0.03em] text-navy md:text-3xl">
              O que fazer em Manaus
            </h2>
            <p className="mt-1.5 text-sm text-slate-500">
              Shows, festivais, feiras e atrações culturais do Amazonas
            </p>
          </div>

          <Link
            href="/agenda"
            className="flex shrink-0 items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-slate-50"
          >
            Ver tudo
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* FILTER PILLS */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {FILTER_PILLS.map((pill, i) => (
            <Link
              key={pill.label}
              href={pill.href}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition ${
                i === 0
                  ? "bg-navy text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-navy/20 hover:text-navy"
              }`}
            >
              {pill.label}
            </Link>
          ))}
        </div>

        {/* CARDS GRID */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((event) => (
            <EventCard key={event.id} event={event} variant="default" />
          ))}
        </div>

        {/* COMPACT LIST */}
        {compacts.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {compacts.map((event) => (
              <EventCard key={event.id} event={event} variant="compact" />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/agenda"
            className="flex items-center gap-2 rounded-2xl bg-navy px-8 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-cobalt"
          >
            <CalendarDays size={15} />
            Ver agenda completa
          </Link>
        </div>
      </div>
    </section>
  );
}
