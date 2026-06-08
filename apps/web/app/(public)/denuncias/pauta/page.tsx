"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, FileText, Lightbulb } from "lucide-react";
import { API_URL } from "@/lib/api";

export default function SugestaoPautaPage() {
  const [form, setForm] = useState({ name: "", email: "", description: "" });
  const [submitting, setSubmitting] = useState(false);
  const [protocol, setProtocol] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function update(field: string, value: string) {
    setForm((p) => ({ ...p, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.description.trim()) { setError("Descrição da pauta é obrigatória."); return; }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "PAUTA",
          description: form.description,
          ...(form.name ? { name: form.name } : {}),
          ...(form.email ? { email: form.email } : {}),
        }),
      });
      if (!res.ok) throw new Error("Erro ao enviar sugestão.");
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
        <div className="absolute left-[-80px] top-[-80px] h-[260px] w-[260px] rounded-full bg-blue-600/8 blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <Link href="/denuncias" className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
            <ArrowLeft size={14} /> Voltar para Central de Denúncias
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15">
              <FileText size={22} className="text-blue-400" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.35em] text-blue-400">SUGESTÃO DE PAUTA</span>
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] text-white lg:text-6xl">
            Tem uma história para contar?
          </h1>
          <p className="mt-4 max-w-xl text-zinc-400">
            Nossa redação recebe e avalia todas as sugestões. Histórias relevantes para Manaus ganham cobertura completa.
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
                  <h2 className="mt-6 text-2xl font-black">Sugestão enviada!</h2>
                  <p className="mt-2 text-slate-500">Nossa redação irá analisar sua pauta em até 48 horas.</p>
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
                  <h2 className="text-2xl font-black">Sugerir pauta</h2>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold">Seu nome</label>
                        <input value={form.name} onChange={(e) => update("name", e.target.value)} type="text" placeholder="Nome completo" className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold">E-mail</label>
                        <input value={form.email} onChange={(e) => update("email", e.target.value)} type="email" placeholder="seu@email.com" className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white" />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">Descreva a pauta *</label>
                      <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={6} placeholder="Conte o que aconteceu, onde, quando, e quem são os personagens envolvidos..." className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white resize-none" />
                    </div>

                    {error && <p className="rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">{error}</p>}

                    <button type="submit" disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-blue-700 disabled:opacity-60">
                      {submitting ? "Enviando..." : <><span>Enviar sugestão</span> <ArrowUpRight size={16} /></>}
                    </button>
                  </form>
                </>
              )}
            </div>

            <div className="space-y-4">
              <div className="rounded-[28px] border border-black/5 bg-white p-7 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50">
                  <Lightbulb size={18} className="text-blue-600" />
                </div>
                <h3 className="mt-4 font-black">Uma boa pauta tem</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-500">
                  {["Impacto na vida das pessoas", "Fatos verificáveis", "Fontes identificadas", "Relevância local ou nacional", "Urgência ou ineditismo"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[28px] bg-navy p-7">
                <span className="text-[10px] font-black uppercase tracking-widest text-gold">RETORNO</span>
                <p className="mt-3 text-sm text-zinc-400">
                  Analisamos todas as sugestões e retornamos por e-mail em até <strong className="text-white">48 horas</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
