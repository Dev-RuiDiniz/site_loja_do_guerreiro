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
      className="admin-action flex h-11 w-11 items-center justify-center text-[var(--admin-muted)]"
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
        className="admin-action flex items-center gap-3 px-2 py-1.5"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-medium text-[var(--color-primary-foreground)]">
          {user.name?.charAt(0).toUpperCase() || "A"}
        </div>
        <div className="hidden text-left sm:block">
          <p className="text-sm font-medium text-[var(--admin-ink)]">{user.name || "Admin"}</p>
          <p className="truncate text-[11px] text-[var(--admin-muted)]">{user.email}</p>
        </div>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="admin-panel-strong absolute right-0 z-50 mt-2 w-64 rounded-[1.4rem]">
            <div className="border-b border-[var(--admin-border)] px-4 py-3">
              <p className="text-sm font-medium text-[var(--admin-ink)]">{user.name || "Admin"}</p>
              <p className="truncate text-xs text-[var(--admin-muted)]">{user.email}</p>
            </div>
            <div className="py-1">
              <Link
                href="/admin/configuracoes"
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--admin-ink)] transition-colors hover:bg-[color:rgba(198,161,91,0.12)]"
                onClick={() => setOpen(false)}
              >
                <HiOutlineCog className="h-4 w-4" />
                Configurações
              </Link>
            </div>
            <div className="border-t border-[var(--admin-border)] py-1">
              <button
                onClick={() => {
                  setOpen(false);
                  onLogout();
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[var(--admin-danger)] transition-colors hover:bg-[color:rgba(138,47,63,0.1)]"
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
      <header className="sticky top-0 z-30 border-b border-[var(--admin-border)] bg-[color:rgba(245,239,226,0.82)] backdrop-blur-xl dark:bg-[color:rgba(9,18,51,0.88)]">
        <div className="flex min-h-22 items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowMobileMenu(true)}
              className="admin-action flex h-11 w-11 items-center justify-center text-[var(--admin-muted)] lg:hidden"
            >
              <HiOutlineMenu className="h-5 w-5" />
            </button>
            <div className="hidden sm:block">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--admin-muted)]">
                Loja do Guerreiro
              </p>
              <p className="mt-1 font-serif text-xl text-[var(--admin-ink)]">Operacao da vitrine e catalogo</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <div className="mx-2 hidden h-6 w-px bg-[var(--admin-border)] sm:block" />
            <ProfileDropdown user={user} onLogout={handleLogout} />
          </div>
        </div>
      </header>

      {showMobileMenu && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-[var(--admin-overlay)] backdrop-blur-sm"
            onClick={() => setShowMobileMenu(false)}
          />
          <div className="fixed left-0 top-0 h-full w-72 border-r border-white/10 bg-[color:rgba(12,25,76,0.98)] text-[var(--color-sidebar-foreground)]">
            <div className="flex h-24 items-center justify-between border-b border-white/10 px-6">
              <Brand invert compact subtitle="Painel administrativo" />
              <button
                onClick={() => setShowMobileMenu(false)}
                className="admin-action flex h-10 w-10 items-center justify-center border-white/10 bg-white/5 text-white/60 hover:text-white"
              >
                <HiX className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">Campo de controle</p>
                <p className="mt-3 text-sm leading-6 text-white/74">
                  Edite colecao, banners e canais sem sair da atmosfera da marca.
                </p>
              </div>
            </div>
            <nav className="px-6 pb-6">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-[1rem] border border-transparent px-4 py-3 text-sm text-white/65 transition-colors hover:border-white/10 hover:bg-white/8 hover:text-white"
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
                className="flex items-center gap-3 rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60 transition-colors hover:text-white"
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
