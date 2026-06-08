"use client";

import { useEffect, useState } from "react";
import { RefreshCw, CheckCircle2, XCircle, AlertCircle, Activity } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") ?? "http://localhost:3002";

type HealthData = {
  status: "ok" | "degraded";
  version: string;
  uptime: number;
  timestamp: string;
  services: {
    database: "up" | "down";
    redis: "up" | "down" | "not_configured";
    api: "up" | "down";
  };
};

function ServiceBadge({ status }: { status: string }) {
  if (status === "up")
    return (
      <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
        <CheckCircle2 size={12} /> Operacional
      </span>
    );
  if (status === "not_configured")
    return (
      <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
        <AlertCircle size={12} /> Não configurado
      </span>
    );
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
      <XCircle size={12} /> Fora do ar
    </span>
  );
}

function formatUptime(seconds: number): string {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  return `${m}m ${s}s`;
}

export default function AdminSaudePage() {
  const [data, setData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  async function check() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`${API_BASE}/api/v1/health`, { cache: "no-store" });
      if (!res.ok) throw new Error();
      const json: HealthData = await res.json();
      setData(json);
      setLastChecked(new Date());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { check(); }, []);

  const overall = error ? "down" : data?.status ?? "unknown";

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-navy">Saúde Operacional</h1>
          <p className="mt-1 text-sm text-slate-500">
            {lastChecked ? `Verificado às ${lastChecked.toLocaleTimeString("pt-BR")}` : "Verificando..."}
          </p>
        </div>
        <button
          onClick={check}
          disabled={loading}
          className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Atualizar
        </button>
      </div>

      {/* STATUS GERAL */}
      <div className={`mb-6 rounded-[20px] p-5 ${overall === "ok" ? "bg-emerald-50 border border-emerald-200" : "bg-red-50 border border-red-200"}`}>
        <div className="flex items-center gap-3">
          {overall === "ok" ? (
            <CheckCircle2 size={22} className="text-emerald-600" />
          ) : (
            <XCircle size={22} className="text-red-600" />
          )}
          <div>
            <p className={`text-base font-black ${overall === "ok" ? "text-emerald-800" : "text-red-800"}`}>
              {overall === "ok" ? "Todos os sistemas operacionais" : "Sistema com falhas"}
            </p>
            {data && (
              <p className="text-xs text-slate-500 mt-0.5">
                Versão {data.version} · Uptime {formatUptime(data.uptime)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* SERVIÇOS */}
      {data && (
        <div className="grid gap-4 sm:grid-cols-3">
          {(Object.entries(data.services) as [string, string][]).map(([name, status]) => (
            <div key={name} className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50">
                <Activity size={18} className="text-navy" />
              </div>
              <p className="text-sm font-black capitalize text-navy">
                {name === "database" ? "Banco de Dados" : name === "redis" ? "Redis (Cache)" : "API"}
              </p>
              <div className="mt-2">
                <ServiceBadge status={status} />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-[20px] border border-red-200 bg-red-50 p-6 text-center">
          <XCircle size={32} className="mx-auto mb-2 text-red-500" />
          <p className="text-sm font-semibold text-red-800">Não foi possível conectar à API</p>
          <p className="mt-1 text-xs text-red-600">Verifique se o servidor está em execução em {API_BASE}</p>
        </div>
      )}

      {/* DETALHES TÉCNICOS */}
      {data && (
        <div className="mt-6 rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-black text-navy">Detalhes técnicos</h2>
          <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            {[
              { label: "Versão", value: data.version },
              { label: "Uptime", value: formatUptime(data.uptime) },
              { label: "Última verificação", value: new Date(data.timestamp).toLocaleTimeString("pt-BR") },
              { label: "Status geral", value: data.status === "ok" ? "Operacional" : "Degradado" },
            ].map(({ label, value }) => (
              <div key={label}>
                <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</dt>
                <dd className="mt-0.5 font-semibold text-navy">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
