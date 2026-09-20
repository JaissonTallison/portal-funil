import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  CloudRain,
  Droplets,
  Radio,
  ThermometerSun,
  TrafficCone,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { aqiLevel, particleLevel, rainLevel, uvLevel } from "@/lib/levels";
import { getManausAirQuality, getManausConditions } from "@/lib/weather";
import { timeAgo } from "@/lib/utils";
import type { Article } from "@/types/article";

const RADAR_URL =
  "https://embed.windy.com/embed2.html?lat=-3.119&lon=-60.022&detailLat=-3.119&detailLon=-60.022&zoom=8&level=surface&overlay=radar&product=radar&menu=&message=&marker=true&calendar=now&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1";

const INCIDENT_CATEGORIES: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  policial: { icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/10" },
  alerta: { icon: AlertTriangle, color: "text-orange-400", bg: "bg-orange-500/10" },
  transito: { icon: TrafficCone, color: "text-yellow-400", bg: "bg-yellow-500/10" },
  clima: { icon: CloudRain, color: "text-sky-400", bg: "bg-sky-500/10" },
};

const INCIDENT_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

export async function OperationsMap({ articles }: { articles: Article[] }) {
  const [conditions, air] = await Promise.all([getManausConditions(), getManausAirQuality()]);

  const incidents = articles
    .filter(
      (a) =>
        a.category in INCIDENT_CATEGORIES &&
        Date.now() - new Date(a.publishedAt).getTime() <= INCIDENT_WINDOW_MS,
    )
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 6);

  const aqi = air ? aqiLevel(air.aqi) : null;
  const uv = conditions ? uvLevel(conditions.uvMax) : null;
  const rain = conditions ? rainLevel(conditions.rainChanceToday) : null;

  const stats = [
    {
      label: "Sensação térmica",
      value: conditions ? `${conditions.feelsLike}°` : "—",
      sub: conditions ? `Ar a ${conditions.temperature}°C` : "indisponível",
      color: "text-gold",
    },
    {
      label: "Índice UV",
      value: conditions ? String(conditions.uvMax) : "—",
      sub: uv?.label ?? "indisponível",
      color: "text-orange-400",
    },
    {
      label: "Chance de chuva",
      value: conditions ? `${conditions.rainChanceToday}%` : "—",
      sub: conditions ? "máxima hoje" : "indisponível",
      color: "text-sky-400",
    },
    {
      label: "Qualidade do ar",
      value: air ? String(air.aqi) : "—",
      sub: aqi?.label ?? "indisponível",
      color: "text-emerald-400",
    },
  ];

  return (
    <section className="relative px-6 pb-16">
      <div className="mx-auto max-w-[1440px]">
        {/* HEADER */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">
                OPERATIONS MAP
              </span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.05em] text-navy">
              Central operacional urbana
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-500">
              Radar de chuva, clima, qualidade do ar e ocorrências de Manaus, com
              dados atualizados de fontes públicas e do Portal Funil.
            </p>
          </div>

          {/* LEGEND */}
          <div className="hidden items-center gap-5 lg:flex">
            {[
              { color: "bg-red-500", label: "Alto" },
              { color: "bg-orange-400", label: "Médio" },
              { color: "bg-emerald-400", label: "Normal" },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
                <span className="text-sm font-semibold text-slate-500">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
          {/* ── RADAR ── */}
          <div className="relative flex flex-col overflow-hidden rounded-[16px] border border-white/5 bg-navy shadow-[0_24px_80px_rgba(2,6,23,0.3)]">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-[15%] top-[10%] h-[320px] w-[320px] rounded-full bg-gold/8 blur-[120px]" />
              <div className="absolute bottom-[-60px] right-[-60px] h-[260px] w-[260px] rounded-full bg-[#1E3A8A]/20 blur-[100px]" />
            </div>

            <div className="relative z-10 flex flex-1 flex-col p-4 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] text-gold">
                    Manaus — AM • Dados ao vivo
                  </span>
                  <h3 className="mt-2 text-3xl font-black text-white">Radar de chuva</h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                  <Radio size={22} className="text-gold" />
                </div>
              </div>

              {/* RADAR EMBED */}
              <div className="relative mt-5 h-[320px] overflow-hidden sm:mt-7 sm:h-[400px] lg:h-[480px] rounded-[12px] border border-white/5 bg-[#060E1E]">
                <iframe
                  src={RADAR_URL}
                  title="Radar de chuva ao vivo sobre Manaus"
                  loading="lazy"
                  className="h-full w-full border-0"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] font-semibold text-white/30">
                <span>Radar: Windy.com</span>
                <span className="tabular-nums">
                  {conditions ? `Clima atualizado às ${conditions.updatedAt.slice(11, 16)} (Manaus)` : "Clima indisponível no momento"}
                </span>
              </div>

              {/* STATS */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-white/8 bg-white/5 px-4 py-4 text-center">
                    <div className={`text-2xl font-black tabular-nums ${stat.color}`}>{stat.value}</div>
                    <div className="mt-1.5 text-[10px] font-black uppercase tracking-wide text-white/40">{stat.label}</div>
                    <div className="mt-0.5 text-[9px] text-white/30">{stat.sub}</div>
                  </div>
                ))}
              </div>

              {/* INCIDENT FEED */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40">
                    Ocorrências nas notícias
                  </span>
                  <span className="text-[10px] font-semibold text-white/30">
                    Policial, trânsito, alertas e clima · últimos 7 dias
                  </span>
                </div>
                {incidents.length === 0 ? (
                  <p className="rounded-xl border border-white/5 bg-white/5 px-4 py-6 text-center text-xs text-white/40">
                    Nenhuma ocorrência publicada recentemente.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {incidents.map((article) => {
                      const { icon: Icon, color, bg } = INCIDENT_CATEGORIES[article.category];
                      return (
                        <Link
                          key={article.slug}
                          href={`/noticias/${article.slug}`}
                          className={`flex items-center gap-3 rounded-xl border border-white/5 ${bg} px-4 py-3 transition hover:border-white/15`}
                        >
                          <Icon size={15} className={`shrink-0 ${color}`} />
                          <div className="min-w-0">
                            <p className="line-clamp-2 text-xs font-semibold leading-snug text-white/80">
                              {article.title}
                            </p>
                            <span className="text-[10px] text-white/30">{timeAgo(article.publishedAt)}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:block lg:space-y-5 lg:overflow-visible lg:px-0 lg:pb-0">
            {/* AIR QUALITY */}
            <div className="w-[86%] shrink-0 snap-center rounded-[12px] border border-black/5 bg-white p-5 shadow sm:w-[46%] sm:p-7 lg:w-auto lg:rounded-[14px]-[0_10px_40px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                  <Wind size={20} className="text-emerald-500" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">AR</span>
                  <h3 className="text-lg font-black text-navy">Qualidade do ar</h3>
                </div>
              </div>

              {air && aqi ? (
                <>
                  <div className="mt-5 flex items-end justify-between">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.05em] text-navy">{air.aqi}</span>
                    <span className={`mb-1.5 text-sm font-black ${aqi.text}`}>{aqi.label}</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${aqi.bar} transition-all duration-700`}
                      style={{ width: `${Math.min(100, (air.aqi / 200) * 100)}%` }}
                    />
                  </div>

                  <div className="mt-5 space-y-4">
                    {[
                      { name: "PM2.5", value: air.pm25, level: particleLevel(air.pm25, 9, 35.4), max: 55.4 },
                      { name: "PM10", value: air.pm10, level: particleLevel(air.pm10, 54, 154), max: 254 },
                    ].map((p) => (
                      <div key={p.name}>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-navy">
                            {p.name} <span className="text-xs font-normal text-slate-400">{p.value} µg/m³</span>
                          </span>
                          <span className={`text-xs font-black ${p.level.text}`}>{p.level.label}</span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${p.level.bar} transition-all duration-700`}
                            style={{ width: `${Math.min(100, (p.value / p.max) * 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-[10px] text-slate-400">
                    Ozônio {air.ozone} µg/m³ · NO₂ {air.no2} µg/m³ · Índice US AQI. Fonte: Open-Meteo.
                  </p>
                </>
              ) : (
                <p className="mt-6 text-sm text-slate-400">Dados de qualidade do ar indisponíveis no momento.</p>
              )}
            </div>

            {/* WEATHER */}
            <div className="w-[86%] shrink-0 snap-center overflow-hidden rounded-[12px] border border-black/5 bg-white p-5 shadow sm:w-[46%] sm:p-7 lg:w-auto lg:rounded-[14px]-[0_10px_40px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50">
                  <ThermometerSun size={20} className="text-sky-500" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">CLIMA</span>
                  <h3 className="text-lg font-black text-navy">Manaus agora</h3>
                </div>
              </div>

              {conditions && rain ? (
                <>
                  <div className="mt-5 flex items-end gap-3">
                    <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.06em] text-navy">{conditions.temperature}°C</span>
                    <span className="mb-2 text-sm text-slate-400">{conditions.description}</span>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[
                      { icon: Droplets, label: "Umidade", value: `${conditions.humidity}%` },
                      { icon: Wind, label: "Vento", value: `${conditions.windKmh} km/h` },
                      { icon: CloudRain, label: "Chuva hoje", value: `${conditions.rainChanceToday}%` },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="rounded-xl bg-slate-50 p-3 text-center">
                        <Icon size={16} className="mx-auto text-sky-400" />
                        <span className="mt-2 block text-[10px] text-slate-400">{label}</span>
                        <span className="block text-xs font-black text-navy">{value}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="mt-6 text-sm text-slate-400">Dados de clima indisponíveis no momento.</p>
              )}
            </div>

            {/* NEXT HOURS */}
            <div className="w-[86%] shrink-0 snap-center rounded-[12px] border border-black/5 bg-white p-5 shadow sm:w-[46%] sm:p-7 lg:w-auto lg:rounded-[14px]-[0_10px_40px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10">
                  <Activity size={20} className="text-gold-dark" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">PREVISÃO</span>
                  <h3 className="text-lg font-black text-navy">Chuva nas próximas horas</h3>
                </div>
              </div>

              {conditions ? (
                <div className="mt-5 space-y-2.5">
                  {conditions.nextHours.map(({ hour, rainChance }) => {
                    const level = rainLevel(rainChance);
                    return (
                      <div key={hour} className="flex items-center gap-3">
                        <span className="w-11 text-xs font-semibold tabular-nums text-slate-500">{hour}</span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${level.bar} transition-all duration-700`}
                            style={{ width: `${rainChance}%` }}
                          />
                        </div>
                        <span className={`w-10 text-right text-xs font-black tabular-nums ${level.text}`}>
                          {rainChance}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-6 text-sm text-slate-400">Previsão indisponível no momento.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
