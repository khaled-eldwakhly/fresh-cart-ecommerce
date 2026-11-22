import Image from "next/image";
import freshCartLogo from "../../assets/images/freshcart-logo.svg";
import minifreshCartLogo from "../../assets/images/mini-logo.png";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faPinterestP,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const socials = [
  { icon: faFacebookF, label: "Facebook", href: "#" },
  { icon: faXTwitter, label: "X", href: "#" },
  { icon: faInstagram, label: "Instagram", href: "#" },
  { icon: faPinterestP, label: "Pinterest", href: "#" },
];

const columns = [
  {
    title: "Categories",
    links: [
      { text: "Men's Fashion", href: "#" },
      { text: "Womens Fashion", href: "#" },
      { text: "Baby & Toys", href: "#" },
      { text: "Beauty & Health", href: "#" },
      { text: "Electronics", href: "#" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { text: "About Us", href: "#" },
      { text: "Contact Us", href: "#" },
      { text: "Privacy Policy", href: "#" },
      { text: "Terms of Service", href: "#" },
      { text: "Shipping Policy", href: "#" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { text: "My Account", href: "#" },
      { text: "My Orders", href: "/orders" },
      { text: "Wishlist", href: "#" },
      { text: "Returns & Refunds", href: "#" },
      { text: "Help Center", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-linear-to-b from-emerald-950 to-slate-950 text-white">
      <div className="h-1 bg-linear-to-r from-primary-600 via-primary-400 to-primary-600" />

      <div className="container">
        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-8 py-12 border-b border-white/10">
          <div className="xl:col-span-2 space-y-4">
            <Link href="/" className="block w-fit">
              <div className="relative w-40 h-10 bg-white rounded-lg">
                <Image
                  src={freshCartLogo}
                  alt="fresh cart logo"
                  fill
                  className="object-contain px-2 py-1"
                />
              </div>
            </Link>

            <p className="text-white/70 leading-relaxed max-w-md">
              FreshCart is a versatile e-commerce platform offering a wide range
              of products, from clothing to electronics. It provides a
              user-friendly experience for seamless shopping across diverse
              categories.
            </p>

            <ul className="flex items-center gap-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="flex items-center justify-center size-10 rounded-full bg-white/10 text-white/80 hover:bg-primary-600 hover:text-white hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <FontAwesomeIcon icon={social.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="font-bold mb-5 text-lg text-white relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-8 after:bg-primary-500 after:rounded-full">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.text}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-primary-400 hover:translate-x-1 inline-block transition-all duration-200"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between py-6">
          <p className="text-sm font-medium text-white/50">
            &copy; {new Date().getFullYear()} FreshCart. All rights reserved.
          </p>
          <Image
            src={minifreshCartLogo}
            width={25}
            height={25}
            alt="fresh cart logo"
            className="size-6.25"
          />
        </div>
      </div>
    </footer>
  );
}
