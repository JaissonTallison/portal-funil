"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
  title: string;
};

export function ListingGallery({ images, title }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-3">
      {/* MAIN IMAGE */}
      <div className="relative h-[320px] overflow-hidden rounded-[32px] md:h-[440px]">
        <Image
          src={images[active]}
          alt={`${title} — foto ${active + 1}`}
          fill
          className="object-cover"
          priority
        />

        {images.length > 1 && (
          <>
            <button
              onClick={() => setActive((p) => (p === 0 ? images.length - 1 : p - 1))}
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-2xl bg-white/90 text-navy shadow-lg backdrop-blur-sm transition hover:bg-white"
              aria-label="Foto anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setActive((p) => (p === images.length - 1 ? 0 : p + 1))}
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-2xl bg-white/90 text-navy shadow-lg backdrop-blur-sm transition hover:bg-white"
              aria-label="Próxima foto"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* COUNTER */}
        <div className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur-sm">
          <span className="text-xs font-bold text-white">
            {active + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* THUMBNAILS */}
      {images.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative h-[72px] w-[96px] shrink-0 overflow-hidden rounded-2xl transition ${
                i === active
                  ? "ring-2 ring-gold ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${title} — miniatura ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
