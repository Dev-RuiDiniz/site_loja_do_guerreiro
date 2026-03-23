import { Header, Footer, WhatsAppButton } from "@/components/layout";
import { MotionProvider } from "@/components/ui/LazyMotion";
import { CartProvider } from "@/contexts/CartContext";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <MotionProvider>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </MotionProvider>
    </CartProvider>
  );
}
