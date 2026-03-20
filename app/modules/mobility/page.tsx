"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { animateIn, pageTransition, successBounce } from "@/lib/animations";
import { submitReport } from "@/app/actions/reports";
import GlassButton from "@/components/ui/GlassButton";
import { BusFront, MapPin, AlertTriangle, FileText, CheckCircle, AlertCircle } from "lucide-react";

const mockIncidents = [
  { id: 1, type: "Pothole", location: "EDSA, Mandaluyong", status: "In Review", time: "2h ago" },
  { id: 2, type: "Flooded Road", location: "Quezon Ave, QC", status: "Resolved", time: "4h ago" },
  { id: 3, type: "Traffic Signal Down", location: "Ayala Ave, Makati", status: "Pending", time: "6h ago" },
  { id: 4, type: "Road Obstruction", location: "C5 Road, Taguig", status: "In Review", time: "1d ago" },
];

const statusColor: Record<string, string> = {
  "Pending": "bg-ph-yellow/20 text-ph-yellow",
  "In Review": "bg-ph-blue/30 text-blue-300",
  "Resolved": "bg-green-500/20 text-green-400",
};

export default function MobilityPage() {
  const headerRef = useRef<HTMLElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success?: boolean; error?: unknown } | null>(null);

  useEffect(() => {
    if (headerRef.current) pageTransition(headerRef.current);
    const cards = document.querySelectorAll(".incident-card");
    animateIn(cards, { delay: 0.3, stagger: 0.08 });
  }, []);

  useEffect(() => {
    if (result?.success && successRef.current) {
      successBounce(successRef.current);
    }
  }, [result]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await submitReport(fd);
      setResult(res);
      if (res.success) (e.target as HTMLFormElement).reset();
    });
  }

  return (
    <div className="px-4 md:px-8 py-8 space-y-8">
      <header ref={headerRef}>
        <div className="flex items-center gap-3 mb-2">
          <BusFront size={40} className="text-ph-yellow drop-shadow-md" />
          <div>
            <h1 className="font-heading font-black text-3xl text-foreground">Smart Mobility</h1>
            <p className="text-foreground/50 text-sm">Report road issues · Track transit · Improve commutes</p>
          </div>
        </div>
      </header>

      {/* Live Incidents */}
      <section>
        <h2 className="font-heading font-bold text-lg text-foreground/80 mb-3 flex items-center"><MapPin className="mr-2 text-ph-red" size={20}/> Recent Incidents</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mockIncidents.map((inc) => (
            <div key={inc.id} className="incident-card glass-card p-4 flex items-start gap-3 opacity-0">
              <div className="mt-1"><AlertTriangle size={24} className="text-ph-yellow drop-shadow-sm" /></div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm">{inc.type}</p>
                <p className="text-foreground/50 text-xs truncate">{inc.location}</p>
                <p className="text-foreground/30 text-xs mt-0.5">{inc.time}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${statusColor[inc.status]}`}>
                {inc.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Report Form */}
      <section className="glass-card p-6">
        <h2 className="font-heading font-bold text-xl text-foreground mb-4 flex items-center"><FileText className="mr-2 text-ph-blue" size={24} /> Report an Issue</h2>
        {result?.success && (
          <div ref={successRef} className="mb-4 flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg px-4 py-3 text-sm">
            <CheckCircle size={20} /> Report submitted successfully! Thank you for helping your community.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="category" value="mobility" />
          <div>
            <label className="block text-foreground/70 text-sm mb-1">Issue Type</label>
            <select name="type" required className="glass-input">
              <option value="">Select type…</option>
              <option value="Pothole">Pothole</option>
              <option value="Flooded Road">Flooded Road</option>
              <option value="Traffic Signal Down">Traffic Signal Down</option>
              <option value="Road Obstruction">Road Obstruction</option>
              <option value="Broken Sidewalk">Broken Sidewalk</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-foreground/70 text-sm mb-1">Location</label>
            <input name="location" type="text" placeholder="e.g. EDSA cor. Ortigas, Pasig" className="glass-input" />
          </div>
          <div>
            <label className="block text-foreground/70 text-sm mb-1">Description</label>
            <textarea name="description" required rows={3} placeholder="Describe the issue in detail…" className="glass-input resize-none" />
          </div>
          <GlassButton type="submit" loading={isPending}>
            <div className="flex items-center gap-2"><AlertCircle size={18} /> Submit Report</div>
          </GlassButton>
        </form>
      </section>
    </div>
  );
}
