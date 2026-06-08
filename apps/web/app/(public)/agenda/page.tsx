import { Metadata } from "next";
import { getAllEvents, getHighlightedEvent, getUpcomingDates } from "@/services/events.service";
import { AgendaClient } from "./agenda-client";
import { SITE_NAME } from "@/lib/constants";

export const revalidate = 60;

export const metadata: Metadata = {
  title: `Agenda Cultural | ${SITE_NAME}`,
  description: "Shows, festivais, feiras e atrações culturais de Manaus e do Amazonas.",
};

export default async function AgendaPage() {
  const [events, featured, upcomingDates] = await Promise.all([
    getAllEvents(),
    getHighlightedEvent(),
    getUpcomingDates(7),
  ]);

  return (
    <AgendaClient
      events={events}
      featured={featured}
      upcomingDates={upcomingDates}
    />
  );
}
