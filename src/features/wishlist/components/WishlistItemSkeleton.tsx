import { Skeleton } from "@/components/ui/skeleton";

export default function WishlistItemSkeleton() {
  return (
    <div className="flex items-center gap-4 border-b py-4">
      <Skeleton className="size-20 shrink-0 rounded-lg" />

      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-4 w-3/5" />
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-5 w-16" />
      </div>

      <div className="flex items-center gap-3">
        <Skeleton className="h-9 w-28 rounded-md" />
        <Skeleton className="size-4 rounded-sm" />
      </div>
    </div>
  );
}
