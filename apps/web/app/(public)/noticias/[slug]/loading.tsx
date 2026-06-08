export default function ArticleLoading() {
  return (
    <main className="min-h-screen bg-surface">
      {/* Hero skeleton */}
      <section className="relative h-[60vh] min-h-[420px] animate-pulse bg-slate-300" />

      {/* Body skeleton */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="h-20 animate-pulse rounded-[28px] bg-white" />
          <div className="h-6 w-3/4 animate-pulse rounded-xl bg-slate-200" />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`h-4 animate-pulse rounded-lg bg-slate-200 ${i % 3 === 2 ? "w-2/3" : "w-full"}`} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
