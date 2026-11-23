"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { useCartStore } from "../store/cart.store";
import { sendGuestCartToServer, setCartStoreWithAPI } from "./cart.functions";

export default function CartFetcher() {
  const isSyncing = useRef(false);
  const { status } = useSession();
  const { clearCart, setServerSource, hasHydrated } = useCartStore(
    useShallow((state) => ({
      clearCart: state.clearCart,
      setServerSource: state.setServerSource,
      hasHydrated: state.hasHydrated,
    })),
  );

  useEffect(() => {
    if (!hasHydrated) return;
    if (status === "loading") return;

    if (status == "unauthenticated") {
      const serverSource = useCartStore.getState().serverSource;
      if (serverSource) {
        clearCart();
        setServerSource(false);
      }
      return;
    }

    // ~ stop strict mode
    if (isSyncing.current) return;
    isSyncing.current = true;

    async function sync() {
      const { serverSource, items } = useCartStore.getState();

      const syncPromise = (async () => {
        if (!serverSource && items.length > 0) {
          await sendGuestCartToServer();
        }
        await setCartStoreWithAPI();
        setServerSource(true);
      })();

      if (!serverSource) {
        toast.promise(syncPromise, {
          loading: "Loading your cart...",
          success: "Cart loaded successfully!",
          error: "Failed to load cart.",
        });
      }

      try {
        await syncPromise;
      } catch (error) {
      } finally {
        isSyncing.current = false;
      }
    }

    sync();
  }, [status, hasHydrated]);

  return null;
}
