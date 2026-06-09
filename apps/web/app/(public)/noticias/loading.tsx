export default function NoticiasLoading() {
  return (
    <main className="min-h-screen bg-surface">
      {/* Header skeleton */}
      <section className="bg-navy px-6 py-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="h-6 w-32 animate-pulse rounded-xl bg-white/10" />
          <div className="mt-6 h-16 w-96 animate-pulse rounded-2xl bg-white/10" />
          <div className="mt-4 h-5 w-48 animate-pulse rounded-xl bg-white/10" />
          <div className="mt-10 flex flex-wrap gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-10 w-24 animate-pulse rounded-2xl bg-white/10" />
            ))}
          </div>
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-[36px] border border-black/5 bg-white">
                <div className="h-[260px] animate-pulse bg-slate-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 w-20 animate-pulse rounded-lg bg-slate-100" />
                  <div className="h-5 w-full animate-pulse rounded-lg bg-slate-100" />
                  <div className="h-5 w-3/4 animate-pulse rounded-lg bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
