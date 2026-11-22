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
import CategoriesSection from "../sections/categories.section";

export default function CategoriesScreen() {
  return (
    <main>
      <MainHeader hearderMode="categories" />
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
                  href="/categories"
                  className="font-semibold text-gray-700"
                />
              }
            >
              Categories
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Suspense fallback={<Loading />}>
        <CategoriesSection />
      </Suspense>
    </main>
  );
}
