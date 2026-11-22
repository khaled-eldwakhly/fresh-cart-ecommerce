"use client";

import { useCartStore } from "@/features/cart/store/cart.store";
import { useEffect } from "react";

export default function StoreHydrator() {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  return null;
}
