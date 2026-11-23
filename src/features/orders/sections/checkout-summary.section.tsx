import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShippingAddress } from "@/features/addresses/types/addresses.types";
import { setCartStoreWithAPI } from "@/features/cart/helpers/cart.functions";
import { useCartStore } from "@/features/cart/store/cart.store";
import {
  faCcAmex,
  faCcApplePay,
  faCcMastercard,
  faCcPaypal,
  faCcVisa,
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRight,
  faChevronLeft,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import CheckoutSummaryItem from "../components/CheckoutSummaryItem";
import CheckoutSummarySkeleton from "../components/CheckoutSummarySkeleton";
import { checkoutSession, createCashOrder } from "../server/checkout.actions";
import { Data } from "../types/checkout.types";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function CheckoutSummary({
  option,
  address,
  setOrder,
}: {
  option: number;
  address: ShippingAddress | null;
  setOrder: React.Dispatch<React.SetStateAction<Data | null>>;
}) {
  // * option 1 ---> Cash on Delivery
  // * option 2 ---> Online Payment

  const { items, subTotal, totalCartPrice, hasHydrated, cartId } = useCartStore(
    useShallow((state) => ({
      hasHydrated: state.hasHydrated,
      items: state.items,
      subTotal: state.getSubTotal(),
      totalCartPrice: state.getTotalCartPrice(),
      cartId: state.cartId,
    })),
  );

  const [orderLoading, setOrderLoading] = useState(false);

  const router = useRouter();

  function calcTotalCheckout() {
    return totalCartPrice + 20 + 100;
  }

  async function handleCreateCashOrder() {
    if (!address) {
      toast.warning("Select an address!");
      return;
    }
    try {
      setOrderLoading(true);
      const response = await createCashOrder(cartId!, address!);
      if (response.status === "success") {
        setOrder(response.data);
        await setCartStoreWithAPI();
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? `${error.message}` : "Unexpected Error!",
      );
    } finally {
      setOrderLoading(false);
    }
  }

  async function handleCheckoutSession() {
    if (!address) {
      toast.warning("Select an address!");
      return;
    }
    try {
      setOrderLoading(true);
      const response = await checkoutSession(cartId!, address);
      if (response.status === "success") {
        window.location.href = response.session.url;
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? `${error.message}` : "Unexpected Error!",
      );
    } finally {
      setOrderLoading(false);
    }
  }

  if (!hasHydrated) return <CheckoutSummarySkeleton />;

  return (
    <>
      <section className="bg-white p-4 shadow rounded-md space-y-4 xl:flex-2">
        <p className="heading font-bold">Checkout Summary</p>
        <ul className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-1">
          {items.map((item) => (
            <CheckoutSummaryItem item={item} key={item.product._id} />
          ))}
        </ul>
        <Separator />
        <p className="flex justify-between">
          <span>Total products price ({subTotal})</span>
          <span className="font-semibold">{totalCartPrice} EGP</span>
        </p>
        <p className="flex justify-between">
          <span>Tax</span>
          <span className="font-semibold">20 EGP</span>
        </p>
        <p className="flex justify-between">
          <span>Shipping</span>
          <span className="font-semibold">{100} EGP</span>
        </p>
        <Separator />
        <p className="flex justify-between font-bold">
          <span>Total</span>
          <span className="text-primary-600">{calcTotalCheckout()} EGP</span>
        </p>
        <div className="flex flex-col gap-4 *:text-base *:py-5">
          <Button
            className="group"
            disabled={orderLoading}
            onClick={() => {
              if (option === 1) {
                handleCreateCashOrder();
              }
              if (option === 2) {
                handleCheckoutSession();
              }
            }}
          >
            {orderLoading ? (
              <p className="flex items-center gap-1">
                <Spinner className="size-6" /> Creating order
              </p>
            ) : (
              <>
                <span className="font-bold">
                  {option === 2 ? "Proceed to Payment" : "Cash Order"}
                </span>{" "}
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="group-hover:translate-x-1 duration-150"
                />
              </>
            )}
          </Button>
          <Button
            className="bg-transparent text-gray-700 border border-gray-300 group hover:bg-primary-600 hover:text-white"
            onClick={() => {
              router.push("/cart");
            }}
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="group-hover:-translate-x-1 duration-150"
            />{" "}
            Return to Cart
          </Button>
          <div className="space-y-2">
            <p className="font-semibold text-lg">Secure Checkout</p>
            <p>
              <FontAwesomeIcon icon={faLock} className="text-primary-600" />
              <span className="text-gray-600/90 font-medium">
                Your payment information is secure
              </span>
            </p>
            <ul className="*:text-3xl flex gap-2">
              <li>
                <FontAwesomeIcon icon={faCcVisa} className="text-blue-600" />
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faCcMastercard}
                  className="text-red-600"
                />
              </li>
              <li>
                <FontAwesomeIcon icon={faCcAmex} className="text-sky-600" />
              </li>
              <li>
                <FontAwesomeIcon icon={faCcPaypal} className="text-blue-700" />
              </li>
              <li>
                <FontAwesomeIcon icon={faCcApplePay} className="text-black" />
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
