export type ArtworkMotif = "arcs" | "bands" | "diamond" | "sun";

export interface StoreCategory {
  id: string;
  slug: string;
  name: string;
  eyebrow?: string;
  description: string;
  trustNote?: string;
  accent: string;
}

export interface StoreColor {
  name: string;
  hex: string;
}

export interface StoreArtwork {
  label: string;
  base: string;
  accent: string;
  detail: string;
  motif: ArtworkMotif;
}

export interface StoreProduct {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  eyebrow?: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  badge?: "Novo" | "Destaque" | "Colecao";
  featured: boolean;
  newArrival: boolean;
  colors: StoreColor[];
  sizes: string[];
  materials: string[];
  highlights: string[];
  trustNote?: string;
  featuredReason?: string;
  bundleText?: string;
  shippingNote?: string;
  artworks: StoreArtwork[];
}

export const storeCategories: StoreCategory[] = [
  {
    id: "cat-saias",
    slug: "saias",
    name: "Saias",
    eyebrow: "Movimento autoral",
    description:
      "Saias de roda e modelagens amplas com presença forte, giro generoso e acabamento pensado para permanência.",
    trustNote: "Peças centrais para composições de impacto, com leitura clara de movimento e assinatura.",
    accent: "#4F658F",
  },
  {
    id: "cat-ojas",
    slug: "ojas",
    name: "Ojás",
    eyebrow: "Camadas de identidade",
    description:
      "Faixas, amarrações e tecidos de cabeça que organizam presença, gesto e intenção dentro da coleção.",
    trustNote: "Categoria preparada para receber novos itens autorais ligados a amarração, rito e composição.",
    accent: "#7F9642",
  },
  {
    id: "cat-panos",
    slug: "panos-das-costas",
    name: "Panos das Costas",
    eyebrow: "Presença em extensão",
    description:
      "Peças de apoio e extensão visual para montar composições com caimento, memória têxtil e força simbólica.",
    trustNote: "Categoria aberta para panos e sobreposições com leitura editorial e uso cerimonial.",
    accent: "#5A7340",
  },
  {
    id: "cat-lancamentos",
    slug: "lancamentos",
    name: "Lançamentos",
    eyebrow: "Novidades da vitrine",
    description:
      "Entradas recentes do acervo com leitura editorial, presença comercial e prioridade na vitrine da coleção.",
    trustNote: "Seleção atualizada para destacar o que acabou de chegar e orientar a compra com rapidez.",
    accent: "#B8C88E",
  },
];

