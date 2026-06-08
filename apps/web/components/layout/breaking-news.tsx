"use client";

import Image from "next/image";
import { BREAKING_NEWS } from "@/lib/constants";

export function BreakingNews() {
  return (
    <section className="relative z-30 w-full px-4 pb-4">
      <div className="flex h-[68px] overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(7,20,38,0.35)]">

        {/* LOGO — fundo branco */}
        <div className="relative flex shrink-0 items-center justify-center bg-white px-5 sm:px-8">
          <Image
            src="/images/logo-breaknews.png"
            alt="Breaking News"
            width={200}
            height={56}
            priority
            className="h-[48px] w-auto object-contain"
          />
        </div>

        {/* AO VIVO — separador vermelho */}
        <div className="flex shrink-0 items-center gap-2 bg-red-600 px-4">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-white" />
          </span>
          <span className="hidden text-[11px] font-black uppercase tracking-[0.22em] text-white sm:block">
            AO VIVO
          </span>
        </div>

        {/* TICKER */}
        <div className="relative flex flex-1 items-center overflow-hidden bg-navy">
          <div className="flex animate-breaking items-center whitespace-nowrap">
            {[...BREAKING_NEWS, ...BREAKING_NEWS].map((item, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-5 px-7"
              >
                <span className="text-sm font-semibold tracking-wide text-white/95">
                  {item}
                </span>
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              </span>
            ))}
          </div>

          {/* fade direita */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-navy to-transparent" />
        </div>

        {/* horário */}
        <div className="hidden shrink-0 items-center bg-navy pr-5 lg:flex">
          <span className="text-[11px] font-semibold tabular-nums text-zinc-500">
            {new Date().toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

      </div>
    </section>
  );
}
