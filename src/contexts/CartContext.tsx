"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { StoreColor, StoreProduct } from "@/data/store";
import { buildWhatsAppUrl, formatCurrency } from "@/lib/site";

interface CartItem {
  key: string;
  productId: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: StoreColor;
}

interface AddToCartInput {
  product: StoreProduct;
  size: string;
  color: StoreColor;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (input: AddToCartInput) => void;
  incrementItem: (key: string) => void;
  decrementItem: (key: string) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  whatsappUrl: string;
}

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "loja-do-guerreiro-cart";

function buildItemKey(productId: string, size: string, colorName: string) {
  return `${productId}:${size}:${colorName}`;
}

function buildCartMessage(items: CartItem[], subtotal: number) {
  const lines = items.map(
    (item) =>
      `- ${item.name} | Tam: ${item.size} | Cor: ${item.color.name} | Qtd: ${item.quantity} | ${formatCurrency(item.price * item.quantity)}`
  );

  return [
    "Olá! Quero finalizar meu pedido na Loja do Guerreiro.",
    "",
    "Itens do carrinho:",
    ...lines,
    "",
    `Subtotal estimado: ${formatCurrency(subtotal)}`,
  ].join("\n");
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return [];

    try {
      return JSON.parse(stored) as CartItem[];
    } catch {
      window.localStorage.removeItem(storageKey);
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );
  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );
  const whatsappUrl = useMemo(
    () => buildWhatsAppUrl(buildCartMessage(items, subtotal)),
    [items, subtotal]
  );

  const value: CartContextValue = {
    items,
    itemCount,
    subtotal,
    isOpen,
    whatsappUrl,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem: ({ product, size, color, quantity }) => {
      const key = buildItemKey(product.id, size, color.name);
      setItems((current) => {
        const existing = current.find((item) => item.key === key);
        if (existing) {
          return current.map((item) =>
            item.key === key
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }

        return [
          ...current,
          {
            key,
            productId: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            quantity,
            size,
            color,
          },
        ];
      });
      setIsOpen(true);
    },
    incrementItem: (key) => {
      setItems((current) =>
        current.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    },
    decrementItem: (key) => {
      setItems((current) =>
        current.flatMap((item) => {
          if (item.key !== key) return [item];
          if (item.quantity <= 1) return [];
          return [{ ...item, quantity: item.quantity - 1 }];
        })
      );
    },
    removeItem: (key) => {
      setItems((current) => current.filter((item) => item.key !== key));
    },
    clearCart: () => setItems([]),
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

function CartDrawer() {
  const {
    items,
    subtotal,
    isOpen,
    closeCart,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
    whatsappUrl,
  } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
      if (!open) closeCart();
    }}>
      <SheetContent
        side="right"
        className="w-full max-w-xl border-l border-black/10 bg-[#F4ECE1] p-0 sm:max-w-xl"
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-black/10 px-6 py-6">
            <SheetTitle className="font-serif text-3xl text-[#111111]">
              Carrinho ritual
            </SheetTitle>
            <p className="mt-2 text-sm text-[#5C5148]">
              Revise suas escolhas e finalize o pedido no WhatsApp.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            {items.length === 0 ? (
              <div className="space-y-4 rounded-2xl border border-dashed border-black/15 bg-white/60 p-6 text-center">
                <p className="font-serif text-2xl text-[#111111]">
                  Seu carrinho ainda está vazio
                </p>
                <p className="text-sm leading-6 text-[#5C5148]">
                  Adicione peças, escolha cor e tamanho e monte seu pedido com calma.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.key}
                    className="rounded-2xl border border-black/10 bg-white p-4 shadow-[0_12px_30px_rgba(17,17,17,0.05)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <p className="font-serif text-xl text-[#111111]">{item.name}</p>
                        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-[#6C6258]">
                          <span>Tam {item.size}</span>
                          <span>Cor {item.color.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#5C5148]">
                          <span
                            className="inline-block h-3 w-3 rounded-full border border-black/10"
                            style={{ backgroundColor: item.color.hex }}
                          />
                          {formatCurrency(item.price)} cada
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        className="text-xs uppercase tracking-[0.18em] text-[#8A4330] transition-colors hover:text-[#111111]"
                      >
                        Remover
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-black/10">
                        <button
                          type="button"
                          onClick={() => decrementItem(item.key)}
                          className="px-4 py-2 text-[#111111]"
                        >
                          -
                        </button>
                        <span className="min-w-10 text-center text-sm text-[#111111]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => incrementItem(item.key)}
                          className="px-4 py-2 text-[#111111]"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-medium text-[#111111]">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-black/10 bg-[#111111] px-6 py-6 text-white">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-sm uppercase tracking-[0.2em] text-white/70">
                subtotal estimado
              </span>
              <span className="font-serif text-3xl">{formatCurrency(subtotal)}</span>
            </div>

            <div className="grid gap-3">
              <Button
                size="lg"
                className="h-12 bg-[#A14F2A] text-white hover:bg-[#8A4330]"
                asChild
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  Finalizar no WhatsApp
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-white/20 bg-transparent text-white hover:bg-white hover:text-[#111111]"
                onClick={clearCart}
                disabled={items.length === 0}
              >
                Limpar carrinho
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
