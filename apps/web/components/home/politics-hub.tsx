import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  Calendar,
  Clock3,
  Globe,
  Landmark,
  MapPin,
  TrendingUp,
} from "lucide-react";

const featured = {
  scope: "BRASIL",
  tag: "Aprovado",
  title: "Congresso aprova lei que regula motoristas de apps e garante direitos a 1,7 mi de trabalhadores",
  description:
    "Câmara aprovou por 400 a 36 projeto que cria carteira especial para trabalhadores de plataformas digitais. Motoristas de aplicativo terão previdência social, seguro de acidente e piso mínimo por km rodado.",
  author: "Redação Portal Funil",
  time: "há 2h",
  readTime: "5 min",
  href: "/categoria/politica",
};

const agenda = [
  { date: "Hoje", time: "14h", event: "Posse do novo presidente do STF — Alexandre de Moraes", local: "Brasília" },
  { date: "Amanhã", time: "10h", event: "Sessão ALE-AM — PL incentivos Zona Franca", local: "Manaus" },
  { date: "21/05", time: "09h", event: "Reunião do G7 — pauta crise climática amazônica", local: "Tóquio" },
  { date: "23/05", time: "15h", event: "Copa 2026: sorteio das chaves — transmissão ao vivo", local: "Miami" },
];

const scopes = [
  {
    id: "amazonas",
    label: "Amazonas",
    icon: MapPin,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    accent: "bg-emerald-500",
    news: [
      {
        title: "TSE investiga fraude em cotas de gênero nas eleições de Iranduba",
        time: "há 1h",
        views: "6.3k",
        href: "/categoria/politica",
      },
      {
        title: "Zona Franca de Manaus bate recorde com R$ 2,1 bi no 1° trimestre",
        time: "há 3h",
        views: "4.8k",
        href: "/categoria/politica",
      },
      {
        title: "Prefeito assina convênio federal para saneamento de 120 mil famílias",
        time: "há 6h",
        views: "3.2k",
        href: "/categoria/politica",
      },
      {
        title: "ALE-AM vota PL de incentivos fiscais para startups amazônicas",
        time: "há 9h",
        views: "2.7k",
        href: "/categoria/politica",
      },
    ],
  },
  {
    id: "brasil",
    label: "Brasil",
    icon: Landmark,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    accent: "bg-blue-500",
    news: [
      {
        title: "Câmara aprova regulamentação dos apps de transporte — piso de R$ 30 bi",
        time: "há 2h",
        views: "22k",
        href: "/categoria/politica",
      },
      {
        title: "Brasileiras embarcam em flotilha humanitária rumo a Gaza",
        time: "há 4h",
        views: "15k",
        href: "/categoria/politica",
      },
      {
        title: "Copa 2026: Dorival convoca seleção com Neymar e cinco estreantes",
        time: "há 5h",
        views: "31k",
        href: "/categoria/politica",
      },
      {
        title: "Ibovespa supera 140 mil pontos; dólar fecha a R$ 5,04",
        time: "há 7h",
        views: "9.1k",
        href: "/categoria/politica",
      },
    ],
  },
  {
    id: "mundo",
    label: "Mundo",
    icon: Globe,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
    accent: "bg-purple-500",
    news: [
      {
        title: "Trump e Irã retomam negociações nucleares em Roma após 5 anos",
        time: "há 1h",
        views: "28k",
        href: "/categoria/politica",
      },
      {
        title: "General boliviano preso após tentativa de golpe de Estado fracassada",
        time: "há 3h",
        views: "19k",
        href: "/categoria/politica",
      },
      {
        title: "Ucrânia lança maior ofensiva de drones contra Moscou desde o início da guerra",
        time: "há 5h",
        views: "14k",
        href: "/categoria/politica",
      },
      {
        title: "ONU debate financiamento verde para Amazônia na Cúpula do Clima",
        time: "há 8h",
        views: "8.4k",
        href: "/categoria/politica",
      },
    ],
  },
];

