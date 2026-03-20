"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { animateIn, pageTransition, successBounce } from "@/lib/animations";
import { createPost } from "@/app/actions/posts";
import GlassButton from "@/components/ui/GlassButton";
import { Sprout, TrendingUp, TrendingDown, Minus, BarChart3, Upload, CheckCircle } from "lucide-react";

const marketPrices = [
  { crop: "Palay (Rice)", price: "₱22/kg", change: "+₱1.50", trend: "up", region: "Central Luzon" },
  { crop: "White Corn", price: "₱18/kg", change: "-₱0.80", trend: "down", region: "Northern Mindanao" },
  { crop: "Tomato", price: "₱65/kg", change: "+₱12.00", trend: "up", region: "Benguet" },
  { crop: "Kamote (Sweet Potato)", price: "₱28/kg", change: "₱0.00", trend: "flat", region: "Ilocos Region" },
  { crop: "Bangus (Milkfish)", price: "₱180/kg", change: "+₱20.00", trend: "up", region: "Pangasinan" },
  { crop: "Carabao Mango", price: "₱120/kg", change: "-₱5.00", trend: "down", region: "Guimaras" },
];

const trendIcon = { up: <TrendingUp size={16} className="inline-block mr-1" />, down: <TrendingDown size={16} className="inline-block mr-1" />, flat: <Minus size={16} className="inline-block mr-1" /> };
const trendColor = { up: "text-green-400", down: "text-red-400", flat: "text-foreground/50" };

export default function AgriculturePage() {
  const headerRef = useRef<HTMLElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success?: boolean } | null>(null);

  useEffect(() => {
    if (headerRef.current) pageTransition(headerRef.current);
    animateIn(document.querySelectorAll(".price-row"), { delay: 0.3, stagger: 0.07 });
  }, []);

  useEffect(() => {
    if (result?.success && successRef.current) successBounce(successRef.current);
  }, [result]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await createPost(fd);
      setResult(res as { success?: boolean });
      if ((res as { success?: boolean }).success) (e.target as HTMLFormElement).reset();
    });
  }

  return (
    <div className="px-4 md:px-8 py-8 space-y-8">
      <header ref={headerRef}>
        <div className="flex items-center gap-3 mb-2">
          <Sprout size={40} className="text-green-400 drop-shadow-md" />
          <div>
            <h1 className="font-heading font-black text-3xl text-foreground">Agri Connect</h1>
            <p className="text-foreground/50 text-sm">Live market prices · Connect farmers · Share insights</p>
          </div>
        </div>
      </header>

      {/* Market Prices Table */}
      <section className="glass-card p-6 overflow-x-auto">
        <h2 className="font-heading font-bold text-lg text-foreground mb-4 flex items-center"><BarChart3 className="mr-2 text-ph-yellow" size={24} /> Live Market Prices</h2>
        <table className="w-full text-sm min-w-[400px]">
          <thead>
            <tr className="border-b border-foreground/10 text-foreground/50 text-xs uppercase tracking-wider">
              <th className="pb-2 text-left">Commodity</th>
              <th className="pb-2 text-left">Price</th>
              <th className="pb-2 text-left">Change</th>
              <th className="pb-2 text-left">Region</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground/5">
            {marketPrices.map((p) => (
              <tr key={p.crop} className="price-row opacity-0">
                <td className="py-3 font-medium text-foreground">{p.crop}</td>
                <td className="py-3 text-ph-yellow font-bold">{p.price}</td>
                <td className={`py-3 font-medium ${trendColor[p.trend as keyof typeof trendColor]}`}>
                  {trendIcon[p.trend as keyof typeof trendIcon]} {p.change}
                </td>
                <td className="py-3 text-foreground/50">{p.region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Update Price Form */}
      <section className="glass-card p-6">
        <h2 className="font-heading font-bold text-xl text-foreground mb-4 flex items-center"><Upload className="mr-2 text-ph-blue" size={24} /> Share a Market Update</h2>
        {result?.success && (
          <div ref={successRef} className="mb-4 flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg px-4 py-3 text-sm">
            <CheckCircle size={20} /> Price update posted! Helping farmers nationwide.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="category" value="agriculture" />
          <div>
            <label className="block text-foreground/70 text-sm mb-1">Commodity & Price</label>
            <input name="title" type="text" required placeholder="e.g. Kamote — ₱30/kg in Batangas" className="glass-input" />
          </div>
          <div>
            <label className="block text-foreground/70 text-sm mb-1">Additional Info</label>
            <textarea name="content" rows={2} placeholder="Market name, quality notes, contact info…" className="glass-input resize-none" />
          </div>
          <div>
            <label className="block text-foreground/70 text-sm mb-1">Tags</label>
            <input name="tags" type="text" placeholder="rice, luzon, wholesale…" className="glass-input" />
          </div>
          <GlassButton type="submit" loading={isPending}>
            <div className="flex items-center gap-2"><Sprout size={18} /> Post Update</div>
          </GlassButton>
        </form>
      </section>
    </div>
  );
}
