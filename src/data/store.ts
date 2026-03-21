export type ArtworkMotif = "arcs" | "bands" | "diamond" | "sun";

export interface StoreCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
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
  artworks: StoreArtwork[];
}

export const storeCategories: StoreCategory[] = [
  {
    id: "cat-vestidos",
    slug: "vestidos-e-saias",
    name: "Vestidos e Saias",
    description:
      "Modelagens fluidas, presença de roda e acabamento pensado para movimento, celebração e elegância.",
    accent: "#6E2230",
  },
  {
    id: "cat-batas",
    slug: "camisas-e-batas",
    name: "Camisas e Batas",
    description:
      "Peças de presença limpa, caimento firme e visual contemporâneo para rituais, encontros e uso cotidiano.",
    accent: "#A14F2A",
  },
  {
    id: "cat-conjuntos",
    slug: "conjuntos-rituais",
    name: "Conjuntos Rituais",
    description:
      "Combinações coordenadas para quem busca unidade visual, conforto e força simbólica sem excesso.",
    accent: "#2F5D50",
  },
  {
    id: "cat-acessorios",
    slug: "acessorios-texteis",
    name: "Acessórios Têxteis",
    description:
      "Faixas, panos e complementos que finalizam a composição com textura, cor e identidade.",
    accent: "#C6A15B",
  },
];

