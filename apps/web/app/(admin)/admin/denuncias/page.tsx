"use client";

import { useEffect, useState, useCallback } from "react";
import { AlertTriangle, ChevronDown, X } from "lucide-react";
import { API_URL } from "@/lib/api";

type Report = {
  id: string;
  protocol: string;
  type: string;
  status: string;
  name: string | null;
  phone: string | null;
  location: string | null;
  description: string;
  notes: string | null;
  createdAt: string;
  assignedTo: { id: string; name: string; email: string } | null;
};

type AdminListResponse = { items: Report[]; total: number };

const TYPE_LABEL: Record<string, string> = {
  POLICIAL: "Policial",
  URBANO:   "Urbano",
  PAUTA:    "Pauta",
  MIDIA:    "Mídia",
  ANONIMA:  "Anônima",
};

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  RECEIVED:     { label: "Recebida",       color: "bg-blue-100 text-blue-700" },
  UNDER_REVIEW: { label: "Em apuração",    color: "bg-yellow-100 text-yellow-700" },
  VERIFIED:     { label: "Verificada",     color: "bg-purple-100 text-purple-700" },
  PUBLISHED:    { label: "Publicada",      color: "bg-emerald-100 text-emerald-700" },
  CLOSED:       { label: "Encerrada",      color: "bg-slate-100 text-slate-600" },
  REJECTED:     { label: "Rejeitada",      color: "bg-red-100 text-red-600" },
  REVIEW:       { label: "Em revisão",     color: "bg-yellow-100 text-yellow-700" },
  RESOLVED:     { label: "Resolvida",      color: "bg-emerald-100 text-emerald-700" },
};

const NEXT_STATUSES: Record<string, string[]> = {
  RECEIVED:     ["UNDER_REVIEW", "REJECTED"],
  UNDER_REVIEW: ["VERIFIED", "REJECTED", "RECEIVED"],
  VERIFIED:     ["PUBLISHED", "CLOSED"],
  PUBLISHED:    ["CLOSED"],
  CLOSED:       ["RECEIVED"],
  REJECTED:     ["RECEIVED"],
  REVIEW:       ["UNDER_REVIEW", "CLOSED"],
  RESOLVED:     ["CLOSED"],
};

type DetailState = { open: boolean; report: Report | null; notes: string; nextStatus: string };

