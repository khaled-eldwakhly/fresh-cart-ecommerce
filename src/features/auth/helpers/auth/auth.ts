import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  const cookieStore = await cookies();

  const sessionToken =
    cookieStore.get("__Secure-next-auth.session-token")?.value ??
    cookieStore.get("next-auth.session-token")?.value;

  if (!sessionToken) return undefined;

  const decoded = await decode({
    token: sessionToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return decoded?.token as string;
}
