"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineMenuAlt3, HiOutlineShoppingBag } from "react-icons/hi";
import { Brand } from "@/components/layout/Brand";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { buildWhatsAppUrl, siteConfig } from "@/lib/site";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/loja", label: "Loja" },
  { href: "/categorias", label: "Coleções" },
  { href: "/sobre", label: "Manifesto" },
  { href: "/contato", label: "Contato" },
];

function CartButton() {
  const { itemCount, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[color:rgba(16,37,107,0.12)] bg-[var(--color-card)] text-[var(--color-primary)] shadow-[0_10px_28px_rgba(16,37,107,0.12)] transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
      aria-label="Abrir carrinho"
    >
      <HiOutlineShoppingBag className="h-5 w-5" />
      {itemCount > 0 ? (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-accent)] px-1 text-[10px] font-medium text-[var(--color-accent-foreground)]">
          {itemCount}
        </span>
      ) : null}
    </button>
  );
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[color:rgba(16,37,107,0.1)] bg-[color:rgba(248,245,237,0.92)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
        <Link href="/" aria-label={siteConfig.name}>
          <Brand subtitle="Azul profundo, verde vivo e presença autoral" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm uppercase tracking-[0.2em] transition-colors ${
                  isActive
                    ? "text-[var(--color-accent)]"
                    : "text-[var(--color-primary)] hover:text-[var(--color-accent)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <Button className="h-11 bg-[var(--color-primary)] px-5 text-[var(--color-primary-foreground)] hover:bg-[color:#17358f]" asChild>
              <a
                href={buildWhatsAppUrl("Olá! Quero atendimento da Loja do Guerreiro.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Atendimento
              </a>
            </Button>
          </div>

          <CartButton />

          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:rgba(16,37,107,0.12)] bg-[var(--color-card)] text-[var(--color-primary)] lg:hidden"
                aria-label="Abrir menu"
              >
                <HiOutlineMenuAlt3 className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full border-l border-[color:rgba(248,245,237,0.12)] bg-[var(--color-primary)] p-0 text-[var(--color-primary-foreground)] sm:max-w-md"
            >
              <div className="flex h-full flex-col px-6 py-8">
                <Brand
                  invert
                  subtitle="Moda autoral afro-brasileira"
                  subtitleClassName="tracking-[0.24em]"
                />
                <div className="mt-10 flex flex-1 flex-col gap-2">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className="border-b border-white/10 py-4 font-serif text-3xl text-white/85 transition-colors hover:text-[var(--color-chart-4)]"
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
                <div className="space-y-3">
                  <Button className="h-12 w-full bg-[var(--color-accent)] text-[var(--color-accent-foreground)] hover:bg-[color:#6f8634]" asChild>
                    <a
                      href={buildWhatsAppUrl("Olá! Quero atendimento da Loja do Guerreiro.")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Falar no WhatsApp
                    </a>
                  </Button>
                  <p className="text-sm text-white/65">{siteConfig.address}</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
