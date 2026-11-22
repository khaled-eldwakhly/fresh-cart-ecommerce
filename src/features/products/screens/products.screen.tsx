import Loading from "@/components/shared/loading/Loading";
import MainHeader from "@/components/shared/MainHeader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Suspense } from "react";
import AllProductsSection from "../sections/all-products.section";

export default async function ProductsScreen() {
  return (
    <main>
      <MainHeader hearderMode="products" />
      <Breadcrumb className="container">
        <BreadcrumbList className="text-xl mt-6">
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              render={
                <Link
                  href="/products"
                  className="font-semibold text-gray-700"
                />
              }
            >
              Products
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Suspense fallback={<Loading />}>
        <AllProductsSection />
      </Suspense>
    </main>
  );
}
