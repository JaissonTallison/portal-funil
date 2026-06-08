import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";
import { MyListingsTable } from "@/components/classifieds/my-listings-table";

export default function MeusAnunciosPage() {
  return (
    <main className="min-h-screen bg-surface px-6 pb-24 pt-8">
      <div className="mx-auto max-w-5xl">
        {/* BREADCRUMB */}
        <div className="mb-8">
          <Link
            href="/classificados"
            className="inline-flex items-center gap-2 rounded-2xl border border-black/5 bg-white px-4 py-2.5 text-sm font-semibold text-navy shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5"
          >
            <ArrowLeft size={15} />
            Voltar aos classificados
          </Link>
        </div>

        {/* HEADER */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <User size={14} className="text-gold-dark" />
              <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">
                PAINEL DO ANUNCIANTE
              </span>
            </div>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] text-navy">
              Meus anúncios
            </h1>
            <p className="mt-2 text-base text-slate-500">
              Gerencie seus anúncios: edite, pause ou exclua a qualquer momento.
            </p>
          </div>
        </div>

        {/* TABLE */}
        <MyListingsTable />
      </div>
    </main>
  );
}
