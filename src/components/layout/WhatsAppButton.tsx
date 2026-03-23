"use client";

import { FaWhatsapp } from "react-icons/fa";
import { buildWhatsAppUrl, siteConfig } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <a
      href={buildWhatsAppUrl(siteConfig.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      className="editorial-shadow fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-[color:rgba(255,255,255,0.2)] bg-[var(--color-accent)] text-[var(--color-accent-foreground)] transition-transform hover:scale-105"
      aria-label="Abrir WhatsApp"
    >
      <FaWhatsapp className="h-7 w-7" />
    </a>
  );
}
