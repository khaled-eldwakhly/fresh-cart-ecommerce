import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "../types/cart.types";

interface CartStore {
  items: CartItem[];
  serverSource: boolean;
  cartId: string | null;
  cartOwnerId: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  setCreatedAt: (date: string | null) => void;
  setUpdatedAt: (date: string | null) => void;
  setCartId: (id: string | null) => void;
  setCartOwnerId: (id: string | null) => void;
  addToCart: (newItem: CartItem) => void;
  removeFromCart: (currentItem: CartItem, deleteFlag: boolean) => void;
  clearCart: () => void;
  getTotalCartPrice: () => number;
  getNumOfCartItems: () => number;
  getCartItemTotalPrice: (currentItem: CartItem) => number;
  getSubTotal: () => number;
  getItemSavedMoney: (currentItem: CartItem) => number;
  getTotalSavedMoney: () => number;
  setItems: (newItems: CartItem[]) => void;
  setServerSource: (serverMode: boolean) => void;
  updateItemCount: (itemId: string, newCount: number) => void;
  // ^ for hydration issue
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [] as CartItem[],
      createdAt: null,
      updatedAt: null,
      cartId: null,
      cartOwnerId: null,
      hasHydrated: false,
      serverSource: false,
      setCreatedAt: (date) => set({ createdAt: date }),
      setUpdatedAt: (date) => set({ updatedAt: date }),
      setCartId: (id) => set({ cartId: id }),
      setCartOwnerId: (id) => set({ cartOwnerId: id }),
      addToCart: (newItem) => {
        set((state) => {
          const itemExist = state.items.some(
            (item) => item.product._id === newItem.product._id,
          );

          if (itemExist) {
            return {
              items: state.items.map((item) =>
                item.product._id === newItem.product._id
                  ? {
                      ...item,
                      count: item.count + 1,
                    }
                  : item,
              ),
            };
          }

          return {
            items: [...state.items, newItem],
          };
        });
      },
      removeFromCart: (currentItem, deleteFlag) => {
        set((state) => {
          return {
            items: deleteFlag
              ? state.items.filter(
                  (item) => item.product._id !== currentItem.product._id,
                )
              : state.items
                  .map((item) =>
                    item.product._id === currentItem.product._id
                      ? { ...item, count: item.count - 1 }
                      : item,
                  )
                  .filter((item) => item.count > 0),
          };
        });
      },
      clearCart: () => {
        set({ items: [] });
      },
      getTotalCartPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.count,
          0,
        );
      },
      getNumOfCartItems: () => {
        return get().items.reduce((total, item) => total + item.count, 0);
      },
      setHasHydrated: (value) => set({ hasHydrated: value }),
      getCartItemTotalPrice: (specificItem) => {
        const currentItem = get().items.find(
          (item) => item.product._id === specificItem.product._id,
        );
        if (!currentItem) return 0;
        return currentItem.count * currentItem.price;
      },
      getSubTotal: () => {
        return get().items.reduce((total) => total + 1, 0);
      },
      getItemSavedMoney: (currentItem) => {
        return currentItem.discountValue! * currentItem.count;
      },
      getTotalSavedMoney: () => {
        return get().items.reduce(
          (total, item) => total + get().getItemSavedMoney(item),
          0,
        );
      },
      setServerSource: (serverMode) =>
        set({
          serverSource: serverMode,
        }),
      setItems: (newItems) =>
        set({
          items: newItems,
        }),
      updateItemCount: (itemId, newCount) => {
        set((state) => ({
          items: state.items
            .map((item) =>
              item.product._id === itemId ? { ...item, count: newCount } : item,
            )
            .filter((item) => item.count > 0),
        }));
      },
    }),

    {
      name: "user-cart",
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
