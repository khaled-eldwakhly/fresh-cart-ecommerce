import { faArrowLeft, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function BrandEmptyProducts({
  brandName,
}: {
  brandName?: string;
}) {
  return (
    <div className="mx-auto my-6 flex max-w-md flex-col items-center rounded-2xl border border-dashed border-fuchsia-200 bg-fuchsia-50/50 px-6 py-14 text-center">
      <div className="mb-5 flex size-20 items-center justify-center rounded-full bg-linear-to-br from-fuchsia-700 to-fuchsia-400 text-white shadow-lg">
        <FontAwesomeIcon icon={faBoxOpen} className="text-4xl" />
      </div>

      <h2 className="text-xl font-bold text-gray-800">No products yet</h2>

      <p className="mt-2 text-gray-500 sm:whitespace-nowrap">
        {brandName ? (
          <>
            <span className="font-semibold text-fuchsia-700">{brandName}</span>{" "}
            hasn&apos;t added any products yet.
          </>
        ) : (
          "This brand hasn't added any products yet."
        )}{" "}
        Check back soon!
      </p>

      <Link
        href="/brands"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-fuchsia-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-fuchsia-600"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-xl" />
        Browse other brands
      </Link>
    </div>
  );
}
