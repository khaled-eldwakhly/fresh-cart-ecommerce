import { Star } from "lucide-react";

export default function RatingStars({ stars }: { stars: number }) {
  const percent = Math.min(Math.max((stars / 5) * 100, 0), 100);
  return (
    <div className="relative inline-flex">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="size-4 text-gray-300 fill-gray-300" />
        ))}
      </div>
      <div
        className="absolute inset-y-0 left-0 flex overflow-hidden"
        style={{ width: `${percent}%` }}
      >
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="size-4 shrink-0 text-yellow-400 fill-yellow-400"
          />
        ))}
      </div>
    </div>
  );
}
