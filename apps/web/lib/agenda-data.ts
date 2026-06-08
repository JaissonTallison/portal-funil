// Importa explicitamente para sobrescrever Event global do DOM e re-exporta para retrocompatibilidade
import type { Event, EventCategory, SpecialDate, SpecialDateCategory } from "@/types/event";
export type { Event, EventCategory, SpecialDate, SpecialDateCategory };

// ─── METADADOS DE CATEGORIA ───────────────────────────────────────────────────

export const EVENT_CATEGORIES: Record<
  EventCategory,
  { label: string; color: string; bg: string; emoji: string }
> = {
  show:        { label: "Show",        color: "text-purple-700", bg: "bg-purple-50 border-purple-200",   emoji: "🎤" },
  festival:    { label: "Festival",    color: "text-orange-700", bg: "bg-orange-50 border-orange-200",   emoji: "🎪" },
  feira:       { label: "Feira",       color: "text-green-700",  bg: "bg-green-50 border-green-200",     emoji: "🏪" },
  gastronomia: { label: "Gastronomia", color: "text-red-700",    bg: "bg-red-50 border-red-200",         emoji: "🍽️" },
  turismo:     { label: "Turismo",     color: "text-sky-700",    bg: "bg-sky-50 border-sky-200",         emoji: "🌿" },
  municipal:   { label: "Municipal",   color: "text-blue-700",   bg: "bg-blue-50 border-blue-200",       emoji: "🏛️" },
  cultura:     { label: "Cultura",     color: "text-amber-700",  bg: "bg-amber-50 border-amber-200",     emoji: "🎭" },
};

// ─── MOCK DE EVENTOS ──────────────────────────────────────────────────────────

