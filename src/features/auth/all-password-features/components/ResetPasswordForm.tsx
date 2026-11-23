"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faEye,
  faEyeSlash,
  faKey,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { resetPassword } from "../server/password.actions";

export const ResetPasswordSchema = z
  .object({
    email: z
      .string()
      .min(1, "Enter your email address!")
      .email("Enter a valid email address!"),
    newPassword: z
      .string()
      .min(1, "Enter your new password!")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/\d/, "Password must contain a number"),
    confirmPassword: z.string().min(1, "Confirm your new password!"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

const passwordRules = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "One uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "One number", test: (v: string) => /\d/.test(v) },
];

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = form.watch("newPassword");

  useEffect(() => {
    const savedEmail = sessionStorage.getItem("reset-email");
    if (savedEmail) form.setValue("email", savedEmail);
  }, [form]);

  async function handleResetPassword(values: ResetPasswordSchemaType) {
    try {
      await resetPassword({
        email: values.email,
        newPassword: values.newPassword,
      });
      toast.success("Password reset successfully");
      router.push("/signin");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to reset password!",
      );
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6">
      <div className="text-center space-y-3">
        <div className="bg-primary-100 size-16 mx-auto rounded-full flex items-center justify-center text-2xl text-primary-600">
          <FontAwesomeIcon icon={faKey} />
        </div>
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <p className="text-gray-500 text-sm">
          Enter your email address and new password to reset your account
          password.
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(handleResetPassword)}
        className="space-y-5"
      >
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-sm font-medium" htmlFor={field.name}>
                Email Address
              </FieldLabel>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                />
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  autoComplete="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email address"
                  className="pl-10"
                  disabled
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="newPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-sm font-medium" htmlFor={field.name}>
                New Password
              </FieldLabel>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                />
                <Input
                  {...field}
                  id={field.name}
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter new password"
                  className="pl-10 pr-10"
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              </div>

              <div className="space-y-1.5">
                <p className="text-xs text-gray-500">Password must contain:</p>
                <ul className="space-y-1">
                  {passwordRules.map((rule) => {
                    const passed = rule.test(newPassword);
                    return (
                      <li
                        key={rule.label}
                        className={`flex items-center gap-2 text-xs transition-colors ${
                          passed ? "text-primary-600" : "text-gray-500"
                        }`}
                      >
                        <span
                          className={`size-2.5 rounded-full transition-colors ${
                            passed ? "bg-primary-600" : "bg-gray-300"
                          }`}
                        />
                        {rule.label}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Field>
          )}
        />

        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-sm font-medium" htmlFor={field.name}>
                Confirm New Password
              </FieldLabel>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                />
                <Input
                  {...field}
                  id={field.name}
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Confirm new password"
                  className="pl-10 pr-10"
                />
                <FontAwesomeIcon
                  icon={showConfirm ? faEye : faEyeSlash}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirm((prev) => !prev)}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button
          className="background-elements w-full text-base font-semibold py-5"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <Spinner className="size-6 text-white" />
              <span>Resetting Password</span>
            </>
          ) : (
            <span>Reset Password</span>
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500">
        Remember your password?{" "}
        <Link href="/signin" className="text-primary-600 font-semibold">
          Sign In
        </Link>
      </p>
    </div>
  );
}
