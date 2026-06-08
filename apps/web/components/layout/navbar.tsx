"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, LogIn, Menu, Radio, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/lib/constants";
import { useAuth } from "@/lib/auth-context";
import { LoginModal } from "@/components/auth/login-modal";
import { UserMenu } from "@/components/auth/user-menu";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full px-3 py-3">
        <div
          className={`overflow-hidden rounded-[28px] border transition-all duration-300 ${
            scrolled
              ? "border-slate-200 bg-white shadow-[0_12px_60px_rgba(15,23,42,0.14)]"
              : "border-white/50 bg-white/85 shadow-[0_8px_40px_rgba(15,23,42,0.08)] backdrop-blur-2xl"
          }`}
        >
          {/* TOPBAR */}
          <div className="flex h-[148px] items-center justify-between px-4 lg:px-6">
            {/* LEFT */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpen(true)}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white lg:hidden"
              >
                <Menu size={20} className="text-navy" />
              </button>

              <Link href="/" className="group relative flex items-center gap-3">
                <div className="absolute left-[80px] top-1/2 h-[110px] w-[110px] -translate-y-1/2 rounded-full bg-gold/30 blur-[60px]" />
                <Image
                  src="/images/logo-transparent.png"
                  alt="Portal Funil"
                  width={300}
                  height={300}
                  priority
                  className="relative h-[140px] w-auto object-contain transition duration-300 group-hover:scale-[1.02]"
                />
                <div className="hidden lg:block">
                  <span className="block text-[10px] font-black uppercase tracking-[0.38em] text-gold-dark">
                    LIVE INTELLIGENCE
                  </span>
                  <h2 className="mt-0.5 text-[14px] font-black tracking-tight text-navy">
                    Funil de Notícias
                  </h2>
                  <span className="mt-0.5 block text-xs text-slate-500">
                    Manaus • Tempo Real
                  </span>
                </div>
              </Link>
            </div>

            {/* SEARCH */}
            <div className="hidden w-full max-w-2xl px-8 xl:block">
              <div
                className={`flex h-[52px] items-center gap-3 rounded-2xl border px-5 shadow-inner transition focus-within:border-gold/40 ${
                  scrolled
                    ? "border-slate-200 bg-slate-50"
                    : "border-slate-200 bg-[#F8FAFC]/80"
                }`}
              >
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar notícias, trânsito, alertas e cobertura ao vivo..."
                  className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              <Link
                href="/ao-vivo"
                className="hidden items-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-2.5 text-xs font-black uppercase tracking-wide text-red-600 transition hover:bg-red-100 sm:flex"
              >
                <Radio size={14} className="animate-pulse" />
                Ao vivo
              </Link>

              <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white transition hover:bg-slate-50">
                <Bell size={18} className="text-slate-700" />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-gold" />
              </button>

              {user ? (
                <UserMenu />
              ) : (
                <button
                  onClick={() => setLoginOpen(true)}
                  className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-slate-50"
                >
                  <LogIn size={15} />
                  <span className="hidden sm:inline">Entrar</span>
                </button>
              )}

              <Link
                href="/assinar"
                className="rounded-2xl bg-navy px-5 py-3 text-sm font-black text-white transition hover:bg-cobalt"
              >
                Assinar Pro
              </Link>
            </div>
          </div>

          {/* MENU */}
          <div
            className={`hidden border-t lg:block ${
              scrolled ? "border-slate-200" : "border-black/5"
            }`}
          >
          <div className="scrollbar-hide flex items-center justify-center gap-1 overflow-x-auto px-5 py-3">
              <Link
                href="/noticias"
                className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  pathname === "/noticias"
                    ? "bg-navy text-white"
                    : "text-navy hover:bg-slate-100"
                }`}
              >
                Todas
              </Link>

              {NAV_ITEMS.map((item) => {
                const href = item.slug === "colunas" ? "/colunas" : item.slug === "classificados" ? "/classificados" : `/categoria/${item.slug}`;
                const active = pathname === href;
                return (
                  <Link
                    key={item.slug}
                    href={href}
                    className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-navy text-white"
                        : "text-navy hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      >
        <div
          className={`absolute left-0 top-0 h-full w-[300px] bg-white shadow-2xl transition duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo-transparent.png"
                alt="Portal Funil"
                width={140}
                height={140}
                className="h-[64px] w-auto object-contain"
              />
              <div>
                <h3 className="text-sm font-black text-navy">Portal Funil</h3>
                <span className="text-xs text-slate-500">Tempo Real</span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-5">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Search size={16} className="text-slate-400" />
              <input
                type="text"
                placeholder="Buscar notícias..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col px-3 pb-5">
            <Link
              href="/ao-vivo"
              onClick={() => setOpen(false)}
              className="mb-2 flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-black uppercase tracking-wide text-red-600"
            >
              <Radio size={14} className="animate-pulse" />
              Ao vivo
            </Link>
            <Link
              href="/noticias"
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Todas as notícias
            </Link>
            {NAV_ITEMS.map((item) => {
              const href = item.slug === "colunas" ? "/colunas" : item.slug === "classificados" ? "/classificados" : `/categoria/${item.slug}`;
              return (
                <Link
                  key={item.slug}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-4 border-t border-slate-100 pt-4">
              <Link
                href="/assinar"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-navy px-4 py-3 text-sm font-black uppercase tracking-wide text-white"
              >
                Assinar Pro
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* LOGIN MODAL */}
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
