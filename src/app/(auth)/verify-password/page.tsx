import VerifyPasswordScreen from "@/features/auth/all-password-features/screens/verify-password.screen";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function VerifyPassword() {
  const step = (await cookies()).get("reset-step")?.value;

  if (step !== "verify") {
    redirect("/forgot-password");
  }

  return <VerifyPasswordScreen />;
}
