import { Metadata } from "next";
import Link from "next/link";
import { AlertOctagon, ArrowLeft, ArrowUpRight, Shield } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Denúncia Policial | ${SITE_NAME}`,
  description: "Envie denúncias sobre crimes e irregularidades para a redação do Portal Funil.",
};

export default function DenunciaPolicialPage() {
  return (
    <main className="min-h-screen bg-surface text-navy">
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy px-6 py-16">
        <div className="absolute left-[-80px] top-[-80px] h-[260px] w-[260px] rounded-full bg-red-500/8 blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <Link href="/denuncias" className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
            <ArrowLeft size={14} /> Voltar para Central de Denúncias
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/15">
              <AlertOctagon size={22} className="text-red-400" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.35em] text-red-400">DENÚNCIA POLICIAL</span>
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] text-white lg:text-6xl">
            Denuncie crimes e irregularidades
          </h1>
          <p className="mt-4 max-w-xl text-zinc-400">
            Sua identidade é protegida. A redação apura cada denúncia com rigor jornalístico
            antes de qualquer publicação.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="rounded-[40px] border border-black/5 bg-white p-10 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <h2 className="text-2xl font-black">Enviar denúncia</h2>
              <p className="mt-2 text-sm text-slate-400">Preencha com o máximo de detalhes possível.</p>

              <form className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold">Nome (opcional)</label>
                    <input type="text" placeholder="Seu nome" className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold">Telefone / WhatsApp</label>
                    <input type="tel" placeholder="(92) 9 0000-0000" className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white" />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">Tipo de ocorrência</label>
                  <select className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none focus:border-gold/50 focus:bg-white">
                    <option value="">Selecione o tipo</option>
                    <option>Tráfico de drogas</option>
                    <option>Violência doméstica</option>
                    <option>Roubo / Furto</option>
                    <option>Corrupção policial</option>
                    <option>Irregularidade em obra pública</option>
                    <option>Desvio de verbas</option>
                    <option>Outro</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">Local da ocorrência</label>
                  <input type="text" placeholder="Bairro, rua ou referência" className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">Descrição da denúncia</label>
                  <textarea rows={6} placeholder="Descreva com o máximo de detalhes o que aconteceu, quando e quem está envolvido..." className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white resize-none" />
                </div>

                <label className="flex cursor-pointer items-start gap-3">
                  <input type="checkbox" className="mt-1 h-4 w-4 rounded" />
                  <span className="text-sm text-slate-500">Quero manter minha identidade em sigilo absoluto</span>
                </label>

                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-red-700">
                  Enviar denúncia <ArrowUpRight size={16} />
                </button>
              </form>
            </div>

            {/* SIDEBAR */}
            <div className="space-y-4">
              <div className="rounded-[28px] border border-black/5 bg-white p-7 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50">
                  <Shield size={18} className="text-emerald-600" />
                </div>
                <h3 className="mt-4 font-black">Sua identidade protegida</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Nunca revelamos a identidade de denunciantes. Os dados são
                  criptografados e acessados apenas pela equipe editorial.
                </p>
              </div>
              <div className="rounded-[28px] border border-black/5 bg-white p-7 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
                <h3 className="font-black">Para emergências</h3>
                <p className="mt-2 text-sm text-slate-400">Se houver risco imediato, ligue:</p>
                <div className="mt-4 space-y-2 text-sm font-black">
                  <div className="rounded-xl bg-slate-50 px-4 py-3">190 — Polícia Militar</div>
                  <div className="rounded-xl bg-slate-50 px-4 py-3">192 — SAMU</div>
                  <div className="rounded-xl bg-slate-50 px-4 py-3">193 — Corpo de Bombeiros</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
