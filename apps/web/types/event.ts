export type EventCategory =
  | "show"
  | "festival"
  | "feira"
  | "gastronomia"
  | "turismo"
  | "municipal"
  | "cultura";

export type Event = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: EventCategory;
  image: string;
  date: string;
  endDate?: string;
  time?: string;
  endTime?: string;
  venue: string;
  neighborhood?: string;
  price?: string;
  isFree: boolean;
  ageRating?: string;
  organizer?: string;
  isHighlighted?: boolean;
  isSponsored?: boolean;
  sponsor?: string;
  tags?: string[];
};

export type SpecialDateCategory =
  | "profissao"
  | "historico"
  | "cultural"
  | "social"
  | "ambiental"
  | "amazonia";

export type SpecialDate = {
  id: string;
  monthDay: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  category: SpecialDateCategory;
  hashtag: string;
};
