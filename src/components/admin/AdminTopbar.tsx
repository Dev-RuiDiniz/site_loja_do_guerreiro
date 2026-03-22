"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineMenu,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineUser,
  HiX,
} from "react-icons/hi";
import { Brand } from "@/components/layout";
import { useTheme } from "@/contexts/ThemeContext";

const menuItems = [
  { title: "Visão Geral", href: "/admin" },
  { title: "Banners", href: "/admin/banners" },
  { title: "Produtos", href: "/admin/produtos" },
  { title: "Cabeçalho", href: "/admin/cabecalho" },
  { title: "Rodapé", href: "/admin/rodape" },
  { title: "Configurações", href: "/admin/configuracoes" },
];

interface AdminTopbarProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full p-2 text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)] dark:text-[var(--color-muted-foreground)] dark:hover:bg-[var(--color-secondary)] dark:hover:text-[var(--color-primary-foreground)]"
      title={isDark ? "Modo claro" : "Modo escuro"}
    >
      {isDark ? <HiOutlineSun className="h-5 w-5" /> : <HiOutlineMoon className="h-5 w-5" />}
    </button>
  );
}

function ProfileDropdown({
  user,
  onLogout,
}: {
  user: AdminTopbarProps["user"];
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-full px-2 py-1.5 transition-colors hover:bg-[var(--color-secondary)]"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-medium text-[var(--color-primary-foreground)]">
          {user.name?.charAt(0).toUpperCase() || "A"}
        </div>
        <div className="hidden text-left sm:block">
          <p className="text-sm font-medium text-[var(--color-primary)]">{user.name || "Admin"}</p>
          <p className="truncate text-[11px] text-[var(--color-muted-foreground)]">{user.email}</p>
        </div>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-[color:rgba(16,37,107,0.12)] bg-[var(--color-card)] shadow-xl">
            <div className="border-b border-[color:rgba(16,37,107,0.08)] px-4 py-3">
              <p className="text-sm font-medium text-[var(--color-primary)]">{user.name || "Admin"}</p>
              <p className="truncate text-xs text-[var(--color-muted-foreground)]">{user.email}</p>
            </div>
            <div className="py-1">
              <Link
                href="/admin/configuracoes"
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-primary)] transition-colors hover:bg-[var(--color-secondary)]"
                onClick={() => setOpen(false)}
              >
                <HiOutlineCog className="h-4 w-4" />
                Configurações
              </Link>
            </div>
            <div className="border-t border-[color:rgba(16,37,107,0.08)] py-1">
              <button
                onClick={() => {
                  setOpen(false);
                  onLogout();
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
              >
                <HiOutlineLogout className="h-4 w-4" />
                Sair
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function AdminTopbar({ user }: AdminTopbarProps) {
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <>
      <header className="sticky top-0 z-30 h-20 border-b border-[color:rgba(16,37,107,0.08)] bg-[color:rgba(248,245,237,0.92)] backdrop-blur dark:border-[var(--color-border)] dark:bg-[color:rgba(11,23,63,0.92)]">
        <div className="flex h-full items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowMobileMenu(true)}
              className="rounded-full p-2 text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)] dark:text-[var(--color-muted-foreground)] dark:hover:bg-[var(--color-secondary)] dark:hover:text-[var(--color-primary-foreground)] lg:hidden"
            >
              <HiOutlineMenu className="h-5 w-5" />
            </button>
            <div className="hidden sm:block">
              <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-muted-foreground)]">
                Loja do Guerreiro
              </p>
              <p className="text-sm text-[var(--color-primary)] dark:text-[var(--color-primary-foreground)]">Operação da vitrine e catálogo</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <div className="mx-2 h-6 w-px bg-[color:rgba(16,37,107,0.14)] dark:bg-[var(--color-border)]" />
            <ProfileDropdown user={user} onLogout={handleLogout} />
          </div>
        </div>
      </header>

      {showMobileMenu && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowMobileMenu(false)}
          />
          <div className="fixed left-0 top-0 h-full w-72 bg-[var(--color-sidebar)] text-[var(--color-sidebar-foreground)]">
            <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
              <Brand invert compact subtitle="Painel administrativo" />
              <button
                onClick={() => setShowMobileMenu(false)}
                className="p-2 text-white/60 hover:text-white"
              >
                <HiX className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-6">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-xl px-4 py-2.5 text-sm text-white/65 transition-colors hover:bg-white/8 hover:text-white"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="border-t border-white/10 p-6">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white"
                onClick={() => setShowMobileMenu(false)}
              >
                <HiOutlineUser className="h-4 w-4" />
                Ver loja
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
