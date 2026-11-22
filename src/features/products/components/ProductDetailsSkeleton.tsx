export default function ProductDetailsSkeleton() {
  return (
    <section className="container lg:max-w-6xl py-10" aria-busy="true">
      <div className="grid animate-pulse gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="h-60 rounded-2xl bg-gray-200 md:h-110" />
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="size-20 shrink-0 rounded-xl bg-gray-200"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex gap-2">
            <div className="h-7 w-24 rounded-full bg-gray-200" />
            <div className="h-7 w-20 rounded-full bg-gray-200" />
          </div>

          <div className="h-9 w-3/4 rounded-md bg-gray-200" />
          <div className="h-5 w-1/2 rounded-md bg-gray-200" />

          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-2/3 rounded bg-gray-200" />
          </div>

          <div className="flex items-end justify-between border-y border-gray-200 py-4">
            <div className="h-10 w-32 rounded-md bg-gray-200" />
            <div className="h-5 w-24 rounded-md bg-gray-200" />
          </div>

          <div className="h-11 w-full rounded-full bg-gray-200" />
        </div>
      </div>
    </section>
  );
}
