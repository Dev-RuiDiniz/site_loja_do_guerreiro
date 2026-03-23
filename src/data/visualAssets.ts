export interface VisualAsset {
  id: string;
  src: string;
  alt: string;
  role: "hero" | "panel" | "background" | "overlay";
  credit: string;
  license: string;
}

export const heroImages: VisualAsset[] = [
  {
    id: "hero-outdoor-portrait",
    src: "/images/editorial/portrait-outdoor.jpg",
    alt: "Retrato editorial de uma mulher negra em vestido preto, em ambiente natural com luz quente e presença serena.",
    role: "hero",
    credit: "Foto de Lekepov no Pexels",
    license: "Pexels License",
  },
  {
    id: "hero-blue-veil",
    src: "/images/editorial/blue-veil.jpg",
    alt: "Figura em vestido escuro com tecido azul fluido sobre a cabeça diante de formação rochosa, evocando gesto contemporâneo e memória.",
    role: "hero",
    credit: "Foto de Anna Ginger no Pexels",
    license: "Pexels License",
  },
];

export const themePanels: VisualAsset[] = [
  {
    id: "panel-studio-portrait",
    src: "/images/editorial/portrait-studio.jpg",
    alt: "Retrato de estúdio de uma mulher negra com expressão firme, lenço escuro e roupa estampada em preto e branco.",
    role: "panel",
    credit: "Foto de Bakarii Photography no Pexels",
    license: "Pexels License",
  },
  {
    id: "panel-fabric-market",
    src: "/images/backgrounds/fabric-market.jpg",
    alt: "Pilhas de tecidos estampados coloridos organizados em bancada de mercado, destacando tramas, fibra e cor.",
    role: "panel",
    credit: "Foto de Iwaria no Pexels",
    license: "Pexels License",
  },
];

export const sectionBackgrounds: VisualAsset[] = [
  {
    id: "bg-fabric-market",
    src: "/images/backgrounds/fabric-market.jpg",
    alt: "Tecidos estampados e coloridos usados como fundo visual de textura e memória material.",
    role: "background",
    credit: "Foto de Iwaria no Pexels",
    license: "Pexels License",
  },
];

export const ancestryArtLayers: VisualAsset[] = [
  {
    id: "art-botanical-weave",
    src: "/images/ancestry/botanical-weave.svg",
    alt: "Arte abstrata com folhas, linhas de costura e trama vegetal.",
    role: "overlay",
    credit: "Arte original do projeto",
    license: "Interna",
  },
  {
    id: "art-stitched-arcs",
    src: "/images/ancestry/stitched-arcs.svg",
    alt: "Arte abstrata com arcos e linhas pontilhadas que sugerem costura e continuidade.",
    role: "overlay",
    credit: "Arte original do projeto",
    license: "Interna",
  },
  {
    id: "art-solar-memory",
    src: "/images/ancestry/solar-memory.svg",
    alt: "Arte abstrata circular com anéis solares e geometria de memória.",
    role: "overlay",
    credit: "Arte original do projeto",
    license: "Interna",
  },
];
