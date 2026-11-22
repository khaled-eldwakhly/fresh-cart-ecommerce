"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faKey, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  changePasswordSchema,
  type ChangePasswordType,
} from "../schemas/profile.schemas";
import { updateLoggedUserPassword } from "../server/profile.actions";

// ^ password input
function PasswordInput({
  invalid,
  ...props
}: React.ComponentProps<typeof Input> & { invalid?: boolean }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input
        {...props}
        type={show ? "text" : "password"}
        aria-invalid={invalid}
      />
      <FontAwesomeIcon
        icon={show ? faEye : faEyeSlash}
        className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
        onClick={() => setShow((prev) => !prev)}
      />
    </div>
  );
}

export default function PasswordInformationForm() {
  // ^ password data form
  const passwordForm = useForm<ChangePasswordType>({
    mode: "all",
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", password: "", rePassword: "" },
  });

  async function handleUpdatePassword(values: ChangePasswordType) {
    const response = await updateLoggedUserPassword(values);
    if (response.ok) {
      toast.success(response.message);
      passwordForm.reset();
      // ^ redirect user to log in again (token is old now)
      setTimeout(() => signOut({ callbackUrl: "/signin" }), 1800);
    } else {
      toast.error(response.message);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-xl bg-white p-6 shadow-lg"
    >
      <div className="mb-6 flex items-center gap-3 border-b pb-4">
        <div className="flex size-11 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600">
          <FontAwesomeIcon icon={faLock} className="text-lg" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Change Password</h2>
          <p className="text-sm text-gray-500">
            Choose a strong password and don&apos;t share it with anyone
          </p>
        </div>
      </div>

      <form onSubmit={passwordForm.handleSubmit(handleUpdatePassword)}>
        <div className="space-y-5">
          <Controller
            name="currentPassword"
            control={passwordForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="text-base font-semibold -mb-1"
                  htmlFor={`password-${field.name}`}
                >
                  Current Password
                </FieldLabel>
                <PasswordInput
                  {...field}
                  id={`password-${field.name}`}
                  invalid={fieldState.invalid}
                  placeholder="Enter your current password"
                />
                {fieldState.invalid && (
                  <FieldError
                    className="text-start -mb-1"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={passwordForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="text-base font-semibold -mb-1"
                  htmlFor={`password-${field.name}`}
                >
                  New Password
                </FieldLabel>
                <PasswordInput
                  {...field}
                  id={`password-${field.name}`}
                  invalid={fieldState.invalid}
                  placeholder="Enter your new password"
                />
                {fieldState.invalid && (
                  <FieldError
                    className="text-start -mb-1"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />
          <Controller
            name="rePassword"
            control={passwordForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="text-base font-semibold -mb-1"
                  htmlFor={`password-${field.name}`}
                >
                  Confirm New Password
                </FieldLabel>
                <PasswordInput
                  {...field}
                  id={`password-${field.name}`}
                  invalid={fieldState.invalid}
                  placeholder="Re-enter your new password"
                />
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
          className="background-elements mt-6 w-full text-base font-semibold py-5"
          type="submit"
          disabled={passwordForm.formState.isSubmitting}
        >
          {passwordForm.formState.isSubmitting ? (
            <>
              <Spinner className="size-6 text-white" />
              <span>Changing Password</span>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faKey} className="text-lg" />
              <span>Change Password</span>
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
}