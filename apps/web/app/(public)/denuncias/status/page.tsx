"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ClipboardCheck, Search, XCircle } from "lucide-react";
import { API_URL } from "@/lib/api";

type ReportStatus = "RECEIVED" | "REVIEW" | "PUBLISHED" | "RESOLVED";

const STATUS_LABELS: Record<ReportStatus, string> = {
  RECEIVED: "Recebida",
  REVIEW: "Em apuração",
  PUBLISHED: "Publicada",
  RESOLVED: "Resolvida",
};

const STAGES: { key: ReportStatus; label: string; desc: string }[] = [
  { key: "RECEIVED",  label: "Recebida",     desc: "Denúncia registrada na redação" },
  { key: "REVIEW",    label: "Em apuração",  desc: "Equipe verificando as informações" },
  { key: "PUBLISHED", label: "Publicada",    desc: "Matéria publicada no portal" },
  { key: "RESOLVED",  label: "Resolvida",    desc: "Caso acompanhado e encerrado" },
];

const STAGE_ORDER: ReportStatus[] = ["RECEIVED", "REVIEW", "PUBLISHED", "RESOLVED"];

interface ReportResult {
  protocol: string;
  type: string;
  status: ReportStatus;
  createdAt: string;
}

const TYPE_LABELS: Record<string, string> = {
  POLICIAL: "Denúncia Policial",
  URBANO: "Problema Urbano",
  PAUTA: "Sugestão de Pauta",
  MIDIA: "Envio de Mídia",
  ANONIMA: "Denúncia Anônima",
};

export default function StatusDenunciaPage() {
  const [protocol, setProtocol] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReportResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const code = protocol.trim().toUpperCase();
    if (!code) return;
    setLoading(true);
    setResult(null);
    setNotFound(false);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/reports/status/${encodeURIComponent(code)}`);
      if (res.status === 404) { setNotFound(true); return; }
      if (!res.ok) throw new Error("Erro ao consultar protocolo.");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao consultar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const currentStageIndex = result ? STAGE_ORDER.indexOf(result.status) : -1;

  return (
    <main className="min-h-screen bg-surface text-navy">
      <section className="relative overflow-hidden bg-navy px-6 py-16">
        <div className="absolute left-[-80px] top-[-80px] h-[260px] w-[260px] rounded-full bg-gold/8 blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <Link href="/denuncias" className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
            <ArrowLeft size={14} /> Voltar para Central de Denúncias
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10">
              <ClipboardCheck size={22} className="text-gold" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.35em] text-gold">ACOMPANHE</span>
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] text-white lg:text-6xl">
            Status da sua denúncia
          </h1>
          <p className="mt-4 max-w-xl text-zinc-400">
            Informe o código de protocolo recebido ao enviar sua denúncia para verificar o andamento.
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[40px] border border-black/5 bg-white p-10 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <h2 className="text-2xl font-black">Consultar protocolo</h2>
            <p className="mt-2 text-sm text-slate-400">O código de protocolo foi gerado ao enviar sua denúncia.</p>

            <form onSubmit={handleSearch} className="mt-8 flex gap-3">
              <input
                type="text"
                value={protocol}
                onChange={(e) => setProtocol(e.target.value)}
                placeholder="Ex: PF-2026-0001"
                className="h-[56px] flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm font-mono outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white"
              />
              <button
                type="submit"
                disabled={loading}
                className="flex h-[56px] items-center gap-2 rounded-2xl bg-navy px-6 text-sm font-black text-white transition hover:bg-cobalt disabled:opacity-60"
              >
                <Search size={16} />
                {loading ? "..." : "Consultar"}
              </button>
            </form>

            {error && <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">{error}</p>}

            {notFound && (
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                <XCircle size={18} className="text-slate-400" />
                <p className="text-sm text-slate-500">Protocolo não encontrado. Verifique o código e tente novamente.</p>
              </div>
            )}

            {result && (
              <div className="mt-8 space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-mono text-sm text-slate-400">{result.protocol}</p>
                      <p className="mt-0.5 font-black text-navy">{TYPE_LABELS[result.type] ?? result.type}</p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-3.5 py-1.5 text-xs font-black uppercase tracking-wide text-emerald-700">
                      {STATUS_LABELS[result.status] ?? result.status}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-slate-400">Etapas de apuração</h3>
                  <div className="space-y-3">
                    {STAGES.map((stage, i) => {
                      const done = i <= currentStageIndex;
                      return (
                        <div key={stage.key} className={`flex items-center gap-4 rounded-2xl border px-5 py-4 ${done ? "border-emerald-100 bg-emerald-50" : "border-slate-100 bg-slate-50"}`}>
                          <CheckCircle2 size={18} className={done ? "text-emerald-600" : "text-slate-300"} />
                          <div>
                            <p className={`text-sm font-black ${done ? "text-emerald-800" : "text-slate-400"}`}>{stage.label}</p>
                            <p className={`text-xs ${done ? "text-emerald-600" : "text-slate-300"}`}>{stage.desc}</p>
                          </div>
                          {done && <CheckCircle2 size={16} className="ml-auto text-emerald-500" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {!result && !notFound && (
              <div className="mt-10">
                <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-slate-400">Etapas de apuração</h3>
                <div className="space-y-3">
                  {STAGES.map((stage) => (
                    <div key={stage.key} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4">
                      <CheckCircle2 size={18} className="text-slate-300" />
                      <div>
                        <p className="text-sm font-black text-slate-400">{stage.label}</p>
                        <p className="text-xs text-slate-300">{stage.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">Não recebeu seu protocolo?</p>
            <Link href="/contato" className="mt-2 inline-flex items-center gap-1.5 text-sm font-black text-navy hover:text-cobalt">
              Fale com a redação <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
