import ErrorSection from "@/components/shared/ErrorSection";
import CategoryCard from "../components/CategoryCard";
import { getAllCategories } from "../server/categories.actions";

export default async function CategoriesSection() {
  let categories;
  try {
    const response = await getAllCategories();
    categories = response.data;
  } catch (error) {
    console.error("Failed to load categories:", error);
    return (
      <ErrorSection
        errorMessage={
          error instanceof Error
            ? error.message
            : "An error occurred while loading the categories. Please try again."
        }
      />
    );
  }

  return (
    <section className="container py-10">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </section>
  );
}