import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useCartStore } from "../store/cart.store";
import { CartItem as CartItemInterface } from "../types/cart.types";
import useCartActions from "../hooks/useCartActions";

export default function CartItem({ item }: { item: CartItemInterface }) {
  const {
    salePercentage,
    count,
    price,
    product: { category, brand, title, imageCover, ratingsAverage },
  } = item;

  const { totalCartItemPrice, savedMoney } = useCartStore(
    useShallow((state) => ({
      totalCartItemPrice: state.getCartItemTotalPrice(item),
      savedMoney: state.getItemSavedMoney(item),
    })),
  );

  const { addItem, removeItem, updateCount, isPending } = useCartActions();

  // ^ count animation logic
  const [direction, setDirection] = useState(1);

  function handleIncrease() {
    setDirection(1);
    addItem(item);
  }

  function handleDecrease() {
    setDirection(-1);
    updateCount(item, count - 1);
  }

  const variants = {
    initial: (direction: number) => ({
      y: direction > 0 ? 15 : -15,
      opacity: 0,
    }),

    animate: {
      y: 0,
      opacity: 1,
    },

    exit: (direction: number) => ({
      y: direction > 0 ? -15 : 15,
      opacity: 0,
    }),
  };

  return (
    <div className="bg-white shadow rounded-xl col-span-6 sm:col-span-3 md:col-span-2 relative">
      <div className="relative w-2/5 md:w-3/5 h-60 mx-auto">
        <Image
          src={imageCover}
          alt={title}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 60vw, 40vw"
        />
      </div>
      <div className="py-6 px-7 space-y-2">
        <div className="text-sm text-gray-500 flex justify-between items-center">
          <span>{category.name}</span>
          <span className="bg-gray-100 px-2 py-0.5 rounded font-semibold italic">
            {brand.name}
          </span>
        </div>
        <h3 className="heading text-lg">
          <Link href={`/`} className={`line-clamp-1`}>
            {title}
          </Link>
        </h3>
        <span className="font-bold text-primary-600 mb-2 block">
          {price} EGP {salePercentage && "(after discount)"}
        </span>
        <div className="bg-gray-100/80 rounded-lg overflow-hidden border flex justify-between items-center">
          <button
            className={`${count === 1 ? "bg-red-500 text-white" : "bg-white text-gray-700"} border-r p-1.5 disabled:opacity-60 disabled:cursor-not-allowed`}
            onClick={handleDecrease}
            disabled={isPending}
          >
            <FontAwesomeIcon icon={count === 1 ? faTrash : faMinus} />
          </button>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.span
              key={count}
              custom={direction}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="inline-block font-bold"
            >
              {count}
            </motion.span>
          </AnimatePresence>
          <button
            className="bg-primary-600 text-white p-1.5 border-l disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={handleIncrease}
            disabled={isPending}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className="flex justify-between items-center -mb-2 my-4">
          <span>
            Total:{" "}
            <span className="font-bold text-xl">{totalCartItemPrice} EGP</span>
          </span>
          <button
            className="text-red-600 bg-red-50 p-2 rounded border-red-500 border disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={() => removeItem(item, true)}
            disabled={isPending}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
        {savedMoney > 0 && (
          <p className="text-primary-500 font-semibold mt-5 -mb-2 text-lg space-x-1">
            <FontAwesomeIcon icon={faCircle} className="text-sm" />
            <span>Youe saved {savedMoney} EGP</span>
          </p>
        )}
      </div>
      {salePercentage && (
        <div className="absolute top-3 left-2 bg-red-500 text-white text-[12px] px-2 py-0.5 rounded">
          -{salePercentage}%
        </div>
      )}
    </div>
  );
}
