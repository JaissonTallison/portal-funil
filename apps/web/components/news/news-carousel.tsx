"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import type { Article } from "@/types/article";
import { getCategoryName } from "@/services/articles.service";
import { timeAgo } from "@/lib/utils";

type Props = { articles: Article[] };

export function NewsCarousel({ articles }: Props) {
  const news = articles.slice(0, 6);

  return (
    <section className="relative px-6 pb-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">
              EDITORIAL EXPERIENCE
            </span>
            <h2 className="mt-4 text-5xl font-black tracking-[-0.05em] text-navy">
              Cobertura premium
            </h2>
          </div>
          <Link
            href="/noticias"
            className="hidden items-center gap-2 rounded-2xl border border-black/5 bg-white px-5 py-3 text-sm font-semibold text-navy shadow-[0_10px_40px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 lg:flex"
          >
            Ver todas
            <ArrowUpRight size={18} />
          </Link>
        </div>

        <Swiper
          slidesPerView={1.2}
          spaceBetween={24}
          freeMode
          modules={[FreeMode]}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
            1280: { slidesPerView: 4 },
          }}
        >
          {news.map((item) => (
            <SwiperSlide key={item.id}>
              <Link
                href={`/noticias/${item.slug}`}
                className="group block overflow-hidden rounded-[36px] border border-black/5 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition duration-500 hover:-translate-y-2"
              >
                <div className="relative h-[300px] overflow-hidden">
                  <Image src={item.image} alt={item.title} fill className="object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute left-5 top-5 flex gap-2">
                    {item.isLive && (
                      <span className="flex items-center gap-1 rounded-full bg-red-500 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-white">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                        Ao vivo
                      </span>
                    )}
                    <span className="rounded-full bg-gold px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-navy">
                      {getCategoryName(item.category)}
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="line-clamp-2 text-xl font-black leading-tight tracking-[-0.04em] text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center justify-between px-6 py-5">
                  <span className="text-sm text-slate-500">{timeAgo(item.publishedAt)}</span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cobalt text-white transition group-hover:bg-navy">
                    <ArrowUpRight size={17} />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
