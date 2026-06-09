import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Facebook, Instagram, Mail, MapPin, Phone, Radio, Twitter, Youtube } from "lucide-react";
import { NAV_ITEMS, SITE_DESCRIPTION } from "@/lib/constants";

const services = [
  { label: "Notícias ao vivo", href: "/ao-vivo" },
  { label: "Classificados", href: "/classificados" },
  { label: "Alerta de trânsito", href: "/categoria/transito" },
  { label: "Previsão do tempo", href: "/categoria/clima" },
  { label: "Mapa operacional", href: "/#mapa" },
  { label: "Boletins policiais", href: "/categoria/policial" },
  { label: "Colunas de opinião", href: "/colunas" },
];

const company = [
  { label: "Sobre o portal", href: "/sobre" },
  { label: "Política editorial", href: "/politica-editorial" },
  { label: "Fale conosco", href: "/contato" },
  { label: "Publicidade", href: "/publicidade" },
  { label: "Trabalhe conosco", href: "/trabalhe-conosco" },
  { label: "Assinar Pro", href: "/assinar" },
];

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* NEWSLETTER */}
      <div className="border-b border-white/5">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold/10">
                  <Mail size={18} className="text-gold" />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.35em] text-gold">
                  NEWSLETTER
                </span>
              </div>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.04em]">
                Receba as notícias no seu e-mail
              </h2>

              <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
                Cadastre-se gratuitamente e receba as principais notícias de
                Manaus direto na sua caixa de entrada, todos os dias às 7h.
              </p>
            </div>

            <div className="flex items-end">
              <div className="flex w-full gap-3 sm:w-auto">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail..."
                  className="h-[52px] w-full rounded-2xl border border-white/10 bg-white/5 px-5 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-gold/30 sm:w-[280px]"
                />
                <button className="flex h-[52px] shrink-0 items-center gap-2 rounded-2xl bg-gold px-6 text-sm font-black text-navy transition hover:-translate-y-0.5 hover:bg-gold-hover">
                  Cadastrar
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LIVE BANNER */}
      <div className="border-b border-white/5 bg-cobalt/40">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-2">
                <Radio size={14} className="animate-pulse text-red-400" />
                <span className="text-xs font-black uppercase tracking-widest text-red-400">
                  Ao vivo agora
                </span>
              </div>
              <span className="text-sm text-zinc-400">
                Cobertura operacional de Manaus em tempo real
              </span>
            </div>
            <Link
              href="/ao-vivo"
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Assistir <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* BRAND */}
          <div>
            <Image
              src="/images/logo-transparent.png"
              alt="Portal Funil"
              width={140}
              height={140}
              className="h-[60px] w-auto object-contain brightness-0 invert"
            />

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-zinc-400">
              {SITE_DESCRIPTION}
            </p>

            {/* CONTACT */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <MapPin size={15} className="shrink-0 text-gold" />
                Av. Djalma Batista, 1661 — Manaus, AM
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <Phone size={15} className="shrink-0 text-gold" />
                (92) 3000-0000
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <Mail size={15} className="shrink-0 text-gold" />
                redacao@funildenoticias.com.br
              </div>
            </div>

            {/* SOCIAL */}
            <div className="mt-8 flex gap-3">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Youtube, label: "YouTube" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-400 transition hover:border-gold/30 hover:bg-gold/10 hover:text-gold"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/assinar"
                className="inline-flex items-center gap-2 rounded-2xl bg-gold px-6 py-3 text-sm font-black uppercase tracking-wide text-navy transition hover:bg-gold-hover"
              >
                Assinar Pro
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          {/* EDITORIAS */}
          <div>
            <h3 className="mb-6 text-xs font-black uppercase tracking-[0.3em] text-gold">
              Editorias
            </h3>
            <ul className="space-y-3">
              {NAV_ITEMS.slice(0, 8).map((item) => {
                const href = item.slug === "colunas" ? "/colunas" : item.slug === "classificados" ? "/classificados" : `/categoria/${item.slug}`;
                return (
                  <li key={item.slug}>
                    <Link
                      href={href}
                      className="text-sm text-zinc-400 transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* SERVIÇOS */}
          <div>
            <h3 className="mb-6 text-xs font-black uppercase tracking-[0.3em] text-gold">
              Serviços
            </h3>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-400 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* EMPRESA */}
          <div>
            <h3 className="mb-6 text-xs font-black uppercase tracking-[0.3em] text-gold">
              Portal Funil
            </h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-400 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-6 text-xs text-zinc-500 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Todos os sistemas operacionais</span>
            <span className="mx-2">·</span>
            <span>© {new Date().getFullYear()} Portal Funil. Todos os direitos reservados.</span>
          </div>

          <div className="flex gap-5">
            {["Termos de uso", "Privacidade", "Cookies", "Publicidade"].map((label) => (
              <Link
                key={label}
                href="#"
                className="transition hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
