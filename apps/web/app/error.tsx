"use client";

import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-surface px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50">
        <AlertTriangle size={36} className="text-red-500" />
      </div>

      <h1 className="mt-6 text-3xl font-black tracking-tight text-navy">
        Algo deu errado
      </h1>
      <p className="mt-3 max-w-sm text-slate-500">
        Ocorreu um erro inesperado. Tente novamente ou volte para a página inicial.
      </p>

      <div className="mt-8 flex gap-3">
        <button
          onClick={reset}
          className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:bg-slate-50"
        >
          <RefreshCw size={15} />
          Tentar novamente
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 rounded-2xl bg-navy px-5 py-3 text-sm font-black text-white transition hover:bg-cobalt"
        >
          <Home size={15} />
          Início
        </Link>
      </div>
    </main>
  );
}
