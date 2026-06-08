"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FileText, Calendar, Tag, LogOut, ExternalLink } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const ALLOWED_ROLES = ["ADMIN", "EDITOR", "JOURNALIST"];

const NAV = [
  { href: "/admin/artigos", label: "Artigos", icon: FileText },
  { href: "/admin/eventos", label: "Eventos", icon: Calendar },
  { href: "/admin/categorias", label: "Categorias", icon: Tag },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (!user || !ALLOWED_ROLES.includes(user.role)) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-navy border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* SIDEBAR */}
      <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-slate-200 bg-white">
        {/* LOGO */}
        <div className="flex h-16 items-center gap-3 border-b border-slate-100 px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-navy">
            <span className="text-xs font-black text-gold">PF</span>
          </div>
          <div>
            <p className="text-sm font-black text-navy">Portal Funil</p>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Editorial</p>
          </div>
        </div>

        {/* USER */}
        <div className="border-b border-slate-100 px-5 py-3">
          <p className="text-xs font-bold text-navy">{user.name}</p>
          <p className="text-[11px] text-slate-400">{user.role}</p>
        </div>

        {/* NAV */}
        <nav className="flex-1 space-y-1 p-3">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  active
                    ? "bg-navy text-white"
                    : "text-slate-600 hover:bg-slate-50 hover:text-navy"
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="space-y-1 border-t border-slate-100 p-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-navy"
          >
            <ExternalLink size={16} />
            Ver portal
          </a>
          <button
            onClick={async () => { await logout(); router.push("/login"); }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="ml-60 flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
