import OrderCardSkeleton from "./OrderCardSkeleton";

export default function AllOrdersSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <OrderCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
}
