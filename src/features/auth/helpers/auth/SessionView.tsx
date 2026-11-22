"use client";

import { Spinner } from "@/components/ui/spinner";
import { useSession } from "next-auth/react";

export default function SessionView({
  authenticatedProp,
  unauthenticatedProp,
}: {
  authenticatedProp: (data: any) => React.ReactNode;
  unauthenticatedProp: React.ReactNode;
}) {
  const { data, status } = useSession();
  return (
    <>
      {status === "loading" ? (
        <Spinner />
      ) : data ? (
        authenticatedProp(data)
      ) : (
        unauthenticatedProp
      )}
    </>
  );
}
