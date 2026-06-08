import type { Event, SpecialDate } from "@/types/event";
import {
  events,
  specialDates,
  getTodaySpecialDates,
  getUpcomingSpecialDates,
} from "@/lib/agenda-data";

export async function getAllEvents(): Promise<Event[]> {
  return events;
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  return events.find((e) => e.slug === slug) ?? null;
}

export async function getHighlightedEvent(): Promise<Event | null> {
  return events.find((e) => e.isHighlighted) ?? null;
}

export async function getEventsByCategory(category: string): Promise<Event[]> {
  return events.filter((e) => e.category === category);
}

export async function getFreeEvents(): Promise<Event[]> {
  return events.filter((e) => e.isFree);
}

export async function getRelatedEvents(current: Event, limit = 3): Promise<Event[]> {
  return events
    .filter((e) => e.id !== current.id && e.category === current.category)
    .slice(0, limit);
}

export async function getSpecialDatesToday(): Promise<SpecialDate[]> {
  return getTodaySpecialDates();
}

export async function getUpcomingDates(days = 7): Promise<SpecialDate[]> {
  return getUpcomingSpecialDates(days);
}
