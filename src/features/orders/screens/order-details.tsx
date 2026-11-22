"use client";

import {
  faArrowLeft,
  faBoxOpen,
  faLocationDot,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useOrders } from "../contexts/orders.context";
import OrderDetailsSkeleton from "../components/OrderDetailsSkeleton";

export default function OrderDetails({ orderId }: { orderId: string }) {
  const { orders, isLoading } = useOrders();

  if (isLoading) return <OrderDetailsSkeleton />;

  const order = orders?.find((o) => o._id === orderId);

  if (!order) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-gray-300 py-16 px-6 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Order not found</h2>
        <p className="text-gray-500">
          We couldn&apos;t find the order you&apos;re looking for.
        </p>
        <Link
          href="/orders/all-orders"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium"
        >
          Back to orders
        </Link>
      </div>
    );
  }

  const date = new Date(order.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const itemsPrice =
    order.totalOrderPrice - order.taxPrice - order.shippingPrice;

  return (
    <main className="space-y-6">
      <Link
        href="/orders/all-orders"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-green-600"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to orders
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Order #{order.id}</h1>
          <p className="text-sm text-gray-500">Placed on {date}</p>
        </div>
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 self-start bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <FontAwesomeIcon icon={faBoxOpen} className="text-green-600" />
            Items ({order.cartItems.length})
          </h2>

          <ul className="divide-y divide-gray-100">
            {order.cartItems.map((item) => (
              <li key={item._id} className="flex items-center gap-4 py-4">
                <div className="relative size-25 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <h3 className="font-medium truncate">{item.product.title}</h3>
                  <p className="text-sm text-gray-500">
                    {item.product.category?.name} · {item.product.brand?.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.count} × {item.price} EGP
                  </p>
                </div>

                <p className="font-semibold whitespace-nowrap">
                  {item.count * item.price} EGP
                </p>
              </li>
            ))}
          </ul>
        </section>

        <aside className="space-y-6">
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-3">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-green-600"
              />
              Shipping address
            </h2>
            {order.shippingAddress ? (
              <div className="text-sm text-gray-600 space-y-1">
                <p>{order.shippingAddress.city}</p>
                <p>{order.shippingAddress.details}</p>
                <p>{order.shippingAddress.phone}</p>
                {order.shippingAddress.postalCode && (
                  <p>Postal code: {order.shippingAddress.postalCode}</p>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No shipping address</p>
            )}
          </section>

          <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-3">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <FontAwesomeIcon icon={faReceipt} className="text-green-600" />
              Summary
            </h2>
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{itemsPrice} EGP</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{order.taxPrice} EGP</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{order.shippingPrice} EGP</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-100 text-base font-bold text-gray-900">
                <span>Total</span>
                <span>{order.totalOrderPrice} EGP</span>
              </div>
              <p className="text-xs text-gray-500 pt-1 capitalize">
                Payment: {order.paymentMethodType}
              </p>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
