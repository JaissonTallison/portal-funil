"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, CheckCircle2, Landmark } from "lucide-react";
import { API_URL } from "@/lib/api";

export default function ProblemaUrbanoPage() {
  const [form, setForm] = useState({ name: "", phone: "", location: "", description: "" });
  const [submitting, setSubmitting] = useState(false);
  const [protocol, setProtocol] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function update(field: string, value: string) {
    setForm((p) => ({ ...p, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.description.trim()) { setError("Descrição é obrigatória."); return; }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "URBANO",
          description: form.description,
          ...(form.name ? { name: form.name } : {}),
          ...(form.phone ? { phone: form.phone } : {}),
          ...(form.location ? { location: form.location } : {}),
        }),
      });
      if (!res.ok) throw new Error("Erro ao enviar denúncia.");
      const data = await res.json();
      setProtocol(data.protocol);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-surface text-navy">
      <section className="relative overflow-hidden bg-navy px-6 py-16">
        <div className="absolute left-[-80px] top-[-80px] h-[260px] w-[260px] rounded-full bg-orange-500/8 blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <Link href="/denuncias" className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
            <ArrowLeft size={14} /> Voltar para Central de Denúncias
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/15">
              <Landmark size={22} className="text-orange-400" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.35em] text-orange-400">PROBLEMA URBANO</span>
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] text-white lg:text-6xl">
            Reporte um problema na sua rua
          </h1>
          <p className="mt-4 max-w-xl text-zinc-400">
            Buraco, falta de luz, alagamento, lixo acumulado. Denuncie e nossa equipe cobra resposta dos órgãos responsáveis.
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="rounded-[40px] border border-black/5 bg-white p-10 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">

              {protocol ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                    <Check size={32} className="text-emerald-500" />
                  </div>
                  <h2 className="mt-6 text-2xl font-black">Problema reportado!</h2>
                  <p className="mt-2 text-slate-500">Nossa equipe irá verificar e cobrar solução.</p>
                  <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-8 py-4">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">Protocolo</p>
                    <p className="mt-1 font-mono text-2xl font-black text-navy">{protocol}</p>
                  </div>
                  <Link href="/denuncias/status" className="mt-6 text-sm font-bold text-cobalt hover:underline">
                    Acompanhar status →
                  </Link>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-black">Reportar problema</h2>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold">Nome</label>
                        <input value={form.name} onChange={(e) => update("name", e.target.value)} type="text" placeholder="Seu nome completo" className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold">Telefone</label>
                        <input value={form.phone} onChange={(e) => update("phone", e.target.value)} type="tel" placeholder="(92) 9 0000-0000" className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white" />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">Endereço exato</label>
                      <input value={form.location} onChange={(e) => update("location", e.target.value)} type="text" placeholder="Rua, número, bairro" className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white" />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">Descrição *</label>
                      <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={5} placeholder="Descreva o problema com detalhes: tipo, há quanto tempo existe, impacto na comunidade..." className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white resize-none" />
                    </div>

                    {error && <p className="rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">{error}</p>}

                    <button type="submit" disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-orange-600 disabled:opacity-60">
                      {submitting ? "Enviando..." : <><span>Reportar problema</span> <ArrowUpRight size={16} /></>}
                    </button>
                  </form>
                </>
              )}
            </div>

            <div className="space-y-4">
              <div className="rounded-[28px] border border-black/5 bg-white p-7 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
                <h3 className="font-black">Como funciona?</h3>
                <div className="mt-4 space-y-3">
                  {["Você envia o problema com localização", "Nossa equipe verifica e documenta in loco", "Publicamos a matéria cobrando resposta", "Acompanhamos até a resolução"].map((step, i) => (
                    <div key={step} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-50 text-[11px] font-black text-orange-500">{i + 1}</span>
                      <p className="text-sm text-slate-500">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[28px] border border-emerald-100 bg-emerald-50 p-7">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <h3 className="font-black text-emerald-800">Problemas resolvidos</h3>
                </div>
                <p className="mt-2 text-sm text-emerald-700">
                  Já cobramos solução para <strong>347 problemas</strong> em Manaus nos últimos 12 meses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
