export type Article = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: number;
  views: number;
  isLive?: boolean;
  isFeatured?: boolean;
  isSponsored?: boolean;
  sponsor?: string;
};

export type Category = {
  slug: string;
  name: string;
};

export type Columnist = {
  id: string;
  slug: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  avatar: string;
  articleIds: string[];
  social?: { twitter?: string; instagram?: string };
};
