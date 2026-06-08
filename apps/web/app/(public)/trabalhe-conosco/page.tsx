import { Metadata } from "next";
import { ArrowUpRight, Briefcase, Clock, MapPin, Zap } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Trabalhe Conosco | ${SITE_NAME}`,
  description: "Faça parte da equipe do maior portal de notícias de Manaus.",
};

const openings = [
  {
    title: "Repórter de Segurança Pública",
    area: "Jornalismo",
    type: "CLT",
    regime: "Presencial",
    local: "Manaus, AM",
    description: "Cobertura de ocorrências policiais, audiências judiciais e segurança urbana em Manaus.",
    tags: ["Jornalismo", "Policial", "Manaus"],
  },
  {
    title: "Editor de Vídeo",
    area: "Conteúdo",
    type: "CLT",
    regime: "Híbrido",
    local: "Manaus, AM",
    description: "Edição de vídeos para cobertura ao vivo, YouTube e redes sociais do portal.",
    tags: ["Vídeo", "Adobe Premiere", "Redes Sociais"],
  },
  {
    title: "Desenvolvedor Front-end",
    area: "Tecnologia",
    type: "PJ",
    regime: "Remoto",
    local: "Remoto",
    description: "Manutenção e evolução do portal. Stack: Next.js, TypeScript, Tailwind CSS.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    title: "Analista Comercial",
    area: "Comercial",
    type: "CLT",
    regime: "Presencial",
    local: "Manaus, AM",
    description: "Prospecção e atendimento de anunciantes locais e nacionais. Metas e comissões.",
    tags: ["Vendas", "Publicidade", "B2B"],
  },
  {
    title: "Social Media",
    area: "Marketing",
    type: "CLT",
    regime: "Híbrido",
    local: "Manaus, AM",
    description: "Gestão das redes sociais do portal. Criação de conteúdo, análise de métricas e engajamento.",
    tags: ["Instagram", "TikTok", "Canva"],
  },
  {
    title: "Produtor de Podcast",
    area: "Conteúdo",
    type: "PJ",
    regime: "Híbrido",
    local: "Manaus, AM",
    description: "Produção do podcast semanal do Portal Funil com entrevistas e análises políticas.",
    tags: ["Áudio", "Edição", "Roteiro"],
  },
];

const benefits = [
  "Plano de saúde Unimed",
  "Vale-alimentação R$1.200/mês",
  "Vale-transporte ou auxílio home office",
  "Convênio academia SmartFit",
  "Acesso Portal Funil Pro vitalício",
  "Bônus semestral por desempenho",
  "Treinamentos e cursos pagos",
  "Ambiente criativo e dinâmico",
];

const typeColor: Record<string, string> = {
  CLT: "bg-emerald-100 text-emerald-700",
  PJ: "bg-blue-100 text-blue-700",
};

const regimeColor: Record<string, string> = {
  Presencial: "bg-slate-100 text-slate-600",
  Híbrido: "bg-purple-100 text-purple-700",
  Remoto: "bg-teal-100 text-teal-700",
};

export default function TrabalheConoscoPage() {
  return (
    <main className="min-h-screen bg-surface text-navy">
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy px-6 py-20">
        <div className="absolute left-[-80px] top-[-80px] h-[300px] w-[300px] rounded-full bg-gold/8 blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <span className="text-xs font-black uppercase tracking-[0.35em] text-gold">CARREIRAS</span>
          <h1 className="mt-6 text-5xl font-black tracking-[-0.05em] text-white lg:text-7xl">
            Faça parte <br /><span className="text-gold">do time</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            Trabalhamos com jornalismo de impacto, tecnologia de ponta e uma equipe
            apaixonada por Manaus. Venha construir o futuro da informação com a gente.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="#vagas" className="flex items-center gap-2 rounded-2xl bg-gold px-8 py-4 text-sm font-black text-navy transition hover:-translate-y-0.5">
              Ver vagas abertas <ArrowUpRight size={16} />
            </a>
            <a href="mailto:rh@funildenoticias.com.br" className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
              Candidatura espontânea
            </a>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">BENEFÍCIOS</span>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em]">O que oferecemos</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white px-5 py-4 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
                <Zap size={16} className="shrink-0 text-gold-dark" />
                <span className="text-sm font-semibold">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPENINGS */}
      <section id="vagas" className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">OPORTUNIDADES</span>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em]">Vagas abertas</h2>
          </div>

          <div className="space-y-4">
            {openings.map((job) => (
              <div key={job.title} className="group overflow-hidden rounded-[28px] border border-black/5 bg-white p-7 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_50px_rgba(15,23,42,0.08)]">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wide ${typeColor[job.type]}`}>{job.type}</span>
                      <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wide ${regimeColor[job.regime]}`}>{job.regime}</span>
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{job.area}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-black">{job.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{job.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span key={tag} className="rounded-xl bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-400">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center gap-1.5 text-sm text-slate-400">
                      <MapPin size={13} />{job.local}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-slate-400">
                      <Clock size={13} />Imediato
                    </div>
                    <a href={`mailto:rh@funildenoticias.com.br?subject=Candidatura: ${job.title}`}
                      className="flex items-center gap-2 rounded-2xl bg-navy px-5 py-2.5 text-sm font-black text-white transition group-hover:bg-cobalt">
                      <Briefcase size={14} /> Candidatar-se
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SPONTANEOUS */}
          <div className="mt-8 overflow-hidden rounded-[32px] bg-navy p-10 text-center">
            <span className="text-xs font-black uppercase tracking-[0.35em] text-gold">NÃO ENCONTROU SUA VAGA?</span>
            <h3 className="mt-4 text-3xl font-black text-white">Envie uma candidatura espontânea</h3>
            <p className="mt-3 text-zinc-400">Guardamos seu currículo e te chamamos quando surgir uma vaga ideal.</p>
            <a href="mailto:rh@funildenoticias.com.br"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gold px-10 py-4 text-sm font-black text-navy transition hover:-translate-y-0.5">
              Enviar currículo <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
