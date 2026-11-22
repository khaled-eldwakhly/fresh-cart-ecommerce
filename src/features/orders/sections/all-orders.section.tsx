import OrderCard from "../components/OrderCard";
import { Order } from "../types/orders.types";

export default function AllOrdersSection({ orders }: { orders: Order[] }) {
  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {[...orders].reverse().map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </section>
    </>
  );
}
