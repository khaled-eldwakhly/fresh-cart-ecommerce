import {
  addProductToCart,
  getLoggedUserCart,
  updateCartProductQuantity,
} from "../server/cart.actions";
import { useCartStore } from "../store/cart.store";
import { CartItem } from "../types/cart.types";

export async function sendGuestCartToServer() {
  // ^ 1 collect items from store
  const storeItems = useCartStore.getState().items;

  // ^ 2 get logged user cart from server
  const loggedUserCartResponse = await getLoggedUserCart();
  if (loggedUserCartResponse.status === "success") {
    const serverItems = loggedUserCartResponse.data.products;
    // * checking whether one product from store is similar to another from server
    for (const storeItem of storeItems) {
      const itemExist = serverItems.find(
        (serverItem) => serverItem.product._id === storeItem.product._id,
      );
      // & if storeItem exist in server ---> increase item count (without exceeding the availableQuantity)
      if (itemExist) {
        const available = itemExist.product.quantity;
        const finalCount = Math.min(
          itemExist.count + storeItem.count,
          available,
        );
        console.log({
          serverCount: itemExist.count,
          storeCount: storeItem.count,
          serverAvailable: itemExist.availableQuantity,
          storeAvailable: storeItem.availableQuantity,
          finalCount,
        });
        if (finalCount !== itemExist.count) {
          const updateRes = await updateCartProductQuantity(
            itemExist.product._id,
            finalCount,
          );
          if (updateRes.status !== "success") {
            throw new Error("failed to update cart item");
          }
        }
      }
      // & if storeItem not exist in server ---> add item to server
      if (!itemExist) {
        const finalCount = Math.min(
          storeItem.count,
          storeItem.availableQuantity,
        );

        const addResponse = await addProductToCart(storeItem.product._id);
        if (addResponse.status !== "success") {
          throw new Error("failed to add item to cart");
        }

        if (finalCount > 1) {
          const updateResponse = await updateCartProductQuantity(
            storeItem.product._id,
            finalCount,
          );
          if (updateResponse.status !== "success") {
            throw new Error("failed to update cart item");
          }
        }
      }
    }
  } else {
    throw new Error("error on get user cart");
  }
}

export async function setCartStoreWithAPI() {
  const {
    setItems,
    setCartId,
    setCartOwnerId,
    setCreatedAt,
    setUpdatedAt,
  } = useCartStore.getState();

  const response = await getLoggedUserCart();
  if (response.status !== "success") {
    throw new Error("failed to get user cart");
  }

  setItems(mapServerItems(response.data.products));
  setCartId(response.cartId);
  setCartOwnerId(response.data.cartOwner);
  setCreatedAt(response.data.createdAt);
  setUpdatedAt(response.data.updatedAt);
}

export function mapServerItems(items: CartItem[]): CartItem[] {
  return items.map((item) => ({
    ...item,
    availableQuantity: item.product.quantity,
    discountValue: 0,
    salePercentage: undefined,
  }));
}
