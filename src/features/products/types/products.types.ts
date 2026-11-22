import { Brand } from "@/features/brands/types/brands.types";
import {
  Category,
  SubCategory,
} from "@/features/categories/types/categories.types";
import { Review } from "@/features/reviews/types/review.types";

export interface ProductsResponse {
  results: number;
  metadata: Metadata;
  data: Product[];
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

export interface Product {
  sold?: number;
  images?: string[];
  subcategory: SubCategory[];
  ratingsQuantity?: number;
  _id: string;
  title: string;
  slug: string;
  description?: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt?: string;
  updatedAt?: string;
  id: string;
  priceAfterDiscount?: number;
  availableColors?: any[];
}

export interface ProductDetailsResponse {
  data: ProductDetails;
}

export interface ProductDetails {
  sold: number;
  images: string[];
  subcategory: SubCategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  reviews: Review[];
  id: string;
}
