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
      <section className="ritual-grid overflow-hidden border-b border-black/10">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-24">
          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.32em] text-[#8A7D71]">
              Loja do Guerreiro
            </p>
            <h1 className="mt-5 max-w-4xl font-serif text-6xl leading-none text-[#111111] lg:text-8xl">
              Força visual, tecido vivo e presença contemporânea.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#544B44]">
              Uma loja virtual de roupas e acessórios têxteis para expressões
              afro-brasileiras, criada para unir imponência, acolhimento e compra
              descomplicada.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="h-12 bg-[#111111] px-6 text-white hover:bg-[#A14F2A]" asChild>
                <Link href="/loja">Explorar coleção</Link>
              </Button>
              <Button
                variant="outline"
                className="h-12 border-black/15 bg-white text-[#111111] hover:bg-[#111111] hover:text-white"
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
            <p className="text-xs uppercase tracking-[0.24em] text-[#8A7D71]">
              Coleções em destaque
            </p>
            <h2 className="mt-2 font-serif text-4xl text-[#111111]">
              Linguagem forte, leitura acessível
            </h2>
          </div>
          <Link href="/categorias" className="text-sm uppercase tracking-[0.2em] text-[#111111]">
            Ver todas
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {storeCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/loja?categoria=${category.slug}`}
              className="ritual-shell block border border-black/10 bg-white/70 p-6 transition-transform hover:-translate-y-1"
            >
              <span
                className="inline-block h-3 w-14 rounded-full"
                style={{ backgroundColor: category.accent }}
              />
              <h3 className="mt-5 font-serif text-3xl text-[#111111]">{category.name}</h3>
              <p className="mt-3 text-sm leading-7 text-[#544B44]">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-black/10 bg-white/55">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.24em] text-[#8A7D71]">
              Lançamentos
            </p>
            <h2 className="mt-2 font-serif text-4xl text-[#111111]">
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
        <div className="rounded-[2rem] bg-[#111111] p-8 text-white">
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
            <div key={item} className="border border-black/10 bg-white p-6">
              <p className="font-serif text-2xl text-[#111111]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#111111]">
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
            <Button className="h-12 bg-[#A14F2A] px-6 text-white hover:bg-[#8A4330]" asChild>
              <Link href="/loja">Ir para a loja</Link>
            </Button>
            <Button
              variant="outline"
              className="h-12 border-white/15 bg-transparent text-white hover:bg-white hover:text-[#111111]"
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
