"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText, Calendar, Users, ShoppingBag,
  TrendingUp, Clock, CheckCircle, AlertTriangle, MessageSquare,
} from "lucide-react";
import { API_URL } from "@/lib/api";

type Stats = {
  articles: { total: number; published: number; draft: number; review: number; todayPublished: number };
  events: { total: number; upcoming: number };
  users: { total: number };
  listings: { total: number; active: number };
  reports: { total: number; pending: number };
  recentArticles: Array<{
    id: string; title: string; slug: string; status: string;
    views: number; createdAt: string;
    author: { name: string };
    category: { name: string };
  }>;
};

const STATUS_COLOR: Record<string, string> = {
  PUBLISHED: "bg-emerald-100 text-emerald-700",
  DRAFT:     "bg-slate-100 text-slate-500",
  REVIEW:    "bg-yellow-100 text-yellow-700",
  ARCHIVED:  "bg-red-100 text-red-600",
};
const STATUS_LABEL: Record<string, string> = {
  PUBLISHED: "Publicado", DRAFT: "Rascunho", REVIEW: "Revisão", ARCHIVED: "Arquivado",
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/stats`, { credentials: "include" })
      .then((r) => r.json())
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-16">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-navy border-t-transparent" />
      </div>
    );
  }

  if (!stats) return null;

  const cards = [
    {
      label: "Artigos publicados",
      value: stats.articles.published,
      sub: `${stats.articles.todayPublished} publicado(s) hoje`,
      icon: FileText,
      color: "text-cobalt",
      bg: "bg-cobalt/8",
    },
    {
      label: "Em revisão",
      value: stats.articles.review,
      sub: `${stats.articles.draft} rascunhos`,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Denúncias pendentes",
      value: stats.reports.pending,
      sub: `${stats.reports.total} no total`,
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-50",
      href: "/admin/denuncias",
    },
    {
      label: "Eventos futuros",
      value: stats.events.upcoming,
      sub: `${stats.events.total} cadastrados`,
      icon: Calendar,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Usuários",
      value: stats.users.total,
      sub: "contas ativas",
      icon: Users,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Classificados ativos",
      value: stats.listings.active,
      sub: `${stats.listings.total} cadastrados`,
      icon: ShoppingBag,
      color: "text-gold-dark",
      bg: "bg-gold/10",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-navy">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Visão operacional em tempo real</p>
      </div>

      {/* STAT CARDS */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {cards.map((c) => {
          const inner = (
            <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${c.bg}`}>
                <c.icon size={18} className={c.color} />
              </div>
              <div className="text-3xl font-black text-navy">{c.value.toLocaleString("pt-BR")}</div>
              <div className="mt-1 text-sm font-semibold text-navy">{c.label}</div>
              <div className="mt-0.5 text-xs text-slate-400">{c.sub}</div>
            </div>
          );
          return c.href ? (
            <Link key={c.label} href={c.href}>{inner}</Link>
          ) : (
            <div key={c.label}>{inner}</div>
          );
        })}
      </div>

      {/* RECENT ARTICLES */}
      <div className="rounded-[20px] border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-navy" />
            <h2 className="text-sm font-black text-navy">Artigos recentes</h2>
          </div>
          <Link href="/admin/artigos" className="text-xs font-bold text-cobalt hover:underline">
            Ver todos
          </Link>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Título</th>
              <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Categoria</th>
              <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Autor</th>
              <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
              <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-500">Views</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {stats.recentArticles.map((a) => (
              <tr key={a.id} className="transition hover:bg-slate-50">
                <td className="max-w-[260px] px-5 py-3">
                  <p className="truncate text-sm font-semibold text-navy">{a.title}</p>
                </td>
                <td className="px-5 py-3 text-sm text-slate-500">{a.category.name}</td>
                <td className="px-5 py-3 text-sm text-slate-500">{a.author.name}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${STATUS_COLOR[a.status] ?? ""}`}>
                    {STATUS_LABEL[a.status] ?? a.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-right text-sm text-slate-500">{a.views.toLocaleString("pt-BR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
