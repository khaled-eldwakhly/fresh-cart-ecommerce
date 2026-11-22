"use server";

import { authOptions } from "@/features/auth/helpers/auth/authOptions";
import { getServerSession } from "next-auth";
import { GetUserOrdersResponse } from "../types/orders.types";

export async function getUserOrders(): Promise<GetUserOrdersResponse> {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!userId) {
    throw new Error("user id not provided!");
  }
  const response = await fetch(
    `${process.env.BASE_URL_V_1}/orders/user/${userId}`,
  );
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  return data;
}
