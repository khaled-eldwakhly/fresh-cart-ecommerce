import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Order } from "../types/orders.types";

export default function OrderCard({ order }: { order: Order }) {
  const date = new Date(order.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg">Order #{order.id}</h3>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
        <p className="text-xl font-bold">{order.totalOrderPrice} EGP</p>
      </div>

      <div className="space-y-1 text-sm text-gray-600">
        <p>
          {order.cartItems.length} item{order.cartItems.length > 1 ? "s" : ""} ·{" "}
          {order.paymentMethodType}
        </p>
        <p>
          {order.shippingAddress
            ? `${order.shippingAddress.city} - ${order.shippingAddress.details}`
            : "No shipping address"}
        </p>
      </div>

      <div className="flex items-center justify-between gap-2 pt-4 border-t border-gray-100">
        <div className="flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              order.isPaid
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {order.isPaid ? "Paid" : "Unpaid"}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              order.isDelivered
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {order.isDelivered ? "Delivered" : "Processing"}
          </span>
        </div>

        <Link
          href={`/orders/${order._id}`}
          className="text-sm font-medium text-green-600 hover:underline"
        >
          View details <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </article>
  );
}
