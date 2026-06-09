"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, CheckCircle, SendHorizonal, Archive } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { apiDelete, API_URL } from "@/lib/api";

type Article = {
  id: string;
  title: string;
  slug: string;
  status: "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED";
  publishedAt: string | null;
  createdAt: string;
  views: number;
  author: { name: string };
  category: { name: string };
};

type AdminListResponse = { items: Article[]; total: number };

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  DRAFT:     { label: "Rascunho",    color: "bg-slate-100 text-slate-600" },
  REVIEW:    { label: "Em revisão",  color: "bg-yellow-100 text-yellow-700" },
  PUBLISHED: { label: "Publicado",   color: "bg-emerald-100 text-emerald-700" },
  ARCHIVED:  { label: "Arquivado",   color: "bg-red-100 text-red-600" },
};

export default function AdminArtigosPage() {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const qs = statusFilter ? `?status=${statusFilter}` : "";
      const res = await fetch(`${API_URL}/articles/admin/all${qs}`, { credentials: "include" });
      const data: AdminListResponse = await res.json();
      setArticles(data.items);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  }, [user, statusFilter]);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Excluir "${title}"?`)) return;
    setDeleting(id);
    try {
      await apiDelete(`/articles/${id}`);
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Erro ao excluir");
    } finally {
      setDeleting(null);
    }
  }

  async function changeStatus(id: string, newStatus: string) {
    setTransitioning(id);
    try {
      const res = await fetch(`${API_URL}/articles/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? "Erro ao alterar status");
      }
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Erro ao alterar status");
    } finally {
      setTransitioning(null);
    }
  }

  const isAdmin = user?.role === "ADMIN";
  const isEditor = user?.role === "EDITOR";
  const isJournalist = user?.role === "JOURNALIST";
  const canDelete = isAdmin || isEditor;

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-cobalt">Artigos</h1>
          <p className="mt-1 text-sm text-slate-500">{total} artigo(s) encontrado(s)</p>
        </div>
        <Link
          href="/admin/artigos/novo"
          className="flex items-center gap-2 rounded-2xl bg-cobalt px-5 py-2.5 text-sm font-bold text-white transition hover:bg-cobalt"
        >
          <Plus size={16} />
          Novo artigo
        </Link>
      </div>

      {/* FILTERS */}
      <div className="mb-6 flex flex-wrap gap-2">
        {[["", "Todos"], ["DRAFT", "Rascunho"], ["REVIEW", "Revisão"], ["PUBLISHED", "Publicado"], ["ARCHIVED", "Arquivado"]].map(([val, label]) => (
          <button
            key={val}
            onClick={() => setStatusFilter(val)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              statusFilter === val ? "bg-cobalt text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-cobalt/20"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-cobalt border-t-transparent" />
          </div>
        ) : articles.length === 0 ? (
          <div className="py-16 text-center text-sm text-slate-400">Nenhum artigo encontrado.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Título</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Categoria</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Autor</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Views</th>
                <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-500">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.map((a) => {
                const st = STATUS_LABEL[a.status] ?? STATUS_LABEL.DRAFT;
                const busy = transitioning === a.id || deleting === a.id;
                return (
                  <tr key={a.id} className="transition hover:bg-slate-50">
                    <td className="max-w-[220px] px-5 py-4">
                      <p className="truncate text-sm font-semibold text-cobalt">{a.title}</p>
                      <p className="text-xs text-slate-400">{a.slug}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{a.category.name}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{a.author.name}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${st.color}`}>{st.label}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">{a.views.toLocaleString("pt-BR")}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {/* Journalist: DRAFT → submit for review */}
                        {isJournalist && a.status === "DRAFT" && (
                          <button
                            onClick={() => changeStatus(a.id, "REVIEW")}
                            disabled={busy}
                            className="rounded-lg p-1.5 text-amber-500 transition hover:bg-amber-50 disabled:opacity-40"
                            title="Enviar para revisão"
                          >
                            <SendHorizonal size={15} />
                          </button>
                        )}
                        {/* Editor/Admin: REVIEW → publish */}
                        {(isEditor || isAdmin) && a.status === "REVIEW" && (
                          <button
                            onClick={() => changeStatus(a.id, "PUBLISHED")}
                            disabled={busy}
                            className="rounded-lg p-1.5 text-emerald-500 transition hover:bg-emerald-50 disabled:opacity-40"
                            title="Publicar"
                          >
                            <CheckCircle size={15} />
                          </button>
                        )}
                        {/* Editor/Admin: REVIEW → back to draft */}
                        {(isEditor || isAdmin) && a.status === "REVIEW" && (
                          <button
                            onClick={() => changeStatus(a.id, "DRAFT")}
                            disabled={busy}
                            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 disabled:opacity-40"
                            title="Devolver para rascunho"
                          >
                            <SendHorizonal size={15} className="rotate-180" />
                          </button>
                        )}
                        {/* Editor/Admin: PUBLISHED → archive */}
                        {(isEditor || isAdmin) && a.status === "PUBLISHED" && (
                          <button
                            onClick={() => changeStatus(a.id, "ARCHIVED")}
                            disabled={busy}
                            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 disabled:opacity-40"
                            title="Arquivar"
                          >
                            <Archive size={15} />
                          </button>
                        )}
                        {/* View published */}
                        {a.status === "PUBLISHED" && (
                          <a
                            href={`/noticias/${a.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-cobalt"
                            title="Ver publicado"
                          >
                            <Eye size={15} />
                          </a>
                        )}
                        <Link
                          href={`/admin/artigos/${a.id}/editar`}
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-cobalt"
                          title="Editar"
                        >
                          <Pencil size={15} />
                        </Link>
                        {canDelete && (
                          <button
                            onClick={() => handleDelete(a.id, a.title)}
                            disabled={busy}
                            className="rounded-lg p-1.5 text-red-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                            title="Excluir"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
