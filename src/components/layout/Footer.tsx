import Link from "next/link";
import { Brand } from "@/components/layout/Brand";
import { storeCategories } from "@/data/store";
import { buildWhatsAppUrl, siteConfig } from "@/lib/site";

const institutionalLinks = [
  { href: "/sobre", label: "Manifesto" },
  { href: "/contato", label: "Contato" },
  { href: "/loja", label: "Loja" },
];

export function Footer() {
  return (
    <footer className="surface-grain border-t border-[color:rgba(127,150,66,0.16)] bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-10">
        <div className="space-y-5">
          <div className="lens-glow space-y-3">
            <Brand invert subtitle="Moda autoral afro-brasileira" />
            <p className="max-w-md text-sm leading-7 text-white/72">
              Moda afro-brasileira com presença forte, leitura contemporânea e acolhimento
              comercial feito por gente.
            </p>
          </div>
          <a
            href={buildWhatsAppUrl(siteConfig.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-shadow inline-flex rounded-full border border-[color:rgba(248,245,237,0.24)] bg-[color:rgba(248,245,237,0.06)] px-5 py-3 text-xs uppercase tracking-[0.24em] text-[var(--color-primary-foreground)] transition-colors hover:border-[var(--color-chart-4)] hover:bg-[color:rgba(248,245,237,0.12)]"
          >
            Finalizar pedido no WhatsApp
          </a>
        </div>

        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.26em] text-white/50">
            Coleções
          </p>
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

        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.26em] text-white/50">
            Marca
          </p>
          <ul className="space-y-3 text-sm text-white/70">
            {institutionalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-[var(--color-chart-4)]">
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
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-xs uppercase tracking-[0.18em] text-white/45 lg:px-10">
        © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
