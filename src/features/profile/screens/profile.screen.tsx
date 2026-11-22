"use client";

import { Spinner } from "@/components/ui/spinner";
import { useSession } from "next-auth/react";

import PasswordInformationForm from "../components/PasswordInformationForm";
import ProfileHeader from "../components/ProfileHeader";
import ProfileInformationForm from "../components/ProfileInformationForm";

export default function ProfileScreen() {
  const { data, status } = useSession();

  const name = data?.user?.name;
  const email = data?.user?.email;

  if (status === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner className="size-8 text-primary-600" />
      </div>
    );
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10">
      <ProfileHeader name={name} email={email} />

      <div className="grid gap-6 lg:grid-cols-2">
        <ProfileInformationForm name={name} email={email} />
        <PasswordInformationForm />
      </div>
    </section>
  );
}
