import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Contato | ${SITE_NAME}`,
  description: "Entre em contato com a redação do Portal Funil.",
};

const contacts = [
  {
    icon: Mail,
    label: "Redação",
    value: "redacao@funildenoticias.com.br",
    desc: "Para envio de pautas e releases",
  },
  {
    icon: Mail,
    label: "Publicidade",
    value: "publicidade@funildenoticias.com.br",
    desc: "Anúncios, patrocínios e parcerias",
  },
  {
    icon: Phone,
    label: "Telefone",
    value: "(92) 3000-0000",
    desc: "Seg–Sex, 8h às 18h",
  },
  {
    icon: MapPin,
    label: "Endereço",
    value: "Av. Djalma Batista, 1661",
    desc: "Manaus, AM — CEP 69050-010",
  },
];

const departments = [
  { label: "Jornalismo", email: "redacao@funildenoticias.com.br" },
  { label: "Publicidade", email: "publicidade@funildenoticias.com.br" },
  { label: "Ouvidoria", email: "ouvidoria@funildenoticias.com.br" },
  { label: "Suporte Pro", email: "pro@funildenoticias.com.br" },
  { label: "Colunistas", email: "colunas@funildenoticias.com.br" },
  { label: "Imprensa", email: "imprensa@funildenoticias.com.br" },
];

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-surface text-navy">
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy px-6 py-20">
        <div className="absolute left-[-80px] top-[-80px] h-[300px] w-[300px] rounded-full bg-gold/8 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1440px]">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10">
              <MessageCircle size={22} className="text-gold" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.35em] text-gold">
              PORTAL FUNIL
            </span>
          </div>

          <h1 className="mt-6 text-5xl font-black tracking-[-0.05em] text-white lg:text-7xl">
            Fale conosco
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-400">
            Nossa redação está de prontidão 24h por dia. Entre em contato para
            enviar pautas, corrigir informações ou fazer parcerias.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
            {/* FORM */}
            <div className="overflow-hidden rounded-[40px] border border-black/5 bg-white p-10 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <h2 className="text-3xl font-black tracking-[-0.04em] text-navy">
                Envie uma mensagem
              </h2>
              <p className="mt-3 text-slate-500">
                Respondemos em até 24 horas úteis.
              </p>

              <form className="mt-10 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-navy">
                      Nome
                    </label>
                    <input
                      type="text"
                      placeholder="Seu nome completo"
                      className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm text-navy outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-navy">
                      E-mail
                    </label>
                    <input
                      type="email"
                      placeholder="seu@email.com.br"
                      className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm text-navy outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-navy">
                    Departamento
                  </label>
                  <select className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm text-navy outline-none focus:border-gold/50 focus:bg-white">
                    <option value="">Selecione um departamento</option>
                    {departments.map((d) => (
                      <option key={d.email} value={d.email}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-navy">
                    Assunto
                  </label>
                  <input
                    type="text"
                    placeholder="Sobre o que você quer falar?"
                    className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm text-navy outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-navy">
                    Mensagem
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Descreva sua mensagem com detalhes..."
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-navy outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-navy py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-cobalt"
                >
                  Enviar mensagem
                  <ArrowUpRight size={16} />
                </button>
              </form>
            </div>

            {/* SIDEBAR */}
            <div className="space-y-5">
              {/* CONTACT INFO */}
              <div className="rounded-[36px] border border-black/5 bg-white p-8 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
                <h3 className="text-xl font-black text-navy">
                  Informações de contato
                </h3>

                <div className="mt-8 space-y-6">
                  {contacts.map(({ icon: Icon, label, value, desc }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold/10">
                        <Icon size={18} className="text-gold-dark" />
                      </div>
                      <div>
                        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                          {label}
                        </span>
                        <p className="mt-0.5 font-semibold text-navy">
                          {value}
                        </p>
                        <p className="mt-0.5 text-sm text-slate-400">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SOCIAL */}
              <div className="rounded-[36px] border border-black/5 bg-white p-8 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
                <h3 className="text-xl font-black text-navy">
                  Redes sociais
                </h3>

                <div className="mt-6 space-y-3">
                  {[
                    { Icon: Instagram, label: "Instagram", handle: "@portalfunil" },
                    { Icon: Twitter, label: "Twitter / X", handle: "@portalfunil" },
                    { Icon: Facebook, label: "Facebook", handle: "Portal Funil" },
                    { Icon: Youtube, label: "YouTube", handle: "Portal Funil Oficial" },
                  ].map(({ Icon, label, handle }) => (
                    <a
                      key={label}
                      href="#"
                      className="group flex items-center gap-4 rounded-2xl border border-black/5 bg-slate-50 p-4 transition hover:bg-slate-100"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
                        <Icon size={16} />
                      </div>
                      <div>
                        <span className="text-sm font-black text-navy">
                          {label}
                        </span>
                        <span className="block text-xs text-slate-400">
                          {handle}
                        </span>
                      </div>
                      <ArrowUpRight size={14} className="ml-auto text-slate-300 transition group-hover:text-navy" />
                    </a>
                  ))}
                </div>
              </div>

              {/* PRO CTA */}
              <div className="relative overflow-hidden rounded-[36px] bg-navy p-8 text-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-[200px] w-[200px] rounded-full bg-gold/8 blur-[60px]" />
                </div>
                <div className="relative z-10">
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-gold">
                    SUPORTE PRO
                  </span>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                    Assinantes Pro têm atendimento prioritário via chat exclusivo.
                  </p>
                  <Link
                    href="/assinar"
                    className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-gold px-6 py-3 text-sm font-black text-navy transition hover:-translate-y-0.5"
                  >
                    Assinar Pro
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
