import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { mapServerItems } from "../helpers/cart.functions";
import {
  addProductToCart,
  removeProductFromCart,
  updateCartProductQuantity,
} from "../server/cart.actions";
import { useCartStore } from "../store/cart.store";
import { CartItem } from "../types/cart.types";

export default function useCartActions() {
  const [isPending, setIsPending] = useState(false);
  const { status } = useSession();

  const {
    addToCart,
    removeFromCart,
    updateItemCount,
    setItems,
    setServerSource,
    setCartId,
  } = useCartStore(
    useShallow((state) => ({
      addToCart: state.addToCart,
      removeFromCart: state.removeFromCart,
      updateItemCount: state.updateItemCount,
      setItems: state.setItems,
      setServerSource: state.setServerSource,
      setCartId: state.setCartId,
    })),
  );

  function addItem(currentItem: CartItem) {
    if (status !== "authenticated") {
      addToCart(currentItem);
    } else {
      (async () => {
        try {
          setIsPending(true);
          const response = await addProductToCart(currentItem.product._id);
          if (response.status === "success") {
            setServerSource(true);
            setItems(mapServerItems(response.data.products));
            setCartId(response.cartId);
          }
        } catch (error) {
          toast.error(
            error instanceof Error
              ? error.message
              : "failed to complete action!",
          );
        } finally {
          setIsPending(false);
        }
      })();
    }
  }

  function removeItem(currentItem: CartItem, deleteFlag: boolean) {
    if (status !== "authenticated") {
      removeFromCart(currentItem, deleteFlag);
    } else {
      (async () => {
        try {
          setIsPending(true);
          const response = await removeProductFromCart(currentItem.product._id);
          if (response.status === "success") {
            setServerSource(true);
            setItems(mapServerItems(response.data.products));
          }
        } catch (error) {
          toast.error(
            error instanceof Error
              ? error.message
              : "failed to complete action!",
          );
        } finally {
          setIsPending(false);
        }
      })();
    }
  }

  function updateCount(currentItem: CartItem, newCount: number) {
    if (status !== "authenticated") {
      updateItemCount(currentItem.product._id, newCount);
    } else {
      (async () => {
        try {
          setIsPending(true);
          const response = await updateCartProductQuantity(
            currentItem.product._id,
            newCount,
          );
          if (response.status === "success") {
            setServerSource(true);
            setItems(mapServerItems(response.data.products));
          }
        } catch (error) {
          toast.error(
            error instanceof Error
              ? error.message
              : "failed to complete action!",
          );
        } finally {
          setIsPending(false);
        }
      })();
    }
  }

  return { isPending, addItem, removeItem, updateCount };
}
