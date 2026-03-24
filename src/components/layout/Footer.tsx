import Image from "next/image";
import Link from "next/link";
import { Brand } from "@/components/layout/Brand";
import { storeCategories } from "@/data/store";
import { ancestryArtLayers } from "@/data/visualAssets";
import { buildWhatsAppUrl, siteConfig } from "@/lib/site";

const institutionalLinks = [
  { href: "/sobre", label: "Manifesto" },
  { href: "/contato", label: "Contato" },
  { href: "/loja", label: "Loja" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--commerce-border)] bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
      <Image
        src={ancestryArtLayers[2].src}
        alt=""
        fill
        className="pointer-events-none object-cover opacity-18 mix-blend-screen"
        sizes="100vw"
        aria-hidden
      />
      <div className="mx-auto grid max-w-[var(--section-max)] gap-12 px-6 py-16 lg:grid-cols-[1.2fr_0.9fr_0.9fr_1fr] lg:px-10">
        <div className="relative space-y-5">
          <div className="space-y-3">
            <Brand invert subtitle="Moda autoral afro-brasileira" />
            <p className="max-w-md text-sm leading-7 text-white/72">
              Moda afro-brasileira com presença forte, leitura contemporânea e acolhimento
              comercial feito por gente.
            </p>
          </div>
          <div className="rounded-[1.6rem] border border-white/12 bg-white/6 p-5">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/52">Manifesto</p>
            <p className="mt-3 font-serif text-2xl leading-tight text-white">
              Uma vitrine para vestir presença com cuidado, orientação e linguagem própria.
            </p>
          </div>
          <a
            href={buildWhatsAppUrl(siteConfig.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full border border-[color:rgba(248,245,237,0.24)] bg-[color:rgba(248,245,237,0.06)] px-5 py-3 text-xs uppercase tracking-[0.24em] text-[var(--color-primary-foreground)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-chart-4)] hover:bg-[color:rgba(248,245,237,0.12)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:rgba(198,161,91,0.2)]"
          >
            Finalizar pedido no WhatsApp
          </a>
        </div>

        <div className="relative">
          <p className="mb-4 text-xs uppercase tracking-[0.26em] text-white/50">Coleções</p>
          <ul className="space-y-3 text-sm text-white/70">
            {storeCategories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/loja?categoria=${category.slug}`}
                  className="transition-colors hover:text-[var(--color-chart-4)]"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <p className="mb-4 text-xs uppercase tracking-[0.26em] text-white/50">Marca</p>
          <ul className="space-y-3 text-sm text-white/70">
            {institutionalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-[var(--color-chart-4)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="transition-colors hover:text-[var(--color-chart-4)]"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[var(--color-chart-4)]"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <div className="relative">
          <p className="mb-4 text-xs uppercase tracking-[0.26em] text-white/50">
            Compra assistida
          </p>
          <div className="space-y-3 text-sm leading-7 text-white/72">
            <p>Atendimento online para todo o Brasil.</p>
            <p>Montagem de pedido com apoio humano no WhatsApp.</p>
            <p>Orientação sobre combinações, tamanhos e disponibilidade.</p>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 px-6 py-5 text-center text-xs uppercase tracking-[0.18em] text-white/45 lg:px-10">
        © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
