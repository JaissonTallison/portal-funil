import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, CheckCircle2, Scale, Shield, Users } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Política Editorial | ${SITE_NAME}`,
  description: "Princípios, valores e compromissos editoriais do Portal Funil.",
};

const principles = [
  {
    icon: Scale,
    title: "Imparcialidade",
    body: "Reportamos os fatos com base em evidências verificadas e fontes confiáveis. Não tomamos partido político ou ideológico. Cada matéria passa por revisão editorial antes de ser publicada.",
  },
  {
    icon: Shield,
    title: "Responsabilidade",
    body: "Assumimos a responsabilidade pelo que publicamos. Erros são corrigidos com transparência e agilidade. Mantemos um canal aberto para contestação de informações publicadas.",
  },
  {
    icon: BookOpen,
    title: "Verificação de fatos",
    body: "Toda informação é checada antes da publicação. Utilizamos ferramentas de fact-checking e consultamos ao menos duas fontes independentes para cada matéria.",
  },
  {
    icon: Users,
    title: "Diversidade de vozes",
    body: "Buscamos pluralidade em nossas coberturas, ouvindo diferentes perspectivas da sociedade manauara — das comunidades periféricas às instâncias de poder.",
  },
];

const corrections = [
  "Erros factuais são corrigidos assim que identificados, com nota ao final da matéria",
  "Informações desatualizadas recebem marcação de revisão com a data de atualização",
  "Titulares de direito de resposta têm espaço garantido na mesma plataforma e alcance",
  "Notícias sobre pessoas falsamente acusadas são revisadas ou retiradas do ar",
];

export default function PoliticaEditorialPage() {
  return (
    <main className="min-h-screen bg-surface text-navy">
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy px-6 py-20">
        <div className="absolute left-[-80px] top-[-80px] h-[300px] w-[300px] rounded-full bg-gold/8 blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <span className="text-xs font-black uppercase tracking-[0.35em] text-gold">PORTAL FUNIL</span>
          <h1 className="mt-6 text-5xl font-black tracking-[-0.05em] text-white lg:text-7xl">
            Política <br /><span className="text-gold">editorial</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            Os princípios que guiam nosso jornalismo. Transparência, responsabilidade
            e compromisso com a verdade são inegociáveis no Portal Funil.
          </p>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">FUNDAMENTOS</span>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em]">Nossos princípios</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {principles.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-[32px] border border-black/5 bg-white p-9 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10">
                  <Icon size={22} className="text-gold-dark" />
                </div>
                <h3 className="mt-6 text-2xl font-black">{title}</h3>
                <p className="mt-4 leading-relaxed text-slate-500">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORRECTIONS */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[40px] bg-navy p-12">
            <div className="relative z-10 grid gap-12 lg:grid-cols-2">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.35em] text-gold">TRANSPARÊNCIA</span>
                <h2 className="mt-6 text-4xl font-black leading-tight text-white">
                  Política de erros e correções
                </h2>
                <p className="mt-5 leading-relaxed text-zinc-400">
                  O Portal Funil assume seus erros com responsabilidade. Nosso compromisso
                  com a verdade exige que correções sejam feitas de forma rápida, clara e transparente.
                </p>
                <Link
                  href="/contato"
                  className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gold px-8 py-4 text-sm font-black text-navy transition hover:-translate-y-0.5"
                >
                  Contestar uma informação
                  <ArrowUpRight size={16} />
                </Link>
              </div>
              <div className="space-y-4">
                {corrections.map((item) => (
                  <div key={item} className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/5 px-5 py-4">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-gold" />
                    <p className="text-sm leading-relaxed text-zinc-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black tracking-[-0.04em]">Dúvidas sobre nossa linha editorial?</h2>
          <p className="mt-4 text-slate-500">Entre em contato com nossa ouvidoria.</p>
          <Link
            href="/contato"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-navy px-8 py-4 text-sm font-black text-white transition hover:bg-cobalt"
          >
            Falar com a ouvidoria
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
