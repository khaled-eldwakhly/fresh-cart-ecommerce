import { Skeleton } from "@/components/ui/skeleton";

export default function CheckoutSummaryItemSkeleton() {
  return (
    <li className="flex gap-4">
      <Skeleton className="size-35 rounded-lg shrink-0" />
      <div className="w-full flex flex-col gap-3">
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-5 w-24" />
      </div>
    </li>
  );
}
