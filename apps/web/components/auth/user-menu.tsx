"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut, Settings, ShoppingBag } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 transition hover:bg-slate-50"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-navy text-xs font-black text-gold">
          {initials}
        </div>
        <span className="hidden text-sm font-semibold text-navy lg:block">
          {user.name.split(" ")[0]}
        </span>
        <ChevronDown size={14} className={`text-slate-400 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[220px] overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.15)]">
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="text-sm font-bold text-navy">{user.name}</p>
            <p className="text-xs text-slate-400">{user.email}</p>
          </div>

          <div className="py-2">
            <Link
              href="/classificados/meus-anuncios"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50"
            >
              <ShoppingBag size={15} className="text-slate-400" />
              Meus anúncios
            </Link>
            <button
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50"
            >
              <Settings size={15} className="text-slate-400" />
              Configurações
            </button>
          </div>

          <div className="border-t border-slate-100 py-2">
            <button
              onClick={() => { logout(); setOpen(false); }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 transition hover:bg-red-50"
            >
              <LogOut size={15} />
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
