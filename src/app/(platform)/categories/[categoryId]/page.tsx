
import CategoryProducts from "@/features/categories/sections/category-products.section";
import { getSpecificCategory } from "@/features/categories/server/categories.actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;

  try {
    const { data } = await getSpecificCategory(categoryId);
    return { title: data.name };
  } catch {
    return { title: "Categories" };
  }
}

export default async function CategoryProductsPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  return <CategoryProducts categoryId={categoryId} />;
}
