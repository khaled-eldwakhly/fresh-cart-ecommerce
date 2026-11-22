
import BrandProducts from "@/features/brands/sections/brand-products.section";
import { getSpecificBrand } from "@/features/brands/server/brands.actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brandId: string }>;
}) {
  const { brandId } = await params;

  try {
    const { data } = await getSpecificBrand(brandId);
    return {
      title: data.name,
      description: `Browse all ${data.name} products at FreshCart.`,
    };
  } catch {
    return { title: "Brands" };
  }
}
export default async function BrandProductsPage({
  params,
}: {
  params: Promise<{ brandId: string }>;
}) {
  const { brandId } = await params;
  return (
    <>
      <BrandProducts brandId={brandId} />
    </>
  );
}
