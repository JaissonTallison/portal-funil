"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText, Calendar, Users, ShoppingBag,
  TrendingUp, Clock, AlertTriangle, Activity,
} from "lucide-react";
import { API_URL } from "@/lib/api";

type Stats = {
  articles: { total: number; published: number; draft: number; review: number; todayPublished: number };
  events: { total: number; upcoming: number };
  users: { total: number };
  listings: { total: number; active: number; pending: number };
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

function PendingBadge({ count, label, href }: { count: number; label: string; href: string }) {
  if (count === 0) return null;
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 transition hover:bg-amber-100"
    >
      <div className="flex items-center gap-2">
        <AlertTriangle size={14} className="text-amber-600" />
        <span className="text-sm font-semibold text-amber-800">{label}</span>
      </div>
      <span className="rounded-full bg-amber-600 px-2.5 py-0.5 text-xs font-black text-white">
        {count}
      </span>
    </Link>
  );
}

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
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-cobalt border-t-transparent" />
      </div>
    );
  }

  if (!stats) return null;

  const pendingTotal = stats.articles.review + stats.listings.pending + stats.reports.pending;

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
      label: "Aguardando revisão",
      value: stats.articles.review,
      sub: `${stats.articles.draft} rascunho(s)`,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      href: "/admin/artigos?status=REVIEW",
      urgent: stats.articles.review > 0,
    },
    {
      label: "Denúncias pendentes",
      value: stats.reports.pending,
      sub: `${stats.reports.total} no total`,
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-50",
      href: "/admin/denuncias",
      urgent: stats.reports.pending > 0,
    },
    {
      label: "Classificados pendentes",
      value: stats.listings.pending,
      sub: `${stats.listings.active} ativos`,
      icon: ShoppingBag,
      color: "text-gold-dark",
      bg: "bg-gold/10",
      urgent: stats.listings.pending > 0,
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
  ];

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-cobalt">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Visão operacional em tempo real</p>
        </div>
        {pendingTotal > 0 && (
          <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2">
            <AlertTriangle size={14} className="text-amber-600" />
            <span className="text-sm font-bold text-amber-700">{pendingTotal} item(s) aguardam ação</span>
          </div>
        )}
      </div>

      {/* PENDÊNCIAS — barra de atenção */}
      {pendingTotal > 0 && (
        <div className="mb-6 grid gap-2 sm:grid-cols-3">
          <PendingBadge count={stats.articles.review}   label="Artigos aguardando revisão"  href="/admin/artigos?status=REVIEW" />
          <PendingBadge count={stats.listings.pending}  label="Classificados para aprovar"  href="/admin/denuncias" />
          <PendingBadge count={stats.reports.pending}   label="Denúncias em análise"        href="/admin/denuncias" />
        </div>
      )}

      {/* STAT CARDS */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {cards.map((c) => {
          const inner = (
            <div className={`rounded-[20px] border bg-white p-5 shadow-sm transition hover:shadow-md ${
              c.urgent ? "border-amber-300 bg-amber-50/50" : "border-slate-200"
            }`}>
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${c.bg}`}>
                <c.icon size={18} className={c.color} />
              </div>
              <div className={`text-3xl font-black ${c.urgent ? "text-amber-700" : "text-cobalt"}`}>
                {c.value.toLocaleString("pt-BR")}
              </div>
              <div className="mt-1 text-sm font-semibold text-cobalt">{c.label}</div>
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

      {/* ARTIGOS RECENTES */}
      <div className="rounded-[20px] border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-cobalt" />
            <h2 className="text-sm font-black text-cobalt">Artigos recentes</h2>
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
                  <p className="truncate text-sm font-semibold text-cobalt">{a.title}</p>
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

      {/* LINK SAÚDE */}
      <div className="mt-4 flex justify-end">
        <Link
          href="/admin/saude"
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-cobalt"
        >
          <Activity size={13} />
          Ver saúde operacional
        </Link>
      </div>
    </div>
  );
}
