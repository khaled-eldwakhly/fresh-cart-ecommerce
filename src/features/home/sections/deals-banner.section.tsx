"use client";

import {
  faArrowRight,
  faBoxOpen,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "motion/react";
import Link from "next/link";

export default function DealsBanner() {
  return (
    <section className="container section-padding space-y-7 lg:space-y-0 lg:flex lg:*:flex-1 gap-5">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-white relative overflow-hidden"
      >
        <div className="bg-linear-to-tl from-emerald-600 to-emerald-500/90 px-8 py-6 rounded-xl space-y-4">
          <div className="w-fit font-semibold text-sm bg-white/20 rounded-xl px-2.5 py-1">
            <FontAwesomeIcon icon={faClock} /> Deals of the Day
          </div>
          <p className="capitalize text-2xl md:text-3xl font-bold">
            fresh organic fruits
          </p>
          <p className="text-white/80 font-semibold">
            Get up to 40% off on selected organic fruits
          </p>
          <div className="flex items-center gap-6">
            <div className="text-2xl md:text-3xl font-bold">40% OFF </div>
            <div className="text-sm">
              <span className="text-white/80">Use code:</span>{" "}
              <span className="font-bold">ORGANIC40</span>
            </div>
          </div>
          <button className="mt-2 bg-white text-emerald-500 hover:bg-white hover:text-emerald-600 rounded-full py-1">
            <Link
              href={"/products"}
              className="font-semibold px-4 py-1 text-lg"
            >
              Shop Now <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
            </Link>
          </button>
          <span className="size-40 bg-white/15 rounded-full absolute top-0 right-0 -translate-y-1/2 translate-x-1/2"></span>
          <span className="size-35 bg-white/15 rounded-full absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2"></span>
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-white relative overflow-hidden"
      >
        <div className="bg-linear-to-tl from-red-500 to-orange-400 px-8 py-6 rounded-xl space-y-4">
          <div className="w-fit font-semibold text-sm bg-white/20 rounded-xl px-2.5 py-1">
            <FontAwesomeIcon icon={faBoxOpen} /> New Arrivals
          </div>
          <p className="capitalize text-2xl md:text-3xl font-bold">
            Exotic Vegetables
          </p>
          <p className="text-white/80 font-semibold">
            Discover our latest collection of premium vegetables
          </p>
          <div className="flex items-center gap-6">
            <div className="text-2xl md:text-3xl font-bold">25% OFF </div>
            <div className="text-sm">
              <span className="text-white/80">Use code:</span>{" "}
              <span className="font-bold">FRESH25</span>
            </div>
          </div>
          <button className="mt-2 bg-white text-orange-500 hover:bg-white hover:text-orange-600 rounded-full py-1">
            <Link
              href={"/products"}
              className="font-semibold px-4 py-1 text-lg"
            >
              Explore Now{" "}
              <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
            </Link>
          </button>
          <span className="size-40 bg-white/15 rounded-full absolute top-0 right-0 -translate-y-1/2 translate-x-1/2"></span>
          <span className="size-35 bg-white/15 rounded-full absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2"></span>
        </div>
      </motion.div>
    </section>
  );
}
