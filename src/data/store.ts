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
    id: "cat-vestidos",
    slug: "saias-ojas-e-panos-das-costas",
    name: "Saias, Ojás e Panos das Costas",
    eyebrow: "Presenca em camadas",
    description:
      "Saias de roda, ojas e panos das costas com leitura forte, movimento autoral e acabamento pensado para presenca.",
    trustNote: "Pecas de composicao ampla para vestir gesto, ritual e assinatura com mais corpo visual.",
    accent: "#4F658F",
  },
  {
    id: "cat-batas",
    slug: "camisas-e-batas",
    name: "Camisas e Batas",
    eyebrow: "Base ritual contemporanea",
    description:
      "Pecas de presenca limpa, caimento firme e visual contemporaneo para rituais, encontros e uso cotidiano.",
    trustNote: "Bases versateis para coordenar com saias, calcas e acessorios da colecao.",
    accent: "#7F9642",
  },
  {
    id: "cat-conjuntos",
    slug: "conjuntos-rituais",
    name: "Conjuntos Rituais",
    eyebrow: "Composicao pronta",
    description:
      "Combinacoes coordenadas para quem busca unidade visual, conforto e forca simbolica sem excesso.",
    trustNote: "Silhuetas completas para quem quer vestir presenca com menos friccao.",
    accent: "#5A7340",
  },
  {
    id: "cat-acessorios",
    slug: "lancamentos",
    name: "Lançamentos",
    eyebrow: "Novidades da vitrine",
    description:
      "Entradas recentes do acervo com leitura editorial, presenca comercial e prioridade na vitrine da colecao.",
    trustNote: "Selecao atualizada para destacar o que acabou de chegar e orientar a compra com rapidez.",
    accent: "#B8C88E",
  },
];

