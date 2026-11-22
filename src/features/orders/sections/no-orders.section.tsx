import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function NoOrders() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-dashed border-gray-300 py-16 px-6 space-y-5">
      <div className="flex items-center justify-center w-24 h-24 rounded-full bg-green-50">
        <FontAwesomeIcon icon={faBoxOpen} className="text-4xl text-green-600" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">No orders yet</h2>
        <p className="text-gray-500 max-w-md">
          Looks like you haven&apos;t placed any orders. Start shopping and your
          orders will show up here.
        </p>
      </div>

      <Link
        href="/products"
        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 transition-colors text-white font-medium px-6 py-3 rounded-lg"
      >
        Start Shopping
        <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
      </Link>
    </div>
  );
}
