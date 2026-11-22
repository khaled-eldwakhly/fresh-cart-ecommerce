import ErrorSection from "@/components/shared/ErrorSection";
import { getUserToken } from "@/features/auth/helpers/auth/auth";
import ProductDetailsSection from "@/features/products/sections/product-details";
import { getSpecificProducts } from "@/features/products/server/products.actions";
import ReviewsSection from "@/features/reviews/sections/reviews.section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  try {
    const { data } = await getSpecificProducts(productId);
    return { title: data.title, description: `${data.description}` };
  } catch {
    return {
      title: "Product details",
    };
  }
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const token = await getUserToken();
  let productDetailsResponseData;
  try {
    const productDetailsResponse = await getSpecificProducts(productId);
    productDetailsResponseData = productDetailsResponse.data;
  } catch (error) {
    console.error("Failed to load products:", error);
    return (
      <ErrorSection
        errorMessage={
          error instanceof Error
            ? error.message
            : "An error occurred while loading the product. Please try again."
        }
      />
    );
  }
  return (
    <main>
      <ProductDetailsSection product={productDetailsResponseData} />
      <ReviewsSection
        ratingsAverage={productDetailsResponseData.ratingsAverage}
        ratingsQuantity={productDetailsResponseData.ratingsQuantity}
        productId={productDetailsResponseData._id}
        isLoggedIn={!!token}
      />
    </main>
  );
}
