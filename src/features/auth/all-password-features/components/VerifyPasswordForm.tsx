import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleCheck,
  faLock,
  faPaperPlane,
  faShield,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { verifyPassword } from "../server/password.actions";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter } from "next/navigation";

const verifyPasswordSchema = z.object({
  resetCode: z.string().regex(/^\d{6}$/, "Enter a 6-digit code"),
});

export type verifyPasswordSchemaType = z.infer<typeof verifyPasswordSchema>;

export default function VerifyPasswordForm() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(verifyPasswordSchema),
    defaultValues: {
      resetCode: "",
    },
  });

  async function handleVerifyPassword(value: verifyPasswordSchemaType) {
    try {
      const response = await verifyPassword(value);
      if (response.status === "Success") {
        router.push("/reset-password");
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
          <FontAwesomeIcon icon={faShieldHalved} />
        </div>
        <p className="text-xl font-bold">Verify Reset Code</p>
        <p>We'v sent a verification code to your email address</p>
        <form onSubmit={form.handleSubmit(handleVerifyPassword)}>
          <div className="space-y-5">
            <Controller
              name="resetCode"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="w-fit mx-auto"
                >
                  <FieldLabel
                    className="font-semibold -mb-1 text-base"
                    htmlFor={field.name}
                  >
                    Enter 6-digit verification code
                  </FieldLabel>
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    aria-invalid={fieldState.invalid}
                    pattern={REGEXP_ONLY_DIGITS}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
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
                <span>Verifing Code</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCircleCheck} className="text-lg" />
                <span>Verify Code</span>
              </>
            )}
          </Button>
        </form>
        <Link href={"/signin"} className="text-primary-600 font-semibold">
          Back to Log in
        </Link>
      </div>
    </div>
  );
}
