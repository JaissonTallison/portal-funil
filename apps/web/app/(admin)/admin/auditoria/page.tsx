"use client";

import { useEffect, useState, useCallback } from "react";
import { ShieldCheck } from "lucide-react";
import { API_URL } from "@/lib/api";

type AuditLog = {
  id: string;
  action: string;
  entity: string;
  entityId: string | null;
  details: unknown;
  ip: string | null;
  userEmail: string;
  createdAt: string;
  user: { id: string; name: string } | null;
};

const ACTION_COLOR: Record<string, string> = {
  LOGIN:         "bg-emerald-100 text-emerald-700",
  REGISTER:      "bg-blue-100 text-blue-700",
  CREATE:        "bg-sky-100 text-sky-700",
  UPDATE:        "bg-amber-100 text-amber-700",
  DELETE:        "bg-red-100 text-red-600",
  PUBLISH:       "bg-purple-100 text-purple-700",
  STATUS_CHANGE: "bg-yellow-100 text-yellow-700",
  LOGOUT:        "bg-slate-100 text-slate-500",
};

export default function AdminAuditoriaPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [entityFilter, setEntityFilter] = useState("");
  const [offset, setOffset] = useState(0);
  const LIMIT = 50;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: String(LIMIT), offset: String(offset) });
      if (entityFilter) params.set("entity", entityFilter);
      const res = await fetch(`${API_URL}/audit/logs?${params}`, { credentials: "include" });
      const data = await res.json();
      setLogs(data.items ?? []);
      setTotal(data.total ?? 0);
    } finally {
      setLoading(false);
    }
  }, [entityFilter, offset]);

  useEffect(() => { load(); }, [load]);

  const entities = ["Article", "Event", "Listing", "Report", "User", "Category"];

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-cobalt">Auditoria</h1>
          <p className="mt-1 text-sm text-slate-500">{total} registro(s)</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
          <ShieldCheck size={16} className="text-cobalt" />
          <span className="text-xs font-bold text-cobalt">Logs de atividade</span>
        </div>
      </div>

      {/* FILTERS */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => { setEntityFilter(""); setOffset(0); }}
          className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${!entityFilter ? "bg-cobalt text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-cobalt/20"}`}
        >
          Todos
        </button>
        {entities.map((e) => (
          <button
            key={e}
            onClick={() => { setEntityFilter(e); setOffset(0); }}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${entityFilter === e ? "bg-cobalt text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-cobalt/20"}`}
          >
            {e}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-cobalt border-t-transparent" />
          </div>
        ) : logs.length === 0 ? (
          <div className="py-16 text-center text-sm text-slate-400">Nenhum log encontrado.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Data</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Usuário</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Ação</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Entidade</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">ID</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((l) => (
                <tr key={l.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-3 text-xs text-slate-500">
                    {new Date(l.createdAt).toLocaleString("pt-BR")}
                  </td>
                  <td className="px-5 py-3">
                    <p className="text-sm font-semibold text-cobalt">{l.user?.name ?? "—"}</p>
                    <p className="text-xs text-slate-400">{l.userEmail}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${ACTION_COLOR[l.action] ?? "bg-slate-100 text-slate-600"}`}>
                      {l.action}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-600">{l.entity}</td>
                  <td className="max-w-[100px] px-5 py-3">
                    <span className="truncate font-mono text-xs text-slate-400">{l.entityId ?? "—"}</span>
                  </td>
                  <td className="px-5 py-3 font-mono text-xs text-slate-400">{l.ip ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINATION */}
      {total > LIMIT && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Exibindo {offset + 1}–{Math.min(offset + LIMIT, total)} de {total}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setOffset((o) => Math.max(0, o - LIMIT))}
              disabled={offset === 0}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-cobalt disabled:opacity-40"
            >
              Anterior
            </button>
            <button
              onClick={() => setOffset((o) => o + LIMIT)}
              disabled={offset + LIMIT >= total}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-cobalt disabled:opacity-40"
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
