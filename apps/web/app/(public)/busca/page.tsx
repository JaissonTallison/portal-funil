"use client";

import { useCallback, useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, FileText, Calendar, ShoppingBag, Loader2 } from "lucide-react";
import { API_URL } from "@/lib/api";
import { formatPrice, getTypeName } from "@/lib/classifieds";

type ArticleResult = {
  id: string; slug: string; title: string; description: string;
  image: string; publishedAt: string | null;
  category: { name: string; slug: string };
  author: { name: string };
};
type EventResult = {
  id: string; slug: string; title: string; description: string;
  image: string; startDate: string; venue: string; isFree: boolean; price: string | null;
};
type ListingResult = {
  id: string; title: string; description: string; category: string;
  type: string; price: number | null; images: string[];
  contact: { location: string } | null;
};

type SearchResponse = {
  articles: ArticleResult[];
  events: EventResult[];
  listings: ListingResult[];
  total: number;
};

const EMPTY: SearchResponse = { articles: [], events: [], listings: [], total: 0 };

type Tab = "all" | "articles" | "events" | "listings";

function BuscaContent() {
  const params = useSearchParams();
  const router = useRouter();
  const q = params.get("q") ?? "";
  const [input, setInput] = useState(q);
  const [tab, setTab] = useState<Tab>("all");
  const [results, setResults] = useState<SearchResponse>(EMPTY);
  const [loading, setLoading] = useState(false);

  const doSearch = useCallback(async (term: string) => {
    if (term.trim().length < 2) { setResults(EMPTY); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(term)}`, { cache: "no-store" });
      const data: SearchResponse = await res.json();
      setResults(data);
    } catch {
      setResults(EMPTY);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (q) doSearch(q);
  }, [q, doSearch]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    router.push(`/busca?q=${encodeURIComponent(input.trim())}`);
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode; count: number }[] = [
    { key: "all",      label: "Todos",          icon: <Search size={14} />,      count: results.total },
    { key: "articles", label: "Notícias",        icon: <FileText size={14} />,    count: results.articles.length },
    { key: "events",   label: "Eventos",          icon: <Calendar size={14} />,    count: results.events.length },
    { key: "listings", label: "Classificados",    icon: <ShoppingBag size={14} />, count: results.listings.length },
  ];

  const showArticles = tab === "all" || tab === "articles";
  const showEvents   = tab === "all" || tab === "events";
  const showListings = tab === "all" || tab === "listings";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* SEARCH BAR */}
      <div className="bg-navy px-6 py-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-5 text-2xl font-black text-white">Busca no Portal</h1>
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Busque notícias, eventos, classificados..."
                className="w-full rounded-2xl border border-white/10 bg-white/10 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-400 outline-none focus:border-gold"
              />
            </div>
            <button
              type="submit"
              className="rounded-2xl bg-gold px-6 py-3 text-sm font-black text-navy transition hover:bg-gold-hover"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-8">
        {q && (
          <p className="mb-6 text-sm text-slate-500">
            {loading ? "Buscando..." : `${results.total} resultado(s) para "${q}"`}
          </p>
        )}

        {/* TABS */}
        {q && !loading && results.total > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  tab === t.key ? "bg-navy text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-navy/20"
                }`}
              >
                {t.icon}
                {t.label}
                <span className={`ml-1 rounded-full px-2 py-0.5 text-xs font-black ${tab === t.key ? "bg-white/20" : "bg-slate-100"}`}>
                  {t.count}
                </span>
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-16">
            <Loader2 size={28} className="animate-spin text-navy" />
          </div>
        )}

        {!loading && q && results.total === 0 && (
          <div className="rounded-[20px] border border-slate-200 bg-white px-6 py-16 text-center">
            <Search size={40} className="mx-auto mb-3 text-slate-300" />
            <p className="text-base font-bold text-navy">Nenhum resultado encontrado</p>
            <p className="mt-1 text-sm text-slate-400">Tente palavras-chave diferentes</p>
          </div>
        )}

        {!loading && !q && (
          <div className="rounded-[20px] border border-slate-200 bg-white px-6 py-16 text-center">
            <Search size={40} className="mx-auto mb-3 text-slate-300" />
            <p className="text-base font-bold text-navy">Digite algo para buscar</p>
            <p className="mt-1 text-sm text-slate-400">Pesquise em notícias, eventos e classificados</p>
          </div>
        )}

        {/* ARTICLES */}
        {showArticles && results.articles.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400">
              <FileText size={14} /> Notícias ({results.articles.length})
            </h2>
            <div className="space-y-3">
              {results.articles.map((a) => (
                <Link
                  key={a.id}
                  href={`/noticias/${a.slug}`}
                  className="flex gap-4 rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Image src={a.image} alt={a.title} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-black uppercase tracking-widest text-cobalt">{a.category.name}</span>
                    <p className="mt-0.5 line-clamp-2 text-sm font-bold text-navy">{a.title}</p>
                    <p className="mt-1 line-clamp-1 text-xs text-slate-400">{a.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* EVENTS */}
        {showEvents && results.events.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400">
              <Calendar size={14} /> Eventos ({results.events.length})
            </h2>
            <div className="space-y-3">
              {results.events.map((e) => (
                <Link
                  key={e.id}
                  href={`/agenda/${e.slug}`}
                  className="flex gap-4 rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Image src={e.image} alt={e.title} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">
                      {new Date(e.startDate).toLocaleDateString("pt-BR")}
                    </span>
                    <p className="mt-0.5 line-clamp-2 text-sm font-bold text-navy">{e.title}</p>
                    <p className="text-xs text-slate-400">{e.venue}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* LISTINGS */}
        {showListings && results.listings.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400">
              <ShoppingBag size={14} /> Classificados ({results.listings.length})
            </h2>
            <div className="space-y-3">
              {results.listings.map((l) => (
                <Link
                  key={l.id}
                  href={`/classificados/${l.id}`}
                  className="flex gap-4 rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    {l.images?.[0] ? (
                      <Image src={l.images[0]} alt={l.title} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <ShoppingBag size={20} className="text-slate-300" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gold-dark">
                      {getTypeName(l.type as never)}
                    </span>
                    <p className="mt-0.5 line-clamp-1 text-sm font-bold text-navy">{l.title}</p>
                    <p className="text-xs font-semibold text-cobalt">{formatPrice(l.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default function BuscaPage() {
  return (
    <Suspense>
      <BuscaContent />
    </Suspense>
  );
}