export const storeProducts: StoreProduct[] = [
  {
    id: "prod-ori",
    slug: "vestido-ori-areia",
    name: "Vestido Ori Areia",
    categorySlug: "saias-ojas-e-panos-das-costas",
    eyebrow: "Vestido manifesto",
    shortDescription:
      "Vestido longo de presenca serena, com cintura marcada e volume controlado para um visual imponente e acolhedor.",
    description:
      "O Vestido Ori Areia foi pensado para criar presenca sem rigidez. A modelagem alongada acompanha o corpo com conforto, enquanto o tecido encorpado mantem leitura elegante em cerimonias, festas e producoes autorais. O acabamento prioriza mobilidade, caimento limpo e uma paleta quente que conversa com a estetica ritual contemporanea da marca.",
    price: 289.9,
    compareAtPrice: 329.9,
    badge: "Destaque",
    featured: true,
    newArrival: false,
    colors: [
      { name: "Offwhite Ritual", hex: "#F8F5ED" },
      { name: "Azul da Marca", hex: "#4F658F" },
    ],
    sizes: ["P", "M", "G", "GG"],
    materials: ["Viscose premium", "Algodao estruturado"],
    highlights: [
      "Saia com movimento amplo",
      "Costura reforcada para uso recorrente",
      "Visual equilibrado entre tradicao e moda atual",
    ],
    trustNote: "Pedido assistido no WhatsApp para confirmar medidas, combinacoes e disponibilidade.",
    featuredReason: "Silhueta longa e firme para abrir a colecao com elegancia imediata.",
    bundleText: "Combine com Faixa Dourado Fosco para uma leitura mais cerimonial.",
    shippingNote: "Atendimento online para todo o Brasil com orientacao humana na finalizacao.",
    artworks: [
      { label: "Frente", base: "#F8F5ED", accent: "#7F9642", detail: "#B8C88E", motif: "arcs" },
      { label: "Detalhe", base: "#FCFAF4", accent: "#4F658F", detail: "#B8C88E", motif: "sun" },
    ],
  },
  {
    id: "prod-alvorada",
    slug: "saia-alvorada-de-roda",
    name: "Saia Alvorada de Roda",
    categorySlug: "saias-ojas-e-panos-das-costas",
    eyebrow: "Saia de giro amplo",
    shortDescription:
      "Saia de roda com volume firme, cintura confortavel e leitura visual marcante para composicoes de presenca.",
    description:
      "A Saia Alvorada foi construida para valorizar movimento, giro e composicao com batas, camisas ou pecas lisas. A roda abre com leveza e mantem estrutura visual, entregando um resultado forte em fotos, celebracoes e uso cultural. O tecido mistura resistencia e fluidez para acompanhar diferentes ocasioes.",
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
      "Cintura confortavel com melhor ajuste",
      "Amplitude generosa de roda",
      "Acabamento pensado para composicoes rituais e editoriais",
    ],
    trustNote: "Indicada para composicoes com batas e camisas de leitura forte.",
    featuredReason: "Peca de alto impacto visual para vitrines e editoriais.",
    bundleText: "Funciona bem com Bata Axe Branca e faixa em oliva claro.",
    shippingNote: "Equipe auxilia na escolha do tamanho e na composicao do look completo.",
    artworks: [
      { label: "Frente", base: "#10256B", accent: "#7F9642", detail: "#B8C88E", motif: "bands" },
      { label: "Movimento", base: "#142654", accent: "#F8F5ED", detail: "#4F658F", motif: "diamond" },
    ],
  },
  {
    id: "prod-axe",
    slug: "bata-axe-branca",
    name: "Bata Axe Branca",
    categorySlug: "camisas-e-batas",
    eyebrow: "Bata de base nobre",
    shortDescription:
      "Bata de linhas limpas e gola marcada, desenvolvida para compor visual claro, sofisticado e funcional.",
    description:
      "A Bata Axe Branca traduz o essencial da Loja do Guerreiro: presenca, conforto e acabamento honesto. A peca traz volume controlado nas mangas, gola estruturada e comprimento pensado para uso solto ou coordenado com saias e calcas. Ideal para quem deseja uma base versatil com identidade forte.",
    price: 189.9,
    featured: true,
    newArrival: false,
    colors: [
      { name: "Branco Ritual", hex: "#FCFAF4" },
      { name: "Oliva Claro", hex: "#B8C88E" },
    ],
    sizes: ["P", "M", "G", "GG", "XG"],
    materials: ["Algodao penteado", "Linho misto"],
    highlights: [
      "Caimento leve com presenca",
      "Gola com acabamento limpo",
      "Peca-chave para bases monocromaticas",
    ],
    trustNote: "Base versatil para pedidos assistidos e composicoes sob medida.",
    featuredReason: "Entrada ideal para clientes que querem comecar pela colecao.",
    bundleText: "Combine com Saia Alvorada ou Conjunto Terra Sagrada para um look coordenado.",
    shippingNote: "Suporte humano para definir combinacoes de tamanho e caimento.",
    artworks: [
      { label: "Frente", base: "#FCFAF4", accent: "#B8C88E", detail: "#5A7340", motif: "sun" },
      { label: "Detalhe", base: "#F8F5ED", accent: "#10256B", detail: "#B8C88E", motif: "bands" },
    ],
  },
  {
    id: "prod-raiz",
    slug: "camisa-raiz-obsidiana",
    name: "Camisa Raiz Obsidiana",
    categorySlug: "camisas-e-batas",
    eyebrow: "Camisa de tom profundo",
    shortDescription:
      "Camisa de corte reto, tom profundo e acabamento seco para looks de forte assinatura visual.",
    description:
      "A Camisa Raiz Obsidiana traz uma leitura urbana e ritual ao mesmo tempo. A construcao reta, o punho limpo e a base escura criam um visual sobrio, poderoso e adaptavel. E uma peca que sustenta bem tanto producoes completas quanto combinacoes minimalistas.",
    price: 209.9,
    compareAtPrice: 249.9,
    badge: "Colecao",
    featured: false,
    newArrival: true,
    colors: [
      { name: "Azul Profundo", hex: "#10256B" },
      { name: "Verde Folha Profunda", hex: "#5A7340" },
    ],
    sizes: ["P", "M", "G", "GG"],
    materials: ["Sarja leve", "Viscose fosca"],
    highlights: [
      "Leitura forte em tons escuros",
      "Modelagem confortavel para uso prolongado",
      "Combina com saias, calcas ou conjuntos",
    ],
    trustNote: "Boa opcao para quem busca uma peca escura com assinatura e flexibilidade.",
    featuredReason: "Traz densidade visual e ajuda a equilibrar a paleta da vitrine.",
    bundleText: "Use com faixa, pano das costas ou outras entradas recentes da vitrine para ampliar a composição.",
    shippingNote: "Atendimento acompanha disponibilidade e sugestoes de coordenacao.",
    artworks: [
      { label: "Frente", base: "#10256B", accent: "#5A7340", detail: "#B8C88E", motif: "arcs" },
      { label: "Textura", base: "#0F1D47", accent: "#7F9642", detail: "#F8F5ED", motif: "bands" },
    ],
  },
  {
    id: "prod-ogu",
    slug: "conjunto-ogu-verde-profundo",
    name: "Conjunto Ogu Verde Profundo",
    categorySlug: "conjuntos-rituais",
    eyebrow: "Coordenado de presenca",
    shortDescription:
      "Conjunto coordenado com camisa ampla e calca reta, pensado para conforto, firmeza e presenca contemporanea.",
    description:
      "O Conjunto Ogu Verde Profundo organiza o visual de forma imediata. A composicao equilibra volume na parte superior e estrutura na inferior, criando uma silhueta segura e moderna. A cor profunda e os detalhes foscos reforcam um acabamento sofisticado sem perder proximidade com o publico.",
    price: 369.9,
    badge: "Destaque",
    featured: true,
    newArrival: true,
    colors: [
      { name: "Verde Folha Profunda", hex: "#5A7340" },
      { name: "Oliva Claro", hex: "#B8C88E" },
    ],
    sizes: ["P", "M", "G", "GG"],
    materials: ["Linho misto", "Algodao premium"],
    highlights: [
      "Look coordenado pronto para vestir",
      "Caimento equilibrado entre conforto e estrutura",
      "Visual de colecao com assinatura forte",
    ],
    trustNote: "Pensado para quem quer sair com a composicao principal resolvida.",
    featuredReason: "Resume a proposta da marca em uma silhueta forte e comercial.",
    bundleText: "Finalize com Pano de Cabeca Folha Profunda para elevar a assinatura.",
    shippingNote: "Orientacao de medidas e disponibilidade diretamente no atendimento.",
    artworks: [
      { label: "Frente", base: "#5A7340", accent: "#B8C88E", detail: "#F8F5ED", motif: "diamond" },
      { label: "Detalhe", base: "#476337", accent: "#10256B", detail: "#B8C88E", motif: "sun" },
    ],
  },
  {
    id: "prod-obaluae",
    slug: "conjunto-terra-sagrada",
    name: "Conjunto Terra Sagrada",
    categorySlug: "conjuntos-rituais",
    eyebrow: "Conjunto de tons quentes",
    shortDescription:
      "Camadas em tons terrosos com leitura forte e amigavel, para quem busca um visual de impacto sem excesso.",
    description:
      "Terra Sagrada une camisa de caimento leve e saia ou calca coordenada em tons quentes. O resultado e uma composicao acolhedora, contemporanea e fotogenica, com textura visual que valoriza movimento. E uma peca central para o manifesto visual da colecao.",
    price: 349.9,
    featured: false,
    newArrival: true,
    colors: [
      { name: "Oliva Terreno", hex: "#7F9642" },
      { name: "Offwhite Ritual", hex: "#F8F5ED" },
    ],
    sizes: ["P", "M", "G", "GG"],
    materials: ["Viscose texturizada", "Linho misto"],
    highlights: [
      "Coordenacao pronta para ocasioes especiais",
      "Tons quentes com apelo editorial",
      "Estrutura visual amigavel e marcante",
    ],
    trustNote: "Boa escolha para quem quer impacto visual sem excesso de informacao.",
    featuredReason: "Mistura acolhimento comercial e imagem forte para venda assistida.",
    bundleText: "Pode ser finalizado com faixa ou acessorio textil em tons mais claros.",
    shippingNote: "Atendimento apoia a montagem do pedido e da combinacao completa.",
    artworks: [
      { label: "Frente", base: "#7F9642", accent: "#F8F5ED", detail: "#B8C88E", motif: "arcs" },
      { label: "Costas", base: "#4F658F", accent: "#F8F5ED", detail: "#5A7340", motif: "bands" },
    ],
  },
  {
    id: "prod-faixa",
    slug: "faixa-dourado-fosco",
    name: "Faixa Dourado Fosco",
    categorySlug: "lancamentos",
    eyebrow: "Complemento de brilho contido",
    shortDescription:
      "Faixa textil com brilho controlado, usada para finalizar a composicao com unidade e presenca.",
    description:
      "A Faixa Dourado Fosco funciona como acabamento visual para vestidos, batas e conjuntos. O toque e macio, o brilho e discreto e a tonalidade conversa com a paleta principal da marca. E um acessorio versatil que eleva a composicao sem roubar a cena.",
    price: 79.9,
    featured: false,
    newArrival: false,
    colors: [
      { name: "Oliva Claro", hex: "#B8C88E" },
      { name: "Azul Profundo", hex: "#10256B" },
    ],
    sizes: ["Unico"],
    materials: ["Tecido acetinado fosco"],
    highlights: [
      "Brilho discreto e elegante",
      "Ajuste versatil",
      "Combina com a colecao inteira",
    ],
    trustNote: "Acessorio de finalizacao pensado para venda combinada.",
    featuredReason: "Ajuda a aumentar ticket sem perder coerencia de marca.",
    bundleText: "Ideal para ser somada a vestidos, batas e conjuntos da colecao.",
    shippingNote: "Atendimento sugere as melhores combinacoes por cor e uso.",
    artworks: [
      { label: "Frente", base: "#B8C88E", accent: "#10256B", detail: "#F8F5ED", motif: "bands" },
      { label: "Textura", base: "#C9D7A8", accent: "#4F658F", detail: "#10256B", motif: "diamond" },
    ],
  },
  {
    id: "prod-pano",
    slug: "pano-de-cabeca-folha-profunda",
    name: "Pano de Cabeca Folha Profunda",
    categorySlug: "lancamentos",
    eyebrow: "Acessorio de assinatura",
    shortDescription:
      "Pano de cabeca em tom profundo, com toque suave e acabamento limpo para composicoes autorais.",
    description:
      "O Pano de Cabeca Folha Profunda foi desenhado para complementar o visual com sofisticacao e presenca. O tecido tem boa acomodacao, volume controlado e tonalidade intensa, permitindo diferentes amarracoes e leituras visuais. Funciona como peca de apoio e tambem como elemento protagonista.",
    price: 89.9,
    badge: "Novo",
    featured: true,
    newArrival: true,
    colors: [
      { name: "Verde Folha Profunda", hex: "#5A7340" },
      { name: "Offwhite Ritual", hex: "#F8F5ED" },
    ],
    sizes: ["Unico"],
    materials: ["Malha premium", "Toque macio"],
    highlights: [
      "Boa maleabilidade para amarracoes",
      "Cor profunda e elegante",
      "Acabamento limpo para uso recorrente",
    ],
    trustNote: "Permite montar looks autorais com orientacao humana no fechamento.",
    featuredReason: "Traz protagonismo sem exigir uma producao inteira.",
    bundleText: "Funciona especialmente bem com Conjunto Ogu e Camisa Raiz.",
    shippingNote: "Suporte no WhatsApp para propor amarracoes e coordenacoes.",
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
