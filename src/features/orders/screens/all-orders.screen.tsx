"use client";

import SectionHeading from "@/components/shared/SectionHeading";
import {
  faClockRotateLeft
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { toast } from "sonner";
import AllOrdersSkeleton from "../components/AllOrdersSkeleton";
import { useOrders } from "../contexts/orders.context";
import AllOrdersSection from "../sections/all-orders.section";
import NoOrders from "../sections/no-orders.section";

export default function AllOrdersScreen() {
  const { orders, isLoading, error } = useOrders();

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <main className="background-gray section-padding">
      <section className="bg-white mx-auto max-w-5xl p-5 rounded-xl">
        <div className="space-y-2 mb-6">
          <SectionHeading icon={faClockRotateLeft} text="All Orders" />
        </div>
        {isLoading ? (
          <AllOrdersSkeleton />
        ) : !orders || orders.length === 0 ? (
          <NoOrders />
        ) : (
          <AllOrdersSection orders={orders} />
        )}
      </section>
    </main>
  );
}
