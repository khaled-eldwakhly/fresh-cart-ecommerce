import CartBtn from "@/features/cart/components/CartBtn";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../types/products.types";
import RatingStars from "./RatingsStars";
import WishlistBtn from "@/features/wishlist/components/WishlistBtn";

export default function ProductCard({ info }: { info: Product }) {
  const {
    _id,
    imageCover,
    category,
    brand,
    title,
    ratingsAverage,
    ratingsQuantity,
    price,
    priceAfterDiscount,
    quantity,
  } = info;
  const onSale = priceAfterDiscount != null && priceAfterDiscount < price;
  const salePercentage =
    priceAfterDiscount &&
    Math.round(((price - priceAfterDiscount) / price) * 100);

  return (
    <>
      <div className="relative border rounded-lg hover:shadow-lg hover:-translate-y-2 duration-200 px-4 space-y-5 col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-1 flex flex-col h-full">
        <div className="flex-1 space-y-4">
          <Link
            href={`/products/${_id}`}
            className="flex justify-center items-center"
          >
            <div className="relative w-40 h-50">
              <Image
                src={imageCover}
                fill
                alt={`${title}`}
                className="object-cover"
                sizes="160px"
              />
            </div>
          </Link>
          <div className="space-y-2">
            <div className="text-sm text-gray-500 flex justify-between items-center">
              <span>{category.name}</span>
              <span className="bg-gray-100 px-2 py-0.5 rounded font-semibold italic">
                {brand.name}
              </span>
            </div>
            <h3>
              <Link href={`/products/${_id}`} className={`line-clamp-2`}>
                {title}
              </Link>
            </h3>
            <div className="flex items-center gap-2">
              <RatingStars stars={ratingsAverage} />
              <span className="text-[12px] text-gray-400">
                {ratingsAverage} ({ratingsQuantity})
              </span>
            </div>
          </div>
        </div>
        <p>
          available quantity: <span className="font-semibold">{quantity}</span>
        </p>
        <div className="flex items-center justify-between">
          {onSale ? (
            <div className="flex items-center gap-2">
              <span className="font-bold text-primary-600">
                {priceAfterDiscount} EGP
              </span>
              <span className="text-gray-500 text-sm line-through">
                {price} EGP
              </span>
            </div>
          ) : (
            <span className="font-bold">{price} EGP</span>
          )}
          <CartBtn product={info} />
        </div>
        <div className="absolute top-3 right-3 flex flex-col gap-3 text-lg">
          <WishlistBtn productId={_id} />
          <Link
            href={`/products/${_id}`}
            className="bg-white p-0 shadow shadow-emerald-200 size-7 rounded-full hover:shadow-none hover:bg-white duration-200 flex justify-center items-center"
          >
            <FontAwesomeIcon icon={faEye} className="text-primary-500" />
          </Link>
        </div>
        {onSale && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-[12px] px-2 py-0.5 rounded">
            -{salePercentage}%
          </div>
        )}
      </div>
    </>
  );
}
