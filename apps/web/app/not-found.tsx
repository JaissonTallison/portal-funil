import Link from "next/link";
import { ArrowLeft, Home, Newspaper, Radio, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy px-6 text-center">
      {/* BG */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-2xl">
        {/* 404 */}
        <div className="text-[160px] font-black leading-none tracking-[-0.06em] text-gold/10 select-none lg:text-[220px]">
          404
        </div>

        <div className="-mt-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-5 py-2.5 text-xs font-black uppercase tracking-[0.3em] text-gold">
            <Search size={13} />
            Página não encontrada
          </span>

          <h1 className="mt-8 text-4xl font-black leading-tight tracking-[-0.05em] text-white lg:text-6xl">
            Esta matéria saiu
            <br />
            do nosso radar
          </h1>

          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-zinc-400">
            A página que você está procurando não existe ou foi removida.
            Confira as notícias mais recentes abaixo.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-2xl bg-gold px-7 py-4 text-sm font-black uppercase tracking-wide text-navy transition hover:-translate-y-0.5"
          >
            <Home size={16} />
            Ir para home
          </Link>

          <Link
            href="/noticias"
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <Newspaper size={16} />
            Ver notícias
          </Link>

          <Link
            href="/ao-vivo"
            className="flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-7 py-4 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
          >
            <Radio size={16} className="animate-pulse" />
            Ao vivo
          </Link>
        </div>

        <Link
          href="/noticias"
          className="mt-10 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-300"
        >
          <ArrowLeft size={15} />
          Voltar para todas as notícias
        </Link>
      </div>
    </div>
  );
}
