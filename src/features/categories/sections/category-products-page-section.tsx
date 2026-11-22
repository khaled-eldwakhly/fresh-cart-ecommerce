import ErrorSection from "@/components/shared/ErrorSection";
import { getAllProducts } from "@/features/products/server/products.actions";
import ProductsSection from "@/features/products/sections/products.section";
import CategoryEmptyProducts from "../components/CategoryEmptyProducts";

export default async function CategoryProductsSection({
  categoryId,
  categoryName,
}: {
  categoryId: string;
  categoryName: string;
}) {
  let products;
  try {
    const response = await getAllProducts({ category: categoryId });
    products = response.data;
  } catch (error) {
    console.error("Failed to load products:", error);
    return (
      <ErrorSection
        errorMessage={
          error instanceof Error
            ? error.message
            : "An error occurred while loading the products."
        }
      />
    );
  }

  if (products.length === 0) {
    return <CategoryEmptyProducts categoryName={categoryName} />;
  }

  return <ProductsSection products={products} />;
}