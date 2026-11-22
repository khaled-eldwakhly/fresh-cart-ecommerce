import OrderDetails from "@/features/orders/screens/order-details";

export const metadata = {
  title: "Order details",
};

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  return (
    <main className="background-gray">
      <div className="container section-padding">
        <OrderDetails orderId={orderId} />
      </div>
    </main>
  );
}
