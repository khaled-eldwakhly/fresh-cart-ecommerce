import { CartItem } from "@/features/cart/types/cart.types";
import Image from "next/image";

export default function CheckoutSummaryItem({ item }: { item: CartItem }) {
  return (
    <>
      <li className="flex gap-4">
        <div className="relative size-35 rounded-lg overflow-hidden border">
          <Image
            src={item.product.imageCover}
            alt={item.product.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="font-semibold w-full flex flex-col gap-3">
          <div>
            <p>{item.product.title}</p>
            <span className="text-gray-500/80">Qty: {item.count}</span>
          </div>
          <span>{item.price} EGP</span>
        </div>
      </li>
    </>
  );
}
