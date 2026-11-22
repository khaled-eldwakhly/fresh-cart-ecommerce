"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function EmptyWishlist() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto my-10 flex max-w-md flex-col items-center rounded-xl bg-white p-10 text-center shadow-lg"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 animate-ping rounded-full bg-red-100 opacity-60" />
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex size-24 items-center justify-center rounded-full bg-red-50"
        >
          <Heart className="size-11 fill-red-200 text-red-400" />
        </motion.div>
      </div>

      <h2 className="text-2xl font-bold">Your wishlist is empty</h2>
      <p className="mt-2 text-gray-500">
        Tap the heart on any product you love and it will show up here, so you
        can find it later.
      </p>

        <Link href="/products" className="bg-primary-600 text-white px-4 py-2 rounded-md flex gap-1.5 group mt-4">
          <ShoppingBag className="size-5 group-hover:scale-110 duration-200" />
          <span>Browse Products</span>
        </Link>
    </motion.div>
  );
}
