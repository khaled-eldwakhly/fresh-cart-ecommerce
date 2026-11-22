import { OrdersProvider } from "@/features/orders/contexts/orders.context";

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OrdersProvider>{children}</OrdersProvider>;
}
