import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faLock,
  faPaperPlane,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { forgotPassword } from "../server/password.actions";

const forgotPasswordSchema = z.object({
  email: z.email({ error: "Enter your email!" }),
});

export type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function handleForgotPassword(value: forgotPasswordSchemaType) {
    try {
      const response = await forgotPassword(value);
      if (response.statusMsg === "success") {
        toast.success("Reset code sent to your email");
        sessionStorage.setItem("can-verify-password", "true");
        sessionStorage.setItem("reset-email", value.email);
        router.push("/verify-password");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send reset code!",
      );
    }
  }

  return (
    <div className="max-w-120 space-y-6 *:rounded-md *:border *:p-5">
      <div className="bg-white min-w-full mx-auto space-y-4 rounded-md border shadow max-w-md text-center">
        <div className="bg-primary-100 size-13 mx-auto rounded-full flex items-center justify-center text-2xl text-primary-600">
          <FontAwesomeIcon icon={faLock} />
        </div>
        <p className="text-xl font-bold">Forgot your password?</p>
        <p>
          No worries! Enter your email address and we'll send you a code to
          reset your password
        </p>
        <form onSubmit={form.handleSubmit(handleForgotPassword)}>
          <div className="space-y-5">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="font-semibold -mb-1 text-base"
                    htmlFor={field.name}
                  >
                    Email Address
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      type="email"
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Your registered email address"
                      autoComplete="on"
                    />
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="absolute top-1/2 right-2 -translate-y-1/2"
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError
                      className="text-start -mb-1"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
          </div>
          <Button
            className="background-elements mt-4 w-full text-base font-semibold py-5"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Spinner className="size-6 text-white" />
                <span>Sending Code</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faPaperPlane} className="text-lg" />
                <span>Send reset Code</span>
              </>
            )}
          </Button>
        </form>
        <p>
          Remember your password?{" "}
          <Link href={"/signin"} className="text-primary-600 font-semibold">
            Log in
          </Link>
        </p>
      </div>
      <div className="flex gap-2">
        <FontAwesomeIcon
          icon={faShieldHalved}
          className="text-primary-600 text-xl"
        />
        <div>
          <p className="font-semibold">Security Notice</p>
          <p className="text-gray-500 font-medium text-sm">
            For your security, a password reset code will be sent to your
            registered email address. The link will expire after 10 minutes
          </p>
        </div>
      </div>
    </div>
  );
}
