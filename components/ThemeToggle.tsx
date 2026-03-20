"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full glass-panel hover:bg-foreground/10 dark:hover:bg-foreground/5 transition-colors"
      aria-label="Toggle Dark Mode"
    >
      {theme === "dark" ? (
        <Sun size={20} className="text-ph-yellow" />
      ) : (
        <Moon size={20} className="text-ph-blue" />
      )}
    </button>
  );
}
