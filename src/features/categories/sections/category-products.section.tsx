import ErrorSection from "@/components/shared/ErrorSection";
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
import { getSpecificCategory } from "../server/categories.actions";
import CategoryProductsSection from "./category-products-page-section";

export default async function CategoryProducts({
  categoryId,
}: {
  categoryId: string;
}) {
  let category;
  try {
    const response = await getSpecificCategory(categoryId);
    category = response.data;
  } catch (error) {
    console.error("Failed to load category:", error);
    return (
      <ErrorSection
        errorMessage={
          error instanceof Error
            ? error.message
            : "An error occurred while loading the category. Please try again."
        }
      />
    );
  }

  return (
    <main>
      <MainHeader hearderMode="categories" />

      <Breadcrumb className="container">
        <BreadcrumbList className="mt-6 text-xl">
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/categories" />}>
              Categories
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              render={
                <Link
                  href={`/categories/${categoryId}`}
                  className="font-semibold text-gray-700"
                />
              }
            >
              {category.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Suspense fallback={<Loading />}>
        <CategoryProductsSection
          categoryId={categoryId}
          categoryName={category.name}
        />
      </Suspense>
    </main>
  );
}