import {
  AlertTriangle,
  Camera,
  CloudRain,
  Droplets,
  Sun,
  Thermometer,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  Wind,
} from "lucide-react";
import { aqiLevel, uvLevel } from "@/lib/levels";
import { getManausAirQuality, getManausConditions } from "@/lib/weather";
import type { Article } from "@/types/article";

const INCIDENT_CATEGORIES = ["policial", "transito", "alerta", "clima"];
const DAY_MS = 24 * 60 * 60 * 1000;

type Props = {
  articles: Article[];
  /** Quantidade de transmissões ao vivo disponíveis (câmeras da cidade). */
  cameraCount: number;
};

export async function OperationalGrid({ articles, cameraCount }: Props) {
  const [conditions, air] = await Promise.all([getManausConditions(), getManausAirQuality()]);

  const now = Date.now();
  const incidents = articles.filter((a) => INCIDENT_CATEGORIES.includes(a.category));
  const last24h = incidents.filter((a) => now - new Date(a.publishedAt).getTime() <= DAY_MS).length;
  const previous24h = incidents.filter((a) => {
    const age = now - new Date(a.publishedAt).getTime();
    return age > DAY_MS && age <= 2 * DAY_MS;
  }).length;
  const delta = last24h - previous24h;

  const aqi = air ? aqiLevel(air.aqi) : null;
  const uv = conditions ? uvLevel(conditions.uvMax) : null;

  const peakRain = conditions
    ? conditions.nextHours.reduce((max, h) => (h.rainChance > max.rainChance ? h : max))
    : null;
  const rainAlert =
    peakRain && peakRain.rainChance >= 50
      ? `Chuva provável às ${peakRain.hour} (${peakRain.rainChance}%)`
      : peakRain
        ? "Sem previsão de chuva forte nas próximas horas"
        : null;

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

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.05em] text-navy">
              Central de operações
            </h2>

            <p className="mt-4 max-w-2xl text-lg text-slate-500">
              Clima, qualidade do ar, ocorrências noticiadas e transmissões ao vivo de
              Manaus, com dados de fontes públicas e do Portal Funil.
            </p>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-3 sm:gap-6 xl:grid-cols-4">
          {/* WEATHER CARD — expanded */}
          <div className="group relative overflow-hidden rounded-[12px] border border-black/5 bg-white p-5 shadow-[0_10px_50px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)] sm:rounded-[14px] sm:p-7">
            <div className="absolute right-[-30px] top-[-30px] h-[140px] w-[140px] rounded-full bg-sky-400/10 blur-[70px]" />

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4 sm:block">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 sm:h-14 sm:w-14">
                <CloudRain size={24} className="text-sky-500" />
              </div>

              <h3 className="text-4xl font-black tracking-[-0.05em] text-navy sm:mt-6 sm:text-4xl lg:text-5xl">
                {conditions ? `${conditions.temperature}°C` : "—"}
              </h3>
              </div>

              <span className="mt-2 block text-sm font-semibold text-slate-600">
                {conditions ? `Manaus agora · ${conditions.description}` : "Clima indisponível no momento"}
              </span>

              {conditions && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5">
                    <Thermometer size={11} className="text-orange-400" />
                    <span className="text-[10px] font-bold text-slate-600">Sensação {conditions.feelsLike}°</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5">
                    <Droplets size={11} className="text-sky-400" />
                    <span className="text-[10px] font-bold text-slate-600">Umidade {conditions.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5">
                    <Wind size={11} className="text-emerald-400" />
                    <span className="text-[10px] font-bold text-slate-600">
                      Ar: {aqi ? aqi.label : "—"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5">
                    <Wind size={11} className="text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-600">Vento {conditions.windKmh} km/h</span>
                  </div>
                </div>
              )}

              {rainAlert && (
                <div className="mt-3 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
                  <AlertTriangle size={12} className="shrink-0 text-amber-500" />
                  <span className="text-[11px] font-semibold text-amber-800">{rainAlert}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-6 xl:contents">
          {/* INCIDENTS */}
          <StatCard
            icon={TriangleAlert}
            accentColor="text-orange-500"
            accentBg="bg-orange-50"
            glowColor="bg-orange-400/10"
            value={String(last24h)}
            title="Ocorrências nas notícias"
            desc="Últimas 24h · policial, trânsito, alerta e clima"
            badge={
              delta === 0
                ? { text: "= 24h antes", tone: "neutral" }
                : {
                    text: `${delta > 0 ? "+" : ""}${delta}`,
                    tone: delta > 0 ? "warn" : "up",
                    icon: delta > 0 ? TrendingUp : TrendingDown,
                  }
            }
          />

          {/* CAMERAS */}
          <StatCard
            icon={Camera}
            accentColor="text-red-500"
            accentBg="bg-red-50"
            glowColor="bg-red-400/10"
            value={String(cameraCount)}
            title="Transmissões ao vivo"
            desc="Câmeras de Manaus via AmzLive"
          />

          {/* UV */}
          <StatCard
            icon={Sun}
            accentColor="text-amber-500"
            accentBg="bg-amber-50"
            glowColor="bg-amber-400/10"
            value={conditions ? String(conditions.uvMax) : "—"}
            title="Índice UV"
            desc="Máximo previsto para hoje"
            badge={uv ? { text: uv.label, tone: uv.bar.includes("red") ? "down" : uv.bar.includes("orange") ? "warn" : "up" } : undefined}
          />
          </div>
        </div>
      </div>
    </section>
  );
}

type Badge = {
  text: string;
  tone: "up" | "down" | "warn" | "neutral";
  icon?: typeof TrendingUp;
};

const BADGE_STYLES: Record<Badge["tone"], string> = {
  up: "bg-emerald-50 text-emerald-600",
  warn: "bg-orange-50 text-orange-600",
  down: "bg-red-50 text-red-500",
  neutral: "bg-slate-100 text-slate-500",
};

function StatCard({
  icon: Icon,
  accentColor,
  accentBg,
  glowColor,
  value,
  title,
  desc,
  badge,
}: {
  icon: typeof TrendingUp;
  accentColor: string;
  accentBg: string;
  glowColor: string;
  value: string;
  title: string;
  desc: string;
  badge?: Badge;
}) {
  const BadgeIcon = badge?.icon;

  return (
    <div className="group relative overflow-hidden rounded-[10px] border border-black/5 bg-white p-3.5 shadow-[0_10px_50px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)] sm:rounded-[14px] sm:p-7">
      <div className={`absolute right-[-30px] top-[-30px] h-[140px] w-[140px] rounded-full ${glowColor} blur-[70px]`} />

      <div className="relative z-10">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg sm:h-14 sm:w-14 sm:rounded-xl ${accentBg}`}>
          <Icon size={18} className={`${accentColor} sm:h-[26px] sm:w-[26px]`} />
        </div>

        <h3 className="mt-3 text-3xl font-black leading-none tracking-[-0.05em] text-navy sm:mt-6 sm:text-5xl">{value}</h3>

        <span className="mt-1.5 block text-[11px] font-semibold leading-snug text-slate-600 sm:mt-2 sm:text-sm">{title}</span>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 sm:mt-5 sm:gap-3 sm:pt-4">
          <span className="hidden text-xs text-slate-400 sm:block">{desc}</span>

          {badge && (
            <div className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black sm:px-2.5 sm:py-1 sm:text-[11px] ${BADGE_STYLES[badge.tone]}`}>
              {BadgeIcon && <BadgeIcon size={10} />}
              {badge.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
