import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Exo } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const exo = Exo({
  subsets: ["latin"],
  variable: "--font-exo-raw",
});

export const metadata: Metadata = {
  title: {
    default: "FrechCart",
    template: "%s | FreshCart",
  },
  description:
    "Shop fresh groceries and everyday essentials online with FreshCart — fast delivery, great prices, and a seamless shopping experience.",
};

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/navigations/Navbar";
import NetworkStatus from "@/components/shared/NetworkStatus";
import AuthProvider from "@/features/auth/helpers/AuthProvider";
import CartFetcher from "@/features/cart/helpers/cart.fetcher";
import StoreHydrator from "@/helpers/StoreHydrator";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { WishlistProvider } from "@/features/wishlist/contexts/wishlist.context";
config.autoAddCss = false;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", exo.variable)}>
      <body>
        <AuthProvider>
          <WishlistProvider>
            <Navbar />
            <StoreHydrator />
            <CartFetcher />
            {children}
            <Footer />
          </WishlistProvider>
          <Toaster
            richColors
            position="top-right"
            expand={true}
            duration={2500}
          />
          <NetworkStatus />
        </AuthProvider>
      </body>
    </html>
  );
}
