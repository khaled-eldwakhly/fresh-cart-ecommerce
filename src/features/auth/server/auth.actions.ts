"use server";

import { signinSchemaType } from "../schemas/signin.schema";
import { signupSchemaType } from "../schemas/signup.schema";

export async function signupAction(values: signupSchemaType) {
  const { terms, ...requestBody } = values;
  const response = await fetch(`${process.env.BASE_URL_V_1}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data;
}

export async function signinAction(values: signinSchemaType) {
  const response = await fetch(`${process.env.BASE_URL_V_1}/auth/signin`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data;
}
