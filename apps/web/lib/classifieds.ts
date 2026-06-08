import type { Listing, ListingCategory, ListingStatus, ListingType } from "@/types/listing";
export type { Listing, ListingCategory, ListingStatus, ListingType };

export const LISTING_CATEGORIES: ListingCategory[] = [
  { slug: "eletronicos", name: "Eletrônicos", icon: "Smartphone" },
  { slug: "veiculos", name: "Veículos", icon: "Car" },
  { slug: "imoveis", name: "Imóveis", icon: "Home" },
  { slug: "moveis", name: "Móveis e Decoração", icon: "Sofa" },
  { slug: "moda", name: "Moda", icon: "Shirt" },
  { slug: "servicos", name: "Serviços", icon: "Wrench" },
  { slug: "empregos", name: "Empregos", icon: "Briefcase" },
  { slug: "outros", name: "Outros", icon: "Package" },
];

export const LISTING_TYPES: { value: ListingType; label: string }[] = [
  { value: "SALE", label: "Venda" },
  { value: "PURCHASE", label: "Compra" },
  { value: "SERVICE", label: "Serviço" },
  { value: "JOB", label: "Emprego" },
  { value: "OTHER", label: "Outro" },
];

export const statusConfig: Record<ListingStatus, { label: string; color: string; bg: string }> = {
  ACTIVE:  { label: "Ativo",     color: "text-emerald-600", bg: "bg-emerald-50" },
  PENDING: { label: "Pendente",  color: "text-amber-600",   bg: "bg-amber-50" },
  PAUSED:  { label: "Pausado",   color: "text-slate-500",   bg: "bg-slate-100" },
  REFUSED: { label: "Recusado",  color: "text-red-600",     bg: "bg-red-50" },
  EXPIRED: { label: "Expirado",  color: "text-slate-400",   bg: "bg-slate-50" },
};

export function getCategoryBySlug(slug: string): ListingCategory | undefined {
  return LISTING_CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryNameBySlug(slug: string): string {
  return LISTING_CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}

export function getTypeName(type: ListingType): string {
  return LISTING_TYPES.find((t) => t.value === type)?.label ?? type;
}

export function formatPrice(price: number | null): string {
  if (price === null) return "A combinar";
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
