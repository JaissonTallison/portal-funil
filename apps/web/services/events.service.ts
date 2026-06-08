import type { Event, SpecialDate } from "@/types/event";
import { apiGet } from "@/lib/api";
import { getTodaySpecialDates, getUpcomingSpecialDates } from "@/lib/agenda-data";

// ─── API response shape ───────────────────────────────────────────────────────

type ApiEvent = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  startDate: string;
  endDate: string | null;
  time: string | null;
  venue: string;
  neighborhood: string | null;
  price: string | null;
  isFree: boolean;
  ageRating: string | null;
  organizer: string | null;
  isHighlighted: boolean;
  isSponsored: boolean;
  sponsor: string | null;
  tags: string[];
};

type ApiListResponse = { items: ApiEvent[]; total: number };

function toEvent(e: ApiEvent): Event {
  return {
    id: e.id,
    slug: e.slug,
    title: e.title,
    description: e.description,
    category: e.category as Event["category"],
    image: e.image,
    date: e.startDate,
    endDate: e.endDate ?? undefined,
    time: e.time ?? undefined,
    venue: e.venue,
    neighborhood: e.neighborhood ?? undefined,
    price: e.price ?? undefined,
    isFree: e.isFree,
    ageRating: e.ageRating ?? undefined,
    organizer: e.organizer ?? undefined,
    isHighlighted: e.isHighlighted,
    isSponsored: e.isSponsored,
    sponsor: e.sponsor ?? undefined,
    tags: e.tags,
  };
}

// ─── Events ──────────────────────────────────────────────────────────────────

export async function getAllEvents(): Promise<Event[]> {
  try {
    const data = await apiGet<ApiListResponse>("/events?limit=50");
    return data.items.map(toEvent);
  } catch {
    return [];
  }
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  try {
    const data = await apiGet<ApiEvent>(`/events/${slug}`);
    return toEvent(data);
  } catch {
    return null;
  }
}

export async function getHighlightedEvent(): Promise<Event | null> {
  try {
    const data = await apiGet<ApiEvent | null>("/events/highlighted");
    return data ? toEvent(data) : null;
  } catch {
    return null;
  }
}

export async function getEventsByCategory(category: string): Promise<Event[]> {
  try {
    const data = await apiGet<ApiListResponse>(`/events?category=${category}&limit=50`);
    return data.items.map(toEvent);
  } catch {
    return [];
  }
}

export async function getFreeEvents(): Promise<Event[]> {
  try {
    const data = await apiGet<ApiListResponse>("/events?limit=50");
    return data.items.map(toEvent).filter((e) => e.isFree);
  } catch {
    return [];
  }
}

export async function getUpcomingEvents(limit = 6): Promise<Event[]> {
  try {
    const data = await apiGet<ApiEvent[]>(`/events/upcoming?limit=${limit}`);
    return data.map(toEvent);
  } catch {
    return [];
  }
}

export async function getRelatedEvents(slug: string, category: string, limit = 3): Promise<Event[]> {
  try {
    const data = await apiGet<ApiEvent[]>(`/events/${slug}/related?category=${category}`);
    return data.slice(0, limit).map(toEvent);
  } catch {
    return [];
  }
}

export async function getEventSlugs(): Promise<string[]> {
  try {
    const data = await apiGet<ApiListResponse>("/events?limit=200");
    return data.items.map((e) => e.slug);
  } catch {
    return [];
  }
}

// ─── Special Dates (remain as mock — editorial calendar, no API) ──────────────

export async function getSpecialDatesToday(): Promise<SpecialDate[]> {
  return getTodaySpecialDates();
}

export async function getUpcomingDates(days = 7): Promise<SpecialDate[]> {
  return getUpcomingSpecialDates(days);
}
