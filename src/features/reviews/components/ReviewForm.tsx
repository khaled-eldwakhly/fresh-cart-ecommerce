"use client";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createRewiew } from "../server/reviews.actions";
import RatingInput from "./RatingInput";

export default function ReviewForm({
  productId,
  isLoggedIn,
}: {
  productId: string;
  isLoggedIn: boolean;
}) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (!isLoggedIn) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 p-6 text-center text-gray-600">
        Please{" "}
        <Link href="/login" className="font-semibold text-green-600 underline">
          sign in
        </Link>{" "}
        to write a review.
      </div>
    );
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (rating === 0) return setError("Please select a rating.");
    if (!review.trim()) return setError("Please write your review.");

    startTransition(async () => {
      const response = await createRewiew({
        productId,
        review: review.trim(),
        rating,
      });

      if (response.success) {
        setRating(0);
        setReview("");
        setSuccess(true);
        router.refresh();
      } else {
        setError(response.message);
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
    >
      <h3 className="text-lg font-bold text-gray-800">Write a review</h3>

      <RatingInput value={rating} onChange={setRating} />

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        rows={4}
        maxLength={500}
        placeholder="Share your experience with this product..."
        className="w-full resize-none rounded-xl border border-gray-300 p-3 outline-none transition-colors focus:border-green-600 focus:ring-2 focus:ring-green-600/20"
      />

      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-gray-400">{review.length}/500</span>

        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 rounded-full bg-green-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
          {isPending ? "Submitting..." : "Submit Review"}
        </button>
      </div>

      {error && <p className="text-sm font-medium text-red-500">{error}</p>}
      {success && (
        <p className="text-sm font-medium text-green-600">
          Thanks! Your review was added.
        </p>
      )}
    </form>
  );
}
