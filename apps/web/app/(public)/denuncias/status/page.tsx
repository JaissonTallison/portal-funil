import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ClipboardCheck, Clock, Search } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Status da Denúncia | ${SITE_NAME}`,
  description: "Consulte o status de apuração da sua denúncia no Portal Funil.",
};

const exampleStatuses = [
  { code: "PF-2026-0342", subject: "Buraco na Av. Constantino Nery", status: "Publicado", color: "bg-emerald-100 text-emerald-700", date: "17/05/2026" },
  { code: "PF-2026-0318", subject: "Falta de iluminação no Cidade Nova", status: "Em apuração", color: "bg-blue-100 text-blue-700", date: "14/05/2026" },
  { code: "PF-2026-0301", subject: "Alagamento Zona Norte", status: "Aguardando", color: "bg-amber-100 text-amber-700", date: "11/05/2026" },
];

export default function StatusDenunciaPage() {
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
            Informe o código de protocolo recebido por e-mail ou WhatsApp para
            verificar o andamento da apuração.
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-3xl">
          {/* SEARCH */}
          <div className="rounded-[40px] border border-black/5 bg-white p-10 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <h2 className="text-2xl font-black">Consultar protocolo</h2>
            <p className="mt-2 text-sm text-slate-400">O código de protocolo foi enviado para o e-mail ou WhatsApp informado.</p>

            <div className="mt-8 flex gap-3">
              <input
                type="text"
                placeholder="Ex: PF-2026-0342"
                className="h-[56px] flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm font-mono outline-none placeholder:text-slate-400 focus:border-gold/50 focus:bg-white"
              />
              <button className="flex h-[56px] items-center gap-2 rounded-2xl bg-navy px-6 text-sm font-black text-white transition hover:bg-cobalt">
                <Search size={16} /> Consultar
              </button>
            </div>

            {/* STAGES */}
            <div className="mt-10">
              <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-slate-400">Etapas de apuração</h3>
              <div className="space-y-3">
                {[
                  { icon: CheckCircle2, label: "Recebida", desc: "Denúncia registrada na redação", done: true },
                  { icon: Search, label: "Em apuração", desc: "Equipe verificando as informações", done: true },
                  { icon: Clock, label: "Em edição", desc: "Matéria sendo redigida", done: false },
                  { icon: ArrowUpRight, label: "Publicada", desc: "Conteúdo publicado no portal", done: false },
                ].map(({ icon: Icon, label, desc, done }) => (
                  <div key={label} className={`flex items-center gap-4 rounded-2xl border px-5 py-4 ${done ? "border-emerald-100 bg-emerald-50" : "border-slate-100 bg-slate-50"}`}>
                    <Icon size={18} className={done ? "text-emerald-600" : "text-slate-300"} />
                    <div>
                      <p className={`text-sm font-black ${done ? "text-emerald-800" : "text-slate-400"}`}>{label}</p>
                      <p className={`text-xs ${done ? "text-emerald-600" : "text-slate-300"}`}>{desc}</p>
                    </div>
                    {done && <CheckCircle2 size={16} className="ml-auto text-emerald-500" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* EXAMPLES */}
          <div className="mt-8 rounded-[32px] border border-black/5 bg-white p-8 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
            <h3 className="font-black">Denúncias recentes</h3>
            <p className="mt-1 text-sm text-slate-400">Exemplos de denúncias com status atualizado.</p>
            <div className="mt-6 space-y-3">
              {exampleStatuses.map((item) => (
                <div key={item.code} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4">
                  <div>
                    <span className="font-mono text-xs text-slate-400">{item.code}</span>
                    <p className="mt-0.5 text-sm font-semibold">{item.subject}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400">{item.date}</span>
                    <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wide ${item.color}`}>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
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
