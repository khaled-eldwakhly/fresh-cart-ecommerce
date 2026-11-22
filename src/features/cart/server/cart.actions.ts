"use server";

import { getUserToken } from "@/features/auth/helpers/auth/auth";
import { CartResponse } from "../types/cart.types";

export async function getLoggedUserCart(): Promise<CartResponse> {
  const token = await getUserToken();
  if (!token) throw new Error("Log in first!");
  const response = await fetch(`${process.env.BASE_URL_V_2}/cart`, {
    headers: { token },
  });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export async function clearUserCart(): Promise<CartResponse> {
  const token = await getUserToken();
  if (!token) throw new Error("Log in first!");
  const response = await fetch(`${process.env.BASE_URL_V_2}/cart`, {
    method: "DELETE",
    headers: { token },
  });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export async function addProductToCart(
  productId: string,
): Promise<CartResponse> {
  const token = await getUserToken();
  if (!token) throw new Error("Log in first!");
  const response = await fetch(`${process.env.BASE_URL_V_2}/cart`, {
    method: "POST",
    headers: { token, "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export async function removeProductFromCart(
  productId: string,
): Promise<CartResponse> {
  const token = await getUserToken();
  if (!token) throw new Error("Log in first!");
  const response = await fetch(
    `${process.env.BASE_URL_V_2}/cart/${productId}`,
    {
      method: "DELETE",
      headers: { token },
    },
  );
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export async function updateCartProductQuantity(
  productId: string,
  newCount: number,
): Promise<CartResponse> {
  const token = await getUserToken();
  if (!token) throw new Error("Log in first!");
  const response = await fetch(
    `${process.env.BASE_URL_V_2}/cart/${productId}`,
    {
      method: "PUT",
      headers: { token, "Content-Type": "application/json" },
      body: JSON.stringify({ count: newCount }),
    },
  );
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  return data;
}
