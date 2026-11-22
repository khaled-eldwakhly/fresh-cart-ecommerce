"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { getUserToken } from "@/features/auth/helpers/auth/auth";
import { ReviewResponse, ReviewsListResponse } from "../types/review.types";

export type CreateReviewResult =
  | { success: true; data: ReviewResponse }
  | { success: false; message: string };

export async function createRewiew({
  productId,
  review,
  rating,
}: {
  productId: string;
  review: string;
  rating: number;
}): Promise<CreateReviewResult> {
  try {
    const token = await getUserToken();
    if (!token) throw new Error("Log in first!");

    const response = await fetch(
      `${process.env.BASE_URL_V_1}/products/${productId}/reviews`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", token },
        body: JSON.stringify({ review, rating }),
      },
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        message: data?.errors?.msg ?? data?.message ?? "Failed to add review.",
      };
    }

    revalidatePath(`/products/${productId}`);
    return { success: true, data };
  } catch (error) {
    console.error("createReview failed:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function getProductReviews({
  productId,
}: {
  productId: string;
}): Promise<ReviewsListResponse> {
  const response = await fetch(
    `${process.env.BASE_URL_V_1}/products/${productId}/reviews`,
    { next: { tags: [`reviews-${productId}`] } },
  );

  if (!response.ok) {
    throw new Error("Failed to retrieve reviews!");
  }

  return response.json();
}

export type ReviewActionResult =
  | { success: true }
  | { success: false; message: string };

export async function updateReview({
  reviewId,
  productId,
  review,
  rating,
}: {
  reviewId: string;
  productId: string;
  review: string;
  rating: number;
}): Promise<ReviewActionResult> {
  try {
    const token = await getUserToken();
    if (!token) throw new Error("Log in first!");
    const response = await fetch(
      `${process.env.BASE_URL_V_1}/reviews/${reviewId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json", token },
        body: JSON.stringify({ review, rating }),
      },
    );
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        message:
          data?.errors?.msg ?? data?.message ?? "Failed to update review.",
      };
    }

    revalidateTag(`reviews-${productId}`, "max");
    revalidatePath(`/products/${productId}`);
    return { success: true };
  } catch (error) {
    console.error("updateReview failed:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function deleteReview({
  reviewId,
  productId,
}: {
  reviewId: string;
  productId: string;
}): Promise<ReviewActionResult> {
  try {
    const token = await getUserToken();
    if (!token) throw new Error("Log in first!");
    const response = await fetch(
      `${process.env.BASE_URL_V_1}/reviews/${reviewId}`,
      { method: "DELETE", headers: { token } },
    );

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      return {
        success: false,
        message: data?.message ?? "Failed to delete review.",
      };
    }

    revalidateTag(`reviews-${productId}`, "max");
    revalidatePath(`/products/${productId}`);
    return { success: true };
  } catch (error) {
    console.error("deleteReview failed:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
