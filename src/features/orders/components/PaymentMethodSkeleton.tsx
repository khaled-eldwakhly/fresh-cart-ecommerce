import { Skeleton } from "@/components/ui/skeleton";

function PaymentOptionSkeleton() {
  return (
    <div className="border-2 border-gray-200/70 rounded-xl p-4 flex flex-col gap-3">
      <div className="flex gap-3">
        <Skeleton className="size-9 rounded-md shrink-0" />
        <div className="w-full lg:flex lg:justify-between gap-3">
          <div className="space-y-2">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-56 max-w-full" />
          </div>
          <Skeleton className="h-5 w-28 mt-2 lg:mt-0" />
        </div>
      </div>
      <Skeleton className="h-12 w-full rounded-md" />
    </div>
  );
}

export default function PaymentMethodSkeleton() {
  return (
    <section className="bg-white p-4 shadow rounded-md space-y-4 xl:flex-3">
      {/* Payment Method heading */}
      <Skeleton className="h-6 w-40" />

      <div className="space-y-6">
        {/* Payment options */}
        <div className="grid gap-3 grid-cols-1 lg:grid-cols-2 xl:grid-cols-1">
          <PaymentOptionSkeleton />
          <PaymentOptionSkeleton />
        </div>

        {/* User addresses */}
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="border-2 border-gray-200/70 rounded-xl p-4 flex items-center gap-3"
            >
              <Skeleton className="size-5 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          ))}
        </div>

        {/* "or add a new one" */}
        <Skeleton className="h-5 w-32 mx-auto" />

        {/* Address form */}
        <div className="space-y-4 p-3">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-9 w-full" />
          </div>
          <div className="flex items-center gap-3">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-20 w-full" />
          </div>
          <Skeleton className="h-9 w-full" />
        </div>
      </div>
    </section>
  );
}