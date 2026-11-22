import ResetPasswordScreen from "@/features/auth/all-password-features/screens/reset-password.screen";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ResetPassword() {
  const step = (await cookies()).get("reset-step")?.value;

  if (step !== "reset") {
    redirect("/forgot-password");
  }

  return <ResetPasswordScreen />;
}