export const events: Event[] = [
  {
    id: "e1",
    slug: "festival-sabores-amazonia-shopping-manauara",
    title: "Festival Sabores da Amazônia",
    description:
      "20 restaurantes com menus exclusivos inspirados na culinária regional. Chefs renomados com pratos de tucupi, jambu, pirarucu e frutas amazônicas. Shows de artistas locais e oficinas de culinária todos os finais de semana.",
    category: "gastronomia",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070",
    date: "2026-05-24",
    endDate: "2026-06-08",
    time: "12:00",
    endTime: "22:00",
    venue: "Shopping Manauara",
    neighborhood: "Adrianópolis",
    price: "R$ 39,90 – R$ 89,90",
    isFree: false,
    ageRating: "Livre",
    organizer: "Shopping Manauara",
    isHighlighted: true,
    isSponsored: true,
    sponsor: "Shopping Manauara",
    tags: ["gastronomia", "amazônia", "culinária regional"],
  },
  {
    id: "e2",
    slug: "ensaio-aberto-boi-caprichoso-flores",
    title: "Ensaio Aberto do Boi Caprichoso",
    description:
      "Ensaio geral do Boi Bumbá Caprichoso com apresentação das alegorias e toadas do Festival de Parintins 2026. Entrada gratuita para a comunidade.",
    category: "cultura",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070",
    date: "2026-05-25",
    time: "19:00",
    venue: "Curral do Caprichoso",
    neighborhood: "Flores",
    price: "Gratuito",
    isFree: true,
    ageRating: "Livre",
    organizer: "Boi Bumbá Caprichoso",
    isHighlighted: true,
    tags: ["boi bumbá", "parintins", "cultura amazônica"],
  },
  {
    id: "e3",
    slug: "feira-artesanato-amazonico-centro-cultural",
    title: "Feira de Artesanato Amazônico",
    description:
      "Mais de 80 artesãos expondo trabalhos em palha, madeira, sementes, cerâmica marajoara e tecidos regionais. Espaço de resgate da identidade cultural do Amazonas.",
    category: "feira",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=2070",
    date: "2026-05-24",
    endDate: "2026-05-26",
    time: "09:00",
    endTime: "18:00",
    venue: "Centro Cultural Palácio Rio Negro",
    neighborhood: "Centro",
    price: "Gratuito",
    isFree: true,
    ageRating: "Livre",
    organizer: "Secretaria de Cultura do AM",
    tags: ["artesanato", "cultura", "amazônia"],
  },
  {
    id: "e4",
    slug: "show-ana-castela-arena-amadeu-teixeira",
    title: "Ana Castela — Turnê Boiada Chic 2026",
    description:
      "A maior cantora do agronejo do Brasil em Manaus! Ana Castela apresenta sucessos do novo álbum com banda completa e produção cenográfica inédita na Arena Amadeu Teixeira.",
    category: "show",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070",
    date: "2026-05-31",
    time: "21:00",
    venue: "Arena Amadeu Teixeira",
    neighborhood: "Dom Pedro",
    price: "R$ 80 – R$ 320",
    isFree: false,
    ageRating: "16 anos",
    organizer: "T4F Entretenimento",
    isHighlighted: true,
    tags: ["show", "música", "sertanejo"],
  },
  {
    id: "e5",
    slug: "exposicao-rio-negro-alma-amazonia-museu",
    title: "Exposição: Rio Negro — Alma da Amazônia",
    description:
      "Mostra fotográfica com 120 imagens que retratam a biodiversidade, as comunidades ribeirinhas e as paisagens únicas do Rio Negro. Entrada a preço social.",
    category: "cultura",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2070",
    date: "2026-05-24",
    endDate: "2026-06-30",
    time: "09:00",
    endTime: "17:00",
    venue: "Museu do Seringal Vila Paraíso",
    neighborhood: "Ponta Negra",
    price: "R$ 10",
    isFree: false,
    ageRating: "Livre",
    organizer: "IPHAN Amazonas",
    tags: ["fotografia", "rio negro", "natureza"],
  },
  {
    id: "e6",
    slug: "corrida-verde-parque-mindu",
    title: "5ª Corrida Verde — Parque do Mindu",
    description:
      "Corrida ecológica no Parque Municipal do Mindu com percursos de 5 km e 10 km. Premiação nas categorias geral e por faixa etária. Inscrições abertas até 28/05.",
    category: "municipal",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070",
    date: "2026-06-01",
    time: "06:00",
    endTime: "10:00",
    venue: "Parque Municipal do Mindu",
    neighborhood: "Parque 10",
    price: "R$ 45",
    isFree: false,
    ageRating: "Livre",
    organizer: "Semmas Manaus",
    tags: ["corrida", "esporte", "meio ambiente"],
  },
  {
    id: "e7",
    slug: "macunaima-teatro-amazonas",
    title: "Macunaíma — Cia. Brasileira de Teatro",
    description:
      "O herói sem nenhum caráter de Mário de Andrade em montagem contemporânea premiada. Espetáculo com elementos da cultura amazônica e cenografia imersiva.",
    category: "cultura",
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=2070",
    date: "2026-05-28",
    endDate: "2026-06-07",
    time: "20:00",
    venue: "Teatro Amazonas",
    neighborhood: "Centro",
    price: "R$ 30 – R$ 80",
    isFree: false,
    ageRating: "12 anos",
    organizer: "Secretaria de Cultura do AM",
    isHighlighted: true,
    tags: ["teatro", "macunaíma", "cultura"],
  },
  {
    id: "e8",
    slug: "festival-peixe-ornamental-rio-negro",
    title: "Festival do Peixe Ornamental do Rio Negro",
    description:
      "Evento reúne pescadores, pesquisadores e empreendedores do setor, com exposição de espécies nativas, palestras técnicas e rodadas de negócios.",
    category: "festival",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070",
    date: "2026-06-05",
    endDate: "2026-06-07",
    time: "09:00",
    venue: "Cais do Porto de Manaus",
    neighborhood: "Centro",
    price: "Gratuito",
    isFree: true,
    ageRating: "Livre",
    organizer: "IBAMA / SEBRAE AM",
    tags: ["peixe", "rio negro", "amazônia", "turismo"],
  },
  {
    id: "e9",
    slug: "tour-gastronomico-flutuantes-ponta-negra",
    title: "Tour Gastronômico nos Flutuantes de Ponta Negra",
    description:
      "Passeio guiado pelos flutuantes históricos de Ponta Negra com degustação de pratos típicos da culinária ribeirinha e pôr do sol no Rio Negro.",
    category: "gastronomia",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070",
    date: "2026-05-30",
    time: "18:00",
    endTime: "22:00",
    venue: "Flutuante Rei dos Peixes",
    neighborhood: "Ponta Negra",
    price: "R$ 120",
    isFree: false,
    ageRating: "Livre",
    organizer: "Amazônia Experience",
    tags: ["gastronomia", "turismo", "ponta negra"],
  },
  {
    id: "e10",
    slug: "festival-danca-contemporanea-amazonas",
    title: "Festival Amazonas de Dança Contemporânea",
    description:
      "12 companhias de dança de 6 estados apresentam espetáculos em palcos espalhados pela cidade. Programação diversa com acesso gratuito à maioria das atrações.",
    category: "festival",
    image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=2070",
    date: "2026-06-10",
    endDate: "2026-06-15",
    time: "19:00",
    venue: "Múltiplos palcos — Centro e Zonas",
    neighborhood: "Diversas regiões",
    price: "Gratuito",
    isFree: true,
    ageRating: "Livre",
    organizer: "Secretaria de Cultura do AM",
    tags: ["dança", "festival", "cultura"],
  },
  {
    id: "e11",
    slug: "mercado-artesanal-ponta-negra-sabado",
    title: "Mercado Artesanal de Ponta Negra",
    description:
      "Feira semanal de artesanato, gastronomia e cultura com vista panorâmica para o Rio Negro. Artistas, músicos e produtores locais todas as semanas.",
    category: "feira",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069",
    date: "2026-05-25",
    time: "15:00",
    endTime: "22:00",
    venue: "Calçadão de Ponta Negra",
    neighborhood: "Ponta Negra",
    price: "Gratuito",
    isFree: true,
    ageRating: "Livre",
    organizer: "MANAUSCULT",
    tags: ["feira", "artesanato", "gastronomia", "ponta negra"],
  },
  {
    id: "e12",
    slug: "caminhada-ecologica-encontro-das-aguas",
    title: "Caminhada Ecológica — Encontro das Águas",
    description:
      "Passeio ecológico guiado até o Encontro das Águas com barco, trilha monitorada e observação de fauna silvestre. Vagas limitadas a 20 participantes.",
    category: "turismo",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=2070",
    date: "2026-05-25",
    time: "06:30",
    endTime: "14:00",
    venue: "Porto de Manaus",
    neighborhood: "Centro",
    price: "R$ 85",
    isFree: false,
    ageRating: "Livre",
    organizer: "Amazônia Viva Ecoturismo",
    tags: ["ecoturismo", "encontro das águas", "natureza"],
  },
];

