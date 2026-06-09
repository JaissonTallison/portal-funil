"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CloudRain,
  Radio,
  Shield,
  TrafficCone,
} from "lucide-react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";

const SLIDE_DURATION = 5500;

const slides = [
  {
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2070",
    category: "TECNOLOGIA",
    label: "Zona Franca",
    title: "Zona Franca de Manaus bate recorde de faturamento no 1º semestre.",
    description: "Polo Industrial registra R$ 92 bilhões em receita, alta de 18%. Setor de eletrônicos lidera crescimento.",
  },
  {
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2070",
    category: "ALERTA",
    label: "Manaus",
    title: "Defesa Civil decreta alerta máximo para chuvas em Manaus.",
    description: "Zona Norte e Leste em risco de alagamento. 12 equipes distribuídas em pontos críticos da cidade.",
  },
  {
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070",
    category: "BRASIL",
    label: "Política",
    title: "Congresso aprova regulamentação dos motoristas de aplicativo.",
    description: "Lei garante piso mínimo, previdência e direitos trabalhistas a mais de 1,7 milhão de trabalhadores.",
  },
];

export function HeroSlider() {
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
                          href="/noticias"
                          className="flex items-center gap-2 rounded-2xl bg-gold px-8 py-4 text-sm font-black uppercase tracking-wide text-navy transition hover:-translate-y-0.5 hover:bg-gold-hover"
                        >
                          Explorar portal
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

                  {/* RIGHT CARD — Central operacional */}
                  <div className="absolute bottom-28 right-8 hidden w-[320px] rounded-[28px] border border-white/15 bg-black/40 p-5 backdrop-blur-2xl lg:block md:bottom-32">
                    {/* Header */}
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                          <span className="relative h-2 w-2 rounded-full bg-red-500" />
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold">
                          CENTRAL OPERACIONAL
                        </span>
                      </div>
                      <span className="text-[10px] tabular-nums text-white/30">AO VIVO</span>
                    </div>

                    {/* Stats grid */}
                    <div className="mb-4 grid grid-cols-3 gap-2">
                      <div className="rounded-2xl bg-white/8 px-3 py-2.5 text-center">
                        <div className="text-lg font-black leading-none text-white">32°</div>
                        <div className="mt-1 text-[9px] uppercase tracking-wide text-white/35">Temp.</div>
                      </div>
                      <div className="rounded-2xl bg-white/8 px-3 py-2.5 text-center">
                        <div className="text-lg font-black leading-none text-white">78%</div>
                        <div className="mt-1 text-[9px] uppercase tracking-wide text-white/35">Umidade</div>
                      </div>
                      <div className="rounded-2xl border border-red-500/25 bg-red-500/15 px-3 py-2.5 text-center">
                        <div className="text-lg font-black leading-none text-red-400">03</div>
                        <div className="mt-1 text-[9px] uppercase tracking-wide text-white/35">Alertas</div>
                      </div>
                    </div>

                    {/* Section title */}
                    <h3 className="mb-3 text-sm font-black text-white">Ocorrências ativas</h3>

                    {/* Alert items */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-3.5 py-2.5">
                        <AlertTriangle size={13} className="shrink-0 text-red-400" />
                        <span className="text-xs font-semibold text-white">Acidente grave na Djalma Batista</span>
                      </div>
                      <div className="flex items-center gap-3 rounded-xl border border-sky-400/20 bg-sky-400/10 px-3.5 py-2.5">
                        <CloudRain size={13} className="shrink-0 text-sky-300" />
                        <span className="text-xs font-semibold text-white">Chuva intensa na Zona Norte</span>
                      </div>
                      <div className="flex items-center gap-3 rounded-xl border border-amber-400/20 bg-amber-400/10 px-3.5 py-2.5">
                        <TrafficCone size={13} className="shrink-0 text-amber-300" />
                        <span className="text-xs font-semibold text-white">Trânsito intenso no Centro</span>
                      </div>
                    </div>

                    {/* Footer stats */}
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2.5 rounded-xl bg-gold/10 px-3.5 py-3">
                        <Radio size={12} className="shrink-0 animate-pulse text-gold" />
                        <div>
                          <div className="text-[10px] font-black leading-none text-gold">12 ao vivo</div>
                          <div className="mt-0.5 text-[9px] text-white/30">transmissões</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 rounded-xl bg-white/5 px-3.5 py-3">
                        <Shield size={12} className="shrink-0 text-emerald-400" />
                        <div>
                          <div className="text-[10px] font-black leading-none text-white">24 viaturas</div>
                          <div className="mt-0.5 text-[9px] text-white/30">em operação</div>
                        </div>
                      </div>
                    </div>
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
