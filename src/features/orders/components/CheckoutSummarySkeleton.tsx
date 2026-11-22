import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import CheckoutSummaryItemSkeleton from "./CheckoutSummaryItemSkeleton";

export default function CheckoutSummarySkeleton() {
  return (
    <section className="bg-white p-4 shadow rounded-md space-y-4 xl:flex-2">
      {/* Checkout Summary heading */}
      <Skeleton className="h-6 w-44" />

      {/* Items */}
      <ul className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <CheckoutSummaryItemSkeleton key={i} />
        ))}
      </ul>

      <Separator />

      {/* Total products price / Tax / Shipping */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex justify-between">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-5 w-20" />
        </div>
      ))}

      <Separator />

      {/* Total */}
      <div className="flex justify-between">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-28" />
      </div>

      {/* Buttons (py-5 + text-base ≈ h-12) */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </section>
  );
}
