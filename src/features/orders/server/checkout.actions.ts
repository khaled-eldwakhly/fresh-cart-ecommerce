"use server";

import { getUserToken } from "@/features/auth/helpers/auth/auth";
import {
  CheckoutResponse,
  CreateCashOrderResponse,
} from "../types/checkout.types";
import { ShippingAddress } from "@/features/addresses/types/addresses.types";

export async function createCashOrder(
  cartId: string,
  shippingAddressP: ShippingAddress,
): Promise<CreateCashOrderResponse> {
  const shippingAddressBody = { ...shippingAddressP, postalCode: "12345" };
  const token = await getUserToken();
  if (!token) throw new Error("Log in first!");
  const response = await fetch(`${process.env.BASE_URL_V_2}/orders/${cartId}`, {
    method: "POST",
    headers: { token, "Content-Type": "application/json" },
    body: JSON.stringify({ shippingAddress: shippingAddressBody }),
  });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export async function checkoutSession(
  cartId: string,
  shippingAddressP: ShippingAddress,
): Promise<CheckoutResponse> {
  const token = await getUserToken();
  if (!token) throw new Error("Log in first!");
  const response = await fetch(
    `${process.env.BASE_URL_V_1}/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`,
    {
      method: "POST",
      headers: { token, "Content-Type": "application/json" },
      body: JSON.stringify({ shippingAddress: shippingAddressP }),
    },
  );
  if (!response.ok) {
    throw new Error("Failed to checkout session!");
  }
  const data = await response.json();
  return data;
}
