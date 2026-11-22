"use client";

import SectionHeading from "@/components/shared/SectionHeading";
import { ShippingAddress } from "@/features/addresses/types/addresses.types";
import { useCartStore } from "@/features/cart/store/cart.store";
import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { Data } from "../types/checkout.types";
import OrderInvoice from "../sections/order-invoice.section";
import EmptyCart from "@/features/cart/sections/empty.cart.section";
import PaymentMethod from "../sections/payment-method.section";
import CheckoutSummary from "../sections/checkout-summary.section";


export default function CheckoutScreen() {
  const [option, setOption] = useState<1 | 2>(2);
  // * option 1 ---> Cash on Delivery
  // * option 2 ---> Online Payment

  const [address, setAddress] = useState<ShippingAddress | null>(null);

  const { items, hasHydrated } = useCartStore(
    useShallow((state) => ({
      items: state.items,
      hasHydrated: state.hasHydrated,
    })),
  );

  const [order, setOrder] = useState<Data | null>(null);
  if (order) return <OrderInvoice order={order} />;

  if (items.length === 0 && hasHydrated && !order) {
    return <EmptyCart />;
  }

  return (
    <>
      <main className="background-gray">
        <div className="container lg:max-w-4xl xl:max-w-5xl section-padding space-y-6">
          <SectionHeading icon={faMoneyCheckDollar} text="Checkout" />
          <div className="space-y-9 xl:space-y-0 xl:flex xl:gap-5 xl:items-start">
            <PaymentMethod
              setOption={setOption}
              option={option}
              setAddress={setAddress}
            />
            <CheckoutSummary
              option={option}
              address={address}
              setOrder={setOrder}
            />
          </div>
        </div>
      </main>
    </>
  );
}
