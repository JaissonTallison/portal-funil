import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Landmark } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Problema Urbano | ${SITE_NAME}`,
  description: "Reporte problemas urbanos em Manaus para o Portal Funil.",
};

export default function ProblemaUrbanoPage() {
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
            Buraco, falta de luz, alagamento, lixo acumulado. Denuncie e nossa equipe
            cobra resposta dos órgãos responsáveis.
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="rounded-[40px] border border-black/5 bg-white p-10 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <h2 className="text-2xl font-black">Reportar problema</h2>
              <form className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold">Nome</label>
                    <input type="text" placeholder="Seu nome completo" className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold">Telefone</label>
                    <input type="tel" placeholder="(92) 9 0000-0000" className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">Tipo de problema</label>
                  <select className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none focus:border-gold/50 focus:bg-white">
                    <option value="">Selecione o tipo</option>
                    <option>Buraco / cratera na via</option>
                    <option>Falta de iluminação pública</option>
                    <option>Alagamento</option>
                    <option>Lixo acumulado</option>
                    <option>Obra abandonada</option>
                    <option>Esgoto a céu aberto</option>
                    <option>Semáforo com defeito</option>
                    <option>Árvore com risco de queda</option>
                    <option>Outro</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">Endereço exato</label>
                  <input type="text" placeholder="Rua, número, bairro" className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">Há quanto tempo o problema existe?</label>
                  <select className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none focus:border-gold/50 focus:bg-white">
                    <option value="">Selecione</option>
                    <option>Menos de 1 semana</option>
                    <option>1 a 4 semanas</option>
                    <option>1 a 3 meses</option>
                    <option>Mais de 3 meses</option>
                    <option>Mais de 1 ano</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">Descrição</label>
                  <textarea rows={5} placeholder="Descreva o problema com detalhes..." className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white resize-none" />
                </div>
                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-orange-600">
                  Reportar problema <ArrowUpRight size={16} />
                </button>
              </form>
            </div>

            <div className="space-y-4">
              <div className="rounded-[28px] border border-black/5 bg-white p-7 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
                <h3 className="font-black">Como funciona?</h3>
                <div className="mt-4 space-y-3">
                  {[
                    "Você envia o problema com localização",
                    "Nossa equipe verifica e documenta in loco",
                    "Publicamos a matéria cobrando resposta",
                    "Acompanhamos até a resolução",
                  ].map((step, i) => (
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
                  Já cobramos solução para <strong>347 problemas</strong> em Manaus
                  nos últimos 12 meses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
