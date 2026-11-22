import ErrorSection from "@/components/shared/ErrorSection";
import { getAllCategories } from "@/features/categories/server/categories.actions";
import { CategoriesResponse } from "@/features/categories/types/categories.types";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default async function OurCategories() {
  let categoriesResponse: CategoriesResponse;
  try {
    categoriesResponse = await getAllCategories({ limit: 6 });
  } catch (error) {
    console.error("Failed to load categories:", error);
    return (
      <ErrorSection errorMessage="An error occurred while loading the categories. Please try again." />
    );
  }

  return (
    <>
      <section className="container section-padding space-y-9">
        <div className="space-y-1 sm:space-y-0 flex flex-col sm:flex-row items-center justify-between relative ml-4 before:absolute before:bg-linear-0 before:from-green-900 before:to-green-300 before:w-1.5 before:h-full sm:before:h-[calc(100%-4px)] before:-left-4 before:top-1/2 before:-translate-y-1/2 before:rounded-full">
          <span className="capitalize font-bold text-2xl md:text-3xl">
            shop by <span className="text-primary-600">category</span>
          </span>
          <Link
            href={"/categories"}
            className="capitalize text-lg sm:text-lg text-primary-600 group"
          >
            view all categories
            <FontAwesomeIcon
              icon={faArrowRight}
              className="ml-1.25 group-hover:translate-x-2 duration-150"
            />
          </Link>
        </div>
        <div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            {categoriesResponse.data.map((category) => (
              <Link
                key={category._id}
                href={`/categories/${category._id}`}
                className="flex flex-col justify-center items-center gap-3 shadow p-4 hover:shadow-md duration-150 rounded-xl"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  width={100}
                  height={100}
                  className="size-20 object-cover rounded-full"
                />
                <span className="font-medium">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
