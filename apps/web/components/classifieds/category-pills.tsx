"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Car,
  Home,
  Package,
  Shirt,
  Smartphone,
  Sofa,
  Wrench,
} from "lucide-react";
import { LISTING_CATEGORIES } from "@/lib/classifieds";

const iconMap: Record<string, LucideIcon> = {
  Smartphone,
  Car,
  Home,
  Sofa,
  Shirt,
  Wrench,
  Briefcase,
  Package,
};

type Props = {
  active?: string;
};

export function CategoryPills({ active }: Props) {
  return (
    <div className="scrollbar-hide flex gap-2.5 overflow-x-auto pb-1">
      <Link
        href="/classificados"
        className={`flex shrink-0 items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 ${
          !active
            ? "border-gold/40 bg-gold/10 text-navy"
            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
        }`}
      >
        Todos
      </Link>

      {LISTING_CATEGORIES.map((cat) => {
        const Icon = iconMap[cat.icon];
        const isActive = active === cat.slug;

        return (
          <Link
            key={cat.slug}
            href={`/classificados?categoria=${cat.slug}`}
            className={`flex shrink-0 items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 ${
              isActive
                ? "border-gold/40 bg-gold/10 text-navy"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
          >
            {Icon && <Icon size={15} className={isActive ? "text-gold-dark" : "text-slate-400"} />}
            {cat.name}
          </Link>
        );
      })}
    </div>
  );
}
