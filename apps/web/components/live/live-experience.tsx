"use client";

import {
  Activity,
  ArrowUpRight,
  CloudRain,
  Radio,
  TriangleAlert,
} from "lucide-react";

export function LiveExperience() {
  return (
    <section className="relative px-6 pb-16">
      <div className="mx-auto max-w-[1440px]">
        {/* HEADER */}
        <div className="mb-8">
          <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">
            LIVE EXPERIENCE
          </span>

          <h2 className="mt-4 text-5xl font-black tracking-[-0.05em] text-navy">
            Central ao vivo
          </h2>
        </div>

        {/* GRID */}
        <div className="grid gap-6 lg:grid-cols-[1.2fr_420px]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* VIDEO */}
            <div className="relative overflow-hidden rounded-[40px] bg-navy shadow-[0_30px_120px_rgba(15,23,42,0.15)]">
              {/* BG */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2070')] bg-cover bg-center opacity-50" />

                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
              </div>

              {/* CONTENT */}
              <div className="relative z-10 flex min-h-[520px] flex-col justify-end p-10">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-red-500 px-5 py-2 text-xs font-black uppercase tracking-[0.3em] text-white">
                  <Radio size={14} />

                  Ao vivo
                </div>

                <h3 className="mt-8 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.05em] text-white">
                  Cobertura operacional em tempo real de Manaus.
                </h3>

                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
                  Monitoramento integrado de clima, trânsito, alertas e
                  operações urbanas.
                </p>

                <button className="mt-8 flex w-fit items-center gap-2 rounded-2xl bg-gold px-6 py-4 text-sm font-black uppercase tracking-wide text-navy transition hover:-translate-y-1">
                  Assistir cobertura

                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>

            {/* STATS */}
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-[32px] border border-black/5 bg-white p-7 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10">
                  <Activity className="text-gold-dark" />
                </div>

                <h3 className="mt-8 text-5xl font-black text-navy">
                  2.4k
                </h3>

                <span className="mt-2 block text-slate-500">
                  Sensores ativos
                </span>
              </div>

              <div className="rounded-[32px] border border-black/5 bg-white p-7 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
                  <CloudRain className="text-blue-500" />
                </div>

                <h3 className="mt-8 text-5xl font-black text-navy">
                  29°
                </h3>

                <span className="mt-2 block text-slate-500">
                  Clima operacional
                </span>
              </div>

              <div className="rounded-[32px] border border-black/5 bg-white p-7 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
                  <TriangleAlert className="text-red-500" />
                </div>

                <h3 className="mt-8 text-5xl font-black text-navy">
                  12
                </h3>

                <span className="mt-2 block text-slate-500">
                  Alertas ativos
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="rounded-[40px] border border-black/5 bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.06)]">
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.3em] text-gold-dark">
                  LIVE FEED
                </span>

                <h3 className="mt-3 text-3xl font-black text-navy">
                  Atualizações
                </h3>
              </div>

              <div className="h-3 w-3 animate-pulse rounded-full bg-red-500" />
            </div>

            {/* FEED */}
            <div className="mt-10 space-y-5">
              {[
                "Acidente grave na Djalma Batista",
                "Chuva intensa prevista para noite",
                "Defesa Civil em alerta máximo",
                "Sistema inteligente identifica lentidão",
                "Operação especial no Centro",
              ].map((item, index) => (
                <div
                  key={item}
                  className="group rounded-[28px] border border-black/5 bg-[#F8FAFC] p-5 transition hover:bg-slate-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10">
                      <span className="font-black text-gold-dark">
                        0{index + 1}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold leading-relaxed text-navy">
                        {item}
                      </h4>

                      <span className="mt-2 block text-sm text-slate-500">
                        Atualizado há poucos segundos
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}