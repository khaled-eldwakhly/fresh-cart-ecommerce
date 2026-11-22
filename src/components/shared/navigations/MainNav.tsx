"use client";

import logo from "@/assets/images/freshcart-logo.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { logOutUser } from "@/features/auth/helpers/auth.functions";
import SessionView from "@/features/auth/helpers/auth/SessionView";
import { useCartStore } from "@/features/cart/store/cart.store";
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faBars,
  faHeadphones,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClipboardClock, Heart, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import Dropdown from "./Dropdown";
import Sidebar from "./Sidebar";

export default function MainNav() {
  const [open, setOpen] = useState(false);

  const { numOfCartItems, hasHydrated } = useCartStore(
    useShallow((state) => ({
      numOfCartItems: state.getNumOfCartItems(),
      hasHydrated: state.hasHydrated,
      clearCart: state.clearCart,
      serverSource: state.serverSource,
      setServerSource: state.setServerSource,
    })),
  );
  const pathname = usePathname();

  return (
    <>
      <nav className="sticky top-0 bg-white z-50 shadow-[0_4px_6px_-4px_rgba(0,0,0,0.15)]">
        <div className="container py-3 flex justify-between items-center">
          <Link href={"/"}>
            <Image src={logo} alt="freshcart logo" priority />
          </Link>
          <div className="w-65 lg:w-90 relative hidden md:block">
            <Input
              className="max-w-full rounded-full"
              placeholder="Search for products, brands and more..."
            />
            <div className="bg-primary-600 cursor-pointer text-white size-7 flex justify-center items-center rounded-full absolute right-1 top-1/2 -translate-y-1/2">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          </div>
          <Dropdown />
          <div className="hidden xl:block">
            <ul className="flex gap-4 font-medium">
              <li className="relative">
                <Link href={"/"} className={`${pathname.endsWith("/") && "active-link-navbar"}`}>
                  Home
                </Link>
              </li>
              <li className="relative">
                <Link
                  href={"/products"}
                  className={`${pathname.includes("/products") && "active-link-navbar"}`}
                >
                  Shop
                </Link>
              </li>
              <li className="relative">
                <Link
                  href={"/brands"}
                  className={`${pathname.includes("/brands") && "active-link-navbar"}`}
                >
                  Brands
                </Link>
              </li>
              <li className="relative">
                <Link
                  href={"/categories"}
                  className={`${pathname.includes("/categories") && "active-link-navbar"}`}
                >
                  Categories
                </Link>
              </li>
            </ul>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <div className="bg-primary-200 text-primary-600 size-10 text-xl flex justify-center items-center rounded-full">
              <FontAwesomeIcon icon={faHeadphones} />
            </div>
            <div className="font-medium text-sm *:block">
              <span className="text-light">Support</span>
              <span>24/7 Help</span>
            </div>
          </div>
          <div className="hidden lg:block bg-gray-300/80 w-px h-12 rounded-full"></div>
          <div className="hidden lg:block">
            <ul className="flex items-center gap-3">
              <li>
                <Link className="relative" href={"/profile"}>
                  <User
                    className={`text-blue-500 ${pathname.includes("/profile") && "fill-blue-500"}`}
                  />
                </Link>
              </li>
              <li>
                <Link className="relative" href={"/orders/all-orders"}>
                  <ClipboardClock
                    className={`text-yellow-500/90 ${pathname.includes("/orders") && "fill-yellow-500/90"}`}
                  />
                </Link>
              </li>
              <li>
                <Link className="relative" href={"/wishlist"}>
                  <Heart
                    className={`text-red-500 ${pathname.includes("/wishlist") && "fill-red-500"}`}
                  />
                </Link>
              </li>
              <li>
                <Link className="relative" href={"/cart"}>
                  <ShoppingCart
                    className={`text-primary-600/90 ${pathname.includes("/cart") && "fill-primary-600/90"}`}
                  />
                  <span className="text-xs bg-primary-600 text-white font-bold size-4 rounded-full flex justify-center items-center absolute -top-1/2 left-1/2 -translate-x-1/2 -translate-y-0.5">
                    {!hasHydrated ? <Spinner /> : numOfCartItems}
                  </span>
                </Link>
              </li>
              <SessionView
                authenticatedProp={(data) => (
                  <li>
                    <button
                      className="flex items-center gap-1 bg-red-600/90 text-white px-3 py-1.5 rounded-full cursor-pointer group"
                      onClick={() => {
                        logOutUser();
                      }}
                    >
                      <span>Log out</span>
                      <FontAwesomeIcon
                        icon={faArrowRightFromBracket}
                        className="group-hover:translate-x-1.5 duration-150"
                      />
                    </button>
                  </li>
                )}
                unauthenticatedProp={
                  <li>
                    <Link
                      href={"/signin"}
                      className="flex items-center gap-1 bg-primary-600 text-white px-3 py-1.5 rounded-full cursor-pointer group"
                    >
                      <span>Sign in</span>
                      <FontAwesomeIcon
                        icon={faArrowRightToBracket}
                        className="group-hover:translate-x-1.5 duration-150"
                      />
                    </Link>
                  </li>
                }
              />
            </ul>
          </div>
          <Button
            className="background-elements lg:hidden"
            onClick={() => setOpen(true)}
          >
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </div>
      </nav>
      <Sidebar open={open} setOpen={setOpen} />
    </>
  );
}
