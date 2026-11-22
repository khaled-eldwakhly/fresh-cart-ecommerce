"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { faFloppyDisk, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  updateProfileSchema,
  type UpdateProfileType,
} from "../schemas/profile.schemas";
import { updateLoggedUserData } from "../server/profile.actions";

type Props = {
  name?: string | null;
  email?: string | null;
};

export default function ProfileInformationForm({ name, email }: Props) {
  // ^ profile data form
  const profileForm = useForm<UpdateProfileType>({
    mode: "all",
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // ^ fill inputs by session data
  useEffect(() => {
    profileForm.reset({
      name: "",
      email: "",
      phone: "",
    });
  }, [name, email]);

  async function handleUpdateProfile(values: UpdateProfileType) {
    const response = await updateLoggedUserData(values);
    if (response.ok) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl bg-white p-6 shadow-lg"
    >
      <div className="mb-6 flex items-center gap-3 border-b pb-4">
        <div className="flex size-11 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600">
          <FontAwesomeIcon icon={faUser} className="text-lg" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Profile Information</h2>
          <p className="text-sm text-gray-500">
            Update your name, email and phone number
          </p>
        </div>
      </div>

      <form onSubmit={profileForm.handleSubmit(handleUpdateProfile)}>
        <div className="space-y-5">
          <Controller
            name="name"
            control={profileForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="text-base font-semibold -mb-1"
                  htmlFor={`profile-${field.name}`}
                >
                  Name
                </FieldLabel>
                <Input
                  type="text"
                  {...field}
                  id={`profile-${field.name}`}
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
            control={profileForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="text-base font-semibold -mb-1"
                  htmlFor={`profile-${field.name}`}
                >
                  Email Address
                </FieldLabel>
                <Input
                  type="email"
                  {...field}
                  id={`profile-${field.name}`}
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
            control={profileForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="text-base font-semibold -mb-1"
                  htmlFor={`profile-${field.name}`}
                >
                  Phone
                </FieldLabel>
                <Input
                  type="tel"
                  {...field}
                  id={`profile-${field.name}`}
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
        </div>

        <Button
          className="background-elements mt-6 w-full text-base font-semibold py-5"
          type="submit"
          disabled={profileForm.formState.isSubmitting}
        >
          {profileForm.formState.isSubmitting ? (
            <>
              <Spinner className="size-6 text-white" />
              <span>Saving Changes</span>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faFloppyDisk} className="text-lg" />
              <span>Save Changes</span>
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
}
