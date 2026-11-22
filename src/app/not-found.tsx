import Link from "next/link";
import Image from "next/image";
import notFoundImg from "@/assets/images/404.svg";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center text-center px-4 py-10 pb-12">
      <Image
        src={notFoundImg}
        alt="Page not found"
        width={400}
        height={400}
        className="max-w-xs md:max-w-sm"
      />
      <h1 className="text-2xl font-bold text-gray-800 mt-6">
        Oops! This page doesn't exist.
      </h1>
      <p className="text-gray-500 mt-2 max-w-md">
        The page might have been moved or deleted, or there’s a small error in
        the link.
      </p>
      <div className="mt-6 flex flex-col gap-3 md:flex-row">
        <Link
          href="/"
          className="bg-green-600 hover:bg-green-700 duration-100 text-white px-6 py-2 rounded-md flex justify-center items-center"
        >
          Back to Home
        </Link>
        <Link
          href="/categories"
          className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white duration-100 px-6 py-2 rounded-md"
        >
          Discover our categories
        </Link>
      </div>
    </div>
  );
}