export function PoliticsHub() {
  return (
    <section className="relative px-6 pb-14">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <Building2 size={14} className="text-gold-dark" />
              <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">
                POLÍTICA
              </span>
            </div>
            <h2 className="mt-4 text-5xl font-black tracking-[-0.05em] text-navy">
              Poder em foco
            </h2>
            <p className="mt-3 max-w-xl text-lg text-slate-500">
              Cobertura política do Amazonas, do Brasil e do mundo — tudo que
              impacta a sua vida.
            </p>
          </div>

          <Link
            href="/categoria/politica"
            className="hidden items-center gap-2 rounded-2xl border border-black/5 bg-white px-5 py-3 text-sm font-semibold text-navy shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 lg:flex"
          >
            Cobertura completa
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* TOP ROW — Featured + Agenda */}
        <div className="mb-6 grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* FEATURED */}
          <Link
            href={featured.href}
            className="group relative overflow-hidden rounded-[40px] bg-navy p-10 shadow-[0_20px_80px_rgba(2,6,23,0.2)] transition hover:-translate-y-1 block"
          >
            {/* glows */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-[-100px] top-[-100px] h-[280px] w-[280px] rounded-full bg-gold/12 blur-[100px]" />
              <div className="absolute bottom-[-80px] right-[-80px] h-[240px] w-[240px] rounded-full bg-blue-600/10 blur-[100px]" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-gold px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-navy">
                  {featured.scope}
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/10 px-3 py-1.5 text-[10px] font-black text-gold">
                  <TrendingUp size={10} />
                  {featured.tag}
                </span>
              </div>

              <h3 className="mt-7 text-3xl font-black leading-tight tracking-[-0.04em] text-white transition group-hover:text-gold lg:text-4xl">
                {featured.title}
              </h3>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">
                {featured.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-zinc-500">
                <div className="flex items-center gap-2">
                  <BookOpen size={14} className="text-gold" />
                  {featured.author}
                </div>
                <div className="flex items-center gap-2">
                  <Clock3 size={14} />
                  {featured.time}
                </div>
                <div className="flex items-center gap-2">
                  <ArrowUpRight size={14} />
                  {featured.readTime} de leitura
                </div>
              </div>
            </div>
          </Link>

          {/* AGENDA POLÍTICA */}
          <div className="overflow-hidden rounded-[36px] border border-black/5 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
            <div className="border-b border-slate-100 px-7 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-navy">
                  <Calendar size={16} className="text-gold" />
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    AGENDA
                  </span>
                  <h3 className="text-base font-black text-navy">Política esta semana</h3>
                </div>
              </div>
            </div>

            <div className="divide-y divide-slate-50 px-4 pb-4 pt-2">
              {agenda.map((item) => (
                <div key={item.event} className="flex items-start gap-4 py-4">
                  {/* date badge */}
                  <div className="flex w-[56px] shrink-0 flex-col items-center rounded-2xl bg-slate-50 py-2.5 text-center">
                    <span className="text-[10px] font-black uppercase text-gold-dark">
                      {item.date}
                    </span>
                    <span className="mt-0.5 text-xs font-black text-navy">{item.time}</span>
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-bold leading-snug text-navy">
                      {item.event}
                    </p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <MapPin size={10} className="shrink-0 text-slate-400" />
                      <span className="text-xs text-slate-400">{item.local}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM ROW — 3 scopes */}
        <div className="grid gap-5 lg:grid-cols-3">
          {scopes.map(({ id, label, icon: Icon, color, bg, border, news }) => (
            <div
              key={id}
              className="overflow-hidden rounded-[36px] border border-black/5 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)]"
            >
              {/* scope header */}
              <div className={`flex items-center gap-3 border-b ${border} bg-gradient-to-r from-slate-50 to-white px-6 py-5`}>
                <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${bg}`}>
                  <Icon size={18} className={color} />
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    POLÍTICA
                  </span>
                  <h3 className={`text-base font-black ${color}`}>{label}</h3>
                </div>
                <Link
                  href="/categoria/politica"
                  className="ml-auto flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-slate-300 hover:text-slate-600"
                >
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              {/* news list */}
              <div className="divide-y divide-slate-50">
                {news.map((item, i) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group flex items-start gap-4 px-6 py-4 transition hover:bg-slate-50"
                  >
                    {/* number */}
                    <span className="mt-0.5 shrink-0 text-2xl font-black text-slate-100 transition group-hover:text-slate-200">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0">
                      <p className="text-sm font-bold leading-snug text-navy transition group-hover:text-cobalt line-clamp-2">
                        {item.title}
                      </p>
                      <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                        <span>{item.time}</span>
                        <span>•</span>
                        <span>{item.views} views</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* footer */}
              <div className={`mx-5 mb-5 rounded-2xl ${bg} px-4 py-3`}>
                <Link
                  href="/categoria/politica"
                  className={`flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wide ${color}`}
                >
                  Ver toda a cobertura de {label}
                  <ArrowUpRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
