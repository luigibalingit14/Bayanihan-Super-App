export default function Loading() {
  return (
    <div className="px-4 md:px-8 py-8 space-y-6">
      <div className="skeleton h-10 w-56 rounded-xl" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass-card p-4 space-y-2">
            <div className="skeleton h-5 w-3/4 rounded" />
            <div className="skeleton h-4 w-1/2 rounded" />
            <div className="skeleton h-8 w-28 rounded-lg mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
