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
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import {
  faLock,
  faRightToBracket,
  faStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { signinSchema, signinSchemaType } from "../../schemas/signin.schema";

export default function SigninForm() {
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const [eye, setEye] = useState(false);
  const form = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSignin(values: signinSchemaType) {
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      rememberMe,
    });
    if (response?.ok) {
      toast.success("Welcome Back");
      router.push("/");
      router.refresh();
    } else {
      toast.error(response?.error);
    }
  }
  return (
    <>
      <main className="lg:w-120">
        <section className="p-6 text-center bg-white rounded-xl shadow-lg">
          <div className="space-y-4">
            <div className="font-bold">
              <h1 className="text-2xl">
                <span className="text-primary-600">Fresh</span>Cart
              </h1>
              <p className="text-xl">Welcome Back!</p>
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
          <form onSubmit={form.handleSubmit(handleSignin)}>
            <div className="space-y-5">
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
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="text-base font-semibold -mb-1"
                      htmlFor={field.name}
                    >
                      Password
                      <Link
                        href={"/forgot-password"}
                        className="ml-auto text-primary-600"
                      >
                        Forgot Password?
                      </Link>
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
            </div>
            <FieldGroup className="mt-4">
              <Field orientation="horizontal">
                <Checkbox
                  id="terms-checkbox-basic"
                  name="terms-checkbox-basic"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <FieldLabel htmlFor="terms-checkbox-basic">
                  Remember me later
                </FieldLabel>
              </Field>
            </FieldGroup>
            <Button
              className="background-elements mt-6 w-full text-base font-semibold py-5"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Spinner className="size-6 text-white" />
                  <span>Logging in</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faRightToBracket}
                    className="text-lg"
                  />
                  <span>Login</span>
                </>
              )}
            </Button>
          </form>
          <Separator className={"my-5 bg-gray-300"} />
          <div className="font-medium text-center space-y-3">
            <p>
              New to FreshCart?{" "}
              <Link href="/signup" className="text-primary-600 font-semibold">
                Create an account
              </Link>
            </p>
            <ul className="text-xs text-gray-600 flex items-center justify-center gap-5 *:space-x-1">
              <li>
                <FontAwesomeIcon icon={faLock} />
                <span>SSL Secured</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faUsers} />
                <span>50K+ Users</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faStar} />
                <span>4.9 Rating</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
