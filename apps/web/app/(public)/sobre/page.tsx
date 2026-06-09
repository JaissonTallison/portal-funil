import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Award, Eye, Newspaper, Users } from "lucide-react";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { columnists } from "@/lib/data";

export const metadata: Metadata = {
  title: `Sobre | ${SITE_NAME}`,
  description: SITE_DESCRIPTION,
};

const stats = [
  { value: "2.4M", label: "Leitores/mês", icon: Eye },
  { value: "180+", label: "Matérias/semana", icon: Newspaper },
  { value: "28", label: "Jornalistas", icon: Users },
  { value: "12", label: "Prêmios de imprensa", icon: Award },
];

const values = [
  {
    title: "Imparcialidade",
    desc: "Reportamos os fatos com base em evidências verificadas, sem influências políticas ou comerciais.",
  },
  {
    title: "Rapidez",
    desc: "Nosso compromisso é entregar a informação mais rápido, sem sacrificar a qualidade e a precisão.",
  },
  {
    title: "Cobertura local",
    desc: "Somos de Manaus, para Manaus. Entendemos a cidade e sua gente como ninguém.",
  },
  {
    title: "Inovação",
    desc: "Usamos tecnologia de ponta para monitorar a cidade em tempo real e entregar dados precisos.",
  },
];

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-surface text-navy">
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy px-6 py-24">
        <div className="absolute left-[-80px] top-[-80px] h-[400px] w-[400px] rounded-full bg-gold/8 blur-[140px]" />
        <div className="absolute bottom-0 right-[-60px] h-[300px] w-[300px] rounded-full bg-[#1E3A8A]/15 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-[1440px]">
          <span className="text-xs font-black uppercase tracking-[0.35em] text-gold">
            PORTAL FUNIL
          </span>

          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-none tracking-[-0.05em] text-white lg:text-8xl">
            O portal de
            <br />
            <span className="text-gold">Manaus</span>
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-zinc-400">
            {SITE_DESCRIPTION}
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="group rounded-[32px] border border-black/5 bg-white p-8 shadow-[0_10px_50px_rgba(15,23,42,0.06)] transition hover:-translate-y-1"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10">
                  <Icon size={26} className="text-gold-dark" />
                </div>
                <h3 className="mt-8 text-5xl font-black tracking-[-0.05em] text-navy">
                  {value}
                </h3>
                <span className="mt-2 block text-slate-500">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="overflow-hidden rounded-[40px] bg-navy">
            <div className="grid lg:grid-cols-2">
              {/* TEXT */}
              <div className="relative p-12 lg:p-16">
                <div className="absolute left-[-60px] top-[-60px] h-[240px] w-[240px] rounded-full bg-gold/10 blur-[80px]" />
                <div className="relative z-10">
                  <span className="text-xs font-black uppercase tracking-[0.35em] text-gold">
                    NOSSA MISSÃO
                  </span>
                  <h2 className="mt-6 text-4xl font-black leading-tight tracking-[-0.04em] text-white">
                    Informação que transforma Manaus
                  </h2>
                  <p className="mt-6 text-lg leading-relaxed text-zinc-400">
                    Nascemos em Manaus com um propósito claro: levar informação
                    de qualidade, em tempo real, para cada esquina da cidade.
                    Acreditamos que cidadãos bem informados constroem cidades
                    melhores.
                  </p>
                  <p className="mt-5 leading-relaxed text-zinc-400">
                    Combinamos jornalismo investigativo com tecnologia de
                    monitoramento urbano para oferecer uma visão completa do que
                    acontece em Manaus — do trânsito ao palanque político, do
                    campo ao hospital.
                  </p>

                  <Link
                    href="/contato"
                    className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-gold px-8 py-4 text-sm font-black text-navy transition hover:-translate-y-0.5"
                  >
                    Fale com a redação
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>

              {/* IMAGE */}
              <div className="relative min-h-[360px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2070"
                  alt="Manaus"
                  fill
                  className="object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy to-transparent lg:bg-gradient-to-l" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12">
            <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">
              PRINCÍPIOS
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-navy">
              Nossos valores editoriais
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {values.map(({ title, desc }) => (
              <div
                key={title}
                className="rounded-[32px] border border-black/5 bg-white p-9 shadow-[0_10px_40px_rgba(15,23,42,0.05)]"
              >
                <h3 className="text-2xl font-black text-navy">{title}</h3>
                <p className="mt-4 leading-relaxed text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM / COLUMNISTS */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">
                TIME
              </span>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-navy">
                Nossos colunistas
              </h2>
            </div>
            <Link
              href="/colunas"
              className="hidden items-center gap-2 rounded-2xl border border-black/5 bg-white px-5 py-3 text-sm font-semibold text-navy shadow-[0_10px_40px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 sm:flex"
            >
              Ver todos
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {columnists.map((c) => (
              <Link
                key={c.id}
                href={`/colunas/${c.slug}`}
                className="group flex flex-col items-center gap-4 rounded-[28px] border border-black/5 bg-white p-7 text-center shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition hover:-translate-y-1"
              >
                <div className="relative h-20 w-20 overflow-hidden rounded-2xl">
                  <Image
                    src={c.avatar}
                    alt={c.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-black text-navy transition group-hover:text-cobalt">
                    {c.name}
                  </h4>
                  <span className="mt-1 block text-xs text-gold-dark">
                    {c.role}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
