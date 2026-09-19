"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Radio } from "lucide-react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { HERO_SLIDES } from "@/lib/home-highlights";
import type { Weather } from "@/lib/weather";

export type HeroPanel = {
  weather: Weather | null;
  weekCount: number;
  latest: { title: string; slug: string; time: string }[];
};

const SLIDE_DURATION = 5500;

const slides = HERO_SLIDES;

export function HeroSlider({ panel }: { panel: HeroPanel }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
    setProgressKey((k) => k + 1);
  };

  return (
    <section className="relative overflow-hidden px-4 md:px-6">
      <div className="mx-auto max-w-[1440px]">
        <div className="relative overflow-hidden rounded-[40px] shadow-[0_30px_120px_rgba(15,23,42,0.18)]">

          {/* ── SWIPER ── */}
          <Swiper
            onSwiper={(s) => { swiperRef.current = s; }}
            onSlideChange={handleSlideChange}
            modules={[Autoplay, EffectFade]}
            effect="fade"
            loop
            speed={900}
            autoplay={{ delay: SLIDE_DURATION, disableOnInteraction: false }}
            className="h-[600px] md:h-[740px]"
          >
            {slides.map((slide, i) => (
              <SwiperSlide key={slide.title}>
                <div className="relative h-full w-full overflow-hidden">
                  {/* IMAGE — Ken Burns via CSS .swiper-slide-active .hero-img */}
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority={i === 0}
                    className="hero-img object-cover"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/55 to-navy/15" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />

                  {/* CONTENT */}
                  <div className="relative z-10 flex h-full items-center px-8 pb-28 md:px-16 md:pb-32">
                    <div className="max-w-2xl">
                      {/* CATEGORY */}
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-gold px-5 py-2 text-xs font-black uppercase tracking-[0.3em] text-navy">
                          {slide.category}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                          {slide.label}
                        </span>
                      </div>

                      {/* TITLE */}
                      <h1 className="mt-7 text-4xl font-black leading-[1.0] tracking-[-0.05em] text-white md:text-6xl lg:text-[72px]">
                        {slide.title}
                      </h1>

                      {/* DESCRIPTION */}
                      <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300 md:text-lg">
                        {slide.description}
                      </p>

                      {/* CTA */}
                      <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                          href={`/noticias/${slide.slug}`}
                          className="flex items-center gap-2 rounded-2xl bg-gold px-8 py-4 text-sm font-black uppercase tracking-wide text-navy transition hover:-translate-y-0.5 hover:bg-gold-hover"
                        >
                          Ler matéria
                          <ArrowUpRight size={15} />
                        </Link>
                        <Link
                          href="/ao-vivo"
                          className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/20"
                        >
                          <Radio size={14} className="text-red-400" />
                          Assistir ao vivo
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT CARD — Portal agora (dados reais) */}
                  <div className="absolute bottom-28 right-8 hidden w-[320px] rounded-[28px] border border-white/15 bg-black/40 p-5 backdrop-blur-2xl lg:block md:bottom-32">
                    {/* Header */}
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                          <span className="relative h-2 w-2 rounded-full bg-red-500" />
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold">
                          PORTAL AGORA
                        </span>
                      </div>
                      <span className="text-[10px] uppercase tracking-wide text-white/30">Manaus</span>
                    </div>

                    {/* Stats grid */}
                    <div className="mb-4 grid grid-cols-3 gap-2">
                      <div className="rounded-2xl bg-white/8 px-3 py-2.5 text-center">
                        <div className="text-lg font-black leading-none text-white">
                          {panel.weather ? `${panel.weather.temperature}°` : "—"}
                        </div>
                        <div className="mt-1 text-[9px] uppercase tracking-wide text-white/35">Temp.</div>
                      </div>
                      <div className="rounded-2xl bg-white/8 px-3 py-2.5 text-center">
                        <div className="text-lg font-black leading-none text-white">
                          {panel.weather ? `${panel.weather.humidity}%` : "—"}
                        </div>
                        <div className="mt-1 text-[9px] uppercase tracking-wide text-white/35">Umidade</div>
                      </div>
                      <div className="rounded-2xl border border-gold/25 bg-gold/10 px-3 py-2.5 text-center">
                        <div className="text-lg font-black leading-none text-gold">{panel.weekCount}</div>
                        <div className="mt-1 text-[9px] uppercase tracking-wide text-white/35">Na semana</div>
                      </div>
                    </div>

                    {/* Latest headlines */}
                    {panel.latest.length > 0 && (
                      <>
                        <h3 className="mb-3 text-sm font-black text-white">Últimas do portal</h3>
                        <div className="space-y-2">
                          {panel.latest.map((item) => (
                            <Link
                              key={item.slug}
                              href={`/noticias/${item.slug}`}
                              className="block rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 transition hover:bg-white/10"
                            >
                              <span className="line-clamp-2 text-xs font-semibold text-white">{item.title}</span>
                              <span className="mt-1 block text-[10px] text-white/35" suppressHydrationWarning>
                                {item.time}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ── BOTTOM CONTROLS ── */}
          <div className="absolute bottom-0 left-0 right-0 z-20">
            {/* gradient fade */}
            <div className="pointer-events-none h-16 bg-gradient-to-t from-navy/70 to-transparent" />

            <div className="flex items-center justify-between gap-4 bg-navy/50 px-6 py-4 backdrop-blur-md md:px-10">

              {/* THUMBNAILS + PROGRESS BARS */}
              <div className="flex items-center gap-3">
                {slides.map((slide, i) => (
                  <button
                    key={i}
                    onClick={() => swiperRef.current?.slideToLoop(i)}
                    className={`group relative overflow-hidden rounded-xl transition-all duration-400 ${
                      i === activeIndex
                        ? "w-[96px] ring-2 ring-gold ring-offset-1 ring-offset-transparent"
                        : "w-[56px] opacity-50 hover:opacity-80"
                    }`}
                  >
                    <div className="relative h-[52px]">
                      <Image
                        src={slide.image}
                        alt={slide.category}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30" />

                      {/* category label on active */}
                      {i === activeIndex && (
                        <div className="absolute inset-x-0 bottom-1 flex justify-center">
                          <span className="text-[8px] font-black uppercase tracking-wide text-white/80">
                            {slide.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* PROGRESS BAR */}
                    <div className="h-[3px] w-full bg-white/20">
                      {i === activeIndex ? (
                        <div
                          key={progressKey}
                          className="animate-slide-progress h-full bg-gold"
                          style={{ animationDuration: `${SLIDE_DURATION}ms` }}
                        />
                      ) : i < activeIndex ? (
                        <div className="h-full w-full bg-gold/60" />
                      ) : null}
                    </div>
                  </button>
                ))}
              </div>

              {/* COUNTER + NAVIGATION */}
              <div className="flex items-center gap-3">
                <span className="hidden tabular-nums text-sm font-black text-white/40 sm:block">
                  {String(activeIndex + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(slides.length).padStart(2, "0")}
                </span>

                <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25 active:scale-95"
                  aria-label="Slide anterior"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold text-navy transition hover:bg-gold-hover active:scale-95"
                  aria-label="Próximo slide"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
