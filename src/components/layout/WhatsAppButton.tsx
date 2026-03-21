"use client";

import { FaWhatsapp } from "react-icons/fa";
import { buildWhatsAppUrl, siteConfig } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <a
      href={buildWhatsAppUrl(siteConfig.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#A14F2A] text-white shadow-[0_14px_40px_rgba(17,17,17,0.26)] transition-transform hover:scale-105"
      aria-label="Abrir WhatsApp"
    >
      <FaWhatsapp className="h-7 w-7" />
    </a>
  );
}
