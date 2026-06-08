"use client";

import { motion } from "framer-motion";

import { HeroPanel } from "./hero-panel";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy px-6 pb-32 pt-[240px]">
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        {/* GOLD GLOW */}
        <div className="absolute left-[10%] top-[10%] h-[500px] w-[500px] rounded-full bg-gold/10 blur-[140px]" />

        {/* BLUE GLOW */}
        <div className="absolute right-[-100px] top-[20%] h-[500px] w-[500px] rounded-full bg-[#1E3A8A]/20 blur-[140px]" />

        {/* GRID */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[85vh] max-w-7xl items-center gap-16 lg:grid-cols-[1.1fr_460px]">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* LABEL */}
          <span className="rounded-full border border-gold/20 bg-gold/10 px-5 py-2 text-xs font-black uppercase tracking-[0.3em] text-gold">
            Plataforma operacional em tempo real
          </span>

          {/* TITLE */}
          <h1 className="mt-8 max-w-5xl text-6xl font-black leading-[0.92] tracking-[-0.06em] text-white lg:text-[92px]">
            O futuro do
            <br />

            monitoramento
            <br />

            urbano.
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-zinc-400">
            Notícias, trânsito, clima e alertas inteligentes reunidos em uma
            experiência premium de monitoramento operacional.
          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-2xl bg-gold px-8 py-4 text-sm font-black uppercase tracking-wide text-navy transition hover:-translate-y-0.5 hover:bg-gold-hover">
              Explorar plataforma
            </button>

            <button className="rounded-2xl border border-white/10 bg-white/[0.04] px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/[0.08]">
              Assistir ao vivo
            </button>
          </div>
        </motion.div>

        {/* RIGHT */}
        <HeroPanel />
      </div>
    </section>
  );
}