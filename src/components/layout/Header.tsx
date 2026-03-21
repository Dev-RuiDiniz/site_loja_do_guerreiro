"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineMenuAlt3, HiOutlineShoppingBag } from "react-icons/hi";
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

function BrandMark({ invert = false }: { invert?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C6A15B]/60 bg-[#111111] text-[#E8DCCB] shadow-[0_12px_30px_rgba(17,17,17,0.18)]">
        <span className="font-serif text-lg">LG</span>
      </div>
      <div>
        <p className={`font-serif text-2xl ${invert ? "text-white" : "text-[#111111]"}`}>
          Loja do Guerreiro
        </p>
        <p className={`text-[10px] uppercase tracking-[0.28em] ${invert ? "text-white/55" : "text-[#6C6258]"}`}>
          Ritual contemporâneo
        </p>
      </div>
    </div>
  );
}

function CartButton() {
  const { itemCount, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-[#111111] shadow-[0_8px_24px_rgba(17,17,17,0.08)] transition-all hover:border-[#A14F2A] hover:text-[#A14F2A]"
      aria-label="Abrir carrinho"
    >
      <HiOutlineShoppingBag className="h-5 w-5" />
      {itemCount > 0 ? (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#A14F2A] px-1 text-[10px] font-medium text-white">
          {itemCount}
        </span>
      ) : null}
    </button>
  );
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[#F4ECE1]/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
        <Link href="/" aria-label={siteConfig.name}>
          <BrandMark />
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
                  isActive ? "text-[#A14F2A]" : "text-[#111111] hover:text-[#A14F2A]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <Button
              className="h-11 bg-[#111111] px-5 text-white hover:bg-[#A14F2A]"
              asChild
            >
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
                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-[#111111] lg:hidden"
                aria-label="Abrir menu"
              >
                <HiOutlineMenuAlt3 className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full border-l border-black/10 bg-[#111111] p-0 text-white sm:max-w-md"
            >
              <div className="flex h-full flex-col px-6 py-8">
                <BrandMark invert />
                <div className="mt-10 flex flex-1 flex-col gap-2">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className="border-b border-white/10 py-4 font-serif text-3xl text-white/85 transition-colors hover:text-[#C6A15B]"
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
                <div className="space-y-3">
                  <Button
                    className="h-12 w-full bg-[#A14F2A] text-white hover:bg-[#8A4330]"
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
                  <p className="text-sm text-white/60">{siteConfig.address}</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
