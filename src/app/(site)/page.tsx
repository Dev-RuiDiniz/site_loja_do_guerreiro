import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/storefront/ProductCard";
import { Button } from "@/components/ui/button";
import { getNewArrivals, storeCategories } from "@/data/store";
import {
  ancestryArtLayers,
  heroImages,
  sectionBackgrounds,
  themePanels,
} from "@/data/visualAssets";
import { buildWhatsAppUrl } from "@/lib/site";

export default function HomePage() {
  const newArrivals = getNewArrivals().slice(0, 4);
  const featuredCategories = storeCategories.slice(0, 4);
  const trustPillars = [
    "Atendimento humano para montar o pedido",
    "Coleção curada para leitura rápida e combinação fácil",
    "Fechamento pelo WhatsApp com orientação da equipe",
  ];
  const productHighlights = [
    "Silhuetas pensadas para movimento e permanência.",
    "Tecidos com leitura forte e conforto de uso.",
    "Compra assistida para tirar dúvidas sobre tamanho, cor e combinação.",
  ];

  return (
    <>
      <section className="ritual-grid overflow-hidden border-b border-[var(--commerce-border)]">
        <div className="mx-auto grid max-w-[var(--section-max)] gap-8 px-6 py-14 lg:grid-cols-[1.04fr_0.96fr] lg:px-10 lg:py-20">
          <div className="brand-panel relative overflow-hidden rounded-[2.2rem] px-6 py-8 text-[var(--color-primary-foreground)] lg:px-8 lg:py-10">
            <Image
              src={ancestryArtLayers[2].src}
              alt=""
              fill
              className="pointer-events-none object-cover opacity-24 mix-blend-screen"
              sizes="(max-width: 1024px) 100vw, 48vw"
              aria-hidden
            />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.32em] text-white/58">Loja do Guerreiro</p>
              <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-none text-white lg:text-7xl">
                Presença contemporânea com memória, matéria e compra assistida.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">
                Uma vitrine editorial para moda afro-brasileira atual, firme e sensível, com
                caminho de compra claro e atendimento humano sempre acessível.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  className="h-12 rounded-full bg-[var(--color-accent)] px-6 text-[var(--color-accent-foreground)] hover:bg-[color:#6f8634]"
                  asChild
                >
                  <Link href="/loja">Explorar coleção</Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 rounded-full border-white/18 bg-transparent text-white hover:bg-white hover:text-[var(--color-primary)]"
                  asChild
                >
                  <a
                    href={buildWhatsAppUrl("Olá! Quero montar meu pedido na Loja do Guerreiro.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Montar pedido no WhatsApp
                  </a>
                </Button>
              </div>
              <div className="mt-8 grid gap-3 md:grid-cols-3">
                {trustPillars.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.3rem] border border-white/12 bg-white/8 p-4 text-sm leading-6 text-white/78"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="ancestry-frame relative min-h-[30rem] overflow-hidden rounded-[2rem]">
              <Image
                src={heroImages[0].src}
                alt={heroImages[0].alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 42vw"
                priority
              />
              <div className="ancestry-veil absolute inset-0" />
              <Image
                src={ancestryArtLayers[0].src}
                alt=""
                fill
                className="pointer-events-none object-cover opacity-55 mix-blend-screen"
                sizes="(max-width: 1024px) 100vw, 42vw"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-xs uppercase tracking-[0.24em] text-white/65">Retrato editorial</p>
                <p className="mt-3 max-w-sm font-serif text-3xl leading-tight">
                  Corpo, gesto e luz como linguagem de herança viva.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="commerce-panel relative overflow-hidden rounded-[2rem] p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted-foreground)]">
                  Compra assistida
                </p>
                <p className="mt-4 font-serif text-3xl leading-tight text-[var(--color-primary)]">
                  Adicione ao carrinho e finalize com orientação humana.
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--commerce-muted)]">
                  A vitrine ajuda a decidir. O WhatsApp ajuda a fechar com segurança.
                </p>
              </div>

              <div className="ancestry-paper ancestry-glow relative overflow-hidden rounded-[2rem] border border-[var(--ancestry-line)] p-6">
                <Image
                  src={ancestryArtLayers[1].src}
                  alt=""
                  fill
                  className="pointer-events-none object-cover opacity-30"
                  sizes="(max-width: 1024px) 100vw, 20vw"
                  aria-hidden
                />
                <p className="relative text-xs uppercase tracking-[0.24em] text-[var(--color-muted-foreground)]">
                  Matéria e memória
                </p>
                <p className="relative mt-4 font-serif text-3xl leading-tight text-[var(--color-primary)]">
                  Tecidos, costuras e botânicas discretas organizam o imaginário da marca.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--section-max)] px-6 py-10 lg:px-10">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Atendimento humano",
              body: "Orientação sobre medidas, combinações e disponibilidade antes do fechamento.",
            },
            {
              title: "Venda assistida",
              body: "A loja foi desenhada para facilitar a escolha e levar para o WhatsApp no momento certo.",
            },
            {
              title: "Coleção curada",
              body: "Categorias, destaques e textos curtos ajudam a comparar peças com rapidez.",
            },
          ].map((item) => (
            <div key={item.title} className="commerce-panel rounded-[1.7rem] p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted-foreground)]">
                {item.title}
              </p>
              <p className="mt-4 text-base leading-7 text-[var(--color-primary)]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[var(--section-max)] px-6 py-12 lg:px-10">
        <div className="commerce-panel grid gap-8 overflow-hidden rounded-[2rem] p-5 lg:grid-cols-[1.08fr_0.92fr] lg:p-7">
          <div className="relative min-h-[18rem] overflow-hidden rounded-[1.6rem]">
            <Image
              src={heroImages[1].src}
              alt={heroImages[1].alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 44vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(16,37,107,0.68),rgba(16,37,107,0.16))]" />
            <Image
              src={ancestryArtLayers[2].src}
              alt=""
              fill
              className="pointer-events-none object-cover opacity-38 mix-blend-screen"
              sizes="(max-width: 1024px) 100vw, 44vw"
              aria-hidden
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted-foreground)]">
              Modernidade com raiz
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-[var(--color-primary)]">
              A direção visual nasce do encontro entre retrato, fibra e silêncio simbólico.
            </h2>
            <p className="mt-4 text-base leading-8 text-[var(--color-muted-foreground)]">
              Em vez de literalidade, o site trabalha a ancestralidade por meio do tecido,
              da repetição, da costura, da presença do corpo e de elementos naturais filtrados
              por um olhar contemporâneo.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--section-max)] px-6 py-14 lg:px-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted-foreground)]">
              Coleções em destaque
            </p>
            <h2 className="mt-2 font-serif text-4xl text-[var(--color-primary)]">
              Leitura rápida, assinatura forte
            </h2>
          </div>
          <Link
            href="/categorias"
            className="text-sm uppercase tracking-[0.2em] text-[var(--color-primary)] transition-colors hover:text-[var(--color-accent)]"
          >
            Ver todas
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/loja?categoria=${category.slug}`}
              className="commerce-card block rounded-[1.7rem] p-6 transition-transform hover:-translate-y-1"
            >
              <span
                className="inline-block h-3 w-14 rounded-full"
                style={{ backgroundColor: category.accent }}
              />
              <p className="mt-5 text-xs uppercase tracking-[0.24em] text-[var(--color-muted-foreground)]">
                {category.eyebrow}
              </p>
              <h3 className="mt-3 font-serif text-3xl text-[var(--color-primary)]">
                {category.name}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted-foreground)]">
                {category.description}
              </p>
              <p className="mt-4 text-sm leading-6 text-[var(--color-primary)]">
                {category.trustNote}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-[var(--commerce-border)] bg-[color:rgba(252,250,244,0.68)]">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={sectionBackgrounds[0].src}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            aria-hidden
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,245,237,0.96),rgba(248,245,237,0.92))]" />
        <div className="relative mx-auto max-w-[var(--section-max)] px-6 py-14 lg:px-10">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted-foreground)]">
              Lançamentos
            </p>
            <h2 className="mt-2 font-serif text-4xl text-[var(--color-primary)]">
              Vitrine em movimento
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                category={storeCategories.find((category) => category.slug === product.categorySlug)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[var(--section-max)] gap-10 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
        <div className="brand-panel relative overflow-hidden rounded-[2rem] p-8 text-[var(--color-primary-foreground)]">
          <Image
            src={themePanels[0].src}
            alt={themePanels[0].alt}
            fill
            className="object-cover opacity-24"
            sizes="(max-width: 1024px) 100vw, 36vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(16,37,107,0.84),rgba(16,37,107,0.66))]" />
          <Image
            src={ancestryArtLayers[0].src}
            alt=""
            fill
            className="pointer-events-none object-cover opacity-30 mix-blend-screen"
            sizes="(max-width: 1024px) 100vw, 36vw"
            aria-hidden
          />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.24em] text-white/55">Manifesto</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight">
              Vestir presença não precisa parecer distante.
            </h2>
            <p className="mt-5 text-base leading-8 text-white/72">
              A Loja do Guerreiro se apoia em forma, tecido e permanência. O novo acervo visual
              reforça esse discurso com retratos firmes, fundos materiais e um campo gráfico que
              remete à memória, à costura e à natureza.
            </p>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {productHighlights.map((item, index) => (
            <div
              key={item}
              className={`rounded-[1.6rem] border border-[var(--commerce-border)] p-6 ${
                index === 1 ? "bg-[var(--secondary)]" : "commerce-card"
              }`}
            >
              <p className="font-serif text-2xl text-[var(--color-primary)]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--color-primary)]">
        <Image
          src={sectionBackgrounds[0].src}
          alt=""
          fill
          className="object-cover opacity-20"
          sizes="100vw"
          aria-hidden
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,37,107,0.88),rgba(16,37,107,0.9))]" />
        <Image
          src={ancestryArtLayers[1].src}
          alt=""
          fill
          className="pointer-events-none object-cover opacity-34 mix-blend-screen"
          sizes="100vw"
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-[var(--section-max)] flex-col gap-8 px-6 py-16 text-center lg:px-10">
          <p className="text-xs uppercase tracking-[0.28em] text-white/55">Atendimento direto</p>
          <h2 className="mx-auto max-w-4xl font-serif text-5xl text-white">
            Adicione suas escolhas ao carrinho e finalize o pedido no WhatsApp.
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-8 text-white/70">
            A vitrine foi pensada para venda assistida: você percorre a coleção, lê a história
            visual das peças e fecha o pedido com acompanhamento humano.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              className="h-12 rounded-full bg-[var(--color-accent)] px-6 text-[var(--color-accent-foreground)] hover:bg-[color:#6f8634]"
              asChild
            >
              <Link href="/loja">Ir para a loja</Link>
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-full border-white/15 bg-transparent text-white hover:bg-white hover:text-[var(--color-primary)]"
              asChild
            >
              <a
                href={buildWhatsAppUrl("Olá! Quero atendimento da Loja do Guerreiro.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
