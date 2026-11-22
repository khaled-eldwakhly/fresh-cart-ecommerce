"use client";

import Loading from "@/components/shared/loading/Loading";
import SectionHeading from "@/components/shared/SectionHeading";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { formatDistanceToNow } from "date-fns";
import { useShallow } from "zustand/react/shallow";
import { useCartStore } from "../store/cart.store";
import EmptyCart from "../sections/empty.cart.section";
import CartItems from "../sections/cart-items.section";
import OrderSummary from "../sections/order-summary.section";

export default function CartScreen() {
  const { items, numOfCartItems, hasHydrated, createdAt, updatedAt } =
    useCartStore(
      useShallow((state) => ({
        items: state.items,
        numOfCartItems: state.getNumOfCartItems(),
        hasHydrated: state.hasHydrated,
        createdAt: state.createdAt,
        updatedAt: state.updatedAt,
      })),
    );

  return (
    <main className="background-gray section-padding">
      <section className="bg-white mx-auto container p-5 rounded-xl">
        <div className="space-y-2 mb-6">
          <SectionHeading text="Shopping Cart" icon={faBoxOpen} />
          <p className="text-sm font-medium text-gray-500">
            You have{" "}
            <span className="text-primary-600">{numOfCartItems} items</span> in
            your cart
          </p>
          <div>
            {createdAt && (
              <p>
                Created at:{" "}
                <span className="font-medium text-primary-600">
                  {new Date(createdAt).toLocaleDateString()}
                </span>
              </p>
            )}
            {updatedAt && (
              <p>
                Last update:{" "}
                <span className="font-medium text-primary-600">
                  {formatDistanceToNow(new Date(updatedAt), {
                    addSuffix: true,
                  })}
                </span>
              </p>
            )}
          </div>
        </div>
        {!hasHydrated ? (
          <Loading />
        ) : numOfCartItems === 0 && hasHydrated ? (
          <EmptyCart />
        ) : (
          <div className="lg:flex lg:gap-5 space-y-7 lg:space-y-0">
            <CartItems items={items} />
            <OrderSummary />
          </div>
        )}
      </section>
    </main>
  );
}
