export type ListingStatus = "pendente" | "ativo" | "recusado" | "expirado" | "pausado";
export type ListingType = "venda" | "compra" | "servico" | "emprego" | "outro";

export type ListingCategory = {
  slug: string;
  name: string;
  icon: string;
};

export type Listing = {
  id: string;
  title: string;
  description: string;
  category: string;
  type: ListingType;
  price: number | null;
  images: string[];
  contact: {
    name: string;
    phone: string;
    email: string;
    whatsapp?: string;
    location: string;
  };
  status: ListingStatus;
  views: number;
  createdAt: string;
  updatedAt: string;
  isFeatured?: boolean;
};
