import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request });

  const pathName = request.nextUrl.pathname;
  const authPage =
    pathName === "/signin" ||
    pathName === "/signup" ||
    pathName === "/forgot-password" ||
    pathName === "/verify-password" ||
    pathName === "/reset-password";

  if (token && authPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!token && !authPage) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/signin",
    "/signup",
    "/orders/:path*",
    "/forgot-password",
    "/verify-password",
    "/reset-password",
    "/profile",
    "/wishlist",
  ],
};
