"use client";

import { useEffect } from "react";
import { HiX } from "react-icons/hi";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Modal({ open, onClose, title, children, size = "md" }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[var(--admin-overlay)] backdrop-blur-sm" onClick={onClose} />
      <div
        className={`admin-panel-strong relative flex max-h-[90vh] w-full ${sizeClasses[size]} flex-col overflow-hidden rounded-[1.8rem]`}
      >
        <div className="flex items-center justify-between border-b border-[var(--admin-border)] px-6 py-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--admin-muted)]">Edicao</p>
            <h2 className="mt-2 font-serif text-2xl text-[var(--admin-ink)]">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="admin-action flex h-11 w-11 items-center justify-center text-[var(--admin-muted)]"
          >
            <HiX className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  loading?: boolean;
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  loading,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[var(--admin-overlay)] backdrop-blur-sm" onClick={onClose} />
      <div className="admin-panel-strong relative w-full max-w-sm rounded-[1.6rem] p-6">
        <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--admin-muted)]">Confirmacao</p>
        <h2 className="mt-2 font-serif text-2xl text-[var(--admin-ink)]">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--admin-muted)]">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="admin-action flex-1 px-4 py-2.5 text-sm font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 rounded-full border border-[color:rgba(138,47,63,0.24)] bg-[var(--admin-danger)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:brightness-110 disabled:opacity-50"
          >
            {loading ? "..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
