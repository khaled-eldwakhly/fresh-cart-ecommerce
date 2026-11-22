"use client";

import { Spinner } from "@/components/ui/spinner";
import { Product } from "@/features/products/types/products.types";
import { faCartPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useCartActions from "../hooks/useCartActions";
import { useCartStore } from "../store/cart.store";
import { CartItem } from "../types/cart.types";

export default function CartBtn({
  product,
  detailsFlag,
}: {
  product: Product;
  detailsFlag?: boolean;
}) {
  const items = useCartStore((state) => state.items);

  const { addItem, removeItem, isPending } = useCartActions();

  const cartItemBtn: CartItem = {
    count: 1,
    availableQuantity: product.quantity,
    price: product.priceAfterDiscount ?? product.price,
    product: {
      _id: product._id,
      brand: product.brand,
      category: product.category,
      id: product.id,
      imageCover: product.imageCover,
      quantity: product.quantity,
      ratingsAverage: product.ratingsAverage,
      slug: product.slug,
      subcategory: product.subcategory,
      title: product.title,
    },
    discountValue: product.priceAfterDiscount
      ? product.price - product.priceAfterDiscount
      : 0,
    salePercentage:
      product.priceAfterDiscount &&
      Math.round(
        ((product.price - product.priceAfterDiscount) / product.price) * 100,
      ),
  };

  const inCart = items.some((item) => item.product._id === product._id);

  return (
    <>
      <button
        className={`${inCart ? "bg-red-600" : "bg-primary-600"} ${detailsFlag ? "w-full gap-2 py-2 rounded-lg" : "size-10 rounded-full"} text-lg text-white flex justify-center items-center disabled:opacity-60 disabled:cursor-not-allowed`}
        onClick={() => {
          if (inCart) {
            removeItem(cartItemBtn, true);
          } else {
            addItem(cartItemBtn);
          }
        }}
        disabled={isPending}
      >
        {isPending ? (
          <Spinner className="size-5.5" />
        ) : detailsFlag ? (
          <>
            <FontAwesomeIcon icon={inCart ? faTrashCan : faCartPlus} />
            <span>{inCart ? "Delete from Cart" : "Add to Cart"}</span>
          </>
        ) : (
          <FontAwesomeIcon icon={inCart ? faTrashCan : faCartPlus} />
        )}
      </button>
    </>
  );
}
