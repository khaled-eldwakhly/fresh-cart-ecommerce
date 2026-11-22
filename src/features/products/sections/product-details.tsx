import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CartBtn from "@/features/cart/components/CartBtn";
import Link from "next/link";
import ProductGallery from "../components/ProductGallery";
import RatingStars from "../components/RatingsStars";
import { ProductDetails } from "../types/products.types";

export default function ProductDetailsSection({
  product,
}: {
  product: ProductDetails;
}) {
  const inStock = product.quantity > 0;
 
  return (
    <section className="container lg:max-w-6xl py-10">
      <Breadcrumb className="mb-6">
        <BreadcrumbList className="text-base">
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              render={<Link href={`/categories/${product.category._id}`} />}
            >
              {product.category.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <span className="line-clamp-1 font-semibold text-gray-700">
              {product.title}
            </span>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid gap-10 md:grid-cols-2">
        <ProductGallery
          imgCover={product.imageCover}
          imgs={product.images}
          title={product.title}
        />

        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-green-100 px-3 py-1 font-medium text-green-700">
              {product.category.name}
            </span>
            <span className="rounded-full bg-fuchsia-100 px-3 py-1 font-medium text-fuchsia-700">
              {product.brand.name}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <RatingStars stars={product.ratingsAverage} />
            <span>{product.ratingsAverage}</span>
            <span>({product.ratingsQuantity} reviews)</span>
            <span className="text-gray-300">|</span>
            <span>{product.sold} sold</span>
          </div>

          <p className="leading-relaxed text-gray-600">{product.description}</p>

          <div className="flex items-end justify-between border-y border-gray-200 py-4">
            <p className="text-4xl font-bold text-green-600">
              {product.price}{" "}
              <span className="text-lg font-medium text-gray-500">EGP</span>
            </p>
            <p
              className={`text-sm font-semibold ${
                inStock ? "text-green-600" : "text-red-500"
              }`}
            >
              {inStock ? `${product.quantity} in stock` : "Out of stock"}
            </p>
          </div>

          <CartBtn product={product} detailsFlag />

          {product.subcategory.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-gray-500">Tags:</span>
              {product.subcategory.map((sub) => (
                <span
                  key={sub._id}
                  className="rounded-md bg-gray-100 px-2 py-1 text-gray-600"
                >
                  {sub.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
