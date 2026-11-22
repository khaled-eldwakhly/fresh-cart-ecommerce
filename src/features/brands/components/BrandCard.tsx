import Image from "next/image";
import Link from "next/link";
import { Brand } from "../types/brands.types";

export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link
      href={`/brands/${brand._id}`}
      className="group relative block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* image */}
      <div className="relative aspect-square p-6">
        <Image
          src={brand.image}
          alt={brand.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* name */}
      <div className="border-t border-gray-100 px-4 py-3 text-center">
        <h3 className="font-semibold text-gray-800">{brand.name}</h3>
      </div>

      {/* hover & overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-fuchsia-700/90 to-fuchsia-500/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-fuchsia-700 shadow-lg">
          Browse Products
          <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
