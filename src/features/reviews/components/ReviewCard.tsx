"use client";

import RatingStars from "@/features/products/components/RatingsStars";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteReview, updateReview } from "../server/reviews.actions";
import { Review } from "../types/review.types";
import RatingInput from "./RatingInput";

export default function ReviewCard({
  review,
  productId,
}: {
  review: Review;
  productId: string;
}) {
  const { data } = useSession();
  const currentUserId = data?.user.id;
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [rating, setRating] = useState(review.rating);
  const [text, setText] = useState(review.review);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const isOwner = !!currentUserId && review.user._id === currentUserId;

  const date = new Date(review.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  function handleSave() {
    setError("");
    if (!text.trim()) return setError("Review can't be empty.");

    startTransition(async () => {
      const res = await updateReview({
        reviewId: review._id,
        productId,
        review: text.trim(),
        rating,
      });
      if (res.success) {
        setIsEditing(false);
        router.refresh();
      } else {
        setError(res.message);
      }
    });
  }

  function handleDelete() {
    setError("");
    startTransition(async () => {
      const res = await deleteReview({ reviewId: review._id, productId });
      if (res.success) {
        router.refresh();
      } else {
        setError(res.message);
        setConfirmDelete(false);
      }
    });
  }

  function cancelEdit() {
    setIsEditing(false);
    setRating(review.rating);
    setText(review.review);
    setError("");
  }

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary-700 to-primary-500 font-bold text-white">
          {review.user.name.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-gray-800">
            {review.user.name}
          </h3>
          <p className="text-xs text-gray-400">{date}</p>
        </div>

        {!isEditing && <RatingStars stars={review.rating} />}
      </div>

      {isEditing ? (
        <div className="mt-3 flex flex-col gap-3">
          <RatingInput value={rating} onChange={setRating} />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            maxLength={500}
            className="w-full resize-none rounded-xl border border-gray-300 p-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/20"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={cancelEdit}
              disabled={isPending}
              className="rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isPending}
              className="rounded-full bg-green-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-300"
            >
              {isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-3 leading-relaxed text-gray-600">{review.review}</p>
      )}

      {error && (
        <p className="mt-2 text-sm font-medium text-red-500">{error}</p>
      )}

      {isOwner && !isEditing && (
        <div className="mt-4 flex items-center justify-end gap-2 border-t border-gray-100 pt-3">
          {confirmDelete ? (
            <>
              <span className="text-sm text-gray-500">Delete this review?</span>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                disabled={isPending}
                className="rounded-full px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
              >
                No
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isPending}
                className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold text-white hover:bg-red-600 disabled:bg-gray-300"
              >
                {isPending ? "Deleting..." : "Yes, delete"}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faPen} className="text-xs" />
                Edit
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium text-red-500 hover:bg-red-50"
              >
                <FontAwesomeIcon icon={faTrash} className="text-xs" />
                Delete
              </button>
            </>
          )}
        </div>
      )}
    </article>
  );
}
