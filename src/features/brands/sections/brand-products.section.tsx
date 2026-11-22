import ErrorSection from "@/components/shared/ErrorSection";
import MainHeader from "@/components/shared/MainHeader";
import ProductsSection from "@/features/products/sections/products.section";
import { getAllProducts } from "@/features/products/server/products.actions";
import { Suspense } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import Loading from "@/components/shared/loading/Loading";
import { getSpecificBrand } from "../server/brands.actions";
import BrandEmptyProducts from "../components/BrandEmptyProducts";

export default async function BrandProducts({ brandId }: { brandId: string }) {
  let specificBrandResponseData;
  let brandProductsResponseData;
  try {
    const specificBrandResponse = await getSpecificBrand(brandId);
    const brandProductsResponse = await getAllProducts({ brand: brandId });
    specificBrandResponseData = specificBrandResponse.data;
    brandProductsResponseData = brandProductsResponse.data;
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
    <main>
      <MainHeader hearderMode="brands" />
      <Breadcrumb className="container">
        <BreadcrumbList className="text-xl mt-6">
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/brands" />}>
              Brands
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              render={
                <Link
                  href={`/brands/${brandId}`}
                  className="font-semibold text-gray-700"
                />
              }
            >
              {specificBrandResponseData.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Suspense fallback={<Loading />}>
        {brandProductsResponseData.length > 0 ? (
          <ProductsSection products={brandProductsResponseData} />
        ) : (
          <BrandEmptyProducts brandName={specificBrandResponseData.name} />
        )}
      </Suspense>
    </main>
  );
}
