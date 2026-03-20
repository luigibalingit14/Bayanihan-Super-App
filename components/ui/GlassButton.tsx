"use client";

import { useRef } from "react";
import { pressAnimation } from "@/lib/animations";

type Variant = "primary" | "secondary" | "danger";

interface GlassButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-ph-yellow text-ph-blue-dark hover:bg-yellow-300 shadow-[0_4px_20px_rgba(252,209,22,0.3)]",
  secondary:
    "bg-foreground/10 text-foreground border border-foreground/20 hover:bg-foreground/20",
  danger:
    "bg-ph-red/80 text-foreground hover:bg-ph-red shadow-[0_4px_20px_rgba(206,17,38,0.3)]",
};

export default function GlassButton({
  children,
  variant = "primary",
  loading = false,
  type = "button",
  onClick,
  disabled,
  className = "",
}: GlassButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (btnRef.current) pressAnimation(btnRef.current);
    onClick?.();
  };

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 px-5 py-2.5
        rounded-lg font-semibold text-sm
        transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        will-change-transform
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
