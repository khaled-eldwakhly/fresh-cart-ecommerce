import Image from "next/image";
import Link from "next/link";
import emptyCart from "@/assets/images/empty-cart.png";


export default function EmptyCart() {
  return (
    <>
      <section className="flex flex-col items-center text-center px-4 pb-10">
        <Image
          src={emptyCart}
          alt="empty cart"
          width={400}
          height={400}
          className="max-w-xs md:max-w-sm"
        />
        <p className="text-2xl font-medium">Your cart is empty!</p>
        <div className="mt-6 flex flex-col gap-3 md:flex-row">
          <Link
            href="/products"
            className="bg-green-600 hover:bg-green-700 duration-100 text-white px-6 py-2 rounded-md flex justify-center items-center"
          >
            Browse our products
          </Link>
          <Link
            href="/categories"
            className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white duration-100 px-6 py-2 rounded-md"
          >
            Discover our categories
          </Link>
        </div>
      </section>
    </>
  );
}
