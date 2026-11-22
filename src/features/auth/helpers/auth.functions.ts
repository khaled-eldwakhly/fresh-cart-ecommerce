import { signOut } from "next-auth/react";

export function logOutUser() {
  signOut({ callbackUrl: "/signin" });
}
