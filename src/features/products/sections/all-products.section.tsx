import ErrorSection from "@/components/shared/ErrorSection";
import { getAllProducts } from "../server/products.actions";
import ProductsSection from "./products.section";

export default async function AllProductsSection() {
  let productsResponseData;
  try {
    const response = await getAllProducts();
    productsResponseData = response.data;
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
    <>
      <section className="container page-padding">
        <ProductsSection products={productsResponseData} />
      </section>
    </>
  );
}
