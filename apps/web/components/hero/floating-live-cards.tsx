"use client";

import {
  Activity,
  CloudRain,
  Radio,
  TriangleAlert,
} from "lucide-react";

export function FloatingLiveCards() {
  return (
    <>
      {/* TOP RIGHT */}
      <div className="absolute right-[8%] top-[18%] hidden animate-float rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-2xl lg:block">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/20">
            <Radio className="text-gold" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-400">
              AO VIVO
            </span>

            <h3 className="mt-1 text-lg font-black text-white">
              12 transmissões
            </h3>
          </div>
        </div>
      </div>

      {/* BOTTOM LEFT */}
      <div className="absolute bottom-[18%] left-[6%] hidden animate-float-slow rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-2xl lg:block">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/20">
            <TriangleAlert className="text-red-400" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-400">
              ALERTAS
            </span>

            <h3 className="mt-1 text-lg font-black text-white">
              12 ocorrências
            </h3>
          </div>
        </div>
      </div>

      {/* CENTER RIGHT */}
      <div className="absolute bottom-[24%] right-[12%] hidden animate-float rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-2xl xl:block">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20">
            <CloudRain className="text-blue-300" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-400">
              CLIMA
            </span>

            <h3 className="mt-1 text-lg font-black text-white">
              Pancadas fortes
            </h3>
          </div>
        </div>
      </div>

      {/* SENSOR */}
      <div className="absolute left-[20%] top-[30%] hidden animate-pulse rounded-full border border-gold/20 bg-gold/10 p-4 lg:block">
        <Activity className="text-gold" />
      </div>
    </>
  );
}