export const storeProducts: StoreProduct[] = [
  {
    id: "prod-alvorada",
    slug: "saia-alvorada-de-roda",
    name: "Saia Alvorada de Roda",
    categorySlug: "saias",
    eyebrow: "Saia de giro amplo",
    shortDescription:
      "Saia de roda com volume firme, cintura confortável e leitura visual marcante para composições de presença.",
    description:
      "A Saia Alvorada foi construída para valorizar movimento, giro e composição com peças lisas ou camadas têxteis. A roda abre com leveza e mantém estrutura visual, entregando um resultado forte em fotos, celebrações e uso cultural. O tecido mistura resistência e fluidez para acompanhar diferentes ocasiões.",
    price: 239.9,
    badge: "Novo",
    featured: true,
    newArrival: true,
    colors: [
      { name: "Azul Profundo", hex: "#10256B" },
      { name: "Verde Oliva", hex: "#7F9642" },
    ],
    sizes: ["P", "M", "G", "GG"],
    materials: ["Tricoline pesada", "Forro leve"],
    highlights: [
      "Cintura confortável com melhor ajuste",
      "Amplitude generosa de roda",
      "Acabamento pensado para composições rituais e editoriais",
    ],
    trustNote: "Indicada para composições de presença com leitura firme e movimento destacado.",
    featuredReason: "Peça de alto impacto visual para vitrines e editoriais.",
    bundleText: "Funciona bem com faixa em oliva claro e composições de cabeça na mesma paleta.",
    shippingNote: "Equipe auxilia na escolha do tamanho e na composição do look completo.",
    artworks: [
      { label: "Frente", base: "#10256B", accent: "#7F9642", detail: "#B8C88E", motif: "bands" },
      { label: "Movimento", base: "#142654", accent: "#F8F5ED", detail: "#4F658F", motif: "diamond" },
    ],
  },
  {
    id: "prod-faixa",
    slug: "faixa-dourado-fosco",
    name: "Faixa Dourado Fosco",
    categorySlug: "lancamentos",
    eyebrow: "Complemento de brilho contido",
    shortDescription:
      "Faixa têxtil com brilho controlado, usada para finalizar a composição com unidade e presença.",
    description:
      "A Faixa Dourado Fosco funciona como acabamento visual para saias, panos e outras camadas da coleção. O toque é macio, o brilho é discreto e a tonalidade conversa com a paleta principal da marca. É uma peça versátil que eleva a composição sem roubar a cena.",
    price: 79.9,
    featured: false,
    newArrival: false,
    colors: [
      { name: "Oliva Claro", hex: "#B8C88E" },
      { name: "Azul Profundo", hex: "#10256B" },
    ],
    sizes: ["Único"],
    materials: ["Tecido acetinado fosco"],
    highlights: [
      "Brilho discreto e elegante",
      "Ajuste versátil",
      "Combina com a coleção inteira",
    ],
    trustNote: "Acessório de finalização pensado para venda combinada.",
    featuredReason: "Ajuda a aumentar o ticket sem perder coerência de marca.",
    bundleText: "Ideal para somar a saias, panos e entradas recentes da vitrine.",
    shippingNote: "Atendimento sugere as melhores combinações por cor e uso.",
    artworks: [
      { label: "Frente", base: "#B8C88E", accent: "#10256B", detail: "#F8F5ED", motif: "bands" },
      { label: "Textura", base: "#C9D7A8", accent: "#4F658F", detail: "#10256B", motif: "diamond" },
    ],
  },
  {
    id: "prod-pano",
    slug: "pano-de-cabeca-folha-profunda",
    name: "Pano de Cabeça Folha Profunda",
    categorySlug: "lancamentos",
    eyebrow: "Acessório de assinatura",
    shortDescription:
      "Pano de cabeça em tom profundo, com toque suave e acabamento limpo para composições autorais.",
    description:
      "O Pano de Cabeça Folha Profunda foi desenhado para complementar o visual com sofisticação e presença. O tecido tem boa acomodação, volume controlado e tonalidade intensa, permitindo diferentes amarrações e leituras visuais. Funciona como peça de apoio e também como elemento protagonista.",
    price: 89.9,
    badge: "Novo",
    featured: true,
    newArrival: true,
    colors: [
      { name: "Verde Folha Profunda", hex: "#5A7340" },
      { name: "Offwhite Ritual", hex: "#F8F5ED" },
    ],
    sizes: ["Único"],
    materials: ["Malha premium", "Toque macio"],
    highlights: [
      "Boa maleabilidade para amarrações",
      "Cor profunda e elegante",
      "Acabamento limpo para uso recorrente",
    ],
    trustNote: "Permite montar looks autorais com orientação humana no fechamento.",
    featuredReason: "Traz protagonismo sem exigir uma produção inteira.",
    bundleText: "Funciona especialmente bem com saias amplas e faixas em tons terrosos ou profundos.",
    shippingNote: "Suporte no WhatsApp para propor amarrações e coordenações.",
    artworks: [
      { label: "Frente", base: "#5A7340", accent: "#F8F5ED", detail: "#B8C88E", motif: "sun" },
      { label: "Drapeado", base: "#405B36", accent: "#10256B", detail: "#F8F5ED", motif: "arcs" },
    ],
  },
];

export function getStoreCategoryBySlug(slug: string) {
  return storeCategories.find((category) => category.slug === slug);
}

export function getStoreProductBySlug(slug: string) {
  return storeProducts.find((product) => product.slug === slug);
}

export function getFeaturedProducts() {
  return storeProducts.filter((product) => product.featured);
}

export function getNewArrivals() {
  return storeProducts.filter((product) => product.newArrival);
}
