export type ListingStatus = "PENDING" | "ACTIVE" | "REFUSED" | "EXPIRED" | "PAUSED";
export type ListingType = "SALE" | "PURCHASE" | "SERVICE" | "JOB" | "OTHER";

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
    whatsapp?: string | null;
    location: string;
  };
  status: ListingStatus;
  views: number;
  isFeatured?: boolean;
  expiresAt?: string | null;
  createdAt: string;
  updatedAt: string;
  user?: { id: string; name: string };
};
