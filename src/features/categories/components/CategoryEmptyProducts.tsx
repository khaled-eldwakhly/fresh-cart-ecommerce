import { faArrowLeft, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function CategoryEmptyProducts({
  categoryName,
}: {
  categoryName?: string;
}) {
  return (
    <div className="mx-auto my-6 flex max-w-xl flex-col items-center rounded-2xl border border-dashed border-violet-200 bg-violet-50/50 px-6 py-14 text-center">
      <div className="mb-5 flex size-20 items-center justify-center rounded-full bg-linear-to-br from-violet-700 to-violet-400 text-white shadow-lg">
        <FontAwesomeIcon icon={faLayerGroup} className="text-4xl" />
      </div>

      <h2 className="text-xl font-bold text-gray-800">No products yet</h2>

      <p className="mt-2 text-gray-500">
        {categoryName ? (
          <>
            The{" "}
            <span className="font-semibold text-violet-700">
              {categoryName}
            </span>{" "}
            category doesn&apos;t have any products yet.
          </>
        ) : (
          "This category doesn't have any products yet."
        )}{" "}
        Check back soon!
      </p>

      <Link
        href="/categories"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-violet-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-violet-600"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
        Browse other categories
      </Link>
    </div>
  );
}
