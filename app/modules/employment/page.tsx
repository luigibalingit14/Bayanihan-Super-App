"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { animateIn, pageTransition, successBounce } from "@/lib/animations";
import { submitBooking } from "@/app/actions/bookings";
import GlassButton from "@/components/ui/GlassButton";
import { BriefcaseBusiness, CheckCircle, Flame, Building2, MapPin } from "lucide-react";

const mockJobs = [
  { id: "j1", title: "Customer Service Representative", company: "BPO Solutions PH", location: "Cebu City", salary: "₱18,000/mo", type: "Full-time" },
  { id: "j2", title: "Farm Technician", company: "AgriStar Farms", location: "Nueva Ecija", salary: "₱15,000/mo", type: "Full-time" },
  { id: "j3", title: "Freelance Graphic Designer", company: "Remote", location: "Anywhere", salary: "₱500–₱1,500/proj", type: "Freelance" },
  { id: "j4", title: "Barangay Health Worker", company: "Laguna LGU", location: "Calamba, Laguna", salary: "₱10,000/mo", type: "Government" },
  { id: "j5", title: "School Bus Driver", company: "Bright Kids Academy", location: "Davao City", salary: "₱14,000/mo", type: "Full-time" },
];

const typeColor: Record<string, string> = {
  "Full-time": "bg-ph-blue/30 text-blue-300",
  "Freelance": "bg-ph-yellow/20 text-ph-yellow",
  "Government": "bg-green-500/20 text-green-400",
};

export default function EmploymentPage() {
  const headerRef = useRef<HTMLElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();
  const [applied, setApplied] = useState<Set<string>>(new Set());
  const [result, setResult] = useState<{ success?: boolean } | null>(null);

  useEffect(() => {
    if (headerRef.current) pageTransition(headerRef.current);
    animateIn(document.querySelectorAll(".job-card"), { delay: 0.3, stagger: 0.1 });
  }, []);

  useEffect(() => {
    if (result?.success && successRef.current) successBounce(successRef.current);
  }, [result]);

  function handleApply(job: typeof mockJobs[0]) {
    if (applied.has(job.id)) return;
    const fd = new FormData();
    fd.append("service_type", "employment");
    fd.append("provider_name", job.company);
    fd.append("notes", `Applied for: ${job.title}`);
    setApplied((prev) => new Set(prev).add(job.id));
    startTransition(async () => {
      const res = await submitBooking(fd);
      setResult(res as { success?: boolean });
    });
  }

  return (
    <div className="px-4 md:px-8 py-8 space-y-8">
      <header ref={headerRef}>
        <div className="flex items-center gap-3 mb-2">
          <BriefcaseBusiness size={40} className="text-ph-blue drop-shadow-md" />
          <div>
            <h1 className="font-heading font-black text-3xl text-foreground">Jobs & Livelihood</h1>
            <p className="text-foreground/50 text-sm">Find opportunities · Apply instantly · Grow your career</p>
          </div>
        </div>
      </header>

      {result?.success && (
        <div ref={successRef} className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg px-4 py-3 text-sm">
          <CheckCircle size={20} /> Application sent! The employer will contact you soon.
        </div>
      )}

      <section className="space-y-3">
        <h2 className="font-heading font-bold text-lg text-foreground/80 flex items-center"><Flame className="mr-2 text-ph-red drop-shadow-sm" size={20} /> Open Positions ({mockJobs.length})</h2>
        {mockJobs.map((job) => (
          <div key={job.id} className="job-card glass-card p-5 opacity-0">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground text-base leading-snug">{job.title}</h3>
                <p className="text-foreground/50 text-sm mt-0.5 flex items-center gap-3">
                  <span className="flex items-center"><Building2 size={14} className="mr-1.5" /> {job.company}</span>
                  <span className="flex items-center"><MapPin size={14} className="mr-1.5 text-ph-red" /> {job.location}</span>
                </p>
                <p className="text-ph-yellow font-semibold text-sm mt-1">{job.salary}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColor[job.type] ?? "bg-foreground/10 text-foreground/60"}`}>
                {job.type}
              </span>
            </div>
            <div className="mt-4">
              <GlassButton
                variant={applied.has(job.id) ? "secondary" : "primary"}
                onClick={() => handleApply(job)}
                disabled={applied.has(job.id)}
                className="text-sm"
              >
                {applied.has(job.id) ? <><CheckCircle size={16} className="mr-2" /> Applied</> : <><BriefcaseBusiness size={16} className="mr-2"/> Apply Now</>}
              </GlassButton>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
