"use server";

import { getUserToken } from "@/features/auth/helpers/auth/auth";
import { addressSchemaType } from "../schema/address.schema";
import { AddressResponse } from "../types/addresses.types";

export async function addNewAddress(
  newAddress: addressSchemaType,
): Promise<AddressResponse> {
  const token = await getUserToken();
  if (!token) throw new Error("Log in first!");
  const response = await fetch(`${process.env.BASE_URL_V_1}/addresses`, {
    method: "POST",
    headers: { "Content-Type": "application/json", token },
    body: JSON.stringify(newAddress),
  });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export async function getLoggedUserAddresses(): Promise<AddressResponse> {
  const token = await getUserToken();
  if (!token) throw new Error("Log in first!");
  const response = await fetch(`${process.env.BASE_URL_V_1}/addresses`, {
    headers: { token },
  });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export async function deleteUserAddress(
  addressId: string,
): Promise<AddressResponse> {
  const token = await getUserToken();
  if (!token) throw new Error("Log in first!");
  const response = await fetch(
    `${process.env.BASE_URL_V_1}/addresses/${addressId}`,
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
