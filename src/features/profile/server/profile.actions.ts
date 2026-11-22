"use server";

import { getUserToken } from "@/features/auth/helpers/auth/auth";
import {
  ChangePasswordType,
  UpdateProfileType,
} from "../schemas/profile.schemas";

export async function updateLoggedUserData(newData: UpdateProfileType) {
  const token = await getUserToken();
  if (!token) return { ok: false, message: "Log in first!" };

  const response = await fetch(`${process.env.BASE_URL_V_1}/users/updateMe/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", token },
    body: JSON.stringify(newData),
  });
  const data = await response.json();

  if (!response.ok) {
    return {
      ok: false,
      message: data?.errors?.msg || data?.message || "Unexpected error!",
    };
  }
  return {
    ok: true,
    message: "Profile data has been changed",
    user: data.user,
  };
}

export async function updateLoggedUserPassword(
  newPasswordData: ChangePasswordType,
) {
  const token = await getUserToken();
  if (!token) return { ok: false, message: "Log in first!" };

  const response = await fetch(
    `${process.env.BASE_URL_V_1}/users/changeMyPassword`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json", token },
      body: JSON.stringify(newPasswordData),
    },
  );
  const data = await response.json();

  if (!response.ok) {
    return {
      ok: false,
      message: data?.errors?.msg || data?.message || "Unexpected error!",
    };
  }
  return { ok: true, message: "Password changed" };
}
