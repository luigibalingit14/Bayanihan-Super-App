"use client";

import { useEffect, useRef } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { animateIn } from "@/lib/animations";
import { BusFront, SearchCheck, Landmark, BriefcaseBusiness, Stethoscope, Sprout, Sun, Bot } from "lucide-react";

const modules = [
  {
    title: "Smart Mobility",
    icon: <BusFront size={28} className="text-foreground" />,
    href: "/modules/mobility",
    description: "Report road issues, track public transit, and improve commute experiences across the Philippines.",
    color: "rgba(0, 56, 168, 0.4)",
  },
  {
    title: "VibeCheck PH",
    icon: <SearchCheck size={28} className="text-foreground" />,
    href: "/modules/disinfo",
    description: "Flag misinformation, verify news, and promote digital literacy in your community.",
    color: "rgba(206, 17, 38, 0.4)",
  },
  {
    title: "Good Governance",
    icon: <Landmark size={28} className="text-foreground" />,
    href: "/modules/governance",
    description: "Track government budgets, submit complaints, and hold local officials accountable.",
    color: "rgba(252, 209, 22, 0.25)",
  },
  {
    title: "Jobs & Livelihood",
    icon: <BriefcaseBusiness size={28} className="text-foreground" />,
    href: "/modules/employment",
    description: "Find jobs, post opportunities, and connect workers with employers across regions.",
    color: "rgba(34, 197, 94, 0.3)",
  },
  {
    title: "Healthcare Access",
    icon: <Stethoscope size={28} className="text-foreground" />,
    href: "/modules/healthcare",
    description: "Book medical appointments, locate clinics, and access health services near you.",
    color: "rgba(59, 130, 246, 0.35)",
  },
  {
    title: "Agri Connect",
    icon: <Sprout size={28} className="text-foreground" />,
    href: "/modules/agriculture",
    description: "View live market prices, connect farmers with buyers, and share agricultural insights.",
    color: "rgba(132, 204, 22, 0.3)",
  },
];

export default function DashboardPage() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      animateIn(heroRef.current, { delay: 0 });
    }
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".glass-card");
      animateIn(cards, { delay: 0.2, stagger: 0.1 });
    }
  }, []);

  return (
    <div className="min-h-screen px-4 md:px-8 py-8">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section ref={heroRef} className="mb-10 opacity-0">
        {/* Philippine sun decoration */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative text-ph-yellow drop-shadow-lg">
            <Sun size={48} className="animate-[spin_20s_linear_infinite]" />
          </div>
          <div>
            <h1 className="font-heading font-black text-3xl md:text-5xl text-foreground leading-tight">
              Bayanihan
              <span className="block text-ph-yellow">Super App</span>
            </h1>
          </div>
        </div>
        <p className="text-foreground/60 text-base md:text-lg max-w-2xl leading-relaxed">
          One platform. Six missions. Empowering every Filipino community through
          technology, transparency, and collective action.
        </p>

        {/* Stats bar */}
        <div className="flex flex-wrap gap-4 mt-6">
          {[
            { label: "Modules", value: "6" },
            { label: "Challenges Solved", value: "6" },
            { label: "Powered By", value: "🇵🇭" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-panel px-4 py-2 flex items-center gap-2"
            >
              <span className="font-heading font-bold text-ph-yellow text-lg">
                {stat.value}
              </span>
              <span className="text-foreground/50 text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Module Cards Grid ─────────────────────────────── */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
      >
        {modules.map((mod) => (
          <div key={mod.href} className="opacity-0">
            <GlassCard
              title={mod.title}
              icon={mod.icon}
              href={mod.href}
              description={mod.description}
              color={mod.color}
            />
          </div>
        ))}
      </div>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="mt-16 text-center text-foreground/30 text-xs leading-relaxed border-t border-foreground/10 pt-8">
        <p>
          <Bot size={14} className="inline-block mr-1 text-foreground/40" /> AI-assisted development — Built for{" "}
          <strong className="text-foreground/50">InterCICSkwela Hackathon 2026</strong>
        </p>
        <p className="mt-1">
          Powered by Next.js 14 · Supabase · GSAP · Tailwind CSS
        </p>
      </footer>
    </div>
  );
}
