"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import useCartActions from "@/features/cart/hooks/useCartActions";
import RatingStars from "@/features/products/components/RatingsStars";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useWishlist } from "../contexts/wishlist.context";
import { WishlistItem } from "../types/wishlist.types";

export default function WishlistItemCard({ item }: { item: WishlistItem }) {
  const { addItem } = useCartActions();
  const { removeFromWishlist } = useWishlist();
  const [removing, setRemoving] = useState(false);

  async function handleRemove() {
    setRemoving(true);
    const ok = await removeFromWishlist(item._id);
    if (!ok) {
      toast.error("Something went wrong, try again");
      setRemoving(false);
    }
  }

  function handleAddToCart() {}

  return (
    <div className="flex items-center gap-4 py-4">
      <Link
        href={`/products/${item._id}`}
        className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-gray-100"
      >
        <Image
          src={item.imageCover}
          alt={item.title}
          fill
          sizes="80px"
          className="object-cover"
        />
      </Link>

      <div className="flex-1 min-w-0 space-y-1">
        <p className="text-xs text-gray-500">{item.category?.name}</p>
        <Link href={`/products/${item._id}`}>
          <h3 className="font-medium truncate hover:text-primary-600 duration-200">
            {item.title}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <RatingStars stars={item.ratingsAverage} />
          <span className="text-xs text-gray-500">
            {item.ratingsAverage} ({item.ratingsQuantity})
          </span>
        </div>
        <p className="text-lg font-bold text-primary-600">${item.price}</p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={handleAddToCart}
          className="background-elements font-semibold"
          disabled
        >
          Add to Cart
        </Button>
        <button
          onClick={handleRemove}
          disabled={removing}
          aria-label="Remove from wishlist"
          className="text-gray-400 hover:text-red-500 duration-200 disabled:opacity-50 cursor-pointer"
        >
          {removing ? (
            <Spinner className="size-4" />
          ) : (
            <Trash2 className="size-4" />
          )}
        </button>
      </div>
    </div>
  );
}
