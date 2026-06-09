import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { getTodaySpecialDates, getUpcomingSpecialDates } from "@/lib/agenda-data";

export function DiaEspecial() {
  const today = new Date();
  const todayDates = getTodaySpecialDates();
  const dates = todayDates.length > 0 ? todayDates : getUpcomingSpecialDates(3).slice(0, 4);

  if (dates.length === 0) return null;

  const dayLabel = today.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  return (
    <section className="px-4 pb-2 pt-4 md:px-6">
      <div className="mx-auto max-w-[1440px]">
        <div className="overflow-hidden rounded-[28px] border border-gold/15 bg-navy">
          <div className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:gap-6 md:px-6">

            {/* LABEL */}
            <div className="flex shrink-0 items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/10">
                <CalendarDays size={16} className="text-gold" />
              </div>
              <div>
                <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-gold">
                  Dia Especial
                </span>
                <span className="block capitalize text-[11px] text-white/40">{dayLabel}</span>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="hidden w-px self-stretch bg-white/8 md:block" />

            {/* DATES */}
            <div className="flex flex-wrap gap-2 md:flex-1">
              {dates.map((d) => (
                <div
                  key={d.id}
                  className="flex items-center gap-2 rounded-2xl border border-white/8 bg-white/5 px-3 py-2 transition hover:bg-white/10"
                >
                  <span className="text-xl">{d.emoji}</span>
                  <div>
                    <p className="text-xs font-black leading-none text-white">{d.title}</p>
                    <p className="mt-0.5 text-[10px] text-white/35">{d.hashtag}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/agenda"
              className="shrink-0 self-start rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white/60 transition hover:bg-white/10 hover:text-white md:self-auto"
            >
              Ver agenda →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
