import { Metadata } from "next";
import {
  Activity,
  ArrowUpRight,
  Bell,
  Crown,
  Radio,
  Shield,
  Star,
  Zap,
} from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { PricingGrid } from "@/components/pricing/pricing-grid";

export const metadata: Metadata = {
  title: `Assinar Pro | ${SITE_NAME}`,
  description: "Tenha acesso ilimitado a todo o conteúdo do Portal Funil.",
};

const proFeatures = [
  { icon: Radio, text: "Cobertura ao vivo sem interrupções" },
  { icon: Bell, text: "Alertas em tempo real no celular" },
  { icon: Shield, text: "Sem anúncios em todo o portal" },
  { icon: Activity, text: "Acesso ao painel operacional completo" },
  { icon: Star, text: "Conteúdo exclusivo de colunistas" },
  { icon: Zap, text: "Newsletter diária prioritária" },
];

const faq = [
  {
    q: "Posso cancelar quando quiser?",
    a: "Sim. Você pode cancelar sua assinatura a qualquer momento, sem multa ou burocracia. O acesso continua até o fim do período já pago.",
  },
  {
    q: "Como funciona o plano anual?",
    a: "No plano anual você economiza 33% em relação ao mensal. O valor é cobrado uma única vez no cartão de crédito ou boleto.",
  },
  {
    q: "O conteúdo gratuito continua disponível?",
    a: "Sim. O portal continua com acesso gratuito a grande parte das notícias. O Pro desbloqueia coberturas exclusivas, painel avançado e experiência sem anúncios.",
  },
  {
    q: "Posso usar em mais de um dispositivo?",
    a: "Sim. Sua conta Pro pode ser acessada em até 3 dispositivos simultaneamente — smartphone, tablet e computador.",
  },
  {
    q: "Existe período de teste gratuito?",
    a: "Oferecemos 7 dias grátis para novos assinantes. Você não é cobrado durante o período de teste.",
  },
];

export default function AssinarPage() {
  return (
    <main className="min-h-screen bg-surface text-navy">
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy px-6 py-24 text-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[500px] w-[500px] rounded-full bg-gold/8 blur-[160px]" />
        </div>
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(ellipse_at_top,rgba(244,197,66,0.07),transparent_60%)]" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-5 py-2.5">
            <Crown size={16} className="text-gold" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-gold">
              Portal Funil Pro
            </span>
          </div>

          <h1 className="mt-8 text-5xl font-black leading-none tracking-[-0.05em] text-white lg:text-7xl">
            Jornalismo sem
            <br />
            <span className="text-gold">limitações</span>
          </h1>

          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-zinc-400">
            Acesso ilimitado a toda cobertura de Manaus, alertas em tempo real,
            painel operacional completo e zero anúncios.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a
              href="#planos"
              className="flex items-center gap-2 rounded-2xl bg-gold px-8 py-4 text-sm font-black uppercase tracking-wide text-navy transition hover:-translate-y-0.5"
            >
              Ver planos
              <ArrowUpRight size={16} />
            </a>
            <a
              href="#funcionalidades"
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Saiba mais
            </a>
          </div>

          <p className="mt-6 text-sm text-zinc-500">
            7 dias grátis • Cancele quando quiser • Sem fidelidade
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section id="funcionalidades" className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">
              BENEFÍCIOS
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-navy">
              O que você ganha com o Pro
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {proFeatures.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-start gap-4 rounded-[28px] border border-black/5 bg-white p-7 shadow-[0_10px_40px_rgba(15,23,42,0.05)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/10">
                  <Icon size={22} className="text-gold-dark" />
                </div>
                <p className="mt-1 font-semibold leading-relaxed text-navy">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section id="planos" className="bg-navy px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <span className="text-xs font-black uppercase tracking-[0.35em] text-gold">
              PLANOS
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-white">
              Escolha o seu plano
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              Mensal ou anual — economize até 2 meses no plano anual
            </p>
          </div>

          {/* PRICING GRID */}
          <PricingGrid />
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">
              DÚVIDAS
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-navy">
              Perguntas frequentes
            </h2>
          </div>

          <div className="space-y-4">
            {faq.map(({ q, a }) => (
              <div
                key={q}
                className="overflow-hidden rounded-[28px] border border-black/5 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.04)]"
              >
                <h3 className="text-lg font-black text-navy">{q}</h3>
                <p className="mt-4 leading-relaxed text-slate-500">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-[40px] bg-navy p-14 text-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[400px] w-[400px] rounded-full bg-gold/6 blur-[120px]" />
            </div>

            <div className="relative z-10">
              <Crown size={32} className="mx-auto text-gold" />
              <h2 className="mt-6 text-4xl font-black tracking-[-0.05em] text-white">
                Comece grátis hoje
              </h2>
              <p className="mx-auto mt-5 max-w-md leading-relaxed text-zinc-400">
                7 dias de Portal Funil Pro sem cobrar nada. Cancele antes do
                período acabar e não paga um centavo.
              </p>
              <button className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gold px-10 py-4 text-sm font-black uppercase tracking-wide text-navy transition hover:-translate-y-0.5">
                Iniciar 7 dias grátis
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
