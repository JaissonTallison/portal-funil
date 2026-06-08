import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Lock, ShieldCheck } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Denúncia Anônima | ${SITE_NAME}`,
  description: "Canal seguro e criptografado para denúncias anônimas no Portal Funil.",
};

export default function DenunciaAnonima() {
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
            Sua identidade é protegida por criptografia de ponta a ponta.
            Nenhum dado pessoal é coletado neste canal.
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="rounded-[40px] border border-black/5 bg-white p-10 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <div className="mb-6 flex items-center gap-3 rounded-2xl border border-purple-100 bg-purple-50 px-5 py-3">
                <Lock size={16} className="text-purple-600" />
                <span className="text-sm font-semibold text-purple-700">Nenhum dado pessoal é armazenado neste formulário</span>
              </div>

              <h2 className="text-2xl font-black">Enviar denúncia anônima</h2>
              <form className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold">Tipo de denúncia</label>
                  <select className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none focus:border-gold/50 focus:bg-white">
                    <option value="">Selecione o tipo</option>
                    <option>Corrupção de servidor público</option>
                    <option>Desvio de verbas</option>
                    <option>Tráfico de drogas / armas</option>
                    <option>Violência policial</option>
                    <option>Irregularidade eleitoral</option>
                    <option>Crime ambiental</option>
                    <option>Trabalho escravo ou análogo</option>
                    <option>Outro</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">Local / região</label>
                  <input type="text" placeholder="Bairro, zona da cidade ou localidade" className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">Descrição completa</label>
                  <textarea rows={8} placeholder="Descreva tudo que sabe sobre o caso. Datas, locais, pessoas envolvidas, como acontece e qual é o impacto..." className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white resize-none" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">Tem provas ou documentos?</label>
                  <input type="text" placeholder="Descreva (não envie arquivos aqui — use o canal de mídia)" className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white" />
                </div>
                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-purple-600 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-purple-700">
                  Enviar denúncia sigilosa <ArrowUpRight size={16} />
                </button>
              </form>
            </div>

            <div className="space-y-4">
              {[
                { icon: ShieldCheck, color: "text-purple-600", bg: "bg-purple-50", title: "Criptografia E2E", body: "Todas as mensagens são criptografadas de ponta a ponta. Nem nossa equipe pode identificar o remetente." },
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
                  <p className="font-black text-sm">Tem fotos ou vídeos?</p>
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
