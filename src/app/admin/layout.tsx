import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Loja do Guerreiro",
  description: "Painel administrativo da Loja do Guerreiro",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
