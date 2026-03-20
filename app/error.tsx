"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-card p-8 max-w-md w-full text-center space-y-4">
        <div className="text-ph-red mb-2 drop-shadow-sm flex justify-center"><AlertTriangle size={48} /></div>
        <h1 className="font-heading font-bold text-2xl text-foreground">
          Something went wrong
        </h1>
        <p className="text-foreground/60 text-sm leading-relaxed">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-ph-yellow text-ph-blue-dark font-bold text-sm hover:bg-yellow-300 transition-colors w-full sm:w-auto"
        >
          <RefreshCw size={16} /> Try Again
        </button>
      </div>
    </div>
  );
}
