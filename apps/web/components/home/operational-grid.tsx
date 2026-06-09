import {
  Activity,
  AlertTriangle,
  CloudRain,
  Droplets,
  Radio,
  Thermometer,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  Wind,
} from "lucide-react";

const cards = [
  {
    title: "Ocorrências ativas",
    value: "148",
    trend: "+12",
    trendUp: true,
    icon: TriangleAlert,
    accentColor: "text-orange-500",
    accentBg: "bg-orange-50",
    glowColor: "bg-orange-400/10",
    desc: "Nas últimas 2h",
  },
  {
    title: "Transmissões ao vivo",
    value: "12",
    trend: "+3",
    trendUp: true,
    icon: Radio,
    accentColor: "text-red-500",
    accentBg: "bg-red-50",
    glowColor: "bg-red-400/10",
    desc: "Canais ativos agora",
  },
  {
    title: "Sensores urbanos",
    value: "2.4k",
    trend: "-18",
    trendUp: false,
    icon: Activity,
    accentColor: "text-emerald-500",
    accentBg: "bg-emerald-50",
    glowColor: "bg-emerald-400/10",
    desc: "Online e reportando",
  },
];

const weatherData = {
  temp: "29°C",
  feelsLike: "34°C",
  humidity: "78%",
  airQuality: "Boa",
  alert: "Chuva forte às 16h",
};

export function OperationalGrid() {
  return (
    <section className="relative z-10 px-6 pb-14">
      <div className="mx-auto max-w-[1440px]">
        {/* HEADER */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">
                LIVE INTELLIGENCE
              </span>
            </div>

            <h2 className="mt-4 text-5xl font-black tracking-[-0.05em] text-navy">
              Central de operações
            </h2>

            <p className="mt-4 max-w-2xl text-lg text-slate-500">
              Dados urbanos, clima, trânsito e monitoramento operacional em tempo
              real.
            </p>
          </div>
        </div>

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* WEATHER CARD — expanded */}
          <div className="group relative overflow-hidden rounded-[32px] border border-black/5 bg-white p-7 shadow-[0_10px_50px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
            <div className="absolute right-[-30px] top-[-30px] h-[140px] w-[140px] rounded-full bg-sky-400/10 blur-[70px]" />

            <div className="relative z-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50">
                <CloudRain size={26} className="text-sky-500" />
              </div>

              <h3 className="mt-6 text-5xl font-black tracking-[-0.05em] text-navy">
                {weatherData.temp}
              </h3>

              <span className="mt-2 block text-sm font-semibold text-slate-600">
                Monitoramento climático
              </span>

              {/* MINI STATS */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1.5 rounded-xl bg-slate-50 px-2.5 py-1.5">
                  <Thermometer size={11} className="text-orange-400" />
                  <span className="text-[10px] font-bold text-slate-600">Sensação {weatherData.feelsLike}</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-xl bg-slate-50 px-2.5 py-1.5">
                  <Droplets size={11} className="text-sky-400" />
                  <span className="text-[10px] font-bold text-slate-600">Umidade {weatherData.humidity}</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-xl bg-slate-50 px-2.5 py-1.5">
                  <Wind size={11} className="text-emerald-400" />
                  <span className="text-[10px] font-bold text-slate-600">Ar: {weatherData.airQuality}</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-xl bg-amber-50 px-2.5 py-1.5">
                  <AlertTriangle size={11} className="text-amber-500" />
                  <span className="text-[10px] font-bold text-amber-700">Alerta</span>
                </div>
              </div>

              {/* ALERT */}
              <div className="mt-3 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2">
                <AlertTriangle size={12} className="shrink-0 text-amber-500" />
                <span className="text-[11px] font-semibold text-amber-800">{weatherData.alert}</span>
              </div>
            </div>
          </div>

          {/* OTHER CARDS */}
          {cards.map((card) => {
            const Icon = card.icon;
            const TrendIcon = card.trendUp ? TrendingUp : TrendingDown;

            return (
              <div
                key={card.title}
                className="group relative overflow-hidden rounded-[32px] border border-black/5 bg-white p-7 shadow-[0_10px_50px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
              >
                {/* GLOW */}
                <div className={`absolute right-[-30px] top-[-30px] h-[140px] w-[140px] rounded-full ${card.glowColor} blur-[70px]`} />

                <div className="relative z-10">
                  {/* ICON */}
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.accentBg}`}>
                    <Icon size={26} className={card.accentColor} />
                  </div>

                  {/* VALUE */}
                  <h3 className="mt-6 text-5xl font-black tracking-[-0.05em] text-navy">
                    {card.value}
                  </h3>

                  {/* TITLE */}
                  <span className="mt-2 block text-sm font-semibold text-slate-600">
                    {card.title}
                  </span>

                  {/* FOOTER */}
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-xs text-slate-400">{card.desc}</span>

                    <div className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-black ${
                      card.trendUp
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-red-50 text-red-500"
                    }`}>
                      <TrendIcon size={10} />
                      {card.trend}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
