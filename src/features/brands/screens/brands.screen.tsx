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
import BrandsSection from "../sections/brands.section";

export default async function BrandsScreen() {
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
            <BreadcrumbLink
              render={
                <Link href="/brands" className="font-semibold text-gray-700" />
              }
            >
              Brands
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Suspense fallback={<Loading />}>
        <BrandsSection />
      </Suspense>
    </main>
  );
}
