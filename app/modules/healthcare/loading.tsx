export default function Loading() {
  return (
    <div className="px-4 md:px-8 py-8 space-y-6">
      <div className="skeleton h-10 w-56 rounded-xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass-card p-4 space-y-2">
            <div className="skeleton h-5 w-40 rounded" />
            <div className="skeleton h-4 w-32 rounded" />
          </div>
        ))}
      </div>
      <div className="glass-card p-6 space-y-4">
        <div className="skeleton h-6 w-40 rounded" />
        <div className="skeleton h-10 w-full rounded-lg" />
        <div className="skeleton h-10 w-full rounded-lg" />
        <div className="skeleton h-10 w-full rounded-lg" />
        <div className="skeleton h-10 w-36 rounded-lg" />
      </div>
    </div>
  );
}
