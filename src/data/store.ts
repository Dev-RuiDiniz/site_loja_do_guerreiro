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

export interface StoreProductPhoto {
  src: string;
  alt: string;
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
  image?: string;
  gallery?: StoreProductPhoto[];
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
    id: "cat-acessorios",
    slug: "acessorios",
    name: "Acessórios",
    eyebrow: "Complementos de presença",
    description:
      "Bolsas e peças de apoio que fecham a composição com função prática e leitura visual autoral.",
    trustNote: "Categoria voltada para acessórios têxteis e peças de apoio com linguagem da coleção.",
    accent: "#C47744",
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
    id: "prod-oja-branco",
    slug: "oja-branco",
    name: "Ojá",
    categorySlug: "ojas",
    eyebrow: "Amarração essencial",
    shortDescription:
      "Ojá branco com toque macio e volume confortável para composições de cabeça com presença limpa.",
    description:
      "O Ojá foi pensado para acompanhar diferentes amarrações com conforto, boa acomodação e leitura visual delicada. A peça funciona tanto em composições cotidianas quanto em montagens cerimoniais, mantendo um desenho limpo e versátil.",
    price: 20,
    badge: "Novo",
    featured: true,
    newArrival: true,
    colors: [{ name: "Branco", hex: "#F3F0E8" }],
    sizes: ["Único"],
    materials: ["Malha leve", "Acabamento macio"],
    highlights: [
      "Boa maleabilidade para amarração",
      "Leitura visual limpa e versátil",
      "Conforto para uso prolongado",
    ],
    trustNote: "Atendimento humano para orientar amarrações e combinações com outras peças.",
    featuredReason: "Peça de entrada acessível e fácil de combinar com a coleção.",
    bundleText: "Combina bem com panos da costa, saias lisas e composições brancas.",
    shippingNote: "A equipe confirma disponibilidade e orienta a melhor combinação pelo WhatsApp.",
    image: "/images/products/oja/branco.jpg",
    gallery: [
      {
        src: "/images/products/oja/branco.jpg",
        alt: "Ojá branco em amarração de cabeça",
      },
    ],
    artworks: [
      { label: "Frente", base: "#F3F0E8", accent: "#D8D0C4", detail: "#FFFFFF", motif: "arcs" },
      { label: "Textura", base: "#E9E2D6", accent: "#B8C88E", detail: "#F8F5ED", motif: "bands" },
    ],
  },
  {
    id: "prod-saia-babados",
    slug: "saia-com-babados",
    name: "Saia com babados",
    categorySlug: "saias",
    eyebrow: "Saia com acabamento rendado",
    shortDescription:
      "Saia ampla com babados e renda na barra para composições de giro, volume e presença marcante.",
    description:
      "A Saia com babados traz uma leitura clássica de movimento com barra trabalhada e caimento amplo. A peça foi pensada para gerar presença visual em looks claros ou escuros, com acabamento que valoriza o giro e cria profundidade na composição.",
    price: 120,
    badge: "Novo",
    featured: true,
    newArrival: true,
    colors: [
      { name: "Branco", hex: "#F4F1EA" },
      { name: "Preto", hex: "#131313" },
    ],
    sizes: ["Único"],
    materials: ["Tecido leve", "Renda aplicada"],
    highlights: [
      "Barra com babados e textura rendada",
      "Modelagem ampla para movimento",
      "Versão clara e escura na mesma linha",
    ],
    trustNote: "Atendimento ajuda a comparar as versões e sugerir coordenações com panos e ojas.",
    featuredReason: "Silhueta de impacto com leitura forte de movimento e acabamento.",
    bundleText: "Pode ser combinada com ojá branco, panos da costa e blusas lisas da coleção.",
    shippingNote: "Suporte no WhatsApp para confirmar caimento, altura e composição final.",
    image: "/images/products/saia-com-babados/branco.jpg",
    gallery: [
      {
        src: "/images/products/saia-com-babados/branco.jpg",
        alt: "Saia com babados na cor branca",
      },
      {
        src: "/images/products/saia-com-babados/preta.jpg",
        alt: "Saia com babados na cor preta",
      },
    ],
    artworks: [
      { label: "Branco", base: "#F4F1EA", accent: "#D7D0C4", detail: "#FFFFFF", motif: "bands" },
      { label: "Preto", base: "#1C1C1C", accent: "#454545", detail: "#0D0D0D", motif: "diamond" },
    ],
  },
  {
    id: "prod-pano-costa",
    slug: "pano-da-costa",
    name: "Pano da Costa",
    categorySlug: "panos-das-costas",
    eyebrow: "Sobreposição de composição",
    shortDescription:
      "Pano da Costa em diferentes cores e estampas para complementar o visual com caimento e presença.",
    description:
      "O Pano da Costa funciona como camada de composição para ampliar a leitura do look com gesto, cor e textura. A peça é versátil e pode ser usada em diferentes combinações, com variações de azul, azul-marinho, verde e vermelho dentro da mesma proposta.",
    price: 30,
    badge: "Novo",
    featured: true,
    newArrival: true,
    colors: [
      { name: "Azul", hex: "#385ACB" },
      { name: "Azul-marinho", hex: "#162A7A" },
      { name: "Verde", hex: "#7AD3C6" },
      { name: "Vermelho", hex: "#C22D24" },
    ],
    sizes: ["Único"],
    materials: ["Tecido leve", "Acabamentos variados"],
    highlights: [
      "Quatro variações visuais na mesma peça",
      "Camada complementar para composição",
      "Boa leitura em looks claros ou escuros",
    ],
    trustNote: "A equipe ajuda a indicar a cor que conversa melhor com a saia e a proposta do look.",
    featuredReason: "Peça versátil que amplia a composição com pouco custo e alta presença visual.",
    bundleText: "Funciona com saias amplas, ojá branco e composições de mesma paleta.",
    shippingNote: "Pedido assistido para confirmar a variação desejada antes do fechamento.",
    image: "/images/products/pano-da-costa/azul.jpg",
    gallery: [
      {
        src: "/images/products/pano-da-costa/azul.jpg",
        alt: "Pano da Costa azul com faixa lateral bordada",
      },
      {
        src: "/images/products/pano-da-costa/verde.jpg",
        alt: "Pano da Costa verde estampado",
      },
      {
        src: "/images/products/pano-da-costa/azul-marinho.jpg",
        alt: "Pano da Costa azul-marinho bordado",
      },
      {
        src: "/images/products/pano-da-costa/vermelho.jpg",
        alt: "Pano da Costa vermelho com bordado dourado",
      },
    ],
    artworks: [
      { label: "Azul", base: "#385ACB", accent: "#8FB0FF", detail: "#E8EEFF", motif: "bands" },
      { label: "Verde", base: "#7AD3C6", accent: "#265C5B", detail: "#B8FFF6", motif: "sun" },
    ],
  },
  {
    id: "prod-saia-estrelinha",
    slug: "saia-estrelinha",
    name: "Saia estrelinha",
    categorySlug: "saias",
    eyebrow: "Saia acetinada estampada",
    shortDescription:
      "Saia azul acetinada com barra estrelada para looks luminosos, festivos e de forte leitura visual.",
    description:
      "A Saia estrelinha combina brilho acetinado, cintura confortável e uma barra estampada que conduz o olhar. A peça funciona bem como protagonista do look e mantém um caimento amplo, com presença lúdica e acabamento pensado para composições autorais.",
    price: 150,
    badge: "Novo",
    featured: true,
    newArrival: true,
    colors: [{ name: "Azul claro", hex: "#95BFEF" }],
    sizes: ["Único"],
    materials: ["Cetim", "Faixa estampada"],
    highlights: [
      "Brilho acetinado com movimento amplo",
      "Barra estampada com estrelas coloridas",
      "Peça protagonista para composições festivas",
    ],
    trustNote: "Atendimento ajuda a fechar o look completo e sugerir acessórios na mesma linguagem.",
    featuredReason: "Peça protagonista com leitura lúdica, brilho forte e identidade imediata.",
    bundleText: "Pode ser combinada com a Bolsa Saco de Doces para criar uma composição coordenada.",
    shippingNote: "A equipe confirma medidas e orienta sobre comprimento e cintura pelo WhatsApp.",
    image: "/images/products/saia-estrelinha/principal.jpg",
    gallery: [
      {
        src: "/images/products/saia-estrelinha/principal.jpg",
        alt: "Saia estrelinha azul acetinada com barra estampada",
      },
    ],
    artworks: [
      { label: "Frente", base: "#95BFEF", accent: "#F4C14E", detail: "#8BE0D2", motif: "sun" },
      { label: "Barra", base: "#87B3E8", accent: "#2B5DB9", detail: "#F29A4A", motif: "diamond" },
    ],
  },
  {
    id: "prod-bolsa-doces",
    slug: "bolsa-saco-de-doces",
    name: "Bolsa Saco de Doces",
    categorySlug: "acessorios",
    eyebrow: "Bolsa têxtil coordenada",
    shortDescription:
      "Bolsa leve com estampa de estrelas para completar a composição com praticidade e linguagem autoral.",
    description:
      "A Bolsa Saco de Doces foi criada para acompanhar looks leves e coordenados, trazendo um ponto de cor e funcionalidade para a composição. A estampa conversa diretamente com a Saia estrelinha, mas a peça também funciona sozinha como acessório de apoio visual.",
    price: 30,
    badge: "Novo",
    featured: false,
    newArrival: true,
    colors: [{ name: "Estampada", hex: "#9DDFF0" }],
    sizes: ["Único"],
    materials: ["Tecido estampado", "Alça têxtil"],
    highlights: [
      "Leve e prática para composições festivas",
      "Estampa estrelada coordenada com a saia",
      "Boa leitura visual mesmo em looks simples",
    ],
    trustNote: "Atendimento indica combinações e confirma disponibilidade junto com outras peças da coleção.",
    featuredReason: "Acessório funcional que fecha a composição sem competir com a peça principal.",
    bundleText: "Fica especialmente coordenada com a Saia estrelinha e looks em azul claro.",
    shippingNote: "Pedido finalizado com apoio humano para montar o conjunto completo.",
    image: "/images/products/bolsa-saco-de-doces/close.png",
    gallery: [
      {
        src: "/images/products/bolsa-saco-de-doces/look-completo.jpg",
        alt: "Bolsa Saco de Doces compondo o look completo com saia azul",
      },
      {
        src: "/images/products/bolsa-saco-de-doces/close.png",
        alt: "Close da Bolsa Saco de Doces com estampa estrelada",
      },
    ],
    artworks: [
      { label: "Look", base: "#9DDFF0", accent: "#F4B942", detail: "#2E67C7", motif: "diamond" },
      { label: "Close", base: "#84D0E3", accent: "#F28A43", detail: "#8AD9C8", motif: "bands" },
    ],
  },
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
