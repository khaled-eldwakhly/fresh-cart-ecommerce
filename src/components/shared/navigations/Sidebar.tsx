"use client";

import logo from "@/assets/images/freshcart-logo.svg";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { logOutUser } from "@/features/auth/helpers/auth.functions";
import SessionView from "@/features/auth/helpers/auth/SessionView";
import { useCartStore } from "@/features/cart/store/cart.store";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRightToBracket,
  faBoxOpen,
  faLayerGroup,
  faMedal,
  faRightFromBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ClipboardClock, Heart, ShoppingCart, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const pathname = usePathname();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      transition: { when: "afterChildren" },
    },
  };

  const asideVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 0.25,
        ease: [0.4, 0, 1, 1],
      },
    },
    exit: {
      width: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  } satisfies Variants;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const numOfCartItems = useCartStore((state) => state.getNumOfCartItems());

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="bg-primary-700/30 fixed inset-0 z-60"
          onClick={() => setOpen(false)}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.aside
            className="bg-white h-dvh absolute right-0 overflow-hidden max-w-75 md:max-w-100"
            onClick={(e) => e.stopPropagation()}
            variants={asideVariants}
          >
            <div className="navigation-height border-b flex justify-between items-center sidebar-padding h-15.25">
              <Image
                src={logo}
                alt="freshcart logo"
                priority
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="text-2xl"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="sidebar-padding mt-5 space-y-5">
              <Input placeholder="Search for Products" />
              <div className="space-y-4 font-semibold">
                <h3 className="heading">Main Menu</h3>
                <ul className="px-2 space-y-3">
                  <li>
                    <Link
                      href={"/products"}
                      className={`flex items-center gap-2 ${pathname.includes("products") && "active-link-sidebar"}`}
                      onClick={() => setOpen(false)}
                    >
                      <FontAwesomeIcon icon={faBoxOpen} className="text-xl" />
                      <span>Products</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/brands"}
                      className={`flex items-center gap-2 ${pathname.includes("brands") && "active-link-sidebar"}`}
                      onClick={() => setOpen(false)}
                    >
                      <FontAwesomeIcon icon={faMedal} className="text-xl" />
                      <span>Brands</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/categories"}
                      className={`flex items-center gap-2 ${pathname.includes("categories") && "active-link-sidebar"}`}
                      onClick={() => setOpen(false)}
                    >
                      <FontAwesomeIcon
                        icon={faLayerGroup}
                        className="text-xl"
                      />
                      <span>Categories</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/wishlist"}
                      className={`flex items-center gap-2 ${pathname.includes("wishlist") && "text-red-500"}`}
                      onClick={() => setOpen(false)}
                    >
                      <Heart />
                      <span>Wishlist</span>
                      <span className="bg-red-600/90 text-sm rounded-full text-white px-2 ml-auto"></span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/cart"}
                      className={`flex items-center gap-2 ${pathname.includes("cart") && "active-link-sidebar"}`}
                      onClick={() => setOpen(false)}
                    >
                      <ShoppingCart />
                      <span>Cart</span>
                      <span className="bg-primary-600 text-sm rounded-full text-white px-2 ml-auto">
                        {numOfCartItems} items
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/orders/all-orders"}
                      className={`flex items-center gap-2 ${pathname.includes("orders") && "active-link-sidebar"}`}
                      onClick={() => setOpen(false)}
                    >
                      <ClipboardClock />
                      <span>Orders</span>
                    </Link>
                  </li>
                  <SessionView
                    authenticatedProp={(data) => (
                      <li>
                        <Link
                          href={"/profile"}
                          className={`flex items-center gap-2 ${pathname.includes("profile") && "active-link-sidebar"}`}
                          onClick={() => setOpen(false)}
                        >
                          <UserRound />
                          <span>Account</span>
                        </Link>
                      </li>
                    )}
                    unauthenticatedProp=""
                  />
                </ul>
              </div>
              <Separator className={"my-6"} />
              <SessionView
                authenticatedProp={(data) => (
                  <>
                    <div className="space-y-4 font-semibold">
                      <h3 className="heading">Account</h3>
                      <ul className="px-2 space-y-3">
                        <li>
                          <button
                            className="flex items-center gap-1 text-red-500"
                            onClick={logOutUser}
                          >
                            <FontAwesomeIcon
                              icon={faRightFromBracket}
                              className="text-xl"
                            />
                            <span>Logout</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-center border-t heading">
                      <p>Logged in as {data.user.name}</p>
                    </div>
                  </>
                )}
                unauthenticatedProp={
                  <>
                    <div className="space-y-4 font-semibold">
                      <h3 className="heading">Account</h3>
                      <ul className="px-2 space-y-3">
                        <li>
                          <Link
                            onClick={() => setOpen(false)}
                            className={`flex items-center gap-2 ${pathname.includes("signin") && "active-link"}`}
                            href={"/signin"}
                          >
                            <FontAwesomeIcon
                              icon={faArrowRightToBracket}
                              className="text-lg"
                            />
                            <span>Sign in</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={() => setOpen(false)}
                            className={`flex items-center gap-2 ${pathname.includes("signup") && "active-link"}`}
                            href={"/signup"}
                          >
                            <FontAwesomeIcon
                              icon={faUserPlus}
                              className="text-lg"
                            />
                            <span>Sign up</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </>
                }
              />
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
