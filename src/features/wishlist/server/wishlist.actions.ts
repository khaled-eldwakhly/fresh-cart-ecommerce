"use server";

import { getUserToken } from "@/features/auth/helpers/auth/auth";
import { WishlistResponse } from "../types/wishlist.types";

export async function getLoggedUserWishlist(): Promise<WishlistResponse> {
  const token = await getUserToken();
  if (!token) throw new Error("Log in first!");
  const response = await fetch(`${process.env.BASE_URL_V_1}/wishlist`, {
    headers: { token },
  });
  if (!response.ok)
    throw new Error(`Request failed with status ${response.status}`);
  const data = await response.json();
  return data;
}

export async function addProductToWishlist(productId: string) {
  const token = await getUserToken();
  if (!token) throw new Error("Log in first!");
  const res = await fetch(`${process.env.BASE_URL_V_1}/wishlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json", token },
    body: JSON.stringify({ productId }),
  });
  const data = await res.json();
  return { ok: res.ok, message: data?.message ?? "Something went wrong" };
}

export async function removeProductFromWishlist(productId: string) {
  const token = await getUserToken();
  if (!token) throw new Error("Log in first!");
  const res = await fetch(`${process.env.BASE_URL_V_1}/wishlist/${productId}`, {
    method: "DELETE",
    headers: { token },
  });
  const data = await res.json();
  return { ok: res.ok, message: data?.message ?? "Something went wrong" };
}
