import Link from "next/link";
import {
  AlertOctagon,
  ArrowUpRight,
  Camera,
  ClipboardCheck,
  FileText,
  Landmark,
  Mail,
  MessageCircle,
  Send,
  ShieldCheck,
} from "lucide-react";

const actions = [
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
  { value: "1.247", label: "Denúncias recebidas" },
  { value: "89",    label: "Publicadas e apuradas" },
  { value: "12h",   label: "Tempo médio de resposta" },
  { value: "94%",   label: "Taxa de retorno ao leitor" },
];

const channels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    description: "Atendimento direto",
    color: "bg-emerald-500 hover:bg-emerald-600",
    href: "https://wa.me/5592999990000",
  },
  {
    icon: Send,
    label: "Telegram",
    description: "@portalfunil",
    color: "bg-sky-500 hover:bg-sky-600",
    href: "https://t.me/portalfunil",
  },
  {
    icon: Mail,
    label: "E-mail",
    description: "redacao@funildenoticias.com.br",
    color: "bg-slate-700 hover:bg-slate-800",
    href: "mailto:redacao@funildenoticias.com.br",
  },
];

export function ReaderHub() {
  return (
    <section className="relative px-6 pb-14">
      <div className="mx-auto max-w-[1440px]">

        {/* HEADER */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <MessageCircle size={14} className="text-gold-dark" />
              <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">
                CENTRAL DO LEITOR
              </span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.05em] text-navy">
              Sua voz na redação
            </h2>
            <p className="mt-3 max-w-xl text-lg text-slate-500">
              Denúncias, sugestões de pauta, fotos e vídeos. Você é parte da
              cobertura do Portal Funil.
            </p>
          </div>

          <Link
            href="/denuncias"
            className="hidden items-center gap-2 rounded-2xl border border-black/5 bg-white px-5 py-3 text-sm font-semibold text-navy shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 lg:flex"
          >
            Central de denúncias
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* STATS BAR */}
        <div className="mb-4 grid grid-cols-2 gap-3 sm:mb-6 sm:gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-[20px] border border-black/5 bg-white px-4 py-3 shadow-[0_8px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px] sm:px-6 sm:py-5"
            >
              <div className="text-2xl font-black tracking-[-0.04em] text-navy sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-0.5 text-xs text-slate-400 sm:mt-1 sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ACTION CARDS — linhas compactas no celular/tablet, cartões altos só no desktop */}
        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {actions.map(({ icon: Icon, color, bg, border, title, description, cta, href }) => (
            <Link
              key={title}
              href={href}
              className={`group flex items-center gap-4 overflow-hidden rounded-[22px] border ${border} bg-white p-4 shadow-[0_10px_40px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(15,23,42,0.10)] lg:flex-col lg:items-stretch lg:gap-0 lg:rounded-[32px] lg:p-7 lg:hover:-translate-y-1`}
            >
              {/* Icon */}
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${bg} lg:h-12 lg:w-12`}>
                <Icon size={20} className={color} />
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-black leading-tight text-navy lg:mt-5 lg:text-lg">{title}</h3>
                <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-slate-400 lg:mt-2 lg:line-clamp-none lg:text-sm lg:leading-relaxed">
                  {description}
                </p>
              </div>

              {/* CTA */}
              <div className={`flex shrink-0 items-center gap-2 text-sm font-black ${color} transition group-hover:gap-3 lg:mt-6`}>
                <span className="hidden lg:inline">{cta}</span>
                <ArrowUpRight size={16} />
              </div>
            </Link>
          ))}
        </div>

        {/* CONTACT CHANNELS */}
        <div className="overflow-hidden rounded-[40px] bg-navy p-8 shadow-[0_24px_80px_rgba(2,6,23,0.2)] md:p-10">
          {/* glows */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[-80px] top-[-80px] h-[260px] w-[260px] rounded-full bg-gold/8 blur-[100px]" />
            <div className="absolute bottom-[-60px] right-[-60px] h-[200px] w-[200px] rounded-full bg-blue-600/10 blur-[100px]" />
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-8">
            <div className="max-w-lg">
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-gold">
                FALE CONOSCO
              </span>
              <h3 className="mt-3 text-3xl font-black leading-tight text-white">
                Prefere falar direto com a redação?
              </h3>
              <p className="mt-3 text-base leading-relaxed text-zinc-400">
                Escolha o canal que preferir. Nossa equipe responde em até 12
                horas para todas as denúncias recebidas.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {channels.map(({ icon: Icon, label, description, color, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 rounded-2xl ${color} px-5 py-3.5 text-white transition`}
                >
                  <Icon size={18} />
                  <div>
                    <div className="text-sm font-black">{label}</div>
                    <div className="text-[10px] text-white/60">{description}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
