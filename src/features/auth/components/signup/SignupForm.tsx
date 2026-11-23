"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { signupSchema, signupSchemaType } from "../../schemas/signup.schema";
import { signupAction } from "../../server/auth.actions";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [eye, setEye] = useState(false);
  const [eyeOne, setEyeOne] = useState(false);
  const form = useForm({
    mode: "all",
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
  });

  const router = useRouter();

  async function handleSignup(values: signupSchemaType) {
    const response = await signupAction(values);
    if (response.message === "success") {
      router.push("/signin");
      toast.success("Account Created Successfully");
    } else {
      toast.error(response.message);
    }
  }

  return (
    <>
      <main className="xl:col-span-3">
        <section className="p-6 text-center bg-white rounded-xl shadow-lg">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold">Create Your Account</h3>
              <p>Start your fresh journy with us today</p>
            </div>
            <div className="flex *:flex-1 gap-4">
              <button className="border border-gray-600 px-4 py-2 rounded-lg flex items-center justify-center gap-1">
                <FontAwesomeIcon
                  icon={faGoogle}
                  className="text-red-500 text-lg"
                />
                <span>Google</span>
              </button>
              <button className="border border-gray-600 px-4 py-2 rounded-lg flex items-center justify-center gap-1">
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="text-blue-500 text-lg"
                />
                <span>Facebook</span>
              </button>
            </div>
          </div>
          <div className="h-px bg-gray-200 my-8 relative">
            <span className="absolute bottom-1/2 right-1/2 translate-1/2 bg-white px-3 text-sm">
              OR
            </span>
          </div>
          <form onSubmit={form.handleSubmit(handleSignup)}>
            <div className="space-y-5">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="text-base font-semibold -mb-1"
                      htmlFor={field.name}
                    >
                      Name
                    </FieldLabel>
                    <Input
                      type="text"
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your name"
                      autoComplete="on"
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
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="text-base font-semibold -mb-1"
                      htmlFor={field.name}
                    >
                      Email Address
                    </FieldLabel>
                    <Input
                      type="email"
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your email"
                      autoComplete="on"
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
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="text-base font-semibold -mb-1"
                      htmlFor={field.name}
                    >
                      Phone
                    </FieldLabel>
                    <Input
                      type="tel"
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your phone number"
                      autoComplete="on"
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
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="text-base font-semibold -mb-1"
                      htmlFor={field.name}
                    >
                      Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        type={eye ? "text" : "password"}
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your password"
                      />
                      <FontAwesomeIcon
                        icon={eye ? faEye : faEyeSlash}
                        className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                        onClick={() => setEye((prev) => !prev)}
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
              <Controller
                name="rePassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="text-base font-semibold -mb-1"
                      htmlFor={field.name}
                    >
                      Re-password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        type={eyeOne ? "text" : "password"}
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Re-enter your password"
                      />
                      <FontAwesomeIcon
                        icon={eyeOne ? faEye : faEyeSlash}
                        className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                        onClick={() => setEyeOne((prev) => !prev)}
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
              <Controller
                name="terms"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FieldGroup className="">
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
                      <Checkbox
                        id={field.name}
                        name={field.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-invalid={fieldState.invalid}
                      />

                      <FieldLabel htmlFor={field.name}>
                        Accept terms and conditions
                      </FieldLabel>
                    </Field>
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-start -mt-5"
                      />
                    )}
                  </FieldGroup>
                )}
              />
            </div>
            <Button
              className="background-elements mt-6 w-full text-base font-semibold py-5"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Spinner className="size-6 text-white" />
                  <span>Creating Account</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faUserPlus} className="text-lg" />
                  <span>Create My Account</span>
                </>
              )}
            </Button>
          </form>
          <p className="font-medium text-start mt-3">
            Already have an account?{" "}
            <Link href="/signin" className="text-primary-600 font-semibold">
              Sign in
            </Link>
          </p>
        </section>
      </main>
    </>
  );
}
