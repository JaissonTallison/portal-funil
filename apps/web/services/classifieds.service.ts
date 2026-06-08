import { API_URL } from "@/lib/api";
import type { Listing } from "@/types/listing";

export async function getFeaturedListings(limit = 4): Promise<Listing[]> {
  try {
    const res = await fetch(`${API_URL}/listings?limit=${limit}`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items ?? []).filter((l: Listing) => l.isFeatured).slice(0, limit);
  } catch {
    return [];
  }
}

export async function getAllActiveListings(limit = 20): Promise<Listing[]> {
  try {
    const res = await fetch(`${API_URL}/listings?limit=${limit}`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.items ?? [];
  } catch {
    return [];
  }
}

export async function getListingByIdAsync(id: string): Promise<Listing | null> {
  try {
    const res = await fetch(`${API_URL}/listings/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
