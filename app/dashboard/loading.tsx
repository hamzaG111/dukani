export default function DashboardLoading() {
  return (
    <div className="flex-1 p-6 space-y-6 animate-pulse">
      {/* TopBar skeleton */}
      <div className="h-14 bg-surface rounded-2xl" />

      {/* Stats skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-surface rounded-3xl" />
        ))}
      </div>

      {/* Content skeleton */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-64 bg-surface rounded-3xl" />
        <div className="h-64 bg-surface rounded-3xl" />
      </div>
    </div>
  );
}
