import { Skeleton } from "@/components/ui/skeleton";
import WishlistItemSkeleton from "./WishlistItemSkeleton";

export default function WishlistSkeleton({ count = 6 }: { count?: number }) {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-6">
      <div className="border-t">
        {Array.from({ length: count }, (_, i) => (
          <WishlistItemSkeleton key={i} />
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        <Skeleton className="size-9 rounded-md" />
        <Skeleton className="size-9 rounded-md" />
        <Skeleton className="size-9 rounded-md" />
        <Skeleton className="size-9 rounded-md" />
      </div>
    </section>
  );
}
