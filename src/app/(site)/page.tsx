import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/storefront/ProductCard";
import { ProductArtwork } from "@/components/storefront/ProductArtwork";
import { getFeaturedProducts, getNewArrivals, storeCategories } from "@/data/store";
import { buildWhatsAppUrl } from "@/lib/site";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts().slice(0, 3);
  const newArrivals = getNewArrivals().slice(0, 4);

  return (
    <>
      <section className="ritual-grid surface-grain overflow-hidden border-b border-[color:rgba(16,37,107,0.1)]">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-18 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-28">
          <Reveal className="flex flex-col justify-center" delay={0.05}>
            <p className="eyebrow">Loja do Guerreiro</p>
            <div className="lens-glow mt-5 max-w-4xl">
              <h1 className="display-title spotlight-title">
                Força visual, tecido vivo e presença contemporânea.
              </h1>
            </div>
            <p className="lede mt-6 max-w-2xl">
              Uma loja virtual de roupas e acessórios têxteis para expressões afro-brasileiras,
              criada para unir imponência, acolhimento e compra descomplicada.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="editorial-shadow h-12 bg-[var(--color-primary)] px-6 text-[var(--color-primary-foreground)] hover:bg-[color:#17358f]" asChild>
                <Link href="/loja">Explorar coleção</Link>
              </Button>
              <Button
                variant="outline"
                className="h-12 border-[color:rgba(127,150,66,0.22)] bg-[var(--offwhite-raised)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-foreground)]"
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
          </Reveal>

          <Reveal className="grid gap-4 sm:grid-cols-2" delay={0.15}>
            <div className="olive-panel editorial-shadow rounded-[2rem] p-3">
              <ProductArtwork
                artwork={featuredProducts[0].artworks[0]}
                className="aspect-[4/5] rounded-[1.4rem]"
              />
            </div>
            <div className="grid gap-4">
              <div className="olive-panel editorial-shadow rounded-[2rem] p-3">
                <ProductArtwork
                  artwork={featuredProducts[1].artworks[0]}
                  className="aspect-[4/3] rounded-[1.4rem]"
                />
              </div>
              <div className="olive-panel editorial-shadow rounded-[2rem] p-3">
                <ProductArtwork
                  artwork={featuredProducts[2].artworks[0]}
                  className="aspect-[4/3] rounded-[1.4rem]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="olive-contrast">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
          <Reveal className="olive-panel editorial-shadow grid gap-4 rounded-[2rem] p-7 lg:grid-cols-[0.9fr_1.1fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow">Presença editorial</p>
              <p className="section-title mt-3 text-3xl md:text-4xl">
                Contraste tátil entre fibra, luz suave e camadas verdes.
              </p>
            </div>
            <p className="lede text-base">
              O storefront passa a trabalhar com fundos offwhite elevados, divisórias oliva e
              profundidade azul discreta para valorizar a leitura sem perder identidade.
            </p>
            <div className="grid gap-3 text-sm text-[var(--color-primary)] sm:grid-cols-3 lg:grid-cols-1">
              <span className="rounded-full bg-[var(--offwhite-raised)] px-4 py-3">
                textura de papel
              </span>
              <span className="rounded-full bg-[var(--offwhite-raised)] px-4 py-3">
                foco óptico em títulos
              </span>
              <span className="rounded-full bg-[var(--offwhite-raised)] px-4 py-3">
                contraste oliva/offwhite
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <Reveal className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Coleções em destaque</p>
            <h2 className="section-title mt-2">Linguagem forte, leitura acessível</h2>
          </div>
          <Link
            href="/categorias"
            className="caption-label text-[var(--color-primary)] transition-colors hover:text-[var(--color-accent)]"
          >
            Ver todas
          </Link>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {storeCategories.map((category, index) => (
            <Reveal key={category.slug} delay={0.04 * index}>
              <Link
                href={`/loja?categoria=${category.slug}`}
                className="ritual-shell surface-grain editorial-shadow block overflow-hidden rounded-[1.8rem] border border-[var(--olive-line)] bg-[var(--offwhite-raised)] p-6 transition-transform hover:-translate-y-1"
              >
                <span
                  className="inline-block h-3 w-14 rounded-full"
                  style={{ backgroundColor: category.accent }}
                />
                <h3 className="mt-5 font-serif text-3xl text-[var(--color-primary)]">
                  {category.name}
                </h3>
                <p className="lede mt-3 text-sm leading-7">{category.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="surface-fiber border-y border-[color:rgba(127,150,66,0.16)] bg-[var(--olive-soft)]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <Reveal className="mb-8">
            <p className="eyebrow">Lançamentos</p>
            <h2 className="section-title mt-2">Vitrine em movimento</h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {newArrivals.map((product, index) => (
              <Reveal key={product.slug} delay={0.05 * index}>
                <ProductCard
                  product={product}
                  category={storeCategories.find(
                    (category) => category.slug === product.categorySlug
                  )}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
        <Reveal className="surface-grain lens-glow editorial-shadow rounded-[2rem] bg-[var(--color-primary)] p-8 text-[var(--color-primary-foreground)]">
          <p className="eyebrow text-white/55">Manifesto</p>
          <h2 className="section-title mt-4 text-[var(--color-primary-foreground)]">
            Vestir presença não precisa parecer distante.
          </h2>
          <p className="mt-5 text-base leading-8 text-white/78">
            A Loja do Guerreiro nasce para equilibrar potência estética e acolhimento. A
            coleção agora trabalha superfícies mais táteis, fundos elevados e brilho
            controlado para construir uma linguagem de moda respeitosa, atual e viva.
          </p>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            "Modelagem pensada para movimento e permanência.",
            "Tecidos com leitura forte e toque confortável.",
            "Atendimento humano para montar pedido com segurança.",
          ].map((item, index) => (
            <Reveal key={item} delay={0.06 * index}>
              <div className="editorial-shadow olive-panel rounded-[1.6rem] p-6">
                <p className="font-serif text-2xl text-[var(--color-primary)]">{item}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="surface-grain overflow-hidden bg-[var(--color-primary)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 text-center lg:px-10">
          <Reveal className="relative">
            <p className="eyebrow text-white/55">Atendimento direto</p>
            <div className="lens-glow mx-auto mt-4 max-w-4xl">
              <h2 className="section-title text-5xl text-white">
                Adicione suas escolhas ao carrinho e finalize o pedido no WhatsApp.
              </h2>
            </div>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/72">
              A v1 da loja foi construída para venda assistida: você explora a coleção,
              seleciona cor e tamanho e fecha com atendimento humano.
            </p>
          </Reveal>
          <Reveal className="flex flex-col justify-center gap-3 sm:flex-row" delay={0.1}>
            <Button className="editorial-shadow h-12 bg-[var(--color-accent)] px-6 text-[var(--color-accent-foreground)] hover:bg-[color:#6f8634]" asChild>
              <Link href="/loja">Ir para a loja</Link>
            </Button>
            <Button
              variant="outline"
              className="h-12 border-white/15 bg-[color:rgba(255,255,255,0.06)] text-white hover:bg-white hover:text-[var(--color-primary)]"
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
          </Reveal>
        </div>
      </section>
    </>
  );
}
