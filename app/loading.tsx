export default function Loading() {
  return (
    <div className="min-h-screen px-4 md:px-8 py-8">
      {/* Hero skeleton */}
      <div className="mb-10">
        <div className="skeleton h-12 w-64 rounded-xl mb-3" />
        <div className="skeleton h-5 w-96 rounded-lg mb-2" />
        <div className="skeleton h-5 w-72 rounded-lg" />
      </div>

      {/* Cards grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass-card p-6 space-y-3">
            <div className="skeleton h-14 w-14 rounded-xl" />
            <div className="skeleton h-6 w-40 rounded-lg" />
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-3/4 rounded" />
            <div className="skeleton h-4 w-20 rounded mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
