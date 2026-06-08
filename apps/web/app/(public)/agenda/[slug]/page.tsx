import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, MapPin, Tag, Users } from "lucide-react";
import {
  getEventBySlug,
  getRelatedEvents,
} from "@/services/events.service";
import { EVENT_CATEGORIES, formatEventDate, formatEventDateLong } from "@/lib/agenda-data";
import { EventCard } from "@/components/agenda/event-card";

export const revalidate = 300;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Evento não encontrado" };
  return { title: event.title, description: event.description };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const cat = EVENT_CATEGORIES[event.category];
  const related = await getRelatedEvents(slug, event.category, 3);
  const hasEndDate = event.endDate && event.endDate !== event.date;

  return (
    <main className="min-h-screen bg-surface">
      <div className="relative h-[400px] md:h-[520px]">
        <Image src={event.image} alt={event.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/20" />

        <div className="absolute left-4 top-4 md:left-8 md:top-8">
          <Link
            href="/agenda"
            className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            <ArrowLeft size={15} />
            Agenda
          </Link>
        </div>

        <div className="absolute left-4 bottom-8 right-4 md:left-8 md:right-8">
          <div className="flex flex-wrap gap-2">
            <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wide ${cat.bg} ${cat.color}`}>
              {cat.emoji} {cat.label}
            </span>
            {event.isFree && (
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase text-emerald-700">
                Gratuito
              </span>
            )}
            {event.isSponsored && (
              <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-black uppercase text-gold-dark">
                Patrocinado por {event.sponsor}
              </span>
            )}
          </div>
          <h1 className="mt-3 text-3xl font-black leading-tight tracking-[-0.04em] text-white md:text-5xl">
            {event.title}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <Calendar size={15} className="text-gold" />
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">Data</p>
                  <p className="text-sm font-black text-navy">
                    {formatEventDate(event.date)}
                    {hasEndDate && ` – ${formatEventDate(event.endDate!)}`}
                  </p>
                </div>
              </div>

              {event.time && (
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <Clock size={15} className="text-gold" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">Horário</p>
                    <p className="text-sm font-black text-navy">{event.time}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <MapPin size={15} className="text-gold" />
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">Local</p>
                  <p className="text-sm font-black text-navy">{event.venue}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-black text-navy">Sobre o evento</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{event.description}</p>
            </div>

            {event.tags && event.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <Tag size={13} className="text-slate-400" />
                {event.tags.map((tag) => (
                  <span key={tag} className="rounded-xl border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-5 py-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  Ingresso / Entrada
                </p>
                <p className={`mt-1 text-3xl font-black ${event.isFree ? "text-emerald-600" : "text-navy"}`}>
                  {event.isFree ? "Gratuito" : event.price}
                </p>
                {event.ageRating && (
                  <p className="mt-1 text-xs text-slate-400">Classificação: {event.ageRating}</p>
                )}
              </div>
              <div className="space-y-3 px-5 py-4">
                {event.organizer && (
                  <div className="flex items-start gap-2">
                    <Users size={13} className="mt-0.5 shrink-0 text-slate-400" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">Organização</p>
                      <p className="text-xs font-semibold text-navy">{event.organizer}</p>
                    </div>
                  </div>
                )}
                {event.neighborhood && (
                  <div className="flex items-start gap-2">
                    <MapPin size={13} className="mt-0.5 shrink-0 text-slate-400" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">Bairro</p>
                      <p className="text-xs font-semibold text-navy">{event.neighborhood}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <Calendar size={13} className="mt-0.5 shrink-0 text-slate-400" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">Quando</p>
                    <p className="text-xs font-semibold capitalize text-navy">
                      {formatEventDateLong(event.date)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/agenda"
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy transition hover:bg-slate-50"
            >
              <ArrowLeft size={14} />
              Ver todos os eventos
            </Link>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="mb-6 text-lg font-black text-navy">
              Outros eventos de {cat.label}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((e) => (
                <EventCard key={e.id} event={e} variant="default" />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
