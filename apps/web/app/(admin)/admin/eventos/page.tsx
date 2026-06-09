"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { apiDelete, API_URL } from "@/lib/api";

type Event = {
  id: string;
  title: string;
  slug: string;
  category: string;
  startDate: string;
  venue: string;
  isFree: boolean;
  isHighlighted: boolean;
  isSponsored: boolean;
};

type EventsResponse = { items: Event[]; total: number };

export default function AdminEventosPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/events?limit=100`);
      const data: EventsResponse = await res.json();
      setEvents(data.items);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Excluir evento "${title}"?`)) return;
    setDeleting(id);
    try {
      await apiDelete(`/events/${id}`);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao excluir");
    } finally {
      setDeleting(null);
    }
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-cobalt">Eventos</h1>
          <p className="mt-1 text-sm text-slate-500">{total} evento(s) cadastrado(s)</p>
        </div>
        <Link
          href="/admin/eventos/novo"
          className="flex items-center gap-2 rounded-2xl bg-cobalt px-5 py-2.5 text-sm font-bold text-white transition hover:bg-cobalt"
        >
          <Plus size={16} />
          Novo evento
        </Link>
      </div>

      <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-cobalt border-t-transparent" />
          </div>
        ) : events.length === 0 ? (
          <div className="py-16 text-center text-sm text-slate-400">Nenhum evento cadastrado.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Título</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Categoria</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Data início</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Local</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Entrada</th>
                <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-500">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {events.map((ev) => (
                <tr key={ev.id} className="transition hover:bg-slate-50">
                  <td className="max-w-[240px] px-5 py-4">
                    <div className="flex items-center gap-2">
                      {ev.isHighlighted && <Star size={13} className="shrink-0 text-gold" fill="currentColor" />}
                      <div>
                        <p className="truncate text-sm font-semibold text-cobalt">{ev.title}</p>
                        <p className="text-xs text-slate-400">{ev.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600 capitalize">{ev.category}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{formatDate(ev.startDate)}</td>
                  <td className="max-w-[180px] px-5 py-4">
                    <p className="truncate text-sm text-slate-600">{ev.venue}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${ev.isFree ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                      {ev.isFree ? "Gratuito" : "Pago"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/eventos/${ev.id}/editar`}
                        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-cobalt"
                        title="Editar"
                      >
                        <Pencil size={15} />
                      </Link>
                      <button
                        onClick={() => handleDelete(ev.id, ev.title)}
                        disabled={deleting === ev.id}
                        className="rounded-lg p-1.5 text-red-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                        title="Excluir"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
