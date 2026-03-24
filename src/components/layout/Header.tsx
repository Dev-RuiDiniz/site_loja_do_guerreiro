"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineMenuAlt3, HiOutlineShoppingBag } from "react-icons/hi";
import { Brand } from "@/components/layout/Brand";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { ancestryArtLayers } from "@/data/visualAssets";
import { buildWhatsAppUrl, siteConfig } from "@/lib/site";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/loja", label: "Loja" },
  { href: "/categorias", label: "Coleções" },
  { href: "/sobre", label: "Identidade" },
  { href: "/contato", label: "Contato" },
];

function CartButton() {
  const { itemCount, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[var(--commerce-border)] bg-[var(--surface-strong)] text-[var(--color-primary)] shadow-[0_10px_28px_rgba(16,37,107,0.12)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:rgba(127,150,66,0.18)]"
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
    <header className="sticky top-0 z-40 border-b border-[var(--commerce-border)] bg-[color:rgba(248,245,237,0.9)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-10 top-0 h-24 w-24 rounded-full bg-[color:rgba(127,150,66,0.1)] blur-2xl" />
        <div className="absolute left-[18%] top-2 h-20 w-20 rounded-full bg-[color:rgba(47,93,80,0.08)] blur-[36px]" />
        <div className="absolute right-[28%] top-1 h-24 w-24 rounded-full bg-[color:rgba(127,150,66,0.08)] blur-[40px]" />
        <div className="absolute right-6 top-3 h-20 w-20 rounded-full bg-[color:rgba(161,79,42,0.07)] blur-[34px]" />
        <Image
          src={ancestryArtLayers[0].src}
          alt=""
          width={240}
          height={160}
          className="absolute -left-8 top-0 h-auto w-36 rotate-[-10deg] opacity-[0.1] mix-blend-multiply"
        />
        <Image
          src={ancestryArtLayers[0].src}
          alt=""
          width={220}
          height={140}
          className="absolute left-[22%] top-1 h-auto w-28 rotate-[8deg] opacity-[0.08] mix-blend-multiply"
        />
        <Image
          src={ancestryArtLayers[0].src}
          alt=""
          width={260}
          height={170}
          className="absolute right-[20%] top-0 h-auto w-32 rotate-[-14deg] opacity-[0.08] mix-blend-multiply"
        />
        <Image
          src={ancestryArtLayers[0].src}
          alt=""
          width={240}
          height={160}
          className="absolute -right-8 top-2 h-auto w-36 rotate-[12deg] opacity-[0.1] mix-blend-multiply"
        />
      </div>
      <Image
        src={ancestryArtLayers[1].src}
        alt=""
        width={900}
        height={220}
        className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-auto -translate-x-1/2 opacity-10 lg:block"
        aria-hidden
      />
      <div className="mx-auto grid max-w-[var(--section-max)] gap-4 px-6 py-4 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:px-10">
        <div className="flex items-center justify-between gap-4 lg:contents">
          <Link
            href="/"
            aria-label={siteConfig.name}
            className="justify-self-start"
          >
            <Brand
              subtitle="Moda autoral afro-brasileira"
              titleClassName="text-[1.9rem] lg:text-[2.35rem]"
              subtitleClassName="tracking-[0.32em]"
              className="gap-4"
            />
          </Link>

          <div className="flex items-center gap-3 lg:hidden">
            <CartButton />
            <Sheet>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--commerce-border)] bg-[var(--surface-strong)] text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:rgba(127,150,66,0.18)]"
                  aria-label="Abrir menu"
                >
                  <HiOutlineMenuAlt3 className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full border-l border-[color:rgba(248,245,237,0.12)] bg-[var(--brand-panel-strong)] p-0 text-[var(--color-primary-foreground)] sm:max-w-md"
              >
                <div className="flex h-full flex-col px-6 py-8">
                  <Image
                    src={ancestryArtLayers[0].src}
                    alt=""
                    width={680}
                    height={860}
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-18 mix-blend-screen"
                    aria-hidden
                  />
                  <Brand
                    invert
                    subtitle="Compra assistida com assinatura autoral"
                    subtitleClassName="tracking-[0.24em]"
                  />
                  <div className="mt-8 rounded-[1.5rem] border border-white/12 bg-white/6 p-4">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/55">
                      Atendimento humano
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/72">
                      Monte o pedido no seu ritmo e finalize pelo WhatsApp com apoio da equipe.
                    </p>
                  </div>
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
                    <Button
                      className="h-12 w-full rounded-full bg-[var(--color-accent)] text-[var(--color-accent-foreground)] hover:bg-[color:#6f8634]"
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
                    <p className="text-sm text-white/65">{siteConfig.address}</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <nav className="hidden items-center justify-center gap-7 lg:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative pb-1 text-sm uppercase tracking-[0.2em] transition-colors ${
                  isActive
                    ? "editorial-divider text-[var(--color-primary)]"
                    : "text-[var(--color-primary)] hover:text-[var(--color-accent)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center justify-self-end gap-3 lg:flex">
          <Button
            className="h-11 rounded-full bg-[var(--color-accent)] px-5 text-[var(--color-accent-foreground)] shadow-[0_16px_32px_rgba(127,150,66,0.24)] hover:bg-[color:#6f8634]"
            asChild
          >
            <a
              href={buildWhatsAppUrl("Olá! Quero atendimento da Loja do Guerreiro.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Atendimento guiado
            </a>
          </Button>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
