import ErrorSection from "@/components/shared/ErrorSection";
import BrandCard from "../components/BrandCard";
import { getAllBrands } from "../server/brands.actions";

export default async function BrandsSection() {
  let brandsResponseData;
  try {
    const response = await getAllBrands();
    brandsResponseData = response.data;
  } catch (error) {
    console.error("Failed to load brands:", error);
    return (
      <ErrorSection
        errorMessage={
          error instanceof Error
            ? error.message
            : "An error occurred while loading the brands. Please try again."
        }
      />
    );
  }
  return (
    <>
      <section className="container page-padding grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {brandsResponseData.map((brand) => (
          <BrandCard brand={brand} key={brand._id} />
        ))}
      </section>
    </>
  );
}
