import Link from "next/link";
import { Zap } from "lucide-react";

type Headline = { title: string; slug: string; time: string };

export function BreakingNews({ headlines }: { headlines: Headline[] }) {
  if (headlines.length === 0) return null;

  return (
    <section className="relative z-30 w-full">
      <div className="flex min-h-[76px] overflow-hidden shadow-[0_8px_32px_rgba(7,20,38,0.20)] sm:min-h-[84px]">

        {/* BREAKING NEWS — badge vermelho */}
        <div className="flex shrink-0 flex-col items-start justify-center gap-1 bg-red-600 px-4 py-4 sm:px-6">
          <span className="text-[13px] font-black italic uppercase leading-none tracking-tight text-white sm:text-[15px]">
            Breaking
          </span>
          <span className="flex items-center gap-1 text-[13px] font-black italic uppercase leading-none tracking-tight text-white sm:text-[15px]">
            News
            <Zap size={13} className="fill-gold text-gold" />
          </span>
        </div>

        {/* TICKER */}
        <div className="relative flex flex-1 items-center overflow-hidden bg-navy py-4">
          <div className="flex animate-breaking items-center whitespace-nowrap">
            {[...headlines, ...headlines].map((item, index) => (
              <div
                key={index}
                className="flex shrink-0 items-start gap-2.5 px-6"
              >
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                <div className="max-w-[240px] whitespace-normal sm:max-w-[300px]">
                  <Link
                    href={`/noticias/${item.slug}`}
                    className="line-clamp-2 text-[13px] font-bold leading-snug text-white transition hover:text-gold"
                  >
                    {item.title}
                  </Link>
                  <span className="mt-1.5 block text-[11px] tabular-nums text-white/40">
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* fade direita */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-navy to-transparent" />
        </div>

      </div>
    </section>
  );
}
