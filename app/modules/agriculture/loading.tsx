export default function Loading() {
  return (
    <div className="px-4 md:px-8 py-8 space-y-6">
      <div className="skeleton h-10 w-56 rounded-xl" />
      <div className="glass-card p-6">
        <div className="skeleton h-6 w-40 rounded mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="skeleton h-4 w-1/3 rounded" />
              <div className="skeleton h-4 w-16 rounded" />
              <div className="skeleton h-4 w-20 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
