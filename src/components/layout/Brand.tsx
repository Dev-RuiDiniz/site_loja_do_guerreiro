"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandProps {
  invert?: boolean;
  compact?: boolean;
  subtitle?: string;
  subtitleClassName?: string;
  titleClassName?: string;
  className?: string;
}

export function Brand({
  invert = false,
  compact = false,
  subtitle = "Moda autoral afro-brasileira",
  subtitleClassName,
  titleClassName,
  className,
}: BrandProps) {
  return (
    <div className={cn("flex items-center gap-3", compact ? "gap-2.5" : "gap-3.5", className)}>
      <Image
        src={invert ? "/brand-badge-dark.svg" : "/brand-badge.svg"}
        alt="Logo Loja do Guerreiro"
        width={compact ? 44 : 56}
        height={compact ? 44 : 56}
        className={cn("shrink-0", compact ? "h-11 w-11" : "h-14 w-14")}
        priority
      />
      <div>
        <p
          className={cn(
            "font-serif leading-none",
            compact ? "text-xl" : "text-2xl",
            invert ? "text-[var(--color-card)]" : "text-[var(--color-primary)]",
            titleClassName
          )}
        >
          Loja do Guerreiro
        </p>
        <p
          className={cn(
            "mt-1 text-[10px] uppercase tracking-[0.28em]",
            invert ? "text-[color:rgba(248,245,237,0.7)]" : "text-[var(--color-muted-foreground)]",
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
