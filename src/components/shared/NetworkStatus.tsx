"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function NetworkStatus() {
  useEffect(() => {
    const OFFLINE_ID = "offline-toast";

    const handleOffline = () => {
      toast.error("You are offline 🔴", {
        id: OFFLINE_ID,
        duration: Infinity,
        dismissible: false,
      });
    };

    const handleOnline = () => {
      toast.dismiss(OFFLINE_ID);
      toast.success("You're back online 🟢");
    };

    if (!navigator.onLine) {
      handleOffline();
    }

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return null;
}
