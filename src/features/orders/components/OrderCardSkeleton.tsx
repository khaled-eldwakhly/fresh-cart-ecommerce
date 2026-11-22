export default function OrderCardSkeleton() {
  return (
    <article className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4 animate-pulse">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="h-5 w-32 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>
        <div className="h-6 w-24 bg-gray-200 rounded" />
      </div>

      <div className="space-y-2">
        <div className="h-4 w-40 bg-gray-200 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
      </div>

      <div className="flex items-center justify-between gap-2 pt-4 border-t border-gray-100">
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-200 rounded-full" />
          <div className="h-6 w-20 bg-gray-200 rounded-full" />
        </div>
        <div className="h-4 w-24 bg-gray-200 rounded" />
      </div>
    </article>
  );
}
