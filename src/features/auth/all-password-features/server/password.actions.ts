"use server";

import { cookies } from "next/headers";
import { forgotPasswordSchemaType } from "../components/ForgotPasswordForm";
import { verifyPasswordSchemaType } from "../components/VerifyPasswordForm";
import { PasswordResponse } from "../types/password.types";

const STEP_COOKIE = "reset-step";

async function setStep(step: "verify" | "reset") {
  (await cookies()).set(STEP_COOKIE, step, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 10,
    path: "/",
  });
}

export async function forgotPassword(
  email: forgotPasswordSchemaType,
): Promise<PasswordResponse> {
  const response = await fetch(
    `${process.env.BASE_URL_V_1}/auth/forgotPasswords`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(email),
    },
  );
  if (!response.ok) {
    throw new Error("Unexpected error!");
  }
  const data = await response.json();

  await setStep("verify");
  return data;
}

export async function verifyPassword(
  resetCode: verifyPasswordSchemaType,
): Promise<PasswordResponse> {
  const response = await fetch(
    `${process.env.BASE_URL_V_1}/auth/verifyResetCode`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resetCode),
    },
  );
  if (!response.ok) {
    throw new Error("Unexpected error!");
  }
  const data = await response.json();

  if (data.status === "Success") {
    await setStep("reset");
  }
  return data;
}

export async function resetPassword(payload: {
  email: string;
  newPassword: string;
}) {
  const response = await fetch(
    `${process.env.BASE_URL_V_1}/auth/resetPassword`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Failed to reset password!");
  }

  (await cookies()).delete(STEP_COOKIE);
  return data;
}
