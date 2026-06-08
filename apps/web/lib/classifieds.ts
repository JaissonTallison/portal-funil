// Importa para uso no escopo e re-exporta para retrocompatibilidade
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
  { value: "venda", label: "Venda" },
  { value: "compra", label: "Compra" },
  { value: "servico", label: "Serviço" },
  { value: "emprego", label: "Emprego" },
  { value: "outro", label: "Outro" },
];

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

export const listings: Listing[] = [
  {
    id: "1",
    title: "iPhone 15 Pro Max 256GB — Novo, lacrado",
    description: "iPhone 15 Pro Max 256GB na cor Titânio Natural. Aparelho novo, lacrado, com nota fiscal. Garantia Apple de 1 ano. Aceito troca em iPhone 14 Pro com volta.",
    category: "eletronicos",
    type: "venda",
    price: 7899,
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=800",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=800",
    ],
    contact: {
      name: "Carlos Mendes",
      phone: "(92) 99123-4567",
      email: "carlos.mendes@email.com",
      whatsapp: "5592991234567",
      location: "Adrianópolis, Manaus",
    },
    status: "ativo",
    views: 342,
    createdAt: "2026-05-18T10:00:00Z",
    updatedAt: "2026-05-18T10:00:00Z",
    isFeatured: true,
  },
  {
    id: "2",
    title: "Honda Civic EXL 2024 — 12 mil km",
    description: "Honda Civic EXL 2024, cor prata, 12 mil km rodados. Único dono, todas as revisões na concessionária. IPVA 2026 pago. Aceito financiamento.",
    category: "veiculos",
    type: "venda",
    price: 159900,
    images: [
      "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?q=80&w=800",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?q=80&w=800",
    ],
    contact: {
      name: "Roberto Silva",
      phone: "(92) 98765-4321",
      email: "roberto.silva@email.com",
      whatsapp: "5592987654321",
      location: "Flores, Manaus",
    },
    status: "ativo",
    views: 891,
    createdAt: "2026-05-17T14:30:00Z",
    updatedAt: "2026-05-17T14:30:00Z",
    isFeatured: true,
  },
  {
    id: "3",
    title: "Apartamento 3 quartos — Ponta Negra",
    description: "Apartamento de 98m² com 3 quartos (1 suíte), varanda gourmet, 2 vagas de garagem. Condomínio com piscina, academia e playground. Pronto para morar.",
    category: "imoveis",
    type: "venda",
    price: 520000,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800",
    ],
    contact: {
      name: "Imobiliária Prime",
      phone: "(92) 3234-5678",
      email: "contato@primeimob.com.br",
      whatsapp: "5592932345678",
      location: "Ponta Negra, Manaus",
    },
    status: "ativo",
    views: 1203,
    createdAt: "2026-05-16T09:00:00Z",
    updatedAt: "2026-05-19T08:00:00Z",
    isFeatured: true,
  },
  {
    id: "4",
    title: "Eletricista residencial e comercial",
    description: "Serviços de instalação elétrica, manutenção preventiva e corretiva, troca de fiação, instalação de chuveiros, tomadas e disjuntores. Atendo toda Manaus. Orçamento grátis.",
    category: "servicos",
    type: "servico",
    price: null,
    images: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800",
    ],
    contact: {
      name: "João Eletricista",
      phone: "(92) 99876-5432",
      email: "joao.eletricista@email.com",
      whatsapp: "5592998765432",
      location: "Cidade Nova, Manaus",
    },
    status: "ativo",
    views: 156,
    createdAt: "2026-05-19T07:00:00Z",
    updatedAt: "2026-05-19T07:00:00Z",
  },
  {
    id: "5",
    title: "Vaga: Desenvolvedor Full-Stack — Remoto",
    description: "Empresa de tecnologia em Manaus busca desenvolvedor full-stack com experiência em React, Node.js e PostgreSQL. Regime CLT, trabalho 100% remoto. Benefícios: VA, plano de saúde, PLR.",
    category: "empregos",
    type: "emprego",
    price: 8500,
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800",
    ],
    contact: {
      name: "TechAmazon RH",
      phone: "(92) 3456-7890",
      email: "vagas@techamazon.com.br",
      location: "Distrito Industrial, Manaus",
    },
    status: "ativo",
    views: 567,
    createdAt: "2026-05-18T16:00:00Z",
    updatedAt: "2026-05-18T16:00:00Z",
    isFeatured: true,
  },
  {
    id: "6",
    title: "Sofá retrátil 3 lugares — seminovo",
    description: "Sofá retrátil e reclinável, 3 lugares, tecido suede cinza. Comprado há 8 meses, em perfeito estado. Vendo por mudança. Entrego em Manaus.",
    category: "moveis",
    type: "venda",
    price: 1200,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800",
    ],
    contact: {
      name: "Mariana Costa",
      phone: "(92) 99234-5678",
      email: "mariana.costa@email.com",
      whatsapp: "5592992345678",
      location: "Parque 10, Manaus",
    },
    status: "ativo",
    views: 89,
    createdAt: "2026-05-19T11:00:00Z",
    updatedAt: "2026-05-19T11:00:00Z",
  },
  {
    id: "7",
    title: "Notebook Dell Inspiron i5 16GB RAM",
    description: "Notebook Dell Inspiron 15, processador Intel Core i5 12ª geração, 16GB RAM, SSD 512GB, tela Full HD. Usado por 6 meses, sem marcas. Acompanha carregador original.",
    category: "eletronicos",
    type: "venda",
    price: 3200,
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800",
    ],
    contact: {
      name: "Felipe Araújo",
      phone: "(92) 99345-6789",
      email: "felipe.araujo@email.com",
      whatsapp: "5592993456789",
      location: "Aleixo, Manaus",
    },
    status: "ativo",
    views: 234,
    createdAt: "2026-05-17T08:30:00Z",
    updatedAt: "2026-05-17T08:30:00Z",
  },
  {
    id: "8",
    title: "Procuro: Apartamento para alugar — 2 quartos",
    description: "Procuro apartamento para alugar na região do Adrianópolis ou Vieiralves. 2 quartos, de preferência com garagem. Orçamento de até R$ 2.500/mês. Tenho referências.",
    category: "imoveis",
    type: "compra",
    price: 2500,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800",
    ],
    contact: {
      name: "Amanda Oliveira",
      phone: "(92) 99456-7890",
      email: "amanda.oliveira@email.com",
      whatsapp: "5592994567890",
      location: "Adrianópolis, Manaus",
    },
    status: "ativo",
    views: 45,
    createdAt: "2026-05-19T13:00:00Z",
    updatedAt: "2026-05-19T13:00:00Z",
  },
  {
    id: "9",
    title: "Design gráfico e identidade visual",
    description: "Criação de logotipos, identidade visual completa, posts para redes sociais, cardápios, banners e materiais gráficos. Portfólio disponível. Atendo PJ e PF.",
    category: "servicos",
    type: "servico",
    price: null,
    images: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800",
    ],
    contact: {
      name: "Studio Criativo AM",
      phone: "(92) 99567-8901",
      email: "contato@studiocriativo.am",
      whatsapp: "5592995678901",
      location: "Centro, Manaus",
    },
    status: "ativo",
    views: 178,
    createdAt: "2026-05-15T10:00:00Z",
    updatedAt: "2026-05-18T10:00:00Z",
  },
  {
    id: "10",
    title: "Moto Honda CG 160 Fan 2023",
    description: "Honda CG 160 Fan 2023, cor vermelha, 8 mil km. Documentação em dia, pneus novos. Parcelo no cartão em até 12x.",
    category: "veiculos",
    type: "venda",
    price: 14500,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800",
    ],
    contact: {
      name: "Thiago Ramos",
      phone: "(92) 99678-9012",
      email: "thiago.ramos@email.com",
      whatsapp: "5592996789012",
      location: "Compensa, Manaus",
    },
    status: "ativo",
    views: 312,
    createdAt: "2026-05-16T15:00:00Z",
    updatedAt: "2026-05-16T15:00:00Z",
  },
  {
    id: "11",
    title: "Vaga: Atendente de loja — Shopping Manauara",
    description: "Loja de roupas no Shopping Manauara contrata atendente. Requisitos: ensino médio completo, boa comunicação, disponibilidade para escala 6x1. Salário + comissão + VT + VR.",
    category: "empregos",
    type: "emprego",
    price: 1800,
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800",
    ],
    contact: {
      name: "Moda Store RH",
      phone: "(92) 3567-8901",
      email: "rh@modastore.com.br",
      location: "Adrianópolis, Manaus",
    },
    status: "ativo",
    views: 423,
    createdAt: "2026-05-19T09:00:00Z",
    updatedAt: "2026-05-19T09:00:00Z",
  },
  {
    id: "12",
    title: "Tênis Nike Air Max 90 — Tam 42",
    description: "Tênis Nike Air Max 90, tamanho 42, cor branca com detalhes pretos. Usado apenas 3 vezes, está praticamente novo. Acompanha caixa original.",
    category: "moda",
    type: "venda",
    price: 450,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=800",
    ],
    contact: {
      name: "Lucas Ferreira",
      phone: "(92) 99789-0123",
      email: "lucas.ferreira@email.com",
      whatsapp: "5592997890123",
      location: "São Jorge, Manaus",
    },
    status: "ativo",
    views: 67,
    createdAt: "2026-05-18T20:00:00Z",
    updatedAt: "2026-05-18T20:00:00Z",
  },
  {
    id: "13",
    title: "Aulas particulares de matemática e física",
    description: "Professor formado em engenharia oferece aulas particulares de matemática e física para ensino médio e pré-vestibular. Atendo a domicílio ou online. Material incluso.",
    category: "servicos",
    type: "servico",
    price: 80,
    images: [
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=800",
    ],
    contact: {
      name: "Prof. Ricardo Nunes",
      phone: "(92) 99890-1234",
      email: "prof.ricardo@email.com",
      whatsapp: "5592998901234",
      location: "Vieiralves, Manaus",
    },
    status: "ativo",
    views: 98,
    createdAt: "2026-05-14T12:00:00Z",
    updatedAt: "2026-05-17T12:00:00Z",
  },
  {
    id: "14",
    title: "PlayStation 5 + 2 controles + 5 jogos",
    description: "PS5 edição com disco, acompanha 2 controles DualSense e 5 jogos: God of War Ragnarök, Spider-Man 2, FIFA 26, GTA V e The Last of Us Part II. Tudo em perfeito estado.",
    category: "eletronicos",
    type: "venda",
    price: 3500,
    images: [
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=800",
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=800",
    ],
    contact: {
      name: "Diego Santos",
      phone: "(92) 99901-2345",
      email: "diego.santos@email.com",
      whatsapp: "5592999012345",
      location: "Dom Pedro, Manaus",
    },
    status: "ativo",
    views: 445,
    createdAt: "2026-05-17T18:00:00Z",
    updatedAt: "2026-05-17T18:00:00Z",
  },
  {
    id: "15",
    title: "Ar-condicionado Split 12000 BTUs — instalado",
    description: "Ar-condicionado Split Electrolux 12000 BTUs, modelo inverter, classe A. Inclui instalação gratuita em Manaus. Garantia de 1 ano. Novo, na caixa.",
    category: "eletronicos",
    type: "venda",
    price: 2100,
    images: [
      "https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=800",
    ],
    contact: {
      name: "Clima Frio Manaus",
      phone: "(92) 3678-9012",
      email: "vendas@climafrio.com.br",
      whatsapp: "5592936789012",
      location: "Cachoeirinha, Manaus",
    },
    status: "ativo",
    views: 267,
    createdAt: "2026-05-15T14:00:00Z",
    updatedAt: "2026-05-19T14:00:00Z",
    isFeatured: true,
  },
  {
    id: "16",
    title: "Bicicleta Caloi Elite Carbon — aro 29",
    description: "Bicicleta Caloi Elite Carbon, aro 29, quadro tamanho M, grupo Shimano Deore XT. Perfeita para trilhas e estradas. Pouco uso, sem riscos no quadro.",
    category: "outros",
    type: "venda",
    price: 6800,
    images: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800",
    ],
    contact: {
      name: "André Bike",
      phone: "(92) 99012-3456",
      email: "andre.bike@email.com",
      whatsapp: "5592990123456",
      location: "Tarumã, Manaus",
    },
    status: "ativo",
    views: 134,
    createdAt: "2026-05-16T11:00:00Z",
    updatedAt: "2026-05-16T11:00:00Z",
  },
];

export function getListingById(id: string): Listing | undefined {
  return listings.find((l) => l.id === id);
}

export function getActiveListings(): Listing[] {
  return listings.filter((l) => l.status === "ativo");
}

export function getFeaturedListings(): Listing[] {
  return listings.filter((l) => l.isFeatured && l.status === "ativo");
}

export function getListingsByCategory(category: string): Listing[] {
  return listings.filter((l) => l.category === category && l.status === "ativo");
}

export function getListingsByType(type: ListingType): Listing[] {
  return listings.filter((l) => l.type === type && l.status === "ativo");
}

export function filterListings(params: {
  category?: string;
  type?: ListingType;
  search?: string;
}): Listing[] {
  let result = getActiveListings();

  if (params.category) {
    result = result.filter((l) => l.category === params.category);
  }

  if (params.type) {
    result = result.filter((l) => l.type === params.type);
  }

  if (params.search) {
    const q = params.search.toLowerCase();
    result = result.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.contact.location.toLowerCase().includes(q)
    );
  }

  return result;
}

export function getRelatedListings(listing: Listing, limit = 4): Listing[] {
  return getActiveListings()
    .filter((l) => l.id !== listing.id && (l.category === listing.category || l.type === listing.type))
    .slice(0, limit);
}
