import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ListingForm } from "@/components/classifieds/listing-form";

export default function NovoAnuncioPage() {
  return (
    <main className="min-h-screen bg-surface px-6 pb-24 pt-8">
      <div className="mx-auto max-w-3xl">
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
        <div className="mb-8">
          <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">
            NOVO ANÚNCIO
          </span>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-navy">
            Criar anúncio
          </h1>
          <p className="mt-2 text-base text-slate-500">
            Preencha os dados abaixo para publicar seu anúncio gratuitamente.
          </p>
        </div>

        {/* FORM */}
        <ListingForm />
      </div>
    </main>
  );
}
