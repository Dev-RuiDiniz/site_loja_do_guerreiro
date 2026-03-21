import Link from "next/link";
import { storeCategories } from "@/data/store";
import { buildWhatsAppUrl, siteConfig } from "@/lib/site";

const institutionalLinks = [
  { href: "/sobre", label: "Manifesto" },
  { href: "/contato", label: "Contato" },
  { href: "/loja", label: "Loja" },
];

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#111111] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-10">
        <div className="space-y-5">
          <div>
            <p className="font-serif text-4xl">Loja do Guerreiro</p>
            <p className="mt-2 max-w-md text-sm leading-7 text-white/70">
              Moda afro-brasileira com presença forte, leitura contemporânea e
              acolhimento comercial feito por gente.
            </p>
          </div>
          <a
            href={buildWhatsAppUrl(siteConfig.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full border border-[#C6A15B]/35 px-5 py-3 text-xs uppercase tracking-[0.24em] text-[#E8DCCB] transition-colors hover:border-[#C6A15B] hover:text-white"
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
                  className="transition-colors hover:text-[#C6A15B]"
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
                <Link href={link.href} className="transition-colors hover:text-[#C6A15B]">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="transition-colors hover:text-[#C6A15B]"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#C6A15B]"
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
