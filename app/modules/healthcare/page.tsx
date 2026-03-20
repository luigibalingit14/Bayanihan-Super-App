"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { animateIn, pageTransition, successBounce } from "@/lib/animations";
import { submitBooking } from "@/app/actions/bookings";
import GlassButton from "@/components/ui/GlassButton";
import { Stethoscope, Map, MapPin, Calendar, CheckCircle, Hospital } from "lucide-react";

const clinics = [
  { id: "c1", name: "Ospital ng Maynila", type: "Government Hospital", location: "Manila", available: true },
  { id: "c2", name: "Cebu City Medical Center", type: "Government Hospital", location: "Cebu City", available: true },
  { id: "c3", name: "Davao City Health Office", type: "Health Center", location: "Davao City", available: false },
  { id: "c4", name: "Rural Health Unit — San Jose", type: "RHU", location: "Occidental Mindoro", available: true },
];

const services = ["General Consultation", "Vaccination", "Prenatal Check-up", "Dental", "Mental Health Consult", "Laboratory Tests"];

export default function HealthcarePage() {
  const headerRef = useRef<HTMLElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success?: boolean } | null>(null);

  useEffect(() => {
    if (headerRef.current) pageTransition(headerRef.current);
    animateIn(document.querySelectorAll(".clinic-card"), { delay: 0.3, stagger: 0.09 });
  }, []);

  useEffect(() => {
    if (result?.success && successRef.current) successBounce(successRef.current);
  }, [result]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await submitBooking(fd);
      setResult(res as { success?: boolean });
      if ((res as { success?: boolean }).success) (e.target as HTMLFormElement).reset();
    });
  }

  return (
    <div className="px-4 md:px-8 py-8 space-y-8">
      <header ref={headerRef}>
        <div className="flex items-center gap-3 mb-2">
          <Stethoscope size={40} className="text-ph-blue drop-shadow-md" />
          <div>
            <h1 className="font-heading font-black text-3xl text-foreground">Healthcare Access</h1>
            <p className="text-foreground/50 text-sm">Book appointments · Locate clinics · Access health services</p>
          </div>
        </div>
      </header>

      {/* Clinic Finder */}
      <section>
        <h2 className="font-heading font-bold text-lg text-foreground/80 mb-3 flex items-center"><Map className="mr-2 text-ph-yellow" size={20} /> Nearby Facilities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {clinics.map((c) => (
            <div key={c.id} className="clinic-card glass-card p-4 opacity-0 flex items-start gap-3">
              <Hospital size={24} className="mt-1 text-foreground/80" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm">{c.name}</p>
                <p className="text-foreground/50 text-xs flex items-center">{c.type} · <MapPin size={12} className="mx-1 text-ph-red" /> {c.location}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${c.available ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                {c.available ? "Available" : "Fully Booked"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Form */}
      <section className="glass-card p-6">
        <h2 className="font-heading font-bold text-xl text-foreground mb-4 flex items-center"><Calendar className="mr-2 text-ph-blue" size={24} /> Book an Appointment</h2>
        {result?.success && (
          <div ref={successRef} className="mb-4 flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg px-4 py-3 text-sm">
            <CheckCircle size={20} /> Appointment booked! Check your notifications for confirmation.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="service_type" value="healthcare" />
          <div>
            <label className="block text-foreground/70 text-sm mb-1">Facility</label>
            <select name="provider_name" required className="glass-input">
              <option value="">Select facility…</option>
              {clinics.filter(c => c.available).map(c => (
                <option key={c.id} value={c.name}>{c.name} — {c.location}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-foreground/70 text-sm mb-1">Service</label>
            <select name="notes" required className="glass-input">
              <option value="">Select service…</option>
              {services.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-foreground/70 text-sm mb-1">Preferred Date & Time</label>
            <input name="scheduled_at" type="datetime-local" className="glass-input" />
          </div>
          <GlassButton type="submit" loading={isPending}>
            <div className="flex items-center gap-2"><Stethoscope size={18} /> Book Appointment</div>
          </GlassButton>
        </form>
      </section>
    </div>
  );
}