export const storeProducts: StoreProduct[] = [
  {
    id: "prod-ori",
    slug: "vestido-ori-areia",
    name: "Vestido Ori Areia",
    categorySlug: "vestidos-e-saias",
    shortDescription:
      "Vestido longo de presença serena, com cintura marcada e volume controlado para um visual imponente e acolhedor.",
    description:
      "O Vestido Ori Areia foi pensado para criar presença sem rigidez. A modelagem alongada acompanha o corpo com conforto, enquanto o tecido encorpado mantém leitura elegante em cerimônias, festas e produções autorais. O acabamento prioriza mobilidade, caimento limpo e uma paleta quente que conversa com a estética ritual contemporânea da marca.",
    price: 289.9,
    compareAtPrice: 329.9,
    badge: "Destaque",
    featured: true,
    newArrival: false,
    colors: [
      { name: "Areia Ritual", hex: "#E8DCCB" },
      { name: "Vinho de Palma", hex: "#6E2230" },
    ],
    sizes: ["P", "M", "G", "GG"],
    materials: ["Viscose premium", "Algodão estruturado"],
    highlights: [
      "Saia com movimento amplo",
      "Costura reforçada para uso recorrente",
      "Visual equilibrado entre tradição e moda atual",
    ],
    artworks: [
      { label: "Frente", base: "#E8DCCB", accent: "#A14F2A", detail: "#C6A15B", motif: "arcs" },
      { label: "Detalhe", base: "#F4ECE1", accent: "#6E2230", detail: "#C6A15B", motif: "sun" },
    ],
  },
  {
    id: "prod-alvorada",
    slug: "saia-alvorada-de-roda",
    name: "Saia Alvorada de Roda",
    categorySlug: "vestidos-e-saias",
    shortDescription:
      "Saia de roda com volume firme, cintura confortável e leitura visual marcante para composições de presença.",
    description:
      "A Saia Alvorada foi construída para valorizar movimento, giro e composição com batas, camisas ou peças lisas. A roda abre com leveza e mantém estrutura visual, entregando um resultado forte em fotos, celebrações e uso cultural. O tecido mistura resistência e fluidez para acompanhar diferentes ocasiões.",
    price: 239.9,
    badge: "Novo",
    featured: true,
    newArrival: true,
    colors: [
      { name: "Obsidiana", hex: "#111111" },
      { name: "Argila Queimada", hex: "#A14F2A" },
    ],
    sizes: ["P", "M", "G", "GG"],
    materials: ["Tricoline pesada", "Forro leve"],
    highlights: [
      "Cintura confortável com melhor ajuste",
      "Amplitude generosa de roda",
      "Acabamento pensado para composições rituais e editoriais",
    ],
    artworks: [
      { label: "Frente", base: "#111111", accent: "#A14F2A", detail: "#C6A15B", motif: "bands" },
      { label: "Movimento", base: "#2B1C1A", accent: "#E8DCCB", detail: "#6E2230", motif: "diamond" },
    ],
  },
  {
    id: "prod-axe",
    slug: "bata-axe-branca",
    name: "Bata Axé Branca",
    categorySlug: "camisas-e-batas",
    shortDescription:
      "Bata de linhas limpas e gola marcada, desenvolvida para compor visual claro, sofisticado e funcional.",
    description:
      "A Bata Axé Branca traduz o essencial da Loja do Guerreiro: presença, conforto e acabamento honesto. A peça traz volume controlado nas mangas, gola estruturada e comprimento pensado para uso solto ou coordenado com saias e calças. Ideal para quem deseja uma base versátil com identidade forte.",
    price: 189.9,
    featured: true,
    newArrival: false,
    colors: [
      { name: "Branco Ritual", hex: "#F7F2EB" },
      { name: "Dourado Fosco", hex: "#C6A15B" },
    ],
    sizes: ["P", "M", "G", "GG", "XG"],
    materials: ["Algodão penteado", "Linho misto"],
    highlights: [
      "Caimento leve com presença",
      "Gola com acabamento limpo",
      "Peça-chave para bases monocromáticas",
    ],
    artworks: [
      { label: "Frente", base: "#F7F2EB", accent: "#C6A15B", detail: "#2F5D50", motif: "sun" },
      { label: "Detalhe", base: "#E8DCCB", accent: "#111111", detail: "#C6A15B", motif: "bands" },
    ],
  },
  {
    id: "prod-raiz",
    slug: "camisa-raiz-obsidiana",
    name: "Camisa Raiz Obsidiana",
    categorySlug: "camisas-e-batas",
    shortDescription:
      "Camisa de corte reto, tom profundo e acabamento seco para looks de forte assinatura visual.",
    description:
      "A Camisa Raiz Obsidiana traz uma leitura urbana e ritual ao mesmo tempo. A construção reta, o punho limpo e a base escura criam um visual sóbrio, poderoso e adaptável. É uma peça que sustenta bem tanto produções completas quanto combinações minimalistas.",
    price: 209.9,
    compareAtPrice: 249.9,
    badge: "Colecao",
    featured: false,
    newArrival: true,
    colors: [
      { name: "Obsidiana", hex: "#111111" },
      { name: "Verde Folha Profunda", hex: "#2F5D50" },
    ],
    sizes: ["P", "M", "G", "GG"],
    materials: ["Sarja leve", "Viscose fosca"],
    highlights: [
      "Leitura forte em tons escuros",
      "Modelagem confortável para uso prolongado",
      "Combina com saias, calças ou conjuntos",
    ],
    artworks: [
      { label: "Frente", base: "#111111", accent: "#2F5D50", detail: "#C6A15B", motif: "arcs" },
      { label: "Textura", base: "#1B1B1B", accent: "#A14F2A", detail: "#E8DCCB", motif: "bands" },
    ],
  },
  {
    id: "prod-ogu",
    slug: "conjunto-ogu-verde-profundo",
    name: "Conjunto Ogu Verde Profundo",
    categorySlug: "conjuntos-rituais",
    shortDescription:
      "Conjunto coordenado com camisa ampla e calça reta, pensado para conforto, firmeza e presença contemporânea.",
    description:
      "O Conjunto Ogu Verde Profundo organiza o visual de forma imediata. A composição equilibra volume na parte superior e estrutura na inferior, criando uma silhueta segura e moderna. A cor profunda e os detalhes foscos reforçam um acabamento sofisticado sem perder proximidade com o público.",
    price: 369.9,
    badge: "Destaque",
    featured: true,
    newArrival: true,
    colors: [
      { name: "Verde Folha Profunda", hex: "#2F5D50" },
      { name: "Dourado Fosco", hex: "#C6A15B" },
    ],
    sizes: ["P", "M", "G", "GG"],
    materials: ["Linho misto", "Algodão premium"],
    highlights: [
      "Look coordenado pronto para vestir",
      "Caimento equilibrado entre conforto e estrutura",
      "Visual de coleção com assinatura forte",
    ],
    artworks: [
      { label: "Frente", base: "#2F5D50", accent: "#C6A15B", detail: "#E8DCCB", motif: "diamond" },
      { label: "Detalhe", base: "#274F44", accent: "#111111", detail: "#C6A15B", motif: "sun" },
    ],
  },
  {
    id: "prod-obaluae",
    slug: "conjunto-terra-sagrada",
    name: "Conjunto Terra Sagrada",
    categorySlug: "conjuntos-rituais",
    shortDescription:
      "Camadas em tons terrosos com leitura forte e amigável, para quem busca um visual de impacto sem excesso.",
    description:
      "Terra Sagrada une camisa de caimento leve e saia ou calça coordenada em tons quentes. O resultado é uma composição acolhedora, contemporânea e fotogênica, com textura visual que valoriza movimento. É uma peça central para o manifesto visual da coleção.",
    price: 349.9,
    featured: false,
    newArrival: true,
    colors: [
      { name: "Argila Queimada", hex: "#A14F2A" },
      { name: "Areia Ritual", hex: "#E8DCCB" },
    ],
    sizes: ["P", "M", "G", "GG"],
    materials: ["Viscose texturizada", "Linho misto"],
    highlights: [
      "Coordenação pronta para ocasiões especiais",
      "Tons quentes com apelo editorial",
      "Estrutura visual amigável e marcante",
    ],
    artworks: [
      { label: "Frente", base: "#A14F2A", accent: "#E8DCCB", detail: "#C6A15B", motif: "arcs" },
      { label: "Costas", base: "#6E2230", accent: "#E8DCCB", detail: "#2F5D50", motif: "bands" },
    ],
  },
  {
    id: "prod-faixa",
    slug: "faixa-dourado-fosco",
    name: "Faixa Dourado Fosco",
    categorySlug: "acessorios-texteis",
    shortDescription:
      "Faixa têxtil com brilho controlado, usada para finalizar a composição com unidade e presença.",
    description:
      "A Faixa Dourado Fosco funciona como acabamento visual para vestidos, batas e conjuntos. O toque é macio, o brilho é discreto e a tonalidade conversa com a paleta principal da marca. É um acessório versátil que eleva a composição sem roubar a cena.",
    price: 79.9,
    featured: false,
    newArrival: false,
    colors: [
      { name: "Dourado Fosco", hex: "#C6A15B" },
      { name: "Obsidiana", hex: "#111111" },
    ],
    sizes: ["Único"],
    materials: ["Tecido acetinado fosco"],
    highlights: [
      "Brilho discreto e elegante",
      "Ajuste versátil",
      "Combina com a coleção inteira",
    ],
    artworks: [
      { label: "Frente", base: "#C6A15B", accent: "#111111", detail: "#E8DCCB", motif: "bands" },
      { label: "Textura", base: "#D9B87C", accent: "#6E2230", detail: "#111111", motif: "diamond" },
    ],
  },
  {
    id: "prod-pano",
    slug: "pano-de-cabeca-folha-profunda",
    name: "Pano de Cabeça Folha Profunda",
    categorySlug: "acessorios-texteis",
    shortDescription:
      "Pano de cabeça em tom profundo, com toque suave e acabamento limpo para composições autorais.",
    description:
      "O Pano de Cabeça Folha Profunda foi desenhado para complementar o visual com sofisticação e presença. O tecido tem boa acomodação, volume controlado e tonalidade intensa, permitindo diferentes amarrações e leituras visuais. Funciona como peça de apoio e também como elemento protagonista.",
    price: 89.9,
    badge: "Novo",
    featured: true,
    newArrival: true,
    colors: [
      { name: "Verde Folha Profunda", hex: "#2F5D50" },
      { name: "Areia Ritual", hex: "#E8DCCB" },
    ],
    sizes: ["Único"],
    materials: ["Malha premium", "Toque macio"],
    highlights: [
      "Boa maleabilidade para amarrações",
      "Cor profunda e elegante",
      "Acabamento limpo para uso recorrente",
    ],
    artworks: [
      { label: "Frente", base: "#2F5D50", accent: "#E8DCCB", detail: "#C6A15B", motif: "sun" },
      { label: "Drapeado", base: "#23483F", accent: "#111111", detail: "#E8DCCB", motif: "arcs" },
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
