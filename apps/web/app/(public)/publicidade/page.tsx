import { Metadata } from "next";
import { ArrowUpRight, BarChart3, Eye, Mail, Megaphone, Smartphone, Target, TrendingUp } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Publicidade | ${SITE_NAME}`,
  description: "Anuncie no Portal Funil e alcance mais de 2,4 milhões de leitores em Manaus.",
};

const formats = [
  {
    icon: Eye,
    title: "Display Premium",
    desc: "Banners de alta visibilidade nas principais posições do portal — home, categorias e artigos.",
    badge: "Mais popular",
    badgeColor: "bg-gold text-navy",
  },
  {
    icon: Megaphone,
    title: "Conteúdo Patrocinado",
    desc: "Matérias e reportagens especiais produzidas pela nossa equipe com a identidade da sua marca.",
    badge: "Alta conversão",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    icon: Smartphone,
    title: "Push Notification",
    desc: "Alerte nossos leitores diretamente no celular com mensagens da sua marca no momento certo.",
    badge: "Novidade",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: Target,
    title: "Segmentação Localizada",
    desc: "Impacte leitores por bairro, zona da cidade ou categoria de interesse no Amazonas.",
    badge: null,
    badgeColor: "",
  },
  {
    icon: BarChart3,
    title: "Newsletter Patrocinada",
    desc: "Apareça na nossa newsletter diária enviada para mais de 80.000 assinantes ativos.",
    badge: null,
    badgeColor: "",
  },
  {
    icon: TrendingUp,
    title: "Trending Topics",
    desc: "Posicione sua marca nos assuntos mais comentados do dia na barra de tendências.",
    badge: null,
    badgeColor: "",
  },
];

const stats = [
  { value: "2,4M", label: "Leitores/mês" },
  { value: "8,1M", label: "Pageviews/mês" },
  { value: "4:32", label: "Tempo médio de sessão" },
  { value: "68%", label: "Leitores locais (AM)" },
];

export default function PublicidadePage() {
  return (
    <main className="min-h-screen bg-surface text-navy">
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy px-6 py-20">
        <div className="absolute left-[-80px] top-[-80px] h-[300px] w-[300px] rounded-full bg-gold/8 blur-[120px]" />
        <div className="absolute bottom-[-60px] right-[-60px] h-[240px] w-[240px] rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="relative z-10 mx-auto max-w-[1440px]">
          <span className="text-xs font-black uppercase tracking-[0.35em] text-gold">ANUNCIE</span>
          <h1 className="mt-6 text-5xl font-black tracking-[-0.05em] text-white lg:text-7xl">
            Fale com <br /><span className="text-gold">Manaus</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            O Portal Funil é o maior portal de notícias de Manaus. Alcance mais de
            2,4 milhões de leitores com formatos publicitários premium.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/8 bg-white/5 px-5 py-4">
                <div className="text-3xl font-black text-gold">{s.value}</div>
                <div className="mt-1 text-sm text-zinc-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMATS */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12">
            <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">FORMATOS</span>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em]">Soluções publicitárias</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {formats.map(({ icon: Icon, title, desc, badge, badgeColor }) => (
              <div key={title} className="relative flex flex-col rounded-[32px] border border-black/5 bg-white p-8 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
                {badge && (
                  <span className={`absolute right-6 top-6 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wide ${badgeColor}`}>
                    {badge}
                  </span>
                )}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10">
                  <Icon size={22} className="text-gold-dark" />
                </div>
                <h3 className="mt-6 text-xl font-black">{title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="overflow-hidden rounded-[40px] bg-navy p-12">
            <div className="absolute left-[-60px] top-[-60px] h-[240px] w-[240px] rounded-full bg-gold/8 blur-[100px]" />
            <div className="relative z-10 grid gap-10 lg:grid-cols-2">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.35em] text-gold">FALE COM A GENTE</span>
                <h2 className="mt-6 text-4xl font-black leading-tight text-white">Vamos criar sua campanha?</h2>
                <p className="mt-5 leading-relaxed text-zinc-400">
                  Nossa equipe comercial elabora propostas personalizadas para cada tipo
                  de negócio. Atendemos desde microempresas até grandes marcas nacionais.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="mailto:publicidade@funildenoticias.com.br"
                    className="flex items-center gap-2 rounded-2xl bg-gold px-6 py-4 text-sm font-black text-navy transition hover:-translate-y-0.5">
                    <Mail size={16} /> publicidade@funildenoticias.com.br
                  </a>
                </div>
                <p className="mt-4 text-sm text-zinc-500">Retorno em até 24h úteis.</p>
              </div>
              <div className="rounded-[28px] border border-white/8 bg-white/5 p-8">
                <h3 className="text-xl font-black text-white mb-6">Solicite uma proposta</h3>
                <div className="space-y-4">
                  <input type="text" placeholder="Empresa / Nome" className="h-[48px] w-full rounded-2xl border border-white/10 bg-white/5 px-5 text-sm text-white outline-none placeholder:text-zinc-500" />
                  <input type="email" placeholder="E-mail comercial" className="h-[48px] w-full rounded-2xl border border-white/10 bg-white/5 px-5 text-sm text-white outline-none placeholder:text-zinc-500" />
                  <input type="tel" placeholder="Telefone / WhatsApp" className="h-[48px] w-full rounded-2xl border border-white/10 bg-white/5 px-5 text-sm text-white outline-none placeholder:text-zinc-500" />
                  <textarea rows={3} placeholder="Descreva seu objetivo de campanha..." className="w-full rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white outline-none placeholder:text-zinc-500 resize-none" />
                  <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gold py-4 text-sm font-black uppercase tracking-wide text-navy transition hover:-translate-y-0.5">
                    Solicitar proposta <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
