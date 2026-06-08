"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Lock, ShieldCheck } from "lucide-react";
import { API_URL } from "@/lib/api";

export default function DenunciaAnonima() {
  const [form, setForm] = useState({ location: "", description: "" });
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
          type: "ANONIMA",
          description: form.description,
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
        <div className="absolute left-[-80px] top-[-80px] h-[260px] w-[260px] rounded-full bg-purple-600/8 blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <Link href="/denuncias" className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
            <ArrowLeft size={14} /> Voltar para Central de Denúncias
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/15">
              <ShieldCheck size={22} className="text-purple-400" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.35em] text-purple-400">DENÚNCIA ANÔNIMA</span>
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] text-white lg:text-6xl">
            Canal sigiloso e seguro
          </h1>
          <p className="mt-4 max-w-xl text-zinc-400">
            Sua identidade é protegida. Nenhum dado pessoal é coletado neste canal.
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
                  <h2 className="mt-6 text-2xl font-black">Denúncia enviada!</h2>
                  <p className="mt-2 text-slate-500">Guarde seu protocolo para acompanhar sem revelar sua identidade.</p>
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
                  <div className="mb-6 flex items-center gap-3 rounded-2xl border border-purple-100 bg-purple-50 px-5 py-3">
                    <Lock size={16} className="text-purple-600" />
                    <span className="text-sm font-semibold text-purple-700">Nenhum dado pessoal é armazenado neste formulário</span>
                  </div>

                  <h2 className="text-2xl font-black">Enviar denúncia anônima</h2>
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                      <label className="mb-2 block text-sm font-semibold">Local / região</label>
                      <input value={form.location} onChange={(e) => update("location", e.target.value)} type="text" placeholder="Bairro, zona da cidade ou localidade" className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold">Descrição completa *</label>
                      <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={8} placeholder="Descreva tudo que sabe sobre o caso. Datas, locais, pessoas envolvidas, como acontece e qual é o impacto..." className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white resize-none" />
                    </div>

                    {error && <p className="rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">{error}</p>}

                    <button type="submit" disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-purple-600 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-purple-700 disabled:opacity-60">
                      {submitting ? "Enviando..." : <><span>Enviar denúncia sigilosa</span> <ArrowUpRight size={16} /></>}
                    </button>
                  </form>
                </>
              )}
            </div>

            <div className="space-y-4">
              {[
                { icon: ShieldCheck, color: "text-purple-600", bg: "bg-purple-50", title: "Criptografia E2E", body: "Todas as mensagens são criptografadas de ponta a ponta." },
                { icon: Lock, color: "text-emerald-600", bg: "bg-emerald-50", title: "Sem rastros digitais", body: "Não coletamos IP, cookies ou qualquer dado que possa identificar o denunciante." },
              ].map(({ icon: Icon, color, bg, title, body }) => (
                <div key={title} className="rounded-[28px] border border-black/5 bg-white p-7 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${bg}`}>
                    <Icon size={18} className={color} />
                  </div>
                  <h3 className="mt-4 font-black">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{body}</p>
                </div>
              ))}
              <Link href="/denuncias/midia" className="flex items-center justify-between rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5">
                <div>
                  <p className="text-sm font-black">Tem fotos ou vídeos?</p>
                  <p className="mt-1 text-xs text-slate-400">Use nosso canal de mídia</p>
                </div>
                <ArrowUpRight size={16} className="text-slate-400" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
