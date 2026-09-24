"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, LogIn, Menu, Radio, Search, X, Crown } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/lib/constants";
import { useAuth } from "@/lib/auth-context";
import { LoginModal } from "@/components/auth/login-modal";
import { UserMenu } from "@/components/auth/user-menu";

const HOME_ICON = "🏠";

/**
 * Ícones por categoria, no estilo emoji colorido. "amazonas" usa a bandeira
 * oficial do estado (arquivo em /images), as demais usam um emoji.
 */
const ICON_MAP: Record<string, string> = {
  amazonas:      "/images/bandeira-amazonas.svg",
  politica:      "🏛️",
  futebol:       "⚽",
  policial:      "🛡️",
  economia:      "📈",
  tecnologia:    "💻",
  saude:         "❤️",
  mundo:         "🌍",
  musica:        "🎵",
  colunas:       "✒️",
  famosos:       "⭐",
  curiosidades:  "🔍",
  automotors:    "🚗",
  classificados: "📋",
};

export function Navbar() {
  const [open, setOpen]         = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [query, setQuery]       = useState("");
  const pathname  = usePathname();
  const router    = useRouter();
  const { user }  = useAuth();

  // Com o menu (ou a janela de login) aberto, a página de trás não rola e volta
  // exatamente para onde estava ao fechar.
  useEffect(() => {
    if (!open && !loginOpen) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = previous;
    };
  }, [open, loginOpen]);

  // Fecha o menu ao navegar para outra página ou apertar Esc.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/busca?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <>
      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="fixed left-0 top-0 z-50 w-full border-b border-slate-200 bg-white shadow-[0_2px_24px_rgba(15,23,42,0.06)]">

        {/* TOP BAR */}
        <div className="relative mx-auto flex h-[76px] max-w-[1920px] items-center justify-between px-4 sm:px-6 lg:h-[140px] lg:px-8">

          {/* HAMBURGER (mobile) */}
          <button
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 lg:mr-3 lg:hidden"
            aria-label="Menu"
          >
            <Menu size={20} className="text-navy" />
          </button>

          {/* LOGO */}
          <Link href="/" className="group hidden shrink-0 items-center gap-0 lg:flex">
            <Image
              src="/images/logo-transparent.png"
              alt="Funil de Notícias"
              width={300}
              height={300}
              priority
              className="h-[130px] w-auto object-contain transition duration-300 group-hover:scale-[1.02]"
            />
            {/* divider + text */}
            <div className="hidden items-center gap-0 lg:flex">
              <div className="mx-5 h-16 w-px bg-slate-200" />
              <div>
                <span className="block text-[10px] font-black uppercase tracking-[0.38em] text-gold-dark">
                  LIVE INTELLIGENCE
                </span>
                <p className="mt-1 text-[15px] font-black tracking-tight text-navy">
                  Funil de Notícias
                </p>
                <span className="mt-0.5 block text-[12px] text-slate-400">
                  Manaus&nbsp;•&nbsp;Tempo Real
                </span>
              </div>
            </div>
          </Link>

          {/* SEARCH */}
          <form
            onSubmit={handleSearch}
            className="mx-6 hidden w-full max-w-2xl xl:block"
          >
            <div className="flex h-[48px] items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 transition focus-within:border-gold/40 focus-within:bg-white focus-within:shadow-sm">
              <Search size={17} className="shrink-0 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar notícias, trânsito, alertas e cobertura ao vivo..."
                className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-slate-400"
              />
            </div>
          </form>

          {/* ACTION BUTTONS */}
          <div className="flex shrink-0 items-center gap-2.5">
            <Link
              href="/ao-vivo"
              className="hidden items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-xs font-black uppercase tracking-wide text-red-600 transition hover:bg-red-50 sm:flex"
            >
              <span className="flex items-center gap-0.5 text-[10px] font-black text-red-500">
                <span>((</span>
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-red-500 opacity-60" />
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                </span>
                <span>))</span>
              </span>
              AO VIVO
            </Link>

            <button
              className="relative hidden h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white transition hover:bg-slate-50 sm:flex"
              aria-label="Notificações"
            >
              <Bell size={17} className="text-slate-600" />
              <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-gold" />
            </button>

            {user ? (
              <UserMenu />
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="flex h-10 w-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-navy transition hover:bg-slate-50 sm:h-auto sm:w-auto sm:px-4 sm:py-2.5"
              >
                <LogIn size={15} />
                <span className="hidden sm:inline">Entrar</span>
              </button>
            )}

            <Link
              href="/assinar"
              className="flex h-10 w-10 items-center justify-center gap-2 rounded-lg bg-navy text-sm font-black text-white transition hover:bg-cobalt sm:h-auto sm:w-auto sm:px-4 sm:py-2.5"
            >
              <Crown size={14} />
              <span className="hidden sm:inline">Assinar Pro</span>
            </Link>

            {/* LOGO (celular e tablet) */}
            <Link href="/" aria-label="Funil de Notícias" className="ml-1 flex shrink-0 items-center lg:hidden">
              <Image
                src="/images/logo-transparent.png"
                alt="Funil de Notícias"
                width={300}
                height={300}
                priority
                className="h-[56px] w-auto object-contain sm:h-[60px]"
              />
            </Link>
          </div>
        </div>

        {/* CATEGORY NAV */}
        <div className="hidden border-t border-slate-100 lg:block">
          <div className="scrollbar-hide mx-auto flex w-full max-w-[1920px] items-stretch justify-between overflow-x-auto px-2">

            {/* "Todas" */}
            <NavItem
              href="/noticias"
              label="Todas"
              icon={HOME_ICON}
              active={pathname === "/noticias" || pathname === "/"}
            />

            {NAV_ITEMS.map((item) => {
              const href =
                item.slug === "colunas"       ? "/colunas" :
                item.slug === "classificados" ? "/classificados" :
                `/categoria/${item.slug}`;
              const active = pathname === href || pathname.startsWith(href + "/");
              const Icon = ICON_MAP[item.slug] ?? HOME_ICON;
              return (
                <NavItem
                  key={item.slug}
                  href={href}
                  label={item.label}
                  icon={Icon}
                  active={active}
                />
              );
            })}
          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER ──────────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[60] overscroll-contain bg-black/40 backdrop-blur-sm transition duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      >
        <div
          className={`absolute left-0 top-0 h-[100dvh] w-[min(300px,85vw)] overflow-y-auto overscroll-contain bg-white pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl transition duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo-transparent.png"
                alt="Funil de Notícias"
                width={120}
                height={120}
                className="h-[56px] w-auto object-contain"
              />
              <div>
                <p className="text-sm font-black text-navy">Funil de Notícias</p>
                <span className="text-xs text-slate-400">Manaus • Tempo Real</span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSearch} className="p-4">
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Search size={16} className="text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar notícias..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </form>

          <nav className="flex flex-col px-3 pb-5">
            <Link
              href="/ao-vivo"
              onClick={() => setOpen(false)}
              className="mb-1 flex items-center gap-2.5 rounded-lg bg-red-50 px-4 py-3 text-sm font-black uppercase tracking-wide text-red-600"
            >
              <Radio size={14} className="animate-pulse" />
              Ao vivo
            </Link>
            <MobileNavItem href="/noticias" label="Todas" icon={HOME_ICON} onClick={() => setOpen(false)} />
            {NAV_ITEMS.map((item) => {
              const href =
                item.slug === "colunas"       ? "/colunas" :
                item.slug === "classificados" ? "/classificados" :
                `/categoria/${item.slug}`;
              const Icon = ICON_MAP[item.slug] ?? HOME_ICON;
              return (
                <MobileNavItem key={item.slug} href={href} label={item.label} icon={Icon} onClick={() => setOpen(false)} />
              );
            })}
            <div className="mt-4 border-t border-slate-100 pt-4">
              <Link
                href="/assinar"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-4 py-3 text-sm font-black text-white"
              >
                <Crown size={15} />
                Assinar Pro
              </Link>
            </div>
          </nav>
        </div>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}

/** Ícone da categoria: imagem (ex.: bandeira) quando o valor é um caminho, emoji quando não é. */
function CategoryIcon({ icon, size }: { icon: string; size: number }) {
  if (icon.startsWith("/")) {
    // eslint-disable-next-line @next/next/no-img-element -- SVG local e decorativo, sem otimização do next/image
    return (
      <img
        src={icon}
        alt=""
        aria-hidden
        width={size}
        height={Math.round(size * 0.7)}
        className="rounded-[2px] border border-slate-200 object-cover"
      />
    );
  }
  return (
    <span className="leading-none" style={{ fontSize: size }} aria-hidden>
      {icon}
    </span>
  );
}

function NavItem({ href, label, icon, active }: {
  href: string; label: string; icon: string; active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative flex flex-1 flex-col items-center justify-center gap-1 whitespace-nowrap py-3 text-[12px] font-semibold transition ${
        active ? "text-navy" : "text-slate-500 hover:text-navy"
      }`}
    >
      <CategoryIcon icon={icon} size={18} />
      <span>{label}</span>
      {/* gold underline */}
      <span
        className={`absolute bottom-0 left-1/2 h-[3px] -translate-x-1/2 rounded-full bg-gold transition-all duration-200 ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}

function MobileNavItem({ href, label, icon, onClick }: {
  href: string; label: string; icon: string; onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
    >
      <CategoryIcon icon={icon} size={17} />
      {label}
    </Link>
  );
}
