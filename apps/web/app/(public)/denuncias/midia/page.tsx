import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Camera, Send } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Enviar Foto ou Vídeo | ${SITE_NAME}`,
  description: "Envie fotos e vídeos de ocorrências para a redação do Portal Funil.",
};

export default function EnviarMidiaPage() {
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
            Presenciou uma ocorrência? Envie suas imagens e ajude a redação
            a cobrir o que acontece em Manaus em tempo real.
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="rounded-[40px] border border-black/5 bg-white p-10 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <h2 className="text-2xl font-black">Enviar conteúdo</h2>
              <form className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold">Nome</label>
                    <input type="text" placeholder="Seu nome" className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold">WhatsApp</label>
                    <input type="tel" placeholder="(92) 9 0000-0000" className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">O que aparece nas imagens?</label>
                  <input type="text" placeholder="Acidente, alagamento, manifestação..." className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">Local e data</label>
                  <input type="text" placeholder="Bairro, rua — hoje, ontem, data específica" className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">Descrição</label>
                  <textarea rows={4} placeholder="Conte o contexto do que você filmou ou fotografou..." className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white resize-none" />
                </div>

                <div className="rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center">
                  <Camera size={28} className="mx-auto text-slate-300" />
                  <p className="mt-3 text-sm font-semibold text-slate-400">Arraste arquivos aqui ou clique para selecionar</p>
                  <p className="mt-1 text-xs text-slate-300">JPG, PNG, MP4, MOV — máx. 100MB por arquivo</p>
                  <button type="button" className="mt-4 rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
                    Selecionar arquivos
                  </button>
                </div>

                <label className="flex cursor-pointer items-start gap-3">
                  <input type="checkbox" className="mt-1 h-4 w-4 rounded" />
                  <span className="text-sm text-slate-500">Confirmo que sou o autor das imagens e autorizo o Portal Funil a utilizá-las com crédito</span>
                </label>

                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-600 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-teal-700">
                  Enviar conteúdo <ArrowUpRight size={16} />
                </button>
              </form>
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