// ─── DATAS ESPECIAIS ──────────────────────────────────────────────────────────

export const specialDates: SpecialDate[] = [
  {
    id: "sd1",
    monthDay: "05-24",
    title: "Dia do Esforço",
    description: "Celebração da dedicação e do trabalho de quem não desiste dos seus sonhos.",
    category: "social",
    emoji: "💪",
    color: "bg-amber-500",
    hashtag: "#DiaDoEsforço",
  },
  {
    id: "sd2",
    monthDay: "05-24",
    title: "Dia do Índio Americano",
    description: "Reconhecimento dos povos indígenas das Américas e de suas culturas ancestrais.",
    category: "historico",
    emoji: "🪶",
    color: "bg-emerald-600",
    hashtag: "#DiaDoÍndio",
  },
  {
    id: "sd3",
    monthDay: "05-25",
    title: "Dia da Ecologia",
    description: "Conscientização ambiental e preservação dos ecossistemas do planeta.",
    category: "ambiental",
    emoji: "🌿",
    color: "bg-green-500",
    hashtag: "#DiaEcologia",
  },
  {
    id: "sd4",
    monthDay: "05-25",
    title: "Dia do Geek",
    description: "Celebração da cultura geek, tecnologia, games e o amor por ciência.",
    category: "cultural",
    emoji: "🤓",
    color: "bg-violet-500",
    hashtag: "#DiaDoGeek",
  },
  {
    id: "sd5",
    monthDay: "05-27",
    title: "Dia do Bibliotecário",
    description: "Homenagem aos profissionais que guardam e difundem o conhecimento humano.",
    category: "profissao",
    emoji: "📚",
    color: "bg-blue-500",
    hashtag: "#DiaBibliotecário",
  },
  {
    id: "sd6",
    monthDay: "05-27",
    title: "Dia Nacional do Voluntário",
    description: "Celebração do espírito solidário dos brasileiros que dedicam seu tempo a causas sociais.",
    category: "social",
    emoji: "🤝",
    color: "bg-rose-500",
    hashtag: "#DiaVoluntário",
  },
  {
    id: "sd7",
    monthDay: "05-28",
    title: "Dia do Músico",
    description: "Homenagem aos artistas que transformam a alma amazônica em música e poesia.",
    category: "profissao",
    emoji: "🎵",
    color: "bg-purple-500",
    hashtag: "#DiaMúsico",
  },
  {
    id: "sd8",
    monthDay: "05-29",
    title: "Dia do Bombeiro",
    description: "Reconhecimento aos heróis que enfrentam chamas e emergências para proteger vidas.",
    category: "profissao",
    emoji: "🚒",
    color: "bg-red-500",
    hashtag: "#DiaBombeiro",
  },
  {
    id: "sd9",
    monthDay: "05-30",
    title: "Dia da Secretária",
    description: "Celebração dos profissionais de secretariado, pilares da organização empresarial.",
    category: "profissao",
    emoji: "💼",
    color: "bg-indigo-500",
    hashtag: "#DiaSecretária",
  },
  {
    id: "sd10",
    monthDay: "06-05",
    title: "Dia do Meio Ambiente",
    description: "Data mundial dedicada à reflexão sobre a preservação dos recursos naturais.",
    category: "ambiental",
    emoji: "🌍",
    color: "bg-green-600",
    hashtag: "#DiaDoMeioAmbiente",
  },
  {
    id: "sd11",
    monthDay: "06-12",
    title: "Dia dos Namorados",
    description: "Celebração do amor e da parceria afetiva no Brasil, especial para casais.",
    category: "cultural",
    emoji: "❤️",
    color: "bg-pink-500",
    hashtag: "#DiaDoNamorados",
  },
  {
    id: "sd12",
    monthDay: "06-14",
    title: "Dia da Amazônia",
    description: "Celebração da maior floresta tropical do mundo e da maior riqueza natural do Brasil.",
    category: "amazonia",
    emoji: "🌳",
    color: "bg-emerald-700",
    hashtag: "#DiaAmazônia",
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

export function getEventBySlug(slug: string): Event | undefined {
  return events.find((e) => e.slug === slug);
}

export function getHighlightedEvents(): Event[] {
  return events.filter((e) => e.isHighlighted);
}

export function getUpcomingEvents(limit?: number): Event[] {
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
  return limit ? sorted.slice(0, limit) : sorted;
}

export function getEventsByCategory(category: EventCategory): Event[] {
  return events.filter((e) => e.category === category);
}

export function getRelatedEvents(current: Event, limit = 3): Event[] {
  return events
    .filter((e) => e.id !== current.id && e.category === current.category)
    .slice(0, limit);
}

export function getSpecialDatesForDay(monthDay: string): SpecialDate[] {
  return specialDates.filter((d) => d.monthDay === monthDay);
}

export function getTodaySpecialDates(): SpecialDate[] {
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return getSpecialDatesForDay(`${mm}-${dd}`);
}

export function getUpcomingSpecialDates(daysAhead = 7): SpecialDate[] {
  const result: SpecialDate[] = [];
  const today = new Date();
  for (let i = 0; i <= daysAhead; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    result.push(...getSpecialDatesForDay(`${mm}-${dd}`));
  }
  return result;
}

export function formatEventDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

export function formatEventDateLong(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
}

export function isEventFree(event: Event): boolean {
  return event.isFree;
}
