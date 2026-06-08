import type { Listing, ListingType } from "@/types/listing";
import {
  listings,
  LISTING_CATEGORIES,
  LISTING_TYPES,
  getListingById,
  getActiveListings,
  filterListings,
} from "@/lib/classifieds";

export async function getAllActiveListings(): Promise<Listing[]> {
  return getActiveListings();
}

export async function getListingByIdAsync(id: string): Promise<Listing | null> {
  return getListingById(id) ?? null;
}

export async function getFeaturedListings(): Promise<Listing[]> {
  return listings.filter((l) => l.isFeatured && l.status === "ativo");
}

export async function filterListingsAsync(params: {
  category?: string;
  type?: ListingType;
  search?: string;
}): Promise<Listing[]> {
  return filterListings(params);
}

export async function getRelatedListings(listing: Listing, limit = 4): Promise<Listing[]> {
  return getActiveListings()
    .filter(
      (l) => l.id !== listing.id && (l.category === listing.category || l.type === listing.type)
    )
    .slice(0, limit);
}

export { LISTING_CATEGORIES, LISTING_TYPES };
