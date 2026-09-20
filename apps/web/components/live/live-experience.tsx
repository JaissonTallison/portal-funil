import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Cloud,
  CloudRain,
  Newspaper,
  Radio,
  Sun,
  TriangleAlert,
} from "lucide-react";
import { getManausWeather } from "@/lib/weather";
import { timeAgo } from "@/lib/utils";
import { HERO_SLUGS, pickDiverse, pickLiveLead } from "@/lib/home-highlights";
import { getNewsArticles } from "@/services/articles.service";

const DAY_MS = 24 * 60 * 60 * 1000;
const FEED_ITEMS = 5;

export async function LiveExperience() {
  const [articles, weather] = await Promise.all([getNewsArticles(), getManausWeather()]);
  // Destaque e feed evitam as matérias que já estão no carrossel principal.
  const latest = articles.filter((a) => !HERO_SLUGS.includes(a.slug)).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  const lead = pickLiveLead(articles);
  const now = Date.now();
  const weekCount = articles.filter((a) => now - new Date(a.publishedAt).getTime() <= 7 * DAY_MS).length;
  const alertCount = articles.filter(
    (a) => (a.category === "alerta" || a.isLive) && now - new Date(a.publishedAt).getTime() <= 2 * DAY_MS,
  ).length;
  const WeatherIcon = weather?.condition === "rain" ? CloudRain : weather?.condition === "cloudy" ? Cloud : Sun;

  if (!lead) return null;

  return (
    <section className="relative px-6 pb-16">
      <div className="mx-auto max-w-[1440px]">
        {/* HEADER */}
        <div className="mb-8">
          <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">
            LIVE EXPERIENCE
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.05em] text-navy">
            Central ao vivo
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_420px]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* VIDEO */}
            <div className="relative overflow-hidden rounded-[16px] bg-navy shadow-[0_30px_120px_rgba(15,23,42,0.15)]">
              {/* BG */}
              <div className="absolute inset-0">
                <Image src={lead.image} alt={lead.title} fill className="object-cover opacity-50" />

                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/75 via-35% to-transparent" />
              </div>

              {/* CONTENT */}
              <div className="relative z-10 flex min-h-[380px] flex-col justify-end p-5 sm:min-h-[520px] sm:p-10">
                <div className="absolute left-5 top-5 inline-flex w-fit items-center gap-2 rounded-full bg-red-500 px-5 py-2 sm:left-10 sm:top-10 text-xs font-black uppercase tracking-[0.3em] text-white">
                  <Radio size={14} />

                  {lead.isLive ? "Ao vivo" : "Última hora"}
                </div>

                <h3 className="mt-5 line-clamp-4 max-w-4xl text-2xl font-black leading-[1.05] tracking-[-0.05em] text-white sm:mt-8 sm:text-4xl md:text-5xl">
                  {lead.title}
                </h3>

                <p className="mt-4 line-clamp-2 max-w-2xl text-base leading-relaxed text-zinc-300 sm:mt-6 sm:line-clamp-3 sm:text-lg">
                  {lead.description}
                </p>

                <Link
                  href={`/noticias/${lead.slug}`}
                  className="mt-8 flex w-fit items-center gap-2 rounded-xl bg-gold px-6 py-4 text-sm font-black uppercase tracking-wide text-navy transition hover:-translate-y-1"
                >
                  Ler matéria

                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4 lg:gap-6">
              <div className="flex items-center gap-4 rounded-[10px] border border-black/5 bg-white p-4 shadow-[0_10px_40px_rgba(15,23,42,0.05)] md:block md:rounded-[12px] md:p-5 lg:rounded-[14px] lg:p-7">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 md:h-12 md:w-12 lg:h-14 lg:w-14">
                  <Newspaper className="text-gold-dark" />
                </div>

                <div className="min-w-0">
                  <h3 className="text-3xl font-black leading-none text-navy md:mt-5 lg:mt-8 lg:text-5xl">
                    {weekCount}
                  </h3>

                  <span className="mt-1 block text-sm text-slate-500 md:mt-2">
                    Matérias na semana
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-[10px] border border-black/5 bg-white p-4 shadow-[0_10px_40px_rgba(15,23,42,0.05)] md:block md:rounded-[12px] md:p-5 lg:rounded-[14px] lg:p-7">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 md:h-12 md:w-12 lg:h-14 lg:w-14">
                  <WeatherIcon className="text-blue-500" />
                </div>

                <div className="min-w-0">
                  <h3 className="text-3xl font-black leading-none text-navy md:mt-5 lg:mt-8 lg:text-5xl">
                    {weather ? `${weather.temperature}°` : "—"}
                  </h3>

                  <span className="mt-1 block text-sm text-slate-500 md:mt-2">
                    {weather ? `Manaus agora · ${weather.description}, umidade ${weather.humidity}%` : "Clima indisponível"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-[10px] border border-black/5 bg-white p-4 shadow-[0_10px_40px_rgba(15,23,42,0.05)] md:block md:rounded-[12px] md:p-5 lg:rounded-[14px] lg:p-7">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 md:h-12 md:w-12 lg:h-14 lg:w-14">
                  <TriangleAlert className="text-red-500" />
                </div>

                <div className="min-w-0">
                  <h3 className="text-3xl font-black leading-none text-navy md:mt-5 lg:mt-8 lg:text-5xl">
                    {alertCount}
                  </h3>

                  <span className="mt-1 block text-sm text-slate-500 md:mt-2">
                    Alertas nas últimas 48h
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="rounded-[16px] border border-black/5 bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.06)]">
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
            <div className="mt-6 space-y-3 sm:mt-10 sm:space-y-5">
              {pickDiverse(latest.filter((a) => a.slug !== lead.slug), FEED_ITEMS).map((item, index) => (
                <Link
                  key={item.id}
                  href={`/noticias/${item.slug}`}
                  className="group block rounded-[10px] border border-black/5 bg-[#F8FAFC] p-3.5 transition hover:bg-slate-100 sm:rounded-[12px] sm:p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/10 sm:mt-1 sm:h-12 sm:w-12 sm:rounded-xl">
                      <span className="font-black text-gold-dark">
                        0{index + 1}
                      </span>
                    </div>

                    <div>
                      <h4 className="line-clamp-2 text-sm font-bold leading-snug text-navy sm:line-clamp-3 sm:text-base sm:leading-relaxed">
                        {item.title}
                      </h4>

                      <span className="mt-1 block text-xs text-slate-500 sm:mt-2 sm:text-sm" suppressHydrationWarning>
                        {timeAgo(item.publishedAt)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}