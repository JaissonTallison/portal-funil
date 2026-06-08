"use client";

import {
  CloudRain,
  TriangleAlert,
  Activity,
  MapPinned,
} from "lucide-react";

const alerts = [
  "Acidente grave na Djalma Batista",
  "Defesa Civil em alerta máximo",
  "Chuva intensa prevista para tarde",
];

export function HeroPanel() {
  return (
    <div className="relative overflow-hidden rounded-[36px] border border-black/5 bg-white/70 p-6 shadow-[0_10px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
      {/* GLOW */}
      <div className="absolute right-[-50px] top-[-50px] h-[180px] w-[180px] rounded-full bg-gold/10 blur-[80px]" />

      <div className="relative z-10">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-gold-dark">
              Central operacional
            </span>

            <h2 className="mt-3 text-3xl font-black text-navy">
              Manaus ao vivo
            </h2>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10">
            <Activity className="text-gold-dark" />
          </div>
        </div>

        {/* MAP */}
        <div className="relative mt-8 overflow-hidden rounded-[28px] border border-black/5 bg-slate-100">
          <div className="absolute bottom-5 left-5 z-20">
            <span className="rounded-full bg-gold px-4 py-2 text-xs font-black uppercase tracking-widest text-navy">
              Zona Centro-Sul
            </span>
          </div>

          <div className="h-[260px] bg-gradient-to-br from-slate-100 to-slate-300" />
        </div>

        {/* ALERTS */}
        <div className="mt-8 space-y-4">
          {alerts.map((item) => (
            <div
              key={item}
              className="flex items-start gap-4 rounded-[24px] border border-black/5 bg-white/80 p-5"
            >
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-gold/10">
                <TriangleAlert
                  size={18}
                  className="text-gold-dark"
                />
              </div>

              <div>
                <h3 className="font-bold text-navy">
                  {item}
                </h3>

                <span className="mt-2 block text-sm text-slate-500">
                  Atualizado há poucos minutos
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* WEATHER */}
        <div className="mt-8 rounded-[28px] border border-black/5 bg-white/80 p-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-slate-500">
                Clima
              </span>

              <h3 className="mt-2 text-5xl font-black text-navy">
                29°
              </h3>

              <span className="mt-2 block text-sm text-slate-500">
                Pancadas de chuva
              </span>
            </div>

            <CloudRain
              size={46}
              className="text-gold-dark"
            />
          </div>
        </div>

        {/* STATUS */}
        <div className="mt-6 rounded-[28px] border border-black/5 bg-white/80 p-6">
          <div className="flex items-center gap-3">
            <MapPinned className="text-gold-dark" />

            <span className="font-semibold text-navy">
              12 regiões monitoradas em tempo real
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}