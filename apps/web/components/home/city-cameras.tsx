"use client";

import Link from "next/link";
import { ArrowUpRight, Camera, Maximize2, Radio, X } from "lucide-react";
import { useState } from "react";

type CameraStatus = "online" | "offline";

interface CameraData {
  id: string;
  location: string;
  zone: string;
  status: CameraStatus;
  viewers: string;
  youtubeId: string | null;
}

const cameras: CameraData[] = [
  {
    id: "CAM-01",
    location: "Teatro Amazonas",
    zone: "Centro Histórico",
    status: "online",
    viewers: "1.2k",
    youtubeId: "2HGGG7Dr03g",
  },
  {
    id: "CAM-02",
    location: "Ponta Negra",
    zone: "Zona Oeste",
    status: "online",
    viewers: "988",
    youtubeId: "eh0fBArfRnk",
  },
  {
    id: "CAM-03",
    location: "Vieiralves",
    zone: "Adrianópolis",
    status: "online",
    viewers: "843",
    youtubeId: "rt_6yTynbkc",
  },
  {
    id: "CAM-04",
    location: "Ponta Negra Lounge",
    zone: "Zona Oeste",
    status: "online",
    viewers: "2.1k",
    youtubeId: "2PS9noNoA6o",
  },
  {
    id: "CAM-05",
    location: "Teatro Amazonas — Jazz",
    zone: "Centro",
    status: "online",
    viewers: "617",
    youtubeId: "gdV5K0TZbwY",
  },
  {
    id: "CAM-06",
    location: "Aeroporto Internacional",
    zone: "Tarumã",
    status: "offline",
    viewers: "0",
    youtubeId: null,
  },
];

export function CityCameras() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeCam = cameras.find((c) => c.youtubeId === activeId) ?? null;
  const onlineCount = cameras.filter((c) => c.status === "online").length;

  return (
    <>
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative overflow-hidden rounded-[40px] bg-navy px-6 py-12 md:px-10">
            {/* ambient glow */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-[10%] top-[-100px] h-[400px] w-[400px] rounded-full bg-gold/5 blur-[160px]" />
              <div className="absolute bottom-[-80px] right-[5%] h-[300px] w-[300px] rounded-full bg-[#1E3A8A]/15 blur-[120px]" />
            </div>

            {/* dot grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            <div className="relative z-10">
              {/* HEADER */}
              <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                      <span className="relative h-2 w-2 rounded-full bg-red-500" />
                    </span>
                    <span className="text-xs font-black uppercase tracking-[0.35em] text-gold">
                      CÂMERAS AO VIVO
                    </span>
                  </div>

                  <h2 className="mt-4 text-5xl font-black tracking-[-0.05em] text-white">
                    Visão da cidade
                  </h2>

                  <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-400">
                    Câmeras estratégicas em pontos críticos de Manaus — cobertura visual
                    em tempo real 24h por dia.
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    <span className="text-sm font-black text-emerald-400">
                      {onlineCount} câmeras online
                    </span>
                  </div>

                  <Link
                    href="/ao-vivo"
                    className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Ver todas
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>

              {/* GRID */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cameras.map((cam) => (
                  <button
                    key={cam.id}
                    onClick={() => cam.youtubeId && setActiveId(cam.youtubeId)}
                    disabled={cam.status === "offline"}
                    className="group relative overflow-hidden rounded-[28px] border border-white/8 bg-[#0B1D35] text-left transition duration-300 hover:-translate-y-1 hover:border-gold/20 hover:shadow-[0_20px_60px_rgba(244,197,66,0.08)] disabled:cursor-default"
                  >
                    {/* THUMBNAIL / IFRAME PREVIEW */}
                    <div className="relative h-[200px] overflow-hidden">
                      {cam.status === "online" && cam.youtubeId ? (
                        <>
                          {/* YouTube thumbnail real */}
                          <img
                            src={`https://img.youtube.com/vi/${cam.youtubeId}/maxresdefault.jpg`}
                            alt={cam.location}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          />
                          {/* scanline overlay */}
                          <div
                            className="pointer-events-none absolute inset-0 opacity-20"
                            style={{
                              backgroundImage:
                                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D35] via-transparent to-transparent" />

                          {/* play button */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600/90 backdrop-blur-sm">
                              <svg className="ml-1 h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-3 bg-[#060E1E]">
                          <Camera size={32} className="text-white/20" />
                          <span className="text-xs font-semibold text-white/30">
                            Câmera offline
                          </span>
                        </div>
                      )}

                      {/* TOP BADGES */}
                      <div className="absolute left-4 top-4 flex items-center gap-2">
                        {cam.status === "online" ? (
                          <div className="flex items-center gap-1.5 rounded-full bg-red-600/90 px-3 py-1.5 backdrop-blur-sm">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                            <span className="text-[10px] font-black uppercase tracking-wider text-white">
                              AO VIVO
                            </span>
                          </div>
                        ) : (
                          <div className="rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-sm">
                            <span className="text-[10px] font-black uppercase tracking-wider text-white/40">
                              OFFLINE
                            </span>
                          </div>
                        )}
                        <div className="rounded-full bg-black/50 px-2.5 py-1.5 backdrop-blur-sm">
                          <span className="text-[10px] font-black text-gold">
                            {cam.id}
                          </span>
                        </div>
                      </div>

                      {/* MAXIMIZE */}
                      {cam.status === "online" && (
                        <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-xl bg-black/40 text-white/50 opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                          <Maximize2 size={14} />
                        </div>
                      )}

                      {/* VIEWERS */}
                      {cam.status === "online" && (
                        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 backdrop-blur-sm">
                          <Radio size={10} className="text-gold" />
                          <span className="text-[10px] font-semibold text-white/70">
                            {cam.viewers}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* BOTTOM INFO */}
                    <div className="flex items-center justify-between px-5 py-4">
                      <div>
                        <h3 className="font-black text-white transition group-hover:text-gold">
                          {cam.location}
                        </h3>
                        <span className="text-xs text-zinc-500">{cam.zone}</span>
                      </div>
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition ${
                          cam.status === "online"
                            ? "bg-gold/10 text-gold group-hover:bg-gold group-hover:text-navy"
                            : "bg-white/5 text-white/20"
                        }`}
                      >
                        <ArrowUpRight size={14} />
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* BOTTOM CTA */}
              <div className="mt-10 text-center">
                <Link
                  href="/ao-vivo"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <Camera size={16} />
                  Ver painel completo de câmeras
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL — YouTube live embed */}
      {activeId && activeCam && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setActiveId(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-[32px] bg-navy shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-white">AO VIVO</span>
                </div>
                <span className="font-black text-white">{activeCam.location}</span>
                <span className="text-sm text-zinc-500">{activeCam.zone}</span>
              </div>
              <button
                onClick={() => setActiveId(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/50 transition hover:bg-white/10 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* IFRAME */}
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${activeId}?autoplay=1&mute=0`}
                title={activeCam.location}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>

            {/* MODAL FOOTER */}
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-xs text-zinc-500">
                Transmissão ao vivo via AmzLive.com.br • Manaus, AM
              </span>
              <a
                href={`https://www.youtube.com/watch?v=${activeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-gold hover:underline"
              >
                Abrir no YouTube
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
