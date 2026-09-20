import { ArrowDown, ArrowUp, Minus, TrendingUp } from "lucide-react";
import { getMarketData } from "@/lib/market-data";

export async function EconomicPanel() {
  const market = await getMarketData();
  if (!market) return null;

  const updatedAt = market.updatedAt.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Manaus",
  });

  return (
    <section className="px-6 pb-14">
      <div className="mx-auto max-w-[1440px]">
        <div className="overflow-hidden rounded-[16px] border border-black/5 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)] md:p-8">
          {/* HEADER */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/10">
                <TrendingUp size={16} className="text-gold-dark" />
              </div>
              <div>
                <h2 className="text-base font-black text-navy">Mercado Financeiro</h2>
              </div>
            </div>
            <span className="text-[11px] text-slate-400">
              Atualizado às {updatedAt} (Manaus)
            </span>
          </div>

          {/* TICKER */}
          <div className="scrollbar-hide flex gap-3 overflow-x-auto">
            {market.items.map((item) => {
              const isUp = item.change > 0;
              const isDown = item.change < 0;
              const isNeutral = item.change === 0;

              return (
                <div
                  key={item.symbol}
                  className="flex min-w-[150px] flex-1 flex-col rounded-xl border border-black/5 bg-slate-50 px-4 py-3.5 transition hover:bg-slate-100"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {item.symbol}
                    </span>
                    <div
                      className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-black ${
                        isUp
                          ? "bg-emerald-50 text-emerald-600"
                          : isDown
                          ? "bg-red-50 text-red-500"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {isUp && <ArrowUp size={9} />}
                      {isDown && <ArrowDown size={9} />}
                      {isNeutral && <Minus size={9} />}
                      {Math.abs(item.change).toFixed(1)}%
                    </div>
                  </div>

                  <span className="mt-2 text-lg font-black text-navy">
                    {item.unit && <span className="text-sm font-bold text-slate-400">{item.unit} </span>}
                    {item.value}
                  </span>

                  <span className="mt-0.5 text-xs text-slate-500">{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
