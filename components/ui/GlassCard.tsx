"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { hoverScale } from "@/lib/animations";

interface GlassCardProps {
  title: string;
  icon: React.ReactNode;
  href: string;
  description: string;
  color?: string;
  children?: React.ReactNode;
}

export default function GlassCard({
  title,
  icon,
  href,
  description,
  color = "rgba(0,56,168,0.4)",
  children,
}: GlassCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const { addListeners, removeListeners } = hoverScale(cardRef.current, color);
    addListeners();
    return () => removeListeners();
  }, [color]);

  return (
    <Link
      ref={cardRef}
      href={href}
      className="glass-card group flex flex-col gap-3 p-6 cursor-pointer no-underline will-change-transform"
      style={{ transformOrigin: "center" }}
    >
      {/* Icon */}
      <div
        className="text-4xl w-14 h-14 flex items-center justify-center rounded-xl"
        style={{ background: color.replace("0.4", "0.2") }}
      >
        {icon}
      </div>

      {/* Title */}
      <h2 className="font-heading font-bold text-xl text-foreground leading-tight group-hover:text-ph-yellow transition-colors duration-300">
        {title}
      </h2>

      {/* Description */}
      <p className="text-foreground/60 text-sm leading-relaxed">{description}</p>

      {children && <div className="mt-auto pt-2 border-t border-foreground/10">{children}</div>}

      {/* Arrow */}
      <div className="flex items-center gap-1 text-ph-yellow/70 text-sm font-medium mt-auto group-hover:text-ph-yellow transition-colors duration-300">
        <span>Explore</span>
        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
      </div>
    </Link>
  );
}
