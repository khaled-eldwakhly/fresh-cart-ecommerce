import Image from "next/image";
import Link from "next/link";
import { Category } from "../types/categories.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/categories/${category._id}`}
      className="group relative block aspect-4/5 overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* image */}
      <Image
        src={category.image}
        alt={category.name}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-300 group-hover:opacity-0" />

      <div className="absolute inset-0 bg-linear-to-t from-violet-800/90 via-violet-700/50 to-violet-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* content */}
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <h3 className="text-lg font-bold drop-shadow">{category.name}</h3>

        <span className="mt-1 flex translate-y-2 items-center gap-2 text-sm font-medium opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Shop Now
          <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
        </span>
      </div>
    </Link>
  );
}
