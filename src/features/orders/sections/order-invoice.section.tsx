"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { faCheckCircle, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { Data } from "../types/checkout.types";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function OrderInvoice({ order }: { order: Data }) {
  const subtotal = order.cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0,
  );

  const paymentLabel =
    order.paymentMethodType === "cash" ? "Cash on Delivery" : "Online Payment";

  return (
    <main className="background-gray">
      <div className="container section-padding space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 print:hidden">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-5xl text-primary-600"
          />
          <h1 className="text-2xl font-bold">Order Confirmed</h1>
          <p className="text-gray-500">
            Thank you for your purchase, {order.user.name}!
          </p>
        </div>

        {/* Invoice */}
        <section className="bg-white p-6 shadow rounded-md space-y-6 max-w-3xl mx-auto print:shadow-none print:p-0 print:max-w-full">
          {/* Invoice header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <div>
              <p className="heading font-bold">Invoice</p>
              <p className="text-gray-500">Order #{order.id}</p>
            </div>
            <div className="sm:text-right space-y-1">
              <p className="text-gray-500">{formatDate(order.createdAt)}</p>
              <div className="flex gap-2 sm:justify-end">
                <span
                  className={`text-sm font-semibold rounded-full px-3 py-1 ${
                    order.isPaid
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Unpaid"}
                </span>
                <span
                  className={`text-sm font-semibold rounded-full px-3 py-1 ${
                    order.isDelivered
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.isDelivered ? "Delivered" : "Not delivered yet"}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Customer + shipping */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="font-bold">Customer</p>
              <p>{order.user.name}</p>
              <p className="text-gray-500">{order.user.email}</p>
              <p className="text-gray-500">{order.user.phone}</p>
            </div>
            <div className="space-y-1">
              <p className="font-bold">Shipping Address</p>
              <p>{order.shippingAddress.city}</p>
              <p className="text-gray-500">{order.shippingAddress.details}</p>
              <p className="text-gray-500">{order.shippingAddress.phone}</p>
              <p className="text-gray-500">
                Postal code: {order.shippingAddress.postalCode}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <p className="font-bold">Payment Method</p>
            <p>{paymentLabel}</p>
          </div>

          <Separator />

          {/* Items */}
          <ul className="space-y-4">
            {order.cartItems.map((item) => (
              <li key={item._id} className="flex gap-4">
                <div className="relative size-20 shrink-0 rounded-lg overflow-hidden border">
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 font-semibold">
                  <p className="line-clamp-2">{item.product.title}</p>
                  <span className="text-gray-500/80 text-sm">
                    Qty: {item.count} × {item.price} EGP
                  </span>
                </div>
                <span className="font-semibold whitespace-nowrap">
                  {item.price * item.count} EGP
                </span>
              </li>
            ))}
          </ul>

          <Separator />

          {/* Summary */}
          <div className="space-y-3">
            <p className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">{subtotal} EGP</span>
            </p>
            <p className="flex justify-between">
              <span>Tax</span>
              <span className="font-semibold">{order.taxPrice} EGP</span>
            </p>
            <p className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold">{order.shippingPrice} EGP</span>
            </p>
            <Separator />
            <p className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary-600">
                {order.totalOrderPrice} EGP
              </span>
            </p>
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center print:hidden">
          <Button onClick={() => window.print()} className="gap-2">
            <FontAwesomeIcon icon={faPrint} />
            Print Invoice
          </Button>
          <Link href="/orders">
            <Button variant="outline" className="w-full">
              View All Orders
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}