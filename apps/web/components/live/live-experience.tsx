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
                <Image src={lead.image} alt={lead.title} fill className="object-cover opacity-50" />

                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
              </div>

              {/* CONTENT */}
              <div className="relative z-10 flex min-h-[520px] flex-col justify-end p-10">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-red-500 px-5 py-2 text-xs font-black uppercase tracking-[0.3em] text-white">
                  <Radio size={14} />

                  {lead.isLive ? "Ao vivo" : "Última hora"}
                </div>

                <h3 className="mt-8 line-clamp-4 max-w-4xl text-4xl font-black leading-[1] tracking-[-0.05em] text-white md:text-5xl">
                  {lead.title}
                </h3>

                <p className="mt-6 line-clamp-3 max-w-2xl text-lg leading-relaxed text-zinc-300">
                  {lead.description}
                </p>

                <Link
                  href={`/noticias/${lead.slug}`}
                  className="mt-8 flex w-fit items-center gap-2 rounded-2xl bg-gold px-6 py-4 text-sm font-black uppercase tracking-wide text-navy transition hover:-translate-y-1"
                >
                  Ler matéria

                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>

            {/* STATS */}
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-[32px] border border-black/5 bg-white p-7 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10">
                  <Newspaper className="text-gold-dark" />
                </div>

                <h3 className="mt-8 text-5xl font-black text-navy">
                  {weekCount}
                </h3>

                <span className="mt-2 block text-slate-500">
                  Matérias na semana
                </span>
              </div>

              <div className="rounded-[32px] border border-black/5 bg-white p-7 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
                  <WeatherIcon className="text-blue-500" />
                </div>

                <h3 className="mt-8 text-5xl font-black text-navy">
                  {weather ? `${weather.temperature}°` : "—"}
                </h3>

                <span className="mt-2 block text-slate-500">
                  {weather ? `Manaus agora · ${weather.description}, umidade ${weather.humidity}%` : "Clima indisponível"}
                </span>
              </div>

              <div className="rounded-[32px] border border-black/5 bg-white p-7 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
                  <TriangleAlert className="text-red-500" />
                </div>

                <h3 className="mt-8 text-5xl font-black text-navy">
                  {alertCount}
                </h3>

                <span className="mt-2 block text-slate-500">
                  Alertas nas últimas 48h
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
              {pickDiverse(latest.filter((a) => a.slug !== lead.slug), FEED_ITEMS).map((item, index) => (
                <Link
                  key={item.id}
                  href={`/noticias/${item.slug}`}
                  className="group block rounded-[28px] border border-black/5 bg-[#F8FAFC] p-5 transition hover:bg-slate-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/10">
                      <span className="font-black text-gold-dark">
                        0{index + 1}
                      </span>
                    </div>

                    <div>
                      <h4 className="line-clamp-3 font-bold leading-relaxed text-navy">
                        {item.title}
                      </h4>

                      <span className="mt-2 block text-sm text-slate-500" suppressHydrationWarning>
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