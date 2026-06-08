"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Camera, Check, Send } from "lucide-react";
import { API_URL } from "@/lib/api";

export default function EnviarMidiaPage() {
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
          type: "MIDIA",
          description: form.description,
          ...(form.name ? { name: form.name } : {}),
          ...(form.phone ? { phone: form.phone } : {}),
          ...(form.location ? { location: form.location } : {}),
        }),
      });
      if (!res.ok) throw new Error("Erro ao enviar conteúdo.");
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
        <div className="absolute left-[-80px] top-[-80px] h-[260px] w-[260px] rounded-full bg-teal-500/8 blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <Link href="/denuncias" className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
            <ArrowLeft size={14} /> Voltar para Central de Denúncias
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/15">
              <Camera size={22} className="text-teal-400" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.35em] text-teal-400">ENVIAR MÍDIA</span>
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] text-white lg:text-6xl">
            Envie fotos e vídeos
          </h1>
          <p className="mt-4 max-w-xl text-zinc-400">
            Presenciou uma ocorrência? Envie suas imagens e ajude a redação a cobrir o que acontece em Manaus.
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
                  <h2 className="mt-6 text-2xl font-black">Conteúdo enviado!</h2>
                  <p className="mt-2 text-slate-500">Nossa redação irá analisar seu material.</p>
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
                  <h2 className="text-2xl font-black">Enviar conteúdo</h2>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold">Nome</label>
                        <input value={form.name} onChange={(e) => update("name", e.target.value)} type="text" placeholder="Seu nome" className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold">WhatsApp</label>
                        <input value={form.phone} onChange={(e) => update("phone", e.target.value)} type="tel" placeholder="(92) 9 0000-0000" className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white" />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">Local e data</label>
                      <input value={form.location} onChange={(e) => update("location", e.target.value)} type="text" placeholder="Bairro, rua — hoje, ontem, data específica" className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white" />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">Descrição *</label>
                      <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={4} placeholder="Conte o contexto do que você filmou ou fotografou, o que aparece nas imagens..." className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white resize-none" />
                    </div>

                    {error && <p className="rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">{error}</p>}

                    <button type="submit" disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-600 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-teal-700 disabled:opacity-60">
                      {submitting ? "Enviando..." : <><span>Enviar conteúdo</span> <ArrowUpRight size={16} /></>}
                    </button>
                  </form>
                </>
              )}
            </div>

            <div className="space-y-4">
              <div className="rounded-[28px] border border-black/5 bg-white p-7">
                <h3 className="font-black">Prefere enviar pelo WhatsApp?</h3>
                <p className="mt-2 text-sm text-slate-400">Mande suas fotos e vídeos diretamente para a nossa redação.</p>
                <a href="https://wa.me/5592999990000" target="_blank" rel="noopener noreferrer"
                  className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-600">
                  <Send size={14} /> Enviar pelo WhatsApp
                </a>
              </div>
              <div className="rounded-[28px] bg-navy p-7">
                <span className="text-[10px] font-black uppercase tracking-widest text-gold">CRÉDITO</span>
                <p className="mt-3 text-sm text-zinc-400">
                  Todo conteúdo enviado e publicado recebe crédito ao autor com nome e zona da cidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
