import { Metadata } from "next";
import { Activity, ArrowUpRight, Clock, Eye, Radio, TriangleAlert, Users } from "lucide-react";
import { getLiveArticles } from "@/services/articles.service";
import { NewsCard } from "@/components/cards/news-card";
import { SITE_NAME } from "@/lib/constants";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Ao Vivo | ${SITE_NAME}`,
  description: "Cobertura ao vivo de Manaus em tempo real.",
};

export default async function AoVivoPage() {
  const liveArticles = await getLiveArticles();

  const feed = liveArticles.slice(0, 8).map((a) => ({
    time: a.publishedAt
      ? new Date(a.publishedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      : "--:--",
    text: a.title,
  }));

  return (
    <main className="min-h-screen bg-surface text-navy">
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy px-6 py-20">
        <div className="absolute left-[-100px] top-[-100px] h-[400px] w-[400px] rounded-full bg-red-500/10 blur-[120px]" />
        <div className="absolute bottom-[-100px] right-[-100px] h-[400px] w-[400px] rounded-full bg-gold/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1440px]">
          <div className="inline-flex items-center gap-3 rounded-full border border-red-500/20 bg-red-500/10 px-5 py-2.5">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-red-400">
              Transmissão ao vivo
            </span>
          </div>

          <h1 className="mt-8 text-5xl font-black leading-none tracking-[-0.06em] text-white lg:text-8xl">
            Cobertura
            <br />
            <span className="text-gold">ao vivo</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Monitoramento em tempo real de clima, trânsito, alertas e operações
            urbanas em Manaus.
          </p>

          <div className="mt-10 flex flex-wrap gap-6">
            {[
              { icon: Users, value: "48.2k", label: "Acompanhando" },
              { icon: TriangleAlert, value: "12", label: "Alertas ativos" },
              { icon: Activity, value: "2.4k", label: "Sensores online" },
              { icon: Radio, value: "8", label: "Transmissões" },
            ].map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm"
              >
                <Icon size={18} className="text-gold" />
                <div>
                  <div className="text-xl font-black text-white">{value}</div>
                  <div className="text-xs text-zinc-500">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-[40px] bg-navy shadow-[0_30px_80px_rgba(15,23,42,0.2)]">
                <div className="absolute inset-0">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2070)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
                </div>

                <div className="relative z-10 flex min-h-[480px] flex-col items-center justify-center gap-6">
                  <div className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition hover:bg-white/20">
                    <div className="ml-1.5 h-0 w-0 border-y-[14px] border-l-[24px] border-y-transparent border-l-white" />
                  </div>
                  <div className="text-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-2 text-xs font-black uppercase tracking-[0.3em] text-white">
                      <Radio size={12} />
                      Ao vivo agora
                    </span>
                    <h2 className="mt-5 text-3xl font-black text-white">
                      Operações Manaus — Tempo Real
                    </h2>
                    <p className="mt-3 text-sm text-zinc-400">Transmissão iniciada há 1h42min</p>
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between border-t border-white/10 px-8 py-5">
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Eye size={16} className="text-gold" />
                    <span className="font-bold text-white">48.231</span> espectadores
                  </div>
                  <button className="flex items-center gap-2 rounded-2xl bg-gold px-6 py-3 text-sm font-black text-navy transition hover:-translate-y-0.5">
                    Assistir em tela cheia
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>

              {liveArticles.length > 0 && (
                <div>
                  <h2 className="mb-6 text-2xl font-black tracking-[-0.04em] text-navy">
                    Coberturas em andamento
                  </h2>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {liveArticles.map((article) => (
                      <NewsCard key={article.id} article={article} variant="vertical" />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-[40px] border border-black/5 bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.06)]">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-gold-dark">LIVE FEED</span>
                    <h3 className="mt-3 text-2xl font-black text-navy">Atualizações</h3>
                  </div>
                  <div className="h-3 w-3 animate-pulse rounded-full bg-red-500" />
                </div>
                <div className="mt-8 space-y-4">
                  {feed.length > 0 ? feed.map((item, i) => (
                    <div key={i} className="group rounded-[24px] border border-black/5 bg-[#F8FAFC] p-5 transition hover:bg-slate-100">
                      <div className="flex items-start gap-4">
                        <div className="mt-0.5 flex shrink-0 items-center gap-1.5 text-xs font-black text-gold-dark">
                          <Clock size={12} />
                          {item.time}
                        </div>
                        <p className="text-sm leading-relaxed text-navy">{item.text}</p>
                      </div>
                    </div>
                  )) : (
                    <p className="py-4 text-center text-sm text-slate-400">Nenhuma atualização ao vivo no momento.</p>
                  )}
                </div>
              </div>

              <div className="rounded-[32px] border border-gold/20 bg-navy p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10">
                    <TriangleAlert className="text-gold" size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-gold">Alerta ativo</span>
                    <p className="mt-1 font-bold text-white">Defesa Civil em nível máximo</p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-zinc-400">
                  Todas as equipes estão mobilizadas nas zonas Norte e Centro-Oeste. Ligue 199 em caso de emergência.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