export default function AdminDenunciasPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [saving, setSaving] = useState(false);
  const [detail, setDetail] = useState<DetailState>({ open: false, report: null, notes: "", nextStatus: "" });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      if (typeFilter) params.set("type", typeFilter);
      const res = await fetch(`${API_URL}/reports/admin?${params}`, { credentials: "include" });
      const data: AdminListResponse = await res.json();
      setReports(data.items ?? []);
      setTotal(data.total ?? 0);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, typeFilter]);

  useEffect(() => { load(); }, [load]);

  function openDetail(r: Report) {
    const nexts = NEXT_STATUSES[r.status] ?? [];
    setDetail({ open: true, report: r, notes: r.notes ?? "", nextStatus: nexts[0] ?? r.status });
  }

  async function saveStatus() {
    if (!detail.report) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/reports/admin/${detail.report.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: detail.nextStatus, notes: detail.notes }),
      });
      if (!res.ok) throw new Error("Erro ao salvar");
      setDetail((d) => ({ ...d, open: false, report: null }));
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Erro");
    } finally {
      setSaving(false);
    }
  }

  const allStatuses = ["RECEIVED", "UNDER_REVIEW", "VERIFIED", "PUBLISHED", "CLOSED", "REJECTED"];

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-navy">Denúncias</h1>
          <p className="mt-1 text-sm text-slate-500">{total} denúncia(s)</p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setStatusFilter("")}
          className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${!statusFilter ? "bg-navy text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-navy/20"}`}
        >
          Todos
        </button>
        {allStatuses.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${statusFilter === s ? "bg-navy text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-navy/20"}`}
          >
            {STATUS_CONFIG[s]?.label ?? s}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setTypeFilter("")}
          className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${!typeFilter ? "bg-slate-700 text-white" : "border border-slate-200 bg-white text-slate-600"}`}
        >
          Tipo: Todos
        </button>
        {Object.entries(TYPE_LABEL).map(([k, v]) => (
          <button
            key={k}
            onClick={() => setTypeFilter(k)}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${typeFilter === k ? "bg-slate-700 text-white" : "border border-slate-200 bg-white text-slate-600"}`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-navy border-t-transparent" />
          </div>
        ) : reports.length === 0 ? (
          <div className="py-16 text-center text-sm text-slate-400">Nenhuma denúncia encontrada.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Protocolo</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Tipo</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Recebida</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Denunciante</th>
                <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-500">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.map((r) => {
                const sc = STATUS_CONFIG[r.status] ?? STATUS_CONFIG.RECEIVED;
                return (
                  <tr key={r.id} className="transition hover:bg-slate-50">
                    <td className="px-5 py-4 font-mono text-sm font-bold text-navy">{r.protocol}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{TYPE_LABEL[r.type] ?? r.type}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${sc.color}`}>{sc.label}</span>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-500">
                      {new Date(r.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {r.type === "ANONIMA" ? (
                        <span className="text-xs italic text-slate-400">Anônimo</span>
                      ) : (
                        r.name ?? "—"
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => openDetail(r)}
                        className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-navy transition hover:bg-navy hover:text-white"
                      >
                        Gerenciar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* DETAIL MODAL */}
      {detail.open && detail.report && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-[24px] bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <AlertTriangle size={16} className="text-amber-500" />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">Denúncia</span>
                </div>
                <h2 className="mt-1 text-lg font-black text-navy">{detail.report.protocol}</h2>
                <span className={`mt-1 inline-block rounded-lg px-2.5 py-0.5 text-xs font-bold ${STATUS_CONFIG[detail.report.status]?.color}`}>
                  {STATUS_CONFIG[detail.report.status]?.label ?? detail.report.status}
                </span>
              </div>
              <button
                onClick={() => setDetail((d) => ({ ...d, open: false }))}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mb-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-semibold text-navy">Descrição</p>
              <p className="mt-1 leading-relaxed">{detail.report.description}</p>
              {detail.report.location && (
                <p className="mt-2 text-xs text-slate-500">
                  <span className="font-semibold">Local:</span> {detail.report.location}
                </p>
              )}
              {detail.report.name && (
                <p className="mt-1 text-xs text-slate-500">
                  <span className="font-semibold">Denunciante:</span> {detail.report.name}
                  {detail.report.phone && ` — ${detail.report.phone}`}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="mb-1 block text-xs font-bold text-slate-600">Notas internas</label>
              <textarea
                value={detail.notes}
                onChange={(e) => setDetail((d) => ({ ...d, notes: e.target.value }))}
                rows={3}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-navy outline-none focus:border-cobalt"
                placeholder="Observações sobre a apuração..."
              />
            </div>

            <div className="mb-6">
              <label className="mb-1 block text-xs font-bold text-slate-600">Alterar status para</label>
              <div className="relative">
                <select
                  value={detail.nextStatus}
                  onChange={(e) => setDetail((d) => ({ ...d, nextStatus: e.target.value }))}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-cobalt"
                >
                  {(NEXT_STATUSES[detail.report.status] ?? []).map((s) => (
                    <option key={s} value={s}>{STATUS_CONFIG[s]?.label ?? s}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setDetail((d) => ({ ...d, open: false }))}
                className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                onClick={saveStatus}
                disabled={saving}
                className="flex-1 rounded-xl bg-navy py-2.5 text-sm font-bold text-white transition hover:bg-cobalt disabled:opacity-50"
              >
                {saving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
