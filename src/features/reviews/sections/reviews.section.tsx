import RatingStars from "@/features/products/components/RatingsStars";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";
import { getProductReviews } from "../server/reviews.actions";

export default async function ReviewsSection({
  ratingsAverage,
  ratingsQuantity,
  productId,
  isLoggedIn,
}: {
  ratingsAverage: number;
  ratingsQuantity: number;
  productId: string;
  isLoggedIn: boolean;
}) {
  const { data: reviews } = await getProductReviews({ productId });
  return (
    <section className="container py-10">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Customer Reviews
      </h2>

      <div className="grid gap-8 md:grid-cols-[260px_1fr]">
        <div className="flex h-fit flex-col items-center gap-2 rounded-2xl bg-green-50 p-6 text-center md:sticky md:top-22">
          <p className="text-5xl font-bold text-green-600">
            {ratingsAverage.toFixed(1)}
          </p>
          <RatingStars stars={ratingsAverage} />
          <p className="text-sm text-gray-500">
            Based on {ratingsQuantity} rating{ratingsQuantity === 1 ? "" : "s"}
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <ReviewForm productId={productId} isLoggedIn={isLoggedIn} />

          {reviews.length > 0 ? (
            <div className="flex flex-col gap-4">
              {reviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  productId={productId}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-300 py-12 text-center text-gray-500">
              <FontAwesomeIcon
                icon={faCommentDots}
                className="text-4xl text-gray-300"
              />
              <p>No reviews yet for this product.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
