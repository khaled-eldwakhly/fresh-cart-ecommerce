import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  faCheck,
  faLeftLong,
  faMoneyBillTransfer,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Trash2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { useCartStore } from "../store/cart.store";
import { clearUserCart } from "../server/cart.actions";

export default function OrderSummary() {
  const { totalCartPrice, subTotal, totalPieces, clearCart, totalSavedMoney } =
    useCartStore(
      useShallow((state) => ({
        totalCartPrice: state.getTotalCartPrice(),
        subTotal: state.getSubTotal(),
        totalPieces: state.getNumOfCartItems(),
        clearCart: state.clearCart,
        totalSavedMoney: state.getTotalSavedMoney(),
      })),
    );

  const { status } = useSession();

  async function checkoutOrder() {
    if (status === "unauthenticated") {
      toast.warning("You must sign in first!");
      redirect("/signin");
    }
    if (status === "authenticated") {
      redirect("/orders/checkout");
    }
  }

  async function clearCart_() {
    if (status === "authenticated") {
      toast.promise(
        (async () => {
          const response = await clearUserCart();

          if (response.status === "success") {
            clearCart();
          } else {
            throw new Error("Failed to clear cart");
          }
        })(),
        {
          loading: "Clearing cart...",
          success: "Cart cleared successfully!",
          error: "Failed to clear cart.",
        },
      );
    } else {
      clearCart();
    }
  }

  return (
    <>
      <div className="bg-white rounded-xl overflow-hidden shadow lg:flex-2 h-fit sticky top-0">
        <h4 className="bg-slate-800 text-white p-4 font-semibold text-lg">
          Order Summary
        </h4>
        <div className="p-4 space-y-5">
          <div className="space-y-2">
            <p className="flex justify-between">
              <span className="font-medium">
                Subtotal <span className="font-bold">({subTotal})</span>
              </span>
              <span className="font-bold">{totalCartPrice} EGP</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Total pieces</span>
              <span className="font-bold">{totalPieces} pieces</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Shipping</span>
              <span className="font-semibold text-primary-500">
                Calculated at ckeckout
              </span>
            </p>
          </div>
          <Separator />
          <div className="space-y-3">
            <p className="flex justify-between font-bold">
              <span>Estimated Total</span>
              <span className="text-primary-600">
                {Number((totalCartPrice * 0.14 + totalCartPrice).toFixed(2))}{" "}
                EGP
              </span>
            </p>
            <p className="-mt-2 font-medium">* 14% VAT was applied</p>
          </div>
          {totalSavedMoney > 0 && (
            <p className="bg-primary-100 text-primary-600 font-semibold px-1 py-1 rounded-md border border-primary-300 text-center">
              Our discounts saved {totalSavedMoney} EGP for you!
            </p>
          )}
          <Button
            className="w-full font-semibold text-base py-5 flex justify-center items-center group"
            onClick={checkoutOrder}
          >
            Checkout Now{" "}
            <FontAwesomeIcon
              icon={faMoneyBillTransfer}
              className="group-hover:rotate-180 duration-200"
            />
          </Button>
          <Separator />
          <ul className="space-y-2 text-primary-500 font-semibold">
            <li className="space-x-1">
              <FontAwesomeIcon icon={faCheck} />
              <span>Your cart items will be saved</span>
            </li>
            <li className="space-x-1">
              <FontAwesomeIcon icon={faCheck} />
              <span>Track your orders easily</span>
            </li>
            <li className="space-x-1">
              <FontAwesomeIcon icon={faCheck} />
              <span>Access exclusive member deals</span>
            </li>
          </ul>
        </div>
        <div className="border-t bg-gray-50 px-3 py-4 flex flex-col lg:flex-row items-center lg:justify-between gap-2 font-medium text-sm">
          <Link href={"/"} className="text-primary-500 group">
            <FontAwesomeIcon
              icon={faLeftLong}
              className="group-hover:-translate-x-1 duration-150"
            />{" "}
            Continue Shopping
          </Link>
          <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button className="text-red-600 group bg-transparent hover:bg-transparent">
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="group-hover:scale-120 duration-150"
                  />{" "}
                  <span>Clear all items</span>
                </Button>
              }
            />
            <AlertDialogContent size="sm" className={"-space-y-3 p-5"}>
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                  <Trash2Icon />
                </AlertDialogMedia>
                <AlertDialogTitle className={"text-base w-full!"}>
                  Sure you want to empty your cart?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={clearCart_}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  );
}
