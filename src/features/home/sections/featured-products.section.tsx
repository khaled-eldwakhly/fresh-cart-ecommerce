import ErrorSection from "@/components/shared/ErrorSection";
import ProductsSection from "@/features/products/sections/products.section";
import { getAllProducts } from "@/features/products/server/products.actions";
import { ProductsResponse } from "@/features/products/types/products.types";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default async function FeaturedProducts() {
  let productsResponse: ProductsResponse;

  try {
    productsResponse = await getAllProducts({ limit: 20 });
  } catch (error) {
    console.error("Failed to load products:", error);
    return (
      <ErrorSection
        errorMessage={
          error instanceof Error
            ? error.message
            : "An error occurred while loading the products. Please try again."
        }
      />
    );
  }

  return (
    <section className="container section-padding space-y-9">
      <div className="space-y-1 sm:space-y-0 flex flex-col sm:flex-row items-center justify-between relative ml-4 before:absolute before:bg-linear-0 before:from-green-900 before:to-green-300 before:w-1.5 before:h-full sm:before:h-[calc(100%-4px)] before:-left-4 before:top-1/2 before:-translate-y-1/2 before:rounded-full">
        <span className="capitalize font-bold text-2xl md:text-3xl">
          featured <span className="text-primary-600">products</span>
        </span>
        <Link
          href={"/"}
          className="capitalize text-lg sm:text-lg text-primary-600 group"
        >
          view all products
          <FontAwesomeIcon
            icon={faArrowRight}
            className="ml-1.25 group-hover:translate-x-2 duration-150"
          />
        </Link>
      </div>
      <ProductsSection products={productsResponse.data} />
    </section>
  );
}
