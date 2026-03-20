"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { createClient } from "@/utils/supabase/client";
import { logout } from "@/app/actions/auth";
import {
  BusFront,
  SearchCheck,
  Landmark,
  Home,
  BriefcaseBusiness,
  Stethoscope,
  Sprout,
  Sun,
  Bot,
  LogIn,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/modules/mobility", icon: <BusFront size={20} />, label: "Mobility" },
  { href: "/modules/disinfo", icon: <SearchCheck size={20} />, label: "VibeCheck" },
  { href: "/modules/governance", icon: <Landmark size={20} />, label: "Governance" },
  { href: "/", icon: <Home size={20} />, label: "Home" },
  { href: "/modules/employment", icon: <BriefcaseBusiness size={20} />, label: "Jobs" },
  { href: "/modules/healthcare", icon: <Stethoscope size={20} />, label: "Health" },
  { href: "/modules/agriculture", icon: <Sprout size={20} />, label: "Farm" },
];

export default function ResponsiveNav() {
  const pathname = usePathname();
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null));

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      {/* ── Desktop Sidebar ───────────────────────────────── */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-20 lg:w-56 z-40 glass-panel border-r border-foreground/10 pt-6 pb-4 gap-1">
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 mb-6 text-ph-yellow">
          <Sun size={28} className="drop-shadow-sm" />
          <span className="hidden lg:block font-heading font-bold text-foreground leading-tight">
            Bayanihan
            <br />
            <span className="text-ph-yellow text-xs font-semibold tracking-widest">
              SUPER APP
            </span>
          </span>
        </div>

        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl mx-2 transition-all duration-200 text-sm font-medium ${
                active
                  ? "bg-ph-yellow text-ph-blue-dark font-bold drop-shadow-md"
                  : "text-foreground/70 hover:text-foreground hover:bg-foreground/10"
              }`}
            >
              <div className="flex-shrink-0 flex items-center justify-center w-6">{item.icon}</div>
              <span className="hidden lg:block">{item.label}</span>
            </Link>
          );
        })}

        {/* Auth Button Desktop */}
        <div className="mt-2 mx-2">
          {user ? (
            <button
              onClick={() => logout()}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all duration-200 text-sm font-medium text-foreground/70 hover:text-ph-red hover:bg-ph-red/10"
            >
              <LogOut size={20} />
              <span className="hidden lg:block text-left">Sign Out</span>
            </button>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium text-foreground/70 hover:text-ph-blue hover:bg-ph-blue/10"
            >
              <LogIn size={20} />
              <span className="hidden lg:block">Sign In</span>
            </Link>
          )}
        </div>

        {/* AI Disclosure badge */}
        <div className="mt-auto mx-2 p-3 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center gap-2">
          <p className="hidden lg:block text-foreground/40 text-xs text-center leading-relaxed">
            AI-assisted
            <br />
            Hackathon 2026
          </p>
          <Bot size={20} className="text-foreground/40 lg:hidden" />
        </div>
      </aside>

      {/* ── Mobile Bottom Nav ─────────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-1 py-2 glass-panel border-t border-foreground/15 backdrop-blur-xl bg-ph-blue-dark/80">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg transition-colors duration-200 text-[10px] ${
                active ? "text-ph-yellow" : "text-foreground/60"
              }`}
            >
              <div className={`flex items-center justify-center transition-transform ${active ? "scale-110 drop-shadow-[0_0_8px_rgba(252,209,22,0.8)]" : ""}`}>
                {item.icon}
              </div>
              <span className="truncate max-w-[42px] font-medium">{item.label}</span>
            </Link>
          );
        })}
        {user ? (
          <button
            onClick={() => logout()}
            className="flex flex-col items-center gap-1 px-2 py-1 rounded-lg transition-colors duration-200 text-[10px] text-foreground/60 hover:text-ph-red"
          >
            <div className="flex items-center justify-center transition-transform">
              <LogOut size={20} />
            </div>
            <span className="truncate max-w-[42px] font-medium">Sign Out</span>
          </button>
        ) : (
          <Link
            href="/login"
            className="flex flex-col items-center gap-1 px-2 py-1 rounded-lg transition-colors duration-200 text-[10px] text-foreground/60 hover:text-ph-blue"
          >
            <div className="flex items-center justify-center transition-transform">
              <LogIn size={20} />
            </div>
            <span className="truncate max-w-[42px] font-medium">Sign In</span>
          </Link>
        )}
      </nav>
    </>
  );
}
