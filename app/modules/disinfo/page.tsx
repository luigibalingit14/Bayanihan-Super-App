"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { animateIn, pageTransition, successBounce } from "@/lib/animations";
import { flagPost, createPost } from "@/app/actions/posts";
import GlassButton from "@/components/ui/GlassButton";
import { SearchCheck, Newspaper, Pin, Flag, CheckCircle, Upload } from "lucide-react";

const mockNews = [
  {
    id: "1",
    title: "Viral claim: Government will give ₱10,000 to all Filipinos",
    source: "Unknown Facebook Page",
    verdict: "FALSE",
    flags: 142,
    time: "1h ago",
  },
  {
    id: "2",
    title: "PAGASA issues warning for Typhoon Ingrid — prepare evacuation",
    source: "PAGASA Official",
    verdict: "TRUE",
    flags: 0,
    time: "3h ago",
  },
  {
    id: "3",
    title: "New law bans all motorcycles on EDSA starting next month",
    source: "Unverified Blog",
    verdict: "MISLEADING",
    flags: 78,
    time: "5h ago",
  },
  {
    id: "4",
    title: "DOH confirms free vaccines available at all RHUs nationwide",
    source: "DOH Philippines",
    verdict: "TRUE",
    flags: 2,
    time: "8h ago",
  },
];

const verdictStyle: Record<string, string> = {
  TRUE: "bg-green-500/20 text-green-400 border-green-500/30",
  FALSE: "bg-ph-red/25 text-red-400 border-red-500/30",
  MISLEADING: "bg-ph-yellow/20 text-ph-yellow border-yellow-500/30",
  UNVERIFIED: "bg-foreground/10 text-foreground/60 border-foreground/20",
};

export default function DisinfoPage() {
  const headerRef = useRef<HTMLElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [result, setResult] = useState<{ success?: boolean } | null>(null);

  useEffect(() => {
    if (headerRef.current) pageTransition(headerRef.current);
    animateIn(document.querySelectorAll(".news-card"), { delay: 0.3, stagger: 0.1 });
  }, []);

  useEffect(() => {
    if (result?.success && successRef.current) successBounce(successRef.current);
  }, [result]);

  function handleFlag(id: string) {
    if (flagged.has(id)) return;
    setFlagged((prev) => new Set(prev).add(id));
    startTransition(async () => { await flagPost(id); });
  }

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
          <SearchCheck size={40} className="text-ph-red drop-shadow-md" />
          <div>
            <h1 className="font-heading font-black text-3xl text-foreground">VibeCheck PH</h1>
            <p className="text-foreground/50 text-sm">Flag misinformation · Verify news · Protect your community</p>
          </div>
        </div>
      </header>

      {/* News Feed */}
      <section className="space-y-3">
        <h2 className="font-heading font-bold text-lg text-foreground/80 flex items-center"><Newspaper className="mr-2" size={20} /> Latest Claims</h2>
        {mockNews.map((item) => (
          <div key={item.id} className="news-card glass-card p-4 opacity-0 flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm leading-snug mb-1">{item.title}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-foreground/40 text-xs flex items-center"><Pin size={12} className="mr-1" /> {item.source}</span>
                  <span className="text-foreground/30 text-xs">· {item.time}</span>
                  {item.flags > 0 && <span className="text-foreground/30 text-xs flex items-center">· <Flag size={12} className="mr-1 ml-1 text-ph-red" /> {item.flags} flags</span>}
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-bold whitespace-nowrap ${verdictStyle[item.verdict]}`}>
                {item.verdict}
              </span>
            </div>
            <div className="mt-3 flex gap-2">
              <GlassButton
                variant={flagged.has(item.id) ? "secondary" : "danger"}
                onClick={() => handleFlag(item.id)}
                disabled={flagged.has(item.id)}
                className="text-xs px-3 py-1.5 flex items-center"
              >
                {flagged.has(item.id) ? <><CheckCircle size={14} className="mr-1.5"/> Flagged</> : <><Flag size={14} className="mr-1.5"/> Flag as Fake</>}
              </GlassButton>
            </div>
          </div>
        ))}
      </section>

      {/* Submit Claim */}
      <section className="glass-card p-6">
        <h2 className="font-heading font-bold text-xl text-foreground mb-4 flex items-center"><Upload className="mr-2 text-ph-yellow" size={24} /> Submit a Claim for Checking</h2>
        {result?.success && (
          <div ref={successRef} className="mb-4 flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg px-4 py-3 text-sm">
            <CheckCircle size={20} /> Claim submitted! Our community will review it.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="category" value="disinfo" />
          <div>
            <label className="block text-foreground/70 text-sm mb-1">Claim / Headline</label>
            <input name="title" type="text" required placeholder="Paste the claim or headline…" className="glass-input" />
          </div>
          <div>
            <label className="block text-foreground/70 text-sm mb-1">Source or Link</label>
            <input name="content" type="text" placeholder="https://… or Facebook post URL" className="glass-input" />
          </div>
          <div>
            <label className="block text-foreground/70 text-sm mb-1">Tags (comma-separated)</label>
            <input name="tags" type="text" placeholder="health, government, scam…" className="glass-input" />
          </div>
          <GlassButton type="submit" loading={isPending}>
            <div className="flex items-center gap-2"><SearchCheck size={18} /> Submit for Review</div>
          </GlassButton>
        </form>
      </section>
    </div>
  );
}
