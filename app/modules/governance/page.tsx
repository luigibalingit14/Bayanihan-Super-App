"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { animateIn, pageTransition, successBounce } from "@/lib/animations";
import { submitReport } from "@/app/actions/reports";
import GlassButton from "@/components/ui/GlassButton";
import { Landmark, Coins, Megaphone, CheckCircle } from "lucide-react";

const budgetItems = [
  { item: "Road Rehabilitation Fund", allocated: "₱12.5M", spent: "₱8.2M", pct: 66 },
  { item: "Education Supplies", allocated: "₱4.1M", spent: "₱4.0M", pct: 98 },
  { item: "Healthcare Assistance", allocated: "₱6.8M", spent: "₱3.1M", pct: 46 },
  { item: "Livelihood Programs", allocated: "₱3.3M", spent: "₱1.9M", pct: 58 },
  { item: "Infrastructure Projects", allocated: "₱9.0M", spent: "₱5.7M", pct: 63 },
];

export default function GovernancePage() {
  const headerRef = useRef<HTMLElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success?: boolean } | null>(null);

  useEffect(() => {
    if (headerRef.current) pageTransition(headerRef.current);
    animateIn(document.querySelectorAll(".budget-row"), { delay: 0.3, stagger: 0.06 });
  }, []);

  useEffect(() => {
    if (result?.success && successRef.current) successBounce(successRef.current);
  }, [result]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await submitReport(fd);
      setResult(res as { success?: boolean });
      if ((res as { success?: boolean }).success) (e.target as HTMLFormElement).reset();
    });
  }

  return (
    <div className="px-4 md:px-8 py-8 space-y-8">
      <header ref={headerRef}>
        <div className="flex items-center gap-3 mb-2">
          <Landmark size={40} className="text-ph-yellow drop-shadow-md" />
          <div>
            <h1 className="font-heading font-black text-3xl text-foreground">Good Governance</h1>
            <p className="text-foreground/50 text-sm">Budget transparency · Complaints · Accountability</p>
          </div>
        </div>
      </header>

      {/* Budget Table */}
      <section className="glass-card p-6">
        <h2 className="font-heading font-bold text-lg text-foreground mb-4 flex items-center"><Coins className="mr-2 text-ph-blue" size={24} /> LGU Budget Tracker (2025)</h2>
        <div className="space-y-4">
          {budgetItems.map((b) => (
            <div key={b.item} className="budget-row opacity-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-foreground/80 text-sm font-medium">{b.item}</span>
                <span className="text-foreground/50 text-xs">{b.spent} / {b.allocated}</span>
              </div>
              <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${b.pct}%`,
                    background: b.pct > 90 ? "#CE1126" : b.pct > 60 ? "#FCD116" : "#22c55e",
                  }}
                />
              </div>
              <p className="text-right text-xs mt-0.5" style={{ color: b.pct > 90 ? "#CE1126" : b.pct > 60 ? "#FCD116" : "#22c55e" }}>
                {b.pct}%
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Complaint Form */}
      <section className="glass-card p-6">
        <h2 className="font-heading font-bold text-xl text-foreground mb-4 flex items-center"><Megaphone className="mr-2 text-ph-red" size={24} /> Submit a Complaint</h2>
        {result?.success && (
          <div ref={successRef} className="mb-4 flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg px-4 py-3 text-sm">
            <CheckCircle size={20} /> Complaint filed! Your voice matters.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="category" value="governance" />
          <div>
            <label className="block text-foreground/70 text-sm mb-1">Complaint Type</label>
            <select name="type" required className="glass-input">
              <option value="">Select…</option>
              <option value="Budget Misuse">Budget Misuse</option>
              <option value="Delayed Project">Delayed Project</option>
              <option value="Corruption">Corruption</option>
              <option value="Poor Service">Poor Service Delivery</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-foreground/70 text-sm mb-1">Office / Official Involved</label>
            <input name="location" type="text" placeholder="e.g. Barangay Juan dela Cruz, Cebu" className="glass-input" />
          </div>
          <div>
            <label className="block text-foreground/70 text-sm mb-1">Details</label>
            <textarea name="description" required rows={4} placeholder="Describe the issue with as much detail as possible…" className="glass-input resize-none" />
          </div>
          <GlassButton type="submit" loading={isPending}>
            <div className="flex items-center gap-2"><Megaphone size={18} /> File Complaint</div>
          </GlassButton>
        </form>
      </section>
    </div>
  );
}
