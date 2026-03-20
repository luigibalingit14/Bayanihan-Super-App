export default function Loading() {
  return (
    <div className="px-4 md:px-8 py-8 space-y-6">
      <div className="skeleton h-10 w-56 rounded-xl" />
      <div className="glass-card p-6 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-1">
            <div className="skeleton h-4 w-full rounded" />
            <div className="h-2 bg-foreground/10 rounded-full"><div className="skeleton h-full w-2/3 rounded-full" /></div>
          </div>
        ))}
      </div>
    </div>
  );
}
