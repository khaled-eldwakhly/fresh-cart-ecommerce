"use client";

import { useSession } from "next-auth/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  addProductToWishlist,
  getLoggedUserWishlist,
  removeProductFromWishlist,
} from "../server/wishlist.actions";
import { WishlistItem } from "../types/wishlist.types";

type WishlistContextType = {
  wishlistItems: WishlistItem[] | null;
  wishlistCount: number | null;
  loading: boolean;
  error: string | null;
  isInWishlist: (productId: string) => boolean;
  addToWishlist: (productId: string) => Promise<boolean>;
  removeFromWishlist: (productId: string) => Promise<boolean>;
  refetchWishlist: () => Promise<void>;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[] | null>(
    null,
  );
  const [wishlistCount, setWishlistCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { status } = useSession();

  const refetchWishlist = useCallback(async () => {
    try {
      const response = await getLoggedUserWishlist();
      setWishlistItems(response.data);
      setWishlistCount(response.count);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error!");
    }
  }, []);

  // ^ يجيب الداتا لما الـ session تجهز (ويفضّيها لو اليوزر عمل logout)
  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      setWishlistItems([]);
      setWishlistCount(0);
      setLoading(false);
      return;
    }

    setLoading(true);
    refetchWishlist().finally(() => setLoading(false));
  }, [status, refetchWishlist]);

  function isInWishlist(productId: string) {
    return !!wishlistItems?.some((item) => item._id === productId);
  }

  // ^ إضافة: بنستنى الـ API وبعدين نعمل refetch علشان نجيب بيانات المنتج كاملة
  async function addToWishlist(productId: string) {
    const response = await addProductToWishlist(productId);
    if (response.ok) await refetchWishlist();
    return response.ok;
  }

  // ^ حذف: بنشيله من الـ UI فوراً، ولو الـ API فشل بنرجّعه
  async function removeFromWishlist(productId: string) {
    const prevItems = wishlistItems;
    const prevCount = wishlistCount;

    setWishlistItems((items) =>
      (items ?? []).filter((item) => item._id !== productId),
    );
    setWishlistCount((count) => Math.max((count ?? 1) - 1, 0));

    const response = await removeProductFromWishlist(productId);
    if (!response.ok) {
      setWishlistItems(prevItems);
      setWishlistCount(prevCount);
    }
    return response.ok;
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        loading,
        error,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        refetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error("useWishlist must be used inside WishlistProvider");
  return context;
}
