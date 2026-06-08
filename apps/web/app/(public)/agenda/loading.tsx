export default function AgendaLoading() {
  return (
    <main className="min-h-screen bg-surface">
      <div className="animate-pulse bg-navy px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="h-4 w-32 rounded-xl bg-white/10" />
          <div className="mt-8 h-16 w-80 rounded-2xl bg-white/10" />
          <div className="mt-5 h-4 w-64 rounded-xl bg-white/10" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="mb-8 flex gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-10 w-24 animate-pulse rounded-xl bg-slate-200" />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-[28px] border border-black/5 bg-white">
              <div className="h-[200px] animate-pulse bg-slate-200" />
              <div className="p-5 space-y-3">
                <div className="h-4 w-16 animate-pulse rounded-lg bg-slate-100" />
                <div className="h-5 w-full animate-pulse rounded-lg bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
