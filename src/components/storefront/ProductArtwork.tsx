"use client";

import { StoreArtwork } from "@/data/store";
import { cn } from "@/lib/utils";

interface ProductArtworkProps {
  artwork: StoreArtwork;
  className?: string;
  labelClassName?: string;
}

function Motif({ artwork }: { artwork: StoreArtwork }) {
  if (artwork.motif === "bands") {
    return (
      <>
        <span
          className="absolute inset-x-0 top-[18%] h-[10%] opacity-80"
          style={{ backgroundColor: artwork.accent }}
        />
        <span
          className="absolute inset-x-0 top-[52%] h-[18%] opacity-90"
          style={{ backgroundColor: artwork.detail }}
        />
        <span
          className="absolute right-[10%] top-[14%] h-[72%] w-[10%] rounded-full opacity-40"
          style={{ backgroundColor: artwork.base }}
        />
      </>
    );
  }

  if (artwork.motif === "diamond") {
    return (
      <>
        <span
          className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 rotate-45 opacity-90"
          style={{ backgroundColor: artwork.accent }}
        />
        <span
          className="absolute left-1/2 top-1/2 h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 rotate-45"
          style={{ backgroundColor: artwork.detail }}
        />
      </>
    );
  }

  if (artwork.motif === "sun") {
    return (
      <>
        <span
          className="absolute left-1/2 top-1/2 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: artwork.accent }}
        />
        <span
          className="absolute left-1/2 top-1/2 h-[54%] w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[10px] opacity-70"
          style={{ borderColor: artwork.detail }}
        />
      </>
    );
  }

  return (
    <>
      <span
        className="absolute -left-[8%] top-[16%] h-[64%] w-[64%] rounded-full opacity-85"
        style={{ border: `14px solid ${artwork.accent}` }}
      />
      <span
        className="absolute right-[8%] bottom-[10%] h-[28%] w-[28%] rounded-full"
        style={{ backgroundColor: artwork.detail }}
      />
    </>
  );
}

export function ProductArtwork({
  artwork,
  className,
  labelClassName,
}: ProductArtworkProps) {
  return (
    <div
      className={cn(
        "surface-grain relative overflow-hidden border border-[var(--olive-line)] shadow-[0_14px_40px_rgba(16,37,107,0.12)]",
        className
      )}
      style={{
        background: `linear-gradient(145deg, ${artwork.base} 0%, ${artwork.base} 48%, ${artwork.detail} 100%)`,
      }}
    >
      <span
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.32),transparent_28%),radial-gradient(circle_at_70%_68%,rgba(127,150,66,0.14),transparent_30%)]" />
      <Motif artwork={artwork} />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <span
          className={cn(
            "inline-flex rounded-full bg-[color:rgba(16,37,107,0.82)] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--color-card)]",
            labelClassName
          )}
        >
          {artwork.label}
        </span>
      </div>
    </div>
  );
}
