"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

export type CarouselColumnist = {
  id: string;
  slug: string;
  name: string;
  role: string;
  specialty: string;
  avatar: string;
  count: number;
};

const AUTOPLAY_MS = 3500;

export function ColumnistsCarousel({ columnists }: { columnists: CarouselColumnist[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const step = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const amount = card ? card.offsetWidth + 16 : 280;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    const atStart = track.scrollLeft <= 4;

    if (direction === 1 && atEnd) track.scrollTo({ left: 0, behavior: "smooth" });
    else if (direction === -1 && atStart) track.scrollTo({ left: track.scrollWidth, behavior: "smooth" });
    else track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => step(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, step]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {columnists.map((c) => (
          <Link
            key={c.id}
            href={`/colunas/${c.slug}`}
            className="group flex w-[210px] shrink-0 snap-start flex-col items-center overflow-hidden rounded-[24px] border border-black/5 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 sm:w-[230px]"
          >
            <div className="relative h-14 w-full bg-gradient-to-br from-navy to-cobalt">
              <div className="absolute -right-6 -top-10 h-28 w-28 rounded-full bg-gold/15 blur-2xl" />
            </div>

            <div className="-mt-9 relative h-[72px] w-[72px] overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-[0_6px_18px_rgba(15,23,42,0.18)]">
              <Image
                src={c.avatar}
                alt={c.name}
                fill
                sizes="72px"
                className="object-cover object-[center_20%] transition duration-500 group-hover:scale-110"
              />
            </div>

            <div className="flex w-full flex-1 flex-col items-center px-4 pb-4 pt-3 text-center">
              <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-black leading-tight text-navy transition group-hover:text-cobalt">
                {c.name}
              </h3>
              <span className="mt-1 text-[11px] font-semibold text-gold-dark">{c.role}</span>
              <span className="mt-2 rounded-full bg-gold/20 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-navy">
                {c.specialty}
              </span>
              <div className="mt-3 flex w-full items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {c.count} {c.count === 1 ? "coluna" : "colunas"}
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy text-white transition group-hover:bg-cobalt">
                  <ArrowUpRight size={13} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <button
        type="button"
        aria-label="Colunistas anteriores"
        onClick={() => step(-1)}
        className="absolute left-0 top-1/2 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/5 bg-white text-navy shadow-[0_8px_24px_rgba(15,23,42,0.12)] transition hover:bg-navy hover:text-white md:flex"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        aria-label="Próximos colunistas"
        onClick={() => step(1)}
        className="absolute right-0 top-1/2 hidden h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-black/5 bg-white text-navy shadow-[0_8px_24px_rgba(15,23,42,0.12)] transition hover:bg-navy hover:text-white md:flex"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
