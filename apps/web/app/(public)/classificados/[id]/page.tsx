import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ListingDetail } from "@/components/classifieds/listing-detail";
import { ListingCard } from "@/components/classifieds/listing-card";
import type { Listing } from "@/types/listing";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002/api/v1";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ClassificadoDetailPage({ params }: Props) {
  const { id } = await params;

  let listing: Listing;
  try {
    const res = await fetch(`${API_BASE}/listings/${id}`, { cache: "no-store" });
    if (!res.ok) notFound();
    listing = await res.json();
  } catch {
    notFound();
  }

  let related: Listing[] = [];
  try {
    const res = await fetch(
      `${API_BASE}/listings?type=${listing.type}&limit=4`,
      { cache: "no-store" }
    );
    if (res.ok) {
      const data = await res.json();
      related = (data.items ?? []).filter((l: Listing) => l.id !== listing.id).slice(0, 3);
    }
  } catch {
    related = [];
  }

  return (
    <main className="min-h-screen bg-surface px-6 pb-24 pt-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-8">
          <Link
            href="/classificados"
            className="inline-flex items-center gap-2 rounded-2xl border border-black/5 bg-white px-4 py-2.5 text-sm font-semibold text-navy shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5"
          >
            <ArrowLeft size={15} />
            Voltar aos classificados
          </Link>
        </div>

        <ListingDetail listing={listing} />

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-8 text-3xl font-black tracking-[-0.04em] text-navy">
              Anúncios relacionados
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ListingCard key={item.id} listing={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
