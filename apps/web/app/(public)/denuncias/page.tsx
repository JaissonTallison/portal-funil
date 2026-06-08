import { Metadata } from "next";
import Link from "next/link";
import {
  AlertOctagon,
  ArrowUpRight,
  Camera,
  ClipboardCheck,
  FileText,
  Landmark,
  MessageCircle,
  Send,
  ShieldCheck,
} from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Central de Denúncias | ${SITE_NAME}`,
  description: "Envie denúncias, sugestões de pauta e fotos para a redação do Portal Funil.",
};

const channels = [
  {
    icon: AlertOctagon,
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-100",
    title: "Denúncia Policial",
    description: "Crime, violência, tráfico ou qualquer ilegalidade na sua região.",
    cta: "Denunciar agora",
    href: "/denuncias/policial",
  },
  {
    icon: Landmark,
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-100",
    title: "Problema Urbano",
    description: "Bueiro, buraco, falta de luz, alagamento ou problema na sua rua.",
    cta: "Reportar problema",
    href: "/denuncias/urbano",
  },
  {
    icon: FileText,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    title: "Sugestão de Pauta",
    description: "Tem uma história importante para contar? Nossa redação quer ouvir.",
    cta: "Sugerir pauta",
    href: "/denuncias/pauta",
  },
  {
    icon: ShieldCheck,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
    title: "Denúncia Anônima",
    description: "Proteção total à sua identidade. Canal criptografado e seguro.",
    cta: "Denúncia sigilosa",
    href: "/denuncias/anonima",
  },
  {
    icon: Camera,
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
    title: "Enviar Foto ou Vídeo",
    description: "Presenciou algo? Envie imagens e vídeos direto para a redação.",
    cta: "Enviar mídia",
    href: "/denuncias/midia",
  },
  {
    icon: ClipboardCheck,
    color: "text-gold-dark",
    bg: "bg-gold/10",
    border: "border-gold/20",
    title: "Acompanhar Denúncia",
    description: "Já enviou uma denúncia? Consulte o status de apuração aqui.",
    cta: "Consultar status",
    href: "/denuncias/status",
  },
];

const stats = [
  { value: "1.247", label: "Denúncias este mês" },
  { value: "89",    label: "Publicadas e apuradas" },
  { value: "12h",   label: "Tempo médio de resposta" },
  { value: "94%",   label: "Taxa de retorno ao leitor" },
];

export default function DenunciasPage() {
  return (
    <main className="min-h-screen bg-surface text-navy">
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy px-6 py-20">
        <div className="absolute left-[-80px] top-[-80px] h-[300px] w-[300px] rounded-full bg-gold/8 blur-[120px]" />
        <div className="absolute bottom-[-60px] right-[-60px] h-[240px] w-[240px] rounded-full bg-blue-600/10 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10">
              <MessageCircle size={22} className="text-gold" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.35em] text-gold">
              CENTRAL DO LEITOR
            </span>
          </div>

          <h1 className="mt-6 text-5xl font-black tracking-[-0.05em] text-white lg:text-7xl">
            Sua voz <br />
            <span className="text-gold">na redação</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            Denúncias, sugestões de pauta, fotos e vídeos. Você é parte da
            cobertura do Portal Funil. Nossa equipe responde em até 12 horas.
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

      {/* CHANNELS */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">
              COMO ENVIAR
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-navy">
              Escolha o canal
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map(({ icon: Icon, color, bg, border, title, description, cta, href }) => (
              <Link
                key={title}
                href={href}
                className={`group flex flex-col overflow-hidden rounded-[32px] border ${border} bg-white p-8 shadow-[0_10px_40px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.10)]`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${bg}`}>
                  <Icon size={22} className={color} />
                </div>
                <h3 className="mt-6 text-xl font-black text-navy">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{description}</p>
                <div className={`mt-6 flex items-center gap-2 text-sm font-black ${color} transition group-hover:gap-3`}>
                  {cta}
                  <ArrowUpRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA WHATSAPP */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[40px] bg-navy p-12">
            <div className="absolute left-[-60px] top-[-60px] h-[240px] w-[240px] rounded-full bg-gold/8 blur-[100px]" />
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-8">
              <div className="max-w-lg">
                <span className="text-[10px] font-black uppercase tracking-[0.35em] text-gold">CONTATO DIRETO</span>
                <h3 className="mt-3 text-3xl font-black text-white">Prefere falar direto com a redação?</h3>
                <p className="mt-3 text-zinc-400">Nossa equipe está disponível via WhatsApp, Telegram e e-mail. Atendimento 24h para casos urgentes.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="https://wa.me/5592999990000" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl bg-emerald-500 px-6 py-4 text-sm font-black text-white transition hover:bg-emerald-600">
                  <Send size={16} /> WhatsApp
                </a>
                <a href="mailto:redacao@funildenoticias.com.br"
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
                  E-mail
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
