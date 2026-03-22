import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/storefront/ProductCard";
import { ProductArtwork } from "@/components/storefront/ProductArtwork";
import { getFeaturedProducts, getNewArrivals, storeCategories } from "@/data/store";
import { buildWhatsAppUrl } from "@/lib/site";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts().slice(0, 3);
  const newArrivals = getNewArrivals().slice(0, 4);

  return (
    <>
      <section className="ritual-grid overflow-hidden border-b border-[color:rgba(16,37,107,0.1)]">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-24">
          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-muted-foreground)]">
              Loja do Guerreiro
            </p>
            <h1 className="mt-5 max-w-4xl font-serif text-6xl leading-none text-[var(--color-primary)] lg:text-8xl">
              Força visual, tecido vivo e presença contemporânea.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted-foreground)]">
              Uma loja virtual de roupas e acessórios têxteis para expressões
              afro-brasileiras, criada para unir imponência, acolhimento e compra
              descomplicada.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="h-12 bg-[var(--color-primary)] px-6 text-[var(--color-primary-foreground)] hover:bg-[color:#17358f]" asChild>
                <Link href="/loja">Explorar coleção</Link>
              </Button>
              <Button
                variant="outline"
                className="h-12 border-[color:rgba(16,37,107,0.16)] bg-[var(--color-card)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-foreground)]"
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
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <ProductArtwork
              artwork={featuredProducts[0].artworks[0]}
              className="aspect-[4/5] rounded-[2rem]"
            />
            <div className="grid gap-4">
              <ProductArtwork
                artwork={featuredProducts[1].artworks[0]}
                className="aspect-[4/3] rounded-[2rem]"
              />
              <ProductArtwork
                artwork={featuredProducts[2].artworks[0]}
                className="aspect-[4/3] rounded-[2rem]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted-foreground)]">
              Coleções em destaque
            </p>
            <h2 className="mt-2 font-serif text-4xl text-[var(--color-primary)]">
              Linguagem forte, leitura acessível
            </h2>
          </div>
          <Link href="/categorias" className="text-sm uppercase tracking-[0.2em] text-[var(--color-primary)] transition-colors hover:text-[var(--color-accent)]">
            Ver todas
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {storeCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/loja?categoria=${category.slug}`}
              className="ritual-shell block border border-[color:rgba(16,37,107,0.1)] bg-[color:rgba(252,250,244,0.82)] p-6 transition-transform hover:-translate-y-1"
            >
              <span
                className="inline-block h-3 w-14 rounded-full"
                style={{ backgroundColor: category.accent }}
              />
              <h3 className="mt-5 font-serif text-3xl text-[var(--color-primary)]">{category.name}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted-foreground)]">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-[color:rgba(16,37,107,0.1)] bg-[color:rgba(252,250,244,0.68)]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
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

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
        <div className="rounded-[2rem] bg-[var(--color-primary)] p-8 text-[var(--color-primary-foreground)]">
          <p className="text-xs uppercase tracking-[0.24em] text-white/55">Manifesto</p>
          <h2 className="mt-4 font-serif text-4xl">
            Vestir presença não precisa parecer distante.
          </h2>
          <p className="mt-5 text-base leading-8 text-white/72">
            A Loja do Guerreiro nasce para equilibrar potência estética e acolhimento.
            A coleção mistura cortes limpos, tons terrosos, verdes profundos e brilho
            controlado para construir uma linguagem de moda respeitosa, atual e viva.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            "Modelagem pensada para movimento e permanência.",
            "Tecidos com leitura forte e toque confortável.",
            "Atendimento humano para montar pedido com segurança.",
          ].map((item) => (
            <div key={item} className="border border-[color:rgba(16,37,107,0.1)] bg-[var(--color-card)] p-6">
              <p className="font-serif text-2xl text-[var(--color-primary)]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-primary)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 text-center lg:px-10">
          <p className="text-xs uppercase tracking-[0.28em] text-white/55">
            Atendimento direto
          </p>
          <h2 className="mx-auto max-w-4xl font-serif text-5xl text-white">
            Adicione suas escolhas ao carrinho e finalize o pedido no WhatsApp.
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-8 text-white/70">
            A v1 da loja foi construída para venda assistida: você explora a coleção,
            seleciona cor e tamanho e fecha com atendimento humano.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button className="h-12 bg-[var(--color-accent)] px-6 text-[var(--color-accent-foreground)] hover:bg-[color:#6f8634]" asChild>
              <Link href="/loja">Ir para a loja</Link>
            </Button>
            <Button
              variant="outline"
              className="h-12 border-white/15 bg-transparent text-white hover:bg-white hover:text-[var(--color-primary)]"
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
