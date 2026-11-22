import { Brand } from "@/features/brands/types/brands.types";
import { Category, SubCategory } from "@/features/categories/types/categories.types";

export interface WishlistResponse {
  status: string;
  count: number;
  data: WishlistItem[];
}

export interface WishlistItem {
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
  priceAfterDiscount?: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}
