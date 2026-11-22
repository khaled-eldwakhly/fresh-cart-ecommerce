"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useWishlist } from "../contexts/wishlist.context";

export default function WishlistBtn({ productId }: { productId: string }) {
  const { status } = useSession();
  const router = useRouter();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [pending, setPending] = useState(false);

  const inWishlist = isInWishlist(productId);

  const liked = pending ? !inWishlist : inWishlist;

  async function handleToggle() {
    if (status !== "authenticated") {
      toast.error("Please sign in first");
      router.push("/signin");
      return;
    }

    setPending(true);
    const ok = inWishlist
      ? await removeFromWishlist(productId)
      : await addToWishlist(productId);
    setPending(false);

    if (!ok) {
      toast.error("Something went wrong, try again");
    }
  }

  return (
    <Button
      onClick={handleToggle}
      disabled={pending}
      className="bg-white p-0 shadow shadow-red-200 size-7 rounded-full hover:shadow-none hover:bg-white duration-200"
    >
      <Heart className={`size-5 text-red-500 ${liked ? "fill-red-500" : ""}`} />
    </Button>
  );
}
